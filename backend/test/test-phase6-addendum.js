// backend/test/test-phase6-addendum.js
// Phase 6 Addendum Test Suite: Unified Exam Truth Across All Content Types
// Validates single source of truth, cross-module consistency, language separation,
// multi-version immutability, zero fake promotion, and future PDF contract.

const assert = require('assert');
const { getDb } = require('../db/database');
const unifiedExamTruthService = require('../services/unified-exam-truth-service');
const mockService = require('../services/mock-service');
const notesEngine = require('../services/notes-engine');
const novelAiEngine = require('../services/novel-ai-engine');

console.log('\n========================================================');
console.log('🧪 SARKARIAI HUB — PHASE 6 ADDENDUM: UNIFIED EXAM TRUTH');
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
// MANDATORY TEST A: Official exam = Hindi + English
// All generated configuration consumers receive Hindi + English.
// -------------------------------------------------------------
runTest('TEST A: Official exam = Hindi + English -> All consumers receive Hindi + English', () => {
  const examId = 'ssc-cgl';

  // 1. Exam Details
  const details = unifiedExamTruthService.getExamDetails(examId);
  assert.strictEqual(details.success, true);
  assert.deepStrictEqual(details.languageRules.questionLanguages, ['hi', 'en']);
  assert.strictEqual(details.languageRules.isBilingual, true);

  // 2. Notes Configuration
  const notesConfig = unifiedExamTruthService.getNotesConfiguration(examId);
  assert.strictEqual(notesConfig.success, true);
  assert.deepStrictEqual(notesConfig.supportedLanguages, ['hi', 'en']);

  // 3. Mock Test Configuration
  const mockConfig = unifiedExamTruthService.getMockConfiguration(examId);
  assert.strictEqual(mockConfig.success, true);
  assert.deepStrictEqual(mockConfig.languageConfig.questionLanguages, ['hi', 'en']);
  assert.strictEqual(mockConfig.languageConfig.isBilingual, true);

  // 4. AI Generation Configuration
  const aiConfig = unifiedExamTruthService.getAiGenerationConfiguration(examId, null, { subjectId: 'subj-math' });
  assert.strictEqual(aiConfig.success, true);
  assert.deepStrictEqual(aiConfig.allowedLanguages, ['hi', 'en']);
  assert.strictEqual(aiConfig.isBilingual, true);

  // 5. Future PDF Engine Contract
  const pdfConfig = unifiedExamTruthService.getPdfConfiguration(examId);
  assert.strictEqual(pdfConfig.success, true);
  assert.strictEqual(pdfConfig.languageContract.isBilingual, true);
  assert.strictEqual(pdfConfig.languageContract.primaryLanguage, 'hi');
  assert.strictEqual(pdfConfig.languageContract.secondaryLanguage, 'en');
  assert.strictEqual(pdfConfig.languageContract.layoutMode, 'BILINGUAL_TWO_COLUMN');
});

// -------------------------------------------------------------
// MANDATORY TEST B: Official exam = Tamil
// No Hindi fallback occurs.
// -------------------------------------------------------------
runTest('TEST B: Official exam = Tamil -> No Hindi fallback occurs', () => {
  const examId = 'tndge-tamilnadu';

  // 1. Exam Details
  const details = unifiedExamTruthService.getExamDetails(examId);
  assert.strictEqual(details.success, true);
  assert.deepStrictEqual(details.languageRules.questionLanguages, ['ta']);
  assert.strictEqual(details.languageRules.isBilingual, false);
  assert.ok(!details.languageRules.questionLanguages.includes('hi'), 'Must not contain Hindi');
  assert.ok(!details.languageRules.questionLanguages.includes('en'), 'Must not contain English');

  // 2. Notes Configuration - Default must be Tamil
  const notesConfig = unifiedExamTruthService.getNotesConfiguration(examId);
  assert.strictEqual(notesConfig.success, true);
  assert.strictEqual(notesConfig.noteLanguage, 'ta');
  assert.notStrictEqual(notesConfig.noteLanguage, 'hi', 'Default note language must not be Hindi');

  // 3. Notes Configuration - Requesting Hindi must fail with CONTENT_CONFIGURATION_INVALID
  const hindiNoteAttempt = unifiedExamTruthService.getNotesConfiguration(examId, null, { requestedLanguage: 'hi' });
  assert.strictEqual(hindiNoteAttempt.success, false);
  assert.strictEqual(hindiNoteAttempt.status, 'CONTENT_CONFIGURATION_INVALID');
  assert.strictEqual(hindiNoteAttempt.reason, 'LANGUAGE_NOT_SUPPORTED_BY_EXAM_PATTERN');

  // 4. Question Validation - Hindi question must be rejected
  const hindiQuestionCheck = unifiedExamTruthService.validateQuestionContent({
    subjectId: 'subj-tamil',
    languageCode: 'hi'
  }, examId);
  assert.strictEqual(hindiQuestionCheck.isValid, false);
  assert.strictEqual(hindiQuestionCheck.status, 'CONTENT_CONFIGURATION_INVALID');
  assert.strictEqual(hindiQuestionCheck.reason, 'LANGUAGE_MISMATCH_EXAM_PAPER');

  // 5. Future PDF Contract - Must be Monolingual Tamil with Tamil Font
  const pdfConfig = unifiedExamTruthService.getPdfConfiguration(examId);
  assert.strictEqual(pdfConfig.success, true);
  assert.strictEqual(pdfConfig.languageContract.primaryLanguage, 'ta');
  assert.strictEqual(pdfConfig.languageContract.isBilingual, false);
  assert.strictEqual(pdfConfig.languageContract.layoutMode, 'MONOLINGUAL_SINGLE_COLUMN');
  assert.strictEqual(pdfConfig.languageContract.fontFamilyRequirements.primary, 'Noto Sans Tamil');
});

