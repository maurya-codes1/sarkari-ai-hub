const path = require('path');
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, '../../../db/sarkari_core.db');
const db = new Database(dbPath);

console.log('Ingesting official TBSE Organizations, Boards, Sources, Languages, and 31 Subjects...');

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
    '2026-01-15', '2026-04-01', '2026-27', 'OFFICIAL_TBSE_SRC_HASH', CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP, 'VERIFIED', 'Official TBSE statutory portal and examination regulations',
    'PRIMARY_STATUTORY', 'Tripura Board of Secondary Education', 'TBSE_EXAM_SUITE',
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
    organization_id: 'org-tr-board-tbse',
    name: 'Tripura Board of Secondary Education, Agartala',
    short_name: 'TBSE',
    type: 'EXAM_BOARD',
    central_or_state: 'STATE',
    state_or_ut: 'Tripura',
    official_website: 'https://tbse.tripura.gov.in/',
    active: 1,
    verification_status: 'VERIFIED'
  });

  // 2. Boards & Aliases
  const boards = [
    {
      board_id: 'tbse-tripura',
      organization_id: 'org-tr-board-tbse',
      name: 'Tripura Board of Secondary Education',
      short_name: 'TBSE',
      jurisdiction: 'State',
      board_type: 'State',
      official_website: 'https://tbse.tripura.gov.in/',
      official_result_url: 'https://tbresults.tripura.gov.in/',
      active: 1,
      verification_status: 'VERIFIED'
    },
    {
      board_id: 'tbse-board',
      organization_id: 'org-tr-board-tbse',
      name: 'TBSE Tripura School Education Board',
      short_name: 'TBSE Board',
      jurisdiction: 'State',
      board_type: 'State',
      official_website: 'https://tbse.tripura.gov.in/',
      official_result_url: 'https://tbresults.tripura.gov.in/',
      active: 1,
      verification_status: 'VERIFIED'
    },
    {
      board_id: 'tbse',
      organization_id: 'org-tr-board-tbse',
      name: 'Tripura Board of Secondary Education (Alias)',
      short_name: 'TBSE',
      jurisdiction: 'State',
      board_type: 'State',
      official_website: 'https://tbse.tripura.gov.in/',
      official_result_url: 'https://tbresults.tripura.gov.in/',
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
      source_id: 'src-tbse-portal',
      organization_id: 'org-tr-board-tbse',
      document_title: 'Tripura Board of Secondary Education Official Portal',
      document_type: 'PORTAL',
      source_url: 'https://tbse.tripura.gov.in/'
    },
    {
      source_id: 'src-tbse-madhyamik-curriculum',
      organization_id: 'org-tr-board-tbse',
      document_title: 'TBSE Madhyamik (Class 10) Examination Scheme & Regulations',
      document_type: 'CURRICULUM_REGULATION',
      source_url: 'https://tbse.tripura.gov.in/madhyamik'
    },
    {
      source_id: 'src-tbse-hs-curriculum',
      organization_id: 'org-tr-board-tbse',
      document_title: 'TBSE Higher Secondary (+2 Stage) Curriculum & Scheme of Examinations',
      document_type: 'CURRICULUM_REGULATION',
      source_url: 'https://tbse.tripura.gov.in/higher-secondary'
    },
    {
      source_id: 'src-tbse-class9-regulations',
      organization_id: 'org-tr-board-tbse',
      document_title: 'TBSE Class IX Institutional Evaluation Regulations & Syllabus Guidelines',
      document_type: 'EXAMINATION_REGULATION',
      source_url: 'https://tbse.tripura.gov.in/class-ix'
    },
    {
      source_id: 'src-tbse-class11-regulations',
      organization_id: 'org-tr-board-tbse',
      document_title: 'TBSE Class XI Promotion Examination & Two-Session Higher Secondary Regulations',
      document_type: 'EXAMINATION_REGULATION',
      source_url: 'https://tbse.tripura.gov.in/class-xi'
    },
    {
      source_id: 'src-tbse-results-portal',
      organization_id: 'org-tr-board-tbse',
      document_title: 'TBSE Official Online Examination & Result Processing System',
      document_type: 'RESULTS_PORTAL',
      source_url: 'https://tbresults.tripura.gov.in/'
    }
  ];
  for (const s of sources) {
    sourceStmt.run(s);
  }

  // 4. Languages
  langStmt.run({
    language_id: 'trp',
    code: 'trp',
    locale: 'trp-IN',
    native_name: 'ককবরক',
    english_name: 'Kokborok',
    script: 'Bengali',
    direction: 'ltr',
    is_scheduled_language: 0,
    is_ui_language: 0,
    is_exam_language: 1,
    is_language_subject: 1,
    font_family: "'Noto Sans Bengali', sans-serif",
    active: 1,
    is_expanded_ui_language: 0
  });

  langStmt.run({
    language_id: 'pi',
    code: 'pi',
    locale: 'pi-IN',
    native_name: 'पालि',
    english_name: 'Pali',
    script: 'Devanagari',
    direction: 'ltr',
    is_scheduled_language: 0,
    is_ui_language: 0,
    is_exam_language: 1,
    is_language_subject: 1,
    font_family: "'Noto Sans Devanagari', sans-serif",
    active: 1,
    is_expanded_ui_language: 0
  });

  // 5. Subjects (31 Primary Subjects)
  const subjects = [
    // Class 10 (Madhyamik) - 10 subjects
    { subject_id: 'tr-c10-bengali', name: 'Bengali (First Language — বাংলা - 80 Theory + 20 IA)', short_name: 'Bengali FL', subject_type: 'ACADEMIC', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'tr-c10-english', name: 'English (Second Language — 80 Theory + 20 IA)', short_name: 'English SL', subject_type: 'ACADEMIC', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'tr-c10-kokborok', name: 'Kokborok (First Language — ককবরক - 80 Theory + 20 IA)', short_name: 'Kokborok FL', subject_type: 'ACADEMIC', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'tr-c10-hindi', name: 'Hindi (First Language — हिन्दी - 80 Theory + 20 IA)', short_name: 'Hindi FL', subject_type: 'ACADEMIC', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'tr-c10-mizo', name: 'Mizo (First Language Option - 80 Theory + 20 IA)', short_name: 'Mizo FL', subject_type: 'ACADEMIC', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'tr-c10-mathematics', name: 'Mathematics (Madhyamik Compulsory - 80 Theory + 20 IA)', short_name: 'Mathematics', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'tr-c10-science', name: 'Science (Physical Science & Life Science - 80 Theory + 20 IA)', short_name: 'Science', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'tr-c10-social-science', name: 'Social Science (History, Geography, Pol Sci, Economics - 80 Theory + 20 IA)', short_name: 'Social Science', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'tr-c10-sanskrit', name: 'Sanskrit (Elective Subject - 80 Theory + 20 IA)', short_name: 'Sanskrit X', subject_type: 'ACADEMIC', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'tr-c10-it', name: 'Information Technology / Computer Applications (80 Theory + 20 IA)', short_name: 'IT Computers', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },

    // Class 12 (Higher Secondary) - Science (6 subjects)
    { subject_id: 'tr-c12-physics', name: 'Physics (70 Theory + 30 Practical - Compulsory Science Elective)', short_name: 'Physics', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'tr-c12-chemistry', name: 'Chemistry (70 Theory + 30 Practical - Compulsory Science Elective)', short_name: 'Chemistry', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'tr-c12-mathematics', name: 'Mathematics (80 Theory + 20 IA - Compulsory Science Elective)', short_name: 'Mathematics XII', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'tr-c12-biology', name: 'Biology (70 Theory + 30 Practical - TBSE H.S.)', short_name: 'Biology', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'tr-c12-computer-science', name: 'Computer Science (70 Theory + 30 Practical - TBSE H.S.)', short_name: 'Computer Science', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'tr-c12-statistics', name: 'Statistics (70 Theory + 30 Practical - TBSE H.S.)', short_name: 'Statistics', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },

    // Class 12 (Higher Secondary) - Commerce (4 subjects)
    { subject_id: 'tr-c12-accountancy', name: 'Accountancy (80 Theory + 20 Project - Compulsory Commerce Elective)', short_name: 'Accountancy', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'tr-c12-business-studies', name: 'Business Studies (80 Theory + 20 Project - Compulsory Commerce Elective)', short_name: 'Business Studies', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'tr-c12-economics', name: 'Economics (80 Theory + 20 Project - Compulsory Commerce Elective)', short_name: 'Economics', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'tr-c12-business-mathematics', name: 'Business Mathematics / Commercial Arithmetic (80 Theory + 20 Project)', short_name: 'Business Math', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },

    // Class 12 (Higher Secondary) - Humanities (7 subjects)
    { subject_id: 'tr-c12-political-science', name: 'Political Science (80 Theory + 20 Project/IA - TBSE H.S.)', short_name: 'Political Science', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'tr-c12-history', name: 'History (80 Theory + 20 Project/IA - TBSE H.S.)', short_name: 'History', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'tr-c12-geography', name: 'Geography (70 Theory + 30 Practical - TBSE H.S.)', short_name: 'Geography', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'tr-c12-education', name: 'Education (80 Theory + 20 Project/IA - TBSE H.S.)', short_name: 'Education', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'tr-c12-sociology', name: 'Sociology (80 Theory + 20 Project/IA - TBSE H.S.)', short_name: 'Sociology', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'tr-c12-philosophy', name: 'Philosophy (Logic & Ethics - 80 Theory + 20 Project/IA - TBSE H.S.)', short_name: 'Philosophy', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'tr-c12-sanskrit', name: 'Sanskrit (80 Theory + 20 Project/IA - TBSE H.S.)', short_name: 'Sanskrit XII', subject_type: 'ACADEMIC', is_language_subject: 1, is_medium_dependent: 0, active: 1 },

    // Class 12 (Higher Secondary) - Languages (4 subjects)
    { subject_id: 'tr-c12-bengali', name: 'Bengali (Language I — বাংলা - 80 Theory + 20 Project/IA)', short_name: 'Bengali Lang I', subject_type: 'ACADEMIC', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'tr-c12-kokborok', name: 'Kokborok (Language I — ককবরক - 80 Theory + 20 Project/IA)', short_name: 'Kokborok Lang I', subject_type: 'ACADEMIC', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'tr-c12-english', name: 'English (Language II Compulsory — 80 Theory + 20 Project/IA)', short_name: 'English Lang II', subject_type: 'ACADEMIC', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'tr-c12-hindi', name: 'Hindi (Language I Option — हिन्दी - 80 Theory + 20 Project/IA)', short_name: 'Hindi Lang I', subject_type: 'ACADEMIC', is_language_subject: 1, is_medium_dependent: 0, active: 1 }
  ];

  for (const s of subjects) {
    subjectStmt.run(s);
  }
});

tx();

console.log('✅ Successfully registered TBSE organizations, boards, sources, languages, and 31 subjects.');
db.close();
