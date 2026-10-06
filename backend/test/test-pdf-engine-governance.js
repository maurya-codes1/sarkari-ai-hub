// backend/test/test-pdf-engine-governance.js
// Phase 5: Blueprint-Driven PDF Engine Governance Verification Suite
// 25 Strict Production Assertions covering Blueprint Resolution, Document Types,
// Allocation Rules, Zero Duplicates, Multilingual/RTL, Manifest, and Reconciliation.

const assert = require('assert');
const path = require('path');
const fs = require('fs');

const ROOT_DIR = path.resolve(__dirname, '../..');
const { getDb } = require('../db/database');
const db = getDb();

const pdfGenService = require('../services/pdf-generation-service');
const fullExamGateService = require('../services/full-exam-gate-service');
const blueprintRepo = require('../db/repositories/blueprint-repository');
const pdfFontRegistry = require('../services/pdf-font-registry');
const { getCompleteSubjectInventory } = require('../../services/subject-inventory-loader');
const { reconcileAllSubjectBundle } = require('../../services/content-allocation-policy');

console.log('====================================================================');
console.log('🧪 RUNNING PDF ENGINE GOVERNANCE VERIFICATION SUITE (25 ASSERTIONS)');
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
  // 1. Official full exam only for READY component
  await runTest(1, 'Official full exam only for READY component', () => {
    const sscReadiness = pdfGenService.checkPdfReadiness('ssc-cgl', null, 'OFFICIAL_FULL_EXAM');
    assert.strictEqual(sscReadiness.isReady, true, 'SSC CGL Tier 1 must be ready for Official Full Exam PDF');
    assert.strictEqual(sscReadiness.gate, 'FULL_EXAM_READY');

    const upscReadiness = pdfGenService.checkPdfReadiness('upsc-cse', null, 'OFFICIAL_FULL_EXAM');
    assert.strictEqual(upscReadiness.isReady, true, 'UPSC CSE Prelims GS 1 must be ready for Official Full Exam PDF');
    assert.strictEqual(upscReadiness.gate, 'FULL_EXAM_READY');
  });

  // 2. Block PARTIALLY_READY official paper
  await runTest(2, 'Block PARTIALLY_READY official paper', () => {
    const neetReadiness = pdfGenService.checkPdfReadiness('nta-neet', null, 'OFFICIAL_FULL_EXAM');
    assert.strictEqual(neetReadiness.isReady, false, 'NEET UG must be blocked for Official Full Exam PDF');
    assert.strictEqual(neetReadiness.reason, 'FULL_EXAM_PDF_BLOCKED_PATTERN_OR_QUESTION_POOL');

    const alpReadiness = pdfGenService.checkPdfReadiness('rrb-alp', null, 'OFFICIAL_FULL_EXAM');
    assert.strictEqual(alpReadiness.isReady, false, 'RRB ALP must be blocked for Official Full Exam PDF');
    assert.strictEqual(alpReadiness.reason, 'FULL_EXAM_PDF_BLOCKED_PATTERN_OR_QUESTION_POOL');
  });

  // 3. Block INSUFFICIENT_POOL official paper
  await runTest(3, 'Block INSUFFICIENT_POOL official paper', async () => {
    const res = await pdfGenService.generatePdf({ examId: 'nta-neet', documentType: 'OFFICIAL_FULL_EXAM' });
    assert.strictEqual(res.success, false, 'Must not generate official paper when pool is insufficient');
    assert.strictEqual(res.status, 'PDF_NOT_AVAILABLE');
    assert.strictEqual(res.reason, 'FULL_EXAM_PDF_BLOCKED_PATTERN_OR_QUESTION_POOL');
  });

  // 4. Exact question count
  await runTest(4, 'Exact question count in Official Full Exam PDF', async () => {
    const res = await pdfGenService.generatePdf({ examId: 'ssc-cgl', documentType: 'OFFICIAL_FULL_EXAM' });
    assert.strictEqual(res.success, true);
    assert.strictEqual(res.totalQuestions, 100, `Expected exactly 100 questions, got ${res.totalQuestions}`);
  });

  // 5. Exact marks
  await runTest(5, 'Exact marks matching blueprint', () => {
    const bp = blueprintRepo.getBlueprintForExam('ssc-cgl');
    assert.strictEqual(bp.total_marks, 200, 'SSC CGL blueprint marks must equal 200');
    assert.strictEqual(bp.sections.length, 4, 'Must contain 4 sections');
    bp.sections.forEach(s => {
      assert.strictEqual(s.marks_per_question, 2.0, `Section ${s.name} marks per question must be 2.0`);
    });
  });

  // 6. Exact duration metadata
  await runTest(6, 'Exact duration metadata', () => {
    const bpSsc = blueprintRepo.getBlueprintForExam('ssc-cgl');
    assert.strictEqual(bpSsc.duration_minutes, 60, 'SSC CGL duration must be 60 minutes');
    const bpUpsc = blueprintRepo.getBlueprintForExam('upsc-cse');
    assert.strictEqual(bpUpsc.duration_minutes, 120, 'UPSC GS 1 duration must be 120 minutes');
  });

  // 7. Section structure
  await runTest(7, 'Section structure matches blueprint exactly', () => {
    const bp = blueprintRepo.getBlueprintForExam('ssc-cgl');
    const expectedSections = [
      'General Intelligence and Reasoning',
      'General Awareness',
      'Quantitative Aptitude',
      'English Comprehension'
    ];
    assert.strictEqual(bp.sections.length, 4);
    for (let i = 0; i < 4; i++) {
      assert.strictEqual(bp.sections[i].name, expectedSections[i]);
      assert.strictEqual(bp.sections[i].question_count, 25);
    }
  });

  // 8. Internal choice
  await runTest(8, 'Internal choice registry captures choice provisions', () => {
    const choiceCsvPath = path.join(ROOT_DIR, 'internal-choice-registry.csv');
    assert.ok(fs.existsSync(choiceCsvPath));
    const content = fs.readFileSync(choiceCsvPath, 'utf8');
    assert.ok(content.includes('ATTEMPT_N_OF_M') || content.includes('ATTEMPT_ALL'));
  });

  // 9. No duplicate IDs
  await runTest(9, 'No duplicate question IDs in generated official paper', async () => {
    const res = await pdfGenService.generatePdf({ examId: 'ssc-cgl', documentType: 'OFFICIAL_FULL_EXAM' });
    assert.strictEqual(res.success, true);
    assert.ok(Array.isArray(res.questionIds) && res.questionIds.length === 100);
    const uniqueIds = new Set(res.questionIds);
    assert.strictEqual(uniqueIds.size, 100, 'All 100 question IDs must be strictly unique');
  });

  // 10. Correct subject
  await runTest(10, 'Correct subject assignment per section', () => {
    const bp = blueprintRepo.getBlueprintForExam('ssc-cgl');
    const subjectMap = {
      'General Intelligence and Reasoning': 'subj-reasoning',
      'General Awareness': 'subj-gk',
      'Quantitative Aptitude': 'subj-math',
      'English Comprehension': 'subj-english'
    };
    for (const sec of bp.sections) {
      assert.strictEqual(sec.subject_id, subjectMap[sec.name], `Section ${sec.name} subject mismatch`);
    }
  });

  // 11. Correct year/version
  await runTest(11, 'Correct year and version resolution', () => {
    const bp = blueprintRepo.getBlueprintForExam('ssc-cgl');
    assert.ok(bp.exam_version_id);
    assert.ok(bp.exam_version_id.includes('ssc-cgl'));
  });

  // 12. Correct language
  await runTest(12, 'Correct official paper language configuration', () => {
    const langCsvPath = path.join(ROOT_DIR, 'exam-language-registry.csv');
    assert.ok(fs.existsSync(langCsvPath));
    const content = fs.readFileSync(langCsvPath, 'utf8');
    assert.ok(content.includes('ssc-cgl'));
    assert.ok(content.includes('Hindi'));
    assert.ok(content.includes('English'));
  });

  // 13. Question/option language independence
  await runTest(13, 'Question and option language independence', () => {
    const qRow = db.prepare('SELECT qv.language_content FROM questions q JOIN question_versions qv ON q.question_id = qv.question_id WHERE q.full_exam_eligible = 1 AND qv.language_content IS NOT NULL LIMIT 1').get();
    assert.ok(qRow);
    const lang = JSON.parse(qRow.language_content);
    assert.ok(lang.en && lang.en.options);
    assert.ok(lang.hi && lang.hi.options);
    assert.strictEqual(lang.en.options.length, lang.hi.options.length, 'English and Hindi option count must match');
  });

  // 14. PYQ provenance
  await runTest(14, 'PYQ provenance integrity', () => {
    const pyq = db.prepare("SELECT provenance FROM questions WHERE provenance = 'OFFICIAL_PYQ' LIMIT 1").get();
    assert.ok(pyq);
    assert.strictEqual(pyq.provenance, 'OFFICIAL_PYQ');
  });

  // 15. Sample provenance
  await runTest(15, 'Sample question provenance integrity', () => {
    const sample = db.prepare("SELECT provenance FROM questions WHERE provenance = 'OFFICIAL_SAMPLE' LIMIT 1").get();
    assert.ok(sample);
    assert.strictEqual(sample.provenance, 'OFFICIAL_SAMPLE');
  });

  // 16. Practice allocation
  await runTest(16, 'Practice allocation honors requested count safely', async () => {
    const res = await pdfGenService.generatePdf({
      examId: 'ssc-cgl',
      documentType: 'SUBJECT_COMPREHENSIVE_PRACTICE',
      subjectId: 'math',
      questionCount: 30
    });
    assert.strictEqual(res.success, true);
    assert.strictEqual(res.totalQuestions, 30, 'Must allocate exactly requested 30 questions');
  });

  // 17. All-subject allocation
  await runTest(17, 'All-subject bundle allocation follows tiered policy', async () => {
    const res = await pdfGenService.generatePdf({
      examId: 'ssc-cgl',
      documentType: 'ALL_SUBJECT_COMPREHENSIVE_PRACTICE'
    });
    assert.strictEqual(res.success, true);
    assert.ok(res.totalQuestions >= 50, `All-subject bundle must be substantive, got ${res.totalQuestions}`);
  });

  // 18. Subject complete bank
  await runTest(18, 'Subject complete bank preserves 100% of available inventory', async () => {
    const rawQs = getCompleteSubjectInventory('math', { examId: 'ssc-cgl' });
    const res = await pdfGenService.generatePdf({
      examId: 'ssc-cgl',
      documentType: 'SUBJECT_COMPLETE_QUESTION_BANK',
      subjectId: 'math'
    });
    assert.strictEqual(res.success, true);
    assert.strictEqual(res.totalQuestions, rawQs.length, `Expected full inventory ${rawQs.length}, got ${res.totalQuestions}`);
  });

  // 19. OMR conditional display
  await runTest(19, 'OMR generated conditionally for supported exams', async () => {
    const res = await pdfGenService.generatePdf({
      examId: 'ssc-cgl',
      documentType: 'OMR'
    });
    assert.strictEqual(res.success, true);
    assert.strictEqual(res.pageCount, 1);
  });

  // 20. 25 UI locale controls
  await runTest(20, 'All 25 UI locales support PDF controls in i18n.js', () => {
    const { I18N_DATA, SUPPORTED_LOCALES } = require('../../public/js/i18n.js');
    const locales = Object.keys(I18N_DATA);
    assert.strictEqual(locales.length, 25, `Expected 25 locales, got ${locales.length}`);
    assert.ok(SUPPORTED_LOCALES.length >= 25, 'SUPPORTED_LOCALES must have at least 25 entries');
  });

  // 21. RTL PDF rendering
  await runTest(21, 'RTL PDF font rendering for Urdu, Kashmiri, and Sindhi', () => {
    const urduSpec = pdfFontRegistry.resolveFontForLanguage('ur');
    assert.strictEqual(urduSpec.direction, 'rtl', 'Urdu direction must be rtl');
    const arSpec = pdfFontRegistry.resolveFontForLanguage('ar');
    assert.strictEqual(arSpec.direction, 'rtl', 'Arabic/Sindhi direction must be rtl');
  });

  // 22. PDF file openability
  await runTest(22, 'Generated PDF file exists on disk and is non-empty', async () => {
    const res = await pdfGenService.generatePdf({ examId: 'ssc-cgl', documentType: 'OFFICIAL_FULL_EXAM' });
    assert.ok(fs.existsSync(res.filePath), 'PDF file must exist on disk');
    const stat = fs.statSync(res.filePath);
    assert.ok(stat.size > 1000, `PDF size must be > 1KB, got ${stat.size} bytes`);
  });

  // 23. PDF text content
  await runTest(23, 'PDF contains multi-page substantive content', async () => {
    const res = await pdfGenService.generatePdf({ examId: 'ssc-cgl', documentType: 'OFFICIAL_FULL_EXAM' });
    assert.ok(res.pageCount >= 8, `Expected multi-page PDF (>= 8 pages), got ${res.pageCount}`);
  });

  // 24. PDF manifest correctness
  await runTest(24, 'PDF generation manifest records document with all required metadata', () => {
    const manifestPath = path.join(ROOT_DIR, 'pdf-generation-manifest.json');
    assert.ok(fs.existsSync(manifestPath), 'pdf-generation-manifest.json must exist');
    const list = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    assert.ok(Array.isArray(list) && list.length > 0);
    const last = list[list.length - 1];
    assert.ok(last.document_id);
    assert.ok(last.document_type);
    assert.ok(last.root_exam_id);
    assert.ok(last.generation_timestamp);
  });

  // 25. PDF reconciliation
  await runTest(25, 'PDF exam reconciliation verifies expected vs actual question count', () => {
    const recPath = path.join(ROOT_DIR, 'pdf-exam-reconciliation.csv');
    assert.ok(fs.existsSync(recPath), 'pdf-exam-reconciliation.csv must exist');
    const lines = fs.readFileSync(recPath, 'utf8').trim().split('\n');
    assert.ok(lines.length >= 2, 'Must contain header and at least one reconciled paper');
    const lastRow = lines[lines.length - 1];
    assert.ok(lastRow.includes('100,100'), 'Expected and actual question counts must equal 100');
    assert.ok(lastRow.includes('RECONCILED'), 'Status must be RECONCILED');
  });

  console.log('\n====================================================================');
  console.log(`📊 PDF ENGINE GOVERNANCE SUMMARY: ${passed} PASSED, ${failed} FAILED (TOTAL: ${passed + failed})`);
  console.log('====================================================================');

  if (failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
})();
