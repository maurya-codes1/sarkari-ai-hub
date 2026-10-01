const fs = require('fs');
const path = require('path');

const examsDataPath = path.join(__dirname, '..', 'public', 'js', 'exams-data.js');
let content = fs.readFileSync(examsDataPath, 'utf8');

const additionalBoards = [
  {
    id: "bseap-board",
    name: "Andhra Pradesh Board (BSEAP SSC 10th & BIEAP Inter 12th)",
    shortName: "BSEAP & BIEAP AP",
    category: "boards",
    conductingBody: "Directorate of Government Examinations & Board of Intermediate Education AP",
    state: "Andhra Pradesh",
    status: "Active • SSC & Inter Annual Results",
    officialUrl: "https://bse.ap.gov.in",
    applyUrl: "https://bse.ap.gov.in",
    pdfUrl: "https://bie.ap.gov.in",
    resultUrl: "https://bse.ap.gov.in",
    resultServer2: "https://resultsbie.ap.gov.in",
    digilockerUrl: "https://digilocker.gov.in",
    importantDates: {
      "SSC Board Exams": "March 2026",
      "Inter Board Exams": "March 2026",
      "Results Declaration": "April / May 2026"
    },
    fees: {
      "Regular Exam Fee": "₹125",
      "Scrutiny Fee": "₹500 per subject"
    },
    eligibility: "Class 10th SSC & Class 12th Intermediate Registered Candidates",
    ageLimit: "Min 14 years for SSC",
    vacancies: {
      "Total Candidates": "Over 11 Lakh students appear annually"
    },
    examPattern: {
      "SSC Pattern": "Telugu, Hindi, English, Mathematics, Physical Science, Social",
      "Inter Pattern": "Theory + Practical Laboratory Exams"
    },
    photoSpecs: {
      type: "photo",
      minKb: 20,
      maxKb: 50,
      targetKb: 35,
      width: 350,
      height: 450,
      requireNameDate: true,
      notes: "White background, clear front view"
    },
    signSpecs: {
      type: "signature",
      minKb: 10,
      maxKb: 30,
      targetKb: 20,
      width: 300,
      height: 120,
      notes: "Black ink on white paper"
    }
  },
  {
    id: "bsetg-board",
    name: "Telangana Board (BSETG SSC 10th & TSBIE Inter 12th)",
    shortName: "BSETG & TSBIE Telangana",
    category: "boards",
    conductingBody: "Directorate of Government Examinations & Telangana State Board of Intermediate Education",
    state: "Telangana",
    status: "Active • SSC & Inter Annual Exams",
    officialUrl: "https://bse.telangana.gov.in",
    applyUrl: "https://bse.telangana.gov.in",
    pdfUrl: "https://tsbie.cgg.gov.in",
    resultUrl: "https://results.cgg.gov.in",
    resultServer2: "https://tsbie.cgg.gov.in",
    digilockerUrl: "https://digilocker.gov.in",
    importantDates: {
      "SSC Board Exams": "March - April 2026",
      "TSBIE Inter Exams": "March 2026",
      "Results": "April / May 2026"
    },
    fees: {
      "Regular Fee": "₹125",
      "Recounting Fee": "₹100 per subject",
      "Re-verification": "₹600 per subject"
    },
    eligibility: "Class 10th SSC & Class 12th Intermediate Registered Candidates",
    ageLimit: "Min 14 years for SSC",
    vacancies: {
      "Total Candidates": "Over 9.5 Lakh students annually"
    },
    examPattern: {
      "SSC Pattern": "Telugu, Hindi, English, Maths, Science, Social",
      "Inter Pattern": "Theory + Practical"
    },
    photoSpecs: {
      type: "photo",
      minKb: 20,
      maxKb: 50,
      targetKb: 35,
      width: 350,
      height: 450,
      requireNameDate: true,
      notes: "White background"
    },
    signSpecs: {
      type: "signature",
      minKb: 10,
      maxKb: 30,
      targetKb: 20,
      width: 300,
      height: 120,
      notes: "Black ink on white paper"
    }
  },
  {
    id: "hpbose-board",
    name: "Himachal Pradesh Board (HPBOSE Dharamshala 10th & 12th)",
    shortName: "HPBOSE Himachal",
    category: "boards",
    conductingBody: "Himachal Pradesh Board of School Education, Dharamshala",
    state: "Himachal Pradesh",
    status: "Active • 10th & 12th Regular Results",
    officialUrl: "https://hpbose.org",
    applyUrl: "https://hpbose.org",
    pdfUrl: "https://hpbose.org",
    resultUrl: "https://hpbose.org/Result.aspx",
    resultServer2: "https://hpbose.org",
    digilockerUrl: "https://digilocker.gov.in",
    importantDates: {
      "10th & 12th Board Exams": "March 2026",
      "Results": "May 2026"
    },
    fees: {
      "Exam Fee": "₹600",
      "Re-evaluation Fee": "₹400 per subject"
    },
    eligibility: "Enrolled in HPBOSE affiliated school",
    ageLimit: "Min 14 years for 10th",
    vacancies: {
      "Total Candidates": "Over 2.2 Lakh candidates"
    },
    examPattern: {
      "Mode": "Offline Pen & Paper",
      "Passing Criteria": "33% marks"
    },
    photoSpecs: {
      type: "photo",
      minKb: 20,
      maxKb: 50,
      targetKb: 35,
      width: 350,
      height: 450,
      requireNameDate: true,
      notes: "Clear passport photo"
    },
    signSpecs: {
      type: "signature",
      minKb: 10,
      maxKb: 30,
      targetKb: 20,
      width: 300,
      height: 120,
      notes: "Plain white paper with blue/black pen"
    }
  },
  {
    id: "jkbose-board",
    name: "Jammu & Kashmir Board (JKBOSE Jammu & Srinagar 10th & 12th)",
    shortName: "JKBOSE J&K",
    category: "boards",
    conductingBody: "Jammu & Kashmir State Board of School Education",
    state: "Jammu & Kashmir",
    status: "Active • Soft & Hard Zone Annual Exams",
    officialUrl: "https://jkbose.nic.in",
    applyUrl: "https://jkbose.nic.in",
    pdfUrl: "https://jkbose.nic.in",
    resultUrl: "https://jkbose.nic.in/results",
    resultServer2: "https://jkbose.nic.in",
    digilockerUrl: "https://digilocker.gov.in",
    importantDates: {
      "Soft Zone Exams": "March 2026",
      "Hard Zone Exams": "April 2026",
      "Results": "June 2026"
    },
    fees: {
      "Examination Fee": "₹1,020",
      "Re-evaluation Fee": "₹490 per subject"
    },
    eligibility: "Class 10th & 12th enrolled students in J&K and Ladakh",
    ageLimit: "Min 14 years for 10th",
    vacancies: {
      "Total Candidates": "Over 1.8 Lakh students"
    },
    examPattern: {
      "Language": "English, Urdu, Hindi",
      "Marks": "100 marks per subject"
    },
    photoSpecs: {
      type: "photo",
      minKb: 20,
      maxKb: 50,
      targetKb: 35,
      width: 350,
      height: 450,
      requireNameDate: true,
      notes: "White background"
    },
    signSpecs: {
      type: "signature",
      minKb: 10,
      maxKb: 30,
      targetKb: 20,
      width: 300,
      height: 120,
      notes: "Dark ink signature"
    }
  },
  {
    id: "kerala-board",
    name: "Kerala Board (DHSE Higher Secondary & SSLC Kerala)",
    shortName: "DHSE & SSLC Kerala",
    category: "boards",
    conductingBody: "Directorate of General Education, Government of Kerala",
    state: "Kerala",
    status: "Active • SSLC & Plus Two Public Examinations",
    officialUrl: "https://pareekshabhavan.kerala.gov.in",
    applyUrl: "https://dhsekerala.gov.in",
    pdfUrl: "https://dhsekerala.gov.in",
    resultUrl: "https://keralaresults.nic.in",
    resultServer2: "https://results.kite.kerala.gov.in",
    digilockerUrl: "https://digilocker.gov.in",
    importantDates: {
      "SSLC (10th) Exams": "March 2026",
      "HSE (+2) Exams": "March 2026",
      "Results Declaration": "May 2026"
    },
    fees: {
      "Regular Exam Fee": "₹150",
      "Revaluation Fee": "₹500 per paper"
    },
    eligibility: "Regular and Private candidates registered in Kerala schools",
    ageLimit: "Minimum 14 years for SSLC",
    vacancies: {
      "Total Candidates": "Over 8.5 Lakh candidates annually"
    },
    examPattern: {
      "Medium": "Malayalam & English",
      "Grading": "Direct grading system A+ to D"
    },
    photoSpecs: {
      type: "photo",
      minKb: 20,
      maxKb: 50,
      targetKb: 35,
      width: 350,
      height: 450,
      requireNameDate: true,
      notes: "White background"
    },
    signSpecs: {
      type: "signature",
      minKb: 10,
      maxKb: 30,
      targetKb: 20,
      width: 300,
      height: 120,
      notes: "Black ink on white paper"
    }
  },
  {
    id: "gbshse-board",
    name: "Goa Board (GBSHSE Porvorim SSC 10th & HSSC 12th)",
    shortName: "GBSHSE Goa",
    category: "boards",
    conductingBody: "Goa Board of Secondary and Higher Secondary Education, Porvorim",
    state: "Goa",
    status: "Active • SSC & HSSC Term Examinations",
    officialUrl: "https://gbshse.in",
    applyUrl: "https://gbshse.in",
    pdfUrl: "https://gbshse.in",
    resultUrl: "https://results.gbshsegoa.net",
    resultServer2: "https://gbshse.in",
    digilockerUrl: "https://digilocker.gov.in",
    importantDates: {
      "SSC (10th) Exams": "March 2026",
      "HSSC (12th) Exams": "Feb - March 2026",
      "Results": "May 2026"
    },
    fees: {
      "Exam Fee": "₹1,200",
      "Verification Fee": "₹350 per subject"
    },
    eligibility: "Enrolled in Goa Board recognized high schools & higher secondary",
    ageLimit: "Min 14 years for SSC",
    vacancies: {
      "Total Candidates": "Over 40,000 students annually"
    },
    examPattern: {
      "Medium": "English, Konkani, Marathi",
      "Pattern": "Internal Assessment + Board Exam"
    },
    photoSpecs: {
      type: "photo",
      minKb: 20,
      maxKb: 50,
      targetKb: 35,
      width: 350,
      height: 450,
      requireNameDate: true,
      notes: "White background"
    },
    signSpecs: {
      type: "signature",
      minKb: 10,
      maxKb: 30,
      targetKb: 20,
      width: 300,
      height: 120,
      notes: "Clear signature"
    }
  },
  {
    id: "bsem-board",
    name: "Manipur Board (BSEM HSLC 10th & COHSEM HSE 12th)",
    shortName: "BSEM & COHSEM Manipur",
    category: "boards",
    conductingBody: "Board of Secondary Education Manipur & Council of Higher Secondary Education Manipur",
    state: "Manipur",
    status: "Active • HSLC & HSE Annual Examinations",
    officialUrl: "https://bsem.nic.in",
    applyUrl: "https://cohsem.nic.in",
    pdfUrl: "https://bsem.nic.in",
    resultUrl: "http://manresults.nic.in",
    resultServer2: "https://bsem.nic.in",
    digilockerUrl: "https://digilocker.gov.in",
    importantDates: {
      "HSLC (10th) Exam": "March 2026",
      "HSE (12th) Exam": "Feb - March 2026",
      "Results": "May 2026"
    },
    fees: {
      "Exam Fee": "₹1,000",
      "Scrutiny Fee": "₹300 per subject"
    },
    eligibility: "Regular and external candidates enrolled in Manipur schools",
    ageLimit: "Min 14 years for HSLC",
    vacancies: {
      "Total Candidates": "Over 75,000 candidates"
    },
    examPattern: {
      "Pattern": "English, Manipuri (Meetei Mayek), Science, Social Science, Maths",
      "Marks": "100 marks"
    },
    photoSpecs: {
      type: "photo",
      minKb: 20,
      maxKb: 50,
      targetKb: 35,
      width: 350,
      height: 450,
      requireNameDate: true,
      notes: "White background"
    },
    signSpecs: {
      type: "signature",
      minKb: 10,
      maxKb: 30,
      targetKb: 20,
      width: 300,
      height: 120,
      notes: "Black/blue ink"
    }
  },
  {
    id: "mbose-board",
    name: "Meghalaya Board (MBOSE Tura/Shillong SSLC 10th & HSSLC 12th)",
    shortName: "MBOSE Meghalaya",
    category: "boards",
    conductingBody: "Meghalaya Board of School Education",
    state: "Meghalaya",
    status: "Active • SSLC & HSSLC Annual Examinations",
    officialUrl: "https://www.mbose.in",
    applyUrl: "https://www.mbose.in",
    pdfUrl: "https://www.mbose.in",
    resultUrl: "https://megresults.nic.in",
    resultServer2: "https://www.mbose.in",
    digilockerUrl: "https://digilocker.gov.in",
    importantDates: {
      "SSLC (10th) Exam": "March 2026",
      "HSSLC (12th) Exam": "Feb - March 2026",
      "Results": "May 2026"
    },
    fees: {
      "Regular Exam Fee": "₹800",
      "Re-evaluation": "₹300 per subject"
    },
    eligibility: "Candidates enrolled in MBOSE affiliated schools",
    ageLimit: "Min 14 years for SSLC",
    vacancies: {
      "Total Candidates": "Over 65,000 candidates"
    },
    examPattern: {
      "Medium": "English, Khasi, Garo",
      "Pass Marks": "33%"
    },
    photoSpecs: {
      type: "photo",
      minKb: 20,
      maxKb: 50,
      targetKb: 35,
      width: 350,
      height: 450,
      requireNameDate: true,
      notes: "Passport photo"
    },
    signSpecs: {
      type: "signature",
      minKb: 10,
      maxKb: 30,
      targetKb: 20,
      width: 300,
      height: 120,
      notes: "Clear black signature"
    }
  },
  {
    id: "mbse-board",
    name: "Mizoram Board (MBSE Aizawl HSLC 10th & HSSLC 12th)",
    shortName: "MBSE Mizoram",
    category: "boards",
    conductingBody: "Mizoram Board of School Education",
    state: "Mizoram",
    status: "Active • HSLC & HSSLC Board Examinations",
    officialUrl: "https://www.mbse.edu.in",
    applyUrl: "https://www.mbse.edu.in",
    pdfUrl: "https://www.mbse.edu.in",
    resultUrl: "https://results.mbse.edu.in",
    resultServer2: "https://www.mbse.edu.in",
    digilockerUrl: "https://digilocker.gov.in",
    importantDates: {
      "HSLC (10th) Exam": "Feb - March 2026",
      "HSSLC (12th) Exam": "March 2026",
      "Results": "May 2026"
    },
    fees: {
      "Exam Fee": "₹750",
      "Re-checking Fee": "₹250 per subject"
    },
    eligibility: "Students registered in MBSE schools in Mizoram",
    ageLimit: "Min 14 years for HSLC",
    vacancies: {
      "Total Candidates": "Over 35,000 students"
    },
    examPattern: {
      "Medium": "English & Mizo",
      "Passing": "33% in aggregate"
    },
    photoSpecs: {
      type: "photo",
      minKb: 20,
      maxKb: 50,
      targetKb: 35,
      width: 350,
      height: 450,
      requireNameDate: true,
      notes: "White background"
    },
    signSpecs: {
      type: "signature",
      minKb: 10,
      maxKb: 30,
      targetKb: 20,
      width: 300,
      height: 120,
      notes: "Dark ink"
    }
  },
  {
    id: "nbse-board",
    name: "Nagaland Board (NBSE Kohima HSLC 10th & HSSLC 12th)",
    shortName: "NBSE Nagaland",
    category: "boards",
    conductingBody: "Nagaland Board of School Education, Kohima",
    state: "Nagaland",
    status: "Active • HSLC & HSSLC Annual Examinations",
    officialUrl: "https://nbsenl.edu.in",
    applyUrl: "https://nbsenl.edu.in",
    pdfUrl: "https://nbsenl.edu.in",
    resultUrl: "https://results.nbsenl.edu.in",
    resultServer2: "https://nbsenl.edu.in",
    digilockerUrl: "https://digilocker.gov.in",
    importantDates: {
      "HSLC (10th) Exam": "Feb 2026",
      "HSSLC (12th) Exam": "Feb - March 2026",
      "Results": "April 2026"
    },
    fees: {
      "Exam Fee": "₹850",
      "Rescrutiny Fee": "₹350 per subject"
    },
    eligibility: "Students registered with NBSE recognized schools",
    ageLimit: "Min 14 years for HSLC",
    vacancies: {
      "Total Candidates": "Over 40,000 candidates"
    },
    examPattern: {
      "Medium": "English Medium",
      "Passing": "33% marks per subject"
    },
    photoSpecs: {
      type: "photo",
      minKb: 20,
      maxKb: 50,
      targetKb: 35,
      width: 350,
      height: 450,
      requireNameDate: true,
      notes: "Recent passport photo"
    },
    signSpecs: {
      type: "signature",
      minKb: 10,
      maxKb: 30,
      targetKb: 20,
      width: 300,
      height: 120,
      notes: "Plain white background"
    }
  },
  {
    id: "tbse-board",
    name: "Tripura Board (TBSE Agartala Madhyamik 10th & HS 12th)",
    shortName: "TBSE Tripura",
    category: "boards",
    conductingBody: "Tripura Board of Secondary Education, Agartala",
    state: "Tripura",
    status: "Active • Madhyamik 10th & Higher Secondary 12th",
    officialUrl: "https://tbse.tripura.gov.in",
    applyUrl: "https://tbse.tripura.gov.in",
    pdfUrl: "https://tbse.tripura.gov.in",
    resultUrl: "https://tripuraresults.nic.in",
    resultServer2: "https://tbse.tripura.gov.in",
    digilockerUrl: "https://digilocker.gov.in",
    importantDates: {
      "Madhyamik (10th) Exam": "March 2026",
      "Higher Secondary (12th)": "March 2026",
      "Results": "May 2026"
    },
    fees: {
      "Regular Examination Fee": "₹650",
      "Review Fee": "₹200 per paper"
    },
    eligibility: "Enrolled in TBSE recognized institutions",
    ageLimit: "Min 14 years for 10th",
    vacancies: {
      "Total Candidates": "Over 50,000 candidates"
    },
    examPattern: {
      "Medium": "Bengali, Kokborok & English",
      "Passing": "30% in each subject"
    },
    photoSpecs: {
      type: "photo",
      minKb: 20,
      maxKb: 50,
      targetKb: 35,
      width: 350,
      height: 450,
      requireNameDate: true,
      notes: "White background"
    },
    signSpecs: {
      type: "signature",
      minKb: 10,
      maxKb: 30,
      targetKb: 20,
      width: 300,
      height: 120,
      notes: "Black ink on white paper"
    }
  }
];

