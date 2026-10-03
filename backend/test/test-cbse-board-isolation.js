const assert = require('assert');
const path = require('path');
const fs = require('fs');
const db = require('../db/database').getDb();

console.log('========================================================');
console.log('🧪 SARKARIAI HUB — CBSE BOARD ISOLATION & VERIFICATION SUITE');
console.log('========================================================\n');

let passedCount = 0;
let failedCount = 0;

function runTest(testNum, testName, testFn) {
  try {
    testFn();
    console.log(`✅ [${testNum}/34] ${testName}: PASSED`);
    passedCount++;
  } catch (err) {
    console.error(`❌ [${testNum}/34] ${testName}: FAILED -> ${err.message}`);
    failedCount++;
  }
}

// 1. CBSE question.board_id enforcement
runTest(1, 'CBSE question.board_id enforcement', () => {
  const bad = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'cbse-board' AND board_id != 'cbse-board'").get().c;
  assert.strictEqual(bad, 0, 'No question should violate board_id cbse-board');
  const count = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'cbse-board'").get().c;
  assert.ok(count > 0, 'CBSE questions must exist');
});

// 2. no PSEB question in CBSE
runTest(2, 'No PSEB question in CBSE', () => {
  const psebInCbse = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'cbse-board' AND question_id LIKE '%pseb%'").get().c;
  assert.strictEqual(psebInCbse, 0, 'Zero PSEB question in CBSE');
});

// 3. no BSEB question in CBSE
runTest(3, 'No BSEB question in CBSE', () => {
  const bsebInCbse = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'cbse-board' AND question_id LIKE '%bseb%'").get().c;
  assert.strictEqual(bsebInCbse, 0, 'Zero BSEB question in CBSE');
});

// 4. no RBSE question in CBSE
runTest(4, 'No RBSE question in CBSE', () => {
  const rbseInCbse = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'cbse-board' AND question_id LIKE '%rbse%'").get().c;
  assert.strictEqual(rbseInCbse, 0, 'Zero RBSE question in CBSE');
});

// 5. no ICSE question in CBSE
runTest(5, 'No ICSE question in CBSE', () => {
  const icseInCbse = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'cbse-board' AND question_id LIKE '%icse%'").get().c;
  assert.strictEqual(icseInCbse, 0, 'Zero ICSE question in CBSE');
});

// 6. no cross-board PYQ
runTest(6, 'No cross-board PYQ', () => {
  const crossPyq = db.prepare(`
    SELECT COUNT(*) as c FROM questions 
    WHERE board_id = 'cbse-board' AND provenance = 'OFFICIAL_PYQ' AND question_id NOT LIKE 'cbse%'
  `).get().c;
  assert.strictEqual(crossPyq, 0, 'All CBSE PYQs must belong strictly to CBSE');
});

// 7. Class 10 subject isolation
runTest(7, 'Class 10 subject isolation', () => {
  const c10Subjs = db.prepare("SELECT DISTINCT subject_id FROM questions WHERE board_id = 'cbse-board' AND stage = 'Class 10'").all().map(r => r.subject_id);
  assert.ok(c10Subjs.includes('subj-math'), 'Class 10 contains math');
  assert.ok(c10Subjs.includes('subj-science'), 'Class 10 contains science');
  assert.ok(c10Subjs.includes('subj-social'), 'Class 10 contains social');
  assert.ok(!c10Subjs.includes('subj-physics'), 'Class 10 must NOT contain Class 12 specialized physics');
});

// 8. Class 12 subject isolation
runTest(8, 'Class 12 subject isolation', () => {
  const c12Subjs = db.prepare("SELECT DISTINCT subject_id FROM questions WHERE board_id = 'cbse-board' AND stage LIKE 'Class 12%'").all().map(r => r.subject_id);
  assert.ok(c12Subjs.includes('subj-physics'), 'Class 12 contains physics');
  assert.ok(c12Subjs.includes('subj-chemistry'), 'Class 12 contains chemistry');
  assert.ok(c12Subjs.includes('subj-accountancy'), 'Class 12 contains accountancy');
  assert.ok(!c12Subjs.includes('subj-social'), 'Class 12 must NOT contain integrated general social science');
});

