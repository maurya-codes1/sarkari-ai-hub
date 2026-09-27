const fs = require('fs');

let code = fs.readFileSync('public/js/quiz-data.js', 'utf8');

// 1. Single subject in getBoardLocalizedQuestions
code = code.replace(
`  if (specificBank && specificBank.length > 0) {
    const shuffledBank = shuffleArray([...specificBank]);
    const result = [];
    const count = Math.min(requestedCount, shuffledBank.length);
    for (let i = 0; i < count; i++) {
      result.push(formatHyItem(shuffledBank[i], cleanSub, i));
    }
    return result;
  }`,
`  if (specificBank && specificBank.length > 0) {
    const shuffledBank = shuffleArray([...specificBank]);
    const result = [];
    const seenTitles = new Set();
    for (let i = 0; i < shuffledBank.length && result.length < requestedCount; i++) {
      const item = shuffledBank[i];
      const cleanTitle = (item.q || '').split('\\n')[0].trim();
      if (!seenTitles.has(cleanTitle)) {
        seenTitles.add(cleanTitle);
        result.push(formatHyItem(item, cleanSub, result.length));
      }
    }
    return result;
  }`
);

// 2. Class 12th All Streams in getBoardLocalizedQuestions
code = code.replace(
`      while (result.length < targetCount && attempts < targetCount * 3) {
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
      }`,
`      const seenTitles = new Set();
      while (result.length < targetCount && attempts < targetCount * 5) {
        attempts++;
        const bEntry = activeBanks[bIdx % activeBanks.length];
        const sub = bEntry.name;
        const list = bEntry.shuffled;
        if (counters[sub] < list.length) {
          const item = list[counters[sub]];
          counters[sub]++;
          const cleanTitle = (item.q || '').split('\\n')[0].trim();
          if (!seenTitles.has(cleanTitle)) {
            seenTitles.add(cleanTitle);
            result.push(formatHyItem(item, sub, result.length));
          }
        }
        bIdx++;
      }`
);

// 3. Class 10th All Subjects in getBoardLocalizedQuestions
code = code.replace(
`    while (result.length < targetCount && attempts < targetCount * 3) {
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
    }`,
`    const seenTitles = new Set();
    while (result.length < targetCount && attempts < targetCount * 5) {
      attempts++;
      const bEntry = banks[bIdx % banks.length];
      const sub = bEntry.name;
      const list = bEntry.list;
      if (list && counters[sub] < list.length) {
        const item = list[counters[sub]];
        counters[sub]++;
        const cleanTitle = (item.q || '').split('\\n')[0].trim();
        if (!seenTitles.has(cleanTitle)) {
          seenTitles.add(cleanTitle);
          result.push(formatHyItem(item, sub, result.length));
        }
      }
      bIdx++;
    }`
);

// 4. Single subject in getCompetitiveLocalizedQuestions
code = code.replace(
`  if (specificBank && specificBank.length > 0) {
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
  }`,
`  if (specificBank && specificBank.length > 0) {
    const shuffledBank = shuffleArray([...specificBank]);
    const result = [];
    const seenTitles = new Set();
    for (let i = 0; i < shuffledBank.length && result.length < requestedCount; i++) {
      const item = shuffledBank[i];
      const cleanTitle = (item.q || '').split('\\n')[0].trim();
      if (!seenTitles.has(cleanTitle)) {
        seenTitles.add(cleanTitle);
        result.push({
          id: \`\${examId}-\${cleanSub}-\${result.length + 1}\`,
          uniqueKey: \`\${examId}-\${cleanSub}-\${result.length + 1}-\${Date.now()}-\${Math.random().toString(36).substring(2, 6)}\`,
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
    }
    return result;
  }`
);

// 5. Competitive All Subjects in getCompetitiveLocalizedQuestions
code = code.replace(
`      while (result.length < targetCount && attempts < targetCount * 3) {
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
      }`,
`      const seenTitles = new Set();
      while (result.length < targetCount && attempts < targetCount * 5) {
        attempts++;
        const bEntry = activeBanks[bIdx % activeBanks.length];
        const sub = bEntry.name;
        const list = bEntry.shuffled;
        if (counters[sub] < list.length) {
          const item = list[counters[sub]];
          counters[sub]++;
          const cleanTitle = (item.q || '').split('\\n')[0].trim();
          if (!seenTitles.has(cleanTitle)) {
            seenTitles.add(cleanTitle);
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
          }
        }
        bIdx++;
      }`
);

fs.writeFileSync('public/js/quiz-data.js', code, 'utf8');
console.log('Successfully added strict de-duplication guards to public/js/quiz-data.js!');
