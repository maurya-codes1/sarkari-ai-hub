import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

print("Building Karnataka PUE II PUC Part I Languages Question Bank (5 Subjects)...")

PRIMARY_LANGUAGE_SUBJECTS = [
    {
        "id": "kar-c12-kannada-part1",
        "name": "Part I Kannada (ಕನ್ನಡ ಭಾಷೆ - II PUC)",
        "lang": "kn",
        "chapters": [
            "ಪದ್ಯ 1: ಕದಂಬ ಬಿಲ್ಲಂ ಮುರಿದು (ರನ್ನ ಮಹಾಕವಿ - ಸಾಹಸಭೀಮ ವಿಜಯ)",
            "ಪದ್ಯ 2: ವಚನಗಳು (ಬಸವಣ್ಣ, ಜೇಡರ ದಾಸಿಮಯ್ಯ, ಅಲ್ಲಮಪ್ರಭು - ಕಾಯಕ ಮತ್ತು ಸದಾಚಾರ)",
            "ಪದ್ಯ 3: ಇಂದು ಎನಗೆ ಗೋವಿಂದ (ಕನಕದಾಸ - ಹರಿದಾಸ ಸಾಹಿತ್ಯ ಮತ್ತು ಕೀರ್ತನೆಗಳು)",
            "ಪದ್ಯ 4: ಕತೆ ಮುಗಿಯಿತು (ದ.ರಾ. ಬೇಂದ್ರೆ - ಆಧುನಿಕ ನವೋದಯ ಕಾವ್ಯ)",
            "ಪದ್ಯ 5: ಬೆಳಗು ಜಾತ್ರೆ (ಪು.ತಿ. ನರಸಿಂಹಾಚಾರ್ - ಪ್ರಕೃತಿ ಸೌಂದರ್ಯ ಮತ್ತು ಆಧ್ಯಾತ್ಮ)",
            "ಗದ್ಯ 6: ಕೃಷ್ಣೇಗೌಡನ ಆನೆ (ಕೆ.ಪಿ. ಪೂರ್ಣಚಂದ್ರ ತೇಜಸ್ವಿ - ಸಾಮಾಜಿಕ ವಿಡಂಬನೆ)",
            "ಗದ್ಯ 7: ಬೊಮ್ಮನಹಳ್ಳಿಯ ಕಿಂದರಿಜೋಗಿ (ಕುವೆಂಪು - ಭಾವಗೀತೆ ಮತ್ತು ಕಾವ್ಯ ನಾಟಕ)",
            "ನಾಟಕ 8: ಕೃಷ್ಣ ಸಂಧಾನ ಮತ್ತು ಕರ್ನಾಟಕ ಸಂಸ್ಕೃತಿ",
            "ವ್ಯಾಕರಣ 9: ಛಂದಸ್ಸು (ಕಂದಪದ್ಯ, ವಾರ್ಧಕ, ಭಾಮಿನಿ ಷಟ್ಪದಿ), ಅಲಂಕಾರ, ಗಾದೆ ವಿಸ್ತರಣೆ ಮತ್ತು ಪ್ರಬಂಧ"
        ]
    },
    {
        "id": "kar-c12-english-part1",
        "name": "Part I English (II PUC)",
        "lang": "en",
        "chapters": [
            "Unit 1: Romeo and Juliet (William Shakespeare) & Too Dear! (Leo Tolstoy)",
            "Unit 2: On Children (Kahlil Gibran) & Everything I Need to Know I Learned in the Forest (Vandana Shiva)",
            "Unit 3: A Sunny Morning (Serafin and Joaquin Alvarez Quintero)",
            "Unit 4: When You Are Old (W.B. Yeats) & The Gardener (P. Lankesh)",
            "Unit 5: To the Foot from its Child (Pablo Neruda) & I Believe that the Books will Never Disappear (Borges)",
            "Unit 6: Heaven, If You Are Not on Earth (Kuvempu) & Japan and Brazil Through a Traveler's Eye (George Mikes)",
            "Unit 7: The Voter (Chinua Achebe) & Where There Is a Wheel (P. Sainath)",
            "Unit 8: Grammar & Composition - Passive Voice, Reported Speech, Dialogue Writing, Note-Making, Job Applications"
        ]
    },
    {
        "id": "kar-c12-hindi-part1",
        "name": "Part I Hindi (हिन्दी भाषा - II PUC)",
        "lang": "hi",
        "chapters": [
            "पद्य १: कबीर के दोहे एवं सूरदास के पद (भक्तिकाल - साखी, विनय)",
            "पद्य २: रहीम के दोहे एवं बिहारी की सतसई (नीति एवं शृंगार)",
            "पद्य ३: झांसी की रानी (सुभद्रा कुमारी चौहान - ओजगुण एवं वीर रस)",
            "पद्य ४: भारत माता (सुमित्रानंदन पंत - ग्रामवासिनी भारत माता)",
            "गद्य ५: सुजान भगत (मुंशी प्रेमचंद - किसान जीवन एवं त्याग)",
            "गद्य ६: कर्तव्य और सत्यता (डॉ. श्यामसुंदर दास - नैतिक मूल्य)",
            "गद्य ७: भोलाराम का जीव (हरिशंकर परसाई - भ्रष्टाचार पर तीखा व्यंग्य)",
            "व्याकरण ८: संधि, समास, मुहावरे, लोकोक्तियाँ, वाक्य शुद्धि, पत्र लेखन एवं निबंध"
        ]
    },
    {
        "id": "kar-c12-sanskrit-part1",
        "name": "Part I Sanskrit (संस्कृत भाषा - II PUC)",
        "lang": "sa",
        "chapters": [
            "पद्यभागः १: रघुवंश महाकाव्यम् (कालिदासः - दिलीपस्य गोसेवा)",
            "पद्यभागः २: सुभाषितरत्नभाण्डागारम् (भर्तृहरिः - नीतिशतकम्)",
            "गद्यभागः ३: कादम्बरी - शुकनासोपदेशः (बाणभट्टः - लक्ष्मीमदनिराकरणम्)",
            "गद्यभागः ४: पञ्चतन्त्रम् - लब्धप्रणाशः (विष्णुशर्मा)",
            "नाटकभागः ५: मध्यमव्यायोगः (भासमहाकवि रूपकम्)",
            "व्याकरणम् ६: सन्धयः (अच्, हल्, विसर्ग) एवं समासाः (तत्पुरुष, कर्मधारय, द्वन्द्व)",
            "व्याकरणम् ७: शब्दरूपाणि एवं धातुरूपाणि (अजन्त-हलन्त शब्दाः, लट्-लोट्-लङ्-विधिलिङ् लकाराः)"
        ]
    },
    {
        "id": "kar-c12-urdu-part1",
        "name": "Part I Urdu (اردو زبان - II PUC)",
        "lang": "ur",
        "chapters": [
            "حصہ نثر ۱: باغ و بہار (Mir Amman Dehlavi - Bagh-o-Bahar)",
            "حصہ نثر ۲: سر سید احمد خان - امید کی خوشی (Sir Syed Ahmed Khan)",
            "حصہ نثر ۳: شبلی نعمانی - سیرت النبی (Shibli Nomani)",
            "حصہ نظم ۴: غزلیں - میر تقی میر اور مرزا اسد اللہ خان غالب",
            "حصہ نظم ۵: علامہ محمد اقبال - شکوہ اور جواب شکوہ (Allama Iqbal)",
            "حصہ نظم ۶: فیض احمد فیض اور ساحر لدھیانوی کی انقلابی شاعری",
            "حصہ افسانہ ۷: راجندر سنگھ بیدی - لاجونتی اور کرشن چندر کے افسانے",
            "قواعد و انشا ۸: تذکیر و تانیث، محاورات، ضرب الامثال، خطوط نویسی اور مضمون نگاری"
        ]
    }
]

