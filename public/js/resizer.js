// Universal Photo & Signature Resizer with Date/Name Stamper and Canvas Compression
let currentOriginalImage = null;
let currentFile = null;
let processedBlob = null;

// Initialize Resizer Presets
function initResizer() {
  const presetSelect = document.getElementById('examPresetSelect');
  if (!presetSelect) return;

  // Populate presets dynamically from EXAMS_DATABASE
  if (typeof EXAMS_DATABASE !== 'undefined' && EXAMS_DATABASE.length > 0) {
    const categories = [
      { id: 'central', label: '🏛️ Central & Defence Recruitment' },
      { id: 'police', label: '👮 State Police Bharti' },
      { id: 'boards', label: '🎓 10th & 12th Board Exams' },
      { id: 'entrance', label: '🩺 National Entrance Tests' },
      { id: 'teaching', label: '👨‍🏫 Teaching & TET Exams' }
    ];

    let optionsHtml = '<option value="custom">⚙️ -- Custom Size & Target KB Mode --</option>';

    categories.forEach(cat => {
      const catExams = EXAMS_DATABASE.filter(e => e.category === cat.id);
      if (catExams.length > 0) {
        optionsHtml += `<optgroup label="${cat.label}">`;
        catExams.forEach(e => {
          const p = e.photoSpecs;
          const stampTag = p && p.requireNameDate ? ', Name+Date' : '';
          const kbTag = p ? ` (${p.minKb}-${p.maxKb} KB${stampTag})` : '';
          const isSelected = e.id === 'ssc-gd' ? ' selected' : '';
          optionsHtml += `<option value="${e.id}"${isSelected}>${e.shortName}${kbTag}</option>`;
        });
        optionsHtml += `</optgroup>`;
      }
    });

    presetSelect.innerHTML = optionsHtml;
  }

  // Attach event listeners
  presetSelect.addEventListener('change', handlePresetChange);
  
  const uploadInput = document.getElementById('resizerUploadInput');
  const dropZone = document.getElementById('resizerDropZone');

  if (uploadInput) {
    uploadInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        loadFile(e.target.files[0]);
      }
    });
  }

  if (dropZone) {
    dropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropZone.classList.add('border-saffron-500', 'bg-orange-50');
    });

    dropZone.addEventListener('dragleave', () => {
      dropZone.classList.remove('border-saffron-500', 'bg-orange-50');
    });

    dropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropZone.classList.remove('border-saffron-500', 'bg-orange-50');
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        loadFile(e.dataTransfer.files[0]);
      }
    });
  }

  // Stamp toggle listener
  const stampCheckbox = document.getElementById('stampCheckbox');
  if (stampCheckbox) {
    stampCheckbox.addEventListener('change', () => {
      const stampOptions = document.getElementById('stampOptions');
      if (stampOptions) {
        stampOptions.classList.toggle('hidden', !stampCheckbox.checked);
      }
      processImage();
    });
  }

  // Inputs live change
  const stampName = document.getElementById('stampName');
  if (stampName) stampName.addEventListener('input', processImage);

  // Photo Framing Controls (Headroom & Scale)
  const photoOffsetY = document.getElementById('photoOffsetY');
  const photoOffsetYVal = document.getElementById('photoOffsetYVal');
  const photoZoom = document.getElementById('photoZoom');
  const photoZoomVal = document.getElementById('photoZoomVal');

  if (photoOffsetY) {
    photoOffsetY.addEventListener('input', (e) => {
      if (photoOffsetYVal) photoOffsetYVal.textContent = `${e.target.value > 0 ? '+' : ''}${e.target.value} px`;
      processImage();
    });
  }

  if (photoZoom) {
    photoZoom.addEventListener('input', (e) => {
      if (photoZoomVal) photoZoomVal.textContent = `${e.target.value}%`;
      processImage();
    });
  }

  // Setup smart date masking and validation
  setupDateInputMasking();

  // Set default photo date to today
  const stampDate = document.getElementById('stampDate');
  if (stampDate && !stampDate.value) {
    setStampDateToday();
  }

  const customWidth = document.getElementById('customWidth');
  const customHeight = document.getElementById('customHeight');
  const targetKb = document.getElementById('targetKb');

  if (customWidth) customWidth.addEventListener('input', processImage);
  if (customHeight) customHeight.addEventListener('input', processImage);
  if (targetKb) targetKb.addEventListener('input', processImage);

  const docTypeSelect = document.getElementById('docTypeSelect');
  if (docTypeSelect) docTypeSelect.addEventListener('change', () => {
    handlePresetChange();
    processImage();
  });
}

