// backend/test/test-question-gap-closure.js
// Automated Test Suite for Question Gap Closure & Reconciliation Verification
// Validates 10 core assertions specified in Section 41 of Phase Final Question Gap Closure

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { getDb } = require('../db/database');

const ROOT_DIR = path.resolve(__dirname, '../../');
const REPORT_PATH = path.join(ROOT_DIR, 'question-pattern-mapping-report.csv');
const READINESS_PATH = path.join(ROOT_DIR, 'component-question-readiness.csv');
const CONFLICTS_PATH = path.join(ROOT_DIR, 'question-mapping-conflicts.csv');
const BOARD_AUDIT_PATH = path.join(ROOT_DIR, 'board-subject-coverage-audit.csv');

function parseCSV(filePath) {
  const content = fs.readFileSync(filePath, 'utf8').trim();
  const lines = content.split('\n');
  const header = parseCSVLine(lines[0]);
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const rawLine = lines[i].trim();
    if (!rawLine) continue;
    const values = parseCSVLine(rawLine);
    const row = {};
    for (let j = 0; j < header.length; j++) {
      row[header[j]] = values[j] !== undefined ? values[j] : '';
    }
    rows.push(row);
  }
  return { header, rows };
}

function parseCSVLine(line) {
  const values = [];
  let inQuotes = false;
  let current = '';
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      values.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  values.push(current);
  return values;
}

console.log('====================================================================');
console.log('🧪 RUNNING QUESTION GAP CLOSURE TEST SUITE (10 ASSERTIONS)');
console.log('====================================================================\n');

const db = getDb();
let passed = 0;
let failed = 0;

function runTest(testNum, testName, fn) {
  try {
    fn();
    console.log(`✅ Test ${testNum}: ${testName} — PASSED`);
    passed++;
  } catch (err) {
    console.error(`❌ Test ${testNum}: ${testName} — FAILED:`, err.message);
    failed++;
  }
}

const mappingReport = parseCSV(REPORT_PATH);
const readinessReport = parseCSV(READINESS_PATH);
const conflictsReport = parseCSV(CONFLICTS_PATH);
const boardAudit = parseCSV(BOARD_AUDIT_PATH);

// 1. 1,282 actual question count
runTest(1, 'Actual question count in database is exactly 1,282', () => {
  const countRow = db.prepare('SELECT COUNT(*) as c FROM questions').get();
  assert.strictEqual(countRow.c, 1282, `Database question count must be 1282, got ${countRow.c}`);
});

// 2. 1,282 reconciled rows
runTest(2, 'Exactly 1,282 reconciled rows in question-pattern-mapping-report.csv', () => {
  assert.strictEqual(mappingReport.rows.length, 1282, `Expected 1282 reconciliation rows, got ${mappingReport.rows.length}`);
});

// 3. 36 partial group resolution
runTest(3, '36 partial group resolution: Class 12 Humanities questions safely isolated', () => {
  const his = mappingReport.rows.filter(r => r.question_id.startsWith('q-c12-his'));
  const pol = mappingReport.rows.filter(r => r.question_id.startsWith('q-c12-pol'));
  const geo = mappingReport.rows.filter(r => r.question_id.startsWith('q-c12-geo'));
  const humanitiesTotal = his.length + pol.length + geo.length;

  assert.strictEqual(his.length, 12, `Expected 12 History questions, got ${his.length}`);
  assert.strictEqual(pol.length, 12, `Expected 12 Political Science questions, got ${pol.length}`);
  assert.strictEqual(geo.length, 12, `Expected 12 Geography questions, got ${geo.length}`);
  assert.strictEqual(humanitiesTotal, 36, `Expected exactly 36 humanities questions, got ${humanitiesTotal}`);

  // Verify none are erroneously promoted to FULL_EXAM_ELIGIBLE
  for (const q of [...his, ...pol, ...geo]) {
    assert.strictEqual(q.mapping_status, 'PARTIALLY_MAPPED', `Question ${q.question_id} must have status PARTIALLY_MAPPED`);
    assert.strictEqual(q.eligibility_status, 'PRACTICE_ELIGIBLE', `Question ${q.question_id} must have status PRACTICE_ELIGIBLE`);
    assert.notStrictEqual(q.eligibility_status, 'FULL_EXAM_ELIGIBLE', `Question ${q.question_id} must NEVER be FULL_EXAM_ELIGIBLE`);
  }

  // Verify documented in board-subject-coverage-audit.csv
  const cbseHumRows = boardAudit.rows.filter(r => r.board === 'cbse-board' && r.stream === 'Humanities');
  assert.strictEqual(cbseHumRows.length, 4, `Expected 4 CBSE Humanities rows in board-subject-coverage-audit.csv, got ${cbseHumRows.length}`);
  const pendingSpecimen = cbseHumRows.filter(r => r.registry_present === 'PENDING_SAMPLE_SPECIMEN' || r.blueprint_present === 'PARTIALLY_MAPPED');
  assert.strictEqual(pendingSpecimen.length, 3, `Expected 3 pending sample specimen rows (His, Pol, Geo), got ${pendingSpecimen.length}`);
});

// 4. No silent question loss
runTest(4, 'No silent question loss: All 1,282 SQLite question IDs present in report', () => {
  const dbIds = db.prepare('SELECT question_id FROM questions').all().map(r => r.question_id);
  const csvIdSet = new Set(mappingReport.rows.map(r => r.question_id));
  assert.strictEqual(dbIds.length, 1282);
  assert.strictEqual(csvIdSet.size, 1282);
  for (const id of dbIds) {
    assert.ok(csvIdSet.has(id), `Question ${id} missing from reconciliation report`);
  }
});

