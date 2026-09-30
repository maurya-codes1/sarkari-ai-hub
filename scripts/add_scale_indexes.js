/**
 * scripts/add_scale_indexes.js
 * 
 * SARKARIAI HUB — SCALE INDEXING ENGINE (PHASE 17C)
 * 
 * Adds high-performance indexes for large-scale (90k-110k+) question corpus:
 * 1. idx_questions_type on questions(question_type_id)
 * 2. idx_qversions_qid on question_versions(question_id)
 * 3. idx_questions_active_practice on questions(practice_eligible, is_published, subject_id)
 */

const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '../backend/db/sarkari_core.db');
const db = new Database(dbPath);

console.log("=====================================================================");
console.log("⚡ SARKARIAI HUB — ADDING SCALE INDEXES FOR 100K+ CORPUS");
console.log("=====================================================================");

db.exec(`
  CREATE INDEX IF NOT EXISTS idx_questions_type ON questions(question_type_id);
  CREATE INDEX IF NOT EXISTS idx_qversions_qid ON question_versions(question_id);
  CREATE INDEX IF NOT EXISTS idx_questions_active_practice ON questions(practice_eligible, is_published, subject_id);
`);

console.log("✅ Created idx_questions_type");
console.log("✅ Created idx_qversions_qid");
console.log("✅ Created idx_questions_active_practice");
console.log("=====================================================================\n");
