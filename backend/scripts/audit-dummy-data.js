const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');

const db = new Database(path.resolve(__dirname, '../db/sarkari_core.db'), { readonly: true });
console.log('=== RUNNING NO-DUMMY DATA AUDIT ===');

const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'").all();

const keywords = ['dummy', 'placeholder', 'lorem ipsum', 'test exam', 'fake', 'fabricated'];
const findings = [];

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
          // Check context: is it an official sample paper or genuine placeholder/dummy?
          const isOfficialSamplePaper = val.includes('sample paper') || val.includes('sample question') || val.includes('sample paper version');
          findings.push({
            table: tableName,
            column: col,
            primaryKey: row.id || row[cols[0].name],
            matchedKeyword: kw,
            sampleSnippet: val.substring(Math.max(0, val.indexOf(kw) - 20), Math.min(val.length, val.indexOf(kw) + 40)),
            isOfficialContext: isOfficialSamplePaper,
            severity: isOfficialSamplePaper ? 'BENIGN_OFFICIAL_REFERENCE' : 'INVESTIGATE'
          });
        }
      }
    }
  }
}

console.log(`Scan complete. Total findings: ${findings.length}`);
const investigate = findings.filter(f => f.severity === 'INVESTIGATE');
console.log(`Genuine investigate findings: ${investigate.length}`);
if (investigate.length > 0) {
  console.table(investigate);
} else {
  console.log('No unverified dummy/fake/placeholder data found in database!');
}

db.close();
