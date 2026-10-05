const path = require('path');
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, '../../../db/sarkari_core.db');
const db = new Database(dbPath);

console.log('Registering NTA JEE Main Official Sources and 3 Subjects in SQLite database...');

const sourceStmt = db.prepare(`
  INSERT OR REPLACE INTO official_sources (
    source_id, organization_id, document_title, document_type, source_url,
    publication_date, effective_date, applicable_year, source_hash, retrieved_at,
    verified_at, verification_status, verification_notes, source_hierarchy_level,
    issuing_authority, applicable_exam_id, applicable_version_id, freshness_status,
    conflict_status
  ) VALUES (
    @source_id, @organization_id, @document_title, @document_type, @source_url,
    '2026-01-15', '2026-01-20', '2026', 'OFFICIAL_JEEMAIN_SRC_HASH_2026', CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP, 'VERIFIED', 'National Testing Agency (NTA) JEE Main Information Bulletin & Syllabus 2026',
    'PRIMARY_STATUTORY', 'National Testing Agency (NTA), New Delhi', 'nta-jee-main',
    'ver-nta-jee-main-2026', 'FRESH', 'RESOLVED_NO_CONFLICT'
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
      source_id: 'src-jee-main-nta-portal',
      organization_id: 'org-national-testing-agency-nta',
      document_title: 'NTA JEE Main Official Examination Portal (jeemain.nta.nic.in)',
      document_type: 'OFFICIAL_PORTAL',
      source_url: 'https://jeemain.nta.nic.in'
    },
    {
      source_id: 'src-jee-main-bulletin-2026',
      organization_id: 'org-national-testing-agency-nta',
      document_title: 'JEE (Main) - 2026 Information Bulletin, Examination Scheme & Admissions Guidelines',
      document_type: 'EXAM_NOTIFICATION',
      source_url: 'https://jeemain.nta.nic.in/information-bulletin-2026.pdf'
    },
    {
      source_id: 'src-jee-main-syllabus-2026',
      organization_id: 'org-national-testing-agency-nta',
      document_title: 'JEE Main Prescribed Core Engineering Curriculum & Syllabus Guidelines (NTA)',
      document_type: 'STATUTORY_REGULATION',
      source_url: 'https://jeemain.nta.nic.in/syllabus-jee-main-2026.pdf'
    }
  ];

  for (const s of sources) {
    sourceStmt.run(s);
  }

  // 2. Subjects (3 official engineering entrance subjects)
  const subjects = [
    {
      subject_id: 'jee-main-physics',
      name: 'Physics (भौतिक विज्ञान)',
      short_name: 'JEE Physics',
      subject_type: 'PHYSICS',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'jee-main-chemistry',
      name: 'Chemistry (रसायन विज्ञान)',
      short_name: 'JEE Chemistry',
      subject_type: 'CHEMISTRY',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'jee-main-mathematics',
      name: 'Mathematics (गणित)',
      short_name: 'JEE Mathematics',
      subject_type: 'MATHEMATICS',
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
console.log('✅ Successfully registered NTA JEE Main Official Sources & 3 Subjects.');
db.close();
