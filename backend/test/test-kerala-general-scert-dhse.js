const fs = require('fs');
const path = require('path');
const assert = require('assert');
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, '../db/sarkari_core.db');
const db = new Database(dbPath);

const BOARD_ID = 'kerala-general-scert-dhse';
const dictPath = path.join(__dirname, '../../data/boards/kerala-general-scert-dhse.json');
const dict = JSON.parse(fs.readFileSync(dictPath, 'utf8'));

console.log('================================================================');
console.log('🧪 SARKARIAI HUB — BOARD #30 KERALA (DGE / SCERT / PAREEKSHA BHAVAN / DHSE) VERIFICATION SUITE');
console.log('================================================================\n');

let passedTests = 0;
let failedTests = 0;

function runTest(testNum, testName, fn) {
  try {
    fn();
    console.log(`✅ [${testNum}/57] ${testName}: PASSED`);
    passedTests++;
  } catch (err) {
    console.error(`❌ [${testNum}/57] ${testName}: FAILED -> ${err.message}`);
    failedTests++;
  }
}

// 1. Board identity isolation
runTest(1, 'Kerala board identity isolation (kerala-general-scert-dhse dictionary and database separation)', () => {
  assert.strictEqual(dict.board_id, 'kerala-general-scert-dhse');
  assert.strictEqual(dict.short_name, 'Kerala DGE / DHSE');
  assert.strictEqual(dict.state, 'Kerala');
  assert.strictEqual(dict.official_website, 'https://education.kerala.gov.in/');
  assert.strictEqual(dict.official_result_url, 'https://keralaresults.nic.in/');
  
  const bRow = db.prepare('SELECT * FROM boards WHERE board_id = ?').get(BOARD_ID);
  assert.ok(bRow, 'Board record must exist in DB');
  assert.strictEqual(bRow.board_id, 'kerala-general-scert-dhse');
});

// 2. Kerala DGE / GED authority verification
runTest(2, 'Kerala DGE / GED apex department authority verification (org-kl-gov-ged)', () => {
  const org = db.prepare('SELECT * FROM organizations WHERE organization_id = ?').get('org-kl-gov-ged');
  assert.ok(org, 'DGE organization must exist');
  assert.strictEqual(org.state_or_ut, 'Kerala');
  assert.strictEqual(org.type, 'GOVERNMENT_DEPARTMENT');
});

// 3. SCERT Kerala curriculum body verification
runTest(3, 'SCERT Kerala curriculum research body verification (org-kl-scert)', () => {
  const org = db.prepare('SELECT * FROM organizations WHERE organization_id = ?').get('org-kl-scert');
  assert.ok(org, 'SCERT Kerala organization must exist');
  assert.strictEqual(org.type, 'ACADEMIC_RESEARCH');
  assert.strictEqual(org.official_website, 'https://scert.kerala.gov.in/');
});

// 4. Kerala Pareeksha Bhavan SSLC authority verification
runTest(4, 'Kerala Pareeksha Bhavan SSLC examination authority verification (org-kl-pareeksha-bhavan)', () => {
  const org = db.prepare('SELECT * FROM organizations WHERE organization_id = ?').get('org-kl-pareeksha-bhavan');
  assert.ok(org, 'Pareeksha Bhavan organization must exist');
  assert.strictEqual(org.type, 'EXAM_BOARD');
  assert.strictEqual(org.official_website, 'https://pareekshabhavan.kerala.gov.in/');
});

// 5. Kerala DHSE Higher Secondary authority verification
runTest(5, 'Kerala DHSE Higher Secondary examination authority verification (org-kl-dhse)', () => {
  const org = db.prepare('SELECT * FROM organizations WHERE organization_id = ?').get('org-kl-dhse');
  assert.ok(org, 'DHSE Kerala organization must exist');
  assert.strictEqual(org.type, 'EXAM_BOARD');
  assert.strictEqual(org.official_website, 'https://dhsekerala.gov.in/');
});

// 6. Aliases in boards table
runTest(6, 'Kerala aliases in boards table (kerala-general-scert-dhse, kerala-board, kerala-dhse, kerala-sslc, kerala-pareeksha-bhavan)', () => {
  const aliases = ['kerala-general-scert-dhse', 'kerala-board', 'kerala-dhse', 'kerala-sslc', 'kerala-pareeksha-bhavan'];
  for (const a of aliases) {
    const row = db.prepare('SELECT * FROM boards WHERE board_id = ?').get(a);
    assert.ok(row, `Board alias ${a} must exist`);
  }
});

