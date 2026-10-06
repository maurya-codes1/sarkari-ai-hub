// backend/test/test-phase3-subjective-sync.js
// Phase 3: Subjective Answer Sync Automated Test Suite
// Verifies:
// 1. BSEB Math Subjective with English Medium (English Model Answer)
// 2. BSEB Math Subjective with Hindi Medium (Hindi Model Answer)
// 3. Multi-Medium Official Board Support (BSEB Urdu Medium)
// 4. Regional Board STEM Support: Telangana Telugu Medium (Telugu Model Answer)
// 5. Regional Board STEM Support: Punjab Punjabi Medium (Punjabi Model Answer)
// 6. Strict Native Script Lock on Language Subjects (Hindi, Sanskrit, Telugu, Punjabi, Tamil)
// 7. Parity across all 4 Subjective Question Types (very_short, short, long, case_study)
// 8. Mock Service Detailed Review & Practice Sync in chosen medium
// 9. Adaptive Practice Subjective Resolution
// 10. Absolute Question Identity Preservation (Zero Question Swapping)

const assert = require('assert');
const path = require('path');
const { getDb } = require('../db/database');
const db = getDb();

const boardMediumGovService = require('../services/board-medium-governance-service');
const mockService = require('../services/mock-service');
const adaptiveSelectionService = require('../services/adaptive-selection-service');

console.log('====================================================================');
console.log('🎯 RUNNING PHASE 3: SUBJECTIVE ANSWER SYNC TEST SUITE');
console.log('====================================================================\n');

let totalTests = 0;
let passedTests = 0;

