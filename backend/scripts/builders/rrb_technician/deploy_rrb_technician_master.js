/**
 * Atomic Master Deployment Script for Non-Board Exam #8: RRB Technician (Grade I & Grade III)
 * Ingests 1,800 authentic questions across 6 subjects and 5 master bundled notes.
 * 
 * Verifies:
 * - Pre-deployment Board questions: 261,520 (100% Preserved)
 * - Pre-deployment SSC CGL questions: 2,800 (100% Preserved)
 * - Pre-deployment SSC CHSL questions: 2,700 (100% Preserved)
 * - Pre-deployment SSC MTS questions: 1,200 (100% Preserved)
 * - Pre-deployment SSC GD questions: 1,500 (100% Preserved)
 * - Pre-deployment RRB NTPC questions: 1,800 (100% Preserved)
 * - Pre-deployment RRB ALP questions: 1,800 (100% Preserved)
 * - Pre-deployment RRB Group D questions: 1,200 (100% Preserved)
 * - Added RRB Technician questions: 1,800
 * - Post-deployment Total questions: 276,320
 * - PRAGMA foreign_key_check = 0 violations
 * - PRAGMA integrity_check = ok
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const Database = require('better-sqlite3');

const DB_PATH = path.join(__dirname, '../../../db/sarkari_core.db');
const db = new Database(DB_PATH);

console.log('================================================================');
console.log('🚀 DEPLOYING NON-BOARD EXAM #8: RRB TECHNICIAN (1,800 QUESTIONS & 5 NOTES)');
console.log('================================================================\n');

// 1. Verify pre-deployment state
const totalPre = db.prepare('SELECT COUNT(*) as cnt FROM questions').get().cnt;
const boardsPre = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id IS NOT NULL AND board_id != ''").get().cnt;
const cglPre = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE exam_version_id = 'ver-ssc-cgl-2026'").get().cnt;
const chslPre = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE exam_version_id = 'ver-ssc-chsl-2026'").get().cnt;
const mtsPre = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE exam_version_id = 'ver-ssc-mts-2026'").get().cnt;
const gdPre = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE exam_version_id = 'ver-ssc-gd-2026'").get().cnt;
const ntpcPre = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE exam_version_id = 'ver-rrb-ntpc-2026'").get().cnt;
const alpPre = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE exam_version_id = 'ver-rrb-alp-2026'").get().cnt;
const gpdPre = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE exam_version_id = 'ver-rrb-group-d-2026'").get().cnt;

console.log(`Pre-deployment Total Questions:       ${totalPre.toLocaleString()}`);
console.log(`Pre-deployment Board Questions:       ${boardsPre.toLocaleString()}`);
console.log(`Pre-deployment SSC CGL Questions:     ${cglPre.toLocaleString()}`);
console.log(`Pre-deployment SSC CHSL Questions:    ${chslPre.toLocaleString()}`);
console.log(`Pre-deployment SSC MTS Questions:     ${mtsPre.toLocaleString()}`);
console.log(`Pre-deployment SSC GD Questions:      ${gdPre.toLocaleString()}`);
console.log(`Pre-deployment RRB NTPC Questions:    ${ntpcPre.toLocaleString()}`);
console.log(`Pre-deployment RRB ALP Questions:     ${alpPre.toLocaleString()}`);
console.log(`Pre-deployment RRB Group D Questions: ${gpdPre.toLocaleString()}`);

if (boardsPre !== 261520) {
  console.error(`❌ ABORT: Expected 261,520 board questions, found ${boardsPre}`);
  process.exit(1);
}
if (cglPre !== 2800) {
  console.error(`❌ ABORT: Expected 2,800 SSC CGL questions, found ${cglPre}`);
  process.exit(1);
}
if (chslPre !== 2700) {
  console.error(`❌ ABORT: Expected 2,700 SSC CHSL questions, found ${chslPre}`);
  process.exit(1);
}
if (mtsPre !== 1200) {
  console.error(`❌ ABORT: Expected 1,200 SSC MTS questions, found ${mtsPre}`);
  process.exit(1);
}
if (gdPre !== 1500) {
  console.error(`❌ ABORT: Expected 1,500 SSC GD questions, found ${gdPre}`);
  process.exit(1);
}
if (ntpcPre !== 1800) {
  console.error(`❌ ABORT: Expected 1,800 RRB NTPC questions, found ${ntpcPre}`);
  process.exit(1);
}
if (alpPre !== 1800) {
  console.error(`❌ ABORT: Expected 1,800 RRB ALP questions, found ${alpPre}`);
  process.exit(1);
}
if (gpdPre !== 1200) {
  console.error(`❌ ABORT: Expected 1,200 RRB Group D questions, found ${gpdPre}`);
  process.exit(1);
}

// 2. Load JSON banks
const baseDir = __dirname;
const allQuestions = JSON.parse(fs.readFileSync(path.join(baseDir, 'rrb_technician_bank.json'), 'utf8'));
const notes = JSON.parse(fs.readFileSync(path.join(baseDir, 'rrb_technician_bundled_notes.json'), 'utf8'));

console.log(`Loaded ${allQuestions.length} total questions`);
console.log(`Loaded ${notes.length} master bundled notes`);

if (allQuestions.length !== 1800) {
  console.error(`❌ ABORT: Expected exactly 1,800 questions, got ${allQuestions.length}`);
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

// 4. Execute atomic transaction
console.log('\nExecuting atomic database ingestion...');
const deployTx = db.transaction(() => {
  for (const q of allQuestions) {
    const fp = crypto.createHash('sha256').update(q.question_id + q.subject_id + q.correct_answer).digest('hex');
    q.fingerprint = fp;

    insertQStmt.run(q);

    insertVStmt.run({
      version_id: `${q.question_id}-v1`,
      question_id: q.question_id,
      language_content: q.language_content,
      correct_answer: q.correct_answer
    });
  }

  for (const n of notes) {
    insertNoteStmt.run(n);
  }
});

deployTx();

console.log('✅ Ingestion transaction committed.');

// 5. Verification
const totalPost = db.prepare('SELECT COUNT(*) as cnt FROM questions').get().cnt;
const boardsPost = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id IS NOT NULL AND board_id != ''").get().cnt;
const cglPost = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE exam_version_id = 'ver-ssc-cgl-2026'").get().cnt;
const chslPost = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE exam_version_id = 'ver-ssc-chsl-2026'").get().cnt;
const mtsPost = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE exam_version_id = 'ver-ssc-mts-2026'").get().cnt;
const gdPost = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE exam_version_id = 'ver-ssc-gd-2026'").get().cnt;
const ntpcPost = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE exam_version_id = 'ver-rrb-ntpc-2026'").get().cnt;
const alpPost = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE exam_version_id = 'ver-rrb-alp-2026'").get().cnt;
const gpdPost = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE exam_version_id = 'ver-rrb-group-d-2026'").get().cnt;
const techPost = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE exam_version_id = 'ver-rrb-technician-2026'").get().cnt;
const techNotesPost = db.prepare("SELECT COUNT(*) as cnt FROM notes WHERE note_id LIKE 'note-tech-%'").get().cnt;

console.log('\n--- POST-DEPLOYMENT VERIFICATION ---');
console.log(`Total Questions in Database:       ${totalPost.toLocaleString()} (Expected 276,320)`);
console.log(`Board Questions in Database:       ${boardsPost.toLocaleString()} (Expected 261,520 - 100% Preserved)`);
console.log(`SSC CGL Questions:                 ${cglPost.toLocaleString()} (Expected 2,800 - 100% Preserved)`);
console.log(`SSC CHSL Questions:                ${chslPost.toLocaleString()} (Expected 2,700 - 100% Preserved)`);
console.log(`SSC MTS Questions:                 ${mtsPost.toLocaleString()} (Expected 1,200 - 100% Preserved)`);
console.log(`SSC GD Questions:                  ${gdPost.toLocaleString()} (Expected 1,500 - 100% Preserved)`);
console.log(`RRB NTPC Questions:                ${ntpcPost.toLocaleString()} (Expected 1,800 - 100% Preserved)`);
console.log(`RRB ALP Questions:                 ${alpPost.toLocaleString()} (Expected 1,800 - 100% Preserved)`);
console.log(`RRB Group D Questions:             ${gpdPost.toLocaleString()} (Expected 1,200 - 100% Preserved)`);
console.log(`RRB Technician Questions:          ${techPost.toLocaleString()} (Expected 1,800)`);
console.log(`RRB Technician Master Bundles:     ${techNotesPost} (Expected 5)`);

if (totalPost !== 276320 || boardsPost !== 261520 || cglPost !== 2800 || chslPost !== 2700 || mtsPost !== 1200 || gdPost !== 1500 || ntpcPost !== 1800 || alpPost !== 1800 || gpdPost !== 1200 || techPost !== 1800 || techNotesPost !== 5) {
  console.error('❌ POST-DEPLOYMENT AUDIT MISMATCH!');
  process.exit(1);
}

// 6. DB Integrity & FK Check
const fkViolations = db.pragma('foreign_key_check');
console.log(`\nForeign Key Violations: ${fkViolations.length}`);
if (fkViolations.length > 0) {
  console.error('❌ FK VIOLATIONS DETECTED:', fkViolations);
  process.exit(1);
}

const integrity = db.pragma('integrity_check');
console.log(`Database Integrity Check: ${integrity[0].integrity_check}`);
if (integrity[0].integrity_check !== 'ok') {
  console.error('❌ INTEGRITY CHECK FAILED');
  process.exit(1);
}

// 7. Post-deployment Backup & SHA-256
const postDbPath = path.join(__dirname, '../../../db/sarkari_core_post_rrb-technician.db');
console.log(`\nCreating post-RRB Technician snapshot to: ${postDbPath}...`);
fs.copyFileSync(DB_PATH, postDbPath);

const hash = crypto.createHash('sha256');
const buffer = fs.readFileSync(postDbPath);
hash.update(buffer);
const postSha256 = hash.digest('hex').toUpperCase();
fs.writeFileSync(path.join(__dirname, '../../../db/sarkari_core_post_rrb-technician.sha256'), postSha256 + '\n', 'utf8');
console.log(`Post-RRB Technician DB SHA-256: ${postSha256}`);

console.log('\n🎉 SUCCESS: RRB Technician successfully deployed and verified!');
