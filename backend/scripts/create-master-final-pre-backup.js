const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const Database = require('better-sqlite3');

const liveDbPath = path.resolve(__dirname, '../db/sarkari_core.db');
const backupDir = path.resolve(__dirname, '../backups/phase10-master-final-backup');
const backupDbPath = path.join(backupDir, 'sarkari_core_pre_master_final.db');

if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

console.log('=== CREATING PRE-MASTER-FINAL BACKUP ===');
console.log('Source DB:', liveDbPath);

const srcDb = new Database(liveDbPath);
try {
  srcDb.pragma('wal_checkpoint(TRUNCATE)');
  console.log('WAL checkpoint (TRUNCATE) executed.');
} catch (e) {
  console.warn('Warning during WAL checkpoint:', e.message);
}

// Online backup
srcDb.backup(backupDbPath)
  .then(() => {
    srcDb.close();
    console.log('Backup copy created successfully at:', backupDbPath);

    const fileBytes = fs.readFileSync(backupDbPath);
    const sha256 = crypto.createHash('sha256').update(fileBytes).digest('hex');
    const size = fileBytes.length;

    console.log(`Size: ${size} bytes (${(size / 1024 / 1024).toFixed(2)} MB)`);
    console.log(`SHA-256: ${sha256}`);

    // Verify backup
    const bDb = new Database(backupDbPath, { readonly: true });
    const tables = bDb.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'").all().map(t => t.name);
    const questionsCount = bDb.prepare('SELECT count(*) as c FROM questions').get().c;
    const papersCount = bDb.prepare('SELECT count(*) as c FROM question_papers').get().c;
    const examsCount = bDb.prepare('SELECT count(*) as c FROM exams').get().c;
    const boardsCount = bDb.prepare('SELECT count(*) as c FROM boards').get().c;
    const sourcesCount = bDb.prepare('SELECT count(*) as c FROM official_sources').get().c;
    const pragmaIntegrity = bDb.prepare('PRAGMA integrity_check').get().integrity_check;
    const pragmaFk = bDb.prepare('PRAGMA foreign_key_check').all().length;
    bDb.close();

    console.log(`Tables count: ${tables.length}`);
    console.log(`Questions count: ${questionsCount}`);
    console.log(`Papers count: ${papersCount}`);
    console.log(`Exams count: ${examsCount}`);
    console.log(`Boards count: ${boardsCount}`);
    console.log(`Official sources count: ${sourcesCount}`);
    console.log(`PRAGMA integrity_check: ${pragmaIntegrity}`);
    console.log(`PRAGMA foreign_key_check: ${pragmaFk} violations`);

    const manifest = {
      timestamp: new Date().toISOString(),
      backupFile: 'sarkari_core_pre_master_final.db',
      sizeBytes: size,
      sha256: sha256,
      tableCount: tables.length,
      questionsCount,
      papersCount,
      examsCount,
      boardsCount,
      sourcesCount,
      integrityCheck: pragmaIntegrity,
      foreignKeyViolations: pragmaFk
    };

    fs.writeFileSync(path.join(backupDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
    fs.writeFileSync(path.join(backupDir, 'SHA256SUMS'), `${sha256} *sarkari_core_pre_master_final.db\n`);
    console.log('Manifest and SHA256SUMS written successfully.');
  })
  .catch(err => {
    console.error('Backup failed:', err);
    process.exit(1);
  });
