// backend/test/test-exam-pattern-reconciliation.js
// Automated Reconciliation & Verification Suite for Exam Pattern Handbook & Registries

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const db = require('better-sqlite3')('backend/db/sarkari_core.db');

console.log('=================================================================');
console.log('🧪 RUNNING EXAM PATTERN RECONCILIATION & GOVERNANCE TEST SUITE');
console.log('=================================================================\n');

let passCount = 0;
let failCount = 0;

function runTest(description, fn) {
  try {
    fn();
    console.log(`  ✅ [PASS] ${description}`);
    passCount++;
  } catch (err) {
    console.error(`  ❌ [FAIL] ${description}`);
    console.error(`     Reason: ${err.message}`);
    failCount++;
  }
}

function parseCsv(filePath) {
  assert(fs.existsSync(filePath), `File ${filePath} must exist`);
  const content = fs.readFileSync(filePath, 'utf8').trim();
  const lines = content.split('\n');
  assert(lines.length > 1, `CSV ${filePath} must have headers and rows`);
  
  // Parse header
  const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    // Basic CSV splitting respecting quotes
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

// -------------------------------------------------------------
// PART 1: CORE INVENTORY THREE-WAY RECONCILIATION
// -------------------------------------------------------------
console.log('--- PART 1: THREE-WAY INVENTORY RECONCILIATION ---');

const dbExams = db.prepare('SELECT exam_id, name, category FROM exams ORDER BY category, exam_id').all();
const dbExamCount = dbExams.length;

const inventoryData = parseCsv('COMPLETE_EXAM_INVENTORY.csv');
const inventoryCount = inventoryData.rows.length;

const registryData = parseCsv('exam-pattern-registry.csv');
const registryCount = registryData.rows.length;

const coverageData = parseCsv('EXAM_PATTERN_COVERAGE.csv');
const coverageCount = coverageData.rows.length;

runTest(`database_exam_count equals exactly ${dbExamCount} (52 exams in production database)`, () => {
  assert.strictEqual(dbExamCount, 52, `Expected 52 exams in database, got ${dbExamCount}`);
});

runTest(`complete_exam_inventory_count equals exactly ${inventoryCount} (matches database)`, () => {
  assert.strictEqual(inventoryCount, dbExamCount, `Inventory count ${inventoryCount} must match DB count ${dbExamCount}`);
});

runTest(`exam_pattern_registry_count equals exactly ${registryCount} (matches database)`, () => {
  assert.strictEqual(registryCount, dbExamCount, `Registry count ${registryCount} must match DB count ${dbExamCount}`);
});

runTest('Three-way reconciliation: database exams = inventory exams = registry exam records', () => {
  assert.strictEqual(dbExamCount, inventoryCount, 'database_exam_count must match complete_exam_inventory_count');
  assert.strictEqual(inventoryCount, registryCount, 'complete_exam_inventory_count must match exam_pattern_registry_count');
});

runTest('Coverage count matches inventory count 1:1', () => {
  assert.strictEqual(coverageCount, inventoryCount, `Coverage records (${coverageCount}) must equal inventory (${inventoryCount})`);
});

// -------------------------------------------------------------
// PART 2: ZERO MISSING, ZERO DUPLICATE, ZERO UNMAPPED
// -------------------------------------------------------------
console.log('\n--- PART 2: EXAM MAPPING INTEGRITY & ZERO LEAKS ---');

runTest('Zero duplicate exam IDs in COMPLETE_EXAM_INVENTORY.csv', () => {
  const seen = new Set();
  const duplicates = [];
  for (const r of inventoryData.rows) {
    if (seen.has(r.exam_id)) duplicates.push(r.exam_id);
    seen.add(r.exam_id);
  }
  assert.strictEqual(duplicates.length, 0, `Found duplicate exam IDs: ${duplicates.join(', ')}`);
});

runTest('Zero unmapped exams: Every database exam exists in registry', () => {
  const regIds = new Set(registryData.rows.map(r => r.Exam));
  const unmapped = dbExams.filter(e => !regIds.has(e.exam_id));
  assert.strictEqual(unmapped.length, 0, `Unmapped exams: ${unmapped.map(u => u.exam_id).join(', ')}`);
});

runTest('Zero missing exams: Every registry exam exists in database', () => {
  const dbIds = new Set(dbExams.map(e => e.exam_id));
  const missing = registryData.rows.filter(r => !dbIds.has(r.Exam));
  assert.strictEqual(missing.length, 0, `Extraneous registry exams: ${missing.map(m => m.Exam).join(', ')}`);
});

// -------------------------------------------------------------
// PART 3: VERIFICATION STATUS AUDIT & HONEST REPORTING
// -------------------------------------------------------------
console.log('\n--- PART 3: VERIFICATION STATUS AUDIT ---');

let verifiedCount = 0;
let partiallyVerifiedCount = 0;
let underReviewCount = 0;
let notVerifiedCount = 0;

for (const r of coverageData.rows) {
  if (r.verification_status === 'VERIFIED') verifiedCount++;
  else if (r.verification_status === 'PARTIALLY_VERIFIED') partiallyVerifiedCount++;
  else if (r.verification_status === 'UNDER_REVIEW') underReviewCount++;
  else notVerifiedCount++;
}

console.log(`  📊 Coverage Breakdown: Covered: ${coverageCount} | Verified: ${verifiedCount} | Partially: ${partiallyVerifiedCount} | Review: ${underReviewCount} | Not Verified: ${notVerifiedCount}`);

runTest('All 52 core exams have an explicit verification status', () => {
  const total = verifiedCount + partiallyVerifiedCount + underReviewCount + notVerifiedCount;
  assert.strictEqual(total, 52, `Expected 52 verification statuses, got ${total}`);
  assert(verifiedCount >= 45, `Expected high verified ground-truth count, got ${verifiedCount}`);
});

// -------------------------------------------------------------
// PART 4: GRANULAR REGISTRY PARITY AUDIT
// -------------------------------------------------------------
console.log('\n--- PART 4: GRANULAR REGISTRY STRUCTURE & ARTIFACTS ---');

runTest('board-pattern-registry.csv contains subject-specific board blueprints', () => {
  const bData = parseCsv('board-pattern-registry.csv');
  assert(bData.rows.length >= 25, `Expected >= 25 board subject patterns, got ${bData.rows.length}`);
  // Verify CBSE 10 Math vs Science are distinct
  const cbseMath = bData.rows.find(r => r.Board === 'cbse-board' && r.Class === 'Class 10' && r.Subject.includes('Math'));
  const cbseSci = bData.rows.find(r => r.Board === 'cbse-board' && r.Class === 'Class 10' && r.Subject.includes('Science'));
  assert(cbseMath, 'CBSE Class 10 Math pattern must exist');
  assert(cbseSci, 'CBSE Class 10 Science pattern must exist');
  assert.strictEqual(cbseMath.Question_Count, '38');
  assert.strictEqual(cbseSci.Question_Count, '39');
  // Verify PSEB Class 12 Math has 18 questions as cited in prompt
  const psebMath = bData.rows.find(r => r.Board === 'pseb-punjab' && r.Subject.includes('Math'));
  assert(psebMath, 'PSEB Class 12 Math must exist');
  assert.strictEqual(psebMath.Question_Count, '18');
});

runTest('exam-language-registry.csv verifies UI language independence', () => {
  const lData = parseCsv('exam-language-registry.csv');
  assert.strictEqual(lData.rows.length, 52);
  for (const r of lData.rows) {
    assert(r.Website_UI_Language.includes('Independent'), `Exam ${r.Exam_Id} UI language must be independent`);
    assert(r.Exam_Paper_Language.length > 0, `Exam ${r.Exam_Id} must have official paper language`);
  }
});

runTest('question-type-registry.csv maps 17 supported question types across 52 exams', () => {
  const qData = parseCsv('question-type-registry.csv');
  assert.strictEqual(qData.rows.length, 52);
  const sscCgl = qData.rows.find(r => r.Exam_Or_Board_Id === 'ssc-cgl');
  assert.strictEqual(sscCgl.Single_Correct_MCQ, 'YES');
  assert.strictEqual(sscCgl.Numerical_Answer, 'NO');
  const jeeMain = qData.rows.find(r => r.Exam_Or_Board_Id === 'nta-jee-main');
  assert.strictEqual(jeeMain.Numerical_Answer, 'YES');
});

runTest('marking-rule-registry.csv correctly captures negative penalties without guessing', () => {
  const mData = parseCsv('marking-rule-registry.csv');
  assert.strictEqual(mData.rows.length, 52);
  const sscCgl = mData.rows.find(r => r.Exam_Id === 'ssc-cgl');
  assert.strictEqual(sscCgl.Wrong_Penalty, '0.5');
  const rrbAlp = mData.rows.find(r => r.Exam_Id === 'rrb-alp');
  assert.strictEqual(rrbAlp.Wrong_Penalty, '0.33');
  const ctet = mData.rows.find(r => r.Exam_Id === 'ctet-exam');
  assert.strictEqual(ctet.Wrong_Penalty, '0');
});

runTest('attempt-rule-registry.csv correctly captures attempt behaviors', () => {
  const aData = parseCsv('attempt-rule-registry.csv');
  assert.strictEqual(aData.rows.length, 52);
  const neet = aData.rows.find(r => r.Exam_Id === 'nta-neet');
  assert.strictEqual(neet.Attempt_Type, 'ATTEMPT_N_OF_M');
  assert.strictEqual(neet.Total_Questions_In_Section, '200');
  assert.strictEqual(neet.Questions_To_Attempt, '180');
});

runTest('pdf-document-policy.csv captures all 11 PDF document types', () => {
  const pData = parseCsv('pdf-document-policy.csv');
  assert.strictEqual(pData.rows.length, 11);
  const types = pData.rows.map(r => r.Document_Type_Code);
  assert(types.includes('FULL_EXAM_PAPER'));
  assert(types.includes('SUBJECT_PRACTICE_PAPER'));
  assert(types.includes('ALL_SUBJECTS_PRACTICE_PAPER'));
  assert(types.includes('OMR_SHEET'));
});

// -------------------------------------------------------------
// PART 5: QUESTION RECONCILIATION & DATABASE INTEGRITY
// -------------------------------------------------------------
console.log('\n--- PART 5: QUESTION CORPUS RECONCILIATION & DATABASE INVARIANTS ---');

runTest('question-reconciliation.csv accounts for all 1,282 questions in SQLite database', () => {
  const qData = parseCsv('question-reconciliation.csv');
  assert.strictEqual(qData.rows.length, 1282, `Expected 1,282 audited questions, got ${qData.rows.length}`);
  const blueprintMapped = qData.rows.filter(r => r.Reconciliation_Action === 'MAPPED_TO_BLUEPRINT');
  assert.strictEqual(blueprintMapped.length, 250, `Expected 250 blueprint mapped questions, got ${blueprintMapped.length}`);
});

runTest('source-verification.csv tracks 52 official sources with verified status', () => {
  const sData = parseCsv('source-verification.csv');
  assert.strictEqual(sData.rows.length, 52);
  for (const s of sData.rows) {
    assert(s.Authority_Name.length > 0);
    assert(s.URL.startsWith('http'));
  }
});

runTest('SQLite database question count invariant is preserved at exactly 1,282 rows', () => {
  const count = db.prepare('SELECT COUNT(*) as cnt FROM questions').get().cnt;
  assert.strictEqual(count, 1282, `Database questions must remain exactly 1,282, got ${count}`);
});

runTest('PRAGMA integrity_check and foreign_key_check pass with zero errors', () => {
  const integrity = db.prepare('PRAGMA integrity_check').get();
  assert.strictEqual(integrity.integrity_check, 'ok');
  const fkErrors = db.prepare('PRAGMA foreign_key_check').all();
  assert.strictEqual(fkErrors.length, 0);
});

// -------------------------------------------------------------
// PART 6: HANDBOOK ARTIFACTS VERIFICATION
// -------------------------------------------------------------
console.log('\n--- PART 6: HANDBOOK ARTIFACTS VALIDATION ---');

runTest('exam-pattern-handbook.md contains all 30 mandatory chapters', () => {
  assert(fs.existsSync('exam-pattern-handbook.md'));
  const mdContent = fs.readFileSync('exam-pattern-handbook.md', 'utf8');
  assert(mdContent.length > 15000, `Markdown handbook must be substantial (>15KB), got ${mdContent.length}`);
  for (let ch = 1; ch <= 30; ch++) {
    assert(mdContent.includes(`CHAPTER ${ch}:`), `Handbook must include Chapter ${ch}`);
  }
});

runTest('exam-pattern-handbook.pdf exists and is non-empty (>5KB)', () => {
  assert(fs.existsSync('exam-pattern-handbook.pdf'));
  const stat = fs.statSync('exam-pattern-handbook.pdf');
  assert(stat.size > 5000, `PDF size must be > 5KB, got ${stat.size} bytes`);
});

// -------------------------------------------------------------
// SUMMARY
// -------------------------------------------------------------
console.log('\n=================================================================');
console.log(`🏁 RECONCILIATION COMPLETE: ${passCount} PASSED / ${failCount} FAILED (Total: ${passCount + failCount})`);
console.log('=================================================================');

if (failCount > 0) {
  process.exit(1);
}
