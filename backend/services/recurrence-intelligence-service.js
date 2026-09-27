// backend/services/recurrence-intelligence-service.js
// Recurrence Intelligence & Multi-Level Concept Distinction Engine
// Enforces: FREQUENCY IS A SIGNAL, NOT A FILTER.
// Distinguishes Question Repetition vs Concept Repetition.
// Classifies Exact Duplicates vs Near Duplicates vs Same Concept Distinct Questions.

const crypto = require('crypto');
const { getDb } = require('../db/database');

class RecurrenceIntelligenceService {
  constructor() {
    this.RECURRENCE_TIERS = {
      VERY_HIGH: 'VERY_HIGH', // >= 6 appearances
      HIGH: 'HIGH',           // 4-5 appearances
      MEDIUM: 'MEDIUM',       // 2-3 appearances
      LOW: 'LOW',             // 2 appearances
      RARE: 'RARE',           // 1 appearance, syllabus relevant (is_rare_relevant = 1)
      ONE_TIME: 'ONE_TIME'    // 1 appearance
    };

    this.RELATION_TYPES = {
      EXACT_DUPLICATE: 'EXACT_DUPLICATE',
      NEAR_DUPLICATE: 'NEAR_DUPLICATE',
      SAME_CONCEPT_DIFFERENT_QUESTION: 'SAME_CONCEPT_DIFFERENT_QUESTION',
      SAME_TOPIC_DIFFERENT_CONCEPT: 'SAME_TOPIC_DIFFERENT_CONCEPT',
      UNRELATED: 'UNRELATED'
    };
  }

