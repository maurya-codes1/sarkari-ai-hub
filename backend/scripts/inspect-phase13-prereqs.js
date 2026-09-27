const { getDb } = require('../db/database');
const db = getDb();

console.log('--- TABLES IN SARKARI_CORE.DB ---');
const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name").all();
console.log('Total tables count:', tables.length);

const relevant = tables.filter(t => /prep|plan|revis|attempt|mock|user|profile|question/i.test(t.name));
console.log('\nRelevant tables:');
relevant.forEach(t => console.log(' - ' + t.name));

console.log('\n--- COLUMNS IN user_preparation_plans ---');
try {
  const cols = db.prepare("PRAGMA table_info(user_preparation_plans)").all();
  console.log(cols.map(c => c.name).join(', '));
} catch(e) {
  console.log('user_preparation_plans not found or error:', e.message);
}

console.log('\n--- COLUMNS IN user_spaced_revisions ---');
try {
  const cols = db.prepare("PRAGMA table_info(user_spaced_revisions)").all();
  console.log(cols.map(c => c.name).join(', '));
} catch(e) {
  console.log('user_spaced_revisions not found or error:', e.message);
}

console.log('\n--- COLUMNS IN mock tables ---');
relevant.filter(t => t.name.includes('mock')).forEach(t => {
  const cols = db.prepare(`PRAGMA table_info(${t.name})`).all();
  console.log(`${t.name}: ${cols.map(c => c.name).join(', ')}`);
});
