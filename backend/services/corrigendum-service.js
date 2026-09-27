// backend/services/corrigendum-service.js
// Statutory Corrigenda Management & Historical Audit Preservation Engine

const { getDb } = require('../db/database');

class CorrigendumService {
  /**
   * Register an official corrigendum with full historical preservation
   */
  registerCorrigendum(corrigendumData, db = getDb()) {
    const {
      examId,
      versionId,
      corrigendumNumber,
      title,
      originalSourceId,
      corrigendumSourceId,
      affectedField,
      originalFieldValue,
      correctedFieldValue,
      publicationDate,
      effectiveDate,
      affectedRecords,
      verificationStatus,
      auditHistory
    } = corrigendumData;

    const corrigendumId = `corr-${examId}-${Date.now()}`;

    db.prepare(`
      INSERT INTO corrigenda (
        corrigendum_id, exam_id, version_id, corrigendum_number, title,
        original_source_id, corrigendum_source_id, affected_field,
        original_field_value, corrected_field_value, publication_date,
        effective_date, affected_records_json, verification_status, audit_history_json
      ) VALUES (
        @corrigendumId, @examId, @versionId, @corrigendumNumber, @title,
        @originalSourceId, @corrigendumSourceId, @affectedField,
        @originalFieldValue, @correctedFieldValue, @publicationDate,
        @effectiveDate, @affectedRecordsJson, @verificationStatus, @auditHistoryJson
      )
    `).run({
      corrigendumId,
      examId,
      versionId,
      corrigendumNumber,
      title,
      originalSourceId: originalSourceId || null,
      corrigendumSourceId: corrigendumSourceId || null,
      affectedField,
      originalFieldValue: String(originalFieldValue || ''),
      correctedFieldValue: String(correctedFieldValue || ''),
      publicationDate,
      effectiveDate,
      affectedRecordsJson: JSON.stringify(affectedRecords || []),
      verificationStatus: verificationStatus || 'VERIFIED_OFFICIAL',
      auditHistoryJson: JSON.stringify(auditHistory || { recorded_at: new Date().toISOString() })
    });

    return {
      corrigendumId,
      corrigendumNumber,
      affectedField,
      originalFieldValue,
      correctedFieldValue,
      status: 'REGISTERED_PRESERVED'
    };
  }

  /**
   * Get all corrigenda for a specific exam with full audit history
   */
  getCorrigendaForExam(examId, db = getDb()) {
    const rows = db.prepare(`
      SELECT * FROM corrigenda 
      WHERE exam_id = ? 
      ORDER BY publication_date DESC, created_at DESC
    `).all(examId);

    return rows.map(r => ({
      ...r,
      affected_records: JSON.parse(r.affected_records_json || '[]'),
      audit_history: JSON.parse(r.audit_history_json || '{}')
    }));
  }

  /**
   * Get all corrigenda across all exams
   */
  getAllCorrigenda(filters = {}, db = getDb()) {
    let sql = 'SELECT * FROM corrigenda WHERE 1=1';
    const params = [];

    if (filters.examId) {
      sql += ' AND exam_id = ?';
      params.push(filters.examId);
    }
    if (filters.affectedField) {
      sql += ' AND affected_field = ?';
      params.push(filters.affectedField);
    }

    sql += ' ORDER BY publication_date DESC';
    return db.prepare(sql).all(...params).map(r => ({
      ...r,
      affected_records: JSON.parse(r.affected_records_json || '[]'),
      audit_history: JSON.parse(r.audit_history_json || '{}')
    }));
  }
}

module.exports = new CorrigendumService();
