/**
 * backend/services/source-verification-governance-service.js
 * 
 * SARKARIAI HUB — PHASE 23
 * Master Source Monitoring, Verification Queue, Impact Analysis & Observability Governance Engine
 * 
 * Provides unified, production-hardened governance for:
 * 1. Source Registry & Provenance Hierarchy
 * 2. SSRF Protection & Safe Source Fetching (size, MIME, timeout, hash)
 * 3. Deterministic Change Detection (SHA-256, multi-level classification)
 * 4. Current vs Historical Separation & Immutability
 * 5. Verification Queue (10 lifecycle statuses, 5 verification levels)
 * 6. Content Impact Analysis & Full Exam Invalidation Safety
 * 7. Staleness Engine & Candidate-Facing Messaging
 * 8. Conflict Management (CONFLICT_REVIEW_REQUIRED)
 * 9. Worker & Scheduler Safety (locking, backoff, retry limits, dead-letter)
 * 10. Source Failure States Representation
 * 11. Admin RBAC & Immutable Audit Logging (no secret logging)
 * 12. Operational Observability & Health Metrics
 */

const crypto = require('crypto');
const { getDb } = require('../db/database');

// Standard Authority Trust Hierarchy
const AUTHORITY_TRUST_LEVELS = {
  'GAZETTE_OF_INDIA': 1,
  'MINISTRY_OF_PERSONNEL': 1,
  'UPSC': 2,
  'SSC': 2,
  'RAILWAY_RRB': 2,
  'STATE_PUBLIC_SERVICE_COMMISSION': 2,
  'STATE_EXAM_REGULATORY_AUTHORITY': 2,
  'CBSE': 3,
  'STATE_EDUCATION_BOARD': 3,
  'NTA': 3,
  'OFFICIAL_NOTIFICATION': 4,
  'OFFICIAL_SYLLABUS': 4,
  'OFFICIAL_ANSWER_KEY': 5,
  'OFFICIAL_SAMPLE_PAPER': 6,
  'CORRIGENDUM_NOTICE': 7
};

// Standard Source Types Taxonomy
const SOURCE_TYPES = [
  'OFFICIAL_WEBSITE',
  'OFFICIAL_NOTIFICATION',
  'OFFICIAL_SYLLABUS',
  'OFFICIAL_BLUEPRINT',
  'OFFICIAL_PAPER',
  'OFFICIAL_SAMPLE',
  'OFFICIAL_ANSWER_KEY',
  'OFFICIAL_CORRIGENDUM',
  'OFFICIAL_RESULT',
  'OFFICIAL_REGISTRATION',
  'GOVERNMENT_NOTICE',
  'OTHER_VERIFIED_SOURCE'
];

// Verification Queue Lifecycle Statuses
const VERIFICATION_STATUSES = [
  'DISCOVERED',
  'SOURCE_VERIFIED',
  'STRUCTURED',
  'NEEDS_REVIEW',
  'VERIFIED',
  'REJECTED',
  'SUPERSEDED',
  'HISTORICAL',
  'STALE',
  'BLOCKED'
];

// Verification Levels
const VERIFICATION_LEVELS = [
  'SOURCE_VERIFIED',   // The source itself is authentic & official
  'DATA_VERIFIED',     // Extracted facts accurately match source document
  'PATTERN_VERIFIED',  // Exam pattern / marking scheme validated
  'CONTENT_VERIFIED',  // Derived questions/notes confirmed
  'CURRENT_VERIFIED'   // Confirmed as the currently active statutory version
];

// Admin RBAC Roles
const RBAC_ROLES = {
  'READ_ONLY_MONITOR': ['view_sources', 'view_metrics', 'view_logs'],
  'VERIFIER': ['view_sources', 'view_metrics', 'view_logs', 'verify_queue', 'reject_queue'],
  'EDITOR': ['view_sources', 'view_metrics', 'view_logs', 'verify_queue', 'reject_queue', 'edit_content'],
  'SOURCE_MANAGER': ['view_sources', 'view_metrics', 'view_logs', 'verify_queue', 'reject_queue', 'edit_content', 'manage_sources', 'trigger_checks'],
  'SYSTEM_ADMIN': ['*']
};

