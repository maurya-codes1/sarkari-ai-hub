const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');

console.log('=== RUNNING COMPREHENSIVE GLOBAL USER-FACING NO-DUMMY AUDIT ===');

const keywords = ['dummy', 'placeholder', 'lorem ipsum', 'fake', 'fabricated'];
const findings = [];

// 1. Audit Database
const db = new Database(path.resolve(__dirname, '../db/sarkari_core.db'), { readonly: true });
const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'").all();
for (const t of tables) {
  const tableName = t.name;
  const cols = db.prepare(`PRAGMA table_info("${tableName}")`).all();
  const textCols = cols.filter(c => c.type.toUpperCase().includes('TEXT') || c.type.toUpperCase().includes('CHAR')).map(c => c.name);
  if (textCols.length === 0) continue;
  const rows = db.prepare(`SELECT * FROM "${tableName}"`).all();
  for (const row of rows) {
    for (const col of textCols) {
      const val = String(row[col] || '').toLowerCase();
      for (const kw of keywords) {
        if (val.includes(kw)) {
          // Check if it's an official sample question / sample paper reference
          const isBenign = val.includes('sample paper') || val.includes('sample question') || val.includes('sample paper version') || col === 'search.placeholder';
          findings.push({
            type: 'DATABASE',
            location: `${tableName}.${col}`,
            key: row.id || row[cols[0].name],
            keyword: kw,
            snippet: val.substring(Math.max(0, val.indexOf(kw) - 15), Math.min(val.length, val.indexOf(kw) + 30)),
            isBenign
          });
        }
      }
    }
  }
}
db.close();

// 2. Audit Client Locales
const localesDir = path.resolve(__dirname, '../../client/src/i18n/locales');
if (fs.existsSync(localesDir)) {
  const files = fs.readdirSync(localesDir).filter(f => f.endsWith('.json'));
  for (const file of files) {
    const filePath = path.join(localesDir, file);
    const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    for (const [key, val] of Object.entries(content)) {
      const strVal = String(val).toLowerCase();
      for (const kw of keywords) {
        // "search.placeholder" key itself has word "placeholder" in key name, check value only
        if (strVal.includes(kw)) {
          const isBenign = strVal.includes('placeholder') && key.includes('placeholder');
          findings.push({
            type: 'LOCALE_JSON',
            location: file,
            key: key,
            keyword: kw,
            snippet: strVal,
            isBenign
          });
        }
      }
    }
  }
}

console.log(`Global Scan Complete. Total raw hits: ${findings.length}`);
const investigate = findings.filter(f => !f.isBenign);
console.log(`User-visible unverified dummy/fake hits: ${investigate.length}`);
if (investigate.length > 0) {
  console.table(investigate);
} else {
  console.log('✅ ZERO invalid dummy/fake records found across DB and Locales!');
}