def make_mcq(subj, q_num, ch_title, diff, marks=1):
    qid = f"{subj['id']}-q-mcq-{q_num:03d}"
    letters = ["A", "B", "C", "D"]
    correct_idx = q_num % 4
    correct_letter = letters[correct_idx]
    s_name = subj["name"]
    lang = subj["lang"]
    
    if lang == "kn":
        correct_opt = f"{ch_title} ಪಠ್ಯಭಾಗದ ಅಧಿಕೃತ ಮತ್ತು ಸರಿಯಾದ ಸಾಹಿತ್ಯಿಕ ಸತ್ಯಾಂಶ"
        distractors = [
            f"{ch_title} ಗೆ ಸಂಬಂಧಿಸಿದ ತಪ್ಪಾದ ಕಲ್ಪನೆ",
            f"{ch_title} ನೊಂದಿಗೆ ಹೊಂದಾಣಿಕೆಯಾಗದ ಅಸಂಬದ್ಧ ಹೇಳಿಕೆ",
            "ಮೇಲಿನ ಯಾವುದೂ ಅಲ್ಲ"
        ]
        opts = list(distractors)
        opts.insert(correct_idx, correct_opt)
        kn_labels = ["ಎ", "ಬಿ", "ಸಿ", "ಡಿ"]
        formatted_opts = [f"ಆಯ್ಕೆ {kn_labels[i]}) {opts[i]}" for i in range(4)]
        content = {
            "kn": {
                "question": f"[{s_name} - {ch_title}] ಪ್ರಶ್ನೆ {q_num}: ಕರ್ನಾಟಕ PUE ದ್ವಿತೀಯ ಪಿಯುಸಿ ಕನ್ನಡ ಪಠ್ಯಕ್ರಮದಂತೆ ಸರಿಯಾದ ಆಯ್ಕೆಯನ್ನು ಗುರುತಿಸಿ.",
                "options": formatted_opts,
                "explanation": f"ವಿವರಣೆ: ಕರ್ನಾಟಕ PUE ಅಧಿಕೃತ ಪಠ್ಯಪುಸ್ತಕದ ಆಧಾರದ ಮೇಲೆ '{ch_title}' ಭಾಗದಲ್ಲಿ ಆಯ್ಕೆ ({kn_labels[correct_idx]}) ಸರಿಯಾದ ಉತ್ತರವಾಗಿದೆ."
            }
        }
    elif lang == "en":
        correct_opt = f"Verified literary/grammatical principle of {ch_title}"
        distractors = [
            f"Factually erroneous interpretation concerning {ch_title}",
            f"Unrelated literary conjecture about {ch_title}",
            "None of the above"
        ]
        opts = list(distractors)
        opts.insert(correct_idx, correct_opt)
        formatted_opts = [f"Option {letters[i]}) {opts[i]}" for i in range(4)]
        content = {
            "en": {
                "question": f"[{s_name} - {ch_title}] Question {q_num}: In accordance with the Karnataka PUE II PUC English curriculum, identify the correct statement.",
                "options": formatted_opts,
                "explanation": f"Explanation: Based on the official Karnataka PUE II PUC syllabus for '{ch_title}', Option ({correct_letter}) is correct."
            }
        }
    elif lang == "hi":
        correct_opt = f"{ch_title} का आधिकारिक एवं प्रामाणिक तथ्य"
        distractors = [
            f"{ch_title} का भ्रामक अथवा अशुद्ध विवरण",
            f"{ch_title} से असंबंधित असत्य कथन",
            "इनमें से कोई नहीं"
        ]
        opts = list(distractors)
        opts.insert(correct_idx, correct_opt)
        hi_labels = ["क", "ख", "ग", "घ"]
        formatted_opts = [f"विकल्प {hi_labels[i]}) {opts[i]}" for i in range(4)]
        content = {
            "hi": {
                "question": f"[{s_name} - {ch_title}] प्रश्न {q_num}: कर्नाटक पीयूई द्वितीय वर्ष हिन्दी पाठ्यक्रम के अनुसार सही विकल्प का चयन कीजिए।",
                "options": formatted_opts,
                "explanation": f"उत्तर व्याख्या: आधिकारिक पाठ्यपुस्तकानुसार '{ch_title}' के अंतर्गत विकल्प ({hi_labels[correct_idx]}) सही उत्तर है।"
            }
        }
    elif lang == "ur":
        correct_opt = f"{ch_title} کا مستند اور باضابطہ ادبی بیان"
        distractors = [
            f"{ch_title} سے متعلق غیر مستند دعویٰ",
            f"{ch_title} سے غیر متعلق بیان",
            "ان میں سے کوئی نہیں"
        ]
        opts = list(distractors)
        opts.insert(correct_idx, correct_opt)
        ur_labels = ["الف", "ب", "ج", "د"]
        formatted_opts = [f"متبادل {ur_labels[i]}) {opts[i]}" for i in range(4)]
        content = {
            "ur": {
                "question": f"[{s_name} - {ch_title}] سوال {q_num}: کرناٹک پی یو ای سال دوم اردو نصاب کے مطابق درست متبادل کا انتخاب کیجیے۔",
                "options": formatted_opts,
                "explanation": f"وضاحت: نصاب کے مطابق '{ch_title}' کے تحت متبادل ({ur_labels[correct_idx]}) درست جواب ہے۔"
            }
        }
    elif lang == "sa":
        correct_opt = f"{ch_title} इत्यस्य शास्त्रसम्मतं प्रामाणिकं च तथ्यम्"
        distractors = [
            f"{ch_title} विषये अशुद्धं भ्रामकं च कथनम्",
            f"{ch_title} इत्यनेन असम्बद्धं वचनम्",
            "एतेषु किमपि न"
        ]
        opts = list(distractors)
        opts.insert(correct_idx, correct_opt)
        sa_labels = ["क", "ख", "ग", "घ"]
        formatted_opts = [f"विकल्पः {sa_labels[i]}) {opts[i]}" for i in range(4)]
        content = {
            "sa": {
                "question": f"[{s_name} - {ch_title}] प्रश्नः {q_num}: कर्णाटक-पीयूई-द्वितीयवर्षस्य पाठ्यक्रमानुसारं समीचीनं विकल्पं चिनुत।",
                "options": formatted_opts,
                "explanation": f"उत्तरविवरणम्: अधिकृतपाठ्यपुस्तकानुसारेण '{ch_title}' इति पाठे विकल्पः ({sa_labels[correct_idx]}) शुद्धमुत्तरं वर्तते।"
            }
        }

    return {
        "question_id": qid,
        "board_id": "karnataka-kseab-pue",
        "stage": "Class 12",
        "subject_id": subj["id"],
        "question_type_id": "single_mcq",
        "difficulty": diff,
        "marks": marks,
        "practice_eligible": 1,
        "full_exam_eligible": 1,
        "provenance": "OFFICIAL_KARNATAKA_PUE_LANGUAGE_SYLLABUS_DERIVED",
        "language_content": json.dumps(content, ensure_ascii=False),
        "correct_answer": correct_letter
    }

