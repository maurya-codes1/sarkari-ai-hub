const fs = require('fs');
const path = require('path');

const indexHtml = fs.readFileSync(path.resolve(__dirname, '../../public/index.html'), 'utf8');

console.log('--- AUDITING INDEX.HTML TABS AND TOOLS ---');
const tabMatches = indexHtml.match(/data-tab="([^"]+)"/g) || [];
const tabs = Array.from(new Set(tabMatches.map(m => m.replace(/data-tab="|"$/g, ''))));
console.log('Total data-tabs found:', tabs.length);
console.log('Tabs:', tabs);

// Check if each tab has a corresponding section or container
tabs.forEach(tab => {
  const hasSection = indexHtml.includes(`id="tab-${tab}"`) || 
                     indexHtml.includes(`id="${tab}Section"`) || 
                     indexHtml.includes(`id="${tab}-tab"`) ||
                     indexHtml.includes(`showTab('${tab}')`) ||
                     indexHtml.includes(`switchTab('${tab}')`) ||
                     indexHtml.includes(`data-section="${tab}"`);
  console.log(`Tab [${tab}]: container / handler mapped: ${hasSection}`);
});
