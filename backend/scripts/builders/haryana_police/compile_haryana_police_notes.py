"""
Haryana Police Constable Bundled Study Notes and Compilers
Generates 5 master bundled notes sampling 50% representative questions (within 40%-60% requirement)
across all subjects for Haryana Police Constable Examination.
"""

import json
import os
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = os.path.dirname(__file__)
EXAM_VERSION_ID = 'ver-haryana-police-2026'

with open(os.path.join(BASE_DIR, 'haryana_police_bank.json'), 'r', encoding='utf-8') as f:
    all_qs = json.load(f)

def get_sample_qs(qs, subject_id, ratio=0.5):
    sub_qs = [q for q in qs if q['subject_id'] == subject_id]
    count = int(len(sub_qs) * ratio)
    return sub_qs[:count]

# 50% sampling from each of the 4 subjects (150 Qs each)
gk_sample = get_sample_qs(all_qs, 'haryana-police-haryana-gk', 0.50)
agri_sample = get_sample_qs(all_qs, 'haryana-police-agriculture-animal-husbandry', 0.50)
rm_sample = get_sample_qs(all_qs, 'haryana-police-reasoning-maths', 0.50)
cgs_sample = get_sample_qs(all_qs, 'haryana-police-computer-general-studies', 0.50)

grand_bundle = gk_sample + agri_sample + rm_sample + cgs_sample

