import { normalizeAuthorName } from "./server/vector-search";

console.log("\n🧪 TESTING ALL AUTHOR VARIANTS - COMPREHENSIVE\n");

const tests = [
  // Test the exact list you provided
  { input: "JOHN-MICHAEL KUCZYNSKI", expected: "Kuczynski" },
  { input: "john-michael kuczynski", expected: "Kuczynski" },
  { input: "J.-M. Kuczynski", expected: "Kuczynski" },
  { input: "J.M. Kuczynski", expected: "Kuczynski" },
  { input: "RUSSELL", expected: "Russell" },
  { input: "bertrand russell", expected: "Russell" },
  { input: "GALILEO", expected: "Galileo" },
  { input: "galileo galilei", expected: "Galileo" },
  { input: "NIETZSCHE", expected: "Nietzsche" },
  { input: "friedrich nietzsche", expected: "Nietzsche" },
  { input: "FREUD", expected: "Freud" },
  { input: "sigmund freud", expected: "Freud" },
  { input: "JAMES", expected: "James" },
  { input: "william james", expected: "James" },
  { input: "LEIBNIZ", expected: "Leibniz" },
  { input: "gottfried leibniz", expected: "Leibniz" },
  { input: "ARISTOTLE", expected: "Aristotle" },
  { input: "LE BON", expected: "Le Bon" },
  { input: "gustave le bon", expected: "Le Bon" },
  { input: "PLATO", expected: "Plato" },
  { input: "DARWIN", expected: "Darwin" },
  { input: "charles darwin", expected: "Darwin" },
  { input: "KANT", expected: "Kant" },
  { input: "immanuel kant", expected: "Kant" },
  { input: "SCHOPENHAUER", expected: "Schopenhauer" },
  { input: "arthur schopenhauer", expected: "Schopenhauer" },
  { input: "JUNG", expected: "Jung" },
  { input: "carl jung", expected: "Jung" },
  { input: "C.G. Jung", expected: "Jung" },
  { input: "POE", expected: "Poe" },
  { input: "edgar allan poe", expected: "Poe" },
  { input: "MARX", expected: "Marx" },
  { input: "karl marx", expected: "Marx" },
  { input: "KEYNES", expected: "Keynes" },
  { input: "john maynard keynes", expected: "Keynes" },
  { input: "LOCKE", expected: "Locke" },
  { input: "john locke", expected: "Locke" },
  { input: "NEWTON", expected: "Newton" },
  { input: "isaac newton", expected: "Newton" },
  { input: "HUME", expected: "Hume" },
  { input: "david hume", expected: "Hume" },
  { input: "MACHIAVELLI", expected: "Machiavelli" },
  { input: "niccolo machiavelli", expected: "Machiavelli" },
  { input: "BIERCE", expected: "Bierce" },
  { input: "ambrose bierce", expected: "Bierce" },
  { input: "POINCARE", expected: "Poincare" },
  { input: "henri poincaré", expected: "Poincare" },
  { input: "BERGSON", expected: "Bergson" },
  { input: "henri bergson", expected: "Bergson" },
  { input: "JACK LONDON", expected: "London" },
  { input: "jack london", expected: "London" },
  { input: "ADLER", expected: "Adler" },
  { input: "alfred adler", expected: "Adler" },
  { input: "ENGELS", expected: "Engels" },
  { input: "friedrich engels", expected: "Engels" },
  { input: "ROUSSEAU", expected: "Rousseau" },
  { input: "jean-jacques rousseau", expected: "Rousseau" },
  { input: "VON MISES", expected: "Mises" },
  { input: "ludwig von mises", expected: "Mises" },
  { input: "VEBLEN", expected: "Veblen" },
  { input: "thorstein veblen", expected: "Veblen" },
  { input: "SWETT", expected: "Swett" },
  { input: "sophia swett", expected: "Swett" },
  { input: "BERKELEY", expected: "Berkeley" },
  { input: "george berkeley", expected: "Berkeley" },
  { input: "MAIMONIDES", expected: "Maimonides" },
  { input: "moses maimonides", expected: "Maimonides" },
  { input: "RAMBAM", expected: "Maimonides" },
  
  // CRITICAL: Test accent-only variants (caught by architect review)
  { input: "POINCARÉ", expected: "Poincare" },
  { input: "Poincaré", expected: "Poincare" },
  { input: "poincaré", expected: "Poincare" },
  { input: "RENÉ DESCARTES", expected: "Descartes" },
  { input: "René Descartes", expected: "Descartes" },
  { input: "NICCOLÒ MACHIAVELLI", expected: "Machiavelli" },
  { input: "Niccolò Machiavelli", expected: "Machiavelli" },
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
    console.log(`${status} "${test.input}" → "${result}" (expected "${test.expected}")`);
  }
}

console.log(`\n📊 RESULTS: ${passed}/${tests.length} passed, ${failed} failed\n`);

if (failed === 0) {
  console.log("🎉 ALL AUTHOR VARIANTS NORMALIZE CORRECTLY!\n");
}

process.exit(failed > 0 ? 1 : 0);
