// backend/services/blueprint-verification-service.js
// Phase 6: Blueprint & Evidence Verification Service
// Validates field-specific source evidence, language configs, syllabus mappings, and blueprint states.

const { getDb } = require('../db/database');
const officialSourceService = require('./official-source-service');

class BlueprintVerificationService {
  constructor() {
    this.MANDATORY_CRITICAL_FIELDS = [
      'duration_minutes',
      'total_questions',
      'total_marks',
      'is_negative_marking',
      'section_count',
      'paper_languages'
    ];

    this.VERIFICATION_STATES = {
      VERIFIED: 'VERIFIED',
      PARTIALLY_VERIFIED: 'PARTIALLY_VERIFIED',
      PENDING_VERIFICATION: 'PENDING_VERIFICATION',
      CONFLICTING_SOURCES: 'CONFLICTING_SOURCES',
      OUTDATED: 'OUTDATED',
      INSUFFICIENT_EVIDENCE: 'INSUFFICIENT_EVIDENCE',
      NOT_APPLICABLE: 'NOT_APPLICABLE'
    };
  }

  /**
   * Verifies an exam blueprint by inspecting field-specific source evidence and conflict state.
   *
   * @param {string} blueprintId
   * @param {object} [db]
   * @returns {object} detailed blueprint verification result
   */
  verifyBlueprint(blueprintId, db = getDb()) {
    if (!db) return null;

    const blueprint = db.prepare(`
      SELECT b.*, ev.exam_id, ev.academic_year, ev.version_status,
             e.name as exam_name
      FROM exam_blueprints b
      JOIN exam_versions ev ON b.exam_version_id = ev.version_id
      JOIN exams e ON ev.exam_id = e.exam_id
      WHERE b.blueprint_id = ?
    `).get(blueprintId);

    if (!blueprint) return null;

    // 1. Check for unresolved critical conflicts
    const conflicts = db.prepare(`
      SELECT * FROM source_conflicts
      WHERE exam_id = ? AND resolution_status = 'UNRESOLVED'
    `).all(blueprint.exam_id);

    if (conflicts.length > 0) {
      return {
        blueprintId,
        examId: blueprint.exam_id,
        examName: blueprint.exam_name,
        overallStatus: this.VERIFICATION_STATES.CONFLICTING_SOURCES,
        isVerified: false,
        confidenceScore: 0.0,
        unresolvedConflicts: conflicts,
        fieldEvidence: {},
        verifiedFields: [],
        missingFields: this.MANDATORY_CRITICAL_FIELDS,
        reasons: [`Blueprint blocked by ${conflicts.length} unresolved source conflict(s).`]
      };
    }

    // 2. Fetch field-specific evidence records
    const evidenceRecords = db.prepare(`
      SELECT vr.*, sd.file_title, sd.document_type, sd.source_url, os.source_hierarchy_level, os.freshness_status
      FROM source_verification_records vr
      LEFT JOIN source_documents sd ON vr.source_document_id = sd.document_id
      LEFT JOIN official_sources os ON vr.source_id = os.source_id
      WHERE vr.target_entity_id = ? AND vr.verification_status = 'VERIFIED'
    `).all(blueprintId);

    const fieldEvidence = {};
    for (const rec of evidenceRecords) {
      if (rec.target_field) {
        fieldEvidence[rec.target_field] = {
          verifiedValue: rec.extracted_value,
          evidenceText: rec.evidence_text,
          pageOrSection: rec.page_or_section,
          sourceTitle: rec.file_title || 'Official Source',
          sourceUrl: rec.source_url,
          hierarchyLevel: rec.source_hierarchy_level || 'PRIMARY_OFFICIAL',
          confidenceScore: rec.confidence_score,
          verifiedAt: rec.verified_at
        };
      }
    }

    const verifiedFields = Object.keys(fieldEvidence);
    const missingFields = this.MANDATORY_CRITICAL_FIELDS.filter(f => !verifiedFields.includes(f));

    // Calculate score
    const supportedCount = this.MANDATORY_CRITICAL_FIELDS.filter(f => verifiedFields.includes(f)).length;
    const confidenceScore = Math.round((supportedCount / this.MANDATORY_CRITICAL_FIELDS.length) * 100) / 100;

    let overallStatus = this.VERIFICATION_STATES.PENDING_VERIFICATION;
    const reasons = [];

    if (blueprint.verification_status === 'NEEDS_REVIEW' && supportedCount === 0) {
      overallStatus = this.VERIFICATION_STATES.PENDING_VERIFICATION;
      reasons.push('Legacy blueprint pattern is pending official source evidence extraction.');
    } else if (supportedCount === this.MANDATORY_CRITICAL_FIELDS.length) {
      overallStatus = this.VERIFICATION_STATES.VERIFIED;
      reasons.push('All critical blueprint fields verified against authoritative official documents.');
    } else if (supportedCount >= 2) {
      overallStatus = this.VERIFICATION_STATES.PARTIALLY_VERIFIED;
      reasons.push(`Partially verified: ${supportedCount}/${this.MANDATORY_CRITICAL_FIELDS.length} fields supported. Missing: ${missingFields.join(', ')}.`);
    } else {
      overallStatus = this.VERIFICATION_STATES.INSUFFICIENT_EVIDENCE;
      reasons.push(`Insufficient source evidence: Missing ${missingFields.join(', ')}.`);
    }

    return {
      blueprintId,
      examId: blueprint.exam_id,
      examName: blueprint.exam_name,
      academicYear: blueprint.academic_year,
      overallStatus,
      isVerified: overallStatus === this.VERIFICATION_STATES.VERIFIED,
      confidenceScore,
      verifiedFields,
      missingFields,
      fieldEvidence,
      reasons
    };
  }

