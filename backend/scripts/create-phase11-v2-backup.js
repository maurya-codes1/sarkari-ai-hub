// backend/scripts/create-phase11-v2-backup.js
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const Database = require('better-sqlite3');

const sourceDbPath = path.resolve('backend/db/sarkari_core.db');
const targetDir = path.resolve('backend/backups/phase11-final-frozen-v2');
const targetDbPath = path.join(targetDir, 'phase11_final_frozen_v2.db');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Ensure source DB is wal checkpointed
const sourceDb = new Database(sourceDbPath);
sourceDb.pragma('wal_checkpoint(TRUNCATE)');
sourceDb.close();

// Copy to final frozen v2
fs.copyFileSync(sourceDbPath, targetDbPath);

// Calculate SHA-256
const buf = fs.readFileSync(targetDbPath);
const sha256 = crypto.createHash('sha256').update(buf).digest('hex');
const fileSize = fs.statSync(targetDbPath).size;

// Verify with sqlite
const v2Db = new Database(targetDbPath);
const integrity = v2Db.pragma('integrity_check')[0].integrity_check;
const fkCheck = v2Db.pragma('foreign_key_check');
const tableCount = v2Db.prepare("SELECT count(*) as c FROM sqlite_master WHERE type='table'").get().c;
const questionCount = v2Db.prepare('SELECT count(*) as c FROM questions').get().c;
const calendarCount = v2Db.prepare('SELECT count(*) as c FROM exam_calendar_events').get().c;
const localeCount = v2Db.prepare('SELECT count(*) as c FROM languages WHERE is_ui_language = 1 OR is_expanded_ui_language = 1').get().c;
v2Db.close();

const manifest = {
  backup_name: 'phase11_final_frozen_v2.db',
  backup_path: targetDbPath,
  timestamp: new Date().toISOString(),
  file_size_bytes: fileSize,
  sha256: sha256,
  sqlite_integrity: integrity,
  fk_violations: fkCheck.length,
  table_count: tableCount,
  question_count: questionCount,
  calendar_event_count: calendarCount,
  active_locale_count: localeCount,
  test_count: 415
};

console.log('=== PHASE 11 FINAL FROZEN V2 BACKUP CREATED ===');
console.log(JSON.stringify(manifest, null, 2));

fs.writeFileSync(path.resolve('phase11_v2_backup_manifest.json'), JSON.stringify(manifest, null, 2));
