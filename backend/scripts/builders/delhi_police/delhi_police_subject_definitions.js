const path = require('path');
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, '../../../db/sarkari_core.db');
const db = new Database(dbPath);

console.log('Registering Delhi Police Official Sources and 4 Subjects in SQLite database...');

const sourceStmt = db.prepare(`
  INSERT OR REPLACE INTO official_sources (
    source_id, organization_id, document_title, document_type, source_url,
    publication_date, effective_date, applicable_year, source_hash, retrieved_at,
    verified_at, verification_status, verification_notes, source_hierarchy_level,
    issuing_authority, applicable_exam_id, applicable_version_id, freshness_status,
    conflict_status
  ) VALUES (
    @source_id, @organization_id, @document_title, @document_type, @source_url,
    '2026-01-20', '2026-03-01', '2026', 'OFFICIAL_DELHI_POLICE_SRC_HASH', CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP, 'VERIFIED', 'Official SSC & Delhi Police Constable (Executive) Exam Scheme & Curricula',
    'PRIMARY_STATUTORY', 'Staff Selection Commission (SSC) on behalf of Delhi Police', 'delhi-police',
    'ver-delhi-police-2026', 'FRESH', 'RESOLVED_NO_CONFLICT'
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
      source_id: 'src-delhi-police-portal',
      organization_id: 'org-staff-selection-commission-ssc-on-behalf',
      document_title: 'Delhi Police Official Portal (delhipolice.gov.in)',
      document_type: 'OFFICIAL_PORTAL',
      source_url: 'https://delhipolice.gov.in'
    },
    {
      source_id: 'src-ssc-delhi-police-notice-2026',
      organization_id: 'org-staff-selection-commission-ssc-on-behalf',
      document_title: 'SSC Delhi Police Constable (Executive) Official Recruitment Notification 2026',
      document_type: 'EXAM_NOTIFICATION',
      source_url: 'https://ssc.gov.in'
    },
    {
      source_id: 'src-delhi-police-hc-notice-2026',
      organization_id: 'org-staff-selection-commission-ssc-on-behalf',
      document_title: 'Delhi Police Head Constable (Ministerial / AWO-TPO) Notification 2026',
      document_type: 'EXAM_NOTIFICATION',
      source_url: 'https://delhipolice.gov.in'
    }
  ];

  for (const s of sources) {
    sourceStmt.run(s);
  }

  // 2. Subjects (4 official curriculum subjects)
  const subjects = [
    {
      subject_id: 'delhi-police-general-knowledge',
      name: 'General Knowledge, Current Affairs & Delhi Special (सामान्य ज्ञान, समसामयिकी एवं दिल्ली अध्ययन)',
      short_name: 'Delhi Police GK',
      subject_type: 'GENERAL_AWARENESS',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'delhi-police-reasoning',
      name: 'Reasoning Ability & Mental Aptitude (तर्कशक्ति एवं मानसिक क्षमता)',
      short_name: 'Delhi Police Reasoning',
      subject_type: 'LOGICAL_REASONING',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'delhi-police-numerical-ability',
      name: 'Numerical Ability & Quantitative Aptitude (संख्यात्मक योग्यता)',
      short_name: 'Delhi Police Maths',
      subject_type: 'QUANTITATIVE_APTITUDE',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'delhi-police-computer-fundamentals',
      name: 'Computer Fundamentals, MS Office & Internet (कंप्यूटर ज्ञान, एमएस वर्ड, एक्सेल एवं इंटरनेट)',
      short_name: 'Delhi Police Computer',
      subject_type: 'COMPUTER_KNOWLEDGE',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    }
  ];

  for (const sub of subjects) {
    subjectStmt.run(sub);
  }

  console.log(`✅ Registered ${sources.length} sources and ${subjects.length} subjects for Delhi Police.`);
});

tx();
db.close();
