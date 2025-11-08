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
    
    // Search for most similar chunks using cosine distance
    // pgvector uses <=> for cosine distance
    const results = await db.execute(
      sql`
        SELECT paper_title, content, chunk_index
        FROM ${paperChunks}
        WHERE figure_id = ${figureId}
        ORDER BY embedding <=> ${JSON.stringify(queryEmbedding)}::vector
        LIMIT ${topK}
      `
    );
    
    // Get figure name for messages
    const figureName = figureId === "freud" ? "Freud" : figureId === "jmk" ? "Kuczynski" : "this author";
    const figureStyle = figureId === "freud" ? "psychoanalytic" : figureId === "jmk" ? "rigorous, analytical" : "appropriate";
    
    if (!results.rows || results.rows.length === 0) {
      return `
=== NO EMBEDDINGS FOUND ===

The vector database appears empty. Please run the embedding generation script:
npm run generate-embeddings

Until then, use your full philosophical intelligence informed by ${figureName}'s overall approach.
`;
    }
    
    let response = `
=== CONCEPTUAL BRIEFING: RELEVANT MATERIAL FROM YOUR WRITINGS ===

Retrieved ${results.rows.length} semantically relevant passage(s) for context.
These are REFERENCE MATERIAL, not answers. Use them to inform your reasoning.

`;
    
    for (let i = 0; i < results.rows.length; i++) {
      const row = results.rows[i] as { paper_title: string; content: string; chunk_index: number };
      response += `
[Reference ${i + 1}: ${row.paper_title}]
${row.content}

`;
    }
    
    response += `
=== END OF BRIEFING MATERIAL ===

HOW TO USE THIS BRIEFING:

✅ DO: Treat these as research notes that inform your thinking
✅ DO: Extract core principles and apply them to THIS question
✅ DO: Reason in your own voice, extending concepts to new contexts
✅ DO: Reference paper titles when asked about your works

❌ DON'T: Recite or summarize these passages
❌ DON'T: Quote extensively - use your own words
❌ DON'T: Treat these as the answer - they're the conceptual foundation
❌ DON'T: Teach ABOUT your philosophy - DO philosophy with these tools

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