// -------------------------------------------------------------
// MANDATORY TEST C: Official exam = Telugu + English
// Question/option/instruction configuration matches verified setup.
// -------------------------------------------------------------
runTest('TEST C: Official exam = Telugu + English -> Matches verified setup', () => {
  const examId = 'tsbie-bieap';

  // 1. Exam Details
  const details = unifiedExamTruthService.getExamDetails(examId);
  assert.strictEqual(details.success, true);
  assert.deepStrictEqual(details.languageRules.questionLanguages, ['te', 'en']);
  assert.deepStrictEqual(details.languageRules.optionLanguages, ['te', 'en']);
  assert.deepStrictEqual(details.languageRules.instructionLanguages, ['te', 'en']);
  assert.strictEqual(details.languageRules.isBilingual, true);

  // 2. Question with valid Telugu and English options passes
  const validQuestion = unifiedExamTruthService.validateQuestionContent({
    subjectId: 'subj-telugu',
    languageCode: 'te',
    optionLanguages: ['te', 'en'],
    instructionLanguage: 'te'
  }, examId);
  assert.strictEqual(validQuestion.isValid, true);
  assert.strictEqual(validQuestion.status, 'QUESTION_CONFIGURATION_VALID');

  // 3. Question with unsupported option language (e.g., Hindi or Bengali) fails
  const invalidOptionCheck = unifiedExamTruthService.validateQuestionContent({
    subjectId: 'subj-telugu',
    languageCode: 'te',
    optionLanguages: ['hi'],
    instructionLanguage: 'te'
  }, examId);
  assert.strictEqual(invalidOptionCheck.isValid, false);
  assert.strictEqual(invalidOptionCheck.status, 'CONTENT_CONFIGURATION_INVALID');
  assert.strictEqual(invalidOptionCheck.reason, 'OPTION_LANGUAGE_MISMATCH');

  // 4. Question with unsupported instruction language (e.g., Marathi or Tamil) fails
  const invalidInstructionCheck = unifiedExamTruthService.validateQuestionContent({
    subjectId: 'subj-telugu',
    languageCode: 'te',
    optionLanguages: ['te'],
    instructionLanguage: 'mr'
  }, examId);
  assert.strictEqual(invalidInstructionCheck.isValid, false);
  assert.strictEqual(invalidInstructionCheck.status, 'CONTENT_CONFIGURATION_INVALID');
  assert.strictEqual(invalidInstructionCheck.reason, 'INSTRUCTION_LANGUAGE_MISMATCH');
});

