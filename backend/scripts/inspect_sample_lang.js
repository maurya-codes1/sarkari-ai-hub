const db = require('../db/database').getDb();

// 1. Sample MCQ
const mcq = db.prepare(`
  SELECT q.question_id, q.question_type_id, q.board_id, q.exam_version_id, q.stage, q.subject_id, qv.language_content
  FROM questions q
  JOIN question_versions qv ON q.question_id = qv.question_id
  WHERE q.question_type_id = 'single_mcq'
  LIMIT 2
`).all();

console.log('Sample MCQ:');
mcq.forEach(m => {
  console.log('QID:', m.question_id, 'Subject:', m.subject_id);
  const parsed = JSON.parse(m.language_content);
  console.log('Languages available:', Object.keys(parsed));
  const firstLang = Object.keys(parsed)[0];
  console.log('Structure of', firstLang, Object.keys(parsed[firstLang] || {}));
});

// 2. Sample Subjective
const subj = db.prepare(`
  SELECT q.question_id, q.question_type_id, q.board_id, q.stage, q.subject_id, qv.language_content
  FROM questions q
  JOIN question_versions qv ON q.question_id = qv.question_id
  WHERE q.question_type_id != 'single_mcq'
  LIMIT 2
`).all();

console.log('\nSample Subj:');
subj.forEach(s => {
  console.log('QID:', s.question_id, 'Subject:', s.subject_id);
  const parsed = JSON.parse(s.language_content);
  console.log('Languages available:', Object.keys(parsed));
  const firstLang = Object.keys(parsed)[0];
  console.log('Structure of', firstLang, Object.keys(parsed[firstLang] || {}));
  if (parsed[firstLang]) {
    console.log('Question text preview:', (parsed[firstLang].question_text || '').substring(0, 80));
    console.log('Explanation / Answer preview:', (parsed[firstLang].explanation || parsed[firstLang].solution || '').substring(0, 80));
  }
});
