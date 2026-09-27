// backend/scripts/package-for-deploy.js
// Creates a clean, production-ready deployment ZIP archive on the User's Desktop

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Preparing clean production staging directory...');
const rootDir = path.resolve(__dirname, '..', '..');
const stagingDir = path.join(process.env.TEMP, 'sarkari-deploy-staging');

if (fs.existsSync(stagingDir)) {
  fs.rmSync(stagingDir, { recursive: true, force: true });
}
fs.mkdirSync(stagingDir, { recursive: true });

// Copy essential root files
const rootFiles = ['server.js', 'package.json', 'render.yaml', '.gitignore', 'README.md'];
rootFiles.forEach(f => {
  const p = path.join(rootDir, f);
  if (fs.existsSync(p)) {
    fs.copyFileSync(p, path.join(stagingDir, f));
  }
});

// Helper for recursive copying
function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === 'node_modules' || entry.name.endsWith('.log') || entry.name.endsWith('.exe')) {
      continue;
    }
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log('Copying public directory...');
copyDir(path.join(rootDir, 'public'), path.join(stagingDir, 'public'));

console.log('Copying backend directory...');
copyDir(path.join(rootDir, 'backend'), path.join(stagingDir, 'backend'));

const desktopDir = fs.existsSync('C:\\Users\\guddu\\OneDrive\\Desktop') 
  ? 'C:\\Users\\guddu\\OneDrive\\Desktop' 
  : path.join('C:', 'Users', 'guddu', 'Desktop');

const desktopZip = path.join(desktopDir, 'SarkariAI-Hub-Production.zip');
const localZip = path.join(rootDir, 'SarkariAI-Hub-Production.zip');

if (fs.existsSync(desktopZip)) fs.unlinkSync(desktopZip);
if (fs.existsSync(localZip)) fs.unlinkSync(localZip);

console.log(`Compressing clean archive to ${localZip}...`);
execSync(`powershell -Command "Compress-Archive -Path '${stagingDir}\\*' -DestinationPath '${localZip}' -Force"`);

if (fs.existsSync(desktopDir)) {
  fs.copyFileSync(localZip, desktopZip);
}

const stat = fs.statSync(desktopZip);
console.log('====================================================');
console.log('✅ CLEAN PRODUCTION ZIP ARCHIVE CREATED SUCCESSFULLY!');
console.log(`📍 Desktop Path: ${desktopZip}`);
console.log(`📍 Project Path: ${localZip}`);
console.log(`📦 Size: ${(stat.size / (1024 * 1024)).toFixed(2)} MB`);
console.log('====================================================');
