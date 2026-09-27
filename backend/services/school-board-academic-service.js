// backend/services/school-board-academic-service.js
// School Board Academic Service for Phase 10.1:
// - State/UT School Boards & Class 9, 10, 11, 12 Academic Structure
// - Distinction between Internal Academic Support (9 & 11) vs Public Board Exams (10 & 12)
// - Board-Specific Academic Dependencies (9->10 and 11->12)
// - Board-Specific Stream & Subject Combinations

const { getDb } = require('../db/database');

class SchoolBoardAcademicService {
  /**
   * Resolves canonical board_id from aliases, short names, or prefixes
   */
  resolveBoardId(boardId, db = getDb()) {
    if (!db || !boardId) return null;
    const cleanId = String(boardId).trim().toLowerCase();

    // 1. Direct match
    let board = db.prepare('SELECT board_id FROM boards WHERE board_id = ?').get(cleanId);
    if (board) return board.board_id;

    // 2. Short name match (e.g. 'CBSE', 'PSEB', 'BSEB', 'UPMSP', 'RBSE', 'TNDGE')
    board = db.prepare('SELECT board_id FROM boards WHERE LOWER(short_name) = ?').get(cleanId);
    if (board) return board.board_id;

    // 3. Prefix match (e.g. 'cbse' -> 'cbse-board', 'pseb' -> 'pseb-punjab')
    board = db.prepare('SELECT board_id FROM boards WHERE board_id LIKE ?').get(`${cleanId}%`);
    if (board) return board.board_id;

    return cleanId;
  }

  /**
   * Retrieves boards associated with a State/UT or national jurisdiction
   */
  getBoardsByState(stateId, db = getDb()) {
    if (!db || !stateId) return [];

    // 1. Resolve state ID
    const cleanStateId = stateId.startsWith('in-') ? stateId : `in-${stateId.toLowerCase()}`;
    const state = db.prepare('SELECT * FROM states WHERE state_id = ? OR official_code = ?').get(cleanStateId, stateId.toUpperCase())
      || db.prepare('SELECT * FROM states WHERE LOWER(name_en) = LOWER(?) OR LOWER(REPLACE(name_en, " ", "-")) = LOWER(?)').get(stateId, stateId);

    if (!state) return [];

    const boards = [];
    if (state.main_school_board_id) {
      const primaryBoard = db.prepare('SELECT * FROM boards WHERE board_id = ?').get(state.main_school_board_id);
      if (primaryBoard) {
        boards.push({
          ...primaryBoard,
          isStatePrimary: true
        });
      }
    }

    // 2. Also include central boards operating nationally (CBSE, CISCE, NIOS)
    const centralBoards = db.prepare(`
      SELECT * FROM boards 
      WHERE jurisdiction = 'NATIONAL' AND board_id != ?
      ORDER BY name ASC
    `).all(state.main_school_board_id || '');

    for (const cb of centralBoards) {
      boards.push({
        ...cb,
        isStatePrimary: false
      });
    }

    return boards;
  }

