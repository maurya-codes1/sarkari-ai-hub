// public/js/physical-calculator.js
// Physical Standards & PET/PST Fitness Eligibility Calculator (2026 Edition)
// Comprehensive rules for all Central Paramilitary, Armed Forces Agniveer & State Police Services

const PHYSICAL_EXAM_STANDARDS = {
  "ssc-gd": {
    name: "SSC GD Constable (CAPFs, BSF, CISF, CRPF, ITBP, SSB, SSF, Assam Rifles)",
    authority: "Staff Selection Commission & MHA",
    standards: {
      male: {
        ur_obc_sc: { height: 170, chestMin: 80, chestExp: 5, runDesc: "5.0 Km in 24:00 Minutes" },
        st: { height: 162.5, chestMin: 76, chestExp: 5, runDesc: "5.0 Km in 24:00 Minutes" },
        hilly: { height: 165, chestMin: 78, chestExp: 5, runDesc: "5.0 Km in 24:00 Minutes" }
      },
      female: {
        ur_obc_sc: { height: 157, chestMin: 0, chestExp: 0, runDesc: "1.6 Km in 08:30 Minutes" },
        st: { height: 150, chestMin: 0, chestExp: 0, runDesc: "1.6 Km in 08:30 Minutes" },
        hilly: { height: 155, chestMin: 0, chestExp: 0, runDesc: "1.6 Km in 08:30 Minutes" }
      }
    },
    weightRule: "Height-Weight proportion according to official medical guidelines.",
    petDetails: "दौड़ (Running) केवल क्वालिफाइंग प्रकृति की है। कोई अतिरिक्त अंक नहीं दिए जाते।"
  },
  "up-police": {
    name: "UP Police Constable 60,244 Bharti (Civil Police & PAC)",
    authority: "UPPRPB Lucknow",
    standards: {
      male: {
        ur_obc_sc: { height: 168, chestMin: 79, chestExp: 5, runDesc: "4.8 Km in 25:00 Minutes" },
        st: { height: 160, chestMin: 77, chestExp: 5, runDesc: "4.8 Km in 25:00 Minutes" },
        hilly: { height: 168, chestMin: 79, chestExp: 5, runDesc: "4.8 Km in 25:00 Minutes" }
      },
      female: {
        ur_obc_sc: { height: 152, chestMin: 0, chestExp: 0, runDesc: "2.4 Km in 14:00 Minutes", minWeight: 40 },
        st: { height: 147, chestMin: 0, chestExp: 0, runDesc: "2.4 Km in 14:00 Minutes", minWeight: 40 },
        hilly: { height: 152, chestMin: 0, chestExp: 0, runDesc: "2.4 Km in 14:00 Minutes", minWeight: 40 }
      }
    },
    weightRule: "महिला अभ्यर्थियों के लिए न्यूनतम वजन 40 किलोग्राम अनिवार्य है।",
    petDetails: "शारीरिक दक्षता परीक्षा (दौड़) में तय समय से 1 सेकंड भी अधिक होने पर अयोग्य घोषित कर दिया जाता है।"
  },
  "up-police-si": {
    name: "UP Police Sub-Inspector (Daroga SI)",
    authority: "UPPRPB Lucknow",
    standards: {
      male: {
        ur_obc_sc: { height: 168, chestMin: 79, chestExp: 5, runDesc: "4.8 Km in 28:00 Minutes" },
        st: { height: 160, chestMin: 77, chestExp: 5, runDesc: "4.8 Km in 28:00 Minutes" },
        hilly: { height: 168, chestMin: 79, chestExp: 5, runDesc: "4.8 Km in 28:00 Minutes" }
      },
      female: {
        ur_obc_sc: { height: 152, chestMin: 0, chestExp: 0, runDesc: "2.4 Km in 16:00 Minutes", minWeight: 40 },
        st: { height: 147, chestMin: 0, chestExp: 0, runDesc: "2.4 Km in 16:00 Minutes", minWeight: 40 },
        hilly: { height: 152, chestMin: 0, chestExp: 0, runDesc: "2.4 Km in 16:00 Minutes", minWeight: 40 }
      }
    },
    weightRule: "महिला अभ्यर्थियों के लिए न्यूनतम वजन 40 किग्रा अनिवार्य।",
    petDetails: "दौड़ केवल क्वालिफाइंग है। मेरिट लिखित परीक्षा (400 अंक) पर बनेगी।"
  },
  "bihar-police": {
    name: "Bihar Police CSBC Constable 21,391 Posts",
    authority: "Central Selection Board of Constable (CSBC) Patna",
    standards: {
      male: {
        ur_obc_sc: { height: 165, chestMin: 81, chestExp: 5, runDesc: "1.6 Km in 6 Mins (Max 50 Marks)" },
        st: { height: 160, chestMin: 79, chestExp: 5, runDesc: "1.6 Km in 6 Mins (Max 50 Marks)" },
        hilly: { height: 162, chestMin: 80, chestExp: 5, runDesc: "1.6 Km in 6 Mins (Max 50 Marks)" }
      },
      female: {
        ur_obc_sc: { height: 155, chestMin: 0, chestExp: 0, runDesc: "1.0 Km in 5 Mins (Max 50 Marks)", minWeight: 48 },
        st: { height: 155, chestMin: 0, chestExp: 0, runDesc: "1.0 Km in 5 Mins (Max 50 Marks)", minWeight: 48 },
        hilly: { height: 155, chestMin: 0, chestExp: 0, runDesc: "1.0 Km in 5 Mins (Max 50 Marks)", minWeight: 48 }
      }
    },
    weightRule: "सभी महिला उम्मीदवारों के लिए न्यूनतम वजन 48 किलोग्राम अनिवार्य है।",
    petDetails: "बिहार पुलिस में मेरिट लिखित परीक्षा से नहीं, बल्कि PET (दौड़ + ऊंची कूद + गोला फेंक) के 100 अंकों पर बनती है!"
  },
  "bihar-police-si": {
    name: "Bihar Police Sub-Inspector (BPSSC Daroga)",
    authority: "Bihar Police Subordinate Services Commission (BPSSC)",
    standards: {
      male: {
        ur_obc_sc: { height: 165, chestMin: 81, chestExp: 5, runDesc: "1.6 Km in 6m 30s • High Jump 4ft • Long Jump 12ft" },
        st: { height: 160, chestMin: 79, chestExp: 5, runDesc: "1.6 Km in 6m 30s • High Jump 4ft • Long Jump 12ft" },
        hilly: { height: 160, chestMin: 79, chestExp: 5, runDesc: "1.6 Km in 6m 30s • High Jump 4ft • Long Jump 12ft" }
      },
      female: {
        ur_obc_sc: { height: 155, chestMin: 0, chestExp: 0, runDesc: "1.0 Km in 6 Mins • High Jump 3ft • Long Jump 9ft", minWeight: 48 },
        st: { height: 155, chestMin: 0, chestExp: 0, runDesc: "1.0 Km in 6 Mins • High Jump 3ft • Long Jump 9ft", minWeight: 48 },
        hilly: { height: 155, chestMin: 0, chestExp: 0, runDesc: "1.0 Km in 6 Mins • High Jump 3ft • Long Jump 9ft", minWeight: 48 }
      }
    },
    weightRule: "महिला उम्मीदवारों का न्यूनतम वजन 48 किलोग्राम होना अनिवार्य है।",
    petDetails: "PET केवल क्वालिफाइंग है। मेरिट मुख्य लिखित परीक्षा (Mains 200 Marks) पर बनेगी।"
  },
  "rpf-constable": {
    name: "Railway RPF Constable & Sub-Inspector",
    authority: "Railway Protection Force & RRB",
    standards: {
      male: {
        ur_obc_sc: { height: 165, chestMin: 80, chestExp: 5, runDesc: "1600m in 5m 45s • Long Jump: 14ft • High Jump: 4ft" },
        st: { height: 160, chestMin: 76.2, chestExp: 5, runDesc: "1600m in 5m 45s • Long Jump: 14ft • High Jump: 4ft" },
        hilly: { height: 163, chestMin: 80, chestExp: 5, runDesc: "1600m in 5m 45s • Long Jump: 14ft • High Jump: 4ft" }
      },
      female: {
        ur_obc_sc: { height: 157, chestMin: 0, chestExp: 0, runDesc: "800m in 3m 40s • Long Jump: 9ft • High Jump: 3ft" },
        st: { height: 152, chestMin: 0, chestExp: 0, runDesc: "800m in 3m 40s • Long Jump: 9ft • High Jump: 3ft" },
        hilly: { height: 155, chestMin: 0, chestExp: 0, runDesc: "800m in 3m 40s • Long Jump: 9ft • High Jump: 3ft" }
      }
    },
    weightRule: "भारतीय रेल चिकित्सा नियमावली (IRMM) मेडिकल स्टैंडर्ड B-1 अनिवार्य।",
    petDetails: "दौड़ के लिए केवल 1 मौका मिलता है, जबकि लॉन्ग जंप और हाई जंप के लिए 2-2 मौके दिए जाते हैं।"
  },
  "delhi-police": {
    name: "Delhi Police Executive Constable (Male & Female)",
    authority: "Staff Selection Commission & Delhi Police",
    standards: {
      male: {
        ur_obc_sc: { height: 170, chestMin: 81, chestExp: 4, runDesc: "1600m in 6 Mins • Long Jump 14ft • High Jump 3ft 9in" },
        st: { height: 165, chestMin: 76, chestExp: 5, runDesc: "1600m in 6 Mins • Long Jump 14ft • High Jump 3ft 9in" },
        hilly: { height: 165, chestMin: 76, chestExp: 5, runDesc: "1600m in 6 Mins • Long Jump 14ft • High Jump 3ft 9in" }
      },
      female: {
        ur_obc_sc: { height: 157, chestMin: 0, chestExp: 0, runDesc: "1600m in 8 Mins • Long Jump 10ft • High Jump 3ft" },
        st: { height: 155, chestMin: 0, chestExp: 0, runDesc: "1600m in 8 Mins • Long Jump 10ft • High Jump 3ft" },
        hilly: { height: 155, chestMin: 0, chestExp: 0, runDesc: "1600m in 8 Mins • Long Jump 10ft • High Jump 3ft" }
      }
    },
    weightRule: "Height-Weight ratio medical standard (Male LMV Driving License required at PE&MT).",
    petDetails: "पुरुष अभ्यर्थियों के पास PE&MT के समय वैध LMV (कार/मोटरसाइकिल) ड्राइविंग लाइसेंस होना अनिवार्य है।"
  },
  "rajasthan-police": {
    name: "Rajasthan Police Constable & RAC",
    authority: "Rajasthan Police Headquarters Jaipur",
    standards: {
      male: {
        ur_obc_sc: { height: 168, chestMin: 81, chestExp: 5, runDesc: "5.0 Km in 25:00 Minutes" },
        st: { height: 160, chestMin: 79, chestExp: 5, runDesc: "5.0 Km in 25:00 Minutes" },
        hilly: { height: 160, chestMin: 79, chestExp: 5, runDesc: "5.0 Km in 25:00 Minutes" }
      },
      female: {
        ur_obc_sc: { height: 152, chestMin: 0, chestExp: 0, runDesc: "5.0 Km in 35:00 Minutes", minWeight: 47.5 },
        st: { height: 147, chestMin: 0, chestExp: 0, runDesc: "5.0 Km in 35:00 Minutes", minWeight: 43 },
        hilly: { height: 147, chestMin: 0, chestExp: 0, runDesc: "5.0 Km in 35:00 Minutes", minWeight: 43 }
      }
    },
    weightRule: "सामान्य वर्ग महिला उम्मीदवारों के लिए न्यूनतम वजन 47.5 किलोग्राम अनिवार्य है।",
    petDetails: "5 किमी दौड़ क्वालिफाइंग है। तय समय से अधिक समय लेने पर सीधे बाहर कर दिया जाता है।"
  },
  "mp-police": {
    name: "Madhya Pradesh (MP) Police Constable",
    authority: "MP Employees Selection Board (MPESB)",
    standards: {
      male: {
        ur_obc_sc: { height: 168, chestMin: 81, chestExp: 5, runDesc: "800m Run in 2m 45s (Max 40 Marks) + Long Jump + Shot Put" },
        st: { height: 160, chestMin: 76, chestExp: 5, runDesc: "800m Run in 2m 45s (Max 40 Marks) + Long Jump + Shot Put" },
        hilly: { height: 165, chestMin: 79, chestExp: 5, runDesc: "800m Run in 2m 45s (Max 40 Marks) + Long Jump + Shot Put" }
      },
      female: {
        ur_obc_sc: { height: 155, chestMin: 0, chestExp: 0, runDesc: "800m Run in 4m 00s (Max 40 Marks) + Long Jump + Shot Put" },
        st: { height: 155, chestMin: 0, chestExp: 0, runDesc: "800m Run in 4m 00s (Max 40 Marks) + Long Jump + Shot Put" },
        hilly: { height: 155, chestMin: 0, chestExp: 0, runDesc: "800m Run in 4m 00s (Max 40 Marks) + Long Jump + Shot Put" }
      }
    },
    weightRule: "बीएमआई (BMI) मानक के अनुसार अनुपात होना चाहिए।",
    petDetails: "एमपी पुलिस में फिजिकल के 100 अंक होते हैं, जो अंतिम मेरिट में जोड़े जाते हैं।"
  },
  "haryana-police": {
    name: "Haryana Police Constable (General Duty)",
    authority: "Haryana Staff Selection Commission (HSSC)",
    standards: {
      male: {
        ur_obc_sc: { height: 170, chestMin: 83, chestExp: 4, runDesc: "2.5 Km in 12:00 Minutes" },
        st: { height: 168, chestMin: 81, chestExp: 4, runDesc: "2.5 Km in 12:00 Minutes" },
        hilly: { height: 168, chestMin: 81, chestExp: 4, runDesc: "2.5 Km in 12:00 Minutes" }
      },
      female: {
        ur_obc_sc: { height: 158, chestMin: 0, chestExp: 0, runDesc: "1.0 Km in 06:00 Minutes" },
        st: { height: 156, chestMin: 0, chestExp: 0, runDesc: "1.0 Km in 06:00 Minutes" },
        hilly: { height: 156, chestMin: 0, chestExp: 0, runDesc: "1.0 Km in 06:00 Minutes" }
      }
    },
    weightRule: "ऊंचाई और आयु के अनुसार मानक शारीरिक गठन।",
    petDetails: "PST और PET दोनों केवल क्वालिफाइंग प्रकृति के होते हैं।"
  },
  "wb-police": {
    name: "West Bengal Police Constable & Kolkata Police",
    authority: "West Bengal Police Recruitment Board (WBPRB)",
    standards: {
      male: {
        ur_obc_sc: { height: 167, chestMin: 78, chestExp: 5, runDesc: "1600m in 6m 30s" },
        st: { height: 160, chestMin: 76, chestExp: 5, runDesc: "1600m in 6m 30s" },
        hilly: { height: 160, chestMin: 76, chestExp: 5, runDesc: "1600m in 6m 30s" }
      },
      female: {
        ur_obc_sc: { height: 160, chestMin: 0, chestExp: 0, runDesc: "800m in 4m 00s", minWeight: 49 },
        st: { height: 152, chestMin: 0, chestExp: 0, runDesc: "800m in 4m 00s", minWeight: 45 },
        hilly: { height: 152, chestMin: 0, chestExp: 0, runDesc: "800m in 4m 00s", minWeight: 45 }
      }
    },
    weightRule: "पुरुष: न्यूनतम 57 किग्रा (आरक्षित 53 किग्रा); महिला: न्यूनतम 49 किग्रा (आरक्षित 45 किग्रा)।",
    petDetails: "रेडियो फ्रीक्वेंसी आइडेंटिफिकेशन (RFID) चिप द्वारा दौड़ की टाइमिंग मापी जाती है।"
  },
  "maharashtra-police": {
    name: "Maharashtra Police Constable & SRPF",
    authority: "Maharashtra Police Bharti Cell",
    standards: {
      male: {
        ur_obc_sc: { height: 165, chestMin: 79, chestExp: 5, runDesc: "1600m Run (20 Marks) + 100m Sprint (15 Marks) + Shot Put (15 Marks)" },
        st: { height: 162, chestMin: 77, chestExp: 5, runDesc: "1600m Run (20 Marks) + 100m Sprint (15 Marks) + Shot Put (15 Marks)" },
        hilly: { height: 162, chestMin: 77, chestExp: 5, runDesc: "1600m Run (20 Marks) + 100m Sprint (15 Marks) + Shot Put (15 Marks)" }
      },
      female: {
        ur_obc_sc: { height: 158, chestMin: 0, chestExp: 0, runDesc: "800m Run (20 Marks) + 100m Sprint (15 Marks) + Shot Put (15 Marks)" },
        st: { height: 155, chestMin: 0, chestExp: 0, runDesc: "800m Run (20 Marks) + 100m Sprint (15 Marks) + Shot Put (15 Marks)" },
        hilly: { height: 155, chestMin: 0, chestExp: 0, runDesc: "800m Run (20 Marks) + 100m Sprint (15 Marks) + Shot Put (15 Marks)" }
      }
    },
    weightRule: "महाराष्ट्र पुलिस शारीरिक टेस्ट में कुल 50 अंक होते हैं।",
    petDetails: "मैदानी चाचणी (Ground Test) में न्यूनतम 50% अंक प्राप्त करना अनिवार्य है।"
  },
  "army-agniveer": {
    name: "Indian Army Agniveer GD (General Duty)",
    authority: "HQ Recruiting Zone & Indian Army",
    standards: {
      male: {
        ur_obc_sc: { height: 170, chestMin: 77, chestExp: 5, runDesc: "1.6 Km in 5m 30s (Group-I 60 Marks) + 10 Pull-ups (40 Marks)" },
        st: { height: 162, chestMin: 77, chestExp: 5, runDesc: "1.6 Km in 5m 30s (Group-I 60 Marks) + 10 Pull-ups (40 Marks)" },
        hilly: { height: 163, chestMin: 77, chestExp: 5, runDesc: "1.6 Km in 5m 30s (Group-I 60 Marks) + 10 Pull-ups (40 Marks)" }
      },
      female: {
        ur_obc_sc: { height: 162, chestMin: 0, chestExp: 0, runDesc: "1.6 Km in 7m 30s (Group-I) + Long Jump 10ft + High Jump 3ft" },
        st: { height: 158, chestMin: 0, chestExp: 0, runDesc: "1.6 Km in 7m 30s (Group-I) + Long Jump 10ft + High Jump 3ft" },
        hilly: { height: 160, chestMin: 0, chestExp: 0, runDesc: "1.6 Km in 7m 30s (Group-I) + Long Jump 10ft + High Jump 3ft" }
      }
    },
    weightRule: "उम्र और ऊंचाई के अनुपात में न्यूनतम 50 किलोग्राम वजन अपेक्षित।",
    petDetails: "फिजिकल फिटनेस टेस्ट (PFT) में 60 अंक 1.6 किमी दौड़ के और 40 अंक 10 बीम (Pull-ups) के होते हैं। 9 फीट गड्ढा और जिग-जैग बैलेंस क्वालिफाइंग है।"
  },
  "army-agniveer-tech": {
    name: "Indian Army Agniveer Technical / Clerk / Tradesman",
    authority: "Indian Army Recruiting Directorate",
    standards: {
      male: {
        ur_obc_sc: { height: 162, chestMin: 77, chestExp: 5, runDesc: "1.6 Km in 5m 45s + Pull-ups (Qualifying nature)" },
        st: { height: 160, chestMin: 77, chestExp: 5, runDesc: "1.6 Km in 5m 45s + Pull-ups (Qualifying nature)" },
        hilly: { height: 160, chestMin: 77, chestExp: 5, runDesc: "1.6 Km in 5m 45s + Pull-ups (Qualifying nature)" }
      },
      female: {
        ur_obc_sc: { height: 162, chestMin: 0, chestExp: 0, runDesc: "1.6 Km in 8m 00s" },
        st: { height: 158, chestMin: 0, chestExp: 0, runDesc: "1.6 Km in 8m 00s" },
        hilly: { height: 158, chestMin: 0, chestExp: 0, runDesc: "1.6 Km in 8m 00s" }
      }
    },
    weightRule: "क्लर्क/एसकेटी के लिए न्यूनतम ऊंचाई 162 सेमी पर्याप्त है।",
    petDetails: "टेक्निकल और क्लर्क के लिए फिजिकल टेस्ट केवल क्वालिफाइंग है, मेरिट लिखित CEE परीक्षा पर बनती है।"
  },
  "airforce-agniveer": {
    name: "Indian Air Force Agniveervayu (Science & Other than Science)",
    authority: "Central Airmen Selection Board (CASB)",
    standards: {
      male: {
        ur_obc_sc: { height: 152.5, chestMin: 77, chestExp: 5, runDesc: "1.6 Km in 7:00 Mins • 10 Push-ups • 10 Sit-ups • 20 Squats" },
        st: { height: 152.5, chestMin: 77, chestExp: 5, runDesc: "1.6 Km in 7:00 Mins • 10 Push-ups • 10 Sit-ups • 20 Squats" },
        hilly: { height: 152.5, chestMin: 77, chestExp: 5, runDesc: "1.6 Km in 7:00 Mins • 10 Push-ups • 10 Sit-ups • 20 Squats" }
      },
      female: {
        ur_obc_sc: { height: 152, chestMin: 0, chestExp: 0, runDesc: "1.6 Km in 8:00 Mins • 10 Sit-ups • 15 Squats" },
        st: { height: 152, chestMin: 0, chestExp: 0, runDesc: "1.6 Km in 8:00 Mins • 10 Sit-ups • 15 Squats" },
        hilly: { height: 152, chestMin: 0, chestExp: 0, runDesc: "1.6 Km in 8:00 Mins • 10 Sit-ups • 15 Squats" }
      }
    },
    weightRule: "ऊंचाई और आयु के अनुसार आनुपातिक वजन (Medical Standard IAF)।",
    petDetails: "दौड़ पूरी होने के बाद 10 मिनट के आराम के बाद पुश-अप्स, सिट-अप्स और स्क्वैट्स कराए जाते हैं।"
  },
  "navy-agniveer": {
    name: "Indian Navy Agniveer (SSR & MR)",
    authority: "Indian Navy Recruitment Directorate",
    standards: {
      male: {
        ur_obc_sc: { height: 157, chestMin: 77, chestExp: 5, runDesc: "1.6 Km in 6m 30s • 20 Squats (Uthak Baithak) • 12 Push-ups" },
        st: { height: 157, chestMin: 77, chestExp: 5, runDesc: "1.6 Km in 6m 30s • 20 Squats (Uthak Baithak) • 12 Push-ups" },
        hilly: { height: 157, chestMin: 77, chestExp: 5, runDesc: "1.6 Km in 6m 30s • 20 Squats (Uthak Baithak) • 12 Push-ups" }
      },
      female: {
        ur_obc_sc: { height: 152, chestMin: 0, chestExp: 0, runDesc: "1.6 Km in 8m 00s • 15 Squats (Uthak Baithak) • 10 Bent Knee Sit-ups" },
        st: { height: 152, chestMin: 0, chestExp: 0, runDesc: "1.6 Km in 8m 00s • 15 Squats (Uthak Baithak) • 10 Bent Knee Sit-ups" },
        hilly: { height: 152, chestMin: 0, chestExp: 0, runDesc: "1.6 Km in 8m 00s • 15 Squats (Uthak Baithak) • 10 Bent Knee Sit-ups" }
      }
    },
    weightRule: "आयु और ऊंचाई के अनुसार भारतीय नौसेना मेडिकल चार्ट के अनुरूप।",
    petDetails: "PFT उत्तीर्ण करना अनिवार्य है। नौसेना में शारीरिक दक्षता केवल क्वालिफाइंग है।"
  },
  "cisf-constable": {
    name: "CISF Constable Tradesman & Fireman",
    authority: "Central Industrial Security Force (CISF)",
    standards: {
      male: {
        ur_obc_sc: { height: 170, chestMin: 80, chestExp: 5, runDesc: "5.0 Km in 24:00 Minutes" },
        st: { height: 162.5, chestMin: 76, chestExp: 5, runDesc: "5.0 Km in 24:00 Minutes" },
        hilly: { height: 165, chestMin: 78, chestExp: 5, runDesc: "5.0 Km in 24:00 Minutes" }
      },
      female: {
        ur_obc_sc: { height: 157, chestMin: 0, chestExp: 0, runDesc: "1.6 Km in 08:30 Minutes" },
        st: { height: 150, chestMin: 0, chestExp: 0, runDesc: "1.6 Km in 08:30 Minutes" },
        hilly: { height: 155, chestMin: 0, chestExp: 0, runDesc: "1.6 Km in 08:30 Minutes" }
      }
    },
    weightRule: "चिकित्सा नियमावली अनुसार बीएमआई स्तर।",
    petDetails: "फायरमैन पद केवल पुरुष उम्मीदवारों के लिए है (ऊंचाई 170 सेमी अनिवार्य)।"
  },
  "crpf-constable": {
    name: "CRPF Constable Technical & Tradesman",
    authority: "Central Reserve Police Force (CRPF)",
    standards: {
      male: {
        ur_obc_sc: { height: 170, chestMin: 80, chestExp: 5, runDesc: "5.0 Km in 24:00 Minutes (Driver/Bugler) / 1.6km in 10m" },
        st: { height: 162.5, chestMin: 76, chestExp: 5, runDesc: "5.0 Km in 24:00 Minutes" },
        hilly: { height: 165, chestMin: 78, chestExp: 5, runDesc: "5.0 Km in 24:00 Minutes" }
      },
      female: {
        ur_obc_sc: { height: 157, chestMin: 0, chestExp: 0, runDesc: "1.6 Km in 08:30 Minutes" },
        st: { height: 150, chestMin: 0, chestExp: 0, runDesc: "1.6 Km in 08:30 Minutes" },
        hilly: { height: 155, chestMin: 0, chestExp: 0, runDesc: "1.6 Km in 08:30 Minutes" }
      }
    },
    weightRule: "ऊंचाई और आयु के अनुसार मेडिकल प्रोपोर्शन।",
    petDetails: "ट्रेड्समैन पदों पर ट्रेड टेस्ट भी शारीरिक परीक्षा के बाद लिया जाता है।"
  },
  "bsf-constable": {
    name: "BSF Constable GD & Tradesman",
    authority: "Border Security Force (BSF)",
    standards: {
      male: {
        ur_obc_sc: { height: 170, chestMin: 80, chestExp: 5, runDesc: "5.0 Km in 24:00 Minutes" },
        st: { height: 162.5, chestMin: 76, chestExp: 5, runDesc: "5.0 Km in 24:00 Minutes" },
        hilly: { height: 165, chestMin: 78, chestExp: 5, runDesc: "5.0 Km in 24:00 Minutes" }
      },
      female: {
        ur_obc_sc: { height: 157, chestMin: 0, chestExp: 0, runDesc: "1.6 Km in 08:30 Minutes" },
        st: { height: 150, chestMin: 0, chestExp: 0, runDesc: "1.6 Km in 08:30 Minutes" },
        hilly: { height: 155, chestMin: 0, chestExp: 0, runDesc: "1.6 Km in 08:30 Minutes" }
      }
    },
    weightRule: "BSF मेडिकल बोर्ड दिशा-निर्देशों के अनुरूप।",
    petDetails: "दौड़ समय पर पूरा न करने पर कोई दूसरा अवसर नहीं दिया जाता।"
  },
  "itbp-constable": {
    name: "ITBP Police Constable (Animal Transport / Tradesman)",
    authority: "Indo-Tibetan Border Police (ITBP)",
    standards: {
      male: {
        ur_obc_sc: { height: 170, chestMin: 80, chestExp: 5, runDesc: "1.6 Km in 7m 30s • Long Jump 11ft • High Jump 3.5ft" },
        st: { height: 162.5, chestMin: 76, chestExp: 5, runDesc: "1.6 Km in 7m 30s • Long Jump 11ft • High Jump 3.5ft" },
        hilly: { height: 165, chestMin: 78, chestExp: 5, runDesc: "1.6 Km in 7m 30s • Long Jump 11ft • High Jump 3.5ft" }
      },
      female: {
        ur_obc_sc: { height: 157, chestMin: 0, chestExp: 0, runDesc: "800m in 4m 45s • Long Jump 9ft • High Jump 3ft" },
        st: { height: 150, chestMin: 0, chestExp: 0, runDesc: "800m in 4m 45s • Long Jump 9ft • High Jump 3ft" },
        hilly: { height: 155, chestMin: 0, chestExp: 0, runDesc: "800m in 4m 45s • Long Jump 9ft • High Jump 3ft" }
      }
    },
    weightRule: "हाई-अल्टीट्यूड मेडिकल फिटनेस अनिवार्य।",
    petDetails: "लॉन्ग जंप और हाई जंप के लिए 3 मौके दिए जाते हैं।"
  },
  "ssb-constable": {
    name: "SSB Sashastra Seema Bal Constable",
    authority: "Sashastra Seema Bal (SSB)",
    standards: {
      male: {
        ur_obc_sc: { height: 170, chestMin: 80, chestExp: 5, runDesc: "4.8 Km in 24:00 Minutes" },
        st: { height: 162.5, chestMin: 76, chestExp: 5, runDesc: "4.8 Km in 24:00 Minutes" },
        hilly: { height: 165, chestMin: 78, chestExp: 5, runDesc: "4.8 Km in 24:00 Minutes" }
      },
      female: {
        ur_obc_sc: { height: 157, chestMin: 0, chestExp: 0, runDesc: "2.4 Km in 18:00 Minutes" },
        st: { height: 150, chestMin: 0, chestExp: 0, runDesc: "2.4 Km in 18:00 Minutes" },
        hilly: { height: 155, chestMin: 0, chestExp: 0, runDesc: "2.4 Km in 18:00 Minutes" }
      }
    },
    weightRule: "MHA गाइडलाइंस मेडिकल मानक।",
    petDetails: "बायोमेट्रिक सत्यापन के बाद ही दौड़ में प्रवेश दिया जाता है।"
  },
  "ssc-cpo": {
    name: "SSC CPO Sub-Inspector (Delhi Police & CAPFs SI)",
    authority: "Staff Selection Commission (SSC)",
    standards: {
      male: {
        ur_obc_sc: { height: 170, chestMin: 80, chestExp: 5, runDesc: "100m in 16s • 1.6km in 6.5m • Long Jump 3.65m • High Jump 1.2m • Shot put 4.5m" },
        st: { height: 162.5, chestMin: 77, chestExp: 5, runDesc: "100m in 16s • 1.6km in 6.5m • Long Jump 3.65m • High Jump 1.2m • Shot put 4.5m" },
        hilly: { height: 165, chestMin: 80, chestExp: 5, runDesc: "100m in 16s • 1.6km in 6.5m • Long Jump 3.65m • High Jump 1.2m • Shot put 4.5m" }
      },
      female: {
        ur_obc_sc: { height: 157, chestMin: 0, chestExp: 0, runDesc: "100m in 18s • 800m in 4m • Long Jump 2.7m • High Jump 0.9m" },
        st: { height: 154, chestMin: 0, chestExp: 0, runDesc: "100m in 18s • 800m in 4m • Long Jump 2.7m • High Jump 0.9m" },
        hilly: { height: 155, chestMin: 0, chestExp: 0, runDesc: "100m in 18s • 800m in 4m • Long Jump 2.7m • High Jump 0.9m" }
      }
    },
    weightRule: "आयु और ऊंचाई के अनुसार आनुपातिक वजन।",
    petDetails: "PST और PET में उत्तीर्ण होना अनिवार्य है। इसके बाद पेपर-2 (इंग्लिश कॉम्प्रिहेंशन) होता है।"
  },
  "upsc-nda": {
    name: "UPSC NDA & NA (Army, Navy, Air Force Wing Cadets)",
    authority: "Union Public Service Commission (UPSC) & SSB",
    standards: {
      male: {
        ur_obc_sc: { height: 157, chestMin: 77, chestExp: 5, runDesc: "2.4 Km in 15 Mins • Skipping • Push-ups • Pull-ups (SSB Board Standards)" },
        st: { height: 152, chestMin: 77, chestExp: 5, runDesc: "2.4 Km in 15 Mins • Skipping • Push-ups • Pull-ups (SSB Board Standards)" },
        hilly: { height: 152, chestMin: 77, chestExp: 5, runDesc: "2.4 Km in 15 Mins • Skipping • Push-ups • Pull-ups (SSB Board Standards)" }
      },
      female: {
        ur_obc_sc: { height: 152, chestMin: 0, chestExp: 0, runDesc: "2.4 Km in 15 Mins • Skipping • Push-ups (SSB Board Standards)" },
        st: { height: 147, chestMin: 0, chestExp: 0, runDesc: "2.4 Km in 15 Mins • Skipping • Push-ups (SSB Board Standards)" },
        hilly: { height: 147, chestMin: 0, chestExp: 0, runDesc: "2.4 Km in 15 Mins • Skipping • Push-ups (SSB Board Standards)" }
      }
    },
    weightRule: "एयरफोर्स विंग के लिए न्यूनतम ऊंचाई 162.5 सेमी अनिवार्य है।",
    petDetails: "एसएसबी इंटरव्यू (SSB Interview) के बाद मेडिकल बोर्ड द्वारा गहन मेडिकल परीक्षण किया जाता है।"
  }
};

