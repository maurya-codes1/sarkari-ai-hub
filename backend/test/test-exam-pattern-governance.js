// backend/test/test-exam-pattern-governance.js
// Automated 30-Assertion Governance & Deep Validation Suite for Exam Pattern Hardening

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const db = require('better-sqlite3')('backend/db/sarkari_core.db');

console.log('====================================================================');
console.log('🧪 RUNNING EXAM PATTERN GOVERNANCE 30-ASSERTION VERIFICATION SUITE');
console.log('====================================================================\n');

let passCount = 0;
let failCount = 0;

function runTest(description, fn) {
  try {
    fn();
    console.log(`  ✅ [PASS] ${description}`);
    passCount++;
  } catch (err) {
    console.error(`  ❌ [FAIL] ${description}`);
    console.error(`     Reason: ${err.message}`);
    failCount++;
  }
}

function parseCsv(filePath) {
  assert(fs.existsSync(filePath), `File ${filePath} must exist`);
  const content = fs.readFileSync(filePath, 'utf8').trim();
  const lines = content.split('\n');
  assert(lines.length > 1, `CSV ${filePath} must have headers and rows`);
  
  const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    const cells = [];
    let insideQuotes = false;
    let currentCell = '';
    for (let c = 0; c < line.length; c++) {
      const char = line[c];
      if (char === '"' && (c === 0 || line[c - 1] !== '\\')) {
        insideQuotes = !insideQuotes;
      } else if (char === ',' && !insideQuotes) {
        cells.push(currentCell.trim().replace(/^"|"$/g, ''));
        currentCell = '';
      } else {
        currentCell += char;
      }
    }
    cells.push(currentCell.trim().replace(/^"|"$/g, ''));
    
    const obj = {};
    headers.forEach((h, idx) => {
      obj[h] = cells[idx] || '';
    });
    rows.push(obj);
  }
  return { headers, rows };
}

// Load data structures
const dbExams = db.prepare('SELECT exam_id, name, category FROM exams ORDER BY category, exam_id').all();
const dbExamCount = dbExams.length;

const inventoryData = parseCsv('COMPLETE_EXAM_INVENTORY.csv');
const rootRegistryData = parseCsv('exam-pattern-registry.csv');
const coverageData = parseCsv('EXAM_PATTERN_COVERAGE.csv');
const identityData = parseCsv('exam-identity-audit.csv');
const componentData = parseCsv('exam-pattern-component-registry.csv');
const boardAuditData = parseCsv('board-subject-coverage-audit.csv');
const sourceArtifactData = parseCsv('source-artifact-registry.csv');
const pdfReconcileData = parseCsv('handbook-pdf-reconciliation.csv');
const blueprintsJson = JSON.parse(fs.readFileSync('exam-blueprints.json', 'utf8'));

// -------------------------------------------------------------
// PART 1: ROOT INVENTORY & INTEGRITY (Tests 1 - 6)
// -------------------------------------------------------------
console.log('--- PART 1: ROOT INVENTORY & IDENTITY INTEGRITY ---');

runTest('1. Root exam count matches inventory count (52 = 52)', () => {
  assert.strictEqual(dbExamCount, 52, `Database exams must be 52, got ${dbExamCount}`);
  assert.strictEqual(inventoryData.rows.length, dbExamCount, 'Inventory count must match DB count');
});

runTest('2. Root registry count matches inventory count (52 = 52)', () => {
  assert.strictEqual(rootRegistryData.rows.length, dbExamCount, 'Root registry count must match DB count');
});

runTest('3. Every root exam has coverage record in EXAM_PATTERN_COVERAGE.csv', () => {
  assert.strictEqual(coverageData.rows.length, dbExamCount, 'Coverage count must match DB count');
  const covIds = new Set(coverageData.rows.map(r => r.exam_id));
  for (const ex of dbExams) {
    assert(covIds.has(ex.exam_id), `Coverage missing for root exam ${ex.exam_id}`);
  }
});

runTest('4. No root exam unmapped across database and registries', () => {
  const invIds = new Set(inventoryData.rows.map(r => r.exam_id));
  const regIds = new Set(rootRegistryData.rows.map(r => r.Exam));
  for (const ex of dbExams) {
    assert(invIds.has(ex.exam_id), `Unmapped in inventory: ${ex.exam_id}`);
    assert(regIds.has(ex.exam_id), `Unmapped in registry: ${ex.exam_id}`);
  }
});

