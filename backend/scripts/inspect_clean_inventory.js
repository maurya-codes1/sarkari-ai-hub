const db = require('../db/database').getDb();

console.log('=== CLEAN QUESTIONS INVENTORY BREAKDOWN ===');

// Check competitive exams clean questions
const compRows = db.prepare(`
  SELECT e.exam_id, e.name, count(DISTINCT q.question_id) as count
  FROM questions q
  JOIN question_versions qv ON q.question_id = qv.question_id
  JOIN exam_versions ev ON q.exam_version_id = ev.version_id
  JOIN exams e ON ev.exam_id = e.exam_id
  WHERE q.board_id IS NULL
    AND qv.language_content NOT LIKE '%प्रश्न #%'
    AND qv.language_content NOT LIKE '%सेट #%'
    AND qv.language_content NOT LIKE '%मानक संकल्पना%'
    AND qv.language_content NOT LIKE '%बोर्ड परीक्षा का मानक%'
    AND qv.language_content NOT LIKE '%अध्याय से संबंधित%'
  GROUP BY e.exam_id, e.name
  ORDER BY count DESC
`).all();

console.log(`\nCompetitive Exams with Clean Questions (${compRows.length} exams):`);
for (const r of compRows) {
  console.log(`  - [${r.exam_id.padEnd(25)}] ${r.name.padEnd(50).slice(0,50)}: ${r.count}`);
}

// Check boards clean questions
const boardRows = db.prepare(`
  SELECT e.exam_id, e.name, count(DISTINCT q.question_id) as count
  FROM questions q
  JOIN question_versions qv ON q.question_id = qv.question_id
  JOIN exams e ON q.board_id = e.exam_id
  WHERE q.board_id IS NOT NULL
    AND qv.language_content NOT LIKE '%प्रश्न #%'
    AND qv.language_content NOT LIKE '%सेट #%'
    AND qv.language_content NOT LIKE '%मानक संकल्पना%'
    AND qv.language_content NOT LIKE '%बोर्ड परीक्षा का मानक%'
    AND qv.language_content NOT LIKE '%अध्याय से संबंधित%'
  GROUP BY e.exam_id, e.name
  ORDER BY count DESC
`).all();

console.log(`\nBoards with Clean Questions (${boardRows.length} boards):`);
for (const r of boardRows) {
  console.log(`  - [${r.exam_id.padEnd(20)}] ${r.name.padEnd(50).slice(0,50)}: ${r.count}`);
}
