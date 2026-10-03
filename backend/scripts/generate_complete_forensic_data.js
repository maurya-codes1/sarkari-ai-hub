const fs = require('fs');
const path = require('path');
const db = require('../db/database').getDb();

// Map subject IDs to clean display names
const SUBJECT_NAMES = {
  'subj-math': 'Mathematics / गणित',
  'subj-math12': 'Mathematics (Class 12) / उच्च गणित',
  'subj-science': 'Science / विज्ञान',
  'subj-social': 'Social Science / सामाजिक विज्ञान',
  'subj-english': 'English / अंग्रेजी',
  'subj-hindi': 'Hindi / हिन्दी',
  'subj-physics': 'Physics / भौतिक विज्ञान',
  'subj-chemistry': 'Chemistry / रसायन विज्ञान',
  'subj-biology': 'Biology / जीव विज्ञान',
  'subj-history': 'History / इतिहास',
  'subj-geography': 'Geography / भूगोल',
  'subj-polity': 'Political Science / नागरिक शास्त्र / राजनीति विज्ञान',
  'subj-economics': 'Economics / अर्थशास्त्र',
  'subj-accountancy': 'Accountancy / लेखाशास्त्र',
  'subj-business': 'Business Studies / व्यवसाय अध्ययन',
  'subj-reasoning': 'General Intelligence & Reasoning / तर्कशक्ति',
  'subj-gk': 'General Knowledge & General Awareness / सामान्य ज्ञान',
  'subj-pedagogy': 'Child Development & Pedagogy (CDP) / बाल विकास एवं शिक्षण',
  'subj-legal': 'Legal Aptitude & Reasoning / विधिक अभिरुचि',
  'subj-telugu': 'Telugu / తెలుగు'
};

function getSubjectDisplayName(id) {
  return SUBJECT_NAMES[id] || id.replace('subj-', '').toUpperCase();
}

function parseLangDetail(qvJson, isMCQ) {
  try {
    const parsed = JSON.parse(qvJson);
    const keys = Object.keys(parsed);
    if (keys.includes('hi') && keys.includes('en')) {
      return {
        type: 'Dual Language (Bilingual)',
        qLang: 'Hindi + English (द्विभाषी)',
        optLang: isMCQ ? 'Hindi + English (द्विभाषी)' : 'N/A',
        ansLang: 'Hindi + English Model Explanations'
      };
    } else if (keys.includes('hi')) {
      return {
        type: 'Single Language (Hindi)',
        qLang: 'Hindi (हिन्दी माध्यम)',
        optLang: isMCQ ? 'Hindi (हिन्दी)' : 'N/A',
        ansLang: 'Hindi Model Answer & Marking Rubric'
      };
    } else if (keys.includes('en')) {
      return {
        type: 'Single Language (English)',
        qLang: 'English (English Medium)',
        optLang: isMCQ ? 'English' : 'N/A',
        ansLang: 'English Model Answer & Marking Scheme'
      };
    } else {
      return {
        type: 'Single Language (' + keys[0] + ')',
        qLang: keys[0],
        optLang: isMCQ ? keys[0] : 'N/A',
        ansLang: keys[0]
      };
    }
  } catch (e) {
    return { type: 'Standard', qLang: 'Hindi/English', optLang: 'Hindi/English', ansLang: 'Hindi/English' };
  }
}

// 1. BOARDS FORENSIC DATA
const boards = db.prepare('SELECT board_id, name FROM boards ORDER BY board_id').all();
const boardAudit = [];

for (const b of boards) {
  // All questions for this board
  const qRows = db.prepare(`
    SELECT q.question_id, q.stage, q.subject_id, q.question_type_id, qv.language_content
    FROM questions q
    JOIN question_versions qv ON q.question_id = qv.question_id
    WHERE q.board_id = ?
    ORDER BY q.stage, q.subject_id
  `).all(b.board_id);

  const c10Map = {};
  const c12Map = {};

  let totalMCQ = 0;
  let totalSub = 0;
  let c10MCQ = 0, c10Sub = 0;
  let c12MCQ = 0, c12Sub = 0;

  for (const q of qRows) {
    const isMCQ = q.question_type_id === 'single_mcq';
    if (isMCQ) totalMCQ++; else totalSub++;

    const isC10 = q.stage === 'Class 10';
    const isC12 = q.stage && q.stage.startsWith('Class 12');

    const targetMap = isC10 ? c10Map : (isC12 ? c12Map : null);
    if (!targetMap) continue;

    if (isC10) {
      if (isMCQ) c10MCQ++; else c10Sub++;
    } else if (isC12) {
      if (isMCQ) c12MCQ++; else c12Sub++;
    }

    if (!targetMap[q.subject_id]) {
      targetMap[q.subject_id] = {
        subject_id: q.subject_id,
        subject_name: getSubjectDisplayName(q.subject_id),
        mcq_count: 0,
        sub_count: 0,
        mcq_lang_types: {},
        sub_lang_types: {}
      };
    }

    const sObj = targetMap[q.subject_id];
    const langInfo = parseLangDetail(q.language_content, isMCQ);

    if (isMCQ) {
      sObj.mcq_count++;
      sObj.mcq_lang_types[langInfo.qLang] = (sObj.mcq_lang_types[langInfo.qLang] || 0) + 1;
    } else {
      sObj.sub_count++;
      sObj.sub_lang_types[langInfo.qLang] = (sObj.sub_lang_types[langInfo.qLang] || 0) + 1;
    }
  }

  boardAudit.push({
    board_id: b.board_id,
    name: b.name,
    c10MCQ,
    c10Sub,
    c10Total: c10MCQ + c10Sub,
    c10Subjects: Object.values(c10Map),
    c12MCQ,
    c12Sub,
    c12Total: c12MCQ + c12Sub,
    c12Subjects: Object.values(c12Map),
    totalMCQ,
    totalSub,
    grandTotal: totalMCQ + totalSub
  });
}

