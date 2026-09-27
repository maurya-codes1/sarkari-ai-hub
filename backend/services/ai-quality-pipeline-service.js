// backend/services/ai-quality-pipeline-service.js
// 10-Step AI Practice Question Quality Pipeline & Provenance Isolation

const crypto = require('crypto');
const { getDb } = require('../db/database');

class AiQualityPipelineService {
  /**
   * Execute 10-step quality validation on an AI-generated question
   */
  validateQuestion(q, examId, db = getDb()) {
    const results = {
      step1_schema: false,
      step2_syllabus: false,
      step3_concept: false,
      step4_answer: false,
      step5_options: false,
      step6_duplicate: false,
      step7_ambiguity: false,
      step8_language: false,
      step9_difficulty: false,
      step10_provenance: false,
      passedAll: false,
      errors: []
    };

    // Step 1: Schema validation
    if (q.question_text && typeof q.question_text === 'string' && q.question_text.trim().length >= 10 &&
        Array.isArray(q.options) && q.options.length === 4 &&
        q.explanation && q.explanation.trim().length >= 5) {
      results.step1_schema = true;
    } else {
      results.errors.push('Schema validation failed: Missing question text, 4 options, or explanation.');
    }

    // Step 2: Syllabus validation
    if (q.subject_id && q.chapter_id && q.topic_id) {
      results.step2_syllabus = true;
    } else {
      results.errors.push('Syllabus validation failed: Missing subject, chapter, or topic mapping.');
    }

    // Step 3: Concept validation
    if (q.concept_tested && q.concept_tested.trim().length >= 3) {
      results.step3_concept = true;
    } else {
      results.errors.push('Concept validation failed: Undefined concept_tested.');
    }

    // Step 4: Answer validation (exact single correct answer index 0..3)
    if (typeof q.correct_option_index === 'number' && q.correct_option_index >= 0 && q.correct_option_index <= 3) {
      results.step4_answer = true;
    } else {
      results.errors.push('Answer validation failed: correct_option_index must be integer between 0 and 3.');
    }

    // Step 5: Option validation (no duplicates, non-empty)
    if (results.step1_schema) {
      const trimmedOptions = q.options.map(opt => String(opt).trim().toLowerCase());
      const uniqueOptions = new Set(trimmedOptions);
      if (uniqueOptions.size === 4 && !trimmedOptions.some(opt => opt.length === 0)) {
        results.step5_options = true;
      } else {
        results.errors.push('Option validation failed: Duplicate or blank options detected.');
      }
    }

    // Step 6: Duplicate detection (exact hash check against existing question bank)
    const textHash = crypto.createHash('sha256').update(q.question_text.trim().toLowerCase()).digest('hex');
    const existing = db.prepare('SELECT count(*) as c FROM questions WHERE fingerprint = ?').get(textHash);
    if (!existing || existing.c === 0) {
      results.step6_duplicate = true;
    } else {
      results.errors.push('Duplicate detection failed: Exact question text hash already exists in question bank.');
    }

    // Step 7: Ambiguity detection
    const ambiguousPhrases = ['all of the above maybe', 'none of the above perhaps', 'could be true or false'];
    const isAmbiguous = ambiguousPhrases.some(p => q.question_text.toLowerCase().includes(p));
    if (!isAmbiguous) {
      results.step7_ambiguity = true;
    } else {
      results.errors.push('Ambiguity detection failed: Ambiguous phrasing detected.');
    }

    // Step 8: Language validation
    if (q.language && ['en', 'hi', 'ta', 'te', 'mr', 'bn'].includes(q.language.toLowerCase())) {
      results.step8_language = true;
    } else {
      results.errors.push('Language validation failed: Invalid or unsupported language code.');
    }

    // Step 9: Difficulty sanity check
    if (['EASY', 'MEDIUM', 'HARD'].includes(String(q.difficulty || '').toUpperCase())) {
      results.step9_difficulty = true;
    } else {
      results.errors.push('Difficulty sanity check failed: Difficulty must be EASY, MEDIUM, or HARD.');
    }

    // Step 10: Strict Provenance Check
    // MUST NOT claim to be OFFICIAL_PYQ, TIER_2_VERIFIED_PYQ, or unblock full exams
    if (q.provenance === 'AI_PRACTICE' && q.question_tier === 'TIER_5_AI_GENERATED' && q.full_exam_eligible !== 1) {
      results.step10_provenance = true;
    } else {
      results.errors.push('Provenance safety invariant failed: AI generated question MUST have provenance=AI_PRACTICE, question_tier=TIER_5_AI_GENERATED, and full_exam_eligible=0.');
    }

    results.passedAll = Object.keys(results)
      .filter(k => k.startsWith('step'))
      .every(k => results[k] === true);

    return results;
  }

  /**
   * Queue AI practice generation request
   */
  queueGeneration(request, db = getDb()) {
    const queueId = `agq-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    const { examId, subjectId, chapterId, topicId, conceptName, targetDifficulty } = request;

    db.prepare(`
      INSERT INTO ai_generation_queue (
        queue_id, exam_id, subject_id, chapter_id, topic_id,
        concept_name, target_difficulty, model_metadata_json, status, created_at, updated_at
      ) VALUES (
        @queueId, @examId, @subjectId, @chapterId, @topicId,
        @conceptName, @targetDifficulty, @modelMeta, 'QUEUED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
      )
    `).run({
      queueId,
      examId,
      subjectId,
      chapterId,
      topicId,
      conceptName,
      targetDifficulty: targetDifficulty || 'MEDIUM',
      modelMeta: JSON.stringify({ model: 'gemini-1.5-pro', temperature: 0.2, sourceConcept: conceptName })
    });

    return { queueId, status: 'QUEUED' };
  }

  /**
   * Process a queued generation item and run through the 10-step pipeline
   */
  processQueuedItem(queueId, sampleGeneratedQuestion, db = getDb()) {
    const item = db.prepare('SELECT * FROM ai_generation_queue WHERE queue_id = ?').get(queueId);
    if (!item) throw new Error(`Queue item not found: ${queueId}`);

    const validation = this.validateQuestion(sampleGeneratedQuestion, item.exam_id, db);

    if (validation.passedAll) {
      const questionId = `q-ai-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

      // Update queue
      db.prepare(`
        UPDATE ai_generation_queue
        SET status = 'APPROVED',
            generated_question_id = ?,
            validation_pipeline_results_json = ?,
            updated_at = CURRENT_TIMESTAMP
        WHERE queue_id = ?
      `).run(questionId, JSON.stringify(validation), queueId);

      return {
        queueId,
        status: 'APPROVED',
        questionId,
        validation
      };
    } else {
      db.prepare(`
        UPDATE ai_generation_queue
        SET status = 'REJECTED',
            validation_pipeline_results_json = ?,
            rejection_reason = ?,
            updated_at = CURRENT_TIMESTAMP
        WHERE queue_id = ?
      `).run(JSON.stringify(validation), validation.errors.join('; '), queueId);

      return {
        queueId,
        status: 'REJECTED',
        rejectionReason: validation.errors.join('; '),
        validation
      };
    }
  }
}

module.exports = new AiQualityPipelineService();
