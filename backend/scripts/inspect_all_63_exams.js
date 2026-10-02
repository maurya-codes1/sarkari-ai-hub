const Database = require('better-sqlite3');
const db = new Database('./backend/db/sarkari_core.db');

const allExams = db.prepare(`SELECT * FROM exams ORDER BY exam_id ASC`).all();

const boardExams = [];
const compExams = [];

for (const exam of allExams) {
  const isBoard = exam.board_id !== null || exam.exam_id.includes('board') || 
    ['icse-cisce', 'tsbie-bieap', 'bseb-bihar', 'bseh-haryana', 'cgbse-chhattisgarh', 
     'chse-bse-odisha', 'gseb-gujarat', 'jac-jharkhand', 'kseab-karnataka', 
     'seba-ahsec-assam', 'wbbse-wb'].includes(exam.exam_id);
  
  if (isBoard) {
    boardExams.push(exam);
  } else {
    compExams.push(exam);
  }
}

console.log(`\n======================================================`);
console.log(`TOTAL EXAMS IN SYSTEM: ${allExams.length} (Boards: ${boardExams.length}, Competitive: ${compExams.length})`);
console.log(`======================================================\n`);

console.log(`--- 32 COMPETITIVE EXAMS ---`);
let totalCompQ = 0, totalCompMCQ = 0, totalCompSubj = 0;
for (const [idx, e] of compExams.entries()) {
  const versions = db.prepare(`SELECT version_id FROM exam_versions WHERE exam_id = ?`).all(e.exam_id).map(v => v.version_id);
  let qCount = 0, mcqCount = 0, subjCount = 0;
  if (versions.length > 0) {
    const placeholders = versions.map(() => '?').join(',');
    const stats = db.prepare(`
      SELECT 
        count(*) as total,
        sum(case when question_type_id LIKE '%mcq%' OR question_type_id LIKE '%choice%' then 1 else 0 end) as mcqs,
        sum(case when question_type_id IN ('short_answer', 'long_answer', 'descriptive') then 1 else 0 end) as subj
      FROM questions 
      WHERE exam_version_id IN (${placeholders})
    `).get(...versions);
    qCount = stats.total || 0;
    mcqCount = stats.mcqs || 0;
    subjCount = stats.subj || 0;
  }
  totalCompQ += qCount;
  totalCompMCQ += mcqCount;
  totalCompSubj += subjCount;
  console.log(`${(idx + 1).toString().padStart(2)}. [${e.exam_id.padEnd(23)}] ${e.name.padEnd(65).slice(0,65)} | Total: ${qCount.toString().padStart(5)} | MCQs: ${mcqCount.toString().padStart(5)} | Subj: ${subjCount}`);
}
console.log(`-> Competitive Summary: Total=${totalCompQ}, MCQs=${totalCompMCQ}, Subj=${totalCompSubj}`);

console.log(`\n--- 31 BOARD EXAMS ---`);
let totalBoardQ = 0, totalBoard10 = 0, totalBoard12 = 0, totalBoardMCQ = 0, totalBoardSubj = 0;
for (const [idx, e] of boardExams.entries()) {
  const stats = db.prepare(`
    SELECT 
      count(*) as total,
      sum(case when stage = 'Class 10' then 1 else 0 end) as c10,
      sum(case when stage LIKE 'Class 12%' then 1 else 0 end) as c12,
      sum(case when stage = 'Class 12 Science' then 1 else 0 end) as c12_sci,
      sum(case when stage = 'Class 12 Commerce' then 1 else 0 end) as c12_comm,
      sum(case when stage = 'Class 12 Arts' then 1 else 0 end) as c12_arts,
      sum(case when question_type_id LIKE '%mcq%' OR question_type_id LIKE '%choice%' then 1 else 0 end) as mcqs,
      sum(case when question_type_id IN ('short_answer', 'long_answer', 'descriptive') then 1 else 0 end) as subj
    FROM questions 
    WHERE board_id = ?
  `).get(e.exam_id);
  totalBoardQ += stats.total;
  totalBoard10 += stats.c10;
  totalBoard12 += stats.c12;
  totalBoardMCQ += stats.mcqs;
  totalBoardSubj += stats.subj;
  console.log(`${(idx + 1).toString().padStart(2)}. [${e.exam_id.padEnd(19)}] ${e.name.padEnd(55).slice(0,55)} | Total: ${stats.total.toString().padStart(5)} | 10th: ${stats.c10.toString().padStart(4)} | 12th: ${stats.c12.toString().padStart(4)} (Sci:${stats.c12_sci}, Comm:${stats.c12_comm}, Arts:${stats.c12_arts}) | MCQs: ${stats.mcqs.toString().padStart(4)} | Subj: ${stats.subj}`);
}
console.log(`-> Boards Summary: Total=${totalBoardQ}, 10th=${totalBoard10}, 12th=${totalBoard12}, MCQs=${totalBoardMCQ}, Subj=${totalBoardSubj}`);

console.log(`\nGRAND TOTAL QUESTIONS: ${totalCompQ + totalBoardQ}`);
