// backend/db/repositories/blueprint-repository.js
// Modular repository for Exam Blueprints, Sections, and Marking Rules.

const { getDb, checkDbAvailable } = require('../database');

class BlueprintRepository {
  constructor(db = null) {
    this._db = db;
  }

  get db() {
    return this._db || getDb();
  }

  isAvailable() {
    return checkDbAvailable();
  }

  getBlueprints() {
    if (!this.isAvailable()) return null;
    return this.db.prepare('SELECT * FROM exam_blueprints ORDER BY name ASC').all();
  }

  getBlueprintById(blueprintId) {
    if (!this.isAvailable()) return null;
    const bp = this.db.prepare('SELECT * FROM exam_blueprints WHERE blueprint_id = ?').get(blueprintId);
    if (!bp) return null;

    const sections = this.db.prepare(`
      SELECT bs.*, 
             mr.name as marking_rule_name, mr.marks_correct, mr.marks_wrong, 
             mr.has_negative_marking, mr.negative_value, mr.marks_unattempted,
             ar.rule_type as attempt_rule_type, ar.max_to_attempt, ar.min_to_attempt,
             s.name as subject_name
      FROM blueprint_sections bs
      LEFT JOIN marking_rules mr ON bs.marking_rule_id = mr.rule_id
      LEFT JOIN attempt_rules ar ON bs.attempt_rule_id = ar.attempt_rule_id
      LEFT JOIN subjects s ON bs.subject_id = s.subject_id
      WHERE bs.blueprint_id = ?
      ORDER BY bs.section_order ASC
    `).all(blueprintId);

    bp.sections = sections.map(s => {
      let allowedTypes = ['single_mcq'];
      try {
        if (typeof s.allowed_question_types === 'string') {
          allowedTypes = JSON.parse(s.allowed_question_types);
        } else if (Array.isArray(s.allowed_question_types)) {
          allowedTypes = s.allowed_question_types;
        }
      } catch (e) {}

      return {
        ...s,
        allowed_question_types: allowedTypes,
        is_negative_marking: Boolean(s.has_negative_marking),
        negative_value: s.has_negative_marking ? Number(s.negative_value) : 0,
        marks_correct: Number(s.marks_correct || s.marks_per_question || 1),
        marks_wrong: s.has_negative_marking ? Number(s.negative_value || s.marks_wrong || 0) : 0,
        attempt_rule_type: s.attempt_rule_type || 'ATTEMPT_ALL',
        max_to_attempt: s.max_to_attempt || s.questions_to_attempt
      };
    });

    return bp;
  }

  getBlueprintForExam(examId) {
    if (!this.isAvailable()) return null;

    // 1. Look for exam version
    const version = this.db.prepare(`
      SELECT version_id FROM exam_versions WHERE exam_id = ? ORDER BY version_id DESC LIMIT 1
    `).get(examId);

    let bp = null;
    if (version) {
      // Prioritize VERIFIED over NEEDS_REVIEW
      bp = this.db.prepare(`
        SELECT * FROM exam_blueprints 
        WHERE exam_version_id = ? 
        ORDER BY (CASE WHEN verification_status = 'VERIFIED' THEN 1 ELSE 2 END) ASC, total_questions DESC 
        LIMIT 1
      `).get(version.version_id);
    }

    // Fallback: match by blueprint_id substring if not matched by version
    if (!bp) {
      bp = this.db.prepare(`
        SELECT * FROM exam_blueprints 
        WHERE blueprint_id LIKE ? 
        ORDER BY (CASE WHEN verification_status = 'VERIFIED' THEN 1 ELSE 2 END) ASC 
        LIMIT 1
      `).get(`%${examId}%`);
    }

    if (!bp) return null;
    return this.getBlueprintById(bp.blueprint_id);
  }

  getBlueprintsByExamVersion(versionId) {
    if (!this.isAvailable()) return null;
    return this.db.prepare('SELECT * FROM exam_blueprints WHERE exam_version_id = ?').all(versionId);
  }

  getVerifiedBlueprint(examId, versionId = null) {
    if (!this.isAvailable()) return null;
    if (versionId) {
      const bp = this.db.prepare(`
        SELECT * FROM exam_blueprints 
        WHERE exam_version_id = ? 
        ORDER BY (CASE WHEN verification_status = 'VERIFIED' THEN 1 ELSE 2 END) ASC, total_questions DESC 
        LIMIT 1
      `).get(versionId);
      if (bp) return this.getBlueprintById(bp.blueprint_id);
    }
    return this.getBlueprintForExam(examId);
  }
}

module.exports = new BlueprintRepository();