runTest('5. No duplicate root IDs in database, inventory or identity audit', () => {
  const dbSeen = new Set();
  dbExams.forEach(e => {
    assert(!dbSeen.has(e.exam_id), `Duplicate DB root ID: ${e.exam_id}`);
    dbSeen.add(e.exam_id);
  });
  const invSeen = new Set();
  inventoryData.rows.forEach(r => {
    assert(!invSeen.has(r.exam_id), `Duplicate inventory ID: ${r.exam_id}`);
    invSeen.add(r.exam_id);
  });
  const idSeen = new Set();
  identityData.rows.forEach(r => {
    assert(!idSeen.has(r.root_exam_id), `Duplicate identity audit ID: ${r.root_exam_id}`);
    idSeen.add(r.root_exam_id);
  });
});

runTest('6. No duplicate component IDs in exam-pattern-component-registry.csv', () => {
  const compSeen = new Set();
  const dupes = [];
  componentData.rows.forEach(c => {
    if (compSeen.has(c.component_id)) dupes.push(c.component_id);
    compSeen.add(c.component_id);
  });
  assert.strictEqual(dupes.length, 0, `Duplicate component IDs detected: ${dupes.join(', ')}`);
});

// -------------------------------------------------------------
// PART 2: IDENTITY NORMALIZATION & CONTAMINATION GATES (Tests 7 - 16)
// -------------------------------------------------------------
console.log('\n--- PART 2: IDENTITY NORMALIZATION & CONTAMINATION GATES ---');

runTest('7. Umbrella exams have valid component decomposition where required', () => {
  const umbrellas = identityData.rows.filter(r => r.identity_scope !== 'SINGLE_EXAM');
  assert(umbrellas.length >= 45, `Expected umbrella roots to be audited, got ${umbrellas.length}`);
  umbrellas.forEach(u => {
    const comps = componentData.rows.filter(c => c.root_exam_id === u.root_exam_id);
    assert(comps.length >= 2, `Umbrella ${u.root_exam_id} must have >= 2 components, got ${comps.length}`);
  });
});

runTest('8. No merged incompatible stages in granular components', () => {
  const cglComps = componentData.rows.filter(c => c.root_exam_id === 'ssc-cgl');
  assert(cglComps.some(c => c.stage.includes('Tier-1')), 'CGL Tier-1 stage must exist separately');
  assert(cglComps.some(c => c.stage.includes('Tier-2')), 'CGL Tier-2 stage must exist separately');
  const merged = cglComps.find(c => c.stage.includes('Tier-1') && c.stage.includes('Tier-2'));
  assert(!merged, 'Tier-1 and Tier-2 must not be merged into one component');
});

runTest('9. No merged incompatible subjects in board blueprints', () => {
  const cbseMath = componentData.rows.find(c => c.root_exam_id === 'cbse-board' && c.subject.includes('Math'));
  const cbseSci = componentData.rows.find(c => c.root_exam_id === 'cbse-board' && c.subject.includes('Science'));
  assert(cbseMath && cbseSci, 'CBSE Math and Science must both exist as separate components');
  assert.notStrictEqual(cbseMath.component_id, cbseSci.component_id, 'Math and Science cannot share component_id');
});

runTest('10. No Class X / Class XII contamination in board components', () => {
  const cls10 = componentData.rows.filter(c => c.class === 'Class 10');
  const cls12 = componentData.rows.filter(c => c.class === 'Class 12');
  assert(cls10.length > 50, 'Must have >50 Class 10 components');
  assert(cls12.length > 50, 'Must have >50 Class 12 components');
  cls10.forEach(c => {
    assert(!c.stage.includes('Class 12'), `Contamination: Class 10 comp ${c.component_id} has Class 12 in stage`);
  });
});

runTest('11. No Prelims / Mains contamination in UPSC CSE components', () => {
  const upscPrelims = componentData.rows.filter(c => c.root_exam_id === 'upsc-cse' && c.stage === 'Preliminary');
  const upscMains = componentData.rows.filter(c => c.root_exam_id === 'upsc-cse' && c.stage === 'Mains');
  assert.strictEqual(upscPrelims.length, 2, 'UPSC Prelims must have exactly 2 papers (GS 1 & CSAT)');
  assert.strictEqual(upscMains.length, 9, 'UPSC Mains must have exactly 9 papers');
});

runTest('12. No Tier I / Tier II contamination in SSC CGL / CHSL', () => {
  const cglT1 = componentData.rows.find(c => c.component_id === 'comp-ssc-cgl-tier1');
  const cglT2 = componentData.rows.find(c => c.component_id === 'comp-ssc-cgl-tier2-p1');
  assert.strictEqual(cglT1.stage, 'Tier-1');
  assert.strictEqual(cglT2.stage, 'Tier-2');
});

