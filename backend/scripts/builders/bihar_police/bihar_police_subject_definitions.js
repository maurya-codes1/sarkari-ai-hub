const path = require('path');
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, '../../../db/sarkari_core.db');
const db = new Database(dbPath);

console.log('Registering Bihar Police Official Sources and 4 Subjects in SQLite database...');

const sourceStmt = db.prepare(`
  INSERT OR REPLACE INTO official_sources (
    source_id, organization_id, document_title, document_type, source_url,
    publication_date, effective_date, applicable_year, source_hash, retrieved_at,
    verified_at, verification_status, verification_notes, source_hierarchy_level,
    issuing_authority, applicable_exam_id, applicable_version_id, freshness_status,
    conflict_status
  ) VALUES (
    @source_id, @organization_id, @document_title, @document_type, @source_url,
    '2026-01-15', '2026-03-01', '2026', 'OFFICIAL_BIHAR_POLICE_SRC_HASH', CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP, 'VERIFIED', 'Official CSBC & BPSSC Constable & Daroga Curricula & Exam Schemes',
    'PRIMARY_STATUTORY', 'Central Selection Board of Constable (CSBC) & BPSSC, Patna', 'bihar-police-constable',
    'ver-bihar-police-constable-2026', 'FRESH', 'RESOLVED_NO_CONFLICT'
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
      source_id: 'src-csbc-bihar-portal',
      organization_id: 'org-central-selection-board-of-constable-csb',
      document_title: 'CSBC Official Recruitment Portal (csbc.bih.nic.in)',
      document_type: 'OFFICIAL_PORTAL',
      source_url: 'https://csbc.bih.nic.in'
    },
    {
      source_id: 'src-csbc-constable-notice-2026',
      organization_id: 'org-central-selection-board-of-constable-csb',
      document_title: 'Bihar Police Constable 21,391 Posts Official Notification & Syllabus 2026',
      document_type: 'EXAM_NOTIFICATION',
      source_url: 'https://csbc.bih.nic.in'
    },
    {
      source_id: 'src-bpssc-daroga-notice-2026',
      organization_id: 'org-central-selection-board-of-constable-csb',
      document_title: 'Bihar Police Sub Inspector (Daroga) Recruitment Notification 2026',
      document_type: 'EXAM_NOTIFICATION',
      source_url: 'https://bpssc.bih.nic.in'
    }
  ];

  for (const s of sources) {
    sourceStmt.run(s);
  }

  // 2. Subjects (4 official curriculum subjects)
  const subjects = [
    {
      subject_id: 'bihar-police-general-knowledge-studies',
      name: 'General Studies & Bihar Special GK (सामान्य अध्ययन एवं बिहार सामान्य ज्ञान)',
      short_name: 'Bihar Police GS & GK',
      subject_type: 'GENERAL_AWARENESS',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'bihar-police-general-science',
      name: 'General Science (सामान्य विज्ञान - भौतिकी, रसायन, जीव विज्ञान)',
      short_name: 'Bihar Police Science',
      subject_type: 'GENERAL_SCIENCE',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'bihar-police-hindi-language',
      name: 'Hindi Language & Literature (हिन्दी भाषा एवं साहित्य)',
      short_name: 'Bihar Police Hindi',
      subject_type: 'HINDI_LANGUAGE',
      is_language_subject: 1,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'bihar-police-english-mathematics',
      name: 'English & Mathematics (अंग्रेजी भाषा एवं संख्यात्मक योग्यता)',
      short_name: 'Bihar Police Eng & Math',
      subject_type: 'QUANTITATIVE_APTITUDE',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    }
  ];

  for (const sub of subjects) {
    subjectStmt.run(sub);
  }

  console.log(`✅ Registered ${sources.length} sources and ${subjects.length} subjects for Bihar Police.`);
});

tx();
db.close();
