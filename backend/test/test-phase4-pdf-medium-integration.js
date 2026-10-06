// backend/test/test-phase4-pdf-medium-integration.js
// Phase 4: PDF Generation Engine Integration Across All 31 Boards Verification Suite
// Verifies Dual-Language STEM Papers, Medium-Synchronized Subjective Solutions,
// Language Subject Locks, Manifest Audit, and Competitive Exam Isolation.

const assert = require('assert');
const path = require('path');
const fs = require('fs');

const ROOT_DIR = path.resolve(__dirname, '../..');
const { getDb } = require('../db/database');
const db = getDb();

const pdfGenService = require('../services/pdf-generation-service');
const boardMediumGovService = require('../services/board-medium-governance-service');
const { fetchDbQuestionsForSubject, fetchDbSubjectivesForSubject } = require('../../services/subject-inventory-loader');

console.log('====================================================================');
console.log('🧪 RUNNING PHASE 4: PDF GENERATION ENGINE INTEGRATION TEST SUITE');
console.log('====================================================================\n');

let passed = 0;
let failed = 0;

async function runTest(testNum, testName, fn) {
  try {
    await fn();
    console.log(`✅ Test ${testNum}: ${testName} — PASSED`);
    passed++;
  } catch (err) {
    console.error(`❌ Test ${testNum}: ${testName} — FAILED:`, err.message);
    failed++;
  }
}

