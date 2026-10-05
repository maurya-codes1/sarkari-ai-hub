const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '../../../db/sarkari_core.db');
const db = new Database(dbPath);

console.log('Registering Odisha board ecosystem metadata and 31 primary subjects in SQLite...');

const odSubjects = [
  // Class 10 (BSE Odisha Matriculation) - 10 Primary Subjects
  { id: 'od-c10-odia-fl', name: 'First Language Odia (FLO - ପ୍ରଥମ ଭାଷା ଓଡ଼ିଆ)', short: 'Odia FL 10', type: 'LANGUAGE', isLang: 1 },
  { id: 'od-c10-english-fl', name: 'First Language English (FLE)', short: 'English FL 10', type: 'LANGUAGE', isLang: 1 },
  { id: 'od-c10-hindi-fl', name: 'First Language Hindi (FLH - प्रथम भाषा हिन्दी)', short: 'Hindi FL 10', type: 'LANGUAGE', isLang: 1 },
  { id: 'od-c10-urdu-fl', name: 'First Language Urdu (FLU - اردو پہلی زبان)', short: 'Urdu FL 10', type: 'LANGUAGE', isLang: 1 },
  { id: 'od-c10-english-sl', name: 'Second Language English (SLE)', short: 'English SL 10', type: 'LANGUAGE', isLang: 1 },
  { id: 'od-c10-sanskrit-tl', name: 'Third Language Sanskrit (TLS - तृतीय भाषा संस्कृतम्)', short: 'Sanskrit TL 10', type: 'LANGUAGE', isLang: 1 },
  { id: 'od-c10-hindi-tl', name: 'Third Language Hindi (TLH - तृतीय भाषा हिन्दी)', short: 'Hindi TL 10', type: 'LANGUAGE', isLang: 1 },
  { id: 'od-c10-mathematics', name: 'Mathematics (MTH - ଗଣିତ: ପାଟିଗଣିତ, ବୀଜଗଣିତ ଓ ଜ୍ୟାମିତି)', short: 'Math 10', type: 'ACADEMIC_CORE', isLang: 0 },
  { id: 'od-c10-general-science', name: 'General Science (GSC - ସାଧାରଣ ବିଜ୍ଞାନ: ଭୌତିକ ଓ ଜୀବ ବିଜ୍ଞାନ)', short: 'General Sci 10', type: 'ACADEMIC_CORE', isLang: 0 },
  { id: 'od-c10-social-science', name: 'Social Science (SSC - ସାମାଜିକ ବିଜ୍ଞାନ: ଇତିହାସ, ରାଜନୀତି, ଭୂଗୋଳ, ଅର୍ଥନୀତି)', short: 'Social Sci 10', type: 'ACADEMIC_CORE', isLang: 0 },

  // Class 12 (CHSE Odisha Higher Secondary) - Science Electives (6 subjects)
  { id: 'od-c12-physics', name: 'Physics (ପଦାର୍ଥ ବିଜ୍ଞାନ - CHSE Code PHY)', short: 'Physics 12', type: 'SCIENCE_ELECTIVE', isLang: 0 },
  { id: 'od-c12-chemistry', name: 'Chemistry (ରସାୟନ ବିଜ୍ଞାନ - CHSE Code CHE)', short: 'Chemistry 12', type: 'SCIENCE_ELECTIVE', isLang: 0 },
  { id: 'od-c12-mathematics', name: 'Mathematics (ଗଣିତ - CHSE Code MTH)', short: 'Math 12', type: 'ACADEMIC_CORE', isLang: 0 },
  { id: 'od-c12-biology', name: 'Biology (ଜୀବ ବିଜ୍ଞାନ: ଉଦ୍ଭିଦ ଓ ପ୍ରାଣୀ ବିଜ୍ଞାନ - CHSE Code BIO)', short: 'Biology 12', type: 'SCIENCE_ELECTIVE', isLang: 0 },
  { id: 'od-c12-information-technology', name: 'Information Technology (IT - CHSE Code IT)', short: 'IT 12', type: 'ACADEMIC_ELECTIVE', isLang: 0 },
  { id: 'od-c12-statistics', name: 'Statistics (ପରିସଂଖ୍ୟାନ - CHSE Code STAT)', short: 'Statistics 12', type: 'SCIENCE_ELECTIVE', isLang: 0 },

  // Class 12 (CHSE Odisha Higher Secondary) - Commerce Electives (5 subjects)
  { id: 'od-c12-accountancy', name: 'Accountancy (ହିସାବ ଶାସ୍ତ୍ର - CHSE Code ACT)', short: 'Accountancy 12', type: 'COMMERCE_ELECTIVE', isLang: 0 },
  { id: 'od-c12-business-studies', name: 'Business Studies and Management (BSM - CHSE Code BSM)', short: 'Business Studies 12', type: 'COMMERCE_ELECTIVE', isLang: 0 },
  { id: 'od-c12-business-mathematics', name: 'Business Mathematics & Statistics (BMS - CHSE Code BMS)', short: 'BMS 12', type: 'COMMERCE_ELECTIVE', isLang: 0 },
  { id: 'od-c12-costing-taxation', name: 'Costing and Taxation (CHSE Code CTX)', short: 'Costing Tax 12', type: 'COMMERCE_ELECTIVE', isLang: 0 },
  { id: 'od-c12-economics-com', name: 'Commercial Economics (CHSE Code CEC)', short: 'Economics 12', type: 'COMMERCE_ELECTIVE', isLang: 0 },

  // Class 12 (CHSE Odisha Higher Secondary) - Arts / Humanities Electives (5 subjects)
  { id: 'od-c12-history', name: 'History (ଇତିହାସ - CHSE Code HIST)', short: 'History 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 },
  { id: 'od-c12-political-science', name: 'Political Science (ରାଜନୀତି ବିଜ୍ଞାନ - CHSE Code POLS)', short: 'Pol Sci 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 },
  { id: 'od-c12-education', name: 'Education (ଶିକ୍ଷା - CHSE Code EDN)', short: 'Education 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 },
  { id: 'od-c12-sociology', name: 'Sociology (ସମାଜଶାସ୍ତ୍ର - CHSE Code SOC)', short: 'Sociology 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 },
  { id: 'od-c12-logic-philosophy', name: 'Logic & Philosophy (ତର୍କଶାସ୍ତ୍ର ଓ ଦର୍ଶନ - CHSE Code LOG)', short: 'Logic Phil 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 },

  // Class 12 (CHSE Odisha Higher Secondary) - Languages (5 subjects)
  { id: 'od-c12-english-compulsory', name: 'Compulsory English (CHSE Code ENG)', short: 'English Comp 12', type: 'LANGUAGE', isLang: 1 },
  { id: 'od-c12-mil-odia', name: 'M.I.L. Odia (ମାତୃଭାଷା ଓଡ଼ିଆ - CHSE Code ODIA)', short: 'MIL Odia 12', type: 'LANGUAGE', isLang: 1 },
  { id: 'od-c12-mil-hindi', name: 'M.I.L. Hindi (मातृभाषा हिन्दी - CHSE Code HIN)', short: 'MIL Hindi 12', type: 'LANGUAGE', isLang: 1 },
  { id: 'od-c12-mil-urdu', name: 'M.I.L. Urdu (اردو لازمی - CHSE Code URD)', short: 'MIL Urdu 12', type: 'LANGUAGE', isLang: 1 },
  { id: 'od-c12-mil-sanskrit', name: 'M.I.L. / Classical Sanskrit (संस्कृतम् - CHSE Code SKT)', short: 'MIL Sanskrit 12', type: 'LANGUAGE', isLang: 1 }
];

db.pragma('foreign_keys = OFF');

db.transaction(() => {
  // Register canonical ecosystem in boards table
  db.prepare(`
    INSERT OR REPLACE INTO boards (board_id, organization_id, name, short_name, jurisdiction, board_type, official_website, official_result_url, active, verification_status)
    VALUES ('odisha-bse-chse', 'org-board-of-secondary-education-odisha-coun', 'Odisha School Board Ecosystem (BSE Odisha & CHSE Odisha)', 'OD-ECOSYSTEM', 'State', 'State', 'https://www.bseodisha.ac.in', 'http://orissaresults.nic.in', 1, 'VERIFIED')
  `).run();

  // Register separate authority records
  db.prepare(`
    INSERT OR REPLACE INTO boards (board_id, organization_id, name, short_name, jurisdiction, board_type, official_website, official_result_url, active, verification_status)
    VALUES ('bse-odisha', 'org-board-of-secondary-education-odisha-coun', 'Board of Secondary Education, Odisha (BSE Odisha)', 'BSE Odisha', 'State', 'State', 'https://www.bseodisha.ac.in', 'http://orissaresults.nic.in', 1, 'VERIFIED')
  `).run();

  db.prepare(`
    INSERT OR REPLACE INTO boards (board_id, organization_id, name, short_name, jurisdiction, board_type, official_website, official_result_url, active, verification_status)
    VALUES ('chse-odisha', 'org-board-of-secondary-education-odisha-coun', 'Council of Higher Secondary Education, Odisha (CHSE Odisha)', 'CHSE Odisha', 'State', 'State', 'https://chseodisha.nic.in', 'http://orissaresults.nic.in', 1, 'VERIFIED')
  `).run();

  // Also preserve legacy alias record
  db.prepare(`
    INSERT OR REPLACE INTO boards (board_id, organization_id, name, short_name, jurisdiction, board_type, official_website, official_result_url, active, verification_status)
    VALUES ('chse-bse-odisha', 'org-board-of-secondary-education-odisha-coun', 'Odisha Board (BSE Matric 10th & CHSE +2 Council)', 'BSE & CHSE Odisha', 'State', 'State', 'https://www.bseodisha.ac.in', 'http://orissaresults.nic.in', 1, 'VERIFIED')
  `).run();

  console.log('✅ Registered Odisha board entities in boards table');

  // Register all 31 primary subjects
  const insertSub = db.prepare(`
    INSERT OR REPLACE INTO subjects (subject_id, name, short_name, subject_type, is_language_subject, is_medium_dependent, active)
    VALUES (@id, @name, @short, @type, @isLang, 1, 1)
  `);

  for (const s of odSubjects) {
    insertSub.run(s);
  }
  console.log(`✅ Registered ${odSubjects.length} Odisha primary subjects in subjects table`);

  // Register official sources in official_sources table if present
  try {
    db.prepare(`
      INSERT OR REPLACE INTO official_sources (source_id, document_title, document_type, source_url, applicable_year, verification_status)
      VALUES ('src-bse-odisha-portal', 'Board of Secondary Education Odisha Official Portal', 'PORTAL', 'https://www.bseodisha.ac.in/', '2026-27', 'VERIFIED')
    `).run();
    db.prepare(`
      INSERT OR REPLACE INTO official_sources (source_id, document_title, document_type, source_url, applicable_year, verification_status)
      VALUES ('src-chse-odisha-portal', 'Council of Higher Secondary Education Odisha Official Portal', 'PORTAL', 'https://chseodisha.nic.in/', '2026-27', 'VERIFIED')
    `).run();
    console.log('✅ Registered official sources in official_sources table');
  } catch (err) {
    console.log('Note on official_sources:', err.message);
  }
})();

console.log('Odisha metadata registration complete.');
