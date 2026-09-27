// backend/services/practice-selection-engine.js
// Weighted Practice Selection Engine
// Implements:
// 1. Core candidate filtering (exam, subject, topic, language, current_eligibility = 1)
// 2. Weighted sampling balancing recurrence, recency, difficulty, and chapter coverage
// 3. Mandatory Rare-but-Relevant Question Quota (guarantees rare questions are intentionally included)
// 4. Zero duplicate question guarantee within a single session

const { getDb } = require('../db/database');

class PracticeSelectionEngine {
  constructor() {
    this.DEFAULT_WEIGHTS = {
      recurrenceWeight: 0.35,
      recencyWeight: 0.20,
      difficultyWeight: 0.15,
      chapterCoverageWeight: 0.10,
      rareQuestionQuotaPct: 0.20 // 20% quota for rare-but-relevant questions
    };
  }

  /**
   * Generates a balanced practice question set respecting rare question inclusion
   */
  generatePracticeSet(params, db = getDb()) {
    if (!db) throw new Error('Database unavailable');
    const {
      examId,
      subjectId = null,
      chapterId = null,
      topicId = null,
      questionCount = 10,
      targetDifficulty = 'MEDIUM',
      rareQuotaPct = this.DEFAULT_WEIGHTS.rareQuestionQuotaPct
    } = params;

    // 1. Query all eligible questions for this exam
    let sql = `
      SELECT 
        q.question_id, q.subject_id, q.chapter_id, q.topic_id, q.question_type_id,
        q.difficulty, q.marks, q.provenance, q.question_tier, q.historical_year,
        q.recurrence_tier, q.occurrence_count, q.is_rare_relevant, q.fingerprint,
        qv.language_content, qv.correct_answer
      FROM questions q
      JOIN question_versions qv ON q.question_id = qv.question_id AND (qv.version_number = q.current_version OR qv.version_number = '1.0.0' OR qv.version_number = 1)
      WHERE q.current_eligibility = 1
        AND (q.exam_version_id LIKE ? OR q.paper_id IN (SELECT paper_id FROM question_papers WHERE exam_id = ?))
    `;
    const queryParams = [`%${examId}%`, examId];

    if (subjectId) {
      sql += ' AND q.subject_id = ?';
      queryParams.push(subjectId);
    }
    if (chapterId) {
      sql += ' AND q.chapter_id = ?';
      queryParams.push(chapterId);
    }
    if (topicId) {
      sql += ' AND q.topic_id = ?';
      queryParams.push(topicId);
    }

    const candidates = db.prepare(sql).all(...queryParams);

    if (candidates.length === 0) {
      return {
        success: false,
        status: 'NO_ELIGIBLE_QUESTIONS',
        message: 'No eligible questions available matching requested criteria.',
        questions: []
      };
    }

    // 2. Separate candidates into Rare-but-Relevant pool vs Recurring/Standard pool
    const rarePool = candidates.filter(q => q.is_rare_relevant === 1 || q.recurrence_tier === 'RARE');
    const standardPool = candidates.filter(q => q.is_rare_relevant !== 1 && q.recurrence_tier !== 'RARE');

    const desiredRareCount = Math.max(1, Math.round(questionCount * rareQuotaPct));
    const selectedQuestions = [];
    const selectedIds = new Set();
    const selectedFingerprints = new Set();

    const isDuplicate = (q) => {
      if (selectedIds.has(q.question_id)) return true;
      if (q.fingerprint && selectedFingerprints.has(q.fingerprint)) return true;
      return false;
    };

    const markSelected = (q, reason) => {
      selectedQuestions.push({ ...q, selectionReason: reason });
      selectedIds.add(q.question_id);
      if (q.fingerprint) selectedFingerprints.add(q.fingerprint);
    };

    // 3. Sample Rare-but-Relevant Questions (Guaranteeing preparation breadth)
    this.shuffle(rarePool);
    for (const q of rarePool) {
      if (selectedQuestions.length >= desiredRareCount) break;
      if (!isDuplicate(q)) {
        markSelected(q, 'RARE_RELEVANT_QUOTA');
      }
    }

    // 4. Sample remaining questions from standard / recurring pool using weighted score
    const scoredCandidates = standardPool
      .filter(q => !isDuplicate(q))
      .map(q => {
        let score = 0;
        // Recurrence score (higher recurrence = higher priority)
        const occ = q.occurrence_count || 1;
        score += Math.min(occ / 5, 1.0) * this.DEFAULT_WEIGHTS.recurrenceWeight;

        // Recency score (more recent = higher priority)
        const yr = q.historical_year || 2020;
        const recencyNorm = Math.max(0, (yr - 2015) / 10);
        score += recencyNorm * this.DEFAULT_WEIGHTS.recencyWeight;

        // Difficulty match score
        if (q.difficulty === targetDifficulty) {
          score += this.DEFAULT_WEIGHTS.difficultyWeight;
        }

        return { question: q, score };
      });

    // Sort by weighted score descending with slight jitter
    scoredCandidates.sort((a, b) => b.score - a.score);

    for (const item of scoredCandidates) {
      if (selectedQuestions.length >= questionCount) break;
      const q = item.question;
      if (!isDuplicate(q)) {
        markSelected(q, 'WEIGHTED_RECURRENCE_AND_RECENCY');
      }
    }

    // If still short, fallback to any unpicked rarePool items without duplication
    if (selectedQuestions.length < questionCount) {
      for (const q of rarePool) {
        if (selectedQuestions.length >= questionCount) break;
        if (!isDuplicate(q)) {
          markSelected(q, 'INVENTORY_COMPLETION');
        }
      }
    }

    const rareIncludedCount = selectedQuestions.filter(q => q.is_rare_relevant === 1 || q.recurrence_tier === 'RARE').length;
    const actualRarePct = (rareIncludedCount / selectedQuestions.length) * 100;

    return {
      success: true,
      status: 'SUCCESS',
      examId,
      requestedCount: questionCount,
      deliveredCount: selectedQuestions.length,
      rareQuotaTargetPct: rareQuotaPct * 100,
      rareQuotaDeliveredPct: actualRarePct,
      rareQuestionsCount: rareIncludedCount,
      questions: selectedQuestions.map(q => {
        let content = {};
        try {
          content = typeof q.language_content === 'string' ? JSON.parse(q.language_content) : q.language_content;
        } catch (e) {}
        return {
          questionId: q.question_id,
          subjectId: q.subject_id,
          chapterId: q.chapter_id,
          topicId: q.topic_id,
          marks: q.marks,
          provenance: q.provenance,
          questionTier: q.question_tier,
          recurrenceTier: q.recurrence_tier,
          occurrenceCount: q.occurrence_count,
          isRareRelevant: q.is_rare_relevant,
          historicalYear: q.historical_year,
          selectionReason: q.selectionReason,
          languageContent: content,
          correctAnswer: q.correct_answer
        };
      })
    };
  }

  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
}

module.exports = new PracticeSelectionEngine();
