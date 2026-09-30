const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

const dbPath = path.join(__dirname, '../backend/db/sarkari_core.db');
const backupPath = path.join(__dirname, '../backend/db/sarkari_core_post_phase17i.db');

console.log('=== PHASE 17I POST-IMPLEMENTATION DATABASE BACKUP & SHA-256 ===');

const fileBuffer = fs.readFileSync(dbPath);
const hashSum = crypto.createHash('sha256');
hashSum.update(fileBuffer);
const hex = hashSum.digest('hex');

console.log(`Live DB File: ${dbPath}`);
console.log(`Live DB Size: ${fileBuffer.length} bytes`);
console.log(`Post-Phase17I SHA-256: ${hex}`);

fs.copyFileSync(dbPath, backupPath);
console.log(`Post-Phase17I backup created at: ${backupPath}`);

const backupBuffer = fs.readFileSync(backupPath);
const backupHashSum = crypto.createHash('sha256');
backupHashSum.update(backupBuffer);
const backupHex = backupHashSum.digest('hex');
console.log(`Backup SHA-256: ${backupHex}`);

if (hex === backupHex) {
  console.log('✅ POST-BACKUP INTEGRITY VERIFIED: Hashes match perfectly.');
} else {
  console.error('❌ POST-BACKUP INTEGRITY ERROR: Hash mismatch!');
  process.exit(1);
}
