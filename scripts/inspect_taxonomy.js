const Database = require('better-sqlite3');
const path = require('path');
const db = new Database(path.join(__dirname, '../backend/db/sarkari_core.db'));

const examsCount = db.prepare('SELECT count(*) as c FROM exams').get().c;
const versionsCount = db.prepare('SELECT count(*) as c FROM exam_versions').get().c;
const stagesCount = db.prepare('SELECT count(*) as c FROM exam_stages').get().c;
const blueprintsCount = db.prepare('SELECT count(*) as c FROM exam_blueprints').get().c;
const sectionsCount = db.prepare('SELECT count(*) as c FROM blueprint_sections').get().c;
const subjectsCount = db.prepare('SELECT count(*) as c FROM subjects').get().c;
const syllabiCount = db.prepare('SELECT count(*) as c FROM syllabi').get().c;
const chaptersCount = db.prepare('SELECT count(*) as c FROM syllabus_chapters').get().c;
const topicsCount = db.prepare('SELECT count(*) as c FROM syllabus_topics').get().c;
const languagesCount = db.prepare('SELECT count(*) as c FROM languages').get().c;
const qTypesCount = db.prepare('SELECT count(*) as c FROM question_types').get().c;

console.log({
  examsCount,
  versionsCount,
  stagesCount,
  blueprintsCount,
  sectionsCount,
  subjectsCount,
  syllabiCount,
  chaptersCount,
  topicsCount,
  languagesCount,
  qTypesCount
});
