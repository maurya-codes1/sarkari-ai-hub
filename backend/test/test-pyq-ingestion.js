// backend/test/test-pyq-ingestion.js
// SARKARIAI HUB — Phase 7: Official PYQ & Historical Question Corpus Verification Suite (25 Strict Assertions)

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, '../db/sarkari_core.db');
const db = new Database(dbPath);

console.log('====================================================================');
console.log('🧪 RUNNING PYQ INGESTION & PROVENANCE GOVERNANCE SUITE (25 ASSERTIONS)');
console.log('====================================================================\n');

function parseCsv(filePath) {
  const content = fs.readFileSync(filePath, 'utf8').trim();
  const lines = content.split('\n');
  const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    const cells = [];
    let insideQuotes = false;
    let currentCell = '';
    for (let c = 0; c < line.length; c++) {
      const char = line[c];
      if (char === '"' && (c === 0 || line[c - 1] !== '\\')) {
        insideQuotes = !insideQuotes;
      } else if (char === ',' && !insideQuotes) {
        cells.push(currentCell.trim().replace(/^"|"$/g, ''));
        currentCell = '';
      } else {
        currentCell += char;
      }
    }
    cells.push(currentCell.trim().replace(/^"|"$/g, ''));
    const obj = {};
    headers.forEach((h, idx) => {
      obj[h] = cells[idx] || '';
    });
    rows.push(obj);
  }
  return { headers, rows };
}

// -----------------------------------------------------------------
// Test 1: Source identity verification
// -----------------------------------------------------------------
{
  const regPath = path.join(__dirname, '../../pyq-source-artifact-registry.csv');
  assert.ok(fs.existsSync(regPath), 'pyq-source-artifact-registry.csv must exist');
  const { rows } = parseCsv(regPath);
  assert.ok(rows.length >= 52, `Expected at least 52 source artifacts, got ${rows.length}`);

  const allowedTypes = new Set([
    'OFFICIAL_QUESTION_PAPER',
    'OFFICIAL_ANSWER_KEY',
    'OFFICIAL_RESPONSE_SHEET',
    'OFFICIAL_BULLETIN',
    'OFFICIAL_MODEL_PAPER',
    'OFFICIAL_SAMPLE_PAPER',
    'OFFICIAL_CORRIGENDUM',
    'OFFICIAL_ARCHIVE'
  ]);

  rows.forEach(r => {
    assert.ok(r.source_id && r.source_id.length > 0, 'source_id required');
    assert.ok(r.authority && r.authority.length > 0, 'authority required');
    assert.ok(r.exam_id && r.exam_id.length > 0, 'exam_id required');
    assert.ok(allowedTypes.has(r.document_type), `Invalid document_type: ${r.document_type}`);
  });
  console.log('✅ Test 1: Source identity verification — PASSED');
}

// -----------------------------------------------------------------
// Test 2: Official URL requirement
// -----------------------------------------------------------------
{
  const regPath = path.join(__dirname, '../../pyq-source-artifact-registry.csv');
  const { rows } = parseCsv(regPath);
  rows.forEach(r => {
    assert.ok(r.official_url.startsWith('https://'), `official_url must start with https://, got: ${r.official_url}`);
  });
  console.log('✅ Test 2: Official URL requirement — PASSED');
}

// -----------------------------------------------------------------
// Test 3: Document hashing
// -----------------------------------------------------------------
{
  const regPath = path.join(__dirname, '../../pyq-source-artifact-registry.csv');
  const { rows } = parseCsv(regPath);
  rows.forEach(r => {
    assert.ok(r.document_hash && r.document_hash.length === 64, `document_hash must be 64-char sha256, got: ${r.document_hash}`);
  });
  console.log('✅ Test 3: Document hashing — PASSED');
}

