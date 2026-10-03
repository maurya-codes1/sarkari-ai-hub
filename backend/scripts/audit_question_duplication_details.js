const db = require('../db/database').getDb();

console.log('=== AUDITING QUESTION OVERLAP ACROSS EXAMS & BOARDS ===');

// 1. Audit Competitive Exams Overlap
const compQuestions = db.prepare(`
  SELECT q.question_id, q.exam_version_id, q.subject_id, qv.language_content
  FROM questions q
  JOIN question_versions qv ON q.question_id = qv.question_id
  WHERE q.board_id IS NULL AND q.exam_version_id IS NOT NULL
`).all();

const compTextMap = {};
for (const q of compQuestions) {
  let parsed;
  try { parsed = JSON.parse(q.language_content); } catch (e) { continue; }
  const lang = parsed.hi ? 'hi' : (parsed.en ? 'en' : Object.keys(parsed)[0]);
  const text = (parsed[lang]?.q || parsed[lang]?.question || '').trim();
  if (!text) continue;

  if (!compTextMap[text]) compTextMap[text] = [];
  compTextMap[text].push({ id: q.question_id, version: q.exam_version_id, subject: q.subject_id });
}

let sharedCompCount = 0;
const compOverlapByExam = {};
for (const [text, occurrences] of Object.entries(compTextMap)) {
  const versions = new Set(occurrences.map(o => o.version));
  if (versions.size > 1) {
    sharedCompCount++;
    for (const v of versions) {
      compOverlapByExam[v] = (compOverlapByExam[v] || 0) + 1;
    }
  }
}

console.log(`Total competitive questions: ${compQuestions.length}`);
console.log(`Unique text questions: ${Object.keys(compTextMap).length}`);
console.log(`Shared questions across >1 competitive exams: ${sharedCompCount}`);
console.log('Overlap count per exam version (top 10):');
console.log(Object.entries(compOverlapByExam).sort((a,b) => b[1] - a[1]).slice(0, 10));

// 2. Audit Board Overlap
const boardQuestions = db.prepare(`
  SELECT q.question_id, q.board_id, q.stage, q.subject_id, q.question_type_id, qv.language_content
  FROM questions q
  JOIN question_versions qv ON q.question_id = qv.question_id
  WHERE q.board_id IS NOT NULL
`).all();

const boardTextMap = {};
for (const q of boardQuestions) {
  let parsed;
  try { parsed = JSON.parse(q.language_content); } catch (e) { continue; }
  const lang = parsed.hi ? 'hi' : (parsed.en ? 'en' : Object.keys(parsed)[0]);
  const text = (parsed[lang]?.q || parsed[lang]?.question || '').trim();
  if (!text) continue;

  if (!boardTextMap[text]) boardTextMap[text] = [];
  boardTextMap[text].push({ id: q.question_id, board: q.board_id, stage: q.stage, subject: q.subject_id, type: q.question_type_id });
}

let sharedBoardCount = 0;
for (const [text, occurrences] of Object.entries(boardTextMap)) {
  const boards = new Set(occurrences.map(o => o.board));
  if (boards.size > 1) {
    sharedBoardCount++;
  }
}

console.log(`\nTotal board questions: ${boardQuestions.length}`);
console.log(`Unique text questions: ${Object.keys(boardTextMap).length}`);
console.log(`Questions shared across >1 boards: ${sharedBoardCount}`);

// 3. Subjective Analysis
const subjStats = db.prepare(`
  SELECT board_id, stage, subject_id, count(*) as count
  FROM questions
  WHERE board_id IS NOT NULL AND question_type_id != 'single_mcq'
  GROUP BY board_id, stage, subject_id
  ORDER BY count ASC
`).all();

console.log('\nSubjective questions per board, stage, subject:');
console.log(`Sample (first 10):`, subjStats.slice(0, 10));
console.log(`Min count: ${subjStats[0]?.count}, Max count: ${subjStats[subjStats.length - 1]?.count}`);