// 2. COMPETITIVE EXAMS FORENSIC DATA
const compExams = db.prepare(`
  SELECT e.exam_id, e.name, e.category
  FROM exams e
  WHERE e.board_id IS NULL AND e.exam_id NOT LIKE '%board%' AND e.exam_id NOT IN (
    'icse-cisce', 'tsbie-bieap', 'bseb-bihar', 'bseh-haryana', 'cgbse-chhattisgarh', 
    'chse-bse-odisha', 'gseb-gujarat', 'jac-jharkhand', 'kseab-karnataka', 
    'seba-ahsec-assam', 'wbbse-wb'
  )
  ORDER BY e.exam_id ASC
`).all();

const compAudit = [];

for (const ce of compExams) {
  const versions = db.prepare('SELECT version_id FROM exam_versions WHERE exam_id = ?').all(ce.exam_id).map(v => v.version_id);
  if (versions.length === 0) continue;

  const placeholders = versions.map(() => '?').join(',');
  const qRows = db.prepare(`
    SELECT q.question_id, q.subject_id, q.question_type_id, qv.language_content
    FROM questions q
    JOIN question_versions qv ON q.question_id = qv.question_id
    WHERE q.exam_version_id IN (${placeholders})
    ORDER BY q.subject_id
  `).all(...versions);

  const subMap = {};
  let totalMCQ = 0;
  let totalSub = 0;

  for (const q of qRows) {
    const isMCQ = q.question_type_id === 'single_mcq' || q.question_type_id === 'MULTIPLE_CHOICE';
    if (isMCQ) totalMCQ++; else totalSub++;

    if (!subMap[q.subject_id]) {
      subMap[q.subject_id] = {
        subject_id: q.subject_id,
        subject_name: getSubjectDisplayName(q.subject_id),
        mcq_count: 0,
        sub_count: 0,
        mcq_lang_types: {},
        sub_lang_types: {}
      };
    }

    const sObj = subMap[q.subject_id];
    const langInfo = parseLangDetail(q.language_content, isMCQ);

    if (isMCQ) {
      sObj.mcq_count++;
      sObj.mcq_lang_types[langInfo.qLang] = (sObj.mcq_lang_types[langInfo.qLang] || 0) + 1;
    } else {
      sObj.sub_count++;
      sObj.sub_lang_types[langInfo.qLang] = (sObj.sub_lang_types[langInfo.qLang] || 0) + 1;
    }
  }

  compAudit.push({
    exam_id: ce.exam_id,
    name: ce.name,
    category: ce.category,
    totalMCQ,
    totalSub,
    grandTotal: totalMCQ + totalSub,
    subjects: Object.values(subMap)
  });
}

// Write the master json
const forensicResult = {
  metadata: {
    generated_at: new Date().toISOString(),
    total_boards: boardAudit.length,
    total_comp_exams: compAudit.length,
    total_all_exams: boardAudit.length + compAudit.length,
    total_board_mcqs: boardAudit.reduce((acc, b) => acc + b.totalMCQ, 0),
    total_board_subj: boardAudit.reduce((acc, b) => acc + b.totalSub, 0),
    total_comp_mcqs: compAudit.reduce((acc, c) => acc + c.totalMCQ, 0),
    total_comp_subj: compAudit.reduce((acc, c) => acc + c.totalSub, 0),
    grand_total_questions: boardAudit.reduce((acc, b) => acc + b.grandTotal, 0) + compAudit.reduce((acc, c) => acc + c.grandTotal, 0)
  },
  boardAudit,
  compAudit
};

fs.writeFileSync(path.join(__dirname, '../../forensic_63_master.json'), JSON.stringify(forensicResult, null, 2), 'utf8');
console.log('✅ Master forensic data generated successfully!');
console.log('Summary:', JSON.stringify(forensicResult.metadata, null, 2));
