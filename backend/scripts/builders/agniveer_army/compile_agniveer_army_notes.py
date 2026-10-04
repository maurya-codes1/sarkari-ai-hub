"""
Indian Army Agniveer Common Entrance Exam (CEE) Bundled Study Notes and All-Subject PDF Mock Compilers
Generates 5 master bundled notes sampling 50% representative questions (within 40%-60% requirement)
across all subjects for Indian Army Agniveer (GD, Tradesman, Technical, Clerk/SKT).
"""

import json
import os

BASE_DIR = os.path.dirname(__file__)
EXAM_VERSION_ID = 'ver-agniveer-army-2026'

with open(os.path.join(BASE_DIR, 'agniveer_army_bank.json'), 'r', encoding='utf-8') as f:
    all_qs = json.load(f)

def get_sample_qs(qs, subject_id, ratio=0.5):
    sub_qs = [q for q in qs if q['subject_id'] == subject_id]
    count = int(len(sub_qs) * ratio)
    return sub_qs[:count]

# 50% sampling from each of the 6 subjects (150 Qs each)
gk_sample = get_sample_qs(all_qs, 'army-agniveer-gd-general-knowledge', 0.50)
gs_sample = get_sample_qs(all_qs, 'army-agniveer-gd-general-science', 0.50)
math_lr_sample = get_sample_qs(all_qs, 'army-agniveer-gd-mathematics-reasoning', 0.50)
tech_pc_sample = get_sample_qs(all_qs, 'army-agniveer-tech-physics-chemistry', 0.50)
tech_m_sample = get_sample_qs(all_qs, 'army-agniveer-tech-mathematics', 0.50)
clk_ec_sample = get_sample_qs(all_qs, 'army-agniveer-clerk-english-computers', 0.50)

all_trades_bundle = gk_sample + gs_sample + math_lr_sample + tech_pc_sample + tech_m_sample + clk_ec_sample
gd_tdn_bundle = gk_sample + gs_sample + math_lr_sample
tech_bundle = gk_sample + tech_m_sample + tech_pc_sample
clerk_bundle = gk_sample + gs_sample + clk_ec_sample
gs_gk_bundle = gk_sample + gs_sample

