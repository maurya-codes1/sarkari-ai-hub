const fs = require('fs');
const path = require('path');
const testDir = path.resolve(__dirname, '../test');
for (const f of fs.readdirSync(testDir)) {
  if (f.endsWith('.js')) {
    const c = fs.readFileSync(path.join(testDir, f), 'utf8');
    for (const term of ['192', '164', '165', '189', 'OFFICIAL_DOCUMENT', 'TIER_2_VERIFIED_PYQ', 'OFFICIAL_PYQ']) {
      if (c.includes(term)) {
        console.log(`Found '${term}' in test: ${f}`);
      }
    }
  }
}
