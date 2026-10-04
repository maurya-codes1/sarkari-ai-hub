const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '../../../db/sarkari_core.db');
const db = new Database(dbPath);

console.log('Registering HPBOSE board ecosystem metadata and 31 primary subjects in SQLite...');

const hpSubjects = [
  // Class 10 (HPBOSE Matriculation) - 10 Primary Subjects
  { id: 'hp-c10-english', name: 'English (Matriculation Paper 1 - 85 Theory + 15 IA)', short: 'English 10', type: 'LANGUAGE', isLang: 1 },
  { id: 'hp-c10-hindi', name: 'Hindi (हिन्दी - Matriculation Paper 2 - 85 Theory + 15 IA)', short: 'Hindi 10', type: 'LANGUAGE', isLang: 1 },
  { id: 'hp-c10-sanskrit', name: 'Sanskrit (संस्कृत - Matriculation Paper - 85 Theory + 15 IA)', short: 'Sanskrit 10', type: 'LANGUAGE', isLang: 1 },
  { id: 'hp-c10-mathematics-en', name: 'Mathematics (English Medium - Matriculation Paper 3 - 85 Theory + 15 IA)', short: 'Maths EN 10', type: 'ACADEMIC_CORE', isLang: 0 },
  { id: 'hp-c10-mathematics-hi', name: 'Mathematics (Hindi Medium - गणित - Matriculation Paper 3 - 85 Theory + 15 IA)', short: 'Maths HI 10', type: 'ACADEMIC_CORE', isLang: 0 },
  { id: 'hp-c10-science-en', name: 'Science & Technology (English Medium - 60 Theory + 25 Practical + 15 IA - Matriculation Paper 4)', short: 'Science EN 10', type: 'ACADEMIC_CORE', isLang: 0 },
  { id: 'hp-c10-science-hi', name: 'Science & Technology (Hindi Medium - विज्ञान एवं प्रौद्योगिकी - 60 Theory + 25 Practical + 15 IA - Matriculation Paper 4)', short: 'Science HI 10', type: 'ACADEMIC_CORE', isLang: 0 },
  { id: 'hp-c10-social-science-en', name: 'Social Science (English Medium - Matriculation Paper 5 - 85 Theory + 15 IA)', short: 'Social Sci EN 10', type: 'ACADEMIC_CORE', isLang: 0 },
  { id: 'hp-c10-social-science-hi', name: 'Social Science (Hindi Medium - सामाजिक विज्ञान - Matriculation Paper 5 - 85 Theory + 15 IA)', short: 'Social Sci HI 10', type: 'ACADEMIC_CORE', isLang: 0 },
  { id: 'hp-c10-computer-science', name: 'Computer Science (Information Technology - Matriculation Elective - 60 Theory + 25 Practical + 15 IA)', short: 'CS 10', type: 'ACADEMIC_ELECTIVE', isLang: 0 },

  // Class 12 (Higher Secondary +2) - Core & Elective Languages (4 subjects)
  { id: 'hp-c12-english', name: 'English (Compulsory across all streams - +2 HSE - 85 Theory + 15 IA)', short: 'English 12', type: 'LANGUAGE', isLang: 1 },
  { id: 'hp-c12-hindi', name: 'Hindi (अनिवार्य / ऐच्छिक हिन्दी - +2 HSE - 85 Theory + 15 IA)', short: 'Hindi 12', type: 'LANGUAGE', isLang: 1 },
  { id: 'hp-c12-sanskrit', name: 'Sanskrit (संस्कृत साहित्य - +2 HSE - 85 Theory + 15 IA)', short: 'Sanskrit 12', type: 'LANGUAGE', isLang: 1 },
  { id: 'hp-c12-urdu', name: 'Urdu (اردو زبان و ادب - +2 HSE - 85 Theory + 15 IA)', short: 'Urdu 12', type: 'LANGUAGE', isLang: 1 },

  // Class 12 (+2 HSE) - Science Stream (6 subjects)
  { id: 'hp-c12-physics', name: 'Physics (60 Theory + 25 Practical + 15 IA - +2 HSE)', short: 'Physics 12', type: 'SCIENCE_ELECTIVE', isLang: 0 },
  { id: 'hp-c12-chemistry', name: 'Chemistry (60 Theory + 25 Practical + 15 IA - +2 HSE)', short: 'Chemistry 12', type: 'SCIENCE_ELECTIVE', isLang: 0 },
  { id: 'hp-c12-biology', name: 'Biology (Botany & Zoology - 60 Theory + 25 Practical + 15 IA - +2 HSE)', short: 'Biology 12', type: 'SCIENCE_ELECTIVE', isLang: 0 },
  { id: 'hp-c12-mathematics', name: 'Mathematics (85 Theory + 15 IA - +2 HSE)', short: 'Maths 12', type: 'SCIENCE_ELECTIVE', isLang: 0 },
  { id: 'hp-c12-computer-science', name: 'Computer Science (60 Theory + 25 Practical + 15 IA - +2 HSE)', short: 'CS 12', type: 'ACADEMIC_ELECTIVE', isLang: 0 },
  { id: 'hp-c12-physical-education', name: 'Physical Education (60 Theory + 25 Practical + 15 IA - +2 HSE)', short: 'Phys Ed 12', type: 'ACADEMIC_ELECTIVE', isLang: 0 },

  // Class 12 (+2 HSE) - Commerce Stream (5 subjects)
  { id: 'hp-c12-accountancy', name: 'Accountancy (85 Theory + 15 Project - +2 HSE)', short: 'Accountancy 12', type: 'COMMERCE_ELECTIVE', isLang: 0 },
  { id: 'hp-c12-business-studies', name: 'Business Studies (85 Theory + 15 Project - +2 HSE)', short: 'Business St 12', type: 'COMMERCE_ELECTIVE', isLang: 0 },
  { id: 'hp-c12-economics', name: 'Economics (85 Theory + 15 Project - +2 HSE)', short: 'Economics 12', type: 'COMMERCE_ELECTIVE', isLang: 0 },
  { id: 'hp-c12-business-maths', name: 'Business Mathematics & Statistics (85 Theory + 15 IA - +2 HSE)', short: 'Biz Maths 12', type: 'COMMERCE_ELECTIVE', isLang: 0 },
  { id: 'hp-c12-financial-literacy', name: 'Financial Markets & Commercial Banking (85 Theory + 15 Project - +2 HSE)', short: 'Fin Markets 12', type: 'COMMERCE_ELECTIVE', isLang: 0 },

  // Class 12 (+2 HSE) - Arts / Humanities Stream (6 subjects)
  { id: 'hp-c12-history', name: 'History (Themes in Indian History & Himachal Hill States - 85 Theory + 15 Project - +2 HSE)', short: 'History 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 },
  { id: 'hp-c12-political-science', name: 'Political Science (Indian Constitution & World Politics - 85 Theory + 15 Project - +2 HSE)', short: 'Pol Science 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 },
  { id: 'hp-c12-geography', name: 'Geography (Fundamentals & Himachal Geography - 60 Theory + 25 Practical + 15 IA - +2 HSE)', short: 'Geography 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 },
  { id: 'hp-c12-sociology', name: 'Sociology (Indian Society & Social Change - 85 Theory + 15 Project - +2 HSE)', short: 'Sociology 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 },
  { id: 'hp-c12-psychology', name: 'Psychology (Human Behaviour & Practical - 60 Theory + 25 Practical + 15 IA - +2 HSE)', short: 'Psychology 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 },
  { id: 'hp-c12-public-administration', name: 'Public Administration (Administrative Systems in India - 85 Theory + 15 Project - +2 HSE)', short: 'Pub Admin 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 }
];

db.pragma('foreign_keys = OFF');

db.transaction(() => {
  const orgId = 'org-hp-board-hpbose';

  // Ensure organization is registered
  db.prepare(`
    INSERT OR REPLACE INTO organizations (organization_id, name, short_name, type, central_or_state, state_or_ut, official_website, active, verification_status)
    VALUES (@orgId, 'Himachal Pradesh Board of School Education, Dharamshala', 'HPBOSE', 'EXAM_BOARD', 'STATE', 'Himachal Pradesh', 'https://hpbose.org', 1, 'VERIFIED')
  `).run({ orgId });

  // Register canonical ecosystem in boards table
  db.prepare(`
    INSERT OR REPLACE INTO boards (board_id, organization_id, name, short_name, jurisdiction, board_type, official_website, official_result_url, active, verification_status)
    VALUES ('hpbose-himachal-pradesh', @orgId, 'Himachal Pradesh Board of School Education (HPBOSE)', 'HPBOSE', 'State', 'State', 'https://hpbose.org', 'https://hpbose.org/Result.aspx', 1, 'VERIFIED')
  `).run({ orgId });

  // Ensure alternate key also points correctly
  db.prepare(`
    INSERT OR REPLACE INTO boards (board_id, organization_id, name, short_name, jurisdiction, board_type, official_website, official_result_url, active, verification_status)
    VALUES ('hpbose-board', @orgId, 'Himachal Pradesh Board of School Education', 'HPBOSE', 'State', 'State', 'https://hpbose.org', 'https://hpbose.org/Result.aspx', 1, 'VERIFIED')
  `).run({ orgId });

  console.log('✅ Registered HPBOSE board entities in boards table');

  // Register all 31 primary subjects
  const insertSub = db.prepare(`
    INSERT OR REPLACE INTO subjects (subject_id, name, short_name, subject_type, is_language_subject, is_medium_dependent, active)
    VALUES (@id, @name, @short, @type, @isLang, 1, 1)
  `);

  for (const s of hpSubjects) {
    insertSub.run(s);
  }
  console.log(`✅ Registered ${hpSubjects.length} HPBOSE primary subjects in subjects table`);

  // Register official sources
  try {
    db.prepare(`
      INSERT OR REPLACE INTO official_sources (source_id, organization_id, document_title, document_type, source_url, applicable_year, verification_status)
      VALUES ('src-hpbose-portal', @orgId, 'Himachal Pradesh Board of School Education Official Portal', 'PORTAL', 'https://hpbose.org/', '2026-27', 'VERIFIED')
    `).run({ orgId });
    db.prepare(`
      INSERT OR REPLACE INTO official_sources (source_id, organization_id, document_title, document_type, source_url, applicable_year, verification_status)
      VALUES ('src-hpbose-matric-curriculum', @orgId, 'HPBOSE Matriculation (Class 10) Scheme of Studies & Syllabus', 'CURRICULUM', 'https://hpbose.org/Syllabus.aspx', '2026-27', 'VERIFIED')
    `).run({ orgId });
    db.prepare(`
      INSERT OR REPLACE INTO official_sources (source_id, organization_id, document_title, document_type, source_url, applicable_year, verification_status)
      VALUES ('src-hpbose-plus2-curriculum', @orgId, 'HPBOSE Plus Two (+2) Scheme of Studies & Syllabus', 'CURRICULUM', 'https://hpbose.org/Syllabus.aspx', '2026-27', 'VERIFIED')
    `).run({ orgId });
    console.log('✅ Registered official sources in official_sources table');
  } catch (err) {
    console.log('Note on official_sources:', err.message);
  }
})();

db.close();
console.log('✨ HPBOSE subject definitions script completed successfully.');