// -------------------------------------------------------------
// Date Masking, Validation & Framing Control Utilities
// -------------------------------------------------------------
function setupDateInputMasking() {
  const stampDate = document.getElementById('stampDate');
  if (!stampDate) return;

  stampDate.addEventListener('input', () => {
    let raw = stampDate.value.replace(/[^\d]/g, '').slice(0, 8); // digits only, max 8
    if (raw.length === 0) {
      stampDate.value = '';
      updateDateFeedback('');
      processImage();
      return;
    }

    let day = raw.slice(0, 2);
    let month = raw.slice(2, 4);
    let year = raw.slice(4, 8);

    // Day validation (01 to 31)
    if (day.length === 1) {
      if (parseInt(day, 10) > 3) {
        day = '0' + day;
      }
    } else if (day.length === 2) {
      let dVal = parseInt(day, 10);
      if (dVal === 0) day = '01';
      else if (dVal > 31) day = '31';
    }

    // Month validation (01 to 12)
    if (month.length === 1) {
      if (parseInt(month, 10) > 1 && parseInt(day, 10) <= 31) {
        month = '0' + month;
      }
    } else if (month.length === 2) {
      let mVal = parseInt(month, 10);
      if (mVal === 0) month = '01';
      else if (mVal > 12) month = '12';
    }

    // Assemble formatted string with auto /
    let formatted = day;
    if (day.length === 2) {
      formatted += '/';
      if (month.length > 0) {
        formatted += month;
        if (month.length === 2) {
          formatted += '/';
          if (year.length > 0) {
            formatted += year;
          }
        }
      }
    }

    stampDate.value = formatted;
    updateDateFeedback(formatted);
    processImage();
  });
}

function updateDateFeedback(dateStr) {
  const fb = document.getElementById('dateValidationFeedback');
  if (!fb) return;

  if (!dateStr || dateStr.length < 10) {
    fb.innerHTML = `💡 DOOP = फोटो खिंचवाने की तारीख (DD/MM/YYYY)। जन्मतिथि (DOB) न डालें!`;
    fb.className = "text-[10px] text-amber-100 mt-1 font-semibold";
    return;
  }

  const parts = dateStr.split('/');
  const y = parseInt(parts[2], 10);
  const currentYear = new Date().getFullYear();

  if (y < currentYear - 1) {
    fb.innerHTML = `⚠️ ध्यान दें: आपने साल ${y} डाला है! सरकारी नियमों के अनुसार फोटो 3 महीने से पुरानी नहीं होनी चाहिए (DOB न डालें)।`;
    fb.className = "text-[10px] text-rose-200 bg-rose-900/60 p-1.5 rounded-lg mt-1 font-bold";
  } else {
    fb.innerHTML = `✅ मान्य हाल की फोटो तारीख (${dateStr})`;
    fb.className = "text-[10px] text-emerald-100 bg-emerald-900/60 p-1.5 rounded-lg mt-1 font-bold";
  }
}

function setStampDateToday() {
  const stampDate = document.getElementById('stampDate');
  if (!stampDate) return;
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  stampDate.value = `${dd}/${mm}/${yyyy}`;
  updateDateFeedback(stampDate.value);
  processImage();
}

function resetPhotoFraming() {
  const offsetY = document.getElementById('photoOffsetY');
  const zoom = document.getElementById('photoZoom');
  const offsetYVal = document.getElementById('photoOffsetYVal');
  const zoomVal = document.getElementById('photoZoomVal');

  if (offsetY) offsetY.value = 0;
  if (zoom) zoom.value = 100;
  if (offsetYVal) offsetYVal.textContent = '0 px';
  if (zoomVal) zoomVal.textContent = '100%';

  processImage();
}

function setHeadSafetyOffset() {
  const offsetY = document.getElementById('photoOffsetY');
  const offsetYVal = document.getElementById('photoOffsetYVal');
  if (offsetY) offsetY.value = 18; // Moves down 18px giving ample headroom for hair
  if (offsetYVal) offsetYVal.textContent = '+18 px';
  processImage();
}

