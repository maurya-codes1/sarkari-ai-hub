const Database = require('better-sqlite3');
const db = new Database('./backend/db/sarkari_core.db');

console.log('=== AUDITING COMPETITIVE QUESTIONS LINKAGES ===');

// Questions with board_id IS NULL:
const nullBoardTotal = db.prepare('SELECT count(*) as count FROM questions WHERE board_id IS NULL').get().count;
console.log('Total questions with board_id IS NULL:', nullBoardTotal);

const nullExamVer = db.prepare('SELECT count(*) as count FROM questions WHERE board_id IS NULL AND exam_version_id IS NULL').get().count;
console.log('Questions with board_id IS NULL and exam_version_id IS NULL:', nullExamVer);

const validExamVer = db.prepare('SELECT count(*) as count FROM questions WHERE board_id IS NULL AND exam_version_id IS NOT NULL').get().count;
console.log('Questions with board_id IS NULL and exam_version_id IS NOT NULL:', validExamVer);

// What are the questions with exam_version_id IS NULL?
const nullVerSample = db.prepare(`
  SELECT question_id, subject_id, question_type_id, stage, marks, source_type, source_id
  FROM questions 
  WHERE board_id IS NULL AND exam_version_id IS NULL 
  LIMIT 5
`).all();
console.log('Sample of questions where both board_id and exam_version_id are null:', nullVerSample);

// Check if these are referenced in paper_questions or mock_test_configurations or cross_surface
const inPaperQ = db.prepare(`
  SELECT count(*) as count 
  FROM paper_questions pq
  JOIN questions q ON pq.question_id = q.question_id
  WHERE q.board_id IS NULL AND q.exam_version_id IS NULL
`).get().count;
console.log('In paper_questions:', inPaperQ);
