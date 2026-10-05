"""
Rajasthan REET Bundled Study Notes Compiler
Generates exactly 5 master bundled notes sampling 50% representative questions (within 40%-60% requirement)
across all 4 subjects for REET Rajasthan (Level 1 & Level 2).
"""

import json
import os
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = os.path.dirname(__file__)
EXAM_VERSION_ID = 'ver-reet-rajasthan-2026'

with open(os.path.join(BASE_DIR, 'reet_bank.json'), 'r', encoding='utf-8') as f:
    all_qs = json.load(f)

def get_sample_qs(qs, subject_id, ratio=0.5):
    sub_qs = [q for q in qs if q['subject_id'] == subject_id]
    count = int(len(sub_qs) * ratio)
    return sub_qs[:count]

# 50% sampling from each of the 4 subjects (150 Qs each = 600 Qs grand bundle)
cdp_sample = get_sample_qs(all_qs, 'reet-child-development-pedagogy', 0.50)
math_sample = get_sample_qs(all_qs, 'reet-mathematics-science-evs', 0.50)
lang_sample = get_sample_qs(all_qs, 'reet-languages-hindi-english-sanskrit', 0.50)
gk_sample = get_sample_qs(all_qs, 'reet-rajasthan-gk-culture-social-studies', 0.50)

grand_bundle = cdp_sample + math_sample + lang_sample + gk_sample

