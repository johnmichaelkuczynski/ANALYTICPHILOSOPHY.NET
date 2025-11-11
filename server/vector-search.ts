import { db } from "./db";
import { paperChunks } from "@shared/schema";
import { sql } from "drizzle-orm";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Structured chunk data for API responses
export interface StructuredChunk {
  paperTitle: string;
  content: string;
  chunkIndex: number;
  distance: number;
  source: 'own' | 'common';
  figureId: string;
  tokens: number;
}

/**
 * Core semantic search - returns structured chunk data
 * Used by both chat UX (findRelevantChunks) and internal knowledge API
 */
export async function searchPhilosophicalChunks(
  question: string,
  topK: number = 6,
  figureId: string = "jmk"
): Promise<StructuredChunk[]> {
  try {
    // Generate embedding for the question
    const embeddingResponse = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: question,
    });
    
    const queryEmbedding = embeddingResponse.data[0].embedding;
    
    // Calculate how many chunks to retrieve from each pool
    let ownWorksCount: number;
    let commonKnowledgeCount: number;
    
    if (topK >= 2) {
      const guaranteedMin = 2;
      const remaining = topK - guaranteedMin;
      const ownRemaining = Math.ceil(remaining * 0.67);
      const commonRemaining = remaining - ownRemaining;
      
      ownWorksCount = 1 + ownRemaining;
      commonKnowledgeCount = 1 + commonRemaining;
    } else {
      ownWorksCount = 1;
      commonKnowledgeCount = 0;
    }
    
    const retrievalMultiplier = 2;
    
    // Search philosopher's own works
    const ownResults = await db.execute(
      sql`
        SELECT paper_title, content, chunk_index, 
               embedding <=> ${JSON.stringify(queryEmbedding)}::vector as distance
        FROM ${paperChunks}
        WHERE figure_id = ${figureId}
        ORDER BY distance
        LIMIT ${ownWorksCount * retrievalMultiplier}
      `
    );
    
    // Search common knowledge pool
    const commonResults = await db.execute(
      sql`
        SELECT paper_title, content, chunk_index,
               embedding <=> ${JSON.stringify(queryEmbedding)}::vector as distance
        FROM ${paperChunks}
        WHERE figure_id = 'common'
        ORDER BY distance
        LIMIT ${commonKnowledgeCount * retrievalMultiplier}
      `
    );
    
    interface ChunkWithDistance {
      paper_title: string;
      content: string;
      chunk_index: number;
      distance: number;
      source: 'own' | 'common';
    }
    
    const ownChunks: ChunkWithDistance[] = (ownResults.rows || []).map(row => ({
      ...(row as { paper_title: string; content: string; chunk_index: number; distance: number }),
      source: 'own' as const
    }));
    
    const commonChunks: ChunkWithDistance[] = (commonResults.rows || []).map(row => ({
      ...(row as { paper_title: string; content: string; chunk_index: number; distance: number }),
      source: 'common' as const
    }));
    
    const allChunks = [...ownChunks, ...commonChunks];
    allChunks.sort((a, b) => a.distance - b.distance);
    
    const finalChunks: ChunkWithDistance[] = [];
    const ownFinal: ChunkWithDistance[] = [];
    const commonFinal: ChunkWithDistance[] = [];
    
    // First pass: satisfy minimums
    for (const chunk of allChunks) {
      const ownNeedsMore = ownFinal.length < ownWorksCount;
      const commonNeedsMore = commonFinal.length < commonKnowledgeCount;
      
      if (chunk.source === 'own' && ownNeedsMore) {
        ownFinal.push(chunk);
        finalChunks.push(chunk);
      } else if (chunk.source === 'common' && commonNeedsMore) {
        commonFinal.push(chunk);
        finalChunks.push(chunk);
      }
      
      const bothMinimaSatisfied = !ownNeedsMore && !commonNeedsMore;
      if (bothMinimaSatisfied && finalChunks.length >= topK) break;
    }
    
    // Second pass: fill remaining slots
    if (finalChunks.length < topK) {
      for (const chunk of allChunks) {
        if (!finalChunks.includes(chunk)) {
          finalChunks.push(chunk);
          if (chunk.source === 'own') ownFinal.push(chunk);
          else commonFinal.push(chunk);
        }
        if (finalChunks.length >= topK) break;
      }
    }
    
    finalChunks.sort((a, b) => a.distance - b.distance);
    
    // Convert to structured format
    return finalChunks.map(chunk => ({
      paperTitle: chunk.paper_title,
      content: chunk.content,
      chunkIndex: chunk.chunk_index,
      distance: chunk.distance,
      source: chunk.source,
      figureId: chunk.source === 'own' ? figureId : 'common',
      tokens: Math.ceil(chunk.content.split(/\s+/).length * 1.3) // Rough token estimate
    }));
    
  } catch (error) {
    console.error("Vector search error:", error);
    return [];
  }
}

export async function findRelevantChunks(
  question: string,
  topK: number = 6,
  figureId: string = "jmk"
): Promise<string> {
  // Use the structured search helper
  const chunks = await searchPhilosophicalChunks(question, topK, figureId);
  
  // Get figure name for messages
  const figureName = figureId === "freud" ? "Freud" : figureId === "jmk" ? "Kuczynski" : "this author";
  
  if (chunks.length === 0) {
    return `
=== NO EMBEDDINGS FOUND ===

The vector database appears empty. Please run the embedding generation script:
npm run generate-embeddings

Until then, use your full philosophical intelligence informed by ${figureName}'s overall approach.
`;
  }
  
  const ownCount = chunks.filter(c => c.source === 'own').length;
  const commonCount = chunks.filter(c => c.source === 'common').length;
  
  let response = `
=== CONCEPTUAL BRIEFING: RELEVANT MATERIAL ===

Retrieved ${chunks.length} semantically relevant passage(s):
${ownCount} from YOUR OWN WRITINGS, ${commonCount} from the COMMON FUND OF KNOWLEDGE.
Results are sorted by semantic relevance to your question.

These are REFERENCE MATERIAL, not answers. Use them to inform your reasoning.

`;
  
  // Display chunks in order of semantic relevance, with source labels
  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    const sourceLabel = chunk.source === 'own' ? '[YOUR WORK]' : '[COMMON KNOWLEDGE]';
    response += `
${sourceLabel} Reference ${i + 1}: ${chunk.paperTitle}
${chunk.content}

`;
  }
  
  response += `
=== END OF BRIEFING MATERIAL ===

HOW TO USE THIS BRIEFING:

✅ DO: Ground your POSITION in YOUR OWN writings (primary sources)
✅ DO: Use COMMON KNOWLEDGE to enrich arguments, provide evidence, engage with broader context
✅ DO: Treat these as research notes that inform your thinking
✅ DO: Extract core principles and apply them to THIS question
✅ DO: Reason in your own voice, extending concepts to new contexts
✅ DO: Reference paper titles when asked about your works

❌ DON'T: Let common knowledge override your distinctive positions
❌ DON'T: Recite or summarize these passages
❌ DON'T: Quote extensively - use your own words
❌ DON'T: Treat these as the answer - they're the conceptual foundation
❌ DON'T: Teach ABOUT your philosophy - DO philosophy with these tools

CRITICAL: Your philosophical positions should align with YOUR WRITINGS. The common fund is for enrichment, not replacement.

Your task: Apply the ideas in these references to analyze THIS specific question.
Deploy your core reasoning method. Think with these concepts, don't report on them.
Be yourself - reason as YOU reason, not as a textbook explains you.
`;
  
  return response;
}
