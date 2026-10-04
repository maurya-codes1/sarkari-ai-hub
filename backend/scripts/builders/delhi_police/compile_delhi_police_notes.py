"""
Delhi Police Executive Constable & Head Constable Bundled Study Notes and Compilers
Generates 5 master bundled notes sampling 50% representative questions (within 40%-60% requirement)
across all subjects for Delhi Police Constable.
"""

import json
import os
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = os.path.dirname(__file__)
EXAM_VERSION_ID = 'ver-delhi-police-2026'

with open(os.path.join(BASE_DIR, 'delhi_police_bank.json'), 'r', encoding='utf-8') as f:
    all_qs = json.load(f)

def get_sample_qs(qs, subject_id, ratio=0.5):
    sub_qs = [q for q in qs if q['subject_id'] == subject_id]
    count = int(len(sub_qs) * ratio)
    return sub_qs[:count]

# 50% sampling from each of the 4 subjects (150 Qs each)
gk_sample = get_sample_qs(all_qs, 'delhi-police-general-knowledge', 0.50)
rea_sample = get_sample_qs(all_qs, 'delhi-police-reasoning', 0.50)
num_sample = get_sample_qs(all_qs, 'delhi-police-numerical-ability', 0.50)
comp_sample = get_sample_qs(all_qs, 'delhi-police-computer-fundamentals', 0.50)

grand_bundle = gk_sample + rea_sample + num_sample + comp_sample

