const fs = require('fs');
const qd = fs.readFileSync('public/js/quiz-data.js', 'utf8');
const matches = [...qd.matchAll(/"subject":\s*"([^"]+)"/g)].map(m => m[1]);
console.log('Unique subjects in quiz-data.js:', [...new Set(matches)]);
