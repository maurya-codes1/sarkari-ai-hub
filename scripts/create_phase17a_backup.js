// scripts/create_phase17a_backup.js
// Creates a snapshot backup before Phase 17A Question Growth Sprint

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const BACKUP_DIR = path.join(ROOT_DIR, 'backend', 'backups', 'pre-phase17a-question-growth-backup');

console.log('Creating Pre-Phase 17A Snapshot Backup...');

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

// 3. Copy repositories
const reposDir = path.join(ROOT_DIR, 'backend', 'db', 'repositories');
const reposBackupDir = path.join(BACKUP_DIR, 'repositories');
if (fs.existsSync(reposDir)) {
  fs.cpSync(reposDir, reposBackupDir, { recursive: true });
  console.log(`✅ Backed up repositories to ${reposBackupDir}`);
}

// 4. Copy reports snapshot
const reportsDir = path.join(ROOT_DIR, 'reports');
const reportsBackupDir = path.join(BACKUP_DIR, 'reports');
if (fs.existsSync(reportsDir)) {
  fs.cpSync(reportsDir, reportsBackupDir, { recursive: true });
  console.log(`✅ Backed up reports to ${reportsBackupDir}`);
}

// 5. Create Rollback Runner
const rollbackScript = `// Rollback runner for pre-phase17a
const fs = require('fs');
const path = require('path');

const BACKUP_DIR = __dirname;
const ROOT_DIR = path.join(__dirname, '..', '..', '..');

console.log('Rolling back to Pre-Phase 17A State...');
fs.copyFileSync(path.join(BACKUP_DIR, 'sarkari_core.db'), path.join(ROOT_DIR, 'backend', 'db', 'sarkari_core.db'));
console.log('✅ Restored sarkari_core.db');
`;

fs.writeFileSync(path.join(BACKUP_DIR, 'rollback-to-pre-phase17a.js'), rollbackScript, 'utf8');
console.log(`✅ Created rollback script at ${path.join(BACKUP_DIR, 'rollback-to-pre-phase17a.js')}`);
console.log('🏁 Pre-Phase 17A Backup Completed Successfully!');
