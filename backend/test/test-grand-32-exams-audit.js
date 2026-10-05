/**
 * Grand Master Audit Script: All 32 Non-Board Exams Reconstitution Verification
 * Asserts:
 * - Exactly 261,520 questions across 31 school boards (100% preservation)
 * - Exactly 46,000 questions across all 32 non-board exams
 * - Exactly 160 master notes (5 notes per exam)
 * - Exactly 307,520 total questions in sarkari_core.db
 * - 0 foreign key violations
 * - PRAGMA integrity_check = ok
 */

const path = require('path');
const Database = require('better-sqlite3');

const DB_PATH = path.join(__dirname, '../db/sarkari_core.db');
const db = new Database(DB_PATH);

const exams = [
  { id: 'ssc-cgl', ver: 'ver-ssc-cgl-2026', name: 'SSC CGL', exp: 2800 },
  { id: 'ssc-chsl', ver: 'ver-ssc-chsl-2026', name: 'SSC CHSL', exp: 2700 },
  { id: 'ssc-mts', ver: 'ver-ssc-mts-2026', name: 'SSC MTS', exp: 1200 },
  { id: 'ssc-gd', ver: 'ver-ssc-gd-2026', name: 'SSC GD', exp: 1500 },
  { id: 'rrb-ntpc', ver: 'ver-rrb-ntpc-2026', name: 'RRB NTPC', exp: 1800 },
  { id: 'rrb-alp', ver: 'ver-rrb-alp-2026', name: 'RRB ALP', exp: 1800 },
  { id: 'rrb-group-d', ver: 'ver-rrb-group-d-2026', name: 'RRB Group D', exp: 1200 },
  { id: 'rrb-technician', ver: 'ver-rrb-technician-2026', name: 'RRB Technician', exp: 1800 },
  { id: 'upsc-cse', ver: 'ver-upsc-cse-2026', name: 'UPSC CSE', exp: 2400 },
  { id: 'upsc-nda', ver: 'ver-upsc-nda-2026', name: 'UPSC NDA', exp: 1800 },
  { id: 'agniveer-army', ver: 'ver-agniveer-army-2026', name: 'Army Agniveer', exp: 1800 },
  { id: 'agniveer-airforce', ver: 'ver-agniveer-airforce-2026', name: 'IAF Agniveer', exp: 1500 },
  { id: 'agniveer-navy', ver: 'ver-agniveer-navy-2026', name: 'Navy Agniveer', exp: 1200 },
  { id: 'ibps-po-clerk', ver: 'ver-ibps-po-clerk-2026', name: 'IBPS Banking', exp: 1200 },
  { id: 'up-police-constable', ver: 'ver-up-police-constable-2026', name: 'UP Police', exp: 1200 },
  { id: 'bihar-police-constable', ver: 'ver-bihar-police-constable-2026', name: 'Bihar Police', exp: 1200 },
  { id: 'delhi-police', ver: 'ver-delhi-police-2026', name: 'Delhi Police', exp: 1200 },
  { id: 'mp-police', ver: 'ver-mp-police-2026', name: 'MP Police', exp: 1200 },
  { id: 'rajasthan-police', ver: 'ver-rajasthan-police-2026', name: 'Rajasthan Police', exp: 1200 },
  { id: 'maharashtra-police', ver: 'ver-maharashtra-police-2026', name: 'Maharashtra Police', exp: 1200 },
  { id: 'wb-police', ver: 'ver-wb-police-2026', name: 'WB Police', exp: 1200 },
  { id: 'haryana-police', ver: 'ver-haryana-police-2026', name: 'Haryana Police', exp: 1200 },
  { id: 'ctet-exam', ver: 'ver-ctet-exam-2026', name: 'CTET (CBSE)', exp: 1500 },
  { id: 'bpsc-tre', ver: 'ver-bpsc-tre-2026', name: 'BPSC TRE 4.0', exp: 1200 },
  { id: 'uptet-supertet', ver: 'ver-uptet-supertet-2026', name: 'UP TET & Super TET', exp: 1200 },
  { id: 'reet-rajasthan', ver: 'ver-reet-rajasthan-2026', name: 'Rajasthan REET', exp: 1200 },
  { id: 'ugc-net', ver: 'ver-ugc-net-2026', name: 'NTA UGC NET', exp: 1200 },
  { id: 'clat-law', ver: 'ver-clat-law-2026', name: 'CLAT Law', exp: 1200 },
  { id: 'nta-neet', ver: 'ver-nta-neet-2026', name: 'NTA NEET-UG', exp: 1200 },
  { id: 'nta-jee-main', ver: 'ver-nta-jee-main-2026', name: 'NTA JEE Main', exp: 900 },
  { id: 'nta-jee-adv', ver: 'ver-nta-jee-adv-2026', name: 'JEE Advanced', exp: 900 },
  { id: 'nta-cuet-ug', ver: 'ver-nta-cuet-ug-2026', name: 'NTA CUET UG', exp: 1200 }
];