  /**
   * Retrieves full board profile including classes and official portals
   */
  getBoardProfile(boardId, db = getDb()) {
    if (!db || !boardId) return null;
    const resolvedId = this.resolveBoardId(boardId, db);

    const board = db.prepare('SELECT * FROM boards WHERE board_id = ?').get(resolvedId);
    if (!board) return null;

    // Get offerings across Class 9-12
    const offerings = db.prepare(`
      SELECT o.*, c.display_name as class_display_name, c.numeric_level
      FROM board_academic_offerings o
      JOIN classes c ON o.class_id = c.class_id
      WHERE o.board_id = ?
      ORDER BY c.numeric_level ASC
    `).all(resolvedId);

    // Get board dependencies
    const dependencies = db.prepare(`
      SELECT d.*, c1.display_name as from_class_name, c2.display_name as to_class_name
      FROM academic_dependencies d
      JOIN classes c1 ON d.from_class_id = c1.class_id
      JOIN classes c2 ON d.to_class_id = c2.class_id
      WHERE d.board_id = ?
    `).all(resolvedId);

    const formattedClasses = offerings.map(o => ({
      offeringId: o.offering_id,
      classId: o.class_id,
      className: o.class_display_name,
      numericLevel: o.numeric_level,
      isPublicBoardExam: Boolean(o.is_public_board_exam),
      is_public_board_exam: o.is_public_board_exam,
      is_internal_evaluation: o.is_public_board_exam === 0 ? 1 : 0,
      assessment_model: o.is_public_board_exam ? 'CENTRALIZED_PUBLIC_BOARD_EXAM' : 'CONTINUOUS_COMPREHENSIVE_INTERNAL',
      academicSupportType: o.academic_support_type,
      availableStreams: JSON.parse(o.available_streams_json || '[]'),
      compulsorySubjects: JSON.parse(o.compulsory_subjects_json || '[]'),
      optionalSubjects: JSON.parse(o.optional_subjects_json || '[]'),
      evaluationSummary: o.evaluation_pattern_summary,
      registrationPrerequisite: o.registration_prerequisite_info,
      curriculumUrl: o.official_curriculum_url
    }));

    const formattedDependencies = dependencies.map(d => ({
      dependencyId: d.dependency_id,
      rule_code: d.rule_name,
      fromClass: d.from_class_name,
      toClass: d.to_class_name,
      ruleName: d.rule_name,
      descriptionEn: d.rule_description_en,
      descriptionHi: d.rule_description_hi,
      isMandatory: Boolean(d.is_mandatory),
      minAttendancePct: d.min_attendance_pct,
      allowStreamChange: Boolean(d.allow_stream_change),
      officialCircularRef: d.official_circular_ref
    }));

    return {
      boardId: board.board_id,
      name: board.name,
      shortName: board.short_name,
      jurisdiction: board.jurisdiction,
      boardType: board.board_type,
      officialWebsite: board.official_website,
      resultPortal: board.official_result_url,
      verificationStatus: board.verification_status,
      classes: formattedClasses,
      classesOffered: formattedClasses,
      dependencies: formattedDependencies
    };
  }

  /**
   * Retrieves offering details for a specific board, class, and academic year
   */
  getOffering(boardId, classId, academicYear = '2024-25', db = getDb()) {
    if (!db) return null;
    const resolvedId = this.resolveBoardId(boardId, db);

    const row = db.prepare(`
      SELECT o.*, c.display_name as class_display_name, c.numeric_level, b.name as board_name, b.short_name as board_short_name
      FROM board_academic_offerings o
      JOIN classes c ON o.class_id = c.class_id
      JOIN boards b ON o.board_id = b.board_id
      WHERE o.board_id = ? AND o.class_id = ?
    `).get(resolvedId, classId);

    if (!row) return null;

    return {
      offeringId: row.offering_id,
      boardId: row.board_id,
      boardName: row.board_name,
      boardShortName: row.board_short_name,
      classId: row.class_id,
      className: row.class_display_name,
      numericLevel: row.numeric_level,
      academicYear: row.academic_year,
      isPublicBoardExam: Boolean(row.is_public_board_exam),
      is_public_board_exam: row.is_public_board_exam,
      is_internal_evaluation: row.is_public_board_exam === 0 ? 1 : 0,
      assessment_model: row.is_public_board_exam ? 'CENTRALIZED_PUBLIC_BOARD_EXAM' : 'CONTINUOUS_COMPREHENSIVE_INTERNAL',
      academicSupportType: row.academic_support_type,
      availableStreams: JSON.parse(row.available_streams_json || '[]'),
      compulsorySubjects: JSON.parse(row.compulsory_subjects_json || '[]'),
      optionalSubjects: JSON.parse(row.optional_subjects_json || '[]'),
      evaluationSummary: row.evaluation_pattern_summary,
      registrationPrerequisite: row.registration_prerequisite_info,
      curriculumUrl: row.official_curriculum_url,
      verificationStatus: row.verification_status
    };
  }