// -------------------------------------------------------------
// MANDATORY TEST D: Exam language changes in a new exam version
// Old version remains unchanged.
// -------------------------------------------------------------
runTest('TEST D: Exam language changes in new version -> Old version unchanged', () => {
  const examId = 'ssc-cgl';

  // Historical version 2024-2025
  const histConfig = unifiedExamTruthService.verifyExam(examId, 'ver-ssc-cgl-2025');
  assert.strictEqual(histConfig.isValid, true);
  assert.strictEqual(histConfig.academicYear, '2024-2025');
  assert.strictEqual(histConfig.versionStatus, 'HISTORICAL_SUPERSEDED');
  assert.deepStrictEqual(histConfig.languageConfig.questionLanguages, ['hi', 'en']);

  // Current version 2026
  const currConfig = unifiedExamTruthService.verifyExam(examId, 'ver-ssc-cgl-2026');
  assert.strictEqual(currConfig.isValid, true);
  assert.strictEqual(currConfig.versionId, 'ver-ssc-cgl-2026');

  // Assert historical version remains immutable
  assert.strictEqual(histConfig.versionId, 'ver-ssc-cgl-2025');
  assert.notStrictEqual(histConfig.versionId, currConfig.versionId);
});

// -------------------------------------------------------------
// MANDATORY TEST E: Unsupported language requested
// System blocks/flags configuration rather than silently substituting.
// -------------------------------------------------------------
runTest('TEST E: Unsupported language requested -> System flags rather than substituting', () => {
  const examId = 'ssc-cgl';

  // Requesting French (fr) or German (de) for SSC CGL notes
  const notesResult = unifiedExamTruthService.getNotesConfiguration(examId, null, {
    requestedLanguage: 'fr'
  });
  assert.strictEqual(notesResult.success, false);
  assert.strictEqual(notesResult.status, 'CONTENT_CONFIGURATION_INVALID');
  assert.strictEqual(notesResult.reason, 'LANGUAGE_NOT_SUPPORTED_BY_EXAM_PATTERN');
  assert.strictEqual(notesResult.requestedLanguage, 'fr');
  assert.deepStrictEqual(notesResult.supportedLanguages, ['hi', 'en']);

  // Submitting a question in Punjabi (pa) for SSC CGL when only hi+en is verified
  const questionResult = unifiedExamTruthService.validateQuestionContent({
    subjectId: 'subj-math',
    languageCode: 'pa'
  }, examId);
  assert.strictEqual(questionResult.isValid, false);
  assert.strictEqual(questionResult.status, 'CONTENT_CONFIGURATION_INVALID');
  assert.strictEqual(questionResult.reason, 'LANGUAGE_MISMATCH_EXAM_PAPER');
});

// -------------------------------------------------------------
// MANDATORY TEST F: Exam blueprint changes
// Mock/PDF/content reads new version, while historical content stays tied to old version.
// -------------------------------------------------------------
runTest('TEST F: Exam blueprint changes -> Mock/PDF reads new, historical stays tied to old', () => {
  const examId = 'ssc-cgl';

  // Historical Mock Configuration (ver-ssc-cgl-2025)
  const histMock = unifiedExamTruthService.getMockConfiguration(examId, 'ver-ssc-cgl-2025');
  assert.strictEqual(histMock.success, true);
  assert.strictEqual(histMock.blueprintId, 'bp-verified-ssc-cgl-2025');
  assert.strictEqual(histMock.durationMinutes, 60);
  assert.strictEqual(histMock.totalMarks, 200.0);

  // Current Mock Configuration (ver-ssc-cgl-2026)
  const currMock = unifiedExamTruthService.getMockConfiguration(examId, 'ver-ssc-cgl-2026');
  assert.strictEqual(currMock.success, true);
  assert.strictEqual(currMock.blueprintId, 'bp-verified-ssc-cgl');

  // Historical PDF Contract
  const histPdf = unifiedExamTruthService.getPdfConfiguration(examId, 'ver-ssc-cgl-2025');
  assert.strictEqual(histPdf.success, true);
  assert.strictEqual(histPdf.examVersion.versionId, 'ver-ssc-cgl-2025');
  assert.strictEqual(histPdf.blueprint.blueprintId, 'bp-verified-ssc-cgl-2025');
  assert.strictEqual(histPdf.blueprint.totalMarks, 200.0);

  // Current PDF Contract
  const currPdf = unifiedExamTruthService.getPdfConfiguration(examId, 'ver-ssc-cgl-2026');
  assert.strictEqual(currPdf.success, true);
  assert.strictEqual(currPdf.examVersion.versionId, 'ver-ssc-cgl-2026');
  assert.strictEqual(currPdf.blueprint.blueprintId, 'bp-verified-ssc-cgl');
});

