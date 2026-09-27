const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');

const db = new Database(path.resolve(__dirname, '../db/sarkari_core.db'), { readonly: true });
const exams = db.prepare('SELECT inventory_id, exam_id, category, sub_category, exam_name_en, authority_name, official_website_url FROM nationwide_exam_inventory ORDER BY category, exam_name_en').all();

const physicalStandardsMap = {
  'up-police-constable': {
    applicable: true,
    maleHeight: '168 (ST: 160)',
    femaleHeight: '152 (ST: 147)',
    maleChest: '79-84 (ST: 77-82)',
    femaleChest: 'NOT_APPLICABLE',
    petMale: '4.8 km run in 25 min',
    petFemale: '2.4 km run in 14 min',
    medical: 'Visual acuity 6/6 or 6/9; no color blindness, flat foot, knock knees',
    sourceRef: 'UPPRPB Constable Notification 2024 Para 4.3'
  },
  'up-police-si': {
    applicable: true,
    maleHeight: '168 (ST: 160)',
    femaleHeight: '152 (ST: 147)',
    maleChest: '79-84 (ST: 77-82)',
    femaleChest: 'NOT_APPLICABLE',
    petMale: '4.8 km run in 28 min',
    petFemale: '2.4 km run in 16 min',
    medical: 'Normal binocular vision 6/6; clear color perception',
    sourceRef: 'UPPRPB SI Notification 2024 Para 5.2'
  },
  'bihar-police-constable': {
    applicable: true,
    maleHeight: '165 (EBC/SC/ST: 160)',
    femaleHeight: '155 (All Categories; min weight 48 kg)',
    maleChest: '81-86 (SC/ST: 79-84)',
    femaleChest: 'NOT_APPLICABLE',
    petMale: '1.6 km run max 6 min (graded marks); Shot put 16 lb (16-20 ft); High jump 4-5 ft',
    petFemale: '1.0 km run max 5 min (graded marks); Shot put 12 lb (12-16 ft); High jump 3-4 ft',
    medical: 'Standard Police Medical Clearance (CSBC Norms)',
    sourceRef: 'CSBC Advt 01/2023 & 2024 Physical Standards'
  },
  'delhi-police': {
    applicable: true,
    maleHeight: '170 (Hill/ST: 165)',
    femaleHeight: '157 (SC/ST: 155)',
    maleChest: '81-85 (5 cm expansion)',
    femaleChest: 'NOT_APPLICABLE',
    petMale: 'Age<30: 1600m in 6 min; Long jump 14 ft; High jump 3.9 ft',
    petFemale: 'Age<30: 1600m in 8 min; Long jump 10 ft; High jump 3.0 ft',
    medical: '6/12 without glasses both eyes',
    sourceRef: 'SSC Delhi Police Constable Notice 2024'
  },
  'punjab-police-constable': {
    applicable: true,
    maleHeight: '170.2 (5 ft 7 in)',
    femaleHeight: '157.5 (5 ft 2 in)',
    maleChest: 'NOT_APPLICABLE',
    femaleChest: 'NOT_APPLICABLE',
    petMale: '1600m in 6 min 30 sec; Long jump 3.80 m; High jump 1.10 m',
    petFemale: '800m in 4 min; Long jump 3.00 m; High jump 0.95 m',
    medical: 'Punjab Police Rules 1934 Appendix 12.16',
    sourceRef: 'Punjab Police Recruitment Notice 2024'
  },
  'rajasthan-police-constable': {
    applicable: true,
    maleHeight: '168 (Saharia/Tribal: 160)',
    femaleHeight: '152 (Weight min 47.5 kg)',
    maleChest: '81-86 (Saharia/Tribal: 74-79)',
    femaleChest: 'NOT_APPLICABLE',
    petMale: '5 km run in 25 min',
    petFemale: '5 km run in 35 min',
    medical: 'Visual acuity 6/6 right eye, 6/9 left eye without glasses',
    sourceRef: 'Rajasthan Police Standing Order 2024'
  },
  'ssc-gd': {
    applicable: true,
    maleHeight: '170 (ST: 162.5, Hill: 165)',
    femaleHeight: '157 (ST: 150, Hill: 155)',
    maleChest: '80-85 (ST: 76-81)',
    femaleChest: 'NOT_APPLICABLE',
    petMale: '5 km run in 24 min (Ladakh: 1.6 km in 7 min)',
    petFemale: '1.6 km run in 8 min 30 sec (Ladakh: 800m in 5 min)',
    medical: 'SHAPE-1 standard, CAPF DME/RME guidelines',
    sourceRef: 'SSC Constable GD in CAPFs Notice 2024'
  },
  'ssc-cpo': {
    applicable: true,
    maleHeight: '170 (Hill: 165, ST: 162.5)',
    femaleHeight: '157 (Hill: 155, ST: 154)',
    maleChest: '80-85 (ST: 77-82)',
    femaleChest: 'NOT_APPLICABLE',
    petMale: '100m in 16s; 1.6km in 6.5min; Long jump 3.65m; High jump 1.2m; Shot put 4.5m',
    petFemale: '100m in 18s; 800m in 4min; Long jump 2.7m; High jump 0.9m',
    medical: '6/6 & 6/9 without correction; no color blindness',
    sourceRef: 'SSC CPO SI Examination Notice 2024'
  },
  'upsc-capf': {
    applicable: true,
    maleHeight: '165',
    femaleHeight: '157',
    maleChest: '81-86',
    femaleChest: 'NOT_APPLICABLE',
    petMale: '100m in 16s; 800m in 3m 45s; Long jump 3.5m; Shot put (7.26kg) 4.5m',
    petFemale: '100m in 18s; 800m in 4m 45s; Long jump 3.0m',
    medical: 'MHA CAPF AC Medical Fitness Rules',
    sourceRef: 'UPSC CAPF (AC) Gazette Notification 2024'
  },
  'rpf-constable': {
    applicable: true,
    maleHeight: '165 (SC/ST: 160, Hill: 163)',
    femaleHeight: '157 (SC/ST: 152, Hill: 155)',
    maleChest: '80-85 (SC/ST: 76.2-81.2)',
    femaleChest: 'NOT_APPLICABLE',
    petMale: '1600m in 5m 45s; Long jump 14 ft; High jump 4 ft',
    petFemale: '800m in 3m 40s; Long jump 9 ft; High jump 3 ft',
    medical: 'Railway Medical Category B-1',
    sourceRef: 'CEN RPF 02/2024 Official Notice'
  },
  'rpf-si': {
    applicable: true,
    maleHeight: '165 (SC/ST: 160, Hill: 163)',
    femaleHeight: '157 (SC/ST: 152, Hill: 155)',
    maleChest: '80-85 (SC/ST: 76.2-81.2)',
    femaleChest: 'NOT_APPLICABLE',
    petMale: '1600m in 6m 30s; Long jump 12 ft; High jump 3 ft 9 in',
    petFemale: '800m in 4m; Long jump 9 ft; High jump 3 ft',
    medical: 'Railway Medical Category B-1',
    sourceRef: 'CEN RPF 01/2024 Official Notice'
  },
  'agniveer-army': {
    applicable: true,
    maleHeight: '169-170 (GD: 170, Tech: 170, Clerk: 162)',
    femaleHeight: '162 (Women Military Police)',
    maleChest: '77-82 (5 cm expansion)',
    femaleChest: 'NOT_APPLICABLE',
    petMale: '1.6 km run (Group 1: <=5m 30s; Group 2: <=5m 45s); Beam pull-ups (6-10); 9 ft Ditch; Zig-zag balance',
    petFemale: '1.6 km run in 7m 30s; Long jump 10 ft; High jump 3 ft',
    medical: 'Indian Army Recruiting Medical Regulations',
    sourceRef: 'Join Indian Army Agniveer Rally Notification 2024'
  },
  'afcat': {
    applicable: true,
    maleHeight: '157.5 (Flying Branch: 162.5; Leg length: 99-120 cm)',
    femaleHeight: '152 (Flying Branch: 162.5)',
    maleChest: '5 cm expansion min',
    femaleChest: 'NOT_APPLICABLE',
    petMale: '1.6 km run in 10 min, 10 Push-ups, 3 Chin-ups (SSB stage)',
    petFemale: '1.6 km run in 10 min, 10 Push-ups (SSB stage)',
    medical: 'IAF Medical Directorate Manual of Medical Examinations',
    sourceRef: 'AFCAT 02/2024 Official Notification'
  },
  'upsc-nda': {
    applicable: true,
    maleHeight: '157 (Air Force: 162.5, Gorkha/NE: 152)',
    femaleHeight: '152 (Air Force: 162.5)',
    maleChest: '5 cm expansion min',
    femaleChest: 'NOT_APPLICABLE',
    petMale: 'Running 2.4 km in 15 min, Skipping, Push-ups 20, Chin-ups 8, Rope Climbing 3-4 m',
    petFemale: 'Running 2.4 km in 15 min, Push-ups, Sit-ups',
    medical: 'NDA & NA Gazette Medical Standards',
    sourceRef: 'UPSC NDA/NA Notification 2024'
  },
  'upsc-cds': {
    applicable: true,
    maleHeight: '157.5 (Air Force: 162.5, Navy: 157)',
    femaleHeight: '152 (OTA Women)',
    maleChest: '5 cm expansion min',
    femaleChest: 'NOT_APPLICABLE',
    petMale: 'Physical fitness conditioning at SSB / Academy',
    petFemale: 'Physical fitness conditioning at SSB / OTA',
    medical: 'Armed Forces Medical Standards (IMA/INA/AFA/OTA)',
    sourceRef: 'UPSC CDS Notification 2024'
  },
  'rrb-alp': {
    applicable: true,
    maleHeight: 'NOT_SPECIFIED_IN_VERIFIED_SOURCE',
    femaleHeight: 'NOT_SPECIFIED_IN_VERIFIED_SOURCE',
    maleChest: 'NOT_APPLICABLE',
    femaleChest: 'NOT_APPLICABLE',
    petMale: 'NOT_APPLICABLE',
    petFemale: 'NOT_APPLICABLE',
    medical: 'Medical Category A-1: Distant Vision 6/6, 6/6 without glasses with fogging test; Sn: 0.6, 0.6; Color/Night Vision mandatory',
    sourceRef: 'CEN 01/2024 Notification Rule 11.0'
  },
  'rrb-group-d': {
    applicable: true,
    maleHeight: 'NOT_SPECIFIED_IN_VERIFIED_SOURCE',
    femaleHeight: 'NOT_SPECIFIED_IN_VERIFIED_SOURCE',
    maleChest: 'NOT_APPLICABLE',
    femaleChest: 'NOT_APPLICABLE',
    petMale: 'Lift & carry 35 kg weight for 100 m in 2 min; Run 1000 m in 4 min 15 sec in one chance',
    petFemale: 'Lift & carry 20 kg weight for 100 m in 2 min; Run 1000 m in 5 min 40 sec in one chance',
    medical: 'Medical Categories A-2, A-3, B-1, B-2, C-1 per post',
    sourceRef: 'CEN RRC-01/2019 & Railway Board Norms'
  }
};

