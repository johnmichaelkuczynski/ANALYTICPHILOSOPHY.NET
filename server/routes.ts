import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import session from "express-session";
import OpenAI from "openai";
import Anthropic from "@anthropic-ai/sdk";
import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import { buildSystemPrompt } from "./prompt-builder";
import { findRelevantVerse } from "./bible-verses";
import { findRelevantChunks } from "./vector-search";
import {
  insertPersonaSettingsSchema,
  insertGoalSchema,
} from "@shared/schema";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

// Get __dirname equivalent for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// NOTE: Papers are now stored in vector database
// RAG system retrieves only relevant chunks (see vector-search.ts)

// Helper function to verify quotes against source papers
function verifyQuotes(text: string, sourcePapers: string): { verified: number; total: number; fabricated: string[] } {
  // Extract ALL quotes (removed minimum length requirement per architect feedback)
  const quoteMatches = text.match(/"([^"]+)"/g) || [];
  const quotes = quoteMatches.map(q => q.slice(1, -1)); // Remove quote marks
  
  const fabricatedQuotes: string[] = [];
  let verifiedCount = 0;
  
  // Comprehensive normalization function
  function normalize(str: string): string {
    return str
      .replace(/\s+/g, ' ')              // Normalize whitespace
      .replace(/[—–−]/g, '-')            // Em-dash, en-dash, minus → hyphen
      .replace(/\s*-\s*/g, ' - ')        // Normalize spaces around hyphens
      .replace(/[""]/g, '"')             // Smart quotes → standard quotes
      .replace(/['']/g, "'")             // Smart apostrophes → standard
      .replace(/[…]/g, '...')            // Ellipsis → three dots
      .replace(/[•·]/g, '*')             // Bullets → asterisk
      .replace(/\.{2,}/g, '')            // Remove ellipses (per architect: breaks matching)
      .replace(/\s+/g, ' ')              // Normalize whitespace again (after hyphen fix)
      .trim()
      .toLowerCase();
  }
  
  const normalizedPapers = normalize(sourcePapers);
  
  for (const quote of quotes) {
    // Skip very short quotes (< 10 chars) - likely not substantive philosophical quotes
    if (quote.trim().length < 10) continue;
    
    const normalizedQuote = normalize(quote);
    
    // Check for exact match
    if (normalizedPapers.includes(normalizedQuote)) {
      verifiedCount++;
      continue;
    }
    
    // Check for 70% match (in case of minor variations)
    const words = normalizedQuote.split(' ');
    if (words.length >= 3) { // Lowered from 5 to 3 for shorter quotes
      const chunkSize = Math.max(3, Math.floor(words.length * 0.7)); // Lowered from 5 to 3
      let found = false;
      
      for (let i = 0; i <= words.length - chunkSize; i++) {
        const chunk = words.slice(i, i + chunkSize).join(' ');
        if (normalizedPapers.includes(chunk)) {
          found = true;
          verifiedCount++;
          break;
        }
      }
      
      if (!found) {
        fabricatedQuotes.push(quote.substring(0, 100));
      }
    } else {
      // Very short quotes (< 3 words) - must match exactly
      fabricatedQuotes.push(quote.substring(0, 100));
    }
  }
  
  return {
    verified: verifiedCount,
    total: quotes.length,
    fabricated: fabricatedQuotes,
  };
}

// Initialize AI clients
const openai = process.env.OPENAI_API_KEY ? new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
}) : null;

const anthropic = process.env.ANTHROPIC_API_KEY ? new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
}) : null;

