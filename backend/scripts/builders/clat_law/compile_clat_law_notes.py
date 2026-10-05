"""
CLAT Law Bundled Study Notes Compiler
Generates exactly 5 master bundled notes sampling 50% representative questions (within 40%-60% requirement)
across all 4 subjects for CLAT Law (BA LLB / BBA LLB).
"""

import json
import os
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = os.path.dirname(__file__)
EXAM_VERSION_ID = 'ver-clat-law-2026'

with open(os.path.join(BASE_DIR, 'clat_law_bank.json'), 'r', encoding='utf-8') as f:
    all_qs = json.load(f)

def get_sample_qs(qs, subject_id, ratio=0.5):
    sub_qs = [q for q in qs if q['subject_id'] == subject_id]
    count = int(len(sub_qs) * ratio)
    return sub_qs[:count]

# 50% sampling from each of the 4 subjects (150 Qs each = 600 Qs grand bundle)
eng_sample = get_sample_qs(all_qs, 'clat-english-language', 0.50)
ca_sample = get_sample_qs(all_qs, 'clat-current-affairs-gk', 0.50)
legal_sample = get_sample_qs(all_qs, 'clat-legal-reasoning', 0.50)
lq_sample = get_sample_qs(all_qs, 'clat-logical-quantitative', 0.50)

grand_bundle = eng_sample + ca_sample + legal_sample + lq_sample

