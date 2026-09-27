// backend/db/phase13-rollback.js
// Reversible migration rollback for Phase 13 schema extensions

const { getDb } = require('./database');

function rollbackPhase13Schema(db = getDb()) {
  console.log('⏪ Rolling back Phase 13 Database Schema Extensions...');

  db.exec(`
    DROP INDEX IF EXISTS idx_cand_profile_user;
    DROP TABLE IF EXISTS candidate_preparation_profiles;

    DROP INDEX IF EXISTS idx_cand_attempt_user_exam;
    DROP INDEX IF EXISTS idx_cand_attempt_user_q;
    DROP INDEX IF EXISTS idx_cand_attempt_topic;
    DROP INDEX IF EXISTS idx_cand_attempt_mode;
    DROP TABLE IF EXISTS candidate_question_attempts;

    DROP INDEX IF EXISTS idx_adapt_select_user;
    DROP TABLE IF EXISTS adaptive_selection_logs;

    DROP INDEX IF EXISTS idx_mock_perf_user;
    DROP TABLE IF EXISTS mock_performance_records;

    DROP INDEX IF EXISTS idx_questions_ver_sub;
    DROP INDEX IF EXISTS idx_questions_prov_full;
    DROP INDEX IF EXISTS idx_questions_diff_pub;
    DROP INDEX IF EXISTS idx_weak_topics_user_exam;
  `);

  console.log('✅ Phase 13 Schema Extensions Rolled Back.');
}

if (require.main === module) {
  rollbackPhase13Schema();
}

module.exports = { rollbackPhase13Schema };
