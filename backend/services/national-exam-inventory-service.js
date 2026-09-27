// backend/services/national-exam-inventory-service.js
// National Exam Inventory Service for Phase 10.1:
// Enforces: CATEGORY != EXAM
// Categorizes exams into ecosystems and returns individual verified examinations
// with stage breakdowns, authority details, and state-aware scope.

const { getDb } = require('../db/database');

class NationalExamInventoryService {
  constructor() {
    this.CATEGORIES = [
      'SSC',
      'RAILWAY',
      'BANKING',
      'UPSC',
      'DEFENCE',
      'POLICE',
      'TEACHING',
      'ENGINEERING',
      'MEDICAL',
      'LAW',
      'STATE_PSC',
      'STATE_RECRUITMENT',
      'STATE_ENTRANCE',
      'SCHOOL_BOARDS'
    ];
  }

  /**
   * Normalizes category name input (handles plurals and aliases)
   */
  normalizeCategory(cat) {
    if (!cat) return '';
    const upper = String(cat).trim().toUpperCase();
    if (upper === 'RAILWAYS') return 'RAILWAY';
    if (upper === 'BANKS') return 'BANKING';
    if (upper === 'BOARDS' || upper === 'SCHOOL_BOARD') return 'SCHOOL_BOARDS';
    if (upper === 'PSC') return 'STATE_PSC';
    return upper;
  }

  /**
   * Retrieves all verified examinations within a category ecosystem
   */
  getExamsByCategory(category, db = getDb()) {
    if (!db || !category) return [];
    const catNorm = this.normalizeCategory(category);

    const exams = db.prepare(`
      SELECT * FROM nationwide_exam_inventory
      WHERE category = ? AND is_active = 1
      ORDER BY exam_name_en ASC
    `).all(catNorm);

    return exams.map(e => this.formatExamItem(e, db));
  }

  /**
   * Retrieves examinations for a specific state/UT, distinguishing state-specific vs national
   */
  getExamsByState(stateId, db = getDb()) {
    if (!db || !stateId) return { stateExams: [], nationalExams: [] };

    // Resolve state ID
    const cleanId = stateId.startsWith('in-') ? stateId : `in-${stateId.toLowerCase()}`;
    const state = db.prepare('SELECT state_id FROM states WHERE state_id = ? OR official_code = ?').get(cleanId, stateId.toUpperCase())
      || db.prepare('SELECT state_id FROM states WHERE LOWER(name_en) = LOWER(?) OR LOWER(REPLACE(name_en, " ", "-")) = LOWER(?)').get(stateId, stateId);

    const resolvedStateId = state ? state.state_id : cleanId;

    const stateExams = db.prepare(`
      SELECT * FROM nationwide_exam_inventory
      WHERE state_id = ? AND is_active = 1
      ORDER BY category ASC, exam_name_en ASC
    `).all(resolvedStateId);

    const nationalExams = db.prepare(`
      SELECT * FROM nationwide_exam_inventory
      WHERE exam_scope = 'NATIONAL' AND is_active = 1
      ORDER BY category ASC, exam_name_en ASC
    `).all();

    return {
      stateId: resolvedStateId,
      stateExams: stateExams.map(e => this.formatExamItem(e, db)),
      nationalExams: nationalExams.map(e => this.formatExamItem(e, db))
    };
  }

  /**
   * Retrieves a single exam inventory record by exam_id
   */
  getExamById(examId, db = getDb()) {
    if (!db || !examId) return null;
    const row = db.prepare(`
      SELECT * FROM nationwide_exam_inventory
      WHERE exam_id = ?
    `).get(examId);

    if (!row) return null;
    return this.formatExamItem(row, db);
  }

  /**
   * Retrieves all multi-stage steps for an exam
   */
  getExamStages(examId, db = getDb()) {
    if (!db || !examId) return [];
    return db.prepare(`
      SELECT * FROM exam_stages
      WHERE exam_id = ? AND is_active = 1
      ORDER BY stage_order ASC
    `).all(examId);
  }

  /**
   * Builds category hierarchy demonstrating CATEGORY != EXAM
   */
  getCategoryHierarchy(db = getDb()) {
    if (!db) return [];

    const result = [];
    for (const cat of this.CATEGORIES) {
      const exams = this.getExamsByCategory(cat, db);
      result.push({
        category: cat,
        examCount: exams.length,
        exams: exams.map(e => ({
          examId: e.examId,
          exam_id: e.examId,
          nameEn: e.examNameEn,
          exam_name_en: e.examNameEn,
          nameHi: e.examNameHi,
          authority: e.authorityName,
          scope: e.examScope,
          stageCount: e.currentStageCount,
          readiness: e.readinessState
        }))
      });
    }
    return result;
  }

  /**
   * Formats a database inventory row into user-facing presentation object
   */
  formatExamItem(row, db = getDb()) {
    const rawStages = this.getExamStages(row.exam_id, db);
    const stages = rawStages.map(s => ({
      stageMappingId: s.stage_mapping_id,
      stageOrder: s.stage_order,
      stageCode: s.stage_code,
      stage_code: s.stage_code,
      stageName: s.stage_name,
      stageType: s.stage_type,
      totalMarks: s.total_marks,
      durationMinutes: s.duration_minutes,
      evaluationType: s.qualifying_or_merit,
      isQualifying: s.qualifying_or_merit === 'QUALIFYING',
      is_qualifying: s.qualifying_or_merit === 'QUALIFYING' ? 1 : 0
    }));

    return {
      inventoryId: row.inventory_id,
      examId: row.exam_id,
      exam_id: row.exam_id,
      category: row.category,
      subCategory: row.sub_category,
      examNameEn: row.exam_name_en,
      exam_name_en: row.exam_name_en,
      examNameHi: row.exam_name_hi,
      authorityName: row.authority_name,
      authorityCode: row.authority_code,
      stateId: row.state_id,
      state_id: row.state_id,
      examScope: row.exam_scope,
      officialWebsiteUrl: row.official_website_url,
      currentStageCount: row.current_stage_count,
      blueprintStatus: row.blueprint_status,
      syllabusStatus: row.syllabus_status,
      eligibilityStatus: row.eligibility_status,
      registrationStatus: row.registration_status,
      languageSupport: JSON.parse(row.language_support_json || '["en", "hi"]'),
      readinessState: row.readiness_state,
      sourceVerificationStatus: row.source_verification_status,
      stages: stages,
      exam_stages: stages
    };
  }
}

module.exports = new NationalExamInventoryService();
