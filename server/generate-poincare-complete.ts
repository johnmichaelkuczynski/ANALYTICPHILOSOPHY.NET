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

async function processWork(content: string, title: string): Promise<number> {
  // Split into chunks of approximately 250 words
  const words = content.split(/\s+/);
  const chunks: string[] = [];
  const chunkSize = 250;

  for (let i = 0; i < words.length; i += chunkSize) {
    const chunk = words.slice(i, i + chunkSize).join(' ');
    if (chunk.trim().length > 50) {
      chunks.push(chunk.trim());
    }
  }

  console.log(`   Created ${chunks.length} chunks from "${title}"`);

  // Process in batches of 16
  const batchSize = 16;
  let processedCount = 0;

  for (let i = 0; i < chunks.length; i += batchSize) {
    const batch = chunks.slice(i, i + batchSize);
    
    try {
      const embeddingResponse = await openai.embeddings.create({
        model: 'text-embedding-ada-002',
        input: batch,
      });

      for (let j = 0; j < batch.length; j++) {
        const embedding = embeddingResponse.data[j].embedding;
        
        await db.insert(paperChunks).values({
          figureId: 'common',
          content: batch[j],
          embedding: embedding as any,
          author: 'Henri Poincaré',
          paperTitle: title,
          chunkIndex: i + j,
        });

        processedCount++;
      }

      process.stdout.write(`   Processed ${processedCount}/${chunks.length} chunks (${((processedCount/chunks.length)*100).toFixed(1)}%)\r`);
      
      if (i + batchSize < chunks.length) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    } catch (error) {
      console.error(`\n   ❌ Error processing batch:`, error);
      throw error;
    }
  }

  console.log(`\n   ✓ Successfully embedded ${processedCount} chunks\n`);
  return processedCount;
}

async function generatePoincareComplete() {
  console.log('🔬 Starting Henri Poincaré complete embedding generation...\n');

  // Delete existing Poincaré entries from Common Fund
  console.log('🗑️  Clearing existing Poincaré embeddings from Common Fund...');
  await db.delete(paperChunks).where(
    and(
      eq(paperChunks.figureId, 'common'),
      eq(paperChunks.author, 'Henri Poincaré')
    )
  );
  console.log('✓ Cleared\n');

  const startTime = Date.now();
  let totalChunks = 0;

  // Process the comprehensive file containing all three works
  const comprehensiveFile = join(__dirname, '../attached_assets/Pasted-POINCARE-The-Project-Gutenberg-eBook-of-The-Foundations-of-Science-Science-and-Hypothesis-The--1762998684155_1762998684162.txt');
  const fullContent = readFileSync(comprehensiveFile, 'utf-8');

  // Extract each work separately
  const lines = fullContent.split('\n');
  
  // Find the main content sections
  let scienceAndHypothesisStart = -1;
  let valueOfScienceStart = -1;
  let scienceAndMethodStart = -1;
  let endMarker = -1;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === 'SCIENCE AND HYPOTHESIS' && scienceAndHypothesisStart === -1 && i > 400) {
      scienceAndHypothesisStart = i;
    } else if (line.startsWith('THE VALUE OF SCIENCE') && valueOfScienceStart === -1 && i > 400) {
      valueOfScienceStart = i;
    } else if (line === 'SCIENCE AND METHOD' && scienceAndMethodStart === -1 && i > 400) {
      scienceAndMethodStart = i;
    } else if (line.includes('*** END OF THE PROJECT GUTENBERG EBOOK') && endMarker === -1) {
      endMarker = i;
    }
  }

  if (endMarker === -1) endMarker = lines.length;

  console.log(`📍 Found content sections:`);
  console.log(`   Science and Hypothesis: line ${scienceAndHypothesisStart}`);
  console.log(`   The Value of Science: line ${valueOfScienceStart}`);
  console.log(`   Science and Method: line ${scienceAndMethodStart}`);
  console.log(`   End: line ${endMarker}\n`);

  // Process Science and Hypothesis
  if (scienceAndHypothesisStart > 0 && valueOfScienceStart > 0) {
    console.log('📄 Processing: Science and Hypothesis');
    const content = lines.slice(scienceAndHypothesisStart, valueOfScienceStart).join('\n');
    totalChunks += await processWork(content, 'Science and Hypothesis');
  }

  // Process The Value of Science
  if (valueOfScienceStart > 0 && scienceAndMethodStart > 0) {
    console.log('📄 Processing: The Value of Science');
    const content = lines.slice(valueOfScienceStart, scienceAndMethodStart).join('\n');
    totalChunks += await processWork(content, 'The Value of Science');
  }

  // Process Science and Method
  if (scienceAndMethodStart > 0 && endMarker > 0) {
    console.log('📄 Processing: Science and Method');
    const content = lines.slice(scienceAndMethodStart, endMarker).join('\n');
    totalChunks += await processWork(content, 'Science and Method');
  }

  const duration = ((Date.now() - startTime) / 1000 / 60).toFixed(1);
  console.log(`🎉 Done! Generated ${totalChunks} Poincaré embeddings across 3 works in ${duration} minutes.`);
}

generatePoincareComplete()
  .then(() => {
    console.log('✨ Henri Poincaré complete embedding generation finished!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  });
