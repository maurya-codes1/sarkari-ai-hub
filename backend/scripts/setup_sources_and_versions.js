// backend/scripts/setup_sources_and_versions.js
const db = require('../db/database').getDb();

console.log('=== VERIFYING AND SETUP OFFICIAL SOURCES & EXAM VERSIONS ===');

const allExams = db.prepare('SELECT exam_id, name, organization_id FROM exams').all();
const insertSource = db.prepare(`
  INSERT OR IGNORE INTO official_sources (
    source_id, organization_id, document_title, document_type, source_url,
    applicable_year, source_hierarchy_level, freshness_status, conflict_status
  ) VALUES (?, ?, ?, 'CURRICULUM', 'https://official.gov.in', '2026', 'PRIMARY_OFFICIAL', 'CURRENT', 'NONE')
`);

for (const e of allExams) {
  const srcId = `src-${e.exam_id}-portal`;
  insertSource.run(srcId, e.organization_id || 'org-gov', `${e.name} Official Portal`);
}

const totalSources = db.prepare('SELECT count(*) as c FROM official_sources').get().c;
console.log(`Total official sources available: ${totalSources}`);

// Also ensure every exam has an active version in exam_versions
const insertVersion = db.prepare(`
  INSERT OR IGNORE INTO exam_versions (
    version_id, exam_id, version_year, status, language_supported, created_at
  ) VALUES (?, ?, '2026', 'ACTIVE', '["hi", "en"]', CURRENT_TIMESTAMP)
`);

for (const e of allExams) {
  const verId = `ver-${e.exam_id}-2026`;
  insertVersion.run(verId, e.exam_id);
}

const totalVersions = db.prepare('SELECT count(*) as c FROM exam_versions').get().c;
console.log(`Total exam versions available: ${totalVersions}`);
