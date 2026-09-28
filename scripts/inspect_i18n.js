const fs = require('fs');
const content = fs.readFileSync('public/js/i18n.js', 'utf8');
const lines = content.split('\n');

const keys = [];
for (let i = 0; i < 600; i++) {
  const line = lines[i];
  const m = line.match(/^\s*"([a-zA-Z0-9_]+)":/);
  if (m) {
    keys.push(m[1]);
  }
}
console.log('Total keys in en object:', keys.length);
console.log('Quiz keys:', keys.filter(k => k.startsWith('quiz_')));
console.log('Notes keys:', keys.filter(k => k.startsWith('notes_')));
console.log('Nav keys:', keys.filter(k => k.startsWith('nav_')));
