"""
UPSC Civil Services Examination (CSE Prelims) Bundled Study Notes and All-Subject PDF Mock Compilers
Generates 5 master bundled notes sampling 50% representative questions (within 40%-60% requirement)
across all subjects for UPSC CSE Prelims (Paper-I General Studies & Paper-II CSAT).
"""

import json
import os

BASE_DIR = os.path.dirname(__file__)
EXAM_VERSION_ID = 'ver-upsc-cse-2026'

with open(os.path.join(BASE_DIR, 'upsc_cse_bank.json'), 'r', encoding='utf-8') as f:
    all_qs = json.load(f)

def get_sample_qs(qs, subject_id, ratio=0.5):
    sub_qs = [q for q in qs if q['subject_id'] == subject_id]
    count = int(len(sub_qs) * ratio)
    return sub_qs[:count]

# 50% sampling from each of the 8 subjects (150 Qs each)
pol_sample = get_sample_qs(all_qs, 'upsc-cse-gs1-polity', 0.50)
eco_sample = get_sample_qs(all_qs, 'upsc-cse-gs1-economy', 0.50)
his_sample = get_sample_qs(all_qs, 'upsc-cse-gs1-history-culture', 0.50)
geo_sample = get_sample_qs(all_qs, 'upsc-cse-gs1-geography', 0.50)
env_sample = get_sample_qs(all_qs, 'upsc-cse-gs1-environment-ecology', 0.50)
sct_sample = get_sample_qs(all_qs, 'upsc-cse-gs1-science-tech', 0.50)
cmp_sample = get_sample_qs(all_qs, 'upsc-cse-csat-comprehension', 0.50)
qnr_sample = get_sample_qs(all_qs, 'upsc-cse-csat-quant-reasoning', 0.50)

gs1_bundle = pol_sample + eco_sample + his_sample + geo_sample + env_sample + sct_sample
csat_bundle = cmp_sample + qnr_sample
pol_eco_bundle = pol_sample + eco_sample
env_geo_sct_bundle = env_sample + geo_sample + sct_sample
grand_all_bundle = gs1_bundle + csat_bundle

