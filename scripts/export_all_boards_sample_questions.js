const { getDb } = require('../backend/db/database');
const fs = require('fs');
const db = getDb();

const boards = db.prepare('SELECT board_id, name, short_name FROM boards ORDER BY rowid').all();

const exportData = [];

for (const b of boards) {
  const rows = db.prepare(`
    SELECT q.question_id, q.subject_id, q.stage, q.question_type_id, qv.language_content, qv.correct_answer
    FROM questions q
    JOIN question_versions qv ON qv.question_id = q.question_id
    WHERE q.board_id = ?
    LIMIT 5
  `).all(b.board_id);

  const qList = [];
  for (const r of rows) {
    let parsed = {};
    try { parsed = JSON.parse(r.language_content); } catch(e) {}
    qList.push({
      question_id: r.question_id,
      subject_id: r.subject_id,
      stage: r.stage,
      type: r.question_type_id,
      available_languages: Object.keys(parsed),
      content: parsed
    });
  }

  exportData.push({
    board_id: b.board_id,
    board_name: b.name,
    short_name: b.short_name,
    samples: qList
  });
}

fs.writeFileSync('scripts/all_boards_raw_questions_sample.json', JSON.stringify(exportData, null, 2), 'utf8');
console.log('Saved sample questions from all 31 boards to scripts/all_boards_raw_questions_sample.json');
