const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '../../../db/sarkari_core.db');
const db = new Database(dbPath);

console.log('Registering BSEB primary subjects in subjects table...');

const bsebSubjects = [
  // Class 10 (Matriculation) Primary Academic Subjects
  { id: 'bseb-hindi-10', name: 'Hindi (MIL हिन्दी - कोड 101)', short: 'Hindi 10', type: 'LANGUAGE', isLang: 1 },
  { id: 'bseb-english-10', name: 'English (Class 10 - कोड 113)', short: 'Eng 10', type: 'LANGUAGE', isLang: 1 },
  { id: 'bseb-math-10', name: 'Mathematics (गणित - कोड 110)', short: 'Math 10', type: 'ACADEMIC_CORE', isLang: 0 },
  { id: 'bseb-science-10', name: 'Science (विज्ञान - कोड 112)', short: 'Science 10', type: 'ACADEMIC_CORE', isLang: 0 },
  { id: 'bseb-social-10', name: 'Social Science (सामाजिक विज्ञान - कोड 111)', short: 'SST 10', type: 'ACADEMIC_CORE', isLang: 0 },
  { id: 'bseb-sanskrit-10', name: 'Sanskrit (SIL संस्कृत - कोड 105)', short: 'Sanskrit 10', type: 'LANGUAGE', isLang: 1 },
  { id: 'bseb-urdu-10', name: 'Urdu (MIL اردو - कोड 103)', short: 'Urdu 10', type: 'LANGUAGE', isLang: 1 },
  { id: 'bseb-maithili-10', name: 'Maithili (MIL मैथिली - कोड 104)', short: 'Maithili 10', type: 'LANGUAGE', isLang: 1 },
  { id: 'bseb-adv-math-10', name: 'Advanced Mathematics (उच्च गणित - कोड 114)', short: 'Adv Math 10', type: 'ACADEMIC_ELECTIVE', isLang: 0 },

  // Class 12 Science Stream (I.Sc.)
  { id: 'bseb-physics-12', name: 'Physics (भौतिकी - कोड 117)', short: 'Physics 12', type: 'SCIENCE_ELECTIVE', isLang: 0 },
  { id: 'bseb-chemistry-12', name: 'Chemistry (रसायन शास्त्र - कोड 118)', short: 'Chemistry 12', type: 'SCIENCE_ELECTIVE', isLang: 0 },
  { id: 'bseb-biology-12', name: 'Biology (जीव विज्ञान - कोड 119)', short: 'Biology 12', type: 'SCIENCE_ELECTIVE', isLang: 0 },
  { id: 'bseb-math-12', name: 'Mathematics (गणित 12 - कोड 121)', short: 'Math 12', type: 'ACADEMIC_CORE', isLang: 0 },
  { id: 'bseb-english-12', name: 'English (I.Sc. - कोड 105)', short: 'Eng (Sc) 12', type: 'LANGUAGE', isLang: 1 },
  { id: 'bseb-hindi-12', name: 'Hindi (I.Sc. हिन्दी - कोड 106)', short: 'Hindi (Sc) 12', type: 'LANGUAGE', isLang: 1 },
  { id: 'bseb-cs-12', name: 'Computer Science (I.Sc. - कोड 122)', short: 'CS 12', type: 'ACADEMIC_ELECTIVE', isLang: 0 },

  // Class 12 Commerce Stream (I.Com.)
  { id: 'bseb-accountancy-12', name: 'Accountancy (लेखाशास्त्र - कोड 217)', short: 'Accounts 12', type: 'COMMERCE_ELECTIVE', isLang: 0 },
  { id: 'bseb-business-12', name: 'Business Studies (व्यवसाय अध्ययन - कोड 218)', short: 'BST 12', type: 'COMMERCE_ELECTIVE', isLang: 0 },
  { id: 'bseb-economics-12', name: 'Economics (I.Com. अर्थशास्त्र - कोड 219)', short: 'Econ (Com) 12', type: 'COMMERCE_ELECTIVE', isLang: 0 },
  { id: 'bseb-entrepreneurship-12', name: 'Entrepreneurship (उद्यमिता - कोड 220)', short: 'EPS 12', type: 'COMMERCE_ELECTIVE', isLang: 0 },
  { id: 'bseb-english-com-12', name: 'English (I.Com. - कोड 205)', short: 'Eng (Com) 12', type: 'LANGUAGE', isLang: 1 },
  { id: 'bseb-hindi-com-12', name: 'Hindi (I.Com. हिन्दी - कोड 206)', short: 'Hindi (Com) 12', type: 'LANGUAGE', isLang: 1 },

  // Class 12 Humanities Stream (I.A.)
  { id: 'bseb-history-12', name: 'History (इतिहास - कोड 321)', short: 'History 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 },
  { id: 'bseb-polity-12', name: 'Political Science (राजनीति शास्त्र - कोड 322)', short: 'Pol Sci 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 },
  { id: 'bseb-geography-12', name: 'Geography (भूगोल - कोड 323)', short: 'Geography 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 },
  { id: 'bseb-economics-arts-12', name: 'Economics (I.A. अर्थशास्त्र - कोड 326)', short: 'Econ (Arts) 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 },
  { id: 'bseb-sociology-12', name: 'Sociology (समाजशास्त्र - कोड 325)', short: 'Sociology 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 },
  { id: 'bseb-psychology-12', name: 'Psychology (मनोविज्ञान - कोड 324)', short: 'Psychology 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 },
  { id: 'bseb-philosophy-12', name: 'Philosophy (दर्शनशास्त्र - कोड 327)', short: 'Philosophy 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 },

  // Class 12 Agriculture Stream (I.Agri.)
  { id: 'bseb-agri-12', name: 'Agriculture (कृषि विज्ञान - कोड 120)', short: 'Agri 12', type: 'ACADEMIC_ELECTIVE', isLang: 0 }
];

const insertStmt = db.prepare(`
  INSERT OR REPLACE INTO subjects (subject_id, name, short_name, subject_type, is_language_subject, is_medium_dependent, active)
  VALUES (@id, @name, @short, @type, @isLang, 1, 1)
`);

db.transaction(() => {
  for (const s of bsebSubjects) {
    insertStmt.run(s);
  }
})();

console.log(`✅ Successfully registered ${bsebSubjects.length} BSEB primary subjects in subjects table.`);
db.close();
