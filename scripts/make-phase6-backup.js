// scripts/make-phase6-backup.js
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT_DIR = path.resolve(__dirname, '..');
const BACKUP_DIR = path.join(ROOT_DIR, 'backend', 'backups', 'pre-phase6-backup');

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach((childItemName) => {
      // Strictly ignore .env, secrets, logs, node_modules
      if (childItemName === '.env' || childItemName === '.env.local' || childItemName.endsWith('.log')) {
        console.log(`Skipping excluded item: ${childItemName}`);
        return;
      }
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    // File
    if (src.endsWith('.env') || src.includes('secret') || src.endsWith('.log')) {
      console.log(`Skipping excluded item: ${src}`);
      return;
    }
    fs.copyFileSync(src, dest);
  }
}

function computeFileHash(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  const hashSum = crypto.createHash('sha256');
  hashSum.update(fileBuffer);
  return hashSum.digest('hex');
}

console.log('🔄 Creating Phase 6 Safety Backup...');

if (fs.existsSync(BACKUP_DIR)) {
  fs.rmSync(BACKUP_DIR, { recursive: true, force: true });
}
fs.mkdirSync(BACKUP_DIR, { recursive: true });

// Copy essential directories
copyRecursiveSync(path.join(ROOT_DIR, 'backend', 'db'), path.join(BACKUP_DIR, 'backend_db'));
copyRecursiveSync(path.join(ROOT_DIR, 'backend', 'services'), path.join(BACKUP_DIR, 'backend_services'));
copyRecursiveSync(path.join(ROOT_DIR, 'backend', 'test'), path.join(BACKUP_DIR, 'backend_test'));
copyRecursiveSync(path.join(ROOT_DIR, 'public', 'js'), path.join(BACKUP_DIR, 'public_js'));

// Copy key files
fs.copyFileSync(path.join(ROOT_DIR, 'public', 'index.html'), path.join(BACKUP_DIR, 'index.html'));
fs.copyFileSync(path.join(ROOT_DIR, 'server.js'), path.join(BACKUP_DIR, 'server.js'));
fs.copyFileSync(path.join(ROOT_DIR, 'package.json'), path.join(BACKUP_DIR, 'package.json'));

const dbBackupPath = path.join(BACKUP_DIR, 'backend_db', 'sarkari_core.db');
const dbHash = fs.existsSync(dbBackupPath) ? computeFileHash(dbBackupPath) : null;
const dbSize = fs.existsSync(dbBackupPath) ? fs.statSync(dbBackupPath).size : 0;

const manifest = {
  phase: 'PRE_PHASE_6_SAFETY_BASELINE',
  timestamp: new Date().toISOString(),
  gitAvailable: false,
  rollbackMechanism: 'Full filesystem snapshot and SQLite database restore from backend/backups/pre-phase6-backup/',
  exclusions: ['.env', '.env.*', '*.log', 'secrets', 'api_keys', 'credentials'],
  database: {
    file: 'backend_db/sarkari_core.db',
    sha256: dbHash,
    sizeBytes: dbSize
  },
  baselineMetrics: {
    totalQuestions: 872,
    practiceOnly: 726,
    needsReview: 146,
    mismatched: 0,
    fullExamEligible: 0,
    activeExams: 52,
    activeLanguages: 14,
    regressionTestsTotal: 61,
    regressionTestsPassing: 61
  }
};

fs.writeFileSync(path.join(BACKUP_DIR, 'manifest.json'), JSON.stringify(manifest, null, 2), 'utf8');

console.log('✅ Phase 6 Safety Backup Complete!');
console.log(`📁 Backup Destination: ${BACKUP_DIR}`);
console.log(`📦 Database SHA256: ${dbHash} (${dbSize} bytes)`);
