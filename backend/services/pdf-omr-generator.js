// backend/services/pdf-omr-generator.js
// Phase 8: Production-Grade Machine-Readable OMR Answer Sheet Generator
// Implements deterministic bubble geometry, candidate matrix, Set Code bubbles,
// section divisions, and strict bubble validation matching verified exam blueprints.

const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

class PdfOmrGenerator {
  constructor() {
    this.GEOMETRY = {
      PAGE_SIZE: 'A4',
      MARGIN: 36, // 0.5 inch margins
      PAGE_WIDTH: 595.28,
      PAGE_HEIGHT: 841.89,
      BUBBLE_RADIUS: 5.5,
      BUBBLE_SPACING_X: 18,
      BUBBLE_ROW_HEIGHT: 15,
      COLUMN_SPACING: 20
    };
  }

  /**
   * Generates a complete vector OMR answer sheet PDF
   * @param {Object} spec - OMR specification object from exam blueprint or PDF config
   * @param {string} outputPath - Optional file path to write PDF to
   * @returns {Promise<Object>} Metadata, buffer, and validation results
   */
  async generateOmrSheet(spec = {}, outputPath = null) {
    const {
      examId = 'ssc-cgl',
      examName = 'SSC CGL 2026 Examination',
      versionId = 'ver-ssc-cgl-2026',
      totalQuestions = 100,
      optionsPerQuestion = 4,
      sections = [
        { sectionName: 'General Intelligence and Reasoning', questionCount: 25 },
        { sectionName: 'General Awareness', questionCount: 25 },
        { sectionName: 'Quantitative Aptitude', questionCount: 25 },
        { sectionName: 'English Comprehension', questionCount: 25 }
      ],
      barcodeId = `OMR-${examId}-${versionId}`,
      setCodeOptions = ['A', 'B', 'C', 'D'],
      rollNumberDigits = 10
    } = spec;

    return new Promise((resolve, reject) => {
      try {
        const doc = new PDFDocument({
          size: this.GEOMETRY.PAGE_SIZE,
          margin: this.GEOMETRY.MARGIN,
          autoFirstPage: true,
          info: {
            Title: `${examName} - OMR Answer Sheet`,
            Author: 'SarkariAI Hub Examination System',
            Subject: 'Machine-Readable Standard OMR Answer Sheet',
            Keywords: 'OMR, Answer Sheet, SSC, SarkariAI'
          }
        });

        const buffers = [];
        doc.on('data', chunk => buffers.push(chunk));
        doc.on('error', err => reject(err));

        let writeStream = null;
        if (outputPath) {
          const dir = path.dirname(outputPath);
          if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
          writeStream = fs.createWriteStream(outputPath);
          doc.pipe(writeStream);
        }

        // =====================================================================
        // 1. OMR HEADER & CANDIDATE INSTRUCTIONS
        // =====================================================================
        doc.rect(this.GEOMETRY.MARGIN, this.GEOMETRY.MARGIN, this.GEOMETRY.PAGE_WIDTH - 2 * this.GEOMETRY.MARGIN, 55)
          .lineWidth(1.5)
          .stroke('#1a365d');

        doc.fontSize(13).font('Helvetica-Bold').fillColor('#1a365d')
          .text(examName.toUpperCase(), this.GEOMETRY.MARGIN + 10, this.GEOMETRY.MARGIN + 8, {
            width: this.GEOMETRY.PAGE_WIDTH - 2 * this.GEOMETRY.MARGIN - 20,
            align: 'center'
          });

        doc.fontSize(9).font('Helvetica-Bold').fillColor('#c53030')
          .text('ORIGINAL OMR ANSWER SHEET — USE BLACK / BLUE BALLPOINT PEN ONLY', {
            align: 'center'
          });

        doc.fontSize(7.5).font('Helvetica').fillColor('#4a5568')
          .text('IMPORTANT: Darken completely. Do NOT fold, tear or use correcting fluid. Print at 100% / Actual Size (Do NOT fit to page).', {
            align: 'center'
          });

        // =====================================================================
        // 2. CANDIDATE MATRIX (Roll Number & Set Code Bubble Grids)
        // =====================================================================
        const matrixTopY = this.GEOMETRY.MARGIN + 62;
        const boxWidth = (this.GEOMETRY.PAGE_WIDTH - 2 * this.GEOMETRY.MARGIN - 15) / 2;

        // Box 1: Roll Number (10 digits x 0-9)
        doc.rect(this.GEOMETRY.MARGIN, matrixTopY, boxWidth, 135)
          .lineWidth(1)
          .stroke('#4a5568');

        doc.fontSize(8).font('Helvetica-Bold').fillColor('#2d3748')
          .text('CANDIDATE ROLL NUMBER', this.GEOMETRY.MARGIN + 8, matrixTopY + 6);

        // Draw 10 boxes for writing digits
        const rollStartX = this.GEOMETRY.MARGIN + 8;
        const rollBoxWidth = 23;
        for (let d = 0; d < rollNumberDigits; d++) {
          const bx = rollStartX + (d * rollBoxWidth);
          doc.rect(bx, matrixTopY + 18, rollBoxWidth - 3, 14).stroke('#718096');
        }

        // Draw 10 columns of bubbles (0 to 9)
        for (let d = 0; d < rollNumberDigits; d++) {
          const bx = rollStartX + (d * rollBoxWidth) + 10;
          for (let n = 0; n <= 9; n++) {
            const by = matrixTopY + 38 + (n * 9.5);
            doc.circle(bx, by, 3.8).stroke('#2b6cb0');
            doc.fontSize(5.5).font('Helvetica').fillColor('#2b6cb0')
              .text(String(n), bx - 1.8, by - 2.5);
          }
        }

        // Box 2: Test Booklet Set Code + Candidate Info & Signatures
        const setBoxX = this.GEOMETRY.MARGIN + boxWidth + 15;
        doc.rect(setBoxX, matrixTopY, boxWidth, 135)
          .lineWidth(1)
          .stroke('#4a5568');

        doc.fontSize(8).font('Helvetica-Bold').fillColor('#2d3748')
          .text('TEST BOOKLET CODE', setBoxX + 8, matrixTopY + 6);

        // Draw Set Code boxes & bubbles (A, B, C, D)
        const setCodeY = matrixTopY + 18;
        for (let s = 0; s < setCodeOptions.length; s++) {
          const sx = setBoxX + 15 + (s * 32);
          doc.rect(sx, setCodeY, 20, 14).stroke('#718096');
          doc.circle(sx + 10, setCodeY + 24, 4.5).stroke('#2b6cb0');
          doc.fontSize(7).font('Helvetica-Bold').fillColor('#1a365d')
            .text(setCodeOptions[s], sx + 7, setCodeY + 21);
        }

        // Signature boxes
        const sigY = matrixTopY + 68;
        doc.rect(setBoxX + 8, sigY, (boxWidth - 24) / 2, 55).stroke('#a0aec0');
        doc.fontSize(6.5).font('Helvetica-Bold').fillColor('#4a5568')
          .text('CANDIDATE SIGNATURE', setBoxX + 12, sigY + 4);

        doc.rect(setBoxX + 8 + (boxWidth - 24) / 2 + 8, sigY, (boxWidth - 24) / 2, 55).stroke('#a0aec0');
        doc.fontSize(6.5).font('Helvetica-Bold').fillColor('#4a5568')
          .text('INVIGILATOR SIGNATURE', setBoxX + 16 + (boxWidth - 24) / 2, sigY + 4);

        // Barcode / Exam Reference Identifier
        doc.fontSize(7).font('Helvetica-Bold').fillColor('#718096')
          .text(`ID: ${barcodeId}`, setBoxX + 8, sigY + 58);

        // =====================================================================
        // 3. ANSWER MATRIX BUBBLE GRIDS (100 Questions x 4 Options)
        // Divided across 4 vertical columns (25 questions per column)
        // =====================================================================
        const answersTopY = matrixTopY + 144;
        const totalCols = 4;
        const colWidth = (this.GEOMETRY.PAGE_WIDTH - 2 * this.GEOMETRY.MARGIN - ((totalCols - 1) * this.GEOMETRY.COLUMN_SPACING)) / totalCols;
        const questionsPerCol = Math.ceil(totalQuestions / totalCols); // 25
        const optionLetters = ['A', 'B', 'C', 'D', 'E'];

        let bubbleCount = 0;
        let questionNumber = 1;

        for (let col = 0; col < totalCols; col++) {
          const colX = this.GEOMETRY.MARGIN + (col * (colWidth + this.GEOMETRY.COLUMN_SPACING));
          const colQuestions = Math.min(questionsPerCol, totalQuestions - (col * questionsPerCol));
          const sectionInfo = sections[col] || { sectionName: `Section ${col + 1}` };

          // Section Header above column
          doc.rect(colX, answersTopY, colWidth, 18).fillAndStroke('#edf2f7', '#cbd5e0');
          doc.fontSize(6.5).font('Helvetica-Bold').fillColor('#2d3748')
            .text(`SEC ${col + 1} (${sectionInfo.sectionName.substring(0, 16)})`, colX + 4, answersTopY + 5, {
              width: colWidth - 8,
              align: 'center'
            });

          // Draw Question Rows
          for (let r = 0; r < colQuestions; r++) {
            const qNum = (col * questionsPerCol) + r + 1;
            const rowY = answersTopY + 22 + (r * this.GEOMETRY.BUBBLE_ROW_HEIGHT);

            // Alternating subtle background tint
            if (r % 2 === 1) {
              doc.rect(colX, rowY - 1, colWidth, this.GEOMETRY.BUBBLE_ROW_HEIGHT).fill('#f7fafc');
            }

            // Question number label
            doc.fontSize(7).font('Helvetica-Bold').fillColor('#2d3748')
              .text(String(qNum).padStart(3, ' '), colX + 2, rowY + 3);

            // Draw A, B, C, D bubbles
            const bubbleStartX = colX + 26;
            for (let opt = 0; opt < optionsPerQuestion; opt++) {
              const bx = bubbleStartX + (opt * this.GEOMETRY.BUBBLE_SPACING_X);
              const by = rowY + 7;

              doc.circle(bx, by, this.GEOMETRY.BUBBLE_RADIUS)
                .lineWidth(0.8)
                .stroke('#1a365d');

              doc.fontSize(6).font('Helvetica-Bold').fillColor('#1a365d')
                .text(optionLetters[opt], bx - 2.2, by - 3.2);

              bubbleCount++;
            }
          }

          // Column outer border
          doc.rect(colX, answersTopY, colWidth, 22 + (colQuestions * this.GEOMETRY.BUBBLE_ROW_HEIGHT))
            .lineWidth(0.8)
            .stroke('#a0aec0');
        }

        // =====================================================================
        // 4. FOOTER & SCAN ALIGNMENT CORNER TIMING MARKS
        // =====================================================================
        const footerY = this.GEOMETRY.PAGE_HEIGHT - this.GEOMETRY.MARGIN - 15;
        doc.fontSize(7).font('Helvetica').fillColor('#718096')
          .text('SarkariAI Hub Exam Engine &bull; Machine-Readable OMR Template v1.0 &bull; Scale: 100% Exact', this.GEOMETRY.MARGIN, footerY, {
            width: this.GEOMETRY.PAGE_WIDTH - 2 * this.GEOMETRY.MARGIN,
            align: 'center'
          });

        // 4 Corner timing alignment marks for OMR scanner calibration
        const markSize = 10;
        doc.rect(this.GEOMETRY.MARGIN - 15, this.GEOMETRY.MARGIN - 15, markSize, markSize).fill('#000000');
        doc.rect(this.GEOMETRY.PAGE_WIDTH - this.GEOMETRY.MARGIN + 5, this.GEOMETRY.MARGIN - 15, markSize, markSize).fill('#000000');
        doc.rect(this.GEOMETRY.MARGIN - 15, this.GEOMETRY.PAGE_HEIGHT - this.GEOMETRY.MARGIN + 5, markSize, markSize).fill('#000000');
        doc.rect(this.GEOMETRY.PAGE_WIDTH - this.GEOMETRY.MARGIN + 5, this.GEOMETRY.PAGE_HEIGHT - this.GEOMETRY.MARGIN + 5, markSize, markSize).fill('#000000');

        doc.end();

        // When document stream finishes
        if (writeStream) {
          writeStream.on('finish', () => {
            const buffer = Buffer.concat(buffers);
            const checksum = crypto.createHash('sha256').update(buffer).digest('hex');

            resolve({
              success: true,
              totalQuestions,
              optionsPerQuestion,
              bubbleCount,
              expectedBubbles: totalQuestions * optionsPerQuestion,
              isExactBubbleMatch: bubbleCount === (totalQuestions * optionsPerQuestion),
              pageCount: 1,
              outputPath,
              documentChecksum: checksum,
              buffer
            });
          });
        } else {
          doc.on('end', () => {
            const buffer = Buffer.concat(buffers);
            const checksum = crypto.createHash('sha256').update(buffer).digest('hex');

            resolve({
              success: true,
              totalQuestions,
              optionsPerQuestion,
              bubbleCount,
              expectedBubbles: totalQuestions * optionsPerQuestion,
              isExactBubbleMatch: bubbleCount === (totalQuestions * optionsPerQuestion),
              pageCount: 1,
              documentChecksum: checksum,
              buffer
            });
          });
        }
      } catch (err) {
        reject(err);
      }
    });
  }

