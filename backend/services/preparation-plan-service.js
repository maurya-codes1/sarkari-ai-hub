// backend/services/preparation-plan-service.js
// Phase 12: Personalized Preparation Plan Generator & Milestone Management Service
// Grounded in official syllabus hierarchy, candidate target timelines, and weak area analysis.

const { getDb } = require('../db/database');

class PreparationPlanService {
  constructor() {
    this.DEFAULT_DAILY_HOURS = 2.5;
    this.PLAN_STATUSES = {
      ACTIVE: 'ACTIVE',
      PAUSED: 'PAUSED',
      COMPLETED: 'COMPLETED',
      ARCHIVED: 'ARCHIVED'
    };
  }

  /**
   * Generates a structured multi-phase preparation plan based on target exam date and syllabus.
   *
   * @param {object} params
   * @param {string} params.userId
   * @param {string} params.examId
   * @param {string} [params.targetExamDate]
   * @param {number} [params.dailyHours]
   * @param {string} [params.strategyType]
   * @param {object} [db]
   * @returns {object} created preparation plan
   */
  generatePlan(params, db = getDb()) {
    if (!db) throw new Error('Database connection required');
    const { userId, examId, targetExamDate, dailyHours = this.DEFAULT_DAILY_HOURS, strategyType = 'BALANCED_COMPREHENSIVE' } = params;

    if (!userId || !examId) {
      throw new Error('userId and examId are mandatory to generate a preparation plan');
    }

    // Verify exam exists in inventory or registry
    const exam = db.prepare('SELECT * FROM exams WHERE exam_id = ?').get(examId) ||
                 db.prepare('SELECT exam_id, exam_name_en as name FROM nationwide_exam_inventory WHERE exam_id = ?').get(examId);

    if (!exam) {
      throw new Error(`Exam '${examId}' not found in registry`);
    }

    // Retrieve official syllabus topics for the version if available
    let totalTopics = 0;
    try {
      const topCountRow = db.prepare(`
        SELECT COUNT(st.topic_id) as cnt
        FROM syllabus_topics st
        JOIN syllabus_chapters sc ON st.chapter_id = sc.chapter_id
        JOIN syllabi s ON sc.syllabus_id = s.syllabus_id
        JOIN exam_versions ev ON s.exam_version_id = ev.version_id
        WHERE ev.exam_id = ?
      `).get(examId);
      totalTopics = topCountRow ? topCountRow.cnt : 0;
    } catch (e) {
      totalTopics = 0;
    }

    if (totalTopics === 0) {
      totalTopics = 25; // Default standard syllabus units
    }

    // Compute timeline days
    const now = new Date();
    let daysAvailable = 60;
    let targetDateStr = targetExamDate;

    if (targetDateStr) {
      const target = new Date(targetDateStr);
      const diffMs = target - now;
      if (diffMs > 0) {
        daysAvailable = Math.max(7, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
      }
    } else {
      const future = new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000);
      targetDateStr = future.toISOString().split('T')[0];
    }

    // Construct 4 Milestone Phases
    const phase1Days = Math.max(2, Math.round(daysAvailable * 0.40));
    const phase2Days = Math.max(2, Math.round(daysAvailable * 0.30));
    const phase3Days = Math.max(2, Math.round(daysAvailable * 0.20));
    const phase4Days = Math.max(1, daysAvailable - (phase1Days + phase2Days + phase3Days));

    const milestones = [
      {
        milestoneId: 'ms-phase-1',
        title: 'Phase 1: Core Concepts & Syllabus Fundamentals',
        description: 'Complete high-priority chapters and core constitutional/scientific concepts',
        durationDays: phase1Days,
        targetHours: Math.round(phase1Days * dailyHours),
        completed: false,
        topicsTarget: Math.ceil(totalTopics * 0.5)
      },
      {
        milestoneId: 'ms-phase-2',
        title: 'Phase 2: Chapter-wise Practice & Remediation',
        description: 'Targeted drills on high-weightage sections and weak topic mastery',
        durationDays: phase2Days,
        targetHours: Math.round(phase2Days * dailyHours),
        completed: false,
        topicsTarget: Math.ceil(totalTopics * 0.3)
      },
      {
        milestoneId: 'ms-phase-3',
        title: 'Phase 3: Authentic Exam Simulations & Sectional Timed Tests',
        description: 'Official PYQ full mock simulations under strict timed exam constraints',
        durationDays: phase3Days,
        targetHours: Math.round(phase3Days * dailyHours),
        completed: false,
        topicsTarget: Math.ceil(totalTopics * 0.2)
      },
      {
        milestoneId: 'ms-phase-4',
        title: 'Phase 4: High-Yield Spaced Revision & Final Warm-up',
        description: 'Spaced repetition flashcards, formula consolidation, and final review',
        durationDays: phase4Days,
        targetHours: Math.round(phase4Days * dailyHours),
        completed: false,
        topicsTarget: totalTopics
      }
    ];

    const planId = `plan-${userId}-${examId}-${Date.now()}`;

    // Persist to database matching user_preparation_plans schema
    db.prepare(`
      INSERT INTO user_preparation_plans (
        plan_id, user_id, exam_id, target_exam_date,
        daily_study_hours, total_days, strategy_type,
        completed_topics_count, total_topics_count,
        milestones_json, status, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, 0, ?, ?, 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    `).run(
      planId,
      userId,
      examId,
      targetDateStr,
      dailyHours,
      daysAvailable,
      strategyType,
      totalTopics,
      JSON.stringify(milestones)
    );

    return {
      planId,
      userId,
      examId,
      examName: exam.name || examId,
      targetExamDate: targetDateStr,
      dailyStudyHours: dailyHours,
      totalDays: daysAvailable,
      strategyType,
      completedTopicsCount: 0,
      totalTopicsCount: totalTopics,
      milestones,
      status: 'ACTIVE'
    };
  }

