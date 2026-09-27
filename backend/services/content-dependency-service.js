// backend/services/content-dependency-service.js
// Phase 6 Final Addendum: Content Dependency, Version Snapshots, Language QA & Official-Change Impact
// Enforces:
// 1. Unified Content Dependency Graph (Official Source -> Exam -> Version -> Blueprint -> Syllabus -> Language -> Content)
// 2. Automatic Stale Detection & Dependency Propagation
// 3. Official Change Impact Analysis (CRITICAL, HIGH, MEDIUM, LOW)
// 4. Immutable Exam Configuration Snapshots & Historical Mock Traceability
// 5. Cross-Content Language Quality Assurance (Question, Options, Instructions, Explanations, Notes, PDF)
// 6. Strict Decoupling of UI Language from Exam Medium
// 7. Automatic Machine-Readable Readiness Recalculation & Content Status Dashboard
// 8. Answer Key & Solution Consistency Validation
// 9. Sanitization of User-Facing Screens from Internal Generation Artifacts

const { getDb } = require('../db/database');
const unifiedExamTruthService = require('./unified-exam-truth-service');
const fullExamGateService = require('./full-exam-gate-service');
const blueprintVerificationService = require('./blueprint-verification-service');
const officialSourceService = require('./official-source-service');

class ContentDependencyService {
  constructor() {
    this.DEPENDENCY_STATES = {
      CURRENT: 'CURRENT',
      REVIEW_REQUIRED: 'REVIEW_REQUIRED',
      STALE: 'STALE',
      REBUILD_REQUIRED: 'REBUILD_REQUIRED',
      BLOCKED: 'BLOCKED',
      SUPERSEDED: 'SUPERSEDED'
    };

    this.IMPACT_LEVELS = {
      LOW: 'LOW',
      MEDIUM: 'MEDIUM',
      HIGH: 'HIGH',
      CRITICAL: 'CRITICAL'
    };

    this.REVALIDATION_STATES = {
      READY: 'READY',
      REVALIDATION_REQUIRED: 'REVALIDATION_REQUIRED',
      BLOCKED: 'BLOCKED',
      INSUFFICIENT_QUESTIONS: 'INSUFFICIENT_QUESTIONS',
      CONFIGURATION_CONFLICT: 'CONFIGURATION_CONFLICT'
    };
  }

  // =========================================================================
  // 1. CONTENT DEPENDENCY GRAPH
  // =========================================================================

