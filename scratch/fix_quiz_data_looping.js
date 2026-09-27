const fs = require('fs');

let code = fs.readFileSync('public/js/quiz-data.js', 'utf8');

// 1. Fix getBoardLocalizedQuestions single subject specificBank
const oldSingleBoard = `  if (specificBank && specificBank.length > 0) {
    const shuffledBank = shuffleArray([...specificBank]);
    const result = [];
    for (let i = 0; i < requestedCount; i++) {
      const item = shuffledBank[i % shuffledBank.length];
      const cycle = Math.floor(i / shuffledBank.length);
      let qObj = formatHyItem(item, cleanSub, i);
      if (cycle > 0) {
        const setLetter = String.fromCharCode(65 + (cycle % 4));
        const year = 2026 - (cycle % 5);
        qObj.q = \`[Set \${setLetter} • PYQ \${year}] \${qObj.q}\`;
      }
      result.push(qObj);
    }
    return result;
  }`;

const newSingleBoard = `  if (specificBank && specificBank.length > 0) {
    const shuffledBank = shuffleArray([...specificBank]);
    const result = [];
    const count = Math.min(requestedCount, shuffledBank.length);
    for (let i = 0; i < count; i++) {
      result.push(formatHyItem(shuffledBank[i], cleanSub, i));
    }
    return result;
  }`;

// 2. Fix Class 12th 'all' streamBanks
const oldClass12All = `    const activeBanks = streamBanks.filter(b => b.list && b.list.length > 0);
    if (activeBanks.length > 0) {
      const result = [];
      let bIdx = 0;
      const counters = {};
      activeBanks.forEach(b => { counters[b.name] = 0; });
      while (result.length < requestedCount) {
        const bEntry = activeBanks[bIdx % activeBanks.length];
        const sub = bEntry.name;
        const list = bEntry.list;
        const item = list[counters[sub] % list.length];
        const cycle = Math.floor(counters[sub] / list.length);
        let qObj = formatHyItem(item, sub, result.length);
        if (cycle > 0) {
          const setLetter = String.fromCharCode(65 + (cycle % 4));
          const year = 2026 - (cycle % 5);
          qObj.q = \`[Set \${setLetter} • PYQ \${year}] \${qObj.q}\`;
        }
        result.push(qObj);
        counters[sub]++;
        bIdx++;
      }
      return result;
    }`;

const newClass12All = `    const activeBanks = streamBanks.filter(b => b.list && b.list.length > 0);
    if (activeBanks.length > 0) {
      activeBanks.forEach(b => { b.shuffled = shuffleArray([...b.list]); });
      const result = [];
      let bIdx = 0;
      const counters = {};
      activeBanks.forEach(b => { counters[b.name] = 0; });
      const totalAvailable = activeBanks.reduce((sum, b) => sum + b.shuffled.length, 0);
      const targetCount = Math.min(requestedCount, totalAvailable);
      let attempts = 0;

      while (result.length < targetCount && attempts < targetCount * 3) {
        attempts++;
        const bEntry = activeBanks[bIdx % activeBanks.length];
        const sub = bEntry.name;
        const list = bEntry.shuffled;
        if (counters[sub] < list.length) {
          const item = list[counters[sub]];
          result.push(formatHyItem(item, sub, result.length));
          counters[sub]++;
        }
        bIdx++;
      }
      return result;
    }`;

// 3. Fix Class 10th 'all' banks
const oldClass10All = `    const result = [];
    let bIdx = 0;
    const counters = { hindi: 0, math: 0, science: 0, social: 0, english: 0, sanskrit: 0 };

    while (result.length < requestedCount) {
      const bEntry = banks[bIdx % banks.length];
      const sub = bEntry.name;
      const list = bEntry.list;
      if (list && list.length > 0) {
        const item = list[counters[sub] % list.length];
        const cycle = Math.floor(counters[sub] / list.length);
        let qObj = formatHyItem(item, sub, result.length);
        if (cycle > 0) {
          const setLetter = String.fromCharCode(65 + (cycle % 4));
          const year = 2026 - (cycle % 5);
          qObj.q = \`[Set \${setLetter} • PYQ \${year}] \${qObj.q}\`;
        }
        result.push(qObj);
        counters[sub]++;
      }
      bIdx++;
    }
    return result;`;

