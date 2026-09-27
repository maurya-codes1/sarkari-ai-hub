// backend/scripts/pre-correction-backup.js
// Pre-Correction Addendum Safe Snapshot

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { getDb } = require('../db/database');

function createPreCorrectionBackup() {
  const db = getDb();
  db.pragma('wal_checkpoint(TRUNCATE)');

  const src = path.resolve(__dirname, '../db/sarkari_core.db');
  const backupDir = path.resolve(__dirname, '../backups/pre-correction-phase10.1-backup');
  if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true });

  const destDb = path.join(backupDir, 'sarkari_core_pre_correction.db');
  fs.copyFileSync(src, destDb);

  const buf = fs.readFileSync(destDb);
  const sha256 = crypto.createHash('sha256').update(buf).digest('hex');
  const stats = fs.statSync(destDb);

  const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name").all();
  const rowCounts = {};
  for (const t of tables) {
    try {
      rowCounts[t.name] = db.prepare(`SELECT COUNT(*) as c FROM "${t.name}"`).get().c;
    } catch (e) {
      rowCounts[t.name] = e.message;
    }
  }

  const report = {
    timestamp: new Date().toISOString(),
    phase: 'Pre-Correction Addendum Safe Snapshot',
    dbFile: 'sarkari_core_pre_correction.db',
    dbSizeBytes: stats.size,
    sha256,
    tableCount: tables.length,
    gitStatus: 'git CLI not available in PATH on Windows host',
    workingTreeStatus: 'Active workspace at C:\\Users\\guddu\\.gemini\\antigravity\\scratch\\sarkari-ai-portal',
    rowCounts
  };

  fs.writeFileSync(path.join(backupDir, 'pre_correction_snapshot.json'), JSON.stringify(report, null, 2));
  fs.writeFileSync(path.join(backupDir, 'SHA256SUMS'), `${sha256}  sarkari_core_pre_correction.db\n`);

  console.log('✅ Pre-Correction Backup successfully created:');
  console.log('  File:', destDb);
  console.log('  Size:', stats.size, 'bytes');
  console.log('  Tables:', tables.length);
  console.log('  SHA-256:', sha256);
}

if (require.main === module) {
  createPreCorrectionBackup();
}

module.exports = { createPreCorrectionBackup };