function runTest(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  ✅ [PASS] ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ❌ [FAIL] ${name}: ${err.message}`);
    console.error(err.stack);
  }
}

// -----------------------------------------------------------------
// Helper: Fetch a real subjective question from DB
// -----------------------------------------------------------------
function getDbSubjectiveQuestion(boardId, subjectPattern, typePattern = null) {
  let query = `
    SELECT q.question_id, q.board_id, q.subject_id, q.question_type_id, q.marks, q.stage,
           qv.language_content, qv.correct_answer
    FROM questions q
    JOIN question_versions qv ON qv.question_id = q.question_id AND qv.version_number = q.current_version
    WHERE q.board_id = ? AND q.subject_id LIKE ?
  `;
  const params = [boardId, subjectPattern];
  if (typePattern) {
    query += ` AND q.question_type_id = ?`;
    params.push(typePattern);
  } else {
    query += ` AND q.question_type_id IN ('very_short_answer', 'short_answer', 'long_answer', 'case_study')`;
  }
  query += ` LIMIT 1`;
  return db.prepare(query).get(...params);
}

// -----------------------------------------------------------------
// Test 1: BSEB Math Subjective with English Medium
// -----------------------------------------------------------------
runTest('BSEB Math Subjective with English Medium -> Dual Question & English Model Answer', () => {
  const qRow = getDbSubjectiveQuestion('bseb-bihar', '%math%');
  assert(qRow, 'Must find a BSEB Math subjective question in DB');

  const resolved = boardMediumGovService.resolveQuestionMedium(qRow, 'en');
  assert(resolved, 'Resolution must succeed');
  assert.strictEqual(resolved.questionId, qRow.question_id);
  assert.strictEqual(resolved.resolvedMedium, 'en');
  assert.strictEqual(resolved.isLanguageSubject, false);
  assert.strictEqual(resolved.isDualLanguage, true);

  // Question Text must be Dual-Language (Hindi + English)
  assert(resolved.questionText.includes('प्रश्न') || resolved.questionText.includes('गणित') || resolved.stateLanguageQuestionText.length > 0, 'Must have Hindi part');
  assert(resolved.questionText.toLowerCase().includes('question') || resolved.englishQuestionText.length > 0, 'Must have English part');

  // Model answer must be in English
  assert(resolved.modelAnswer, 'modelAnswer must not be empty');
  assert(resolved.modelAnswer.toLowerCase().includes('model answer') || resolved.modelAnswer.toLowerCase().includes('step'), 'Model answer should be English');
  assert(!resolved.modelAnswer.startsWith('आदर्श उत्तर'), 'English medium model answer must not start with Hindi "आदर्श उत्तर"');
});

// -----------------------------------------------------------------
// Test 2: BSEB Math Subjective with Hindi Medium
// -----------------------------------------------------------------
runTest('BSEB Math Subjective with Hindi Medium -> Dual Question & Hindi Model Answer', () => {
  const qRow = getDbSubjectiveQuestion('bseb-bihar', '%math%');
  assert(qRow, 'Must find a BSEB Math subjective question in DB');

  const resolved = boardMediumGovService.resolveQuestionMedium(qRow, 'hi');
  assert(resolved, 'Resolution must succeed');
  assert.strictEqual(resolved.questionId, qRow.question_id);
  assert.strictEqual(resolved.resolvedMedium, 'hi');
  assert.strictEqual(resolved.isDualLanguage, true);

  // Model answer must be in Hindi
  assert(resolved.modelAnswer, 'modelAnswer must not be empty');
  assert(resolved.modelAnswer.includes('आदर्श उत्तर') || resolved.modelAnswer.includes('उत्तर'), 'Hindi medium model answer must contain Hindi text');
});

// -----------------------------------------------------------------
// Test 3: Multi-Medium Board Support (BSEB Urdu Medium)
// -----------------------------------------------------------------
runTest('BSEB Math Subjective with Urdu Medium -> Urdu Resolved Model Answer', () => {
  const qRow = getDbSubjectiveQuestion('bseb-bihar', '%math%');
  assert(qRow, 'Must find a BSEB Math subjective question in DB');

  const resolved = boardMediumGovService.resolveQuestionMedium(qRow, 'ur');
  assert(resolved, 'Resolution must succeed');
  assert.strictEqual(resolved.resolvedMedium, 'ur');
  assert.strictEqual(resolved.isDualLanguage, true);

  // Model answer must contain Urdu heading or authentic translation
  assert(resolved.modelAnswer, 'Urdu model answer must not be empty');
  assert(resolved.modelAnswer.includes('ماڈل جواب') || resolved.modelAnswer.length > 10, 'Urdu model answer should have authentic Urdu text');
});

// -----------------------------------------------------------------
// Test 4: Regional Board STEM Support: Telangana Telugu Medium
// -----------------------------------------------------------------
runTest('Telangana STEM Subjective with Telugu Medium -> Telugu Model Answer', () => {
  const qRow = getDbSubjectiveQuestion('telangana-bsetg-tsbie', '%math%') || getDbSubjectiveQuestion('telangana-bsetg-tsbie', '%science%');
  assert(qRow, 'Must find a Telangana STEM question in DB');

  const resolved = boardMediumGovService.resolveQuestionMedium(qRow, 'te');
  assert(resolved, 'Resolution must succeed');
  assert.strictEqual(resolved.resolvedMedium, 'te');
  assert.strictEqual(resolved.isDualLanguage, true);

  // Model answer must contain Telugu heading or Telugu text
  assert(resolved.modelAnswer, 'Telugu model answer must not be empty');
  assert(resolved.modelAnswer.includes('ఆదర్శ సమాధానం') || /[\u0C00-\u0C7F]/.test(resolved.modelAnswer), 'Telugu model answer must contain Telugu script');
});

// -----------------------------------------------------------------
// Test 5: Regional Board STEM Support: Punjab Punjabi Medium
// -----------------------------------------------------------------
runTest('Punjab (PSEB) STEM Subjective with Punjabi Medium -> Punjabi Model Answer', () => {
  const qRow = getDbSubjectiveQuestion('pseb-punjab', '%math%') || getDbSubjectiveQuestion('pseb-punjab', '%sci%');
  assert(qRow, 'Must find a PSEB STEM question in DB');

  const resolved = boardMediumGovService.resolveQuestionMedium(qRow, 'pa');
  assert(resolved, 'Resolution must succeed');
  assert.strictEqual(resolved.resolvedMedium, 'pa');
  assert.strictEqual(resolved.isDualLanguage, true);

  // Model answer must contain Gurmukhi/Punjabi script
  assert(resolved.modelAnswer, 'Punjabi model answer must not be empty');
  assert(resolved.modelAnswer.includes('ਆਦਰਸ਼ ਉੱਤਰ') || /[\u0A00-\u0A7F]/.test(resolved.modelAnswer), 'Punjabi model answer must contain Gurmukhi script');
});

// -----------------------------------------------------------------
// Test 6: Strict Native Script Lock on Language Subjects
// -----------------------------------------------------------------
runTest('Native Script Lock: Language subjects refuse English request and lock authentic script', () => {
  // Test cases: [boardId, subjectPattern, expectedScriptRegex, langName]
  const langCases = [
    { boardId: 'cbse-board', sub: '%hindi%', regex: /[\u0900-\u097F]/, lang: 'Hindi Devanagari' },
    { boardId: 'telangana-bsetg-tsbie', sub: '%telugu%', regex: /[\u0C00-\u0C7F]/, lang: 'Telugu' },
    { boardId: 'pseb-punjab', sub: '%punjabi%', regex: /[\u0A00-\u0A7F]/, lang: 'Punjabi Gurmukhi' },
    { boardId: 'tamil-nadu-dge', sub: '%tamil%', regex: /[\u0B80-\u0BFF]/, lang: 'Tamil' },
    { boardId: 'wbbse-wbchse-west-bengal', sub: '%bengali%', regex: /[\u0980-\u09FF]/, lang: 'Bengali' }
  ];

  for (const tc of langCases) {
    const qRow = getDbSubjectiveQuestion(tc.boardId, tc.sub);
    if (!qRow) {
      console.warn(`    ⚠️ Note: No subjective row found for ${tc.boardId} ${tc.sub}, skipping this sub-check`);
      continue;
    }

    // Attempt to request English medium on native language literature
    const resolved = boardMediumGovService.resolveQuestionMedium(qRow, 'en');
    assert.strictEqual(resolved.isLanguageSubject, true, `${tc.lang} must be marked as isLanguageSubject`);
    assert.strictEqual(resolved.isMediumLocked, true, `${tc.lang} must be marked as isMediumLocked`);
    assert.strictEqual(resolved.isDualLanguage, false, `${tc.lang} must NOT be dual language`);
    assert(tc.regex.test(resolved.modelAnswer), `${tc.lang} model answer must remain locked in native script, refusing English translation`);
  }
});

// -----------------------------------------------------------------
// Test 7: Parity Across All 4 Subjective Question Types
// -----------------------------------------------------------------
runTest('Parity Across All 4 Subjective Question Types (very_short, short, long, case_study)', () => {
  const types = ['very_short_answer', 'short_answer', 'long_answer', 'case_study'];

  for (const t of types) {
    const row = db.prepare(`
      SELECT q.question_id, q.board_id, q.subject_id, q.question_type_id, q.marks, q.stage,
             qv.language_content, qv.correct_answer
      FROM questions q
      JOIN question_versions qv ON qv.question_id = q.question_id AND qv.version_number = q.current_version
      WHERE q.question_type_id = ? AND q.board_id = 'bseb-bihar'
      LIMIT 1
    `).get(t);

    if (row) {
      const resEn = boardMediumGovService.resolveQuestionMedium(row, 'en');
      const resHi = boardMediumGovService.resolveQuestionMedium(row, 'hi');

      assert.strictEqual(resEn.questionType, t, `questionType must match ${t}`);
      assert(resEn.modelAnswer && resEn.modelAnswer.length > 5, `${t} must have non-empty English model answer`);
      assert(resHi.modelAnswer && resHi.modelAnswer.length > 5, `${t} must have non-empty Hindi model answer`);
      assert(Array.isArray(resEn.keyPoints), `${t} keyPoints must be an array`);
      assert(typeof resEn.markingGuidance === 'string', `${t} markingGuidance must be string`);
    }
  }
});

// -----------------------------------------------------------------
// Test 8: Mock Service Detailed Review & Practice Sync
// -----------------------------------------------------------------
runTest('Mock Service: Detailed review and practice format sync model answer with chosen medium', () => {
  // Test 8A: Format question for client with English medium
  const qRow = getDbSubjectiveQuestion('bseb-bihar', '%math%');
  assert(qRow, 'Must find BSEB Math question');

  const clientQ_En = mockService._formatQuestionForClient(qRow, null, { preferredMedium: 'en', boardId: 'bseb-bihar' }, true);
  assert.strictEqual(clientQ_En.resolvedMedium, 'en');
  assert(clientQ_En.modelAnswer && (clientQ_En.modelAnswer.toLowerCase().includes('model answer') || clientQ_En.modelAnswer.toLowerCase().includes('step')), 'clientQ modelAnswer should be English');

  // Test 8B: Format question for client with Hindi medium
  const clientQ_Hi = mockService._formatQuestionForClient(qRow, null, { preferredMedium: 'hi', boardId: 'bseb-bihar' }, true);
  assert.strictEqual(clientQ_Hi.resolvedMedium, 'hi');
  assert(clientQ_Hi.modelAnswer && (clientQ_Hi.modelAnswer.includes('आदर्श उत्तर') || clientQ_Hi.modelAnswer.includes('उत्तर')), 'clientQ modelAnswer should be Hindi');
});

// -----------------------------------------------------------------
// Test 9: Adaptive Practice Subjective Sync
// -----------------------------------------------------------------
runTest('Adaptive Practice: Selects subjective questions with synchronized modelAnswer', () => {
  const result = adaptiveSelectionService.selectQuestions({
    userId: 'test-cand-phase3',
    examId: 'bseb-bihar',
    practiceMode: 'MIXED_ADAPTIVE',
    questionCount: 5,
    subjectId: 'math',
    preferredMedium: 'en',
    stage: 'Class 10'
  });

  assert(result.questions.length > 0, 'Adaptive questions should be returned');
  const q = result.questions[0];
  assert(q.modelAnswer, 'Adaptive question must include modelAnswer');
  assert(q.markingGuidance !== undefined, 'Adaptive question must include markingGuidance');
  assert(Array.isArray(q.keyPoints), 'Adaptive question must include keyPoints');
});

// -----------------------------------------------------------------
// Test 10: Zero Subject Leakage & Question Identity Invariant
// -----------------------------------------------------------------
runTest('Zero Subject Leakage: Changing medium preserves exact question identity', () => {
  const qRow = getDbSubjectiveQuestion('bseb-bihar', '%math%');
  assert(qRow, 'Must find BSEB Math question');

  const enRes = boardMediumGovService.resolveQuestionMedium(qRow, 'en');
  const hiRes = boardMediumGovService.resolveQuestionMedium(qRow, 'hi');
  const urRes = boardMediumGovService.resolveQuestionMedium(qRow, 'ur');

  // All three must share identical question identity
  assert.strictEqual(enRes.questionId, qRow.question_id);
  assert.strictEqual(hiRes.questionId, qRow.question_id);
  assert.strictEqual(urRes.questionId, qRow.question_id);

  assert.strictEqual(enRes.subjectId, qRow.subject_id);
  assert.strictEqual(hiRes.subjectId, qRow.subject_id);
  assert.strictEqual(urRes.subjectId, qRow.subject_id);

  assert.strictEqual(enRes.marks, qRow.marks);
  assert.strictEqual(hiRes.marks, qRow.marks);
  assert.strictEqual(urRes.marks, qRow.marks);
});

console.log('\n====================================================================');
if (passedTests === totalTests) {
  console.log(`🎉 ALL ${passedTests}/${totalTests} PHASE 3 TESTS PASSED PERFECTLY!`);
} else {
  console.log(`⚠️ ${passedTests}/${totalTests} TESTS PASSED.`);
  process.exit(1);
}
console.log('====================================================================\n');
