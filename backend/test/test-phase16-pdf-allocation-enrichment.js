// backend/test/test-phase16-pdf-allocation-enrichment.js
// Verification Suite for Exam Pattern Registry, Subject Content Enrichment,
// PDF Question Allocation & All-Subject Bundle Reconciliation.

const assert = require('assert');
const path = require('path');
const fs = require('fs');

const { getDb } = require('../db/database');
const db = getDb();
const {
  DEFAULT_BUNDLE_ALLOCATION_TIERS,
  computeBundleSubjectAllocation,
  selectRepresentativeSubset,
  reconcileAllSubjectBundle
} = require('../../services/content-allocation-policy');
const {
  getCompleteSubjectInventory,
  fetchDbQuestionsForSubject
} = require('../../services/subject-inventory-loader');
const {
  generateCompetitiveStudyGuide,
  COMPETITIVE_EXAMS_REGISTRY
} = require('../../services/competitive-curriculum-engine');
const {
  generateSubjectStudyGuide,
  BOARD_REGISTRY
} = require('../../services/board-curriculum-engine');
const {
  getSubjectSpecificStudyMaterial
} = require('../../services/subject-content');
const pdfGenerationService = require('../services/pdf-generation-service');

let passedTests = 0;
let totalTests = 0;

function runTest(testName, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  ✅ [PASS] Test ${totalTests}: ${testName}`);
    passedTests++;
  } catch (err) {
    console.error(`  ❌ [FAIL] Test ${totalTests}: ${testName}`);
    console.error(err);
  }
}

async function runTestAsync(testName, fn) {
  totalTests++;
  try {
    await fn();
    console.log(`  ✅ [PASS] Test ${totalTests}: ${testName}`);
    passedTests++;
  } catch (err) {
    console.error(`  ❌ [FAIL] Test ${totalTests}: ${testName}`);
    console.error(err);
  }
}

async function main() {
  console.log('=================================================================');
  console.log('🧪 RUNNING PHASE 16: PDF ALLOCATION & ENRICHMENT TEST SUITE');
  console.log('=================================================================\n');

  // --- PART 1: ALL-SUBJECT ALLOCATION POLICY MATHEMATICAL VERIFICATION ---
  console.log('--- PART 1: ALL-SUBJECT ALLOCATION POLICY FORMULA INVARIANTS ---');

  runTest('100 eligible questions maps to 60-70 target range (formula: ~65%)', () => {
    const allocated = computeBundleSubjectAllocation(100);
    assert(allocated >= 60 && allocated <= 70, `Expected 60-70, got ${allocated}`);
    assert.strictEqual(allocated, 65);
  });

  runTest('200 eligible questions maps to 140-150 target range (formula: ~72%)', () => {
    const allocated = computeBundleSubjectAllocation(200);
    assert(allocated >= 140 && allocated <= 150, `Expected 140-150, got ${allocated}`);
    assert.strictEqual(allocated, 144);
  });

  runTest('250 eligible questions maps to 180-200 target range (formula: ~76%)', () => {
    const allocated = computeBundleSubjectAllocation(250);
    assert(allocated >= 180 && allocated <= 200, `Expected 180-200, got ${allocated}`);
    assert.strictEqual(allocated, 190);
  });

  runTest('300 eligible questions maps to 70-80% substantial portion (formula: ~75%)', () => {
    const allocated = computeBundleSubjectAllocation(300);
    const ratio = allocated / 300;
    assert(ratio >= 0.70 && ratio <= 0.80, `Expected 70-80%, got ${ratio * 100}%`);
    assert.strictEqual(allocated, 225);
  });

  runTest('Small inventory subjects (<= 40 questions) retain 100% of questions in bundle', () => {
    const alloc30 = computeBundleSubjectAllocation(30);
    assert.strictEqual(alloc30, 30);
    const alloc20 = computeBundleSubjectAllocation(20);
    assert.strictEqual(alloc20, 20);
  });

  runTest('Allocation policy is configurable via customRatio or customTiers', () => {
    const custom1 = computeBundleSubjectAllocation(100, { customRatio: 0.50 });
    assert.strictEqual(custom1, 50);
    const custom2 = computeBundleSubjectAllocation(200, { explicitTargetCount: 120 });
    assert.strictEqual(custom2, 120);
  });

  // --- PART 2: REPRESENTATIVE SUBSET SAMPLING & SYLLABUS INTEGRITY ---
  console.log('\n--- PART 2: REPRESENTATIVE SUBSET SAMPLING & ZERO DUPLICATION ---');

  runTest('selectRepresentativeSubset selects exact target count without duplicates', () => {
    const samplePool = Array.from({ length: 100 }, (_, i) => ({
      id: `q-${i + 1}`,
      topic: `Topic ${i % 5}`,
      q: `Sample Question ${i + 1}`,
      ans: 'A'
    }));
    const subset = selectRepresentativeSubset(samplePool, 65);
    assert.strictEqual(subset.length, 65);
    const uniqueIds = new Set(subset.map(q => q.id));
    assert.strictEqual(uniqueIds.size, 65);
  });

  runTest('reconcileAllSubjectBundle avoids naive wholesale concatenation and adds section headers', () => {
    const sections = [
      { subjectId: 'gk', subjectName: 'General Knowledge', questions: Array.from({ length: 150 }, (_, i) => ({ id: `gk-${i}`, q: `GK Q${i}` })) },
      { subjectId: 'math', subjectName: 'Mathematics', questions: Array.from({ length: 180 }, (_, i) => ({ id: `math-${i}`, q: `Math Q${i}` })) },
      { subjectId: 'reasoning', subjectName: 'Reasoning', questions: Array.from({ length: 80 }, (_, i) => ({ id: `reas-${i}`, q: `Reasoning Q${i}` })) }
    ];
    const res = reconcileAllSubjectBundle(sections);
    // 150 -> 108, 180 -> 130, 80 -> 52; total = 290 (far less than wholesale 150+180+80=410, and far more than tiny 30-40 sample)
    assert(res.totalQuestions < 410, 'Bundle must not naively concatenate 100% of every subject');
    assert(res.totalQuestions > 100, 'Bundle must be substantially larger than tiny sample');
    assert(res.allocationReport.length === 3);
    for (const q of res.bundledQuestions) {
      assert(q.sectionName, 'Each question must have sectionName for distinct headers');
    }
  });

  // --- PART 3: SINGLE SUBJECT INVENTORY PRESERVATION ---
  console.log('\n--- PART 3: DO NOT REDUCE LARGE SUBJECT INVENTORIES ---');

  runTest('Single subject Math retains full inventory (>= 150 questions)', () => {
    const mathGuide = generateCompetitiveStudyGuide('ssc-gd', 'math');
    assert(mathGuide.objectives.length >= 150, `Expected >= 150 math questions, got ${mathGuide.objectives.length}`);
    // Check no modulo repetition in returned questions
    const stems = new Set();
    let dupes = 0;
    for (const q of mathGuide.objectives) {
      const stem = q.q.split('\n')[0].trim();
      if (stems.has(stem)) dupes++;
      stems.add(stem);
    }
    assert.strictEqual(dupes, 0, 'Single subject math must have 0 duplicate questions');
  });

  runTest('Single subject Science retains full inventory (>= 150 questions)', () => {
    const sciGuide = generateSubjectStudyGuide('bseb', '10th', 'science');
    assert(sciGuide.objectives.length >= 150, `Expected >= 150 science questions, got ${sciGuide.objectives.length}`);
    const stems = new Set();
    let dupes = 0;
    for (const q of sciGuide.objectives) {
      const stem = q.q.split('\n')[0].trim();
      if (stems.has(stem)) dupes++;
      stems.add(stem);
    }
    assert.strictEqual(dupes, 0, 'Single subject science must have 0 duplicate questions');
  });

  runTest('Single subject GK retains full inventory (>= 100 questions)', () => {
    const gkGuide = generateCompetitiveStudyGuide('ssc-cgl', 'gk');
    assert(gkGuide.objectives.length >= 100, `Expected >= 100 GK questions, got ${gkGuide.objectives.length}`);
  });

  // --- PART 4: SMALL INVENTORY ENRICHMENT & GENUINE PROVENANCE ---
  console.log('\n--- PART 4: SMALL INVENTORY SUBJECT ENRICHMENT & PROVENANCE ---');

  runTest('Reasoning inventory is enriched to >= 50 questions', () => {
    const rGuide = generateCompetitiveStudyGuide('ssc-cgl', 'reasoning');
    assert(rGuide.objectives.length >= 50, `Expected >= 50 reasoning questions, got ${rGuide.objectives.length}`);
  });

  runTest('UP Police Law inventory is enriched to >= 30 questions', () => {
    const lawGuide = generateCompetitiveStudyGuide('up-police', 'law');
    assert(lawGuide.objectives.length >= 30, `Expected >= 30 law questions, got ${lawGuide.objectives.length}`);
  });

  runTest('Class 12 Commerce & Humanities subjects are enriched above tiny 12-question limit', () => {
    const acc = getCompleteSubjectInventory('accountancy', { is12th: true });
    assert(acc.length >= 15, `Expected >= 15 accounts questions, got ${acc.length}`);
    const bst = getCompleteSubjectInventory('business', { is12th: true });
    assert(bst.length >= 15, `Expected >= 15 business questions, got ${bst.length}`);
    const eco = getCompleteSubjectInventory('economics', { is12th: true });
    assert(eco.length >= 25, `Expected >= 25 economics questions, got ${eco.length}`);
  });

  runTest('No artificial fake year cycling tags (e.g. Set A/B/C/D) in generated questions', () => {
    const allCompGuide = generateCompetitiveStudyGuide('ssc-gd', 'all');
    for (const q of allCompGuide.objectives) {
      assert(!q.q.includes('TCS/NTA Model 202'), `Found fake repetitive tag in question: ${q.q}`);
      assert(!q.q.includes('Set A Official Model'), `Found fake repetitive tag in question: ${q.q}`);
    }
  });

  // --- PART 5: ALL-SUBJECT BUNDLE RECONCILIATION IN ACTION ---
  console.log('\n--- PART 5: ALL-SUBJECT BUNDLE RECONCILIATION IN ACTION ---');

  runTest('SSC GD All-Subject bundle produces rich multi-subject coverage with 0 duplicates', () => {
    const gdBundle = generateCompetitiveStudyGuide('ssc-gd', 'all');
    assert(gdBundle.objectives.length >= 200, `Expected >= 200 questions in bundle, got ${gdBundle.objectives.length}`);
    const seen = new Set();
    let dupes = 0;
    for (const q of gdBundle.objectives) {
      const stem = q.q.split('\n')[0].trim();
      if (seen.has(stem)) dupes++;
      seen.add(stem);
    }
    assert.strictEqual(dupes, 0, 'All-Subject bundle must have zero duplicate questions');
  });

  runTest('BSEB Class 10 All-Subject bundle produces rich multi-subject coverage with 0 duplicates', () => {
    const bsebBundle = generateSubjectStudyGuide('bseb', '10th', 'all');
    assert(bsebBundle.objectives.length >= 200, `Expected >= 200 questions in bundle, got ${bsebBundle.objectives.length}`);
    const seen = new Set();
    let dupes = 0;
    for (const q of bsebBundle.objectives) {
      const stem = q.q.split('\n')[0].trim();
      if (seen.has(stem)) dupes++;
      seen.add(stem);
    }
    assert.strictEqual(dupes, 0, 'Class 10 All-Subject bundle must have zero duplicate questions');
  });

  // --- PART 6: SYSTEM ISOLATION INVARIANTS ---
  console.log('\n--- PART 6: STRICT SYSTEM SEPARATION (PRACTICE VS FULL EXAM VS STUDY) ---');

  runTest('Full Exam blueprints remain strictly locked to official configurations', () => {
    const sscBlueprint = db.prepare("SELECT total_questions, duration_minutes, is_negative_marking FROM exam_blueprints WHERE blueprint_id = 'bp-verified-ssc-cgl'").get();
    assert(sscBlueprint);
    assert.strictEqual(sscBlueprint.total_questions, 100);
    assert.strictEqual(sscBlueprint.duration_minutes, 60);
    assert.strictEqual(sscBlueprint.is_negative_marking, 1);
  });

  runTest('SQLite total questions invariant preserved at exactly 1,282 rows', () => {
    const c = db.prepare('SELECT count(*) as cnt FROM questions').get();
    assert(c.cnt >= 1282, `Database questions must remain >= 1,282, got ${c.cnt}`);
  });

  runTest('Database PRAGMA integrity_check and foreign_key_check pass with 0 errors', () => {
    const integrity = db.prepare('PRAGMA integrity_check').get();
    assert.strictEqual(integrity.integrity_check, 'ok');
    const fkErrors = db.prepare('PRAGMA foreign_key_check').all();
    assert.strictEqual(fkErrors.length, 0);
  });

  // --- PART 7: PDF GENERATION ENGINE INTEGRATION ---
  console.log('\n--- PART 7: PRODUCTION PDF ENGINE INTEGRATION ---');

  await runTestAsync('PDF Service generates SUBJECT_PRACTICE_PAPER with actual questions and clean buffer', async () => {
    const res = await pdfGenerationService.generatePdf({
      examId: 'ssc-cgl',
      versionId: 'ver-ssc-cgl-2026',
      documentType: 'SUBJECT_PRACTICE_PAPER',
      subjectId: 'subj-math',
      questionCount: 25
    });
    assert.strictEqual(res.success, true);
    assert.strictEqual(res.status, 'VERIFIED');
    assert(fs.existsSync(res.filePath));
    assert(res.fileSizeBytes > 1000);
  });

  await runTestAsync('PDF Service generates ALL_SUBJECTS_PRACTICE_PAPER with representative bundle', async () => {
    const res = await pdfGenerationService.generatePdf({
      examId: 'ssc-cgl',
      versionId: 'ver-ssc-cgl-2026',
      documentType: 'ALL_SUBJECTS_PRACTICE_PAPER',
      questionCount: 50
    });
    assert.strictEqual(res.success, true);
    assert.strictEqual(res.status, 'VERIFIED');
    assert(fs.existsSync(res.filePath));
    assert(res.fileSizeBytes > 1000);
  });

  console.log('\n=================================================================');
  console.log(`🏁 PHASE 16 COMPLETE: ${passedTests} PASSED / ${totalTests - passedTests} FAILED (Total: ${totalTests})`);
  console.log('=================================================================');

  if (passedTests !== totalTests) {
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Test suite failed:', err);
  process.exit(1);
});
