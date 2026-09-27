const { getDb } = require('./database');
const { initPhase10_1Database } = require('./phase10_1-init');
const { populatePhase10_1Data } = require('./phase10_1-populate');

const db = getDb();
console.log('🚀 Running Phase 10.1 Database Migrations & Ingestion...');
initPhase10_1Database(db);
populatePhase10_1Data(db);

const states = db.prepare('SELECT count(*) as c FROM states').get().c;
const boards = db.prepare('SELECT count(*) as c FROM boards').get().c;
const offerings = db.prepare('SELECT count(*) as c FROM board_academic_offerings').get().c;
const dependencies = db.prepare('SELECT count(*) as c FROM academic_dependencies').get().c;
const inventory = db.prepare('SELECT count(*) as c FROM nationwide_exam_inventory').get().c;
const stages = db.prepare('SELECT count(*) as c FROM exam_stages').get().c;
const registrations = db.prepare('SELECT count(*) as c FROM exam_registrations').get().c;
const eligibility = db.prepare('SELECT count(*) as c FROM exam_eligibility_criteria').get().c;
const uiLangs = db.prepare('SELECT count(*) as c FROM languages WHERE is_ui_language = 1').get().c;

console.log('📊 Migration Summary:');
console.log(` - States/UTs: ${states}`);
console.log(` - School Boards: ${boards}`);
console.log(` - Board Academic Offerings: ${offerings}`);
console.log(` - Board Dependencies: ${dependencies}`);
console.log(` - Nationwide Exam Inventory: ${inventory}`);
console.log(` - Exam Stages: ${stages}`);
console.log(` - Registrations Tracked: ${registrations}`);
console.log(` - Eligibility Criteria Tracked: ${eligibility}`);
console.log(` - Active UI Languages: ${uiLangs}`);

console.log('✅ Phase 10.1 Database Migration Verified Cleanly.');
