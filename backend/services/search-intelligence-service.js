// backend/services/search-intelligence-service.js
// Phase 13 Universal Search & Discovery Engine
// Supports: Exams, Boards, States, Chapters, Topics, Syllabi, Questions, PYQs, Calendar Events, Corrigenda.
// Strict Trust/Provenance Ranking: Official verified content is ranked top.

const { getDb } = require('../db/database');
const globalSearchService = require('./global-search-service');

class SearchIntelligenceService {
  /**
   * Universal search across all entities with provenance-weighted trust ranking
   */
  search(query, options = {}, db = getDb()) {
    const startTime = Date.now();

    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      return {
        query: '',
        totalResults: 0,
        results: {
          exams: [],
          boards: [],
          states: [],
          chapters: [],
          topics: [],
          syllabi: [],
          calendarEvents: [],
          corrigenda: [],
          questions: []
        }
      };
    }

    const cleanQuery = query.trim().toLowerCase();
    const likeTerm = `%${cleanQuery}%`;

    // 1. Base search (exams, boards, states) from GlobalSearchService
    const baseResults = globalSearchService.search(cleanQuery, options, db);

    // 2. Search Syllabus Chapters
    const chapters = db.prepare(`
      SELECT sc.chapter_id, sc.syllabus_id, sc.name as chapter_name, sc.description, sc.weightage_percent,
             s.subject_id, s.title as syllabus_title
      FROM syllabus_chapters sc
      LEFT JOIN syllabi s ON sc.syllabus_id = s.syllabus_id
      WHERE LOWER(sc.name) LIKE ? OR LOWER(sc.description) LIKE ?
      LIMIT 10
    `).all(likeTerm, likeTerm).map(ch => ({
      ...ch,
      trustTier: 'Official Syllabus'
    }));

    // 3. Search Syllabus Topics
    const topics = db.prepare(`
      SELECT st.topic_id, st.chapter_id, st.name as topic_name, st.importance_tier,
             sc.name as chapter_name
      FROM syllabus_topics st
      LEFT JOIN syllabus_chapters sc ON st.chapter_id = sc.chapter_id
      WHERE LOWER(st.name) LIKE ?
      LIMIT 10
    `).all(likeTerm).map(tp => ({
      ...tp,
      trustTier: 'Official Syllabus Topic'
    }));

    // 4. Search Syllabi
    const syllabi = db.prepare(`
      SELECT syllabus_id, exam_version_id, subject_id, title, verification_status, effective_year
      FROM syllabi
      WHERE LOWER(title) LIKE ? OR LOWER(subject_id) LIKE ? OR LOWER(exam_version_id) LIKE ?
      LIMIT 10
    `).all(likeTerm, likeTerm, likeTerm).map(sy => ({
      ...sy,
      trustTier: sy.verification_status === 'VERIFIED' ? 'Verified Syllabus' : 'Official Curriculum'
    }));

    // 5. Search Calendar Events
    const calendarEvents = db.prepare(`
      SELECT event_id, exam_id, event_type, event_title, event_date, event_status, notification_ref
      FROM exam_calendar_events
      WHERE is_active = 1
        AND (LOWER(event_title) LIKE ? OR LOWER(event_type) LIKE ? OR LOWER(exam_id) LIKE ?)
      ORDER BY event_date ASC LIMIT 10
    `).all(likeTerm, likeTerm, likeTerm).map(e => ({
      ...e,
      trustTier: e.event_status === 'OFFICIAL' ? 'Official' : (e.event_status === 'PROVISIONAL' ? 'Estimated' : 'Historical')
    }));

    // 6. Search Corrigenda
    const corrigenda = db.prepare(`
      SELECT corrigendum_id, exam_id, corrigendum_number, title, affected_field, publication_date
      FROM corrigenda
      WHERE LOWER(title) LIKE ? OR LOWER(corrigendum_number) LIKE ? OR LOWER(affected_field) LIKE ?
      ORDER BY publication_date DESC LIMIT 5
    `).all(likeTerm, likeTerm, likeTerm).map(c => ({
      ...c,
      trustTier: 'Official Corrigendum'
    }));

