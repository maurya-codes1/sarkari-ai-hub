// backend/services/duplicate-engine.js
// Dual-Tier Duplicate Prevention Engine: Exact Fingerprint Matching & Semantic Similarity
// Enforces the Concept Repetition Rule: allows legitimate concept reuse while rejecting true duplicates.

const crypto = require('crypto');
const normalizationService = require('./normalization-service');
const { getDb } = require('../db/database');

class DuplicateEngine {
  constructor() {
    // Common stopwords across Hindi and English
    this.stopWords = new Set([
      // Hindi stopwords
      'का', 'के', 'की', 'को', 'में', 'पर', 'से', 'है', 'हैं', 'था', 'थे', 'थी', 'होता', 'होती',
      'कि', 'जो', 'और', 'या', 'एक', 'यह', 'वह', 'इस', 'उस', 'किस', 'क्या', 'कौन', 'कहाँ',
      'करें', 'बताएं', 'लिखें', 'ज्ञात', 'दीजिए', 'निम्न', 'निम्नलिखित',
      // English stopwords
      'the', 'is', 'are', 'was', 'were', 'in', 'on', 'at', 'by', 'for', 'with', 'about',
      'against', 'between', 'into', 'through', 'during', 'before', 'after', 'above', 'below',
      'to', 'from', 'up', 'down', 'of', 'off', 'over', 'under', 'again', 'further', 'then',
      'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each',
      'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own',
      'same', 'so', 'than', 'too', 'very', 'can', 'will', 'just', 'should', 'now', 'which',
      'what', 'who', 'whom', 'this', 'that', 'these', 'those', 'am', 'been', 'being', 'have',
      'has', 'had', 'having', 'do', 'does', 'did', 'doing', 'a', 'an'
    ]);
  }

  /**
   * Check for exact duplicates using stable content fingerprints.
   *
   * @param {object} candidate
   * @param {string} candidate.stem
   * @param {Array<string>} [candidate.options]
   * @param {string} [candidate.answer]
   * @param {string} [candidate.questionType]
   * @param {object} [db]
   * @returns {object} { isExactDuplicate: boolean, fingerprint: string, duplicateOf: string|null, reason: string|null }
   */
  checkExactDuplicate(candidate, db = getDb()) {
    const fingerprint = normalizationService.generateFingerprint({
      stem: candidate.stem,
      options: candidate.options || [],
      answer: candidate.answer || '',
      questionType: candidate.questionType || 'single_mcq'
    });

    if (!db) {
      return { isExactDuplicate: false, fingerprint, duplicateOf: null, reason: null };
    }

    // 1. Check in question_fingerprints table
    const existingFp = db.prepare(`
      SELECT question_id, entity_type FROM question_fingerprints WHERE fingerprint = ? LIMIT 1
    `).get(fingerprint);

    if (existingFp) {
      return {
        isExactDuplicate: true,
        fingerprint,
        duplicateOf: existingFp.question_id,
        entityType: existingFp.entity_type,
        reason: 'EXACT_FINGERPRINT_MATCH'
      };
    }

    // 2. Check in questions table
    const existingQ = db.prepare(`
      SELECT question_id FROM questions WHERE fingerprint = ? LIMIT 1
    `).get(fingerprint);

    if (existingQ) {
      return {
        isExactDuplicate: true,
        fingerprint,
        duplicateOf: existingQ.question_id,
        entityType: 'QUESTION',
        reason: 'EXACT_QUESTION_FINGERPRINT_MATCH'
      };
    }

    // 3. Check in historical_questions table
    const existingHist = db.prepare(`
      SELECT historical_id, exam_year FROM historical_questions WHERE fingerprint = ? LIMIT 1
    `).get(fingerprint);

    if (existingHist) {
      return {
        isExactDuplicate: true,
        fingerprint,
        duplicateOf: existingHist.historical_id,
        entityType: 'HISTORICAL_QUESTION',
        examYear: existingHist.exam_year,
        reason: 'EXACT_HISTORICAL_CORPUS_MATCH'
      };
    }

    return {
      isExactDuplicate: false,
      fingerprint,
      duplicateOf: null,
      reason: null
    };
  }

