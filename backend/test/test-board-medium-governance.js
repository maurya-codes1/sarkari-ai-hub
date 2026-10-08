// backend/test/test-board-medium-governance.js
// Comprehensive Verification Suite for Universal 31-Board Dual-Language System

const assert = require('assert');
const { getDb } = require('../db/database');
const {
  BOARD_OFFICIAL_MEDIUMS,
  SUPPORTED_MEDIUMS_META,
  isLanguageSubject,
  getNativeLanguageCodeForSubject,
  getSubjectMediumCapabilities,
  resolveQuestionMedium,
  getAllBoardsMediumRegistry
} = require('../services/board-medium-governance-service');

console.log('================================================================');
console.log('🏛️ RUNNING UNIVERSAL 31-BOARD DUAL-LANGUAGE GOVERNANCE SUITE');
console.log('================================================================\n');

let passedTests = 0;
let totalTests = 0;

function runTest(testName, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  ✅ [PASS] ${testName}`);
    passedTests++;
  } catch (err) {
    console.error(`  ❌ [FAIL] ${testName}:`, err.message);
    throw err;
  }
}

// -------------------------------------------------------------
// Test 1: All 31 Boards Registered with State Language + English
// -------------------------------------------------------------
runTest('All 31 Boards Registered with State Language and English Secondary', () => {
  const boardKeys = Object.keys(BOARD_OFFICIAL_MEDIUMS);
  assert.strictEqual(boardKeys.length, 31, `Expected 31 boards, got ${boardKeys.length}`);

  for (const [boardId, meta] of Object.entries(BOARD_OFFICIAL_MEDIUMS)) {
    assert.strictEqual(meta.boardId, boardId);
    assert.ok(meta.stateLanguage, `Missing stateLanguage for ${boardId}`);
    assert.strictEqual(meta.secondaryLanguage, 'en', `secondaryLanguage must be 'en' for ${boardId}`);
    assert.ok(Array.isArray(meta.officialMediums) && meta.officialMediums.length > 0);
  }
});

// -------------------------------------------------------------
// Test 2: Database Subjects Audit (932 Board Subjects)
// -------------------------------------------------------------
runTest('Deterministic Classification of 922 Authentic Subjects (270 Language vs 652 STEM)', () => {
  const db = getDb();
  const subjects = db.prepare(`
    SELECT DISTINCT s.subject_id, s.name, s.is_language_subject
    FROM subjects s
    WHERE s.subject_id IN (SELECT DISTINCT subject_id FROM questions WHERE board_id IS NOT NULL)
  `).all();

  assert.strictEqual(subjects.length, 922);
  let langCount = 0;
  let nonLangCount = 0;

  for (const s of subjects) {
    const isLang = isLanguageSubject(s.subject_id, s.name, db);
    if (isLang) {
      langCount++;
      assert.strictEqual(s.is_language_subject, 1);
    } else {
      nonLangCount++;
      assert.strictEqual(s.is_language_subject, 0);
    }
  }

  assert.strictEqual(langCount, 270);
  assert.strictEqual(nonLangCount, 652);
});

// -------------------------------------------------------------
// Test 3: Dual-Language Presentation Across Diverse Boards
// -------------------------------------------------------------
runTest('Universal Dual-Language Presentation for STEM Questions (BSEB, WB, GSEB, Karnataka, Punjab, AP)', () => {
  const db = getDb();
  const sampleBoards = [
    { boardId: 'bseb-bihar', subjectId: 'bseb-math-10', stateLang: 'hi' },
    { boardId: 'wbbse-wbchse-west-bengal', subjectId: 'wbbse-physical-science-10', stateLang: 'bn' },
    { boardId: 'gseb-gujarat', subjectId: 'gseb-math-basic-10', stateLang: 'gu' },
    { boardId: 'karnataka-kseab-pue', subjectId: 'kar-c10-science', stateLang: 'kn' },
    { boardId: 'pseb-punjab', subjectId: 'pseb-math-10', stateLang: 'pa' },
    { boardId: 'andhra-pradesh-bse-bieap', subjectId: 'ap-c10-mathematics', stateLang: 'te' }
  ];

  for (const s of sampleBoards) {
    const qRow = db.prepare(`
      SELECT q.question_id, q.board_id, q.subject_id, q.stage, q.question_type_id, q.marks,
             qv.language_content
      FROM questions q
      JOIN question_versions qv ON q.question_id = qv.question_id
      WHERE q.board_id = ? AND q.subject_id = ?
      LIMIT 1
    `).get(s.boardId, s.subjectId);

    assert.ok(qRow, `Missing question for ${s.boardId}`);

    // Resolve in English medium
    const resEn = resolveQuestionMedium(qRow, 'en');
    assert.strictEqual(resEn.questionId, qRow.question_id, 'Question ID must be 100% identical');
    assert.strictEqual(resEn.subjectId, qRow.subject_id, 'Subject ID must not leak');
    assert.strictEqual(resEn.isDualLanguage, true, 'STEM questions must be dual language');
    assert.ok(resEn.questionText.includes('\n\n') || resEn.stateLanguageQuestionText, 'Must have dual text representation');

    // Resolve in State language medium
    const resState = resolveQuestionMedium(qRow, s.stateLang);
    assert.strictEqual(resState.questionId, qRow.question_id, 'Question ID must be 100% identical');
    assert.strictEqual(resState.isDualLanguage, true);
  }
});

// -------------------------------------------------------------
// Test 4: Pattern C Boards Parity (Telangana & Chhattisgarh Dual-Language)
// -------------------------------------------------------------
runTest('Pattern C Boards Parity: Telangana (Telugu+English) & CGBSE (Hindi+English)', () => {
  const db = getDb();

  // Test 4A: Telangana Mathematics (DB had [en] originally)
  const tsRow = db.prepare(`
    SELECT q.question_id, q.board_id, q.subject_id, q.stage, q.question_type_id, q.marks,
           qv.language_content
    FROM questions q
    JOIN question_versions qv ON q.question_id = qv.question_id
    WHERE q.board_id = 'telangana-bsetg-tsbie' AND q.subject_id = 'telangana-ssc-mathematics'
    LIMIT 1
  `).get();

  assert.ok(tsRow, 'Missing Telangana question');

  // Enforce English medium
  const tsEn = resolveQuestionMedium(tsRow, 'en');
  assert.strictEqual(tsEn.questionId, tsRow.question_id);
  assert.strictEqual(tsEn.isDualLanguage, true, 'Telangana STEM must be dual language');
  assert.strictEqual(tsEn.stateLanguage, 'te');
  assert.strictEqual(tsEn.secondaryLanguage, 'en');
  assert.ok(tsEn.modelAnswer.includes('Model Answer') || tsEn.modelAnswer.includes('Answer is'), `Expected English model answer, got: ${tsEn.modelAnswer.slice(0, 40)}`);

  // Enforce Telugu medium
  const tsTe = resolveQuestionMedium(tsRow, 'te');
  assert.strictEqual(tsTe.questionId, tsRow.question_id);
  assert.strictEqual(tsTe.isDualLanguage, true);
  assert.ok(tsTe.modelAnswer.includes('ఆదర్శ సమాధానం') || tsTe.modelAnswer.includes('వివరణ'), `Expected Telugu model answer, got: ${tsTe.modelAnswer.slice(0, 40)}`);

  // Test 4B: Chhattisgarh Mathematics (DB had [hi] originally)
  const cgRow = db.prepare(`
    SELECT q.question_id, q.board_id, q.subject_id, q.stage, q.question_type_id, q.marks,
           qv.language_content
    FROM questions q
    JOIN question_versions qv ON q.question_id = qv.question_id
    WHERE q.board_id = 'cgbse-chhattisgarh' AND q.subject_id = 'cg-c10-mathematics'
    LIMIT 1
  `).get();

  assert.ok(cgRow, 'Missing CGBSE question');

  // Enforce English medium
  const cgEn = resolveQuestionMedium(cgRow, 'en');
  assert.strictEqual(cgEn.questionId, cgRow.question_id);
  assert.strictEqual(cgEn.isDualLanguage, true);
  assert.ok(cgEn.modelAnswer.includes('Model Answer'), `Expected English model answer for CGBSE, got: ${cgEn.modelAnswer.slice(0, 40)}`);

  // Enforce Hindi medium
  const cgHi = resolveQuestionMedium(cgRow, 'hi');
  assert.strictEqual(cgHi.questionId, cgRow.question_id);
  assert.strictEqual(cgHi.isDualLanguage, true);
  assert.ok(cgHi.modelAnswer.includes('आदर्श उत्तर') || cgHi.modelAnswer.includes('उत्तर'), `Expected Hindi model answer for CGBSE, got: ${cgHi.modelAnswer.slice(0, 40)}`);
});

// -------------------------------------------------------------
// Test 5: Subjective Model Answer Language Switch
// -------------------------------------------------------------
runTest('Subjective Model Answer Flips Strictly Between State Language and English', () => {
  const db = getDb();
  const subjRow = db.prepare(`
    SELECT q.question_id, q.board_id, q.subject_id, q.stage, q.question_type_id, q.marks,
           qv.language_content
    FROM questions q
    JOIN question_versions qv ON q.question_id = qv.question_id
    WHERE q.board_id = 'bseb-bihar' AND q.subject_id = 'bseb-math-10'
      AND q.question_type_id != 'single_mcq' AND q.question_type_id != 'single_choice'
    LIMIT 1
  `).get();

  assert.ok(subjRow, 'Missing BSEB subjective question');

  const hindiRes = resolveQuestionMedium(subjRow, 'hi');
  assert.strictEqual(hindiRes.questionId, subjRow.question_id);
  assert.ok(hindiRes.modelAnswer.includes('आदर्श उत्तर'), `Must contain 'आदर्श उत्तर' in Hindi medium`);

  const englishRes = resolveQuestionMedium(subjRow, 'en');
  assert.strictEqual(englishRes.questionId, subjRow.question_id);
  assert.ok(englishRes.modelAnswer.includes('Model Answer'), `Must contain 'Model Answer' in English medium`);
});

// -------------------------------------------------------------
// Test 6: Language Subjects Strictly Single-Language (No Dual, No Switcher)
// -------------------------------------------------------------
runTest('Language Subjects Strictly Single-Language (Hindi, Telugu, Bengali, Punjabi, Tamil)', () => {
  const db = getDb();

  const langTests = [
    { boardId: 'bseb-bihar', subjectId: 'bseb-hindi-10', expectedLang: 'hi' },
    { boardId: 'telangana-bsetg-tsbie', subjectId: 'telangana-ssc-first-language-telugu', expectedLang: 'te' },
    { boardId: 'wbbse-wbchse-west-bengal', subjectId: 'wbbse-bengali-fl-10', expectedLang: 'bn' },
    { boardId: 'pseb-punjab', subjectId: 'pseb-punjabi-10', expectedLang: 'pa' },
    { boardId: 'tamil-nadu-dge', subjectId: 'tn-c10-tamil-fl', expectedLang: 'ta' }
  ];

  for (const lt of langTests) {
    const row = db.prepare(`
      SELECT q.question_id, q.board_id, q.subject_id, q.stage, q.question_type_id, q.marks,
             qv.language_content
      FROM questions q
      JOIN question_versions qv ON q.question_id = qv.question_id
      WHERE q.board_id = ? AND q.subject_id = ?
      LIMIT 1
    `).get(lt.boardId, lt.subjectId);

    assert.ok(row, `Missing question for ${lt.subjectId}`);

    // Try requesting English medium on a language subject
    const res = resolveQuestionMedium(row, 'en');

    // INVARIANTS:
    assert.strictEqual(res.isLanguageSubject, true, `${lt.subjectId} must be identified as language subject`);
    assert.strictEqual(res.isDualLanguage, false, `${lt.subjectId} must NEVER be dual language`);
    assert.strictEqual(res.isMediumLocked, true, `${lt.subjectId} must be locked`);
    assert.strictEqual(res.resolvedMedium, lt.expectedLang, `Must force native code '${lt.expectedLang}', got '${res.resolvedMedium}'`);
    assert.strictEqual(res.questionId, row.question_id, 'Question ID must remain identical');
  }
});

// -------------------------------------------------------------
// Test 7: Subject Capabilities API Integrity
// -------------------------------------------------------------
runTest('Capabilities API Correctly Reports isDualLanguage for STEM and Language Subjects', () => {
  // STEM
  const stemCap = getSubjectMediumCapabilities('telangana-bsetg-tsbie', 'telangana-ssc-mathematics');
  assert.strictEqual(stemCap.isLanguageSubject, false);
  assert.strictEqual(stemCap.isDualLanguage, true);
  assert.strictEqual(stemCap.stateLanguage, 'te');
  assert.strictEqual(stemCap.secondaryLanguage, 'en');

  // Language
  const langCap = getSubjectMediumCapabilities('telangana-bsetg-tsbie', 'telangana-ssc-first-language-telugu');
  assert.strictEqual(langCap.isLanguageSubject, true);
  assert.strictEqual(langCap.isDualLanguage, false);
  assert.strictEqual(langCap.lockedMedium, 'te');
});

console.log(`\n================================================================`);
console.log(`🎉 ALL ${passedTests}/${totalTests} TESTS PASSED SUCCESSFULLY!`);
console.log(`================================================================\n`);
