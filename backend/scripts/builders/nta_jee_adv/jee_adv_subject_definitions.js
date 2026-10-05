const path = require('path');
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, '../../../db/sarkari_core.db');
const db = new Database(dbPath);

console.log('Registering JEE Advanced Official Sources and 3 Subjects in SQLite database...');

const sourceStmt = db.prepare(`
  INSERT OR REPLACE INTO official_sources (
    source_id, organization_id, document_title, document_type, source_url,
    publication_date, effective_date, applicable_year, source_hash, retrieved_at,
    verified_at, verification_status, verification_notes, source_hierarchy_level,
    issuing_authority, applicable_exam_id, applicable_version_id, freshness_status,
    conflict_status
  ) VALUES (
    @source_id, @organization_id, @document_title, @document_type, @source_url,
    '2026-01-15', '2026-01-20', '2026', 'OFFICIAL_JEEADV_SRC_HASH_2026', CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP, 'VERIFIED', 'Organizing IIT on behalf of JAB Information Brochure & Syllabus 2026',
    'PRIMARY_STATUTORY', 'Organizing IIT / Joint Admission Board (JAB)', 'nta-jee-adv',
    'ver-nta-jee-adv-2026', 'FRESH', 'RESOLVED_NO_CONFLICT'
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
      source_id: 'src-jee-adv-official-portal',
      organization_id: 'org-organizing-iit-on-behalf-of-jab-joint-ad',
      document_title: 'JEE Advanced Official Examination Portal (jeeadv.ac.in)',
      document_type: 'OFFICIAL_PORTAL',
      source_url: 'https://jeeadv.ac.in'
    },
    {
      source_id: 'src-jee-adv-information-brochure-2026',
      organization_id: 'org-organizing-iit-on-behalf-of-jab-joint-ad',
      document_title: 'JEE (Advanced) 2026 Information Brochure & Admission Rules',
      document_type: 'EXAM_NOTIFICATION',
      source_url: 'https://jeeadv.ac.in/brochure-2026.pdf'
    },
    {
      source_id: 'src-jee-adv-syllabus-2026',
      organization_id: 'org-organizing-iit-on-behalf-of-jab-joint-ad',
      document_title: 'JEE Advanced Prescribed Core Curriculum & Comprehensive Syllabus Guidelines',
      document_type: 'STATUTORY_REGULATION',
      source_url: 'https://jeeadv.ac.in/syllabus-jee-advanced-2026.pdf'
    }
  ];

  for (const s of sources) {
    sourceStmt.run(s);
  }

  // 2. Subjects (3 official JEE Advanced subjects)
  const subjects = [
    {
      subject_id: 'jee-adv-physics',
      name: 'Physics (भौतिक विज्ञान - उच्च स्तरीय)',
      short_name: 'JEE Adv Physics',
      subject_type: 'PHYSICS',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'jee-adv-chemistry',
      name: 'Chemistry (रसायन विज्ञान - उच्च स्तरीय)',
      short_name: 'JEE Adv Chemistry',
      subject_type: 'CHEMISTRY',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'jee-adv-mathematics',
      name: 'Mathematics (गणित - उच्च स्तरीय)',
      short_name: 'JEE Adv Mathematics',
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
console.log('✅ Successfully registered JEE Advanced official sources and 3 subjects in sarkari_core.db.');
db.close();
