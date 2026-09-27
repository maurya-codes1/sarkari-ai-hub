// backend/services/nationwide-exam-registry-service.js
// Phase 9: Nationwide Exam Content Expansion, Scalable Ingestion & AI Practice Engine
// Registry and discovery workflow for central, state, defence, police, teaching, entrance, and board exams.

const { getDb } = require('../db/database');
const unifiedExamTruthService = require('./unified-exam-truth-service');
const blueprintRepository = require('../db/repositories/blueprint-repository');

class NationwideExamRegistryService {
  constructor() {
    this.CATEGORIES = {
      CENTRAL_GOV: 'CENTRAL_GOV',
      STATE_GOV: 'STATE_GOV',
      SSC: 'SSC',
      RAILWAY: 'RAILWAY',
      BANKING: 'BANKING',
      DEFENCE: 'DEFENCE',
      POLICE: 'POLICE',
      TEACHING: 'TEACHING',
      CIVIL_SERVICES: 'CIVIL_SERVICES',
      STATE_PSC: 'STATE_PSC',
      ENGINEERING_ENTRANCE: 'ENGINEERING_ENTRANCE',
      MEDICAL_ENTRANCE: 'MEDICAL_ENTRANCE',
      LAW_ENTRANCE: 'LAW_ENTRANCE',
      BOARD_10TH: 'BOARD_10TH',
      BOARD_12TH: 'BOARD_12TH',
      OTHER_COMPETITIVE: 'OTHER_COMPETITIVE'
    };

    this.COVERAGE_STATUSES = {
      VERIFIED_COMPLETE: 'VERIFIED_COMPLETE',
      PARTIAL: 'PARTIAL',
      LIMITED: 'LIMITED',
      PENDING_VERIFICATION: 'PENDING_VERIFICATION',
      INSUFFICIENT_CONTENT: 'INSUFFICIENT_CONTENT',
      NOT_AVAILABLE: 'NOT_AVAILABLE'
    };

    this.DISCOVERY_STATUSES = {
      DISCOVERED: 'DISCOVERED',
      SOURCE_VERIFIED: 'SOURCE_VERIFIED',
      PATTERN_VERIFIED: 'PATTERN_VERIFIED',
      FULLY_INTEGRATED: 'FULLY_INTEGRATED'
    };
  }

  /**
   * Retrieves nationwide exam registry entries with optional filtering
   */
  getAllRegistryEntries(filters = {}, db = getDb()) {
    if (!db) return [];
    const { category, stateCode, coverageStatus, discoveryStatus } = filters;

    let sql = `
      SELECT r.*, e.name as exam_name, e.short_name as exam_code
      FROM nationwide_exam_registry r
      JOIN exams e ON r.exam_id = e.exam_id
      WHERE 1=1
    `;
    const params = [];

    if (category) {
      sql += ' AND r.category = ?';
      params.push(category);
    }
    if (stateCode) {
      sql += ' AND r.state_code = ?';
      params.push(stateCode);
    }
    if (coverageStatus) {
      sql += ' AND r.coverage_status = ?';
      params.push(coverageStatus);
    }
    if (discoveryStatus) {
      sql += ' AND r.discovery_status = ?';
      params.push(discoveryStatus);
    }

    sql += ' ORDER BY r.category ASC, r.exam_id ASC';
    const rows = db.prepare(sql).all(...params);

    return rows.map(r => ({
      ...r,
      historicalYearsCovered: JSON.parse(r.historical_years_covered || '[]'),
      metadata: JSON.parse(r.metadata_json || '{}')
    }));
  }

  /**
   * Retrieves single registry entry with full verification and coverage details
   */
  getRegistryEntry(examId, db = getDb()) {
    if (!db) return null;
    const row = db.prepare(`
      SELECT r.*, e.name as exam_name, e.short_name as exam_code
      FROM nationwide_exam_registry r
      JOIN exams e ON r.exam_id = e.exam_id
      WHERE r.exam_id = ?
    `).get(examId);

    if (!row) return null;

    // Check upstream Unified Exam Truth and Blueprint status
    const bp = blueprintRepository.getBlueprintForExam(examId, null, db);
    const truthDetails = unifiedExamTruthService.getExamDetails(examId, null, db);

    return {
      ...row,
      historicalYearsCovered: JSON.parse(row.historical_years_covered || '[]'),
      metadata: JSON.parse(row.metadata_json || '{}'),
      blueprint: bp ? {
        blueprintId: bp.blueprint_id,
        name: bp.name,
        totalQuestions: bp.total_questions,
        durationMinutes: bp.duration_minutes,
        isNegativeMarking: Boolean(bp.is_negative_marking),
        readinessStatus: bp.readiness_status
      } : null,
      unifiedExamTruth: truthDetails ? {
        isVerified: truthDetails.is_verified || false,
        sourceAuthority: truthDetails.authority || row.official_authority
      } : null
    };
  }

