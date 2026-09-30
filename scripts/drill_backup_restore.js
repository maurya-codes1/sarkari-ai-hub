// scripts/drill_backup_restore.js
const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');

const backupSource = path.resolve(__dirname, '../backend/db/sarkari_core_post_phase23.db');
const drillDir = path.resolve(__dirname, '../backend/db/restore_drill');
const restoredDbPath = path.join(drillDir, 'sarkari_core_restored.db');

console.log('🔄 STARTING PHASE 24 BACKUP RESTORE DRILL...');
console.log('Source backup:', backupSource);

if (!fs.existsSync(backupSource)) {
  console.error('❌ Backup file does not exist:', backupSource);
  process.exit(1);
}

if (!fs.existsSync(drillDir)) {
  fs.mkdirSync(drillDir, { recursive: true });
}

// 1. Copy backup file to restored staging location
fs.copyFileSync(backupSource, restoredDbPath);
console.log('✅ Copied backup file to drill directory:', restoredDbPath);

// 2. Open restored SQLite database
const restoredDb = new Database(restoredDbPath, { readonly: false });
console.log('✅ Restored SQLite database opened successfully');

// 3. Verify SQLite integrity
const integrity = restoredDb.prepare('PRAGMA integrity_check').get();
console.log('✅ PRAGMA integrity_check:', integrity.integrity_check);
if (integrity.integrity_check !== 'ok') {
  throw new Error('Integrity check failed on restored database');
}

// 4. Verify foreign keys
const fkViolations = restoredDb.prepare('PRAGMA foreign_key_check').all();
console.log('✅ PRAGMA foreign_key_check violations:', fkViolations.length);
if (fkViolations.length > 0) {
  throw new Error('Foreign key violations detected on restored database');
}

// 5. Verify exam lookup
const exam = restoredDb.prepare('SELECT exam_id, name FROM exams LIMIT 1').get();
console.log('✅ Exam lookup verified:', exam.exam_id, '-', exam.name);

// 6. Verify question lookup
const question = restoredDb.prepare('SELECT question_id, question_type_id, full_exam_eligible FROM questions LIMIT 1').get();
console.log('✅ Question lookup verified:', question.question_id);

// 7. Verify source registry lookup
const source = restoredDb.prepare('SELECT source_id, issuing_authority FROM official_sources LIMIT 1').get();
console.log('✅ Official source registry verified:', source.source_id, `(${source.issuing_authority})`);

// 8. Verify total question count matches baseline
const totalQuestions = restoredDb.prepare('SELECT count(*) as c FROM questions').get().c;
console.log('✅ Restored total questions:', totalQuestions);
if (totalQuestions !== 172210) {
  throw new Error(`Question count mismatch: expected 172210, got ${totalQuestions}`);
}

restoredDb.close();
console.log('✅ Restored database connection closed cleanly');

// Cleanup restore drill copy to avoid lingering files
fs.unlinkSync(restoredDbPath);
fs.rmdirSync(drillDir);
console.log('🧹 Cleaned up temporary drill directory');
console.log('🎉 BACKUP RESTORE DRILL PASSED 100%');
