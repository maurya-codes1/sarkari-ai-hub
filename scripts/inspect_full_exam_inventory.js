// scripts/inspect_full_exam_inventory.js
const db = require('better-sqlite3')('backend/db/sarkari_core.db');

const exams = db.prepare(`
  SELECT 
    e.exam_id,
    e.name as exam_name,
    e.short_name,
    e.category,
    e.level,
    e.class_id,
    e.stream_id,
    e.organization_id,
    o.name as organization_name,
    e.board_id,
    b.name as board_name,
    e.current_version_id,
    e.status,
    e.official_website,
    e.syllabus_url,
    e.notification_url
  FROM exams e
  LEFT JOIN organizations o ON e.organization_id = o.organization_id
  LEFT JOIN boards b ON e.board_id = b.board_id
  ORDER BY e.category, e.exam_id
`).all();

console.log(`Total exams in 'exams' table: ${exams.length}`);

// For each exam, check stages, versions, blueprints
const enriched = exams.map(e => {
  const versions = db.prepare('SELECT version_id, academic_year, version_status FROM exam_versions WHERE exam_id = ?').all(e.exam_id);
  const stages = db.prepare('SELECT stage_code, stage_name, stage_order, total_marks, duration_minutes FROM exam_stages WHERE exam_id = ? ORDER BY stage_order').all(e.exam_id);
  const blueprints = db.prepare(`
    SELECT eb.blueprint_id, eb.name as bp_name, eb.total_questions, eb.duration_minutes, eb.total_marks, eb.is_negative_marking, eb.full_exam_eligible, eb.readiness_status
    FROM exam_blueprints eb
    JOIN exam_versions ev ON eb.exam_version_id = ev.version_id
    WHERE ev.exam_id = ?
  `).all(e.exam_id);
  
  return {
    ...e,
    version_count: versions.length,
    versions: versions.map(v => v.exam_version_id),
    stage_count: stages.length,
    stages: stages.map(s => s.stage_name),
    blueprint_count: blueprints.length,
    blueprints: blueprints.map(b => ({ id: b.blueprint_id, name: b.bp_name, status: b.readiness_status, full_exam_eligible: b.full_exam_eligible }))
  };
});

console.log(JSON.stringify(enriched, null, 2));
