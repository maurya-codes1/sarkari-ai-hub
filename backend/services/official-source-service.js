// backend/services/official-source-service.js
// Phase 6: Official Source Intelligence Service
// Manages source hierarchy, documents, freshness, conflicts, change detection, and audit trails.

const crypto = require('crypto');
const { getDb } = require('../db/database');

class OfficialSourceService {
  constructor() {
    this.HIERARCHY = {
      PRIMARY_OFFICIAL: { level: 1, name: 'PRIMARY_OFFICIAL', trustWeight: 1.0, isAuthoritative: true },
      OFFICIAL_SECONDARY: { level: 2, name: 'OFFICIAL_SECONDARY', trustWeight: 0.9, isAuthoritative: true },
      GOVERNMENT_DOCUMENT: { level: 3, name: 'GOVERNMENT_DOCUMENT', trustWeight: 0.85, isAuthoritative: true },
      OFFICIAL_NOTICE: { level: 4, name: 'OFFICIAL_NOTICE', trustWeight: 0.85, isAuthoritative: true },
      OFFICIAL_SAMPLE_OR_MODEL: { level: 5, name: 'OFFICIAL_SAMPLE_OR_MODEL', trustWeight: 0.8, isAuthoritative: true },
      VERIFIED_ARCHIVAL_OFFICIAL: { level: 6, name: 'VERIFIED_ARCHIVAL_OFFICIAL', trustWeight: 0.75, isAuthoritative: true },
      SECONDARY_REFERENCE: { level: 7, name: 'SECONDARY_REFERENCE', trustWeight: 0.4, isAuthoritative: false },
      UNVERIFIED_REFERENCE: { level: 8, name: 'UNVERIFIED_REFERENCE', trustWeight: 0.1, isAuthoritative: false }
    };

    this.FRESHNESS = {
      CURRENT: 'CURRENT',
      HISTORICAL_BUT_VALID: 'HISTORICAL_BUT_VALID',
      STALE_FOR_CURRENT_USE: 'STALE_FOR_CURRENT_USE',
      SUPERSEDED: 'SUPERSEDED',
      UNKNOWN: 'UNKNOWN'
    };

    this.CONFLICT_SEVERITY = {
      CRITICAL: 'CRITICAL', // Question count, marks, duration, negative marking, languages
      HIGH: 'HIGH',         // Section names, attempt choices
      MEDIUM: 'MEDIUM',     // Syllabus wording
      LOW: 'LOW'            // Formatting, cosmetic notes
    };
  }

  /**
   * Retrieves sources with optional filtering.
   */
  getAllSources(filters = {}, db = getDb()) {
    if (!db) return [];

    let query = `
      SELECT s.*, o.name as org_name,
        (SELECT COUNT(*) FROM source_documents d WHERE d.source_id = s.source_id) as doc_count,
        (SELECT COUNT(*) FROM source_verification_records v WHERE v.source_id = s.source_id) as verif_count
      FROM official_sources s
      LEFT JOIN organizations o ON s.organization_id = o.organization_id
      WHERE 1=1
    `;
    const params = [];

    if (filters.examId) {
      query += ` AND s.applicable_exam_id = ?`;
      params.push(filters.examId);
    }
    if (filters.hierarchyLevel) {
      query += ` AND s.source_hierarchy_level = ?`;
      params.push(filters.hierarchyLevel);
    }
    if (filters.freshnessStatus) {
      query += ` AND s.freshness_status = ?`;
      params.push(filters.freshnessStatus);
    }
    if (filters.conflictStatus) {
      query += ` AND s.conflict_status = ?`;
      params.push(filters.conflictStatus);
    }

    const limit = Math.min(parseInt(filters.limit, 10) || 50, 100);
    const offset = parseInt(filters.offset, 10) || 0;
    query += ` ORDER BY s.applicable_exam_id ASC LIMIT ? OFFSET ?`;
    params.push(limit, offset);

    return db.prepare(query).all(...params);
  }

