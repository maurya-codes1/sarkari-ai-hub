const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, '../../../db/sarkari_core.db');
const db = new Database(dbPath);

console.log('🚀 Starting Atomic Deployment of West Bengal Master Question Bank & Revision Bundles...');

const baseDir = __dirname;
const c10Questions = JSON.parse(fs.readFileSync(path.join(baseDir, 'wbbse_c10_bank.json'), 'utf8'));
const c12SciQuestions = JSON.parse(fs.readFileSync(path.join(baseDir, 'wbchse_c12_science_bank.json'), 'utf8'));
const c12ComQuestions = JSON.parse(fs.readFileSync(path.join(baseDir, 'wbchse_c12_commerce_bank.json'), 'utf8'));
const c12HumQuestions = JSON.parse(fs.readFileSync(path.join(baseDir, 'wbchse_c12_humanities_bank.json'), 'utf8'));
const c12LangQuestions = JSON.parse(fs.readFileSync(path.join(baseDir, 'wbchse_c12_languages_bank.json'), 'utf8'));
const bundledNotes = JSON.parse(fs.readFileSync(path.join(baseDir, 'wb_bundled_notes.json'), 'utf8'));

const allQuestions = [
  ...c10Questions,
  ...c12SciQuestions,
  ...c12ComQuestions,
  ...c12HumQuestions,
  ...c12LangQuestions
];

console.log(`Total West Bengal Questions to Deploy: ${allQuestions.length}`);
console.log(`Total Bundled Notes to Deploy: ${bundledNotes.length}`);

const insertQ = db.prepare(`
  INSERT INTO questions (
    question_id, board_id, stage, subject_id, question_type_id,
    difficulty, marks, practice_eligible, full_exam_eligible,
    provenance, source_type, is_verified, is_published, trust_status, source_id,
    official_year, syllabus_status, pattern_status
  ) VALUES (
    @question_id, 'wbbse-wbchse-west-bengal', @stage, @subject_id, @question_type_id,
    @difficulty, @marks, @practice_eligible, @full_exam_eligible,
    @provenance, 'OFFICIAL_SOURCE', 1, 1, 'VERIFIED', @source_id,
    '2026-27', 'CURRENT', 'CURRENT'
  )
`);

const insertQV = db.prepare(`
  INSERT INTO question_versions (
    version_id, question_id, version_number, language_content,
    correct_answer, verified
  ) VALUES (
    @version_id, @question_id, 1, @language_content,
    @correct_answer, 1
  )
`);

const insertNote = db.prepare(`
  INSERT OR REPLACE INTO notes (
    note_id, subject_id, language_id, note_type, title,
    summary, content, verification_status, version, content_depth, provenance
  ) VALUES (
    @note_id, @subject_id, 'bn', 'FULL_NOTES', @title,
    @summary, @content, 'VERIFIED', '1.0', 'COMPREHENSIVE', 'OFFICIAL_SOURCE'
  )
`);

const deployTx = db.transaction(() => {
  db.pragma('foreign_keys = ON');

  // Purge any existing West Bengal ecosystem records safely
  db.prepare(`
    DELETE FROM cross_surface_question_usage 
    WHERE question_id IN (SELECT question_id FROM questions WHERE board_id = 'wbbse-wbchse-west-bengal')
  `).run();
  db.prepare(`
    DELETE FROM question_versions 
    WHERE question_id IN (SELECT question_id FROM questions WHERE board_id = 'wbbse-wbchse-west-bengal')
  `).run();
  db.prepare("DELETE FROM questions WHERE board_id = 'wbbse-wbchse-west-bengal'").run();
  db.prepare("DELETE FROM notes WHERE note_id LIKE 'note-wbbse-%' OR note_id LIKE 'note-wbchse-%'").run();

  const letterToIdx = { 'A': 0, 'B': 1, 'C': 2, 'D': 3 };

  let qCount = 0;
  for (const q of allQuestions) {
    const srcId = q.stage === 'Class 10' ? 'src-wbbse-portal' : 'src-wbchse-portal';
    insertQ.run({
      ...q,
      source_id: srcId
    });

    let parsedAns;
    if (q.question_type_id === 'single_mcq') {
      const idx = letterToIdx[q.correct_answer] !== undefined ? letterToIdx[q.correct_answer] : 0;
      parsedAns = JSON.stringify({ index: idx, correct_index: idx, text: q.correct_answer || 'A' });
    } else {
      parsedAns = JSON.stringify({ model_answer: q.correct_answer });
    }

    insertQV.run({
      version_id: `qv-${q.question_id}`,
      question_id: q.question_id,
      language_content: q.language_content,
      correct_answer: parsedAns
    });
    qCount++;
  }

  let nCount = 0;
  for (const n of bundledNotes) {
    insertNote.run({
      note_id: n.note_id,
      subject_id: n.subject_id,
      title: n.title,
      summary: n.summary,
      content: JSON.stringify({
        bundle_id: n.note_id,
        summary: n.summary,
        total_mcqs: n.mcqs_count,
        total_subjectives: n.subs_count,
        objectives: n.objectives,
        subjectives: n.subjectives
      })
    });
    nCount++;
  }

  return { qCount, nCount };
});

const result = deployTx();
console.log(`✅ Successfully deployed ${result.qCount} questions and ${result.nCount} bundled notes in atomic transaction.`);

// Verify live count
const liveCount = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'wbbse-wbchse-west-bengal'").get().c;
console.log(`🔍 Verified live questions count for 'wbbse-wbchse-west-bengal': ${liveCount}`);