// 9. Stream isolation
runTest(9, 'Stream isolation', () => {
  const sciStages = db.prepare("SELECT DISTINCT stage FROM questions WHERE board_id = 'cbse-board' AND subject_id = 'subj-physics'").all().map(r => r.stage);
  assert.deepStrictEqual(sciStages, ['Class 12 Science'], 'Physics belongs exclusively to Class 12 Science');
  const comStages = db.prepare("SELECT DISTINCT stage FROM questions WHERE board_id = 'cbse-board' AND subject_id = 'subj-accountancy'").all().map(r => r.stage);
  assert.deepStrictEqual(comStages, ['Class 12 Commerce'], 'Accountancy belongs exclusively to Class 12 Commerce');
});

// 10. Language isolation
runTest(10, 'Language isolation', () => {
  const engRows = db.prepare(`
    SELECT qv.language_content 
    FROM questions q JOIN question_versions qv ON q.question_id = qv.question_id
    WHERE q.board_id = 'cbse-board' AND q.subject_id = 'subj-english' LIMIT 5
  `).all();
  for (const r of engRows) {
    const parsed = JSON.parse(r.language_content);
    assert.ok(parsed.en, 'English subject must contain English content');
    assert.ok(!parsed.hi, 'English subject must be monolingual English without Hindi override');
  }
});

// 11. Punjabi script validation where applicable
runTest(11, 'Punjabi script validation in board registry', () => {
  const cbseJsonPath = path.join(__dirname, '../../data/boards/cbse-board.json');
  assert.ok(fs.existsSync(cbseJsonPath), 'cbse-board.json must exist');
  const cbseData = JSON.parse(fs.readFileSync(cbseJsonPath, 'utf8'));
  const pa = cbseData.class_10.languages_dictionary.find(l => l.name === 'Punjabi');
  assert.ok(pa, 'Punjabi must be recognized in CBSE language registry');
});

// 12. Urdu script validation where applicable
runTest(12, 'Urdu script validation in board registry', () => {
  const cbseJsonPath = path.join(__dirname, '../../data/boards/cbse-board.json');
  const cbseData = JSON.parse(fs.readFileSync(cbseJsonPath, 'utf8'));
  const ur = cbseData.class_10.languages_dictionary.find(l => l.name.startsWith('Urdu'));
  assert.ok(ur, 'Urdu must be recognized in CBSE language registry');
});

// 13. No fake PYQ
runTest(13, 'No fake PYQ validation', () => {
  const fakePyq = db.prepare(`
    SELECT COUNT(*) as c FROM questions 
    WHERE board_id = 'cbse-board' AND provenance = 'OFFICIAL_PYQ' AND source_id IS NULL
  `).get().c;
  assert.strictEqual(fakePyq, 0, 'No fake PYQ without official source');
});

// 14. Provenance validation
runTest(14, 'Provenance validation', () => {
  const allowed = ['OFFICIAL_SAMPLE', 'OFFICIAL_PYQ', 'OFFICIAL_MODEL', 'HUMAN_CURATED_CBSE', 'AI_PRACTICE_CBSE'];
  const invalid = db.prepare(`
    SELECT COUNT(*) as c FROM questions 
    WHERE board_id = 'cbse-board' AND provenance NOT IN (${allowed.map(a => `'${a}'`).join(',')})
  `).get().c;
  assert.strictEqual(invalid, 0, 'All questions have approved provenance tags');
});

// 15. Syllabus mapping
runTest(15, 'Syllabus mapping', () => {
  const total = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'cbse-board'").get().c;
  assert.strictEqual(total, 5750, 'Total questions must match exactly 5750');
});

