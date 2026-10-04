const path = require('path');
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, '../../../db/sarkari_core.db');
const db = new Database(dbPath);

console.log('Registering UPSC NDA & NA Sources and 6 Subjects in SQLite database...');

const sourceStmt = db.prepare(`
  INSERT OR REPLACE INTO official_sources (
    source_id, organization_id, document_title, document_type, source_url,
    publication_date, effective_date, applicable_year, source_hash, retrieved_at,
    verified_at, verification_status, verification_notes, source_hierarchy_level,
    issuing_authority, applicable_exam_id, applicable_version_id, freshness_status,
    conflict_status
  ) VALUES (
    @source_id, @organization_id, @document_title, @document_type, @source_url,
    '2026-01-01', '2026-04-12', '2026', 'OFFICIAL_UPSC_NDA_SRC_HASH', CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP, 'VERIFIED', 'Official Union Public Service Commission National Defence Academy and Naval Academy Examination Regulations and Syllabus',
    'PRIMARY_STATUTORY', 'Union Public Service Commission (Dholpur House)', 'upsc-nda',
    'ver-upsc-nda-2026', 'FRESH', 'RESOLVED_NO_CONFLICT'
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
      source_id: 'src-upsc-nda-portal',
      organization_id: 'org-union-public-service-commission-upsc',
      document_title: 'Union Public Service Commission Official Application and Examination Portal',
      document_type: 'OFFICIAL_PORTAL',
      source_url: 'https://upsc.gov.in'
    },
    {
      source_id: 'src-upsc-nda-notice-2026',
      organization_id: 'org-union-public-service-commission-upsc',
      document_title: 'UPSC National Defence Academy & Naval Academy Examination Notice 2026',
      document_type: 'EXAM_NOTIFICATION',
      source_url: 'https://upsc.gov.in'
    },
    {
      source_id: 'src-upsc-nda-pyq-corpus',
      organization_id: 'org-union-public-service-commission-upsc',
      document_title: 'UPSC NDA & NA Historical Examination Papers Corpus (2016-2025)',
      document_type: 'OFFICIAL_ARCHIVE',
      source_url: 'https://upsc.gov.in'
    }
  ];

  for (const s of sources) {
    sourceStmt.run(s);
  }

  // 2. Subjects (6 specialized subjects across Paper I Mathematics and Paper II GAT)
  const subjects = [
    {
      subject_id: 'upsc-nda-maths-algebra-calculus',
      name: 'UPSC NDA Mathematics - Algebra, Matrices, Calculus & Vectors (एनडीए गणित: बीजगणित, कलन एवं सदिश)',
      short_name: 'NDA Maths Alg-Calc',
      subject_type: 'MATHEMATICS',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'upsc-nda-maths-trig-stats',
      name: 'UPSC NDA Mathematics - Trigonometry, Coordinate Geometry & Probability (एनडीए गणित: त्रिकोणमिति, ज्यामिति व प्रायिकता)',
      short_name: 'NDA Maths Trig-Stats',
      subject_type: 'MATHEMATICS',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'upsc-nda-gat-english',
      name: 'UPSC NDA GAT Part-A English - Grammar, Vocabulary & Comprehension (अंग्रेजी व्याकरण एवं बोधगम्यता)',
      short_name: 'NDA GAT English',
      subject_type: 'ENGLISH_LANGUAGE',
      is_language_subject: 1,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'upsc-nda-gat-physics',
      name: 'UPSC NDA GAT Part-B Physics - Mechanics, Optics, Heat & Electricity (भौतिक विज्ञान)',
      short_name: 'NDA GAT Physics',
      subject_type: 'PHYSICS',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'upsc-nda-gat-chem-bio',
      name: 'UPSC NDA GAT Part-B Chemistry & General Life Sciences (रसायन विज्ञान एवं जीव विज्ञान)',
      short_name: 'NDA GAT Chem-Bio',
      subject_type: 'CHEMISTRY_BIOLOGY',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    },
    {
      subject_id: 'upsc-nda-gat-history-geo-ca',
      name: 'UPSC NDA GAT Part-B History, Geography, Polity & Defense Current Affairs (इतिहास, भूगोल व रक्षा समसामयिकी)',
      short_name: 'NDA GAT Hist-Geo-CA',
      subject_type: 'GENERAL_KNOWLEDGE',
      is_language_subject: 0,
      is_medium_dependent: 0,
      active: 1
    }
  ];

  for (const sub of subjects) {
    subjectStmt.run(sub);
  }

  console.log(`✅ Registered ${sources.length} sources and ${subjects.length} subjects for UPSC NDA.`);
});

tx();
conn = null;
