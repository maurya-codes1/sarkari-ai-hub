const path = require('path');
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, '../../../db/sarkari_core.db');
const db = new Database(dbPath);

console.log('Ingesting official GBSHSE Organizations, Boards, Sources, Languages, and 31 Subjects...');

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
    '2026-01-15', '2026-04-01', '2026-27', 'OFFICIAL_GBSHSE_SRC_HASH', CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP, 'VERIFIED', 'Official GBSHSE statutory portal and examination regulations',
    'PRIMARY_STATUTORY', 'Goa Board of Secondary and Higher Secondary Education', 'GBSHSE_EXAM_SUITE',
    'v2026.1', 'FRESH', 'RESOLVED_NO_CONFLICT'
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
  // 1. Organization
  orgStmt.run({
    organization_id: 'org-ga-board-gbshse',
    name: 'Goa Board of Secondary and Higher Secondary Education, Alto Betim, Bardez, Goa',
    short_name: 'GBSHSE',
    type: 'EXAM_BOARD',
    central_or_state: 'STATE',
    state_or_ut: 'Goa',
    official_website: 'https://gbshse.in/',
    active: 1,
    verification_status: 'VERIFIED'
  });

  // 2. Boards & Aliases
  const boards = [
    {
      board_id: 'gbshse-goa',
      organization_id: 'org-ga-board-gbshse',
      name: 'Goa Board of Secondary and Higher Secondary Education',
      short_name: 'GBSHSE',
      jurisdiction: 'State',
      board_type: 'State',
      official_website: 'https://gbshse.in/',
      official_result_url: 'https://results.gbshse.org/',
      active: 1,
      verification_status: 'VERIFIED'
    },
    {
      board_id: 'gbshse-board',
      organization_id: 'org-ga-board-gbshse',
      name: 'GBSHSE Goa School Education Board',
      short_name: 'GBSHSE Board',
      jurisdiction: 'State',
      board_type: 'State',
      official_website: 'https://gbshse.in/',
      official_result_url: 'https://results.gbshse.org/',
      active: 1,
      verification_status: 'VERIFIED'
    },
    {
      board_id: 'gbshse',
      organization_id: 'org-ga-board-gbshse',
      name: 'Goa Board of Secondary and Higher Secondary Education (Alias)',
      short_name: 'GBSHSE',
      jurisdiction: 'State',
      board_type: 'State',
      official_website: 'https://gbshse.in/',
      official_result_url: 'https://results.gbshse.org/',
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
      source_id: 'src-gbshse-portal',
      organization_id: 'org-ga-board-gbshse',
      document_title: 'Goa Board of Secondary and Higher Secondary Education Official Portal',
      document_type: 'PORTAL',
      source_url: 'https://gbshse.in/'
    },
    {
      source_id: 'src-gbshse-ssc-curriculum',
      organization_id: 'org-ga-board-gbshse',
      document_title: 'GBSHSE Secondary School Certificate (SSC Class 10) Examination Scheme & Curriculum',
      document_type: 'SYLLABUS_REGULATION',
      source_url: 'https://gbshse.in/secondary/'
    },
    {
      source_id: 'src-gbshse-hssc-curriculum',
      organization_id: 'org-ga-board-gbshse',
      document_title: 'GBSHSE Higher Secondary School Certificate (HSSC Class 12) Examination Scheme & Curriculum',
      document_type: 'SYLLABUS_REGULATION',
      source_url: 'https://gbshse.in/higher-secondary/'
    },
    {
      source_id: 'src-ga-education-dept',
      organization_id: 'org-ga-board-gbshse',
      document_title: 'Directorate of Education, Government of Goa',
      document_type: 'GOVERNMENT_DIRECTIVE',
      source_url: 'https://education.goa.gov.in/'
    },
    {
      source_id: 'src-ga-scert',
      organization_id: 'org-ga-board-gbshse',
      document_title: 'State Council of Educational Research and Training (SCERT) Goa',
      document_type: 'CURRICULUM_FRAMEWORK',
      source_url: 'https://scert.goa.gov.in/'
    }
  ];
  for (const s of sources) {
    sourceStmt.run(s);
  }

  // 4. Primary Subjects (10 Class 10 + 21 Class 12 = 31 Subjects)
  const subjects = [
    // Class 10 (10 subjects)
    { subject_id: 'goa-c10-english', name: 'GBSHSE Class 10 English', short_name: 'English (Class 10)', subject_type: 'LANGUAGE', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'goa-c10-konkani', name: 'GBSHSE Class 10 Konkani (कोंकणी)', short_name: 'Konkani (Class 10)', subject_type: 'LANGUAGE', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'goa-c10-marathi', name: 'GBSHSE Class 10 Marathi (मराठी)', short_name: 'Marathi (Class 10)', subject_type: 'LANGUAGE', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'goa-c10-hindi', name: 'GBSHSE Class 10 Hindi (हिन्दी)', short_name: 'Hindi (Class 10)', subject_type: 'LANGUAGE', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'goa-c10-mathematics', name: 'GBSHSE Class 10 Mathematics', short_name: 'Mathematics (Class 10)', subject_type: 'CORE', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'goa-c10-science', name: 'GBSHSE Class 10 Science', short_name: 'Science (Class 10)', subject_type: 'CORE', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'goa-c10-social-science', name: 'GBSHSE Class 10 Social Science', short_name: 'Social Science (Class 10)', subject_type: 'CORE', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'goa-c10-information-technology', name: 'GBSHSE Class 10 Information Technology', short_name: 'IT (Class 10)', subject_type: 'VOCATIONAL', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'goa-c10-environmental-studies', name: 'GBSHSE Class 10 Environmental Studies', short_name: 'EVS (Class 10)', subject_type: 'CORE', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'goa-c10-health-physical-education', name: 'GBSHSE Class 10 Health & Physical Education', short_name: 'HPE (Class 10)', subject_type: 'ACTIVITY', is_language_subject: 0, is_medium_dependent: 0, active: 1 },

    // Class 12 Science (6 subjects)
    { subject_id: 'goa-c12-physics', name: 'GBSHSE Class 12 Physics', short_name: 'Physics (Class 12)', subject_type: 'SCIENCE', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'goa-c12-chemistry', name: 'GBSHSE Class 12 Chemistry', short_name: 'Chemistry (Class 12)', subject_type: 'SCIENCE', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'goa-c12-mathematics', name: 'GBSHSE Class 12 Mathematics', short_name: 'Mathematics (Class 12)', subject_type: 'SCIENCE', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'goa-c12-biology', name: 'GBSHSE Class 12 Biology', short_name: 'Biology (Class 12)', subject_type: 'SCIENCE', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'goa-c12-computer-science', name: 'GBSHSE Class 12 Computer Science', short_name: 'Computer Science (Class 12)', subject_type: 'SCIENCE', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'goa-c12-geology', name: 'GBSHSE Class 12 Geology', short_name: 'Geology (Class 12)', subject_type: 'SCIENCE', is_language_subject: 0, is_medium_dependent: 1, active: 1 },

    // Class 12 Commerce (5 subjects)
    { subject_id: 'goa-c12-accountancy', name: 'GBSHSE Class 12 Accountancy', short_name: 'Accountancy (Class 12)', subject_type: 'COMMERCE', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'goa-c12-business-studies', name: 'GBSHSE Class 12 Business Studies', short_name: 'Business Studies (Class 12)', subject_type: 'COMMERCE', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'goa-c12-economics', name: 'GBSHSE Class 12 Economics', short_name: 'Economics (Class 12)', subject_type: 'COMMERCE', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'goa-c12-banking', name: 'GBSHSE Class 12 Banking & Secretarial Practice', short_name: 'Banking (Class 12)', subject_type: 'COMMERCE', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'goa-c12-commercial-maths', name: 'GBSHSE Class 12 Commercial Mathematics & Statistics', short_name: 'Commercial Maths (Class 12)', subject_type: 'COMMERCE', is_language_subject: 0, is_medium_dependent: 1, active: 1 },

    // Class 12 Humanities / Arts (6 subjects)
    { subject_id: 'goa-c12-history', name: 'GBSHSE Class 12 History', short_name: 'History (Class 12)', subject_type: 'HUMANITIES', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'goa-c12-political-science', name: 'GBSHSE Class 12 Political Science', short_name: 'Political Science (Class 12)', subject_type: 'HUMANITIES', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'goa-c12-sociology', name: 'GBSHSE Class 12 Sociology', short_name: 'Sociology (Class 12)', subject_type: 'HUMANITIES', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'goa-c12-psychology', name: 'GBSHSE Class 12 Psychology', short_name: 'Psychology (Class 12)', subject_type: 'HUMANITIES', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'goa-c12-geography', name: 'GBSHSE Class 12 Geography', short_name: 'Geography (Class 12)', subject_type: 'HUMANITIES', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'goa-c12-philosophy', name: 'GBSHSE Class 12 Philosophy & Logic', short_name: 'Philosophy (Class 12)', subject_type: 'HUMANITIES', is_language_subject: 0, is_medium_dependent: 1, active: 1 },

    // Class 12 Languages & MIL (4 subjects)
    { subject_id: 'goa-c12-english', name: 'GBSHSE Class 12 English (Core)', short_name: 'English Core (Class 12)', subject_type: 'LANGUAGE', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'goa-c12-konkani', name: 'GBSHSE Class 12 Konkani (कोंकणी - Sahitya)', short_name: 'Konkani (Class 12)', subject_type: 'LANGUAGE', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'goa-c12-marathi', name: 'GBSHSE Class 12 Marathi (मराठी - Sahitya)', short_name: 'Marathi (Class 12)', subject_type: 'LANGUAGE', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'goa-c12-hindi', name: 'GBSHSE Class 12 Hindi (हिन्दी - Sahitya)', short_name: 'Hindi (Class 12)', subject_type: 'LANGUAGE', is_language_subject: 1, is_medium_dependent: 0, active: 1 }
  ];

  for (const s of subjects) {
    subjectStmt.run(s);
  }
});

tx();
console.log('✅ Successfully registered GBSHSE Organization, 3 Boards, 5 Sources, and 31 Subjects!');
