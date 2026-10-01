const db = require('../backend/db/database').getDb();
const r = db.prepare(`
  SELECT 
    COUNT(*) as total, 
    SUM(CASE WHEN qv.correct_answer LIKE '%"index":0%' OR qv.correct_answer LIKE '%"index": 0%' OR qv.correct_answer LIKE '%"correct_index":0%' OR qv.correct_answer LIKE '%"correct_index": 0%' THEN 1 ELSE 0 END) as a_count,
    SUM(CASE WHEN qv.correct_answer LIKE '%"index":1%' OR qv.correct_answer LIKE '%"index": 1%' OR qv.correct_answer LIKE '%"correct_index":1%' OR qv.correct_answer LIKE '%"correct_index": 1%' THEN 1 ELSE 0 END) as b_count,
    SUM(CASE WHEN qv.correct_answer LIKE '%"index":2%' OR qv.correct_answer LIKE '%"index": 2%' OR qv.correct_answer LIKE '%"correct_index":2%' OR qv.correct_answer LIKE '%"correct_index": 2%' THEN 1 ELSE 0 END) as c_count,
    SUM(CASE WHEN qv.correct_answer LIKE '%"index":3%' OR qv.correct_answer LIKE '%"index": 3%' OR qv.correct_answer LIKE '%"correct_index":3%' OR qv.correct_answer LIKE '%"correct_index": 3%' THEN 1 ELSE 0 END) as d_count
  FROM questions q 
  JOIN question_versions qv ON q.question_id = qv.question_id
`).get();
console.log('Overall database answer distribution:', r);
