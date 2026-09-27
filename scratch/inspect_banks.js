const fs = require('fs');

function checkFile(filename) {
  console.log(`\n=== Checking ${filename} ===`);
  const content = fs.readFileSync(filename, 'utf8');
  const banks = [...content.matchAll(/const\s+([A-Z0-9_]+)\s*=\s*\[/g)].map(m => m[1]);
  banks.forEach((b, idx) => {
    const next = banks[idx + 1];
    const start = content.indexOf(b);
    const end = next ? content.indexOf(next) : content.length;
    const chunk = content.slice(start, end);
    const qCount = (chunk.match(/"topic":/g) || []).length;
    console.log(`${b}: ${qCount} questions`);
  });
}

checkFile('public/js/master-class12-bank.js');
checkFile('public/js/master-competitive-bank.js');
checkFile('public/js/master-high-yield-bank.js');

