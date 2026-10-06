// backend/utils/option-shuffler.js
// Universal Natural Exam Option Shuffler
// Generates realistic, authentic answer distributions across all 63 exams (31 boards + 32 competitive exams).
// Enforces:
// 1. Zero predictable cycling (no 1A, 2B, 3C, 4D, 5A, 6B...)
// 2. Realistic balanced quota: A, B, C, D each get ~22% - 28% of the paper
// 3. Natural clumps allowed (e.g. two B's or two C's consecutively, just like real government papers)
// 4. Hard safety limit: never more than 3 consecutive identical options (e.g. max 2-3 in a row)

const LETTERS = ['A', 'B', 'C', 'D'];

/**
 * Generates an array of target slot indices (0=A, 1=B, 2=C, 3=D) for N questions.
 * @param {number} count - Total number of questions
 * @param {number|string} [seed] - Optional seed for reproducibility if needed
 * @returns {number[]} Array of slot indices of length `count`
 */
function generateNaturalOptionSequence(count, seed = null) {
  if (!count || count <= 0) return [];
  if (count === 1) return [Math.floor(Math.random() * 4)];

  // 1. Calculate base quota for each slot (A, B, C, D)
  const baseCount = Math.floor(count / 4);
  let remainder = count % 4;

  const quota = [baseCount, baseCount, baseCount, baseCount];
  // Distribute remainder randomly
  const remSlots = [0, 1, 2, 3].sort(() => Math.random() - 0.5);
  for (let r = 0; r < remainder; r++) {
    quota[remSlots[r]]++;
  }

  // 2. Build the multiset pool
  const pool = [];
  for (let slot = 0; slot < 4; slot++) {
    for (let c = 0; c < quota[slot]; c++) {
      pool.push(slot);
    }
  }

  // 3. Shuffle with Fisher-Yates
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = pool[i];
    pool[i] = pool[j];
    pool[j] = temp;
  }

  // 4. Smoothing pass: Ensure no slot appears > 3 times in a row
  for (let i = 2; i < pool.length; i++) {
    if (pool[i] === pool[i - 1] && pool[i] === pool[i - 2]) {
      // Find another element ahead that differs and swap
      let swapped = false;
      for (let j = i + 1; j < pool.length; j++) {
        if (pool[j] !== pool[i]) {
          const tmp = pool[i];
          pool[i] = pool[j];
          pool[j] = tmp;
          swapped = true;
          break;
        }
      }
      // If none ahead, find one behind that doesn't violate
      if (!swapped) {
        for (let j = 0; j < i - 2; j++) {
          if (pool[j] !== pool[i]) {
            const tmp = pool[i];
            pool[i] = pool[j];
            pool[j] = tmp;
            break;
          }
        }
      }
    }
  }

  return pool;
}

/**
 * Re-indexes a single question's options and correct answer to match `targetSlot`.
 * @param {object} langObj - Object containing options array, ans string, exp string
 * @param {number} targetSlot - Desired correct index (0=A, 1=B, 2=C, 3=D)
 * @param {number} [currentIdx=0] - Current correct index
 */
function rotateLanguageOptions(langObj, targetSlot, currentIdx = 0) {
  if (!langObj || !Array.isArray(langObj.options) || langObj.options.length < 4) return;
  if (targetSlot < 0 || targetSlot > 3) return;

  const cleanOpts = langObj.options.map(o => String(o).replace(/^[A-D]\)\s*/i, '').trim());

  if (currentIdx !== targetSlot) {
    const temp = cleanOpts[currentIdx];
    cleanOpts[currentIdx] = cleanOpts[targetSlot];
    cleanOpts[targetSlot] = temp;
  }

  langObj.options = cleanOpts.map((o, idx) => `${LETTERS[idx]}) ${o}`);
  langObj.ans = langObj.options[targetSlot];

  if (langObj.exp) {
    langObj.exp = langObj.exp.replace(/(सही\s*उत्तर\s*[:\-]?\s*)[A-D]\)/gi, `$1${LETTERS[targetSlot]})`);
    langObj.exp = langObj.exp.replace(/(अचूक\s*उत्तर\s*[:\-]?\s*)[A-D]\)/gi, `$1${LETTERS[targetSlot]})`);
    langObj.exp = langObj.exp.replace(/(সঠিক\s*उत्तर\s*[:\-]?\s*)[A-D]\)/gi, `$1${LETTERS[targetSlot]})`);
    langObj.exp = langObj.exp.replace(/(Correct\s*Option\s*[:\-]?\s*\[?)[A-D](\]?)/gi, `$1${LETTERS[targetSlot]}$2`);
    langObj.exp = langObj.exp.replace(/(Correct\s*Answer\s*[:\-]?\s*)[A-D]\)/gi, `$1${LETTERS[targetSlot]})`);
  }
}

/**
 * Transforms an array of question objects to follow a natural exam option distribution.
 * Preserves correct answer semantics while pseudo-randomizing option slots.
 * @param {Array<object>} questions - Array of questions with .options, .correct, .ans, .explanation
 * @returns {Array<object>} Transformed questions
 */
function applyNaturalOptionDistribution(questions) {
  if (!Array.isArray(questions) || questions.length === 0) return questions;
  const sequence = generateNaturalOptionSequence(questions.length);

  return questions.map((q, idx) => {
    if (!Array.isArray(q.options) || q.options.length < 4) return q;

    const targetSlot = sequence[idx];
    const currentIdx = (typeof q.correct === 'number' && q.correct >= 0 && q.correct <= 3) ? q.correct : 0;

    const cleanOpts = q.options.map(o => String(o).replace(/^[A-D]\)\s*/i, '').trim());

    if (currentIdx !== targetSlot) {
      const temp = cleanOpts[currentIdx];
      cleanOpts[currentIdx] = cleanOpts[targetSlot];
      cleanOpts[targetSlot] = temp;
    }

    const rotatedOpts = cleanOpts.map((o, i) => `${LETTERS[i]}) ${o}`);
    const finalAns = rotatedOpts[targetSlot];

    let expText = q.explanation || q.exp || '';
    if (expText) {
      expText = expText.replace(/(सही\s*उत्तर\s*[:\-]?\s*)[A-D]\)/gi, `$1${LETTERS[targetSlot]})`);
      expText = expText.replace(/(अचूक\s*उत्तर\s*[:\-]?\s*)[A-D]\)/gi, `$1${LETTERS[targetSlot]})`);
      expText = expText.replace(/(সঠিক\s*उत्तर\s*[:\-]?\s*)[A-D]\)/gi, `$1${LETTERS[targetSlot]})`);
      expText = expText.replace(/(Correct\s*Option\s*[:\-]?\s*\[?)[A-D](\]?)/gi, `$1${LETTERS[targetSlot]}$2`);
      expText = expText.replace(/(Correct\s*Answer\s*[:\-]?\s*)[A-D]\)/gi, `$1${LETTERS[targetSlot]})`);
    }

    return {
      ...q,
      options: rotatedOpts,
      correct: targetSlot,
      ans: finalAns,
      explanation: expText,
      exp: expText
    };
  });
}

module.exports = {
  LETTERS,
  generateNaturalOptionSequence,
  rotateLanguageOptions,
  applyNaturalOptionDistribution
};
