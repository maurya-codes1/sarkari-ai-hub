// scripts/unpack_database.js
// Memory-efficient streaming unpacker (<10MB RAM) for Render deployment parity

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const crypto = require('crypto');

const DB_PATH = path.join(__dirname, '..', 'backend', 'db', 'sarkari_core.db');
const HASH_PATH = path.join(__dirname, '..', 'backend', 'db', 'sarkari_core.sha256');
const PART1_PATH = path.join(__dirname, '..', 'backend', 'db', 'sarkari_core.db.gz.part1');
const PART2_PATH = path.join(__dirname, '..', 'backend', 'db', 'sarkari_core.db.gz.part2');

function unpackDatabase(force = false) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(DB_PATH) && !force) {
      const stat = fs.statSync(DB_PATH);
      if (stat.size > 500 * 1024 * 1024) {
        console.log(`[Unpack] Master database already exists (${(stat.size / (1024 * 1024)).toFixed(2)} MB). Skipping unpack.`);
        return resolve(true);
      }
    }

    if (!fs.existsSync(PART1_PATH) || !fs.existsSync(PART2_PATH)) {
      console.error('[Unpack] Error: Deployment parts not found.');
      return resolve(false);
    }

    console.log('[Unpack] Starting streaming decompression (<10MB RAM usage)...');
    const tmpPath = DB_PATH + '.tmp';
    const writeStream = fs.createWriteStream(tmpPath);
    const gunzip = zlib.createGunzip();
    const hasher = crypto.createHash('sha256');

    gunzip.on('data', (chunk) => {
      hasher.update(chunk);
    });

    writeStream.on('finish', () => {
      const actualHash = hasher.digest('hex');
      if (fs.existsSync(HASH_PATH)) {
        const expectedHash = fs.readFileSync(HASH_PATH, 'utf8').trim();
        if (expectedHash !== actualHash) {
          console.error(`[Unpack] Hash mismatch! Expected: ${expectedHash}, Actual: ${actualHash}`);
          try { fs.unlinkSync(tmpPath); } catch (e) {}
          process.exit(1);
        }
        console.log(`[Unpack] ✅ SHA-256 verification passed: ${actualHash}`);
      }
      fs.renameSync(tmpPath, DB_PATH);
      const finalStat = fs.statSync(DB_PATH);
      console.log(`[Unpack] ✅ Database successfully unpacked (${(finalStat.size / (1024 * 1024)).toFixed(2)} MB)!`);
      resolve(true);
    });

    writeStream.on('error', (err) => {
      console.error('[Unpack] WriteStream error:', err.message);
      try { fs.unlinkSync(tmpPath); } catch (e) {}
      reject(err);
    });

    gunzip.on('error', (err) => {
      console.error('[Unpack] Gunzip error:', err.message);
      try { fs.unlinkSync(tmpPath); } catch (e) {}
      reject(err);
    });

    gunzip.pipe(writeStream);

    const s1 = fs.createReadStream(PART1_PATH);
    s1.on('error', (err) => {
      console.error('[Unpack] Part 1 ReadStream error:', err.message);
      reject(err);
    });
    s1.pipe(gunzip, { end: false });
    s1.on('end', () => {
      const s2 = fs.createReadStream(PART2_PATH);
      s2.on('error', (err) => {
        console.error('[Unpack] Part 2 ReadStream error:', err.message);
        reject(err);
      });
      s2.pipe(gunzip, { end: true });
    });
  });
}

if (require.main === module) {
  const force = process.argv.includes('--force');
  unpackDatabase(force).then(() => {
    process.exit(0);
  }).catch((err) => {
    console.error('[Unpack] Fatal error during unpacking:', err);
    process.exit(1);
  });
}

module.exports = { unpackDatabase };
