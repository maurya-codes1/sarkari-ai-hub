const Database = require('better-sqlite3');
const path = require('path');
const db = new Database(path.join(__dirname, '../backend/db/sarkari_core.db'));

const rows = db.prepare(`
  SELECT s.subject_id, s.exam_version_id, sc.chapter_id, sc.name as chapter_name,
         count(st.topic_id) as topic_count
  FROM syllabi s
  JOIN syllabus_chapters sc ON sc.syllabus_id = s.syllabus_id
  LEFT JOIN syllabus_topics st ON st.chapter_id = sc.chapter_id
  GROUP BY sc.chapter_id
  ORDER BY s.subject_id, sc.order_index
`).all();

console.log("Total chapters mapped:", rows.length);
console.table(rows.slice(0, 30));
