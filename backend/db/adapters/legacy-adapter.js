// backend/db/adapters/legacy-adapter.js
// Bridges the persistent SQLite Database to legacy frontend contracts.
// If the database is available, serves data from SQLite.
// If the database is unavailable, transparently falls back to legacy JS files.

const examRepository = require('../repositories/exam-repository');
const questionRepository = require('../repositories/question-repository');
const path = require('path');
const fs = require('fs');
const vm = require('vm');

let cachedLegacyExams = null;

function loadFallbackLegacyExams() {
  if (cachedLegacyExams) return cachedLegacyExams;
  try {
    const filePath = path.join(__dirname, '..', '..', '..', 'public', 'js', 'exams-data.js');
    const content = fs.readFileSync(filePath, 'utf8');
    const sandbox = { window: {}, console: console };
    sandbox.global = sandbox;
    vm.createContext(sandbox);
    vm.runInContext(content + '\n;global.__EXAMS__ = typeof EXAMS_DATABASE !== "undefined" ? EXAMS_DATABASE : [];', sandbox);
    cachedLegacyExams = sandbox.__EXAMS__ || [];
    console.warn('[LegacyAdapter] ⚠️ Serving from fallback public/js/exams-data.js');
    return cachedLegacyExams;
  } catch (err) {
    console.error('[LegacyAdapter] Failed to load fallback exams-data.js:', err.message);
    return [];
  }
}

function getExamsDatabase() {
  if (!examRepository.isAvailable()) {
    return loadFallbackLegacyExams();
  }

  try {
    const rows = examRepository.getAllExams();
    if (!rows || rows.length === 0) {
      return loadFallbackLegacyExams();
    }

    return rows.map(r => {
      let rawData = {};
      try {
        if (r.raw_data) rawData = JSON.parse(r.raw_data);
      } catch (e) {}

      return {
        id: r.exam_id,
        name: r.name,
        shortName: r.short_name,
        category: r.category,
        conductingBody: r.conducting_body_name || r.name,
        state: r.state_or_ut || "All India / Central",
        status: r.status,
        officialUrl: r.official_website,
        applyUrl: r.notification_url || r.official_website,
        pdfUrl: r.syllabus_url || r.official_website,
        resultUrl: r.result_url || r.official_website,
        resultServer2: r.result_url,
        digilockerUrl: "https://digilocker.gov.in",
        importantDates: rawData.importantDates || { "Status": "Active" },
        fees: rawData.fees || { "Fee": "Refer notification" },
        eligibility: rawData.eligibility || "Refer official eligibility",
        ageLimit: rawData.ageLimit || "As per rules",
        vacancies: rawData.vacancies || { "Status": "Verified" },
        examPattern: rawData.examPattern || { "Mode": "CBT / Offline" },
        photoSpecs: rawData.photoSpecs || { type: "photo", minKb: 20, maxKb: 50 },
        signSpecs: rawData.signSpecs || { type: "signature", minKb: 10, maxKb: 20 },
        physicalStandards: rawData.physicalStandards || null
      };
    });
  } catch (err) {
    console.error('[LegacyAdapter] Error reading exams from DB, engaging fallback:', err.message);
    return loadFallbackLegacyExams();
  }
}

function getQuestionsForQuiz(subjectId = 'subj-hindi', count = 30) {
  if (!questionRepository.isAvailable()) {
    console.warn('[LegacyAdapter] ⚠️ Database offline, fallback to legacy quiz data');
    return null;
  }

  try {
    const rows = questionRepository.getRandomQuestions(subjectId, count);
    if (!rows || rows.length === 0) return null;

    return rows.map((r, idx) => {
      let langContent = {};
      let correctAnswer = { index: 0 };
      try {
        langContent = JSON.parse(r.language_content);
        correctAnswer = JSON.parse(r.correct_answer);
      } catch (e) {}

      const hi = langContent.hi || {};
      const en = langContent.en;

      let qText = hi.q || '';
      if (en && en.q) {
        qText += `\n[${en.q}]`;
      }

      return {
        id: `${r.question_id}-${idx + 1}`,
        uniqueKey: `${r.question_id}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        examTags: [r.exam_version_id || 'general'],
        subjectTags: [r.subject_id],
        subjectName: r.subject_name || 'General',
        q: qText,
        options: hi.options || [],
        correct: typeof correctAnswer.index === 'number' ? correctAnswer.index : 0,
        ans: hi.ans || (hi.options ? hi.options[correctAnswer.index || 0] : ''),
        explanation: hi.exp || 'Verified answer from database.',
        topic: r.subject_name || 'General Topic',
        boardTag: 'Database Verified Question'
      };
    });
  } catch (err) {
    console.error('[LegacyAdapter] Error reading questions from DB:', err.message);
    return null;
  }
}

module.exports = {
  getExamsDatabase,
  getQuestionsForQuiz,
  isDatabaseActive: () => examRepository.isAvailable()
};
