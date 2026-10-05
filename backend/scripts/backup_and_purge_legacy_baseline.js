/**
 * Script to safely backup and purge ONLY the old 15,390 baseline questions
 * where board_id IS NULL OR board_id = ''
 * 
 * Preserves 100% of the 261,520 questions across all 31 boards.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const Database = require('better-sqlite3');

const DB_PATH = path.join(__dirname, '../db/sarkari_core.db');
const db = new Database(DB_PATH);

console.log('================================================================');
console.log('🛡️ PHASE 1: SAFE BACKUP & PURGE OF OLD NON-BOARD BASELINE DATA');
console.log('================================================================\n');

// 1. Verify pre-purge counts
const totalQsPre = db.prepare('SELECT COUNT(*) as cnt FROM questions').get().cnt;
const boardQsPre = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id IS NOT NULL AND board_id != ''").get().cnt;
const oldNonBoardQsPre = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id IS NULL OR board_id = ''").get().cnt;

console.log(`Pre-purge Total Questions:       ${totalQsPre.toLocaleString()}`);
console.log(`Pre-purge 31 Boards Questions:   ${boardQsPre.toLocaleString()} (MUST REMAIN 100% PRESERVED)`);
console.log(`Pre-purge Old Baseline Questions: ${oldNonBoardQsPre.toLocaleString()} (TO BE BACKED UP & PURGED)`);

if (boardQsPre !== 261520) {
  console.error(`❌ ABORT: Expected 261,520 board questions, found ${boardQsPre}`);
  process.exit(1);
}

if (oldNonBoardQsPre !== 15390) {
  console.error(`❌ ABORT: Expected 15,390 old baseline questions, found ${oldNonBoardQsPre}`);
  process.exit(1);
}

// 2. Create physical backup of sarkari_core.db before purge
const backupDbPath = path.join(__dirname, '../db/sarkari_core_pre_nonboard_purge.db');
console.log(`\nCreating full database snapshot to: ${backupDbPath}...`);
fs.copyFileSync(DB_PATH, backupDbPath);

const hash = crypto.createHash('sha256');
const buffer = fs.readFileSync(backupDbPath);
hash.update(buffer);
const backupSha256 = hash.digest('hex').toUpperCase();
fs.writeFileSync(path.join(__dirname, '../db/sarkari_core_pre_nonboard_purge.sha256'), backupSha256 + '\n', 'utf8');
console.log(`Backup created. SHA-256: ${backupSha256}`);

// 3. Export old 15,390 questions to JSON archive
console.log('\nExporting 15,390 old questions to legacy_nonboard_baseline_backup.json...');
const oldQuestions = db.prepare("SELECT * FROM questions WHERE board_id IS NULL OR board_id = ''").all();
const oldQids = oldQuestions.map(q => q.question_id);

const oldVersions = db.prepare(`
  SELECT * FROM question_versions 
  WHERE question_id IN (SELECT question_id FROM questions WHERE board_id IS NULL OR board_id = '')
`).all();

const oldTags = db.prepare(`
  SELECT * FROM question_tags 
  WHERE question_id IN (SELECT question_id FROM questions WHERE board_id IS NULL OR board_id = '')
`).all();

const oldPaperQs = db.prepare(`
  SELECT * FROM paper_questions 
  WHERE question_id IN (SELECT question_id FROM questions WHERE board_id IS NULL OR board_id = '')
`).all();

const exportData = {
  description: 'Full archival backup of legacy 15,390 competitive baseline questions prior to clean official reconstitution',
  exported_at: new Date().toISOString(),
  questions_count: oldQuestions.length,
  versions_count: oldVersions.length,
  tags_count: oldTags.length,
  paper_questions_count: oldPaperQs.length,
  questions: oldQuestions,
  versions: oldVersions,
  tags: oldTags,
  paper_questions: oldPaperQs
};

const jsonBackupPath = path.join(__dirname, '../db/legacy_nonboard_baseline_backup.json');
fs.writeFileSync(jsonBackupPath, JSON.stringify(exportData, null, 2), 'utf8');
console.log(`Archival JSON saved to: ${jsonBackupPath} (${oldQuestions.length} Qs, ${oldVersions.length} versions)`);

// 4. Execute atomic transaction to purge old baseline data
console.log('\nExecuting atomic transaction to purge ONLY the old 15,390 baseline rows...');

const tx = db.transaction(() => {
  // Purge references first to respect foreign keys
  db.prepare(`
    DELETE FROM cross_surface_question_usage 
    WHERE question_id IN (SELECT question_id FROM questions WHERE board_id IS NULL OR board_id = '')
  `).run();

  db.prepare(`
    DELETE FROM paper_questions 
    WHERE question_id IN (SELECT question_id FROM questions WHERE board_id IS NULL OR board_id = '')
  `).run();

  db.prepare(`
    DELETE FROM question_tags 
    WHERE question_id IN (SELECT question_id FROM questions WHERE board_id IS NULL OR board_id = '')
  `).run();

  db.prepare(`
    DELETE FROM question_versions 
    WHERE question_id IN (SELECT question_id FROM questions WHERE board_id IS NULL OR board_id = '')
  `).run();

  // Purge old questions
  const res = db.prepare("DELETE FROM questions WHERE board_id IS NULL OR board_id = ''").run();
  console.log(`Deleted ${res.changes} questions from questions table.`);
});

tx();

// 5. Post-purge verification
const totalQsPost = db.prepare('SELECT COUNT(*) as cnt FROM questions').get().cnt;
const boardQsPost = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id IS NOT NULL AND board_id != ''").get().cnt;
const oldNonBoardQsPost = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id IS NULL OR board_id = ''").get().cnt;

console.log('\n--- POST-PURGE VERIFICATION ---');
console.log(`Post-purge Total Questions:       ${totalQsPost.toLocaleString()} (Expected exactly 261,520)`);
console.log(`Post-purge 31 Boards Questions:   ${boardQsPost.toLocaleString()} (100% Preserved)`);
console.log(`Post-purge Old Baseline Questions: ${oldNonBoardQsPost.toLocaleString()} (Expected 0)`);

if (totalQsPost !== 261520 || boardQsPost !== 261520 || oldNonBoardQsPost !== 0) {
  console.error('❌ POST-PURGE COUNT MISMATCH!');
  process.exit(1);
}

// 6. Database Health Checks
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

// 7. Vacuum DB to reclaim space and optimize
console.log('\nRunning VACUUM to reclaim space and optimize indexes...');
db.exec('VACUUM;');
console.log('VACUUM complete.');

// 8. Create post-purge backup and SHA-256
const postPurgeDbPath = path.join(__dirname, '../db/sarkari_core_post_nonboard_purge.db');
console.log(`Creating post-purge snapshot to: ${postPurgeDbPath}...`);
fs.copyFileSync(DB_PATH, postPurgeDbPath);

const postHash = crypto.createHash('sha256');
const postBuffer = fs.readFileSync(postPurgeDbPath);
postHash.update(postBuffer);
const postPurgeSha256 = postHash.digest('hex').toUpperCase();
fs.writeFileSync(path.join(__dirname, '../db/sarkari_core_post_nonboard_purge.sha256'), postPurgeSha256 + '\n', 'utf8');
console.log(`Post-purge DB SHA-256: ${postPurgeSha256}`);

console.log('\n🎉 SUCCESS: Old baseline purged cleanly. 261,520 Board Questions 100% Intact & Healthy!');
