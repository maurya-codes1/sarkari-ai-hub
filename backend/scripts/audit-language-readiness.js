// backend/scripts/audit-language-readiness.js
// Audits language readiness, key parity, translation status, and generates language_readiness_matrix.csv

const fs = require('fs');
const path = require('path');
const { getDb } = require('../db/database');
const { I18N_DATA } = require('../../public/js/i18n');

// 22 Eighth Schedule languages under Constitution of India
const EIGHTH_SCHEDULE_CODES = new Set([
  'as', 'bn', 'brx', 'doi', 'gu', 'hi', 'kn', 'ks', 'kok', 'mai',
  'ml', 'mni', 'mr', 'ne', 'or', 'pa', 'sa', 'sat', 'sd', 'ta', 'te', 'ur'
]);

function auditLanguageReadiness() {
  const db = getDb();
  console.log('🌐 Auditing Language Readiness & Generating Matrix...');

  const dbLangs = db.prepare('SELECT * FROM languages ORDER BY is_ui_language DESC, code ASC').all();
  console.log(`Database records in 'languages' table: ${dbLangs.length}`);

  const englishDict = I18N_DATA['en'] || {};
  const totalEnglishKeys = Object.keys(englishDict).length;
  console.log(`English Master Dictionary Keys: ${totalEnglishKeys}`);

  const csvHeaders = [
    'language_code',
    'language_name_native',
    'language_name_english',
    'script_type',
    'is_eighth_schedule',
    'db_is_ui_language_core',
    'db_is_expanded_ui_language',
    'ui_dropdown_available',
    'total_keys_in_dict',
    'distinct_translated_keys',
    'english_fallback_keys',
    'translation_completeness_pct',
    'rtl_support',
    'readiness_classification'
  ];

  const csvRows = [csvHeaders.join(',')];

  const escapeCsv = (val) => {
    const s = String(val === null || val === undefined ? '' : val);
    if (s.includes(',') || s.includes('"') || s.includes('\n')) {
      return `"${s.replace(/"/g, '""')}"`;
    }
    return s;
  };

  const languageReport = [];

  for (const l of dbLangs) {
    const code = l.code;
    const dict = I18N_DATA[code];
    const hasDict = Boolean(dict);

    let dictKeysCount = 0;
    let distinctTranslated = 0;
    let fallbackToEn = 0;

    if (hasDict) {
      const keys = Object.keys(dict);
      dictKeysCount = keys.length;

      for (const k of keys) {
        const val = String(dict[k] || '').trim();
        const enVal = String(englishDict[k] || '').trim();

        if (code === 'en') {
          distinctTranslated++;
        } else if (val === enVal || val.length === 0) {
          fallbackToEn++;
        } else {
          distinctTranslated++;
        }
      }
    }

    const completenessPct = totalEnglishKeys > 0
      ? ((distinctTranslated / totalEnglishKeys) * 100).toFixed(1)
      : '0.0';

    const isEighthSchedule = EIGHTH_SCHEDULE_CODES.has(code);
    const rtlSupport = code === 'ur' ? 'YES_RTL' : 'NO_LTR';

    let readinessClassification = 'NOT_VERIFIED';
    if (code === 'en' || code === 'hi') {
      readinessClassification = 'FULL_PRODUCTION_READY';
    } else if (parseFloat(completenessPct) >= 90.0) {
      readinessClassification = 'PRODUCTION_READY';
    } else if (parseFloat(completenessPct) >= 50.0) {
      readinessClassification = 'PARTIALLY_TRANSLATED_FALLBACK_ACTIVE';
    } else if (hasDict) {
      readinessClassification = 'PARTIAL_SHELL_FALLBACK_HEAVY';
    } else {
      readinessClassification = 'NOT_IMPLEMENTED_IN_UI';
    }

    const item = {
      code,
      nativeName: l.native_name,
      englishName: l.english_name,
      script: l.script,
      isEighthSchedule,
      dbCoreUi: Boolean(l.is_ui_language),
      dbExpandedUi: Boolean(l.is_expanded_ui_language),
      hasDict,
      dictKeysCount,
      distinctTranslated,
      fallbackToEn,
      completenessPct,
      rtlSupport,
      readinessClassification
    };

    languageReport.push(item);

    csvRows.push([
      escapeCsv(code),
      escapeCsv(l.native_name),
      escapeCsv(l.english_name),
      escapeCsv(l.script),
      escapeCsv(isEighthSchedule ? 'YES' : 'NO'),
      escapeCsv(l.is_ui_language ? 'YES (14 Core)' : 'NO'),
      escapeCsv(l.is_expanded_ui_language ? 'YES (24 Expanded)' : 'NO'),
      escapeCsv(hasDict ? 'YES' : 'NO'),
      escapeCsv(dictKeysCount),
      escapeCsv(distinctTranslated),
      escapeCsv(fallbackToEn),
      escapeCsv(`${completenessPct}%`),
      escapeCsv(rtlSupport),
      escapeCsv(readinessClassification)
    ].join(','));
  }

  const outPath = path.resolve('language_readiness_matrix.csv');
  fs.writeFileSync(outPath, csvRows.join('\n'));
  console.log(`✅ Generated language_readiness_matrix.csv at ${outPath}`);
  console.table(languageReport.map(r => ({
    code: r.code,
    name: r.englishName,
    keys: r.dictKeysCount,
    translated: r.distinctTranslated,
    fallback: r.fallbackToEn,
    pct: `${r.completenessPct}%`,
    status: r.readinessClassification
  })));

  return languageReport;
}

if (require.main === module) {
  auditLanguageReadiness();
}

module.exports = { auditLanguageReadiness };
