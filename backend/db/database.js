// backend/db/database.js
// Singleton SQLite Database connection manager for SarkariAI Hub
// Configures WAL mode, foreign keys, busy timeout, and transactions.

const path = require('path');
const fs = require('fs');

let Database;
try {
  Database = require('better-sqlite3');
} catch (e) {
  console.warn('[Database] Warning: better-sqlite3 not loadable:', e.message);
}

const DB_PATH = path.join(__dirname, 'sarkari_core.db');

let dbInstance = null;
let isDbAvailable = false;

function getDb(options = {}) {
  if (dbInstance) {
    return dbInstance;
  }

  if (!Database) {
    console.error('[Database] better-sqlite3 driver is unavailable.');
    isDbAvailable = false;
    return null;
  }

  try {
    const dbDir = path.dirname(DB_PATH);
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true });
    }

    if (!fs.existsSync(DB_PATH) || fs.statSync(DB_PATH).size < 1000) {
      try {
        const { execSync } = require('child_process');
        const unpackScript = path.join(__dirname, '..', '..', 'scripts', 'unpack_database.js');
        if (fs.existsSync(unpackScript)) {
          console.log('[Database] Unpacking compressed database archive...');
          execSync(`node "${unpackScript}"`, { stdio: 'inherit' });
        }
      } catch (err) {
        console.warn('[Database] Auto-unpack failed or not available:', err.message);
      }
    }

    dbInstance = new Database(DB_PATH, {
      fileMustExist: options.fileMustExist || false,
      timeout: 5000,
      verbose: options.verbose ? console.log : null
    });

    // Enforce relational integrity and high-performance WAL mode
    dbInstance.pragma('foreign_keys = ON');
    dbInstance.pragma('journal_mode = WAL');
    dbInstance.pragma('synchronous = NORMAL');
    dbInstance.pragma('busy_timeout = 5000');

    isDbAvailable = true;
    return dbInstance;
  } catch (err) {
    console.error('[Database] Failed to open SQLite database at', DB_PATH, err.message);
    isDbAvailable = false;
    return null;
  }
}

function closeDb() {
  if (dbInstance) {
    try {
      dbInstance.close();
    } catch (e) {}
    dbInstance = null;
    isDbAvailable = false;
  }
}

function checkDbAvailable() {
  if (isDbAvailable && dbInstance) return true;
  const db = getDb();
  return isDbAvailable && db !== null;
}

module.exports = {
  getDb,
  closeDb,
  checkDbAvailable,
  DB_PATH
};