print(f"Sampled Grand REET Bundle: {len(grand_bundle)} questions (CDP:{len(cdp_sample)}, MATH:{len(math_sample)}, LANG:{len(lang_sample)}, GK:{len(gk_sample)})")

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
    # Note 1: Grand Blueprint Super Bundle
    {
        'note_id': 'note-reet-grand-blueprint',
        'exam_version_id': EXAM_VERSION_ID,
        'subject_id': 'reet-child-development-pedagogy',
        'language_id': 'hi',
        'note_type': 'ALL_SUBJECTS_SUPER_BUNDLE',
        'title': 'REET Rajasthan Composite Examination Master Blueprint & All-Subject Strategy (रीट राजस्थान लेवल 1 व 2 संपूर्ण मास्टर ब्लूप्रिंट एवं अध्ययन मार्गदर्शिका)',
        'summary': f'Comprehensive examination master repository containing {len(grand_bundle)} sampled questions across all 4 subjects (Child Development & Pedagogy, Mathematics & Science & EVS, Languages Hindi-English-Sanskrit, Rajasthan GK & Culture) representing official RBSE Ajmer standards.',
        'content': (
            "# REET Rajasthan Composite Examination Master Blueprint & All-Subject Strategy\n\n"
            "## 1. Conducting Authority & Examination Structure\n"
            "- **Conducting Body**: Board of Secondary Education Rajasthan (RBSE / BSER), Ajmer (माध्यमिक शिक्षा बोर्ड राजस्थान, अजमेर).\n"
            "- **Examination Level**: REET Level 1 (Classes I to V / Primary) & REET Level 2 (Classes VI to VIII / Upper Primary).\n"
            "- **Structure**: 150 Multiple Choice Questions, 150 Marks, 150 Minutes duration.\n"
            "- **Marking Scheme**: +1.0 mark per correct answer; **0.0 negative marking** for eligibility.\n"
            "- **Qualifying Cut-off**: 60% (90/150 marks) for General category; 55% (82/150 marks) for OBC/SC/ST in TSP and Non-TSP regions as per state norms.\n"
            "- **Certificate Validity**: Lifetime validity across Rajasthan for eligibility towards 3rd Grade Teacher (तृतीय श्रेणी शिक्षक भर्ती परीक्षा - RSMSSB).\n\n"
            "## 2. Four Core Curriculum Pillars\n"
            "1. **Child Development & Pedagogy**: Psychological principles of child growth, learning theories, inclusive education, RTE 2009, NEP 2020, and Action Research.\n"
            "2. **Mathematics, Science & Environmental Studies**: Core numeracy, algebra, geometry, physics, chemistry, biology, ecological balance, and traditional water management.\n"
            "3. **Languages (Hindi, English & Sanskrit)**: Grammatical morphology, syntax, sandhi, samas, vocabulary, language skills (LSRW), and pedagogical methodologies.\n"
            "4. **Rajasthan GK, Culture & Educational Scenario**: Physical geography, history, forts, folk deities, arts, and state educational governance (RSCERT, DIET, Shala Darpan).\n\n"
            "## 3. Representative Sample of Curated Questions (50% Uniform Sampling)\n"
            + build_q_summary_markdown(grand_bundle, max_display=16)
        )
    },

    # Note 2: Child Development & Pedagogy
    {
        'note_id': 'note-reet-child-development-pedagogy',
        'exam_version_id': EXAM_VERSION_ID,
        'subject_id': 'reet-child-development-pedagogy',
        'language_id': 'hi',
        'note_type': 'SUBJECT_REVISION_NOTES',
        'title': 'Child Development, Pedagogy, RTE 2009 & Action Research Comprehensive Guide (बाल विकास, शिक्षण विधियाँ, शिक्षा का अधिकार 2009 एवं क्रियात्मक अनुसंधान संपूर्ण नोट्स)',
        'summary': f'In-depth pedagogical master notes containing {len(cdp_sample)} sampled questions on developmental stages, Piaget, Vygotsky, Kohlberg, learning theories, RTE 2009 statutory rules, NEP 2020, and Action Research.',
        'content': (
            "# Child Development, Pedagogy, RTE 2009 & Action Research Comprehensive Guide\n\n"
            "## 1. Growth, Development & Learning Theories\n"
            "- **Heredity & Environment**: Development = Heredity x Environment (Woodworth formula).\n"
            "- **Developmental Direction**: Cephalocaudal (Head to toe) and Proximodistal (Center outward).\n"
            "- **Jean Piaget**: 4 Stages - Sensorimotor (0-2), Pre-operational (2-7), Concrete Operational (7-11), Formal Operational (11+).\n"
            "- **Lev Vygotsky**: Socio-cultural theory, ZPD (Zone of Proximal Development), Scaffolding (पाड़/ढांचा), More Knowledgeable Other (MKO), Private Speech.\n"
            "- **Lawrence Kohlberg**: 3 Levels, 6 Stages of Moral Development (Pre-conventional, Conventional, Post-conventional).\n"
            "- **Learning Theorists**: Thorndike (Trial & Error, Law of Effect), Pavlov (Classical Conditioning), Skinner (Operant Conditioning, VR schedule), Kohler (Gestalt Insight).\n\n"
            "## 2. Right to Education Act 2009 & NEP 2020\n"
            "- **RTE 2009 Mandates**: Pupil-Teacher Ratio 30:1 (Primary), 35:1 (Upper Primary); 45 weekly working hours for teachers.\n"
            "- **SMC (School Management Committee)**: 75% parents/guardians, 50% women members.\n"
            "- **Section 17**: Complete prohibition of physical punishment and mental harassment.\n"
            "- **Section 28**: Total ban on private tutoring by school teachers.\n"
            "- **NEP 2020**: 5+3+3+4 pedagogical structure; mother tongue instruction till Grade 5; NIPUN Bharat FLN mission.\n"
            "- **Action Research**: Stephen M. Corey; practical scientific problem-solving by teachers for classroom improvement.\n\n"
            "## 3. Representative Question Archive (50% Uniform Sampling)\n"
            + build_q_summary_markdown(cdp_sample, max_display=12)
        )
    },

    # Note 3: Mathematics, Science & EVS
    {
        'note_id': 'note-reet-mathematics-science-evs',
        'exam_version_id': EXAM_VERSION_ID,
        'subject_id': 'reet-mathematics-science-evs',
        'language_id': 'hi',
        'note_type': 'SUBJECT_REVISION_NOTES',
        'title': 'Mathematics, General Science & Environmental Studies Complete Handbook (गणित, सामान्य विज्ञान एवं पर्यावरण अध्ययन संपूर्ण नोट्स एवं सूत्र संग्रह)',
        'summary': f'Technical reference notes containing {len(math_sample)} sampled questions on arithmetic, geometry, physics, chemistry, human biology, ecology, and indigenous water harvesting systems of Rajasthan.',
        'content': (
            "# Mathematics, General Science & Environmental Studies Complete Handbook\n\n"
            "## 1. Mathematical Formulas & Concepts\n"
            "- **LCM and HCF**: First Number x Second Number = LCM x HCF.\n"
            "- **Simple Interest**: SI = (P x R x T) / 100.\n"
            "- **Geometry**: Area of triangle = 1/2 x Base x Height; Area of circle = π x r^2; Circumference = 2πr.\n"
            "- **Pedagogy of Mathematics**: Inductive method (Example to rule); Deductive method (Rule to example); Diagnostic testing and remediation.\n\n"
            "## 2. General Science Essentials\n"
            "- **Physics**: Newton's Second Law F = m x a; Radiation does not require material medium; Audible frequency range is 20 Hz to 20,000 Hz.\n"
            "- **Chemistry**: Rusting is a chemical redox change; pH < 7 is acidic (turns blue litmus red); Sublimation in camphor and dry ice.\n"
            "- **Biology**: Mitochondria is the powerhouse of the cell; Blood Group O- is universal donor, AB+ is universal recipient; Photolysis of water releases oxygen.\n\n"
            "## 3. Environmental Studies & Rajasthan Ecology\n"
            "- **State Symbols**: State Tree Khejri (Prosopis cineraria); State Bird Godawan (Great Indian Bustard); State Animal Chinkara (wild) and Camel (livestock).\n"
            "- **Traditional Water Harvesting**: Khadin (Paliwal Brahmins, Jaisalmer), Tanka, Johad (Rajendra Singh, Alwar), Chand Baori (Abhaneri, Dausa).\n"
            "- **Ecology**: 10% energy transfer law by Raymond Lindeman; Desert National Park (Akal Wood Fossil Park); Keoladeo National Park (UNESCO site).\n\n"
            "## 4. Representative Question Archive (50% Uniform Sampling)\n"
            + build_q_summary_markdown(math_sample, max_display=12)
        )
    },

    # Note 4: Languages - Hindi, English & Sanskrit
    {
        'note_id': 'note-reet-languages-hindi-english-sanskrit',
        'exam_version_id': EXAM_VERSION_ID,
        'subject_id': 'reet-languages-hindi-english-sanskrit',
        'language_id': 'hi',
        'note_type': 'SUBJECT_REVISION_NOTES',
        'title': 'Trilingual Language Mastery: Hindi, English & Sanskrit Grammar with Pedagogy (त्रिभाषाई ज्ञान - हिन्दी, अंग्रेजी एवं संस्कृत व्याकरण तथा शिक्षण शास्त्र)',
        'summary': f'Linguistic guide containing {len(lang_sample)} sampled questions covering Hindi, English, and Sanskrit grammar, phonetics, Maheshwara Sutras, and language pedagogy methodologies.',
        'content': (
            "# Trilingual Language Mastery: Hindi, English & Sanskrit Grammar with Pedagogy\n\n"
            "## 1. Hindi Grammar & Pedagogy\n"
            "- **Sandhi**: Guna Sandhi (महा + ऋषि = महर्षि), Yana Sandhi (यदि + अपि = यद्यपि), Vriddhi Sandhi (एक + एक = एकैक).\n"
            "- **Samas**: Dvigu (चौराहा), Bahuvrihi (दशानन), Karmadharaya (नीलकमल), Tatpurusha (राजपुत्र).\n"
            "- **Language Skills (LSRW)**: Listening -> Speaking -> Reading -> Writing (सुबोपलि).\n"
            "- **Remedial Teaching**: Identifying errors via diagnostic tests and eliminating misconceptions through targeted pedagogy.\n\n"
            "## 2. English Grammar & Pedagogy\n"
            "- **Concord**: Neither... nor agrees with nearest subject; Collective nouns take singular verbs for cohesive groups.\n"
            "- **Voice & Speech**: Simple past active transforms into 'was/were + V3'; Universal scientific facts maintain present tense in indirect speech.\n"
            "- **Teaching Methods**: Communicative Language Teaching (CLT) emphasizes communicative competence; Bilingual Method (C.J. Dodson) permits teacher-only mother tongue use.\n\n"
            "## 3. Sanskrit Grammar & Pedagogy\n"
            "- **Maheshwara Sutrani**: 14 Sutras revealed by Lord Shiva's Damaru forming the basis of Pratyaharas (Ak, Ach, Hal).\n"
            "- **Sutras**: 'येनाङ्गविकारः' mandates Tritiya Vibhakti (पादेन खञ्जः); 'क्तक्तवतू निष्ठा' for past tense participle.\n"
            "- **Methods**: Bhandarkar Method (Grammar-Translation by Dr. R.G. Bhandarkar); Pathshala Gurukula Vidhi.\n\n"
            "## 4. Representative Question Archive (50% Uniform Sampling)\n"
            + build_q_summary_markdown(lang_sample, max_display=12)
        )
    },

    # Note 5: Rajasthan GK, Culture & Educational Scenario
    {
        'note_id': 'note-reet-rajasthan-gk-culture-educational-scenario',
        'exam_version_id': EXAM_VERSION_ID,
        'subject_id': 'reet-rajasthan-gk-culture-social-studies',
        'language_id': 'hi',
        'note_type': 'SUBJECT_REVISION_NOTES',
        'title': 'Rajasthan History, Art, Culture, Geography & Educational Scenario Complete Repository (राजस्थान सामान्य ज्ञान, इतिहास, कला-संस्कृति, भूगोल एवं शैक्षिक परिदृश्य)',
        'summary': f'State comprehensive repository containing {len(gk_sample)} sampled questions on Rajasthan geography, dynasties, 1857 revolt, forts, folk deities, and educational administration (RSCERT, DIET, Shala Darpan, SMILE).',
        'content': (
            "# Rajasthan History, Art, Culture, Geography & Educational Scenario Complete Repository\n\n"
            "## 1. Physical Geography of Rajasthan\n"
            "- **Physiographic Zones**: Thar Desert (61.11% area, 40% pop), Aravalli Range (Guru Shikhar 1722m), Eastern Plains, Hadoti Plateau.\n"
            "- **Rivers**: Luni (Sweet till Balotra, saline after), Chambal (Perennial, ravine badlands), Banas (Longest entirely within Rajasthan), Mahi (Cuts Tropic of Cancer twice).\n"
            "- **Lakes**: Sambhar Salt Lake (Produces ~8.7% of India's salt, Ramsar site), Jaisamand (Dhebar artificial freshwater lake).\n\n"
            "## 2. History & Folk Heritage of Rajasthan\n"
            "- **Civilizations**: Kalibangan (Ploughed field, fire altars), Ahar (Tamravati Nagari), Ganeshwar (Mother of copper cultures).\n"
            "- **Historical Milestones**: Battle of Haldighati (18 June 1576); Bijolia Movement (44 years, Vijay Singh Pathik); Mangarh Massacre (17 Nov 1913, Govind Giri).\n"
            "- **Integration**: 7 stages starting with Matsya Union on 18 March 1948 to Present Rajasthan on 1 Nov 1956 (Rajasthan Day on 30 March).\n"
            "- **Art & Architecture**: UNESCO 6 Hill Forts (Chittorgarh, Kumbhalgarh 36-km wall, Ranthambore, Amber, Jaisalmer, Gagron Water Fort); Kishangarh 'Bani Thani' (Mona Lisa of India); Kalbelia Dance (UNESCO 2010).\n"
            "- **Folk Deities**: Panchpir (Ramdevji, Pabuji, Gogaji, Mehaji, Harbhuji); Tejaji Maharaj; Beneshwar Dham Tribal Kumbh.\n\n"
            "## 3. Educational Scenario of Rajasthan (शैक्षिक परिदृश्य)\n"
            "- **RSCERT Udaipur**: Established 11 Nov 1978 on Mehrotra Committee recommendations; apex academic authority for curriculum and textbooks.\n"
            "- **DIET**: District-level nodal institute for teacher training and Class 5 & 8 board examinations.\n"
            "- **ICT Innovations**: Shala Darpan centralized portal (launched 2015); SMILE Program (April 2020 WhatsApp e-content); DIKSHA-RISE.\n"
            "- **Flagship Welfare**: Mahatma Gandhi Government Schools (MGGS - English Medium, 2019); Mukhyamantri Bal Gopal Yojana (nutritious milk for Classes 1-8).\n\n"
            "## 4. Representative Question Archive (50% Uniform Sampling)\n"
            + build_q_summary_markdown(gk_sample, max_display=12)
        )
    }
]

out_path = os.path.join(BASE_DIR, 'reet_bundled_notes.json')
with open(out_path, 'w', encoding='utf-8') as f:
    json.dump(notes, f, ensure_ascii=False, indent=2)

print(f"\n✅ REET Rajasthan Master Bundled Notes written to: {out_path}")
print(f"Total Notes Compiled: {len(notes)}")
for n in notes:
    print(f" - [{n['note_id']}] {n['title'][:70]}... (Type: {n['note_type']})")
