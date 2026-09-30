// scripts/check_phase19_pre_audit.js
const { getDb } = require('../backend/db/database');
const db = getDb();

console.log('=== PHASE 19 PRE-IMPLEMENTATION AUDIT ===');
const totalQuestions = db.prepare('SELECT count(1) as c FROM questions').get().c;
const totalVersions = db.prepare('SELECT count(1) as c FROM question_versions').get().c;
const objectiveCount = db.prepare("SELECT count(1) as c FROM questions WHERE question_type_id IN ('single_mcq', 'numerical', 'assertion_reason')").get().c;
const subjectiveCount = db.prepare("SELECT count(1) as c FROM questions WHERE question_type_id NOT IN ('single_mcq', 'numerical', 'assertion_reason')").get().c;
const boardQuestions = db.prepare(`
  SELECT count(*) as c FROM questions q
  LEFT JOIN exam_versions ev ON q.exam_version_id = ev.version_id
  LEFT JOIN exams e ON ev.exam_id = e.exam_id
  WHERE q.board_id IS NOT NULL OR e.board_id IS NOT NULL
`).get().c;
const competitiveQuestions = db.prepare(`
  SELECT count(*) as c FROM questions q
  LEFT JOIN exam_versions ev ON q.exam_version_id = ev.version_id
  LEFT JOIN exams e ON ev.exam_id = e.exam_id
  WHERE q.board_id IS NULL AND e.board_id IS NULL
`).get().c;
const fullExamEligible = db.prepare("SELECT count(1) as c FROM questions WHERE full_exam_eligible = 1").get().c;
const pyqCount = db.prepare("SELECT count(1) as c FROM questions WHERE source_type = 'OFFICIAL_PYQ'").get().c;
const sampleCount = db.prepare("SELECT count(1) as c FROM questions WHERE source_type = 'OFFICIAL_SAMPLE'").get().c;
const humanCuratedCount = db.prepare("SELECT count(1) as c FROM questions WHERE source_type = 'HUMAN_CURATED'").get().c;
const docCount = db.prepare("SELECT count(1) as c FROM questions WHERE source_type = 'OFFICIAL_DOCUMENT'").get().c;

const pragmaIntegrity = db.prepare('PRAGMA integrity_check').get().integrity_check;
const pragmaFk = db.prepare('PRAGMA foreign_key_check').all();

console.log(`Total Questions:          ${totalQuestions}`);
console.log(`Total Versions:           ${totalVersions}`);
console.log(`Objective:                ${objectiveCount}`);
console.log(`Subjective:               ${subjectiveCount}`);
console.log(`School Board:             ${boardQuestions}`);
console.log(`Competitive:              ${competitiveQuestions}`);
console.log(`Full Exam Eligible:       ${fullExamEligible}`);
console.log(`Official PYQ:             ${pyqCount}`);
console.log(`Official Sample:          ${sampleCount}`);
console.log(`Official Document:        ${docCount}`);
console.log(`Human Curated:            ${humanCuratedCount}`);
console.log(`Integrity Check:          ${pragmaIntegrity}`);
console.log(`FK Violations:            ${pragmaFk.length}`);

// Boards practice readiness & full exam readiness
const boards = db.prepare('SELECT * FROM boards ORDER BY board_id').all();
let practiceReady = 0;
let fullExamReady = 0;
for (const b of boards) {
  const tot = db.prepare('SELECT count(1) as c FROM questions WHERE board_id = ?').get(b.board_id).c;
  if (tot >= 200) practiceReady++;
  const feEligible = db.prepare('SELECT count(1) as c FROM questions WHERE board_id = ? AND full_exam_eligible = 1').get(b.board_id).c;
  if (feEligible >= 50) fullExamReady++;
}
console.log(`State Boards Practice Ready:  ${practiceReady} / ${boards.length}`);
console.log(`State Boards Full Exam Ready: ${fullExamReady} / ${boards.length}`);
