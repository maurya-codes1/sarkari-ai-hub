"""
Central Teacher Eligibility Test (CTET) Bundled Study Notes and Compilers
Generates exactly 5 master bundled notes sampling 50% representative questions (within 40%-60% requirement)
across all subjects for CTET (CBSE Paper I & Paper II).
"""

import json
import os
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = os.path.dirname(__file__)
EXAM_VERSION_ID = 'ver-ctet-exam-2026'

with open(os.path.join(BASE_DIR, 'ctet_bank.json'), 'r', encoding='utf-8') as f:
    all_qs = json.load(f)

def get_sample_qs(qs, subject_id, ratio=0.5):
    sub_qs = [q for q in qs if q['subject_id'] == subject_id]
    count = int(len(sub_qs) * ratio)
    return sub_qs[:count]

# 50% sampling from each of the 5 subjects (150 Qs each = 750 Qs grand bundle)
cdp_sample = get_sample_qs(all_qs, 'ctet-child-development-pedagogy', 0.50)
math_sample = get_sample_qs(all_qs, 'ctet-mathematics-pedagogy', 0.50)
evs_sample = get_sample_qs(all_qs, 'ctet-environmental-studies', 0.50)
lang_sample = get_sample_qs(all_qs, 'ctet-language-pedagogy', 0.50)
ss_sample = get_sample_qs(all_qs, 'ctet-social-science-science-pedagogy', 0.50)

grand_bundle = cdp_sample + math_sample + evs_sample + lang_sample + ss_sample
primary_core_bundle = math_sample + evs_sample

