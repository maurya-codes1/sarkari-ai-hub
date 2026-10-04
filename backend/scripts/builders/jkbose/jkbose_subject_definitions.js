const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '../../../db/sarkari_core.db');
const db = new Database(dbPath);

console.log('Registering JKBOSE board ecosystem metadata and 31 primary subjects in SQLite...');

const jkSubjects = [
  // Class 10 (JKBOSE SSE) - 10 Primary Subjects
  { id: 'jk-c10-english', name: 'General English (SSE Class 10 Paper 1 - 80 Theory + 20 IA)', short: 'English 10', type: 'LANGUAGE', isLang: 1 },
  { id: 'jk-c10-urdu', name: 'Urdu (لازمی اردو - SSE Class 10 Paper 2 - 80 Theory + 20 IA)', short: 'Urdu 10', type: 'LANGUAGE', isLang: 1 },
  { id: 'jk-c10-hindi', name: 'General Hindi (सामान्य हिन्दी - SSE Class 10 Paper 2 - 80 Theory + 20 IA)', short: 'Hindi 10', type: 'LANGUAGE', isLang: 1 },
  { id: 'jk-c10-mathematics-en', name: 'Mathematics (English Medium - SSE Class 10 Paper 3 - 80 Theory + 20 IA)', short: 'Maths EN 10', type: 'ACADEMIC_CORE', isLang: 0 },
  { id: 'jk-c10-mathematics-ur', name: 'Mathematics (Urdu Medium - ریاضی - SSE Class 10 Paper 3 - 80 Theory + 20 IA)', short: 'Maths UR 10', type: 'ACADEMIC_CORE', isLang: 0 },
  { id: 'jk-c10-science-en', name: 'Science (English Medium - SSE Class 10 Paper 4 - 80 Theory + 20 Practical)', short: 'Science EN 10', type: 'ACADEMIC_CORE', isLang: 0 },
  { id: 'jk-c10-science-ur', name: 'Science (Urdu Medium - سائنس - SSE Class 10 Paper 4 - 80 Theory + 20 Practical)', short: 'Science UR 10', type: 'ACADEMIC_CORE', isLang: 0 },
  { id: 'jk-c10-social-science-en', name: 'Social Science (English Medium - SSE Class 10 Paper 5 - 80 Theory + 20 IA)', short: 'Social Sci EN 10', type: 'ACADEMIC_CORE', isLang: 0 },
  { id: 'jk-c10-kashmiri', name: 'Kashmiri Language (کٲشُر زبان - SSE Class 10 Elective - 80 Theory + 20 IA)', short: 'Kashmiri 10', type: 'LANGUAGE', isLang: 1 },
  { id: 'jk-c10-dogri', name: 'Dogri Language (डोगरी भाषा - SSE Class 10 Elective - 80 Theory + 20 IA)', short: 'Dogri 10', type: 'LANGUAGE', isLang: 1 },

  // Class 12 (Higher Secondary Part-II / +2) - Core & Elective Languages (4 subjects)
  { id: 'jk-c12-general-english', name: 'General English (Compulsory across all streams - HSE Part-II - 80 Theory + 20 IA)', short: 'Gen English 12', type: 'LANGUAGE', isLang: 1 },
  { id: 'jk-c12-urdu', name: 'Urdu Literature / Core (اردو - HSE Part-II - 80 Theory + 20 IA)', short: 'Urdu 12', type: 'LANGUAGE', isLang: 1 },
  { id: 'jk-c12-kashmiri', name: 'Kashmiri Elective (کٲشُر - HSE Part-II - 80 Theory + 20 IA)', short: 'Kashmiri 12', type: 'LANGUAGE', isLang: 1 },
  { id: 'jk-c12-dogri-hindi', name: 'Dogri / Hindi Elective (डोगरी एवं हिन्दी साहित्य - HSE Part-II - 80 Theory + 20 IA)', short: 'Dogri-Hindi 12', type: 'LANGUAGE', isLang: 1 },

  // Class 12 (Higher Secondary Part-II) - Science Stream (6 subjects)
  { id: 'jk-c12-physics', name: 'Physics (70 Theory + 30 Practical - HSE Part-II)', short: 'Physics 12', type: 'SCIENCE_ELECTIVE', isLang: 0 },
  { id: 'jk-c12-chemistry', name: 'Chemistry (70 Theory + 30 Practical - HSE Part-II)', short: 'Chemistry 12', type: 'SCIENCE_ELECTIVE', isLang: 0 },
  { id: 'jk-c12-biology', name: 'Biology (Botany & Zoology - 70 Theory + 30 Practical - HSE Part-II)', short: 'Biology 12', type: 'SCIENCE_ELECTIVE', isLang: 0 },
  { id: 'jk-c12-mathematics', name: 'Mathematics (80 Theory + 20 IA - HSE Part-II)', short: 'Maths 12', type: 'SCIENCE_ELECTIVE', isLang: 0 },
  { id: 'jk-c12-computer-science', name: 'Computer Science (70 Theory + 30 Practical - HSE Part-II)', short: 'CS 12', type: 'ACADEMIC_ELECTIVE', isLang: 0 },
  { id: 'jk-c12-environmental-science', name: 'Environmental Science (EVS - 70 Theory + 30 Practical - HSE Part-II)', short: 'EVS 12', type: 'SCIENCE_ELECTIVE', isLang: 0 },

  // Class 12 (Higher Secondary Part-II) - Commerce Stream (5 subjects)
  { id: 'jk-c12-accountancy', name: 'Accountancy (80 Theory + 20 Project - HSE Part-II)', short: 'Accountancy 12', type: 'COMMERCE_ELECTIVE', isLang: 0 },
  { id: 'jk-c12-business-studies', name: 'Business Studies (80 Theory + 20 Project - HSE Part-II)', short: 'Business St 12', type: 'COMMERCE_ELECTIVE', isLang: 0 },
  { id: 'jk-c12-economics', name: 'Economics (80 Theory + 20 Project - HSE Part-II)', short: 'Economics 12', type: 'COMMERCE_ELECTIVE', isLang: 0 },
  { id: 'jk-c12-entrepreneurship', name: 'Entrepreneurship (80 Theory + 20 Project - HSE Part-II)', short: 'Entrep 12', type: 'COMMERCE_ELECTIVE', isLang: 0 },
  { id: 'jk-c12-business-mathematics', name: 'Business Mathematics & Statistics (80 Theory + 20 IA - HSE Part-II)', short: 'Biz Maths 12', type: 'COMMERCE_ELECTIVE', isLang: 0 },

  // Class 12 (Higher Secondary Part-II) - Humanities / Arts Stream (6 subjects)
  { id: 'jk-c12-history', name: 'History (Themes in Indian & World History - 80 Theory + 20 Project - HSE Part-II)', short: 'History 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 },
  { id: 'jk-c12-political-science', name: 'Political Science (Contemporary World Politics & India - 80 Theory + 20 Project - HSE Part-II)', short: 'Pol Science 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 },
  { id: 'jk-c12-geography', name: 'Geography (Fundamentals of Physical & Human Geography - 70 Theory + 30 Practical - HSE Part-II)', short: 'Geography 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 },
  { id: 'jk-c12-sociology', name: 'Sociology (Indian Society & Social Change - 80 Theory + 20 Project - HSE Part-II)', short: 'Sociology 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 },
  { id: 'jk-c12-education', name: 'Education (Principles & Practices of Education - 80 Theory + 20 Project - HSE Part-II)', short: 'Education 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 },
  { id: 'jk-c12-psychology', name: 'Psychology (Human Behaviour & Psychological Processes - 70 Theory + 30 Practical - HSE Part-II)', short: 'Psychology 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 }
];

db.pragma('foreign_keys = OFF');

db.transaction(() => {
  const orgId = 'org-jk-board-jkbose';

  // Ensure organization is registered
  db.prepare(`
    INSERT OR REPLACE INTO organizations (organization_id, name, short_name, type, central_or_state, state_or_ut, official_website, active, verification_status)
    VALUES (@orgId, 'Jammu and Kashmir Board of School Education', 'JKBOSE', 'EXAM_BOARD', 'STATE', 'Jammu & Kashmir', 'https://jkbose.nic.in', 1, 'VERIFIED')
  `).run({ orgId });

  // Register canonical ecosystem in boards table
  db.prepare(`
    INSERT OR REPLACE INTO boards (board_id, organization_id, name, short_name, jurisdiction, board_type, official_website, official_result_url, active, verification_status)
    VALUES ('jkbose-jammu-kashmir', @orgId, 'Jammu & Kashmir Board of School Education (JKBOSE)', 'JKBOSE', 'State', 'State', 'https://jkbose.nic.in', 'https://jkbose.nic.in/results', 1, 'VERIFIED')
  `).run({ orgId });

  // Ensure alternate key also points correctly
  db.prepare(`
    INSERT OR REPLACE INTO boards (board_id, organization_id, name, short_name, jurisdiction, board_type, official_website, official_result_url, active, verification_status)
    VALUES ('jkbose-board', @orgId, 'Jammu & Kashmir Board of School Education', 'JKBOSE', 'State', 'State', 'https://jkbose.nic.in', 'https://jkbose.nic.in/results', 1, 'VERIFIED')
  `).run({ orgId });

  console.log('✅ Registered JKBOSE board entities in boards table');

  // Register all 31 primary subjects
  const insertSub = db.prepare(`
    INSERT OR REPLACE INTO subjects (subject_id, name, short_name, subject_type, is_language_subject, is_medium_dependent, active)
    VALUES (@id, @name, @short, @type, @isLang, 1, 1)
  `);

  for (const s of jkSubjects) {
    insertSub.run(s);
  }
  console.log(`✅ Registered ${jkSubjects.length} JKBOSE primary subjects in subjects table`);

  // Register official sources
  try {
    db.prepare(`
      INSERT OR REPLACE INTO official_sources (source_id, organization_id, document_title, document_type, source_url, applicable_year, verification_status)
      VALUES ('src-jkbose-portal', @orgId, 'Jammu and Kashmir Board of School Education Official Portal', 'PORTAL', 'https://jkbose.nic.in/', '2026-27', 'VERIFIED')
    `).run({ orgId });
    db.prepare(`
      INSERT OR REPLACE INTO official_sources (source_id, organization_id, document_title, document_type, source_url, applicable_year, verification_status)
      VALUES ('src-jkbose-sse-curriculum', @orgId, 'JKBOSE Secondary School Examination (Class 10) Scheme of Studies & Syllabus', 'CURRICULUM', 'https://jkbose.nic.in/syllabus.html', '2026-27', 'VERIFIED')
    `).run({ orgId });
    db.prepare(`
      INSERT OR REPLACE INTO official_sources (source_id, organization_id, document_title, document_type, source_url, applicable_year, verification_status)
      VALUES ('src-jkbose-hse-curriculum', @orgId, 'JKBOSE Higher Secondary Examination Part-II (Class 12) Scheme of Studies & Syllabus', 'CURRICULUM', 'https://jkbose.nic.in/syllabus.html', '2026-27', 'VERIFIED')
    `).run({ orgId });
    console.log('✅ Registered official sources in official_sources table');
  } catch (err) {
    console.log('Note on official_sources:', err.message);
  }
})();

db.close();
console.log('✨ JKBOSE subject definitions script completed successfully.');