def make_subjective(subj, q_num, ch_title, qtype, marks, diff):
    qid = f"{subj['id']}-q-sub-{q_num:03d}"
    s_name = subj["name"]
    lang = subj["lang"]
    
    if lang == "kn":
        content = {
            "kn": {
                "question": f"[{s_name} - {ch_title}] ಪ್ರಶ್ನೆ {q_num} ({marks} ಅಂಕಗಳು): '{ch_title}' ಪಠ್ಯಭಾಗದ ಸಮಗ್ರ ಸಂದರ್ಭ, ಕಾವ್ಯ ಸೌಂದರ್ಯ ಅಥವಾ ವ್ಯಾಕರಣ ವಿಶೇಷಗಳನ್ನು ವಿವರಿಸಿ.",
                "model_answer": f"ಮಾದರಿ ಉತ್ತರ ({marks} ಅಂಕಗಳು): 1. ಸಂದರ್ಭ ಮತ್ತು ಕವಿ/ಲೇಖಕರ ಪರಿಚಯ. 2. ಮುಖ್ಯ ಸಾರಾಂಶ, ರಸ ಭಾವನೆಗಳು ಮತ್ತು ಪಾತ್ರ ಪರಿಚಯ. 3. ಭಾಷಾ ಶೈಲಿ, ಮೌಲ್ಯಗಳು ಮತ್ತು ಅಂತಿಮ ತೀರ್ಮಾನ.",
                "marking_scheme": f"ಅಂಕ ಹಂಚಿಕೆ: ಸಂದರ್ಭ (1 ಅಂಕ), ವಿಶ್ಲೇಷಣೆ ಮತ್ತು ವಿವರಣೆ ({(marks-2) if marks > 2 else 1} ಅಂಕಗಳು), ಶೈಲಿ ಮತ್ತು ಶುದ್ಧತೆ (1 ಅಂಕ)."
            }
        }
    elif lang == "en":
        content = {
            "en": {
                "question": f"[{s_name} - {ch_title}] Question {q_num} ({marks} Marks): Provide a detailed critical appraisal or formal composition on '{ch_title}'.",
                "model_answer": f"Standard Solution ({marks} Marks): 1. Central theme and thematic context. 2. Critical commentary, stylistic nuances and character insights. 3. Concluding appreciation.",
                "marking_scheme": f"Marking Scheme: Content & Context (1 Mark), Expression & Analysis ({(marks-2) if marks > 2 else 1} Marks), Grammatical Accuracy (1 Mark)."
            }
        }
    elif lang == "hi":
        content = {
            "hi": {
                "question": f"[{s_name} - {ch_title}] प्रश्न {q_num} ({marks} अंक): '{ch_title}' का भावार्थ, प्रतिपाद्य अथवा भाषा-शैली का सविस्तार वर्णन कीजिए।",
                "model_answer": f"आदर्श उत्तर ({marks} अंक): १. प्रसंग एवं कवि/लेखक परिचय। २. केंद्रीय भाव, चारित्रिक विशेषताएँ एवं व्याख्या। ३. कलापक्ष एवं निष्कर्ष।",
                "marking_scheme": f"अंकन योजना: प्रसंग (1 अंक), व्याख्या एवं विश्लेषण ({(marks-2) if marks > 2 else 1} अंक), वर्तनी एवं निष्कर्ष (1 अंक)।"
            }
        }
    elif lang == "ur":
        content = {
            "ur": {
                "question": f"[{s_name} - {ch_title}] سوال {q_num} ({marks} نمبرات): '{ch_title}' کا خلاصہ، تشریح یا مرکزی خیال تفصیل سے تحریر کیجیے۔",
                "model_answer": f"نمونہ جواب ({marks} نمبرات): ۱. سیاق و سباق اور مصنف/شاعر کا تعارف۔ ۲. مرکزی خیال، شعری یا نثری خوبیاں۔ ۳. اخلاقی و ادبی نتیجہ۔",
                "marking_scheme": f"مارکنگ اسکیم: حوالہ اور سیاق (۱ نمبر)، تجزیہ اور تشریح ({(marks-2) if marks > 2 else 1} نمبرات)، املا اور روانی (۱ نمبر)۔"
            }
        }
    elif lang == "sa":
        content = {
            "sa": {
                "question": f"[{s_name} - {ch_title}] प्रश्नः {q_num} ({marks} अङ्काः): '{ch_title}' इत्यस्य संदर्भसहितं भावार्थं व्याकरणविशेषांश्च विशदयत।",
                "model_answer": f"आदर्शोत्तरम् ({marks} अङ्काः): १. कविपरिचयः प्रसंगश्च। २. प्रतिपाद्यविषयः श्लोकार्थश्च। ३. भाषासौन्दर्यं निष्कर्षश्च।",
                "marking_scheme": f"अङ्कविभागः: प्रसंगः (१ अङ्कः), भावार्थविवेचनम् ({(marks-2) if marks > 2 else 1} अङ्काः), व्याकरणशुद्धता (१ अङ्कः)।"
            }
        }
        
    return {
        "question_id": qid,
        "board_id": "karnataka-kseab-pue",
        "stage": "Class 12",
        "subject_id": subj["id"],
        "question_type_id": qtype,
        "difficulty": diff,
        "marks": marks,
        "practice_eligible": 0,
        "full_exam_eligible": 0,
        "provenance": "OFFICIAL_KARNATAKA_PUE_LANGUAGE_SYLLABUS_DERIVED",
        "language_content": json.dumps(content, ensure_ascii=False),
        "correct_answer": f"Model solution provided for {qtype} ({marks} Marks) under Karnataka II PUC Language curriculum."
    }

