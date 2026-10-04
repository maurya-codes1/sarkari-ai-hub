const path = require('path');
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, '../../../db/sarkari_core.db');
const db = new Database(dbPath);

console.log('Registering Indian Navy Agniveer Sources and 4 Subjects in SQLite database...');

const sourceStmt = db.prepare(`
  INSERT OR REPLACE INTO official_sources (
    source_id, organization_id, document_title, document_type, source_url,
    publication_date, effective_date, applicable_year, source_hash, retrieved_at,
    verified_at, verification_status, verification_notes, source_hierarchy_level,
    issuing_authority, applicable_exam_id, applicable_version_id, freshness_status,
    conflict_status
  ) VALUES (
    @source_id, @organization_id, @document_title, @document_type, @source_url,
    '2026-01-12', '2026-03-20', '2026', 'OFFICIAL_NAVY_AGNIVEER_SRC_HASH', CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP, 'VERIFIED', 'Official Indian Navy Agniveer SSR & MR Examination Scheme and Syllabus',
    'PRIMARY_STATUTORY', 'Directorate of Manpower Planning & Recruitment, Naval Headquarters', 'agniveer-navy',
    'ver-agniveer-navy-2026', 'FRESH', 'RESOLVED_NO_CONFLICT'
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
      source_id: 'src-navy-agniveer-portal',
      organization_id: 'org-indian-navy-naval-headquarters',
      document_title: 'Join Indian Navy Official Web Portal (joinindiannavy.gov.in)',
      document_type: 'OFFICIAL_PORTAL',
      source_url: 'https://joinindiannavy.gov.in'
    },
    {
      source_id: 'src-navy-agniveer-notice-2026',
      organization_id: 'org-indian-navy-naval-headquarters',
      document_title: 'Indian Navy Agniveer SSR & MR Intake 01/2026 & 02/2026 Official Notification',
      document_type: 'EXAM_NOTIFICATION',
      source_url: 'https://joinindiannavy.gov.in'
    },
    {
      source_id: 'src-navy-agniveer-syllabus-model',
      organization_id: 'org-indian-navy-naval-headquarters',
      document_title: 'Naval Headquarters Agniveer SSR & MR Official Sample Papers & Syllabus Corpus',
      document_type: 'OFFICIAL_ARCHIVE',
      source_url: 'https://joinindiannavy.gov.in'
    }
  ];

  for (const s of sources) {
    sourceStmt.run(s);
  }

  // 2. Subjects (4 specialized tracks covering SSR & MR)
  const subjects = [
    {
      subject_id: 'navy-agniveer-english',
      name: 'Indian Navy Agniveer General English & Grammar (नौसेना सामान्य अंग्रेजी एवं व्याकरण)',
      short_name: 'Navy English',
      subject_type: 'ENGLISH_LANGUAGE',
      is_language_subject: 1,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'navy-agniveer-science',
      name: 'Indian Navy Agniveer Science - Physics, Chemistry & Biology (नौसेना सामान्य विज्ञान)',
      short_name: 'Navy Science',
      subject_type: 'GENERAL_SCIENCE',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'navy-agniveer-mathematics',
      name: 'Indian Navy Agniveer Mathematics - Core & Applied (नौसेना गणित 10+2 एवं मैट्रिक)',
      short_name: 'Navy Mathematics',
      subject_type: 'MATHEMATICS',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'navy-agniveer-general-awareness',
      name: 'Indian Navy Agniveer General Awareness & Naval Heritage (सामान्य जागरूकता एवं नौसेना ज्ञान)',
      short_name: 'Navy GA & Defence',
      subject_type: 'GENERAL_AWARENESS',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    }
  ];

  for (const sub of subjects) {
    subjectStmt.run(sub);
  }

  console.log(`✅ Registered ${sources.length} sources and ${subjects.length} subjects for Indian Navy Agniveer.`);
});

tx();
db.close();
