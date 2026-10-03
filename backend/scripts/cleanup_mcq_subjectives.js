const db = require('../db/database').getDb();

// 1. Remove accidental subjectives from pure MCQ exams (UP Police, BPSC TRE)
const r1 = db.prepare(`
  DELETE FROM question_versions 
  WHERE question_id IN (
    SELECT question_id FROM questions 
    WHERE exam_version_id LIKE '%up-police%' AND question_type_id != 'single_mcq'
  )
`).run();

const r2 = db.prepare(`
  DELETE FROM questions 
  WHERE exam_version_id LIKE '%up-police%' AND question_type_id != 'single_mcq'
`).run();

const r3 = db.prepare(`
  DELETE FROM question_versions 
  WHERE question_id IN (
    SELECT question_id FROM questions 
    WHERE exam_version_id LIKE '%bpsc-tre%' AND question_type_id != 'single_mcq'
  )
`).run();

const r4 = db.prepare(`
  DELETE FROM questions 
  WHERE exam_version_id LIKE '%bpsc-tre%' AND question_type_id != 'single_mcq'
`).run();

console.log('Cleaned UP Police subjectives:', r2.changes, 'Cleaned BPSC TRE subjectives:', r4.changes);