  /**
   * Register a new question fingerprint in the database.
   */
  registerFingerprint(questionId, fingerprint, normalizedStem, entityType = 'QUESTION', optionsHash = null, db = getDb()) {
    if (!db) return;
    try {
      db.prepare(`
        INSERT INTO question_fingerprints (
          fingerprint_id, question_id, entity_type, fingerprint, normalized_stem, options_hash
        ) VALUES (?, ?, ?, ?, ?, ?)
        ON CONFLICT(fingerprint) DO UPDATE SET question_id = excluded.question_id
      `).run(
        `fp-${crypto.randomBytes(8).toString('hex')}`,
        questionId,
        entityType,
        fingerprint,
        normalizedStem,
        optionsHash
      );
    } catch (err) {
      console.warn('[DuplicateEngine] Fingerprint registration skipped:', err.message);
    }
  }

  /**
   * Computes character 3-grams for sub-word semantic comparison.
   * @param {string} text 
   * @returns {Map<string, number>} n-gram frequency map
   */
  computeCharNgrams(text, n = 3) {
    const clean = normalizationService.normalizeStem(text).replace(/\s+/g, '');
    const grams = new Map();
    if (clean.length < n) {
      grams.set(clean, 1);
      return grams;
    }
    for (let i = 0; i <= clean.length - n; i++) {
      const g = clean.slice(i, i + n);
      grams.set(g, (grams.get(g) || 0) + 1);
    }
    return grams;
  }

  /**
   * Computes token set excluding common stopwords.
   * @param {string} text 
   * @returns {Set<string>}
   */
  computeContentTokens(text) {
    const rawTokens = normalizationService.tokenize(text);
    return new Set(rawTokens.filter(t => !this.stopWords.has(t) && t.length > 1));
  }

  /**
   * Computes Cosine Similarity between two term frequency maps.
   */
  cosineSimilarity(mapA, mapB) {
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;

    for (const count of mapA.values()) {
      normA += count * count;
    }
    for (const count of mapB.values()) {
      normB += count * count;
    }

    if (normA === 0 || normB === 0) return 0;

    for (const [key, countA] of mapA.entries()) {
      if (mapB.has(key)) {
        dotProduct += countA * mapB.get(key);
      }
    }

    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
  }

  /**
   * Computes Jaccard Similarity between two sets.
   */
  jaccardSimilarity(setA, setB) {
    if (setA.size === 0 && setB.size === 0) return 1.0;
    if (setA.size === 0 || setB.size === 0) return 0.0;

    let intersectionSize = 0;
    for (const item of setA) {
      if (setB.has(item)) intersectionSize++;
    }
    const unionSize = setA.size + setB.size - intersectionSize;
    return intersectionSize / unionSize;
  }

  /**
   * Checks whether two stems represent distinct numerical problems or distinct setups
   * testing the SAME concept (Concept Repetition Rule).
   *
   * @param {string} textA 
   * @param {string} textB 
   * @returns {boolean} true if genuinely distinct problem setup despite shared keywords
   */
  isDistinctConceptApplication(textA, textB) {
    // Extract numbers from both texts
    const numsA = (textA.match(/\b\d+(?:\.\d+)?%?\b/g) || []).sort();
    const numsB = (textB.match(/\b\d+(?:\.\d+)?%?\b/g) || []).sort();

    // If both have numbers and their numerical setups differ substantially,
    // they are likely different problem instances of the same concept (e.g., 20% vs 50%, 5km vs 10km)
    if (numsA.length > 0 && numsB.length > 0) {
      const isNumIdentical = JSON.stringify(numsA) === JSON.stringify(numsB);
      if (!isNumIdentical) {
        return true; // Numbers differ -> distinct problem setup!
      }
    }

    // Check specific question intent keywords (e.g., "State" vs "Solve" vs "Differentiate" vs "Calculate")
    const actionWords = ['सिद्ध', 'हल', 'कथन', 'अंतर', 'नियम', 'सत्यापन', 'prove', 'solve', 'state', 'differentiate', 'calculate', 'find'];
    const actionsA = actionWords.filter(w => textA.toLowerCase().includes(w));
    const actionsB = actionWords.filter(w => textB.toLowerCase().includes(w));
    if (actionsA.length > 0 && actionsB.length > 0 && actionsA[0] !== actionsB[0]) {
      return true; // Different cognitive intent (e.g. state theorem vs solve numerical using theorem)
    }

    return false;
  }

