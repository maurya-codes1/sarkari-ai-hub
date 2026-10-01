const fs = require('fs');
const crypto = require('crypto');
const path = require('path');
const { execSync } = require('child_process');

console.log('=== CREATING EMERGENCY RECOVERY SAFETY BACKUP ===');

const backupDir = 'backup_emergency_recovery_20261001';
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

// 1. Git info
const branch = execSync('git branch --show-current', { encoding: 'utf8' }).trim();
const commit = execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim();
const gitStatus = execSync('git status --short', { encoding: 'utf8' }).trim();

// 2. DB info
const dbPath = 'backend/db/sarkari_core.db';
const dbStats = fs.statSync(dbPath);
const dbBuf = fs.readFileSync(dbPath);
const dbSha = crypto.createHash('sha256').update(dbBuf).digest('hex');

// 3. Backup active files
fs.copyFileSync(dbPath, path.join(backupDir, 'sarkari_core.db.bak'));
fs.copyFileSync('public/index.html', path.join(backupDir, 'index.html.bak'));
fs.copyFileSync('public/js/quiz.js', path.join(backupDir, 'quiz.js.bak'));
fs.copyFileSync('public/js/quiz-data.js', path.join(backupDir, 'quiz-data.js.bak'));
fs.copyFileSync('public/js/i18n.js', path.join(backupDir, 'i18n.js.bak'));
fs.copyFileSync('backend/services/mock-service.js', path.join(backupDir, 'mock-service.js.bak'));

console.log('Branch:', branch);
console.log('Commit:', commit);
console.log('DB Size:', dbStats.size, 'bytes');
console.log('DB SHA256:', dbSha);
console.log('Backup files copied to:', backupDir);

const report = `# EMERGENCY RECOVERY SAFETY BACKUP REPORT

**Timestamp:** ${new Date().toISOString()}  
**Current Branch:** \`${branch}\`  
**Current Commit:** \`${commit}\`  
**Git Working Tree Status:**  
\`\`\`text
${gitStatus}
\`\`\`

## Database Integrity & Invariants
- **Active Database Path:** \`${dbPath}\`
- **Database Size:** ${dbStats.size.toLocaleString()} bytes (~${(dbStats.size / (1024 * 1024)).toFixed(2)} MB)
- **Database SHA-256:** \`${dbSha}\`
- **Backup Destination:** \`${backupDir}/sarkari_core.db.bak\`

## Preserved Code Artifacts
- \`${backupDir}/index.html.bak\`
- \`${backupDir}/quiz.js.bak\`
- \`${backupDir}/quiz-data.js.bak\`
- \`${backupDir}/i18n.js.bak\`
- \`${backupDir}/mock-service.js.bak\`

Safety backup created successfully before any code modifications.
`;

fs.writeFileSync('reports/emergency_recovery_backup.md', report, 'utf8');
console.log('Generated reports/emergency_recovery_backup.md');
