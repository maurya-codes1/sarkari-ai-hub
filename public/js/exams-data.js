// Comprehensive Pan-India Database of Indian Exams, State Boards, Entrance & Teaching Tests
// Fully Detailed Schema with Official Links, Syllabus, Dates, Fees, Photo/Sign Specs & Eligibility

const EXAMS_DATABASE = [
  // =========================================================================
  // 1. 10TH & 12TH STATE & NATIONAL BOARDS (20 BOARDS)
  // =========================================================================
  {
    id: "cbse-board",
    name: "CBSE Board (Class 10th & 12th)",
    shortName: "CBSE 10th/12th",
    category: "boards",
    conductingBody: "Central Board of Secondary Education",
    state: "All India / Central",
    status: "Active • Re-evaluation & Results",
    officialUrl: "https://www.cbse.gov.in",
    applyUrl: "https://parikshasangam.cbse.gov.in",
    pdfUrl: "https://www.cbse.gov.in/cbsenew/circulars.html",
    resultUrl: "https://cbseresults.nic.in",
    resultServer2: "https://cbseresults.nic.in",
    digilockerUrl: "https://digilocker.gov.in",
    importantDates: {
      "Exam Date Sheet Released": "December 2025",
      "Class 10th Board Exams": "15 Feb - 21 March 2026",
      "Class 12th Board Exams": "15 Feb - 05 April 2026",
      "Main Result Declaration": "May 2026",
      "Scrutiny & Re-checking": "3 days post result declaration"
    },
    fees: {
      "Regular Student (All Subjects)": "₹1,500",
      "Verification of Marks": "₹500 per subject",
      "Photocopy of Answer Sheet": "₹700 (12th) / ₹500 (10th)",
      "Re-evaluation Fee": "₹100 per question"
    },
    eligibility: "Regular or Private candidate enrolled in CBSE affiliated school",
    ageLimit: "Min 14 yrs for 10th, Min 16 yrs for 12th as of 31st March",
    vacancies: {
      "Total Candidates": "Over 38 Lakh students annually across India",
      "Passing Criteria": "Minimum 33% marks in theory + practical separately"
    },
    examPattern: {
      "Mode": "Pen & Paper (Offline Board Exam)",
      "Duration": "3 Hours per Subject",
      "Total Marks": "100 Marks (80 Theory + 20 Internal Assessment)",
      "Negative Marking": "No Negative Marking"
    },
    photoSpecs: {
      type: "photo",
      minKb: 20,
      maxKb: 50,
      targetKb: 35,
      width: 350,
      height: 450,
      aspectRatio: "3.5:4.5",
      requireNameDate: true,
      notes: "White background, clear view of eyes and ears, name and date stamped below"
    },
    signSpecs: {
      type: "signature",
      minKb: 10,
      maxKb: 20,
      targetKb: 15,
      width: 300,
      height: 120,
      notes: "Black ink on white paper, strictly running hand (no capitals)"
    }
  },
  {
    id: "icse-cisce",
    name: "ICSE & ISC Board (Class 10th & 12th)",
    shortName: "CISCE (ICSE / ISC)",
    category: "boards",
    conductingBody: "Council for the Indian School Certificate Examinations",
    state: "All India / Central",
    status: "Annual Exams & Recheck Portal",
    officialUrl: "https://cisce.org",
    applyUrl: "https://cisce.org",
    pdfUrl: "https://cisce.org/notice-board",
    resultUrl: "https://results.cisce.org",
    resultServer2: "https://cisce.org",
    digilockerUrl: "https://digilocker.gov.in",
    importantDates: {
      "ICSE 10th Exams": "February - March 2026",
      "ISC 12th Exams": "February - April 2026",
      "Result Declaration": "May 2026",
      "Recheck Application": "Within 7 days of results"
    },
    fees: {
      "Recheck Fee per Subject": "₹1,000",
      "Improvement Exam Fee": "₹1,500"
    },
    eligibility: "Students registered under CISCE affiliated schools in India and abroad",
    ageLimit: "Minimum 14 years for Class 10",
    vacancies: {
      "Total Candidates": "Over 2.5 Lakh students",
      "Passing Marks": "33% for ICSE 10th, 35% for ISC 12th"
    },
    examPattern: {
      "Mode": "Offline Pen-Paper Examination",
      "Pattern": "80 Marks Theory + 20 Marks Internal Project Assessment"
    },
    photoSpecs: {
      type: "photo",
      minKb: 20,
      maxKb: 50,
      targetKb: 35,
      width: 350,
      height: 450,
      requireNameDate: false,
      notes: "Light background passport photo, formal school uniform preferred"
    },
    signSpecs: {
      type: "signature",
      minKb: 10,
      maxKb: 20,
      targetKb: 15,
      width: 300,
      height: 100,
      notes: "Black ink signature"
    }
  },
  {
    id: "upmsp-board",
    name: "UP Board (High School & Intermediate 10th/12th)",
    shortName: "UPMSP (UP Board)",
    category: "boards",
    conductingBody: "Uttar Pradesh Madhyamik Shiksha Parishad, Prayagraj",
    state: "Uttar Pradesh",
    status: "Result & Scrutiny Portal Active",
    officialUrl: "https://upmsp.edu.in",
    applyUrl: "https://upmsp.edu.in",
    pdfUrl: "https://upmsp.edu.in",
    resultUrl: "https://upresults.nic.in",
    resultServer2: "https://upmsp.edu.in",
    digilockerUrl: "https://digilocker.gov.in",
    importantDates: {
      "Time Table Release": "January 2026",
      "Board Examination": "22 Feb - 09 March 2026",
      "Evaluation of Copies": "16 March - 31 March 2026",
      "Official Result": "April 2026"
    },
    fees: {
      "Exam Fee High School": "₹500",
      "Exam Fee Intermediate": "₹600",
      "Scrutiny / Re-check Fee": "₹500 per paper"
    },
    eligibility: "Students registered under UP Board Class 10/12 in recognized UP schools",
    ageLimit: "Minimum 14 years for 10th",
    vacancies: {
      "Total Students Registered": "55 Lakh+ candidates (Bharat's Largest State Board)",
      "Passing Criteria": "Minimum 33% marks aggregate"
    },
    examPattern: {
      "Mode": "Offline Pen-Paper Exam",
      "Marking": "70 Marks Theory + 30 Marks Project/Practical for Class 10th",
      "OMR Section": "20 Multiple Choice Questions (MCQs) on OMR Sheet for Class 10th"
    },
    photoSpecs: {
      type: "photo",
      minKb: 20,
      maxKb: 50,
      targetKb: 35,
      width: 350,
      height: 450,
      requireNameDate: true,
      notes: "Passport photo with name and DOOP"
    },
    signSpecs: {
      type: "signature",
      minKb: 5,
      maxKb: 20,
      targetKb: 12,
      width: 250,
      height: 100,
      notes: "Clear running signature"
    }
  },
  {
    id: "bseb-bihar",
    name: "Bihar Board BSEB (Matric 10th & Inter 12th)",
    shortName: "BSEB Bihar Board",
    category: "boards",
    conductingBody: "Bihar School Examination Board, Patna",
    state: "Bihar",
    status: "Matric & Inter Annual Result Active",
    officialUrl: "https://biharboardonline.com",
    applyUrl: "https://biharboardonline.com",
    pdfUrl: "https://biharboardonline.com",
    resultUrl: "http://secondary.biharboardonline.com",
    resultServer2: "https://bsebinter.org",
    digilockerUrl: "https://digilocker.gov.in",
    importantDates: {
      "Inter (12th) Exam": "01 Feb - 12 Feb 2026",
      "Matric (10th) Exam": "15 Feb - 23 Feb 2026",
      "Inter Result": "March 2026",
      "Matric Result": "March / April 2026"
    },
    fees: {
      "Scrutiny Fee per Subject": "₹120",
      "Compartment Exam Fee": "₹950"
    },
    eligibility: "Class 10th Matriculation & 12th Intermediate Registered Candidates",
    ageLimit: "Minimum 14 years for 10th",
    vacancies: {
      "Total Candidates": "Over 30 Lakh students appear every year"
    },
    examPattern: {
      "Objective Section": "50% MCQs on OMR sheet with 100 choices",
      "Subjective Section": "50% Descriptive questions"
    },
    photoSpecs: {
      type: "photo",
      minKb: 20,
      maxKb: 100,
      targetKb: 50,
      width: 350,
      height: 450,
      requireNameDate: true,
      notes: "White or light background"
    },
    signSpecs: {
      type: "signature",
      minKb: 10,
      maxKb: 50,
      targetKb: 25,
      width: 300,
      height: 120,
      notes: "Black or blue ink on plain white paper"
    }
  },
  {
    id: "maharashtra-board",
    name: "Maharashtra State Board (SSC 10th & HSC 12th)",
    shortName: "MSBSHSE Maharashtra",
    category: "boards",
    conductingBody: "Maharashtra State Board of Secondary & Higher Secondary Education, Pune",
    state: "Maharashtra",
    status: "SSC & HSC Results & Verification Live",
    officialUrl: "https://mahahsscboard.in",
    applyUrl: "https://mahahsscboard.in",
    pdfUrl: "https://mahahsscboard.in",
    resultUrl: "https://mahahsscboard.in",
    resultServer2: "https://mahahsscboard.in",
    digilockerUrl: "https://digilocker.gov.in",
    importantDates: {
      "HSC 12th Exam": "21 Feb - 19 March 2026",
      "SSC 10th Exam": "01 March - 26 March 2026",
      "HSC Result": "May 2026",
      "SSC Result": "June 2026"
    },
    fees: {
      "Verification of Marks": "₹300 per subject",
      "Photocopy of Answer Sheet": "₹400 per subject",
      "Re-evaluation Fee": "₹300 per paper"
    },
    eligibility: "Candidates enrolled in recognized schools/junior colleges in Maharashtra",
    ageLimit: "Minimum 14 years for SSC",
    vacancies: {
      "Total Candidates": "Over 31 Lakh students (16 Lakh SSC + 15 Lakh HSC)"
    },
    examPattern: {
      "SSC": "Language, Mathematics, Science, Social Sciences (100 marks each)",
      "HSC": "Arts, Science, Commerce streams with practical/internal marking"
    },
    photoSpecs: {
      type: "photo",
      minKb: 15,
      maxKb: 50,
      targetKb: 30,
      width: 350,
      height: 450,
      requireNameDate: false,
      notes: "Clear front facing photo with ears visible"
    },
    signSpecs: {
      type: "signature",
      minKb: 10,
      maxKb: 30,
      targetKb: 20,
      width: 250,
      height: 100,
      notes: "Black ink on white background"
    }
  },
  {
    id: "rbse-rajasthan",
    name: "Rajasthan Board (RBSE 10th & 12th Ajmer)",
    shortName: "RBSE Rajasthan",
    category: "boards",
    conductingBody: "Board of Secondary Education Rajasthan, Ajmer",
    state: "Rajasthan",
    status: "Annual Secondary & Senior Secondary Portal",
    officialUrl: "https://rajeduboard.rajasthan.gov.in",
    applyUrl: "https://rajeduboard.rajasthan.gov.in",
    pdfUrl: "https://rajeduboard.rajasthan.gov.in",
    resultUrl: "https://rajeduboard.rajasthan.gov.in",
    resultServer2: "https://rajeduboard.rajasthan.gov.in",
    digilockerUrl: "https://digilocker.gov.in",
    importantDates: {
      "12th Senior Secondary Exam": "15 Feb - 30 March 2026",
      "10th Secondary Exam": "20 Feb - 25 March 2026",
      "Result Declaration": "May / June 2026"
    },
    fees: {
      "Scrutiny Fee per Subject": "₹300 (Within 10 days of result)",
      "Late Scrutiny Fee": "₹600 per subject"
    },
    eligibility: "Regular/Private students in RBSE affiliated schools",
    ageLimit: "Minimum 14 years as on 31st December for 10th",
    vacancies: {
      "Total Candidates": "Over 20 Lakh students appear annually"
    },
    examPattern: {
      "Theory Marks": "80 Marks per Subject",
      "Sessional Marks": "20 Marks sent by school",
      "Passing Marks": "33% aggregate in each subject"
    },
    photoSpecs: {
      type: "photo",
      minKb: 20,
      maxKb: 50,
      targetKb: 35,
      width: 350,
      height: 450,
      requireNameDate: false,
      notes: "Color passport photo with white/light background"
    },
    signSpecs: {
      type: "signature",
      minKb: 10,
      maxKb: 20,
      targetKb: 15,
      width: 280,
      height: 100,
      notes: "Running handwriting signature"
    }
  },
  {
    id: "mpbse-board",
    name: "MP Board (MPBSE 10th & 12th Bhopal)",
    shortName: "MPBSE Madhya Pradesh",
    category: "boards",
    conductingBody: "Madhya Pradesh Board of Secondary Education, Bhopal",
    state: "Madhya Pradesh",
    status: "Ruk Jana Nahi & Annual Result Active",
    officialUrl: "https://mpbse.nic.in",
    applyUrl: "https://mpbse.mponline.gov.in",
    pdfUrl: "https://mpbse.nic.in",
    resultUrl: "https://mpbse.nic.in",
    resultServer2: "https://mpbse.mponline.gov.in",
    digilockerUrl: "https://digilocker.gov.in",
    importantDates: {
      "Class 10th & 12th Exam": "05 Feb - 10 March 2026",
      "Result Declaration": "April 2026",
      "Ruk Jana Nahi Yojna": "May / June 2026"
    },
    fees: {
      "Retotaling Fee": "₹100 per subject",
      "Answer Sheet Photocopy": "₹500 per subject"
    },
    eligibility: "Enrolled students in MP Board recognized government & private schools",
    ageLimit: "Minimum 14 years for Class 10",
    vacancies: {
      "Total Candidates": "Over 18 Lakh candidates"
    },
    examPattern: {
      "Pattern": "75 Marks Theory + 25 Marks Project Work (Class 10)",
      "Class 12": "80 Marks Theory + 20 Practical / 70 Theory + 30 Practical"
    },
    photoSpecs: {
      type: "photo",
      minKb: 20,
      maxKb: 50,
      targetKb: 35,
      width: 350,
      height: 450,
      requireNameDate: true,
      notes: "Passport photo with student name and date of photo"
    },
    signSpecs: {
      type: "signature",
      minKb: 10,
      maxKb: 20,
      targetKb: 15,
      width: 300,
      height: 100,
      notes: "Signature in black ballpoint pen"
    }
  },
  {
    id: "wbbse-wb",
    name: "West Bengal Board (Madhyamik 10th & WBCHSE 12th)",
    shortName: "WBBSE & WBCHSE Bengal",
    category: "boards",
    conductingBody: "West Bengal Board of Secondary Education & Higher Secondary Council",
    state: "West Bengal",
    status: "Madhyamik & Uchha Madhyamik Portal",
    officialUrl: "https://wbbse.wb.gov.in",
    applyUrl: "https://wbchse.wb.gov.in",
    pdfUrl: "https://wbbse.wb.gov.in",
    resultUrl: "https://wbresults.nic.in",
    resultServer2: "https://wbbse.wb.gov.in",
    digilockerUrl: "https://digilocker.gov.in",
    importantDates: {
      "Madhyamik (10th) Exam": "02 Feb - 12 Feb 2026",
      "Higher Secondary (12th) Exam": "16 Feb - 29 Feb 2026",
      "Results Published": "May 2026"
    },
    fees: {
      "Post Publication Scrutiny (PPS)": "₹100 per subject",
      "Post Publication Review (PPR)": "₹150 per subject"
    },
    eligibility: "Candidates enrolled in WBBSE / WBCHSE affiliated institutions",
    ageLimit: "Minimum 14 years for Madhyamik",
    vacancies: {
      "Total Candidates": "Over 17 Lakh students (10 Lakh Madhyamik + 7.5 Lakh HS)"
    },
    examPattern: {
      "Madhyamik": "7 Compulsory Subjects (First Lang, Second Lang, Math, Phys Sci, Life Sci, Hist, Geog) 90 Theory + 10 Oral each",
      "HS": "Language + 3 Elective + 1 Optional"
    },
    photoSpecs: {
      type: "photo",
      minKb: 20,
      maxKb: 50,
      targetKb: 35,
      width: 350,
      height: 450,
      requireNameDate: false,
      notes: "White background passport photo"
    },
    signSpecs: {
      type: "signature",
      minKb: 10,
      maxKb: 20,
      targetKb: 15,
      width: 300,
      height: 100,
      notes: "Clear black ink signature"
    }
  },
  {
    id: "tndge-tamilnadu",
    name: "Tamil Nadu State Board (SSLC 10th & HSE +1, +2)",
    shortName: "TNDGE Tamil Nadu",
    category: "boards",
    conductingBody: "Directorate of Government Examinations, Chennai",
    state: "Tamil Nadu",
    status: "SSLC & HSE Public Exam & Results Active",
    officialUrl: "https://dge.tn.gov.in",
    applyUrl: "https://dge.tn.gov.in",
    pdfUrl: "https://dge.tn.gov.in",
    resultUrl: "https://tnresults.nic.in",
    resultServer2: "https://dge.tn.gov.in",
    digilockerUrl: "https://digilocker.gov.in",
    importantDates: {
      "HSE (+2) Exam": "01 March - 22 March 2026",
      "SSLC (10th) Exam": "26 March - 08 April 2026",
      "Result Release": "May 2026"
    },
    fees: {
      "Retotalling Fee": "₹205 per subject",
      "Answer Script Copy": "₹275 per subject"
    },
    eligibility: "Students studying in government and matriculation schools across Tamil Nadu",
    ageLimit: "Minimum 14 years for SSLC",
    vacancies: {
      "Total Candidates": "Over 16 Lakh candidates (9 Lakh SSLC + 7.5 Lakh HSE)"
    },
    examPattern: {
      "SSLC": "Language, English, Mathematics, Science, Social Science (100 Marks each)",
      "Passing Marks": "35 Marks out of 100 in each subject"
    },
    photoSpecs: {
      type: "photo",
      minKb: 10,
      maxKb: 50,
      targetKb: 25,
      width: 350,
      height: 450,
      requireNameDate: false,
      notes: "Passport photo with clear face coverage"
    },
    signSpecs: {
      type: "signature",
      minKb: 10,
      maxKb: 20,
      targetKb: 15,
      width: 300,
      height: 100,
      notes: "Blue or black ink signature"
    }
  },
  {
    id: "kseab-karnataka",
    name: "Karnataka Board (KSEAB SSLC 10th & 2nd PUC)",
    shortName: "KSEAB Karnataka",
    category: "boards",
    conductingBody: "Karnataka School Examination and Assessment Board, Bengaluru",
    state: "Karnataka",
    status: "Exam 1, 2, 3 Portal Live",
    officialUrl: "https://kseab.karnataka.gov.in",
    applyUrl: "https://kseab.karnataka.gov.in",
    pdfUrl: "https://kseab.karnataka.gov.in",
    resultUrl: "https://karresults.nic.in",
    resultServer2: "https://kseab.karnataka.gov.in",
    digilockerUrl: "https://digilocker.gov.in",
    importantDates: {
      "2nd PUC Exam 1": "01 March - 22 March 2026",
      "SSLC Exam 1": "25 March - 06 April 2026",
      "Exam 1 Result": "May 2026",
      "Exam 2 (Improvement)": "June 2026"
    },
    fees: {
      "Revaluation per Subject": "₹805",
      "Scanned Answer Sheet Copy": "₹405"
    },
    eligibility: "Registered students in Karnataka state curriculum schools and PU colleges",
    ageLimit: "Minimum 14 years for SSLC",
    vacancies: {
      "Total Candidates": "Over 15 Lakh students (8.5 Lakh SSLC + 7 Lakh PUC)"
    },
    examPattern: {
      "3-Exam System": "Karnataka offers Exam 1, Exam 2, and Exam 3 where best score among all attempts is chosen"
    },
    photoSpecs: {
      type: "photo",
      minKb: 20,
      maxKb: 50,
      targetKb: 35,
      width: 350,
      height: 450,
      requireNameDate: false,
      notes: "Color passport photo against light background"
    },
    signSpecs: {
      type: "signature",
      minKb: 10,
      maxKb: 20,
      targetKb: 15,
      width: 250,
      height: 100,
      notes: "Black ink running signature"
    }
  },
  {
    id: "gseb-gujarat",
    name: "Gujarat Board (GSEB SSC 10th & HSC 12th)",
    shortName: "GSEB Gujarat",
    category: "boards",
    conductingBody: "Gujarat Secondary and Higher Secondary Education Board, Gandhinagar",
    state: "Gujarat",
    status: "SSC & HSC Science / General Results Active",
    officialUrl: "https://www.gseb.org",
    applyUrl: "https://www.gseb.org",
    pdfUrl: "https://www.gseb.org",
    resultUrl: "https://www.gseb.org",
    resultServer2: "https://result.gseb.org",
    digilockerUrl: "https://digilocker.gov.in",
    importantDates: {
      "SSC & HSC Board Exam": "11 March - 26 March 2026",
      "HSC Science Result": "May 2026",
      "SSC Result": "May / June 2026"
    },
    fees: {
      "Re-checking Fee per Subject": "₹100",
      "Re-assessment Fee per Subject": "₹300"
    },
    eligibility: "Students registered under GSEB schools in Gujarat",
    ageLimit: "Minimum 14 years for SSC",
    vacancies: {
      "Total Candidates": "Over 13 Lakh students appear annually"
    },
    examPattern: {
      "Pattern": "Science Stream has 50% MCQs + 50% Descriptive questions. General stream has 100 marks descriptive paper."
    },
    photoSpecs: {
      type: "photo",
      minKb: 15,
      maxKb: 50,
      targetKb: 30,
      width: 350,
      height: 450,
      requireNameDate: false,
      notes: "Recent passport photo with 80% face view"
    },
    signSpecs: {
      type: "signature",
      minKb: 10,
      maxKb: 20,
      targetKb: 15,
      width: 300,
      height: 100,
      notes: "Clear black signature"
    }
  },
  {
    id: "bseh-haryana",
    name: "Haryana Board (BSEH Bhiwani 10th & 12th)",
    shortName: "BSEH Haryana",
    category: "boards",
    conductingBody: "Board of School Education Haryana, Bhiwani",
    state: "Haryana",
    status: "Annual Secondary & Sr. Secondary Portal",
    officialUrl: "https://bseh.org.in",
    applyUrl: "https://bseh.org.in",
    pdfUrl: "https://bseh.org.in",
    resultUrl: "https://bseh.org.in/all-results",
    resultServer2: "https://bseh.org.in",
    digilockerUrl: "https://digilocker.gov.in",
    importantDates: {
      "Board Exams": "27 Feb - 02 April 2026",
      "Result Published": "May 2026",
      "Compartment Exams": "July 2026"
    },
    fees: {
      "Re-checking Fee": "₹250 per subject",
      "Re-evaluation Fee": "₹1,000 per subject (BPL: ₹800)"
    },
    eligibility: "Regular and Open School (HOS) candidates in Haryana",
    ageLimit: "Minimum 14 years for 10th",
    vacancies: {
      "Total Candidates": "Over 6 Lakh students"
    },
    examPattern: {
      "80/20 Rule": "80 Marks External Board Theory + 20 Marks Internal Assessment"
    },
    photoSpecs: {
      type: "photo",
      minKb: 20,
      maxKb: 50,
      targetKb: 35,
      width: 350,
      height: 450,
      requireNameDate: true,
      notes: "White background, student name and date of photo stamped"
    },
    signSpecs: {
      type: "signature",
      minKb: 10,
      maxKb: 20,
      targetKb: 15,
      width: 300,
      height: 100,
      notes: "Black ink on white paper"
    }
  },
  {
    id: "jac-jharkhand",
    name: "Jharkhand Board (JAC Ranchi Matric 10th & Inter 12th)",
    shortName: "JAC Jharkhand",
    category: "boards",
    conductingBody: "Jharkhand Academic Council, Ranchi",
    state: "Jharkhand",
    status: "Matric & Inter Annual Result Active",
    officialUrl: "https://jac.jharkhand.gov.in",
    applyUrl: "https://jac.jharkhand.gov.in",
    pdfUrl: "https://jac.jharkhand.gov.in",
    resultUrl: "https://jacresults.com",
    resultServer2: "https://jac.jharkhand.gov.in",
    digilockerUrl: "https://digilocker.gov.in",
    importantDates: {
      "Matric & Inter Exams": "06 Feb - 26 Feb 2026",
      "Matric Result": "April 2026",
      "Inter Result": "April / May 2026"
    },
    fees: {
      "Scrutiny Fee per Subject": "₹450 (Matric) / ₹750 (Inter)"
    },
    eligibility: "Students registered under JAC in Jharkhand schools/colleges",
    ageLimit: "Minimum 14 years for Matric",
    vacancies: {
      "Total Candidates": "Over 7.5 Lakh students"
    },
    examPattern: {
      "OMR + Answer Sheet": "Part-1 (OMR Objective) + Part-2 (Subjective Descriptive)"
    },
    photoSpecs: {
      type: "photo",
      minKb: 20,
      maxKb: 50,
      targetKb: 35,
      width: 350,
      height: 450,
      requireNameDate: false,
      notes: "Passport photo with white background"
    },
    signSpecs: {
      type: "signature",
      minKb: 10,
      maxKb: 20,
      targetKb: 15,
      width: 300,
      height: 100,
      notes: "Black or blue ink signature"
    }
  },
  {
    id: "pseb-punjab",
    name: "Punjab Board (PSEB Mohali 10th & 12th)",
    shortName: "PSEB Punjab",
    category: "boards",
    conductingBody: "Punjab School Education Board, SAS Nagar (Mohali)",
    state: "Punjab",
    status: "Matriculation & Senior Secondary Active",
    officialUrl: "https://www.pseb.ac.in",
    applyUrl: "https://www.pseb.ac.in",
    pdfUrl: "https://www.pseb.ac.in",
    resultUrl: "https://punjab.indiaresults.com",
    resultServer2: "https://www.pseb.ac.in",
    digilockerUrl: "https://digilocker.gov.in",
    importantDates: {
      "Senior Secondary Exam": "13 Feb - 30 March 2026",
      "Matriculation Exam": "13 Feb - 05 March 2026",
      "Results": "April / May 2026"
    },
    fees: {
      "Re-checking Fee": "₹1,000 per subject",
      "Re-evaluation Fee": "₹1,500 per subject"
    },
    eligibility: "Candidates enrolled in PSEB recognized schools in Punjab",
    ageLimit: "Minimum 14 years for 10th",
    vacancies: {
      "Total Candidates": "Over 6.5 Lakh students"
    },
    examPattern: {
      "Pattern": "Theory (80/70 marks) + Practical/CCE (20/30 marks)"
    },
    photoSpecs: {
      type: "photo",
      minKb: 15,
      maxKb: 50,
      targetKb: 30,
      width: 350,
      height: 450,
      requireNameDate: false,
      notes: "Passport photo with light background"
    },
    signSpecs: {
      type: "signature",
      minKb: 10,
      maxKb: 20,
      targetKb: 15,
      width: 250,
      height: 100,
      notes: "Running English/Punjabi signature"
    }
  },
  {
    id: "nios-board",
    name: "NIOS Board (National Institute of Open Schooling)",
    shortName: "NIOS Open School",
    category: "boards",
    conductingBody: "National Institute of Open Schooling (Ministry of Education)",
    state: "All India / National",
    status: "Block 1 & 2 Admission & ODE Portal Active",
    officialUrl: "https://nios.ac.in",
    applyUrl: "https://sdmis.nios.ac.in",
    pdfUrl: "https://www.nios.ac.in",
    resultUrl: "https://results.nios.ac.in",
    resultServer2: "https://sdmis.nios.ac.in",
    digilockerUrl: "https://digilocker.gov.in",
    importantDates: {
      "April/May Public Exam": "April - May 2026",
      "Oct/Nov Public Exam": "October - November 2026",
      "On-Demand Exam (ODE)": "Every Month (Round the Year)"
    },
    fees: {
      "Secondary Course Fee (5 Subjects)": "₹1,800 (Male) / ₹1,450 (Female)",
      "Senior Secondary (5 Subjects)": "₹2,000 (Male) / ₹1,650 (Female)",
      "Public Exam Fee per Subject": "₹250"
    },
    eligibility: "14+ years for 10th (Secondary), 10th pass for 12th (Sr. Secondary)",
    ageLimit: "Minimum 14 years for 10th, Minimum 15 years for 12th. No upper age limit.",
    vacancies: {
      "Total Learners": "Over 5 Lakh active open school students across India"
    },
    examPattern: {
      "Flexible System": "TMA (Tutor Marked Assignment) 20% weightage + 80% Board Theory Exam. Credit accumulation up to 5 years."
    },
    photoSpecs: {
      type: "photo",
      minKb: 20,
      maxKb: 100,
      targetKb: 50,
      width: 350,
      height: 450,
      requireNameDate: false,
      notes: "Clear front passport photo without caps or dark glasses"
    },
    signSpecs: {
      type: "signature",
      minKb: 10,
      maxKb: 50,
      targetKb: 25,
      width: 300,
      height: 120,
      notes: "Black ink signature on clean white paper"
    }
  },
  {
    id: "cgbse-chhattisgarh",
    name: "Chhattisgarh Board (CGBSE Raipur 10th & 12th)",
    shortName: "CGBSE Chhattisgarh",
    category: "boards",
    conductingBody: "Chhattisgarh Board of Secondary Education, Raipur",
    state: "Chhattisgarh",
    status: "High School & Higher Secondary Active",
    officialUrl: "https://cgbse.nic.in",
    applyUrl: "https://cgbse.nic.in",
    pdfUrl: "https://cgbse.nic.in",
    resultUrl: "https://results.cg.nic.in",
    resultServer2: "https://cgbse.nic.in",
    digilockerUrl: "https://digilocker.gov.in",
    importantDates: {
      "12th Board Exam": "01 March - 23 March 2026",
      "10th Board Exam": "02 March - 21 March 2026",
      "Results": "May 2026"
    },
    fees: {
      "Retotalling Fee": "₹100 per subject",
      "Re-evaluation Fee": "₹500 per subject"
    },
    eligibility: "Students registered under CGBSE in Chhattisgarh",
    ageLimit: "Minimum 14 years for 10th",
    vacancies: {
      "Total Candidates": "Over 6 Lakh students"
    },
    examPattern: {
      "Pattern": "75 Marks Theory + 25 Marks Project/Practical for Class 10"
    },
    photoSpecs: {
      type: "photo",
      minKb: 20,
      maxKb: 50,
      targetKb: 35,
      width: 350,
      height: 450,
      requireNameDate: true,
      notes: "Student name and date of photo required"
    },
    signSpecs: {
      type: "signature",
      minKb: 10,
      maxKb: 20,
      targetKb: 15,
      width: 300,
      height: 100,
      notes: "Clear black signature"
    }
  },
  {
    id: "chse-bse-odisha",
    name: "Odisha Board (BSE Matric 10th & CHSE +2 Council)",
    shortName: "BSE & CHSE Odisha",
    category: "boards",
    conductingBody: "Board of Secondary Education Odisha & Council of Higher Secondary Education",
    state: "Odisha",
    status: "HSC Matric & +2 Annual Portal Active",
    officialUrl: "https://bseodisha.ac.in",
    applyUrl: "https://chseodisha.nic.in",
    pdfUrl: "https://bseodisha.ac.in",
    resultUrl: "https://orissaresults.nic.in",
    resultServer2: "https://bseodisha.ac.in",
    digilockerUrl: "https://digilocker.gov.in",
    importantDates: {
      "HSC (10th) Exam": "20 Feb - 04 March 2026",
      "+2 CHSE Exam": "16 Feb - 20 March 2026",
      "Results Published": "May 2026"
    },
    fees: {
      "Re-addition of Marks": "₹200 per subject",
      "Answer Script Photocopy": "₹500"
    },
    eligibility: "Candidates in BSE / CHSE affiliated schools and colleges in Odisha",
    ageLimit: "Minimum 14 years for HSC",
    vacancies: {
      "Total Candidates": "Over 8.5 Lakh students (5.5 Lakh Matric + 3 Lakh +2)"
    },
    examPattern: {
      "Matric": "50 Marks Multiple Choice Questions (OMR) + 50 Marks Subjective per subject"
    },
    photoSpecs: {
      type: "photo",
      minKb: 20,
      maxKb: 50,
      targetKb: 35,
      width: 350,
      height: 450,
      requireNameDate: false,
      notes: "Passport photo against light background"
    },
    signSpecs: {
      type: "signature",
      minKb: 10,
      maxKb: 20,
      targetKb: 15,
      width: 250,
      height: 100,
      notes: "Black ink running signature"
    }
  },
  {
    id: "ubse-uttarakhand",
    name: "Uttarakhand Board (UBSE Ramnagar 10th & 12th)",
    shortName: "UBSE Uttarakhand",
    category: "boards",
    conductingBody: "Uttarakhand Board of School Education, Ramnagar (Nainital)",
    state: "Uttarakhand",
    status: "High School & Intermediate Examination Portal",
    officialUrl: "https://ubse.uk.gov.in",
    applyUrl: "https://ubse.uk.gov.in",
    pdfUrl: "https://ubse.uk.gov.in",
    resultUrl: "https://ubse.uk.gov.in",
    resultServer2: "https://ubse.uk.gov.in",
    digilockerUrl: "https://digilocker.gov.in",
    importantDates: {
      "Board Examination": "27 Feb - 16 March 2026",
      "Result Announcement": "April / May 2026"
    },
    fees: {
      "Scrutiny Fee per Subject": "₹250"
    },
    eligibility: "Students registered under UBSE recognized schools in Uttarakhand",
    ageLimit: "Minimum 14 years for 10th",
    vacancies: {
      "Total Candidates": "Over 2.5 Lakh students"
    },
    examPattern: {
      "Scheme": "80 Marks Theory + 20 Marks Practical/Internal Assessment"
    },
    photoSpecs: {
      type: "photo",
      minKb: 15,
      maxKb: 50,
      targetKb: 30,
      width: 350,
      height: 450,
      requireNameDate: false,
      notes: "Passport photo with clear lighting"
    },
    signSpecs: {
      type: "signature",
      minKb: 10,
      maxKb: 20,
      targetKb: 15,
      width: 280,
      height: 100,
      notes: "Black ink signature"
    }
  },
  {
    id: "seba-ahsec-assam",
    name: "Assam Board (SEBA HSLC 10th & AHSEC HS 12th)",
    shortName: "SEBA & AHSEC Assam",
    category: "boards",
    conductingBody: "Assam State School Education Board (ASSEB - SEBA / AHSEC)",
    state: "Assam",
    status: "HSLC & HS Annual Board Examination Active",
    officialUrl: "https://sebaonline.org",
    applyUrl: "https://ahsec.assam.gov.in",
    pdfUrl: "https://sebaonline.org",
    resultUrl: "https://site.sebaonline.org",
    resultServer2: "https://ahsec.assam.gov.in",
    digilockerUrl: "https://digilocker.gov.in",
    importantDates: {
      "HSLC 10th Exam": "16 Feb - 04 March 2026",
      "HS 12th Exam": "13 Feb - 13 March 2026",
      "Results": "April / May 2026"
    },
    fees: {
      "Re-checking Fee per Subject": "₹350",
      "Photocopy of Answer Script": "₹550"
    },
    eligibility: "Candidates enrolled in government & provincialized schools in Assam",
    ageLimit: "Minimum 14 years for HSLC",
    vacancies: {
      "Total Candidates": "Over 7 Lakh students (4.2 Lakh HSLC + 2.8 Lakh HS)"
    },
    examPattern: {
      "OMR System": "50% MCQs on OMR sheet + 50% Descriptive questions for Core Subjects"
    },
    photoSpecs: {
      type: "photo",
      minKb: 20,
      maxKb: 50,
      targetKb: 35,
      width: 350,
      height: 450,
      requireNameDate: false,
      notes: "Passport photo against white background"
    },
    signSpecs: {
      type: "signature",
      minKb: 10,
      maxKb: 20,
      targetKb: 15,
      width: 300,
      height: 100,
      notes: "Signature in black ballpoint pen"
    }
  },
  {
    id: "tsbie-bieap",
    name: "Telangana & AP Board (TSBIE & BIEAP Inter 1st/2nd Yr)",
    shortName: "TSBIE & BIEAP (TS/AP)",
    category: "boards",
    conductingBody: "Telangana State Board of Intermediate Education & Andhra Pradesh BIE",
    state: "Telangana & Andhra Pradesh",
    status: "IPE 1st & 2nd Year Results & Re-counting Portal",
    officialUrl: "https://bse.telangana.gov.in",
    applyUrl: "https://bie.ap.gov.in",
    pdfUrl: "https://bse.telangana.gov.in",
    resultUrl: "https://results.cgg.gov.in",
    resultServer2: "https://bse.telangana.gov.in",
    digilockerUrl: "https://digilocker.gov.in",
    importantDates: {
      "1st Year Inter Exam": "28 Feb - 18 March 2026",
      "2nd Year Inter Exam": "01 March - 19 March 2026",
      "IPE Results": "April 2026",
      "IPAER Supplementary": "May / June 2026"
    },
    fees: {
      "Re-counting Fee": "₹100 per paper",
      "Re-verification & Scanned Copy": "₹600 per paper"
    },
    eligibility: "Candidates studying in Junior Colleges across Telangana & Andhra Pradesh",
    ageLimit: "15 to 19 Years typical",
    vacancies: {
      "Total Candidates": "Over 19 Lakh students (10 Lakh AP + 9 Lakh TS)"
    },
    examPattern: {
      "Pattern": "MPC, BiPC, CEC, HEC streams with 60/75 marks theory papers"
    },
    photoSpecs: {
      type: "photo",
      minKb: 15,
      maxKb: 50,
      targetKb: 30,
      width: 350,
      height: 450,
      requireNameDate: false,
      notes: "Recent passport photo with formal attire"
    },
    signSpecs: {
      type: "signature",
      minKb: 10,
      maxKb: 20,
      targetKb: 15,
      width: 250,
      height: 100,
      notes: "Clear black signature"
    }
  },

  // =========================================================================
  // 2. CENTRAL GOVT & DEFENCE RECRUITMENT (14 EXAMS)
  // =========================================================================
  {
    id: "ssc-gd",
    name: "SSC GD Constable (CAPF, BSF, CISF, CRPF, ITBP, SSB, SSF)",
    shortName: "SSC GD Constable 2026",
    category: "central",
    conductingBody: "Staff Selection Commission (SSC)",
    state: "All India",
    status: "🔥 Online Form Active • 39,481 Posts",
    officialUrl: "https://ssc.gov.in",
    applyUrl: "https://ssc.gov.in/portal/apply",
    pdfUrl: "https://ssc.gov.in",
    resultUrl: "https://ssc.gov.in/portal/results",
    resultServer2: "https://ssc.gov.in",
    importantDates: {
      "Online Application Start": "05 September 2026",
      "Last Date to Apply Online": "14 October 2026 (23:00)",
      "Fee Payment Last Date": "15 October 2026",
      "Application Form Correction": "20 - 22 October 2026",
      "Computer Based Exam (CBT)": "January - February 2027"
    },
    fees: {
      "General / OBC / EWS (Male)": "₹100",
      "SC / ST / Ex-Servicemen": "₹0 (Nil)",
      "All Category Female Candidates": "₹0 (Exempted)"
    },
    eligibility: "10th Class (Matriculation) Pass from recognized Indian Board",
    ageLimit: "18 to 23 Years (OBC +3 yrs, SC/ST +5 yrs relaxation)",
    vacancies: {
      "Total Posts": "39,481 Posts",
      "Male Vacancies": "35,612 Posts",
      "Female Vacancies": "3,869 Posts",
      "BSF": "12,076 Posts",
      "CISF": "13,632 Posts",
      "CRPF": "9,410 Posts",
      "ITBP": "3,189 Posts",
      "SSB": "1,174 Posts"
    },
    physicalStandards: {
      "Male Height": "170 cm (ST: 162.5 cm)",
      "Female Height": "157 cm (ST: 150 cm)",
      "Male Chest": "80 cm + 5 cm expansion (80-85 cm)",
      "Male Running PET": "5 Km in 24 Minutes",
      "Female Running PET": "1.6 Km in 8.5 Minutes"
    },
    examPattern: {
      "Mode": "Computer Based Test (CBT Online)",
      "Questions": "80 Questions (Each carries 2 Marks = Total 160 Marks)",
      "Time Duration": "60 Minutes (1 Hour)",
      "Negative Marking": "0.25 Marks deducted for each wrong answer",
      "Subjects": "Reasoning (20 Qs), GK/GS (20 Qs), Elementary Maths (20 Qs), Hindi/English (20 Qs)"
    },
    photoSpecs: {
      type: "photo",
      minKb: 20,
      maxKb: 50,
      targetKb: 35,
      width: 350,
      height: 450,
      aspectRatio: "3.5:4.5",
      requireNameDate: false,
      notes: "Recent photograph not older than 3 months. Live capture or uploaded without spectacles, caps or mask."
    },
    signSpecs: {
      type: "signature",
      minKb: 10,
      maxKb: 20,
      targetKb: 15,
      width: 300,
      height: 120,
      notes: "Running handwriting, strictly no capital letters, clear black ink."
    }
  },
  {
    id: "ssc-cgl",
    name: "SSC CGL (Combined Graduate Level - Inspector, ASO, Tax Asst)",
    shortName: "SSC CGL Graduate Level",
    category: "central",
    conductingBody: "Staff Selection Commission (SSC)",
    state: "All India",
    status: "Tier-1 / Tier-2 Examination Schedule Live",
    officialUrl: "https://ssc.gov.in",
    applyUrl: "https://ssc.gov.in",
    pdfUrl: "https://ssc.gov.in",
    resultUrl: "https://ssc.gov.in/portal/results",
    resultServer2: "https://ssc.gov.in",
    importantDates: {
      "Notification Release": "June 2026",
      "Tier-1 CBT Exam": "September - October 2026",
      "Tier-2 CBT Exam": "December 2026"
    },
    fees: {
      "General / OBC / EWS (Male)": "₹100",
      "SC / ST / PwD / Female": "₹0 (Exempted)"
    },
    eligibility: "Bachelor's Degree in any discipline from a recognized University",
    ageLimit: "18 to 30 / 32 Years (Post-wise). Age relaxation: OBC +3 yrs, SC/ST +5 yrs.",
    vacancies: {
      "Total Posts": "17,727+ Posts (Group B & C Gazetted/Non-Gazetted)",
      "Pay Scales": "Level-4 (₹25,500) to Level-8 (₹47,600) + DA, HRA"
    },
    examPattern: {
      "Tier-1 (Qualifying)": "100 Qs / 200 Marks / 60 Mins (Reasoning 25, GA 25, Quant 25, English 25). -0.50 Neg Mark.",
      "Tier-2 (Merit)": "Paper 1 (Maths 30, Reasoning 30, English 45, GA 25, Computer 20 + Data Entry Speed Test)"
    },
    photoSpecs: {
      type: "photo",
      minKb: 20,
      maxKb: 50,
      targetKb: 35,
      width: 350,
      height: 450,
      requireNameDate: false,
      notes: "SSC new portal live photo capture compliant. Plain background, upright posture."
    },
    signSpecs: {
      type: "signature",
      minKb: 10,
      maxKb: 20,
      targetKb: 15,
      width: 300,
      height: 120,
      notes: "Black ballpoint pen on plain white paper, 10-20 KB"
    }
  },
  {
    id: "ssc-chsl",
    name: "SSC CHSL (10+2 Combined Higher Secondary - LDC, JSA, DEO)",
    shortName: "SSC CHSL 10+2",
    category: "central",
    conductingBody: "Staff Selection Commission (SSC)",
    state: "All India",
    status: "Tier-1 Results & Tier-2 Typing Test",
    officialUrl: "https://ssc.gov.in",
    applyUrl: "https://ssc.gov.in",
    pdfUrl: "https://ssc.gov.in",
    resultUrl: "https://ssc.gov.in/portal/results",
    resultServer2: "https://ssc.gov.in",
    importantDates: {
      "Online Application": "April - May 2026",
      "Tier-1 Exam Date": "July 2026",
      "Tier-2 Exam Date": "November 2026"
    },
    fees: {
      "General / OBC / EWS": "₹100",
      "SC / ST / Female": "₹0"
    },
    eligibility: "12th Standard or equivalent from a recognized Board or University",
    ageLimit: "18 to 27 Years as on cutoff date (OBC +3 yrs, SC/ST +5 yrs)",
    vacancies: {
      "Total Posts": "3,712 Posts (Lower Division Clerk, Junior Secretariat Assistant, Data Entry Operator)"
    },
    examPattern: {
      "Tier-1": "100 Qs, 200 Marks, 60 Mins. 0.50 Negative Marking.",
      "Tier-2": "Session 1 (Maths 30 + Reasoning 30), Session 2 (English 40 + GA 20 + Computer 15), Session 3 (Typing Test 35 wpm)"
    },
    photoSpecs: {
      type: "photo",
      minKb: 20,
      maxKb: 50,
      targetKb: 35,
      width: 350,
      height: 450,
      requireNameDate: false,
      notes: "White background, live capture compatible"
    },
    signSpecs: {
      type: "signature",
      minKb: 10,
      maxKb: 20,
      targetKb: 15,
      width: 300,
      height: 120,
      notes: "Clear signature without blur"
    }
  },
  {
    id: "ssc-mts",
    name: "SSC MTS & Havaldar (Multi-Tasking Non-Technical Staff)",
    shortName: "SSC MTS & Havaldar",
    category: "central",
    conductingBody: "Staff Selection Commission (SSC)",
    state: "All India",
    status: "9,583 Posts • Exam Dates & Admit Card Live",
    officialUrl: "https://ssc.gov.in",
    applyUrl: "https://ssc.gov.in",
    pdfUrl: "https://ssc.gov.in",
    resultUrl: "https://ssc.gov.in/portal/results",
    resultServer2: "https://ssc.gov.in",
    importantDates: {
      "Application Window": "June - August 2026",
      "CBT Examination": "October - November 2026",
      "PET/PST for Havaldar": "December 2026"
    },
    fees: {
      "General / OBC": "₹100",
      "SC / ST / Female": "₹0"
    },
    eligibility: "10th Class (Matriculation) from any recognized Board in India",
    ageLimit: "18 to 25 Years (MTS), 18 to 27 Years (Havaldar in CBIC/CBN)",
    vacancies: {
      "Total Posts": "9,583 Posts (6,144 MTS + 3,439 Havaldar in CBIC & CBN)"
    },
    physicalStandards: {
      "Havaldar Walking": "Male: 1,600m in 15 mins | Female: 1 Km in 20 mins",
      "Havaldar Height": "Male: 157.5 cm (Chest 81 cm) | Female: 152 cm (Weight 48 Kg)"
    },
    examPattern: {
      "Session-1 (No Negative Marking)": "Numerical Aptitude (20 Qs / 60 Mks) + Reasoning (20 Qs / 60 Mks) - 45 Mins",
      "Session-2 (Merit Based, -1 Neg Mark)": "General Awareness (25 Qs / 75 Mks) + English Language (25 Qs / 75 Mks) - 45 Mins"
    },
    photoSpecs: {
      type: "photo",
      minKb: 20,
      maxKb: 50,
      targetKb: 35,
      width: 350,
      height: 450,
      requireNameDate: false,
      notes: "Strictly recent photo, formal lighting"
    },
    signSpecs: {
      type: "signature",
      minKb: 10,
      maxKb: 20,
      targetKb: 15,
      width: 300,
      height: 120,
      notes: "Signature on white paper"
    }
  },
  {
    id: "rrb-alp",
    name: "Railway RRB Assistant Loco Pilot (ALP 2026)",
    shortName: "Railway RRB ALP",
    category: "central",
    conductingBody: "Railway Recruitment Boards (Ministry of Railways)",
    state: "All India",
    status: "18,799 Posts • Application Status Live",
    officialUrl: "https://www.rrbapply.gov.in",
    applyUrl: "https://www.rrbapply.gov.in/#/auth/home",
    pdfUrl: "https://indianrailways.gov.in",
    resultUrl: "https://www.rrbapply.gov.in",
    resultServer2: "https://www.rrbchennai.gov.in",
    importantDates: {
      "Application Start": "January 2026",
      "Last Date": "February 2026",
      "CBT-1 Exam Date": "November 2026",
      "CBT-2 Exam Date": "December 2026",
      "CBAT (Aptitude Test)": "Early 2027"
    },
    fees: {
      "General / OBC / EWS": "₹500 (₹400 refunded after appearing in CBT-1)",
      "SC / ST / Ex-SM / Female": "₹250 (Full ₹250 refunded after appearing in CBT-1)"
    },
    eligibility: "Matriculation / 10th Pass + ITI in specified trades OR Diploma / Degree in Mechanical, Electrical, Electronics, Automobile Engineering",
    ageLimit: "18 to 30 Years (3 Years age relaxation for OBC, 5 Years for SC/ST)",
    vacancies: {
      "Total Posts": "18,799 Posts",
      "Pay Scale": "Level-2 of 7th CPC (Initial Pay ₹19,900 + Allowances)"
    },
    examPattern: {
      "CBT-1": "75 Questions, 60 Minutes (Maths 20, Reasoning 25, General Science 20, GA 10). -1/3rd Negative Marking.",
      "CBT-2": "Part A (100 Qs, 90 Mins - Merit) + Part B (75 Qs, 60 Mins - Trade Qualifying min 35%)",
      "CBAT": "Computer Based Aptitude Test (No Negative Marking)"
    },
    photoSpecs: {
      type: "photo",
      minKb: 30,
      maxKb: 70,
      targetKb: 50,
      width: 350,
      height: 450,
      requireNameDate: false,
      notes: "Color passport photo taken against white background, 30 to 70 KB strict"
    },
    signSpecs: {
      type: "signature",
      minKb: 30,
      maxKb: 70,
      targetKb: 45,
      width: 300,
      height: 120,
      notes: "Running handwriting signature with black ballpoint pen, 30 to 70 KB"
    }
  },
  {
    id: "rrb-technician",
    name: "Railway RRB Technician Grade I & Grade III",
    shortName: "Railway RRB Technician",
    category: "central",
    conductingBody: "Railway Recruitment Boards (RRB)",
    state: "All India",
    status: "9,144 Posts • CBT Exam Schedule",
    officialUrl: "https://www.rrbapply.gov.in",
    applyUrl: "https://www.rrbapply.gov.in",
    pdfUrl: "https://indianrailways.gov.in",
    resultUrl: "https://www.rrbapply.gov.in",
    resultServer2: "https://www.rrbapply.gov.in",
    importantDates: {
      "Online Application": "March - April 2026",
      "CBT Exam Dates": "October - November 2026",
      "Document Verification": "January 2027"
    },
    fees: {
      "UR / OBC": "₹500 (₹400 refundable post CBT)",
      "SC / ST / Female": "₹250 (Full refundable)"
    },
    eligibility: "Tech-I: B.Sc / Diploma / B.Tech in Electronics/Computer/Physics. Tech-III: Matriculation + ITI in relevant trade.",
    ageLimit: "Tech-I Signal: 18-36 Years | Tech-III: 18-33 Years",
    vacancies: {
      "Total Posts": "9,144 Posts (Grade I Signal: 1,092 | Grade III: 8,052)"
    },
    examPattern: {
      "CBT Mode": "100 Questions, 90 Minutes, 1/3rd Negative Marking per wrong answer"
    },
    photoSpecs: {
      type: "photo",
      minKb: 30,
      maxKb: 70,
      targetKb: 50,
      width: 350,
      height: 450,
      requireNameDate: false,
      notes: "White background, clear face view"
    },
    signSpecs: {
      type: "signature",
      minKb: 30,
      maxKb: 70,
      targetKb: 45,
      width: 300,
      height: 120,
      notes: "Black ink on white background"
    }
  },
  {
    id: "rrb-ntpc",
    name: "Railway RRB NTPC (Station Master, Goods Guard, Clerk)",
    shortName: "Railway RRB NTPC",
    category: "central",
    conductingBody: "Railway Recruitment Boards (RRB)",
    state: "All India",
    status: "11,558 Posts • Graduate & Under-Graduate",
    officialUrl: "https://www.rrbapply.gov.in",
    applyUrl: "https://www.rrbapply.gov.in",
    pdfUrl: "https://indianrailways.gov.in",
    resultUrl: "https://www.rrbapply.gov.in",
    resultServer2: "https://www.rrbapply.gov.in",
    importantDates: {
      "Notification Release": "September 2026",
      "Online Application": "September - October 2026",
      "CBT-1 Examination": "December 2026 - January 2027"
    },
    fees: {
      "UR / OBC / EWS": "₹500 (₹400 refunded after CBT-1)",
      "SC / ST / ESM / Female": "₹250 (Full ₹250 refunded)"
    },
    eligibility: "Graduate Posts: Any Bachelor's Degree | Under Graduate Posts: 12th Standard Pass (50% marks)",
    ageLimit: "UG Posts: 18-33 Years | Graduate Posts: 18-36 Years (Age relaxations applicable)",
    vacancies: {
      "Total Posts": "11,558 Posts (Graduate: 8,110 Posts | Under-Graduate: 3,448 Posts)"
    },
    examPattern: {
      "CBT-1": "100 Qs, 90 Mins (GA 40, Maths 30, Reasoning 30). -1/3rd Negative Marking.",
      "CBT-2": "120 Qs, 90 Mins (GA 50, Maths 35, Reasoning 35)"
    },
    photoSpecs: {
      type: "photo",
      minKb: 30,
      maxKb: 70,
      targetKb: 50,
      width: 350,
      height: 450,
      requireNameDate: false,
      notes: "30-70 KB white background portrait"
    },
    signSpecs: {
      type: "signature",
      minKb: 30,
      maxKb: 70,
      targetKb: 45,
      width: 300,
      height: 120,
      notes: "30-70 KB running signature"
    }
  },
  {
    id: "rrb-group-d",
    name: "Railway RRB Group D (RRC Level-1 Trackman, Pointsman)",
    shortName: "Railway Group D Level-1",
    category: "central",
    conductingBody: "Railway Recruitment Cell / RRB",
    state: "All India",
    status: "Upcoming Mega Recruitment Notification",
    officialUrl: "https://www.rrbapply.gov.in",
    applyUrl: "https://www.rrbapply.gov.in",
    pdfUrl: "https://indianrailways.gov.in",
    resultUrl: "https://www.rrbapply.gov.in",
    resultServer2: "https://www.rrbapply.gov.in",
    importantDates: {
      "Notification Expected": "Late 2026",
      "Exam Schedule": "Early 2027"
    },
    fees: {
      "UR / OBC": "₹500 (₹400 refunded after CBT)",
      "SC / ST / Female": "₹250 (Refundable)"
    },
    eligibility: "10th Pass (Matriculation) OR 10th Pass + ITI from NCVT/SCVT recognized institute",
    ageLimit: "18 to 33 Years (OBC +3 yrs, SC/ST +5 yrs)",
    vacancies: {
      "Total Posts": "Over 1,00,000 Expected Level-1 Posts",
      "Pay Scale": "Level-1 (₹18,000 Basic + Allowances)"
    },
    physicalStandards: {
      "Male Running": "Lift & carry 35 kg weight for 100 meters in 2 mins + Run 1,000m in 4 mins 15 secs",
      "Female Running": "Lift & carry 20 kg weight for 100 meters in 2 mins + Run 1,000m in 5 mins 40 secs"
    },
    examPattern: {
      "CBT Pattern": "100 Qs, 90 Mins (General Science 25, Mathematics 25, Reasoning 30, General Awareness 20). 1/3rd Negative Marking."
    },
    photoSpecs: {
      type: "photo",
      minKb: 20,
      maxKb: 50,
      targetKb: 35,
      width: 350,
      height: 450,
      requireNameDate: false,
      notes: "White background, clear view of eyes"
    },
    signSpecs: {
      type: "signature",
      minKb: 10,
      maxKb: 40,
      targetKb: 25,
      width: 300,
      height: 120,
      notes: "Running handwriting signature"
    }
  },
  {
    id: "upsc-cse",
    name: "UPSC Civil Services Examination (IAS, IPS, IFS, IRS)",
    shortName: "UPSC Civil Services (IAS)",
    category: "central",
    conductingBody: "Union Public Service Commission (UPSC)",
    state: "All India",
    status: "Prelims, Mains & Interview Schedule",
    officialUrl: "https://upsc.gov.in",
    applyUrl: "https://upsconline.nic.in",
    pdfUrl: "https://upsc.gov.in/examinations/active-exams",
    resultUrl: "https://upsc.gov.in/examination/written-results",
    resultServer2: "https://upsconline.nic.in",
    importantDates: {
      "Notification Published": "February 2026",
      "Civil Services Prelims Exam": "25 May 2026",
      "Civil Services Mains Exam": "September 2026",
      "Personality Test (Interview)": "January - April 2027"
    },
    fees: {
      "General / OBC / EWS (Male)": "₹100 (Prelims) / ₹200 (Mains)",
      "Female / SC / ST / PwBD": "₹0 (Exempted from fee)"
    },
    eligibility: "Degree of a recognized University in any discipline. Final year students eligible.",
    ageLimit: "21 to 32 Years as on 1st August. (OBC: 35 yrs / 9 attempts, SC/ST: 37 yrs / unlimited attempts, Gen: 6 attempts)",
    vacancies: {
      "Total Posts": "1,056+ Posts (IAS, IPS, IFS, IRS, IA&AS, IRTS)",
      "Top Services": "Indian Administrative Service (IAS), Indian Police Service (IPS)"
    },
    examPattern: {
      "Stage 1: Prelims (Objective)": "GS Paper 1 (100 Qs / 200 Marks) + CSAT Paper 2 (80 Qs / 200 Marks, 33% Qualifying). -1/3rd Negative Marking.",
      "Stage 2: Mains (Written Descriptive)": "9 Papers (1750 Marks) including Essay, 4 GS Papers, and 2 Optional Papers",
      "Stage 3: Personality Test": "275 Marks Interview in Dholpur House, New Delhi"
    },
    photoSpecs: {
      type: "photo",
      minKb: 20,
      maxKb: 300,
      targetKb: 100,
      width: 350,
      height: 450,
      requireNameDate: true,
      notes: "UPSC strictly requires name of candidate and date of photo (DOOP) stamped at bottom. Photo must not be older than 10 days before application."
    },
    signSpecs: {
      type: "signature",
      minKb: 20,
      maxKb: 300,
      targetKb: 80,
      width: 350,
      height: 150,
      notes: "Black ink on white paper, 20 KB to 300 KB"
    }
  },
  {
    id: "upsc-nda",
    name: "UPSC NDA & NA (National Defence Academy & Naval Academy)",
    shortName: "UPSC NDA / NA",
    category: "central",
    conductingBody: "Union Public Service Commission (UPSC)",
    state: "All India",
    status: "NDA-I & NDA-II Examination",
    officialUrl: "https://upsc.gov.in",
    applyUrl: "https://upsconline.nic.in",
    pdfUrl: "https://upsc.gov.in",
    resultUrl: "https://upsc.gov.in",
    resultServer2: "https://upsconline.nic.in",
    importantDates: {
      "NDA-I Exam Date": "April 2026",
      "NDA-II Exam Date": "September 2026",
      "SSB Interview": "5 Days SSB Call Letters"
    },
    fees: {
      "General / OBC Male": "₹100",
      "SC / ST / Female": "₹0"
    },
    eligibility: "Army Wing: 12th Pass in any stream. Air Force & Navy: 12th Pass with Physics, Chemistry & Mathematics (PCM).",
    ageLimit: "16.5 to 19.5 Years (Unmarried Male & Female candidates)",
    vacancies: {
      "Total Seats": "400+ Seats across Army (208), Navy (42), Air Force (120), Naval Academy (30)"
    },
    examPattern: {
      "Mathematics": "300 Marks (120 Questions, 2.5 Hours, -0.83 Negative Marking)",
      "General Ability Test (GAT)": "600 Marks (English 200 + GK 400, 150 Questions, 2.5 Hours, -1.33 Negative Marking)",
      "SSB Interview": "900 Marks Stage 1 (Screening) + Stage 2 (Psychology, GTO, Personal Interview)"
    },
    photoSpecs: {
      type: "photo",
      minKb: 20,
      maxKb: 300,
      targetKb: 100,
      width: 350,
      height: 450,
      requireNameDate: true,
      notes: "Name and date stamped at bottom, 3/4th face visible"
    },
    signSpecs: {
      type: "signature",
      minKb: 20,
      maxKb: 300,
      targetKb: 80,
      width: 350,
      height: 150,
      notes: "Black ink signature"
    }
  },
  {
    id: "agniveer-army",
    name: "Indian Army Agniveer Rally (GD, Tech, Clerk, Tradesman)",
    shortName: "Indian Army Agniveer",
    category: "central",
    conductingBody: "Join Indian Army (Directorate General of Recruiting)",
    state: "All India Rallies",
    status: "CEE Online Entrance & Rally Schedule Live",
    officialUrl: "https://joinindianarmy.nic.in",
    applyUrl: "https://joinindianarmy.nic.in",
    pdfUrl: "https://joinindianarmy.nic.in",
    resultUrl: "https://joinindianarmy.nic.in",
    resultServer2: "https://joinindianarmy.nic.in",
    importantDates: {
      "Rally Registration": "February - March 2026",
      "Common Entrance Exam (CEE)": "April - May 2026",
      "Physical Rally": "June - November 2026"
    },
    fees: {
      "CEE Examination Fee": "₹250 (All Candidates)"
    },
    eligibility: "General Duty (GD): 10th Pass with 45% aggregate and 33% in each subject | Tech: 10+2 with PCM & English (50%) | Clerk: 10+2 in any stream (60% aggregate) | Tradesman: 8th / 10th Pass",
    ageLimit: "17.5 to 21 Years (Strict cutoff)",
    vacancies: {
      "Total Intakes": "Over 25,000+ Agniveer soldiers enrolled annually",
      "Seva Nidhi Package": "₹11.71 Lakh tax-free package post 4 years + 25% retained in regular cadre"
    },
    physicalStandards: {
      "Running (Group 1)": "1.6 Km in 5 Min 30 Sec (60 Marks) + 10 Pull Ups (40 Marks) = 100 Marks",
      "Running (Group 2)": "1.6 Km in 5 Min 45 Sec (48 Marks) + 9 Pull Ups (33 Marks)",
      "Physical Tests": "9 Feet Ditch Jump (Qualifying) + Zig-Zag Balance (Qualifying)",
      "Height Standards": "GD: 169-170 cm | Clerk/SKT: 162 cm | Technical: 169 cm"
    },
    examPattern: {
      "CEE Online Test": "50 Questions / 100 Marks / 60 Mins (GK 15, Gen Science 15, Maths 15, Logical Reasoning 5). Negative marking 0.5 marks."
    },
    photoSpecs: {
      type: "photo",
      minKb: 5,
      maxKb: 20,
      targetKb: 15,
      width: 200,
      height: 250,
      requireNameDate: false,
      notes: "Strict 5-20 KB range on Join Indian Army portal! White background, Sikh candidates with turban."
    },
    signSpecs: {
      type: "signature",
      minKb: 5,
      maxKb: 10,
      targetKb: 8,
      width: 200,
      height: 80,
      notes: "Strict 5-10 KB file size"
    }
  },
  {
    id: "agniveer-airforce",
    name: "Indian Air Force Agniveer Vayu (Science & Other than Science)",
    shortName: "IAF Agniveer Vayu",
    category: "central",
    conductingBody: "Indian Air Force (Central Airmen Selection Board - CASB)",
    state: "All India",
    status: "Intake 01/2026 & 02/2026 Online Application",
    officialUrl: "https://agnipathvayu.cdac.in",
    applyUrl: "https://agnipathvayu.cdac.in",
    pdfUrl: "https://agnipathvayu.cdac.in",
    resultUrl: "https://agnipathvayu.cdac.in",
    resultServer2: "https://agnipathvayu.cdac.in",
    importantDates: {
      "Online Application": "January - February 2026",
      "Phase-1 Online Exam": "March 2026",
      "Phase-2 PFT & Adaptability": "May 2026"
    },
    fees: {
      "Examination Fee": "₹550 + GST"
    },
    eligibility: "Science Subjects: 10+2 with Math, Physics & English with min 50% marks | Other than Science: 10+2 with min 50% marks & 50% in English",
    ageLimit: "17.5 to 21 Years",
    vacancies: {
      "Total Posts": "Over 3,500 Agniveer Vayu (Men & Women) intake"
    },
    physicalStandards: {
      "PFT-1 Running": "1.6 Km in 7 Minutes (Male) | 1.6 Km in 8 Minutes (Female)",
      "PFT-2 Push-ups": "10 Push-ups, 10 Sit-ups, 20 Squats",
      "Height": "Male: 152.5 cm | Female: 152 cm"
    },
    examPattern: {
      "Science Subjects": "60 Mins (English 20, Physics 25, Maths 25 = 70 Marks)",
      "Other than Science": "45 Mins (English 20, RAGA 30 = 50 Marks)",
      "Both Streams": "85 Mins (English 20, Physics 25, Maths 25, RAGA 30 = 100 Marks). 0.25 Neg Marking."
    },
    photoSpecs: {
      type: "photo",
      minKb: 10,
      maxKb: 50,
      targetKb: 30,
      width: 350,
      height: 450,
      requireNameDate: true,
      notes: "Candidate holding black chalkboard in front of chest with Name & Date of Photo written with white chalk in capital letters."
    },
    signSpecs: {
      type: "signature",
      minKb: 10,
      maxKb: 50,
      targetKb: 25,
      width: 300,
      height: 120,
      notes: "Clear black/blue signature, 10-50 KB"
    }
  },
  {
    id: "agniveer-navy",
    name: "Indian Navy Agniveer (SSR & MR 01/2026 & 02/2026)",
    shortName: "Indian Navy Agniveer SSR/MR",
    category: "central",
    conductingBody: "Indian Navy (Naval Headquarters)",
    state: "All India",
    status: "INET Online Exam & PFT Stage Live",
    officialUrl: "https://joinindiannavy.gov.in",
    applyUrl: "https://www.joinindiannavy.gov.in",
    pdfUrl: "https://joinindiannavy.gov.in",
    resultUrl: "https://www.joinindiannavy.gov.in",
    resultServer2: "https://joinindiannavy.gov.in",
    importantDates: {
      "Application Window": "May - June 2026",
      "Stage-1 INET Exam": "July 2026",
      "Stage-2 PFT at INS Chilka": "September 2026"
    },
    fees: {
      "Examination Fee": "₹550 + 18% GST"
    },
    eligibility: "SSR (Senior Secondary Recruits): 10+2 with Maths & Physics with Chemistry/Bio/CS | MR (Matric Recruits): 10th Pass from recognized Board",
    ageLimit: "17.5 to 21 Years",
    vacancies: {
      "Total Posts": "4,000+ Posts (SSR 3,600 + MR 400)",
      "Female Reservation": "20% seats for female Agniveer sailors"
    },
    physicalStandards: {
      "Running": "Male: 1.6 Km in 6.5 Mins | Female: 1.6 Km in 8 Mins",
      "Squats (Uthak Baithak)": "Male: 20 | Female: 15",
      "Push-ups": "Male: 12 | Female: Not applicable (10 Bent Knee Sit-ups instead)",
      "Height": "Male: 157 cm | Female: 152 cm"
    },
    examPattern: {
      "SSR CBT": "100 Questions, 60 Minutes (English, Science, Maths, General Awareness)",
      "MR CBT": "50 Questions, 30 Minutes (Science & Mathematics 25, General Awareness 25). 0.25 Negative Marking."
    },
    photoSpecs: {
      type: "photo",
      minKb: 20,
      maxKb: 50,
      targetKb: 35,
      width: 350,
      height: 450,
      requireNameDate: false,
      notes: "Blue background preferred, ears clearly visible"
    },
    signSpecs: {
      type: "signature",
      minKb: 10,
      maxKb: 20,
      targetKb: 15,
      width: 300,
      height: 100,
      notes: "Black ink signature"
    }
  },
  {
    id: "ibps-po-clerk",
    name: "IBPS & SBI Banking (Probationary Officer & Clerk)",
    shortName: "IBPS / SBI Bank PO & Clerk",
    category: "central",
    conductingBody: "Institute of Banking Personnel Selection & State Bank of India",
    state: "All India",
    status: "CRP PO/MT & Clerk Exam Calendar Active",
    officialUrl: "https://www.ibps.in",
    applyUrl: "https://ibpsonline.ibps.in",
    pdfUrl: "https://www.ibps.in",
    resultUrl: "https://ibpsonline.ibps.in",
    resultServer2: "https://sbi.co.in/careers",
    importantDates: {
      "IBPS Clerk Prelims": "August 2026",
      "IBPS PO Prelims": "October 2026",
      "SBI PO Notification": "September 2026",
      "Main Exams": "October - November 2026"
    },
    fees: {
      "General / OBC / EWS": "₹850",
      "SC / ST / PWD": "₹175"
    },
    eligibility: "Graduation Degree in any discipline from a recognized University",
    ageLimit: "Clerk: 20 to 28 Years | PO: 20 to 30 Years (OBC +3 yrs, SC/ST +5 yrs)",
    vacancies: {
      "Total Posts": "Over 15,000+ vacancies across 11 Public Sector Banks and SBI"
    },
    examPattern: {
      "Prelims": "100 Qs / 100 Marks / 60 Mins (English 30, Quant 35, Reasoning 35 - 20 mins sectional time). 0.25 Neg Marking.",
      "Mains": "Reasoning & Computer (45 Qs), Data Analysis (35 Qs), General/Banking Awareness (40 Qs), English (35 Qs) + Descriptive Test"
    },
    photoSpecs: {
      type: "photo",
      minKb: 20,
      maxKb: 50,
      targetKb: 35,
      width: 200,
      height: 230,
      requireNameDate: false,
      notes: "Strict 20-50 KB (200x230 pixels), white background. Face should cover 70-80% of photo."
    },
    signSpecs: {
      type: "signature",
      minKb: 10,
      maxKb: 20,
      targetKb: 15,
      width: 140,
      height: 60,
      notes: "Strict 10-20 KB (140x60 pixels). Black ink only. Strictly running letters (no capital letters allowed)."
    }
  },

  // =========================================================================
  // 3. STATE POLICE BHARTI (8 STATES)
  // =========================================================================
  {
    id: "up-police-constable",
    name: "UP Police Constable & Sub Inspector (SI) 60,244 Bharti",
    shortName: "UP Police 60,244 Posts",
    category: "police",
    conductingBody: "Uttar Pradesh Police Recruitment & Promotion Board (UPPRPB)",
    state: "Uttar Pradesh",
    status: "🚨 Exam City Center Slip & Re-Exam Live",
    officialUrl: "https://uppbpb.gov.in",
    applyUrl: "https://uppbpb.gov.in",
    pdfUrl: "https://uppbpb.gov.in",
    resultUrl: "https://uppbpb.gov.in",
    resultServer2: "https://ccp123.onlinereg.co.in",
    importantDates: {
      "Exam Date (Re-Exam)": "August - September 2026",
      "City Intimation Slip": "Available 10 days before exam",
      "Admit Card Download": "Available 3 days before exam"
    },
    fees: {
      "All Categories": "₹400"
    },
    eligibility: "12th Standard (Intermediate) passed from any recognized Board in India",
    ageLimit: "Male: 18 to 25 Years, Female: 18 to 28 Years (+5 Years age relaxation for UP Domicile OBC, SC, ST)",
    vacancies: {
      "Total Posts": "60,244 Posts",
      "Unreserved (General)": "24,102 Posts",
      "EWS": "6,024 Posts",
      "OBC": "16,264 Posts",
      "SC": "12,650 Posts",
      "ST": "1,204 Posts"
    },
    physicalStandards: {
      "Male Height (Gen/OBC/SC)": "168 cm (ST: 160 cm)",
      "Male Chest": "79 cm + 5 cm expansion (ST: 77 cm)",
      "Female Height (Gen/OBC/SC)": "152 cm (ST: 147 cm)",
      "Female Weight": "Minimum 40 Kg",
      "Male Running": "4.8 Km in 25 Minutes",
      "Female Running": "2.4 Km in 14 Minutes"
    },
    examPattern: {
      "Mode": "Offline OMR Based Exam",
      "Total Marks": "300 Marks (150 Questions, 2 Marks each)",
      "Time Duration": "2 Hours (120 Minutes)",
      "Negative Marking": "0.5 Marks (0.25 ratio) deducted for each wrong answer",
      "Subjects": "General Knowledge (38 Qs), General Hindi (37 Qs), Numerical Aptitude/Maths (38 Qs), Mental Ability/Reasoning (37 Qs)"
    },
    photoSpecs: {
      type: "photo",
      minKb: 20,
      maxKb: 50,
      targetKb: 35,
      width: 350,
      height: 450,
      requireNameDate: true,
      notes: "White or light grey background, clear ears, no glasses or hat"
    },
    signSpecs: {
      type: "signature",
      minKb: 5,
      maxKb: 20,
      targetKb: 12,
      width: 300,
      height: 100,
      notes: "Black ink on white paper"
    }
  },
  {
    id: "bihar-police-constable",
    name: "Bihar Police Constable (CSBC 21,391 Posts) & Daroga",
    shortName: "Bihar Police Constable",
    category: "police",
    conductingBody: "Central Selection Board of Constable (CSBC), Patna",
    state: "Bihar",
    status: "Active • Admit Card & Result Portal",
    officialUrl: "https://csbc.bih.nic.in",
    applyUrl: "https://csbc.bih.nic.in",
    pdfUrl: "https://csbc.bih.nic.in",
    resultUrl: "https://csbc.bih.nic.in",
    resultServer2: "https://bpssc.bih.nic.in",
    importantDates: {
      "Re-Exam Schedule": "August 2026",
      "Admit Card Release": "Live Now on csbc.bih.nic.in",
      "Physical Test (PET)": "Post written exam results"
    },
    fees: {
      "General / EWS / EBC / BC": "₹675",
      "SC / ST / All Female Candidates": "₹180"
    },
    eligibility: "10+2 Intermediate passed or Maulvi / Shastri equivalent",
    ageLimit: "18 to 25 Years (BC/EBC Male: 27 yrs, BC/EBC Female: 28 yrs, SC/ST: 30 yrs)",
    vacancies: {
      "Total Posts": "21,391 Posts",
      "General": "8,556 Posts",
      "EWS": "2,140 Posts",
      "SC": "3,400 Posts",
      "ST": "228 Posts",
      "EBC": "3,842 Posts",
      "BC": "2,570 Posts"
    },
    physicalStandards: {
      "Male Height": "Gen/BC: 165 cm | EBC/SC/ST: 160 cm",
      "Female Height": "All Categories: 155 cm (Weight min 48 Kg)",
      "Male Running PET": "1.6 Km in max 6 Mins (50 Marks based on speed)",
      "Female Running PET": "1.0 Km in max 5 Mins (50 Marks)",
      "Shot Put (Gola Fek)": "Male: 16 Pound min 16 Ft | Female: 12 Pound min 12 Ft (25 Marks)",
      "High Jump (Unchi Kood)": "Male: Min 4 Feet | Female: Min 3 Feet (25 Marks)"
    },
    examPattern: {
      "Written Exam": "100 Marks (Qualifying nature, min 30% needed for physical eligibility)",
      "Final Merit List": "Prepared purely on Physical Efficiency Test (PET) Marks (Running 50 + Shot Put 25 + High Jump 25 = 100 Marks)"
    },
    photoSpecs: {
      type: "photo",
      minKb: 15,
      maxKb: 25,
      targetKb: 20,
      width: 350,
      height: 450,
      requireNameDate: true,
      notes: "Strict 15-25 KB range! White background."
    },
    signSpecs: {
      type: "signature",
      minKb: 15,
      maxKb: 25,
      targetKb: 20,
      width: 300,
      height: 120,
      notes: "Both English and Hindi signatures required (15-25 KB each)."
    }
  },
  {
    id: "delhi-police",
    name: "Delhi Police Executive Constable & Head Constable",
    shortName: "Delhi Police Constable",
    category: "police",
    conductingBody: "Staff Selection Commission (SSC) on behalf of Delhi Police",
    state: "Delhi (NCT)",
    status: "Driving License & PE&MT Schedule",
    officialUrl: "https://delhipolice.gov.in",
    applyUrl: "https://ssc.gov.in",
    pdfUrl: "https://ssc.gov.in",
    resultUrl: "https://ssc.gov.in",
    resultServer2: "https://delhipolice.gov.in",
    importantDates: {
      "Notification Expected": "Mid 2026",
      "CBT Examination": "November - December 2026",
      "PE&MT at Wazirabad Grounds": "Early 2027"
    },
    fees: {
      "General / OBC / EWS Male": "₹100",
      "SC / ST / Ex-SM / All Female": "₹0"
    },
    eligibility: "10+2 (Senior Secondary) Pass. Male candidates must possess a valid Driving License for LMV (Motorcycle or Car) as on date of PE&MT.",
    ageLimit: "18 to 25 Years (OBC +3 yrs, SC/ST +5 yrs, Sports +5 yrs)",
    vacancies: {
      "Total Posts": "7,547 Posts (Male: 5,056 | Female: 2,491)",
      "Pay Scale": "Pay Level-3 (₹21,700 to ₹69,100)"
    },
    physicalStandards: {
      "Male Height": "170 cm (Hilly/ST: 165 cm)",
      "Female Height": "157 cm (Hilly/SC/ST: 155 cm)",
      "Male PE&MT": "1,600m in 6 Mins, Long Jump 14 Feet, High Jump 3'9\"",
      "Female PE&MT": "1,600m in 8 Mins, Long Jump 10 Feet, High Jump 3'0\""
    },
    examPattern: {
      "CBT Exam": "100 Questions, 90 Minutes (Reasoning 25, GK/Current Affairs 50, Numerical Ability 15, Computer Fundamentals 10). 0.25 Negative Marking."
    },
    photoSpecs: {
      type: "photo",
      minKb: 20,
      maxKb: 50,
      targetKb: 35,
      width: 350,
      height: 450,
      requireNameDate: false,
      notes: "White background, frontal face, no cap or glasses"
    },
    signSpecs: {
      type: "signature",
      minKb: 10,
      maxKb: 20,
      targetKb: 15,
      width: 300,
      height: 100,
      notes: "Black ink signature"
    }
  },
  {
    id: "rajasthan-police",
    name: "Rajasthan Police Constable Bharti (3,578 Posts)",
    shortName: "Rajasthan Police Constable",
    category: "police",
    conductingBody: "Rajasthan Police Recruitment Board, Jaipur",
    state: "Rajasthan",
    status: "CET Senior Secondary Merit & PET Live",
    officialUrl: "https://police.rajasthan.gov.in",
    applyUrl: "https://sso.rajasthan.gov.in",
    pdfUrl: "https://police.rajasthan.gov.in",
    resultUrl: "https://police.rajasthan.gov.in",
    resultServer2: "https://sso.rajasthan.gov.in",
    importantDates: {
      "PET/PST Physical Rally": "Live across Rajasthan stadiums",
      "CBT Written Exam": "Post Physical qualified list"
    },
    fees: {
      "General / OBC / Creamy": "₹600",
      "SC / ST / Non-Creamy OBC": "₹400"
    },
    eligibility: "12th Standard Pass + Qualified Rajasthan CET (Senior Secondary Level) with minimum cutoff marks",
    ageLimit: "18 to 24 Years (Relaxation up to 5 years for state reserved categories)",
    vacancies: {
      "Total Posts": "3,578 Posts (Constable General, Driver, Telecommunication, Band)"
    },
    physicalStandards: {
      "Male Height": "168 cm (Chest: 81-86 cm)",
      "Female Height": "152 cm (Weight min: 47.5 Kg)",
      "Running PET": "5 Km Run: Male in 25 Mins | Female in 35 Mins (Alloted 30 Marks)"
    },
    examPattern: {
      "CBT Written": "150 Questions, 150 Marks, 2 Hours (Reasoning & Computer 60 Qs, General Knowledge & Rajasthan History 45 Qs, Child & Women Crime laws 10 Qs, Rajasthan GK 45 Qs). 0.25 Negative Marking."
    },
    photoSpecs: {
      type: "photo",
      minKb: 50,
      maxKb: 100,
      targetKb: 75,
      width: 350,
      height: 450,
      requireNameDate: true,
      notes: "SSO Portal requires 50-100 KB photo with Name & Date"
    },
    signSpecs: {
      type: "signature",
      minKb: 20,
      maxKb: 50,
      targetKb: 35,
      width: 250,
      height: 100,
      notes: "20-50 KB signature"
    }
  },
  {
    id: "mp-police",
    name: "MP Police Constable (ESB 7,411 Posts) & Sub Inspector",
    shortName: "MP Police Constable",
    category: "police",
    conductingBody: "Madhya Pradesh Employees Selection Board (MPESB), Bhopal",
    state: "Madhya Pradesh",
    status: "Result & Physical Efficiency Test Schedule",
    officialUrl: "https://esb.mp.gov.in",
    applyUrl: "https://esb.mponline.gov.in",
    pdfUrl: "https://esb.mp.gov.in",
    resultUrl: "https://esb.mp.gov.in",
    resultServer2: "https://esb.mponline.gov.in",
    importantDates: {
      "Written Exam": "Completed / Results Live",
      "Physical Test (PPT)": "Ongoing at MP Police grounds"
    },
    fees: {
      "UR / Outside MP": "₹500 + MPOnline portal fee",
      "SC / ST / OBC of MP": "₹250 + portal fee"
    },
    eligibility: "10th Class (Matric) Pass for General/OBC/SC (8th Pass for ST candidates)",
    ageLimit: "18 to 36 Years (3 Years one-time age relaxation included)",
    vacancies: {
      "Total Posts": "7,411 Posts (Constable GD: 7,090 | Constable Radio: 321)"
    },
    physicalStandards: {
      "Male Height": "168 cm (Chest: 81-86 cm)",
      "Female Height": "155 cm",
      "Physical Scoring": "800m Run (40 Mks) + Shot Put (30 Mks) + Long Jump (30 Mks) = 100 Mks added to final merit"
    },
    examPattern: {
      "Online CBT": "100 Marks (General Knowledge & Reasoning 40 Mks, Intellectual Ability & Mental Aptitude 30 Mks, Science & Simple Arithmetic 30 Mks). No Negative Marking."
    },
    photoSpecs: {
      type: "photo",
      minKb: 20,
      maxKb: 50,
      targetKb: 35,
      width: 350,
      height: 450,
      requireNameDate: true,
      notes: "MPESB Template photo with Name & Date of Photo stamped"
    },
    signSpecs: {
      type: "signature",
      minKb: 10,
      maxKb: 20,
      targetKb: 15,
      width: 300,
      height: 100,
      notes: "Clear black signature"
    }
  },
  {
    id: "haryana-police",
    name: "Haryana Police Constable (HSSC 6,000 Posts)",
    shortName: "Haryana Police HSSC",
    category: "police",
    conductingBody: "Haryana Staff Selection Commission (HSSC), Panchkula",
    state: "Haryana",
    status: "PMT / PST Schedule & Knowledge Test",
    officialUrl: "https://hssc.gov.in",
    applyUrl: "https://hssc.gov.in",
    pdfUrl: "https://hssc.gov.in",
    resultUrl: "https://hssc.gov.in",
    resultServer2: "https://hssc.gov.in",
    importantDates: {
      "Application Window": "February - March 2026",
      "PST / PMT Rallies": "July - August 2026",
      "Knowledge Test (CBT)": "September 2026"
    },
    fees: {
      "Application Fee": "₹0 (Zero fee for all categories as per Haryana Govt policy)"
    },
    eligibility: "10+2 from a recognized board + Matric with Hindi or Sanskrit as one of the subjects + Qualified Haryana CET Group-C",
    ageLimit: "18 to 28 Years (+3 Years age relaxation granted by Haryana Cabinet)",
    vacancies: {
      "Total Posts": "6,000 Posts (Male Constable: 5,000 | Female Constable: 1,000)"
    },
    physicalStandards: {
      "Male Height": "170 cm (Chest: 83-87 cm) | Reserved: 168 cm",
      "Female Height": "158 cm | Reserved: 156 cm",
      "PST Race": "Male: 2.5 Km in 12 Mins | Female: 1.0 Km in 6 Mins | ESM: 1.0 Km in 5 Mins"
    },
    examPattern: {
      "Knowledge Test": "100 Questions / 94.5 Marks / 105 Minutes (including 5 minutes for filling 5th option). No Negative Marking. 0.945 Marks per question."
    },
    photoSpecs: {
      type: "photo",
      minKb: 20,
      maxKb: 50,
      targetKb: 35,
      width: 350,
      height: 450,
      requireNameDate: true,
      notes: "White background, student name and date"
    },
    signSpecs: {
      type: "signature",
      minKb: 10,
      maxKb: 20,
      targetKb: 15,
      width: 300,
      height: 100,
      notes: "Black ink on white paper"
    }
  },
  {
    id: "wb-police",
    name: "West Bengal Police (WBP Constable 11,749 & Kolkata Police)",
    shortName: "WB Police (WBP & KP)",
    category: "police",
    conductingBody: "West Bengal Police Recruitment Board (WBPRB), Araksha Bhawan",
    state: "West Bengal",
    status: "Written Exam & PMT/PET Schedule",
    officialUrl: "https://prb.wb.gov.in",
    applyUrl: "https://prb.wb.gov.in",
    pdfUrl: "https://prb.wb.gov.in",
    resultUrl: "https://prb.wb.gov.in",
    resultServer2: "https://wbpolice.gov.in",
    importantDates: {
      "Notification Published": "March 2026",
      "Preliminary Written Test": "September 2026",
      "PMT/PET Event": "November 2026"
    },
    fees: {
      "All Categories of WB": "₹170 (Processing ₹20 + Exam ₹150)",
      "SC / ST of West Bengal": "₹20 (Processing fee only)"
    },
    eligibility: "Madhyamik Examination pass from WBBSE or its equivalent + Ability to read, write and speak Bengali (exempt for hill subdivisions of Darjeeling & Kalimpong)",
    ageLimit: "18 to 30 Years as on 1st January (OBC +3 yrs, SC/ST +5 yrs, Civic Volunteers relaxation)",
    vacancies: {
      "Total Posts": "11,749 Posts (Male: 8,212 | Female: 3,537)"
    },
    physicalStandards: {
      "Male Height": "167 cm (Chest: 78-83 cm) | Gorkha/ST: 160 cm",
      "Female Height": "160 cm | Gorkha/ST: 152 cm",
      "Running": "Male: 1,600m in 6.5 Mins | Female: 800m in 4 Mins"
    },
    examPattern: {
      "Single Written Exam": "85 Marks (General Awareness 25, English 10, Elementary Math 25, Reasoning 25) + 15 Marks Interview. 0.25 Negative Marking."
    },
    photoSpecs: {
      type: "photo",
      minKb: 10,
      maxKb: 50,
      targetKb: 30,
      width: 350,
      height: 450,
      requireNameDate: false,
      notes: "White background, clear view of eyes and ears"
    },
    signSpecs: {
      type: "signature",
      minKb: 5,
      maxKb: 20,
      targetKb: 12,
      width: 250,
      height: 100,
      notes: "Running handwriting signature, 5-20 KB"
    }
  },
  {
    id: "maharashtra-police",
    name: "Maharashtra Police Constable Bharti (Police Shipai 17,471)",
    shortName: "Maharashtra Police Bharti",
    category: "police",
    conductingBody: "Maharashtra State Police Recruitment Board",
    state: "Maharashtra",
    status: "Ground PET & Written Examination Active",
    officialUrl: "https://policerecruitment2024.mahait.org",
    applyUrl: "https://policerecruitment2024.mahait.org",
    pdfUrl: "https://mahapolice.gov.in",
    resultUrl: "https://policerecruitment2024.mahait.org",
    resultServer2: "https://mahapolice.gov.in",
    importantDates: {
      "Physical PET Exam": "June - July 2026",
      "Written Examination": "Post Physical qualification"
    },
    fees: {
      "Open Category": "₹450",
      "Backward Class Category": "₹350"
    },
    eligibility: "12th Standard (HSC) passed from Maharashtra State Board or equivalent",
    ageLimit: "18 to 28 Years (Relaxation up to 33 years for reserved categories)",
    vacancies: {
      "Total Posts": "17,471 Posts (Police Constable, SRPF Armed Police, Police Driver, Bandsman)"
    },
    physicalStandards: {
      "Male Height": "165 cm (Chest: 79-84 cm)",
      "Female Height": "158 cm",
      "Physical Test (50 Marks)": "Male: 1,600m Run (20 Mks) + 100m Run (15 Mks) + Shot Put (15 Mks) | Female: 800m Run (20 Mks) + 100m Run (15 Mks) + Shot Put (15 Mks)"
    },
    examPattern: {
      "Written Test": "100 Marks / 90 Minutes (Maths 25, Reasoning 25, Marathi Grammar 25, General Knowledge/Current Affairs 25). 50% minimum needed in Physical to qualify for written exam."
    },
    photoSpecs: {
      type: "photo",
      minKb: 15,
      maxKb: 50,
      targetKb: 30,
      width: 350,
      height: 450,
      requireNameDate: false,
      notes: "Frontal view, no head coverings except religious"
    },
    signSpecs: {
      type: "signature",
      minKb: 10,
      maxKb: 30,
      targetKb: 20,
      width: 250,
      height: 100,
      notes: "Black ink on white background"
    }
  },

  // =========================================================================
  // 4. NATIONAL ENTRANCE EXAMS (5 EXAMS)
  // =========================================================================
  {
    id: "nta-neet",
    name: "NEET UG (National Eligibility cum Entrance Test - Medical)",
    shortName: "NTA NEET UG",
    category: "entrance",
    conductingBody: "National Testing Agency (NTA)",
    state: "All India",
    status: "Counseling & State Merit Allotment",
    officialUrl: "https://neet.nta.nic.in",
    applyUrl: "https://neet.nta.nic.in",
    pdfUrl: "https://neet.nta.nic.in/information-bulletin",
    resultUrl: "https://exams.nta.ac.in",
    resultServer2: "https://neet.nta.nic.in",
    importantDates: {
      "Application Period": "February - March 2026",
      "Exam Date": "First Sunday of May 2026",
      "Result Declaration": "June 2026",
      "MCC 15% All India Quota Counseling": "July - August 2026"
    },
    fees: {
      "General": "₹1,700",
      "General-EWS / OBC-NCL": "₹1,600",
      "SC / ST / PwD / Third Gender": "₹1,000"
    },
    eligibility: "Passed 12th with Physics, Chemistry, Biology/Biotechnology & English with min 50% marks (40% for OBC/SC/ST)",
    ageLimit: "Must be 17 years completed by 31 December of admission year. No upper age limit.",
    vacancies: {
      "Seats": "1,08,000+ MBBS, 28,000+ BDS, 52,000+ AYUSH (BAMS/BHMS/BUMS), 603 BVSc seats across India"
    },
    examPattern: {
      "Mode": "Pen & Paper (Offline OMR Test)",
      "Pattern": "200 Questions (Answer 180), 720 Marks, 3 Hours 20 Minutes (200 Mins)",
      "Marking": "+4 for Correct Answer, -1 for Incorrect Answer",
      "Sections": "Physics (45 Qs / 180 Mks), Chemistry (45 Qs / 180 Mks), Biology - Botany & Zoology (90 Qs / 360 Mks)"
    },
    photoSpecs: {
      type: "photo",
      minKb: 10,
      maxKb: 200,
      targetKb: 80,
      width: 350,
      height: 450,
      requireNameDate: true,
      notes: "Passport photo (10-200 KB) AND Postcard size 4x6 inch (10-200 KB) required. White background with Name of candidate and Date of Photo taken printed clearly."
    },
    signSpecs: {
      type: "signature",
      minKb: 4,
      maxKb: 30,
      targetKb: 15,
      width: 250,
      height: 100,
      notes: "Running handwriting in black ink (strictly 4 to 30 KB)"
    }
  },
  {
    id: "nta-jee-main",
    name: "JEE Main (Joint Entrance Examination for NITs, IIITs, CFTIs)",
    shortName: "NTA JEE Main",
    category: "entrance",
    conductingBody: "National Testing Agency (NTA)",
    state: "All India",
    status: "Session 1 & Session 2 Engineering Portal",
    officialUrl: "https://jeemain.nta.nic.in",
    applyUrl: "https://jeemain.nta.nic.in",
    pdfUrl: "https://jeemain.nta.nic.in",
    resultUrl: "https://exams.nta.ac.in",
    resultServer2: "https://jeemain.nta.nic.in",
    importantDates: {
      "Session 1 Registration": "November 2025",
      "Session 1 Exam Date": "January 2026",
      "Session 2 Registration": "February 2026",
      "Session 2 Exam Date": "April 2026"
    },
    fees: {
      "B.E./B.Tech (Gen/OBC Male)": "₹1,000 per session",
      "Female / SC / ST / PwD": "₹500 per session"
    },
    eligibility: "Passed 10+2 with Physics, Mathematics along with Chemistry/Biotech/Technical subject. Minimum 75% marks (65% for SC/ST) or top 20 percentile in Board.",
    ageLimit: "No age limit for JEE Main. Candidates who passed 12th in last 2 years or appearing.",
    vacancies: {
      "Target Seats": "Admission into 32 NITs, 26 IIITs, 38 CFTIs and Top 2,50,000 qualify for JEE Advanced (IITs)"
    },
    examPattern: {
      "CBT Mode": "90 Questions (Attempt 75), 300 Marks, 3 Hours",
      "Sections": "Mathematics (20 MCQs + 5 Numerical), Physics (20 MCQs + 5 Numerical), Chemistry (20 MCQs + 5 Numerical)",
      "Marking": "+4 Correct, -1 Negative Marking for both MCQs and Numerical response questions"
    },
    photoSpecs: {
      type: "photo",
      minKb: 10,
      maxKb: 200,
      targetKb: 80,
      width: 350,
      height: 450,
      requireNameDate: false,
      notes: "White background, 80% face coverage without mask"
    },
    signSpecs: {
      type: "signature",
      minKb: 4,
      maxKb: 30,
      targetKb: 15,
      width: 250,
      height: 100,
      notes: "Clear black ink signature, 4-30 KB"
    }
  },
  {
    id: "nta-jee-adv",
    name: "JEE Advanced (Indian Institutes of Technology - IITs Entrance)",
    shortName: "JEE Advanced (IITs)",
    category: "entrance",
    conductingBody: "Organizing IIT on behalf of JAB (Joint Admission Board)",
    state: "All India",
    status: "IIT B.Tech & Dual Degree Admissions Live",
    officialUrl: "https://jeeadv.ac.in",
    applyUrl: "https://jeeadv.ac.in",
    pdfUrl: "https://jeeadv.ac.in",
    resultUrl: "https://jeeadv.ac.in",
    resultServer2: "https://josaa.nic.in",
    importantDates: {
      "Registration Window": "April - May 2026 (Post JEE Main NTA Rank)",
      "Examination Date": "Late May 2026 (Paper 1 & Paper 2)",
      "JoSAA Counseling": "June - July 2026"
    },
    fees: {
      "General / OBC Male": "₹3,200",
      "Female Candidates (All)": "₹1,600",
      "SC / ST / PwD": "₹1,600"
    },
    eligibility: "Top 2,50,000 rank holders in JEE Main + 75% in 12th Board. Maximum 2 attempts in consecutive years.",
    ageLimit: "Born on or after October 1, 2001 (5 years relaxation for SC/ST/PwD)",
    vacancies: {
      "Total Seats": "17,740+ B.Tech & BS Seats across 23 IITs (IIT Bombay, Delhi, Madras, Kanpur, Kharagpur, Roorkee, etc.)"
    },
    examPattern: {
      "Paper 1 & Paper 2": "Both compulsory (3 Hours each). Physics, Chemistry & Mathematics. Highly dynamic pattern with multi-correct, integer, and matrix match questions."
    },
    photoSpecs: {
      type: "photo",
      minKb: 20,
      maxKb: 300,
      targetKb: 100,
      width: 350,
      height: 450,
      requireNameDate: false,
      notes: "Passport photo matching JEE Main records"
    },
    signSpecs: {
      type: "signature",
      minKb: 10,
      maxKb: 50,
      targetKb: 25,
      width: 300,
      height: 120,
      notes: "Black ink signature"
    }
  },
  {
    id: "nta-cuet-ug",
    name: "NTA CUET UG (Common University Entrance Test for Undergrad)",
    shortName: "NTA CUET UG",
    category: "entrance",
    conductingBody: "National Testing Agency (NTA)",
    state: "All India",
    status: "Central & State University UG Admission",
    officialUrl: "https://exams.nta.ac.in",
    applyUrl: "https://exams.nta.ac.in",
    pdfUrl: "https://exams.nta.ac.in",
    resultUrl: "https://exams.nta.ac.in",
    resultServer2: "https://exams.nta.ac.in",
    importantDates: {
      "Application Window": "February - March 2026",
      "Hybrid (OMR/CBT) Exam": "May 2026",
      "Results Declaration": "June 2026"
    },
    fees: {
      "General (Up to 3 Subjects)": "₹1,000 (+₹400 per extra subject)",
      "OBC-NCL / EWS": "₹900 (+₹375 per extra)",
      "SC / ST / PwD": "₹800 (+₹350 per extra)"
    },
    eligibility: "Passed Class 12th or equivalent examination. No age limit for appearing in CUET UG.",
    ageLimit: "No age limit. Candidates must satisfy university specific criteria.",
    vacancies: {
      "Participating Universities": "Over 250+ Universities including Delhi University (DU), BHU, JNU, Jamia, AMU, Allahabad University"
    },
    examPattern: {
      "Hybrid Mode": "Pen-paper OMR for high-registration subjects & CBT for others",
      "Sections": "Section 1A & 1B (Languages), Section 2 (27 Domain Specific Subjects), Section 3 (General Test)",
      "Marking": "+5 for correct, -1 for incorrect answer"
    },
    photoSpecs: {
      type: "photo",
      minKb: 10,
      maxKb: 200,
      targetKb: 80,
      width: 350,
      height: 450,
      requireNameDate: false,
      notes: "White background, 80% face coverage"
    },
    signSpecs: {
      type: "signature",
      minKb: 4,
      maxKb: 30,
      targetKb: 15,
      width: 250,
      height: 100,
      notes: "Clear black signature, 4-30 KB"
    }
  },
  {
    id: "clat-law",
    name: "CLAT (Common Law Admission Test for NLUs - BA LLB & LLM)",
    shortName: "CLAT Law Entrance",
    category: "entrance",
    conductingBody: "Consortium of National Law Universities (Consortium of NLUs)",
    state: "All India",
    status: "National Law Universities Admission Active",
    officialUrl: "https://consortiumofnlus.ac.in",
    applyUrl: "https://consortiumofnlus.ac.in",
    pdfUrl: "https://consortiumofnlus.ac.in",
    resultUrl: "https://consortiumofnlus.ac.in",
    resultServer2: "https://consortiumofnlus.ac.in",
    importantDates: {
      "Application Window": "July - October 2026",
      "Offline Exam Date": "First Sunday of December 2026",
      "NLU Counseling": "January 2027"
    },
    fees: {
      "General / OBC / NRI": "₹4,000",
      "SC / ST / BPL": "₹3,500"
    },
    eligibility: "UG (5-Yr Integrated Law): 10+2 with 45% marks (40% for SC/ST) | PG (LLM): LLB degree with 50% marks",
    ageLimit: "No upper age limit for CLAT UG or PG",
    vacancies: {
      "Seats": "3,400+ BA LLB / BBA LLB seats across 24 National Law Universities (NLSIU Bengaluru, NALSAR Hyderabad, WBNUJS Kolkata, NLU Jodhpur, etc.)"
    },
    examPattern: {
      "Offline OMR": "120 Questions, 120 Marks, 2 Hours. Reading comprehension based.",
      "Sections": "English Language (24 Qs), Current Affairs & GK (30 Qs), Legal Reasoning (32 Qs), Logical Reasoning (24 Qs), Quantitative Techniques (10 Qs). 0.25 Negative Marking."
    },
    photoSpecs: {
      type: "photo",
      minKb: 20,
      maxKb: 100,
      targetKb: 50,
      width: 350,
      height: 450,
      requireNameDate: false,
      notes: "Frontal passport photo with light background"
    },
    signSpecs: {
      type: "signature",
      minKb: 10,
      maxKb: 50,
      targetKb: 25,
      width: 300,
      height: 120,
      notes: "Black ink running signature"
    }
  },

  // =========================================================================
  // 5. TEACHING & TEACHER ELIGIBILITY TESTS (5 EXAMS)
  // =========================================================================
  {
    id: "ctet-exam",
    name: "CTET (Central Teacher Eligibility Test - CBSE Paper 1 & 2)",
    shortName: "CTET Central TET",
    category: "teaching",
    conductingBody: "Central Board of Secondary Education (CBSE)",
    state: "All India / Central",
    status: "July & January Sessions Portal Active",
    officialUrl: "https://ctet.nic.in",
    applyUrl: "https://ctet.nic.in",
    pdfUrl: "https://ctet.nic.in/information-bulletin",
    resultUrl: "https://cbseresults.nic.in",
    resultServer2: "https://ctet.nic.in",
    importantDates: {
      "Application Start": "March / September 2026",
      "Examination Date": "July 2026 / January 2027",
      "Certificate Validity": "Lifetime Validity (Digital in DigiLocker)"
    },
    fees: {
      "General / OBC (One Paper)": "₹1,000",
      "General / OBC (Both Papers)": "₹1,200",
      "SC / ST / Differently Abled": "₹500 (One Paper) / ₹600 (Both)"
    },
    eligibility: "Paper 1 (Class 1-5 Primary): 12th with 50% + 2-Yr D.El.Ed / 4-Yr B.El.Ed | Paper 2 (Class 6-8 Elementary): Graduation + B.Ed or D.El.Ed",
    ageLimit: "Minimum 18 Years. No upper age limit.",
    vacancies: {
      "Eligibility Scope": "Mandatory qualification for KVS, NVS, Army Schools, DSSSB, and Central Government School Teacher recruitments"
    },
    examPattern: {
      "Paper-1 (Primary)": "150 Qs / 150 Marks / 2.5 Hours (CDP 30, Maths 30, EVS 30, Language-I 30, Language-II 30). No Negative Marking.",
      "Paper-2 (Upper Primary)": "150 Qs / 150 Marks / 2.5 Hours (CDP 30, Science & Maths 60 OR Social Studies 60, Language-I 30, Language-II 30)",
      "Qualifying Marks": "60% (90/150 Marks for General) | 55% (82/150 Marks for OBC/SC/ST)"
    },
    photoSpecs: {
      type: "photo",
      minKb: 10,
      maxKb: 100,
      targetKb: 50,
      width: 350,
      height: 450,
      requireNameDate: false,
      notes: "White background, clear face view"
    },
    signSpecs: {
      type: "signature",
      minKb: 3,
      maxKb: 30,
      targetKb: 15,
      width: 250,
      height: 100,
      notes: "Black ink on white paper, 3-30 KB"
    }
  },
  {
    id: "uptet-supertet",
    name: "UP TET & Super TET (UP Primary & Upper Primary Bharti)",
    shortName: "UP TET / Super TET",
    category: "teaching",
    conductingBody: "Uttar Pradesh Education Service Selection Commission (UPESSC), Prayagraj",
    state: "Uttar Pradesh",
    status: "Upcoming Shikshak Bharti & UP TET Active",
    officialUrl: "https://updeled.gov.in",
    applyUrl: "https://updeled.gov.in",
    pdfUrl: "https://updeled.gov.in",
    resultUrl: "https://updeled.gov.in",
    resultServer2: "https://updeled.gov.in",
    importantDates: {
      "UP TET Notification": "Expected Late 2026",
      "Super TET Primary Teacher Recruitment": "Upcoming (50,000+ Posts Expected)"
    },
    fees: {
      "General / OBC (One Paper)": "₹600",
      "General / OBC (Both Papers)": "₹1,200",
      "SC / ST": "₹400 / ₹800"
    },
    eligibility: "UP TET: Graduation + BTC / D.El.Ed / B.Ed. Super TET: Qualified UP TET or CTET + D.El.Ed / B.Ed.",
    ageLimit: "21 to 40 Years (OBC/SC/ST +5 Years relaxation)",
    vacancies: {
      "Target Posts": "Over 50,000+ Assistant Teacher (Sahayak Adhyapak) vacancies in UP Basic Education"
    },
    examPattern: {
      "UP TET Pattern": "150 Questions, 150 Marks, 150 Minutes. No Negative Marking.",
      "Super TET Merit Pattern": "10% High School + 10% Inter + 10% Graduation + 10% BTC/B.Ed + 60% Super TET Written Exam Score (150 Marks Paper)"
    },
    photoSpecs: {
      type: "photo",
      minKb: 20,
      maxKb: 50,
      targetKb: 35,
      width: 350,
      height: 450,
      requireNameDate: true,
      notes: "Candidate name and date of photo printed at bottom"
    },
    signSpecs: {
      type: "signature",
      minKb: 10,
      maxKb: 20,
      targetKb: 15,
      width: 300,
      height: 100,
      notes: "Black ballpoint pen running signature"
    }
  },
  {
    id: "bpsc-tre",
    name: "Bihar BPSC TRE 4.0 (School Teacher Recruitment Examination)",
    shortName: "Bihar BPSC TRE 4.0",
    category: "teaching",
    conductingBody: "Bihar Public Service Commission (BPSC), Patna",
    state: "Bihar",
    status: "TRE 4.0 Vacancy & Exam Notification",
    officialUrl: "https://www.bpsc.bih.nic.in",
    applyUrl: "https://onlinebpsc.bihar.gov.in",
    pdfUrl: "https://www.bpsc.bih.nic.in",
    resultUrl: "https://www.bpsc.bih.nic.in",
    resultServer2: "https://onlinebpsc.bihar.gov.in",
    importantDates: {
      "Online Application Start": "October - November 2026",
      "BPSC TRE 4.0 Exam Dates": "December 2026",
      "Document Verification": "January 2027"
    },
    fees: {
      "General / OBC / Other States": "₹750",
      "SC / ST / Bihar Female / PwD": "₹200"
    },
    eligibility: "Class 1-5 (Primary): 12th + D.El.Ed + CTET/BTET Paper 1 | Class 6-8 (Middle): Graduation + D.El.Ed/B.Ed + CTET Paper 2 | Class 9-10 (Secondary): STET Paper 1 | Class 11-12 (Higher Sec): Master's + B.Ed + STET Paper 2",
    ageLimit: "Male: 18/21 to 37 Years | Female & BC/EBC: 40 Years | SC/ST: 42 Years",
    vacancies: {
      "Total Posts": "Over 87,000+ Teacher Vacancies across Primary, Middle, Secondary & Higher Secondary schools"
    },
    examPattern: {
      "BPSC Pattern": "150 Questions / 150 Marks / 2.5 Hours (Part 1 Language 30 Qs Qualifying min 9 marks, Part 2 General Studies 40 Qs, Part 3 Subject Specific 80 Qs). No Negative Marking."
    },
    photoSpecs: {
      type: "photo",
      minKb: 25,
      maxKb: 50,
      targetKb: 35,
      width: 350,
      height: 450,
      requireNameDate: false,
      notes: "BPSC online application requires high-quality web camera live capture + uploaded passport photo"
    },
    signSpecs: {
      type: "signature",
      minKb: 10,
      maxKb: 20,
      targetKb: 15,
      width: 300,
      height: 100,
      notes: "Both English and Hindi signatures required (10-20 KB each)"
    }
  },
  {
    id: "reet-rajasthan",
    name: "REET (Rajasthan Eligibility Examination for Teachers Level 1 & 2)",
    shortName: "REET Rajasthan",
    category: "teaching",
    conductingBody: "Board of Secondary Education Rajasthan (RBSE), Ajmer",
    state: "Rajasthan",
    status: "Level 1 & Level 2 Teacher Eligibility Active",
    officialUrl: "https://rajeduboard.rajasthan.gov.in",
    applyUrl: "https://rajeduboard.rajasthan.gov.in",
    pdfUrl: "https://rajeduboard.rajasthan.gov.in",
    resultUrl: "https://rajeduboard.rajasthan.gov.in",
    resultServer2: "https://sso.rajasthan.gov.in",
    importantDates: {
      "REET Notification": "Late 2026",
      "Examination Date": "Early 2027",
      "Certificate Validity": "Lifetime Validity"
    },
    fees: {
      "Single Level (Level 1 or 2)": "₹550",
      "Both Levels (Level 1 & 2)": "₹750"
    },
    eligibility: "Level 1 (Class 1-5): 12th with 50% + 2-Yr D.El.Ed / BST | Level 2 (Class 6-8): Graduation + 2-Yr D.El.Ed or B.Ed",
    ageLimit: "Minimum 18 Years. No upper age limit for eligibility test.",
    vacancies: {
      "Recruitment Scope": "Mandatory qualifying test for 3rd Grade Teacher (Tritiya Shreni Shikshak) 30,000+ posts in Rajasthan"
    },
    examPattern: {
      "OMR Scheme": "150 Questions, 150 Marks, 2.5 Hours. No Negative Marking.",
      "Subjects Level 1": "CDP (30), Language-I (30), Language-II (30), Mathematics (30), Environmental Studies (30)",
      "Subjects Level 2": "CDP (30), Language-I (30), Language-II (30), Science & Maths (60) OR Social Studies (60)"
    },
    photoSpecs: {
      type: "photo",
      minKb: 20,
      maxKb: 50,
      targetKb: 35,
      width: 350,
      height: 450,
      requireNameDate: true,
      notes: "White background, candidate name and photo date"
    },
    signSpecs: {
      type: "signature",
      minKb: 10,
      maxKb: 20,
      targetKb: 15,
      width: 280,
      height: 100,
      notes: "Black ink signature"
    }
  },
  {
    id: "ugc-net",
    name: "UGC NET / CSIR NET (Assistant Professor & JRF Fellowship)",
    shortName: "NTA UGC NET / JRF",
    category: "teaching",
    conductingBody: "National Testing Agency (NTA) on behalf of UGC",
    state: "All India",
    status: "June & December Cycles • Subject-wise Scorecards",
    officialUrl: "https://ugcnet.nta.ac.in",
    applyUrl: "https://ugcnet.nta.nic.in",
    pdfUrl: "https://ugcnet.nta.nic.in",
    resultUrl: "https://exams.nta.ac.in",
    resultServer2: "https://ugcnet.nta.nic.in",
    importantDates: {
      "June Cycle Exam": "June 2026",
      "December Cycle Exam": "December 2026",
      "e-Certificate & JRF Award": "Available on DigiLocker / NTA portal"
    },
    fees: {
      "General / Unreserved": "₹1,150",
      "General-EWS / OBC-NCL": "₹600",
      "SC / ST / PwD / Third Gender": "₹325"
    },
    eligibility: "Master's Degree or equivalent with min 55% marks (50% for OBC/SC/ST/PwD) in Humanities, Social Sciences, Commerce, Computer, Sciences",
    ageLimit: "Assistant Professor: No Upper Age Limit | JRF (Junior Research Fellowship): Maximum 30 Years (5 Years relaxation for OBC/SC/ST/Women/LLM)",
    vacancies: {
      "Eligibility": "Qualifies for Assistant Professor appointment in Universities & Colleges across India and Ph.D. admissions (Category 1, 2 & 3)"
    },
    examPattern: {
      "Mode": "Computer Based Test (CBT Online) without break",
      "Paper-1 (General Teaching & Research Aptitude)": "50 Questions / 100 Marks (Reasoning, Research Methodology, Comprehension, ICT, Higher Education)",
      "Paper-2 (Chosen Subject)": "100 Questions / 200 Marks. Total Duration: 3 Hours (180 Minutes). No Negative Marking."
    },
    photoSpecs: {
      type: "photo",
      minKb: 10,
      maxKb: 200,
      targetKb: 80,
      width: 350,
      height: 450,
      requireNameDate: false,
      notes: "White background, 80% face coverage without mask"
    },
    signSpecs: {
      type: "signature",
      minKb: 4,
      maxKb: 30,
      targetKb: 15,
      width: 250,
      height: 100,
      notes: "Black ballpoint pen on plain white paper (4-30 KB)"
    }
  }
];

// Helper functions for Application & Router
function getExamById(id) {
  return EXAMS_DATABASE.find(e => e.id === id);
}

function getExamsByCategory(category) {
  if (!category || category === 'all') return EXAMS_DATABASE;
  return EXAMS_DATABASE.filter(e => e.category === category);
}

function searchExams(query) {
  if (!query) return EXAMS_DATABASE;
  const q = query.toLowerCase().trim();
  return EXAMS_DATABASE.filter(e => 
    e.name.toLowerCase().includes(q) ||
    e.shortName.toLowerCase().includes(q) ||
    e.conductingBody.toLowerCase().includes(q) ||
    e.state.toLowerCase().includes(q) ||
    e.category.toLowerCase().includes(q)
  );
}

// Export for Node/CommonJS environments if used server-side
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { EXAMS_DATABASE, getExamById, getExamsByCategory, searchExams };
}