  /**
   * Performs Semantic Similarity Comparison between two questions.
   *
   * @param {string} stemA 
   * @param {string} stemB 
   * @returns {object} { similarityScore: number, decision: string, isConceptReuse: boolean, reason: string }
   */
  compareStems(stemA, stemB) {
    const tokensA = this.computeContentTokens(stemA);
    const tokensB = this.computeContentTokens(stemB);

    const jaccard = this.jaccardSimilarity(tokensA, tokensB);
    const ngramsA = this.computeCharNgrams(stemA, 3);
    const ngramsB = this.computeCharNgrams(stemB, 3);
    const cosineNgram = this.cosineSimilarity(ngramsA, ngramsB);

    // Weighted hybrid similarity score (70% n-gram character overlap, 30% content token Jaccard)
    const hybridScore = (cosineNgram * 0.7) + (jaccard * 0.3);
    const roundedScore = Math.round(hybridScore * 10000) / 10000;

    // Check concept repetition exception
    if (this.isDistinctConceptApplication(stemA, stemB)) {
      return {
        similarityScore: roundedScore,
        decision: 'UNIQUE',
        isConceptReuse: true,
        reason: 'CONCEPT_REUSE_ALLOWED: Same academic concept tested with distinct setup, numerical values, or reasoning.'
      };
    }

    // Standard decision boundaries
    if (roundedScore >= 0.82) {
      return {
        similarityScore: roundedScore,
        decision: 'DUPLICATE',
        isConceptReuse: false,
        reason: 'HIGH_SEMANTIC_OVERLAP: Question stem has substantially identical intent and phrasing.'
      };
    } else if (roundedScore >= 0.65) {
      return {
        similarityScore: roundedScore,
        decision: 'POSSIBLE_DUPLICATE',
        isConceptReuse: false,
        reason: 'MODERATE_SEMANTIC_OVERLAP: Potential paraphrase requiring human or secondary review.'
      };
    } else {
      return {
        similarityScore: roundedScore,
        decision: 'UNIQUE',
        isConceptReuse: false,
        reason: 'NOVEL: Sufficiently unique semantic structure and phrasing.'
      };
    }
  }

  /**
   * Checks candidate question against an array of target questions or the database.
   *
   * @param {object} candidate - { stem, options, questionId }
   * @param {Array<object>} targetCorpus - [{ id, text }]
   * @param {object} [db]
   * @returns {object} { decision: string, maxSimilarity: number, mostSimilarItem: object|null, reason: string }
   */
  checkSemanticDuplicate(candidate, targetCorpus = [], db = getDb()) {
    let maxScore = 0;
    let worstDecision = 'UNIQUE';
    let mostSimilarItem = null;
    let worstReason = 'No similar question found in target corpus.';

    for (const target of targetCorpus) {
      const res = this.compareStems(candidate.stem, target.text || target.stem);
      if (res.similarityScore > maxScore) {
        maxScore = res.similarityScore;
        mostSimilarItem = target;
        worstDecision = res.decision;
        worstReason = res.reason;
      }

      // Record comparison if db is available and score is notable (> 0.50)
      if (db && candidate.questionId && target.id && res.similarityScore > 0.50) {
        try {
          db.prepare(`
            INSERT INTO semantic_comparisons (
              comparison_id, source_question_id, compared_question_id, compared_corpus_type,
              similarity_score, detection_method, decision, decision_reason
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
          `).run(
            `sem-${crypto.randomBytes(8).toString('hex')}`,
            candidate.questionId,
            target.id,
            target.corpusType || 'INTERNAL_BANK',
            res.similarityScore,
            'HYBRID_TFIDF_NGRAM',
            res.decision,
            res.reason
          );
        } catch (e) {
          // Non-blocking log
        }
      }
    }

    return {
      decision: worstDecision,
      maxSimilarity: maxScore,
      mostSimilarItem,
      reason: worstReason
    };
  }
}

module.exports = new DuplicateEngine();
