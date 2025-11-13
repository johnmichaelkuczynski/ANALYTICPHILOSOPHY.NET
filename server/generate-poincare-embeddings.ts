import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { db } from "./db";
import { paperChunks } from "@shared/schema";
import OpenAI from "openai";
import { and, eq } from "drizzle-orm";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generatePoincareEmbeddings() {
  console.log('🔬 Starting Henri Poincaré embedding generation...\n');

  // Delete existing Poincaré entries from Common Fund
  console.log('🗑️  Clearing existing Poincaré embeddings from Common Fund...');
  await db.delete(paperChunks).where(
    and(
      eq(paperChunks.figureId, 'common'),
      eq(paperChunks.author, 'Henri Poincaré')
    )
  );
  console.log('✓ Cleared\n');

  const works = [
    {
      file: 'poincare_physics.txt',
      title: 'The New Physics and Its Evolution'
    },
    {
      file: 'poincare_science_hypothesis.txt',
      title: 'Science and Hypothesis'
    }
  ];

  let totalChunks = 0;
  const startTime = Date.now();

  for (const work of works) {
    console.log(`📄 Processing: ${work.title}`);
    
    const filePath = join(__dirname, work.file);
    const content = readFileSync(filePath, 'utf-8');

    // Split into chunks of approximately 250 words
    const words = content.split(/\s+/);
    const chunks: string[] = [];
    const chunkSize = 250;

    for (let i = 0; i < words.length; i += chunkSize) {
      const chunk = words.slice(i, i + chunkSize).join(' ');
      if (chunk.trim().length > 50) { // Only include substantial chunks
        chunks.push(chunk.trim());
      }
    }

    console.log(`   Created ${chunks.length} chunks`);

    // Process in batches of 16
    const batchSize = 16;
    let processedCount = 0;

    for (let i = 0; i < chunks.length; i += batchSize) {
      const batch = chunks.slice(i, i + batchSize);
      
      try {
        // Generate embeddings for the batch
        const embeddingResponse = await openai.embeddings.create({
          model: 'text-embedding-ada-002',
          input: batch,
        });

        // Store each chunk with its embedding
        for (let j = 0; j < batch.length; j++) {
          const embedding = embeddingResponse.data[j].embedding;
          
          await db.insert(paperChunks).values({
            figureId: 'common',
            content: batch[j],
            embedding: embedding as any,
            author: 'Henri Poincaré',
            paperTitle: work.title,
            chunkIndex: i + j,
          });

          processedCount++;
        }

        process.stdout.write(`   Processed ${processedCount}/${chunks.length} chunks\r`);
        
        // Small delay to respect rate limits
        if (i + batchSize < chunks.length) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      } catch (error) {
        console.error(`\n   ❌ Error processing batch ${i / batchSize + 1}:`, error);
        throw error;
      }
    }

    console.log(`\n   ✓ Successfully embedded ${processedCount} chunks from "${work.title}"\n`);
    totalChunks += processedCount;
  }

  const duration = ((Date.now() - startTime) / 1000 / 60).toFixed(1);
  console.log(`\n🎉 Done! Generated ${totalChunks} Poincaré embeddings across ${works.length} works in ${duration} minutes.`);
}

generatePoincareEmbeddings()
  .then(() => {
    console.log('✨ Henri Poincaré embedding generation complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Fatal error generating Poincaré embeddings:', error);
    process.exit(1);
  });
