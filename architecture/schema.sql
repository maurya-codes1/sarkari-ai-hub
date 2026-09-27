-- ============================================================================
-- SARKARIAI HUB — UNIVERSAL EXAM BLUEPRINT & DATA ARCHITECTURE (PHASE 2)
-- Relational DDL Specification for PostgreSQL / SQLite (ANSI Standard Compatible)
-- Version: 2.0.0-PROTOTYPE | Status: ARCHITECTURAL DESIGN (Non-Destructive)
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. ORGANIZATIONS & BOARDS
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS organizations (
    organization_id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    short_name VARCHAR(64) NOT NULL,
    type VARCHAR(64) NOT NULL, -- 'Board', 'RecruitmentCommission', 'University', 'RailwayBoard', 'BankingBody', 'DefenceBody', 'Other'
    central_or_state VARCHAR(16) NOT NULL, -- 'Central', 'State', 'UnionTerritory', 'Autonomous'
    state_or_ut VARCHAR(64), -- e.g., 'Bihar', 'Uttar Pradesh', 'All-India'
    official_website VARCHAR(512) NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    verification_status VARCHAR(32) DEFAULT 'VERIFIED', -- 'VERIFIED', 'NEEDS_REVIEW', 'CONFLICT', 'OUTDATED', 'UNAVAILABLE'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS boards (
    board_id VARCHAR(64) PRIMARY KEY,
    organization_id VARCHAR(64) NOT NULL REFERENCES organizations(organization_id),
    name VARCHAR(255) NOT NULL,
    short_name VARCHAR(64) NOT NULL,
    jurisdiction VARCHAR(64) NOT NULL, -- e.g., 'National', 'State', 'Regional'
    board_type VARCHAR(64) NOT NULL, -- 'National', 'State', 'OpenSchool', 'Sanskrit', 'Madrasa', 'Vocational', 'Alternative', 'Other'
    official_website VARCHAR(512) NOT NULL,
    official_result_url VARCHAR(512),
    active BOOLEAN DEFAULT TRUE,
    verification_status VARCHAR(32) DEFAULT 'VERIFIED',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ----------------------------------------------------------------------------
-- 2. ACADEMIC STRUCTURE: CLASS, STREAM, STAGE, PAPER
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS classes (
    class_id VARCHAR(32) PRIMARY KEY, -- 'class-10', 'class-12', 'undergraduate', 'postgraduate', 'diploma', 'other'
    display_name VARCHAR(64) NOT NULL,
    numeric_level INTEGER, -- 10, 12, etc. (NULL for UG/PG)
    description TEXT
);

CREATE TABLE IF NOT EXISTS streams (
    stream_id VARCHAR(32) PRIMARY KEY, -- 'science', 'commerce', 'arts-humanities', 'vocational', 'general'
    display_name VARCHAR(64) NOT NULL,
    description TEXT
);

CREATE TABLE IF NOT EXISTS stages (
    stage_id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(128) NOT NULL, -- 'Prelims', 'Mains', 'Tier-1', 'Tier-2', 'CBT-1', 'CBT-2', 'Interview', 'PhysicalTest', 'AnnualBoardExam'
    short_code VARCHAR(32),
    stage_order INTEGER DEFAULT 1,
    description TEXT
);

CREATE TABLE IF NOT EXISTS papers (
    paper_id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(128) NOT NULL, -- 'Paper-1', 'Paper-2', 'GeneralStudies', 'OptionalPaper', 'TheoryPaper', 'PracticalPaper'
    paper_code VARCHAR(32),
    description TEXT
);

-- ----------------------------------------------------------------------------
-- 3. EXAMS & VERSIONING
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS exams (
    exam_id VARCHAR(64) PRIMARY KEY,
    organization_id VARCHAR(64) NOT NULL REFERENCES organizations(organization_id),
    board_id VARCHAR(64) REFERENCES boards(board_id),
    name VARCHAR(255) NOT NULL,
    short_name VARCHAR(64) NOT NULL,
    category VARCHAR(64) NOT NULL, -- 'SchoolBoard', 'Entrance', 'GovernmentRecruitment', 'Competitive', 'UniversityEntrance', 'Defence', 'Banking', 'Railway', 'Teaching', 'Police', 'StatePSC', 'Other'
    level VARCHAR(64) NOT NULL, -- 'National', 'State', 'District'
    class_id VARCHAR(32) REFERENCES classes(class_id),
    stream_id VARCHAR(32) REFERENCES streams(stream_id),
    official_website VARCHAR(512) NOT NULL,
    result_url VARCHAR(512),
    admit_card_url VARCHAR(512),
    syllabus_url VARCHAR(512),
    notification_url VARCHAR(512),
    active BOOLEAN DEFAULT TRUE,
    status VARCHAR(64) DEFAULT 'Active',
    current_version_id VARCHAR(64),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS exam_versions (
    version_id VARCHAR(64) PRIMARY KEY,
    exam_id VARCHAR(64) NOT NULL REFERENCES exams(exam_id),
    academic_year VARCHAR(32), -- e.g., '2025-2026'
    recruitment_year VARCHAR(32), -- e.g., '2026'
    effective_from DATE,
    effective_to DATE,
    version_status VARCHAR(32) DEFAULT 'CURRENT', -- 'DRAFT', 'CURRENT', 'SUPERSEDED', 'ARCHIVED'
    source_verified BOOLEAN DEFAULT FALSE,
    last_verified_at TIMESTAMP,
    version_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ----------------------------------------------------------------------------
-- 4. LANGUAGE REGISTRY & EXAM LANGUAGE CONFIGURATION
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS languages (
    language_id VARCHAR(32) PRIMARY KEY, -- 'en', 'hi', 'hi-latn', 'ta', 'te', 'mr', 'bn', 'gu', 'kn', 'ml', 'pa', 'ur', 'or', 'sa', 'as', 'mai', 'bho', etc.
    code VARCHAR(16) NOT NULL UNIQUE,
    locale VARCHAR(32) NOT NULL,
    native_name VARCHAR(64) NOT NULL,
    english_name VARCHAR(64) NOT NULL,
    script VARCHAR(64) NOT NULL, -- 'Devanagari', 'Latin', 'Tamil', 'Telugu', 'Bengali', 'Perso-Arabic', etc.
    direction VARCHAR(8) DEFAULT 'ltr', -- 'ltr', 'rtl'
    is_scheduled_language BOOLEAN DEFAULT TRUE, -- Indian Constitution 8th Schedule
    is_ui_language BOOLEAN DEFAULT FALSE, -- Supported in UI
    is_exam_language BOOLEAN DEFAULT TRUE, -- Can be an exam/paper language
    is_language_subject BOOLEAN DEFAULT TRUE, -- Can be a subject (e.g., Sanskrit, Urdu)
    font_family VARCHAR(128) DEFAULT 'sans-serif',
    active BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS exam_language_configurations (
    config_id VARCHAR(64) PRIMARY KEY,
    exam_version_id VARCHAR(64) NOT NULL REFERENCES exam_versions(version_id),
    paper_id VARCHAR(64) REFERENCES papers(paper_id),
    paper_medium VARCHAR(64) NOT NULL, -- 'Bilingual', 'Monolingual', 'MultilingualChoice'
    question_languages JSON NOT NULL, -- Array of language_id codes, e.g., ["hi", "en"]
    option_languages JSON NOT NULL, -- Array of language_id codes, e.g., ["hi", "en"]
    instruction_languages JSON NOT NULL, -- Array of language_id codes, e.g., ["hi", "en"]
    is_bilingual BOOLEAN DEFAULT FALSE,
    is_multilingual BOOLEAN DEFAULT FALSE,
    translation_pairs JSON, -- e.g., [{"primary": "hi", "secondary": "en"}]
    language_selection_required BOOLEAN DEFAULT FALSE, -- Candidate picks paper language at CBT start
    language_selection_type VARCHAR(64), -- 'PerTest', 'PerQuestion', 'FixedBySubject'
    language_specific_rules TEXT
);

-- ----------------------------------------------------------------------------
-- 5. SUBJECTS & SYLLABUS HIERARCHY
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS subjects (
    subject_id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(128) NOT NULL,
    short_name VARCHAR(64) NOT NULL,
    subject_type VARCHAR(64) NOT NULL, -- 'Language', 'Mathematics', 'Science', 'SocialScience', 'Physics', 'Chemistry', 'Biology', 'Commerce', 'Reasoning', 'GeneralKnowledge', 'GeneralStudies', 'Aptitude', 'Technical', 'Literature', 'Essay', 'Other'
    parent_subject_id VARCHAR(64) REFERENCES subjects(subject_id),
    is_language_subject BOOLEAN DEFAULT FALSE,
    is_medium_dependent BOOLEAN DEFAULT TRUE, -- False for Math/Physics formulas, True for Language
    active BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS syllabi (
    syllabus_id VARCHAR(64) PRIMARY KEY,
    exam_version_id VARCHAR(64) NOT NULL REFERENCES exam_versions(version_id),
    subject_id VARCHAR(64) NOT NULL REFERENCES subjects(subject_id),
    title VARCHAR(255) NOT NULL,
    official_source_id VARCHAR(64),
    effective_year VARCHAR(32),
    verification_status VARCHAR(32) DEFAULT 'VERIFIED',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS syllabus_chapters (
    chapter_id VARCHAR(64) PRIMARY KEY,
    syllabus_id VARCHAR(64) NOT NULL REFERENCES syllabi(syllabus_id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    order_index INTEGER NOT NULL DEFAULT 1,
    weightage_percent NUMERIC(5,2),
    description TEXT
);

CREATE TABLE IF NOT EXISTS syllabus_topics (
    topic_id VARCHAR(64) PRIMARY KEY,
    chapter_id VARCHAR(64) NOT NULL REFERENCES syllabus_chapters(chapter_id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    order_index INTEGER NOT NULL DEFAULT 1,
    importance_tier VARCHAR(16) DEFAULT 'MEDIUM', -- 'HIGH', 'MEDIUM', 'LOW'
    source_reference VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ----------------------------------------------------------------------------
-- 6. QUESTION TYPES, MARKING RULES, ATTEMPT RULES
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS question_types (
    type_id VARCHAR(64) PRIMARY KEY, -- 'single_mcq', 'multiple_mcq', 'numerical', 'short_answer', 'very_short_answer', 'long_answer', 'essay', 'descriptive', 'assertion_reason', 'statement_based', 'match_following', 'true_false', 'fill_blank', 'case_study', 'passage_based', 'diagram_based', 'coding', 'translation', 'literature', 'other'
    name VARCHAR(128) NOT NULL,
    category VARCHAR(32) NOT NULL, -- 'Objective', 'Subjective', 'Numerical', 'Practical'
    allows_options BOOLEAN DEFAULT TRUE,
    requires_manual_evaluation BOOLEAN DEFAULT FALSE,
    description TEXT
);

CREATE TABLE IF NOT EXISTS marking_rules (
    rule_id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(128) NOT NULL,
    marks_correct NUMERIC(6,2) NOT NULL,
    marks_wrong NUMERIC(6,2) NOT NULL DEFAULT 0.00,
    marks_unattempted NUMERIC(6,2) NOT NULL DEFAULT 0.00,
    has_negative_marking BOOLEAN DEFAULT FALSE,
    negative_value NUMERIC(6,2) DEFAULT 0.00,
    allows_partial_marking BOOLEAN DEFAULT FALSE,
    is_integer_only BOOLEAN DEFAULT FALSE,
    is_decimal_allowed BOOLEAN DEFAULT TRUE,
    description TEXT
);

CREATE TABLE IF NOT EXISTS attempt_rules (
    attempt_rule_id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(128) NOT NULL,
    rule_type VARCHAR(64) NOT NULL, -- 'ATTEMPT_ALL', 'ATTEMPT_ANY_N', 'ATTEMPT_N_OF_M', 'SECTION_MANDATORY', 'OPTIONAL_CHOICE', 'CONDITIONAL'
    total_provided INTEGER NOT NULL,
    max_to_attempt INTEGER NOT NULL,
    min_to_attempt INTEGER DEFAULT 0,
    description TEXT
);

-- ----------------------------------------------------------------------------
-- 7. EXAM BLUEPRINTS & SECTIONS
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS exam_blueprints (
    blueprint_id VARCHAR(64) PRIMARY KEY,
    exam_version_id VARCHAR(64) NOT NULL REFERENCES exam_versions(version_id),
    stage_id VARCHAR(64) REFERENCES stages(stage_id),
    paper_id VARCHAR(64) REFERENCES papers(paper_id),
    name VARCHAR(255) NOT NULL,
    total_marks NUMERIC(8,2) NOT NULL,
    duration_minutes INTEGER NOT NULL,
    total_questions INTEGER NOT NULL,
    questions_to_attempt INTEGER NOT NULL,
    is_negative_marking BOOLEAN DEFAULT FALSE,
    answer_format VARCHAR(64) DEFAULT 'OMR_OR_CBT', -- 'CBT_ONLY', 'OMR_ONLY', 'PEN_PAPER_DESCRIPTIVE', 'HYBRID'
    supports_numerical_input BOOLEAN DEFAULT FALSE,
    supports_subjective_answer BOOLEAN DEFAULT FALSE,
    supports_essay BOOLEAN DEFAULT FALSE,
    supports_case_study BOOLEAN DEFAULT FALSE,
    supports_passage_based BOOLEAN DEFAULT FALSE,
    supports_assertion_reason BOOLEAN DEFAULT FALSE,
    supports_matching BOOLEAN DEFAULT FALSE,
    official_source_id VARCHAR(64),
    verification_status VARCHAR(32) DEFAULT 'VERIFIED',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS blueprint_sections (
    section_id VARCHAR(64) PRIMARY KEY,
    blueprint_id VARCHAR(64) NOT NULL REFERENCES exam_blueprints(blueprint_id) ON DELETE CASCADE,
    subject_id VARCHAR(64) REFERENCES subjects(subject_id),
    name VARCHAR(128) NOT NULL,
    section_order INTEGER NOT NULL DEFAULT 1,
    question_count INTEGER NOT NULL,
    questions_to_attempt INTEGER NOT NULL,
    total_marks NUMERIC(6,2) NOT NULL,
    marks_per_question NUMERIC(6,2) NOT NULL,
    duration_minutes INTEGER, -- NULL if entire exam shared timer
    marking_rule_id VARCHAR(64) REFERENCES marking_rules(rule_id),
    attempt_rule_id VARCHAR(64) REFERENCES attempt_rules(attempt_rule_id),
    allowed_question_types JSON NOT NULL, -- e.g., ["single_mcq", "numerical"]
    language_rule_override VARCHAR(64),
    instructions TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ----------------------------------------------------------------------------
-- 8. OFFICIAL SOURCES & VERIFICATION RECORDS
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS official_sources (
    source_id VARCHAR(64) PRIMARY KEY,
    organization_id VARCHAR(64) REFERENCES organizations(organization_id),
    document_title VARCHAR(255) NOT NULL,
    document_type VARCHAR(64) NOT NULL, -- 'OfficialNotification', 'InformationBrochure', 'SyllabusCircular', 'ModelPaper', 'OfficialAnswerKey', 'Corrigendum'
    source_url VARCHAR(512) NOT NULL,
    publication_date DATE,
    effective_date DATE,
    applicable_year VARCHAR(32) NOT NULL,
    source_hash VARCHAR(128), -- SHA-256 hash of PDF/HTML for integrity
    retrieved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    verified_at TIMESTAMP,
    verification_status VARCHAR(32) DEFAULT 'VERIFIED', -- 'VERIFIED', 'NEEDS_REVIEW', 'CONFLICT', 'OUTDATED', 'UNAVAILABLE'
    verification_notes TEXT
);

CREATE TABLE IF NOT EXISTS source_verification_records (
    verification_id VARCHAR(64) PRIMARY KEY,
    source_id VARCHAR(64) NOT NULL REFERENCES official_sources(source_id),
    target_entity_type VARCHAR(64) NOT NULL, -- 'ExamBlueprint', 'Syllabus', 'Question', 'MarkingRule'
    target_entity_id VARCHAR(64) NOT NULL,
    verified_by VARCHAR(64) NOT NULL, -- Human Auditor ID or Verified Bot Pipeline
    verification_status VARCHAR(32) NOT NULL,
    audit_notes TEXT,
    verified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ----------------------------------------------------------------------------
-- 9. QUESTIONS, QUESTION VERSIONS & REPOSITORIES
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS questions (
    question_id VARCHAR(64) PRIMARY KEY,
    exam_version_id VARCHAR(64) REFERENCES exam_versions(version_id),
    board_id VARCHAR(64) REFERENCES boards(board_id),
    subject_id VARCHAR(64) NOT NULL REFERENCES subjects(subject_id),
    chapter_id VARCHAR(64) REFERENCES syllabus_chapters(chapter_id),
    topic_id VARCHAR(64) REFERENCES syllabus_topics(topic_id),
    question_type_id VARCHAR(64) NOT NULL REFERENCES question_types(type_id),
    difficulty VARCHAR(16) DEFAULT 'MEDIUM', -- 'EASY', 'MEDIUM', 'HARD'
    marks NUMERIC(6,2) NOT NULL DEFAULT 1.00,
    source_type VARCHAR(64) NOT NULL, -- 'OFFICIAL_QUESTION', 'PREVIOUS_YEAR_QUESTION', 'OFFICIAL_SAMPLE', 'OFFICIAL_MODEL', 'AI_PRACTICE', 'HUMAN_CURATED', 'IMPORTED_LICENSED', 'OTHER_VERIFIED'
    source_id VARCHAR(64) REFERENCES official_sources(source_id),
    official_year VARCHAR(32),
    is_verified BOOLEAN DEFAULT FALSE,
    verified_at TIMESTAMP,
    current_version INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS question_versions (
    version_id VARCHAR(64) PRIMARY KEY,
    question_id VARCHAR(64) NOT NULL REFERENCES questions(question_id) ON DELETE CASCADE,
    version_number INTEGER NOT NULL,
    language_content JSON NOT NULL, 
    -- Format: {
    --   "hi": { "q": "प्रश्न...", "options": ["A...", "B..."], "ans": "A...", "exp": "स्पष्टीकरण..." },
    --   "en": { "q": "Question...", "options": ["A...", "B..."], "ans": "A...", "exp": "Explanation..." }
    -- }
    correct_answer JSON NOT NULL, -- e.g., {"index": 0, "key": "A", "value": 42}
    numerical_tolerance NUMERIC(6,4), -- for numerical type questions
    marking_rule_id VARCHAR(64) REFERENCES marking_rules(rule_id),
    correction_reason TEXT,
    supersedes_version INTEGER,
    verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS question_tags (
    tag_id VARCHAR(64) PRIMARY KEY,
    question_id VARCHAR(64) NOT NULL REFERENCES questions(question_id) ON DELETE CASCADE,
    tag_name VARCHAR(64) NOT NULL, -- e.g., 'TCS_PYQ_2024', 'NCERT_CLASS_10', 'HIGH_PROBABILITY', 'CALCULATION_HEAVY'
    tag_type VARCHAR(32) DEFAULT 'GENERAL'
);

-- ----------------------------------------------------------------------------
-- 10. MOCK TEST CONFIGURATIONS & RUNS
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS mock_test_configurations (
    config_id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    test_mode VARCHAR(64) NOT NULL, -- 'FULL_EXAM_MOCK', 'SUBJECT_MOCK', 'CHAPTER_TEST', 'TOPIC_TEST', 'PREVIOUS_YEAR_TEST', 'REVISION_TEST', 'WEAK_TOPIC_TEST', 'CUSTOM_PRACTICE'
    blueprint_id VARCHAR(64) REFERENCES exam_blueprints(blueprint_id),
    subject_id VARCHAR(64) REFERENCES subjects(subject_id),
    chapter_id VARCHAR(64) REFERENCES syllabus_chapters(chapter_id),
    topic_id VARCHAR(64) REFERENCES syllabus_topics(topic_id),
    is_blueprint_driven BOOLEAN DEFAULT TRUE,
    configured_question_count INTEGER NOT NULL, -- Official count for Full Mock, or 10/20/30/50/100/Custom for Practice
    duration_minutes INTEGER NOT NULL,
    allows_pause BOOLEAN DEFAULT FALSE,
    shuffle_questions BOOLEAN DEFAULT TRUE,
    shuffle_options BOOLEAN DEFAULT TRUE,
    instant_solution_mode BOOLEAN DEFAULT FALSE, -- True for Practice, False for Real CBT
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ----------------------------------------------------------------------------
-- 11. NOTES & STUDY REVISION VAULT
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS notes (
    note_id VARCHAR(64) PRIMARY KEY,
    exam_version_id VARCHAR(64) REFERENCES exam_versions(version_id),
    subject_id VARCHAR(64) NOT NULL REFERENCES subjects(subject_id),
    chapter_id VARCHAR(64) REFERENCES syllabus_chapters(chapter_id),
    topic_id VARCHAR(64) REFERENCES syllabus_topics(topic_id),
    language_id VARCHAR(32) NOT NULL REFERENCES languages(language_id),
    note_type VARCHAR(64) NOT NULL, -- 'CompleteNotes', 'ChapterNotes', 'QuickRevision', 'FormulaSheet', 'OneLiners', 'ConceptNotes', 'ImportantFacts', 'MistakeNotes', 'ExamStrategy', 'QuestionExplanation'
    title VARCHAR(255) NOT NULL,
    summary TEXT,
    content JSON NOT NULL, -- Structured blocks, headings, formulas, memory tricks
    source_references JSON,
    verification_status VARCHAR(32) DEFAULT 'VERIFIED',
    version INTEGER DEFAULT 1,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ----------------------------------------------------------------------------
-- 12. PDF TEMPLATES & EXPORT ENGINE
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS pdf_templates (
    template_id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(128) NOT NULL,
    pdf_type VARCHAR(64) NOT NULL, -- 'FULL_EXAM_MOCK_PAPER', 'OMR_BUBBLE_SHEET', 'NOTES_PDF', 'REVISION_PDF', 'QUESTION_BANK_PDF', 'PREVIOUS_YEAR_PAPER_PDF', 'SOLUTION_KEY_PDF'
    blueprint_id VARCHAR(64) REFERENCES exam_blueprints(blueprint_id),
    page_format VARCHAR(16) DEFAULT 'A4',
    orientation VARCHAR(16) DEFAULT 'portrait',
    layout_mode VARCHAR(32) DEFAULT 'TWO_COLUMN_BILINGUAL', -- 'SINGLE_COLUMN', 'TWO_COLUMN_BILINGUAL', 'OMR_GRID'
    header_html TEXT,
    footer_html TEXT,
    css_rules TEXT,
    embedded_fonts JSON, -- e.g., ["NotoSansDevanagari-Regular.ttf", "NotoSansTamil-Regular.ttf"]
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ----------------------------------------------------------------------------
-- 13. AUDIT TRAIL & AUTOMATED CHANGE LOGS
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS change_logs (
    log_id VARCHAR(64) PRIMARY KEY,
    entity_type VARCHAR(64) NOT NULL, -- 'ExamBlueprint', 'Syllabus', 'Question', 'MarkingRule', 'OfficialSource'
    entity_id VARCHAR(64) NOT NULL,
    previous_version JSON,
    new_version JSON,
    changed_fields JSON NOT NULL,
    change_source VARCHAR(64) NOT NULL, -- 'AUTO_CRAWLER', 'ADMIN_MANUAL', 'VERIFICATION_PIPELINE'
    severity VARCHAR(16) DEFAULT 'MEDIUM', -- 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL'
    change_summary TEXT NOT NULL,
    detected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    verified_at TIMESTAMP,
    verified_by VARCHAR(64)
);

-- ----------------------------------------------------------------------------
-- 14. PERFORMANCE INDEXES
-- ----------------------------------------------------------------------------

CREATE INDEX IF NOT EXISTS idx_exams_org ON exams(organization_id);
CREATE INDEX IF NOT EXISTS idx_exams_board ON exams(board_id);
CREATE INDEX IF NOT EXISTS idx_exam_versions_exam ON exam_versions(exam_id);
CREATE INDEX IF NOT EXISTS idx_blueprints_version ON exam_blueprints(exam_version_id);
CREATE INDEX IF NOT EXISTS idx_sections_blueprint ON blueprint_sections(blueprint_id);
CREATE INDEX IF NOT EXISTS idx_questions_exam_ver ON questions(exam_version_id);
CREATE INDEX IF NOT EXISTS idx_questions_subject ON questions(subject_id);
CREATE INDEX IF NOT EXISTS idx_questions_chapter ON questions(chapter_id);
CREATE INDEX IF NOT EXISTS idx_questions_source_type ON questions(source_type);
CREATE INDEX IF NOT EXISTS idx_change_logs_entity ON change_logs(entity_type, entity_id);
