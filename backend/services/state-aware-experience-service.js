// backend/services/state-aware-experience-service.js
// State-Aware User Experience & Cross-State Isolation Engine for Phase 10.1:
// State -> Board/Authority -> Class/Exam -> Stream -> Subject -> Resources
// Guarantees Cross-State Isolation: no content, registration, or dependency leakage.

const { getDb } = require('../db/database');
const stateMasterService = require('./state-master-service');
const schoolBoardAcademicService = require('./school-board-academic-service');
const nationalExamInventoryService = require('./national-exam-inventory-service');
const registrationEligibilityService = require('./registration-eligibility-service');

class StateAwareExperienceService {
  /**
   * Retrieves the complete localized context for a selected State/UT
   * strictly isolated from other states.
   */
  getStateContext(stateId, db = getDb()) {
    if (!db || !stateId) return null;

    const stateAuth = stateMasterService.getStateAuthorities(stateId, db);
    if (!stateAuth) return null;

    // Get boards for this state
    const boards = schoolBoardAcademicService.getBoardsByState(stateAuth.stateId, db);

    // Get state-specific exams
    const exams = nationalExamInventoryService.getExamsByState(stateAuth.stateId, db);

    // Get progression rules for this state's primary board
    let progressionRules = [];
    const mainBoardId = stateAuth.authorities.mainSchoolBoard?.boardId;
    if (mainBoardId) {
      progressionRules = db.prepare(`
        SELECT * FROM academic_dependencies
        WHERE board_id = ?
      `).all(mainBoardId);
    }

    return {
      stateId: stateAuth.stateId,
      state: {
        id: stateAuth.stateId,
        stateId: stateAuth.stateId,
        nameEn: stateAuth.stateNameEn,
        nameHi: stateAuth.stateNameHi,
        code: stateAuth.officialCode,
        type: stateAuth.type,
        capital: stateAuth.capital,
        primaryLanguage: stateAuth.primaryLanguage
      },
      authorities: stateAuth.authorities,
      boards: boards.map(b => ({
        boardId: b.board_id,
        name: b.name,
        shortName: b.short_name,
        code: b.short_name,
        isPrimary: b.isStatePrimary,
        officialWebsite: b.official_website
      })),
      stateExams: exams.stateExams,
      nationalExams: exams.nationalExams,
      progressionRules: progressionRules.map(r => ({
        dependency_id: r.dependency_id,
        rule_code: r.rule_name,
        rule_name: r.rule_name,
        from_class_id: r.from_class_id,
        to_class_id: r.to_class_id,
        min_attendance_pct: r.min_attendance_pct,
        allow_stream_change: r.allow_stream_change,
        official_circular_ref: r.official_circular_ref
      })),
      portals: stateAuth.portals
    };
  }

  /**
   * Constructs the full navigation journey for a candidate:
   * State -> Board -> Class -> Stream -> Subject -> Resource Hub
   */
  buildCandidateJourney(params, db = getDb()) {
    const { stateId, boardId, classId, streamId = null } = params;

    // 1. Verify State Context
    const state = stateId ? stateMasterService.getStateById(stateId, db) : null;

    // 2. Verify Board & Class Context
    let boardProfile = null;
    let offering = null;
    if (boardId) {
      boardProfile = schoolBoardAcademicService.getBoardProfile(boardId, db);
      if (classId) {
        offering = schoolBoardAcademicService.getOffering(boardId, classId, '2024-25', db);
      }
    }

    // 3. Cross-State Isolation Guard
    if (state && boardProfile) {
      if (boardProfile.jurisdiction === 'STATE' && state.main_school_board_id !== boardProfile.boardId) {
        // Enforce boundary check
        const isolationCheck = stateMasterService.verifyCrossStateIsolation(state.state_id, boardProfile.boardId, db);
        if (!isolationCheck.isIsolated) {
          return {
            error: 'CROSS_STATE_MISMATCH',
            message: `Selected board ${boardProfile.shortName} does not belong to state ${state.name_en}. Cross-state leakage prevented.`
          };
        }
      }
    }

    // 4. Registration & Eligibility
    let registration = null;
    let eligibility = null;
    if (offering) {
      registration = registrationEligibilityService.getRegistrationSchedule(offering.offeringId, '2024-25', db);
      eligibility = registrationEligibilityService.getEligibilityCriteria(offering.offeringId, db);
    }

    return {
      success: true,
      journeyPath: {
        state: state ? { id: state.state_id, name: state.name_en, code: state.official_code } : null,
        board: boardProfile ? { id: boardProfile.boardId, name: boardProfile.name, shortName: boardProfile.shortName } : null,
        class: offering ? { id: offering.classId, name: offering.className, isBoardExam: offering.isPublicBoardExam } : null,
        stream: streamId
      },
      academicOffering: offering,
      registrationSchedule: registration,
      eligibilityCriteria: eligibility,
      availableResources: {
        hasSyllabus: Boolean(offering),
        hasNotes: true,
        hasPyq: Boolean(offering && offering.isPublicBoardExam),
        hasPractice: true,
        hasFullMock: Boolean(offering && offering.boardId === 'cbse-board' && offering.classId === 'class-10'),
        hasPdfDownload: true
      }
    };
  }
}

module.exports = new StateAwareExperienceService();
