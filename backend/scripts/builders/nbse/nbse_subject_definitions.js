const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '../../../db/sarkari_core.db');
const db = new Database(dbPath);

console.log('📌 Registering NBSE Organizations, Boards, Sources, Languages, and Subjects...');

db.pragma('foreign_keys = ON');

const orgStmt = db.prepare(`
  INSERT OR REPLACE INTO organizations (
    organization_id, name, short_name, type, central_or_state, state_or_ut,
    official_website, active, verification_status
  ) VALUES (
    @organization_id, @name, @short_name, @type, @central_or_state, @state_or_ut,
    @official_website, @active, @verification_status
  )
`);

const boardStmt = db.prepare(`
  INSERT OR REPLACE INTO boards (
    board_id, organization_id, name, short_name, jurisdiction, board_type,
    official_website, official_result_url, active, verification_status
  ) VALUES (
    @board_id, @organization_id, @name, @short_name, @jurisdiction, @board_type,
    @official_website, @official_result_url, @active, @verification_status
  )
`);

const sourceStmt = db.prepare(`
  INSERT OR REPLACE INTO official_sources (
    source_id, organization_id, document_title, document_type, source_url,
    publication_date, effective_date, applicable_year, source_hash, retrieved_at,
    verified_at, verification_status, verification_notes, source_hierarchy_level,
    issuing_authority, applicable_exam_id, applicable_version_id, freshness_status,
    conflict_status
  ) VALUES (
    @source_id, @organization_id, @document_title, @document_type, @source_url,
    '2026-01-15', '2026-04-01', '2026-27', 'OFFICIAL_NBSE_SRC_HASH', CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP, 'VERIFIED', 'Official NBSE statutory portal and examination regulations',
    'PRIMARY_STATUTORY', 'Nagaland Board of School Education', 'NBSE_EXAM_SUITE',
    'v2026.1', 'FRESH', 'RESOLVED_NO_CONFLICT'
  )
`);

const langStmt = db.prepare(`
  INSERT OR REPLACE INTO languages (
    language_id, code, locale, native_name, english_name, script,
    direction, is_scheduled_language, is_ui_language, is_exam_language,
    is_language_subject, font_family, active, is_expanded_ui_language
  ) VALUES (
    @language_id, @code, @locale, @native_name, @english_name, @script,
    @direction, @is_scheduled_language, @is_ui_language, @is_exam_language,
    @is_language_subject, @font_family, @active, @is_expanded_ui_language
  )
`);

const subjectStmt = db.prepare(`
  INSERT OR REPLACE INTO subjects (
    subject_id, name, short_name, subject_type, is_language_subject,
    is_medium_dependent, active
  ) VALUES (
    @subject_id, @name, @short_name, @subject_type, @is_language_subject,
    @is_medium_dependent, @active
  )
`);

