// backend/db/phase5-content-init.js
// Phase 5: Educational Content Intelligence Layer DDL & Initialization
// Creates tables for Historical Question Corpus, Fingerprints, Semantic Comparisons,
// Generation Jobs, Rate Limits, and expands Questions & Notes metadata.

const { getDb } = require('./database');
const crypto = require('crypto');

function initPhase5ContentData(db = getDb()) {
  console.log('[Phase5Init] 🚀 Initializing Phase 5 Content Intelligence Architecture...');

  if (!db) {
    throw new Error('Database connection failed.');
  }

  // 1. Create historical_questions table (10-Year Historical Question Corpus)
  db.exec(`
    CREATE TABLE IF NOT EXISTS historical_questions (
      historical_id VARCHAR(64) PRIMARY KEY,
      exam_id VARCHAR(64) NOT NULL,
      exam_version_id VARCHAR(64),
      board_id VARCHAR(64),
      stage_id VARCHAR(64),
      paper_id VARCHAR(64),
      subject_id VARCHAR(64) NOT NULL,
      section_name VARCHAR(128),
      question_number INTEGER,
      language_code VARCHAR(16) DEFAULT 'hi',
      original_text TEXT NOT NULL,
      options_json JSON,
      correct_answer_json JSON,
      source_document VARCHAR(255) NOT NULL,
      source_url VARCHAR(512),
      exam_year INTEGER NOT NULL,
      verification_status VARCHAR(32) DEFAULT 'VERIFIED', -- 'VERIFIED', 'NEEDS_REVIEW'
      fingerprint VARCHAR(128) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_hist_exam_year ON historical_questions(exam_id, exam_year);
    CREATE INDEX IF NOT EXISTS idx_hist_subject ON historical_questions(subject_id);
    CREATE INDEX IF NOT EXISTS idx_hist_fingerprint ON historical_questions(fingerprint);
  `);
  console.log('✅ Created/verified table: historical_questions');

  // 2. Create corpus_coverage table (truthful historical coverage state)
  db.exec(`
    CREATE TABLE IF NOT EXISTS corpus_coverage (
      coverage_id VARCHAR(64) PRIMARY KEY,
      exam_id VARCHAR(64) NOT NULL UNIQUE,
      years_available_count INTEGER NOT NULL DEFAULT 0,
      earliest_year INTEGER,
      latest_year INTEGER,
      coverage_status VARCHAR(32) NOT NULL DEFAULT 'INSUFFICIENT_HISTORY', -- 'FULL_10_YEAR', 'PARTIAL_CORPUS', 'INSUFFICIENT_HISTORY'
      verified_questions_count INTEGER NOT NULL DEFAULT 0,
      coverage_notes TEXT,
      last_audited_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_corpus_exam ON corpus_coverage(exam_id);
  `);
  console.log('✅ Created/verified table: corpus_coverage');

  // 3. Create question_fingerprints table (stable exact duplicate detection)
  db.exec(`
    CREATE TABLE IF NOT EXISTS question_fingerprints (
      fingerprint_id VARCHAR(64) PRIMARY KEY,
      question_id VARCHAR(64) NOT NULL,
      entity_type VARCHAR(32) NOT NULL, -- 'QUESTION' or 'HISTORICAL_QUESTION'
      fingerprint VARCHAR(128) NOT NULL UNIQUE,
      normalized_stem TEXT NOT NULL,
      options_hash VARCHAR(128),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_q_fingerprint ON question_fingerprints(fingerprint);
    CREATE INDEX IF NOT EXISTS idx_q_fp_question_id ON question_fingerprints(question_id);
  `);
  console.log('✅ Created/verified table: question_fingerprints');

  // 4. Create semantic_comparisons table (similarity tracking & audit trail)
  db.exec(`
    CREATE TABLE IF NOT EXISTS semantic_comparisons (
      comparison_id VARCHAR(64) PRIMARY KEY,
      source_question_id VARCHAR(64) NOT NULL,
      compared_question_id VARCHAR(64) NOT NULL,
      compared_corpus_type VARCHAR(32) NOT NULL, -- 'INTERNAL_BANK' or 'HISTORICAL_CORPUS'
      similarity_score NUMERIC(5,4) NOT NULL,
      detection_method VARCHAR(64) NOT NULL, -- 'TFIDF_NGRAM_COSINE', 'JACCARD_TOKEN', 'HYBRID_VECTOR'
      decision VARCHAR(32) NOT NULL, -- 'UNIQUE', 'POSSIBLE_DUPLICATE', 'DUPLICATE', 'NEEDS_REVIEW'
      decision_reason TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_sem_source ON semantic_comparisons(source_question_id);
    CREATE INDEX IF NOT EXISTS idx_sem_decision ON semantic_comparisons(decision);
  `);
  console.log('✅ Created/verified table: semantic_comparisons');

  // 5. Create generation_jobs table (asynchronous AI question generation queue)
  db.exec(`
    CREATE TABLE IF NOT EXISTS generation_jobs (
      job_id VARCHAR(64) PRIMARY KEY,
      exam_id VARCHAR(64) NOT NULL,
      exam_version_id VARCHAR(64),
      subject_id VARCHAR(64) NOT NULL,
      chapter_id VARCHAR(64),
      topic_id VARCHAR(64),
      blueprint_section_id VARCHAR(64),
      question_type_id VARCHAR(64) NOT NULL,
      difficulty VARCHAR(16) NOT NULL, -- 'EASY', 'MEDIUM', 'HARD'
      language_code VARCHAR(16) NOT NULL DEFAULT 'hi',
      status VARCHAR(32) NOT NULL DEFAULT 'QUEUED', -- 'QUEUED', 'GENERATING', 'VALIDATING', 'DUPLICATE_CHECK', 'NEEDS_REVIEW', 'APPROVED', 'PUBLISHED', 'REJECTED', 'FAILED'
      retry_count INTEGER DEFAULT 0,
      max_retries INTEGER DEFAULT 3,
      error_message TEXT,
      candidate_question_json JSON,
      validation_result_json JSON,
      published_question_id VARCHAR(64),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_gen_status ON generation_jobs(status);
    CREATE INDEX IF NOT EXISTS idx_gen_exam ON generation_jobs(exam_id, subject_id);
  `);
  console.log('✅ Created/verified table: generation_jobs');

  // 6. Create generation_rate_limits table (daily limits & cost control)
  db.exec(`
    CREATE TABLE IF NOT EXISTS generation_rate_limits (
      rate_limit_id VARCHAR(64) PRIMARY KEY,
      scope_type VARCHAR(32) NOT NULL, -- 'GLOBAL_DAILY', 'EXAM_DAILY', 'SUBJECT_DAILY'
      scope_key VARCHAR(64) NOT NULL,
      date_key VARCHAR(10) NOT NULL, -- 'YYYY-MM-DD'
      count INTEGER NOT NULL DEFAULT 0,
      max_allowed INTEGER NOT NULL,
      UNIQUE(scope_type, scope_key, date_key)
    );

    CREATE INDEX IF NOT EXISTS idx_rate_limit_key ON generation_rate_limits(scope_key, date_key);
  `);
  console.log('✅ Created/verified table: generation_rate_limits');

  // 7. Add columns to questions table if not already present
  const questionCols = db.prepare("PRAGMA table_info(questions)").all().map(c => c.name);
  if (!questionCols.includes('fingerprint')) {
    db.exec(`ALTER TABLE questions ADD COLUMN fingerprint VARCHAR(128);`);
  }
  if (!questionCols.includes('provenance')) {
    db.exec(`ALTER TABLE questions ADD COLUMN provenance VARCHAR(64) DEFAULT 'HUMAN_CURATED';`);
  }
  if (!questionCols.includes('difficulty_type')) {
    db.exec(`ALTER TABLE questions ADD COLUMN difficulty_type VARCHAR(32) DEFAULT 'OFFICIAL_DIFFICULTY';`);
  }
  if (!questionCols.includes('relevance_priority')) {
    db.exec(`ALTER TABLE questions ADD COLUMN relevance_priority VARCHAR(32) DEFAULT 'MEDIUM_PRIORITY';`);
  }
  if (!questionCols.includes('is_published')) {
    db.exec(`ALTER TABLE questions ADD COLUMN is_published BOOLEAN DEFAULT 1;`);
  }
  console.log('✅ Questions table columns updated/verified.');

  // 8. Add columns to notes table if not already present
  const noteCols = db.prepare("PRAGMA table_info(notes)").all().map(c => c.name);
  if (!noteCols.includes('content_depth')) {
    db.exec(`ALTER TABLE notes ADD COLUMN content_depth VARCHAR(32) DEFAULT 'MEDIUM';`);
  }
  if (!noteCols.includes('provenance')) {
    db.exec(`ALTER TABLE notes ADD COLUMN provenance VARCHAR(64) DEFAULT 'HUMAN_CURATED';`);
  }
  if (!noteCols.includes('priority_tier')) {
    db.exec(`ALTER TABLE notes ADD COLUMN priority_tier VARCHAR(32) DEFAULT 'MEDIUM_PRIORITY';`);
  }
  console.log('✅ Notes table columns updated/verified.');

  // 9. Performance Indexes
  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_questions_fingerprint ON questions(fingerprint);
    CREATE INDEX IF NOT EXISTS idx_questions_provenance ON questions(provenance);
    CREATE INDEX IF NOT EXISTS idx_questions_difficulty ON questions(difficulty);
    CREATE INDEX IF NOT EXISTS idx_questions_relevance ON questions(relevance_priority);
    CREATE INDEX IF NOT EXISTS idx_notes_subject_chapter ON notes(subject_id, chapter_id);
    CREATE INDEX IF NOT EXISTS idx_notes_type ON notes(note_type);
    CREATE INDEX IF NOT EXISTS idx_notes_provenance ON notes(provenance);
    CREATE INDEX IF NOT EXISTS idx_notes_depth ON notes(content_depth);
  `);
  console.log('✅ Created performance indexes for content intelligence.');

  console.log('[Phase5Init] 🎉 Phase 5 Content Intelligence Architecture Setup Complete!');
}

if (require.main === module) {
  initPhase5ContentData();
}

module.exports = { initPhase5ContentData };
