const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const Database = require('better-sqlite3');

const backupDir = path.resolve(__dirname, '../backups/final-micro-correction-backup');
if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true });

const dbPath = path.resolve(__dirname, '../db/sarkari_core.db');
const backupDbPath = path.join(backupDir, 'sarkari_core_pre_micro_correction.db');

fs.copyFileSync(dbPath, backupDbPath);

const dbBuffer = fs.readFileSync(backupDbPath);
const sha256 = crypto.createHash('sha256').update(dbBuffer).digest('hex');
const dbSize = fs.statSync(backupDbPath).size;

const db = new Database(backupDbPath, { readonly: true });
const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name").all();

const rowCounts = {};
for (const t of tables) {
  const row = db.prepare(`SELECT COUNT(*) as c FROM "${t.name}"`).get();
  rowCounts[t.name] = row.c;
}
db.close();

const snapshot = {
  timestamp: new Date().toISOString(),
  phase: 'Phase 10.1 Final Micro-Correction Safe Snapshot',
  dbFile: 'sarkari_core_pre_micro_correction.db',
  dbPath: backupDbPath,
  dbSizeBytes: dbSize,
  sha256: sha256,
  tableCount: tables.length,
  gitWorkingTree: 'C:\\Users\\guddu\\.gemini\\antigravity\\scratch\\sarkari-ai-portal',
  rowCounts: rowCounts
};

fs.writeFileSync(path.join(backupDir, 'pre_micro_correction_snapshot.json'), JSON.stringify(snapshot, null, 2));
fs.writeFileSync(path.join(backupDir, 'SHA256SUMS'), `${sha256}  sarkari_core_pre_micro_correction.db\n`);

console.log('BACKUP_COMPLETED');
console.log('Size:', dbSize);
console.log('SHA256:', sha256);
console.log('Tables:', tables.length);
