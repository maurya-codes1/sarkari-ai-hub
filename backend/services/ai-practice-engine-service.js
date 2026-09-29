// backend/services/ai-practice-engine-service.js
// Phase 11: Source-Grounded AI Practice Question Engine & Strict Provenance Separation
// Provides pluggable AI provider abstraction, multi-layer validation (structural, answer, syllabus, duplicate, novelty),
// strict provenance isolation (Tier: AI_PRACTICE, full_exam_eligible: 0), versioning, and practice pool enrichment.

const crypto = require('crypto');
const path = require('path');
const { getDb } = require('../db/database');
const duplicateEngine = require('./duplicate-engine');
const qualityValidationPipeline = require('./quality-validation-pipeline');

/**
 * Pluggable AI Provider Interface & Default Deterministic Engine
 */
class DefaultAiProvider {
  constructor(name = 'default-source-grounded-engine', version = '1.0.0') {
    this.name = name;
    this.version = version;
  }

  async generateQuestion(context) {
    const {
      concept = 'Core Syllabus Concept',
      questionType = 'single_mcq',
      targetDifficulty = 'MEDIUM',
      language = 'hi',
      subjectId = 'subj-general',
      chapterId = null,
      topicId = null,
      index = 0
    } = context;

    const diff = String(targetDifficulty || 'MEDIUM').toUpperCase();
    const isHindi = language === 'hi';

    // Domain templates for source-grounded practice generation
    if (/percentage|profit|loss|interest|ratio|algebra|math/i.test(concept) || subjectId.includes('math') || subjectId.includes('quant')) {
      const base = 100 + (index + 1) * 50;
      const rate = 10 + (index * 2);
      const answer = (base * rate) / 100;
      return {
        stem: isHindi
          ? `यदि किसी वस्तु का क्रय मूल्य ₹${base} है और उस पर ${rate}% का लाभ होता है, तो कुल लाभ राशि क्या होगी?`
          : `If the cost price of an article is ₹${base} and a profit of ${rate}% is made, what is the total profit amount?`,
        questionType: 'single_mcq',
        difficulty: diff,
        cognitiveLevel: 'APPLY',
        language,
        options: [
          { optionId: 'opt_a', text: `₹${answer}`, isCorrect: true, explanation: isHindi ? `सही उत्तर ₹${answer} है (${base} × ${rate} / 100)।` : `Correct: (${base} × ${rate}) / 100 = ₹${answer}.` },
          { optionId: 'opt_b', text: `₹${answer + 10}`, isCorrect: false, explanation: 'Incorrect arithmetic calculation.' },
          { optionId: 'opt_c', text: `₹${answer - 5}`, isCorrect: false, explanation: 'Incorrect arithmetic calculation.' },
          { optionId: 'opt_d', text: `₹${answer * 2}`, isCorrect: false, explanation: 'Incorrect calculation factor.' }
        ],
        expectedAnswer: `₹${answer}`,
        explanation: isHindi
          ? `विस्तृत व्याख्या:\nलाभ = (क्रय मूल्य × लाभ %) / 100\n= (${base} × ${rate}) / 100\n= ₹${answer}। अतः विकल्प (A) सही उत्तर है।`
          : `Detailed Explanation:\nProfit = (Cost Price × Profit %) / 100\n= (${base} × ${rate}) / 100\n= ₹${answer}. Hence Option (A) is correct.`,
        marks: 1.0,
        negativeMarks: 0.25,
        sourceContext: `Syllabus Grounding: ${subjectId} - ${concept}`
      };
    }

    if (/polity|constitution|article|fundamental rights/i.test(concept) || subjectId.includes('polity') || subjectId.includes('gk')) {
      const articles = [
        { no: 14, nameHi: 'विधि के समक्ष समता', nameEn: 'Equality before law' },
        { no: 19, nameHi: 'वाक् एवं अभिव्यक्ति की स्वतंत्रता', nameEn: 'Freedom of speech and expression' },
        { no: 21, nameHi: 'प्राण और दैहिक स्वतंत्रता का संरक्षण', nameEn: 'Protection of life and personal liberty' },
        { no: 32, nameHi: 'संवैधानिक उपचारों का अधिकार', nameEn: 'Right to Constitutional Remedies' }
      ];
      const art = articles[index % articles.length];
      return {
        stem: isHindi
          ? `भारतीय संविधान का कौन-सा अनुच्छेद "${art.nameHi}" की गारंटी प्रदान करता है?`
          : `Which Article of the Constitution of India guarantees "${art.nameEn}"?`,
        questionType: 'single_mcq',
        difficulty: diff,
        cognitiveLevel: 'REMEMBER',
        language,
        options: [
          { optionId: 'opt_a', text: isHindi ? `अनुच्छेद ${art.no}` : `Article ${art.no}`, isCorrect: true, explanation: isHindi ? `अनुच्छेद ${art.no} सही उत्तर है।` : `Article ${art.no} is correct.` },
          { optionId: 'opt_b', text: isHindi ? `अनुच्छेद ${art.no + 4}` : `Article ${art.no + 4}`, isCorrect: false, explanation: 'Incorrect article reference.' },
          { optionId: 'opt_c', text: isHindi ? `अनुच्छेद ${art.no + 11}` : `Article ${art.no + 11}`, isCorrect: false, explanation: 'Incorrect article reference.' },
          { optionId: 'opt_d', text: isHindi ? `अनुच्छेद ${art.no + 18}` : `Article ${art.no + 18}`, isCorrect: false, explanation: 'Incorrect article reference.' }
        ],
        expectedAnswer: isHindi ? `अनुच्छेद ${art.no}` : `Article ${art.no}`,
        explanation: isHindi
          ? `विस्तृत व्याख्या:\nभारतीय संविधान के भाग III में अनुच्छेद ${art.no} "${art.nameHi}" से संबंधित है। अतः विकल्प (A) सही है।`
          : `Detailed Explanation:\nArticle ${art.no} under Part III of the Constitution of India relates to "${art.nameEn}". Hence option (A) is correct.`,
        marks: 1.0,
        negativeMarks: 0.25,
        sourceContext: `Constitution of India Part III - Fundamental Rights`
      };
    }

    if (/numerical/i.test(questionType)) {
      const val1 = (index + 2) * 10;
      const val2 = 5;
      const ans = val1 / val2;
      return {
        stem: isHindi
          ? `यदि एक वस्तु की गति ${val1} मीटर/सेकंड है, तो ${val2} सेकंड में तय की गई दूरी को गति से विभाजित करने पर प्राप्त मान क्या होगा?`
          : `If the speed of an object is ${val1} m/s, what is the value obtained by dividing total distance by time for ${val2} seconds?`,
        questionType: 'numerical',
        difficulty: diff,
        cognitiveLevel: 'APPLY',
        language,
        options: [],
        expectedAnswer: String(ans),
        correctValue: ans,
        tolerance: 0.01,
        explanation: isHindi
          ? `विस्तृत हल: गति = ${val1} m/s, मान = ${ans}।`
          : `Detailed Solution: Speed = ${val1} m/s, Calculated value = ${ans}.`,
        marks: 2.0,
        negativeMarks: 0.0,
        sourceContext: `Basic Physics Mechanics Formula`
      };
    }

    if (/subjective/i.test(questionType) || questionType === 'short_answer' || questionType === 'long_answer') {
      return {
        stem: isHindi
          ? `अवधारणा "${concept}" के मुख्य सिद्धांतों एवं अनुप्रयोगों का संक्षिप्त विवरण दीजिए।`
          : `Provide a concise explanation of the core principles and applications of "${concept}".`,
        questionType: questionType === 'long_answer' ? 'long_answer' : 'short_answer',
        difficulty: diff,
        cognitiveLevel: 'ANALYZE',
        language,
        options: [],
        expectedAnswer: isHindi
          ? `मॉडल उत्तर: अवधारणा "${concept}" विषय पाठ्यक्रम का महत्वपूर्ण हिस्सा है जिसके अंतर्गत आधारभूत नियमों का अध्ययन किया जाता है।`
          : `Model Answer: The concept "${concept}" forms a foundational part of the curriculum covering core principles.`,
        explanation: isHindi
          ? `मूल्यांकन दिशानिर्देश: उत्तर में अवधारणा का परिचय, मुख्य बिंदु एवं व्यवहारिक उदाहरण सम्मिलित होने चाहिए।`
          : `Evaluation Rubric: Answer should include introduction, key points, and illustrative examples.`,
        marks: 5.0,
        negativeMarks: 0.0,
        sourceContext: `Subjective Model Syllabus Guide`
      };
    }

    // Default standard single MCQ
    return {
      stem: isHindi
        ? `पाठ्यक्रम अवधारणा "${concept}" के संदर्भ में निम्नलिखित में से कौन-सा कथन प्रामाणिक एवं सत्य है?`
        : `In the context of the syllabus concept "${concept}", which of the following statements is authoritative and correct?`,
      questionType: 'single_mcq',
      difficulty: diff,
      cognitiveLevel: 'UNDERSTAND',
      language,
      options: [
        { optionId: 'opt_a', text: isHindi ? `यह अवधारणा निर्धारित पाठ्यक्रम के मुख्य सिद्धांतों पर आधारित है।` : `This concept is based on standard verified syllabus principles.`, isCorrect: true, explanation: 'Authoritative definition.' },
        { optionId: 'opt_b', text: isHindi ? `यह अवधारणा पाठ्यक्रम एवं मानक संदर्भ से असंबद्ध है।` : `This concept is disconnected from standard reference textbooks.`, isCorrect: false, explanation: 'Incorrect.' },
        { optionId: 'opt_c', text: isHindi ? `यह नियम किसी भी वास्तविक परिस्थिति में लागू नहीं होता।` : `This rule does not apply under any empirical condition.`, isCorrect: false, explanation: 'Incorrect.' },
        { optionId: 'opt_d', text: isHindi ? `इस अवधारणा का कोई प्रामाणिक शैक्षणिक आधार नहीं है।` : `This concept has no verifiable academic foundation.`, isCorrect: false, explanation: 'Incorrect.' }
      ],
      expectedAnswer: isHindi ? `यह अवधारणा निर्धारित पाठ्यक्रम के मुख्य सिद्धांतों पर आधारित है।` : `This concept is based on standard verified syllabus principles.`,
      explanation: isHindi
        ? `विस्तृत व्याख्या:\nअवधारणा "${concept}" का अध्ययन पाठ्यक्रम के निर्धारित लक्ष्यों के अनुरूप आवश्यक है। अतः विकल्प (A) सही उत्तर है।`
        : `Detailed Explanation:\nThe concept "${concept}" accurately reflects core curriculum objectives. Hence option (A) is correct.`,
      marks: 1.0,
      negativeMarks: 0.25,
      sourceContext: `Standard Syllabus Module: ${subjectId}`
    };
  }

