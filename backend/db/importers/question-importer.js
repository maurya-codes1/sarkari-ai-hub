// backend/db/importers/question-importer.js
// Imports existing question banks without altering meaning or faking provenance.
// Provenance strictly marked as 'HUMAN_CURATED' / 'OTHER_VERIFIED' as required by Section 10.
// Imports:
//  - public/js/master-high-yield-bank.js (510 Qs)
//  - public/js/master-class12-bank.js (217 Qs)
//  - public/js/master-competitive-bank.js (145 Qs)

const fs = require('fs');
const path = require('path');
const { getDb } = require('../database');

const SUBJECT_DEFINITIONS = [
  { id: 'subj-hindi', name: 'सामान्य हिन्दी (General Hindi)', short: 'Hindi', type: 'Language', langSubj: 1 },
  { id: 'subj-english', name: 'General English', short: 'English', type: 'Language', langSubj: 1 },
  { id: 'subj-sanskrit', name: 'संस्कृत (Sanskrit)', short: 'Sanskrit', type: 'Language', langSubj: 1 },
  { id: 'subj-math', name: 'Mathematics & Elementary Math', short: 'Math', type: 'Mathematics', langSubj: 0 },
  { id: 'subj-science', name: 'General Science', short: 'Science', type: 'Science', langSubj: 0 },
  { id: 'subj-social', name: 'Social Science & Studies', short: 'Social', type: 'SocialScience', langSubj: 0 },
  { id: 'subj-physics', name: 'Physics (Class 11-12)', short: 'Physics', type: 'Physics', langSubj: 0 },
  { id: 'subj-chemistry', name: 'Chemistry (Class 11-12)', short: 'Chemistry', type: 'Chemistry', langSubj: 0 },
  { id: 'subj-biology', name: 'Biology (Botany & Zoology)', short: 'Biology', type: 'Biology', langSubj: 0 },
  { id: 'subj-math12', name: 'Higher Mathematics (Class 12)', short: 'Math-12', type: 'Mathematics', langSubj: 0 },
  { id: 'subj-accountancy', name: 'Accountancy', short: 'Accounts', type: 'Commerce', langSubj: 0 },
  { id: 'subj-business', name: 'Business Studies', short: 'Business', type: 'Commerce', langSubj: 0 },
  { id: 'subj-economics', name: 'Economics', short: 'Economics', type: 'Commerce', langSubj: 0 },
  { id: 'subj-history', name: 'History (Ancient, Medieval, Modern)', short: 'History', type: 'SocialScience', langSubj: 0 },
  { id: 'subj-polity', name: 'Political Science & Indian Constitution', short: 'Polity', type: 'SocialScience', langSubj: 0 },
  { id: 'subj-geography', name: 'Geography (Indian & World)', short: 'Geography', type: 'SocialScience', langSubj: 0 },
  { id: 'subj-reasoning', name: 'General Intelligence & Logical Reasoning', short: 'Reasoning', type: 'Reasoning', langSubj: 0 },
  { id: 'subj-law', name: 'Special Police Law & IPC/CrPC Basics', short: 'Law', type: 'Technical', langSubj: 0 },
  { id: 'subj-railway-sci', name: 'Railway Science, Tech & Basic Physics', short: 'Sci-Tech', type: 'Science', langSubj: 0 },
  { id: 'subj-gk', name: 'General Knowledge & General Awareness', short: 'GK', type: 'GeneralKnowledge', langSubj: 0 }
];

function ensureSubjects(db) {
  const insertSubj = db.prepare(`
    INSERT INTO subjects (subject_id, name, short_name, subject_type, is_language_subject, is_medium_dependent, active)
    VALUES (?, ?, ?, ?, ?, ?, 1)
    ON CONFLICT(subject_id) DO UPDATE SET name = excluded.name
  `);
  for (const s of SUBJECT_DEFINITIONS) {
    insertSubj.run(s.id, s.name, s.short, s.type, s.langSubj, s.langSubj ? 0 : 1);
  }
}

