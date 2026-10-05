const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '../../../db/sarkari_core.db');
const db = new Database(dbPath);

console.log('Registering MPBSE board metadata, sources, and primary subjects in SQLite...');

const mpbseSubjects = [
  // Class 10 (High School) Primary Academic Subjects (10)
  { id: 'mpbse-hindi-spl-10', name: 'Hindi Special (हिन्दी विशिष्ट)', short: 'Hindi Spl 10', type: 'LANGUAGE', isLang: 1 },
  { id: 'mpbse-english-spl-10', name: 'English Special', short: 'Eng Spl 10', type: 'LANGUAGE', isLang: 1 },
  { id: 'mpbse-math-10', name: 'Mathematics (गणित)', short: 'Math 10', type: 'ACADEMIC_CORE', isLang: 0 },
  { id: 'mpbse-science-10', name: 'Science (विज्ञान)', short: 'Science 10', type: 'ACADEMIC_CORE', isLang: 0 },
  { id: 'mpbse-social-10', name: 'Social Science (सामाजिक विज्ञान)', short: 'SST 10', type: 'ACADEMIC_CORE', isLang: 0 },
  { id: 'mpbse-sanskrit-gen-10', name: 'Sanskrit General (संस्कृत सामान्य)', short: 'Sanskrit 10', type: 'LANGUAGE', isLang: 1 },
  { id: 'mpbse-urdu-gen-10', name: 'Urdu General (اردو عمومی)', short: 'Urdu 10', type: 'LANGUAGE', isLang: 1 },
  { id: 'mpbse-punjabi-10', name: 'Punjabi (ਪੰਜਾਬੀ)', short: 'Punjabi 10', type: 'LANGUAGE', isLang: 1 },
  { id: 'mpbse-bengali-10', name: 'Bengali (বাংলা)', short: 'Bengali 10', type: 'LANGUAGE', isLang: 1 },
  { id: 'mpbse-marathi-10', name: 'Marathi (मराठी)', short: 'Marathi 10', type: 'LANGUAGE', isLang: 1 },

  // Class 12 Science Stream (7)
  { id: 'mpbse-physics-12', name: 'Physics (भौतिक शास्त्र)', short: 'Physics 12', type: 'SCIENCE_ELECTIVE', isLang: 0 },
  { id: 'mpbse-chemistry-12', name: 'Chemistry (रसायन शास्त्र)', short: 'Chemistry 12', type: 'SCIENCE_ELECTIVE', isLang: 0 },
  { id: 'mpbse-biology-12', name: 'Biology (जीव विज्ञान)', short: 'Biology 12', type: 'SCIENCE_ELECTIVE', isLang: 0 },
  { id: 'mpbse-math-12', name: 'Mathematics (गणित)', short: 'Math 12', type: 'ACADEMIC_CORE', isLang: 0 },
  { id: 'mpbse-english-gen-12', name: 'English General', short: 'Eng Gen 12', type: 'LANGUAGE', isLang: 1 },
  { id: 'mpbse-hindi-gen-12', name: 'Hindi General (हिन्दी सामान्य)', short: 'Hindi Gen 12', type: 'LANGUAGE', isLang: 1 },
  { id: 'mpbse-cs-12', name: 'Computer Application / IP', short: 'CS 12', type: 'ACADEMIC_ELECTIVE', isLang: 0 },

  // Class 12 Commerce Stream (6)
  { id: 'mpbse-accountancy-12', name: 'Book Keeping and Accountancy (बहीखाता एवं लेखाकर्म)', short: 'Accounts 12', type: 'COMMERCE_ELECTIVE', isLang: 0 },
  { id: 'mpbse-bst-12', name: 'Business Studies (व्यवसाय अध्ययन)', short: 'BST 12', type: 'COMMERCE_ELECTIVE', isLang: 0 },
  { id: 'mpbse-economics-12', name: 'Economics (अर्थशास्त्र)', short: 'Econ (Com) 12', type: 'COMMERCE_ELECTIVE', isLang: 0 },
  { id: 'mpbse-math-com-12', name: 'Business Mathematics (व्यावसायिक गणित)', short: 'Bus Math 12', type: 'ACADEMIC_CORE', isLang: 0 },
  { id: 'mpbse-english-com-12', name: 'English General (Commerce)', short: 'Eng (Com) 12', type: 'LANGUAGE', isLang: 1 },
  { id: 'mpbse-hindi-com-12', name: 'Hindi General (Commerce)', short: 'Hindi (Com) 12', type: 'LANGUAGE', isLang: 1 },

  // Class 12 Humanities Stream (7)
  { id: 'mpbse-history-12', name: 'History (इतिहास)', short: 'History 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 },
  { id: 'mpbse-polscience-12', name: 'Political Science (राजनीति शास्त्र)', short: 'Pol Sci 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 },
  { id: 'mpbse-geography-12', name: 'Geography (भूगोल)', short: 'Geography 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 },
  { id: 'mpbse-economics-arts-12', name: 'Economics (Humanities)', short: 'Econ (Arts) 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 },
  { id: 'mpbse-sociology-12', name: 'Sociology (समाजशास्त्र)', short: 'Sociology 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 },
  { id: 'mpbse-psychology-12', name: 'Psychology (मनोविज्ञान)', short: 'Psychology 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 },
  { id: 'mpbse-sanskrit-gen-12', name: 'Sanskrit General (संस्कृत सामान्य 12)', short: 'Sanskrit Gen 12', type: 'LANGUAGE', isLang: 1 },

  // Class 12 Agriculture Stream (1)
  { id: 'mpbse-agri-12', name: 'Elements of Science & Maths for Agriculture, Crop Production & Animal Husbandry (कृषि विज्ञान एवं प्रौद्योगिकी)', short: 'Agri 12', type: 'ACADEMIC_ELECTIVE', isLang: 0 }
];

db.pragma('foreign_keys = OFF');

db.transaction(() => {
  // Ensure mpbse-madhya-pradesh exists in boards table
  const existingBoard = db.prepare("SELECT * FROM boards WHERE board_id = 'mpbse-madhya-pradesh'").get();
  if (!existingBoard) {
    const oldBoard = db.prepare("SELECT * FROM boards WHERE board_id = 'mpbse-board'").get();
    if (oldBoard) {
      db.prepare("UPDATE boards SET board_id = 'mpbse-madhya-pradesh' WHERE board_id = 'mpbse-board'").run();
      db.prepare("UPDATE exams SET board_id = 'mpbse-madhya-pradesh' WHERE board_id = 'mpbse-board'").run();
      db.prepare("UPDATE board_academic_offerings SET board_id = 'mpbse-madhya-pradesh' WHERE board_id = 'mpbse-board'").run();
      db.prepare("UPDATE academic_dependencies SET board_id = 'mpbse-madhya-pradesh' WHERE board_id = 'mpbse-board'").run();
      db.prepare("UPDATE vocational_nsqf_offerings SET board_id = 'mpbse-madhya-pradesh' WHERE board_id = 'mpbse-board'").run();
      console.log('✅ Updated boards table: mpbse-board -> mpbse-madhya-pradesh');
    } else {
      db.prepare(`
        INSERT INTO boards (board_id, organization_id, name, short_name, jurisdiction, board_type, official_website, official_result_url, active, verification_status)
        VALUES ('mpbse-madhya-pradesh', 'org-madhya-pradesh-board-of-secondary-educat', 'Madhya Pradesh Board of Secondary Education', 'MPBSE (MP Board)', 'State', 'State', 'https://mpbse.nic.in', 'https://mpresults.nic.in', 1, 'VERIFIED')
      `).run();
      console.log('✅ Inserted mpbse-madhya-pradesh into boards table');
    }
  }

  // Ensure official source is registered
  const existingSource = db.prepare("SELECT * FROM official_sources WHERE source_id = 'src-mpbse-madhya-pradesh-portal'").get();
  if (!existingSource) {
    db.prepare(`
      INSERT OR REPLACE INTO official_sources (
        source_id, organization_id, document_title, document_type,
        source_url, publication_date, effective_date, applicable_year,
        source_hash, retrieved_at, verified_at, verification_status,
        issuing_authority, freshness_status
      ) VALUES (
        'src-mpbse-madhya-pradesh-portal', 'org-madhya-pradesh-board-of-secondary-educat', 'MPBSE Official Portal & Academic Repository', 'OFFICIAL_PORTAL',
        'https://mpbse.nic.in', '2026-09-01', '2026-09-01', '2026-27',
        'hash-mpbse-verified', '2026-10-04', '2026-10-04', 'VERIFIED',
        'Madhya Pradesh Board of Secondary Education, Bhopal', 'FRESH'
      )
    `).run();
    console.log('✅ Registered src-mpbse-madhya-pradesh-portal in official_sources');
  } else {
    db.prepare("UPDATE official_sources SET organization_id = 'org-madhya-pradesh-board-of-secondary-educat' WHERE source_id = 'src-mpbse-madhya-pradesh-portal'").run();
  }

  // Insert primary subjects
  const insertStmt = db.prepare(`
    INSERT OR REPLACE INTO subjects (subject_id, name, short_name, subject_type, is_language_subject, is_medium_dependent, active)
    VALUES (@id, @name, @short, @type, @isLang, 1, 1)
  `);

  for (const s of mpbseSubjects) {
    insertStmt.run(s);
  }
  console.log(`✅ Registered ${mpbseSubjects.length} MPBSE primary subjects in subjects table.`);
})();

db.pragma('foreign_keys = ON');

const fkErrors = db.prepare('PRAGMA foreign_key_check').all();
if (fkErrors.length > 0) {
  console.error('❌ Foreign key check errors after subject registration:', fkErrors);
  process.exit(1);
} else {
  console.log('✅ Foreign key check passed successfully.');
}

console.log('MPBSE database registration completed cleanly.');