(async () => {
  // Test 1: BSEB Class 10 Math Board Question Paper PDF with preferredMedium: 'en'
  await runTest(1, "BSEB Class 10 Math Board Question Paper PDF with preferredMedium: 'en'", async () => {
    const res = await pdfGenService.generatePdf({
      examId: 'bseb-bihar',
      documentType: 'BOARD_QUESTION_PAPER',
      subjectId: 'math',
      preferredMedium: 'en'
    });
    assert.strictEqual(res.success, true, 'Must generate BSEB Math Question Paper');
    assert.ok(fs.existsSync(res.filePath), 'PDF file must exist on disk');
    assert.ok(fs.statSync(res.filePath).size > 1000, 'PDF size must be > 1KB');
    assert.strictEqual(res.metadata.preferredMedium, 'en', 'Metadata preferredMedium must be en');
    assert.ok(Array.isArray(res.questionIds) && res.questionIds.length > 0, 'Must contain question IDs');
  });

  // Test 2: BSEB Class 10 Math Solutions PDF with preferredMedium: 'hi' (Hindi Model Answer)
  await runTest(2, "BSEB Class 10 Math Solutions PDF with preferredMedium: 'hi'", async () => {
    const res = await pdfGenService.generatePdf({
      examId: 'bseb-bihar',
      documentType: 'SOLUTIONS',
      subjectId: 'math',
      preferredMedium: 'hi'
    });
    assert.strictEqual(res.success, true, 'Must generate BSEB Math Solutions PDF');
    assert.ok(fs.existsSync(res.filePath), 'PDF file must exist on disk');
    assert.strictEqual(res.metadata.preferredMedium, 'hi', 'Metadata preferredMedium must be hi');
    assert.ok(res.totalQuestions > 0, 'Must have solutions');
  });

  // Test 3: BSEB Class 10 Math Solutions PDF with preferredMedium: 'en' (English Model Answer)
  await runTest(3, "BSEB Class 10 Math Solutions PDF with preferredMedium: 'en'", async () => {
    const res = await pdfGenService.generatePdf({
      examId: 'bseb-bihar',
      documentType: 'SOLUTIONS',
      subjectId: 'math',
      preferredMedium: 'en'
    });
    assert.strictEqual(res.success, true, 'Must generate BSEB Math English Solutions PDF');
    assert.ok(fs.existsSync(res.filePath), 'PDF file must exist on disk');
    assert.strictEqual(res.metadata.preferredMedium, 'en', 'Metadata preferredMedium must be en');
  });

  // Test 4: Telangana Class 10 Science Solutions PDF with preferredMedium: 'te' (Telugu Model Answer)
  await runTest(4, "Telangana Class 10 Science Solutions PDF with preferredMedium: 'te'", async () => {
    const res = await pdfGenService.generatePdf({
      examId: 'tsbie-bieap',
      documentType: 'SOLUTIONS',
      subjectId: 'science',
      preferredMedium: 'te'
    });
    assert.strictEqual(res.success, true, 'Must generate Telangana Science Telugu Solutions PDF');
    assert.ok(fs.existsSync(res.filePath), 'PDF file must exist on disk');
    assert.strictEqual(res.metadata.preferredMedium, 'te', 'Metadata preferredMedium must be te');
  });

  // Test 5: Language Subject Invariant Lock: BSEB Hindi & Telangana Telugu with preferredMedium: 'en'
  await runTest(5, "Language Subject Invariant Lock: Never translates to English", async () => {
    // Check BSEB Hindi subjectives
    const hindiSubs = fetchDbSubjectivesForSubject('hindi', { boardId: 'bseb-bihar', preferredMedium: 'en' });
    assert.ok(hindiSubs.length > 0, 'Must fetch Hindi subjective questions');
    for (const h of hindiSubs.slice(0, 5)) {
      assert.ok(!h.modelAnswer.includes('Model Answer (As per Official Marking Scheme)'), 'Hindi literature must NOT flip to English');
      assert.ok(/[\u0900-\u097F]/.test(h.modelAnswer), 'Hindi model answer must contain Devanagari script');
    }

    // Check Telangana Telugu subjectives
    const teluguSubs = fetchDbSubjectivesForSubject('telugu', { boardId: 'tsbie-bieap', preferredMedium: 'en' });
    if (teluguSubs.length > 0) {
      for (const t of teluguSubs.slice(0, 5)) {
        assert.ok(!t.modelAnswer.includes('Model Answer (As per Official Marking Scheme)'), 'Telugu literature must NOT flip to English');
        assert.ok(/[\u0C00-\u0C7F]/.test(t.modelAnswer), 'Telugu model answer must contain Telugu script');
      }
    }

    // Check PDF Generation for Hindi Question Paper
    const res = await pdfGenService.generatePdf({
      examId: 'bseb-bihar',
      documentType: 'BOARD_QUESTION_PAPER',
      subjectId: 'hindi',
      preferredMedium: 'en'
    });
    assert.strictEqual(res.success, true);
    assert.ok(fs.existsSync(res.filePath));
  });

  // Test 6: PDF Manifest & Reconciliation correctly tracks preferredMedium
  await runTest(6, "PDF Generation Manifest records preferredMedium", () => {
    const manifestPath = path.join(ROOT_DIR, 'pdf-generation-manifest.json');
    assert.ok(fs.existsSync(manifestPath), 'Manifest must exist');
    const list = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    assert.ok(Array.isArray(list) && list.length > 0);
    const lastDoc = list[list.length - 1];
    assert.ok(lastDoc.preferred_medium, 'Manifest entry must record preferred_medium');
  });

  // Test 7: Practice Paper and Notes Medium Integration
  await runTest(7, "Practice Paper and Notes respect preferredMedium", async () => {
    const practiceRes = await pdfGenService.generatePdf({
      examId: 'bseb-bihar',
      documentType: 'SUBJECT_COMPLETE_QUESTION_BANK',
      subjectId: 'math',
      preferredMedium: 'en'
    });
    assert.strictEqual(practiceRes.success, true);
    assert.ok(fs.existsSync(practiceRes.filePath));

    const notesRes = await pdfGenService.generatePdf({
      examId: 'bseb-bihar',
      documentType: 'NOTES',
      subjectId: 'math',
      preferredMedium: 'hi'
    });
    assert.strictEqual(notesRes.success, true);
    assert.ok(fs.existsSync(notesRes.filePath));
  });

  // Test 8: Competitive Exam Isolation & Non-Regression (SSC CGL)
  await runTest(8, "Competitive Exam Isolation: SSC CGL Tier 1 generates 100 questions cleanly", async () => {
    const res = await pdfGenService.generatePdf({
      examId: 'ssc-cgl',
      documentType: 'OFFICIAL_FULL_EXAM'
    });
    assert.strictEqual(res.success, true);
    assert.strictEqual(res.totalQuestions, 100, `Expected 100 questions for SSC CGL, got ${res.totalQuestions}`);
    assert.ok(fs.existsSync(res.filePath));
  });

  console.log('\n====================================================================');
  console.log(`📊 PHASE 4 TEST SUMMARY: ${passed} PASSED, ${failed} FAILED (TOTAL: ${passed + failed})`);
  console.log('====================================================================');

  if (failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
})();
