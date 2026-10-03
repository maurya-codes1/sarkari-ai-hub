const fs = require('fs');
const path = require('path');
const db = require('../db/database').getDb();

// 1. Boards (31)
const boards = db.prepare('SELECT board_id, name FROM boards ORDER BY board_id').all();

const boardReport = [];
let totalBoardMCQs = 0;
let totalBoardSubj = 0;

for (const b of boards) {
  // Class 10
  const c10Rows = db.prepare(`
    SELECT subject_id, 
           SUM(CASE WHEN question_type_id = 'single_mcq' THEN 1 ELSE 0 END) as mcq_count,
           SUM(CASE WHEN question_type_id != 'single_mcq' THEN 1 ELSE 0 END) as sub_count
    FROM questions
    WHERE board_id = ? AND stage = 'Class 10'
    GROUP BY subject_id
    ORDER BY subject_id
  `).all(b.board_id);

  // Class 12
  const c12Rows = db.prepare(`
    SELECT stage, subject_id, 
           SUM(CASE WHEN question_type_id = 'single_mcq' THEN 1 ELSE 0 END) as mcq_count,
           SUM(CASE WHEN question_type_id != 'single_mcq' THEN 1 ELSE 0 END) as sub_count
    FROM questions
    WHERE board_id = ? AND stage LIKE 'Class 12%'
    GROUP BY stage, subject_id
    ORDER BY stage, subject_id
  `).all(b.board_id);

  let c10MCQ = 0, c10Sub = 0;
  c10Rows.forEach(r => { c10MCQ += r.mcq_count; c10Sub += r.sub_count; });

  let c12MCQ = 0, c12Sub = 0;
  c12Rows.forEach(r => { c12MCQ += r.mcq_count; c12Sub += r.sub_count; });

  totalBoardMCQs += (c10MCQ + c12MCQ);
  totalBoardSubj += (c10Sub + c12Sub);

  boardReport.push({
    board_id: b.board_id,
    name: b.name,
    c10MCQ, c10Sub, c10Total: c10MCQ + c10Sub,
    c10Subjects: c10Rows,
    c12MCQ, c12Sub, c12Total: c12MCQ + c12Sub,
    c12Subjects: c12Rows,
    grandTotal: c10MCQ + c10Sub + c12MCQ + c12Sub
  });
}

// 2. Competitive Exams (32)
const compExams = db.prepare(`
  SELECT e.exam_id, e.name, e.category
  FROM exams e
  WHERE e.board_id IS NULL AND e.exam_id NOT LIKE '%board%' AND e.exam_id NOT IN (
    'icse-cisce', 'tsbie-bieap', 'bseb-bihar', 'bseh-haryana', 'cgbse-chhattisgarh', 
    'chse-bse-odisha', 'gseb-gujarat', 'jac-jharkhand', 'kseab-karnataka', 
    'seba-ahsec-assam', 'wbbse-wb'
  )
  ORDER BY e.category, e.exam_id ASC
`).all();

const compReport = [];
let totalCompMCQs = 0;
let totalCompSubj = 0;

for (const e of compExams) {
  const versions = db.prepare('SELECT version_id FROM exam_versions WHERE exam_id = ?').all(e.exam_id).map(v => v.version_id);
  if (versions.length === 0) continue;

  const placeholders = versions.map(() => '?').join(',');
  const subjRows = db.prepare(`
    SELECT subject_id,
           SUM(CASE WHEN question_type_id IN ('single_mcq', 'MULTIPLE_CHOICE') THEN 1 ELSE 0 END) as mcq_count,
           SUM(CASE WHEN question_type_id NOT IN ('single_mcq', 'MULTIPLE_CHOICE') THEN 1 ELSE 0 END) as sub_count
    FROM questions
    WHERE exam_version_id IN (${placeholders})
    GROUP BY subject_id
    ORDER BY subject_id
  `).all(...versions);

  let mcqTotal = 0, subTotal = 0;
  subjRows.forEach(r => { mcqTotal += r.mcq_count; subTotal += r.sub_count; });

  totalCompMCQs += mcqTotal;
  totalCompSubj += subTotal;

  compReport.push({
    exam_id: e.exam_id,
    name: e.name,
    category: e.category,
    mcqTotal,
    subTotal,
    total: mcqTotal + subTotal,
    subjects: subjRows
  });
}

const outputData = {
  summary: {
    totalExams: boardReport.length + compReport.length,
    boardsCount: boardReport.length,
    compCount: compReport.length,
    totalBoardMCQs,
    totalBoardSubj,
    totalBoardQuestions: totalBoardMCQs + totalBoardSubj,
    totalCompMCQs,
    totalCompSubj,
    totalCompQuestions: totalCompMCQs + totalCompSubj,
    grandTotalQuestions: totalBoardMCQs + totalBoardSubj + totalCompMCQs + totalCompSubj
  },
  boardReport,
  compReport
};

fs.writeFileSync('grand_63_report.json', JSON.stringify(outputData, null, 2), 'utf8');
console.log('Saved grand_63_report.json successfully.');
