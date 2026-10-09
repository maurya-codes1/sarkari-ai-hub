// services/content-allocation-policy.js
// Production Content Allocation & Reconciliation Policy for SarkariAI Hub Study Guides & Bundles
// Controls representative subset allocation for All-Subject study bundles vs Single-Subject preservation.
// Fully configurable per document type, exam tier, and subject inventory.

/**
 * Default Allocation Policy Tiers for All-Subject Bundles:
 * - Around 100 eligible questions: target approx 60-70 questions (~65%)
 * - Around 200 eligible questions: target approx 140-150 questions (~72%)
 * - Around 250 eligible questions: target approx 180-200 questions (~76%)
 * - 300+ eligible questions: target approx 70-80% (~75%)
 * - Small inventory (<= 40): retain 100% of available questions
 */
const DEFAULT_BUNDLE_ALLOCATION_TIERS = [
  { minCount: 0, maxCount: 40, ratio: 1.0, floor: 0, cap: 40 },
  { minCount: 41, maxCount: 120, ratio: 0.65, floor: 40, cap: 78 },
  { minCount: 121, maxCount: 220, ratio: 0.72, floor: 78, cap: 160 },
  { minCount: 221, maxCount: 280, ratio: 0.76, floor: 160, cap: 215 },
  { minCount: 281, maxCount: Infinity, ratio: 0.75, floor: 210, cap: 350 }
];

/**
 * Calculates the target number of questions to allocate for a subject in an All-Subject bundle.
 * 
 * @param {number} eligibleCount - Total distinct valid questions available for the subject
 * @param {object} [options] - Optional custom policy overrides
 * @returns {number} Allocated question count
 */
function computeBundleSubjectAllocation(eligibleCount, options = {}) {
  const n = parseInt(eligibleCount, 10);
  if (isNaN(n) || n <= 0) return 0;

  // Document-specific custom ratio override
  if (typeof options.customRatio === 'number' && options.customRatio > 0 && options.customRatio <= 1.0) {
    const raw = Math.round(n * options.customRatio);
    return Math.max(1, Math.min(raw, n));
  }

  // Document-specific explicit count override
  if (typeof options.explicitTargetCount === 'number' && options.explicitTargetCount > 0) {
    return Math.min(options.explicitTargetCount, n);
  }

  const tiers = options.customTiers || DEFAULT_BUNDLE_ALLOCATION_TIERS;
  for (const tier of tiers) {
    if (n >= tier.minCount && n <= tier.maxCount) {
      let allocated = Math.round(n * tier.ratio);
      if (typeof tier.floor === 'number') allocated = Math.max(allocated, tier.floor);
      if (typeof tier.cap === 'number') allocated = Math.min(allocated, tier.cap);
      return Math.max(1, Math.min(allocated, n));
    }
  }

  // Fallback: 75%
  return Math.max(1, Math.min(Math.round(n * 0.75), n));
}

/**
 * Selects a high-quality, syllabus-representative subset of questions from a subject bank.
 * Uses stratified sampling across topics where topic metadata is present, or evenly-spaced sampling.
 * 
 * @param {Array<object>} questions - Distinct candidate questions for the subject
 * @param {number} targetCount - Number of questions to select
 * @param {object} [options] - Options (e.g. prioritizePyq, preserveOrder)
 * @returns {Array<object>} Selected representative subset
 */
