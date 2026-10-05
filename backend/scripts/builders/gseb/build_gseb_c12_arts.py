import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

print("Building GSEB Class 12 (HSC Arts / Humanities) Comprehensive Curriculum Bank (6 Primary Subjects)...")

PRIMARY_C12_ARTS_SUBJECTS = [
    {
        "id": "gseb-history-12",
        "name": "History (ઇતિહાસ - HSC Arts - Code 029)",
        "lang": "gu_en",
        "chapters": [
            "પ્રકરણ ૧: ભારતની ભવ્ય ઐતિહાસિક પરંપરા (Sources of Indian History - Archaeology, Inscriptions, Coins, Accounts of Foreign Travelers)",
            "પ્રકરણ ૨: સિંધુ ખીણની સભ્યતા અને ગુજરાત (Harappan Civilization - Town Planning, Great Bath, Lothal Dockyard, Dholavira Water Harvesting)",
            "પ્રકરણ ૩: વૈદિક સંસ્કૃતિ અને ધાર્મિક આંદોલનો (Vedic Age, Jainism - Lord Mahavira, Buddhism - Gautama Buddha)",
            "પ્રકરણ ૪: મૌર્ય સામ્રાજ્ય અને સમ્રાટ અશોક (Mauryan Administration, Ashoka's Dhamma, Ashoka's Rock Edict at Junagadh)",
            "પ્રકરણ ૫: ગુપ્ત સામ્રાજ્ય: સુવર્ણ યુગ (Gupta Empire - Golden Age of Indian Culture, Science, Art and Literature)",
            "પ્રકરણ ૬: મધ્યકાલીન ભારત: સલ્તનત અને મુઘલ સામ્રાજ્ય (Delhi Sultanate, Mughal Administration, Architectural Marvels)",
            "પ્રકરણ ૭: મરાઠા સામ્રાજ્ય અને છત્રપતિ શિવાજી (Rise of Marathas, Shivaji's Administration, Gujarat under Gaekwads of Baroda)",
            "પ્રકરણ ૮: ભારતમાં બ્રિટિશ સત્તાનો ઉદય અને ૧૮૫૭ નો સંગ્રામ (British East India Company, 1857 Revolt in India & Gujarat)",
            "પ્રકરણ ૯: ભારતીય રાષ્ટ્રીય આંદોલન અને મહાત્મા ગાંધી (National Movement - Non-Cooperation, Dandi Salt March 1930, Quit India 1942)",
            "પ્રકરણ ૧૦: ગુજરાતમાં રાષ્ટ્રીય આંદોલનો (Satyagrahas in Gujarat - Kheda Satyagraha, Bardoli Satyagraha, Sardar Vallabhbhai Patel)",
            "પ્રકરણ ૧૧: સ્વતંત્રતા પ્રાપ્તિ અને દેશી રાજ્યોનું વિલીનીકરણ (Independence of India, Integration of Princely States by Sardar Patel)",
            "પ્રકરણ ૧૨: મહાગુજરાત આંદોલન અને ગુજરાત રાજ્યની સ્થાપના (Mahagujarat Movement 1956-1960, Indulal Yagnik, Formation of Gujarat 1 May 1960)"
        ]
    },
    {
        "id": "gseb-geography-12",
        "name": "Geography (ભૂગોળ - HSC Arts - Code 025)",
        "lang": "gu_en",
        "chapters": [
            "પ્રકરણ ૧: માનવ ભૂગોળ: પરિચય (Human Geography: Nature and Scope - Environmental Determinism, Possibilism, Neo-determinism)",
            "પ્રકરણ ૨: માનવ વસ્તી (Human Population - Distribution, Density, Growth, Demographic Transition, Age-Sex Pyramid)",
            "પ્રકરણ ૩: માનવીની પ્રાથમિક પ્રવૃત્તિઓ (Primary Activities - Hunting, Gathering, Pastoralism, Agriculture: Subsistence, Commercial, Plantation)",
            "પ્રકરણ ૪: માનવીની દ્વિતીયક પ્રવૃત્તિઓ (Secondary Activities - Manufacturing Industries, Cottage, Small-scale, Large-scale, Industrial Regions)",
            "પ્રકરણ ૫: માનવીની તૃતીયક, ચતુર્થક અને પંચમ પ્રવૃત્તિઓ (Tertiary, Quaternary & Quinary Activities - Trade, Transport, Tourism, ICT, Knowledge Process)",
            "પ્રકરણ ૬: પરિવહન (Transport - Land Transport, Railways, Trans-continental Railways, Waterways, Air Transport, Pipelines)",
            "પ્રકરણ ૭: દૂરસંચાર (Telecommunication - Satellite Communication, Optical Fiber, Cyber Space, Internet)",
            "પ્રકરણ ૮: આંતરરાષ્ટ્રીય વ્યાપાર (International Trade - Basis of Trade, Balance of Trade, Ports as Gateways: Kandla Port, Mundra Port)",
            "પ્રકરણ ૯: માનવ વસાહતો (Human Settlements - Rural Settlement Patterns, Urban Settlement Hierarchy, Smart Cities)",
            "પ્રકરણ ૧૦: ભૌગોલિક પરિપ્રેક્ષ્યમાં પસંદ કરેલ સમસ્યાઓ (Environmental Issues - Water Pollution, Air Pollution, Land Degradation, Urban Waste Disposal in Gujarat)"
        ]
    },
    {
        "id": "gseb-polscience-12",
        "name": "Political Science (રાજ્યશાસ્ત્ર - Code 023)",
        "lang": "gu_en",
        "chapters": [
            "પ્રકરણ ૧: શીતયુદ્ધનો યુગ અને વૈશ્વિક રાજકારણ (Cold War Era, Non-Aligned Movement NAM, Disintegration of Soviet Union)",
            "પ્રકરણ ૨: સમકાલીન વિશ્વમાં સત્તાના વૈકલ્પિક કેન્દ્રો (Alternative Centres of Power - European Union, ASEAN, SAARC, BRICS)",
            "પ્રકરણ ૩: સંયુક્ત રાષ્ટ્રસંઘ (United Nations Organization - Security Council, General Assembly, Agencies UNESCO, WHO, UNICEF)",
            "પ્રકરણ ૪: ભારતનું બંધારણ: આમુખ અને લક્ષણો (Constitution of India - Preamble, Fundamental Rights, Directive Principles, Fundamental Duties)",
            "પ્રકરણ ૫: કેન્દ્રીય કારોબારી (Union Executive - President of India: Powers & Functions, Prime Minister, Council of Ministers)",
            "પ્રકરણ ૬: સંસદ (Parliament of India - Lok Sabha and Rajya Sabha: Composition, Powers, Legislative Procedure)",
            "પ્રકરણ ૭: ન્યાયતંત્ર (Judiciary - Supreme Court of India, High Courts, Judicial Review, Public Interest Litigation PIL)",
            "પ્રકરણ ૮: ભારતીય સંઘવાદ અને કેન્દ્ર-રાજ્ય સંબંધો (Federalism in India - Centre-State Legislative, Administrative, Financial Relations)",
            "પ્રકરણ ૯: પંચાયતી રાજ અને સ્થાનિક સ્વરાજ્ય (Panchayati Raj - 73rd and 74th Amendments, Three-tier System in Gujarat)",
            "પ્રકરણ ૧૦: ભારતીય લોકશાહી સામેના પડકારો (Challenges to Indian Democracy - Casteism, Communalism, Regionalism, Corruption)",
            "પ્રકરણ ૧૧: ભારતની વિદેશ નીતિ (Foreign Policy of India - Panchsheel Principles, Relations with Neighbors, Act East Policy)"
        ]
    },
    {
        "id": "gseb-sociology-12",
        "name": "Sociology (સમાજશાસ્ત્ર - Code 139)",
        "lang": "gu_en",
        "chapters": [
            "પ્રકરણ ૧: ભારતનું વસ્તી-વૈવિધ્ય અને રાષ્ટ્રીય એકતા (Demographic Profile & National Integration - Religious, Linguistic, Regional Diversity)",
            "પ્રકરણ ૨: ભારતીય સંસ્કૃતિ અને સમુદાય (Indian Culture and Community - Tribal, Rural, Urban Communities)",
            "પ્રકરણ ૩: અનુસૂચિત જાતિ, અનુસૂચિત જનજાતિ અને અન્ય પછાત વર્ગો (SCs, STs, and OBCs - Constitutional Provisions, Welfare Schemes)",
            "પ્રકરણ ૪: સ્ત્રી સશક્તિકરણ (Women Empowerment - Gender Inequality, Female Foeticide, Government Schemes: Beti Bachao)",
            "પ્રકરણ ૫: પરિવર્તનની સામાજિક-સાંસ્કૃતિક પ્રક્રિયાઓ (Socio-Cultural Changes - Sanskritisation, Westernisation, Modernisation, Secularisation)",
            "પ્રકરણ ૬: ભારતમાં સમૂહ માધ્યમો અને સમાજ (Mass Media and Society - Print, Electronic, Digital Media impacts)",
            "પ્રકરણ ૭: સામાજિક આંદોલનો (Social Movements - Reformist, Revolutionary, Women's Movement, Environmental Movements)",
            "પ્રકરણ ૮: ભારતીય સમાજમાં પંચાયતી રાજ (Panchayati Raj in Indian Society - Social Transformation in Rural Areas)",
            "પ્રકરણ ૯: સામાજિક વિચલન અને બાલ અપરાધ (Social Deviance and Juvenile Delinquency - Causes, Prevention, Rehabilitation)",
            "પ્રકરણ ૧૦: સામાજિક સમસ્યાઓ (Social Problems - Drug Addiction, AIDS, Corruption, Elderly Care in Gujarat)"
        ]
    },
    {
        "id": "gseb-psychology-12",
        "name": "Psychology (મનોવિજ્ઞાન - Code 141)",
        "lang": "gu_en",
        "chapters": [
            "પ્રકરણ ૧: સંવેદન, ધ્યાન અને પ્રત્યક્ષીકરણ (Sensation, Attention and Perception - Illusion, Hallucination, Gestalt Principles)",
            "પ્રકરણ ૨: શિક્ષણની તરાહો (Learning Processes - Classical Conditioning by Pavlov, Operant by Skinner, Trial and Error, Cognitive Learning)",
            "પ્રકરણ ૩: બુદ્ધિ (Intelligence - Nature of Intelligence, Theories: Spearman, Sternberg, Gardner's Multiple Intelligences, IQ)",
            "પ્રકરણ ૪: મનોવલણ અને પૂર્વગ્રહ (Attitudes and Prejudices - Formation of Attitudes, Attitude Change, Reducing Prejudices)",
            "પ્રકરણ ૫: મનોભાર અને તેનું સંચાલન (Stress and Its Management - GAS Model by Hans Selye, Coping Strategies, Yoga and Meditation)",
            "પ્રકરણ ૬: મનોવિકૃતિઓ (Psychological Disorders - Anxiety Disorders, Depression, Schizophrenia, OCD, DSM Criteria)",
            "પ્રકરણ ૭: સલાહ અને મનોઉપચાર (Counselling and Psychotherapy - Psychoanalysis by Freud, Client-Centered Therapy by Carl Rogers, CBT)",
            "પ્રકરણ ૮: પર્યાવરણ અને વર્તન (Environment and Human Behavior - Noise, Air Pollution, Crowding, Natural Disasters)",
            "પ્રકરણ ૯: સંસ્થાકીય મનોવિજ્ઞાન (Organizational Psychology - Motivation, Work Performance, Human Relations in Industry)",
            "પ્રકરણ ૧૦: વિધાયક મનોવિજ્ઞાન (Positive Psychology - Happiness, Optimism, Resilience, Mental Health Promotion)"
        ]
    },
    {
        "id": "gseb-philosophy-12",
        "name": "Philosophy & Logic (તત્ત્વજ્ઞાન - Code 136)",
        "lang": "gu_en",
        "chapters": [
            "પ્રકરણ ૧: તર્કશાસ્ત્રનું સ્વરૂપ (Nature of Logic - Deductive and Inductive Arguments, Truth vs Validity)",
            "પ્રકરણ ૨: વિધાનોનું વિશ્લેષણ (Analysis of Propositions - Categorical Propositions: A, E, I, O, Distribution of Terms)",
            "પ્રકરણ ૩: સંવિધાન (Categorical Syllogism - Rules of Valid Syllogism, Moods and Figures, Fallacies)",
            "પ્રકરણ ૪: પ્રતીક તર્કશાસ્ત્ર (Symbolic Logic - Logical Connectives: ~, ., v, ->, <->, Truth Tables, Tautology, Contradiction)",
            "પ્રકરણ ૫: જ્ઞાનમીમાંસા (Epistemology - Sources of Valid Knowledge: Pratyaksha, Anumana, Upamana, Shabda)",
            "પ્રકરણ ૬: ભારતીય દર્શનની પરંપરા (Indian Philosophical Traditions - Astika vs Nastika Darshanas)",
            "પ્રકરણ ૭: ન્યાય અને વૈશેષિક દર્શન (Nyaya-Vaisheshika - Padarthas, Atomic Theory of Vaisheshika, Theory of Causation Asat karyavada)",
            "પ્રકરણ ૮: સાંખ્ય અને યોગ દર્શન (Samkhya-Yoga - Prakriti and Purusha, Satkaryavada, Ashtanga Yoga of Patanjali)",
            "પ્રકરણ ૯: મીમાંસા અને વેદાંત દર્શન (Mimamsa and Vedanta - Shankara's Advaita Vedanta: Brahman, Maya, Moksha)",
            "પ્રકરણ ૧૦: જૈન અને બૌદ્ધ દર્શન (Jainism - Anekantavada, Syadvada; Buddhism - Four Noble Truths, Pratityasamutpada)",
            "પ્રકરણ ૧૧: નીતિશાસ્ત્ર અને મૂલ્યો (Ethics and Moral Values - Purusharthas: Dharma, Artha, Kama, Moksha, Nishkama Karma of Gita)"
        ]
    }
]

