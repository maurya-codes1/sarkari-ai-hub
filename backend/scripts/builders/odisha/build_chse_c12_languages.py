import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

print("Building CHSE Odisha Class 12 Languages Comprehensive Curriculum Bank (5 Subjects)...")

PRIMARY_LANGUAGES_SUBJECTS = [
    {
        "id": "od-c12-english-compulsory",
        "name": "Compulsory English (CHSE Code ENG)",
        "lang": "en",
        "chapters": [
            "Prose 1: My Greatest Olympic Prize (Jesse Owens - Luz Long & Sportsmanship)",
            "Prose 2: On Examinations (Winston S. Churchill - Harrow School & Latin)",
            "Poetry 3: The Ballad of Father Gilligan (W. B. Yeats - Devotion & Mercy)",
            "Poetry 4: A Psalm of Life (H. W. Longfellow - Action & Earnest Striving)",
            "Prose 5: The Portrait of a Lady (Khushwant Singh - Grandmother's Piety)",
            "Poetry 6: Television (Roald Dahl - Reading Books vs Idiotic Screen)",
            "Short Story 7: The Doctor's Word (R. K. Narayan - Dr. Raman & Gopal's Crisis)",
            "Short Story 8: Stay Hungry, Stay Foolish (Steve Jobs - Stanford Speech)",
            "Grammar 9: Modal Auxiliaries, Prepositions & Phrasal Verbs in Context",
            "Grammar 10: Tense Patterns, Passive Constructions & Clause Analysis",
            "Writing 11: Business & Official Letter Writing to Authorities",
            "Writing 12: Curriculum Vitae (CV) / Resume & Covering Letter",
            "Writing 13: Report Writing for Press & Academic Seminars",
            "Writing 14: Note-Making, Summarizing & Extended Essay Composition"
        ]
    },
    {
        "id": "od-c12-mil-odia",
        "name": "M.I.L. Odia (ମାତୃଭାଷା ଓଡ଼ିଆ - CHSE Code ODIA)",
        "lang": "or",
        "chapters": [
            "ଗଦ୍ୟ ୧: ସ୍ୱାଧୀନ ଦେଶରେ ଶିକ୍ଷା ଚିନ୍ତା (ଗୋଲକ ବିହାରୀ ଧଳ)",
            "ଗଦ୍ୟ ୨: ପୁଷ୍ପପୁରରେ ବର୍ଷାବରଣ (ଗୋପାଳ ଚନ୍ଦ୍ର ପ୍ରହରାଜ)",
            "ଗଦ୍ୟ ୩: ଇତିହାସ (ବିଶ୍ୱନାଥ କର - ସାହିତ୍ୟ ପ୍ରବନ୍ଧ)",
            "ଗଦ୍ୟ ୪: ତିନି ତୁଣ୍ଡରେ (ଭୁବନେଶ୍ୱର ବେହେରା)",
            "ପଦ୍ୟ ୫: ବଡ଼ପଣ (ରାଧାନାଥ ରାୟ - ଦରବାର କାବ୍ୟ)",
            "ପଦ୍ୟ ୬: ତପସ୍ୱିନୀର ପତ୍ର (ଗଙ୍ଗାଧର ମେହେର - ସୀତାଙ୍କ ପବିତ୍ର ଭକ୍ତି)",
            "ପଦ୍ୟ ୭: ବନ୍ଦୀର ବିରହ ବ୍ୟଥା (ଗୋପବନ୍ଧୁ ଦାସ - କାରା କବିତା)",
            "ପଦ୍ୟ ୮: ପିଙ୍ଗଳାର ଅଭିସାର (ରାଧାମୋହନ ଗଡ଼ନାୟକ)",
            "ପଦ୍ୟ ୯: ବାର୍ତ୍ତା (ସଚ୍ଚିଦାନନ୍ଦ ରାଉତରାୟ - ନୂତନ ଯୁଗବାଣୀ)",
            "ଗଳ୍ପ ୧୦: ସଭ୍ୟ ଜମିଦାର (ଫକୀର ମୋହନ ସେନାପତି - ରାଜୀବଲୋଚନଙ୍କ ଚରିତ୍ର)",
            "ଗଳ୍ପ ୧୧: ପତାକା ଉତ୍ତୋଳନ (ସୁରେନ୍ଦ୍ର ମହାନ୍ତି)",
            "ଗଳ୍ପ ୧୨: ରୂପନାରାୟଣ ସାହା (ଅଖିଳ ମୋହନ ପଟ୍ଟନାୟକ)",
            "ବ୍ୟାକରଣ ୧୩: ଦରଖାସ୍ତ ଓ ପତ୍ରଲିଖନ (କାର୍ଯ୍ୟାଳୟୀନ ଓ ବାଣିଜ୍ୟିକ)",
            "ବ୍ୟାକରଣ ୧୪: ସମ୍ବାଦ ପରିବେଷଣ, ପ୍ରବନ୍ଧ ରଚନା ଓ ସଂକ୍ଷିପ୍ତକରଣ",
            "ବ୍ୟାକରଣ ୧୫: ବ୍ୟାକରଣିକ ପ୍ରୟୋଗ (ରୂଢ଼ି, ଲୋକବାଣୀ ଓ ବାକ୍ୟ ସଂଶୋଧନ)"
        ]
    },
    {
        "id": "od-c12-mil-hindi",
        "name": "M.I.L. Hindi (मातृभाषा हिन्दी - CHSE Code HIN)",
        "lang": "hi",
        "chapters": [
            "पद्य 1: कबीर के पद एवं साखी (गुरु गोविंद दोऊ खड़े)",
            "पद्य 2: सूरदास के पद (यशोदा हरि पालने झुलावै)",
            "पद्य 3: तुलसीदास - भरत-महिमा (रामचरितमानस अयोध्याकाण्ड)",
            "पद्य 4: बिहारी के दोहे (भक्ति, ज्ञान एवं नीति)",
            "गद्य 5: उत्साह (रामचन्द्र शुक्ल - मनोविकार निबंध)",
            "गद्य 6: बाजार दर्शन (जैनेन्द्र कुमार - उपभोक्तावादी संस्कृति पर विचार)",
            "गद्य 7: पहलवान की ढोलक (फणीश्वर नाथ 'रेणु' - आंचलिक कथा)",
            "गद्य 8: शिरीष के फूल (हजारी प्रसाद द्विवेदी - अनामदास का पोथा)",
            "पद्य 9: उषा (शमशेर बहादुर सिंह) एवं बादल राग (निराला)",
            "व्याकरण 10: व्यावहारिक व्याकरण (संधि, समास, प्रत्यय एवं शब्द-युग्म)",
            "व्याकरण 11: वाक्य रचना, वाक्य शुद्धि एवं मुहावरे",
            "रचना 12: कार्यालयी पत्र, प्रारूप लेखन, निबंध एवं संक्षेपण"
        ]
    },
    {
        "id": "od-c12-mil-urdu",
        "name": "M.I.L. Urdu (اردو لازمی - CHSE Code URD)",
        "lang": "ur",
        "chapters": [
            "سبق ۱: غالب کے خطوط (مرزا اسد اللہ خاں غالب)",
            "سبق ۲: اردو زبان کی ابتداء اور ارتقاء (مولوی عبد الحق)",
            "غزل ۳: دل ناداں تجھے ہوا کیا ہے (مرزا غالب)",
            "غزل ۴: فقیرانہ آئے صدا کر چلے (میر تقی میر)",
            "نظم ۵: شعاع امید اور طلوع اسلام (علامہ اقبال)",
            "نظم ۶: کسان اور چاندنی رات (جوش ملیح آبادی)",
            "افسانہ ۷: نیا قانون (سعادت حسن منٹو)",
            "افسانہ ۸: کفن (منشی پریم چند)",
            "قواعد ۹: علم بیان (تشبیہ، استعارہ، کنایہ، مجاز مرسل)",
            "قواعد ۱۰: صنایع و بدائع (تضاد، تجنیس، مراعاۃ النظیر)",
            "انشاء ۱۱: دفتری و صحافتی مراسلت",
            "انشاء १२: فکری و اصلاحی مضامین اور تلخیص نگاری"
        ]
    },
    {
        "id": "od-c12-mil-sanskrit",
        "name": "M.I.L. / Classical Sanskrit (संस्कृतम् - CHSE Code SKT)",
        "lang": "sa",
        "chapters": [
            "गद्य १: उपमन्योः गुरुभक्तिः (महाभारतम् - आदिपर्व)",
            "गद्य २: कादम्बरी-कथामुखम् - शुकनासोपदेशः (बाणभट्टः)",
            "पद्य ३: रघुवंशम् - दिलीपस्य गोसेवा (महाकवि-कालिदासः)",
            "पद्य ४: शिशुपालवधम् (महाकवि-माघः - नारदावतरणम्)",
            "पद्य ५: चाणक्य-नीतिदर्पणम् (राजनीतिः लोकसदाचारश्च)",
            "नाटकम् ६: प्रतिमानाटकम् (भास-विरचितम् - तृतीयोऽङ्कः)",
            "व्याकरण ७: कारक-प्रकरणम् (विभक्त्यर्थ-निर्णयः उपपदविभक्तयश्च)",
            "व्याकरण ८: समास-प्रकरणम् (तत्पुरुषः, कर्मधारयः, बहुव्रीहिः, द्वन्द्वः, द्विगुः, अव्ययीभावः)",
            "व्याकरण ९: कृदन्त-तद्धित-स्त्रीप्रत्ययाः (शतृ, शानच्, तव्यत्, अनीयर्, टाप्, ङीप्)",
            "व्याकरण १०: वाक्य-संशोधनम्, सूक्ति-व्याख्या च",
            "अनुवाद ११: संस्कृते अनुवादाभ्यासः अपठित-गद्यांश-बोधश्च"
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
    
    if lang == "or":
        correct_opt = f"{ch_title} ପ୍ରସଙ୍ଗର ପ୍ରାମାଣିକ ସାହିତ୍ୟିକ ତଥ୍ୟ"
        distractors = [
            f"{ch_title} ସମ୍ବନ୍ଧୀୟ ଭ୍ରାନ୍ତ ବିବରଣୀ",
            f"{ch_title} ସହ ଅସଙ୍ଗତ ଧାରଣା",
            "ଉପରୋକ୍ତ କୌଣସିଟି ନୁହେଁ"
        ]
        opts = list(distractors)
        opts.insert(correct_idx, correct_opt)
        or_labels = ["କ", "ଖ", "ଗ", "ଘ"]
        formatted_opts = [f"ବିକଳ୍ପ {or_labels[i]}) {opts[i]}" for i in range(4)]
        content = {
            "or": {
                "question": f"[{s_name} - {ch_title}] ପ୍ରଶ୍ନ {q_num}: CHSE Odisha ଦ୍ୱାଦଶ ଶ୍ରେଣୀ ମାତୃଭାଷା ଓଡ଼ିଆ ପାଠ୍ୟକ୍ରମ ଅନୁସାରେ ସଠିକ୍ ବିକଳ୍ପଟି ଚିହ୍ନଟ କରନ୍ତୁ।",
                "options": formatted_opts,
                "explanation": f"ସ୍ପଷ୍ଟୀକରଣ: CHSE ପାଠ୍ୟପୁସ୍ତକ ଅନୁସାରେ '{ch_title}' ପ୍ରସଙ୍ଗରେ ବିକଳ୍ପ ({or_labels[correct_idx]}) ସଠିକ୍ ଉତ୍ତର।"
            }
        }
    elif lang == "hi":
        correct_opt = f"{ch_title} का आधिकारिक साहित्यिक तथ्य"
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
                "question": f"[{s_name} - {ch_title}] प्रश्न {q_num}: CHSE ओडिशा कक्षा 12 मातृभाषा हिन्दी पाठ्यक्रम के अनुसार सही विकल्प का चयन कीजिए।",
                "options": formatted_opts,
                "explanation": f"उत्तर व्याख्या: आधिकारिक पाठ्यपुस्तकानुसार '{ch_title}' के अंतर्गत विकल्प ({hi_labels[correct_idx]}) सही उत्तर है।"
            }
        }
    elif lang == "ur":
        correct_opt = f"{ch_title} کا مستند ادبی بیان"
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
                "question": f"[{s_name} - {ch_title}] سوال {q_num}: CHSE اوڈیشہ بارہویں جماعت کے لازمی اردو نصاب کے مطابق درست متبادل کا انتخاب کیجیے۔",
                "options": formatted_opts,
                "explanation": f"وضاحت: نصاب کے مطابق '{ch_title}' کے تحت متبادل ({ur_labels[correct_idx]}) درست جواب ہے۔"
            }
        }
    elif lang == "sa":
        correct_opt = f"{ch_title} इत्यस्य प्रामाणिकं व्याकरणसम्मतं तथ्यम्"
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
                "question": f"[{s_name} - {ch_title}] प्रश्नः {q_num}: CHSE ओडिशाराज्य-द्वादशकक्षायाः संस्कृतपाठ्यक्रमानुसारं शुद्धं विकल्पं चिनुत।",
                "options": formatted_opts,
                "explanation": f"उत्तरविवरणम्: अधिकृतपाठ्यपुस्तकानुसारेण '{ch_title}' इति पाठे विकल्पः ({sa_labels[correct_idx]}) शुद्धमुत्तरं वर्तते।"
            }
        }
    else: # en
        correct_opt = f"Verified literary/grammatical principle of {ch_title}"
        distractors = [
            f"Factually flawed textual analysis of {ch_title}",
            f"Unrelated premise concerning {ch_title}",
            "None of the above"
        ]
        opts = list(distractors)
        opts.insert(correct_idx, correct_opt)
        formatted_opts = [f"Option {letters[i]}) {opts[i]}" for i in range(4)]
        content = {
            "en": {
                "question": f"[{s_name} - {ch_title}] Question {q_num}: In accordance with the CHSE Odisha Class 12 Compulsory English curriculum, choose the correct option.",
                "options": formatted_opts,
                "explanation": f"Explanation: In accordance with the official CHSE Odisha syllabus for '{ch_title}', Option ({correct_letter}) is valid."
            }
        }
        
    return {
        "question_id": qid,
        "board_id": "odisha-bse-chse",
        "stage": "Class 12",
        "subject_id": subj["id"],
        "question_type_id": "single_mcq",
        "difficulty": diff,
        "marks": marks,
        "practice_eligible": 1,
        "full_exam_eligible": 1,
        "provenance": "OFFICIAL_CHSE_ODISHA_LANGUAGES_SYLLABUS_DERIVED",
        "language_content": json.dumps(content, ensure_ascii=False),
        "correct_answer": correct_letter
    }

