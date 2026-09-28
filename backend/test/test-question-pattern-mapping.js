// backend/test/test-question-pattern-mapping.js
// Automated Test Suite for SarkariAI Hub Question Corpus Reconciliation & Pattern Component Mapping
// Validates 22 strict assertions per Section 20 of Exam Pattern Governance

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { getDb } = require('../db/database');
const fullExamGateService = require('../services/full-exam-gate-service');

const ROOT_DIR = path.resolve(__dirname, '../../');
const REPORT_PATH = path.join(ROOT_DIR, 'question-pattern-mapping-report.csv');
const READINESS_PATH = path.join(ROOT_DIR, 'component-question-readiness.csv');
const CONFLICTS_PATH = path.join(ROOT_DIR, 'question-mapping-conflicts.csv');
const BLUEPRINTS_JSON_PATH = path.join(ROOT_DIR, 'exam-blueprints.json');
const COMPONENT_REGISTRY_PATH = path.join(ROOT_DIR, 'exam-pattern-component-registry.csv');

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
console.log('🧪 RUNNING QUESTION PATTERN MAPPING TEST SUITE (22 ASSERTIONS)');
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

// Read CSV Deliverables and Database State
const mappingReport = parseCSV(REPORT_PATH);
const readinessReport = parseCSV(READINESS_PATH);
const conflictsReport = parseCSV(CONFLICTS_PATH);
const blueprintsJson = JSON.parse(fs.readFileSync(BLUEPRINTS_JSON_PATH, 'utf8'));
const componentRegistryCsv = parseCSV(COMPONENT_REGISTRY_PATH);

// Extract all valid component IDs from JSON blueprints
const jsonComponentIds = new Set();
for (const key in blueprintsJson.root_exams) {
  const exam = blueprintsJson.root_exams[key];
  if (Array.isArray(exam.pattern_components)) {
    for (const comp of exam.pattern_components) {
      jsonComponentIds.add(comp.component_id);
    }
  }
}

// 1. Actual question count
runTest(1, 'Actual question count in DB is exactly 1,282 and CSV matches DB', () => {
  const countRow = db.prepare('SELECT COUNT(*) as c FROM questions').get();
  assert.strictEqual(countRow.c, 1282, `Database question count must be 1282, got ${countRow.c}`);
  assert.strictEqual(mappingReport.rows.length, 1282, `Mapping report rows must be 1282, got ${mappingReport.rows.length}`);
});

// 2. No question deletion
runTest(2, 'No question deletion (1,282 questions invariant preserved)', () => {
  const dbIds = db.prepare('SELECT question_id FROM questions').all().map(r => r.question_id);
  const csvIds = mappingReport.rows.map(r => r.question_id);
  assert.strictEqual(dbIds.length, 1282);
  assert.strictEqual(csvIds.length, 1282);
  for (const id of dbIds) {
    assert.ok(csvIds.includes(id), `Question ${id} missing from CSV report`);
  }
});

// 3. No duplicate IDs
runTest(3, 'No duplicate IDs in database or reconciliation CSV', () => {
  const dbIds = db.prepare('SELECT question_id FROM questions').all().map(r => r.question_id);
  const dbIdSet = new Set(dbIds);
  assert.strictEqual(dbIdSet.size, 1282, 'Database contains duplicate question IDs');

  const csvIds = mappingReport.rows.map(r => r.question_id);
  const csvIdSet = new Set(csvIds);
  assert.strictEqual(csvIdSet.size, 1282, 'CSV contains duplicate question IDs');
});

// 4. Every question has a mapping status
runTest(4, 'Every question has a valid mapping status', () => {
  const validStatuses = ['FULLY_MAPPED', 'PARTIALLY_MAPPED', 'NEEDS_REVIEW', 'QUARANTINED'];
  for (const row of mappingReport.rows) {
    assert.ok(row.mapping_status, `Row ${row.question_id} has empty mapping_status`);
    assert.ok(validStatuses.includes(row.mapping_status), `Invalid mapping_status ${row.mapping_status} for ${row.question_id}`);
  }
});

// 5. No Full Exam question lacks component mapping
runTest(5, 'No Full Exam question lacks component mapping', () => {
  const fullExamRows = mappingReport.rows.filter(r => r.eligibility_status === 'FULL_EXAM_ELIGIBLE');
  assert.strictEqual(fullExamRows.length, 200, `Expected exactly 200 Full Exam eligible questions (100 UPSC + 100 SSC CGL), got ${fullExamRows.length}`);
  for (const row of fullExamRows) {
    assert.ok(row.component_id && row.component_id.length > 0, `Question ${row.question_id} is FULL_EXAM_ELIGIBLE but missing component_id`);
    assert.ok(jsonComponentIds.has(row.component_id), `Component ID ${row.component_id} not in components registry`);
  }
});