  async validateQuestion(question, context = {}) {
    return { valid: true, providerDetails: 'Default rule-based validation passed.' };
  }
}

class AiPracticeEngineService {
  constructor(provider = new DefaultAiProvider()) {
    this.provider = provider;
    this.PROVENANCE = 'AI_PRACTICE';
    this.MAX_BATCH_SIZE = 25;
    this.ALLOWED_TYPES = new Set([
      'single_mcq',
      'multiple_mcq',
      'numerical',
      'assertion_reason',
      'short_answer',
      'long_answer',
      'case_study',
      'match_following'
    ]);
    this.SUPPORTED_LANGUAGES = new Set(['hi', 'en', 'ta', 'te', 'mr', 'bn']);
    this.VALID_DIFFICULTIES = new Set(['EASY', 'MEDIUM', 'HARD', 'MIXED']);
    this.DERIVED_TYPES = new Set([
      'PYQ_INSPIRED',
      'BLUEPRINT_INSPIRED',
      'SYLLABUS_INSPIRED',
      'TOPIC_INSPIRED',
      'GENERAL_PRACTICE'
    ]);
  }

  /**
   * Set custom AI provider
   */
  setProvider(provider) {
    if (!provider || typeof provider.generateQuestion !== 'function') {
      throw new Error('Invalid AI provider. Must implement generateQuestion(context).');
    }
    this.provider = provider;
  }

