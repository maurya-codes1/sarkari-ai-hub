// backend/test/test-phase6-mock-modes.js
// Automated Test Suite for Phase 6 Addendum: Mock Test Modes and Exact Official Exam Pattern
// Validates all 17 mandatory tests:
// Mode A (Subject-wise), Mode B (All Subjects Practice), Mode C (Full Exam Official Pattern),
// Exact Question Count & Shortage Breakdown, Zero Silent Fallback, Large Question Bank support,
// and Backward Compatibility with Practice functionality.

const assert = require('assert');
const mockService = require('../services/mock-service');
const { getDb } = require('../db/database');

console.log('\n========================================================');
console.log('🧪 SARKARIAI HUB — PHASE 6 MOCK MODES & EXACT PATTERN SUITE');
console.log('========================================================\n');

let passed = 0;
let failed = 0;

function runTest(name, fn) {
  try {
    fn();
    console.log(`✅ ${name}: PASSED`);
    passed++;
  } catch (err) {
    console.error(`❌ ${name}: FAILED`);
    console.error(err);
    failed++;
  }
}

// -------------------------------------------------------------
// TEST 1: Mode A (Subject-wise Practice) launches with flexible question count
// -------------------------------------------------------------
runTest('TEST 1: Mode A (Subject-wise Practice) launches with flexible question count', () => {
  const session = mockService.startMockSession({
    examId: 'ssc-cgl',
    testMode: 'SUBJECT_PRACTICE',
    subjectId: 'subj-math',
    count: 50
  });

  assert.strictEqual(session.success, true);
  assert.strictEqual(session.testMode, 'SUBJECT_PRACTICE');
  assert.strictEqual(session.isFlexibleCount, true);
  assert.strictEqual(session.questions.length, 50);
  assert(session.questions.every(q => q.subjectId === 'subj-math'), 'All questions must belong to Math');
});

// -------------------------------------------------------------
// TEST 2: Mode A respects subject selection and excludes other subjects
// -------------------------------------------------------------
runTest('TEST 2: Mode A respects subject selection and excludes other subjects', () => {
  const session = mockService.startMockSession({
    examId: 'ssc-cgl',
    testMode: 'SUBJECT_PRACTICE',
    subjectId: 'subj-reasoning',
    count: 20
  });

  assert.strictEqual(session.success, true);
  assert.strictEqual(session.questions.length, 20);
  assert(session.questions.every(q => q.subjectId === 'subj-reasoning'), 'All questions must belong to Reasoning');
  assert(!session.questions.some(q => q.subjectId === 'subj-math'), 'No Math questions should be present');
  assert(!session.questions.some(q => q.subjectId === 'subj-gk'), 'No GK questions should be present');
});

// -------------------------------------------------------------
// TEST 3: Mode A allows counts larger than blueprint section count if inventory permits
// -------------------------------------------------------------
runTest('TEST 3: Mode A allows counts larger than blueprint section count if inventory permits', () => {
  // SSC CGL blueprint math section has 25 questions.
  // DB has 115 math questions. User can request 75 math questions.
  const session = mockService.startMockSession({
    examId: 'ssc-cgl',
    testMode: 'SUBJECT_PRACTICE',
    subjectId: 'subj-math',
    count: 75
  });

  assert.strictEqual(session.success, true);
  assert.strictEqual(session.questions.length, 75);
  assert(session.questions.length > 25, 'Count must exceed blueprint section size of 25');
  assert(session.questions.every(q => q.subjectId === 'subj-math'));
});

// -------------------------------------------------------------
// TEST 4: Mode B (All Subjects Practice) mixes questions across syllabus subjects
// -------------------------------------------------------------
runTest('TEST 4: Mode B (All Subjects Practice) mixes questions across syllabus subjects', () => {
  const session = mockService.startMockSession({
    examId: 'ssc-cgl',
    testMode: 'ALL_SUBJECTS_PRACTICE',
    count: 40
  });

  assert.strictEqual(session.success, true);
  assert.strictEqual(session.testMode, 'ALL_SUBJECTS_PRACTICE');
  assert.strictEqual(session.isFlexibleCount, true);
  assert.strictEqual(session.questions.length, 40);

  const subjectsPresent = new Set(session.questions.map(q => q.subjectId));
  assert(subjectsPresent.size >= 2, 'Mixed practice must draw from multiple syllabus subjects');
});

