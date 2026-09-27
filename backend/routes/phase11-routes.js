// backend/routes/phase11-routes.js
// Phase 11 Production Intelligence REST APIs

const express = require('express');
const router = express.Router();

const sourceMonitorService = require('../services/source-monitor-service');
const changeDetectionService = require('../services/change-detection-service');
const corrigendumService = require('../services/corrigendum-service');
const examCalendarService = require('../services/exam-calendar-service');
const notificationEngineService = require('../services/notification-engine-service');
const userPreparationService = require('../services/user-preparation-service');
const aiQualityPipelineService = require('../services/ai-quality-pipeline-service');
const adminOperationsService = require('../services/admin-operations-service');
const searchIntelligenceService = require('../services/search-intelligence-service');

// -------------------------------------------------------------
// 1. SOURCE MONITORING & HEALTH
// -------------------------------------------------------------
router.get('/sources/health', (req, res) => {
  try {
    const summary = sourceMonitorService.getSourceHealthSummary();
    const monitors = sourceMonitorService.getAllMonitors(req.query);
    res.json({ success: true, summary, monitors });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/sources/check', (req, res) => {
  try {
    const { sourceId, options } = req.body || {};
    if (sourceId) {
      const result = sourceMonitorService.checkSource(sourceId, options || {});
      return res.json({ success: true, result });
    }
    const results = sourceMonitorService.runBatchMonitoringCheck();
    res.json({ success: true, checkedCount: results.length, results });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// -------------------------------------------------------------
// 2. CHANGE DETECTION & IMPACT
// -------------------------------------------------------------
router.get('/sources/changes', (req, res) => {
  try {
    const changes = changeDetectionService.getChangeEvents(req.query);
    res.json({ success: true, count: changes.length, changes });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/sources/changes/detect', (req, res) => {
  try {
    const result = changeDetectionService.detectAndProcessChange(req.body);
    res.json({ success: true, result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/sources/changes/:eventId/impact', (req, res) => {
  try {
    const impact = changeDetectionService.getImpactAnalysis(req.params.eventId);
    if (!impact) return res.status(404).json({ success: false, error: 'Change event not found' });
    res.json({ success: true, impact });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// -------------------------------------------------------------
// 3. STATUTORY CORRIGENDA
// -------------------------------------------------------------
router.get('/sources/corrigenda', (req, res) => {
  try {
    const corrigenda = corrigendumService.getAllCorrigenda(req.query);
    res.json({ success: true, count: corrigenda.length, corrigenda });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/sources/corrigenda', (req, res) => {
  try {
    const result = corrigendumService.registerCorrigendum(req.body);
    res.json({ success: true, result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// -------------------------------------------------------------
// 4. UNIFIED EXAM CALENDAR
// -------------------------------------------------------------
router.get('/calendar/events', (req, res) => {
  try {
    const events = examCalendarService.getCalendarEvents(req.query);
    res.json({ success: true, count: events.length, events });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/calendar/deadlines', (req, res) => {
  try {
    const { refDate = '2026-07-01', days = '30' } = req.query;
    const deadlines = examCalendarService.getUpcomingDeadlines(refDate, parseInt(days, 10));
    res.json({ success: true, count: deadlines.length, deadlines });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/calendar/events', (req, res) => {
  try {
    const result = examCalendarService.addCalendarEvent(req.body);
    res.json({ success: true, result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// -------------------------------------------------------------
// 5. USER SAVED ITEMS & APPLICATION TRACKER
// -------------------------------------------------------------
router.get('/user/saved-items', (req, res) => {
  try {
    const userId = req.query.userId || req.headers['x-user-id'] || 'demo-user-1';
    const items = userPreparationService.getSavedItems(userId);
    res.json({ success: true, items });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/user/saved-items', (req, res) => {
  try {
    const userId = req.body.userId || req.headers['x-user-id'] || 'demo-user-1';
    const { itemType, itemId } = req.body;
    const result = userPreparationService.saveItem(userId, itemType, itemId);
    res.json({ success: true, result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.delete('/user/saved-items', (req, res) => {
  try {
    const userId = req.body.userId || req.headers['x-user-id'] || 'demo-user-1';
    const { itemType, itemId } = req.body;
    const result = userPreparationService.unsaveItem(userId, itemType, itemId);
    res.json({ success: true, result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/user/applications', (req, res) => {
  try {
    const userId = req.query.userId || req.headers['x-user-id'] || 'demo-user-1';
    const applications = userPreparationService.getUserApplications(userId);
    res.json({ success: true, count: applications.length, applications });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/user/applications', (req, res) => {
  try {
    const userId = req.body.userId || req.headers['x-user-id'] || 'demo-user-1';
    const result = userPreparationService.trackApplication(userId, req.body);
    res.json({ success: true, result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.put('/user/applications/:trackerId/status', (req, res) => {
  try {
    const { status } = req.body;
    const result = userPreparationService.updateApplicationStatus(req.params.trackerId, status);
    res.json({ success: true, result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// -------------------------------------------------------------
// 6. PREPARATION PROGRESS, WEAK TOPICS & DASHBOARD
// -------------------------------------------------------------
router.get('/user/dashboard', (req, res) => {
  try {
    const userId = req.query.userId || req.headers['x-user-id'] || 'demo-user-1';
    const examId = req.query.examId || 'ssc-cgl';
    const data = userPreparationService.getDashboardData(userId, examId);
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/user/progress', (req, res) => {
  try {
    const userId = req.body.userId || req.headers['x-user-id'] || 'demo-user-1';
    const result = userPreparationService.recordPracticeActivity(userId, req.body);
    res.json({ success: true, result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/user/weak-topics', (req, res) => {
  try {
    const userId = req.query.userId || req.headers['x-user-id'] || 'demo-user-1';
    const examId = req.query.examId || null;
    const weakTopics = userPreparationService.getWeakTopics(userId, examId);
    res.json({ success: true, count: weakTopics.length, weakTopics });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// -------------------------------------------------------------
// 7. USER NOTIFICATIONS & PREFERENCES
// -------------------------------------------------------------
router.get('/notifications', (req, res) => {
  try {
    const userId = req.query.userId || req.headers['x-user-id'] || 'demo-user-1';
    const result = notificationEngineService.getUserNotifications(userId, req.query);
    res.json({ success: true, ...result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/notifications/dispatch', (req, res) => {
  try {
    const userId = req.body.userId || req.headers['x-user-id'] || 'demo-user-1';
    const result = notificationEngineService.dispatchNotification(userId, req.body);
    res.json({ success: true, result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.put('/notifications/:id/read', (req, res) => {
  try {
    const userId = req.body.userId || req.headers['x-user-id'] || 'demo-user-1';
    const result = notificationEngineService.markAsRead(req.params.id, userId);
    res.json({ success: true, result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.put('/notifications/read-all', (req, res) => {
  try {
    const userId = req.body.userId || req.headers['x-user-id'] || 'demo-user-1';
    const result = notificationEngineService.markAllAsRead(userId);
    res.json({ success: true, result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/notifications/preferences', (req, res) => {
  try {
    const userId = req.query.userId || req.headers['x-user-id'] || 'demo-user-1';
    const preferences = notificationEngineService.getUserPreferences(userId);
    res.json({ success: true, preferences });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.put('/notifications/preferences', (req, res) => {
  try {
    const userId = req.body.userId || req.headers['x-user-id'] || 'demo-user-1';
    const preferences = notificationEngineService.updateUserPreferences(userId, req.body);
    res.json({ success: true, preferences });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// -------------------------------------------------------------
// 8. AI PRACTICE QUESTION QUALITY PIPELINE
// -------------------------------------------------------------
router.post('/ai/validate', (req, res) => {
  try {
    const { question, examId } = req.body;
    const validation = aiQualityPipelineService.validateQuestion(question, examId);
    res.json({ success: true, validation });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/ai/queue', (req, res) => {
  try {
    const result = aiQualityPipelineService.queueGeneration(req.body);
    res.json({ success: true, result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// -------------------------------------------------------------
// 9. UPGRADED SEARCH WITH TRUST TIERS
// -------------------------------------------------------------
router.get('/search/universal', (req, res) => {
  try {
    const { q, lang } = req.query;
    const results = searchIntelligenceService.search(q, { language: lang });
    res.json({ success: true, results });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// -------------------------------------------------------------
// 10. ADMIN OPERATIONS & AUDIT OVERRIDES
// -------------------------------------------------------------
router.get('/admin/operations', (req, res) => {
  try {
    const overview = adminOperationsService.getOperationsOverview();
    res.json({ success: true, overview });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/admin/stale-content', (req, res) => {
  try {
    const days = parseInt(req.query.days || '90', 10);
    const stale = adminOperationsService.detectStaleContent(days);
    res.json({ success: true, stale });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/admin/overrides', (req, res) => {
  try {
    const result = adminOperationsService.recordAdminOverride(req.body);
    res.json({ success: true, result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/admin/overrides', (req, res) => {
  try {
    const overrides = adminOperationsService.getOverrideAuditTrail(req.query.entityId);
    res.json({ success: true, count: overrides.length, overrides });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
