"""
MP Police Constable & Sub-Inspector Bundled Study Notes and Compilers
Generates 5 master bundled notes sampling 50% representative questions (within 40%-60% requirement)
across all subjects for MP Police.
"""

import json
import os
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = os.path.dirname(__file__)
EXAM_VERSION_ID = 'ver-mp-police-2026'

with open(os.path.join(BASE_DIR, 'mp_police_bank.json'), 'r', encoding='utf-8') as f:
    all_qs = json.load(f)

def get_sample_qs(qs, subject_id, ratio=0.5):
    sub_qs = [q for q in qs if q['subject_id'] == subject_id]
    count = int(len(sub_qs) * ratio)
    return sub_qs[:count]

# 50% sampling from each of the 4 subjects (150 Qs each)
gk_sample = get_sample_qs(all_qs, 'mp-police-general-knowledge', 0.50)
rea_sample = get_sample_qs(all_qs, 'mp-police-reasoning-mental-aptitude', 0.50)
ari_sample = get_sample_qs(all_qs, 'mp-police-simple-arithmetic', 0.50)
sci_sample = get_sample_qs(all_qs, 'mp-police-general-science', 0.50)

grand_bundle = gk_sample + rea_sample + ari_sample + sci_sample

print(f"Sampled Grand MP Police Bundle: {len(grand_bundle)} questions (GK:{len(gk_sample)}, Rea:{len(rea_sample)}, Ari:{len(ari_sample)}, Sci:{len(sci_sample)})")

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
        'note_id': 'note-mp-police-grand-blueprint',
        'exam_version_id': EXAM_VERSION_ID,
        'subject_id': 'mp-police-general-knowledge',
        'language_id': 'hi',
        'note_type': 'ALL_SUBJECTS_SUPER_BUNDLE',
        'title': 'MP Police Constable & Sub-Inspector Comprehensive Examination Blueprint & All-Subject Practice Guide',
        'summary': f'Comprehensive examination master repository containing {len(grand_bundle)} sampled questions across all 4 subjects (General Knowledge, Reasoning, Simple Arithmetic, General Science) representing official MPESB Bhopal Police Constable CBT standards.',
        'content': f"""# MP Police Constable & SI Comprehensive Examination Blueprint & All-Subject Master Guide

## 1. Conducting Authority & Examination Scheme
- **Conducting Agency**: Madhya Pradesh Employees Selection Board (MPESB), Bhopal (मध्यप्रदेश कर्मचारी चयन मण्डल).
- **Official Portals**: esb.mp.gov.in & mppolice.gov.in
- **Test Format**: Online Computer Based Test (CBT) - 100 Objective Multiple Choice Questions.
- **Duration**: 120 Minutes (2 Hours).
- **Total Marks**: 100 Marks (1.0 Mark per question, **No Negative Marking / 0 Negative Marks**).

## 2. Official Subject-Wise Distribution
1. **सामान्य ज्ञान एवं तार्किक ज्ञान (General Knowledge & Logical Reasoning)**: 40 Questions / 40 Marks
2. **बौद्धिक क्षमता एवं मानसिक अभिरुचि (Intellectual Ability & Mental Aptitude)**: 30 Questions / 30 Marks
3. **विज्ञान एवं सरल अंकगणित (Science & Simple Arithmetic)**: 30 Questions / 30 Marks

## 3. All-Subject Master Bundle Sampling (50% Uniform Representation)
This bundled revision dossier contains exactly **{len(grand_bundle)} representative questions** sampled directly from the official MP Police question bank across all 4 curriculum subjects:
- **General Knowledge & MP Special GK**: {len(gk_sample)} Questions
- **Reasoning Ability & Mental Aptitude**: {len(rea_sample)} Questions
- **Simple Arithmetic**: {len(ari_sample)} Questions
- **General Science (Physics, Chemistry, Biology)**: {len(sci_sample)} Questions

## 4. Key Representative Questions Excerpt
{build_q_summary_markdown(grand_bundle, 16)}

## 5. High-Yield Exam Preparation Guidelines
- **MP Special GK**: Thoroughly revise MP rivers (Narmada, Chambal, Betwa, Tapti, Son), National Parks (Kanha, Bandhavgarh, Kuno, Panna), tribal heritage (Bhil Bhagoria, Gond, Baiga), and MP Police administrative setup.
- **Arithmetic & Science**: Focus on class 8-10 MP Board NCERT concepts (percentages, ratios, work & time, mechanics, nutrition, human systems).
- **Zero Negative Marking Strategy**: Attempt all 100 questions; eliminate incorrect options using deductive reasoning.
"""
    },
    {
        'note_id': 'note-mp-police-gk-master',
        'exam_version_id': EXAM_VERSION_ID,
        'subject_id': 'mp-police-general-knowledge',
        'language_id': 'hi',
        'note_type': 'SUBJECT_REVISION_BUNDLE',
        'title': 'MP Police General Knowledge, MP Special GK & Current Affairs Master Revision Dossier',
        'summary': f'Subject master notes covering {len(gk_sample)} sampled questions on MP geography, history, tribal culture, administration, constitution, and current affairs.',
        'content': f"""# MP Police General Knowledge & MP Special GK Master Revision Dossier

## 1. Domain Coverage
- **Geography & Rivers**: Narmada (1077 km in MP, Amarkantak origin), Chambal (Janapav Mhow), Tapti (Multai Betul), Shipra (Ujjain Simhastha Kumbh), Dhuandhar falls at Bhedaghat.
- **National Parks & Wildlife**: Kanha (Barasingha), Bandhavgarh (highest tiger density), Kuno (Project Cheetah 2022), Panna (Diamond mines).
- **Tribal Heritage**: Bhil (largest tribe, Bhagoria festival, Pithora painting), Gond, Baiga, Sahariya, Bharia (Patalkot).
- **Police Administration**: Motto 'Desh Bhakti, Jan Seva', DGP HQ Bhopal, Hawk Force (anti-Naxal unit in Balaghat), Dial 100/112 fleet.
- **Polity & Heritage**: 230 Assembly seats, 29 Lok Sabha seats, 73rd Amendment 1994, UNESCO sites (Khajuraho, Sanchi, Bhimbetka).

## 2. Sampled Practice Bank ({len(gk_sample)} Questions - 50% Sample)
{build_q_summary_markdown(gk_sample, 12)}
"""
    },
    {
        'note_id': 'note-mp-police-reasoning-master',
        'exam_version_id': EXAM_VERSION_ID,
        'subject_id': 'mp-police-reasoning-mental-aptitude',
        'language_id': 'hi',
        'note_type': 'SUBJECT_REVISION_BUNDLE',
        'title': 'MP Police Reasoning Ability & Mental Aptitude Master Revision Dossier',
        'summary': f'Subject master notes covering {len(rea_sample)} sampled questions on coding-decoding, series, analogies, blood relations, direction sense, and police professional judgment.',
        'content': f"""# MP Police Reasoning Ability & Mental Aptitude Master Revision Dossier

## 1. High-Yield Reasoning Topics
- **Coding-Decoding**: Positional shifts (+1, +2, reverse alphabetical rank).
- **Direction & Distance**: Compass turns, Pythagoras theorem (shortest straight line path).
- **Blood Relations**: Family tree relationships, coded relations.
- **Syllogisms & Venn Diagrams**: Set intersections and logical deduction.
- **Mental Aptitude**: Police judgment, public harmony, prompt intervention in law & order crises.

## 2. Sampled Practice Bank ({len(rea_sample)} Questions - 50% Sample)
{build_q_summary_markdown(rea_sample, 12)}
"""
    },
    {
        'note_id': 'note-mp-police-arithmetic-master',
        'exam_version_id': EXAM_VERSION_ID,
        'subject_id': 'mp-police-simple-arithmetic',
        'language_id': 'hi',
        'note_type': 'SUBJECT_REVISION_BUNDLE',
        'title': 'MP Police Simple Arithmetic & Quantitative Aptitude Master Revision Dossier',
        'summary': f'Subject master notes covering {len(ari_sample)} sampled questions on arithmetic, percentages, ratio-proportion, simple & compound interest, work-time, speed-distance, and mensuration.',
        'content': f"""# MP Police Simple Arithmetic & Quantitative Aptitude Master Revision Dossier

## 1. Key Quantitative Formulas & Concepts
- **Percentages & Commercial Math**: Profit % = (Profit / CP) * 100; Discount % = (Discount / MP) * 100.
- **Simple & Compound Interest**: SI = (P * R * T) / 100; Amount = P(1 + R/100)^T.
- **Time and Work**: Combined 1-day work = 1/A + 1/B.
- **Time, Speed and Distance**: Speed = Distance / Time; km/h to m/s conversion (* 5/18).
- **Mensuration**: Rectangle Area = l * b; Circle Area = πr²; Cylinder Volume = πr²h.

## 2. Sampled Practice Bank ({len(ari_sample)} Questions - 50% Sample)
{build_q_summary_markdown(ari_sample, 12)}
"""
    },
    {
        'note_id': 'note-mp-police-science-master',
        'exam_version_id': EXAM_VERSION_ID,
        'subject_id': 'mp-police-general-science',
        'language_id': 'hi',
        'note_type': 'SUBJECT_REVISION_BUNDLE',
        'title': 'MP Police General Science (Physics, Chemistry, Biology) Master Revision Dossier',
        'summary': f'Subject master notes covering {len(sci_sample)} sampled questions on physics mechanics, chemistry salts and reactions, cell biology, human organ systems, and environmental science.',
        'content': f"""# MP Police General Science Master Revision Dossier

## 1. Science Core Curriculum
- **Physics**: Newton's laws of motion, Gravitation (g = 9.8 m/s²), Optics (concave/convex mirrors and lenses), Ohm's law (V = IR), Electric current unit (Ampere).
- **Chemistry**: Baking soda (NaHCO3), Washing soda (Na2CO3·10H2O), Plaster of Paris (CaSO4·1/2H2O), pH scale (neutral = 7), Alloys (Brass = Cu + Zn).
- **Biology**: Cell powerhouse (Mitochondria), Universal blood donor (O group), Blood pressure (120/80 mm Hg), Vitamins and deficiency diseases (Vitamin C - Scurvy, Vitamin K - Clotting).
- **Ecology**: State symbols of MP (Barasingha, Dudhraj, Banyan tree, Mahseer fish).

## 2. Sampled Practice Bank ({len(sci_sample)} Questions - 50% Sample)
{build_q_summary_markdown(sci_sample, 12)}
"""
    }
]

out_path = os.path.join(BASE_DIR, 'mp_police_bundled_notes.json')
with open(out_path, 'w', encoding='utf-8') as f:
    json.dump(notes, f, ensure_ascii=False, indent=2)

print(f"✅ Generated {len(notes)} bundled revision notes for MP Police at {out_path}")