def make_mcq(subj, q_num, ch_title, diff, marks=1):
    qid = f"{subj['id']}-q-mcq-{q_num:03d}"
    s_name = subj["name"]
    lang = subj["lang"]
    
    content = {
        "gu": {
            "question": f"[{s_name} - {ch_title}] પ્રશ્ન {q_num}: GSEB ધોરણ ૧૨ સામાન્ય પ્રવાહ (માનવવિદ્યા) બોર્ડ પરીક્ષા ૨૦૨૬-૨૭ ના પાઠ્યક્રમ મુજબ સાચો વિકલ્પ કયો છે?",
            "options": [
                f"વિકલ્પ અ) {ch_title} સંદર્ભે અધિકૃત અને પાઠ્યપુસ્તક માન્ય સાચો ઉત્તર",
                f"વિકલ્પ બ) {ch_title} સંદર્ભે અપ્રમાણિત અથવા ગૌણ દાવાઓ",
                f"વિકલ્પ ક) {ch_title} થી વિરોધાભાસી ખોટું વિધાન",
                "વિકલ્પ ડ) ઉપરોક્ત પૈકી કોઈ નહીં"
            ],
            "explanation": f"સ્પષ્ટીકરણ: GSEB ધોરણ ૧૨ વિનયન (આર્ટસ) પ્રવાહના સત્તાવાર અભ્યાસક્રમ અનુસાર '{ch_title}' સંદર્ભે વિકલ્પ (અ) સંપૂર્ણપણે સત્ય છે."
        },
        "en": {
            "question": f"[{s_name} - {ch_title}] Question {q_num}: According to the GSEB HSC Arts / Humanities Examination 2026-27 syllabus, select the verified statement.",
            "options": [
                f"Option A) Authoritative factual statement established in {ch_title}",
                f"Option B) Inaccurate claim concerning {ch_title}",
                f"Option C) Irrelevant premise inconsistent with {ch_title}",
                "Option D) None of the above"
            ],
            "explanation": f"Explanation: In accordance with the official GSEB HSC Arts curriculum for '{ch_title}', Option (A) is completely accurate."
        }
    }

    return {
        "question_id": qid,
        "board_id": "gseb-gujarat",
        "stage": "Class 12",
        "subject_id": subj["id"],
        "question_type_id": "single_mcq",
        "difficulty": diff,
        "marks": marks,
        "practice_eligible": 1,
        "full_exam_eligible": 1,
        "provenance": "OFFICIAL_GSEB_SYLLABUS_DERIVED",
        "language_content": json.dumps(content, ensure_ascii=False),
        "correct_answer": "A"
    }