function selectRepresentativeSubset(questions = [], targetCount, options = {}) {
  if (!Array.isArray(questions) || questions.length === 0) return [];
  const target = Math.max(1, Math.min(parseInt(targetCount, 10) || questions.length, questions.length));
  if (questions.length <= target) {
    return questions.slice();
  }

  // Check if topic grouping is possible for stratified coverage
  const topicMap = new Map();
  questions.forEach(q => {
    const topic = (q.topic || 'General').trim();
    if (!topicMap.has(topic)) topicMap.set(topic, []);
    topicMap.get(topic).push(q);
  });

  const selected = [];
  const seenQ = new Set();

  function normStem(text = '') {
    const line1 = (text || '').split('\n')[0];
    return line1
      .toLowerCase()
      .replace(/^[0-9]+[\.\)]\s*/, '')
      .replace(/\[[^\]]*\]/g, '')
      .replace(/[^a-z0-9\u0900-\u0DFF]/gi, '')
      .trim();
  }

  function addQuestion(q) {
    if (!q || !q.q) return false;
    const key = normStem(q.q);
    if (!key || key.length < 5) return false;
    if (seenQ.has(key)) return false;
    seenQ.add(key);
    if (q.id) seenQ.add(q.id);
    selected.push(q);
    return true;
  }

  // If questions are stratified by topics (>= 2 topics)
  if (topicMap.size >= 2) {
    const topics = Array.from(topicMap.keys());
    // Proportional allocation per topic
    topics.forEach(top => {
      const topQs = topicMap.get(top);
      const topTarget = Math.max(1, Math.round((topQs.length / questions.length) * target));
      // Sample evenly within topic
      const step = topQs.length / topTarget;
      for (let i = 0; i < topTarget && selected.length < target; i++) {
        const idx = Math.min(Math.floor(i * step), topQs.length - 1);
        addQuestion(topQs[idx]);
      }
    });
  }

  // If still below target, fill with evenly-spaced questions from remainder
  if (selected.length < target) {
    const step = questions.length / target;
    for (let i = 0; i < questions.length && selected.length < target; i++) {
      const idx = Math.min(Math.floor(i * step), questions.length - 1);
      addQuestion(questions[idx]);
    }
  }

  // Final pass: add any remaining until target reached
  for (let i = 0; i < questions.length && selected.length < target; i++) {
    addQuestion(questions[i]);
  }

  return selected.slice(0, target);
}

/**
 * Reconciles an All-Subject / Mixed bundle across all subjects of an exam.
 * Ensures:
 * 1. Every subject is represented strongly using its representative subset
 * 2. No naive wholesale concatenation (e.g. 200+200+200=600 is avoided)
 * 3. No tiny 30-40 sample
 * 4. Zero duplicate questions
 * 5. Distinct section headers for each subject
 * 
 * @param {Array<{ subjectId: string, subjectName: string, questions: Array<object> }>} subjectSections
 * @param {object} [options]
 * @returns {{ bundledQuestions: Array<object>, summary: object }}
 */
function reconcileAllSubjectBundle(subjectSections = [], options = {}) {
  const bundledQuestions = [];
  const allocationReport = [];
  const globalSeenStems = new Set();
  let globalNum = 1;

  function normStem(text = '') {
    const line1 = (text || '').split('\n')[0];
    return line1
      .toLowerCase()
      .replace(/^[0-9]+[\.\)]\s*/, '')
      .replace(/\[[^\]]*\]/g, '')
      .replace(/[^a-z0-9\u0900-\u0DFF]/gi, '')
      .trim();
  }

  for (const sec of subjectSections) {
    const questions = Array.isArray(sec.questions) ? sec.questions : [];
    const eligibleCount = questions.length;
    const targetCount = computeBundleSubjectAllocation(eligibleCount, options);
    const selected = selectRepresentativeSubset(questions, targetCount, options);

    // Annotate questions with Section and clean numbering, discarding any duplicate stem
    for (const q of selected) {
      const stem = normStem(q.q);
      if (stem && stem.length >= 5) {
        if (globalSeenStems.has(stem)) continue;
        globalSeenStems.add(stem);
      }
      bundledQuestions.push({
        ...q,
        num: globalNum,
        sectionId: sec.subjectId,
        sectionName: sec.subjectName,
        subjectId: sec.subjectId
      });
      globalNum++;
    }

    allocationReport.push({
      subjectId: sec.subjectId,
      subjectName: sec.subjectName,
      eligibleCount,
      allocatedCount: selected.length,
      allocationRatio: eligibleCount > 0 ? parseFloat((selected.length / eligibleCount).toFixed(2)) : 0
    });
  }

  return {
    bundledQuestions,
    allocationReport,
    totalQuestions: bundledQuestions.length,
    subjectCount: subjectSections.length
  };
}

module.exports = {
  DEFAULT_BUNDLE_ALLOCATION_TIERS,
  computeBundleSubjectAllocation,
  selectRepresentativeSubset,
  reconcileAllSubjectBundle
};