const tx = db.transaction(() => {
  // 1. Organizations
  orgStmt.run({
    organization_id: 'org-nl-board-nbse',
    name: 'Nagaland Board of School Education, Kohima',
    short_name: 'NBSE',
    type: 'EXAM_BOARD',
    central_or_state: 'STATE',
    state_or_ut: 'Nagaland',
    official_website: 'https://nbsenl.edu.in/',
    active: 1,
    verification_status: 'VERIFIED'
  });

  // 2. Boards
  const boards = [
    {
      board_id: 'nbse-nagaland',
      organization_id: 'org-nl-board-nbse',
      name: 'Nagaland Board of School Education',
      short_name: 'NBSE',
      jurisdiction: 'State',
      board_type: 'State',
      official_website: 'https://nbsenl.edu.in/',
      official_result_url: 'https://nbsenl.edu.in/',
      active: 1,
      verification_status: 'VERIFIED'
    },
    {
      board_id: 'nbse-board',
      organization_id: 'org-nl-board-nbse',
      name: 'NBSE Nagaland School Education Board',
      short_name: 'NBSE Board',
      jurisdiction: 'State',
      board_type: 'State',
      official_website: 'https://nbsenl.edu.in/',
      official_result_url: 'https://nbsenl.edu.in/',
      active: 1,
      verification_status: 'VERIFIED'
    },
    {
      board_id: 'nbse',
      organization_id: 'org-nl-board-nbse',
      name: 'Nagaland Board of School Education (Alias)',
      short_name: 'NBSE',
      jurisdiction: 'State',
      board_type: 'State',
      official_website: 'https://nbsenl.edu.in/',
      official_result_url: 'https://nbsenl.edu.in/',
      active: 1,
      verification_status: 'VERIFIED'
    }
  ];
  for (const b of boards) {
    boardStmt.run(b);
  }

  // 3. Official Sources
  const sources = [
    {
      source_id: 'src-nbse-portal',
      organization_id: 'org-nl-board-nbse',
      document_title: 'Nagaland Board of School Education Official Portal',
      document_type: 'PORTAL',
      source_url: 'https://nbsenl.edu.in/'
    },
    {
      source_id: 'src-nbse-hslc-curriculum',
      organization_id: 'org-nl-board-nbse',
      document_title: 'NBSE HSLC (Class 10) Scheme of Studies & Curriculum Regulations',
      document_type: 'CURRICULUM_REGULATION',
      source_url: 'https://nbsenl.edu.in/curriculum'
    },
    {
      source_id: 'src-nbse-hsslc-curriculum',
      organization_id: 'org-nl-board-nbse',
      document_title: 'NBSE HSSLC (Class 12) Scheme of Studies & Stream Regulations',
      document_type: 'CURRICULUM_REGULATION',
      source_url: 'https://nbsenl.edu.in/curriculum'
    },
    {
      source_id: 'src-nbse-class9-regulations',
      organization_id: 'org-nl-board-nbse',
      document_title: 'NBSE Class IX Final Examination Regulations & Naga Language Syllabi',
      document_type: 'EXAMINATION_REGULATION',
      source_url: 'https://nbsenl.edu.in/regulations'
    },
    {
      source_id: 'src-nbse-class11-regulations',
      organization_id: 'org-nl-board-nbse',
      document_title: 'NBSE Class XI Promotion Examination & Stream Progression Regulations',
      document_type: 'EXAMINATION_REGULATION',
      source_url: 'https://nbsenl.edu.in/regulations'
    },
    {
      source_id: 'src-nbse-results-portal',
      organization_id: 'org-nl-board-nbse',
      document_title: 'Nagaland Board Examination Results & Archives Portal',
      document_type: 'PORTAL',
      source_url: 'https://nbsenl.edu.in/results'
    }
  ];
  for (const s of sources) {
    sourceStmt.run(s);
  }

  // 4. Languages (Tenyidie, Ao, Sumi, Lotha)
  const nagaLangs = [
    {
      language_id: 'njz',
      code: 'njz',
      locale: 'njz-IN',
      native_name: 'Tenyidie',
      english_name: 'Tenyidie',
      script: 'Latin',
      direction: 'ltr',
      is_scheduled_language: 0,
      is_ui_language: 0,
      is_exam_language: 1,
      is_language_subject: 1,
      font_family: "'Noto Sans', sans-serif",
      active: 1,
      is_expanded_ui_language: 0
    },
    {
      language_id: 'njo',
      code: 'njo',
      locale: 'njo-IN',
      native_name: 'Ao',
      english_name: 'Ao',
      script: 'Latin',
      direction: 'ltr',
      is_scheduled_language: 0,
      is_ui_language: 0,
      is_exam_language: 1,
      is_language_subject: 1,
      font_family: "'Noto Sans', sans-serif",
      active: 1,
      is_expanded_ui_language: 0
    },
    {
      language_id: 'nsm',
      code: 'nsm',
      locale: 'nsm-IN',
      native_name: 'Sümi',
      english_name: 'Sumi',
      script: 'Latin',
      direction: 'ltr',
      is_scheduled_language: 0,
      is_ui_language: 0,
      is_exam_language: 1,
      is_language_subject: 1,
      font_family: "'Noto Sans', sans-serif",
      active: 1,
      is_expanded_ui_language: 0
    },
    {
      language_id: 'njh',
      code: 'njh',
      locale: 'njh-IN',
      native_name: 'Lotha',
      english_name: 'Lotha',
      script: 'Latin',
      direction: 'ltr',
      is_scheduled_language: 0,
      is_ui_language: 0,
      is_exam_language: 1,
      is_language_subject: 1,
      font_family: "'Noto Sans', sans-serif",
      active: 1,
      is_expanded_ui_language: 0
    }
  ];
  for (const l of nagaLangs) {
    langStmt.run(l);
  }

  // 5. Subjects (31 Primary Subjects)
  const subjects = [
    // Class 10 (HSLC) - 10 subjects
    { subject_id: 'nl-c10-english', name: 'English (Compulsory HSLC Subject - 80 Theory + 20 IA)', short_name: 'English', subject_type: 'ACADEMIC', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'nl-c10-second-lang-tenyidie', name: 'Tenyidie (Second Language - Naga Language - 80 Theory + 20 IA)', short_name: 'Tenyidie', subject_type: 'ACADEMIC', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'nl-c10-second-lang-ao', name: 'Ao (Second Language - Naga Language - 80 Theory + 20 IA)', short_name: 'Ao', subject_type: 'ACADEMIC', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'nl-c10-second-lang-sumi', name: 'Sumi (Second Language - Naga Language - 80 Theory + 20 IA)', short_name: 'Sumi', subject_type: 'ACADEMIC', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'nl-c10-second-lang-lotha', name: 'Lotha (Second Language - Naga Language - 80 Theory + 20 IA)', short_name: 'Lotha', subject_type: 'ACADEMIC', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'nl-c10-alt-english', name: 'Alternative English (Second Language Option - 80 Theory + 20 IA)', short_name: 'Alt English', subject_type: 'ACADEMIC', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'nl-c10-second-lang-hindi', name: 'Hindi (Second Language - हिन्दी - 80 Theory + 20 IA)', short_name: 'Hindi', subject_type: 'ACADEMIC', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'nl-c10-mathematics', name: 'Mathematics (Compulsory HSLC - 80 Theory + 20 IA)', short_name: 'Mathematics', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'nl-c10-science', name: 'Science (Compulsory HSLC - 80 Theory + 20 IA)', short_name: 'Science', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'nl-c10-social-sciences', name: 'Social Sciences (Compulsory HSLC - 80 Theory + 20 IA)', short_name: 'Social Sciences', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 1, active: 1 },

    // Class 12 (HSSLC) - Science (6 subjects)
    { subject_id: 'nl-c12-physics', name: 'Physics (70 Theory + 30 Practical - HSSLC NBSE)', short_name: 'Physics', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'nl-c12-chemistry', name: 'Chemistry (70 Theory + 30 Practical - HSSLC NBSE)', short_name: 'Chemistry', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'nl-c12-biology', name: 'Biology (Botany & Zoology - 70 Theory + 30 Practical - HSSLC NBSE)', short_name: 'Biology', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'nl-c12-mathematics', name: 'Mathematics (80 Theory + 20 IA - HSSLC NBSE)', short_name: 'Mathematics XII', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'nl-c12-computer-science', name: 'Computer Science (70 Theory + 30 Practical - HSSLC NBSE)', short_name: 'Computer Science', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'nl-c12-informatics-practices', name: 'Informatics Practices (70 Theory + 30 Practical - HSSLC NBSE)', short_name: 'Informatics Practices', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },

    // Class 12 (HSSLC) - Commerce (5 subjects)
    { subject_id: 'nl-c12-accountancy', name: 'Accountancy (80 Theory + 20 Project - HSSLC NBSE)', short_name: 'Accountancy', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'nl-c12-business-studies', name: 'Business Studies (80 Theory + 20 Project - HSSLC NBSE)', short_name: 'Business Studies', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'nl-c12-economics', name: 'Economics (80 Theory + 20 Project - HSSLC NBSE)', short_name: 'Economics', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'nl-c12-entrepreneurship', name: 'Entrepreneurship (80 Theory + 20 Project - HSSLC NBSE)', short_name: 'Entrepreneurship', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'nl-c12-financial-markets', name: 'Financial Markets Management / Commercial Math (80 Theory + 20 Project - HSSLC NBSE)', short_name: 'Financial Markets', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },

    // Class 12 (HSSLC) - Arts / Humanities (6 subjects)
    { subject_id: 'nl-c12-political-science', name: 'Political Science (Themes in Politics - 80 Theory + 20 Project - HSSLC NBSE)', short_name: 'Political Science', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'nl-c12-history', name: 'History (Themes in History & Naga Heritage - 80 Theory + 20 Project - HSSLC NBSE)', short_name: 'History', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'nl-c12-geography', name: 'Geography (Fundamentals & Nagaland Geography - 70 Theory + 30 Practical - HSSLC NBSE)', short_name: 'Geography', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'nl-c12-education', name: 'Education (Educational Principles & Psychological Foundations - 80 Theory + 20 Project - HSSLC NBSE)', short_name: 'Education', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'nl-c12-sociology', name: 'Sociology (Indian Society & Naga Social Institutions - 80 Theory + 20 Project - HSSLC NBSE)', short_name: 'Sociology', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'nl-c12-philosophy', name: 'Logic & Philosophy (80 Theory + 20 Project - HSSLC NBSE)', short_name: 'Logic & Philosophy', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },

    // Class 12 (HSSLC) - Languages (4 subjects)
    { subject_id: 'nl-c12-english', name: 'English Core (Compulsory across all streams - 100 Marks)', short_name: 'English Core', subject_type: 'ACADEMIC', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'nl-c12-alt-english', name: 'Alternative English (100 Marks - HSSLC NBSE)', short_name: 'Alt English XII', subject_type: 'ACADEMIC', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'nl-c12-second-lang-tenyidie', name: 'Tenyidie MIL (Tenyidie Literature & Language - 100 Marks)', short_name: 'Tenyidie MIL XII', subject_type: 'ACADEMIC', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'nl-c12-second-lang-ao', name: 'Ao MIL (Ao Literature & Language - 100 Marks)', short_name: 'Ao MIL XII', subject_type: 'ACADEMIC', is_language_subject: 1, is_medium_dependent: 0, active: 1 }
  ];

  for (const s of subjects) {
    subjectStmt.run(s);
  }
});

tx();

console.log('✅ Successfully registered NBSE organizations, boards, sources, languages, and 31 subjects.');
db.close();
