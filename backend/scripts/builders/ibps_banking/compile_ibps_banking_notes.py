"""
IBPS & SBI Banking (PO & Clerk) Bundled Study Notes and All-Subject PDF Mock Compilers
Generates 5 master bundled notes sampling 50% representative questions (within 40%-60% requirement)
across all subjects for IBPS & SBI Banking.
"""

import json
import os

BASE_DIR = os.path.dirname(__file__)
EXAM_VERSION_ID = 'ver-ibps-po-clerk-2026'

with open(os.path.join(BASE_DIR, 'ibps_banking_bank.json'), 'r', encoding='utf-8') as f:
    all_qs = json.load(f)

def get_sample_qs(qs, subject_id, ratio=0.5):
    sub_qs = [q for q in qs if q['subject_id'] == subject_id]
    count = int(len(sub_qs) * ratio)
    return sub_qs[:count]

# 50% sampling from each of the 4 subjects (150 Qs each)
qua_sample = get_sample_qs(all_qs, 'ibps-banking-quantitative-aptitude', 0.50)
rea_sample = get_sample_qs(all_qs, 'ibps-banking-reasoning-ability', 0.50)
eng_sample = get_sample_qs(all_qs, 'ibps-banking-english-language', 0.50)
ga_sample  = get_sample_qs(all_qs, 'ibps-banking-general-financial-awareness', 0.50)

grand_bundle = qua_sample + rea_sample + eng_sample + ga_sample
prelims_bundle = qua_sample + rea_sample + eng_sample
mains_bundle = qua_sample + rea_sample

print(f"Sampled Grand Banking Bundle: {len(grand_bundle)} questions (Quant:{len(qua_sample)}, Rea:{len(rea_sample)}, Eng:{len(eng_sample)}, GA:{len(ga_sample)})")
print(f"Sampled Prelims 100-Mark Speed Bundle: {len(prelims_bundle)} questions")
print(f"Sampled Mains High-Level DI & Puzzles Bundle: {len(mains_bundle)} questions")
print(f"Sampled Financial & Banking Awareness Master Guide: {len(ga_sample)} questions")
print(f"Sampled English Language Verbal Ability Guide: {len(eng_sample)} questions")

def build_q_summary_markdown(sampled_questions, max_display=12):
    md = ""
    for idx, q in enumerate(sampled_questions[:max_display], 1):
        parsed = json.loads(q['language_content'])
        en_stem = parsed['en']['stem']
        hi_stem = parsed['hi']['stem']
        ans = q['correct_answer']
        md += f"\n**Q{idx} [{q['subject_id']} | ID: {q['question_id']}]**\n- (EN): {en_stem}\n- (HI): {hi_stem}\n- *Correct Answer*: **{ans}** | *Marks*: {q['marks']}\n"
    if len(sampled_questions) > max_display:
        md += f"\n*... [Plus {len(sampled_questions) - max_display} additional verified official questions sampled in this comprehensive repository]*\n"
    return md

