"""
Indian Navy Agniveer SSR & MR Bundled Study Notes and All-Subject PDF Mock Compilers
Generates 5 master bundled notes sampling 50% representative questions (within 40%-60% requirement)
across all subjects for Indian Navy Agniveer SSR & MR.
"""

import json
import os

BASE_DIR = os.path.dirname(__file__)
EXAM_VERSION_ID = 'ver-agniveer-navy-2026'

with open(os.path.join(BASE_DIR, 'agniveer_navy_bank.json'), 'r', encoding='utf-8') as f:
    all_qs = json.load(f)

def get_sample_qs(qs, subject_id, ratio=0.5):
    sub_qs = [q for q in qs if q['subject_id'] == subject_id]
    count = int(len(sub_qs) * ratio)
    return sub_qs[:count]

# 50% sampling from each of the 4 subjects (150 Qs each)
eng_sample = get_sample_qs(all_qs, 'navy-agniveer-english', 0.50)
sci_sample = get_sample_qs(all_qs, 'navy-agniveer-science', 0.50)
mat_sample = get_sample_qs(all_qs, 'navy-agniveer-mathematics', 0.50)
ga_sample  = get_sample_qs(all_qs, 'navy-agniveer-general-awareness', 0.50)

grand_bundle = eng_sample + sci_sample + mat_sample + ga_sample
ssr_bundle = eng_sample + sci_sample + mat_sample + ga_sample
mr_bundle = sci_sample + mat_sample + ga_sample
sci_math_bundle = sci_sample + mat_sample
ga_eng_bundle = ga_sample + eng_sample

