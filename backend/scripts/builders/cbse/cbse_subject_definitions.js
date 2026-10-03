const db = require('../../../db/database').getDb();

console.log('Ensuring all CBSE primary subjects exist in subjects table...');

const cbseSubjects = [
  { id: 'subj-math', name: 'Mathematics Standard', short: 'Math', type: 'ACADEMIC_CORE', isLang: 0 },
  { id: 'subj-math-basic', name: 'Mathematics Basic', short: 'Math Basic', type: 'ACADEMIC_CORE', isLang: 0 },
  { id: 'subj-science', name: 'Science', short: 'Science', type: 'ACADEMIC_CORE', isLang: 0 },
  { id: 'subj-social', name: 'Social Science', short: 'Social Sci', type: 'ACADEMIC_CORE', isLang: 0 },
  { id: 'subj-english', name: 'English Language & Literature / Core', short: 'English', type: 'LANGUAGE', isLang: 1 },
  { id: 'subj-hindi', name: 'Hindi Course-A / Elective', short: 'Hindi', type: 'LANGUAGE', isLang: 1 },
  { id: 'subj-hindi-b', name: 'Hindi Course-B', short: 'Hindi-B', type: 'LANGUAGE', isLang: 1 },
  { id: 'subj-computer-app', name: 'Computer Applications', short: 'Comp App', type: 'ACADEMIC_ELECTIVE', isLang: 0 },
  { id: 'subj-elements-business', name: 'Elements of Business', short: 'Elem Business', type: 'ACADEMIC_ELECTIVE', isLang: 0 },
  { id: 'subj-elements-bookkeeping', name: 'Elements of Book Keeping and Accountancy', short: 'Elem Bookkeeping', type: 'ACADEMIC_ELECTIVE', isLang: 0 },

  // Class 12 Science
  { id: 'subj-physics', name: 'Physics', short: 'Physics', type: 'SCIENCE_ELECTIVE', isLang: 0 },
  { id: 'subj-chemistry', name: 'Chemistry', short: 'Chemistry', type: 'SCIENCE_ELECTIVE', isLang: 0 },
  { id: 'subj-math12', name: 'Mathematics (Class 12)', short: 'Math 12', type: 'ACADEMIC_CORE', isLang: 0 },
  { id: 'subj-biology', name: 'Biology', short: 'Biology', type: 'SCIENCE_ELECTIVE', isLang: 0 },
  { id: 'subj-cs', name: 'Computer Science', short: 'Comp Sci', type: 'ACADEMIC_ELECTIVE', isLang: 0 },
  { id: 'subj-pe', name: 'Physical Education', short: 'Phys Ed', type: 'ACADEMIC_ELECTIVE', isLang: 0 },

  // Class 12 Commerce
  { id: 'subj-accountancy', name: 'Accountancy', short: 'Accountancy', type: 'COMMERCE_ELECTIVE', isLang: 0 },
  { id: 'subj-business', name: 'Business Studies', short: 'Business St', type: 'COMMERCE_ELECTIVE', isLang: 0 },
  { id: 'subj-economics', name: 'Economics', short: 'Economics', type: 'COMMERCE_ELECTIVE', isLang: 0 },
  { id: 'subj-applied-math', name: 'Applied Mathematics', short: 'Applied Math', type: 'ACADEMIC_ELECTIVE', isLang: 0 },
  { id: 'subj-entrepreneurship', name: 'Entrepreneurship', short: 'Entrepreneurship', type: 'ACADEMIC_ELECTIVE', isLang: 0 },

  // Class 12 Humanities
  { id: 'subj-history', name: 'History', short: 'History', type: 'HUMANITIES_ELECTIVE', isLang: 0 },
  { id: 'subj-polity', name: 'Political Science', short: 'Political Sci', type: 'HUMANITIES_ELECTIVE', isLang: 0 },
  { id: 'subj-geography', name: 'Geography', short: 'Geography', type: 'HUMANITIES_ELECTIVE', isLang: 0 },
  { id: 'subj-sociology', name: 'Sociology', short: 'Sociology', type: 'HUMANITIES_ELECTIVE', isLang: 0 },
  { id: 'subj-psychology', name: 'Psychology', short: 'Psychology', type: 'HUMANITIES_ELECTIVE', isLang: 0 }
];

const insertStmt = db.prepare(`
  INSERT OR REPLACE INTO subjects (subject_id, name, short_name, subject_type, is_language_subject, is_medium_dependent, active)
  VALUES (@id, @name, @short, @type, @isLang, 1, 1)
`);

db.transaction(() => {
  for (const s of cbseSubjects) {
    insertStmt.run(s);
  }
})();

console.log(`✅ Registered/Updated ${cbseSubjects.length} CBSE primary subjects in subjects table.`);
