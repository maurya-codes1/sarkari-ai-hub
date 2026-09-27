// backend/db/phase10-corpus-init.js
// Phase 10 Schema Extensions:
// 1. Additive columns on `questions` for syllabus/pattern/recurrence intelligence
// 2. `exam_historical_corpus` table for genuine multi-year historical depth
// 3. `exam_concept_intelligence` table for concept repetition vs question repetition
// 4. `practice_selection_weights` table for balanced practice sampling & rare question preservation
// 5. Performance composite indexes

const { getDb } = require('./database');

function initPhase10Schema(db = getDb()) {
  if (!db) throw new Error('Database connection required');

  console.log('[Phase 10 Init] 🚀 Applying Phase 10 Historical Corpus Schema Extensions...');

  // 1. Additive columns on questions
  const existingCols = db.prepare("PRAGMA table_info('questions')").all().map(c => c.name);

  const newCols = [
    { name: 'syllabus_status', type: "TEXT DEFAULT 'CURRENT'" },
    { name: 'pattern_status', type: "TEXT DEFAULT 'CURRENT'" },
    { name: 'recurrence_tier', type: "TEXT DEFAULT 'ONE_TIME'" },
    { name: 'occurrence_count', type: 'INTEGER DEFAULT 1' },
    { name: 'concept_id', type: 'TEXT' },
    { name: 'concept_recurrence_count', type: 'INTEGER DEFAULT 1' },
    { name: 'is_rare_relevant', type: 'INTEGER DEFAULT 0' },
    { name: 'current_eligibility', type: 'INTEGER DEFAULT 1' },
    { name: 'duplicate_status', type: "TEXT DEFAULT 'UNIQUE'" }
  ];

  for (const col of newCols) {
    if (!existingCols.includes(col.name)) {
      db.prepare(`ALTER TABLE questions ADD COLUMN ${col.name} ${col.type}`).run();
      console.log(`[Phase 10 Init] Added column 'questions.${col.name}'`);
    }
  }

  // 2. Exam Historical Corpus Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS exam_historical_corpus (
      corpus_id TEXT PRIMARY KEY,
      exam_id TEXT NOT NULL UNIQUE REFERENCES exams(exam_id),
      authority_name TEXT NOT NULL,
      historical_depth_years INTEGER DEFAULT 0,
      earliest_verified_year INTEGER,
      latest_verified_year INTEGER,
      verified_years_json TEXT DEFAULT '[]',
      partial_years_json TEXT DEFAULT '[]',
      missing_years_json TEXT DEFAULT '[]',
      total_papers_count INTEGER DEFAULT 0,
      total_historical_questions INTEGER DEFAULT 0,
      verified_questions_count INTEGER DEFAULT 0,
      current_eligible_count INTEGER DEFAULT 0,
      full_exam_eligible_count INTEGER DEFAULT 0,
      rare_relevant_count INTEGER DEFAULT 0,
      outdated_count INTEGER DEFAULT 0,
      corpus_status TEXT NOT NULL DEFAULT 'SOURCE_PENDING',
      source_completeness_status TEXT NOT NULL DEFAULT 'LIMITED',
      readiness_state TEXT NOT NULL DEFAULT 'FULL_EXAM_BLOCKED',
      last_synced_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS exam_concept_intelligence (
      concept_id TEXT PRIMARY KEY,
      exam_id TEXT NOT NULL REFERENCES exams(exam_id),
      subject_id TEXT NOT NULL REFERENCES subjects(subject_id),
      chapter_id TEXT REFERENCES syllabus_chapters(chapter_id),
      topic_id TEXT REFERENCES syllabus_topics(topic_id),
      concept_name TEXT NOT NULL,
      concept_frequency INTEGER DEFAULT 1,
      question_frequency_avg REAL DEFAULT 1.0,
      syllabus_status TEXT DEFAULT 'CURRENT',
      is_syllabus_important INTEGER DEFAULT 1,
      importance_weight REAL DEFAULT 1.0,
      first_seen_year INTEGER,
      last_seen_year INTEGER,
      gap_identified INTEGER DEFAULT 0,
      ai_practice_generated_count INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS practice_selection_weights (
      config_id TEXT PRIMARY KEY,
      exam_id TEXT NOT NULL UNIQUE REFERENCES exams(exam_id),
      recurrence_weight REAL DEFAULT 0.35,
      recency_weight REAL DEFAULT 0.20,
      difficulty_weight REAL DEFAULT 0.15,
      rare_question_quota_pct REAL DEFAULT 0.20,
      chapter_coverage_weight REAL DEFAULT 0.10,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- Phase 10 Composite Performance Indexes
    CREATE INDEX IF NOT EXISTS idx_questions_rec_tier ON questions(recurrence_tier, current_eligibility);
    CREATE INDEX IF NOT EXISTS idx_questions_syl_status ON questions(syllabus_status, pattern_status);
    CREATE INDEX IF NOT EXISTS idx_questions_rare_rel ON questions(is_rare_relevant, subject_id);
    CREATE INDEX IF NOT EXISTS idx_questions_concept ON questions(concept_id);
    CREATE INDEX IF NOT EXISTS idx_concept_exam_subj ON exam_concept_intelligence(exam_id, subject_id);
    CREATE INDEX IF NOT EXISTS idx_corpus_exam_id ON exam_historical_corpus(exam_id);
  `);

  // Populate default recurrence tiers and statuses on existing baseline questions
  db.prepare(`
    UPDATE questions 
    SET recurrence_tier = CASE 
          WHEN full_exam_eligible = 1 AND historical_year IS NOT NULL THEN 'MEDIUM'
          WHEN trust_status = 'PRACTICE_ONLY' THEN 'ONE_TIME'
          ELSE 'ONE_TIME'
        END,
        occurrence_count = 1,
        is_rare_relevant = CASE 
          WHEN trust_status = 'PRACTICE_ONLY' OR full_exam_eligible = 1 THEN 1 
          ELSE 0 
        END,
        syllabus_status = CASE 
          WHEN trust_status = 'NEEDS_REVIEW' THEN 'UNCERTAIN'
          ELSE 'CURRENT'
        END,
        pattern_status = CASE 
          WHEN full_exam_eligible = 1 THEN 'CURRENT'
          ELSE 'CHANGED'
        END,
        current_eligibility = CASE 
          WHEN trust_status = 'NEEDS_REVIEW' THEN 0
          ELSE 1
        END
    WHERE recurrence_tier IS NULL OR recurrence_tier = 'ONE_TIME'
  `).run();

  console.log('[Phase 10 Init] ✅ Phase 10 Schema initialized successfully!');
  return true;
}

if (require.main === module) {
  const db = getDb();
  initPhase10Schema(db);
}

module.exports = { initPhase10Schema };