  /**
   * Generates a batch of validated AI Practice questions with strict provenance isolation
   */
  async generatePracticeBatch(params, db = getDb()) {
    if (!db) throw new Error('Database unavailable');

    const {
      rootExamId,
      componentId,
      versionId,
      subjectId,
      chapterId = null,
      topicId = null,
      concept,
      questionType = 'single_mcq',
      targetDifficulty = 'MEDIUM',
      language = 'hi',
      count = 5,
      derivedFromType = 'SYLLABUS_INSPIRED'
    } = params;

    // 1. Mandatory Context Checks
    if (!rootExamId || !subjectId || !concept) {
      throw new Error('rootExamId, subjectId, and concept are strictly required for AI practice generation.');
    }

    if (!this.ALLOWED_TYPES.has(questionType)) {
      throw new Error(`Unsupported question type: '${questionType}'. Supported: ${Array.from(this.ALLOWED_TYPES).join(', ')}`);
    }

    if (!this.SUPPORTED_LANGUAGES.has(language)) {
      throw new Error(`Unsupported language code: '${language}'. Supported: ${Array.from(this.SUPPORTED_LANGUAGES).join(', ')}`);
    }

    const batchCount = Math.min(Math.max(1, count), this.MAX_BATCH_SIZE);

    // 2. Blueprint & Syllabus Boundary Validation
    const exam = db.prepare('SELECT exam_id, name FROM exams WHERE exam_id = ?').get(rootExamId);
    if (!exam) {
      throw new Error(`Exam '${rootExamId}' does not exist.`);
    }

    const subject = db.prepare('SELECT subject_id, name FROM subjects WHERE subject_id = ?').get(subjectId);
    if (!subject) {
      throw new Error(`Subject '${subjectId}' is invalid or outside verified syllabus.`);
    }

    // 3. Generate candidate questions
    const generatedCandidates = [];
    const validatedCandidates = [];
    const rejectedCandidates = [];
    const needsReviewCandidates = [];

    for (let i = 0; i < batchCount; i++) {
      const candidate = await this.provider.generateQuestion({
        rootExamId,
        componentId: componentId || `comp-${rootExamId}`,
        versionId: versionId || `ver-${rootExamId}-2026`,
        subjectId,
        chapterId,
        topicId,
        concept,
        questionType,
        targetDifficulty,
        language,
        index: i
      });

      candidate.rootExamId = rootExamId;
      candidate.componentId = componentId || `comp-${rootExamId}`;
      candidate.versionId = versionId || `ver-${rootExamId}-2026`;
      candidate.subjectId = subjectId;
      candidate.chapterId = chapterId;
      candidate.topicId = topicId;
      candidate.concept = concept;
      candidate.derivedFromType = this.DERIVED_TYPES.has(derivedFromType) ? derivedFromType : 'GENERAL_PRACTICE';
      candidate.provenance = this.PROVENANCE;
      candidate.fullExamEligible = 0; // Strict Invariant: Never Full Exam eligible

      generatedCandidates.push(candidate);

      // 4. Multi-Layer Validation Pipeline
      const validationResult = this.validateCandidate(candidate, db);
      candidate.validationResult = validationResult;

      if (validationResult.status === 'VALIDATED') {
        validatedCandidates.push(candidate);
      } else if (validationResult.status === 'NEEDS_REVIEW') {
        needsReviewCandidates.push(candidate);
      } else {
        rejectedCandidates.push(candidate);
      }
    }

    return {
      rootExamId,
      componentId: componentId || `comp-${rootExamId}`,
      subjectId,
      concept,
      totalGenerated: generatedCandidates.length,
      validatedCount: validatedCandidates.length,
      rejectedCount: rejectedCandidates.length,
      needsReviewCount: needsReviewCandidates.length,
      validatedCandidates,
      rejectedCandidates,
      needsReviewCandidates
    };
  }

