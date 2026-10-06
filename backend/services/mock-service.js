// backend/services/mock-service.js
// Universal Blueprint-Driven Mock Test Engine Service
// Enforces:
// 1. Strict Blueprint-Driven Full Exam Mode vs Flexible Practice Mode
// 2. Multi-section architecture with section rules, timers, and attempt limits
// 3. Official countdown timers with automatic expiration submission
// 4. Strict Zero-Duplicate Question Selection per session
// 5. Anti-tampering server-side score calculation
// 6. Multi-language separation (UI vs Paper vs Question vs Options)
// 7. Numerical and Subjective question support hooks
// 8. Graceful fallback for legacy exams and offline operations

const blueprintRepository = require('../db/repositories/blueprint-repository');
const questionRepository = require('../db/repositories/question-repository');
const mockSessionRepository = require('../db/repositories/mock-session-repository');
const examRepository = require('../db/repositories/exam-repository');
const zeroQuestionService = require('./zero-question-service');
const aiInterleavingService = require('./ai-interleaving-service');
const contentDependencyService = require('./content-dependency-service');
const crossSurfaceLearningService = require('./cross-surface-learning-service');
const { normalizeSubjectId } = require('../utils/subject-utils');

function cleanQuestionText(text) {
  if (!text || typeof text !== 'string') return '';
  let cleaned = text.trim();
  // Strip leading metadata in brackets ONLY if it contains known prefix keywords
  cleaned = cleaned.replace(/^\[(?:RRB|SSC|UPSC|BSEB|CBSE|TBSE|UPMSP|MPBSE|RBSE|Practice|Question|Exam|Class|कक्षा|बोर्ड|अभ्यास|\d+)[^\]\r\n]*\]\s*/gi, '');
  // Strip exam/board/class/subject names followed by question numbering or colon:
  cleaned = cleaned.replace(/^(?:(?:CBSE|ICSE|CISCE|UPMSP|BSEB|RBSE|MPBSE|WBBSE|TNDGE|KSEAB|GSEB|PSEB|NIOS|CGBSE|CHSE|UBSE|SEBA|TSBIE|BIEAP|JKBOSE|DHSE|TBSE|NCERT|Class\s*\d+|कक्षा\s*\d+)\s*)+[\u0900-\u0DFF\w\s\-—]*(?:प्रश्न|प्रश्‍न|Question|Q|Ques|Que)\s*#?\d+\s*[:.\-–—]\s*/i, '');
  // Strip general board/exam/class labels:
  cleaned = cleaned.replace(/^[\u0900-\u0DFF\w\s\-—]+(Board|Exam|Class|कक्षा|बोर्ड|प्रैक्टिस|अभ्यास|Science|विज्ञान|Math|गणित|English|Hindi|Chemistry|Physics|Biology)[^:\n]{0,80}:\s*/i, '');
  // Strip leading question labels & numbering: Question #1:, प्रश्न 15:, Q.12 -, #4590:, Q13:
  cleaned = cleaned.replace(/^(?:प्रश्न\s*(?:सं\.?|संख्या|क्र\.?)|प्रश्‍न\s*(?:सं\.?|संख्या|क्र\.?)|प्रश्न|प्रश्‍न|Question|Q\.|Ques|Que|Q|ਪ੍ਰਸ਼ਨ\s*(?:ਨੰ\.?)?|ಪ್ರಶ್ನೆ|வினா|ప్రశ్న|প্রশ্ন)\s*#?\d+\s*[:.\-–—]\s*/i, '');
  cleaned = cleaned.replace(/^#?\d+\s*[:.\-–—]\s*/, '');
  cleaned = cleaned.replace(/^\(\d+\)\s*/, '');
  cleaned = cleaned.replace(/^\d+[\.)]\s+/, '');
  // Strip trailing provenance/noise in parentheses e.g. (सीबीएसई कक्षा 10 विज्ञान नमूना प्रश्न 15)? or (Question #26)
  const trailingNoiseRegex = /\s*\([^)]*(?:सीबीएसई|CBSE|कक्षा|Class|बोर्ड|Board|नमूना|Sample|पेपर|Paper|Item|प्रश्न|Question|\#\d+)[^)]*\)\s*(\??)$/i;
  const match = cleaned.match(trailingNoiseRegex);
  if (match) {
    const hasQuestionMark = cleaned.endsWith('?') || (match[1] === '?');
    cleaned = cleaned.replace(trailingNoiseRegex, hasQuestionMark ? '?' : '').trim();
  }
  // Strip inline English tags like \n[English: ...] or [English: ...]
  cleaned = cleaned.replace(/\s*(?:\\n|\n)?\[(?:English|अंग्रेज़ी|अंग्रेजी):\s*[^\]]+\]/gi, '').trim();

  // Safeguard: Never return empty if original text had meaningful characters
  if (!cleaned && text.trim()) {
    return text.trim();
  }
  return cleaned.trim() || text.trim();
}

function cleanExplanationText(text) {
  if (!text || typeof text !== 'string') return '';
  let cleaned = text.trim();
  cleaned = cleaned.replace(/^\[[^\]]+\]\s*/, '');
  return cleaned.trim();
}

const LANGUAGE_SUBJECT_IDS = new Set([
  'subj-hindi', 'subj-english', 'subj-sanskrit', 'subj-urdu', 'subj-tamil',
  'subj-telugu', 'subj-punjabi', 'subj-bengali', 'subj-gujarati', 'subj-kannada',
  'subj-malayalam', 'subj-odia', 'subj-assamese', 'subj-marathi'
]);