// Robust alias dictionary resolving any user or HTML key to valid database key
const PHYSICAL_EXAM_ALIASES = {
  'agniveer-gd': 'army-agniveer',
  'agniveer-army': 'army-agniveer',
  'army-agniveer-gd': 'army-agniveer',
  'agniveer': 'army-agniveer',
  'up-police-constable': 'up-police',
  'up-police-si': 'up-police-si',
  'bihar-police-constable': 'bihar-police',
  'bihar-police-si': 'bihar-police-si',
  'agniveer-airforce': 'airforce-agniveer',
  'agniveer-navy': 'navy-agniveer',
  'rpf': 'rpf-constable',
  'rpf-si': 'rpf-constable',
  'cisf': 'cisf-constable',
  'crpf': 'crpf-constable',
  'bsf': 'bsf-constable',
  'itbp': 'itbp-constable',
  'ssb': 'ssb-constable',
  'cpo': 'ssc-cpo',
  'nda': 'upsc-nda'
};

function resolvePhysicalExamKey(rawKey) {
  if (!rawKey) return 'ssc-gd';
  const clean = rawKey.toLowerCase().trim();
  if (PHYSICAL_EXAM_STANDARDS[clean]) return clean;
  if (PHYSICAL_EXAM_ALIASES[clean]) return PHYSICAL_EXAM_ALIASES[clean];
  return 'ssc-gd';
}