print(f"Sampled Grand CTET Bundle: {len(grand_bundle)} questions (CDP:{len(cdp_sample)}, MATH:{len(math_sample)}, EVS:{len(evs_sample)}, LANG:{len(lang_sample)}, SS:{len(ss_sample)})")

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
        'note_id': 'note-ctet-grand-blueprint',
        'exam_version_id': EXAM_VERSION_ID,
        'subject_id': 'ctet-child-development-pedagogy',
        'language_id': 'hi',
        'note_type': 'ALL_SUBJECTS_SUPER_BUNDLE',
        'title': 'CTET Comprehensive Examination Blueprint & All-Subject Master Guide (केंद्रीय शिक्षक पात्रता परीक्षा संपूर्ण मार्गदर्शिका)',
        'summary': f'Comprehensive examination master repository containing {len(grand_bundle)} sampled questions across all 5 subjects (Child Development & Pedagogy, Mathematics, EVS, Language Pedagogy, Science & Social Science) representing official CBSE CTET Paper I & II standards.',
        'content': f"""# CTET Comprehensive Examination Blueprint & All-Subject Master Guide

## 1. Conducting Authority & Examination Scheme
- **Conducting Agency**: Central Board of Secondary Education (CBSE), Delhi.
- **Official Portals**: ctet.nic.in & cbse.gov.in
- **Examination Structure**:
  - **Paper I** (For Primary Stage - Classes I to V): 150 MCQs / 150 Marks.
  - **Paper II** (For Elementary Stage - Classes VI to VIII): 150 MCQs / 150 Marks.
- **Duration**: 150 Minutes (2.5 Hours) per paper.
- **Marking Scheme**: **1.0 Mark** per correct answer, **0.0 Negative Marking** (No penalty for incorrect answers).
- **Qualifying Criteria**: 60% marks (90 out of 150 marks) for General category; 55% marks (82 out of 150 marks) for SC/ST/OBC/Differently Abled as per NCTE guidelines.
- **Validity of Certificate**: Lifetime validity across all central (KVS, NVS, Army Schools) and state schools.

## 2. Official Subject Sections & Marks Distribution
### Paper I (Classes I to V):
1. **Child Development and Pedagogy**: 30 Questions = 30 Marks
2. **Mathematics**: 30 Questions (15 Content + 15 Pedagogy) = 30 Marks
3. **Environmental Studies (EVS)**: 30 Questions (15 Content + 15 Pedagogy) = 30 Marks
4. **Language I** (Compulsory): 30 Questions (15 Comprehension + 15 Pedagogy) = 30 Marks
5. **Language II** (Compulsory): 30 Questions (15 Comprehension + 15 Pedagogy) = 30 Marks
Total: **150 Questions / 150 Marks**

### Paper II (Classes VI to VIII):
1. **Child Development and Pedagogy**: 30 Questions = 30 Marks
2. **Mathematics & Science OR Social Studies/Social Sciences**: 60 Questions = 60 Marks
3. **Language I**: 30 Questions = 30 Marks
4. **Language II**: 30 Questions = 30 Marks
Total: **150 Questions / 150 Marks**

## 3. All-Subject Master Bundle Sampling (50% Uniform Representation)
This bundled revision dossier contains exactly **{len(grand_bundle)} representative questions** sampled directly from the official CTET question bank across all 5 subjects:
- **Child Development & Pedagogy**: {len(cdp_sample)} Questions
- **Mathematics & Pedagogy**: {len(math_sample)} Questions
- **Environmental Studies & EVS Pedagogy**: {len(evs_sample)} Questions
- **Language I & II Pedagogy**: {len(lang_sample)} Questions
- **Science, Social Science & Upper Primary Pedagogy**: {len(ss_sample)} Questions

## 4. Key Representative Questions Excerpt
{build_q_summary_markdown(grand_bundle, 16)}

## 5. Strategic Preparation Advice for CTET Aspirants
- **Pedagogy is the Backbone**: In CTET, pedagogy constitutes 50% to 60% of all questions (75-90 marks out of 150). Master Piaget, Vygotsky, Kohlberg, inclusive education, and child-centered teaching.
- **NCERT Textbooks Foundation**:
  - Paper I EVS: NCERT Classes 3, 4, and 5 textbooks ('Looking Around' / 'आस-पास') cover 100% of the 15 content questions.
  - Paper I Math: Focus on primary math concepts, measurement, spatial geometry, and Van Hiele levels.
  - Paper II: Master NCERT Classes 6 to 8 Science and Social Science textbooks thoroughly.
- **No Negative Marking**: Attempt all 150 questions within the 150 minutes available (1 minute per question).
"""
    },

    # Note 2: Child Development and Pedagogy
    {
        'note_id': 'note-ctet-child-development-pedagogy',
        'exam_version_id': EXAM_VERSION_ID,
        'subject_id': 'ctet-child-development-pedagogy',
        'language_id': 'hi',
        'note_type': 'SUBJECT_MASTER_BUNDLE',
        'title': 'Child Development and Pedagogy Comprehensive Theory & Practice Guide (बाल विकास एवं शिक्षाशास्त्र संपूर्ण संकलन)',
        'summary': f'Comprehensive study notes covering Jean Piaget, Lev Vygotsky, Lawrence Kohlberg, Howard Gardner, progressive education (Dewey), inclusive education (RPwD Act 2016), learning disabilities (Dyslexia, Dysgraphia, ADHD), CCE, and motivation with {len(cdp_sample)} practice questions.',
        'content': f"""# Child Development and Pedagogy - Comprehensive Theory & Revision Guide

## 1. Core Psychological Theories & Pedagogical Concepts
- **जीन पियाजे का संज्ञानात्मक विकास सिद्धांत (Cognitive Development)**:
  - चार अवस्थाएं:
    1. इंद्रियजनित गामक (Sensorimotor, 0-2 वर्ष): वस्तु स्थायित्व (Object Permanence) का विकास।
    2. पूर्व-संक्रियात्मक (Pre-operational, 2-7 वर्ष): अहंकेंद्रितता (Egocentrism), जीववाद (Animism), केंद्रीकरण (Centration), संरक्षण का अभाव।
    3. मूर्त संक्रियात्मक (Concrete Operational, 7-11 वर्ष): संरक्षण (Conservation), उत्क्रमणीयता (Reversibility), श्रेणीकरण एवं विकेंद्रीकरण।
    4. अमूर्त संक्रियात्मक (Formal Operational, 11+ वर्ष): अमूर्त चिंतन, परिकल्पनात्मक-निगमनात्मक तर्क (Hypothetico-deductive reasoning)।
  - मानसिक प्रक्रियाएं: स्कीमा (Schema), आत्मसातीकरण (Assimilation), समायोजन (Accommodation), संतुलनीकरण (Equilibration)।
- **लेव वायगोत्स्की का सामाजिक-सांस्कृतिक सिद्धांत (Socio-Cultural Theory)**:
  - विकास में सामाजिक अंतःक्रिया और संस्कृति की मुख्य भूमिका।
  - समीपस्थ विकास का क्षेत्र (ZPD): वास्तविक विकास स्तर और संभावित विकास स्तर के बीच का अंतर।
  - पाड़ / मचान (Scaffolding): MKO (अधिक ज्ञानी अन्य) द्वारा दी जाने वाली अस्थायी सहायता।
  - निज संवाद (Private Speech): बच्चे द्वारा अपने विचारों व कार्यों को स्वनियंत्रित करने के लिए स्वयं से बोलना।
- **लॉरेंस कोहलबर्ग का नैतिक विकास सिद्धांत (Moral Development)**:
  - तीन स्तर एवं छह चरण: पूर्व-परंपरागत, परंपरागत और उत्तर-परंपरागत स्तर।
  - कैरोल गिलिगन की आलोचना: कोहलबर्ग के सिद्धांत में पुरुषों के 'न्याय परिप्रेक्ष्य' की प्रधानता और महिलाओं के 'देखभाल परिप्रेक्ष्य' की उपेक्षा।
- **हावर्ड गार्डनर का बहु-बुद्धि सिद्धांत (Multiple Intelligences)**:
  - 8 प्रकार की बुद्धिमत्ता: भाषाई, तार्किक-गणितीय, स्थानिक, शारीरिक-गतिक, संगीतात्मक, अंतर-वैयक्तिक (Interpersonal), अंतःवैयक्तिक (Intrapersonal), प्रकृतिवादी।
- **समावेशी शिक्षा एवं विशिष्ट आवश्यकता वाले बच्चे (CWSN)**:
  - दिव्यांगजन अधिकार अधिनियम (RPwD Act 2016): 21 दिव्यांगताएं।
  - विशिष्ट अधिगम अक्षमताएं: डिस्लेक्सिया (पठन कठिनाई), डिस्ग्राफिया (लेखन कठिनाई), डिस्कैलकुलिया (गणितीय गणना), डिस्प्रैक्सिया, एडीएचडी, ऑटिज्म।
- **आकलन एवं मूल्यांकन (Assessment & Evaluation)**:
  - अधिगम के लिए आकलन (Assessment for Learning): रचनात्मक (Formative)।
  - अधिगम का आकलन (Assessment of Learning): योगात्मक (Summative)।
  - सतत एवं व्यापक मूल्यांकन (CCE): सर्वांगीण प्रगति का सतत आकलन।

## 2. Sampled Practice Question Bank ({len(cdp_sample)} Questions - 50% Sampling)
{build_q_summary_markdown(cdp_sample, 14)}
"""
    },

    # Note 3: Primary Core - Mathematics & Environmental Studies Pedagogy
    {
        'note_id': 'note-ctet-primary-math-evs',
        'exam_version_id': EXAM_VERSION_ID,
        'subject_id': 'ctet-mathematics-pedagogy',
        'language_id': 'hi',
        'note_type': 'SUBJECT_MASTER_BUNDLE',
        'title': 'Primary Stage Core: Mathematics & Environmental Studies Integrated Pedagogy Guide (प्राथमिक गणित एवं पर्यावरण अध्ययन एकीकृत संकलन)',
        'summary': f'Comprehensive study notes covering Primary Mathematics (Van Hiele levels, TLM abacus, geo-board, dienes blocks, error analysis) and 6 NCERT EVS themes (animals, plants, shelters, water, travel, arts, integrated EVS) with {len(primary_core_bundle)} sampled questions (150 Math + 150 EVS).',
        'content': f"""# Primary Stage Core: Mathematics & Environmental Studies Integrated Pedagogy Guide

## 1. Mathematics Concepts & Van Hiele Levels
- **वैन हीले का ज्यामितीय चिंतन सिद्धांत (Van Hiele Levels)**:
  - स्तर 0: प्रत्यक्षीकरण (Visualization) - बाह्य स्वरूप से पहचानना (आयत को दरवाजा कहना)।
  - स्तर 1: विश्लेषण (Analysis) - आकृतियों के गुणों की पहचान।
  - स्तर 2: अनौपचारिक निगमन (Informal Deduction) - गुणों में संबंध (सभी वर्ग आयत हैं)।
  - स्तर 3: औपचारिक निगमन (Formal Deduction) - प्रमेयों की उपपत्ति।
- **गणित शिक्षण सहायक सामग्रियां (TLM)**:
  - अबेकस (गिनतारा): स्थानीय मान और दृष्टिबाधित शिक्षार्थियों हेतु।
  - जियो-बोर्ड: रबर बैंड से 2D आकृतियों का परिमाप, क्षेत्रफल व सममिति।
  - डीन्स ब्लॉक: आधार-10 ब्लॉक द्वारा पुनर्समूहन (हासिल) की समझ।
  - टैनग्राम: 7 टुकड़ों से स्थानिक समझ और क्षेत्रफल संरक्षण।
  - ऑयलर सूत्र: F + V - E = 2 (फलक + शीर्ष - किनारे = 2)।

## 2. Environmental Studies Core Themes & NCERT Key Facts
- **थीम 1: परिवार एवं मित्र (जंतु एवं पादप)**:
  - हाथियों का झुंड: बुजुर्ग हथिनी मुखिया; 100 किग्रा पत्ते; 2-4 घंटे नींद।
  - स्लॉथ: 17 घंटे उल्टे लटकना; 40 वर्ष जीवन; 8 पेड़।
  - भारत के 4 जहरीले सांप: नाग (Cobra), करैत (Krait), दुबोइया (Russell's Viper), अफाई (Saw-scaled Viper)।
  - घटपर्णी (नेपेंथीस): मेघालय का कीटभक्षी पौधा।
  - रेगिस्तानी ओक: ऑस्ट्रेलिया; 30 गुना गहरी जड़ें; तने में जमा पानी।
  - खेजड़ी वृक्ष: जोधपुर के खेजड़ली गांव में अमृता देवी विश्नोई का 1730 का बलिदान।
- **थीम 2: भोजन**: डॉ. बोमोंट का पेट का प्रयोग; हांगकांग का लिंग-हू-फेन; केरल का टैपियोका; गोवा में नारियल तेल में मछली; कश्मीर में सरसों के तेल में मछली।
- **थीम 3: आवास**: असम के 10-12 फीट ऊंचे बांस के घर; लद्दाख के दो मंजिला पत्थरों के घर; कश्मीर के हाउसबोट (खतमबंद); बुनकर पक्षी (बया); फाख्ता (कैक्टस कांटों में)।
- **थीम 4: जल**: बावड़ियां (Stepwells); घड़सीसर सरोवर; अल-बिरूनी; रोनाल्ड रॉस (मलेरिया मादा एनाफिलीज़); एनीमिया (आंवला, पालक, गुड़)।
- **थीम 5: यात्रा**: अरब सागर तट (गुजरात, महाराष्ट्र, गोवा, कर्नाटक, केरल); वल्लम नौका (केरल); चांगपा जनजाति व पश्मीना शॉल (6 स्वेटरों जितनी गर्म, 250 घंटे बुनाई); बछेंद्री पाल।
- **थीम 6: कला**: मधुबनी चित्रकला (बिहार); पोचमपल्ली साड़ियां (तेलंगाना); कन्नौज इत्र (यूपी); सूर्यमणि तोरंग केंद्र (झारखंड)।

## 3. Sampled Practice Question Bank ({len(primary_core_bundle)} Questions - 50% Sampling)
{build_q_summary_markdown(primary_core_bundle, 14)}
"""
    },

    # Note 4: Language Development and Pedagogy
    {
        'note_id': 'note-ctet-language-pedagogy',
        'exam_version_id': EXAM_VERSION_ID,
        'subject_id': 'ctet-language-pedagogy',
        'language_id': 'hi',
        'note_type': 'SUBJECT_MASTER_BUNDLE',
        'title': 'Language I & II Development, Pedagogy & Grammar Master Guide (भाषा विकास, शिक्षण शास्त्र एवं व्याकरण संकलन)',
        'summary': f'Comprehensive study notes covering Noam Chomsky (LAD, Universal Grammar), Stephen Krashen (Input hypothesis i+1, Affective filter), LSRW skills, skimming vs scanning, intensive vs extensive reading, multilingualism as a resource, grammar in context, and Hindi/English grammar with {len(lang_sample)} practice questions.',
        'content': f"""# Language Development, Pedagogy & Grammar - Master Revision Guide

## 1. Core Language Theories & Pedagogical Principles
- **नोम चॉम्स्की का भाषा अर्जन सिद्धांत (Noam Chomsky)**:
  - भाषा अर्जन यंत्र (LAD - Language Acquisition Device): सभी मानव शिशुओं में भाषा नियमों को सीखने की जन्मजात जैविक क्षमता होती है।
  - सार्वभौमिक व्याकरण (Universal Grammar): सभी भाषाओं के मूल में अंतर्निहित व्याकरणिक सिद्धांत समान होते हैं।
- **स्टीफन क्रैशन का द्वितीय भाषा अर्जन सिद्धांत (Stephen Krashen)**:
  - 5 परिकल्पनाएं:
    1. अर्जन-अधिगम परिकल्पना: स्वाभाविक अर्जन (अवचेतन) बनाम औपचारिक अधिगम (सचेत)।
    2. बोधगम्य इनपुट परिकल्पना (i + 1): शिक्षार्थी के वर्तमान स्तर से एक कदम आगे का इनपुट।
    3. भावात्मक फिल्टर परिकल्पना (Affective Filter): भय और तनाव भाषा अर्जन को बाधित करते हैं।
    4. प्राकृतिक क्रम परिकल्पना: व्याकरणिक संरचनाएं स्वाभाविक क्रम में सीखी जाती हैं।
    5. मॉनिटर परिकल्पना: सचेत व्याकरण केवल संपादन का कार्य करता है।
- **चार भाषाई कौशल (LSRW - सुनना, बोलना, पढ़ना, लिखना)**:
  - ग्रहणात्मक कौशल (Receptive Skills): सुनना और पढ़ना।
  - उत्पादक / अभिव्यक्तात्मक कौशल (Productive Skills): बोलना और लिखना।
- **पठन के उप-कौशल (Reading Sub-Skills)**:
  - सरसरी तौर पर पठन (Skimming): केंद्रीय भाव या सामान्य सारांश (Gist) जानने हेतु।
  - बारीकी से पठन (Scanning): किसी विशिष्ट तथ्य, नाम, तारीख या समय को ढूंढने हेतु।
  - गहन पठन (Intensive Reading): सूक्ष्म व्याकरणिक व भावार्थ विश्लेषण हेतु।
  - विस्तृत पठन (Extensive Reading): आनंद, रुचि और पठन प्रवाह (Fluency) विकसित करने हेतु।
- **बहुभाषिकता एक संसाधन के रूप में (Multilingualism as a Resource)**:
  - कक्षा में बच्चों की मातृभाषाएं समृद्ध संसाधन (Resource) हैं।
  - ट्रांसलैंग्वेजिंग (Translanguaging): लचीलेपन से दोनों भाषाओं का प्रयोग।
- **संदर्भ में व्याकरण शिक्षण (Grammar in Context)**:
  - आगमन विधि (Inductive Method): उदाहरण से नियम की ओर (विशिष्ट से सामान्य)।
  - प्रक्रिया आधारित लेखन (Process Writing): विचार-मंथन -> प्रारूपण -> संशोधन -> संपादन -> प्रकाशन।
- **व्याकरण के मुख्य नियम**:
  - हिन्दी: संधि (स्वर, व्यंजन, विसर्ग), समास (अव्ययीभाव, तत्पुरुष, कर्मधारय, आदि), उपसर्ग एवं प्रत्यय, तत्सम-तद्भव, विलोम-पर्यायवाची।
  - अंग्रेजी: Subject-Verb Agreement, Prepositions, Voice, Narration, Context Clues.

## 2. Sampled Practice Question Bank ({len(lang_sample)} Questions - 50% Sampling)
{build_q_summary_markdown(lang_sample, 14)}
"""
    },

    # Note 5: Science, Social Science & Upper Primary Pedagogy
    {
        'note_id': 'note-ctet-social-science-science-pedagogy',
        'exam_version_id': EXAM_VERSION_ID,
        'subject_id': 'ctet-social-science-science-pedagogy',
        'language_id': 'hi',
        'note_type': 'SUBJECT_MASTER_BUNDLE',
        'title': 'Science, Social Science & Upper Primary Pedagogy Compendium (विज्ञान, सामाजिक विज्ञान एवं उच्च प्राथमिक शिक्षाशास्त्र संकलन)',
        'summary': f'Comprehensive study notes covering Upper Primary Science (Nutrient tests, Cell biology, Acid-Bases, Physics mechanics), Social Studies (Ancient to Modern Indian history, Geography, Latitudes, Earth motions, Constitution, Judiciary, PIL, FIR) and secondary pedagogy with {len(ss_sample)} practice questions.',
        'content': f"""# Science, Social Science & Upper Primary Pedagogy - Master Compendium

## 1. Core Science, Social Studies & Pedagogical Principles
- **उच्च प्राथमिक विज्ञान (Upper Primary Science)**:
  - खाद्य परीक्षण: स्टार्च हेतु तनु आयोडीन (नीला-काला रंग); प्रोटीन हेतु कॉपर सल्फेट + कास्टिक सोडा (बैंगनी रंग)।
  - अम्ल, क्षार एवं सूचक: लिटमस (अम्ल में लाल, क्षार में नीला); हल्दी (क्षार में लाल-भूरा); फिनॉल्फथलीन (क्षार में गुलाबी, अम्ल में रंगहीन)।
  - सजीव जगत एवं कोशिका: पादप कोशिका में कोशिका भित्ति व लवक; माइटोकॉन्ड्रिया (कोशिका का ऊर्जागृह - ATP); प्रकाश संश्लेषण।
  - भौतिकी व विद्युत: विद्युत धारा का चुंबकीय प्रभाव (ओर्स्टेड 1820); समतल, अवतल व उत्तल दर्पण; ध्वनि का तारत्व (आवृत्ति) व प्रबलता (आयाम)।
- **उच्च प्राथमिक इतिहास (History)**:
  - स्रोत: अभिलेख, पांडुलिपियां, सिक्के और पुरातात्विक उत्खनन।
  - हड़प्पा सभ्यता: ग्रिड नगर योजना, पक्की ईंटें, ढकी हुई नालियां, विशाल स्नानागार।
  - सम्राट अशोक का धम्म: प्राकृत भाषा एवं ब्राह्मी लिपि में उत्कीर्ण शिलालेख; शांति व सहिष्णुता का संदेश।
  - मध्यकालीन भारत: रजिया सुल्तान (प्रथम महिला शासक 1236-1240); अकबर की सुलह-ए-कुल नीति एवं मनसबदारी प्रणाली (जात एवं सवार पद)।
  - आधुनिक भारत एवं सुधार आंदोलन: 1857 की क्रांति (मंगल पांडे, बैरकपुर); ज्योतिराव फुले (सत्यशोधक समाज एवं 'गुलामगिरी'); ईश्वरचंद्र विद्यासागर (विधवा पुनर्विवाह 1856)।
- **उच्च प्राथमिक भूगोल (Geography)**:
  - पृथ्वी की गतियां: घूर्णन से दिन-रात; परिक्रमण व 66.5° कक्षीय झुकाव से ऋतु परिवर्तन।
  - अक्षांश एवं देशांतर: भारतीय मानक समय (IST) 82°30' पूर्वी देशांतर (मिर्जापुर, ग्रीनविच से +5:30 घंटे)।
  - वायुमंडल की परतें: क्षोभमंडल (मौसम घटनाएं); समतापमंडल (ओजोन परत, हवाई जहाज हेतु शांत); मध्यमंडल; बाह्य वायुमंडल।
  - महासागरीय जलधाराएं: गल्फ स्ट्रीम (गर्म जलधारा); लैब्राडोर (ठंडी जलधारा)।
- **सामाजिक एवं राजनीतिक जीवन (SPL)**:
  - संविधान की प्रस्तावना: संप्रभु, समाजवादी, पंथनिरपेक्ष, लोकतंत्रात्मक गणराज्य।
  - पंचायती राज के तीन स्तर: ग्राम पंचायत, पंचायत समिति (प्रखंड), जिला परिषद (जिला)।
  - स्वतंत्र न्यायपालिका एवं जनहित याचिका (PIL): अनुच्छेद 32 व 226 के तहत निर्धनों के मौलिक अधिकारों की रक्षा।
  - आपराधिक न्याय प्रणाली: धारा 154 के तहत संज्ञेय अपराध पर अनिवार्य प्राथमिकी (FIR) पंजीकरण।
- **विज्ञान एवं सामाजिक विज्ञान शिक्षाशास्त्र**:
  - वैज्ञानिक दृष्टिकोण (Scientific Temper): अनुच्छेद 51A(h) - साक्ष्य आधारित आलोचनात्मक जांच।
  - प्राथमिक स्रोत (मूल डायरी, अभिलेख) बनाम द्वितीयक स्रोत (पाठ्यपुस्तक, जीवनी)।
  - संवेदनशील व विवादास्पद सामाजिक मुद्दों पर संवैधानिक मूल्यों के प्रकाश में विमर्श।

## 2. Sampled Practice Question Bank ({len(ss_sample)} Questions - 50% Sampling)
{build_q_summary_markdown(ss_sample, 14)}
"""
    }
]

assert len(notes) == 5, f"Expected exactly 5 notes, got {len(notes)}"

out_notes_file = os.path.join(BASE_DIR, 'ctet_bundled_notes.json')
with open(out_notes_file, 'w', encoding='utf-8') as f:
    json.dump(notes, f, ensure_ascii=False, indent=2)

print(f"✅ Generated {len(notes)} master bundled study notes for CTET at {out_notes_file}")
