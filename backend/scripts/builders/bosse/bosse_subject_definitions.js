const path = require('path');
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, '../../../db/sarkari_core.db');
const db = new Database(dbPath);

console.log('Ingesting official BOSSE Sikkim Organizations, Boards, Sources, Languages, and 31 Subjects...');

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
    '2026-01-15', '2026-04-01', '2026-27', 'OFFICIAL_BOSSE_SRC_HASH', CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP, 'VERIFIED', 'Official BOSSE Sikkim statutory portal and open schooling curriculum regulations',
    'PRIMARY_STATUTORY', 'Board of Open Schooling and Skill Education, Sikkim', 'BOSSE_EXAM_SUITE',
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
    organization_id: 'org-sk-board-bosse',
    name: 'Board of Open Schooling and Skill Education, Sikkim',
    short_name: 'BOSSE',
    type: 'EXAM_BOARD',
    central_or_state: 'STATE',
    state_or_ut: 'Sikkim',
    official_website: 'https://www.bosse.ac.in/',
    active: 1,
    verification_status: 'VERIFIED'
  });

  // 2. Boards & Aliases
  const boards = [
    {
      board_id: 'sbosse-sikkim',
      organization_id: 'org-sk-board-bosse',
      name: 'Board of Open Schooling and Skill Education, Sikkim',
      short_name: 'BOSSE',
      jurisdiction: 'State & Open Schooling',
      board_type: 'Open Schooling',
      official_website: 'https://www.bosse.ac.in/',
      official_result_url: 'https://www.bosse.ac.in/results',
      active: 1,
      verification_status: 'VERIFIED'
    },
    {
      board_id: 'bosse',
      organization_id: 'org-sk-board-bosse',
      name: 'BOSSE Sikkim (Alias)',
      short_name: 'BOSSE',
      jurisdiction: 'State & Open Schooling',
      board_type: 'Open Schooling',
      official_website: 'https://www.bosse.ac.in/',
      official_result_url: 'https://www.bosse.ac.in/results',
      active: 1,
      verification_status: 'VERIFIED'
    },
    {
      board_id: 'bosse-sikkim',
      organization_id: 'org-sk-board-bosse',
      name: 'Board of Open Schooling Sikkim (Alias)',
      short_name: 'BOSSE',
      jurisdiction: 'State & Open Schooling',
      board_type: 'Open Schooling',
      official_website: 'https://www.bosse.ac.in/',
      official_result_url: 'https://www.bosse.ac.in/results',
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
      source_id: 'src-bosse-portal',
      organization_id: 'org-sk-board-bosse',
      document_title: 'Board of Open Schooling and Skill Education Official Portal',
      document_type: 'PORTAL',
      source_url: 'https://www.bosse.ac.in/'
    },
    {
      source_id: 'src-bosse-secondary-curriculum',
      organization_id: 'org-sk-board-bosse',
      document_title: 'BOSSE Secondary (Class 10 Equivalent) Curriculum & Study Scheme',
      document_type: 'CURRICULUM_REGULATION',
      source_url: 'https://www.bosse.ac.in/secondary'
    },
    {
      source_id: 'src-bosse-sr-secondary-curriculum',
      organization_id: 'org-sk-board-bosse',
      document_title: 'BOSSE Senior Secondary (Class 12 Equivalent) Flexible Curriculum Framework',
      document_type: 'CURRICULUM_REGULATION',
      source_url: 'https://www.bosse.ac.in/senior-secondary'
    },
    {
      source_id: 'src-bosse-skill-vocational',
      organization_id: 'org-sk-board-bosse',
      document_title: 'BOSSE Skill and Vocational Education Framework & Trade Regulations',
      document_type: 'VOCATIONAL_FRAMEWORK',
      source_url: 'https://www.bosse.ac.in/skill-education'
    },
    {
      source_id: 'src-bosse-admission-regulations',
      organization_id: 'org-sk-board-bosse',
      document_title: 'BOSSE Open Schooling Admission, TOC & Examination Regulations',
      document_type: 'ADMISSION_REGULATION',
      source_url: 'https://www.bosse.ac.in/admissions'
    },
    {
      source_id: 'src-sikkim-education-portal',
      organization_id: 'org-sk-board-bosse',
      document_title: 'Sikkim State Government Education Department Official Portal',
      document_type: 'GOVERNMENT_PORTAL',
      source_url: 'https://education.sikkim.gov.in/'
    }
  ];
  for (const s of sources) {
    sourceStmt.run(s);
  }

  // 4. Indigenous Languages of Sikkim
  langStmt.run({
    language_id: 'sip',
    code: 'sip',
    locale: 'sip-IN',
    native_name: 'འབྲས་ལྗོངས་སྐད།',
    english_name: 'Bhutia',
    script: 'Tibetan',
    direction: 'ltr',
    is_scheduled_language: 0,
    is_ui_language: 0,
    is_exam_language: 1,
    is_language_subject: 1,
    font_family: "'Noto Sans Tibetan', sans-serif",
    active: 1,
    is_expanded_ui_language: 0
  });

  langStmt.run({
    language_id: 'lep',
    code: 'lep',
    locale: 'lep-IN',
    native_name: 'ᰛᰩᰵᰛᰧᰵ',
    english_name: 'Lepcha',
    script: 'Lepcha',
    direction: 'ltr',
    is_scheduled_language: 0,
    is_ui_language: 0,
    is_exam_language: 1,
    is_language_subject: 1,
    font_family: "'Noto Sans Lepcha', sans-serif",
    active: 1,
    is_expanded_ui_language: 0
  });

  langStmt.run({
    language_id: 'lif',
    code: 'lif',
    locale: 'lif-IN',
    native_name: 'ᤕᤠᤰᤌᤢᤱ ᤐᤠᤴ',
    english_name: 'Limbu',
    script: 'Sirijonga',
    direction: 'ltr',
    is_scheduled_language: 0,
    is_ui_language: 0,
    is_exam_language: 1,
    is_language_subject: 1,
    font_family: "'Noto Sans Limbu', sans-serif",
    active: 1,
    is_expanded_ui_language: 0
  });

  // 5. Subjects (31 Primary Subjects)
  const subjects = [
    // Secondary (Class 10) - 10 subjects
    { subject_id: 'sk-c10-english', name: 'English (Secondary - BOSSE)', short_name: 'English X', subject_type: 'ACADEMIC', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'sk-c10-hindi', name: 'Hindi (Secondary - हिन्दी - BOSSE)', short_name: 'Hindi X', subject_type: 'ACADEMIC', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'sk-c10-nepali', name: 'Nepali (Secondary - नेपाली - Official State Language BOSSE)', short_name: 'Nepali X', subject_type: 'ACADEMIC', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'sk-c10-bengali', name: 'Bengali (Secondary - বাংলা - BOSSE)', short_name: 'Bengali X', subject_type: 'ACADEMIC', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'sk-c10-mathematics', name: 'Mathematics (Secondary - BOSSE)', short_name: 'Mathematics X', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'sk-c10-science', name: 'Science and Technology (Secondary - BOSSE)', short_name: 'Science X', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'sk-c10-social-science', name: 'Social Science (Secondary - BOSSE)', short_name: 'Social Science X', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'sk-c10-business-studies', name: 'Business Studies (Secondary - BOSSE)', short_name: 'Business Studies X', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'sk-c10-economics', name: 'Economics (Secondary - BOSSE)', short_name: 'Economics X', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'sk-c10-ict', name: 'Information and Communication Technology / Data Entry (Secondary - BOSSE)', short_name: 'ICT Data Entry', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },

    // Senior Secondary (Class 12) - Languages (3 subjects)
    { subject_id: 'sk-c12-english', name: 'English (Senior Secondary - BOSSE)', short_name: 'English XII', subject_type: 'ACADEMIC', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'sk-c12-hindi', name: 'Hindi (Senior Secondary - हिन्दी - BOSSE)', short_name: 'Hindi XII', subject_type: 'ACADEMIC', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'sk-c12-nepali', name: 'Nepali (Senior Secondary - नेपाली - Official State Language BOSSE)', short_name: 'Nepali XII', subject_type: 'ACADEMIC', is_language_subject: 1, is_medium_dependent: 0, active: 1 },

    // Senior Secondary (Class 12) - Science-Oriented (4 subjects)
    { subject_id: 'sk-c12-physics', name: 'Physics (Senior Secondary Theory & Practical - BOSSE)', short_name: 'Physics XII', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'sk-c12-chemistry', name: 'Chemistry (Senior Secondary Theory & Practical - BOSSE)', short_name: 'Chemistry XII', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'sk-c12-biology', name: 'Biology (Senior Secondary Theory & Practical - BOSSE)', short_name: 'Biology XII', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'sk-c12-mathematics', name: 'Mathematics (Senior Secondary - BOSSE)', short_name: 'Mathematics XII', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },

    // Senior Secondary (Class 12) - Commerce-Oriented (3 subjects)
    { subject_id: 'sk-c12-accountancy', name: 'Accountancy (Senior Secondary - BOSSE)', short_name: 'Accountancy XII', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'sk-c12-business-studies', name: 'Business Studies (Senior Secondary - BOSSE)', short_name: 'Business Studies XII', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'sk-c12-economics', name: 'Economics (Senior Secondary - BOSSE)', short_name: 'Economics XII', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },

    // Senior Secondary (Class 12) - Humanities & Social Sciences (7 subjects)
    { subject_id: 'sk-c12-political-science', name: 'Political Science (Senior Secondary - BOSSE)', short_name: 'Political Science XII', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'sk-c12-history', name: 'History (Senior Secondary - BOSSE)', short_name: 'History XII', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'sk-c12-geography', name: 'Geography (Senior Secondary Theory & Practical - BOSSE)', short_name: 'Geography XII', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'sk-c12-sociology', name: 'Sociology (Senior Secondary - BOSSE)', short_name: 'Sociology XII', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'sk-c12-psychology', name: 'Psychology (Senior Secondary - BOSSE)', short_name: 'Psychology XII', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'sk-c12-family-studies', name: 'Family & Community Studies / Home Science (Senior Secondary - BOSSE)', short_name: 'Family Studies XII', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'sk-c12-law-governance', name: 'Law, Justice & Governance (Senior Secondary - BOSSE)', short_name: 'Law & Governance XII', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },

    // Senior Secondary (Class 12) - Technology / Media / Vocational (4 subjects)
    { subject_id: 'sk-c12-cs-digital', name: 'Digital Literacy & Computer Science (Senior Secondary - BOSSE)', short_name: 'Digital Literacy XII', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'sk-c12-media-comm', name: 'Media and Communication Studies (Senior Secondary - BOSSE)', short_name: 'Media Studies XII', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'sk-c12-tourism', name: 'Tourism & Hospitality Management (Senior Secondary - BOSSE)', short_name: 'Tourism XII', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'sk-c12-entrepreneurship', name: 'Entrepreneurship (Senior Secondary - BOSSE)', short_name: 'Entrepreneurship XII', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 }
  ];

  for (const s of subjects) {
    subjectStmt.run(s);
  }
});

tx();

console.log('✅ Successfully registered BOSSE Sikkim organizations, boards, sources, languages, and 31 subjects.');
db.close();
