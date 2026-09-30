// scripts/unpack_database.js
// Unpacks and verifies sarkari_core.db from chunked gzip parts

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const crypto = require('crypto');

const DB_PATH = path.join(__dirname, '..', 'backend', 'db', 'sarkari_core.db');
const HASH_PATH = path.join(__dirname, '..', 'backend', 'db', 'sarkari_core.sha256');
const PART1_PATH = path.join(__dirname, '..', 'backend', 'db', 'sarkari_core.db.gz.part1');
const PART2_PATH = path.join(__dirname, '..', 'backend', 'db', 'sarkari_core.db.gz.part2');

function unpackDatabase(force = false) {
  if (fs.existsSync(DB_PATH) && !force) {
    const stat = fs.statSync(DB_PATH);
    if (stat.size > 500 * 1024 * 1024) {
      console.log(`[Unpack] Master database already exists (${(stat.size / (1024 * 1024)).toFixed(2)} MB). Skipping unpack.`);
      return true;
    }
  }

  if (!fs.existsSync(PART1_PATH) || !fs.existsSync(PART2_PATH)) {
    console.error('[Unpack] Error: Deployment parts not found.');
    return false;
  }

  console.log('[Unpack] Assembling chunked archives...');
  const part1 = fs.readFileSync(PART1_PATH);
  const part2 = fs.readFileSync(PART2_PATH);
  const fullArchive = Buffer.concat([part1, part2]);
  console.log(`[Unpack] Reassembled archive size: ${(fullArchive.length / (1024 * 1024)).toFixed(2)} MB`);

  console.log('[Unpack] Decompressing gzip payload (this takes ~2-4 seconds)...');
  const dbBuffer = zlib.gunzipSync(fullArchive);
  console.log(`[Unpack] Decompressed database size: ${(dbBuffer.length / (1024 * 1024)).toFixed(2)} MB`);

  // Verify hash if available
  if (fs.existsSync(HASH_PATH)) {
    const expectedHash = fs.readFileSync(HASH_PATH, 'utf8').trim();
    const actualHash = crypto.createHash('sha256').update(dbBuffer).digest('hex');
    if (expectedHash !== actualHash) {
      console.error(`[Unpack] Hash mismatch! Expected: ${expectedHash}, Actual: ${actualHash}`);
      process.exit(1);
    }
    console.log(`[Unpack] SHA-256 verification passed: ${actualHash}`);
  }

  const tmpPath = DB_PATH + '.tmp';
  fs.writeFileSync(tmpPath, dbBuffer);
  fs.renameSync(tmpPath, DB_PATH);
  console.log('[Unpack] ✅ Database successfully unpacked and verified!');
  return true;
}

if (require.main === module) {
  const force = process.argv.includes('--force');
  unpackDatabase(force);
}

module.exports = { unpackDatabase };
