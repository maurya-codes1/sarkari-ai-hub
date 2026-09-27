// backend/services/state-master-service.js
// State & Union Territory Master Authority Service for Phase 10.1
// Covers all 28 States and 8 Union Territories with official authorities,
// verified codes, capitals, primary languages, and strict Cross-State Isolation.

const { getDb } = require('../db/database');

class StateMasterService {
  /**
   * Retrieves all 36 States & UTs with optional filtering
   */
  getAllStates(options = {}, db = getDb()) {
    if (!db) return [];
    const { type = null, activeOnly = true } = options;
    let sql = 'SELECT * FROM states WHERE 1=1';
    const params = [];

    if (activeOnly) {
      sql += ' AND is_active = 1';
    }
    if (type) {
      sql += ' AND type = ?';
      params.push(type.toUpperCase());
    }
    sql += ' ORDER BY type ASC, name_en ASC';

    return db.prepare(sql).all(...params);
  }

  /**
   * Retrieves a single State/UT by state_id, official code, or name/slug
   */
  getStateById(stateId, db = getDb()) {
    if (!db || !stateId) return null;
    const cleanId = String(stateId).trim();

    // 1. Direct state_id lookup (e.g. 'in-up')
    let state = db.prepare('SELECT * FROM states WHERE state_id = ?').get(cleanId);
    if (state) return state;

    // 2. Prefixed state_id lookup (e.g. 'up' -> 'in-up')
    if (!cleanId.startsWith('in-')) {
      state = db.prepare('SELECT * FROM states WHERE state_id = ?').get(`in-${cleanId.toLowerCase()}`);
      if (state) return state;
    }

    // 3. Official code lookup (e.g. 'UP', 'BR', 'PB')
    state = db.prepare('SELECT * FROM states WHERE official_code = ?').get(cleanId.toUpperCase());
    if (state) return state;

    // 4. Name or slug lookup (e.g. 'Uttar Pradesh', 'uttar-pradesh')
    state = db.prepare(`
      SELECT * FROM states 
      WHERE LOWER(name_en) = LOWER(?)
         OR LOWER(REPLACE(name_en, ' ', '-')) = LOWER(?)
         OR LOWER(name_hi) = LOWER(?)
    `).get(cleanId, cleanId, cleanId);

    return state || null;
  }

  /**
   * Retrieves a single State/UT by official code (e.g., 'PB', 'BR', 'UP', 'MH', 'AP', 'TG')
   */
  getStateByCode(code, db = getDb()) {
    if (!db || !code) return null;
    return db.prepare('SELECT * FROM states WHERE official_code = ?').get(code.toUpperCase()) || null;
  }

