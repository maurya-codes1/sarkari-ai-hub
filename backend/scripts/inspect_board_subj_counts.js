const db = require('../db/database').getDb();

const bData = db.prepare(`
  SELECT 
    board_id,
    count(*) as total,
    sum(case when question_type_id LIKE '%mcq%' then 1 else 0 end) as mcqs,
    sum(case when question_type_id != 'single_mcq' then 1 else 0 end) as subj,
    sum(case when stage = 'Class 10' then 1 else 0 end) as c10,
    sum(case when stage LIKE 'Class 12%' then 1 else 0 end) as c12
  FROM questions
  WHERE board_id IS NOT NULL
  GROUP BY board_id
  ORDER BY total ASC
`).all();

console.log('Board Total | MCQs | Subj | C10 | C12 | Board ID');
for (const b of bData) {
  console.log(`${b.total.toString().padStart(5)} | ${b.mcqs.toString().padStart(4)} | ${b.subj.toString().padStart(4)} | ${b.c10.toString().padStart(3)} | ${b.c12.toString().padStart(3)} | ${b.board_id}`);
}
