const db = require('../backend/db/database').getDb();

console.log('=== STARTING OPTION BALANCING MIGRATION ===');

// 1. Identify all prefixes that have > 40% Option A
const biasedPrefixes = db.prepare(`
  SELECT 
    SUBSTR(q.question_id, 1, 12) as pfx,
    COUNT(*) as total,
    SUM(CASE WHEN qv.correct_answer LIKE '%"index":0%' OR qv.correct_answer LIKE '%"index": 0%' OR qv.correct_answer LIKE '%"correct_index":0%' OR qv.correct_answer LIKE '%"correct_index": 0%' THEN 1 ELSE 0 END) as a_count
  FROM questions q
  JOIN question_versions qv ON q.question_id = qv.question_id
  WHERE q.question_type_id IN ('single_mcq', 'mcq')
  GROUP BY pfx
  HAVING total >= 10 AND (CAST(a_count AS FLOAT) / total) > 0.40
  ORDER BY a_count DESC
`).all();

console.log(`Found ${biasedPrefixes.length} biased batches.`);

const letters = ['A', 'B', 'C', 'D'];

let totalRotated = 0;

const updateStmt = db.prepare(`
  UPDATE question_versions 
  SET language_content = ?, correct_answer = ? 
  WHERE question_id = ?
`);

const tx = db.transaction(() => {
  for (const b of biasedPrefixes) {
    const questions = db.prepare(`
      SELECT q.question_id, qv.language_content, qv.correct_answer 
      FROM questions q 
      JOIN question_versions qv ON q.question_id = qv.question_id 
      WHERE q.question_id LIKE (? || '%') AND q.question_type_id IN ('single_mcq', 'mcq')
      ORDER BY q.question_id ASC
    `).all(b.pfx);

    questions.forEach((q, idx) => {
      let ca = {};
      try { ca = JSON.parse(q.correct_answer || '{}'); } catch (e) {}

      const currentIdx = typeof ca.index === 'number' ? ca.index : (typeof ca.correct_index === 'number' ? ca.correct_index : 0);

      // Only rebalance questions that currently have Option A (index 0)
      if (currentIdx !== 0) return;

      const targetIdx = idx % 4; // 0, 1, 2, 3

      // If target is 0, it stays A
      if (targetIdx === 0) return;

      let lc = {};
      try { lc = JSON.parse(q.language_content || '{}'); } catch (e) {}

      const rotateLang = (langObj) => {
        if (!langObj || !Array.isArray(langObj.options) || langObj.options.length < 4) return;
        const cleanOpts = langObj.options.map(o => String(o).replace(/^[A-D]\)\s*/i, '').trim());
        
        // Swap 0 with targetIdx
        const temp = cleanOpts[0];
        cleanOpts[0] = cleanOpts[targetIdx];
        cleanOpts[targetIdx] = temp;
        
        langObj.options = cleanOpts.map((o, i) => `${letters[i]}) ${o}`);
        langObj.ans = langObj.options[targetIdx];
        if (langObj.exp) {
          langObj.exp = langObj.exp.replace(/(सही\s*उत्तर\s*[:\-]?\s*)[A-D]\)/gi, `$1${letters[targetIdx]})`);
          langObj.exp = langObj.exp.replace(/(Correct\s*Option\s*[:\-]?\s*\[?)[A-D](\]?)/gi, `$1${letters[targetIdx]}$2`);
        }
      };

      if (lc.hi) rotateLang(lc.hi);
      if (lc.en) rotateLang(lc.en);
      if (lc.bn) rotateLang(lc.bn);
      if (lc.mr) rotateLang(lc.mr);
      if (lc.ta) rotateLang(lc.ta);
      if (lc.te) rotateLang(lc.te);

      const refLang = lc.hi || lc.en || Object.values(lc)[0] || {};
      const correctVal = Array.isArray(refLang.options) ? refLang.options[targetIdx] : '';

      const newCa = {
        index: targetIdx,
        correct_index: targetIdx,
        key: letters[targetIdx],
        correct_key: letters[targetIdx],
        value: correctVal,
        correct_value: correctVal,
        explanation: ca.explanation || refLang.exp || ''
      };

      updateStmt.run(JSON.stringify(lc), JSON.stringify(newCa), q.question_id);
      totalRotated++;
    });
  }
});

tx();

console.log(`✅ Successfully rotated ${totalRotated} questions to balance A, B, C, D distribution.`);

// Verify PRAGMA integrity
const integrity = db.pragma('integrity_check');
console.log('PRAGMA integrity_check:', integrity);

// Check new distribution
const after = db.prepare(`
  SELECT 
    COUNT(*) as total, 
    SUM(CASE WHEN qv.correct_answer LIKE '%"index":0%' OR qv.correct_answer LIKE '%"index": 0%' OR qv.correct_answer LIKE '%"correct_index":0%' OR qv.correct_answer LIKE '%"correct_index": 0%' THEN 1 ELSE 0 END) as a_count,
    SUM(CASE WHEN qv.correct_answer LIKE '%"index":1%' OR qv.correct_answer LIKE '%"index": 1%' OR qv.correct_answer LIKE '%"correct_index":1%' OR qv.correct_answer LIKE '%"correct_index": 1%' THEN 1 ELSE 0 END) as b_count,
    SUM(CASE WHEN qv.correct_answer LIKE '%"index":2%' OR qv.correct_answer LIKE '%"index": 2%' OR qv.correct_answer LIKE '%"correct_index":2%' OR qv.correct_answer LIKE '%"correct_index": 2%' THEN 1 ELSE 0 END) as c_count,
    SUM(CASE WHEN qv.correct_answer LIKE '%"index":3%' OR qv.correct_answer LIKE '%"index": 3%' OR qv.correct_answer LIKE '%"correct_index":3%' OR qv.correct_answer LIKE '%"correct_index": 3%' THEN 1 ELSE 0 END) as d_count
  FROM questions q 
  JOIN question_versions qv ON q.question_id = qv.question_id
`).get();

console.log('NEW Balanced Database Answer Distribution:', after);