  /**
   * Evaluates candidate eligibility for academic progression (9->10 or 11->12)
   * Enforces board-specific requirements: attendance, registration numbers, mandatory languages, stream locks.
   */
  evaluateProgressionEligibility(boardId, fromClassId, toClassId, candidateProfile = {}, db = getDb()) {
    if (!db) return { isEligible: false, errors: ['Database unavailable'], violations: ['Database unavailable'] };
    const resolvedBoardId = this.resolveBoardId(boardId, db);

    const dep = db.prepare(`
      SELECT * FROM academic_dependencies
      WHERE board_id = ? AND from_class_id = ? AND to_class_id = ?
    `).get(resolvedBoardId, fromClassId, toClassId);

    const errors = [];
    const warnings = [];

    // 1. Attendance Check
    const candidateAttendance = Number(candidateProfile.attendancePct) || 0;
    const minAttendance = (dep && dep.min_attendance_pct) ? dep.min_attendance_pct : 75;

    if (candidateProfile.attendancePct !== undefined && candidateAttendance < minAttendance) {
      errors.push(`Minimum 75% attendance required (candidate has ${candidateAttendance}%). Attendance is below the mandatory minimum.`);
    }

    // 2. Class 9 -> 10 Progression
    if (fromClassId === 'class-9' && toClassId === 'class-10') {
      // LOC / Registration check
      if (candidateProfile.registeredInClass9Loc === false) {
        errors.push('Mandatory Class 9 LOC registration continuity not satisfied. Student must be enrolled in board LOC.');
      }

      const subjects = candidateProfile.passedSubjects || candidateProfile.subjectsStudied || [];
      const hasSubject = (subName) => subjects.some(s => s.toLowerCase().includes(subName.toLowerCase()));

      // Board-specific language requirements
      if (resolvedBoardId === 'pseb-punjab') {
        if (!hasSubject('punjabi')) {
          errors.push('Mandatory Punjabi language requirement: Candidate must study and pass Punjabi in Class 9 under PSEB regulations.');
        }
      }

      if (resolvedBoardId === 'upmsp-board') {
        if (!hasSubject('hindi')) {
          errors.push('Hindi subject is mandatory: UPMSP requires passing Hindi in Class 9 for Class 10 board examination registration.');
        }
      }

      if (resolvedBoardId === 'tndge-tamilnadu') {
        if (!hasSubject('tamil')) {
          errors.push('Tamil language is mandatory under Tamil Nadu Learning Act for TNDGE Class 10 examination.');
        }
      }

      // Pre-board / Sent-up check for BSEB
      if (resolvedBoardId === 'bseb-bihar') {
        if (candidateProfile.sentUpExamPassed === false) {
          errors.push('Sent-Up (Pre-board) examination qualification is mandatory for BSEB Class 10 board form clearance.');
        }
      }
    }

    // 3. Class 11 -> 12 Progression (Stream Continuity & Labs)
    if (fromClassId === 'class-11' && toClassId === 'class-12') {
      const isStreamChangeAttempted = Boolean(
        candidateProfile.requestedStreamChange ||
        (candidateProfile.streamInClass11 &&
         candidateProfile.streamRequestedClass12 &&
         candidateProfile.streamInClass11 !== candidateProfile.streamRequestedClass12)
      );

      if (isStreamChangeAttempted && !candidateProfile.formalBoardApproval) {
        errors.push('Stream change between Class 11 and 12 is strictly prohibited without prior formal board approval.');
      }

      if (candidateProfile.practicalRecordCompleted === false || candidateProfile.hasPracticalBacklog) {
        errors.push('Continuous practical laboratory logs from Class 11 are required before Class 12 board practical examination.');
      }
    }

    return {
      isEligible: errors.length === 0,
      boardId: resolvedBoardId,
      ruleName: dep ? dep.rule_name : 'STANDARD_ACADEMIC_PROGRESSION',
      circularRef: dep ? dep.official_circular_ref : null,
      errors,
      violations: errors,
      warnings,
      dependencyDetails: dep ? {
        dependencyType: dep.dependency_type,
        minAttendanceRequired: dep.min_attendance_pct,
        allowStreamChange: Boolean(dep.allow_stream_change),
        ruleDescriptionEn: dep.rule_description_en,
        ruleDescriptionHi: dep.rule_description_hi
      } : null
    };
  }
}

module.exports = new SchoolBoardAcademicService();
