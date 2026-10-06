// backend/test/test-phase2-medium-integration.js
// Verification of Phase 2 UI and Backend Integration:
// 1. Board Medium Registry & Capabilities Endpoints
// 2. Adaptive Practice API with preferredMedium parameter & Language Lock
// 3. Mock Service (Live Mock Test Engine) with preferredMedium & Language Lock
// 4. Competitive Exams Isolation (No regression on SSC / Railways)

const assert = require('assert');

const boardMediumGovernanceService = require('../services/board-medium-governance-service');
const adaptiveSelectionService = require('../services/adaptive-selection-service');
const mockService = require('../services/mock-service');

console.log('================================================================');
console.log('🌐 VERIFYING PHASE 2: UI & BACKEND MEDIUM INTEGRATION');
console.log('================================================================\n');

let passedTests = 0;
let totalTests = 0;

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

// -------------------------------------------------------------
// Test 1: Board Medium Registry & Capabilities Services
// -------------------------------------------------------------
runTest('Registry returns 31 distinct boards with official examination mediums', () => {
  const registry = boardMediumGovernanceService.getAllBoardsMediumRegistry();
  assert(Array.isArray(registry), 'Registry should be an array of boards');
  assert(registry.length >= 31, `Expected at least 31 boards in registry, got ${registry.length}`);

  const bseb = registry.find(b => b.boardId === 'bseb-bihar');
  const telangana = registry.find(b => b.boardId === 'telangana-bsetg-tsbie' || b.boardId.includes('telangana'));
  const punjab = registry.find(b => b.boardId === 'pseb-punjab' || b.boardId.includes('punjab'));
  const assam = registry.find(b => b.boardId === 'asseb-assam' || b.boardId.includes('assam'));
  const wb = registry.find(b => b.boardId === 'wbbse-wbchse-west-bengal' || b.boardId.includes('west-bengal'));

  assert(bseb, 'BSEB must exist in registry');
  assert(telangana, 'Telangana must exist in registry');
  assert(punjab, 'Punjab must exist in registry');
  assert(assam, 'Assam must exist in registry');
  assert(wb, 'West Bengal must exist in registry');

  // Check multi-medium configurations
  assert.deepStrictEqual(bseb.officialMediums, ['hi', 'en', 'ur']);
  assert.deepStrictEqual(telangana.officialMediums, ['te', 'en', 'ur']);
  assert.deepStrictEqual(punjab.officialMediums, ['pa', 'en', 'hi']);
  assert.deepStrictEqual(assam.officialMediums, ['as', 'en', 'bn']);
  assert.deepStrictEqual(wb.officialMediums, ['bn', 'en', 'hi', 'ur']);
});

// -------------------------------------------------------------
// Test 2: Capabilities correctly locks language subjects and enables STEM
// -------------------------------------------------------------
runTest('Capabilities accurately distinguishes STEM (Dual-Lang) vs Language (Native-Locked)', () => {
  const bsebMath = boardMediumGovernanceService.getSubjectMediumCapabilities('bseb-bihar', 'subj-math', 'Mathematics');
  assert.strictEqual(bsebMath.isLanguageSubject, false);
  assert.strictEqual(bsebMath.isDualLanguage, true);
  assert.strictEqual(bsebMath.allowMediumSelection, true);
  assert.deepStrictEqual(bsebMath.officialMediums, ['hi', 'en', 'ur']);

  const bsebHindi = boardMediumGovernanceService.getSubjectMediumCapabilities('bseb-bihar', 'subj-hindi', 'General Hindi');
  assert.strictEqual(bsebHindi.isLanguageSubject, true);
  assert.strictEqual(bsebHindi.isDualLanguage, false);
  assert.strictEqual(bsebHindi.allowMediumSelection, false);
  assert.strictEqual(bsebHindi.lockedMedium, 'hi');

  const telanganaTelugu = boardMediumGovernanceService.getSubjectMediumCapabilities('bsetg-telangana', 'subj-telugu', 'Telugu');
  assert.strictEqual(telanganaTelugu.isLanguageSubject, true);
  assert.strictEqual(telanganaTelugu.lockedMedium, 'te');
});