// -------------------------------------------------------------
// TEST 5: Mode B allows flexible count not restricted by blueprint total
// -------------------------------------------------------------
runTest('TEST 5: Mode B allows flexible count (e.g. 50, 100) not restricted by blueprint total', () => {
  // SSC CGL blueprint total is 100 questions. User requests 50 questions in Mode B.
  const session50 = mockService.startMockSession({
    examId: 'ssc-cgl',
    testMode: 'ALL_SUBJECTS_PRACTICE',
    count: 50
  });

  assert.strictEqual(session50.success, true);
  assert.strictEqual(session50.questions.length, 50);

  // User requests 120 questions in Mode B (exceeding blueprint total of 100)
  const session120 = mockService.startMockSession({
    examId: 'ssc-cgl',
    testMode: 'ALL_SUBJECTS_PRACTICE',
    count: 120
  });

  assert.strictEqual(session120.success, true);
  assert.strictEqual(session120.questions.length, 120);
});

// -------------------------------------------------------------
// TEST 6: Mode C (Full Exam) rejects arbitrary question count override and enforces blueprint total
// -------------------------------------------------------------
runTest('TEST 6: Mode C (Full Exam) rejects arbitrary question count override and enforces blueprint total', () => {
  // SSC CGL blueprint requires 100 questions. User requests 40 questions in Mode C.
  const session = mockService.startMockSession({
    examId: 'ssc-cgl',
    testMode: 'FULL_EXAM_PATTERN',
    count: 40 // Should be ignored in Mode C
  });

  assert.strictEqual(session.success, true);
  assert.strictEqual(session.testMode, 'FULL_EXAM_PATTERN');
  assert.strictEqual(session.isFlexibleCount, false);
  assert.strictEqual(session.blueprint.totalQuestions, 100);
  assert.strictEqual(session.questions.length, 100, 'Mode C must enforce blueprint total of 100, not 40');
});

// -------------------------------------------------------------
// TEST 7: Mode C enforces exact section question counts matching blueprint
// -------------------------------------------------------------
runTest('TEST 7: Mode C enforces exact section question counts matching blueprint', () => {
  const session = mockService.startMockSession({
    examId: 'ssc-cgl',
    testMode: 'FULL_EXAM_PATTERN'
  });

  assert.strictEqual(session.success, true);
  assert.strictEqual(session.sections.length, 4);

  // Verify each section has exactly 25 questions matching blueprint section targets
  session.sections.forEach(sec => {
    assert.strictEqual(sec.blueprintTargetCount, 25);
    assert.strictEqual(sec.questionCount, 25);
    assert.strictEqual(sec.questionIds.length, 25);
  });
});

// -------------------------------------------------------------
// TEST 8: Mode C blocks session creation if question inventory is insufficient (No silent fallback)
// -------------------------------------------------------------
runTest('TEST 8: Mode C blocks session creation if question inventory is insufficient (No silent fallback)', () => {
  // NTA NEET requires 200 questions (50 physics, 50 chemistry, 100 biology).
  // Current DB has 30 physics, 35 chemistry, 35 biology (100 total).
  const session = mockService.startMockSession({
    examId: 'nta-neet',
    testMode: 'FULL_EXAM_PATTERN'
  });

  assert.strictEqual(session.success, false);
  assert.strictEqual(session.status, 'FULL_EXAM_UNAVAILABLE');
  assert.strictEqual(session.reason, 'FULL_EXAM_UNAVAILABLE_QUESTION_BANK_INSUFFICIENT');
  assert(session.message.includes('Full Exam pattern requires'));
});

// -------------------------------------------------------------
// TEST 9: Mode C shortage error includes section-by-section breakdown
// -------------------------------------------------------------
runTest('TEST 9: Mode C shortage error includes section-by-section breakdown (required, available, shortage)', () => {
  const session = mockService.startMockSession({
    examId: 'nta-neet',
    testMode: 'FULL_EXAM_PATTERN'
  });

  assert.strictEqual(session.success, false);
  assert.strictEqual(session.requiredTotal, 200);
  assert.strictEqual(session.availableTotal, 100);
  assert(Array.isArray(session.sectionShortages), 'Must provide sectionShortages array');
  assert(session.sectionShortages.length > 0, 'Must identify all sections with shortages');

  const bioShortages = session.sectionShortages.filter(s => s.subjectId === 'subj-biology');
  assert(bioShortages.length > 0, 'Biology shortages must be detailed');
  const totalBioRequired = bioShortages.reduce((sum, s) => sum + s.required, 0);
  const totalBioAvailable = bioShortages.reduce((sum, s) => sum + s.available, 0);
  const totalBioShortage = bioShortages.reduce((sum, s) => sum + s.shortage, 0);
  assert.strictEqual(totalBioRequired, 100, 'Total biology required across sections must be 100');
  assert.strictEqual(totalBioAvailable, 35, 'Total biology available must be 35');
  assert.strictEqual(totalBioShortage, 65, 'Total biology shortage must be 65');

  assert.deepStrictEqual(session.suggestedModes, ['SUBJECT_PRACTICE', 'ALL_SUBJECTS_PRACTICE']);
});