  /**
   * Retrieves the current active preparation plan for a user and exam.
   */
  getUserPlan(userId, examId, db = getDb()) {
    if (!db) return null;
    const row = db.prepare(`
      SELECT * FROM user_preparation_plans
      WHERE user_id = ? AND exam_id = ? AND status = 'ACTIVE'
      ORDER BY created_at DESC LIMIT 1
    `).get(userId, examId);

    if (!row) return null;

    return {
      planId: row.plan_id,
      userId: row.user_id,
      examId: row.exam_id,
      targetExamDate: row.target_exam_date,
      dailyStudyHours: row.daily_study_hours,
      totalDays: row.total_days,
      strategyType: row.strategy_type,
      completedTopicsCount: row.completed_topics_count,
      totalTopicsCount: row.total_topics_count,
      milestones: JSON.parse(row.milestones_json || '[]'),
      status: row.status,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  }

  /**
   * Updates milestone completion and recalibrates progress.
   */
  updateMilestoneProgress(planId, milestoneId, db = getDb()) {
    if (!db) return null;
    const row = db.prepare('SELECT * FROM user_preparation_plans WHERE plan_id = ?').get(planId);
    if (!row) throw new Error(`Plan '${planId}' not found`);

    const milestones = JSON.parse(row.milestones_json || '[]');
    let targetFound = false;

    for (const m of milestones) {
      if (m.milestoneId === milestoneId) {
        m.completed = true;
        m.completedAt = new Date().toISOString();
        targetFound = true;
      }
    }

    if (!targetFound) throw new Error(`Milestone '${milestoneId}' not found in plan`);

    const completedMilestones = milestones.filter(m => m.completed).length;
    const completedFraction = completedMilestones / milestones.length;
    const newCompletedTopics = Math.round(completedFraction * row.total_topics_count);
    const newStatus = completedMilestones === milestones.length ? 'COMPLETED' : 'ACTIVE';

    db.prepare(`
      UPDATE user_preparation_plans
      SET milestones_json = ?,
          completed_topics_count = ?,
          status = ?,
          updated_at = CURRENT_TIMESTAMP
      WHERE plan_id = ?
    `).run(JSON.stringify(milestones), newCompletedTopics, newStatus, planId);

    return {
      planId,
      milestoneId,
      completed: true,
      completedTopicsCount: newCompletedTopics,
      totalTopicsCount: row.total_topics_count,
      status: newStatus,
      completedMilestones,
      totalMilestones: milestones.length
    };
  }

  /**
   * Lists all preparation plans for a given user.
   */
  listUserPlans(userId, db = getDb()) {
    if (!db) return [];
    const rows = db.prepare(`
      SELECT p.*, e.name as exam_name
      FROM user_preparation_plans p
      LEFT JOIN exams e ON p.exam_id = e.exam_id
      WHERE p.user_id = ?
      ORDER BY p.updated_at DESC
    `).all(userId);

    return rows.map(r => ({
      planId: r.plan_id,
      userId: r.user_id,
      examId: r.exam_id,
      examName: r.exam_name || r.exam_id,
      targetExamDate: r.target_exam_date,
      dailyStudyHours: r.daily_study_hours,
      totalDays: r.total_days,
      strategyType: r.strategy_type,
      completedTopicsCount: r.completed_topics_count,
      totalTopicsCount: r.total_topics_count,
      milestones: JSON.parse(r.milestones_json || '[]'),
      status: r.status,
      updatedAt: r.updated_at
    }));
  }
}

module.exports = new PreparationPlanService();
