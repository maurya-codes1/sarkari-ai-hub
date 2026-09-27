// backend/db/phase7-pyq-init.js
// Phase 7: Official PYQ Ingestion, Trusted Question Bank, Historical Corpus & Full-Exam Unlock
// Database Migration & Initialization Script

const { getDb } = require('./database');

function initPhase7PyqSchema(db = getDb()) {
  console.log('========================================================');
  console.log('🚀 SARKARIAI HUB — PHASE 7 PYQ & HISTORICAL CORPUS INIT');
  console.log('========================================================');

  if (!db) {
    console.error('❌ Failed to connect to SQLite database.');
    process.exit(1);
  }

  // 1. Create question_papers table (Question Paper as a First-Class Object)
  db.exec(`
    CREATE TABLE IF NOT EXISTS question_papers (
      paper_id TEXT PRIMARY KEY,
      exam_id TEXT NOT NULL REFERENCES exams(exam_id),
      exam_version_id TEXT NOT NULL REFERENCES exam_versions(version_id),
      academic_year TEXT NOT NULL,
      session TEXT DEFAULT 'Regular',
      stage TEXT DEFAULT 'Tier 1',
      paper TEXT DEFAULT 'Paper 1',
      paper_code TEXT,
      shift TEXT DEFAULT 'Shift 1',
      set_code TEXT DEFAULT 'Set A',
      language_code TEXT NOT NULL DEFAULT 'hi,en',
      paper_medium TEXT NOT NULL DEFAULT 'hi,en',
      source_id TEXT NOT NULL REFERENCES official_sources(source_id),
      source_document_id TEXT REFERENCES source_documents(document_id),
      source_url TEXT,
      document_hash TEXT,
      total_questions_expected INTEGER NOT NULL,
      total_questions_extracted INTEGER NOT NULL DEFAULT 0,
      total_pages INTEGER DEFAULT 1,
      completeness_status TEXT NOT NULL DEFAULT 'DISCOVERED',
      verification_status TEXT NOT NULL DEFAULT 'PENDING_VERIFICATION',
      answer_key_coverage TEXT DEFAULT 'NONE',
      notes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_qp_exam_ver ON question_papers(exam_id, exam_version_id);
    CREATE INDEX IF NOT EXISTS idx_qp_year_shift ON question_papers(academic_year, shift, set_code);
    CREATE INDEX IF NOT EXISTS idx_qp_status ON question_papers(completeness_status, verification_status);
    CREATE INDEX IF NOT EXISTS idx_qp_hash ON question_papers(document_hash);
  `);
  console.log('✅ Table created/verified: question_papers');

  // 2. Create paper_questions (Mapping table between question_papers and questions)
  db.exec(`
    CREATE TABLE IF NOT EXISTS paper_questions (
      paper_question_id TEXT PRIMARY KEY,
      paper_id TEXT NOT NULL REFERENCES question_papers(paper_id) ON DELETE CASCADE,
      question_id TEXT NOT NULL REFERENCES questions(question_id) ON DELETE CASCADE,
      source_question_number INTEGER NOT NULL,
      section_order INTEGER DEFAULT 1,
      section_name TEXT,
      page_reference TEXT,
      marks NUMERIC DEFAULT 1.0,
      negative_marks NUMERIC DEFAULT 0.0,
      status TEXT DEFAULT 'ACTIVE',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_pq_paper ON paper_questions(paper_id);
    CREATE INDEX IF NOT EXISTS idx_pq_question ON paper_questions(question_id);
    CREATE INDEX IF NOT EXISTS idx_pq_num ON paper_questions(paper_id, source_question_number);
  `);
  console.log('✅ Table created/verified: paper_questions');

  // 3. Create official_answer_keys (Versioned official answer keys and corrigenda)
  db.exec(`
    CREATE TABLE IF NOT EXISTS official_answer_keys (
      key_id TEXT PRIMARY KEY,
      paper_id TEXT NOT NULL REFERENCES question_papers(paper_id) ON DELETE CASCADE,
      key_version TEXT NOT NULL DEFAULT 'FINAL_KEY',
      source_id TEXT NOT NULL REFERENCES official_sources(source_id),
      document_hash TEXT,
      published_date TEXT,
      effective_date TEXT,
      verification_status TEXT DEFAULT 'VERIFIED',
      revisions_json TEXT,
      is_current_key INTEGER DEFAULT 1,
      superseded_by_key_id TEXT,
      notes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_oak_paper_version ON official_answer_keys(paper_id, key_version);
  `);
  console.log('✅ Table created/verified: official_answer_keys');

  // 4. Create ingestion_batches (Transaction-safe batch ingestion records)
  db.exec(`
    CREATE TABLE IF NOT EXISTS ingestion_batches (
      batch_id TEXT PRIMARY KEY,
      exam_id TEXT NOT NULL REFERENCES exams(exam_id),
      exam_version_id TEXT NOT NULL REFERENCES exam_versions(version_id),
      batch_title TEXT,
      paper_count INTEGER DEFAULT 0,
      question_count INTEGER DEFAULT 0,
      verified_count INTEGER DEFAULT 0,
      review_count INTEGER DEFAULT 0,
      duplicate_count INTEGER DEFAULT 0,
      dropped_count INTEGER DEFAULT 0,
      failure_count INTEGER DEFAULT 0,
      status TEXT DEFAULT 'IN_PROGRESS',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      completed_at DATETIME
    );

    CREATE INDEX IF NOT EXISTS idx_ib_exam_ver ON ingestion_batches(exam_id, exam_version_id);
  `);
  console.log('✅ Table created/verified: ingestion_batches');

  // 5. Alter questions table to add Phase 7 fields safely if absent
  const qColumns = db.prepare('PRAGMA table_info(questions)').all().map(c => c.name);
  const fieldsToAdd = [
    { name: 'paper_id', def: 'TEXT REFERENCES question_papers(paper_id)' },
    { name: 'source_question_number', def: 'INTEGER' },
    { name: 'historical_year', def: 'TEXT' },
    { name: 'shift', def: 'TEXT' },
    { name: 'set_code', def: 'TEXT' },
    { name: 'stage', def: 'TEXT' },
    { name: 'asset_status', def: "TEXT DEFAULT 'NONE'" },
    { name: 'asset_reference', def: 'TEXT' },
    { name: 'answer_state', def: "TEXT DEFAULT 'ACTIVE'" },
    { name: 'accepted_answers_json', def: 'TEXT' },
    { name: 'quality_state', def: "TEXT DEFAULT 'IMPORTED'" },
    { name: 'difficulty_official', def: "TEXT DEFAULT 'DIFFICULTY_NOT_OFFICIALLY_SPECIFIED'" }
  ];

  for (const field of fieldsToAdd) {
    if (!qColumns.includes(field.name)) {
      try {
        db.exec(`ALTER TABLE questions ADD COLUMN ${field.name} ${field.def}`);
        console.log(`✅ Altered table questions: Added column ${field.name}`);
      } catch (err) {
        console.warn(`Column ${field.name} already exists or error:`, err.message);
      }
    }
  }

  // 6. Verify Foreign Keys and Quick Check
  const fkCheck = db.pragma('foreign_key_check');
  if (fkCheck.length === 0) {
    console.log('✅ Foreign Key Integrity: PASSED (0 violations)');
  } else {
    console.error('❌ Foreign Key Integrity FAILED:', fkCheck);
    process.exit(1);
  }

  const integrityCheck = db.pragma('quick_check');
  console.log(`✅ SQLite Quick Integrity Check: ${integrityCheck[0]?.quick_check || 'ok'}`);
  console.log('🎉 Phase 7 Database Initialization Complete!\n');

  return { success: true };
}

if (require.main === module) {
  initPhase7PyqSchema();
}

module.exports = { initPhase7PyqSchema };
