/**
 * Comprehensive Automated Test Suite for Non-Board Exam #22:
 * Haryana Police Male & Female Constable (haryana-police)
 */

const path = require('path');
const Database = require('better-sqlite3');

const DB_PATH = path.join(__dirname, '../db/sarkari_core.db');
const db = new Database(DB_PATH);

console.log('================================================================');
console.log('👮 RUNNING COMPREHENSIVE TEST SUITE: NON-BOARD #22 - HARYANA POLICE');
console.log('================================================================\n');

let passedTests = 0;
let failedTests = 0;

function assert(condition, testName) {
  if (condition) {
    console.log(`✅ PASS: ${testName}`);
    passedTests++;
  } else {
    console.error(`❌ FAIL: ${testName}`);
    failedTests++;
  }
}

// 1. Board Preservation Assertions
const boardCount = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id IS NOT NULL AND board_id != ''").get().cnt;
assert(boardCount === 261520, 'Board Questions Preservation (exactly 261,520 intact)');

// 2. Preceding Non-Board Exams Preservation
const exams = [
  { name: 'SSC CGL', version: 'ver-ssc-cgl-2026', expected: 2800 },
  { name: 'SSC CHSL', version: 'ver-ssc-chsl-2026', expected: 2700 },
  { name: 'SSC MTS', version: 'ver-ssc-mts-2026', expected: 1200 },
  { name: 'SSC GD', version: 'ver-ssc-gd-2026', expected: 1500 },
  { name: 'RRB NTPC', version: 'ver-rrb-ntpc-2026', expected: 1800 },
  { name: 'RRB ALP', version: 'ver-rrb-alp-2026', expected: 1800 },
  { name: 'RRB Group D', version: 'ver-rrb-group-d-2026', expected: 1200 },
  { name: 'RRB Technician', version: 'ver-rrb-technician-2026', expected: 1800 },
  { name: 'UPSC CSE', version: 'ver-upsc-cse-2026', expected: 2400 },
  { name: 'UPSC NDA', version: 'ver-upsc-nda-2026', expected: 1800 },
  { name: 'Army Agniveer', version: 'ver-agniveer-army-2026', expected: 1800 },
  { name: 'IAF Agniveer', version: 'ver-agniveer-airforce-2026', expected: 1500 },
  { name: 'Navy Agniveer', version: 'ver-agniveer-navy-2026', expected: 1200 },
  { name: 'IBPS Banking', version: 'ver-ibps-po-clerk-2026', expected: 1200 },
  { name: 'UP Police', version: 'ver-up-police-constable-2026', expected: 1200 },
  { name: 'Bihar Police', version: 'ver-bihar-police-constable-2026', expected: 1200 },
  { name: 'Delhi Police', version: 'ver-delhi-police-2026', expected: 1200 },
  { name: 'MP Police', version: 'ver-mp-police-2026', expected: 1200 },
  { name: 'Rajasthan Police', version: 'ver-rajasthan-police-2026', expected: 1200 },
  { name: 'Maharashtra Police', version: 'ver-maharashtra-police-2026', expected: 1200 },
  { name: 'West Bengal Police', version: 'ver-wb-police-2026', expected: 1200 }
];

exams.forEach((ex, idx) => {
  const cnt = db.prepare('SELECT COUNT(*) as cnt FROM questions WHERE exam_version_id = ?').get(ex.version).cnt;
  assert(cnt === ex.expected, `Non-Board Exam #${idx + 1} (${ex.name}) Preservation (exactly ${ex.expected.toLocaleString()} intact)`);
});

const totalDb = db.prepare('SELECT COUNT(*) as cnt FROM questions').get().cnt;
assert(totalDb >= 295820, `Total Questions in Database is at least 295,820 (Current: ${totalDb.toLocaleString()})`);

// 3. Haryana Police Question Bank Assertions
const hrTotal = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE exam_version_id = 'ver-haryana-police-2026'").get().cnt;
assert(hrTotal === 1200, 'Haryana Police Total Question Count is exactly 1,200');

const subjects = [
  { id: 'haryana-police-haryana-gk', name: 'Haryana General Knowledge, History, Geography & Culture' },
  { id: 'haryana-police-agriculture-animal-husbandry', name: 'Agriculture, Animal Husbandry & General Science' },
  { id: 'haryana-police-reasoning-maths', name: 'Reasoning Ability & Numerical Aptitude' },
  { id: 'haryana-police-computer-general-studies', name: 'Computer Knowledge, General Studies & Police Administration' }
];

subjects.forEach(sub => {
  const cnt = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE subject_id = ? AND exam_version_id = 'ver-haryana-police-2026'").get(sub.id).cnt;
  assert(cnt === 300, `Subject [${sub.id}] Question Count is exactly 300`);

  const keys = db.prepare(`
    SELECT qv.correct_answer, COUNT(*) as cnt
    FROM questions q
    JOIN question_versions qv ON q.question_id = qv.question_id
    WHERE q.subject_id = ? AND q.exam_version_id = 'ver-haryana-police-2026'
    GROUP BY qv.correct_answer
    ORDER BY qv.correct_answer
  `).all(sub.id);

  const balanced = keys.length === 4 && keys.every(k => k.cnt === 75);
  assert(balanced, `Subject [${sub.id}] Option Key Balance is 75 for each (A, B, C, D)`);

  const marksDist = db.prepare("SELECT DISTINCT marks FROM questions WHERE subject_id = ? AND exam_version_id = 'ver-haryana-police-2026'").all(sub.id);
  assert(marksDist.length === 1 && marksDist[0].marks === 1.0, `Subject [${sub.id}] Marking Scheme matches official standard (1 mark)`);
});

// 4. Bilingual Verification
const hrQs = db.prepare(`
  SELECT q.question_id, qv.language_content
  FROM questions q
  JOIN question_versions qv ON q.question_id = qv.question_id
  WHERE q.exam_version_id = 'ver-haryana-police-2026'
`).all();

let bilingualValid = true;
for (const q of hrQs) {
  try {
    const parsed = JSON.parse(q.language_content);
    if (!parsed.en || !parsed.hi || !parsed.en.stem || !parsed.hi.stem) {
      bilingualValid = false;
      break;
    }
  } catch (e) {
    bilingualValid = false;
    break;
  }
}
assert(bilingualValid, 'All 1,200 Haryana Police Questions have verified bilingual (EN+HI) content');

// 5. Notes Verification
const notesCount = db.prepare("SELECT COUNT(*) as cnt FROM notes WHERE exam_version_id = 'ver-haryana-police-2026'").get().cnt;
assert(notesCount === 5, 'All 5 Master Bundled Notes for Haryana Police are deployed and verified');

// 6. DB Integrity & Foreign Keys
const fkViolations = db.prepare("PRAGMA foreign_key_check").all();
assert(fkViolations.length === 0, 'Zero Foreign Key Violations in Entire Database');

const integrity = db.prepare("PRAGMA integrity_check").get();
assert(integrity.integrity_check === 'ok', 'Database PRAGMA integrity_check is ok');

console.log('\n================================================================');
console.log(`TEST SUMMARY: ${passedTests} PASSED, ${failedTests} FAILED`);
console.log('================================================================');

db.close();

if (failedTests > 0) {
  process.exit(1);
}
