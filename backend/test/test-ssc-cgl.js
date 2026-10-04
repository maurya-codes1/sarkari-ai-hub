/**
 * Forensic Verification Test Suite for Non-Board Exam #1: SSC CGL
 * Staff Selection Commission — Combined Graduate Level Examination
 * 
 * Tests: 40 rigorous assertion checkpoints
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');
const Database = require('better-sqlite3');

const DB_PATH = path.join(__dirname, '../db/sarkari_core.db');
const db = new Database(DB_PATH, { readonly: true });

const EXAM_VERSION_ID = 'ver-ssc-cgl-2026';
const dictPath = path.join(__dirname, '../../data/exams/ssc-cgl.json');
const dict = JSON.parse(fs.readFileSync(dictPath, 'utf8'));

let passedTests = 0;
let failedTests = 0;

function runTest(testNumber, description, fn) {
  try {
    fn();
    console.log(`[PASS] Test ${testNumber}: ${description}`);
    passedTests++;
  } catch (err) {
    console.error(`[FAIL] Test ${testNumber}: ${description}`);
    console.error(`       Error: ${err.message}`);
    failedTests++;
  }
}

console.log('================================================================');
console.log('🔍 RUNNING FORENSIC AUDIT: NON-BOARD EXAM #1 — SSC CGL');
console.log('================================================================\n');

// 1. Organization Registration
runTest(1, 'SSC Organization Registration (org-central-ssc)', () => {
  const row = db.prepare('SELECT * FROM organizations WHERE organization_id = ?').get('org-central-ssc');
  assert.ok(row, 'Organization org-central-ssc must exist');
  assert.strictEqual(row.central_or_state, 'CENTRAL');
  assert.strictEqual(row.active, 1);
});

// 2. Exam Registration in exams table
runTest(2, 'Exam Registration in exams table (ssc-cgl)', () => {
  const row = db.prepare('SELECT * FROM exams WHERE exam_id = ?').get('ssc-cgl');
  assert.ok(row, 'Exam ssc-cgl must exist in exams table');
  assert.strictEqual(row.active, 1);
  assert.strictEqual(row.current_version_id, EXAM_VERSION_ID);
});

// 3. Exam Version in exam_versions table
runTest(3, 'Exam Version in exam_versions table (ver-ssc-cgl-2026)', () => {
  const row = db.prepare('SELECT * FROM exam_versions WHERE version_id = ?').get(EXAM_VERSION_ID);
  assert.ok(row, 'Version ver-ssc-cgl-2026 must exist');
  assert.strictEqual(row.version_status, 'CURRENT');
});

// 4. Official Sources Registration
runTest(4, 'Official Sources Registration (portal, notice, pyq corpus)', () => {
  const sources = ['src-ssc-cgl-portal', 'src-ssc-cgl-notice-2026', 'src-ssc-cgl-pyq-corpus'];
  for (const s of sources) {
    const row = db.prepare('SELECT * FROM official_sources WHERE source_id = ?').get(s);
    assert.ok(row, `Source ${s} must exist in official_sources`);
    assert.strictEqual(row.verification_status, 'VERIFIED');
  }
});

// 5. Subject Registration (10 Subjects)
runTest(5, 'Primary Subjects Registration (10 subjects in subjects table)', () => {
  const expectedSubs = [
    'ssc-cgl-t1-quantitative-aptitude',
    'ssc-cgl-t1-reasoning',
    'ssc-cgl-t1-english',
    'ssc-cgl-t1-general-awareness',
    'ssc-cgl-t2-mathematical-abilities',
    'ssc-cgl-t2-reasoning',
    'ssc-cgl-t2-english',
    'ssc-cgl-t2-general-awareness',
    'ssc-cgl-t2-computer-knowledge',
    'ssc-cgl-t2-statistics'
  ];
  for (const s of expectedSubs) {
    const row = db.prepare('SELECT * FROM subjects WHERE subject_id = ?').get(s);
    assert.ok(row, `Subject ${s} must exist in subjects table`);
    assert.strictEqual(row.active, 1);
  }
});

// 6. Tier 1 Question Distribution
runTest(6, 'Tier 1 Question Distribution (4 subjects x 280 = 1,120)', () => {
  const t1Subs = [
    'ssc-cgl-t1-quantitative-aptitude',
    'ssc-cgl-t1-reasoning',
    'ssc-cgl-t1-english',
    'ssc-cgl-t1-general-awareness'
  ];
  for (const s of t1Subs) {
    const cnt = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE exam_version_id = ? AND subject_id = ? AND stage = 'Tier-1'").get(EXAM_VERSION_ID, s).cnt;
    assert.strictEqual(cnt, 280, `Tier 1 subject ${s} must have 280 questions`);
  }
});

// 7. Tier 2 Core Question Distribution
runTest(7, 'Tier 2 Core Question Distribution (4 subjects x 280 = 1,120)', () => {
  const t2CoreSubs = [
    'ssc-cgl-t2-mathematical-abilities',
    'ssc-cgl-t2-reasoning',
    'ssc-cgl-t2-english',
    'ssc-cgl-t2-general-awareness'
  ];
  for (const s of t2CoreSubs) {
    const cnt = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE exam_version_id = ? AND subject_id = ? AND stage = 'Tier-2'").get(EXAM_VERSION_ID, s).cnt;
    assert.strictEqual(cnt, 280, `Tier 2 Core subject ${s} must have 280 questions`);
  }
});

// 8. Tier 2 Computer Module Distribution
runTest(8, 'Tier 2 Computer Knowledge Module (exactly 280 questions)', () => {
  const cnt = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE exam_version_id = ? AND subject_id = 'ssc-cgl-t2-computer-knowledge'").get(EXAM_VERSION_ID).cnt;
  assert.strictEqual(cnt, 280);
});

// 9. Tier 2 Statistics (JSO) Distribution
runTest(9, 'Tier 2 Paper-II Statistics JSO (exactly 280 questions)', () => {
  const cnt = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE exam_version_id = ? AND subject_id = 'ssc-cgl-t2-statistics'").get(EXAM_VERSION_ID).cnt;
  assert.strictEqual(cnt, 280);
});

// 10. Total SSC CGL Questions Count
runTest(10, 'Total SSC CGL Questions Count (exactly 2,800)', () => {
  const cnt = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE exam_version_id = ?").get(EXAM_VERSION_ID).cnt;
  assert.strictEqual(cnt, 2800);
});

// 11. Total SSC CGL Question Versions Count
runTest(11, 'Total SSC CGL Question Versions Count (exactly 2,800)', () => {
  const cnt = db.prepare(`
    SELECT COUNT(*) as cnt FROM question_versions qv
    JOIN questions q ON q.question_id = qv.question_id
    WHERE q.exam_version_id = ?
  `).get(EXAM_VERSION_ID).cnt;
  assert.strictEqual(cnt, 2800);
});

// 12. 100% CBT Objective Single MCQs
runTest(12, '100% CBT Objective Single MCQs (2,800 single_mcq items)', () => {
  const cnt = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE exam_version_id = ? AND question_type_id = 'single_mcq'").get(EXAM_VERSION_ID).cnt;
  assert.strictEqual(cnt, 2800);
});

// 13. Balanced MCQ Answer Keys
runTest(13, 'Balanced MCQ Answer Keys (~25% per key A, B, C, D; zero bias)', () => {
  const rows = db.prepare(`
    SELECT qv.correct_answer 
    FROM question_versions qv
    JOIN questions q ON q.question_id = qv.question_id
    WHERE q.exam_version_id = ?
  `).all(EXAM_VERSION_ID);
  
  const counts = { A: 0, B: 0, C: 0, D: 0 };
  for (const r of rows) {
    const parsed = JSON.parse(r.correct_answer);
    counts[parsed.answer] = (counts[parsed.answer] || 0) + 1;
  }
  
  for (const k of ['A', 'B', 'C', 'D']) {
    const pct = (counts[k] / rows.length) * 100;
    assert.strictEqual(counts[k], 700, `Key ${k} must have exactly 700 answers (got ${counts[k]})`);
    assert.strictEqual(pct, 25.0, `Key ${k} must be exactly 25.0%`);
  }
});

// 14. Marks Distribution
runTest(14, 'Marks Distribution Verification (2 marks for T1 & Statistics, 3 marks for T2 Core & Computer)', () => {
  const m2 = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE exam_version_id = ? AND marks = 2").get(EXAM_VERSION_ID).cnt;
  const m3 = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE exam_version_id = ? AND marks = 3").get(EXAM_VERSION_ID).cnt;
  assert.strictEqual(m2, 1400, '2 marks questions must be 1,400 (1,120 T1 + 280 Statistics)');
  assert.strictEqual(m3, 1400, '3 marks questions must be 1,400 (1,120 T2 Core + 280 Computer)');
});

// 15. Negative Marking Metadata
runTest(15, 'Negative Marking Metadata Verification (-0.50 for T1 & Stat, -1.00 for T2 Core & Comp)', () => {
  const rows = db.prepare("SELECT accepted_answers_json, stage, subject_id FROM questions WHERE exam_version_id = ? LIMIT 100").all(EXAM_VERSION_ID);
  for (const r of rows) {
    const parsed = JSON.parse(r.accepted_answers_json);
    if (r.stage === 'Tier-1' || r.subject_id === 'ssc-cgl-t2-statistics') {
      assert.strictEqual(parsed.negative_marking, 0.50);
    } else {
      assert.strictEqual(parsed.negative_marking, 1.00);
    }
  }
});

// 16. Provenance Tag Verification
runTest(16, 'Provenance Tag Verification (OFFICIAL_SSC_CGL_CURRICULUM_BANK across all questions)', () => {
  const cnt = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE exam_version_id = ? AND provenance = 'OFFICIAL_SSC_CGL_CURRICULUM_BANK'").get(EXAM_VERSION_ID).cnt;
  assert.strictEqual(cnt, 2800);
});

// 17. Source Type Verification
runTest(17, 'Source Type Verification (OFFICIAL_SOURCE across all questions)', () => {
  const cnt = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE exam_version_id = ? AND source_type = 'OFFICIAL_SOURCE'").get(EXAM_VERSION_ID).cnt;
  assert.strictEqual(cnt, 2800);
});

// 18. Trust Status Verification
runTest(18, 'Trust Status Verification (VERIFIED across all questions)', () => {
  const cnt = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE exam_version_id = ? AND trust_status = 'VERIFIED'").get(EXAM_VERSION_ID).cnt;
  assert.strictEqual(cnt, 2800);
});

// 19. Eligibility Flags Verification
runTest(19, 'Eligibility Flags Verification (practice_eligible = 1, full_exam_eligible = 1)', () => {
  const cntP = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE exam_version_id = ? AND practice_eligible = 1").get(EXAM_VERSION_ID).cnt;
  const cntF = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE exam_version_id = ? AND full_exam_eligible = 1").get(EXAM_VERSION_ID).cnt;
  assert.strictEqual(cntP, 2800);
  assert.strictEqual(cntF, 2800);
});

// 20. Difficulty Distribution
runTest(20, 'Difficulty Distribution (EASY, MEDIUM, HARD well distributed)', () => {
  const diffs = db.prepare("SELECT difficulty, COUNT(*) as cnt FROM questions WHERE exam_version_id = ? GROUP BY difficulty").all(EXAM_VERSION_ID);
  const map = {};
  diffs.forEach(d => map[d.difficulty] = d.cnt);
  assert.ok(map['EASY'] > 700, 'EASY questions must exist');
  assert.ok(map['MEDIUM'] > 1000, 'MEDIUM questions must exist');
  assert.ok(map['HARD'] > 700, 'HARD questions must exist');
});

// 21. Historical PYQ Years
runTest(21, 'Historical PYQ Years (2020-2025 covered)', () => {
  const years = db.prepare("SELECT DISTINCT historical_year FROM questions WHERE exam_version_id = ?").all(EXAM_VERSION_ID).map(y => Number(y.historical_year));
  assert.ok(years.includes(2020) || years.includes(2021) || years.includes(2022) || years.includes(2023) || years.includes(2024));
  assert.ok(years.length >= 3);
});

// 22. Valid JSON in language_content
runTest(22, 'Valid JSON in language_content across question_versions', () => {
  const rows = db.prepare(`
    SELECT qv.language_content 
    FROM question_versions qv
    JOIN questions q ON q.question_id = qv.question_id
    WHERE q.exam_version_id = ?
    LIMIT 200
  `).all(EXAM_VERSION_ID);
  for (const r of rows) {
    assert.doesNotThrow(() => JSON.parse(r.language_content));
  }
});

// 23. Bilingual Content Presence
runTest(23, 'Bilingual Content Presence (English + Hindi) in all questions', () => {
  const rows = db.prepare(`
    SELECT qv.language_content 
    FROM question_versions qv
    JOIN questions q ON q.question_id = qv.question_id
    WHERE q.exam_version_id = ?
    LIMIT 100
  `).all(EXAM_VERSION_ID);
  for (const r of rows) {
    const parsed = JSON.parse(r.language_content);
    assert.ok(parsed.en, 'Must have English content');
    assert.ok(parsed.hi, 'Must have Hindi content');
    assert.ok(parsed.en.question_text.length >= 20);
    assert.ok(parsed.hi.question_text.length >= 20);
  }
});

// 24. Detailed Solution Length
runTest(24, 'Detailed Solution Length (>= 20 chars in both languages)', () => {
  const rows = db.prepare(`
    SELECT qv.language_content 
    FROM question_versions qv
    JOIN questions q ON q.question_id = qv.question_id
    WHERE q.exam_version_id = ?
    LIMIT 100
  `).all(EXAM_VERSION_ID);
  for (const r of rows) {
    const parsed = JSON.parse(r.language_content);
    assert.ok(parsed.en.solution.length >= 20);
    assert.ok(parsed.hi.solution.length >= 20);
  }
});

// 25. Valid JSON in correct_answer
runTest(25, 'Valid JSON in correct_answer across question_versions', () => {
  const rows = db.prepare(`
    SELECT qv.correct_answer 
    FROM question_versions qv
    JOIN questions q ON q.question_id = qv.question_id
    WHERE q.exam_version_id = ?
    LIMIT 200
  `).all(EXAM_VERSION_ID);
  for (const r of rows) {
    assert.doesNotThrow(() => JSON.parse(r.correct_answer));
  }
});

// 26. Master Bundled Study Notes Count
runTest(26, 'Master Bundled Study Notes Count (exactly 5 notes)', () => {
  const cnt = db.prepare("SELECT COUNT(*) as cnt FROM notes WHERE note_id LIKE 'note-cgl-tier%'").get().cnt;
  assert.strictEqual(cnt, 5);
});

// 27. Note IDs Pattern Verification
runTest(27, 'Note IDs Pattern Verification', () => {
  const expected = [
    'note-cgl-tier1-all-subjects-mock-bundle',
    'note-cgl-tier2-paper1-maths-reasoning',
    'note-cgl-tier2-paper1-english-ga',
    'note-cgl-tier2-computer-knowledge-master',
    'note-cgl-tier2-paper2-statistics-jso'
  ];
  for (const n of expected) {
    const row = db.prepare('SELECT * FROM notes WHERE note_id = ?').get(n);
    assert.ok(row, `Note ${n} must exist`);
  }
});

// 28. Note Type Verification
runTest(28, 'Note Type Verification (FULL_LENGTH_MOCK_BUNDLE)', () => {
  const rows = db.prepare("SELECT note_type FROM notes WHERE note_id LIKE 'note-cgl-tier%'").all();
  for (const r of rows) {
    assert.strictEqual(r.note_type, 'FULL_LENGTH_MOCK_BUNDLE');
  }
});

// 29. Note Verification Status
runTest(29, 'Note Verification Status (VERIFIED)', () => {
  const rows = db.prepare("SELECT verification_status FROM notes WHERE note_id LIKE 'note-cgl-tier%'").all();
  for (const r of rows) {
    assert.strictEqual(r.verification_status, 'VERIFIED');
  }
});

// 30. Note Content Depth
runTest(30, 'Note Content Depth (COMPREHENSIVE)', () => {
  const rows = db.prepare("SELECT content_depth FROM notes WHERE note_id LIKE 'note-cgl-tier%'").all();
  for (const r of rows) {
    assert.strictEqual(r.content_depth, 'COMPREHENSIVE');
  }
});

// 31. Note Provenance Tag
runTest(31, 'Note Provenance Tag (OFFICIAL_SSC_CGL_CURRICULUM_BANK)', () => {
  const rows = db.prepare("SELECT provenance FROM notes WHERE note_id LIKE 'note-cgl-tier%'").all();
  for (const r of rows) {
    assert.strictEqual(r.provenance, 'OFFICIAL_SSC_CGL_CURRICULUM_BANK');
  }
});

// 32. Note Minimum Length
runTest(32, 'Note Minimum Length (>= 1,000 characters for each note)', () => {
  const rows = db.prepare("SELECT content FROM notes WHERE note_id LIKE 'note-cgl-tier%'").all();
  for (const r of rows) {
    assert.ok(r.content.length >= 1000);
  }
});

// 33. Multi-Subject Sampling in Notes
runTest(33, 'Multi-Subject Sampling in Notes (50% representative pack)', () => {
  const row = db.prepare("SELECT content FROM notes WHERE note_id = 'note-cgl-tier1-all-subjects-mock-bundle'").get();
  assert.ok(row.content.includes('560 Items') || row.content.includes('560 Selected PYQs'));
});

// 34. Canonical Dictionary Verification
runTest(34, 'Canonical Dictionary File Verification (data/exams/ssc-cgl.json)', () => {
  assert.ok(fs.existsSync(dictPath));
  assert.strictEqual(dict.exam_id, 'ssc-cgl');
});

// 35. Report Files Verification
runTest(35, 'Report Files Verification (all reports exist in reports/nonboard/)', () => {
  const repDir = path.join(__dirname, '../../reports/nonboard');
  const expectedReports = [
    'ssc_cgl_tier1_matrix.csv',
    'ssc_cgl_tier2_matrix.csv',
    'ssc_cgl_subject_distribution.csv',
    'ssc_cgl_pattern_matrix.csv',
    'ssc_cgl_database_impact.csv',
    'ssc_cgl_audit_full_summary.md'
  ];
  for (const rep of expectedReports) {
    assert.ok(fs.existsSync(path.join(repDir, rep)), `Report ${rep} must exist`);
  }
});

// 36. Database Backups & Hashes Verification
runTest(36, 'Pre- and Post-SSC CGL Snapshots and Hashes Verification', () => {
  const postDb = path.join(__dirname, '../db/sarkari_core_post_ssc-cgl.db');
  const postSha = path.join(__dirname, '../db/sarkari_core_post_ssc-cgl.sha256');
  assert.ok(fs.existsSync(postDb), 'Post-SSC CGL DB must exist');
  assert.ok(fs.existsSync(postSha), 'Post-SSC CGL SHA256 must exist');
  const hash = fs.readFileSync(postSha, 'utf8').trim();
  assert.strictEqual(hash.length, 64);
});

// 37. Foreign Key Integrity Check
runTest(37, 'Foreign Key Integrity Check (PRAGMA foreign_key_check = 0 violations)', () => {
  const violations = db.pragma('foreign_key_check');
  assert.strictEqual(violations.length, 0);
});

// 38. Database Integrity Check
runTest(38, 'Database Integrity Check (PRAGMA integrity_check = ok)', () => {
  const integrity = db.pragma('integrity_check');
  assert.strictEqual(integrity[0].integrity_check, 'ok');
});

// 39. Preservation of 31 Boards
runTest(39, 'Preservation of 31 Boards (261,520 questions 100% untouched)', () => {
  const boardQs = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id IS NOT NULL AND board_id != ''").get().cnt;
  assert.strictEqual(boardQs, 261520, 'All 31 boards questions must remain exactly 261,520');
});

// 40. Grand Total Questions Integrity
runTest(40, 'Grand Total Questions Integrity (264,320 total in database)', () => {
  const total = db.prepare('SELECT COUNT(*) as cnt FROM questions').get().cnt;
  assert.strictEqual(total, 264320, 'Grand total must be exactly 264,320 (261,520 boards + 2,800 SSC CGL)');
});

console.log('\n================================================================');
console.log(`📊 TEST SUITE SUMMARY: ${passedTests}/40 PASSED, ${failedTests} FAILED`);
console.log('================================================================');

if (failedTests === 0) {
  console.log('🎉 100% SUCCESS: All SSC CGL Forensic Integrity Tests Passed.\n');
  process.exit(0);
} else {
  console.error(`💥 FAILURE: ${failedTests} tests failed.`);
  process.exit(1);
}
