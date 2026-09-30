/**
 * scripts/create_phase17d_backup.js
 * 
 * SARKARIAI HUB — PRE-PHASE 17D SNAPSHOT BACKUP GENERATOR
 * 
 * Creates a cold backup of:
 * 1. Persistent SQLite database (sarkari_core.db)
 * 2. Question services, repositories, and mapping services
 * 3. Validation and language services
 * 4. Test files and relevant reports
 * 5. Standalone rollback script (rollback-to-pre-phase17d.js)
 */

const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const backupDir = path.join(rootDir, 'backend/backups/pre-phase17d-content-truth-audit-backup');

console.log("=====================================================================");
console.log("💾 CREATING PRE-PHASE 17D SNAPSHOT BACKUP");
console.log("=====================================================================");

if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

// 1. Copy SQLite database
const dbSrc = path.join(rootDir, 'backend/db/sarkari_core.db');
const dbDest = path.join(backupDir, 'sarkari_core.db');
if (fs.existsSync(dbSrc)) {
  fs.copyFileSync(dbSrc, dbDest);
  const sizeMB = (fs.statSync(dbDest).size / (1024 * 1024)).toFixed(2);
  console.log(`✅ Backed up SQLite DB (${sizeMB} MB) to: ${dbDest}`);
} else {
  console.error("❌ ERROR: Source database not found at", dbSrc);
  process.exit(1);
}

// 2. Backup critical services, repositories, and test files
const filesToBackup = [
  'backend/db/repositories/question-repository.js',
  'backend/db/repositories/blueprint-repository.js',
  'backend/db/repositories/exam-repository.js',
  'backend/db/repositories/mock-session-repository.js',
  'backend/services/mock-service.js',
  'backend/services/full-exam-gate-service.js',
  'backend/services/unified-exam-truth-service.js',
  'backend/services/blueprint-verification-service.js',
  'backend/services/official-source-service.js',
  'backend/services/ai-practice-generation-service.js',
  'backend/services/pdf-generation-service.js',
  'backend/test/test-phase17c-large-scale-production.js',
  'backend/test/test-blueprint-driven-mock-engine.js',
  'scripts/run_all_regression_tests.js',
  'reports/phase17c_baseline.json',
  'reports/phase17c_content_growth_report.md'
];

for (const rel of filesToBackup) {
  const src = path.join(rootDir, rel);
  if (fs.existsSync(src)) {
    const dest = path.join(backupDir, path.basename(rel));
    fs.copyFileSync(src, dest);
    console.log(`✅ Backed up ${rel} -> ${path.basename(dest)}`);
  } else {
    console.warn(`⚠️ Warning: File not found for backup: ${rel}`);
  }
}

// 3. Create standalone rollback script
const rollbackScript = `/**
 * rollback-to-pre-phase17d.js
 * 
 * Standalone emergency rollback script to restore pre-Phase 17D snapshot.
 */
const fs = require('fs');
const path = require('path');

const backupDb = path.join(__dirname, 'sarkari_core.db');
const targetDb = path.join(__dirname, '../../db/sarkari_core.db');

console.log("Restoring pre-Phase 17D snapshot from:", backupDb);
if (!fs.existsSync(backupDb)) {
  console.error("Backup DB does not exist at:", backupDb);
  process.exit(1);
}

fs.copyFileSync(backupDb, targetDb);
console.log("Restored SQLite database to:", targetDb);
console.log("Pre-Phase 17D snapshot successfully restored.");
`;

const rollbackPath = path.join(backupDir, 'rollback-to-pre-phase17d.js');
fs.writeFileSync(rollbackPath, rollbackScript, 'utf8');
console.log(`✅ Created standalone rollback script at: ${rollbackPath}`);

console.log("\n=====================================================================");
console.log(`🎉 PRE-PHASE 17D BACKUP COMPLETE: ${backupDir}`);
console.log("=====================================================================\n");
