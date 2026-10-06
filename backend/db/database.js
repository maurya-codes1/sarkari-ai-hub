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

    // Enforce relational integrity and lean memory profile for 512MB Render container
    dbInstance.pragma('foreign_keys = ON');
    dbInstance.pragma('journal_mode = WAL');
    dbInstance.pragma('synchronous = NORMAL');
    dbInstance.pragma('busy_timeout = 5000');
    dbInstance.pragma('cache_size = -8000');  // 8 MB cache (lean memory profile for Render 512MB)
    dbInstance.pragma('mmap_size = 0');       // Disable mmap to prevent Linux cgroup page cache OOM
    dbInstance.pragma('temp_store = FILE');   // File-backed temporary store

    // Immediately truncate WAL file to prevent memory and disk bloat on Render
    try {
      dbInstance.pragma('wal_checkpoint(TRUNCATE)');
    } catch (walErr) {}

    // Ensure high-performance composite indexes exist on startup
    try {
      dbInstance.exec(`
        CREATE INDEX IF NOT EXISTS idx_questions_board ON questions(board_id);
        CREATE INDEX IF NOT EXISTS idx_questions_board_stage ON questions(board_id, stage);
        CREATE INDEX IF NOT EXISTS idx_questions_board_stage_subj ON questions(board_id, stage, subject_id);
        CREATE INDEX IF NOT EXISTS idx_questions_exam_ver_subj ON questions(exam_version_id, subject_id);
        CREATE INDEX IF NOT EXISTS idx_questions_type_elig ON questions(question_type_id, current_eligibility);
      `);
    } catch (idxErr) {}

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

function checkpointWal() {
  if (dbInstance) {
    try {
      return dbInstance.pragma('wal_checkpoint(TRUNCATE)');
    } catch (e) {
      return null;
    }
  }
  return null;
}

module.exports = {
  getDb,
  closeDb,
  checkDbAvailable,
  checkpointWal,
  DB_PATH
};
