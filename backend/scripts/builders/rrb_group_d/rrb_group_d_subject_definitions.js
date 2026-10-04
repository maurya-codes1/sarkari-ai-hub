const path = require('path');
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, '../../../db/sarkari_core.db');
const db = new Database(dbPath);

console.log('Registering RRB Group D Sources and 4 Subjects in SQLite database...');

const sourceStmt = db.prepare(`
  INSERT OR REPLACE INTO official_sources (
    source_id, organization_id, document_title, document_type, source_url,
    publication_date, effective_date, applicable_year, source_hash, retrieved_at,
    verified_at, verification_status, verification_notes, source_hierarchy_level,
    issuing_authority, applicable_exam_id, applicable_version_id, freshness_status,
    conflict_status
  ) VALUES (
    @source_id, @organization_id, @document_title, @document_type, @source_url,
    '2026-09-01', '2026-10-15', '2026-27', 'OFFICIAL_RRB_GROUP_D_SRC_HASH', CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP, 'VERIFIED', 'Official Railway Recruitment Cells / Boards Group D CEN examination regulations and syllabus',
    'PRIMARY_STATUTORY', 'Railway Recruitment Control Board / Railway Recruitment Cells (Ministry of Railways)', 'rrb-group-d',
    'ver-rrb-group-d-2026', 'FRESH', 'RESOLVED_NO_CONFLICT'
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
      source_id: 'src-rrb-group-d-portal',
      organization_id: 'org-railway-recruitment-cell-rrb',
      document_title: 'Railway Recruitment Boards Centralized Application Web Portal (RRB Apply)',
      document_type: 'OFFICIAL_PORTAL',
      source_url: 'https://www.rrbapply.gov.in'
    },
    {
      source_id: 'src-rrb-group-d-notice-2026',
      organization_id: 'org-railway-recruitment-cell-rrb',
      document_title: 'Centralised Employment Notice for Level-1 (Group D) Posts 2026',
      document_type: 'EXAM_NOTIFICATION',
      source_url: 'https://www.rrbapply.gov.in'
    },
    {
      source_id: 'src-rrb-group-d-pyq-corpus',
      organization_id: 'org-railway-recruitment-cell-rrb',
      document_title: 'Railway Recruitment Boards Group D Historical Question Papers Corpus (2018-2025)',
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
      subject_id: 'rrb-group-d-general-science',
      name: 'RRB Group D General Science (सामान्य विज्ञान - 25 प्रश्न भार)',
      short_name: 'Group D Science',
      subject_type: 'GENERAL_SCIENCE',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'rrb-group-d-mathematics',
      name: 'RRB Group D Mathematics (गणित - 25 प्रश्न भार)',
      short_name: 'Group D Maths',
      subject_type: 'GENERAL_APTITUDE',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'rrb-group-d-reasoning',
      name: 'RRB Group D General Intelligence & Reasoning (सामान्य बुद्धिमत्ता एवं तर्कशक्ति - 30 प्रश्न भार)',
      short_name: 'Group D Reasoning',
      subject_type: 'GENERAL_INTELLIGENCE',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'rrb-group-d-general-awareness',
      name: 'RRB Group D General Awareness on Current Affairs (समसामयिक सामान्य जागरूकता - 20 प्रश्न भार)',
      short_name: 'Group D GA',
      subject_type: 'GENERAL_AWARENESS',
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
    SET organization_id = 'org-railway-recruitment-cell-rrb',
        status = 'ACTIVE_RECRUITMENT_2026',
        active = 1,
        updated_at = CURRENT_TIMESTAMP
    WHERE exam_id = 'rrb-group-d'
  `).run();
});

tx();

console.log('✅ Successfully registered RRB Group D sources, subjects, and exam metadata.');
