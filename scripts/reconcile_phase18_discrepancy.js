const { getDb } = require('../backend/db/database');
const db = getDb();

console.log("=== 1. CHECK BOARD QUESTIONS QUERY ===");
const boardQQuery = `
  SELECT q.question_id, q.board_id, q.stage, q.subject_id, q.source_type, q.paper_id, e.board_id as exam_board_id, ev.exam_id
  FROM questions q
  LEFT JOIN exam_versions ev ON q.exam_version_id = ev.version_id
  LEFT JOIN exams e ON ev.exam_id = e.exam_id
  WHERE q.board_id IS NOT NULL OR e.board_id IS NOT NULL
`;
const allBoardQs = db.prepare(boardQQuery).all();
console.log('Total board questions matching condition:', allBoardQs.length);

const stageCounts = {};
for (const q of allBoardQs) {
  const st = q.stage || 'NULL_STAGE';
  stageCounts[st] = (stageCounts[st] || 0) + 1;
}
console.log('Stages breakdown in allBoardQs:', stageCounts);

console.log("\n=== 2. BREAKDOWN OF NULL_STAGE OR NON-CLASS-9-12 STAGES ===");
const nonStandard = allBoardQs.filter(q => !['Class 9', 'Class 10', 'Class 11', 'Class 12'].includes(q.stage));
console.log('Non-standard / unclassified questions count:', nonStandard.length);

const byBoard = {};
const byExam = {};
const bySubject = {};
const bySource = {};

for (const q of nonStandard) {
  const b = q.board_id || q.exam_board_id || 'UNKNOWN_BOARD';
  byBoard[b] = (byBoard[b] || 0) + 1;
  const ex = q.exam_id || 'NO_EXAM';
  byExam[ex] = (byExam[ex] || 0) + 1;
  const sub = q.subject_id || 'NO_SUBJ';
  bySubject[sub] = (bySubject[sub] || 0) + 1;
  const src = q.source_type || 'NO_SRC';
  bySource[src] = (bySource[src] || 0) + 1;
}

console.log('By Board (Top 10):', Object.entries(byBoard).sort((a,b)=>b[1]-a[1]).slice(0, 10));
console.log('By Exam (Top 10):', Object.entries(byExam).sort((a,b)=>b[1]-a[1]).slice(0, 10));
console.log('By Subject (Top 10):', Object.entries(bySubject).sort((a,b)=>b[1]-a[1]).slice(0, 10));
console.log('By Source Type:', bySource);