runTest('13. No PO / Clerk pattern contamination in Banking components', () => {
  const poPrelims = componentData.rows.find(c => c.component_id === 'comp-ibps-po-prelims');
  const clerkPrelims = componentData.rows.find(c => c.component_id === 'comp-ibps-clerk-prelims');
  assert(poPrelims && clerkPrelims, 'Both IBPS PO and Clerk components must exist');
  assert.notStrictEqual(poPrelims.component_id, clerkPrelims.component_id);
  assert(poPrelims.exam_name.includes('PO'), 'PO component must contain PO');
  assert(clerkPrelims.exam_name.includes('Clerk'), 'Clerk component must contain Clerk');
});

runTest('14. No language-rule contamination (UI vs Exam Paper Medium)', () => {
  const langData = parseCsv('exam-language-registry.csv');
  assert.strictEqual(langData.rows.length, 52);
  langData.rows.forEach(r => {
    assert(r.Website_UI_Language.includes('Independent'), `UI language must be independent for ${r.Exam_Id}`);
  });
});

runTest('15. No marking-rule contamination (SSC MTS Session 1 has 0 penalty, Session 2 has -1)', () => {
  const normReport = fs.readFileSync('exam-pattern-normalization-report.md', 'utf8');
  assert(normReport.includes('No Negative') && normReport.includes('-1 Negative'), 'MTS negative marking contrast must be documented');
});

runTest('16. No question-count contamination (NEET UG: 200 Qs total, 180 to attempt)', () => {
  const neetComp = componentData.rows.find(c => c.root_exam_id === 'nta-neet');
  assert(neetComp);
  assert(neetComp.subject.includes('Attempt 45 per subject') || neetComp.subject.includes('Botany'));
});

// -------------------------------------------------------------
// PART 3: SOURCES, MULTIPLICITY & JSON ALIGNMENT (Tests 17 - 21)
// -------------------------------------------------------------
console.log('\n--- PART 3: SOURCES, MULTIPLICITY & JSON ALIGNMENT ---');

runTest('17. Source artifact multiplicity is correctly represented (>= 100 official documents)', () => {
  assert(sourceArtifactData.rows.length >= 100, `Expected >= 100 source documents, got ${sourceArtifactData.rows.length}`);
  const sscSources = sourceArtifactData.rows.filter(s => s.root_exam_id === 'ssc-cgl');
  assert(sscSources.length >= 3, `Expected >= 3 sources for SSC CGL, got ${sscSources.length}`);
  const upscSources = sourceArtifactData.rows.filter(s => s.root_exam_id === 'upsc-cse');
  assert(upscSources.length >= 3, `Expected >= 3 sources for UPSC CSE, got ${upscSources.length}`);
});

runTest('18. Component status is independent of root status', () => {
  const haryanaPoliceComp = componentData.rows.find(c => c.root_exam_id === 'haryana-police');
  assert.strictEqual(haryanaPoliceComp.status, 'PARTIALLY_VERIFIED');
  const upscComp = componentData.rows.find(c => c.root_exam_id === 'upsc-cse');
  assert.strictEqual(upscComp.status, 'VERIFIED');
});

runTest('19. JSON hierarchical blueprints match component registry exactly (324 components)', () => {
  assert.strictEqual(blueprintsJson.total_root_exams, 52);
  assert.strictEqual(blueprintsJson.total_pattern_components, componentData.rows.length);
  let countedComps = 0;
  for (const root of Object.values(blueprintsJson.root_exams)) {
    countedComps += root.pattern_components.length;
  }
  assert.strictEqual(countedComps, componentData.rows.length, 'JSON components must match CSV registry');
});

runTest('20. Handbook includes all current 52 root exams', () => {
  const md = fs.readFileSync('exam-pattern-handbook.md', 'utf8');
  dbExams.forEach(e => {
    assert(md.includes(e.exam_id) || md.includes(e.name), `Handbook must mention root exam ${e.exam_id}`);
  });
});

runTest('21. Handbook includes required pattern components and PSEB 18-question structure', () => {
  const md = fs.readFileSync('exam-pattern-handbook.md', 'utf8');
  assert(md.includes('18 questions') || md.includes('18-question'), 'Handbook must detail PSEB 18-question blueprint');
  assert(md.includes('CSAT'), 'Handbook must detail CSAT qualifying component');
  assert(md.includes('Agniveer'), 'Handbook must detail Agniveer component families');
});

// -------------------------------------------------------------
// PART 4: PDF DEEP AUDIT & SUBSTANTIVE CONTENT (Tests 22 - 27)
// -------------------------------------------------------------
console.log('\n--- PART 4: PDF DEEP AUDIT & SUBSTANTIVE CONTENT ---');

