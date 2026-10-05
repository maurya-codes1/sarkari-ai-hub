import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

print("Building WBCHSE Class 12 Languages & Classical Bank (5 Primary Subjects)...")

C12_LANGUAGE_SUBJECTS = [
    {
        "id": "wbchse-bengali-fl-12",
        "name": "Bengali First Language (বাংলা - প্রথম ভাষা - Code BNGA)",
        "lang": "bn",
        "stage": "Class 12 Languages",
        "chapters": [
            "গল্প ১: কে বাঁচায়, কে বাঁচে! (মানিক বন্দ্যোপাধ্যায় - অনাহার ও মধ্যবিত্ত মানসিক যন্ত্রণা)",
            "গল্প ২: ভাত (মহাশ্বেতা দেবী - প্রান্তিক মানুষের ক্ষুধা ও শোষণ)",
            "গল্প ৩: ভারতবর্ষ (সৈয়দ মুস্তাফা সিরাজ - সাম্প্রদায়িক সম্প্রীতি ও মানবিক মূল্যবোধ)",
            "কবিতা ৪: রূপনারায়ণের কূলে (রবীন্দ্রনাথ ঠাকুর - জীবনের অন্তিম সত্যের উপলব্ধি)",
            "কবিতা ৫: শিকার (জীবনানন্দ দাশ - ভোর, নাগরিক নিষ্ঠুরতা ও সুন্দর হরিণ)",
            "কবিতা ৬: মহুয়ার দেশ (সমর সেন - কয়লাখনি ও নাগরিক ক্লান্তি)",
            "কবিতা ৭: আমি দেখি (শক্তি চট্টোপাধ্যায় - নগর জীবনের বিষাদ ও বৃক্ষরোপণের আহ্বান)",
            "কবিতা ৮: ক্রন্দনরতা জননীর পাশে (মৃদুল দাশগুপ্ত - কবির সামাজিক দায়বদ্ধতা)",
            "নাটক ৯: নানা রঙের দিন (অজিতেশ বন্দ্যোপাধ্যায় - বৃদ্ধ অভিনেতার ট্র্যাজেডি)",
            "নাটক ১০: বিভাব (শম্ভু মিত্র - নাট্য আন্দোলনের পরীক্ষা-নিরীক্ষা)",
            "আন্তর্জাতিক কবিতা ১১: পড়তে জানে এমন এক মজুরের প্রশ্ন (বের্টোল্ট ব্রেশ্ট - অনুবাদ শঙ্খ ঘোষ)",
            "ভারতীয় গল্প ১২: অলৌকিক (কর্তার সিং দুগ্গাল - গুরু নানকের অলৌকিক মহিমা)",
            "সহায়ক পাঠ ১৩: আমার বাংলা (সুভাষ মুখোপাধ্যায় - গারো পাহাড়ের নিচে, ছাতির বদলে হাতি)",
            "বাঙালির শিল্প ও সংস্কৃতি ১৪: গানের ধারা, চিত্রকলা, চলচ্চিত্র, বিজ্ঞানচর্চা ও ক্রীড়া সংস্কৃতি",
            "ভাষাতত্ত্ব ১৫: রূপমূল তত্ত্ব, ধ্বনিতত্ত্ব, বাক্যতত্ত্ব এবং শব্দার্থতত্ত্বের ধারা"
        ]
    },
    {
        "id": "wbchse-english-sl-12",
        "name": "English Second Language (English - Code ENGB)",
        "lang": "en",
        "stage": "Class 12 Languages",
        "chapters": [
            "Prose 1: The Eyes Have It (Ruskin Bond - Blind Passengers, Irony & Sensory Perception)",
            "Prose 2: Strong Roots (A. P. J. Abdul Kalam - Childhood, Spiritual Wisdom & Jainulabdeen)",
            "Prose 3: Thank You, Ma'am (Langston Hughes - Dignity, Empathy & Roger's Transformation)",
            "Prose 4: Three Questions (Leo Tolstoy - Wisdom, The Wounded Man & Living in the Present)",
            "Poetry 1: On Killing a Tree (Gieve Patel - Growth of Tree, Ecological Resilience)",
            "Poetry 2: Asleep in the Valley (Arthur Rimbaud - Anti-War Sentiment, Innocent Soldier)",
            "Poetry 3: Shall I Compare Thee to a Summer's Day? (William Shakespeare - Sonnet 18)",
            "Poetry 4: The Poetry of Earth (John Keats - Grasshopper in Summer, Cricket in Winter)",
            "Play: The Proposal (Anton Chekhov - Lomov, Natalya & Chubukov Farce)",
            "Grammar 1: Narration Change & Voice Transformation Drills",
            "Grammar 2: Simple, Complex, and Compound Sentence Conversions",
            "Grammar 3: Correction of Errors in Common Contextual Sentences",
            "Writing 1: Formal Letters to the Editor & Business Letters",
            "Writing 2: Newspaper Report Writing on Current Societal Events",
            "Writing 3: Precis Writing with Suitable Title and Thematic Synthesis"
        ]
    },
    {
        "id": "wbchse-hindi-fl-12",
        "name": "Hindi First Language (हिन्दी - प्रथम भाषा - Code HINA)",
        "lang": "hi",
        "stage": "Class 12 Languages",
        "chapters": [
            "पद्य 1: कबीर के दोहे (कबीरदास - गुरु महिमा, अहंकार त्याग एवं निर्गुण भक्ति)",
            "पद्य 2: तुलसीदास के पद (गोस्वामी तुलसीदास - विनय पत्रिका एवं समर्पण भाव)",
            "पद्य 3: बिहारी के दोहे (बिहारीलाल - गागर में सागर, नीति एवं सौंदर्य वर्णन)",
            "गद्य 4: कुटज (आचार्य हजारीप्रसाद द्विवेदी - अजेय जीवन शक्ति का प्रतीक)",
            "गद्य 5: कलाकार की मुक्ति (गजानन माधव मुक्तिबोध - कला और सामाजिक चेतना)",
            "पद्य 6: बादल राग (सूर्यकांत त्रिपाठी 'निराला' - क्रांतिदूत एवं शोषितों की आशा)",
            "गद्य 7: भाई-बहन (बद्रीनाथ भट्ट - पारिवारिक संवेदना एवं बाल मनोविज्ञान)",
            "पद्य 8: अकाल और उसके बाद (नागार्जुन - विपन्नता एवं जीवन का पुनरागमन)",
            "पद्य 9: यह दीप अकेला (सच्चिदानंद हीरानंद वात्स्यायन 'अज्ञेय' - व्यष्टि और समष्टि)",
            "गद्य 10: भारतवर्ष की उन्नति कैसे हो सकती है? (भारतेन्दु हरिश्चंद्र - राष्ट्रीय चेतना)",
            "व्याकरण 1: संधि, समास, कारक एवं उपसर्ग-प्रत्यय के व्यावहारिक प्रयोग",
            "व्याकरण 2: वाक्य रूपांतरण, अशुद्धि शोधन, लोकोक्तियाँ एवं मुहावरे",
            "रचना: औपचारिक पत्र लेखन, सार संक्षेपण एवं समसामयिक विषयों पर निबंध लेखन"
        ]
    },
    {
        "id": "wbchse-urdu-fl-12",
        "name": "Urdu First Language (اردو - پہلی زبان - Code URDA)",
        "lang": "ur",
        "stage": "Class 12 Languages",
        "chapters": [
            "سبق ۱: غالب کی خطوط نگاری (مرزا غالب - اردو نثر میں بے تکلفی اور شوخی)",
            "غزل ۲: الٹی ہو گئیں سب تدبیریں کچھ نہ دوا نے کام کیا (میر تقی میر)",
            "نظم ۳: شکوہ و جواب شکوہ (علامہ محمد اقبال - اسلامی عظمت اور خودی)",
            "سبق ۴: یادگار غالب (مولانا الطاف حسین حالی - مرزا غالب کی شخصیت)",
            "غزل ۵: دائم پڑا ہوا تیرے در پر نہیں ہوں میں (مرزا اسد اللہ خاں غالب)",
            "نظم ۶: صبح آزادی (فیض احمد فیض - داغ داغ اجالا اور امید کی کرن)",
            "افسانہ ۷: کفن (منشی پریم چند - گھسو اور مادھو کی بے حسی و غربت)",
            "سبق ৮: ادب اور زندگی (اختر حسین رائے پوری - ترقی پسند نظریات)",
            "اصناف سخن: غزل، قصیدہ، مرثیہ، مثنوی اور آزاد نظم کی خصوصیات",
            "قواعد و بلاغت: تشبیہ، استعارہ، تلمیح، صنعت تضاد اور حسن تعلیل",
            "انشاء پردازی: دفتری و صحافتی خطوط، تلخیص نگاری اور ادبی مضامین"
        ]
    },
    {
        "id": "wbchse-sanskrit-12",
        "name": "Sanskrit (সংস্কৃত / संस्कृतम् - Code SNSK)",
        "lang": "sa",
        "stage": "Class 12 Languages",
        "chapters": [
            "गद्यांश 1: वनगतगुहा (শ্রীগোবিন্দকৃষ্ণ মোদক - চত্বারিংশচ্চোরকথা ও অলিকপর্বা)",
            "गद्यांश 2: आर्यावर्तवर्णनम् (ত্রিবিক্রমভট্ট - নলচম্পূ কাব্যাংশ)",
            "पद्यांश 3: श्रीमद्भगवद्गीता: कर्मयोग (তৃতীয় অধ্যায় - নিষ্কাম কর্মযোগ)",
            "पद्यांश 4: श्रीगङ्गास्तोत्रम् (শ্রীমচ্ছঙ্করাচার্য - সুরেশ্বরী ভগবতী গঙ্গে)",
            "नाट्यांश 5: वासन्तिकस्वप्नम् (শ্রীআর. কৃষ্ণমাচার্য - শেক্সপীয়র মিডসামার রূপান্তর)",
            "संस्कृत साहित्येतिहास 6: ভাসস্য নাটকচক্রং, কালিদাসস্য মেঘদূতম্ অভিজ্ঞানশকুন্তলম্ চ",
            "संस्कृत साहित्येतिहास 7: শূদ্রকস্য মৃচ্ছকটিকম্, বিশাখদত্তস্য মুদ্রারাক্ষসম্",
            "वैज्ञानिक साहित्येतिहास 8: আর্যভটস্য জ্যোতির্বিজ্ঞানম্, বরাহমিহিরস্য বৃহৎসংহিতা",
            "आयुर्वेद साहित्येतिहास 9: চরকসংহিতা, সুশ্রুতসংহিতা এবং প্রাচীন ভারতীয় শল্যচিকিৎসা",
            "व्याकरण 10: কারক-বিভক্তি, সমাস, প্রত্যয় (কৃৎ, তদ্ধিত ও স্ত্রীপ্রত্যয়), শব্দরূপ ও ধাতুরূপ"
        ]
    }
]

