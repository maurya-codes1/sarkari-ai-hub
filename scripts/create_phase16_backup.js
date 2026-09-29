// scripts/create_phase16_backup.js
// Creates a snapshot backup before Phase 16 execution

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const BACKUP_DIR = path.join(ROOT_DIR, 'backend', 'backups', 'pre-phase16-exam-content-completion-backup');

console.log('Creating Pre-Phase 16 Snapshot Backup...');

if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

// 1. Copy sarkari_core.db
const dbSource = path.join(ROOT_DIR, 'backend', 'db', 'sarkari_core.db');
const dbDest = path.join(BACKUP_DIR, 'sarkari_core.db');
if (fs.existsSync(dbSource)) {
  fs.copyFileSync(dbSource, dbDest);
  console.log(`✅ Backed up database to ${dbDest}`);
}

// 2. Copy core services
const servicesDir = path.join(ROOT_DIR, 'backend', 'services');
const servicesBackupDir = path.join(BACKUP_DIR, 'services');
if (fs.existsSync(servicesDir)) {
  fs.cpSync(servicesDir, servicesBackupDir, { recursive: true });
  console.log(`✅ Backed up services to ${servicesBackupDir}`);
}

// 3. Copy reports directory snapshot
const reportsDir = path.join(ROOT_DIR, 'reports');
const reportsBackupDir = path.join(BACKUP_DIR, 'reports');
if (fs.existsSync(reportsDir)) {
  fs.cpSync(reportsDir, reportsBackupDir, { recursive: true });
  console.log(`✅ Backed up reports to ${reportsBackupDir}`);
}

// 4. Create Rollback Runner
const rollbackScript = `// Rollback runner for pre-phase16
const fs = require('fs');
const path = require('path');

const BACKUP_DIR = __dirname;
const ROOT_DIR = path.join(__dirname, '..', '..', '..');

console.log('Rolling back to Pre-Phase 16 State...');
fs.copyFileSync(path.join(BACKUP_DIR, 'sarkari_core.db'), path.join(ROOT_DIR, 'backend', 'db', 'sarkari_core.db'));
console.log('✅ Restored sarkari_core.db');
`;

fs.writeFileSync(path.join(BACKUP_DIR, 'rollback-to-pre-phase16.js'), rollbackScript, 'utf8');
console.log(`✅ Created rollback script at ${path.join(BACKUP_DIR, 'rollback-to-pre-phase16.js')}`);
console.log('🏁 Pre-Phase 16 Backup Completed Successfully!');
