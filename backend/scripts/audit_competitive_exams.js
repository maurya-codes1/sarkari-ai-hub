const Database = require('better-sqlite3');
const db = new Database('./backend/db/sarkari_core.db');

console.log('=== THOROUGH AUDIT OF 32 COMPETITIVE EXAMS ===');

const compExams = db.prepare(`
  SELECT e.exam_id, e.name, e.category
  FROM exams e
  WHERE e.board_id IS NULL AND e.exam_id NOT LIKE '%board%' AND e.exam_id NOT IN (
    'icse-cisce', 'tsbie-bieap', 'bseb-bihar', 'bseh-haryana', 'cgbse-chhattisgarh', 
    'chse-bse-odisha', 'gseb-gujarat', 'jac-jharkhand', 'kseab-karnataka', 
    'seba-ahsec-assam', 'wbbse-wb'
  )
  ORDER BY e.exam_id ASC
`).all();

console.log(`Found ${compExams.length} competitive exams.\n`);

let totalIssues = 0;
const results = [];

for (const e of compExams) {
  const versions = db.prepare(`SELECT version_id FROM exam_versions WHERE exam_id = ?`).all(e.exam_id).map(v => v.version_id);
  if (versions.length === 0) {
    console.log(`⚠️ Exam ${e.exam_id} has NO exam_versions!`);
    totalIssues++;
    continue;
  }
  
  const placeholders = versions.map(() => '?').join(',');
  const questions = db.prepare(`
    SELECT q.question_id, q.subject_id, q.question_type_id, q.marks, qv.language_content, qv.correct_answer
    FROM questions q
    JOIN question_versions qv ON q.question_id = qv.question_id
    WHERE q.exam_version_id IN (${placeholders})
  `).all(...versions);

  let badJson = 0;
  let missingOptions = 0;
  let missingAnswer = 0;
  let dummyTextCount = 0;
  const subjectsMap = {};

  for (const q of questions) {
    subjectsMap[q.subject_id] = (subjectsMap[q.subject_id] || 0) + 1;
    let parsed;
    try {
      parsed = JSON.parse(q.language_content);
    } catch (err) {
      badJson++;
      continue;
    }

    const lang = parsed.hi ? 'hi' : (parsed.en ? 'en' : Object.keys(parsed)[0]);
    const qData = parsed[lang];
    if (!qData) {
      badJson++;
      continue;
    }

    const qText = qData.q || qData.question || '';
    if (qText.includes('सेट #') || qText.includes('dummy') || qText.includes('test question')) {
      dummyTextCount++;
    }

    if (q.question_type_id === 'single_mcq' || q.question_type_id === 'MULTIPLE_CHOICE') {
      const opts = qData.options || [];
      if (!opts || opts.length < 2) {
        missingOptions++;
      }
      if (!q.correct_answer) {
        missingAnswer++;
      }
    }
  }

  const issues = badJson + missingOptions + missingAnswer + dummyTextCount;
  totalIssues += issues;

  results.push({
    exam_id: e.exam_id,
    name: e.name,
    category: e.category,
    totalQ: questions.length,
    subjects: subjectsMap,
    issues: issues,
    details: { badJson, missingOptions, missingAnswer, dummyTextCount }
  });
}

console.log('--- AUDIT SUMMARY FOR 32 COMPETITIVE EXAMS ---');
for (const [i, r] of results.entries()) {
  const subjStr = Object.entries(r.subjects).map(([s, c]) => `${s}: ${c}`).join(', ');
  console.log(`${(i+1).toString().padStart(2)}. [${r.exam_id}] ${r.name.slice(0, 45)} | Total: ${r.totalQ} | Issues: ${r.issues} | Subjs: [${subjStr}]`);
  if (r.issues > 0) {
    console.log(`    ⚠️ Issue details:`, r.details);
  }
}

console.log(`\nTOTAL ISSUES DETECTED ACROSS ALL 32 COMPETITIVE EXAMS: ${totalIssues}`);
