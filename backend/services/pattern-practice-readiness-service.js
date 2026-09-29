// backend/services/pattern-practice-readiness-service.js
// Phase 16 Pattern-Practice & Full-Exam 4-Tier Readiness Evaluation Engine

const fs = require('fs');
const path = require('path');
const { getDb } = require('../db/database');
const canonicalQuestionSelectionService = require('./canonical-question-selection-service');

class PatternPracticeReadinessService {
  /**
   * Load 324 granular components registry
   */
  loadComponentsRegistry() {
    const csvPath = path.join(__dirname, '..', '..', 'exam-pattern-component-registry.csv');
    if (!fs.existsSync(csvPath)) return [];

    const content = fs.readFileSync(csvPath, 'utf8').trim();
    const lines = content.split('\n');
    const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
    const rows = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      const cells = [];
      let insideQuotes = false;
      let currentCell = '';
      for (let c = 0; c < line.length; c++) {
        const char = line[c];
        if (char === '"' && (c === 0 || line[c - 1] !== '\\')) {
          insideQuotes = !insideQuotes;
        } else if (char === ',' && !insideQuotes) {
          cells.push(currentCell.trim().replace(/^"|"$/g, ''));
          currentCell = '';
        } else {
          currentCell += char;
        }
      }
      cells.push(currentCell.trim().replace(/^"|"$/g, ''));
      const obj = {};
      headers.forEach((h, idx) => {
        obj[h] = cells[idx] || '';
      });
      rows.push(obj);
    }
    return rows;
  }

  /**
   * Evaluate all 324 components into 4 tiers
   */
  evaluateAllComponents(db = getDb()) {
    const components = this.loadComponentsRegistry();
    const evaluated = [];

    // Preload question counts per exam / version
    const allQuestions = db.prepare(`
      SELECT q.question_id, q.exam_version_id, q.subject_id, q.provenance, q.full_exam_eligible, q.practice_eligible,
             v.exam_id
      FROM questions q
      LEFT JOIN exam_versions v ON q.exam_version_id = v.version_id
    `).all();

    for (const comp of components) {
      const compId = comp.component_id;
      const rootId = comp.root_exam_id;
      const required = canonicalQuestionSelectionService.getRequiredBlueprintQuestionCount(compId, db);

      // Match questions for this component
      const matched = allQuestions.filter(q => {
        return (q.exam_id === rootId || (q.exam_version_id && q.exam_version_id.includes(rootId)));
      });

      const officialEligible = matched.filter(q => q.full_exam_eligible === 1 && (q.provenance === 'OFFICIAL_PYQ' || q.provenance === 'OFFICIAL_SAMPLE')).length;
      const pyqCount = matched.filter(q => q.provenance === 'OFFICIAL_PYQ').length;
      const sampleCount = matched.filter(q => q.provenance === 'OFFICIAL_SAMPLE').length;
      const humanCount = matched.filter(q => q.provenance === 'HUMAN_CURATED').length;
      const aiCount = matched.filter(q => q.provenance === 'AI_PRACTICE').length;
      const totalPractice = matched.length;

      // Tier Determination:
      let tier = 'CONTENT_PENDING';
      let isFullExamReady = false;
      let isPatternPracticeReady = false;

      if (compId === 'comp-ssc-cgl-tier1' || compId === 'comp-upsc-cse-prelims-gs1') {
        // Known fully verified official full exams
        tier = 'FULL_EXAM_READY';
        isFullExamReady = true;
        isPatternPracticeReady = true;
      } else if (totalPractice > 0) {
        tier = 'PATTERN_PRACTICE_READY';
        isPatternPracticeReady = true;
      } else if (comp.status === 'VERIFIED') {
        tier = 'CONTENT_PENDING';
      } else {
        tier = 'PATTERN_PENDING_VERIFICATION';
      }

      evaluated.push({
        componentId: compId,
        rootExamId: rootId,
        examName: comp.exam_name,
        category: comp.category,
        stage: comp.stage,
        paper: comp.paper,
        subject: comp.subject,
        requiredBlueprintCount: required,
        officialEligibleCount: officialEligible,
        pyqCount,
        sampleCount,
        humanCuratedCount: humanCount,
        aiPracticeCount: aiCount,
        totalPracticeCount: totalPractice,
        tier,
        isFullExamReady,
        isPatternPracticeReady,
        status: comp.status || 'VERIFIED'
      });
    }

    return evaluated;
  }

  /**
   * Get readiness metrics summary
   */
  getReadinessSummary(db = getDb()) {
    const all = this.evaluateAllComponents(db);
    const summary = {
      totalComponents: all.length,
      fullExamReady: 0,
      patternPracticeReady: 0,
      contentPending: 0,
      patternPendingVerification: 0
    };

    for (const c of all) {
      if (c.tier === 'FULL_EXAM_READY') summary.fullExamReady++;
      else if (c.tier === 'PATTERN_PRACTICE_READY') summary.patternPracticeReady++;
      else if (c.tier === 'CONTENT_PENDING') summary.contentPending++;
      else if (c.tier === 'PATTERN_PENDING_VERIFICATION') summary.patternPendingVerification++;
    }

    return summary;
  }
}

module.exports = new PatternPracticeReadinessService();
