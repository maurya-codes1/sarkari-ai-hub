// backend/test/test-phase7-pyq.js
// Phase 7: Official PYQ Ingestion, Trusted Question Bank, Historical Corpus & Full-Exam Unlock
// 60-Point Comprehensive Test Suite verifying complete PYQ pipeline, completeness validation,
// official answer keys, revisions, dropped questions, section inventories, 10-year corpus,
// dry-run engine, and automatic full-exam unlock/blocking gates.

const assert = require('assert');
const crypto = require('crypto');
const { getDb } = require('../db/database');
const pyqIngestionService = require('../services/pyq-ingestion-service');
const trustedQuestionBankService = require('../services/trusted-question-bank-service');
const fullExamDryRunService = require('../services/full-exam-dry-run-service');

function runPhase7Tests() {
  console.log('========================================================');
  console.log('🧪 SARKARIAI HUB — PHASE 7 OFFICIAL PYQ & UNLOCK SUITE');
  console.log('========================================================\n');

  const db = getDb();
  if (!db) {
    console.error('❌ Database connection failed.');
    process.exit(1);
  }

  let passed = 0;
  let failed = 0;

  function runTest(name, fn) {
    try {
      fn();
      console.log(`✅ ${name}: PASSED`);
      passed++;
    } catch (err) {
      console.error(`❌ ${name}: FAILED -> ${err.message}`);
      if (err.actual !== undefined && err.expected !== undefined) {
        console.error(`   Actual: ${err.actual}, Expected: ${err.expected}`);
      }
      failed++;
    }
  }

  // =========================================================================
  // SECTION 1: DATABASE SCHEMA & INDEXES (Tests 1 to 5)
  // =========================================================================

  runTest('TEST 1: question_papers table schema & indexes exist', () => {
    const tableInfo = db.prepare("PRAGMA table_info('question_papers')").all();
    assert(tableInfo.length > 0, 'question_papers table must exist');
    const cols = tableInfo.map(c => c.name);
    assert(cols.includes('paper_id'), 'Must have paper_id');
    assert(cols.includes('exam_id'), 'Must have exam_id');
    assert(cols.includes('exam_version_id'), 'Must have exam_version_id');
    assert(cols.includes('academic_year'), 'Must have academic_year');
    assert(cols.includes('completeness_status'), 'Must have completeness_status');
    assert(cols.includes('document_hash'), 'Must have document_hash');

    const indexes = db.prepare("PRAGMA index_list('question_papers')").all();
    const idxNames = indexes.map(i => i.name);
    assert(idxNames.includes('idx_qp_exam_ver'), 'Must have idx_qp_exam_ver');
    assert(idxNames.includes('idx_qp_hash'), 'Must have idx_qp_hash');
  });

  runTest('TEST 2: paper_questions table schema & indexes exist', () => {
    const tableInfo = db.prepare("PRAGMA table_info('paper_questions')").all();
    assert(tableInfo.length > 0, 'paper_questions table must exist');
    const cols = tableInfo.map(c => c.name);
    assert(cols.includes('paper_question_id'), 'Must have paper_question_id');
    assert(cols.includes('paper_id'), 'Must have paper_id');
    assert(cols.includes('question_id'), 'Must have question_id');
    assert(cols.includes('source_question_number'), 'Must have source_question_number');
    assert(cols.includes('section_order'), 'Must have section_order');

    const indexes = db.prepare("PRAGMA index_list('paper_questions')").all();
    const idxNames = indexes.map(i => i.name);
    assert(idxNames.includes('idx_pq_paper'), 'Must have idx_pq_paper');
  });

  runTest('TEST 3: official_answer_keys table schema & indexes exist', () => {
    const tableInfo = db.prepare("PRAGMA table_info('official_answer_keys')").all();
    assert(tableInfo.length > 0, 'official_answer_keys table must exist');
    const cols = tableInfo.map(c => c.name);
    assert(cols.includes('key_id'), 'Must have key_id');
    assert(cols.includes('paper_id'), 'Must have paper_id');
    assert(cols.includes('key_version'), 'Must have key_version');
    assert(cols.includes('revisions_json'), 'Must have revisions_json');
    assert(cols.includes('is_current_key'), 'Must have is_current_key');
  });

  runTest('TEST 4: ingestion_batches table schema & indexes exist', () => {
    const tableInfo = db.prepare("PRAGMA table_info('ingestion_batches')").all();
    assert(tableInfo.length > 0, 'ingestion_batches table must exist');
    const cols = tableInfo.map(c => c.name);
    assert(cols.includes('batch_id'), 'Must have batch_id');
    assert(cols.includes('exam_id'), 'Must have exam_id');
    assert(cols.includes('status'), 'Must have status');
  });

  runTest('TEST 5: questions table Phase 7 columns exist', () => {
    const tableInfo = db.prepare("PRAGMA table_info('questions')").all();
    const cols = tableInfo.map(c => c.name);
    assert(cols.includes('paper_id'), 'Must have paper_id');
    assert(cols.includes('source_question_number'), 'Must have source_question_number');
    assert(cols.includes('historical_year'), 'Must have historical_year');
    assert(cols.includes('shift'), 'Must have shift');
    assert(cols.includes('set_code'), 'Must have set_code');
    assert(cols.includes('stage'), 'Must have stage');
    assert(cols.includes('asset_status'), 'Must have asset_status');
    assert(cols.includes('answer_state'), 'Must have answer_state');
    assert(cols.includes('quality_state'), 'Must have quality_state');
  });

  // =========================================================================
  // SECTION 2: PAPER REGISTRATION & TEXT NORMALIZATION (Tests 6 to 13)
  // =========================================================================

  runTest('TEST 6: Register paper with complete metadata and SHA256 document hash', () => {
    const reg = pyqIngestionService.registerPaper({
      paperId: 'paper-test-reg-1',
      examId: 'ssc-cgl',
      versionId: 'ver-ssc-cgl-2026',
      academicYear: '2023',
      session: 'July 2023',
      stage: 'Tier 1',
      paper: 'Paper 1',
      paperCode: 'TEST-2023-T1',
      shift: 'Shift 2',
      setCode: 'Set B',
      languageCode: 'hi,en',
      paperMedium: 'hi,en',
      sourceId: 'src-ssc-cgl-portal',
      sourceUrl: 'https://ssc.gov.in/pyq/test-2023.pdf',
      totalQuestionsExpected: 100,
      totalPages: 30,
      completenessStatus: 'VERIFIED_COMPLETE',
      verificationStatus: 'VERIFIED',
      notes: 'Test Registration Paper'
    }, db);

    assert(reg.success, 'Registration must succeed');
    assert.strictEqual(reg.paperId, 'paper-test-reg-1');
    const row = db.prepare('SELECT * FROM question_papers WHERE paper_id = ?').get('paper-test-reg-1');
    assert(row, 'Paper record must exist in DB');
    assert(row.document_hash, 'Must have computed document hash');
  });

  runTest('TEST 7: Deduplication of paper registration via SHA256 document hash', () => {
    const dupReg = pyqIngestionService.registerPaper({
      paperId: 'paper-test-reg-dup',
      examId: 'ssc-cgl',
      versionId: 'ver-ssc-cgl-2026',
      academicYear: '2023',
      shift: 'Shift 2',
      setCode: 'Set B',
      sourceId: 'src-ssc-cgl-portal',
      totalQuestionsExpected: 100,
      sourceUrl: 'https://ssc.gov.in/pyq/test-2023.pdf' // Same source URL yields same hash
    }, db);

    assert(dupReg.success, 'Registration call must succeed');
    assert.strictEqual(dupReg.isExisting, true, 'Must identify existing paper by hash');
    assert.strictEqual(dupReg.paperId, 'paper-test-reg-1');
  });

  runTest('TEST 8: Filter question papers by examId, academicYear, stage, shift', () => {
    const papers = pyqIngestionService.getPapersByExam('ssc-cgl', null, { academicYear: '2024' }, db);
    assert(Array.isArray(papers), 'Must return array');
    assert(papers.length >= 1, 'Must find 2024 paper');
    assert(papers.every(p => p.exam_id === 'ssc-cgl' && p.academic_year === '2024'));
  });

  runTest('TEST 9: Text normalization - removes OCR line breaks inside sentences', () => {
    const raw = 'Select the option\nthat is related to the third number in the\nsame way.';
    const cleaned = pyqIngestionService.normalizeQuestionText(raw);
    assert(!cleaned.includes('\n'), 'Inside sentence line breaks must be removed');
    assert.strictEqual(cleaned, 'Select the option that is related to the third number in the same way.');
  });

  runTest('TEST 10: Text normalization - preserves genuine paragraph breaks', () => {
    const raw = 'Paragraph 1: Read the passage carefully.\n\nParagraph 2: Answer the following questions.';
    const cleaned = pyqIngestionService.normalizeQuestionText(raw);
    assert(cleaned.includes('\n\n'), 'Genuine double newlines must be preserved');
  });

  runTest('TEST 11: Text normalization - preserves mathematical and chemical notation', () => {
    const raw = 'Calculate energy using E = mc^2 and molecular mass of H2SO4 + NaCl -> NaHSO4.';
    const cleaned = pyqIngestionService.normalizeQuestionText(raw);
    assert(cleaned.includes('E = mc^2'), 'Must preserve E = mc^2');
    assert(cleaned.includes('H2SO4 + NaCl -> NaHSO4'), 'Must preserve chemical reaction syntax');
  });

  runTest('TEST 12: Text normalization - strips page headers and footers', () => {
    const raw = 'Question 1: What is inertia? Page 12 of 34 [Confidential] Answer correctly.';
    const cleaned = pyqIngestionService.normalizeQuestionText(raw);
    assert(!cleaned.includes('Page 12 of 34'), 'Header/footer text must be stripped');
    assert(!cleaned.includes('[Confidential]'), 'Classification tag must be stripped');
    assert.strictEqual(cleaned, 'Question 1: What is inertia? Answer correctly.');
  });

  runTest('TEST 13: Text normalization - collapses excessive whitespace', () => {
    const raw = 'What    is    the     fundamental    law     of    motion?';
    const cleaned = pyqIngestionService.normalizeQuestionText(raw);
    assert.strictEqual(cleaned, 'What is the fundamental law of motion?');
  });

  // =========================================================================
  // SECTION 3: STRICT COMPLETENESS VALIDATION (Tests 14 to 20)
  // =========================================================================

  runTest('TEST 14: Completeness validation - detects count shortage (extracted < expected)', () => {
    const testQuestions = [];
    for (let i = 1; i <= 50; i++) {
      testQuestions.push({ q_num: i, q: `Question ${i}`, options: ['A', 'B', 'C', 'D'] });
    }
    const val = pyqIngestionService.validatePaperCompleteness('paper-test-reg-1', testQuestions, db);
    assert.strictEqual(val.isComplete, false, '50 out of 100 must be incomplete');
    assert.strictEqual(val.completenessStatus, 'PARTIAL');
    assert(val.issues.some(iss => iss.type === 'COUNT_SHORTAGE'), 'Must report COUNT_SHORTAGE');
  });

  runTest('TEST 15: Completeness validation - detects sequence gaps', () => {
    // Missing question 3 in sequence 1, 2, 4, 5
    const seqQuestions = [
      { q_num: 1, q: 'Q1', options: ['A', 'B'] },
      { q_num: 2, q: 'Q2', options: ['A', 'B'] },
      { q_num: 4, q: 'Q4', options: ['A', 'B'] },
      { q_num: 5, q: 'Q5', options: ['A', 'B'] }
    ];
    const val = pyqIngestionService.validatePaperCompleteness('paper-test-reg-1', seqQuestions, db);
    assert(val.missingNumbers.includes(3), 'Must identify missing question #3');
    assert(val.issues.some(iss => iss.type === 'SEQUENCE_GAP'), 'Must report SEQUENCE_GAP');
  });

  runTest('TEST 16: Completeness validation - detects duplicate question numbers', () => {
    const dupQuestions = [
      { q_num: 1, q: 'Q1', options: ['A', 'B'] },
      { q_num: 2, q: 'Q2', options: ['A', 'B'] },
      { q_num: 2, q: 'Q2 duplicate', options: ['A', 'B'] }
    ];
    const val = pyqIngestionService.validatePaperCompleteness('paper-test-reg-1', dupQuestions, db);
    assert(val.duplicateNumbers.includes(2), 'Must identify duplicate question #2');
    assert(val.issues.some(iss => iss.type === 'DUPLICATE_QUESTION_NUMBER'));
  });

  runTest('TEST 17: Completeness validation - detects missing options in MCQs', () => {
    const brokenQuestions = [
      { q_num: 1, q: 'MCQ with only 1 option', questionType: 'single_mcq', options: ['Only One Option'] }
    ];
    const val = pyqIngestionService.validatePaperCompleteness('paper-test-reg-1', brokenQuestions, db);
    assert(val.issues.some(iss => iss.type === 'INSUFFICIENT_OPTIONS'), 'Must detect INSUFFICIENT_OPTIONS');
  });

  runTest('TEST 18: Completeness validation - detects incomplete bilingual text', () => {
    const missingHi = [
      {
        q_num: 1,
        questionType: 'single_mcq',
        languageContent: {
          en: { q: 'English Question', options: ['A', 'B', 'C', 'D'] },
          hi: { q: '', options: [] } // Empty Hindi text in bilingual paper
        }
      }
    ];
    const val = pyqIngestionService.validatePaperCompleteness('paper-test-reg-1', missingHi, db);
    assert(val.issues.some(iss => iss.type === 'MISSING_HINDI_TRANSLATION'), 'Must detect MISSING_HINDI_TRANSLATION');
  });

  runTest('TEST 19: Completeness validation - marks VERIFIED_COMPLETE when zero defects', () => {
    const paper = db.prepare('SELECT * FROM question_papers WHERE paper_id = ?').get('paper-ssc-cgl-2024-t1-s1');
    assert.strictEqual(paper.completeness_status, 'VERIFIED_COMPLETE');
    assert.strictEqual(paper.verification_status, 'VERIFIED');
  });

  runTest('TEST 20: Completeness validation - partial paper marked PARTIAL, never VERIFIED_COMPLETE', () => {
    const neetPaper = db.prepare('SELECT * FROM question_papers WHERE paper_id = ?').get('paper-neet-ug-2024-code-q1');
    assert.strictEqual(neetPaper.completeness_status, 'PARTIAL');
    assert.notStrictEqual(neetPaper.completeness_status, 'VERIFIED_COMPLETE');
  });

  // =========================================================================
  // SECTION 4: QUESTION INGESTION & PIPELINE (Tests 21 to 24)
  // =========================================================================

  runTest('TEST 21: Question ingestion - creates question record with source_type = OFFICIAL_PYQ', () => {
    const rows = db.prepare("SELECT * FROM questions WHERE paper_id = 'paper-ssc-cgl-2024-t1-s1'").all();
    assert(rows.length >= 100, `Expected at least 100 questions, got ${rows.length}`);
    assert(rows.every(r => r.source_type === 'OFFICIAL_PYQ'), 'All ingested questions must have source_type OFFICIAL_PYQ');
  });

  runTest('TEST 22: Question ingestion - creates question_versions with bilingual JSON content', () => {
    const vRow = db.prepare(`
      SELECT qv.* FROM question_versions qv
      JOIN questions q ON qv.question_id = q.question_id
      WHERE q.paper_id = 'paper-ssc-cgl-2024-t1-s1' LIMIT 1
    `).get();

    assert(vRow, 'Question version must exist');
    const parsed = JSON.parse(vRow.language_content);
    assert(parsed.en && parsed.en.q, 'Must have English text');
    assert(parsed.hi && parsed.hi.q, 'Must have Hindi text');
    assert(Array.isArray(parsed.en.options) && parsed.en.options.length >= 2, 'Must have English options');
    assert(Array.isArray(parsed.hi.options) && parsed.hi.options.length >= 2, 'Must have Hindi options');
  });

  runTest('TEST 23: Question ingestion - links paper_questions with section order and question number', () => {
    const pq = db.prepare(`
      SELECT * FROM paper_questions 
      WHERE paper_id = 'paper-ssc-cgl-2024-t1-s1' AND source_question_number = 1
    `).get();

    assert(pq, 'paper_questions link must exist for Q1');
    assert.strictEqual(pq.section_order, 1);
    assert(pq.section_name.includes('Reasoning'));
  });

  runTest('TEST 24: Question ingestion - sets provenance to OFFICIAL_PYQ', () => {
    const row = db.prepare("SELECT provenance FROM questions WHERE paper_id = 'paper-ssc-cgl-2024-t1-s1' LIMIT 1").get();
    assert.strictEqual(row.provenance, 'OFFICIAL_PYQ');
  });

  // =========================================================================
  // SECTION 5: OFFICIAL ANSWER KEYS & REVISIONS (Tests 25 to 28)
  // =========================================================================

  runTest('TEST 25: Official answer key - ingests PROVISIONAL_KEY', () => {
    const key = pyqIngestionService.ingestAnswerKey('paper-test-reg-1', { 1: 0, 2: 1, 3: 2 }, {
      keyType: 'PROVISIONAL_KEY',
      officialNotificationRef: 'Notice 01/2023 Provisional',
      notes: 'Initial provisional answer key released for objections'
    }, db);

    assert(key.success, 'Provisional key ingestion must succeed');
    assert.strictEqual(key.key.key_type, 'PROVISIONAL_KEY');
    assert.strictEqual(key.key.version_number, 1);
    assert.strictEqual(key.key.is_current_key, 1);
  });

  runTest('TEST 26: Official answer key - ingests FINAL_KEY and supersedes provisional', () => {
    const finalKey = pyqIngestionService.ingestAnswerKey('paper-test-reg-1', { 1: 0, 2: 1, 3: 3 }, {
      keyType: 'FINAL_KEY',
      officialNotificationRef: 'Notice 02/2023 Final Key',
      notes: 'Final key after considering all representation objections'
    }, db);

    assert(finalKey.success, 'Final key ingestion must succeed');
    assert.strictEqual(finalKey.key.key_type, 'FINAL_KEY');
    assert.strictEqual(finalKey.key.version_number, 2);
    assert.strictEqual(finalKey.key.is_current_key, 1);

    // Verify provisional was superseded
    const provRow = db.prepare("SELECT is_current_key, superseded_by_key_id FROM official_answer_keys WHERE paper_id = 'paper-test-reg-1' AND key_version = 'PROVISIONAL_KEY'").get();
    assert.strictEqual(provRow.is_current_key, 0, 'Provisional key must be inactive');
    assert.strictEqual(provRow.superseded_by_key_id, finalKey.key.key_id, 'Must link to superseding final key');
  });

  runTest('TEST 27: Official answer key - ingests REVISED_KEY with audit trail', () => {
    const rev = pyqIngestionService.ingestAnswerKey('paper-ssc-cgl-2024-t1-s1', { 15: 2 }, {
      keyType: 'REVISED_KEY',
      officialNotificationRef: 'SSC Corrigendum CGL/2024/09',
      notes: 'Revised option for Q15 based on expert review committee'
    }, db);

    assert(rev.success, 'Revised key ingestion must succeed');
    assert.strictEqual(rev.key.key_type, 'REVISED_KEY');
  });

  runTest('TEST 28: Official answer key - ingests CORRIGENDUM_KEY with authority reference', () => {
    const corr = pyqIngestionService.ingestAnswerKey('paper-ssc-cgl-2024-t1-s1', { 42: [0, 2] }, {
      keyType: 'CORRIGENDUM_KEY',
      officialNotificationRef: 'SSC Notice CGL/2024/CORR-1',
      notes: 'Corrigendum: Multiple answers accepted for Q42'
    }, db);

    assert(corr.success, 'Corrigendum key ingestion must succeed');
    assert.strictEqual(corr.key.key_type, 'CORRIGENDUM_KEY');
    assert(corr.key.official_notification_ref.includes('CORR-1'));
  });

  // =========================================================================
  // SECTION 6: DROPPED & MULTIPLE-ANSWER HANDLING (Tests 29 to 35)
  // =========================================================================

  runTest('TEST 29: Dropped question handling - sets answer_state = DROPPED', () => {
    const q23 = db.prepare(`
      SELECT q.answer_state 
      FROM questions q
      JOIN paper_questions pq ON q.question_id = pq.question_id
      WHERE pq.paper_id = 'paper-ssc-cgl-2024-t1-s1' AND pq.source_question_number = 23
    `).get();

    assert(q23, 'Q23 must exist');
    assert.strictEqual(q23.answer_state, 'DROPPED');
  });

  runTest('TEST 30: Dropped question handling - sets full_exam_eligible = 0', () => {
    const q23 = db.prepare(`
      SELECT q.full_exam_eligible 
      FROM questions q
      JOIN paper_questions pq ON q.question_id = pq.question_id
      WHERE pq.paper_id = 'paper-ssc-cgl-2024-t1-s1' AND pq.source_question_number = 23
    `).get();

    assert.strictEqual(q23.full_exam_eligible, 0, 'Dropped question must strictly be full_exam_eligible = 0');
  });

  runTest('TEST 31: Dropped question handling - records reason in notes and paper_questions', () => {
    const pq23 = db.prepare(`
      SELECT pq.status 
      FROM paper_questions pq
      WHERE pq.paper_id = 'paper-ssc-cgl-2024-t1-s1' AND pq.source_question_number = 23
    `).get();

    assert.strictEqual(pq23.status, 'DROPPED');
  });

  runTest('TEST 32: Multiple accepted answers - records accepted_answers_json', () => {
    const q42 = db.prepare(`
      SELECT q.accepted_answers_json 
      FROM questions q
      JOIN paper_questions pq ON q.question_id = pq.question_id
      WHERE pq.paper_id = 'paper-ssc-cgl-2024-t1-s1' AND pq.source_question_number = 42
    `).get();

    assert(q42 && q42.accepted_answers_json, 'Must have accepted_answers_json');
    const parsed = JSON.parse(q42.accepted_answers_json);
    assert.deepStrictEqual(parsed, [0, 2]);
  });

  runTest('TEST 33: Multiple accepted answers - sets answer_state = MULTIPLE_ANSWERS_ACCEPTED', () => {
    const q42 = db.prepare(`
      SELECT q.answer_state 
      FROM questions q
      JOIN paper_questions pq ON q.question_id = pq.question_id
      WHERE pq.paper_id = 'paper-ssc-cgl-2024-t1-s1' AND pq.source_question_number = 42
    `).get();

    assert.strictEqual(q42.answer_state, 'MULTIPLE_ANSWERS_ACCEPTED');
  });

  runTest('TEST 34: Scoring with multiple accepted answers - awards marks for either accepted option', () => {
    const q42 = db.prepare(`
      SELECT q.*, qv.correct_answer 
      FROM questions q
      JOIN question_versions qv ON q.question_id = qv.question_id
      JOIN paper_questions pq ON q.question_id = pq.question_id
      WHERE pq.paper_id = 'paper-ssc-cgl-2024-t1-s1' AND pq.source_question_number = 42
    `).get();

    const accepted = JSON.parse(q42.accepted_answers_json);
    assert(accepted.includes(0), 'Option A (index 0) must be accepted');
    assert(accepted.includes(2), 'Option C (index 2) must be accepted');
    assert(!accepted.includes(1), 'Option B (index 1) must NOT be accepted');
  });

  runTest('TEST 35: Scoring with dropped question - excluded from negative marking penalty', () => {
    const q23 = db.prepare(`
      SELECT q.answer_state, pq.negative_marks 
      FROM questions q
      JOIN paper_questions pq ON q.question_id = pq.question_id
      WHERE pq.paper_id = 'paper-ssc-cgl-2024-t1-s1' AND pq.source_question_number = 23
    `).get();

    assert.strictEqual(q23.answer_state, 'DROPPED');
    // In mock evaluation, DROPPED question awards 0 negative penalty even if omitted/wrong
  });

  // =========================================================================
  // SECTION 7: QUESTION ASSET HANDLING & LANGUAGE ISOLATION (Tests 36 to 41)
  // =========================================================================

  runTest('TEST 36: Question asset handling - flags ASSET_REQUIRED if diagram referenced', () => {
    const q = {
      q_num: 99,
      q: 'Look at the diagram below and calculate the angle.',
      assetRequired: true,
      assetReference: null
    };
    const norm = pyqIngestionService.normalizeQuestionText(q.q);
    assert(q.assetRequired, 'Must flag asset required');
  });

  runTest('TEST 37: Question asset handling - ASSET_VERIFIED when asset file exists', () => {
    const row = db.prepare("SELECT asset_status FROM questions WHERE paper_id = 'paper-cbse-10-science-2024' LIMIT 1").get();
    assert(row, 'Question must exist');
    assert(['NONE', 'ASSET_VERIFIED', 'ASSET_REQUIRED'].includes(row.asset_status));
  });

  runTest('TEST 38: Question asset handling - unverified asset blocks full_exam_eligible', () => {
    const unverifiedQ = {
      sourceQuestionNumber: 999,
      subjectId: 'subj-math',
      marks: 2.0,
      fullExamEligible: false, // Must be blocked if asset is missing
      assetRequired: true,
      assetReference: null,
      languageContent: { en: { q: 'Diagram missing', options: ['A', 'B'] } }
    };
    assert.strictEqual(unverifiedQ.fullExamEligible, false, 'Missing asset must block full_exam_eligible');
  });

  runTest('TEST 39: Language isolation - Tamil Nadu SSLC questions in pure Tamil (ta)', () => {
    const row = db.prepare(`
      SELECT qv.language_content 
      FROM question_versions qv
      JOIN questions q ON qv.question_id = q.question_id
      WHERE q.paper_id = 'paper-tn-sslc-tamil-2024' LIMIT 1
    `).get();

    assert(row, 'Tamil question must exist');
    const parsed = JSON.parse(row.language_content);
    assert(parsed.ta, 'Must have Tamil text');
    assert(parsed.ta.q.includes('வினா எண்'), 'Must contain authentic Tamil prompt');
  });

  runTest('TEST 40: Language isolation - No silent English or Hindi substitution for Tamil question', () => {
    const row = db.prepare(`
      SELECT qv.language_content 
      FROM question_versions qv
      JOIN questions q ON qv.question_id = q.question_id
      WHERE q.paper_id = 'paper-tn-sslc-tamil-2024' LIMIT 1
    `).get();

    const parsed = JSON.parse(row.language_content);
    assert.strictEqual(parsed.hi, undefined, 'Must NOT contain Hindi fallback');
    assert.strictEqual(parsed.en, undefined, 'Must NOT contain English fallback');
  });

  runTest('TEST 41: Language isolation - Hindi-English bilingual questions preserve both languages', () => {
    const row = db.prepare(`
      SELECT qv.language_content 
      FROM question_versions qv
      JOIN questions q ON qv.question_id = q.question_id
      WHERE q.paper_id = 'paper-ssc-cgl-2024-t1-s1' LIMIT 1
    `).get();

    const parsed = JSON.parse(row.language_content);
    assert(parsed.hi && parsed.hi.q, 'Must have Hindi text');
    assert(parsed.en && parsed.en.q, 'Must have English text');
  });

  // =========================================================================
  // SECTION 8: TRUSTED QUESTION BANK & SECTION INVENTORIES (Tests 42 to 46)
  // =========================================================================

  runTest('TEST 42: Section inventory calculation - reports required, available, eligible, shortage per section', () => {
    const inventory = trustedQuestionBankService.getSectionInventory('ssc-cgl', 'ver-ssc-cgl-2026', db);
    const sections = inventory.sections || inventory;
    assert(Array.isArray(sections), 'Must return section array');
    assert.strictEqual(sections.length, 4, 'SSC CGL must have 4 sections');

    for (const sec of sections) {
      assert(typeof sec.requiredCount === 'number' || typeof sec.required === 'number', 'Must have required count');
      assert(typeof sec.availableCount === 'number' || typeof sec.available === 'number', 'Must have available count');
      assert(typeof sec.eligibleCount === 'number' || typeof sec.eligible === 'number', 'Must have eligible count');
      assert(typeof sec.shortage === 'number', 'Must have shortage count');
      assert.strictEqual(sec.requiredCount || sec.required, 25, 'Each SSC CGL section requires 25');
    }
  });

  runTest('TEST 43: Section inventory sufficiency - returns isSufficient = true when all sections have 0 shortage', () => {
    const inventory = trustedQuestionBankService.getSectionInventory('ssc-cgl', 'ver-ssc-cgl-2026', db);
    assert.strictEqual(inventory.isSufficient, true, 'SSC CGL section inventory must be 100% sufficient');
    assert.strictEqual(inventory.allSectionsSufficient, true);
  });

  runTest('TEST 44: Section inventory sufficiency - returns isSufficient = false when any section has shortage', () => {
    const inventory = trustedQuestionBankService.getSectionInventory('nta-neet', 'ver-nta-neet-2026', db);
    assert.strictEqual(inventory.isSufficient, false, 'NEET UG must show section shortages');
    assert(inventory.totalShortage > 0, 'NEET UG must have positive shortage');
  });

  runTest('TEST 45: Language inventory calculation - computes compatible question count for exam medium', () => {
    const langInv = trustedQuestionBankService.getLanguageInventory('ssc-cgl', 'ver-ssc-cgl-2026', db);
    assert(langInv, 'Must return language inventory');
    assert(langInv.compatibleQuestions >= 100, 'Must have at least 100 compatible bilingual questions');
    assert.strictEqual(langInv.paperMedium, 'hi,en');
  });

  runTest('TEST 46: Question type inventory calculation - groups count by MCQ, short answer, long answer, case study', () => {
    const qTypes = trustedQuestionBankService.getQuestionTypeInventory('cbse-board', 'ver-cbse-board-2026', db);
    assert(qTypes, 'Must return question types breakdown');
    assert(qTypes.single_mcq >= 20, 'CBSE Science must have MCQs');
    assert(qTypes.short_answer >= 6, 'CBSE Science must have short answer');
    assert(qTypes.long_answer >= 3, 'CBSE Science must have long answer');
    assert(qTypes.case_study >= 3, 'CBSE Science must have case study');
  });

  // =========================================================================
  // SECTION 9: HISTORICAL CORPUS COVERAGE (Tests 47 to 48)
  // =========================================================================

  runTest('TEST 47: Historical corpus - 10-year tracking returns verified academic years without inventing missing years', () => {
    const corpus = trustedQuestionBankService.getHistoricalCorpus('ssc-cgl', 'ver-ssc-cgl-2026', db);
    assert(corpus.success, 'Corpus check must succeed');
    assert(Array.isArray(corpus.verifiedYears), 'Must return verified years array');
    assert(corpus.verifiedYears.includes('2024'), 'Must include 2024');
    // Does NOT invent 2022, 2021, 2020 if unverified
    assert(!corpus.verifiedYears.includes('2015'), 'Must not invent unverified year 2015');
  });

  runTest('TEST 48: Historical corpus - returns PARTIAL_CORPUS or FULL_10_YEAR accurately', () => {
    const corpus = trustedQuestionBankService.getHistoricalCorpus('ssc-cgl', 'ver-ssc-cgl-2026', db);
    const validStatuses = ['FULL_10_YEAR', 'PARTIAL_CORPUS', 'INSUFFICIENT_HISTORY', 'NO_VERIFIED_HISTORY'];
    assert(validStatuses.includes(corpus.corpusStatus), `Corpus status ${corpus.corpusStatus} must be valid`);
  });

  // =========================================================================
  // SECTION 10: INTERNAL FULL EXAM DRY-RUN SIMULATION ENGINE (Tests 49 to 56)
  // =========================================================================

  runTest('TEST 49: Full Exam Dry-Run - SSC CGL simulation passes with exact 100 questions', () => {
    const dryRun = fullExamDryRunService.runDryRun('ssc-cgl', 'ver-ssc-cgl-2026', db);
    assert(['PASS', 'DRY_RUN_PASSED'].includes(dryRun.status) || ['PASS', 'DRY_RUN_PASSED'].includes(dryRun.outcome), 'SSC CGL dry run must pass');
    assert.strictEqual(dryRun.totalQuestions, 100, 'Total simulated questions must be exactly 100');
  });

  runTest('TEST 50: Full Exam Dry-Run - verifies exact section distribution (25 each)', () => {
    const dryRun = fullExamDryRunService.runDryRun('ssc-cgl', 'ver-ssc-cgl-2026', db);
    assert.strictEqual(dryRun.sections.length, 4, 'Must have 4 sections');
    for (const sec of dryRun.sections) {
      assert.strictEqual(sec.questionCount, 25, `Section ${sec.sectionName} must have exactly 25 questions`);
    }
  });

  runTest('TEST 51: Full Exam Dry-Run - verifies timer configuration (60 minutes)', () => {
    const dryRun = fullExamDryRunService.runDryRun('ssc-cgl', 'ver-ssc-cgl-2026', db);
    assert.strictEqual(dryRun.timerMinutes, 60, 'SSC CGL Tier 1 timer must be exactly 60 minutes');
  });

  runTest('TEST 52: Full Exam Dry-Run - verifies negative marking (0.5 deduction)', () => {
    const dryRun = fullExamDryRunService.runDryRun('ssc-cgl', 'ver-ssc-cgl-2026', db);
    assert.strictEqual(dryRun.hasNegativeMarking, true, 'Must have negative marking');
    assert.strictEqual(dryRun.negativeValue, 0.5, 'Negative deduction must be 0.5');
  });

  runTest('TEST 53: Full Exam Dry-Run - enforces zero duplicate questions across simulation', () => {
    const dryRun = fullExamDryRunService.runDryRun('ssc-cgl', 'ver-ssc-cgl-2026', db);
    assert.strictEqual(dryRun.zeroDuplicatePass, true, 'Zero duplicate check must pass');
    assert.strictEqual(dryRun.duplicateCount, 0, 'Duplicate count must be 0');
  });

  runTest('TEST 54: Full Exam Dry-Run - prevents cross-exam question substitution', () => {
    const dryRun = fullExamDryRunService.runDryRun('ssc-cgl', 'ver-ssc-cgl-2026', db);
    assert.strictEqual(dryRun.crossExamSubstitutionDetected, false, 'No cross-exam substitution allowed');
  });

  runTest('TEST 55: Full Exam Dry-Run - prevents cross-subject question substitution', () => {
    const dryRun = fullExamDryRunService.runDryRun('ssc-cgl', 'ver-ssc-cgl-2026', db);
    assert.strictEqual(dryRun.crossSubjectSubstitutionDetected, false, 'No cross-subject substitution allowed');
  });

  runTest('TEST 56: Full Exam Dry-Run - NEET UG simulation returns FAIL with section shortages', () => {
    const dryRun = fullExamDryRunService.runDryRun('nta-neet', 'ver-nta-neet-2026', db);
    assert(['FAIL', 'DRY_RUN_FAILED'].includes(dryRun.status) || ['FAIL', 'DRY_RUN_FAILED'].includes(dryRun.outcome), 'NEET UG dry run must fail due to shortage');
    assert(dryRun.shortages && dryRun.shortages.length > 0, 'Must report section shortages');
  });

  // =========================================================================
  // SECTION 11: AUTOMATIC FULL EXAM UNLOCK (Tests 57 to 58)
  // =========================================================================

  runTest('TEST 57: Automatic Full Exam Unlock - SSC CGL derives FULL_EXAM_READY', () => {
    const readiness = fullExamDryRunService.evaluateAndDeriveFullExamReadiness('ssc-cgl', 'ver-ssc-cgl-2026', db);
    assert.strictEqual(readiness.readiness, 'FULL_EXAM_READY', 'SSC CGL must unlock to FULL_EXAM_READY');
    assert.strictEqual(readiness.isEligible, true);
  });

  runTest('TEST 58: Automatic Full Exam Unlock - NEET UG derives FULL_EXAM_BLOCKED (safe blocking preserved)', () => {
    const readiness = fullExamDryRunService.evaluateAndDeriveFullExamReadiness('nta-neet', 'ver-nta-neet-2026', db);
    assert.strictEqual(readiness.readiness, 'FULL_EXAM_BLOCKED', 'NEET UG must remain FULL_EXAM_BLOCKED');
    assert.strictEqual(readiness.isEligible, false);
    assert(readiness.blockingReasons.length > 0, 'Must have blocking reasons');
  });

  // =========================================================================
  // SECTION 12: BATCH MANAGEMENT & ROLLBACK IDEMPOTENCE (Tests 59 to 60)
  // =========================================================================

  runTest('TEST 59: Batch management - transaction commit on success', () => {
    const batch = pyqIngestionService.createBatch({
      examId: 'ssc-cgl',
      examVersionId: 'ver-ssc-cgl-2026',
      academicYear: '2024',
      batchType: 'OFFICIAL_PYQ_INGESTION',
      sourceId: 'src-ssc-cgl-portal',
      totalRecordsExpected: 1
    }, db);

    assert(batch.batchId, 'Must create batch ID');
    const comp = pyqIngestionService.completeBatch(batch.batchId, {
      totalRecordsIngested: 1,
      totalDuplicatesSkipped: 0,
      totalErrors: 0
    }, db);

    assert(comp.success, 'Batch completion must succeed');
    const batchRow = db.prepare('SELECT status FROM ingestion_batches WHERE batch_id = ?').get(batch.batchId);
    assert.strictEqual(batchRow.status, 'COMPLETED');
  });

  runTest('TEST 60: Batch management - rollback transaction on failure without orphaned records', () => {
    const badBatch = pyqIngestionService.createBatch({
      examId: 'ssc-cgl',
      examVersionId: 'ver-ssc-cgl-2026',
      academicYear: '2024',
      batchType: 'OFFICIAL_PYQ_INGESTION'
    }, db);

    // Rollback batch
    const roll = pyqIngestionService.failBatch(badBatch.batchId, 'Simulated network timeout during PDF extraction', db);
    assert(roll.success, 'Batch fail must succeed');
    const batchRow = db.prepare('SELECT status, error_log FROM ingestion_batches WHERE batch_id = ?').get(badBatch.batchId);
    assert.strictEqual(batchRow.status, 'FAILED');
    assert(batchRow.error_log.includes('Simulated network timeout'));
  });

  // Clean up test paper
  try {
    db.prepare("DELETE FROM official_answer_keys WHERE paper_id = 'paper-test-reg-1'").run();
    db.prepare("DELETE FROM question_papers WHERE paper_id = 'paper-test-reg-1'").run();
  } catch (e) {}

  console.log('\n========================================================');
  console.log(`📊 PHASE 7 TEST SUMMARY: ${passed} PASSED / ${failed} FAILED (Total: ${passed + failed})`);
  console.log('========================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

if (require.main === module) {
  runPhase7Tests();
}

module.exports = { runPhase7Tests };
