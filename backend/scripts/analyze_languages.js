const db = require('../db/database').getDb();

console.log('Querying all questions with question_versions...');
const questions = db.prepare(`
  SELECT 
    q.question_id,
    q.board_id,
    q.exam_version_id,
    q.stage,
    q.subject_id,
    q.question_type_id,
    qv.language_content
  FROM questions q
  JOIN question_versions qv ON q.question_id = qv.question_id
`).all();

console.log('Total questions loaded:', questions.length);

const boardStats = {};
const compStats = {};

for (const q of questions) {
  let langs = 'unknown';
  let hasEn = false, hasHi = false;
  let qTextEn = false, qTextHi = false;
  let optEn = false, optHi = false;
  let ansEn = false, ansHi = false;

  try {
    const parsed = JSON.parse(q.language_content);
    const keys = Object.keys(parsed);
    langs = keys.sort().join('+');
    
    if (parsed.en) {
      hasEn = true;
      if (parsed.en.q || parsed.en.question_text) qTextEn = true;
      if (parsed.en.options && Object.keys(parsed.en.options).length > 0) optEn = true;
      if (parsed.en.modelAnswer || parsed.en.explanation || parsed.en.exp || parsed.en.ans) ansEn = true;
    }
    if (parsed.hi) {
      hasHi = true;
      if (parsed.hi.q || parsed.hi.question_text) qTextHi = true;
      if (parsed.hi.options && Object.keys(parsed.hi.options).length > 0) optHi = true;
      if (parsed.hi.modelAnswer || parsed.hi.explanation || parsed.hi.exp || parsed.hi.ans) ansHi = true;
    }
  } catch (e) {}

  const isMCQ = q.question_type_id === 'single_mcq';

  if (q.board_id) {
    if (!boardStats[q.board_id]) boardStats[q.board_id] = {};
    const b = boardStats[q.board_id];
    const stageKey = q.stage && q.stage.startsWith('Class 12') ? 'Class 12' : (q.stage === 'Class 10' ? 'Class 10' : 'Other');
    if (!b[stageKey]) b[stageKey] = {};
    if (!b[stageKey][q.subject_id]) {
      b[stageKey][q.subject_id] = {
        mcqCount: 0,
        subCount: 0,
        mcqLangs: {},
        subLangs: {}
      };
    }
    const subjData = b[stageKey][q.subject_id];
    if (isMCQ) {
      subjData.mcqCount++;
      subjData.mcqLangs[langs] = (subjData.mcqLangs[langs] || 0) + 1;
    } else {
      subjData.subCount++;
      subjData.subLangs[langs] = (subjData.subLangs[langs] || 0) + 1;
    }
  } else {
    // Competitive exam
    const evId = q.exam_version_id || 'unknown';
    if (!compStats[evId]) compStats[evId] = {};
    if (!compStats[evId][q.subject_id]) {
      compStats[evId][q.subject_id] = {
        mcqCount: 0,
        subCount: 0,
        mcqLangs: {},
        subLangs: {}
      };
    }
    const subjData = compStats[evId][q.subject_id];
    if (isMCQ) {
      subjData.mcqCount++;
      subjData.mcqLangs[langs] = (subjData.mcqLangs[langs] || 0) + 1;
    } else {
      subjData.subCount++;
      subjData.subLangs[langs] = (subjData.subLangs[langs] || 0) + 1;
    }
  }
}

console.log('Sample CBSE Board Class 10:');
console.log(JSON.stringify(boardStats['cbse-board']['Class 10'], null, 2));

console.log('Sample CBSE Board Class 12:');
console.log(JSON.stringify(boardStats['cbse-board']['Class 12'], null, 2));
