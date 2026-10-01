const fs = require('fs');
const path = require('path');

const i18nPath = path.join(__dirname, '..', 'public', 'js', 'i18n.js');
const rawCode = fs.readFileSync(i18nPath, 'utf8');

// Load current data via Function
const evalMod = new Function(rawCode + '; return { I18N_DATA, SUPPORTED_LOCALES, RTL_LANGUAGES, RTL_LOCALES, getLocaleMetadata, getCurrentLanguage, getTranslation, setLanguage, applyTranslations };');
const loaded = evalMod();
const fullData = loaded.I18N_DATA;

// Get the 55 extended keys
const bqbAndSbKeys = new Set([
  'bqb_badge_corpus', 'bqb_badge_authentic', 'bqb_title', 'bqb_live_count', 'bqb_subtitle',
  'bqb_cta_adaptive', 'bqb_cta_matrix', 'bqb_cta_planner', 'bqb_stat_total_q', 'bqb_stat_total_sub',
  'bqb_stat_mcq', 'bqb_stat_mcq_sub', 'bqb_stat_theory', 'bqb_stat_theory_sub', 'bqb_stat_tracks',
  'bqb_stat_tracks_sub', 'bqb_stat_boards', 'bqb_stat_boards_sub', 'bqb_stat_languages',
  'bqb_stat_languages_sub', 'bqb_card_adaptive_title', 'bqb_card_adaptive_sub', 'bqb_card_learning_title',
  'bqb_card_learning_sub', 'bqb_card_matrix_title', 'bqb_card_matrix_sub', 'bqb_card_planner_title',
  'bqb_card_planner_sub', 'sb_badge_title', 'sb_badge_sub', 'sb_heading', 'sb_subheading',
  'sb_console_btn', 'sb_practice_now', 'sb_btn_upmsp', 'sb_btn_bseb', 'sb_btn_cbse', 'sb_btn_icse',
  'sb_btn_rbse', 'sb_btn_mpbse', 'sb_btn_msbshse', 'sb_btn_gseb', 'sb_btn_wb', 'sb_btn_tn',
  'sb_btn_karnataka', 'sb_btn_pseb', 'sb_btn_bseh', 'sb_btn_jac', 'sb_btn_cgbse', 'sb_btn_odisha',
  'sb_btn_ubse', 'sb_btn_assam', 'sb_btn_telangana', 'sb_btn_nios', 'sb_additional_boards'
]);

const canonicalData = {};
const extendedData = {};

for (const [lang, dict] of Object.entries(fullData)) {
  canonicalData[lang] = {};
  extendedData[lang] = {};
  for (const [k, v] of Object.entries(dict)) {
    if (bqbAndSbKeys.has(k)) {
      extendedData[lang][k] = v;
    } else {
      canonicalData[lang][k] = v;
    }
  }
  console.log(`${lang}: canonical=${Object.keys(canonicalData[lang]).length}, extended=${Object.keys(extendedData[lang]).length}`);
}

