// scripts/deep_audit_options_answers.js
const db = require('../backend/db/repositories/question-repository').db;

console.log("=====================================================================");
console.log("🔍 DEEP AUDIT: OPTIONS, ANSWERS, NUMERICAL & ASSERTION-REASON");
console.log("=====================================================================\n");

// Temporarily join with version_id or q.current_version
const rows = db.prepare(`
  SELECT q.question_id, q.question_type_id, q.subject_id, q.marks, v.language_content, v.correct_answer
  FROM questions q
  JOIN question_versions v ON q.question_id = v.question_id
`).all();

console.log(`Total questions scanned: ${rows.length}`);

let invalidMcq = 0;
let invalidNumerical = 0;
let invalidAssertionReason = 0;
let answerIndexOutOfBounds = 0;
let missingCorrectAnswer = 0;
let duplicateOptionsCount = 0;

for (const r of rows) {
  let lc;
  try {
    lc = JSON.parse(r.language_content);
  } catch (e) {
    continue;
  }

  let ca;
  try {
    ca = typeof r.correct_answer === 'string' ? JSON.parse(r.correct_answer) : r.correct_answer;
  } catch (e) {
    ca = { text: r.correct_answer };
  }

  // 1. Single MCQ
  if (r.question_type_id === 'single_mcq') {
    for (const lang of Object.keys(lc)) {
      const block = lc[lang];
      if (!block || !block.options) {
        invalidMcq++;
        continue;
      }
      if (!Array.isArray(block.options) || block.options.length < 2) {
        invalidMcq++;
      } else {
        // Check for duplicate options within the same question
        const optSet = new Set(block.options.map(o => typeof o === 'string' ? o.trim() : (o.text || '').trim()));
        if (optSet.size < block.options.length) {
          duplicateOptionsCount++;
        }
      }

      // Check answer index
      if (ca && typeof ca.index === 'number') {
        if (Array.isArray(block.options) && (ca.index < 0 || ca.index >= block.options.length)) {
          answerIndexOutOfBounds++;
        }
      }
    }
  }

  // 2. Numerical
  if (r.question_type_id === 'numerical') {
    if (!ca || (ca.value === undefined && ca.correct_value === undefined && ca.answer === undefined && ca.text === undefined && typeof ca !== 'number')) {
      invalidNumerical++;
    }
  }

  // 3. Assertion-Reason
  if (r.question_type_id === 'assertion_reason') {
    if (!ca) {
      invalidAssertionReason++;
    }
  }
}

console.log(`Invalid MCQ structures: ${invalidMcq}`);
console.log(`Duplicate Options: ${duplicateOptionsCount}`);
console.log(`Answer Index Out of Bounds: ${answerIndexOutOfBounds}`);
console.log(`Invalid Numerical structures: ${invalidNumerical}`);
console.log(`Invalid Assertion-Reason structures: ${invalidAssertionReason}`);

console.log("\n=====================================================================");
console.log("Deep options and answers scan complete.");
console.log("=====================================================================");