    // 7. Search Questions with Trust Tiers & Provenance-Ranked Ordering
    // Ranking Order: OFFICIAL_PYQ (rank 1) -> OFFICIAL_SAMPLE (rank 2) -> HUMAN_CURATED (rank 3) -> AI_PRACTICE (rank 4)
    const questions = db.prepare(`
      SELECT q.question_id, q.paper_id, q.subject_id, q.chapter_id, q.topic_id,
             q.provenance, q.question_tier, q.is_verified, q.full_exam_eligible,
             q.historical_year, q.difficulty,
             qv.language_content
      FROM questions q
      LEFT JOIN question_versions qv ON q.question_id = qv.question_id AND qv.version_number = q.current_version
      WHERE LOWER(qv.language_content) LIKE ? OR LOWER(q.subject_id) LIKE ? OR LOWER(q.topic_id) LIKE ?
      ORDER BY
        CASE q.provenance
          WHEN 'OFFICIAL_PYQ' THEN 1
          WHEN 'OFFICIAL_SAMPLE' THEN 2
          WHEN 'HUMAN_CURATED' THEN 3
          ELSE 4
        END ASC,
        q.is_verified DESC,
        q.full_exam_eligible DESC
      LIMIT 15
    `).all(likeTerm, likeTerm, likeTerm).map(q => {
      let trustTier = 'Practice';
      if (q.provenance === 'OFFICIAL_PYQ') trustTier = 'Verified PYQ';
      else if (q.provenance === 'OFFICIAL_SAMPLE') trustTier = 'Official Sample';
      else if (q.provenance === 'AI_PRACTICE') trustTier = 'AI Practice';
      else if (q.is_verified === 0) trustTier = 'Historical';

      let textSnippet = q.question_id;
      try {
        const parsed = JSON.parse(q.language_content || '{}');
        const langObj = parsed.en || parsed.hi || Object.values(parsed)[0];
        if (langObj && (langObj.q || langObj.question_text)) {
          textSnippet = langObj.q || langObj.question_text;
        }
      } catch (e) {}

      return {
        questionId: q.question_id,
        paperId: q.paper_id,
        subjectId: q.subject_id,
        chapterId: q.chapter_id,
        topicId: q.topic_id,
        difficulty: q.difficulty || 'MEDIUM',
        snippet: textSnippet.length > 130 ? textSnippet.substring(0, 130) + '...' : textSnippet,
        provenance: q.provenance,
        historicalYear: q.historical_year,
        fullExamEligible: q.full_exam_eligible === 1,
        questionTier: q.question_tier,
        trustTier
      };
    });

    // Classify base exams with trust tier
    const exams = (baseResults.results.exams || []).map(ex => ({
      ...ex,
      trustTier: ex.fullExamStatus === 'FULL_EXAM_READY' ? 'Verified Official' : 'Monitoring'
    }));

    const totalResults = exams.length +
      (baseResults.results.boards || []).length +
      (baseResults.results.states || []).length +
      chapters.length +
      topics.length +
      syllabi.length +
      calendarEvents.length +
      corrigenda.length +
      questions.length;

    const latencyMs = Math.round((Date.now() - startTime) * 100) / 100;

    // Telemetry log in search_performance_logs
    try {
      const logId = `slog-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
      db.prepare(`
        INSERT INTO search_performance_logs (
          log_id, query_text, query_category, result_count, latency_ms, recorded_at
        ) VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      `).run(logId, cleanQuery.substring(0, 50), 'UNIVERSAL_SEARCH', totalResults, latencyMs);
    } catch (e) {}

    return {
      query,
      language: options.language || 'en',
      latencyMs,
      totalResults,
      results: {
        exams,
        boards: baseResults.results.boards || [],
        states: baseResults.results.states || [],
        chapters,
        topics,
        syllabi,
        calendarEvents,
        corrigenda,
        questions
      }
    };
  }
}

module.exports = new SearchIntelligenceService();
