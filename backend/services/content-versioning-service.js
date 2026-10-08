// backend/services/content-versioning-service.js
// Question Versioning & Audit History Service
// Guarantees non-destructive editing: every correction creates an immutable historical version.

const crypto = require('crypto');
const { getDb } = require('../db/database');

class ContentVersioningService {
  /**
   * Retrieves all historical versions of a question.
   *
   * @param {string} questionId 
   * @param {object} [db]
   * @returns {Array<object>} array of versions ordered by version_number ascending
   */
  getQuestionHistory(questionId, db = getDb()) {
    if (!db) return [];

    const rows = db.prepare(`
      SELECT 
        version_id, question_id, version_number, language_content,
        correct_answer, numerical_tolerance, marking_rule_id,
        correction_reason, supersedes_version, verified, created_at
      FROM question_versions
      WHERE question_id = ?
      ORDER BY version_number ASC
    `).all(questionId);

    const safeParse = (val) => {
      if (typeof val !== 'string') return val;
      try {
        return JSON.parse(val);
      } catch {
        return val;
      }
    };

    return rows.map(r => ({
      ...r,
      languageContent: safeParse(r.language_content),
      correctAnswer: safeParse(r.correct_answer)
    }));
  }

  /**
   * Creates a new immutable version of an existing question.
   *
   * @param {string} questionId 
   * @param {object} updateData - { languageContent, correctAnswer, correctionReason, markingRuleId, verified }
   * @param {object} [db]
   * @returns {object} { success: boolean, versionNumber: number, versionId: string }
   */
  createNewVersion(questionId, updateData, db = getDb()) {
    if (!db) throw new Error('Database unavailable');

    const question = db.prepare('SELECT question_id, current_version FROM questions WHERE question_id = ?').get(questionId);
    if (!question) throw new Error(`Question '${questionId}' not found.`);

    const nextVersionNum = (question.current_version || 1) + 1;
    const versionId = `ver-${questionId}-${nextVersionNum}`;

    const {
      languageContent,
      correctAnswer,
      correctionReason = 'Editorial correction or clarification update',
      markingRuleId = null,
      verified = 1
    } = updateData;

    // 1. Insert new version record
    db.prepare(`
      INSERT INTO question_versions (
        version_id, question_id, version_number, language_content,
        correct_answer, marking_rule_id, correction_reason, supersedes_version,
        verified, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `).run(
      versionId,
      questionId,
      nextVersionNum,
      typeof languageContent === 'string' ? languageContent : JSON.stringify(languageContent),
      typeof correctAnswer === 'string' ? correctAnswer : JSON.stringify(correctAnswer),
      markingRuleId,
      correctionReason,
      question.current_version,
      verified ? 1 : 0
    );

    // 2. Update current_version pointer on questions table
    db.prepare(`
      UPDATE questions 
      SET current_version = ?, updated_at = CURRENT_TIMESTAMP
      WHERE question_id = ?
    `).run(nextVersionNum, questionId);

    return {
      success: true,
      questionId,
      versionNumber: nextVersionNum,
      versionId,
      supersededVersion: question.current_version,
      correctionReason
    };
  }
}

module.exports = new ContentVersioningService();
