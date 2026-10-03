const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const dbPath = path.join(__dirname, '../db/sarkari_core.db');
const preBackupPath = path.join(__dirname, '../db/sarkari_core_pre_cbse.db');

console.log('📦 Step 1: Creating pre-CBSE safety backup...');
fs.copyFileSync(dbPath, preBackupPath);

console.log('Calculating SHA-256 of pre-CBSE backup...');
const fileBuffer = fs.readFileSync(preBackupPath);
const hash = crypto.createHash('sha256').update(fileBuffer).digest('hex');

const stat = fs.statSync(preBackupPath);
console.log(`✅ Backup created at: ${preBackupPath}`);
console.log(`📦 Size: ${(stat.size / (1024 * 1024)).toFixed(2)} MB`);
console.log(`🔑 SHA-256: ${hash}`);

// Save hash for final report
fs.writeFileSync(path.join(__dirname, '../db/sarkari_core_pre_cbse.sha256'), hash + '\n', 'utf8');
