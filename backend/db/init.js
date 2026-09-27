// backend/db/init.js
// Safe database initialization runner for npm run db:init
// Applies schema if tables are absent, enables foreign keys and WAL mode, checks integrity.

const fs = require('fs');
const path = require('path');
const { getDb, DB_PATH } = require('./database');

function initDatabase(options = {}) {
  console.log('========================================================');
  console.log('🚀 SARKARIAI HUB — DATABASE INITIALIZATION (PHASE 3)');
  console.log(`📁 Database Path: ${DB_PATH}`);
  console.log('========================================================');

  const db = getDb();
  if (!db) {
    console.error('❌ Failed to obtain database connection.');
    process.exit(1);
  }

  // Check if tables already exist
  const existingTables = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'").all();
  if (existingTables.length > 0 && !options.force) {
    console.log(`ℹ️ Database already initialized with ${existingTables.length} tables.`);
    console.log('🔒 Existing database preserved (Rule: Never destroy existing database).');
    
    // Verify foreign key integrity
    const fkCheck = db.pragma('foreign_key_check');
    if (fkCheck.length === 0) {
      console.log('✅ Foreign Key Integrity Check: PASSED (0 violations).');
    } else {
      console.warn(`⚠️ Warning: ${fkCheck.length} foreign key violation(s) detected:`, fkCheck);
    }

    const quickCheck = db.pragma('quick_check');
    console.log(`✅ SQLite Quick Integrity Check: ${quickCheck[0]?.quick_check || 'ok'}`);
    return { success: true, tableCount: existingTables.length, status: 'ALREADY_EXISTS' };
  }

  // Read and apply schema
  const schemaPath = path.join(__dirname, 'schema.sql');
  if (!fs.existsSync(schemaPath)) {
    console.error(`❌ Schema file missing at ${schemaPath}`);
    process.exit(1);
  }

  const schemaSql = fs.readFileSync(schemaPath, 'utf8');
  console.log('⚙️ Applying Master Schema (37 Core Entities & Audit Logs)...');

  try {
    db.exec(schemaSql);
    const createdTables = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name").all();
    console.log(`✅ Schema applied successfully. Total tables: ${createdTables.length}`);

    // Seed Question Types
    seedQuestionTypes(db);

    // Verify foreign key and storage integrity
    const fkCheck = db.pragma('foreign_key_check');
    console.log(`✅ Foreign Key Check: ${fkCheck.length === 0 ? 'PASSED (0 violations)' : 'VIOLATIONS FOUND'}`);
    
    const quickCheck = db.pragma('quick_check');
    console.log(`✅ SQLite Storage Integrity: ${quickCheck[0]?.quick_check || 'ok'}`);

    console.log('========================================================');
    console.log('🎉 DATABASE INITIALIZATION COMPLETE & READY');
    console.log('========================================================');
    return { success: true, tableCount: createdTables.length, status: 'INITIALIZED' };
  } catch (err) {
    console.error('❌ Error executing schema.sql:', err.message);
    process.exit(1);
  }
}

function seedQuestionTypes(db) {
  const count = db.prepare('SELECT COUNT(*) as c FROM question_types').get().c;
  if (count > 0) return;

  const insert = db.prepare(`
    INSERT OR IGNORE INTO question_types (type_id, name, category, allows_options, requires_manual_evaluation, description)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  const types = [
    ['single_mcq', 'Single Correct Multiple Choice Question', 'Objective', 1, 0, 'Standard 4-option single choice question'],
    ['multiple_mcq', 'Multiple Correct Choice Question', 'Objective', 1, 0, 'One or more options may be correct'],
    ['numerical', 'Numerical Integer / Decimal Input', 'Numerical', 0, 0, 'Candidate inputs numeric value with tolerance'],
    ['short_answer', 'Short Answer Question', 'Subjective', 0, 1, '2-3 marks brief conceptual answer'],
    ['very_short_answer', 'Very Short Answer Question', 'Subjective', 0, 1, '1 mark definition or single sentence answer'],
    ['long_answer', 'Long Descriptive Answer Question', 'Subjective', 0, 1, '4-6 marks detailed essay or derivation'],
    ['assertion_reason', 'Assertion & Reasoning', 'Objective', 1, 0, 'Evaluates statement validity and logical link'],
    ['statement_based', 'Statement I & II Verification', 'Objective', 1, 0, 'Evaluates truth of multiple independent statements'],
    ['match_following', 'Match the Following Column I & II', 'Objective', 1, 0, 'Column pairing matrix question'],
    ['true_false', 'True or False', 'Objective', 1, 0, 'Binary evaluation'],
    ['fill_blank', 'Fill in the Blanks', 'Objective', 0, 0, 'Single word or term completion'],
    ['case_study', 'Case Study / Contextual Problem', 'Objective', 1, 0, 'Passage followed by practical application questions'],
    ['passage_based', 'Reading Comprehension Passage', 'Objective', 1, 0, 'Text excerpt with dependent reading questions'],
    ['diagram_based', 'Diagram / Map / Graph Analysis', 'Objective', 1, 0, 'Visual analysis question'],
    ['coding', 'Programming & Logic Snippet', 'Practical', 0, 0, 'Code output analysis'],
    ['translation', 'Linguistic Translation', 'Subjective', 0, 1, 'Translating text between scheduled languages'],
    ['literature', 'Literature & Poetry Context', 'Subjective', 0, 1, 'Textual criticism and poetic meter interpretation'],
    ['other', 'Custom Assessment Type', 'Objective', 1, 0, 'Extensible custom format']
  ];

  const seedTx = db.transaction(() => {
    for (const t of types) {
      insert.run(...t);
    }
  });
  seedTx();
  console.log(`✅ Seeded ${types.length} standardized Question Types into question_types table.`);
}

if (require.main === module) {
  initDatabase();
}

module.exports = { initDatabase };