const newClass10All = `    const result = [];
    let bIdx = 0;
    const counters = { hindi: 0, math: 0, science: 0, social: 0, english: 0, sanskrit: 0 };
    const totalAvailable = banks.reduce((sum, b) => sum + b.list.length, 0);
    const targetCount = Math.min(requestedCount, totalAvailable);
    let attempts = 0;

    while (result.length < targetCount && attempts < targetCount * 3) {
      attempts++;
      const bEntry = banks[bIdx % banks.length];
      const sub = bEntry.name;
      const list = bEntry.list;
      if (list && counters[sub] < list.length) {
        const item = list[counters[sub]];
        result.push(formatHyItem(item, sub, result.length));
        counters[sub]++;
      }
      bIdx++;
    }
    return result;`;

// 4. Fix Board blueprints fallback loop
const oldBoardBlueprintLoop = `  const result = [];
  let idx = 0;
  while (result.length < requestedCount) {
    const bp = pool[idx % pool.length];
    const cycle = Math.floor(idx / pool.length);
    const loc = bp.loc[langMode] || bp.loc["bilingual-hindi"] || bp.loc["english"];
    const subName = getSubjectDisplayName(bp.subject);

    let qText = loc.q;
    if (cycle > 0) {
      const setLetter = String.fromCharCode(65 + (cycle % 4));
      const year = 2026 - (cycle % 5);
      qText = \`[Set \${setLetter} • PYQ \${year}] \${qText}\`;
    }

    if (loc.sub && langMode !== "english") {
      qText += \`\\n[\${loc.sub}]\`;
    } else if (loc.sub && langMode === "english") {
      qText += \`\\n[\${b.name} Class \${classLevel} - High Yield Model]\`;
    }

    result.push({
      id: \`\${b.id}-\${classLevel}-\${subjectId}-\${result.length + 1}\`,
      uniqueKey: \`\${b.id}-\${classLevel}-\${result.length + 1}-\${Date.now()}-\${Math.random().toString(36).substring(2, 6)}\`,
      examTags: [classLevel === "12th" ? \`board-12th-\${stream}\` : "board-10th"],
      subjectTags: [bp.subject],
      subjectName: subName,
      q: qText,
      options: [...loc.options],
      correct: loc.correct !== undefined ? loc.correct : 1,
      ans: loc.ans,
      explanation: loc.exp,
      topic: \`\${bp.topic} (\${b.name})\`,
      boardTag: b.name
    });
    idx++;
  }`;

const newBoardBlueprintLoop = `  const result = [];
  let idx = 0;
  const count = Math.min(requestedCount, pool.length);
  while (result.length < count) {
    const bp = pool[idx];
    const loc = bp.loc[langMode] || bp.loc["bilingual-hindi"] || bp.loc["english"];
    const subName = getSubjectDisplayName(bp.subject);

    let qText = loc.q;
    if (loc.sub && langMode !== "english") {
      qText += \`\\n[\${loc.sub}]\`;
    } else if (loc.sub && langMode === "english") {
      qText += \`\\n[\${b.name} Class \${classLevel} - High Yield Model]\`;
    }

    result.push({
      id: \`\${b.id}-\${classLevel}-\${subjectId}-\${result.length + 1}\`,
      uniqueKey: \`\${b.id}-\${classLevel}-\${result.length + 1}-\${Date.now()}-\${Math.random().toString(36).substring(2, 6)}\`,
      examTags: [classLevel === "12th" ? \`board-12th-\${stream}\` : "board-10th"],
      subjectTags: [bp.subject],
      subjectName: subName,
      q: qText,
      options: [...loc.options],
      correct: loc.correct !== undefined ? loc.correct : 1,
      ans: loc.ans,
      explanation: loc.exp,
      topic: \`\${bp.topic} (\${b.name})\`,
      boardTag: b.name
    });
    idx++;
  }`;

// 5. Fix getCompetitiveLocalizedQuestions single subject
const oldCompSingle = `  if (specificBank && specificBank.length > 0) {
    const shuffledBank = shuffleArray([...specificBank]);
    const result = [];
    for (let i = 0; i < requestedCount; i++) {
      const item = shuffledBank[i % shuffledBank.length];
      const cycle = Math.floor(i / shuffledBank.length);
      let qText = item.q;
      if (cycle > 0) {
        const setLetter = String.fromCharCode(65 + (cycle % 4));
        const year = 2026 - (cycle % 5);
        qText = \`[Set \${setLetter} • TCS Model \${year}] \${qText}\`;
      }
      result.push({
        id: \`\${examId}-\${cleanSub}-\${i + 1}\`,
        uniqueKey: \`\${examId}-\${cleanSub}-\${i + 1}-\${Date.now()}-\${Math.random().toString(36).substring(2, 6)}\`,
        examTags: [examId],
        subjectTags: [cleanSub],
        subjectName: getSubjectDisplayName(cleanSub),
        q: qText,
        options: [...item.options],
        correct: item.correct !== undefined ? item.correct : 0,
        ans: item.ans,
        explanation: item.exp || item.explanation,
        topic: \`\${item.topic} (\${examName})\`,
        boardTag: examName
      });
    }
    return result;
  }`;

