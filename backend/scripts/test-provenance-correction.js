const Database = require('better-sqlite3');
const path = require('path');
const db = new Database(path.resolve(__dirname, '../db/sarkari_core.db'));

console.log('=== TESTING PROVENANCE CLASSIFICATION CORRECTION ===');

db.transaction(() => {
  // 1. Update CBSE 2024 Sample Paper questions (39 questions)
  const cbseUpdate = db.prepare(`
    UPDATE questions 
    SET source_type = 'OFFICIAL_DOCUMENT',
        provenance = 'OFFICIAL_SAMPLE',
        question_tier = 'TIER_3_OFFICIAL_SAMPLE',
        full_exam_eligible = 0,
        practice_eligible = 1,
        quality_state = 'SAMPLE_VERIFIED',
        validation_notes = 'Official CBSE Sample Question Paper (SQP 2024) - Practice Eligible; excluded from authentic PYQ Full Exam simulation.'
    WHERE paper_id = 'paper-cbse-10-science-2024'
  `).run();
  console.log(`Updated CBSE 2024 Sample Questions: ${cbseUpdate.changes} rows`);

  // 2. Update 27 Historical PYQ questions to ensure source_type = OFFICIAL_PYQ
  const histUpdate = db.prepare(`
    UPDATE questions 
    SET source_type = 'OFFICIAL_PYQ',
        provenance = 'OFFICIAL_PYQ',
        question_tier = 'TIER_2_VERIFIED_PYQ'
    WHERE paper_id IN (
      'paper-upsc-cse-2023-gs1',
      'paper-upsc-cse-2022-gs1',
      'paper-upsc-cse-2021-gs1',
      'paper-ssc-cgl-2023-t1-s1',
      'paper-ssc-cgl-2022-t1-s1',
      'paper-rrb-ntpc-2022-cbt1-s1',
      'paper-ibps-po-2023-pre-s1',
      'paper-upsc-nda-2023-gat',
      'paper-nta-neet-2023-code-f1',
      'paper-upp-constable-2024-s1',
      'paper-cbse-10-sci-2023-set1'
    )
  `).run();
  console.log(`Updated Historical PYQ Questions: ${histUpdate.changes} rows`);

  // 3. Update exam_blueprints readiness status for cbse-board
  const gateService = require('../services/full-exam-gate-service');
  const cbseReadiness = gateService.evaluateExamReadiness('cbse-board', 'ver-cbse-board-2026', db);
  console.log('cbse-board Readiness:', cbseReadiness.status, cbseReadiness.primaryReason);

  const sscReadiness = gateService.evaluateExamReadiness('ssc-cgl', 'ver-ssc-cgl-2026', db);
  console.log('ssc-cgl Readiness:', sscReadiness.status, sscReadiness.primaryReason);
})();

// Re-query breakdown
console.log('\n--- VERIFIED QUESTIONS BREAKDOWN (POST-CORRECTION) ---');
const postBreakdown = db.prepare(`
  SELECT 
    source_type,
    provenance,
    question_tier,
    is_verified,
    full_exam_eligible,
    count(*) as count
  FROM questions
  WHERE is_verified = 1
  GROUP BY source_type, provenance, question_tier, is_verified, full_exam_eligible
`).all();
console.table(postBreakdown);

const totalPreserved = db.prepare('SELECT count(*) as c FROM questions').get().c;
const totalPyq = db.prepare("SELECT count(*) as c FROM questions WHERE provenance = 'OFFICIAL_PYQ'").get().c;
const totalSample = db.prepare("SELECT count(*) as c FROM questions WHERE provenance = 'OFFICIAL_SAMPLE'").get().c;
const totalLegacy = db.prepare("SELECT count(*) as c FROM questions WHERE provenance = 'HUMAN_CURATED'").get().c;
const totalFullEligible = db.prepare('SELECT count(*) as c FROM questions WHERE full_exam_eligible = 1').get().c;
const totalPracticeEligible = db.prepare('SELECT count(*) as c FROM questions WHERE practice_eligible = 1').get().c;

console.log('\n--- SUMMARY COUNTS ---');
console.log(`Total Preserved Questions: ${totalPreserved}`);
console.log(`  - Verified True Official PYQs: ${totalPyq}`);
console.log(`  - Verified Official Document/Sample: ${totalSample}`);
console.log(`  - Legacy Preserved Baseline: ${totalLegacy}`);
console.log(`Full Exam Eligible: ${totalFullEligible}`);
console.log(`Practice Eligible: ${totalPracticeEligible}`);

db.close();