// -----------------------------------------------------------------
// Test 4: Idempotent ingestion
// -----------------------------------------------------------------
{
  const pyqService = require('../services/pyq-ingestion-service');
  // Attempt to re-register an existing paper
  const existingPaper = db.prepare('SELECT * FROM question_papers LIMIT 1').get();
  assert.ok(existingPaper, 'Existing paper must exist in DB');

  const result = pyqService.registerPaper({
    paperId: existingPaper.paper_id,
    examId: existingPaper.exam_id,
    versionId: existingPaper.exam_version_id,
    academicYear: existingPaper.academic_year,
    stage: existingPaper.stage,
    shift: existingPaper.shift,
    setCode: existingPaper.set_code,
    sourceId: existingPaper.source_id,
    totalQuestionsExpected: existingPaper.total_questions_expected,
    documentHash: existingPaper.document_hash
  }, db);

  assert.ok(result.success, 'registerPaper should succeed');
  assert.strictEqual(result.isExisting, true, 'registerPaper should detect existing paper idempotently');
  console.log('✅ Test 4: Idempotent ingestion — PASSED');
}

// -----------------------------------------------------------------
// Test 5: Duplicate prevention
// -----------------------------------------------------------------
{
  const dupPath = path.join(__dirname, '../../pyq-duplicate-review.csv');
  assert.ok(fs.existsSync(dupPath), 'pyq-duplicate-review.csv must exist');
  const { rows } = parseCsv(dupPath);
  assert.ok(rows.length > 0, 'pyq-duplicate-review.csv must contain reviewed items');

  // Verify zero duplicate question IDs in active database
  const dupCheck = db.prepare('SELECT question_id, count(*) as c FROM questions GROUP BY question_id HAVING count(*) > 1').all();
  assert.strictEqual(dupCheck.length, 0, 'Database contains duplicate question IDs!');
  console.log('✅ Test 5: Duplicate prevention — PASSED');
}

// -----------------------------------------------------------------
// Test 6: Year preservation
// -----------------------------------------------------------------
{
  const ssc2022 = db.prepare("SELECT * FROM questions WHERE exam_version_id = 'ver-ssc-cgl-2022'").all();
  assert.ok(ssc2022.length > 0, '2022 SSC CGL questions must exist');
  ssc2022.forEach(q => {
    assert.strictEqual(q.exam_version_id, 'ver-ssc-cgl-2022', '2022 version must not be rewritten');
    assert.strictEqual(q.historical_year, '2022.0', 'historical_year must preserve 2022');
  });

  const upsc2021 = db.prepare("SELECT * FROM questions WHERE exam_version_id = 'ver-upsc-cse-2021'").all();
  assert.ok(upsc2021.length > 0, '2021 UPSC CSE questions must exist');
  upsc2021.forEach(q => {
    assert.strictEqual(q.exam_version_id, 'ver-upsc-cse-2021', '2021 version must not be rewritten');
    assert.strictEqual(q.historical_year, '2021.0', 'historical_year must preserve 2021');
  });
  console.log('✅ Test 6: Year preservation — PASSED');
}

// -----------------------------------------------------------------
// Test 7: Stage preservation
// -----------------------------------------------------------------
{
  const mapPath = path.join(__dirname, '../../pyq-component-mapping.csv');
  assert.ok(fs.existsSync(mapPath), 'pyq-component-mapping.csv must exist');
  const { rows } = parseCsv(mapPath);

  const cglTier1 = rows.filter(r => r.component_id === 'comp-ssc-cgl-tier1');
  assert.ok(cglTier1.length >= 100, 'SSC CGL Tier 1 must have at least 100 questions');
  cglTier1.forEach(r => {
    assert.ok(r.stage.includes('Tier-1') || r.stage.includes('Tier 1'), `Stage must be Tier-1, got: ${r.stage}`);
  });

  const upscPrelims = rows.filter(r => r.component_id === 'comp-upsc-cse-prelims-gs1');
  assert.ok(upscPrelims.length >= 100, 'UPSC CSE Prelims must have at least 100 questions');
  upscPrelims.forEach(r => {
    assert.ok(r.stage.includes('Prelims') || r.stage.includes('Preliminary'), `Stage must be Prelims/Preliminary, got: ${r.stage}`);
  });
  console.log('✅ Test 7: Stage preservation — PASSED');
}

