const db = require('../backend/db/database').getDb();
const rows = db.prepare(`
  SELECT 
    SUBSTR(q.question_id, 1, 10) as prefix, 
    COUNT(*) as total, 
    SUM(CASE WHEN qv.correct_answer LIKE '%"index":0%' OR qv.correct_answer LIKE '%"index": 0%' OR qv.correct_answer LIKE '%"correct_index":0%' OR qv.correct_answer LIKE '%"correct_index": 0%' THEN 1 ELSE 0 END) as a_count 
  FROM questions q 
  JOIN question_versions qv ON q.question_id = qv.question_id 
  GROUP BY prefix 
  ORDER BY total DESC 
  LIMIT 25
`).all();
console.table(rows);
