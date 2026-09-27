// backend/db/importers/exam-importer.js
// Non-destructively imports legacy exams from public/js/exams-data.js
// Normalizes Conducting Body -> organizations, Boards -> boards, Exams -> exams, Versions -> exam_versions, URLs -> official_sources.
// Fully audited and logged into migration_logs.

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { getDb } = require('../database');

function slugify(text) {
  return (text || 'unknown')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function importLegacyExams(db = getDb()) {
  console.log('[ExamImporter] 🔄 Loading legacy exams from public/js/exams-data.js...');

  const filePath = path.join(__dirname, '..', '..', '..', 'public', 'js', 'exams-data.js');
  if (!fs.existsSync(filePath)) {
    throw new Error(`Legacy exams-data.js not found at ${filePath}`);
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const sandbox = { window: {}, console: console };
  sandbox.global = sandbox;
  vm.createContext(sandbox);

  // Safely extract EXAMS_DATABASE without polluting environment
  vm.runInContext(fileContent + '\n;global.__EXAMS__ = typeof EXAMS_DATABASE !== "undefined" ? EXAMS_DATABASE : [];', sandbox);
  const legacyExams = sandbox.__EXAMS__ || [];

  console.log(`[ExamImporter] Found ${legacyExams.length} legacy exam entries.`);

  // Prepared Statements
  const insertOrg = db.prepare(`
    INSERT INTO organizations (
      organization_id, name, short_name, type, central_or_state, state_or_ut, official_website, active, verification_status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, 1, 'VERIFIED')
    ON CONFLICT(organization_id) DO UPDATE SET
      name = excluded.name,
      official_website = excluded.official_website
  `);

  const insertBoard = db.prepare(`
    INSERT INTO boards (
      board_id, organization_id, name, short_name, jurisdiction, board_type, official_website, official_result_url, active, verification_status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1, 'VERIFIED')
    ON CONFLICT(board_id) DO UPDATE SET
      official_website = excluded.official_website,
      official_result_url = excluded.official_result_url
  `);

  const insertExam = db.prepare(`
    INSERT INTO exams (
      exam_id, organization_id, board_id, name, short_name, category, level,
      official_website, result_url, admit_card_url, syllabus_url, notification_url,
      active, status, current_version_id, raw_data
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?, ?)
    ON CONFLICT(exam_id) DO UPDATE SET
      name = excluded.name,
      status = excluded.status,
      current_version_id = excluded.current_version_id,
      raw_data = excluded.raw_data
  `);

  const insertVersion = db.prepare(`
    INSERT INTO exam_versions (
      version_id, exam_id, academic_year, recruitment_year, version_status, source_verified, version_notes
    ) VALUES (?, ?, ?, ?, 'CURRENT', 0, ?)
    ON CONFLICT(version_id) DO UPDATE SET
      version_notes = excluded.version_notes
  `);

  const insertSource = db.prepare(`
    INSERT INTO official_sources (
      source_id, organization_id, document_title, document_type, source_url, applicable_year, verification_status, verification_notes
    ) VALUES (?, ?, ?, ?, ?, '2026', 'NEEDS_REVIEW', ?)
    ON CONFLICT(source_id) DO UPDATE SET
      source_url = excluded.source_url
  `);

  const logStmt = db.prepare(`
    INSERT OR REPLACE INTO migration_logs (
      log_id, source_file, source_record_id, destination_table, destination_id,
      migrated_at, migration_status, warning, transformation_summary
    ) VALUES (?, 'public/js/exams-data.js', ?, ?, ?, CURRENT_TIMESTAMP, ?, ?, ?)
  `);

  let migratedCount = 0;
  let skippedCount = 0;
  let sourcesCount = 0;

  const tx = db.transaction(() => {
    for (const exam of legacyExams) {
      if (!exam.id || !exam.name) {
        skippedCount++;
        continue;
      }

      // 1. Normalize Organization
      const conductingBody = exam.conductingBody || exam.name;
      const orgId = `org-${slugify(conductingBody).slice(0, 40)}`;
      const isCentral = (exam.state || '').includes('Central') || (exam.state || '').includes('All India');
      
      insertOrg.run(
        orgId,
        conductingBody,
        exam.shortName || conductingBody.slice(0, 30),
        exam.category === 'boards' ? 'Board' : 'RecruitmentCommission',
        isCentral ? 'Central' : 'State',
        exam.state || (isCentral ? 'All-India' : 'State'),
        exam.officialUrl || 'https://india.gov.in'
      );

      // 2. If Board, register in boards table
      const isBoard = exam.category === 'boards';
      const boardId = isBoard ? exam.id : null;
      if (isBoard) {
        const boardType = exam.id.includes('nios') ? 'OpenSchool' : (isCentral ? 'National' : 'State');
        insertBoard.run(
          exam.id,
          orgId,
          exam.name,
          exam.shortName || exam.name,
          isCentral ? 'National' : 'State',
          boardType,
          exam.officialUrl || '',
          exam.resultUrl || ''
        );
      }

      // 3. Exam & Version
      const versionId = `ver-${exam.id}-2026`;
      const rawData = JSON.stringify({
        importantDates: exam.importantDates || {},
        fees: exam.fees || {},
        eligibility: exam.eligibility || '',
        ageLimit: exam.ageLimit || '',
        vacancies: exam.vacancies || {},
        examPattern: exam.examPattern || {},
        photoSpecs: exam.photoSpecs || {},
        signSpecs: exam.signSpecs || {},
        physicalStandards: exam.physicalStandards || null
      });

      insertExam.run(
        exam.id,
        orgId,
        boardId,
        exam.name,
        exam.shortName || exam.name,
        exam.category || 'General',
        isCentral ? 'National' : 'State',
        exam.officialUrl || '',
        exam.resultUrl || '',
        exam.applyUrl || '',
        exam.pdfUrl || '',
        exam.applyUrl || '',
        exam.status || 'Active',
        versionId,
        rawData
      );

      insertVersion.run(
        versionId,
        exam.id,
        isBoard ? '2025-2026' : null,
        '2026',
        `Imported from legacy public/js/exams-data.js for ${exam.name}`
      );

      // 4. Sources Registration (Marked 'NEEDS_REVIEW' as per Section 14)
      if (exam.officialUrl) {
        const srcId = `src-${exam.id}-portal`;
        insertSource.run(
          srcId,
          orgId,
          `${exam.name} Official Portal`,
          'OfficialNotification',
          exam.officialUrl,
          'Official portal endpoint imported from exams-data.js. Requires official gazette checksum verification.'
        );
        sourcesCount++;
      }

      // 5. Audit Log
      logStmt.run(
        `mig-exam-${exam.id}`,
        exam.id,
        'exams',
        exam.id,
        'MIGRATED',
        null,
        `Migrated exam ${exam.name} (${exam.id}) with rawData metadata and version ${versionId}`
      );

      migratedCount++;
    }
  });

  tx();
  console.log(`[ExamImporter] ✅ Exam migration complete: ${migratedCount} migrated, ${sourcesCount} official sources logged, ${skippedCount} skipped.`);
  return { migratedCount, sourcesCount, skippedCount, totalSource: legacyExams.length };
}

module.exports = { importLegacyExams };