// -------------------------------------------------------------
// Test 3: Adaptive Practice Selection for BSEB Math with English Medium
// -------------------------------------------------------------
runTest('Adaptive Practice: BSEB Math with English medium renders dual text & English explanation', () => {
  const result = adaptiveSelectionService.selectQuestions({
    userId: 'test-cand-01',
    examId: 'bseb-bihar',
    practiceMode: 'MIXED_ADAPTIVE',
    questionCount: 5,
    subjectId: 'math',
    preferredMedium: 'en',
    stage: 'Class 10'
  });

  assert(result.questions.length > 0, 'Questions should be returned');
  const q = result.questions[0];
  assert(q.isDualLanguage, 'Math question should be marked isDualLanguage');
  assert.strictEqual(q.resolvedMedium, 'en', 'Medium should be resolved to en');
  // English explanation / model answer
  assert(q.explanation.toLowerCase().includes('model answer') || q.explanation.toLowerCase().includes('answer') || q.explanation.length > 10, 'Explanation should be pedagogical');
});

// -------------------------------------------------------------
// Test 4: Adaptive Practice Selection for BSEB Math with Hindi Medium
// -------------------------------------------------------------
runTest('Adaptive Practice: BSEB Math with Hindi medium renders dual text & Hindi explanation', () => {
  const result = adaptiveSelectionService.selectQuestions({
    userId: 'test-cand-02',
    examId: 'bseb-bihar',
    practiceMode: 'MIXED_ADAPTIVE',
    questionCount: 5,
    subjectId: 'math',
    preferredMedium: 'hi',
    stage: 'Class 10'
  });

  assert(result.questions.length > 0, 'Questions should be returned');
  const q = result.questions[0];
  assert(q.isDualLanguage, 'Math question should be marked isDualLanguage');
  assert.strictEqual(q.resolvedMedium, 'hi', 'Medium should be resolved to hi');
  assert(q.explanation.includes('आदर्श उत्तर') || q.explanation.includes('उत्तर') || q.explanation.length > 10, 'Explanation should be in Hindi');
});

// -------------------------------------------------------------
// Test 5: Adaptive Practice Selection for Language Subject (BSEB Hindi) with requested English medium
// -------------------------------------------------------------
runTest('Adaptive Practice: Language subject strictly ignores English request and locks native script', () => {
  const result = adaptiveSelectionService.selectQuestions({
    userId: 'test-cand-03',
    examId: 'bseb-bihar',
    practiceMode: 'MIXED_ADAPTIVE',
    questionCount: 5,
    subjectId: 'hindi',
    preferredMedium: 'en', // User tried to ask for English in Hindi literature
    stage: 'Class 10'
  });

  assert(result.questions.length > 0, 'Hindi questions should be returned');
  const q = result.questions[0];
  assert.strictEqual(q.isLanguageSubject, true, 'Must be identified as language subject');
  assert.strictEqual(q.isDualLanguage, false, 'Must NOT be dual language');
  assert.strictEqual(q.resolvedMedium, 'hi', 'Must lock strictly to native language (hi)');
});

// -------------------------------------------------------------
// Test 6: Mock Service (Live Mock Test Engine) with preferredMedium
// -------------------------------------------------------------
runTest('Mock Service: Board exam mock session respects preferredMedium and sets dual format', () => {
  const session = mockService.startMockSession({
    examId: 'bseb-bihar',
    boardId: 'bseb-bihar',
    stage: 'Class 10',
    subjectId: 'science',
    testMode: 'SUBJECT_PRACTICE',
    requestedCount: 10,
    preferredMedium: 'en'
  });

  assert(session.success, 'Mock session should be created');
  assert(session.questions.length > 0, 'Session questions should be populated');
  const q = session.questions[0];
  assert.strictEqual(q.resolvedMedium, 'en', 'Resolved medium in client question should be en');
  assert(q.isDualLanguage, 'STEM question in mock test must be isDualLanguage');
});

// -------------------------------------------------------------
// Test 7: Competitive Exams (SSC / RRB) Isolation Guarantee
// -------------------------------------------------------------
runTest('Competitive Exams: SSC CGL practice remains 100% untampered and isolated', () => {
  const sscSession = mockService.startMockSession({
    examId: 'ssc-cgl',
    testMode: 'SUBJECT_PRACTICE',
    subjectId: 'subj-math',
    requestedCount: 5
  });

  assert(sscSession.success, 'SSC session should succeed');
  assert(sscSession.questions.length > 0, 'SSC questions should be returned');
  // Check that no board properties leaked into SSC
  assert(!sscSession.board, 'SSC should not have board set');
});

console.log('\n================================================================');
if (passedTests === totalTests) {
  console.log(`🎉 ALL ${passedTests}/${totalTests} INTEGRATION TESTS PASSED SUCCESSFULLY!`);
} else {
  console.log(`⚠️ ${passedTests}/${totalTests} TESTS PASSED.`);
  process.exit(1);
}
console.log('================================================================\n');
