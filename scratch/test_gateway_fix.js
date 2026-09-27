const fs = require('fs');
const path = require('path');

console.log('=== VERIFYING OUTBOUND GATEWAY 10S AND NEW TAB FIX ===\n');

// 1. Check index.html
const html = fs.readFileSync(path.join(__dirname, '..', 'public', 'index.html'), 'utf8');

const hasLinkTop = html.includes('id="gwProceedLinkTop"');
const hasLinkBottom = html.includes('id="gwProceedLinkBottom"');
const hasTargetBlankTop = html.includes('id="gwProceedLinkTop" href="#" target="_blank"');
const hasTargetBlankBottom = html.includes('id="gwProceedLinkBottom" href="#" target="_blank"');
const has10sStrip = html.includes('10-Second Visual Countdown Strip');
const has10sDisplay = html.includes('>10s</span>');

console.log('1. Modal HTML Elements in public/index.html:');
console.log('   ✓ gwProceedLinkTop exists:', hasLinkTop);
console.log('   ✓ gwProceedLinkTop has target="_blank":', hasTargetBlankTop);
console.log('   ✓ gwProceedLinkBottom exists:', hasLinkBottom);
console.log('   ✓ gwProceedLinkBottom has target="_blank":', hasTargetBlankBottom);
console.log('   ✓ 10-Second Visual Countdown Strip comment exists:', has10sStrip);
console.log('   ✓ Default countdown display is 10s:', has10sDisplay);

if (!hasLinkTop || !hasLinkBottom || !hasTargetBlankTop || !hasTargetBlankBottom || !has10sDisplay) {
  console.error('❌ Check failed on index.html!');
  process.exit(1);
}

// 2. Check app.js
const appJs = fs.readFileSync(path.join(__dirname, '..', 'public', 'js', 'app.js'), 'utf8');

const has10sConst = appJs.includes('const GW_TOTAL_SECONDS = 10;');
const updatesLinkTop = appJs.includes('linkTop.href = url;');
const updatesLinkBottom = appJs.includes('linkBottom.href = url;');
const noLocationHref = !appJs.includes('window.location.href = target;');

console.log('\n2. Gateway Controller in public/js/app.js:');
console.log('   ✓ GW_TOTAL_SECONDS is 10:', has10sConst);
console.log('   ✓ Updates gwProceedLinkTop.href with url:', updatesLinkTop);
console.log('   ✓ Updates gwProceedLinkBottom.href with url:', updatesLinkBottom);
console.log('   ✓ window.location.href = target is COMPLETELY REMOVED (Never redirects portal tab):', noLocationHref);

if (!has10sConst || !updatesLinkTop || !updatesLinkBottom || !noLocationHref) {
  console.error('❌ Check failed on app.js!');
  process.exit(1);
}

// 3. Run verify_all.js to ensure no regressions
console.log('\n3. Running master verify_all.js:');
require('./verify_all.js');

console.log('\n=== ALL GATEWAY FIXES VERIFIED 100% PERFECT! ===');
