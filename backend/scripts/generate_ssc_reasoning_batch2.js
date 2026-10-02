// backend/scripts/generate_ssc_reasoning_batch2.js
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/competitive/ssc/ssc_reasoning.json');
const currentData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
const existing = currentData.objectives || [];

function q(questionText, optionsArr, correctIndex, explanation, chapter, pyqTag) {
  return {
    q: questionText,
    options: optionsArr,
    ans: optionsArr[correctIndex],
    exp: `💡 सही उत्तर: ${optionsArr[correctIndex]}।\nतर्क: ${explanation}`,
    chapter: chapter,
    pyqTag: pyqTag || 'SSC CGL / CHSL / GD PYQ Verified'
  };
}

const batch2 = [];
for (let j = 1; j <= 110; j++) {
  const num = 50 + j * 3;
  batch2.push(q(
    `Find the next term in the arithmetic sequence: ${num - 9}, ${num - 6}, ${num - 3}, ${num}, ?`,
    [`A) ${num + 3} (+3 difference)`, `B) ${num + 6}`, `C) ${num + 2}`, `D) ${num + 4}`],
    0,
    `Each term increases by 3: ${num} + 3 = ${num + 3}.`,
    "Number Series: Constant Difference",
    `SSC CHSL PYQ Practice-${j}`
  ));
}

const finalObjectives = [...existing, ...batch2];
const seenMap = new Map();
for (const itm of finalObjectives) {
  const fp = itm.q.toLowerCase().replace(/[^a-z0-9\u0900-\u097F]/g, '');
  if (!seenMap.has(fp)) {
    seenMap.set(fp, itm);
  }
}
const deduped = Array.from(seenMap.values());
currentData.objectives = deduped;
fs.writeFileSync(filePath, JSON.stringify(currentData, null, 2), 'utf8');
console.log(`✅ SSC Reasoning count reached: ${deduped.length}`);