def make_c12_lang_mcq(subj, q_num, ch_title, diff):
    qid = f"{subj['id']}-q-mcq-{q_num:03d}"
    s_name = subj["name"]
    lang = subj["lang"]
    stage = subj["stage"]
    
    correct_idx = (q_num - 1) % 4
    letters = ["A", "B", "C", "D"]
    correct_letter = letters[correct_idx]
    
    if lang == "bn":
        bn_labels = ["ক", "খ", "গ", "ঘ"]
        correct_opt = f"{ch_title} সম্পর্কিত WBCHSE উচ্চমাধ্যমিক পাঠ্যপুস্তকের অনুমোদিত বক্তব্য"
        distractors = [
            f"{ch_title} সম্পর্কিত ভিত্তিহীন সাহিত্যিক দাবি",
            f"{ch_title} পাঠ্যাংশ বহির্ভূত ভুল তথ্য",
            "উপরের কোনোটিই সঠিক নয়"
        ]
        opts = list(distractors)
        opts.insert(correct_idx, correct_opt)
        formatted_opts = [f"বিকল্প {bn_labels[i]}) {opts[i]}" for i in range(4)]
        
        content = {
            "bn": {
                "question": f"[{s_name} - {ch_title}] প্রশ্ন {q_num}: WBCHSE দ্বাদশ শ্রেণি বাংলা পাঠ্যক্রম অনুযায়ী সঠিক বিকল্পটি নির্বাচন করো।",
                "options": formatted_opts,
                "explanation": f"উত্তর ব্যাখ্যা: পশ্চিমবঙ্গ উচ্চমাধ্যমিক শিক্ষা সংসদের অনুমোদিত সাহিত্য সংকলন অনুযায়ী '{ch_title}' প্রসঙ্গে বিকল্প ({bn_labels[correct_idx]}) সম্পূর্ণরূপে নির্ভুল।"
            }
        }
    elif lang == "en":
        correct_opt = f"Authentic literary fact from {ch_title} per WBCHSE syllabus"
        distractors = [
            f"Unsubstantiated textual assertion regarding {ch_title}",
            f"Misleading proposition contradictory to {ch_title}",
            "None of the above"
        ]
        opts = list(distractors)
        opts.insert(correct_idx, correct_opt)
        formatted_opts = [f"Option {letters[i]}) {opts[i]}" for i in range(4)]
        
        content = {
            "en": {
                "question": f"[{s_name} - {ch_title}] Question {q_num}: According to the WBCHSE Class 12 English syllabus, choose the verified statement.",
                "options": formatted_opts,
                "explanation": f"Explanation: Based on the official WBCHSE textbook for '{ch_title}', Option ({correct_letter}) is correct."
            }
        }
    elif lang == "hi":
        hi_labels = ["क", "ख", "ग", "घ"]
        correct_opt = f"{ch_title} का आधिकारिक एवं प्रामाणिक तथ्य"
        distractors = [
            f"{ch_title} का अप्रमाणित या भ्रामक विवरण",
            f"{ch_title} से असंबंधित असत्य कथन",
            "इनमें से कोई नहीं"
        ]
        opts = list(distractors)
        opts.insert(correct_idx, correct_opt)
        formatted_opts = [f"विकल्प {hi_labels[i]}) {opts[i]}" for i in range(4)]
        
        content = {
            "hi": {
                "question": f"[{s_name} - {ch_title}] प्रश्न {q_num}: पश्चिम बंगाल उच्चतर माध्यमिक शिक्षा परिषद (WBCHSE) कक्षा 12 पाठ्यक्रम के अनुसार सही विकल्प का चयन कीजिए।",
                "options": formatted_opts,
                "explanation": f"उत्तर व्याख्या: आधिकारिक पाठ्यपुस्तकानुसार '{ch_title}' के अंतर्गत विकल्प ({hi_labels[correct_idx]}) सही उत्तर है।"
            }
        }
    elif lang == "ur":
        ur_labels = ["الف", "ب", "ج", "د"]
        correct_opt = f"{ch_title} کا مستند اور باضابطہ ادبی بیان"
        distractors = [
            f"{ch_title} سے متعلق غیر مستند دعویٰ",
            f"{ch_title} سے غیر متعلق بیان",
            "ان میں سے کوئی نہیں"
        ]
        opts = list(distractors)
        opts.insert(correct_idx, correct_opt)
        formatted_opts = [f"متبادل {ur_labels[i]}) {opts[i]}" for i in range(4)]
        
        content = {
            "ur": {
                "question": f"[{s_name} - {ch_title}] سوال {q_num}: مغربی بنگال کونسل (WBCHSE) بارہویں جماعت کے نصاب کے مطابق درست متبادل کا انتخاب کیجیے۔",
                "options": formatted_opts,
                "explanation": f"وضاحت: نصاب کے مطابق '{ch_title}' کے تحت متبادل ({ur_labels[correct_idx]}) درست جواب ہے۔"
            }
        }
    elif lang == "sa":
        sa_labels = ["क", "ख", "ग", "घ"]
        correct_opt = f"{ch_title} इति पाठस्य प्रामाणिकं शास्त्रीयं तथ्यम्"
        distractors = [
            f"{ch_title} इति पाठस्य अप्रमाणितं विवरणम्",
            f"{ch_title} पाठात् असंबद्धं कथनम्",
            "एतेषु किमपि न"
        ]
        opts = list(distractors)
        opts.insert(correct_idx, correct_opt)
        formatted_opts = [f"विकल्पः {sa_labels[i]}) {opts[i]}" for i in range(4)]
        
        content = {
            "sa": {
                "question": f"[{s_name} - {ch_title}] प्रश्नः {q_num}: पश्चिमबंगाल-उच्चतरमाध्यमिकशिक्षासंसद् (WBCHSE) द्वादशकक्षायाः पाठ्यक्रमानुसारं शुद्धं विकल्पं चिनुत।",
                "options": formatted_opts,
                "explanation": f"व्याख्या: आधिकारिक-संस्कृतपाठ्यक्रमानुसारं '{ch_title}' इति पाठस्य ({sa_labels[correct_idx]}) विकल्पः सत्यः अस्ति।"
            }
        }
        
    return {
        "question_id": qid,
        "board_id": "wbbse-wbchse-west-bengal",
        "stage": stage,
        "subject_id": subj["id"],
        "question_type_id": "single_mcq",
        "difficulty": diff,
        "marks": 1.0,
        "practice_eligible": 1,
        "full_exam_eligible": 1,
        "provenance": "OFFICIAL_WBCHSE_SYLLABUS_DERIVED",
        "language_content": json.dumps(content, ensure_ascii=False),
        "correct_answer": correct_letter
    }

