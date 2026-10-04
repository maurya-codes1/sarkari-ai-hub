const path = require('path');
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, '../../../db/sarkari_core.db');
const db = new Database(dbPath);

console.log('Registering SSC Organization, Sources, and 10 SSC CGL Subjects...');

const orgStmt = db.prepare(`
  INSERT OR REPLACE INTO organizations (
    organization_id, name, short_name, type, central_or_state,
    state_or_ut, official_website, active, verification_status
  ) VALUES (
    @organization_id, @name, @short_name, @type, @central_or_state,
    @state_or_ut, @official_website, @active, @verification_status
  )
`);

const sourceStmt = db.prepare(`
  INSERT OR REPLACE INTO official_sources (
    source_id, organization_id, document_title, document_type, source_url,
    publication_date, effective_date, applicable_year, source_hash, retrieved_at,
    verified_at, verification_status, verification_notes, source_hierarchy_level,
    issuing_authority, applicable_exam_id, applicable_version_id, freshness_status,
    conflict_status
  ) VALUES (
    @source_id, @organization_id, @document_title, @document_type, @source_url,
    '2026-01-15', '2026-04-01', '2026-27', 'OFFICIAL_SSC_CGL_SRC_HASH', CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP, 'VERIFIED', 'Official Staff Selection Commission examination regulations and syllabus',
    'PRIMARY_STATUTORY', 'Staff Selection Commission (Govt of India)', 'ssc-cgl',
    'ver-ssc-cgl-2026', 'FRESH', 'RESOLVED_NO_CONFLICT'
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
  // 1. Organization
  orgStmt.run({
    organization_id: 'org-central-ssc',
    name: 'Staff Selection Commission (Government of India)',
    short_name: 'SSC',
    type: 'CENTRAL_COMMISSION',
    central_or_state: 'CENTRAL',
    state_or_ut: 'National',
    official_website: 'https://ssc.gov.in',
    active: 1,
    verification_status: 'VERIFIED'
  });

  // 2. Sources
  const sources = [
    {
      source_id: 'src-ssc-cgl-portal',
      organization_id: 'org-central-ssc',
      document_title: 'Staff Selection Commission CGL Official Web Portal',
      document_type: 'OFFICIAL_PORTAL',
      source_url: 'https://ssc.gov.in'
    },
    {
      source_id: 'src-ssc-cgl-notice-2026',
      organization_id: 'org-central-ssc',
      document_title: 'Notice of Combined Graduate Level Examination 2026 Scheme & Regulations',
      document_type: 'EXAM_NOTIFICATION',
      source_url: 'https://ssc.gov.in/portal/notices'
    },
    {
      source_id: 'src-ssc-cgl-pyq-corpus',
      organization_id: 'org-central-ssc',
      document_title: 'Staff Selection Commission Historical Question Papers Corpus (2020-2025)',
      document_type: 'OFFICIAL_ARCHIVE',
      source_url: 'https://ssc.gov.in'
    }
  ];

  for (const s of sources) {
    sourceStmt.run(s);
  }

  // 3. Subjects
  const subjects = [
    {
      subject_id: 'ssc-cgl-t1-quantitative-aptitude',
      name: 'SSC CGL Tier-1 Quantitative Aptitude (संख्यात्मक अभियोग्यता)',
      short_name: 'CGL T1 Quant',
      subject_type: 'GENERAL_APTITUDE',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'ssc-cgl-t1-reasoning',
      name: 'SSC CGL Tier-1 General Intelligence and Reasoning (सामान्य बुद्धिमत्ता एवं तर्कशक्ति)',
      short_name: 'CGL T1 Reasoning',
      subject_type: 'GENERAL_INTELLIGENCE',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'ssc-cgl-t1-english',
      name: 'SSC CGL Tier-1 English Comprehension (अंग्रेजी समझ)',
      short_name: 'CGL T1 English',
      subject_type: 'LANGUAGE_COMPREHENSION',
      is_language_subject: 1,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'ssc-cgl-t1-general-awareness',
      name: 'SSC CGL Tier-1 General Awareness (सामान्य जागरूकता - Static GK & Current)',
      short_name: 'CGL T1 GA',
      subject_type: 'GENERAL_AWARENESS',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'ssc-cgl-t2-mathematical-abilities',
      name: 'SSC CGL Tier-2 Module-I Mathematical Abilities (गणितीय क्षमताएं)',
      short_name: 'CGL T2 Maths',
      subject_type: 'CORE_MATHEMATICS',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'ssc-cgl-t2-reasoning',
      name: 'SSC CGL Tier-2 Module-II Reasoning & General Intelligence (उन्नत तर्कशक्ति)',
      short_name: 'CGL T2 Reasoning',
      subject_type: 'GENERAL_INTELLIGENCE',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'ssc-cgl-t2-english',
      name: 'SSC CGL Tier-2 Module-I English Language & Comprehension (उन्नत अंग्रेजी)',
      short_name: 'CGL T2 English',
      subject_type: 'LANGUAGE_COMPREHENSION',
      is_language_subject: 1,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'ssc-cgl-t2-general-awareness',
      name: 'SSC CGL Tier-2 Module-II General Awareness (गहन सामान्य अध्ययन)',
      short_name: 'CGL T2 GA',
      subject_type: 'GENERAL_AWARENESS',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'ssc-cgl-t2-computer-knowledge',
      name: 'SSC CGL Tier-2 Module-I Computer Knowledge Module (कंप्यूटर ज्ञान मॉड्यूल)',
      short_name: 'CGL T2 Computer',
      subject_type: 'TECHNICAL_SKILL',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'ssc-cgl-t2-statistics',
      name: 'SSC CGL Tier-2 Paper-II Statistics (सांख्यिकी - JSO)',
      short_name: 'CGL T2 Statistics',
      subject_type: 'SPECIALISED_STATISTICS',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    }
  ];

  for (const sub of subjects) {
    subjectStmt.run(sub);
  }
});

tx();

console.log('✅ Successfully registered SSC Organization, 3 Sources, and 10 Subjects for SSC CGL.');
