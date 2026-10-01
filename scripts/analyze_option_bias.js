const db = require('../backend/db/database').getDb();

const prefixes = db.prepare(`
  SELECT 
    SUBSTR(q.question_id, 1, 12) as pfx,
    COUNT(*) as total,
    SUM(CASE WHEN qv.correct_answer LIKE '%"index":0%' OR qv.correct_answer LIKE '%"index": 0%' OR qv.correct_answer LIKE '%"correct_index":0%' OR qv.correct_answer LIKE '%"correct_index": 0%' THEN 1 ELSE 0 END) as a_count
  FROM questions q
  JOIN question_versions qv ON q.question_id = qv.question_id
  WHERE q.question_type_id IN ('single_mcq', 'mcq')
  GROUP BY pfx
  HAVING total >= 100 AND (CAST(a_count AS FLOAT) / total) > 0.40
  ORDER BY a_count DESC
`).all();

console.log('Prefixes with > 40% Option A:');
console.table(prefixes.map(p => ({
  prefix: p.pfx,
  total: p.total,
  a_count: p.a_count,
  a_pct: Math.round((p.a_count / p.total) * 100) + '%'
})));
