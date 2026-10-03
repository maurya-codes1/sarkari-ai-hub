const db = require('../../../db/database').getDb();

console.log('Updating correct_answer in question_versions for CBSE MCQs to JSON format...');
const res = db.prepare(`
  UPDATE question_versions 
  SET correct_answer = json_object('index', 0, 'correct_index', 0, 'text', 'A')
  WHERE question_id LIKE 'cbse-%' AND correct_answer = 'A'
`).run();

console.log(`Updated ${res.changes} CBSE question_versions to standard JSON format.`);
