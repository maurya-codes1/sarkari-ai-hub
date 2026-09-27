const { getDb } = require('../backend/db/database');
const db = getDb();

console.log('Distinct provenance:');
console.table(db.prepare('SELECT provenance, COUNT(*) as c FROM questions GROUP BY provenance').all());

console.log('Distinct question_tier:');
console.table(db.prepare('SELECT question_tier, COUNT(*) as c FROM questions GROUP BY question_tier').all());

console.log('Eligible questions (full_exam_eligible = 1):', db.prepare('SELECT COUNT(*) as c FROM questions WHERE full_exam_eligible = 1').get().c);

console.log('Eligible questions by paper:');
console.table(db.prepare(`
  SELECT q.paper_id, qp.exam_id, COUNT(*) as c
  FROM questions q
  LEFT JOIN question_papers qp ON q.paper_id = qp.paper_id
  WHERE q.full_exam_eligible = 1
  GROUP BY q.paper_id, qp.exam_id
`).all());
