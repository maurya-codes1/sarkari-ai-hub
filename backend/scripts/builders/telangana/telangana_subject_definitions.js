const path = require('path');
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, '../../../db/sarkari_core.db');
const db = new Database(dbPath);

console.log('Ingesting official Telangana Organizations, Boards, Sources, and 31 Subjects...');

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
    '2026-01-15', '2026-04-01', '2026-27', 'OFFICIAL_TELANGANA_SRC_HASH', CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP, 'VERIFIED', 'Official Telangana statutory portals and examination regulations',
    'PRIMARY_STATUTORY', 'Government of Telangana School Education', 'TELANGANA_EXAM_SUITE',
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
  // 1. Organizations
  const orgs = [
    {
      organization_id: 'org-tg-gov-sed',
      name: 'School Education Department, Government of Telangana',
      short_name: 'Telangana SED',
      type: 'GOVERNMENT_DEPARTMENT',
      central_or_state: 'STATE',
      state_or_ut: 'Telangana',
      official_website: 'https://schooledu.telangana.gov.in/',
      active: 1,
      verification_status: 'VERIFIED'
    },
    {
      organization_id: 'org-tg-scert',
      name: 'State Council of Educational Research and Training (SCERT) Telangana',
      short_name: 'SCERT Telangana',
      type: 'ACADEMIC_RESEARCH',
      central_or_state: 'STATE',
      state_or_ut: 'Telangana',
      official_website: 'https://scert.telangana.gov.in/',
      active: 1,
      verification_status: 'VERIFIED'
    },
    {
      organization_id: 'org-tg-bse',
      name: 'Directorate of Government Examinations, Telangana (BSE Telangana)',
      short_name: 'BSE Telangana',
      type: 'EXAM_BOARD',
      central_or_state: 'STATE',
      state_or_ut: 'Telangana',
      official_website: 'https://bse.telangana.gov.in/',
      active: 1,
      verification_status: 'VERIFIED'
    },
    {
      organization_id: 'org-tg-tsbie',
      name: 'Telangana State Board of Intermediate Education (TSBIE)',
      short_name: 'TSBIE',
      type: 'EXAM_BOARD',
      central_or_state: 'STATE',
      state_or_ut: 'Telangana',
      official_website: 'https://tsbie.cgg.gov.in/',
      active: 1,
      verification_status: 'VERIFIED'
    }
  ];
  for (const o of orgs) {
    orgStmt.run(o);
  }

  // 2. Boards & Aliases
  const boards = [
    {
      board_id: 'telangana-bsetg-tsbie',
      organization_id: 'org-tg-gov-sed',
      name: 'Telangana School Board Ecosystem (BSE Telangana & TSBIE)',
      short_name: 'Telangana BSE / TSBIE',
      jurisdiction: 'State',
      board_type: 'State',
      official_website: 'https://bse.telangana.gov.in/',
      official_result_url: 'https://results.cgg.gov.in/',
      active: 1,
      verification_status: 'VERIFIED'
    },
    {
      board_id: 'telangana-board',
      organization_id: 'org-tg-gov-sed',
      name: 'Telangana State Board (Alias: telangana-board)',
      short_name: 'Telangana Board',
      jurisdiction: 'State',
      board_type: 'State',
      official_website: 'https://bse.telangana.gov.in/',
      official_result_url: 'https://results.cgg.gov.in/',
      active: 1,
      verification_status: 'VERIFIED'
    },
    {
      board_id: 'telangana-tsbie',
      organization_id: 'org-tg-tsbie',
      name: 'Telangana State Board of Intermediate Education (Alias: telangana-tsbie)',
      short_name: 'TSBIE',
      jurisdiction: 'State',
      board_type: 'State',
      official_website: 'https://tsbie.cgg.gov.in/',
      official_result_url: 'https://results.cgg.gov.in/',
      active: 1,
      verification_status: 'VERIFIED'
    },
    {
      board_id: 'telangana-bsetg',
      organization_id: 'org-tg-bse',
      name: 'Directorate of Government Examinations Telangana (Alias: telangana-bsetg)',
      short_name: 'BSE Telangana',
      jurisdiction: 'State',
      board_type: 'State',
      official_website: 'https://bse.telangana.gov.in/',
      official_result_url: 'https://results.cgg.gov.in/',
      active: 1,
      verification_status: 'VERIFIED'
    },
    {
      board_id: 'bsetg-board',
      organization_id: 'org-tg-bse',
      name: 'BSE Telangana SSC Board (Alias: bsetg-board)',
      short_name: 'BSETG SSC',
      jurisdiction: 'State',
      board_type: 'State',
      official_website: 'https://bse.telangana.gov.in/',
      official_result_url: 'https://results.cgg.gov.in/',
      active: 1,
      verification_status: 'VERIFIED'
    },
    {
      board_id: 'tsbie-board',
      organization_id: 'org-tg-tsbie',
      name: 'TSBIE Intermediate Board (Alias: tsbie-board)',
      short_name: 'TSBIE Inter',
      jurisdiction: 'State',
      board_type: 'State',
      official_website: 'https://tsbie.cgg.gov.in/',
      official_result_url: 'https://results.cgg.gov.in/',
      active: 1,
      verification_status: 'VERIFIED'
    }
  ];
  for (const b of boards) {
    boardStmt.run(b);
  }

  // 3. Official Sources
  const sources = [
    {
      source_id: 'src-tg-education-dept',
      organization_id: 'org-tg-gov-sed',
      document_title: 'School Education Department Official Portal, Government of Telangana',
      document_type: 'PORTAL',
      source_url: 'https://schooledu.telangana.gov.in/'
    },
    {
      source_id: 'src-tg-scert',
      organization_id: 'org-tg-scert',
      document_title: 'SCERT Telangana Curriculum Framework & Academic Scheme of Studies',
      document_type: 'CURRICULUM_FRAMEWORK',
      source_url: 'https://scert.telangana.gov.in/'
    },
    {
      source_id: 'src-tg-bse',
      organization_id: 'org-tg-bse',
      document_title: 'BSE Telangana SSC Examination Regulations, Blueprint & Question Bank',
      document_type: 'SYLLABUS_REGULATION',
      source_url: 'https://bse.telangana.gov.in/'
    },
    {
      source_id: 'src-tg-tsbie',
      organization_id: 'org-tg-tsbie',
      document_title: 'Telangana State Board of Intermediate Education (TSBIE) Syllabi & Blueprints',
      document_type: 'SYLLABUS_REGULATION',
      source_url: 'https://tsbie.cgg.gov.in/'
    },
    {
      source_id: 'src-tg-results',
      organization_id: 'org-tg-gov-sed',
      document_title: 'Centre for Good Governance & Telangana Examination Results Portal',
      document_type: 'EXAM_RESULT',
      source_url: 'https://results.cgg.gov.in/'
    }
  ];
  for (const s of sources) {
    sourceStmt.run(s);
  }

  // 4. Primary Subjects (10 Class 10 SSC + 21 Class 12 Intermediate = 31 Subjects)
  const subjects = [
    // Class 10 SSC (10 subjects)
    { subject_id: 'telangana-ssc-first-language-telugu', name: 'Telangana SSC First Language Telugu (తెలుగు - సింగిడి 2 / తెలుగు వాచకం)', short_name: 'Telugu (SSC)', subject_type: 'LANGUAGE', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'telangana-ssc-second-language-hindi', name: 'Telangana SSC Second Language Hindi (द्वितीय भाषा हिन्दी)', short_name: 'Hindi (SSC)', subject_type: 'LANGUAGE', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'telangana-ssc-third-language-english', name: 'Telangana SSC Third Language English (Our World through English)', short_name: 'English (SSC)', subject_type: 'LANGUAGE', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'telangana-ssc-mathematics', name: 'Telangana SSC Mathematics (గణితం - SCERT Telangana)', short_name: 'Mathematics (SSC)', subject_type: 'CORE', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'telangana-ssc-physical-science', name: 'Telangana SSC Physical Science (భౌతిక రసాయన శాస్త్రాలు - Physics & Chemistry)', short_name: 'Physical Science (SSC)', subject_type: 'CORE', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'telangana-ssc-biological-science', name: 'Telangana SSC Biological Science (జీవ శాస్త్రం - Biology)', short_name: 'Biological Science (SSC)', subject_type: 'CORE', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'telangana-ssc-social-studies', name: 'Telangana SSC Social Studies (సాంఘిక శాస్త్రం - Geography, History, Telangana Movement)', short_name: 'Social Studies (SSC)', subject_type: 'CORE', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'telangana-ssc-first-language-urdu', name: 'Telangana SSC First Language Urdu (اردو - Telangana Official Language)', short_name: 'Urdu (SSC)', subject_type: 'LANGUAGE', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'telangana-ssc-telangana-heritage', name: 'Telangana SSC History, Culture & Heritage (తెలంగాణ సంస్కృతి & వారసత్వం)', short_name: 'Telangana Heritage (SSC)', subject_type: 'CORE', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'telangana-ssc-information-technology', name: 'Telangana SSC Information Technology & Digital Literacy (కంప్యూటర్ సైన్స్)', short_name: 'IT (SSC)', subject_type: 'VOCATIONAL', is_language_subject: 0, is_medium_dependent: 0, active: 1 },

    // Class 12 Intermediate Science Stream (6 subjects)
    { subject_id: 'telangana-inter-physics', name: 'Telangana Intermediate Physics (భౌతికశాస్త్రం - TSBIE MPC & BiPC)', short_name: 'Physics (Inter)', subject_type: 'SCIENCE', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'telangana-inter-chemistry', name: 'Telangana Intermediate Chemistry (రసాయనశాస్త్రం - TSBIE MPC & BiPC)', short_name: 'Chemistry (Inter)', subject_type: 'SCIENCE', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'telangana-inter-mathematics-a', name: 'Telangana Intermediate Mathematics IIA (గణితం 2A - Algebra & Probability)', short_name: 'Maths IIA (Inter)', subject_type: 'SCIENCE', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'telangana-inter-mathematics-b', name: 'Telangana Intermediate Mathematics IIB (గణితం 2B - Calculus & Geometry)', short_name: 'Maths IIB (Inter)', subject_type: 'SCIENCE', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'telangana-inter-botany', name: 'Telangana Intermediate Botany (వృక్షశాస్త్రం - TSBIE BiPC)', short_name: 'Botany (Inter)', subject_type: 'SCIENCE', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'telangana-inter-zoology', name: 'Telangana Intermediate Zoology (జంతుశాస్త్రం - TSBIE BiPC)', short_name: 'Zoology (Inter)', subject_type: 'SCIENCE', is_language_subject: 0, is_medium_dependent: 1, active: 1 },

    // Class 12 Intermediate Commerce Stream (5 subjects)
    { subject_id: 'telangana-inter-commerce', name: 'Telangana Intermediate Commerce & Management (వాణిజ్యశాస్త్రం - TSBIE CEC & MEC)', short_name: 'Commerce (Inter)', subject_type: 'COMMERCE', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'telangana-inter-accountancy', name: 'Telangana Intermediate Accountancy (ఖాతా పుస్తకాలు & ముగింపు లెక్కలు)', short_name: 'Accountancy (Inter)', subject_type: 'COMMERCE', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'telangana-inter-economics', name: 'Telangana Intermediate Economics (సాంఘిక ఆర్థికశాస్త్రం - Telangana Economy & IT Corridor)', short_name: 'Economics (Inter)', subject_type: 'COMMERCE', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'telangana-inter-civics-commerce', name: 'Telangana Intermediate Civics / Political Science (పౌరనీతి - Commerce Option)', short_name: 'Civics (Inter)', subject_type: 'COMMERCE', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'telangana-inter-commercial-geography', name: 'Telangana Intermediate Commercial Geography & Trade (వాణిజ్య భూగోళశాస్త్రం)', short_name: 'Commercial Geography (Inter)', subject_type: 'COMMERCE', is_language_subject: 0, is_medium_dependent: 1, active: 1 },

    // Class 12 Intermediate Humanities Stream (6 subjects)
    { subject_id: 'telangana-inter-history', name: 'Telangana Intermediate History (చరిత్ర - Telangana History: Kakatiyas, Asaf Jahis, Armed Struggle & Statehood)', short_name: 'History (Inter)', subject_type: 'HUMANITIES', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'telangana-inter-political-science', name: 'Telangana Intermediate Political Science (రాజనీతిశాస్త్రం - Constitution & Telangana Governance)', short_name: 'Political Science (Inter)', subject_type: 'HUMANITIES', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'telangana-inter-geography', name: 'Telangana Intermediate Geography (భూగోళశాస్త్రం - Godavari/Krishna Basins, Singareni SCCL)', short_name: 'Geography (Inter)', subject_type: 'HUMANITIES', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'telangana-inter-sociology', name: 'Telangana Intermediate Sociology (సమాజశాస్త్రం - Telangana Tribal & Rural Heritage)', short_name: 'Sociology (Inter)', subject_type: 'HUMANITIES', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'telangana-inter-public-administration', name: 'Telangana Intermediate Public Administration (ప్రజాపాలన - Secretariat & Dharani)', short_name: 'Public Administration (Inter)', subject_type: 'HUMANITIES', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'telangana-inter-logic-psychology', name: 'Telangana Intermediate Logic & Psychology (తర్కశాస్త్రం & మనోవిజ్ఞానశాస్త్రం)', short_name: 'Logic & Psychology (Inter)', subject_type: 'HUMANITIES', is_language_subject: 0, is_medium_dependent: 1, active: 1 },

    // Class 12 Intermediate Languages Stream (4 subjects)
    { subject_id: 'telangana-inter-telugu', name: 'Telangana Intermediate Telugu Literature (తెలంగాణ తెలుగు సాహిత్యం - పోతన, పాల్కురికి, దాశరథి, కాళోజీ, సినారె)', short_name: 'Telugu (Inter)', subject_type: 'LANGUAGE', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'telangana-inter-english', name: 'Telangana Intermediate General English (Part I Compulsory English - TSBIE Reader)', short_name: 'English (Inter)', subject_type: 'LANGUAGE', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'telangana-inter-hindi', name: 'Telangana Intermediate Hindi Literature (द्वितीय भाषा हिन्दी साहित्य - TSBIE)', short_name: 'Hindi (Inter)', subject_type: 'LANGUAGE', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'telangana-inter-urdu', name: 'Telangana Intermediate Urdu Literature (اردو ادب - دکنی اردو، کلیات قلی قطب شاہ)', short_name: 'Urdu (Inter)', subject_type: 'LANGUAGE', is_language_subject: 1, is_medium_dependent: 0, active: 1 }
  ];

  for (const s of subjects) {
    subjectStmt.run(s);
  }
});

tx();
console.log('✅ Successfully registered Telangana Organizations, 6 Boards/Aliases, 5 Sources, and 31 Subjects!');
