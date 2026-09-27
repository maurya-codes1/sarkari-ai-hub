// backend/db/phase9-expansion-init.js
// Phase 9: Nationwide Exam Content Expansion, Scalable Ingestion & AI Practice Engine
// Database Schema Initialization & Index Optimization Script

const { getDb } = require('./database');

function initPhase9ExpansionSchema(db = getDb()) {
  console.log('========================================================');
  console.log('🚀 SARKARIAI HUB — PHASE 9 NATIONWIDE EXPANSION INIT');
  console.log('========================================================');

  if (!db) {
    console.error('❌ Failed to connect to SQLite database.');
    process.exit(1);
  }

  // 1. Create nationwide_exam_registry table (Comprehensive nationwide exam discovery & authority tracking)
  db.exec(`
    CREATE TABLE IF NOT EXISTS nationwide_exam_registry (
      registry_id TEXT PRIMARY KEY,
      exam_id TEXT NOT NULL REFERENCES exams(exam_id),
      category TEXT NOT NULL,
      sub_category TEXT,
      state_code TEXT NOT NULL DEFAULT 'ALL_INDIA',
      official_authority TEXT NOT NULL,
      official_portal_url TEXT NOT NULL,
      official_acronym TEXT,
      official_gazette_ref TEXT,
      discovery_status TEXT NOT NULL DEFAULT 'DISCOVERED',
      coverage_status TEXT NOT NULL DEFAULT 'INSUFFICIENT_CONTENT',
      historical_years_covered TEXT DEFAULT '[]',
      is_active INTEGER DEFAULT 1,
      source_verification_status TEXT DEFAULT 'VERIFIED',
      pattern_verification_status TEXT DEFAULT 'VERIFIED',
      metadata_json TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_reg_category ON nationwide_exam_registry(category);
    CREATE INDEX IF NOT EXISTS idx_reg_state ON nationwide_exam_registry(state_code);
    CREATE INDEX IF NOT EXISTS idx_reg_exam ON nationwide_exam_registry(exam_id);
    CREATE INDEX IF NOT EXISTS idx_reg_coverage ON nationwide_exam_registry(coverage_status);
  `);
  console.log('✅ Table created/verified: nationwide_exam_registry');

  // 2. Create source_document_versions table (Source versioning, immutable change tracking, hashing)
  db.exec(`
    CREATE TABLE IF NOT EXISTS source_document_versions (
      version_id TEXT PRIMARY KEY,
      document_id TEXT NOT NULL,
      version_number TEXT NOT NULL,
      document_type TEXT NOT NULL,
      source_url TEXT NOT NULL,
      retrieval_timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      published_date TEXT,
      effective_date TEXT,
      document_hash TEXT NOT NULL,
      file_size_bytes INTEGER DEFAULT 0,
      mime_type TEXT DEFAULT 'application/pdf',
      extracted_summary_json TEXT,
      change_reason TEXT,
      verification_status TEXT NOT NULL DEFAULT 'VERIFIED',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_doc_ver_doc ON source_document_versions(document_id);
    CREATE INDEX IF NOT EXISTS idx_doc_ver_hash ON source_document_versions(document_hash);
  `);
  console.log('✅ Table created/verified: source_document_versions');

  // 3. Create resumable_ingestion_jobs table (Resumable batch processing, checkpointing, audit trail)
  db.exec(`
    CREATE TABLE IF NOT EXISTS resumable_ingestion_jobs (
      job_id TEXT PRIMARY KEY,
      job_name TEXT NOT NULL,
      exam_id TEXT NOT NULL REFERENCES exams(exam_id),
      exam_version_id TEXT REFERENCES exam_versions(version_id),
      source_id TEXT,
      source_document_id TEXT,
      academic_year TEXT,
      job_type TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'QUEUED',
      records_seen INTEGER DEFAULT 0,
      records_extracted INTEGER DEFAULT 0,
      records_verified INTEGER DEFAULT 0,
      records_inserted INTEGER DEFAULT 0,
      records_skipped INTEGER DEFAULT 0,
      duplicates_detected INTEGER DEFAULT 0,
      rejected_count INTEGER DEFAULT 0,
      last_checkpoint INTEGER DEFAULT 0,
      total_expected INTEGER DEFAULT 0,
      checkpoint_payload_json TEXT,
      rate_limit_delay_ms INTEGER DEFAULT 100,
      error_log TEXT,
      started_at DATETIME,
      completed_at DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_res_job_status ON resumable_ingestion_jobs(status);
    CREATE INDEX IF NOT EXISTS idx_res_job_exam ON resumable_ingestion_jobs(exam_id);
  `);
  console.log('✅ Table created/verified: resumable_ingestion_jobs');

  // 4. Create ai_generation_queue table (Controlled AI practice generation with quality gates)
  db.exec(`
    CREATE TABLE IF NOT EXISTS ai_generation_queue (
      queue_id TEXT PRIMARY KEY,
      exam_id TEXT NOT NULL REFERENCES exams(exam_id),
      exam_version_id TEXT NOT NULL REFERENCES exam_versions(version_id),
      subject_id TEXT NOT NULL REFERENCES subjects(subject_id),
      chapter_id TEXT REFERENCES syllabus_chapters(chapter_id),
      topic_id TEXT REFERENCES syllabus_topics(topic_id),
      concept TEXT NOT NULL,
      target_difficulty TEXT NOT NULL DEFAULT 'MEDIUM',
      language_code TEXT NOT NULL DEFAULT 'hi',
      question_type TEXT NOT NULL DEFAULT 'single_mcq',
      count_requested INTEGER DEFAULT 5,
      count_generated INTEGER DEFAULT 0,
      count_verified INTEGER DEFAULT 0,
      count_rejected INTEGER DEFAULT 0,
      coverage_gap_percentage REAL DEFAULT 0.0,
      status TEXT NOT NULL DEFAULT 'QUEUED',
      validation_log_json TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      completed_at DATETIME
    );

    CREATE INDEX IF NOT EXISTS idx_ai_q_status ON ai_generation_queue(status);
    CREATE INDEX IF NOT EXISTS idx_ai_q_exam ON ai_generation_queue(exam_id);
    CREATE INDEX IF NOT EXISTS idx_ai_q_subj ON ai_generation_queue(subject_id);
  `);
  console.log('✅ Table created/verified: ai_generation_queue');

  // 5. Create coverage_gap_metrics table (Chapter & Topic coverage analytics and honest status)
  db.exec(`
    CREATE TABLE IF NOT EXISTS coverage_gap_metrics (
      metric_id TEXT PRIMARY KEY,
      exam_id TEXT NOT NULL REFERENCES exams(exam_id),
      exam_version_id TEXT NOT NULL REFERENCES exam_versions(version_id),
      subject_id TEXT NOT NULL REFERENCES subjects(subject_id),
      chapter_id TEXT REFERENCES syllabus_chapters(chapter_id),
      topic_id TEXT REFERENCES syllabus_topics(topic_id),
      official_pyq_count INTEGER DEFAULT 0,
      human_curated_count INTEGER DEFAULT 0,
      ai_practice_count INTEGER DEFAULT 0,
      total_count INTEGER DEFAULT 0,
      target_count INTEGER DEFAULT 25,
      coverage_percentage REAL DEFAULT 0.0,
      coverage_status TEXT NOT NULL DEFAULT 'INSUFFICIENT_CONTENT',
      difficulty_distribution_json TEXT,
      last_calculated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_cov_exam_subj ON coverage_gap_metrics(exam_id, subject_id);
    CREATE INDEX IF NOT EXISTS idx_cov_status ON coverage_gap_metrics(coverage_status);
  `);
  console.log('✅ Table created/verified: coverage_gap_metrics');

  // 6. Safely add Tier and Ingestion Versioning Columns to questions table if not already present
  const questionCols = db.prepare("PRAGMA table_info('questions')").all().map(c => c.name);

  if (!questionCols.includes('question_tier')) {
    db.exec(`ALTER TABLE questions ADD COLUMN question_tier TEXT DEFAULT 'TIER_4_HUMAN_CURATED';`);
    console.log('✅ Added column questions.question_tier');
  }

  if (!questionCols.includes('source_document_version_id')) {
    db.exec(`ALTER TABLE questions ADD COLUMN source_document_version_id TEXT REFERENCES source_document_versions(version_id);`);
    console.log('✅ Added column questions.source_document_version_id');
  }

  if (!questionCols.includes('ai_validation_status')) {
    db.exec(`ALTER TABLE questions ADD COLUMN ai_validation_status TEXT DEFAULT 'NOT_APPLICABLE';`);
    console.log('✅ Added column questions.ai_validation_status');
  }

  // Backfill question_tier based on locked baseline provenance
  db.exec(`
    UPDATE questions
    SET question_tier = CASE
      WHEN provenance = 'OFFICIAL_QUESTION' THEN 'TIER_1_OFFICIAL_VERIFIED'
      WHEN provenance = 'OFFICIAL_PYQ' THEN 'TIER_2_VERIFIED_PYQ'
      WHEN provenance = 'OFFICIAL_SAMPLE' OR provenance = 'OFFICIAL_MODEL' THEN 'TIER_3_OFFICIAL_SAMPLE'
      WHEN provenance = 'AI_PRACTICE' OR provenance = 'AI_REVISION' THEN 'TIER_5_AI_PRACTICE'
      WHEN trust_status = 'NEEDS_REVIEW' THEN 'TIER_6_NEEDS_REVIEW'
      WHEN quality_state = 'REJECTED' THEN 'TIER_7_REJECTED'
      ELSE 'TIER_4_HUMAN_CURATED'
    END
    WHERE question_tier IS NULL OR question_tier = 'TIER_4_HUMAN_CURATED';
  `);
  console.log('✅ Question tiers populated according to provenance');

  // 7. Mass-Scale Performance Index Optimization
  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_questions_ver_elig ON questions(exam_version_id, full_exam_eligible);
    CREATE INDEX IF NOT EXISTS idx_questions_subj_chap ON questions(subject_id, chapter_id);
    CREATE INDEX IF NOT EXISTS idx_questions_prov_tier ON questions(provenance, question_tier);
    CREATE INDEX IF NOT EXISTS idx_questions_paper_shift ON questions(paper_id, shift, set_code);
    CREATE INDEX IF NOT EXISTS idx_questions_hist_year ON questions(exam_version_id, historical_year);
    CREATE INDEX IF NOT EXISTS idx_questions_fingerprint ON questions(fingerprint);
  `);
  console.log('✅ Mass-scale database performance indexes created');

  // 8. Seed Nationwide Exam Registry across 12 Categories
  const existingRegistryCount = db.prepare("SELECT COUNT(*) as c FROM nationwide_exam_registry").get().c;
  if (existingRegistryCount === 0) {
    const nationwideRegistrations = [
      // Central / SSC
      {
        id: 'reg-ssc-cgl',
        examId: 'ssc-cgl',
        cat: 'SSC',
        sub: 'Graduate Level',
        state: 'ALL_INDIA',
        auth: 'Staff Selection Commission (SSC)',
        url: 'https://ssc.gov.in',
        acronym: 'SSC CGL',
        disc: 'FULLY_INTEGRATED',
        cov: 'VERIFIED_COMPLETE',
        hist: '["2024", "2023", "2022", "2021", "2020"]'
      },
      {
        id: 'reg-ssc-chsl',
        examId: 'ssc-chsl',
        cat: 'SSC',
        sub: 'Higher Secondary Level',
        state: 'ALL_INDIA',
        auth: 'Staff Selection Commission (SSC)',
        url: 'https://ssc.gov.in',
        acronym: 'SSC CHSL',
        disc: 'PATTERN_VERIFIED',
        cov: 'PARTIAL',
        hist: '["2024", "2023"]'
      },
      {
        id: 'reg-ssc-mts',
        examId: 'ssc-mts',
        cat: 'SSC',
        sub: 'Matriculation Non-Technical',
        state: 'ALL_INDIA',
        auth: 'Staff Selection Commission (SSC)',
        url: 'https://ssc.gov.in',
        acronym: 'SSC MTS',
        disc: 'PATTERN_VERIFIED',
        cov: 'PARTIAL',
        hist: '["2024"]'
      },
      {
        id: 'reg-ssc-gd',
        examId: 'ssc-gd',
        cat: 'SSC',
        sub: 'Paramilitary Constable',
        state: 'ALL_INDIA',
        auth: 'Staff Selection Commission (SSC)',
        url: 'https://ssc.gov.in',
        acronym: 'SSC GD',
        disc: 'PATTERN_VERIFIED',
        cov: 'PARTIAL',
        hist: '["2024", "2023", "2022"]'
      },
      // Railway (RRB)
      {
        id: 'reg-rrb-alp',
        examId: 'rrb-alp',
        cat: 'RAILWAY',
        sub: 'Assistant Loco Pilot',
        state: 'ALL_INDIA',
        auth: 'Railway Recruitment Control Board (RRB)',
        url: 'https://indianrailways.gov.in',
        acronym: 'RRB ALP',
        disc: 'SOURCE_VERIFIED',
        cov: 'LIMITED',
        hist: '["2024"]'
      },
      {
        id: 'reg-rrb-ntpc',
        examId: 'rrb-ntpc',
        cat: 'RAILWAY',
        sub: 'Non-Technical Popular Categories',
        state: 'ALL_INDIA',
        auth: 'Railway Recruitment Control Board (RRB)',
        url: 'https://indianrailways.gov.in',
        acronym: 'RRB NTPC',
        disc: 'SOURCE_VERIFIED',
        cov: 'LIMITED',
        hist: '["2022"]'
      },
      {
        id: 'reg-rrb-group-d',
        examId: 'rrb-group-d',
        cat: 'RAILWAY',
        sub: 'RRC Level 1',
        state: 'ALL_INDIA',
        auth: 'Railway Recruitment Cell (RRC)',
        url: 'https://indianrailways.gov.in',
        acronym: 'RRC Group D',
        disc: 'SOURCE_VERIFIED',
        cov: 'LIMITED',
        hist: '["2022"]'
      },
      // Banking
      {
        id: 'reg-ibps-po-clerk',
        examId: 'ibps-po-clerk',
        cat: 'BANKING',
        sub: 'Public Sector Banks',
        state: 'ALL_INDIA',
        auth: 'Institute of Banking Personnel Selection (IBPS)',
        url: 'https://ibps.in',
        acronym: 'IBPS PO/Clerk',
        disc: 'SOURCE_VERIFIED',
        cov: 'LIMITED',
        hist: '["2024", "2023"]'
      },
      // Civil Services & Defence
      {
        id: 'reg-upsc-cse',
        examId: 'upsc-cse',
        cat: 'CIVIL_SERVICES',
        sub: 'All India Services',
        state: 'ALL_INDIA',
        auth: 'Union Public Service Commission (UPSC)',
        url: 'https://upsc.gov.in',
        acronym: 'UPSC CSE',
        disc: 'SOURCE_VERIFIED',
        cov: 'LIMITED',
        hist: '["2024", "2023"]'
      },
      {
        id: 'reg-upsc-nda',
        examId: 'upsc-nda',
        cat: 'DEFENCE',
        sub: 'Officer Cadre',
        state: 'ALL_INDIA',
        auth: 'Union Public Service Commission (UPSC)',
        url: 'https://upsc.gov.in',
        acronym: 'NDA & NA',
        disc: 'SOURCE_VERIFIED',
        cov: 'LIMITED',
        hist: '["2024"]'
      },
      {
        id: 'reg-agniveer-army',
        examId: 'agniveer-army',
        cat: 'DEFENCE',
        sub: 'Soldier Rally',
        state: 'ALL_INDIA',
        auth: 'Indian Army Recruitment Directorate',
        url: 'https://joinindianarmy.nic.in',
        acronym: 'Indian Army',
        disc: 'SOURCE_VERIFIED',
        cov: 'LIMITED',
        hist: '["2024"]'
      },
      // Police
      {
        id: 'reg-up-police-constable',
        examId: 'up-police-constable',
        cat: 'POLICE',
        sub: 'State Police Force',
        state: 'UP',
        auth: 'UP Police Recruitment & Promotion Board (UPPRPB)',
        url: 'https://uppbpb.gov.in',
        acronym: 'UP Police',
        disc: 'PATTERN_VERIFIED',
        cov: 'PARTIAL',
        hist: '["2024"]'
      },
      {
        id: 'reg-bihar-police-constable',
        examId: 'bihar-police-constable',
        cat: 'POLICE',
        sub: 'State Police Force',
        state: 'BR',
        auth: 'Central Selection Board of Constable (CSBC Bihar)',
        url: 'https://csbc.bih.nic.in',
        acronym: 'CSBC Bihar',
        disc: 'SOURCE_VERIFIED',
        cov: 'LIMITED',
        hist: '["2024"]'
      },
      // Entrance
      {
        id: 'reg-nta-neet',
        examId: 'nta-neet',
        cat: 'MEDICAL_ENTRANCE',
        sub: 'Undergraduate Medical',
        state: 'ALL_INDIA',
        auth: 'National Testing Agency (NTA)',
        url: 'https://exams.nta.ac.in/NEET',
        acronym: 'NEET UG',
        disc: 'PATTERN_VERIFIED',
        cov: 'PARTIAL',
        hist: '["2024"]'
      },
      {
        id: 'reg-nta-jee-main',
        examId: 'nta-jee-main',
        cat: 'ENGINEERING_ENTRANCE',
        sub: 'Undergraduate Engineering',
        state: 'ALL_INDIA',
        auth: 'National Testing Agency (NTA)',
        url: 'https://jeemain.nta.nic.in',
        acronym: 'JEE Main',
        disc: 'SOURCE_VERIFIED',
        cov: 'LIMITED',
        hist: '["2024"]'
      },
      {
        id: 'reg-clat-law',
        examId: 'clat-law',
        cat: 'LAW_ENTRANCE',
        sub: 'National Law Universities',
        state: 'ALL_INDIA',
        auth: 'Consortium of National Law Universities',
        url: 'https://consortiumofnlus.ac.in',
        acronym: 'CLAT',
        disc: 'SOURCE_VERIFIED',
        cov: 'LIMITED',
        hist: '["2024"]'
      },
      // Teaching
      {
        id: 'reg-ctet-exam',
        examId: 'ctet-exam',
        cat: 'TEACHING',
        sub: 'Central Teacher Eligibility',
        state: 'ALL_INDIA',
        auth: 'Central Board of Secondary Education (CBSE)',
        url: 'https://ctet.nic.in',
        acronym: 'CTET',
        disc: 'SOURCE_VERIFIED',
        cov: 'LIMITED',
        hist: '["2024"]'
      },
      {
        id: 'reg-bpsc-tre',
        examId: 'bpsc-tre',
        cat: 'TEACHING',
        sub: 'School Teacher Recruitment',
        state: 'BR',
        auth: 'Bihar Public Service Commission (BPSC)',
        url: 'https://bpsc.bih.nic.in',
        acronym: 'BPSC TRE',
        disc: 'SOURCE_VERIFIED',
        cov: 'LIMITED',
        hist: '["2024"]'
      },
      // Boards (10th & 12th)
      {
        id: 'reg-cbse-board',
        examId: 'cbse-board',
        cat: 'BOARD_10TH',
        sub: 'Secondary & Senior Secondary',
        state: 'ALL_INDIA',
        auth: 'Central Board of Secondary Education (CBSE)',
        url: 'https://cbse.gov.in',
        acronym: 'CBSE',
        disc: 'FULLY_INTEGRATED',
        cov: 'VERIFIED_COMPLETE',
        hist: '["2024", "2023", "2022"]'
      },
      {
        id: 'reg-bseb-bihar',
        examId: 'bseb-bihar',
        cat: 'BOARD_10TH',
        sub: 'Matric & Inter Council',
        state: 'BR',
        auth: 'Bihar School Examination Board (BSEB)',
        url: 'https://biharboardonline.bihar.gov.in',
        acronym: 'BSEB',
        disc: 'PATTERN_VERIFIED',
        cov: 'PARTIAL',
        hist: '["2024", "2023"]'
      },
      {
        id: 'reg-upmsp-board',
        examId: 'upmsp-board',
        cat: 'BOARD_10TH',
        sub: 'High School & Inter Council',
        state: 'UP',
        auth: 'Madhyamik Shiksha Parishad UP (UPMSP)',
        url: 'https://upmsp.edu.in',
        acronym: 'UPMSP',
        disc: 'PATTERN_VERIFIED',
        cov: 'PARTIAL',
        hist: '["2024"]'
      },
      {
        id: 'reg-tndge-tamilnadu',
        examId: 'tndge-tamilnadu',
        cat: 'BOARD_10TH',
        sub: 'SSLC & HSE Council',
        state: 'TN',
        auth: 'Directorate of Government Examinations Tamil Nadu',
        url: 'https://dge.tn.gov.in',
        acronym: 'TNDGE',
        disc: 'FULLY_INTEGRATED',
        cov: 'VERIFIED_COMPLETE',
        hist: '["2024"]'
      }
    ];

    const insertReg = db.prepare(`
      INSERT INTO nationwide_exam_registry (
        registry_id, exam_id, category, sub_category, state_code,
        official_authority, official_portal_url, official_acronym,
        discovery_status, coverage_status, historical_years_covered
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const regTx = db.transaction((items) => {
      for (const item of items) {
        insertReg.run(
          item.id, item.examId, item.cat, item.sub, item.state,
          item.auth, item.url, item.acronym, item.disc, item.cov, item.hist
        );
      }
    });

    regTx(nationwideRegistrations);
    console.log(`✅ Seeded ${nationwideRegistrations.length} verified nationwide exam registrations`);
  }

  console.log('========================================================');
  console.log('🎉 PHASE 9 NATIONWIDE EXPANSION SCHEMA INITIALIZED');
  console.log('========================================================');
}

if (require.main === module) {
  initPhase9ExpansionSchema();
}

module.exports = { initPhase9ExpansionSchema };