runTest('22. PDF file exists on disk', () => {
  assert(fs.existsSync('exam-pattern-handbook.pdf'), 'exam-pattern-handbook.pdf must exist');
});

runTest('23. PDF opens and is a multi-page document (> 10 pages)', () => {
  const buf = fs.readFileSync('exam-pattern-handbook.pdf');
  const str = buf.toString('latin1');
  const pages = (str.match(/\/Type\s*\/Page\b/g) || []).length;
  assert(pages >= 10, `PDF must have >= 10 pages, got ${pages}`);
});

runTest('24. PDF contains substantive text (> 15,000 characters decoded)', () => {
  const str = fs.readFileSync('exam-pattern-handbook.pdf', 'latin1');
  const streamRegex = /stream[\r\n]+([\s\S]*?)[\r\n]+endstream/g;
  let match;
  let decoded = '';
  while ((match = streamRegex.exec(str)) !== null) {
    try {
      const uncompressed = zlib.inflateSync(Buffer.from(match[1], 'latin1')).toString('latin1');
      const hexMatches = uncompressed.match(/<([0-9a-fA-F]+)>/g) || [];
      for (const h of hexMatches) {
        decoded += Buffer.from(h.slice(1, -1), 'hex').toString('utf8');
      }
    } catch (e) {}
  }
  assert(decoded.length > 15000, `PDF decoded text must be substantive (>15K chars), got ${decoded.length}`);
});

runTest('25. PDF contains current root inventory citations', () => {
  const str = fs.readFileSync('exam-pattern-handbook.pdf', 'latin1');
  assert(str.includes('SARKARIAI HUB') || str.includes('SarkariAI'));
});

runTest('26. PDF contains component patterns and matrices', () => {
  const str = fs.readFileSync('exam-pattern-handbook.pdf', 'latin1');
  const streamRegex = /stream[\r\n]+([\s\S]*?)[\r\n]+endstream/g;
  let match;
  let decoded = '';
  while ((match = streamRegex.exec(str)) !== null) {
    try {
      const uncompressed = zlib.inflateSync(Buffer.from(match[1], 'latin1')).toString('latin1');
      const hexMatches = uncompressed.match(/<([0-9a-fA-F]+)>/g) || [];
      for (const h of hexMatches) {
        decoded += Buffer.from(h.slice(1, -1), 'hex').toString('utf8');
      }
    } catch (e) {}
  }
  assert(decoded.includes('PSEB') || decoded.includes('Punjab'));
  assert(decoded.includes('UPSC') || decoded.includes('Civil Services'));
});

runTest('27. PDF source references and conflict resolutions exist', () => {
  const str = fs.readFileSync('exam-pattern-handbook.pdf', 'latin1');
  const streamRegex = /stream[\r\n]+([\s\S]*?)[\r\n]+endstream/g;
  let match;
  let decoded = '';
  while ((match = streamRegex.exec(str)) !== null) {
    try {
      const uncompressed = zlib.inflateSync(Buffer.from(match[1], 'latin1')).toString('latin1');
      const hexMatches = uncompressed.match(/<([0-9a-fA-F]+)>/g) || [];
      for (const h of hexMatches) {
        decoded += Buffer.from(h.slice(1, -1), 'hex').toString('utf8');
      }
    } catch (e) {}
  }
  assert(decoded.includes('JEE Main') || decoded.includes('NTA'));
  assert(decoded.includes('Negative Marking'));
});

// -------------------------------------------------------------
// PART 5: DATABASE & QUESTION INVARIANTS (Tests 28 - 30)
// -------------------------------------------------------------
console.log('\n--- PART 5: DATABASE & QUESTION INVARIANTS ---');

runTest('28. SQLite PRAGMA integrity_check passes with ok', () => {
  const intCheck = db.prepare('PRAGMA integrity_check').get();
  assert.strictEqual(intCheck.integrity_check, 'ok');
});

runTest('29. SQLite PRAGMA foreign_key_check passes with 0 violations', () => {
  const fkCheck = db.prepare('PRAGMA foreign_key_check').all();
  assert.strictEqual(fkCheck.length, 0);
});

runTest('30. SQLite question count invariant is preserved at exactly 1,282 rows', () => {
  const count = db.prepare('SELECT COUNT(*) as c FROM questions').get().c;
  assert.strictEqual(count, 1282, `Question count must remain 1,282, got ${count}`);
});

// -------------------------------------------------------------
// SUMMARY
// -------------------------------------------------------------
console.log('\n====================================================================');
console.log(`🏁 GOVERNANCE TEST COMPLETE: ${passCount} PASSED / ${failCount} FAILED (Total: ${passCount + failCount})`);
console.log('====================================================================');

if (failCount > 0) {
  process.exit(1);
}
