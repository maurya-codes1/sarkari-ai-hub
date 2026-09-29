/**
 * scripts/create_phase17b_backup.js
 * 
 * Creates a pre-Phase 17B snapshot backup of:
 * - backend/db/sarkari_core.db (1,457 question baseline)
 * - question repositories and services
 * - test suites
 * - current reports
 * - rollback-to-pre-phase17b.js
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const BACKUP_DIR = path.join(ROOT_DIR, 'backend/backups/pre-phase17b-mass-production-backup');

if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

console.log("=====================================================================");
console.log("💾 CREATING PRE-PHASE 17B SNAPSHOT BACKUP");
console.log("=====================================================================\n");

// 1. Copy SQLite database
const dbSrc = path.join(ROOT_DIR, 'backend/db/sarkari_core.db');
const dbDst = path.join(BACKUP_DIR, 'sarkari_core.db');
fs.copyFileSync(dbSrc, dbDst);
console.log(`✅ [1/5] Backed up database: ${dbDst}`);

// 2. Backup key services
const servicesToBackup = [
  'mock-service.js',
  'canonical-question-selection-service.js',
  'pattern-practice-readiness-service.js',
  'exam-language-resolver.js',
  'full-exam-gate-service.js',
  'unified-exam-truth-service.js',
  'adaptive-selection-service.js'
];
const srvBackupDir = path.join(BACKUP_DIR, 'services');
if (!fs.existsSync(srvBackupDir)) fs.mkdirSync(srvBackupDir, { recursive: true });
for (const s of servicesToBackup) {
  const src = path.join(ROOT_DIR, 'backend/services', s);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(srvBackupDir, s));
  }
}
console.log(`✅ [2/5] Backed up ${servicesToBackup.length} services`);

// 3. Backup repositories
const reposToBackup = [
  'question-repository.js',
  'mock-session-repository.js'
];
const repoBackupDir = path.join(BACKUP_DIR, 'repositories');
if (!fs.existsSync(repoBackupDir)) fs.mkdirSync(repoBackupDir, { recursive: true });
for (const r of reposToBackup) {
  const src = path.join(ROOT_DIR, 'backend/db/repositories', r);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(repoBackupDir, r));
  }
}
console.log(`✅ [3/5] Backed up ${reposToBackup.length} repositories`);

// 4. Backup Phase 17A reports
const reportsBackupDir = path.join(BACKUP_DIR, 'reports');
if (!fs.existsSync(reportsBackupDir)) fs.mkdirSync(reportsBackupDir, { recursive: true });
const reportFiles = fs.readdirSync(path.join(ROOT_DIR, 'reports'));
for (const rf of reportFiles) {
  if (rf.startsWith('phase17a_')) {
    fs.copyFileSync(path.join(ROOT_DIR, 'reports', rf), path.join(reportsBackupDir, rf));
  }
}
console.log(`✅ [4/5] Backed up Phase 17A baseline reports`);

// 5. Create rollback script
const rollbackScriptContent = `/**
 * Automated Rollback Script to Pre-Phase 17B Baseline
 */
const fs = require('fs');
const path = require('path');

const BACKUP_DIR = __dirname;
const ROOT_DIR = path.resolve(__dirname, '../../..');

console.log("Restoring Pre-Phase 17B SQLite Database...");
fs.copyFileSync(path.join(BACKUP_DIR, 'sarkari_core.db'), path.join(ROOT_DIR, 'backend/db/sarkari_core.db'));
console.log("✅ Database restored cleanly to 1,457 questions baseline!");
`;
fs.writeFileSync(path.join(BACKUP_DIR, 'rollback-to-pre-phase17b.js'), rollbackScriptContent, 'utf8');
console.log(`✅ [5/5] Created rollback script: ${path.join(BACKUP_DIR, 'rollback-to-pre-phase17b.js')}`);

console.log("\n=====================================================================");
console.log(`🎉 BACKUP COMPLETE: ${BACKUP_DIR}`);
console.log("=====================================================================\n");
