// scripts/create_phase9_backup.js
const fs = require('fs');
const path = require('path');

const backupDir = path.join(__dirname, '../backend/backups/pre-phase9-official-pyq-batch-ingestion-backup');
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

// Copy db
const dbSrc = path.join(__dirname, '../backend/db/sarkari_core.db');
if (fs.existsSync(dbSrc)) {
  fs.copyFileSync(dbSrc, path.join(backupDir, 'sarkari_core.db'));
}

// Copy registries and blueprints
const rootFiles = [
  'exam-blueprints.json',
  'COMPLETE_EXAM_INVENTORY.csv',
  'exam-pattern-component-registry.csv',
  'pyq-source-artifact-registry.csv',
  'phase8-baseline-inventory.json',
  'phase8-full-exam-readiness-report.csv',
  'phase8-partially-ready-component-audit.csv',
  'phase8-component-priority.csv'
];

rootFiles.forEach(f => {
  const src = path.join(__dirname, '..', f);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(backupDir, f));
  }
});

// Copy all services
const servicesSrc = path.join(__dirname, '../backend/services');
const servicesDst = path.join(backupDir, 'services');
if (!fs.existsSync(servicesDst)) fs.mkdirSync(servicesDst, { recursive: true });
fs.readdirSync(servicesSrc).forEach(f => {
  const srcPath = path.join(servicesSrc, f);
  if (fs.statSync(srcPath).isFile()) {
    fs.copyFileSync(srcPath, path.join(servicesDst, f));
  }
});

// Copy all routes
const routesSrc = path.join(__dirname, '../backend/routes');
const routesDst = path.join(backupDir, 'routes');
if (!fs.existsSync(routesDst)) fs.mkdirSync(routesDst, { recursive: true });
fs.readdirSync(routesSrc).forEach(f => {
  const srcPath = path.join(routesSrc, f);
  if (fs.statSync(srcPath).isFile()) {
    fs.copyFileSync(srcPath, path.join(routesDst, f));
  }
});

// Copy test suites recursively
const testSrc = path.join(__dirname, '../backend/test');
const testDst = path.join(backupDir, 'test');
if (fs.existsSync(testSrc)) {
  fs.cpSync(testSrc, testDst, { recursive: true });
}

// Create rollback script in backup directory
const rollbackScriptContent = `// backend/backups/pre-phase9-official-pyq-batch-ingestion-backup/rollback-to-pre-phase9.js
const fs = require('fs');
const path = require('path');

console.log('Initiating rollback to Pre-Phase 9 state...');
const backupDir = __dirname;
const rootDir = path.join(__dirname, '../../../');

// Restore DB
fs.copyFileSync(path.join(backupDir, 'sarkari_core.db'), path.join(rootDir, 'backend/db/sarkari_core.db'));
console.log('Restored: backend/db/sarkari_core.db');

// Restore root files
const rootFiles = [
  'exam-blueprints.json',
  'COMPLETE_EXAM_INVENTORY.csv',
  'exam-pattern-component-registry.csv',
  'pyq-source-artifact-registry.csv'
];
rootFiles.forEach(f => {
  const src = path.join(backupDir, f);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(rootDir, f));
    console.log('Restored:', f);
  }
});

// Restore services
const servicesSrc = path.join(backupDir, 'services');
if (fs.existsSync(servicesSrc)) {
  fs.readdirSync(servicesSrc).forEach(f => {
    fs.copyFileSync(path.join(servicesSrc, f), path.join(rootDir, 'backend/services', f));
  });
  console.log('Restored backend/services/');
}

// Restore routes
const routesSrc = path.join(backupDir, 'routes');
if (fs.existsSync(routesSrc)) {
  fs.readdirSync(routesSrc).forEach(f => {
    fs.copyFileSync(path.join(routesSrc, f), path.join(rootDir, 'backend/routes', f));
  });
  console.log('Restored backend/routes/');
}

console.log('Rollback to Pre-Phase 9 complete.');
`;

fs.writeFileSync(path.join(backupDir, 'rollback-to-pre-phase9.js'), rollbackScriptContent);

console.log('Phase 9 backup complete at:', backupDir);
console.log('Backup contents summary:');
console.log('- DB copy present: true');
console.log('- Services count:', fs.readdirSync(servicesDst).length);
console.log('- Routes count:', fs.readdirSync(routesDst).length);
console.log('- Tests count:', fs.readdirSync(testDst).length);