const newCompSingle = `  if (specificBank && specificBank.length > 0) {
    const shuffledBank = shuffleArray([...specificBank]);
    const result = [];
    const count = Math.min(requestedCount, shuffledBank.length);
    for (let i = 0; i < count; i++) {
      const item = shuffledBank[i];
      result.push({
        id: \`\${examId}-\${cleanSub}-\${i + 1}\`,
        uniqueKey: \`\${examId}-\${cleanSub}-\${i + 1}-\${Date.now()}-\${Math.random().toString(36).substring(2, 6)}\`,
        examTags: [examId],
        subjectTags: [cleanSub],
        subjectName: getSubjectDisplayName(cleanSub),
        q: item.q,
        options: [...item.options],
        correct: item.correct !== undefined ? item.correct : 0,
        ans: item.ans,
        explanation: item.exp || item.explanation,
        topic: \`\${item.topic} (\${examName})\`,
        boardTag: examName
      });
    }
    return result;
  }`;

// 6. Fix getCompetitiveLocalizedQuestions 'all'
const oldCompAll = `    const activeBanks = examBanks.filter(b => b.list && b.list.length > 0);
    if (activeBanks.length > 0) {
      const result = [];
      let bIdx = 0;
      const counters = {};
      activeBanks.forEach(b => { counters[b.name] = 0; });
      while (result.length < requestedCount) {
        const bEntry = activeBanks[bIdx % activeBanks.length];
        const sub = bEntry.name;
        const list = bEntry.list;
        const item = list[counters[sub] % list.length];
        const cycle = Math.floor(counters[sub] / list.length);
        let qText = item.q;
        if (cycle > 0) {
          const setLetter = String.fromCharCode(65 + (cycle % 4));
          const year = 2026 - (cycle % 5);
          qText = \`[Set \${setLetter} • TCS Model \${year}] \${qText}\`;
        }
        result.push({
          id: \`\${examId}-\${sub}-\${result.length + 1}\`,
          uniqueKey: \`\${examId}-\${sub}-\${result.length + 1}-\${Date.now()}-\${Math.random().toString(36).substring(2, 6)}\`,
          examTags: [examId],
          subjectTags: [sub],
          subjectName: getSubjectDisplayName(sub),
          q: qText,
          options: [...item.options],
          correct: item.correct !== undefined ? item.correct : 0,
          ans: item.ans,
          explanation: item.exp || item.explanation,
          topic: \`\${item.topic} (\${examName})\`,
          boardTag: examName
        });
        counters[sub]++;
        bIdx++;
      }
      return result;
    }`;

const newCompAll = `    const activeBanks = examBanks.filter(b => b.list && b.list.length > 0);
    if (activeBanks.length > 0) {
      activeBanks.forEach(b => { b.shuffled = shuffleArray([...b.list]); });
      const result = [];
      let bIdx = 0;
      const counters = {};
      activeBanks.forEach(b => { counters[b.name] = 0; });
      const totalAvailable = activeBanks.reduce((sum, b) => sum + b.shuffled.length, 0);
      const targetCount = Math.min(requestedCount, totalAvailable);
      let attempts = 0;

      while (result.length < targetCount && attempts < targetCount * 3) {
        attempts++;
        const bEntry = activeBanks[bIdx % activeBanks.length];
        const sub = bEntry.name;
        const list = bEntry.shuffled;
        if (counters[sub] < list.length) {
          const item = list[counters[sub]];
          result.push({
            id: \`\${examId}-\${sub}-\${result.length + 1}\`,
            uniqueKey: \`\${examId}-\${sub}-\${result.length + 1}-\${Date.now()}-\${Math.random().toString(36).substring(2, 6)}\`,
            examTags: [examId],
            subjectTags: [sub],
            subjectName: getSubjectDisplayName(sub),
            q: item.q,
            options: [...item.options],
            correct: item.correct !== undefined ? item.correct : 0,
            ans: item.ans,
            explanation: item.exp || item.explanation,
            topic: \`\${item.topic} (\${examName})\`,
            boardTag: examName
          });
          counters[sub]++;
        }
        bIdx++;
      }
      return result;
    }`;