// Generate new i18n.js content
const header = `/**
 * Universal Multilingual Translation Dictionary (24 Indian Languages + English & Hinglish)
 * For SarkariAI Hub — Bharat's AI Job & Board Exam Ecosystem
 * 
 * Supports:
 * - 24 Active Indian Locales + 1 Preview Locale (mni)
 * - 562 Standard Master Keys parity across all 25 locales
 * - 55 Extended Homepage & Board Showcase Keys in EXTENDED_I18N_DATA
 * - Real-time DOM replacement with SVG / icon child node preservation
 * - RTL Bi-directional support for Urdu, Kashmiri, and Sindhi
 * - Cross-route language persistence in localStorage
 */

const SUPPORTED_LOCALES = [
  { code: 'hi', name: 'हिन्दी', englishName: 'Hindi', script: 'Devanagari', dir: 'ltr', font: 'Noto Sans Devanagari' },
  { code: 'en', name: 'English', englishName: 'English', script: 'Latin', dir: 'ltr', font: 'Inter, system-ui' },
  { code: 'hi-latn', name: 'Hinglish', englishName: 'Hinglish', script: 'Latin', dir: 'ltr', font: 'Inter, system-ui' },
  { code: 'ta', name: 'தமிழ்', englishName: 'Tamil', script: 'Tamil', dir: 'ltr', font: 'Noto Sans Tamil' },
  { code: 'te', name: 'తెలుగు', englishName: 'Telugu', script: 'Telugu', dir: 'ltr', font: 'Noto Sans Telugu' },
  { code: 'mr', name: 'मराठी', englishName: 'Marathi', script: 'Devanagari', dir: 'ltr', font: 'Noto Sans Devanagari' },
  { code: 'bn', name: 'বাংলা', englishName: 'Bengali', script: 'Bengali', dir: 'ltr', font: 'Noto Sans Bengali' },
  { code: 'gu', name: 'ગુજરાતી', englishName: 'Gujarati', script: 'Gujarati', dir: 'ltr', font: 'Noto Sans Gujarati' },
  { code: 'kn', name: 'ಕನ್ನಡ', englishName: 'Kannada', script: 'Kannada', dir: 'ltr', font: 'Noto Sans Kannada' },
  { code: 'ml', name: 'മലയാളം', englishName: 'Malayalam', script: 'Malayalam', dir: 'ltr', font: 'Noto Sans Malayalam' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ', englishName: 'Punjabi', script: 'Gurmukhi', dir: 'ltr', font: 'Noto Sans Gurmukhi' },
  { code: 'ur', name: 'اردو', englishName: 'Urdu', script: 'Perso-Arabic', dir: 'rtl', font: 'Noto Nastaliq Urdu' },
  { code: 'or', name: 'ଓଡ଼ିଆ', englishName: 'Odia', script: 'Odia', dir: 'ltr', font: 'Noto Sans Oriya' },
  { code: 'sa', name: 'संस्कृतम्', englishName: 'Sanskrit', script: 'Devanagari', dir: 'ltr', font: 'Noto Sans Devanagari' },
  { code: 'as', name: 'অসমীয়া', englishName: 'Assamese', script: 'Bengali-Assamese', dir: 'ltr', font: 'Noto Sans Bengali' },
  { code: 'mai', name: 'मैथिली', englishName: 'Maithili', script: 'Devanagari', dir: 'ltr', font: 'Noto Sans Devanagari' },
  { code: 'bho', name: 'भोजपुरी', englishName: 'Bhojpuri', script: 'Devanagari', dir: 'ltr', font: 'Noto Sans Devanagari' },
  { code: 'ne', name: 'नेपाली', englishName: 'Nepali', script: 'Devanagari', dir: 'ltr', font: 'Noto Sans Devanagari' },
  { code: 'kok', name: 'कोंकणी', englishName: 'Konkani', script: 'Devanagari', dir: 'ltr', font: 'Noto Sans Devanagari' },
  { code: 'sd', name: 'سنڌي / सिंधी', englishName: 'Sindhi', script: 'Perso-Arabic', dir: 'rtl', font: 'Noto Nastaliq Urdu' },
  { code: 'doi', name: 'डोगरी', englishName: 'Dogri', script: 'Devanagari', dir: 'ltr', font: 'Noto Sans Devanagari' },
  { code: 'ks', name: 'کٲشُر / कश्मीरी', englishName: 'Kashmiri', script: 'Perso-Arabic', dir: 'rtl', font: 'Noto Nastaliq Urdu' },
  { code: 'sat', name: 'ᱥᱟᱱᱛᱟᱲᱤ', englishName: 'Santali', script: 'Ol Chiki', dir: 'ltr', font: 'Noto Sans Ol Chiki' },
  { code: 'brx', name: "बर'", englishName: 'Bodo', script: 'Devanagari', dir: 'ltr', font: 'Noto Sans Devanagari' },
  { code: 'mni', name: 'ꯃꯤꯇꯩꯂꯣꯟ', englishName: 'Manipuri', script: 'Meetei Mayek', dir: 'ltr', font: 'Noto Sans Meetei Mayek' }
];

const I18N_DATA = ${JSON.stringify(canonicalData, null, 2)};

const EXTENDED_I18N_DATA = ${JSON.stringify(extendedData, null, 2)};

const RTL_LANGUAGES = ['ur', 'ks', 'sd'];
const RTL_LOCALES = new Set(RTL_LANGUAGES);

function getLocaleMetadata(lang) {
  return SUPPORTED_LOCALES.find(l => l.code === lang) || SUPPORTED_LOCALES[0];
}

function getCurrentLanguage() {
  try {
    const saved = localStorage.getItem('sarkariai_lang');
    if (saved && I18N_DATA[saved]) return saved;
    const navLang = (navigator.language || '').toLowerCase();
    for (const locale of SUPPORTED_LOCALES) {
      if (navLang.startsWith(locale.code)) return locale.code;
    }
    return 'hi';
  } catch(e) {
    return 'hi';
  }
}

function getTranslation(key, lang = null) {
  const targetLang = lang || getCurrentLanguage();
  if (I18N_DATA[targetLang] && I18N_DATA[targetLang][key]) {
    return I18N_DATA[targetLang][key];
  }
  if (EXTENDED_I18N_DATA[targetLang] && EXTENDED_I18N_DATA[targetLang][key]) {
    return EXTENDED_I18N_DATA[targetLang][key];
  }
  if (EXTENDED_I18N_DATA['hi'] && EXTENDED_I18N_DATA['hi'][key]) {
    return EXTENDED_I18N_DATA['hi'][key];
  }
  if (EXTENDED_I18N_DATA['en'] && EXTENDED_I18N_DATA['en'][key]) {
    return EXTENDED_I18N_DATA['en'][key];
  }
  if (I18N_DATA['hi'] && I18N_DATA['hi'][key]) {
    return I18N_DATA['hi'][key];
  }
  if (I18N_DATA['en'] && I18N_DATA['en'][key]) {
    return I18N_DATA['en'][key];
  }
  return key;
}

function updateElementText(el, translation) {
  // If element contains child elements like svg, img, i, badges, preserve them!
  const hasIconsOrSvgs = el.querySelector('svg, img, i, .badge, .dot, [aria-hidden="true"]');
  if (hasIconsOrSvgs) {
    // Look for dedicated i18n text span or child text node
    const textChild = el.querySelector('.i18n-text');
    if (textChild) {
      textChild.textContent = translation;
      return;
    }
    // Update the last non-empty text node
    let foundTextNode = false;
    for (let i = el.childNodes.length - 1; i >= 0; i--) {
      const node = el.childNodes[i];
      if (node.nodeType === 3 && node.nodeValue.trim().length > 0) { // Node.TEXT_NODE === 3
        node.nodeValue = ' ' + translation.trim() + ' ';
        foundTextNode = true;
        break;
      }
    }
    if (!foundTextNode) {
      const lastChild = el.lastElementChild;
      if (lastChild && !lastChild.querySelector('svg, img') && lastChild.tagName === 'SPAN') {
        lastChild.textContent = translation;
      } else {
        el.appendChild(document.createTextNode(' ' + translation));
      }
    }
  } else {
    el.textContent = translation;
  }
}

function applyTranslations(lang = null) {
  const activeLang = lang || getCurrentLanguage();
  const isRTL = RTL_LANGUAGES.includes(activeLang);

  if (typeof document !== 'undefined') {
    document.documentElement.lang = activeLang;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';

    const translatableElements = document.querySelectorAll('[data-i18n]');
    translatableElements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translation = getTranslation(key, activeLang);
      if (translation) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = translation;
        } else {
          updateElementText(el, translation);
        }
      }
    });

    const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
    placeholders.forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const translation = getTranslation(key, activeLang);
      if (translation) el.placeholder = translation;
    });

    const titles = document.querySelectorAll('[data-i18n-title]');
    titles.forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      const translation = getTranslation(key, activeLang);
      if (translation) el.title = translation;
    });

    // Keep select options in sync
    const langSelectors = document.querySelectorAll('.lang-selector-select, #langSelectDropdown, #mobileLangSelectDropdown');
    langSelectors.forEach(sel => {
      if (sel.value !== activeLang) sel.value = activeLang;
    });
  }

  // Dispatch custom event for dynamic components
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: activeLang, isRTL } }));
  }
}

function setLanguage(lang) {
  if (!I18N_DATA[lang]) {
    console.warn('[I18N] Unsupported language:', lang);
    return;
  }
  try {
    localStorage.setItem('sarkariai_lang', lang);
  } catch(e) {}
  applyTranslations(lang);
}

// Global Exports
if (typeof window !== 'undefined') {
  window.I18N_DATA = I18N_DATA;
  window.EXTENDED_I18N_DATA = EXTENDED_I18N_DATA;
  window.RTL_LANGUAGES = RTL_LANGUAGES;
  window.RTL_LOCALES = RTL_LOCALES;
  window.SUPPORTED_LOCALES = SUPPORTED_LOCALES;
  window.getLocaleMetadata = getLocaleMetadata;
  window.getCurrentLanguage = getCurrentLanguage;
  window.getTranslation = getTranslation;
  window.setLanguage = setLanguage;
  window.applyTranslations = applyTranslations;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    I18N_DATA,
    EXTENDED_I18N_DATA,
    RTL_LANGUAGES,
    RTL_LOCALES,
    SUPPORTED_LOCALES,
    getLocaleMetadata,
    getCurrentLanguage,
    getTranslation,
    setLanguage,
    applyTranslations
  };
}

// Auto-run on DOM ready
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    applyTranslations();
  });
}
`;

fs.writeFileSync(i18nPath, header, 'utf8');
console.log('Successfully refactored public/js/i18n.js!');
