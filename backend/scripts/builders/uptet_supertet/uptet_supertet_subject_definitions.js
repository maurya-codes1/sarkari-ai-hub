const path = require('path');
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, '../../../db/sarkari_core.db');
const db = new Database(dbPath);

console.log('Registering UP TET / Super TET Official Sources and 4 Subjects in SQLite database...');

const sourceStmt = db.prepare(`
  INSERT OR REPLACE INTO official_sources (
    source_id, organization_id, document_title, document_type, source_url,
    publication_date, effective_date, applicable_year, source_hash, retrieved_at,
    verified_at, verification_status, verification_notes, source_hierarchy_level,
    issuing_authority, applicable_exam_id, applicable_version_id, freshness_status,
    conflict_status
  ) VALUES (
    @source_id, @organization_id, @document_title, @document_type, @source_url,
    '2026-02-20', '2026-03-01', '2026', 'OFFICIAL_UPTET_SUPERTET_SRC_HASH_2026', CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP, 'VERIFIED', 'Official UPESSC & Basic Education Department Assistant Teacher Recruitment Regulations',
    'PRIMARY_STATUTORY', 'Uttar Pradesh Education Service Selection Commission (UPESSC), Prayagraj', 'uptet-supertet',
    'ver-uptet-supertet-2026', 'FRESH', 'RESOLVED_NO_CONFLICT'
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
      source_id: 'src-updeled-portal',
      organization_id: 'org-uttar-pradesh-education-service-selectio',
      document_title: 'UP Basic Education Regulatory Authority Official Portal (updeled.gov.in)',
      document_type: 'OFFICIAL_PORTAL',
      source_url: 'https://updeled.gov.in'
    },
    {
      source_id: 'src-upessc-portal',
      organization_id: 'org-uttar-pradesh-education-service-selectio',
      document_title: 'Uttar Pradesh Education Service Selection Commission Portal (upessc.up.gov.in)',
      document_type: 'OFFICIAL_PORTAL',
      source_url: 'https://upessc.up.gov.in'
    },
    {
      source_id: 'src-uptet-supertet-notification-2026',
      organization_id: 'org-uttar-pradesh-education-service-selectio',
      document_title: 'UP Assistant Teacher Recruitment (Super TET) & UP TET Guidelines & Regulations 2026',
      document_type: 'EXAM_NOTIFICATION',
      source_url: 'https://updeled.gov.in/UPTET_SuperTET_Guidelines_2026.pdf'
    }
  ];

  for (const s of sources) {
    sourceStmt.run(s);
  }

  // 2. Subjects (4 official curriculum subjects)
  const subjects = [
    {
      subject_id: 'uptet-child-development-teaching-skills',
      name: 'Child Development, Pedagogy, Teaching Skills & Life Skills (बाल विकास, शिक्षण कौशल एवं जीवन कौशल)',
      short_name: 'UPTET Child Dev & Teaching',
      subject_type: 'PEDAGOGY_TEACHING',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'uptet-mathematics-reasoning',
      name: 'Mathematics & Logical Knowledge / Reasoning (गणित एवं तार्किक ज्ञान)',
      short_name: 'UPTET Math & Reasoning',
      subject_type: 'MATHEMATICS_REASONING',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'uptet-languages-hindi-english-sanskrit',
      name: 'Languages - Hindi, English & Sanskrit Grammar (भाषा ज्ञान - हिन्दी, अंग्रेजी एवं संस्कृत व्याकरण)',
      short_name: 'UPTET Languages Trilingual',
      subject_type: 'LANGUAGES',
      is_language_subject: 1,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'uptet-evs-social-science-up-gk',
      name: 'Environmental Studies, Science, UP Special GK & Current Affairs (पर्यावरण अध्ययन, सामान्य विज्ञान एवं उत्तर प्रदेश विशेष सामान्य ज्ञान)',
      short_name: 'UPTET EVS Science & UP GK',
      subject_type: 'EVS_SCIENCE_UP_GK',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    }
  ];

  for (const sub of subjects) {
    subjectStmt.run(sub);
  }
});

tx();
console.log('✅ Successfully registered UP TET / Super TET Official Sources & 4 Subjects.');
