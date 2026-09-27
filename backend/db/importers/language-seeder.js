// backend/db/importers/language-seeder.js
// Seeds the Language Registry with the 14 active UI languages + 10 upcoming scheduled Indian languages (Target: 24).
// Maintains separation between UI language, Exam Paper language, and Language Subject.

const { getDb } = require('../database');

const LANGUAGES_DATA = [
  // 14 ACTIVE UI LANGUAGES
  { id: 'en', code: 'en', locale: 'en-IN', native: 'English', english: 'English', script: 'Latin', dir: 'ltr', sched: false, ui: true },
  { id: 'hi', code: 'hi', locale: 'hi-IN', native: 'हिन्दी', english: 'Hindi', script: 'Devanagari', dir: 'ltr', sched: true, ui: true },
  { id: 'hi-latn', code: 'hi-latn', locale: 'hi-Latn', native: 'Hinglish', english: 'Hinglish', script: 'Latin', dir: 'ltr', sched: false, ui: true },
  { id: 'ta', code: 'ta', locale: 'ta-IN', native: 'தமிழ்', english: 'Tamil', script: 'Tamil', dir: 'ltr', sched: true, ui: true },
  { id: 'te', code: 'te', locale: 'te-IN', native: 'తెలుగు', english: 'Telugu', script: 'Telugu', dir: 'ltr', sched: true, ui: true },
  { id: 'mr', code: 'mr', locale: 'mr-IN', native: 'मराठी', english: 'Marathi', script: 'Devanagari', dir: 'ltr', sched: true, ui: true },
  { id: 'bn', code: 'bn', locale: 'bn-IN', native: 'বাংলা', english: 'Bengali', script: 'Bengali', dir: 'ltr', sched: true, ui: true },
  { id: 'gu', code: 'gu', locale: 'gu-IN', native: 'ગુજરાતી', english: 'Gujarati', script: 'Gujarati', dir: 'ltr', sched: true, ui: true },
  { id: 'kn', code: 'kn', locale: 'kn-IN', native: 'ಕನ್ನಡ', english: 'Kannada', script: 'Kannada', dir: 'ltr', sched: true, ui: true },
  { id: 'ml', code: 'ml', locale: 'ml-IN', native: 'മലയാളം', english: 'Malayalam', script: 'Malayalam', dir: 'ltr', sched: true, ui: true },
  { id: 'pa', code: 'pa', locale: 'pa-IN', native: 'ਪੰਜਾਬੀ', english: 'Punjabi', script: 'Gurmukhi', dir: 'ltr', sched: true, ui: true },
  { id: 'ur', code: 'ur', locale: 'ur-IN', native: 'اردو', english: 'Urdu', script: 'Perso-Arabic', dir: 'rtl', sched: true, ui: true },
  { id: 'or', code: 'or', locale: 'or-IN', native: 'ଓଡ଼ିଆ', english: 'Odia', script: 'Odia', dir: 'ltr', sched: true, ui: true },
  { id: 'sa', code: 'sa', locale: 'sa-IN', native: 'संस्कृतम्', english: 'Sanskrit', script: 'Devanagari', dir: 'ltr', sched: true, ui: true },

  // 10 UPCOMING SCHEDULED LANGUAGES (FOR FULL 24-LANGUAGE REGISTRY CAPABILITY)
  { id: 'as', code: 'as', locale: 'as-IN', native: 'অসমীয়া', english: 'Assamese', script: 'Bengali-Assamese', dir: 'ltr', sched: true, ui: false },
  { id: 'mai', code: 'mai', locale: 'mai-IN', native: 'मैथिली', english: 'Maithili', script: 'Devanagari', dir: 'ltr', sched: true, ui: false },
  { id: 'bho', code: 'bho', locale: 'bho-IN', native: 'भोजपुरी', english: 'Bhojpuri', script: 'Devanagari', dir: 'ltr', sched: false, ui: false },
  { id: 'ne', code: 'ne', locale: 'ne-IN', native: 'नेपाली', english: 'Nepali', script: 'Devanagari', dir: 'ltr', sched: true, ui: false },
  { id: 'kok', code: 'kok', locale: 'kok-IN', native: 'कोंकणी', english: 'Konkani', script: 'Devanagari', dir: 'ltr', sched: true, ui: false },
  { id: 'sd', code: 'sd', locale: 'sd-IN', native: 'سنڌي / सिन्धी', english: 'Sindhi', script: 'Perso-Arabic', dir: 'rtl', sched: true, ui: false },
  { id: 'doi', code: 'doi', locale: 'doi-IN', native: 'डोगरी', english: 'Dogri', script: 'Devanagari', dir: 'ltr', sched: true, ui: false },
  { id: 'ks', code: 'ks', locale: 'ks-IN', native: 'کٲشُر / कश्मीरी', english: 'Kashmiri', script: 'Perso-Arabic', dir: 'rtl', sched: true, ui: false },
  { id: 'sat', code: 'sat', locale: 'sat-IN', native: 'ᱥᱟᱱᱛᱟᱲᱤ', english: 'Santali', script: 'Ol Chiki', dir: 'ltr', sched: true, ui: false },
  { id: 'brx', code: 'brx', locale: 'brx-IN', native: 'बड़ो', english: 'Bodo', script: 'Devanagari', dir: 'ltr', sched: true, ui: false }
];

function seedLanguages(db = getDb()) {
  console.log('[LanguageSeeder] Seeding Indian Languages Registry (24 languages)...');

  const insertStmt = db.prepare(`
    INSERT INTO languages (
      language_id, code, locale, native_name, english_name, script, direction,
      is_scheduled_language, is_ui_language, is_exam_language, is_language_subject, font_family, active
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
    ON CONFLICT(language_id) DO UPDATE SET
      is_ui_language = excluded.is_ui_language,
      native_name = excluded.native_name,
      english_name = excluded.english_name
  `);

  const logStmt = db.prepare(`
    INSERT OR REPLACE INTO migration_logs (
      log_id, source_file, source_record_id, destination_table, destination_id,
      migrated_at, migration_status, transformation_summary
    ) VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP, ?, ?)
  `);

  let seededCount = 0;
  let activeUiCount = 0;

  const tx = db.transaction(() => {
    for (const lang of LANGUAGES_DATA) {
      insertStmt.run(
        lang.id,
        lang.code,
        lang.locale,
        lang.native,
        lang.english,
        lang.script,
        lang.dir,
        lang.sched ? 1 : 0,
        lang.ui ? 1 : 0,
        1, // is_exam_language
        1, // is_language_subject
        lang.script === 'Perso-Arabic' ? "'Noto Naskh Arabic', sans-serif" : "'Noto Sans', sans-serif"
      );

      logStmt.run(
        `mig-lang-${lang.id}`,
        'public/js/i18n.js',
        lang.id,
        'languages',
        lang.id,
        'MIGRATED',
        `Seeded language ${lang.english} (${lang.native}), UI Active: ${lang.ui}`
      );

      seededCount++;
      if (lang.ui) activeUiCount++;
    }
  });

  tx();
  console.log(`[LanguageSeeder] ✅ Seeded ${seededCount} languages (Active UI: ${activeUiCount}, Scheduled Target: ${LANGUAGES_DATA.length}).`);
  return { totalSeeded: seededCount, activeUiCount };
}

module.exports = { seedLanguages, LANGUAGES_DATA };
