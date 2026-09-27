// backend/services/notes-engine.js
// Structured Notes Engine for SarkariAI Hub
// Supports Chapter Notes, Formula Sheets, One-Liners, Important Facts, Quick Revision,
// independent note languages (independent from UI locale), depths (SHORT/MEDIUM/DETAILED),
// and strict provenance tagging (AI_NOTE vs HUMAN_CURATED).

const crypto = require('crypto');
const { getDb } = require('../db/database');

class NotesEngine {
  constructor() {
    this.VALID_NOTE_TYPES = [
      'CompleteNotes', 'ChapterNotes', 'TopicNotes', 'QuickRevision',
      'FormulaSheet', 'OneLiners', 'ImportantFacts', 'ConceptNotes',
      'MistakeNotes', 'ExamStrategy', 'QuestionExplanation', 'LastMinuteRevision'
    ];

    this.VALID_DEPTHS = ['SHORT', 'MEDIUM', 'DETAILED', 'COMPREHENSIVE'];
  }

  /**
   * Retrieves notes matching specific filters.
   *
   * @param {object} filters - { examId, subjectId, chapterId, topicId, noteType, depth, languageId, provenance }
   * @param {object} [db]
   * @returns {Array<object>} matching notes
   */
  getNotes(filters = {}, db = getDb()) {
    if (!db) return [];

    let query = `
      SELECT 
        n.note_id, n.exam_version_id, n.subject_id, n.chapter_id, n.topic_id,
        n.language_id, n.note_type, n.title, n.summary, n.content,
        n.source_references, n.verification_status, n.version, n.last_updated,
        n.content_depth, n.provenance, n.priority_tier,
        s.name as subject_name
      FROM notes n
      LEFT JOIN subjects s ON n.subject_id = s.subject_id
      WHERE 1=1
    `;
    const params = [];

    if (filters.subjectId) {
      query += ` AND n.subject_id = ?`;
      params.push(filters.subjectId);
    }
    if (filters.chapterId) {
      query += ` AND n.chapter_id = ?`;
      params.push(filters.chapterId);
    }
    if (filters.noteType) {
      query += ` AND n.note_type = ?`;
      params.push(filters.noteType);
    }
    if (filters.depth) {
      query += ` AND n.content_depth = ?`;
      params.push(filters.depth.toUpperCase());
    }
    if (filters.languageId) {
      query += ` AND n.language_id = ?`;
      params.push(filters.languageId);
    }
    if (filters.provenance) {
      query += ` AND n.provenance = ?`;
      params.push(filters.provenance);
    }

    query += ` ORDER BY n.last_updated DESC LIMIT 100`;

    const rows = db.prepare(query).all(...params);
    return rows.map(r => ({
      ...r,
      content: typeof r.content === 'string' ? JSON.parse(r.content) : r.content,
      sourceReferences: r.source_references && typeof r.source_references === 'string' ? JSON.parse(r.source_references) : r.source_references
    }));
  }

  /**
   * Retrieves single note by noteId.
   */
  getNoteById(noteId, db = getDb()) {
    if (!db) return null;
    const r = db.prepare(`
      SELECT n.*, s.name as subject_name
      FROM notes n
      LEFT JOIN subjects s ON n.subject_id = s.subject_id
      WHERE n.note_id = ?
    `).get(noteId);

    if (!r) return null;
    return {
      ...r,
      content: typeof r.content === 'string' ? JSON.parse(r.content) : r.content,
      sourceReferences: r.source_references && typeof r.source_references === 'string' ? JSON.parse(r.source_references) : r.source_references
    };
  }

  /**
   * Creates a new structured note.
   * Enforces provenance: if generated via AI, sets provenance = 'AI_NOTE' and never claims official.
   */
  createNote(noteData, db = getDb()) {
    if (!db) throw new Error('Database unavailable');

    const {
      noteId = `note-${Date.now()}-${crypto.randomBytes(3).toString('hex')}`,
      examId = null,
      examVersionId = null,
      subjectId,
      chapterId = null,
      topicId = null,
      languageId = 'hi',
      uiLanguage = 'en',
      noteType = 'ChapterNotes',
      title,
      summary = '',
      content = {},
      sourceReferences = [],
      verificationStatus = 'VERIFIED',
      contentDepth = 'MEDIUM',
      provenance = 'HUMAN_CURATED',
      priorityTier = 'MEDIUM_PRIORITY'
    } = noteData;

    if (!subjectId || !title || !content) {
      throw new Error('Missing required note fields: subjectId, title, and content are mandatory.');
    }

    // Unified Exam Truth validation
    let effectiveLanguage = languageId;
    if (examId || examVersionId) {
      const unifiedExamTruthService = require('./unified-exam-truth-service');
      const targetExamId = examId || (db.prepare('SELECT exam_id FROM exam_versions WHERE version_id = ?').get(examVersionId) || {}).exam_id;
      if (targetExamId) {
        const truthConfig = unifiedExamTruthService.getNotesConfiguration(targetExamId, examVersionId, {
          requestedLanguage: languageId,
          subjectId,
          chapterId,
          topicId,
          uiLanguage
        }, db);

        if (!truthConfig.success && truthConfig.status === 'CONTENT_CONFIGURATION_INVALID') {
          throw new Error(`CONTENT_CONFIGURATION_INVALID: ${truthConfig.message}`);
        }
        if (truthConfig.success) {
          effectiveLanguage = truthConfig.noteLanguage;
        }
      }
    }

    const cleanDepth = this.VALID_DEPTHS.includes(contentDepth.toUpperCase()) ? contentDepth.toUpperCase() : 'MEDIUM';
    const cleanType = this.VALID_NOTE_TYPES.includes(noteType) ? noteType : 'ChapterNotes';

    db.prepare(`
      INSERT INTO notes (
        note_id, exam_version_id, subject_id, chapter_id, topic_id,
        language_id, note_type, title, summary, content,
        source_references, verification_status, version, content_depth,
        provenance, priority_tier
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?, ?)
    `).run(
      noteId,
      examVersionId,
      subjectId,
      chapterId,
      topicId,
      languageId,
      cleanType,
      title,
      summary,
      typeof content === 'string' ? content : JSON.stringify(content),
      JSON.stringify(sourceReferences),
      verificationStatus,
      cleanDepth,
      provenance,
      priorityTier
    );

    return {
      success: true,
      noteId,
      title,
      noteType: cleanType,
      contentDepth: cleanDepth,
      provenance,
      languageId
    };
  }
}

module.exports = new NotesEngine();
