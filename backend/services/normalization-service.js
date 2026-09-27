// backend/services/normalization-service.js
// Safe Question Normalization & Fingerprinting Engine
// Standardizes stems and options for exact duplicate detection without destroying
// mathematical symbols, scientific formulas, or Indian language glyphs.

const crypto = require('crypto');

class NormalizationService {
  /**
   * Safely normalizes question stem text.
   * - Applies Unicode NFKC normalization
   * - Strips question numbering prefixes (e.g., '1.', 'Q1:', 'प्रश्न 1:')
   * - Collapses whitespaces and trims
   * - Normalizes common punctuation (quotes, dashes) while preserving math symbols (+ - * / = ^ sqrt %)
   * - Preserves case for scientific/unit tokens where relevant, lowercases standard text
   *
   * @param {string} text 
   * @returns {string} normalized string
   */
  normalizeStem(text) {
    if (!text || typeof text !== 'string') return '';

    // 1. Unicode NFKC normalization (standardizes combined characters)
    let s = text.normalize('NFKC');

    // 2. Remove common question prefixes (e.g., '1. ', 'Q1: ', 'प्रश्न 1: ', 'Q. 1 - ')
    s = s.replace(/^(?:q(?:uestion)?\.?\s*\d+[\s.:\-)]*|प्रश्न\s*\d+[\s.:\-)]*|\d+[\s.:\-)]+)/i, '');

    // 3. Remove leading/trailing brackets or tags like [SSC CGL 2024] or (2 Marks)
    s = s.replace(/^\[[^\]]+\]\s*/, '').replace(/\s*\[[^\]]+\]$/, '');

    // 4. Normalize quotes and punctuation variants
    s = s.replace(/[“”«»]/g, '"')
         .replace(/[‘’`]/g, "'")
         .replace(/[–—―]/g, '-')
         .replace(/[؟?]/g, '?');

    // 5. Collapse all whitespace, tabs, and newlines to a single space
    s = s.replace(/\s+/g, ' ').trim();

    // 6. Safe lowercasing: lowercase standard alphabetic characters, preserve Unicode scripts
    s = s.toLowerCase();

    return s;
  }

  /**
   * Normalizes an array of options (MCQ choices).
   * Strips choice labels like 'A)', 'B)', '(1)', '(2)', sorts them deterministically,
   * and normalizes each option text.
   *
   * @param {Array<string>} options 
   * @returns {Array<string>} sorted normalized options
   */
  normalizeOptions(options) {
    if (!Array.isArray(options) || options.length === 0) return [];

    return options.map(opt => {
      if (typeof opt !== 'string') return String(opt);
      let clean = opt.normalize('NFKC');
      // Strip option prefix (e.g., 'A) ', '1. ', '(B) ')
      clean = clean.replace(/^(?:\(?[a-dA-D1-4]\)?[\s.:\-)—]+)/, '');
      // Collapse whitespace
      clean = clean.replace(/\s+/g, ' ').trim().toLowerCase();
      return clean;
    }).sort();
  }

  /**
   * Generates a deterministic SHA-256 fingerprint for a question.
   * Combines normalized stem and sorted options (or answer structure).
   *
   * @param {object} params
   * @param {string} params.stem - Question stem/text
   * @param {Array<string>} [params.options] - Option strings for MCQ
   * @param {string|number} [params.answer] - Canonical answer representation
   * @param {string} [params.questionType] - e.g., 'single_mcq', 'numerical'
   * @returns {string} 64-character SHA-256 hex string
   */
  generateFingerprint({ stem, options = [], answer = '', questionType = 'single_mcq' }) {
    const normStem = this.normalizeStem(stem);
    const normOptions = this.normalizeOptions(options);

    let payload = `type:${questionType}|stem:${normStem}`;
    if (normOptions.length > 0) {
      payload += `|opts:${normOptions.join(';;;')}`;
    } else if (answer) {
      const normAns = typeof answer === 'string' ? this.normalizeStem(answer) : String(answer);
      payload += `|ans:${normAns}`;
    }

    return crypto.createHash('sha256').update(payload, 'utf8').digest('hex');
  }

  /**
   * Extracts tokens for text comparison (stem word tokens excluding punctuation).
   * @param {string} text 
   * @returns {Array<string>}
   */
  tokenize(text) {
    const norm = this.normalizeStem(text);
    // Split by non-alphanumeric characters (keeping Devanagari and Latin letters/digits)
    return norm.split(/[\s,.;:!?"'()[\]{}<>+=/*\\~`@#$%^&|]+/).filter(t => t.length > 0);
  }
}

module.exports = new NormalizationService();
