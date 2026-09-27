// backend/services/exam-content-intelligence-service.js
// Exam Content Intelligence & Coverage Gap Analysis Service
// Calculates multi-dimensional coverage across subjects, chapters, topics, years, and languages.
// Detects specific syllabus topic gaps and drives controlled AI practice generation.
// Absolute Invariant: AI Practice questions strictly retain full_exam_eligible = 0.

const { getDb } = require('../db/database');
const aiService = require('./ai-practice-generation-service');
const recurrenceService = require('./recurrence-intelligence-service');

class ExamContentIntelligenceService {
  /**
   * Generates a comprehensive content intelligence report for an exam
   */
  getExamIntelligenceReport(examId, db = getDb()) {
    if (!db) throw new Error('Database unavailable');

    const exam = db.prepare('SELECT exam_id, name, category, short_name FROM exams WHERE exam_id = ?').get(examId);
    if (!exam) throw new Error(`Exam '${examId}' not found.`);

    // 1. Overall Question Counts
    const totals = db.prepare(`
      SELECT 
        COUNT(*) as total_questions,
        SUM(CASE WHEN is_verified = 1 THEN 1 ELSE 0 END) as verified_questions,
        SUM(CASE WHEN current_eligibility = 1 THEN 1 ELSE 0 END) as current_eligible,
        SUM(CASE WHEN full_exam_eligible = 1 THEN 1 ELSE 0 END) as full_exam_eligible,
        SUM(CASE WHEN practice_eligible = 1 THEN 1 ELSE 0 END) as practice_eligible,
        SUM(CASE WHEN question_tier = 'TIER_5_AI_PRACTICE' THEN 1 ELSE 0 END) as ai_practice_questions,
        SUM(CASE WHEN is_rare_relevant = 1 THEN 1 ELSE 0 END) as rare_relevant_questions,
        SUM(CASE WHEN syllabus_status = 'OUTDATED' THEN 1 ELSE 0 END) as outdated_questions
      FROM questions
      WHERE exam_version_id LIKE ? OR paper_id IN (SELECT paper_id FROM question_papers WHERE exam_id = ?)
    `).get(`%${examId}%`, examId);

    // 2. Year-wise Distribution
    const byYear = db.prepare(`
      SELECT 
        COALESCE(historical_year, official_year) as year,
        COUNT(*) as count,
        SUM(CASE WHEN is_verified = 1 THEN 1 ELSE 0 END) as verified
      FROM questions
      WHERE (exam_version_id LIKE ? OR paper_id IN (SELECT paper_id FROM question_papers WHERE exam_id = ?))
        AND COALESCE(historical_year, official_year) IS NOT NULL
      GROUP BY year
      ORDER BY year DESC
    `).all(`%${examId}%`, examId);

    // 3. Subject-wise Distribution
    const bySubject = db.prepare(`
      SELECT 
        s.subject_id, s.name as subject_name,
        COUNT(q.question_id) as total_questions,
        SUM(CASE WHEN q.full_exam_eligible = 1 THEN 1 ELSE 0 END) as full_exam_eligible,
        SUM(CASE WHEN q.question_tier = 'TIER_5_AI_PRACTICE' THEN 1 ELSE 0 END) as ai_practice_count
      FROM subjects s
      LEFT JOIN questions q ON s.subject_id = q.subject_id 
        AND (q.exam_version_id LIKE ? OR q.paper_id IN (SELECT paper_id FROM question_papers WHERE exam_id = ?))
      GROUP BY s.subject_id
      HAVING total_questions > 0
    `).all(`%${examId}%`, examId);

    // 4. Recurrence Tier Breakdown
    const recurrence = recurrenceService.getExamRecurrenceAnalytics(examId, db);

    // 5. Readiness Evaluation
    const bp = db.prepare('SELECT blueprint_id, total_questions FROM exam_blueprints WHERE exam_version_id LIKE ? LIMIT 1').get(`%${examId}%`);
    const reqQuestions = bp ? bp.total_questions : 100;
    const isFullExamReady = (totals.full_exam_eligible || 0) >= reqQuestions;

    let readinessStatus = 'PRACTICE_READY';
    if (isFullExamReady) {
      readinessStatus = 'FULL_EXAM_READY';
    } else if ((totals.total_questions || 0) === 0) {
      readinessStatus = 'SOURCE_DISCOVERY';
    } else {
      readinessStatus = 'FULL_EXAM_BLOCKED';
    }

    return {
      examId,
      examName: exam.name,
      category: exam.category,
      readinessStatus,
      requiredQuestionsForFullExam: reqQuestions,
      totals: {
        totalQuestions: totals.total_questions || 0,
        verifiedQuestions: totals.verified_questions || 0,
        currentEligible: totals.current_eligible || 0,
        fullExamEligible: totals.full_exam_eligible || 0,
        practiceEligible: totals.practice_eligible || 0,
        aiPracticeQuestions: totals.ai_practice_questions || 0,
        rareRelevantQuestions: totals.rare_relevant_questions || 0,
        outdatedQuestions: totals.outdated_questions || 0
      },
      yearsDistribution: byYear,
      subjectsDistribution: bySubject,
      recurrenceAnalytics: recurrence
    };
  }

