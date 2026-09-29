// backend/services/source-impact-engine.js
// Phase 15 Graph-Based Content Impact Propagation Engine

const { getDb } = require('../db/database');

class SourceImpactEngine {
  /**
   * Propagate impact across SarkariAI Hub when an official source change is approved
   */
  propagateImpact(changeLog, db = getDb()) {
    if (!changeLog || !changeLog.source_id) {
      return { impactCount: 0, staleCount: 0, impacts: [] };
    }

    const { change_id, source_id, exam_id, change_type, severity, diff_summary } = changeLog;
    const targetEntityId = exam_id || source_id;
    const impacts = [];
    const staleItems = [];

    // 1. Blueprints / Exam Pattern Changes
    if (change_type === 'EXAM_PATTERN_CHANGE' || change_type === 'BLUEPRINT_CHANGE' || change_type === 'SYLLABUS_CHANGE') {
      impacts.push({
        dependentType: 'EXAM_BLUEPRINT',
        dependentId: targetEntityId,
        impactLevel: 'CRITICAL',
        actionRequired: 'REVALIDATE_FULL_EXAM_GATE'
      });
      impacts.push({
        dependentType: 'MOCK_TEST_CACHE',
        dependentId: targetEntityId,
        impactLevel: 'HIGH',
        actionRequired: 'INVALIDATE_CACHE'
      });
      impacts.push({
        dependentType: 'PDF_BLUEPRINT',
        dependentId: targetEntityId,
        impactLevel: 'HIGH',
        actionRequired: 'REGENERATE_PDF_BLUEPRINT'
      });
      impacts.push({
        dependentType: 'SEARCH_INDEX',
        dependentId: targetEntityId,
        impactLevel: 'MEDIUM',
        actionRequired: 'UPDATE_SEARCH_INDEX'
      });

      staleItems.push({
        entityType: 'EXAM_PATTERN',
        entityId: targetEntityId,
        reason: `Official exam pattern changed: ${diff_summary || 'Updated'}`
      });
      staleItems.push({
        entityType: 'MOCK_CONFIG',
        entityId: targetEntityId,
        reason: 'Mock configuration invalidated by source change'
      });
    } else if (change_type === 'ELIGIBILITY_CHANGE' || change_type === 'PHYSICAL_STANDARDS_CHANGE') {
      // 2. Eligibility / Physical standards changes
      impacts.push({
        dependentType: 'ELIGIBILITY_CRITERIA',
        dependentId: targetEntityId,
        impactLevel: 'HIGH',
        actionRequired: 'REVALIDATE_CANDIDATE_MATCHING'
      });
      impacts.push({
        dependentType: 'SEARCH_INDEX',
        dependentId: targetEntityId,
        impactLevel: 'MEDIUM',
        actionRequired: 'UPDATE_SEARCH_INDEX'
      });

      staleItems.push({
        entityType: 'ELIGIBILITY_RULES',
        entityId: targetEntityId,
        reason: `Eligibility criteria updated: ${diff_summary || 'Updated'}`
      });
    } else if (change_type === 'REGISTRATION_CHANGE' || change_type === 'IMPORTANT_DATES_CHANGE' || change_type === 'CORRIGENDUM') {
      // 3. Dates & Corrigenda
      impacts.push({
        dependentType: 'EXAM_CALENDAR',
        dependentId: targetEntityId,
        impactLevel: 'HIGH',
        actionRequired: 'UPDATE_NOTIFICATION_DATES'
      });
      impacts.push({
        dependentType: 'SEARCH_INDEX',
        dependentId: targetEntityId,
        impactLevel: 'LOW',
        actionRequired: 'UPDATE_SEARCH_INDEX'
      });

      staleItems.push({
        entityType: 'TIMELINE_DATES',
        entityId: targetEntityId,
        reason: `Corrigendum/Date update: ${diff_summary || 'Updated'}`
      });
    } else {
      // Minor change
      impacts.push({
        dependentType: 'SEARCH_INDEX',
        dependentId: targetEntityId,
        impactLevel: 'LOW',
        actionRequired: 'UPDATE_SEARCH_INDEX'
      });
    }

    // Persist to content_impact_graph
    const insertedImpacts = [];
    for (const item of impacts) {
      const impactId = `imp_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
      db.prepare(`
        INSERT INTO content_impact_graph (
          impact_id, source_id, source_change_id, dependent_type, dependent_id,
          impact_level, action_required, status, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, 'DETECTED', CURRENT_TIMESTAMP)
      `).run(
        impactId,
        source_id,
        change_id,
        item.dependentType,
        item.dependentId,
        item.impactLevel,
        item.actionRequired
      );
      insertedImpacts.push({ impactId, ...item });
    }

    // Persist to stale_content_tracking
    for (const item of staleItems) {
      const staleId = `stale_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
      db.prepare(`
        INSERT INTO stale_content_tracking (
          stale_id, entity_type, entity_id, stale_reason, source_trigger_id, status, marked_at
        ) VALUES (?, ?, ?, ?, ?, 'STALE', CURRENT_TIMESTAMP)
      `).run(
        staleId,
        item.entityType,
        item.entityId,
        item.reason,
        change_id
      );
    }

    return {
      changeId: change_id,
      sourceId: source_id,
      entityId: targetEntityId,
      impactCount: insertedImpacts.length,
      staleCount: staleItems.length,
      impacts: insertedImpacts
    };
  }