function handlePresetChange() {
  const presetSelect = document.getElementById('examPresetSelect');
  const docType = document.getElementById('docTypeSelect')?.value || 'photo';
  const customControls = document.getElementById('customDimensionControls');
  const stampCheckbox = document.getElementById('stampCheckbox');
  const stampOptions = document.getElementById('stampOptions');

  const presetId = presetSelect.value;

  if (presetId === 'custom') {
    if (customControls) customControls.classList.remove('hidden');
    return;
  }

  const exam = getExamById(presetId);
  if (!exam) return;

  const specs = (docType === 'signature' && exam.signSpecs) ? exam.signSpecs : exam.photoSpecs;

  // Set target dimensions and target KB
  const customWidth = document.getElementById('customWidth');
  const customHeight = document.getElementById('customHeight');
  const targetKb = document.getElementById('targetKb');

  if (customWidth) customWidth.value = specs.width;
  if (customHeight) customHeight.value = specs.height;
  if (targetKb) targetKb.value = specs.targetKb || specs.maxKb;

  // Auto toggle name/date stamp if required by exam rules
  if (stampCheckbox && docType === 'photo') {
    if (specs.requireNameDate) {
      stampCheckbox.checked = true;
      if (stampOptions) stampOptions.classList.remove('hidden');
    }
  }

  // Display exam spec badge/hint
  const specHint = document.getElementById('examSpecHint');
  if (specHint) {
    specHint.innerHTML = `
      <div class="bg-blue-50 border border-blue-200 text-blue-900 px-3 py-2 rounded-lg text-xs flex items-center justify-between">
        <span><strong>${exam.shortName} Rules:</strong> Min ${specs.minKb}KB - Max ${specs.maxKb}KB (${specs.width}x${specs.height}px)</span>
        <span class="font-semibold text-blue-700">${specs.notes || ''}</span>
      </div>
    `;
  }

  processImage();
}

function loadFile(file) {
  if (!file.type.match('image.*')) {
    if (typeof showAppAlert === 'function') {
      showAppAlert('Please upload a valid image file (JPG, PNG, WEBP).', 'Invalid File', '📸');
    } else {
      alert('Please upload a valid image file (JPG, PNG, WEBP).');
    }
    return;
  }

  currentFile = file;
  const reader = new FileReader();

  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      currentOriginalImage = img;
      
      // Update original preview UI
      const originalPreview = document.getElementById('originalPreviewImg');
      const originalMeta = document.getElementById('originalFileMeta');
      if (originalPreview) {
        originalPreview.src = e.target.result;
        originalPreview.classList.remove('hidden');
      }
      if (originalMeta) {
        const sizeInKb = (file.size / 1024).toFixed(1);
        originalMeta.innerHTML = `Size: <strong>${sizeInKb} KB</strong> | ${img.naturalWidth} x ${img.naturalHeight} px`;
      }

      // Hide upload prompt inside dropzone
      const uploadPrompt = document.getElementById('dropZonePrompt');
      if (uploadPrompt) uploadPrompt.classList.add('hidden');

      // Process image with current settings
      processImage();
    };
    img.src = e.target.result;
  };

  reader.readAsDataURL(file);
}