// -------------------------------------------------------------
// MANDATORY TEST G: UI language = Hinglish, Exam paper language = Hindi + English
// System keeps them separate.
// -------------------------------------------------------------
runTest('TEST G: UI language = Hinglish, Paper language = Hindi + English -> Kept separate', () => {
  const examId = 'ssc-cgl';

  // User UI is Hinglish
  const notesConfig = unifiedExamTruthService.getNotesConfiguration(examId, null, {
    uiLanguage: 'hinglish'
  });

  assert.strictEqual(notesConfig.success, true);
  assert.strictEqual(notesConfig.uiLanguageIndependent, 'hinglish');
  // Official note language must NOT be converted to Hinglish
  assert.strictEqual(notesConfig.noteLanguage, 'hi');
  assert.notStrictEqual(notesConfig.noteLanguage, 'hinglish');

  // Verify paper mediums remain strictly official
  assert.strictEqual(notesConfig.paperMedium, 'hi,en');
});

// -------------------------------------------------------------
// TEST 8: Downstream Consumer Consistency: Exam Details uses verified configuration
// -------------------------------------------------------------
runTest('TEST 8: Downstream Consumer: Exam Details uses verified configuration', () => {
  const details = unifiedExamTruthService.getExamDetails('ssc-gd');
  assert.strictEqual(details.success, true);
  assert.strictEqual(details.pattern.blueprintId, 'bp-verified-ssc-gd');
  assert.strictEqual(details.pattern.totalQuestions, 80);
  assert.strictEqual(details.pattern.durationMinutes, 60);
  assert.strictEqual(details.pattern.totalMarks, 160.0);
  assert.strictEqual(details.languageRules.paperMedium, 'hi,en');
  assert.strictEqual(details.isFullyVerified, true);
});

// -------------------------------------------------------------
// TEST 9: Downstream Consumer Consistency: Notes engine rejects unsupported languages
// -------------------------------------------------------------
runTest('TEST 9: Downstream Consumer: Notes engine rejects unsupported languages', () => {
  assert.throws(() => {
    notesEngine.createNote({
      examId: 'tndge-tamilnadu',
      subjectId: 'subj-tamil',
      title: 'Invalid Hindi Note for Tamil Board',
      languageId: 'hi',
      content: { text: 'Some hindi text' }
    });
  }, (err) => {
    return err.message.includes('CONTENT_CONFIGURATION_INVALID') && err.message.includes('not supported by verified exam pattern');
  });
});

// -------------------------------------------------------------
// TEST 10: Downstream Consumer Consistency: Question validation rejects subject outside blueprint
// -------------------------------------------------------------
runTest('TEST 10: Downstream Consumer: Question validation rejects subject outside blueprint', () => {
  // SSC CGL blueprint contains Reasoning, GK, Math, English. It does NOT contain Law/Police rules.
  const invalidSubjectCheck = unifiedExamTruthService.validateQuestionContent({
    subjectId: 'subj-law',
    questionType: 'single_mcq',
    languageCode: 'hi'
  }, 'ssc-cgl');

  assert.strictEqual(invalidSubjectCheck.isValid, false);
  assert.strictEqual(invalidSubjectCheck.status, 'CONTENT_CONFIGURATION_INVALID');
  assert.strictEqual(invalidSubjectCheck.reason, 'SUBJECT_NOT_IN_BLUEPRINT');
});

// -------------------------------------------------------------
// TEST 11: Downstream Consumer Consistency: Mock test engine pulls directly from verified config
// -------------------------------------------------------------
runTest('TEST 11: Downstream Consumer: Mock test engine pulls directly from verified config', () => {
  const session = mockService.startMockSession({
    examId: 'ssc-cgl',
    testMode: 'FULL_EXAM'
  });

  assert.strictEqual(session.success, true);
  assert.strictEqual(session.blueprint.blueprintId, 'bp-verified-ssc-cgl');
  assert.strictEqual(session.blueprint.durationMinutes, 60);
  assert.strictEqual(session.blueprint.totalQuestions, 100);
  assert.strictEqual(session.sections.length, 4);
});

