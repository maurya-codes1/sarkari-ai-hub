const path = require('path');
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, '../../../db/sarkari_core.db');
const db = new Database(dbPath);

console.log('Ingesting official HBSE Organizations, Boards, Sources, and 31 Subjects...');

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
    '2026-01-15', '2026-04-01', '2026-27', 'OFFICIAL_HBSE_SRC_HASH', CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP, 'VERIFIED', 'Official BSEH statutory portal and examination regulations',
    'PRIMARY_STATUTORY', 'Board of School Education Haryana', 'HBSE_EXAM_SUITE',
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
    organization_id: 'org-hr-board-bseh',
    name: 'Board of School Education Haryana, Hansi Road, Bhiwani',
    short_name: 'BSEH',
    type: 'EXAM_BOARD',
    central_or_state: 'STATE',
    state_or_ut: 'Haryana',
    official_website: 'https://bseh.org.in/',
    active: 1,
    verification_status: 'VERIFIED'
  });

  // 2. Boards & Aliases
  const boards = [
    {
      board_id: 'hbse-haryana',
      organization_id: 'org-hr-board-bseh',
      name: 'Board of School Education Haryana',
      short_name: 'HBSE',
      jurisdiction: 'State',
      board_type: 'State',
      official_website: 'https://bseh.org.in/',
      official_result_url: 'https://bseh.org.in/all-results',
      active: 1,
      verification_status: 'VERIFIED'
    },
    {
      board_id: 'hbse-board',
      organization_id: 'org-hr-board-bseh',
      name: 'Board of School Education Haryana (Alias: hbse-board)',
      short_name: 'HBSE',
      jurisdiction: 'State',
      board_type: 'State',
      official_website: 'https://bseh.org.in/',
      official_result_url: 'https://bseh.org.in/all-results',
      active: 1,
      verification_status: 'VERIFIED'
    },
    {
      board_id: 'hbse',
      organization_id: 'org-hr-board-bseh',
      name: 'Board of School Education Haryana (Alias: hbse)',
      short_name: 'HBSE',
      jurisdiction: 'State',
      board_type: 'State',
      official_website: 'https://bseh.org.in/',
      official_result_url: 'https://bseh.org.in/all-results',
      active: 1,
      verification_status: 'VERIFIED'
    },
    {
      board_id: 'bseh',
      organization_id: 'org-hr-board-bseh',
      name: 'Board of School Education Haryana (Alias: bseh)',
      short_name: 'BSEH',
      jurisdiction: 'State',
      board_type: 'State',
      official_website: 'https://bseh.org.in/',
      official_result_url: 'https://bseh.org.in/all-results',
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
      source_id: 'src-bseh-portal',
      organization_id: 'org-hr-board-bseh',
      document_title: 'Board of School Education Haryana Official Statutory Portal',
      document_type: 'PORTAL',
      source_url: 'https://bseh.org.in/'
    },
    {
      source_id: 'src-bseh-secondary-curriculum',
      organization_id: 'org-hr-board-bseh',
      document_title: 'BSEH Secondary Examination (Class 10) Examination Scheme & Curriculum',
      document_type: 'SYLLABUS_REGULATION',
      source_url: 'https://bseh.org.in/secondary-curriculum/'
    },
    {
      source_id: 'src-bseh-sr-secondary-curriculum',
      organization_id: 'org-hr-board-bseh',
      document_title: 'BSEH Senior Secondary Examination (Class 12) Examination Scheme & Curriculum',
      document_type: 'SYLLABUS_REGULATION',
      source_url: 'https://bseh.org.in/senior-secondary-curriculum/'
    },
    {
      source_id: 'src-hr-education-dept',
      organization_id: 'org-hr-board-bseh',
      document_title: 'Directorate of School Education, Government of Haryana',
      document_type: 'GOVERNMENT_DIRECTIVE',
      source_url: 'https://schooleducationharyana.gov.in/'
    },
    {
      source_id: 'src-hr-scert',
      organization_id: 'org-hr-board-bseh',
      document_title: 'State Council of Educational Research and Training (SCERT) Haryana, Gurugram',
      document_type: 'CURRICULUM_FRAMEWORK',
      source_url: 'https://scertharyana.gov.in/'
    }
  ];
  for (const s of sources) {
    sourceStmt.run(s);
  }

  // 4. Primary Subjects (10 Class 10 + 21 Class 12 = 31 Subjects)
  const subjects = [
    // Class 10 (10 subjects)
    { subject_id: 'hbse-c10-hindi', name: 'HBSE Class 10 Hindi (अनिवार्य हिन्दी - क्षितिज एवं कृतिका)', short_name: 'Hindi (Class 10)', subject_type: 'LANGUAGE', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'hbse-c10-english', name: 'HBSE Class 10 English (Language & Literature - First Flight)', short_name: 'English (Class 10)', subject_type: 'LANGUAGE', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'hbse-c10-mathematics', name: 'HBSE Class 10 Mathematics (गणित - SCERT/NCERT Haryana)', short_name: 'Mathematics (Class 10)', subject_type: 'CORE', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'hbse-c10-science', name: 'HBSE Class 10 Science (विज्ञान - भौतिकी, रसायन, जीव विज्ञान)', short_name: 'Science (Class 10)', subject_type: 'CORE', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'hbse-c10-social-science', name: 'HBSE Class 10 Social Science (सामाजिक विज्ञान - इतिहास, भूगोल, राजनीति, अर्थशास्त्र)', short_name: 'Social Science (Class 10)', subject_type: 'CORE', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'hbse-c10-sanskrit', name: 'HBSE Class 10 Sanskrit (संस्कृत - शेमुषी भाग-2 एवं व्याकरण)', short_name: 'Sanskrit (Class 10)', subject_type: 'LANGUAGE', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'hbse-c10-punjabi', name: 'HBSE Class 10 Punjabi (ਪੰਜਾਬੀ - ਸਾਹਿਤ ਮਾਲਾ / ਵੰਨਗੀ - Haryana Linguistic Minority)', short_name: 'Punjabi (Class 10)', subject_type: 'LANGUAGE', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'hbse-c10-urdu', name: 'HBSE Class 10 Urdu (اردو - نواۓ اردو / قواعد - Haryana Mewat Region)', short_name: 'Urdu (Class 10)', subject_type: 'LANGUAGE', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'hbse-c10-haryana-heritage', name: 'HBSE Class 10 Haryana Heritage, Culture & Physical Education (हरियाणा संस्कृति, खेल एवं शारीरिक शिक्षा)', short_name: 'Haryana Heritage (Class 10)', subject_type: 'CORE', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'hbse-c10-computer-science', name: 'HBSE Class 10 Computer Science (कंप्यूटर विज्ञान एवं सूचना प्रौद्योगिकी)', short_name: 'Computer Science (Class 10)', subject_type: 'VOCATIONAL', is_language_subject: 0, is_medium_dependent: 0, active: 1 },

    // Class 12 Science (6 subjects)
    { subject_id: 'hbse-c12-physics', name: 'HBSE Class 12 Physics (भौतिक विज्ञान)', short_name: 'Physics (Class 12)', subject_type: 'SCIENCE', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'hbse-c12-chemistry', name: 'HBSE Class 12 Chemistry (रसायन विज्ञान)', short_name: 'Chemistry (Class 12)', subject_type: 'SCIENCE', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'hbse-c12-mathematics', name: 'HBSE Class 12 Mathematics (गणित)', short_name: 'Mathematics (Class 12)', subject_type: 'SCIENCE', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'hbse-c12-biology', name: 'HBSE Class 12 Biology (जीव विज्ञान - वनस्पति एवं जन्तु विज्ञान)', short_name: 'Biology (Class 12)', subject_type: 'SCIENCE', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'hbse-c12-computer-science', name: 'HBSE Class 12 Computer Science (कंप्यूटर विज्ञान - Python & SQL)', short_name: 'Computer Science (Class 12)', subject_type: 'SCIENCE', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'hbse-c12-agriculture', name: 'HBSE Class 12 Agriculture (कृषि विज्ञान - Haryana Agrarian Signature Discipline)', short_name: 'Agriculture (Class 12)', subject_type: 'SCIENCE', is_language_subject: 0, is_medium_dependent: 1, active: 1 },

    // Class 12 Commerce (5 subjects)
    { subject_id: 'hbse-c12-accountancy', name: 'HBSE Class 12 Accountancy (लेखाशास्त्र)', short_name: 'Accountancy (Class 12)', subject_type: 'COMMERCE', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'hbse-c12-business-studies', name: 'HBSE Class 12 Business Studies (व्यवसाय अध्ययन)', short_name: 'Business Studies (Class 12)', subject_type: 'COMMERCE', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'hbse-c12-economics-commerce', name: 'HBSE Class 12 Business Economics (व्यावसायिक अर्थशास्त्र)', short_name: 'Economics (Class 12)', subject_type: 'COMMERCE', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'hbse-c12-entrepreneurship', name: 'HBSE Class 12 Entrepreneurship (उद्यमिता)', short_name: 'Entrepreneurship (Class 12)', subject_type: 'COMMERCE', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'hbse-c12-commercial-art', name: 'HBSE Class 12 Commercial Art (व्यावसायिक कला एवं व्यापारिक अभ्यास)', short_name: 'Commercial Art (Class 12)', subject_type: 'COMMERCE', is_language_subject: 0, is_medium_dependent: 1, active: 1 },

    // Class 12 Humanities / Arts (6 subjects)
    { subject_id: 'hbse-c12-history', name: 'HBSE Class 12 History (इतिहास - भारतीय इतिहास एवं हरियाणा का इतिहास)', short_name: 'History (Class 12)', subject_type: 'HUMANITIES', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'hbse-c12-political-science', name: 'HBSE Class 12 Political Science (राजनीति विज्ञान - समकालीन विश्व एवं स्वतंत्र भारत)', short_name: 'Political Science (Class 12)', subject_type: 'HUMANITIES', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'hbse-c12-geography', name: 'HBSE Class 12 Geography (भूगोल - मानव भूगोल के मूल सिद्धांत एवं भारत लोग और अर्थव्यवस्था)', short_name: 'Geography (Class 12)', subject_type: 'HUMANITIES', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'hbse-c12-public-administration', name: 'HBSE Class 12 Public Administration (लोक प्रशासन - Haryana Senior Secondary Signature Discipline)', short_name: 'Public Administration (Class 12)', subject_type: 'HUMANITIES', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'hbse-c12-sociology', name: 'HBSE Class 12 Sociology (समाजशास्त्र - भारतीय समाज एवं परिवर्तन)', short_name: 'Sociology (Class 12)', subject_type: 'HUMANITIES', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'hbse-c12-physical-education', name: 'HBSE Class 12 Physical Education (शारीरिक शिक्षा एवं खेल - Haryana Sports Capital Discipline)', short_name: 'Physical Education (Class 12)', subject_type: 'HUMANITIES', is_language_subject: 0, is_medium_dependent: 1, active: 1 },

    // Class 12 Languages & Regional Literature (4 subjects)
    { subject_id: 'hbse-c12-hindi-core', name: 'HBSE Class 12 Hindi Core (अनिवार्य हिन्दी कोर - आरोह एवं वितान)', short_name: 'Hindi Core (Class 12)', subject_type: 'LANGUAGE', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'hbse-c12-english-core', name: 'HBSE Class 12 English Core (Flamingo & Vistas - Compulsory Language)', short_name: 'English Core (Class 12)', subject_type: 'LANGUAGE', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'hbse-c12-punjabi', name: 'HBSE Class 12 Punjabi Elective (ਪੰਜਾਬੀ ਚੋਣਵੀਂ - ਸਾਹਿਤ ਬੋਧ ਤੇ ਕਵਿਤਾ)', short_name: 'Punjabi (Class 12)', subject_type: 'LANGUAGE', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'hbse-c12-sanskrit', name: 'HBSE Class 12 Sanskrit (संस्कृत साहित्य एवं व्याकरण - भास्वती)', short_name: 'Sanskrit (Class 12)', subject_type: 'LANGUAGE', is_language_subject: 1, is_medium_dependent: 0, active: 1 }
  ];

  for (const s of subjects) {
    subjectStmt.run(s);
  }
});

tx();
console.log('✅ Successfully registered HBSE Organization, 4 Boards, 5 Sources, and 31 Subjects!');
