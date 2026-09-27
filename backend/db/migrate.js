// backend/db/migrate.js
// Master Migration Orchestrator for npm run db:migrate:legacy
// Executes all legacy data importers inside transactions and reports detailed audit metrics.

const { getDb } = require('./database');
const { initDatabase } = require('./init');
const { seedLanguages } = require('./importers/language-seeder');
const { importLegacyExams } = require('./importers/exam-importer');
const { importLegacyQuestions } = require('./importers/question-importer');
const { importLegacyBlueprints } = require('./importers/blueprint-importer');

function runFullMigration() {
  console.log('========================================================');
  console.log('🚀 SARKARIAI HUB — LEGACY DATA MIGRATION PIPELINE');
  console.log('🔒 Mode: Non-Destructive Import to SQLite Data Layer');
  console.log('========================================================');

  // 1. Initialize schema if needed
  initDatabase();
  const db = getDb();

  const startTime = Date.now();

  try {
    // 2. Languages
    const langResults = seedLanguages(db);

    // 3. Exams & Organizations
    const examResults = importLegacyExams(db);

    // 4. Question Banks
    const questionResults = importLegacyQuestions(db);

    // 5. Blueprints
    const bpResults = importLegacyBlueprints(db);

    // 6. Audit integrity verification
    const fkCheck = db.pragma('foreign_key_check');
    const totalMigLogs = db.prepare('SELECT COUNT(*) as c FROM migration_logs').get().c;
    const reviewLogs = db.prepare("SELECT COUNT(*) as c FROM migration_logs WHERE migration_status = 'NEEDS_REVIEW'").get().c;

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);

    console.log('========================================================');
    console.log('📊 MIGRATION AUDIT SUMMARY (PHASE 3)');
    console.log('========================================================');
    console.log(`⏱️ Duration: ${duration}s`);
    console.log(`🌐 Languages Seeded: ${langResults.totalSeeded} (${langResults.activeUiCount} active UI)`);
    console.log(`📋 Exams Migrated: ${examResults.migratedCount} of ${examResults.totalSource} (${examResults.skippedCount} skipped)`);
    console.log(`🏛️ Official Sources Registered: ${examResults.sourcesCount}`);
    console.log(`❓ Questions Migrated: ${questionResults.totalImported}`);
    console.log(`📐 Blueprints Imported: ${bpResults.importedCount}`);
    console.log(`📜 Migration Audit Logs: ${totalMigLogs} total (${reviewLogs} flagged NEEDS_REVIEW)`);
    console.log(`🔒 Foreign Key Violations: ${fkCheck.length}`);
    console.log('========================================================');
    console.log('🎉 LEGACY DATA MIGRATION COMPLETED SUCCESSFULLY');
    console.log('========================================================');

    return {
      success: true,
      durationSec: duration,
      languages: langResults,
      exams: examResults,
      questions: questionResults,
      blueprints: bpResults,
      logsCount: totalMigLogs,
      needsReviewCount: reviewLogs,
      fkViolations: fkCheck.length
    };
  } catch (err) {
    console.error('❌ Migration pipeline failed:', err);
    process.exit(1);
  }
}

if (require.main === module) {
  runFullMigration();
}

module.exports = { runFullMigration };
