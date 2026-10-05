const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '../../../db/sarkari_core.db');
const db = new Database(dbPath);

console.log('Registering UPMSP board metadata, sources, and primary subjects in SQLite...');

const upmspSubjects = [
  // Class 10 (High School) Primary Academic Subjects
  { id: 'upmsp-hindi-10', name: 'Hindi (हिन्दी - कोड 901)', short: 'Hindi 10', type: 'LANGUAGE', isLang: 1 },
  { id: 'upmsp-english-10', name: 'English (Code 917)', short: 'Eng 10', type: 'LANGUAGE', isLang: 1 },
  { id: 'upmsp-math-10', name: 'Mathematics (गणित - कोड 928)', short: 'Math 10', type: 'ACADEMIC_CORE', isLang: 0 },
  { id: 'upmsp-science-10', name: 'Science (विज्ञान - कोड 931)', short: 'Science 10', type: 'ACADEMIC_CORE', isLang: 0 },
  { id: 'upmsp-social-10', name: 'Social Science (सामाजिक विज्ञान - कोड 932)', short: 'SST 10', type: 'ACADEMIC_CORE', isLang: 0 },
  { id: 'upmsp-sanskrit-10', name: 'Sanskrit (संस्कृत - कोड 923)', short: 'Sanskrit 10', type: 'LANGUAGE', isLang: 1 },
  { id: 'upmsp-urdu-10', name: 'Urdu (اردو - कोड 904)', short: 'Urdu 10', type: 'LANGUAGE', isLang: 1 },
  { id: 'upmsp-punjabi-10', name: 'Punjabi (ਪੰਜਾਬੀ - कोड 905)', short: 'Punjabi 10', type: 'LANGUAGE', isLang: 1 },
  { id: 'upmsp-bengali-10', name: 'Bengali (বাংলা - कोड 906)', short: 'Bengali 10', type: 'LANGUAGE', isLang: 1 },
  { id: 'upmsp-homesci-10', name: 'Home Science (गृह विज्ञान - कोड 930)', short: 'Home Sci 10', type: 'ACADEMIC_CORE', isLang: 0 },

  // Class 12 Science Stream (Group B)
  { id: 'upmsp-physics-12', name: 'Physics (भौतिक विज्ञान - कोड 151)', short: 'Physics 12', type: 'SCIENCE_ELECTIVE', isLang: 0 },
  { id: 'upmsp-chemistry-12', name: 'Chemistry (रसायन विज्ञान - कोड 152)', short: 'Chemistry 12', type: 'SCIENCE_ELECTIVE', isLang: 0 },
  { id: 'upmsp-biology-12', name: 'Biology (जीव विज्ञान - कोड 153)', short: 'Biology 12', type: 'SCIENCE_ELECTIVE', isLang: 0 },
  { id: 'upmsp-math-12', name: 'Mathematics (गणित - कोड 131)', short: 'Math 12', type: 'ACADEMIC_CORE', isLang: 0 },
  { id: 'upmsp-english-12', name: 'English (Class 12 - Code 117)', short: 'Eng (Sc) 12', type: 'LANGUAGE', isLang: 1 },
  { id: 'upmsp-genhindi-12', name: 'General Hindi (सामान्य हिन्दी - कोड 102)', short: 'Gen Hindi 12', type: 'LANGUAGE', isLang: 1 },
  { id: 'upmsp-cs-12', name: 'Computer (कंप्यूटर - कोड 144)', short: 'CS 12', type: 'ACADEMIC_ELECTIVE', isLang: 0 },

  // Class 12 Commerce Stream (Group C)
  { id: 'upmsp-accountancy-12', name: 'Accountancy (बहीखाता तथा लेखाशास्त्र - कोड 156)', short: 'Accounts 12', type: 'COMMERCE_ELECTIVE', isLang: 0 },
  { id: 'upmsp-bst-12', name: 'Business Studies (व्यापारिक संगठन - कोड 157)', short: 'BST 12', type: 'COMMERCE_ELECTIVE', isLang: 0 },
  { id: 'upmsp-economics-12', name: 'Economics (अर्थशास्त्र - कोड 136)', short: 'Econ (Com) 12', type: 'COMMERCE_ELECTIVE', isLang: 0 },
  { id: 'upmsp-english-com-12', name: 'English (Commerce 12 - Code 117)', short: 'Eng (Com) 12', type: 'LANGUAGE', isLang: 1 },
  { id: 'upmsp-genhindi-com-12', name: 'General Hindi (Commerce 12 - Code 102)', short: 'Gen Hindi (Com)', type: 'LANGUAGE', isLang: 1 },
  { id: 'upmsp-math-com-12', name: 'Mathematics (Commerce 12 - Code 131)', short: 'Math (Com) 12', type: 'ACADEMIC_CORE', isLang: 0 },

  // Class 12 Humanities Stream (Group A)
  { id: 'upmsp-history-12', name: 'History (इतिहास - कोड 128)', short: 'History 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 },
  { id: 'upmsp-civics-12', name: 'Civics (नागरिक शास्त्र - कोड 130)', short: 'Civics 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 },
  { id: 'upmsp-geography-12', name: 'Geography (भूगोल - कोड 129)', short: 'Geography 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 },
  { id: 'upmsp-economics-hum-12', name: 'Economics (Humanities 12 - Code 136)', short: 'Econ (Arts) 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 },
  { id: 'upmsp-sociology-12', name: 'Sociology (समाजशास्त्र - कोड 142)', short: 'Sociology 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 },
  { id: 'upmsp-psychology-12', name: 'Psychology (मनोविज्ञान - कोड 133)', short: 'Psychology 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 },
  { id: 'upmsp-sanskrit-12', name: 'Sanskrit (संस्कृत 12 - कोड 103)', short: 'Sanskrit 12', type: 'LANGUAGE', isLang: 1 },

  // Class 12 Agriculture Stream (Group F1)
  { id: 'upmsp-agri-12', name: 'Agriculture (कृषि विज्ञान एवं प्रौद्योगिकी - कोड 163-167)', short: 'Agri 12', type: 'ACADEMIC_ELECTIVE', isLang: 0 }
];

db.pragma('foreign_keys = OFF');

db.transaction(() => {
  // Ensure upmsp-uttar-pradesh exists in boards table
  const existingBoard = db.prepare("SELECT * FROM boards WHERE board_id = 'upmsp-uttar-pradesh'").get();
  if (!existingBoard) {
    const oldBoard = db.prepare("SELECT * FROM boards WHERE board_id = 'upmsp-board'").get();
    if (oldBoard) {
      db.prepare("UPDATE boards SET board_id = 'upmsp-uttar-pradesh' WHERE board_id = 'upmsp-board'").run();
      db.prepare("UPDATE exams SET board_id = 'upmsp-uttar-pradesh' WHERE board_id = 'upmsp-board'").run();
      db.prepare("UPDATE board_academic_offerings SET board_id = 'upmsp-uttar-pradesh' WHERE board_id = 'upmsp-board'").run();
      db.prepare("UPDATE academic_dependencies SET board_id = 'upmsp-uttar-pradesh' WHERE board_id = 'upmsp-board'").run();
      db.prepare("UPDATE vocational_nsqf_offerings SET board_id = 'upmsp-uttar-pradesh' WHERE board_id = 'upmsp-board'").run();
      console.log('✅ Updated boards table: upmsp-board -> upmsp-uttar-pradesh');
    } else {
      db.prepare(`
        INSERT INTO boards (board_id, organization_id, name, short_name, jurisdiction, board_type, official_website, official_result_url, active, verification_status)
        VALUES ('upmsp-uttar-pradesh', 'org-upmsp', 'Uttar Pradesh Madhyamik Shiksha Parishad', 'UPMSP (UP Board)', 'State', 'State', 'https://upmsp.edu.in', 'https://upresults.nic.in', 1, 'VERIFIED')
      `).run();
      console.log('✅ Inserted upmsp-uttar-pradesh into boards table');
    }
  }

  // Ensure official source is registered
  const existingSource = db.prepare("SELECT * FROM official_sources WHERE source_id = 'src-upmsp-uttar-pradesh-portal'").get();
  if (!existingSource) {
    db.prepare(`
      INSERT OR REPLACE INTO official_sources (
        source_id, organization_id, document_title, document_type,
        source_url, publication_date, effective_date, applicable_year,
        source_hash, retrieved_at, verified_at, verification_status,
        issuing_authority, freshness_status
      ) VALUES (
        'src-upmsp-uttar-pradesh-portal', 'org-uttar-pradesh-madhyamik-shiksha-parishad', 'UPMSP Official Portal & Academic Repository', 'OFFICIAL_PORTAL',
        'https://upmsp.edu.in', '2026-09-01', '2026-09-01', '2026-27',
        'hash-upmsp-verified', '2026-10-04', '2026-10-04', 'VERIFIED',
        'Uttar Pradesh Madhyamik Shiksha Parishad, Prayagraj', 'FRESH'
      )
    `).run();
    console.log('✅ Registered src-upmsp-uttar-pradesh-portal in official_sources');
  } else {
    db.prepare("UPDATE official_sources SET organization_id = 'org-uttar-pradesh-madhyamik-shiksha-parishad' WHERE source_id = 'src-upmsp-uttar-pradesh-portal'").run();
  }

  // Insert primary subjects
  const insertStmt = db.prepare(`
    INSERT OR REPLACE INTO subjects (subject_id, name, short_name, subject_type, is_language_subject, is_medium_dependent, active)
    VALUES (@id, @name, @short, @type, @isLang, 1, 1)
  `);

  for (const s of upmspSubjects) {
    insertStmt.run(s);
  }

  db.pragma('foreign_keys = ON');
})();

const fks = db.prepare('PRAGMA foreign_key_check').all();
if (fks.length > 0) {
  console.error('❌ FK check failed:', fks);
} else {
  console.log('✅ Foreign key check: 0 errors.');
}

console.log(`✅ Successfully registered ${upmspSubjects.length} UPMSP primary subjects in subjects table.`);
db.close();