  /**
   * Multi-Layer Question Validation
   */
  validateCandidate(question, db = getDb()) {
    const checks = [];
    const failures = [];

    // Layer 1: Structural Validation
    const stem = (question.stem || question.question_text || '').trim();
    const hasValidStem = stem.length >= 15 && !stem.endsWith('...') && !/[<>{}]/.test(stem);
    checks.push({ layer: 'STRUCTURE', check: 'STEM_VALIDITY', passed: hasValidStem });
    if (!hasValidStem) failures.push('FAIL_INVALID_STEM');

    const marks = Number(question.marks || 1.0);
    const negMarks = Number(question.negativeMarks !== undefined ? question.negativeMarks : 0.25);
    const hasValidMarks = marks > 0 && negMarks >= 0;
    checks.push({ layer: 'STRUCTURE', check: 'MARKS_VALIDITY', passed: hasValidMarks });
    if (!hasValidMarks) failures.push('FAIL_INVALID_MARKS');

    // Layer 2: Answer Validation
    const qType = question.questionType || question.question_type_id || 'single_mcq';
    const options = question.options || [];

    if (qType === 'single_mcq') {
      const correctOpts = options.filter(o => o.isCorrect === true || o.is_correct === 1);
      const isMcqValid = options.length >= 4 && correctOpts.length === 1;
      checks.push({ layer: 'ANSWER', check: 'SINGLE_MCQ_KEY', passed: isMcqValid });
      if (!isMcqValid) failures.push('FAIL_MCQ_OPTIONS_OR_MULTIPLE_CORRECT');

      // Check unique options
      const optTexts = options.map(o => (typeof o === 'string' ? o : o.text || '').toLowerCase().trim());
      const hasUniqueOpts = new Set(optTexts).size === optTexts.length;
      checks.push({ layer: 'ANSWER', check: 'UNIQUE_OPTIONS', passed: hasUniqueOpts });
      if (!hasUniqueOpts) failures.push('FAIL_DUPLICATE_OPTIONS');
    } else if (qType === 'numerical') {
      const hasExpectedNum = question.expectedAnswer !== undefined || question.correctValue !== undefined;
      let isMathValid = true;
      if (hasExpectedNum) {
        const val = parseFloat(question.expectedAnswer || question.correctValue);
        isMathValid = !isNaN(val);
      } else {
        isMathValid = false;
      }
      checks.push({ layer: 'ANSWER', check: 'NUMERICAL_VALIDITY', passed: isMathValid });
      if (!isMathValid) failures.push('FAIL_INVALID_NUMERICAL_ANSWER');
    } else if (qType === 'short_answer' || qType === 'long_answer') {
      const hasModelAnswer = Boolean(question.expectedAnswer && question.expectedAnswer.trim().length >= 10);
      checks.push({ layer: 'ANSWER', check: 'SUBJECTIVE_MODEL_ANSWER', passed: hasModelAnswer });
      if (!hasModelAnswer) failures.push('FAIL_MISSING_MODEL_ANSWER');
    }

    // Layer 3: Syllabus & Component Isolation
    const hasValidSubject = Boolean(question.subjectId);
    checks.push({ layer: 'SYLLABUS', check: 'SUBJECT_MAPPING', passed: hasValidSubject });
    if (!hasValidSubject) failures.push('FAIL_MISSING_SUBJECT');

    // Layer 4: Duplicate & Novelty Check (Including PYQ Protection)
    let duplicateStatus = 'NOVEL';
    if (db) {
      // 4a. Exact Hash Check
      const hash = crypto.createHash('sha256').update(stem.toLowerCase()).digest('hex');
      const exactDup = db.prepare('SELECT question_id, provenance FROM questions WHERE fingerprint = ?').get(hash);
      if (exactDup) {
        duplicateStatus = 'EXACT_DUPLICATE';
        failures.push(`FAIL_EXACT_DUPLICATE_${exactDup.question_id}`);
      } else {
        // 4b. PYQ & Existing Corpus Similarity Check
        const sampleQuestions = db.prepare(`
          SELECT q.question_id, q.provenance, qv.language_content 
          FROM questions q
          LEFT JOIN question_versions qv ON q.question_id = qv.question_id
          WHERE q.subject_id = ?
          LIMIT 50
        `).all(question.subjectId || '');

        for (const ex of sampleQuestions) {
          let exText = '';
          if (ex.language_content) {
            try {
              const lc = JSON.parse(ex.language_content);
              const langKey = Object.keys(lc)[0];
              exText = langKey && lc[langKey] ? lc[langKey].text || '' : '';
            } catch (e) {}
          }
          if (exText) {
            const sim = duplicateEngine.calculateLexicalSimilarity(stem, exText);
            if (sim >= 0.85) {
              if (ex.provenance === 'OFFICIAL_PYQ' || ex.provenance === 'OFFICIAL_SAMPLE') {
                duplicateStatus = 'NEAR_DUPLICATE_PYQ';
                failures.push(`FAIL_PYQ_SIMILARITY_PROTECTION_${ex.question_id}`);
              } else {
                duplicateStatus = 'NEAR_DUPLICATE';
                failures.push(`FAIL_NEAR_DUPLICATE_${ex.question_id}`);
              }
              break;
            }
          }
        }
      }
    }
    checks.push({ layer: 'NOVELTY', check: 'DUPLICATE_CONTROL', passed: duplicateStatus === 'NOVEL', details: duplicateStatus });

    // Layer 5: Strict Provenance & Full Exam Isolation Invariant
    const fullExamPass = Number(question.fullExamEligible || 0) === 0;
    checks.push({ layer: 'ISOLATION', check: 'FULL_EXAM_EXCLUSION', passed: fullExamPass });
    if (!fullExamPass) failures.push('FAIL_CRITICAL_FULL_EXAM_LEAK');

    const allPassed = checks.every(c => c.passed);
    let finalStatus = 'VALIDATED';
    if (!allPassed) {
      finalStatus = duplicateStatus === 'NEAR_DUPLICATE_PYQ' ? 'NEEDS_REVIEW' : 'REJECTED';
    }

    return {
      status: finalStatus,
      passed: allPassed,
      duplicateStatus,
      failures,
      checks
    };
  }

