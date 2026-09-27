// backend/db/repositories/syllabus-repository.js
// Syllabus, Chapter, and Academic Priority Repository

const { getDb } = require('../database');

class SyllabusRepository {
  /**
   * Retrieves syllabus hierarchy for an exam or subject.
   */
  getSyllabus(examId, db = getDb()) {
    if (!db) return null;

    // Fetch syllabi rows matching exam versions or direct subject links
    const syllabi = db.prepare(`
      SELECT s.*, subj.name as subject_name
      FROM syllabi s
      JOIN subjects subj ON s.subject_id = subj.subject_id
      ORDER BY s.title ASC
    `).all();

    return syllabi.map(s => {
      const chapters = db.prepare(`
        SELECT c.*
        FROM syllabus_chapters c
        WHERE c.syllabus_id = ?
        ORDER BY c.order_index ASC
      `).all(s.syllabus_id);

      const hydratedChapters = chapters.map(c => {
        const topics = db.prepare(`
          SELECT t.*
          FROM syllabus_topics t
          WHERE t.chapter_id = ?
          ORDER BY t.order_index ASC
        `).all(c.chapter_id);
        return { ...c, topics };
      });

      return { ...s, chapters: hydratedChapters };
    });
  }

  /**
   * Seeds authentic syllabus chapters and topics into the relational database.
   */
  seedSyllabusHierarchy(syllabusData, db = getDb()) {
    if (!db) return;

    const versionMap = {
      'ssc-gd': 'ver-ssc-gd-2026',
      'up-police': 'ver-up-police-constable-2026',
      'rrb-alp': 'ver-rrb-alp-2026',
      'bseb-matric': 'ver-bseb-bihar-2026',
      'cbse-class10': 'ver-cbse-board-2026'
    };

    for (const [examKey, examInfo] of Object.entries(syllabusData)) {
      const examVersionId = versionMap[examKey] || 'ver-cbse-board-2026';
      for (const subj of examInfo.subjects) {
        let subjectId = 'subj-gk';
        if (subj.code.includes('math') || subj.code.includes('num')) subjectId = 'subj-math';
        else if (subj.code.includes('reason') || subj.code.includes('reas')) subjectId = 'subj-reasoning';
        else if (subj.code.includes('gk')) subjectId = 'subj-gk';
        else if (subj.code.includes('lang') || subj.code.includes('hi')) subjectId = 'subj-hindi';
        else if (subj.code.includes('science')) subjectId = 'subj-science';

        const syllabusId = `syl-${examKey}-${subj.code}`;
        db.prepare(`
          INSERT INTO syllabi (syllabus_id, exam_version_id, subject_id, title, verification_status)
          VALUES (?, ?, ?, ?, 'VERIFIED')
          ON CONFLICT(syllabus_id) DO UPDATE SET title = excluded.title
        `).run(
          syllabusId,
          examVersionId,
          subjectId,
          `${examInfo.examName} — ${subj.name}`
        );

        if (Array.isArray(subj.chapters)) {
          subj.chapters.forEach((ch, idx) => {
            const chapterId = `ch-${ch.id || `${examKey}-${idx}`}`;
            const weightMatch = (ch.weightage || '').match(/(\d+(?:\.\d+)?)\s*%/);
            const weightPercent = weightMatch ? parseFloat(weightMatch[1]) : (ch.priority === 'vhigh' ? 10.0 : ch.priority === 'high' ? 6.0 : 3.0);

            db.prepare(`
              INSERT INTO syllabus_chapters (chapter_id, syllabus_id, name, order_index, weightage_percent, description)
              VALUES (?, ?, ?, ?, ?, ?)
              ON CONFLICT(chapter_id) DO UPDATE SET
                name = excluded.name,
                weightage_percent = excluded.weightage_percent
            `).run(
              chapterId,
              syllabusId,
              ch.title,
              idx + 1,
              weightPercent,
              `PYQ Count: ${ch.pyqCount || 0} | Weightage: ${ch.weightage || ''} | Priority: ${ch.priority || 'medium'}`
            );

            // Add standard topic
            const topicId = `top-${chapterId}-core`;
            db.prepare(`
              INSERT INTO syllabus_topics (topic_id, chapter_id, name, order_index, importance_tier)
              VALUES (?, ?, ?, 1, ?)
              ON CONFLICT(topic_id) DO UPDATE SET importance_tier = excluded.importance_tier
            `).run(
              topicId,
              chapterId,
              `Core Concepts & Problem Solving: ${ch.title}`,
              ch.priority === 'vhigh' || ch.priority === 'high' ? 'HIGH' : 'MEDIUM'
            );
          });
        }
      }
    }
  }
}

module.exports = new SyllabusRepository();
