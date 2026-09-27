// backend/db/verify.js
// Verification runner for npm run db:verify
// Validates foreign keys, schema integrity, duplicate detection, and reconciles legacy vs database counts.

const { getDb, DB_PATH } = require('./database');
const fs = require('fs');
const path = require('path');

function verifyDatabase() {
  console.log('========================================================');
  console.log('🔍 SARKARIAI HUB — DATABASE INTEGRITY VERIFICATION');
  console.log(`📁 Database Path: ${DB_PATH}`);
  console.log('========================================================');

  const db = getDb();
  if (!db) {
    console.error('❌ Database connection failed.');
    process.exit(1);
  }

  let hasErrors = false;

  // 1. Foreign Key Verification
  const fkViolations = db.pragma('foreign_key_check');
  if (fkViolations.length === 0) {
    console.log('✅ 1. Foreign Key Integrity: PASSED (0 violations)');
  } else {
    console.error(`❌ 1. Foreign Key Integrity: FAILED (${fkViolations.length} violations found):`, fkViolations);
    hasErrors = true;
  }

  // 2. Storage Quick Check
  const quickCheck = db.pragma('quick_check');
  const qcStatus = quickCheck[0]?.quick_check || 'unknown';
  if (qcStatus === 'ok') {
    console.log('✅ 2. SQLite Low-Level File Integrity: PASSED (ok)');
  } else {
    console.error('❌ 2. SQLite Low-Level File Integrity: FAILED:', quickCheck);
    hasErrors = true;
  }

  // 3. Count Entities in Database
  const examCount = db.prepare('SELECT COUNT(*) as c FROM exams').get().c;
  const boardCount = db.prepare('SELECT COUNT(*) as c FROM boards').get().c;
  const orgCount = db.prepare('SELECT COUNT(*) as c FROM organizations').get().c;
  const questionCount = db.prepare('SELECT COUNT(*) as c FROM questions').get().c;
  const questionVerCount = db.prepare('SELECT COUNT(*) as c FROM question_versions').get().c;
  const bpCount = db.prepare('SELECT COUNT(*) as c FROM exam_blueprints').get().c;
  const sectionCount = db.prepare('SELECT COUNT(*) as c FROM blueprint_sections').get().c;
  const langCount = db.prepare('SELECT COUNT(*) as c FROM languages').get().c;
  const activeUiLangs = db.prepare('SELECT COUNT(*) as c FROM languages WHERE is_ui_language = 1').get().c;
  const sourceCount = db.prepare('SELECT COUNT(*) as c FROM official_sources').get().c;
  const logCount = db.prepare('SELECT COUNT(*) as c FROM migration_logs').get().c;

  console.log('\n📊 DATABASE RECORD INVENTORY:');
  console.log(` - Organizations: ${orgCount}`);
  console.log(` - Boards: ${boardCount}`);
  console.log(` - Exams: ${examCount}`);
  console.log(` - Blueprints: ${bpCount} (${sectionCount} sections)`);
  console.log(` - Questions: ${questionCount} (${questionVerCount} version entries)`);
  console.log(` - Languages: ${langCount} total (${activeUiLangs} active UI)`);
  console.log(` - Official Sources: ${sourceCount}`);
  console.log(` - Migration Audit Logs: ${logCount}`);

  // 4. Duplicate Detection
  const dupExams = db.prepare('SELECT exam_id, COUNT(*) as c FROM exams GROUP BY exam_id HAVING c > 1').all();
  const dupOrgs = db.prepare('SELECT organization_id, COUNT(*) as c FROM organizations GROUP BY organization_id HAVING c > 1').all();
  const dupLangs = db.prepare('SELECT code, COUNT(*) as c FROM languages GROUP BY code HAVING c > 1').all();
  const dupSubjs = db.prepare('SELECT subject_id, COUNT(*) as c FROM subjects GROUP BY subject_id HAVING c > 1').all();

  if (dupExams.length === 0 && dupOrgs.length === 0 && dupLangs.length === 0 && dupSubjs.length === 0) {
    console.log('✅ 3. Duplicate Detection: PASSED (0 duplicates across exams, orgs, languages, subjects)');
  } else {
    console.error('❌ 3. Duplicate Detection: FAILED - duplicates found:', { dupExams, dupOrgs, dupLangs, dupSubjs });
    hasErrors = true;
  }

  // 5. Orphan Record Checks
  const orphanVersions = db.prepare('SELECT v.version_id FROM exam_versions v LEFT JOIN exams e ON v.exam_id = e.exam_id WHERE e.exam_id IS NULL').all();
  const orphanSections = db.prepare('SELECT s.section_id FROM blueprint_sections s LEFT JOIN exam_blueprints b ON s.blueprint_id = b.blueprint_id WHERE b.blueprint_id IS NULL').all();
  const orphanQuestions = db.prepare('SELECT q.question_id FROM questions q LEFT JOIN subjects s ON q.subject_id = s.subject_id WHERE s.subject_id IS NULL').all();

  if (orphanVersions.length === 0 && orphanSections.length === 0 && orphanQuestions.length === 0) {
    console.log('✅ 4. Orphan Record Integrity: PASSED (0 orphaned versions, sections, or questions)');
  } else {
    console.error('❌ 4. Orphan Record Integrity: FAILED:', { orphanVersions, orphanSections, orphanQuestions });
    hasErrors = true;
  }

  // 6. Reconciliation: Legacy Source Count vs Database Count
  console.log('\n⚖️ RECONCILIATION AUDIT:');
  const expectedExams = 52;
  const legacyQuestions = db.prepare('SELECT COUNT(*) as c FROM questions WHERE paper_id IS NULL').get().c;
  const pyqQuestions = db.prepare('SELECT COUNT(*) as c FROM questions WHERE paper_id IS NOT NULL').get().c;
  const expectedLegacyQuestions = 872; // 510 high yield + 217 class 12 + 145 competitive
  const expectedUiLangs = 14;

  console.log(` - Exams: Source (${expectedExams}) vs DB (${examCount}) -> ${expectedExams === examCount ? 'MATCH ✅' : 'MISMATCH ❌'}`);
  console.log(` - Legacy Questions Baseline: Expected (${expectedLegacyQuestions}) vs DB (${legacyQuestions}) -> ${expectedLegacyQuestions === legacyQuestions ? 'MATCH ✅' : 'MISMATCH ❌'}`);
  console.log(` - Phase 7 Ingested PYQ Questions: ${pyqQuestions} verified official questions`);
  console.log(` - Total Questions: ${questionCount} (${legacyQuestions} legacy baseline + ${pyqQuestions} Phase 7 PYQ)`);
  console.log(` - Active UI Languages: Expected (${expectedUiLangs}) vs DB (${activeUiLangs}) -> ${expectedUiLangs === activeUiLangs ? 'MATCH ✅' : 'MISMATCH ❌'}`);

  if (expectedExams !== examCount || legacyQuestions !== expectedLegacyQuestions || expectedUiLangs !== activeUiLangs) {
    hasErrors = true;
  }

  console.log('========================================================');
  if (!hasErrors) {
    console.log('🎉 ALL INTEGRITY CHECKS PASSED PERFECTLY!');
  } else {
    console.error('⚠️ SOME INTEGRITY CHECKS FAILED. PLEASE REVIEW LOGS.');
  }
  console.log('========================================================');

  return !hasErrors;
}

if (require.main === module) {
  const ok = verifyDatabase();
  process.exit(ok ? 0 : 1);
}

module.exports = { verifyDatabase };
