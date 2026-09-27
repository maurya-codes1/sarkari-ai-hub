// backend/services/exam-calendar-service.js
// Unified Exam Calendar Intelligence & Deadline Tracking Engine

const { getDb } = require('../db/database');

class ExamCalendarService {
  /**
   * Fetch calendar events with comprehensive filters
   */
  getCalendarEvents(filters = {}, db = getDb()) {
    let sql = 'SELECT * FROM exam_calendar_events WHERE is_active = 1';
    const params = [];

    if (filters.examId) {
      sql += ' AND exam_id = ?';
      params.push(filters.examId);
    }
    if (filters.eventType) {
      sql += ' AND event_type = ?';
      params.push(filters.eventType);
    }
    if (filters.eventStatus) {
      sql += ' AND event_status = ?';
      params.push(filters.eventStatus);
    }
    if (filters.startDate) {
      sql += ' AND event_date >= ?';
      params.push(filters.startDate);
    }
    if (filters.endDate) {
      sql += ' AND event_date <= ?';
      params.push(filters.endDate);
    }
    if (filters.month) {
      // Month formatted as YYYY-MM
      sql += ' AND event_date LIKE ?';
      params.push(`${filters.month}%`);
    }

    sql += ' ORDER BY event_date ASC, event_type ASC';
    return db.prepare(sql).all(...params);
  }

  /**
   * Get upcoming critical deadlines (e.g. application closing, correction window)
   */
  getUpcomingDeadlines(referenceDate = '2026-07-01', daysAhead = 30, db = getDb()) {
    const ref = new Date(referenceDate);
    const target = new Date(ref.getTime() + daysAhead * 24 * 60 * 60 * 1000);
    const targetDateStr = target.toISOString().split('T')[0];

    return db.prepare(`
      SELECT * FROM exam_calendar_events
      WHERE is_active = 1
        AND event_type IN ('APPLICATION_END', 'CORRECTION_WINDOW', 'EXAM_DATE', 'ADMIT_CARD')
        AND event_date >= ?
        AND event_date <= ?
      ORDER BY event_date ASC
    `).all(referenceDate, targetDateStr);
  }

  /**
   * Add a new calendar event with strict status validation
   */
  addCalendarEvent(eventData, db = getDb()) {
    const validStatuses = ['OFFICIAL', 'PROVISIONAL', 'ESTIMATED', 'HISTORICAL'];
    if (!validStatuses.includes(eventData.eventStatus)) {
      throw new Error(`Invalid event status: ${eventData.eventStatus}. Must be one of: ${validStatuses.join(', ')}`);
    }

    const eventId = `cal-${eventData.examId}-${Date.now()}`;
    db.prepare(`
      INSERT INTO exam_calendar_events (
        event_id, exam_id, version_id, event_type, event_title,
        event_date, event_status, source_id, source_url, notification_ref, is_active
      ) VALUES (
        @eventId, @examId, @versionId, @eventType, @eventTitle,
        @eventDate, @eventStatus, @sourceId, @sourceUrl, @notificationRef, 1
      )
    `).run({
      eventId,
      examId: eventData.examId,
      versionId: eventData.versionId || null,
      eventType: eventData.eventType,
      eventTitle: eventData.eventTitle,
      eventDate: eventData.eventDate,
      eventStatus: eventData.eventStatus,
      sourceId: eventData.sourceId || null,
      sourceUrl: eventData.sourceUrl || null,
      notificationRef: eventData.notificationRef || null
    });

    return { eventId, ...eventData };
  }

  /**
   * Update an existing event (e.g. date postponed)
   */
  updateCalendarEvent(eventId, updates, db = getDb()) {
    const event = db.prepare('SELECT * FROM exam_calendar_events WHERE event_id = ?').get(eventId);
    if (!event) throw new Error(`Calendar event not found: ${eventId}`);

    db.prepare(`
      UPDATE exam_calendar_events
      SET event_date = COALESCE(?, event_date),
          event_status = COALESCE(?, event_status),
          event_title = COALESCE(?, event_title),
          notification_ref = COALESCE(?, notification_ref)
      WHERE event_id = ?
    `).run(
      updates.eventDate || null,
      updates.eventStatus || null,
      updates.eventTitle || null,
      updates.notificationRef || null,
      eventId
    );

    return db.prepare('SELECT * FROM exam_calendar_events WHERE event_id = ?').get(eventId);
  }
}

module.exports = new ExamCalendarService();