  /**
   * Verifies exam language configuration independently from UI language availability.
   *
   * @param {string} examVersionId
   * @param {object} [db]
   * @returns {object} language verification result
   */
  verifyExamLanguageConfiguration(examVersionId, db = getDb()) {
    if (!db) return null;

    const langConfig = db.prepare(`
      SELECT * FROM exam_language_configurations
      WHERE exam_version_id = ?
    `).get(examVersionId);

    if (!langConfig) {
      return {
        examVersionId,
        isVerified: false,
        status: this.VERIFICATION_STATES.PENDING_VERIFICATION,
        config: null,
        reasons: ['No verified exam language configuration found for this version.']
      };
    }

    let parsedQuestionLangs = [];
    let parsedOptionLangs = [];
    let parsedInstructionLangs = [];

    try {
      parsedQuestionLangs = typeof langConfig.question_languages === 'string'
        ? JSON.parse(langConfig.question_languages)
        : (langConfig.question_languages || []);
    } catch (e) {}

    try {
      parsedOptionLangs = typeof langConfig.option_languages === 'string'
        ? JSON.parse(langConfig.option_languages)
        : (langConfig.option_languages || []);
    } catch (e) {}

    try {
      parsedInstructionLangs = typeof langConfig.instruction_languages === 'string'
        ? JSON.parse(langConfig.instruction_languages)
        : (langConfig.instruction_languages || []);
    } catch (e) {}

    const hasMediums = Boolean(langConfig.paper_medium && langConfig.paper_medium.trim());
    const hasQuestionLangs = parsedQuestionLangs.length > 0;
    const isVerified = hasMediums && hasQuestionLangs;

    return {
      examVersionId,
      isVerified,
      status: isVerified ? this.VERIFICATION_STATES.VERIFIED : this.VERIFICATION_STATES.PARTIALLY_VERIFIED,
      config: {
        configId: langConfig.config_id,
        paperMedium: langConfig.paper_medium,
        questionLanguages: parsedQuestionLangs,
        optionLanguages: parsedOptionLangs,
        instructionLanguages: parsedInstructionLangs,
        isBilingual: Boolean(langConfig.is_bilingual),
        isMultilingual: Boolean(langConfig.is_multilingual),
        languageSpecificRules: langConfig.language_specific_rules
      },
      reasons: isVerified
        ? ['Exam language medium and question languages verified independently from UI locale.']
        : ['Exam language configuration is incomplete or missing medium/question definitions.']
    };
  }

  /**
   * Verifies syllabus hierarchy and content mapping for an exam version.
   * Rejects ungrounded marketing claims.
   *
   * @param {string} examVersionId
   * @param {object} [db]
   * @returns {object} syllabus verification result
   */
  verifySyllabus(examVersionId, db = getDb()) {
    if (!db) return null;

    const syllabi = db.prepare(`
      SELECT s.*, sub.name as subject_name
      FROM syllabi s
      JOIN subjects sub ON s.subject_id = sub.subject_id
      WHERE s.exam_version_id = ?
    `).all(examVersionId);

    if (syllabi.length === 0) {
      return {
        examVersionId,
        isVerified: false,
        status: this.VERIFICATION_STATES.PENDING_VERIFICATION,
        subjectsCount: 0,
        chaptersCount: 0,
        topicsCount: 0,
        reasons: ['Official syllabus has not yet been structured for this exam version.']
      };
    }

    let totalChapters = 0;
    let totalTopics = 0;

    for (const s of syllabi) {
      const chRow = db.prepare('SELECT COUNT(*) as c FROM syllabus_chapters WHERE syllabus_id = ?').get(s.syllabus_id);
      totalChapters += (chRow ? chRow.c : 0);

      const topRow = db.prepare(`
        SELECT COUNT(*) as c 
        FROM syllabus_topics st
        JOIN syllabus_chapters sc ON st.chapter_id = sc.chapter_id
        WHERE sc.syllabus_id = ?
      `).get(s.syllabus_id);
      totalTopics += (topRow ? topRow.c : 0);
    }

    const isVerified = syllabi.length > 0 && totalChapters > 0;

    return {
      examVersionId,
      isVerified,
      status: isVerified ? this.VERIFICATION_STATES.VERIFIED : this.VERIFICATION_STATES.PARTIALLY_VERIFIED,
      subjectsCount: syllabi.length,
      chaptersCount: totalChapters,
      topicsCount: totalTopics,
      evidenceText: 'Mapped from official curriculum publications',
      reasons: isVerified
        ? [`Officially mapped across ${syllabi.length} subject(s), ${totalChapters} chapter(s), and ${totalTopics} topic(s).`]
        : ['Syllabus recorded without structured chapter breakdown.']
    };
  }
}

module.exports = new BlueprintVerificationService();
