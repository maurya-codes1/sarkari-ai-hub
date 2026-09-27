const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const Database = require('better-sqlite3');

const liveDbPath = path.resolve(__dirname, '../db/sarkari_core.db');
const backupDir = path.resolve(__dirname, '../backups/pre-3-correction-backup');
const backupDbPath = path.join(backupDir, 'sarkari_core_pre_3_correction.db');

if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

console.log('=== STEP 1: CREATING PRE-3-CORRECTION SAFETY BACKUP ===');
const srcDb = new Database(liveDbPath);
srcDb.pragma('wal_checkpoint(TRUNCATE)');

srcDb.backup(backupDbPath)
  .then(() => {
    srcDb.close();
    const fileBytes = fs.readFileSync(backupDbPath);
    const sha256 = crypto.createHash('sha256').update(fileBytes).digest('hex');
    const size = fileBytes.length;

    console.log(`Safety Backup Created: ${backupDbPath}`);
    console.log(`Size: ${size} bytes (${(size / 1024 / 1024).toFixed(2)} MB)`);
    console.log(`SHA-256: ${sha256}`);

    const bDb = new Database(backupDbPath, { readonly: true });
    const pragmaIntegrity = bDb.prepare('PRAGMA integrity_check').get().integrity_check;
    const pragmaFk = bDb.prepare('PRAGMA foreign_key_check').all().length;
    const tablesCount = bDb.prepare("SELECT count(*) as c FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'").get().c;
    const questionsCount = bDb.prepare('SELECT count(*) as c FROM questions').get().c;
    bDb.close();

    console.log(`Tables: ${tablesCount}`);
    console.log(`Questions: ${questionsCount}`);
    console.log(`Integrity: ${pragmaIntegrity}`);
    console.log(`FK Violations: ${pragmaFk}`);

    fs.writeFileSync(path.join(backupDir, 'SHA256SUMS'), `${sha256} *sarkari_core_pre_3_correction.db\n`);
  })
  .catch(err => {
    console.error('Safety backup failed:', err);
    process.exit(1);
  });
