// backend/services/bulk-ingestion-service.js
// Phase 12: Content Ingestion Pipeline & Quality Review Queue Service
// Validates authentic question batches, enforces provenance invariants, and manages editorial review queues.

const crypto = require('crypto');
const { getDb } = require('../db/database');

class BulkIngestionService {
  constructor() {
    this.PRIORITIES = {
      CRITICAL: 'CRITICAL',
      HIGH: 'HIGH',
      MEDIUM: 'MEDIUM',
      LOW: 'LOW'
    };

    this.QUEUE_STATUSES = {
      OPEN: 'OPEN',
      IN_REVIEW: 'IN_REVIEW',
      RESOLVED: 'RESOLVED',
      REJECTED: 'REJECTED'
    };
  }

  /**
   * Generates a deterministic content fingerprint for question deduplication.
   */
  computeQuestionFingerprint(stem, options = []) {
    const normStem = stem.trim().toLowerCase().replace(/\s+/g, ' ');
    const normOpts = options.map(o => String(o).trim().toLowerCase().replace(/\s+/g, ' ')).sort().join('|');
    return crypto.createHash('sha256').update(`${normStem}:::${normOpts}`).digest('hex');
  }

  /**
   * Ingests a batch of authentic/sample questions with strict validation gating.
   * Invalid or suspicious items are routed to the content_review_queues.
   *
   * @param {Array<object>} items
   * @param {object} sourceMetadata
   * @param {object} [db]
   * @returns {object} ingestion summary
   */
  ingestQuestionBatch(items, sourceMetadata = {}, db = getDb()) {
    if (!db) throw new Error('Database connection required');
    if (!Array.isArray(items) || items.length === 0) {
      return { ingested: 0, queuedForReview: 0, rejected: 0, items: [] };
    }

    let ingested = 0;
    let queuedForReview = 0;
    let rejected = 0;
    const results = [];

    const insertQStmt = db.prepare(`
      INSERT INTO questions (
        question_id, exam_version_id, board_id, subject_id, chapter_id, topic_id,
        question_type_id, difficulty, marks, source_type, source_id, is_verified,
        verified_at, current_version, fingerprint, provenance, difficulty_type,
        relevance_priority, is_published, trust_status, full_exam_eligible,
        practice_eligible, paper_id, source_question_number, shift, set_code,
        stage, quality_state, question_tier, duplicate_status
      ) VALUES (
        ?, ?, ?, ?, ?, ?,
        'single_mcq', ?, ?, ?, ?, ?,
        CURRENT_TIMESTAMP, 1, ?, ?, ?,
        ?, 1, ?, ?,
        1, ?, ?, ?, ?,
        ?, 'FULLY_VERIFIED', ?, 'UNIQUE'
      )
    `);

    const insertVersionStmt = db.prepare(`
      INSERT INTO question_versions (
        version_id, question_id, version_number, language_content, correct_answer,
        correction_reason, verified
      ) VALUES (?, ?, 1, ?, ?, ?, ?)
    `);

    const insertQueueStmt = db.prepare(`
      INSERT INTO content_review_queues (
        queue_item_id, queue_type, entity_type, entity_id, exam_id,
        priority, review_reason, detected_discrepancy, status,
        reviewer_id, resolution_notes, created_at
      ) VALUES (?, ?, 'QUESTION', ?, ?, ?, ?, ?, 'OPEN', NULL, NULL, CURRENT_TIMESTAMP)
    `);

    const insertFpStmt = db.prepare(`
      INSERT OR IGNORE INTO question_fingerprints (
        fingerprint_id, entity_type, question_id, fingerprint, normalized_stem
      ) VALUES (?, 'QUESTION', ?, ?, ?)
    `);

    const tx = db.transaction(() => {
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const qText = item.question_text || item.stem || '';
        const options = item.options || [];
        const correctIndex = item.correct_option_index ?? item.correctOptionIndex;
        const subjectId = item.subject_id || item.subjectId || 'subj-gk';
        const provenance = item.provenance || 'OFFICIAL_PYQ';
        const examId = item.exam_id || sourceMetadata.examId || 'general';
        const examVersionId = item.exam_version_id || sourceMetadata.examVersionId || null;
        const boardId = item.board_id || sourceMetadata.boardId || null;
        const paperId = item.paper_id || sourceMetadata.paperId || null;
        const qNum = item.source_question_number || i + 1;

        // Validation Rule 1: Structural completeness
        if (!qText.trim() || !Array.isArray(options) || options.length < 2 || correctIndex === undefined || correctIndex === null) {
          rejected++;
          results.push({ index: i, status: 'REJECTED', reason: 'Missing mandatory stem, options, or correct answer' });
          continue;
        }

        // Validation Rule 2: Valid correct option index bounds
        if (correctIndex < 0 || correctIndex >= options.length) {
          const itemId = `rev-item-${Date.now()}-${i}`;
          insertQueueStmt.run(
            itemId,
            'ANOMALY_DETECTION',
            `pending-q-${i}`,
            examId,
            'CRITICAL',
            'INVALID_ANSWER_INDEX',
            `Correct index ${correctIndex} is out of bounds for options array of length ${options.length}`
          );
          queuedForReview++;
          results.push({ index: i, status: 'QUEUED_FOR_REVIEW', queueId: itemId, reason: 'Invalid answer index' });
          continue;
        }

        // Validation Rule 3: Provenance Integrity & Safety Gate
        let fullExamEligible = 0;
        let isVerified = 1;
        let trustStatus = 'VERIFIED_PYQ';
        let tier = 'TIER_2_VERIFIED_PYQ';
        let sourceType = 'PREVIOUS_YEAR_QUESTION';

        if (provenance === 'OFFICIAL_PYQ') {
          if (!paperId) {
            const itemId = `rev-item-${Date.now()}-${i}`;
            insertQueueStmt.run(
              itemId,
              'PROVENANCE_AUDIT',
              `pending-q-${i}`,
              examId,
              'HIGH',
              'MISSING_OFFICIAL_PAPER_ID',
              'Question claimed OFFICIAL_PYQ without referencing an official source paper_id'
            );
            queuedForReview++;
            results.push({ index: i, status: 'QUEUED_FOR_REVIEW', queueId: itemId, reason: 'Missing paper_id' });
            continue;
          }
          tier = 'TIER_2_VERIFIED_PYQ';
          trustStatus = 'VERIFIED_PYQ';
          sourceType = 'PREVIOUS_YEAR_QUESTION';
          fullExamEligible = item.full_exam_eligible ? 1 : 0;
        } else if (provenance === 'OFFICIAL_SAMPLE') {
          tier = 'TIER_3_OFFICIAL_SAMPLE';
          trustStatus = 'OFFICIAL_SAMPLE';
          sourceType = 'SAMPLE_PAPER';
          fullExamEligible = 0; // Samples are practice only
        } else if (provenance === 'AI_PRACTICE') {
          // Absolute Invariant: AI questions are NEVER full_exam_eligible
          tier = 'TIER_5_AI_GENERATED';
          trustStatus = 'PRACTICE_ONLY';
          sourceType = 'SYNTHETIC';
          fullExamEligible = 0;
          isVerified = 0;
        }

        // Validation Rule 4: Duplicate fingerprint check
        const fp = this.computeQuestionFingerprint(qText, options);
        const existingFp = db.prepare('SELECT question_id FROM question_fingerprints WHERE fingerprint = ?').get(fp);

        if (existingFp) {
          const itemId = `rev-item-${Date.now()}-${i}`;
          insertQueueStmt.run(
            itemId,
            'DUPLICATE_SUSPECT',
            existingFp.question_id,
            examId,
            'LOW',
            'POTENTIAL_DUPLICATE',
            `Question duplicates stem and options with existing question '${existingFp.question_id}'`
          );
          queuedForReview++;
          results.push({ index: i, status: 'QUEUED_FOR_REVIEW', queueId: itemId, reason: 'Duplicate fingerprint' });
          continue;
        }

        // Resolve foreign keys safely to avoid constraint violations
        let resolvedSubjectId = subjectId;
        const subRow = db.prepare("SELECT subject_id FROM subjects WHERE subject_id = ?").get(resolvedSubjectId);
        if (!subRow) resolvedSubjectId = 'subj-gk';

        let resolvedSourceId = item.source_id || sourceMetadata.sourceId;
        if (!resolvedSourceId) {
          const sRow = db.prepare("SELECT source_id FROM official_sources WHERE applicable_exam_id = ? LIMIT 1").get(examId);
          resolvedSourceId = sRow ? sRow.source_id : 'src-upsc-cse-portal';
        }

        let resolvedPaperId = paperId;
        if (resolvedPaperId) {
          const pRow = db.prepare("SELECT paper_id FROM question_papers WHERE paper_id = ?").get(resolvedPaperId);
          if (!pRow) resolvedPaperId = null;
        }

        let resolvedExamVersionId = examVersionId;
        if (resolvedExamVersionId) {
          const evRow = db.prepare("SELECT version_id FROM exam_versions WHERE version_id = ?").get(resolvedExamVersionId);
          if (!evRow) resolvedExamVersionId = null;
        }

        let resolvedBoardId = boardId;
        if (resolvedBoardId) {
          const bRow = db.prepare("SELECT board_id FROM boards WHERE board_id = ?").get(resolvedBoardId);
          if (!bRow) resolvedBoardId = null;
        }

        // Insert into questions
        const questionId = item.question_id || `q-exp-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
        insertQStmt.run(
          questionId,
          resolvedExamVersionId,
          resolvedBoardId,
          resolvedSubjectId,
          item.chapter_id || null,
          item.topic_id || null,
          item.difficulty || 'MEDIUM',
          item.marks || 1.0,
          sourceType,
          resolvedSourceId,
          isVerified,
          fp,
          provenance,
          'SINGLE_CORRECT',
          1,
          trustStatus,
          fullExamEligible,
          resolvedPaperId,
          qNum,
          item.shift || 'Shift 1',
          item.set_code || 'Set A',
          item.stage || 'Tier 1',
          tier
        );

        // Insert question versions (bilingual structure)
        const langObj = {
          en: {
            q: qText,
            options: options,
            ans: options[correctIndex],
            exp: item.explanation || 'Verified official answer.'
          }
        };
        const correctAnsObj = {
          index: correctIndex,
          key: String.fromCharCode(65 + correctIndex),
          value: options[correctIndex]
        };

        insertVersionStmt.run(
          `ver-${questionId}-1`,
          questionId,
          JSON.stringify(langObj),
          JSON.stringify(correctAnsObj),
          'Batch Ingestion verified import',
          isVerified
        );

        insertFpStmt.run(
          `fp-${questionId}`,
          questionId,
          fp,
          qText.trim().toLowerCase().slice(0, 200)
        );

        ingested++;
        results.push({ index: i, status: 'INGESTED', questionId, provenance, tier });
      }
    });

    tx();

    return {
      totalSubmitted: items.length,
      ingested,
      queuedForReview,
      rejected,
      results
    };
  }

  /**
   * Retrieves pending or filtered items from content review queue.
   */
  getReviewQueue(filters = {}, db = getDb()) {
    if (!db) return [];
    const { status = 'OPEN', priority = null, limit = 50 } = filters;

    let sql = 'SELECT * FROM content_review_queues WHERE 1=1';
    const params = [];

    if (status && status !== 'ALL') {
      sql += ' AND status = ?';
      params.push(status);
    }
    if (priority) {
      sql += ' AND priority = ?';
      params.push(priority);
    }

    sql += ' ORDER BY CASE priority WHEN "CRITICAL" THEN 1 WHEN "HIGH" THEN 2 WHEN "MEDIUM" THEN 3 ELSE 4 END, created_at DESC LIMIT ?';
    params.push(limit);

    return db.prepare(sql).all(...params);
  }

  /**
   * Resolves a review queue item with audit documentation.
   */
  resolveReviewItem(queueItemId, action, resolutionNotes = '', reviewerId = 'ADMIN', db = getDb()) {
    if (!db) throw new Error('Database connection required');
    const item = db.prepare('SELECT * FROM content_review_queues WHERE queue_item_id = ?').get(queueItemId);
    if (!item) throw new Error(`Review item '${queueItemId}' not found`);

    const newStatus = action === 'APPROVE' ? this.QUEUE_STATUSES.RESOLVED : this.QUEUE_STATUSES.REJECTED;

    db.prepare(`
      UPDATE content_review_queues
      SET status = ?,
          resolution_notes = coalesce(resolution_notes, '') || ' | ' || ?,
          reviewer_id = ?,
          resolved_at = CURRENT_TIMESTAMP
      WHERE queue_item_id = ?
    `).run(newStatus, `Action [${action}] by ${reviewerId}: ${resolutionNotes}`, reviewerId, queueItemId);

    return {
      queueItemId,
      previousStatus: item.status,
      newStatus,
      reviewerId,
      resolvedAt: new Date().toISOString()
    };
  }

  /**
   * Allows candidates or educators to flag a question for editorial review.
   */
  flagQuestion(params, db = getDb()) {
    if (!db) throw new Error('Database connection required');
    const { questionId, examId, issueType, priority = 'MEDIUM', notes = '', detectedDiscrepancy = '' } = params;

    if (!questionId) throw new Error('questionId is required to flag a question');

    const itemId = `flag-${questionId}-${Date.now()}`;
    db.prepare(`
      INSERT INTO content_review_queues (
        queue_item_id, queue_type, entity_type, entity_id, exam_id,
        priority, review_reason, detected_discrepancy, status,
        reviewer_id, resolution_notes, created_at
      ) VALUES (?, 'USER_REPORTED_ERROR', 'QUESTION', ?, ?, ?, ?, ?, 'OPEN', NULL, NULL, CURRENT_TIMESTAMP)
    `).run(
      itemId,
      questionId,
      examId || 'general',
      priority,
      issueType || 'CONTENT_ERROR',
      detectedDiscrepancy || notes
    );

    return {
      queueItemId: itemId,
      questionId,
      status: 'OPEN',
      priority,
      message: 'Question flagged successfully for editorial review.'
    };
  }
}

module.exports = new BulkIngestionService();
