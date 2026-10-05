"""
UGC NET Bundled Study Notes Compiler
Generates exactly 5 master bundled notes sampling 50% representative questions (within 40%-60% requirement)
across all 4 subjects for NTA UGC NET (Assistant Professor & JRF).
"""

import json
import os
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = os.path.dirname(__file__)
EXAM_VERSION_ID = 'ver-ugc-net-2026'

with open(os.path.join(BASE_DIR, 'ugc_net_bank.json'), 'r', encoding='utf-8') as f:
    all_qs = json.load(f)

def get_sample_qs(qs, subject_id, ratio=0.5):
    sub_qs = [q for q in qs if q['subject_id'] == subject_id]
    count = int(len(sub_qs) * ratio)
    return sub_qs[:count]

# 50% sampling from each of the 4 subjects (150 Qs each = 600 Qs grand bundle)
tr_sample = get_sample_qs(all_qs, 'ugc-net-teaching-research-aptitude', 0.50)
logic_sample = get_sample_qs(all_qs, 'ugc-net-logical-mathematical-reasoning-di', 0.50)
ict_sample = get_sample_qs(all_qs, 'ugc-net-ict-people-environment-higher-education', 0.50)
hum_sample = get_sample_qs(all_qs, 'ugc-net-humanities-social-sciences-core', 0.50)

grand_bundle = tr_sample + logic_sample + ict_sample + hum_sample

