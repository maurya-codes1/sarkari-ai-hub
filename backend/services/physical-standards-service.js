// backend/services/physical-standards-service.js
// Phase 15 Recruitment Physical Standards & PET Validation Engine

const { getDb } = require('../db/database');

class PhysicalStandardsService {
  /**
   * Get all physical standards with optional filters
   */
  getStandards(filters = {}, db = getDb()) {
    let sql = 'SELECT * FROM recruitment_physical_standards WHERE 1=1';
    const params = [];

    if (filters.examId) {
      sql += ' AND exam_id = ?';
      params.push(filters.examId);
    }
    if (filters.gender) {
      sql += ' AND gender = ?';
      params.push(filters.gender);
    }
    if (filters.category) {
      sql += ' AND category LIKE ?';
      params.push(`%${filters.category}%`);
    }

    sql += ' ORDER BY exam_id ASC, gender ASC, category ASC';
    return db.prepare(sql).all(...params);
  }

  /**
   * Get standards by exam_id
   */
  getStandardsByExam(examId, db = getDb()) {
    return db.prepare('SELECT * FROM recruitment_physical_standards WHERE exam_id = ?').all(examId);
  }

  /**
   * Evaluate candidate physical measurements against official standards
   */
  checkEligibility(examId, candidateProfile = {}, db = getDb()) {
    const {
      gender = 'MALE',
      category = 'UR',
      heightCm,
      chestUnexpandedCm,
      chestExpandedCm
    } = candidateProfile;

    // Fetch matching standard by category pattern or fallback to default for gender
    let standard = db.prepare(`
      SELECT * FROM recruitment_physical_standards
      WHERE exam_id = ? AND gender = ? AND (
        category = ? OR category LIKE ? OR category LIKE '%GEN%' OR category LIKE '%UR%'
      )
    `).get(examId, gender, category, `%${category}%`);

    if (!standard) {
      standard = db.prepare(`
        SELECT * FROM recruitment_physical_standards
        WHERE exam_id = ? AND gender = ?
        LIMIT 1
      `).get(examId, gender);
    }

    if (!standard) {
      return {
        examId,
        hasPhysicalStandards: false,
        message: 'No physical measurement standards specified for this exam.'
      };
    }

    const reasons = [];
    let isHeightEligible = true;
    let isChestEligible = true;

    if (heightCm !== undefined && standard.min_height_cm) {
      if (heightCm < standard.min_height_cm) {
        isHeightEligible = false;
        reasons.push(`Height (${heightCm}cm) is below required minimum (${standard.min_height_cm}cm).`);
      }
    }

    if (gender === 'MALE' && standard.min_chest_unexpanded_cm) {
      if (chestUnexpandedCm !== undefined && chestUnexpandedCm < standard.min_chest_unexpanded_cm) {
        isChestEligible = false;
        reasons.push(`Unexpanded chest (${chestUnexpandedCm}cm) is below required minimum (${standard.min_chest_unexpanded_cm}cm).`);
      }
      if (chestExpandedCm !== undefined && standard.min_chest_expanded_cm && chestExpandedCm < standard.min_chest_expanded_cm) {
        isChestEligible = false;
        reasons.push(`Expanded chest (${chestExpandedCm}cm) is below required minimum (${standard.min_chest_expanded_cm}cm).`);
      }
    }

    const isEligible = isHeightEligible && isChestEligible;

    return {
      examId,
      hasPhysicalStandards: true,
      standard,
      candidateProfile,
      isHeightEligible,
      isChestEligible,
      isEligible,
      reasons,
      petParameters: {
        raceDistanceMeters: standard.endurance_running_distance_m,
        raceTimeSeconds: standard.endurance_running_time_sec,
        longJumpMeters: standard.long_jump_m,
        highJumpMeters: standard.high_jump_m
      },
      officialSourceRef: standard.official_source_ref
    };
  }

  /**
   * Add or update standard
   */
  upsertStandard(data, db = getDb()) {
    const {
      standardId,
      examId,
      postNameEn,
      gender,
      category,
      minHeightCm,
      minChestUnexpandedCm,
      minChestExpandedCm,
      enduranceRunningDistanceM,
      enduranceRunningTimeSec,
      longJumpM,
      highJumpM,
      officialSourceRef
    } = data;

    const id = standardId || `pst_${examId}_${gender.toLowerCase()}_${category.toLowerCase()}`;

    db.prepare(`
      INSERT INTO recruitment_physical_standards (
        standard_id, exam_id, post_name_en, gender, category,
        min_height_cm, min_chest_unexpanded_cm, min_chest_expanded_cm,
        endurance_running_distance_m, endurance_running_time_sec,
        long_jump_m, high_jump_m, official_source_ref, verification_status, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'VERIFIED', CURRENT_TIMESTAMP)
      ON CONFLICT(standard_id) DO UPDATE SET
        min_height_cm = excluded.min_height_cm,
        min_chest_unexpanded_cm = excluded.min_chest_unexpanded_cm,
        min_chest_expanded_cm = excluded.min_chest_expanded_cm,
        endurance_running_distance_m = excluded.endurance_running_distance_m,
        endurance_running_time_sec = excluded.endurance_running_time_sec,
        long_jump_m = excluded.long_jump_m,
        high_jump_m = excluded.high_jump_m
    `).run(
      id,
      examId,
      postNameEn || 'Constable',
      gender,
      category,
      minHeightCm || null,
      minChestUnexpandedCm || null,
      minChestExpandedCm || null,
      enduranceRunningDistanceM || null,
      enduranceRunningTimeSec || null,
      longJumpM || null,
      highJumpM || null,
      officialSourceRef || null
    );

    return db.prepare('SELECT * FROM recruitment_physical_standards WHERE standard_id = ?').get(id);
  }
}

module.exports = new PhysicalStandardsService();
