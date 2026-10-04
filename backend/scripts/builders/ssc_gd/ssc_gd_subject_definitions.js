const path = require('path');
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, '../../../db/sarkari_core.db');
const db = new Database(dbPath);

console.log('Registering SSC GD Sources and 5 Subjects in SQLite database...');

const sourceStmt = db.prepare(`
  INSERT OR REPLACE INTO official_sources (
    source_id, organization_id, document_title, document_type, source_url,
    publication_date, effective_date, applicable_year, source_hash, retrieved_at,
    verified_at, verification_status, verification_notes, source_hierarchy_level,
    issuing_authority, applicable_exam_id, applicable_version_id, freshness_status,
    conflict_status
  ) VALUES (
    @source_id, @organization_id, @document_title, @document_type, @source_url,
    '2026-09-05', '2026-10-14', '2026-27', 'OFFICIAL_SSC_GD_SRC_HASH', CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP, 'VERIFIED', 'Official Staff Selection Commission GD Constable in CAPFs examination regulations and syllabus',
    'PRIMARY_STATUTORY', 'Staff Selection Commission (Govt of India)', 'ssc-gd',
    'ver-ssc-gd-2026', 'FRESH', 'RESOLVED_NO_CONFLICT'
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
      source_id: 'src-ssc-gd-portal',
      organization_id: 'org-central-ssc',
      document_title: 'Staff Selection Commission GD Constable Official Examination Web Portal',
      document_type: 'OFFICIAL_PORTAL',
      source_url: 'https://ssc.gov.in'
    },
    {
      source_id: 'src-ssc-gd-notice-2026',
      organization_id: 'org-central-ssc',
      document_title: 'Notice of Constable (GD) in Central Armed Police Forces (CAPFs), SSF and Rifleman (GD) Examination 2026',
      document_type: 'EXAM_NOTIFICATION',
      source_url: 'https://ssc.gov.in/portal/notices'
    },
    {
      source_id: 'src-ssc-gd-pyq-corpus',
      organization_id: 'org-central-ssc',
      document_title: 'Staff Selection Commission GD Constable Historical Question Papers Corpus (2020-2025)',
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
      subject_id: 'ssc-gd-part-a-reasoning',
      name: 'SSC GD Part-A General Intelligence and Reasoning (सामान्य बुद्धिमत्ता एवं तर्कशक्ति)',
      short_name: 'GD Reasoning',
      subject_type: 'GENERAL_INTELLIGENCE',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'ssc-gd-part-b-general-knowledge',
      name: 'SSC GD Part-B General Knowledge and General Awareness (सामान्य ज्ञान एवं सामान्य जागरूकता)',
      short_name: 'GD GK/GA',
      subject_type: 'GENERAL_AWARENESS',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'ssc-gd-part-c-elementary-maths',
      name: 'SSC GD Part-C Elementary Mathematics (प्रारंभिक गणित)',
      short_name: 'GD Maths',
      subject_type: 'GENERAL_APTITUDE',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'ssc-gd-part-d-english',
      name: 'SSC GD Part-D English (अंग्रेजी व्याकरण एवं समझ)',
      short_name: 'GD English',
      subject_type: 'LANGUAGE_COMPREHENSION',
      is_language_subject: 1,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'ssc-gd-part-d-hindi',
      name: 'SSC GD Part-D General Hindi (सामान्य हिंदी)',
      short_name: 'GD Hindi',
      subject_type: 'LANGUAGE_COMPREHENSION',
      is_language_subject: 1,
      is_medium_dependent: 0,
      active: 1
    }
  ];

  for (const sub of subjects) {
    subjectStmt.run(sub);
  }

  // Update exam record
  db.prepare(`
    UPDATE exams
    SET organization_id = 'org-central-ssc',
        status = 'ACTIVE_RECRUITMENT_2026',
        active = 1,
        updated_at = CURRENT_TIMESTAMP
    WHERE exam_id = 'ssc-gd'
  `).run();
});

tx();

console.log('✅ Successfully registered SSC GD sources, subjects, and exam metadata.');
