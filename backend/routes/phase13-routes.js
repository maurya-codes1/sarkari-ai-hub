// backend/routes/phase13-routes.js
// Phase 13: Advanced Personalization, Adaptive Preparation & Production Optimization REST APIs
// Privacy-by-design, auditable adaptive selection, weakness detection, honest analytics.

const express = require('express');
const router = express.Router();

const candidateProfileService = require('../services/candidate-profile-service');
const adaptiveSelectionService = require('../services/adaptive-selection-service');
const weaknessDetectionService = require('../services/weakness-detection-service');
const mockIntelligenceService = require('../services/mock-intelligence-service');
const searchIntelligenceService = require('../services/search-intelligence-service');
const { getDb } = require('../db/database');

// -------------------------------------------------------------
// 1. CANDIDATE PREPARATION PROFILE & HONEST ANALYTICS
// -------------------------------------------------------------
router.get('/candidate/profile/:userId/:examId', (req, res) => {
  try {
    const { userId, examId } = req.params;
    const profile = candidateProfileService.getProfile(userId, examId);
    res.json({ success: true, profile });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/candidate/target', (req, res) => {
  try {
    const { userId, examId, targetDate, targetDailyHours } = req.body;
    if (!userId || !examId) {
      return res.status(400).json({ success: false, error: 'userId and examId are required' });
    }
    const result = candidateProfileService.updateTarget(userId, examId, { targetDate, targetDailyHours });
    res.json({ success: true, result });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

router.get('/candidate/analytics/:userId/:examId', (req, res) => {
  try {
    const { userId, examId } = req.params;
    const honestDenominators = candidateProfileService.getHonestDenominators(userId, examId);
    res.json({ success: true, honestDenominators });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/candidate/hierarchical-weakness/:userId/:examId', (req, res) => {
  try {
    const { userId, examId } = req.params;
    const analysis = weaknessDetectionService.getHierarchicalAnalysis(userId, examId);
    res.json({ success: true, analysis });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// -------------------------------------------------------------
// 2. ADAPTIVE QUESTION SELECTION & PRACTICE
// -------------------------------------------------------------
router.post('/adaptive/select', (req, res) => {
  try {
    const { userId, examId, practiceMode, questionCount, subjectId, targetLanguage } = req.body;
    if (!userId || !examId) {
      return res.status(400).json({ success: false, error: 'userId and examId are required' });
    }
    const selection = adaptiveSelectionService.selectQuestions({
      userId,
      examId,
      practiceMode,
      questionCount,
      subjectId,
      targetLanguage
    });
    res.json({ success: true, selection });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

router.post('/adaptive/attempt', (req, res) => {
  try {
    const {
      userId,
      questionId,
      examId,
      subjectId,
      chapterId,
      topicId,
      practiceMode,
      selectedOption,
      isCorrect,
      isSkipped,
      timeSpentSeconds,
      confidenceLevel
    } = req.body;

    if (!userId || !questionId || !examId) {
      return res.status(400).json({ success: false, error: 'userId, questionId, and examId are required' });
    }

    const result = weaknessDetectionService.recordAttempt({
      userId,
      questionId,
      examId,
      subjectId,
      chapterId,
      topicId,
      practiceMode,
      selectedOption,
      isCorrect,
      isSkipped,
      timeSpentSeconds,
      confidenceLevel
    });

    res.json({ success: true, result });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

router.get('/adaptive/weak-topics/:userId/:examId', (req, res) => {
  try {
    const { userId, examId } = req.params;
    const weakTopics = weaknessDetectionService.getActiveWeakTopics(userId, examId);
    res.json({ success: true, count: weakTopics.length, weakTopics });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// -------------------------------------------------------------
// 3. MOCK PERFORMANCE INTELLIGENCE
// -------------------------------------------------------------
router.post('/mock/submit-diagnostic', (req, res) => {
  try {
    const diagnostic = mockIntelligenceService.processMockResult(req.body);
    res.json({ success: true, diagnostic });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

router.get('/mock/history/:userId/:examId', (req, res) => {
  try {
    const { userId, examId } = req.params;
    const history = mockIntelligenceService.getMockHistory(userId, examId);
    res.json({ success: true, history });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// -------------------------------------------------------------
// 4. SPACED REVISION BACKLOG
// -------------------------------------------------------------
router.get('/revision/backlog/:userId/:examId', (req, res) => {
  try {
    const { userId, examId } = req.params;
    const profile = candidateProfileService.getProfile(userId, examId);
    res.json({ success: true, revisionSummary: profile.revisionSummary });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// -------------------------------------------------------------
// 5. UNIVERSAL SEARCH & DISCOVERY
// -------------------------------------------------------------
router.get('/search', (req, res) => {
  try {
    const { q, lang } = req.query;
    const searchResult = searchIntelligenceService.search(q, { language: lang });
    res.json({ success: true, searchResult });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// -------------------------------------------------------------
// 6. PERFORMANCE & LATENCY BENCHMARK
// -------------------------------------------------------------
router.get('/performance/benchmark', (req, res) => {
  try {
    const db = getDb();
    const benchmarks = [];

    // Benchmark 1: Profile retrieval with index
    const start1 = process.hrtime.bigint();
    for (let i = 0; i < 50; i++) {
      db.prepare('SELECT * FROM candidate_preparation_profiles WHERE user_id = ? AND exam_id = ?').get('candidate-demo', 'ssc-cgl');
    }
    const duration1 = Number(process.hrtime.bigint() - start1) / 1e6 / 50;
    benchmarks.push({ query: 'candidate_preparation_profiles by (user_id, exam_id)', latencyMs: Math.round(duration1 * 1000) / 1000, slaTargetMs: 15 });

    // Benchmark 2: Adaptive candidates search
    const start2 = process.hrtime.bigint();
    for (let i = 0; i < 50; i++) {
      db.prepare("SELECT question_id, difficulty FROM questions WHERE provenance = 'OFFICIAL_PYQ' AND full_exam_eligible = 1 LIMIT 20").all();
    }
    const duration2 = Number(process.hrtime.bigint() - start2) / 1e6 / 50;
    benchmarks.push({ query: 'questions by (provenance, full_exam_eligible)', latencyMs: Math.round(duration2 * 1000) / 1000, slaTargetMs: 15 });

    // Benchmark 3: Weakness analysis query
    const start3 = process.hrtime.bigint();
    for (let i = 0; i < 50; i++) {
      db.prepare('SELECT * FROM user_weak_topics WHERE user_id = ? AND exam_id = ?').all('candidate-demo', 'ssc-cgl');
    }
    const duration3 = Number(process.hrtime.bigint() - start3) / 1e6 / 50;
    benchmarks.push({ query: 'user_weak_topics by (user_id, exam_id)', latencyMs: Math.round(duration3 * 1000) / 1000, slaTargetMs: 15 });

    const allPassedSla = benchmarks.every(b => b.latencyMs < b.slaTargetMs);

    res.json({
      success: true,
      allPassedSla,
      benchmarks
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
