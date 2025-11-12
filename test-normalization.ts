import { normalizeAuthorName } from "./server/vector-search";

console.log("\n🧪 TESTING AUTHOR NORMALIZATION\n");

const tests = [
  // What EZHW sends → What database needs
  { input: "john-michael kuczynski", expected: "Kuczynski" },
  { input: "j-m kuczynski", expected: "Kuczynski" },
  { input: "aristotle", expected: "Aristotle" },
  { input: "karl marx", expected: "Marx" },
  { input: "john locke", expected: "Locke" },
  { input: "friedrich nietzsche", expected: "Nietzsche" },
  { input: "bertrand russell", expected: "Russell" },
  { input: "william james", expected: "James" },
  { input: "Kuczynski", expected: "Kuczynski" }, // Already normalized
];

let passed = 0;
let failed = 0;

for (const test of tests) {
  const result = normalizeAuthorName(test.input);
  const status = result === test.expected ? "✅" : "❌";
  
  if (result === test.expected) {
    passed++;
  } else {
    failed++;
  }
  
  console.log(`${status} "${test.input}" → "${result}" (expected "${test.expected}")`);
}

console.log(`\n📊 Results: ${passed} passed, ${failed} failed\n`);

process.exit(failed > 0 ? 1 : 0);
