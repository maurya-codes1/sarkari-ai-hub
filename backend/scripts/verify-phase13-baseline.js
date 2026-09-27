// backend/scripts/verify-phase13-baseline.js
// Verifies baseline content invariants before Phase 13 modifications

const { getDb } = require('../db/database');
const fullExamGateService = require('../services/full-exam-gate-service');

function verifyBaseline() {
  const db = getDb();

  const totalQ = db.prepare('SELECT COUNT(*) as c FROM questions').get().c;
  const legacyQ = db.prepare("SELECT COUNT(*) as c FROM questions WHERE provenance = 'HUMAN_CURATED'").get().c;
  const pyqQ = db.prepare("SELECT COUNT(*) as c FROM questions WHERE provenance = 'OFFICIAL_PYQ'").get().c;
  const sampleQ = db.prepare("SELECT COUNT(*) as c FROM questions WHERE provenance = 'OFFICIAL_SAMPLE'").get().c;
  const fullExamQ = db.prepare('SELECT COUNT(*) as c FROM questions WHERE full_exam_eligible = 1').get().c;

  const sscCgl = fullExamGateService.evaluateExamReadiness('ssc-cgl', 'ver-ssc-cgl-2026', db);
  const upscCse = fullExamGateService.evaluateExamReadiness('upsc-cse', 'ver-upsc-cse-2026', db);

  const inventoryExams = db.prepare('SELECT exam_id FROM nationwide_exam_inventory').all();
  let readyCount = 0;
  let blockedCount = 0;
  for (const ex of inventoryExams) {
    const r = fullExamGateService.evaluateExamReadiness(ex.exam_id, null, db);
    if (r && r.status === 'READY_FOR_FULL_EXAM') readyCount++;
    else blockedCount++;
  }

  const boards = db.prepare('SELECT COUNT(*) as c FROM boards').get().c;
  const states = db.prepare('SELECT COUNT(*) as c FROM states').get().c;
  const langs = db.prepare('SELECT COUNT(*) as c FROM languages WHERE is_ui_language = 1 OR is_expanded_ui_language = 1').get().c;

  console.log('=================================================================');
  console.log('🔍 PHASE 13 BASELINE CONTENT INVARIANTS AUDIT');
  console.log('=================================================================');
  console.log('Total Questions:     ', totalQ, totalQ === 1282 ? '✅' : '❌');
  console.log('Legacy Questions:    ', legacyQ, legacyQ === 872 ? '✅' : '❌');
  console.log('True Official PYQs:  ', pyqQ, pyqQ === 351 ? '✅' : '❌');
  console.log('Official Samples:    ', sampleQ, sampleQ === 59 ? '✅' : '❌');
  console.log('Full Exam Eligible:  ', fullExamQ, fullExamQ === 250 ? '✅' : '❌');
  console.log('SSC CGL Status:      ', sscCgl.status, sscCgl.status === 'READY_FOR_FULL_EXAM' ? '✅' : '❌');
  console.log('UPSC CSE Status:     ', upscCse.status, upscCse.status === 'READY_FOR_FULL_EXAM' ? '✅' : '❌');
  console.log('Ready Exams:         ', readyCount, readyCount === 2 ? '✅' : '❌');
  console.log('Blocked Exams:       ', blockedCount, blockedCount === 47 ? '✅' : '❌');
  console.log('Total Inv Exams:     ', inventoryExams.length, inventoryExams.length === 49 ? '✅' : '❌');
  console.log('Boards:              ', boards, boards === 31 ? '✅' : '❌');
  console.log('States/UTs:          ', states, states === 36 ? '✅' : '❌');
  console.log('Active UI Locales:   ', langs, langs === 24 ? '✅' : '❌');
  console.log('=================================================================');

  const allPassed = (
    totalQ === 1282 &&
    legacyQ === 872 &&
    pyqQ === 351 &&
    sampleQ === 59 &&
    fullExamQ === 250 &&
    sscCgl.status === 'READY_FOR_FULL_EXAM' &&
    upscCse.status === 'READY_FOR_FULL_EXAM' &&
    readyCount === 2 &&
    blockedCount === 47 &&
    inventoryExams.length === 49 &&
    boards === 31 &&
    states === 36 &&
    langs === 24
  );

  if (!allPassed) {
    throw new Error('Baseline content verification failed! Cannot proceed.');
  }

  return true;
}

module.exports = { verifyBaseline };

if (require.main === module) {
  verifyBaseline();
}
