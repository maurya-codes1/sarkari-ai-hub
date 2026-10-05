const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '../../../db/sarkari_core.db');
const db = new Database(dbPath);

console.log('Registering West Bengal board ecosystem metadata and 31 primary subjects in SQLite...');

const wbSubjects = [
  // Class 10 (WBBSE Madhyamik Secondary) - 10 Primary Subjects
  { id: 'wbbse-bengali-fl-10', name: 'Bengali First Language (বাংলা - প্রথম ভাষা)', short: 'Bengali FL 10', type: 'LANGUAGE', isLang: 1 },
  { id: 'wbbse-english-sl-10', name: 'English Second Language (English SL Compulsory)', short: 'English SL 10', type: 'LANGUAGE', isLang: 1 },
  { id: 'wbbse-hindi-fl-10', name: 'Hindi First Language (हिन्दी - प्रथम भाषा)', short: 'Hindi FL 10', type: 'LANGUAGE', isLang: 1 },
  { id: 'wbbse-urdu-fl-10', name: 'Urdu First Language (اردو - پہلی زبان)', short: 'Urdu FL 10', type: 'LANGUAGE', isLang: 1 },
  { id: 'wbbse-mathematics-10', name: 'Mathematics (গণিত - Madhyamik)', short: 'Math 10', type: 'ACADEMIC_CORE', isLang: 0 },
  { id: 'wbbse-physical-science-10', name: 'Physical Science (ভৌতবিজ্ঞান ও পরিবেশ)', short: 'Physical Sci 10', type: 'ACADEMIC_CORE', isLang: 0 },
  { id: 'wbbse-life-science-10', name: 'Life Science (জীবনবিজ্ঞান ও পরিবেশ)', short: 'Life Sci 10', type: 'ACADEMIC_CORE', isLang: 0 },
  { id: 'wbbse-history-10', name: 'History & Environment (ইতিহাস ও পরিবেশ)', short: 'History 10', type: 'ACADEMIC_CORE', isLang: 0 },
  { id: 'wbbse-geography-10', name: 'Geography & Environment (ভূগোল ও পরিবেশ)', short: 'Geography 10', type: 'ACADEMIC_CORE', isLang: 0 },
  { id: 'wbbse-computer-app-10', name: 'Computer Application (কম্পিউটার অ্যাপ্লিকেশন)', short: 'Computer App 10', type: 'ACADEMIC_ELECTIVE', isLang: 0 },

  // Class 12 (WBCHSE Higher Secondary) - Languages & Classical (5 subjects)
  { id: 'wbchse-bengali-fl-12', name: 'Bengali First Language (বাংলা - প্রথম ভাষা - Code BNGA)', short: 'Bengali FL 12', type: 'LANGUAGE', isLang: 1 },
  { id: 'wbchse-english-sl-12', name: 'English Second Language (English - Code ENGB)', short: 'English SL 12', type: 'LANGUAGE', isLang: 1 },
  { id: 'wbchse-hindi-fl-12', name: 'Hindi First Language (हिन्दी - प्रथम भाषा - Code HINA)', short: 'Hindi FL 12', type: 'LANGUAGE', isLang: 1 },
  { id: 'wbchse-urdu-fl-12', name: 'Urdu First Language (اردو - پہلی زبان - Code URDA)', short: 'Urdu FL 12', type: 'LANGUAGE', isLang: 1 },
  { id: 'wbchse-sanskrit-12', name: 'Sanskrit (সংস্কৃত / संस्कृतम् - Code SNSK)', short: 'Sanskrit 12', type: 'LANGUAGE', isLang: 1 },

  // Class 12 (WBCHSE Higher Secondary) - Set I Science Electives (6 subjects)
  { id: 'wbchse-physics-12', name: 'Physics (পদার্থবিদ্যা - Code PHYS)', short: 'Physics 12', type: 'SCIENCE_ELECTIVE', isLang: 0 },
  { id: 'wbchse-chemistry-12', name: 'Chemistry (রসায়নবিদ্যা - Code CHEM)', short: 'Chemistry 12', type: 'SCIENCE_ELECTIVE', isLang: 0 },
  { id: 'wbchse-mathematics-12', name: 'Mathematics (গণিত - Code MATH)', short: 'Math 12', type: 'ACADEMIC_CORE', isLang: 0 },
  { id: 'wbchse-biological-science-12', name: 'Biological Science (জীববিজ্ঞান - Code BIOS)', short: 'Bio Sci 12', type: 'SCIENCE_ELECTIVE', isLang: 0 },
  { id: 'wbchse-computer-science-12', name: 'Computer Science (কম্পিউটার সায়েন্স - Code COMS)', short: 'CS 12', type: 'ACADEMIC_ELECTIVE', isLang: 0 },
  { id: 'wbchse-statistics-12', name: 'Statistics (পরিসংখ্যানবিদ্যা - Code STAT)', short: 'Statistics 12', type: 'SCIENCE_ELECTIVE', isLang: 0 },

  // Class 12 (WBCHSE Higher Secondary) - Set II Commerce Electives (5 subjects)
  { id: 'wbchse-accountancy-12', name: 'Accountancy (হিসাবশাস্ত্র - Code ACCT)', short: 'Accounts 12', type: 'COMMERCE_ELECTIVE', isLang: 0 },
  { id: 'wbchse-business-studies-12', name: 'Business Studies (কারবারি শিক্ষা - Code BSTD)', short: 'Business Studies 12', type: 'COMMERCE_ELECTIVE', isLang: 0 },
  { id: 'wbchse-clpa-12', name: 'Commercial Law & Auditing (ব্যবসায়িক আইন ও নিরীক্ষা - Code CLPA)', short: 'CLPA 12', type: 'COMMERCE_ELECTIVE', isLang: 0 },
  { id: 'wbchse-costing-taxation-12', name: 'Costing & Taxation (পরিব্যয় ও কর নির্ধারণ - Code CSTX)', short: 'Costing Tax 12', type: 'COMMERCE_ELECTIVE', isLang: 0 },
  { id: 'wbchse-economics-12', name: 'Economics (অর্থনীতি - Code ECON)', short: 'Economics 12', type: 'COMMERCE_ELECTIVE', isLang: 0 },

  // Class 12 (WBCHSE Higher Secondary) - Set III Humanities Electives (5 subjects)
  { id: 'wbchse-history-12', name: 'History (ইতিহাস - Code HIST)', short: 'History 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 },
  { id: 'wbchse-geography-12', name: 'Geography (ভূগোল - Code GEGR)', short: 'Geography 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 },
  { id: 'wbchse-political-science-12', name: 'Political Science (রাষ্ট্রবিজ্ঞান - Code POLS)', short: 'Pol Sci 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 },
  { id: 'wbchse-philosophy-12', name: 'Philosophy (দর্শন - Code PHIL)', short: 'Philosophy 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 },
  { id: 'wbchse-sociology-12', name: 'Sociology (সমাজতত্ত্ব - Code SOCG)', short: 'Sociology 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 }
];

db.pragma('foreign_keys = OFF');

db.transaction(() => {
  // Register canonical ecosystem in boards table
  db.prepare(`
    INSERT OR REPLACE INTO boards (board_id, organization_id, name, short_name, jurisdiction, board_type, official_website, official_result_url, active, verification_status)
    VALUES ('wbbse-wbchse-west-bengal', 'org-west-bengal-board-of-secondary-education', 'West Bengal School Board Ecosystem (WBBSE & WBCHSE)', 'WB-ECOSYSTEM', 'State', 'State', 'https://wbbse.wb.gov.in', 'https://wbresults.nic.in', 1, 'VERIFIED')
  `).run();

  // Register separate authority records
  db.prepare(`
    INSERT OR REPLACE INTO boards (board_id, organization_id, name, short_name, jurisdiction, board_type, official_website, official_result_url, active, verification_status)
    VALUES ('wbbse-west-bengal', 'org-west-bengal-board-of-secondary-education', 'West Bengal Board of Secondary Education (WBBSE)', 'WBBSE', 'State', 'State', 'https://wbbse.wb.gov.in', 'https://wbresults.nic.in', 1, 'VERIFIED')
  `).run();

  db.prepare(`
    INSERT OR REPLACE INTO boards (board_id, organization_id, name, short_name, jurisdiction, board_type, official_website, official_result_url, active, verification_status)
    VALUES ('wbchse-west-bengal', 'org-west-bengal-board-of-secondary-education', 'West Bengal Council of Higher Secondary Education (WBCHSE)', 'WBCHSE', 'State', 'State', 'https://wbchse.wb.gov.in', 'https://wbresults.nic.in', 1, 'VERIFIED')
  `).run();

  console.log('✅ Registered West Bengal board entities in boards table');

  // Register all 31 primary subjects
  const insertSub = db.prepare(`
    INSERT OR REPLACE INTO subjects (subject_id, name, short_name, subject_type, is_language_subject, is_medium_dependent, active)
    VALUES (@id, @name, @short, @type, @isLang, 1, 1)
  `);

  for (const s of wbSubjects) {
    insertSub.run(s);
  }
  console.log(`✅ Registered ${wbSubjects.length} West Bengal primary subjects in subjects table`);

  // Register official sources in official_sources table if present
  try {
    db.prepare(`
      INSERT OR REPLACE INTO official_sources (source_id, document_title, document_type, source_url, applicable_year, verification_status)
      VALUES ('src-wbbse-portal', 'West Bengal Board of Secondary Education Official Portal', 'PORTAL', 'https://wbbse.wb.gov.in/', '2026-27', 'VERIFIED')
    `).run();
    db.prepare(`
      INSERT OR REPLACE INTO official_sources (source_id, document_title, document_type, source_url, applicable_year, verification_status)
      VALUES ('src-wbchse-portal', 'West Bengal Council of Higher Secondary Education Official Portal', 'PORTAL', 'https://wbchse.wb.gov.in/', '2026-27', 'VERIFIED')
    `).run();
    console.log('✅ Registered official sources in official_sources table');
  } catch (err) {
    console.log('Note on official_sources:', err.message);
  }
})();

console.log('🎉 West Bengal metadata initialization complete.');
