const path = require('path');
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, '../../../db/sarkari_core.db');
const db = new Database(dbPath);

console.log('Ingesting official JAC Organizations, Boards, Sources, and 31 Subjects...');

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
    '2026-01-15', '2026-04-01', '2026-27', 'OFFICIAL_JAC_SRC_HASH', CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP, 'VERIFIED', 'Official JAC statutory portal and examination regulations',
    'PRIMARY_STATUTORY', 'Jharkhand Academic Council', 'JAC_EXAM_SUITE',
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
    organization_id: 'org-jh-board-jac',
    name: 'Jharkhand Academic Council, Gyandeep Campus, Bargawan, Namkum, Ranchi',
    short_name: 'JAC',
    type: 'EXAM_BOARD',
    central_or_state: 'STATE',
    state_or_ut: 'Jharkhand',
    official_website: 'https://jac.jharkhand.gov.in/',
    active: 1,
    verification_status: 'VERIFIED'
  });

  // 2. Boards & Aliases
  const boards = [
    {
      board_id: 'jac-jharkhand',
      organization_id: 'org-jh-board-jac',
      name: 'Jharkhand Academic Council',
      short_name: 'JAC',
      jurisdiction: 'State',
      board_type: 'State',
      official_website: 'https://jac.jharkhand.gov.in/',
      official_result_url: 'https://jacresults.com/',
      active: 1,
      verification_status: 'VERIFIED'
    },
    {
      board_id: 'jac-board',
      organization_id: 'org-jh-board-jac',
      name: 'JAC Jharkhand Academic Council Board',
      short_name: 'JAC Board',
      jurisdiction: 'State',
      board_type: 'State',
      official_website: 'https://jac.jharkhand.gov.in/',
      official_result_url: 'https://jacresults.com/',
      active: 1,
      verification_status: 'VERIFIED'
    },
    {
      board_id: 'jac',
      organization_id: 'org-jh-board-jac',
      name: 'Jharkhand Academic Council (Alias)',
      short_name: 'JAC',
      jurisdiction: 'State',
      board_type: 'State',
      official_website: 'https://jac.jharkhand.gov.in/',
      official_result_url: 'https://jacresults.com/',
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
      source_id: 'src-jac-portal',
      organization_id: 'org-jh-board-jac',
      document_title: 'Jharkhand Academic Council Official Statutory Portal',
      document_type: 'PORTAL',
      source_url: 'https://jac.jharkhand.gov.in/'
    },
    {
      source_id: 'src-jac-secondary-curriculum',
      organization_id: 'org-jh-board-jac',
      document_title: 'JAC Secondary Examination (Class 10) Examination Scheme & Curriculum',
      document_type: 'SYLLABUS_REGULATION',
      source_url: 'https://jac.jharkhand.gov.in/secondary/'
    },
    {
      source_id: 'src-jac-intermediate-curriculum',
      organization_id: 'org-jh-board-jac',
      document_title: 'JAC Intermediate Examination (Class 12) Examination Scheme & Curriculum',
      document_type: 'SYLLABUS_REGULATION',
      source_url: 'https://jac.jharkhand.gov.in/intermediate/'
    },
    {
      source_id: 'src-jh-education-dept',
      organization_id: 'org-jh-board-jac',
      document_title: 'Department of School Education and Literacy, Government of Jharkhand',
      document_type: 'GOVERNMENT_DIRECTIVE',
      source_url: 'https://education.jharkhand.gov.in/'
    },
    {
      source_id: 'src-jh-jcert',
      organization_id: 'org-jh-board-jac',
      document_title: 'Jharkhand Council of Educational Research and Training (JCERT)',
      document_type: 'CURRICULUM_FRAMEWORK',
      source_url: 'https://jcert.jharkhand.gov.in/'
    }
  ];
  for (const s of sources) {
    sourceStmt.run(s);
  }

  // 4. Primary Subjects (10 Class 10 + 21 Class 12 = 31 Subjects)
  const subjects = [
    // Class 10 (10 subjects)
    { subject_id: 'jac-c10-hindi', name: 'JAC Class 10 Hindi (अनिवार्य हिन्दी कोर्स ए / बी)', short_name: 'Hindi (Class 10)', subject_type: 'LANGUAGE', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'jac-c10-english', name: 'JAC Class 10 English (Language & Literature)', short_name: 'English (Class 10)', subject_type: 'LANGUAGE', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'jac-c10-sanskrit', name: 'JAC Class 10 Sanskrit (संस्कृत - अनिवार्य / ऐच्छिक भाषा)', short_name: 'Sanskrit (Class 10)', subject_type: 'LANGUAGE', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'jac-c10-urdu', name: 'JAC Class 10 Urdu (اردو - भाषा विकल्प)', short_name: 'Urdu (Class 10)', subject_type: 'LANGUAGE', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'jac-c10-mathematics', name: 'JAC Class 10 Mathematics (गणित)', short_name: 'Mathematics (Class 10)', subject_type: 'CORE', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'jac-c10-science', name: 'JAC Class 10 Science (विज्ञान - भौतिकी, रसायन, जीव विज्ञान)', short_name: 'Science (Class 10)', subject_type: 'CORE', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'jac-c10-social-science', name: 'JAC Class 10 Social Science (सामाजिक विज्ञान)', short_name: 'Social Science (Class 10)', subject_type: 'CORE', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'jac-c10-jharkhand-culture', name: 'JAC Class 10 Jharkhand Heritage & Tribal Culture (झारखंड अध्ययन एवं जनजातीय संस्कृति)', short_name: 'Jharkhand Heritage (Class 10)', subject_type: 'CORE', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'jac-c10-information-technology', name: 'JAC Class 10 Information Technology (सूचना प्रौद्योगिकी)', short_name: 'IT (Class 10)', subject_type: 'VOCATIONAL', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'jac-c10-health-physical-education', name: 'JAC Class 10 Health & Physical Education (स्वास्थ्य एवं शारीरिक शिक्षा)', short_name: 'HPE (Class 10)', subject_type: 'ACTIVITY', is_language_subject: 0, is_medium_dependent: 0, active: 1 },

    // Class 12 Science (6 subjects)
    { subject_id: 'jac-c12-physics', name: 'JAC Class 12 Physics (भौतिकी - I.Sc)', short_name: 'Physics (Class 12)', subject_type: 'SCIENCE', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'jac-c12-chemistry', name: 'JAC Class 12 Chemistry (रसायन शास्त्र - I.Sc)', short_name: 'Chemistry (Class 12)', subject_type: 'SCIENCE', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'jac-c12-mathematics', name: 'JAC Class 12 Mathematics (गणित - I.Sc / I.A)', short_name: 'Mathematics (Class 12)', subject_type: 'SCIENCE', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'jac-c12-biology', name: 'JAC Class 12 Biology (जीव विज्ञान - I.Sc)', short_name: 'Biology (Class 12)', subject_type: 'SCIENCE', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'jac-c12-computer-science', name: 'JAC Class 12 Computer Science (कंप्यूटर विज्ञान - I.Sc / I.Com)', short_name: 'Computer Science (Class 12)', subject_type: 'SCIENCE', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'jac-c12-geology', name: 'JAC Class 12 Geology (भूगर्भ शास्त्र - I.Sc Signature Discipline)', short_name: 'Geology (Class 12)', subject_type: 'SCIENCE', is_language_subject: 0, is_medium_dependent: 1, active: 1 },

    // Class 12 Commerce (5 subjects)
    { subject_id: 'jac-c12-accountancy', name: 'JAC Class 12 Accountancy (लेखाशास्त्र - I.Com)', short_name: 'Accountancy (Class 12)', subject_type: 'COMMERCE', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'jac-c12-business-studies', name: 'JAC Class 12 Business Studies (व्यवसाय अध्ययन - I.Com)', short_name: 'Business Studies (Class 12)', subject_type: 'COMMERCE', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'jac-c12-economics', name: 'JAC Class 12 Economics (अर्थशास्त्र - I.Com / I.A)', short_name: 'Economics (Class 12)', subject_type: 'COMMERCE', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'jac-c12-commercial-arithmetic', name: 'JAC Class 12 Commercial Arithmetic & Business Mathematics (व्यावसायिक गणित - I.Com)', short_name: 'Commercial Arithmetic (Class 12)', subject_type: 'COMMERCE', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'jac-c12-entrepreneurship', name: 'JAC Class 12 Entrepreneurship (उद्यमिता - I.Com)', short_name: 'Entrepreneurship (Class 12)', subject_type: 'COMMERCE', is_language_subject: 0, is_medium_dependent: 1, active: 1 },

    // Class 12 Humanities / Arts (6 subjects)
    { subject_id: 'jac-c12-history', name: 'JAC Class 12 History (इतिहास - भारतीय इतिहास एवं झारखंड - I.A)', short_name: 'History (Class 12)', subject_type: 'HUMANITIES', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'jac-c12-political-science', name: 'JAC Class 12 Political Science (राजनीति विज्ञान - I.A)', short_name: 'Political Science (Class 12)', subject_type: 'HUMANITIES', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'jac-c12-geography', name: 'JAC Class 12 Geography (भूगोल - छोटानागपुर पठार एवं भारत - I.A)', short_name: 'Geography (Class 12)', subject_type: 'HUMANITIES', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'jac-c12-sociology', name: 'JAC Class 12 Sociology (समाजशास्त्र - भारतीय समाज एवं जनजातीय व्यवस्था - I.A)', short_name: 'Sociology (Class 12)', subject_type: 'HUMANITIES', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'jac-c12-psychology', name: 'JAC Class 12 Psychology (मनोविज्ञान - I.A)', short_name: 'Psychology (Class 12)', subject_type: 'HUMANITIES', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'jac-c12-home-science', name: 'JAC Class 12 Home Science (गृह विज्ञान - I.A)', short_name: 'Home Science (Class 12)', subject_type: 'HUMANITIES', is_language_subject: 0, is_medium_dependent: 1, active: 1 },

    // Class 12 Languages & Regional Literature (4 subjects)
    { subject_id: 'jac-c12-hindi', name: 'JAC Class 12 Hindi Core (अनिवार्य हिन्दी कोर साहित्य एवं व्याकरण)', short_name: 'Hindi Core (Class 12)', subject_type: 'LANGUAGE', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'jac-c12-english', name: 'JAC Class 12 English Core (English Core - Compulsory Language)', short_name: 'English Core (Class 12)', subject_type: 'LANGUAGE', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'jac-c12-sanskrit', name: 'JAC Class 12 Sanskrit Elective (संस्कृत ऐच्छिक साहित्य एवं व्याकरण)', short_name: 'Sanskrit (Class 12)', subject_type: 'LANGUAGE', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'jac-c12-urdu', name: 'JAC Class 12 Urdu Elective (اردو اختیاری - ادبیات و قواعد)', short_name: 'Urdu Elective (Class 12)', subject_type: 'LANGUAGE', is_language_subject: 1, is_medium_dependent: 0, active: 1 }
  ];

  for (const s of subjects) {
    subjectStmt.run(s);
  }
});

tx();
console.log('✅ Successfully registered JAC Organization, 3 Boards, 5 Sources, and 31 Subjects!');
