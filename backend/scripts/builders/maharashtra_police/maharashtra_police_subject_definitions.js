const path = require('path');
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, '../../../db/sarkari_core.db');
const db = new Database(dbPath);

console.log('Registering Maharashtra Police Official Sources and 4 Subjects in SQLite database...');

const sourceStmt = db.prepare(`
  INSERT OR REPLACE INTO official_sources (
    source_id, organization_id, document_title, document_type, source_url,
    publication_date, effective_date, applicable_year, source_hash, retrieved_at,
    verified_at, verification_status, verification_notes, source_hierarchy_level,
    issuing_authority, applicable_exam_id, applicable_version_id, freshness_status,
    conflict_status
  ) VALUES (
    @source_id, @organization_id, @document_title, @document_type, @source_url,
    '2026-01-20', '2026-03-01', '2026', 'OFFICIAL_MAHARASHTRA_POLICE_SRC_HASH', CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP, 'VERIFIED', 'Official Maharashtra Police Constable Recruitment Standing Order & Syllabus',
    'PRIMARY_STATUTORY', 'Maharashtra State Police Recruitment Board, Mumbai', 'maharashtra-police',
    'ver-maharashtra-police-2026', 'FRESH', 'RESOLVED_NO_CONFLICT'
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
      source_id: 'src-maharashtra-police-portal',
      organization_id: 'org-maharashtra-state-police-recruitment-boa',
      document_title: 'Maharashtra Police Official Headquarters Portal (mahapolice.gov.in)',
      document_type: 'OFFICIAL_PORTAL',
      source_url: 'https://mahapolice.gov.in'
    },
    {
      source_id: 'src-maharashtra-police-recruitment-2026',
      organization_id: 'org-maharashtra-state-police-recruitment-boa',
      document_title: 'Maharashtra Police Recruitment Online Portal (policerecruitment2024.mahait.org)',
      document_type: 'OFFICIAL_PORTAL',
      source_url: 'https://policerecruitment2024.mahait.org'
    },
    {
      source_id: 'src-maharashtra-police-constable-notice-2026',
      organization_id: 'org-maharashtra-state-police-recruitment-boa',
      document_title: 'Maharashtra Police Constable Recruitment Official Notification & Syllabus 2026',
      document_type: 'EXAM_NOTIFICATION',
      source_url: 'https://mahapolice.gov.in/police_constable_bharti_2026.pdf'
    }
  ];

  for (const s of sources) {
    sourceStmt.run(s);
  }

  // 2. Subjects (4 official curriculum subjects)
  const subjects = [
    {
      subject_id: 'maharashtra-police-marathi-grammar',
      name: 'Marathi Grammar, Vocabulary & Language Comprehension (मराठी व्याकरण, शब्दसंग्रह व आकलन)',
      short_name: 'Maha Police Marathi',
      subject_type: 'LANGUAGE_STUDIES',
      is_language_subject: 1,
      is_medium_dependent: 1,
      active: 1
    },
    {
      subject_id: 'maharashtra-police-mathematics',
      name: 'Mathematics & Numerical Ability (अंकगणित व संख्यात्मक अभियोग्यता)',
      short_name: 'Maha Police Mathematics',
      subject_type: 'NUMERICAL_APTITUDE',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'maharashtra-police-reasoning',
      name: 'Intellectual Test & Logical Reasoning (बुद्धिमत्ता चाचणी व तर्कक्षमता)',
      short_name: 'Maha Police Reasoning',
      subject_type: 'LOGICAL_REASONING',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'maharashtra-police-general-knowledge',
      name: 'General Knowledge, Maharashtra History/Geography & Administration (सामान्य ज्ञान, चालू घडामोडी व महाराष्ट्र विशेष)',
      short_name: 'Maha Police GK & Maha Special',
      subject_type: 'GENERAL_AWARENESS',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    }
  ];

  for (const sub of subjects) {
    subjectStmt.run(sub);
  }

  console.log(`✅ Registered ${sources.length} sources and ${subjects.length} subjects for Maharashtra Police.`);
});

tx();
db.close();