class MockService {
  /**
   * Initializes a new Mock Test Session
   */
  startMockSession(options = {}) {
    const {
      examId = 'ssc-gd',
      versionId = null,
      examVersionId = null,
      testMode = 'FULL_EXAM', // 'LEARNING_MOCK' | 'REVISION_MOCK' | 'PRACTICE_MOCK' | 'FULL_EXAM' | 'FULL_EXAM_PATTERN' | 'PRACTICE' | 'SUBJECT_PRACTICE' | 'ALL_SUBJECTS_PRACTICE'
      requestedCount,
      questionCount,
      count,
      size,
      subjectId = 'all',
      difficulty = 'MIXED',
      languageConfig: initialLanguageConfig = { primary: 'hi', secondary: 'en', optionMode: 'bilingual' },
      timerMode = 'COUNTDOWN',
      aiProportion = 0.0,
      strictVerification = false,
      exactCountRequired = false,
      pdfId = null,
      pdfContext = null,
      studiedQuestionIds = [],
      boardId = null,
      stage = null,
      stream = null,
      userId = null,
      preferredMedium = null,
      medium = null
    } = options;

    const effectiveCount = requestedCount || questionCount || count || size || 30;
    const targetVersionId = versionId || examVersionId || null;
    const isDbReady = mockSessionRepository.isAvailable();
    const sessionId = `mock-${Date.now()}-${Math.random().toString(36).substr(2, 7)}`;

    // Resolve Learning Loop context
    const resolvedPdfId = pdfId || (pdfContext && pdfContext.pdfId) || null;
    const resolvedStudiedIds = Array.isArray(studiedQuestionIds) && studiedQuestionIds.length > 0
      ? studiedQuestionIds
      : ((pdfContext && Array.isArray(pdfContext.questionIds)) ? pdfContext.questionIds : []);

    // STRICT EXAM ISOLATION:
    // Determine whether this exam is genuinely a 10th/12th school board
    const examObj = examRepository.getExamById(examId);
    const isBoardExam = Boolean(
      boardId ||
      stage ||
      (examObj && (examObj.category === 'boards' || examObj.board_id)) ||
      (typeof examId === 'string' && (
        examId.startsWith('board-') ||
        examId.includes('board') ||
        examId.includes('10th') ||
        examId.includes('12th') ||
        examId.includes('class-') ||
        examId.includes('cbse') ||
        examId.includes('bseb') ||
        examId.includes('upmsp') ||
        examId.includes('icse') ||
        examId.includes('tsbie') ||
        examId.includes('bieap')
      ))
    );

    // If NOT a school board (e.g. SSC, RRB, Police, NDA, UPSC, Banking), strictly PURGE board and stage!
    const BOARD_MAP = {
      'cbse': 'cbse-board', 'icse': 'cbse-board', 'upmsp': 'upmsp-uttar-pradesh',
      'bseb': 'bseb-bihar', 'maharashtra': 'msbshse-maharashtra', 'rbse': 'rbse-rajasthan',
      'mpbse': 'mpbse-madhya-pradesh', 'wb': 'wbbse-wbchse-west-bengal', 'tn': 'tamil-nadu-dge',
      'karnataka': 'karnataka-kseab-pue', 'gujarat': 'gseb-gujarat', 'haryana': 'hbse-haryana',
      'jac': 'jac-jharkhand', 'pseb': 'pseb-punjab', 'nios': 'nios-board',
      'cgbse': 'cgbse-chhattisgarh', 'bseodisha': 'odisha-bse-chse', 'ubse': 'ubse-uttarakhand',
      'seba': 'asseb-assam', 'bsetelangana': 'telangana-bsetg-tsbie', 'bsetg': 'telangana-bsetg-tsbie',
      'hpbose': 'hpbose-himachal-pradesh', 'jkbose': 'jkbose-jammu-kashmir', 'kerala': 'kerala-general-scert-dhse',
      'gbshse': 'gbshse-goa', 'bsem': 'manipur-bsem-cohsem', 'mbose': 'mbose-meghalaya',
      'mbse': 'mbse-mizoram', 'nbse': 'nbse-nagaland', 'tbse': 'tbse-tripura',
      'bseap': 'andhra-pradesh-bse-bieap', 'sbosse': 'sbosse-sikkim', 'apsbe': 'apsbe-arunachal-pradesh',
      // Common aliases
      'msbshse': 'msbshse-maharashtra', 'wbbse': 'wbbse-wbchse-west-bengal', 'tndge': 'tamil-nadu-dge',
      'kseab': 'karnataka-kseab-pue', 'hbse': 'hbse-haryana', 'bseh': 'hbse-haryana',
      'asseb': 'asseb-assam', 'odisha': 'odisha-bse-chse', 'chse': 'odisha-bse-chse',
      'tsbie': 'telangana-bsetg-tsbie', 'bieap': 'andhra-pradesh-bse-bieap'
    };
    const rawBoardId = isBoardExam ? (boardId || (examObj && examObj.board_id) || (pdfContext && pdfContext.boardId) || null) : null;
    const resolvedBoardId = rawBoardId ? (BOARD_MAP[rawBoardId] || rawBoardId) : null;
    let resolvedStage = isBoardExam ? (stage || (pdfContext && (pdfContext.classStage || pdfContext.stage)) || null) : null;
    if (isBoardExam && !resolvedStage && examId) {
      const eLower = String(examId).toLowerCase();
      if (eLower.includes('12th') || eLower.includes('class-12') || eLower.includes('c12')) {
        resolvedStage = 'Class 12';
      } else if (eLower.includes('10th') || eLower.includes('class-10') || eLower.includes('c10')) {
        resolvedStage = 'Class 10';
      }
    }
    const resolvedStream = isBoardExam ? (stream || (pdfContext && pdfContext.stream) || null) : null;
    let languageConfig = initialLanguageConfig;

    // Automatically resolve authentic native language if a regional board is selected
    if (resolvedBoardId && (!languageConfig || languageConfig.primary === 'hi')) {
      const bMap = {
        'tn': 'ta', 'tndge': 'ta', 'tamil-nadu-dge': 'ta',
        'maharashtra': 'mr', 'msbshse': 'mr', 'msbshse-maharashtra': 'mr',
        'wb': 'bn', 'wbbse': 'bn', 'wbbse-wbchse-west-bengal': 'bn',
        'kerala': 'ml', 'kerala-general-scert-dhse': 'ml',
        'karnataka': 'kn', 'kseab': 'kn', 'karnataka-kseab-pue': 'kn',
        'gujarat': 'gu', 'gseb': 'gu', 'gseb-gujarat': 'gu',
        'pseb': 'pa', 'pseb-punjab': 'pa',
        'bseodisha': 'or', 'odisha': 'or', 'odisha-bse-chse': 'or',
        'seba': 'as', 'asseb': 'as', 'asseb-assam': 'as',
        'bsetelangana': 'te', 'tsbie': 'te', 'bseap': 'te', 'bsetg': 'te', 'telangana-bsetg-tsbie': 'te', 'andhra-pradesh-bse-bieap': 'te',
        'tbse': 'bn', 'tbse-tripura': 'bn',
        'jkbose': 'ur', 'jkbose-jammu-kashmir': 'ur'
      };
      const nativeBoardLang = bMap[resolvedBoardId] || bMap[rawBoardId];
      if (nativeBoardLang) {
        languageConfig = {
          primary: nativeBoardLang,
          secondary: 'en',
          optionMode: 'bilingual'
        };
      }
    }

    if (preferredMedium || medium) {
      const chosenMed = preferredMedium || medium;
      languageConfig = {
        ...(languageConfig || {}),
        primary: chosenMed,
        preferredMedium: chosenMed,
        boardId: resolvedBoardId
      };
    } else if (resolvedBoardId) {
      languageConfig = {
        ...(languageConfig || {}),
        boardId: resolvedBoardId
      };
    }

    if (!isDbReady) {
      return this._generateOfflineFallbackSession(sessionId, examId, testMode, effectiveCount, subjectId);
    }

    const exam = examRepository.getExamById(examId) || { exam_id: examId, name: examId };

    const normSubjectId = normalizeSubjectId(subjectId);
    const isSpecificSubject = normSubjectId && normSubjectId !== 'all';
    const isLearningMock = ['LEARNING_MOCK', 'REVISION_MOCK', 'LEARNING_REVISION_MOCK'].includes(testMode);
    const isPracticeMock = testMode === 'PRACTICE_MOCK';
    const isFullExam = ['FULL_EXAM', 'FULL_EXAM_PATTERN'].includes(testMode) && !isSpecificSubject;
    const isSubjectPractice = testMode === 'SUBJECT_PRACTICE' || (!isFullExam && !isLearningMock && !isPracticeMock && isSpecificSubject);

    if (isFullExam) {
      return this._createFullExamSession({
        sessionId,
        exam,
        examId,
        versionId: targetVersionId,
        testMode,
        languageConfig,
        strictVerification: Boolean(strictVerification),
        exactCountRequired: exactCountRequired || testMode === 'FULL_EXAM_PATTERN',
        aiProportion,
        studiedQuestionIds: resolvedStudiedIds,
        pdfId: resolvedPdfId,
        boardId: resolvedBoardId,
        stage: resolvedStage
      });
    } else {
      const resolvedMode = isLearningMock ? testMode : (isPracticeMock ? testMode : (isSubjectPractice ? 'SUBJECT_PRACTICE' : testMode));
      return this._createPracticeSession({
        sessionId,
        exam,
        examId,
        versionId: targetVersionId,
        requestedCount: effectiveCount,
        subjectId: isSpecificSubject ? normSubjectId : (normSubjectId || 'all'),
        practiceType: isSubjectPractice ? 'SUBJECT_PRACTICE' : (isLearningMock ? testMode : 'ALL_SUBJECTS_PRACTICE'),
        testMode: resolvedMode,
        difficulty,
        languageConfig,
        timerMode,
        aiProportion,
        pdfId: resolvedPdfId,
        studiedQuestionIds: resolvedStudiedIds,
        boardId: resolvedBoardId,
        stage: resolvedStage,
        stream: resolvedStream,
        userId
      });
    }
  }

