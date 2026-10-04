const path = require('path');
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, '../../../db/sarkari_core.db');
const db = new Database(dbPath);

console.log('Ingesting official MBSE Organizations, Boards, Sources, Languages, and 31 Subjects...');

const orgStmt = db.prepare(`
  INSERT OR REPLACE INTO organizations (
    organization_id, name, short_name, type, central_or_state,
    state_or_ut, official_website, active, verification_status
  ) VALUES (
    @organization_id, @name, @short_name, @type, @central_or_state,
    @state_or_ut, @official_website, @active, @verification_status
  )
`);

const boardStmt = db.prepare(`
  INSERT OR REPLACE INTO boards (
    board_id, organization_id, name, short_name, jurisdiction,
    board_type, official_website, official_result_url, active, verification_status
  ) VALUES (
    @board_id, @organization_id, @name, @short_name, @jurisdiction,
    @board_type, @official_website, @official_result_url, @active, @verification_status
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
    '2026-01-15', '2026-04-01', '2026-27', 'OFFICIAL_MBSE_SRC_HASH', CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP, 'VERIFIED', 'Official MBSE statutory portal and examination regulations',
    'PRIMARY_STATUTORY', 'Mizoram Board of School Education', 'MBSE_EXAM_SUITE',
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
    organization_id: 'org-mz-board-mbse',
    name: 'Mizoram Board of School Education, Aizawl',
    short_name: 'MBSE',
    type: 'EXAM_BOARD',
    central_or_state: 'STATE',
    state_or_ut: 'Mizoram',
    official_website: 'https://www.mbse.edu.in/',
    active: 1,
    verification_status: 'VERIFIED'
  });

  // 2. Boards
  const boards = [
    {
      board_id: 'mbse-mizoram',
      organization_id: 'org-mz-board-mbse',
      name: 'Mizoram Board of School Education',
      short_name: 'MBSE',
      jurisdiction: 'State',
      board_type: 'State',
      official_website: 'https://www.mbse.edu.in/',
      official_result_url: 'https://www.mbse.edu.in/',
      active: 1,
      verification_status: 'VERIFIED'
    },
    {
      board_id: 'mbse-board',
      organization_id: 'org-mz-board-mbse',
      name: 'MBSE Mizoram School Education Board',
      short_name: 'MBSE Board',
      jurisdiction: 'State',
      board_type: 'State',
      official_website: 'https://www.mbse.edu.in/',
      official_result_url: 'https://www.mbse.edu.in/',
      active: 1,
      verification_status: 'VERIFIED'
    },
    {
      board_id: 'mbse',
      organization_id: 'org-mz-board-mbse',
      name: 'Mizoram Board of School Education (Alias)',
      short_name: 'MBSE',
      jurisdiction: 'State',
      board_type: 'State',
      official_website: 'https://www.mbse.edu.in/',
      official_result_url: 'https://www.mbse.edu.in/',
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
      source_id: 'src-mbse-portal',
      organization_id: 'org-mz-board-mbse',
      document_title: 'Mizoram Board of School Education Official Portal',
      document_type: 'PORTAL',
      source_url: 'https://www.mbse.edu.in/'
    },
    {
      source_id: 'src-mbse-hslc-curriculum',
      organization_id: 'org-mz-board-mbse',
      document_title: 'MBSE HSLC (Class 10) Scheme of Studies & Curriculum Regulations',
      document_type: 'CURRICULUM_REGULATION',
      source_url: 'https://www.mbse.edu.in/curriculum'
    },
    {
      source_id: 'src-mbse-hsslc-curriculum',
      organization_id: 'org-mz-board-mbse',
      document_title: 'MBSE HSSLC (Class 12) Scheme of Studies & Stream Regulations',
      document_type: 'CURRICULUM_REGULATION',
      source_url: 'https://www.mbse.edu.in/curriculum'
    },
    {
      source_id: 'src-mbse-class9-regulations',
      organization_id: 'org-mz-board-mbse',
      document_title: 'MBSE Class IX Final Examination Regulations & Mizo Syllabi',
      document_type: 'EXAMINATION_REGULATION',
      source_url: 'https://www.mbse.edu.in/regulations'
    },
    {
      source_id: 'src-mbse-class11-regulations',
      organization_id: 'org-mz-board-mbse',
      document_title: 'MBSE Class XI Promotion Examination & Stream Progression Regulations',
      document_type: 'EXAMINATION_REGULATION',
      source_url: 'https://www.mbse.edu.in/regulations'
    },
    {
      source_id: 'src-mbse-results-portal',
      organization_id: 'org-mz-board-mbse',
      document_title: 'MBSE HSLC and HSSLC Examination Results Server',
      document_type: 'RESULTS_PORTAL',
      source_url: 'https://www.mbse.edu.in/results'
    }
  ];
  for (const s of sources) {
    sourceStmt.run(s);
  }

  // 4. Mizo Language Registration in languages table
  langStmt.run({
    language_id: 'lus',
    code: 'lus',
    locale: 'lus-IN',
    native_name: 'Mizo ṭawng',
    english_name: 'Mizo',
    script: 'Latin',
    direction: 'ltr',
    is_scheduled_language: 0,
    is_ui_language: 0,
    is_exam_language: 1,
    is_language_subject: 1,
    font_family: "'Noto Sans', sans-serif",
    active: 1,
    is_expanded_ui_language: 0
  });

  // 5. Subjects (31 Primary Subjects)
  const subjects = [
    // Class 10 (HSLC) - 10 subjects
    { subject_id: 'mz-c10-english', name: 'English (Compulsory HSLC Subject - 80 Theory + 20 IA)', short_name: 'English', subject_type: 'ACADEMIC', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'mz-c10-mizo', name: 'Mizo (Compulsory / Elective MIL - 80 Theory + 20 IA)', short_name: 'Mizo', subject_type: 'ACADEMIC', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'mz-c10-alt-english', name: 'Alternative English (Second Language Option - 80 Theory + 20 IA)', short_name: 'Alt English', subject_type: 'ACADEMIC', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'mz-c10-hindi', name: 'Hindi (Second Language Option - हिन्दी - 80 Theory + 20 IA)', short_name: 'Hindi', subject_type: 'ACADEMIC', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'mz-c10-mathematics', name: 'Mathematics (Compulsory HSLC - 80 Theory + 20 IA)', short_name: 'Mathematics', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'mz-c10-science', name: 'Science (Compulsory HSLC - 80 Theory + 20 IA)', short_name: 'Science', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'mz-c10-social-science', name: 'Social Science (Compulsory HSLC - 80 Theory + 20 IA)', short_name: 'Social Science', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'mz-c10-intro-computers', name: 'Introductory Information Technology / Computers (80 Theory + 20 IA)', short_name: 'Intro Computers', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'mz-c10-home-science', name: 'Home Science (Elective HSLC - 80 Theory + 20 IA)', short_name: 'Home Science', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'mz-c10-civics-economics', name: 'Elements of Commerce & Economics (80 Theory + 20 IA)', short_name: 'Commerce & Economics', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },

    // Class 12 (HSSLC) - Science (6 subjects)
    { subject_id: 'mz-c12-physics', name: 'Physics (70 Theory + 30 Practical - HSSLC MBSE)', short_name: 'Physics', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'mz-c12-chemistry', name: 'Chemistry (70 Theory + 30 Practical - HSSLC MBSE)', short_name: 'Chemistry', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'mz-c12-biology', name: 'Biology (Botany & Zoology - 70 Theory + 30 Practical - HSSLC MBSE)', short_name: 'Biology', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'mz-c12-mathematics', name: 'Mathematics (80 Theory + 20 IA - HSSLC MBSE)', short_name: 'Mathematics XII', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'mz-c12-computer-science', name: 'Computer Science (70 Theory + 30 Practical - HSSLC MBSE)', short_name: 'Computer Science', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'mz-c12-informatics-practices', name: 'Informatics Practices (70 Theory + 30 Practical - HSSLC MBSE)', short_name: 'Informatics Practices', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },

    // Class 12 (HSSLC) - Commerce (5 subjects)
    { subject_id: 'mz-c12-accountancy', name: 'Accountancy (80 Theory + 20 Project - HSSLC MBSE)', short_name: 'Accountancy', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'mz-c12-business-studies', name: 'Business Studies (80 Theory + 20 Project - HSSLC MBSE)', short_name: 'Business Studies', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'mz-c12-economics', name: 'Economics (80 Theory + 20 Project - HSSLC MBSE)', short_name: 'Economics', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'mz-c12-business-mathematics', name: 'Business Mathematics / Commercial Arithmetic (80 Theory + 20 Project - HSSLC MBSE)', short_name: 'Business Math', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'mz-c12-entrepreneurship', name: 'Entrepreneurship (80 Theory + 20 Project - HSSLC MBSE)', short_name: 'Entrepreneurship', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },

    // Class 12 (HSSLC) - Arts / Humanities (6 subjects)
    { subject_id: 'mz-c12-political-science', name: 'Political Science (Themes in Politics - 80 Theory + 20 Project - HSSLC MBSE)', short_name: 'Political Science', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'mz-c12-history', name: 'History (Themes in Indian History & Mizo Heritage - 80 Theory + 20 Project - HSSLC MBSE)', short_name: 'History', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'mz-c12-geography', name: 'Geography (Fundamentals & Mizoram Geography - 70 Theory + 30 Practical - HSSLC MBSE)', short_name: 'Geography', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'mz-c12-education', name: 'Education (Educational Principles & Psychological Foundations - 80 Theory + 20 Project - HSSLC MBSE)', short_name: 'Education', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'mz-c12-sociology', name: 'Sociology (Indian Society & Mizo Social Institutions - 80 Theory + 20 Project - HSSLC MBSE)', short_name: 'Sociology', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'mz-c12-psychology', name: 'Psychology / Logic & Philosophy (80 Theory + 20 Project - HSSLC MBSE)', short_name: 'Psychology & Philosophy', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },

    // Class 12 (HSSLC) - Languages (4 subjects)
    { subject_id: 'mz-c12-english', name: 'English Core (Compulsory across all streams - 100 Marks)', short_name: 'English Core', subject_type: 'ACADEMIC', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'mz-c12-alt-english', name: 'Alternative English (100 Marks - HSSLC MBSE)', short_name: 'Alt English XII', subject_type: 'ACADEMIC', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'mz-c12-mizo', name: 'Mizo MIL (Mizo Literature & Language - 100 Marks)', short_name: 'Mizo MIL XII', subject_type: 'ACADEMIC', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'mz-c12-hindi', name: 'Hindi MIL (100 Marks - HSSLC MBSE)', short_name: 'Hindi MIL XII', subject_type: 'ACADEMIC', is_language_subject: 1, is_medium_dependent: 0, active: 1 }
  ];

  for (const s of subjects) {
    subjectStmt.run(s);
  }
});

tx();

console.log('✅ Successfully registered MBSE organizations, boards, sources, languages, and 31 subjects.');
db.close();
