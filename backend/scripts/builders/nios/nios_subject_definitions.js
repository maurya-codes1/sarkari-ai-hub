const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '../../../db/sarkari_core.db');
const db = new Database(dbPath);

console.log('Registering NIOS board metadata, sources, and primary subjects in SQLite...');

const niosSubjects = [
  // Secondary Course (Class 10 level) - 10 Primary Academic Subjects
  { id: 'nios-hindi-201', name: 'Hindi (हिन्दी - कोड 201)', short: 'Hindi 201', type: 'LANGUAGE', isLang: 1 },
  { id: 'nios-english-202', name: 'English (Code 202)', short: 'Eng 202', type: 'LANGUAGE', isLang: 1 },
  { id: 'nios-math-211', name: 'Mathematics (गणित - कोड 211)', short: 'Math 211', type: 'ACADEMIC_CORE', isLang: 0 },
  { id: 'nios-science-212', name: 'Science and Technology (विज्ञान एवं प्रौद्योगिकी - कोड 212)', short: 'Sci & Tech 212', type: 'ACADEMIC_CORE', isLang: 0 },
  { id: 'nios-social-213', name: 'Social Science (सामाजिक विज्ञान - कोड 213)', short: 'SST 213', type: 'ACADEMIC_CORE', isLang: 0 },
  { id: 'nios-economics-214', name: 'Economics (अर्थशास्त्र - कोड 214)', short: 'Econ 214', type: 'ACADEMIC_CORE', isLang: 0 },
  { id: 'nios-bst-215', name: 'Business Studies (व्यवसाय अध्ययन - कोड 215)', short: 'BST 215', type: 'ACADEMIC_CORE', isLang: 0 },
  { id: 'nios-homesci-216', name: 'Home Science (गृह विज्ञान - कोड 216)', short: 'Home Sci 216', type: 'ACADEMIC_CORE', isLang: 0 },
  { id: 'nios-psychology-222', name: 'Psychology (मनोविज्ञान - कोड 222)', short: 'Psych 222', type: 'ACADEMIC_CORE', isLang: 0 },
  { id: 'nios-indian-culture-223', name: 'Indian Culture & Heritage (भारतीय संस्कृति एवं विरासत - कोड 223)', short: 'Culture 223', type: 'ACADEMIC_CORE', isLang: 0 },

  // Senior Secondary Course (Class 12 level) - Science Track (7 Subjects)
  { id: 'nios-physics-312', name: 'Physics (भौतिक विज्ञान - कोड 312)', short: 'Physics 312', type: 'SCIENCE_ELECTIVE', isLang: 0 },
  { id: 'nios-chemistry-313', name: 'Chemistry (रसायन विज्ञान - कोड 313)', short: 'Chem 313', type: 'SCIENCE_ELECTIVE', isLang: 0 },
  { id: 'nios-biology-314', name: 'Biology (जीव विज्ञान - कोड 314)', short: 'Biology 314', type: 'SCIENCE_ELECTIVE', isLang: 0 },
  { id: 'nios-math-311', name: 'Mathematics (गणित - कोड 311)', short: 'Math 311', type: 'ACADEMIC_CORE', isLang: 0 },
  { id: 'nios-cs-330', name: 'Computer Science (कंप्यूटर विज्ञान - कोड 330)', short: 'CS 330', type: 'ACADEMIC_ELECTIVE', isLang: 0 },
  { id: 'nios-english-302', name: 'English (Senior Secondary - Code 302)', short: 'Eng 302', type: 'LANGUAGE', isLang: 1 },
  { id: 'nios-environmental-333', name: 'Environmental Science (पर्यावरण विज्ञान - कोड 333)', short: 'Env Sci 333', type: 'SCIENCE_ELECTIVE', isLang: 0 },

  // Senior Secondary Course (Class 12 level) - Commerce Track (7 Subjects)
  { id: 'nios-accountancy-320', name: 'Accountancy (लेखांकन - कोड 320)', short: 'Accounts 320', type: 'COMMERCE_ELECTIVE', isLang: 0 },
  { id: 'nios-bst-319', name: 'Business Studies (व्यवसाय अध्ययन - कोड 319)', short: 'BST 319', type: 'COMMERCE_ELECTIVE', isLang: 0 },
  { id: 'nios-economics-318', name: 'Economics (अर्थशास्त्र - कोड 318)', short: 'Econ 318', type: 'COMMERCE_ELECTIVE', isLang: 0 },
  { id: 'nios-dataentry-336', name: 'Data Entry Operations (डेटा एंट्री ऑपरेशंस - कोड 336)', short: 'Data Entry 336', type: 'ACADEMIC_ELECTIVE', isLang: 0 },
  { id: 'nios-hindi-301', name: 'Hindi (हिन्दी - कोड 301)', short: 'Hindi 301', type: 'LANGUAGE', isLang: 1 },
  { id: 'nios-masscomm-335', name: 'Mass Communication (जनसंचार - कोड 335)', short: 'Mass Comm 335', type: 'ACADEMIC_ELECTIVE', isLang: 0 },
  { id: 'nios-tourism-337', name: 'Tourism (पर्यटन - कोड 337)', short: 'Tourism 337', type: 'ACADEMIC_ELECTIVE', isLang: 0 },

  // Senior Secondary Course (Class 12 level) - Humanities / Social Sciences Track (7 Subjects)
  { id: 'nios-history-315', name: 'History (इतिहास - कोड 315)', short: 'History 315', type: 'HUMANITIES_ELECTIVE', isLang: 0 },
  { id: 'nios-geography-316', name: 'Geography (भूगोल - कोड 316)', short: 'Geography 316', type: 'HUMANITIES_ELECTIVE', isLang: 0 },
  { id: 'nios-polscience-317', name: 'Political Science (राजनीति विज्ञान - कोड 317)', short: 'Pol Sci 317', type: 'HUMANITIES_ELECTIVE', isLang: 0 },
  { id: 'nios-sociology-331', name: 'Sociology (समाजशास्त्र - कोड 331)', short: 'Sociology 331', type: 'HUMANITIES_ELECTIVE', isLang: 0 },
  { id: 'nios-psychology-328', name: 'Psychology (मनोविज्ञान - कोड 328)', short: 'Psych 328', type: 'HUMANITIES_ELECTIVE', isLang: 0 },
  { id: 'nios-homesci-321', name: 'Home Science (गृह विज्ञान - कोड 321)', short: 'Home Sci 321', type: 'ACADEMIC_ELECTIVE', isLang: 0 },
  { id: 'nios-law-338', name: 'Introduction to Law (विधि का परिचय - कोड 338)', short: 'Law 338', type: 'HUMANITIES_ELECTIVE', isLang: 0 }
];

