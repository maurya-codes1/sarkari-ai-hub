// backend/db/phase17l-learning-loop-init.js
// Phase 17L: Database Schema Initialization for Cross-Surface Question Reuse & Telemetry
// Tracks legitimate question reuse across PDF, Revision, Learning Mock, Practice Mock, and Full Exam.

const { getDb } = require('./database');

function initPhase17LSchema(db = getDb()) {
  if (!db) {
    throw new Error('Database connection unavailable for Phase 17L initialization.');
  }

  db.exec(`
    -- Cross-Surface Question Usage Telemetry Table
    CREATE TABLE IF NOT EXISTS cross_surface_question_usage (
      usage_id TEXT PRIMARY KEY,
      question_id TEXT NOT NULL,
      asset_type TEXT NOT NULL, -- 'PDF', 'REVISION', 'LEARNING_MOCK', 'PRACTICE_MOCK', 'FULL_EXAM'
      asset_id TEXT NOT NULL,
      context_board_id TEXT,
      context_stage TEXT,
      context_stream TEXT,
      context_subject_id TEXT,
      context_language TEXT,
      metadata_json TEXT,
      used_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (question_id) REFERENCES questions(question_id)
    );

    CREATE INDEX IF NOT EXISTS idx_csqu_qid ON cross_surface_question_usage(question_id);
    CREATE INDEX IF NOT EXISTS idx_csqu_asset ON cross_surface_question_usage(asset_id);
    CREATE INDEX IF NOT EXISTS idx_csqu_type ON cross_surface_question_usage(asset_type);
    CREATE INDEX IF NOT EXISTS idx_csqu_context ON cross_surface_question_usage(context_board_id, context_subject_id);
  `);

  return { success: true };
}

if (require.main === module) {
  try {
    const res = initPhase17LSchema();
    console.log('✅ Phase 17L schema initialization complete:', res);
  } catch (err) {
    console.error('❌ Phase 17L schema initialization failed:', err);
    process.exit(1);
  }
}

module.exports = { initPhase17LSchema };
