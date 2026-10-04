"""
Indian Air Force Agniveer Vayu Bundled Study Notes and All-Subject PDF Mock Compilers
Generates 5 master bundled notes sampling 50% representative questions (within 40%-60% requirement)
across all subjects for IAF Agniveer Vayu (Science & Other Than Science Streams).
"""

import json
import os

BASE_DIR = os.path.dirname(__file__)
EXAM_VERSION_ID = 'ver-agniveer-airforce-2026'

with open(os.path.join(BASE_DIR, 'agniveer_airforce_bank.json'), 'r', encoding='utf-8') as f:
    all_qs = json.load(f)

def get_sample_qs(qs, subject_id, ratio=0.5):
    sub_qs = [q for q in qs if q['subject_id'] == subject_id]
    count = int(len(sub_qs) * ratio)
    return sub_qs[:count]

# 50% sampling from each of the 5 subjects (150 Qs each)
eng_sample = get_sample_qs(all_qs, 'iaf-agniveer-english', 0.50)
phy_sample = get_sample_qs(all_qs, 'iaf-agniveer-physics', 0.50)
mat_sample = get_sample_qs(all_qs, 'iaf-agniveer-mathematics', 0.50)
rea_sample = get_sample_qs(all_qs, 'iaf-agniveer-raga-reasoning', 0.50)
ga_sample  = get_sample_qs(all_qs, 'iaf-agniveer-raga-general-awareness', 0.50)

all_stream_bundle = eng_sample + phy_sample + mat_sample + rea_sample + ga_sample
sci_bundle = eng_sample + phy_sample + mat_sample
other_bundle = eng_sample + rea_sample + ga_sample
raga_bundle = rea_sample + ga_sample

