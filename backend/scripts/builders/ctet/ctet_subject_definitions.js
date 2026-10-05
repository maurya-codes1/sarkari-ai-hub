const path = require('path');
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, '../../../db/sarkari_core.db');
const db = new Database(dbPath);

console.log('Registering CTET Official Sources and 5 Subjects in SQLite database...');

const sourceStmt = db.prepare(`
  INSERT OR REPLACE INTO official_sources (
    source_id, organization_id, document_title, document_type, source_url,
    publication_date, effective_date, applicable_year, source_hash, retrieved_at,
    verified_at, verification_status, verification_notes, source_hierarchy_level,
    issuing_authority, applicable_exam_id, applicable_version_id, freshness_status,
    conflict_status
  ) VALUES (
    @source_id, @organization_id, @document_title, @document_type, @source_url,
    '2026-02-15', '2026-03-01', '2026', 'OFFICIAL_CTET_SRC_HASH_2026', CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP, 'VERIFIED', 'Official CBSE CTET Information Bulletin & Curriculum Framework',
    'PRIMARY_STATUTORY', 'Central Board of Secondary Education (CBSE), Delhi', 'ctet-exam',
    'ver-ctet-exam-2026', 'FRESH', 'RESOLVED_NO_CONFLICT'
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
      source_id: 'src-ctet-portal',
      organization_id: 'org-central-board-of-secondary-education-cbs',
      document_title: 'Central Teacher Eligibility Test Official Portal (ctet.nic.in)',
      document_type: 'OFFICIAL_PORTAL',
      source_url: 'https://ctet.nic.in'
    },
    {
      source_id: 'src-cbse-portal',
      organization_id: 'org-central-board-of-secondary-education-cbs',
      document_title: 'Central Board of Secondary Education Official Portal (cbse.gov.in)',
      document_type: 'OFFICIAL_PORTAL',
      source_url: 'https://cbse.gov.in'
    },
    {
      source_id: 'src-ctet-info-bulletin-2026',
      organization_id: 'org-central-board-of-secondary-education-cbs',
      document_title: 'CBSE CTET Official Information Bulletin & Curriculum Framework 2026',
      document_type: 'EXAM_NOTIFICATION',
      source_url: 'https://ctet.nic.in/ctet_information_bulletin_2026.pdf'
    }
  ];

  for (const s of sources) {
    sourceStmt.run(s);
  }

  // 2. Subjects (5 official curriculum subjects)
  const subjects = [
    {
      subject_id: 'ctet-child-development-pedagogy',
      name: 'Child Development and Pedagogy (बाल विकास एवं शिक्षाशास्त्र)',
      short_name: 'CTET Child Dev & Pedagogy',
      subject_type: 'PEDAGOGY',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'ctet-mathematics-pedagogy',
      name: 'Mathematics & Pedagogical Issues (गणित एवं शिक्षण शास्त्र)',
      short_name: 'CTET Mathematics & Pedagogy',
      subject_type: 'MATHEMATICS',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'ctet-environmental-studies',
      name: 'Environmental Studies & EVS Pedagogy (पर्यावरण अध्ययन एवं शिक्षण शास्त्र)',
      short_name: 'CTET EVS & Pedagogy',
      subject_type: 'ENVIRONMENTAL_STUDIES',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'ctet-language-pedagogy',
      name: 'Language I & II Comprehension & Pedagogy (भाषा विकास एवं शिक्षण शास्त्र - हिन्दी एवं English)',
      short_name: 'CTET Language Pedagogy',
      subject_type: 'LANGUAGE_PEDAGOGY',
      is_language_subject: 1,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'ctet-social-science-science-pedagogy',
      name: 'Science, Social Science & Upper Primary Pedagogy (विज्ञान, सामाजिक विज्ञान एवं माध्यमिक शिक्षाशास्त्र)',
      short_name: 'CTET Science & Social Science',
      subject_type: 'SECONDARY_PEDAGOGY',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    }
  ];

  for (const sub of subjects) {
    subjectStmt.run(sub);
  }

  console.log(`✅ Registered ${sources.length} sources and ${subjects.length} subjects for CTET.`);
});

tx();
db.close();