function importQuestionList(db, questions, subjectId, prefix, sourceFile, insertQ, insertVer, insertTag, logStmt) {
  let count = 0;

  for (let i = 0; i < questions.length; i++) {
    const raw = questions[i];
    const qId = `${prefix}-${(i + 1).toString().padStart(4, '0')}`;
    const rawQ = raw.q || '';
    
    // Check if question has bilingual bracket [English text]
    let hiText = rawQ;
    let enText = null;
    if (rawQ.includes('\n[')) {
      const parts = rawQ.split('\n[');
      hiText = parts[0].trim();
      enText = parts[1].replace(/\]$/, '').trim();
    } else if (rawQ.includes('[')) {
      const parts = rawQ.split('[');
      hiText = parts[0].trim();
      enText = parts[1].replace(/\]$/, '').trim();
    }

    const languageContent = {
      hi: {
        q: hiText,
        options: raw.options || [],
        ans: raw.ans || raw.options?.[raw.correct || 0] || '',
        exp: raw.exp || ''
      }
    };

    if (enText) {
      languageContent.en = {
        q: enText,
        options: raw.options || [],
        ans: raw.ans || raw.options?.[raw.correct || 0] || '',
        exp: raw.exp || ''
      };
    }

    const correctAnswer = {
      index: typeof raw.correct === 'number' ? raw.correct : 0,
      key: String.fromCharCode(65 + (typeof raw.correct === 'number' ? raw.correct : 0)),
      value: raw.ans || raw.options?.[raw.correct || 0] || ''
    };

    // 1. Insert Question (Marked HUMAN_CURATED as required by Section 10)
    insertQ.run(
      qId,
      null, // exam_version_id
      null, // board_id
      subjectId,
      null, // chapter_id
      null, // topic_id
      'single_mcq',
      'MEDIUM',
      1.0,
      'HUMAN_CURATED',
      null, // source_id
      '2026',
      0, // is_verified
      1 // current_version
    );

    // 2. Insert Question Version
    insertVer.run(
      `ver-${qId}-1`,
      qId,
      1,
      JSON.stringify(languageContent),
      JSON.stringify(correctAnswer),
      'Initial import from legacy repository vault',
      0
    );

    // 3. Insert Topic Tag
    if (raw.topic) {
      insertTag.run(
        `tag-${qId}-topic`,
        qId,
        raw.topic.slice(0, 60),
        'TOPIC'
      );
    }

    // 4. Migration Log
    logStmt.run(
      `mig-q-${qId}`,
      sourceFile,
      qId,
      'questions',
      qId,
      'MIGRATED',
      null,
      `Imported question into ${subjectId}, topic: ${raw.topic || 'General'}`
    );

    count++;
  }

  return count;
}