print(f"Sampled All-Stream Grand Bundle: {len(all_stream_bundle)} questions (Eng:{len(eng_sample)}, Phy:{len(phy_sample)}, Mat:{len(mat_sample)}, Rea:{len(rea_sample)}, GA:{len(ga_sample)})")
print(f"Sampled Science Subjects (Group X) Bundle: {len(sci_bundle)} questions")
print(f"Sampled Other Than Science (Group Y) Bundle: {len(other_bundle)} questions")
print(f"Sampled RAGA Comprehensive Mastery Bundle: {len(raga_bundle)} questions")
print(f"Sampled English Language Master Guide: {len(eng_sample)} questions")

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
        'note_id': 'note-iaf-agniveer-all-subjects-grand-bundle',
        'exam_version_id': EXAM_VERSION_ID,
        'subject_id': 'iaf-agniveer-english',
        'language_id': 'en',
        'note_type': 'ALL_SUBJECTS_SUPER_BUNDLE',
        'title': 'Indian Air Force Agniveer Vayu Complete Examination Blueprint & All-Subject Practice Guide',
        'summary': f'Comprehensive examination repository containing {len(all_stream_bundle)} sampled questions across all 5 subject areas (English, Physics, Mathematics, RAGA Reasoning, and RAGA General Awareness) representing official Central Airmen Selection Board (CASB) standards.',
        'content': f"""# Indian Air Force Agniveer Vayu Complete Examination Blueprint & All-Subject Practice Guide

## 1. Official Conducting Authority & Entry Architecture
- **Conducting Body**: Central Airmen Selection Board (CASB), Indian Air Force (IAF), Ministry of Defence.
- **Official Web Portal**: agnipathvayu.cdac.in
- **Recruitment Scheme**: Agnipath Scheme for Agniveer Vayu (Intake 01/2026 & 02/2026).
- **Exam Mode**: Online Computer Based Test (CBT Phase-I) followed by PFT, Adaptability Tests, and Medical Examination.

## 2. Multi-Stream Examination Schemes & Marking Norms
1. **Science Subjects (Technical / Group X)**:
   - Total Questions: 70 Questions (English: 20, Mathematics: 25, Physics: 25)
   - Total Marks: 70 Marks | Duration: 60 Minutes
   - Marking Scheme: **+1.0 Mark** per correct answer, **-0.25 Marks (1/4th penalty)** per incorrect answer.
2. **Other Than Science Subjects (Non-Technical / Group Y)**:
   - Total Questions: 50 Questions (English: 20, RAGA: 30)
   - Total Marks: 50 Marks | Duration: 45 Minutes
   - Marking Scheme: **+1.0 Mark** per correct answer, **-0.25 Marks (1/4th penalty)** per incorrect answer.
3. **Science and Other Than Science Subjects (Both Groups)**:
   - Total Questions: 100 Questions (English: 20, Mathematics: 25, Physics: 25, RAGA: 30)
   - Total Marks: 100 Marks | Duration: 85 Minutes
   - Marking Scheme: **+1.0 Mark** per correct answer, **-0.25 Marks (1/4th penalty)** per incorrect answer.

## 3. Multi-Subject Sampling (50% Representative Coverage)
- **English Language**: {len(eng_sample)} Questions
- **Physics (10+2)**: {len(phy_sample)} Questions
- **Mathematics (10+2)**: {len(mat_sample)} Questions
- **RAGA - Reasoning**: {len(rea_sample)} Questions
- **RAGA - General Awareness**: {len(ga_sample)} Questions
- **Total Sampled Practice Questions**: {len(all_stream_bundle)} Questions

## 4. High-Yield Practice Excerpts
{build_q_summary_markdown(all_stream_bundle, 18)}

## 5. Airmen Preparation Strategy
- Strictly maintain time allocation: in the 60-minute Science paper, spend 15 mins on English, 22 mins on Physics, and 23 mins on Mathematics.
- Avoid blind guessing: with -0.25 negative marks, every incorrect answer erodes 25% of a correct answer's value.
""",
        'source_references': json.dumps(['src-iaf-agniveer-portal', 'src-iaf-agniveer-notice-2026', 'src-iaf-agniveer-syllabus-model']),
        'verification_status': 'VERIFIED',
        'version': 1,
        'content_depth': 'COMPREHENSIVE_BUNDLE',
        'provenance': 'OFFICIAL_CASB_IAF_CURRICULUM',
        'priority_tier': 'P1'
    },
    {
        'note_id': 'note-iaf-agniveer-science-stream-master-bundle',
        'exam_version_id': EXAM_VERSION_ID,
        'subject_id': 'iaf-agniveer-physics',
        'language_id': 'en',
        'note_type': 'STREAM_SPECIFIC_BUNDLE',
        'title': 'IAF Agniveer Vayu Science Subjects (Group X) Technical Blueprint & Formula Guide',
        'summary': f'Specialized technical repository containing {len(sci_bundle)} sampled questions covering 10+2 Physics, Mathematics, and General English with 1.0 mark per question and -0.25 negative marking simulation.',
        'content': f"""# IAF Agniveer Vayu Science Subjects (Group X) Technical Blueprint & Formula Guide

## 1. Stream Overview
- Designed for candidates with 10+2 Intermediate (Mathematics, Physics, English) with minimum 50% aggregate and 50% in English.
- Evaluates technical aptitude required for aircraft maintenance, radar systems, communication equipment, and avionics.

## 2. Examination Scheme
- **Total Questions**: 70 Questions (English: 20, Mathematics: 25, Physics: 25)
- **Max Marks**: 70 Marks | **Time Allowed**: 60 Minutes
- **Marking Scheme**: **+1.0 Mark** per correct answer | **-0.25 Marks** per wrong answer.

## 3. High-Yield Practice Excerpts
{build_q_summary_markdown(sci_bundle, 15)}

## 4. Technical Subjects Focus Areas
- **Physics**: Projectile motion, Circular motion, Thermodynamics & Carnot engine, Gauss's law, LCR AC circuits, Ray optics lens formulas, Photoelectric effect, Logic gates.
- **Mathematics**: Limits & continuity, Indefinite/definite integrals, Matrix determinants & adjoints, Vectors (dot and cross products), Conic sections, Probability.
""",
        'source_references': json.dumps(['src-iaf-agniveer-portal', 'src-iaf-agniveer-syllabus-model']),
        'verification_status': 'VERIFIED',
        'version': 1,
        'content_depth': 'COMPREHENSIVE_BUNDLE',
        'provenance': 'OFFICIAL_CASB_IAF_CURRICULUM',
        'priority_tier': 'P1'
    },
    {
        'note_id': 'note-iaf-agniveer-other-than-science-bundle',
        'exam_version_id': EXAM_VERSION_ID,
        'subject_id': 'iaf-agniveer-raga-reasoning',
        'language_id': 'en',
        'note_type': 'STREAM_SPECIFIC_BUNDLE',
        'title': 'IAF Agniveer Vayu Other Than Science (Group Y) Non-Technical Master Blueprint',
        'summary': f'Specialized non-technical repository containing {len(other_bundle)} sampled questions covering English and RAGA (Reasoning & General Awareness) with 1.0 mark per question and -0.25 negative marking simulation.',
        'content': f"""# IAF Agniveer Vayu Other Than Science (Group Y) Non-Technical Master Blueprint

## 1. Stream Overview
- Open to candidates having passed 10+2 / Intermediate in any stream with minimum 50% aggregate and 50% marks in English.
- Tests logical acumen, numerical facility, spatial visualization, and general awareness.

## 2. Examination Scheme
- **Total Questions**: 50 Questions (English: 20, RAGA: 30)
- **Max Marks**: 50 Marks | **Time Allowed**: 45 Minutes
- **Marking Scheme**: **+1.0 Mark** per correct answer | **-0.25 Marks** per wrong answer.

## 3. High-Yield Practice Excerpts
{build_q_summary_markdown(other_bundle, 15)}

## 4. Time Management Strategy
- Spend 15 minutes on English (20 Qs) and 30 minutes on RAGA (30 Qs).
- RAGA consists of approximately 16-18 Reasoning questions and 12-14 General Awareness questions.
""",
        'source_references': json.dumps(['src-iaf-agniveer-portal', 'src-iaf-agniveer-notice-2026']),
        'verification_status': 'VERIFIED',
        'version': 1,
        'content_depth': 'COMPREHENSIVE_BUNDLE',
        'provenance': 'OFFICIAL_CASB_IAF_CURRICULUM',
        'priority_tier': 'P1'
    },
    {
        'note_id': 'note-iaf-agniveer-raga-complete-mastery',
        'exam_version_id': EXAM_VERSION_ID,
        'subject_id': 'iaf-agniveer-raga-general-awareness',
        'language_id': 'en',
        'note_type': 'SECTION_MASTERY_BUNDLE',
        'title': 'IAF Agniveer Vayu Reasoning and General Awareness (RAGA) High-Yield Blueprint',
        'summary': f'Comprehensive RAGA repository containing {len(raga_bundle)} sampled questions covering Numerical Reasoning, Blood Relations, Direction Tests, Non-Verbal Series, IAF Defence Structure, and Everyday Science.',
        'content': f"""# IAF Agniveer Vayu Reasoning and General Awareness (RAGA) High-Yield Blueprint

## 1. Strategic Role of RAGA
- RAGA carries **30 Marks (60% weightage)** in the Other Than Science stream and **30 Marks (30% weightage)** in the Both Streams examination.
- High score in RAGA ensures candidate clears the overall aggregate cut-off for merit ranking.

## 2. High-Yield Practice Excerpts
{build_q_summary_markdown(raga_bundle, 15)}

## 3. Essential Indian Air Force Facts
- **Motto**: 'Nabha Sparsham Deeptam' (Touch the Sky with Glory) from the Bhagavad Gita.
- **Air Force Day**: 8th October (Established 1932).
- **IAF Operational Commands**:
  - Western Air Command: Subroto Park, New Delhi
  - Eastern Air Command: Shillong, Meghalaya
  - Central Air Command: Prayagraj, UP
  - South Western Air Command: Gandhinagar, Gujarat
  - Southern Air Command: Thiruvananthapuram, Kerala
  - Training Command: Bengaluru, Karnataka
  - Maintenance Command: Nagpur, Maharashtra
- **Param Vir Chakra Recipient**: Flying Officer Nirmal Jit Singh Sekhon (1971 war).
""",
        'source_references': json.dumps(['src-iaf-agniveer-portal', 'src-iaf-agniveer-syllabus-model']),
        'verification_status': 'VERIFIED',
        'version': 1,
        'content_depth': 'COMPREHENSIVE_BUNDLE',
        'provenance': 'OFFICIAL_CASB_IAF_CURRICULUM',
        'priority_tier': 'P1'
    },
    {
        'note_id': 'note-iaf-agniveer-english-master-grammar-vocab',
        'exam_version_id': EXAM_VERSION_ID,
        'subject_id': 'iaf-agniveer-english',
        'language_id': 'en',
        'note_type': 'LANGUAGE_MASTERY_BUNDLE',
        'title': 'IAF Agniveer Vayu English Language, Functional Grammar & High-Frequency Vocabulary Guide',
        'summary': f'English subject repository containing {len(eng_sample)} sampled questions covering Active/Passive Voice, Direct/Indirect Narration, Idioms, Antonyms, Synonyms, and Prepositions.',
        'content': f"""# IAF Agniveer Vayu English Language, Functional Grammar & High-Frequency Vocabulary Guide

## 1. English Section Scheme
- Mandatory for ALL Agniveer Vayu streams (Science, Other Than Science, and Both).
- Carries **20 Questions / 20 Marks** with individual sectional qualifying cutoff (typically 8-10 marks).

## 2. High-Yield Practice Excerpts
{build_q_summary_markdown(eng_sample, 15)}

## 3. High-Scoring Grammar Principles
- Subject-Verb Agreement: Words like 'Neither... nor', 'Either... or', 'Not only... but also' agree with the nearer subject.
- Conditional sentences: 'Had + V3' in the if-clause requires 'would have + V3' in the main clause.
- Prepositional accuracy: Insist on, Refrain from, Prevent from, Accused of, Senior to.
""",
        'source_references': json.dumps(['src-iaf-agniveer-portal', 'src-iaf-agniveer-syllabus-model']),
        'verification_status': 'VERIFIED',
        'version': 1,
        'content_depth': 'COMPREHENSIVE_BUNDLE',
        'provenance': 'OFFICIAL_CASB_IAF_CURRICULUM',
        'priority_tier': 'P1'
    }
]

out_path = os.path.join(BASE_DIR, 'agniveer_airforce_bundled_notes.json')
with open(out_path, 'w', encoding='utf-8') as f:
    json.dump(notes, f, indent=2, ensure_ascii=False)

print(f"SUCCESS: Created {len(notes)} IAF Agniveer Vayu bundled notes at {out_path}")
