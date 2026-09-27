const fs = require('fs');
const path = require('path');

const jsDir = path.join(__dirname, '..', 'public', 'js');
const files = fs.readdirSync(jsDir).filter(f => f.endsWith('.js'));

const declared = new Map();

files.forEach(file => {
  const content = fs.readFileSync(path.join(jsDir, file), 'utf8');
  // Match top-level let / const (beginning of line)
  const regex = /^(?:let|const)\s+([a-zA-Z0-9_$]+)\s*=/gm;
  let m;
  while ((m = regex.exec(content)) !== null) {
    const varName = m[1];
    if (!declared.has(varName)) {
      declared.set(varName, []);
    }
    declared.get(varName).push(file);
  }
});

console.log('Checking for top-level duplicate let/const variables across scripts:');
let duplicates = 0;
for (const [v, flist] of declared.entries()) {
  if (flist.length > 1) {
    console.error(`❌ Duplicate top-level variable '${v}' declared in: ${flist.join(', ')}`);
    duplicates++;
  }
}

if (duplicates === 0) {
  console.log('✅ Zero duplicate top-level let/const declarations found!');
} else {
  console.log(`⚠️ Total duplicates: ${duplicates}`);
}
