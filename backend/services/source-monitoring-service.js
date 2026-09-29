// backend/services/source-monitoring-service.js
// Phase 15 Official Source Monitoring & Change Detection Engine

const crypto = require('crypto');
const { getDb } = require('../db/database');

class SourceMonitoringService {
  /**
   * SSRF Protection: Validate official domains
   */
  isValidOfficialDomain(urlStr) {
    if (!urlStr || typeof urlStr !== 'string') return false;
    try {
      const parsed = new URL(urlStr);
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
        return false;
      }

      // Allowed government and official academic / testing agency domains
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
        'delhipolice.gov.in',
        'uppbpb.gov.in',
        'biharpolice.bih.nic.in',
        'rrbcdg.gov.in',
        'bpsc.bih.nic.in',
        'mppsc.mp.gov.in'
      ];

      return allowedSuffixes.some(suffix => hostname === suffix || hostname.endsWith(suffix));
    } catch {
      return false;
    }
  }

  /**
   * Normalize HTML / Webpage text content for deterministic hashing
   */
  normalizeHtmlContent(rawHtml) {
    if (!rawHtml) return '';
    return rawHtml
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  /**
   * Compute SHA-256 hash of content
   */
  computeHash(content) {
    if (!content) return null;
    return crypto.createHash('sha256').update(content).digest('hex');
  }

  /**
   * Classify change type and severity based on diff analysis
   */
  classifyChange(changeData) {
    const { changeType } = changeData;
    let computedType = changeType || 'MINOR_CHANGE';
    let severity = 'LOW';

    if (computedType === 'EXAM_PATTERN_CHANGE' || computedType === 'BLUEPRINT_CHANGE') {
      computedType = 'EXAM_PATTERN_CHANGE';
      severity = 'CRITICAL';
    } else if (computedType === 'ELIGIBILITY_CHANGE' || computedType === 'PHYSICAL_STANDARDS_CHANGE') {
      severity = 'HIGH';
    } else if (computedType === 'REGISTRATION_CHANGE' || computedType === 'IMPORTANT_DATES_CHANGE') {
      severity = 'HIGH';
    } else if (computedType === 'CORRIGENDUM' || computedType === 'GAZETTE_NOTIFICATION') {
      computedType = 'CORRIGENDUM';
      severity = 'HIGH';
    } else if (computedType === 'SYLLABUS_CHANGE') {
      severity = 'MEDIUM';
    } else if (computedType === 'MAJOR_CHANGE') {
      severity = 'HIGH';
    } else {
      computedType = 'MINOR_CHANGE';
      severity = 'LOW';
    }

    return { changeType: computedType, severity };
  }

  /**
   * Fetch all monitored sources with optional filtering
   */
  getAllSources(filters = {}, db = getDb()) {
    let sql = 'SELECT * FROM monitored_sources WHERE 1=1';
    const params = [];

    if (filters.status) {
      sql += ' AND monitoring_status = ?';
      params.push(filters.status);
    }
    if (filters.entityId) {
      sql += ' AND entity_id = ?';
      params.push(filters.entityId);
    }
    if (filters.authority) {
      sql += ' AND authority = ?';
      params.push(filters.authority);
    }
    if (filters.sourceType) {
      sql += ' AND source_type = ?';
      params.push(filters.sourceType);
    }

    sql += ' ORDER BY last_checked_at DESC, created_at ASC';
    return db.prepare(sql).all(...params);
  }

  /**
   * Get single source by source_id
   */
  getSourceById(sourceId, db = getDb()) {
    return db.prepare('SELECT * FROM monitored_sources WHERE source_id = ?').get(sourceId);
  }

  /**
   * Execute Source Check & Change Detection
   */
  checkSource(sourceId, options = {}, db = getDb()) {
    const source = this.getSourceById(sourceId, db);
    if (!source) {
      throw new Error(`Monitored source not found for source_id: ${sourceId}`);
    }

    let status = 'ACTIVE';
    let newHash = source.hash;
    let hasChanged = false;
    let changeRecord = null;
    let reviewItem = null;

    if (options.simulateFailure) {
      status = options.failureCode === 403 ? 'BLOCKED' : 'UNAVAILABLE';
    } else if (options.newContent) {
      const normalized = this.normalizeHtmlContent(options.newContent);
      newHash = this.computeHash(normalized);
      if (newHash !== source.hash) {
        hasChanged = true;
      }
    } else if (options.newDocumentBuffer) {
      newHash = this.computeHash(options.newDocumentBuffer);
      if (newHash !== source.hash) {
        hasChanged = true;
      }
    }

    // Update monitored_sources record
    db.prepare(`
      UPDATE monitored_sources
      SET monitoring_status = ?,
          hash = ?,
          last_checked_at = CURRENT_TIMESTAMP,
          last_changed_at = CASE WHEN ? = 1 THEN CURRENT_TIMESTAMP ELSE last_changed_at END
      WHERE source_id = ?
    `).run(
      status,
      newHash,
      hasChanged ? 1 : 0,
      sourceId
    );

    // If change detected, record in source_change_logs and review queue if critical/high
    if (hasChanged) {
      const classification = this.classifyChange({
        changeType: options.changeType || 'MINOR_CHANGE',
        diffSummary: options.diffSummary || 'Content hash divergence detected on official portal'
      });

      const changeId = `change_${sourceId}_${Date.now()}`;
      const reviewRequired = (classification.severity === 'CRITICAL' || classification.severity === 'HIGH' || classification.severity === 'MEDIUM');
      const initialVerificationStatus = reviewRequired ? 'PENDING' : 'APPROVED';

      db.prepare(`
        INSERT INTO source_change_logs (
          change_id, source_id, change_type, severity,
          old_hash, new_hash, change_summary, diff_json,
          detected_at, requires_verification, verification_status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, ?, ?)
      `).run(
        changeId,
        sourceId,
        classification.changeType,
        classification.severity,
        source.hash,
        newHash,
        options.diffSummary || 'Official source content update detected',
        JSON.stringify(options.diffDetails || {}),
        reviewRequired ? 1 : 0,
        initialVerificationStatus
      );

      if (reviewRequired) {
        const reviewId = `rev_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
        db.prepare(`
          INSERT INTO source_review_queue (
            review_id, source_id, change_id, entity_type, entity_id,
            change_type, severity, review_status, detected_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, 'PENDING', CURRENT_TIMESTAMP)
        `).run(
          reviewId,
          sourceId,
          changeId,
          source.entity_type,
          source.entity_id,
          classification.changeType,
          classification.severity
        );

        reviewItem = { reviewId, changeId, reviewStatus: 'PENDING' };
      }

      changeRecord = {
        changeId,
        sourceId,
        entityId: source.entity_id,
        changeType: classification.changeType,
        severity: classification.severity,
        verificationStatus: initialVerificationStatus
      };
    }

    return {
      sourceId,
      entityId: source.entity_id,
      monitoringStatus: status,
      hasChanged,
      changeRecord,
      reviewItem
    };
  }

  /**
   * Get review queue items
   */
  getReviewQueue(filters = {}, db = getDb()) {
    let sql = 'SELECT * FROM source_review_queue WHERE 1=1';
    const params = [];

    if (filters.status) {
      sql += ' AND review_status = ?';
      params.push(filters.status);
    }
    if (filters.severity) {
      sql += ' AND severity = ?';
      params.push(filters.severity);
    }
    if (filters.entityId) {
      sql += ' AND entity_id = ?';
      params.push(filters.entityId);
    }

    sql += ' ORDER BY detected_at DESC';
    return db.prepare(sql).all(...params);
  }

  /**
   * Approve a review queue item and trigger impact propagation
   */
  approveReview(reviewId, reviewer = 'OFFICIAL_AUDITOR', notes = '', db = getDb()) {
    const item = db.prepare('SELECT * FROM source_review_queue WHERE review_id = ?').get(reviewId);
    if (!item) {
      throw new Error(`Review queue item not found: ${reviewId}`);
    }

    db.prepare(`
      UPDATE source_review_queue
      SET review_status = 'APPROVED',
          reviewer = ?,
          resolution_notes = ?,
          resolved_at = CURRENT_TIMESTAMP
      WHERE review_id = ?
    `).run(reviewer, notes, reviewId);

    db.prepare(`
      UPDATE source_change_logs
      SET verification_status = 'APPROVED'
      WHERE change_id = ?
    `).run(item.change_id);

    const changeLog = db.prepare('SELECT * FROM source_change_logs WHERE change_id = ?').get(item.change_id);

    // Propagate content impact
    const sourceImpactEngine = require('./source-impact-engine');
    const impactResults = sourceImpactEngine.propagateImpact({
      change_id: changeLog.change_id,
      source_id: changeLog.source_id,
      exam_id: item.entity_id,
      change_type: changeLog.change_type,
      severity: changeLog.severity,
      diff_summary: changeLog.change_summary
    }, db);

    return {
      reviewId,
      changeId: item.change_id,
      status: 'APPROVED',
      impactResults
    };
  }

  /**
   * Reject a review queue item
   */
  rejectReview(reviewId, reviewer = 'OFFICIAL_AUDITOR', notes = '', db = getDb()) {
    const item = db.prepare('SELECT * FROM source_review_queue WHERE review_id = ?').get(reviewId);
    if (!item) {
      throw new Error(`Review queue item not found: ${reviewId}`);
    }

    db.prepare(`
      UPDATE source_review_queue
      SET review_status = 'REJECTED',
          reviewer = ?,
          resolution_notes = ?,
          resolved_at = CURRENT_TIMESTAMP
      WHERE review_id = ?
    `).run(reviewer, notes, reviewId);

    db.prepare(`
      UPDATE source_change_logs
      SET verification_status = 'REJECTED'
      WHERE change_id = ?
    `).run(item.change_id);

    return {
      reviewId,
      changeId: item.change_id,
      status: 'REJECTED'
    };
  }

  /**
   * Job queue: Enqueue monitoring job
   */
  enqueueJob(sourceId, jobType = 'ROUTINE_CHECK', db = getDb()) {
    const jobId = `job_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
    db.prepare(`
      INSERT INTO source_monitoring_jobs (
        job_id, job_type, source_id, state, attempt_count, max_attempts
      ) VALUES (?, ?, ?, 'QUEUED', 0, 3)
    `).run(jobId, jobType, sourceId);

    return { jobId, sourceId, jobType, state: 'QUEUED' };
  }

  /**
   * Process pending jobs with bounded retries
   */
  processPendingJobs(db = getDb()) {
    const pendingJobs = db.prepare(`
      SELECT * FROM source_monitoring_jobs
      WHERE state = 'QUEUED'
      ORDER BY created_at ASC LIMIT 10
    `).all();

    const processed = [];
    for (const job of pendingJobs) {
      db.prepare(`
        UPDATE source_monitoring_jobs
        SET state = 'RUNNING', started_at = CURRENT_TIMESTAMP
        WHERE job_id = ?
      `).run(job.job_id);

      try {
        const checkResult = this.checkSource(job.source_id, {}, db);
        db.prepare(`
          UPDATE source_monitoring_jobs
          SET state = 'COMPLETED', completed_at = CURRENT_TIMESTAMP
          WHERE job_id = ?
        `).run(job.job_id);

        processed.push({ jobId: job.job_id, state: 'COMPLETED', result: checkResult });
      } catch (err) {
        const nextAttempts = job.attempt_count + 1;
        const newState = nextAttempts >= job.max_attempts ? 'FAILED' : 'QUEUED';

        db.prepare(`
          UPDATE source_monitoring_jobs
          SET state = ?,
              attempt_count = ?,
              last_error = ?,
              completed_at = CASE WHEN ? = 'FAILED' THEN CURRENT_TIMESTAMP ELSE NULL END
          WHERE job_id = ?
        `).run(newState, nextAttempts, err.message, newState, job.job_id);

        processed.push({ jobId: job.job_id, state: newState, error: err.message });
      }
    }

    return processed;
  }

  /**
   * Source change history
   */
  getSourceChanges(filters = {}, db = getDb()) {
    let sql = 'SELECT * FROM source_change_logs WHERE 1=1';
    const params = [];

    if (filters.sourceId) {
      sql += ' AND source_id = ?';
      params.push(filters.sourceId);
    }
    if (filters.changeType) {
      sql += ' AND change_type = ?';
      params.push(filters.changeType);
    }
    if (filters.severity) {
      sql += ' AND severity = ?';
      params.push(filters.severity);
    }
    if (filters.verificationStatus) {
      sql += ' AND verification_status = ?';
      params.push(filters.verificationStatus);
    }

    sql += ' ORDER BY detected_at DESC';
    return db.prepare(sql).all(...params);
  }

  /**
   * Language Script Registry query
   */
  getLanguageScripts(filters = {}, db = getDb()) {
    let sql = 'SELECT * FROM language_script_registry WHERE 1=1';
    const params = [];

    if (filters.direction) {
      sql += ' AND direction = ?';
      params.push(filters.direction);
    }
    if (filters.productionReadiness) {
      sql += ' AND production_readiness = ?';
      params.push(filters.productionReadiness);
    }

    sql += ' ORDER BY language_name ASC';
    return db.prepare(sql).all(...params);
  }

  /**
   * High level summary of all monitored sources & health
   */
  getMonitoringSummary(db = getDb()) {
    const totalSources = db.prepare('SELECT COUNT(*) as count FROM monitored_sources').get().count;
    const healthySources = db.prepare("SELECT COUNT(*) as count FROM monitored_sources WHERE monitoring_status = 'ACTIVE'").get().count;
    const pendingReviews = db.prepare("SELECT COUNT(*) as count FROM source_review_queue WHERE review_status = 'PENDING'").get().count;
    const totalChanges = db.prepare('SELECT COUNT(*) as count FROM source_change_logs').get().count;
    const totalJobs = db.prepare('SELECT COUNT(*) as count FROM source_monitoring_jobs').get().count;

    return {
      totalSources,
      healthySources,
      availabilityRate: totalSources > 0 ? (healthySources / totalSources) : 1.0,
      pendingReviews,
      totalChanges,
      totalJobs
    };
  }
}

module.exports = new SourceMonitoringService();
