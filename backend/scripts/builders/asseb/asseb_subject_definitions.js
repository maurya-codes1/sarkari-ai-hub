const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '../../../db/sarkari_core.db');
const db = new Database(dbPath);

console.log('Registering ASSEB board ecosystem metadata and 31 primary subjects in SQLite...');

const assebSubjects = [
  // Class 10 (ASSEB HSLC / Division-I) - 10 Primary Subjects
  { id: 'as-c10-english', name: 'English (Compulsory HSLC Subject - 90 Theory + 10 IA)', short: 'English 10', type: 'LANGUAGE', isLang: 1 },
  { id: 'as-c10-mil-assamese', name: 'Assamese MIL (অসমীয়া - প্ৰথম ভাষা / মাতৃভাষা - 90 Theory + 10 IA)', short: 'Assamese 10', type: 'LANGUAGE', isLang: 1 },
  { id: 'as-c10-mil-bengali', name: 'Bengali MIL (বাংলা - প্রথম ভাষা / মাতৃভাষা - 90 Theory + 10 IA)', short: 'Bengali 10', type: 'LANGUAGE', isLang: 1 },
  { id: 'as-c10-mil-bodo', name: 'Bodo MIL (बर\' - गुदि राव - 90 Theory + 10 IA)', short: 'Bodo 10', type: 'LANGUAGE', isLang: 1 },
  { id: 'as-c10-general-mathematics-en', name: 'General Mathematics (English Medium - HSLC Compulsory - 90 Theory + 10 IA)', short: 'Maths EN 10', type: 'ACADEMIC_CORE', isLang: 0 },
  { id: 'as-c10-general-mathematics-as', name: 'General Mathematics (Assamese Medium - সাধাৰণ গণিত - 90 Theory + 10 IA)', short: 'Maths AS 10', type: 'ACADEMIC_CORE', isLang: 0 },
  { id: 'as-c10-general-science', name: 'General Science (English Medium - HSLC Compulsory - 90 Theory + 10 IA)', short: 'Science EN 10', type: 'ACADEMIC_CORE', isLang: 0 },
  { id: 'as-c10-general-science-as', name: 'General Science (Assamese Medium - সাধাৰণ বিজ্ঞান - 90 Theory + 10 IA)', short: 'Science AS 10', type: 'ACADEMIC_CORE', isLang: 0 },
  { id: 'as-c10-social-science-en', name: 'Social Science (English Medium - HSLC Compulsory - 90 Theory + 10 IA)', short: 'Social Sci EN 10', type: 'ACADEMIC_CORE', isLang: 0 },
  { id: 'as-c10-social-science-as', name: 'Social Science (Assamese Medium - সমাজ বিজ্ঞান - 90 Theory + 10 IA)', short: 'Social Sci AS 10', type: 'ACADEMIC_CORE', isLang: 0 },

  // Class 12 (+2 HS / Division-II) - Languages (4 subjects)
  { id: 'as-c12-english', name: 'General English (Compulsory across all streams - 100 Marks)', short: 'English 12', type: 'LANGUAGE', isLang: 1 },
  { id: 'as-c12-mil-assamese', name: 'Modern Indian Language - Assamese (অসমীয়া - 100 Marks)', short: 'Assamese 12', type: 'LANGUAGE', isLang: 1 },
  { id: 'as-c12-mil-bengali', name: 'Modern Indian Language - Bengali (বাংলা - 100 Marks)', short: 'Bengali 12', type: 'LANGUAGE', isLang: 1 },
  { id: 'as-c12-mil-bodo', name: 'Modern Indian Language - Bodo (बर\' - 100 Marks)', short: 'Bodo 12', type: 'LANGUAGE', isLang: 1 },

  // Class 12 (+2 HS / Division-II) - Science Stream (6 subjects)
  { id: 'as-c12-physics', name: 'Physics (70 Theory + 30 Practical - +2 HS)', short: 'Physics 12', type: 'SCIENCE_ELECTIVE', isLang: 0 },
  { id: 'as-c12-chemistry', name: 'Chemistry (70 Theory + 30 Practical - +2 HS)', short: 'Chemistry 12', type: 'SCIENCE_ELECTIVE', isLang: 0 },
  { id: 'as-c12-biology', name: 'Biology (Botany & Zoology - 70 Theory + 30 Practical - +2 HS)', short: 'Biology 12', type: 'SCIENCE_ELECTIVE', isLang: 0 },
  { id: 'as-c12-mathematics', name: 'Mathematics (80 Theory + 20 IA - +2 HS)', short: 'Maths 12', type: 'SCIENCE_ELECTIVE', isLang: 0 },
  { id: 'as-c12-computer-science', name: 'Computer Science & Application (70 Theory + 30 Practical - +2 HS)', short: 'CS 12', type: 'ACADEMIC_ELECTIVE', isLang: 0 },
  { id: 'as-c12-statistics', name: 'Statistics (70 Theory + 30 Practical - +2 HS)', short: 'Statistics 12', type: 'ACADEMIC_ELECTIVE', isLang: 0 },

  // Class 12 (+2 HS / Division-II) - Commerce Stream (5 subjects)
  { id: 'as-c12-accountancy', name: 'Accountancy (80 Theory + 20 Project - +2 HS)', short: 'Accountancy 12', type: 'COMMERCE_ELECTIVE', isLang: 0 },
  { id: 'as-c12-business-studies', name: 'Business Studies (80 Theory + 20 Project - +2 HS)', short: 'Business St 12', type: 'COMMERCE_ELECTIVE', isLang: 0 },
  { id: 'as-c12-economics', name: 'Economics (80 Theory + 20 Project - +2 HS)', short: 'Economics 12', type: 'COMMERCE_ELECTIVE', isLang: 0 },
  { id: 'as-c12-banking', name: 'Banking & Commercial Mathematics (80 Theory + 20 Project - +2 HS)', short: 'Banking 12', type: 'COMMERCE_ELECTIVE', isLang: 0 },
  { id: 'as-c12-insurance-finance', name: 'Insurance & Financial Studies (80 Theory + 20 Project - +2 HS)', short: 'Insurance 12', type: 'COMMERCE_ELECTIVE', isLang: 0 },

  // Class 12 (+2 HS / Division-II) - Arts / Humanities Stream (6 subjects)
  { id: 'as-c12-political-science', name: 'Political Science (Themes in Indian Politics - 80 Theory + 20 Project - +2 HS)', short: 'Pol Science 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 },
  { id: 'as-c12-history', name: 'History (Themes in Indian & Assam History - 80 Theory + 20 Project - +2 HS)', short: 'History 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 },
  { id: 'as-c12-geography', name: 'Geography (Fundamentals & Geography of Assam/NE - 70 Theory + 30 Practical - +2 HS)', short: 'Geography 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 },
  { id: 'as-c12-sociology', name: 'Sociology (Structure of Indian Society - 80 Theory + 20 Project - +2 HS)', short: 'Sociology 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 },
  { id: 'as-c12-education', name: 'Education (Principles & Educational Development in India/Assam - 80 Theory + 20 Project - +2 HS)', short: 'Education 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 },
  { id: 'as-c12-logic-philosophy', name: 'Logic & Philosophy (Indian & Western - 80 Theory + 20 Project - +2 HS)', short: 'Logic & Phil 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 }
];

db.pragma('foreign_keys = OFF');

db.transaction(() => {
  const orgAsseb = 'org-as-board-asseb';
  const orgSeba = 'org-as-board-seba';
  const orgAhsec = 'org-as-board-ahsec';

  // Ensure current and historical organizations are registered
  db.prepare(`
    INSERT OR REPLACE INTO organizations (organization_id, name, short_name, type, central_or_state, state_or_ut, official_website, active, verification_status)
    VALUES (@orgId, 'Assam State School Education Board, Bamunimaidam', 'ASSEB', 'EXAM_BOARD', 'STATE', 'Assam', 'https://asseb.assam.gov.in', 1, 'VERIFIED')
  `).run({ orgId: orgAsseb });

  db.prepare(`
    INSERT OR REPLACE INTO organizations (organization_id, name, short_name, type, central_or_state, state_or_ut, official_website, active, verification_status)
    VALUES (@orgId, 'Secondary Education Board of Assam (Merged into ASSEB Division-I)', 'SEBA', 'EXAM_BOARD', 'STATE', 'Assam', 'https://site.sebaonline.org', 1, 'VERIFIED')
  `).run({ orgId: orgSeba });

  db.prepare(`
    INSERT OR REPLACE INTO organizations (organization_id, name, short_name, type, central_or_state, state_or_ut, official_website, active, verification_status)
    VALUES (@orgId, 'Assam Higher Secondary Education Council (Merged into ASSEB Division-II)', 'AHSEC', 'EXAM_BOARD', 'STATE', 'Assam', 'https://ahsec.assam.gov.in', 1, 'VERIFIED')
  `).run({ orgId: orgAhsec });

  // Register canonical ecosystem in boards table
  db.prepare(`
    INSERT OR REPLACE INTO boards (board_id, organization_id, name, short_name, jurisdiction, board_type, official_website, official_result_url, active, verification_status)
    VALUES ('asseb-assam', @orgId, 'Assam State School Education Board (ASSEB)', 'ASSEB', 'State', 'State', 'https://asseb.assam.gov.in', 'https://sebaresults.sebaonline.org', 1, 'VERIFIED')
  `).run({ orgId: orgAsseb });

  db.prepare(`
    INSERT OR REPLACE INTO boards (board_id, organization_id, name, short_name, jurisdiction, board_type, official_website, official_result_url, active, verification_status)
    VALUES ('asseb-board', @orgId, 'Assam State School Education Board', 'ASSEB', 'State', 'State', 'https://asseb.assam.gov.in', 'https://sebaresults.sebaonline.org', 1, 'VERIFIED')
  `).run({ orgId: orgAsseb });

  db.prepare(`
    INSERT OR REPLACE INTO boards (board_id, organization_id, name, short_name, jurisdiction, board_type, official_website, official_result_url, active, verification_status)
    VALUES ('seba-board', @orgId, 'Secondary Education Board of Assam (SEBA)', 'SEBA', 'State', 'State', 'https://site.sebaonline.org', 'https://sebaresults.sebaonline.org', 1, 'VERIFIED')
  `).run({ orgId: orgSeba });

  db.prepare(`
    INSERT OR REPLACE INTO boards (board_id, organization_id, name, short_name, jurisdiction, board_type, official_website, official_result_url, active, verification_status)
    VALUES ('ahsec-board', @orgId, 'Assam Higher Secondary Education Council (AHSEC)', 'AHSEC', 'State', 'State', 'https://ahsec.assam.gov.in', 'https://ahsec.assam.gov.in', 1, 'VERIFIED')
  `).run({ orgId: orgAhsec });

  console.log('✅ Registered ASSEB, SEBA, and AHSEC entities in organizations and boards tables');

  // Register all 31 primary subjects
  const insertSub = db.prepare(`
    INSERT OR REPLACE INTO subjects (subject_id, name, short_name, subject_type, is_language_subject, is_medium_dependent, active)
    VALUES (@id, @name, @short, @type, @isLang, 1, 1)
  `);

  for (const s of assebSubjects) {
    insertSub.run(s);
  }
  console.log(`✅ Registered ${assebSubjects.length} ASSEB primary subjects in subjects table`);

  // Register official sources
  try {
    db.prepare(`
      INSERT OR REPLACE INTO official_sources (source_id, organization_id, document_title, document_type, source_url, applicable_year, verification_status)
      VALUES ('src-asseb-portal', @orgId, 'Assam State School Education Board Official Portal', 'PORTAL', 'https://asseb.assam.gov.in/', '2026-27', 'VERIFIED')
    `).run({ orgId: orgAsseb });
    db.prepare(`
      INSERT OR REPLACE INTO official_sources (source_id, organization_id, document_title, document_type, source_url, applicable_year, verification_status)
      VALUES ('src-asseb-hslc-curriculum', @orgId, 'ASSEB HSLC (Class 10) Scheme of Studies & Curriculum (Division-I)', 'CURRICULUM', 'https://site.sebaonline.org/', '2026-27', 'VERIFIED')
    `).run({ orgId: orgAsseb });
    db.prepare(`
      INSERT OR REPLACE INTO official_sources (source_id, organization_id, document_title, document_type, source_url, applicable_year, verification_status)
      VALUES ('src-asseb-hs-curriculum', @orgId, 'ASSEB Higher Secondary (+2) Scheme of Studies & Curriculum (Division-II)', 'CURRICULUM', 'https://ahsec.assam.gov.in/', '2026-27', 'VERIFIED')
    `).run({ orgId: orgAsseb });
    db.prepare(`
      INSERT OR REPLACE INTO official_sources (source_id, organization_id, document_title, document_type, source_url, applicable_year, verification_status)
      VALUES ('src-seba-historical-archive', @orgId, 'SEBA Historical Examination Repository (Pre-Merger Archive)', 'ARCHIVE', 'https://site.sebaonline.org/', 'HISTORICAL', 'VERIFIED')
    `).run({ orgId: orgSeba });
    db.prepare(`
      INSERT OR REPLACE INTO official_sources (source_id, organization_id, document_title, document_type, source_url, applicable_year, verification_status)
      VALUES ('src-ahsec-historical-archive', @orgId, 'AHSEC Historical Examination Repository (Pre-Merger Archive)', 'ARCHIVE', 'https://ahsec.assam.gov.in/', 'HISTORICAL', 'VERIFIED')
    `).run({ orgId: orgAhsec });
    console.log('✅ Registered official and historical ASSEB/SEBA/AHSEC sources in official_sources table');
  } catch (err) {
    console.error('Source insert notice:', err.message);
  }
})();

db.pragma('foreign_keys = ON');
const fk = db.prepare('PRAGMA foreign_key_check').all();
console.log('Foreign key check after metadata registration:', fk.length === 0 ? '0 errors (Passed)' : fk);
db.close();
