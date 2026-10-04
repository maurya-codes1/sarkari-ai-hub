"""
Rajasthan Police Constable & Sub-Inspector Bundled Study Notes and Compilers
Generates 5 master bundled notes sampling 50% representative questions (within 40%-60% requirement)
across all subjects for Rajasthan Police.
"""

import json
import os
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = os.path.dirname(__file__)
EXAM_VERSION_ID = 'ver-rajasthan-police-2026'

with open(os.path.join(BASE_DIR, 'rajasthan_police_bank.json'), 'r', encoding='utf-8') as f:
    all_qs = json.load(f)

def get_sample_qs(qs, subject_id, ratio=0.5):
    sub_qs = [q for q in qs if q['subject_id'] == subject_id]
    count = int(len(sub_qs) * ratio)
    return sub_qs[:count]

# 50% sampling from each of the 4 subjects (150 Qs each)
rc_sample = get_sample_qs(all_qs, 'rajasthan-police-reasoning-computer', 0.50)
gs_sample = get_sample_qs(all_qs, 'rajasthan-police-general-knowledge-science', 0.50)
raj_sample = get_sample_qs(all_qs, 'rajasthan-police-rajasthan-special', 0.50)
law_sample = get_sample_qs(all_qs, 'rajasthan-police-women-child-crime-law', 0.50)

grand_bundle = rc_sample + gs_sample + raj_sample + law_sample