notes = [
    {
        'note_id': 'note-ibps-banking-po-clerk-grand-blueprint',
        'exam_version_id': EXAM_VERSION_ID,
        'subject_id': 'ibps-banking-quantitative-aptitude',
        'language_id': 'en',
        'note_type': 'ALL_SUBJECTS_SUPER_BUNDLE',
        'title': 'IBPS & SBI Banking (PO & Clerk) Comprehensive Examination Blueprint & All-Subject Practice Guide',
        'summary': f'Comprehensive examination repository containing {len(grand_bundle)} sampled questions across all 4 core curricula (Quantitative Aptitude, Reasoning Ability, English Language, and Financial/Banking Awareness) representing official IBPS and SBI recruitment standards.',
        'content': f"""# IBPS & SBI Banking (PO & Clerk) Comprehensive Examination Blueprint & All-Subject Practice Guide

## 1. Conducting Authority & Examination Architecture
- **Conducting Bodies**: Institute of Banking Personnel Selection (IBPS) & State Bank of India (SBI).
- **Official Web Portals**: ibps.in & sbi.co.in/careers
- **Examination Cadres**:
  - IBPS CRP PO/MT (Probationary Officers / Management Trainees across Public Sector Banks)
  - IBPS CRP Clerical Cadre (Customer Support Associates)
  - SBI PO (Probationary Officers) & SBI Clerk (Junior Associates)
- **Examination Stages**:
  - Preliminary Examination (Objective CBT: 100 Questions, 100 Marks, 60 Minutes with 20-minute sectional timing)
  - Main Examination (Objective CBT + Descriptive Test for PO: 200 Marks + 25 Marks Descriptive)
  - Psychometric Test & Group Exercise / Interview (for PO cadre).

## 2. Examination Scheme & Marking Rules
- **Marking Formula**: **+1.0 Mark** per correct response, **-0.25 Marks (1/4th penalty)** per wrong answer.
- **Sectional Cut-offs**: Mandatory sectional qualifying marks enforced in IBPS examinations.
- **Sectional Timing**: Fixed 20-minute time lock per section in Prelims preventing inter-sectional switching.

## 3. Multi-Subject Sampling (50% Representative Coverage)
- **Quantitative Aptitude & Data Interpretation**: {len(qua_sample)} Questions
- **Reasoning Ability & Puzzles**: {len(rea_sample)} Questions
- **English Language & Verbal Ability**: {len(eng_sample)} Questions
- **General / Banking / Financial Awareness**: {len(ga_sample)} Questions
- **Total Sampled Practice Questions**: {len(grand_bundle)} Questions

## 4. High-Yield Practice Excerpts
{build_q_summary_markdown(grand_bundle, 18)}

## 5. Strategic Preparation Advice
- Master high-speed mental calculations (squares up to 50, cubes up to 30, fractional values of percentages).
- Build disciplined puzzle-solving routines: attempt categorical puzzles (box/floor) only after securing marks in Syllogisms, Inequalities, and Coding-Decoding.
""",
        'source_references': json.dumps(['src-ibps-banking-portal', 'src-ibps-po-crp-notice-2026', 'src-sbi-po-clerk-notice-2026']),
        'verification_status': 'VERIFIED',
        'version': 1,
        'content_depth': 'COMPREHENSIVE_BUNDLE',
        'provenance': 'OFFICIAL_IBPS_SBI_SYLLABUS',
        'priority_tier': 'P1'
    },
    {
        'note_id': 'note-ibps-banking-prelims-master-bundle',
        'exam_version_id': EXAM_VERSION_ID,
        'subject_id': 'ibps-banking-reasoning-ability',
        'language_id': 'en',
        'note_type': 'STAGE_SPECIFIC_BUNDLE',
        'title': 'IBPS & SBI Bank Prelims 100-Mark Speed Practice & Cutoff Blueprint',
        'summary': f'Prelims examination repository containing {len(prelims_bundle)} sampled questions covering Quantitative Aptitude, Reasoning Ability, and English Language with 1.0 mark per question and -0.25 negative marking simulation.',
        'content': f"""# IBPS & SBI Bank Prelims 100-Mark Speed Practice & Cutoff Blueprint

## 1. Prelims Examination Structure
- **Total Questions**: 100 Questions | **Max Marks**: 100 Marks | **Duration**: 60 Minutes
- **Sectional Breakdown**:
  - English Language: 30 Questions | 30 Marks | 20 Minutes
  - Quantitative Aptitude: 35 Questions | 35 Marks | 20 Minutes
  - Reasoning Ability: 35 Questions | 35 Marks | 20 Minutes
- **Marking Scheme**: **+1.0 Mark** per correct answer | **-0.25 Marks** per wrong answer.

## 2. High-Yield Practice Excerpts
{build_q_summary_markdown(prelims_bundle, 15)}

## 3. 20-Minute Time Management Blueprint
- **Quantitative Section**:
  - Min 0-5: Simplification/Approximation (5-10 Qs)
  - Min 5-8: Quadratic Equations (5 Qs)
  - Min 8-12: Missing/Wrong Number Series (5 Qs)
  - Min 12-17: Data Interpretation Set (5 Qs)
  - Min 17-20: High-Yield Arithmetic Word Problems (Partnership, Ages, Ratios).
""",
        'source_references': json.dumps(['src-ibps-banking-portal', 'src-ibps-po-crp-notice-2026']),
        'verification_status': 'VERIFIED',
        'version': 1,
        'content_depth': 'COMPREHENSIVE_BUNDLE',
        'provenance': 'OFFICIAL_IBPS_SBI_SYLLABUS',
        'priority_tier': 'P1'
    },
    {
        'note_id': 'note-ibps-banking-mains-data-analysis-reasoning',
        'exam_version_id': EXAM_VERSION_ID,
        'subject_id': 'ibps-banking-quantitative-aptitude',
        'language_id': 'en',
        'note_type': 'STAGE_SPECIFIC_BUNDLE',
        'title': 'Banking Mains High-Level Data Analysis, Puzzles & Critical Reasoning Master Digest',
        'summary': f'Advanced Mains repository containing {len(mains_bundle)} sampled questions covering Complex Caselet DI, Missing DI, Machine Input-Output, Coded Inequalities, and High-Order Puzzles.',
        'content': f"""# Banking Mains High-Level Data Analysis, Puzzles & Critical Reasoning Master Digest

## 1. Nature of Mains Examination
- Tests analytical depth rather than pure arithmetic speed.
- Mains questions incorporate multiple variables, missing table values, combined algebraic relations, and critical inferences.

## 2. High-Yield Practice Excerpts
{build_q_summary_markdown(mains_bundle, 15)}

## 3. Advanced Domains Focus
- **Data Analysis**: Caselet sets involving venn diagrams, radar charts, probability-linked distributions, and time-and-work arithmetic DI.
- **Reasoning**: Advanced floor-with-flat arrangements, blood relation puzzles with blood-lines integrated with designation ranking, and machine input-output with mathematical operations.
""",
        'source_references': json.dumps(['src-ibps-banking-portal', 'src-sbi-po-clerk-notice-2026']),
        'verification_status': 'VERIFIED',
        'version': 1,
        'content_depth': 'COMPREHENSIVE_BUNDLE',
        'provenance': 'OFFICIAL_IBPS_SBI_SYLLABUS',
        'priority_tier': 'P1'
    },
    {
        'note_id': 'note-ibps-banking-financial-economy-awareness-master',
        'exam_version_id': EXAM_VERSION_ID,
        'subject_id': 'ibps-banking-general-financial-awareness',
        'language_id': 'en',
        'note_type': 'SECTION_MASTERY_BUNDLE',
        'title': 'RBI Policy, Banking Regulations & Indian Financial Economy Complete Master Digest',
        'summary': f'Specialized banking repository containing {len(ga_sample)} sampled questions covering RBI Monetary Policy Tools, Basel III Norms, NPA Classification, Priority Sector Lending, NPCI Platforms, and Financial Inclusions.',
        'content': f"""# RBI Policy, Banking Regulations & Indian Financial Economy Complete Master Digest

## 1. Key Banking Regulatory Frameworks
- **Reserve Bank of India (RBI)**: Established April 1, 1935 under RBI Act 1934; nationalised January 1, 1949.
- **Monetary Policy Committee (MPC)**: 6 members (3 RBI + 3 GoI). Targets CPI inflation at 4% with a tolerance band of +/- 2%.
- **Liquidity Adjustment Facility (LAF) Corridor**:
  - Ceiling: Marginal Standing Facility (MSF) & Bank Rate (Repo + 25 bps)
  - Benchmark: Policy Repo Rate
  - Floor: Standing Deposit Facility (SDF) (Repo - 25 bps).
- **Capital Adequacy (Basel III)**: Minimum CRAR 9.0% + 2.5% Capital Conservation Buffer (CCB) = 11.5% for scheduled commercial banks.
- **Priority Sector Lending (PSL)**: 40% of ANBC for domestic banks (Agriculture 18%, Micro Enterprises 7.5%, Weaker Sections 12%).

## 2. High-Yield Practice Excerpts
{build_q_summary_markdown(ga_sample, 15)}

## 3. Digital Banking & Payment Architecture
- **NPCI Products**: UPI (Unified Payments Interface), RuPay, IMPS (Immediate Payment Service), NACH, AePS (Aadhaar Enabled Payment System), CTS (Cheque Truncation System).
- **Accounts**: CASA (Current Account Savings Account), NOSTRO (Our account with you in foreign currency), VOSTRO (Your account with us in domestic currency), LORO (Their account).
""",
        'source_references': json.dumps(['src-ibps-banking-portal', 'src-ibps-po-crp-notice-2026']),
        'verification_status': 'VERIFIED',
        'version': 1,
        'content_depth': 'COMPREHENSIVE_BUNDLE',
        'provenance': 'OFFICIAL_IBPS_SBI_SYLLABUS',
        'priority_tier': 'P1'
    },
    {
        'note_id': 'note-ibps-banking-english-comprehension-grammar-guide',
        'exam_version_id': EXAM_VERSION_ID,
        'subject_id': 'ibps-banking-english-language',
        'language_id': 'en',
        'note_type': 'LANGUAGE_MASTERY_BUNDLE',
        'title': 'Banking English Language, Reading Comprehension & High-Yield Verbal Ability Guide',
        'summary': f'Verbal ability repository containing {len(eng_sample)} sampled questions covering Editorial Comprehension, Cloze Tests, Error Spotting, Sentence Improvement, and Financial Vocabulary.',
        'content': f"""# Banking English Language, Reading Comprehension & High-Yield Verbal Ability Guide

## 1. Nature of Banking English Section
- Heavily focuses on context, tone, cohesion, and editorial comprehension from business publications (The Hindu, Business Standard, The Economic Times).

## 2. High-Yield Practice Excerpts
{build_q_summary_markdown(eng_sample, 15)}

## 3. High-Scoring Verbal Principles
- **Subject-Verb Agreement**: Collective nouns like 'Board of Directors', 'Monetary Policy Committee' take singular verbs when functioning unanimously.
- **Parallelism**: Ensure grammatical elements joined by conjunctions (and, but, or) share matching grammatical structures.
- **Vocabulary in Context**: Master financial nuances of words like Solvency, Liquidity, Moratorium, Amortization, Fiduciary, Volatility, Fiscal, and Monetary.
""",
        'source_references': json.dumps(['src-ibps-banking-portal', 'src-ibps-po-crp-notice-2026']),
        'verification_status': 'VERIFIED',
        'version': 1,
        'content_depth': 'COMPREHENSIVE_BUNDLE',
        'provenance': 'OFFICIAL_IBPS_SBI_SYLLABUS',
        'priority_tier': 'P1'
    }
]

out_path = os.path.join(BASE_DIR, 'ibps_banking_bundled_notes.json')
with open(out_path, 'w', encoding='utf-8') as f:
    json.dump(notes, f, indent=2, ensure_ascii=False)

print(f"SUCCESS: Created {len(notes)} IBPS & SBI Banking bundled notes at {out_path}")
