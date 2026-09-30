const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, '../backend/db/sarkari_core.db');
const postBackupPath = path.join(__dirname, '../backend/db/sarkari_core_post_phase17j.db');

console.log('Running PRAGMA checks on sarkari_core.db...');
const db = new Database(dbPath);
const integrity = db.prepare('PRAGMA integrity_check').all();
console.log('Integrity check:', integrity);
if (integrity[0].integrity_check !== 'ok') {
  console.error('Integrity check failed!');
  process.exit(1);
}

const fkCheck = db.prepare('PRAGMA foreign_key_check').all();
console.log('FK check violations:', fkCheck.length);
if (fkCheck.length > 0) {
  console.error('Foreign key check failed:', fkCheck);
  process.exit(1);
}
db.close();

console.log(`Copying ${dbPath} -> ${postBackupPath}...`);
fs.copyFileSync(dbPath, postBackupPath);

const fileBuffer = fs.readFileSync(postBackupPath);
const hashSum = crypto.createHash('sha256');
hashSum.update(fileBuffer);
const sha256 = hashSum.digest('hex');

console.log('Post-Phase17J Backup Created Successfully.');
console.log(`Path: ${postBackupPath}`);
console.log(`Size: ${(fileBuffer.length / (1024 * 1024)).toFixed(2)} MB`);
console.log(`SHA-256: ${sha256}`);

// Save SHA-256 to a file for traceability
fs.writeFileSync(path.join(__dirname, '../backend/db/sarkari_core_post_phase17j.sha256'), sha256 + '  sarkari_core_post_phase17j.db\n');
console.log('Checksum written to backend/db/sarkari_core_post_phase17j.sha256');