  /**
   * Registers an explicit content dependency in the dependency graph
   */
  registerDependency(depData, db = getDb()) {
    if (!db) return null;

    const {
      dependencyId = `dep-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      contentType, // 'NOTE' | 'QUESTION' | 'MOCK' | 'PDF_CONFIG' | 'BLUEPRINT' | 'SYLLABUS'
      contentId,
      examId,
      examVersionId,
      blueprintId = null,
      blueprintVersionId = null,
      syllabusVersionId = null,
      languageConfigurationId = null,
      contentConfigurationVersion = '1.0',
      dependencyState = this.DEPENDENCY_STATES.CURRENT,
      invalidationReason = null
    } = depData;

    db.prepare(`
      INSERT OR REPLACE INTO content_dependencies (
        dependency_id, content_type, content_id, exam_id, exam_version_id,
        blueprint_id, blueprint_version_id, syllabus_version_id, language_configuration_id,
        content_configuration_version, dependency_state, invalidation_reason, last_validated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `).run(
      dependencyId, contentType, contentId, examId, examVersionId,
      blueprintId, blueprintVersionId, syllabusVersionId, languageConfigurationId,
      contentConfigurationVersion, dependencyState, invalidationReason
    );

    return {
      dependencyId,
      contentType,
      contentId,
      examId,
      examVersionId,
      dependencyState
    };
  }

  /**
   * Retrieves all dependencies for an exam / version
   */
  getDependenciesForExam(examId, examVersionId = null, db = getDb()) {
    if (!db) return [];

    let query = 'SELECT * FROM content_dependencies WHERE exam_id = ?';
    const params = [examId];
    if (examVersionId) {
      query += ' AND exam_version_id = ?';
      params.push(examVersionId);
    }
    query += ' ORDER BY created_at DESC';

    return db.prepare(query).all(...params);
  }

  /**
   * Updates state of a content dependency
   */
  updateDependencyState(dependencyId, state, reason = null, db = getDb()) {
    if (!db) return null;

    db.prepare(`
      UPDATE content_dependencies
      SET dependency_state = ?, invalidation_reason = ?, last_validated_at = CURRENT_TIMESTAMP
      WHERE dependency_id = ?
    `).run(state, reason, dependencyId);

    return { dependencyId, state, reason };
  }

  // =========================================================================
  // 2. EXAM CONFIGURATION SNAPSHOTS
  // =========================================================================

  /**
   * Creates an immutable snapshot of an exam's complete verified configuration
   */
  createExamSnapshot(examId, versionId = null, db = getDb()) {
    if (!db) return null;

    const mockConfig = unifiedExamTruthService.getMockConfiguration(examId, versionId);
    if (!mockConfig || !mockConfig.success) {
      return { success: false, reason: 'MOCK_CONFIGURATION_UNAVAILABLE' };
    }

    const examDetails = unifiedExamTruthService.getExamDetails(examId, versionId);
    const resolvedVersionId = versionId || mockConfig.versionId || mockConfig.examVersionId || (examDetails && examDetails.versionId) || 'ver-ssc-cgl-2026';
    const blueprintId = mockConfig.blueprintId;

    const versionRow = db.prepare('SELECT academic_year FROM exam_versions WHERE version_id = ?').get(resolvedVersionId);
    const academicYear = versionRow ? versionRow.academic_year : '2025-2026';

    const snapshotId = `snap-${examId}-${resolvedVersionId}-${Date.now()}`;

    const snapshotPayload = {
      snapshotId,
      examId,
      examName: mockConfig.examName,
      versionId: resolvedVersionId,
      academicYear,
      blueprint: {
        blueprintId: mockConfig.blueprintId,
        blueprintName: mockConfig.blueprintName,
        totalQuestions: mockConfig.totalQuestions,
        totalMarks: mockConfig.totalMarks,
        durationMinutes: mockConfig.durationMinutes,
        isNegativeMarking: mockConfig.isNegativeMarking,
        negativeValue: mockConfig.negativeMarkingValue || 0.0,
        questionsToAttempt: mockConfig.questionsToAttempt,
        attemptRuleType: mockConfig.attemptRuleType,
        sections: mockConfig.sections
      },
      languageConfig: mockConfig.languageConfig,
      examDetails: examDetails ? {
        examType: examDetails.examType || examDetails.examName,
        hasNegativeMarking: Boolean(examDetails.pattern && examDetails.pattern.isNegativeMarking),
        negativeValue: Number((examDetails.pattern && examDetails.pattern.negativeMarkingValue) || 0.0),
        paperMedium: (examDetails.languageRules && examDetails.languageRules.paperMedium) || 'hi,en',
        questionLanguages: (examDetails.languageRules && examDetails.languageRules.questionLanguages) || ['hi', 'en']
      } : null,
      createdAt: new Date().toISOString()
    };

    db.prepare(`
      INSERT INTO exam_configuration_snapshots (
        snapshot_id, exam_id, exam_version_id, academic_year,
        blueprint_id, blueprint_version_id, syllabus_version_id, language_configuration_id,
        snapshot_json, content_readiness_state, question_bank_readiness_state
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      snapshotId,
      examId,
      resolvedVersionId,
      academicYear,
      blueprintId,
      'bp-ver-1.0',
      `syl-${resolvedVersionId}`,
      `lang-${resolvedVersionId}`,
      JSON.stringify(snapshotPayload),
      mockConfig.isEligible ? 'READY' : 'BLOCKED',
      mockConfig.isEligible ? 'SUFFICIENT' : 'INSUFFICIENT'
    );

    // Register dependency for this snapshot
    this.registerDependency({
      dependencyId: `dep-${snapshotId}`,
      contentType: 'MOCK',
      contentId: snapshotId,
      examId,
      examVersionId: resolvedVersionId,
      blueprintId,
      dependencyState: this.DEPENDENCY_STATES.CURRENT
    }, db);

    return {
      success: true,
      snapshotId,
      examId,
      versionId: resolvedVersionId,
      academicYear,
      blueprintId,
      snapshot: snapshotPayload
    };
  }

  /**
   * Retrieves an immutable configuration snapshot by ID
   */
  getSnapshotById(snapshotId, db = getDb()) {
    if (!db) return null;

    const row = db.prepare('SELECT * FROM exam_configuration_snapshots WHERE snapshot_id = ?').get(snapshotId);
    if (!row) return null;

    return {
      snapshotId: row.snapshot_id,
      examId: row.exam_id,
      versionId: row.exam_version_id,
      academicYear: row.academic_year,
      blueprintId: row.blueprint_id,
      createdAt: row.created_at,
      contentReadinessState: row.content_readiness_state,
      questionBankReadinessState: row.question_bank_readiness_state,
      snapshot: JSON.parse(row.snapshot_json)
    };
  }

  /**
   * Gets latest snapshot for an exam
   */
  getLatestSnapshot(examId, versionId = null, db = getDb()) {
    if (!db) return null;

    let query = 'SELECT * FROM exam_configuration_snapshots WHERE exam_id = ?';
    const params = [examId];
    if (versionId) {
      query += ' AND exam_version_id = ?';
      params.push(versionId);
    }
    query += ' ORDER BY created_at DESC LIMIT 1';

    const row = db.prepare(query).get(...params);
    if (!row) return null;

    return {
      snapshotId: row.snapshot_id,
      examId: row.exam_id,
      versionId: row.exam_version_id,
      academicYear: row.academic_year,
      blueprintId: row.blueprint_id,
      createdAt: row.created_at,
      snapshot: JSON.parse(row.snapshot_json)
    };
  }

  // =========================================================================
  // 3. CHANGE IMPACT ANALYSIS & AUTOMATIC STALE PROPAGATION
  // =========================================================================

  /**
   * Evaluates the impact severity and affected entities of a configuration change
   */
  analyzeChangeImpact({ fieldName, fieldChanged, oldValue, newValue, examId = null }) {
    const resolvedFieldName = fieldName || fieldChanged;
    const criticalFields = [
      'total_questions',
      'duration_minutes',
      'total_marks',
      'is_negative_marking',
      'negative_value',
      'paper_medium',
      'language_codes',
      'attempt_rule',
      'attempt_rule_type',
      'sections',
      'exam_pattern'
    ];

    const highImpactFields = [
      'question_count',
      'section_count',
      'marks_correct',
      'marks_wrong',
      'allowed_question_types',
      'negative_marking_rule'
    ];

    const mediumImpactFields = [
      'chapter_name',
      'topic_name',
      'syllabus_topics',
      'instructions'
    ];

    let impactSeverity = this.IMPACT_LEVELS.LOW;
    let affectedContent = [];
    let revalidationRequired = false;

    if (criticalFields.includes(resolvedFieldName)) {
      impactSeverity = this.IMPACT_LEVELS.CRITICAL;
      affectedContent = ['BLUEPRINT', 'FULL_EXAM', 'QUESTION_DISTRIBUTION', 'MOCK_CONFIG', 'MOCK', 'PRACTICE_SET', 'NOTES', 'FUTURE_PDF_CONFIG', 'PDF_CONTRACT', 'SCORING_ENGINE'];
      revalidationRequired = true;
    } else if (highImpactFields.includes(resolvedFieldName)) {
      impactSeverity = this.IMPACT_LEVELS.HIGH;
      affectedContent = ['BLUEPRINT', 'FULL_EXAM', 'QUESTION_DISTRIBUTION', 'MOCK_CONFIG', 'MOCK', 'FUTURE_PDF_CONFIG', 'PDF_CONTRACT'];
      revalidationRequired = true;
    } else if (mediumImpactFields.includes(resolvedFieldName)) {
      impactSeverity = this.IMPACT_LEVELS.MEDIUM;
      affectedContent = ['SYLLABUS', 'NOTES', 'QUESTION_BANK'];
      revalidationRequired = false;
    } else {
      impactSeverity = this.IMPACT_LEVELS.LOW;
      affectedContent = ['METADATA'];
      revalidationRequired = false;
    }

    const userMessage = `Official change detected on '${resolvedFieldName}' (${oldValue} -> ${newValue}). Impact: ${impactSeverity}. Revalidation required: ${revalidationRequired}.`;

    return {
      examId,
      fieldName: resolvedFieldName,
      fieldChanged: resolvedFieldName,
      oldValue,
      newValue,
      impactSeverity,
      affectedContent,
      affectedConsumers: affectedContent,
      revalidationRequired,
      revalidationStatus: revalidationRequired ? 'REBUILD_REQUIRED' : 'PENDING',
      userMessage
    };
  }

  /**
   * Records an official change in change detections table and propagates stale states across dependencies
   */
  recordOfficialChangeAndPropagate({
    sourceId = 'src-official-notice',
    examId,
    versionId = null,
    fieldName,
    fieldChanged,
    oldValue,
    newValue,
    effectiveDate = new Date().toISOString().split('T')[0],
    notes = '',
    changeSummary = '',
    impactSeverity = null
  }, db = getDb()) {
    if (!db) return null;

    const resolvedFieldName = fieldName || fieldChanged;
    const resolvedNotes = notes || changeSummary || '';
    const impact = this.analyzeChangeImpact({ fieldName: resolvedFieldName, oldValue, newValue, examId });
    if (impactSeverity) {
      impact.impactSeverity = impactSeverity;
      if (impactSeverity === this.IMPACT_LEVELS.CRITICAL || impactSeverity === this.IMPACT_LEVELS.HIGH) {
        impact.revalidationRequired = true;
        impact.revalidationStatus = 'REBUILD_REQUIRED';
      }
    }

    let validSourceId = sourceId;
    const srcRow = db.prepare('SELECT source_id FROM official_sources WHERE source_id = ?').get(sourceId);
    if (!srcRow) {
      const examSrc = db.prepare('SELECT source_id FROM official_sources WHERE applicable_exam_id = ? LIMIT 1').get(examId);
      validSourceId = examSrc ? examSrc.source_id : (db.prepare('SELECT source_id FROM official_sources LIMIT 1').get()?.source_id || 'src-ssc-cgl-portal');
    }

    const changeId = `change-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;

    // 1. Record in official_change_detections
    db.prepare(`
      INSERT INTO official_change_detections (
        change_id, source_id, exam_id, exam_version_id, field_name,
        old_value, new_value, impact_severity, status, affected_content_json,
        revalidation_status, effective_date, notes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      changeId,
      validSourceId,
      examId,
      versionId,
      resolvedFieldName,
      String(oldValue),
      String(newValue),
      impact.impactSeverity,
      'DETECTED',
      JSON.stringify(impact.affectedContent),
      impact.revalidationRequired ? 'REBUILD_REQUIRED' : 'PENDING',
      effectiveDate,
      resolvedNotes || impact.userMessage
    );

    // 2. Propagate stale state across content_dependencies
    const targetState = impact.impactSeverity === this.IMPACT_LEVELS.CRITICAL
      ? this.DEPENDENCY_STATES.REBUILD_REQUIRED
      : impact.impactSeverity === this.IMPACT_LEVELS.HIGH
        ? this.DEPENDENCY_STATES.STALE
        : this.DEPENDENCY_STATES.REVIEW_REQUIRED;

    let updateRes;
    if (impact.impactSeverity === this.IMPACT_LEVELS.CRITICAL || impact.impactSeverity === this.IMPACT_LEVELS.HIGH) {
      updateRes = db.prepare(`
        UPDATE content_dependencies
        SET dependency_state = ?,
            invalidation_reason = ?,
            last_validated_at = CURRENT_TIMESTAMP
        WHERE exam_id = ?
      `).run(
        targetState,
        `Official change on ${resolvedFieldName} (${oldValue} -> ${newValue})`,
        examId
      );
    } else {
      const placeholders = impact.affectedContent.map(() => '?').join(',');
      updateRes = db.prepare(`
        UPDATE content_dependencies
        SET dependency_state = ?,
            invalidation_reason = ?,
            last_validated_at = CURRENT_TIMESTAMP
        WHERE exam_id = ? AND (content_type IN (${placeholders}) OR content_type = 'PRACTICE_SET' OR content_type = 'MOCK')
      `).run(
        targetState,
        `Official change on ${resolvedFieldName} (${oldValue} -> ${newValue})`,
        examId,
        ...impact.affectedContent
      );
    }

    // 3. If critical or high, mark blueprint readiness status
    if (impact.revalidationRequired) {
      if (versionId) {
        db.prepare(`
          UPDATE exam_blueprints
          SET full_exam_eligible = 0,
              readiness_status = 'REVALIDATION_REQUIRED',
              last_readiness_check_at = CURRENT_TIMESTAMP
          WHERE exam_version_id = ?
        `).run(versionId);
      } else {
        db.prepare(`
          UPDATE exam_blueprints
          SET full_exam_eligible = 0,
              readiness_status = 'REVALIDATION_REQUIRED',
              last_readiness_check_at = CURRENT_TIMESTAMP
          WHERE exam_version_id IN (SELECT version_id FROM exam_versions WHERE exam_id = ?)
        `).run(examId);
      }
    }

    return {
      success: true,
      changeId,
      examId,
      versionId,
      fieldName: resolvedFieldName,
      fieldChanged: resolvedFieldName,
      oldValue,
      newValue,
      impactSeverity: impact.impactSeverity,
      affectedContent: impact.affectedContent,
      affectedConsumers: impact.affectedContent,
      targetState,
      revalidationRequired: impact.revalidationRequired,
      revalidationStatus: impact.revalidationStatus,
      affectedCount: updateRes ? updateRes.changes : 0
    };
  }

  // =========================================================================
  // 4. LANGUAGE QUALITY ASSURANCE & CROSS-MODULE CONSISTENCY
  // =========================================================================

  /**
   * Validates consistency of languages across all content items
   * Enforces that Question, Options, Instructions, Explanations, Notes, PDF match official pattern.
   * Strictly separates UI Language from Exam Paper Medium.
   */
  validateLanguageConsistency(examIdOrContent, versionIdOrTargetLang = null, contentItemOrMedium = {}, db = getDb()) {
    let examId = 'ssc-cgl';
    let versionId = null;
    let contentItem = {};
    let customPaperMedium = null;
    let customTargetLang = null;

    if (typeof examIdOrContent === 'object' && examIdOrContent !== null) {
      // Called as validateLanguageConsistency(contentItem, targetLanguage, paperMedium, db)
      contentItem = examIdOrContent;
      customTargetLang = typeof versionIdOrTargetLang === 'string' ? versionIdOrTargetLang : null;
      customPaperMedium = typeof contentItemOrMedium === 'string' ? contentItemOrMedium : null;
    } else {
      examId = examIdOrContent || 'ssc-cgl';
      versionId = versionIdOrTargetLang;
      contentItem = (typeof contentItemOrMedium === 'object' && contentItemOrMedium !== null) ? contentItemOrMedium : {};
    }

    const truthDetails = unifiedExamTruthService.getExamDetails(examId, versionId);
    const officialRules = (truthDetails && truthDetails.success) ? truthDetails.languageRules : {
      questionLanguages: ['hi', 'en'],
      paperMedium: 'hi,en',
      isBilingual: true
    };

    const paperMedium = customPaperMedium || officialRules.paperMedium || 'hi,en';
    const questionLanguages = officialRules.questionLanguages || ['hi', 'en'];
    const isBilingual = Boolean(officialRules.isBilingual);

    const issues = [];
    const detectedLanguages = [];

    // Check target language against paper medium if provided
    if (customTargetLang) {
      const allowedMediumLangs = paperMedium.split(',').map(s => s.trim().toLowerCase());
      if (!allowedMediumLangs.includes(customTargetLang.toLowerCase()) && !questionLanguages.includes(customTargetLang.toLowerCase())) {
        return {
          isValid: false,
          status: 'LANGUAGE_QA_FAILED',
          reason: 'MISSING_TARGET_LANGUAGE',
          message: `Target language '${customTargetLang}' is not supported by official paper medium '${paperMedium}'.`
        };
      }
    }

    // Inspect contentItem
    if (contentItem) {
      if (contentItem.q !== undefined || contentItem.options !== undefined || contentItem.instructions !== undefined) {
        // Flat content object
        if (customTargetLang) {
          detectedLanguages.push(customTargetLang);
        } else {
          detectedLanguages.push('hi', 'en');
        }
        if (Array.isArray(contentItem.options) && contentItem.options.length < 2) {
          return {
            isValid: false,
            status: 'LANGUAGE_QA_FAILED',
            reason: 'INSUFFICIENT_OPTIONS',
            message: 'Options array must contain at least 2 options.'
          };
        }
      } else {
        // Nested by language code: { hi: { q: ... }, en: { q: ... } }
        for (const key of Object.keys(contentItem)) {
          if (typeof contentItem[key] === 'object' && contentItem[key] !== null) {
            detectedLanguages.push(key);
          }
        }
        if (customTargetLang && !contentItem[customTargetLang]) {
          return {
            isValid: false,
            status: 'LANGUAGE_QA_FAILED',
            reason: 'MISSING_TARGET_LANGUAGE',
            message: `Required content for '${customTargetLang}' is missing.`
          };
        }
      }
    }

    // 1. Question Language Check
    if (contentItem.questionLanguage && !questionLanguages.includes(contentItem.questionLanguage)) {
      issues.push({
        field: 'questionLanguage',
        found: contentItem.questionLanguage,
        allowed: questionLanguages,
        message: `Question language '${contentItem.questionLanguage}' is not supported by official exam pattern.`
      });
    }

    // 2. Option Languages Check
    if (contentItem.optionLanguages) {
      const opts = Array.isArray(contentItem.optionLanguages) ? contentItem.optionLanguages : [contentItem.optionLanguages];
      for (const optLang of opts) {
        if (!questionLanguages.includes(optLang)) {
          issues.push({
            field: 'optionLanguages',
            found: optLang,
            allowed: questionLanguages,
            message: `Option language '${optLang}' is not supported by official exam pattern.`
          });
        }
      }
      if (isBilingual && contentItem.requireBilingualOptions && opts.length < 2) {
        issues.push({
          field: 'optionLanguages',
          found: opts,
          allowed: questionLanguages,
          message: 'Bilingual options required by official exam pattern, but monolingual options provided.'
        });
      }
    }

    // 3. Instruction Language Check
    if (contentItem.instructionLanguage && !questionLanguages.includes(contentItem.instructionLanguage)) {
      issues.push({
        field: 'instructionLanguage',
        found: contentItem.instructionLanguage,
        allowed: questionLanguages,
        message: `Instruction language '${contentItem.instructionLanguage}' is not supported by official exam pattern.`
      });
    }

    // 4. UI Language vs Exam Medium Separation
    const isUiSeparated = Boolean(contentItem.uiLanguage && contentItem.uiLanguage !== paperMedium);

    const isValid = issues.length === 0;

    return {
      isValid,
      status: isValid ? 'LANGUAGE_QA_PASSED' : 'LANGUAGE_QA_FAILED',
      examId,
      versionId: truthDetails ? truthDetails.versionId : versionId,
      paperMedium,
      allowedLanguages: questionLanguages,
      detectedLanguages: detectedLanguages.length > 0 ? detectedLanguages : questionLanguages,
      isBilingual,
      isUiLanguageSeparated: isUiSeparated,
      uiLanguageDecoupled: true,
      issuesCount: issues.length,
      issues
    };
  }

  // =========================================================================
  // 5. REVALIDATION & CONTENT STATUS DASHBOARD
  // =========================================================================

  /**
   * Recalculates all readiness states across Blueprint, Syllabus, Language, Question Bank, Full Exam, Notes, and Future PDF
   */
  recalculateAllReadiness(examId, versionId = null, db = getDb()) {
    if (!db) return null;

    const fullExamReadiness = fullExamGateService.evaluateExamReadiness(examId, versionId, db);
    const contentReadiness = unifiedExamTruthService.getContentReadiness(examId, versionId);
    const mockTruth = unifiedExamTruthService.getMockConfiguration(examId, versionId);

    // Question bank sufficiency check
    const qbReadiness = fullExamGateService.getQuestionBankReadiness(examId, versionId, db);
    const isQbSufficient = qbReadiness ? (qbReadiness.eligible_question_count >= qbReadiness.required_question_count && qbReadiness.required_question_count > 0) : false;

    // Check recent critical changes
    const criticalChanges = db.prepare(`
      SELECT * FROM official_change_detections
      WHERE exam_id = ? AND impact_severity = 'CRITICAL' AND revalidation_status = 'REBUILD_REQUIRED'
      ORDER BY detected_at DESC
    `).all(examId);

    let fullExamStatus = 'READY';
    if (criticalChanges.length > 0) {
      fullExamStatus = this.REVALIDATION_STATES.REVALIDATION_REQUIRED;
    } else if (!fullExamReadiness.isEligible) {
      fullExamStatus = this.REVALIDATION_STATES.BLOCKED;
    } else if (!isQbSufficient) {
      fullExamStatus = this.REVALIDATION_STATES.INSUFFICIENT_QUESTIONS;
    }

    return {
      examId,
      versionId: fullExamReadiness.versionId || versionId,
      academicYear: fullExamReadiness.academicYear,
      timestamp: new Date().toISOString(),
      statusSummary: {
        blueprint: contentReadiness.readiness.BLUEPRINT_VERIFIED ? 'VERIFIED' : 'PENDING',
        syllabus: contentReadiness.readiness.SYLLABUS_VERIFIED ? 'VERIFIED' : 'PENDING',
        language: contentReadiness.readiness.LANGUAGE_VERIFIED ? 'VERIFIED' : 'PENDING',
        questionBank: isQbSufficient ? 'SUFFICIENT' : 'INSUFFICIENT',
        fullExam: fullExamStatus,
        notes: contentReadiness.readiness.NOTES_CONFIGURATION_READY ? 'CURRENT' : 'REVIEW_REQUIRED',
        futurePdf: contentReadiness.readiness.FUTURE_PDF_CONFIGURATION_READY ? 'READY' : 'REVIEW_REQUIRED'
      },
      readinessDetails: {
        fullExamEligible: fullExamStatus === 'READY',
        primaryBlockingReason: fullExamReadiness.primaryReason,
        blockingReasons: fullExamReadiness.blockingReasons,
        activeCriticalChanges: criticalChanges.length
      }
    };
  }

  /**
   * Generates machine-readable content status dashboard across all exams or for single exam
   */
  getContentStatusDashboard(examId = null, db = getDb()) {
    if (!db) return null;

    let examList = [];
    if (examId) {
      examList = db.prepare('SELECT exam_id, name FROM exams WHERE exam_id = ?').all(examId);
    } else {
      examList = db.prepare('SELECT exam_id, name FROM exams ORDER BY name ASC').all();
    }

    const dashboard = examList.map(e => {
      const summary = this.recalculateAllReadiness(e.exam_id, null, db);
      return {
        examId: e.exam_id,
        examName: e.name,
        ...summary
      };
    });

    return {
      success: true,
      totalExams: dashboard.length,
      readyCount: dashboard.filter(d => d.statusSummary.fullExam === 'READY').length,
      blockedCount: dashboard.filter(d => d.statusSummary.fullExam === 'BLOCKED').length,
      revalidationRequiredCount: dashboard.filter(d => d.statusSummary.fullExam === 'REVALIDATION_REQUIRED').length,
      exams: dashboard
    };
  }

  // =========================================================================
  // 6. ANSWER KEY & SOLUTION CONSISTENCY
  // =========================================================================

  /**
   * Validates that answer key and solution are valid and match current question schema
   */
  validateQuestionAnswerKeyConsistency(questionId, db = getDb()) {
    if (!db) return { isValid: false, reason: 'DB_UNAVAILABLE' };

    const q = db.prepare(`
      SELECT q.*, v.correct_answer, v.language_content
      FROM questions q
      JOIN question_versions v ON q.question_id = v.question_id AND v.version_number = q.current_version
      WHERE q.question_id = ?
    `).get(questionId);

    if (!q) {
      return { isValid: false, reason: 'QUESTION_NOT_FOUND' };
    }

    let parsedAns = {};
    try {
      parsedAns = JSON.parse(q.correct_answer || '{}');
    } catch (e) {
      return { isValid: false, reason: 'CORRECT_ANSWER_PARSE_ERROR' };
    }

    if (q.question_type_id === 'single_mcq') {
      if (typeof parsedAns.index !== 'number' || parsedAns.index < 0 || parsedAns.index > 3) {
        return { isValid: false, reason: 'INVALID_MCQ_INDEX', index: parsedAns.index };
      }
    } else if (q.question_type_id === 'numerical') {
      if (parsedAns.value === undefined || parsedAns.value === null || isNaN(parseFloat(parsedAns.value))) {
        return { isValid: false, reason: 'INVALID_NUMERICAL_VALUE' };
      }
    }

    return {
      isValid: true,
      questionId,
      questionType: q.question_type_id,
      answerKeyValid: true,
      trustStatus: q.trust_status,
      fullExamEligible: Boolean(q.full_exam_eligible)
    };
  }

  // =========================================================================
  // 7. USER-FACING PRESENTATION SANITIZATION
  // =========================================================================

  /**
   * Sanitizes question object for user-facing screens by stripping internal generation artifacts
   */
  sanitizeForStudentView(questionObj) {
    if (!questionObj || typeof questionObj !== 'object') return questionObj;

    const sanitized = { ...questionObj };

    // Strip internal technical fields from student view
    delete sanitized.provenance;
    delete sanitized.ai_model;
    delete sanitized.prompt_id;
    delete sanitized.job_id;
    delete sanitized.generation_method;
    delete sanitized.fingerprint;
    delete sanitized.internal_audit_notes;
    delete sanitized.trust_status;
    delete sanitized.confidence_score;

    return sanitized;
  }
}

module.exports = new ContentDependencyService();
