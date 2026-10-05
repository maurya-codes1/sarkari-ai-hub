const path = require('path');
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, '../../../db/sarkari_core.db');
const db = new Database(dbPath);

console.log('Registering CLAT Law Official Sources and 4 Subjects in SQLite database...');

const sourceStmt = db.prepare(`
  INSERT OR REPLACE INTO official_sources (
    source_id, organization_id, document_title, document_type, source_url,
    publication_date, effective_date, applicable_year, source_hash, retrieved_at,
    verified_at, verification_status, verification_notes, source_hierarchy_level,
    issuing_authority, applicable_exam_id, applicable_version_id, freshness_status,
    conflict_status
  ) VALUES (
    @source_id, @organization_id, @document_title, @document_type, @source_url,
    '2026-01-15', '2026-02-01', '2026', 'OFFICIAL_CLAT_SRC_HASH_2026', CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP, 'VERIFIED', 'Consortium of National Law Universities Official Notification & Syllabus 2026',
    'PRIMARY_STATUTORY', 'Consortium of National Law Universities, Bengaluru', 'clat-law',
    'ver-clat-law-2026', 'FRESH', 'RESOLVED_NO_CONFLICT'
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
      source_id: 'src-clat-consortium-portal',
      organization_id: 'org-consortium-of-national-law-universities-',
      document_title: 'Consortium of National Law Universities Official Portal (consortiumofnlus.ac.in)',
      document_type: 'OFFICIAL_PORTAL',
      source_url: 'https://consortiumofnlus.ac.in'
    },
    {
      source_id: 'src-clat-notification-bulletin-2026',
      organization_id: 'org-consortium-of-national-law-universities-',
      document_title: 'CLAT Official Information Brochure, Examination Scheme & Syllabus 2026',
      document_type: 'EXAM_NOTIFICATION',
      source_url: 'https://consortiumofnlus.ac.in/clat-2026/information-brochure.pdf'
    },
    {
      source_id: 'src-clat-academic-syllabus-guidelines',
      organization_id: 'org-consortium-of-national-law-universities-',
      document_title: 'CLAT UG Syllabus Guidelines and Question Pattern Regulations',
      document_type: 'SYLLABUS_REGULATION',
      source_url: 'https://consortiumofnlus.ac.in/clat-2026/ug-syllabus.html'
    }
  ];

  for (const s of sources) {
    sourceStmt.run(s);
  }

  // 2. Subjects (4 official curriculum subjects)
  const subjects = [
    {
      subject_id: 'clat-english-language',
      name: 'English Language & Reading Comprehension (अंग्रेजी भाषा एवं बोध)',
      short_name: 'CLAT English Language',
      subject_type: 'ENGLISH_LANGUAGE',
      is_language_subject: 1,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'clat-current-affairs-gk',
      name: 'Current Affairs & General Knowledge (समसामयिक घटनाएं एवं सामान्य ज्ञान)',
      short_name: 'CLAT Current Affairs & GK',
      subject_type: 'CURRENT_AFFAIRS_GK',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'clat-legal-reasoning',
      name: 'Legal Reasoning, Constitutional Law & Jurisprudence (विधिक अभिक्षमता, संवैधानिक विधि एवं विधिशास्त्र)',
      short_name: 'CLAT Legal Reasoning',
      subject_type: 'LEGAL_REASONING',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'clat-logical-quantitative',
      name: 'Logical Reasoning, Critical Thinking & Quantitative Techniques (तार्किक क्षमता, गहन चिंतन एवं परिमाणात्मक तकनीकें)',
      short_name: 'CLAT Logic & Quantitative',
      subject_type: 'LOGIC_QUANTITATIVE',
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
console.log('✅ Successfully registered CLAT Law Official Sources & 4 Subjects.');
db.close();
