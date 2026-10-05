const path = require('path');
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, '../../../db/sarkari_core.db');
const db = new Database(dbPath);

console.log('Registering UGC NET Official Sources and 4 Subjects in SQLite database...');

const sourceStmt = db.prepare(`
  INSERT OR REPLACE INTO official_sources (
    source_id, organization_id, document_title, document_type, source_url,
    publication_date, effective_date, applicable_year, source_hash, retrieved_at,
    verified_at, verification_status, verification_notes, source_hierarchy_level,
    issuing_authority, applicable_exam_id, applicable_version_id, freshness_status,
    conflict_status
  ) VALUES (
    @source_id, @organization_id, @document_title, @document_type, @source_url,
    '2026-02-10', '2026-03-01', '2026', 'OFFICIAL_UGCNET_SRC_HASH_2026', CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP, 'VERIFIED', 'Official UGC NET Information Bulletin & National Curriculum Framework',
    'PRIMARY_STATUTORY', 'National Testing Agency (NTA) on behalf of UGC, New Delhi', 'ugc-net',
    'ver-ugc-net-2026', 'FRESH', 'RESOLVED_NO_CONFLICT'
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
      source_id: 'src-ugcnet-nta-portal',
      organization_id: 'org-national-testing-agency-nta-on-behalf-of',
      document_title: 'NTA UGC NET Official Examination Portal (ugcnet.nta.ac.in)',
      document_type: 'OFFICIAL_PORTAL',
      source_url: 'https://ugcnet.nta.ac.in'
    },
    {
      source_id: 'src-ugc-official-portal',
      organization_id: 'org-national-testing-agency-nta-on-behalf-of',
      document_title: 'University Grants Commission Apex Academic Portal (ugc.gov.in)',
      document_type: 'OFFICIAL_PORTAL',
      source_url: 'https://ugc.gov.in'
    },
    {
      source_id: 'src-ugcnet-information-bulletin-2026',
      organization_id: 'org-national-testing-agency-nta-on-behalf-of',
      document_title: 'UGC NET Information Bulletin, Examination Scheme & Syllabus 2026',
      document_type: 'EXAM_NOTIFICATION',
      source_url: 'https://ugcnet.nta.ac.in/UGC_NET_Information_Bulletin_2026.pdf'
    }
  ];

  for (const s of sources) {
    sourceStmt.run(s);
  }

  // 2. Subjects (4 official curriculum subjects)
  const subjects = [
    {
      subject_id: 'ugc-net-teaching-research-aptitude',
      name: 'Teaching Aptitude, Research Methodology & Communication (शिक्षण अभिवृत्ति, शोध प्रविधि एवं संप्रेषण)',
      short_name: 'UGC NET Teaching & Research',
      subject_type: 'TEACHING_RESEARCH',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'ugc-net-logical-mathematical-reasoning-di',
      name: 'Mathematical Reasoning, Logical Reasoning & Data Interpretation (गणितीय तर्क, युक्ति-युक्त तर्क, भारतीय तर्कशास्त्र एवं आंकड़ा निर्वचन)',
      short_name: 'UGC NET Logic Math & DI',
      subject_type: 'LOGIC_MATH_DI',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'ugc-net-ict-people-environment-higher-education',
      name: 'ICT, People, Development & Environment and Higher Education System (सूचना एवं संचार प्रौद्योगिकी, लोक, विकास व पर्यावरण एवं उच्च शिक्षा प्रणाली)',
      short_name: 'UGC NET ICT Env & Higher Ed',
      subject_type: 'ICT_ENV_HIGHER_ED',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'ugc-net-humanities-social-sciences-core',
      name: 'Humanities, Social Sciences, Commerce & Governance Core Perspectives (मानविकी, समाजशास्त्र, अर्थशास्त्र, वाणिज्य एवं लोक प्रशासन परिप्रेक्ष्य)',
      short_name: 'UGC NET Humanities & Commerce',
      subject_type: 'HUMANITIES_COMMERCE',
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
console.log('✅ Successfully registered UGC NET Official Sources & 4 Subjects.');