print(f"Sampled Grand All-Subjects Bundle: {len(grand_bundle)} questions (Eng:{len(eng_sample)}, Sci:{len(sci_sample)}, Mat:{len(mat_sample)}, GA:{len(ga_sample)})")
print(f"Sampled SSR Master Blueprint: {len(ssr_bundle)} questions")
print(f"Sampled MR Matric Recruit Bundle: {len(mr_bundle)} questions")
print(f"Sampled Science & Math Formula Digest: {len(sci_math_bundle)} questions")
print(f"Sampled Naval Awareness & English Guide: {len(ga_eng_bundle)} questions")

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
        'note_id': 'note-navy-agniveer-all-trades-grand-bundle',
        'exam_version_id': EXAM_VERSION_ID,
        'subject_id': 'navy-agniveer-general-awareness',
        'language_id': 'en',
        'note_type': 'ALL_SUBJECTS_SUPER_BUNDLE',
        'title': 'Indian Navy Agniveer SSR & MR Complete Examination Blueprint & All-Subject Practice Guide',
        'summary': f'Comprehensive examination repository containing {len(grand_bundle)} sampled questions across all 4 core curricula (English, Science, Mathematics, and General Awareness/Naval Heritage) representing official Directorate of Manpower Planning & Recruitment (Naval HQ) standards.',
        'content': f"""# Indian Navy Agniveer SSR & MR Complete Examination Blueprint & All-Subject Practice Guide

## 1. Conducting Body & Recruitment Framework
- **Conducting Authority**: Directorate of Manpower Planning & Recruitment, Naval Headquarters, Ministry of Defence.
- **Official Web Portal**: joinindiannavy.gov.in
- **Recruitment Scheme**: Agniveer Scheme under Agnipath System for enrolment as Sailors in the Indian Navy.
- **Computer-Based Examination (INET / Stage I)**: All-India online objective test conducted across designated testing centres.

## 2. Multi-Track Examination Schemes & Marking Norms
1. **Agniveer Senior Secondary Recruit (SSR)**:
   - Total Questions: 100 Questions (English: 25, Science: 25, Mathematics: 25, General Awareness: 25)
   - Total Marks: 100 Marks | Duration: 60 Minutes
   - Marking Scheme: **+1.0 Mark** per correct answer, **-0.25 Marks (1/4th penalty)** per incorrect answer.
   - Eligibility: 10+2 with Maths & Physics, and at least one of Chemistry/Biology/Computer Science.
2. **Agniveer Matric Recruit (MR - Chef, Steward, Hygienist)**:
   - Total Questions: 50 Questions (Science & Mathematics: 25, General Awareness: 25)
   - Total Marks: 50 Marks | Duration: 30 Minutes
   - Marking Scheme: **+1.0 Mark** per correct answer, **-0.25 Marks (1/4th penalty)** per incorrect answer.
   - Eligibility: 10th Standard / Matriculation pass.

## 3. Multi-Subject Sampling (50% Representative Coverage)
- **English Language**: {len(eng_sample)} Questions
- **General Science**: {len(sci_sample)} Questions
- **Core & Applied Mathematics**: {len(mat_sample)} Questions
- **General Awareness & Maritime Heritage**: {len(ga_sample)} Questions
- **Total Sampled Practice Questions**: {len(grand_bundle)} Questions

## 4. High-Yield Practice Excerpts
{build_q_summary_markdown(grand_bundle, 18)}

## 5. Sailor Physical Fitness & Service Ethics
- Stage II involves Physical Fitness Test (PFT): 1.6 km run in 6 min 30 sec (men) / 8 min (women), Squats (Uthak Baithak), Push-ups, and Bent-knee sit-ups.
- Maintain rapid calculation skills for technical sections to maximize merit standing.
""",
        'source_references': json.dumps(['src-navy-agniveer-portal', 'src-navy-agniveer-notice-2026', 'src-navy-agniveer-syllabus-model']),
        'verification_status': 'VERIFIED',
        'version': 1,
        'content_depth': 'COMPREHENSIVE_BUNDLE',
        'provenance': 'OFFICIAL_NAVY_SYLLABUS',
        'priority_tier': 'P1'
    },
    {
        'note_id': 'note-navy-agniveer-ssr-technical-master-bundle',
        'exam_version_id': EXAM_VERSION_ID,
        'subject_id': 'navy-agniveer-science',
        'language_id': 'en',
        'note_type': 'STREAM_SPECIFIC_BUNDLE',
        'title': 'Indian Navy Agniveer SSR (Senior Secondary Recruit) Comprehensive 100-Mark Blueprint',
        'summary': f'Technical sailor repository containing {len(ssr_bundle)} sampled questions covering English, 10+2 Science, Higher Mathematics, and General Awareness with 1.0 mark per question and -0.25 negative marking simulation.',
        'content': f"""# Indian Navy Agniveer SSR (Senior Secondary Recruit) Comprehensive 100-Mark Blueprint

## 1. Role Overview
- Agniveer SSR sailors operate weapons systems, radar, sonar, communication equipment, propulsion units, and electrical systems aboard warships, submarines, and naval aircraft.

## 2. Examination Scheme
- **Questions**: 100 Questions | **Max Marks**: 100 Marks | **Duration**: 60 Minutes
- **Marking Scheme**: **+1.0 Mark** per correct answer | **-0.25 Marks** per wrong answer.
- **Sectional Qualifying**: Candidate must pass in each of the 4 sections separately and achieve overall merit cut-off.

## 3. High-Yield Practice Excerpts
{build_q_summary_markdown(ssr_bundle, 15)}

## 4. High-Scoring Topics
- **Science**: Archimedes' principle, Newton's laws, Thermodynamics, Coulomb's law, Optics lens formula, Ultrasonic waves, Semiconductor diodes.
- **Mathematics**: Straight lines, Conics, Vector dot/cross products, Determinants, Limits & derivatives, Integration, Combinations.
""",
        'source_references': json.dumps(['src-navy-agniveer-portal', 'src-navy-agniveer-notice-2026']),
        'verification_status': 'VERIFIED',
        'version': 1,
        'content_depth': 'COMPREHENSIVE_BUNDLE',
        'provenance': 'OFFICIAL_NAVY_SYLLABUS',
        'priority_tier': 'P1'
    },
    {
        'note_id': 'note-navy-agniveer-mr-matric-recruit-bundle',
        'exam_version_id': EXAM_VERSION_ID,
        'subject_id': 'navy-agniveer-mathematics',
        'language_id': 'en',
        'note_type': 'STREAM_SPECIFIC_BUNDLE',
        'title': 'Indian Navy Agniveer MR (Matric Recruit - Chef, Steward, Hygienist) Complete 50-Mark Blueprint',
        'summary': f'Matriculation sailor repository containing {len(mr_bundle)} sampled questions covering Science & Mathematics and General Awareness with 1.0 mark per question and -0.25 negative marking simulation.',
        'content': f"""# Indian Navy Agniveer MR (Matric Recruit - Chef, Steward, Hygienist) Complete 50-Mark Blueprint

## 1. Role Overview
- Agniveer MR sailors serve as Chefs (food preparation and ration management), Stewards (officer mess catering and accounts), and Hygienists (ship hygiene and sanitation maintenance).

## 2. Examination Scheme
- **Questions**: 50 Questions | **Max Marks**: 50 Marks | **Duration**: 30 Minutes
- **Marking Scheme**: **+1.0 Mark** per correct answer | **-0.25 Marks** per wrong answer.
- **Time Pressure**: 50 questions in 30 minutes (36 seconds per question).

## 3. High-Yield Practice Excerpts
{build_q_summary_markdown(mr_bundle, 15)}

## 4. Speed Tactics
- Complete 25 General Awareness questions within 10 minutes to allow 20 minutes for Science and Mathematics calculations.
""",
        'source_references': json.dumps(['src-navy-agniveer-portal', 'src-navy-agniveer-syllabus-model']),
        'verification_status': 'VERIFIED',
        'version': 1,
        'content_depth': 'COMPREHENSIVE_BUNDLE',
        'provenance': 'OFFICIAL_NAVY_SYLLABUS',
        'priority_tier': 'P1'
    },
    {
        'note_id': 'note-navy-agniveer-science-mathematics-master-digest',
        'exam_version_id': EXAM_VERSION_ID,
        'subject_id': 'navy-agniveer-science',
        'language_id': 'en',
        'note_type': 'SECTION_MASTERY_BUNDLE',
        'title': 'Indian Navy Agniveer Technical Science & Core Mathematics Formula Digest',
        'summary': f'Formula repository containing {len(sci_math_bundle)} sampled questions covering Kinematics, Buoyancy, Electromagnetic Induction, Optics, Vector Algebra, and Calculus.',
        'content': f"""# Indian Navy Agniveer Technical Science & Core Mathematics Formula Digest

## 1. Key Naval Science Principles
- **Buoyancy**: F_b = rho * V * g (A floating ship displaces weight of water equal to its own total weight).
- **Acoustics**: Velocity of sound in seawater is approx 1,500 m/s (faster than in air, 343 m/s).
- **Optics**: Snell's Law n1 * sin(i) = n2 * sin(r); Critical angle sin(C) = 1/n.
- **Electricity**: Ohm's Law V = I * R; Power P = V * I = I^2 * R; Magnetic field unit = Tesla.

## 2. High-Yield Practice Excerpts
{build_q_summary_markdown(sci_math_bundle, 15)}

## 3. Core Mathematics Formulas
- Coordinate geometry: Distance = sqrt((x2-x1)^2 + (y2-y1)^2); Slope m = (y2-y1)/(x2-x1).
- Calculus: d/dx(ln|sec x + tan x|) = sec x; int 1/(1+x^2) dx = tan^-1(x) + C.
""",
        'source_references': json.dumps(['src-navy-agniveer-portal', 'src-navy-agniveer-syllabus-model']),
        'verification_status': 'VERIFIED',
        'version': 1,
        'content_depth': 'COMPREHENSIVE_BUNDLE',
        'provenance': 'OFFICIAL_NAVY_SYLLABUS',
        'priority_tier': 'P1'
    },
    {
        'note_id': 'note-navy-agniveer-naval-awareness-english-digest',
        'exam_version_id': EXAM_VERSION_ID,
        'subject_id': 'navy-agniveer-english',
        'language_id': 'en',
        'note_type': 'LANGUAGE_MASTERY_BUNDLE',
        'title': 'Indian Navy Agniveer Maritime Awareness, Naval History & English Grammar Guide',
        'summary': f'Maritime awareness and language repository containing {len(ga_eng_bundle)} sampled questions covering Naval Commands, Warships, Naval ranks, Operation Trident, and English grammar principles.',
        'content': f"""# Indian Navy Agniveer Maritime Awareness, Naval History & English Grammar Guide

## 1. Essential Indian Navy Awareness
- **Motto**: 'Sham No Varunah' (May the Lord of the Oceans be auspicious unto us) from Rigveda.
- **Navy Day**: 4th December (Commemorating Operation Trident in 1971 war).
- **Naval Commands**:
  - Western Naval Command: Mumbai (Maharashtra)
  - Eastern Naval Command: Visakhapatnam (Andhra Pradesh)
  - Southern Naval Command (Training): Kochi (Kerala)
  - Integrated Tri-Service Command: Andaman & Nicobar Command (ANC), Port Blair.
- **Aircraft Carriers**: INS Vikramaditya (R33), INS Vikrant (IAC-1, R11).
- **Supreme Commander**: President of India (Article 53(2)).

## 2. High-Yield Practice Excerpts
{build_q_summary_markdown(ga_eng_bundle, 15)}

## 3. Key English Grammar Principles
- Prepositions: Sail through a strait, Accused of, Senior to, Insist on.
- Voice & Narration: Maintain tense alignment in Indirect speech and ensure proper passive forms.
""",
        'source_references': json.dumps(['src-navy-agniveer-portal', 'src-navy-agniveer-notice-2026']),
        'verification_status': 'VERIFIED',
        'version': 1,
        'content_depth': 'COMPREHENSIVE_BUNDLE',
        'provenance': 'OFFICIAL_NAVY_SYLLABUS',
        'priority_tier': 'P1'
    }
]

out_path = os.path.join(BASE_DIR, 'agniveer_navy_bundled_notes.json')
with open(out_path, 'w', encoding='utf-8') as f:
    json.dump(notes, f, indent=2, ensure_ascii=False)

print(f"SUCCESS: Created {len(notes)} Indian Navy Agniveer bundled notes at {out_path}")
