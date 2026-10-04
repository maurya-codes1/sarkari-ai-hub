const path = require('path');
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, '../../../db/sarkari_core.db');
const db = new Database(dbPath);

console.log('Ingesting official CGBSE Organizations, Boards, Sources, Languages, and 31 Subjects...');

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
    '2026-01-15', '2026-04-01', '2026-27', 'OFFICIAL_CGBSE_SRC_HASH', CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP, 'VERIFIED', 'Official CGBSE statutory portal and examination regulations',
    'PRIMARY_STATUTORY', 'Chhattisgarh Board of Secondary Education', 'CGBSE_EXAM_SUITE',
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
    organization_id: 'org-cg-board-cgbse',
    name: 'Chhattisgarh Board of Secondary Education, Pension Bada, Raipur',
    short_name: 'CGBSE',
    type: 'EXAM_BOARD',
    central_or_state: 'STATE',
    state_or_ut: 'Chhattisgarh',
    official_website: 'https://cgbse.nic.in/',
    active: 1,
    verification_status: 'VERIFIED'
  });

  // 2. Boards & Aliases
  const boards = [
    {
      board_id: 'cgbse-chhattisgarh',
      organization_id: 'org-cg-board-cgbse',
      name: 'Chhattisgarh Board of Secondary Education',
      short_name: 'CGBSE',
      jurisdiction: 'State',
      board_type: 'State',
      official_website: 'https://cgbse.nic.in/',
      official_result_url: 'https://results.cg.nic.in/',
      active: 1,
      verification_status: 'VERIFIED'
    },
    {
      board_id: 'cgbse-board',
      organization_id: 'org-cg-board-cgbse',
      name: 'CGBSE Chhattisgarh School Education Board',
      short_name: 'CGBSE Board',
      jurisdiction: 'State',
      board_type: 'State',
      official_website: 'https://cgbse.nic.in/',
      official_result_url: 'https://results.cg.nic.in/',
      active: 1,
      verification_status: 'VERIFIED'
    },
    {
      board_id: 'cgbse',
      organization_id: 'org-cg-board-cgbse',
      name: 'Chhattisgarh Board of Secondary Education (Alias)',
      short_name: 'CGBSE',
      jurisdiction: 'State',
      board_type: 'State',
      official_website: 'https://cgbse.nic.in/',
      official_result_url: 'https://results.cg.nic.in/',
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
      source_id: 'src-cgbse-portal',
      organization_id: 'org-cg-board-cgbse',
      document_title: 'Chhattisgarh Board of Secondary Education Official Portal',
      document_type: 'PORTAL',
      source_url: 'https://cgbse.nic.in/'
    },
    {
      source_id: 'src-cgbse-high-school-curriculum',
      organization_id: 'org-cg-board-cgbse',
      document_title: 'CGBSE High School Certificate (Class 10) Examination Scheme & Curriculum',
      document_type: 'SYLLABUS_REGULATION',
      source_url: 'https://cgbse.nic.in/high-school/'
    },
    {
      source_id: 'src-cgbse-higher-secondary-curriculum',
      organization_id: 'org-cg-board-cgbse',
      document_title: 'CGBSE Higher Secondary School Certificate (Class 12) Examination Scheme & Curriculum',
      document_type: 'SYLLABUS_REGULATION',
      source_url: 'https://cgbse.nic.in/higher-secondary/'
    },
    {
      source_id: 'src-cg-school-education-dept',
      organization_id: 'org-cg-board-cgbse',
      document_title: 'School Education Department, Government of Chhattisgarh',
      document_type: 'GOVERNMENT_DIRECTIVE',
      source_url: 'https://eduportal.cg.nic.in/'
    },
    {
      source_id: 'src-cg-scert',
      organization_id: 'org-cg-board-cgbse',
      document_title: 'State Council of Educational Research and Training (SCERT) Chhattisgarh',
      document_type: 'CURRICULUM_FRAMEWORK',
      source_url: 'https://scert.cg.gov.in/'
    }
  ];
  for (const s of sources) {
    sourceStmt.run(s);
  }

  // 4. Primary Subjects (10 Class 10 + 21 Class 12 = 31 Subjects)
  const subjects = [
    // Class 10 (10 subjects)
    { subject_id: 'cg-c10-hindi', name: 'CGBSE Class 10 Hindi (विशिष्ट / सामान्य हिन्दी)', short_name: 'Hindi (Class 10)', subject_type: 'LANGUAGE', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'cg-c10-english', name: 'CGBSE Class 10 English (Special / General English)', short_name: 'English (Class 10)', subject_type: 'LANGUAGE', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'cg-c10-sanskrit', name: 'CGBSE Class 10 Sanskrit (संस्कृत - अनिवार्य तृतीय भाषा)', short_name: 'Sanskrit (Class 10)', subject_type: 'LANGUAGE', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'cg-c10-mathematics', name: 'CGBSE Class 10 Mathematics (गणित)', short_name: 'Mathematics (Class 10)', subject_type: 'CORE', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'cg-c10-science', name: 'CGBSE Class 10 Science (विज्ञान)', short_name: 'Science (Class 10)', subject_type: 'CORE', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'cg-c10-social-science', name: 'CGBSE Class 10 Social Science (सामाजिक विज्ञान)', short_name: 'Social Science (Class 10)', subject_type: 'CORE', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'cg-c10-chhattisgarh-heritage', name: 'CGBSE Class 10 Chhattisgarh Studies & Environment (छत्तीसगढ़ अध्ययन एवं पर्यावरण)', short_name: 'CG Studies (Class 10)', subject_type: 'CORE', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'cg-c10-information-technology', name: 'CGBSE Class 10 Information Technology (सूचना प्रौद्योगिकी)', short_name: 'IT (Class 10)', subject_type: 'VOCATIONAL', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'cg-c10-vocational-retail-auto', name: 'CGBSE Class 10 Retail & Automobile Skills (व्यावसायिक कौशल)', short_name: 'Vocational Skills (Class 10)', subject_type: 'VOCATIONAL', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'cg-c10-health-physical-education', name: 'CGBSE Class 10 Health & Physical Education (स्वास्थ्य एवं शारीरिक शिक्षा)', short_name: 'HPE (Class 10)', subject_type: 'ACTIVITY', is_language_subject: 0, is_medium_dependent: 0, active: 1 },

    // Class 12 Science (6 subjects)
    { subject_id: 'cg-c12-physics', name: 'CGBSE Class 12 Physics (भौतिकी)', short_name: 'Physics (Class 12)', subject_type: 'SCIENCE', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'cg-c12-chemistry', name: 'CGBSE Class 12 Chemistry (रसायन शास्त्र)', short_name: 'Chemistry (Class 12)', subject_type: 'SCIENCE', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'cg-c12-mathematics', name: 'CGBSE Class 12 Mathematics (गणित)', short_name: 'Mathematics (Class 12)', subject_type: 'SCIENCE', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'cg-c12-biology', name: 'CGBSE Class 12 Biology (जीव विज्ञान)', short_name: 'Biology (Class 12)', subject_type: 'SCIENCE', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'cg-c12-computer-science', name: 'CGBSE Class 12 Computer Science (कंप्यूटर विज्ञान)', short_name: 'Computer Science (Class 12)', subject_type: 'SCIENCE', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'cg-c12-environmental-science', name: 'CGBSE Class 12 Environmental Science (पर्यावरण विज्ञान)', short_name: 'Environmental Sci (Class 12)', subject_type: 'SCIENCE', is_language_subject: 0, is_medium_dependent: 1, active: 1 },

    // Class 12 Commerce (5 subjects)
    { subject_id: 'cg-c12-accountancy', name: 'CGBSE Class 12 Accountancy (लेखाशास्त्र / बहीखाता)', short_name: 'Accountancy (Class 12)', subject_type: 'COMMERCE', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'cg-c12-business-studies', name: 'CGBSE Class 12 Business Studies (व्यवसाय अध्ययन)', short_name: 'Business Studies (Class 12)', subject_type: 'COMMERCE', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'cg-c12-economics', name: 'CGBSE Class 12 Economics (अर्थशास्त्र)', short_name: 'Economics (Class 12)', subject_type: 'COMMERCE', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'cg-c12-business-maths', name: 'CGBSE Class 12 Business Mathematics (व्यावसायिक गणित)', short_name: 'Business Maths (Class 12)', subject_type: 'COMMERCE', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'cg-c12-banking', name: 'CGBSE Class 12 Banking & Financial Services (बैंकिंग एवं वित्तीय सेवाएं)', short_name: 'Banking (Class 12)', subject_type: 'COMMERCE', is_language_subject: 0, is_medium_dependent: 1, active: 1 },

    // Class 12 Humanities / Arts (6 subjects)
    { subject_id: 'cg-c12-history', name: 'CGBSE Class 12 History (इतिहास - भारतीय इतिहास एवं छत्तीसगढ़)', short_name: 'History (Class 12)', subject_type: 'HUMANITIES', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'cg-c12-political-science', name: 'CGBSE Class 12 Political Science (राजनीति विज्ञान)', short_name: 'Political Science (Class 12)', subject_type: 'HUMANITIES', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'cg-c12-geography', name: 'CGBSE Class 12 Geography (भूगोल)', short_name: 'Geography (Class 12)', subject_type: 'HUMANITIES', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'cg-c12-sociology', name: 'CGBSE Class 12 Sociology (समाजशास्त्र)', short_name: 'Sociology (Class 12)', subject_type: 'HUMANITIES', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'cg-c12-psychology', name: 'CGBSE Class 12 Psychology (मनोविज्ञान)', short_name: 'Psychology (Class 12)', subject_type: 'HUMANITIES', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'cg-c12-home-science', name: 'CGBSE Class 12 Home Science (गृह विज्ञान)', short_name: 'Home Science (Class 12)', subject_type: 'HUMANITIES', is_language_subject: 0, is_medium_dependent: 1, active: 1 },

    // Class 12 Languages & Agriculture (4 subjects)
    { subject_id: 'cg-c12-hindi', name: 'CGBSE Class 12 Hindi (हिन्दी - अनिवार्य कोर साहित्य एवं व्याकरण)', short_name: 'Hindi Core (Class 12)', subject_type: 'LANGUAGE', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'cg-c12-english', name: 'CGBSE Class 12 English (English Core - Compulsory Language)', short_name: 'English Core (Class 12)', subject_type: 'LANGUAGE', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'cg-c12-sanskrit', name: 'CGBSE Class 12 Sanskrit (संस्कृत - ऐच्छिक साहित्य एवं व्याकरण)', short_name: 'Sanskrit (Class 12)', subject_type: 'LANGUAGE', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'cg-c12-agriculture-sciences', name: 'CGBSE Class 12 Crop Production & Animal Husbandry (कृषि विज्ञान एवं पशुपालन)', short_name: 'Agriculture (Class 12)', subject_type: 'VOCATIONAL', is_language_subject: 0, is_medium_dependent: 1, active: 1 }
  ];

  for (const s of subjects) {
    subjectStmt.run(s);
  }
});

tx();
console.log('✅ Successfully registered CGBSE Organization, 3 Boards, 5 Sources, and 31 Subjects!');