// 7. Fix competitive blueprint loop
const oldCompBlueprintLoop = `  const result = [];
  let idx = 0;
  while (result.length < requestedCount) {
    const bp = pool[idx % pool.length];
    const cycle = Math.floor(idx / pool.length);
    const loc = bp.loc[langMode] || bp.loc["bilingual-hindi"] || bp.loc["english"];
    const mainSub = bp.subjectTags.find(t => t !== "all") || "general";
    const subName = getSubjectDisplayName(mainSub);

    let qText = loc.q;
    if (cycle > 0) {
      const setLetter = String.fromCharCode(65 + (cycle % 4));
      const year = 2026 - (cycle % 5);
      qText = \`[Set \${setLetter} • TCS Model \${year}] \${qText}\`;
    }

    if (loc.sub && langMode !== "english") {
      qText += \`\\n[\${loc.sub}]\`;
    } else if (loc.sub && langMode === "english") {
      qText += \`\\n[\${examName} - High-Yield Target Model]\`;
    }

    result.push({
      id: \`\${examId}-\${subjectId}-\${result.length + 1}\`,
      uniqueKey: \`\${examId}-\${result.length + 1}-\${Date.now()}-\${Math.random().toString(36).substring(2, 6)}\`,
      examTags: [examId],
      subjectTags: [...bp.subjectTags],
      subjectName: subName,
      q: qText,
      options: [...loc.options],
      correct: loc.correct !== undefined ? loc.correct : 0,
      ans: loc.ans,
      explanation: loc.exp,
      topic: \`\${bp.topic} (\${examName})\`,
      boardTag: examName
    });
    idx++;
  }`;

const newCompBlueprintLoop = `  const result = [];
  let idx = 0;
  const count = Math.min(requestedCount, pool.length);
  while (result.length < count) {
    const bp = pool[idx];
    const loc = bp.loc[langMode] || bp.loc["bilingual-hindi"] || bp.loc["english"];
    const mainSub = bp.subjectTags.find(t => t !== "all") || "general";
    const subName = getSubjectDisplayName(mainSub);

    let qText = loc.q;
    if (loc.sub && langMode !== "english") {
      qText += \`\\n[\${loc.sub}]\`;
    } else if (loc.sub && langMode === "english") {
      qText += \`\\n[\${examName} - High-Yield Target Model]\`;
    }

    result.push({
      id: \`\${examId}-\${subjectId}-\${result.length + 1}\`,
      uniqueKey: \`\${examId}-\${result.length + 1}-\${Date.now()}-\${Math.random().toString(36).substring(2, 6)}\`,
      examTags: [examId],
      subjectTags: [...bp.subjectTags],
      subjectName: subName,
      q: qText,
      options: [...loc.options],
      correct: loc.correct !== undefined ? loc.correct : 0,
      ans: loc.ans,
      explanation: loc.exp,
      topic: \`\${bp.topic} (\${examName})\`,
      boardTag: examName
    });
    idx++;
  }`;

function replaceBlock(label, oldStr, newStr) {
  // Normalize whitespace to match
  const normOld = oldStr.replace(/\r\n/g, '\n');
  const normCode = code.replace(/\r\n/g, '\n');
  if (normCode.includes(normOld)) {
    code = normCode.replace(normOld, newStr.replace(/\r\n/g, '\n'));
    console.log(`[PASS] Replaced: ${label}`);
  } else {
    console.log(`[FAIL] Could not find block for: ${label}`);
  }
}

replaceBlock('Single Board Subject', oldSingleBoard, newSingleBoard);
replaceBlock('Class 12th All Streams', oldClass12All, newClass12All);
replaceBlock('Class 10th All Subjects', oldClass10All, newClass10All);
replaceBlock('Board Blueprints Fallback', oldBoardBlueprintLoop, newBoardBlueprintLoop);
replaceBlock('Competitive Single Subject', oldCompSingle, newCompSingle);
replaceBlock('Competitive All Subjects', oldCompAll, newCompAll);
replaceBlock('Competitive Blueprint Loop', oldCompBlueprintLoop, newCompBlueprintLoop);

fs.writeFileSync('public/js/quiz-data.js', code, 'utf8');
console.log('Successfully updated public/js/quiz-data.js!');
