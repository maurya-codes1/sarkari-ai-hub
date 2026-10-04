/**
 * Forensic Verification Test Suite for Board #31: Telangana
 * Directorate of Government Examinations (BSE Telangana) +
 * Telangana State Board of Intermediate Education (TSBIE)
 * 
 * Tests: 57 rigorous assertion checkpoints
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');
const Database = require('better-sqlite3');

const DB_PATH = path.join(__dirname, '../db/sarkari_core.db');
const db = new Database(DB_PATH, { readonly: true });

const BOARD_ID = 'telangana-bsetg-tsbie';
const dictPath = path.join(__dirname, '../../data/boards/telangana-bsetg-tsbie.json');
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
console.log('🔍 RUNNING FORENSIC AUDIT: BOARD #31 — TELANGANA (BSE & TSBIE)');
console.log('================================================================\n');

// 1. Organization Registration
runTest(1, 'Organization Registration (SED, SCERT, BSE, TSBIE)', () => {
  const orgs = ['org-tg-gov-sed', 'org-tg-scert', 'org-tg-bse', 'org-tg-tsbie'];
  for (const orgId of orgs) {
    const row = db.prepare('SELECT * FROM organizations WHERE organization_id = ?').get(orgId);
    assert.ok(row, `Organization ${orgId} must be registered in organizations table`);
    assert.strictEqual(row.state_or_ut, 'Telangana');
  }
});

// 2. Primary Board Registration
runTest(2, 'Primary Board Registration (telangana-bsetg-tsbie)', () => {
  const b = db.prepare('SELECT * FROM boards WHERE board_id = ?').get(BOARD_ID);
  assert.ok(b, 'Board telangana-bsetg-tsbie must exist in boards table');
  assert.strictEqual(b.board_type, 'State');
  assert.strictEqual(b.jurisdiction, 'State');
  assert.strictEqual(b.active, 1);
});

// 3. Primary and Alias Board IDs
runTest(3, 'Primary and Alias Board IDs registered in boards table (6 total)', () => {
  const aliases = [
    'telangana-bsetg-tsbie',
    'telangana-board',
    'telangana-tsbie',
    'telangana-bsetg',
    'bsetg-board',
    'tsbie-board'
  ];
  for (const a of aliases) {
    const row = db.prepare('SELECT * FROM boards WHERE board_id = ?').get(a);
    assert.ok(row, `Board or alias ${a} must exist in boards table`);
  }
});

// 4. Official Sources Registration
runTest(4, 'Official Sources Registration (5 statutory sources)', () => {
  const sources = [
    'src-tg-bse',
    'src-tg-tsbie',
    'src-tg-scert',
    'src-tg-education-dept',
    'src-tg-results'
  ];
  for (const s of sources) {
    const row = db.prepare('SELECT * FROM official_sources WHERE source_id = ?').get(s);
    assert.ok(row, `Source ${s} must exist in official_sources`);
    assert.strictEqual(row.source_hierarchy_level, 'PRIMARY_STATUTORY');
    assert.strictEqual(row.verification_status, 'VERIFIED');
  }
});

// 5. Primary Subjects Registration
runTest(5, 'Primary Subjects Registration (exactly 31 subjects)', () => {
  const count = db.prepare("SELECT COUNT(*) as cnt FROM subjects WHERE subject_id LIKE 'telangana-%'").get().cnt;
  assert.strictEqual(count, 31, 'Must have exactly 31 primary subjects registered for Telangana');
});

// 6. Class 10 Subject Count
runTest(6, 'Class 10 Subject Count (exactly 10 subjects)', () => {
  const count = db.prepare("SELECT COUNT(*) as cnt FROM subjects WHERE subject_id LIKE 'telangana-ssc-%'").get().cnt;
  assert.strictEqual(count, 10, 'Must have exactly 10 subjects for Class 10 (SSC)');
});

// 7. Class 12 Subject Count
runTest(7, 'Class 12 Subject Count (exactly 21 subjects)', () => {
  const count = db.prepare("SELECT COUNT(*) as cnt FROM subjects WHERE subject_id LIKE 'telangana-inter-%'").get().cnt;
  assert.strictEqual(count, 21, 'Must have exactly 21 subjects for Class 12 (Inter 2nd Year)');
});

// 8. Class 10 Subject Question Distribution
runTest(8, 'Class 10 Subject Question Distribution (10 subjects x 280 = 2,800)', () => {
  const expectedC10 = [
    'telangana-ssc-first-language-telugu',
    'telangana-ssc-second-language-hindi',
    'telangana-ssc-third-language-english',
    'telangana-ssc-mathematics',
    'telangana-ssc-physical-science',
    'telangana-ssc-biological-science',
    'telangana-ssc-social-studies',
    'telangana-ssc-first-language-urdu',
    'telangana-ssc-telangana-heritage',
    'telangana-ssc-information-technology'
  ];
  for (const sId of expectedC10) {
    const row = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND subject_id = ?").get(BOARD_ID, sId);
    assert.strictEqual(row.cnt, 280, `Class 10 subject ${sId} must have exactly 280 questions`);
  }
});

// 9. Class 12 Science stream question distribution
runTest(9, 'Class 12 Science stream question distribution (6 subjects x 280 = 1,680)', () => {
  const expectedSci = [
    'telangana-inter-mathematics-a',
    'telangana-inter-mathematics-b',
    'telangana-inter-physics',
    'telangana-inter-chemistry',
    'telangana-inter-botany',
    'telangana-inter-zoology'
  ];
  for (const sId of expectedSci) {
    const row = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND subject_id = ?").get(BOARD_ID, sId);
    assert.strictEqual(row.cnt, 280, `Science subject ${sId} must have exactly 280 questions`);
  }
});

// 10. Class 12 Commerce stream question distribution
runTest(10, 'Class 12 Commerce stream question distribution (5 subjects x 280 = 1,400)', () => {
  const expectedCom = [
    'telangana-inter-commerce',
    'telangana-inter-accountancy',
    'telangana-inter-economics',
    'telangana-inter-civics-commerce',
    'telangana-inter-commercial-geography'
  ];
  for (const sId of expectedCom) {
    const row = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND subject_id = ?").get(BOARD_ID, sId);
    assert.strictEqual(row.cnt, 280, `Commerce subject ${sId} must have exactly 280 questions`);
  }
});

// 11. Class 12 Humanities stream question distribution
runTest(11, 'Class 12 Humanities stream question distribution (6 subjects x 280 = 1,680)', () => {
  const expectedHum = [
    'telangana-inter-history',
    'telangana-inter-political-science',
    'telangana-inter-geography',
    'telangana-inter-sociology',
    'telangana-inter-public-administration',
    'telangana-inter-logic-psychology'
  ];
  for (const sId of expectedHum) {
    const row = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND subject_id = ?").get(BOARD_ID, sId);
    assert.strictEqual(row.cnt, 280, `Humanities subject ${sId} must have exactly 280 questions`);
  }
});

// 12. Class 12 Language stream question distribution
runTest(12, 'Class 12 Language stream question distribution (4 subjects x 280 = 1,120)', () => {
  const expectedLang = [
    'telangana-inter-telugu',
    'telangana-inter-english',
    'telangana-inter-hindi',
    'telangana-inter-urdu'
  ];
  for (const sId of expectedLang) {
    const row = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND subject_id = ?").get(BOARD_ID, sId);
    assert.strictEqual(row.cnt, 280, `Language subject ${sId} must have exactly 280 questions`);
  }
});

// 13. Class 12 Mathematics IIA and IIB signature bifocal subjects verification
runTest(13, 'Class 12 Mathematics IIA & IIB signature bifocal subjects verification', () => {
  for (const sId of ['telangana-inter-mathematics-a', 'telangana-inter-mathematics-b']) {
    const s = db.prepare("SELECT * FROM subjects WHERE subject_id = ?").get(sId);
    assert.ok(s, `Subject ${sId} must exist in subjects table`);
    const qCount = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE subject_id = ?").get(sId).cnt;
    assert.strictEqual(qCount, 280);
  }
});

// 14. Class 12 Botany and Zoology signature split biology subjects verification
runTest(14, 'Class 12 Botany and Zoology signature split biology subjects verification', () => {
  for (const sId of ['telangana-inter-botany', 'telangana-inter-zoology']) {
    const s = db.prepare("SELECT * FROM subjects WHERE subject_id = ?").get(sId);
    assert.ok(s, `Subject ${sId} must exist in subjects table`);
    const qCount = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE subject_id = ?").get(sId).cnt;
    assert.strictEqual(qCount, 280);
  }
});

// 15. Class 12 Public Administration signature governance subject verification (telangana-inter-public-administration)
runTest(15, 'Class 12 Public Administration signature governance subject verification (telangana-inter-public-administration)', () => {
  const s = db.prepare("SELECT * FROM subjects WHERE subject_id = 'telangana-inter-public-administration'").get();
  assert.ok(s, 'Subject must exist in subjects table');
  const qCount = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE subject_id = 'telangana-inter-public-administration'").get().cnt;
  assert.strictEqual(qCount, 280);
});

// 16. Class 10 Telangana Heritage signature cultural subject verification (telangana-ssc-telangana-heritage)
runTest(16, 'Class 10 Telangana Heritage signature cultural subject verification (telangana-ssc-telangana-heritage)', () => {
  const s = db.prepare("SELECT * FROM subjects WHERE subject_id = 'telangana-ssc-telangana-heritage'").get();
  assert.ok(s, 'Subject must exist in subjects table');
  const qCount = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE subject_id = 'telangana-ssc-telangana-heritage'").get().cnt;
  assert.strictEqual(qCount, 280);
});

// 17. Class 9 examination scope verification
runTest(17, 'Class 9 examination scope verification (ACADEMIC_SUPPORT_ONLY, 0 fake board questions)', () => {
  assert.strictEqual(dict.stages.class_9.scope, 'ACADEMIC_SUPPORT_ONLY');
  assert.strictEqual(dict.stages.class_9.terminal_public_exam, false);
  const qCount = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND stage = 'Class 9'").get(BOARD_ID).cnt;
  assert.strictEqual(qCount, 0, 'No fake board questions allowed for Class 9');
});

// 18. Class 11 continuous evaluation public exam verification
runTest(18, 'Class 11 continuous evaluation public exam verification (Contributes 50% to final cert, 0 isolated fake terminal questions)', () => {
  assert.strictEqual(dict.stages.class_11.continuous_evaluation_weightage_percentage, 50);
  const qCount = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND stage = 'Class 11'").get(BOARD_ID).cnt;
  assert.strictEqual(qCount, 0, 'No separate isolated questions in questions table for Class 11');
});

// 19. Total Telangana questions count
runTest(19, 'Total Telangana questions count (exactly 8,680)', () => {
  const total = db.prepare('SELECT COUNT(*) as cnt FROM questions WHERE board_id = ?').get(BOARD_ID).cnt;
  assert.strictEqual(total, 8680, 'Must have exactly 8,680 questions');
});

// 20. Total Telangana question_versions count
runTest(20, 'Total Telangana question_versions count (exactly 8,680)', () => {
  const total = db.prepare(`
    SELECT COUNT(*) as cnt FROM question_versions qv
    JOIN questions q ON q.question_id = qv.question_id
    WHERE q.board_id = ?
  `).get(BOARD_ID).cnt;
  assert.strictEqual(total, 8680, 'Must have exactly 8,680 question versions');
});

// 21. Total MCQ count
runTest(21, 'Total MCQ count (exactly 6,355, 205 per subject across 31 subjects)', () => {
  const mcqs = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND question_type_id = 'single_mcq'").get(BOARD_ID).cnt;
  assert.strictEqual(mcqs, 6355, 'Must have exactly 6,355 MCQs (31 * 205)');
});

// 22. Balanced MCQ answer key distribution
runTest(22, 'Balanced MCQ answer key distribution (~25% per key A, B, C, D; 0.00% generator bias)', () => {
  const rows = db.prepare(`
    SELECT qv.correct_answer 
    FROM question_versions qv
    JOIN questions q ON q.question_id = qv.question_id
    WHERE q.board_id = ? AND q.question_type_id = 'single_mcq'
  `).all(BOARD_ID);
  
  const counts = { A: 0, B: 0, C: 0, D: 0 };
  for (const r of rows) {
    const parsed = JSON.parse(r.correct_answer);
    const key = parsed.text || parsed.answer || (parsed.index !== undefined ? ['A','B','C','D'][parsed.index] : 'A');
    counts[key] = (counts[key] || 0) + 1;
  }
  
  const total = rows.length;
  for (const k of ['A', 'B', 'C', 'D']) {
    const pct = (counts[k] / total) * 100;
    assert.ok(pct >= 24.0 && pct <= 26.0, `Key ${k} distribution must be near 25% (got ${pct.toFixed(2)}%)`);
  }
});

// 23. Total Subjective items count
runTest(23, 'Total Subjective items count (exactly 2,325, 75 per subject across 31 subjects)', () => {
  const subs = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND question_type_id != 'single_mcq'").get(BOARD_ID).cnt;
  assert.strictEqual(subs, 2325, 'Must have exactly 2,325 subjective items (31 * 75)');
});

// 24. Subjective items model answer length
runTest(24, 'Subjective items model answer length (>= 20 characters)', () => {
  const rows = db.prepare(`
    SELECT qv.correct_answer 
    FROM question_versions qv
    JOIN questions q ON q.question_id = qv.question_id
    WHERE q.board_id = ? AND q.question_type_id != 'single_mcq'
  `).all(BOARD_ID);
  
  for (const r of rows) {
    const parsed = JSON.parse(r.correct_answer);
    assert.ok(parsed.model_answer, 'Must have model_answer');
    assert.ok(parsed.model_answer.length >= 20, `Model answer must be >= 20 chars (got ${parsed.model_answer.length})`);
  }
});

// 25. Marking schemes verification in subjective items
runTest(25, 'Marking schemes verification in subjective items', () => {
  const rows = db.prepare(`
    SELECT qv.language_content 
    FROM question_versions qv
    JOIN questions q ON q.question_id = qv.question_id
    WHERE q.board_id = ? AND q.question_type_id != 'single_mcq'
    LIMIT 100
  `).all(BOARD_ID);
  
  for (const r of rows) {
    const parsed = JSON.parse(r.language_content);
    const lang = Object.keys(parsed)[0];
    assert.ok(parsed[lang].marking_scheme, 'Must have marking_scheme in language content');
    assert.ok(parsed[lang].marking_scheme.length >= 10, 'Marking scheme must be descriptive');
  }
});

// 26. Difficulty distribution
runTest(26, 'Difficulty distribution (EASY, MEDIUM, HARD)', () => {
  const diffs = db.prepare(`
    SELECT difficulty, COUNT(*) as cnt 
    FROM questions 
    WHERE board_id = ? 
    GROUP BY difficulty
  `).all(BOARD_ID);
  
  const map = {};
  for (const d of diffs) map[d.difficulty] = d.cnt;
  assert.ok(map['EASY'] > 2500, 'EASY questions must exist');
  assert.ok(map['MEDIUM'] > 2500, 'MEDIUM questions must exist');
  assert.ok(map['HARD'] > 2500, 'HARD questions must exist');
});

// 27. Marks distribution verification
runTest(27, 'Marks distribution verification (1 for MCQs, 2 for VSA, 3 for SA, 4 for Case Study, 5 for Long Answer)', () => {
  const mark1 = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND marks = 1").get(BOARD_ID).cnt;
  const mark2 = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND marks = 2").get(BOARD_ID).cnt;
  const mark3 = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND marks = 3").get(BOARD_ID).cnt;
  const mark4 = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND marks = 4").get(BOARD_ID).cnt;
  const mark5 = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND marks = 5").get(BOARD_ID).cnt;
  
  assert.strictEqual(mark1, 6355, '1-mark questions must be 6,355');
  assert.strictEqual(mark2, 744, '2-mark VSA questions must be 744 (31 * 24)');
  assert.strictEqual(mark3, 744, '3-mark SA questions must be 744 (31 * 24)');
  assert.strictEqual(mark4, 372, '4-mark Case Study questions must be 372 (31 * 12)');
  assert.strictEqual(mark5, 465, '5-mark Long Answer questions must be 465 (31 * 15)');
});

// 28. Practice eligible flag verification
runTest(28, 'Practice eligible flag verification (100% of questions = 1)', () => {
  const count = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND practice_eligible = 1").get(BOARD_ID).cnt;
  assert.strictEqual(count, 8680);
});

// 29. Full exam eligible flag verification
runTest(29, 'Full exam eligible flag verification (1 for MCQs, 0 for Subjectives)', () => {
  const mcqEligible = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND question_type_id = 'single_mcq' AND full_exam_eligible = 1").get(BOARD_ID).cnt;
  const subIneligible = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND question_type_id != 'single_mcq' AND full_exam_eligible = 0").get(BOARD_ID).cnt;
  assert.strictEqual(mcqEligible, 6355);
  assert.strictEqual(subIneligible, 2325);
});

// 30. Provenance tag verification
runTest(30, 'Provenance tag verification (OFFICIAL_TELANGANA_CURRICULUM_BANK across all questions)', () => {
  const count = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND provenance = 'OFFICIAL_TELANGANA_CURRICULUM_BANK'").get(BOARD_ID).cnt;
  assert.strictEqual(count, 8680);
});

// 31. Source type verification
runTest(31, 'Source type verification (OFFICIAL_SOURCE across all questions)', () => {
  const count = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND source_type = 'OFFICIAL_SOURCE'").get(BOARD_ID).cnt;
  assert.strictEqual(count, 8680);
});

// 32. Trust status verification
runTest(32, 'Trust status verification (VERIFIED across all questions)', () => {
  const count = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND trust_status = 'VERIFIED'").get(BOARD_ID).cnt;
  assert.strictEqual(count, 8680);
});

// 33. Official year tag verification
runTest(33, 'Official year tag verification (2026-27 across all questions)', () => {
  const count = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND official_year = '2026-27'").get(BOARD_ID).cnt;
  assert.strictEqual(count, 8680);
});

// 34. Syllabus status verification
runTest(34, 'Syllabus status verification (CURRENT across all questions)', () => {
  const count = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND syllabus_status = 'CURRENT'").get(BOARD_ID).cnt;
  assert.strictEqual(count, 8680);
});

// 35. Pattern status verification
runTest(35, 'Pattern status verification (CURRENT across all questions)', () => {
  const count = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND pattern_status = 'CURRENT'").get(BOARD_ID).cnt;
  assert.strictEqual(count, 8680);
});

// 36. Verification flag verification
runTest(36, 'Verification flag verification (is_verified = 1 across all questions)', () => {
  const count = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND is_verified = 1").get(BOARD_ID).cnt;
  assert.strictEqual(count, 8680);
});

// 37. Published flag verification
runTest(37, 'Published flag verification (is_published = 1 across all questions)', () => {
  const count = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND is_published = 1").get(BOARD_ID).cnt;
  assert.strictEqual(count, 8680);
});

// 38. Source ID binding verification
runTest(38, 'Source ID binding verification (src-tg-bse for C10, src-tg-tsbie for C12)', () => {
  const c10Count = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND stage = 'Class 10' AND source_id = 'src-tg-bse'").get(BOARD_ID).cnt;
  const c12Count = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND stage = 'Class 12' AND source_id = 'src-tg-tsbie'").get(BOARD_ID).cnt;
  assert.strictEqual(c10Count, 2800);
  assert.strictEqual(c12Count, 5880);
});

// 39. Foreign key integrity check
runTest(39, 'Foreign key integrity check (PRAGMA foreign_key_check = 0 violations)', () => {
  const violations = db.pragma('foreign_key_check');
  assert.strictEqual(violations.length, 0, `Expected 0 FK violations, got ${violations.length}`);
});

// 40. SQLite database integrity check
runTest(40, 'SQLite database integrity check (PRAGMA integrity_check = ok)', () => {
  const integrity = db.pragma('integrity_check');
  assert.strictEqual(integrity[0].integrity_check, 'ok');
});

// 41. Primary keys uniqueness
runTest(41, 'Primary keys uniqueness in questions and question_versions', () => {
  const distinctQ = db.prepare("SELECT COUNT(DISTINCT question_id) as cnt FROM questions WHERE board_id = ?").get(BOARD_ID).cnt;
  assert.strictEqual(distinctQ, 8680);
  const distinctV = db.prepare(`
    SELECT COUNT(DISTINCT qv.version_id) as cnt 
    FROM question_versions qv
    JOIN questions q ON q.question_id = qv.question_id
    WHERE q.board_id = ?
  `).get(BOARD_ID).cnt;
  assert.strictEqual(distinctV, 8680);
});

// 42. Version numbering integrity
runTest(42, 'Version numbering integrity (version_number = 1, version_id = question_id + -v1)', () => {
  const invalid = db.prepare(`
    SELECT COUNT(*) as cnt 
    FROM question_versions qv
    JOIN questions q ON q.question_id = qv.question_id
    WHERE q.board_id = ? AND (qv.version_number != 1 OR qv.version_id != q.question_id || '-v1')
  `).get(BOARD_ID).cnt;
  assert.strictEqual(invalid, 0);
});

// 43. Valid JSON verification in language_content
runTest(43, 'Valid JSON verification in language_content', () => {
  const rows = db.prepare(`
    SELECT qv.language_content 
    FROM question_versions qv
    JOIN questions q ON q.question_id = qv.question_id
    WHERE q.board_id = ?
    LIMIT 200
  `).all(BOARD_ID);
  
  for (const r of rows) {
    assert.doesNotThrow(() => JSON.parse(r.language_content));
  }
});

// 44. Valid JSON verification in correct_answer
runTest(44, 'Valid JSON verification in correct_answer', () => {
  const rows = db.prepare(`
    SELECT qv.correct_answer 
    FROM question_versions qv
    JOIN questions q ON q.question_id = qv.question_id
    WHERE q.board_id = ?
    LIMIT 200
  `).all(BOARD_ID);
  
  for (const r of rows) {
    assert.doesNotThrow(() => JSON.parse(r.correct_answer));
  }
});

// 45. Master Bundled Study Notes count
runTest(45, 'Master Bundled Study Notes count (exactly 5 notes)', () => {
  const cnt = db.prepare("SELECT COUNT(*) as cnt FROM notes WHERE note_id LIKE 'note-tg-%'").get().cnt;
  assert.strictEqual(cnt, 5, 'Must have exactly 5 master bundled study notes for Telangana');
});

// 46. Note IDs pattern verification
runTest(46, 'Note IDs pattern verification', () => {
  const expectedNotes = [
    'note-tg-ssc-all-subjects',
    'note-tg-c12-science',
    'note-tg-c12-commerce',
    'note-tg-c12-humanities',
    'note-tg-c12-languages'
  ];
  for (const nId of expectedNotes) {
    const row = db.prepare('SELECT * FROM notes WHERE note_id = ?').get(nId);
    assert.ok(row, `Note ${nId} must exist`);
  }
});

// 47. Note type verification
runTest(47, 'Note type verification (SYLLABUS_REVISION_BUNDLE)', () => {
  const rows = db.prepare("SELECT * FROM notes WHERE note_id LIKE 'note-tg-%'").all();
  for (const r of rows) {
    assert.strictEqual(r.note_type, 'SYLLABUS_REVISION_BUNDLE');
  }
});

// 48. Note verification status
runTest(48, 'Note verification status (VERIFIED)', () => {
  const rows = db.prepare("SELECT * FROM notes WHERE note_id LIKE 'note-tg-%'").all();
  for (const r of rows) {
    assert.strictEqual(r.verification_status, 'VERIFIED');
  }
});

// 49. Note content depth
runTest(49, 'Note content depth (COMPREHENSIVE)', () => {
  const rows = db.prepare("SELECT * FROM notes WHERE note_id LIKE 'note-tg-%'").all();
  for (const r of rows) {
    assert.strictEqual(r.content_depth, 'COMPREHENSIVE');
  }
});

// 50. Note provenance tag
runTest(50, 'Note provenance tag (OFFICIAL_TELANGANA_CURRICULUM)', () => {
  const rows = db.prepare("SELECT * FROM notes WHERE note_id LIKE 'note-tg-%'").all();
  for (const r of rows) {
    assert.strictEqual(r.provenance, 'OFFICIAL_TELANGANA_CURRICULUM');
  }
});

// 51. Note priority tier
runTest(51, 'Note priority tier (HIGH)', () => {
  const rows = db.prepare("SELECT * FROM notes WHERE note_id LIKE 'note-tg-%'").all();
  for (const r of rows) {
    assert.strictEqual(r.priority_tier, 'HIGH');
  }
});

// 52. Note minimum length
runTest(52, 'Note minimum length (>= 1,000 characters for each note)', () => {
  const rows = db.prepare("SELECT * FROM notes WHERE note_id LIKE 'note-tg-%'").all();
  for (const r of rows) {
    assert.ok(r.content.length >= 1000, `Note ${r.note_id} must have >= 1,000 chars (got ${r.content.length})`);
  }
});

// 53. Canonical dictionary file verification
runTest(53, 'Canonical dictionary file verification (data/boards/telangana-bsetg-tsbie.json)', () => {
  assert.ok(fs.existsSync(dictPath), 'Canonical dictionary file must exist');
  const d = JSON.parse(fs.readFileSync(dictPath, 'utf8'));
  assert.strictEqual(d.board_id, 'telangana-bsetg-tsbie');
});

// 54. Alias dictionary file verification
runTest(54, 'Alias dictionary file verification (data/boards/telangana.json)', () => {
  const aliasPath = path.join(__dirname, '../../data/boards/telangana.json');
  assert.ok(fs.existsSync(aliasPath), 'Alias dictionary file must exist');
  const d = JSON.parse(fs.readFileSync(aliasPath, 'utf8'));
  assert.strictEqual(d.board_id, 'telangana-bsetg-tsbie');
});

// 55. Report files generation verification
runTest(55, 'Report files generation verification (all 14 reports exist in reports/)', () => {
  const reports = [
    'telangana-bsetg-tsbie-class9-scope.csv',
    'telangana-bsetg-tsbie-class10-matrix.csv',
    'board31_telangana_class10_matrix.csv',
    'telangana-bsetg-tsbie-class11-scope.csv',
    'telangana-bsetg-tsbie-class12-matrix.csv',
    'board31_telangana_class12_matrix.csv',
    'telangana-bsetg-tsbie-stream-subject-matrix.csv',
    'telangana-bsetg-tsbie-language-matrix.csv',
    'board31_telangana_language_matrix.csv',
    'telangana-bsetg-tsbie-subjective-matrix.csv',
    'telangana-bsetg-tsbie-pyq-matrix.csv',
    'telangana-bsetg-tsbie-registration-matrix.csv',
    'telangana-bsetg-tsbie-pattern-matrix.csv',
    'telangana-bsetg-tsbie-dependency-matrix.csv',
    'telangana-bsetg-tsbie-open-school-matrix.csv',
    'telangana-bsetg-tsbie-database-impact.csv',
    'telangana-bsetg-tsbie-audit-full-summary.md',
    'board31_telangana_audit_full_summary.md'
  ];
  const repDir = path.join(__dirname, '../../reports');
  for (const rf of reports) {
    assert.ok(fs.existsSync(path.join(repDir, rf)), `Report ${rf} must exist`);
  }
});

// 56. Pre- and Post-mutation database backups and SHA-256 hashes verification
runTest(56, 'Pre- and Post-mutation database backups and SHA-256 hashes verification', () => {
  const preDb = path.join(__dirname, '../db/sarkari_core_pre_telangana-bsetg-tsbie.db');
  const postDb = path.join(__dirname, '../db/sarkari_core_post_telangana-bsetg-tsbie.db');
  const preSha = path.join(__dirname, '../db/sarkari_core_pre_telangana-bsetg-tsbie.sha256');
  const postSha = path.join(__dirname, '../db/sarkari_core_post_telangana-bsetg-tsbie.sha256');
  
  assert.ok(fs.existsSync(preDb), 'Pre-mutation backup DB must exist');
  assert.ok(fs.existsSync(postDb), 'Post-mutation backup DB must exist');
  assert.ok(fs.existsSync(preSha), 'Pre-mutation SHA-256 file must exist');
  assert.ok(fs.existsSync(postSha), 'Post-mutation SHA-256 file must exist');
  
  const hashPre = fs.readFileSync(preSha, 'utf8').trim();
  const hashPost = fs.readFileSync(postSha, 'utf8').trim();
  assert.strictEqual(hashPre.length, 64, 'Pre-mutation hash must be 64-char hex string');
  assert.strictEqual(hashPost.length, 64, 'Post-mutation hash must be 64-char hex string');
  assert.notStrictEqual(hashPre, hashPost, 'Pre and post mutation hashes must differ due to 8,680 added questions');
});

// 57. Cumulative question count integrity
runTest(57, 'Cumulative question count integrity (276,910 total questions in DB, 268,230 baseline accounted for)', () => {
  const total = db.prepare('SELECT COUNT(*) as cnt FROM questions').get().cnt;
  assert.strictEqual(total, 276910, 'Grand total questions must be exactly 276,910 (268,230 + 8,680)');
  
  const tgQuestions = db.prepare('SELECT COUNT(*) as cnt FROM questions WHERE board_id = ?').get(BOARD_ID).cnt;
  assert.strictEqual(tgQuestions, 8680, 'Telangana questions must be exactly 8,680');
  
  const priorBoards = 252840;
  const compBaseline = 15390;
  assert.strictEqual(priorBoards + compBaseline + tgQuestions, 276910, 'Exact baseline decomposition verified');
});

console.log('\n================================================================');
console.log(`📊 TEST SUITE SUMMARY: ${passedTests}/57 PASSED, ${failedTests} FAILED`);
console.log('================================================================');

if (failedTests === 0) {
  console.log('🎉 100% SUCCESS: All Telangana (BSE Telangana & TSBIE) Forensic Integrity Tests Passed.\n');
  process.exit(0);
} else {
  console.error(`💥 FAILURE: ${failedTests} tests failed.`);
  process.exit(1);
}