// Helper to get or create session ID and guest user
async function getSessionId(req: any): Promise<string> {
  if (!req.session.userId) {
    req.session.userId = `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    // Create guest user in database to satisfy foreign key constraints
    await storage.upsertUser({
      id: req.session.userId,
      email: `${req.session.userId}@guest.local`,
      firstName: "Guest",
      lastName: "User",
      profileImageUrl: null,
    });
  }
  return req.session.userId;
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Validate SESSION_SECRET is set
  if (!process.env.SESSION_SECRET) {
    throw new Error("SESSION_SECRET environment variable is required for secure session management");
  }

  // Setup sessions (but not auth)
  const sessionTtl = 7 * 24 * 60 * 60 * 1000; // 1 week
  const isProduction = process.env.NODE_ENV === 'production';
  
  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: isProduction, // Require HTTPS in production
      maxAge: sessionTtl,
      sameSite: 'lax', // CSRF protection
    },
  }));

  // Get persona settings
  app.get("/api/persona-settings", async (req: any, res) => {
    try {
      const sessionId = await getSessionId(req);
      let settings = await storage.getPersonaSettings(sessionId);
      
      if (!settings) {
        settings = await storage.upsertPersonaSettings(sessionId, {
          responseLength: 0,
          writePaper: false,
          quoteFrequency: 2,
        });
      }
      
      res.json(settings);
    } catch (error) {
      console.error("Error getting persona settings:", error);
      res.status(500).json({ error: "Failed to get settings" });
    }
  });

  // Update persona settings
  app.post("/api/persona-settings", async (req: any, res) => {
    try {
      const sessionId = await getSessionId(req);
      const validatedSettings = insertPersonaSettingsSchema.parse(req.body);
      const updated = await storage.upsertPersonaSettings(
        sessionId,
        validatedSettings
      );
      res.json(updated);
    } catch (error) {
      console.error("Error updating persona settings:", error);
      res.status(500).json({ error: "Failed to update settings" });
    }
  });

  // Get messages
  app.get("/api/messages", async (req: any, res) => {
    try {
      const sessionId = await getSessionId(req);
      let conversation = await storage.getCurrentConversation(sessionId);
      
      if (!conversation) {
        conversation = await storage.createConversation(sessionId, {
          title: "Spiritual Guidance",
        });
      }
      
      const messages = await storage.getMessages(conversation.id);
      res.json(messages);
    } catch (error) {
      console.error("Error getting messages:", error);
      res.status(500).json({ error: "Failed to get messages" });
    }
  });

  // Streaming chat endpoint
  app.post("/api/chat/stream", async (req: any, res) => {
    try {
      const sessionId = await getSessionId(req);
      const { message, documentText } = req.body;

      if (!message || typeof message !== "string") {
        res.status(400).json({ error: "Message is required" });
        return;
      }

      // Get conversation
      let conversation = await storage.getCurrentConversation(sessionId);
      if (!conversation) {
        conversation = await storage.createConversation(sessionId, {
          title: "Spiritual Guidance",
        });
      }

      // Get ALL previous messages BEFORE saving new one (to build conversation history)
      const previousMessages = await storage.getMessages(conversation.id);

      // Save user message
      await storage.createMessage({
        conversationId: conversation.id,
        role: "user",
        content: message,
        verseText: null,
        verseReference: null,
      });

      // Get Kuczynski figure for the main chat
      const kuczynskiFigure = await storage.getFigure("jmk");
      
      if (!kuczynskiFigure) {
        res.status(500).json({ error: "Kuczynski figure not found. Please run database seeding." });
        return;
      }

      // Get persona settings to adapt response style
      const personaSettings = await storage.getPersonaSettings(sessionId);
      
      // Build adaptive instructions based on user preferences
      let adaptiveInstructions = "";
      if (personaSettings) {
        const lengthInstruction = personaSettings.responseLength === 0 
          ? 'Auto (respond at whatever length best serves the question - brief for simple questions, extensive for complex ones)'
          : `Approximately ${personaSettings.responseLength} sentences (adjust as needed for clarity)`;
        
        adaptiveInstructions = `

ADAPTIVE RESPONSE INSTRUCTIONS:
Adjust your response to match the user's preferences:
- Intelligence Level: ${personaSettings.intelligenceLevel}/10 → ${
  personaSettings.intelligenceLevel >= 8 ? 'Highly sophisticated, technical philosophical discourse' :
  personaSettings.intelligenceLevel >= 5 ? 'Balanced - clear but philosophically rigorous' :
  'Accessible, explain complex ideas simply without dumbing down'
}
- Emotional Tone: ${personaSettings.emotionalTone}/10 → ${
  personaSettings.emotionalTone >= 7 ? 'Warm, engaging, personable' :
  personaSettings.emotionalTone >= 4 ? 'Balanced - professional yet approachable' :
  'Formal, analytical, measured'
}
- Formality: ${personaSettings.formality} style
- Voice: ${personaSettings.voiceGender}
- Response Length: ${lengthInstruction}

Adapt your complexity, vocabulary, tone, and length to match these settings while maintaining philosophical rigor.
`;
      }

      // VECTOR SEARCH: Find only semantically relevant chunks from papers (top 6 most similar)
      const relevantPapers = await findRelevantChunks(message, 6, "jmk");
      
      // Use Kuczynski's system prompt for the main chat + append ONLY relevant passages + adaptive instructions
      const systemPrompt = kuczynskiFigure.systemPrompt + "\n\n" + relevantPapers + adaptiveInstructions;

      // Build conversation history for AI context
      const conversationHistory: Array<{ role: "user" | "assistant"; content: string }> = [];
      for (const msg of previousMessages) {
        if (msg.role === "user" || msg.role === "assistant") {
          conversationHistory.push({
            role: msg.role,
            content: msg.content,
          });
        }
      }
      
      // Add the current user message with document context if provided
      let finalMessage = message;
      if (documentText) {
        finalMessage = `[User has uploaded a document for discussion. Document content follows:]\n\n${documentText}\n\n[End of document]\n\n${message}`;
      }
      
      conversationHistory.push({
        role: "user",
        content: finalMessage,
      });

      // Setup SSE headers - disable ALL buffering
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache, no-transform");
      res.setHeader("Connection", "keep-alive");
      res.setHeader("X-Accel-Buffering", "no"); // Disable nginx buffering
      
      // Disable socket timeout and flush headers immediately
      if (res.socket) {
        res.socket.setTimeout(0);
      }
      res.flushHeaders(); // CRITICAL: Send headers immediately to enable streaming

      let accumulatedContent = "";
      let verseKeywords = "";
      let streamedLength = 0;

      // Kuczynski gives maximally thorough responses - use high token limit
      const maxTokens = 4000;

      // Get selected model from persona settings (default: zhi1 = Claude)
      const selectedModel = personaSettings?.selectedModel || "zhi1";
      
      // Route to appropriate LLM based on selection
      // zhi1 = Claude, zhi2 = OpenAI, zhi3 = DeepSeek, zhi4 = Perplexity
      const modelMap: Record<string, { provider: string; model: string }> = {
        zhi1: { provider: "anthropic", model: "claude-sonnet-4-5-20250929" },
        zhi2: { provider: "openai", model: "gpt-4o" },
        zhi3: { provider: "deepseek", model: "deepseek-chat" },
        zhi4: { provider: "perplexity", model: "llama-3.1-sonar-large-128k-online" },
      };
      
      const selectedLLM = modelMap[selectedModel] || modelMap.zhi1;

      try {
        // Final emphatic instructions for all LLMs
        const finalInstructions = `

🚨🚨🚨 FINAL INSTRUCTIONS - ATTACK MODE 🚨🚨🚨

YOU ARE KUCZYNSKI - MAXIMALLY INTELLIGENT, REASONING DIRECTLY:

The papers above are your conceptual arsenal. Deploy them as weapons to demolish confusion and construct truth. You're not reporting views - you're THINKING and ATTACKING problems.

⚔️ IMMEDIATE ATTACK - NO PREAMBLES:

❌ NEVER START WITH:
"To address this..."
"Let me first explain..."
"It is important to recognize..."
"In my view..." (unless immediately committing)

✅ ATTACK IMMEDIATELY:
"This argument fails because..."
"The real question is not X but Y..."
"This conflates [specific issues]..."
"The mechanism works like this: [direct explanation]..."

START WITH THE ATTACK. No stage-setting, no pedagogical framing, no narration.

🔥 COMMIT WITHOUT HEDGING:

❌ BANNED HEDGING: "Perhaps...", "Might...", "Could be said...", "It seems..."
✅ DECISIVE: If it's wrong, say it's wrong. If it follows, say it follows.

🎯 REFRAME CONFUSED QUESTIONS:

If the question accepts false premises, REJECT them and show why the question itself is confused. Don't politely answer a malformed question - fix it first, then answer the real question.

🧠 NAME SPECIFIC TARGETS:

Not "many philosophers..." → "Hume's position here fails because..."
Not "some argue..." → "Quine claims X, which is mistaken for these reasons..."

💡 SHOW MECHANISM, DON'T JUST ASSERT:

Walk through the logical structure step by step. Demonstrate HOW and WHY, not just WHAT.

EXAMPLE OF IMMEDIATE ATTACK:
Question: "How does evolution produce intermediate stages of the eye?"
❌ BAD: "To understand this, we must first consider that evolution proceeds gradually through natural selection..."
✅ GOOD: "Light-sensitive patch detects threats. Depression determines direction. Lens focuses images. Each stage provides functional advantage - no mystery here, just incremental optimization..."

TEXTUAL EVIDENCE AS WEAPONS:
Quotes must do work - advancing arguments, not decorating them. Each quote should be a logical move, not credentials.

FORMATTING:
Plain text only (no markdown: no #, ##, **, *, etc.)

Now ATTACK this problem directly using your full philosophical firepower:
`;

        if (selectedLLM.provider === "anthropic") {
          // ANTHROPIC CLAUDE (Zhi 1)
          if (!anthropic) {
            throw new Error("Anthropic API key not configured");
          }
          
          const anthropicMessages: Array<{ role: "user" | "assistant"; content: string }> = [];
          
          if (conversationHistory.length === 1) {
            anthropicMessages.push({
              role: "user",
              content: `${systemPrompt}${finalInstructions}${conversationHistory[0].content}`,
            });
          } else {
            anthropicMessages.push({
              role: conversationHistory[0].role,
              content: conversationHistory[0].role === "user" 
                ? `${systemPrompt}${finalInstructions}${conversationHistory[0].content}`
                : conversationHistory[0].content,
            });
            for (let i = 1; i < conversationHistory.length; i++) {
              anthropicMessages.push(conversationHistory[i]);
            }
          }
          
          const stream = await anthropic.messages.stream({
            model: selectedLLM.model,
            max_tokens: maxTokens,
            temperature: 0.7,
            messages: anthropicMessages,
          });

          for await (const chunk of stream) {
            if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
              const content = chunk.delta.text;
              if (content) {
                accumulatedContent += content;
                res.write(`data: ${JSON.stringify({ content })}\n\n`);
                // @ts-ignore
                if (res.socket) res.socket.uncork();
                streamedLength += content.length;
              }
            }
          }
        } else {
          // OPENAI / DEEPSEEK / PERPLEXITY (Zhi 2, 3, 4)
          // These all use OpenAI-compatible API
          let apiClient: OpenAI;
          
          if (selectedLLM.provider === "openai") {
            if (!openai) throw new Error("OpenAI API key not configured");
            apiClient = openai;
          } else if (selectedLLM.provider === "deepseek") {
            apiClient = new OpenAI({
              apiKey: process.env.DEEPSEEK_API_KEY || "",
              baseURL: "https://api.deepseek.com/v1",
            });
          } else { // perplexity
            apiClient = new OpenAI({
              apiKey: process.env.PERPLEXITY_API_KEY || "",
              baseURL: "https://api.perplexity.ai",
            });
          }
          
          const messages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [
            { role: "system", content: `${systemPrompt}${finalInstructions}` }
          ];
          
          for (const msg of conversationHistory) {
            messages.push(msg);
          }
          
          const stream = await apiClient.chat.completions.create({
            model: selectedLLM.model,
            messages,
            max_tokens: maxTokens,
            temperature: 0.7,
            stream: true,
          });

          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || "";
            if (content) {
              accumulatedContent += content;
              res.write(`data: ${JSON.stringify({ content })}\n\n`);
              // @ts-ignore
              if (res.socket) res.socket.uncork();
              streamedLength += content.length;
            }
          }
        }
      } catch (error) {
        console.error(`${selectedLLM.provider} error:`, error);
        res.write(
          `data: ${JSON.stringify({ error: `Failed to generate response from ${selectedModel.toUpperCase()}` })}\n\n`
        );
        res.end();
        return;
      }

      // Remove verse marker from accumulated content (not used in Kuczynski app but keep for compatibility)
      const finalContent = accumulatedContent.split("---VERSE---")[0].trim();

      // NOTE: Quote verification disabled with RAG system
      // Quotes are now verified against retrieved chunks only

      // Save assistant message (no verses for Kuczynski philosophical responses)
      await storage.createMessage({
        conversationId: conversation.id,
        role: "assistant",
        content: finalContent,
        verseText: null,
        verseReference: null,
      });

      // Send completion signal
      res.write(`data: [DONE]\n\n`);
      res.end();
    } catch (error) {
      console.error("Error in chat stream:", error);
      res.write(
        `data: ${JSON.stringify({ error: "Failed to generate response" })}\n\n`
      );
      res.end();
    }
  });

  // Azure TTS endpoint
  app.post("/api/tts", async (req: any, res) => {
    try {
      const { text, voiceGender } = req.body;

      if (!text || typeof text !== 'string') {
        return res.status(400).json({ error: "Text is required" });
      }

      // Validate Azure credentials
      if (!process.env.AZURE_SPEECH_KEY || !process.env.AZURE_SPEECH_REGION) {
        return res.status(500).json({ error: "Azure Speech Service not configured" });
      }

      // Configure Azure Speech SDK
      const speechConfig = sdk.SpeechConfig.fromSubscription(
        process.env.AZURE_SPEECH_KEY,
        process.env.AZURE_SPEECH_REGION
      );

      // Select voice based on gender preference
      const voiceMap: Record<string, string> = {
        masculine: "en-US-GuyNeural",
        feminine: "en-US-JennyNeural",
        neutral: "en-US-AriaNeural",
      };
      
      speechConfig.speechSynthesisVoiceName = voiceMap[voiceGender] || "en-US-GuyNeural";

      // Create synthesizer to generate audio data in memory
      const synthesizer = new sdk.SpeechSynthesizer(speechConfig, null as any);

      // Synthesize speech
      synthesizer.speakTextAsync(
        text,
        (result) => {
          if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
            // Send audio data as binary
            res.setHeader('Content-Type', 'audio/wav');
            res.setHeader('Content-Length', result.audioData.byteLength);
            res.send(Buffer.from(result.audioData));
          } else {
            console.error("TTS synthesis failed:", result.errorDetails);
            res.status(500).json({ error: "Speech synthesis failed" });
          }
          synthesizer.close();
        },
        (error) => {
          console.error("TTS error:", error);
          res.status(500).json({ error: "Speech synthesis error" });
          synthesizer.close();
        }
      );
    } catch (error) {
      console.error("Error in TTS endpoint:", error);
      res.status(500).json({ error: "Failed to generate speech" });
    }
  });

  // Get all figures
  app.get("/api/figures", async (req: any, res) => {
    try {
      const figures = await storage.getAllFigures();
      res.json(figures);
    } catch (error) {
      console.error("Error getting figures:", error);
      res.status(500).json({ error: "Failed to get figures" });
    }
  });

  // Get specific figure
  app.get("/api/figures/:figureId", async (req: any, res) => {
    try {
      const figure = await storage.getFigure(req.params.figureId);
      if (!figure) {
        return res.status(404).json({ error: "Figure not found" });
      }
      res.json(figure);
    } catch (error) {
      console.error("Error getting figure:", error);
      res.status(500).json({ error: "Failed to get figure" });
    }
  });

  // Get messages for a figure conversation
  app.get("/api/figures/:figureId/messages", async (req: any, res) => {
    try {
      const sessionId = await getSessionId(req);
      const figureId = req.params.figureId;
      
      // Get or create conversation
      let conversation = await storage.getFigureConversation(sessionId, figureId);
      if (!conversation) {
        conversation = await storage.createFigureConversation(sessionId, { figureId });
      }
      
      const messages = await storage.getFigureMessages(conversation.id);
      res.json(messages);
    } catch (error) {
      console.error("Error getting figure messages:", error);
      res.status(500).json({ error: "Failed to get messages" });
    }
  });

  // Delete all messages for a figure conversation (clear chat history)
  app.delete("/api/figures/:figureId/messages", async (req: any, res) => {
    try {
      const sessionId = await getSessionId(req);
      const figureId = req.params.figureId;
      
      // Get conversation
      const conversation = await storage.getFigureConversation(sessionId, figureId);
      if (!conversation) {
        return res.status(404).json({ error: "No conversation found" });
      }
      
      // Delete all messages for this conversation
      await storage.deleteFigureMessages(conversation.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting figure messages:", error);
      res.status(500).json({ error: "Failed to delete messages" });
    }
  });

  // Chat with a specific figure (SSE streaming)
  app.post("/api/figures/:figureId/chat", async (req: any, res) => {
    try {
      const sessionId = await getSessionId(req);
      const figureId = req.params.figureId;
      const { message, uploadedDocument } = req.body;

      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "Message is required" });
      }

      // Get the figure
      const figure = await storage.getFigure(figureId);
      if (!figure) {
        return res.status(404).json({ error: "Figure not found" });
      }

      // Get or create conversation
      let conversation = await storage.getFigureConversation(sessionId, figureId);
      if (!conversation) {
        conversation = await storage.createFigureConversation(sessionId, { figureId });
      }

      // Save user message
      await storage.createFigureMessage({
        conversationId: conversation.id,
        role: "user",
        content: message,
      });

      // Get conversation history
      const history = await storage.getFigureMessages(conversation.id);

      // Get persona settings for response adaptation
      const personaSettings = await storage.getPersonaSettings(sessionId);
      
      // Build adaptive instructions
      let adaptiveInstructions = "";
      if (personaSettings) {
        const lengthInstruction = personaSettings.responseLength === 0 
          ? 'Auto (respond at whatever length best serves the question - brief for simple questions, extensive for complex ones)'
          : `Approximately ${personaSettings.responseLength} sentences (adjust as needed for clarity)`;
        
        adaptiveInstructions = `

ADAPTIVE RESPONSE INSTRUCTIONS:
Adjust your response to match the user's preferences:
- Intelligence Level: ${personaSettings.intelligenceLevel}/10 → ${
  personaSettings.intelligenceLevel >= 8 ? 'Highly sophisticated, technical discourse' :
  personaSettings.intelligenceLevel >= 5 ? 'Balanced - clear but rigorous' :
  'Accessible, explain complex ideas simply'
}
- Emotional Tone: ${personaSettings.emotionalTone}/10 → ${
  personaSettings.emotionalTone >= 7 ? 'Warm, engaging, personable' :
  personaSettings.emotionalTone >= 4 ? 'Balanced - professional yet approachable' :
  'Formal, analytical, measured'
}
- Formality: ${personaSettings.formality} style
- Response Length: ${lengthInstruction}

Adapt your complexity, vocabulary, tone, and length to match these settings.
`;
      }

      // VECTOR SEARCH: Find semantically relevant chunks from this figure's writings
      const relevantPassages = await findRelevantChunks(message, 6, figureId);
      
      // Handle uploaded document if present
      let documentContext = "";
      if (uploadedDocument && uploadedDocument.content) {
        const wordCount = uploadedDocument.content.split(/\s+/).length;
        documentContext = `

📄 UPLOADED DOCUMENT ANALYSIS REQUEST

The user has uploaded a document titled "${uploadedDocument.name}" (${wordCount} words) and is asking you to analyze, evaluate, or potentially rewrite it.

DOCUMENT CONTENT:
${'-'.repeat(80)}
${uploadedDocument.content}
${'-'.repeat(80)}

YOUR TASK:
Based on the user's message, you should:
- READ the document carefully and understand its argument/content
- EVALUATE it using your philosophical framework
- ANALYZE its strengths, weaknesses, logical structure, and assumptions
- If requested and the document is SHORT (under 500 words), consider REWRITING it in your own style while preserving the core ideas
- If the document is LONG (over 500 words), provide a detailed critique rather than a full rewrite

Apply your philosophical perspective to assess this work as you would any piece of writing that comes before you.
`;
      }
      
      // Logical structure parsing instructions for ALL figures
      const logicalStructureInstructions = `

🎯 CRITICAL: PARSE THE LOGICAL STRUCTURE OF THE QUESTION

Before responding, IDENTIFY what the question is ACTUALLY asking:
- Is it asking for a DEFINITION? → Define the concept precisely
- Is it asking for a MECHANISM explanation? → Explain HOW it works step-by-step  
- Is it asking for a DISTINCTION between two things? → Explain the difference explicitly
- Is it asking about a DERIVATION ("X follows from Y")? → Address that specific derivation claim
- Is it asking for DEFENSE against an objection? → Address that specific tension directly

❌ DO NOT pivot to prepared remarks or general talking points
✅ DO answer the SPECIFIC question asked with surgical precision
✅ EVERY component of the question must be addressed

EXAMPLE:
Question: "How does X mechanism work?"
❌ BAD: Restating general position about X (avoiding the mechanism question)
✅ GOOD: Explaining step-by-step HOW the mechanism operates

You are a thinker engaging with a specific intellectual challenge, NOT a politician deflecting to talking points.
`;
      
      // Combine figure's system prompt with relevant passages from their writings
      const enhancedSystemPrompt = figure.systemPrompt + "\n\n" + relevantPassages + documentContext + logicalStructureInstructions + adaptiveInstructions;

      // Setup SSE
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");
      res.flushHeaders();

      let fullResponse = "";

      try {
        if (openai) {
          // Build messages for OpenAI
          const messages: any[] = [
            { role: "system", content: enhancedSystemPrompt },
            ...history.map(msg => ({
              role: msg.role,
              content: msg.content,
            })),
          ];

          const stream = await openai.chat.completions.create({
            model: "gpt-4o",
            messages,
            stream: true,
            temperature: 0.7,
          });

          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || "";
            if (content) {
              fullResponse += content;
              res.write(`data: ${JSON.stringify({ content })}\n\n`);
            }
          }
        } else if (anthropic) {
          // Fallback to Anthropic
          const formattedMessages = history.map(msg => ({
            role: (msg.role === "assistant" ? "assistant" : "user") as "assistant" | "user",
            content: msg.content,
          }));

          const stream = await anthropic.messages.stream({
            model: "claude-sonnet-4-5-20250929",
            max_tokens: 8000,
            system: enhancedSystemPrompt,
            messages: formattedMessages,
          });

          for await (const chunk of stream) {
            if (chunk.type === "content_block_delta" && chunk.delta.type === "text_delta") {
              const content = chunk.delta.text;
              fullResponse += content;
              res.write(`data: ${JSON.stringify({ content })}\n\n`);
            }
          }
        } else {
          throw new Error("No AI provider configured");
        }

        // Save assistant message
        await storage.createFigureMessage({
          conversationId: conversation.id,
          role: "assistant",
          content: fullResponse,
        });

        res.write("data: [DONE]\n\n");
        res.end();
      } catch (streamError) {
        console.error("Error during streaming:", streamError);
        res.write(`data: ${JSON.stringify({ error: "Streaming error" })}\n\n`);
        res.end();
      }
    } catch (error) {
      console.error("Error in figure chat:", error);
      if (!res.headersSent) {
        res.status(500).json({ error: "Failed to process message" });
      }
    }
  });

  // Write paper endpoint - generate a long-form paper (up to 1500 words) in the figure's voice
  app.post("/api/figures/:figureId/write-paper", async (req: any, res) => {
    try {
      const sessionId = await getSessionId(req);
      const figureId = req.params.figureId;
      const { topic } = req.body;

      if (!topic || typeof topic !== "string") {
        return res.status(400).json({ error: "Topic is required" });
      }

      // Get the figure
      const figure = await storage.getFigure(figureId);
      if (!figure) {
        return res.status(404).json({ error: "Figure not found" });
      }

      // Get persona settings for response adaptation
      const personaSettings = await storage.getPersonaSettings(sessionId);

      // VECTOR SEARCH: Find highly relevant chunks from this figure's writings
      const relevantPassages = await findRelevantChunks(topic, 12, figureId); // More chunks for longer paper

      // Build paper writing prompt
      const paperPrompt = `${figure.systemPrompt}

RELEVANT PASSAGES FROM YOUR WRITINGS:
${relevantPassages}

🎯 CRITICAL: PARSE THE LOGICAL STRUCTURE OF THE TOPIC

Before writing, IDENTIFY what this topic is ACTUALLY asking for:
- Is it asking for a DEFINITION? → Define the concept precisely
- Is it asking for a MECHANISM explanation? → Explain HOW it works step-by-step
- Is it asking for a DISTINCTION between concepts? → Explain the difference explicitly
- Is it asking about a DERIVATION or logical argument? → Address that specific reasoning
- Is it asking for your POSITION on a debate? → Present your stance with supporting arguments

❌ DO NOT write generic talking points about the topic
✅ DO address the SPECIFIC logical structure of what's being asked
✅ EVERY component of the topic must be explored thoroughly

🎯 PAPER WRITING TASK:

You have been asked to write an original philosophical paper on the following topic:

"${topic}"

REQUIREMENTS:
- Write a comprehensive paper of approximately 1000-1500 words
- Write in YOUR authentic voice as ${figure.name}
- Draw on YOUR philosophical knowledge and the passages above
- Include verbatim quotes when they genuinely advance your argument (quality over quantity)
- Structure: Introduction → Main Arguments → Conclusion
- Be thorough and substantive - this is a serious academic paper
- Use plain text (no markdown formatting)
- Maintain philosophical rigor while being accessible
- Address the SPECIFIC logical structure of the topic (not just general remarks)
- DO philosophy, don't TEACH about your philosophy

${personaSettings ? `
STYLE ADAPTATION:
- Intelligence Level: ${personaSettings.intelligenceLevel}/10
- Emotional Tone: ${personaSettings.emotionalTone}/10
- Formality: ${personaSettings.formality}
` : ''}

Now write your paper on "${topic}":`;

      // Setup SSE headers
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");
      res.setHeader("X-Accel-Buffering", "no");
      res.flushHeaders();

      try {
        if (anthropic) {
          // Use Anthropic Claude for paper generation (best for long-form content)
          const stream = await anthropic.messages.stream({
            model: "claude-sonnet-4-5-20250929",
            max_tokens: 4000, // ~1500-2000 words
            temperature: 0.7,
            system: paperPrompt,
            messages: [
              {
                role: "user",
                content: `Write the paper now.`
              }
            ],
          });

          for await (const chunk of stream) {
            if (chunk.type === "content_block_delta" && chunk.delta.type === "text_delta") {
              const content = chunk.delta.text;
              res.write(`data: ${JSON.stringify({ content })}\n\n`);
            }
          }
        } else if (openai) {
          // Fallback to OpenAI
          const stream = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
              { role: "system", content: paperPrompt },
              { role: "user", content: "Write the paper now." }
            ],
            max_tokens: 4000,
            temperature: 0.7,
            stream: true,
          });

          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || "";
            if (content) {
              res.write(`data: ${JSON.stringify({ content })}\n\n`);
            }
          }
        } else {
          throw new Error("No AI provider configured");
        }

        res.write("data: [DONE]\n\n");
        res.end();
      } catch (streamError) {
        console.error("Error during paper generation:", streamError);
        res.write(`data: ${JSON.stringify({ error: "Failed to generate paper" })}\n\n`);
        res.end();
      }
    } catch (error) {
      console.error("Error in paper generation:", error);
      if (!res.headersSent) {
        res.status(500).json({ error: "Failed to generate paper" });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