  /**
   * Validates OMR template parameters against verified exam blueprint
   */
  validateOmrBlueprintMatch(blueprint, omrResult) {
    const requiredQuestions = blueprint.total_questions || blueprint.totalQuestions || 100;
    const requiredOptions = 4;
    const expectedBubbles = requiredQuestions * requiredOptions;

    return {
      isValid: omrResult.bubbleCount === expectedBubbles,
      expectedBubbles,
      actualBubbles: omrResult.bubbleCount,
      questionCountMatch: omrResult.totalQuestions === requiredQuestions,
      optionCountMatch: omrResult.optionsPerQuestion === requiredOptions
    };
  }

  /**
   * Retrieves deterministic OMR specification and geometry metadata
   */
  getOmrMetadata(totalQuestions = 100) {
    return {
      pageSize: this.GEOMETRY.PAGE_SIZE,
      pageWidth: this.GEOMETRY.PAGE_WIDTH,
      pageHeight: this.GEOMETRY.PAGE_HEIGHT,
      bubbleRadius: this.GEOMETRY.BUBBLE_RADIUS,
      bubbleSpacingX: this.GEOMETRY.BUBBLE_SPACING_X,
      bubbleRowHeight: this.GEOMETRY.BUBBLE_ROW_HEIGHT,
      questionCount: totalQuestions,
      optionsPerQuestion: 4,
      totalAnswerBubbles: totalQuestions * 4,
      rollNumberColumns: 10,
      rollNumberDigits: 10,
      setCodes: ['A', 'B', 'C', 'D'],
      timingMarks: [
        { x: 18, y: 18, size: 14 },
        { x: this.GEOMETRY.PAGE_WIDTH - 32, y: 18, size: 14 },
        { x: 18, y: this.GEOMETRY.PAGE_HEIGHT - 32, size: 14 },
        { x: this.GEOMETRY.PAGE_WIDTH - 32, y: this.GEOMETRY.PAGE_HEIGHT - 32, size: 14 }
      ],
      barcodePlaceholder: true,
      instructionsText: 'Use only blue/black ballpoint pen. Darken bubbles completely.'
    };
  }
}

module.exports = new PdfOmrGenerator();