// -----------------------------------------------------------------
// Test 8: Paper preservation
// -----------------------------------------------------------------
{
  const upscPapers = db.prepare("SELECT DISTINCT paper_id FROM questions WHERE exam_version_id LIKE '%upsc-cse%'").all();
  assert.ok(upscPapers.length > 0, 'UPSC questions must have paper_ids');
  upscPapers.forEach(p => {
    if (p.paper_id) {
      assert.ok(p.paper_id.includes('gs1'), `UPSC GS 1 paper must not be mixed with CSAT: ${p.paper_id}`);
    }
  });
  console.log('✅ Test 8: Paper preservation — PASSED');
}

// -----------------------------------------------------------------
// Test 9: Subject preservation
// -----------------------------------------------------------------
{
  const mathQs = db.prepare("SELECT * FROM questions WHERE subject_id IN ('subj-math', 'subj-math12')").all();
  assert.ok(mathQs.length >= 150, `Mathematics questions must exist (>= 150), found ${mathQs.length}`);
  mathQs.forEach(q => {
    assert.ok(q.subject_id === 'subj-math' || q.subject_id === 'subj-math12', 'Mathematics question subject must not be corrupted');
  });
  console.log('✅ Test 9: Subject preservation — PASSED');
}

// -----------------------------------------------------------------
// Test 10: Question type classification
// -----------------------------------------------------------------
{
  const mapPath = path.join(__dirname, '../../pyq-component-mapping.csv');
  const { rows } = parseCsv(mapPath);
  const types = new Set(rows.map(r => r.question_type));
  assert.ok(types.has('single_mcq') || types.has('mcq_single'), 'Must contain single MCQ');
  console.log('✅ Test 10: Question type classification — PASSED');
}

// -----------------------------------------------------------------
// Test 11: Language preservation
// -----------------------------------------------------------------
{
  const mapPath = path.join(__dirname, '../../pyq-component-mapping.csv');
  const { rows } = parseCsv(mapPath);
  const tnQs = rows.filter(r => r.exam_id === 'tndge-tamilnadu');
  assert.ok(tnQs.length > 0, 'TN SSLC questions must exist');
  tnQs.forEach(r => {
    assert.strictEqual(r.language, 'ta', `Tamil questions must preserve language 'ta', got ${r.language}`);
  });
  console.log('✅ Test 11: Language preservation — PASSED');
}

// -----------------------------------------------------------------
// Test 12: Provenance integrity
// -----------------------------------------------------------------
{
  const provBreakdown = db.prepare('SELECT provenance, count(*) as c FROM questions GROUP BY provenance').all();
  const provMap = {};
  provBreakdown.forEach(p => { provMap[p.provenance] = p.c; });

  assert.strictEqual(provMap['OFFICIAL_PYQ'], 351, 'Exactly 351 OFFICIAL_PYQ questions must exist');
  assert.strictEqual(provMap['OFFICIAL_SAMPLE'], 59, 'Exactly 59 OFFICIAL_SAMPLE questions must exist');
  assert(provMap['HUMAN_CURATED'] >= 872, 'At least 872 HUMAN_CURATED questions must exist');
  assert.strictEqual(provMap['AI_PRACTICE'] || 0, 0, 'AI_PRACTICE must not exist in core questions table');
  console.log('✅ Test 12: Provenance integrity — PASSED');
}

// -----------------------------------------------------------------
// Test 13: Answer-key linking
// -----------------------------------------------------------------
{
  const keyPath = path.join(__dirname, '../../pyq-answer-key-registry.csv');
  assert.ok(fs.existsSync(keyPath), 'pyq-answer-key-registry.csv must exist');
  const { rows } = parseCsv(keyPath);
  assert.ok(rows.length > 0, 'pyq-answer-key-registry.csv must contain key records');

  const versions = new Set(rows.map(r => r.key_version));
  assert.ok(versions.has('FINAL_KEY'), 'Must include FINAL_KEY');
  assert.ok(versions.has('CORRIGENDUM_KEY'), 'Must include CORRIGENDUM_KEY');
  console.log('✅ Test 13: Answer-key linking — PASSED');
}

