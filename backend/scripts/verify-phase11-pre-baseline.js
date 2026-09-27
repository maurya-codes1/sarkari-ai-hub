const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const Database = require('better-sqlite3');

const liveDbPath = path.resolve(__dirname, '../db/sarkari_core.db');
const frozenDbPath = path.resolve(__dirname, '../backups/phase10-final-frozen/phase10_final_frozen.db');
const backupDir = path.resolve(__dirname, '../backups/pre-phase11-backup');
const backupDbPath = path.join(backupDir, 'sarkari_core_pre_phase11.db');

console.log('=== PHASE 11 PRE-FLIGHT BASELINE & SAFETY VERIFICATION ===');

if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

// 1. Check Phase 10 Frozen DB SHA-256
const frozenBytes = fs.readFileSync(frozenDbPath);
const frozenSha = crypto.createHash('sha256').update(frozenBytes).digest('hex');
console.log('Phase 10 Frozen DB SHA-256:', frozenSha);

// 2. Perform live DB checkpoint and copy to pre-phase11 backup
const srcDb = new Database(liveDbPath);
try {
  srcDb.pragma('wal_checkpoint(TRUNCATE)');
  console.log('WAL checkpoint (TRUNCATE) executed.');
} catch (e) {
  console.warn('Warning during WAL checkpoint:', e.message);
}

srcDb.backup(backupDbPath)
  .then(() => {
    srcDb.close();
    console.log('Pre-Phase-11 backup successfully created at:', backupDbPath);

    const backupBytes = fs.readFileSync(backupDbPath);
    const backupSha = crypto.createHash('sha256').update(backupBytes).digest('hex');
    const backupSize = backupBytes.length;
    console.log(`Backup Size: ${backupSize} bytes (${(backupSize / 1024 / 1024).toFixed(2)} MB)`);
    console.log(`Backup SHA-256: ${backupSha}`);

    // Verify baseline against the backup DB
    const db = new Database(backupDbPath, { readonly: true });
    const userVersion = db.pragma('user_version', { simple: true });
    const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'").all().map(t => t.name);
    const tablesCount = tables.length;

    const totalQuestions = db.prepare('SELECT count(*) as c FROM questions').get().c;
    const truePyqs = db.prepare("SELECT count(*) as c FROM questions WHERE provenance = 'OFFICIAL_PYQ'").get().c;
    const sampleQuestions = db.prepare("SELECT count(*) as c FROM questions WHERE provenance = 'OFFICIAL_SAMPLE'").get().c;
    const fullExamEligible = db.prepare('SELECT count(*) as c FROM questions WHERE full_exam_eligible = 1').get().c;
    const legacyQuestions = db.prepare('SELECT count(*) as c FROM questions WHERE is_verified = 0').get().c;
    const implementedExams = db.prepare('SELECT count(*) as c FROM nationwide_exam_inventory').get().c;
    const missingCsvPath = path.resolve(__dirname, '../../phase10_missing_inventory.csv');
    const missingCsvLines = fs.readFileSync(missingCsvPath, 'utf8').trim().split('\n');
    const missingExams = missingCsvLines.length - 1; // subtract header
    const boardsCount = db.prepare('SELECT count(*) as c FROM boards').get().c;
    const statesCount = db.prepare('SELECT count(*) as c FROM states').get().c;
    const activeUiLanguages = db.prepare('SELECT count(*) as c FROM languages WHERE is_expanded_ui_language = 1').get().c;
    const langCsvPath = path.resolve(__dirname, '../../phase10_language_reconciliation.csv');
    const langCsvContent = fs.readFileSync(langCsvPath, 'utf8');
    const pendingValidationLanguages = (langCsvContent.match(/PENDING_SCRIPT_VALIDATION/g) || []).length;
    const totalOfficialSources = db.prepare('SELECT count(*) as c FROM official_sources').get().c;
    const pragmaIntegrity = db.prepare('PRAGMA integrity_check').get().integrity_check;
    const pragmaFk = db.prepare('PRAGMA foreign_key_check').all().length;
    db.close();

    const baseline = {
      totalQuestions: { actual: totalQuestions, expected: 1064 },
      truePyqs: { actual: truePyqs, expected: 153 },
      sampleQuestions: { actual: sampleQuestions, expected: 39 },
      fullExamEligible: { actual: fullExamEligible, expected: 150 },
      legacyQuestions: { actual: legacyQuestions, expected: 872 },
      implementedExams: { actual: implementedExams, expected: 49 },
      missingExams: { actual: missingExams, expected: 46 },
      boardsCount: { actual: boardsCount, expected: 31 },
      statesCount: { actual: statesCount, expected: 36 },
      activeUiLanguages: { actual: activeUiLanguages, expected: 24 },
      pendingValidationLanguages: { actual: pendingValidationLanguages, expected: 1 },
      totalOfficialSources: { actual: totalOfficialSources, expected: 52 },
      tablesCount: { actual: tablesCount, expected: 67 }
    };

    console.table(baseline);

    let mismatch = false;
    for (const [key, val] of Object.entries(baseline)) {
      if (val.actual !== val.expected) {
        console.error(`MISMATCH: ${key} expected ${val.expected}, got ${val.actual}`);
        mismatch = true;
      }
    }

    if (mismatch) {
      console.error('FATAL: Phase 10 baseline mismatch detected! Aborting Phase 11 initialization.');
      process.exit(1);
    }

    console.log('✅ ALL 13 BASELINE CHECKS MATCH EXACT EXPECTATIONS.');
    console.log(`PRAGMA integrity_check: ${pragmaIntegrity}`);
    console.log(`PRAGMA foreign_key_check: ${pragmaFk} violations`);

    const manifest = {
      timestamp: new Date().toISOString(),
      backupType: 'PRE_PHASE11_IMMUTABLE_BACKUP',
      liveDbPath,
      backupDbPath,
      backupSize,
      backupSha,
      phase10FrozenSha: frozenSha,
      schemaVersion: userVersion,
      baseline,
      integrityCheck: pragmaIntegrity,
      foreignKeyViolations: pragmaFk
    };

    fs.writeFileSync(path.join(backupDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
    fs.writeFileSync(path.join(backupDir, 'SHA256SUMS'), `${backupSha} *sarkari_core_pre_phase11.db\n`);
    console.log('Pre-Phase 11 manifest.json and SHA256SUMS saved.');
  })
  .catch(err => {
    console.error('Backup failed:', err);
    process.exit(1);
  });