// Check which of these are not yet in EXAMS_DATABASE
const existingIds = [];
const idRegex = /id:\s*["']([^"']+)["']/g;
let match;
while ((match = idRegex.exec(content)) !== null) {
  existingIds.push(match[1]);
}

const toAdd = additionalBoards.filter(b => !existingIds.includes(b.id));
console.log(`Found ${toAdd.length} boards to add to EXAMS_DATABASE.`);

if (toAdd.length > 0) {
  // Find where section 1 ends (right before // 2. CENTRAL GOVT & DEFENCE RECRUITMENT)
  const marker = "// =========================================================================";
  const centralMarker = "// 2. CENTRAL GOVT & DEFENCE RECRUITMENT";
  const centralIdx = content.indexOf(centralMarker);
  
  if (centralIdx !== -1) {
    const insertIdx = content.lastIndexOf(marker, centralIdx);
    const serializedBoards = toAdd.map(b => JSON.stringify(b, null, 2) + ',').join('\n  ');
    
    const newContent = content.substring(0, insertIdx) + 
      '  // Additional State Boards (Pan-India 31 Boards Parity)\n  ' +
      serializedBoards + '\n\n  ' + 
      content.substring(insertIdx);
      
    // Update comment at top
    const updatedContent = newContent.replace('1. 10TH & 12TH STATE & NATIONAL BOARDS (20 BOARDS)', '1. 10TH & 12TH STATE & NATIONAL BOARDS (31 BOARDS)');
    
    fs.writeFileSync(examsDataPath, updatedContent, 'utf8');
    console.log(`Successfully added ${toAdd.length} boards to EXAMS_DATABASE in exams-data.js!`);
  } else {
    console.error('Could not find centralMarker in exams-data.js');
  }
}