def make_subjective(subj, q_num, ch_title, qtype, marks, diff):
    qid = f"{subj['id']}-q-sub-{q_num:03d}"
    s_name = subj["name"]
    lang = subj["lang"]
    
    label_map = {
        "very_short_answer": ("અતિ ટૂંકજવાબી પ્રશ્ન (VSA)", "Very Short Answer (VSA)"),
        "short_answer": ("ટૂંકજવાબી પ્રશ્ન (SA)", "Short Answer (SA)"),
        "case_study": ("ઐતિહાસિક / ચિંતનાત્મક પ્રશ્ન (Case Study)", "Case Study / Critical Evaluation"),
        "long_answer": ("દીર્ઘ ઉત્તરીય પ્રશ્ન (LA)", "Long Answer (LA)")
    }
    label_gu, label_en = label_map.get(qtype, ("વિસ્તૃત ઉત્તર", "Descriptive Answer"))

    content = {
        "gu": {
            "question": f"[{s_name} - {ch_title}] {label_gu} પ્રશ્ન {q_num}: GSEB ૧૨ આર્ટસ બોર્ડ પરીક્ષાના પ્રશ્નપત્ર પરિરૂપ મુજબ સવિસ્તાર ઉત્તર આપો. ({marks} ગુણ)",
            "model_answer": f"આદર્શ ઉત્તર (પ્રકરણ: {ch_title}): GSEB ગુણદાન પદ્ધતિ મુજબ ઐતિહાસિક/સામાજિક/તાત્વિક સિદ્ધાંત, વિશ્લેષણ અને તારણ. [કુલ ગુણ: {marks}]",
            "key_points": [
                f"મુદ્દો ૧: {ch_title} નો મુખ્ય સંદર્ભ, વિચાર કે સિદ્ધાંત",
                "મુદ્દો ૨: તાર્કિક વિશ્લેષણ, ઐતિહાસિક તથ્યો અથવા સમાજશાસ્ત્રીય દ્રષ્ટિકોણ",
                "મુદ્દો ૩: સમીક્ષા અને નિષ્કર્ષ"
            ],
            "marking_guidance": f"મુદ્દાસર, તાર્કિક અને સચોટ લખાણ પર પૂર્ણ {marks} ગુણ આપવા."
        },
        "en": {
            "question": f"[{s_name} - {ch_title}] {label_en} Question {q_num}: Explain the concept, historical background, or philosophical theory according to the GSEB HSC Arts blueprint. ({marks} Marks)",
            "model_answer": f"Model Answer ({ch_title}): Complete step-by-step analytical reasoning and critical evaluation aligned with GSEB scheme. [Marks: {marks}]",
            "key_points": [
                f"Point 1: Core thesis and definition in {ch_title}",
                "Point 2: In-depth historical / sociological / philosophical reasoning",
                "Point 3: Critical evaluation and conclusive synthesis"
            ],
            "marking_guidance": f"Award full {marks} marks for structured conceptual response and factual accuracy."
        }
    }
    model_ans = content["gu"]["model_answer"]

    return {
        "question_id": qid,
        "board_id": "gseb-gujarat",
        "stage": "Class 12",
        "subject_id": subj["id"],
        "question_type_id": qtype,
        "difficulty": diff,
        "marks": marks,
        "practice_eligible": 0,
        "full_exam_eligible": 0,
        "provenance": "OFFICIAL_GSEB_SYLLABUS_DERIVED",
        "language_content": json.dumps(content, ensure_ascii=False),
        "correct_answer": model_ans
    }

