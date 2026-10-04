const path = require('path');
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, '../../../db/sarkari_core.db');
const db = new Database(dbPath);

console.log('Registering Indian Air Force Agniveer Vayu Sources and 5 Subjects in SQLite database...');

const sourceStmt = db.prepare(`
  INSERT OR REPLACE INTO official_sources (
    source_id, organization_id, document_title, document_type, source_url,
    publication_date, effective_date, applicable_year, source_hash, retrieved_at,
    verified_at, verification_status, verification_notes, source_hierarchy_level,
    issuing_authority, applicable_exam_id, applicable_version_id, freshness_status,
    conflict_status
  ) VALUES (
    @source_id, @organization_id, @document_title, @document_type, @source_url,
    '2026-01-10', '2026-03-15', '2026', 'OFFICIAL_IAF_AGNIVEER_SRC_HASH', CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP, 'VERIFIED', 'Official Indian Air Force Agniveer Vayu Examination Scheme and Syllabus',
    'PRIMARY_STATUTORY', 'Central Airmen Selection Board (CASB), Indian Air Force', 'agniveer-airforce',
    'ver-agniveer-airforce-2026', 'FRESH', 'RESOLVED_NO_CONFLICT'
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
      source_id: 'src-iaf-agniveer-portal',
      organization_id: 'org-indian-air-force-central-airmen-selectio',
      document_title: 'Indian Air Force Agnipath Vayu Official C-DAC Web Portal (agnipathvayu.cdac.in)',
      document_type: 'OFFICIAL_PORTAL',
      source_url: 'https://agnipathvayu.cdac.in'
    },
    {
      source_id: 'src-iaf-agniveer-notice-2026',
      organization_id: 'org-indian-air-force-central-airmen-selectio',
      document_title: 'Indian Air Force Agniveer Vayu Intake 01/2026 & 02/2026 Official Notification',
      document_type: 'EXAM_NOTIFICATION',
      source_url: 'https://agnipathvayu.cdac.in'
    },
    {
      source_id: 'src-iaf-agniveer-syllabus-model',
      organization_id: 'org-indian-air-force-central-airmen-selectio',
      document_title: 'CASB Agniveer Vayu Official Model Question Papers & Detailed Syllabus',
      document_type: 'OFFICIAL_ARCHIVE',
      source_url: 'https://agnipathvayu.cdac.in'
    }
  ];

  for (const s of sources) {
    sourceStmt.run(s);
  }

  // 2. Subjects (5 specialized tracks covering Science & Other than Science)
  const subjects = [
    {
      subject_id: 'iaf-agniveer-english',
      name: 'Indian Air Force Agniveer English Language & Grammar (अंग्रेजी भाषा एवं व्याकरण)',
      short_name: 'IAF English',
      subject_type: 'ENGLISH_LANGUAGE',
      is_language_subject: 1,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'iaf-agniveer-physics',
      name: 'Indian Air Force Agniveer Vayu Physics 10+2 (भारतीय वायु सेना भौतिक विज्ञान 10+2)',
      short_name: 'IAF Physics',
      subject_type: 'PHYSICS',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'iaf-agniveer-mathematics',
      name: 'Indian Air Force Agniveer Vayu Mathematics 10+2 (भारतीय वायु सेना गणित 10+2)',
      short_name: 'IAF Mathematics',
      subject_type: 'MATHEMATICS',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'iaf-agniveer-raga-reasoning',
      name: 'Indian Air Force Agniveer RAGA - Reasoning & Mental Ability (तर्कशक्ति एवं मानसिक क्षमता)',
      short_name: 'IAF RAGA Reasoning',
      subject_type: 'LOGICAL_REASONING',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'iaf-agniveer-raga-general-awareness',
      name: 'Indian Air Force Agniveer RAGA - General Awareness & Defence GK (सामान्य जागरूकता एवं रक्षा ज्ञान)',
      short_name: 'IAF RAGA GA',
      subject_type: 'GENERAL_AWARENESS',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    }
  ];

  for (const sub of subjects) {
    subjectStmt.run(sub);
  }

  console.log(`✅ Registered ${sources.length} sources and ${subjects.length} subjects for IAF Agniveer Vayu.`);
});

tx();
db.close();