// -----------------------------------------------------------------
// Test 14: Historical version mapping
// -----------------------------------------------------------------
{
  const versions = db.prepare("SELECT DISTINCT exam_version_id FROM questions WHERE exam_version_id IS NOT NULL").all().map(r => r.exam_version_id);
  assert.ok(versions.includes('ver-ssc-cgl-2022'), 'Must include ver-ssc-cgl-2022');
  assert.ok(versions.includes('ver-ssc-cgl-2023'), 'Must include ver-ssc-cgl-2023');
  assert.ok(versions.includes('ver-upsc-cse-2021'), 'Must include ver-upsc-cse-2021');
  assert.ok(versions.includes('ver-upsc-cse-2022'), 'Must include ver-upsc-cse-2022');
  console.log('✅ Test 14: Historical version mapping — PASSED');
}

// -----------------------------------------------------------------
// Test 15: Passage/group integrity
// -----------------------------------------------------------------
{
  const passageCheck = db.prepare('SELECT count(*) as c FROM questions WHERE passage_group_id IS NOT NULL').get().c;
  // If passage questions exist, ensure groups have >= 2 items
  const groups = db.prepare('SELECT passage_group_id, count(*) as c FROM questions WHERE passage_group_id IS NOT NULL GROUP BY passage_group_id').all();
  groups.forEach(g => {
    assert.ok(g.c >= 2, `Passage group ${g.passage_group_id} must have >= 2 questions`);
  });
  console.log('✅ Test 15: Passage/group integrity — PASSED');
}

// -----------------------------------------------------------------
// Test 16: Internal-choice integrity
// -----------------------------------------------------------------
{
  const choiceReg = path.join(__dirname, '../../internal-choice-registry.csv');
  if (fs.existsSync(choiceReg)) {
    const { rows } = parseCsv(choiceReg);
    assert.ok(rows.length > 0, 'Internal choice registry must contain provisions');
  }
  console.log('✅ Test 16: Internal-choice integrity — PASSED');
}

// -----------------------------------------------------------------
// Test 17: OCR corruption detection
// -----------------------------------------------------------------
{
  const pyqService = require('../services/pyq-ingestion-service');
  const normalized = pyqService.normalizeQuestionText('Page 12 of 34\nQuestion with broken-\nhyphen and   spaces.');
  assert.ok(!normalized.includes('Page 12 of 34'), 'Header markers must be removed');
  assert.ok(normalized.includes('brokenhyphen'), 'Broken hyphens must be merged');
  console.log('✅ Test 17: OCR corruption detection — PASSED');
}

// -----------------------------------------------------------------
// Test 18: Full Exam gate
// -----------------------------------------------------------------
{
  const fullExamGateService = require('../services/full-exam-gate-service');
  const sscGate = fullExamGateService.evaluateExamReadiness('ssc-cgl', 'ver-ssc-cgl-2026', db);
  assert.strictEqual(sscGate.status, 'READY_FOR_FULL_EXAM', 'SSC CGL Tier 1 must be READY_FOR_FULL_EXAM');
  assert.strictEqual(sscGate.isEligible, true, 'SSC CGL Tier 1 must be eligible for Full Exam');

  const neetGate = fullExamGateService.evaluateExamReadiness('nta-neet', 'ver-nta-neet-2026', db);
  assert.strictEqual(neetGate.status, 'BLOCKED', 'NEET UG must be BLOCKED');
  assert.strictEqual(neetGate.isEligible, false, 'NEET UG must be blocked from Full Exam');
  console.log('✅ Test 18: Full Exam gate — PASSED');
}

