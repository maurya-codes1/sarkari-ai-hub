const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '../../../db/sarkari_core.db');
const db = new Database(dbPath);

console.log('📌 Registering MBOSE Organizations, Boards, Sources, and Subjects...');

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
    '2026-01-15', '2026-04-01', '2026-27', 'OFFICIAL_MBOSE_SRC_HASH', CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP, 'VERIFIED', 'Official MBOSE statutory portal and examination documents',
    'PRIMARY_STATUTORY', 'Meghalaya Board of School Education', 'MBOSE_EXAM_SUITE',
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
  // 1. Organizations
  orgStmt.run({
    organization_id: 'org-ml-board-mbose',
    name: 'Meghalaya Board of School Education, Tura & Shillong',
    short_name: 'MBOSE',
    type: 'EXAM_BOARD',
    central_or_state: 'STATE',
    state_or_ut: 'Meghalaya',
    official_website: 'https://www.mbose.in/',
    active: 1,
    verification_status: 'VERIFIED'
  });

  // 2. Boards
  const boards = [
    {
      board_id: 'mbose-meghalaya',
      organization_id: 'org-ml-board-mbose',
      name: 'Meghalaya Board of School Education',
      short_name: 'MBOSE',
      jurisdiction: 'State',
      board_type: 'State',
      official_website: 'https://www.mbose.in/',
      official_result_url: 'http://megresults.nic.in/',
      active: 1,
      verification_status: 'VERIFIED'
    },
    {
      board_id: 'mbose-board',
      organization_id: 'org-ml-board-mbose',
      name: 'MBOSE Meghalaya School Education Board',
      short_name: 'MBOSE Board',
      jurisdiction: 'State',
      board_type: 'State',
      official_website: 'https://www.mbose.in/',
      official_result_url: 'http://megresults.nic.in/',
      active: 1,
      verification_status: 'VERIFIED'
    },
    {
      board_id: 'mbose',
      organization_id: 'org-ml-board-mbose',
      name: 'Meghalaya Board of School Education (Alias)',
      short_name: 'MBOSE',
      jurisdiction: 'State',
      board_type: 'State',
      official_website: 'https://www.mbose.in/',
      official_result_url: 'http://megresults.nic.in/',
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
      source_id: 'src-mbose-portal',
      organization_id: 'org-ml-board-mbose',
      document_title: 'Meghalaya Board of School Education Official Portal',
      document_type: 'PORTAL',
      source_url: 'https://www.mbose.in/'
    },
    {
      source_id: 'src-mbose-sslc-curriculum',
      organization_id: 'org-ml-board-mbose',
      document_title: 'MBOSE SSLC (Class 10) Scheme of Studies & Curriculum Regulations',
      document_type: 'CURRICULUM_REGULATION',
      source_url: 'https://www.mbose.in/sslc-syllabus'
    },
    {
      source_id: 'src-mbose-hsslc-curriculum',
      organization_id: 'org-ml-board-mbose',
      document_title: 'MBOSE HSSLC (Class 12) Scheme of Studies & Stream Regulations',
      document_type: 'CURRICULUM_REGULATION',
      source_url: 'https://www.mbose.in/hsslc-syllabus'
    },
    {
      source_id: 'src-mbose-results-portal',
      organization_id: 'org-ml-board-mbose',
      document_title: 'Meghalaya Government Examination Results Portal',
      document_type: 'PORTAL',
      source_url: 'http://megresults.nic.in/'
    }
  ];
  for (const s of sources) {
    sourceStmt.run(s);
  }

  // 4. Subjects (31 Primary Subjects)
  const subjects = [
    // Class 10 (SSLC) - 10 subjects
    { subject_id: 'ml-c10-english', name: 'English (Compulsory SSLC Subject - 80 Theory + 20 IA)', short_name: 'English', subject_type: 'ACADEMIC', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'ml-c10-mil-khasi', name: 'Khasi MIL (Ka Ktien Khasi - Modern Indian Language - 80 Theory + 20 IA)', short_name: 'Khasi MIL', subject_type: 'ACADEMIC', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'ml-c10-mil-garo', name: 'Garo MIL (A·chik Ku·sik - Modern Indian Language - 80 Theory + 20 IA)', short_name: 'Garo MIL', subject_type: 'ACADEMIC', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'ml-c10-alt-english', name: 'Alternative English (SSLC Language Option - 80 Theory + 20 IA)', short_name: 'Alt English', subject_type: 'ACADEMIC', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'ml-c10-mil-hindi', name: 'Hindi MIL (हिन्दी - Modern Indian Language - 80 Theory + 20 IA)', short_name: 'Hindi MIL', subject_type: 'ACADEMIC', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'ml-c10-mil-bengali', name: 'Bengali MIL (বাংলা - Modern Indian Language - 80 Theory + 20 IA)', short_name: 'Bengali MIL', subject_type: 'ACADEMIC', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'ml-c10-mil-assamese', name: 'Assamese MIL (অসমীয়া - Modern Indian Language - 80 Theory + 20 IA)', short_name: 'Assamese MIL', subject_type: 'ACADEMIC', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'ml-c10-mathematics', name: 'Mathematics (Compulsory SSLC - 80 Theory + 20 IA)', short_name: 'Mathematics', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'ml-c10-science', name: 'Science & Technology (Compulsory SSLC - 80 Theory + 20 IA)', short_name: 'Science', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'ml-c10-social-science', name: 'Social Science (Compulsory SSLC - 80 Theory + 20 IA)', short_name: 'Social Science', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 1, active: 1 },

    // Class 12 (HSSLC) - Science (6 subjects)
    { subject_id: 'ml-c12-physics', name: 'Physics (70 Theory + 30 Practical - HSSLC MBOSE)', short_name: 'Physics', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'ml-c12-chemistry', name: 'Chemistry (70 Theory + 30 Practical - HSSLC MBOSE)', short_name: 'Chemistry', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'ml-c12-biology', name: 'Biology (Botany & Zoology - 70 Theory + 30 Practical - HSSLC MBOSE)', short_name: 'Biology', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'ml-c12-mathematics', name: 'Mathematics (80 Theory + 20 IA - HSSLC MBOSE)', short_name: 'Mathematics XII', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'ml-c12-computer-science', name: 'Computer Science (70 Theory + 30 Practical - HSSLC MBOSE)', short_name: 'Computer Science', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'ml-c12-statistics', name: 'Statistics (70 Theory + 30 Practical - HSSLC MBOSE)', short_name: 'Statistics', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },

    // Class 12 (HSSLC) - Commerce (5 subjects)
    { subject_id: 'ml-c12-accountancy', name: 'Accountancy (80 Theory + 20 Project - HSSLC MBOSE)', short_name: 'Accountancy', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'ml-c12-business-studies', name: 'Business Studies (80 Theory + 20 Project - HSSLC MBOSE)', short_name: 'Business Studies', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'ml-c12-economics', name: 'Economics (80 Theory + 20 Project - HSSLC MBOSE)', short_name: 'Economics', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'ml-c12-entrepreneurship', name: 'Entrepreneurship (80 Theory + 20 Project - HSSLC MBOSE)', short_name: 'Entrepreneurship', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'ml-c12-commercial-mathematics', name: 'Business / Commercial Mathematics (80 Theory + 20 Project - HSSLC MBOSE)', short_name: 'Commercial Maths', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },

    // Class 12 (HSSLC) - Arts / Humanities (6 subjects)
    { subject_id: 'ml-c12-political-science', name: 'Political Science (Themes in Indian Politics - 80 Theory + 20 Project - HSSLC MBOSE)', short_name: 'Political Science', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'ml-c12-history', name: 'History (Themes in Indian History & Meghalaya Heritage - 80 Theory + 20 Project - HSSLC MBOSE)', short_name: 'History', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'ml-c12-geography', name: 'Geography (Fundamentals & Regional Geography - 70 Theory + 30 Practical - HSSLC MBOSE)', short_name: 'Geography', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'ml-c12-education', name: 'Education (Educational Principles & Psychological Foundations - 80 Theory + 20 Project - HSSLC MBOSE)', short_name: 'Education', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'ml-c12-sociology', name: 'Sociology (Indian Society & Social Change - 80 Theory + 20 Project - HSSLC MBOSE)', short_name: 'Sociology', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'ml-c12-philosophy', name: 'Logic & Philosophy (80 Theory + 20 Project - HSSLC MBOSE)', short_name: 'Logic & Philosophy', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },

    // Class 12 (HSSLC) - Languages (4 subjects)
    { subject_id: 'ml-c12-english', name: 'English Core (Compulsory across all streams - 100 Marks)', short_name: 'English Core', subject_type: 'ACADEMIC', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'ml-c12-mil-khasi', name: 'Modern Indian Language - Khasi (Ka Ktien Khasi - 100 Marks)', short_name: 'Khasi MIL XII', subject_type: 'ACADEMIC', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'ml-c12-mil-garo', name: 'Modern Indian Language - Garo (A·chik Ku·sik - 100 Marks)', short_name: 'Garo MIL XII', subject_type: 'ACADEMIC', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'ml-c12-alt-english', name: 'Alternative English (100 Marks - HSSLC MBOSE)', short_name: 'Alt English XII', subject_type: 'ACADEMIC', is_language_subject: 1, is_medium_dependent: 0, active: 1 }
  ];

  for (const s of subjects) {
    subjectStmt.run(s);
  }
});

tx();

console.log('✅ Successfully registered MBOSE organizations, boards, sources, and 31 subjects.');
db.close();