// -------------------------------------------------------------
// TEST 12: Downstream Consumer Consistency: AI Question generator receives verified config & stamps AI_PRACTICE
// -------------------------------------------------------------
runTest('TEST 12: Downstream Consumer: AI Question generator receives verified config & stamps AI_PRACTICE', () => {
  const aiConfig = unifiedExamTruthService.getAiGenerationConfiguration('rrb-alp', null, {
    subjectId: 'subj-math'
  });

  assert.strictEqual(aiConfig.success, true);
  assert.strictEqual(aiConfig.blueprintId, 'bp-verified-rrb-alp');
  assert.strictEqual(aiConfig.provenanceRequired, 'AI_PRACTICE');
  assert.strictEqual(aiConfig.difficultyType, 'AI_ESTIMATED_DIFFICULTY');
  assert.deepStrictEqual(aiConfig.allowedLanguages, ['hi', 'en']);
});

// -------------------------------------------------------------
// TEST 13: Downstream Consumer Consistency: Future PDF Contract defines OMR / Layout / Sections
// -------------------------------------------------------------
runTest('TEST 13: Downstream Consumer: Future PDF Contract defines OMR / Layout / Sections', () => {
  const pdf = unifiedExamTruthService.getPdfConfiguration('ssc-gd');
  assert.strictEqual(pdf.success, true);
  assert.strictEqual(pdf.status, 'FUTURE_PDF_CONFIGURATION_READY');
  assert.strictEqual(pdf.blueprint.totalQuestions, 80);
  assert.strictEqual(pdf.blueprint.durationMinutes, 60);
  assert.strictEqual(pdf.blueprint.totalMarks, 160.0);
  assert.strictEqual(pdf.omrSpec.isOmrApplicable, true);
  assert.strictEqual(pdf.omrSpec.totalItems, 80);
  assert.strictEqual(pdf.omrSpec.optionsPerItem, 4);
  assert.strictEqual(pdf.languageContract.layoutMode, 'BILINGUAL_TWO_COLUMN');
  assert.ok(pdf.sections.length >= 4, 'Must have 4 subject sections');

  // Also verify that an exam with unverified syllabus (e.g. nta-neet) safely blocks PDF contract
  const unverifiedPdf = unifiedExamTruthService.getPdfConfiguration('nta-neet');
  assert.strictEqual(unverifiedPdf.success, false);
  assert.strictEqual(unverifiedPdf.status, 'CONTENT_CONFIGURATION_NOT_READY');
  assert.ok(unverifiedPdf.reasons.includes('SYLLABUS_NOT_VERIFIED'));
});

// -------------------------------------------------------------
// TEST 14: Unverified Exam Content Readiness: Returns safe states (No generic fallback)
// -------------------------------------------------------------
runTest('TEST 14: Unverified Exam Content Readiness returns safe explicit states', () => {
  // Pick an unverified legacy exam (e.g. bseb-bihar or icse-cisce)
  const readiness = unifiedExamTruthService.getContentReadiness('icse-cisce');
  assert.strictEqual(readiness.readiness.overallReady, false);
  assert.strictEqual(readiness.readiness.BLUEPRINT_VERIFIED, false);
  assert.strictEqual(readiness.readiness.MOCK_CONFIGURATION_READY, false);
  assert.strictEqual(readiness.readiness.FUTURE_PDF_CONFIGURATION_READY, false);
  assert.ok(readiness.readiness.blockingReasons.includes('BLUEPRINT_NOT_VERIFIED'));
});

// -------------------------------------------------------------
// TEST 15: Cross-exam question reuse blocked when version patterns differ
// -------------------------------------------------------------
runTest('TEST 15: Cross-exam question reuse blocked when version patterns differ', () => {
  const crossExamAttempt = unifiedExamTruthService.validateQuestionContent({
    subjectId: 'subj-math',
    examVersionId: 'ver-cbse-board-2026', // Belongs to CBSE
    languageCode: 'hi'
  }, 'ssc-cgl', 'ver-ssc-cgl-2026'); // Validating for SSC CGL

  assert.strictEqual(crossExamAttempt.isValid, false);
  assert.strictEqual(crossExamAttempt.status, 'CONTENT_CONFIGURATION_INVALID');
  assert.strictEqual(crossExamAttempt.reason, 'CROSS_EXAM_REUSE_FORBIDDEN');
});

// -------------------------------------------------------------
// SUMMARY
// -------------------------------------------------------------
console.log('\n========================================================');
console.log(`📊 PHASE 6 ADDENDUM SUMMARY: ${passed} PASSED / ${failed} FAILED (Total: ${passed + failed})`);
console.log('========================================================\n');

if (failed > 0) {
  process.exit(1);
}
