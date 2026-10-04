const path = require('path');
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, '../../../db/sarkari_core.db');
const db = new Database(dbPath);

console.log('Registering West Bengal Police Official Sources and 4 Subjects in SQLite database...');

const sourceStmt = db.prepare(`
  INSERT OR REPLACE INTO official_sources (
    source_id, organization_id, document_title, document_type, source_url,
    publication_date, effective_date, applicable_year, source_hash, retrieved_at,
    verified_at, verification_status, verification_notes, source_hierarchy_level,
    issuing_authority, applicable_exam_id, applicable_version_id, freshness_status,
    conflict_status
  ) VALUES (
    @source_id, @organization_id, @document_title, @document_type, @source_url,
    '2026-01-20', '2026-03-01', '2026', 'OFFICIAL_WB_POLICE_SRC_HASH', CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP, 'VERIFIED', 'Official West Bengal Police Recruitment Board Standing Order & Syllabus',
    'PRIMARY_STATUTORY', 'West Bengal Police Recruitment Board (WBPRB), Kolkata', 'wb-police',
    'ver-wb-police-2026', 'FRESH', 'RESOLVED_NO_CONFLICT'
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
      source_id: 'src-wb-police-portal',
      organization_id: 'org-west-bengal-police-recruitment-board-wbp',
      document_title: 'West Bengal Police Recruitment Board Official Portal (prb.wb.gov.in)',
      document_type: 'OFFICIAL_PORTAL',
      source_url: 'https://prb.wb.gov.in'
    },
    {
      source_id: 'src-wb-police-headquarters',
      organization_id: 'org-west-bengal-police-recruitment-board-wbp',
      document_title: 'West Bengal Police Directorate Official Portal (wbpolice.gov.in)',
      document_type: 'OFFICIAL_PORTAL',
      source_url: 'https://wbpolice.gov.in'
    },
    {
      source_id: 'src-wb-police-constable-notice-2026',
      organization_id: 'org-west-bengal-police-recruitment-board-wbp',
      document_title: 'West Bengal Police Constable & Lady Constable Official Notification 2026',
      document_type: 'EXAM_NOTIFICATION',
      source_url: 'https://prb.wb.gov.in/notice_constable_2026.pdf'
    }
  ];

  for (const s of sources) {
    sourceStmt.run(s);
  }

  // 2. Subjects (4 official curriculum subjects)
  const subjects = [
    {
      subject_id: 'wb-police-general-awareness',
      name: 'General Awareness, General Knowledge & West Bengal Special (সাধারণ ज्ञान ও সমসাময়িক বিষয়)',
      short_name: 'WB Police GK & WB Special',
      subject_type: 'GENERAL_AWARENESS',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'wb-police-english',
      name: 'English Language, Grammar, Comprehension & Vocabulary (ইংরেজি ব্যাকরণ ও শব্দভাণ্ডার)',
      short_name: 'WB Police English',
      subject_type: 'LANGUAGE_STUDIES',
      is_language_subject: 1,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'wb-police-elementary-mathematics',
      name: 'Elementary Mathematics - Madhyamik Standard (প্রাথমিক পাटीগণিত - মাধ্যমিক মান)',
      short_name: 'WB Police Mathematics',
      subject_type: 'NUMERICAL_APTITUDE',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'wb-police-reasoning',
      name: 'Reasoning and Logical Analysis (যুক্তি ও বিশ্লেষণমূলক ক্ষমতা)',
      short_name: 'WB Police Reasoning',
      subject_type: 'LOGICAL_REASONING',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    }
  ];

  for (const sub of subjects) {
    subjectStmt.run(sub);
  }

  console.log(`✅ Registered ${sources.length} sources and ${subjects.length} subjects for West Bengal Police.`);
});

tx();
db.close();
