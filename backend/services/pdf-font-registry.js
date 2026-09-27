// backend/services/pdf-font-registry.js
// Phase 8: Centralized PDF Font Registry & Multilingual Font Engine
// Supports Devanagari, Tamil, Telugu, Bengali, Gujarati, Kannada, Malayalam,
// Gurmukhi/Punjabi, Odia, Urdu/Arabic, Latin/English, and Mathematics/Science.

const fs = require('fs');
const path = require('path');
const fontkit = require('fontkit');

class PdfFontRegistry {
  constructor() {
    this.fontCache = new Map();

    // Standard Windows system font locations
    this.FONT_PATHS = {
      NIRMALA_TTC: 'C:\\Windows\\Fonts\\Nirmala.ttc',
      NIRMALA_BOLD_TTC: 'C:\\Windows\\Fonts\\NirmalaB.ttc',
      ARIAL_TTF: 'C:\\Windows\\Fonts\\arial.ttf',
      ARIAL_BOLD_TTF: 'C:\\Windows\\Fonts\\arialbd.ttf',
      SEGOE_UI_TTF: 'C:\\Windows\\Fonts\\segoeui.ttf',
      SEGOE_UI_BOLD_TTF: 'C:\\Windows\\Fonts\\segoeuib.ttf'
    };

    // Script to Font Family mapping
    this.SCRIPT_REGISTRY = {
      latin: {
        name: 'Latin / English',
        primaryFont: 'Arial',
        fontFile: this.FONT_PATHS.ARIAL_TTF,
        boldFontFile: this.FONT_PATHS.ARIAL_BOLD_TTF,
        coverage: ['en', 'hi-Latn'],
        direction: 'ltr'
      },
      devanagari: {
        name: 'Devanagari',
        primaryFont: 'Nirmala UI',
        fontFile: this.FONT_PATHS.NIRMALA_TTC,
        ttcIndex: 0, // NirmalaUI regular
        coverage: ['hi', 'mr', 'sa', 'bho', 'mai'],
        direction: 'ltr'
      },
      tamil: {
        name: 'Tamil',
        primaryFont: 'Nirmala UI',
        fontFile: this.FONT_PATHS.NIRMALA_TTC,
        ttcIndex: 0,
        coverage: ['ta'],
        direction: 'ltr'
      },
      telugu: {
        name: 'Telugu',
        primaryFont: 'Nirmala UI',
        fontFile: this.FONT_PATHS.NIRMALA_TTC,
        ttcIndex: 0,
        coverage: ['te'],
        direction: 'ltr'
      },
      bengali: {
        name: 'Bengali / Assamese',
        primaryFont: 'Nirmala UI',
        fontFile: this.FONT_PATHS.NIRMALA_TTC,
        ttcIndex: 0,
        coverage: ['bn', 'as'],
        direction: 'ltr'
      },
      gujarati: {
        name: 'Gujarati',
        primaryFont: 'Nirmala UI',
        fontFile: this.FONT_PATHS.NIRMALA_TTC,
        ttcIndex: 0,
        coverage: ['gu'],
        direction: 'ltr'
      },
      kannada: {
        name: 'Kannada',
        primaryFont: 'Nirmala UI',
        fontFile: this.FONT_PATHS.NIRMALA_TTC,
        ttcIndex: 0,
        coverage: ['kn'],
        direction: 'ltr'
      },
      malayalam: {
        name: 'Malayalam',
        primaryFont: 'Nirmala UI',
        fontFile: this.FONT_PATHS.NIRMALA_TTC,
        ttcIndex: 0,
        coverage: ['ml'],
        direction: 'ltr'
      },
      gurmukhi: {
        name: 'Gurmukhi / Punjabi',
        primaryFont: 'Nirmala UI',
        fontFile: this.FONT_PATHS.NIRMALA_TTC,
        ttcIndex: 0,
        coverage: ['pa'],
        direction: 'ltr'
      },
      odia: {
        name: 'Odia',
        primaryFont: 'Nirmala UI',
        fontFile: this.FONT_PATHS.NIRMALA_TTC,
        ttcIndex: 0,
        coverage: ['or'],
        direction: 'ltr'
      },
      arabic: {
        name: 'Urdu / Arabic Script',
        primaryFont: 'Arial',
        fontFile: this.FONT_PATHS.ARIAL_TTF,
        coverage: ['ur', 'ar'],
        direction: 'rtl'
      },
      math: {
        name: 'Mathematical & Scientific Symbols',
        primaryFont: 'Segoe UI',
        fontFile: this.FONT_PATHS.SEGOE_UI_TTF,
        boldFontFile: this.FONT_PATHS.SEGOE_UI_BOLD_TTF,
        coverage: ['math'],
        direction: 'ltr'
      }
    };
  }

  /**
   * Resolves the primary font configuration and file for a language code
   */
  resolveFontForLanguage(langCode = 'en', isBold = false) {
    const cleanLang = (langCode || 'en').toLowerCase().trim();

    // Map language code to script
    let targetScript = 'latin';
    for (const [scriptKey, spec] of Object.entries(this.SCRIPT_REGISTRY)) {
      if (spec.coverage.includes(cleanLang)) {
        targetScript = scriptKey;
        break;
      }
    }

    const scriptSpec = this.SCRIPT_REGISTRY[targetScript] || this.SCRIPT_REGISTRY.latin;
    const fontFilePath = isBold && scriptSpec.boldFontFile && fs.existsSync(scriptSpec.boldFontFile)
      ? scriptSpec.boldFontFile
      : scriptSpec.fontFile;

    return {
      script: targetScript,
      scriptName: scriptSpec.name,
      fontFamily: scriptSpec.primaryFont,
      fontFile: fontFilePath,
      ttcIndex: isBold ? 1 : (scriptSpec.ttcIndex || 0),
      isAvailable: fs.existsSync(fontFilePath),
      direction: scriptSpec.direction || 'ltr'
    };
  }