  /**
   * Analyzes syllabus topics and detects specific coverage gaps
   * Implements Section 53 (e.g. Linear=40, Quadratic=25, Inequalities=20, Word Problems=2 -> gap = Word Problems!)
   */
  detectTopicCoverageGaps(params, db = getDb()) {
    if (!db) throw new Error('Database unavailable');
    const {
      examId,
      subjectId,
      chapterId = null,
      targetThreshold = 10 // Minimum desirable question coverage per topic
    } = params;

    // Query syllabus topics for this subject
    let topicQuery = `
      SELECT t.topic_id, t.name as topic_name, c.chapter_id, c.name as chapter_name
      FROM syllabus_topics t
      JOIN syllabus_chapters c ON t.chapter_id = c.chapter_id
      JOIN syllabi s ON c.syllabus_id = s.syllabus_id
      WHERE s.subject_id = ?
    `;
    const queryParams = [subjectId];
    if (chapterId) {
      topicQuery += ' AND c.chapter_id = ?';
      queryParams.push(chapterId);
    }

    const topics = db.prepare(topicQuery).all(...queryParams);
    const gaps = [];

    for (const t of topics) {
      const qCount = db.prepare(`
        SELECT COUNT(*) as c FROM questions
        WHERE topic_id = ? AND (exam_version_id LIKE ? OR paper_id IN (SELECT paper_id FROM question_papers WHERE exam_id = ?))
      `).get(t.topic_id, `%${examId}%`, examId).c;

      if (qCount < targetThreshold) {
        gaps.push({
          topicId: t.topic_id,
          topicName: t.topic_name,
          chapterId: t.chapter_id,
          chapterName: t.chapter_name,
          currentQuestionsCount: qCount,
          targetQuestionsCount: targetThreshold,
          shortage: targetThreshold - qCount,
          priority: qCount === 0 ? 'CRITICAL' : (qCount < 5 ? 'HIGH' : 'MEDIUM')
        });
      }
    }

    // Sort by largest shortage first
    gaps.sort((a, b) => b.shortage - a.shortage);

    return {
      examId,
      subjectId,
      totalTopicsEvaluated: topics.length,
      gapsIdentifiedCount: gaps.length,
      gaps
    };
  }

  /**
   * Targeted AI Generation for a detected topic gap
   * Generates practice items exclusively for the identified gap topic, validates them,
   * and stores them strictly in Tier 5 with full_exam_eligible = 0.
   */
  generatePracticeForGap(gapParams, db = getDb()) {
    if (!db) throw new Error('Database unavailable');
    const {
      examId,
      subjectId,
      topicId,
      topicName,
      count = 2,
      difficulty = 'MEDIUM',
      languageCode = 'hi'
    } = gapParams;

    const examVersionId = `ver-${examId}-2026`;

    // Queue generation job
    const qItem = aiService.queueGeneration({
      examId,
      examVersionId,
      subjectId,
      concept: `${topicName} Practice Application`,
      targetDifficulty: difficulty,
      languageCode,
      questionType: 'single_mcq',
      countRequested: count
    }, db);

    // Process queue item through 10-point quality gate
    const processResult = aiService.processQueueItem(qItem.queueId, db);

    // Update topicId on generated questions if provided
    if (processResult.savedQuestionIds && processResult.savedQuestionIds.length > 0 && topicId) {
      const updateTopic = db.prepare('UPDATE questions SET topic_id = ? WHERE question_id = ?');
      for (const qid of processResult.savedQuestionIds) {
        updateTopic.run(topicId, qid);
      }
    }

    return {
      success: true,
      examId,
      topicId,
      topicName,
      queueId: qItem.queueId,
      generatedCount: processResult.generated,
      verifiedCount: processResult.verified,
      savedQuestionIds: processResult.savedQuestionIds || [],
      fullExamEligible: 0, // Mandatory Tier 5 isolation
      tier: 'TIER_5_AI_PRACTICE'
    };
  }
}

module.exports = new ExamContentIntelligenceService();