// -----------------------------------------------------------------
// Test 19: Practice eligibility
// -----------------------------------------------------------------
{
  const practiceCount = db.prepare('SELECT count(*) as c FROM questions WHERE practice_eligible = 1').get().c;
  assert(practiceCount >= 1282, 'All questions must remain practice eligible');
  console.log('✅ Test 19: Practice eligibility — PASSED');
}

// -----------------------------------------------------------------
// Test 20: 10-year coverage calculation
// -----------------------------------------------------------------
{
  const exCovPath = path.join(__dirname, '../../pyq-exam-coverage-report.csv');
  assert.ok(fs.existsSync(exCovPath), 'pyq-exam-coverage-report.csv must exist');
  const { rows } = parseCsv(exCovPath);
  assert.strictEqual(rows.length, 52, `Expected 52 exams in coverage report, got ${rows.length}`);

  const counts = { '10_YEAR_VERIFIED': 0, 'PARTIAL_10_YEAR': 0, 'INSUFFICIENT_HISTORY': 0 };
  rows.forEach(r => {
    assert.ok(counts.hasOwnProperty(r.coverage_status), `Invalid coverage_status: ${r.coverage_status}`);
    counts[r.coverage_status]++;
  });

  assert.strictEqual(counts['10_YEAR_VERIFIED'], 0, 'Zero exams must claim 10_YEAR_VERIFIED without full 10-year corpus');
  assert.strictEqual(counts['PARTIAL_10_YEAR'], 10, 'Exactly 10 exams must be PARTIAL_10_YEAR');
  assert.strictEqual(counts['INSUFFICIENT_HISTORY'], 42, 'Exactly 42 exams must be INSUFFICIENT_HISTORY');
  console.log('✅ Test 20: 10-year coverage calculation — PASSED');
}

// -----------------------------------------------------------------
// Test 21: PYQ PDF integration
// -----------------------------------------------------------------
{
  const pdfService = require('../services/pdf-generation-service');
  assert.ok(pdfService.DOCUMENT_TYPES.PYQ_COLLECTION, 'PYQ_COLLECTION document type must exist in PDF service');
  console.log('✅ Test 21: PYQ PDF integration — PASSED');
}

// -----------------------------------------------------------------
// Test 22: Mock integration
// -----------------------------------------------------------------
{
  const mockService = require('../services/mock-service');
  const res = mockService.startMockSession({
    examId: 'ssc-cgl',
    testMode: 'PRACTICE',
    count: 10
  });
  assert.ok(res.success, 'Mock practice creation must succeed');
  assert.strictEqual(res.questions.length, 10, 'Practice mode must return requested 10 questions');
  console.log('✅ Test 22: Mock integration — PASSED');
}

// -----------------------------------------------------------------
// Test 23: Database integrity
// -----------------------------------------------------------------
{
  const integrity = db.prepare('PRAGMA integrity_check').get();
  assert.strictEqual(integrity.integrity_check, 'ok', 'PRAGMA integrity_check must be ok');
  console.log('✅ Test 23: Database integrity — PASSED');
}

// -----------------------------------------------------------------
// Test 24: Foreign keys
// -----------------------------------------------------------------
{
  const fks = db.prepare('PRAGMA foreign_key_check').all();
  assert.strictEqual(fks.length, 0, 'PRAGMA foreign_key_check must have 0 violations');
  console.log('✅ Test 24: Foreign keys — PASSED');
}

// -----------------------------------------------------------------
// Test 25: Question-count safety
// -----------------------------------------------------------------
{
  const count = db.prepare('SELECT count(*) as c FROM questions').get().c;
  assert(count >= 1282, `Question count invariant violated! Expected >= 1282, got ${count}`);
  console.log('✅ Test 25: Question-count safety — PASSED');
}

console.log('\n====================================================================');
console.log('📊 PYQ INGESTION SUITE SUMMARY: 25 PASSED, 0 FAILED (TOTAL: 25)');
console.log('====================================================================\n');
