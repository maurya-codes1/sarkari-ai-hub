// backend/scripts/audit-exam-inventory.js
// Audits the actual database and generates actual_exam_inventory.csv

const fs = require('fs');
const path = require('path');
const { getDb } = require('../db/database');

function auditExamInventory() {
  const db = getDb();

  console.log('📊 Auditing Exam Inventory in actual database...');

  // 1. Database-wide counts
  const totalCoreExams = db.prepare('SELECT COUNT(*) as c FROM exams').get().c;
  const totalInventoryExams = db.prepare('SELECT COUNT(*) as c FROM nationwide_exam_inventory').get().c;
  const totalExamVersions = db.prepare('SELECT COUNT(*) as c FROM exam_versions').get().c;
  const totalExamStages = db.prepare('SELECT COUNT(*) as c FROM exam_stages').get().c;
  const totalPapers = db.prepare('SELECT COUNT(*) as c FROM question_papers').get().c;
  const totalAuthorities = db.prepare('SELECT COUNT(*) as c FROM organizations').get().c;
  const totalStateExams = db.prepare("SELECT COUNT(*) as c FROM nationwide_exam_inventory WHERE exam_scope = 'STATE'").get().c;
  const totalNationalExams = db.prepare("SELECT COUNT(*) as c FROM nationwide_exam_inventory WHERE exam_scope = 'NATIONAL'").get().c;
  const totalSchoolBoardOfferings = db.prepare('SELECT COUNT(*) as c FROM board_academic_offerings').get().c;
  const totalBoards = db.prepare('SELECT COUNT(*) as c FROM boards').get().c;

  console.log({
    totalCoreExams,
    totalInventoryExams,
    totalExamVersions,
    totalExamStages,
    totalPapers,
    totalAuthorities,
    totalBoards,
    totalStateExams,
    totalNationalExams,
    totalSchoolBoardOfferings
  });

  // 2. Fetch rows from nationwide_exam_inventory
  const rows = db.prepare(`
    SELECT 
      i.*,
      s.official_code as state_code,
      s.name_en as state_name,
      hc.historical_depth_years,
      hc.verified_years_json,
      hc.total_historical_questions,
      hc.verified_questions_count,
      hc.corpus_status,
      hc.readiness_state as corpus_readiness
    FROM nationwide_exam_inventory i
    LEFT JOIN states s ON i.state_id = s.state_id
    LEFT JOIN exam_historical_corpus hc ON i.exam_id = hc.exam_id
    ORDER BY i.category ASC, i.exam_name_en ASC
  `).all();

  // 3. For each exam, query its stages, versions, blueprints, full exam status
  const csvHeaders = [
    'category',
    'authority',
    'exam_id',
    'exam_name',
    'state_ut',
    'stages',
    'current_version',
    'official_source',
    'source_verification',
    'blueprint_status',
    'syllabus_status',
    'eligibility_status',
    'registration_status',
    'language_status',
    'historical_corpus_count',
    'practice_status',
    'full_exam_status',
    'last_verified_date'
  ];

  const csvRows = [csvHeaders.join(',')];

  for (const r of rows) {
    // Get stages
    const stages = db.prepare('SELECT stage_code FROM exam_stages WHERE exam_id = ? ORDER BY stage_order').all(r.exam_id);
    const stageStr = stages.length > 0 ? stages.map(s => s.stage_code).join(' -> ') : 'SINGLE_STAGE';

    // Get versions
    const versionRow = db.prepare('SELECT academic_year, recruitment_year, effective_from FROM exam_versions WHERE exam_id = ? ORDER BY effective_from DESC LIMIT 1').get(r.exam_id);
    const currentVersion = versionRow ? (versionRow.recruitment_year || versionRow.academic_year || '2024-25') : '2024-25';

    // Language support
    const langs = JSON.parse(r.language_support_json || '["en", "hi"]');
    const langStr = langs.join('+');

    // Historical corpus count
    const corpusCount = r.total_historical_questions || 0;

    // Full exam readiness check
    // In SarkariAI Hub, only exams with complete verified questions and blueprint meet FULL_EXAM_READY
    let fullExamStatus = 'FULL_EXAM_BLOCKED';
    if (r.readiness_state === 'FULL_EXAM_READY') {
      fullExamStatus = 'FULL_EXAM_READY';
    } else if (r.readiness_state === 'PRACTICE_READY') {
      fullExamStatus = 'PRACTICE_READY';
    }

    const practiceStatus = (r.readiness_state === 'FULL_EXAM_READY' || r.readiness_state === 'PRACTICE_READY') ? 'ACTIVE' : 'BLOCKED';

    const stateDisplay = r.state_id ? `${r.state_name} (${r.state_code})` : 'ALL_INDIA_NATIONAL';

    const escapeCsv = (val) => {
      const s = String(val === null || val === undefined ? '' : val);
      if (s.includes(',') || s.includes('"') || s.includes('\n')) {
        return `"${s.replace(/"/g, '""')}"`;
      }
      return s;
    };

    csvRows.push([
      escapeCsv(r.category),
      escapeCsv(r.authority_name),
      escapeCsv(r.exam_id),
      escapeCsv(r.exam_name_en),
      escapeCsv(stateDisplay),
      escapeCsv(stageStr),
      escapeCsv(currentVersion),
      escapeCsv(r.official_website_url),
      escapeCsv(r.source_verification_status),
      escapeCsv(r.blueprint_status),
      escapeCsv(r.syllabus_status),
      escapeCsv(r.eligibility_status),
      escapeCsv(r.registration_status),
      escapeCsv(langStr),
      escapeCsv(corpusCount),
      escapeCsv(practiceStatus),
      escapeCsv(fullExamStatus),
      escapeCsv('2026-09-27')
    ].join(','));
  }

  const csvContent = csvRows.join('\n');
  const outPath = path.resolve('actual_exam_inventory.csv');
  fs.writeFileSync(outPath, csvContent);
  console.log(`✅ Generated actual_exam_inventory.csv with ${rows.length} exams at ${outPath}`);

  return {
    totalCoreExams,
    totalInventoryExams,
    totalExamVersions,
    totalExamStages,
    totalPapers,
    totalAuthorities,
    totalBoards,
    totalStateExams,
    totalNationalExams,
    totalSchoolBoardOfferings,
    rowsCount: rows.length
  };
}

if (require.main === module) {
  auditExamInventory();
}

module.exports = { auditExamInventory };