// -------------------------------------------------------------
// TEST 10: Mode C enforces zero duplicate questions across the entire session
// -------------------------------------------------------------
runTest('TEST 10: Mode C enforces zero duplicate questions across the entire session', () => {
  const session = mockService.startMockSession({
    examId: 'ssc-cgl',
    testMode: 'FULL_EXAM_PATTERN'
  });

  assert.strictEqual(session.success, true);
  const qIds = session.questions.map(q => q.id);
  const uniqueQIds = new Set(qIds);
  assert.strictEqual(qIds.length, 100);
  assert.strictEqual(uniqueQIds.size, 100, 'All 100 question IDs must be strictly unique');
});

// -------------------------------------------------------------
// TEST 11: Mode C never invents questions or pulls from wrong subjects to fill gaps
// -------------------------------------------------------------
runTest('TEST 11: Mode C never invents questions or pulls from wrong subjects to fill gaps', () => {
  const session = mockService.startMockSession({
    examId: 'ssc-cgl',
    testMode: 'FULL_EXAM_PATTERN'
  });

  assert.strictEqual(session.success, true);

  // Check section 1 (Reasoning): every question must be reasoning
  const sec1 = session.sections[0];
  const sec1Questions = session.questions.slice(0, 25);
  assert(sec1Questions.every(q => q.subjectId === sec1.subjectId), 'Section 1 questions must strictly be Reasoning');

  // Check section 3 (Math): every question must be math
  const sec3 = session.sections[2];
  const sec3Questions = session.questions.slice(50, 75);
  assert(sec3Questions.every(q => q.subjectId === sec3.subjectId), 'Section 3 questions must strictly be Math');
});

// -------------------------------------------------------------
// TEST 12: Large question bank correctly fuels Mode A/B beyond blueprint size
// -------------------------------------------------------------
runTest('TEST 12: Large question bank correctly fuels Mode A/B beyond blueprint size', () => {
  const db = getDb();
  const mathCountRow = db.prepare("SELECT COUNT(*) as c FROM questions WHERE subject_id = 'subj-math'").get();
  assert(mathCountRow.c >= 100, 'Database question bank contains 100+ math questions');

  // Fuel Mode A with 100 questions from this pool
  const session = mockService.startMockSession({
    examId: 'ssc-cgl',
    testMode: 'SUBJECT_PRACTICE',
    subjectId: 'subj-math',
    count: 100
  });

  assert.strictEqual(session.success, true);
  assert.strictEqual(session.questions.length, 100);
  const uniqueIds = new Set(session.questions.map(q => q.id));
  assert.strictEqual(uniqueIds.size, 100, 'All 100 practice questions from bank must be unique');
});

// -------------------------------------------------------------
// TEST 13: getMockModes(examId) returns all 3 modes with accurate availability and metadata
// -------------------------------------------------------------
runTest('TEST 13: getMockModes(examId) returns all 3 modes with accurate availability and metadata', () => {
  const modesData = mockService.getMockModes('ssc-cgl');

  assert.strictEqual(modesData.success, true);
  assert.strictEqual(modesData.examId, 'ssc-cgl');
  assert.strictEqual(modesData.modes.length, 3);

  const modeA = modesData.modes.find(m => m.mode === 'SUBJECT_PRACTICE');
  const modeB = modesData.modes.find(m => m.mode === 'ALL_SUBJECTS_PRACTICE');
  const modeC = modesData.modes.find(m => m.mode === 'FULL_EXAM_PATTERN');

  assert(modeA, 'Mode A must exist');
  assert.strictEqual(modeA.isFlexibleCount, true);
  assert(Array.isArray(modeA.subjects), 'Mode A must list available subjects');
  assert(modeA.subjects.length >= 4, 'Mode A must include at least 4 subjects');

  assert(modeB, 'Mode B must exist');
  assert.strictEqual(modeB.isFlexibleCount, true);
  assert(modeB.totalBankQuestions > 0, 'Mode B must report bank questions');

  assert(modeC, 'Mode C must exist');
  assert.strictEqual(modeC.isFlexibleCount, false);
  assert(modeC.blueprintSummary, 'Mode C must include blueprintSummary');
  assert.strictEqual(modeC.blueprintSummary.totalQuestions, 100);
});

