"""
Maharashtra Police Constable & Driver Bundled Study Notes and Compilers
Generates 5 master bundled notes sampling 50% representative questions (within 40%-60% requirement)
across all subjects for Maharashtra Police.
"""

import json
import os
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = os.path.dirname(__file__)
EXAM_VERSION_ID = 'ver-maharashtra-police-2026'

with open(os.path.join(BASE_DIR, 'maharashtra_police_bank.json'), 'r', encoding='utf-8') as f:
    all_qs = json.load(f)

def get_sample_qs(qs, subject_id, ratio=0.5):
    sub_qs = [q for q in qs if q['subject_id'] == subject_id]
    count = int(len(sub_qs) * ratio)
    return sub_qs[:count]

# 50% sampling from each of the 4 subjects (150 Qs each)
mg_sample = get_sample_qs(all_qs, 'maharashtra-police-marathi-grammar', 0.50)
mth_sample = get_sample_qs(all_qs, 'maharashtra-police-mathematics', 0.50)
rs_sample = get_sample_qs(all_qs, 'maharashtra-police-reasoning', 0.50)
gk_sample = get_sample_qs(all_qs, 'maharashtra-police-general-knowledge', 0.50)

grand_bundle = mg_sample + mth_sample + rs_sample + gk_sample

print(f"Sampled Grand Maharashtra Police Bundle: {len(grand_bundle)} questions (MG:{len(mg_sample)}, MTH:{len(mth_sample)}, RS:{len(rs_sample)}, GK:{len(gk_sample)})")

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
        'note_id': 'note-maharashtra-police-grand-blueprint',
        'exam_version_id': EXAM_VERSION_ID,
        'subject_id': 'maharashtra-police-general-knowledge',
        'language_id': 'hi',
        'note_type': 'ALL_SUBJECTS_SUPER_BUNDLE',
        'title': 'Maharashtra Police Constable & Driver Comprehensive Examination Blueprint & All-Subject Master Guide (महाराष्ट्र पोलीस भरती सर्वसमावेशक मार्गदर्शक)',
        'summary': f'Comprehensive examination master repository containing {len(grand_bundle)} sampled questions across all 4 subjects (Marathi Grammar, Mathematics, Reasoning, General Knowledge & Police Administration) representing official Maharashtra Police Written Exam standards.',
        'content': f"""# Maharashtra Police Constable & Driver Comprehensive Examination Blueprint & All-Subject Master Guide

## 1. Conducting Authority & Examination Scheme
- **Conducting Agency**: Maharashtra State Police Recruitment Board (महाराष्ट्र राज्य पोलीस भरती मंडळ, मुंबई).
- **Official Portals**: mahapolice.gov.in & policerecruitment2024.mahait.org
- **Test Format**: Objective Multiple Choice Written Test (100 Questions / 100 Marks).
- **Duration**: 90 Minutes (1.5 Hours).
- **Marking Scheme**: **1.0 Mark** per correct answer, **0.0 Negative Marking** (no negative marking).
- **Physical Eligibility Threshold**: Minimum 50% marks in Physical Test (PET/PST - 50 Marks) required to qualify for written exam.

## 2. Official Subject Sections & Marks Distribution
1. **अंकगणित (Mathematics & Numerical Ability)**: 25 Questions = 25 Marks
2. **बुद्धिमत्ता चाचणी (Intellectual Test & Logical Reasoning)**: 25 Questions = 25 Marks
3. **मराठी व्याकरण (Marathi Grammar & Vocabulary)**: 25 Questions = 25 Marks
4. **सामान्य ज्ञान व चालू घडामोडी (General Knowledge, Current Affairs & Maharashtra Special)**: 25 Questions = 25 Marks

## 3. All-Subject Master Bundle Sampling (50% Uniform Representation)
This bundled revision dossier contains exactly **{len(grand_bundle)} representative questions** sampled directly from the official Maharashtra Police question bank across all 4 subjects:
- **Marathi Grammar & Vocabulary**: {len(mg_sample)} Questions
- **Mathematics & Numerical Ability**: {len(mth_sample)} Questions
- **Intellectual Test & Logical Reasoning**: {len(rs_sample)} Questions
- **General Knowledge, Maharashtra Special & Police Administration**: {len(gk_sample)} Questions

## 4. Key Representative Questions Excerpt
{build_q_summary_markdown(grand_bundle, 16)}

## 5. Strategic Preparation Advice for Maharashtra Police Aspirants
- Maintain strict time management: 90 minutes for 100 questions allows less than 1 minute per question.
- Master Marathi grammar concepts thoroughly as 25 marks in Marathi are high-scoring.
- Practice arithmetic calculations (BODMAS, percentages, ratios, time & work) daily without calculator.
- Review Maharashtra geography, forts, police hierarchy (DGP, Range IG, SP), and Motor Vehicles Act rules for Driver post.
"""
    },
    {
        'note_id': 'note-maharashtra-police-marathi-grammar',
        'exam_version_id': EXAM_VERSION_ID,
        'subject_id': 'maharashtra-police-marathi-grammar',
        'language_id': 'hi',
        'note_type': 'SUBJECT_MASTER_BUNDLE',
        'title': 'Maharashtra Police Marathi Grammar & Vocabulary Comprehensive Master Guide (मराठी व्याकरण, शब्दसंग्रह व आकलन)',
        'summary': f'In-depth study notes covering Marathi phonetics (वर्णविचार), sandhi (संधी), parts of speech (नाम, सर्वनाम, विशेषण, क्रियापद), prayog, samas, alankar, idioms and vocabulary with {len(mg_sample)} sampled practice questions.',
        'content': f"""# Marathi Grammar & Vocabulary (मराठी व्याकरण, शब्दसंग्रह व आकलन) - Comprehensive Revision Notes

## 1. Core Grammar Topics & Rules
- **वर्णविचार**: एकूण वर्ण ५२ (स्वरादी २, स्वर १४ - 'अॅ' व 'ऑ' सह, व्यंजने ३४, विशेष संयुक्त व्यंजने २: क्ष व ज्ञ). 'ळ' हा स्वतंत्र वर्ण आहे.
- **संधी**: स्वरसंधी (सूर्योदय = सूर्य + उदय), व्यंजनसंधी (सज्जन = सत् + जन), विसर्गसंधी (मनोरथ = मनः + रथ). मराठीतील विशेष संधी: पूर्वरूप व पररूप संधी.
- **शब्दांच्या जाती**: नाम (सामान्य, विशेष, भाववाचक), सर्वनाम (पुरुषवाचक, दर्शक, संबंधी, प्रश्नार्थक, अनिश्चित, आत्मवाचक), विशेषण (गुण, संख्या, सार्वनामिक), क्रियापद (सकर्मक, अकर्मक, द्विकर्मक, संयुक्त, सहाय्यक).
- **प्रयोग**:
  - *कर्तरी प्रयोग*: क्रियापद कर्त्याच्या लिंग-वचनानुसार बदलते (तो आंबा खातो / ती आंबा खाते).
  - *कर्मणी प्रयोग*: क्रियापद कर्माच्या लिंग-वचनानुसार बदलते (रामाने आंबा खाल्ला / रामाने चिंच खाल्ली).
  - *भावे प्रयोग*: कर्ता व कर्म दोघांनाही प्रत्यय असतो, क्रियापद तृ.पु. नपुंसकलिंगी एकावचनी असते (रामाने रावणास मारले).
- **समास**: अव्ययीभाव (प्रतिदिन, यथाशक्ती), तत्पुरुष (राजपुत्र, नीलकमल, त्रिभुवन), द्वंद्व (रामलक्ष्मण, भाजीपाला), बहुव्रीही (लंबोदर, चक्रपाणी).
- **अलंकार**: अनुप्रास (नादमधुर्य), यमक, श्लेष, उपमा ('परी, सारखा'), उत्प्रेक्षा ('जणू, गमे'), रूपक (अभेद), दृष्टान्त (दाखला).

## 2. Sampled Practice Question Bank ({len(mg_sample)} Questions - 50% Sampling)
{build_q_summary_markdown(mg_sample, 14)}
"""
    },
    {
        'note_id': 'note-maharashtra-police-mathematics',
        'exam_version_id': EXAM_VERSION_ID,
        'subject_id': 'maharashtra-police-mathematics',
        'language_id': 'hi',
        'note_type': 'SUBJECT_MASTER_BUNDLE',
        'title': 'Maharashtra Police Mathematics & Numerical Ability Complete Formula Sheet & Practice Guide (अंकगणित व संख्यात्मक अभियोग्यता)',
        'summary': f'Complete quantitative aptitude formula compendium covering number system, HCF-LCM, average, ratio, percentage, profit-loss, simple-compound interest, time-work, speed-distance and mensuration with {len(mth_sample)} practice questions.',
        'content': f"""# Mathematics & Numerical Ability (अंकगणित व संख्यात्मक अभियोग्यता) - Complete Formula Sheet

## 1. Key Formulas & Shortcut Rules
- **संख्याज्ञान**: १ ते १०० मध्ये २५ मूळ संख्या. n क्रमवार संख्यांची बेरीज = [n(n+1)] / 2.
- **मसावि व लसावि**: पहिली संख्या x दुसरी संख्या = लसावि x मसावि.
- **सरासरी**: सरासरी = घटकांची एकूण बेरीज / एकूण संख्या.
- **गुणोत्तर व प्रमाण**: चतुर्थ प्रमाणपद d = (b x c) / a.
- **टक्केवारी**: वाढ/घट% = (बदल / मूळ किंमत) x १००.
- **नफा व तोटा**: शेकडा नफा = (नफा x १००) / खरेदी किंमत. विक्री किंमत = छापील किंमत - सूट.
- **सरळव्याज व चक्रवाढव्याज**: SI = (P x R x N) / 100. २ वर्षांतील फरक = P x (R/100)².
- **काळ आणि काम**: अ x दिवसांत, ब y दिवसांत => दोघे मिळून = (xy) / (x + y) दिवसांत.
- **वेग, अंतर व वेळ**: अंतर = वेग x वेळ. किमी/तास चे मी/से मध्ये रूपांतर: ५/१८ ने गुणावे.
- **भूमिती**: आयताचे क्षेत्रफळ = लांबी x रुंदी. चौरसाची परिमिती = ४ x बाजू. वर्तुळाचे क्षेत्रफळ = πr².

## 2. Sampled Practice Question Bank ({len(mth_sample)} Questions - 50% Sampling)
{build_q_summary_markdown(mth_sample, 14)}
"""
    },
    {
        'note_id': 'note-maharashtra-police-reasoning',
        'exam_version_id': EXAM_VERSION_ID,
        'subject_id': 'maharashtra-police-reasoning',
        'language_id': 'hi',
        'note_type': 'SUBJECT_MASTER_BUNDLE',
        'title': 'Maharashtra Police Intellectual Test & Logical Reasoning Strategic Master Guide (बुद्धिमत्ता चाचणी व तर्कक्षमता)',
        'summary': f'Strategic intellectual reasoning guide covering series, analogies, classification, coding-decoding, direction test, blood relations, clock-calendar, order-ranking, syllogism and spatial reasoning with {len(rs_sample)} practice questions.',
        'content': f"""# Intellectual Test & Logical Reasoning (बुद्धिमत्ता चाचणी व तर्कक्षमता) - Strategic Master Guide

## 1. Core Reasoning Concepts & Logic
- **मालिका**: अंक मालिका (वर्ग, घन, फरक), अक्षर मालिका (A=1 ते Z=26, विरुद्ध अक्षरे - बेरीज 27).
- **सांकेतिक भाषा (Coding)**: अक्षरांचे स्थानांतर (+1, +2, +3), अक्षरांचे संख्या मूल्य, शब्द संकेतीकरण.
- **दिशा व अंतर ज्ञान चाचणी**: मुख्य ४ दिशा (उत्तर, दक्षिण, पूर्व, पश्चिम), उपदिशा (ईशान्य, आग्नेय, नैऋत्य, वायव्य). काटकोन वळणावर पायथागोरस प्रमेय: कर्ण² = पाया² + उंची².
- **नातेसंबंध**: कुटुंब वृक्ष (Family Tree) रेखाटन; स्वतःवरून संबंधांची पडताळणी.
- **घड्याळ व दिनदर्शिका**:
  - घड्याळातील दोन काट्यांमधील कोन = |३० x तास - ५.५ x मिनिटे|.
  - २४ तासांत दोन्ही काटे २२ वेळा एकमेकांवर येतात आणि ४४ वेळा काटकोन करतात.
  - साध्या वर्षात १ जादा दिवस, लीप वर्षात २ जादा दिवस.
- **रांगेतील स्थान**: एकूण व्यक्ती = डावीकडील क्रमांक + उजवीकडील क्रमांक - १.
- **वेन आकृत्या व युक्तिवाद**: सर्व, काही, कोणतेही नाही या विधानांची तार्किक पडताळणी.

## 2. Sampled Practice Question Bank ({len(rs_sample)} Questions - 50% Sampling)
{build_q_summary_markdown(rs_sample, 14)}
"""
    },
    {
        'note_id': 'note-maharashtra-police-general-knowledge',
        'exam_version_id': EXAM_VERSION_ID,
        'subject_id': 'maharashtra-police-general-knowledge',
        'language_id': 'hi',
        'note_type': 'SUBJECT_MASTER_BUNDLE',
        'title': 'Maharashtra Police GK, History, Geography, Polity & Police Administration Compendium (सामान्य ज्ञान, महाराष्ट्र विशेष व पोलीस प्रशासन)',
        'summary': f'Comprehensive general knowledge dossier covering Chhatrapati Shivaji Maharaj history, social reformers, Maharashtra geography, national parks, constitution, police hierarchy, Motor Vehicles Act and government schemes with {len(gk_sample)} practice questions.',
        'content': f"""# General Knowledge, Maharashtra Special & Police Administration - Comprehensive Compendium

## 1. Key Syllabus Landmarks
- **महाराष्ट्र पोलीस प्रशासन**:
  - ध्येयवाक्य: 'सद्रक्षणाय खलनिग्रहणाय' (सज्जनांचे रक्षण आणि दुर्जनांचे निर्दालन).
  - स्थापना दिन: २ जानेवारी १९६१ (पंडित जवाहरलाल नेहरूंनी पोलीस ध्वज प्रदान केला).
  - पोलीस प्रमुख: पोलीस महासंचालक (DGP), मुख्यालय मुंबई.
  - आपत्कालीन मदत: डायल ११२ (ERSS).
- **छत्रपती शिवाजी महाराज व मराठा इतिहास**:
  - जन्म: १९ फेब्रुवारी १६३० (शिवनेरी किल्ला, जुन्नर, पुणे).
  - राज्याभिषेक: ६ जून १६७४ (रायगड किल्ला, गागाभट्ट). अष्टप्रधान मंडळ.
- **महाराष्ट्रातील समाजसुधारक**:
  - महात्मा जोतीराव फुले: सत्यशोधक समाज (१८७३), मुलींची पहिली शाळा (१८४८, भिडे वाडा, पुणे), 'गुलामगिरी' ग्रंथ.
  - क्रांतीज्योती सावित्रीबाई फुले: पहिल्या महिला मुख्याध्यापिका.
  - डॉ. बाबासाहेब आंबेडकर: महाड चवदार तळे सत्याग्रह (२० मार्च १९२७), मूकनायक (१९२०), भारतीय संविधान मसुदा समिती अध्यक्ष.
  - राजर्षी छत्रपती शाहू महाराज: ५०% आरक्षण जाहीरनामा (२६ जुलै १९०२, कोल्हापूर).
- **महाराष्ट्र भूगोल**:
  - सर्वोच्च शिखर: कळसूबाई (१,६४६ मी, सह्याद्री पर्वत).
  - प्रमुख नद्या: गोदावरी (त्र्यंबकेश्वर), कृष्णा (महाबळेश्वर), भीमा (भीमाशंकर), तापी.
  - ३६ जिल्हे, ६ प्रशासकीय महसूल विभाग (३६ वा जिल्हा पालघर - १ ऑगस्ट २०१४).
- **राष्ट्रीय उद्याने व युनेस्को वारसा स्थळे**:
  - ताडोबा (चंद्रपूर), संजय गांधी (बोरीवली मुंबई), चांदोली, गुगामल (मेळघाट), नवेगाव, पेंच.
  - अजिंठा व वेरूळ लेणी, एलिफंटा, छत्रपती शिवाजी महाराज टर्मिनस, कास पठार.
- **मोटार वाहन कायदा (वाहतूक नियम)**:
  - कलम १८५: मद्यपान करून वाहन चालवणे (३० मिग्रॅ/१०० मिली रक्तापेक्षा जास्त अल्कोहोल).
  - कलम १२९: हेल्मेट सक्ती; कलम १९४B: सीटबेल्ट सक्ती.

## 2. Sampled Practice Question Bank ({len(gk_sample)} Questions - 50% Sampling)
{build_q_summary_markdown(gk_sample, 14)}
"""
    }
]

out_notes_file = os.path.join(BASE_DIR, 'maharashtra_police_bundled_notes.json')
with open(out_notes_file, 'w', encoding='utf-8') as f:
    json.dump(notes, f, ensure_ascii=False, indent=2)

print(f"✅ Generated {len(notes)} master bundled study notes for Maharashtra Police at {out_notes_file}")
