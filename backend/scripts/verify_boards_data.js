const fs = require('fs');
const path = require('path');

function getAllFiles(dir, all = []) {
  if (!fs.existsSync(dir)) return all;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) getAllFiles(full, all);
    else if (ent.name.endsWith('.json')) all.push(full);
  }
  return all;
}

const all = getAllFiles('./backend/data/boards');
console.log('Total JSON files:', all.length);

let totalObj = 0;
let totalSub = 0;
let totalDummy = 0;
const boardSummary = {};

for (const f of all) {
  const c = JSON.parse(fs.readFileSync(f, 'utf8'));
  const b = c.boardId || 'unknown';
  const stage = c.stage || 'unknown';
  const objLen = (c.objectives || []).length;
  const subLen = (c.subjectives || []).length;
  totalObj += objLen;
  totalSub += subLen;

  boardSummary[b] = boardSummary[b] || { 
    name: c.boardName, 
    c10Obj: 0, c10Sub: 0, 
    c12Obj: 0, c12Sub: 0,
    c10Subjs: new Set(),
    c12Subjs: new Set()
  };

  if (stage.startsWith('Class 10')) {
    boardSummary[b].c10Obj += objLen;
    boardSummary[b].c10Sub += subLen;
    boardSummary[b].c10Subjs.add(c.subjectId);
  } else if (stage.startsWith('Class 12')) {
    boardSummary[b].c12Obj += objLen;
    boardSummary[b].c12Sub += subLen;
    boardSummary[b].c12Subjs.add(c.subjectId);
  }

  const raw = fs.readFileSync(f, 'utf8');
  if (raw.includes('सेट #')) totalDummy++;
}

console.log('Total Objectives across all boards:', totalObj);
console.log('Total Subjectives across all boards:', totalSub);
console.log('Grand Total across all boards:', totalObj + totalSub);
console.log('Files containing dummy text (सेट #):', totalDummy);
console.log('Total Boards:', Object.keys(boardSummary).length);

for (const [bid, s] of Object.entries(boardSummary)) {
  console.log(`${bid}: C10 [Obj: ${s.c10Obj}, Sub: ${s.c10Sub}, Subjs: ${s.c10Subjs.size}] | C12 [Obj: ${s.c12Obj}, Sub: ${s.c12Sub}, Subjs: ${s.c12Subjs.size}]`);
}
