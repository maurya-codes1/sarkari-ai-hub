const path = require('path');
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, '../../../db/sarkari_core.db');
const db = new Database(dbPath);

console.log('Registering RRB NTPC Sources and 6 Subjects in SQLite database...');

const sourceStmt = db.prepare(`
  INSERT OR REPLACE INTO official_sources (
    source_id, organization_id, document_title, document_type, source_url,
    publication_date, effective_date, applicable_year, source_hash, retrieved_at,
    verified_at, verification_status, verification_notes, source_hierarchy_level,
    issuing_authority, applicable_exam_id, applicable_version_id, freshness_status,
    conflict_status
  ) VALUES (
    @source_id, @organization_id, @document_title, @document_type, @source_url,
    '2026-09-01', '2026-10-15', '2026-27', 'OFFICIAL_RRB_NTPC_SRC_HASH', CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP, 'VERIFIED', 'Official Railway Recruitment Boards NTPC CEN examination regulations and syllabus',
    'PRIMARY_STATUTORY', 'Railway Recruitment Control Board (Ministry of Railways)', 'rrb-ntpc',
    'ver-rrb-ntpc-2026', 'FRESH', 'RESOLVED_NO_CONFLICT'
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
      source_id: 'src-rrb-ntpc-portal',
      organization_id: 'org-railway-recruitment-boards-rrb',
      document_title: 'Railway Recruitment Boards Centralized Application Web Portal',
      document_type: 'OFFICIAL_PORTAL',
      source_url: 'https://www.rrbapply.gov.in'
    },
    {
      source_id: 'src-rrb-ntpc-notice-2026',
      organization_id: 'org-railway-recruitment-boards-rrb',
      document_title: 'Centralised Employment Notice for NTPC Graduate & Under Graduate Posts 2026',
      document_type: 'EXAM_NOTIFICATION',
      source_url: 'https://www.rrbapply.gov.in'
    },
    {
      source_id: 'src-rrb-ntpc-pyq-corpus',
      organization_id: 'org-railway-recruitment-boards-rrb',
      document_title: 'Railway Recruitment Boards NTPC Historical Question Papers Corpus (2019-2025)',
      document_type: 'OFFICIAL_ARCHIVE',
      source_url: 'https://indianrailways.gov.in'
    }
  ];

  for (const s of sources) {
    sourceStmt.run(s);
  }

  // 2. Subjects
  const subjects = [
    {
      subject_id: 'rrb-ntpc-cbt1-general-awareness',
      name: 'RRB NTPC CBT-1 General Awareness (सामान्य जागरूकता - 40 प्रश्न भार)',
      short_name: 'NTPC CBT1 GA',
      subject_type: 'GENERAL_AWARENESS',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'rrb-ntpc-cbt1-mathematics',
      name: 'RRB NTPC CBT-1 Mathematics (गणित - 30 प्रश्न भार)',
      short_name: 'NTPC CBT1 Maths',
      subject_type: 'GENERAL_APTITUDE',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'rrb-ntpc-cbt1-reasoning',
      name: 'RRB NTPC CBT-1 General Intelligence and Reasoning (तर्कशक्ति - 30 प्रश्न भार)',
      short_name: 'NTPC CBT1 Reasoning',
      subject_type: 'GENERAL_INTELLIGENCE',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'rrb-ntpc-cbt2-general-awareness',
      name: 'RRB NTPC CBT-2 Advanced General Awareness (उन्नत सामान्य जागरूकता - 50 प्रश्न भार)',
      short_name: 'NTPC CBT2 GA',
      subject_type: 'ADVANCED_GA',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'rrb-ntpc-cbt2-mathematics',
      name: 'RRB NTPC CBT-2 Advanced Mathematics (उन्नत गणित - 35 प्रश्न भार)',
      short_name: 'NTPC CBT2 Maths',
      subject_type: 'CORE_MATHEMATICS',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'rrb-ntpc-cbt2-reasoning',
      name: 'RRB NTPC CBT-2 Advanced Reasoning (उन्नत तर्कशक्ति एवं बुद्धिमत्ता - 35 प्रश्न भार)',
      short_name: 'NTPC CBT2 Reasoning',
      subject_type: 'ADVANCED_REASONING',
      is_language_subject: 0,
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
    SET status = 'ACTIVE_RECRUITMENT_2026',
        active = 1,
        updated_at = CURRENT_TIMESTAMP
    WHERE exam_id = 'rrb-ntpc'
  `).run();
});

tx();

console.log('✅ Successfully registered RRB NTPC sources, subjects, and exam metadata.');
