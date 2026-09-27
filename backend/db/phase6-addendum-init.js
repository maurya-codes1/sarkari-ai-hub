// backend/db/phase6-addendum-init.js
// Phase 6 Addendum: Unified Exam Truth Seed Data
// Seeds verified regional language configs (Tamil, Telugu+English) and multi-version fixtures.

const { getDb } = require('./database');

function initPhase6Addendum(db = getDb()) {
  console.log('--- Initializing Phase 6 Addendum Seed Data ---');

  // 1. Regional Subjects (Tamil & Telugu)
  db.prepare(`
    INSERT INTO subjects (subject_id, name, short_name, subject_type, is_language_subject, is_medium_dependent, active)
    VALUES 
      ('subj-tamil', 'பொதுத் தமிழ் (General Tamil)', 'Tamil', 'LANGUAGE', 1, 1, 1),
      ('subj-telugu', 'సాధారణ తెలుగు (General Telugu)', 'Telugu', 'LANGUAGE', 1, 1, 1)
    ON CONFLICT(subject_id) DO NOTHING
  `).run();

  // 2. Historical Version for SSC CGL
  db.prepare(`
    INSERT INTO exam_versions (version_id, exam_id, academic_year, version_status, version_notes)
    VALUES ('ver-ssc-cgl-2025', 'ssc-cgl', '2024-2025', 'HISTORICAL_SUPERSEDED', 'Historical 2024-2025 Tier-1 pattern')
    ON CONFLICT(version_id) DO NOTHING
  `).run();

  // 3. Language Configurations for Regional & Historical Versions
  db.prepare(`
    INSERT INTO exam_language_configurations (
      config_id, exam_version_id, paper_medium, question_languages,
      option_languages, instruction_languages, is_bilingual, is_multilingual, language_specific_rules
    ) VALUES 
      (
        'lang-cfg-tndge-tamilnadu',
        'ver-tndge-tamilnadu-2026',
        'ta',
        '["ta"]',
        '["ta"]',
        '["ta"]',
        0,
        0,
        'Verified Tamil-only official medium examination'
      ),
      (
        'lang-cfg-tsbie-bieap',
        'ver-tsbie-bieap-2026',
        'te,en',
        '["te","en"]',
        '["te","en"]',
        '["te","en"]',
        1,
        0,
        'Verified bilingual examination in Telugu and English'
      ),
      (
        'lang-cfg-ssc-cgl-2025',
        'ver-ssc-cgl-2025',
        'hi,en',
        '["hi","en"]',
        '["hi","en"]',
        '["hi","en"]',
        1,
        0,
        'Historical bilingual examination in Hindi and English'
      )
    ON CONFLICT(config_id) DO UPDATE SET
      paper_medium = excluded.paper_medium,
      question_languages = excluded.question_languages,
      option_languages = excluded.option_languages,
      instruction_languages = excluded.instruction_languages,
      is_bilingual = excluded.is_bilingual,
      language_specific_rules = excluded.language_specific_rules
  `).run();

  // 4. Source Documents
  db.prepare(`
    INSERT INTO source_documents (
      document_id, source_id, file_title, document_type, source_url,
      document_hash, parsed_content_hash, parsed_text_sample, extraction_status
    ) VALUES 
      (
        'doc-tndge-2026-scheme',
        'src-tndge-tamilnadu-portal',
        'TNDGE SSLC Examination Scheme & Guidelines 2025-26',
        'OFFICIAL_NOTICE',
        'https://dge.tn.gov.in/rules/sslc-2026.pdf',
        'hash-tndge-2026-doc',
        'hash-tndge-2026-parsed',
        'TNDGE SSLC examination pattern: Total 100 questions, 150 minutes duration, maximum 100 marks, medium: Tamil.',
        'COMPLETED'
      ),
      (
        'doc-tsbie-2026-scheme',
        'src-tsbie-bieap-portal',
        'TSBIE / BIEAP Intermediate Board Scheme 2025-26',
        'OFFICIAL_NOTICE',
        'https://bse.telangana.gov.in/rules/inter-2026.pdf',
        'hash-tsbie-2026-doc',
        'hash-tsbie-2026-parsed',
        'TSBIE examination pattern: Total 100 questions, 180 minutes duration, maximum 100 marks, medium: Telugu and English.',
        'COMPLETED'
      ),
      (
        'doc-ssc-cgl-2025-notice',
        'src-ssc-cgl-portal',
        'Staff Selection Commission CGL 2024-25 Archival Notice',
        'OFFICIAL_NOTICE',
        'https://ssc.gov.in/archival/cgl2024.pdf',
        'hash-cgl-2025-doc',
        'hash-cgl-2025-parsed',
        'SSC CGL 2024 Tier 1: 100 questions, 60 minutes duration, 200 marks, 0.50 negative marking, bilingual.',
        'COMPLETED'
      )
    ON CONFLICT(document_id) DO NOTHING
  `).run();

  // 5. Verified Blueprints
  db.prepare(`
    INSERT INTO exam_blueprints (
      blueprint_id, exam_version_id, name, verification_status,
      duration_minutes, total_questions, total_marks, is_negative_marking,
      questions_to_attempt, full_exam_eligible, readiness_status
    ) VALUES 
      (
        'bp-verified-tndge-tamilnadu',
        'ver-tndge-tamilnadu-2026',
        'TNDGE SSLC Tamil Nadu Verified Pattern',
        'VERIFIED',
        150, 100, 100.0, 0, 100, 0, 'FULL_EXAM_UNAVAILABLE_NO_TRUSTED_QUESTIONS'
      ),
      (
        'bp-verified-tsbie-bieap',
        'ver-tsbie-bieap-2026',
        'TSBIE / BIEAP Intermediate Board Verified Pattern',
        'VERIFIED',
        180, 100, 100.0, 0, 100, 0, 'FULL_EXAM_UNAVAILABLE_NO_TRUSTED_QUESTIONS'
      ),
      (
        'bp-verified-ssc-cgl-2025',
        'ver-ssc-cgl-2025',
        'SSC CGL 2024-2025 Tier-1 Historical Pattern',
        'VERIFIED',
        60, 100, 200.0, 1, 100, 0, 'FULL_EXAM_UNAVAILABLE_NO_TRUSTED_QUESTIONS'
      )
    ON CONFLICT(blueprint_id) DO UPDATE SET
      verification_status = excluded.verification_status,
      duration_minutes = excluded.duration_minutes,
      total_questions = excluded.total_questions,
      total_marks = excluded.total_marks,
      is_negative_marking = excluded.is_negative_marking
  `).run();

  // 6. Blueprint Sections
  db.prepare(`
    INSERT INTO blueprint_sections (
      section_id, blueprint_id, name, section_order, subject_id,
      question_count, questions_to_attempt, total_marks, marks_per_question, allowed_question_types, instructions
    ) VALUES 
      ('sec-tndge-ta-1', 'bp-verified-tndge-tamilnadu', 'General Tamil (பொதுத் தமிழ்)', 1, 'subj-tamil', 50, 50, 50.0, 1.0, '["single_mcq"]', 'Attempt all 50 questions in Tamil.'),
      ('sec-tndge-sci-2', 'bp-verified-tndge-tamilnadu', 'General Science (பொது அறிவியல்)', 2, 'subj-science', 50, 50, 50.0, 1.0, '["single_mcq"]', 'Attempt all 50 questions in Tamil.'),
      ('sec-tsbie-te-1', 'bp-verified-tsbie-bieap', 'General Telugu (సాధారణ తెలుగు)', 1, 'subj-telugu', 50, 50, 50.0, 1.0, '["single_mcq"]', 'Attempt all 50 questions in Telugu/English.'),
      ('sec-tsbie-gk-2', 'bp-verified-tsbie-bieap', 'General Studies (సాధారణ అధ్యయనాలు)', 2, 'subj-gk', 50, 50, 50.0, 1.0, '["single_mcq"]', 'Attempt all 50 questions in Telugu/English.'),
      ('sec-cgl25-gi-1', 'bp-verified-ssc-cgl-2025', 'General Intelligence & Reasoning', 1, 'subj-reasoning', 25, 25, 50.0, 2.0, '["single_mcq"]', '25 questions, 2 marks each, 0.5 negative.'),
      ('sec-cgl25-ga-2', 'bp-verified-ssc-cgl-2025', 'General Awareness', 2, 'subj-gk', 25, 25, 50.0, 2.0, '["single_mcq"]', '25 questions, 2 marks each, 0.5 negative.'),
      ('sec-cgl25-qa-3', 'bp-verified-ssc-cgl-2025', 'Quantitative Aptitude', 3, 'subj-math', 25, 25, 50.0, 2.0, '["single_mcq"]', '25 questions, 2 marks each, 0.5 negative.'),
      ('sec-cgl25-en-4', 'bp-verified-ssc-cgl-2025', 'English Comprehension', 4, 'subj-english', 25, 25, 50.0, 2.0, '["single_mcq"]', '25 questions, 2 marks each, 0.5 negative.')
    ON CONFLICT(section_id) DO NOTHING
  `).run();

  // 7. Field Verification Records for TNDGE, TSBIE, and SSC CGL 2025
  const fieldRecords = [
    // TNDGE Tamil Nadu
    { id: 'vr-tndge-dur', src: 'src-tndge-tamilnadu-portal', doc: 'doc-tndge-2026-scheme', bp: 'bp-verified-tndge-tamilnadu', field: 'duration_minutes', val: '150', text: 'Duration: 150 minutes (2.5 hours)', p: 'Sec 2.1' },
    { id: 'vr-tndge-tq', src: 'src-tndge-tamilnadu-portal', doc: 'doc-tndge-2026-scheme', bp: 'bp-verified-tndge-tamilnadu', field: 'total_questions', val: '100', text: 'Total Questions: 100 questions', p: 'Sec 2.2' },
    { id: 'vr-tndge-tm', src: 'src-tndge-tamilnadu-portal', doc: 'doc-tndge-2026-scheme', bp: 'bp-verified-tndge-tamilnadu', field: 'total_marks', val: '100.0', text: 'Total Marks: 100.0', p: 'Sec 2.3' },
    { id: 'vr-tndge-neg', src: 'src-tndge-tamilnadu-portal', doc: 'doc-tndge-2026-scheme', bp: 'bp-verified-tndge-tamilnadu', field: 'is_negative_marking', val: 'false', text: 'No negative marking for board examination', p: 'Sec 2.4' },
    { id: 'vr-tndge-sec', src: 'src-tndge-tamilnadu-portal', doc: 'doc-tndge-2026-scheme', bp: 'bp-verified-tndge-tamilnadu', field: 'section_count', val: '2', text: 'Section I: Tamil, Section II: Science', p: 'Sec 3.1' },
    { id: 'vr-tndge-lang', src: 'src-tndge-tamilnadu-portal', doc: 'doc-tndge-2026-scheme', bp: 'bp-verified-tndge-tamilnadu', field: 'paper_languages', val: 'ta', text: 'Paper Medium and questions strictly in Tamil (ta)', p: 'Sec 1.4' },

    // TSBIE / BIEAP
    { id: 'vr-tsbie-dur', src: 'src-tsbie-bieap-portal', doc: 'doc-tsbie-2026-scheme', bp: 'bp-verified-tsbie-bieap', field: 'duration_minutes', val: '180', text: 'Duration: 180 minutes (3 hours)', p: 'Sec 1.1' },
    { id: 'vr-tsbie-tq', src: 'src-tsbie-bieap-portal', doc: 'doc-tsbie-2026-scheme', bp: 'bp-verified-tsbie-bieap', field: 'total_questions', val: '100', text: 'Total Questions: 100 questions', p: 'Sec 1.2' },
    { id: 'vr-tsbie-tm', src: 'src-tsbie-bieap-portal', doc: 'doc-tsbie-2026-scheme', bp: 'bp-verified-tsbie-bieap', field: 'total_marks', val: '100.0', text: 'Total Marks: 100.0', p: 'Sec 1.3' },
    { id: 'vr-tsbie-neg', src: 'src-tsbie-bieap-portal', doc: 'doc-tsbie-2026-scheme', bp: 'bp-verified-tsbie-bieap', field: 'is_negative_marking', val: 'false', text: 'No negative marking for board examination', p: 'Sec 1.5' },
    { id: 'vr-tsbie-sec', src: 'src-tsbie-bieap-portal', doc: 'doc-tsbie-2026-scheme', bp: 'bp-verified-tsbie-bieap', field: 'section_count', val: '2', text: 'Section I: Telugu, Section II: General Studies', p: 'Sec 2.1' },
    { id: 'vr-tsbie-lang', src: 'src-tsbie-bieap-portal', doc: 'doc-tsbie-2026-scheme', bp: 'bp-verified-tsbie-bieap', field: 'paper_languages', val: 'te,en', text: 'Bilingual in Telugu (te) and English (en)', p: 'Sec 1.4' },

    // SSC CGL 2025 Historical
    { id: 'vr-cgl25-dur', src: 'src-ssc-cgl-portal', doc: 'doc-ssc-cgl-2025-notice', bp: 'bp-verified-ssc-cgl-2025', field: 'duration_minutes', val: '60', text: 'Duration: 60 minutes', p: 'Sec 12.1' },
    { id: 'vr-cgl25-tq', src: 'src-ssc-cgl-portal', doc: 'doc-ssc-cgl-2025-notice', bp: 'bp-verified-ssc-cgl-2025', field: 'total_questions', val: '100', text: 'Total Questions: 100', p: 'Sec 12.2' },
    { id: 'vr-cgl25-tm', src: 'src-ssc-cgl-portal', doc: 'doc-ssc-cgl-2025-notice', bp: 'bp-verified-ssc-cgl-2025', field: 'total_marks', val: '200.0', text: 'Total Marks: 200.0', p: 'Sec 12.3' },
    { id: 'vr-cgl25-neg', src: 'src-ssc-cgl-portal', doc: 'doc-ssc-cgl-2025-notice', bp: 'bp-verified-ssc-cgl-2025', field: 'is_negative_marking', val: 'true', text: 'Negative marking: 0.50 marks per incorrect response', p: 'Sec 12.4' },
    { id: 'vr-cgl25-sec', src: 'src-ssc-cgl-portal', doc: 'doc-ssc-cgl-2025-notice', bp: 'bp-verified-ssc-cgl-2025', field: 'section_count', val: '4', text: '4 sections of 25 questions each', p: 'Sec 12.5' },
    { id: 'vr-cgl25-lang', src: 'src-ssc-cgl-portal', doc: 'doc-ssc-cgl-2025-notice', bp: 'bp-verified-ssc-cgl-2025', field: 'paper_languages', val: 'hi,en', text: 'Bilingual in Hindi (hi) and English (en)', p: 'Sec 12.6' }
  ];

  for (const r of fieldRecords) {
    db.prepare(`
      INSERT INTO source_verification_records (
        verification_id, source_id, target_entity_type, target_entity_id,
        target_field, source_document_id, evidence_text, page_or_section,
        extracted_value, confidence_score, verification_status, verified_by, audit_notes
      ) VALUES (?, ?, 'EXAM_BLUEPRINT', ?, ?, ?, ?, ?, ?, 1.0, 'VERIFIED', 'OFFICIAL_SOURCE_VALIDATOR', 'Phase 6 verified citation')
      ON CONFLICT(verification_id) DO NOTHING
    `).run(r.id, r.src, r.bp, r.field, r.doc, r.text, r.p, r.val);
  }

  // 8. Verified Syllabi
  // TNDGE Tamil Syllabus
  db.prepare(`
    INSERT INTO syllabi (syllabus_id, exam_version_id, subject_id, title, verification_status)
    VALUES ('syl-tndge-tamil', 'ver-tndge-tamilnadu-2026', 'subj-tamil', 'TNDGE Tamil Curriculum', 'VERIFIED')
    ON CONFLICT(syllabus_id) DO NOTHING
  `).run();

  db.prepare(`
    INSERT INTO syllabus_chapters (chapter_id, syllabus_id, name, order_index)
    VALUES ('ch-tndge-1', 'syl-tndge-tamil', 'தமிழ் இலக்கணம் மற்றும் செய்யுள் (Tamil Grammar & Literature)', 1)
    ON CONFLICT(chapter_id) DO NOTHING
  `).run();

  db.prepare(`
    INSERT INTO syllabus_topics (topic_id, chapter_id, name, order_index, importance_tier)
    VALUES 
      ('top-tndge-1', 'ch-tndge-1', 'எழுத்திலக்கணம் மற்றும் சொல்லிலக்கணம் (Orthography & Morphology)', 1, 'HIGH'),
      ('top-tndge-2', 'ch-tndge-1', 'திருக்குறள் மற்றும் நீதிநூல்கள் (Thirukkural & Ethics)', 2, 'HIGH')
    ON CONFLICT(topic_id) DO NOTHING
  `).run();

  // TSBIE Telugu Syllabus
  db.prepare(`
    INSERT INTO syllabi (syllabus_id, exam_version_id, subject_id, title, verification_status)
    VALUES ('syl-tsbie-telugu', 'ver-tsbie-bieap-2026', 'subj-telugu', 'TSBIE Telugu Curriculum', 'VERIFIED')
    ON CONFLICT(syllabus_id) DO NOTHING
  `).run();

  db.prepare(`
    INSERT INTO syllabus_chapters (chapter_id, syllabus_id, name, order_index)
    VALUES ('ch-tsbie-1', 'syl-tsbie-telugu', 'తెలుగు వ్యాకరణం మరియు సాహిత్యం (Telugu Grammar & Literature)', 1)
    ON CONFLICT(chapter_id) DO NOTHING
  `).run();

  db.prepare(`
    INSERT INTO syllabus_topics (topic_id, chapter_id, name, order_index, importance_tier)
    VALUES 
      ('top-tsbie-1', 'ch-tsbie-1', 'సంధులు మరియు సమాసాలు (Sandhi & Samasam)', 1, 'HIGH'),
      ('top-tsbie-2', 'ch-tsbie-1', 'ప్రాచీన కావ్యాలు (Ancient Poetry)', 2, 'HIGH')
    ON CONFLICT(topic_id) DO NOTHING
  `).run();

  // SSC CGL 2025 Historical Syllabus
  db.prepare(`
    INSERT INTO syllabi (syllabus_id, exam_version_id, subject_id, title, verification_status)
    VALUES ('syl-ssc-cgl-2025-gk', 'ver-ssc-cgl-2025', 'subj-gk', 'SSC CGL 2025 GK Curriculum', 'VERIFIED')
    ON CONFLICT(syllabus_id) DO NOTHING
  `).run();

  db.prepare(`
    INSERT INTO syllabus_chapters (chapter_id, syllabus_id, name, order_index)
    VALUES ('ch-cgl-2025-1', 'syl-ssc-cgl-2025-gk', 'Historical Indian History 2024-25', 1)
    ON CONFLICT(chapter_id) DO NOTHING
  `).run();

  db.prepare(`
    INSERT INTO syllabus_topics (topic_id, chapter_id, name, order_index, importance_tier)
    VALUES ('top-cgl-2025-1', 'ch-cgl-2025-1', 'Ancient Indian Civilizations', 1, 'HIGH')
    ON CONFLICT(topic_id) DO NOTHING
  `).run();

  console.log('--- Phase 6 Addendum Seed Data Initialized Successfully ---');
}

if (require.main === module) {
  initPhase6Addendum();
}

module.exports = { initPhase6Addendum };