  /**
   * Generates a Full Exam Mock derived from the verified blueprint
   */
  _createFullExamSession({ sessionId, exam, examId, versionId = null, testMode = 'FULL_EXAM', languageConfig, strictVerification = false, exactCountRequired = false, studiedQuestionIds = [], pdfId = null, boardId = null, stage = null }) {
    const unifiedExamTruthService = require('./unified-exam-truth-service');
    const verifiedMockConfig = unifiedExamTruthService.getMockConfiguration(examId, versionId);

    // If strict verification required and blueprint is not official verified:
    if (strictVerification) {
      const fullExamGateService = require('./full-exam-gate-service');
      const readiness = fullExamGateService.evaluateExamReadiness(examId, versionId);
      if (!readiness.isEligible) {
        return {
          success: false,
          status: 'FULL_EXAM_UNAVAILABLE',
          reason: readiness.primaryReason,
          blockingReasons: readiness.blockingReasons,
          message: readiness.userMessage,
          suggestedModes: ['SUBJECT_PRACTICE', 'ALL_SUBJECTS_PRACTICE']
        };
      }
    }

    let blueprint = null;
    if (verifiedMockConfig && verifiedMockConfig.success) {
      blueprint = {
        blueprint_id: verifiedMockConfig.blueprintId,
        name: verifiedMockConfig.blueprintName,
        verification_status: 'VERIFIED',
        duration_minutes: verifiedMockConfig.durationMinutes,
        total_questions: verifiedMockConfig.totalQuestions,
        total_marks: verifiedMockConfig.totalMarks,
        is_negative_marking: verifiedMockConfig.isNegativeMarking,
        questions_to_attempt: verifiedMockConfig.questionsToAttempt,
        attempt_rule_type: verifiedMockConfig.attemptRuleType,
        sections: verifiedMockConfig.sections.map(s => ({
          section_id: s.sectionId,
          name: s.name,
          section_order: s.sectionOrder,
          subject_id: s.subjectId,
          question_count: s.questionCount,
          questions_to_attempt: s.questionsToAttempt,
          marks_correct: s.marksCorrect !== undefined ? s.marksCorrect : s.marksPerQuestion,
          marks_wrong: s.marksWrong !== undefined ? s.marksWrong : (verifiedMockConfig.isNegativeMarking ? (s.marksPerQuestion * 0.25) : 0.0),
          has_negative_marking: s.hasNegativeMarking !== undefined ? (s.hasNegativeMarking ? 1 : 0) : (verifiedMockConfig.isNegativeMarking ? 1 : 0),
          negative_value: s.negativeValue !== undefined ? s.negativeValue : (verifiedMockConfig.isNegativeMarking ? (s.marksPerQuestion * 0.25) : 0.0),
          attempt_rule_type: 'ATTEMPT_ALL',
          allowed_question_types: s.allowedQuestionTypes || ['single_mcq'],
          instructions: s.instructions
        }))
      };
      if (verifiedMockConfig.languageConfig) {
        languageConfig = {
          primary: verifiedMockConfig.languageConfig.questionLanguages[0] || 'hi',
          secondary: verifiedMockConfig.languageConfig.questionLanguages[1] || 'en',
          optionMode: verifiedMockConfig.languageConfig.isBilingual ? 'bilingual' : 'monolingual'
        };
      }
    } else {
      blueprint = blueprintRepository.getBlueprintForExam(examId);
    }

    // Fallback if no specific blueprint in DB: create a safe default single-section blueprint
    if (!blueprint) {
      blueprint = {
        blueprint_id: `bp-fallback-${examId}`,
        name: `${exam.name || examId} Standard Mock Pattern`,
        verification_status: 'NEEDS_REVIEW',
        duration_minutes: 60,
        total_questions: 30,
        questions_to_attempt: 30,
        is_negative_marking: true,
        sections: [
          {
            section_id: `sec-fallback-1`,
            name: 'General Assessment Section',
            section_order: 1,
            subject_id: 'subj-gk',
            question_count: 30,
            questions_to_attempt: 30,
            marks_correct: 1.0,
            marks_wrong: 0.25,
            has_negative_marking: 1,
            negative_value: 0.25,
            attempt_rule_type: 'ATTEMPT_ALL',
            allowed_question_types: ['single_mcq'],
            instructions: 'Attempt all questions. 0.25 negative marking applies for incorrect responses.'
          }
        ]
      };
    }

    const usedQuestionIds = new Set();
    const sessionSections = [];
    const sessionQuestions = [];
    let totalQuestionsCount = 0;
    let totalQuestionsToAttempt = 0;
    let hasInsufficientInventory = false;
    const sectionShortages = [];

    // Build questions section by section
    for (const section of blueprint.sections) {
      const neededCount = section.question_count || 20;
      totalQuestionsToAttempt += (section.questions_to_attempt || neededCount);

      // Strict Zero Duplicate Question selection (and official full_exam_eligible gating in FULL_EXAM_PATTERN mode)
      const questionsFromDb = questionRepository.getQuestionsForSection(
        section.subject_id,
        neededCount,
        Array.from(usedQuestionIds),
        section.allowed_question_types,
        testMode === 'FULL_EXAM_PATTERN',
        examId,
        boardId,
        stage
      );

      if (questionsFromDb.length < neededCount) {
        hasInsufficientInventory = true;
        sectionShortages.push({
          sectionId: section.section_id,
          sectionName: section.name,
          subjectId: section.subject_id,
          required: neededCount,
          available: questionsFromDb.length,
          shortage: neededCount - questionsFromDb.length
        });
      }

      if (strictVerification && questionsFromDb.length === 0) {
        return {
          success: false,
          status: 'FULL_EXAM_UNAVAILABLE',
          reason: 'NO_VERIFIED_QUESTIONS',
          message: `Mock Test Not Available: Verified questions are currently unavailable for section '${section.name}'.`,
          suggestedModes: ['SUBJECT_PRACTICE', 'ALL_SUBJECTS_PRACTICE']
        };
      }

      const sectionQuestionItems = [];

      for (const qRow of questionsFromDb) {
        usedQuestionIds.add(qRow.question_id);

        const formatted = this._formatQuestionForClient(qRow, section, languageConfig);
        sectionQuestionItems.push(formatted);
        sessionQuestions.push(formatted);
      }

      totalQuestionsCount += sectionQuestionItems.length;

      sessionSections.push({
        sectionId: section.section_id,
        name: section.name,
        subjectId: section.subject_id,
        subjectName: section.subject_name || section.name,
        sectionOrder: section.section_order,
        questionCount: sectionQuestionItems.length,
        blueprintTargetCount: section.question_count,
        questionsToAttempt: section.questions_to_attempt,
        marksCorrect: Number(section.marks_correct !== undefined ? section.marks_correct : (section.marksCorrect || 1.0)),
        marksWrong: Number(section.marks_wrong !== undefined ? section.marks_wrong : (section.marksWrong || 0.0)),
        hasNegativeMarking: Boolean(section.has_negative_marking !== undefined ? section.has_negative_marking : (section.is_negative_marking !== undefined ? section.is_negative_marking : blueprint.is_negative_marking)),
        negativeValue: Number(section.negative_value !== undefined ? section.negative_value : (section.marks_wrong !== undefined ? section.marks_wrong : 0.0)),
        attemptRuleType: section.attempt_rule_type || 'ATTEMPT_ALL',
        instructions: section.instructions || '',
        allowedQuestionTypes: section.allowed_question_types || ['single_mcq'],
        questionIds: sectionQuestionItems.map(q => q.id)
      });
    }

    // Exact Question Count & No Silent Fallback for Mode C
    if (exactCountRequired || testMode === 'FULL_EXAM_PATTERN') {
      if (hasInsufficientInventory || sectionShortages.length > 0 || (blueprint.total_questions && totalQuestionsCount < blueprint.total_questions)) {
        const shortageText = sectionShortages.map(s => `${s.sectionName} (${s.shortage})`).join(', ');
        return {
          success: false,
          status: 'FULL_EXAM_UNAVAILABLE',
          reason: 'FULL_EXAM_UNAVAILABLE_QUESTION_BANK_INSUFFICIENT',
          requiredTotal: blueprint.total_questions || totalQuestionsToAttempt,
          availableTotal: totalQuestionsCount,
          sectionShortages,
          message: `Full Exam pattern requires ${blueprint.total_questions || totalQuestionsToAttempt} questions. Current verified question bank has only ${totalQuestionsCount} questions with shortages in: ${shortageText || 'Sections'}. Please practice in Subject-wise Practice or All Subjects Practice mode until the question bank is fully populated.`,
          suggestedModes: ['SUBJECT_PRACTICE', 'ALL_SUBJECTS_PRACTICE']
        };
      }
    }

    const returnTestMode = (testMode === 'FULL_EXAM_PATTERN') ? 'FULL_EXAM_PATTERN' : 'FULL_EXAM';
    const isVerified = blueprint.verification_status === 'VERIFIED';
    const patternBadge = isVerified ? 'Verified Official Pattern' : 'Pattern data pending verification';

    // Phase 6 Final Addendum: Immutable Snapshot Association
    let snapshotId = null;
    try {
      const snap = contentDependencyService.getLatestSnapshot(examId, blueprint.exam_version_id);
      if (snap && snap.snapshotId) {
        snapshotId = snap.snapshotId;
      } else {
        const newSnap = contentDependencyService.createExamSnapshot(examId, blueprint.exam_version_id);
        if (newSnap && newSnap.snapshotId) {
          snapshotId = newSnap.snapshotId;
        }
      }
    } catch (e) {
      // Snapshot creation should not break mock initialization if dependencies are partial
    }

    const sessionRecord = {
      sessionId,
      examId,
      examVersionId: blueprint.exam_version_id || null,
      blueprintId: blueprint.blueprint_id,
      snapshotId,
      testMode: returnTestMode,
      languageConfig,
      durationMinutes: blueprint.duration_minutes || 60,
      totalQuestions: totalQuestionsCount,
      questionsToAttempt: totalQuestionsToAttempt,
      markingRules: {
        isNegativeMarking: Boolean(blueprint.is_negative_marking),
        verificationStatus: blueprint.verification_status
      },
      sections: sessionSections,
      questionIds: Array.from(usedQuestionIds),
      userAnswers: {},
      reviewFlags: []
    };

    // Single-Asset Uniqueness Validation (Section 7D, 7T)
    const uniqueness = crossSurfaceLearningService.validateAssetUniqueness(sessionQuestions.map(q => q.id), 'FULL_EXAM');
    if (!uniqueness.valid) {
      return {
        success: false,
        status: 'ASSET_INTERNAL_DUPLICATE_ERROR',
        reason: 'ASSET_INTERNAL_DUPLICATE',
        message: uniqueness.error
      };
    }

    // Record Cross-Surface Usage Telemetry (Section 7I)
    crossSurfaceLearningService.recordUsage('FULL_EXAM', sessionId, sessionQuestions.map(q => q.id), {
      examId,
      versionId,
      language: languageConfig ? (languageConfig.primary || 'hi') : 'hi'
    });

    mockSessionRepository.createSession(sessionRecord);

    return {
      success: true,
      sessionId,
      snapshotId,
      testMode: returnTestMode,
      modeTitle: 'Full Exam — Official Pattern',
      isFlexibleCount: false,
      examId,
      examName: exam.name || examId,
      blueprint: {
        blueprintId: blueprint.blueprint_id,
        name: blueprint.name,
        verificationStatus: blueprint.verification_status,
        patternBadge,
        isVerified,
        isFlexibleCount: false,
        totalMarks: blueprint.total_marks || (totalQuestionsCount * 1),
        durationMinutes: blueprint.duration_minutes || 60,
        totalQuestions: blueprint.total_questions || totalQuestionsCount,
        questionsToAttempt: blueprint.questions_to_attempt || totalQuestionsToAttempt,
        isNegativeMarking: Boolean(blueprint.is_negative_marking),
        hasInsufficientInventory
      },
      sections: sessionSections,
      questions: sessionQuestions,
      timerConfig: {
        mode: 'COUNTDOWN',
        durationMinutes: blueprint.duration_minutes || 60,
        totalSeconds: (blueprint.duration_minutes || 60) * 60,
        autoSubmitOnExpiry: true
      },
      languageConfig
    };
  }

