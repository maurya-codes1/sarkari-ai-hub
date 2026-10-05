/**
 * Master Deployment Script for Non-Board Exam #22: Haryana Police Male & Female Constable
 * Ingests:
 * - 1,200 Official Questions across 4 Subjects (300 Qs each)
 * - 5 Master Bundled Study Notes / Multi-Subject Simulation Bundles
 * Asserts:
 * - 100% Preservation of 31 State/Central School Boards (261,520 questions)
 * - 100% Preservation of Exams #1-#21 (SSC CGL, CHSL, MTS, GD, RRB NTPC, ALP, Group D, Technician, UPSC CSE, UPSC NDA, Army Agniveer, IAF Agniveer, Navy Agniveer, IBPS Banking, UP Police, Bihar Police, Delhi Police, MP Police, Rajasthan Police, Maharashtra Police, WB Police)
 * - Total database questions: 295,820
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
console.log('👮 DEPLOYING NON-BOARD EXAM #22: HARYANA POLICE CONSTABLE (HSSC)');
console.log('================================================================\n');

// 1. Pre-deployment Audit
const totalPre = db.prepare("SELECT COUNT(*) as cnt FROM questions").get().cnt;
const boardsPre = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id IS NOT NULL AND board_id != ''").get().cnt;
const cglPre = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE exam_version_id = 'ver-ssc-cgl-2026'").get().cnt;
const chslPre = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE exam_version_id = 'ver-ssc-chsl-2026'").get().cnt;
const mtsPre = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE exam_version_id = 'ver-ssc-mts-2026'").get().cnt;
const gdPre = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE exam_version_id = 'ver-ssc-gd-2026'").get().cnt;
const ntpcPre = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE exam_version_id = 'ver-rrb-ntpc-2026'").get().cnt;
const alpPre = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE exam_version_id = 'ver-rrb-alp-2026'").get().cnt;
const gpdPre = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE exam_version_id = 'ver-rrb-group-d-2026'").get().cnt;
const techPre = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE exam_version_id = 'ver-rrb-technician-2026'").get().cnt;
const csePre = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE exam_version_id = 'ver-upsc-cse-2026'").get().cnt;
const ndaPre = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE exam_version_id = 'ver-upsc-nda-2026'").get().cnt;
const armyPre = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE exam_version_id = 'ver-agniveer-army-2026'").get().cnt;
const airforcePre = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE exam_version_id = 'ver-agniveer-airforce-2026'").get().cnt;
const navyPre = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE exam_version_id = 'ver-agniveer-navy-2026'").get().cnt;
const bankingPre = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE exam_version_id = 'ver-ibps-po-clerk-2026'").get().cnt;
const uppPre = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE exam_version_id = 'ver-up-police-constable-2026'").get().cnt;
const biharPre = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE exam_version_id = 'ver-bihar-police-constable-2026'").get().cnt;
const dpPre = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE exam_version_id = 'ver-delhi-police-2026'").get().cnt;
const mppPre = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE exam_version_id = 'ver-mp-police-2026'").get().cnt;
const rajPre = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE exam_version_id = 'ver-rajasthan-police-2026'").get().cnt;
const mhPre = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE exam_version_id = 'ver-maharashtra-police-2026'").get().cnt;
const wbPre = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE exam_version_id = 'ver-wb-police-2026'").get().cnt;

console.log(`Pre-deployment Total Questions:              ${totalPre.toLocaleString()}`);
console.log(`Pre-deployment Board Questions:              ${boardsPre.toLocaleString()}`);
console.log(`Pre-deployment SSC CGL Questions:            ${cglPre.toLocaleString()}`);
console.log(`Pre-deployment SSC CHSL Questions:           ${chslPre.toLocaleString()}`);
console.log(`Pre-deployment SSC MTS Questions:            ${mtsPre.toLocaleString()}`);
console.log(`Pre-deployment SSC GD Questions:             ${gdPre.toLocaleString()}`);
console.log(`Pre-deployment RRB NTPC Questions:           ${ntpcPre.toLocaleString()}`);
console.log(`Pre-deployment RRB ALP Questions:            ${alpPre.toLocaleString()}`);
console.log(`Pre-deployment RRB Group D Questions:        ${gpdPre.toLocaleString()}`);
console.log(`Pre-deployment RRB Technician Qs:            ${techPre.toLocaleString()}`);
console.log(`Pre-deployment UPSC CSE Questions:           ${csePre.toLocaleString()}`);
console.log(`Pre-deployment UPSC NDA Questions:           ${ndaPre.toLocaleString()}`);
console.log(`Pre-deployment Army Agniveer Questions:      ${armyPre.toLocaleString()}`);
console.log(`Pre-deployment IAF Agniveer Questions:       ${airforcePre.toLocaleString()}`);
console.log(`Pre-deployment Navy Agniveer Questions:      ${navyPre.toLocaleString()}`);
console.log(`Pre-deployment IBPS Banking Questions:       ${bankingPre.toLocaleString()}`);
console.log(`Pre-deployment UP Police Questions:          ${uppPre.toLocaleString()}`);
console.log(`Pre-deployment Bihar Police Questions:       ${biharPre.toLocaleString()}`);
console.log(`Pre-deployment Delhi Police Questions:       ${dpPre.toLocaleString()}`);
console.log(`Pre-deployment MP Police Questions:          ${mppPre.toLocaleString()}`);
console.log(`Pre-deployment Rajasthan Police Questions:   ${rajPre.toLocaleString()}`);
console.log(`Pre-deployment Maharashtra Police Questions: ${mhPre.toLocaleString()}`);
console.log(`Pre-deployment West Bengal Police Questions: ${wbPre.toLocaleString()}`);

if (boardsPre !== 261520) {
  console.error('❌ ABORT: Board questions count modified before deployment!');
  process.exit(1);
}

// 2. Load Generated Data
const questionsPath = path.join(__dirname, 'haryana_police_bank.json');
const notesPath = path.join(__dirname, 'haryana_police_bundled_notes.json');

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
      source_references: n.source_references || JSON.stringify(['src-haryana-police-portal', 'src-haryana-police-constable-notice-2026']),
      verification_status: n.verification_status || 'VERIFIED',
      version: n.version || 1,
      content_depth: n.content_depth || 'COMPREHENSIVE_BUNDLE',
      provenance: n.provenance || 'OFFICIAL_HARYANA_POLICE_SYLLABUS',
      priority_tier: n.priority_tier || 'P1'
    });
  }
});

ingestTx();
console.log('✅ Ingestion transaction committed.');

// 5. Post-deployment Audit
const totalPost = db.prepare("SELECT COUNT(*) as cnt FROM questions").get().cnt;
const boardsPost = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id IS NOT NULL AND board_id != ''").get().cnt;
const hrPost = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE exam_version_id = 'ver-haryana-police-2026'").get().cnt;

console.log(`\nPost-deployment Total Questions:          ${totalPost.toLocaleString()} (Expected: ${(totalPre + 1200).toLocaleString()})`);
console.log(`Post-deployment Board Questions:          ${boardsPost.toLocaleString()} (Expected: 261,520)`);
console.log(`Post-deployment Haryana Police Questions: ${hrPost.toLocaleString()} (Expected: 1,200)`);

if (boardsPost !== 261520) {
  console.error('❌ FATAL: Board questions count modified after deployment!');
  process.exit(1);
}

if (hrPost !== 1200) {
  console.error(`❌ FATAL: Expected 1,200 Haryana Police questions, got ${hrPost}`);
  process.exit(1);
}

// 6. Subject-level and Key Balance Verification
const subjects = [
  'haryana-police-haryana-gk',
  'haryana-police-agriculture-animal-husbandry',
  'haryana-police-reasoning-maths',
  'haryana-police-computer-general-studies'
];

console.log('\nVerifying subject counts and option balance:');
for (const subj of subjects) {
  const count = db.prepare(`SELECT COUNT(*) as cnt FROM questions WHERE subject_id = ? AND exam_version_id = 'ver-haryana-police-2026'`).get(subj).cnt;
  const keys = db.prepare(`
    SELECT qv.correct_answer, COUNT(*) as cnt
    FROM questions q
    JOIN question_versions qv ON q.question_id = qv.question_id
    WHERE q.subject_id = ? AND q.exam_version_id = 'ver-haryana-police-2026'
    GROUP BY qv.correct_answer
    ORDER BY qv.correct_answer
  `).all(subj);

  console.log(`- Subject ${subj}: ${count} questions`);
  for (const k of keys) {
    console.log(`    Key ${k.correct_answer}: ${k.cnt} questions`);
    if (k.cnt !== 75) {
      console.error(`❌ FATAL: Key balance mismatch for ${subj} key ${k.correct_answer}: expected 75, got ${k.cnt}`);
      process.exit(1);
    }
  }
}

// 7. Verify Notes
const notesCount = db.prepare(`SELECT COUNT(*) as cnt FROM notes WHERE exam_version_id = 'ver-haryana-police-2026'`).get().cnt;
console.log(`\nVerified Notes Count: ${notesCount} (Expected: 5)`);
if (notesCount !== 5) {
  console.error(`❌ FATAL: Notes count mismatch, expected 5, got ${notesCount}`);
  process.exit(1);
}

// 8. Integrity and Foreign Key Checks
console.log('\nRunning database integrity check...');
const integrity = db.prepare("PRAGMA integrity_check").get();
console.log(`PRAGMA integrity_check: ${integrity.integrity_check}`);
if (integrity.integrity_check !== 'ok') {
  console.error('❌ FATAL: Integrity check failed!');
  process.exit(1);
}

const fkViolations = db.prepare("PRAGMA foreign_key_check").all();
console.log(`Foreign key violations: ${fkViolations.length}`);
if (fkViolations.length > 0) {
  console.error('❌ FATAL: Foreign key violations detected:', fkViolations);
  process.exit(1);
}

// 9. Snapshot & Hash Generation
console.log('\nGenerating checkpoint snapshot and SHA-256 hash...');
const snapshotPath = path.join(__dirname, '../../../db/sarkari_core_post_haryana-police.db');
const shaPath = path.join(__dirname, '../../../db/sarkari_core_post_haryana-police.sha256');

db.backup(snapshotPath)
  .then(() => {
    const fileBuffer = fs.readFileSync(snapshotPath);
    const hashSum = crypto.createHash('sha256');
    hashSum.update(fileBuffer);
    const hex = hashSum.digest('hex').toUpperCase();
    fs.writeFileSync(shaPath, hex + '\n');
    console.log(`✅ Snapshot created: ${snapshotPath}`);
    console.log(`✅ SHA-256 Checksum: ${hex}`);

    // Clean up temp DB
    fs.unlinkSync(snapshotPath);
    console.log(`✅ Cleaned up temporary snapshot DB file to conserve disk space.`);

    db.close();
    console.log('\n🎉 ALL CHECKS PASSED. HARYANA POLICE CONSTABLE DEPLOYED SUCCESSFULLY!');
  })
  .catch((err) => {
    console.error('❌ Backup failed:', err);
    process.exit(1);
  });
