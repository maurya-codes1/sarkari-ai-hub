const fs = require('fs');
const path = require('path');

const cbseData = {
  board_id: "cbse-board",
  name: "Central Board of Secondary Education",
  short_name: "CBSE",
  authority: "Ministry of Education, Government of India",
  official_urls: {
    portal: "https://cbse.gov.in/",
    academic: "https://cbseacademic.nic.in/",
    curriculum_2027: "https://cbseacademic.nic.in/curriculum_2027.html",
    sqp_class_x: "https://cbseacademic.nic.in/SQP_CLASSX_2026-27.html",
    sqp_class_xii: "https://cbseacademic.nic.in/SQP_CLASSXII_2026-27.html",
    pariksha_sangam: "https://cbse.nic.in/parikshasangam"
  },
  academic_year: "2026-27",
  applicable_classes: ["Class 9", "Class 10", "Class 11", "Class 12"],

  class_9_structure: {
    status: "SCHOOL_ASSESSED_INTERNAL_PROGRESSION",
    full_exam_eligible: false,
    curriculum_offerings: [
      "Language 1", "Language 2", "Mathematics / Mathematics Advanced",
      "Science / Science Advanced", "Social Science", "Vocational Education",
      "Individuals in Society", "Art Education", "Physical Education and Well Being",
      "Computational Thinking & AI Modules"
    ]
  },

  class_11_structure: {
    status: "SCHOOL_ASSESSED_INTERNAL_PROGRESSION",
    full_exam_eligible: false,
    curriculum_offerings: [
      "Language Core / Elective", "Elective 1", "Elective 2", "Elective 3",
      "Elective 4 / Optional", "General Studies", "Health & Physical Education", "Work Experience"
    ]
  },

  class_10: {
    status: "PUBLIC_BOARD_EXAM",
    full_exam_eligible: true,
    languages_dictionary: [
      { code: "016", name: "Arabic" }, { code: "014", name: "Assamese" },
      { code: "099", name: "Bahasa Melayu" }, { code: "012", name: "Bengali" },
      { code: "079", name: "Bhoti" }, { code: "095", name: "Bhutia" },
      { code: "092", name: "Bodo" }, { code: "184", name: "English - Language and Literature", is_primary: true },
      { code: "101", name: "English Communicative" }, { code: "018", name: "French" },
      { code: "020", name: "German" }, { code: "010", name: "Gujarati" },
      { code: "132", name: "Gurung" }, { code: "002", name: "Hindi Course-A", is_primary: true },
      { code: "085", name: "Hindi Course-B", is_primary: true }, { code: "094", name: "Japanese" },
      { code: "015", name: "Kannada" }, { code: "097", name: "Kashmiri" },
      { code: "096", name: "Kokborok" }, { code: "026", name: "Lepcha" },
      { code: "025", name: "Limboo" }, { code: "011", name: "Malayalam" },
      { code: "017", name: "Manipuri" }, { code: "009", name: "Marathi" },
      { code: "098", name: "Mizo" }, { code: "024", name: "Nepali" },
      { code: "013", name: "Odia" }, { code: "023", name: "Persian" },
      { code: "004", name: "Punjabi" }, { code: "131", name: "Rai" },
      { code: "021", name: "Russian" }, { code: "122", name: "Sanskrit" },
      { code: "119", name: "Sanskrit Communicative" }, { code: "008", name: "Sindhi" },
      { code: "090", name: "Spanish" }, { code: "133", name: "Sherpa" },
      { code: "134", name: "Tamang" }, { code: "006", name: "Tamil" },
      { code: "093", name: "Tangkhul" }, { code: "007", name: "Telugu AP" },
      { code: "089", name: "Telugu Telangana" }, { code: "019", name: "Tibetan" },
      { code: "136", name: "Thai" }, { code: "003", name: "Urdu Course A" },
      { code: "303", name: "Urdu Course B" }
    ],
    main_subjects: [
      { code: "041", name: "Mathematics Standard", subject_id: "subj-math", theory_marks: 80, ia_marks: 20, is_primary: true },
      { code: "241", name: "Mathematics Basic", subject_id: "subj-math-basic", theory_marks: 80, ia_marks: 20 },
      { code: "086", name: "Science", subject_id: "subj-science", theory_marks: 80, ia_marks: 20, is_primary: true },
      { code: "087", name: "Social Science", subject_id: "subj-social", theory_marks: 80, ia_marks: 20, is_primary: true }
    ],
    other_academic_electives: [
      { code: "031", name: "Carnatic Music (Vocal)" }, { code: "032", name: "Carnatic Music (Melodic Instruments)" },
      { code: "033", name: "Carnatic Music (Percussion Instruments)" }, { code: "034", name: "Hindustani Music (Vocal)" },
      { code: "035", name: "Hindustani Music (Melodic Instruments)" }, { code: "036", name: "Hindustani Music (Percussion Instruments)" },
      { code: "049", name: "Painting" }, { code: "064", name: "Home Science" }, { code: "076", name: "National Cadet Corps (NCC)" },
      { code: "165", name: "Computer Applications", subject_id: "subj-computer-app", is_primary: true },
      { code: "154", name: "Elements of Business", subject_id: "subj-elements-business", is_primary: true },
      { code: "254", name: "Elements of Book Keeping and Accountancy", subject_id: "subj-elements-bookkeeping", is_primary: true }
    ],
    internal_assessment_areas: [
      "Health and Physical Education (506)", "Work Experience (500)", "Art Education (502)"
    ],
    primary_preparation_package: [
      "subj-math", "subj-science", "subj-social", "subj-english",
      "subj-hindi", "subj-hindi-b", "subj-computer-app",
      "subj-elements-bookkeeping", "subj-elements-business"
    ]
  },

  class_12: {
    status: "PUBLIC_BOARD_EXAM",
    full_exam_eligible: true,
    streams: {
      science: {
        display_name: "Science Stream (PCM / PCB / PCMB)",
        primary_subjects: [
          { code: "042", name: "Physics", subject_id: "subj-physics", theory_marks: 70, practical_marks: 30 },
          { code: "043", name: "Chemistry", subject_id: "subj-chemistry", theory_marks: 70, practical_marks: 30 },
          { code: "041", name: "Mathematics", subject_id: "subj-math12", theory_marks: 80, ia_marks: 20 },
          { code: "044", name: "Biology", subject_id: "subj-biology", theory_marks: 70, practical_marks: 30 },
          { code: "301", name: "English Core", subject_id: "subj-english", theory_marks: 80, ia_marks: 20 },
          { code: "083", name: "Computer Science", subject_id: "subj-cs", theory_marks: 70, practical_marks: 30 },
          { code: "048", name: "Physical Education", subject_id: "subj-pe", theory_marks: 70, practical_marks: 30 }
        ]
      },
      commerce: {
        display_name: "Commerce Stream",
        primary_subjects: [
          { code: "055", name: "Accountancy", subject_id: "subj-accountancy", theory_marks: 80, project_marks: 20 },
          { code: "054", name: "Business Studies", subject_id: "subj-business", theory_marks: 80, project_marks: 20 },
          { code: "030", name: "Economics", subject_id: "subj-economics", theory_marks: 80, project_marks: 20 },
          { code: "241", name: "Applied Mathematics", subject_id: "subj-applied-math", theory_marks: 80, ia_marks: 20 },
          { code: "066", name: "Entrepreneurship", subject_id: "subj-entrepreneurship", theory_marks: 70, project_marks: 30 },
          { code: "301", name: "English Core", subject_id: "subj-english", theory_marks: 80, ia_marks: 20 }
        ]
      },
      humanities: {
        display_name: "Humanities / Arts Stream",
        primary_subjects: [
          { code: "027", name: "History", subject_id: "subj-history", theory_marks: 80, project_marks: 20 },
          { code: "028", name: "Political Science", subject_id: "subj-polity", theory_marks: 80, project_marks: 20 },
          { code: "029", name: "Geography", subject_id: "subj-geography", theory_marks: 70, practical_marks: 30 },
          { code: "039", name: "Sociology", subject_id: "subj-sociology", theory_marks: 80, project_marks: 20 },
          { code: "037", name: "Psychology", subject_id: "subj-psychology", theory_marks: 70, practical_marks: 30 },
          { code: "030", name: "Economics", subject_id: "subj-economics", theory_marks: 80, project_marks: 20 },
          { code: "301", name: "English Core", subject_id: "subj-english", theory_marks: 80, ia_marks: 20 }
        ]
      }
    },
    internal_assessment_areas: ["Health and Physical Education (502)", "Work Experience (500)", "General Studies (503)"]
  }
};

const targetPath = path.join(__dirname, '../../data/boards/cbse-board.json');
fs.writeFileSync(targetPath, JSON.stringify(cbseData, null, 2), 'utf8');
console.log('✅ Generated data/boards/cbse-board.json successfully! Path:', targetPath);
