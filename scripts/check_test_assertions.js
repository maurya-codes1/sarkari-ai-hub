const fs = require('fs');
const path = require('path');

const testDir = path.join(__dirname, '../backend/test');
const files = fs.readdirSync(testDir).filter(f => f.endsWith('.js'));

for (const file of files) {
  const content = fs.readFileSync(path.join(testDir, file), 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    if (line.includes('SELECT count') || line.includes('assert.strictEqual(count') || line.includes('assert.strictEqual(total') || line.includes('assert(count ===')) {
      console.log(`${file}:${idx + 1}: ${line.trim()}`);
    }
  });
}