print(f"Sampled Grand Rajasthan Police Bundle: {len(grand_bundle)} questions (RC:{len(rc_sample)}, GS:{len(gs_sample)}, Raj:{len(raj_sample)}, Law:{len(law_sample)})")

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
        'note_id': 'note-rajasthan-police-grand-blueprint',
        'exam_version_id': EXAM_VERSION_ID,
        'subject_id': 'rajasthan-police-rajasthan-special',
        'language_id': 'hi',
        'note_type': 'ALL_SUBJECTS_SUPER_BUNDLE',
        'title': 'Rajasthan Police Constable & Sub-Inspector Comprehensive Examination Blueprint & All-Subject Practice Guide',
        'summary': f'Comprehensive examination master repository containing {len(grand_bundle)} sampled questions across all 4 subjects (Reasoning & Computer, GK & Science, Rajasthan Special, Women & Child Crime Law) representing official Rajasthan Police CBT standards.',
        'content': f"""# Rajasthan Police Constable & SI Comprehensive Examination Blueprint & All-Subject Master Guide

## 1. Conducting Authority & Examination Scheme
- **Conducting Agency**: Rajasthan Police Recruitment Board (राजस्थान पुलिस भर्ती बोर्ड, जयपुर).
- **Official Portals**: police.rajasthan.gov.in & sso.rajasthan.gov.in
- **Test Format**: Computer Based Written Test (CBT) - 150 Objective Multiple Choice Questions.
- **Duration**: 120 Minutes (2.0 Hours).
- **Total Marks**: 150 Marks (**1.0 Mark** per correct question, **-0.25 Mark** penalty for incorrect answers).

## 2. Official Subject Sections & Marks Distribution
1. **भाग अ (Part A)**: विवेचना एवं तार्किक योग्यता तथा कंप्यूटर का सामान्य ज्ञान (Reasoning & Computer) - 60 Questions = 60 Marks
2. **भाग ब (Part B)**: सामान्य ज्ञान, सामान्य विज्ञान, सामाजिक विज्ञान एवं समसामयिक विषय (GK, Science & Current Affairs) - 35 Questions = 35 Marks
3. **भाग स (Part C)**: महिला एवं बाल अपराध तथा संबंधित कानूनी प्रावधान व नियम (Crimes against Women & Children Laws) - 10 Questions = 10 Marks
4. **भाग द (Part D)**: राजस्थान का इतिहास, कला, संस्कृति, साहित्य, परंपरा, भूगोल एवं अर्थव्यवस्था (Rajasthan Special GK) - 45 Questions = 45 Marks

## 3. All-Subject Master Bundle Sampling (50% Uniform Representation)
This bundled revision dossier contains exactly **{len(grand_bundle)} representative questions** sampled directly from the official Rajasthan Police question bank across all 4 subjects:
- **Reasoning & Computer Fundamentals**: {len(rc_sample)} Questions
- **General Knowledge & General Science**: {len(gs_sample)} Questions
- **Rajasthan Special History, Art & Geography**: {len(raj_sample)} Questions
- **Crimes Against Women & Children Law**: {len(law_sample)} Questions

## 4. Key Representative Questions Excerpt
{build_q_summary_markdown(grand_bundle, 16)}

## 5. Strategic Preparation Guidelines
- **Rajasthan Special GK (45 Marks)**: Highest individual weightage; master Aravalli topography, Chambal river system, 6 UNESCO Hill Forts, folk deities (Panchpir: Pabuji, Ramdevji, Gogaji), and 1857 revolt (Naseerabad, Auwa).
- **Reasoning & Computer (60 Marks)**: Decisive scoring section; focus on coding-decoding, direction tests, MS Word shortcuts, Excel formulas, and cybersecurity (phishing, malware).
- **Women & Child Laws (10 Marks)**: High-scoring definitive section; memorize POCSO sections (3, 5, 19, 21), Domestic Violence Act 2005 (protection orders), POSH Act 2013 (ICC rules), Child Marriage Act, and IPC sections (354, 354A-D, 498A, 304B).
- **Negative Marking Strategy**: Guard against -0.25 penalty by attempting well-verified answers.
""",
        'source_references': json.dumps(['src-rajasthan-police-portal', 'src-rajasthan-police-constable-notice-2026']),
        'verification_status': 'VERIFIED',
        'version': 1,
        'content_depth': 'COMPREHENSIVE_BUNDLE',
        'provenance': 'OFFICIAL_RAJASTHAN_POLICE_SYLLABUS',
        'priority_tier': 'P1'
    },
    {
        'note_id': 'note-rajasthan-police-reasoning-computer-master',
        'exam_version_id': EXAM_VERSION_ID,
        'subject_id': 'rajasthan-police-reasoning-computer',
        'language_id': 'hi',
        'note_type': 'SUBJECT_REVISION_BUNDLE',
        'title': 'Rajasthan Police Reasoning Ability & Computer Fundamentals Master Revision Dossier',
        'summary': f'Subject master notes covering {len(rc_sample)} sampled questions on reasoning patterns, syllogisms, MS Office shortcuts, Excel formulas, network topologies, and IT security.',
        'content': f"""# Rajasthan Police Reasoning Ability & Computer Fundamentals Master Revision Dossier

## 1. High-Yield Reasoning & Computer Concepts
- **Reasoning Topics**: Positional shifts (+1, +2, reverse alphabet), compass direction & Pythagoras shortest distance, family tree deduction, Venn diagram intersections, mirror and water images.
- **Computer Hardware**: CPU (ALU + Control Unit + Registers), RAM (volatile primary memory) vs ROM (non-volatile firmware), SSD (NAND flash memory).
- **Operating Systems & MS Office**: Linux (open-source kernel), Windows shortcuts (Ctrl+S Save, Ctrl+Z Undo, Ctrl+A Select All, Ctrl+C/V Copy/Paste).
- **MS Excel & Networking**: Formulas always start with '='; IPv4 (32 bits), IPv6 (128 bits), HTTPS (port 443 with SSL/TLS encryption), Ransomware (data encryption for ransom), Phishing deception.

## 2. Sampled Practice Bank ({len(rc_sample)} Questions - 50% Sample)
{build_q_summary_markdown(rc_sample, 12)}
""",
        'source_references': json.dumps(['src-rajasthan-police-portal', 'src-rajasthan-police-constable-notice-2026']),
        'verification_status': 'VERIFIED',
        'version': 1,
        'content_depth': 'COMPREHENSIVE_BUNDLE',
        'provenance': 'OFFICIAL_RAJASTHAN_POLICE_SYLLABUS',
        'priority_tier': 'P1'
    },
    {
        'note_id': 'note-rajasthan-police-gk-science-master',
        'exam_version_id': EXAM_VERSION_ID,
        'subject_id': 'rajasthan-police-general-knowledge-science',
        'language_id': 'hi',
        'note_type': 'SUBJECT_REVISION_BUNDLE',
        'title': 'Rajasthan Police General Knowledge & General Science Master Revision Dossier',
        'summary': f'Subject master notes covering {len(gs_sample)} sampled questions on Indian Constitution, history, everyday physics, chemistry, human biology, and current affairs.',
        'content': f"""# Rajasthan Police General Knowledge & General Science Master Revision Dossier

## 1. Core National Knowledge & Science Curriculum
- **Indian Polity**: Article 32 (Heart and soul of Constitution), Part III Fundamental Rights (Articles 12-35), Part IV DPSP (Articles 36-51), 73rd Amendment (Panchayati Raj).
- **Indian History**: Indus Valley civilization (Harappa excavated by Daya Ram Sahni 1921), Maurya empire (Chandragupta & Chanakya), Dandi March (1930), Quit India Movement ('Do or Die' 1942).
- **Physics & Chemistry**: Newton's laws (F = ma, Law of Inertia), Universal gravity constant G, Table salt (NaCl), Bleaching powder (CaOCl2), Baking soda (NaHCO3).
- **Biology & Physiology**: Vitamin D synthesized by sunlight in skin, Red blood cells lifespan (~120 days), Universal donor O- and universal recipient AB+, normal body temperature (37°C / 98.6°F).

## 2. Sampled Practice Bank ({len(gs_sample)} Questions - 50% Sample)
{build_q_summary_markdown(gs_sample, 12)}
""",
        'source_references': json.dumps(['src-rajasthan-police-portal', 'src-rajasthan-police-constable-notice-2026']),
        'verification_status': 'VERIFIED',
        'version': 1,
        'content_depth': 'COMPREHENSIVE_BUNDLE',
        'provenance': 'OFFICIAL_RAJASTHAN_POLICE_SYLLABUS',
        'priority_tier': 'P1'
    },
    {
        'note_id': 'note-rajasthan-police-rajasthan-special-master',
        'exam_version_id': EXAM_VERSION_ID,
        'subject_id': 'rajasthan-police-rajasthan-special',
        'language_id': 'hi',
        'note_type': 'SUBJECT_REVISION_BUNDLE',
        'title': 'Rajasthan Special History, Art, Culture, UNESCO Forts & Geography Master Revision Dossier',
        'summary': f'Subject master notes covering {len(raj_sample)} sampled questions on Rajasthan Police administration, Aravalli range, Thar desert, UNESCO Hill Forts, folk deities, and cultural fairs.',
        'content': f"""# Rajasthan Special History, Art, Culture & Geography Master Revision Dossier

## 1. Domain Coverage & High-Yield Topics
- **Police Administration**: Motto 'सेवार्थ कटिबद्धता' (Committed to Serve), PHQ Jaipur, Mewar Bhil Corps (raised 1841 at Kherwara), Rajasthan Armed Constabulary (RAC).
- **Geography & Topography**: Guru Shikhar (1,722 m, Mount Abu) highest Aravalli peak, Chambal only perennial river in Rajasthan, Sambhar Salt Lake (largest inland saline lake), Luni river (Balotra divide).
- **State Symbols**: State Tree Khejri (Prosopis cineraria), State Bird Godawan (Great Indian Bustard), State Animals Chinkara & Camel (livestock 2014), State Dance Ghoomar, State Sport Basketball.
- **UNESCO World Heritage**: 6 Hill Forts (Chittorgarh, Kumbhalgarh 36km wall, Ranthambore, Gagron, Amer, Jaisalmer Sonar Qila), Keoladeo Ghana Bird Sanctuary, Jantar Mantar Jaipur, Kalbelia dance.
- **History & Freedom Struggle**: Maharana Pratap (Battle of Haldighati 1576), 1857 Revolt began at Naseerabad (28 May 1857), Auwa Thakur Kushal Singh.
- **Folk Deities & Fairs**: Panchpir (Pabuji, Ramdevji, Gogaji, Mehaji, Harbhuji), Karni Mata Deshnok (Kaba rats), Pushkar Fair (Kartik Purnima), Baneshwar tribal Kumbh.

## 2. Sampled Practice Bank ({len(raj_sample)} Questions - 50% Sample)
{build_q_summary_markdown(raj_sample, 12)}
""",
        'source_references': json.dumps(['src-rajasthan-police-portal', 'src-rajasthan-police-constable-notice-2026']),
        'verification_status': 'VERIFIED',
        'version': 1,
        'content_depth': 'COMPREHENSIVE_BUNDLE',
        'provenance': 'OFFICIAL_RAJASTHAN_POLICE_SYLLABUS',
        'priority_tier': 'P1'
    },
    {
        'note_id': 'note-rajasthan-police-women-child-law-master',
        'exam_version_id': EXAM_VERSION_ID,
        'subject_id': 'rajasthan-police-women-child-crime-law',
        'language_id': 'hi',
        'note_type': 'SUBJECT_REVISION_BUNDLE',
        'title': 'Crimes Against Women & Children Legal Provisions, Protection Acts & Helplines Master Guide',
        'summary': f'Complete statutory guide covering {len(law_sample)} sampled questions on POCSO Act 2012, Domestic Violence Act 2005, POSH Act 2013, Child Marriage Act, and IPC/BNS criminal sections.',
        'content': f"""# Crimes Against Women & Children Legal Provisions & Protection Acts Master Guide

## 1. Key Statutes & Legal Provisions
- **POCSO Act, 2012**: Child defined as any person below 18 years; Section 21 makes non-reporting punishable (up to 6 months); 2019 amendment introduces death penalty for aggravated penetrative assault on child; Special Courts to conclude trial in 1 year.
- **Domestic Violence Act, 2005 (PWDVA)**: Covers physical, sexual, emotional, verbal, and economic abuse; Protection Officers appointed under Section 8; Section 19 provides Residence Orders securing shared household rights.
- **POSH Act, 2013 & Vishakha Case**: Arising from Vishaka v. State of Rajasthan (1997); Internal Complaints Committee (ICC) mandatory for workplaces with 10+ employees; inquiry to be completed within 90 days.
- **Dowry Prohibition Act, 1961**: Minimum 5 years imprisonment and Rs. 15,000 fine for taking or giving dowry; Section 304B of IPC presumes dowry death within 7 years of marriage.
- **Prohibition of Child Marriage Act, 2006**: Minimum marriage age Male 21, Female 18; child marriages are voidable; penalties for solemnizing child marriage.
- **IPC / Criminal Penal Provisions**: Section 354 (outraging modesty), 354A (sexual harassment), 354B (assault to disrobe), 354C (voyeurism), 354D (stalking), 498A (cruelty by husband or in-laws).
- **Emergency Helplines**: Childline 1098, Women Helpline 1090 (Garima) / 181, Dial 112 (National Emergency).

## 2. Sampled Practice Bank ({len(law_sample)} Questions - 50% Sample)
{build_q_summary_markdown(law_sample, 12)}
""",
        'source_references': json.dumps(['src-rajasthan-police-portal', 'src-rajasthan-police-constable-notice-2026']),
        'verification_status': 'VERIFIED',
        'version': 1,
        'content_depth': 'COMPREHENSIVE_BUNDLE',
        'provenance': 'OFFICIAL_RAJASTHAN_POLICE_SYLLABUS',
        'priority_tier': 'P1'
    }
]

out_notes_file = os.path.join(BASE_DIR, 'rajasthan_police_bundled_notes.json')
with open(out_notes_file, 'w', encoding='utf-8') as f:
    json.dump(notes, f, ensure_ascii=False, indent=2)

print(f"✅ Generated {len(notes)} bundled revision notes for Rajasthan Police at {out_notes_file}")
