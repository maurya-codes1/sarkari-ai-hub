const { getDb } = require('../backend/db/database');
const db = getDb();

console.log('Cleaning question texts in question_versions...');

function cleanText(text) {
  if (!text || typeof text !== 'string') return text;
  let cleaned = text.trim();
  
  // 1. Strip leading brackets like [RRB NTPC CBT-1 Exam Practice Q1] or [कक्षा 10 विज्ञान]
  cleaned = cleaned.replace(/^\[[^\]\r\n]+\]\s*/g, '');
  
  // 2. Strip leading exam/board prefix like CBSE Class 10 Science: 
  cleaned = cleaned.replace(/^[\u0900-\u097F\w\s\-—]+(Board|Exam|Class|कक्षा|बोर्ड|प्रैक्टिस|अभ्यास)[^:\n]{0,80}:\s*/i, '');
  
  // 3. Strip leading question labels & numbering: Question #1:, प्रश्न 15:, Q.12 -, #4590:
  cleaned = cleaned.replace(/^(?:प्रश्न\s*(?:सं\.?|संख्या|क्र\.?)|प्रश्‍न\s*(?:सं\.?|संख्या|क्र\.?)|प्रश्न|प्रश्‍न|Question|Q\.|Ques|Que|Q|ਪ੍ਰਸ਼ਨ\s*(?:ਨੰ\.?)?|ಪ್ರಶ್ನೆ|வினா|ప్రశ్న|প্রশ্ন)\s*#?\d+\s*[:.-]\s*/i, '');
  cleaned = cleaned.replace(/^#?\d+\s*[:.-]\s*/, '');
  cleaned = cleaned.replace(/^\(\d+\)\s*/, '');

  // 4. Strip trailing noise in parentheses e.g. (CBSE Class 10 Science Sample Item 15)? or (Question #26)
  const trailingNoiseRegex = /\s*\([^)]*(?:सीबीएसई|CBSE|कक्षा|Class|बोर्ड|Board|नमूना|Sample|पेपर|Paper|Item|प्रश्न|Question|\#\d+)[^)]*\)\s*(\??)$/i;
  const match = cleaned.match(trailingNoiseRegex);
  if (match) {
    const hasQuestionMark = cleaned.endsWith('?') || (match[1] === '?');
    cleaned = cleaned.replace(trailingNoiseRegex, hasQuestionMark ? '?' : '').trim();
  }

  return cleaned.trim();
}

const rows = db.prepare('SELECT question_id, version_number, language_content FROM question_versions').all();
console.log(`Processing ${rows.length} rows...`);

const updateStmt = db.prepare('UPDATE question_versions SET language_content = ? WHERE question_id = ? AND version_number = ?');

let updatedCount = 0;
const tx = db.transaction(() => {
  for (const row of rows) {
    try {
      const parsed = JSON.parse(row.language_content);
      let changed = false;

      for (const [lang, data] of Object.entries(parsed)) {
        if (!data) continue;
        if (data.q && typeof data.q === 'string') {
          const cleanedQ = cleanText(data.q);
          if (cleanedQ !== data.q) {
            data.q = cleanedQ;
            changed = true;
          }
        }
        if (data.question_text && typeof data.question_text === 'string') {
          const cleanedQ = cleanText(data.question_text);
          if (cleanedQ !== data.question_text) {
            data.question_text = cleanedQ;
            changed = true;
          }
        }
        if (data.question && typeof data.question === 'string') {
          const cleanedQ = cleanText(data.question);
          if (cleanedQ !== data.question) {
            data.question = cleanedQ;
            changed = true;
          }
        }
      }

      if (changed) {
        updateStmt.run(JSON.stringify(parsed), row.question_id, row.version_number);
        updatedCount++;
      }
    } catch (e) {
      // ignore parse errors
    }
  }
});

tx();
console.log(`Successfully cleaned and updated ${updatedCount} question_versions records!`);