// -------------------------------------------------------------
// TEST 14: Marking rules in Mode C match verified blueprint
// -------------------------------------------------------------
runTest('TEST 14: Marking rules in Mode C match verified blueprint (marks_correct, marks_wrong, negative marking)', () => {
  const session = mockService.startMockSession({
    examId: 'ssc-cgl',
    testMode: 'FULL_EXAM_PATTERN'
  });

  assert.strictEqual(session.success, true);
  assert.strictEqual(session.blueprint.isNegativeMarking, true);

  // SSC CGL Tier 1: +2.0 marks per correct, -0.50 marks per wrong
  session.sections.forEach(sec => {
    assert.strictEqual(sec.marksCorrect, 2.0);
    assert.strictEqual(sec.negativeValue, 0.5);
    assert.strictEqual(sec.hasNegativeMarking, true);
  });
});

// -------------------------------------------------------------
// TEST 15: Timer configuration in Mode C matches verified blueprint duration
// -------------------------------------------------------------
runTest('TEST 15: Timer configuration in Mode C matches verified blueprint duration', () => {
  const session = mockService.startMockSession({
    examId: 'ssc-cgl',
    testMode: 'FULL_EXAM_PATTERN'
  });

  assert.strictEqual(session.success, true);
  assert.strictEqual(session.timerConfig.mode, 'COUNTDOWN');
  assert.strictEqual(session.timerConfig.durationMinutes, 60);
  assert.strictEqual(session.timerConfig.totalSeconds, 3600);
  assert.strictEqual(session.timerConfig.autoSubmitOnExpiry, true);
});

// -------------------------------------------------------------
// TEST 16: Practice modes (A & B) remain available even when Full Exam (Mode C) is unavailable/insufficient
// -------------------------------------------------------------
runTest('TEST 16: Practice modes (A & B) remain available even when Full Exam (Mode C) is unavailable/insufficient', () => {
  // NTA NEET has insufficient questions for Full Exam (Mode C is blocked)
  const modeCAttempt = mockService.startMockSession({
    examId: 'nta-neet',
    testMode: 'FULL_EXAM_PATTERN'
  });
  assert.strictEqual(modeCAttempt.success, false);
  assert.strictEqual(modeCAttempt.status, 'FULL_EXAM_UNAVAILABLE');

  // Mode A (Biology Practice) is 100% available
  const modeAAttempt = mockService.startMockSession({
    examId: 'nta-neet',
    testMode: 'SUBJECT_PRACTICE',
    subjectId: 'subj-biology',
    count: 20
  });
  assert.strictEqual(modeAAttempt.success, true);
  assert.strictEqual(modeAAttempt.questions.length, 20);

  // Mode B (All Subjects Practice) is 100% available
  const modeBAttempt = mockService.startMockSession({
    examId: 'nta-neet',
    testMode: 'ALL_SUBJECTS_PRACTICE',
    count: 30
  });
  assert.strictEqual(modeBAttempt.success, true);
  assert.strictEqual(modeBAttempt.questions.length, 30);
});

// -------------------------------------------------------------
// TEST 17: Multi-version support: Mock modes correctly resolve version-specific blueprints
// -------------------------------------------------------------
runTest('TEST 17: Multi-version support: Mock modes correctly resolve version-specific blueprints', () => {
  // Test SSC CGL 2026 vs historical version
  const currentModes = mockService.getMockModes('ssc-cgl', 'ver-ssc-cgl-2026');
  assert.strictEqual(currentModes.success, true);
  assert.strictEqual(currentModes.versionId, 'ver-ssc-cgl-2026');

  const histModes = mockService.getMockModes('ssc-cgl', 'ver-ssc-cgl-2025');
  assert.strictEqual(histModes.success, true);
  assert.strictEqual(histModes.versionId, 'ver-ssc-cgl-2025');
  assert.strictEqual(histModes.modes.length, 3);
});

// -------------------------------------------------------------
// SUMMARY
// -------------------------------------------------------------
console.log('\n========================================================');
console.log(`📊 PHASE 6 MOCK MODES SUMMARY: ${passed} PASSED / ${failed} FAILED (Total: ${passed + failed})`);
console.log('========================================================\n');

if (failed > 0) {
  process.exit(1);
}
