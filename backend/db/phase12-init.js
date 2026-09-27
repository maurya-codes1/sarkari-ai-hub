// backend/db/phase12-init.js
// Phase 12 Database Schema Extensions: Preparation Plans, Spaced Revision, Review Queues & Benchmarks

const { getDb } = require('./database');

function initPhase12Schema(db = getDb()) {
  console.log('📦 Initializing Phase 12 Database Schema Extensions...');

  db.exec(`
    -- 1. User Preparation & Study Plans
    CREATE TABLE IF NOT EXISTS user_preparation_plans (
      plan_id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      exam_id TEXT NOT NULL,
      target_exam_date TEXT,
      daily_study_hours NUMERIC(4,1) DEFAULT 3.0,
      total_days INTEGER,
      strategy_type TEXT DEFAULT 'BALANCED', -- 'BALANCED', 'INTENSIVE_REVISION', 'FOUNDATIONAL'
      completed_topics_count INTEGER DEFAULT 0,
      total_topics_count INTEGER DEFAULT 0,
      milestones_json TEXT, -- array of milestone objects with dates and syllabus chapters
      status TEXT DEFAULT 'ACTIVE', -- 'ACTIVE', 'PAUSED', 'COMPLETED', 'ARCHIVED'
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE INDEX IF NOT EXISTS idx_prep_plans_user ON user_preparation_plans(user_id, exam_id);

    -- 2. Spaced Revision Schedules
    CREATE TABLE IF NOT EXISTS user_spaced_revisions (
      revision_id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      question_id TEXT NOT NULL,
      exam_id TEXT NOT NULL,
      subject_id TEXT,
      topic_id TEXT,
      repetition_level INTEGER DEFAULT 1, -- 1 (1d), 2 (3d), 3 (7d), 4 (14d), 5 (30d)
      last_attempt_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      next_review_due DATETIME NOT NULL,
      mistake_count INTEGER DEFAULT 1,
      consecutive_correct INTEGER DEFAULT 0,
      revision_status TEXT DEFAULT 'PENDING', -- 'PENDING', 'DUE', 'REVIEWED', 'MASTERED'
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE INDEX IF NOT EXISTS idx_spaced_rev_due ON user_spaced_revisions(user_id, next_review_due, revision_status);

    -- 3. Content Review Queues (OCR, Provenance, Answer Key, Syllabus, Language)
    CREATE TABLE IF NOT EXISTS content_review_queues (
      queue_item_id TEXT PRIMARY KEY,
      queue_type TEXT NOT NULL, -- 'OCR_REVIEW', 'PROVENANCE_REVIEW', 'ANSWER_KEY_REVIEW', 'SYLLABUS_REVIEW', 'LANGUAGE_REVIEW', 'AI_REVIEW'
      entity_type TEXT NOT NULL, -- 'QUESTION', 'PAPER', 'ANSWER_KEY', 'SYLLABUS_TOPIC'
      entity_id TEXT NOT NULL,
      exam_id TEXT,
      priority TEXT DEFAULT 'MEDIUM', -- 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL'
      review_reason TEXT NOT NULL,
      detected_discrepancy TEXT,
      status TEXT DEFAULT 'QUEUED', -- 'QUEUED', 'IN_REVIEW', 'APPROVED', 'REJECTED'
      reviewer_id TEXT,
      resolution_notes TEXT,
      resolved_at DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE INDEX IF NOT EXISTS idx_review_queue_type ON content_review_queues(queue_type, status, priority);

    -- 4. Content Coverage Benchmarks & Aggregated Cache
    CREATE TABLE IF NOT EXISTS content_coverage_benchmarks (
      benchmark_id TEXT PRIMARY KEY,
      dimension_type TEXT NOT NULL, -- 'EXAM', 'STATE', 'BOARD', 'SUBJECT', 'NATIONAL'
      dimension_key TEXT NOT NULL,
      total_items INTEGER DEFAULT 0,
      pyq_items INTEGER DEFAULT 0,
      sample_items INTEGER DEFAULT 0,
      curated_items INTEGER DEFAULT 0,
      ai_items INTEGER DEFAULT 0,
      verified_syllabus_pct NUMERIC(5,2) DEFAULT 0.0,
      readiness_status TEXT,
      coverage_status TEXT, -- 'VERIFIED_COVERAGE', 'PARTIAL_COVERAGE', 'SOURCE_UNAVAILABLE', 'MONITORING'
      evaluated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE INDEX IF NOT EXISTS idx_coverage_dim ON content_coverage_benchmarks(dimension_type, dimension_key);

    -- 5. Search Performance Logs (p50, p95, p99 Latency Telemetry)
    CREATE TABLE IF NOT EXISTS search_performance_logs (
      log_id TEXT PRIMARY KEY,
      query_text TEXT,
      query_category TEXT, -- 'EXAM', 'QUESTION', 'TOPIC', 'MULTILINGUAL', 'BOARD'
      result_count INTEGER DEFAULT 0,
      latency_ms NUMERIC(6,2) NOT NULL,
      recorded_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE INDEX IF NOT EXISTS idx_search_perf_cat ON search_performance_logs(query_category, recorded_at);
  `);

  console.log('✅ Phase 12 Database Schema Extensions Initialized Successfully.');
}

if (require.main === module) {
  initPhase12Schema();
}

module.exports = { initPhase12Schema };