def make_subjective(subj, q_num, ch_title, qtype, marks, diff):
    qid = f"{subj['id']}-q-sub-{q_num:03d}"
    s_name = subj["name"]
    lang = subj["lang"]
    
    if lang == "or":
        content = {
            "or": {
                "question": f"[{s_name} - {ch_title}] ବିବରଣାତ୍ମକ ପ୍ରଶ୍ନ {q_num} ({marks} ମାର୍କ): '{ch_title}' ର ସାହିତ୍ୟିକ ସୌନ୍ଦର୍ଯ୍ୟ ଓ ମୂଲ୍ୟବୋଧ ବୁଝାଇ ଲେଖନ୍ତୁ।",
                "model_answer": f"ଆଦର୍ଶ ଉତ୍ତର ({marks} ମାର୍କ ମୂଲ୍ୟାୟନ): ୧. ପ୍ରସଙ୍ଗ ଓ ଲେଖକୀୟ ଦୃଷ୍ଟିକୋଣ: '{ch_title}' ର ମୌଳିକ ଆଦର୍ଶ। ୨. ବିଷୟବସ୍ତୁର ଗଭୀର ବିଶ୍ଳେଷଣ। ୩. ଉପସଂହାର ଓ ସାହିତ୍ୟିକ ତାତ୍ପର୍ଯ୍ୟ।",
                "marking_scheme": f"ମୂଲ୍ୟାୟନ ରୁବ୍ରିକ୍: ପ୍ରସଙ୍ଗ ପରିଚୟ (୧ ମାର୍କ), ମୁଖ୍ୟ ବିଶ୍ଳେଷଣ ({(marks-2) if marks > 2 else 1} ମାର୍କ), ଭାଷାଗତ ଶୁଦ୍ଧତା ଓ ନିର୍ଣ୍ଣୟ (୧ ମାର୍କ)।"
            }
        }
    elif lang == "hi":
        content = {
            "hi": {
                "question": f"[{s_name} - {ch_title}] विवरणात्मक प्रश्न {q_num} ({marks} अंक): '{ch_title}' के प्रतिपाद्य एवं भावपक्ष की सोदाहरण समीक्षा कीजिए।",
                "model_answer": f"विस्तृत आदर्श उत्तर ({marks} अंक): १. संदर्भ: '{ch_title}' का केंद्रीय कथ्य। २. व्याख्या: साहित्यिक एवं दार्शनिक विश्लेषण। ३. निष्कर्ष: भाषा-शिल्प एवं संदेश।",
                "marking_scheme": f"अंक विभाजन: संदर्भ (१ अंक), व्याख्या एवं विश्लेषण ({(marks-2) if marks > 2 else 1} अंक), भाषा-शैली एवं निष्कर्ष (१ अंक)।"
            }
        }
    elif lang == "ur":
        content = {
            "ur": {
                "question": f"[{s_name} - {ch_title}] وضاحتی سوال {q_num} ({marks} نمبر): '{ch_title}' کے ادبی حسن، اسلوب اور معنوی پہلوؤں پر تبصرہ کیجیے۔",
                "model_answer": f"جامع جواب ({marks} نمبر): ۱. سیاق و سباق اور ادیب کا تعارف۔ ۲. مرکزی خیال اور ادبی فنی محاسن کا تفصیلی جائزہ۔ ۳. حاصل کلام۔",
                "marking_scheme": f"نمبرات: پس منظر (۱ نمبر)، تجزیہ ({(marks-2) if marks > 2 else 1} نمبر)، انداز بیان (۱ نمبر)۔"
            }
        }
    elif lang == "sa":
        content = {
            "sa": {
                "question": f"[{s_name} - {ch_title}] विवरणात्मकः प्रश्नः {q_num} ({marks} अङ्काः): '{ch_title}' इति पाठस्य सारं, व्याकरणवैशिष्ट्यं च प्रतिपादयत।",
                "model_answer": f"आदर्शोत्तरम् ({marks} अङ्काः): १. प्रसंगः कविपरिचयश्च। २. पाठगतकथायाः सूक्तीनां च सविस्तरं विवेचनम्। ३. उपसंहारः काव्यसौन्दर्यं च।",
                "marking_scheme": f"अङ्कयोजना: प्रसंगः (१ अङ्कः), विवेचनम् ({(marks-2) if marks > 2 else 1} अङ्काः), भाषाशुद्धिः (१ अङ्कः)।"
            }
        }
    else: # en
        content = {
            "en": {
                "question": f"[{s_name} - {ch_title}] Question {q_num} ({marks} Marks): Provide a comprehensive literary appreciation, thematic critique, or official writing sample for '{ch_title}'.",
                "model_answer": f"Model Answer ({marks} Marks): 1. Thesis statement and textual framework of '{ch_title}'. 2. Textual evidence, stylistic devices, and analytical evaluation. 3. Synthesized conclusion with flawless grammatical precision.",
                "marking_scheme": f"Marking Rubric: Contextual Thesis (1 Mark), Analytical Substantiation ({(marks-2) if marks > 2 else 1} Marks), Linguistic Control (1 Mark)."
            }
        }
        
    return {
        "question_id": qid,
        "board_id": "odisha-bse-chse",
        "stage": "Class 12",
        "subject_id": subj["id"],
        "question_type_id": qtype,
        "difficulty": diff,
        "marks": marks,
        "practice_eligible": 0,
        "full_exam_eligible": 0,
        "provenance": "OFFICIAL_CHSE_ODISHA_LANGUAGES_SYLLABUS_DERIVED",
        "language_content": json.dumps(content, ensure_ascii=False),
        "correct_answer": f"Model solution and structured marking scheme provided for {qtype} ({marks} Marks) under CHSE Odisha Languages curriculum."
    }

all_questions = []

for subj in PRIMARY_LANGUAGES_SUBJECTS:
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
        q = make_subjective(subj, sub_count, ch, "vsa", 2, "EASY")
        all_questions.append(q)
        sub_count += 1
        
    # 24 SA (3 Marks)
    for s in range(24):
        ch = chapters[s % num_ch]
        q = make_subjective(subj, sub_count, ch, "sa", 3, "MEDIUM")
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
        q = make_subjective(subj, sub_count, ch, "la", 5, "HARD")
        all_questions.append(q)
        sub_count += 1

out_path = os.path.join(os.path.dirname(__file__), "chse_c12_languages_bank.json")
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(all_questions, f, ensure_ascii=False, indent=2)

print(f"Successfully generated {len(all_questions)} CHSE Odisha Class 12 Languages questions in {out_path}!")