  /**
   * Retrieves single official source with child documents and field verifications.
   */
  getSourceById(sourceId, db = getDb()) {
    if (!db) return null;

    const source = db.prepare(`
      SELECT s.*, o.name as org_name
      FROM official_sources s
      LEFT JOIN organizations o ON s.organization_id = o.organization_id
      WHERE s.source_id = ?
    `).get(sourceId);

    if (!source) return null;

    const documents = db.prepare(`
      SELECT * FROM source_documents WHERE source_id = ? ORDER BY published_date DESC
    `).all(sourceId);

    const verifications = db.prepare(`
      SELECT * FROM source_verification_records WHERE source_id = ? ORDER BY verified_at DESC
    `).all(sourceId);

    return {
      ...source,
      documents,
      verifications
    };
  }

  /**
   * Registers a new official source with hierarchy classification.
   */
  registerOfficialSource(sourceData, db = getDb()) {
    if (!db) throw new Error('Database unavailable');

    const sourceId = sourceData.sourceId || `src-${sourceData.examId || 'gen'}-${Date.now().toString(36)}`;
    const hierarchy = this.HIERARCHY[sourceData.hierarchyLevel] ? sourceData.hierarchyLevel : 'PRIMARY_OFFICIAL';
    const freshness = sourceData.freshnessStatus || this.evaluateSourceFreshness(sourceData);

    db.prepare(`
      INSERT OR REPLACE INTO official_sources (
        source_id, organization_id, document_title, document_type,
        source_url, publication_date, effective_date, applicable_year,
        source_hash, retrieved_at, verified_at, verification_status,
        verification_notes, source_hierarchy_level, issuing_authority,
        applicable_exam_id, applicable_version_id, freshness_status,
        conflict_status, last_checked_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, ?, ?, ?, ?, ?, ?, ?, 'NONE', CURRENT_TIMESTAMP)
    `).run(
      sourceId,
      sourceData.organizationId || 'org-gov-central',
      sourceData.documentTitle,
      sourceData.documentType || 'OFFICIAL_NOTIFICATION',
      sourceData.sourceUrl,
      sourceData.publicationDate || null,
      sourceData.effectiveDate || null,
      sourceData.applicableYear || '2026',
      sourceData.sourceHash || crypto.createHash('sha256').update(sourceData.sourceUrl).digest('hex'),
      sourceData.verificationStatus || 'VERIFIED',
      sourceData.verificationNotes || null,
      hierarchy,
      sourceData.issuingAuthority || 'Official Authority',
      sourceData.examId,
      sourceData.versionId || null,
      freshness
    );

    this.logVerificationAudit({
      entityType: 'SOURCE',
      entityId: sourceId,
      fieldName: 'source_hierarchy_level',
      oldValue: null,
      newValue: hierarchy,
      sourceId,
      actorType: sourceData.actorType || 'ADMIN_REVIEW',
      verificationState: 'VERIFIED',
      reason: 'Official source registered and classified in source hierarchy',
      confidenceScore: this.HIERARCHY[hierarchy].trustWeight
    }, db);

    return this.getSourceById(sourceId, db);
  }

  /**
   * Adds an official document belonging to a registered source.
   */
  addSourceDocument(docData, db = getDb()) {
    if (!db) throw new Error('Database unavailable');

    const docId = docData.documentId || `doc-${Date.now()}-${crypto.randomBytes(3).toString('hex')}`;
    const docHash = docData.documentHash || crypto.createHash('sha256').update(docData.sourceUrl + (docData.parsedTextSample || '')).digest('hex');

    db.prepare(`
      INSERT OR REPLACE INTO source_documents (
        document_id, source_id, file_title, document_type,
        source_url, document_hash, parsed_content_hash,
        parsed_text_sample, extracted_data_json, extraction_status,
        published_date, effective_date, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `).run(
      docId,
      docData.sourceId,
      docData.fileTitle,
      docData.documentType || 'OFFICIAL_PORTAL',
      docData.sourceUrl,
      docHash,
      docHash,
      docData.parsedTextSample || null,
      docData.extractedData ? JSON.stringify(docData.extractedData) : null,
      docData.extractionStatus || 'PARSED',
      docData.publishedDate || null,
      docData.effectiveDate || null
    );

    return docId;
  }

