const db = require('../db/database').getDb();

const q = db.prepare(`
  SELECT q.question_id, q.exam_version_id, q.marks, q.stage, qv.language_content
  FROM questions q
  JOIN question_versions qv ON q.question_id = qv.question_id
  WHERE q.exam_version_id NOT LIKE '%board%' 
    AND q.exam_version_id NOT IN ('ver-cbse-board-2026', 'ver-icse-cisce-2026', 'ver-tsbie-bieap-2026')
    AND q.board_id IS NULL
    AND q.question_type_id != 'single_mcq'
`).all();

console.log('Competitive Subj questions count:', q.length);
q.forEach(x => {
  console.log(`[${x.exam_version_id}] ${x.question_id} (${x.marks}m, stage: ${x.stage}): ${x.language_content.slice(0, 120)}`);
});
