const path = require('path');
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, '../../../db/sarkari_core.db');
const db = new Database(dbPath);

console.log('Registering IBPS & SBI Banking Sources and 4 Subjects in SQLite database...');

const sourceStmt = db.prepare(`
  INSERT OR REPLACE INTO official_sources (
    source_id, organization_id, document_title, document_type, source_url,
    publication_date, effective_date, applicable_year, source_hash, retrieved_at,
    verified_at, verification_status, verification_notes, source_hierarchy_level,
    issuing_authority, applicable_exam_id, applicable_version_id, freshness_status,
    conflict_status
  ) VALUES (
    @source_id, @organization_id, @document_title, @document_type, @source_url,
    '2026-01-05', '2026-04-01', '2026', 'OFFICIAL_IBPS_BANKING_SRC_HASH', CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP, 'VERIFIED', 'Official IBPS CRP & SBI PO/Clerk Examination Schemes and Curricula',
    'PRIMARY_STATUTORY', 'Institute of Banking Personnel Selection & State Bank of India', 'ibps-po-clerk',
    'ver-ibps-po-clerk-2026', 'FRESH', 'RESOLVED_NO_CONFLICT'
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
      source_id: 'src-ibps-banking-portal',
      organization_id: 'org-institute-of-banking-personnel-selection',
      document_title: 'IBPS Official Common Recruitment Portal (ibps.in)',
      document_type: 'OFFICIAL_PORTAL',
      source_url: 'https://www.ibps.in'
    },
    {
      source_id: 'src-ibps-po-crp-notice-2026',
      organization_id: 'org-institute-of-banking-personnel-selection',
      document_title: 'IBPS CRP PO/MT & Clerical Cadre Official Recruitment Notification 2026',
      document_type: 'EXAM_NOTIFICATION',
      source_url: 'https://www.ibps.in'
    },
    {
      source_id: 'src-sbi-po-clerk-notice-2026',
      organization_id: 'org-institute-of-banking-personnel-selection',
      document_title: 'SBI Probationary Officer & Junior Associates Official Notification 2026',
      document_type: 'EXAM_NOTIFICATION',
      source_url: 'https://sbi.co.in/careers'
    }
  ];

  for (const s of sources) {
    sourceStmt.run(s);
  }

  // 2. Subjects (4 specialized tracks covering Banking Prelims & Mains)
  const subjects = [
    {
      subject_id: 'ibps-banking-quantitative-aptitude',
      name: 'Banking Quantitative Aptitude & Data Interpretation (बैंकिंग संख्यात्मक अभियोग्यता एवं डीआई)',
      short_name: 'Banking Quant & DI',
      subject_type: 'QUANTITATIVE_APTITUDE',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'ibps-banking-reasoning-ability',
      name: 'Banking Reasoning Ability & Puzzles (बैंकिंग तर्कशक्ति एवं पहेलियाँ)',
      short_name: 'Banking Reasoning',
      subject_type: 'LOGICAL_REASONING',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'ibps-banking-english-language',
      name: 'Banking English Language & Verbal Ability (बैंकिंग अंग्रेजी भाषा एवं व्याकरण)',
      short_name: 'Banking English',
      subject_type: 'ENGLISH_LANGUAGE',
      is_language_subject: 1,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'ibps-banking-general-financial-awareness',
      name: 'Banking, Financial Awareness & Current Economy (बैंकिंग, वित्तीय जागरूकता एवं अर्थव्यवस्था)',
      short_name: 'Banking & Financial GA',
      subject_type: 'GENERAL_AWARENESS',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    }
  ];

  for (const sub of subjects) {
    subjectStmt.run(sub);
  }

  console.log(`✅ Registered ${sources.length} sources and ${subjects.length} subjects for IBPS & SBI Banking.`);
});

tx();
db.close();
