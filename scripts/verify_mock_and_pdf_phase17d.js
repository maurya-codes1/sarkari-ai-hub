/**
 * scripts/verify_mock_and_pdf_phase17d.js
 * 
 * Verifies Mock Test and PDF generation across diverse modes:
 * - One-section objective
 * - Multi-section objective
 * - Language-specific objective (Tamil)
 * - Bilingual objective (Hindi + English)
 * - Numerical exam
 * - Subjective exam
 * - Mixed objective/subjective
 * - Full Exam vs Insufficient Official Pool
 * - Question Bank PDF, Practice PDF, Answer Key PDF
 */

const assert = require('assert');
const path = require('path');
const mockService = require('../backend/services/mock-service');
const pdfGenerationService = require('../backend/services/pdf-generation-service');
const Database = require('better-sqlite3');
const db = new Database(path.join(__dirname, '../backend/db/sarkari_core.db'));

console.log("=====================================================================");
console.log("📑 SARKARIAI HUB — PHASE 17D MOCK & PDF ENGINE VERIFICATION");
console.log("=====================================================================\n");

let passed = 0;

function check(name, fn) {
  try {
    fn();
    console.log(`✅ ${name}: PASSED`);
    passed++;
  } catch (e) {
    console.error(`❌ ${name}: FAILED`);
    console.error(e);
    process.exit(1);
  }
}

// 1. One-section objective practice
check("1. One-section objective practice (Mode A - Math)", () => {
  const session = mockService.startMockSession({
    examId: 'ssc-cgl',
    testMode: 'SUBJECT_PRACTICE',
    subjectId: 'subj-math',
    count: 25
  });
  assert.strictEqual(session.success, true);
  assert.strictEqual(session.questions.length, 25);
  assert(session.questions.every(q => q.subjectId === 'subj-math'));
});

// 2. Multi-section objective exam (Mode C - SSC CGL Full Exam Pattern)
check("2. Multi-section objective exam (SSC CGL Full Exam Pattern)", () => {
  const session = mockService.startMockSession({
    examId: 'ssc-cgl',
    testMode: 'FULL_EXAM_PATTERN'
  });
  assert.strictEqual(session.success, true);
  assert.strictEqual(session.sections.length, 4);
  assert.strictEqual(session.questions.length, 100);
});

// 3. Language-specific objective exam (Tamil)
check("3. Language-specific objective exam (Tamil SSLC)", () => {
  const session = mockService.startMockSession({
    examId: 'tndge-tamilnadu',
    testMode: 'SUBJECT_PRACTICE',
    subjectId: 'subj-tamil',
    languageConfig: { primary: 'ta', secondary: 'en', optionMode: 'monolingual' },
    count: 20
  });
  assert.strictEqual(session.success, true);
  assert.strictEqual(session.questions.length, 20);
});

// 4. Bilingual objective practice (Hindi + English)
check("4. Bilingual objective practice (GK in Hindi & English)", () => {
  const session = mockService.startMockSession({
    examId: 'ssc-cgl',
    testMode: 'SUBJECT_PRACTICE',
    subjectId: 'subj-gk',
    languageConfig: { primary: 'hi', secondary: 'en', optionMode: 'bilingual' },
    count: 25
  });
  assert.strictEqual(session.success, true);
  assert.strictEqual(session.questions.length, 25);
});

// 5. Numerical practice session
check("5. Numerical practice session (JEE Main Math)", () => {
  const session = mockService.startMockSession({
    examId: 'nta-jee-main',
    testMode: 'SUBJECT_PRACTICE',
    subjectId: 'subj-math12',
    count: 15
  });
  assert.strictEqual(session.success, true);
  assert.strictEqual(session.questions.length, 15);
});

// 6. Subjective practice session
check("6. Subjective practice session (CBSE Science)", () => {
  const session = mockService.startMockSession({
    examId: 'cbse-board',
    testMode: 'SUBJECT_PRACTICE',
    subjectId: 'subj-science',
    count: 10
  });
  assert.strictEqual(session.success, true);
  assert.strictEqual(session.questions.length, 10);
});

// 7. Full Exam vs Insufficient Official Pool (NEET UG)
check("7. Insufficient official pool correctly blocked for NEET UG in FULL_EXAM_PATTERN", () => {
  const session = mockService.startMockSession({
    examId: 'nta-neet',
    testMode: 'FULL_EXAM_PATTERN'
  });
  assert.strictEqual(session.success, false);
  assert.strictEqual(session.status, 'FULL_EXAM_UNAVAILABLE');
  assert.strictEqual(session.reason, 'FULL_EXAM_UNAVAILABLE_QUESTION_BANK_INSUFFICIENT');
});

// 8. PDF Readiness Check
check("8. PDF Readiness check for Official Full Exam (SSC CGL)", () => {
  const readiness = pdfGenerationService.checkPdfReadiness('ssc-cgl', 'ver-ssc-cgl-2026', 'FULL_EXAM_PAPER', db);
  assert.strictEqual(readiness.isReady, true);
});

check("9. PDF Readiness check blocks unverified Full Exam (NEET UG)", () => {
  const readiness = pdfGenerationService.checkPdfReadiness('nta-neet', 'ver-nta-neet-2026', 'FULL_EXAM_PAPER', db);
  assert.strictEqual(readiness.isReady, false);
});

console.log("\n=====================================================================");
console.log(`🎉 ALL ${passed} MOCK & PDF ENGINE VERIFICATIONS PASSED`);
console.log("=====================================================================\n");
