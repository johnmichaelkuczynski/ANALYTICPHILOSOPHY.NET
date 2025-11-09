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
    // Give priority to philosopher's own works
    const ownWorksCount = Math.ceil(topK * 0.67); // ~67% from own works
    const commonKnowledgeCount = topK - ownWorksCount; // ~33% from common pool
    
    // Search for most similar chunks from philosopher's own works
    const ownResults = await db.execute(
      sql`
        SELECT paper_title, content, chunk_index, 'own' as source
        FROM ${paperChunks}
        WHERE figure_id = ${figureId}
        ORDER BY embedding <=> ${JSON.stringify(queryEmbedding)}::vector
        LIMIT ${ownWorksCount}
      `
    );
    
    // Search for most similar chunks from common knowledge pool
    const commonResults = await db.execute(
      sql`
        SELECT paper_title, content, chunk_index, 'common' as source
        FROM ${paperChunks}
        WHERE figure_id = 'common'
        ORDER BY embedding <=> ${JSON.stringify(queryEmbedding)}::vector
        LIMIT ${commonKnowledgeCount}
      `
    );
    
    // Combine results: own works first, then common knowledge
    const allRows = [...(ownResults.rows || []), ...(commonResults.rows || [])];
    
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
    
    const ownCount = ownResults.rows?.length || 0;
    const commonCount = commonResults.rows?.length || 0;
    
    let response = `
=== CONCEPTUAL BRIEFING: RELEVANT MATERIAL ===

Retrieved ${ownCount} passage(s) from YOUR OWN WRITINGS and ${commonCount} passage(s) from the COMMON FUND OF KNOWLEDGE.
These are REFERENCE MATERIAL, not answers. Use them to inform your reasoning.

`;
    
    // Display own works first
    if (ownCount > 0) {
      response += `
--- FROM YOUR OWN WRITINGS ---

`;
      for (let i = 0; i < ownResults.rows!.length; i++) {
        const row = ownResults.rows![i] as { paper_title: string; content: string; chunk_index: number };
        response += `
[Your Work ${i + 1}: ${row.paper_title}]
${row.content}

`;
      }
    }
    
    // Display common knowledge
    if (commonCount > 0) {
      response += `
--- FROM COMMON FUND OF KNOWLEDGE ---

`;
      for (let i = 0; i < commonResults.rows!.length; i++) {
        const row = commonResults.rows![i] as { paper_title: string; content: string; chunk_index: number };
        response += `
[Common Knowledge ${i + 1}: ${row.paper_title}]
${row.content}

`;
      }
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
