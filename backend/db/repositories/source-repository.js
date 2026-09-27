// backend/db/repositories/source-repository.js
// Modular repository for Official Sources and Audit Verification.

const { getDb, checkDbAvailable } = require('../database');

class SourceRepository {
  constructor(db = null) {
    this._db = db;
  }

  get db() {
    return this._db || getDb();
  }

  isAvailable() {
    return checkDbAvailable();
  }

  getAllSources() {
    if (!this.isAvailable()) return null;
    return this.db.prepare('SELECT * FROM official_sources ORDER BY publication_date DESC, retrieved_at DESC').all();
  }

  getSourceById(sourceId) {
    if (!this.isAvailable()) return null;
    return this.db.prepare('SELECT * FROM official_sources WHERE source_id = ?').get(sourceId) || null;
  }

  getMigrationLogs(limit = 100) {
    if (!this.isAvailable()) return null;
    return this.db.prepare('SELECT * FROM migration_logs ORDER BY migrated_at DESC LIMIT ?').all(limit);
  }
}

module.exports = new SourceRepository();