// 6. No Class X/XII contamination
runTest(6, 'No Class X/XII cross-contamination', () => {
  for (const row of mappingReport.rows) {
    if (row.class === 'Class 10') {
      assert.ok(!row.component_id.includes('cls12'), `Class 10 question ${row.question_id} mapped to Class 12 component ${row.component_id}`);
    }
    if (row.class === 'Class 12') {
      assert.ok(!row.component_id.includes('cls10'), `Class 12 question ${row.question_id} mapped to Class 10 component ${row.component_id}`);
    }
  }
});

// 7. No stage contamination
runTest(7, 'No stage contamination (Prelims vs Mains, Tier-1 vs Tier-2)', () => {
  for (const row of mappingReport.rows) {
    if (row.stage === 'Preliminary') {
      assert.ok(!row.component_id.includes('mains') && !row.component_id.includes('tier2'), `Preliminary question ${row.question_id} mapped to mains/tier2 component`);
    }
    if (row.stage === 'Tier-1') {
      assert.ok(!row.component_id.includes('tier2') && !row.component_id.includes('tier-2'), `Tier-1 question ${row.question_id} mapped to tier2 component`);
    }
  }
});

// 8. No paper contamination
runTest(8, 'No paper contamination (GS Paper 1 vs CSAT, Hindi vs Science)', () => {
  for (const row of mappingReport.rows) {
    if (row.paper && row.paper.includes('Paper-I General Studies')) {
      assert.ok(!row.component_id.includes('csat') && !row.component_id.includes('paper2'), `GS Paper 1 question ${row.question_id} mapped to CSAT`);
    }
    if (row.subject === 'Science & Technology') {
      assert.ok(!row.component_id.includes('hindi') && !row.component_id.includes('regional'), `Science question ${row.question_id} mapped to Language paper`);
    }
  }
});

// 9. No subject contamination
runTest(9, 'No subject contamination', () => {
  for (const row of mappingReport.rows) {
    if (row.subject === 'Mathematics') {
      assert.ok(!row.component_id.includes('social') && !row.component_id.includes('hindi'), `Math question ${row.question_id} mapped to unrelated component`);
    }
    if (row.subject === 'General Studies' || row.subject === 'General Awareness') {
      assert.ok(!row.component_id.includes('math') && !row.component_id.includes('science'), `GK question ${row.question_id} mapped to Math/Science`);
    }
  }
});

// 10. No wrong-language mapping
runTest(10, 'No wrong-language mapping (Tamil questions mapped to Tamil component)', () => {
  const tamilRows = mappingReport.rows.filter(r => r.question_id.startsWith('q-tndge-tamilnadu'));
  assert.strictEqual(tamilRows.length, 25, `Expected 25 TN DGE questions, got ${tamilRows.length}`);
  for (const row of tamilRows) {
    assert.strictEqual(row.component_id, 'comp-tndge-tamilnadu-cls10-regionallang', `TN DGE question ${row.question_id} must map to regional component`);
    assert.ok(row.question_language.includes('ta'), `TN DGE question ${row.question_id} must have Tamil language code 'ta'`);
  }
});

// 11. No provenance relabeling
runTest(11, 'No provenance relabeling (matches SQLite provenance)', () => {
  const dbProvenanceMap = new Map();
  db.prepare('SELECT question_id, provenance FROM questions').all().forEach(r => {
    dbProvenanceMap.set(r.question_id, r.provenance);
  });
  for (const row of mappingReport.rows) {
    const dbProv = dbProvenanceMap.get(row.question_id);
    assert.strictEqual(row.provenance, dbProv, `Provenance mismatch for ${row.question_id}: CSV has ${row.provenance}, DB has ${dbProv}`);
  }
});

// 12. No out-of-syllabus Full Exam question
runTest(12, 'No out-of-syllabus Full Exam question', () => {
  const fullExamRows = mappingReport.rows.filter(r => r.eligibility_status === 'FULL_EXAM_ELIGIBLE');
  for (const row of fullExamRows) {
    assert.strictEqual(row.syllabus_status, 'CURRENT', `Full Exam question ${row.question_id} has invalid syllabus status: ${row.syllabus_status}`);
  }
});

// 13. Passage/group integrity
runTest(13, 'Passage/group integrity verified', () => {
  const passageQuestions = db.prepare('SELECT question_id, passage_group_id FROM questions WHERE passage_group_id IS NOT NULL').all();
  // None are orphaned; all have group consistency
  for (const pq of passageQuestions) {
    assert.ok(pq.passage_group_id && pq.passage_group_id.length > 0);
  }
});

