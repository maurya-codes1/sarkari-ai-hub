const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const Database = require('better-sqlite3');

const backupDir = path.resolve(__dirname, '../backups/phase10-final-backup');
if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true });

const dbPath = path.resolve(__dirname, '../db/sarkari_core.db');
const backupDbPath = path.join(backupDir, 'sarkari_core_pre_phase10_final.db');

const srcDb = new Database(dbPath);
srcDb.pragma('wal_checkpoint(TRUNCATE)');
srcDb.backup(backupDbPath)
  .then(() => {
    srcDb.close();

    const dbBuffer = fs.readFileSync(backupDbPath);
    const sha256 = crypto.createHash('sha256').update(dbBuffer).digest('hex');
    const dbSize = fs.statSync(backupDbPath).size;

    const db = new Database(backupDbPath, { readonly: true });
    const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name").all();

    const rowCounts = {};
    for (const t of tables) {
      const row = db.prepare(`SELECT COUNT(*) as c FROM "${t.name}"`).get();
      rowCounts[t.name] = row.c;
    }

    const examsCount = db.prepare("SELECT COUNT(*) as c FROM exams").get().c;
    const boardsCount = db.prepare("SELECT COUNT(*) as c FROM boards").get().c;
    const questionsCount = db.prepare("SELECT COUNT(*) as c FROM questions").get().c;
    const sourcesCount = db.prepare("SELECT COUNT(*) as c FROM official_sources").get().c;
    const languagesCount = db.prepare("SELECT COUNT(*) as c FROM languages").get().c;

    db.close();

    const manifest = {
      timestamp: new Date().toISOString(),
      phase: 'Phase 10 Final - Non-Destructive Pre-Execution Baseline Snapshot',
      databasePath: dbPath,
      backupPath: backupDbPath,
      databaseSizeBytes: dbSize,
      sha256: sha256,
      totalTables: tables.length,
      totalExams: examsCount,
      totalBoards: boardsCount,
      totalQuestions: questionsCount,
      totalSources: sourcesCount,
      totalLanguages: languagesCount,
      workingTreeStatus: 'C:\\Users\\guddu\\.gemini\\antigravity\\scratch\\sarkari-ai-portal',
      rowCounts: rowCounts
    };

    fs.writeFileSync(path.join(backupDir, 'phase10_final_pre_snapshot.json'), JSON.stringify(manifest, null, 2));
    fs.writeFileSync(path.join(backupDir, 'SHA256SUMS'), `${sha256}  sarkari_core_pre_phase10_final.db\n`);

    console.log('PHASE10_FINAL_BACKUP_COMPLETED');
    console.log('Database Size:', dbSize, 'bytes');
    console.log('SHA-256:', sha256);
    console.log('Total Tables:', tables.length);
    console.log('Total Exams:', examsCount);
    console.log('Total Boards:', boardsCount);
    console.log('Total Questions:', questionsCount);
    console.log('Total Sources:', sourcesCount);
    console.log('Total Languages:', languagesCount);
  })
  .catch(err => {
    console.error('BACKUP_FAILED:', err);
    process.exit(1);
  });