console.log('================================================================');
console.log('🏛️  GRAND MASTER 32-EXAM CURRICULUM AUDIT & VERIFICATION');
console.log('================================================================\n');

let nonBoardSum = 0;
let notesSum = 0;
let allPass = true;

exams.forEach((e, idx) => {
  const cnt = db.prepare('SELECT COUNT(*) as c FROM questions WHERE exam_version_id = ?').get(e.ver).c;
  const notesCnt = db.prepare('SELECT COUNT(*) as c FROM notes WHERE exam_version_id = ?').get(e.ver).c;
  nonBoardSum += cnt;
  notesSum += notesCnt;
  const ok = (cnt === e.exp) && (notesCnt === 5);
  if (!ok) allPass = false;
  console.log(`[#${String(idx + 1).padStart(2, '0')}] ${e.name.padEnd(24)}: ${String(cnt).padStart(5)} Qs (Exp: ${String(e.exp).padStart(5)}) | ${notesCnt}/5 Notes | ${ok ? '✅ PASS' : '❌ FAIL'}`);
});

const boardCnt = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id IS NOT NULL AND board_id != ''").get().c;
const totalCnt = db.prepare('SELECT COUNT(*) as c FROM questions').get().c;
const fks = db.prepare('PRAGMA foreign_key_check').all();
const integrity = db.prepare('PRAGMA integrity_check').get().integrity_check;

console.log('\n================================================================');
console.log('📊 DATABASE VERIFICATION SUMMARY');
console.log('================================================================');
console.log(`1. Total School Board Questions:       ${boardCnt.toLocaleString()} (Expected: 261,520 - 100% Intact) -> ${boardCnt === 261520 ? '✅ PASS' : '❌ FAIL'}`);
console.log(`2. Total Non-Board Questions (32 Exams):${nonBoardSum.toLocaleString()} (Expected:  46,000) -> ${nonBoardSum === 46000 ? '✅ PASS' : '❌ FAIL'}`);
console.log(`3. Total Database Question Bank:       ${totalCnt.toLocaleString()} (Expected: 307,520) -> ${totalCnt === 307520 ? '✅ PASS' : '❌ FAIL'}`);
console.log(`4. Total Master Bundled Notes:         ${notesSum} (Expected: 160 [32x5]) -> ${notesSum === 160 ? '✅ PASS' : '❌ FAIL'}`);
console.log(`5. Foreign Key Violations:             ${fks.length} (Expected: 0) -> ${fks.length === 0 ? '✅ PASS' : '❌ FAIL'}`);
console.log(`6. PRAGMA integrity_check:             ${integrity} (Expected: ok) -> ${integrity === 'ok' ? '✅ PASS' : '❌ FAIL'}`);
console.log(`7. All 32 Non-Board Exams Validated:   ${allPass ? '✅ 100% COMPLETE' : '❌ INCOMPLETE'}`);
console.log('================================================================\n');

db.close();

if (!allPass || boardCnt !== 261520 || totalCnt !== 307520 || fks.length > 0 || integrity !== 'ok') {
  console.error('❌ GRAND AUDIT FAILED!');
  process.exit(1);
} else {
  console.log('🎉 GRAND AUDIT PASSED! ALL 32 NON-BOARD EXAMS ARE 100% RECONSTITUTED & CERTIFIED.');
}
