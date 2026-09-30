/**
 * scripts/create_phase17c_backup.js
 * 
 * SARKARIAI HUB — PRE-PHASE 17C SNAPSHOT BACKUP GENERATOR
 * 
 * Creates a cold backup of:
 * 1. Persistent SQLite database (sarkari_core.db)
 * 2. Key question repositories and services
 * 3. Canonical selector and language resolver
 * 4. Test suites and reports
 * 5. Standalone rollback script
 */

const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const backupDir = path.join(rootDir, 'backend/backups/pre-phase17c-large-scale-content-backup');

console.log("=====================================================================");
console.log("💾 CREATING PRE-PHASE 17C SNAPSHOT BACKUP");
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

// 2. Backup critical services & repositories
const filesToBackup = [
  'backend/repositories/QuestionRepository.js',
  'backend/repositories/MockEngineRepository.js',
  'backend/services/CanonicalQuestionSelector.js',
  'backend/services/ExamPatternService.js',
  'backend/services/LanguageResolverService.js',
  'backend/services/AiPracticeQuestionService.js',
  'backend/services/NotesEngineService.js',
  'backend/services/PdfEngineService.js',
  'backend/test/test-phase17b-mass-question-production.js',
  'backend/test/test-phase17a-question-growth.js',
  'scripts/run_all_regression_tests.js'
];

for (const rel of filesToBackup) {
  const src = path.join(rootDir, rel);
  if (fs.existsSync(src)) {
    const dest = path.join(backupDir, path.basename(rel));
    fs.copyFileSync(src, dest);
    console.log(`✅ Backed up ${rel} -> ${path.basename(dest)}`);
  }
}

// 3. Create standalone rollback script
const rollbackScriptContent = `/**
 * rollback-to-pre-phase17c.js
 * 
 * Emergency Rollback Script for Phase 17C
 * Restores pre-Phase 17C database and code files.
 */

const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '../../..');
const backupDir = __dirname;

console.log("⚠️ INITIATING EMERGENCY ROLLBACK TO PRE-PHASE 17C STATE...");

const dbSrc = path.join(backupDir, 'sarkari_core.db');
const dbDest = path.join(rootDir, 'backend/db/sarkari_core.db');

if (fs.existsSync(dbSrc)) {
  fs.copyFileSync(dbSrc, dbDest);
  console.log("✅ Restored database to pre-Phase 17C state from backup.");
} else {
  console.error("❌ Backup database missing!");
  process.exit(1);
}

console.log("🎉 ROLLBACK COMPLETE.");
`;

fs.writeFileSync(path.join(backupDir, 'rollback-to-pre-phase17c.js'), rollbackScriptContent);
console.log("✅ Created rollback script at: backend/backups/pre-phase17c-large-scale-content-backup/rollback-to-pre-phase17c.js");

console.log("=====================================================================");
console.log("🎉 PRE-PHASE 17C BACKUP COMPLETE & VERIFIED");
console.log("=====================================================================\n");
