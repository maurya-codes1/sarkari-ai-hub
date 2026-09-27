// backend/db/phase6-final-addendum-init.js
// Phase 6 Final Addendum: Content Dependency, Version Snapshots, Language QA & Official-Change Impact
// Non-destructive schema expansion for SarkariAI Hub.

const { getDb } = require('./database');

function initPhase6FinalAddendum(db = getDb()) {
  if (!db) {
    console.error('Database connection unavailable for Phase 6 Final Addendum initialization');
    return false;
  }

  console.log('🔄 Running Phase 6 Final Addendum Database Schema Expansions...');

  db.transaction(() => {
    // 1. Content Dependencies Table
    db.prepare(`
      CREATE TABLE IF NOT EXISTS content_dependencies (
        dependency_id VARCHAR(64) PRIMARY KEY,
        content_type VARCHAR(32) NOT NULL,
        content_id VARCHAR(64) NOT NULL,
        exam_id VARCHAR(64) NOT NULL,
        exam_version_id VARCHAR(64) NOT NULL,
        blueprint_id VARCHAR(64),
        blueprint_version_id VARCHAR(64),
        syllabus_version_id VARCHAR(64),
        language_configuration_id VARCHAR(64),
        content_configuration_version VARCHAR(32) DEFAULT '1.0',
        dependency_state VARCHAR(32) NOT NULL DEFAULT 'CURRENT',
        last_validated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        invalidation_reason TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `).run();

    db.prepare(`CREATE INDEX IF NOT EXISTS idx_content_dep_exam ON content_dependencies(exam_id, exam_version_id)`).run();
    db.prepare(`CREATE INDEX IF NOT EXISTS idx_content_dep_content ON content_dependencies(content_type, content_id)`).run();
    db.prepare(`CREATE INDEX IF NOT EXISTS idx_content_dep_state ON content_dependencies(dependency_state)`).run();

    // 2. Exam Configuration Snapshots Table
    db.prepare(`
      CREATE TABLE IF NOT EXISTS exam_configuration_snapshots (
        snapshot_id VARCHAR(64) PRIMARY KEY,
        exam_id VARCHAR(64) NOT NULL,
        exam_version_id VARCHAR(64) NOT NULL,
        academic_year VARCHAR(32),
        blueprint_id VARCHAR(64) NOT NULL,
        blueprint_version_id VARCHAR(64),
        syllabus_version_id VARCHAR(64),
        language_configuration_id VARCHAR(64),
        snapshot_json TEXT NOT NULL,
        content_readiness_state VARCHAR(32) DEFAULT 'READY',
        question_bank_readiness_state VARCHAR(32) DEFAULT 'SUFFICIENT',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `).run();

    db.prepare(`CREATE INDEX IF NOT EXISTS idx_exam_snap_exam ON exam_configuration_snapshots(exam_id, exam_version_id)`).run();

    // 3. Alter mock_sessions to include snapshot_id if not present
    const mockSessionsCols = db.prepare(`PRAGMA table_info(mock_sessions)`).all().map(c => c.name);
    if (!mockSessionsCols.includes('snapshot_id')) {
      db.prepare(`ALTER TABLE mock_sessions ADD COLUMN snapshot_id TEXT`).run();
      console.log('  + Added snapshot_id column to mock_sessions table');
    }

    // 4. Alter official_change_detections to add affected_content_json, revalidation_status, effective_date if not present
    const changeCols = db.prepare(`PRAGMA table_info(official_change_detections)`).all().map(c => c.name);
    if (!changeCols.includes('affected_content_json')) {
      db.prepare(`ALTER TABLE official_change_detections ADD COLUMN affected_content_json TEXT`).run();
      console.log('  + Added affected_content_json to official_change_detections table');
    }
    if (!changeCols.includes('revalidation_status')) {
      db.prepare(`ALTER TABLE official_change_detections ADD COLUMN revalidation_status VARCHAR(32) DEFAULT 'PENDING'`).run();
      console.log('  + Added revalidation_status to official_change_detections table');
    }
    if (!changeCols.includes('effective_date')) {
      db.prepare(`ALTER TABLE official_change_detections ADD COLUMN effective_date VARCHAR(64)`).run();
      console.log('  + Added effective_date to official_change_detections table');
    }

    // 5. Seed initial baseline content dependencies for core verified exams (e.g. SSC CGL, RRB ALP, etc.)
    const seedDependencies = [
      {
        dependency_id: 'dep-cgl-blueprint-2026',
        content_type: 'BLUEPRINT',
        content_id: 'bp-verified-ssc-cgl',
        exam_id: 'ssc-cgl',
        exam_version_id: 'ver-ssc-cgl-2026',
        blueprint_id: 'bp-verified-ssc-cgl',
        blueprint_version_id: 'bp-ver-1.0',
        syllabus_version_id: 'syl-ssc-cgl-2026',
        language_configuration_id: 'lang-ssc-cgl-2026',
        content_configuration_version: '1.0',
        dependency_state: 'CURRENT'
      },
      {
        dependency_id: 'dep-cgl-syllabus-2026',
        content_type: 'SYLLABUS',
        content_id: 'syl-ssc-cgl-2026',
        exam_id: 'ssc-cgl',
        exam_version_id: 'ver-ssc-cgl-2026',
        blueprint_id: 'bp-verified-ssc-cgl',
        blueprint_version_id: 'bp-ver-1.0',
        syllabus_version_id: 'syl-ssc-cgl-2026',
        language_configuration_id: 'lang-ssc-cgl-2026',
        content_configuration_version: '1.0',
        dependency_state: 'CURRENT'
      },
      {
        dependency_id: 'dep-cgl-mock-2026',
        content_type: 'MOCK',
        content_id: 'mock-config-ssc-cgl',
        exam_id: 'ssc-cgl',
        exam_version_id: 'ver-ssc-cgl-2026',
        blueprint_id: 'bp-verified-ssc-cgl',
        blueprint_version_id: 'bp-ver-1.0',
        syllabus_version_id: 'syl-ssc-cgl-2026',
        language_configuration_id: 'lang-ssc-cgl-2026',
        content_configuration_version: '1.0',
        dependency_state: 'CURRENT'
      },
      {
        dependency_id: 'dep-cgl-pdf-2026',
        content_type: 'PDF_CONFIG',
        content_id: 'pdf-config-ssc-cgl',
        exam_id: 'ssc-cgl',
        exam_version_id: 'ver-ssc-cgl-2026',
        blueprint_id: 'bp-verified-ssc-cgl',
        blueprint_version_id: 'bp-ver-1.0',
        syllabus_version_id: 'syl-ssc-cgl-2026',
        language_configuration_id: 'lang-ssc-cgl-2026',
        content_configuration_version: '1.0',
        dependency_state: 'CURRENT'
      }
    ];

    const insertDep = db.prepare(`
      INSERT OR IGNORE INTO content_dependencies (
        dependency_id, content_type, content_id, exam_id, exam_version_id,
        blueprint_id, blueprint_version_id, syllabus_version_id, language_configuration_id,
        content_configuration_version, dependency_state
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    seedDependencies.forEach(d => {
      insertDep.run(
        d.dependency_id,
        d.content_type,
        d.content_id,
        d.exam_id,
        d.exam_version_id,
        d.blueprint_id,
        d.blueprint_version_id,
        d.syllabus_version_id,
        d.language_configuration_id,
        d.content_configuration_version,
        d.dependency_state
      );
    });

    // 6. Seed initial baseline snapshot for SSC CGL 2026
    const sscCglSnapshot = {
      snapshot_id: 'snap-ssc-cgl-2026-v1',
      exam_id: 'ssc-cgl',
      exam_version_id: 'ver-ssc-cgl-2026',
      academic_year: '2025-2026',
      blueprint_id: 'bp-verified-ssc-cgl',
      blueprint_version_id: 'bp-ver-1.0',
      syllabus_version_id: 'syl-ssc-cgl-2026',
      language_configuration_id: 'lang-ssc-cgl-2026',
      content_readiness_state: 'READY',
      question_bank_readiness_state: 'SUFFICIENT',
      snapshot_json: JSON.stringify({
        examName: 'SSC CGL (Combined Graduate Level)',
        versionId: 'ver-ssc-cgl-2026',
        totalQuestions: 100,
        totalMarks: 200,
        durationMinutes: 60,
        isNegativeMarking: true,
        negativeValue: 0.5,
        paperMedium: 'hi,en',
        sections: [
          { sectionOrder: 1, subjectId: 'subj-reasoning', questionCount: 25, marksCorrect: 2, marksWrong: 0.5 },
          { sectionOrder: 2, subjectId: 'subj-gk', questionCount: 25, marksCorrect: 2, marksWrong: 0.5 },
          { sectionOrder: 3, subjectId: 'subj-math', questionCount: 25, marksCorrect: 2, marksWrong: 0.5 },
          { sectionOrder: 4, subjectId: 'subj-english', questionCount: 25, marksCorrect: 2, marksWrong: 0.5 }
        ],
        languageConfig: {
          paperMedium: 'hi,en',
          questionLanguages: ['hi', 'en'],
          optionLanguages: ['hi', 'en'],
          instructionLanguages: ['hi', 'en'],
          isBilingual: true
        }
      })
    };

    db.prepare(`
      INSERT OR IGNORE INTO exam_configuration_snapshots (
        snapshot_id, exam_id, exam_version_id, academic_year,
        blueprint_id, blueprint_version_id, syllabus_version_id, language_configuration_id,
        snapshot_json, content_readiness_state, question_bank_readiness_state
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      sscCglSnapshot.snapshot_id,
      sscCglSnapshot.exam_id,
      sscCglSnapshot.exam_version_id,
      sscCglSnapshot.academic_year,
      sscCglSnapshot.blueprint_id,
      sscCglSnapshot.blueprint_version_id,
      sscCglSnapshot.syllabus_version_id,
      sscCglSnapshot.language_configuration_id,
      sscCglSnapshot.snapshot_json,
      sscCglSnapshot.content_readiness_state,
      sscCglSnapshot.question_bank_readiness_state
    );
  })();

  console.log('✅ Phase 6 Final Addendum Database Schema Expansions Complete!');
  return true;
}

if (require.main === module) {
  initPhase6FinalAddendum();
}

module.exports = { initPhase6FinalAddendum };