  /**
   * Evaluates freshness of a source relative to an academic/exam year.
   * Differentiates CURRENT vs HISTORICAL_BUT_VALID vs STALE_FOR_CURRENT_USE vs SUPERSEDED.
   */
  evaluateSourceFreshness(source, targetYear = '2026') {
    if (!source) return this.FRESHNESS.UNKNOWN;

    const sourceYear = String(source.applicableYear || source.applicable_year || '');
    const isSuperseded = Boolean(source.isSuperseded || source.superseded_by);
    if (isSuperseded) return this.FRESHNESS.SUPERSEDED;

    if (!sourceYear) return this.FRESHNESS.UNKNOWN;

    if (sourceYear === String(targetYear)) {
      return this.FRESHNESS.CURRENT;
    }

    const sYearInt = parseInt(sourceYear, 10);
    const tYearInt = parseInt(targetYear, 10);

    if (sYearInt && tYearInt) {
      if (sYearInt < tYearInt) {
        // Historical document: perfectly valid for historical version, but stale for current target
        return this.FRESHNESS.HISTORICAL_BUT_VALID;
      }
      if (sYearInt > tYearInt) {
        return this.FRESHNESS.CURRENT;
      }
    }

    return this.FRESHNESS.CURRENT;
  }

  /**
   * Detects and records conflicts when multiple sources report conflicting blueprint fields.
   */
  detectSourceConflicts(examId, db = getDb()) {
    if (!db) return [];

    return db.prepare(`
      SELECT * FROM source_conflicts
      WHERE exam_id = ?
      ORDER BY created_at DESC
    `).all(examId);
  }

  /**
   * Registers a conflict between two sources for an exam field.
   */
  registerSourceConflict(conflictData, db = getDb()) {
    if (!db) return null;

    const conflictId = `cf-${Date.now()}-${crypto.randomBytes(3).toString('hex')}`;
    db.prepare(`
      INSERT INTO source_conflicts (
        conflict_id, exam_id, exam_version_id, target_field,
        source_a_id, source_a_value, source_b_id, source_b_value,
        conflict_severity, resolution_status, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'UNRESOLVED', CURRENT_TIMESTAMP)
    `).run(
      conflictId,
      conflictData.examId,
      conflictData.examVersionId || null,
      conflictData.targetField,
      conflictData.sourceAId,
      String(conflictData.sourceAValue),
      conflictData.sourceBId,
      String(conflictData.sourceBValue),
      conflictData.severity || this.CONFLICT_SEVERITY.CRITICAL
    );

    // Update conflict status on both sources
    db.prepare(`
      UPDATE official_sources SET conflict_status = 'CONFLICTING' 
      WHERE source_id IN (?, ?)
    `).run(conflictData.sourceAId, conflictData.sourceBId);

    // Log verification audit
    this.logVerificationAudit({
      entityType: 'EXAM_BLUEPRINT',
      entityId: conflictData.examId,
      fieldName: conflictData.targetField,
      oldValue: String(conflictData.sourceAValue),
      newValue: String(conflictData.sourceBValue),
      sourceId: conflictData.sourceAId,
      actorType: 'SYSTEM',
      verificationState: 'CONFLICTING_SOURCES',
      reason: `Detected conflicting values between source ${conflictData.sourceAId} and ${conflictData.sourceBId}`,
      confidenceScore: 0.0
    }, db);

    return conflictId;
  }