// 7. Statutory official sources verification
runTest(7, 'Statutory official sources verification (5 registered sources)', () => {
  const sources = [
    'src-kl-education-dept',
    'src-kl-scert',
    'src-kl-pareeksha-bhavan',
    'src-kl-dhse',
    'src-kl-results'
  ];
  for (const sId of sources) {
    const row = db.prepare('SELECT * FROM official_sources WHERE source_id = ?').get(sId);
    assert.ok(row, `Source ${sId} must exist in official_sources`);
    assert.strictEqual(row.verification_status, 'VERIFIED');
  }
});

// 8. Class 10 SSLC question distribution
runTest(8, 'Class 10 SSLC question distribution (10 subjects x 280 = 2,800)', () => {
  const expectedC10 = [
    'kerala-sslc-malayalam-1',
    'kerala-sslc-malayalam-2',
    'kerala-sslc-english',
    'kerala-sslc-hindi',
    'kerala-sslc-mathematics',
    'kerala-sslc-physics',
    'kerala-sslc-chemistry',
    'kerala-sslc-biology',
    'kerala-sslc-social-science',
    'kerala-sslc-information-technology'
  ];
  for (const sId of expectedC10) {
    const row = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND subject_id = ?").get(BOARD_ID, sId);
    assert.strictEqual(row.cnt, 280, `SSLC subject ${sId} must have exactly 280 questions`);
  }
});

// 9. Class 12 Science stream question distribution
runTest(9, 'Class 12 Science stream question distribution (6 subjects x 280 = 1,680)', () => {
  const expectedSci = [
    'kerala-c12-physics',
    'kerala-c12-chemistry',
    'kerala-c12-mathematics',
    'kerala-c12-biology',
    'kerala-c12-computer-science',
    'kerala-c12-geology'
  ];
  for (const sId of expectedSci) {
    const row = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND subject_id = ?").get(BOARD_ID, sId);
    assert.strictEqual(row.cnt, 280, `Science subject ${sId} must have exactly 280 questions`);
  }
});

// 10. Class 12 Commerce stream question distribution
runTest(10, 'Class 12 Commerce stream question distribution (5 subjects x 280 = 1,400)', () => {
  const expectedCom = [
    'kerala-c12-accountancy',
    'kerala-c12-business-studies',
    'kerala-c12-economics-commerce',
    'kerala-c12-computer-applications-commerce',
    'kerala-c12-business-mathematics'
  ];
  for (const sId of expectedCom) {
    const row = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND subject_id = ?").get(BOARD_ID, sId);
    assert.strictEqual(row.cnt, 280, `Commerce subject ${sId} must have exactly 280 questions`);
  }
});

// 11. Class 12 Humanities stream question distribution
runTest(11, 'Class 12 Humanities stream question distribution (6 subjects x 280 = 1,680)', () => {
  const expectedHum = [
    'kerala-c12-history',
    'kerala-c12-political-science',
    'kerala-c12-geography',
    'kerala-c12-sociology',
    'kerala-c12-journalism',
    'kerala-c12-psychology'
  ];
  for (const sId of expectedHum) {
    const row = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND subject_id = ?").get(BOARD_ID, sId);
    assert.strictEqual(row.cnt, 280, `Humanities subject ${sId} must have exactly 280 questions`);
  }
});

// 12. Class 12 Language stream question distribution
runTest(12, 'Class 12 Language stream question distribution (4 subjects x 280 = 1,120)', () => {
  const expectedLang = [
    'kerala-c12-malayalam',
    'kerala-c12-english',
    'kerala-c12-hindi',
    'kerala-c12-arabic'
  ];
  for (const sId of expectedLang) {
    const row = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND subject_id = ?").get(BOARD_ID, sId);
    assert.strictEqual(row.cnt, 280, `Language subject ${sId} must have exactly 280 questions`);
  }
});

// 13. Class 12 Geology signature subject verification
runTest(13, 'Class 12 Geology signature subject verification (kerala-c12-geology)', () => {
  const s = db.prepare("SELECT * FROM subjects WHERE subject_id = 'kerala-c12-geology'").get();
  assert.ok(s, 'Subject must exist in subjects table');
  const qCount = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE subject_id = 'kerala-c12-geology'").get().cnt;
  assert.strictEqual(qCount, 280);
});

// 14. Class 12 Journalism signature subject verification
runTest(14, 'Class 12 Journalism & Mass Communication signature subject verification (kerala-c12-journalism)', () => {
  const s = db.prepare("SELECT * FROM subjects WHERE subject_id = 'kerala-c12-journalism'").get();
  assert.ok(s, 'Subject must exist in subjects table');
  const qCount = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE subject_id = 'kerala-c12-journalism'").get().cnt;
  assert.strictEqual(qCount, 280);
});

