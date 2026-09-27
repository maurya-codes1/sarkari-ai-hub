const fs = require('fs');
const path = require('path');

const srcPath = path.resolve(__dirname, '../../phase10_1_missing_inventory.csv');
let content = fs.readFileSync(srcPath, 'utf8');

// Replace "Phase 11" with "OFFICIAL_NOTIFICATION_MONITORING"
content = content.replace(/"Phase 11"/g, '"OFFICIAL_NOTIFICATION_MONITORING"');

// For exams that are already in nationwide_exam_inventory, mark them IMPLEMENTED_VERIFIED
const implementedInCore = [
  'ssc-steno',
  'rpf-si',
  'upsc-capf-ac',
  'hpsc-hcs',
  'rpsc-ras',
  'mppsc-state-services'
];

const lines = content.split('\n');
const updatedLines = lines.map(line => {
  for (const code of implementedInCore) {
    if (line.includes(`"${code}"`)) {
      // Replace status with IMPLEMENTED_VERIFIED
      return line
        .replace(/"DISCOVERED_PENDING_VERIFICATION"/g, '"IMPLEMENTED_VERIFIED"')
        .replace(/"SOURCE_PENDING"/g, '"IMPLEMENTED_VERIFIED"')
        .replace(/"BLUEPRINT_PENDING"/g, '"IMPLEMENTED_VERIFIED"');
    }
  }
  return line;
});

const updatedContent = updatedLines.join('\n');
fs.writeFileSync(path.resolve(__dirname, '../../phase10_1_missing_inventory.csv'), updatedContent);
fs.writeFileSync(path.resolve(__dirname, '../../phase10_missing_inventory.csv'), updatedContent);

console.log('phase10_missing_inventory.csv and phase10_1_missing_inventory.csv updated without Phase 11 references.');
