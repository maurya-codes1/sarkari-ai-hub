const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const Database = require('better-sqlite3');

const liveDbPath = path.resolve(__dirname, '../db/sarkari_core.db');
const backupDir = path.resolve(__dirname, '../backups/phase11-post-schema-backup');
const backupDbPath = path.join(backupDir, 'sarkari_core_post_schema.db');

if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

console.log('=== CREATING PHASE 11 POST-SCHEMA BACKUP ===');
const srcDb = new Database(liveDbPath);
srcDb.pragma('wal_checkpoint(TRUNCATE)');

srcDb.backup(backupDbPath)
  .then(() => {
    srcDb.close();
    const backupBytes = fs.readFileSync(backupDbPath);
    const backupSha = crypto.createHash('sha256').update(backupBytes).digest('hex');
    const backupSize = backupBytes.length;

    const bDb = new Database(backupDbPath, { readonly: true });
    const tablesCount = bDb.prepare("SELECT count(*) as c FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'").get().c;
    const questionsCount = bDb.prepare('SELECT count(*) as c FROM questions').get().c;
    const pragmaIntegrity = bDb.prepare('PRAGMA integrity_check').get().integrity_check;
    const pragmaFk = bDb.prepare('PRAGMA foreign_key_check').all().length;
    bDb.close();

    console.log(`Backup Size: ${backupSize} bytes (${(backupSize / 1024 / 1024).toFixed(2)} MB)`);
    console.log(`Backup SHA-256: ${backupSha}`);
    console.log(`Tables count: ${tablesCount} (Original 67 + 14 Phase 11 = 81)`);
    console.log(`Questions count: ${questionsCount}`);
    console.log(`PRAGMA integrity_check: ${pragmaIntegrity}`);
    console.log(`PRAGMA foreign_key_check: ${pragmaFk} violations`);

    const manifest = {
      timestamp: new Date().toISOString(),
      backupType: 'PHASE11_POST_SCHEMA_BACKUP',
      backupPath: backupDbPath,
      sizeBytes: backupSize,
      sha256: backupSha,
      tableCount: tablesCount,
      questionsCount,
      integrityCheck: pragmaIntegrity,
      foreignKeyViolations: pragmaFk
    };

    fs.writeFileSync(path.join(backupDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
    fs.writeFileSync(path.join(backupDir, 'SHA256SUMS'), `${backupSha} *sarkari_core_post_schema.db\n`);
    console.log('Post-schema backup manifest and SHA256SUMS saved successfully.');
  })
  .catch(err => {
    console.error('Post-schema backup failed:', err);
    process.exit(1);
  });
