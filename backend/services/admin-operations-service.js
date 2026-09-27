// backend/services/admin-operations-service.js
// Production Operations, Observability & Admin Override Auditing Engine

const { getDb } = require('../db/database');
const sourceMonitorService = require('./source-monitor-service');

class AdminOperationsService {
  /**
   * Get complete admin operations overview metrics
   */
  getOperationsOverview(db = getDb()) {
    const healthSummary = sourceMonitorService.getSourceHealthSummary(db);

    const pendingChanges = db.prepare('SELECT count(*) as c FROM source_change_events WHERE is_processed = 0').get().c;
    const meaningfulChanges = db.prepare('SELECT count(*) as c FROM source_change_events WHERE is_meaningful = 1').get().c;
    const criticalChanges = db.prepare('SELECT count(*) as c FROM source_change_events WHERE is_critical = 1').get().c;

    const queuedAi = db.prepare("SELECT count(*) as c FROM ai_generation_queue WHERE status = 'QUEUED'").get().c;
    const approvedAi = db.prepare("SELECT count(*) as c FROM ai_generation_queue WHERE status = 'APPROVED'").get().c;
    const rejectedAi = db.prepare("SELECT count(*) as c FROM ai_generation_queue WHERE status = 'REJECTED'").get().c;

    const totalNotifications = db.prepare('SELECT count(*) as c FROM user_notifications').get().c;
    const totalCorrigenda = db.prepare('SELECT count(*) as c FROM corrigenda').get().c;
    const totalCalendarEvents = db.prepare('SELECT count(*) as c FROM exam_calendar_events').get().c;
    const totalOverrides = db.prepare('SELECT count(*) as c FROM admin_audit_overrides').get().c;

    // Full exam readiness distribution
    const gateService = require('./full-exam-gate-service');
    const exams = db.prepare('SELECT exam_id, current_version_id FROM exams').all();
    let readyExams = 0;
    let blockedExams = 0;
    for (const e of exams) {
      const r = gateService.evaluateExamReadiness(e.exam_id, e.current_version_id, db);
      if (r.status === 'READY_FOR_FULL_EXAM') readyExams++;
      else blockedExams++;
    }

    return {
      timestamp: new Date().toISOString(),
      sourceHealth: healthSummary,
      sourceChanges: {
        pendingCount: pendingChanges,
        meaningfulCount: meaningfulChanges,
        criticalCount: criticalChanges
      },
      aiPipeline: {
        queuedCount: queuedAi,
        approvedCount: approvedAi,
        rejectedCount: rejectedAi
      },
      systemCounters: {
        totalNotifications,
        totalCorrigenda,
        totalCalendarEvents,
        totalOverrides
      },
      fullExamReadiness: {
        readyCount: readyExams,
        blockedCount: blockedExams,
        safetyInvariantEnforced: true
      }
    };
  }

  /**
   * Detect stale content across official sources and blueprints
   */
  detectStaleContent(thresholdDays = 90, db = getDb()) {
    const cutoffDate = new Date(Date.now() - thresholdDays * 24 * 60 * 60 * 1000).toISOString();

    const staleSources = db.prepare(`
      SELECT monitor_id, source_id, authority_code, portal_url, last_checked_at, source_freshness_status
      FROM source_health_monitors
      WHERE last_checked_at < ? OR source_freshness_status = 'STALE'
    `).all(cutoffDate);

    return {
      thresholdDays,
      cutoffDate,
      staleCount: staleSources.length,
      staleSources
    };
  }

  /**
   * Record a mandatory auditable admin override
   */
  recordAdminOverride(overrideData, db = getDb()) {
    const {
      adminIdentity,
      targetEntityType,
      targetEntityId,
      fieldName,
      oldValue,
      newValue,
      overrideReason
    } = overrideData;

    if (!adminIdentity || !overrideReason) {
      throw new Error('Admin override requires explicit adminIdentity and non-empty overrideReason.');
    }

    const overrideId = `aao-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    db.prepare(`
      INSERT INTO admin_audit_overrides (
        override_id, admin_identity, target_entity_type, target_entity_id,
        field_name, old_value, new_value, override_reason, created_at
      ) VALUES (
        @overrideId, @adminIdentity, @targetEntityType, @targetEntityId,
        @fieldName, @oldValue, @newValue, @overrideReason, CURRENT_TIMESTAMP
      )
    `).run({
      overrideId,
      adminIdentity,
      targetEntityType,
      targetEntityId,
      fieldName,
      oldValue: String(oldValue || ''),
      newValue: String(newValue || ''),
      overrideReason
    });

    return {
      overrideId,
      status: 'OVERRIDE_RECORDED',
      adminIdentity,
      targetEntityId,
      fieldName
    };
  }

  /**
   * Get override audit trail
   */
  getOverrideAuditTrail(targetEntityId = null, db = getDb()) {
    let sql = 'SELECT * FROM admin_audit_overrides';
    const params = [];
    if (targetEntityId) {
      sql += ' WHERE target_entity_id = ?';
      params.push(targetEntityId);
    }
    sql += ' ORDER BY created_at DESC';
    return db.prepare(sql).all(...params);
  }
}

module.exports = new AdminOperationsService();