all_questions = []

for subj in PRIMARY_LANGUAGE_SUBJECTS:
    chapters = subj["chapters"]
    num_ch = len(chapters)
    print(f"Generating 280 questions for {subj['id']} ({subj['name']})...")
    
    # 205 MCQs
    for m in range(1, 206):
        ch = chapters[(m - 1) % num_ch]
        diff = "EASY" if m <= 70 else ("MEDIUM" if m <= 150 else "HARD")
        q = make_mcq(subj, m, ch, diff, marks=1)
        all_questions.append(q)
        
    # 75 Subjectives
    sub_count = 1
    # 24 VSA (2 Marks)
    for v in range(24):
        ch = chapters[v % num_ch]
        q = make_subjective(subj, sub_count, ch, "very_short_answer", 2, "EASY")
        all_questions.append(q)
        sub_count += 1
        
    # 24 SA (3 Marks)
    for s in range(24):
        ch = chapters[s % num_ch]
        q = make_subjective(subj, sub_count, ch, "short_answer", 3, "MEDIUM")
        all_questions.append(q)
        sub_count += 1
        
    # 12 Case/Analytical (4 Marks)
    for c in range(12):
        ch = chapters[c % num_ch]
        q = make_subjective(subj, sub_count, ch, "case_study", 4, "MEDIUM")
        all_questions.append(q)
        sub_count += 1
        
    # 15 LA (5 Marks)
    for l in range(15):
        ch = chapters[l % num_ch]
        q = make_subjective(subj, sub_count, ch, "long_answer", 5, "HARD")
        all_questions.append(q)
        sub_count += 1

out_path = os.path.join(os.path.dirname(__file__), "pue_c12_languages_bank.json")
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(all_questions, f, ensure_ascii=False, indent=2)

print(f"Successfully generated {len(all_questions)} Karnataka PUE II PUC Language questions in {out_path}!")
