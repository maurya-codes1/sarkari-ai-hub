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
const freq = {};
for (const b of bData) {
  freq[b.total] = (freq[b.total] || []);
  freq[b.total].push(b.board_id);
  console.log(`${b.total.toString().padStart(5)} | ${b.mcqs.toString().padStart(4)} | ${b.subj.toString().padStart(4)} | ${b.c10.toString().padStart(4)} | ${b.c12.toString().padStart(4)} | ${b.board_id}`);
}

console.log('\n--- COLLISIONS ---');
for (const [tot, arr] of Object.entries(freq)) {
  if (arr.length > 1) {
    console.log(`Count ${tot} shared by: ${arr.join(', ')}`);
  }
}