db.pragma('foreign_keys = OFF');

db.transaction(() => {
  // Ensure nios-board exists in boards table
  const existingBoard = db.prepare("SELECT * FROM boards WHERE board_id = 'nios-board'").get();
  if (!existingBoard) {
    db.prepare(`
      INSERT INTO boards (board_id, organization_id, name, short_name, jurisdiction, board_type, official_website, official_result_url, active, verification_status)
      VALUES ('nios-board', 'org-national-institute-of-open-schooling-min', 'National Institute of Open Schooling', 'NIOS', 'National', 'Open_School', 'https://www.nios.ac.in', 'https://results.nios.ac.in', 1, 'VERIFIED')
    `).run();
    console.log('✅ Inserted nios-board into boards table');
  } else {
    db.prepare("UPDATE boards SET name = 'National Institute of Open Schooling', short_name = 'NIOS', active = 1, verification_status = 'VERIFIED' WHERE board_id = 'nios-board'").run();
  }

  // Ensure official source is registered
  const existingSource = db.prepare("SELECT * FROM official_sources WHERE source_id = 'src-nios-board-portal'").get();
  if (!existingSource) {
    db.prepare(`
      INSERT INTO official_sources (
        source_id, organization_id, document_title, document_type,
        source_url, publication_date, effective_date, applicable_year,
        source_hash, retrieved_at, verified_at, verification_status,
        issuing_authority, freshness_status
      ) VALUES (
        'src-nios-board-portal', 'org-national-institute-of-open-schooling-min', 'NIOS Official Portal & SDMIS Academic Repository', 'OFFICIAL_PORTAL',
        'https://www.nios.ac.in', '2026-09-01', '2026-09-01', '2026-27',
        'hash-nios-verified', '2026-10-04', '2026-10-04', 'VERIFIED',
        'National Institute of Open Schooling, NOIDA', 'FRESH'
      )
    `).run();
    console.log('✅ Registered src-nios-board-portal in official_sources');
  } else {
    db.prepare(`
      UPDATE official_sources SET
        organization_id = 'org-national-institute-of-open-schooling-min',
        document_title = 'NIOS Official Portal & SDMIS Academic Repository',
        verification_status = 'VERIFIED',
        freshness_status = 'FRESH'
      WHERE source_id = 'src-nios-board-portal'
    `).run();
    console.log('✅ Updated src-nios-board-portal in official_sources');
  }

  // Insert primary subjects
  const insertStmt = db.prepare(`
    INSERT OR REPLACE INTO subjects (subject_id, name, short_name, subject_type, is_language_subject, is_medium_dependent, active)
    VALUES (@id, @name, @short, @type, @isLang, 1, 1)
  `);

  for (const s of niosSubjects) {
    insertStmt.run(s);
  }
  console.log(`✅ Registered ${niosSubjects.length} NIOS primary subjects in subjects table.`);
})();

db.pragma('foreign_keys = ON');

const fkErrors = db.prepare('PRAGMA foreign_key_check').all();
if (fkErrors.length > 0) {
  console.error('❌ Foreign key check errors after subject registration:', fkErrors);
  process.exit(1);
} else {
  console.log('✅ Foreign key check passed successfully.');
}

console.log('NIOS database registration completed cleanly.');
