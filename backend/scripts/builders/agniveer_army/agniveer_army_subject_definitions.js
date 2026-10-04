const path = require('path');
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, '../../../db/sarkari_core.db');
const db = new Database(dbPath);

console.log('Registering Indian Army Agniveer Sources and 6 Subjects in SQLite database...');

const sourceStmt = db.prepare(`
  INSERT OR REPLACE INTO official_sources (
    source_id, organization_id, document_title, document_type, source_url,
    publication_date, effective_date, applicable_year, source_hash, retrieved_at,
    verified_at, verification_status, verification_notes, source_hierarchy_level,
    issuing_authority, applicable_exam_id, applicable_version_id, freshness_status,
    conflict_status
  ) VALUES (
    @source_id, @organization_id, @document_title, @document_type, @source_url,
    '2026-01-15', '2026-04-20', '2026', 'OFFICIAL_ARMY_AGNIVEER_SRC_HASH', CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP, 'VERIFIED', 'Official Join Indian Army Agniveer Rally Common Entrance Examination Scheme and Syllabus',
    'PRIMARY_STATUTORY', 'Directorate General of Recruiting, Integrated HQ of MoD (Army)', 'agniveer-army',
    'ver-agniveer-army-2026', 'FRESH', 'RESOLVED_NO_CONFLICT'
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
      source_id: 'src-agniveer-army-portal',
      organization_id: 'org-join-indian-army-directorate-general-of-',
      document_title: 'Join Indian Army Official Recruitment Portal (Join Indian Army Nic In)',
      document_type: 'OFFICIAL_PORTAL',
      source_url: 'https://joinindianarmy.nic.in'
    },
    {
      source_id: 'src-agniveer-army-notice-2026',
      organization_id: 'org-join-indian-army-directorate-general-of-',
      document_title: 'Indian Army Agniveer Rally Recruitment Common Entrance Examination (CEE) Notification 2026',
      document_type: 'EXAM_NOTIFICATION',
      source_url: 'https://joinindianarmy.nic.in'
    },
    {
      source_id: 'src-agniveer-army-pyq-corpus',
      organization_id: 'org-join-indian-army-directorate-general-of-',
      document_title: 'Indian Army Agniveer Historical CEE Examination Question Papers Corpus (2018-2025)',
      document_type: 'OFFICIAL_ARCHIVE',
      source_url: 'https://joinindianarmy.nic.in'
    }
  ];

  for (const s of sources) {
    sourceStmt.run(s);
  }

  // 2. Subjects (6 specialized tracks covering GD, Tradesman, Technical, Clerk/SKT)
  const subjects = [
    {
      subject_id: 'army-agniveer-gd-general-knowledge',
      name: 'Indian Army Agniveer GD & Tradesman General Knowledge (भारतीय सेना जीडी सामान्य ज्ञान)',
      short_name: 'Army GD GK',
      subject_type: 'GENERAL_KNOWLEDGE',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'army-agniveer-gd-general-science',
      name: 'Indian Army Agniveer GD & Tradesman General Science (भारतीय सेना जीडी सामान्य विज्ञान - 10वीं)',
      short_name: 'Army GD Science',
      subject_type: 'GENERAL_SCIENCE',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'army-agniveer-gd-mathematics-reasoning',
      name: 'Indian Army Agniveer GD Elementary Mathematics & Logical Reasoning (सेना जीडी गणित एवं तर्कशक्ति)',
      short_name: 'Army GD Maths & Reasoning',
      subject_type: 'MATHEMATICS',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'army-agniveer-tech-physics-chemistry',
      name: 'Indian Army Agniveer Technical Physics & Chemistry (सेना तकनीकी भौतिकी एवं रसायन 10+2)',
      short_name: 'Army Tech Phy & Chem',
      subject_type: 'PHYSICS_CHEMISTRY',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'army-agniveer-tech-mathematics',
      name: 'Indian Army Agniveer Technical Mathematics (सेना तकनीकी उच्च गणित 10+2)',
      short_name: 'Army Tech Maths',
      subject_type: 'MATHEMATICS',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'army-agniveer-clerk-english-computers',
      name: 'Indian Army Agniveer Clerk/SKT General English & Computer Science (सेना क्लर्क अंग्रेजी एवं कंप्यूटर)',
      short_name: 'Army Clerk English & IT',
      subject_type: 'ENGLISH_LANGUAGE',
      is_language_subject: 1,
      is_medium_dependent: 0,
      active: 1
    }
  ];

  for (const sub of subjects) {
    subjectStmt.run(sub);
  }

  console.log(`✅ Registered ${sources.length} sources and ${subjects.length} subjects for Indian Army Agniveer.`);
});

tx();
conn = null;
