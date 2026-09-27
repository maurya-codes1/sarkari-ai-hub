const fs = require('fs');
const path = require('path');

const examsDataCode = fs.readFileSync(path.join(__dirname, '../public/js/exams-data.js'), 'utf8');
const fn = new Function(examsDataCode + '; return EXAMS_DATABASE;');
const exams = fn();
const validIds = new Set(exams.map(e => e.id));
console.log('Total valid exam IDs in EXAMS_DATABASE:', validIds.size);
console.log('Valid IDs:', [...validIds]);

const indexHtml = fs.readFileSync(path.join(__dirname, '../public/index.html'), 'utf8');
const re = /#exam\/([a-zA-Z0-9_-]+)/g;
let match;
const foundLinks = [];
while ((match = re.exec(indexHtml)) !== null) {
  foundLinks.push(match[1]);
}

console.log('\nExam links found in index.html:');
for (const linkId of [...new Set(foundLinks)]) {
  if (validIds.has(linkId)) {
    console.log(`  ✅ #exam/${linkId} (MATCHED)`);
  } else {
    console.error(`  ❌ #exam/${linkId} (NOT FOUND in EXAMS_DATABASE!)`);
  }
}
