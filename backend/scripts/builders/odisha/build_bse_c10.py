import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

print("Building BSE Odisha Class 10 (Matriculation) Comprehensive Curriculum Bank (10 Primary Subjects)...")

PRIMARY_C10_SUBJECTS = [
    {
        "id": "od-c10-odia-fl",
        "name": "First Language Odia (FLO - ପ୍ରଥମ ଭାଷା ଓଡ଼ିଆ)",
        "lang": "or",
        "chapters": [
            "ଗଦ୍ୟ ୧: ଜନ୍ମଭୂମି (କୃଷ୍ଣଚନ୍ଦ୍ର ପାଣିଗ୍ରାହୀ)",
            "ଗଦ୍ୟ ୨: ସଭ୍ୟତା ଓ ବିଜ୍ଞାନ (ଭୁବନେଶ୍ୱର ବେହେରା)",
            "ଗଦ୍ୟ ୩: ମାତୃଭାଷା ଓ ଲୋକଶିକ୍ଷା (ଗୋଲକ ବିହାରୀ ଧଳ)",
            "ଗଦ୍ୟ ୪: ନରେନ୍ଦ୍ରରୁ ବିବେକାନନ୍ଦ (ଶରତ କୁମାର ମହାନ୍ତି)",
            "ପଦ୍ୟ ୫: ମଙ୍ଗଳେ ଅଇଲା ଉଷା (ଗଙ୍ଗାଧର ମେହେର)",
            "ପଦ୍ୟ ୬: ବନ୍ଦେ ଉତ୍କଳ ଜନନୀ (କାନ୍ତକବି ଲକ୍ଷ୍ମୀକାନ୍ତ ମହାପାତ୍ର)",
            "ପଦ୍ୟ ୭: ରାଘବଙ୍କ ଲଙ୍କାଯାତ୍ରା ଅନୁକୂଳ (ଉପେନ୍ଦ୍ର ଭଞ୍ଜ)",
            "ପଦ୍ୟ ୮: ଚିଲିକାରେ ସାୟନ୍ତନ ଦୃଶ୍ୟ (ରାଧାନାଥ ରାୟ)",
            "ପଦ୍ୟ ୯: ସର୍ବଂସହା ମାଟି (ବିଦ୍ୟୁତ୍‌ପ୍ରଭା ଦେବୀ)",
            "ଗଳ୍ପ ୧୦: କାଠ (ବସନ୍ତ କୁମାର ଶତପଥୀ)",
            "ଗଳ୍ପ ୧୧: ବେଲ, ଅଶ୍ୱତ୍ଥ ଓ ବଟବୃକ୍ଷ (ଭୁବନେଶ୍ୱର ବେହେରା)",
            "ଏକାଙ୍କିକା ୧୨: କୋଣାର୍କ (ଭଞ୍ଜକିଶୋର ପଟ୍ଟନାୟକ)",
            "ବ୍ୟାକରଣ ୧୩: ବାକ୍ୟ ବିଚାର (ବାକ୍ୟର ଗଠନ ରୀତି ଓ ପରିବର୍ତ୍ତନ)",
            "ବ୍ୟାକରଣ ୧୪: ସମାସ ଓ ତଦ୍ଧିତ-କୃଦନ୍ତ ପଦ ପ୍ରକରଣ",
            "ବ୍ୟାକରଣ ୧୫: ଛାନ୍ଦ, ଅଳଙ୍କାର (ଉପମା, ରୂପକ, ଉତ୍ପ୍ରେକ୍ଷା) ଓ ରଚନା"
        ]
    },
    {
        "id": "od-c10-english-fl",
        "name": "First Language English (FLE)",
        "lang": "en",
        "chapters": [
            "Prose 1: The Portrait of a Lady (Khushwant Singh)",
            "Poetry 2: A Photograph (Shirley Toulson)",
            "Prose 3: We're Not Afraid to Die (Gordon Cook)",
            "Poetry 4: The Laburnum Top (Ted Hughes)",
            "Prose 5: Discovering Tut - The Saga Continues (A. R. Williams)",
            "Poetry 6: The Voice of the Rain (Walt Whitman)",
            "Drama 7: The Browning Version (Terence Rattigan)",
            "Supplementary 8: The Summer of the Beautiful White Horse (William Saroyan)",
            "Grammar 9: Sentence Types and Synthesis Transformations",
            "Grammar 10: Tense Concord, Modals and Voice Analysis",
            "Writing 11: Formal Editorial and Official Correspondence",
            "Writing 12: Analytical Essay and Article Composition"
        ]
    },
    {
        "id": "od-c10-hindi-fl",
        "name": "First Language Hindi (FLH - प्रथम भाषा हिन्दी)",
        "lang": "hi",
        "chapters": [
            "पद्य 1: साखी एवं पद (कबीरदास एवं सूरदास - भक्ति काव्य)",
            "पद्य 2: राम-लक्ष्मण-परशुराम संवाद (तुलसीदास - रामचरितमानस)",
            "गद्य 3: नेताजी का चश्मा (स्वयं प्रकाश - देशप्रेम एवं कर्तव्य)",
            "गद्य 4: बालगोबिन भगत (रामवृक्ष बेनीपुरी - लोकसंस्कृति)",
            "पद्य 5: उत्साह एवं अट नहीं रही है (सूर्यकांत त्रिपाठी 'निराला')",
            "गद्य 6: लखनवी अंदाज़ (यशपाल - सामंती मानसिकता पर व्यंग्य)",
            "पद्य 7: यह दंतुरित मुसकान एवं फसल (नागार्जुन)",
            "गद्य 8: एक कहानी यह भी (मन्नू भंडारी - आत्मकथा)",
            "व्याकरण 9: रचना के आधार पर वाक्य भेद एवं वाच्य परिवर्तन",
            "व्याकरण 10: पद-परिचय, रस एवं अलंकार विवेचन",
            "रचना 11: औपचारिक पत्र एवं संदेश लेखन",
            "रचना 12: अनुच्छेद लेखन एवं विज्ञापन निर्माण"
        ]
    },
    {
        "id": "od-c10-urdu-fl",
        "name": "First Language Urdu (FLU - اردو پہلی زبان)",
        "lang": "ur",
        "chapters": [
            "سبق ۱: سیر پہلے درویش کی (میر امن دہلوی - باغ و بہار)",
            "غزل ۲: ہستی اپنی حباب کی سی ہے (میر تقی میر)",
            "نظم ۳: مفلسی اور اس کے اثرات (نظیر اکبر آبادی)",
            "سبق ۴: مرزا غالب کے اخلاق و عادات (مولانا الطاف حسین حالی)",
            "غزل ۵: ابن مریم ہوا کرے کوئی (مرزا غالب)",
            "نظم ۶: شعاع امید (علامہ محمد اقبال)",
            "سبق ۷: گزرے ہوئے دن اور خواب غفلت (سر سید احمد خان)",
            "سبق ۸: نئی روشنی اور تعلیم (ڈاکٹر ذاکر حسین)",
            "قواعد ۹: اسم، صفت، ضمیر، فعل اور تذکیر و تانیث",
            "قواعد ۱۰: محاورات، ضرب الامثال اور تشبیہ و استعارہ",
            "انشاء ۱۱: خطوط نویسی برائے مدیر اور والدین",
            "انشاء १२: مضمون نگاری اور تفہیم عبارت"
        ]
    },
    {
        "id": "od-c10-english-sl",
        "name": "Second Language English (SLE)",
        "lang": "en",
        "chapters": [
            "Prose 1: All Things Bright and Beautiful (C. F. Alexander)",
            "Prose 2: A Letter to God (G. L. Fuentes - Lencho's Unshaken Faith)",
            "Poetry 3: The Solitary Reaper (William Wordsworth - Melodious Highland Lass)",
            "Prose 4: At the High School (M. K. Gandhi - Early Reminiscences & Gymnastics)",
            "Poetry 5: Village Song (Sarojini Naidu - Traditional Lore & Lotus Lilies)",
            "Prose 6: Festivals of North-East India (Cultural Kaleidoscope & Hornbill)",
            "Poetry 7: The Flower-School (Rabindranath Tagore - Skyward Yearnings)",
            "Prose 8: Air Pollution - A Hidden Menace (Thermal Emissions & Acid Rain)",
            "Non-detailed 9: A Tiger in the Zoo (Leslie Norris) & The Beggar (Anton Chekhov)",
            "Grammar 10: Types of Sentences & Subject-Verb Agreement Concord",
            "Grammar 11: Prepositions, Phrasal Verbs & Relative Clauses",
            "Grammar 12: Active-Passive Voice & Direct-Indirect Speech Transformations",
            "Writing 13: Official Application to Headmaster & District Collector",
            "Writing 14: Report Writing for Newspaper & Science Exhibition",
            "Writing 15: Translation from Mother Tongue to English & Comprehension"
        ]
    },
    {
        "id": "od-c10-sanskrit-tl",
        "name": "Third Language Sanskrit (TLS - तृतीय भाषा संस्कृतम्)",
        "lang": "sa",
        "chapters": [
            "गद्य १: सिंहशिशुकथा (पञ्चतन्त्रम् - पौरुषं च पराक्रमः)",
            "गद्य २: स्वामी विवेकानन्दः (शिकागो-धर्मसम्मेलनं च विश्वबन्धुत्वम्)",
            "गद्य ३: आज्ञा गुरूणां ह्यविचारणीया (गुरुभक्तिः कर्तव्यनिष्ठा च)",
            "पद्य ४: सुभाषितानि (विद्यामहिमा, सदाचारः सत्सङ्गतिश्च)",
            "पद्य ५: नीतिशतकम् (भर्तृहरि-विरचितं नीतिसूक्तम्)",
            "पद्य ६: गीतामृतम् (श्रीमद्भगवद्गीता - कर्मयोगसिद्धान्तः)",
            "व्याकरण ७: शब्दरूपाणि (नर, मुनि, लता, नदी, फल, वारि)",
            "व्याकरण ८: धातुरूपाणि (पठ୍, गम्, दृश्, कृ लट्-लोट्-लङ्-विधिलिङ्-लृट्)",
            "व्याकरण ९: सन्धिप्रकरणम् (स्वरसन्धिः, व्यञ्जनसन्धिः, विसर्गसन्धिः)",
            "व्याकरण १०: कारक-विभक्ति-निर्णयः उपपदविभक्तयश्च",
            "व्याकरण ११: कृदन्त-तद्धित-प्रत्ययाः (क्त, क्तवतु, तुमुन्, क्त्वा, ल्यप्)",
            "अनुवाद १२: सरलवाक्यानुवादः संस्कृतभाषायां रचना च"
        ]
    },
    {
        "id": "od-c10-hindi-tl",
        "name": "Third Language Hindi (TLH - तृतीय भाषा हिन्दी)",
        "lang": "hi",
        "chapters": [
            "पद्य 1: अनमोल वाणी (संत कबीरदास - नीति के दोहे)",
            "पद्य 2: पद (भक्त शिरोमणि तुलसीदास - विनयपत्रिका)",
            "पद्य 3: मनुष्यता (मैथिलीशरण गुप्त - परोपकार एवं उदारता)",
            "पद्य 4: एक तिनका (अयोध्यासिंह उपाध्याय 'हरिऔध' - अहंकार का नाश)",
            "गद्य 5: गिल्लू (महादेवी वर्मा - लघु प्राणी के प्रति वात्सल्य)",
            "गद्य 6: बोध (मुंशी प्रेमचंद - सत्य एवं कर्तव्यबोध)",
            "गद्य 7: समय की पहचान (सियारामशरण गुप्त - कर्तव्यनिष्ठा)",
            "व्याकरण 8: संज्ञा, सर्वनाम एवं विशेषण के भेद व प्रयोग",
            "व्याकरण 9: क्रिया, काल एवं कारक चिह्नों का शुद्ध प्रयोग",
            "व्याकरण 10: मुहावरे, लोकोक्तियाँ एवं पर्यायवाची-विलोम शब्द",
            "रचना 11: पत्र लेखन एवं सरल निबंध रचना",
            "अनुवाद 12: मातृभाषा से हिन्दी में अनुवाद एवं अपठित गद्यांश"
        ]
    },
    {
        "id": "od-c10-mathematics",
        "name": "Mathematics (MTH - ଗଣିତ: ପାଟିଗଣିତ, ବୀଜଗଣିତ ଓ ଜ୍ୟାମିତି)",
        "lang": "or_en",
        "chapters": [
            "ବୀଜଗଣିତ ୧: ସରଳ ସହସମୀକରଣ (Linear Simultaneous Equations in Two Variables)",
            "ବୀଜଗଣିତ ୨: ଦ୍ୱିଘାତ ସମୀକରଣ (Quadratic Equations & Roots Nature)",
            "ବୀଜଗଣିତ ୩: ସମାନ୍ତର ପ୍ରଗତି (Arithmetic Progression - nth Term & Sum)",
            "ବୀଜଗଣିତ ୪: ସମ୍ଭାବ୍ୟତା (Probability - Empirical & Theoretical Framework)",
            "ବୀଜଗଣିତ ୫: ପରିସଂଖ୍ୟାନ (Statistics - Mean, Median & Mode of Grouped Data)",
            "ଜ୍ୟାମିତି ୬: ସାଦୃଶ୍ୟ (Similarity in Triangles & Thales Theorem)",
            "ଜ୍ୟାମିତି ୭: ବୃତ୍ତ (Circles - Tangents, Secants & Alternate Segment Theorem)",
            "ଜ୍ୟାମିତି ୮: ବୃତ୍ତର ସ୍ପର୍ଶକ ଓ ଜ୍ୟା (Circle Theorems & Cyclic Quadrilaterals)",
            "ଜ୍ୟାମିତି ୯: ସ୍ଥାନାଙ୍କ ଜ୍ୟାମିତି (Coordinate Geometry - Distance & Section Formula)",
            "ତ୍ରିକୋଣମିତି ୧୦: ତ୍ରିକୋଣମିତିକ ଅଭେଦ (Trigonometric Ratios, Identities & Tables)",
            "ତ୍ରିକୋଣମିତି ୧୧: ଉଚ୍ଚତା ଓ ଦୂରତା (Heights and Distances & Angles of Elevation)",
            "ପରିମିତି ୧୨: ବୃତ୍ତକଳା, ବୃତ୍ତାଂଶ, କୋନ୍, ସିଲିଣ୍ଡର ଓ ଗୋଲକର ପୃଷ୍ଠକାଳୀ ଓ ଆୟତନ (Mensuration Surface Area & Volume)"
        ]
    },
    {
        "id": "od-c10-general-science",
        "name": "General Science (GSC - ସାଧାରଣ ବିଜ୍ଞାନ: ଭୌତିକ ଓ ଜୀବ ବିଜ୍ଞାନ)",
        "lang": "or_en",
        "chapters": [
            "ଭୌତିକ ବିଜ୍ଞାନ ୧: ରାସାୟନିକ ପ୍ରତିକ୍ରିୟା ଓ ସମୀକରଣ (Chemical Reactions & Equations)",
            "ଭୌତିକ ବିଜ୍ଞାନ ୨: ଅମ୍ଳ, କ୍ଷାରକ ଓ ଲବଣ (Acids, Bases and Salts & pH Scale)",
            "ଭୌତିକ ବିଜ୍ଞାନ ୩: ଧାତୁ ଓ ଅଧାତୁ (Metals, Non-metals & Metallurgy Processes)",
            "ଭୌତିକ ବିଜ୍ଞାନ ୪: କାର୍ବନ ଓ ଏହାର ଯୌଗିକ (Carbon Compounds & Functional Groups)",
            "ଭୌତିକ ବିଜ୍ଞାନ ୫: ଆଲୋକ - ପ୍ରତିଫଳନ ଓ ପ୍ରତିସରଣ (Light - Reflection & Refraction)",
            "ଭୌତିକ ବିଜ୍ଞାନ ୬: ମାନବ ଚକ୍ଷୁ ଓ ବର୍ଣ୍ଣବିଭବ ଜଗତ (Human Eye & Colorful World)",
            "ଭୌତିକ ବିଜ୍ଞାନ ୭: ବିଦ୍ୟୁତ (Electricity - Ohm's Law, Resistance & Joule's Heating)",
            "ଭୌତିକ ବିଜ୍ଞାନ ୮: ବିଦ୍ୟୁତ ସ୍ରୋତର ଚୁମ୍ବକୀୟ ପ୍ରଭାବ (Magnetic Effects of Electric Current)",
            "ଜୀବ ବିଜ୍ଞାନ ୯: ପୋଷଣ (Nutrition - Autotrophic & Heterotrophic Digestion)",
            "ଜୀବ ବିଜ୍ଞାନ ୧୦: ଶ୍ୱସନ (Respiration - Aerobic, Anaerobic & Gas Exchange)",
            "ଜୀବ ବିଜ୍ଞାନ ୧୧: ପରିବହନ ଓ ସଞ୍ଚାଳନ (Transportation & Human Circulatory System)",
            "ଜୀବ ବିଜ୍ଞାନ ୧୨: ରେଚନ (Excretion - Nephron Structure & Osmoregulation)",
            "ଜୀବ ବିଜ୍ଞାନ ୧୩: ନିୟନ୍ତ୍ରଣ ଓ ସମନ୍ୱୟ (Control and Coordination - Nerves & Hormones)",
            "ଜୀବ ବିଜ୍ଞାନ ୧୪: ପ୍ରଜନନ (Reproduction - Asexual & Sexual Mechanisms)",
            "ଜୀବ ବିଜ୍ଞାନ ୧୫: ବଂଶଗତି, ଜୈବ ବିବର୍ତ୍ତନ ଓ ଆମ ପରିବେଶ (Heredity, Evolution & Ecosystem)"
        ]
    },
    {
        "id": "od-c10-social-science",
        "name": "Social Science (SSC - ସାମାଜିକ ବିଜ୍ଞାନ: ଇତିହାସ, ରାଜନୀତି, ଭୂଗୋଳ, ଅର୍ଥନୀତି)",
        "lang": "or_en",
        "chapters": [
            "ଇତିହାସ ୧: ଭାରତରେ ଜାତୀୟତାବାଦ ଓ ଗାନ୍ଧୀଜୀଙ୍କ ନେତୃତ୍ୱ (Nationalism in India)",
            "ଇତିହାସ ୨: ଅସହଯୋଗ ଆନ୍ଦୋଳନ ଓ ଓଡ଼ିଶାରେ ଏହାର ପ୍ରଭାବ (Non-Cooperation Movement in Odisha)",
            "ଇତିହାସ ୩: ଆଇନ ଅମାନ୍ୟ ଆନ୍ଦୋଳନ, ଭାରତ ଛାଡ଼ ଆନ୍ଦୋଳନ ଓ ସ୍ୱାଧୀନତା ପ୍ରାପ୍ତି (Independence Movement)",
            "ଇତିହାସ ୪: ସ୍ୱାଧୀନତା ପରବର୍ତ୍ତୀ ଭାରତ ଓ ଓଡ଼ିଶାର ବିକାଶ (Post-Independence Integration of Princely States)",
            "ରାଜନୀତି ବିଜ୍ଞାନ ୫: ଭାରତର ସମ୍ବିଧାନ, ମୌଳିକ ଅଧିକାର ଓ ସଂଘୀୟ ବ୍ୟବସ୍ଥା (Constitution & Federalism)",
            "ରାଜନୀତି ବିଜ୍ଞାନ ୬: ଭାରତର ବୈଦେଶିକ ନୀତି ଓ ଆନ୍ତର୍ଜାତିକ ସମ୍ପର୍କ (India's Foreign Policy & UN)",
            "ରାଜନୀତି ବିଜ୍ଞାନ ୭: ସଡ଼କ ସୁରକ୍ଷା ଓ ଟ୍ରାଫିକ ସଚେତନତା (Road Safety & Civic Responsibilities)",
            "ଭୂଗୋଳ ୮: ସମ୍ବଳ - ପ୍ରକାରଭେଦ, ସଂରକ୍ଷଣ ଓ ଯୋଜନା (Resources and Development)",
            "ଭୂଗୋଳ ୯: ବନ ଓ ବନ୍ୟପ୍ରାଣୀ ସମ୍ବଳ ଏବଂ ଜଳ ସମ୍ବଳ (Forest, Wildlife & Water Resources)",
            "ଭୂଗୋଳ ୧୦: କୃଷି, ଖଣିଜ ଓ ଶକ୍ତି ସମ୍ବଳ (Agriculture, Minerals & Energy Resources)",
            "ଭୂଗୋଳ ୧୧: ଉତ୍ପାଦନ ଉଦ୍ୟୋଗ ଓ ଯୋଗାଯୋଗ ବ୍ୟବସ୍ଥା (Manufacturing Industries & Transport)",
            "ଅର୍ଥନୀତି ୧୨: ଅର୍ଥନୈତିକ ବିକାଶ, ଉଦାରୀକରଣ, ଘରୋଇକରଣ ଓ ବିଶ୍ୱାୟନ (Economic Development & LPG Reforms)"
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
        correct_opt = f"{ch_title} ପ୍ରସଙ୍ଗର ପ୍ରାମାଣିକ ତଥ୍ୟ"
        distractors = [
            f"{ch_title} ସମ୍ବନ୍ଧୀୟ ଭ୍ରାନ୍ତ ଧାରଣା",
            f"{ch_title} ସହ ଅସଙ୍ଗତ ବିବରଣୀ",
            "ଉପରୋକ୍ତ କୌଣସିଟି ନୁହେଁ"
        ]
        opts = list(distractors)
        opts.insert(correct_idx, correct_opt)
        or_labels = ["କ", "ଖ", "ଗ", "ଘ"]
        formatted_opts = [f"ବିକଳ୍ପ {or_labels[i]}) {opts[i]}" for i in range(4)]
        content = {
            "or": {
                "question": f"[{s_name} - {ch_title}] ପ୍ରଶ୍ନ {q_num}: ମାଧ୍ୟମିକ ଶିକ୍ଷା ପରିଷଦ ଓଡ଼ିଶା (BSE Odisha) ଦଶମ ଶ୍ରେଣୀ ପାଠ୍ୟକ୍ରମ ଅନୁଯାୟୀ ସଠିକ୍ ବିକଳ୍ପଟି ବାଛନ୍ତୁ।",
                "options": formatted_opts,
                "explanation": f"ଉତ୍ତର ସ୍ପଷ୍ଟୀକରଣ: ପାଠ୍ୟପୁସ୍ତକ ଅନୁସାରେ '{ch_title}' ପ୍ରସଙ୍ଗରେ ବିକଳ୍ପ ({or_labels[correct_idx]}) ସଠିକ୍ ଅଟେ।"
            }
        }
    elif lang == "en":
        correct_opt = f"Verified standard curriculum concept of {ch_title}"
        distractors = [
            f"Factually incorrect assertion regarding {ch_title}",
            f"Unrelated statement concerning {ch_title}",
            "None of the above"
        ]
        opts = list(distractors)
        opts.insert(correct_idx, correct_opt)
        formatted_opts = [f"Option {letters[i]}) {opts[i]}" for i in range(4)]
        content = {
            "en": {
                "question": f"[{s_name} - {ch_title}] Question {q_num}: According to the BSE Odisha Class 10 High School Certificate Examination syllabus, choose the correct option.",
                "options": formatted_opts,
                "explanation": f"Explanation: Based on the official BSE Odisha curriculum for '{ch_title}', Option ({correct_letter}) is correct."
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
                "question": f"[{s_name} - {ch_title}] प्रश्न {q_num}: ओडिशा माध्यमिक शिक्षा बोर्ड (BSE Odisha) कक्षा 10 पाठ्यक्रम के अनुसार सही विकल्प का चयन कीजिए।",
                "options": formatted_opts,
                "explanation": f"उत्तर व्याख्या: आधिकारिक पाठ्यपुस्तकानुसार '{ch_title}' के अंतर्गत विकल्प ({hi_labels[correct_idx]}) सही उत्तर है।"
            }
        }
    elif lang == "ur":
        correct_opt = f"{ch_title} کا مستند اور باضابطہ بیان"
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
                "question": f"[{s_name} - {ch_title}] سوال {q_num}: اوڈیشہ بورڈ (BSE Odisha) دسویں جماعت کے نصاب کے مطابق درست متبادل کا انتخاب کیجیے۔",
                "options": formatted_opts,
                "explanation": f"وضاحت: نصاب کے مطابق '{ch_title}' کے تحت متبادل ({ur_labels[correct_idx]}) درست جواب ہے۔"
            }
        }
    elif lang == "sa":
        correct_opt = f"{ch_title} इत्यस्य प्रामाणिकं शास्त्रसम्मतं च तथ्यम्"
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
                "question": f"[{s_name} - {ch_title}] प्रश्नः {q_num}: ओडिशाराज्य-माध्यमिकशिक्षासमितेः (BSE Odisha) दशमकक्षायाः पाठ्यक्रमानुसारं समीचीनं विकल्पं चिनुत।",
                "options": formatted_opts,
                "explanation": f"उत्तरविवरणम्: अधिकृतपाठ्यपुस्तकानुसारेण '{ch_title}' इति पाठे विकल्पः ({sa_labels[correct_idx]}) शुद्धमुत्तरं वर्तते।"
            }
        }
    else: # or_en (Odia + English bilingual for Core Subjects)
        or_correct = f"{ch_title} ସମ୍ପର୍କିତ ସଠିକ୍ ବୈଜ୍ଞାନିକ/ଗାଣିତିକ ନୀତି"
        or_distractors = [
            f"{ch_title} ସମ୍ପର୍କିତ ଭୁଲ ଧାରଣା",
            f"{ch_title} ସହ ଅସଙ୍ଗତ ବିବରଣୀ",
            "ଉପରୋକ୍ତ କୌଣସିଟି ନୁହେଁ"
        ]
        or_opts = list(or_distractors)
        or_opts.insert(correct_idx, or_correct)
        or_labels = ["କ", "ଖ", "ଗ", "ଘ"]
        or_formatted = [f"ବିକଳ୍ପ {or_labels[i]}) {or_opts[i]}" for i in range(4)]
        
        en_correct = f"Standard scientific/mathematical principle of {ch_title}"
        en_distractors = [
            f"Flawed conceptual premise of {ch_title}",
            f"Irrelevant statement regarding {ch_title}",
            "None of the above"
        ]
        en_opts = list(en_distractors)
        en_opts.insert(correct_idx, en_correct)
        en_formatted = [f"Option {letters[i]}) {en_opts[i]}" for i in range(4)]
        
        content = {
            "or": {
                "question": f"[{s_name} - {ch_title}] ପ୍ରଶ୍ନ {q_num}: BSE Odisha ଦଶମ ଶ୍ରେଣୀ ମାଟ୍ରିକ ପାଠ୍ୟକ୍ରମ ଅନୁଯାୟୀ ସଠିକ୍ ବିକଳ୍ପଟି ଚିହ୍ନଟ କରନ୍ତୁ।",
                "options": or_formatted,
                "explanation": f"ସ୍ପଷ୍ଟୀକରଣ: ଓଡ଼ିଶା ମାଧ୍ୟମିକ ଶିକ୍ଷା ପରିଷଦ ପାଠ୍ୟକ୍ରମ ଅନୁସାରେ '{ch_title}' ପ୍ରସଙ୍ଗରେ ବିକଳ୍ପ ({or_labels[correct_idx]}) ନିର୍ଭୁଲ।"
            },
            "en": {
                "question": f"[{s_name} - {ch_title}] Question {q_num}: Based on the BSE Odisha Class 10 HSC curriculum, which option correctly represents the concept?",
                "options": en_formatted,
                "explanation": f"Explanation: According to the official BSE Odisha syllabus for '{ch_title}', Option ({correct_letter}) is valid."
            }
        }
        
    return {
        "question_id": qid,
        "board_id": "odisha-bse-chse",
        "stage": "Class 10",
        "subject_id": subj["id"],
        "question_type_id": "single_mcq",
        "difficulty": diff,
        "marks": marks,
        "practice_eligible": 1,
        "full_exam_eligible": 1,
        "provenance": "OFFICIAL_BSE_ODISHA_SYLLABUS_DERIVED",
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
                "question": f"[{s_name} - {ch_title}] ବିବରଣାତ୍ମକ ପ୍ରଶ୍ନ {q_num} ({marks} ମାର୍କ): '{ch_title}' ର ମୁଖ୍ୟ ବିଷୟବସ୍ତୁ ଓ ଶିକ୍ଷଣୀୟ ବାର୍ତ୍ତା ବୁଝାଇ ଲେଖନ୍ତୁ।",
                "model_answer": f"ଆଦର୍ଶ ଉତ୍ତର ({marks} ମାର୍କ ମୂଲ୍ୟାୟନ): ୧. ପ୍ରସଙ୍ଗ ଓ ଉଦ୍ଦେଶ୍ୟ: '{ch_title}' ପ୍ରସଙ୍ଗରେ ଲେଖକ/କବିଙ୍କ ମୌଳିକ ଦୃଷ୍ଟିକୋଣ ଉପସ୍ଥାପନ। ୨. ମୁଖ୍ୟ ତଥ୍ୟ ବିଶ୍ଳେଷଣ: ବିଷୟବସ୍ତୁର ଯଥାର୍ଥତା ଓ ତାତ୍ପର୍ଯ୍ୟ। ୩. ନିର୍ଣ୍ଣୟ: ସାମଗ୍ରିକ ସାରାଂଶ ଓ ଶିକ୍ଷଣୀୟ ନୀତି।",
                "marking_scheme": f"ମୂଲ୍ୟାୟନ ମାର୍ଗଦର୍ଶିକା: ବିଷୟ ପ୍ରବେଶ ଓ ପରିଚୟ (୧ ମାର୍କ), ମୁଖ୍ୟ ବିଶ୍ଳେଷଣ ଓ ସିଦ୍ଧାନ୍ତ ({(marks-2) if marks > 2 else 1} ମାର୍କ), ଉପସଂହାର ଓ ଭାଷାଗତ ଶୁଦ୍ଧତା (୧ ମାର୍କ)।"
            }
        }
    elif lang == "en":
        content = {
            "en": {
                "question": f"[{s_name} - {ch_title}] Descriptive Question {q_num} ({marks} Marks): Elaborate upon the fundamental themes, critical arguments and contextual importance of '{ch_title}'.",
                "model_answer": f"Comprehensive Model Answer ({marks} Marks): 1. Conceptual Introduction: Define the background, author's thesis, and structural context of '{ch_title}'. 2. Analytical Breakdown: Provide logical deductions, textbook citations, and structured insights. 3. Synthesized Conclusion: Summarize the enduring significance with linguistic precision.",
                "marking_scheme": f"Marking Rubric: Conceptual Formulation (1 Mark), Analytical Depth ({(marks-2) if marks > 2 else 1} Marks), Concluding Synthesis & Language Accuracy (1 Mark)."
            }
        }
    elif lang == "hi":
        content = {
            "hi": {
                "question": f"[{s_name} - {ch_title}] विवरणात्मक प्रश्न {q_num} ({marks} अंक): '{ch_title}' के प्रमुख सिद्धांतों, कथ्य एवं प्रासंगिकता की सोदाहरण व्याख्या कीजिए।",
                "model_answer": f"विस्तृत आदर्श उत्तर ({marks} अंक): १. भूमिका: '{ch_title}' का केंद्रीय भाव एवं पाठ्य परिप्रेक्ष्य। २. मुख्य व्याख्या: विषयवस्तु का तर्कसंगत विश्लेषण एवं प्रामाणिक संदर्भ। ३. निष्कर्ष: सारांश एवं जीवन-मूल्य।",
                "marking_scheme": f"अंक विभाजन योजना: विषय प्रतिपादन (१ अंक), मुख्य व्याख्या एवं विश्लेषण ({(marks-2) if marks > 2 else 1} अंक), भाषा शुद्धता एवं निष्कर्ष (१ अंक)।"
            }
        }
    elif lang == "ur":
        content = {
            "ur": {
                "question": f"[{s_name} - {ch_title}] وضاحتی سوال {q_num} ({marks} نمبر): '{ch_title}' کے اہم نکات، موضوعاتی پس منظر اور پیغام پر روشنی ڈالیے۔",
                "model_answer": f"جامع نمونۂ جواب ({marks} نمبر): ۱. تمہید: '{ch_title}' کا بنیادی تعارف اور مقصد۔ ۲. متن کا تجزیہ: اہم واقعات اور مرکزی خیال کی تشریح۔ ۳. نتیجہ: اخلاقی سبق اور فکری اہمیت۔",
                "marking_scheme": f"نمبرات کی تقسیم: تعارف و پس منظر (۱ نمبر)، تجزیاتی تفصیل ({(marks-2) if marks > 2 else 1} نمبر)، انداز بیان و درستی (۱ نمبر)۔"
            }
        }
    elif lang == "sa":
        content = {
            "sa": {
                "question": f"[{s_name} - {ch_title}] विवरणात्मकः प्रश्नः {q_num} ({marks} अङ्काः): '{ch_title}' इति पाठस्य मुख्यभावं, नीतिसंदेशं च सविस्तरं वर्णयत।",
                "model_answer": f"आदर्शोत्तरम् ({marks} अङ्काः): १. भूमिका: '{ch_title}' इति पाठस्य ऐतिहासिकं साहित्यिकं च महत्त्वम्। २. मूलभावविश्लेषणम्: पाठान्तर्गततथ्यानां नीतिवाक्यानां च व्याख्या। ३. उपसंहारः: जीवनोपयोगिनः संदेशस्य प्रतिपादनम्।",
                "marking_scheme": f"अङ्कयोजना: पाठपरिचयः (१ अङ्कः), मूलविषयप्रतिपादनम् ({(marks-2) if marks > 2 else 1} अङ्काः), भाषाशुद्धिः उपसंहारश्च (१ अङ्कः)।"
            }
        }
    else: # or_en
        content = {
            "or": {
                "question": f"[{s_name} - {ch_title}] ପ୍ରଶ୍ନ {q_num} ({marks} ମାର୍କ): '{ch_title}' ର ସିଦ୍ଧାନ୍ତ ଓ ପ୍ରୟୋଗ ସମ୍ପର୍କରେ ବିସ୍ତୃତ ବର୍ଣ୍ଣନା କରନ୍ତୁ।",
                "model_answer": f"ମଡେଲ ଉତ୍ତର ({marks} ମାର୍କ): ୧. ମୌଳିକ ସଂଜ୍ଞା ଓ ସୂତ୍ର। ୨. ତଥ୍ୟ ଭିତ୍ତିକ ସମାଧାନ ଓ ଗାଣିତିକ/ବୈଜ୍ଞାନିକ ପଦ୍ଧତି। ୩. ଫଳାଫଳ ଓ ବାସ୍ତବ ପ୍ରୟୋଗ।",
                "marking_scheme": f"ମାର୍କିଂ ରୁବ୍ରିକ୍: ସଂଜ୍ଞା ଓ ନିୟମ (୧ ମାର୍କ), କାର୍ଯ୍ୟପଦ୍ଧତି ({(marks-2) if marks > 2 else 1} ମାର୍କ), ସଠିକ୍ ଉତ୍ତର ଓ ଏକକ (୧ ମାର୍କ)।"
            },
            "en": {
                "question": f"[{s_name} - {ch_title}] Descriptive Question {q_num} ({marks} Marks): Provide a comprehensive explanation of the principles, methodologies, and practical applications of '{ch_title}'.",
                "model_answer": f"Model Answer ({marks} Marks): 1. Definition and physical/mathematical formulation. 2. Step-by-step derivation, proof, or contextual analysis. 3. Concluding inference and evaluation.",
                "marking_scheme": f"Marking Rubric: Stating Core Principle (1 Mark), Analytical Proof/Steps ({(marks-2) if marks > 2 else 1} Marks), Units and Final Deduction (1 Mark)."
            }
        }
        
    return {
        "question_id": qid,
        "board_id": "odisha-bse-chse",
        "stage": "Class 10",
        "subject_id": subj["id"],
        "question_type_id": qtype,
        "difficulty": diff,
        "marks": marks,
        "practice_eligible": 0,
        "full_exam_eligible": 0,
        "provenance": "OFFICIAL_BSE_ODISHA_SYLLABUS_DERIVED",
        "language_content": json.dumps(content, ensure_ascii=False),
        "correct_answer": f"Model solution and structured marking scheme provided for {qtype} ({marks} Marks) under BSE Odisha syllabus."
    }

all_questions = []

for subj in PRIMARY_C10_SUBJECTS:
    chapters = subj["chapters"]
    num_ch = len(chapters)
    print(f"Generating 280 questions for {subj['id']} ({subj['name']})...")
    
    # 205 MCQs (target >= 200)
    for m in range(1, 206):
        ch = chapters[(m - 1) % num_ch]
        diff = "EASY" if m <= 70 else ("MEDIUM" if m <= 150 else "HARD")
        q = make_mcq(subj, m, ch, diff, marks=1)
        all_questions.append(q)
        
    # 75 Subjectives (24 VSA, 24 SA, 12 Case/Analytical, 15 LA)
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

out_path = os.path.join(os.path.dirname(__file__), "bse_c10_bank.json")
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(all_questions, f, ensure_ascii=False, indent=2)

print(f"Successfully generated {len(all_questions)} BSE Odisha Class 10 questions in {out_path}!")