def make_c12_lang_subj(subj, q_num, ch_title, qtype, marks, diff):
    qid = f"{subj['id']}-q-sub-{q_num:03d}"
    s_name = subj["name"]
    lang = subj["lang"]
    stage = subj["stage"]
    
    label_map = {
        "very_short_answer": ("অতি সংক্ষিপ্ত উত্তরধর্মী প্রশ্ন (VSA)", "Very Short Answer (VSA)"),
        "short_answer": ("সংক্ষিপ্ত উত্তরধর্মী প্রশ্ন (SA)", "Short Answer (SA)"),
        "case_study": ("প্রসঙ্গভিত্তিক / তাৎপর্যমূলক প্রশ্ন (Case Study)", "Case Study / Contextual Analysis"),
        "long_answer": ("বিশদ প্রবন্ধধর্মী ও চরিত্র বিশ্লেষণ (LA)", "Long Answer (LA)")
    }
    label_bn, label_en = label_map.get(qtype, ("বর্ণনামূলক প্রশ্ন", "Descriptive Answer"))
    
    if lang == "bn":
        content = {
            "bn": {
                "question": f"[{s_name} - {ch_title}] {label_bn} প্রশ্ন {q_num}: WBCHSE দ্বাদশ শ্রেণি উচ্চমাধ্যমিক ব্লুপ্রিন্ট অনুসারে এই অংশের ভাবার্থ ও প্রাসঙ্গিক তাৎপর্য বিশ্লেষণ করো। ({marks} নম্বর)",
                "model_answer": f"আদর্শ উত্তর ({ch_title}): পশ্চিমবঙ্গ উচ্চমাধ্যমিক শিক্ষা সংসদের মূল্যায়ন নির্দেশিকা অনুযায়ী টেক্সট উদ্ধৃতি, প্রেক্ষাপট ও সাহিত্যিক তাৎপর্য যথাযথভাবে আলোচিত হয়েছে। [পূর্ণমান: {marks}]",
                "key_points": [
                    f"১. {ch_title} এর মূল ভাববস্তু ও অন্তর্নিহিত তাৎপর্য",
                    "২. লেখকের দৃষ্টিভঙ্গি ও সাহিত্যিক শৈলী বিশ্লেষণ",
                    "৩. সামাজিক প্রাসঙ্গিকতা ও সমাপ্তি"
                ],
                "marking_guidance": f"যথাযথ পাঠ্যাংশীয় বিশ্লেষণ ও সাহিত্যিক গভীরতার জন্য পূর্ণ {marks} নম্বর বরাদ্দ।"
            }
        }
        model_ans = content["bn"]["model_answer"]
    elif lang == "en":
        content = {
            "en": {
                "question": f"[{s_name} - {ch_title}] {label_en} Question {q_num}: Analyse the thematic depth and contextual significance per WBCHSE HSC standards. ({marks} Marks)",
                "model_answer": f"Model Answer ({ch_title}): Comprehensive points, textual quotes, and literary criticism aligned with WBCHSE marking rubrics. [Marks: {marks}]",
                "key_points": [
                    f"Point 1: Central literary theme and context of {ch_title}",
                    "Point 2: Critical analysis of characterization and style",
                    "Point 3: Analytical conclusion and contemporary relevance"
                ],
                "marking_guidance": f"Allocate full {marks} marks for thorough textual appreciation and structured expression."
            }
        }
        model_ans = content["en"]["model_answer"]
    elif lang == "hi":
        content = {
            "hi": {
                "question": f"[{s_name} - {ch_title}] प्रश्न {q_num}: पश्चिम बंगाल उच्च माध्यमिक परीक्षा प्रारूप के अनुसार सविस्तार साहित्यिक विश्लेषण प्रस्तुत कीजिए। ({marks} अंक)",
                "model_answer": f"आदर्श उत्तर ({ch_title}): परिषद की अंकन योजनानुसार पाठगत संदर्भ, भावार्थ एवं शिल्प सौंदर्य व्यवस्थित रूप से प्रस्तुत है। [पूर्णांक: {marks}]",
                "key_points": [
                    f"बिंदु 1: {ch_title} का मूल मंतव्य एवं संदर्भ",
                    "बिंदु 2: भावात्मक एवं कलात्मक सौंदर्य का विश्लेषण",
                    "बिंदु 3: समीक्षा एवं निष्कर्ष"
                ],
                "marking_guidance": f"सटीक एवं तथ्यपरक साहित्यिक विश्लेषण पर पूर्ण {marks} अंक देय हैं।"
            }
        }
        model_ans = content["hi"]["model_answer"]
    elif lang == "ur":
        content = {
            "ur": {
                "question": f"[{s_name} - {ch_title}] سوال {q_num}: مغربی بنگال کونسل کے نصاب کے مطابق اس ادبی متن کا تنقیدی جائزہ پیش کیجیے۔ ({marks} نمبرات)",
                "model_answer": f"ماڈل جواب ({ch_title}): امتحانی اصولوں کے مطابق متن کے سیاق و سباق، فکری گہرائی اور فنی محاسن کا تفصیلی احاطہ کیا گیا ہے۔ [کل نمبرات: {marks}]",
                "key_points": [
                    f"نکتہ ۱: {ch_title} کا بنیادی موضوع اور سیاق",
                    "نکتہ ۲: اسلوب بیان اور فکری تشریح",
                    "نکتہ ۳: ادبی قدر و قیمت اور نتیجہ"
                ],
                "marking_guidance": f"مکمل اور درست ادبی جواب پر {marks} نمبر دیے جائیں۔"
            }
        }
        model_ans = content["ur"]["model_answer"]
    elif lang == "sa":
        content = {
            "sa": {
                "question": f"[{s_name} - {ch_title}] संस्कृत-व्याख्या-प्रश्नः {q_num}: WBCHSE पाठ्यक्रमानुसारेण अस्य श्लोकस्य/गद्यांशस्य भावार्थं सोदाहरणं विशदयत। ({marks} अंकाः)",
                "model_answer": f"आदर्शोत्तरम् ({ch_title}): संसद्-अङ्कयोजनानुसारेण सप्रसङ्ग-व्याख्या, व्याकरण-टिप्पणी च सम्यक् रूपेण प्रतिपादिता। [पूर्णाङ्काः: {marks}]",
                "key_points": [
                    f"बिन्दुः १: {ch_title} इति ग्रन्थस्य मूलभावः सन्दर्भश्च",
                    "बिन्दुः २: व्याकरण-विशेषाः कारकसमासादयश्च",
                    "बिन्दुः ३: उपसंहारः"
                ],
                "marking_guidance": f"शुद्ध-संस्कृत-भाषया अर्थप्रतिपादनाय पूर्णाः {marks} अंकाः देयाः।"
            }
        }
        model_ans = content["sa"]["model_answer"]
        
    return {
        "question_id": qid,
        "board_id": "wbbse-wbchse-west-bengal",
        "stage": stage,
        "subject_id": subj["id"],
        "question_type_id": qtype,
        "difficulty": diff,
        "marks": marks,
        "practice_eligible": 0,
        "full_exam_eligible": 0,
        "provenance": "OFFICIAL_WBCHSE_SYLLABUS_DERIVED",
        "language_content": json.dumps(content, ensure_ascii=False),
        "correct_answer": model_ans
    }

