const db = require('../../../db/database').getDb();

console.log('Registering PSEB primary subjects in subjects table...');

const psebSubjects = [
  // Class 10 Primary Academic Subjects
  { id: 'pseb-punjabi-10', name: 'Punjabi (ਪੰਜਾਬੀ - ਪਰਚਾ ੳ ਅਤੇ ਅ)', short: 'Pbi 10', type: 'LANGUAGE', isLang: 1 },
  { id: 'pseb-phc-10', name: 'Punjab History and Culture (ਪੰਜਾਬ ਦਾ ਇਤਿਹਾਸ ਅਤੇ ਸੱਭਿਆਚਾਰ)', short: 'PHC 10', type: 'ACADEMIC_CORE', isLang: 0 },
  { id: 'pseb-english-10', name: 'English (Class 10)', short: 'Eng 10', type: 'LANGUAGE', isLang: 1 },
  { id: 'pseb-hindi-10', name: 'Hindi (हिन्दी - कक्षा 10)', short: 'Hindi 10', type: 'LANGUAGE', isLang: 1 },
  { id: 'pseb-urdu-10', name: 'Urdu (اردو - جماعت دہم)', short: 'Urdu 10', type: 'LANGUAGE', isLang: 1 },
  { id: 'pseb-math-10', name: 'Mathematics (ਗਣਿਤ)', short: 'Math 10', type: 'ACADEMIC_CORE', isLang: 0 },
  { id: 'pseb-science-10', name: 'Science (ਵਿਗਿਆਨ)', short: 'Science 10', type: 'ACADEMIC_CORE', isLang: 0 },
  { id: 'pseb-social-10', name: 'Social Science (ਸਮਾਜਿਕ ਵਿਗਿਆਨ)', short: 'SST 10', type: 'ACADEMIC_CORE', isLang: 0 },
  { id: 'pseb-cs-10', name: 'Computer Science (ਕੰਪਿਊਟਰ ਸਾਇੰਸ)', short: 'CS 10', type: 'ACADEMIC_ELECTIVE', isLang: 0 },
  { id: 'pseb-pe-10', name: 'Health and Physical Education (ਸਿਹਤ ਅਤੇ ਸਰੀਰਕ ਸਿੱਖਿਆ)', short: 'PE 10', type: 'ACADEMIC_ELECTIVE', isLang: 0 },

  // Class 12 Compulsory & Multi-stream Subjects
  { id: 'pseb-gen-english-12', name: 'General English (Class 12)', short: 'Gen Eng 12', type: 'LANGUAGE', isLang: 1 },
  { id: 'pseb-gen-punjabi-12', name: 'General Punjabi (ਲਾਜ਼ਮੀ ਪੰਜਾਬੀ)', short: 'Gen Pbi 12', type: 'LANGUAGE', isLang: 1 },
  { id: 'pseb-phc-12', name: 'Punjab History and Culture (ਕਲਾਸ 12)', short: 'PHC 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 },
  { id: 'pseb-cs-12', name: 'Computer Science (ਕੰਪਿਊਟਰ ਸਾਇੰਸ 12)', short: 'CS 12', type: 'ACADEMIC_ELECTIVE', isLang: 0 },

  // Class 12 Science Stream
  { id: 'pseb-physics-12', name: 'Physics (ਭੌਤਿਕ ਵਿਗਿਆਨ)', short: 'Physics 12', type: 'SCIENCE_ELECTIVE', isLang: 0 },
  { id: 'pseb-chemistry-12', name: 'Chemistry (ਰਸਾਇਣ ਵਿਗਿਆਨ)', short: 'Chemistry 12', type: 'SCIENCE_ELECTIVE', isLang: 0 },
  { id: 'pseb-biology-12', name: 'Biology (ਜੀਵ ਵਿਗਿਆਨ)', short: 'Biology 12', type: 'SCIENCE_ELECTIVE', isLang: 0 },
  { id: 'pseb-math-12', name: 'Mathematics (ਗਣਿਤ 12)', short: 'Math 12', type: 'ACADEMIC_CORE', isLang: 0 },
  { id: 'pseb-pe-12', name: 'Physical Education and Sports', short: 'PE 12', type: 'ACADEMIC_ELECTIVE', isLang: 0 },

  // Class 12 Commerce Stream
  { id: 'pseb-business-12', name: 'Business Studies (ਵਪਾਰਕ ਅਧਿਐਨ)', short: 'BST 12', type: 'COMMERCE_ELECTIVE', isLang: 0 },
  { id: 'pseb-accountancy-12', name: 'Accountancy (ਲੇਖਾਕਾਰੀ)', short: 'Accounts 12', type: 'COMMERCE_ELECTIVE', isLang: 0 },
  { id: 'pseb-economics-12', name: 'Economics (ਅਰਥ ਸ਼ਾਸਤਰ)', short: 'Econ 12', type: 'COMMERCE_ELECTIVE', isLang: 0 },
  { id: 'pseb-ebusiness-12', name: 'Fundamentals of E-Business', short: 'E-Business 12', type: 'COMMERCE_ELECTIVE', isLang: 0 },

  // Class 12 Humanities Stream
  { id: 'pseb-history-12', name: 'History (ਇਤਿਹਾਸ: ਪੰਜਾਬ ਦਾ ਇਤਿਹਾਸ 1469-1849)', short: 'History 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 },
  { id: 'pseb-polity-12', name: 'Political Science (ਰਾਜਨੀਤੀ ਸ਼ਾਸਤਰ)', short: 'Pol Sci 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 },
  { id: 'pseb-geography-12', name: 'Geography (ਭੂਗੋਲ)', short: 'Geography 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 },
  { id: 'pseb-sociology-12', name: 'Sociology (ਸਮਾਜ ਸ਼ਾਸਤਰ)', short: 'Sociology 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 },
  { id: 'pseb-psychology-12', name: 'Psychology (ਮਨੋਵਿਗਿਆਨ)', short: 'Psychology 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 },
  { id: 'pseb-public-admin-12', name: 'Public Administration (ਲੋਕ ਪ੍ਰਸ਼ਾਸਨ)', short: 'Pub Admin 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 },

  // Class 12 Agriculture Stream
  { id: 'pseb-agri-12', name: 'Agriculture (ਖੇਤੀਬਾੜੀ ਵਿਗਿਆਨ)', short: 'Agri 12', type: 'ACADEMIC_ELECTIVE', isLang: 0 }
];

const insertStmt = db.prepare(`
  INSERT OR REPLACE INTO subjects (subject_id, name, short_name, subject_type, is_language_subject, is_medium_dependent, active)
  VALUES (@id, @name, @short, @type, @isLang, 1, 1)
`);

db.transaction(() => {
  for (const s of psebSubjects) {
    insertStmt.run(s);
  }
})();

console.log(`✅ Successfully registered ${psebSubjects.length} PSEB primary subjects in subjects table.`);
