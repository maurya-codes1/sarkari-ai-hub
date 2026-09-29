// backend/services/board-affiliation-service.js
// Phase 15 State / UT Dual-Affiliation & Board Governance Service

const { getDb } = require('../db/database');

class BoardAffiliationService {
  /**
   * Get all board affiliations with optional filters
   */
  getAffiliations(filters = {}, db = getDb()) {
    let sql = 'SELECT * FROM board_affiliations WHERE 1=1';
    const params = [];

    if (filters.stateId) {
      sql += ' AND state_id = ?';
      params.push(filters.stateId);
    }
    if (filters.affiliationType) {
      sql += ' AND affiliation_type = ?';
      params.push(filters.affiliationType);
    }

    sql += ' ORDER BY state_id ASC';
    return db.prepare(sql).all(...params);
  }

  /**
   * Get specific affiliation by state_id
   */
  getAffiliationByState(stateId, db = getDb()) {
    return db.prepare('SELECT * FROM board_affiliations WHERE state_id = ?').all(stateId);
  }

  /**
   * Get all dual-affiliated boards
   */
  getDualAffiliatedBoards(db = getDb()) {
    return db.prepare("SELECT * FROM board_affiliations WHERE affiliation_type LIKE '%DUAL%' OR secondary_board_id IS NOT NULL").all();
  }

  /**
   * Register or update board affiliation
   */
  upsertAffiliation(data, db = getDb()) {
    const {
      affiliationId,
      institutionId,
      institutionName,
      stateId,
      primaryBoardId,
      secondaryBoardId,
      affiliationType,
      authorityOrderRef
    } = data;

    const id = affiliationId || `aff_${stateId.toLowerCase()}_${Date.now()}`;

    db.prepare(`
      INSERT INTO board_affiliations (
        affiliation_id, institution_id, institution_name, state_id,
        primary_board_id, secondary_board_id, affiliation_type,
        authority_order_ref, verification_status, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'VERIFIED', CURRENT_TIMESTAMP)
      ON CONFLICT(affiliation_id) DO UPDATE SET
        institution_name = excluded.institution_name,
        primary_board_id = excluded.primary_board_id,
        secondary_board_id = excluded.secondary_board_id,
        affiliation_type = excluded.affiliation_type,
        authority_order_ref = excluded.authority_order_ref
    `).run(
      id,
      institutionId || null,
      institutionName || 'State Government Schools',
      stateId,
      primaryBoardId,
      secondaryBoardId || null,
      affiliationType || 'DUAL_AFFILIATION',
      authorityOrderRef || null
    );

    return db.prepare('SELECT * FROM board_affiliations WHERE affiliation_id = ?').get(id);
  }
}

module.exports = new BoardAffiliationService();
