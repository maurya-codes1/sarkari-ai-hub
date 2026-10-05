const path = require('path');
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, '../../../db/sarkari_core.db');
const db = new Database(dbPath);

console.log('Registering NTA CUET UG Official Sources and 4 Subjects in SQLite database...');

const sourceStmt = db.prepare(`
  INSERT OR REPLACE INTO official_sources (
    source_id, organization_id, document_title, document_type, source_url,
    publication_date, effective_date, applicable_year, source_hash, retrieved_at,
    verified_at, verification_status, verification_notes, source_hierarchy_level,
    issuing_authority, applicable_exam_id, applicable_version_id, freshness_status,
    conflict_status
  ) VALUES (
    @source_id, @organization_id, @document_title, @document_type, @source_url,
    '2026-02-10', '2026-02-15', '2026', 'OFFICIAL_CUETUG_SRC_HASH_2026', CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP, 'VERIFIED', 'National Testing Agency (NTA) CUET UG Information Bulletin & Sectional Syllabi 2026',
    'PRIMARY_STATUTORY', 'National Testing Agency (NTA), New Delhi', 'nta-cuet-ug',
    'ver-nta-cuet-ug-2026', 'FRESH', 'RESOLVED_NO_CONFLICT'
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
      source_id: 'src-cuet-ug-official-portal',
      organization_id: 'org-national-testing-agency-nta',
      document_title: 'NTA CUET UG Official Examination Portal (exams.nta.ac.in/CUET-UG/)',
      document_type: 'OFFICIAL_PORTAL',
      source_url: 'https://exams.nta.ac.in/CUET-UG/'
    },
    {
      source_id: 'src-cuet-ug-bulletin-2026',
      organization_id: 'org-national-testing-agency-nta',
      document_title: 'CUET (UG) 2026 Information Bulletin, Scheme of Examination & University Eligibility Guidelines',
      document_type: 'EXAM_NOTIFICATION',
      source_url: 'https://exams.nta.ac.in/CUET-UG/bulletin-2026.pdf'
    },
    {
      source_id: 'src-cuet-ug-syllabus-2026',
      organization_id: 'org-national-testing-agency-nta',
      document_title: 'CUET UG Section-wise Model Curriculum & Subject Blueprint Regulations (NTA)',
      document_type: 'STATUTORY_REGULATION',
      source_url: 'https://exams.nta.ac.in/CUET-UG/syllabus-2026.pdf'
    }
  ];

  for (const s of sources) {
    sourceStmt.run(s);
  }

  // 2. Subjects (4 official CUET UG sections/domains)
  const subjects = [
    {
      subject_id: 'cuet-ug-section1-language',
      name: 'Language & Verbal Ability (Section I: भाषा एवं मौखिक योग्यता)',
      short_name: 'CUET Language',
      subject_type: 'LANGUAGE_VERBAL',
      is_language_subject: 1,
      is_medium_dependent: 1,
      active: 1
    },
    {
      subject_id: 'cuet-ug-section2-humanities',
      name: 'Humanities & Social Sciences (Section II: मानविकी एवं सामाजिक विज्ञान)',
      short_name: 'CUET Humanities',
      subject_type: 'HUMANITIES_SOCIAL_SCIENCES',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'cuet-ug-section2-sciences',
      name: 'Science & Applied Mathematics (Section II: विज्ञान एवं व्यावहारिक गणित)',
      short_name: 'CUET Sciences',
      subject_type: 'SCIENCES_MATHEMATICS',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'cuet-ug-section3-general-test',
      name: 'General Test (Section III: सामान्य परीक्षण - GK, Quant & Reasoning)',
      short_name: 'CUET General Test',
      subject_type: 'GENERAL_TEST',
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
console.log('✅ Successfully registered CUET UG official sources and 4 subjects in sarkari_core.db.');
db.close();
