const path = require('path');
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, '../../../db/sarkari_core.db');
const db = new Database(dbPath);

console.log('Registering SSC MTS Sources and 4 Subjects in SQLite database...');

const sourceStmt = db.prepare(`
  INSERT OR REPLACE INTO official_sources (
    source_id, organization_id, document_title, document_type, source_url,
    publication_date, effective_date, applicable_year, source_hash, retrieved_at,
    verified_at, verification_status, verification_notes, source_hierarchy_level,
    issuing_authority, applicable_exam_id, applicable_version_id, freshness_status,
    conflict_status
  ) VALUES (
    @source_id, @organization_id, @document_title, @document_type, @source_url,
    '2026-06-01', '2026-08-01', '2026-27', 'OFFICIAL_SSC_MTS_SRC_HASH', CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP, 'VERIFIED', 'Official Staff Selection Commission MTS & Havaldar examination regulations and syllabus',
    'PRIMARY_STATUTORY', 'Staff Selection Commission (Govt of India)', 'ssc-mts',
    'ver-ssc-mts-2026', 'FRESH', 'RESOLVED_NO_CONFLICT'
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
      source_id: 'src-ssc-mts-portal',
      organization_id: 'org-central-ssc',
      document_title: 'Staff Selection Commission MTS Official Examination Web Portal',
      document_type: 'OFFICIAL_PORTAL',
      source_url: 'https://ssc.gov.in'
    },
    {
      source_id: 'src-ssc-mts-notice-2026',
      organization_id: 'org-central-ssc',
      document_title: 'Notice of Multi-Tasking (Non-Technical) Staff and Havaldar Examination 2026',
      document_type: 'EXAM_NOTIFICATION',
      source_url: 'https://ssc.gov.in/portal/notices'
    },
    {
      source_id: 'src-ssc-mts-pyq-corpus',
      organization_id: 'org-central-ssc',
      document_title: 'Staff Selection Commission MTS Historical Question Papers Corpus (2020-2025)',
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
      subject_id: 'ssc-mts-s1-numerical-maths',
      name: 'SSC MTS Session-I Numerical and Mathematical Ability (संख्यात्मक एवं गणितीय योग्यता)',
      short_name: 'MTS S1 Maths',
      subject_type: 'GENERAL_APTITUDE',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'ssc-mts-s1-reasoning',
      name: 'SSC MTS Session-I Reasoning Ability and Problem Solving (तर्कशक्ति क्षमता एवं समस्या समाधान)',
      short_name: 'MTS S1 Reasoning',
      subject_type: 'GENERAL_INTELLIGENCE',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'ssc-mts-s2-general-awareness',
      name: 'SSC MTS Session-II General Awareness (सामान्य जागरूकता - मेरिट निर्धारक)',
      short_name: 'MTS S2 GA',
      subject_type: 'GENERAL_AWARENESS',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'ssc-mts-s2-english',
      name: 'SSC MTS Session-II English Language and Comprehension (अंग्रेजी भाषा एवं बोधगम्यता - मेरिट निर्धारक)',
      short_name: 'MTS S2 English',
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
    WHERE exam_id = 'ssc-mts'
  `).run();
});

tx();

console.log('✅ Successfully registered SSC MTS sources, subjects, and exam metadata.');