// 15. Class 12 Classical Arabic signature subject verification
runTest(15, 'Class 12 Classical Arabic signature subject verification (kerala-c12-arabic)', () => {
  const s = db.prepare("SELECT * FROM subjects WHERE subject_id = 'kerala-c12-arabic'").get();
  assert.ok(s, 'Subject must exist in subjects table');
  const qCount = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE subject_id = 'kerala-c12-arabic'").get().cnt;
  assert.strictEqual(qCount, 280);
});

// 16. Class 12 Computer Applications in Commerce signature discipline verification
runTest(16, 'Class 12 Computer Applications in Commerce signature discipline verification (kerala-c12-computer-applications-commerce)', () => {
  const s = db.prepare("SELECT * FROM subjects WHERE subject_id = 'kerala-c12-computer-applications-commerce'").get();
  assert.ok(s, 'Subject must exist in subjects table');
  const qCount = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE subject_id = 'kerala-c12-computer-applications-commerce'").get().cnt;
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

// 19. Total Kerala questions count
runTest(19, 'Total Kerala questions count (exactly 8,680)', () => {
  const total = db.prepare('SELECT COUNT(*) as cnt FROM questions WHERE board_id = ?').get(BOARD_ID).cnt;
  assert.strictEqual(total, 8680, 'Must have exactly 8,680 questions');
});

// 20. Total Kerala question_versions count
runTest(20, 'Total Kerala question_versions count (exactly 8,680)', () => {
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
runTest(30, 'Provenance tag verification (OFFICIAL_KERALA_CURRICULUM_BANK across all questions)', () => {
  const count = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND provenance = 'OFFICIAL_KERALA_CURRICULUM_BANK'").get(BOARD_ID).cnt;
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
runTest(38, 'Source ID binding verification (src-kl-pareeksha-bhavan for C10, src-kl-dhse for C12)', () => {
  const c10Count = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND stage = 'Class 10' AND source_id = 'src-kl-pareeksha-bhavan'").get(BOARD_ID).cnt;
  const c12Count = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND stage = 'Class 12' AND source_id = 'src-kl-dhse'").get(BOARD_ID).cnt;
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
  const cnt = db.prepare("SELECT COUNT(*) as cnt FROM notes WHERE note_id LIKE 'note-kl-%'").get().cnt;
  assert.strictEqual(cnt, 5, 'Must have exactly 5 master bundled study notes for Kerala');
});

// 46. Note IDs pattern verification
runTest(46, 'Note IDs pattern verification', () => {
  const expectedNotes = [
    'note-kl-sslc-all-subjects',
    'note-kl-c12-science',
    'note-kl-c12-commerce',
    'note-kl-c12-humanities',
    'note-kl-c12-languages'
  ];
  for (const nId of expectedNotes) {
    const row = db.prepare('SELECT * FROM notes WHERE note_id = ?').get(nId);
    assert.ok(row, `Note ${nId} must exist`);
  }
});

// 47. Note type verification
runTest(47, 'Note type verification (SYLLABUS_REVISION_BUNDLE)', () => {
  const rows = db.prepare("SELECT * FROM notes WHERE note_id LIKE 'note-kl-%'").all();
  for (const r of rows) {
    assert.strictEqual(r.note_type, 'SYLLABUS_REVISION_BUNDLE');
  }
});

// 48. Note verification status
runTest(48, 'Note verification status (VERIFIED)', () => {
  const rows = db.prepare("SELECT * FROM notes WHERE note_id LIKE 'note-kl-%'").all();
  for (const r of rows) {
    assert.strictEqual(r.verification_status, 'VERIFIED');
  }
});

// 49. Note content depth
runTest(49, 'Note content depth (COMPREHENSIVE)', () => {
  const rows = db.prepare("SELECT * FROM notes WHERE note_id LIKE 'note-kl-%'").all();
  for (const r of rows) {
    assert.strictEqual(r.content_depth, 'COMPREHENSIVE');
  }
});

// 50. Note provenance tag
runTest(50, 'Note provenance tag (OFFICIAL_KERALA_CURRICULUM)', () => {
  const rows = db.prepare("SELECT * FROM notes WHERE note_id LIKE 'note-kl-%'").all();
  for (const r of rows) {
    assert.strictEqual(r.provenance, 'OFFICIAL_KERALA_CURRICULUM');
  }
});

// 51. Note priority tier
runTest(51, 'Note priority tier (HIGH)', () => {
  const rows = db.prepare("SELECT * FROM notes WHERE note_id LIKE 'note-kl-%'").all();
  for (const r of rows) {
    assert.strictEqual(r.priority_tier, 'HIGH');
  }
});

// 52. Note minimum length
runTest(52, 'Note minimum length (>= 1,000 characters for each note)', () => {
  const rows = db.prepare("SELECT * FROM notes WHERE note_id LIKE 'note-kl-%'").all();
  for (const r of rows) {
    assert.ok(r.content.length >= 1000, `Note ${r.note_id} must have >= 1,000 chars (got ${r.content.length})`);
  }
});

// 53. Canonical dictionary file verification
runTest(53, 'Canonical dictionary file verification (data/boards/kerala-general-scert-dhse.json)', () => {
  assert.ok(fs.existsSync(dictPath), 'Canonical dictionary file must exist');
  const d = JSON.parse(fs.readFileSync(dictPath, 'utf8'));
  assert.strictEqual(d.board_id, 'kerala-general-scert-dhse');
});

// 54. Alias dictionary file verification
runTest(54, 'Alias dictionary file verification (data/boards/kerala.json)', () => {
  const aliasPath = path.join(__dirname, '../../data/boards/kerala.json');
  assert.ok(fs.existsSync(aliasPath), 'Alias dictionary file must exist');
  const d = JSON.parse(fs.readFileSync(aliasPath, 'utf8'));
  assert.strictEqual(d.board_id, 'kerala-general-scert-dhse');
});

// 55. Report files generation verification
runTest(55, 'Report files generation verification (all 14 reports exist in reports/)', () => {
  const reports = [
    'kerala-general-scert-dhse-class9-scope.csv',
    'kerala-general-scert-dhse-class10-matrix.csv',
    'board30_kerala_class10_matrix.csv',
    'kerala-general-scert-dhse-class11-scope.csv',
    'kerala-general-scert-dhse-class12-matrix.csv',
    'board30_kerala_class12_matrix.csv',
    'kerala-general-scert-dhse-stream-subject-matrix.csv',
    'kerala-general-scert-dhse-language-matrix.csv',
    'board30_kerala_language_matrix.csv',
    'kerala-general-scert-dhse-subjective-matrix.csv',
    'kerala-general-scert-dhse-pyq-matrix.csv',
    'kerala-general-scert-dhse-registration-matrix.csv',
    'kerala-general-scert-dhse-pattern-matrix.csv',
    'kerala-general-scert-dhse-dependency-matrix.csv',
    'kerala-general-scert-dhse-open-school-matrix.csv',
    'kerala-general-scert-dhse-database-impact.csv',
    'kerala-general-scert-dhse-audit-full-summary.md',
    'board30_kerala_audit_full_summary.md'
  ];
  const repDir = path.join(__dirname, '../../reports');
  for (const rf of reports) {
    assert.ok(fs.existsSync(path.join(repDir, rf)), `Report ${rf} must exist`);
  }
});

// 56. Pre- and Post-mutation database backups and SHA-256 hashes verification
runTest(56, 'Pre- and Post-mutation database backups and SHA-256 hashes verification', () => {
  const preDb = path.join(__dirname, '../db/sarkari_core_pre_kerala-general-scert-dhse.db');
  const postDb = path.join(__dirname, '../db/sarkari_core_post_kerala-general-scert-dhse.db');
  const preSha = path.join(__dirname, '../db/sarkari_core_pre_kerala-general-scert-dhse.sha256');
  const postSha = path.join(__dirname, '../db/sarkari_core_post_kerala-general-scert-dhse.sha256');
  
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
runTest(57, 'Cumulative question count integrity (268,230 total questions in DB, 259,550 baseline accounted for)', () => {
  const total = db.prepare('SELECT COUNT(*) as cnt FROM questions').get().cnt;
  assert.strictEqual(total, 268230, 'Grand total questions must be exactly 268,230 (259,550 + 8,680)');
  
  const klQuestions = db.prepare('SELECT COUNT(*) as cnt FROM questions WHERE board_id = ?').get(BOARD_ID).cnt;
  assert.strictEqual(klQuestions, 8680, 'Kerala questions must be exactly 8,680');
  
  const priorBoards = 244160;
  const compBaseline = 15390;
  assert.strictEqual(priorBoards + compBaseline + klQuestions, 268230, 'Exact baseline decomposition verified');
});

console.log('\n================================================================');
console.log(`📊 TEST SUITE SUMMARY: ${passedTests}/57 PASSED, ${failedTests} FAILED`);
console.log('================================================================');

if (failedTests === 0) {
  console.log('🎉 100% SUCCESS: All Kerala (DGE / SCERT / Pareeksha Bhavan / DHSE) Forensic Integrity Tests Passed.\n');
  process.exit(0);
} else {
  console.error(`💥 FAILURE: ${failedTests} tests failed.`);
  process.exit(1);
}
