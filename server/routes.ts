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
import { findRelevantChunks, searchPhilosophicalChunks, type StructuredChunk } from "./vector-search";
import {
  insertPersonaSettingsSchema,
  insertGoalSchema,
} from "@shared/schema";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { verifyZhiAuth } from "./internal-auth";
import multer from "multer";
import * as pdfParse from "pdf-parse";
import * as mammoth from "mammoth";

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

  // Delete a message
  app.delete("/api/messages/:id", async (req: any, res) => {
    try {
      const sessionId = await getSessionId(req);
      const messageId = parseInt(req.params.id, 10);
      
      if (isNaN(messageId)) {
        return res.status(400).json({ error: "Invalid message ID" });
      }
      
      // Get current user's conversation
      const conversation = await storage.getCurrentConversation(sessionId);
      if (!conversation) {
        return res.status(404).json({ error: "No conversation found" });
      }
      
      // Verify the message belongs to this conversation (ownership check)
      const messages = await storage.getMessages(conversation.id);
      const messageToDelete = messages.find(m => m.id === messageId);
      
      if (!messageToDelete) {
        return res.status(404).json({ error: "Message not found" });
      }
      
      // Only delete if ownership is verified
      await storage.deleteMessage(messageId);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting message:", error);
      res.status(500).json({ error: "Failed to delete message" });
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
      
      // Build the complete system prompt using centralized builder
      const baseSystemPrompt = personaSettings 
        ? buildSystemPrompt(personaSettings)
        : buildSystemPrompt({
            responseLength: 0,
            writePaper: false,
            quoteFrequency: 2,
          });

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
      
      // 🚨 MANDATORY QUOTE PROVISION RULE - HIGHEST PRIORITY 🚨
      const mandatoryQuoteRule = `
🚨 CRITICAL RESEARCH AID REQUIREMENT - MANDATORY QUOTE PROVISION 🚨

This application is a RESEARCH AID. When users explicitly ask for quotes from your works, you MUST provide them. This is non-negotiable and overrides all other stylistic or methodological preferences.

MANDATORY COMPLIANCE:
- If the user asks: "Give me quotes about X" → YOU MUST provide quotes about X
- If the user asks: "What do you say about Y in your work?" → YOU MUST cite specific passages
- If the user asks: "Quote your views on Z" → YOU MUST quote your actual writings

🚨 CRITICAL: QUOTES MUST BE VERBATIM TEXT FROM YOUR ACTUAL WRITINGS 🚨

When providing quotes, you MUST:
1. ✅ Extract VERBATIM text from the retrieved passages below (word-for-word, exactly as written)
2. ✅ Cite the ACTUAL paper/book title from the passage metadata
3. ✅ Use quotation marks around the exact text from your writings
4. ❌ NEVER generate synthetic "thematic" quotes that sound like you but aren't actual text
5. ❌ NEVER create paraphrased summaries and present them as quotes
6. ❌ NEVER fabricate citations to works not in the retrieved passages

EXAMPLE OF CORRECT QUOTE (VERBATIM):
✅ "The mind is a battlefield where the will and desire constantly contend for dominance." (OCD and Philosophy)
[This is actual text from your writings - VERBATIM extraction]

EXAMPLE OF INCORRECT QUOTE (SYNTHETIC/THEMATIC):
❌ "The mind is not a passive receptacle of experiences but an active participant in shaping its own reality." (The Theory of Mind)
[This sounds thematic but isn't actual verbatim text - FORBIDDEN]

When asked for multiple quotes, each one must be an actual extracted sentence or paragraph from the retrieved passages below. Check the passages and pull EXACT text.

ONLY ACCEPTABLE RESPONSE IF NO QUOTES EXIST:
- "I don't have specific quotes on [exact topic] in my retrieved writings. The closest I can offer is [related material]."

NEVER ACCEPTABLE:
- Generating synthetic quotes that "represent" your views
- "Providing quotes doesn't align with my methodology"
- "I prefer not to quote myself"
- "That's not how I engage"
- Any refusal based on philosophical style or approach

REMEMBER: Users rely on this app to ACCESS your actual writings. Denying quote requests defeats the entire purpose. When asked for quotes, PROVIDE QUOTES - VERBATIM TEXT ONLY.
`;

      // Aggressive attack mode instructions for ALL figures
      const attackModeInstructions = `

⚔️ ATTACK MODE - IMMEDIATE ENGAGEMENT:

❌ FORBIDDEN OPENINGS:
"To address this question..."
"Let me first explain..."
"It is important to recognize..."
"One must consider..."
"In my view..." (unless immediately committing)

✅ ATTACK IMMEDIATELY:
"This argument fails because..."
"The real question is not X but Y..."
"This conflates [specific issues]..."
"The mechanism: [direct explanation]..."

START WITH THE ATTACK. No preambles, no stage-setting, no pedagogical narration.

🔥 COMMIT WITHOUT HEDGING:

❌ BANNED (unless genuinely uncertain):
"Perhaps...", "Might...", "Could be said...", "It seems...", "One could argue..."

✅ COMMIT DECISIVELY:
If something is wrong, say it's wrong. If something follows, say it follows. If you're uncertain, show WHY you're uncertain through reasoning, not hedging.

🎯 REFRAME CONFUSED QUESTIONS:

If the question accepts false premises, REJECT them first and show why the question itself is confused. Don't politely answer malformed questions - fix them first.

🧠 NAME SPECIFIC TARGETS:

Not "many philosophers argue..." → "Hume's position fails because..."
Not "some believe..." → "Descartes claims X, which is mistaken..."

Engage actual positions held by actual thinkers.

🔧 SHOW MECHANISM:

Don't just assert conclusions. DEMONSTRATE how and why through visible reasoning. Walk through the logical structure step by step.

💎 QUOTES AS LOGICAL TOOLS:

Quotes must do work - advancing arguments, not decorating them. Each quote should be a step in reasoning, not credentials or background.

You are a living intellect attacking problems, NOT a textbook summarizing views.
`;
      
      // Combine all prompt components: MANDATORY QUOTE RULE (highest priority) + philosopher identity + system rules + RAG + attack mode
      const enhancedSystemPrompt = mandatoryQuoteRule + "\n\n" + figure.systemPrompt + "\n\n" + baseSystemPrompt + "\n\n" + relevantPassages + documentContext + attackModeInstructions;

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

      // Build paper writing prompt with aggressive attack mode
      const paperPrompt = `${figure.systemPrompt}

RELEVANT PASSAGES FROM YOUR WRITINGS:
${relevantPassages}

⚔️ PAPER WRITING TASK - ATTACK MODE:

You have been asked to write an original philosophical paper on: "${topic}"

REQUIREMENTS:
- 1000-1500 words of direct philosophical engagement
- Write in YOUR authentic voice as ${figure.name}
- Plain text only (no markdown formatting)

CRITICAL APPROACH - IMMEDIATE ATTACK:

❌ FORBIDDEN OPENINGS:
"This paper will explore..."
"In this essay, I will examine..."
"To understand this topic, we must first..."
"It is important to recognize..."

✅ ATTACK IMMEDIATELY:
Start with your thesis, your objection, your reframing, or your mechanism.
NO preambles about what you're going to do - DO IT.

STRUCTURE:
Opening → Immediate engagement with the problem/thesis
Body → Deploy your conceptual apparatus with visible mechanism
Conclusion → Decisive verdict (no hedging or "balance")

COMMIT WITHOUT HEDGING:
If something is wrong, say it's wrong. If something follows, say it follows.
Ban: "Perhaps...", "Might...", "Could be said...", "It seems..."

NAME SPECIFIC TARGETS:
Not "many philosophers argue..." → "Hume's position fails because..."
Not "some believe..." → "Descartes claims X, which is mistaken..."
Engage actual positions held by actual thinkers.

SHOW MECHANISM:
Demonstrate HOW and WHY through visible reasoning. Walk through logical structure step by step.

QUOTES AS WEAPONS:
Include quotes ONLY when they advance your argument. Each quote should be a logical move, not decoration.

REFRAME IF NEEDED:
If the topic accepts false premises, reject them first and show why the question itself needs reformulation.

${personaSettings ? `
STYLE ADAPTATION:
- Intelligence Level: ${personaSettings.intelligenceLevel}/10
- Emotional Tone: ${personaSettings.emotionalTone}/10
- Formality: ${personaSettings.formality}
` : ''}

You are a living intellect attacking this problem. Write the paper NOW - no narration, no stage-setting, just direct philosophical work:`;

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

  // Model Builder - Generate isomorphic theories
  app.post("/api/model-builder", async (req: any, res) => {
    try {
      const { originalText, customInstructions, mode, previousModel, critique } = req.body;

      if (!originalText || typeof originalText !== "string") {
        return res.status(400).json({ error: "Original text is required" });
      }

      // Validate refinement mode parameters
      if (mode === "refine") {
        if (!previousModel || typeof previousModel !== "string") {
          return res.status(400).json({ error: "Previous model is required for refinement" });
        }
        if (!critique || typeof critique !== "string") {
          return res.status(400).json({ error: "Critique is required for refinement" });
        }
      }

      // Set up SSE
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");

      const MODEL_BUILDER_SYSTEM_PROMPT = `# MODEL BUILDER: PHILOSOPHICAL THEORY VALIDATOR & REINTERPRETATION ENGINE

You are a model-theoretic analysis tool for philosophical theories. Your job is NOT exegesis (what did the philosopher mean?) but MODEL THEORY (what assignment of meanings makes the formal structure true?).

## Three-Tier Response System

### TIER 1: LITERALLY TRUE
If the theory is correct as stated, confirm its validity by:
1. Identifying primitives/constants and their meanings
2. Showing the formal structure
3. Demonstrating truth

Format:
**Theory:** [name]
**Literal Status:** TRUE
**Primitives:** [list with meanings]
**Structure:** [formal relationships]
**Validation:** [why it's true]

### TIER 2: TRUE UNDER REINTERPRETATION
If false literally but true under some model:
1. Identify primitives needing reinterpretation
2. Provide new assignments for those primitives
3. Show how formal structure is preserved
4. Demonstrate reinterpreted claims are true

Format:
**Theory:** [name]
**Literal Status:** FALSE
**Model Type:** [Domain Swap / Category Correction / Deflationary / Level Shift]
**Primitive Reinterpretations:**
- [Original term] → [New meaning]
**Structure Preserved:**
- [Original relationship] → [Same relationship in model]
**Validation:**
- [Original claim] as [New claim] = TRUE because [justification]
**Summary:** [what theory becomes under model]

### TIER 3: CLOSEST VIABLE MODEL
If incoherent even under reinterpretation:
1. Identify nearest coherent theory
2. Explain minimal modifications needed
3. Provide model for modified version

Format:
**Theory:** [name]
**Literal Status:** INCOHERENT
**Nearest Coherent Theory:** [description]
**Required Modifications:** [minimal changes]
**Model for Modified Theory:** [as in Tier 2]

## Pattern Recognition Types

### DOMAIN SWAP (Leibniz, Rawls pattern)
Original primitives refer to Domain A → Reinterpreted primitives refer to Domain B
Formal relations preserved across domains
Example: Leibniz Monadology
- "monad" (windowless substance) → causal-informational structure
- "no windows" (no direct interaction) → no token-level causation

### CATEGORY CORRECTION (James pattern)
Claims about Category A are actually about Category B
Example: James Pragmatism
- "truth is what works" (metaphysical) → "knowledge is empowering" (epistemological)
- Utility marks knowledge, not truth

### DEFLATIONARY REINTERPRETATION (Berkeley, Plato patterns)
Mystical/inflated terms get mundane meanings
Example: Berkeley
- "God perceives to keep existing" → "Objects exist independently"
- Continuous existence explained without deity

### LEVEL SHIFT (Marx pattern)
Social/external structure → psychological/internal structure
Example: Marx
- Economic base → id/ego
- Ideological superstructure → superego
- Material foundation determines normative overlay

## Critical Examples

**Leibniz Monadology:**
- Literal: FALSE (no windowless substances)
- Model: TRUE (information structures with mediated causation)
- Type: Domain Swap
- "monad" → computational/informational unit
- "no windows" → no direct token causation
- "pre-established harmony" → lawful causal mediation

**Rawls Justice:**
- Literal: FALSE (justice isn't fairness)
- Model: TRUE (sustainable hierarchy)
- Type: Domain Swap + Deflationary
- "veil of ignorance" → coalition formation constraint
- "original position" → strategic bargaining
- "fairness" → sustainability under power dynamics

**Plato Recollection:**
- Literal: FALSE (no pre-birth knowledge)
- Model: TRUE (analytic knowledge)
- Type: Category Correction
- "recollection" → analytic reasoning
- "soul saw Forms" → grasp of logical relations
- "learning is remembering" → unpacking concepts

**Spinoza God/Nature:**
- Literal: DEPENDS (pantheism debate)
- Model: TRUE (naturalism)
- Type: Deflationary
- "God" → nature/reality
- "infinite attributes" → properties of reality
- "necessity" → causal determinism

## Your Task

Analyze the provided theory:
1. Parse primitives, structure, key claims
2. Test literal truth
3. If false, identify reinterpretation type
4. Generate model with new primitive assignments
5. Verify structure preservation
6. Validate that reinterpreted claims are true

Be precise, formal, and show your work. This is mathematics with philosophy.`;

      let userPrompt: string;
      
      if (mode === "refine") {
        // Refinement mode: include previous model and critique
        userPrompt = `REFINEMENT REQUEST

ORIGINAL THEORY:
${originalText}

PREVIOUS MODEL ANALYSIS:
${previousModel}

USER CRITIQUE:
${critique}

${customInstructions ? `ADDITIONAL INSTRUCTIONS:\n${customInstructions}\n\n` : ''}Please revise the model analysis above based on the user's critique. Address the specific issues raised while maintaining the formal model-theoretic approach. Show what changed and why.`;
      } else {
        // Initial generation mode
        userPrompt = customInstructions
          ? `${customInstructions}\n\n---\n\nORIGINAL THEORY:\n${originalText}`
          : `ORIGINAL THEORY:\n${originalText}`;
      }

      const anthropic = new Anthropic({
        apiKey: process.env.ANTHROPIC_API_KEY!,
      });

      const stream = await anthropic.messages.stream({
        model: "claude-sonnet-4-20250514",
        max_tokens: 4000,
        temperature: 0.7,
        system: MODEL_BUILDER_SYSTEM_PROMPT,
        messages: [
          {
            role: "user",
            content: userPrompt,
          },
        ],
      });

      for await (const chunk of stream) {
        if (
          chunk.type === "content_block_delta" &&
          chunk.delta.type === "text_delta"
        ) {
          const data = JSON.stringify({ content: chunk.delta.text });
          res.write(`data: ${data}\n\n`);
        }
      }

      res.write(`data: [DONE]\n\n`);
      res.end();
    } catch (error) {
      console.error("Error in model builder:", error);
      if (!res.headersSent) {
        res.status(500).json({ error: "Failed to generate model" });
      } else {
        res.write(`data: ${JSON.stringify({ error: "Stream error" })}\n\n`);
        res.end();
      }
    }
  });

  // ========================================
  // INTERNAL API: ZHI Knowledge Provider
  // ========================================

  // Request schema for knowledge queries
  // Note: figureId parameter retained for backward compatibility but queries unified 'common' pool
  const knowledgeRequestSchema = z.object({
    query: z.string().min(1).max(1000),
    figureId: z.string().optional().default("common"), // All queries now search unified knowledge base
    author: z.string().optional(), // NEW: Filter by author name (partial match via ILIKE)
    maxResults: z.number().int().min(1).max(20).optional().default(10),
    includeQuotes: z.boolean().optional().default(false),
    minQuoteLength: z.number().int().min(10).max(200).optional().default(50),
    numQuotes: z.number().int().min(1).max(50).optional().default(50), // NEW: Control number of quotes returned
    maxCharacters: z.number().int().min(100).max(50000).optional().default(10000),
  });

  // Helper: Apply spell correction for common OCR/conversion errors
  function applySpellCorrection(text: string): string {
    return text
      // Common OCR errors - double-v mistakes
      .replace(/\bvvith\b/gi, 'with')
      .replace(/\bvvhich\b/gi, 'which')
      .replace(/\bvvhat\b/gi, 'what')
      .replace(/\bvvhen\b/gi, 'when')
      .replace(/\bvvhere\b/gi, 'where')
      .replace(/\bvvhile\b/gi, 'while')
      .replace(/\bvvho\b/gi, 'who')
      .replace(/\bvve\b/gi, 'we')
      // Common OCR errors - letter confusion
      .replace(/\btbe\b/gi, 'the')
      .replace(/\btlie\b/gi, 'the')
      .replace(/\bwitli\b/gi, 'with')
      .replace(/\btbat\b/gi, 'that')
      .replace(/\btliis\b/gi, 'this')
      // Missing apostrophes (common OCR error)
      .replace(/\bdont\b/gi, "don't")
      .replace(/\bcant\b/gi, "can't")
      .replace(/\bwont\b/gi, "won't")
      .replace(/\bdoesnt\b/gi, "doesn't")
      .replace(/\bisnt\b/gi, "isn't")
      .replace(/\barent\b/gi, "aren't")
      .replace(/\bwerent\b/gi, "weren't")
      .replace(/\bwasnt\b/gi, "wasn't")
      .replace(/\bhasnt\b/gi, "hasn't")
      .replace(/\bhavent\b/gi, "haven't")
      .replace(/\bshouldnt\b/gi, "shouldn't")
      .replace(/\bwouldnt\b/gi, "wouldn't")
      .replace(/\bcouldnt\b/gi, "couldn't")
      // Fix spacing around punctuation
      .replace(/\s+([,.!?;:])/g, '$1')
      .replace(/([,.!?;:])\s+/g, '$1 ')
      // Normalize whitespace
      .replace(/\s+/g, ' ')
      .trim();
  }

  // Helper: Check if sentence is complete (ends with proper punctuation)
  function isCompleteSentence(text: string): boolean {
    const trimmed = text.trim();
    // Must end with . ! ? or closing quote followed by punctuation
    return /[.!?]["']?$/.test(trimmed) && !trimmed.endsWith('..') && !trimmed.endsWith('p.');
  }

  // Helper: Check if text is a citation fragment
  function isCitationFragment(text: string): boolean {
    const lowerText = text.toLowerCase();
    return (
      // Starts with section/chapter numbers
      /^\d+\.\d+\s+[A-Z]/.test(text) || // "9.0 The raven paradox"
      /^Chapter\s+\d+/i.test(text) ||
      /^Section\s+\d+/i.test(text) ||
      // Starts with citation markers
      /^(see|cf\.|e\.g\.|i\.e\.|viz\.|ibid\.|op\. cit\.|loc\. cit\.)/i.test(text) ||
      // Contains obvious citation patterns
      /\(\d{4}\)/.test(text) || // (1865)
      /\d{4},\s*p\.?\s*\d+/.test(text) || // 1865, p. 23
      /^\s*-\s*[A-Z][a-z]+\s+[A-Z][a-z]+/.test(text) || // - William James
      /^["']?book,\s+the\s+/i.test(text) || // Starts with "book, the"
      // Ends with incomplete citation
      /,\s*p\.?$/i.test(text) || // ends with ", p." or ", p"
      /\(\s*[A-Z][a-z]+,?\s*\d{4}[),\s]*$/.test(text) // ends with (Author, 1865) or similar
    );
  }

  // Helper: Score quote quality and relevance
  function scoreQuote(quote: string, query: string): number {
    let score = 0;
    const quoteLower = quote.toLowerCase();
    const queryWords = query.toLowerCase().split(/\s+/).filter(w => w.length > 3);
    
    // Bonus for query word matches (relevance)
    for (const word of queryWords) {
      if (quoteLower.includes(word)) {
        score += 10;
      }
    }
    
    // Bonus for philosophical keywords
    const philosophicalKeywords = [
      'truth', 'knowledge', 'reality', 'existence', 'being', 'consciousness',
      'mind', 'reason', 'logic', 'ethics', 'morality', 'virtue', 'justice',
      'freedom', 'liberty', 'necessity', 'cause', 'effect', 'substance',
      'essence', 'nature', 'universe', 'god', 'soul', 'perception', 'experience',
      'understanding', 'wisdom', 'philosophy', 'metaphysics', 'epistemology'
    ];
    
    for (const keyword of philosophicalKeywords) {
      if (quoteLower.includes(keyword)) {
        score += 3;
      }
    }
    
    // Penalty for very short quotes
    if (quote.length < 100) score -= 5;
    
    // Bonus for medium length (100-300 chars is ideal)
    if (quote.length >= 100 && quote.length <= 300) score += 10;
    
    // Penalty for numbers/dates (likely citations)
    const numberCount = (quote.match(/\d+/g) || []).length;
    if (numberCount > 2) score -= 5;
    
    return score;
  }

  // Helper: Extract quotes from text passages with intelligent sentence detection
  function extractQuotes(
    passages: StructuredChunk[],
    query: string = "",
    minLength: number = 50,
    maxQuotes: number = 50
  ): Array<{ quote: string; source: string; chunkIndex: number; score: number }> {
    const quotes: Array<{ quote: string; source: string; chunkIndex: number; score: number }> = [];
    
    for (const passage of passages) {
      // Clean and normalize content
      const cleanedContent = passage.content
        .replace(/\s+/g, ' ')  // Normalize whitespace
        .trim();
      
      // Smart sentence splitting that preserves citations
      // Split on . ! ? but NOT on abbreviations like "p.", "Dr.", "Mr.", "i.e.", "e.g."
      const sentences: string[] = [];
      let currentSentence = '';
      let i = 0;
      
      while (i < cleanedContent.length) {
        const char = cleanedContent[i];
        currentSentence += char;
        
        if (char === '.' || char === '!' || char === '?') {
          // Check if this is an abbreviation (followed by lowercase or another period)
          const nextChar = cleanedContent[i + 1];
          const prevWord = currentSentence.trim().split(/\s+/).pop() || '';
          
          const isAbbreviation = (
            /^(Dr|Mr|Mrs|Ms|Prof|Jr|Sr|vs|etc|i\.e|e\.g|cf|viz|ibid|op|loc|p|pp|vol|ch|sec|fig)\.$/i.test(prevWord) ||
            nextChar === '.' ||
            (nextChar && nextChar === nextChar.toLowerCase() && /[a-z]/.test(nextChar))
          );
          
          if (!isAbbreviation && nextChar && /\s/.test(nextChar)) {
            // This is a sentence boundary
            sentences.push(currentSentence.trim());
            currentSentence = '';
            i++; // Skip the space
            continue;
          }
        }
        
        i++;
      }
      
      // Add any remaining content
      if (currentSentence.trim()) {
        sentences.push(currentSentence.trim());
      }
      
      // Process each sentence
      for (let sentence of sentences) {
        // Apply spell correction
        sentence = applySpellCorrection(sentence);
        
        // Check if it's a complete sentence
        if (!isCompleteSentence(sentence)) continue;
        
        // Check length bounds
        if (sentence.length < minLength || sentence.length > 500) continue;
        
        // Check word count
        const wordCount = sentence.split(/\s+/).length;
        if (wordCount < 8) continue; // Require at least 8 words for substantive content
        
        // Check for citation fragments
        if (isCitationFragment(sentence)) continue;
        
        // Check for formatting artifacts
        const hasFormattingArtifacts = 
          sentence.includes('(<< back)') ||
          sentence.includes('(<<back)') ||
          sentence.includes('[<< back]') ||
          sentence.includes('*_') ||
          sentence.includes('_*');
        
        if (hasFormattingArtifacts) continue;
        
        // Check for excessive special characters
        const specialCharCount = (sentence.match(/[<>{}|\\]/g) || []).length;
        if (specialCharCount > 5) continue;
        
        // Score the quote
        const score = scoreQuote(sentence, query);
        
        quotes.push({
          quote: sentence,
          source: passage.paperTitle,
          chunkIndex: passage.chunkIndex,
          score
        });
      }
    }
    
    // Deduplicate
    const uniqueQuotes = Array.from(new Map(quotes.map(q => [q.quote, q])).values());
    
    // Sort by score (best first)
    uniqueQuotes.sort((a, b) => b.score - a.score);
    
    // Return top N quotes
    return uniqueQuotes.slice(0, maxQuotes);
  }

  // ========================================
  // ZHI QUERY API: Structured knowledge queries
  // ========================================
  
  // Request schema for /zhi/query endpoint
  const zhiQuerySchema = z.object({
    query: z.string().min(1).max(1000).optional(),
    author: z.string().optional(), // Filter by author/philosopher name
    work: z.string().optional(), // Filter by specific work/paper title
    keywords: z.array(z.string()).optional(), // Array of keywords to search
    limit: z.number().int().min(1).max(50).optional().default(10),
    includeQuotes: z.boolean().optional().default(false),
    minQuoteLength: z.number().int().min(10).max(200).optional().default(50),
  });

  app.post("/zhi/query", verifyZhiAuth, async (req, res) => {
    try {
      // Validate request body
      const validationResult = zhiQuerySchema.safeParse(req.body);
      
      if (!validationResult.success) {
        return res.status(400).json({
          error: "Invalid request format",
          details: validationResult.error.errors
        });
      }
      
      const { query, author, work, keywords, limit, includeQuotes, minQuoteLength } = validationResult.data;
      
      // Build search query from available fields
      let searchQuery = query || '';
      if (keywords && keywords.length > 0) {
        searchQuery = searchQuery ? `${searchQuery} ${keywords.join(' ')}` : keywords.join(' ');
      }
      if (author) {
        searchQuery = searchQuery ? `${searchQuery} ${author}` : author;
      }
      if (work) {
        searchQuery = searchQuery ? `${searchQuery} ${work}` : work;
      }
      
      if (!searchQuery) {
        return res.status(400).json({
          error: "Must provide at least one of: query, author, work, or keywords"
        });
      }
      
      // Audit log
      const appId = (req as any).zhiAuth?.appId || "unknown";
      console.log(`[ZHI Query API] ${appId}: "${searchQuery}" (limit: ${limit})`);
      
      // CRITICAL FIX: Normalize author parameter + auto-detect from query text
      let detectedAuthor = author;
      
      // Step 1: Normalize explicit author parameter (handles "john-michael kuczynski" → "Kuczynski")
      if (detectedAuthor) {
        const { normalizeAuthorName } = await import("./vector-search");
        const normalized = normalizeAuthorName(detectedAuthor);
        if (normalized !== detectedAuthor) {
          console.log(`[ZHI Query API] 📝 Normalized author: "${detectedAuthor}" → "${normalized}"`);
          detectedAuthor = normalized;
        }
      }
      
      // Step 2: Auto-detect from query text if still no author
      if (!detectedAuthor && query) {
        const { detectAuthorFromQuery } = await import("./vector-search");
        detectedAuthor = await detectAuthorFromQuery(query);
        if (detectedAuthor) {
          console.log(`[ZHI Query API] 🎯 Auto-detected author from query: "${detectedAuthor}"`);
        }
      }
      
      // Perform semantic search with STRICT author filtering
      // When author detected/specified → returns ONLY that author's content
      const passages = await searchPhilosophicalChunks(searchQuery, limit, "common", detectedAuthor);
      
      // No post-filtering - semantic search already handles author/work relevance
      const filteredPassages = passages;
      
      // Extract quotes if requested
      const quotes = includeQuotes ? extractQuotes(filteredPassages, query || "", minQuoteLength, 50) : [];
      
      // Build structured response with citations
      const results = filteredPassages.map(passage => ({
        excerpt: passage.content,
        citation: {
          author: passage.author, // CRITICAL: Use actual author field, not extracted from title
          work: passage.paperTitle,
          chunkIndex: passage.chunkIndex,
        },
        relevance: 1 - passage.distance, // Convert distance to relevance score (0-1)
        tokens: passage.tokens
      }));
      
      const response = {
        results,
        quotes: quotes.map(q => ({
          text: q.quote,
          citation: {
            work: q.source,
            chunkIndex: q.chunkIndex
          }
        })),
        meta: {
          resultsReturned: results.length,
          limitApplied: limit,
          queryProcessed: searchQuery,
          filters: {
            author: author || null,
            work: work || null,
            keywords: keywords || null
          },
          timestamp: Date.now()
        }
      };
      
      res.json(response);
      
    } catch (error) {
      console.error("[ZHI Query API] Error:", error);
      res.status(500).json({ 
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // Internal knowledge provider endpoint
  app.post("/api/internal/knowledge", verifyZhiAuth, async (req, res) => {
    try {
      // Validate request body
      const validationResult = knowledgeRequestSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        return res.status(400).json({
          error: "Invalid request format",
          details: validationResult.error.errors
        });
      }
      
      const { query, figureId, author, maxResults, includeQuotes, minQuoteLength, numQuotes, maxCharacters } = validationResult.data;
      
      // Audit log
      const appId = (req as any).zhiAuth?.appId || "unknown";
      console.log(`[Knowledge Provider] ${appId} querying unified knowledge base: "${query}" (figureId: ${figureId}, author: ${author || 'none'}, results: ${maxResults})`);
      
      // CRITICAL FIX: Map figureId → author for backward compatibility with EZHW
      let detectedAuthor = author;
      
      // Step 1: Map figureId to author name if no explicit author provided
      if (!detectedAuthor && figureId && figureId !== 'common') {
        const { mapFigureIdToAuthor } = await import("./vector-search");
        const mappedAuthor = mapFigureIdToAuthor(figureId);
        if (mappedAuthor) {
          console.log(`[Knowledge Provider] 🔄 Mapped figureId "${figureId}" → author "${mappedAuthor}"`);
          detectedAuthor = mappedAuthor;
        }
      }
      
      // Step 2: Normalize explicit author parameter (handles "john-michael kuczynski" → "Kuczynski")
      if (detectedAuthor) {
        const { normalizeAuthorName } = await import("./vector-search");
        const normalized = normalizeAuthorName(detectedAuthor);
        if (normalized !== detectedAuthor) {
          console.log(`[Knowledge Provider] 📝 Normalized author: "${detectedAuthor}" → "${normalized}"`);
          detectedAuthor = normalized;
        }
      }
      
      // Step 3: Auto-detect from query text if still no author
      if (!detectedAuthor && query) {
        const { detectAuthorFromQuery } = await import("./vector-search");
        detectedAuthor = await detectAuthorFromQuery(query);
        if (detectedAuthor) {
          console.log(`[Knowledge Provider] 🎯 Auto-detected author from query: "${detectedAuthor}"`);
        }
      }
      
      // Perform semantic search with STRICT author filtering
      // When author detected/specified → returns ONLY that author's content
      const passages = await searchPhilosophicalChunks(query, maxResults, figureId, detectedAuthor);
      
      // Truncate passages to respect maxCharacters limit
      let totalChars = 0;
      const truncatedPassages: StructuredChunk[] = [];
      
      for (const passage of passages) {
        if (totalChars + passage.content.length <= maxCharacters) {
          truncatedPassages.push(passage);
          totalChars += passage.content.length;
        } else {
          // Include partial passage if there's room
          const remainingChars = maxCharacters - totalChars;
          if (remainingChars > 100) {
            truncatedPassages.push({
              ...passage,
              content: passage.content.substring(0, remainingChars) + "..."
            });
          }
          break;
        }
      }
      
      // Extract quotes if requested
      const quotes = includeQuotes ? extractQuotes(truncatedPassages, query || "", minQuoteLength, numQuotes || 50) : [];
      
      // Build response
      const response = {
        success: true,
        meta: {
          query,
          figureId,
          resultsReturned: truncatedPassages.length,
          totalCharacters: totalChars,
          quotesExtracted: quotes.length,
          timestamp: Date.now()
        },
        passages: truncatedPassages.map(p => ({
          author: p.author, // REQUIRED: Author attribution for every passage
          paperTitle: p.paperTitle,
          content: p.content,
          chunkIndex: p.chunkIndex,
          semanticDistance: p.distance,
          source: p.source,
          figureId: p.figureId,
          tokens: p.tokens
        })),
        quotes: quotes.map(q => ({
          text: q.quote,
          source: q.source,
          chunkIndex: q.chunkIndex
        }))
      };
      
      res.json(response);
      
    } catch (error) {
      console.error("[Knowledge Provider] Error:", error);
      res.status(500).json({ 
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // ========================================
  // QUOTE GENERATOR: Site Authors
  // ========================================
  
  app.post("/api/quotes/generate", async (req, res) => {
    try {
      const { query, author, numQuotes = 10 } = req.body;

      if (!author) {
        return res.status(400).json({
          success: false,
          error: "Author is required"
        });
      }

      const quotesLimit = Math.min(Math.max(parseInt(numQuotes) || 10, 1), 50);
      
      // Use default query if none provided
      const searchQuery = query?.trim() || "important philosophical insights and key ideas";

      console.log(`[Quote Generator] Generating ${quotesLimit} quotes from ${author} on: "${searchQuery}"`);

      // Use semantic search to find relevant passages
      const passages = await searchPhilosophicalChunks(searchQuery, 15, 'common', author);

      if (passages.length === 0) {
        return res.json({
          success: true,
          quotes: [],
          meta: {
            query,
            author,
            quotesFound: 0
          }
        });
      }

      // Extract quotes using improved algorithm with spell correction and quality ranking
      const extractedQuotes = extractQuotes(passages, searchQuery, 50, quotesLimit);
      
      // Map to final format (without score field for API response)
      const finalQuotes = extractedQuotes.map(q => ({
        quote: q.quote,
        source: q.source,
        chunkIndex: q.chunkIndex
      }));

      console.log(`[Quote Generator] Found ${finalQuotes.length} quotes from ${author}`);

      res.json({
        success: true,
        quotes: finalQuotes.map(q => ({
          text: q.quote,
          source: q.source,
          chunkIndex: q.chunkIndex
        })),
        meta: {
          query: searchQuery,
          author,
          quotesFound: finalQuotes.length
        }
      });

    } catch (error) {
      console.error("[Quote Generator] Error:", error);
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : "Failed to generate quotes"
      });
    }
  });

  // ========================================
  // QUOTE EXTRACTION FROM UPLOADED FILES
  // ========================================

  // Configure multer for file uploads
  const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB limit
    },
    fileFilter: (req, file, cb) => {
      const allowedTypes = ['text/plain', 'application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'];
      if (allowedTypes.includes(file.mimetype) || file.originalname.match(/\.(txt|pdf|docx|doc)$/i)) {
        cb(null, true);
      } else {
        cb(new Error('Invalid file type. Only .txt, .pdf, .doc, and .docx files are allowed.'));
      }
    }
  });

  // Extract quotes from uploaded document
  app.post("/api/quotes/extract", upload.single('file'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ 
          success: false,
          error: "No file uploaded" 
        });
      }

      const { query = 'all', numQuotes = '10' } = req.body;
      const quotesLimit = Math.min(Math.max(parseInt(numQuotes) || 10, 1), 50);

      let textContent = '';

      // Parse file based on type
      const fileExtension = req.file.originalname.split('.').pop()?.toLowerCase();
      
      if (fileExtension === 'txt') {
        textContent = req.file.buffer.toString('utf-8');
      } else if (fileExtension === 'pdf') {
        const pdfData = await pdfParse(req.file.buffer);
        textContent = pdfData.text;
      } else if (fileExtension === 'docx') {
        const result = await mammoth.extractRawText({ buffer: req.file.buffer });
        textContent = result.value;
      } else if (fileExtension === 'doc') {
        // For legacy .doc files, try mammoth (works for some)
        try {
          const result = await mammoth.extractRawText({ buffer: req.file.buffer });
          textContent = result.value;
        } catch (err) {
          return res.status(400).json({
            success: false,
            error: "Legacy .doc format not fully supported. Please convert to .docx or .pdf"
          });
        }
      } else {
        return res.status(400).json({
          success: false,
          error: "Unsupported file type"
        });
      }

      if (!textContent.trim()) {
        return res.status(400).json({
          success: false,
          error: "Document appears to be empty or could not be parsed"
        });
      }

      console.log(`[Quote Extraction] Processing ${req.file.originalname} (${textContent.length} chars)`);

      // Extract quotes from the document text
      const quotes: string[] = [];
      
      // First, try to find explicit quotes (text in quotation marks)
      const explicitQuotePattern = /"([^"]{50,500})"/g;
      const explicitMatches = Array.from(textContent.matchAll(explicitQuotePattern));
      for (const match of explicitMatches) {
        if (match[1] && match[1].trim().length >= 50) {
          quotes.push(match[1].trim());
        }
      }

      // Then extract substantial sentences as quotes
      const sentences = textContent.split(/[.!?]\s+/);
      for (const sentence of sentences) {
        const trimmed = sentence.trim();
        
        // Filter by query if provided
        if (query && query !== 'all') {
          const queryLower = query.toLowerCase();
          const sentenceLower = trimmed.toLowerCase();
          if (!sentenceLower.includes(queryLower)) {
            continue;
          }
        }

        // Accept sentences between 50-500 chars
        if (trimmed.length >= 50 && trimmed.length <= 500) {
          const wordCount = trimmed.split(/\s+/).length;
          
          // Quality filters
          const hasFormattingArtifacts = 
            trimmed.includes('(<< back)') ||
            trimmed.includes('(<<back)') ||
            trimmed.includes('[<< back]') ||
            trimmed.includes('*_') ||
            trimmed.includes('_*') ||
            /\(\d+\)\s*$/.test(trimmed) ||
            /\[\d+\]\s*$/.test(trimmed);
          
          const specialCharCount = (trimmed.match(/[<>{}|\\]/g) || []).length;
          const hasExcessiveSpecialChars = specialCharCount > 5;
          
          if (wordCount >= 5 && !hasFormattingArtifacts && !hasExcessiveSpecialChars) {
            quotes.push(trimmed);
          }
        }
      }

      // Deduplicate and limit
      const uniqueQuotes = Array.from(new Set(quotes));
      const finalQuotes = uniqueQuotes.slice(0, quotesLimit);

      console.log(`[Quote Extraction] Found ${finalQuotes.length} quotes from ${req.file.originalname}`);

      res.json({
        success: true,
        quotes: finalQuotes,
        meta: {
          filename: req.file.originalname,
          totalQuotesFound: uniqueQuotes.length,
          quotesReturned: finalQuotes.length,
          documentLength: textContent.length
        }
      });

    } catch (error) {
      console.error("[Quote Extraction] Error:", error);
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : "Failed to extract quotes"
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
