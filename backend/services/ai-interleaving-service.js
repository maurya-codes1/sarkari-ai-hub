// backend/services/ai-interleaving-service.js
// AI Question Interleaving & Controlled Distribution Engine
// Distributes AI practice questions naturally throughout the question pool,
// prevents contiguous AI blocks, preserves section boundaries, and protects question groupings.

class AiInterleavingService {
  /**
   * Interleaves AI practice questions into a verified/curated question pool.
   *
   * @param {Array<object>} verifiedPool - Array of verified or curated questions
   * @param {Array<object>} aiPool - Array of candidate AI practice questions
   * @param {object} options
   * @param {number} [options.aiProportion=0.0] - Target ratio of AI questions (0.0 to 1.0, e.g. 0.20 for 20%)
   * @param {number} [options.targetCount] - Total questions desired
   * @param {boolean} [options.isFullExam=false] - If true, enforces strict official rules (default AI = 0%)
   * @returns {Array<object>} interleaved array of questions
   */
  interleaveQuestions(verifiedPool = [], aiPool = [], options = {}) {
    const isFullExam = Boolean(options.isFullExam);
    // In Full Exam Mode, default AI proportion is strictly 0.0 unless explicitly augmented
    const targetRatio = isFullExam ? (options.allowAiAugmentation ? Math.min(options.aiProportion || 0.0, 0.3) : 0.0) : (options.aiProportion || 0.0);
    const targetTotal = options.targetCount || options.totalQuestionsNeeded || (verifiedPool.length + Math.round(verifiedPool.length * targetRatio));

    // If 0% AI requested or no AI pool available, return verified items up to target
    if (targetRatio <= 0.0 || !aiPool || aiPool.length === 0) {
      return verifiedPool.slice(0, targetTotal);
    }

    // Determine counts
    const aiTargetCount = Math.min(Math.round(targetTotal * targetRatio), aiPool.length);
    const verifiedTargetCount = Math.min(targetTotal - aiTargetCount, verifiedPool.length);

    const availableVerified = [...verifiedPool];
    const availableAi = [...aiPool];

    // Grouping Protection Map: Identify and group questions sharing the same passage_group_id
    const groupedVerified = this._clusterByGroup(availableVerified.slice(0, verifiedTargetCount));
    const selectedAi = availableAi.slice(0, aiTargetCount);

    if (selectedAi.length === 0) {
      return this._flattenClusters(groupedVerified);
    }

    // Calculate natural stride for interleaving
    // e.g. If 8 verified clusters and 2 AI questions, stride ~ 4
    const totalSlots = groupedVerified.length + selectedAi.length;
    const stride = Math.max(Math.floor(groupedVerified.length / (selectedAi.length + 1)), 1);

    const result = [];
    let aiIndex = 0;
    let verifiedClusterIndex = 0;

    while (verifiedClusterIndex < groupedVerified.length || aiIndex < selectedAi.length) {
      // Add 'stride' verified clusters
      for (let s = 0; s < stride && verifiedClusterIndex < groupedVerified.length; s++) {
        const cluster = groupedVerified[verifiedClusterIndex++];
        result.push(...cluster);
      }

      // Add 1 AI question if available, ensuring no consecutive AI questions
      if (aiIndex < selectedAi.length) {
        // Enforce internal provenance
        const aiQ = { ...selectedAi[aiIndex++] };
        aiQ.provenance = 'AI_PRACTICE';
        result.push(aiQ);
      }
    }

    return result.slice(0, targetTotal);
  }

  /**
   * Interleaves questions within section boundaries for multi-section exams.
   * Ensures AI questions never spill across sections.
   *
   * @param {Array<object>} sections - Array of { sectionId, verifiedQuestions, aiQuestions, questionCount }
   * @param {object} options - Interleaving options
   * @returns {Array<object>} updated sections with interleaved questions
   */
  interleaveSections(sections = [], options = {}) {
    return sections.map(sec => {
      const verified = sec.verifiedQuestions || sec.verifiedPool || sec.questions || [];
      const ai = sec.aiQuestions || sec.aiPool || [];
      const targetCount = sec.questionCount || sec.targetCount || (verified.length + ai.length);

      const interleaved = this.interleaveQuestions(verified, ai, {
        ...options,
        targetCount
      });

      return {
        ...sec,
        questions: interleaved,
        questionCount: interleaved.length
      };
    });
  }

  /**
   * Clusters questions by passage_group_id so grouped questions are never separated.
   * @private
   */
  _clusterByGroup(questions) {
    const clusters = [];
    const groupMap = new Map();

    for (const q of questions) {
      const groupId = q.passage_group_id || q.passageGroupId;
      if (groupId) {
        if (!groupMap.has(groupId)) {
          const cluster = [q];
          groupMap.set(groupId, cluster);
          clusters.push(cluster);
        } else {
          groupMap.get(groupId).push(q);
        }
      } else {
        // Standalone question is its own single-item cluster
        clusters.push([q]);
      }
    }

    return clusters;
  }

  /**
   * Flattens cluster array back to single list.
   * @private
   */
  _flattenClusters(clusters) {
    const flat = [];
    for (const c of clusters) {
      flat.push(...c);
    }
    return flat;
  }
}

module.exports = new AiInterleavingService();