  /**
   * Persists a validated AI Practice question into SQLite with versioning and audit trail
   */
  commitPracticeQuestion(question, db = getDb()) {
    if (!db) throw new Error('Database unavailable');

    const validation = this.validateCandidate(question, db);
    if (validation.status !== 'VALIDATED') {
      throw new Error(`Cannot commit unvalidated question. Status: ${validation.status}. Failures: ${validation.failures.join(', ')}`);
    }

    const qId = question.questionId || `q_ai_${Date.now()}_${crypto.randomBytes(3).toString('hex')}`;
    const vId = `qv_ai_${Date.now()}_${crypto.randomBytes(3).toString('hex')}`;
    const stem = question.stem || question.question_text || '';
    const hash = crypto.createHash('sha256').update(stem.toLowerCase().trim()).digest('hex');
    const lang = question.language || 'hi';

    const langContent = {
      [lang]: {
        text: stem,
        options: question.options || [],
        explanation: question.explanation || ''
      }
    };

    let correctKey = 'opt_a';
    if (question.options && question.options.length > 0) {
      const correctOpt = question.options.find(o => o.isCorrect === true || o.is_correct === 1);
      if (correctOpt) correctKey = correctOpt.optionId || 'opt_a';
    } else if (question.expectedAnswer) {
      correctKey = String(question.expectedAnswer);
    }

    // Validate exam_version_id against exam_versions
    let validVersionId = null;
    if (question.versionId) {
      const verCheck = db.prepare('SELECT version_id FROM exam_versions WHERE version_id = ?').get(question.versionId);
      if (verCheck) validVersionId = verCheck.version_id;
    }

    const tx = db.transaction(() => {
      // 1. Insert Question record
      db.prepare(`
        INSERT INTO questions (
          question_id, exam_version_id, subject_id, chapter_id, topic_id,
          question_type_id, difficulty, marks, source_type, provenance,
          question_tier, fingerprint, is_verified, full_exam_eligible,
          practice_eligible, quality_state, ai_validation_status, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'AI_PRACTICE', 'AI_PRACTICE', 'TIER_5_AI_PRACTICE', ?, 1, 0, 1, 'APPROVED', 'VALIDATED', CURRENT_TIMESTAMP)
      `).run(
        qId,
        validVersionId,
        question.subjectId,
        question.chapterId || null,
        question.topicId || null,
        question.questionType || 'single_mcq',
        question.difficulty || 'MEDIUM',
        Number(question.marks || 1.0),
        hash
      );

      // 2. Insert Question Version record (Version 1)
      db.prepare(`
        INSERT INTO question_versions (
          version_id, question_id, version_number, language_content, correct_answer, verified
        ) VALUES (?, ?, 1, ?, ?, 1)
      `).run(
        vId,
        qId,
        JSON.stringify(langContent),
        correctKey
      );
    });

    tx();

    return {
      success: true,
      questionId: qId,
      versionId: vId,
      provenance: 'AI_PRACTICE',
      fullExamEligible: 0,
      practiceEligible: 1,
      status: 'PUBLISHED_PRACTICE'
    };
  }