print(f"Sampled Grand UGC NET Bundle: {len(grand_bundle)} questions (Teaching/Research:{len(tr_sample)}, Logic/DI:{len(logic_sample)}, ICT/Env/HE:{len(ict_sample)}, Humanities:{len(hum_sample)})")

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
        'note_id': 'note-ugcnet-grand-blueprint',
        'exam_version_id': EXAM_VERSION_ID,
        'subject_id': 'ugc-net-teaching-research-aptitude',
        'language_id': 'hi',
        'note_type': 'ALL_SUBJECTS_SUPER_BUNDLE',
        'title': 'UGC NET General Paper on Teaching, Research & National Academic Perspectives Master Blueprint (यूजीसी नेट शिक्षण एवं शोध अभिवृत्ति संपूर्ण मास्टर ब्लूप्रिंट)',
        'summary': f'Comprehensive examination master repository containing {len(grand_bundle)} sampled questions across all 4 subjects (Teaching & Research Aptitude, Logical & Mathematical Reasoning & DI, ICT, People, Environment & Higher Education, Humanities & Commerce Core Foundations) representing official NTA and UGC standards.',
        'content': (
            "# UGC NET General Paper on Teaching, Research & National Academic Perspectives Master Blueprint\n\n"
            "## 1. Conducting Authority & Examination Structure\n"
            "- **Conducting Agency**: National Testing Agency (NTA) on behalf of University Grants Commission (UGC), New Delhi.\n"
            "- **Nature of Exam**: National Eligibility Test for Assistant Professor and Junior Research Fellowship (JRF).\n"
            "- **Mode**: Computer Based Test (CBT Online) across nationwide centers.\n"
            "- **Marking Scheme**: +2.0 marks per correct answer; **0.0 negative marking**.\n"
            "- **Eligibility Scope**: Category 1 (JRF & Assistant Professor), Category 2 (Assistant Professor & Ph.D. Admission), Category 3 (Ph.D. Admission only).\n\n"
            "## 2. Four Comprehensive Curriculum Pillars\n"
            "1. **Teaching Aptitude, Research Methodology & Communication**: Levels of teaching (Herbart, Morrison, Hunt), positivism vs post-positivism, research designs, sampling, ethics, plagiarism regulations 2018, and communication dynamics.\n"
            "2. **Mathematical Reasoning, Logical Reasoning & Data Interpretation**: Number & letter series, categorical propositions, Square of Opposition, fallacies, Indian Logic (6 Pramanas, Vyapti, Hetvabhasa), and graphical data interpretation.\n"
            "3. **ICT, People, Development & Environment and Higher Education**: Digital repositories (Shodhganga, DigiLocker, SWAYAM), MDGs & SDGs, climate conventions (Montreal, Paris, ISA), ancient learning seats (Nalanda, Takshashila), commissions, and NEP 2020.\n"
            "4. **Humanities, Social Sciences, Commerce & Governance**: Constitutional jurisprudence, macroeconomics, fiscal/monetary policy, sociology (Weber, Durkheim, Marx, Srinivas), political philosophy, and classical Indian philosophical traditions.\n\n"
            "## 3. Representative Sample of Curated Questions (50% Uniform Sampling)\n"
            + build_q_summary_markdown(grand_bundle, max_display=16)
        )
    },

    # Note 2: Teaching & Research Aptitude
    {
        'note_id': 'note-ugcnet-teaching-research-aptitude',
        'exam_version_id': EXAM_VERSION_ID,
        'subject_id': 'ugc-net-teaching-research-aptitude',
        'language_id': 'hi',
        'note_type': 'SUBJECT_REVISION_NOTES',
        'title': 'Teaching Aptitude, Research Methodology & Communication Comprehensive Guide (शिक्षण अभिवृत्ति, शोध प्रविधि एवं संप्रेषण संपूर्ण नोट्स)',
        'summary': f'In-depth academic notes containing {len(tr_sample)} sampled questions on teaching levels, positivism, experimental designs, Type I and II errors, probability sampling, APA/MLA styles, UGC plagiarism levels, and communication models.',
        'content': (
            "# Teaching Aptitude, Research Methodology & Communication Comprehensive Guide\n\n"
            "## 1. Teaching Aptitude & Learning Systems\n"
            "- **Levels of Teaching**: Memory Level (Johann Friedrich Herbart), Understanding Level (H.C. Morrison: Exploration, Presentation, Assimilation, Organization, Recitation), Reflective Level (Maurice P. Hunt: problem-centered, critical reflection).\n"
            "- **Digital Initiatives**: SWAYAM (4 quadrants: video, e-text, self-assessment, discussion forum), SWAYAM PRABHA (40 DTH channels via GSAT-15), MOOCs architecture.\n"
            "- **Evaluation Frameworks**: Formative (feedback during instruction) vs Summative (terminal grading); Criterion-Referenced (absolute standard) vs Norm-Referenced (percentile ranking); Choice Based Credit System (CBCS).\n\n"
            "## 2. Research Methodology & Ethics\n"
            "- **Epistemological Paradigms**: Positivism (Auguste Comte - quantitative, objective empiricism) vs Post-positivism (qualitative, subjective social reality).\n"
            "- **Designs & Variables**: Experimental (IV manipulated, DV measured, extraneous controlled); Ex-Post Facto (causal-comparative after event); Action Research cycle (Kurt Lewin: Plan -> Act -> Observe -> Reflect).\n"
            "- **Hypotheses & Errors**: Type I Error (Alpha - rejecting true H0); Type II Error (Beta - failing to reject false H0).\n"
            "- **Sampling Techniques**: Probability (Simple random, Stratified, Systematic, Cluster); Non-probability (Convenience, Purposive, Quota, Snowball).\n"
            "- **UGC Plagiarism Regulations 2018**: Level 0 (up to 10%), Level 1 (10%-40%), Level 2 (40%-60%), Level 3 (>60%).\n\n"
            "## 3. Communication Dynamics\n"
            "- **Models**: Shannon-Weaver (Source, Transmitter, Channel, Noise, Receiver, Destination); Berlo's SMCR model.\n"
            "- **Non-Verbal**: Kinesics (body language), Proxemics (Edward T. Hall - space/distance), Paralanguage (vocal pitch/tone), Haptics (touch).\n"
            "- **Barriers**: Semantic (jargon, language), Psychological (filtering, halo effect), Environmental (noise).\n\n"
            "## 4. Representative Question Archive (50% Uniform Sampling)\n"
            + build_q_summary_markdown(tr_sample, max_display=12)
        )
    },

    # Note 3: Logical & Mathematical Reasoning & DI
    {
        'note_id': 'note-ugcnet-logical-mathematical-reasoning-di',
        'exam_version_id': EXAM_VERSION_ID,
        'subject_id': 'ugc-net-logical-mathematical-reasoning-di',
        'language_id': 'hi',
        'note_type': 'SUBJECT_REVISION_NOTES',
        'title': 'Mathematical Reasoning, Syllogistic Logic & Indian Epistemology Complete Handbook (गणितीय तर्क, युक्ति-युक्त तर्क, भारतीय तर्कशास्त्र एवं आंकड़ा निर्वचन)',
        'summary': f'Analytical guide containing {len(logic_sample)} sampled questions covering mathematical aptitude, categorical propositions, Square of Opposition, formal/informal fallacies, Indian Logic (Pramanas, Nyaya 5 steps, Vyapti, Hetvabhasa), and Data Interpretation.',
        'content': (
            "# Mathematical Reasoning, Syllogistic Logic & Indian Epistemology Complete Handbook\n\n"
            "## 1. Classical Categorical Logic\n"
            "- **Propositions**: A (Universal Affirmative: All S is P), E (Universal Negative: No S is P), I (Particular Affirmative: Some S is P), O (Particular Negative: Some S is not P).\n"
            "- **Square of Opposition**: Contradictory (A-O, E-I: opposite truth values), Contrary (A-E: cannot both be true), Subcontrary (I-O: cannot both be false), Subalternation (A->I, E->O: truth flows downward, falsity flows upward).\n"
            "- **Fallacies**: Undistributed Middle, Illicit Major, Illicit Minor, Ad Hominem, Straw Man, Petitio Principii (Begging the Question), Slippery Slope, False Dilemma.\n\n"
            "## 2. Indian Logic (भारतीय तर्कशास्त्र - प्रमाण एवं हेत्वाभास)\n"
            "- **Pramanas (6 Means of Knowledge)**: Pratyaksha (Perception), Anumana (Inference), Upamana (Comparison - Gavaya), Shabda (Testimony), Arthapatti (Postulation - Devadatta eating at night), Anupalabdhi (Non-apprehension of absence/abhava).\n"
            "- **Nyaya Syllogism (5 Steps)**: Pratijna (Hill has fire), Hetu (Because smoke), Udaharana (Wherever smoke there fire, as kitchen), Upanaya (Hill has smoke with vyapti), Nigamana (Therefore hill has fire).\n"
            "- **Vyapti**: Invariable unconditional relation of concomitance between Hetu and Sadhya.\n"
            "- **Hetvabhasa (5 Fallacies)**: Savyabhichara (irregular middle), Viruddha (contradictory middle), Satpratipaksha (counterbalanced), Asiddha (unproved middle - Ashrayasiddha, Svarupasiddha), Badhita (contradicted by perception).\n\n"
            "## 3. Mathematical Aptitude & Data Interpretation\n"
            "- **Aptitude**: Percentage changes, Profit & Loss, Simple & Compound Interest (Difference = P(r/100)^2 for 2 years), Time-Speed-Distance, Work-Time.\n"
            "- **Data Interpretation**: Table matrices, Bar charts, Pie charts (3.6 degrees = 1%), Line graphs, Ratio and Growth rate analysis.\n\n"
            "## 4. Representative Question Archive (50% Uniform Sampling)\n"
            + build_q_summary_markdown(logic_sample, max_display=12)
        )
    },

    # Note 4: ICT, People, Environment & Higher Education
    {
        'note_id': 'note-ugcnet-ict-people-environment-higher-education',
        'exam_version_id': EXAM_VERSION_ID,
        'subject_id': 'ugc-net-ict-people-environment-higher-education',
        'language_id': 'hi',
        'note_type': 'SUBJECT_REVISION_NOTES',
        'title': 'ICT, People, Environment & Higher Education System Comprehensive Repository (सूचना प्रौद्योगिकी, लोक-पर्यावरण एवं उच्च शिक्षा प्रणाली संपूर्ण नोट्स)',
        'summary': f'Comprehensive repository containing {len(ict_sample)} sampled questions on networking protocols, higher education digital repositories, MDGs vs SDGs, atmospheric pollutants, treaties (Montreal, Paris, ISA), ancient Indian universities, and NEP 2020.',
        'content': (
            "# ICT, People, Environment & Higher Education System Comprehensive Repository\n\n"
            "## 1. Information & Communication Technology (ICT)\n"
            "- **Addressing & Protocols**: IPv4 (32-bit), IPv6 (128-bit); TCP/IP, HTTP/HTTPS, DNS, SMTP (send mail), POP3/IMAP (receive mail).\n"
            "- **Digital Initiatives**: Shodhganga (Ph.D. theses repository at INFLIBNET), ShodhGangotri (synopses), DigiLocker, National Digital Library (NDLI), SAMARTH ERP.\n"
            "- **Security**: Phishing (social engineering identity theft), Ransomware (malicious encryption demanding extortion), Trojan Horse, Firewalls.\n\n"
            "## 2. People, Development & Environment\n"
            "- **Goals**: MDGs (8 goals, 2000-2015); SDGs (17 goals, 169 targets, 2015-2030; SDG 4 is Quality Education).\n"
            "- **Pollution**: Primary vs Secondary (Ground-level Ozone O3 & PAN are photochemical secondary pollutants); Biochemical Oxygen Demand (BOD - organic pollution metric); Noise limits (CPCB: Residential 55/45 dB).\n"
            "- **Treaties & Missions**: Montreal Protocol 1987 & Kigali 2016 (ODSs & HFCs); Paris Agreement 2015 (COP21, keep warming < 2°C); International Solar Alliance (ISA - HQ Gurugram); NAPCC (8 National Missions).\n\n"
            "## 3. Higher Education System\n"
            "- **Ancient Universities**: Takshashila (Gandhara, statecraft, Chanakya, Panini, Jivaka); Nalanda (Guptas, Kumaragupta I, Dharmaganja library); Valabhi (Hinayana Buddhism, Maitrakas); Vikramashila (Pala king Dharmapala, Tantric Buddhism).\n"
            "- **Historical Milestones**: Wood's Despatch 1854 (Magna Carta); Universities of Calcutta, Bombay, Madras (1857); Radhakrishnan Commission 1948-49 (led to UGC); Kothari Commission 1964-66 (10+2+3, 6% of GDP).\n"
            "- **NEP 2020 Reforms**: Higher Education Commission of India (HECI) with 4 verticals: NHERC, NAC, HEGC, GEC; Academic Bank of Credits (ABC); 50% GER target by 2035; MERUs.\n\n"
            "## 4. Representative Question Archive (50% Uniform Sampling)\n"
            + build_q_summary_markdown(ict_sample, max_display=12)
        )
    },

    # Note 5: Humanities, Social Sciences, Commerce & Governance
    {
        'note_id': 'note-ugcnet-humanities-social-sciences-core',
        'exam_version_id': EXAM_VERSION_ID,
        'subject_id': 'ugc-net-humanities-social-sciences-core',
        'language_id': 'hi',
        'note_type': 'SUBJECT_REVISION_NOTES',
        'title': 'Humanities, Social Sciences, Commerce & Governance Foundations Handbook (मानविकी, समाजशास्त्र, अर्थशास्त्र, वाणिज्य एवं लोक प्रशासन आधारभूत हैंडबुक)',
        'summary': f'Interdisciplinary handbook containing {len(hum_sample)} sampled questions on constitutional rights, judicial review, macroeconomic metrics, monetary policy, classical sociology (Weber, Durkheim, Marx), Indian social thinkers, and classical philosophical darshanas.',
        'content': (
            "# Humanities, Social Sciences, Commerce & Governance Foundations Handbook\n\n"
            "## 1. Indian Constitution & Governance\n"
            "- **Fundamental Rights**: Articles 14-18 (Equality), Article 21 (Life & Liberty, expanded in Maneka Gandhi), Article 21A (Right to Education - 86th Amendment), Article 32 (Constitutional Remedies - writs: Mandamus, Habeas Corpus, Quo Warranto, Certiorari, Prohibition).\n"
            "- **Basic Structure Doctrine**: Kesavananda Bharati v. State of Kerala (1973) - 13-judge bench ruled Parliament cannot alter basic features.\n"
            "- **Institutions**: RTI Act 2005 (48-hr limit for life/liberty), CAG (Article 148), Election Commission (Article 324), Finance Commission (Article 280), NITI Aayog (established 2015).\n\n"
            "## 2. Macroeconomics & Commerce\n"
            "- **Monetary Policy**: Reserve Bank of India (RBI Act 1934); Monetary Policy Committee (6 members); Repo Rate, CRR, SLR; Headline vs Core Inflation (core strips volatile food & energy).\n"
            "- **Fiscal Architecture**: Fiscal Deficit = Total Expenditure - Total Receipts excluding borrowings; GST (101st Amendment 2016, GST Council Article 279A).\n"
            "- **Trade**: Balance of Payments (Current & Capital account); WTO agreements (TRIPS - intellectual property, TRIMS, GATS).\n\n"
            "## 3. Sociological Perspectives & Thinkers\n"
            "- **Classical Sociology**: Max Weber (Bureaucracy, Protestant Ethic & Capitalism, Authority types); Emile Durkheim (Social Facts, Suicide typologies: Egoistic, Altruistic, Anomic, Fatalistic); Karl Marx (Historical Materialism, Base-Superstructure, Alienation).\n"
            "- **Indian Sociology**: M.N. Srinivas (Sanskritization, Dominant Caste); B.R. Ambedkar ('Annihilation of Caste' 1936 - division of labourers); Louis Dumont ('Homo Hierarchicus' - Purity and Pollution).\n\n"
            "## 4. Philosophical Traditions\n"
            "- **Orthodox Astika**: Nyaya (Gautama), Vaisheshika (Kanada - atomism), Samkhya (Kapila - Purusha & Prakriti), Yoga (Patanjali - Ashtanga), Mimamsa (Jaimini), Vedanta (Badarayana - Shankara Advaita).\n"
            "- **Heterodox Nastika**: Buddhism (Four Noble Truths, Eightfold Path), Jainism (Anekantavada, Syadvada), Charvaka (Materialism, only perception).\n\n"
            "## 5. Representative Question Archive (50% Uniform Sampling)\n"
            + build_q_summary_markdown(hum_sample, max_display=12)
        )
    }
]

out_path = os.path.join(BASE_DIR, 'ugc_net_bundled_notes.json')
with open(out_path, 'w', encoding='utf-8') as f:
    json.dump(notes, f, ensure_ascii=False, indent=2)

print(f"\n✅ UGC NET Master Bundled Notes written to: {out_path}")
print(f"Total Notes Compiled: {len(notes)}")
for n in notes:
    print(f" - [{n['note_id']}] {n['title'][:70]}... (Type: {n['note_type']})")
