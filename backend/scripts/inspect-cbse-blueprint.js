const db = require('../db/database').getDb();

const bp = db.prepare(`
  SELECT eb.*, os.document_title, os.source_url
  FROM exam_blueprints eb
  LEFT JOIN official_sources os ON eb.official_source_id = os.source_id
  WHERE eb.exam_version_id = 'ver-cbse-board-2026'
`).get();

console.log('CBSE Blueprint:');
console.log(bp);

if (bp) {
  const sections = db.prepare(`
    SELECT * FROM blueprint_sections WHERE blueprint_id = ?
  `).all(bp.blueprint_id);
  console.log('\nCBSE Sections:');
  console.table(sections);
}