  /**
   * Registers a newly discovered nationwide exam following strict official source verification
   */
  registerDiscoveredExam(data = {}, db = getDb()) {
    if (!db) throw new Error('Database unavailable');
    const {
      examId,
      category,
      subCategory = null,
      stateCode = 'ALL_INDIA',
      officialAuthority,
      officialPortalUrl,
      officialAcronym = null,
      officialGazetteRef = null,
      discoveryStatus = this.DISCOVERY_STATUSES.SOURCE_VERIFIED,
      coverageStatus = this.COVERAGE_STATUSES.INSUFFICIENT_CONTENT,
      historicalYears = [],
      metadata = {}
    } = data;

    if (!examId || !category || !officialAuthority || !officialPortalUrl) {
      throw new Error('Mandatory registration fields missing: examId, category, officialAuthority, officialPortalUrl');
    }

    if (!this.CATEGORIES[category]) {
      throw new Error(`Invalid category: ${category}. Must be one of: ${Object.keys(this.CATEGORIES).join(', ')}`);
    }

    // Verify URL structure
    try {
      new URL(officialPortalUrl);
    } catch (e) {
      throw new Error(`Invalid official portal URL: ${officialPortalUrl}`);
    }

    // Check if exam exists in exams table
    const examRow = db.prepare('SELECT exam_id FROM exams WHERE exam_id = ?').get(examId);
    if (!examRow) {
      throw new Error(`Exam '${examId}' does not exist in master exams table.`);
    }

    const registryId = `reg-${examId}`;
    const stmt = db.prepare(`
      INSERT INTO nationwide_exam_registry (
        registry_id, exam_id, category, sub_category, state_code,
        official_authority, official_portal_url, official_acronym,
        official_gazette_ref, discovery_status, coverage_status,
        historical_years_covered, metadata_json, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      ON CONFLICT(registry_id) DO UPDATE SET
        category = excluded.category,
        sub_category = excluded.sub_category,
        official_authority = excluded.official_authority,
        official_portal_url = excluded.official_portal_url,
        coverage_status = excluded.coverage_status,
        historical_years_covered = excluded.historical_years_covered,
        updated_at = CURRENT_TIMESTAMP
    `);

    stmt.run(
      registryId,
      examId,
      category,
      subCategory,
      stateCode,
      officialAuthority,
      officialPortalUrl,
      officialAcronym,
      officialGazetteRef,
      discoveryStatus,
      coverageStatus,
      JSON.stringify(historicalYears),
      JSON.stringify(metadata)
    );

    return this.getRegistryEntry(examId, db);
  }

  /**
   * Updates honest coverage status and verified historical years
   */
  updateCoverageStatus(examId, coverageStatus, historicalYears = null, db = getDb()) {
    if (!db) return false;
    if (!this.COVERAGE_STATUSES[coverageStatus]) {
      throw new Error(`Invalid coverage status: ${coverageStatus}`);
    }

    if (historicalYears !== null) {
      db.prepare(`
        UPDATE nationwide_exam_registry
        SET coverage_status = ?, historical_years_covered = ?, updated_at = CURRENT_TIMESTAMP
        WHERE exam_id = ?
      `).run(coverageStatus, JSON.stringify(historicalYears), examId);
    } else {
      db.prepare(`
        UPDATE nationwide_exam_registry
        SET coverage_status = ?, updated_at = CURRENT_TIMESTAMP
        WHERE exam_id = ?
      `).run(coverageStatus, examId);
    }

    return true;
  }

  /**
   * Computes category summary metrics for admin dashboard
   */
  getCategorySummary(db = getDb()) {
    if (!db) return {};
    const rows = db.prepare(`
      SELECT 
        category,
        COUNT(*) as total_exams,
        SUM(CASE WHEN coverage_status = 'VERIFIED_COMPLETE' THEN 1 ELSE 0 END) as verified_complete,
        SUM(CASE WHEN coverage_status = 'PARTIAL' THEN 1 ELSE 0 END) as partial,
        SUM(CASE WHEN coverage_status = 'LIMITED' THEN 1 ELSE 0 END) as limited,
        SUM(CASE WHEN coverage_status = 'INSUFFICIENT_CONTENT' THEN 1 ELSE 0 END) as insufficient
      FROM nationwide_exam_registry
      GROUP BY category
      ORDER BY total_exams DESC
    `).all();

    const totalExams = db.prepare("SELECT COUNT(*) as c FROM nationwide_exam_registry").get().c;
    const verifiedExams = db.prepare("SELECT COUNT(*) as c FROM nationwide_exam_registry WHERE coverage_status IN ('VERIFIED_COMPLETE', 'PARTIAL')").get().c;

    return {
      totalExams,
      verifiedExams,
      categories: rows
    };
  }

  /**
   * Validates that an exam has its own specific, independent configuration and NO generic assumptions
   */
  validateNoGenericExamRules(examId, db = getDb()) {
    if (!db) return { isValid: false, reason: 'Database unavailable' };

    const entry = this.getRegistryEntry(examId, db);
    if (!entry) {
      return { isValid: false, reason: 'Exam not registered in nationwide registry' };
    }

    // Verify Blueprint exists and is not a generic fallback
    const bp = blueprintRepository.getBlueprintForExam(examId, null, db);
    if (!bp) {
      return { isValid: false, reason: 'No verified blueprint registered for this exam' };
    }

    // Verify that sections are explicitly mapped
    if (!bp.sections || bp.sections.length === 0) {
      return { isValid: false, reason: 'Blueprint sections are empty; generic structure rejected' };
    }

    // Verify language configuration exists
    const langCfg = db.prepare(`
      SELECT * FROM exam_language_configurations WHERE exam_version_id = ?
    `).get(bp.exam_version_id);

    return {
      isValid: true,
      examId,
      examVersionId: bp.exam_version_id,
      authority: entry.official_authority,
      blueprintId: bp.blueprint_id,
      sectionCount: bp.sections.length,
      hasLanguageConfig: Boolean(langCfg),
      isBilingual: langCfg ? Boolean(langCfg.is_bilingual) : false,
      isSpecific: true
    };
  }
}

module.exports = new NationwideExamRegistryService();