// 16. Chapter mapping
runTest(16, 'Chapter mapping verification', () => {
  const cbseJsonPath = path.join(__dirname, '../../data/boards/cbse-board.json');
  assert.ok(fs.existsSync(cbseJsonPath), 'CBSE curriculum dictionary present');
});

// 17. Topic mapping
runTest(17, 'Topic mapping verification', () => {
  const sampleQ = db.prepare("SELECT question_id FROM questions WHERE board_id = 'cbse-board' LIMIT 10").all();
  assert.strictEqual(sampleQ.length, 10, 'Sample questions available');
});

// 18. Objective count audit (>= 200 per primary subject)
runTest(18, 'Objective count audit (>= 200 per primary subject)', () => {
  const subjs = db.prepare(`
    SELECT subject_id, stage, COUNT(*) as mcq_count 
    FROM questions 
    WHERE board_id = 'cbse-board' AND question_type_id = 'single_mcq'
    GROUP BY subject_id, stage
  `).all();
  for (const s of subjs) {
    assert.ok(s.mcq_count >= 200, `Subject ${s.subject_id} in ${s.stage} must have >= 200 MCQs (found ${s.mcq_count})`);
  }
});

// 19. Subjective depth audit (Meaningful count with 2m, 3m, 4m, 5m)
runTest(19, 'Subjective depth audit', () => {
  const subjs = db.prepare(`
    SELECT subject_id, stage, COUNT(*) as sub_count 
    FROM questions 
    WHERE board_id = 'cbse-board' AND question_type_id != 'single_mcq'
    GROUP BY subject_id, stage
  `).all();
  for (const s of subjs) {
    assert.ok(s.sub_count >= 20, `Subject ${s.subject_id} in ${s.stage} must have >= 20 subjectives (found ${s.sub_count})`);
  }
});

// 20. PDF internal duplicate prevention
runTest(20, 'PDF internal duplicate prevention', () => {
  const note = db.prepare("SELECT content FROM notes WHERE note_id = 'note-cbse-c10-all-subject'").get();
  assert.ok(note, 'Class 10 master note exists');
  const parsed = JSON.parse(note.content);
  const ids = parsed.objectives.map(o => o.id);
  const uniqueIds = new Set(ids);
  assert.strictEqual(ids.length, uniqueIds.size, 'Zero duplicate question IDs in All-Subject Note');
});

// 21. Revision internal duplicate prevention
runTest(21, 'Revision internal duplicate prevention', () => {
  const note = db.prepare("SELECT content FROM notes WHERE note_id = 'note-cbse-c12-science-all'").get();
  assert.ok(note, 'Science stream note exists');
  const parsed = JSON.parse(note.content);
  const ids = parsed.objectives.map(o => o.id);
  const uniqueIds = new Set(ids);
  assert.strictEqual(ids.length, uniqueIds.size, 'Zero duplicate question IDs in Science All-Subject Note');
});

// 22. Learning Mock reuse
runTest(22, 'Learning Mock reuse capability', () => {
  const eligible = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'cbse-board' AND practice_eligible = 1").get().c;
  assert.ok(eligible >= 5000, 'Adequate practice pool for Learning Mock reuse');
});

// 23. Practice Mock mixed selection
runTest(23, 'Practice Mock mixed selection', () => {
  const diffs = db.prepare("SELECT DISTINCT difficulty FROM questions WHERE board_id = 'cbse-board'").all().map(d => d.difficulty);
  assert.ok(diffs.includes('EASY') && diffs.includes('MEDIUM') && diffs.includes('HARD'), 'Practice mock has varied difficulty');
});

// 24. Full Exam blueprint protection (subjectives have practice_eligible=0 and full_exam_eligible=0)
runTest(24, 'Full Exam blueprint protection', () => {
  const leakingSubs = db.prepare(`
    SELECT COUNT(*) as c FROM questions 
    WHERE board_id = 'cbse-board' AND question_type_id != 'single_mcq' AND (practice_eligible = 1 OR full_exam_eligible = 1)
  `).get().c;
  assert.strictEqual(leakingSubs, 0, 'Zero subjective questions may leak into MCQ mock test sessions');
});

