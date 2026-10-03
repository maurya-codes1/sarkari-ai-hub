const Database = require('better-sqlite3');
const db = new Database('./backend/db/sarkari_core.db');

console.log('=== DEEP AUDIT OF ALL 63 EXAMS & BOARDS ===\n');

const allExams = db.prepare(`SELECT * FROM exams ORDER BY exam_id ASC`).all();

const boardExams = [];
const compExams = [];

for (const exam of allExams) {
  const isBoard = exam.board_id !== null || exam.exam_id.includes('board') || 
    ['icse-cisce', 'tsbie-bieap', 'bseb-bihar', 'bseh-haryana', 'cgbse-chhattisgarh', 
     'chse-bse-odisha', 'gseb-gujarat', 'jac-jharkhand', 'kseab-karnataka', 
     'seba-ahsec-assam', 'wbbse-wb'].includes(exam.exam_id);
  if (isBoard) boardExams.push(exam);
  else compExams.push(exam);
}

console.log(`Total Exams: ${allExams.length} (Boards: ${boardExams.length}, Comp: ${compExams.length})\n`);

// 1. Audit Competitive Exams
console.log('--- 32 COMPETITIVE EXAMS ---');
const compData = [];
for (const e of compExams) {
  const versions = db.prepare(`SELECT version_id FROM exam_versions WHERE exam_id = ?`).all(e.exam_id).map(v => v.version_id);
  let total = 0, mcqs = 0, subj = 0;
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
    total = stats.total || 0;
    mcqs = stats.mcqs || 0;
    subj = stats.subj || 0;
  }
  compData.push({ id: e.exam_id, name: e.name, total, mcqs, subj });
}

compData.sort((a, b) => a.total - b.total);
const compFreq = {};
for (const d of compData) {
  compFreq[d.total] = (compFreq[d.total] || 0) + 1;
  console.log(`${d.total.toString().padStart(5)} | MCQs: ${d.mcqs.toString().padStart(5)} | Subj: ${d.subj.toString().padStart(3)} | [${d.id}] ${d.name}`);
}

const compCollisions = Object.entries(compFreq).filter(([tot, n]) => n > 1);
if (compCollisions.length === 0) {
  console.log('\n✅ 0 Collisions in Competitive Exams: All 32 have unique totals!');
} else {
  console.log('\n❌ COLLISION IN COMPETITIVE EXAMS:', compCollisions);
}

// 2. Audit Boards
console.log('\n--- 31 BOARD EXAMS ---');
const boardData = [];
for (const b of boardExams) {
  const stats = db.prepare(`
    SELECT 
      count(*) as total,
      sum(case when stage = 'Class 10' then 1 else 0 end) as c10,
      sum(case when stage LIKE 'Class 12%' then 1 else 0 end) as c12,
      sum(case when question_type_id LIKE '%mcq%' OR question_type_id LIKE '%choice%' then 1 else 0 end) as mcqs,
      sum(case when question_type_id IN ('short_answer', 'long_answer', 'descriptive') then 1 else 0 end) as subj,
      sum(case when marks = 2 then 1 else 0 end) as m2,
      sum(case when marks = 3 then 1 else 0 end) as m3,
      sum(case when marks = 4 then 1 else 0 end) as m4,
      sum(case when marks >= 5 then 1 else 0 end) as m5
    FROM questions 
    WHERE board_id = ?
  `).get(b.exam_id);
  boardData.push({ id: b.exam_id, name: b.name, ...stats });
}

boardData.sort((a, b) => a.total - b.total);
const boardFreq = {};
for (const d of boardData) {
  boardFreq[d.total] = (boardFreq[d.total] || 0) + 1;
  console.log(`${d.total.toString().padStart(5)} | 10th: ${d.c10.toString().padStart(4)} | 12th: ${d.c12.toString().padStart(4)} | MCQ: ${d.mcqs.toString().padStart(4)} | Subj: ${d.subj.toString().padStart(3)} (2m:${d.m2}, 3m:${d.m3}, 4m:${d.m4}, 5m:${d.m5}) | [${d.id}] ${d.name}`);
}

const boardCollisions = Object.entries(boardFreq).filter(([tot, n]) => n > 1);
if (boardCollisions.length === 0) {
  console.log('\n✅ 0 Collisions in Board Exams: All 31 have unique totals!');
} else {
  console.log('\n❌ COLLISION IN BOARD EXAMS:');
  for (const [tot, n] of boardCollisions) {
    const matches = boardData.filter(x => x.total === Number(tot)).map(x => x.id);
    console.log(`  Count ${tot} (${n} boards): ${matches.join(', ')}`);
  }
}

// 3. Check Overall Cross-collisions across all 63 exams
console.log('\n--- CHECKING ALL 63 EXAM TOTALS FOR ANY OVERLAP ---');
const all63 = [...compData, ...boardData];
const all63Freq = {};
for (const d of all63) {
  all63Freq[d.total] = (all63Freq[d.total] || []);
  all63Freq[d.total].push(d.id);
}
const all63Collisions = Object.entries(all63Freq).filter(([tot, arr]) => arr.length > 1);
if (all63Collisions.length === 0) {
  console.log('🎉 100% PERFECT: Every single one of the 63 exams has a completely UNIQUE total question count!');
} else {
  console.log(`Found ${all63Collisions.length} collision totals across the 63 exams:`);
  for (const [tot, arr] of all63Collisions) {
    console.log(`  Count ${tot}: ${arr.join(', ')}`);
  }
}

// 4. Check for duplicate questions / identical questions across boards
console.log('\n--- CHECKING FOR IDENTICAL QUESTION TEXTS ACROSS BOARDS ---');
const identicalAcrossBoards = db.prepare(`
  SELECT qv.language_content, count(DISTINCT q.board_id) as board_count, group_concat(DISTINCT q.board_id) as boards
  FROM questions q
  JOIN question_versions qv ON q.question_id = qv.question_id
  WHERE q.board_id IS NOT NULL
  GROUP BY qv.language_content
  HAVING board_count > 1
  LIMIT 5
`).all();

console.log(`Shared question text count check: found samples = ${identicalAcrossBoards.length}`);
if (identicalAcrossBoards.length > 0) {
  for (const sample of identicalAcrossBoards) {
    const textSnippet = sample.language_content.slice(0, 100).replace(/\n/g, ' ');
    console.log(`  Shared across ${sample.board_count} boards (${sample.boards.slice(0, 50)}...): "${textSnippet}..."`);
  }
}
