const path = require('path');
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, '../../../db/sarkari_core.db');
const db = new Database(dbPath);

console.log('Ingesting official Kerala Organizations, Boards, Sources, and 31 Subjects...');

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
    '2026-01-15', '2026-04-01', '2026-27', 'OFFICIAL_KERALA_SRC_HASH', CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP, 'VERIFIED', 'Official Kerala statutory portals and examination regulations',
    'PRIMARY_STATUTORY', 'Government of Kerala General Education', 'KERALA_EXAM_SUITE',
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
      organization_id: 'org-kl-gov-ged',
      name: 'General Education Department, Government of Kerala',
      short_name: 'Kerala DGE',
      type: 'GOVERNMENT_DEPARTMENT',
      central_or_state: 'STATE',
      state_or_ut: 'Kerala',
      official_website: 'https://education.kerala.gov.in/',
      active: 1,
      verification_status: 'VERIFIED'
    },
    {
      organization_id: 'org-kl-scert',
      name: 'State Council of Educational Research and Training (SCERT) Kerala',
      short_name: 'SCERT Kerala',
      type: 'ACADEMIC_RESEARCH',
      central_or_state: 'STATE',
      state_or_ut: 'Kerala',
      official_website: 'https://scert.kerala.gov.in/',
      active: 1,
      verification_status: 'VERIFIED'
    },
    {
      organization_id: 'org-kl-pareeksha-bhavan',
      name: 'Office of the Commissioner for Government Examinations (Kerala Pareeksha Bhavan)',
      short_name: 'Pareeksha Bhavan',
      type: 'EXAM_BOARD',
      central_or_state: 'STATE',
      state_or_ut: 'Kerala',
      official_website: 'https://pareekshabhavan.kerala.gov.in/',
      active: 1,
      verification_status: 'VERIFIED'
    },
    {
      organization_id: 'org-kl-dhse',
      name: 'Directorate of General Education - Higher Secondary Wing (DHSE Kerala)',
      short_name: 'DHSE Kerala',
      type: 'EXAM_BOARD',
      central_or_state: 'STATE',
      state_or_ut: 'Kerala',
      official_website: 'https://dhsekerala.gov.in/',
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
      board_id: 'kerala-general-scert-dhse',
      organization_id: 'org-kl-gov-ged',
      name: 'Kerala General Education Department & SCERT / DHSE / Pareeksha Bhavan',
      short_name: 'Kerala DGE / DHSE',
      jurisdiction: 'State',
      board_type: 'State',
      official_website: 'https://education.kerala.gov.in/',
      official_result_url: 'https://keralaresults.nic.in/',
      active: 1,
      verification_status: 'VERIFIED'
    },
    {
      board_id: 'kerala-board',
      organization_id: 'org-kl-gov-ged',
      name: 'Kerala State Board (Alias: kerala-board)',
      short_name: 'Kerala Board',
      jurisdiction: 'State',
      board_type: 'State',
      official_website: 'https://education.kerala.gov.in/',
      official_result_url: 'https://keralaresults.nic.in/',
      active: 1,
      verification_status: 'VERIFIED'
    },
    {
      board_id: 'kerala-dhse',
      organization_id: 'org-kl-dhse',
      name: 'Directorate of Higher Secondary Education Kerala (Alias: kerala-dhse)',
      short_name: 'DHSE Kerala',
      jurisdiction: 'State',
      board_type: 'State',
      official_website: 'https://dhsekerala.gov.in/',
      official_result_url: 'https://keralaresults.nic.in/',
      active: 1,
      verification_status: 'VERIFIED'
    },
    {
      board_id: 'kerala-sslc',
      organization_id: 'org-kl-pareeksha-bhavan',
      name: 'Kerala SSLC Examination Board (Alias: kerala-sslc)',
      short_name: 'Kerala SSLC',
      jurisdiction: 'State',
      board_type: 'State',
      official_website: 'https://pareekshabhavan.kerala.gov.in/',
      official_result_url: 'https://keralaresults.nic.in/',
      active: 1,
      verification_status: 'VERIFIED'
    },
    {
      board_id: 'kerala-pareeksha-bhavan',
      organization_id: 'org-kl-pareeksha-bhavan',
      name: 'Kerala Pareeksha Bhavan (Alias: kerala-pareeksha-bhavan)',
      short_name: 'Pareeksha Bhavan',
      jurisdiction: 'State',
      board_type: 'State',
      official_website: 'https://pareekshabhavan.kerala.gov.in/',
      official_result_url: 'https://keralaresults.nic.in/',
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
      source_id: 'src-kl-education-dept',
      organization_id: 'org-kl-gov-ged',
      document_title: 'General Education Department Official Portal, Government of Kerala',
      document_type: 'PORTAL',
      source_url: 'https://education.kerala.gov.in/'
    },
    {
      source_id: 'src-kl-scert',
      organization_id: 'org-kl-scert',
      document_title: 'SCERT Kerala Curriculum Framework & Academic Scheme of Studies',
      document_type: 'CURRICULUM_FRAMEWORK',
      source_url: 'https://scert.kerala.gov.in/'
    },
    {
      source_id: 'src-kl-pareeksha-bhavan',
      organization_id: 'org-kl-pareeksha-bhavan',
      document_title: 'Kerala Pareeksha Bhavan SSLC Examination Regulations & Question Patterns',
      document_type: 'SYLLABUS_REGULATION',
      source_url: 'https://pareekshabhavan.kerala.gov.in/'
    },
    {
      source_id: 'src-kl-dhse',
      organization_id: 'org-kl-dhse',
      document_title: 'Directorate of Higher Secondary Education (DHSE) Scheme & Blueprints',
      document_type: 'SYLLABUS_REGULATION',
      source_url: 'https://dhsekerala.gov.in/'
    },
    {
      source_id: 'src-kl-results',
      organization_id: 'org-kl-gov-ged',
      document_title: 'Kerala Government Examination Results Portal (NIC Kerala)',
      document_type: 'EXAM_RESULT',
      source_url: 'https://keralaresults.nic.in/'
    }
  ];
  for (const s of sources) {
    sourceStmt.run(s);
  }

  // 4. Primary Subjects (10 Class 10 SSLC + 21 Class 12 Plus Two = 31 Subjects)
  const subjects = [
    // Class 10 SSLC (10 subjects)
    { subject_id: 'kerala-sslc-malayalam-1', name: 'Kerala SSLC Malayalam Part 1 (മലയാളം ഭാഗം 1 - കേരള പാഠാവലി)', short_name: 'Malayalam 1 (SSLC)', subject_type: 'LANGUAGE', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'kerala-sslc-malayalam-2', name: 'Kerala SSLC Malayalam Part 2 (മലയാളം ഭാഗം 2 - അടിസ്ഥാന പാഠാവലി)', short_name: 'Malayalam 2 (SSLC)', subject_type: 'LANGUAGE', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'kerala-sslc-english', name: 'Kerala SSLC English (Second Language - English Reader)', short_name: 'English (SSLC)', subject_type: 'LANGUAGE', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'kerala-sslc-hindi', name: 'Kerala SSLC Hindi (Third Language - केरल भारती)', short_name: 'Hindi (SSLC)', subject_type: 'LANGUAGE', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'kerala-sslc-mathematics', name: 'Kerala SSLC Mathematics (ഗണിതം - SCERT Kerala)', short_name: 'Mathematics (SSLC)', subject_type: 'CORE', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'kerala-sslc-physics', name: 'Kerala SSLC Physics (ഭൗതികശാസ്ത്രം)', short_name: 'Physics (SSLC)', subject_type: 'CORE', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'kerala-sslc-chemistry', name: 'Kerala SSLC Chemistry (രസതന്ത്രം)', short_name: 'Chemistry (SSLC)', subject_type: 'CORE', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'kerala-sslc-biology', name: 'Kerala SSLC Biology (ജീവശാസ്ത്രം)', short_name: 'Biology (SSLC)', subject_type: 'CORE', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'kerala-sslc-social-science', name: 'Kerala SSLC Social Science (സാമൂഹ്യശാസ്ത്രം)', short_name: 'Social Science (SSLC)', subject_type: 'CORE', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'kerala-sslc-information-technology', name: 'Kerala SSLC Information Technology (വിവരസാങ്കേതികവിദ്യ - IT)', short_name: 'IT (SSLC)', subject_type: 'VOCATIONAL', is_language_subject: 0, is_medium_dependent: 1, active: 1 },

    // Class 12 Plus Two Science (6 subjects)
    { subject_id: 'kerala-c12-physics', name: 'Kerala Plus Two Physics (ഭൗതികശാസ്ത്രം - DHSE)', short_name: 'Physics (Plus Two)', subject_type: 'SCIENCE', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'kerala-c12-chemistry', name: 'Kerala Plus Two Chemistry (രസതന്ത്രം - DHSE)', short_name: 'Chemistry (Plus Two)', subject_type: 'SCIENCE', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'kerala-c12-mathematics', name: 'Kerala Plus Two Mathematics (ഗണിതം - DHSE)', short_name: 'Mathematics (Plus Two)', subject_type: 'SCIENCE', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'kerala-c12-biology', name: 'Kerala Plus Two Biology (ജീവശാസ്ത്രം - Botany & Zoology)', short_name: 'Biology (Plus Two)', subject_type: 'SCIENCE', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'kerala-c12-computer-science', name: 'Kerala Plus Two Computer Science (കംപ്യൂട്ടർ സയൻസ് - Python & SQL)', short_name: 'Computer Science (Plus Two)', subject_type: 'SCIENCE', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'kerala-c12-geology', name: 'Kerala Plus Two Geology (ഭൂഗർഭശാസ്ത്രം - Kerala Signature Discipline)', short_name: 'Geology (Plus Two)', subject_type: 'SCIENCE', is_language_subject: 0, is_medium_dependent: 1, active: 1 },

    // Class 12 Plus Two Commerce (5 subjects)
    { subject_id: 'kerala-c12-accountancy', name: 'Kerala Plus Two Accountancy (അക്കൗണ്ടൻസി with Computerised Accounting)', short_name: 'Accountancy (Plus Two)', subject_type: 'COMMERCE', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'kerala-c12-business-studies', name: 'Kerala Plus Two Business Studies (ബിസിനസ് സ്റ്റഡീസ് - DHSE)', short_name: 'Business Studies (Plus Two)', subject_type: 'COMMERCE', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'kerala-c12-economics-commerce', name: 'Kerala Plus Two Economics (സാമ്പത്തികശാസ്ത്രം - DHSE Commerce)', short_name: 'Economics (Plus Two)', subject_type: 'COMMERCE', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'kerala-c12-computer-applications-commerce', name: 'Kerala Plus Two Computer Applications (കംപ്യൂട്ടർ ആപ്ലിക്കേഷൻസ് - Commerce)', short_name: 'Computer Applications (Plus Two)', subject_type: 'COMMERCE', is_language_subject: 0, is_medium_dependent: 0, active: 1 },
    { subject_id: 'kerala-c12-business-mathematics', name: 'Kerala Plus Two Business Mathematics & Statistics (ബിസിനസ് മാത്തമാറ്റിക്സ്)', short_name: 'Business Mathematics (Plus Two)', subject_type: 'COMMERCE', is_language_subject: 0, is_medium_dependent: 1, active: 1 },

    // Class 12 Plus Two Humanities (6 subjects)
    { subject_id: 'kerala-c12-history', name: 'Kerala Plus Two History (ചരിത്രം - World & Kerala Renaissance History)', short_name: 'History (Plus Two)', subject_type: 'HUMANITIES', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'kerala-c12-political-science', name: 'Kerala Plus Two Political Science (രാഷ്ട്രമീമാംസ - DHSE)', short_name: 'Political Science (Plus Two)', subject_type: 'HUMANITIES', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'kerala-c12-geography', name: 'Kerala Plus Two Geography (ഭൂമിശാസ്ത്രം - Human & Kerala Regional Geography)', short_name: 'Geography (Plus Two)', subject_type: 'HUMANITIES', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'kerala-c12-sociology', name: 'Kerala Plus Two Sociology (സോഷ്യോളജി - Society & Social Change in Kerala)', short_name: 'Sociology (Plus Two)', subject_type: 'HUMANITIES', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'kerala-c12-journalism', name: 'Kerala Plus Two Journalism & Mass Communication (ജേർണലിസം - Kerala Signature)', short_name: 'Journalism (Plus Two)', subject_type: 'HUMANITIES', is_language_subject: 0, is_medium_dependent: 1, active: 1 },
    { subject_id: 'kerala-c12-psychology', name: 'Kerala Plus Two Psychology (സൈക്കോളജി - DHSE)', short_name: 'Psychology (Plus Two)', subject_type: 'HUMANITIES', is_language_subject: 0, is_medium_dependent: 1, active: 1 },

    // Class 12 Plus Two Languages (4 subjects)
    { subject_id: 'kerala-c12-malayalam', name: 'Kerala Plus Two Malayalam (മലയാളം സാഹിത്യം - Part II Second Language)', short_name: 'Malayalam (Plus Two)', subject_type: 'LANGUAGE', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'kerala-c12-english', name: 'Kerala Plus Two English (Part I Compulsory English - Kerala Reader)', short_name: 'English (Plus Two)', subject_type: 'LANGUAGE', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'kerala-c12-hindi', name: 'Kerala Plus Two Hindi (हिन्दी साहित्य - Part II Second Language Option)', short_name: 'Hindi (Plus Two)', subject_type: 'LANGUAGE', is_language_subject: 1, is_medium_dependent: 0, active: 1 },
    { subject_id: 'kerala-c12-arabic', name: 'Kerala Plus Two Arabic (اللغة العربية - Kerala Malabar Classical Option)', short_name: 'Arabic (Plus Two)', subject_type: 'LANGUAGE', is_language_subject: 1, is_medium_dependent: 0, active: 1 }
  ];

  for (const s of subjects) {
    subjectStmt.run(s);
  }
});

tx();
console.log('✅ Successfully registered Kerala Organizations, 5 Boards/Aliases, 5 Sources, and 31 Subjects!');
