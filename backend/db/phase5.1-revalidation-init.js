// backend/db/phase5.1-revalidation-init.js
// Phase 5.1 Database Setup for Legacy Question Revalidation, Trust Status,
// Zero-Question Audit Logging, and Question Remapping Proposals.

const { getDb } = require('./database');

function initPhase51Revalidation(db = getDb()) {
  console.log('[Phase5.1Init] 🚀 Initializing Phase 5.1 Legacy Revalidation & Quality Architecture...');

  if (!db) {
    throw new Error('Database connection failed.');
  }

  // 1. Add columns to questions table if not already present
  const questionCols = db.prepare("PRAGMA table_info(questions)").all().map(c => c.name);

  if (!questionCols.includes('trust_status')) {
    db.exec(`ALTER TABLE questions ADD COLUMN trust_status VARCHAR(32) DEFAULT 'UNVERIFIED';`);
  }
  if (!questionCols.includes('full_exam_eligible')) {
    db.exec(`ALTER TABLE questions ADD COLUMN full_exam_eligible BOOLEAN DEFAULT 0;`);
  }
  if (!questionCols.includes('practice_eligible')) {
    db.exec(`ALTER TABLE questions ADD COLUMN practice_eligible BOOLEAN DEFAULT 1;`);
  }
  if (!questionCols.includes('validation_notes')) {
    db.exec(`ALTER TABLE questions ADD COLUMN validation_notes TEXT;`);
  }
  if (!questionCols.includes('passage_group_id')) {
    db.exec(`ALTER TABLE questions ADD COLUMN passage_group_id VARCHAR(64);`);
  }
  console.log('✅ Questions table columns updated with trust_status, full_exam_eligible, practice_eligible, validation_notes.');

  // 2. Create zero_question_audit_logs table
  db.exec(`
    CREATE TABLE IF NOT EXISTS zero_question_audit_logs (
      log_id VARCHAR(64) PRIMARY KEY,
      exam_id VARCHAR(64) NOT NULL,
      exam_version_id VARCHAR(64),
      paper_id VARCHAR(64),
      subject_id VARCHAR(64),
      section_id VARCHAR(64),
      requested_count INTEGER NOT NULL,
      eligible_count INTEGER NOT NULL DEFAULT 0,
      language_code VARCHAR(16) DEFAULT 'hi',
      blueprint_status VARCHAR(32),
      reason VARCHAR(64) NOT NULL, -- 'NO_VERIFIED_QUESTIONS', 'QUESTION_BANK_INSUFFICIENT', 'PATTERN_PENDING_VERIFICATION', 'BLUEPRINT_NOT_MAPPED', 'LANGUAGE_MISMATCH'
      user_mode VARCHAR(32) NOT NULL, -- 'FULL_EXAM_MOCK' or 'PRACTICE'
      fallback_action VARCHAR(64) NOT NULL, -- 'FULL_EXAM_UNAVAILABLE', 'OFFER_REDUCED_PRACTICE', 'NO_QUESTIONS_AVAILABLE'
      details_json JSON,
      logged_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_zero_q_exam ON zero_question_audit_logs(exam_id);
    CREATE INDEX IF NOT EXISTS idx_zero_q_reason ON zero_question_audit_logs(reason);
    CREATE INDEX IF NOT EXISTS idx_zero_q_logged_at ON zero_question_audit_logs(logged_at);
  `);
  console.log('✅ Created/verified table: zero_question_audit_logs');

  // 3. Create question_remapping_proposals table
  db.exec(`
    CREATE TABLE IF NOT EXISTS question_remapping_proposals (
      proposal_id VARCHAR(64) PRIMARY KEY,
      question_id VARCHAR(64) NOT NULL,
      current_mapping_json JSON NOT NULL,
      proposed_mapping_json JSON NOT NULL,
      reason TEXT NOT NULL,
      confidence_score NUMERIC(5,4) NOT NULL,
      status VARCHAR(32) DEFAULT 'PROPOSED', -- 'PROPOSED', 'APPLIED', 'REJECTED', 'NEEDS_REVIEW'
      reviewed_by VARCHAR(64),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_remap_qid ON question_remapping_proposals(question_id);
    CREATE INDEX IF NOT EXISTS idx_remap_status ON question_remapping_proposals(status);
  `);
  console.log('✅ Created/verified table: question_remapping_proposals');

  // 4. Create performance indexes
  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_questions_trust_status ON questions(trust_status);
    CREATE INDEX IF NOT EXISTS idx_questions_full_exam_elig ON questions(full_exam_eligible);
    CREATE INDEX IF NOT EXISTS idx_questions_practice_elig ON questions(practice_eligible);
    CREATE INDEX IF NOT EXISTS idx_questions_passage_group ON questions(passage_group_id);
  `);
  console.log('✅ Created performance indexes for question trust & eligibility.');

  console.log('[Phase5.1Init] 🎉 Phase 5.1 Architecture Initialization Complete!');
}

if (require.main === module) {
  initPhase51Revalidation();
}

module.exports = { initPhase51Revalidation };