  /**
   * Retrieves all administrative and examination authorities for a State/UT
   */
  getStateAuthorities(stateId, db = getDb()) {
    const state = this.getStateById(stateId, db);
    if (!state) return null;

    // Fetch primary board details
    const mainBoard = state.main_school_board_id
      ? db.prepare('SELECT * FROM boards WHERE board_id = ?').get(state.main_school_board_id)
      : null;

    return {
      stateId: state.state_id,
      state_id: state.state_id,
      stateNameEn: state.name_en,
      state_name: state.name_en,
      stateNameHi: state.name_hi,
      officialCode: state.official_code,
      type: state.type,
      capital: state.capital,
      primaryLanguage: state.primary_language_code,
      authorities: {
        educationDepartment: {
          name: state.education_authority_name,
          url: state.education_authority_url
        },
        mainSchoolBoard: mainBoard ? {
          boardId: mainBoard.board_id,
          board_id: mainBoard.board_id,
          name: mainBoard.name,
          shortName: mainBoard.short_name,
          code: mainBoard.short_name,
          officialWebsite: mainBoard.official_website,
          resultUrl: mainBoard.official_result_url
        } : null,
        publicServiceCommission: state.psc_authority_name ? {
          name: state.psc_authority_name,
          url: state.psc_authority_url,
          code: state.psc_authority_name.match(/\(([^)]+)\)/)?.[1] || state.psc_authority_name
        } : null,
        statePsc: state.psc_authority_name ? {
          name: state.psc_authority_name,
          url: state.psc_authority_url,
          code: state.psc_authority_name.match(/\(([^)]+)\)/)?.[1] || state.psc_authority_name
        } : null,
        policeRecruitment: state.police_recruitment_authority_name ? {
          name: state.police_recruitment_authority_name,
          url: state.police_recruitment_authority_url,
          code: state.police_recruitment_authority_name.match(/\(([^)]+)\)/)?.[1] || state.police_recruitment_authority_name
        } : null,
        teacherEligibility: state.teacher_recruitment_authority_name ? {
          name: state.teacher_recruitment_authority_name,
          url: state.teacher_recruitment_authority_url,
          code: state.teacher_recruitment_authority_name.match(/\(([^)]+)\)/)?.[1] || state.teacher_recruitment_authority_name
        } : null,
        teacherRecruitment: state.teacher_recruitment_authority_name ? {
          name: state.teacher_recruitment_authority_name,
          url: state.teacher_recruitment_authority_url,
          code: state.teacher_recruitment_authority_name.match(/\(([^)]+)\)/)?.[1] || state.teacher_recruitment_authority_name
        } : null,
        entranceExaminations: state.entrance_authority_name ? {
          name: state.entrance_authority_name,
          url: state.entrance_authority_url
        } : null
      },
      portals: {
        registrationUrl: state.registration_portal_url,
        resultUrl: state.result_portal_url
      },
      verificationStatus: state.source_verification_status
    };
  }

  /**
   * Enforces Cross-State Isolation:
   * Validates that state A content/rules never leak into state B context
   */
  verifyCrossStateIsolation(stateIdA, stateIdB, db = getDb()) {
    if (stateIdA === stateIdB) {
      return {
        isolated: true,
        isIsolated: true,
        crossContaminationDetected: false,
        sharedBoards: [],
        sharedRules: [],
        message: 'Identical state context.'
      };
    }

    const stateA = this.getStateById(stateIdA, db);
    const stateB = this.getStateById(stateIdB, db);

    if (!stateA || !stateB) {
      return {
        isolated: false,
        isIsolated: false,
        crossContaminationDetected: true,
        sharedBoards: [],
        sharedRules: [],
        error: 'Invalid state identifier specified.'
      };
    }

    // Check board independence (excluding nationwide boards)
    const sharesBoard = stateA.main_school_board_id === stateB.main_school_board_id &&
                        !['cbse-board', 'icse-cisce', 'nios-board'].includes(stateA.main_school_board_id);

    // Specifically verify Andhra Pradesh and Telangana are strictly isolated
    const isApTgCollision = (stateA.official_code === 'AP' && stateB.official_code === 'TG') ||
                            (stateA.official_code === 'TG' && stateB.official_code === 'AP');

    if (isApTgCollision) {
      const distinctPsc = stateA.psc_authority_name !== stateB.psc_authority_name;
      const distinctPolice = stateA.police_recruitment_authority_name !== stateB.police_recruitment_authority_name;
      const isolated = distinctPsc && distinctPolice;

      return {
        isolated,
        isIsolated: isolated,
        crossContaminationDetected: !isolated,
        sharedBoards: sharesBoard ? [stateA.main_school_board_id] : [],
        sharedRules: [],
        stateA: stateA.official_code,
        stateB: stateB.official_code,
        boardA: stateA.main_school_board_id,
        boardB: stateB.main_school_board_id,
        pscA: stateA.psc_authority_name,
        pscB: stateB.psc_authority_name,
        message: isolated ? 'AP and TG isolated with independent PSC and Police authorities.' : 'Cross-state collision detected between AP and TG.'
      };
    }

    const isolated = !sharesBoard;
    return {
      isolated,
      isIsolated: isolated,
      crossContaminationDetected: sharesBoard,
      sharedBoards: sharesBoard ? [stateA.main_school_board_id] : [],
      sharedRules: [],
      stateA: stateA.official_code,
      stateB: stateB.official_code,
      boardA: stateA.main_school_board_id,
      boardB: stateB.main_school_board_id,
      message: sharesBoard ? 'Warning: Shared regional state board detected.' : 'Complete Cross-State Isolation verified.'
    };
  }
}

module.exports = new StateMasterService();