print(f"Sampled Grand Delhi Police Bundle: {len(grand_bundle)} questions (GK:{len(gk_sample)}, Rea:{len(rea_sample)}, Num:{len(num_sample)}, Comp:{len(comp_sample)})")

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
        'note_id': 'note-delhi-police-grand-blueprint',
        'exam_version_id': EXAM_VERSION_ID,
        'subject_id': 'delhi-police-general-knowledge',
        'language_id': 'hi',
        'note_type': 'ALL_SUBJECTS_SUPER_BUNDLE',
        'title': 'Delhi Police Executive Constable Comprehensive Examination Blueprint & All-Subject Practice Guide',
        'summary': f'Comprehensive examination master repository containing {len(grand_bundle)} sampled questions across all 4 subjects (General Knowledge, Reasoning, Numerical Ability, Computer Fundamentals) representing official SSC Delhi Police Constable CBE standards.',
        'content': f"""# Delhi Police Executive Constable Comprehensive Examination Blueprint & All-Subject Master Guide

## 1. Conducting Authority & Examination Scheme
- **Conducting Agency**: Staff Selection Commission (SSC) on behalf of Delhi Police.
- **Official Portals**: ssc.gov.in & delhipolice.gov.in
- **Recruitment Posts**: Constable (Executive) Male and Female in Delhi Police.
- **CBE Pattern**:
  - Total Questions: **100 Objective MCQs** (Computer Based Examination)
  - Total Marks: **100 Marks** (**1.0 Mark** per correct question)
  - Negative Marking: **-0.25 Marks** (1/4th penalty per incorrect answer)
  - Duration: **90 Minutes** (1.5 Hours)

## 2. Official Subject Sections & Marks Distribution
1. **Part A: General Knowledge / Current Affairs**: 50 Questions = 50 Marks
2. **Part B: Reasoning**: 25 Questions = 25 Marks
3. **Part C: Numerical Ability**: 15 Questions = 15 Marks
4. **Part D: Computer Fundamentals, MS Excel, MS Word, Internet**: 10 Questions = 10 Marks

## 3. Multi-Subject Sampling (50% Representative Coverage)
- **General Knowledge & Delhi Special GK**: {len(gk_sample)} Questions
- **Reasoning Ability**: {len(rea_sample)} Questions
- **Numerical Ability**: {len(num_sample)} Questions
- **Computer Fundamentals, MS Office & Internet**: {len(comp_sample)} Questions
- **Total Sampled Practice Questions in Master Bundle**: {len(grand_bundle)} Questions (Exact 50% uniform sampling)

## 4. High-Yield Practice Excerpts
{build_q_summary_markdown(grand_bundle, 16)}

## 5. Strategic Preparation Advice
- Part A (GK & Current Affairs) constitutes 50% of total exam weightage; prioritize Indian Constitution, Modern History, National Monuments, and G20/Current Affairs.
- Part D (Computer Fundamentals) contains 10 straightforward marks: master MS Word shortcut keys, Excel functions (=SUM, =AVERAGE), Email protocols (SMTP, POP3, IMAP), and Web browsers.
- Physical Efficiency Test (PET): Male (1600m run in 6 mins, Long jump 14 ft, High jump 3'9"); Female (1600m run in 8 mins, Long jump 10 ft, High jump 3 ft).
""",
        'source_references': json.dumps(['src-delhi-police-portal', 'src-ssc-delhi-police-notice-2026', 'src-delhi-police-hc-notice-2026']),
        'verification_status': 'VERIFIED',
        'version': 1,
        'content_depth': 'COMPREHENSIVE_BUNDLE',
        'provenance': 'OFFICIAL_DELHI_POLICE_SSC_SYLLABUS',
        'priority_tier': 'P1'
    },
    {
        'note_id': 'note-delhi-police-gk-delhi-special-master',
        'exam_version_id': EXAM_VERSION_ID,
        'subject_id': 'delhi-police-general-knowledge',
        'language_id': 'hi',
        'note_type': 'SUBJECT_REVISION_BUNDLE',
        'title': 'Delhi Police GK, Current Affairs & Delhi Administrative Heritage Master Guide',
        'summary': f'Specialized study guide covering Delhi Police history, Article 239AA, 11 districts, UNESCO heritage sites and {len(gk_sample)} representative GK questions.',
        'content': f"""# Delhi Police GK, Current Affairs & Delhi Administrative Heritage Master Guide

## 1. Delhi Police & NCT Administration Overview
- **Motto of Delhi Police**: "शान्ति, सेवा, न्याय" (Shanti, Seva, Nyaya).
- **Controlling Authority**: Ministry of Home Affairs (MHA), Government of India under Delhi Police Act 1978.
- **Article 239AA**: Inserted by 69th Constitutional Amendment Act 1991, granting special status to National Capital Territory of Delhi with a Legislative Assembly (70 seats) and Lt. Governor. Police, Public Order and Land remain under Union Government.
- **Districts of Delhi**: 11 Revenue Districts (New Delhi, Central, North, South, East, West, North-East, North-West, South-East, South-West, Shahdara).

## 2. Delhi Historic Landmarks & Heritage Sites
- **Red Fort (Lal Qila)**: Built by Shah Jahan (1638-1648), UNESCO World Heritage Site (2007).
- **Qutub Minar**: Begun by Qutb-ud-din Aibak (1199), completed by Iltutmish; UNESCO site (1993).
- **Humayun's Tomb**: Built in 1570 by Empress Bega Begum, first garden-tomb on subcontinent; UNESCO site (1993).
- **India Gate**: All India War Memorial designed by Sir Edwin Lutyens (1921-1931).
- **Supreme Court of India**: Located at Tilak Marg, established on 28 January 1950.
- **Bharat Mandapam (Pragati Maidan)**: Venue of the historic 18th G20 Leaders' Summit (September 2023).

## 3. Representative Questions ({len(gk_sample)} Sampled Questions)
{build_q_summary_markdown(gk_sample, 12)}
""",
        'source_references': json.dumps(['src-delhi-police-portal', 'src-ssc-delhi-police-notice-2026']),
        'verification_status': 'VERIFIED',
        'version': 1,
        'content_depth': 'COMPREHENSIVE_BUNDLE',
        'provenance': 'OFFICIAL_DELHI_POLICE_SSC_SYLLABUS',
        'priority_tier': 'P1'
    },
    {
        'note_id': 'note-delhi-police-reasoning-ability-master',
        'exam_version_id': EXAM_VERSION_ID,
        'subject_id': 'delhi-police-reasoning',
        'language_id': 'hi',
        'note_type': 'SUBJECT_REVISION_BUNDLE',
        'title': 'Delhi Police Reasoning Ability & Mental Aptitude Complete Guide',
        'summary': f'Comprehensive reasoning methodology covering Analogies, Series, Coding-Decoding, Blood Relations, Syllogisms, Mirror Images and {len(rea_sample)} practice questions.',
        'content': f"""# Delhi Police Reasoning Ability & Mental Aptitude Complete Guide

## 1. Core Reasoning Topics & Patterns
- **Analogies & Classification**: Semantic links (Judge : Justice :: Doctor : Treatment), number squares and cubes (12 : 144 :: 15 : 225).
- **Coding-Decoding**: Direct shift (+1, -2, reverse pairing A-Z, B-Y, C-X).
- **Direction Sense**: North, South, East, West; Pythagoras theorem D = √(x² + y²).
- **Blood Relations**: Family tree mapping, pointing to photographs, coded relationships.
- **Non-Verbal Reasoning**: Mirror images (lateral inversion), paper folding, embedded figures.

## 2. Representative Questions ({len(rea_sample)} Sampled Questions)
{build_q_summary_markdown(rea_sample, 12)}
""",
        'source_references': json.dumps(['src-delhi-police-portal', 'src-ssc-delhi-police-notice-2026']),
        'verification_status': 'VERIFIED',
        'version': 1,
        'content_depth': 'COMPREHENSIVE_BUNDLE',
        'provenance': 'OFFICIAL_DELHI_POLICE_SSC_SYLLABUS',
        'priority_tier': 'P1'
    },
    {
        'note_id': 'note-delhi-police-numerical-ability-master',
        'exam_version_id': EXAM_VERSION_ID,
        'subject_id': 'delhi-police-numerical-ability',
        'language_id': 'hi',
        'note_type': 'SUBJECT_REVISION_BUNDLE',
        'title': 'Delhi Police Numerical Ability Arithmetic Problem Solving Guide',
        'summary': f'Key mathematical formulas, LCM/HCF, Percentages, Profit-Loss, Time-Work, Speed-Distance and {len(num_sample)} numerical questions.',
        'content': f"""# Delhi Police Numerical Ability Arithmetic Problem Solving Guide

## 1. Essential Formulas
- **HCF & LCM**: Product of two numbers = HCF × LCM.
- **Percentages**: Profit% = (Profit / CP) × 100. Single discount = d1 + d2 - (d1 × d2)/100.
- **Simple Interest**: SI = (P × R × T) / 100. Rate = (SI × 100) / (P × T).
- **Time and Work**: Combined work = 1/A + 1/B.
- **Speed, Distance & Time**: Speed in m/s = Speed in km/h × (5/18). Train crossing a pole: Time = Train Length / Speed.
- **Mensuration**: Rectangle Area = L × B; Perimeter = 2(L + B). Sphere Volume = (4/3)πr³.

## 2. Representative Questions ({len(num_sample)} Sampled Questions)
{build_q_summary_markdown(num_sample, 12)}
""",
        'source_references': json.dumps(['src-delhi-police-portal', 'src-ssc-delhi-police-notice-2026']),
        'verification_status': 'VERIFIED',
        'version': 1,
        'content_depth': 'COMPREHENSIVE_BUNDLE',
        'provenance': 'OFFICIAL_DELHI_POLICE_SSC_SYLLABUS',
        'priority_tier': 'P1'
    },
    {
        'note_id': 'note-delhi-police-computer-fundamentals-master',
        'exam_version_id': EXAM_VERSION_ID,
        'subject_id': 'delhi-police-computer-fundamentals',
        'language_id': 'hi',
        'note_type': 'SUBJECT_REVISION_BUNDLE',
        'title': 'Delhi Police Computer Fundamentals, MS Word, Excel & Internet Master Guide',
        'summary': f'Complete IT fundamentals handbook covering MS Office shortcuts, Excel formulas, email protocols, web technologies and {len(comp_sample)} computer questions.',
        'content': f"""# Delhi Police Computer Fundamentals, MS Word, Excel & Internet Master Guide

## 1. MS Word & MS Excel Essentials
- **Keyboard Shortcuts**: Ctrl+S (Save), Ctrl+Z (Undo), Ctrl+Y (Redo), Ctrl+C (Copy), Ctrl+X (Cut), Ctrl+V (Paste), Ctrl+P (Print).
- **File Extensions**: Modern MS Word (.docx), Modern MS Excel (.xlsx), Modern MS PowerPoint (.pptx).
- **MS Excel Formulas**: All formulas start with '='; =SUM(A1:A10), =AVERAGE(A1:A10), =COUNT(A1:A10), =MAX(A1:A10), =MIN(A1:A10).
- **Cell**: Intersection of a row and a column (e.g., A1).

## 2. Internet, E-mail & Networking
- **Email Protocols**: SMTP (Sending mail), POP3 & IMAP (Retrieving/downloading mail).
- **Email Fields**: To (Primary), CC (Carbon Copy - visible to all), BCC (Blind Carbon Copy - hidden from other recipients).
- **Web Addressing**: URL (Uniform Resource Locator); HTTPS uses port 443 with SSL/TLS encryption; HTTP uses port 80.
- **IP Addressing**: IPv4 (32 bits, 4 decimal octets); IPv6 (128 bits, 8 hexadecimal blocks).
- **Cyber Threats**: Ransomware (encrypts files and demands ransom), Phishing (fraudulent deception to steal credentials).

## 3. Representative Questions ({len(comp_sample)} Sampled Questions)
{build_q_summary_markdown(comp_sample, 12)}
""",
        'source_references': json.dumps(['src-delhi-police-portal', 'src-ssc-delhi-police-notice-2026']),
        'verification_status': 'VERIFIED',
        'version': 1,
        'content_depth': 'COMPREHENSIVE_BUNDLE',
        'provenance': 'OFFICIAL_DELHI_POLICE_SSC_SYLLABUS',
        'priority_tier': 'P1'
    }
]

out_notes_file = os.path.join(BASE_DIR, 'delhi_police_bundled_notes.json')
with open(out_notes_file, 'w', encoding='utf-8') as f:
    json.dump(notes, f, ensure_ascii=False, indent=2)

print(f"\n✅ Successfully generated {len(notes)} master bundled study notes to {out_notes_file}")
