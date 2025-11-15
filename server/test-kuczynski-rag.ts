import { searchPhilosophicalChunks } from "./vector-search";

async function testKuczynskiRAG() {
  console.log("=== Testing Kuczynski Position Retrieval ===\n");
  
  // Test 1: General epistemology query
  console.log("Test 1: Searching for epistemology positions...");
  const epistemologyResults = await searchPhilosophicalChunks(
    "What is the nature of knowledge and how can we know things?",
    5,
    "common",
    "Kuczynski"
  );
  
  console.log(`Found ${epistemologyResults.length} results`);
  epistemologyResults.forEach((result, i) => {
    console.log(`\n[${i + 1}] Position: ${result.paperTitle}`);
    console.log(`    Content: ${result.content.substring(0, 150)}...`);
    console.log(`    Distance: ${result.distance.toFixed(4)}`);
  });
  
  // Test 2: Philosophy of mind query
  console.log("\n\nTest 2: Searching for philosophy of mind positions...");
  const mindResults = await searchPhilosophicalChunks(
    "What is consciousness and how does the mind work?",
    5,
    "common",
    "Kuczynski"
  );
  
  console.log(`Found ${mindResults.length} results`);
  mindResults.forEach((result, i) => {
    console.log(`\n[${i + 1}] Position: ${result.paperTitle}`);
    console.log(`    Content: ${result.content.substring(0, 150)}...`);
    console.log(`    Distance: ${result.distance.toFixed(4)}`);
  });
  
  // Test 3: Check database stats
  console.log("\n\n=== Database Statistics ===");
  const { db } = await import("./db");
  const { paperChunks } = await import("@shared/schema");
  const { sql, eq, and, isNotNull } = await import("drizzle-orm");
  
  const stats = await db.select({ count: sql<number>`count(*)` })
    .from(paperChunks)
    .where(and(
      isNotNull(paperChunks.positionId),
      eq(paperChunks.author, "J.-M. Kuczynski")
    ));
  
  console.log(`Total Kuczynski positions in database: ${stats[0]?.count || 0}`);
  
  // Check domain distribution
  const domains = await db.execute(
    sql`
      SELECT domain, COUNT(*) as count
      FROM ${paperChunks}
      WHERE position_id IS NOT NULL AND author = 'J.-M. Kuczynski'
      GROUP BY domain
      ORDER BY count DESC
      LIMIT 10
    `
  );
  
  console.log("\nTop domains:");
  domains.rows.forEach((row: any) => {
    console.log(`  ${row.domain}: ${row.count} positions`);
  });
  
  console.log("\n✅ RAG system test complete!");
}

testKuczynskiRAG().catch(console.error);
