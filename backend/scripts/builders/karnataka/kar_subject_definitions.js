const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '../../../db/sarkari_core.db');
const db = new Database(dbPath);

console.log('Registering Karnataka board ecosystem metadata and 31 primary subjects in SQLite...');

const karSubjects = [
  // Class 10 (KSEAB SSLC) - 10 Primary Subjects
  { id: 'kar-c10-kannada-fl', name: 'First Language Kannada (FLK - ಪ್ರಥಮ ಭಾಷೆ ಕನ್ನಡ)', short: 'Kannada FL 10', type: 'LANGUAGE', isLang: 1 },
  { id: 'kar-c10-english-fl', name: 'First Language English (FLE)', short: 'English FL 10', type: 'LANGUAGE', isLang: 1 },
  { id: 'kar-c10-urdu-fl', name: 'First Language Urdu (FLU - اردو پہلی زبان)', short: 'Urdu FL 10', type: 'LANGUAGE', isLang: 1 },
  { id: 'kar-c10-kannada-sl', name: 'Second Language Kannada (SLK - ದ್ವಿತೀಯ ಭಾಷೆ ಕನ್ನಡ)', short: 'Kannada SL 10', type: 'LANGUAGE', isLang: 1 },
  { id: 'kar-c10-english-sl', name: 'Second Language English (SLE)', short: 'English SL 10', type: 'LANGUAGE', isLang: 1 },
  { id: 'kar-c10-hindi-tl', name: 'Third Language Hindi (TLH - ತೃತೀಯ ಭಾಷೆ ಹಿಂದಿ)', short: 'Hindi TL 10', type: 'LANGUAGE', isLang: 1 },
  { id: 'kar-c10-sanskrit-tl', name: 'Third Language Sanskrit (TLS - ತೃತೀಯ ಭಾಷೆ ಸಂಸ್ಕೃತ)', short: 'Sanskrit TL 10', type: 'LANGUAGE', isLang: 1 },
  { id: 'kar-c10-mathematics', name: 'Mathematics (ಗಣಿತ - SSLC Mathematics)', short: 'Math 10', type: 'ACADEMIC_CORE', isLang: 0 },
  { id: 'kar-c10-science', name: 'Science (ವಿಜ್ಞಾನ - SSLC Physics, Chemistry & Biology)', short: 'Science 10', type: 'ACADEMIC_CORE', isLang: 0 },
  { id: 'kar-c10-social-science', name: 'Social Science (ಸಮಾಜ ವಿಜ್ಞಾನ - History, Pol Sci, Geog, Econ)', short: 'Social Sci 10', type: 'ACADEMIC_CORE', isLang: 0 },

  // Class 12 (Karnataka Pre-University Education / II PUC) - Science (6 subjects)
  { id: 'kar-c12-physics', name: 'Physics (ಭೌತಶಾಸ್ತ್ರ - II PUC)', short: 'Physics 12', type: 'SCIENCE_ELECTIVE', isLang: 0 },
  { id: 'kar-c12-chemistry', name: 'Chemistry (ರಸಾಯನಶಾಸ್ತ್ರ - II PUC)', short: 'Chemistry 12', type: 'SCIENCE_ELECTIVE', isLang: 0 },
  { id: 'kar-c12-mathematics', name: 'Mathematics (ಗಣಿತಶಾಸ್ತ್ರ - II PUC)', short: 'Maths 12', type: 'SCIENCE_ELECTIVE', isLang: 0 },
  { id: 'kar-c12-biology', name: 'Biology (ಜೀವಶಾಸ್ತ್ರ - II PUC)', short: 'Biology 12', type: 'SCIENCE_ELECTIVE', isLang: 0 },
  { id: 'kar-c12-computer-science', name: 'Computer Science (ಗಣಕ ವಿಜ್ಞಾನ - II PUC)', short: 'CS 12', type: 'ACADEMIC_ELECTIVE', isLang: 0 },
  { id: 'kar-c12-electronics', name: 'Electronics (ವಿದ್ಯುನ್ಮಾನ ಶಾಸ್ತ್ರ - II PUC)', short: 'Electronics 12', type: 'SCIENCE_ELECTIVE', isLang: 0 },

  // Class 12 (Karnataka Pre-University Education / II PUC) - Commerce (5 subjects)
  { id: 'kar-c12-business-studies', name: 'Business Studies (ವ್ಯವಹಾರ ಅಧ್ಯಯನ - II PUC)', short: 'Biz Studies 12', type: 'COMMERCE_ELECTIVE', isLang: 0 },
  { id: 'kar-c12-accountancy', name: 'Accountancy (ಲೆಕ್ಕಶಾಸ್ತ್ರ - II PUC)', short: 'Accountancy 12', type: 'COMMERCE_ELECTIVE', isLang: 0 },
  { id: 'kar-c12-economics', name: 'Economics (ಅರ್ಥಶಾಸ್ತ್ರ - II PUC)', short: 'Economics 12', type: 'COMMERCE_ELECTIVE', isLang: 0 },
  { id: 'kar-c12-statistics', name: 'Statistics (ಸಂಖ್ಯಾಶಾಸ್ತ್ರ - II PUC)', short: 'Statistics 12', type: 'COMMERCE_ELECTIVE', isLang: 0 },
  { id: 'kar-c12-basic-mathematics', name: 'Basic Mathematics (ಮೂಲ ಗಣಿತ - II PUC)', short: 'Basic Math 12', type: 'COMMERCE_ELECTIVE', isLang: 0 },

  // Class 12 (Karnataka Pre-University Education / II PUC) - Arts / Humanities (5 subjects)
  { id: 'kar-c12-history', name: 'History (ಇತಿಹಾಸ - II PUC)', short: 'History 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 },
  { id: 'kar-c12-political-science', name: 'Political Science (ರಾಜ್ಯಶಾಸ್ತ್ರ - II PUC)', short: 'Pol Science 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 },
  { id: 'kar-c12-sociology', name: 'Sociology (ಸಮಾಜಶಾಸ್ತ್ರ - II PUC)', short: 'Sociology 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 },
  { id: 'kar-c12-geography', name: 'Geography (ಭೂಗೋಳಶಾಸ್ತ್ರ - II PUC)', short: 'Geography 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 },
  { id: 'kar-c12-logic', name: 'Logic & Philosophy (ತರ್ಕಶಾಸ್ತ್ರ - II PUC)', short: 'Logic 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 },

  // Class 12 (Karnataka Pre-University Education / II PUC) - Languages (5 subjects)
  { id: 'kar-c12-kannada-part1', name: 'Part I Kannada (ಕನ್ನಡ ಭಾಷೆ - II PUC)', short: 'Kannada Part1 12', type: 'LANGUAGE', isLang: 1 },
  { id: 'kar-c12-english-part1', name: 'Part I English (II PUC)', short: 'English Part1 12', type: 'LANGUAGE', isLang: 1 },
  { id: 'kar-c12-hindi-part1', name: 'Part I Hindi (हिन्दी भाषा - II PUC)', short: 'Hindi Part1 12', type: 'LANGUAGE', isLang: 1 },
  { id: 'kar-c12-sanskrit-part1', name: 'Part I Sanskrit (संस्कृत भाषा - II PUC)', short: 'Sanskrit Part1 12', type: 'LANGUAGE', isLang: 1 },
  { id: 'kar-c12-urdu-part1', name: 'Part I Urdu (اردو زبان - II PUC)', short: 'Urdu Part1 12', type: 'LANGUAGE', isLang: 1 }
];

db.pragma('foreign_keys = OFF');

db.transaction(() => {
  const orgId = 'org-karnataka-school-examination-and-assessm';

  // Register canonical ecosystem in boards table
  db.prepare(`
    INSERT OR REPLACE INTO boards (board_id, organization_id, name, short_name, jurisdiction, board_type, official_website, official_result_url, active, verification_status)
    VALUES ('karnataka-kseab-pue', @orgId, 'Karnataka School Board Ecosystem (KSEAB & Pre-University Education)', 'KAR-ECOSYSTEM', 'State', 'State', 'https://kseab.karnataka.gov.in', 'https://karresults.nic.in', 1, 'VERIFIED')
  `).run({ orgId });

  // Register separate authority records
  db.prepare(`
    INSERT OR REPLACE INTO boards (board_id, organization_id, name, short_name, jurisdiction, board_type, official_website, official_result_url, active, verification_status)
    VALUES ('kseab-karnataka', @orgId, 'Karnataka School Examination and Assessment Board (KSEAB)', 'KSEAB', 'State', 'State', 'https://kseab.karnataka.gov.in', 'https://karresults.nic.in', 1, 'VERIFIED')
  `).run({ orgId });

  db.prepare(`
    INSERT OR REPLACE INTO boards (board_id, organization_id, name, short_name, jurisdiction, board_type, official_website, official_result_url, active, verification_status)
    VALUES ('pue-karnataka', @orgId, 'Department of School Education (Pre-University) Karnataka', 'Karnataka PUE', 'State', 'State', 'https://pue.karnataka.gov.in', 'https://karresults.nic.in', 1, 'VERIFIED')
  `).run({ orgId });

  console.log('✅ Registered Karnataka board entities in boards table');

  // Register all 31 primary subjects
  const insertSub = db.prepare(`
    INSERT OR REPLACE INTO subjects (subject_id, name, short_name, subject_type, is_language_subject, is_medium_dependent, active)
    VALUES (@id, @name, @short, @type, @isLang, 1, 1)
  `);

  for (const s of karSubjects) {
    insertSub.run(s);
  }
  console.log(`✅ Registered ${karSubjects.length} Karnataka primary subjects in subjects table`);

  // Register official sources in official_sources table
  try {
    db.prepare(`
      INSERT OR REPLACE INTO official_sources (source_id, organization_id, document_title, document_type, source_url, applicable_year, verification_status)
      VALUES ('src-kseab-portal', @orgId, 'Karnataka School Examination and Assessment Board Official Portal', 'PORTAL', 'https://kseab.karnataka.gov.in/', '2026-27', 'VERIFIED')
    `).run({ orgId });
    db.prepare(`
      INSERT OR REPLACE INTO official_sources (source_id, organization_id, document_title, document_type, source_url, applicable_year, verification_status)
      VALUES ('src-pue-karnataka-portal', @orgId, 'Department of School Education (Pre-University) Karnataka Official Portal', 'PORTAL', 'https://pue.karnataka.gov.in/', '2026-27', 'VERIFIED')
    `).run({ orgId });
    console.log('✅ Registered official sources in official_sources table');
  } catch (err) {
    console.log('Note on official_sources:', err.message);
  }
})();

console.log('Karnataka metadata registration complete.');
