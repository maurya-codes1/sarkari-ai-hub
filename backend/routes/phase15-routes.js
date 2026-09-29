// backend/routes/phase15-routes.js
// Phase 15: Official Source Monitoring, Change Detection, Dual-Affiliation, NSQF & Physical Standards REST APIs

const express = require('express');
const router = express.Router();

const sourceMonitoringService = require('../services/source-monitoring-service');
const sourceImpactEngine = require('../services/source-impact-engine');
const boardAffiliationService = require('../services/board-affiliation-service');
const vocationalNsqfService = require('../services/vocational-nsqf-service');
const physicalStandardsService = require('../services/physical-standards-service');

// -------------------------------------------------------------
// 1. OFFICIAL SOURCE MONITORING
// -------------------------------------------------------------
router.get('/sources', (req, res) => {
  try {
    const sources = sourceMonitoringService.getAllSources(req.query);
    res.json({ success: true, count: sources.length, sources });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/sources/summary/health', (req, res) => {
  try {
    const summary = sourceMonitoringService.getMonitoringSummary();
    res.json({ success: true, summary });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/sources/:id', (req, res) => {
  try {
    const source = sourceMonitoringService.getSourceById(req.params.id);
    if (!source) {
      return res.status(404).json({ success: false, message: 'Monitored source not found' });
    }
    res.json({ success: true, source });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/sources/:id/check', (req, res) => {
  try {
    const result = sourceMonitoringService.checkSource(req.params.id, req.body);
    res.json({ success: true, result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// -------------------------------------------------------------
// 2. CHANGE DETECTION & REVIEW QUEUE
// -------------------------------------------------------------
router.get('/source-changes', (req, res) => {
  try {
    const changes = sourceMonitoringService.getSourceChanges(req.query);
    res.json({ success: true, count: changes.length, changes });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/source-changes/review-queue', (req, res) => {
  try {
    const queue = sourceMonitoringService.getReviewQueue(req.query);
    res.json({ success: true, count: queue.length, queue });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/source-changes/review-queue/:id/approve', (req, res) => {
  try {
    const { reviewer, notes } = req.body;
    const result = sourceMonitoringService.approveReview(req.params.id, reviewer, notes);
    res.json({ success: true, result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/source-changes/review-queue/:id/reject', (req, res) => {
  try {
    const { reviewer, notes } = req.body;
    const result = sourceMonitoringService.rejectReview(req.params.id, reviewer, notes);
    res.json({ success: true, result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// -------------------------------------------------------------
// 3. MONITORING JOBS
// -------------------------------------------------------------
router.post('/sources/jobs', (req, res) => {
  try {
    const { sourceId, jobType, scheduledAt } = req.body;
    const job = sourceMonitoringService.enqueueJob(sourceId, jobType, scheduledAt);
    res.status(201).json({ success: true, job });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/sources/jobs/process', (req, res) => {
  try {
    const processed = sourceMonitoringService.processPendingJobs();
    res.json({ success: true, count: processed.length, processed });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// -------------------------------------------------------------
// 4. BOARD AFFILIATIONS & DUAL-AFFILIATION
// -------------------------------------------------------------
router.get('/affiliations', (req, res) => {
  try {
    const affiliations = boardAffiliationService.getAffiliations(req.query);
    res.json({ success: true, count: affiliations.length, affiliations });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/affiliations/dual', (req, res) => {
  try {
    const duals = boardAffiliationService.getDualAffiliatedBoards();
    res.json({ success: true, count: duals.length, dualAffiliations: duals });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/affiliations/state/:stateId', (req, res) => {
  try {
    const affiliation = boardAffiliationService.getAffiliationByState(req.params.stateId);
    if (!affiliation) {
      return res.status(404).json({ success: false, message: 'Board affiliation not found for state' });
    }
    res.json({ success: true, affiliation });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// -------------------------------------------------------------
// 5. VOCATIONAL & NSQF OFFERINGS
// -------------------------------------------------------------
router.get('/vocational/nsqf', (req, res) => {
  try {
    const offerings = vocationalNsqfService.getOfferings(req.query);
    res.json({ success: true, count: offerings.length, offerings });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/vocational/nsqf/:id', (req, res) => {
  try {
    const offering = vocationalNsqfService.getOfferingById(req.params.id);
    if (!offering) {
      return res.status(404).json({ success: false, message: 'NSQF offering not found' });
    }
    res.json({ success: true, offering });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/vocational/nsqf/stage/:stage', (req, res) => {
  try {
    const offerings = vocationalNsqfService.getOfferingsByStage(req.params.stage.toUpperCase());
    res.json({ success: true, count: offerings.length, offerings });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// -------------------------------------------------------------
// 6. RECRUITMENT PHYSICAL STANDARDS & ELIGIBILITY
// -------------------------------------------------------------
router.get('/recruitment/physical-standards', (req, res) => {
  try {
    const standards = physicalStandardsService.getStandards(req.query);
    res.json({ success: true, count: standards.length, standards });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/recruitment/physical-standards/:examId', (req, res) => {
  try {
    const standards = physicalStandardsService.getStandardsByExam(req.params.examId);
    res.json({ success: true, count: standards.length, standards });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/recruitment/physical-standards/:examId/evaluate', (req, res) => {
  try {
    const evaluation = physicalStandardsService.checkEligibility(req.params.examId, req.body);
    res.json({ success: true, evaluation });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// -------------------------------------------------------------
// 7. CONTENT IMPACT GRAPH & STALE TRACKING
// -------------------------------------------------------------
router.get('/impact/graph', (req, res) => {
  try {
    const graph = sourceImpactEngine.getImpactGraph(req.query);
    res.json({ success: true, count: graph.length, impactGraph: graph });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/impact/stale-content', (req, res) => {
  try {
    const stale = sourceImpactEngine.getStaleContent(req.query);
    res.json({ success: true, count: stale.length, staleContent: stale });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/impact/stale-content/:staleId/resolve', (req, res) => {
  try {
    sourceImpactEngine.resolveStaleContent(req.params.staleId);
    res.json({ success: true, message: 'Stale content resolved' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/impact/revalidate/:examId', (req, res) => {
  try {
    const result = sourceImpactEngine.revalidateEntities(req.params.examId);
    res.json({ success: true, result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// -------------------------------------------------------------
// 8. LANGUAGE & SCRIPT REGISTRY
// -------------------------------------------------------------
router.get('/languages/registry', (req, res) => {
  try {
    const scripts = sourceMonitoringService.getLanguageScripts(req.query);
    res.json({ success: true, count: scripts.length, languageScripts: scripts });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