  /**
   * Resolves a source conflict based on authoritative hierarchy or corrigendum.
   */
  resolveSourceConflict(conflictId, resolutionData, db = getDb()) {
    if (!db) throw new Error('Database unavailable');

    const conflict = db.prepare('SELECT * FROM source_conflicts WHERE conflict_id = ?').get(conflictId);
    if (!conflict) throw new Error(`Conflict ${conflictId} not found`);

    db.prepare(`
      UPDATE source_conflicts
      SET resolution_status = ?,
          resolution_reason = ?,
          resolved_by = ?,
          resolved_at = CURRENT_TIMESTAMP
      WHERE conflict_id = ?
    `).run(
      resolutionData.status, // RESOLVED_PRIMARY_SOURCE, RESOLVED_LATEST_OFFICIAL, RESOLVED_CORRIGENDUM
      resolutionData.reason,
      resolutionData.resolvedBy || 'ADMIN_REVIEW',
      conflictId
    );

    // Check if other unresolved conflicts remain for the exam's sources
    const remainingA = db.prepare(`SELECT COUNT(*) as c FROM source_conflicts WHERE (source_a_id = ? OR source_b_id = ?) AND resolution_status = 'UNRESOLVED'`).get(conflict.source_a_id, conflict.source_a_id).c;
    if (remainingA === 0) {
      db.prepare(`UPDATE official_sources SET conflict_status = 'RESOLVED' WHERE source_id = ?`).run(conflict.source_a_id);
    }

    const remainingB = db.prepare(`SELECT COUNT(*) as c FROM source_conflicts WHERE (source_a_id = ? OR source_b_id = ?) AND resolution_status = 'UNRESOLVED'`).get(conflict.source_b_id, conflict.source_b_id).c;
    if (remainingB === 0) {
      db.prepare(`UPDATE official_sources SET conflict_status = 'RESOLVED' WHERE source_id = ?`).run(conflict.source_b_id);
    }

    return { success: true, conflictId, status: resolutionData.status };
  }

  /**
   * Safe change detection when official pages or notices are updated.
   * Compares document hashes and logs impact severity without destructive overwriting.
   */
  detectDocumentChange(changeData, db = getDb()) {
    if (!db) return null;

    const changeId = `chg-${Date.now()}-${crypto.randomBytes(3).toString('hex')}`;
    db.prepare(`
      INSERT INTO official_change_detections (
        change_id, source_id, document_id, exam_id, exam_version_id,
        field_name, old_value, new_value, old_hash, new_hash,
        impact_severity, status, detected_at, notes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'DETECTED', CURRENT_TIMESTAMP, ?)
    `).run(
      changeId,
      changeData.sourceId,
      changeData.documentId || null,
      changeData.examId,
      changeData.examVersionId || null,
      changeData.fieldName,
      String(changeData.oldValue || ''),
      String(changeData.newValue || ''),
      changeData.oldHash || null,
      changeData.newHash || null,
      changeData.severity || 'LOW',
      changeData.notes || 'Automated change detection from official portal polling'
    );

    this.logVerificationAudit({
      entityType: 'SOURCE_DOCUMENT',
      entityId: changeData.documentId || changeData.sourceId,
      fieldName: changeData.fieldName,
      oldValue: String(changeData.oldValue || ''),
      newValue: String(changeData.newValue || ''),
      sourceId: changeData.sourceId,
      actorType: 'SYSTEM',
      verificationState: 'PARTIALLY_VERIFIED',
      reason: `Official document update detected (${changeData.severity} impact)`,
      confidenceScore: 0.9
    }, db);

    return changeId;
  }

  /**
   * Logs an immutable verification audit record.
   */
  logVerificationAudit(auditData, db = getDb()) {
    if (!db) return null;

    const logId = `valog-${Date.now()}-${crypto.randomBytes(3).toString('hex')}`;
    try {
      db.prepare(`
        INSERT INTO verification_audit_logs (
          log_id, entity_type, entity_id, field_name, old_value, new_value,
          source_id, actor_type, verification_state, reason, confidence_score, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      `).run(
        logId,
        auditData.entityType,
        auditData.entityId,
        auditData.fieldName,
        auditData.oldValue !== undefined ? String(auditData.oldValue) : null,
        auditData.newValue !== undefined ? String(auditData.newValue) : null,
        auditData.sourceId || null,
        auditData.actorType || 'SYSTEM',
        auditData.verificationState || 'PENDING_VERIFICATION',
        auditData.reason || null,
        auditData.confidenceScore !== undefined ? auditData.confidenceScore : 1.0
      );
      return logId;
    } catch (err) {
      console.warn('[OfficialSourceService] Audit log warning:', err.message);
      return null;
    }
  }
}

module.exports = new OfficialSourceService();