  /**
   * Generates a Flexible Practice Set
   */
  _createPracticeSession({
    sessionId,
    exam,
    examId,
    versionId = null,
    requestedCount,
    subjectId,
    practiceType = 'SUBJECT_PRACTICE',
    testMode = null,
    difficulty,
    languageConfig,
    timerMode,
    aiProportion = 0.0,
    pdfId = null,
    studiedQuestionIds = [],
    boardId = null,
    stage = null,
    stream = null,
    userId = null
  }) {
    // Validate requested quantity (10, 20, 30, 50, 75, 100, 200, 250, custom)
    const validCount = Math.max(5, Math.min(250, parseInt(requestedCount, 10) || 30));

    let subjectIds = null;
    if (practiceType === 'ALL_SUBJECTS_PRACTICE' || subjectId === 'all') {
      const db = require('../db/database').getDb();
      if (db) {
        if (!boardId) {
          const bp = blueprintRepository.getBlueprintForExam(examId);
          if (bp && Array.isArray(bp.sections) && bp.sections.length > 0) {
            subjectIds = bp.sections.map(s => s.subject_id).filter(Boolean);
          }
        }
        if (!subjectIds || subjectIds.length === 0) {
          if (boardId) {
            const subRows = db.prepare(`
              SELECT DISTINCT subject_id FROM questions WHERE board_id = ? ${stage ? 'AND stage = ?' : ''} AND is_published = 1 AND quality_state != 'SYNTHETIC_QUARANTINE' AND trust_status != 'QUARANTINED'
            `).all(...(stage ? [boardId, stage] : [boardId]));
            let allSubs = subRows.map(r => r.subject_id).filter(Boolean);
            if (stream === 'science' || (examId && examId.includes('science'))) {
              const sciSubs = allSubs.filter(s => {
                const sl = s.toLowerCase();
                return sl.includes('phys') || sl.includes('chem') || sl.includes('bio') || sl.includes('math') || sl.includes('eng') || sl.includes('hindi') || sl.includes('bengali') || sl.includes('tamil') || sl.includes('telugu') || sl.includes('marathi') || sl.includes('gujarati') || sl.includes('punjabi');
              });
              if (sciSubs.length > 0) allSubs = sciSubs;
            } else if (stream === 'commerce' || (examId && examId.includes('commerce'))) {
              const comSubs = allSubs.filter(s => {
                const sl = s.toLowerCase();
                return sl.includes('account') || sl.includes('bus') || sl.includes('eco') || sl.includes('math') || sl.includes('eng') || sl.includes('hindi');
              });
              if (comSubs.length > 0) allSubs = comSubs;
            } else if (stream === 'arts' || (examId && examId.includes('arts'))) {
              const artSubs = allSubs.filter(s => {
                const sl = s.toLowerCase();
                return sl.includes('hist') || sl.includes('polit') || sl.includes('geog') || sl.includes('eco') || sl.includes('eng') || sl.includes('hindi') || sl.includes('soci');
              });
              if (artSubs.length > 0) allSubs = artSubs;
            }
            subjectIds = allSubs;
          } else {
            const subRows = db.prepare(`
              SELECT DISTINCT bs.subject_id 
              FROM blueprint_sections bs
              JOIN exam_blueprints eb ON bs.blueprint_id = eb.blueprint_id
              JOIN exam_versions ev ON eb.exam_version_id = ev.version_id
              WHERE ev.exam_id = ?
            `).all(examId);
            if (subRows && subRows.length > 0) {
              subjectIds = subRows.map(r => r.subject_id).filter(Boolean);
            } else {
              const qSubRows = db.prepare(`
                SELECT DISTINCT subject_id FROM questions WHERE (paper_id LIKE ? OR question_id LIKE ?)
              `).all(`%${examId}%`, `%${examId}%`);
              subjectIds = qSubRows.map(r => r.subject_id).filter(Boolean);
            }
          }
        }
      }
    }

    let questionsFromDb = [];
    let studiedReuseCount = 0;
    let freshVerifiedCount = 0;

    const isLearningMock = practiceType === 'LEARNING_MOCK' || testMode === 'LEARNING_MOCK' || testMode === 'REVISION_MOCK';
    const isPracticeMock = testMode === 'PRACTICE_MOCK' || (Array.isArray(studiedQuestionIds) && studiedQuestionIds.length > 0);

    if (isLearningMock) {
      // Mode A: Learning / Revision Mock Question Selection (Priority: PDF -> Revision -> Verified Context)
      const selection = crossSurfaceLearningService.selectQuestionsForLearningMock({
        examId,
        boardId,
        stage,
        stream,
        subjectId: (practiceType === 'SUBJECT_PRACTICE' && subjectId !== 'all') ? subjectId : (subjectId !== 'all' ? subjectId : null),
        language: languageConfig ? (languageConfig.primary || 'en') : 'en',
        pdfId,
        userId,
        studiedQuestionIds
      }, validCount);
      questionsFromDb = selection.questions;
      studiedReuseCount = selection.studiedReuseCount;
      freshVerifiedCount = selection.freshVerifiedCount;
    } else if (isPracticeMock) {
      // Mode B: Practice Mock Question Selection (Balanced Mix: 20-30% Studied PDF/Revision + 70-80% Broader Verified Pool)
      const selection = crossSurfaceLearningService.selectQuestionsForPracticeMock({
        examId,
        boardId,
        stage,
        stream,
        subjectId: (practiceType === 'SUBJECT_PRACTICE' && subjectId !== 'all') ? subjectId : (subjectId !== 'all' ? subjectId : null),
        language: languageConfig ? (languageConfig.primary || 'en') : 'en',
        pdfId,
        userId,
        studiedQuestionIds
      }, validCount);
      questionsFromDb = selection.questions;
      studiedReuseCount = selection.studiedReuseCount;
      freshVerifiedCount = selection.broaderPoolCount;

      // Top-up if broader pool in selection needed more questions
      if (questionsFromDb.length < validCount) {
        const topUpNeeded = validCount - questionsFromDb.length;
        const existingIds = questionsFromDb.map(q => q.question_id || q.id);
        const topUpRows = questionRepository.getPracticeQuestions({
          examId,
          subjectId: (practiceType === 'SUBJECT_PRACTICE' && subjectId !== 'all') ? subjectId : null,
          subjectIds: (practiceType === 'ALL_SUBJECTS_PRACTICE' && subjectIds && subjectIds.length > 0) ? subjectIds : null,
          boardId,
          stage,
          difficulty,
          count: topUpNeeded,
          excludeIds: existingIds
        });
        if (topUpRows && topUpRows.length > 0) {
          questionsFromDb = questionsFromDb.concat(topUpRows);
        }
      }
    } else {
      // Standard practice selection
      questionsFromDb = questionRepository.getPracticeQuestions({
        examId,
        subjectId: (practiceType === 'SUBJECT_PRACTICE' && subjectId !== 'all') ? subjectId : null,
        subjectIds: (practiceType === 'ALL_SUBJECTS_PRACTICE' && subjectIds && subjectIds.length > 0) ? subjectIds : null,
        boardId,
        stage,
        difficulty,
        count: validCount,
        excludeIds: []
      });
    }

    // Zero-question handling for practice mode
    if (questionsFromDb.length === 0) {
      return zeroQuestionService.evaluatePracticeInventory({
        examId,
        subjectId,
        requestedCount: validCount,
        availableQuestions: []
      });
    }

    const usedQuestionIds = new Set();
    let sessionQuestions = [];

    const isSubjMode = practiceType === 'SUBJECT_PRACTICE' && subjectId !== 'all';
    const sectionName = isSubjMode ? `Subject Practice: ${subjectId}` : 'Comprehensive Practice Set';
    const sectionSubjectName = isSubjMode ? subjectId : 'All Subjects';

    const practiceSection = {
      section_id: isSubjMode ? `sec-practice-${subjectId}` : 'sec-practice-all',
      name: sectionName,
      subject_id: subjectId,
      subject_name: sectionSubjectName,
      section_order: 1,
      question_count: questionsFromDb.length,
      questions_to_attempt: questionsFromDb.length,
      marks_correct: 1.0,
      marks_wrong: 0.0,
      has_negative_marking: 0,
      negative_value: 0.0,
      attempt_rule_type: 'ATTEMPT_ALL',
      instructions: 'Practice Mode: Test your concepts at your own pace.',
      questionIds: questionsFromDb.map(q => q.question_id)
    };

    for (const qRow of questionsFromDb) {
      usedQuestionIds.add(qRow.question_id);
      const formatted = this._formatQuestionForClient(qRow, practiceSection, languageConfig, true);
      sessionQuestions.push(formatted);
    }

    // AI Interleaving if aiProportion > 0
    if (aiProportion > 0) {
      const aiNeeded = Math.ceil(validCount * aiProportion);
      const aiQuestionsRaw = questionRepository.getQuestionsByProvenance('AI_PRACTICE', aiNeeded);
      const aiQuestionsFormatted = aiQuestionsRaw.map(q => this._formatQuestionForClient(q, practiceSection, languageConfig, true));
      sessionQuestions = aiInterleavingService.interleaveQuestions(sessionQuestions, aiQuestionsFormatted, {
        aiProportion,
        targetCount: sessionQuestions.length
      });
    }

    const durationMins = timerMode === 'COUNTDOWN' ? Math.ceil(sessionQuestions.length * 1.5) : 0;
    const resolvedTestMode = testMode === 'PRACTICE' ? 'PRACTICE' : (testMode || practiceType || 'PRACTICE');
    const modeTitle = (practiceType === 'LEARNING_MOCK' || resolvedTestMode === 'LEARNING_MOCK')
      ? 'Learning & Revision Mock'
      : (practiceType === 'PRACTICE_MOCK' || resolvedTestMode === 'PRACTICE_MOCK')
        ? 'Practice Mock'
        : (practiceType === 'SUBJECT_PRACTICE' || resolvedTestMode === 'SUBJECT_PRACTICE')
          ? 'Subject-wise Practice'
          : (practiceType === 'ALL_SUBJECTS_PRACTICE' || resolvedTestMode === 'ALL_SUBJECTS_PRACTICE')
            ? 'All Subjects Practice'
            : 'Practice Set';

    // Single-Asset Uniqueness Validation (Section 7D, 7T)
    const uniqueness = crossSurfaceLearningService.validateAssetUniqueness(sessionQuestions.map(q => q.id), resolvedTestMode);
    if (!uniqueness.valid) {
      return {
        success: false,
        status: 'ASSET_INTERNAL_DUPLICATE_ERROR',
        reason: 'ASSET_INTERNAL_DUPLICATE',
        message: uniqueness.error
      };
    }

    // Record Cross-Surface Usage Telemetry (Section 7I)
    crossSurfaceLearningService.recordUsage(
      (practiceType === 'LEARNING_MOCK' || resolvedTestMode === 'LEARNING_MOCK') ? 'LEARNING_MOCK' : 'PRACTICE_MOCK',
      sessionId,
      sessionQuestions.map(q => q.id),
      {
        examId,
        boardId,
        stage,
        stream,
        subjectId,
        language: languageConfig ? (languageConfig.primary || 'hi') : 'hi',
        pdfId
      }
    );

    const sessionRecord = {
      sessionId,
      examId,
      examVersionId: versionId || null,
      blueprintId: null,
      testMode: resolvedTestMode,
      languageConfig,
      durationMinutes: durationMins,
      totalQuestions: sessionQuestions.length,
      questionsToAttempt: sessionQuestions.length,
      markingRules: {
        isNegativeMarking: false,
        marksCorrect: 1.0,
        marksWrong: 0.0
      },
      sections: [practiceSection],
      questionIds: Array.from(usedQuestionIds),
      userAnswers: {},
      reviewFlags: []
    };

    mockSessionRepository.createSession(sessionRecord);

    return {
      success: true,
      sessionId,
      testMode: resolvedTestMode,
      practiceType,
      modeTitle,
      isFlexibleCount: true,
      examId,
      examName: exam.name || examId,
      studiedReuseCount: studiedReuseCount || 0,
      freshVerifiedCount: freshVerifiedCount || sessionQuestions.length,
      blueprint: {
        blueprintId: isSubjMode ? `bp-practice-${subjectId}` : 'bp-practice-all-subjects',
        name: `${modeTitle} (${sessionQuestions.length} Questions)`,
        verificationStatus: 'PRACTICE_MODE',
        patternBadge: isSubjMode ? 'Subject Practice' : (isLearningMock ? 'Learning & Revision' : (isPracticeMock ? 'Practice Mock' : 'All Subjects Practice')),
        isVerified: false,
        isFlexibleCount: true,
        totalMarks: sessionQuestions.length * 1,
        durationMinutes: durationMins,
        totalQuestions: sessionQuestions.length,
        questionsToAttempt: sessionQuestions.length,
        isNegativeMarking: false,
        hasInsufficientInventory: sessionQuestions.length < (parseInt(requestedCount, 10) || validCount)
      },
      sections: [practiceSection],
      questions: sessionQuestions,
      timerConfig: {
        mode: timerMode || 'STOPWATCH',
        durationMinutes: durationMins,
        totalSeconds: durationMins * 60,
        autoSubmitOnExpiry: timerMode === 'COUNTDOWN'
      },
      languageConfig
    };
  }

