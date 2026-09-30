// scripts/audit_components_live.js
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

console.log('Total Components:', comps.length);

// Method 1: Strict match by version
let m1Count = 0;
// Method 2: Match by root_exam_id
let m2Count = 0;
// Method 3: Match by root_exam_id AND subject
let m3Count = 0;
// Method 4: Universal exam-stage-paper-subject matching
let m4Count = 0;

const subjectRows = db.prepare('SELECT subject_id, name FROM subjects').all();
const subMap = new Map();
subjectRows.forEach(s => subMap.set(s.subject_id, s.name.toLowerCase()));

// Pre-load all questions
const allQ = db.prepare('SELECT question_id, exam_version_id, subject_id, full_exam_eligible, practice_eligible, question_type_id FROM questions').all();

for (const comp of comps) {
  const rootId = comp.root_exam_id;
  const ver = comp.version;
  const compSubj = (comp.subject || '').toLowerCase();

  const byVer = allQ.filter(q => q.exam_version_id === ver);
  const byRoot = allQ.filter(q => q.exam_version_id && q.exam_version_id.includes(rootId));
  const byRootAndSubj = byRoot.filter(q => {
    const sName = subMap.get(q.subject_id) || '';
    return compSubj && (sName.includes(compSubj) || compSubj.includes(sName) || q.subject_id.includes(compSubj));
  });

  if (byVer.length > 0) m1Count++;
  if (byRoot.length > 0) m2Count++;
  if (byRootAndSubj.length > 0) m3Count++;
}

console.log(`Method 1 (Strict exam_version_id match): ${m1Count} components`);
console.log(`Method 2 (Root exam ID match): ${m2Count} components`);
console.log(`Method 3 (Root exam ID + Subject match): ${m3Count} components`);

// What about components where root_exam_id is among the 52 root exams that have questions in the database?
const examsWithQuestions = new Set(allQ.map(q => {
  if (!q.exam_version_id) return null;
  // strip 'ver-' and '-2026' etc
  return q.exam_version_id.replace(/^ver-/, '').replace(/-\d{4}$/, '');
}).filter(Boolean));

console.log('Exams with questions in exam_version_id:', examsWithQuestions.size);
console.log(Array.from(examsWithQuestions));
