// scripts/create_phase15_backup.js
const fs = require('fs');
const path = require('path');

const BACKUP_DIR = path.join(__dirname, '../backend/backups/pre-phase15-source-monitoring-automation-backup');

if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

// 1. Copy Database
const dbSrc = path.join(__dirname, '../backend/db/sarkari_core.db');
const dbDest = path.join(BACKUP_DIR, 'sarkari_core.db');
fs.copyFileSync(dbSrc, dbDest);
console.log('✅ Backed up sarkari_core.db');

// 2. Backup Services
const services = [
  'state-master-service.js',
  'school-board-academic-service.js',
  'national-exam-inventory-service.js',
  'registration-eligibility-service.js',
  'state-aware-experience-service.js',
  'global-search-service.js',
  'notesEngine.js',
  'aiPracticeEngine.js',
  'aiQualityGate.js',
  'practiceSelectionService.js',
  'mockService.js',
  'pdfService.js'
];

const servicesBackupDir = path.join(BACKUP_DIR, 'services');
if (!fs.existsSync(servicesBackupDir)) fs.mkdirSync(servicesBackupDir, { recursive: true });

for (const s of services) {
  const src = path.join(__dirname, '../backend/services', s);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(servicesBackupDir, s));
  }
}
console.log(`✅ Backed up ${services.length} core services`);

// 3. Backup Routes
const routes = ['phase13-routes.js', 'notes-routes.js', 'practice-routes.js', 'mock-routes.js', 'pdf-routes.js'];
const routesBackupDir = path.join(BACKUP_DIR, 'routes');
if (!fs.existsSync(routesBackupDir)) fs.mkdirSync(routesBackupDir, { recursive: true });

for (const r of routes) {
  const src = path.join(__dirname, '../backend/routes', r);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(routesBackupDir, r));
  }
}
console.log(`✅ Backed up routes`);

// 4. Backup Phase 14 Deliverables
const phase14ReportsDir = path.join(BACKUP_DIR, 'phase14_reports');
if (!fs.existsSync(phase14ReportsDir)) fs.mkdirSync(phase14ReportsDir, { recursive: true });

const rootFiles = fs.readdirSync(path.join(__dirname, '..'));
let reportCount = 0;
for (const f of rootFiles) {
  if (f.startsWith('phase14-') || f.startsWith('phase13-')) {
    fs.copyFileSync(path.join(__dirname, '..', f), path.join(phase14ReportsDir, f));
    reportCount++;
  }
}
console.log(`✅ Backed up ${reportCount} Phase 13 & Phase 14 reports`);

// 5. Create Rollback Script
const rollbackScriptContent = `// rollback-to-pre-phase15.js
// Restores system to pre-Phase 15 baseline
const fs = require('fs');
const path = require('path');

const BACKUP_DIR = __dirname;
const ROOT_DIR = path.join(__dirname, '../../../');

console.log('Restoring pre-Phase 15 backup...');

// 1. Restore Database
fs.copyFileSync(path.join(BACKUP_DIR, 'sarkari_core.db'), path.join(ROOT_DIR, 'backend/db/sarkari_core.db'));
console.log('✅ Database restored');

// 2. Restore Services
const servicesBackupDir = path.join(BACKUP_DIR, 'services');
if (fs.existsSync(servicesBackupDir)) {
  for (const f of fs.readdirSync(servicesBackupDir)) {
    fs.copyFileSync(path.join(servicesBackupDir, f), path.join(ROOT_DIR, 'backend/services', f));
  }
  console.log('✅ Services restored');
}

// 3. Restore Routes
const routesBackupDir = path.join(BACKUP_DIR, 'routes');
if (fs.existsSync(routesBackupDir)) {
  for (const f of fs.readdirSync(routesBackupDir)) {
    fs.copyFileSync(path.join(routesBackupDir, f), path.join(ROOT_DIR, 'backend/routes', f));
  }
  console.log('✅ Routes restored');
}

console.log('🎯 Pre-Phase 15 rollback complete!');
`;

fs.writeFileSync(path.join(BACKUP_DIR, 'rollback-to-pre-phase15.js'), rollbackScriptContent, 'utf8');
console.log('✅ Created rollback-to-pre-phase15.js');
console.log('🏁 Phase 15 backup completed successfully.');