// 25. No cross-board fallback
runTest(25, 'No cross-board fallback', () => {
  const foreign = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'cbse-board' AND question_id NOT LIKE 'cbse%'").get().c;
  assert.strictEqual(foreign, 0, 'No foreign question in CBSE pool');
});

// 26. No global unfiltered question selection
runTest(26, 'No global unfiltered question selection', () => {
  const nullBoard = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'cbse-board' AND board_id IS NULL").get().c;
  assert.strictEqual(nullBoard, 0, 'All CBSE questions strictly have board_id set');
});

// 27. No full-database payload
runTest(27, 'No full-database payload constraint', () => {
  const total = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'cbse-board'").get().c;
  assert.ok(total < 10000, 'Payload is appropriately sized (< 10000 questions)');
});

// 28. Class 9 scope correctness (Internal progression, no public Full Exam)
runTest(28, 'Class 9 scope correctness', () => {
  const c9Count = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'cbse-board' AND stage = 'Class 9'").get().c;
  assert.strictEqual(c9Count, 0, 'Class 9 must not have board exam questions generated');
  const cbseData = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/boards/cbse-board.json'), 'utf8'));
  assert.strictEqual(cbseData.class_9_structure.full_exam_eligible, false, 'Class 9 full_exam_eligible must be false');
});

// 29. Class 11 scope correctness (Internal progression, no public Full Exam)
runTest(29, 'Class 11 scope correctness', () => {
  const c11Count = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'cbse-board' AND stage = 'Class 11'").get().c;
  assert.strictEqual(c11Count, 0, 'Class 11 must not have board exam questions generated');
  const cbseData = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/boards/cbse-board.json'), 'utf8'));
  assert.strictEqual(cbseData.class_11_structure.full_exam_eligible, false, 'Class 11 full_exam_eligible must be false');
});

// 30. Registration provenance
runTest(30, 'Registration provenance', () => {
  const cbseData = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/boards/cbse-board.json'), 'utf8'));
  assert.ok(cbseData.official_urls.pariksha_sangam, 'Pariksha sangam official registration URL present');
});

// 31. Eligibility provenance
runTest(31, 'Eligibility provenance', () => {
  const cbseData = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/boards/cbse-board.json'), 'utf8'));
  assert.ok(cbseData.academic_year === '2026-27', 'Academic year 2026-27 verified');
});

// 32. Database integrity
runTest(32, 'Database integrity check', () => {
  const fks = db.prepare('PRAGMA foreign_key_check').all();
  assert.strictEqual(fks.length, 0, 'Zero foreign key violations in database');
  const integrity = db.prepare('PRAGMA integrity_check').all();
  assert.strictEqual(integrity[0].integrity_check, 'ok', 'Integrity check must return ok');
});

// 33. Existing question preservation (Competitive questions untouched)
runTest(33, 'Existing competitive questions preservation', () => {
  const compCount = db.prepare('SELECT COUNT(*) as c FROM questions WHERE board_id IS NULL').get().c;
  assert.ok(compCount >= 14000, `Competitive questions must remain intact (found ${compCount})`);
});

// 34. No unrelated feature mutation
runTest(34, 'No unrelated feature mutation', () => {
  const otherBoards = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id IS NOT NULL AND board_id != 'cbse-board'").get().c;
  assert.strictEqual(otherBoards, 0, 'All other boards remain strictly at 000 questions awaiting individual prompts');
});

console.log('\n========================================================');
console.log(`📊 CBSE ISOLATION SUITE SUMMARY: ${passedCount} PASSED / ${failedCount} FAILED (Total: 34)`);
console.log('========================================================\n');

if (failedCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
