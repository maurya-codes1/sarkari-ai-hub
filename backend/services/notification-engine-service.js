// backend/services/notification-engine-service.js
// Multi-Channel User Notification & Deduplication Engine

const { getDb } = require('../db/database');

class NotificationEngineService {
  /**
   * Get or initialize default user notification preferences
   */
  getUserPreferences(userId, db = getDb()) {
    let prefs = db.prepare('SELECT * FROM user_notification_preferences WHERE user_id = ?').get(userId);
    if (!prefs) {
      const prefId = `unp-${userId}`;
      db.prepare(`
        INSERT INTO user_notification_preferences (
          pref_id, user_id, exam_alerts, application_alerts, result_alerts,
          syllabus_alerts, board_alerts, state_alerts, language, frequency,
          email_enabled, push_enabled
        ) VALUES (
          ?, ?, 1, 1, 1, 1, 1, 1, 'en', 'INSTANT', 0, 0
        )
      `).run(prefId, userId);
      prefs = db.prepare('SELECT * FROM user_notification_preferences WHERE user_id = ?').get(userId);
    }
    return prefs;
  }

  /**
   * Update user preferences
   */
  updateUserPreferences(userId, updates, db = getDb()) {
    this.getUserPreferences(userId, db); // Ensure exists

    db.prepare(`
      UPDATE user_notification_preferences
      SET exam_alerts = COALESCE(?, exam_alerts),
          application_alerts = COALESCE(?, application_alerts),
          result_alerts = COALESCE(?, result_alerts),
          syllabus_alerts = COALESCE(?, syllabus_alerts),
          board_alerts = COALESCE(?, board_alerts),
          state_alerts = COALESCE(?, state_alerts),
          language = COALESCE(?, language),
          frequency = COALESCE(?, frequency),
          email_enabled = COALESCE(?, email_enabled),
          push_enabled = COALESCE(?, push_enabled),
          updated_at = CURRENT_TIMESTAMP
      WHERE user_id = ?
    `).run(
      updates.examAlerts !== undefined ? (updates.examAlerts ? 1 : 0) : null,
      updates.applicationAlerts !== undefined ? (updates.applicationAlerts ? 1 : 0) : null,
      updates.resultAlerts !== undefined ? (updates.resultAlerts ? 1 : 0) : null,
      updates.syllabusAlerts !== undefined ? (updates.syllabusAlerts ? 1 : 0) : null,
      updates.boardAlerts !== undefined ? (updates.boardAlerts ? 1 : 0) : null,
      updates.stateAlerts !== undefined ? (updates.stateAlerts ? 1 : 0) : null,
      updates.language || null,
      updates.frequency || null,
      updates.emailEnabled !== undefined ? (updates.emailEnabled ? 1 : 0) : null,
      updates.pushEnabled !== undefined ? (updates.pushEnabled ? 1 : 0) : null,
      userId
    );

    return db.prepare('SELECT * FROM user_notification_preferences WHERE user_id = ?').get(userId);
  }

  /**
   * Determine if notification is allowed by user preferences
   */
  isNotificationAllowed(prefs, notificationType) {
    if (['EXAM_DATE_CHANGED', 'NEW_NOTIFICATION', 'IMPORTANT_OFFICIAL_UPDATE'].includes(notificationType)) {
      return prefs.exam_alerts === 1;
    }
    if (['APPLICATION_OPEN', 'APPLICATION_DEADLINE', 'DEADLINE_CHANGED'].includes(notificationType)) {
      return prefs.application_alerts === 1;
    }
    if (['ADMIT_CARD_RELEASED', 'ANSWER_KEY_RELEASED', 'RESULT_RELEASED'].includes(notificationType)) {
      return prefs.result_alerts === 1;
    }
    if (['SYLLABUS_CHANGED', 'EXAM_PATTERN_CHANGED', 'CORRIGENDUM'].includes(notificationType)) {
      return prefs.syllabus_alerts === 1;
    }
    return true;
  }

  /**
   * Dispatch a notification to a user with strict deduplication
   */
  dispatchNotification(userId, notificationPayload, db = getDb()) {
    const {
      notificationType,
      title,
      summary,
      affectedExamId,
      severity,
      effectiveDate,
      sourceId,
      sourceUrl,
      eventRef
    } = notificationPayload;

    const prefs = this.getUserPreferences(userId, db);
    if (!this.isNotificationAllowed(prefs, notificationType)) {
      return { status: 'SUPPRESSED_BY_USER_PREFERENCE', userId, notificationType };
    }

    // Construct stable deduplication key
    const deduplicationKey = `${userId}:${notificationType}:${affectedExamId || 'global'}:${eventRef || effectiveDate || 'default'}`;

    // Check if notification already exists
    const existing = db.prepare('SELECT notification_id FROM user_notifications WHERE user_id = ? AND deduplication_key = ?').get(userId, deduplicationKey);
    if (existing) {
      return {
        status: 'DUPLICATE_PREVENTED',
        notificationId: existing.notification_id,
        deduplicationKey
      };
    }

    const notificationId = `notif-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

    db.prepare(`
      INSERT INTO user_notifications (
        notification_id, user_id, notification_type, title, summary,
        affected_exam_id, severity, effective_date, source_id, source_url,
        deduplication_key, is_read, channel, created_at
      ) VALUES (
        @notificationId, @userId, @notificationType, @title, @summary,
        @affectedExamId, @severity, @effectiveDate, @sourceId, @sourceUrl,
        @deduplicationKey, 0, 'IN_APP', CURRENT_TIMESTAMP
      )
    `).run({
      notificationId,
      userId,
      notificationType,
      title,
      summary,
      affectedExamId: affectedExamId || null,
      severity: severity || 'INFO',
      effectiveDate: effectiveDate || null,
      sourceId: sourceId || null,
      sourceUrl: sourceUrl || null,
      deduplicationKey
    });

    return {
      status: 'DISPATCHED',
      notificationId,
      deduplicationKey,
      title,
      userId
    };
  }

  /**
   * Fetch user notifications with unread counts
   */
  getUserNotifications(userId, options = {}, db = getDb()) {
    let sql = 'SELECT * FROM user_notifications WHERE user_id = ?';
    const params = [userId];

    if (options.unreadOnly) {
      sql += ' AND is_read = 0';
    }

    sql += ' ORDER BY created_at DESC LIMIT ?';
    params.push(options.limit || 50);

    const notifications = db.prepare(sql).all(...params);
    const unreadCount = db.prepare('SELECT count(*) as c FROM user_notifications WHERE user_id = ? AND is_read = 0').get(userId).c;

    return {
      notifications,
      unreadCount
    };
  }

  /**
   * Mark notification as read
   */
  markAsRead(notificationId, userId, db = getDb()) {
    db.prepare('UPDATE user_notifications SET is_read = 1 WHERE notification_id = ? AND user_id = ?').run(notificationId, userId);
    return { success: true, notificationId };
  }

  /**
   * Mark all as read for user
   */
  markAllAsRead(userId, db = getDb()) {
    const res = db.prepare('UPDATE user_notifications SET is_read = 1 WHERE user_id = ? AND is_read = 0').run(userId);
    return { success: true, markedCount: res.changes };
  }
}

module.exports = new NotificationEngineService();
