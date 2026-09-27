// backend/services/change-detection-service.js
// Source Change Detection, Multi-Level Classification & Impact Analysis Engine

const crypto = require('crypto');
const { getDb } = require('../db/database');

class ChangeDetectionService {
  /**
   * Classify change severity level according to statutory and candidate impact
   */
  classifyChangeLevel(fieldName, oldValue, newValue) {
    const criticalFields = [
      'exam_date', 'application_end_date', 'application_deadline',
      'min_age', 'max_age', 'educational_qualification',
      'vacancies', 'total_vacancies', 'negative_marking',
      'marking_scheme', 'total_marks', 'duration_minutes',
      'syllabus_topics', 'exam_stages', 'corrigendum_notice'
    ];

    const importantFields = [
      'application_start_date', 'admit_card_date', 'answer_key_date',
      'result_date', 'correction_window_dates', 'application_fee',
      'exam_centers', 'objection_window_dates'
    ];

    const cleanOld = String(oldValue || '').trim();
    const cleanNew = String(newValue || '').trim();

    // Check Level 0: Pure whitespace or identical content
    if (cleanOld === cleanNew || cleanOld.replace(/\s+/g, ' ') === cleanNew.replace(/\s+/g, ' ')) {
      return { level: 'LEVEL_0', isMeaningful: false, isCritical: false };
    }

    // Check Level 3: Critical exam-rule change
    if (criticalFields.includes(fieldName.toLowerCase())) {
      return { level: 'LEVEL_3', isMeaningful: true, isCritical: true };
    }

    // Check Level 2: Important candidate-facing change
    if (importantFields.includes(fieldName.toLowerCase())) {
      return { level: 'LEVEL_2', isMeaningful: true, isCritical: false };
    }

    // Default to Level 1: Minor informational change
    return { level: 'LEVEL_1', isMeaningful: false, isCritical: false };
  }

  /**
   * Determine affected architectural components and candidate workflows
   */
  analyzeImpact(examId, fieldName, changeLevel) {
    const affectedModules = [];
    const candidateActionsRequired = [];

    if (changeLevel === 'LEVEL_3') {
      if (['exam_date', 'application_end_date'].includes(fieldName)) {
        affectedModules.push('exam_calendar', 'application_tracker', 'push_notifications');
        candidateActionsRequired.push('Verify updated examination schedule and submit application before revised deadline.');
      } else if (['marking_scheme', 'negative_marking', 'duration_minutes', 'total_marks'].includes(fieldName)) {
        affectedModules.push('blueprint_engine', 'mock_test_generator', 'score_calculator', 'pdf_engine');
        candidateActionsRequired.push('Review revised marking scheme and question weightage in practice modules.');
      } else if (['syllabus_topics'].includes(fieldName)) {
        affectedModules.push('syllabus_tree', 'question_tagger', 'study_notes');
        candidateActionsRequired.push('Review newly added or modified chapters in official curriculum.');
      } else if (['vacancies', 'total_vacancies'].includes(fieldName)) {
        affectedModules.push('exam_overview', 'seat_matrix');
        candidateActionsRequired.push('Check updated vacancy distribution across categories.');
      }
    } else if (changeLevel === 'LEVEL_2') {
      if (['admit_card_date', 'answer_key_date', 'result_date'].includes(fieldName)) {
        affectedModules.push('exam_calendar', 'candidate_dashboard');
        candidateActionsRequired.push('Download hall ticket or check official key on portal.');
      } else if (['application_fee'].includes(fieldName)) {
        affectedModules.push('registration_service', 'application_tracker');
        candidateActionsRequired.push('Confirm category-wise application fee structure.');
      }
    } else {
      affectedModules.push('source_audit_log');
    }

    return {
      affectedExamId: examId,
      fieldName,
      changeLevel,
      affectedModules,
      candidateActionsRequired,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Detect, classify, record change event, and analyze impact
   */
  detectAndProcessChange(changeData, db = getDb()) {
    const {
      sourceId,
      examId,
      versionId,
      fieldName,
      oldValue,
      newValue,
      previousHash,
      currentHash,
      changeCategory
    } = changeData;

    const classification = this.classifyChangeLevel(fieldName, oldValue, newValue);
    const impact = this.analyzeImpact(examId, fieldName, classification.level);

    const eventId = `evt-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

    db.prepare(`
      INSERT INTO source_change_events (
        event_id, source_id, change_level, change_category, field_name,
        old_value, new_value, previous_hash, current_hash, affected_exam_id,
        affected_version_id, impact_analysis_json, is_meaningful, is_critical,
        is_processed, detected_at, processed_at
      ) VALUES (
        @eventId, @sourceId, @changeLevel, @changeCategory, @fieldName,
        @oldValue, @newValue, @previousHash, @currentHash, @affectedExamId,
        @affectedVersionId, @impactJson, @isMeaningful, @isCritical,
        1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
      )
    `).run({
      eventId,
      sourceId,
      changeLevel: classification.level,
      changeCategory: changeCategory || 'OFFICIAL_NOTIFICATION',
      fieldName,
      oldValue: String(oldValue || ''),
      newValue: String(newValue || ''),
      previousHash: previousHash || null,
      currentHash: currentHash || null,
      affectedExamId: examId || null,
      affectedVersionId: versionId || null,
      impactJson: JSON.stringify(impact),
      isMeaningful: classification.isMeaningful ? 1 : 0,
      isCritical: classification.isCritical ? 1 : 0
    });

    return {
      eventId,
      classification,
      impact
    };
  }

  /**
   * Retrieve logged change events with filtering
   */
  getChangeEvents(filters = {}, db = getDb()) {
    let sql = 'SELECT * FROM source_change_events WHERE 1=1';
    const params = [];

    if (filters.examId) {
      sql += ' AND affected_exam_id = ?';
      params.push(filters.examId);
    }
    if (filters.changeLevel) {
      sql += ' AND change_level = ?';
      params.push(filters.changeLevel);
    }
    if (filters.onlyMeaningful) {
      sql += ' AND is_meaningful = 1';
    }

    sql += ' ORDER BY detected_at DESC';
    return db.prepare(sql).all(...params);
  }

  /**
   * Get impact analysis details for a specific change event
   */
  getImpactAnalysis(eventId, db = getDb()) {
    const event = db.prepare('SELECT * FROM source_change_events WHERE event_id = ?').get(eventId);
    if (!event) return null;
    return {
      eventId: event.event_id,
      changeLevel: event.change_level,
      fieldName: event.field_name,
      oldValue: event.old_value,
      newValue: event.new_value,
      impact: JSON.parse(event.impact_analysis_json || '{}')
    };
  }
}

module.exports = new ChangeDetectionService();