function calculatePhysicalEligibility(isSilent = false) {
  const rawExamKey = document.getElementById('physExamSelect')?.value || 'ssc-gd';
  const examKey = resolvePhysicalExamKey(rawExamKey);
  const gender = document.getElementById('physGenderSelect')?.value || 'male';
  const category = document.getElementById('physCategorySelect')?.value || 'ur_obc_sc';
  const region = document.getElementById('physRegionSelect')?.value || 'plains';

  const userHeight = parseFloat(document.getElementById('physHeightInput')?.value || document.getElementById('physUserHeight')?.value || 0);
  const userChestNorm = parseFloat(document.getElementById('physChestUnexpInput')?.value || document.getElementById('physUserChestNormal')?.value || 0);
  const userChestExp = parseFloat(document.getElementById('physChestExpInput')?.value || document.getElementById('physUserChestExpanded')?.value || 0);
  const userWeight = parseFloat(document.getElementById('physWeightInput')?.value || document.getElementById('physUserWeight')?.value || 0);

  if (isNaN(userHeight) || userHeight <= 0) {
    if (!isSilent) {
      alert('कृपया अपनी सटीक ऊंचाई (Height in Centimeters) दर्ज करें।');
    }
    return;
  }

  const examData = PHYSICAL_EXAM_STANDARDS[examKey] || PHYSICAL_EXAM_STANDARDS['ssc-gd'];
  const genderData = examData.standards[gender];

  // Determine standard key: 'st', 'hilly', or 'ur_obc_sc'
  let stdKey = 'ur_obc_sc';
  if (category === 'st') {
    stdKey = 'st';
  } else if (region === 'hilly' || category === 'hilly') {
    stdKey = 'hilly';
  }

  const req = genderData[stdKey] || genderData['ur_obc_sc'];

  // Check 1: Height
  const heightPassed = userHeight >= req.height;
  const heightDiff = (userHeight - req.height).toFixed(1);

  // Check 2: Chest (Male only)
  let chestPassed = true;
  let chestExpansion = 0;
  let chestDiff = 0;

  if (gender === 'male' && req.chestMin > 0) {
    chestExpansion = userChestExp - userChestNorm;
    chestDiff = userChestNorm - req.chestMin;
    chestPassed = (userChestNorm >= req.chestMin) && (chestExpansion >= req.chestExp);
  }

  // Check 3: Weight (if applicable, e.g. females in Police)
  let weightPassed = true;
  if (req.minWeight && userWeight > 0) {
    weightPassed = userWeight >= req.minWeight;
  }

  const isFullyEligible = heightPassed && chestPassed && weightPassed;

  // Render Result Card
  const resultDisplay = document.getElementById('physResultDisplay');
  if (!resultDisplay) return;

  let statusBadge = isFullyEligible
    ? `<span class="px-4 py-1.5 rounded-full text-xs font-black bg-emerald-600 text-white shadow-md">🟢 100% Eligible (शारीरिक रूप से योग्य)</span>`
    : `<span class="px-4 py-1.5 rounded-full text-xs font-black bg-rose-600 text-white shadow-md">🔴 Not Meeting Criteria (मापदंड से कम)</span>`;

  let adviceHtml = '';
  if (isFullyEligible) {
    adviceHtml = `
      <div class="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700/60 rounded-2xl p-4 text-emerald-900 dark:text-emerald-200 text-xs font-semibold space-y-1">
        <div class="font-black text-sm flex items-center space-x-1.5">
          <span>🎉 बधाई हो! आप PST (शारीरिक मानक) उत्तीर्ण करने के पूर्ण पात्र हैं।</span>
        </div>
        <p>अब आपका मुख्य ध्यान <strong>दौड़ (PET) की नियमित प्रैक्टिस</strong> और लिखित परीक्षा के मॉक टेस्ट पर होना चाहिए।</p>
      </div>
    `;
  } else {
    adviceHtml = `
      <div class="bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-700/60 rounded-2xl p-4 text-rose-900 dark:text-rose-200 text-xs font-semibold space-y-2">
        <div class="font-black text-sm flex items-center space-x-1.5">
          <span>⚠️ महत्वपूर्ण शारीरिक सुधार सुझाव (Essential Improvement Tips):</span>
        </div>
        <ul class="list-disc list-inside space-y-1 pl-1">
          ${!heightPassed ? `<li>आपकी ऊंचाई आधिकारिक न्यूनतम माप से <strong>${Math.abs(heightDiff)} cm</strong> कम है। ताड़ासन, पुल-अप्स और रीढ़ की हड्डी की सीधी मुद्रा (Spine Decompression) का अभ्यास करें।</li>` : ''}
          ${!chestPassed ? `<li>छाती का फुलाव कम से कम 5 सेमी होना आवश्यक है। प्रतिदिन 30 पुश-अप्स (Push-ups) और गहरी सांस लेने का प्राणायाम (Deep Inhaling) करें।</li>` : ''}
          ${!weightPassed ? `<li>महिला उम्मीदवारों के लिए न्यूनतम 40/48 किग्रा वजन अनिवार्य है। प्रोटीन व संतुलित आहार लेकर वजन बढ़ाएं।</li>` : ''}
        </ul>
      </div>
    `;
  }

  resultDisplay.className = `p-6 sm:p-8 rounded-3xl border-2 shadow-xl space-y-5 ${isFullyEligible ? 'bg-white dark:bg-slate-900 border-emerald-400 dark:border-emerald-600/60 text-slate-900 dark:text-white' : 'bg-white dark:bg-slate-900 border-rose-400 dark:border-rose-600/60 text-slate-900 dark:text-white'}`;
  resultDisplay.innerHTML = `
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
      <div>
        <div class="mb-1">${statusBadge}</div>
        <h3 class="text-xl font-black text-slate-900 dark:text-white">${examData.name}</h3>
        <p class="text-xs text-slate-500 dark:text-slate-400 font-bold">${examData.authority} • Official Standards 2026</p>
      </div>
      <div class="text-right">
        <span class="text-xs font-black text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 px-3 py-1.5 rounded-xl">
          ${gender === 'male' ? 'पुरुष (Male)' : 'महिला (Female)'} • ${category.toUpperCase()}
        </span>
      </div>
    </div>

    <!-- 3-Pill Physical Metric Breakdown -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
      
      <!-- Height Card -->
      <div class="p-4 rounded-2xl border ${heightPassed ? 'bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200' : 'bg-rose-50/60 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800 text-rose-950 dark:text-rose-200'} text-center">
        <div class="text-[11px] font-bold uppercase tracking-wider">ऊंचाई (Height)</div>
        <div class="text-2xl font-black mt-1">${userHeight} cm</div>
        <div class="text-[11px] font-semibold mt-0.5">
          न्यूनतम आवश्यक: <strong>${req.height} cm</strong>
        </div>
        <div class="text-[10px] font-bold mt-1 ${heightPassed ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'}">
          ${heightPassed ? `✓ +${heightDiff} cm अधिक (सुरक्षित)` : `✕ ${Math.abs(heightDiff)} cm कम`}
        </div>
      </div>

      <!-- Chest Card (Male only) -->
      ${gender === 'male' ? `
        <div class="p-4 rounded-2xl border ${chestPassed ? 'bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200' : 'bg-rose-50/60 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800 text-rose-950 dark:text-rose-200'} text-center">
          <div class="text-[11px] font-bold uppercase tracking-wider">सीना फुलाव (Chest)</div>
          <div class="text-2xl font-black mt-1">${userChestNorm || 0} - ${userChestExp || 0} cm</div>
          <div class="text-[11px] font-semibold mt-0.5">
            मानक: <strong>${req.chestMin} cm (+${req.chestExp}cm फुलाव)</strong>
          </div>
          <div class="text-[10px] font-bold mt-1 ${chestPassed ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'}">
            ${chestPassed ? `✓ फुलाव: ${chestExpansion} cm (योग्य)` : `✕ न्यूनतम फुलाव 5 सेमी अनिवार्य`}
          </div>
        </div>
      ` : `
        <div class="p-4 rounded-2xl border bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-center">
          <div class="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">सीना माप (Chest)</div>
          <div class="text-xl font-black text-slate-400 dark:text-slate-500 mt-2">लागू नहीं (N/A)</div>
          <div class="text-[11px] text-slate-500 dark:text-slate-400 mt-1">महिला अभ्यर्थियों पर सीना माप लागू नहीं है।</div>
        </div>
      `}

      <!-- PET Running Card -->
      <div class="p-4 rounded-2xl border bg-blue-50/60 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-blue-950 dark:text-blue-200 text-center">
        <div class="text-[11px] font-bold uppercase tracking-wider text-blue-800 dark:text-blue-300">दौड़ मानक (PET Running)</div>
        <div class="text-sm font-black text-slate-900 dark:text-white mt-1 leading-snug">${req.runDesc}</div>
        <div class="text-[10px] font-bold text-blue-700 dark:text-blue-400 mt-1">स्टॉपवॉच लगाकर अभ्यास करें</div>
      </div>

    </div>

    ${adviceHtml}

    <div class="p-3.5 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 text-[11px] text-slate-600 dark:text-slate-300 space-y-1">
      <div><strong>📌 वजन नियम:</strong> ${examData.weightRule}</div>
      <div><strong>🏃 दौड़ व इवेंट्स:</strong> ${examData.petDetails}</div>
    </div>
  `;

  resultDisplay.classList.remove('hidden');
  resultDisplay.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function handleGenderChangeForPhysical() {
  const gender = document.getElementById('physGenderSelect')?.value || 'male';
  const chestGroup = document.getElementById('physChestInputsGroup');
  const weightGroup = document.getElementById('physWeightInputsGroup');

  if (chestGroup) {
    if (gender === 'female') {
      chestGroup.classList.add('hidden');
    } else {
      chestGroup.classList.remove('hidden');
    }
  }

  if (weightGroup) {
    if (gender === 'female') {
      weightGroup.classList.remove('hidden');
    }
  }
}

function initPhysicalCalculator() {
  const genderSelect = document.getElementById('physGenderSelect');
  if (genderSelect) {
    genderSelect.removeEventListener('change', handleGenderChangeForPhysical);
    genderSelect.addEventListener('change', handleGenderChangeForPhysical);
  }
  handleGenderChangeForPhysical();
}

// React to language change
window.addEventListener('languageChanged', () => {
  const resultDisplay = document.getElementById('physResultDisplay');
  if (resultDisplay && !resultDisplay.classList.contains('hidden') && resultDisplay.querySelector('.grid')) {
    calculatePhysicalEligibility(true);
  }
});

document.addEventListener('DOMContentLoaded', initPhysicalCalculator);

// Global Exports
window.PHYSICAL_EXAM_STANDARDS = PHYSICAL_EXAM_STANDARDS;
window.resolvePhysicalExamKey = resolvePhysicalExamKey;
window.calculatePhysicalEligibility = calculatePhysicalEligibility;
window.initPhysicalCalculator = initPhysicalCalculator;
