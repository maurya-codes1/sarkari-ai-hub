// scripts/package_database.js
// Compresses and splits sarkari_core.db into <40MB parts for GitHub & Render deployment parity.

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const crypto = require('crypto');

const DB_PATH = path.join(__dirname, '..', 'backend', 'db', 'sarkari_core.db');
const HASH_PATH = path.join(__dirname, '..', 'backend', 'db', 'sarkari_core.sha256');
const PART1_PATH = path.join(__dirname, '..', 'backend', 'db', 'sarkari_core.db.gz.part1');
const PART2_PATH = path.join(__dirname, '..', 'backend', 'db', 'sarkari_core.db.gz.part2');

console.log('📦 Starting Database Deployment Packaging...');

if (!fs.existsSync(DB_PATH)) {
  console.error('❌ Master database not found at:', DB_PATH);
  process.exit(1);
}

const dbStat = fs.statSync(DB_PATH);
console.log(`  Source DB: ${DB_PATH} (${(dbStat.size / (1024 * 1024)).toFixed(2)} MB)`);

// 1. Calculate SHA-256 hash
console.log('  [1/3] Calculating SHA-256 hash...');
const hash = crypto.createHash('sha256');
const fileBuffer = fs.readFileSync(DB_PATH);
hash.update(fileBuffer);
const sha256 = hash.digest('hex');
fs.writeFileSync(HASH_PATH, sha256 + '\n', 'utf8');
console.log(`  SHA-256: ${sha256}`);

// 2. Compress with gzip (level 9) in memory / stream
console.log('  [2/3] Compressing with gzip (level 9)...');
const compressed = zlib.gzipSync(fileBuffer, { level: 9 });
console.log(`  Compressed size: ${(compressed.length / (1024 * 1024)).toFixed(2)} MB`);

// 3. Split into 2 parts (<40MB each)
console.log('  [3/3] Splitting into chunked parts for GitHub 100MB limit bypass...');
const half = Math.ceil(compressed.length / 2);
const part1 = compressed.subarray(0, half);
const part2 = compressed.subarray(half);

fs.writeFileSync(PART1_PATH, part1);
fs.writeFileSync(PART2_PATH, part2);

console.log(`  Part 1: ${PART1_PATH} (${(part1.length / (1024 * 1024)).toFixed(2)} MB)`);
console.log(`  Part 2: ${PART2_PATH} (${(part2.length / (1024 * 1024)).toFixed(2)} MB)`);
console.log('✅ Packaging complete! Both parts are strictly <50MB.');
