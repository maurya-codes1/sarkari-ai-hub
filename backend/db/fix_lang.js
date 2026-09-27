const { getDb } = require('./database');
const db = getDb();
db.prepare(`
  UPDATE languages
  SET is_ui_language = 0
  WHERE code IN ('as', 'mai', 'bho', 'ne', 'kok', 'sd', 'doi', 'ks', 'sat', 'brx')
`).run();
db.prepare('UPDATE languages SET is_expanded_ui_language = 1').run();
const uiLangs = db.prepare('SELECT count(*) as c FROM languages WHERE is_ui_language = 1').get().c;
const expandedLangs = db.prepare('SELECT count(*) as c FROM languages WHERE is_expanded_ui_language = 1').get().c;
console.log('UI Langs:', uiLangs);
console.log('Expanded UI Langs:', expandedLangs);
