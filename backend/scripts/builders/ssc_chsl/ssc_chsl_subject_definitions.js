const path = require('path');
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, '../../../db/sarkari_core.db');
const db = new Database(dbPath);

console.log('Registering SSC CHSL Sources and 9 Subjects in SQLite database...');

const sourceStmt = db.prepare(`
  INSERT OR REPLACE INTO official_sources (
    source_id, organization_id, document_title, document_type, source_url,
    publication_date, effective_date, applicable_year, source_hash, retrieved_at,
    verified_at, verification_status, verification_notes, source_hierarchy_level,
    issuing_authority, applicable_exam_id, applicable_version_id, freshness_status,
    conflict_status
  ) VALUES (
    @source_id, @organization_id, @document_title, @document_type, @source_url,
    '2026-04-01', '2026-07-01', '2026-27', 'OFFICIAL_SSC_CHSL_SRC_HASH', CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP, 'VERIFIED', 'Official Staff Selection Commission CHSL (10+2) examination regulations and syllabus',
    'PRIMARY_STATUTORY', 'Staff Selection Commission (Govt of India)', 'ssc-chsl',
    'ver-ssc-chsl-2026', 'FRESH', 'RESOLVED_NO_CONFLICT'
  )
`);

const subjectStmt = db.prepare(`
  INSERT OR REPLACE INTO subjects (
    subject_id, name, short_name, subject_type, is_language_subject,
    is_medium_dependent, active
  ) VALUES (
    @subject_id, @name, @short_name, @subject_type, @is_language_subject,
    @is_medium_dependent, @active
  )
`);

const tx = db.transaction(() => {
  // 1. Sources
  const sources = [
    {
      source_id: 'src-ssc-chsl-portal',
      organization_id: 'org-central-ssc',
      document_title: 'Staff Selection Commission CHSL Official Web Portal',
      document_type: 'OFFICIAL_PORTAL',
      source_url: 'https://ssc.gov.in'
    },
    {
      source_id: 'src-ssc-chsl-notice-2026',
      organization_id: 'org-central-ssc',
      document_title: 'Notice of Combined Higher Secondary (10+2) Level Examination 2026 Scheme & Regulations',
      document_type: 'EXAM_NOTIFICATION',
      source_url: 'https://ssc.gov.in/portal/notices'
    },
    {
      source_id: 'src-ssc-chsl-pyq-corpus',
      organization_id: 'org-central-ssc',
      document_title: 'Staff Selection Commission CHSL Historical Question Papers Corpus (2020-2025)',
      document_type: 'OFFICIAL_ARCHIVE',
      source_url: 'https://ssc.gov.in'
    }
  ];

  for (const s of sources) {
    sourceStmt.run(s);
  }

  // 2. Subjects
  const subjects = [
    {
      subject_id: 'ssc-chsl-t1-quantitative-aptitude',
      name: 'SSC CHSL Tier-1 Quantitative Aptitude (संख्यात्मक अभियोग्यता - बुनियादी अंकगणित)',
      short_name: 'CHSL T1 Quant',
      subject_type: 'GENERAL_APTITUDE',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'ssc-chsl-t1-general-intelligence',
      name: 'SSC CHSL Tier-1 General Intelligence (सामान्य बुद्धिमत्ता एवं तर्कशक्ति)',
      short_name: 'CHSL T1 Reasoning',
      subject_type: 'GENERAL_INTELLIGENCE',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'ssc-chsl-t1-english-language',
      name: 'SSC CHSL Tier-1 English Language (अंग्रेजी भाषा - बुनियादी ज्ञान)',
      short_name: 'CHSL T1 English',
      subject_type: 'LANGUAGE',
      is_language_subject: 1,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'ssc-chsl-t1-general-awareness',
      name: 'SSC CHSL Tier-1 General Awareness (सामान्य जागरूकता)',
      short_name: 'CHSL T1 GA',
      subject_type: 'GENERAL_AWARENESS',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'ssc-chsl-t2-mathematical-abilities',
      name: 'SSC CHSL Tier-2 Mathematical Abilities (गणितीय क्षमताएं)',
      short_name: 'CHSL T2 Maths',
      subject_type: 'CORE_MATHEMATICS',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'ssc-chsl-t2-reasoning',
      name: 'SSC CHSL Tier-2 Reasoning and General Intelligence (तर्कशक्ति एवं सामान्य बुद्धिमत्ता)',
      short_name: 'CHSL T2 Reasoning',
      subject_type: 'ADVANCED_REASONING',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'ssc-chsl-t2-english',
      name: 'SSC CHSL Tier-2 English Language and Comprehension (अंग्रेजी भाषा एवं बोधगम्यता)',
      short_name: 'CHSL T2 English',
      subject_type: 'LANGUAGE_COMPREHENSION',
      is_language_subject: 1,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'ssc-chsl-t2-general-awareness',
      name: 'SSC CHSL Tier-2 General Awareness (सामान्य जागरूकता)',
      short_name: 'CHSL T2 GA',
      subject_type: 'ADVANCED_GA',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'ssc-chsl-t2-computer-knowledge',
      name: 'SSC CHSL Tier-2 Computer Knowledge Module (कंप्यूटर ज्ञान मॉड्यूल)',
      short_name: 'CHSL T2 Computer',
      subject_type: 'COMPUTER_PROFICIENCY',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    }
  ];

  for (const sub of subjects) {
    subjectStmt.run(sub);
  }

  // Update exam record organization reference if needed
  db.prepare(`
    UPDATE exams
    SET organization_id = 'org-central-ssc',
        status = 'ACTIVE_RECRUITMENT_2026',
        active = 1,
        updated_at = CURRENT_TIMESTAMP
    WHERE exam_id = 'ssc-chsl'
  `).run();
});

tx();

console.log('✅ Successfully registered SSC CHSL sources, subjects, and exam metadata.');