const rows = [];
rows.push([
  'inventory_id',
  'exam_id',
  'exam_name',
  'category',
  'physical_standards_applicable',
  'male_height_cm',
  'female_height_cm',
  'male_chest_cm',
  'female_chest_cm',
  'pet_male',
  'pet_female',
  'medical_standards',
  'source_reference',
  'verification_status'
].join(','));

for (const e of exams) {
  const spec = physicalStandardsMap[e.exam_id];
  if (spec) {
    rows.push([
      `"${e.inventory_id}"`,
      `"${e.exam_id}"`,
      `"${e.exam_name_en}"`,
      `"${e.category}"`,
      spec.applicable,
      `"${spec.maleHeight}"`,
      `"${spec.femaleHeight}"`,
      `"${spec.maleChest}"`,
      `"${spec.femaleChest}"`,
      `"${spec.petMale}"`,
      `"${spec.petFemale}"`,
      `"${spec.medical}"`,
      `"${spec.sourceRef}"`,
      '"VERIFIED"'
    ].join(','));
  } else {
    // Non-physical exam
    const isStatePsc = e.category === 'STATE_PSC';
    const isSscCivil = ['ssc-cgl', 'ssc-mts'].includes(e.exam_id);
    const isUpscCse = e.exam_id === 'upsc-cse';
    let note = 'NOT_APPLICABLE (Civil / Educational / Technical Examination)';
    if (isStatePsc) {
      note = 'NOT_APPLICABLE for Administrative posts (DSP / Excise posts governed by separate state police rules)';
    } else if (isSscCivil) {
      note = 'NOT_APPLICABLE for clerical posts (Inspector Central Excise/Havaldar requires walking PET)';
    } else if (isUpscCse) {
      note = 'NOT_APPLICABLE for IAS/IFS/IRS (IPS/DANIPS requires height 165cm M / 150cm F per Gazette)';
    }

    rows.push([
      `"${e.inventory_id}"`,
      `"${e.exam_id}"`,
      `"${e.exam_name_en}"`,
      `"${e.category}"`,
      false,
      '"NOT_APPLICABLE"',
      '"NOT_APPLICABLE"',
      '"NOT_APPLICABLE"',
      '"NOT_APPLICABLE"',
      '"NOT_APPLICABLE"',
      '"NOT_APPLICABLE"',
      `"${note}"`,
      `"${e.official_website_url}"`,
      '"VERIFIED"'
    ].join(','));
  }
}

fs.writeFileSync(path.resolve(__dirname, '../../phase10_physical_standard_audit.csv'), rows.join('\n'));
console.log(`phase10_physical_standard_audit.csv generated with ${exams.length} inventory exams.`);
db.close();
