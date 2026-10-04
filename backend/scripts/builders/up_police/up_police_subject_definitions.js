const path = require('path');
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, '../../../db/sarkari_core.db');
const db = new Database(dbPath);

console.log('Registering UP Police Official Sources and 4 Subjects in SQLite database...');

const sourceStmt = db.prepare(`
  INSERT OR REPLACE INTO official_sources (
    source_id, organization_id, document_title, document_type, source_url,
    publication_date, effective_date, applicable_year, source_hash, retrieved_at,
    verified_at, verification_status, verification_notes, source_hierarchy_level,
    issuing_authority, applicable_exam_id, applicable_version_id, freshness_status,
    conflict_status
  ) VALUES (
    @source_id, @organization_id, @document_title, @document_type, @source_url,
    '2026-01-10', '2026-03-01', '2026', 'OFFICIAL_UP_POLICE_SRC_HASH', CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP, 'VERIFIED', 'Official UPPRPB Constable & Sub-Inspector Curricula & Exam Schemes',
    'PRIMARY_STATUTORY', 'Uttar Pradesh Police Recruitment & Promotion Board (UPPRPB)', 'up-police-constable',
    'ver-up-police-constable-2026', 'FRESH', 'RESOLVED_NO_CONFLICT'
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
      source_id: 'src-upprpb-portal',
      organization_id: 'org-uttar-pradesh-police-recruitment-promoti',
      document_title: 'UPPRPB Official Recruitment Portal (uppbpb.gov.in)',
      document_type: 'OFFICIAL_PORTAL',
      source_url: 'https://uppbpb.gov.in'
    },
    {
      source_id: 'src-upprpb-constable-notice-2026',
      organization_id: 'org-uttar-pradesh-police-recruitment-promoti',
      document_title: 'UP Police Constable 60,244 Bharti Notification & Written Exam Syllabus 2026',
      document_type: 'EXAM_NOTIFICATION',
      source_url: 'https://uppbpb.gov.in'
    },
    {
      source_id: 'src-upprpb-si-notice-2026',
      organization_id: 'org-uttar-pradesh-police-recruitment-promoti',
      document_title: 'UP Police Sub Inspector (Civil Police) Recruitment Notification 2026',
      document_type: 'EXAM_NOTIFICATION',
      source_url: 'https://uppbpb.gov.in'
    }
  ];

  for (const s of sources) {
    sourceStmt.run(s);
  }

  // 2. Subjects (4 official curriculum subjects)
  const subjects = [
    {
      subject_id: 'up-police-general-knowledge',
      name: 'General Knowledge & UP Special GK (सामान्य ज्ञान एवं उत्तर प्रदेश सामान्य अध्ययन)',
      short_name: 'UP Police GK',
      subject_type: 'GENERAL_AWARENESS',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'up-police-general-hindi',
      name: 'General Hindi & Literature (सामान्य हिन्दी एवं हिन्दी साहित्य)',
      short_name: 'UP Police Hindi',
      subject_type: 'HINDI_LANGUAGE',
      is_language_subject: 1,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'up-police-numerical-mental-ability',
      name: 'Numerical & Mental Ability (संख्यात्मक एवं मानसिक योग्यता)',
      short_name: 'UP Police Maths',
      subject_type: 'QUANTITATIVE_APTITUDE',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'up-police-mental-aptitude-reasoning',
      name: 'Mental Aptitude, IQ & Reasoning Ability (मानसिक अभिरुचि, बुद्धिलब्धि एवं तार्किक क्षमता)',
      short_name: 'UP Police Reasoning',
      subject_type: 'LOGICAL_REASONING',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    }
  ];

  for (const sub of subjects) {
    subjectStmt.run(sub);
  }

  console.log(`✅ Registered ${sources.length} sources and ${subjects.length} subjects for UP Police.`);
});

tx();
db.close();
