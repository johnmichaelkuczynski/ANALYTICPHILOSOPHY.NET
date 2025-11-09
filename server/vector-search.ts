import { db } from "./db";
import { paperChunks } from "@shared/schema";
import { sql } from "drizzle-orm";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function findRelevantChunks(
  question: string,
  topK: number = 6,
  figureId: string = "jmk"
): Promise<string> {
  try {
    // Generate embedding for the question
    const embeddingResponse = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: question,
    });
    
    const queryEmbedding = embeddingResponse.data[0].embedding;
    
    // Calculate how many chunks to retrieve from each pool
    // Ensure MINIMUM of 1 from each pool when available, then distribute remaining
    let ownWorksCount: number;
    let commonKnowledgeCount: number;
    
    if (topK >= 2) {
      // Guarantee at least 1 from each pool
      const guaranteedMin = 2; // 1 from own, 1 from common
      const remaining = topK - guaranteedMin;
      
      // Distribute remaining with 67/33 ratio favoring own works
      const ownRemaining = Math.ceil(remaining * 0.67);
      const commonRemaining = remaining - ownRemaining;
      
      ownWorksCount = 1 + ownRemaining;
      commonKnowledgeCount = 1 + commonRemaining;
    } else {
      // topK = 1: prioritize own works
      ownWorksCount = 1;
      commonKnowledgeCount = 0;
    }
    
    // Retrieve MORE chunks than needed so we can merge and re-sort by similarity
    // This ensures we get the best matches across both pools
    const retrievalMultiplier = 2;
    
    // Search for most similar chunks from philosopher's own works
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
    
    // Search for most similar chunks from common knowledge pool
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
    
    // Combine and re-sort by similarity (distance) while preserving source labels
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
    
    // Merge all chunks
    const allChunks = [...ownChunks, ...commonChunks];
    
    // Sort by similarity (lower distance = more similar)
    allChunks.sort((a, b) => a.distance - b.distance);
    
    // Take top K, but ensure minimum representation from each pool
    const finalChunks: ChunkWithDistance[] = [];
    const ownFinal: ChunkWithDistance[] = [];
    const commonFinal: ChunkWithDistance[] = [];
    
    // First pass: collect chunks until BOTH minimums are satisfied
    // Don't break early even if topK is reached - we must satisfy minimums first
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
      
      // Only break when BOTH minimums are satisfied (or we run out of candidates)
      const bothMinimaSatisfied = !ownNeedsMore && !commonNeedsMore;
      if (bothMinimaSatisfied && finalChunks.length >= topK) break;
    }
    
    // Second pass: fill remaining slots with best matches regardless of source
    // This only runs if we haven't reached topK after satisfying minimums
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
    
    // Final sort: ensure results are truly ordered by semantic relevance
    finalChunks.sort((a, b) => a.distance - b.distance);
    
    const allRows = finalChunks;
    
    // Get figure name for messages
    const figureName = figureId === "freud" ? "Freud" : figureId === "jmk" ? "Kuczynski" : "this author";
    
    if (allRows.length === 0) {
      return `
=== NO EMBEDDINGS FOUND ===

The vector database appears empty. Please run the embedding generation script:
npm run generate-embeddings

Until then, use your full philosophical intelligence informed by ${figureName}'s overall approach.
`;
    }
    
    const ownCount = ownFinal.length;
    const commonCount = commonFinal.length;
    
    let response = `
=== CONCEPTUAL BRIEFING: RELEVANT MATERIAL ===

Retrieved ${finalChunks.length} semantically relevant passage(s):
${ownCount} from YOUR OWN WRITINGS, ${commonCount} from the COMMON FUND OF KNOWLEDGE.
Results are sorted by semantic relevance to your question.

These are REFERENCE MATERIAL, not answers. Use them to inform your reasoning.

`;
    
    // Display chunks in order of semantic relevance, with source labels
    for (let i = 0; i < finalChunks.length; i++) {
      const chunk = finalChunks[i];
      const sourceLabel = chunk.source === 'own' ? '[YOUR WORK]' : '[COMMON KNOWLEDGE]';
      response += `
${sourceLabel} Reference ${i + 1}: ${chunk.paper_title}
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
  } catch (error) {
    console.error("Vector search error:", error);
    
    // Get figure name for fallback message (before catching errors from query)
    const figureName = figureId === "freud" ? "Freud" : figureId === "jmk" ? "Kuczynski" : "this author";
    
    // Fallback: return a message that tells the LLM to work without specific passages
    return `
=== VECTOR SEARCH UNAVAILABLE ===

Could not retrieve relevant passages due to a technical error.
Use your full philosophical intelligence informed by ${figureName}'s overall approach and methods.
Extrapolate and reason philosophically in their style.
`;
  }
}
