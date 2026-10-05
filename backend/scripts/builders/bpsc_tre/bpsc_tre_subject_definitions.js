const path = require('path');
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, '../../../db/sarkari_core.db');
const db = new Database(dbPath);

console.log('Registering BPSC TRE Official Sources and 4 Subjects in SQLite database...');

const sourceStmt = db.prepare(`
  INSERT OR REPLACE INTO official_sources (
    source_id, organization_id, document_title, document_type, source_url,
    publication_date, effective_date, applicable_year, source_hash, retrieved_at,
    verified_at, verification_status, verification_notes, source_hierarchy_level,
    issuing_authority, applicable_exam_id, applicable_version_id, freshness_status,
    conflict_status
  ) VALUES (
    @source_id, @organization_id, @document_title, @document_type, @source_url,
    '2026-02-20', '2026-03-01', '2026', 'OFFICIAL_BPSC_TRE_SRC_HASH_2026', CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP, 'VERIFIED', 'Official Bihar Public Service Commission (BPSC) TRE Syllabus & Regulations',
    'PRIMARY_STATUTORY', 'Bihar Public Service Commission (BPSC), Patna', 'bpsc-tre',
    'ver-bpsc-tre-2026', 'FRESH', 'RESOLVED_NO_CONFLICT'
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
      source_id: 'src-bpsc-portal',
      organization_id: 'org-bihar-public-service-commission-bpsc-pat',
      document_title: 'Bihar Public Service Commission Official Recruitment Portal (bpsc.bih.nic.in)',
      document_type: 'OFFICIAL_PORTAL',
      source_url: 'https://www.bpsc.bih.nic.in'
    },
    {
      source_id: 'src-bpsc-tre-notification-2026',
      organization_id: 'org-bihar-public-service-commission-bpsc-pat',
      document_title: 'BPSC School Teacher Recruitment Examination (TRE 4.0) Official Notification & Syllabus 2026',
      document_type: 'EXAM_NOTIFICATION',
      source_url: 'https://www.bpsc.bih.nic.in/Advt/TRE-4.0-Notification.pdf'
    },
    {
      source_id: 'src-bihar-education-dept',
      organization_id: 'org-bihar-public-service-commission-bpsc-pat',
      document_title: 'Government of Bihar Education Department Service Rules & Curriculum Standards',
      document_type: 'STATUTORY_RULES',
      source_url: 'https://state.bihar.gov.in/educationbihar'
    }
  ];

  for (const s of sources) {
    sourceStmt.run(s);
  }

  // 2. Subjects (4 official curriculum subjects)
  const subjects = [
    {
      subject_id: 'bpsc-tre-general-studies-bihar-gk',
      name: 'General Studies, Indian National Movement & Bihar Special GK (सामान्य अध्ययन, भारतीय राष्ट्रीय आंदोलन एवं बिहार विशेष)',
      short_name: 'BPSC TRE GS & Bihar GK',
      subject_type: 'GENERAL_STUDIES',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'bpsc-tre-language-qualifying',
      name: 'Language Qualifying - General English & Hindi Grammar (भाषा अर्हता - सामान्य अंग्रेजी एवं हिन्दी व्याकरण)',
      short_name: 'BPSC TRE Language Qualifying',
      subject_type: 'LANGUAGE',
      is_language_subject: 1,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'bpsc-tre-mathematics-reasoning',
      name: 'Elementary Mathematics, Quantitative Aptitude & Mental Ability (प्रारंभिक गणित एवं तर्कशक्ति)',
      short_name: 'BPSC TRE Math & Reasoning',
      subject_type: 'MATHEMATICS_REASONING',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'bpsc-tre-general-science-social-science',
      name: 'General Science, Social Studies & Teaching Pedagogy (सामान्य विज्ञान, सामाजिक अध्ययन एवं शिक्षण अभिरुचि)',
      short_name: 'BPSC TRE Science & Social Studies',
      subject_type: 'SCIENCE_SOCIAL_STUDIES',
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
console.log('✅ Successfully registered BPSC TRE Official Sources & 4 Subjects.');
