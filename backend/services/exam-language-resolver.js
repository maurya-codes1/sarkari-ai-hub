// backend/services/exam-language-resolver.js
// Phase 16 Canonical Exam Language & Medium Resolver Service

const { getDb } = require('../db/database');

class ExamLanguageResolver {
  /**
   * Resolve authoritative languages, medium, and script requirements for an exam component
   */
  resolveExamLanguage(context = {}, db = getDb()) {
    const {
      examId,
      componentId,
      subjectId,
      requestedLanguage = 'en'
    } = context;

    // 1. Check exam_language_configurations table if exists
    let officialLangs = [];
    let isBilingual = false;
    let defaultLang = 'en';

    try {
      const dbConfigs = db.prepare(`
        SELECT language_id, is_default, is_mandatory
        FROM exam_language_configurations
        WHERE exam_id = ?
      `).all(examId);

      if (dbConfigs && dbConfigs.length > 0) {
        officialLangs = dbConfigs.map(c => c.language_id.toLowerCase());
        const def = dbConfigs.find(c => c.is_default);
        if (def) defaultLang = def.language_id.toLowerCase();
      }
    } catch {
      // Fallback to component / exam rules
    }

    // 2. Component-specific and Board-specific language rules
    if (componentId) {
      const compLower = componentId.toLowerCase();
      if (compLower.includes('tndge') || compLower.includes('tamil')) {
        officialLangs = ['ta', 'en'];
        defaultLang = 'ta';
      } else if (compLower.includes('pseb') || compLower.includes('punjab')) {
        officialLangs = ['pa', 'en', 'hi'];
        defaultLang = 'pa';
      } else if (compLower.includes('bseb') || compLower.includes('upmsp') || compLower.includes('mppsc') || compLower.includes('bpsc')) {
        officialLangs = ['hi', 'en'];
        defaultLang = 'hi';
      } else if (compLower.includes('ssc-gd') || compLower.includes('rrb-ntpc') || compLower.includes('rrb-alp')) {
        officialLangs = ['en', 'hi', 'bn', 'gu', 'kn', 'ml', 'mr', 'or', 'pa', 'ta', 'te', 'ur', 'as'];
        defaultLang = 'en';
        isBilingual = true;
      } else if (compLower.includes('upsc-cse') || compLower.includes('upsc-nda')) {
        officialLangs = ['en', 'hi'];
        defaultLang = 'en';
        isBilingual = true;
      }
    }

    if (officialLangs.length === 0) {
      officialLangs = ['en', 'hi'];
    }

    // Subject specific language overrides (e.g. Punjabi language paper must be in Punjabi)
    if (subjectId) {
      const subjLower = subjectId.toLowerCase();
      if (subjLower.includes('punjabi') || subjLower === 'subj-punjabi') {
        officialLangs = ['pa'];
        defaultLang = 'pa';
      } else if (subjLower.includes('tamil') || subjLower === 'subj-tamil') {
        officialLangs = ['ta'];
        defaultLang = 'ta';
      } else if (subjLower.includes('urdu') || subjLower === 'subj-urdu') {
        officialLangs = ['ur'];
        defaultLang = 'ur';
      } else if (subjLower.includes('hindi') || subjLower === 'subj-hindi') {
        officialLangs = ['hi'];
        defaultLang = 'hi';
      } else if (subjLower.includes('english') || subjLower === 'subj-english') {
        officialLangs = ['en'];
        defaultLang = 'en';
      }
    }

    const cleanReqLang = (requestedLanguage || 'en').toLowerCase();
    const isSupported = officialLangs.includes(cleanReqLang);
    const resolvedActiveLang = isSupported ? cleanReqLang : defaultLang;

    // RTL & Script metadata
    const isRtl = ['ur', 'ks', 'sd', 'ar'].includes(resolvedActiveLang);
    let fontFamily = 'Noto Sans';
    if (resolvedActiveLang === 'hi' || resolvedActiveLang === 'mr') fontFamily = 'Noto Sans Devanagari';
    else if (resolvedActiveLang === 'ta') fontFamily = 'Noto Sans Tamil';
    else if (resolvedActiveLang === 'te') fontFamily = 'Noto Sans Telugu';
    else if (resolvedActiveLang === 'bn' || resolvedActiveLang === 'as') fontFamily = 'Noto Sans Bengali';
    else if (resolvedActiveLang === 'pa') fontFamily = 'Noto Sans Gurmukhi';
    else if (resolvedActiveLang === 'gu') fontFamily = 'Noto Sans Gujarati';
    else if (resolvedActiveLang === 'kn') fontFamily = 'Noto Sans Kannada';
    else if (resolvedActiveLang === 'ml') fontFamily = 'Noto Sans Malayalam';
    else if (resolvedActiveLang === 'or') fontFamily = 'Noto Sans Odia';
    else if (resolvedActiveLang === 'ur') fontFamily = 'Noto Nastaliq Urdu';

    return {
      examId,
      componentId,
      subjectId,
      officialPaperLanguages: officialLangs,
      defaultLanguage: defaultLang,
      activeLanguage: resolvedActiveLang,
      isRequestedLanguageSupported: isSupported,
      isBilingualAllowed: isBilingual,
      isRtl,
      fontFamily,
      provenance: 'EXAM_BLUEPRINT_AUTHORITY',
      notes: isSupported ? 'Exact exam language matched' : `Requested language '${cleanReqLang}' not supported by official pattern; defaulted to '${defaultLang}'`
    };
  }
}

module.exports = new ExamLanguageResolver();
