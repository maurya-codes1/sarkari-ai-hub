// backend/db/phase4-mock-init.js
// Phase 4 Database Setup & Blueprint Seeder
// 1. Creates mock_sessions table for persistent test tracking and anti-tamper server-side scoring.
// 2. Seeds standard marking rules & attempt rules.
// 3. Seeds verified multi-section exam blueprints (SSC CGL, SSC GD, RRB ALP, NEET UG, CBSE Class 10).
// 4. Maintains legacy blueprints with 'NEEDS_REVIEW' status.

const { getDb } = require('./database');

function initPhase4MockData(db = getDb()) {
  console.log('[Phase4Init] 🚀 Initializing Phase 4 Mock Engine Data & Tables...');

  // 1. Create mock_sessions table
  db.exec(`
    CREATE TABLE IF NOT EXISTS mock_sessions (
      session_id VARCHAR(64) PRIMARY KEY,
      exam_id VARCHAR(64) NOT NULL,
      exam_version_id VARCHAR(64),
      blueprint_id VARCHAR(64),
      test_mode VARCHAR(32) NOT NULL, -- 'FULL_EXAM' or 'PRACTICE'
      language_config JSON,
      duration_minutes INTEGER NOT NULL,
      total_questions INTEGER NOT NULL,
      questions_to_attempt INTEGER NOT NULL,
      marking_rules JSON,
      sections_json JSON,
      question_ids_json JSON NOT NULL,
      user_answers_json JSON DEFAULT '{}',
      review_flags_json JSON DEFAULT '[]',
      status VARCHAR(32) DEFAULT 'IN_PROGRESS', -- 'IN_PROGRESS', 'SUBMITTED', 'EXPIRED'
      score_details JSON,
      started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      submitted_at TIMESTAMP,
      time_spent_seconds INTEGER DEFAULT 0
    );

    CREATE INDEX IF NOT EXISTS idx_mock_sessions_exam ON mock_sessions(exam_id);
    CREATE INDEX IF NOT EXISTS idx_mock_sessions_status ON mock_sessions(status);
  `);
  console.log('✅ Created/verified table: mock_sessions');

  // 2. Seed Standard Marking Rules
  const insertMarkingRule = db.prepare(`
    INSERT INTO marking_rules (
      rule_id, name, marks_correct, marks_wrong, marks_unattempted,
      has_negative_marking, negative_value, allows_partial_marking, is_decimal_allowed, description
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(rule_id) DO UPDATE SET
      name = excluded.name,
      marks_correct = excluded.marks_correct,
      marks_wrong = excluded.marks_wrong,
      has_negative_marking = excluded.has_negative_marking,
      negative_value = excluded.negative_value,
      description = excluded.description
  `);

  const markingRules = [
    ['rule-legacy-standard', 'Legacy 1 Mark Default', 1.0, 0.0, 0.0, 0, 0.0, 0, 1, 'Legacy unverified 1 mark rule'],
    ['rule-standard-1m-noneg', 'Standard 1 Mark (No Negative)', 1.0, 0.0, 0.0, 0, 0.0, 0, 1, 'Standard 1 mark with 0 negative marking for School Boards & Practice'],
    ['rule-ssc-quarter-neg', 'SSC Pattern (2 Marks, 0.50 Neg)', 2.0, 0.50, 0.0, 1, 0.50, 0, 1, 'Official SSC Tier-1 scheme: +2 for correct, -0.50 (1/4th penalty) for wrong'],
    ['rule-rrb-third-neg', 'Railway RRB (1 Mark, 0.33 Neg)', 1.0, 0.33, 0.0, 1, 0.33, 0, 1, 'Official Railway CBT scheme: +1 for correct, -0.33 (1/3rd penalty) for wrong'],
    ['rule-neet-standard', 'NEET UG (4 Marks, 1.00 Neg)', 4.0, 1.0, 0.0, 1, 1.0, 0, 1, 'Official NTA NEET UG scheme: +4 for correct, -1 (1/4th penalty) for wrong'],
    ['rule-upsc-prelims', 'UPSC Prelims GS (2 Marks, 0.66 Neg)', 2.0, 0.66, 0.0, 1, 0.66, 0, 1, 'Official UPSC CSE Prelims GS: +2 for correct, -0.66 (1/3rd penalty) for wrong'],
    ['rule-board-mcq-1m', 'Board Objective MCQ (1 Mark)', 1.0, 0.0, 0.0, 0, 0.0, 0, 1, 'CBSE/State Board Objective question: +1 correct, 0 negative']
  ];

  for (const mr of markingRules) {
    insertMarkingRule.run(...mr);
  }
  console.log(`✅ Seeded/updated ${markingRules.length} standard marking rules.`);

  // 3. Seed Attempt Rules
  const insertAttemptRule = db.prepare(`
    INSERT INTO attempt_rules (attempt_rule_id, name, rule_type, total_provided, max_to_attempt, min_to_attempt, description)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(attempt_rule_id) DO UPDATE SET
      name = excluded.name,
      rule_type = excluded.rule_type,
      total_provided = excluded.total_provided,
      max_to_attempt = excluded.max_to_attempt,
      description = excluded.description
  `);

  const attemptRules = [
    ['attempt-all', 'Attempt All Compulsory', 'ATTEMPT_ALL', 0, 0, 0, 'All provided questions may be attempted without restriction'],
    ['attempt-neet-sec-b', 'NEET Section B (Attempt 10 of 15)', 'ATTEMPT_N_OF_M', 15, 10, 0, 'Candidate chooses any 10 questions to attempt out of 15 presented'],
    ['attempt-board-internal-choice', 'Board Section Internal Choice (8 of 10)', 'OPTIONAL_QUESTIONS', 10, 8, 0, 'Candidate attempts any 8 out of 10 questions'],
    ['attempt-90-of-100', 'Compulsory 90 Questions from 100', 'ATTEMPT_N_OF_M', 100, 90, 0, 'Candidate attempts exactly 90 questions from 100 questions']
  ];

  for (const ar of attemptRules) {
    insertAttemptRule.run(...ar);
  }
  console.log(`✅ Seeded/updated ${attemptRules.length} attempt rules.`);

  // 4. Seed Verified Multi-Section Blueprints
  const insertBp = db.prepare(`
    INSERT INTO exam_blueprints (
      blueprint_id, exam_version_id, name, total_marks, duration_minutes,
      total_questions, questions_to_attempt, is_negative_marking, answer_format,
      supports_numerical_input, supports_subjective_answer, verification_status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'OMR_OR_CBT', ?, ?, ?)
    ON CONFLICT(blueprint_id) DO UPDATE SET
      exam_version_id = excluded.exam_version_id,
      name = excluded.name,
      total_marks = excluded.total_marks,
      duration_minutes = excluded.duration_minutes,
      total_questions = excluded.total_questions,
      questions_to_attempt = excluded.questions_to_attempt,
      is_negative_marking = excluded.is_negative_marking,
      supports_numerical_input = excluded.supports_numerical_input,
      supports_subjective_answer = excluded.supports_subjective_answer,
      verification_status = excluded.verification_status
  `);

  const insertSection = db.prepare(`
    INSERT INTO blueprint_sections (
      section_id, blueprint_id, subject_id, name, section_order,
      question_count, questions_to_attempt, total_marks, marks_per_question,
      marking_rule_id, attempt_rule_id, allowed_question_types, instructions
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(section_id) DO UPDATE SET
      subject_id = excluded.subject_id,
      name = excluded.name,
      section_order = excluded.section_order,
      question_count = excluded.question_count,
      questions_to_attempt = excluded.questions_to_attempt,
      total_marks = excluded.total_marks,
      marks_per_question = excluded.marks_per_question,
      marking_rule_id = excluded.marking_rule_id,
      attempt_rule_id = excluded.attempt_rule_id,
      allowed_question_types = excluded.allowed_question_types,
      instructions = excluded.instructions
  `);

  // All required subjects are already seeded in subjects table

  const verifiedBlueprints = [
    {
      bp: ['bp-verified-ssc-cgl', 'ver-ssc-cgl-2026', 'SSC CGL Tier-1 Official Pattern (4 Sections)', 200, 60, 100, 100, 1, 0, 0, 'VERIFIED'],
      sections: [
        ['sec-ssc-cgl-1', 'bp-verified-ssc-cgl', 'subj-reasoning', 'General Intelligence and Reasoning', 1, 25, 25, 50, 2.0, 'rule-ssc-quarter-neg', 'attempt-all', '["single_mcq"]', 'Each question carries 2 marks. Negative marking of 0.50 marks applies for wrong answers.'],
        ['sec-ssc-cgl-2', 'bp-verified-ssc-cgl', 'subj-gk', 'General Awareness', 2, 25, 25, 50, 2.0, 'rule-ssc-quarter-neg', 'attempt-all', '["single_mcq"]', 'Each question carries 2 marks. Negative marking of 0.50 marks applies for wrong answers.'],
        ['sec-ssc-cgl-3', 'bp-verified-ssc-cgl', 'subj-math', 'Quantitative Aptitude', 3, 25, 25, 50, 2.0, 'rule-ssc-quarter-neg', 'attempt-all', '["single_mcq"]', 'Each question carries 2 marks. Negative marking of 0.50 marks applies for wrong answers.'],
        ['sec-ssc-cgl-4', 'bp-verified-ssc-cgl', 'subj-english', 'English Comprehension', 4, 25, 25, 50, 2.0, 'rule-ssc-quarter-neg', 'attempt-all', '["single_mcq"]', 'Each question carries 2 marks. Negative marking of 0.50 marks applies for wrong answers.']
      ]
    },
    {
      bp: ['bp-verified-ssc-gd', 'ver-ssc-gd-2026', 'SSC GD Constable Official Pattern (4 Sections)', 160, 60, 80, 80, 1, 0, 0, 'VERIFIED'],
      sections: [
        ['sec-ssc-gd-1', 'bp-verified-ssc-gd', 'subj-reasoning', 'Part A: General Intelligence & Reasoning', 1, 20, 20, 40, 2.0, 'rule-ssc-quarter-neg', 'attempt-all', '["single_mcq"]', '20 Questions, 40 Marks, -0.50 negative marking per wrong response.'],
        ['sec-ssc-gd-2', 'bp-verified-ssc-gd', 'subj-gk', 'Part B: General Knowledge & Awareness', 2, 20, 20, 40, 2.0, 'rule-ssc-quarter-neg', 'attempt-all', '["single_mcq"]', '20 Questions, 40 Marks, -0.50 negative marking per wrong response.'],
        ['sec-ssc-gd-3', 'bp-verified-ssc-gd', 'subj-math', 'Part C: Elementary Mathematics', 3, 20, 20, 40, 2.0, 'rule-ssc-quarter-neg', 'attempt-all', '["single_mcq"]', '20 Questions, 40 Marks, -0.50 negative marking per wrong response.'],
        ['sec-ssc-gd-4', 'bp-verified-ssc-gd', 'subj-hindi', 'Part D: Hindi / English Language', 4, 20, 20, 40, 2.0, 'rule-ssc-quarter-neg', 'attempt-all', '["single_mcq"]', '20 Questions, 40 Marks, -0.50 negative marking per wrong response.']
      ]
    },
    {
      bp: ['bp-verified-rrb-alp', 'ver-rrb-alp-2026', 'RRB ALP CBT-1 Official Pattern (4 Sections)', 75, 60, 75, 75, 1, 0, 0, 'VERIFIED'],
      sections: [
        ['sec-rrb-alp-1', 'bp-verified-rrb-alp', 'subj-math', 'Mathematics', 1, 20, 20, 20, 1.0, 'rule-rrb-third-neg', 'attempt-all', '["single_mcq"]', 'Each question carries 1 mark. 1/3rd (0.33) marks deducted per incorrect answer.'],
        ['sec-rrb-alp-2', 'bp-verified-rrb-alp', 'subj-reasoning', 'General Intelligence & Reasoning', 2, 25, 25, 25, 1.0, 'rule-rrb-third-neg', 'attempt-all', '["single_mcq"]', 'Each question carries 1 mark. 1/3rd (0.33) marks deducted per incorrect answer.'],
        ['sec-rrb-alp-3', 'bp-verified-rrb-alp', 'subj-railway-sci', 'General Science', 3, 20, 20, 20, 1.0, 'rule-rrb-third-neg', 'attempt-all', '["single_mcq"]', 'Each question carries 1 mark. 1/3rd (0.33) marks deducted per incorrect answer.'],
        ['sec-rrb-alp-4', 'bp-verified-rrb-alp', 'subj-gk', 'General Awareness on Current Affairs', 4, 10, 10, 10, 1.0, 'rule-rrb-third-neg', 'attempt-all', '["single_mcq"]', 'Each question carries 1 mark. 1/3rd (0.33) marks deducted per incorrect answer.']
      ]
    },
    {
      bp: ['bp-verified-cbse-10-science', 'ver-cbse-board-2026', 'CBSE Class 10 Science Blueprint (Objective & Structured)', 80, 180, 39, 39, 0, 1, 1, 'VERIFIED'],
      sections: [
        ['sec-cbse-10-1', 'bp-verified-cbse-10-science', 'subj-science', 'Section A: Objective & Assertion-Reason', 1, 20, 20, 20, 1.0, 'rule-board-mcq-1m', 'attempt-all', '["single_mcq","assertion_reason"]', '20 Objective Questions (1 mark each). No negative marking.'],
        ['sec-cbse-10-2', 'bp-verified-cbse-10-science', 'subj-science', 'Section B: Short Conceptual Questions', 2, 10, 10, 20, 2.0, 'rule-standard-1m-noneg', 'attempt-all', '["short_answer"]', '10 Short Answer Questions (2 marks each). Conceptual definitions and reasoning.'],
        ['sec-cbse-10-3', 'bp-verified-cbse-10-science', 'subj-science', 'Section C: Long / Application & Numerical', 3, 9, 9, 40, 4.44, 'rule-standard-1m-noneg', 'attempt-all', '["long_answer","numerical"]', '9 Long/Numerical Questions. Step-wise marking applies.']
      ]
    },
    {
      bp: ['bp-verified-neet-ug', 'ver-nta-neet-2026', 'NEET UG Official Multi-Section Pattern (Section A & B Choice)', 720, 200, 200, 180, 1, 0, 0, 'VERIFIED'],
      sections: [
        ['sec-neet-phy-a', 'bp-verified-neet-ug', 'subj-physics', 'Physics — Section A (Compulsory 35 Qs)', 1, 35, 35, 140, 4.0, 'rule-neet-standard', 'attempt-all', '["single_mcq"]', 'Compulsory 35 Questions. +4 for correct, -1 for wrong.'],
        ['sec-neet-phy-b', 'bp-verified-neet-ug', 'subj-physics', 'Physics — Section B (Attempt 10 of 15)', 2, 15, 10, 40, 4.0, 'rule-neet-standard', 'attempt-neet-sec-b', '["single_mcq"]', 'Attempt any 10 questions out of 15. Only first 10 evaluated.'],
        ['sec-neet-chem-a', 'bp-verified-neet-ug', 'subj-chemistry', 'Chemistry — Section A (Compulsory 35 Qs)', 3, 35, 35, 140, 4.0, 'rule-neet-standard', 'attempt-all', '["single_mcq"]', 'Compulsory 35 Questions. +4 for correct, -1 for wrong.'],
        ['sec-neet-chem-b', 'bp-verified-neet-ug', 'subj-chemistry', 'Chemistry — Section B (Attempt 10 of 15)', 4, 15, 10, 40, 4.0, 'rule-neet-standard', 'attempt-neet-sec-b', '["single_mcq"]', 'Attempt any 10 questions out of 15. Only first 10 evaluated.'],
        ['sec-neet-bio-a', 'bp-verified-neet-ug', 'subj-biology', 'Biology (Botany & Zoology) — Section A', 5, 70, 70, 280, 4.0, 'rule-neet-standard', 'attempt-all', '["single_mcq"]', 'Compulsory 70 Questions. +4 for correct, -1 for wrong.'],
        ['sec-neet-bio-b', 'bp-verified-neet-ug', 'subj-biology', 'Biology (Botany & Zoology) — Section B', 6, 30, 20, 80, 4.0, 'rule-neet-standard', 'attempt-neet-sec-b', '["single_mcq"]', 'Attempt any 20 questions out of 30. Only first 20 evaluated.']
      ]
    }
  ];

  for (const item of verifiedBlueprints) {
    insertBp.run(...item.bp);
    for (const sec of item.sections) {
      insertSection.run(...sec);
    }
  }

  console.log(`✅ Seeded ${verifiedBlueprints.length} verified multi-section blueprints and ${verifiedBlueprints.reduce((acc, curr) => acc + curr.sections.length, 0)} sections.`);
  console.log('[Phase4Init] 🎉 Phase 4 database initializations complete.');
}

if (require.main === module) {
  initPhase4MockData();
}

module.exports = { initPhase4MockData };
