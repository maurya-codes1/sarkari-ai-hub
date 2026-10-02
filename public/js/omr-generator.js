// public/js/omr-generator.js
// Bharat's Official Printable Vector OMR Sheet Generator (2026 Edition)
// Supports 50, 80, 100, 150, 200 Questions with Roll No. Grid, Series A/B/C/D, Barcode & Instructions
// Formatted precisely for crisp A4 portrait printing & Direct 1-Click PDF Download

function generateOmrSheetHtml(config = {}) {
  const {
    examName = "ALL-INDIA COMPETITIVE / BOARD EXAMINATION 2026",
    totalQuestions = 100,
    bookletSeries = "A",
    subjectName = "Full Exam Mixed Simulation",
    candidateName = "",
    rollNumber = ""
  } = config;

  const count = parseInt(totalQuestions, 10) || 100;
  
  // Decide columns & rows per column
  // 30 Qs => 2 cols (15 each)
  // 50 Qs => 2 cols (25 each)
  // 80 Qs => 4 cols (20 each)
  // 100 Qs => 4 cols (25 each)
  // 150 Qs => 5 cols (30 each)
  // 200 Qs => 5 cols (40 each)
  let numCols = 4;
  let rowsPerCol = 25;
  let colWidth = "172px";

  if (count <= 30) {
    numCols = 2;
    rowsPerCol = 15;
    colWidth = "220px";
  } else if (count <= 50) {
    numCols = 2;
    rowsPerCol = 25;
    colWidth = "220px";
  } else if (count <= 80) {
    numCols = 4;
    rowsPerCol = 20;
    colWidth = "172px";
  } else if (count <= 100) {
    numCols = 4;
    rowsPerCol = 25;
    colWidth = "172px";
  } else if (count <= 150) {
    numCols = 5;
    rowsPerCol = 30;
    colWidth = "140px";
  } else {
    numCols = 5;
    rowsPerCol = 40;
    colWidth = "140px";
  }

  // Parse roll number digits (up to 10 digits)
  const rollDigits = (rollNumber || "").replace(/\D/g, '').padEnd(10, ' ').split('').slice(0, 10);

  // Generate Roll Number Grid (10 Digits)
  let rollGridHtml = `
    <div style="border: 2px solid #000; padding: 6px; border-radius: 6px; background: #fff;">
      <div style="font-size: 10px; font-weight: 900; text-align: center; margin-bottom: 4px; text-transform: uppercase;">
        अनुक्रमांक / ROLL NUMBER
      </div>
      <div style="display: flex; gap: 3px; justify-content: center; margin-bottom: 4px;">
        ${rollDigits.map(digit => `
          <div style="width: 17px; height: 18px; border: 1.5px solid #000; text-align: center; font-size: 11px; font-weight: 900; background: #fafafa; display: flex; align-items: center; justify-content: center;">
            ${digit.trim()}
          </div>
        `).join('')}
      </div>
      <div style="display: flex; gap: 3px; justify-content: center;">
        ${rollDigits.map((digit, colIdx) => `
          <div style="display: flex; flex-direction: column; gap: 2px;">
            ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(d => {
              const isDarkened = digit.trim() === String(d);
              const bubbleStyle = isDarkened 
                ? "background: #000; color: #fff;" 
                : "background: #fff; color: #000;";
              return `
                <div style="width: 17px; height: 13px; border: 1.2px solid #000; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 8.5px; font-weight: 800; font-family: monospace; ${bubbleStyle}">
                  ${d}
                </div>
              `;
            }).join('')}
          </div>
        `).join('')}
      </div>
    </div>
  `;

  // Question Booklet Series Grid (A, B, C, D)
  let seriesGridHtml = `
    <div style="border: 2px solid #000; padding: 6px; border-radius: 6px; background: #fff; text-align: center;">
      <div style="font-size: 10px; font-weight: 900; margin-bottom: 4px; text-transform: uppercase;">
        प्रश्न पुस्तिका श्रृंखला / SERIES
      </div>
      <div style="width: 28px; height: 26px; border: 2px solid #000; margin: 0 auto 6px; display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: 900;">
        ${bookletSeries.toUpperCase()}
      </div>
      <div style="display: flex; gap: 6px; justify-content: center;">
        ${['A', 'B', 'C', 'D'].map(s => {
          const isSelected = bookletSeries.toUpperCase() === s;
          const bubbleStyle = isSelected ? "background: #000; color: #fff;" : "background: #fff; color: #000;";
          return `
            <div style="width: 19px; height: 19px; border: 1.5px solid #000; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 900; ${bubbleStyle}">
              ${s}
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;

  // Build Answer Columns with Centered Bubbles & Perfectly Aligned Headers
  let columnsHtml = '';
  for (let c = 0; c < numCols; c++) {
    const startQ = c * rowsPerCol + 1;
    const endQ = Math.min((c + 1) * rowsPerCol, count);
    
    if (startQ > count) break;

    let rowsHtml = '';
    for (let q = startQ; q <= endQ; q++) {
      rowsHtml += `
        <div style="display: grid; grid-template-columns: 28px repeat(4, 1fr); align-items: center; justify-items: center; padding: 2px 2px; border-bottom: 1px dashed #d1d5db;">
          <span style="font-size: 9.5px; font-weight: 900; text-align: center; color: #111;">${q}.</span>
          ${['A', 'B', 'C', 'D'].map(opt => `
            <div style="width: 17px; height: 17px; margin: 0 auto; border: 1.4px solid #000; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 8.5px; font-weight: 900; font-family: system-ui, sans-serif;">
              ${opt}
            </div>
          `).join('')}
        </div>
      `;
    }

    columnsHtml += `
      <div style="flex: 1; min-width: 0; max-width: ${colWidth}; border: 1.5px solid #000; border-radius: 6px; padding: 3px 2px; background: #fff;">
        <div style="display: grid; grid-template-columns: 28px repeat(4, 1fr); align-items: center; justify-items: center; font-size: 9px; font-weight: 900; border-bottom: 1.5px solid #000; padding: 2px 2px 3px 2px; margin-bottom: 2px; background: #f3f4f6;">
          <span style="text-align: center;">Q.</span>
          <span style="text-align: center;">A</span>
          <span style="text-align: center;">B</span>
          <span style="text-align: center;">C</span>
          <span style="text-align: center;">D</span>
        </div>
        ${rowsHtml}
      </div>
    `;
  }

  return `
    <div id="vectorOmrSheetContainer" class="omr-printable-container" style="max-width: 780px; margin: 0 auto; font-family: 'Noto Sans Devanagari', 'Plus Jakarta Sans', system-ui, sans-serif; color: #000; background: #fff; padding: 8px;">
      
      <!-- Top Bar with Barcode & Logo -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2.5px solid #000; padding-bottom: 6px; margin-bottom: 8px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <div style="width: 38px; height: 38px; border: 2px solid #000; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: 900;">
            🇮🇳
          </div>
          <div>
            <h1 style="font-size: 15px; font-weight: 900; margin: 0; text-transform: uppercase; letter-spacing: 0.5px;">
              ${examName}
            </h1>
            <div style="font-size: 10px; font-weight: 700; color: #333;">
              OFFICIAL OMR ANSWER SHEET • ओएमआर उत्तर पत्रक (मूल प्रति) • ${count} QUESTIONS
            </div>
          </div>
        </div>

        <!-- Simulated Barcode -->
        <div style="text-align: right;">
          <div style="font-family: monospace; font-size: 9px; font-weight: 900; letter-spacing: 2px;">
            ||| | |||| | ||||| || ||| ||||
          </div>
          <div style="font-size: 8px; font-weight: bold; color: #555;">OMR NO: 2026-${Math.floor(100000 + Math.random() * 900000)}</div>
        </div>
      </div>

      <!-- Candidate Instructions & Important Guidelines -->
      <div style="border: 1.5px solid #000; border-radius: 6px; padding: 5px 8px; font-size: 8.5px; line-height: 1.35; margin-bottom: 8px; background: #fafafa;">
        <div style="font-weight: 900; text-transform: uppercase; margin-bottom: 2px;">
          ⚠️ महत्वपूर्ण निर्देश / INSTRUCTIONS FOR CANDIDATE:
        </div>
        1. केवल नीले या काले बॉल पेन (Black/Blue Ball Point Pen) का ही प्रयोग करें। जेल पेन या पेंसिल का प्रयोग वर्जित है।<br>
        2. गोले को पूर्ण रूप से गहरा काला/नीला करें: <span style="display: inline-block; width: 12px; height: 12px; background: #000; border-radius: 50%; vertical-align: middle;"></span> (Correct)। गलत तरीके: <span style="border: 1px solid #000; border-radius: 50%; padding: 0 2px;">✓</span> <span style="border: 1px solid #000; border-radius: 50%; padding: 0 2px;">✕</span> <span style="border: 1px solid #000; border-radius: 50%; padding: 0 2px;">•</span> (Wrong).<br>
        3. एक प्रश्न के लिए केवल एक ही गोला भरें। एक से अधिक गोला भरने पर अंक शून्य (0) दिया जाएगा। व्हाइटनर या ब्लेड का उपयोग पूर्णतः प्रतिबंधित है।
      </div>

      <!-- Candidate Data Box (Roll No, Booklet Series, Center Code) -->
      <div style="display: grid; grid-template-columns: 2fr 1fr 1.3fr; gap: 8px; margin-bottom: 8px;">
        ${rollGridHtml}
        
        <div style="display: flex; flex-direction: column; gap: 8px;">
          ${seriesGridHtml}
          
          <div style="border: 2px solid #000; padding: 5px; border-radius: 6px; background: #fff; text-align: center;">
            <div style="font-size: 9px; font-weight: 900; margin-bottom: 3px; text-transform: uppercase;">
              विषय / SUBJECT
            </div>
            <div style="font-size: 10px; font-weight: 800; border: 1.5px solid #000; padding: 3px; background: #fafafa; border-radius: 4px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
              ${subjectName}
            </div>
          </div>
        </div>

        <div style="border: 2px solid #000; padding: 6px; border-radius: 6px; background: #fff; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="font-size: 9px; font-weight: 900; margin-bottom: 2px; text-transform: uppercase;">
              परीक्षार्थी का नाम / CANDIDATE NAME:
            </div>
            <div style="border: 1.5px solid #000; height: 26px; border-radius: 4px; padding: 3px 5px; font-size: 11px; font-weight: 900; background: #fafafa; display: flex; align-items: center;">
              ${candidateName.toUpperCase()}
            </div>
          </div>
          <div>
            <div style="font-size: 9px; font-weight: 900; margin-bottom: 2px; text-transform: uppercase;">
              परीक्षार्थी के हस्ताक्षर / CANDIDATE SIGN:
            </div>
            <div style="border: 1.5px solid #000; height: 32px; border-radius: 4px; display: flex; align-items: flex-end; justify-content: center; font-size: 8px; color: #888;">
              हस्ताक्षर (Running Hand)
            </div>
          </div>
          <div>
            <div style="font-size: 9px; font-weight: 900; margin-bottom: 2px; text-transform: uppercase;">
              कक्ष निरीक्षक के हस्ताक्षर / INVIGILATOR SIGN:
            </div>
            <div style="border: 1.5px solid #000; height: 32px; border-radius: 4px; display: flex; align-items: flex-end; justify-content: center; font-size: 8px; color: #888;">
              हस्ताक्षर व मुहर (Seal & Sign)
            </div>
          </div>
        </div>
      </div>

      <!-- Main OMR Bubbles Grid with Centered Alignment -->
      <div style="display: flex; justify-content: center; gap: 8px; margin-bottom: 8px;">
        ${columnsHtml}
      </div>

      <!-- Footer -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1.5px solid #000; padding-top: 4px; font-size: 8.5px; font-weight: bold; color: #444;">
        <span>BharatExams Hub 🇮🇳 Official Standard OMR Sheet • Serial: SK-${Date.now().toString().slice(-6)}</span>
        <span>COMPUTER SCANNABLE OPTICAL MARK RECOGNITION SHEET (A4)</span>
      </div>

    </div>
  `;
}