// 5. No provenance corruption
runTest(5, 'No provenance corruption: Provenance values match SQLite source records', () => {
  const dbProvenanceMap = new Map();
  db.prepare('SELECT question_id, provenance FROM questions').all().forEach(r => {
    dbProvenanceMap.set(r.question_id, r.provenance);
  });
  for (const row of mappingReport.rows) {
    const dbProv = dbProvenanceMap.get(row.question_id);
    assert.strictEqual(row.provenance, dbProv, `Provenance mismatch for ${row.question_id}`);
    assert.ok(['HUMAN_CURATED', 'OFFICIAL_PYQ', 'OFFICIAL_SAMPLE'].includes(row.provenance));
  }
});

// 6. No duplicate question IDs
runTest(6, 'No duplicate question IDs: All question IDs strictly unique', () => {
  const dbIds = db.prepare('SELECT question_id FROM questions').all().map(r => r.question_id);
  assert.strictEqual(new Set(dbIds).size, 1282);
  const csvIds = mappingReport.rows.map(r => r.question_id);
  assert.strictEqual(new Set(csvIds).size, 1282);
});

// 7. Conflict groups correctly classified
runTest(7, 'Conflict groups correctly classified in question-mapping-conflicts.csv', () => {
  assert.strictEqual(conflictsReport.rows.length, 6, `Expected 6 conflict resolution records, got ${conflictsReport.rows.length}`);
  const conflictIds = conflictsReport.rows.map(r => r.question_id);
  assert.ok(conflictIds.includes('q-cmp-gk-0001_to_0030'));
  assert.ok(conflictIds.includes('q-cmp-mth-0001_to_0030'));
  assert.ok(conflictIds.includes('q-cmp-law-0001_to_0025'));
  assert.ok(conflictIds.includes('q-c12-phy-0001_to_0030'));
  assert.ok(conflictIds.includes('q-hy-hi-0001_to_0085'));
  assert.ok(conflictIds.includes('q-c12-his_pol_geo-0001_to_0036'));

  for (const row of conflictsReport.rows) {
    assert.strictEqual(row.status, 'RESOLVED_GOVERNANCE_SEPARATION');
  }
});

// 8. Full Exam eligibility recalculated
runTest(8, 'Full Exam eligibility recalculated: Exactly 200 questions eligible', () => {
  const fullExamRows = mappingReport.rows.filter(r => r.eligibility_status === 'FULL_EXAM_ELIGIBLE');
  assert.strictEqual(fullExamRows.length, 200, `Expected exactly 200 Full Exam eligible questions, got ${fullExamRows.length}`);

  const upscPrelims = fullExamRows.filter(r => r.component_id === 'comp-upsc-cse-prelims-gs1');
  const sscTier1 = fullExamRows.filter(r => r.component_id === 'comp-ssc-cgl-tier1');
  assert.strictEqual(upscPrelims.length, 100, `UPSC CSE Prelims GS 1 must have 100 questions, got ${upscPrelims.length}`);
  assert.strictEqual(sscTier1.length, 100, `SSC CGL Tier 1 must have 100 questions, got ${sscTier1.length}`);
});

// 9. Component readiness recalculated
runTest(9, 'Component readiness recalculated: Exactly 2 READY, 15 PARTIALLY_READY, 307 BLOCKED', () => {
  assert.strictEqual(readinessReport.rows.length, 324, `Expected 324 components, got ${readinessReport.rows.length}`);
  const ready = readinessReport.rows.filter(r => r.readiness_status === 'READY');
  const partiallyReady = readinessReport.rows.filter(r => r.readiness_status === 'PARTIALLY_READY');
  const blocked = readinessReport.rows.filter(r => r.readiness_status === 'BLOCKED_INSUFFICIENT_POOL');

  assert.strictEqual(ready.length, 2, `Expected 2 READY components, got ${ready.length}`);
  assert.strictEqual(partiallyReady.length, 15, `Expected 15 PARTIALLY_READY components, got ${partiallyReady.length}`);
  assert.strictEqual(blocked.length, 307, `Expected 307 BLOCKED components, got ${blocked.length}`);

  // Confirm READY component IDs
  const readyIds = ready.map(r => r.component_id);
  assert.ok(readyIds.includes('comp-upsc-cse-prelims-gs1'));
  assert.ok(readyIds.includes('comp-ssc-cgl-tier1'));
});

// 10. Practice inventory preserved
runTest(10, 'Practice inventory preserved: All 1,282 questions available for practice', () => {
  const practiceEligible = db.prepare('SELECT COUNT(*) as c FROM questions WHERE practice_eligible = 1').get();
  assert.strictEqual(practiceEligible.c, 1282, `All 1,282 questions must remain practice eligible, got ${practiceEligible.c}`);

  // Standard practice batches verified against available pool
  const testBatches = [10, 20, 30, 50, 100, 250, 500];
  for (const b of testBatches) {
    assert.ok(practiceEligible.c >= b, `Batch ${b} exceeds available practice pool ${practiceEligible.c}`);
  }
});

console.log('\n====================================================================');
console.log(`📊 QUESTION GAP CLOSURE SUMMARY: ${passed} PASSED, ${failed} FAILED (TOTAL: ${passed + failed})`);
console.log('====================================================================');

if (failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
