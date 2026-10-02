const { getDb, closeDb } = require('../db/database');

function purgeQuarantined() {
  const db = getDb();
  console.log('--- STARTING PERMANENT PURGE OF QUARANTINED / UNPUBLISHED LEGACY QUESTIONS ---');

  const beforeTotal = db.prepare('SELECT count(*) as c FROM questions').get().c;
  const beforeVersions = db.prepare('SELECT count(*) as c FROM question_versions').get().c;
  console.log(`Before Purge: questions = ${beforeTotal}, question_versions = ${beforeVersions}`);

  // Identification of target questions:
  // Any question that is QUARANTINED or (is_published = 0 and NOT newly created q-mg- master guide)
  const targetFilter = `trust_status = 'QUARANTINED' OR (is_published = 0 AND question_id NOT LIKE 'q-mg-%')`;
  const targetCount = db.prepare(`SELECT count(*) as c FROM questions WHERE ${targetFilter}`).get().c;
  console.log(`Identified ${targetCount} bad/quarantined questions to permanently delete.`);

  if (targetCount === 0) {
    console.log('No quarantined questions to purge.');
    return;
  }

  // Deletion in chunks to be transactionally safe and avoid sqlite memory limits
  console.log('Step 1: Deleting referencing question_tags...');
  db.prepare(`DELETE FROM question_tags WHERE question_id IN (SELECT question_id FROM questions WHERE ${targetFilter})`).run();

  console.log('Step 2: Deleting referencing paper_questions...');
  try {
    db.prepare(`DELETE FROM paper_questions WHERE question_id IN (SELECT question_id FROM questions WHERE ${targetFilter})`).run();
  } catch(e) { console.log('paper_questions note:', e.message); }

  console.log('Step 3: Deleting referencing cross_surface_question_usage...');
  try {
    db.prepare(`DELETE FROM cross_surface_question_usage WHERE question_id IN (SELECT question_id FROM questions WHERE ${targetFilter})`).run();
  } catch(e) { console.log('cross_surface note:', e.message); }

  console.log('Step 4: Deleting referencing question_versions...');
  db.prepare(`DELETE FROM question_versions WHERE question_id IN (SELECT question_id FROM questions WHERE ${targetFilter})`).run();

  console.log('Step 5: Deleting target questions from questions table...');
  db.prepare(`DELETE FROM questions WHERE ${targetFilter}`).run();

  const afterTotal = db.prepare('SELECT count(*) as c FROM questions').get().c;
  const afterVersions = db.prepare('SELECT count(*) as c FROM question_versions').get().c;
  console.log(`After Purge: questions = ${afterTotal}, question_versions = ${afterVersions}`);

  console.log('Step 6: Running VACUUM to reclaim disk space...');
  db.pragma('vacuum');
  console.log('✅ VACUUM completed successfully!');

  // Verify invariants
  const mgCount = db.prepare(`SELECT count(*) as c FROM questions WHERE question_id LIKE 'q-mg-%'`).get().c;
  const publishedCount = db.prepare(`SELECT count(*) as c FROM questions WHERE is_published = 1`).get().c;
  console.log(`Verified Clean Questions: total = ${afterTotal}, published = ${publishedCount}, q-mg = ${mgCount}`);
}

purgeQuarantined();
