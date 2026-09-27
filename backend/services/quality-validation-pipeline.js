// backend/services/quality-validation-pipeline.js
// 10-Dimensional Question Quality Validation Pipeline
// Validates syllabus, blueprint, language, options, answers, ambiguity, formatting,
// exact duplicates, historical novelty, and difficulty tagging before publication.

const duplicateEngine = require('./duplicate-engine');
const historicalCorpusService = require('./historical-corpus-service');
const normalizationService = require('./normalization-service');
const { getDb } = require('../db/database');

class QualityValidationPipeline {
  /**
   * Run full 10-dimensional quality validation on candidate question.
   *
   * @param {object} question - candidate question object
   * @param {object} [options] - context { examId, blueprintId, sectionId, subjectId, chapterId, allowUnverifiedAnswer }
   * @param {object} [db]
   * @returns {object} { isValid: boolean, canPublish: boolean, status: string, checks: object, errors: Array<string> }
   */
  validate(question, context = {}, db = getDb()) {
    const errors = [];
    const checks = {};

    const {
      stem = '',
      options = [],
      correctAnswer = null,
      questionType = 'single_mcq',
      difficulty = 'MEDIUM',
      marks = 1.0,
      languageCode = 'hi',
      subjectId = context.subjectId || null,
      chapterId = context.chapterId || null,
      examId = context.examId || null,
      modelAnswer = null,
      markingGuidance = null
    } = question;

    // 1. Ambiguity & Stem Check
    const normStem = normalizationService.normalizeStem(stem);
    if (!normStem || normStem.length < 8) {
      errors.push('Stem is too short, blank, or ambiguous (< 8 characters).');
      checks.ambiguity = { passed: false, reason: 'Stem length below minimum threshold.' };
    } else if (/^(?:question|test|sample|dummy|asdf|xyz)\s*$/i.test(normStem)) {
      errors.push('Stem contains placeholder or dummy test text.');
      checks.ambiguity = { passed: false, reason: 'Dummy placeholder detected.' };
    } else {
      checks.ambiguity = { passed: true };
    }

    // 2. Formatting Check
    const openParens = (stem.match(/\(/g) || []).length;
    const closeParens = (stem.match(/\)/g) || []).length;
    const openBrackets = (stem.match(/\[/g) || []).length;
    const closeBrackets = (stem.match(/\]/g) || []).length;
    if (openParens !== closeParens || openBrackets !== closeBrackets) {
      errors.push('Unbalanced parentheses or brackets in question text.');
      checks.formatting = { passed: false, reason: 'Unbalanced delimiters.' };
    } else {
      checks.formatting = { passed: true };
    }

    // 3. Language Validation
    if (!['hi', 'en', 'hi-latn', 'ta', 'te', 'mr', 'bn', 'gu', 'kn', 'ml', 'pa', 'ur', 'or', 'sa'].includes(languageCode)) {
      errors.push(`Unsupported or unrecognized language code: '${languageCode}'.`);
      checks.language = { passed: false, reason: 'Unsupported language code.' };
    } else {
      checks.language = { passed: true, languageCode };
    }

    // 4. Syllabus Mapping Validation
    if (db && subjectId) {
      const subjectRow = db.prepare('SELECT subject_id, name FROM subjects WHERE subject_id = ?').get(subjectId);
      if (!subjectRow) {
        errors.push(`Invalid syllabus subject_id: '${subjectId}' does not exist.`);
        checks.syllabus = { passed: false, reason: 'Subject not found in database.' };
      } else {
        checks.syllabus = { passed: true, subjectName: subjectRow.name };
      }
    } else if (!subjectId) {
      errors.push('Missing subject_id mapping for question.');
      checks.syllabus = { passed: false, reason: 'No subject_id provided.' };
    } else {
      checks.syllabus = { passed: true, warning: 'Database offline; subject_id unverified.' };
    }

    // 5. Blueprint Compatibility Validation
    if (db && context.blueprintId) {
      const bp = db.prepare('SELECT blueprint_id, name, verification_status FROM exam_blueprints WHERE blueprint_id = ?').get(context.blueprintId);
      if (!bp) {
        errors.push(`Blueprint '${context.blueprintId}' does not exist.`);
        checks.blueprint = { passed: false, reason: 'Blueprint not found.' };
      } else {
        checks.blueprint = { passed: true, blueprintName: bp.name };
      }
    } else {
      checks.blueprint = { passed: true, status: 'SKIPPED_OR_PRACTICE' };
    }

    // 6. Option Validation (for MCQ types)
    if (questionType === 'single_mcq' || questionType === 'multiple_mcq') {
      if (!Array.isArray(options) || options.length < 2) {
        errors.push(`MCQ requires at least 2 options, found ${Array.isArray(options) ? options.length : 0}.`);
        checks.options = { passed: false, reason: 'Insufficient options.' };
      } else {
        // Check for duplicate options
        const normalizedOpts = normalizationService.normalizeOptions(options);
        const uniqueSet = new Set(normalizedOpts);
        if (uniqueSet.size !== options.length) {
          errors.push('Options contain duplicate choices.');
          checks.options = { passed: false, reason: 'Duplicate options detected.' };
        } else {
          // Check for empty/blank options
          const hasEmpty = normalizedOpts.some(o => o.length === 0);
          if (hasEmpty) {
            errors.push('Options contain empty or whitespace-only choices.');
            checks.options = { passed: false, reason: 'Empty option found.' };
          } else {
            checks.options = { passed: true, optionCount: options.length };
          }
        }
      }
    } else {
      checks.options = { passed: true, reason: 'Not an option-based question.' };
    }

    // 7. Answer Validation
    if (questionType === 'single_mcq') {
      let ansIndex = -1;
      if (typeof correctAnswer === 'number') {
        ansIndex = correctAnswer;
      } else if (correctAnswer && typeof correctAnswer === 'object' && typeof correctAnswer.index === 'number') {
        ansIndex = correctAnswer.index;
      }

      if (ansIndex < 0 || ansIndex >= options.length) {
        errors.push(`Invalid single_mcq correct answer index (${ansIndex}) for ${options.length} options.`);
        checks.answer = { passed: false, reason: 'Answer index out of bounds.' };
      } else {
        checks.answer = { passed: true, answerIndex: ansIndex };
      }
    } else if (questionType === 'numerical') {
      const numVal = typeof correctAnswer === 'object' ? correctAnswer.value : correctAnswer;
      if (numVal === null || numVal === undefined || isNaN(Number(numVal))) {
        errors.push('Numerical question requires a valid numeric answer.');
        checks.answer = { passed: false, reason: 'Invalid or missing numeric answer.' };
      } else {
        // Deterministic Arithmetic Validation if formula/math operation in stem
        const mathMatch = stem.match(/(\d+(?:\.\d+)?)\s*([\+\-\*\/])\s*(\d+(?:\.\d+)?)/);
        if (mathMatch) {
          const n1 = parseFloat(mathMatch[1]);
          const op = mathMatch[2];
          const n2 = parseFloat(mathMatch[3]);
          let expectedVal = 0;
          if (op === '+') expectedVal = n1 + n2;
          else if (op === '-') expectedVal = n1 - n2;
          else if (op === '*') expectedVal = n1 * n2;
          else if (op === '/') expectedVal = n2 !== 0 ? n1 / n2 : NaN;

          const providedNum = Number(numVal);
          if (Math.abs(expectedVal - providedNum) > 0.01) {
            errors.push(`Deterministic math validation failed: formula in stem calculates to ${expectedVal}, but answer provided is ${providedNum}.`);
            checks.answer = { passed: false, reason: 'Deterministic math mismatch.' };
          } else {
            checks.answer = { passed: true, verifiedDeterministically: true };
          }
        } else {
          checks.answer = { passed: true, numericValue: Number(numVal) };
        }
      }
    } else if (['short_answer', 'long_answer', 'very_short_answer', 'essay', 'descriptive'].includes(questionType)) {
      if (!modelAnswer && !question.a) {
        errors.push('Subjective question requires a detailed model answer / expected points.');
        checks.answer = { passed: false, reason: 'Missing model answer.' };
      } else {
        checks.answer = { passed: true, isSubjective: true };
      }
    } else {
      checks.answer = { passed: true };
    }

    // 8. Exact Duplicate Validation
    const exactCheck = duplicateEngine.checkExactDuplicate({
      stem,
      options,
      answer: correctAnswer ? JSON.stringify(correctAnswer) : '',
      questionType
    }, db);

    if (exactCheck.isExactDuplicate) {
      errors.push(`Exact duplicate detected! Matches existing record: ${exactCheck.duplicateOf} (${exactCheck.reason})`);
      checks.exactDuplicate = { passed: false, duplicateOf: exactCheck.duplicateOf, reason: exactCheck.reason };
    } else {
      checks.exactDuplicate = { passed: true, fingerprint: exactCheck.fingerprint };
    }

    // 9. Historical Novelty Validation
    if (examId) {
      const noveltyCheck = historicalCorpusService.checkNovelty({
        stem,
        options,
        examId,
        subjectId
      }, db);

      if (!noveltyCheck.passed) {
        errors.push(`Historical novelty check failed: ${noveltyCheck.reason}`);
        checks.historicalNovelty = { passed: false, status: noveltyCheck.status, matchedItem: noveltyCheck.matchedItem };
      } else {
        checks.historicalNovelty = { passed: true, status: noveltyCheck.status, claim: noveltyCheck.claim };
      }
    } else {
      checks.historicalNovelty = { passed: true, reason: 'No examId specified for historical novelty check.' };
    }

    // 10. Difficulty Validation
    const validDifficulties = ['EASY', 'MEDIUM', 'HARD', 'VERY_EASY', 'VERY_HARD'];
    if (!validDifficulties.includes(difficulty.toUpperCase())) {
      errors.push(`Invalid difficulty '${difficulty}'. Must be one of: ${validDifficulties.join(', ')}.`);
      checks.difficulty = { passed: false, reason: 'Invalid difficulty classification.' };
    } else {
      checks.difficulty = {
        passed: true,
        difficulty: difficulty.toUpperCase(),
        difficultyType: 'AI_ESTIMATED_DIFFICULTY'
      };
    }

    const isValid = errors.length === 0;
    const canPublish = isValid && (checks.answer && checks.answer.passed);

    return {
      isValid,
      canPublish,
      status: isValid ? 'APPROVED' : (checks.answer && !checks.answer.passed ? 'NEEDS_REVIEW' : 'REJECTED'),
      errors,
      checks
    };
  }
}

module.exports = new QualityValidationPipeline();
