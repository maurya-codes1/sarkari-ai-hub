// backend/services/canonical-question-selection-service.js
// Phase 16 Canonical Single-Selector Question Engine for Mock, PDF & Practice

const { getDb } = require('../db/database');
const examLanguageResolver = require('./exam-language-resolver');

class CanonicalQuestionSelectionService {
  /**
   * Universal Question Selection Engine adhering to strict blueprint and provenance rules
   */
  selectQuestions(params = {}, db = getDb()) {
    const {
      componentId,
      examId,
      mode = 'PATTERN_PRACTICE', // FULL_EXAM | PATTERN_PRACTICE | SUBJECT_COMPLETE | ALL_SUBJECT_COMPREHENSIVE | PYQ | SAMPLE | REVISION
      requestedCount = 30,
      subjectId,
      sectionId,
      requestedLanguage = 'en',
      difficulty,
      provenanceFilter
    } = params;

    // 1. Resolve authoritative language
    const langResolution = examLanguageResolver.resolveExamLanguage({
      examId,
      componentId,
      subjectId,
      requestedLanguage
    }, db);

    // 2. Fetch candidate questions
    let sql = `
      SELECT q.*, v.version_status, v.exam_id as ver_exam_id
      FROM questions q
      LEFT JOIN exam_versions v ON q.exam_version_id = v.version_id
      WHERE 1=1
    `;
    const queryParams = [];

    if (examId) {
      if (mode === 'FULL_EXAM' || mode === 'PYQ' || mode === 'SAMPLE') {
        sql += ' AND (v.exam_id = ? OR q.exam_version_id LIKE ?)';
        queryParams.push(examId, `%${examId}%`);
      } else {
        // In practice mode, allow exam-specific questions or subject-matched questions
        sql += ' AND (v.exam_id = ? OR q.exam_version_id LIKE ? OR q.exam_version_id IS NULL)';
        queryParams.push(examId, `%${examId}%`);
      }
    }

    if (subjectId) {
      sql += ' AND q.subject_id = ?';
      queryParams.push(subjectId);
    }

    if (difficulty) {
      sql += ' AND q.difficulty = ?';
      queryParams.push(difficulty);
    }

    // Filter by mode requirements
    if (mode === 'FULL_EXAM') {
      // STRICT OFFICIAL ONLY: No AI Practice, must be full_exam_eligible
      sql += " AND q.full_exam_eligible = 1 AND q.provenance IN ('OFFICIAL_PYQ', 'OFFICIAL_SAMPLE', 'HUMAN_CURATED')";
    } else if (mode === 'PYQ') {
      sql += " AND q.provenance = 'OFFICIAL_PYQ'";
    } else if (mode === 'SAMPLE') {
      sql += " AND q.provenance = 'OFFICIAL_SAMPLE'";
    } else if (mode === 'AI_PRACTICE_ONLY') {
      sql += " AND q.provenance = 'AI_PRACTICE'";
    }

    if (provenanceFilter && Array.isArray(provenanceFilter) && provenanceFilter.length > 0) {
      const placeholders = provenanceFilter.map(() => '?').join(',');
      sql += ` AND q.provenance IN (${placeholders})`;
      queryParams.push(...provenanceFilter);
    }

    sql += ' ORDER BY q.question_id ASC';
    const allEligible = db.prepare(sql).all(...queryParams);

    // 3. Handle FULL_EXAM mode gating
    if (mode === 'FULL_EXAM') {
      const requiredBlueprintCount = this.getRequiredBlueprintQuestionCount(componentId || examId, db);
      const isPoolSufficient = allEligible.length >= requiredBlueprintCount;

      if (!isPoolSufficient) {
        return {
          success: false,
          allowed: false,
          mode: 'FULL_EXAM',
          gateStatus: 'BLOCKED',
          error: 'FULL_EXAM_GATED_INSUFFICIENT_OFFICIAL_POOL',
          message: `Official Full Exam requires ${requiredBlueprintCount} verified questions, but only ${allEligible.length} authentic questions are available.`,
          requiredCount: requiredBlueprintCount,
          availableCount: allEligible.length,
          questions: [],
          language: langResolution
        };
      }

      // If pool is sufficient, select exact required blueprint count
      const selected = allEligible.slice(0, requiredBlueprintCount);
      return {
        success: true,
        allowed: true,
        mode: 'FULL_EXAM',
        gateStatus: 'READY',
        totalQuestions: selected.length,
        requiredCount: requiredBlueprintCount,
        questions: selected,
        language: langResolution,
        isOfficialFullExam: true
      };
    }

    // 4. Handle SUBJECT_COMPLETE mode
    if (mode === 'SUBJECT_COMPLETE') {
      return {
        success: true,
        allowed: true,
        mode: 'SUBJECT_COMPLETE',
        totalQuestions: allEligible.length,
        availableCount: allEligible.length,
        questions: allEligible,
        language: langResolution
      };
    }

    // 5. Handle PATTERN_PRACTICE / ALL_SUBJECT_COMPREHENSIVE / PYQ / SAMPLE
    const targetCount = Math.min(requestedCount, allEligible.length);
    const selected = allEligible.slice(0, targetCount);

    return {
      success: true,
      allowed: true,
      mode,
      totalQuestions: selected.length,
      availableCount: allEligible.length,
      requestedCount,
      questions: selected,
      language: langResolution,
      isPracticeMock: mode === 'PATTERN_PRACTICE'
    };
  }

  /**
   * Determine exact required question count for official blueprint
   */
  getRequiredBlueprintQuestionCount(identifier, db = getDb()) {
    if (!identifier) return 100;
    const id = identifier.toLowerCase();

    if (id.includes('ssc-cgl') || id.includes('upsc-cse-prelims-gs1') || id.includes('tndge')) return 100;
    if (id.includes('ssc-gd') || id.includes('upsc-cse-prelims-csat')) return 80;
    if (id.includes('rrb-alp') || id.includes('jee-main')) return 75;
    if (id.includes('neet-ug')) return 200;
    if (id.includes('clat')) return 120;
    if (id.includes('ctet') || id.includes('up-police')) return 150;
    if (id.includes('cls10-science') || id.includes('class-10-science')) return 39;
    if (id.includes('cls10-math') || id.includes('class-10-math')) return 38;

    return 100;
  }
}

module.exports = new CanonicalQuestionSelectionService();
