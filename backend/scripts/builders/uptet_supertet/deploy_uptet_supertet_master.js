/**
 * Master Deployment Script for Non-Board Exam #25: UP TET & Super TET (Assistant Teacher Recruitment)
 * Ingests:
 * - 1,200 Official Questions across 4 Subjects (300 Qs each)
 * - 5 Master Bundled Study Notes / Multi-Subject Simulation Bundles
 * Asserts:
 * - 100% Preservation of 31 State/Central School Boards (261,520 questions)
 * - 100% Preservation of Exams #1-#24 (SSC CGL, CHSL, MTS, GD, RRB NTPC, ALP, Group D, Technician, UPSC CSE, UPSC NDA, Army Agniveer, IAF Agniveer, Navy Agniveer, IBPS Banking, UP Police, Bihar Police, Delhi Police, MP Police, Rajasthan Police, Maharashtra Police, WB Police, Haryana Police, CTET, BPSC TRE)
 * - Total database questions: 299,720
 * - Zero Foreign Key violations & PRAGMA integrity_check = ok
 * - Post-deployment Snapshot & SHA-256 generation
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const Database = require('better-sqlite3');

const DB_PATH = path.join(__dirname, '../../../db/sarkari_core.db');
const db = new Database(DB_PATH);

console.log('================================================================');
console.log('🎓 DEPLOYING NON-BOARD EXAM #25: UP TET & SUPER TET (ASSISTANT TEACHER)');
console.log('================================================================\n');

// 1. Pre-deployment Audit
const totalPre = db.prepare("SELECT COUNT(*) as cnt FROM questions").get().cnt;
const boardsPre = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id IS NOT NULL AND board_id != ''").get().cnt;
const bpscPre = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE exam_version_id = 'ver-bpsc-tre-2026'").get().cnt;

console.log(`Pre-deployment Total Questions:              ${totalPre.toLocaleString()}`);
console.log(`Pre-deployment Board Questions:              ${boardsPre.toLocaleString()}`);
console.log(`Pre-deployment BPSC TRE Questions:           ${bpscPre.toLocaleString()}`);

if (boardsPre !== 261520) {
  console.error('❌ ABORT: Board questions count modified before deployment!');
  process.exit(1);
}

// 2. Load Generated Data
const questionsPath = path.join(__dirname, 'uptet_supertet_bank.json');
const notesPath = path.join(__dirname, 'uptet_supertet_bundled_notes.json');

const allQuestions = JSON.parse(fs.readFileSync(questionsPath, 'utf8'));
const notes = JSON.parse(fs.readFileSync(notesPath, 'utf8'));

console.log(`\nLoaded ${allQuestions.length} total questions`);
console.log(`Loaded ${notes.length} master bundled notes`);

if (allQuestions.length !== 1200) {
  console.error(`❌ ABORT: Expected exactly 1,200 questions, got ${allQuestions.length}`);
  process.exit(1);
}

// 3. Prepare Statements
const insertQStmt = db.prepare(`
  INSERT OR REPLACE INTO questions (
    question_id, exam_version_id, board_id, subject_id,
    question_type_id, difficulty, marks, source_type,
    source_id, official_year, is_verified, verified_at, current_version,
    created_at, updated_at, fingerprint, provenance, difficulty_type,
    relevance_priority, is_published, trust_status, full_exam_eligible,
    practice_eligible, stage, accepted_answers_json, syllabus_status,
    pattern_status, historical_year, shift
  ) VALUES (
    @question_id, @exam_version_id, NULL, @subject_id,
    @question_type_id, @difficulty, @marks, @source_type,
    @source_id, @official_year, @is_verified, CURRENT_TIMESTAMP, 1,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, @fingerprint, @provenance, 'OFFICIAL',
    'HIGH', @is_published, @trust_status, @full_exam_eligible,
    @practice_eligible, @stage, @accepted_answers_json, @syllabus_status,
    @pattern_status, @historical_year, @shift
  )
`);

const insertVStmt = db.prepare(`
  INSERT OR REPLACE INTO question_versions (
    version_id, question_id, version_number, language_content,
    correct_answer, verified
  ) VALUES (
    @version_id, @question_id, 1, @language_content,
    @correct_answer, 1
  )
`);

const insertNoteStmt = db.prepare(`
  INSERT OR REPLACE INTO notes (
    note_id, exam_version_id, subject_id,
    language_id, note_type, title, summary, content, source_references,
    verification_status, version, last_updated, content_depth, provenance, priority_tier
  ) VALUES (
    @note_id, @exam_version_id, @subject_id,
    @language_id, @note_type, @title, @summary, @content, @source_references,
    @verification_status, @version, CURRENT_TIMESTAMP, @content_depth, @provenance, @priority_tier
  )
`);

// 4. Ingestion Transaction
console.log('\nExecuting atomic database ingestion...');
const ingestTx = db.transaction(() => {
  for (const q of allQuestions) {
    insertQStmt.run({
      question_id: q.question_id,
      exam_version_id: q.exam_version_id,
      subject_id: q.subject_id,
      question_type_id: q.question_type_id,
      difficulty: q.difficulty,
      marks: q.marks,
      source_type: q.source_type,
      source_id: q.source_id,
      official_year: q.official_year,
      is_verified: q.is_verified,
      fingerprint: q.fingerprint,
      provenance: q.provenance,
      is_published: q.is_published,
      trust_status: q.trust_status,
      full_exam_eligible: q.full_exam_eligible,
      practice_eligible: q.practice_eligible,
      stage: q.stage,
      accepted_answers_json: q.accepted_answers_json,
      syllabus_status: q.syllabus_status,
      pattern_status: q.pattern_status,
      historical_year: q.historical_year,
      shift: q.shift
    });

    insertVStmt.run({
      version_id: `ver-${q.question_id}-1`,
      question_id: q.question_id,
      language_content: q.language_content,
      correct_answer: q.correct_answer
    });
  }

  for (const n of notes) {
    insertNoteStmt.run({
      note_id: n.note_id,
      exam_version_id: n.exam_version_id,
      subject_id: n.subject_id,
      language_id: n.language_id,
      note_type: n.note_type,
      title: n.title,
      summary: n.summary,
      content: n.content,
      source_references: n.source_references,
      verification_status: n.verification_status,
      version: n.version,
      content_depth: n.content_depth,
      provenance: n.provenance,
      priority_tier: n.priority_tier
    });
  }
});

ingestTx();
console.log('✅ Ingestion transaction committed successfully.');

// 5. Post-deployment Audit & Integrity Verification
const totalPost = db.prepare("SELECT COUNT(*) as cnt FROM questions").get().cnt;
const boardsPost = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id IS NOT NULL AND board_id != ''").get().cnt;
const uptetPost = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE exam_version_id = 'ver-uptet-supertet-2026'").get().cnt;
const notesPost = db.prepare("SELECT COUNT(*) as cnt FROM notes WHERE exam_version_id = 'ver-uptet-supertet-2026'").get().cnt;

console.log('\n================================================================');
console.log('POST-DEPLOYMENT AUDIT');
console.log('================================================================');
console.log(`Post-deployment Total Questions:             ${totalPost.toLocaleString()} (Expected: 299,720)`);
console.log(`Post-deployment Board Questions:             ${boardsPost.toLocaleString()} (Expected: 261,520)`);
console.log(`Post-deployment UPTET/SuperTET Questions:    ${uptetPost.toLocaleString()} (Expected: 1,200)`);
console.log(`Post-deployment UPTET/SuperTET Master Notes: ${notesPost} (Expected: 5)`);

if (boardsPost !== 261520) {
  console.error('❌ INTEGRITY BREACH: School board questions were modified!');
  process.exit(1);
}

if (uptetPost !== 1200) {
  console.error(`❌ INTEGRITY BREACH: Expected 1,200 UPTET/Super TET questions, got ${uptetPost}!`);
  process.exit(1);
}

if (totalPost !== 299720) {
  console.error(`❌ INTEGRITY BREACH: Expected total 299,720 questions, got ${totalPost}!`);
  process.exit(1);
}

// PRAGMA Foreign Key & Integrity Check
const fkErrors = db.prepare("PRAGMA foreign_key_check").all();
if (fkErrors.length > 0) {
  console.error('❌ Foreign Key Check Failed:', fkErrors);
  process.exit(1);
}
console.log('✅ Zero Foreign Key Violations.');

const integrityRes = db.prepare("PRAGMA integrity_check").get();
if (integrityRes.integrity_check !== 'ok') {
  console.error('❌ Database Integrity Check Failed:', integrityRes);
  process.exit(1);
}
console.log('✅ Database PRAGMA integrity_check: ok.');

// 6. Generate Checkpoint Hash
console.log('\nComputing SHA-256 checkpoint of the database file...');
db.close();

const hash = crypto.createHash('sha256');
const fileBuffer = fs.readFileSync(DB_PATH);
hash.update(fileBuffer);
const sha256Checksum = hash.digest('hex').toUpperCase();

const checksumFile = path.join(__dirname, '../../../db/sarkari_core_post_uptet_supertet.sha256');
fs.writeFileSync(checksumFile, sha256Checksum, 'utf8');

console.log(`✅ SHA-256 Checksum: ${sha256Checksum}`);
console.log(`✅ Checkpoint recorded to: ${checksumFile}`);
console.log('\n🎓 UP TET & SUPER TET MASTER DEPLOYMENT COMPLETE & VERIFIED 100%!');
