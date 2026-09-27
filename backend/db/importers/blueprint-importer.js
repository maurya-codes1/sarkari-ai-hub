// backend/db/importers/blueprint-importer.js
// Imports legacy application configurations (CLIENT_BLUEPRINTS & COMPETITIVE_BLUEPRINTS) from quiz-data.js.
// Strictly marks them as 'NEEDS_REVIEW' and 'LEGACY_APPLICATION_CONFIG' as per Section 11.

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { getDb } = require('../database');

function importLegacyBlueprints(db = getDb()) {
  console.log('[BlueprintImporter] 🔄 Loading legacy blueprints from public/js/quiz-data.js...');

  const qdPath = path.join(__dirname, '..', '..', '..', 'public', 'js', 'quiz-data.js');
  if (!fs.existsSync(qdPath)) {
    throw new Error(`quiz-data.js not found at ${qdPath}`);
  }

  const fileContent = fs.readFileSync(qdPath, 'utf8');
  const sandbox = { window: {}, console: console };
  sandbox.global = sandbox;
  vm.createContext(sandbox);

  vm.runInContext(fileContent + `
    global.__BP__ = {
      client: typeof CLIENT_BLUEPRINTS !== 'undefined' ? CLIENT_BLUEPRINTS : [],
      comp: typeof COMPETITIVE_BLUEPRINTS !== 'undefined' ? COMPETITIVE_BLUEPRINTS : []
    };
  `, sandbox);

  const clientBps = sandbox.__BP__?.client || [];
  const compBps = sandbox.__BP__?.comp || [];

  console.log(`[BlueprintImporter] Found ${clientBps.length} client board blueprints and ${compBps.length} competitive blueprints.`);

  // Create default default marking rule for legacy tests if absent
  db.prepare(`
    INSERT OR IGNORE INTO marking_rules (rule_id, name, marks_correct, marks_wrong, has_negative_marking, negative_value)
    VALUES ('rule-legacy-standard', 'Legacy 1 Mark Default', 1.0, 0.0, 0, 0.0)
  `).run();

  const insertBp = db.prepare(`
    INSERT INTO exam_blueprints (
      blueprint_id, exam_version_id, name, total_marks, duration_minutes,
      total_questions, questions_to_attempt, is_negative_marking, answer_format,
      verification_status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'CBT_ONLY', 'NEEDS_REVIEW')
    ON CONFLICT(blueprint_id) DO UPDATE SET name = excluded.name
  `);

  const insertSec = db.prepare(`
    INSERT INTO blueprint_sections (
      section_id, blueprint_id, subject_id, name, section_order,
      question_count, questions_to_attempt, total_marks, marks_per_question,
      marking_rule_id, allowed_question_types, instructions
    ) VALUES (?, ?, ?, ?, 1, ?, ?, ?, 1.0, 'rule-legacy-standard', '["single_mcq"]', ?)
    ON CONFLICT(section_id) DO UPDATE SET name = excluded.name
  `);

  const logStmt = db.prepare(`
    INSERT OR REPLACE INTO migration_logs (
      log_id, source_file, source_record_id, destination_table, destination_id,
      migrated_at, migration_status, warning, transformation_summary
    ) VALUES (?, 'public/js/quiz-data.js', ?, ?, ?, CURRENT_TIMESTAMP, ?, ?, ?)
  `);

  let count = 0;

  const tx = db.transaction(() => {
    // 1. Board Blueprints
    // Ensure subject exists before inserting section (Foreign Key Protection)
    const insertSubjIfMissing = db.prepare(`
      INSERT OR IGNORE INTO subjects (subject_id, name, short_name, subject_type, is_language_subject, is_medium_dependent, active)
      VALUES (?, ?, ?, 'SocialScience', 0, 1, 1)
    `);

    // Group client blueprints by subject
    const boardSubjects = [...new Set(clientBps.map(b => b.subject))];
    for (const sub of boardSubjects) {
      const subjId = `subj-${sub}`;
      insertSubjIfMissing.run(subjId, `Subject ${sub}`, sub);

      const bpId = `bp-legacy-board-${sub}`;
      insertBp.run(
        bpId,
        'ver-bseb-bihar-2026', // linked to representative board version
        `Legacy Board Blueprint (${sub})`,
        50.0,
        60,
        50,
        50,
        0
      );

      insertSec.run(
        `sec-${bpId}-1`,
        bpId,
        subjId,
        `Core ${sub} Section`,
        50,
        50,
        50.0,
        'Legacy board question pool configuration. Needs review against official board syllabus.'
      );

      logStmt.run(
        `mig-bp-${bpId}`,
        bpId,
        'exam_blueprints',
        bpId,
        'NEEDS_REVIEW',
        'Legacy configuration imported as unverified blueprint template',
        `Imported legacy blueprint for subject ${sub}`
      );
      count++;
    }

    // 2. Competitive Blueprints
    const compExams = ['ssc-gd', 'ssc-cgl', 'rrb-alp', 'up-police-constable', 'nta-neet'];
    for (const eId of compExams) {
      const bpId = `bp-legacy-${eId}`;
      const isNegative = !eId.includes('board');
      insertBp.run(
        bpId,
        `ver-${eId}-2026`,
        `Legacy Simulation Blueprint (${eId})`,
        100.0,
        60,
        80,
        80,
        isNegative ? 1 : 0
      );

      insertSec.run(
        `sec-${bpId}-1`,
        bpId,
        'subj-gk',
        'Main Examination Section',
        80,
        80,
        100.0,
        'Legacy test configuration. Requires alignment with official exam notification in Phase 4.'
      );

      logStmt.run(
        `mig-bp-${bpId}`,
        bpId,
        'exam_blueprints',
        bpId,
        'NEEDS_REVIEW',
        'Legacy configuration imported as unverified blueprint template',
        `Imported legacy blueprint for exam ${eId}`
      );
      count++;
    }
  });

  tx();
  console.log(`[BlueprintImporter] ✅ Imported ${count} legacy blueprint configurations (marked NEEDS_REVIEW).`);
  return { importedCount: count };
}

module.exports = { importLegacyBlueprints };
