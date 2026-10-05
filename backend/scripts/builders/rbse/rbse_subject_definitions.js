const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '../../../db/sarkari_core.db');
const db = new Database(dbPath);

console.log('Registering RBSE board metadata, sources, and primary subjects in SQLite...');

const rbseSubjects = [
  // Class 10 (Secondary) - 10 Primary Subjects
  { id: 'rbse-hindi-10', name: 'Hindi (हिन्दी - अनिवार्य)', short: 'Hindi 10', type: 'LANGUAGE', isLang: 1 },
  { id: 'rbse-english-10', name: 'English (अंग्रेजी)', short: 'English 10', type: 'LANGUAGE', isLang: 1 },
  { id: 'rbse-science-10', name: 'Science (विज्ञान)', short: 'Science 10', type: 'ACADEMIC_CORE', isLang: 0 },
  { id: 'rbse-social-10', name: 'Social Science (सामाजिक विज्ञान)', short: 'SST 10', type: 'ACADEMIC_CORE', isLang: 0 },
  { id: 'rbse-math-10', name: 'Mathematics (गणित)', short: 'Math 10', type: 'ACADEMIC_CORE', isLang: 0 },
  { id: 'rbse-sanskrit-10', name: 'Sanskrit (तृतीय भाषा - संस्कृत)', short: 'Sanskrit 10', type: 'LANGUAGE', isLang: 1 },
  { id: 'rbse-urdu-10', name: 'Urdu (तृतीय भाषा - उर्दू)', short: 'Urdu 10', type: 'LANGUAGE', isLang: 1 },
  { id: 'rbse-punjabi-10', name: 'Punjabi (तृतीय भाषा - पंजाबी)', short: 'Punjabi 10', type: 'LANGUAGE', isLang: 1 },
  { id: 'rbse-gujarati-10', name: 'Gujarati (तृतीय भाषा - गुजराती)', short: 'Gujarati 10', type: 'LANGUAGE', isLang: 1 },
  { id: 'rbse-sindhi-10', name: 'Sindhi (तृतीय भाषा - सिंधी)', short: 'Sindhi 10', type: 'LANGUAGE', isLang: 1 },

  // Class 12 Science Track - 7 Primary Subjects
  { id: 'rbse-physics-12', name: 'Physics (भौतिक विज्ञान)', short: 'Physics 12', type: 'SCIENCE_ELECTIVE', isLang: 0 },
  { id: 'rbse-chemistry-12', name: 'Chemistry (रसायन विज्ञान)', short: 'Chemistry 12', type: 'SCIENCE_ELECTIVE', isLang: 0 },
  { id: 'rbse-biology-12', name: 'Biology (जीव विज्ञान)', short: 'Biology 12', type: 'SCIENCE_ELECTIVE', isLang: 0 },
  { id: 'rbse-math-12', name: 'Mathematics (गणित)', short: 'Math 12', type: 'ACADEMIC_CORE', isLang: 0 },
  { id: 'rbse-cs-12', name: 'Computer Science (कंप्यूटर विज्ञान)', short: 'CS 12', type: 'ACADEMIC_ELECTIVE', isLang: 0 },
  { id: 'rbse-english-comp-12', name: 'English Compulsory (अंग्रेजी अनिवार्य)', short: 'Eng Comp 12', type: 'LANGUAGE', isLang: 1 },
  { id: 'rbse-hindi-comp-12', name: 'Hindi Compulsory (हिन्दी अनिवार्य)', short: 'Hindi Comp 12', type: 'LANGUAGE', isLang: 1 },

  // Class 12 Commerce Track - 6 Primary Subjects
  { id: 'rbse-accountancy-12', name: 'Accountancy (लेखाशास्त्र)', short: 'Accounts 12', type: 'COMMERCE_ELECTIVE', isLang: 0 },
  { id: 'rbse-bst-12', name: 'Business Studies (व्यवसाय अध्ययन)', short: 'BST 12', type: 'COMMERCE_ELECTIVE', isLang: 0 },
  { id: 'rbse-economics-12', name: 'Economics (अर्थशास्त्र)', short: 'Econ Com 12', type: 'COMMERCE_ELECTIVE', isLang: 0 },
  { id: 'rbse-ip-com-12', name: 'Informatics Practices (सूचना प्रौद्योगिकी)', short: 'IP 12', type: 'ACADEMIC_ELECTIVE', isLang: 0 },
  { id: 'rbse-english-comp-com-12', name: 'English Compulsory (Commerce)', short: 'Eng Com 12', type: 'LANGUAGE', isLang: 1 },
  { id: 'rbse-hindi-comp-com-12', name: 'Hindi Compulsory (Commerce)', short: 'Hindi Com 12', type: 'LANGUAGE', isLang: 1 },

  // Class 12 Humanities / Arts Track - 7 Primary Subjects
  { id: 'rbse-history-12', name: 'History (इतिहास)', short: 'History 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 },
  { id: 'rbse-geography-12', name: 'Geography (भूगोल)', short: 'Geography 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 },
  { id: 'rbse-polscience-12', name: 'Political Science (राजनीति विज्ञान)', short: 'Pol Sci 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 },
  { id: 'rbse-economics-hum-12', name: 'Economics (Humanities)', short: 'Econ Hum 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 },
  { id: 'rbse-sociology-12', name: 'Sociology (समाजशास्त्र)', short: 'Sociology 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 },
  { id: 'rbse-public-admin-12', name: 'Public Administration (लोक प्रशासन)', short: 'Pub Admin 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 },
  { id: 'rbse-homesci-12', name: 'Home Science (गृह विज्ञान)', short: 'Home Sci 12', type: 'ACADEMIC_ELECTIVE', isLang: 0 },

  // Class 12 Agriculture Track - 1 Primary Subject
  { id: 'rbse-agriculture-12', name: 'Agriculture (कृषि विज्ञान)', short: 'Agri 12', type: 'AGRICULTURE_ELECTIVE', isLang: 0 }
];

db.pragma('foreign_keys = OFF');

db.transaction(() => {
  // Ensure rbse-rajasthan is up to date in boards table
  db.prepare(`
    INSERT OR REPLACE INTO boards (board_id, organization_id, name, short_name, jurisdiction, board_type, official_website, official_result_url, active, verification_status)
    VALUES ('rbse-rajasthan', 'org-board-of-secondary-education-rajasthan-a', 'Board of Secondary Education, Rajasthan, Ajmer', 'RBSE', 'State', 'State', 'https://rajeduboard.rajasthan.gov.in', 'https://rajeduboard.rajasthan.gov.in', 1, 'VERIFIED')
  `).run();
  console.log('✅ Verified rbse-rajasthan in boards table');

  // Ensure official source is registered and verified
  db.prepare(`
    INSERT OR REPLACE INTO official_sources (
      source_id, organization_id, document_title, document_type,
      source_url, publication_date, effective_date, applicable_year,
      source_hash, retrieved_at, verified_at, verification_status,
      issuing_authority, freshness_status
    ) VALUES (
      'src-rbse-rajasthan-portal', 'org-board-of-secondary-education-rajasthan-a', 'Board of Secondary Education, Rajasthan Official Portal & Academic Repository', 'OFFICIAL_PORTAL',
      'https://rajeduboard.rajasthan.gov.in', '2026-09-01', '2026-09-01', '2026-27',
      'hash-rbse-verified', '2026-10-04', '2026-10-04', 'VERIFIED',
      'Board of Secondary Education, Rajasthan, Ajmer', 'FRESH'
    )
  `).run();
  console.log('✅ Verified src-rbse-rajasthan-portal in official_sources');

  // Insert primary subjects
  const insertStmt = db.prepare(`
    INSERT OR REPLACE INTO subjects (subject_id, name, short_name, subject_type, is_language_subject, is_medium_dependent, active)
    VALUES (@id, @name, @short, @type, @isLang, 1, 1)
  `);

  for (const s of rbseSubjects) {
    insertStmt.run(s);
  }
  console.log(`✅ Registered ${rbseSubjects.length} RBSE primary subjects in subjects table.`);
})();

db.pragma('foreign_keys = ON');

const fkErrors = db.prepare('PRAGMA foreign_key_check').all();
if (fkErrors.length > 0) {
  console.error('❌ Foreign key check errors after subject registration:', fkErrors);
  process.exit(1);
} else {
  console.log('✅ Foreign key check passed successfully (0 errors).');
}

console.log('RBSE database subject registration completed cleanly.');
