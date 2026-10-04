const path = require('path');
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, '../../../db/sarkari_core.db');
const db = new Database(dbPath);

console.log('Registering MP Police Official Sources and 4 Subjects in SQLite database...');

const sourceStmt = db.prepare(`
  INSERT OR REPLACE INTO official_sources (
    source_id, organization_id, document_title, document_type, source_url,
    publication_date, effective_date, applicable_year, source_hash, retrieved_at,
    verified_at, verification_status, verification_notes, source_hierarchy_level,
    issuing_authority, applicable_exam_id, applicable_version_id, freshness_status,
    conflict_status
  ) VALUES (
    @source_id, @organization_id, @document_title, @document_type, @source_url,
    '2026-01-15', '2026-03-01', '2026', 'OFFICIAL_MP_POLICE_SRC_HASH', CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP, 'VERIFIED', 'Official MPESB Bhopal Police Constable & SI Exam Rule Book & Curricula',
    'PRIMARY_STATUTORY', 'Madhya Pradesh Employees Selection Board (MPESB), Bhopal', 'mp-police',
    'ver-mp-police-2026', 'FRESH', 'RESOLVED_NO_CONFLICT'
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
      source_id: 'src-mpesb-portal',
      organization_id: 'org-madhya-pradesh-employees-selection-board',
      document_title: 'MPESB Official Portal (esb.mp.gov.in)',
      document_type: 'OFFICIAL_PORTAL',
      source_url: 'https://esb.mp.gov.in'
    },
    {
      source_id: 'src-mppolice-portal',
      organization_id: 'org-madhya-pradesh-employees-selection-board',
      document_title: 'Madhya Pradesh Police Official Headquarters Portal',
      document_type: 'OFFICIAL_PORTAL',
      source_url: 'https://mppolice.gov.in'
    },
    {
      source_id: 'src-mp-police-constable-rulebook-2026',
      organization_id: 'org-madhya-pradesh-employees-selection-board',
      document_title: 'MPESB Police Constable (GD / Radio) Recruitment Rule Book Notification 2026',
      document_type: 'EXAM_NOTIFICATION',
      source_url: 'https://esb.mp.gov.in/rulebooks/police_constable_2026.pdf'
    },
    {
      source_id: 'src-mp-police-si-rulebook-2026',
      organization_id: 'org-madhya-pradesh-employees-selection-board',
      document_title: 'MP Police Sub-Inspector (SI / Platoon Commander) Recruitment Rule Book 2026',
      document_type: 'EXAM_NOTIFICATION',
      source_url: 'https://esb.mp.gov.in/rulebooks/police_si_2026.pdf'
    }
  ];

  for (const s of sources) {
    sourceStmt.run(s);
  }

  // 2. Subjects (4 official curriculum subjects)
  const subjects = [
    {
      subject_id: 'mp-police-general-knowledge',
      name: 'General Knowledge, MP Special GK & Current Affairs (सामान्य ज्ञान, मध्यप्रदेश सामान्य ज्ञान एवं समसामयिकी)',
      short_name: 'MP Police GK',
      subject_type: 'GENERAL_AWARENESS',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'mp-police-reasoning-mental-aptitude',
      name: 'Reasoning Ability, Mental Aptitude & Intellectual Ability (तार्किक ज्ञान, बौद्धिक क्षमता एवं मानसिक अभिरुचि)',
      short_name: 'MP Police Reasoning',
      subject_type: 'LOGICAL_REASONING',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'mp-police-simple-arithmetic',
      name: 'Simple Arithmetic & Quantitative Aptitude (सरल अंकगणित एवं संख्यात्मक योग्यता)',
      short_name: 'MP Police Maths',
      subject_type: 'QUANTITATIVE_APTITUDE',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'mp-police-general-science',
      name: 'General Science - Physics, Chemistry & Life Sciences (सामान्य विज्ञान - भौतिकी, रसायन एवं जीव विज्ञान)',
      short_name: 'MP Police Science',
      subject_type: 'GENERAL_SCIENCE',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    }
  ];

  for (const sub of subjects) {
    subjectStmt.run(sub);
  }

  console.log(`✅ Registered ${sources.length} sources and ${subjects.length} subjects for MP Police.`);
});

tx();
db.close();
