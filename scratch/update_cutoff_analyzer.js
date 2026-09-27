const fs = require('fs');
const path = require('path');

const cutoffJsFile = path.join(__dirname, '..', 'public', 'js', 'cutoff-analyzer.js');
let content = fs.readFileSync(cutoffJsFile, 'utf8');

const updatedBenchmarks = `const CUTOFF_BENCHMARKS = {
  "ssc-gd": {
    name: "SSC GD Constable (Total Marks: 160)",
    maxMarks: 160,
    historical: { "2024": { ur: 138, obc: 135, ews: 133, sc: 124, st: 118 }, "2023": { ur: 132, obc: 128, ews: 126, sc: 118, st: 112 } },
    expectedCutoffs: {
      "up": { ur: 140, obc: 137, ews: 135, sc: 126, st: 118 },
      "bihar": { ur: 138, obc: 135, ews: 133, sc: 124, st: 116 },
      "rajasthan": { ur: 139, obc: 136, ews: 134, sc: 125, st: 122 },
      "mp": { ur: 134, obc: 131, ews: 129, sc: 121, st: 112 },
      "haryana": { ur: 141, obc: 138, ews: 136, sc: 127, st: 119 },
      "wb": { ur: 115, obc: 108, ews: 102, sc: 96, st: 92 },
      "delhi": { ur: 132, obc: 126, ews: 122, sc: 115, st: 106 },
      "other": { ur: 128, obc: 122, ews: 118, sc: 110, st: 102 }
    }
  },
  "up-police": {
    name: "UP Police Constable 60,244 Bharti (Total Marks: 300)",
    maxMarks: 300,
    historical: { "2024": { ur: 218, obc: 209, ews: 205, sc: 184, st: 156 }, "2020": { ur: 214, obc: 204, ews: 200, sc: 178, st: 150 } },
    expectedCutoffs: {
      "up": { ur: 220, obc: 212, ews: 208, sc: 186, st: 158 },
      "bihar": { ur: 225, obc: 225, ews: 225, sc: 225, st: 225 },
      "other": { ur: 225, obc: 225, ews: 225, sc: 225, st: 225 }
    }
  },
  "up-police-si": {
    name: "UP Police Sub-Inspector SI (Total Marks: 400)",
    maxMarks: 400,
    historical: { "2022": { ur: 302, obc: 287, ews: 285, sc: 260, st: 223 } },
    expectedCutoffs: {
      "all": { ur: 308, obc: 292, ews: 290, sc: 265, st: 228 }
    }
  },
  "bihar-police": {
    name: "Bihar Police Constable 21,391 Posts (Total Marks: 100)",
    maxMarks: 100,
    historical: { "2024": { ur: 74, obc: 70, ews: 68, sc: 60, st: 58 }, "2021": { ur: 72, obc: 67, ews: 65, sc: 58, st: 56 } },
    expectedCutoffs: {
      "bihar": { ur: 76, obc: 72, ews: 70, sc: 62, st: 60 },
      "other": { ur: 78, obc: 78, ews: 78, sc: 78, st: 78 }
    }
  },
  "delhi-police": {
    name: "Delhi Police Executive Constable (Total Marks: 100)",
    maxMarks: 100,
    historical: { "2024": { ur: 68, obc: 67, ews: 62, sc: 58, st: 58 }, "2020": { ur: 72, obc: 68, ews: 62, sc: 57, st: 65 } },
    expectedCutoffs: {
      "all": { ur: 71, obc: 69, ews: 65, sc: 61, st: 61 }
    }
  },
  "rajasthan-police": {
    name: "Rajasthan Police Constable (Total Marks: 150)",
    maxMarks: 150,
    historical: { "2024": { ur: 105, obc: 102, ews: 98, sc: 92, st: 88 } },
    expectedCutoffs: {
      "rajasthan": { ur: 108, obc: 104, ews: 100, sc: 94, st: 90 },
      "other": { ur: 110, obc: 110, ews: 110, sc: 110, st: 110 }
    }
  },
  "mp-police": {
    name: "Madhya Pradesh (MP) Police Constable (Total Marks: 100)",
    maxMarks: 100,
    historical: { "2023": { ur: 75, obc: 73, ews: 70, sc: 66, st: 60 } },
    expectedCutoffs: {
      "mp": { ur: 77, obc: 75, ews: 72, sc: 68, st: 62 },
      "other": { ur: 80, obc: 80, ews: 80, sc: 80, st: 80 }
    }
  },
  "haryana-police": {
    name: "Haryana Police Constable (Total Marks: 100)",
    maxMarks: 100,
    historical: { "2024": { ur: 64, obc: 61, ews: 62, sc: 55, st: 52 } },
    expectedCutoffs: {
      "all": { ur: 66, obc: 63, ews: 64, sc: 57, st: 54 }
    }
  },
  "rrb-alp": {
    name: "Railway RRB ALP CBT-1 (Total Marks: 75)",
    maxMarks: 75,
    historical: { "2024": { ur: 52, obc: 48, ews: 45, sc: 40, st: 34 }, "2018": { ur: 48, obc: 44, ews: 42, sc: 36, st: 30 } },
    expectedCutoffs: {
      "all": { ur: 54, obc: 50, ews: 47, sc: 42, st: 36 }
    }
  },
  "rrb-technician": {
    name: "Railway RRB Technician Grade-I & III (Total Marks: 100)",
    maxMarks: 100,
    historical: { "2024": { ur: 72, obc: 68, ews: 65, sc: 58, st: 52 } },
    expectedCutoffs: {
      "all": { ur: 74, obc: 70, ews: 67, sc: 60, st: 54 }
    }
  },
  "rrb-ntpc": {
    name: "Railway RRB NTPC CBT-1 (Total Marks: 100)",
    maxMarks: 100,
    historical: { "2021": { ur: 76, obc: 72, ews: 69, sc: 63, st: 58 } },
    expectedCutoffs: {
      "all": { ur: 78, obc: 74, ews: 71, sc: 65, st: 60 }
    }
  },
  "rrb-group-d": {
    name: "Railway RRB Group D Level-1 (Total Marks: 100)",
    maxMarks: 100,
    historical: { "2022": { ur: 67, obc: 62, ews: 58, sc: 54, st: 49 } },
    expectedCutoffs: {
      "all": { ur: 69, obc: 64, ews: 60, sc: 56, st: 51 }
    }
  },
  "rpf-constable": {
    name: "Railway RPF Constable & SI (Total Marks: 120)",
    maxMarks: 120,
    historical: { "2019": { ur: 86, obc: 84, ews: 81, sc: 78, st: 72 } },
    expectedCutoffs: {
      "all": { ur: 89, obc: 86, ews: 83, sc: 80, st: 74 }
    }
  },
  "ssc-cgl": {
    name: "SSC CGL Tier-1 (Total Marks: 200)",
    maxMarks: 200,
    historical: { "2024": { ur: 153, obc: 148, ews: 146, sc: 132, st: 122 }, "2023": { ur: 150, obc: 145, ews: 143, sc: 126, st: 118 } },
    expectedCutoffs: {
      "all": { ur: 155, obc: 150, ews: 148, sc: 134, st: 124 }
    }
  },
  "ssc-chsl": {
    name: "SSC CHSL Tier-1 (Total Marks: 200)",
    maxMarks: 200,
    historical: { "2024": { ur: 157, obc: 153, ews: 151, sc: 136, st: 125 } },
    expectedCutoffs: {
      "all": { ur: 159, obc: 155, ews: 153, sc: 138, st: 127 }
    }
  },
  "ssc-mts": {
    name: "SSC MTS & Havaldar (Total Marks: 150)",
    maxMarks: 150,
    historical: { "2024": { ur: 128, obc: 125, ews: 122, sc: 116, st: 108 } },
    expectedCutoffs: {
      "all": { ur: 130, obc: 127, ews: 124, sc: 118, st: 110 }
    }
  },
  "ssc-cpo": {
    name: "SSC CPO Sub-Inspector Paper-1 (Total Marks: 200)",
    maxMarks: 200,
    historical: { "2024": { ur: 122, obc: 118, ews: 114, sc: 102, st: 98 } },
    expectedCutoffs: {
      "all": { ur: 125, obc: 121, ews: 117, sc: 105, st: 101 }
    }
  },
  "army-agniveer": {
    name: "Indian Army Agniveer CEE (Total Marks: 100)",
    maxMarks: 100,
    historical: { "2024": { ur: 65, obc: 63, ews: 60, sc: 55, st: 50 } },
    expectedCutoffs: {
      "all": { ur: 68, obc: 65, ews: 62, sc: 57, st: 52 }
    }
  },
  "airforce-agniveer": {
    name: "Indian Air Force Agniveervayu (Total Marks: 70)",
    maxMarks: 70,
    historical: { "2024": { ur: 38, obc: 38, ews: 38, sc: 38, st: 38 } },
    expectedCutoffs: {
      "all": { ur: 40, obc: 40, ews: 40, sc: 40, st: 40 }
    }
  },
  "navy-agniveer": {
    name: "Indian Navy Agniveer SSR/MR (Total Marks: 100)",
    maxMarks: 100,
    historical: { "2024": { ur: 54, obc: 50, ews: 48, sc: 44, st: 40 } },
    expectedCutoffs: {
      "all": { ur: 56, obc: 52, ews: 50, sc: 46, st: 42 }
    }
  },
  "ibps-po": {
    name: "IBPS Bank PO Prelims (Total Marks: 100)",
    maxMarks: 100,
    historical: { "2024": { ur: 54.5, obc: 54.5, ews: 54.5, sc: 49.5, st: 43.5 } },
    expectedCutoffs: {
      "all": { ur: 56, obc: 56, ews: 56, sc: 51, st: 45 }
    }
  },
  "ibps-clerk": {
    name: "IBPS Bank Clerk Prelims (Total Marks: 100)",
    maxMarks: 100,
    historical: { "2024": { ur: 78.5, obc: 77.5, ews: 76.5, sc: 70, st: 64 } },
    expectedCutoffs: {
      "all": { ur: 80, obc: 79, ews: 78, sc: 71, st: 65 }
    }
  },
  "bpsc-tre": {
    name: "BPSC Teacher TRE 3.0/4.0 (Total Marks: 150)",
    maxMarks: 150,
    historical: { "2024": { ur: 86, obc: 82, ews: 80, sc: 68, st: 64 } },
    expectedCutoffs: {
      "bihar": { ur: 88, obc: 84, ews: 82, sc: 70, st: 66 },
      "other": { ur: 90, obc: 90, ews: 90, sc: 90, st: 90 }
    }
  },
  "ctet-exam": {
    name: "CBSE CTET Qualifying Cutoff (Total Marks: 150)",
    maxMarks: 150,
    historical: { "2024": { ur: 90, obc: 82, ews: 82, sc: 82, st: 82 } },
    expectedCutoffs: {
      "all": { ur: 90, obc: 82, ews: 82, sc: 82, st: 82 }
    }
  },
  "uptet-exam": {
    name: "UPTET / Super TET Teacher (Total Marks: 150)",
    maxMarks: 150,
    historical: { "2024": { ur: 97, obc: 90, ews: 90, sc: 90, st: 90 } },
    expectedCutoffs: {
      "all": { ur: 97, obc: 90, ews: 90, sc: 90, st: 90 }
    }
  },
  "nta-neet": {
    name: "NTA NEET UG Qualifying Percentile (Total Marks: 720)",
    maxMarks: 720,
    historical: { "2024": { ur: 164, obc: 129, ews: 164, sc: 129, st: 129 } },
    expectedCutoffs: {
      "all": { ur: 168, obc: 132, ews: 168, sc: 132, st: 132 }
    }
  },
  "nta-jee-main": {
    name: "NTA JEE Main Qualifying Cutoff Score (Total Marks: 300)",
    maxMarks: 300,
    historical: { "2024": { ur: 93, obc: 79, ews: 81, sc: 60, st: 46 } },
    expectedCutoffs: {
      "all": { ur: 95, obc: 81, ews: 83, sc: 62, st: 48 }
    }
  },
  "upsc-cse": {
    name: "UPSC Civil Services Prelims GS-1 (Total Marks: 200)",
    maxMarks: 200,
    historical: { "2024": { ur: 92, obc: 89, ews: 84, sc: 78, st: 72 } },
    expectedCutoffs: {
      "all": { ur: 94, obc: 91, ews: 86, sc: 80, st: 74 }
    }
  }
};

const CUTOFF_ALIASES = {
  'up-police-constable': 'up-police',
  'bihar-police-constable': 'bihar-police',
  'agniveer-gd': 'army-agniveer',
  'agniveer-army': 'army-agniveer',
  'army-agniveer-gd': 'army-agniveer',
  'agniveer-airforce': 'airforce-agniveer',
  'agniveer-navy': 'navy-agniveer',
  'rpf': 'rpf-constable'
};

function resolveCutoffExamKey(key) {
  if (!key) return 'ssc-gd';
  const clean = key.toLowerCase().trim();
  if (CUTOFF_BENCHMARKS[clean]) return clean;
  if (CUTOFF_ALIASES[clean]) return CUTOFF_ALIASES[clean];
  return 'ssc-gd';
}
`;

const startIndex = content.indexOf('const CUTOFF_BENCHMARKS = {');
const endIndex = content.indexOf('function analyzeCutoffScore(isSilent = false) {');

if (startIndex !== -1 && endIndex !== -1) {
  let afterAnalyze = content.substring(endIndex);
  // Replace direct lookup with resolveCutoffExamKey
  afterAnalyze = afterAnalyze.replace(
    "const examKey = document.getElementById('cutoffExamSelect')?.value || 'ssc-gd';",
    "const rawExamKey = document.getElementById('cutoffExamSelect')?.value || 'ssc-gd';\\n  const examKey = resolveCutoffExamKey(rawExamKey);"
  );

  const finalContent = content.substring(0, startIndex) + updatedBenchmarks + '\n\n' + afterAnalyze;
  fs.writeFileSync(cutoffJsFile, finalContent, 'utf8');
  console.log('Successfully updated cutoff-analyzer.js with 28 comprehensive exam cutoffs and alias resolver!');
} else {
  console.error('Could not find markers in cutoff-analyzer.js');
}
