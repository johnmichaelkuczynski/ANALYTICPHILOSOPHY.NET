import { db } from "./db";
import { paperChunks } from "@shared/schema";
import { sql } from "drizzle-orm";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Structured chunk data for API responses
export interface StructuredChunk {
  author: string; // REQUIRED: Author attribution for every chunk
  paperTitle: string;
  content: string;
  chunkIndex: number;
  distance: number;
  source: 'own' | 'common';
  figureId: string;
  tokens: number;
}

/**
 * UNIFIED KNOWLEDGE BASE: Core semantic search with MANDATORY author prioritization
 * Returns structured chunk data from unified Common Fund containing ALL philosophical texts
 * Used by both chat UX (findRelevantChunks) and internal knowledge API
 * 
 * CRITICAL BEHAVIOR: When authorFilter is specified, ONLY returns that author's content.
 * This ensures "KUCZYNSKI QUOTES" → 100% Kuczynski, never other authors.
 */
export async function searchPhilosophicalChunks(
  question: string,
  topK: number = 6,
  figureId: string = "common", // Default to unified knowledge base
  authorFilter?: string // Optional: filter by author name (partial match) - STRICTLY ENFORCED
): Promise<StructuredChunk[]> {
  try {
    // Generate embedding for the question
    const embeddingResponse = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: question,
    });
    
    const queryEmbedding = embeddingResponse.data[0].embedding;
    
    // TWO-TIER APPROACH: If author specified, ONLY search that author's content
    // This guarantees author-specific requests return ONLY that author, never mixed results
    if (authorFilter) {
      console.log(`[Vector Search] STRICT author filter: "${authorFilter}" - will return ONLY this author's content`);
      
      // Search ONLY the specified author's chunks
      const authorResults = await db.execute(
        sql`
          SELECT author, paper_title, content, chunk_index, 
                 embedding <=> ${JSON.stringify(queryEmbedding)}::vector as distance
          FROM ${paperChunks}
          WHERE figure_id = 'common'
            AND author ILIKE ${'%' + authorFilter + '%'}
          ORDER BY distance
          LIMIT ${topK}
        `
      );
      
      const authorChunks = (authorResults.rows || []).map((row: any) => {
        const r = row as { author: string; paper_title: string; content: string; chunk_index: number; distance: number };
        return {
          author: r.author,
          paperTitle: r.paper_title,
          content: r.content,
          chunkIndex: r.chunk_index,
          distance: r.distance,
          source: 'common' as const,
          figureId: 'common',
          tokens: Math.ceil(r.content.split(/\s+/).length * 1.3)
        };
      });
      
      console.log(`[Vector Search] Found ${authorChunks.length} chunks from author matching "${authorFilter}"`);
      
      // STRICT MODE: Return ONLY author's content, even if fewer than requested
      // This prevents mixing in other authors' content when user explicitly requests one author
      return authorChunks;
    }
    
    // NO AUTHOR FILTER: Search all content (normal semantic search)
    const results = await db.execute(
      sql`
        SELECT author, paper_title, content, chunk_index, 
               embedding <=> ${JSON.stringify(queryEmbedding)}::vector as distance
        FROM ${paperChunks}
        WHERE figure_id = 'common'
        ORDER BY distance
        LIMIT ${topK}
      `
    );
    
    // Convert to structured format
    return (results.rows || []).map((row: any) => {
      const r = row as { author: string; paper_title: string; content: string; chunk_index: number; distance: number };
      return {
        author: r.author,
        paperTitle: r.paper_title,
        content: r.content,
        chunkIndex: r.chunk_index,
        distance: r.distance,
        source: 'common' as const,
        figureId: 'common',
        tokens: Math.ceil(r.content.split(/\s+/).length * 1.3) // Rough token estimate
      };
    });
    
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
  
  let response = `
=== CONCEPTUAL BRIEFING: RELEVANT MATERIAL ===

Retrieved ${chunks.length} semantically relevant passage(s) from the UNIFIED KNOWLEDGE BASE.
This includes works from ALL philosophical figures (Kuczynski, Freud, James, Veblen, Russell, and 40+ others).
Results are sorted by semantic relevance to your question.

These are REFERENCE MATERIAL, not answers. Use them to inform your reasoning.

`;
  
  // Display chunks in order of semantic relevance
  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    response += `
[Reference ${i + 1}] ${chunk.paperTitle} by ${chunk.author}
${chunk.content}

`;
  }
  
  response += `
=== END OF BRIEFING MATERIAL ===

HOW TO USE THIS BRIEFING:

✅ DO: Treat these as research notes that inform your thinking
✅ DO: Extract core principles and apply them to THIS question
✅ DO: Reason in your authentic philosophical voice
✅ DO: Reference paper titles when relevant
✅ DO: Synthesize ideas from multiple sources when appropriate

❌ DON'T: Recite or summarize these passages
❌ DON'T: Quote extensively - use your own words
❌ DON'T: Treat these as the answer - they're the conceptual foundation
❌ DON'T: Teach ABOUT philosophy - DO philosophy with these tools

Your task: Apply the ideas in these references to analyze THIS specific question.
Deploy your core reasoning method. Think with these concepts, don't report on them.
Be yourself - reason as YOU reason, not as a textbook explains you.
`;
  
  return response;
}

/**
 * Detect author name from query text using database lookup
 * Returns author name if detected, undefined otherwise
 */
export async function detectAuthorFromQuery(queryText: string): Promise<string | undefined> {
  // Common author names to check (covers most queries)
  const authorPatterns = [
    'Kuczynski', 'Russell', 'Nietzsche', 'Plato', 'Aristotle', 'Marx', 
    'Kant', 'Hegel', 'Freud', 'Jung', 'James', 'Dewey', 'Leibniz',
    'Newton', 'Darwin', 'Veblen', 'Lenin', 'Engels', 'Descartes',
    'Spinoza', 'Hobbes', 'Berkeley', 'Rousseau', 'Mill', 'Poe',
    'Mises', 'Smith', 'Spencer', 'Marden', 'Adler', 'Peirce',
    'Poincare', 'Maimonides'
  ];
  
  const queryUpper = queryText.toUpperCase();
  
  for (const authorName of authorPatterns) {
    if (queryUpper.includes(authorName.toUpperCase())) {
      // Verify this author exists in database
      const chunks = await db.execute(
        sql`SELECT COUNT(*) as count FROM ${paperChunks} 
            WHERE figure_id = 'common' AND author ILIKE ${'%' + authorName + '%'} 
            LIMIT 1`
      );
      
      const count = (chunks.rows[0] as any)?.count;
      if (count && parseInt(count) > 0) {
        return authorName;
      }
    }
  }
  
  return undefined;
}