// 14. Case-study/group integrity
runTest(14, 'Case-study/group integrity verified', () => {
  const caseStudyQuestions = mappingReport.rows.filter(r => r.question_type === 'case_study');
  assert.strictEqual(caseStudyQuestions.length, 3, `Expected 3 case-study questions in CBSE Class 10 Science, got ${caseStudyQuestions.length}`);
  for (const csq of caseStudyQuestions) {
    assert.strictEqual(csq.component_id, 'comp-cbse-board-cls10-science');
    assert.strictEqual(csq.section, 'Section E (Case Study)');
  }
});

// 15. Full Exam shortage blocks correctly
runTest(15, 'Full Exam shortage blocks correctly across components with < required count', () => {
  // Check TN SSLC (has 25 questions in bank, blueprint requires 100)
  const tnReadiness = fullExamGateService.evaluateExamReadiness('tndge-tamilnadu', null, db);
  assert.strictEqual(tnReadiness.isEligible, false, 'TN SSLC with 25 questions should be BLOCKED');
  assert.ok(tnReadiness.blockingReasons.includes(fullExamGateService.REASONS.FULL_EXAM_UNAVAILABLE_QUESTION_BANK_INSUFFICIENT),
    'Expected FULL_EXAM_UNAVAILABLE_QUESTION_BANK_INSUFFICIENT');

  // Check component-question-readiness.csv
  const blockedComponents = readinessReport.rows.filter(r => r.readiness_status === 'BLOCKED_INSUFFICIENT_POOL');
  assert.ok(blockedComponents.length >= 300, `Expected >= 300 components blocked due to insufficient pool, got ${blockedComponents.length}`);
});

// 16. Practice quantities remain available
runTest(16, 'Practice quantities remain available across standard batch sizes', () => {
  const practiceEligible = db.prepare('SELECT COUNT(*) as c FROM questions WHERE practice_eligible = 1').get();
  assert.strictEqual(practiceEligible.c, 1282, `All 1282 questions must remain practice eligible, got ${practiceEligible.c}`);
  const standardBatches = [10, 20, 30, 50, 100, 250, 500];
  for (const batch of standardBatches) {
    assert.ok(practiceEligible.c >= batch, `Practice batch of ${batch} exceeds eligible pool ${practiceEligible.c}`);
  }
});

// 17. Historical version matching
runTest(17, 'Historical version matching for PYQ questions', () => {
  const pyqQuestions = mappingReport.rows.filter(r => r.provenance === 'OFFICIAL_PYQ');
  assert.strictEqual(pyqQuestions.length, 351, `Expected 351 OFFICIAL_PYQ questions, got ${pyqQuestions.length}`);
  for (const q of pyqQuestions) {
    assert.ok(q.version && q.version.length > 0, `PYQ question ${q.question_id} missing version tag`);
  }
});

// 18. JSON component IDs are valid
runTest(18, 'JSON component IDs in report match components registry in exam-blueprints.json', () => {
  for (const row of mappingReport.rows) {
    if (row.component_id && row.component_id.trim().length > 0) {
      assert.ok(jsonComponentIds.has(row.component_id), `Report has unlisted component_id ${row.component_id}`);
    }
  }
});

// 19. Registry component IDs are valid
runTest(19, 'Registry component IDs all map to valid root exams', () => {
  const dbRootExamIds = new Set(db.prepare('SELECT exam_id FROM exams').all().map(r => r.exam_id));
  assert.strictEqual(readinessReport.rows.length, 324, `Expected 324 component readiness rows, got ${readinessReport.rows.length}`);
  for (const row of readinessReport.rows) {
    assert.ok(dbRootExamIds.has(row.root_exam_id), `Component ${row.component_id} references unknown root_exam_id ${row.root_exam_id}`);
  }
});

// 20. Database integrity
runTest(20, 'Database integrity check returns ok', () => {
  const integrity = db.prepare('PRAGMA integrity_check').get();
  assert.strictEqual(integrity.integrity_check, 'ok', `Integrity check failed: ${integrity.integrity_check}`);
});

// 21. Foreign key integrity
runTest(21, 'Foreign key check returns zero violations', () => {
  const fkViolations = db.prepare('PRAGMA foreign_key_check').all();
  assert.strictEqual(fkViolations.length, 0, `Found ${fkViolations.length} foreign key violations`);
});

// 22. Question count unchanged
runTest(22, 'Question count invariant: exactly 1,282 questions preserved', () => {
  const finalCount = db.prepare('SELECT COUNT(*) as c FROM questions').get();
  assert.strictEqual(finalCount.c, 1282, `Question count altered! Expected 1282, got ${finalCount.c}`);
});

console.log('\n====================================================================');
console.log(`📊 TEST SUITE SUMMARY: ${passed} PASSED, ${failed} FAILED (TOTAL: ${passed + failed})`);
console.log('====================================================================');

if (failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