  /**
   * Normalizes Indic and Latin text for deterministic comparison
   */
  normalizeText(text) {
    if (!text || typeof text !== 'string') return '';
    return text
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[\u200B-\u200D\uFEFF]/g, '')
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"'।॥]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase();
  }

  /**
   * Tokenizes text into unique content word sets
   */
  tokenize(text) {
    const norm = this.normalizeText(text);
    return new Set(norm.split(' ').filter(w => w.length > 2));
  }

  /**
   * Computes Jaccard word set similarity between two strings
   */
  computeSimilarity(str1, str2) {
    const s1 = this.tokenize(str1);
    const s2 = this.tokenize(str2);

    if (s1.size === 0 || s2.size === 0) return 0;

    let intersection = 0;
    for (const t of s1) {
      if (s2.has(t)) intersection++;
    }

    const union = s1.size + s2.size - intersection;
    return union > 0 ? intersection / union : 0;
  }

  /**
   * Analyzes relationship between two questions:
   * Level 1: EXACT_DUPLICATE (SHA-256 fingerprint)
   * Level 2: NEAR_DUPLICATE (Similarity >= 0.85)
   * Level 3: SAME_CONCEPT_DIFFERENT_QUESTION (Shared concept/entity but different query)
   * Level 4: SAME_TOPIC_DIFFERENT_CONCEPT
   * Level 5: UNRELATED
   */
  analyzeQuestionRelation(q1, q2) {
    const stem1 = typeof q1 === 'string' ? q1 : (q1.stem || q1.text || '');
    const stem2 = typeof q2 === 'string' ? q2 : (q2.stem || q2.text || '');

    // Level 1: Exact Hash
    const hash1 = crypto.createHash('sha256').update(this.normalizeText(stem1)).digest('hex');
    const hash2 = crypto.createHash('sha256').update(this.normalizeText(stem2)).digest('hex');

    if (hash1 === hash2) {
      return {
        relation: this.RELATION_TYPES.EXACT_DUPLICATE,
        similarity: 1.0,
        isDuplicate: true,
        action: 'BLOCK_DUPLICATE',
        reason: 'Identical normalized question stem.'
      };
    }

    const sim = this.computeSimilarity(stem1, stem2);

    // Level 2: Near Duplicate
    if (sim >= 0.85) {
      return {
        relation: this.RELATION_TYPES.NEAR_DUPLICATE,
        similarity: sim,
        isDuplicate: true,
        action: 'BLOCK_DUPLICATE',
        reason: `Near duplicate question with ${(sim * 100).toFixed(1)}% wording overlap.`
      };
    }

    // Level 3: Same Concept Different Question
    const concept1 = (typeof q1 === 'object' && q1.concept) ? q1.concept.toLowerCase() : '';
    const concept2 = (typeof q2 === 'object' && q2.concept) ? q2.concept.toLowerCase() : '';

    const shareConcept = concept1 && concept2 && concept1 === concept2;
    const moderateOverlap = sim >= 0.35 && sim < 0.85;

    if (shareConcept || (moderateOverlap && this.hasCommonSubjectEntity(stem1, stem2))) {
      return {
        relation: this.RELATION_TYPES.SAME_CONCEPT_DIFFERENT_QUESTION,
        similarity: sim,
        isDuplicate: false,
        action: 'APPROVE_DISTINCT_QUESTION',
        reason: 'Tests the same curriculum concept with a distinct question angle. Valid independent question.'
      };
    }

    if (sim >= 0.20) {
      return {
        relation: this.RELATION_TYPES.SAME_TOPIC_DIFFERENT_CONCEPT,
        similarity: sim,
        isDuplicate: false,
        action: 'APPROVE_DISTINCT_QUESTION',
        reason: 'Shared subject topic with independent conceptual scope.'
      };
    }

    return {
      relation: this.RELATION_TYPES.UNRELATED,
      similarity: sim,
      isDuplicate: false,
      action: 'APPROVE_DISTINCT_QUESTION',
      reason: 'Unrelated questions.'
    };
  }

  /**
   * Detects common core subject entity (e.g. Article 14, Akbar, Indus Valley, Ohm's Law)
   */
  hasCommonSubjectEntity(stem1, stem2) {
    const s1 = this.tokenize(stem1);
    const s2 = this.tokenize(stem2);
    const keyEntities = [
      'article', 'constitution', 'river', 'capital', 'president', 'parliament',
      'speed', 'velocity', 'force', 'acceleration', 'ohm', 'resistance',
      'percentage', 'profit', 'loss', 'interest', 'ratio', 'syllogism',
      'mughal', 'akbar', 'ashoka', 'mauryan', 'harappa', 'indus'
    ];

    for (const ent of keyEntities) {
      if (s1.has(ent) && s2.has(ent)) return true;
    }
    return false;
  }

  /**
   * Computes recurrence tier based on occurrence count and syllabus relevance
   * Implements Section 2 & 51 invariants
   */
  calculateRecurrenceTier(occurrenceCount, isSyllabusRelevant = true) {
    const count = parseInt(occurrenceCount, 10) || 1;

    if (count >= 6) return this.RECURRENCE_TIERS.VERY_HIGH;
    if (count >= 4) return this.RECURRENCE_TIERS.HIGH;
    if (count >= 2) return this.RECURRENCE_TIERS.MEDIUM;
    
    // For single occurrence: if syllabus relevant, classify as RARE (not thrown away!)
    if (count === 1 && isSyllabusRelevant) {
      return this.RECURRENCE_TIERS.RARE;
    }

    return this.RECURRENCE_TIERS.ONE_TIME;
  }

  /**
   * Classifies a question record following the Section 51 specifications:
   * Q-A: count 7, syllabus YES, pattern YES -> retain, VERY_HIGH, current_eligible 1
   * Q-B: count 3, syllabus YES, pattern YES -> retain, MEDIUM, current_eligible 1
   * Q-C: count 1, syllabus YES, pattern YES -> retain, RARE, current_eligible 1
   * Q-D: count 1, syllabus NO -> retain historical, ONE_TIME, current_eligible 0
   */
  classifyQuestionIntelligence(params) {
    const {
      occurrenceCount = 1,
      isSyllabusRelevant = true,
      isPatternRelevant = true,
      isAuthentic = true
    } = params;

    const recurrenceTier = this.calculateRecurrenceTier(occurrenceCount, isSyllabusRelevant);
    const currentEligibility = (isSyllabusRelevant && isAuthentic) ? 1 : 0;
    const fullExamEligibility = (isSyllabusRelevant && isPatternRelevant && isAuthentic) ? 1 : 0;
    const isRareRelevant = (occurrenceCount <= 2 && isSyllabusRelevant && isAuthentic) ? 1 : 0;

    let intelligenceNotes = '';
    if (recurrenceTier === this.RECURRENCE_TIERS.VERY_HIGH) {
      intelligenceNotes = `High-yield recurring PYQ (${occurrenceCount} occurrences across papers). Priority revision target.`;
    } else if (recurrenceTier === this.RECURRENCE_TIERS.MEDIUM || recurrenceTier === this.RECURRENCE_TIERS.HIGH) {
      intelligenceNotes = `Moderately recurring PYQ (${occurrenceCount} occurrences). Standard syllabus benchmark.`;
    } else if (recurrenceTier === this.RECURRENCE_TIERS.RARE) {
      intelligenceNotes = 'Rare but syllabus-relevant authentic question. Preserved to ensure comprehensive preparation breadth.';
    } else if (!isSyllabusRelevant) {
      intelligenceNotes = 'Superseded / outdated syllabus topic. Preserved in historical archive for trend analytics, excluded from active mock simulation.';
    }

    return {
      occurrenceCount,
      recurrenceTier,
      isSyllabusRelevant,
      isPatternRelevant,
      currentEligibility,
      fullExamEligibility,
      isRareRelevant,
      intelligenceNotes
    };
  }

  /**
   * Registers or updates concept frequency in exam_concept_intelligence
   */
  recordConceptIntelligence(data, db = getDb()) {
    if (!db) throw new Error('Database unavailable');
    const {
      examId,
      subjectId,
      chapterId = null,
      topicId = null,
      conceptName,
      year = null
    } = data;

    if (!examId || !subjectId || !conceptName) {
      throw new Error('Mandatory concept intelligence fields missing: examId, subjectId, conceptName');
    }

    const conceptId = `cpt-${examId}-${crypto.createHash('md5').update(conceptName.toLowerCase()).digest('hex').slice(0, 8)}`;

    const existing = db.prepare('SELECT * FROM exam_concept_intelligence WHERE concept_id = ?').get(conceptId);

    if (existing) {
      db.prepare(`
        UPDATE exam_concept_intelligence
        SET concept_frequency = concept_frequency + 1,
            last_seen_year = MAX(COALESCE(last_seen_year, 0), ?),
            updated_at = CURRENT_TIMESTAMP
        WHERE concept_id = ?
      `).run(year || existing.last_seen_year, conceptId);
    } else {
      db.prepare(`
        INSERT INTO exam_concept_intelligence (
          concept_id, exam_id, subject_id, chapter_id, topic_id,
          concept_name, concept_frequency, question_frequency_avg,
          syllabus_status, is_syllabus_important, importance_weight,
          first_seen_year, last_seen_year, gap_identified
        ) VALUES (?, ?, ?, ?, ?, ?, 1, 1.0, 'CURRENT', 1, 1.0, ?, ?, 0)
      `).run(
        conceptId,
        examId,
        subjectId,
        chapterId,
        topicId,
        conceptName,
        year || new Date().getFullYear(),
        year || new Date().getFullYear()
      );
    }

    return db.prepare('SELECT * FROM exam_concept_intelligence WHERE concept_id = ?').get(conceptId);
  }

  /**
   * Retrieves recurrence summary and concept breakdown for an exam
   */
  getExamRecurrenceAnalytics(examId, db = getDb()) {
    if (!db) return null;

    const tierBreakdown = db.prepare(`
      SELECT recurrence_tier, COUNT(*) as count
      FROM questions
      WHERE exam_version_id LIKE ? OR paper_id IN (SELECT paper_id FROM question_papers WHERE exam_id = ?)
      GROUP BY recurrence_tier
    `).all(`%${examId}%`, examId);

    const concepts = db.prepare(`
      SELECT concept_id, concept_name, concept_frequency, syllabus_status, first_seen_year, last_seen_year
      FROM exam_concept_intelligence
      WHERE exam_id = ?
      ORDER BY concept_frequency DESC
      LIMIT 50
    `).all(examId);

    const rareCount = db.prepare(`
      SELECT COUNT(*) as c FROM questions
      WHERE (exam_version_id LIKE ? OR paper_id IN (SELECT paper_id FROM question_papers WHERE exam_id = ?))
        AND is_rare_relevant = 1
    `).get(`%${examId}%`, examId).c;

    const outdatedCount = db.prepare(`
      SELECT COUNT(*) as c FROM questions
      WHERE (exam_version_id LIKE ? OR paper_id IN (SELECT paper_id FROM question_papers WHERE exam_id = ?))
        AND syllabus_status = 'OUTDATED'
    `).get(`%${examId}%`, examId).c;

    return {
      examId,
      tierBreakdown,
      rareRelevantCount: rareCount,
      outdatedHistoricalCount: outdatedCount,
      topConcepts: concepts
    };
  }
}

module.exports = new RecurrenceIntelligenceService();
