const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const Database = require('better-sqlite3');

const liveDbPath = path.resolve(__dirname, '../db/sarkari_core.db');
const backupDir = path.resolve(__dirname, '../backups/phase10-final-frozen');
const backupDbPath = path.join(backupDir, 'phase10_final_frozen.db');

if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

console.log('=== CREATING FINAL FROZEN IMMUTABLE BACKUP ===');
console.log('Source DB:', liveDbPath);

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
    console.log('Frozen backup created at:', backupDbPath);

    const fileBytes = fs.readFileSync(backupDbPath);
    const sha256 = crypto.createHash('sha256').update(fileBytes).digest('hex');
    const size = fileBytes.length;

    console.log(`Size: ${size} bytes (${(size / 1024 / 1024).toFixed(2)} MB)`);
    console.log(`SHA-256: ${sha256}`);

    // Verify frozen backup
    const bDb = new Database(backupDbPath, { readonly: true });
    const tables = bDb.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'").all().map(t => t.name);
    const questionsCount = bDb.prepare('SELECT count(*) as c FROM questions').get().c;
    const verifiedPyqCount = bDb.prepare("SELECT count(*) as c FROM questions WHERE provenance = 'OFFICIAL_PYQ'").get().c;
    const verifiedSampleCount = bDb.prepare("SELECT count(*) as c FROM questions WHERE provenance = 'OFFICIAL_SAMPLE'").get().c;
    const verifiedTotalCount = bDb.prepare('SELECT count(*) as c FROM questions WHERE is_verified = 1').get().c;
    const legacyCount = bDb.prepare('SELECT count(*) as c FROM questions WHERE is_verified = 0').get().c;
    const fullExamEligibleCount = bDb.prepare('SELECT count(*) as c FROM questions WHERE full_exam_eligible = 1').get().c;
    const practiceEligibleCount = bDb.prepare('SELECT count(*) as c FROM questions WHERE practice_eligible = 1').get().c;
    const papersCount = bDb.prepare('SELECT count(*) as c FROM question_papers').get().c;
    const examsCount = bDb.prepare('SELECT count(*) as c FROM exams').get().c;
    const inventoryExamsCount = bDb.prepare('SELECT count(*) as c FROM nationwide_exam_inventory').get().c;
    const boardsCount = bDb.prepare('SELECT count(*) as c FROM boards').get().c;
    const sourcesCount = bDb.prepare('SELECT count(*) as c FROM official_sources').get().c;
    const pragmaIntegrity = bDb.prepare('PRAGMA integrity_check').get().integrity_check;
    const pragmaFk = bDb.prepare('PRAGMA foreign_key_check').all().length;
    bDb.close();

    console.log(`Tables count: ${tables.length}`);
    console.log(`Total Preserved Questions: ${questionsCount}`);
    console.log(`  - Verified True Official PYQ: ${verifiedPyqCount}`);
    console.log(`  - Verified Official Document/Sample: ${verifiedSampleCount}`);
    console.log(`  - Total Verified: ${verifiedTotalCount}`);
    console.log(`  - Legacy Preserved Baseline: ${legacyCount}`);
    console.log(`Full Exam Eligible Questions: ${fullExamEligibleCount}`);
    console.log(`Practice Eligible Questions: ${practiceEligibleCount}`);
    console.log(`Question Papers: ${papersCount}`);
    console.log(`Core Exams: ${examsCount}`);
    console.log(`Nationwide Inventory Exams: ${inventoryExamsCount}`);
    console.log(`Board Records / Ecosystems: ${boardsCount}`);
    console.log(`Official Sources: ${sourcesCount}`);
    console.log(`PRAGMA integrity_check: ${pragmaIntegrity}`);
    console.log(`PRAGMA foreign_key_check: ${pragmaFk} violations`);

    const manifest = {
      timestamp: new Date().toISOString(),
      status: 'PHASE_10_COMPLETE_AND_FROZEN',
      backupFile: 'phase10_final_frozen.db',
      sizeBytes: size,
      sha256: sha256,
      tableCount: tables.length,
      totalPreservedQuestions: questionsCount,
      verifiedOfficialPyqCount: verifiedPyqCount,
      verifiedOfficialSampleCount: verifiedSampleCount,
      totalVerifiedQuestionsCount: verifiedTotalCount,
      legacyPreservedBaselineCount: legacyCount,
      fullExamEligibleQuestionsCount: fullExamEligibleCount,
      practiceEligibleQuestionsCount: practiceEligibleCount,
      questionPapersCount: papersCount,
      coreExamsCount: examsCount,
      inventoryExamsCount,
      boardRecordsEcosystemsCount: boardsCount,
      officialSourcesCount: sourcesCount,
      integrityCheck: pragmaIntegrity,
      foreignKeyViolations: pragmaFk
    };

    fs.writeFileSync(path.join(backupDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
    fs.writeFileSync(path.join(backupDir, 'SHA256SUMS'), `${sha256} *phase10_final_frozen.db\n`);
    console.log('Manifest and SHA256SUMS generated successfully.');
  })
  .catch(err => {
    console.error('Frozen backup failed:', err);
    process.exit(1);
  });
