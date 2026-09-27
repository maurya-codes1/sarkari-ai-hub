// backend/scripts/generate-phase12-reports.js
// Generates all Phase 12 CSV and JSON audit deliverables

const fs = require('fs');
const path = require('path');
const { getDb } = require('../db/database');
const fullExamGateService = require('../services/full-exam-gate-service');
const coverageAnalyticsService = require('../services/coverage-analytics-service');
const { runSearchBenchmarks } = require('./run-search-benchmarks');

function generatePhase12Reports() {
  const db = getDb();
  const rootDir = path.resolve(__dirname, '../..');
  const reportsDir = path.resolve(rootDir, 'reports/phase12');

  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  console.log('Generating Phase 12 Audit Deliverables...');

  // 1. Nationwide Coverage Matrix CSV
  const examMatrix = coverageAnalyticsService.getExamCoverageMatrix(db);
  let examCsv = 'exam_id,exam_name_en,category,authority_name,state_id,coverage_tier,is_full_exam_ready,gate_status,verified_pyqs,official_samples,primary_reason\n';
  for (const ex of examMatrix.exams) {
    examCsv += `"${ex.examId}","${ex.examNameEn}","${ex.category}","${ex.authorityName || ''}","${ex.stateId}","${ex.coverageTier}",${ex.isFullExamReady},"${ex.gateStatus}",${ex.verifiedPyqCount},${ex.officialSampleCount},"${ex.primaryGateReason}"\n`;
  }
  fs.writeFileSync(path.resolve(reportsDir, 'phase12_nationwide_coverage_matrix.csv'), examCsv);
  fs.writeFileSync(path.resolve(rootDir, 'phase12_nationwide_coverage_matrix.csv'), examCsv);

  // 2. School Boards Audit CSV
  const boardMatrix = coverageAnalyticsService.getBoardCoverageMatrix(db);
  let boardCsv = 'board_id,name,code,state_id,board_type,coverage_status,verified_pyqs,official_samples,reason\n';
  for (const b of boardMatrix.boards) {
    boardCsv += `"${b.boardId}","${b.name}","${b.code || ''}","${b.stateId || 'National'}","${b.boardType}","${b.coverageStatus}",${b.verifiedPyqCount},${b.officialSampleCount},"${b.reason}"\n`;
  }
  fs.writeFileSync(path.resolve(reportsDir, 'phase12_school_boards_audit.csv'), boardCsv);
  fs.writeFileSync(path.resolve(rootDir, 'phase12_school_boards_audit.csv'), boardCsv);

  // 3. Subject Distribution Audit CSV
  const subjects = coverageAnalyticsService.getSubjectCoverageMatrix(db);
  let subjCsv = 'subject_id,subject_name,total_questions,verified_pyqs,official_samples,legacy_preserved,full_exam_eligible\n';
  for (const s of subjects) {
    subjCsv += `"${s.subjectId}","${s.name}",${s.totalQuestions},${s.verifiedPyqs},${s.officialSamples},${s.legacyPreserved},${s.fullExamEligible}\n`;
  }
  fs.writeFileSync(path.resolve(reportsDir, 'phase12_subject_distribution_audit.csv'), subjCsv);
  fs.writeFileSync(path.resolve(rootDir, 'phase12_subject_distribution_audit.csv'), subjCsv);

  // 4. PYQ Provenance Audit CSV
  const questions = db.prepare(`
    SELECT question_id, provenance, question_tier, trust_status, full_exam_eligible, paper_id, subject_id
    FROM questions
    ORDER BY provenance, question_id
  `).all();
  let pyqCsv = 'question_id,provenance,question_tier,trust_status,full_exam_eligible,paper_id,subject_id\n';
  for (const q of questions) {
    pyqCsv += `"${q.question_id}","${q.provenance}","${q.question_tier}","${q.trust_status}",${q.full_exam_eligible},"${q.paper_id || ''}","${q.subject_id}"\n`;
  }
  fs.writeFileSync(path.resolve(reportsDir, 'phase12_pyq_provenance_audit.csv'), pyqCsv);
  fs.writeFileSync(path.resolve(rootDir, 'phase12_pyq_provenance_audit.csv'), pyqCsv);

  // 5. Search Latency Benchmarks JSON
  const benchmarks = runSearchBenchmarks();
  fs.writeFileSync(path.resolve(reportsDir, 'phase12_search_benchmarks.json'), JSON.stringify(benchmarks, null, 2));
  fs.writeFileSync(path.resolve(rootDir, 'phase12_search_benchmarks.json'), JSON.stringify(benchmarks, null, 2));

  // 6. Comprehensive Audit JSON
  const frozenMeta = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../backups/phase12-final-frozen/METADATA.json'), 'utf8'));
  const auditJson = {
    metadata: frozenMeta,
    examCoverage: {
      totalExams: examMatrix.totalExams,
      readyCount: examMatrix.readyCount,
      partiallyCoveredCount: examMatrix.partiallyCoveredCount,
      notCoveredCount: examMatrix.notCoveredCount,
      totalVerifiedPyqs: examMatrix.totalVerifiedPyqs,
      totalOfficialSamples: examMatrix.totalOfficialSamples
    },
    boardCoverage: {
      totalBoards: boardMatrix.totalBoards,
      coveredBoardsCount: boardMatrix.coveredBoardsCount
    },
    benchmarksSummary: benchmarks
  };
  fs.writeFileSync(path.resolve(reportsDir, 'phase12_content_expansion_audit.json'), JSON.stringify(auditJson, null, 2));
  fs.writeFileSync(path.resolve(rootDir, 'phase12_content_expansion_audit.json'), JSON.stringify(auditJson, null, 2));

  console.log('✅ All Phase 12 audit CSVs and JSONs successfully generated.');
}

module.exports = { generatePhase12Reports };

if (require.main === module) {
  generatePhase12Reports();
}
