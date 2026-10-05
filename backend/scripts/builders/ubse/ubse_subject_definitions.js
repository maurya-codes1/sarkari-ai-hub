const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '../../../db/sarkari_core.db');
const db = new Database(dbPath);

console.log('Registering UBSE primary subjects in subjects table...');

const ubseSubjects = [
  // Class 10 (High School) Primary Academic Subjects
  { id: 'ubse-hindi-10', name: 'Hindi (हिन्दी - कक्षा 10)', short: 'Hindi 10', type: 'LANGUAGE', isLang: 1 },
  { id: 'ubse-english-10', name: 'English (Class 10)', short: 'Eng 10', type: 'LANGUAGE', isLang: 1 },
  { id: 'ubse-math-10', name: 'Mathematics (गणित - कक्षा 10)', short: 'Math 10', type: 'ACADEMIC_CORE', isLang: 0 },
  { id: 'ubse-science-10', name: 'Science (विज्ञान - कक्षा 10)', short: 'Science 10', type: 'ACADEMIC_CORE', isLang: 0 },
  { id: 'ubse-social-10', name: 'Social Science (सामाजिक विज्ञान - कक्षा 10)', short: 'SST 10', type: 'ACADEMIC_CORE', isLang: 0 },
  { id: 'ubse-sanskrit-10', name: 'Sanskrit (संस्कृत - कक्षा 10)', short: 'Sanskrit 10', type: 'LANGUAGE', isLang: 1 },
  { id: 'ubse-urdu-10', name: 'Urdu (اردو - جماعت دہم)', short: 'Urdu 10', type: 'LANGUAGE', isLang: 1 },
  { id: 'ubse-punjabi-10', name: 'Punjabi (ਪੰਜਾਬੀ - ਦਸਵੀਂ)', short: 'Punjabi 10', type: 'LANGUAGE', isLang: 1 },
  { id: 'ubse-bengali-10', name: 'Bengali (বাংলা - দশম শ্রেণী)', short: 'Bengali 10', type: 'LANGUAGE', isLang: 1 },
  { id: 'ubse-homesci-10', name: 'Home Science (गृह विज्ञान - कक्षा 10)', short: 'Home Sci 10', type: 'ACADEMIC_CORE', isLang: 0 },

  // Class 12 Science Stream
  { id: 'ubse-physics-12', name: 'Physics (भौतिक विज्ञान 12)', short: 'Physics 12', type: 'SCIENCE_ELECTIVE', isLang: 0 },
  { id: 'ubse-chemistry-12', name: 'Chemistry (रसायन विज्ञान 12)', short: 'Chemistry 12', type: 'SCIENCE_ELECTIVE', isLang: 0 },
  { id: 'ubse-biology-12', name: 'Biology (जीव विज्ञान 12)', short: 'Biology 12', type: 'SCIENCE_ELECTIVE', isLang: 0 },
  { id: 'ubse-math-12', name: 'Mathematics (गणित 12)', short: 'Math 12', type: 'ACADEMIC_CORE', isLang: 0 },
  { id: 'ubse-english-12', name: 'English (Class 12)', short: 'Eng (Sc) 12', type: 'LANGUAGE', isLang: 1 },
  { id: 'ubse-hindi-12', name: 'Hindi (हिन्दी 12)', short: 'Hindi (Sc) 12', type: 'LANGUAGE', isLang: 1 },
  { id: 'ubse-cs-12', name: 'Computer Science (Class 12)', short: 'CS 12', type: 'ACADEMIC_ELECTIVE', isLang: 0 },

  // Class 12 Commerce Stream
  { id: 'ubse-accountancy-12', name: 'Accountancy (बहीखाता तथा लेखाशास्त्र 12)', short: 'Accounts 12', type: 'COMMERCE_ELECTIVE', isLang: 0 },
  { id: 'ubse-business-12', name: 'Business Studies (व्यापारिक संगठन 12)', short: 'BST 12', type: 'COMMERCE_ELECTIVE', isLang: 0 },
  { id: 'ubse-economics-12', name: 'Economics (अर्थशास्त्र 12)', short: 'Econ (Com) 12', type: 'COMMERCE_ELECTIVE', isLang: 0 },
  { id: 'ubse-english-com-12', name: 'English (Commerce 12)', short: 'Eng (Com) 12', type: 'LANGUAGE', isLang: 1 },
  { id: 'ubse-hindi-com-12', name: 'Hindi (Commerce 12)', short: 'Hindi (Com) 12', type: 'LANGUAGE', isLang: 1 },
  { id: 'ubse-math-com-12', name: 'Mathematics (Commerce 12)', short: 'Math (Com) 12', type: 'ACADEMIC_CORE', isLang: 0 },

  // Class 12 Humanities Stream
  { id: 'ubse-history-12', name: 'History (इतिहास 12)', short: 'History 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 },
  { id: 'ubse-geography-12', name: 'Geography (भूगोल 12)', short: 'Geography 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 },
  { id: 'ubse-polity-12', name: 'Political Science (नागरिक शास्त्र / राजनीति विज्ञान 12)', short: 'Pol Sci 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 },
  { id: 'ubse-economics-arts-12', name: 'Economics (Arts 12)', short: 'Econ (Arts) 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 },
  { id: 'ubse-sociology-12', name: 'Sociology (समाजशास्त्र 12)', short: 'Sociology 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 },
  { id: 'ubse-psychology-12', name: 'Psychology (मनोविज्ञान 12)', short: 'Psychology 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 },
  { id: 'ubse-education-12', name: 'Education (शिक्षाशास्त्र 12)', short: 'Education 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 },

  // Class 12 Agriculture Stream
  { id: 'ubse-agri-12', name: 'Agriculture (कृषि विज्ञान 12)', short: 'Agri 12', type: 'ACADEMIC_ELECTIVE', isLang: 0 }
];

const insertStmt = db.prepare(`
  INSERT OR REPLACE INTO subjects (subject_id, name, short_name, subject_type, is_language_subject, is_medium_dependent, active)
  VALUES (@id, @name, @short, @type, @isLang, 1, 1)
`);

db.transaction(() => {
  for (const s of ubseSubjects) {
    insertStmt.run(s);
  }
})();

console.log(`✅ Successfully registered ${ubseSubjects.length} UBSE primary subjects in subjects table.`);
db.close();
