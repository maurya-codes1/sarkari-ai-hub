// backend/db/phase13-init.js
// Phase 13 Database Schema Extensions: Candidate Preparation Profiles, Adaptive Selection Logs,
// Candidate Attempts, Mock Performance Intelligence, and Performance Composite Indexes.

const { getDb } = require('./database');

function initPhase13Schema(db = getDb()) {
  console.log('📦 Initializing Phase 13 Database Schema Extensions...');

  db.exec(`
    -- 1. Candidate Preparation Profiles (Privacy-by-design candidate state)
    CREATE TABLE IF NOT EXISTS candidate_preparation_profiles (
      profile_id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      exam_id TEXT NOT NULL,
      exam_version_id TEXT,
      target_date TEXT,
      study_streak_days INTEGER DEFAULT 0,
      total_attempted INTEGER DEFAULT 0,
      total_correct INTEGER DEFAULT 0,
      total_incorrect INTEGER DEFAULT 0,
      total_skipped INTEGER DEFAULT 0,
      total_time_seconds INTEGER DEFAULT 0,
      accuracy_rate NUMERIC(5,2) DEFAULT 0.0,
      overall_preparation_pct NUMERIC(5,2) DEFAULT 0.0,
      weak_concepts_json TEXT DEFAULT '[]',
      strong_concepts_json TEXT DEFAULT '[]',
      revision_due_items_count INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(user_id, exam_id)
    );
    CREATE INDEX IF NOT EXISTS idx_cand_profile_user ON candidate_preparation_profiles(user_id, exam_id);

    -- 2. Candidate Question Attempts (Auditable log for adaptive learning & weakness detection)
    CREATE TABLE IF NOT EXISTS candidate_question_attempts (
      attempt_id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      question_id TEXT NOT NULL,
      exam_id TEXT NOT NULL,
      subject_id TEXT,
      chapter_id TEXT,
      topic_id TEXT,
      practice_mode TEXT NOT NULL, -- 'WEAK_TOPIC_DRILL', 'MIXED_ADAPTIVE', 'PYQ_REVISION', 'RARE_RELEVANT', 'ERROR_REVISION', 'SPEED_PRACTICE', 'DIFFICULTY_PROGRESSION', 'BLUEPRINT_PRACTICE'
      selected_option TEXT,
      is_correct INTEGER NOT NULL, -- 1 = correct, 0 = incorrect
      is_skipped INTEGER DEFAULT 0, -- 1 = skipped
      time_spent_seconds INTEGER DEFAULT 0,
      confidence_level TEXT DEFAULT 'MEDIUM', -- 'LOW', 'MEDIUM', 'HIGH'
      attempted_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE INDEX IF NOT EXISTS idx_cand_attempt_user_exam ON candidate_question_attempts(user_id, exam_id, attempted_at);
    CREATE INDEX IF NOT EXISTS idx_cand_attempt_user_q ON candidate_question_attempts(user_id, question_id);
    CREATE INDEX IF NOT EXISTS idx_cand_attempt_topic ON candidate_question_attempts(user_id, topic_id);
    CREATE INDEX IF NOT EXISTS idx_cand_attempt_mode ON candidate_question_attempts(user_id, practice_mode);

    -- 3. Adaptive Selection Logs (Explainable selection audit trail)
    CREATE TABLE IF NOT EXISTS adaptive_selection_logs (
      selection_id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      exam_id TEXT NOT NULL,
      practice_mode TEXT NOT NULL,
      selected_question_ids_json TEXT NOT NULL,
      selection_criteria_json TEXT NOT NULL, -- explainability metadata: rationale, difficulty distribution, source types, duplicate checks
      question_count INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE INDEX IF NOT EXISTS idx_adapt_select_user ON adaptive_selection_logs(user_id, practice_mode, created_at);

    -- 4. Mock Performance Records (Post-mock diagnostics, negative marking analysis, recommendations)
    CREATE TABLE IF NOT EXISTS mock_performance_records (
      mock_record_id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      exam_id TEXT NOT NULL,
      paper_id TEXT,
      session_id TEXT,
      total_score NUMERIC(6,2) NOT NULL,
      max_possible_score NUMERIC(6,2) NOT NULL,
      accuracy_pct NUMERIC(5,2) NOT NULL,
      attempted_count INTEGER NOT NULL,
      skipped_count INTEGER NOT NULL,
      incorrect_count INTEGER NOT NULL,
      section_performance_json TEXT NOT NULL,
      negative_marking_deduction NUMERIC(6,2) DEFAULT 0.0,
      time_utilization_seconds INTEGER DEFAULT 0,
      recommendations_json TEXT NOT NULL,
      completed_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE INDEX IF NOT EXISTS idx_mock_perf_user ON mock_performance_records(user_id, exam_id, completed_at);

    -- 5. Production Optimization Composite Indexes (< 15ms latency SLA)
    CREATE INDEX IF NOT EXISTS idx_questions_ver_sub ON questions(exam_version_id, subject_id);
    CREATE INDEX IF NOT EXISTS idx_questions_prov_full ON questions(provenance, full_exam_eligible);
    CREATE INDEX IF NOT EXISTS idx_questions_diff_pub ON questions(difficulty, is_published);
    CREATE INDEX IF NOT EXISTS idx_weak_topics_user_exam ON user_weak_topics(user_id, exam_id, weakness_severity);
  `);

  console.log('✅ Phase 13 Database Schema Extensions Initialized Successfully.');
}

if (require.main === module) {
  initPhase13Schema();
}

module.exports = { initPhase13Schema };
