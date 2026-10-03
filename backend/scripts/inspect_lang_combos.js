const db = require('../db/database').getDb();

// Let's sample across boards and competitive exams to check language distributions
const query = `
  SELECT 
    CASE WHEN q.board_id IS NOT NULL THEN 'board' ELSE 'comp' END as exam_type,
    q.question_type_id,
    q.stage,
    qv.language_content
  FROM questions q
  JOIN question_versions qv ON q.question_id = qv.question_id
  LIMIT 500
`;

const rows = db.prepare(query).all();
const langCombos = {};

rows.forEach(r => {
  try {
    const parsed = JSON.parse(r.language_content);
    const langs = Object.keys(parsed).sort().join('+');
    const type = r.question_type_id === 'single_mcq' ? 'MCQ' : 'SUBJ';
    const key = `${r.exam_type}|${type}|${langs}`;
    langCombos[key] = (langCombos[key] || 0) + 1;
  } catch (e) {}
});

console.log('Language Combinations in 500 samples:', langCombos);
