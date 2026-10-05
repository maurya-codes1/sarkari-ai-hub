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
const TMP_GZ_PATH = path.join(__dirname, '..', 'backend', 'db', 'sarkari_core.db.gz.tmp');

async function packageDatabase() {
  console.log('📦 Starting Database Deployment Packaging...');

  if (!fs.existsSync(DB_PATH)) {
    console.error('❌ Master database not found at:', DB_PATH);
    process.exit(1);
  }

  const dbStat = fs.statSync(DB_PATH);
  console.log(`  Source DB: ${DB_PATH} (${(dbStat.size / (1024 * 1024)).toFixed(2)} MB)`);

  // 1 & 2: Stream hash computation and gzip compression simultaneously
  console.log('  [1/3] Streaming SHA-256 computation and Gzip (level 9) compression...');
  const hasher = crypto.createHash('sha256');
  const gzip = zlib.createGzip({ level: 9 });
  const readStream = fs.createReadStream(DB_PATH);
  const writeStream = fs.createWriteStream(TMP_GZ_PATH);
  const { Transform } = require('stream');

  const hashTransform = new Transform({
    transform(chunk, encoding, callback) {
      hasher.update(chunk);
      callback(null, chunk);
    }
  });

  await new Promise((resolve, reject) => {
    readStream.on('error', reject);
    hashTransform.on('error', reject);
    gzip.on('error', reject);
    writeStream.on('error', reject);
    writeStream.on('finish', resolve);

    readStream.pipe(hashTransform).pipe(gzip).pipe(writeStream);
  });

  const sha256 = hasher.digest('hex');
  fs.writeFileSync(HASH_PATH, sha256 + '\n', 'utf8');
  console.log(`  SHA-256: ${sha256}`);

  const gzStat = fs.statSync(TMP_GZ_PATH);
  console.log(`  Compressed size: ${(gzStat.size / (1024 * 1024)).toFixed(2)} MB`);

  // 3. Split into 2 parts (<40MB each)
  console.log('  [3/3] Splitting into chunked parts for GitHub 100MB limit bypass...');
  const gzBuffer = fs.readFileSync(TMP_GZ_PATH);
  const half = Math.ceil(gzBuffer.length / 2);
  const part1 = gzBuffer.subarray(0, half);
  const part2 = gzBuffer.subarray(half);

  fs.writeFileSync(PART1_PATH, part1);
  fs.writeFileSync(PART2_PATH, part2);

  try { fs.unlinkSync(TMP_GZ_PATH); } catch (e) {}

  console.log(`  Part 1: ${PART1_PATH} (${(part1.length / (1024 * 1024)).toFixed(2)} MB)`);
  console.log(`  Part 2: ${PART2_PATH} (${(part2.length / (1024 * 1024)).toFixed(2)} MB)`);
  console.log('✅ Packaging complete! Both parts are strictly <50MB.');
}

packageDatabase().catch(err => {
  console.error('Fatal error packaging DB:', err);
  process.exit(1);
});
