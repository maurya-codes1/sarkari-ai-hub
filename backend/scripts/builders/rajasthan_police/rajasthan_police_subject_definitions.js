const path = require('path');
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, '../../../db/sarkari_core.db');
const db = new Database(dbPath);

console.log('Registering Rajasthan Police Official Sources and 4 Subjects in SQLite database...');

const sourceStmt = db.prepare(`
  INSERT OR REPLACE INTO official_sources (
    source_id, organization_id, document_title, document_type, source_url,
    publication_date, effective_date, applicable_year, source_hash, retrieved_at,
    verified_at, verification_status, verification_notes, source_hierarchy_level,
    issuing_authority, applicable_exam_id, applicable_version_id, freshness_status,
    conflict_status
  ) VALUES (
    @source_id, @organization_id, @document_title, @document_type, @source_url,
    '2026-01-25', '2026-03-01', '2026', 'OFFICIAL_RAJASTHAN_POLICE_SRC_HASH', CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP, 'VERIFIED', 'Official Rajasthan Police Constable Recruitment Standing Order & Syllabus',
    'PRIMARY_STATUTORY', 'Rajasthan Police Recruitment Board, Jaipur', 'rajasthan-police',
    'ver-rajasthan-police-2026', 'FRESH', 'RESOLVED_NO_CONFLICT'
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
      source_id: 'src-rajasthan-police-portal',
      organization_id: 'org-rajasthan-police-recruitment-board-jaipu',
      document_title: 'Rajasthan Police Official Headquarters Portal (police.rajasthan.gov.in)',
      document_type: 'OFFICIAL_PORTAL',
      source_url: 'https://police.rajasthan.gov.in'
    },
    {
      source_id: 'src-rajasthan-police-constable-notice-2026',
      organization_id: 'org-rajasthan-police-recruitment-board-jaipu',
      document_title: 'Rajasthan Police Constable Recruitment Standing Order & Notification 2026',
      document_type: 'EXAM_NOTIFICATION',
      source_url: 'https://police.rajasthan.gov.in/recruitment_constable_2026.pdf'
    },
    {
      source_id: 'src-rajasthan-police-si-rpsc-notice-2026',
      organization_id: 'org-rajasthan-police-recruitment-board-jaipu',
      document_title: 'Rajasthan Police Sub-Inspector (SI / Platoon Commander) Notification 2026',
      document_type: 'EXAM_NOTIFICATION',
      source_url: 'https://rpsc.rajasthan.gov.in'
    }
  ];

  for (const s of sources) {
    sourceStmt.run(s);
  }

  // 2. Subjects (4 official curriculum subjects)
  const subjects = [
    {
      subject_id: 'rajasthan-police-reasoning-computer',
      name: 'Reasoning Ability, Logic & Computer Fundamentals (तार्किक योग्यता एवं कंप्यूटर का सामान्य ज्ञान)',
      short_name: 'Raj Police Reasoning & Computer',
      subject_type: 'LOGICAL_REASONING',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'rajasthan-police-general-knowledge-science',
      name: 'General Knowledge, General Science & Current Affairs (सामान्य ज्ञान, सामान्य विज्ञान एवं समसामयिकी)',
      short_name: 'Raj Police GK & Science',
      subject_type: 'GENERAL_AWARENESS',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'rajasthan-police-rajasthan-special',
      name: 'Rajasthan History, Art, Culture, Geography & Economy (राजस्थान का इतिहास, कला, संस्कृति, भूगोल एवं अर्थव्यवस्था)',
      short_name: 'Raj Police Rajasthan GK',
      subject_type: 'STATE_SPECIAL_GK',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'rajasthan-police-women-child-crime-law',
      name: 'Crimes Against Women & Children, Legal Provisions & Protection Acts (महिला एवं बाल अपराध, सुरक्षा नियम व कानूनी प्रावधान)',
      short_name: 'Raj Police Crime Law',
      subject_type: 'LEGAL_STUDIES',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    }
  ];

  for (const sub of subjects) {
    subjectStmt.run(sub);
  }

  console.log(`✅ Registered ${sources.length} sources and ${subjects.length} subjects for Rajasthan Police.`);
});

tx();
db.close();
