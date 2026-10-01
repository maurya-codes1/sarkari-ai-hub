const db = require('../backend/db/database').getDb();

// Test rotation on 4 questions of q-p17i-upmsp
const rows = db.prepare(`
  SELECT q.question_id, qv.language_content, qv.correct_answer 
  FROM questions q 
  JOIN question_versions qv ON q.question_id = qv.question_id 
  WHERE q.question_id LIKE 'q-p17i-upmsp%' 
  LIMIT 4
`).all();

console.log('--- BEFORE ROTATION ---');
rows.forEach((r, idx) => {
  const ca = JSON.parse(r.correct_answer);
  const lc = JSON.parse(r.language_content);
  console.log(`Q${idx+1}: ID=${r.question_id}, CorrectIndex=${ca.index}, CorrectVal=${ca.value}`);
  console.log(`     Options:`, (lc.hi || lc.en).options);
});

// Logic test
console.log('\n--- SIMULATED ROTATION ---');
rows.forEach((r, idx) => {
  const targetIdx = idx % 4; // 0->A, 1->B, 2->C, 3->D
  const letters = ['A', 'B', 'C', 'D'];
  const lc = JSON.parse(r.language_content);
  
  const rotateLang = (langObj) => {
    if (!langObj || !Array.isArray(langObj.options) || langObj.options.length < 4) return;
    const cleanOpts = langObj.options.map(o => String(o).replace(/^[A-D]\)\s*/i, '').trim());
    
    // Swap 0 with targetIdx
    if (targetIdx !== 0) {
      const temp = cleanOpts[0];
      cleanOpts[0] = cleanOpts[targetIdx];
      cleanOpts[targetIdx] = temp;
    }
    
    langObj.options = cleanOpts.map((o, i) => `${letters[i]}) ${o}`);
    langObj.ans = langObj.options[targetIdx];
    if (langObj.exp) {
      langObj.exp = langObj.exp.replace(/(सही\s*उत्तर\s*[:\-]?\s*)[A-D]\)/i, `$1${letters[targetIdx]})`);
      langObj.exp = langObj.exp.replace(/(Correct\s*Option\s*[:\-]?\s*\[?)[A-D](\]?)/i, `$1${letters[targetIdx]}$2`);
    }
  };

  rotateLang(lc.hi);
  rotateLang(lc.en);
  
  const correctVal = (lc.hi || lc.en).options[targetIdx];
  const newCa = {
    index: targetIdx,
    key: letters[targetIdx],
    value: correctVal
  };
  
  console.log(`Q${idx+1}: Target=${letters[targetIdx]} (index ${targetIdx}), CorrectVal=${correctVal}`);
  console.log(`     Rotated Options:`, (lc.hi || lc.en).options);
});
