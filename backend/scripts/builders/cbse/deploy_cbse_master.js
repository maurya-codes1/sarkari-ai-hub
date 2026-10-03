const fs = require('fs');
const path = require('path');
const db = require('../../../db/database').getDb();

console.log('🚀 Starting Atomic Deployment of CBSE Master Question Bank & Notes...');

const baseDir = __dirname;
const c10Questions = JSON.parse(fs.readFileSync(path.join(baseDir, 'cbse_c10_bank.json'), 'utf8'));
const c12SciQuestions = JSON.parse(fs.readFileSync(path.join(baseDir, 'cbse_c12_science_bank.json'), 'utf8'));
const c12ComQuestions = JSON.parse(fs.readFileSync(path.join(baseDir, 'cbse_c12_commerce_bank.json'), 'utf8'));
const c12HumQuestions = JSON.parse(fs.readFileSync(path.join(baseDir, 'cbse_c12_humanities_bank.json'), 'utf8'));
const bundledNotes = JSON.parse(fs.readFileSync(path.join(baseDir, 'cbse_bundled_notes.json'), 'utf8'));

const allQuestions = [...c10Questions, ...c12SciQuestions, ...c12ComQuestions, ...c12HumQuestions];
console.log(`Total CBSE Questions to Deploy: ${allQuestions.length}`);
console.log(`Total Bundled Notes to Deploy: ${bundledNotes.length}`);

const insertQ = db.prepare(`
  INSERT INTO questions (
    question_id, board_id, stage, subject_id, question_type_id,
    difficulty, marks, practice_eligible, full_exam_eligible,
    provenance, source_type, is_verified, is_published, trust_status, source_id
  ) VALUES (
    @question_id, 'cbse-board', @stage, @subject_id, @question_type_id,
    @difficulty, @marks, @practice_eligible, @full_exam_eligible,
    @provenance, 'OFFICIAL_SOURCE', 1, 1, 'VERIFIED', 'src-cbse-board-portal'
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
    @note_id, @subject_id, 'en', 'FULL_NOTES', @title,
    @summary, @content, 'VERIFIED', '1.0', 'COMPREHENSIVE', 'OFFICIAL_SOURCE'
  )
`);

const deployTx = db.transaction(() => {
  db.pragma('foreign_keys = ON');

  // Purge any existing CBSE records
  db.prepare(`
    DELETE FROM question_versions 
    WHERE question_id IN (SELECT question_id FROM questions WHERE board_id = 'cbse-board')
  `).run();
  db.prepare("DELETE FROM questions WHERE board_id = 'cbse-board'").run();
  db.prepare("DELETE FROM notes WHERE note_id LIKE 'note-cbse-%'").run();

  let qCount = 0;
  for (const q of allQuestions) {
    insertQ.run(q);
    insertQV.run({
      version_id: `qv-${q.question_id}`,
      question_id: q.question_id,
      language_content: q.language_content,
      correct_answer: q.correct_answer
    });
    qCount++;
  }

  let nCount = 0;
  for (const n of bundledNotes) {
    insertNote.run({
      note_id: n.note_id,
      subject_id: n.stream_id === 'general' ? 'subj-math' : (n.stream_id.startsWith('science') ? 'subj-physics' : (n.stream_id === 'commerce' ? 'subj-accountancy' : 'subj-history')),
      title: n.title,
      summary: n.summary,
      content: JSON.stringify({
        objectives: n.objectives,
        subjectives: n.subjectives,
        metadata: {
          class: n.class_id,
          stream: n.stream_id,
          mcq_count: n.mcqs_count,
          sub_count: n.subs_count
        }
      })
    });
    nCount++;
  }

  return { qCount, nCount };
});

const result = deployTx();
console.log(`[SUCCESS] Deployed ${result.qCount} questions and ${result.nCount} notes successfully!`);

// Verify Foreign Keys
const fkErrors = db.prepare('PRAGMA foreign_key_check').all();
console.log(`Foreign Key Errors: ${fkErrors.length}`);
if (fkErrors.length > 0) {
  console.error('FK Errors details:', fkErrors);
  process.exit(1);
}

// Integrity Check
const integrity = db.prepare('PRAGMA integrity_check').all();
console.log(`Integrity Check: ${integrity[0].integrity_check}`);

// Summary stats
const stats = db.prepare(`
  SELECT 
    stage,
    SUM(CASE WHEN question_type_id = 'single_mcq' THEN 1 ELSE 0 END) as mcq_count,
    SUM(CASE WHEN question_type_id != 'single_mcq' THEN 1 ELSE 0 END) as sub_count,
    COUNT(*) as total_count
  FROM questions
  WHERE board_id = 'cbse-board'
  GROUP BY stage
`).all();

console.log('\n--- CBSE DEPLOYMENT SUMMARY BY STAGE ---');
console.table(stats);
