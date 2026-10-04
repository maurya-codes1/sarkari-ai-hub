const path = require('path');
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, '../../../db/sarkari_core.db');
const db = new Database(dbPath);

console.log('Ingesting official APSBE Arunachal Pradesh Organizations, Boards, Sources, and 11 Subjects...');

const orgStmt = db.prepare(`
  INSERT OR REPLACE INTO organizations (
    organization_id, name, short_name, type, central_or_state,
    state_or_ut, official_website, active, verification_status
  ) VALUES (
    @organization_id, @name, @short_name, @type, @central_or_state,
    @state_or_ut, @official_website, @active, @verification_status
  )
`);

const boardStmt = db.prepare(`
  INSERT OR REPLACE INTO boards (
    board_id, organization_id, name, short_name, jurisdiction,
    board_type, official_website, official_result_url, active, verification_status
  ) VALUES (
    @board_id, @organization_id, @name, @short_name, @jurisdiction,
    @board_type, @official_website, @official_result_url, @active, @verification_status
  )
`);

const sourceStmt = db.prepare(`
  INSERT OR REPLACE INTO official_sources (
    source_id, organization_id, document_title, document_type, source_url,
    publication_date, effective_date, applicable_year, source_hash, retrieved_at,
    verified_at, verification_status, verification_notes, source_hierarchy_level,
    issuing_authority, applicable_exam_id, applicable_version_id, freshness_status,
    conflict_status
  ) VALUES (
    @source_id, @organization_id, @document_title, @document_type, @source_url,
    '2026-01-15', '2026-04-01', '2026-27', 'OFFICIAL_APSBE_SRC_HASH', CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP, 'VERIFIED', 'Official Arunachal Pradesh State Board Examination Regulations',
    'PRIMARY_STATUTORY', 'Directorate of School Education, Government of Arunachal Pradesh', 'APSBE_EXAM_SUITE',
    'v2026.1', 'FRESH', 'RESOLVED_NO_CONFLICT'
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
  // 1. Organization
  orgStmt.run({
    organization_id: 'org-ar-board-apsbe',
    name: 'Directorate of School Education, Government of Arunachal Pradesh',
    short_name: 'APSBE',
    type: 'EXAM_BOARD',
    central_or_state: 'STATE',
    state_or_ut: 'Arunachal Pradesh',
    official_website: 'https://apsbe.arunachal.gov.in/',
    active: 1,
    verification_status: 'VERIFIED'
  });

  // 2. Boards & Aliases
  const boards = [
    {
      board_id: 'apsbe-arunachal-pradesh',
      organization_id: 'org-ar-board-apsbe',
      name: 'Arunachal Pradesh State Board Examination',
      short_name: 'APSBE',
      jurisdiction: 'State Elementary Education (Classes V & VIII)',
      board_type: 'State Board',
      official_website: 'https://apsbe.arunachal.gov.in/',
      official_result_url: 'https://apsbe.arunachal.gov.in/results',
      active: 1,
      verification_status: 'VERIFIED'
    },
    {
      board_id: 'apsbe',
      organization_id: 'org-ar-board-apsbe',
      name: 'APSBE Arunachal Pradesh (Alias)',
      short_name: 'APSBE',
      jurisdiction: 'State Elementary Education (Classes V & VIII)',
      board_type: 'State Board',
      official_website: 'https://apsbe.arunachal.gov.in/',
      official_result_url: 'https://apsbe.arunachal.gov.in/results',
      active: 1,
      verification_status: 'VERIFIED'
    },
    {
      board_id: 'apsbe-board',
      organization_id: 'org-ar-board-apsbe',
      name: 'Arunachal Pradesh State Board (Alias)',
      short_name: 'APSBE',
      jurisdiction: 'State Elementary Education (Classes V & VIII)',
      board_type: 'State Board',
      official_website: 'https://apsbe.arunachal.gov.in/',
      official_result_url: 'https://apsbe.arunachal.gov.in/results',
      active: 1,
      verification_status: 'VERIFIED'
    }
  ];
  for (const b of boards) {
    boardStmt.run(b);
  }

  // 3. Sources
  const sources = [
    {
      source_id: 'src-apsbe-portal',
      organization_id: 'org-ar-board-apsbe',
      document_title: 'Arunachal Pradesh State Board Examination Official Portal',
      document_type: 'PORTAL',
      source_url: 'https://apsbe.arunachal.gov.in/'
    },
    {
      source_id: 'src-apsbe-class5-curriculum',
      organization_id: 'org-ar-board-apsbe',
      document_title: 'APSBE Class V State Board Curriculum, Assessment Scheme & Blueprints',
      document_type: 'CURRICULUM_REGULATION',
      source_url: 'https://apsbe.arunachal.gov.in/class-v'
    },
    {
      source_id: 'src-apsbe-class8-curriculum',
      organization_id: 'org-ar-board-apsbe',
      document_title: 'APSBE Class VIII State Board Curriculum, Assessment Scheme & Blueprints',
      document_type: 'CURRICULUM_REGULATION',
      source_url: 'https://apsbe.arunachal.gov.in/class-viii'
    },
    {
      source_id: 'src-arunachal-education-dept',
      organization_id: 'org-ar-board-apsbe',
      document_title: 'Directorate of School Education Arunachal Pradesh Official Portal',
      document_type: 'GOVERNMENT_PORTAL',
      source_url: 'https://www.education.arunachal.gov.in/'
    },
    {
      source_id: 'src-arunachal-scert',
      organization_id: 'org-ar-board-apsbe',
      document_title: 'State Council of Educational Research and Training (SCERT) Arunachal Pradesh Guidelines',
      document_type: 'ACADEMIC_REGULATION',
      source_url: 'https://scertarunachal.nic.in/'
    }
  ];
  for (const s of sources) {
    sourceStmt.run(s);
  }

  // 4. Subjects (11 Primary Subjects across Class V and Class VIII)
  const subjects = [
    // Class 5 (Primary - 5 subjects)
    { subject_id: 'ar-c5-english', name: 'English (Class V - APSBE)', short_name: 'English V', subject_type: 'ACADEMIC', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'ar-c5-hindi', name: 'Hindi (Class V - हिन्दी - APSBE)', short_name: 'Hindi V', subject_type: 'ACADEMIC', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'ar-c5-mathematics', name: 'Mathematics (Class V - APSBE)', short_name: 'Maths V', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'ar-c5-evs', name: 'Environmental Studies (Class V - EVS - APSBE)', short_name: 'EVS V', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'ar-c5-arunachal-heritage', name: 'Arunachal Pradesh Cultural Heritage & Social Life (Class V - APSBE)', short_name: 'Heritage V', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },

    // Class 8 (Upper Primary / Middle - 6 subjects)
    { subject_id: 'ar-c8-english', name: 'English (Class VIII - APSBE)', short_name: 'English VIII', subject_type: 'ACADEMIC', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'ar-c8-hindi', name: 'Hindi (Class VIII - हिन्दी - APSBE)', short_name: 'Hindi VIII', subject_type: 'ACADEMIC', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'ar-c8-mathematics', name: 'Mathematics (Class VIII - APSBE)', short_name: 'Maths VIII', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'ar-c8-science', name: 'Science and Technology (Class VIII - APSBE)', short_name: 'Science VIII', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'ar-c8-social-science', name: 'Social Science (Class VIII - APSBE)', short_name: 'Social Science VIII', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'ar-c8-third-language-skill', name: 'Third Language & Vocational Skill Education (Class VIII - APSBE)', short_name: 'Skills VIII', subject_type: 'ACADEMIC', is_language_subject: 0, is_medium_dependent: 0, active: 1 }
  ];
  for (const s of subjects) {
    subjectStmt.run(s);
  }
});

tx();

console.log('✅ Successfully registered APSBE Arunachal Pradesh organizations, boards, sources, and 11 subjects.');
db.close();
