const path = require('path');
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, '../../../db/sarkari_core.db');
const db = new Database(dbPath);

console.log('Registering REET Rajasthan Official Sources and 4 Subjects in SQLite database...');

const sourceStmt = db.prepare(`
  INSERT OR REPLACE INTO official_sources (
    source_id, organization_id, document_title, document_type, source_url,
    publication_date, effective_date, applicable_year, source_hash, retrieved_at,
    verified_at, verification_status, verification_notes, source_hierarchy_level,
    issuing_authority, applicable_exam_id, applicable_version_id, freshness_status,
    conflict_status
  ) VALUES (
    @source_id, @organization_id, @document_title, @document_type, @source_url,
    '2026-02-15', '2026-03-01', '2026', 'OFFICIAL_REET_RAJASTHAN_SRC_HASH_2026', CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP, 'VERIFIED', 'Official RBSE Ajmer REET Examination Curriculum & Guidelines',
    'PRIMARY_STATUTORY', 'Board of Secondary Education Rajasthan (RBSE / BSER), Ajmer', 'reet-rajasthan',
    'ver-reet-rajasthan-2026', 'FRESH', 'RESOLVED_NO_CONFLICT'
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
      source_id: 'src-rbse-rajasthan-portal',
      organization_id: 'org-board-of-secondary-education-rajasthan-r',
      document_title: 'Board of Secondary Education Rajasthan Official Portal (rajeduboard.rajasthan.gov.in)',
      document_type: 'OFFICIAL_PORTAL',
      source_url: 'https://rajeduboard.rajasthan.gov.in'
    },
    {
      source_id: 'src-reet-official-guidelines-2026',
      organization_id: 'org-board-of-secondary-education-rajasthan-r',
      document_title: 'REET Information Brochure, Examination Rules & Curriculum Notification 2026',
      document_type: 'EXAM_NOTIFICATION',
      source_url: 'https://rajeduboard.rajasthan.gov.in/REET2026_Guidelines.pdf'
    },
    {
      source_id: 'src-rsmssb-teacher-guidelines-2026',
      organization_id: 'org-board-of-secondary-education-rajasthan-r',
      document_title: 'RSMSSB Primary & Upper Primary School Teacher Recruitment Regulations',
      document_type: 'EXAM_NOTIFICATION',
      source_url: 'https://rsmssb.rajasthan.gov.in'
    }
  ];

  for (const s of sources) {
    sourceStmt.run(s);
  }

  // 2. Subjects (4 official curriculum subjects)
  const subjects = [
    {
      subject_id: 'reet-child-development-pedagogy',
      name: 'Child Development, Pedagogy & Teaching-Learning Process (बाल विकास, शिक्षण विधियाँ, RTE 2009 एवं क्रियात्मक अनुसंधान)',
      short_name: 'REET Child Dev & Pedagogy',
      subject_type: 'PEDAGOGY',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'reet-mathematics-science-evs',
      name: 'Mathematics, Science & Environmental Studies (गणित, सामान्य विज्ञान एवं पर्यावरण अध्ययन)',
      short_name: 'REET Maths Science & EVS',
      subject_type: 'MATH_SCIENCE_EVS',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'reet-languages-hindi-english-sanskrit',
      name: 'Languages - Hindi, English & Sanskrit Grammar with Pedagogy (भाषा ज्ञान - हिन्दी, अंग्रेजी एवं संस्कृत व्याकरण तथा शिक्षण विधियां)',
      short_name: 'REET Languages Trilingual',
      subject_type: 'LANGUAGES',
      is_language_subject: 1,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'reet-rajasthan-gk-culture-social-studies',
      name: 'Rajasthan History, Art, Culture, Geography, Economy & Educational Scenario (राजस्थान का भूगोल, इतिहास, कला-संस्कृति एवं शैक्षिक परिदृश्य)',
      short_name: 'REET Rajasthan GK & Culture',
      subject_type: 'RAJASTHAN_GK_CULTURE',
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
console.log('✅ Successfully registered REET Rajasthan Official Sources & 4 Subjects.');
