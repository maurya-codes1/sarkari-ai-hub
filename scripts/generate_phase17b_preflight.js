/**
 * scripts/generate_phase17b_preflight.js
 * 
 * Generates reports/phase17b_preflight.json by inspecting the live SQLite database:
 * 1. Real current question count
 * 2. Current provenance counts
 * 3. Current component counts
 * 4. Current subject counts
 * 5. Current language counts
 * 6. Current Full Exam readiness
 * 7. Current Pattern Practice readiness
 * 8. Current CONTENT_PENDING components
 * 9. Current PATTERN_PENDING components
 * 10. Current 36 partially mapped Humanities questions
 * 11. Database integrity
 */

const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, '../backend/db/sarkari_core.db');
const db = new Database(dbPath);
const reportsDir = path.join(__dirname, '../reports');

if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir, { recursive: true });
}

console.log("=====================================================================");
console.log("🔍 SARKARIAI HUB — GENERATING PHASE 17B PREFLIGHT BASELINE");
console.log("=====================================================================\n");

// 1. Total questions and versions
const totalQuestions = db.prepare('SELECT count(*) as c FROM questions').get().c;
const totalVersions = db.prepare('SELECT count(*) as c FROM question_versions').get().c;

// 2. Provenance counts
const provenanceCounts = db.prepare(`
  SELECT provenance, count(*) as count
  FROM questions
  GROUP BY provenance
`).all().reduce((acc, r) => { acc[r.provenance] = r.count; return acc; }, {});

// 3. Subject counts
const subjectCounts = db.prepare(`
  SELECT q.subject_id, s.name as subject_name, count(*) as count
  FROM questions q
  LEFT JOIN subjects s ON q.subject_id = s.subject_id
  GROUP BY q.subject_id
  ORDER BY count DESC
`).all();

// 4. Component counts
const componentCounts = db.prepare(`
  SELECT exam_version_id, count(*) as count
  FROM questions
  GROUP BY exam_version_id
  ORDER BY count DESC
`).all();

// 5. Readiness analysis across 324 components
const patternPracticeReadinessService = require('../backend/services/pattern-practice-readiness-service');
const allComponents = patternPracticeReadinessService.loadComponentsRegistry();

let fullExamReady = 0;
let patternPracticeReady = 0;
let contentPending = 0;
let patternPending = 0;

const componentEvaluations = allComponents.map(c => {
  const versionId = `ver-${c.root_exam_id}-2026`;
  const qCount = db.prepare('SELECT count(*) as c FROM questions WHERE exam_version_id = ?').get(versionId)?.c || 0;
  const pyqCount = db.prepare("SELECT count(*) as c FROM questions WHERE exam_version_id = ? AND (provenance = 'OFFICIAL_PYQ' OR provenance = 'OFFICIAL_SAMPLE')").get(versionId)?.c || 0;
  
  let status = 'CONTENT_PENDING';
  if (c.status === 'PATTERN_PENDING') {
    status = 'PATTERN_PENDING';
    patternPending++;
  } else if (pyqCount >= (c.total_questions || 75)) {
    status = 'FULL_EXAM_READY';
    fullExamReady++;
  } else if (qCount > 0) {
    status = 'PATTERN_PRACTICE_READY';
    patternPracticeReady++;
  } else {
    status = 'CONTENT_PENDING';
    contentPending++;
  }
  
  return {
    componentId: c.component_id,
    examId: c.root_exam_id,
    name: c.exam_name,
    status,
    totalQuestions: qCount,
    pyqQuestions: pyqCount
  };
});

// 6. Language breakdown
const versions = db.prepare('SELECT language_content FROM question_versions').all();
let enCount = 0;
let hiCount = 0;
let taCount = 0;
let teCount = 0;
let mrCount = 0;

for (const v of versions) {
  try {
    const lc = JSON.parse(v.language_content);
    if (lc.en) enCount++;
    if (lc.hi) hiCount++;
    if (lc.ta) taCount++;
    if (lc.te) teCount++;
    if (lc.mr) mrCount++;
  } catch (e) {}
}

// 7. 36 Class 12 Humanities questions
const humanitiesQuestions = db.prepare(`
  SELECT question_id, subject_id, difficulty, marks, duplicate_status
  FROM questions
  WHERE exam_version_id IS NULL AND subject_id IN ('subj-history', 'subj-polity', 'subj-geography')
`).all();

// 8. Database integrity
const integrityCheck = db.pragma('integrity_check');
const fkCheck = db.pragma('foreign_key_check');

const preflightData = {
  timestamp: new Date().toISOString(),
  phase: 'PHASE_17B',
  preflightMetrics: {
    totalQuestions,
    totalVersions,
    provenanceBreakdown: provenanceCounts,
    languageAvailability: {
      englishVersions: enCount,
      hindiVersions: hiCount,
      tamilVersions: taCount,
      teluguVersions: teCount,
      marathiVersions: mrCount
    },
    subjectBreakdown: subjectCounts,
    readinessSummary: {
      totalComponentsTracked: allComponents.length,
      fullExamReadyComponents: fullExamReady,
      patternPracticeReadyComponents: patternPracticeReady,
      contentPendingComponents: contentPending,
      patternPendingComponents: patternPending
    },
    humanitiesPartiallyMapped: {
      count: humanitiesQuestions.length,
      questions: humanitiesQuestions
    },
    databaseIntegrity: {
      integrityCheck: integrityCheck[0]?.integrity_check || 'unknown',
      foreignKeyViolations: fkCheck.length
    }
  }
};

const preflightJsonPath = path.join(reportsDir, 'phase17b_preflight.json');
fs.writeFileSync(preflightJsonPath, JSON.stringify(preflightData, null, 2), 'utf8');

console.log(`✅ Preflight report written to: ${preflightJsonPath}`);
console.log(`Total Live Questions: ${totalQuestions}`);
console.log(`Total Live Versions:  ${totalVersions}`);
console.log(`Full Exam Ready:      ${fullExamReady}`);
console.log(`Practice Ready:       ${patternPracticeReady}`);
console.log(`Content Pending:      ${contentPending}`);
console.log(`Pattern Pending:      ${patternPending}`);
console.log(`Humanities Questions: ${humanitiesQuestions.length}`);
console.log(`DB Integrity:         ${integrityCheck[0]?.integrity_check}, FK Errors: ${fkCheck.length}`);
console.log("=====================================================================\n");
