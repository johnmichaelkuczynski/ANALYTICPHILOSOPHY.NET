import { detectAuthorFromQuery } from "./server/vector-search";

async function testDetection() {
  console.log("\n🧪 TESTING AUTHOR DETECTION\n");
  
  const tests = [
    "GIVE ME KUCZYNSKI QUOTES",
    "GIVE ME JOHN-MICHAEL KUCZYNSKI QUOTES",  
    "GIVE ME ARISTOTLE QUOTES",
    "GIVE ME PLATO QUOTES",
    "GIVE ME MARX QUOTES",
    "GIVE ME LOCKE QUOTES"
  ];
  
  for (const query of tests) {
    const detected = await detectAuthorFromQuery(query);
    console.log(`Query: "${query}"`);
    console.log(`  Detected: ${detected || "NONE"}`);
    console.log();
  }
  
  process.exit(0);
}

testDetection().catch(err => {
  console.error(err);
  process.exit(1);
});
