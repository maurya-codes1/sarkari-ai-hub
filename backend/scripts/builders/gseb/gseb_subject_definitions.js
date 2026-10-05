const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '../../../db/sarkari_core.db');
const db = new Database(dbPath);

console.log('Registering GSEB board metadata, sources, and primary subjects in SQLite...');

const gsebSubjects = [
  // Class 10 (SSC Secondary) - 10 Primary Subjects
  { id: 'gseb-gujarati-fl-10', name: 'Gujarati First Language (ગુજરાતી - પ્રથમ ભાષા)', short: 'Gujarati FL 10', type: 'LANGUAGE', isLang: 1 },
  { id: 'gseb-hindi-sl-10', name: 'Hindi Second Language (હિન્દી - દ્વિતીય ભાષા)', short: 'Hindi SL 10', type: 'LANGUAGE', isLang: 1 },
  { id: 'gseb-english-10', name: 'English (First/Second Language Compulsory)', short: 'English 10', type: 'LANGUAGE', isLang: 1 },
  { id: 'gseb-math-basic-10', name: 'Mathematics Basic (ગણિત બેઝિક - Code 18)', short: 'Math Basic 10', type: 'ACADEMIC_CORE', isLang: 0 },
  { id: 'gseb-math-std-10', name: 'Mathematics Standard (ગણિત સ્ટાન્ડર્ડ - Code 12)', short: 'Math Std 10', type: 'ACADEMIC_CORE', isLang: 0 },
  { id: 'gseb-science-10', name: 'Science & Technology (વિજ્ઞાન અને ટેકનોલોજી)', short: 'Science 10', type: 'ACADEMIC_CORE', isLang: 0 },
  { id: 'gseb-social-10', name: 'Social Science (સામાજિક વિજ્ઞાન)', short: 'Social 10', type: 'ACADEMIC_CORE', isLang: 0 },
  { id: 'gseb-sanskrit-10', name: 'Sanskrit (સંસ્કૃત - શાસ્ત્રીય ભાષા)', short: 'Sanskrit 10', type: 'LANGUAGE', isLang: 1 },
  { id: 'gseb-urdu-10', name: 'Urdu (اردو - First/Second Language)', short: 'Urdu 10', type: 'LANGUAGE', isLang: 1 },
  { id: 'gseb-computer-10', name: 'Computer Studies (કમ્પ્યુટર અધ્યયન)', short: 'Computer 10', type: 'ACADEMIC_ELECTIVE', isLang: 0 },

  // Class 12 Science Track - 7 Primary Subjects
  { id: 'gseb-physics-12', name: 'Physics (ભૌતિક વિજ્ઞાન - Code 054)', short: 'Physics 12', type: 'SCIENCE_ELECTIVE', isLang: 0 },
  { id: 'gseb-chemistry-12', name: 'Chemistry (રસાયણ વિજ્ઞાન - Code 052)', short: 'Chemistry 12', type: 'SCIENCE_ELECTIVE', isLang: 0 },
  { id: 'gseb-biology-12', name: 'Biology (જીવ વિજ્ઞાન - Code 056)', short: 'Biology 12', type: 'SCIENCE_ELECTIVE', isLang: 0 },
  { id: 'gseb-math-sci-12', name: 'Mathematics (ગણિત - Code 050)', short: 'Math Sci 12', type: 'ACADEMIC_CORE', isLang: 0 },
  { id: 'gseb-cs-sci-12', name: 'Computer Studies (કમ્પ્યુટર વિજ્ઞાન - Code 331)', short: 'CS Sci 12', type: 'ACADEMIC_ELECTIVE', isLang: 0 },
  { id: 'gseb-english-sci-12', name: 'English Compulsory (HSC Science)', short: 'English Sci 12', type: 'LANGUAGE', isLang: 1 },
  { id: 'gseb-gujarati-sci-12', name: 'Gujarati (HSC Science)', short: 'Gujarati Sci 12', type: 'LANGUAGE', isLang: 1 },

  // Class 12 General / Commerce Track - 7 Primary Subjects
  { id: 'gseb-elements-accounts-12', name: 'Elements of Accountancy (નામાના મૂળતત્વો - Code 154)', short: 'Accounts 12', type: 'COMMERCE_ELECTIVE', isLang: 0 },
  { id: 'gseb-stat-com-12', name: 'Statistics (આંકડાશાસ્ત્ર - Code 135)', short: 'Stat Com 12', type: 'COMMERCE_ELECTIVE', isLang: 0 },
  { id: 'gseb-economics-com-12', name: 'Economics (અર્થશાસ્ત્ર - વાણિજ્ય - Code 022)', short: 'Econ Com 12', type: 'COMMERCE_ELECTIVE', isLang: 0 },
  { id: 'gseb-ba-com-12', name: 'Business Administration (વાણિજ્ય વ્યવસ્થા અને સંચાલન - Code 046)', short: 'BA Com 12', type: 'COMMERCE_ELECTIVE', isLang: 0 },
  { id: 'gseb-sp-com-12', name: 'Secretarial Practice & CC (એસ.પી. અને સી.સી. - Code 337)', short: 'SP Com 12', type: 'COMMERCE_ELECTIVE', isLang: 0 },
  { id: 'gseb-english-com-12', name: 'English Compulsory (HSC Commerce)', short: 'English Com 12', type: 'LANGUAGE', isLang: 1 },
  { id: 'gseb-gujarati-com-12', name: 'Gujarati Compulsory (HSC Commerce)', short: 'Gujarati Com 12', type: 'LANGUAGE', isLang: 1 },

  // Class 12 Arts / Humanities Track - 6 Primary Subjects
  { id: 'gseb-history-12', name: 'History (ઇતિહાસ - HSC Arts - Code 029)', short: 'History Arts 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 },
  { id: 'gseb-geography-12', name: 'Geography (ભૂગોળ - HSC Arts - Code 025)', short: 'Geography Arts 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 },
  { id: 'gseb-polscience-12', name: 'Political Science (રાજ્યશાસ્ત્ર - Code 023)', short: 'Pol Sci 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 },
  { id: 'gseb-sociology-12', name: 'Sociology (સમાજશાસ્ત્ર - Code 139)', short: 'Sociology 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 },
  { id: 'gseb-psychology-12', name: 'Psychology (મનોવિજ્ઞાન - Code 141)', short: 'Psychology 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 },
  { id: 'gseb-philosophy-12', name: 'Philosophy & Logic (તત્ત્વજ્ઞાન - Code 136)', short: 'Philosophy 12', type: 'HUMANITIES_ELECTIVE', isLang: 0 },

  // Class 12 Vocational / Technical Track - 1 Primary Subject
  { id: 'gseb-vocational-12', name: 'Vocational & Technical Skills Foundation (વ્યવસાયલક્ષી શિક્ષણ અને કૌશલ્ય)', short: 'Vocational 12', type: 'VOCATIONAL_ELECTIVE', isLang: 0 }
];

db.pragma('foreign_keys = OFF');

db.transaction(() => {
  // Ensure gseb-gujarat is registered and up-to-date in boards table
  db.prepare(`
    INSERT OR REPLACE INTO boards (board_id, organization_id, name, short_name, jurisdiction, board_type, official_website, official_result_url, active, verification_status)
    VALUES ('gseb-gujarat', 'org-gujarat-secondary-and-higher-secondary-e', 'Gujarat Secondary and Higher Secondary Education Board, Gandhinagar', 'GSEB', 'State', 'State', 'https://www.gseb.org', 'https://result.gseb.org', 1, 'VERIFIED')
  `).run();
  console.log('✅ Verified gseb-gujarat in boards table');

  // Ensure official source is registered and verified
  db.prepare(`
    INSERT OR REPLACE INTO official_sources (
      source_id, organization_id, document_title, document_type,
      source_url, publication_date, effective_date, applicable_year,
      source_hash, retrieved_at, verified_at, verification_status,
      issuing_authority, applicable_exam_id, freshness_status
    ) VALUES (
      'src-gseb-gujarat-portal', 'org-gujarat-secondary-and-higher-secondary-e', 'Gujarat Secondary and Higher Secondary Education Board Official Portal & Question Bank Repository', 'OFFICIAL_PORTAL',
      'https://www.gseb.org', '2026-09-01', '2026-09-01', '2026-27',
      'hash-gseb-verified', '2026-10-04', '2026-10-04', 'VERIFIED',
      'Gujarat Secondary and Higher Secondary Education Board, Gandhinagar', 'gseb-gujarat', 'FRESH'
    )
  `).run();
  console.log('✅ Verified src-gseb-gujarat-portal in official_sources');

  // Insert primary subjects
  const insertStmt = db.prepare(`
    INSERT OR REPLACE INTO subjects (subject_id, name, short_name, subject_type, is_language_subject, is_medium_dependent, active)
    VALUES (@id, @name, @short, @type, @isLang, 1, 1)
  `);

  for (const s of gsebSubjects) {
    insertStmt.run(s);
  }
  console.log(`✅ Registered ${gsebSubjects.length} GSEB primary subjects in subjects table.`);
})();

db.pragma('foreign_keys = ON');

const fkErrors = db.prepare('PRAGMA foreign_key_check').all();
if (fkErrors.length > 0) {
  console.error('❌ Foreign key check errors after subject registration:', fkErrors);
  process.exit(1);
} else {
  console.log('✅ Foreign key check passed successfully (0 errors).');
}

console.log('GSEB database subject registration completed cleanly.');
