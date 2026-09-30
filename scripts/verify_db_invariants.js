const { getDb } = require('../backend/db/database');
const db = getDb();

const total = db.prepare('SELECT count(*) as c FROM questions').get().c;
const obj = db.prepare("SELECT count(*) as c FROM questions WHERE question_type_id IN ('single_mcq', 'assertion_reason', 'numerical')").get().c;
const subj = db.prepare("SELECT count(*) as c FROM questions WHERE question_type_id IN ('short_answer', 'long_answer', 'case_study')").get().c;
const fe = db.prepare('SELECT count(*) as c FROM questions WHERE full_exam_eligible = 1').get().c;
const integrity = db.prepare('PRAGMA integrity_check').get().integrity_check;
const fk = db.prepare('PRAGMA foreign_key_check').all();
const activeLocales = db.prepare('SELECT count(*) as c FROM languages WHERE is_ui_language = 1 OR is_expanded_ui_language = 1').get().c;

console.log('Total Questions:', total, total === 172210 ? '✅' : '❌');
console.log('Objective:', obj, obj === 134636 ? '✅' : '❌');
console.log('Subjective:', subj, subj === 37574 ? '✅' : '❌');
console.log('Full Exam Eligible:', fe, fe === 250 ? '✅' : '❌');
console.log('PRAGMA integrity:', integrity, integrity === 'ok' ? '✅' : '❌');
console.log('Foreign Key Violations:', fk.length, fk.length === 0 ? '✅' : '❌');
console.log('Active DB UI Locales:', activeLocales, activeLocales === 24 ? '✅' : '❌');
