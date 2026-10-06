// backend/routes/phase13-routes.js
// Phase 13: Nationwide Exam Inventory, State/UT Boards, Academic Hierarchy, Registration & Search REST APIs

const express = require('express');
const router = express.Router();

const stateMasterService = require('../services/state-master-service');
const schoolBoardAcademicService = require('../services/school-board-academic-service');
const nationalExamInventoryService = require('../services/national-exam-inventory-service');
const registrationEligibilityService = require('../services/registration-eligibility-service');
const stateAwareExperienceService = require('../services/state-aware-experience-service');
const globalSearchService = require('../services/global-search-service');
const candidateProfileService = require('../services/candidate-profile-service');
const adaptiveSelectionService = require('../services/adaptive-selection-service');
const weaknessDetectionService = require('../services/weakness-detection-service');
const mockIntelligenceService = require('../services/mock-intelligence-service');
const boardMediumGovernanceService = require('../services/board-medium-governance-service');
const { getDb } = require('../db/database');

// -------------------------------------------------------------
// 1. STATE & UT MASTER AUTHORITIES
// -------------------------------------------------------------
router.get('/states', (req, res) => {
  try {
    const states = stateMasterService.getAllStates(req.query);
    res.json({ success: true, count: states.length, states });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/states/:id', (req, res) => {
  try {
    const state = stateMasterService.getStateById(req.params.id);
    if (!state) {
      return res.status(404).json({ success: true, data: [], status: 'NO_DATA_AVAILABLE', message: 'State/UT not found' });
    }
    const authorities = stateMasterService.getStateAuthorities(req.params.id);
    res.json({ success: true, state, authorities });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/states/:id/boards', (req, res) => {
  try {
    const boards = schoolBoardAcademicService.getBoardsByState(req.params.id);
    res.json({ success: true, count: boards.length, boards });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/state-context/:stateId', (req, res) => {
  try {
    const context = stateAwareExperienceService.getStateContext(req.params.stateId);
    if (!context) {
      return res.status(404).json({ success: true, data: [], status: 'NO_DATA_AVAILABLE', message: 'State context not found' });
    }
    res.json({ success: true, context });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// -------------------------------------------------------------
// 2. SCHOOL BOARDS & ACADEMIC HIERARCHY (CLASSES 9-12)
// -------------------------------------------------------------
router.get('/boards', (req, res) => {
  try {
    const db = getDb();
    const boards = db ? db.prepare('SELECT * FROM boards ORDER BY name ASC').all() : [];
    res.json({ success: true, count: boards.length, boards });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/boards/:id', (req, res) => {
  try {
    const profile = schoolBoardAcademicService.getBoardProfile(req.params.id);
    if (!profile) {
      return res.status(404).json({ success: true, data: [], status: 'NO_DATA_AVAILABLE', message: 'Board not found' });
    }
    res.json({ success: true, profile });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/boards/:id/classes', (req, res) => {
  try {
    const profile = schoolBoardAcademicService.getBoardProfile(req.params.id);
    if (!profile) {
      return res.status(404).json({ success: true, data: [], status: 'NO_DATA_AVAILABLE', message: 'Board not found' });
    }
    res.json({ success: true, count: profile.offerings.length, classes: profile.offerings });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/boards/medium-registry', (req, res) => {
  try {
    const registry = boardMediumGovernanceService.getAllBoardsMediumRegistry();
    res.json({ success: true, count: Object.keys(registry).length, registry });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/boards/:id/medium-capabilities', (req, res) => {
  try {
    const { id } = req.params;
    const { subjectId, subjectName } = req.query;
    const capabilities = boardMediumGovernanceService.getSubjectMediumCapabilities(id, subjectId, subjectName);
    res.json({ success: true, capabilities });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/classes/:id/subjects', (req, res) => {
  try {
    const db = getDb();
    const subjects = db ? db.prepare(`
      SELECT s.* 
      FROM subjects s
      JOIN syllabi syl ON s.subject_id = syl.subject_id
      LIMIT 50
    `).all() : [];
    res.json({ success: true, count: subjects.length, subjects });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/academic/dependencies', (req, res) => {
  try {
    const db = getDb();
    const { boardId } = req.query;
    let query = `
      SELECT d.*, b.name as board_name, c1.display_name as from_class, c2.display_name as to_class
      FROM academic_dependencies d
      JOIN boards b ON d.board_id = b.board_id
      JOIN classes c1 ON d.from_class_id = c1.class_id
      JOIN classes c2 ON d.to_class_id = c2.class_id
      WHERE 1=1
    `;
    const params = [];
    if (boardId) {
      query += ' AND d.board_id = ?';
      params.push(boardId);
    }
    const dependencies = db ? db.prepare(query).all(...params) : [];
    res.json({ success: true, count: dependencies.length, dependencies });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// -------------------------------------------------------------
// 3. NATIONAL EXAM INVENTORY & ECOSYSTEMS
// -------------------------------------------------------------
router.get('/exams', (req, res) => {
  try {
    const { category, stateId } = req.query;
    if (category) {
      const exams = nationalExamInventoryService.getExamsByCategory(category);
      return res.json({ success: true, count: exams.length, category, exams });
    }
    if (stateId) {
      const exams = nationalExamInventoryService.getExamsByState(stateId);
      return res.json({ success: true, exams });
    }
    const db = getDb();
    const allExams = db ? db.prepare('SELECT * FROM nationwide_exam_inventory WHERE is_active = 1 ORDER BY category ASC, exam_name_en ASC').all() : [];
    res.json({ success: true, count: allExams.length, exams: allExams });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/exams/:id', (req, res) => {
  try {
    const exam = nationalExamInventoryService.getExamById(req.params.id);
    if (!exam) {
      return res.status(404).json({ success: true, data: [], status: 'NO_DATA_AVAILABLE', message: 'Exam not found' });
    }
    res.json({ success: true, exam });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/exams/:id/stages', (req, res) => {
  try {
    const exam = nationalExamInventoryService.getExamById(req.params.id);
    if (!exam) {
      return res.status(404).json({ success: true, data: [], status: 'NO_DATA_AVAILABLE', message: 'Exam not found' });
    }
    res.json({ success: true, count: exam.stages.length, stages: exam.stages });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/exams/:id/registration', (req, res) => {
  try {
    const registration = registrationEligibilityService.getRegistrationSchedule(req.params.id);
    if (!registration) {
      return res.json({ success: true, data: [], status: 'NO_DATA_AVAILABLE', message: 'No active registration schedule verified' });
    }
    res.json({ success: true, registration });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/exams/:id/eligibility', (req, res) => {
  try {
    const eligibility = registrationEligibilityService.getEligibilityCriteria(req.params.id);
    if (!eligibility) {
      return res.json({ success: true, data: [], status: 'NO_DATA_AVAILABLE', message: 'No eligibility criteria verified' });
    }
    res.json({ success: true, eligibility });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// -------------------------------------------------------------
// 4. UNIVERSAL CONTEXT-AWARE SEARCH & DISCOVERY
// -------------------------------------------------------------
router.get('/search', (req, res) => {
  try {
    const { q, lang, stateId, boardId } = req.query;
    const searchResult = globalSearchService.search(q, { language: lang, stateId, boardId });
    res.json({ success: true, searchResult });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// -------------------------------------------------------------
// 5. INVENTORY SUMMARY & TELEMETRY
// -------------------------------------------------------------
router.get('/inventory/summary', (req, res) => {
  try {
    const db = getDb();
    const statesCount = db ? db.prepare('SELECT count(*) as c FROM states').get().c : 0;
    const boardsCount = db ? db.prepare('SELECT count(*) as c FROM boards').get().c : 0;
    const examsCount = db ? db.prepare('SELECT count(*) as c FROM nationwide_exam_inventory WHERE is_active = 1').get().c : 0;
    const rootExamsCount = db ? db.prepare('SELECT count(*) as c FROM exams').get().c : 0;
    const questionsCount = db ? db.prepare('SELECT count(*) as c FROM questions').get().c : 0;
    
    res.json({
      success: true,
      summary: {
        statesAndUts: statesCount,
        schoolBoards: boardsCount,
        activeExaminations: examsCount,
        rootExams: rootExamsCount,
        totalQuestions: questionsCount,
        readyComponents: 2,
        partiallyReadyComponents: 15,
        blockedComponents: 307
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// -------------------------------------------------------------
// 6. CANDIDATE PREPARATION PROFILE & HONEST ANALYTICS
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
// 7. ADAPTIVE QUESTION SELECTION & PRACTICE
// -------------------------------------------------------------
router.post('/adaptive/select', (req, res) => {
  try {
    const { userId, examId, practiceMode, questionCount, subjectId, targetLanguage, stage, classGrade, preferredMedium, medium } = req.body;
    if (!userId || !examId) {
      return res.status(400).json({ success: false, error: 'userId and examId are required' });
    }
    const selection = adaptiveSelectionService.selectQuestions({
      userId,
      examId,
      practiceMode,
      questionCount,
      subjectId,
      targetLanguage,
      stage: stage || classGrade,
      preferredMedium: preferredMedium || medium || targetLanguage
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
// 8. MOCK PERFORMANCE INTELLIGENCE
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
// 9. PERFORMANCE & LATENCY BENCHMARK
// -------------------------------------------------------------
router.get('/performance/benchmark', (req, res) => {
  try {
    const db = getDb();
    const benchmarks = [];

    // Benchmark 1: State lookup
    const start1 = process.hrtime.bigint();
    for (let i = 0; i < 50; i++) {
      db.prepare('SELECT * FROM states WHERE official_code = ?').get('PB');
    }
    const duration1 = Number(process.hrtime.bigint() - start1) / 1e6 / 50;
    benchmarks.push({ query: 'states by official_code', latencyMs: Math.round(duration1 * 1000) / 1000, slaTargetMs: 15 });

    // Benchmark 2: Board lookup
    const start2 = process.hrtime.bigint();
    for (let i = 0; i < 50; i++) {
      db.prepare('SELECT * FROM boards WHERE board_id = ?').get('pseb-punjab');
    }
    const duration2 = Number(process.hrtime.bigint() - start2) / 1e6 / 50;
    benchmarks.push({ query: 'boards by board_id', latencyMs: Math.round(duration2 * 1000) / 1000, slaTargetMs: 15 });

    // Benchmark 3: Exam lookup
    const start3 = process.hrtime.bigint();
    for (let i = 0; i < 50; i++) {
      db.prepare('SELECT * FROM nationwide_exam_inventory WHERE category = ?').all('SSC');
    }
    const duration3 = Number(process.hrtime.bigint() - start3) / 1e6 / 50;
    benchmarks.push({ query: 'nationwide_exam_inventory by category', latencyMs: Math.round(duration3 * 1000) / 1000, slaTargetMs: 15 });

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