// Core processing & iterative binary search compression engine
async function processImage() {
  if (!currentOriginalImage) return;

  const targetWidth = parseInt(document.getElementById('customWidth')?.value || '350', 10);
  const targetHeight = parseInt(document.getElementById('customHeight')?.value || '450', 10);
  const targetKb = parseInt(document.getElementById('targetKb')?.value || '35', 10);
  const applyStamp = document.getElementById('stampCheckbox')?.checked || false;
  const candidateName = (document.getElementById('stampName')?.value || 'NAME OF CANDIDATE').toUpperCase();
  const photoDate = document.getElementById('stampDate')?.value || '01/08/2026';

  // Read manual headroom adjustment and scale
  const userOffsetY = parseInt(document.getElementById('photoOffsetY')?.value || '0', 10);
  const userZoomPercent = parseInt(document.getElementById('photoZoom')?.value || '100', 10);
  const zoomFactor = Math.max(0.5, userZoomPercent / 100);

  const canvas = document.createElement('canvas');
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  const ctx = canvas.getContext('2d');

  // Fill white background (standard for all government portals)
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, targetWidth, targetHeight);

  // If stamp is applied, reserve bottom 18-22% for the white strip
  let photoDrawHeight = targetHeight;
  const stampStripHeight = Math.max(36, Math.floor(targetHeight * 0.18));

  if (applyStamp) {
    photoDrawHeight = targetHeight - stampStripHeight;
  }

  // Draw image with smart aspect fit + head preservation
  const imgWidth = currentOriginalImage.naturalWidth;
  const imgHeight = currentOriginalImage.naturalHeight;

  const hRatio = targetWidth / imgWidth;
  const vRatio = photoDrawHeight / imgHeight;
  const baseRatio = Math.max(hRatio, vRatio);
  const ratio = baseRatio * zoomFactor;

  const scaledWidth = imgWidth * ratio;
  const scaledHeight = imgHeight * ratio;

  // Center horizontally
  const centerShiftX = (targetWidth - scaledWidth) / 2;

  // SMART HEADROOM & HAIR PROTECTION FOR PORTRAIT PHOTOS:
  // When an image is taller than the drawing box:
  // Centering previously cut half from the top, which chopped off the candidate's hair!
  // In portrait photos, the hair and head are at the top, so we anchor to top with safety margin (8px),
  // and crop excess from the chest/shoulders at the bottom, NOT from the hair!
  let centerShiftY = 0;
  if (scaledHeight < photoDrawHeight) {
    centerShiftY = (photoDrawHeight - scaledHeight) / 2;
  } else {
    // Preserve full hair from the top with 8px natural safety headroom
    centerShiftY = 8;
  }

  // Apply user manual adjustment slider (allowing fine nudge up or down)
  centerShiftY += userOffsetY;

  // Clip to photo drawing area so image never leaks into the stamp strip or outside canvas
  ctx.save();
  ctx.beginPath();
  ctx.rect(0, 0, targetWidth, photoDrawHeight);
  ctx.clip();

  ctx.drawImage(
    currentOriginalImage,
    0, 0, imgWidth, imgHeight,
    centerShiftX, centerShiftY, scaledWidth, scaledHeight
  );
  ctx.restore();

  // Draw Candidate Name & Date of Photo (DOOP) Stamp
  if (applyStamp) {
    // White background strip
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, targetHeight - stampStripHeight, targetWidth, stampStripHeight);

    // Subtle top border for clean separation
    ctx.fillStyle = '#1E293B';
    ctx.fillRect(0, targetHeight - stampStripHeight, targetWidth, 1.5);

    // Text formatting
    ctx.fillStyle = '#000000';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const fontSize = Math.max(10, Math.floor(stampStripHeight * 0.32));
    ctx.font = `bold ${fontSize}px Arial, sans-serif`;

    const line1Y = (targetHeight - stampStripHeight) + (stampStripHeight * 0.35);
    const line2Y = (targetHeight - stampStripHeight) + (stampStripHeight * 0.72);

    ctx.fillText(candidateName, targetWidth / 2, line1Y);
    ctx.font = `600 ${Math.max(9, fontSize - 1)}px Arial, sans-serif`;
    ctx.fillText(`DOOP: ${photoDate}`, targetWidth / 2, line2Y);
  }

  // Binary search compression to hit exact target KB
  const targetBytes = targetKb * 1024;
  let minQuality = 0.05;
  let maxQuality = 0.98;
  let bestBlob = null;
  let bestDiff = Infinity;

  // Run 6 iterations of binary search for high accuracy
  for (let i = 0; i < 6; i++) {
    const midQuality = (minQuality + maxQuality) / 2;
    const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', midQuality));
    
    if (!blob) break;

    const currentDiff = Math.abs(blob.size - targetBytes);
    if (currentDiff < bestDiff) {
      bestDiff = currentDiff;
      bestBlob = blob;
    }

    if (blob.size > targetBytes) {
      maxQuality = midQuality;
    } else {
      minQuality = midQuality;
    }
  }

  if (!bestBlob) {
    bestBlob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', 0.85));
  }

  processedBlob = bestBlob;

  // Render processed preview
  const processedPreview = document.getElementById('processedPreviewImg');
  const processedMeta = document.getElementById('processedFileMeta');
  const downloadBtn = document.getElementById('downloadResizedBtn');

  if (processedPreview && processedBlob) {
    const url = URL.createObjectURL(processedBlob);
    processedPreview.src = url;
    processedPreview.classList.remove('hidden');

    const finalSizeKb = (processedBlob.size / 1024).toFixed(1);
    if (processedMeta) {
      processedMeta.innerHTML = `
        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
          ✅ Size: ${finalSizeKb} KB
        </span>
        <span class="text-slate-500 text-xs ml-2">${targetWidth} x ${targetHeight} px</span>
      `;
    }

    if (downloadBtn) {
      downloadBtn.disabled = false;
      downloadBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    }
  }
}

// Download Trigger
function downloadProcessedImage() {
  if (!processedBlob) return;
  const link = document.createElement('a');
  link.href = URL.createObjectURL(processedBlob);
  const exam = document.getElementById('examPresetSelect')?.value || 'Photo';
  link.download = `Sarkari_${exam}_Resized.jpg`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

document.addEventListener('DOMContentLoaded', initResizer);

window.addEventListener('languageChanged', () => {
  if (typeof updatePresetUI === 'function') updatePresetUI();
});

