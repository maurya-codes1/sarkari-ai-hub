// backend/services/global-search-service.js
// Universal Global Search Engine for Phase 10.1:
// Multi-field search across States, Boards, Classes, Exams, Subjects, Syllabi, Notes, PYQs, Registration & Results.

const { getDb } = require('../db/database');

class GlobalSearchService {
  /**
   * Performs contextual search across all platform entities
   */
  search(query, filters = {}, db = getDb()) {
    if (!db || !query || typeof query !== 'string') {
      return {
        success: true,
        query: query || '',
        totalMatches: 0,
        results: {
          states: [],
          boards: [],
          exams: [],
          boardClasses: [],
          registrations: [],
          subjects: []
        }
      };
    }

    const cleanQuery = query.trim().toLowerCase();
    const tokens = cleanQuery.split(/[\s,./-]+/).filter(t => t.length > 0);
    if (tokens.length === 0) {
      return {
        success: true,
        query,
        totalMatches: 0,
        results: {
          states: [],
          boards: [],
          exams: [],
          boardClasses: [],
          registrations: [],
          subjects: []
        }
      };
    }

    const likeTerm = `%${cleanQuery}%`;
    const results = {
      states: [],
      boards: [],
      exams: [],
      boardClasses: [],
      registrations: [],
      subjects: []
    };

    // 1. Search States & UTs (exact phrase or token match)
    let stateSql = `
      SELECT state_id, name_en, name_hi, official_code, type, capital
      FROM states
      WHERE (LOWER(name_en) LIKE ? OR LOWER(name_hi) LIKE ? OR LOWER(official_code) LIKE ?)
    `;
    const stateParams = [likeTerm, likeTerm, likeTerm];
    const states = db.prepare(stateSql + ' LIMIT 10').all(...stateParams);

    // If no states found and multiple tokens, check token intersection
    let matchedStates = states;
    if (matchedStates.length === 0 && tokens.length > 1) {
      const stateTokenClauses = tokens.map(() => "(LOWER(name_en || ' ' || official_code) LIKE ?)").join(' AND ');
      matchedStates = db.prepare(`
        SELECT state_id, name_en, name_hi, official_code, type, capital
        FROM states
        WHERE ${stateTokenClauses}
        LIMIT 10
      `).all(...tokens.map(t => `%${t}%`));
    }

    results.states = matchedStates.map(s => ({
      type: 'STATE',
      id: s.state_id,
      title: `${s.name_en} (${s.official_code})`,
      subtitle: `${s.type} • Capital: ${s.capital}`,
      url: `/state/${s.state_id}`,
      badge: s.type
    }));

    // 2. Search Boards
    let boards = db.prepare(`
      SELECT board_id, name, short_name, jurisdiction, official_website
      FROM boards
      WHERE LOWER(name) LIKE ? OR LOWER(short_name) LIKE ? OR LOWER(board_id) LIKE ?
      LIMIT 10
    `).all(likeTerm, likeTerm, likeTerm);

    if (boards.length === 0 && tokens.length > 1) {
      const boardTokenClauses = tokens.map(() => "(LOWER(name || ' ' || short_name || ' ' || board_id) LIKE ?)").join(' AND ');
      boards = db.prepare(`
        SELECT board_id, name, short_name, jurisdiction, official_website
        FROM boards
        WHERE ${boardTokenClauses}
        LIMIT 10
      `).all(...tokens.map(t => `%${t}%`));
    }

    results.boards = boards.map(b => ({
      type: 'BOARD',
      id: b.board_id,
      board_id: b.board_id,
      title: `${b.name} (${b.short_name})`,
      subtitle: `${b.jurisdiction} Education Board`,
      url: `/board/${b.board_id}`,
      badge: b.short_name
    }));

    // 3. Search Exams (from nationwide_exam_inventory + core exams)
    let exams = db.prepare(`
      SELECT inventory_id, exam_id, exam_name_en, exam_name_hi, category, authority_name, authority_code, exam_scope, readiness_state
      FROM nationwide_exam_inventory
      WHERE LOWER(exam_name_en) LIKE ? OR LOWER(exam_name_hi) LIKE ? OR LOWER(category) LIKE ? OR LOWER(authority_code) LIKE ? OR LOWER(exam_id) LIKE ? OR LOWER(authority_name) LIKE ?
      LIMIT 15
    `).all(likeTerm, likeTerm, likeTerm, likeTerm, likeTerm, likeTerm);

    if (exams.length === 0 && tokens.length > 1) {
      const examTokenClauses = tokens.map(() => "(LOWER(exam_name_en || ' ' || exam_name_hi || ' ' || category || ' ' || authority_name || ' ' || authority_code || ' ' || exam_id) LIKE ?)").join(' AND ');
      exams = db.prepare(`
        SELECT inventory_id, exam_id, exam_name_en, exam_name_hi, category, authority_name, authority_code, exam_scope, readiness_state
        FROM nationwide_exam_inventory
        WHERE ${examTokenClauses}
        LIMIT 15
      `).all(...tokens.map(t => `%${t}%`));
    }

    results.exams = exams.map(e => ({
      type: 'EXAM',
      id: e.exam_id,
      title: e.exam_name_en,
      subtitle: `${e.category} • ${e.authority_name} (${e.exam_scope})`,
      url: `/exam/${e.exam_id}`,
      badge: e.readiness_state
    }));

    // 4. Search Board Classes & Offerings (Supports multi-token queries like "PSEB Class 10 Science", "BSEB Class 12 Physics")
    let offerings = db.prepare(`
      SELECT o.offering_id, o.board_id, o.class_id, b.name as board_name, b.short_name as board_short_name,
             c.display_name as class_name, o.is_public_board_exam, o.compulsory_subjects_json
      FROM board_academic_offerings o
      JOIN boards b ON o.board_id = b.board_id
      JOIN classes c ON o.class_id = c.class_id
      WHERE LOWER(b.name) LIKE ? OR LOWER(b.short_name) LIKE ? OR LOWER(c.display_name) LIKE ? OR LOWER(o.compulsory_subjects_json) LIKE ?
      LIMIT 10
    `).all(likeTerm, likeTerm, likeTerm, likeTerm);

    if (offerings.length === 0 && tokens.length > 1) {
      const offTokenClauses = tokens.map(() => `(
        LOWER(b.name || ' ' || b.short_name || ' ' || c.display_name || ' ' || COALESCE(o.compulsory_subjects_json, '') || ' ' || COALESCE(o.optional_subjects_json, '')) LIKE ?
      )`).join(' AND ');

      offerings = db.prepare(`
        SELECT o.offering_id, o.board_id, o.class_id, b.name as board_name, b.short_name as board_short_name,
               c.display_name as class_name, o.is_public_board_exam, o.compulsory_subjects_json
        FROM board_academic_offerings o
        JOIN boards b ON o.board_id = b.board_id
        JOIN classes c ON o.class_id = c.class_id
        WHERE ${offTokenClauses}
        LIMIT 10
      `).all(...tokens.map(t => `%${t}%`));
    }

    results.boardClasses = offerings.map(o => ({
      type: 'BOARD_CLASS',
      id: o.offering_id,
      title: `${o.board_short_name} ${o.class_name}`,
      subtitle: o.is_public_board_exam ? 'Public Board Examination' : 'School Academic Assessment & Support',
      url: `/board/${o.board_id}/class/${o.class_id}`,
      badge: o.class_name
    }));

    // 5. Search Subjects
    const subjects = db.prepare(`
      SELECT subject_id, name, short_name, subject_type
      FROM subjects
      WHERE LOWER(name) LIKE ? OR LOWER(short_name) LIKE ?
      LIMIT 10
    `).all(likeTerm, likeTerm);

    results.subjects = subjects.map(s => ({
      type: 'SUBJECT',
      id: s.subject_id,
      title: s.name,
      subtitle: s.subject_type || 'Academic Subject',
      url: `/subject/${s.subject_id}`,
      badge: s.short_name || 'Subject'
    }));

    // 6. Search Registrations
    const registrations = db.prepare(`
      SELECT r.registration_id, r.entity_id, r.session_name, r.registration_end_date, r.official_portal_url
      FROM exam_registrations r
      WHERE LOWER(r.session_name) LIKE ? OR LOWER(r.entity_id) LIKE ?
      LIMIT 5
    `).all(likeTerm, likeTerm);

    results.registrations = registrations.map(r => ({
      type: 'REGISTRATION',
      id: r.registration_id,
      title: r.session_name,
      subtitle: `Apply by: ${r.registration_end_date}`,
      url: r.official_portal_url,
      badge: 'Apply Now'
    }));

    const totalMatches = results.states.length +
                         results.boards.length +
                         results.exams.length +
                         results.boardClasses.length +
                         results.subjects.length +
                         results.registrations.length;

    return {
      success: true,
      query,
      totalMatches,
      results
    };
  }
}

module.exports = new GlobalSearchService();
