// backend/db/phase8-pdf-init.js
// Phase 8: Production PDF Engine, Multilingual Question Papers, Notes, Answer Keys & OMR
// Database Migration & Initialization Script

const { getDb } = require('./database');

function initPhase8PdfSchema(db = getDb()) {
  console.log('========================================================');
  console.log('🚀 SARKARIAI HUB — PHASE 8 PRODUCTION PDF ENGINE INIT');
  console.log('========================================================');

  if (!db) {
    console.error('❌ Failed to connect to SQLite database.');
    process.exit(1);
  }

  // 1. Create/Ensure pdf_documents table (Core record of generated and verified PDFs)
  db.exec(`
    CREATE TABLE IF NOT EXISTS pdf_documents (
      pdf_id TEXT PRIMARY KEY,
      exam_id TEXT NOT NULL REFERENCES exams(exam_id),
      exam_version_id TEXT NOT NULL REFERENCES exam_versions(version_id),
      blueprint_version_id TEXT,
      syllabus_version_id TEXT,
      language_configuration_id TEXT,
      paper_id TEXT REFERENCES question_papers(paper_id),
      question_set_id TEXT,
      mock_session_id TEXT,
      snapshot_id TEXT REFERENCES exam_configuration_snapshots(snapshot_id),
      template_id TEXT REFERENCES pdf_templates(template_id),
      template_version TEXT DEFAULT '1.0.0',
      document_type TEXT NOT NULL,
      title TEXT NOT NULL,
      file_name TEXT NOT NULL,
      file_path TEXT,
      page_count INTEGER DEFAULT 1,
      file_size_bytes INTEGER DEFAULT 0,
      document_checksum TEXT,
      generation_status TEXT NOT NULL DEFAULT 'QUEUED',
      is_stale INTEGER DEFAULT 0,
      stale_reason TEXT,
      failure_reason TEXT,
      metadata_json TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      validated_at DATETIME
    );

    CREATE INDEX IF NOT EXISTS idx_pdf_doc_exam_ver ON pdf_documents(exam_id, exam_version_id);
    CREATE INDEX IF NOT EXISTS idx_pdf_doc_type ON pdf_documents(document_type);
    CREATE INDEX IF NOT EXISTS idx_pdf_doc_status ON pdf_documents(generation_status);
    CREATE INDEX IF NOT EXISTS idx_pdf_doc_checksum ON pdf_documents(document_checksum);
  `);
  console.log('✅ Table created/verified: pdf_documents');

  // 2. Create pdf_generation_jobs table (Asynchronous generation queue & tracking)
  db.exec(`
    CREATE TABLE IF NOT EXISTS pdf_generation_jobs (
      job_id TEXT PRIMARY KEY,
      pdf_id TEXT NOT NULL REFERENCES pdf_documents(pdf_id) ON DELETE CASCADE,
      document_type TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'QUEUED',
      progress_percent INTEGER DEFAULT 0,
      stage TEXT DEFAULT 'INIT',
      error_message TEXT,
      started_at DATETIME,
      completed_at DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_pdf_jobs_status ON pdf_generation_jobs(status);
    CREATE INDEX IF NOT EXISTS idx_pdf_jobs_pdf ON pdf_generation_jobs(pdf_id);
  `);
  console.log('✅ Table created/verified: pdf_generation_jobs');

  // 3. Create pdf_validation_results table (Multi-point automated quality inspection results)
  db.exec(`
    CREATE TABLE IF NOT EXISTS pdf_validation_results (
      validation_id TEXT PRIMARY KEY,
      pdf_id TEXT NOT NULL REFERENCES pdf_documents(pdf_id) ON DELETE CASCADE,
      structural_pass INTEGER DEFAULT 1,
      glyph_pass INTEGER DEFAULT 1,
      page_count_pass INTEGER DEFAULT 1,
      content_parity_pass INTEGER DEFAULT 1,
      omr_geometry_pass INTEGER DEFAULT 1,
      overall_valid INTEGER DEFAULT 1,
      validation_details_json TEXT,
      validated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_pdf_val_pdf ON pdf_validation_results(pdf_id);
  `);
  console.log('✅ Table created/verified: pdf_validation_results');

  // 4. Create pdf_template_versions table (Template versioning & immutability)
  db.exec(`
    CREATE TABLE IF NOT EXISTS pdf_template_versions (
      template_version_id TEXT PRIMARY KEY,
      template_id TEXT NOT NULL REFERENCES pdf_templates(template_id),
      version_number TEXT NOT NULL,
      layout_mode TEXT NOT NULL DEFAULT 'BILINGUAL_TWO_COLUMN',
      css_rules TEXT,
      header_template TEXT,
      footer_template TEXT,
      is_active INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_pdf_tmpl_ver ON pdf_template_versions(template_id, version_number);
  `);
  console.log('✅ Table created/verified: pdf_template_versions');

  // 5. Seed Official Standard PDF Templates into pdf_templates and pdf_template_versions
  const defaultTemplates = [
    {
      id: 'tmpl-full-exam-default',
      name: 'Full Exam Official Pattern Booklet Template',
      pdfType: 'FULL_EXAM_PAPER',
      layoutMode: 'BILINGUAL_TWO_COLUMN',
      header: '<header><span class="exam-title">{EXAM_NAME}</span><span class="paper-stage">{STAGE}</span></header>',
      footer: '<footer><span>SarkariAI Hub Exam Mock</span><span class="page-num">Page {PAGE_NUM} of {TOTAL_PAGES}</span></footer>',
      fonts: ['Arial', 'NirmalaUI']
    },
    {
      id: 'tmpl-subject-practice-default',
      name: 'Subject-wise Practice Worksheet Template',
      pdfType: 'SUBJECT_PRACTICE_PAPER',
      layoutMode: 'SINGLE_COLUMN',
      header: '<header><span class="subject-title">{SUBJECT_NAME} Practice</span></header>',
      footer: '<footer><span>SarkariAI Hub Subject Practice</span><span class="page-num">Page {PAGE_NUM}</span></footer>',
      fonts: ['Arial', 'NirmalaUI']
    },
    {
      id: 'tmpl-all-subjects-practice-default',
      name: 'All Subjects Mixed Practice Workbook Template',
      pdfType: 'ALL_SUBJECTS_PRACTICE_PAPER',
      layoutMode: 'BILINGUAL_STACKED',
      header: '<header><span class="exam-title">{EXAM_NAME} All Subjects Practice</span></header>',
      footer: '<footer><span>SarkariAI Hub Practice Compilation</span><span class="page-num">Page {PAGE_NUM}</span></footer>',
      fonts: ['Arial', 'NirmalaUI']
    },
    {
      id: 'tmpl-pyq-default',
      name: 'Official Previous Year Paper Authentic Reproduction Template',
      pdfType: 'PYQ_PAPER',
      layoutMode: 'BILINGUAL_TWO_COLUMN',
      header: '<header><span class="exam-title">{EXAM_NAME} - Official PYQ ({ACADEMIC_YEAR})</span></header>',
      footer: '<footer><span>Official PYQ Study Reproduction</span><span class="page-num">Page {PAGE_NUM}</span></footer>',
      fonts: ['Arial', 'NirmalaUI']
    },
    {
      id: 'tmpl-notes-default',
      name: 'Structured Study & Revision Booster Notes Template',
      pdfType: 'NOTES',
      layoutMode: 'SINGLE_COLUMN',
      header: '<header><span class="notes-title">{EXAM_NAME} - {SUBJECT_NAME} Notes</span></header>',
      footer: '<footer><span>SarkariAI Hub High-Yield Study Notes</span><span class="page-num">Page {PAGE_NUM}</span></footer>',
      fonts: ['Arial', 'NirmalaUI']
    },
    {
      id: 'tmpl-answer-key-default',
      name: 'Verified Official Answer Key Tabular Template',
      pdfType: 'ANSWER_KEY',
      layoutMode: 'SINGLE_COLUMN',
      header: '<header><span class="exam-title">{EXAM_NAME} - Official Answer Key</span></header>',
      footer: '<footer><span>Official Verified Answer Key</span><span class="page-num">Page {PAGE_NUM}</span></footer>',
      fonts: ['Arial', 'NirmalaUI']
    },
    {
      id: 'tmpl-solutions-default',
      name: 'Detailed Step-by-Step Solutions & Explanations Template',
      pdfType: 'SOLUTIONS',
      layoutMode: 'SINGLE_COLUMN',
      header: '<header><span class="exam-title">{EXAM_NAME} - Explanations & Solutions</span></header>',
      footer: '<footer><span>SarkariAI Hub Solutions & Pedagogical Explanations</span><span class="page-num">Page {PAGE_NUM}</span></footer>',
      fonts: ['Arial', 'NirmalaUI']
    },
    {
      id: 'tmpl-board-question-paper-default',
      name: 'Board Examination Descriptive & Multi-Type Paper Template',
      pdfType: 'BOARD_QUESTION_PAPER',
      layoutMode: 'SINGLE_COLUMN',
      header: '<header><span class="board-title">{EXAM_NAME} - Board Assessment</span></header>',
      footer: '<footer><span>Board Pattern Question Paper</span><span class="page-num">Page {PAGE_NUM}</span></footer>',
      fonts: ['Arial', 'NirmalaUI']
    },
    {
      id: 'tmpl-omr-default',
      name: 'Machine-Readable Standard OMR Answer Sheet Template',
      pdfType: 'OMR_SHEET',
      layoutMode: 'OMR_GRID',
      header: '<header><span class="omr-title">{EXAM_NAME} - OMR ANSWER SHEET</span></header>',
      footer: '<footer><span>PRINT AT 100% ACTUAL SIZE — DO NOT FIT TO PAGE</span></footer>',
      fonts: ['Arial']
    },
    {
      id: 'tmpl-combined-exam-package-default',
      name: 'Combined Question Paper Booklet with Attached OMR Sheet Package',
      pdfType: 'COMBINED_EXAM_PACKAGE',
      layoutMode: 'BILINGUAL_TWO_COLUMN',
      header: '<header><span class="exam-title">{EXAM_NAME} - Combined Question Booklet & OMR</span></header>',
      footer: '<footer><span>SarkariAI Hub Complete Examination Package</span><span class="page-num">Page {PAGE_NUM}</span></footer>',
      fonts: ['Arial', 'NirmalaUI']
    }
  ];

  const insertTmplStmt = db.prepare(`
    INSERT OR REPLACE INTO pdf_templates (
      template_id, name, pdf_type, blueprint_id, page_format, orientation,
      layout_mode, header_html, footer_html, css_rules, embedded_fonts
    ) VALUES (?, ?, ?, NULL, 'A4', 'portrait', ?, ?, ?, '', ?)
  `);

  const insertVerStmt = db.prepare(`
    INSERT OR REPLACE INTO pdf_template_versions (
      template_version_id, template_id, version_number, layout_mode,
      css_rules, header_template, footer_template, is_active
    ) VALUES (?, ?, '1.0.0', ?, '', ?, ?, 1)
  `);

  const transaction = db.transaction(() => {
    for (const t of defaultTemplates) {
      insertTmplStmt.run(
        t.id,
        t.name,
        t.pdfType,
        t.layoutMode,
        t.header,
        t.footer,
        JSON.stringify(t.fonts)
      );

      insertVerStmt.run(
        `ver-${t.id}-1.0.0`,
        t.id,
        t.layoutMode,
        t.header,
        t.footer
      );
    }
  });

  transaction();
  console.log(`✅ Seeded ${defaultTemplates.length} default PDF templates and version records.`);

  // 6. Verify foreign key integrity
  const fkCheck = db.pragma('foreign_key_check');
  if (fkCheck.length > 0) {
    console.error('❌ Foreign key constraint violations found:', fkCheck);
    process.exit(1);
  }
  console.log('✅ Foreign Key Integrity Verified: 0 violations');
  console.log('🎉 Phase 8 Database Schema Initialization Complete!');
}

if (require.main === module) {
  initPhase8PdfSchema();
}

module.exports = { initPhase8PdfSchema };