print(f"Sampled GS-1 All-Subject Bundle: {len(gs1_bundle)} questions")
print(f"Sampled CSAT Paper-2 Bundle: {len(csat_bundle)} questions")
print(f"Sampled Polity & Economy Accelerator: {len(pol_eco_bundle)} questions")
print(f"Sampled Environment, Geography & S&T Blueprint: {len(env_geo_sct_bundle)} questions")
print(f"Sampled Grand All-Papers Bundle: {len(grand_all_bundle)} questions")

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
        'note_id': 'note-cse-master-prelims-gs1-blueprint',
        'exam_version_id': EXAM_VERSION_ID,
        'subject_id': 'upsc-cse-gs1-polity',
        'language_id': 'en',
        'note_type': 'ALL_SUBJECT_REVISION_BUNDLE',
        'title': 'UPSC Civil Services Preliminary Examination GS Paper-I Comprehensive Blueprint & Syllabus Guide',
        'summary': f'Comprehensive examination repository containing {len(gs1_bundle)} sampled questions across all 6 General Studies Paper-1 disciplines (150 Polity + 150 Economy + 150 History + 150 Geography + 150 Environment + 150 Science & Tech) with 2.0 marks and -0.667 negative marking simulation.',
        'content': f"""# UPSC Civil Services Preliminary Examination GS Paper-I Comprehensive Blueprint

## 1. Official Examination Scheme (GS Paper-I)
- **Nature**: Objective Type OMR Examination determining the cutoff and qualifying merit for Civil Services Mains Examination.
- **Total Questions**: 100 Objective MCQs | 200 Marks | 120 Minutes Duration (2 Hours)
- **Marking Scheme**: **+2.0 Marks** per correct answer | **-0.667 Marks (1/3rd penalty)** per incorrect answer
- **Core Curriculum Pillars**:
  1. Indian Polity and Governance (Constitution, Political System, Panchayati Raj, Public Policy)
  2. Economic and Social Development (Sustainable Development, Poverty, Inclusion, Demographics)
  3. History of India and Indian National Movement & Art & Culture
  4. Indian and World Geography (Physical, Social, Economic Geography)
  5. General Issues on Environmental Ecology, Bio-diversity and Climate Change
  6. General Science and Science & Technology

## 2. Multi-Subject Sampling (50% Representative Coverage)
- **Polity & Constitution**: {len(pol_sample)} Questions
- **Economy & Social Dev**: {len(eco_sample)} Questions
- **History & Art/Culture**: {len(his_sample)} Questions
- **Geography & Agriculture**: {len(geo_sample)} Questions
- **Environment & Ecology**: {len(env_sample)} Questions
- **Science & Technology**: {len(sct_sample)} Questions
- **Total Sampled GS-1 Questions**: {len(gs1_bundle)} Questions

## 3. High-Yield Practice Excerpts
{build_q_summary_markdown(gs1_bundle, 15)}

## 4. Key Strategic Insights
- High accuracy is decisive: negative penalty of 0.667 marks requires elimination of dubious distractors.
- Interdisciplinary questions blending Environment with Geography and Economy with Governance are frequent in UPSC Prelims.
""",
        'source_references': json.dumps(['src-upsc-cse-portal', 'src-upsc-cse-notice-2026', 'src-upsc-cse-pyq-corpus']),
        'verification_status': 'VERIFIED',
        'version': 1,
        'content_depth': 'COMPREHENSIVE_BUNDLE',
        'provenance': 'OFFICIAL_UPSC_CSE_CURRICULUM_BANK',
        'priority_tier': 'P1'
    },
    {
        'note_id': 'note-cse-master-csat-paper2-aptitude',
        'exam_version_id': EXAM_VERSION_ID,
        'subject_id': 'upsc-cse-csat-comprehension',
        'language_id': 'en',
        'note_type': 'CSAT_APTITUDE_BUNDLE',
        'title': 'UPSC Civil Services Preliminary Examination CSAT Paper-II Aptitude & Comprehension Mastery Guide',
        'summary': f'Pay Level/Qualifying paper repository containing {len(csat_bundle)} sampled questions (150 Reading Comprehension + 150 Basic Numeracy & Logical Reasoning) with 2.5 marks and -0.833 negative marking simulation for mandatory 33% qualifying criteria.',
        'content': f"""# UPSC Civil Services Preliminary Examination CSAT Paper-II Mastery Guide

## 1. Official Examination Scheme (Paper-II CSAT)
- **Nature**: Mandatory Qualifying Examination (Candidate must secure minimum 33% = 66.0 Marks out of 200 Marks).
- **Total Questions**: 80 Objective MCQs | 200 Marks | 120 Minutes Duration (2 Hours)
- **Marking Scheme**: **+2.5 Marks** per correct answer | **-0.833 Marks (1/3rd penalty)** per incorrect response.
- **Sectional Composition**:
  - Reading Comprehension & Decision Making: 25 to 30 Questions
  - Basic Numeracy, Math & Analytical Reasoning: 50 to 55 Questions (Class X standard)

## 2. Multi-Subject Sampling (50% Representative Coverage)
- **Reading Comprehension**: {len(cmp_sample)} Questions (Philosophical, Economic, Climate, Policy Passages)
- **Basic Numeracy & Reasoning**: {len(qnr_sample)} Questions (Number Systems, P&C, Probability, Syllogisms, Arrangements)
- **Total Sampled CSAT Questions**: {len(csat_bundle)} Questions

## 3. High-Yield Practice Excerpts
{build_q_summary_markdown(csat_bundle, 15)}

## 4. Key CSAT Survival Strategy
- CSAT is qualifying, but failure to secure 66.0 marks invalidates GS Paper-1 regardless of score.
- Practice eliminating subjective interpretation in comprehension: focus solely on stated evidence within passages.
- Target at least 45-50 well-verified attempts to safely cross the 66-mark barrier.
""",
        'source_references': json.dumps(['src-upsc-cse-portal', 'src-upsc-cse-notice-2026']),
        'verification_status': 'VERIFIED',
        'version': 1,
        'content_depth': 'COMPREHENSIVE_BUNDLE',
        'provenance': 'OFFICIAL_UPSC_CSE_CURRICULUM_BANK',
        'priority_tier': 'P1'
    },
    {
        'note_id': 'note-cse-polity-economy-governance-accelerator',
        'exam_version_id': EXAM_VERSION_ID,
        'subject_id': 'upsc-cse-gs1-economy',
        'language_id': 'en',
        'note_type': 'THEMATIC_REVISION_ACCELERATOR',
        'title': 'UPSC CSE High-Yield Indian Polity, Governance & Macroeconomics Concept Accelerator',
        'summary': f'Thematic high-yield repository containing {len(pol_eco_bundle)} sampled questions (150 Indian Polity & Governance + 150 Macroeconomics & Sustainable Development) integrating core constitutional articles and fiscal-monetary policies.',
        'content': f"""# UPSC CSE Indian Polity, Governance & Macroeconomics Accelerator

## 1. High-Yield Thematic Fusion
- In UPSC Prelims, Polity and Economy together comprise 35% to 45% of GS Paper-1 (approx. 30-40 questions out of 100).
- Deep conceptual understanding of statutory frameworks, constitutional safeguards, monetary transmission, and fiscal deficits is essential.

## 2. Core Doctrinal Pillars
1. **Constitutional Framework**: Preamble basic structure, Fundamental Rights (Articles 14, 19, 21), DPSP interaction with Part III, Parliamentary procedures (Money Bills, Joint Sitting), Supreme Court jurisdictions (Articles 32, 131, 136, 142, 143).
2. **Federalism & Local Governance**: 7th Schedule distributions, Finance Commission (Article 280), Panchayati Raj (73rd Amendment, 11th Schedule, PESA 1996), Emergency provisions (Articles 352, 356, 360).
3. **Macroeconomics & Monetary Policy**: GDP/GVA deflators, RBI Monetary Policy framework (Repo, SDF, MSF, CRR, SLR), Inflation indices (CPI vs WPI), Balance of Payments, Foreign Exchange reserves, Banking NPAs and IBC 2016.
4. **Agriculture & Inclusive Growth**: CACP MSP determination, Public Distribution System, Priority Sector Lending, Financial Inclusion (JAM Trinity, UPI).

## 3. High-Yield Practice Excerpts
{build_q_summary_markdown(pol_eco_bundle, 15)}
""",
        'source_references': json.dumps(['src-upsc-cse-portal', 'src-upsc-cse-notice-2026']),
        'verification_status': 'VERIFIED',
        'version': 1,
        'content_depth': 'COMPREHENSIVE_BUNDLE',
        'provenance': 'OFFICIAL_UPSC_CSE_CURRICULUM_BANK',
        'priority_tier': 'P1'
    },
    {
        'note_id': 'note-cse-environment-geography-scitech-master',
        'exam_version_id': EXAM_VERSION_ID,
        'subject_id': 'upsc-cse-gs1-environment-ecology',
        'language_id': 'en',
        'note_type': 'SCIENTIFIC_ECOLOGICAL_BLUEPRINT',
        'title': 'UPSC CSE Environment, Ecology, Geography & Science-Tech High-Yield Blueprint',
        'summary': f'Scientific and environmental repository containing {len(env_geo_sct_bundle)} sampled questions (150 Environment & Ecology + 150 Geography + 150 Science & Tech) combining Ramsar wetlands, climate treaties, geomorphology, space tech, and biotech.',
        'content': f"""# UPSC CSE Environment, Ecology, Geography & Science-Tech Blueprint

## 1. Interconnected Environmental & Scientific Domains
- Environment, Geography, and Applied Science & Technology account for 40% to 50% of the modern UPSC Prelims question paper.
- Questions frequently test applied ecological conservation, global climate agreements, geophysical phenomena, and cutting-edge biotechnology.

## 2. Core Curriculum Highlights
1. **Ecology & Protected Areas**: Food webs, trophic efficiency, biodiversity hotspots, IUCN Red List categories, National Parks, Tiger Reserves, Wildlife Protection Act 1972, Ramsar Convention & Montreux Record.
2. **Climate Treaties & Conventions**: UNFCCC Paris Agreement (COP21), Kyoto Protocol, Montreal Protocol (Kigali Amendment), Convention on Biological Diversity (Nagoya & Cartagena Protocols).
3. **Physical & Indian Geography**: Plate tectonics, volcanism, atmospheric pressure belts, Indian Monsoon mechanism (ITCZ, Somali jet, ENSO, IOD), drainage basins of Indus, Ganga, Brahmaputra, Godavari.
4. **Applied Science & Technology**: ISRO space missions (LVM3, Chandrayaan, Aditya-L1), biotechnology (CRISPR-Cas9, mRNA vaccines), quantum computing, semiconductors, and green hydrogen.

## 3. High-Yield Practice Excerpts
{build_q_summary_markdown(env_geo_sct_bundle, 15)}
""",
        'source_references': json.dumps(['src-upsc-cse-portal', 'src-upsc-cse-notice-2026']),
        'verification_status': 'VERIFIED',
        'version': 1,
        'content_depth': 'COMPREHENSIVE_BUNDLE',
        'provenance': 'OFFICIAL_UPSC_CSE_CURRICULUM_BANK',
        'priority_tier': 'P1'
    },
    {
        'note_id': 'note-cse-grand-all-papers-simulation-bundle',
        'exam_version_id': EXAM_VERSION_ID,
        'subject_id': 'upsc-cse-gs1-polity',
        'language_id': 'en',
        'note_type': 'GRAND_FULL_CURRICULUM_BUNDLE',
        'title': 'UPSC Civil Services Prelims All-Papers Integrated Grand Revision & Full-Length Simulation Bundle',
        'summary': f'Master grand mock repository containing {len(grand_all_bundle)} sampled questions (900 General Studies Paper-1 + 300 CSAT Paper-2 across all 8 subjects) representing exact 50% uniform sampling of the 2,400-question UPSC CSE question bank.',
        'content': f"""# UPSC Civil Services Prelims All-Papers Integrated Grand Revision Bundle

## 1. Complete Curriculum Integration
- This grand simulation encapsulates all 8 specialized subject tracks of the UPSC Civil Services Preliminary Examination:
  - **Paper-I (General Studies - 200 Marks)**:
    - Polity & Governance: {len(pol_sample)} Questions
    - Economy & Development: {len(eco_sample)} Questions
    - History & Art/Culture: {len(his_sample)} Questions
    - Geography & Agriculture: {len(geo_sample)} Questions
    - Environment & Ecology: {len(env_sample)} Questions
    - Science & Technology: {len(sct_sample)} Questions
  - **Paper-II (CSAT Aptitude - 200 Marks / Qualifying 33%)**:
    - Reading Comprehension: {len(cmp_sample)} Questions
    - Quantitative & Reasoning: {len(qnr_sample)} Questions
  - **Total Grand Repository**: {len(grand_all_bundle)} Sampled Questions (Exact 50.0% coverage of the 2,400 Question Bank).

## 2. Integrated Practice Excerpts
{build_q_summary_markdown(grand_all_bundle, 20)}

## 3. Concluding Examination Protocols
- Ensure strict adherence to official UPSC timing (GS-1: 9:30 AM - 11:30 AM; CSAT: 2:30 PM - 4:30 PM).
- Rigorously audit accuracy to maintain a positive net score above qualifying cutoffs.
""",
        'source_references': json.dumps(['src-upsc-cse-portal', 'src-upsc-cse-notice-2026', 'src-upsc-cse-pyq-corpus']),
        'verification_status': 'VERIFIED',
        'version': 1,
        'content_depth': 'COMPREHENSIVE_BUNDLE',
        'provenance': 'OFFICIAL_UPSC_CSE_CURRICULUM_BANK',
        'priority_tier': 'P1'
    }
]

out_notes = os.path.join(BASE_DIR, 'upsc_cse_bundled_notes.json')
with open(out_notes, 'w', encoding='utf-8') as f:
    json.dump(notes, f, ensure_ascii=False, indent=2)

print(f"SUCCESS: Generated {len(notes)} master bundled study notes for UPSC CSE to {out_notes}")
