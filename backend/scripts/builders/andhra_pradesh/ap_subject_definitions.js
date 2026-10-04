const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '../../../db/sarkari_core.db');
const db = new Database(dbPath);

console.log('Registering Andhra Pradesh board ecosystem metadata and 31 primary subjects in SQLite...');

const apSubjects = [
  // Class 10 (BSE AP SSC) - 10 Primary Subjects
  { id: 'ap-c10-telugu-fl', name: 'First Language Telugu (FLO - ప్రథమ భాష తెలుగు)', short: 'Telugu FL 10', type: 'LANGUAGE', isLang: 1 },
  { id: 'ap-c10-hindi-fl', name: 'First Language Hindi (प्रथम भाषा हिन्दी)', short: 'Hindi FL 10', type: 'LANGUAGE', isLang: 1 },
  { id: 'ap-c10-urdu-fl', name: 'First Language Urdu (اردو پہلی زبان)', short: 'Urdu FL 10', type: 'LANGUAGE', isLang: 1 },
  { id: 'ap-c10-telugu-sl', name: 'Second Language Telugu (ద్వితీయ భాష తెలుగు)', short: 'Telugu SL 10', type: 'LANGUAGE', isLang: 1 },
  { id: 'ap-c10-hindi-sl', name: 'Second Language Hindi (द्वितीय भाषा हिन्दी)', short: 'Hindi SL 10', type: 'LANGUAGE', isLang: 1 },
  { id: 'ap-c10-english-tl', name: 'Third Language English', short: 'English TL 10', type: 'LANGUAGE', isLang: 1 },
  { id: 'ap-c10-sanskrit-comp', name: 'Composite Sanskrit (సంస్కృతము / संस्कृतम्)', short: 'Sanskrit Comp 10', type: 'LANGUAGE', isLang: 1 },
  { id: 'ap-c10-mathematics', name: 'Mathematics (గణితము - SSC Mathematics)', short: 'Math 10', type: 'ACADEMIC_CORE', isLang: 0 },
  { id: 'ap-c10-general-science', name: 'General Science (సాధారణ శాస్త్రం - Physical & Biological Science)', short: 'Gen Sci 10', type: 'ACADEMIC_CORE', isLang: 0 },
  { id: 'ap-c10-social-studies', name: 'Social Studies (సాంఘିକ శాస్త్రం)', short: 'Social Studies 10', type: 'ACADEMIC_CORE', isLang: 0 },

  // Class 12 (BIEAP Intermediate) - Science Group (6 subjects)
  { id: 'ap-c12-mathematics', name: 'Mathematics (Maths IIA & IIB - MPC)', short: 'Maths 12', type: 'ACADEMIC_CORE', isLang: 0 },
  { id: 'ap-c12-physics', name: 'Physics (భౌతిక శాస్త్రం - MPC & BiPC)', short: 'Physics 12', type: 'SCIENCE_ELECTIVE', isLang: 0 },
  { id: 'ap-c12-chemistry', name: 'Chemistry (రసాయన శాస్త్రం - MPC & BiPC)', short: 'Chemistry 12', type: 'SCIENCE_ELECTIVE', isLang: 0 },
  { id: 'ap-c12-botany', name: 'Botany (వృక్ష శాస్త్రం - BiPC)', short: 'Botany 12', type: 'SCIENCE_ELECTIVE', isLang: 0 },
  { id: 'ap-c12-zoology', name: 'Zoology (జంతు శాస్త్రం - BiPC)', short: 'Zoology 12', type: 'SCIENCE_ELECTIVE', isLang: 0 },
  { id: 'ap-c12-computer-science', name: 'Computer Science', short: 'CS 12', type: 'ACADEMIC_ELECTIVE', isLang: 0 },

  // Class 12 (BIEAP Intermediate) - Commerce & Economics (5 subjects)
  { id: 'ap-c12-commerce', name: 'Commerce (వాణిజ్య శాస్త్రం - CEC & MEC)', short: 'Commerce 12', type: 'COMMERCE_ELECTIVE', isLang: 0 },
  { id: 'ap-c12-economics', name: 'Economics (అర్థశాస్త్రం - CEC, MEC & HEC)', short: 'Economics 12', type: 'COMMERCE_ELECTIVE', isLang: 0 },
  { id: 'ap-c12-civics', name: 'Civics / Political Science (పౌరనీతి - CEC & HEC)', short: 'Civics 12', type: 'COMMERCE_ELECTIVE', isLang: 0 },
  { id: 'ap-c12-history', name: 'History (చరిత్ర - HEC)', short: 'History 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 },
  { id: 'ap-c12-accountancy', name: 'Accountancy (ఖాతా నిర్వహణ - CEC & MEC)', short: 'Accountancy 12', type: 'COMMERCE_ELECTIVE', isLang: 0 },

  // Class 12 (BIEAP Intermediate) - Humanities & Electives (5 subjects)
  { id: 'ap-c12-public-administration', name: 'Public Administration', short: 'Public Admin 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 },
  { id: 'ap-c12-sociology', name: 'Sociology', short: 'Sociology 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 },
  { id: 'ap-c12-psychology', name: 'Psychology', short: 'Psychology 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 },
  { id: 'ap-c12-geography', name: 'Geography', short: 'Geography 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 },
  { id: 'ap-c12-logic', name: 'Logic & Philosophy', short: 'Logic Phil 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 },

  // Class 12 (BIEAP Intermediate) - Languages (5 subjects)
  { id: 'ap-c12-english-compulsory', name: 'General English (Compulsory)', short: 'English Comp 12', type: 'LANGUAGE', isLang: 1 },
  { id: 'ap-c12-telugu-sl', name: 'Second Language Telugu (తెలుగు)', short: 'Telugu SL 12', type: 'LANGUAGE', isLang: 1 },
  { id: 'ap-c12-sanskrit-sl', name: 'Second Language Sanskrit (संस्कृतम्)', short: 'Sanskrit SL 12', type: 'LANGUAGE', isLang: 1 },
  { id: 'ap-c12-hindi-sl', name: 'Second Language Hindi (हिन्दी)', short: 'Hindi SL 12', type: 'LANGUAGE', isLang: 1 },
  { id: 'ap-c12-urdu-sl', name: 'Second Language Urdu (اردو)', short: 'Urdu SL 12', type: 'LANGUAGE', isLang: 1 }
];

db.pragma('foreign_keys = OFF');

db.transaction(() => {
  // Register canonical ecosystem in boards table
  db.prepare(`
    INSERT OR REPLACE INTO boards (board_id, organization_id, name, short_name, jurisdiction, board_type, official_website, official_result_url, active, verification_status)
    VALUES ('andhra-pradesh-bse-bieap', 'org-andhra-bseap', 'Andhra Pradesh School Board Ecosystem (BSE AP & BIEAP)', 'AP-ECOSYSTEM', 'State', 'State', 'https://bse.ap.gov.in', 'https://results.bse.ap.gov.in', 1, 'VERIFIED')
  `).run();

  // Register separate authority records
  db.prepare(`
    INSERT OR REPLACE INTO boards (board_id, organization_id, name, short_name, jurisdiction, board_type, official_website, official_result_url, active, verification_status)
    VALUES ('bse-ap', 'org-andhra-bseap', 'Directorate of Government Examinations, Andhra Pradesh (BSE AP)', 'BSE AP', 'State', 'State', 'https://bse.ap.gov.in', 'https://results.bse.ap.gov.in', 1, 'VERIFIED')
  `).run();

  db.prepare(`
    INSERT OR REPLACE INTO boards (board_id, organization_id, name, short_name, jurisdiction, board_type, official_website, official_result_url, active, verification_status)
    VALUES ('bieap', 'org-andhra-bseap', 'Board of Intermediate Education, Andhra Pradesh (BIEAP)', 'BIEAP', 'State', 'State', 'https://bieap.apcfss.in', 'https://resultsbie.ap.gov.in', 1, 'VERIFIED')
  `).run();

  // Also preserve legacy alias record
  db.prepare(`
    INSERT OR REPLACE INTO boards (board_id, organization_id, name, short_name, jurisdiction, board_type, official_website, official_result_url, active, verification_status)
    VALUES ('bseap-board', 'org-andhra-bseap', 'Board of Secondary Education Andhra Pradesh (BSEAP)', 'BSEAP', 'State', 'State', 'https://bse.ap.gov.in', 'https://results.bse.ap.gov.in', 1, 'VERIFIED')
  `).run();

  console.log('✅ Registered Andhra Pradesh board entities in boards table');

  // Register all 31 primary subjects
  const insertSub = db.prepare(`
    INSERT OR REPLACE INTO subjects (subject_id, name, short_name, subject_type, is_language_subject, is_medium_dependent, active)
    VALUES (@id, @name, @short, @type, @isLang, 1, 1)
  `);

  for (const s of apSubjects) {
    insertSub.run(s);
  }
  console.log(`✅ Registered ${apSubjects.length} Andhra Pradesh primary subjects in subjects table`);

  // Register official sources in official_sources table if present
  try {
    db.prepare(`
      INSERT OR REPLACE INTO official_sources (source_id, document_title, document_type, source_url, applicable_year, verification_status)
      VALUES ('src-bse-ap-portal', 'Directorate of Government Examinations Andhra Pradesh Official Portal', 'PORTAL', 'https://bse.ap.gov.in/', '2026-27', 'VERIFIED')
    `).run();
    db.prepare(`
      INSERT OR REPLACE INTO official_sources (source_id, document_title, document_type, source_url, applicable_year, verification_status)
      VALUES ('src-bieap-portal', 'Board of Intermediate Education Andhra Pradesh Official Portal', 'PORTAL', 'https://bieap.apcfss.in/', '2026-27', 'VERIFIED')
    `).run();
    console.log('✅ Registered official sources in official_sources table');
  } catch (err) {
    console.log('Note on official_sources:', err.message);
  }
})();

console.log('Andhra Pradesh metadata registration complete.');