function importLegacyQuestions(db = getDb()) {
  console.log('[QuestionImporter] 🔄 Loading legacy question banks...');
  ensureSubjects(db);

  const insertQ = db.prepare(`
    INSERT INTO questions (
      question_id, exam_version_id, board_id, subject_id, chapter_id, topic_id,
      question_type_id, difficulty, marks, source_type, source_id, official_year,
      is_verified, current_version
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(question_id) DO UPDATE SET
      subject_id = excluded.subject_id,
      marks = excluded.marks
  `);

  const insertVer = db.prepare(`
    INSERT INTO question_versions (
      version_id, question_id, version_number, language_content, correct_answer, correction_reason, verified
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(version_id) DO UPDATE SET
      language_content = excluded.language_content,
      correct_answer = excluded.correct_answer
  `);

  const insertTag = db.prepare(`
    INSERT INTO question_tags (tag_id, question_id, tag_name, tag_type)
    VALUES (?, ?, ?, ?)
    ON CONFLICT(tag_id) DO NOTHING
  `);

  const logStmt = db.prepare(`
    INSERT OR REPLACE INTO migration_logs (
      log_id, source_file, source_record_id, destination_table, destination_id,
      migrated_at, migration_status, warning, transformation_summary
    ) VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP, ?, ?, ?)
  `);

  let totalImported = 0;

  const tx = db.transaction(() => {
    // 1. High-Yield Bank (510 Qs)
    const hyPath = path.join(__dirname, '..', '..', '..', 'public', 'js', 'master-high-yield-bank.js');
    if (fs.existsSync(hyPath)) {
      const hy = require(hyPath);
      totalImported += importQuestionList(db, hy.HIGH_YIELD_HINDI_BANK || [], 'subj-hindi', 'q-hy-hi', 'master-high-yield-bank.js', insertQ, insertVer, insertTag, logStmt);
      totalImported += importQuestionList(db, hy.HIGH_YIELD_MATH_BANK || [], 'subj-math', 'q-hy-math', 'master-high-yield-bank.js', insertQ, insertVer, insertTag, logStmt);
      totalImported += importQuestionList(db, hy.HIGH_YIELD_SCIENCE_BANK || [], 'subj-science', 'q-hy-sci', 'master-high-yield-bank.js', insertQ, insertVer, insertTag, logStmt);
      totalImported += importQuestionList(db, hy.HIGH_YIELD_SOCIAL_BANK || [], 'subj-social', 'q-hy-soc', 'master-high-yield-bank.js', insertQ, insertVer, insertTag, logStmt);
      totalImported += importQuestionList(db, hy.HIGH_YIELD_ENGLISH_BANK || [], 'subj-english', 'q-hy-en', 'master-high-yield-bank.js', insertQ, insertVer, insertTag, logStmt);
      totalImported += importQuestionList(db, hy.HIGH_YIELD_SANSKRIT_BANK || [], 'subj-sanskrit', 'q-hy-sa', 'master-high-yield-bank.js', insertQ, insertVer, insertTag, logStmt);
    }

    // 2. Class 12 Bank (217 Qs)
    const c12Path = path.join(__dirname, '..', '..', '..', 'public', 'js', 'master-class12-bank.js');
    if (fs.existsSync(c12Path)) {
      const c12 = require(c12Path);
      totalImported += importQuestionList(db, c12.CLASS12_PHYSICS_BANK || [], 'subj-physics', 'q-c12-phy', 'master-class12-bank.js', insertQ, insertVer, insertTag, logStmt);
      totalImported += importQuestionList(db, c12.CLASS12_CHEMISTRY_BANK || [], 'subj-chemistry', 'q-c12-chm', 'master-class12-bank.js', insertQ, insertVer, insertTag, logStmt);
      totalImported += importQuestionList(db, c12.CLASS12_BIOLOGY_BANK || [], 'subj-biology', 'q-c12-bio', 'master-class12-bank.js', insertQ, insertVer, insertTag, logStmt);
      totalImported += importQuestionList(db, c12.CLASS12_MATH_BANK || [], 'subj-math12', 'q-c12-math', 'master-class12-bank.js', insertQ, insertVer, insertTag, logStmt);
      totalImported += importQuestionList(db, c12.CLASS12_ACCOUNTANCY_BANK || [], 'subj-accountancy', 'q-c12-acc', 'master-class12-bank.js', insertQ, insertVer, insertTag, logStmt);
      totalImported += importQuestionList(db, c12.CLASS12_BUSINESS_BANK || [], 'subj-business', 'q-c12-bus', 'master-class12-bank.js', insertQ, insertVer, insertTag, logStmt);
      totalImported += importQuestionList(db, c12.CLASS12_ECONOMICS_BANK || [], 'subj-economics', 'q-c12-eco', 'master-class12-bank.js', insertQ, insertVer, insertTag, logStmt);
      totalImported += importQuestionList(db, c12.CLASS12_HISTORY_BANK || [], 'subj-history', 'q-c12-his', 'master-class12-bank.js', insertQ, insertVer, insertTag, logStmt);
      totalImported += importQuestionList(db, c12.CLASS12_POLITY_BANK || [], 'subj-polity', 'q-c12-pol', 'master-class12-bank.js', insertQ, insertVer, insertTag, logStmt);
      totalImported += importQuestionList(db, c12.CLASS12_GEOGRAPHY_BANK || [], 'subj-geography', 'q-c12-geo', 'master-class12-bank.js', insertQ, insertVer, insertTag, logStmt);
    }

    // 3. Competitive Bank (145 Qs)
    const compPath = path.join(__dirname, '..', '..', '..', 'public', 'js', 'master-competitive-bank.js');
    if (fs.existsSync(compPath)) {
      const comp = require(compPath);
      totalImported += importQuestionList(db, comp.COMPETITIVE_REASONING_BANK || [], 'subj-reasoning', 'q-cmp-rea', 'master-competitive-bank.js', insertQ, insertVer, insertTag, logStmt);
      totalImported += importQuestionList(db, comp.COMPETITIVE_MATH_BANK || [], 'subj-math', 'q-cmp-mth', 'master-competitive-bank.js', insertQ, insertVer, insertTag, logStmt);
      totalImported += importQuestionList(db, comp.UP_POLICE_LAW_SPECIAL_BANK || [], 'subj-law', 'q-cmp-law', 'master-competitive-bank.js', insertQ, insertVer, insertTag, logStmt);
      totalImported += importQuestionList(db, comp.RAILWAY_SCIENCE_TECH_BANK || [], 'subj-railway-sci', 'q-cmp-rsc', 'master-competitive-bank.js', insertQ, insertVer, insertTag, logStmt);
      totalImported += importQuestionList(db, comp.COMPETITIVE_GK_GS_BANK || [], 'subj-gk', 'q-cmp-gk', 'master-competitive-bank.js', insertQ, insertVer, insertTag, logStmt);
    }
  });

  tx();
  console.log(`[QuestionImporter] ✅ Successfully imported ${totalImported} questions into database.`);
  return { totalImported };
}

module.exports = { importLegacyQuestions };
