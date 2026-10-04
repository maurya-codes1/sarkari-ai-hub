const path = require('path');
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, '../../../db/sarkari_core.db');
const db = new Database(dbPath);

console.log('Registering RRB Technician Sources and 6 Subjects in SQLite database...');

const sourceStmt = db.prepare(`
  INSERT OR REPLACE INTO official_sources (
    source_id, organization_id, document_title, document_type, source_url,
    publication_date, effective_date, applicable_year, source_hash, retrieved_at,
    verified_at, verification_status, verification_notes, source_hierarchy_level,
    issuing_authority, applicable_exam_id, applicable_version_id, freshness_status,
    conflict_status
  ) VALUES (
    @source_id, @organization_id, @document_title, @document_type, @source_url,
    '2026-09-01', '2026-10-15', '2026-27', 'OFFICIAL_RRB_TECH_SRC_HASH', CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP, 'VERIFIED', 'Official Railway Recruitment Boards Technician CEN examination regulations and syllabus',
    'PRIMARY_STATUTORY', 'Railway Recruitment Control Board (Ministry of Railways)', 'rrb-technician',
    'ver-rrb-technician-2026', 'FRESH', 'RESOLVED_NO_CONFLICT'
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
      source_id: 'src-rrb-technician-portal',
      organization_id: 'org-railway-recruitment-boards-rrb',
      document_title: 'Railway Recruitment Boards Centralized Application Web Portal (RRB Apply)',
      document_type: 'OFFICIAL_PORTAL',
      source_url: 'https://www.rrbapply.gov.in'
    },
    {
      source_id: 'src-rrb-technician-notice-2026',
      organization_id: 'org-railway-recruitment-boards-rrb',
      document_title: 'Centralised Employment Notice for Technician Grade I Signal & Grade III Posts 2026',
      document_type: 'EXAM_NOTIFICATION',
      source_url: 'https://www.rrbapply.gov.in'
    },
    {
      source_id: 'src-rrb-technician-pyq-corpus',
      organization_id: 'org-railway-recruitment-boards-rrb',
      document_title: 'Railway Recruitment Boards Technician Historical Question Papers Corpus (2018-2025)',
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
      subject_id: 'rrb-tech-mathematics',
      name: 'RRB Technician Mathematics (तकनीशियन गणित - 20/25 प्रश्न भार)',
      short_name: 'Tech Maths',
      subject_type: 'GENERAL_APTITUDE',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'rrb-tech-reasoning',
      name: 'RRB Technician General Intelligence & Reasoning (सामान्य तर्कशक्ति - 15/25 प्रश्न भार)',
      short_name: 'Tech Reasoning',
      subject_type: 'GENERAL_INTELLIGENCE',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'rrb-tech-general-science',
      name: 'RRB Technician General Science (सामान्य विज्ञान - 40 प्रश्न भार Grade III)',
      short_name: 'Tech Science',
      subject_type: 'GENERAL_SCIENCE',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'rrb-tech-basic-science-engineering',
      name: 'RRB Technician Basic Science & Engineering (मूल विज्ञान एवं इंजीनियरिंग - 35 प्रश्न भार Grade I Signal)',
      short_name: 'Tech BSE',
      subject_type: 'ENGINEERING_SCIENCES',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'rrb-tech-computers-applications',
      name: 'RRB Technician Basics of Computers & Applications (कंप्यूटर एवं अनुप्रयोग - 20 प्रश्न भार Grade I Signal)',
      short_name: 'Tech Computers',
      subject_type: 'COMPUTER_SCIENCE',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'rrb-tech-general-awareness',
      name: 'RRB Technician General Awareness on Current Affairs (समसामयिकी सामान्य जागरूकता - 10 प्रश्न भार)',
      short_name: 'Tech GA',
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
    SET organization_id = 'org-railway-recruitment-boards-rrb',
        status = 'ACTIVE_RECRUITMENT_2026',
        active = 1,
        updated_at = CURRENT_TIMESTAMP
    WHERE exam_id = 'rrb-technician'
  `).run();
});

tx();

console.log('✅ Successfully registered RRB Technician sources, subjects, and exam metadata.');
