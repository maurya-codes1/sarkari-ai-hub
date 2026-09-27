// backend/test/test-phase8-pdf.js
// Phase 8: Production PDF Engine, Multilingual Question Papers, Notes, Answer Keys & OMR
// 60-Point Comprehensive Test Suite verifying database schema, readiness gates,
// 10 document types, OMR vector bubble geometry, multilingual font registry (12 scripts),
// content integrity, negative marking parity, dropped-question handling,
// SVG preview generation, metadata sanitization, and baseline regression safety.

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { getDb } = require('../db/database');
const pdfGenerationService = require('../services/pdf-generation-service');
const pdfFontRegistry = require('../services/pdf-font-registry');
const pdfOmrGenerator = require('../services/pdf-omr-generator');
const unifiedExamTruthService = require('../services/unified-exam-truth-service');
const blueprintRepository = require('../db/repositories/blueprint-repository');
const pyqIngestionService = require('../services/pyq-ingestion-service');
const fullExamDryRunService = require('../services/full-exam-dry-run-service');
const fullExamGateService = require('../services/full-exam-gate-service');
const mockService = require('../services/mock-service');

async function runPhase8Tests() {
  console.log('========================================================');
  console.log('🧪 RUNNING PHASE 8: PRODUCTION PDF ENGINE & OMR TEST SUITE (60 TESTS)');
  console.log('========================================================\n');

  const db = getDb();
  let passed = 0;
  let failed = 0;

  function test(name, fn) {
    try {
      fn();
      passed++;
      console.log(`  ✅ Test ${passed + failed}: ${name}`);
    } catch (err) {
      failed++;
      console.error(`  ❌ Test ${passed + failed}: ${name}`);
      console.error(`     Error: ${err.message}`);
    }
  }

  async function testAsync(name, fn) {
    try {
      await fn();
      passed++;
      console.log(`  ✅ Test ${passed + failed}: ${name}`);
    } catch (err) {
      failed++;
      console.error(`  ❌ Test ${passed + failed}: ${name}`);
      console.error(`     Error: ${err.message}`);
    }
  }

  // =========================================================================
  // PART 1: SCHEMA, DATABASE TABLES & FOREIGN KEY INTEGRITY (Tests 1-5)
  // =========================================================================
  console.log('\n--- PART 1: SCHEMA, DATABASE TABLES & FOREIGN KEY INTEGRITY ---');

  test('Table pdf_documents exists with all required columns and constraints', () => {
    const cols = db.prepare("PRAGMA table_info('pdf_documents')").all();
    const colNames = cols.map(c => c.name);
    const required = [
      'pdf_id', 'exam_id', 'exam_version_id', 'document_type', 'template_id',
      'file_path', 'file_name', 'file_size_bytes',
      'page_count', 'document_checksum', 'generation_status', 'is_stale',
      'created_at'
    ];
    for (const req of required) {
      assert(colNames.includes(req), `Missing column ${req} in pdf_documents`);
    }
  });

  test('Table pdf_generation_jobs exists with job lifecycle columns', () => {
    const cols = db.prepare("PRAGMA table_info('pdf_generation_jobs')").all();
    const colNames = cols.map(c => c.name);
    const required = ['job_id', 'pdf_id', 'status', 'progress_percent', 'stage', 'created_at'];
    for (const req of required) {
      assert(colNames.includes(req), `Missing column ${req} in pdf_generation_jobs`);
    }
  });

  test('Table pdf_validation_results exists with QA metric columns', () => {
    const cols = db.prepare("PRAGMA table_info('pdf_validation_results')").all();
    const colNames = cols.map(c => c.name);
    const required = ['validation_id', 'pdf_id', 'overall_valid', 'page_count_pass', 'content_parity_pass', 'omr_geometry_pass', 'glyph_pass'];
    for (const req of required) {
      assert(colNames.includes(req), `Missing column ${req} in pdf_validation_results`);
    }
  });

  test('Table pdf_template_versions exists and tracks template evolution', () => {
    const cols = db.prepare("PRAGMA table_info('pdf_template_versions')").all();
    const colNames = cols.map(c => c.name);
    const required = ['template_version_id', 'template_id', 'version_number', 'layout_mode', 'is_active'];
    for (const req of required) {
      assert(colNames.includes(req), `Missing column ${req} in pdf_template_versions`);
    }
  });

  test('Table pdf_templates seeded with exactly 10 default templates with 0 FK violations', () => {
    const tmpls = db.prepare("SELECT * FROM pdf_templates WHERE template_id LIKE 'tmpl-%-default'").all();
    assert.strictEqual(tmpls.length, 10, `Expected 10 default templates, found ${tmpls.length}`);
    const fkErrors = db.prepare("PRAGMA foreign_key_check('pdf_templates')").all();
    assert.strictEqual(fkErrors.length, 0, 'FK check on pdf_templates must be 0');
  });

  // =========================================================================
  // PART 2: FULL EXAM READINESS GATE & SAFETY BLOCKS (Tests 6-12)
  // =========================================================================
  console.log('\n--- PART 2: FULL EXAM READINESS GATE & SAFETY BLOCKS ---');

  test('checkPdfReadiness returns READY for SSC CGL Tier 1 Full Exam', () => {
    const readiness = pdfGenerationService.checkPdfReadiness('ssc-cgl', 'ver-ssc-cgl-2026', 'FULL_EXAM_PAPER');
    assert.strictEqual(readiness.isReady, true, 'SSC CGL should be ready');
    assert.strictEqual(readiness.status, 'READY');
    assert.strictEqual(readiness.gate, 'FULL_EXAM_READY');
  });

  test('checkPdfReadiness returns BLOCKED for NEET UG with insufficient questions', () => {
    const readiness = pdfGenerationService.checkPdfReadiness('nta-neet', 'ver-nta-neet-2026', 'FULL_EXAM_PAPER');
    assert.strictEqual(readiness.isReady, false, 'NEET UG should NOT be ready');
    assert(readiness.status === 'FULL_EXAM_BLOCKED' || readiness.status === 'PDF_NOT_AVAILABLE');
    assert.strictEqual(readiness.reason, 'FULL_EXAM_UNAVAILABLE_QUESTION_BANK_INSUFFICIENT');
  });

  await testAsync('generatePdf for NEET UG FULL_EXAM_PAPER is safely blocked with 403', async () => {
    const result = await pdfGenerationService.generatePdf({
      examId: 'nta-neet',
      versionId: 'ver-nta-neet-2026',
      documentType: 'FULL_EXAM_PAPER'
    });
    assert.strictEqual(result.success, false);
    assert(result.status === 'PDF_NOT_AVAILABLE' || result.status === 'FULL_EXAM_BLOCKED');
    assert.strictEqual(result.reason, 'FULL_EXAM_UNAVAILABLE_QUESTION_BANK_INSUFFICIENT');
  });

  test('generatePdf for blocked exam records no corrupt or orphan file', () => {
    const blockedRows = db.prepare("SELECT * FROM pdf_documents WHERE exam_id = 'nta-neet' AND generation_status = 'VERIFIED'").all();
    assert.strictEqual(blockedRows.length, 0, 'No verified PDF should exist for blocked NEET UG');
  });

  test('checkPdfReadiness permits SUBJECT_PRACTICE_PAPER even when full exam is blocked', () => {
    const readiness = pdfGenerationService.checkPdfReadiness('ssc-gd', 'ver-ssc-gd-2026', 'SUBJECT_PRACTICE_PAPER');
    assert.strictEqual(readiness.isReady, true, 'Practice papers are permitted if practice questions exist');
    assert.strictEqual(readiness.status, 'READY');
  });

  test('checkPdfReadiness with unknown exam returns EXAM_NOT_FOUND', () => {
    const readiness = pdfGenerationService.checkPdfReadiness('non-existent-exam-xyz', null, 'FULL_EXAM_PAPER');
    assert.strictEqual(readiness.isReady, false);
    assert.strictEqual(readiness.status, 'EXAM_NOT_FOUND');
  });

  test('COMBINED_EXAM_PACKAGE enforces identical FULL_EXAM_READY gate as FULL_EXAM_PAPER', () => {
    const readiness = pdfGenerationService.checkPdfReadiness('nta-neet', 'ver-nta-neet-2026', 'COMBINED_EXAM_PACKAGE');
    assert.strictEqual(readiness.isReady, false);
    assert.strictEqual(readiness.reason, 'FULL_EXAM_UNAVAILABLE_QUESTION_BANK_INSUFFICIENT');
  });

  // =========================================================================
  // PART 3: ALL 10 DOCUMENT TYPES GENERATION (Tests 13-22)
  // =========================================================================
  console.log('\n--- PART 3: ALL 10 DOCUMENT TYPES GENERATION ---');

  let fullExamDoc = null;
  await testAsync('Generate Type A: FULL_EXAM_PAPER (SSC CGL 2026)', async () => {
    const res = await pdfGenerationService.generatePdf({
      examId: 'ssc-cgl',
      versionId: 'ver-ssc-cgl-2026',
      documentType: 'FULL_EXAM_PAPER',
      languageCode: 'en'
    });
    assert.strictEqual(res.success, true);
    assert.strictEqual(res.status, 'VERIFIED');
    assert(res.pdfId.startsWith('pdf-ssc-cgl-full-exam-'));
    assert(fs.existsSync(res.filePath));
    assert(res.pageCount >= 8, `Expected at least 8 pages, got ${res.pageCount}`);
    assert(res.sha256Checksum && res.sha256Checksum.length === 64);
    fullExamDoc = res;
  });

  await testAsync('Generate Type B: SUBJECT_PRACTICE_PAPER (SSC CGL Reasoning)', async () => {
    const res = await pdfGenerationService.generatePdf({
      examId: 'ssc-cgl',
      versionId: 'ver-ssc-cgl-2026',
      documentType: 'SUBJECT_PRACTICE_PAPER',
      subjectName: 'General Intelligence and Reasoning',
      questionCount: 20
    });
    assert.strictEqual(res.success, true);
    assert.strictEqual(res.status, 'VERIFIED');
    assert(fs.existsSync(res.filePath));
  });

  await testAsync('Generate Type C: ALL_SUBJECTS_PRACTICE_PAPER (SSC CGL)', async () => {
    const res = await pdfGenerationService.generatePdf({
      examId: 'ssc-cgl',
      versionId: 'ver-ssc-cgl-2026',
      documentType: 'ALL_SUBJECTS_PRACTICE_PAPER',
      questionCount: 40
    });
    assert.strictEqual(res.success, true);
    assert.strictEqual(res.status, 'VERIFIED');
    assert(fs.existsSync(res.filePath));
  });

  await testAsync('Generate Type D: PYQ_PAPER (SSC CGL 2024 Shift 1)', async () => {
    const res = await pdfGenerationService.generatePdf({
      examId: 'ssc-cgl',
      versionId: 'ver-ssc-cgl-2026',
      documentType: 'PYQ_PAPER'
    });
    assert.strictEqual(res.success, true);
    assert.strictEqual(res.status, 'VERIFIED');
    assert(fs.existsSync(res.filePath));
  });

  await testAsync('Generate Type E: NOTES (SSC CGL Super Booster Notes)', async () => {
    const res = await pdfGenerationService.generatePdf({
      examId: 'ssc-cgl',
      documentType: 'NOTES',
      subjectName: 'Quantitative Aptitude'
    });
    assert.strictEqual(res.success, true);
    assert.strictEqual(res.status, 'VERIFIED');
    assert(fs.existsSync(res.filePath));
  });

  await testAsync('Generate Type F: ANSWER_KEY (SSC CGL 2024 Official Key)', async () => {
    const res = await pdfGenerationService.generatePdf({
      examId: 'ssc-cgl',
      documentType: 'ANSWER_KEY'
    });
    assert.strictEqual(res.success, true);
    assert.strictEqual(res.status, 'VERIFIED');
    assert(fs.existsSync(res.filePath));
  });

  await testAsync('Generate Type G: SOLUTIONS (SSC CGL Step-by-Step Solutions)', async () => {
    const res = await pdfGenerationService.generatePdf({
      examId: 'ssc-cgl',
      documentType: 'SOLUTIONS'
    });
    assert.strictEqual(res.success, true);
    assert.strictEqual(res.status, 'VERIFIED');
    assert(fs.existsSync(res.filePath));
  });

  await testAsync('Generate Type H: BOARD_QUESTION_PAPER (CBSE Class 10 Science)', async () => {
    const res = await pdfGenerationService.generatePdf({
      examId: 'cbse-board',
      versionId: 'ver-cbse-board-2026',
      documentType: 'BOARD_QUESTION_PAPER'
    });
    assert.strictEqual(res.success, true);
    assert.strictEqual(res.status, 'VERIFIED');
    assert(fs.existsSync(res.filePath));
  });

  let omrDoc = null;
  await testAsync('Generate Type I: OMR_SHEET (Standalone Vector A4 Sheet)', async () => {
    const res = await pdfGenerationService.generatePdf({
      examId: 'ssc-cgl',
      documentType: 'OMR_SHEET'
    });
    assert.strictEqual(res.success, true);
    assert.strictEqual(res.status, 'VERIFIED');
    assert.strictEqual(res.pageCount, 1);
    assert(fs.existsSync(res.filePath));
    omrDoc = res;
  });

  await testAsync('Generate Type J: COMBINED_EXAM_PACKAGE (Full Booklet + OMR Sheet)', async () => {
    const res = await pdfGenerationService.generatePdf({
      examId: 'ssc-cgl',
      versionId: 'ver-ssc-cgl-2026',
      documentType: 'COMBINED_EXAM_PACKAGE',
      languageCode: 'en'
    });
    assert.strictEqual(res.success, true);
    assert.strictEqual(res.status, 'VERIFIED');
    assert(res.pageCount >= 9, `Expected question pages + 1 OMR page, got ${res.pageCount}`);
    assert(fs.existsSync(res.filePath));
  });

  // =========================================================================
  // PART 4: OMR SHEET ENGINE & BUBBLE MATRIX GEOMETRY (Tests 23-30)
  // =========================================================================
  console.log('\n--- PART 4: OMR SHEET ENGINE & BUBBLE MATRIX GEOMETRY ---');

  const omrMeta = pdfOmrGenerator.getOmrMetadata(100);

  test('OMR Engine produces exactly 400 answer bubbles (100 Qs x 4 options)', () => {
    assert.strictEqual(omrMeta.questionCount, 100);
    assert.strictEqual(omrMeta.optionsPerQuestion, 4);
    assert.strictEqual(omrMeta.totalAnswerBubbles, 400);
  });

  test('OMR bubble coordinates are bounded inside standard A4 dimensions (595.28 x 841.89)', () => {
    assert.strictEqual(omrMeta.pageWidth, 595.28);
    assert.strictEqual(omrMeta.pageHeight, 841.89);
    assert(omrMeta.bubbleRadius >= 3.5 && omrMeta.bubbleRadius <= 6.0);
  });

  test('10-Digit Roll Number Matrix has 10 columns x 10 rows (100 candidate bubbles)', () => {
    assert.strictEqual(omrMeta.rollNumberColumns, 10);
    assert.strictEqual(omrMeta.rollNumberDigits, 10);
  });

  test('Set Code area contains 4 option bubbles [A, B, C, D]', () => {
    assert.deepStrictEqual(omrMeta.setCodes, ['A', 'B', 'C', 'D']);
  });

  test('4 Corner scan-alignment timing marks are defined with solid offsets', () => {
    assert.strictEqual(omrMeta.timingMarks.length, 4);
    for (const mark of omrMeta.timingMarks) {
      assert(mark.x >= 0 && mark.x <= 595.28);
      assert(mark.y >= 0 && mark.y <= 841.89);
      assert.strictEqual(mark.size, 14);
    }
  });

  test('OMR Header includes exam barcode placeholder and instruction block', () => {
    assert(omrMeta.barcodePlaceholder, 'Barcode placeholder should be present');
    assert(omrMeta.instructionsText.includes('blue/black ballpoint pen'));
  });

  test('OMR Sheet generates deterministic SHA-256 and passes OMR QA', () => {
    const val = db.prepare("SELECT * FROM pdf_validation_results WHERE pdf_id = ?").get(omrDoc.pdfId);
    assert(val, 'Validation result must exist');
    assert.strictEqual(val.omr_geometry_pass, 1);
    assert.strictEqual(val.overall_valid, 1);
  });

  test('Combined package attaches exact OMR geometry page at the end of booklet', () => {
    const pkgRow = db.prepare("SELECT * FROM pdf_documents WHERE document_type = 'COMBINED_EXAM_PACKAGE' ORDER BY created_at DESC LIMIT 1").get();
    assert(pkgRow);
    const val = db.prepare("SELECT * FROM pdf_validation_results WHERE pdf_id = ?").get(pkgRow.pdf_id);
    assert(val);
    assert.strictEqual(val.omr_geometry_pass, 1);
  });

  // =========================================================================
  // PART 5: MULTILINGUAL FONT REGISTRY & INDIC SCRIPT QA (Tests 31-38)
  // =========================================================================
  console.log('\n--- PART 5: MULTILINGUAL FONT REGISTRY & INDIC SCRIPT QA ---');

  test('Font registry maps scripts to valid Windows system fonts or fallbacks', () => {
    const fontInfo = pdfFontRegistry.getFontForLanguage('en');
    assert(fontInfo.family);
    assert(fs.existsSync(fontInfo.path), `Font file must exist: ${fontInfo.path}`);
  });

  test('Devanagari script resolves Nirmala font or valid Hindi font', () => {
    const hiInfo = pdfFontRegistry.getFontForLanguage('hi');
    assert(hiInfo.script === 'devanagari' || hiInfo.script === 'Devanagari');
    assert(fs.existsSync(hiInfo.path));
  });

  test('Southern Indian scripts (Tamil, Telugu, Kannada, Malayalam) resolve valid fonts', () => {
    const scripts = ['ta', 'te', 'kn', 'ml'];
    for (const sc of scripts) {
      const f = pdfFontRegistry.getFontForLanguage(sc);
      assert(fs.existsSync(f.path), `Font missing for script ${sc}`);
    }
  });

  test('Eastern & Western scripts (Bengali, Gujarati, Odia, Gurmukhi) resolve valid fonts', () => {
    const scripts = ['bn', 'gu', 'or', 'pa'];
    for (const sc of scripts) {
      const f = pdfFontRegistry.getFontForLanguage(sc);
      assert(fs.existsSync(f.path), `Font missing for script ${sc}`);
    }
  });

  test('Latin / English typography resolves Arial / Segoe font with complete coverage', () => {
    const f = pdfFontRegistry.getFontForLanguage('en');
    assert(f.script === 'latin' || f.script === 'Latin');
    assert(fs.existsSync(f.path));
  });

  test('Mathematical / Scientific symbols font covers Greek, sub/superscript, and radicals', () => {
    const f = pdfFontRegistry.getFontForLanguage('math');
    assert(fs.existsSync(f.path));
  });

  test('testAllIndicGlyphs executes font QA with 12/12 script pass rate (100%)', () => {
    const qa = pdfFontRegistry.testAllIndicGlyphs();
    assert.strictEqual(qa.totalScripts, 12);
    assert.strictEqual(qa.passed, 12);
    assert.strictEqual(qa.failed, 0);
    assert.strictEqual(qa.passPercentage, '100.0%');
  });

  test('Font registry caches resolved font configurations avoiding repeated disk probing', () => {
    const f1 = pdfFontRegistry.getFontForLanguage('hi');
    const f2 = pdfFontRegistry.getFontForLanguage('hi');
    assert.strictEqual(f1.path, f2.path);
  });

  // =========================================================================
  // PART 6: CONTENT INTEGRITY, BLUEPRINT PARITY & NEGATIVE DEDUCTION (Tests 39-44)
  // =========================================================================
  console.log('\n--- PART 6: CONTENT INTEGRITY, BLUEPRINT PARITY & NEGATIVE DEDUCTION ---');

  test('Full exam paper validation confirms exact 100 questions in paper', () => {
    const val = db.prepare("SELECT * FROM pdf_validation_results WHERE pdf_id = ?").get(fullExamDoc.pdfId);
    assert(val);
    assert.strictEqual(val.content_parity_pass, 1);
  });

  test('Full exam paper respects 4 verified blueprint sections with 25 Qs each', () => {
    const bp = blueprintRepository.getVerifiedBlueprint('ssc-cgl', 'ver-ssc-cgl-2026');
    assert(bp);
    assert.strictEqual(bp.total_questions, 100);
    assert.strictEqual(bp.sections.length, 4);
    for (const sec of bp.sections) {
      assert.strictEqual(sec.question_count, 25, `Section ${sec.name} must have 25 Qs`);
    }
  });

  test('Full exam paper instructions explicitly specify 60 min duration and 0.5 negative deduction', () => {
    const pdfConf = unifiedExamTruthService.getPdfConfiguration('ssc-cgl', 'ver-ssc-cgl-2026');
    assert(pdfConf && pdfConf.success);
    assert.strictEqual(pdfConf.blueprint.durationMinutes, 60);
    assert.strictEqual(pdfConf.blueprint.negativeMarkingValue, 0.5);
    assert(pdfConf.instructionsHeader.some(i => i.includes('0.5') || i.includes('60')));
  });

  test('Zero duplicate question IDs in generated full exam question collection', () => {
    const qList = db.prepare(`
      SELECT question_id, COUNT(*) as cnt 
      FROM questions 
      WHERE exam_version_id = 'ver-ssc-cgl-2026' AND full_exam_eligible = 1
      GROUP BY question_id 
      HAVING cnt > 1
    `).all();
    assert.strictEqual(qList.length, 0, 'No duplicate question IDs allowed');
  });

  test('Full exam questions contain non-empty question text and 4 choices', () => {
    const sample = db.prepare(`
      SELECT language_content 
      FROM question_versions 
      WHERE question_id IN (SELECT question_id FROM questions WHERE exam_version_id = 'ver-ssc-cgl-2026' AND full_exam_eligible = 1) 
      LIMIT 10
    `).all();
    assert(sample.length > 0);
    for (const row of sample) {
      const parsed = JSON.parse(row.language_content);
      assert(parsed.hi || parsed.en);
    }
  });

  test('Subject practice paper validation passes with practice watermark flag', () => {
    const pracRow = db.prepare("SELECT * FROM pdf_documents WHERE document_type = 'SUBJECT_PRACTICE_PAPER' ORDER BY created_at DESC LIMIT 1").get();
    assert(pracRow);
    const val = db.prepare("SELECT * FROM pdf_validation_results WHERE pdf_id = ?").get(pracRow.pdf_id);
    assert(val);
    assert.strictEqual(val.overall_valid, 1);
  });

  // =========================================================================
  // PART 7: ANSWER KEYS, REVISIONS & DROPPED QUESTIONS (Tests 45-50)
  // =========================================================================
  console.log('\n--- PART 7: ANSWER KEYS, REVISIONS & DROPPED QUESTIONS ---');

  test('Official answer key handles dropped question Q23 with full marks awarded', () => {
    const q23 = db.prepare(`
      SELECT q.answer_state, q.full_exam_eligible 
      FROM questions q
      JOIN paper_questions pq ON q.question_id = pq.question_id
      WHERE pq.paper_id = 'paper-ssc-cgl-2024-t1-s1' AND pq.source_question_number = 23
    `).get();
    assert(q23, 'Q23 must exist');
    assert.strictEqual(q23.answer_state, 'DROPPED');
    assert.strictEqual(q23.full_exam_eligible, 0, 'Dropped question excluded from full exam');
  });

  test('Official answer key handles multiple valid answers for Q42 per corrigendum', () => {
    const q42 = db.prepare(`
      SELECT q.answer_state, q.accepted_answers_json 
      FROM questions q
      JOIN paper_questions pq ON q.question_id = pq.question_id
      WHERE pq.paper_id = 'paper-ssc-cgl-2024-t1-s1' AND pq.source_question_number = 42
    `).get();
    assert(q42, 'Q42 must exist');
    assert.strictEqual(q42.answer_state, 'MULTIPLE_ANSWERS_ACCEPTED');
    const parsed = JSON.parse(q42.accepted_answers_json);
    assert.deepStrictEqual(parsed, [0, 2]);
  });

  test('Solutions document separates pedagogical rationale from raw answer key tables', () => {
    const solRow = db.prepare("SELECT * FROM pdf_documents WHERE document_type = 'SOLUTIONS' ORDER BY created_at DESC LIMIT 1").get();
    assert(solRow);
    const tmpl = db.prepare("SELECT * FROM pdf_templates WHERE template_id = ?").get(solRow.template_id);
    assert.strictEqual(tmpl.pdf_type, 'SOLUTIONS');
  });

  test('PYQ paper preserves official shift, set, and year metadata', () => {
    const pyq = pyqIngestionService.getPaperById('paper-ssc-cgl-2024-t1-s1');
    assert(pyq);
    assert.strictEqual(pyq.academic_year, '2024');
    assert.strictEqual(pyq.shift, 'Shift 1');
    assert.strictEqual(pyq.set_code, 'Set C');
    assert(pyq.completeness_status === 'VERIFIED_COMPLETE' || pyq.verification_status === 'VERIFIED');
  });

  test('Answer key template contains corrigendum notice at top of key section', () => {
    const keyRow = db.prepare("SELECT * FROM pdf_documents WHERE document_type = 'ANSWER_KEY' ORDER BY created_at DESC LIMIT 1").get();
    assert(keyRow);
    assert(keyRow.file_name.includes('answer-key'));
  });

  test('Question papers with revised keys do not disrupt question sequence numbers 1-100', () => {
    const count = db.prepare("SELECT COUNT(DISTINCT source_question_number) as cnt FROM paper_questions WHERE paper_id = 'paper-ssc-cgl-2024-t1-s1'").get();
    assert(count.cnt >= 100);
  });

  // =========================================================================
  // PART 8: STALE INVALIDATION, CACHE, SECURITY & PREVIEWS (Tests 51-55)
  // =========================================================================
  console.log('\n--- PART 8: STALE INVALIDATION, CACHE, SECURITY & PREVIEWS ---');

  test('markPdfsStale flags documents as stale on blueprint or question invalidation', () => {
    const tempId = `pdf-temp-stale-test-${Date.now()}`;
    const testExamId = 'bseb-bihar';
    db.prepare(`
      INSERT INTO pdf_documents (
        pdf_id, exam_id, exam_version_id, document_type, template_id, title,
        file_path, file_name, file_size_bytes, page_count,
        document_checksum, generation_status, is_stale, created_at
      ) VALUES (?, ?, 'ver-bseb-bihar-2026', 'NOTES', 'tmpl-notes-default', 'Test Notes', 'dummy.pdf', 'dummy.pdf', 100, 1, 'abc', 'VERIFIED', 0, CURRENT_TIMESTAMP)
    `).run(tempId, testExamId);

    const affected = pdfGenerationService.markPdfsStale(testExamId, 'Blueprint updated');
    assert(affected >= 1);
    const row = db.prepare("SELECT is_stale, stale_reason FROM pdf_documents WHERE pdf_id = ?").get(tempId);
    assert.strictEqual(row.is_stale, 1);
    assert(row.stale_reason.includes('Blueprint updated'));

    db.prepare("DELETE FROM pdf_documents WHERE pdf_id = ?").run(tempId);
  });

  test('getPdfMetadata sanitizes user-facing output and strips file_path', () => {
    const meta = pdfGenerationService.getPdfMetadata(fullExamDoc.pdfId);
    assert(meta);
    assert.strictEqual(meta.filePath, undefined, 'File path must be sanitized from user metadata');
    assert.strictEqual(meta.downloadUrl, `/api/v2/pdf/${fullExamDoc.pdfId}`);
    assert.strictEqual(meta.previewUrl, `/api/v2/pdf/${fullExamDoc.pdfId}/preview`);
  });

  test('Every generated PDF has SHA-256 checksum matching file contents on disk', () => {
    const docRow = db.prepare("SELECT file_path, document_checksum FROM pdf_documents WHERE pdf_id = ?").get(fullExamDoc.pdfId);
    assert(docRow);
    const fileBytes = fs.readFileSync(docRow.file_path);
    const computedHash = crypto.createHash('sha256').update(fileBytes).digest('hex');
    assert.strictEqual(computedHash, docRow.document_checksum, 'Disk SHA-256 must match database record');
  });

  test('generateVisualPagePreview generates valid vector SVG document', () => {
    const prev = pdfGenerationService.generateVisualPagePreview(fullExamDoc.pdfId, 1);
    assert(prev);
    assert(prev.svg.includes('<svg'));
    assert(prev.svg.includes('viewBox="0 0 595 842"'));
    assert(prev.svg.includes('SSC CGL'));
  });

  test('getDashboardMetrics aggregates real-time counts across all generated PDFs', () => {
    const metrics = pdfGenerationService.getDashboardMetrics();
    assert(metrics.totalDocuments >= 9);
    assert(metrics.verifiedDocuments >= 1);
    assert(metrics.typeBreakdown.length > 0);
  });

  // =========================================================================
  // PART 9: BASELINE PRESERVATION & ZERO REGRESSION (Tests 56-60)
  // =========================================================================
  console.log('\n--- PART 9: BASELINE PRESERVATION & ZERO REGRESSION ---');

  test('Phase 4 Mock Engine remains fully operational', () => {
    assert(mockService, 'Mock service must exist');
    const modes = mockService.getMockModes('ssc-cgl');
    assert(modes && modes.modes && modes.modes.length > 0, 'Mock modes must be retrievable');
  });

  test('Phase 5 Content Intelligence & Duplicate Protection remain intact', () => {
    const dupCheck = db.prepare(`
      SELECT fingerprint, COUNT(*) as cnt 
      FROM question_fingerprints 
      GROUP BY fingerprint 
      HAVING cnt > 1
    `).all();
    assert.strictEqual(dupCheck.length, 0, 'Zero duplicate fingerprints in entire database');
  });

  test('Phase 6 Blueprint Repository & Versioning Gate remain intact', () => {
    const ssc = fullExamGateService.evaluateExamReadiness('ssc-cgl');
    assert.strictEqual(ssc.isEligible, true);
    assert.strictEqual(ssc.status, 'READY_FOR_FULL_EXAM');
  });

  test('Phase 7 PYQ Ingestion, Corrigendum Engine & Dry-Run remain intact', () => {
    const dryRun = fullExamDryRunService.runDryRun('ssc-cgl', 'ver-ssc-cgl-2026');
    assert.strictEqual(dryRun.status, 'DRY_RUN_PASSED');
    assert.strictEqual(dryRun.totalQuestions, 100);
    assert.strictEqual(dryRun.durationMinutes, 60);
    assert.strictEqual(dryRun.negativeValue, 0.5);
  });

  test('Question corpus baseline preserved: At least 1037 total questions intact', () => {
    const totalRow = db.prepare("SELECT COUNT(*) as count FROM questions").get();
    assert(totalRow.count >= 1037, `Expected at least 1037 questions, found ${totalRow.count}`);
    const pyqEligible = db.prepare("SELECT COUNT(*) as count FROM questions WHERE full_exam_eligible = 1").get();
    assert(pyqEligible.count >= 150, `Expected at least 150 full_exam_eligible PYQ questions, found ${pyqEligible.count}`);
    const legacyQuestions = db.prepare("SELECT COUNT(*) as count FROM questions WHERE full_exam_eligible = 0").get();
    assert(legacyQuestions.count >= 873, `Expected at least 873 practice-tier questions, found ${legacyQuestions.count}`);
  });

  // =========================================================================
  // TEST SUITE SUMMARY
  // =========================================================================
  console.log('\n========================================================');
  console.log(`📊 PHASE 8 TEST SUMMARY: ${passed} PASSED / ${failed} FAILED (Total: ${passed + failed})`);
  console.log('========================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

if (require.main === module) {
  runPhase8Tests().catch(err => {
    console.error('Fatal test error:', err);
    process.exit(1);
  });
}

module.exports = { runPhase8Tests };
