const db = require('../db/database').getDb();

const allComp = db.prepare(`
  SELECT e.exam_id, e.name, count(DISTINCT q.question_id) as total,
         sum(case when q.question_type_id LIKE '%mcq%' then 1 else 0 end) as mcq,
         sum(case when q.question_type_id NOT LIKE '%mcq%' AND q.question_type_id IS NOT NULL then 1 else 0 end) as subj
  FROM exams e
  JOIN exam_versions ev ON e.exam_id = ev.exam_id
  LEFT JOIN questions q ON ev.version_id = q.exam_version_id
  WHERE e.board_id IS NULL AND (e.category != 'boards' OR e.category IS NULL)
  GROUP BY e.exam_id, e.name
  ORDER BY total DESC
`).all();

console.log('=== 32 COMPETITIVE EXAMS STATS ===');
const counts = {};
for (const [idx, c] of allComp.entries()) {
  counts[c.total] = (counts[c.total] || []).concat(c.exam_id);
  console.log(`${(idx+1).toString().padStart(2)}. [${c.exam_id.padEnd(25)}] Total: ${c.total.toString().padStart(4)} | MCQ: ${c.mcq.toString().padStart(4)} | Subj: ${c.subj}`);
}

console.log('\nDuplicates among competitive exam totals:');
for (const [count, exams] of Object.entries(counts)) {
  if (exams.length > 1) {
    console.log(`  Count ${count}: ${exams.join(', ')}`);
  }
}
