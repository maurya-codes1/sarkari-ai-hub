// backend/services/vocational-nsqf-service.js
// Phase 15 NSQF & Vocational Education Curriculum Service

const { getDb } = require('../db/database');

class VocationalNsqfService {
  /**
   * Get all NSQF offerings with optional filters
   */
  getOfferings(filters = {}, db = getDb()) {
    let sql = 'SELECT * FROM vocational_nsqf_offerings WHERE 1=1';
    const params = [];

    if (filters.boardId) {
      sql += ' AND board_id = ?';
      params.push(filters.boardId);
    }
    if (filters.classId) {
      sql += ' AND class_id = ?';
      params.push(filters.classId);
    }
    if (filters.nsqfLevel) {
      sql += ' AND nsqf_level = ?';
      params.push(filters.nsqfLevel);
    }
    if (filters.sector) {
      sql += ' AND skill_sector LIKE ?';
      params.push(`%${filters.sector}%`);
    }

    sql += ' ORDER BY class_id ASC, nsqf_level ASC, skill_sector ASC';
    return db.prepare(sql).all(...params);
  }

  /**
   * Get offering by vocational_id
   */
  getOfferingById(vocationalId, db = getDb()) {
    return db.prepare('SELECT * FROM vocational_nsqf_offerings WHERE vocational_id = ?').get(vocationalId);
  }

  /**
   * Get offerings grouped by class_id
   */
  getOfferingsByClass(classId, db = getDb()) {
    return db.prepare('SELECT * FROM vocational_nsqf_offerings WHERE class_id = ?').all(classId);
  }

  /**
   * Add or update NSQF offering
   */
  upsertOffering(data, db = getDb()) {
    const {
      vocationalId,
      boardId,
      classId,
      streamId,
      subjectNameEn,
      subjectNameHi,
      nsqfLevel,
      qualificationCode,
      skillSector,
      jobRole,
      theoryMarks,
      practicalMarks,
      internalMarks,
      certificationBody,
      effectiveYear
    } = data;

    const id = vocationalId || `nsqf_${classId}_${skillSector.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;

    db.prepare(`
      INSERT INTO vocational_nsqf_offerings (
        vocational_id, board_id, class_id, stream_id, subject_name_en, subject_name_hi,
        nsqf_level, qualification_code, skill_sector, job_role, theory_marks,
        practical_marks, internal_marks, certification_body, effective_year, verification_status, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'VERIFIED', CURRENT_TIMESTAMP)
      ON CONFLICT(vocational_id) DO UPDATE SET
        subject_name_en = excluded.subject_name_en,
        nsqf_level = excluded.nsqf_level,
        skill_sector = excluded.skill_sector,
        job_role = excluded.job_role,
        theory_marks = excluded.theory_marks,
        practical_marks = excluded.practical_marks
    `).run(
      id,
      boardId || 'cbse-board',
      classId,
      streamId || 'vocational',
      subjectNameEn,
      subjectNameHi || null,
      nsqfLevel,
      qualificationCode || null,
      skillSector,
      jobRole || subjectNameEn,
      theoryMarks || 50,
      practicalMarks || 50,
      internalMarks || 0,
      certificationBody || 'NSDC',
      effectiveYear || '2024-25'
    );

    return this.getOfferingById(id, db);
  }
}

module.exports = new VocationalNsqfService();