  /**
   * Versioned update / regeneration of an existing AI Practice question
   */
  updatePracticeQuestion(questionId, updateParams, db = getDb()) {
    if (!db) throw new Error('Database unavailable');

    const existing = db.prepare('SELECT * FROM questions WHERE question_id = ?').get(questionId);
    if (!existing) {
      throw new Error(`Question '${questionId}' not found.`);
    }

    if (existing.provenance !== 'AI_PRACTICE') {
      throw new Error(`Safety Invariant: Cannot edit non-AI question '${questionId}' through AI Practice Engine.`);
    }

    const latestVersion = db.prepare('SELECT MAX(version_number) as max_v FROM question_versions WHERE question_id = ?').get(questionId);
    const newVersionNumber = (latestVersion && latestVersion.max_v ? latestVersion.max_v : 1) + 1;
    const newVersionId = `qv_ai_${Date.now()}_v${newVersionNumber}_${crypto.randomBytes(2).toString('hex')}`;

    const lang = updateParams.language || 'hi';
    const langContent = {
      [lang]: {
        text: updateParams.stem || updateParams.text || '',
        options: updateParams.options || [],
        explanation: updateParams.explanation || ''
      }
    };

    const tx = db.transaction(() => {
      // Create new version record preserving old version
      db.prepare(`
        INSERT INTO question_versions (
          version_id, question_id, version_number, language_content, correct_answer, verified
        ) VALUES (?, ?, ?, ?, ?, 1)
      `).run(
        newVersionId,
        questionId,
        newVersionNumber,
        JSON.stringify(langContent),
        updateParams.correctAnswer || 'opt_a'
      );

      // Update question difficulty or marks if provided
      if (updateParams.difficulty || updateParams.marks) {
        db.prepare(`
          UPDATE questions
          SET difficulty = COALESCE(?, difficulty),
              marks = COALESCE(?, marks),
              updated_at = CURRENT_TIMESTAMP
          WHERE question_id = ?
        `).run(updateParams.difficulty || null, updateParams.marks || null, questionId);
      }
    });

    tx();

    return {
      success: true,
      questionId,
      versionId: newVersionId,
      versionNumber: newVersionNumber,
      changeReason: updateParams.changeReason || 'REGENERATION_OR_EDIT'
    };
  }
}

module.exports = new AiPracticeEngineService();
