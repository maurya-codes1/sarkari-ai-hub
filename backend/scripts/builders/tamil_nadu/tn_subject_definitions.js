const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '../../../db/sarkari_core.db');
const db = new Database(dbPath);

console.log('Registering Tamil Nadu DGE board ecosystem metadata and 31 primary subjects in SQLite...');

const tnSubjects = [
  // Class 10 (Tamil Nadu DGE SSLC) - 10 Primary Subjects
  { id: 'tn-c10-tamil-fl', name: 'Part I Compulsory Tamil (பொதுத் தமிழ் - SSLC Paper 1)', short: 'Tamil FL 10', type: 'LANGUAGE', isLang: 1 },
  { id: 'tn-c10-english-sl', name: 'Part II General English (SSLC Paper 2)', short: 'English SL 10', type: 'LANGUAGE', isLang: 1 },
  { id: 'tn-c10-mathematics-en', name: 'Mathematics (English Medium - SSLC Paper 3)', short: 'Maths EN 10', type: 'ACADEMIC_CORE', isLang: 0 },
  { id: 'tn-c10-mathematics-ta', name: 'Mathematics (Tamil Medium - கணிதம் - SSLC தாள் 3)', short: 'Maths TA 10', type: 'ACADEMIC_CORE', isLang: 0 },
  { id: 'tn-c10-science-en', name: 'Science (English Medium - 75 Theory + 25 Practical - SSLC Paper 4)', short: 'Science EN 10', type: 'ACADEMIC_CORE', isLang: 0 },
  { id: 'tn-c10-science-ta', name: 'Science (Tamil Medium - அறிவியல் - 75 தியரி + 25 செய்முறை - SSLC தாள் 4)', short: 'Science TA 10', type: 'ACADEMIC_CORE', isLang: 0 },
  { id: 'tn-c10-social-science-en', name: 'Social Science (English Medium - History, Geog, Civics, Econ - SSLC Paper 5)', short: 'Social Sci EN 10', type: 'ACADEMIC_CORE', isLang: 0 },
  { id: 'tn-c10-social-science-ta', name: 'Social Science (Tamil Medium - சமூக அறிவியல் - SSLC தாள் 5)', short: 'Social Sci TA 10', type: 'ACADEMIC_CORE', isLang: 0 },
  { id: 'tn-c10-hindi-opt', name: 'Part IV Optional Language Hindi (விருப்ப மொழி இந்தி - SSLC Paper 6)', short: 'Hindi Opt 10', type: 'LANGUAGE', isLang: 1 },
  { id: 'tn-c10-telugu-opt', name: 'Part IV Optional Language Telugu (விருப்ப மொழி தெலுங்கு - SSLC Paper 6)', short: 'Telugu Opt 10', type: 'LANGUAGE', isLang: 1 },

  // Class 12 (Higher Secondary Second Year / +2) - Part I & II Languages (4 subjects)
  { id: 'tn-c12-tamil-part1', name: 'Part I Tamil (பொதுத் தமிழ் - Higher Secondary +2)', short: 'Tamil Part1 12', type: 'LANGUAGE', isLang: 1 },
  { id: 'tn-c12-english-part2', name: 'Part II English (General English - Higher Secondary +2)', short: 'English Part2 12', type: 'LANGUAGE', isLang: 1 },
  { id: 'tn-c12-hindi-part1', name: 'Part I Hindi (सामान्य हिन्दी - Higher Secondary +2)', short: 'Hindi Part1 12', type: 'LANGUAGE', isLang: 1 },
  { id: 'tn-c12-french-part1', name: 'Part I French (Français - Higher Secondary +2)', short: 'French Part1 12', type: 'LANGUAGE', isLang: 1 },

  // Class 12 (+2 Higher Secondary) - Science Electives (7 subjects)
  { id: 'tn-c12-physics', name: 'Physics (இயற்பியல் - 70 Theory + 30 Practical/IA - +2)', short: 'Physics 12', type: 'SCIENCE_ELECTIVE', isLang: 0 },
  { id: 'tn-c12-chemistry', name: 'Chemistry (வேதியியல் - 70 Theory + 30 Practical/IA - +2)', short: 'Chemistry 12', type: 'SCIENCE_ELECTIVE', isLang: 0 },
  { id: 'tn-c12-mathematics', name: 'Mathematics (கணிதவியல் - 90 Theory + 10 IA - +2)', short: 'Maths 12', type: 'SCIENCE_ELECTIVE', isLang: 0 },
  { id: 'tn-c12-biology', name: 'Biology (உயிரியல் - 70 Theory + 30 Practical/IA - +2)', short: 'Biology 12', type: 'SCIENCE_ELECTIVE', isLang: 0 },
  { id: 'tn-c12-computer-science', name: 'Computer Science (கணினி அறிவியல் - 70 Theory + 30 Practical/IA - +2)', short: 'CS 12', type: 'ACADEMIC_ELECTIVE', isLang: 0 },
  { id: 'tn-c12-botany', name: 'Botany (தாவரவியல் / Bio-Botany - +2)', short: 'Botany 12', type: 'SCIENCE_ELECTIVE', isLang: 0 },
  { id: 'tn-c12-zoology', name: 'Zoology (விலங்கியல் / Bio-Zoology - +2)', short: 'Zoology 12', type: 'SCIENCE_ELECTIVE', isLang: 0 },

  // Class 12 (+2 Higher Secondary) - Commerce Electives (5 subjects)
  { id: 'tn-c12-accountancy', name: 'Accountancy (கணக்குப்பதிவியல் - 90 Theory + 10 IA - +2)', short: 'Accountancy 12', type: 'COMMERCE_ELECTIVE', isLang: 0 },
  { id: 'tn-c12-commerce', name: 'Commerce (வணிகவியல் - 90 Theory + 10 IA - +2)', short: 'Commerce 12', type: 'COMMERCE_ELECTIVE', isLang: 0 },
  { id: 'tn-c12-economics', name: 'Economics (பொருளியல் - 90 Theory + 10 IA - +2)', short: 'Economics 12', type: 'COMMERCE_ELECTIVE', isLang: 0 },
  { id: 'tn-c12-business-maths', name: 'Business Mathematics and Statistics (வணிகக் கணிதம் மற்றும் புள்ளியியல் - +2)', short: 'Biz Maths 12', type: 'COMMERCE_ELECTIVE', isLang: 0 },
  { id: 'tn-c12-computer-applications', name: 'Computer Applications (கணினி பயன்பாடுகள் - 70 Theory + 30 Practical/IA - +2)', short: 'Comp Apps 12', type: 'COMMERCE_ELECTIVE', isLang: 0 },

  // Class 12 (+2 Higher Secondary) - Humanities / Arts Electives (5 subjects)
  { id: 'tn-c12-history', name: 'History (வரலாறு - 90 Theory + 10 IA - +2)', short: 'History 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 },
  { id: 'tn-c12-political-science', name: 'Political Science (அரசியல் அறிவியல் - 90 Theory + 10 IA - +2)', short: 'Pol Science 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 },
  { id: 'tn-c12-geography', name: 'Geography (புவியியல் - 70 Theory + 30 Practical/IA - +2)', short: 'Geography 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 },
  { id: 'tn-c12-ethics-culture', name: 'Ethics and Indian Culture (அறவியலும் இந்தியப் பண்பாடும் - +2)', short: 'Ethics 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 },
  { id: 'tn-c12-advanced-tamil', name: 'Advanced Language Tamil (சிறப்புத் தமிழ் - +2)', short: 'Adv Tamil 12', type: 'HUMANITIES_ELECTIVE', isLang: 1 }
];

db.pragma('foreign_keys = OFF');

db.transaction(() => {
  const orgId = 'org-directorate-of-government-examinations-c';

  // Register canonical ecosystem in boards table
  db.prepare(`
    INSERT OR REPLACE INTO boards (board_id, organization_id, name, short_name, jurisdiction, board_type, official_website, official_result_url, active, verification_status)
    VALUES ('tamil-nadu-dge', @orgId, 'Directorate of Government Examinations, Tamil Nadu (DGE Tamil Nadu)', 'TN-DGE', 'State', 'State', 'https://www.dge.tn.gov.in', 'https://tnresults.nic.in', 1, 'VERIFIED')
  `).run({ orgId });

  // Register authority entity in boards table
  db.prepare(`
    INSERT OR REPLACE INTO boards (board_id, organization_id, name, short_name, jurisdiction, board_type, official_website, official_result_url, active, verification_status)
    VALUES ('dge-tamil-nadu', @orgId, 'Directorate of Government Examinations, Tamil Nadu', 'DGE-TN', 'State', 'State', 'https://www.dge.tn.gov.in', 'https://tnresults.nic.in', 1, 'VERIFIED')
  `).run({ orgId });

  console.log('✅ Registered Tamil Nadu board entities in boards table');

  // Register all 31 primary subjects
  const insertSub = db.prepare(`
    INSERT OR REPLACE INTO subjects (subject_id, name, short_name, subject_type, is_language_subject, is_medium_dependent, active)
    VALUES (@id, @name, @short, @type, @isLang, 1, 1)
  `);

  for (const s of tnSubjects) {
    insertSub.run(s);
  }
  console.log(`✅ Registered ${tnSubjects.length} Tamil Nadu primary subjects in subjects table`);

  // Register official sources
  try {
    db.prepare(`
      INSERT OR REPLACE INTO official_sources (source_id, organization_id, document_title, document_type, source_url, applicable_year, verification_status)
      VALUES ('src-dge-tn-portal', @orgId, 'Directorate of Government Examinations, Tamil Nadu Official Portal', 'PORTAL', 'https://www.dge.tn.gov.in/', '2026-27', 'VERIFIED')
    `).run({ orgId });
    db.prepare(`
      INSERT OR REPLACE INTO official_sources (source_id, organization_id, document_title, document_type, source_url, applicable_year, verification_status)
      VALUES ('src-dge-tn-sslc-curriculum', @orgId, 'DGE Tamil Nadu SSLC Examination Scheme and Regulation', 'CURRICULUM', 'https://www.dge.tn.gov.in/sslc.html', '2026-27', 'VERIFIED')
    `).run({ orgId });
    db.prepare(`
      INSERT OR REPLACE INTO official_sources (source_id, organization_id, document_title, document_type, source_url, applicable_year, verification_status)
      VALUES ('src-dge-tn-hse-curriculum', @orgId, 'DGE Tamil Nadu Higher Secondary Examination Timetable & Groups', 'CURRICULUM', 'https://www.dge.tn.gov.in/hse.html', '2026-27', 'VERIFIED')
    `).run({ orgId });
    console.log('✅ Registered official sources in official_sources table');
  } catch (err) {
    console.log('Note on official_sources:', err.message);
  }
})();

console.log('Tamil Nadu metadata registration complete.');
