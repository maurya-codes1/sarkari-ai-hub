const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const dbPath = path.join(__dirname, '../db/sarkari_core.db');
const postBackupPath = path.join(__dirname, '../db/sarkari_core_post_cbse.db');

console.log('📦 Step 8: Creating post-CBSE safety backup...');
fs.copyFileSync(dbPath, postBackupPath);

console.log('Calculating SHA-256 of post-CBSE backup...');
const fileBuffer = fs.readFileSync(postBackupPath);
const hash = crypto.createHash('sha256').update(fileBuffer).digest('hex');

const stat = fs.statSync(postBackupPath);
console.log(`✅ Backup created at: ${postBackupPath}`);
console.log(`📦 Size: ${(stat.size / (1024 * 1024)).toFixed(2)} MB`);
console.log(`🔑 Post-CBSE SHA-256: ${hash}`);

fs.writeFileSync(path.join(__dirname, '../db/sarkari_core_post_cbse.sha256'), hash + '\n', 'utf8');
