// backend/routes/phase12-routes.js
// Phase 12: Nationwide Content Expansion & Advanced Preparation Platform REST APIs

const express = require('express');
const router = express.Router();

const preparationPlanService = require('../services/preparation-plan-service');
const spacedRevisionService = require('../services/spaced-revision-service');
const bulkIngestionService = require('../services/bulk-ingestion-service');
const coverageAnalyticsService = require('../services/coverage-analytics-service');
const { getDb } = require('../db/database');

// -------------------------------------------------------------
// 1. PERSONALIZED PREPARATION PLANS & MILESTONES
// -------------------------------------------------------------
router.post('/preparation/plan/generate', (req, res) => {
  try {
    const plan = preparationPlanService.generatePlan(req.body);
    res.json({ success: true, plan });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

router.get('/preparation/plan/:userId/:examId', (req, res) => {
  try {
    const { userId, examId } = req.params;
    const plan = preparationPlanService.getUserPlan(userId, examId);
    if (!plan) {
      return res.status(404).json({ success: false, message: 'No active plan found for this exam' });
    }
    res.json({ success: true, plan });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/preparation/plan/milestone', (req, res) => {
  try {
    const { planId, milestoneId } = req.body;
    if (!planId || !milestoneId) {
      return res.status(400).json({ success: false, error: 'planId and milestoneId are required' });
    }
    const result = preparationPlanService.updateMilestoneProgress(planId, milestoneId);
    res.json({ success: true, result });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

router.get('/preparation/plans/:userId', (req, res) => {
  try {
    const { userId } = req.params;
    const plans = preparationPlanService.listUserPlans(userId);
    res.json({ success: true, count: plans.length, plans });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// -------------------------------------------------------------
// 2. SPACED REPETITION & RETENTION SCHEDULING
// -------------------------------------------------------------
router.post('/revision/attempt', (req, res) => {
  try {
    const result = spacedRevisionService.recordAttempt(req.body);
    res.json({ success: true, result });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

router.get('/revision/due/:userId', (req, res) => {
  try {
    const { userId } = req.params;
    const { examId, limit } = req.query;
    const dueCards = spacedRevisionService.getDueCards(userId, examId, limit ? parseInt(limit, 10) : 20);
    res.json({ success: true, count: dueCards.length, cards: dueCards });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/revision/metrics/:userId', (req, res) => {
  try {
    const { userId } = req.params;
    const { examId } = req.query;
    const metrics = spacedRevisionService.getUserRetentionMetrics(userId, examId);
    res.json({ success: true, metrics });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// -------------------------------------------------------------
// 3. CONTENT INGESTION PIPELINE & REVIEW QUEUE
// -------------------------------------------------------------
router.post('/content/ingest', (req, res) => {
  try {
    const { items, sourceMetadata } = req.body;
    if (!items || !Array.isArray(items)) {
      return res.status(400).json({ success: false, error: 'items array is required' });
    }
    const result = bulkIngestionService.ingestQuestionBatch(items, sourceMetadata || {});
    res.json({ success: true, result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/content/review-queue', (req, res) => {
  try {
    const queue = bulkIngestionService.getReviewQueue(req.query);
    res.json({ success: true, count: queue.length, queue });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/content/review-queue/:itemId/resolve', (req, res) => {
  try {
    const { itemId } = req.params;
    const { action, resolutionNotes, reviewerId } = req.body;
    const result = bulkIngestionService.resolveReviewItem(itemId, action, resolutionNotes, reviewerId);
    res.json({ success: true, result });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

router.post('/content/flag', (req, res) => {
  try {
    const result = bulkIngestionService.flagQuestion(req.body);
    res.json({ success: true, result });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// -------------------------------------------------------------
// 4. NATIONWIDE COVERAGE ANALYTICS & BENCHMARKS
// -------------------------------------------------------------
router.get('/coverage/matrix', (req, res) => {
  try {
    const matrix = coverageAnalyticsService.getExamCoverageMatrix();
    res.json({ success: true, matrix });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/coverage/boards', (req, res) => {
  try {
    const boards = coverageAnalyticsService.getBoardCoverageMatrix();
    res.json({ success: true, boards });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/coverage/subjects', (req, res) => {
  try {
    const subjects = coverageAnalyticsService.getSubjectCoverageMatrix();
    res.json({ success: true, count: subjects.length, subjects });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/coverage/benchmarks', (req, res) => {
  try {
    const report = coverageAnalyticsService.computeAndPersistBenchmarks();
    res.json({ success: true, report });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/coverage/benchmarks/stored', (req, res) => {
  try {
    const benchmarks = coverageAnalyticsService.getStoredBenchmarks();
    res.json({ success: true, count: benchmarks.length, benchmarks });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// -------------------------------------------------------------
// 5. SEARCH & SCALABILITY LATENCY LOGGING
// -------------------------------------------------------------
router.post('/search/benchmark', (req, res) => {
  try {
    const db = getDb();
    const { queryText = 'General Studies', category = 'FULL_TEXT', iterations = 100 } = req.body || {};

    const latencies = [];
    for (let i = 0; i < iterations; i++) {
      const start = process.hrtime.bigint();
      db.prepare(`
        SELECT q.question_id, q.provenance, q.question_tier, sub.name as subject_name
        FROM questions q
        JOIN subjects sub ON q.subject_id = sub.subject_id
        WHERE q.provenance = 'OFFICIAL_PYQ'
        LIMIT 50
      `).all();
      const end = process.hrtime.bigint();
      latencies.push(Number(end - start) / 1e6); // ms
    }

    latencies.sort((a, b) => a - b);
    const p50 = latencies[Math.floor(latencies.length * 0.50)];
    const p95 = latencies[Math.floor(latencies.length * 0.95)];
    const p99 = latencies[Math.floor(latencies.length * 0.99)];

    const logId = `log-${Date.now()}`;
    db.prepare(`
      INSERT INTO search_performance_logs (
        log_id, query_text, query_category, result_count, latency_ms, recorded_at
      ) VALUES (?, ?, ?, 50, ?, CURRENT_TIMESTAMP)
    `).run(logId, queryText, category, Math.round(p50 * 100) / 100);

    res.json({
      success: true,
      logId,
      iterations,
      metrics: {
        p50_ms: Math.round(p50 * 100) / 100,
        p95_ms: Math.round(p95 * 100) / 100,
        p99_ms: Math.round(p99 * 100) / 100,
        sla_p95_target_ms: 15.0,
        passed_sla: p95 <= 15.0
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
