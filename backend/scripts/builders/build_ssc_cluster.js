const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function cleanTextForFingerprint(text) {
  if (!text || typeof text !== 'string') return '';
  return text.toLowerCase()
    .replace(/^\[[^\]]+\]\s*/g, '')
    .replace(/^(?:प्रश्न|question|q\.|q)\s*#?\d+\s*[:.-]\s*/i, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function deduplicateList(items) {
  const unique = [];
  const seen = new Set();
  items.forEach(item => {
    const fp = crypto.createHash('sha256').update(cleanTextForFingerprint(item.q)).digest('hex');
    if (!seen.has(fp)) {
      seen.add(fp);
      unique.push(item);
    }
  });
  return unique;
}

// -------------------------------------------------------------
// 1. SSC CGL GK (Expanding to 200+ unique high yield PYQs)
// -------------------------------------------------------------
console.log('Building SSC Cluster Question Banks...');

// Let's create builders for SSC CGL, CHSL, MTS, and GD
// We will write the files directly into backend/data/competitive/ssc/