  /**
   * Evaluates answers and computes verified server-side score
   */
  submitMockSession({
    sessionId,
    userAnswers = {},
    reviewFlags = [],
    timeSpentSeconds = 0,
    isAutoSubmit = false
  }) {
    const session = mockSessionRepository.getSessionById(sessionId);

    if (!session) {
      // Offline / standalone client evaluation fallback
      return this._evaluateOfflineSubmission({ userAnswers, timeSpentSeconds, isAutoSubmit });
    }

    // Retrieve original question definitions with actual correct answers
    const questionRows = questionRepository.getQuestionsByIds(session.question_ids_json);
    const questionsMap = new Map();
    questionRows.forEach(q => questionsMap.set(q.question_id, q));

    const sections = session.sections_json || [];
    let grossMarksEarned = 0;
    let totalNegativeDeduction = 0;
    let totalCorrect = 0;
    let totalWrong = 0;
    let totalAttempted = 0;
    let totalUnattempted = 0;

    const sectionResults = [];
    const detailedReview = [];

    // Evaluate section by section
    for (const sec of sections) {
      let secCorrect = 0;
      let secWrong = 0;
      let secAttempted = 0;
      let secUnattempted = 0;
      let secMarksEarned = 0;
      let secNegativeDeduction = 0;

      const marksPerCorrect = Number(sec.marksCorrect !== undefined ? sec.marksCorrect : (sec.marks_correct !== undefined ? sec.marks_correct : (sec.marks_per_question || 1.0)));
      const hasNegative = Boolean(sec.hasNegativeMarking !== undefined ? sec.hasNegativeMarking : (sec.has_negative_marking !== undefined ? sec.has_negative_marking : false));
      const negativeVal = hasNegative ? Number(sec.negativeValue !== undefined ? sec.negativeValue : (sec.negative_value !== undefined ? sec.negative_value : (sec.marksWrong || sec.marks_wrong || 0))) : 0;
      const maxToAttempt = sec.questionsToAttempt || sec.questionCount;

      // Filter answers belonging to this section
      const secQuestionIds = Array.isArray(sec.questionIds)
        ? sec.questionIds
        : session.question_ids_json.filter(id => {
            const q = questionsMap.get(id);
            return q && (sec.subjectId === 'all' || q.subject_id === sec.subjectId);
          });

      let attemptsCountInSection = 0;

      for (const qId of secQuestionIds) {
        const qRow = questionsMap.get(qId);
        if (!qRow) continue;

        let langData = {};
        try {
          langData = JSON.parse(qRow.language_content || '{}');
        } catch (e) {}

        const hiData = langData.hi || {};
        const enData = langData.en || {};

        let parsedCorrectAns = {};
        try {
          parsedCorrectAns = JSON.parse(qRow.correct_answer || '{}');
        } catch (e) {}

        const correctIndex = typeof parsedCorrectAns.index === 'number'
          ? parsedCorrectAns.index
          : (typeof parsedCorrectAns.correct_index === 'number'
              ? parsedCorrectAns.correct_index
              : (typeof parsedCorrectAns.option === 'number' ? parsedCorrectAns.option : 0));
        const correctValue = parsedCorrectAns.value || parsedCorrectAns.correct_value || '';

        const candidateAns = userAnswers[qId];
        const isAttempted = candidateAns !== undefined && candidateAns !== null && candidateAns !== '';

        let isCorrect = false;
        let isEvaluated = true;

        if (isAttempted) {
          attemptsCountInSection++;

          // Attempt Rule enforcement: ATTEMPT_N_OF_M
          if (sec.attemptRuleType === 'ATTEMPT_N_OF_M' && attemptsCountInSection > maxToAttempt) {
            // Beyond maximum allowed attempts in this section: not evaluated towards score
            isEvaluated = false;
          }

          if (qRow.question_type_id === 'numerical') {
            // Numerical answer comparison with tolerance
            const candidateNum = parseFloat(candidateAns);
            const targetNum = parseFloat(correctValue);
            const tolerance = parseFloat(qRow.numerical_tolerance || 0.05);
            isCorrect = !isNaN(candidateNum) && !isNaN(targetNum) && Math.abs(candidateNum - targetNum) <= tolerance;
          } else if (qRow.question_type_id === 'short_answer' || qRow.question_type_id === 'long_answer') {
            // Subjective answer: captured for self-review, not auto-graded
            isCorrect = false;
            isEvaluated = false;
          } else {
            // Standard MCQ / Assertion-Reason: Compare selected option index
            const candidateIndex = parseInt(candidateAns, 10);
            isCorrect = candidateIndex === correctIndex;
          }

          if (isEvaluated) {
            secAttempted++;
            totalAttempted++;

            if (isCorrect) {
              secCorrect++;
              totalCorrect++;
              secMarksEarned += marksPerCorrect;
              grossMarksEarned += marksPerCorrect;
            } else {
              secWrong++;
              totalWrong++;
              secNegativeDeduction += negativeVal;
              totalNegativeDeduction += negativeVal;
            }
          }
        } else {
          secUnattempted++;
          totalUnattempted++;
        }

        let revQuestionText = hiData.q || hiData.question || hiData.question_text || enData.q || enData.question || enData.question_text || qRow.question_text || '';
        let revSecondaryQText = enData.q || enData.question || enData.question_text || '';
        let revOptions = hiData.options || enData.options || [];
        let revExplanation = hiData.exp || enData.exp || 'No detailed explanation available.';
        let revModelAnswer = revExplanation;
        let revKeyPoints = [];
        let revMarkingGuidance = '';

        // Apply 31-Board Medium Governance Matrix to Detailed Review
        let boardGovService = null;
        try {
          boardGovService = require('./board-medium-governance-service');
        } catch (e) {}

        if (boardGovService && (qRow.board_id || session.language_config?.boardId)) {
          try {
            const chosenMed = session.language_config?.preferredMedium || session.language_config?.primary || 'en';
            const resolvedGov = boardGovService.resolveQuestionMedium(qRow, chosenMed, { boardId: qRow.board_id || session.language_config?.boardId });
            if (resolvedGov) {
              revQuestionText = resolvedGov.primaryQuestionText || resolvedGov.questionText;
              revSecondaryQText = resolvedGov.secondaryQuestionText || '';
              if (Array.isArray(resolvedGov.options) && resolvedGov.options.length > 0) {
                revOptions = resolvedGov.options;
              }
              revExplanation = resolvedGov.modelAnswer || resolvedGov.explanation || revExplanation;
              revModelAnswer = resolvedGov.modelAnswer || revExplanation;
              revKeyPoints = resolvedGov.keyPoints || [];
              revMarkingGuidance = resolvedGov.markingGuidance || '';
            }
          } catch (e) {}
        }

        detailedReview.push({
          questionId: qId,
          sectionId: sec.sectionId,
          sectionName: sec.name,
          subjectName: qRow.subject_name || sec.name,
          questionType: qRow.question_type_id || 'single_mcq',
          questionText: revQuestionText,
          secondaryQuestionText: revSecondaryQText,
          options: revOptions,
          candidateAnswer: candidateAns,
          candidateIndex: isAttempted ? parseInt(candidateAns, 10) : null,
          correctIndex,
          correctValue,
          isAttempted,
          isCorrect,
          isEvaluated,
          explanation: revExplanation,
          modelAnswer: revModelAnswer,
          keyPoints: revKeyPoints,
          markingGuidance: revMarkingGuidance,
          topic: qRow.topic_tags || 'General'
        });
      }

      const secNetScore = parseFloat((secMarksEarned - secNegativeDeduction).toFixed(2));
      const secMaxMarks = parseFloat((maxToAttempt * marksPerCorrect).toFixed(2));

      sectionResults.push({
        sectionId: sec.sectionId,
        sectionName: sec.name,
        subjectId: sec.subjectId,
        questionCount: secQuestionIds.length,
        questionsToAttempt: maxToAttempt,
        attempted: secAttempted,
        unattempted: secUnattempted,
        correct: secCorrect,
        wrong: secWrong,
        marksEarned: parseFloat(secMarksEarned.toFixed(2)),
        negativeDeduction: parseFloat(secNegativeDeduction.toFixed(2)),
        netScore: secNetScore,
        maxMarks: secMaxMarks,
        accuracy: secAttempted > 0 ? Math.round((secCorrect / secAttempted) * 100) : 0
      });
    }

    const netTotalMarks = Math.max(0, parseFloat((grossMarksEarned - totalNegativeDeduction).toFixed(2)));
    const totalMaxMarks = sectionResults.reduce((acc, s) => acc + s.maxMarks, 0) || (session.total_questions || 1);

    const safeScore = zeroQuestionService.calculateSafeScore({
      totalQuestions: session.total_questions || detailedReview.length,
      maxPossibleMarks: totalMaxMarks,
      netScore: netTotalMarks,
      attemptedCount: totalAttempted,
      correctCount: totalCorrect,
      incorrectCount: totalWrong,
      unattemptedCount: totalUnattempted
    });

    const scorePercentage = safeScore.percentage;
    const accuracyPercentage = safeScore.accuracy;

    const mins = Math.floor(timeSpentSeconds / 60);
    const secs = timeSpentSeconds % 60;
    const timeSpentFormatted = `${mins}m ${secs}s`;

    let verdictBadge = '🏆 Merit List Top Ranker!';
    let verdictClass = 'from-emerald-600 to-teal-700';
    let verdictDesc = 'अभूतपूर्व प्रदर्शन! आपका 2026 भर्ती परीक्षा में चयन लगभग सुनिश्चित है।';

    if (scorePercentage < 40) {
      verdictBadge = '⚠️ Re-attempt Recommended';
      verdictClass = 'from-rose-600 to-orange-700';
      verdictDesc = 'अभ्यास की आवश्यकता है। कृपया परीक्षा के कमजोर विषयों का पुनः अध्ययन करें।';
    } else if (scorePercentage < 70) {
      verdictBadge = '⚡ Qualified / Good Effort';
      verdictClass = 'from-amber-500 to-orange-600';
      verdictDesc = 'सराहनीय प्रयास! थोड़ा और रिवीजन करने पर आप 90%+ स्कोर कर सकते हैं।';
    }

    const scorecard = {
      sessionId,
      examId: session.exam_id,
      testMode: session.test_mode,
      isAutoSubmit: Boolean(isAutoSubmit),
      status: isAutoSubmit ? 'EXPIRED' : 'SUBMITTED',
      statusMessage: isAutoSubmit ? 'TIME EXPIRED — AUTO SUBMITTED' : 'SUBMITTED',
      summary: {
        statusMessage: isAutoSubmit ? 'TIME EXPIRED — AUTO SUBMITTED' : 'SUBMITTED',
        totalQuestions: session.total_questions,
        questionsToAttempt: session.questions_to_attempt,
        attempted: totalAttempted,
        unattempted: totalUnattempted,
        correct: totalCorrect,
        wrong: totalWrong,
        grossMarks: parseFloat(grossMarksEarned.toFixed(2)),
        negativeMarksDeducted: parseFloat(totalNegativeDeduction.toFixed(2)),
        netScore: netTotalMarks,
        maxMarks: totalMaxMarks,
        percentage: scorePercentage,
        accuracy: accuracyPercentage,
        timeSpentSeconds,
        timeSpentFormatted,
        verdictBadge,
        verdictClass,
        verdictDesc
      },
      sections: sectionResults,
      detailedReview
    };

    // Save final scorecard to persistent DB
    mockSessionRepository.completeSession(
      sessionId,
      scorecard,
      scorecard.status,
      timeSpentSeconds
    );

    return {
      success: true,
      scorecard
    };
  }

