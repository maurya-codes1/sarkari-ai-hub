// scripts/rebalance_all_63_exams_naturally.js
// Rebalances all 63 exams (31 boards + 32 competitive exams) with natural pseudo-random option distributions.
// Replaces predictable cyclic patterns (1A, 2B, 3C, 4D...) with authentic exam distributions (~22%-28% each).

const { getDb, checkpointWal } = require('../backend/db/database');
const { generateNaturalOptionSequence, LETTERS } = require('../backend/utils/option-shuffler');

const db = getDb();
if (!db) {
  console.error('Database unavailable.');
  process.exit(1);
}

console.log('=== Starting Natural Option Rebalancing Across All 63 Exams ===');

// Prepare update statement
const updateStmt = db.prepare(`
  UPDATE question_versions 
  SET language_content = ?, correct_answer = ? 
  WHERE question_id = ?
`);

function rebalanceQuestionGroup(questions, groupName) {
  if (!questions || questions.length === 0) return { total: 0, updated: 0 };

  const targetSlots = generateNaturalOptionSequence(questions.length);
  let updatedCount = 0;

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    const targetSlot = targetSlots[i];

    let ca = {};
    try { ca = JSON.parse(q.correct_answer || '{}'); } catch (e) {}

    const currentIdx = typeof ca.index === 'number'
      ? ca.index
      : (typeof ca.correct_index === 'number'
          ? ca.correct_index
          : (typeof ca.option === 'number' ? ca.option : (ca.key === 'B' ? 1 : ca.key === 'C' ? 2 : ca.key === 'D' ? 3 : 0)));

    let lc = {};
    try { lc = JSON.parse(q.language_content || '{}'); } catch (e) {}

    let modified = false;

    // Rotate all language variants
    const rotateLang = (langObj) => {
      if (!langObj || !Array.isArray(langObj.options) || langObj.options.length < 4) return;
      const cleanOpts = langObj.options.map(o => String(o).replace(/^[A-D]\)\s*/i, '').trim());

      if (currentIdx !== targetSlot) {
        const temp = cleanOpts[currentIdx];
        cleanOpts[currentIdx] = cleanOpts[targetSlot];
        cleanOpts[targetSlot] = temp;
        modified = true;
      }

      langObj.options = cleanOpts.map((o, idx) => `${LETTERS[idx]}) ${o}`);
      langObj.ans = langObj.options[targetSlot];

      if (langObj.exp) {
        langObj.exp = langObj.exp.replace(/(सही\s*उत्तर\s*[:\-]?\s*)[A-D]\)/gi, `$1${LETTERS[targetSlot]})`);
        langObj.exp = langObj.exp.replace(/(अचूक\s*उत्तर\s*[:\-]?\s*)[A-D]\)/gi, `$1${LETTERS[targetSlot]})`);
        langObj.exp = langObj.exp.replace(/(সঠিক\s*उत्तर\s*[:\-]?\s*)[A-D]\)/gi, `$1${LETTERS[targetSlot]})`);
        langObj.exp = langObj.exp.replace(/(Correct\s*Option\s*[:\-]?\s*\[?)[A-D](\]?)/gi, `$1${LETTERS[targetSlot]}$2`);
        langObj.exp = langObj.exp.replace(/(Correct\s*Answer\s*[:\-]?\s*)[A-D]\)/gi, `$1${LETTERS[targetSlot]})`);
      }
    };

    for (const key of Object.keys(lc)) {
      if (lc[key] && typeof lc[key] === 'object') {
        rotateLang(lc[key]);
      }
    }

    const refLang = lc.hi || lc.en || Object.values(lc)[0] || {};
    const correctVal = Array.isArray(refLang.options) ? refLang.options[targetSlot] : '';

    const newCa = {
      index: targetSlot,
      correct_index: targetSlot,
      key: LETTERS[targetSlot],
      correct_key: LETTERS[targetSlot],
      value: correctVal,
      correct_value: correctVal,
      explanation: ca.explanation || refLang.exp || ''
    };

    updateStmt.run(JSON.stringify(lc), JSON.stringify(newCa), q.question_id);
    updatedCount++;
  }

  return { total: questions.length, updated: updatedCount };
}

// 1. Rebalance All School Boards by board_id & subject_id
const boardGroups = db.prepare(`
  SELECT DISTINCT board_id, subject_id, stage
  FROM questions 
  WHERE board_id IS NOT NULL AND board_id != ''
  ORDER BY board_id, subject_id
`).all();

console.log(`Processing ${boardGroups.length} distinct board subject groups...`);

let totalBoardQuestions = 0;
const txBoard = db.transaction(() => {
  for (const bg of boardGroups) {
    const questions = db.prepare(`
      SELECT q.question_id, qv.language_content, qv.correct_answer 
      FROM questions q 
      JOIN question_versions qv ON q.question_id = qv.question_id AND qv.version_number = q.current_version
      WHERE q.board_id = ? AND q.subject_id = ? AND (q.stage = ? OR (q.stage IS NULL AND ? IS NULL))
        AND q.question_type_id IN ('single_mcq', 'mcq', 'assertion_reason')
      ORDER BY q.question_id ASC
    `).all(bg.board_id, bg.subject_id, bg.stage, bg.stage);

    if (questions.length > 0) {
      const res = rebalanceQuestionGroup(questions, `${bg.board_id}/${bg.subject_id}`);
      totalBoardQuestions += res.updated;
    }
  }
});
txBoard();
console.log(`✅ Completed Board Groups: ${totalBoardQuestions} questions naturally rebalanced.`);

// 2. Rebalance All 32 Competitive Exams by exam_version_id or subject_id
const compGroups = db.prepare(`
  SELECT DISTINCT exam_version_id, subject_id
  FROM questions 
  WHERE (board_id IS NULL OR board_id = '')
  ORDER BY exam_version_id, subject_id
`).all();

console.log(`Processing ${compGroups.length} distinct competitive exam subject groups...`);

let totalCompQuestions = 0;
const txComp = db.transaction(() => {
  for (const cg of compGroups) {
    const questions = db.prepare(`
      SELECT q.question_id, qv.language_content, qv.correct_answer 
      FROM questions q 
      JOIN question_versions qv ON q.question_id = qv.question_id AND qv.version_number = q.current_version
      WHERE (q.board_id IS NULL OR q.board_id = '') 
        AND (q.exam_version_id = ? OR (q.exam_version_id IS NULL AND ? IS NULL))
        AND q.subject_id = ?
        AND q.question_type_id IN ('single_mcq', 'mcq', 'assertion_reason')
      ORDER BY q.question_id ASC
    `).all(cg.exam_version_id, cg.exam_version_id, cg.subject_id);

    if (questions.length > 0) {
      const res = rebalanceQuestionGroup(questions, `comp/${cg.exam_version_id}/${cg.subject_id}`);
      totalCompQuestions += res.updated;
    }
  }
});
txComp();
console.log(`✅ Completed Competitive Groups: ${totalCompQuestions} questions naturally rebalanced.`);

// Checkpoint WAL immediately to keep memory & disk lean
console.log('Checkpointing and truncating SQLite WAL...');
checkpointWal();

console.log(`\n🎉 Natural Option Rebalancing Complete!`);
console.log(`Total questions processed: ${totalBoardQuestions + totalCompQuestions}`);
