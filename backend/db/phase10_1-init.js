// backend/db/phase10_1-init.js
// Database Schema Initialization for Phase 10.1:
// All 36 States/UTs, State Boards, Class 9-12 Offerings,
// Board Dependencies, Registration & Eligibility Engine, 24 UI Languages.

const { getDb } = require('./database');

function initPhase10_1Database(db = getDb()) {
  if (!db) throw new Error('Database is unavailable');

  console.log('🔄 Initializing Phase 10.1 Database Extensions...');

  // 1. Create states table (All 28 States + 8 UTs)
  db.exec(`
    CREATE TABLE IF NOT EXISTS states (
      state_id TEXT PRIMARY KEY,
      name_en TEXT NOT NULL,
      name_hi TEXT NOT NULL,
      name_regional TEXT,
      official_code TEXT UNIQUE NOT NULL,
      type TEXT NOT NULL CHECK(type IN ('STATE', 'UT')),
      capital TEXT NOT NULL,
      primary_language_code TEXT NOT NULL,
      education_authority_name TEXT NOT NULL,
      education_authority_url TEXT NOT NULL,
      main_school_board_id TEXT,
      psc_authority_name TEXT,
      psc_authority_url TEXT,
      police_recruitment_authority_name TEXT,
      police_recruitment_authority_url TEXT,
      teacher_recruitment_authority_name TEXT,
      teacher_recruitment_authority_url TEXT,
      entrance_authority_name TEXT,
      entrance_authority_url TEXT,
      registration_portal_url TEXT,
      result_portal_url TEXT,
      source_verification_status TEXT NOT NULL DEFAULT 'SOURCE_VERIFIED',
      is_active INTEGER NOT NULL DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_states_code ON states(official_code);
    CREATE INDEX IF NOT EXISTS idx_states_type ON states(type);
  `);

  // 2. Populate classes if empty (Class 9, Class 10, Class 11, Class 12)
  const classCount = db.prepare("SELECT COUNT(*) as c FROM classes").get().c;
  if (classCount === 0) {
    const insertClass = db.prepare(`
      INSERT INTO classes (class_id, display_name, numeric_level, description)
      VALUES (?, ?, ?, ?)
    `);
    const classesData = [
      ['class-9', 'Class 9', 9, 'Secondary Education - Foundation Year (School-Based Evaluation)'],
      ['class-10', 'Class 10', 10, 'Secondary School Certificate / Matriculation Public Board Exam'],
      ['class-11', 'Class 11', 11, 'Higher Secondary - Stream Specialization Foundation Year'],
      ['class-12', 'Class 12', 12, 'Senior School Certificate / Intermediate Terminal Board Exam']
    ];
    for (const c of classesData) {
      insertClass.run(c[0], c[1], c[2], c[3]);
    }
    console.log('  ✅ Seeded classes table with Class 9, 10, 11, 12.');
  }

  // 3. Populate streams if empty
  const streamCount = db.prepare("SELECT COUNT(*) as c FROM streams").get().c;
  if (streamCount === 0) {
    const insertStream = db.prepare(`
      INSERT INTO streams (stream_id, display_name, description)
      VALUES (?, ?, ?)
    `);
    const streamsData = [
      ['general', 'General / Integrated', 'Universal secondary subjects for Class 9 and 10'],
      ['science-pcm', 'Science (PCM)', 'Physics, Chemistry, Mathematics stream for engineering & tech'],
      ['science-pcb', 'Science (PCB)', 'Physics, Chemistry, Biology stream for medical & life sciences'],
      ['science-pcmb', 'Science (PCMB)', 'Physics, Chemistry, Mathematics, Biology combined stream'],
      ['commerce', 'Commerce', 'Accountancy, Business Studies, Economics, Applied Mathematics'],
      ['humanities', 'Humanities / Arts', 'History, Political Science, Geography, Sociology, Psychology'],
      ['vocational', 'Vocational / Technical', 'Skill-based education and technical vocational trades']
    ];
    for (const s of streamsData) {
      insertStream.run(s[0], s[1], s[2]);
    }
    console.log('  ✅ Seeded streams table with standard academic streams.');
  }

  // 4. Create board_academic_offerings table
  db.exec(`
    CREATE TABLE IF NOT EXISTS board_academic_offerings (
      offering_id TEXT PRIMARY KEY,
      board_id TEXT NOT NULL,
      class_id TEXT NOT NULL,
      academic_year TEXT NOT NULL DEFAULT '2024-25',
      is_public_board_exam INTEGER NOT NULL DEFAULT 0,
      academic_support_type TEXT NOT NULL,
      available_streams_json TEXT NOT NULL DEFAULT '["general"]',
      compulsory_subjects_json TEXT NOT NULL,
      optional_subjects_json TEXT NOT NULL,
      evaluation_pattern_summary TEXT,
      registration_prerequisite_info TEXT,
      official_curriculum_url TEXT,
      verification_status TEXT NOT NULL DEFAULT 'VERIFIED',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (board_id) REFERENCES boards(board_id),
      FOREIGN KEY (class_id) REFERENCES classes(class_id)
    );

    CREATE INDEX IF NOT EXISTS idx_offerings_board_class ON board_academic_offerings(board_id, class_id);
  `);

  // 5. Create academic_dependencies table (Board-Specific 9->10 and 11->12 Progression Rules)
  db.exec(`
    CREATE TABLE IF NOT EXISTS academic_dependencies (
      dependency_id TEXT PRIMARY KEY,
      board_id TEXT NOT NULL,
      from_class_id TEXT NOT NULL,
      to_class_id TEXT NOT NULL,
      dependency_type TEXT NOT NULL,
      rule_name TEXT NOT NULL,
      rule_description_en TEXT NOT NULL,
      rule_description_hi TEXT NOT NULL,
      is_mandatory INTEGER NOT NULL DEFAULT 1,
      min_attendance_pct REAL DEFAULT 75.0,
      allow_stream_change INTEGER NOT NULL DEFAULT 0,
      official_circular_ref TEXT NOT NULL,
      verification_status TEXT NOT NULL DEFAULT 'VERIFIED',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (board_id) REFERENCES boards(board_id),
      FOREIGN KEY (from_class_id) REFERENCES classes(class_id),
      FOREIGN KEY (to_class_id) REFERENCES classes(class_id)
    );

    CREATE INDEX IF NOT EXISTS idx_acad_dep_board ON academic_dependencies(board_id);
  `);

  // 6. Create exam_registrations table (Source-Grounded Registration Schedules & Portals)
  db.exec(`
    CREATE TABLE IF NOT EXISTS exam_registrations (
      registration_id TEXT PRIMARY KEY,
      entity_type TEXT NOT NULL CHECK(entity_type IN ('EXAM', 'BOARD_CLASS')),
      entity_id TEXT NOT NULL,
      academic_year TEXT NOT NULL,
      session_name TEXT NOT NULL,
      notification_date TEXT,
      registration_start_date TEXT NOT NULL,
      registration_end_date TEXT NOT NULL,
      correction_window_start TEXT,
      correction_window_end TEXT,
      admit_card_date TEXT,
      exam_start_date TEXT,
      exam_end_date TEXT,
      result_date TEXT,
      general_fee_inr INTEGER DEFAULT 0,
      reserved_fee_inr INTEGER DEFAULT 0,
      official_portal_url TEXT NOT NULL,
      official_notification_url TEXT NOT NULL,
      source_id TEXT,
      verification_status TEXT NOT NULL DEFAULT 'VERIFIED',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_exam_reg_entity ON exam_registrations(entity_id, academic_year);
  `);

  // 7. Create exam_eligibility_criteria table
  db.exec(`
    CREATE TABLE IF NOT EXISTS exam_eligibility_criteria (
      eligibility_id TEXT PRIMARY KEY,
      entity_type TEXT NOT NULL CHECK(entity_type IN ('EXAM', 'BOARD_CLASS')),
      entity_id TEXT NOT NULL,
      min_age INTEGER,
      max_age INTEGER,
      age_relaxation_json TEXT,
      educational_qualification_en TEXT NOT NULL,
      educational_qualification_hi TEXT NOT NULL,
      subject_requirements_json TEXT,
      stream_requirements_json TEXT,
      attempt_limit INTEGER DEFAULT -1,
      nationality TEXT DEFAULT 'INDIAN',
      domicile_requirement_en TEXT,
      physical_standards_json TEXT,
      official_source_id TEXT,
      verification_status TEXT NOT NULL DEFAULT 'VERIFIED',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_eligibility_entity ON exam_eligibility_criteria(entity_id);
  `);

  // 8. Create exam_stages table (Multi-Stage Examination Breakdown)
  db.exec(`
    CREATE TABLE IF NOT EXISTS exam_stages (
      stage_mapping_id TEXT PRIMARY KEY,
      exam_id TEXT NOT NULL,
      stage_order INTEGER NOT NULL,
      stage_code TEXT NOT NULL,
      stage_name TEXT NOT NULL,
      stage_type TEXT NOT NULL,
      total_marks INTEGER NOT NULL,
      duration_minutes INTEGER NOT NULL,
      qualifying_or_merit TEXT NOT NULL,
      is_active INTEGER NOT NULL DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (exam_id) REFERENCES exams(exam_id)
    );

    CREATE INDEX IF NOT EXISTS idx_stages_exam_order ON exam_stages(exam_id, stage_order);
  `);

  // 9. Create nationwide_exam_inventory table (Actual Verified Production Inventory: Category != Exam)
  db.exec(`
    CREATE TABLE IF NOT EXISTS nationwide_exam_inventory (
      inventory_id TEXT PRIMARY KEY,
      exam_id TEXT NOT NULL,
      category TEXT NOT NULL,
      sub_category TEXT NOT NULL,
      exam_name_en TEXT NOT NULL,
      exam_name_hi TEXT NOT NULL,
      authority_name TEXT NOT NULL,
      authority_code TEXT NOT NULL,
      state_id TEXT,
      exam_scope TEXT NOT NULL CHECK(exam_scope IN ('NATIONAL', 'STATE')),
      official_website_url TEXT NOT NULL,
      current_stage_count INTEGER NOT NULL DEFAULT 1,
      blueprint_status TEXT NOT NULL DEFAULT 'PENDING_OFFICIAL_VERIFICATION',
      syllabus_status TEXT NOT NULL DEFAULT 'PENDING_OFFICIAL_VERIFICATION',
      eligibility_status TEXT NOT NULL DEFAULT 'VERIFIED',
      registration_status TEXT NOT NULL DEFAULT 'VERIFIED',
      language_support_json TEXT NOT NULL DEFAULT '["en", "hi"]',
      readiness_state TEXT NOT NULL DEFAULT 'PRACTICE_READY',
      is_active INTEGER NOT NULL DEFAULT 1,
      source_verification_status TEXT NOT NULL DEFAULT 'SOURCE_VERIFIED',
      last_verified_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_inv_category ON nationwide_exam_inventory(category);
    CREATE INDEX IF NOT EXISTS idx_inv_state ON nationwide_exam_inventory(state_id);
    CREATE INDEX IF NOT EXISTS idx_inv_exam ON nationwide_exam_inventory(exam_id);
  `);

  // 10. Check if expanded_ui_supported column exists in languages
  const langCols = db.prepare("PRAGMA table_info(languages)").all().map(c => c.name);
  if (!langCols.includes('is_expanded_ui_language')) {
    db.exec("ALTER TABLE languages ADD COLUMN is_expanded_ui_language INTEGER DEFAULT 1");
  }

  console.log('✅ Phase 10.1 Schema initialized successfully.');
  return true;
}

module.exports = {
  initPhase10_1Database
};