// 1. Vector Print Console (Zero Blank Pages, 100% Vector Quality)
function openPrintableOmrWindow(config = {}) {
  const html = generateOmrSheetHtml(config);
  const win = window.open('', '_blank', 'width=900,height=950');
  if (!win) {
    if (typeof showAppAlert === 'function') {
      showAppAlert('पॉप-अप ब्लॉक हो गया है। कृपया ब्राउज़र सेटिंग्स में Pop-up Allow करें ताकि OMR शीट खुल सके।', 'Popup Blocked', '🖨️');
    } else {
      alert('पॉप-अप ब्लॉक हो गया है। कृपया ब्राउज़र सेटिंग्स में Pop-up Allow करें ताकि OMR शीट खुल सके।');
    }
    return;
  }

  win.document.write(`
    <!DOCTYPE html>
    <html lang="hi">
    <head>
      <meta charset="UTF-8">
      <title>Official OMR Answer Sheet - ${config.examName || 'Exam 2026'}</title>
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;600;700;800;900&family=Plus+Jakarta+Sans:wght@500;700;800;900&display=swap" rel="stylesheet">
      <style>
        * { box-sizing: border-box; }
        body {
          font-family: 'Noto Sans Devanagari', 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
          padding: 16px;
          margin: 0;
          background: #ffffff;
          color: #000000;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        @media print {
          @page {
            size: A4 portrait;
            margin: 6mm 8mm 6mm 8mm;
          }
          body { padding: 0 !important; }
          .no-print { display: none !important; }
        }
        .action-bar {
          background: #0f172a;
          color: white;
          padding: 10px 16px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
        }
        .print-btn {
          background: #ea580c;
          color: white;
          border: none;
          padding: 8px 18px;
          border-radius: 8px;
          font-weight: 800;
          cursor: pointer;
          font-size: 13px;
        }
        .print-btn:hover { background: #c2410c; }
      </style>
    </head>
    <body>
      <div class="no-print">
        <div class="action-bar">
          <div style="font-weight: 800; font-size: 13px;">🇮🇳 BharatExams Hub • Vector Printable OMR Sheet Console</div>
          <div style="display: flex; gap: 8px;">
            <button onclick="window.print()" class="print-btn">
              🖨️ Print / Save as PDF (Ctrl + P)
            </button>
            <button onclick="window.close()" style="background: #334155; color: white; border: none; padding: 8px 14px; border-radius: 8px; font-weight: 700; cursor: pointer; font-size: 12px;">
              ✕ Close
            </button>
          </div>
        </div>
      </div>

      ${html}

      <script>
        window.addEventListener('load', () => {
          setTimeout(() => {
            window.print();
          }, 500);
        });
      </script>
    </body>
    </html>
  `);
  win.document.close();
}

