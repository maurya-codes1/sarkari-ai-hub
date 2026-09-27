const fs = require('fs');
const path = require('path');
const { getDb } = require('../db/database');

const publicDir = path.resolve(__dirname, '../../public');
const htmlFiles = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

console.log('=============================================================');
console.log('🔍 SARKARIAI HUB — LIVE WEBSITE & FRONTEND-TO-BACKEND AUDIT');
console.log('=============================================================\n');

const auditMatrix = [];

htmlFiles.forEach(file => {
  const content = fs.readFileSync(path.join(publicDir, file), 'utf8');
  const fetches = [];
  const regex = /fetch\s*\(\s*['"`]([^'"`]+)['"`]/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    if (!fetches.includes(match[1])) fetches.push(match[1]);
  }

  auditMatrix.push({
    file,
    sizeKb: Math.round(content.length / 1024),
    endpoints: fetches
  });
});

auditMatrix.forEach(item => {
  console.log(`📄 Page: ${item.file} (${item.sizeKb} KB)`);
  if (item.endpoints.length === 0) {
    console.log('   ℹ️ Static UI or Inline Logic');
  } else {
    item.endpoints.forEach(ep => console.log(`   🔗 Endpoint: ${ep}`));
  }
  console.log('');
});

// Verify all endpoints are defined in server.js, phase11-routes, phase12-routes, or phase13-routes
console.log('--- AUDITING BACKEND REST ROUTE COVERAGE ---');
const serverJs = fs.readFileSync(path.resolve(__dirname, '../../server.js'), 'utf8');
const p11Routes = fs.readFileSync(path.resolve(__dirname, '../routes/phase11-routes.js'), 'utf8');
const p12Routes = fs.readFileSync(path.resolve(__dirname, '../routes/phase12-routes.js'), 'utf8');
const p13Routes = fs.readFileSync(path.resolve(__dirname, '../routes/phase13-routes.js'), 'utf8');

const allRouteDefs = serverJs + '\n' + p11Routes + '\n' + p12Routes + '\n' + p13Routes;

let allEndpointsValid = true;
auditMatrix.forEach(page => {
  page.endpoints.forEach(ep => {
    // strip query string or params
    const cleanEp = ep.split('?')[0].replace(/\$\{[^}]+\}/g, '').replace(/:[a-zA-Z0-9_]+/g, '');
    const basePart = cleanEp.split('/').filter(Boolean).slice(0, 3).join('/');
    
    // Check if base part exists in route definitions
    const exists = allRouteDefs.includes(basePart) || allRouteDefs.includes(cleanEp);
    if (!exists && !ep.startsWith('http')) {
      console.warn(`⚠️ Warning: Page ${page.file} calls ${ep} which might not match route definitions`);
      allEndpointsValid = false;
    }
  });
});

if (allEndpointsValid) {
  console.log('✅ All frontend API calls are connected to real backend route definitions!');
}
