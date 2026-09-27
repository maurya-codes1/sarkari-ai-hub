const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const Database = require('better-sqlite3');

const liveDb = path.resolve(__dirname, '../db/sarkari_core.db');
const backupDir = path.resolve(__dirname, '../backups/phase10-provenance-audit-backup');
if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true });

const backupFile = path.join(backupDir, 'sarkari_core_pre_provenance_audit.db');

console.log('=== STARTING PRE-PROVENANCE-AUDIT BACKUP ===');
const srcDb = new Database(liveDb);
srcDb.pragma('wal_checkpoint(TRUNCATE)');
srcDb.backup(backupFile)
  .then(() => {
    srcDb.close();
    const data = fs.readFileSync(backupFile);
    const sha256 = crypto.createHash('sha256').update(data).digest('hex');
    console.log('BACKUP_STATUS: SUCCESS');
    console.log('Database Path:', backupFile);
    console.log('Size:', data.length, 'bytes');
    console.log('SHA256:', sha256);
    console.log('Timestamp:', new Date().toISOString());

    const bDb = new Database(backupFile, { readonly: true });
    const schemaVersion = bDb.pragma('user_version', { simple: true });
    console.log('Schema User Version:', schemaVersion);
    const tbls = bDb.prepare("SELECT count(*) as c FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'").get().c;
    console.log('Table count:', tbls);
    const qCount = bDb.prepare("SELECT count(*) as c FROM questions").get().c;
    console.log('Questions count:', qCount);
    const integrity = bDb.prepare("PRAGMA integrity_check").get().integrity_check;
    console.log('PRAGMA integrity_check:', integrity);
    bDb.close();
  })
  .catch(err => {
    console.error('BACKUP_STATUS: FAILED', err);
    process.exit(1);
  });