// 2. Direct 1-Click PDF Download to disk (Using html2pdf.js with On-Screen Staging)
function downloadOmrDirectPdf(config = {}) {
  const container = document.createElement('div');
  container.id = 'omrDirectDownloadStage';
  container.style.position = 'fixed';
  container.style.top = '0';
  container.style.left = '0';
  container.style.width = '794px';
  container.style.minHeight = '1123px';
  container.style.background = '#ffffff';
  container.style.zIndex = '999990';
  container.style.boxSizing = 'border-box';
  container.innerHTML = generateOmrSheetHtml(config);

  const overlay = document.createElement('div');
  overlay.id = 'omrLoadingOverlay';
  overlay.style.position = 'fixed';
  overlay.style.inset = '0';
  overlay.style.background = 'rgba(15, 23, 42, 0.88)';
  overlay.style.backdropFilter = 'blur(4px)';
  overlay.style.zIndex = '1000000';
  overlay.style.display = 'flex';
  overlay.style.flexDirection = 'column';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';
  overlay.style.color = '#ffffff';
  overlay.innerHTML = `
    <div style="text-align:center; padding: 24px;">
      <div style="font-size: 38px; margin-bottom: 12px;">⏳</div>
      <div style="font-size: 17px; font-weight: 900; font-family: system-ui, sans-serif;">
        High-Resolution A4 OMR Sheet तैयार हो रही है...
      </div>
      <div style="font-size: 12px; color: #94a3b8; margin-top: 6px; font-family: system-ui, sans-serif;">
        100% Vector Layout • Perfectly Centered Bubbles • Direct Download
      </div>
    </div>
  `;

  document.body.appendChild(container);
  document.body.appendChild(overlay);

  const cleanExamName = (config.examName || "Exam_OMR_Sheet").replace(/[^a-zA-Z0-9_\u0900-\u097F]/g, '_').slice(0, 30);
  const filename = `${cleanExamName}_OMR_Sheet_${config.totalQuestions || 80}Q.pdf`;

  const cleanup = () => {
    if (container && container.parentNode) container.parentNode.removeChild(container);
    if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
  };

  if (typeof html2pdf !== 'undefined') {
    const opt = {
      margin: [4, 4, 4, 4],
      filename: filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        logging: false,
        scrollX: 0,
        scrollY: 0,
        x: 0,
        y: 0,
        windowWidth: 850
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(container).save().then(() => {
      cleanup();
    }).catch(err => {
      console.warn('html2pdf direct save failed, opening print window fallback:', err);
      cleanup();
      openPrintableOmrWindow(config);
    });
  } else {
    cleanup();
    openPrintableOmrWindow(config);
  }
}

// 3. Interactive In-Portal OMR Generator Modal (User selects Exam, Questions, Series)
function openOmrGeneratorModal(prefill = {}) {
  let modal = document.getElementById('omrGeneratorModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'omrGeneratorModal';
    modal.className = 'fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn';
    document.body.appendChild(modal);
  }

  // Determine prefilled exam and question count
  const currentExam = prefill.examName || "SSC GD Constable 2026 (CBT Exam)";
  const currentCount = prefill.totalQuestions || 80;
  const currentSeries = prefill.bookletSeries || "A";
  const currentSubject = prefill.subjectName || "Full Exam Mixed Simulation";

  modal.innerHTML = `
    <div class="bg-white rounded-3xl shadow-2xl border-2 border-indigo-300 max-w-xl w-full p-6 sm:p-8 space-y-5 animate-scaleUp">
      <!-- Modal Header -->
      <div class="flex items-center justify-between border-b border-slate-200 pb-3">
        <div class="flex items-center space-x-2.5">
          <div class="w-10 h-10 rounded-2xl bg-indigo-900 text-white flex items-center justify-center text-xl font-bold shrink-0">
            📄
          </div>
          <div>
            <h3 class="text-base sm:text-lg font-black text-slate-900" data-i18n="omr_modal_title">${typeof getTranslation === 'function' ? getTranslation('omr_modal_title') : 'Printable Vector OMR Sheet Generator'}</h3>
            <p class="text-xs text-slate-500 font-semibold">100% Authentic A4 Scannable OMR • 50 to 200 Questions</p>
          </div>
        </div>
        <button onclick="closeOmrGeneratorModal()" class="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center justify-center transition cursor-pointer">
          ✕
        </button>
      </div>

      <!-- Modal Form Controls -->
      <div class="space-y-4 text-xs font-bold text-slate-800">
        <div>
          <label class="block mb-1 text-slate-700">1. Target Examination (परीक्षा चुनें):</label>
          <select id="omrModalExamSelect" onchange="onOmrExamChange(this.value)" class="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500">
            <option value="SSC GD Constable 2026 (CBT Exam)" ${currentExam.includes('SSC GD') ? 'selected' : ''}>SSC GD Constable 2026 (80 Questions CBT)</option>
            <option value="UP Police Constable 2026 (Re-Exam)" ${currentExam.includes('UP Police') ? 'selected' : ''}>UP Police Constable 60,244 Posts (150 Qs)</option>
            <option value="Railway RRB ALP & Technician 2026" ${currentExam.includes('Railway') || currentExam.includes('ALP') ? 'selected' : ''}>Railway RRB ALP & Technician CBT-1 (75/100 Qs)</option>
            <option value="SSC CGL / CHSL Tier-1 Examination" ${currentExam.includes('CGL') || currentExam.includes('CHSL') ? 'selected' : ''}>SSC CGL / CHSL Tier-1 (100 Questions)</option>
            <option value="Bihar Police Constable & Daroga Exam" ${currentExam.includes('Bihar') ? 'selected' : ''}>Bihar Police Constable & SI Daroga (100 Qs)</option>
            <option value="CBSE Board Class 10th / 12th Theory" ${currentExam.includes('CBSE') ? 'selected' : ''}>CBSE Board Class 10th / 12th (OMR Section)</option>
            <option value="BSEB Bihar Board Matric / Inter Exam" ${currentExam.includes('BSEB') ? 'selected' : ''}>BSEB Bihar Board 10th / 12th (50/100 Qs)</option>
            <option value="UPMSP Uttar Pradesh Board High School / Inter" ${currentExam.includes('UPMSP') ? 'selected' : ''}>UPMSP UP Board 10th / 12th (OMR Pattern)</option>
            <option value="NEET UG / JEE Main Entrance Test" ${currentExam.includes('NEET') || currentExam.includes('JEE') ? 'selected' : ''}>NTA NEET UG / JEE Main (180/200 Qs)</option>
            <option value="All-India Master Practice Mock Test" ${(!currentExam.includes('SSC') && !currentExam.includes('Police') && !currentExam.includes('Board')) ? 'selected' : ''}>All-India Master Practice Mock Test</option>
          </select>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block mb-1 text-slate-700">2. Question Count (प्रश्नों की संख्या):</label>
            <select id="omrModalCountSelect" class="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500">
              <option value="30" ${currentCount == 30 ? 'selected' : ''}>30 Questions (Standard Mock - 2 Cols of 15)</option>
              <option value="50" ${currentCount == 50 ? 'selected' : ''}>50 Questions (2 Columns of 25)</option>
              <option value="80" ${currentCount == 80 ? 'selected' : ''}>80 Questions (SSC GD / Police 4x20)</option>
              <option value="100" ${currentCount == 100 ? 'selected' : ''}>100 Questions (Standard 4x25)</option>
              <option value="150" ${currentCount == 150 ? 'selected' : ''}>150 Questions (Mega 5x30)</option>
              <option value="200" ${currentCount == 200 ? 'selected' : ''}>200 Questions (Marathon 5x40)</option>
            </select>
          </div>

          <div>
            <label class="block mb-1 text-slate-700">3. Booklet Series (श्रृंखला):</label>
            <select id="omrModalSeriesSelect" class="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500">
              <option value="A" ${currentSeries === 'A' ? 'selected' : ''}>Series A</option>
              <option value="B" ${currentSeries === 'B' ? 'selected' : ''}>Series B</option>
              <option value="C" ${currentSeries === 'C' ? 'selected' : ''}>Series C</option>
              <option value="D" ${currentSeries === 'D' ? 'selected' : ''}>Series D</option>
            </select>
          </div>
        </div>

        <div>
          <label class="block mb-1 text-slate-700">4. Subject / Paper Label (विषय का नाम):</label>
          <input type="text" id="omrModalSubjectInput" value="${currentSubject}" placeholder="उदा. Full Exam Mixed Simulation, General Studies" class="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500">
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block mb-1 text-slate-700">5. Candidate Name (परीक्षार्थी का नाम - Optional):</label>
            <input type="text" id="omrModalCandidateName" placeholder="उदा. RAHUL KUMAR" class="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs font-bold text-slate-900 uppercase focus:ring-2 focus:ring-indigo-500">
          </div>
          <div>
            <label class="block mb-1 text-slate-700">6. Roll No. (अनुक्रमांक 10 Digits - Optional):</label>
            <input type="text" id="omrModalRollNo" maxlength="10" placeholder="उदा. 2408915672" class="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500">
          </div>
        </div>
      </div>

      <!-- Action Button: High-Res Vector OMR Print / PDF Save -->
      <div class="pt-3 border-t border-slate-200">
        <button type="button" onclick="executeOmrAction('print_preview')" class="w-full bg-gradient-to-r from-indigo-900 via-blue-900 to-indigo-800 hover:from-indigo-800 hover:to-blue-800 text-white font-black text-xs sm:text-sm py-3.5 sm:py-4 px-6 rounded-2xl shadow-xl transition flex items-center justify-center space-x-2.5 cursor-pointer active:scale-95">
          <span class="text-xl">🖨️</span>
          <span data-i18n="omr_modal_download_btn">${typeof getTranslation === 'function' ? getTranslation('omr_modal_download_btn') : 'Download Vector OMR Sheet (Save as PDF / Print)'}</span>
        </button>
      </div>
      <p class="text-[11px] text-center text-slate-500 font-medium">
        💡 100% शुद्ध क्रिस्टल-क्लियर A4 लेआउट। खुलने वाली विंडो में "Save as PDF" चुनें (Zero Blank Page, 100% Crisp Circles).
      </p>
    </div>
  `;

  modal.classList.remove('hidden');
}

function closeOmrGeneratorModal() {
  const modal = document.getElementById('omrGeneratorModal');
  if (modal) modal.classList.add('hidden');
}

function executeOmrAction(actionType) {
  const examName = document.getElementById('omrModalExamSelect')?.value || "ALL-INDIA COMPETITIVE EXAM 2026";
  const totalQuestions = parseInt(document.getElementById('omrModalCountSelect')?.value, 10) || 80;
  const bookletSeries = document.getElementById('omrModalSeriesSelect')?.value || "A";
  const subjectName = document.getElementById('omrModalSubjectInput')?.value || "Full Exam Mixed Simulation";
  const candidateName = document.getElementById('omrModalCandidateName')?.value || "";
  const rollNumber = document.getElementById('omrModalRollNo')?.value || "";

  const cfg = {
    examName,
    totalQuestions,
    bookletSeries,
    subjectName,
    candidateName,
    rollNumber
  };

  closeOmrGeneratorModal();
  openPrintableOmrWindow(cfg);
}

function onOmrExamChange(val) {
  const countSelect = document.getElementById('omrModalCountSelect');
  const subjInput = document.getElementById('omrModalSubjectInput');
  if (!countSelect) return;

  if (val.includes('SSC GD')) {
    countSelect.value = "80";
    if (subjInput) subjInput.value = "Full Exam Mixed Simulation (80 Qs)";
  } else if (val.includes('UP Police')) {
    countSelect.value = "150";
    if (subjInput) subjInput.value = "General Knowledge, Hindi, Math & Reasoning (150 Qs)";
  } else if (val.includes('Railway') || val.includes('ALP')) {
    countSelect.value = "80";
    if (subjInput) subjInput.value = "CBT-1 Full Test Simulation";
  } else if (val.includes('NEET')) {
    countSelect.value = "200";
    if (subjInput) subjInput.value = "Physics, Chemistry, Biology (200 Qs)";
  } else if (val.includes('BSEB')) {
    countSelect.value = "100";
    if (subjInput) subjInput.value = "Matric / Inter Objective Section (100 Qs)";
  } else if (val.includes('CBSE') || val.includes('UPMSP')) {
    countSelect.value = "50";
    if (subjInput) subjInput.value = "Theory Board OMR Section";
  } else {
    countSelect.value = "100";
    if (subjInput) subjInput.value = "Full Exam Simulation (100 Qs)";
  }
}

// Global Trigger called from Navbars, Quiz Arena, or Scorecards
function triggerOmrSheetGenerator(fromQuiz = false) {
  let examText = "SSC GD Constable 2026 (CBT Exam)";
  let size = 80;
  let subText = "Full Exam Mixed Simulation";

  if (fromQuiz) {
    const examSelect = document.getElementById('quizExamSelect');
    const sizeSelect = document.getElementById('quizSizeSelect');
    const subjectSelect = document.getElementById('quizSubjectSelect');

    if (examSelect) {
      examText = examSelect.options[examSelect.selectedIndex]?.text || examSelect.value;
    }
    if (sizeSelect) {
      size = parseInt(sizeSelect.value, 10) || 80;
    }
    if (subjectSelect) {
      subText = subjectSelect.options[subjectSelect.selectedIndex]?.text || subjectSelect.value;
    }
  }

  openOmrGeneratorModal({
    examName: examText,
    totalQuestions: size,
    bookletSeries: "A",
    subjectName: subText.replace(/^🎯\s*/, '').replace(/^[^\w\s]+\s*/, '')
  });
}

// Check if an exam supports physical/offline OMR format
function isExamOmrSupported(examId) {
  if (!examId) return false;
  const id = examId.toLowerCase().trim();
  // State Boards (10th and 12th board exams have physical OMR objective sheets)
  if (id.includes('board') || id.includes('bseb') || id.includes('upmsp') || id.includes('cbse') || id.includes('icse') || id.includes('class-')) return true;
  // National offline pen-and-paper exams
  if (id.includes('neet')) return true;
  // State police bharti exams that use pen-and-paper OMR
  if (id.includes('police') && (id.includes('up') || id.includes('bihar') || id.includes('mp') || id.includes('rajasthan') || id.includes('haryana'))) return true;
  // State and central teacher eligibility tests (OMR based)
  if (id.includes('tet') || id.includes('ctet') || id.includes('uptet') || id.includes('reet') || id.includes('bpsc')) return true;
  return false;
}

// Expose globally
if (typeof window !== 'undefined') {
  window.generateOmrSheetHtml = generateOmrSheetHtml;
  window.openPrintableOmrWindow = openPrintableOmrWindow;
  window.downloadOmrDirectPdf = downloadOmrDirectPdf;
  window.openOmrGeneratorModal = openOmrGeneratorModal;
  window.closeOmrGeneratorModal = closeOmrGeneratorModal;
  window.executeOmrAction = executeOmrAction;
  window.onOmrExamChange = onOmrExamChange;
  window.triggerOmrSheetGenerator = triggerOmrSheetGenerator;
  window.isExamOmrSupported = isExamOmrSupported;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    generateOmrSheetHtml,
    openPrintableOmrWindow,
    downloadOmrDirectPdf,
    openOmrGeneratorModal,
    closeOmrGeneratorModal,
    executeOmrAction,
    onOmrExamChange,
    triggerOmrSheetGenerator,
    isExamOmrSupported
  };
}
