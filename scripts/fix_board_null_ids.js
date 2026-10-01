const { getDb } = require('../backend/db/database');
const db = getDb();

// Fix the 65 known rows
db.prepare("UPDATE questions SET board_id = 'cbse-board', stage = 'Class 10' WHERE (board_id IS NULL OR board_id = '') AND (question_id LIKE 'q-cbse%' OR paper_id LIKE 'paper-cbse%')").run();
db.prepare("UPDATE questions SET board_id = 'tndge-tamilnadu', stage = 'Class 10' WHERE (board_id IS NULL OR board_id = '') AND (question_id LIKE 'q-tndge%' OR paper_id LIKE 'paper-tn%')").run();

console.log('Fixed initial 65 rows.');

// Check if any remaining questions have board or school keywords in question_id or paper_id
const remaining = db.prepare(`
  SELECT question_id, paper_id, subject_id, stage, board_id 
  FROM questions 
  WHERE (board_id IS NULL OR board_id = '') 
    AND (
      paper_id LIKE '%cbse%' OR paper_id LIKE '%bseb%' OR paper_id LIKE '%upmsp%' OR
      paper_id LIKE '%icse%' OR paper_id LIKE '%board%' OR paper_id LIKE '%class%' OR
      question_id LIKE '%cbse%' OR question_id LIKE '%bseb%' OR question_id LIKE '%upmsp%' OR
      stage LIKE 'Class%'
    )
`).all();

console.log('Remaining board questions with null board_id:', remaining.length);
remaining.forEach(r => console.log(r));