  _formatQuestionForClient(qRow, section, languageConfig, isPractice = false) {
    let langContent = {};
    try {
      langContent = JSON.parse(qRow.language_content || '{}');
    } catch (e) {}

    const sec = section || {};
    const availableLangs = Object.keys(langContent);

    const BOARD_PRIMARY_LANG = {
      'tndge-tamilnadu': 'ta',
      'maharashtra-board': 'mr',
      'wbbse-wb': 'bn',
      'tbse-board': 'bn',
      'kerala-board': 'ml',
      'kseab-karnataka': 'kn',
      'gseb-gujarat': 'gu',
      'pseb-punjab': 'pa',
      'chse-bse-odisha': 'or',
      'seba-ahsec-assam': 'as',
      'bseap-board': 'te',
      'bsetg-board': 'te',
      'tsbie-bieap': 'te',
      'jkbose-board': 'ur',
      'icse-cisce': 'en',
      'bsem-board': 'en',
      'mbose-board': 'en',
      'mbse-board': 'en',
      'nbse-board': 'en',
      'gbshse-board': 'en'
    };

    let primaryLang = languageConfig?.primary;
    if (!primaryLang || !langContent[primaryLang]) {
      const boardLang = qRow.board_id ? BOARD_PRIMARY_LANG[qRow.board_id] : null;
      if (boardLang && langContent[boardLang]) {
        primaryLang = boardLang;
      } else {
        const regionalLang = availableLangs.find(k => k !== 'en');
        if (regionalLang && langContent[regionalLang]) {
          primaryLang = regionalLang;
        } else {
          primaryLang = langContent.hi ? 'hi' : 'en';
        }
      }
    }

    const secondaryLang = languageConfig?.secondary || (primaryLang === 'en' ? (availableLangs.find(k => k !== 'en') || 'hi') : 'en');

    const pData = langContent[primaryLang] || langContent.hi || langContent.en || {};
    const sData = langContent[secondaryLang] || langContent.en || {};

    const isLanguageSubject = LANGUAGE_SUBJECT_IDS.has(qRow.subject_id) ||
      (qRow.subject_id && (
        qRow.subject_id.includes('hindi') || qRow.subject_id.includes('english') ||
        qRow.subject_id.includes('sanskrit') || qRow.subject_id.includes('urdu') ||
        qRow.subject_id.includes('tamil') || qRow.subject_id.includes('telugu') ||
        qRow.subject_id.includes('punjabi') || qRow.subject_id.includes('bengali') ||
        qRow.subject_id.includes('gujarati') || qRow.subject_id.includes('kannada') ||
        qRow.subject_id.includes('malayalam') || qRow.subject_id.includes('odia') ||
        qRow.subject_id.includes('assamese') || qRow.subject_id.includes('marathi')
      ));

    const rawPrimaryQ = pData.stem || pData.q || pData.question || pData.question_text || pData.prompt || pData.text || sData.stem || sData.q || sData.question || sData.question_text || sData.prompt || sData.text || qRow.question_text || '';
    const cleanPrimaryQ = cleanQuestionText(rawPrimaryQ) || rawPrimaryQ;
    let rawSecondaryQ = isLanguageSubject ? '' : (sData.stem || sData.q || sData.question || sData.question_text || sData.prompt || sData.text || '');
    let cleanSecondaryQ = cleanQuestionText(rawSecondaryQ) || rawSecondaryQ;
    if (cleanSecondaryQ.toLowerCase() === cleanPrimaryQ.toLowerCase()) {
      cleanSecondaryQ = '';
    }
    if (!cleanSecondaryQ && !isLanguageSubject) {
      const match = (rawPrimaryQ || '').match(/\[(?:English|अंग्रेजी|अंग्रेज़ी):\s*([^\]]+)\]/i) || (rawPrimaryQ || '').match(/\n\[([^\]]+)\]/);
      if (match) {
        cleanSecondaryQ = (match[1] || match[0]).replace(/^\[|\]$/g, '').trim();
      }
    }

    const normalizeOptsList = (opts) => {
      if (Array.isArray(opts)) return opts;
      if (opts && typeof opts === 'object') return Object.values(opts);
      return [];
    };

    const pOpts = normalizeOptsList(pData.options);
    const sOpts = normalizeOptsList(sData.options);
    let formattedOptions = [];

    if (isLanguageSubject) {
      // Pure single language options
      formattedOptions = pOpts.map(o => String(o).trim());
    } else {
      // Non-language subject: Bilingual options (Option Primary / Option Secondary)
      const optCount = Math.max(pOpts.length, sOpts.length, 4);
      for (let i = 0; i < optCount; i++) {
        const pOpt = pOpts[i] !== undefined && pOpts[i] !== null ? String(pOpts[i]) : '';
        const sOpt = sOpts[i] !== undefined && sOpts[i] !== null ? String(sOpts[i]) : '';
        const pClean = pOpt.replace(/^[A-D]\)\s*/i, '').trim();
        const sClean = sOpt.replace(/^[A-D]\)\s*/i, '').trim();
        const prefix = ['A)', 'B)', 'C)', 'D)'][i] || `${i + 1})`;
        if (pClean && sClean && pClean.toLowerCase() !== sClean.toLowerCase()) {
          formattedOptions.push(`${prefix} ${pClean} / ${sClean}`);
        } else if (pClean) {
          formattedOptions.push(`${prefix} ${pClean}`);
        } else if (sClean) {
          formattedOptions.push(`${prefix} ${sClean}`);
        } else {
          formattedOptions.push(`${prefix} Option ${i + 1}`);
        }
      }
    }

    let resolvedSubjId = qRow.subject_id;
    if (sec.subject_id && sec.subject_id !== 'all') {
      const normSecSubj = normalizeSubjectId(sec.subject_id);
      if (normSecSubj && (normalizeSubjectId(resolvedSubjId) === normSecSubj || resolvedSubjId.includes(normSecSubj.replace(/^subj-/, '')))) {
        resolvedSubjId = normSecSubj;
      } else if (sec.subject_id === 'subj-english' && (resolvedSubjId.includes('english') || resolvedSubjId.includes('eng'))) {
        resolvedSubjId = 'subj-english';
      } else if (sec.subject_id === 'subj-math' && (resolvedSubjId.includes('math') || resolvedSubjId.includes('quant'))) {
        resolvedSubjId = 'subj-math';
      } else if (sec.subject_id === 'subj-reasoning' && (resolvedSubjId.includes('reason') || resolvedSubjId.includes('intel') || resolvedSubjId.includes('gi'))) {
        resolvedSubjId = 'subj-reasoning';
      } else if (sec.subject_id === 'subj-gk' && (resolvedSubjId.includes('gk') || resolvedSubjId.includes('ga') || resolvedSubjId.includes('awareness') || resolvedSubjId.includes('general'))) {
        resolvedSubjId = 'subj-gk';
      }
    }

    const clientQ = {
      id: qRow.question_id,
      sectionId: sec.section_id || sec.sectionId || 'sec-default',
      sectionName: sec.name || 'Default Section',
      subjectId: resolvedSubjId,
      subjectName: qRow.subject_name || sec.name || 'General',
      questionType: qRow.question_type_id || 'single_mcq',
      q: cleanPrimaryQ,
      secondaryQ: cleanSecondaryQ,
      options: formattedOptions,
      secondaryOptions: isLanguageSubject ? [] : sOpts,
      marksCorrect: sec.marks_correct !== undefined ? sec.marks_correct : (sec.marksCorrect !== undefined ? sec.marksCorrect : 1.0),
      marksWrong: sec.is_negative_marking || sec.hasNegativeMarking ? (sec.negative_value || sec.negativeValue || 0.25) : 0.0,
      topic: qRow.topic_tags || 'High Yield Question'
    };

    // For practice sessions, include correct answer and explanation for immediate feedback
    const isPracticeSession = isPractice || (sec.section_id && String(sec.section_id).startsWith('sec-practice')) || (sec.attempt_rule_type === 'ATTEMPT_ALL' && !sec.has_negative_marking);
    if (isPracticeSession) {
      let parsedCorrectAns = {};
      try {
        parsedCorrectAns = JSON.parse(qRow.correct_answer || '{}');
      } catch (e) {}
      clientQ.correct = parsedCorrectAns.index !== undefined
        ? parsedCorrectAns.index
        : (parsedCorrectAns.correct_index !== undefined
            ? parsedCorrectAns.correct_index
            : (parsedCorrectAns.option !== undefined ? parsedCorrectAns.option : 0));
      clientQ.explanation = cleanExplanationText(pData.explanation || pData.exp || sData.explanation || sData.exp || (parsedCorrectAns.explanation || ''));
      clientQ.ans = parsedCorrectAns.text || (clientQ.options[clientQ.correct] || '');
    }

    // Apply 31-Board Medium Governance Matrix
    let boardGovService = null;
    try {
      boardGovService = require('./board-medium-governance-service');
    } catch (e) {}

    let resolvedGov = null;
    if (boardGovService && (qRow.board_id || languageConfig?.boardId)) {
      try {
        const chosen = languageConfig?.preferredMedium || languageConfig?.primary || 'en';
        resolvedGov = boardGovService.resolveQuestionMedium(qRow, chosen, { boardId: qRow.board_id || languageConfig?.boardId });
      } catch (e) {}
    }

    if (resolvedGov) {
      clientQ.q = resolvedGov.primaryQuestionText || resolvedGov.questionText;
      clientQ.secondaryQ = resolvedGov.secondaryQuestionText || '';
      if (Array.isArray(resolvedGov.options) && resolvedGov.options.length > 0) {
        clientQ.options = resolvedGov.options;
      }
      if (isPracticeSession && (resolvedGov.modelAnswer || resolvedGov.explanation)) {
        clientQ.explanation = resolvedGov.modelAnswer || resolvedGov.explanation;
        clientQ.modelAnswer = resolvedGov.modelAnswer || resolvedGov.explanation;
        clientQ.keyPoints = resolvedGov.keyPoints || [];
        clientQ.markingGuidance = resolvedGov.markingGuidance || '';
      }
      clientQ.isDualLanguage = resolvedGov.isDualLanguage;
      clientQ.isLanguageSubject = resolvedGov.isLanguageSubject;
      clientQ.resolvedMedium = resolvedGov.resolvedMedium;
      if (resolvedGov.marks !== undefined) {
        clientQ.marks = resolvedGov.marks;
      }
    }

    return clientQ;
  }

  _generateOfflineFallbackSession(sessionId, examId, testMode, requestedCount, subjectId) {
    return {
      success: true,
      sessionId,
      testMode,
      examId,
      examName: examId,
      isOfflineFallback: true,
      blueprint: {
        blueprintId: 'bp-offline-fallback',
        name: 'Offline Local Practice Mode',
        verificationStatus: 'OFFLINE_FALLBACK',
        patternBadge: 'Offline Local Mode',
        isVerified: false,
        totalMarks: requestedCount,
        durationMinutes: 30,
        totalQuestions: requestedCount,
        questionsToAttempt: requestedCount,
        isNegativeMarking: false
      },
      sections: [
        {
          sectionId: 'sec-offline-1',
          name: 'General Section',
          subjectId: subjectId || 'all',
          questionCount: requestedCount,
          questionsToAttempt: requestedCount,
          marksCorrect: 1.0,
          marksWrong: 0.0,
          hasNegativeMarking: false,
          attemptRuleType: 'ATTEMPT_ALL'
        }
      ],
      questions: [],
      timerConfig: {
        mode: 'STOPWATCH',
        durationMinutes: 30,
        totalSeconds: 1800,
        autoSubmitOnExpiry: false
      }
    };
  }

  _evaluateOfflineSubmission({ userAnswers, timeSpentSeconds, isAutoSubmit }) {
    const answeredCount = Object.keys(userAnswers || {}).length;
    return {
      success: true,
      scorecard: {
        sessionId: 'offline-submit',
        testMode: 'PRACTICE',
        isAutoSubmit: Boolean(isAutoSubmit),
        status: isAutoSubmit ? 'EXPIRED' : 'SUBMITTED',
        summary: {
          totalQuestions: answeredCount,
          questionsToAttempt: answeredCount,
          attempted: answeredCount,
          unattempted: 0,
          correct: answeredCount,
          wrong: 0,
          grossMarks: answeredCount,
          negativeMarksDeducted: 0,
          netScore: answeredCount,
          maxMarks: answeredCount,
          percentage: 100,
          accuracy: 100,
          timeSpentSeconds,
          timeSpentFormatted: `${Math.floor(timeSpentSeconds / 60)}m ${timeSpentSeconds % 60}s`,
          verdictBadge: '⚡ Test Complete',
          verdictClass: 'from-blue-600 to-indigo-700',
          verdictDesc: 'Offline test submitted successfully.'
        },
        sections: [],
        detailedReview: []
      }
    };
  }

  /**
   * Retrieves available mock modes (Mode A, Mode B, Mode C) and verified blueprint summary
   */
  getMockModes(examId, versionId = null) {
    const db = require('../db/database').getDb();
    if (!db) {
      return { success: false, error: 'Database unavailable' };
    }

    const exam = examRepository.getExamById(examId) || { exam_id: examId, name: examId };

    // 1. Resolve exam version
    let version = null;
    if (versionId) {
      version = db.prepare('SELECT * FROM exam_versions WHERE version_id = ?').get(versionId);
    } else {
      version = db.prepare('SELECT * FROM exam_versions WHERE exam_id = ? AND version_status = ? ORDER BY academic_year DESC LIMIT 1')
        .get(examId, 'CURRENT') || db.prepare('SELECT * FROM exam_versions WHERE exam_id = ? LIMIT 1').get(examId);
    }
    const resolvedVersionId = version ? version.version_id : null;

    // 2. Resolve blueprint from unified truth service
    const unifiedExamTruthService = require('./unified-exam-truth-service');
    const mockTruth = unifiedExamTruthService.getMockConfiguration(examId, resolvedVersionId);

    // 3. Find available subjects and their question counts for Mode A
    let availableSubjects = [];
    if (mockTruth && mockTruth.sections && mockTruth.sections.length > 0) {
      availableSubjects = mockTruth.sections.map(s => {
        const countRow = db.prepare('SELECT COUNT(*) as c FROM questions WHERE subject_id = ?').get(s.subjectId);
        return {
          subjectId: s.subjectId,
          subjectName: s.name || s.subjectName || s.subjectId,
          availableQuestions: countRow ? countRow.c : 0,
          blueprintRequiredQuestions: s.questionCount
        };
      });
    } else {
      const subRows = db.prepare(`
        SELECT s.subject_id, s.name, COUNT(q.question_id) as q_count
        FROM subjects s
        LEFT JOIN questions q ON s.subject_id = q.subject_id
        GROUP BY s.subject_id
        HAVING q_count > 0
      `).all();
      availableSubjects = subRows.map(r => ({
        subjectId: r.subject_id,
        subjectName: r.name,
        availableQuestions: r.q_count,
        blueprintRequiredQuestions: 0
      }));
    }

    // 4. Calculate total questions available across all subjects of this exam
    const totalExamBankQuestions = availableSubjects.reduce((acc, s) => acc + s.availableQuestions, 0);

    // 5. Evaluate Mode C readiness & shortages
    let modeCAvailable = false;
    let modeCStatus = 'UNVERIFIED_PATTERN';
    let shortageDetails = null;
    let blueprintSummary = null;

    if (mockTruth && mockTruth.success && mockTruth.isEligible) {
      const sectionShortages = [];
      let totalShortage = 0;
      for (const sec of mockTruth.sections) {
        const needed = sec.questionCount;
        const subInfo = availableSubjects.find(s => s.subjectId === sec.subjectId);
        const avail = subInfo ? subInfo.availableQuestions : 0;
        if (avail < needed) {
          const shortage = needed - avail;
          totalShortage += shortage;
          sectionShortages.push({
            sectionId: sec.sectionId,
            sectionName: sec.name,
            subjectId: sec.subjectId,
            required: needed,
            available: avail,
            shortage
          });
        }
      }

      const firstSec = (mockTruth.sections && mockTruth.sections[0]) ? mockTruth.sections[0] : null;
      const negVal = mockTruth.isNegativeMarking
        ? (mockTruth.negativeMarkingValue !== undefined ? mockTruth.negativeMarkingValue : (firstSec ? firstSec.marksWrong : 0.25))
        : 0.0;

      blueprintSummary = {
        blueprintId: mockTruth.blueprintId,
        blueprintName: mockTruth.blueprintName,
        totalQuestions: mockTruth.totalQuestions,
        totalMarks: mockTruth.totalMarks,
        durationMinutes: mockTruth.durationMinutes,
        isNegativeMarking: mockTruth.isNegativeMarking,
        negativeValue: negVal,
        verificationStatus: 'VERIFIED',
        sections: mockTruth.sections.map(s => ({
          sectionId: s.sectionId,
          name: s.name,
          subjectId: s.subjectId,
          questionCount: s.questionCount,
          marksCorrect: s.marksCorrect,
          marksWrong: s.marksWrong,
          hasNegativeMarking: s.hasNegativeMarking,
          negativeValue: s.hasNegativeMarking ? s.marksWrong : 0.0
        }))
      };

      if (sectionShortages.length > 0) {
        modeCAvailable = false;
        modeCStatus = 'INSUFFICIENT_QUESTIONS';
        shortageDetails = {
          requiredTotal: mockTruth.totalQuestions,
          availableTotal: totalExamBankQuestions,
          totalShortage,
          sectionShortages
        };
      } else {
        modeCAvailable = true;
        modeCStatus = 'AVAILABLE';
      }
    } else {
      modeCAvailable = false;
      modeCStatus = mockTruth && mockTruth.reasons && mockTruth.reasons.length > 0 
        ? mockTruth.reasons[0] 
        : 'UNVERIFIED_PATTERN';
      if (mockTruth && mockTruth.sections) {
        const firstSec = mockTruth.sections[0] || null;
        const negVal = Boolean(mockTruth.isNegativeMarking)
          ? (mockTruth.negativeMarkingValue !== undefined ? mockTruth.negativeMarkingValue : (firstSec ? (firstSec.marksWrong || firstSec.negativeValue || 0.25) : 0.25))
          : 0.0;
        blueprintSummary = {
          blueprintId: mockTruth.blueprintId,
          blueprintName: mockTruth.blueprintName,
          totalQuestions: mockTruth.totalQuestions || 0,
          totalMarks: mockTruth.totalMarks || 0,
          durationMinutes: mockTruth.durationMinutes || 0,
          isNegativeMarking: Boolean(mockTruth.isNegativeMarking),
          negativeValue: negVal,
          verificationStatus: 'VERIFIED',
          sections: mockTruth.sections
        };
      }
    }

    return {
      success: true,
      examId,
      examName: exam.name || examId,
      versionId: resolvedVersionId,
      modes: [
        {
          mode: 'LEARNING_MOCK',
          label: 'Learning & Revision Mock',
          description: 'Test recall of trusted questions recently studied in PDF guides and Revision sets with strong overlap.',
          isFlexibleCount: true,
          supportedCounts: [10, 20, 30, 50],
          isAvailable: totalExamBankQuestions > 0,
          subjects: availableSubjects
        },
        {
          mode: 'PRACTICE_MOCK',
          label: 'Practice Mock',
          description: 'Balanced practice mixing familiar studied questions with a broader pool of verified syllabus questions.',
          isFlexibleCount: true,
          supportedCounts: [15, 25, 50, 75, 100],
          isAvailable: totalExamBankQuestions > 0,
          subjects: availableSubjects
        },
        {
          mode: 'SUBJECT_PRACTICE',
          label: 'Subject-wise Practice',
          description: 'Practice one subject at your own pace with a flexible question count.',
          isFlexibleCount: true,
          supportedCounts: [10, 20, 30, 50, 75, 100],
          isAvailable: availableSubjects.some(s => s.availableQuestions > 0),
          subjects: availableSubjects
        },
        {
          mode: 'ALL_SUBJECTS_PRACTICE',
          label: 'All Subjects Practice',
          description: 'Mixed speed drill across all syllabus subjects with a flexible question count.',
          isFlexibleCount: true,
          supportedCounts: [25, 50, 100, 150, 200],
          isAvailable: totalExamBankQuestions > 0,
          totalBankQuestions: totalExamBankQuestions,
          subjectsCount: availableSubjects.length
        },
        {
          mode: 'FULL_EXAM_PATTERN',
          label: 'Full Exam — Official Pattern',
          description: 'Blueprint-driven official simulation with exact question count, sections, time limit, and negative marking.',
          isFlexibleCount: false,
          isAvailable: modeCAvailable,
          status: modeCStatus,
          blueprintSummary,
          shortageDetails
        }
      ]
    };
  }

  /**
   * Resumes and restores an in-progress Mock Test Session
   * Preserves exam, version, component, sections, user answers, review flags, elapsed time.
   */
  restoreSession(sessionId) {
    if (!sessionId) {
      return { success: false, reason: 'SESSION_ID_REQUIRED', message: 'Session ID is required.' };
    }

    const session = mockSessionRepository.getSessionById(sessionId);
    if (!session) {
      return { success: false, reason: 'SESSION_NOT_FOUND', message: `Mock session '${sessionId}' not found.` };
    }

    if (session.status !== 'IN_PROGRESS') {
      return {
        success: false,
        reason: 'SESSION_ALREADY_COMPLETED',
        status: session.status,
        message: 'This mock test session has already been completed or expired.',
        scorecard: session.score_details || null
      };
    }

    // Verify blueprint integrity
    const blueprint = blueprintRepository.getBlueprintById(session.blueprint_id);
    if (!blueprint) {
      return {
        success: false,
        reason: 'BLUEPRINT_NOT_FOUND',
        message: 'Session blueprint could not be verified.'
      };
    }

    // Fetch session questions without exposing correct answer key
    const questionRows = questionRepository.getQuestionsByIds(session.question_ids_json || []);
    const questionsMap = new Map();
    questionRows.forEach(q => questionsMap.set(q.question_id, q));

    const restoredQuestions = [];
    for (const qId of session.question_ids_json || []) {
      const qRow = questionsMap.get(qId);
      if (qRow) {
        restoredQuestions.push(this._formatQuestionForClient(qRow, null, session.language_config));
      }
    }

    const timeSpentSeconds = session.time_spent_seconds || 0;
    const durationMinutes = session.duration_minutes || 60;
    const totalDurationSeconds = durationMinutes * 60;
    const timeRemainingSeconds = Math.max(0, totalDurationSeconds - timeSpentSeconds);

    return {
      success: true,
      sessionId: session.session_id,
      examId: session.exam_id,
      examVersionId: session.exam_version_id,
      blueprintId: session.blueprint_id,
      testMode: session.test_mode,
      status: session.status,
      durationMinutes,
      totalQuestions: session.total_questions,
      questionsToAttempt: session.questions_to_attempt,
      timeSpentSeconds,
      timeRemainingSeconds,
      sections: session.sections_json || [],
      questions: restoredQuestions,
      userAnswers: session.user_answers_json || {},
      reviewFlags: session.review_flags_json || [],
      languageConfig: session.language_config || { primary: 'hi', secondary: 'en' },
      timerConfig: {
        mode: 'COUNTDOWN',
        durationMinutes,
        totalSeconds: totalDurationSeconds,
        remainingSeconds: timeRemainingSeconds,
        autoSubmitOnExpiry: true
      },
      startedAt: session.started_at
    };
  }
}

module.exports = new MockService();
