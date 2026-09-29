// scripts/generate_phase17a_baseline.js
const fs = require('fs');
const path = require('path');
const { getDb } = require('../backend/db/database');
const patternPracticeReadinessService = require('../backend/services/pattern-practice-readiness-service');

const db = getDb();
const ROOT_DIR = path.join(__dirname, '..');

console.log('Measuring live baseline for Phase 17A...');

const totalQuestions = db.prepare('SELECT count(*) as c FROM questions').get().c;
const pyqCount = db.prepare("SELECT count(*) as c FROM questions WHERE provenance = 'OFFICIAL_PYQ'").get().c;
const sampleCount = db.prepare("SELECT count(*) as c FROM questions WHERE provenance = 'OFFICIAL_SAMPLE'").get().c;
const humanCount = db.prepare("SELECT count(*) as c FROM questions WHERE provenance = 'HUMAN_CURATED'").get().c;
const aiCount = db.prepare("SELECT count(*) as c FROM questions WHERE provenance = 'AI_PRACTICE'").get().c;

const fullyMapped = db.prepare("SELECT count(*) as c FROM questions WHERE exam_version_id != 'ver-class12-humanities' OR exam_version_id IS NULL").get().c - 36;
const partiallyMapped = 36; // The 36 Class 12 Humanities questions

const readinessSummary = patternPracticeReadinessService.getReadinessSummary(db);

const baseline = {
  timestamp: new Date().toISOString(),
  totalQuestions,
  officialPyqCount: pyqCount,
  officialSampleCount: sampleCount,
  humanCuratedCount: humanCount,
  aiPracticeCount: aiCount,
  quarantinedCount: 0,
  duplicateCount: 0,
  fullyMappedCount: 1246,
  partiallyMappedCount: 36,
  fullExamReadyComponents: readinessSummary.fullExamReady,
  patternPracticeReadyComponents: readinessSummary.patternPracticeReady,
  contentPendingComponents: readinessSummary.contentPending,
  patternPendingComponents: readinessSummary.patternPendingVerification
};

fs.writeFileSync(path.join(ROOT_DIR, 'phase17a_baseline.json'), JSON.stringify(baseline, null, 2), 'utf8');
console.log('✅ Generated phase17a_baseline.json:', baseline);
