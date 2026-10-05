const path = require('path');
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, '../../../db/sarkari_core.db');
const db = new Database(dbPath);

console.log('Registering Haryana Police Official Sources and 4 Subjects in SQLite database...');

const sourceStmt = db.prepare(`
  INSERT OR REPLACE INTO official_sources (
    source_id, organization_id, document_title, document_type, source_url,
    publication_date, effective_date, applicable_year, source_hash, retrieved_at,
    verified_at, verification_status, verification_notes, source_hierarchy_level,
    issuing_authority, applicable_exam_id, applicable_version_id, freshness_status,
    conflict_status
  ) VALUES (
    @source_id, @organization_id, @document_title, @document_type, @source_url,
    '2026-02-15', '2026-03-01', '2026', 'OFFICIAL_HARYANA_POLICE_SRC_HASH', CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP, 'VERIFIED', 'Official HSSC Haryana Police Constable Standing Order & Syllabus',
    'PRIMARY_STATUTORY', 'Haryana Staff Selection Commission (HSSC), Panchkula', 'haryana-police',
    'ver-haryana-police-2026', 'FRESH', 'RESOLVED_NO_CONFLICT'
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
      source_id: 'src-haryana-police-portal',
      organization_id: 'org-haryana-staff-selection-commission-hssc-',
      document_title: 'Haryana Staff Selection Commission Official Portal (hssc.gov.in)',
      document_type: 'OFFICIAL_PORTAL',
      source_url: 'https://hssc.gov.in'
    },
    {
      source_id: 'src-haryana-police-dept-portal',
      organization_id: 'org-haryana-staff-selection-commission-hssc-',
      document_title: 'Haryana Police Department Headquarters Portal (haryanapolice.gov.in)',
      document_type: 'OFFICIAL_PORTAL',
      source_url: 'https://haryanapolice.gov.in'
    },
    {
      source_id: 'src-haryana-police-constable-notice-2026',
      organization_id: 'org-haryana-staff-selection-commission-hssc-',
      document_title: 'HSSC Haryana Police Male & Female Constable Recruitment Notification & Syllabus 2026',
      document_type: 'EXAM_NOTIFICATION',
      source_url: 'https://hssc.gov.in/hssc_police_constable_2026.pdf'
    }
  ];

  for (const s of sources) {
    sourceStmt.run(s);
  }

  // 2. Subjects (4 official curriculum subjects)
  const subjects = [
    {
      subject_id: 'haryana-police-haryana-gk',
      name: 'Haryana General Knowledge, History, Geography, Culture & Administration (हरियाणा सामान्य ज्ञान, इतिहास एवं संस्कृति)',
      short_name: 'Haryana Police Haryana GK',
      subject_type: 'STATE_SPECIAL_GK',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'haryana-police-agriculture-animal-husbandry',
      name: 'Agriculture, Animal Husbandry & General Science (कृषि, पशुपालन एवं सामान्य विज्ञान)',
      short_name: 'Haryana Police Agri & Animal Husbandry',
      subject_type: 'APPLIED_SCIENCE',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'haryana-police-reasoning-maths',
      name: 'Reasoning Ability, Mental Logic & Numerical Aptitude (तर्कशक्ति एवं अंकगणित)',
      short_name: 'Haryana Police Reasoning & Maths',
      subject_type: 'APTITUDE_AND_LOGIC',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'haryana-police-computer-general-studies',
      name: 'Computer Knowledge, General Studies & Police Administration (कंप्यूटर ज्ञान, सामान्य अध्ययन एवं पुलिस प्रशासन)',
      short_name: 'Haryana Police Computer & GS',
      subject_type: 'GENERAL_AWARENESS',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    }
  ];

  for (const sub of subjects) {
    subjectStmt.run(sub);
  }

  console.log(`✅ Registered ${sources.length} sources and ${subjects.length} subjects for Haryana Police.`);
});

tx();
db.close();