  /**
   * Query stale content
   */
  getStaleContent(filters = {}, db = getDb()) {
    let sql = 'SELECT * FROM stale_content_tracking WHERE 1=1';
    const params = [];

    if (filters.status) {
      sql += ' AND status = ?';
      params.push(filters.status);
    }
    if (filters.entityId) {
      sql += ' AND entity_id = ?';
      params.push(filters.entityId);
    }
    if (filters.entityType) {
      sql += ' AND entity_type = ?';
      params.push(filters.entityType);
    }

    sql += ' ORDER BY marked_at DESC';
    return db.prepare(sql).all(...params);
  }

  /**
   * Mark stale content as resolved
   */
  resolveStaleContent(staleId, db = getDb()) {
    return db.prepare(`
      UPDATE stale_content_tracking
      SET status = 'RESOLVED',
          resolved_at = CURRENT_TIMESTAMP
      WHERE stale_id = ?
    `).run(staleId);
  }

  /**
   * Query content impact graph
   */
  getImpactGraph(filters = {}, db = getDb()) {
    let sql = 'SELECT * FROM content_impact_graph WHERE 1=1';
    const params = [];

    if (filters.status) {
      sql += ' AND status = ?';
      params.push(filters.status);
    }
    if (filters.dependentId) {
      sql += ' AND dependent_id = ?';
      params.push(filters.dependentId);
    }
    if (filters.actionRequired) {
      sql += ' AND action_required = ?';
      params.push(filters.actionRequired);
    }

    sql += ' ORDER BY created_at DESC';
    return db.prepare(sql).all(...params);
  }

  /**
   * Resolve specific impact graph item
   */
  resolveImpactAction(impactId, db = getDb()) {
    return db.prepare(`
      UPDATE content_impact_graph
      SET status = 'RESOLVED'
      WHERE impact_id = ?
    `).run(impactId);
  }

  /**
   * Revalidate all entities for an entityId / examId
   */
  revalidateEntities(entityId, db = getDb()) {
    db.prepare(`
      UPDATE stale_content_tracking
      SET status = 'RESOLVED',
          resolved_at = CURRENT_TIMESTAMP
      WHERE entity_id = ? AND status = 'STALE'
    `).run(entityId);

    db.prepare(`
      UPDATE content_impact_graph
      SET status = 'RESOLVED'
      WHERE dependent_id = ? AND status = 'DETECTED'
    `).run(entityId);

    return { entityId, status: 'RESOLVED' };
  }
}

module.exports = new SourceImpactEngine();