  /**
   * Loads and caches fontkit font instance for font validation
   */
  getFontInstance(fontPath, ttcIndex = 0) {
    const cacheKey = `${fontPath}:${ttcIndex}`;
    if (this.fontCache.has(cacheKey)) {
      return this.fontCache.get(cacheKey);
    }

    try {
      if (!fs.existsSync(fontPath)) return null;
      const collection = fontkit.openSync(fontPath);
      let font = collection;
      if (collection.fonts && Array.isArray(collection.fonts)) {
        font = collection.fonts[ttcIndex] || collection.fonts[0];
      }
      this.fontCache.set(cacheKey, font);
      return font;
    } catch (err) {
      console.warn(`[PdfFontRegistry] Failed to open font ${fontPath}:`, err.message);
      return null;
    }
  }

  /**
   * Validates whether all glyphs in text are supported without falling back to missing glyphs (.notdef / 0)
   */
  validateGlyphSupport(text, langCode = 'en') {
    if (!text || typeof text !== 'string') return { valid: true, missingCount: 0, missingChars: [] };

    const fontConfig = this.resolveFontForLanguage(langCode);
    const font = this.getFontInstance(fontConfig.fontFile, fontConfig.ttcIndex);

    if (!font) {
      return {
        valid: false,
        reason: 'FONT_FILE_NOT_FOUND',
        fontFile: fontConfig.fontFile,
        missingCount: text.length,
        missingChars: []
      };
    }

    const missingChars = [];
    const run = font.layout(text);

    // Filter out standard whitespace and control codes
    for (let i = 0; i < run.glyphs.length; i++) {
      const g = run.glyphs[i];
      if (g.id === 0) {
        const char = text[i] || '?';
        if (!['\n', '\r', '\t', ' '].includes(char)) {
          missingChars.push(char);
        }
      }
    }

    return {
      valid: missingChars.length === 0,
      script: fontConfig.script,
      fontFamily: fontConfig.fontFamily,
      totalGlyphs: run.glyphs.length,
      missingCount: missingChars.length,
      missingChars
    };
  }

  /**
   * Executes mandatory Font QA across representative Indian scripts, Urdu, and Math
   */
  testAllIndicGlyphs() {
    const testSamples = [
      { lang: 'hi', script: 'devanagari', sample: 'नमस्ते भारत प्रश्न पत्र 2026' },
      { lang: 'ta', script: 'tamil', sample: 'வணக்கம் தமிழ்நாடு அரசு தேர்வு வினாத்தாள்' },
      { lang: 'te', script: 'telugu', sample: 'నమస్కారం ఆంధ్రప్రదేశ్ పరీక్ష పత్రం' },
      { lang: 'bn', script: 'bengali', sample: 'নমস্কার পশ্চিমবঙ্গ পরীক্ষা প্রশ্নপত্র' },
      { lang: 'gu', script: 'gujarati', sample: 'નમસ્તે ગુજરાત પરીક્ષા પ્રશ્નપત્ર' },
      { lang: 'kn', script: 'kannada', sample: 'ನಮಸ್ಕಾರ ಕರ್ನಾಟಕ ಪರೀಕ್ಷೆ ಪ್ರಶ್ನೆಪತ್ರಿಕೆ' },
      { lang: 'ml', script: 'malayalam', sample: 'നമസ്കാരം കേരള പരീക്ഷ ചോദ്യപേപ്പർ' },
      { lang: 'pa', script: 'gurmukhi', sample: 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ ਪੰਜਾਬ ਪ੍ਰੀਖਿਆ ਪ੍ਰਸ਼ਨ ਪੱਤਰ' },
      { lang: 'or', script: 'odia', sample: 'ନମସ୍କାର ଓଡ଼ିଶା ପରୀକ୍ଷା ପ୍ରଶ୍ନପତ୍ର' },
      { lang: 'ur', script: 'arabic', sample: 'امتحان کا سوالیہ پرچہ اردو زبان' },
      { lang: 'en', script: 'latin', sample: 'SarkariAI Hub Full Exam Question Paper 2026' },
      { lang: 'en', script: 'math', sample: 'E = mc², H₂SO₄, √25 = 5, ±0.5, θ = 45°, α + β ≥ 10' }
    ];

    const results = [];
    let allPassed = true;

    for (const item of testSamples) {
      const targetLang = item.script === 'math' ? 'math' : item.lang;
      const val = this.validateGlyphSupport(item.sample, targetLang);
      const passed = val.valid;
      if (!passed) allPassed = false;

      results.push({
        language: item.lang,
        script: item.script,
        sample: item.sample,
        passed,
        fontFamily: val.fontFamily,
        missingChars: val.missingChars
      });
    }

    const passedCount = results.filter(r => r.passed).length;
    const failedCount = results.filter(r => !r.passed).length;

    return {
      allPassed,
      totalScripts: testSamples.length,
      passed: passedCount,
      failed: failedCount,
      passPercentage: `${((passedCount / testSamples.length) * 100).toFixed(1)}%`,
      testedCount: testSamples.length,
      passedCount,
      results
    };
  }

  /**
   * Helper alias returning structured font configuration for a script or language code
   */
  getFontForLanguage(langCode) {
    const res = this.resolveFontForLanguage(langCode);
    return {
      family: res.fontFamily,
      path: res.fontFile,
      script: res.script,
      fontFile: res.fontFile
    };
  }
}

module.exports = new PdfFontRegistry();
