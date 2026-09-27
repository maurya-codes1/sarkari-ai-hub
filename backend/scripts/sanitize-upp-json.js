const Database = require('better-sqlite3');
const db = new Database('backend/db/sarkari_core.db');

const val = '{"OBC_UP": 5, "SC_UP": 5, "ST_UP": 5, "Male_General": "3_yr_special_covid_relaxation"}';
const res = db.prepare("UPDATE exam_eligibility_criteria SET age_relaxation_json = ? WHERE eligibility_id = 'elig-upp-constable'").run(val);
console.log('Updated rows:', res.changes);

const check = db.prepare("SELECT age_relaxation_json FROM exam_eligibility_criteria WHERE eligibility_id = 'elig-upp-constable'").get();
console.log('Sanitized value:', check.age_relaxation_json);
console.log('JSON parse test:', JSON.parse(check.age_relaxation_json));

db.close();