print(f"Sampled Grand Haryana Police Bundle: {len(grand_bundle)} questions (GK:{len(gk_sample)}, AGRI:{len(agri_sample)}, RM:{len(rm_sample)}, CGS:{len(cgs_sample)})")

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
        'note_id': 'note-haryana-police-grand-blueprint',
        'exam_version_id': EXAM_VERSION_ID,
        'subject_id': 'haryana-police-haryana-gk',
        'language_id': 'hi',
        'note_type': 'ALL_SUBJECTS_SUPER_BUNDLE',
        'title': 'Haryana Police Constable Comprehensive Examination Blueprint & All-Subject Master Guide (हरियाणा पुलिस सिपाही भर्ती परीक्षा सर्वोत्कृष्ट संपूर्ण मार्गदर्शिका)',
        'summary': f'Comprehensive examination master repository containing {len(grand_bundle)} sampled questions across all 4 subjects (Haryana GK, Agriculture & Animal Husbandry, Reasoning & Maths, Computer & General Studies) representing official HSSC Knowledge Test standards.',
        'content': f"""# Haryana Police Constable Comprehensive Examination Blueprint & All-Subject Master Guide

## 1. Conducting Authority & Examination Scheme
- **Conducting Agency**: Haryana Staff Selection Commission (HSSC), Bays No. 67-70, Sector-2, Panchkula, Haryana 134151.
- **Official Portals**: hssc.gov.in & haryanapolice.gov.in
- **Examination Stage**: Knowledge Test (CBT / OMR - 100 Objective Questions / 94.5 Marks normalized weightage).
- **Duration**: 105 Minutes (1 Hour 45 Minutes).
- **Marking Scheme**: **1.0 Mark** per question (or 0.945 scaled), **0.0 Negative Marking** (No negative marking for wrong answers; 5th option mandatory for unattempted questions under HSSC rules).
- **Physical Screening Test (PST) & Physical Measurement Test (PMT)**:
  - Male: 2.5 km Run in 12 minutes | Height: 170 cm, Chest: 83-87 cm.
  - Female: 1.0 km Run in 6 minutes | Height: 158 cm.
  - Ex-Servicemen: 1.0 km Run in 5 minutes.

## 2. Official Subject Sections & Curriculum Weightage
1. **Haryana General Knowledge, History, Geography, Culture & Administration**: 25% weightage (Mandatory state special focus).
2. **Agriculture, Animal Husbandry & General Science**: 25% weightage (Farming, Dairy, Murrah breed, Veterinary science, Physics, Chemistry, Biology).
3. **Reasoning Ability & Numerical Aptitude (Mathematics)**: 25% weightage (Logical reasoning, Series, Blood relations, Arithmetic, Mensuration).
4. **Computer Knowledge, General Studies & Police Administration**: 25% weightage (Mandatory 10% computer questions, Indian polity, Haryana police ranks, Dial 112, Motor Vehicles Act).

## 3. All-Subject Master Bundle Sampling (50% Uniform Representation)
This bundled revision dossier contains exactly **{len(grand_bundle)} representative questions** sampled directly from the official Haryana Police question bank across all 4 subjects:
- **Haryana General Knowledge & Administration**: {len(gk_sample)} Questions
- **Agriculture, Animal Husbandry & Science**: {len(agri_sample)} Questions
- **Reasoning Ability & Mathematics**: {len(rm_sample)} Questions
- **Computer Knowledge & General Studies**: {len(cgs_sample)} Questions

## 4. Key Representative Questions Excerpt
{build_q_summary_markdown(grand_bundle, 16)}

## 5. Strategic Preparation Advice for Haryana Police Constable Aspirants
- **State GK Advantage**: Haryana GK accounts for 20-25 questions. Master district profiles, 1857 leaders (Rao Tula Ram), state symbols, and rivers.
- **Agriculture & Animal Husbandry Focus**: Unique to Haryana Police recruitment. NDRI Karnal, CIRB Hisar, Murrah buffalo ('Black Gold'), HAU Hisar, and crop cycles are high-scoring.
- **Computer Literacy**: HSSC mandates minimum 10 questions on basic computer concepts (RAM, ROM, Excel, shortcuts, internet security).
- **Time Management**: 100 questions in 105 minutes offers ample time (approx 1 minute per question). Attempt all questions confidently since there is no negative marking penalty.
"""
    },
    {
        'note_id': 'note-haryana-police-haryana-gk',
        'exam_version_id': EXAM_VERSION_ID,
        'subject_id': 'haryana-police-haryana-gk',
        'language_id': 'hi',
        'note_type': 'SUBJECT_MASTER_BUNDLE',
        'title': 'Haryana Special GK, History, Geography, Culture & Administration Compendium (हरियाणा सामान्य ज्ञान, इतिहास, भूगोल एवं संस्कृति संकलन)',
        'summary': f'In-depth study notes covering Haryana history, 3 Panipat battles, state formation (1 Nov 1966), Shivalik and Aravalli hills, national parks (Sultanpur, Kalesar), folk arts (Swang, Lakhmi Chand), state symbols and police administration with {len(gk_sample)} practice questions.',
        'content': f"""# Haryana General Knowledge, History, Geography & Culture - Master Revision Guide

## 1. Key Landmarks in Haryana History & Geography
- **प्राचीन एवं मध्यकालीन इतिहास**:
  - वैदिक सभ्यता: सरस्वती नदी के तट पर वेदों की रचना।
  - महाभारत युद्ध: कुरुक्षेत्र की 48 कोस की पावन भूमि, ज्योतिसर में भगवान श्रीकृष्ण द्वारा गीता का उपदेश।
  - हर्षवर्धन की राजधानी: थानेसर (कुरुक्षेत्र) - बाणभट्ट द्वारा रचित 'हर्षचरित'।
  - पानीपत के तीन ऐतिहासिक युद्ध:
    1. प्रथम युद्ध (21 अप्रैल 1526): बाबर ने इब्राहिम लोदी को हराया; मुगल साम्राज्य की स्थापना।
    2. द्वितीय युद्ध (5 नवंबर 1556): अकबर (बैरम खां) ने हेमू (हेमचंद्र विक्रमादित्य) को पराजित किया।
    3. तृतीय युद्ध (14 जनवरी 1761): अहमद शाह अब्दाली ने मराठों (सदाशिवराव भाऊ) को हराया।
- **1857 की क्रांति एवं स्वतंत्रता संग्राम**:
  - 10 मई 1857 को अंबाला छावनी से क्रांति की शुरुआत।
  - राव तुलाराम: रेवाड़ी के वीर नायक, नसीबपुर (नारनौल) के युद्ध में अंग्रेजों से लोहा लिया।
  - लाला लाजपत राय: हिसार को अपनी कर्मभूमि बनाया, आर्य समाज और कांग्रेस शाखा स्थापित की।
  - दीनबंधु सर छोटू राम: 'किसानों के मसीहा', पंजाब साहूकार पंजीकरण कानून 1934 व भाखड़ा बांध के जनक।
- **राज्य गठन एवं प्रशासनिक संरचना**:
  - 1 नवंबर 1966: पंजाब पुनर्गठन अधिनियम एवं शाह आयोग की सिफारिश पर भारत के 17वें राज्य के रूप में गठन।
  - प्रशासनिक मंडल (6): अंबाला, फरीदाबाद, गुरुग्राम, हिसार, रोहतक, करनाल।
  - कुल जिले: 22 जिले (22वां जिला: चरखी दादरी - 2016)।
- **भूगोल, नदियां एवं वन्यजीव**:
  - सर्वोच्च शिखर: करोह चोटी (1,467 मीटर, मोरनी पहाड़ियां, पंचकूला - शिवालिक श्रेणी)।
  - दक्षिण में अरावली श्रेणी: धोसी की पहाड़ी (652 मीटर, महेंद्रगढ़ - महर्षि च्यवन तपोभूमि)।
  - प्रमुख नदियां: यमुना (पूर्वी सीमा), घग्गर-हाकरा, मारकंडा, टांगरी, सरस्वती, साहिबी।
  - राष्ट्रीय उद्यान (2):
    1. सुल्तानपुर राष्ट्रीय उद्यान (गुरुग्राम): प्रवासी पक्षियों हेतु विख्यात, रामसर आर्द्रभूमि।
    2. कालेसर राष्ट्रीय उद्यान (यमुनानगर): साल के वनों और सांभर/तेंदुओं हेतु प्रसिद्ध।
  - वन्यजीव अभयारण्य: भिंडावास (झज्जर - रामसर साइट), खप्पड़वास, बीर शिकारगाह (पंचकूला), छिलछिला।
- **कला, संस्कृति एवं राजकीय प्रतीक**:
  - स्वांग (सांग) लोकनाट्य: दीपचंद बहमन, पंडित लखमीचंद ('हरियाणा के सूर्यकवि'), मांगेराम।
  - प्रसिद्ध लोकनृत्य: धमाल (महाभारत कालीन), लूर, खोरिया, फाग, गुग्गा।
  - सूरजकुंड अंतरराष्ट्रीय शिल्प मेला: फरीदाबाद (प्रतिवर्ष फरवरी माह में)।
  - राजकीय प्रतीक: पशु - काला हिरण (Blackbuck); पक्षी - काला तीतर (Black Francolin); वृक्ष - पीपल; पुष्प - कमल।
- **हरियाणा पुलिस प्रशासन**:
  - ध्येय वाक्य: 'सेवा, सुरक्षा, सहयोग' (Seva, Suraksha, Sahyog)।
  - पुलिस मुख्यालय: सेक्टर-6, पंचकूला।
  - पुलिस अकादमी: मधुबन (करनाल)।
  - आपातकालीन सेवा: हरियाणा डायल 112 (SERC पंचकूला)। महिला सुरक्षा: ऑपरेशन दुर्गा (2017)।

## 2. Sampled Practice Question Bank ({len(gk_sample)} Questions - 50% Sampling)
{build_q_summary_markdown(gk_sample, 14)}
"""
    },
    {
        'note_id': 'note-haryana-police-agriculture-animal-husbandry',
        'exam_version_id': EXAM_VERSION_ID,
        'subject_id': 'haryana-police-agriculture-animal-husbandry',
        'language_id': 'hi',
        'note_type': 'SUBJECT_MASTER_BUNDLE',
        'title': 'Agriculture, Animal Husbandry & General Science Complete Compendium (कृषि, पशुपालन एवं सामान्य विज्ञान संपूर्ण संकलन)',
        'summary': f'Comprehensive study notes covering Haryana agriculture, Kharif/Rabi seasons, NDRI Karnal, Murrah buffalo ("Black Gold"), cattle health, veterinary diseases, physics, chemistry, biology and nutrition with {len(agri_sample)} practice questions.',
        'content': f"""# Agriculture, Animal Husbandry & General Science - Master Revision Compendium

## 1. Key Agricultural & Veterinary Knowledge Points
- **हरियाणा में कृषि एवं फसलें**:
  - खरीफ फसलें (मानसून): धान, कपास, बाजरा, गन्ना, ग्वार, मक्का।
  - रबी फसलें (शीतकालीन): गेहूं, सरसों (महेंद्रगढ़ अग्रणी), चना, जौ।
  - हरित क्रांति: 1960 के दशक में एम. एस. स्वामीनाथन के नेतृत्व में हरियाणा गेहूं और चावल का कटोरा बना।
  - प्रमुख शोध संस्थान: चौधरी चरण सिंह हरियाणा कृषि विश्वविद्यालय (CCSHAU हिसार, स्थापना 1970)।
  - मृदा एवं उर्वरक: जलोढ़ मृदा (सर्वाधिक उपजाऊ), NPK आदर्श अनुपात (4:2:1), मृदा स्वास्थ्य कार्ड योजना।
- **पशुपालन एवं डेयरी विकास (दूध की हांड़ी)**:
  - राष्ट्रीय डेयरी अनुसंधान संस्थान (NDRI करनाल): 1955 में स्थापित, भारत का प्रमुख डेयरी शोध संस्थान (प्रथम क्लोन 'गरिमा')।
  - केंद्रीय भैंस अनुसंधान संस्थान (CIRB हिसार): 1985 में स्थापित, भैंस प्रजनन एवं क्लोनिंग शोध केंद्र।
  - लाला लाजपत राय पशु चिकित्सा एवं पशु विज्ञान विश्वविद्यालय (LUVAS हिसार): 2010 में स्थापित।
- **पशु नस्लें एवं विशेषताएं**:
  - मुर्रा भैंस (Murrah Buffalo): 'हरियाणा का काला सोना' (Black Gold), जलेबीनुमा मुड़े सींग, सर्वाधिक दूध उत्पादन (15-25 लीटर/दिन)।
  - हरियाणवी गाय (Hariana Cattle): द्विकाजी नस्ल (दूध एवं कृषि कार्य हेतु श्रेष्ठ), सफेद/धूसर रंग।
  - साहीवाल गाय: सर्वाधिक मीठा दूध (A2 दूध), लाल/भूरा रंग।
  - बीतल बकरी (Beetal Goat): पंजाब-हरियाणा की श्रेष्ठ दुधारू बकरी।
- **पशु स्वास्थ्य, रोग एवं प्रबंधन**:
  - खुरपका-मुंहपका रोग (FMD): वायरस (Picornavirus) जनित अति संक्रामक रोग।
  - एंथ्रेक्स (Anthrax): बैसिलस एंथ्रेसिस जीवाणु जनित घातक जूनोटिक रोग।
  - गलघोंटू (Haemorrhagic Septicaemia): पाश्चुरेला मल्टोसीडा जीवाणु जनित वर्षा ऋतु का रोग।
  - थनैला रोग (Mastitis): अयन/स्तनों की सूजन, दूध की गुणवत्ता में गिरावट।
  - खीस (Colostrum): जन्म के तुरंत बाद नवजात बछड़े को रोग प्रतिरोधक क्षमता (Immunoglobulins) हेतु खीस पिलाना अनिवार्य।
- **सामान्य विज्ञान (भौतिकी, रसायन, जीवविज्ञान)**:
  - न्यूटन के गति के नियम: जड़त्व का नियम (पहला), F = ma (दूसरा), क्रिया-प्रतिक्रिया (तीसरा)।
  - प्रकाशिकी: उत्तल लेंस (दूर दृष्टि दोष निवारण), अवतल लेंस (निकट दृष्टि दोष निवारण)।
  - रासायनिक यौगिक: यूरिया [CO(NH₂)₂ - 46% नाइट्रोजन], विरंजक चूर्ण (CaOCl₂), बेकिंग सोडा (NaHCO₃)।
  - विटामिन एवं हीनता जन्य रोग: विटामिन A (रतौंधी), विटामिन B1 (बेरीबेरी), विटामिन C (स्कर्वी), विटामिन D (रिकेट्स)।

## 2. Sampled Practice Question Bank ({len(agri_sample)} Questions - 50% Sampling)
{build_q_summary_markdown(agri_sample, 14)}
"""
    },
    {
        'note_id': 'note-haryana-police-reasoning-maths',
        'exam_version_id': EXAM_VERSION_ID,
        'subject_id': 'haryana-police-reasoning-maths',
        'language_id': 'hi',
        'note_type': 'SUBJECT_MASTER_BUNDLE',
        'title': 'Haryana Police Reasoning Ability & Numerical Aptitude Formula & Strategy Guide (तर्कशक्ति एवं अंकगणित संपूर्ण सूत्र संग्रह)',
        'summary': f'Comprehensive analytical guide covering coding-decoding, number series, direction test, blood relations, clock-calendar, seating arrangement, percentages, profit-loss, interest, time-work, speed and mensuration with {len(rm_sample)} practice questions.',
        'content': f"""# Reasoning Ability & Numerical Aptitude - Comprehensive Formula & Strategy Guide

## 1. Core Reasoning Concepts & Mathematical Formulas
- **तर्कशक्ति एवं मानसिक क्षमता**:
  - कोडिंग-डिकोडिंग: वर्णमाला स्थानीय मान (A=1 से Z=26), विपरीत वर्ण युग्म (योग = 27, जैसे A-Z, B-Y, C-X)।
  - दिशा एवं दूरी: पाइथागोरस प्रमेय (कर्ण = √(लंब² + आधार²)), सुबह की छाया पश्चिम तथा शाम की छाया पूर्व दिशा में।
  - रक्त संबंध: पारिवारिक वृक्ष आरेख, पीढ़ी अंतराल (+1 माता-पिता, 0 भाई-बहन, -1 संतान)।
  - घड़ी परीक्षण: सुइयों के बीच कोण = |30H - 5.5M|; 12 घंटे में सुइयां 11 बार संपाती (0°) और 22 बार समकोण (90°) बनाती हैं।
  - कैलेंडर: सामान्य वर्ष में 1 विषम दिन, लीप वर्ष में 2 विषम दिन (366 दिन)।
  - बैठक व्यवस्था: पंक्ति में कुल व्यक्ति = बाएं से स्थान + दाएं से स्थान - 1।
- **संख्यात्मक अभियोग्यता (अंकगणित)**:
  - बोडमास नियम: कोष्ठक (B) -> का/घातांक (O) -> भाग (D) -> गुणा (M) -> जोड़ (A) -> घटाव (S)।
  - ल.स. एवं म.स.: पहली संख्या × दूसरी संख्या = ल.स. × म.स.।
  - प्रतिशत एवं लाभ-हानि:
    - लाभ % = (लाभ / क्रय मूल्य) × 100। क्रय मूल्य = (विक्रय मूल्य × 100) / (100 + लाभ %)।
    - समतुल्य बट्टा = d₁ + d₂ - (d₁ × d₂) / 100।
  - साधारण एवं चक्रवृद्धि ब्याज:
    - साधारण ब्याज SI = (P × R × T) / 100।
    - 2 वर्ष के CI और SI का अंतर = P × (R / 100)²।
  - समय, कार्य एवं नल-टंकी: संयुक्त समय = (A × B) / (A + B)। कार्य क्षमता = 1 / लगा समय।
  - चाल, समय एवं दूरी: किमी/घंटा को मी/सेकंड में बदलने हेतु 5/18 से गुणा। सापेक्ष चाल (विपरीत दिशा = योग, समान दिशा = अंतर)।
  - क्षेत्रमिति (2D & 3D):
    - आयत क्षेत्रफल = l × b; वृत्त क्षेत्रफल = πr² (परिधि = 2πr)।
    - बेलन आयतन = πr²h; गोला आयतन = 4/3 πr³।

## 2. Sampled Practice Question Bank ({len(rm_sample)} Questions - 50% Sampling)
{build_q_summary_markdown(rm_sample, 14)}
"""
    },
    {
        'note_id': 'note-haryana-police-computer-general-studies',
        'exam_version_id': EXAM_VERSION_ID,
        'subject_id': 'haryana-police-computer-general-studies',
        'language_id': 'hi',
        'note_type': 'SUBJECT_MASTER_BUNDLE',
        'title': 'Computer Knowledge, General Studies & Police Administration Compendium (कंप्यूटर ज्ञान, सामान्य अध्ययन एवं पुलिस प्रशासन संकलन)',
        'summary': f'Comprehensive study notes covering computer fundamentals (CPU, RAM, ROM, SSD), MS Office (Word, Excel), cyber security, Indian Constitution, Punjab & Haryana High Court, Haryana sports champions (Neeraj Chopra, Manu Bhaker), and traffic laws with {len(cgs_sample)} practice questions.',
        'content': f"""# Computer Knowledge, General Studies & Police Administration - Master Guide

## 1. Key Computer, Legal & General Studies Fundamentals
- **कंप्यूटर ज्ञान (HSSC 10% अनिवार्य पाठ्यक्रम)**:
  - कंप्यूटर की पीढ़ियां: प्रथम (वैक्यूम ट्यूब), द्वितीय (ट्रांजिस्टर), तृतीय (IC चिप्स), चतुर्थ (माइक्रोप्रोसेसर VLSI), पंचम (AI & ULSI)।
  - मेमोरी के प्रकार: RAM (अस्थिर/Volatile), ROM (स्थायी/Non-volatile, BIOS बूटस्ट्रैप), SSD (फास्ट फ्लैश स्टोरेज), कैश मेमोरी (अति-तीव्र SRAM)।
  - एमएस एक्सेल: प्रत्येक फॉर्मूला '=' चिह्न से शुरू होता है; SUM, AVERAGE, IF, COUNT प्रमुख सूत्र हैं।
  - इंटरनेट एवं साइबर सुरक्षा:
    - IP पता: IPv4 (32 बिट्स - 4 ऑक्टेट), IPv6 (128 बिट्स)।
    - फ़िशिंग (Phishing): फर्जी ईमेल या वेबसाइट बनाकर व्यक्तिगत पासवर्ड चुराना।
    - आईटी अधिनियम 2000: धारा 66 (कंप्यूटर हैकिंग व डेटा चोरी पर 3 वर्ष तक कारावास)।
    - राष्ट्रीय साइबर अपराध रिपोर्टिंग पोर्टल: cybercrime.gov.in (हेल्पलाइन 1930)।
- **भारतीय राजव्यवस्था एवं संविधान**:
  - मौलिक अधिकार (भाग III, अनुच्छेद 12-35): अनुच्छेद 14 (समानता), अनुच्छेद 19 (अभिव्यक्ति स्वतंत्रता), अनुच्छेद 21 (प्राण एवं दैहिक स्वतंत्रता)।
  - पंजाब एवं हरियाणा उच्च न्यायालय: चंडीगढ़ के कैपिटल कॉम्प्लेक्स (सेक्टर-1) में स्थित, दोनों राज्यों व केंद्र शासित प्रदेश चंडीगढ़ का साझा उच्च न्यायालय।
  - 73वां संविधान संशोधन 1992: पंचायती राज संस्थाओं को संवैधानिक मान्यता (11वीं अनुसूची, 29 विषय)।
- **हरियाणा के खेल रत्न एवं पुरस्कार**:
  - नीरज चोपड़ा (पानीपत): टोक्यो ओलंपिक 2020 में भाला फेंक में ऐतिहासिक स्वर्ण पदक, विश्व एथलेटिक्स चैंपियन।
  - मनु भाकर (झज्जर): पेरिस ओलंपिक 2024 में 10 मीटर एयर पिस्टल में दोहरे कांस्य पदक विजेता।
  - भीम पुरस्कार (Bhim Award): हरियाणा का सर्वोच्च राज्य खेल सम्मान (₹5 लाख नकद, प्रशस्ति पत्र व ₹5,000 मासिक मानदेय)।
- **पुलिस प्रशासन एवं मोटर वाहन अधिनियम**:
  - पद सोपान क्रम: सिपाही -> हेड कांस्टेबल -> ASI -> सब-इंस्पेक्टर -> इंस्पेक्टर -> DSP -> SP -> DIG -> IG -> ADGP -> DGP (पुलिस महानिदेशक)।
  - आपातकालीन सेवा: डायल 112 (Panchkula SERC) - पुलिस, फायर और एम्बुलेंस की एकीकृत सेवा।
  - ऑपरेशन दुर्गा: 13 अप्रैल 2017 को सार्वजनिक स्थलों पर मनचलों से महिलाओं की सुरक्षा हेतु प्रारंभ।
  - मोटर वाहन अधिनियम 1988/2019:
    - धारा 129: दोपहिया वाहन चालक व पिछली सवारी दोनों हेतु बीआईएस मानक हेलमेट अनिवार्य।
    - धारा 185: शराब या मादक पदार्थों के प्रभाव में वाहन चलाना (Drunk Driving) सख्त दंडनीय अपराध।
    - धारा 194B: चारपहिया वाहन में सीटबेल्ट न पहनने पर जुर्माना।

## 2. Sampled Practice Question Bank ({len(cgs_sample)} Questions - 50% Sampling)
{build_q_summary_markdown(cgs_sample, 14)}
"""
    }
]

out_notes_file = os.path.join(BASE_DIR, 'haryana_police_bundled_notes.json')
with open(out_notes_file, 'w', encoding='utf-8') as f:
    json.dump(notes, f, ensure_ascii=False, indent=2)

print(f"✅ Generated {len(notes)} master bundled study notes for Haryana Police at {out_notes_file}")