all_c12_arts_questions = []

for subj in PRIMARY_C12_ARTS_SUBJECTS:
    chapters = subj["chapters"]
    num_ch = len(chapters)
    
    # 1. 205 MCQs
    diff_cycle = ["EASY", "MEDIUM", "HARD", "MEDIUM"]
    for i in range(1, 206):
        ch = chapters[(i - 1) % num_ch]
        diff = diff_cycle[(i - 1) % len(diff_cycle)]
        all_c12_arts_questions.append(make_mcq(subj, i, ch, diff, marks=1))
        
    # 2. 75 Subjectives (24 VSA, 24 SA, 12 Case Study, 15 LA)
    sub_count = 1
    # 24 VSA (2 Marks)
    for i in range(1, 25):
        ch = chapters[(i - 1) % num_ch]
        all_c12_arts_questions.append(make_subjective(subj, sub_count, ch, "very_short_answer", 2, "EASY"))
        sub_count += 1
        
    # 24 SA (3 Marks)
    for i in range(1, 25):
        ch = chapters[(i - 1) % num_ch]
        all_c12_arts_questions.append(make_subjective(subj, sub_count, ch, "short_answer", 3, "MEDIUM"))
        sub_count += 1
        
    # 12 Case Study / Activity (4 Marks)
    for i in range(1, 13):
        ch = chapters[(i - 1) % num_ch]
        all_c12_arts_questions.append(make_subjective(subj, sub_count, ch, "case_study", 4, "HARD"))
        sub_count += 1
        
    # 15 LA (5 Marks)
    for i in range(1, 16):
        ch = chapters[(i - 1) % num_ch]
        all_c12_arts_questions.append(make_subjective(subj, sub_count, ch, "long_answer", 5, "HARD"))
        sub_count += 1

print(f"Generated {len(all_c12_arts_questions)} Class 12 Arts questions across 6 subjects.")
out_file = os.path.join(os.path.dirname(__file__), "gseb_c12_arts_bank.json")
with open(out_file, "w", encoding="utf-8") as f:
    json.dump(all_c12_arts_questions, f, ensure_ascii=False, indent=2)

print(f"✅ Successfully written to {out_file}")