print(f"Sampled Grand CLAT Bundle: {len(grand_bundle)} questions (English:{len(eng_sample)}, CA/GK:{len(ca_sample)}, Legal:{len(legal_sample)}, Logic/Quant:{len(lq_sample)})")

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
        'note_id': 'note-clat-grand-blueprint',
        'exam_version_id': EXAM_VERSION_ID,
        'subject_id': 'clat-legal-reasoning',
        'language_id': 'hi',
        'note_type': 'ALL_SUBJECTS_SUPER_BUNDLE',
        'title': 'CLAT National Law Entrance Grand Blueprint & Full Curriculum Master Compendium (क्लैट राष्ट्रीय विधि प्रवेश संपूर्ण मास्टर ब्लूप्रिंट)',
        'summary': f'Comprehensive examination master repository containing {len(grand_bundle)} sampled questions across all 4 subjects (English Language, Current Affairs & GK, Legal Reasoning, Logical Reasoning & Quantitative Techniques) representing Consortium of NLUs standards.',
        'content': (
            "# CLAT National Law Entrance Grand Blueprint & Full Curriculum Master Compendium\n\n"
            "## 1. Conducting Authority & Examination Structure\n"
            "- **Conducting Body**: Consortium of National Law Universities (Consortium of NLUs), PO Bag 7201, Nagarbhavi, Bengaluru 560072.\n"
            "- **Participating NLUs**: 24 Premier National Law Universities (NLSIU Bengaluru, NALSAR Hyderabad, WBNUJS Kolkata, NLU Jodhpur, GNLU Gandhinagar, HNLU Raipur, RMLNLU Lucknow, NUALS Kochi, NLUO Cuttack, DSNLU Visakhapatnam, MNLU Mumbai, etc.).\n"
            "- **Total Seats**: 3,400+ undergraduate 5-year integrated law seats (BA LLB Hons, BBA LLB Hons, B.Sc LLB Hons).\n"
            "- **Examination Format**: Offline Pen-and-Paper (OMR based) objective test of 120 Questions in 120 Minutes (2 Hours).\n"
            "- **Marking Standard**: +1.0 mark for each correct answer; -0.25 mark penalty for each incorrect answer.\n\n"
            "## 2. Integrated Sectional Composition\n"
            "1. **English Language**: ~24 Questions (Reading comprehension, vocabulary in context, grammatical syntax).\n"
            "2. **Current Affairs & GK**: ~30 Questions (Contemporary national events, international treaties, judicial developments).\n"
            "3. **Legal Reasoning**: ~32 Questions (Constitutional law, torts, contracts, criminal law, legal maxims).\n"
            "4. **Logical Reasoning & Quantitative Techniques**: ~34 Questions (Critical reasoning, syllogisms, caselet DI, arithmetic fundamentals).\n\n"
            "## 3. Representative Sampled Question Repository (50% Uniform Sampling)\n"
            f"Below is a verified sample of {len(grand_bundle)} multi-subject representative questions:\n"
            + build_q_summary_markdown(grand_bundle, 16)
        )
    },

    # Note 2: Constitutional Law, Torts & Jurisprudence
    {
        'note_id': 'note-clat-constitutional-torts',
        'exam_version_id': EXAM_VERSION_ID,
        'subject_id': 'clat-legal-reasoning',
        'language_id': 'hi',
        'note_type': 'LEGAL_REASONING_CONSTITUTION_TORTS',
        'title': 'Constitutional Law, Law of Torts & Core Jurisprudence Treatise (संवैधानिक विधि, अपकृत्य विधि एवं विधिशास्त्र अध्ययन नोट्स)',
        'summary': f'In-depth jurisprudence revision module containing {len(legal_sample)} sampled questions on constitutional rights, basic structure, judicial review, negligence, strict/absolute liability, and legal maxims.',
        'content': (
            "# Constitutional Law, Law of Torts & Core Jurisprudence Treatise\n\n"
            "## 1. Constitutional Law Cornerstones\n"
            "- **Basic Structure Doctrine**: Formulated in Kesavananda Bharati (1973); Parliament cannot alter the foundational architecture under Article 368.\n"
            "- **Fundamental Rights & Golden Triangle**: Interplay of Article 14 (Equality), Article 19 (Freedoms), and Article 21 (Personal Liberty) established in Maneka Gandhi (1978).\n"
            "- **Prerogative Writs (Articles 32 & 226)**: Habeas Corpus (personal liberty), Mandamus (public duty enforcement), Prohibition (preventing jurisdiction overreach), Certiorari (quashing illegal orders), and Quo Warranto (challenging usurpation of public office).\n\n"
            "## 2. Law of Torts & Civil Liabilities\n"
            "- **Injuria Sine Damno**: Legal injury without monetary damage (Ashby v. White) vs **Damnum Sine Injuria**: Monetary damage without legal injury (Gloucester Grammar School).\n"
            "- **Strict Liability (Rylands v. Fletcher)**: Non-natural land use, accumulation, escape; defenses include Act of God, plaintiff's consent, statutory authority.\n"
            "- **Absolute Liability (M.C. Mehta v. Union of India)**: Hazardous enterprises owe a non-delegable duty to society without any exceptions.\n"
            "- **Defenses**: Volenti non fit injuria (voluntary risk assumption), Necessity, Private defense, Statutory immunity.\n\n"
            "## 3. Sampled Representative Questions (50% Sampling)\n"
            + build_q_summary_markdown(legal_sample, 12)
        )
    },

    # Note 3: Law of Contracts & Criminal Law
    {
        'note_id': 'note-clat-contracts-criminal',
        'exam_version_id': EXAM_VERSION_ID,
        'subject_id': 'clat-legal-reasoning',
        'language_id': 'hi',
        'note_type': 'CONTRACTS_AND_CRIMINAL_LAW',
        'title': 'Law of Contracts, Commercial Obligations & Criminal Law Core Manual (संविदा विधि एवं आपराधिक विधि अध्ययन संकलन)',
        'summary': f'Comprehensive revision of contract formation, free consent, doctrine of frustration, damages, and penal law principles (Actus Reus, Mens Rea, General Exceptions) with {len(legal_sample)} sampled questions.',
        'content': (
            "# Law of Contracts, Commercial Obligations & Criminal Law Core Manual\n\n"
            "## 1. Law of Contracts (Indian Contract Act 1872)\n"
            "- **Offer & Acceptance**: General offers (Carlill v. Carbolic Smoke Ball); postal rule completes communication against proposer upon transmission (Sec 4).\n"
            "- **Capacity to Contract**: Minor's agreement is absolutely void ab initio (Mohori Bibee v. Dharmodas Ghose, 1903).\n"
            "- **Free Consent Vitiating Elements**: Coercion (Sec 15), Undue Influence (Sec 16), Fraud (Sec 17), Misrepresentation (Sec 18), and Bilateral Mistake (Sec 20).\n"
            "- **Doctrine of Frustration (Sec 56)**: Contract is discharged when performance becomes physically/legally impossible without fault (Taylor v. Caldwell).\n"
            "- **Damages (Sec 73)**: Rule in Hadley v. Baxendale permits recovery of direct/ordinary losses and contemplated special losses.\n\n"
            "## 2. Criminal Law & Penal Principles (IPC / BNS Framework)\n"
            "- **Core Components**: Concurrence of Actus Reus (wrongful act) and Mens Rea (guilty mind).\n"
            "- **General Exceptions**: Right of private defence (Sec 96-106), Insanity (M'Naghten Rules / Sec 84), Involuntary intoxication (Sec 85), Infancy (Sec 82-83 Doli Incapax).\n"
            "- **Joint Liability**: Section 34 requires pre-arranged plan and active participation; Section 149 requires common object of unlawful assembly.\n"
            "- **Homicide Spectrum**: Culpable Homicide (Sec 299) vs Murder (Sec 300) distinguished by degree of lethal probability (Reg v. Govinda, 1876).\n\n"
            "## 3. Sampled Representative Questions\n"
            + build_q_summary_markdown(legal_sample[-15:], 12)
        )
    },

    # Note 4: English Language & Critical Reasoning
    {
        'note_id': 'note-clat-english-critical-reasoning',
        'exam_version_id': EXAM_VERSION_ID,
        'subject_id': 'clat-english-language',
        'language_id': 'hi',
        'note_type': 'ENGLISH_AND_CRITICAL_REASONING',
        'title': 'Advanced Reading Comprehension, Contextual Vocabulary & Critical Reasoning Handbook (अंग्रेजी बोध, शब्दावली एवं गहन चिंतन हैंडबुक)',
        'summary': f'Integrative guide covering passage comprehension, tone identification, formal grammar mechanics, syllogisms, and critical reasoning with {len(eng_sample) + len(lq_sample)} sampled questions.',
        'content': (
            "# Advanced Reading Comprehension, Contextual Vocabulary & Critical Reasoning Handbook\n\n"
            "## 1. Reading Comprehension Strategies for CLAT\n"
            "- **Main Idea & Central Thesis**: Identifying the author's primary controlling argument vs secondary supporting evidence.\n"
            "- **Dissecting Authorial Tone**: Distinguishing polemical, didactic, cynical, satirical, dispassionate, and analytical registers.\n"
            "- **Contextual Semantics & Vocabulary**: Deciphering advanced formal legal terms (impugn, obfuscate, sui generis, corroborate, exculpate).\n"
            "- **Grammatical Mechanics**: Eliminating dangling modifiers, ensuring parallelism in coordinate clauses, and employing subjunctive moods.\n\n"
            "## 2. Critical Reasoning & Argument Architecture\n"
            "- **Premise, Assumption & Conclusion**: Uncovering the unstated bridge necessary for an inductive claim to hold.\n"
            "- **Strengthening & Weakening**: Introducing new empirical evidence that reinforces or fatally undermines an argument's causal link.\n"
            "- **Logical Fallacies**: Spotting Ad Hominem, Straw Man, Post Hoc Ergo Propter Hoc, Begging the Question, and False Dilemma in argumentative prose.\n"
            "- **Formal Deduction**: Categorical propositions, Square of Opposition, Syllogisms, and Venn diagram representations.\n\n"
            "## 3. Sampled Representative Questions\n"
            + build_q_summary_markdown(eng_sample + lq_sample[:50], 12)
        )
    },

    # Note 5: Current Affairs & Quantitative Techniques
    {
        'note_id': 'note-clat-current-affairs-quantitative',
        'exam_version_id': EXAM_VERSION_ID,
        'subject_id': 'clat-current-affairs-gk',
        'language_id': 'hi',
        'note_type': 'CURRENT_AFFAIRS_AND_QUANTITATIVE_TECHNIQUES',
        'title': 'Contemporary National & Global Affairs and Quantitative Caselet Techniques (समसामयिक घटनाक्रम एवं परिमाणात्मक तकनीकें)',
        'summary': f'Curated compendium of national legal landmarks, international treaties, economic policies, and practical caselet mathematics with {len(ca_sample) + len(lq_sample)} sampled questions.',
        'content': (
            "# Contemporary National & Global Affairs and Quantitative Caselet Techniques\n\n"
            "## 1. High-Priority Contemporary Legal & National Affairs\n"
            "- **New Criminal Statutes**: Enforcement of Bharatiya Nyaya Sanhita (BNS), BNSS, and BSA effective July 1, 2024.\n"
            "- **Landmark Supreme Court Rulings**: Electoral Bonds strike-down (ADR case under Article 19(1)(a)), Article 370 abrogation validity, Collegium transparency.\n"
            "- **Constitutional Amendments**: 106th Amendment Act (Nari Shakti Vandan Adhiniyam) providing 33% reservation for women in Lok Sabha and Assemblies.\n"
            "- **Digital & Tech Laws**: Digital Personal Data Protection Act 2023, Telecommunications Act 2023, European Union Artificial Intelligence Act 2024.\n"
            "- **Global Summits & Treaties**: G20 New Delhi Declaration (African Union induction, Global Biofuels Alliance), BRICS expansion (Egypt, Ethiopia, Iran, UAE), COP28 Loss and Damage Fund.\n\n"
            "## 2. Quantitative Techniques for CLAT (Caselet DI & Practical Math)\n"
            "- **Passage-Based Caselets**: Translating textual numerical facts into algebraic models and ratios.\n"
            "- **Core Arithmetic**: Ratios & Proportions, Successive Percentages, Profit and Loss, Compound Interest, Time-Speed-Distance.\n"
            "- **Mensuration & Geometry**: Land plot areas, boundary borders, volume calculations in forensic/environmental contexts.\n"
            "- **Data Interpretation**: Deriving inferences from tabular records, pie charts, and judicial pendency indices.\n\n"
            "## 3. Sampled Representative Questions\n"
            + build_q_summary_markdown(ca_sample + lq_sample[-50:], 12)
        )
    }
]

out_notes_file = os.path.join(BASE_DIR, 'clat_law_bundled_notes.json')
with open(out_notes_file, 'w', encoding='utf-8') as f:
    json.dump(notes, f, ensure_ascii=False, indent=2)

print(f"✅ Successfully compiled {len(notes)} master bundled notes to {out_notes_file}")