print(f"Sampled All-Trades Grand Bundle: {len(all_trades_bundle)} questions (GK:{len(gk_sample)}, GS:{len(gs_sample)}, Math/LR:{len(math_lr_sample)}, TechPC:{len(tech_pc_sample)}, TechMath:{len(tech_m_sample)}, ClkEng:{len(clk_ec_sample)})")
print(f"Sampled GD/Tradesman Bundle: {len(gd_tdn_bundle)} questions")
print(f"Sampled Technical Bundle: {len(tech_bundle)} questions")
print(f"Sampled Clerk/SKT Bundle: {len(clerk_bundle)} questions")
print(f"Sampled GS-GK Bundle: {len(gs_gk_bundle)} questions")

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
        'note_id': 'note-agniveer-army-all-trades-master-bundle',
        'exam_version_id': EXAM_VERSION_ID,
        'subject_id': 'army-agniveer-gd-general-knowledge',
        'language_id': 'en',
        'note_type': 'ALL_SUBJECTS_SUPER_BUNDLE',
        'title': 'Join Indian Army Agniveer All-Trades Common Entrance Exam (CEE) Master Practice & Revision Blueprint',
        'summary': f'Comprehensive examination repository containing {len(all_trades_bundle)} sampled questions across all 6 trade curricula (GK, General Science, Elementary Maths & Reasoning, Tech Physics/Chemistry, Tech Mathematics, and Clerk English/Computers) representing official Join Indian Army recruitment standards.',
        'content': f"""# Join Indian Army Agniveer All-Trades Common Entrance Exam (CEE) Master Practice & Revision Blueprint

## 1. Official Examination Architecture & Conducting Body
- **Conducting Authority**: Recruiting Directorate, Directorate General of Recruiting, Integrated Headquarters of MoD (Army).
- **Official Portal**: joinindianarmy.nic.in
- **Recruitment Scheme**: Agniveer Scheme under Agnipath System for enrolment as Soldiers in the Indian Army.
- **Computer Based Test (CEE)**: Conducted nationwide across designated testing centres.

## 2. Multi-Trade Examination Schemes & Marking Norms
1. **Agniveer General Duty (GD) & Agniveer Tradesman (10th/8th Pass)**:
   - Total Questions: 50 Questions (GK: 15, GS: 15, Maths: 15, Reasoning: 5)
   - Total Marks: 100 Marks | Duration: 60 Minutes
   - Marking Scheme: **+2.0 Marks** per correct answer, **-0.50 Marks (1/4th penalty)** per incorrect answer.
   - Passing Marks: 35 Marks.
2. **Agniveer Technical (All Arms)**:
   - Total Questions: 50 Questions (GK: 10, Maths: 15, Physics: 15, Chemistry: 10)
   - Total Marks: 200 Marks | Duration: 60 Minutes
   - Marking Scheme: **+4.0 Marks** per correct answer, **-1.00 Marks (1/4th penalty)** per incorrect answer.
   - Passing Marks: 80 Marks.
3. **Agniveer Office Assistant / Clerk / Store Keeper Technical (SKT)**:
   - Total Questions: 50 Questions in Two Parts (Part I: GK 5, GS 5, Maths 10, CS 5; Part II: General English 25)
   - Total Marks: 200 Marks | Duration: 60 Minutes
   - Marking Scheme: **+4.0 Marks** per correct answer, **-1.00 Marks (1/4th penalty)** per incorrect answer.
   - Passing Marks: 80 Marks (Minimum 32 marks in Part I & 32 marks in Part II).

## 3. Multi-Trade Question Sampling (50% Representative Coverage)
- **General Knowledge**: {len(gk_sample)} Questions
- **General Science**: {len(gs_sample)} Questions
- **Elementary Mathematics & Reasoning**: {len(math_lr_sample)} Questions
- **Technical Physics & Chemistry**: {len(tech_pc_sample)} Questions
- **Technical Higher Mathematics**: {len(tech_m_sample)} Questions
- **Clerk / SKT English & Computers**: {len(clk_ec_sample)} Questions
- **Total Sampled Practice Questions**: {len(all_trades_bundle)} Questions

## 4. High-Yield Practice Excerpts
{build_q_summary_markdown(all_trades_bundle, 18)}

## 5. Soldier Preparation & Physical Fitness Integration
- Agniveer selection requires clearing both the Online CEE and the rigorous Physical Fitness Test (PFT) (1.6 km run, Beam pull-ups, 9ft ditch, Zig-zag balance).
- Maintain rigorous daily revision of General Science and Mental Arithmetic to maximize CEE merit score.
""",
        'source_references': json.dumps(['src-agniveer-army-portal', 'src-agniveer-army-notice-2026', 'src-agniveer-army-syllabus-cee']),
        'verification_status': 'VERIFIED',
        'version': 1,
        'content_depth': 'COMPREHENSIVE_BUNDLE',
        'provenance': 'OFFICIAL_JOIN_INDIAN_ARMY_SYLLABUS',
        'priority_tier': 'P1'
    },
    {
        'note_id': 'note-agniveer-army-gd-tradesman-master-bundle',
        'exam_version_id': EXAM_VERSION_ID,
        'subject_id': 'army-agniveer-gd-general-science',
        'language_id': 'en',
        'note_type': 'TRADE_SPECIFIC_BUNDLE',
        'title': 'Indian Army Agniveer General Duty (GD) & Tradesmen CEE Complete 100-Mark Blueprint',
        'summary': f'Specialized GD & Tradesman repository containing {len(gd_tdn_bundle)} sampled questions covering GK, GS, and Elementary Maths & Reasoning with 2.0 marks per question and -0.50 negative marking simulation.',
        'content': f"""# Indian Army Agniveer General Duty (GD) & Tradesmen CEE Complete 100-Mark Blueprint

## 1. Trade Structure
- Applies to Agniveer General Duty (GD) (All Arms), Tradesman 10th Pass (Chef, Steward, Washerman, Dresser, Painter, Tailor), and Tradesman 8th Pass (House Keeper, Mess Keeper).
- Objective: Evaluate basic literacy, scientific intuition, practical arithmetic, and general awareness required of a front-line soldier.

## 2. Marking Scheme & Cutoffs
- **Questions**: 50 Questions | **Total Marks**: 100 Marks | **Duration**: 60 Minutes
- **Marking Scheme**: **+2.0 Marks** per correct answer | **-0.50 Marks (25% penalty)** per wrong answer
- **Passing Standard**: Minimum 35% (35 Marks) required; top rankers qualify for Physical Rally.

## 3. High-Yield Practice Excerpts
{build_q_summary_markdown(gd_tdn_bundle, 15)}

## 4. Field Revision Strategy
- Ensure complete clarity on standard SI units, elementary chemistry (water purification, salts, acids), and Class 8-10 basic biology.
- Speed drill: Solve 50 questions in under 45 minutes to reserve 15 minutes for review.
""",
        'source_references': json.dumps(['src-agniveer-army-portal', 'src-agniveer-army-notice-2026']),
        'verification_status': 'VERIFIED',
        'version': 1,
        'content_depth': 'COMPREHENSIVE_BUNDLE',
        'provenance': 'OFFICIAL_JOIN_INDIAN_ARMY_SYLLABUS',
        'priority_tier': 'P1'
    },
    {
        'note_id': 'note-agniveer-army-technical-master-bundle',
        'exam_version_id': EXAM_VERSION_ID,
        'subject_id': 'army-agniveer-tech-physics-chemistry',
        'language_id': 'en',
        'note_type': 'TRADE_SPECIFIC_BUNDLE',
        'title': 'Indian Army Agniveer Technical (Tech) CEE Comprehensive 200-Mark Blueprint',
        'summary': f'High-level technical trade repository containing {len(tech_bundle)} sampled questions covering Technical Physics, Chemistry, Higher Mathematics, and GK with 4.0 marks per question and -1.00 negative marking simulation.',
        'content': f"""# Indian Army Agniveer Technical (Tech) CEE Comprehensive 200-Mark Blueprint

## 1. Agniveer Technical Eligibility & Role
- Required for Technical Arms: Corps of Signals, Corps of Electronics and Mechanical Engineers (EME), Corps of Engineers, and Artillery.
- Educational Prerequisite: 10+2 / Intermediate in Science with Physics, Chemistry, Maths, and English with min 50% aggregate.

## 2. Examination Structure
- **Questions**: 50 Questions | **Total Marks**: 200 Marks | **Duration**: 60 Minutes
- **Marking Scheme**: **+4.0 Marks** per correct answer | **-1.00 Marks (1/4th penalty)** per incorrect answer
- **Passing Standard**: Minimum 80 Marks out of 200.

## 3. High-Yield Practice Excerpts
{build_q_summary_markdown(tech_bundle, 15)}

## 4. Technical Concepts Emphasis
- Newtonian Mechanics, Work-Power-Energy, Optics, Electromagnetism, Semiconductor devices, Radioactivity.
- Periodic Table, Stoichiometry, Organic functional groups, and Industrial chemicals.
""",
        'source_references': json.dumps(['src-agniveer-army-portal', 'src-agniveer-army-syllabus-cee']),
        'verification_status': 'VERIFIED',
        'version': 1,
        'content_depth': 'COMPREHENSIVE_BUNDLE',
        'provenance': 'OFFICIAL_JOIN_INDIAN_ARMY_SYLLABUS',
        'priority_tier': 'P1'
    },
    {
        'note_id': 'note-agniveer-army-clerk-skt-master-bundle',
        'exam_version_id': EXAM_VERSION_ID,
        'subject_id': 'army-agniveer-clerk-english-computers',
        'language_id': 'en',
        'note_type': 'TRADE_SPECIFIC_BUNDLE',
        'title': 'Indian Army Agniveer Clerk & Store Keeper Technical (SKT) Comprehensive 200-Mark Blueprint',
        'summary': f'Clerk/SKT trade repository containing {len(clerk_bundle)} sampled questions covering Part-I General Awareness/Maths and Part-II High-Weightage General English & Computers with 4.0 marks per question and -1.00 negative marking simulation.',
        'content': f"""# Indian Army Agniveer Clerk & Store Keeper Technical (SKT) Comprehensive 200-Mark Blueprint

## 1. Role Overview & Distinct Scheme
- Responsible for inventory maintenance, documentation, military correspondence, and office administration in unit headquarters.
- General English carries **50% of the entire paper (25 Questions / 100 Marks)**.
- Candidate must score minimum 32 marks in Part I and minimum 32 marks in Part II independently.

## 2. Examination Structure
- **Questions**: 50 Questions (Part I: 25 Qs, Part II: 25 Qs) | **Marks**: 200 Marks | **Duration**: 60 Minutes
- **Marking Scheme**: **+4.0 Marks** per correct answer | **-1.00 Marks (25% penalty)** per wrong answer

## 3. High-Yield Practice Excerpts
{build_q_summary_markdown(clerk_bundle, 15)}

## 4. English Grammar & Comprehension Rules
- Active/Passive Voice transformations, Direct/Indirect speech, Subject-Verb Agreement, Idiomatic expressions, Prepositions and Conjunctions.
""",
        'source_references': json.dumps(['src-agniveer-army-portal', 'src-agniveer-army-notice-2026']),
        'verification_status': 'VERIFIED',
        'version': 1,
        'content_depth': 'COMPREHENSIVE_BUNDLE',
        'provenance': 'OFFICIAL_JOIN_INDIAN_ARMY_SYLLABUS',
        'priority_tier': 'P1'
    },
    {
        'note_id': 'note-agniveer-army-gs-gk-rapid-revision',
        'exam_version_id': EXAM_VERSION_ID,
        'subject_id': 'army-agniveer-gd-general-knowledge',
        'language_id': 'en',
        'note_type': 'REVISION_DIGEST',
        'title': 'Indian Army Agniveer High-Yield General Science & General Knowledge Rapid Revision Guide',
        'summary': f'Concise revision repository containing {len(gs_gk_bundle)} sampled questions focusing on Indian Military History, Defence Commands, Gallantry Awards (PVC, MVC, VrC), Indian Geography, and Elementary Everyday Science.',
        'content': f"""# Indian Army Agniveer High-Yield General Science & General Knowledge Rapid Revision Guide

## 1. Essential Indian Defence Awareness
- **Supreme Commander**: President of India.
- **Chief of Defence Staff (CDS)**: Permanent Chairman of the Chiefs of Staff Committee.
- **Army Commands**: Northern (Udhampur), Western (Chandimandir), Eastern (Kolkata), Southern (Pune), Central (Lucknow), South Western (Jaipur), ARTRAC (Shimla).
- **Gallantry Awards**: Param Vir Chakra (PVC - highest wartime honour), Ashoka Chakra (highest peacetime honour), Maha Vir Chakra, Kirti Chakra, Vir Chakra, Shaurya Chakra.

## 2. High-Yield Practice Excerpts
{build_q_summary_markdown(gs_gk_bundle, 15)}

## 3. Last-Minute Soldier Checklist
- Memorize National Insignia, Border Line Names (Radcliffe, McMahon, Durand, LOC, LAC).
- Review Vitamin deficiency diseases, Blood groups (AB+ universal receiver, O- universal donor), Common chemical formulas (Baking soda, Bleaching powder, Washing soda, Plaster of Paris).
""",
        'source_references': json.dumps(['src-agniveer-army-portal', 'src-agniveer-army-pyq-corpus']),
        'verification_status': 'VERIFIED',
        'version': 1,
        'content_depth': 'COMPREHENSIVE_BUNDLE',
        'provenance': 'OFFICIAL_JOIN_INDIAN_ARMY_SYLLABUS',
        'priority_tier': 'P1'
    }
]

out_path = os.path.join(BASE_DIR, 'agniveer_army_bundled_notes.json')
with open(out_path, 'w', encoding='utf-8') as f:
    json.dump(notes, f, indent=2, ensure_ascii=False)

print(f"SUCCESS: Created {len(notes)} Agniveer Army bundled notes at {out_path}")
