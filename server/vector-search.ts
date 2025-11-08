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
=== RELEVANT PASSAGES FROM ${figureName.toUpperCase()}'S WRITINGS ===

Found ${results.rows.length} highly relevant passage(s) based on semantic similarity to your question.
Use these as your foundation, then extrapolate with your full intelligence.

`;
    
    for (let i = 0; i < results.rows.length; i++) {
      const row = results.rows[i] as { paper_title: string; content: string; chunk_index: number };
      response += `
--- PASSAGE ${i + 1}: ${row.paper_title} (Chunk ${row.chunk_index + 1}) ---
${row.content}

`;
    }
    
    response += `
=== END OF RELEVANT PASSAGES ===

INSTRUCTIONS:
1. Ground your answer in these passages (include at least one verbatim quote)
2. Use your full intelligence to extrapolate beyond them
3. Maintain ${figureName}'s ${figureStyle} style
4. Answer varies each time - explore different angles
5. CITING YOUR OWN WORKS: If asked "In which works do you discuss X?" or similar questions, you CAN and SHOULD list the paper titles shown above (e.g., "I discuss this in **[Paper Title 1]**, **[Paper Title 2]**, etc."). The paper titles in the passages represent YOUR actual published works - reference them by name when relevant!
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
