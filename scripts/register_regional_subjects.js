const Database = require('better-sqlite3');
const path = require('path');
const db = new Database(path.join(__dirname, '../backend/db/sarkari_core.db'));

const newSubjects = [
  ['subj-punjabi', 'ਪੰਜਾਬੀ (General Punjabi)', 'Punjabi', 'LANGUAGE', null, 1, 0, 1],
  ['subj-bengali', 'বাংলা (General Bengali)', 'Bengali', 'LANGUAGE', null, 1, 0, 1],
  ['subj-gujarati', 'ગુજરાતી (General Gujarati)', 'Gujarati', 'LANGUAGE', null, 1, 0, 1],
  ['subj-kannada', 'ಕನ್ನಡ (General Kannada)', 'Kannada', 'LANGUAGE', null, 1, 0, 1],
  ['subj-malayalam', 'മലയാളം (General Malayalam)', 'Malayalam', 'LANGUAGE', null, 1, 0, 1],
  ['subj-odia', 'ଓଡ଼ିଆ (General Odia)', 'Odia', 'LANGUAGE', null, 1, 0, 1],
  ['subj-assamese', 'অসমীয়া (General Assamese)', 'Assamese', 'LANGUAGE', null, 1, 0, 1],
  ['subj-marathi', 'मराठी (General Marathi)', 'Marathi', 'LANGUAGE', null, 1, 0, 1],
  ['subj-urdu', 'اردو (General Urdu)', 'Urdu', 'LANGUAGE', null, 1, 0, 1]
];

const insertStmt = db.prepare(`
  INSERT OR IGNORE INTO subjects (subject_id, name, short_name, subject_type, parent_subject_id, is_language_subject, is_medium_dependent, active)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`);

db.transaction(() => {
  for (const s of newSubjects) {
    insertStmt.run(...s);
  }
})();

console.log('Inserted regional language subjects. Verifying...');
const allSubjs = db.prepare('SELECT subject_id, name, short_name FROM subjects WHERE is_language_subject = 1').all();
console.table(allSubjs);

console.log('Integrity check:', db.prepare('PRAGMA integrity_check').get());
console.log('FK check violations:', db.prepare('PRAGMA foreign_key_check').all());
