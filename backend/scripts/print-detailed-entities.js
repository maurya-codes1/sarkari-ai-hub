const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');
const db = new Database('backend/db/sarkari_core.db', { readonly: true });

console.log('=== LANGUAGES TABLE (COUNT: ' + db.prepare('SELECT COUNT(*) as c FROM languages').get().c + ') ===');
const langs = db.prepare('SELECT * FROM languages').all();
langs.forEach((l, idx) => {
  console.log(`${idx + 1}. code: ${l.code}, name: ${l.name}, native: ${l.native_name}, is_active: ${l.is_active}, is_default: ${l.is_default}`);
});

console.log('\n=== BOARDS TABLE (COUNT: ' + db.prepare('SELECT COUNT(*) as c FROM boards').get().c + ') ===');
const boards = db.prepare('SELECT * FROM boards ORDER BY jurisdiction, code').all();
boards.forEach((b, idx) => {
  console.log(`${idx + 1}. id: ${b.id}, code: ${b.code}, name: ${b.name}, jurisdiction: ${b.jurisdiction}, type: ${b.type}, state_id: ${b.state_id}`);
});

console.log('\n=== ACADEMIC DEPENDENCIES (COUNT: ' + db.prepare('SELECT COUNT(*) as c FROM academic_dependencies').get().c + ') ===');
const deps = db.prepare('SELECT * FROM academic_dependencies').all();
deps.forEach((d, idx) => {
  console.log(`${idx + 1}. id: ${d.id}, board_id: ${d.board_id}, ${d.from_class}->${d.to_class}, stream: ${d.stream_code}, rule_type: ${d.rule_type}, desc: ${d.rule_description_en}`);
});

console.log('\n=== EXAM ELIGIBILITY CRITERIA (COUNT: ' + db.prepare('SELECT COUNT(*) as c FROM exam_eligibility_criteria').get().c + ') ===');
const elig = db.prepare('SELECT * FROM exam_eligibility_criteria').all();
elig.forEach((e, idx) => {
  console.log(`${idx + 1}. id: ${e.id}, target_type: ${e.target_type}, target_id: ${e.target_id}, age_min: ${e.age_min}, age_max: ${e.age_max}, relaxations: ${e.age_relaxation_json}`);
});

db.close();
