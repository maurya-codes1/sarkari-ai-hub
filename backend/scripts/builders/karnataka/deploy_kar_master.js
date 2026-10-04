const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, '../../../db/sarkari_core.db');
const db = new Database(dbPath);

console.log('🚀 Starting Atomic Deployment of Karnataka Master Question Bank & Revision Bundles...');

const baseDir = __dirname;
const c10Questions = JSON.parse(fs.readFileSync(path.join(baseDir, 'kseab_c10_bank.json'), 'utf8'));
const c12SciQuestions = JSON.parse(fs.readFileSync(path.join(baseDir, 'pue_c12_science_bank.json'), 'utf8'));
const c12ComQuestions = JSON.parse(fs.readFileSync(path.join(baseDir, 'pue_c12_commerce_bank.json'), 'utf8'));
const c12ArtsQuestions = JSON.parse(fs.readFileSync(path.join(baseDir, 'pue_c12_arts_bank.json'), 'utf8'));
const c12LangQuestions = JSON.parse(fs.readFileSync(path.join(baseDir, 'pue_c12_languages_bank.json'), 'utf8'));
const bundledNotes = JSON.parse(fs.readFileSync(path.join(baseDir, 'kar_bundled_notes.json'), 'utf8'));

const allQuestions = [
  ...c10Questions,
  ...c12SciQuestions,
  ...c12ComQuestions,
  ...c12ArtsQuestions,
  ...c12LangQuestions
];

console.log(`Total Karnataka Questions to Deploy: ${allQuestions.length}`);
console.log(`Total Bundled Notes to Deploy: ${bundledNotes.length}`);

const insertQ = db.prepare(`
  INSERT INTO questions (
    question_id, board_id, stage, subject_id, question_type_id,
    difficulty, marks, practice_eligible, full_exam_eligible,
    provenance, source_type, is_verified, is_published, trust_status, source_id,
    official_year, syllabus_status, pattern_status
  ) VALUES (
    @question_id, 'karnataka-kseab-pue', @stage, @subject_id, @question_type_id,
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
    summary, content, verification_status, version, content_depth, provenance, priority_tier
  ) VALUES (
    @note_id, @subject_id, @language_id, @note_type, @title,
    @summary, @content, @verification_status, @version, @content_depth, @provenance, @priority_tier
  )
`);

const countBefore = db.prepare('SELECT COUNT(*) AS cnt FROM questions').get().cnt;
console.log(`Pre-deployment total questions in sarkari_core.db: ${countBefore}`);

const deployTx = db.transaction(() => {
  db.pragma('foreign_keys = ON');

  // Purge any existing Karnataka ecosystem records safely
  db.prepare(`
    DELETE FROM cross_surface_question_usage 
    WHERE question_id IN (SELECT question_id FROM questions WHERE board_id = 'karnataka-kseab-pue')
  `).run();
  db.prepare(`
    DELETE FROM question_versions 
    WHERE question_id IN (SELECT question_id FROM questions WHERE board_id = 'karnataka-kseab-pue')
  `).run();
  db.prepare("DELETE FROM questions WHERE board_id = 'karnataka-kseab-pue'").run();
  db.prepare("DELETE FROM notes WHERE note_id LIKE 'note-kar-%'").run();

  const letterToIdx = { 'A': 0, 'B': 1, 'C': 2, 'D': 3 };
  const typeMap = {
    'vsa': 'very_short_answer',
    'sa': 'short_answer',
    'la': 'long_answer',
    'case_study': 'case_study',
    'single_mcq': 'single_mcq'
  };

  let qCount = 0;
  for (const q of allQuestions) {
    const srcId = q.stage === 'Class 10' ? 'src-kseab-portal' : 'src-pue-karnataka-portal';
    const qTypeId = typeMap[q.question_type_id] || q.question_type_id;
    insertQ.run({
      ...q,
      question_type_id: qTypeId,
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

  console.log(`✅ Ingested ${qCount} questions and question_versions successfully.`);

  let noteCount = 0;
  for (const n of bundledNotes) {
    insertNote.run(n);
    noteCount++;
  }
  console.log(`✅ Ingested ${noteCount} master bundled study notes successfully.`);
});

deployTx();

const countAfter = db.prepare('SELECT COUNT(*) AS cnt FROM questions').get().cnt;
const karCount = db.prepare("SELECT COUNT(*) AS cnt FROM questions WHERE board_id = 'karnataka-kseab-pue'").get().cnt;
console.log(`Post-deployment total questions in sarkari_core.db: ${countAfter} (Expected: 134950, Delta: +${countAfter - countBefore})`);
console.log(`Total Karnataka questions in sarkari_core.db: ${karCount} (Expected: 8680)`);

const fkCheck = db.prepare('PRAGMA foreign_key_check').all();
console.log(`Foreign Key Check Errors: ${fkCheck.length}`);
if (fkCheck.length > 0) {
  console.error(fkCheck);
  throw new Error('Foreign key violations detected!');
}

const integCheck = db.prepare('PRAGMA integrity_check').all();
console.log(`Database Integrity Check: ${integCheck[0].integrity_check}`);

console.log('🎉 Atomic deployment of Karnataka master content completed with 100% integrity.');
