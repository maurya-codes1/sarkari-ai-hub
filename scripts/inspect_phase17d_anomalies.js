// scripts/inspect_phase17d_anomalies.js
const db = require('../backend/db/repositories/question-repository').db;

console.log('=====================================================================');
console.log('🔍 PHASE 17D AUDIT INVESTIGATION: SUBJECTIVE & LANGUAGE ANOMALIES');
console.log('=====================================================================\n');

// 1. Inspect subjective questions without PRACTICE_MODEL_ANSWER
const subjWithoutModel = db.prepare(`
  SELECT q.question_id, q.question_type_id, q.subject_id, q.provenance, q.exam_version_id, v.correct_answer, v.language_content
  FROM questions q
  JOIN question_versions v ON q.question_id = v.question_id AND v.version_number = q.current_version
  WHERE q.question_type_id IN ('short_answer', 'case_study', 'long_answer')
    AND (v.correct_answer NOT LIKE '%PRACTICE_MODEL_ANSWER%' OR v.correct_answer IS NULL)
`).all();

console.log('--- 1. SUBJECTIVE QUESTIONS WITHOUT PRACTICE_MODEL_ANSWER ---');
console.log('Total Found:', subjWithoutModel.length);
subjWithoutModel.forEach((q, i) => {
  console.log(`[${i+1}] ID: ${q.question_id}, Type: ${q.question_type_id}, Subject: ${q.subject_id}, Provenance: ${q.provenance}, Version: ${q.exam_version_id}`);
  console.log(`     CorrectAnswer: ${q.correct_answer.substring(0, 100)}...`);
});

// 2. Language Analysis across all 99,370 questions
const allQ = db.prepare(`
  SELECT q.question_id, q.exam_version_id, q.subject_id, q.provenance, q.paper_id, v.language_content, v.correct_answer
  FROM questions q
  JOIN question_versions v ON q.question_id = v.question_id AND v.version_number = q.current_version
`).all();

console.log('\n--- 2. LANGUAGE CONFIGURATION AUDIT ---');
let enOnly = 0;
let hiOnly = 0;
let bilingual = 0;
let regionalOnly = 0;
let otherCombo = 0;
const anomalousLanguageQuestions = [];

for (const q of allQ) {
  let langContent;
  try {
    langContent = JSON.parse(q.language_content);
  } catch (e) {
    anomalousLanguageQuestions.push({ qId: q.question_id, reason: 'INVALID_JSON', content: q.language_content });
    continue;
  }

  const langs = Object.keys(langContent);
  const hasEn = langs.includes('en');
  const hasHi = langs.includes('hi');
  const hasTa = langs.includes('ta');
  const hasTe = langs.includes('te');
  const hasMr = langs.includes('mr');

  if (hasEn && hasHi && langs.length === 2) {
    bilingual++;
  } else if (hasEn && langs.length === 1) {
    enOnly++;
    anomalousLanguageQuestions.push({ qId: q.question_id, type: 'EN_ONLY', langs, subject: q.subject_id, exam: q.exam_version_id, paper: q.paper_id });
  } else if (hasHi && langs.length === 1) {
    hiOnly++;
    anomalousLanguageQuestions.push({ qId: q.question_id, type: 'HI_ONLY', langs, subject: q.subject_id, exam: q.exam_version_id, paper: q.paper_id });
  } else if ((hasTa || hasTe || hasMr) && langs.length === 1) {
    regionalOnly++;
  } else {
    otherCombo++;
    anomalousLanguageQuestions.push({ qId: q.question_id, type: 'OTHER_COMBO', langs, subject: q.subject_id, exam: q.exam_version_id, paper: q.paper_id });
  }
}

console.log(`Total questions analyzed: ${allQ.length}`);
console.log(`Bilingual (en + hi): ${bilingual}`);
console.log(`English only: ${enOnly}`);
console.log(`Hindi only: ${hiOnly}`);
console.log(`Regional only (ta/te/mr): ${regionalOnly}`);
console.log(`Other combinations: ${otherCombo}`);
console.log(`Sum: ${bilingual + enOnly + hiOnly + regionalOnly + otherCombo}`);

console.log(`\nAnomalous/Monolingual English/Hindi/Other questions count: ${anomalousLanguageQuestions.length}`);
console.log('Sample anomalous questions:');
anomalousLanguageQuestions.slice(0, 50).forEach((item, idx) => {
  console.log(`[${idx+1}] ID: ${item.qId}, Type: ${item.type}, Langs: ${item.langs.join(',')}, Subj: ${item.subject}, Exam: ${item.exam}, Paper: ${item.paper}`);
});
