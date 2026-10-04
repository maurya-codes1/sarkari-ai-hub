const path = require('path');
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, '../../../db/sarkari_core.db');
const db = new Database(dbPath);

console.log('Registering UPSC Civil Services Examination (CSE) Sources and 8 Subjects in SQLite database...');

const sourceStmt = db.prepare(`
  INSERT OR REPLACE INTO official_sources (
    source_id, organization_id, document_title, document_type, source_url,
    publication_date, effective_date, applicable_year, source_hash, retrieved_at,
    verified_at, verification_status, verification_notes, source_hierarchy_level,
    issuing_authority, applicable_exam_id, applicable_version_id, freshness_status,
    conflict_status
  ) VALUES (
    @source_id, @organization_id, @document_title, @document_type, @source_url,
    '2026-02-01', '2026-05-24', '2026', 'OFFICIAL_UPSC_CSE_SRC_HASH', CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP, 'VERIFIED', 'Official Union Public Service Commission Civil Services Examination Regulations and Syllabus',
    'PRIMARY_STATUTORY', 'Union Public Service Commission (Dholpur House)', 'upsc-cse',
    'ver-upsc-cse-2026', 'FRESH', 'RESOLVED_NO_CONFLICT'
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
      source_id: 'src-upsc-cse-portal',
      organization_id: 'org-union-public-service-commission-upsc',
      document_title: 'Union Public Service Commission Official Examination Web Portal (UPSC Online)',
      document_type: 'OFFICIAL_PORTAL',
      source_url: 'https://upsc.gov.in'
    },
    {
      source_id: 'src-upsc-cse-notice-2026',
      organization_id: 'org-union-public-service-commission-upsc',
      document_title: 'UPSC Civil Services Examination Gazette Notification and Examination Scheme 2026',
      document_type: 'EXAM_NOTIFICATION',
      source_url: 'https://upsc.gov.in'
    },
    {
      source_id: 'src-upsc-cse-pyq-corpus',
      organization_id: 'org-union-public-service-commission-upsc',
      document_title: 'UPSC Civil Services Preliminary Historical Examination Papers Corpus (2014-2025)',
      document_type: 'OFFICIAL_ARCHIVE',
      source_url: 'https://upsc.gov.in'
    }
  ];

  for (const s of sources) {
    sourceStmt.run(s);
  }

  // 2. Subjects (8 specialized subjects across GS Paper 1 and CSAT Paper 2)
  const subjects = [
    {
      subject_id: 'upsc-cse-gs1-polity',
      name: 'UPSC CSE GS-1 Indian Polity, Constitution & Governance (भारतीय राजव्यवस्था एवं संविधान)',
      short_name: 'CSE Polity',
      subject_type: 'POLITY_GOVERNANCE',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'upsc-cse-gs1-economy',
      name: 'UPSC CSE GS-1 Indian Economy & Sustainable Development (भारतीय अर्थव्यवस्था एवं विकास)',
      short_name: 'CSE Economy',
      subject_type: 'ECONOMICS',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'upsc-cse-gs1-history-culture',
      name: 'UPSC CSE GS-1 History of India, National Movement & Art & Culture (भारतीय इतिहास एवं कला-संस्कृति)',
      short_name: 'CSE History',
      subject_type: 'HISTORY_CULTURE',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'upsc-cse-gs1-geography',
      name: 'UPSC CSE GS-1 Indian & World Geography & Agriculture (भारत एवं विश्व का भूगोल)',
      short_name: 'CSE Geography',
      subject_type: 'GEOGRAPHY',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'upsc-cse-gs1-environment-ecology',
      name: 'UPSC CSE GS-1 Environment, Ecology & Biodiversity (पर्यावरण, पारिस्थितिकी एवं जैव विविधता)',
      short_name: 'CSE Environment',
      subject_type: 'ENVIRONMENT_ECOLOGY',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'upsc-cse-gs1-science-tech',
      name: 'UPSC CSE GS-1 Science & Technology and Applied Innovations (विज्ञान एवं प्रौद्योगिकी)',
      short_name: 'CSE Sci & Tech',
      subject_type: 'SCIENCE_TECHNOLOGY',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'upsc-cse-csat-comprehension',
      name: 'UPSC CSE CSAT Reading Comprehension & Critical Reasoning (बोधगम्यता एवं तार्किक निर्णय)',
      short_name: 'CSAT Comprehension',
      subject_type: 'READING_COMPREHENSION',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'upsc-cse-csat-quant-reasoning',
      name: 'UPSC CSE CSAT Basic Numeracy, Math & Analytical Reasoning (संख्यात्मक अभियोग्यता एवं तर्कशक्ति)',
      short_name: 'CSAT Quant & Reasoning',
      subject_type: 'QUANTITATIVE_REASONING',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    }
  ];

  for (const sub of subjects) {
    subjectStmt.run(sub);
  }

  console.log(`✅ Registered ${sources.length} sources and ${subjects.length} subjects for UPSC CSE.`);
});

tx();
conn = null;
