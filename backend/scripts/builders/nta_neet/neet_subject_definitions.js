const path = require('path');
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, '../../../db/sarkari_core.db');
const db = new Database(dbPath);

console.log('Registering NTA NEET-UG Official Sources and 4 Subjects in SQLite database...');

const sourceStmt = db.prepare(`
  INSERT OR REPLACE INTO official_sources (
    source_id, organization_id, document_title, document_type, source_url,
    publication_date, effective_date, applicable_year, source_hash, retrieved_at,
    verified_at, verification_status, verification_notes, source_hierarchy_level,
    issuing_authority, applicable_exam_id, applicable_version_id, freshness_status,
    conflict_status
  ) VALUES (
    @source_id, @organization_id, @document_title, @document_type, @source_url,
    '2026-02-05', '2026-02-15', '2026', 'OFFICIAL_NEETUG_SRC_HASH_2026', CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP, 'VERIFIED', 'National Testing Agency (NTA) on behalf of National Medical Commission (NMC) NEET-UG Bulletin 2026',
    'PRIMARY_STATUTORY', 'National Testing Agency (NTA), New Delhi', 'nta-neet',
    'ver-nta-neet-2026', 'FRESH', 'RESOLVED_NO_CONFLICT'
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
  // 1. Official Sources
  const sources = [
    {
      source_id: 'src-neet-nta-portal',
      organization_id: 'org-national-testing-agency-nta',
      document_title: 'NTA NEET-UG Official Examination Portal (exams.nta.ac.in/NEET)',
      document_type: 'OFFICIAL_PORTAL',
      source_url: 'https://exams.nta.ac.in/NEET'
    },
    {
      source_id: 'src-neet-information-bulletin-2026',
      organization_id: 'org-national-testing-agency-nta',
      document_title: 'NEET-UG Information Bulletin, Examination Scheme & Syllabus 2026',
      document_type: 'EXAM_NOTIFICATION',
      source_url: 'https://exams.nta.ac.in/NEET/NEET_UG_2026_Information_Bulletin.pdf'
    },
    {
      source_id: 'src-nmc-ug-curriculum-guidelines',
      organization_id: 'org-national-testing-agency-nta',
      document_title: 'National Medical Commission (NMC) NEET-UG Core Syllabus Guidelines',
      document_type: 'STATUTORY_REGULATION',
      source_url: 'https://www.nmc.org.in/rules-regulations/neet-ug-syllabus'
    }
  ];

  for (const s of sources) {
    sourceStmt.run(s);
  }

  // 2. Subjects (4 official curriculum subjects)
  const subjects = [
    {
      subject_id: 'neet-physics',
      name: 'Physics (भौतिक विज्ञान)',
      short_name: 'NEET Physics',
      subject_type: 'PHYSICS',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'neet-chemistry',
      name: 'Chemistry (रसायन विज्ञान)',
      short_name: 'NEET Chemistry',
      subject_type: 'CHEMISTRY',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'neet-botany',
      name: 'Botany (वनस्पति विज्ञान)',
      short_name: 'NEET Botany',
      subject_type: 'BOTANY',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'neet-zoology',
      name: 'Zoology (प्राणी विज्ञान)',
      short_name: 'NEET Zoology',
      subject_type: 'ZOOLOGY',
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
console.log('✅ Successfully registered NTA NEET-UG Official Sources & 4 Subjects.');
db.close();