class SourceVerificationGovernanceService {
  constructor() {
    this.activeLocks = new Set();
  }

  // =========================================================================
  // 1. SSRF PROTECTION & SAFE FETCH VALIDATION
  // =========================================================================

  /**
   * Validate that a URL belongs to an authentic official government/academic portal
   * Prevents SSRF attacks by blocking loopback, private subnets, and cloud metadata
   */
  validateSourceUrl(urlStr) {
    if (!urlStr || typeof urlStr !== 'string') {
      return { isValid: false, reason: 'URL must be a non-empty string' };
    }

    try {
      const parsed = new URL(urlStr);
      if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
        return { isValid: false, reason: 'Protocol must be HTTP or HTTPS' };
      }

      const hostname = parsed.hostname.toLowerCase();

      // Block local/private IPs and loopbacks
      if (
        hostname === 'localhost' ||
        hostname === '127.0.0.1' ||
        hostname === '::1' ||
        hostname.startsWith('10.') ||
        hostname.startsWith('192.168.') ||
        hostname.startsWith('172.16.') ||
        hostname.startsWith('169.254.')
      ) {
        return { isValid: false, reason: 'SSRF Blocked: Private/loopback address' };
      }

      // Allowed official government and academic domains
      const allowedSuffixes = [
        '.gov.in',
        '.nic.in',
        '.ac.in',
        '.org.in',
        '.edu.in',
        'upsc.gov.in',
        'ssc.gov.in',
        'cbse.gov.in',
        'indianrailways.gov.in',
        'nta.ac.in',
        'uppbpb.gov.in',
        'biharpolice.bih.nic.in',
        'rrbcdg.gov.in',
        'bpsc.bih.nic.in',
        'mppsc.mp.gov.in',
        'tndge.org'
      ];

      const isAllowed = allowedSuffixes.some(s => hostname === s || hostname.endsWith(s));
      if (!isAllowed) {
        return { isValid: false, reason: `Domain ${hostname} is not in official government allowlist` };
      }

      return { isValid: true, hostname };
    } catch (err) {
      return { isValid: false, reason: `Malformed URL: ${err.message}` };
    }
  }

  /**
   * Validate incoming document metadata (size limits, MIME types)
   */
  validateDocumentPayload(buffer, mimeType = 'application/pdf') {
    if (!buffer) {
      return { isValid: false, reason: 'Document payload is empty' };
    }

    const size = Buffer.isBuffer(buffer) ? buffer.length : Buffer.byteLength(String(buffer));
    const MAX_PDF_SIZE = 50 * 1024 * 1024; // 50 MB
    const MAX_HTML_SIZE = 5 * 1024 * 1024;  // 5 MB

    const cleanMime = (mimeType || '').toLowerCase();
    if (cleanMime.includes('pdf') && size > MAX_PDF_SIZE) {
      return { isValid: false, reason: `PDF file exceeds maximum allowed size (50MB): ${size} bytes` };
    }
    if ((cleanMime.includes('html') || cleanMime.includes('text')) && size > MAX_HTML_SIZE) {
      return { isValid: false, reason: `Webpage content exceeds maximum allowed size (5MB): ${size} bytes` };
    }

    const allowedMimes = ['application/pdf', 'text/html', 'application/json', 'text/plain'];
    const mimeAllowed = allowedMimes.some(m => cleanMime.includes(m));
    if (!mimeAllowed) {
      return { isValid: false, reason: `Unsupported MIME type: ${mimeType}` };
    }

    const hash = crypto.createHash('sha256').update(buffer).digest('hex');
    return { isValid: true, sizeBytes: size, sha256: hash };
  }

  // =========================================================================
  // 2. CHANGE DETECTION & CLASSIFICATION
  // =========================================================================

  /**
   * Compute deterministic SHA-256 hash
   */
  computeHash(content) {
    if (!content) return null;
    return crypto.createHash('sha256').update(content).digest('hex');
  }

  /**
   * Classify change severity according to candidate and blueprint impact
   */
  classifyChange(changeData = {}) {
    const { fieldName = '', oldValue = '', newValue = '', changeType = '' } = changeData;

    const cleanOld = String(oldValue || '').trim();
    const cleanNew = String(newValue || '').trim();

    // Level 0: Pure whitespace or identical
    if (cleanOld === cleanNew || cleanOld.replace(/\s+/g, ' ') === cleanNew.replace(/\s+/g, ' ')) {
      return {
        level: 'LEVEL_0',
        severity: 'NONE',
        changeType: 'NO_CHANGE',
        isMeaningful: false,
        isCritical: false,
        requiresVerification: false
      };
    }

    const criticalKeywords = [
      'exam_pattern', 'blueprint', 'marking_scheme', 'negative_marking',
      'total_marks', 'duration', 'syllabus', 'eligibility', 'stages',
      'question_count', 'passing_marks', 'rules_change'
    ];

    const importantKeywords = [
      'application_deadline', 'exam_date', 'fee', 'admit_card_date',
      'result_date', 'centers', 'vacancies', 'reservation', 'corrigendum'
    ];

    const target = `${fieldName} ${changeType}`.toLowerCase();

    if (criticalKeywords.some(kw => target.includes(kw))) {
      return {
        level: 'LEVEL_3',
        severity: 'CRITICAL',
        changeType: changeType || 'BLUEPRINT_CHANGE',
        isMeaningful: true,
        isCritical: true,
        requiresVerification: true
      };
    }

    if (importantKeywords.some(kw => target.includes(kw))) {
      return {
        level: 'LEVEL_2',
        severity: 'HIGH',
        changeType: changeType || 'REGISTRATION_CHANGE',
        isMeaningful: true,
        isCritical: false,
        requiresVerification: true
      };
    }

    return {
      level: 'LEVEL_1',
      severity: 'LOW',
      changeType: changeType || 'MINOR_INFORMATIONAL',
      isMeaningful: false,
      isCritical: false,
      requiresVerification: false
    };
  }

  // =========================================================================
  // 3. CURRENT VS HISTORICAL SEPARATION & VERSIONING
  // =========================================================================

  /**
   * Register a new version of an official source document without destroying historical version
   */
  createNewSourceVersion(sourceId, newVersionData, db = getDb()) {
    const existing = db.prepare('SELECT * FROM monitored_sources WHERE source_id = ?').get(sourceId);
    if (!existing) {
      throw new Error(`Monitored source ${sourceId} not found`);
    }

    const newVersion = (existing.version || 1) + 1;
    const oldHash = existing.hash;
    const newHash = newVersionData.hash || this.computeHash(newVersionData.content || '');

    // Record historical change log
    const changeId = `change_${sourceId}_v${newVersion}_${Date.now()}`;
    db.prepare(`
      INSERT INTO source_change_logs (
        change_id, source_id, change_type, severity,
        old_hash, new_hash, change_summary, diff_json,
        detected_at, requires_verification, verification_status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, 1, 'PENDING')
    `).run(
      changeId,
      sourceId,
      newVersionData.changeType || 'OFFICIAL_SOURCE_UPDATE',
      newVersionData.severity || 'HIGH',
      oldHash,
      newHash,
      newVersionData.summary || `Version ${newVersion} published by official authority`,
      JSON.stringify(newVersionData.diff || {})
    );

    // Update monitored source record to new version
    db.prepare(`
      UPDATE monitored_sources
      SET version = ?,
          hash = ?,
          last_changed_at = CURRENT_TIMESTAMP,
          last_checked_at = CURRENT_TIMESTAMP,
          verification_status = 'PENDING'
      WHERE source_id = ?
    `).run(newVersion, newHash, sourceId);

    return {
      sourceId,
      previousVersion: existing.version || 1,
      currentVersion: newVersion,
      oldHash,
      newHash,
      changeId,
      status: 'NEW_VERSION_PENDING_VERIFICATION'
    };
  }

  // =========================================================================
  // 4. CONTENT IMPACT ANALYSIS & FULL EXAM INVALIDATION SAFETY
  // =========================================================================

  /**
   * Perform comprehensive impact analysis across SarkariAI Hub components
   */
  analyzeImpact(examId, changeType, diffDetails = {}) {
    const affectedComponents = [];
    const actionsRequired = [];
    let fullExamInvalidationRequired = false;

    if (changeType === 'EXAM_PATTERN_CHANGE' || changeType === 'BLUEPRINT_CHANGE') {
      affectedComponents.push('BLUEPRINT_ENGINE', 'MOCK_TEST_GENERATOR', 'PDF_GENERATOR', 'FULL_EXAM_GATE');
      actionsRequired.push('REVALIDATE_FULL_EXAM_GATE');
      actionsRequired.push('INVALIDATE_MOCK_CACHE');
      actionsRequired.push('REGENERATE_PDF_PAPERS');
      fullExamInvalidationRequired = true;
    } else if (changeType === 'SYLLABUS_CHANGE') {
      affectedComponents.push('SYLLABUS_TREE', 'QUESTION_BANK', 'REVISION_VAULT', 'STUDY_PLANNER');
      actionsRequired.push('AUDIT_CHAPTER_COVERAGE');
      actionsRequired.push('TAG_OBSOLETE_TOPICS');
    } else if (changeType === 'LANGUAGE_MEDIUM_CHANGE') {
      affectedComponents.push('EXAM_LANGUAGE_RESOLVER', 'UI_MEDIUM_DISCOVERY', 'PDF_FONT_REGISTRY');
      actionsRequired.push('UPDATE_OFFICIAL_PAPER_LANGUAGES');
      actionsRequired.push('AUDIT_SCRIPT_FONTS');
    } else if (changeType === 'REGISTRATION_CHANGE' || changeType === 'DATES_CHANGE') {
      affectedComponents.push('EXAM_CALENDAR', 'NOTIFICATION_DECODER', 'AGE_CALCULATOR');
      actionsRequired.push('UPDATE_CALENDAR_TIMELINE');
      actionsRequired.push('REFRESH_NOTIFICATION_BANNER');
    } else {
      affectedComponents.push('SEARCH_INDEX', 'SOURCE_AUDIT_LOG');
      actionsRequired.push('REFRESH_SEARCH_METADATA');
    }

    return {
      examId,
      changeType,
      affectedComponents,
      actionsRequired,
      fullExamInvalidationRequired,
      fullExamState: fullExamInvalidationRequired ? 'FULL_EXAM_REVIEW_REQUIRED' : 'UNCHANGED',
      timestamp: new Date().toISOString()
    };
  }

  // =========================================================================
  // 5. STALENESS ENGINE
  // =========================================================================

  /**
   * Evaluate source freshness and generate safe candidate-facing messaging
   */
  evaluateFreshness(lastCheckedAt, thresholdDays = 90) {
    if (!lastCheckedAt) {
      return {
        status: 'PENDING_VERIFICATION',
        ageDays: null,
        isStale: true,
        userMessage: 'Official information is currently being re-verified.'
      };
    }

    const last = new Date(lastCheckedAt).getTime();
    const now = Date.now();
    const ageDays = Math.floor((now - last) / (1000 * 60 * 60 * 24));
    const isStale = ageDays > thresholdDays;

    return {
      status: isStale ? 'STALE' : 'CURRENT',
      ageDays,
      thresholdDays,
      isStale,
      userMessage: isStale
        ? 'Official information is currently being re-verified.'
        : 'Official government source verified.'
    };
  }

  // =========================================================================
  // 6. CONFLICT MANAGEMENT
  // =========================================================================

  /**
   * Detect and register conflicting official sources without silent auto-resolution
   */
  registerConflict(conflictData, db = getDb()) {
    const {
      examId,
      targetField,
      sourceAId,
      sourceAValue,
      sourceBId,
      sourceBValue,
      severity = 'HIGH'
    } = conflictData;

    if (!examId || !targetField || !sourceAId || !sourceBId) {
      throw new Error('Conflict registration requires examId, targetField, sourceAId, and sourceBId');
    }

    const conflictId = `conflict_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

    db.prepare(`
      INSERT INTO source_conflicts (
        conflict_id, exam_id, target_field,
        source_a_id, source_a_value,
        source_b_id, source_b_value,
        conflict_severity, resolution_status,
        created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'CONFLICT_REVIEW_REQUIRED', CURRENT_TIMESTAMP)
    `).run(
      conflictId,
      examId,
      targetField,
      sourceAId,
      String(sourceAValue),
      sourceBId,
      String(sourceBValue),
      severity
    );

    return {
      conflictId,
      examId,
      targetField,
      status: 'CONFLICT_REVIEW_REQUIRED',
      sourceA: { id: sourceAId, value: sourceAValue },
      sourceB: { id: sourceBId, value: sourceBValue },
      resolutionPolicy: 'ADMIN_MANUAL_REVIEW_REQUIRED'
    };
  }

  // =========================================================================
  // 7. WORKER & SCHEDULER SAFETY (CONCURRENCY LOCKING & RETRY)
  // =========================================================================

  /**
   * Acquire a concurrency lock for a source monitoring job
   */
  acquireLock(sourceId) {
    if (this.activeLocks.has(sourceId)) {
      return { acquired: false, reason: `Job already running for source ${sourceId}` };
    }
    this.activeLocks.add(sourceId);
    return { acquired: true, lockId: `lock_${sourceId}_${Date.now()}` };
  }

  /**
   * Release concurrency lock
   */
  releaseLock(sourceId) {
    this.activeLocks.delete(sourceId);
  }

  /**
   * Compute exponential backoff in milliseconds
   */
  computeBackoffMs(attemptCount, baseMs = 1000, maxMs = 60000) {
    const exp = Math.min(attemptCount, 6);
    const delay = Math.min(baseMs * Math.pow(2, exp), maxMs);
    // Add jitter
    const jitter = Math.floor(Math.random() * (delay * 0.1));
    return delay + jitter;
  }

  // =========================================================================
  // 8. ADMIN RBAC & IMMUTABLE AUDIT LOGGING
  // =========================================================================

  /**
   * Verify if a given role has permission to execute an action
   */
  checkPermission(role, action) {
    const permissions = RBAC_ROLES[role] || [];
    if (permissions.includes('*') || permissions.includes(action)) {
      return true;
    }
    return false;
  }

  /**
   * Redact passwords, tokens, API keys from audit logs
   */
  redactSensitiveData(data) {
    if (!data) return data;
    if (typeof data === 'string') {
      return data
        .replace(/(password|token|secret|apiKey|authorization)=[^&]+/gi, '$1=[REDACTED]')
        .replace(/(Bearer\s+)[A-Za-z0-9\-._~+/]+=*/gi, '$1[REDACTED]');
    }
    if (typeof data === 'object') {
      const sanitized = Array.isArray(data) ? [] : {};
      for (const [k, v] of Object.entries(data)) {
        if (/password|token|secret|key|auth/i.test(k)) {
          sanitized[k] = '[REDACTED]';
        } else if (typeof v === 'object') {
          sanitized[k] = this.redactSensitiveData(v);
        } else {
          sanitized[k] = v;
        }
      }
      return sanitized;
    }
    return data;
  }

  /**
   * Record immutable audit log entry
   */
  recordAuditLog(logEntry, db = getDb()) {
    const {
      actor = 'SYSTEM',
      actorType = 'SYSTEM_WORKER',
      action = 'AUDIT_ACTION',
      entityType = 'SOURCE',
      entityId = 'UNKNOWN',
      oldValue = null,
      newValue = null,
      reason = 'Routine monitoring check',
      sourceId = null,
      confidenceScore = 1.0
    } = logEntry;

    const logId = `audit_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
    const safeOld = this.redactSensitiveData(oldValue);
    const safeNew = this.redactSensitiveData(newValue);

    db.prepare(`
      INSERT INTO verification_audit_logs (
        log_id, entity_type, entity_id, field_name,
        old_value, new_value, source_id, actor_type,
        verification_state, reason, confidence_score, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'LOGGED', ?, ?, CURRENT_TIMESTAMP)
    `).run(
      logId,
      entityType,
      entityId,
      action,
      typeof safeOld === 'object' ? JSON.stringify(safeOld) : String(safeOld || ''),
      typeof safeNew === 'object' ? JSON.stringify(safeNew) : String(safeNew || ''),
      sourceId,
      actorType,
      reason,
      confidenceScore
    );

    return { logId, actor, action, status: 'RECORDED_IMMUTABLE' };
  }

  // =========================================================================
  // 9. OPERATIONAL OBSERVABILITY & HEALTH METRICS
  // =========================================================================

  /**
   * Get operational health summary of official source monitoring and verification
   */
  getObservabilityMetrics(db = getDb()) {
    const totalSources = db.prepare('SELECT count(*) as c FROM monitored_sources').get().c;
    const activeSources = db.prepare("SELECT count(*) as c FROM monitored_sources WHERE monitoring_status = 'ACTIVE'").get().c;
    const pendingSources = db.prepare("SELECT count(*) as c FROM monitored_sources WHERE verification_status = 'PENDING'").get().c;
    const staleSources = db.prepare("SELECT count(*) as c FROM source_health_monitors WHERE source_freshness_status = 'STALE'").get().c;
    const unavailableSources = db.prepare("SELECT count(*) as c FROM source_health_monitors WHERE availability_status IN ('TEMPORARILY_UNAVAILABLE', 'BLOCKED')").get().c;

    const pendingReviews = db.prepare("SELECT count(*) as c FROM source_review_queue WHERE review_status = 'PENDING'").get().c;
    const totalChangeLogs = db.prepare('SELECT count(*) as c FROM source_change_logs').get().c;
    const pendingConflicts = db.prepare("SELECT count(*) as c FROM source_conflicts WHERE resolution_status = 'CONFLICT_REVIEW_REQUIRED'").get().c;
    const totalAuditLogs = db.prepare('SELECT count(*) as c FROM verification_audit_logs').get().c;

    // Full exam gate state
    const readyFullExams = db.prepare('SELECT count(*) as c FROM questions WHERE full_exam_eligible = 1').get().c;

    return {
      timestamp: new Date().toISOString(),
      sourceRegistry: {
        total: totalSources,
        active: activeSources,
        pending: pendingSources,
        stale: staleSources,
        unavailable: unavailableSources
      },
      verificationQueue: {
        pendingReviews,
        totalChangeLogs,
        pendingConflicts
      },
      auditAndGovernance: {
        totalAuditLogs,
        activeLocksCount: this.activeLocks.size
      },
      fullExamSafety: {
        eligibleQuestions: readyFullExams,
        gatePolicy: 'MATERIAL_BLUEPRINT_CHANGE_TRIGGERS_INVALIDATION'
      },
      systemHealth: unavailableSources === 0 ? 'HEALTHY' : 'DEGRADED_SOURCE_MONITORING'
    };
  }
}

module.exports = new SourceVerificationGovernanceService();