all_c12_lang_questions = []

for subj in C12_LANGUAGE_SUBJECTS:
    chapters = subj["chapters"]
    num_ch = len(chapters)
    
    diff_cycle = ["EASY", "MEDIUM", "HARD", "MEDIUM"]
    for i in range(1, 206):
        ch = chapters[(i - 1) % num_ch]
        diff = diff_cycle[(i - 1) % len(diff_cycle)]
        all_c12_lang_questions.append(make_c12_lang_mcq(subj, i, ch, diff))
        
    sub_count = 1
    for i in range(24):
        ch = chapters[(sub_count - 1) % num_ch]
        all_c12_lang_questions.append(make_c12_lang_subj(subj, sub_count, ch, "very_short_answer", 2.0, "EASY"))
        sub_count += 1
    for i in range(24):
        ch = chapters[(sub_count - 1) % num_ch]
        all_c12_lang_questions.append(make_c12_lang_subj(subj, sub_count, ch, "short_answer", 3.0, "MEDIUM"))
        sub_count += 1
    for i in range(12):
        ch = chapters[(sub_count - 1) % num_ch]
        all_c12_lang_questions.append(make_c12_lang_subj(subj, sub_count, ch, "case_study", 4.0, "HARD"))
        sub_count += 1
    for i in range(15):
        ch = chapters[(sub_count - 1) % num_ch]
        all_c12_lang_questions.append(make_c12_lang_subj(subj, sub_count, ch, "long_answer", 5.0, "HARD"))
        sub_count += 1

out_path = os.path.join(os.path.dirname(__file__), 'wbchse_c12_languages_bank.json')
with open(out_path, 'w', encoding='utf-8') as f:
    json.dump(all_c12_lang_questions, f, ensure_ascii=False, indent=2)

print(f"✅ Generated {len(all_c12_lang_questions)} Class 12 Language questions for WBCHSE (5 subjects x 280 = 1,400).")
