// scripts/analyze_components_and_versions.js
const fs = require('fs');
const path = require('path');
const db = require('../backend/db/repositories/question-repository').db;

const lines = fs.readFileSync(path.join(__dirname, '../exam-pattern-component-registry.csv'), 'utf8').trim().split('\n');
const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
const comps = lines.slice(1).map(l => {
  const cells = [];
  let inQuotes = false, curr = '';
  for (let i = 0; i < l.length; i++) {
    const ch = l[i];
    if (ch === '"') inQuotes = !inQuotes;
    else if (ch === ',' && !inQuotes) { cells.push(curr.trim().replace(/^"|"$/g, '')); curr = ''; }
    else curr += ch;
  }
  cells.push(curr.trim().replace(/^"|"$/g, ''));
  const obj = {};
  headers.forEach((h, i) => obj[h] = cells[i] || '');
  return obj;
});

console.log('Total components in CSV:', comps.length);
const rootExamsInComps = new Set(comps.map(c => c.root_exam_id));
console.log('Unique root exams in components CSV:', rootExamsInComps.size);

const qVersions = db.prepare('SELECT DISTINCT exam_version_id, count(*) as count FROM questions WHERE exam_version_id IS NOT NULL GROUP BY exam_version_id').all();
console.log('Distinct exam_version_ids in questions:', qVersions.length);
console.log('Sample exam_version_ids in questions:');
console.table(qVersions.slice(0, 15));

// Check how many components match directly by version
let matchedDirectly = 0;
const compVersions = new Set(comps.map(c => c.version).filter(Boolean));
for (const qv of qVersions) {
  if (compVersions.has(qv.exam_version_id)) {
    matchedDirectly++;
  }
}
console.log(`Exam versions in questions that match component versions: ${matchedDirectly} / ${qVersions.length}`);

// Check which components have questions mapped by root_exam_id or version
let compsWithContent = 0;
const compContentCounts = [];
for (const comp of comps) {
  const rootId = comp.root_exam_id;
  const ver = comp.version;
  // Count questions
  const qCount = db.prepare(`
    SELECT count(*) as c FROM questions 
    WHERE exam_version_id = ? OR exam_version_id LIKE ?
  `).get(ver, `%${rootId}%`).c;
  
  if (qCount > 0) compsWithContent++;
  compContentCounts.push({
    compId: comp.component_id,
    rootId: comp.root_exam_id,
    version: comp.version,
    subject: comp.subject,
    qCount
  });
}

console.log(`Components with content (by version or root_exam_id): ${compsWithContent} / ${comps.length}`);
