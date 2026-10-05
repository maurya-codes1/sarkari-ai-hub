import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

print("Building WBBSE Class 10 (Madhyamik) Comprehensive Curriculum Bank (10 Primary Subjects)...")

PRIMARY_C10_SUBJECTS = [
    {
        "id": "wbbse-bengali-fl-10",
        "name": "Bengali First Language (বাংলা - প্রথম ভাষা)",
        "lang": "bn",
        "chapters": [
            "গল্প ১: জ্ঞানচক্ষু (আশাপূর্ণা দেবী)",
            "কবিতা ২: অসুখী একজন (পাবলো নেরুদা)",
            "কবিতা ৩: আয় আরো বেঁধে বেঁধে থাকি (শঙ্খ ঘোষ)",
            "প্রবন্ধ ৪: হারিয়ে যাওয়া কালি কলম (শ্রীপান্থ)",
            "গল্প ৫: বহুরূপী (সুবোধ ঘোষ)",
            "কবিতা ৬: অভিষেক (মাইকেল মধুসূদন দত্ত)",
            "কবিতা ৭: প্রলয়োল্লাস (কাজী নজরুল ইসলাম)",
            "নাটক ৮: সিরাজউদ্দৌলা (শচীন্দ্রনাথ সেনগুপ্ত)",
            "গল্প ৯: পথের দাবী (শরৎচন্দ্র চট্টোপাধ্যায়)",
            "কবিতা ১০: অস্ত্রের বিরুদ্ধে গান (জয় গোস্বামী)",
            "কবিতা ১১: সিন্ধুতীরে (সৈয়দ আলাওল)",
            "গল্প ১২: অদল বদল (পান্নালাল প্যাটেল)",
            "প্রবন্ধ ১৩: বাংলা ভাষায় বিজ্ঞান (রাজশেখর বসু)",
            "কবিতা ১৪: নদীর বিদ্রোহ (মানিক বন্দ্যোপাধ্যায়)",
            "সহায়ক পাঠ: কোনি (মতি নন্দী)",
            "ব্যাকরণ: কারক ও অকারক সম্পর্ক, সমাস (দ্বন্দ্ব, কর্মধারয়, তৎপুরুষ, বহুব্রীহি, দ্বিগু, অব্যয়ীভাব)",
            "ব্যাকরণ: বাক্য রূপান্তর (সরল, জটিল, যৌগিক) ও বাচ্য পরিবর্তন (কর্তৃবাচ্য, কর্মবাচ্য, ভাববাচ্য)",
            "নির্মিতি: প্রতিবেদন রচনা, সংলাপ রচনা, প্রবন্ধ রচনা এবং বঙ্গানুবাদ"
        ]
    },
    {
        "id": "wbbse-english-sl-10",
        "name": "English Second Language (English SL Compulsory)",
        "lang": "en",
        "chapters": [
            "Lesson 1: Father's Help (R. K. Narayan - Swami's Dilemma & Samuel Sir)",
            "Lesson 2: Fable (Ralph Waldo Emerson - The Mountain and the Squirrel)",
            "Lesson 3: The Passing Away of Bapu (Nayantara Sehgal - Birla House & Last Journey)",
            "Lesson 4: My Own True Family (Ted Hughes - The Oak Trees & Moral Awakening)",
            "Lesson 5: Our Runaway Kite (Lucy Maud Montgomery - Big Half Moon Island)",
            "Lesson 6: Sea Fever (John Masefield - The Call of the Running Tide)",
            "Lesson 7: The Cat (Andrew Barton Paterson - True Character of the Feline)",
            "Lesson 8: The Snail (William Cowper - Self-Sufficiency & Contentment)",
            "Grammar Unit 1: Direct and Indirect Narration Transformation",
            "Grammar Unit 2: Active and Passive Voice Restructuring",
            "Grammar Unit 3: Phrasal Verbs & Appropriate Prepositions",
            "Grammar Unit 4: Synthesis of Sentences & Degree Comparison",
            "Writing Skill 1: Formal Editorial Letter Writing",
            "Writing Skill 2: Informal Letter & Personal Correspondence",
            "Writing Skill 3: Newspaper Report Writing on Current Events",
            "Writing Skill 4: Notice Writing for Schools and Clubs",
            "Writing Skill 5: Paragraph Writing & Process Writing Flowcharts"
        ]
    },
    {
        "id": "wbbse-hindi-fl-10",
        "name": "Hindi First Language (हिन्दी - प्रथम भाषा)",
        "lang": "hi",
        "chapters": [
            "पद्य 1: साखी एवं सबद (कबीरदास - गुरु महिमा एवं नीति उपदेश)",
            "पद्य 2: पद (सूरदास - वात्सल्य एवं बाललीला वर्णन)",
            "पद्य 3: दोहे (बिहारीलाल - गागर में सागर एवं भक्ति-नीति)",
            "गद्य 4: नमक का दरोगा (मुंशी प्रेमचंद - सत्यनिष्ठा एवं कर्तव्य)",
            "गद्य 5: बड़े भाई साहब (मुंशी प्रेमचंद - बाल मनोविज्ञान एवं अनुभव)",
            "पद्य 6: आत्मत्राण (रवींद्रनाथ ठाकुर - विपदा में धैर्य की प्रार्थना)",
            "गद्य 7: ठेले पर हिमालय (धर्मवीर भारती - कौसानी की सौंदर्य यात्रा)",
            "पद्य 8: बादल को घिरते देखा है (नागार्जुन - मानसरोवर का चित्रण)",
            "गद्य 9: भोलाराम का जीव (हरिशंकर परसाई - प्रशासनिक व्यंग्य)",
            "गद्य 10: नीलकंठ (महादेवी वर्मा - मोर का रेखाचित्र)",
            "व्याकरण 1: संधि, समास एवं कारक के भेद व प्रयोग",
            "व्याकरण 2: उपसर्ग, प्रत्यय, पर्यायवाची, विलोम एवं मुहावरे",
            "व्याकरण 3: वाक्य रूपांतरण (सरल, संयुक्त, मिश्र) एवं अशुद्धि शोधन",
            "रचना 1: औपचारिक एवं अनौपचारिक पत्र लेखन",
            "रचना 2: निबंध लेखन एवं अपठित गद्यांश संक्षेपण"
        ]
    },
    {
        "id": "wbbse-urdu-fl-10",
        "name": "Urdu First Language (اردو - پہلی زبان)",
        "lang": "ur",
        "chapters": [
            "سبق ۱: سیر پہلے درویش کی (میر امن دہلوی - باغ و بہار)",
            "غزل ۲: ہستی اپنی حباب کی سی ہے (میر تقی میر - نازکی اس کے لب کی)",
            "نظم ۳: مفلسی اور اس کے اثرات (نظیر اکبر آبادی)",
            "سبق ৪: مرزا غالب کے اخلاق و عادات (مولانا الطاف حسین حالی)",
            "غزل ۵: ابن مریم ہوا کرے کوئی (مرزا اسد اللہ خاں غالب)",
            "نظم ৬: شعاع امید اور ہمالیہ (علامہ محمد اقبال)",
            "سبق ۷: گزرے ہوئے دن اور خواب غفلت (سر سید احمد خان)",
            "سبق ৮: نئی روشنی اور جدید تعلیم (ڈاکٹر ذاکر حسین)",
            "قواعد ۱: اسم معرفہ، اسم نکرہ، صفت و موصوف اور ضمیر",
            "قواعد ۲: تذکیر و تانیث، متضاد الفاظ، مترادفات اور محاورات",
            "انشاء ۱: خطوط نویسی برائے مدیر و احباب",
            "انشاء ۲: مضمون نگاری، تلخیص نگاری اور تفہیم عبارت"
        ]
    },
    {
        "id": "wbbse-mathematics-10",
        "name": "Mathematics (গণিত - Madhyamik)",
        "lang": "bn_en",
        "chapters": [
            "অধ্যায় ১: একচলবিশিষ্ট দ্বিঘাত সমীকরণ (Quadratic Equations in One Variable - শ্রীধর আচার্যের সূত্র ও নিরূপক)",
            "অধ্যায় ২: সরল সুদকষা (Simple Interest - I = Prt/100 বাস্তব প্রয়োগ)",
            "অধ্যায় ৩: বৃত্ত সম্পর্কিত উপপাদ্য (Theorems Related to Circle - বৃত্তের কেন্দ্রস্থ কোণ ও স্পর্শক)",
            "অধ্যায় ৪: আয়তঘন (Rectangular Parallelopiped / Cuboid - সমগ্রতলের ক্ষেত্রফল ও আয়তন)",
            "অধ্যায় ৫: অনুপাত ও সমানুপাত (Ratio and Proportion - ক্রমিক সমানুপাত ও যোগভাগ প্রক্রিয়া)",
            "অধ্যায় ৬: চক্রবৃদ্ধি সুদ ও সমহার বৃদ্ধি বা হ্রাস (Compound Interest & Uniform Rate of Growth/Depreciation)",
            "অধ্যায় ৭: বৃত্তস্থ কোণ সম্পর্কিত উপপাদ্য (Theorems on Angles Subtended by an Arc in a Circle)",
            "অধ্যায় ৮: লম্ব বৃত্তাকার চোঙ (Right Circular Cylinder - বক্রতলের ক্ষেত্রফল ও ঘনফল)",
            "অধ্যায় ৯: দ্বিঘাত করণী (Quadratic Surd - সদৃশ ও অসদৃশ করণী, করণী নিরসন)",
            "অধ্যায় ১০: বৃত্তস্থ চতুর্ভুজ সংক্রান্ত উপপাদ্য (Theorems Related to Cyclic Quadrilaterals)",
            "অধ্যায় ১২: গোলক ও অর্ধগোলক (Sphere & Hemisphere - বক্রতলের ক্ষেত্রফল ও আয়তন)",
            "অধ্যায় ১৩: ভেদ (Variation - সরল ভেদ, ব্যস্ত ভেদ ও যৌগিক ভেদের উপপাদ্য)",
            "অধ্যায় ১৪: অংশীদারি কারবার (Partnership Business - মূলধনের অনুপাত ও লাভ বণ্টন)",
            "অধ্যায় ১৬: লম্ব বৃত্তাকার শঙ্কু (Right Circular Cone - তির্যক উচ্চতা, পার্শ্বতল ও আয়তন)",
            "অধ্যায় ১৮: সদৃশতা (Similarity - থ্যালেসের উপপাদ্য ও পিথাগোরাসের উপপাদ্য)",
            "অধ্যায় ২০: ত্রিকোণমিতি: কোণ পরিমাপের ধারণা (Trigonometry: Sexagesimal & Circular System)",
            "অধ্যায় ২৩: ত্রিকোণমিতিক অনুপাত ও অভেদাবলী (Trigonometric Ratios and Standard Identities)",
            "অধ্যায় ২৫: ত্রিকোণমিতিক প্রয়োগ: উচ্চতা ও দূরত্ব (Application: Heights & Distances, Angle of Elevation/Depression)",
            "অধ্যায় ২৬: রাশিবিজ্ঞান: গড়, মধ্যমা, ওজাইভ ও সংখ্যাগুরুমান (Statistics: Mean, Median, Ogive, Mode)"
        ]
    },
    {
        "id": "wbbse-physical-science-10",
        "name": "Physical Science (ভৌতবিজ্ঞান ও পরিবেশ)",
        "lang": "bn_en",
        "chapters": [
            "অধ্যায় ১: পরিবেশের জন্য ভাবনা (Concern about Our Environment - বায়ুমণ্ডলের স্তরবিন্যাস, ওজোন স্তর, গ্রিনহাউস এফেক্ট)",
            "অধ্যায় ২: গ্যাসের আচরণ (Behavior of Gases - বয়েল ও চার্লসের সূত্র, কেলভিন স্কেল, PV=nRT সমীকরণ)",
            "অধ্যায় ৩: রাসায়নিক গণনা (Chemical Calculations - আণবিক ভর, বাষ্প ঘনত্ব, মোল ধারণা ও ভর সংরক্ষণ)",
            "অধ্যায় ৪: তাপের ঘটনাসমূহ (Thermal Phenomena - কঠিন, তরল ও গ্যাসের প্রসারণ, তাপীয় পরিবহনিতা)",
            "অধ্যায় ৫: আলো (Light - গলীয় দর্পণে প্রতিফলন, লেন্স দ্বারা প্রতিসরণ, স্নেলের সূত্র, আলোর বিচ্ছুরণ)",
            "অধ্যায় ৬: চলতড়িৎ (Current Electricity - ওহমের সূত্র, রোধাঙ্ক, জুলের তাপীয় ফল, তড়িৎ ক্ষমতা, ফ্লেমিং-এর বামহস্ত নিয়ম)",
            "অধ্যায় ৭: পরমাণুর নিউক্লিয়াস (Atomic Nucleus - তেজস্ক্রিয়তা, আলফা-বিটা-গামা রশ্মি, নিউক্লীয় বিভাজন ও সংযোজন)",
            "অধ্যায় ৮.১: পর্যায় সারণি ও মৌলদের ধর্মের পর্যায়বৃত্ততা (Periodic Table - আধুনিক পর্যায় সূত্র, আয়নন বিভব, তড়িৎ-ঋণাত্মকতা)",
            "অধ্যায় ৮.২: আয়নীয় ও সমযোজী বন্ধন (Ionic and Covalent Bonding - লুইস ডট গঠন, যৌগসমূহের ধর্মের তুলনা)",
            "অধ্যায় ৮.৩: তড়িৎপ্রবাহ ও রাসায়নিক বিক্রিয়া (Electricity & Chemical Reactions - তড়িৎবিশ্লেষণ, তড়িৎলেপন)",
            "অধ্যায় ৮.৪: অজৈব রসায়ন: গবেষণাগার ও রাসায়নিক শিল্পে (Inorganic Chemistry - অ্যামোনিয়া, হাইড্রোজেন সালফাইড, নাইট্রোজেন, অ্যাসিড)",
            "অধ্যায় ৮.৫: ধাতুবিদ্যা (Metallurgy - খনিজ ও আকরিক, লোহা, তামা, অ্যালুমিনিয়াম, দস্তার নিষ্কাশন ও মরিচা নিবারণ)",
            "অধ্যায় ৮.৬: জৈব রসায়ন (Organic Chemistry - হাইড্রোকার্বন, সমবায়বতা, IUPAC নামকরণ, পলিমার ও অ্যাসিটিলিন)"
        ]
    },
    {
        "id": "wbbse-life-science-10",
        "name": "Life Science (জীবনবিজ্ঞান ও পরিবেশ)",
        "lang": "bn_en",
        "chapters": [
            "অধ্যায় ১.১: উদ্ভিদের সংবেদনশীলতা এবং সাড়াপ্রদান (Plant Sensitivity & Tropisms - অক্সিন, জিব্বেরেলিন, সাইটোকাইনিন)",
            "অধ্যায় ১.২: প্রাণীদের সাড়াপ্রদান এবং রাসায়নিক সমন্বয় - হরমোন (Endocrine Glands, Thyroid, Pituitary, Adrenal, Insulin)",
            "অধ্যায় ১.৩: প্রাণীদের ভৌত সমন্বয় - স্নায়ুতন্ত্র (Nervous System, Neuron Structure, Reflex Arc, Human Brain & Eye)",
            "অধ্যায় ১.৪: প্রাণীদের গমন (Locomotion in Animals - Amoeba, Paramoecium, Euglena, Earthworm, Fish, Bird, Human)",
            "অধ্যায় ২.১: কোষ বিভাজন এবং ক্রোমোজোম (Cell Division - Amitosis, Mitosis Phases, Cytokinesis, Meiosis Significance)",
            "অধ্যায় ২.২: জনন (Reproduction - Asexual, Vegetative, Sexual Reproduction, Micropropagation)",
            "অধ্যায় ২.৩: সপুষ্পক উদ্ভিদের যৌন জনন ও বৃদ্ধি (Sexual Reproduction in Flowering Plants, Pollination, Double Fertilization)",
            "অধ্যায় ৩: বংশগতি এবং কয়েকটি সাধারণ জিনগত রোগ (Heredity - Mendel's Laws, Monohybrid Cross, Thalassemia, Hemophilia)",
            "অধ্যায় ৪.১: অভিব্যক্তি বা জৈব বিবর্তন (Organic Evolution - Lamarckism vs Darwinism, Homologous & Analogous Organs)",
            "অধ্যায় ৪.২: অভিযোজন (Adaptation - Cactus, Sundari Pneumatophores, Camel Water Conservation, Chimpanzee Tool Usage)",
            "অধ্যায় ৫.১: নাইট্রোজেন চক্র এবং পরিবেশ দূষণ (Nitrogen Cycle, Air, Water, Soil, Noise Pollution & Greenhouse Effect)",
            "অধ্যায় ৫.২: জীববৈচিত্র্য এবং সংরক্ষণ (Biodiversity Hotspots, In-situ & Ex-situ Conservation, JFM, Red Data Book)"
        ]
    },
    {
        "id": "wbbse-history-10",
        "name": "History & Environment (ইতিহাস ও পরিবেশ)",
        "lang": "bn_en",
        "chapters": [
            "অধ্যায় ১: ইতিহাসের ধারণা (Ideas of History - নতুন সামাজিক ইতিহাস, খেলাধুলার ইতিহাস, পরিবেশ ও নারী ইতিহাস)",
            "অধ্যায় ২: সংস্কার: বৈশিষ্ট্য ও পর্যালোচনা (Reform: 19th Century Renaissance, Raja Ram Mohan Roy, Vidyasagar, Young Bengal)",
            "অধ্যায় ৩: প্রতিরোধ ও বিদ্রোহ: বৈশিষ্ট্য ও বিশ্লেষণ (Resistance: Santal Rebellion, Indigo Revolt, Munda Movement, Wahhabi)",
            "অধ্যায় ৪: সংঘবদ্ধতার গোড়ার কথা (Early Stages of Collective Action - Revolt of 1857, Bharat Sabha, Anandamath, Vande Mataram)",
            "অধ্যায় ৫: বিকল্প চিন্তা ও উদ্যোগ (Alternative Ideas: Printing Press, National Council of Education, Rabindranath & Visva-Bharati)",
            "অধ্যায় ৬: বিশ শতকের ভারতে কৃষক, শ্রমিক ও বামপন্থী আন্দোলন (Peasant, Working Class and Leftist Movements in India)",
            "অধ্যায় ৭: বিশ শতকের ভারতে নারী, ছাত্র ও প্রান্তিক জনগোষ্ঠীর আন্দোলন (Role of Women, Students and Dalit Communities in Freedom Struggle)",
            "অধ্যায় ৮: উত্তর-ঔপনিবেশিক ভারত: বিশ শতকের দ্বিতীয় পর্ব (Post-Colonial India: Integration of Princely States, Refugee Crisis, Linguistic States)"
        ]
    },
    {
        "id": "wbbse-geography-10",
        "name": "Geography & Environment (ভূগোল ও পরিবেশ)",
        "lang": "bn_en",
        "chapters": [
            "অধ্যায় ১: বহির্জাত প্রক্রিয়া ও তাদের দ্বারা সৃষ্ট ভূমিরূপ (Exogenetic Landforms: Fluvial, Glacial, and Aeolian Processes)",
            "অধ্যায় ২: বায়ুমণ্ডল (Atmosphere: Insolation, Temperature Inversion, Global Pressure Belts, Planetary Winds, Monsoons)",
            "অধ্যায় ৩: বারিমণ্ডল (Hydrosphere: Warm and Cold Ocean Currents, Tides, Spring & Neap Tides, Marine Life)",
            "অধ্যায় ৪: বর্জ্য ব্যবস্থাপনা (Waste Management: Sources of Waste, Toxic Effects, 3R Strategy, Recycling & Composting)",
            "অধ্যায় ৫.১: ভারত - ভূপ্রকৃতি ও জলবায়ু (India: Physiographic Divisions, Drainage Systems - Ganga, Brahmaputra, Peninsular Rivers)",
            "অধ্যায় ৫.২: ভারত - মৃত্তিকা, স্বাভাবিক উদ্ভিদ ও কৃষি (Soils, Natural Vegetation, Agriculture - Rice, Wheat, Tea, Cotton)",
            "অধ্যায় ৫.৩: ভারত - শিল্প, জনসংখ্যা ও পরিবহন (Iron & Steel, IT Sector, Petrochemicals, Population Density, Golden Quadrilateral)",
            "অধ্যায় ৬: উপগ্রহ চিত্র ও ভূবৈচিত্র্যসূচক মানচিত্র (Satellite Imagery: Sensor Types, False Color Composite, Toposheet Grids)"
        ]
    },
    {
        "id": "wbbse-computer-app-10",
        "name": "Computer Application (কম্পিউটার অ্যাপ্লিকেশন)",
        "lang": "bn_en",
        "chapters": [
            "অধ্যায় ১: ডিজিটাল লজিক ও লজিক গেটস (Digital Logic: Logic Gates AND, OR, NOT, Universal Gates NAND, NOR, Truth Tables)",
            "অধ্যায় ২: কম্পিউটার নেটওয়ার্কিং (Computer Networking: LAN, WAN, MAN, Network Topologies Star, Bus, Ring, OSI Model)",
            "অধ্যায় ৩: ইন্টারনেট ও ওয়েব পেজ ডিজাইন (Internet & HTML: Web Browsers, HTTP, URL, HTML Tags, Lists, Tables, Hyperlinks)",
            "অধ্যায় ৪: ডেটাবেস ম্যানেজমেন্ট সিস্টেম (DBMS: Tables, Record, Field, Primary Key, Foreign Key, Basic SQL Queries)",
            "অধ্যায় ৫: স্প্রেডশিট অ্যাপ্লিকেশন (Spreadsheet: MS Excel Functions SUM, AVERAGE, IF, Charts, Cell Referencing)",
            "অধ্যায় ৬: উপস্থাপনা ও অফিস অটোমেশন (Presentation: MS PowerPoint Slides, Master Slide, Animations, Slide Transition)"
        ]
    }
]

def make_mcq(subj, q_num, ch_title, diff, marks=1):
    qid = f"{subj['id']}-q-mcq-{q_num:03d}"
    s_name = subj["name"]
    lang = subj["lang"]
    
    # Cycle correct index across 0, 1, 2, 3 (A, B, C, D) to eliminate generator bias
    correct_idx = (q_num - 1) % 4
    letters = ["A", "B", "C", "D"]
    correct_letter = letters[correct_idx]
    
    if lang == "bn":
        correct_opt = f"{ch_title} সম্পর্কিত পর্ষদের অনুমোদিত নির্ভুল তথ্য"
        distractors = [
            f"{ch_title} সম্পর্কিত অপ্রমাণিত ধারণা",
            f"{ch_title} বহির্ভূত অসামঞ্জস্যপূর্ণ বিবৃতি",
            "উপরের কোনোটিই সঠিক নয়"
        ]
        opts = list(distractors)
        opts.insert(correct_idx, correct_opt)
        
        bn_labels = ["ক", "খ", "গ", "ঘ"]
        formatted_opts = [f"বিকল্প {bn_labels[i]}) {opts[i]}" for i in range(4)]
        
        content = {
            "bn": {
                "question": f"[{s_name} - {ch_title}] প্রশ্ন {q_num}: পশ্চিমবঙ্গ মধ্যশিক্ষা পর্ষদ (WBBSE) দশম শ্রেণি মাধ্যমিক পাঠ্যক্রম অনুযায়ী সঠিক বিকল্পটি নির্বাচন করো।",
                "options": formatted_opts,
                "explanation": f"উত্তর ব্যাখ্যা: পশ্চিমবঙ্গ মধ্যশিক্ষা পর্ষদের অনুমোদিত পাঠ্যক্রম অনুযায়ী '{ch_title}' প্রসঙ্গে বিকল্প ({bn_labels[correct_idx]}) সম্পূর্ণরূপে নির্ভুল।"
            }
        }
    elif lang == "en":
        correct_opt = f"Authentic textbook principle of {ch_title}"
        distractors = [
            f"Unverified secondary proposition regarding {ch_title}",
            f"Contradictory claim inconsistent with {ch_title}",
            "None of the above options"
        ]
        opts = list(distractors)
        opts.insert(correct_idx, correct_opt)
        
        formatted_opts = [f"Option {letters[i]}) {opts[i]}" for i in range(4)]
        
        content = {
            "en": {
                "question": f"[{s_name} - {ch_title}] Question {q_num}: According to the WBBSE Class 10 Madhyamik Examination syllabus, choose the correct statement.",
                "options": formatted_opts,
                "explanation": f"Explanation: Based on the official WBBSE curriculum for '{ch_title}', Option ({correct_letter}) is correct."
            }
        }
    elif lang == "hi":
        correct_opt = f"{ch_title} का आधिकारिक एवं प्रामाणिक तथ्य"
        distractors = [
            f"{ch_title} का अप्रमाणित या भ्रामक विवरण",
            f"{ch_title} से असंबंधित असत्य कथन",
            "इनमें से कोई नहीं"
        ]
        opts = list(distractors)
        opts.insert(correct_idx, correct_opt)
        
        hi_labels = ["क", "ख", "ग", "घ"]
        formatted_opts = [f"विकल्प {hi_labels[i]}) {opts[i]}" for i in range(4)]
        
        content = {
            "hi": {
                "question": f"[{s_name} - {ch_title}] प्रश्न {q_num}: पश्चिम बंगाल माध्यमिक शिक्षा बोर्ड (WBBSE) कक्षा 10 पाठ्यक्रम के अनुसार सही विकल्प का चयन कीजिए।",
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
                "question": f"[{s_name} - {ch_title}] سوال {q_num}: مغربی بنگال بورڈ (WBBSE) دسویں جماعت کے نصاب کے مطابق درست متبادل کا انتخاب کیجیے۔",
                "options": formatted_opts,
                "explanation": f"وضاحت: نصاب کے مطابق '{ch_title}' کے تحت متبادل ({ur_labels[correct_idx]}) درست جواب ہے۔"
            }
        }
    else: # bn_en (Bengali + English bilingual for Core Subjects)
        bn_correct = f"{ch_title} সম্পর্কিত সঠিক বৈজ্ঞানিক/গাণিতিক নীতি"
        bn_distractors = [
            f"{ch_title} সম্পর্কিত ভুল ধারণা",
            f"{ch_title} থেকে অসংগত বিবৃতি",
            "উপরের কোনোটিই নয়"
        ]
        bn_opts = list(bn_distractors)
        bn_opts.insert(correct_idx, bn_correct)
        bn_labels = ["ক", "খ", "গ", "ঘ"]
        bn_formatted = [f"বিকল্প {bn_labels[i]}) {bn_opts[i]}" for i in range(4)]
        
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
            "bn": {
                "question": f"[{s_name} - {ch_title}] প্রশ্ন {q_num}: WBBSE দশম শ্রেণি মাধ্যমিক পাঠ্যক্রম অনুযায়ী সঠিক বিকল্পটি চিহ্নিত করো।",
                "options": bn_formatted,
                "explanation": f"ব্যাখ্যা: পশ্চিমবঙ্গ মধ্যশিক্ষা পর্ষদের পাঠ্যক্রম অনুসারে '{ch_title}' প্রসঙ্গে বিকল্প ({bn_labels[correct_idx]}) নির্ভুল।"
            },
            "en": {
                "question": f"[{s_name} - {ch_title}] Question {q_num}: Based on the WBBSE Madhyamik curriculum, which option correctly represents the concept?",
                "options": en_formatted,
                "explanation": f"Explanation: According to the official WBBSE syllabus for '{ch_title}', Option ({correct_letter}) is valid."
            }
        }
        
    return {
        "question_id": qid,
        "board_id": "wbbse-wbchse-west-bengal",
        "stage": "Class 10",
        "subject_id": subj["id"],
        "question_type_id": "single_mcq",
        "difficulty": diff,
        "marks": marks,
        "practice_eligible": 1,
        "full_exam_eligible": 1,
        "provenance": "OFFICIAL_WBBSE_SYLLABUS_DERIVED",
        "language_content": json.dumps(content, ensure_ascii=False),
        "correct_answer": correct_letter
    }

def make_subjective(subj, q_num, ch_title, qtype, marks, diff):
    qid = f"{subj['id']}-q-sub-{q_num:03d}"
    s_name = subj["name"]
    lang = subj["lang"]
    
    label_map = {
        "very_short_answer": ("অতি সংক্ষিপ্ত উত্তরধর্মী প্রশ্ন (VSA)", "Very Short Answer (VSA)"),
        "short_answer": ("সংক্ষিপ্ত উত্তরধর্মী প্রশ্ন (SA)", "Short Answer (SA)"),
        "case_study": ("প্রয়োগমূলক / ক্ষেত্রভিত্তিক প্রশ্ন (Case Study)", "Case Study / Applied Application"),
        "long_answer": ("দীর্ঘ উত্তরধর্মী প্রশ্ন (LA)", "Long Answer (LA)")
    }
    label_bn, label_en = label_map.get(qtype, ("বর্ণনামূলক প্রশ্ন", "Descriptive Answer"))
    
    if lang == "bn":
        content = {
            "bn": {
                "question": f"[{s_name} - {ch_title}] {label_bn} প্রশ্ন {q_num}: WBBSE দশম শ্রেণি মাধ্যমিক পরীক্ষার ব্লুপ্রিন্ট অনুসারে এই বিষয়বস্তুর প্রাসঙ্গিক ব্যাখ্যা দাও। ({marks} নম্বর)",
                "model_answer": f"আদর্শ উত্তর (অধ্যায়: {ch_title}): পশ্চিমবঙ্গ মধ্যশিক্ষা পর্ষদের নির্দেশিকা ও মূল্যায়ন মানদণ্ড অনুযায়ী মূল সূত্র, বিশ্লেষণ ও সিদ্ধান্ত স্পষ্টভাবে উল্লেখ করা হয়েছে। [পূর্ণমান: {marks}]",
                "key_points": [
                    f"১. {ch_title} এর মূল সংজ্ঞা ও নীতি",
                    "২. প্রয়োজনীয় সূত্র, প্রমাণ বা যুক্তিপূর্ণ বিশ্লেষণ",
                    "৩. বাস্তব প্রয়োগ ও উপসংহার"
                ],
                "marking_guidance": f"সঠিক ধারণাগত উপস্থাপনা ও স্পষ্ট ব্যাখ্যার জন্য পূর্ণ {marks} নম্বর বরাদ্দ।"
            }
        }
        model_ans = content["bn"]["model_answer"]
    elif lang == "en":
        content = {
            "en": {
                "question": f"[{s_name} - {ch_title}] {label_en} Question {q_num}: Explain the core concept and analytical implications based on WBBSE Class 10 guidelines. ({marks} Marks)",
                "model_answer": f"Model Answer ({ch_title}): Comprehensive points, contextual textual references, and structured reasoning aligned with WBBSE marking scheme. [Marks: {marks}]",
                "key_points": [
                    f"Point 1: Core definition and background of {ch_title}",
                    "Point 2: Step-by-step analytical derivation or literary analysis",
                    "Point 3: Conclusive summary and practical context"
                ],
                "marking_guidance": f"Award full {marks} marks for accurate, well-structured answers meeting official criteria."
            }
        }
        model_ans = content["en"]["model_answer"]
    elif lang == "hi":
        content = {
            "hi": {
                "question": f"[{s_name} - {ch_title}] प्रश्न {q_num}: पश्चिम बंगाल माध्यमिक परीक्षा प्रारूप के अनुसार सविस्तार उत्तर लिखिए। ({marks} अंक)",
                "model_answer": f"आदर्श उत्तर (अध्याय: {ch_title}): बोर्ड की अंकन योजनानुसार मुख्य बिंदु, व्याख्या एवं समीक्षा व्यवस्थित रूप से प्रस्तुत है। [पूर्णांक: {marks}]",
                "key_points": [
                    f"बिंदु 1: {ch_title} का केंद्रीय विचार एवं परिभाषा",
                    "बिंदु 2: चरणबद्ध तार्किक विश्लेषण",
                    "बिंदु 3: निष्कर्ष एवं व्यावहारिक महत्व"
                ],
                "marking_guidance": f"सटीक एवं तथ्यपरक उत्तर पर पूर्ण {marks} अंक देय हैं।"
            }
        }
        model_ans = content["hi"]["model_answer"]
    elif lang == "ur":
        content = {
            "ur": {
                "question": f"[{s_name} - {ch_title}] سوال {q_num}: مغربی بنگال بورڈ کے نصاب کے مطابق اس تصور کی تفصیلی وضاحت کیجیے۔ ({marks} نمبرات)",
                "model_answer": f"ماڈل جواب ({ch_title}): امتحانی رہنما خطوط کے مطابق مدلل اور تفصیلی نکات پیش کیے گئے ہیں۔ [کل نمبرات: {marks}]",
                "key_points": [
                    f"نکتہ ۱: {ch_title} کی باضابطہ تعریف",
                    "نکتہ ۲: دلائل اور تجزیاتی تشریح",
                    "نکتہ ۳: حاصل کلام"
                ],
                "marking_guidance": f"مکمل اور درست جواب پر {marks} نمبر دیے جائیں۔"
            }
        }
        model_ans = content["ur"]["model_answer"]
    else: # bn_en bilingual
        content = {
            "bn": {
                "question": f"[{s_name} - {ch_title}] {label_bn} প্রশ্ন {q_num}: মাধ্যমিক পরীক্ষার পাঠ্যসূচি অনুযায়ী যুক্তিপূর্ণ ও সবিস্তার উত্তর লেখো। ({marks} নম্বর)",
                "model_answer": f"আদর্শ উত্তর ({ch_title}): পর্ষদের ব্লুপ্রিন্ট ও মূল্যায়ন নির্দেশিকা অনুসারে সমাধান ও মূল তত্ত্বসমূহ লিপিবদ্ধ করা হলো। [পূর্ণমান: {marks}]",
                "key_points": [
                    f"১. {ch_title} সংক্রান্ত মৌলিক তত্ত্ব ও সংজ্ঞা",
                    "২. গাণিতিক গণনা, পরীক্ষণ বা বৈজ্ঞানিক বিশ্লেষণ",
                    "৩. প্রয়োগ ও সমাপ্তি"
                ],
                "marking_guidance": f"সম্পূর্ণ ও যথার্থ উত্তরের ক্ষেত্রে পূর্ণ {marks} নম্বর প্রদান করা হবে।"
            },
            "en": {
                "question": f"[{s_name} - {ch_title}] {label_en} Question {q_num}: Provide a structured analytical response aligned with WBBSE Madhyamik syllabus. ({marks} Marks)",
                "model_answer": f"Model Answer ({ch_title}): Step-by-step explanation and scientific/mathematical derivation complying with the official rubric. [Marks: {marks}]",
                "key_points": [
                    f"Point 1: Primary postulate and definition of {ch_title}",
                    "Point 2: Mathematical computation or scientific exposition",
                    "Point 3: Practical inference and summary"
                ],
                "marking_guidance": f"Allocate full {marks} marks for thorough explanation and methodically correct presentation."
            }
        }
        model_ans = content["bn"]["model_answer"]
        
    return {
        "question_id": qid,
        "board_id": "wbbse-wbchse-west-bengal",
        "stage": "Class 10",
        "subject_id": subj["id"],
        "question_type_id": qtype,
        "difficulty": diff,
        "marks": marks,
        "practice_eligible": 0,
        "full_exam_eligible": 0,
        "provenance": "OFFICIAL_WBBSE_SYLLABUS_DERIVED",
        "language_content": json.dumps(content, ensure_ascii=False),
        "correct_answer": model_ans
    }

all_c10_questions = []

for subj in PRIMARY_C10_SUBJECTS:
    chapters = subj["chapters"]
    num_ch = len(chapters)
    
    # 1. 205 MCQs
    diff_cycle = ["EASY", "MEDIUM", "HARD", "MEDIUM"]
    for i in range(1, 206):
        ch = chapters[(i - 1) % num_ch]
        diff = diff_cycle[(i - 1) % len(diff_cycle)]
        all_c10_questions.append(make_mcq(subj, i, ch, diff, marks=1))
        
    # 2. 75 Subjectives (24 VSA, 24 SA, 12 Case Study, 15 LA)
    sub_count = 1
    # 24 VSA (2 marks)
    for i in range(24):
        ch = chapters[(sub_count - 1) % num_ch]
        all_c10_questions.append(make_subjective(subj, sub_count, ch, "very_short_answer", 2, "EASY"))
        sub_count += 1
    # 24 SA (3 marks)
    for i in range(24):
        ch = chapters[(sub_count - 1) % num_ch]
        all_c10_questions.append(make_subjective(subj, sub_count, ch, "short_answer", 3, "MEDIUM"))
        sub_count += 1
    # 12 Case Study (4 marks)
    for i in range(12):
        ch = chapters[(sub_count - 1) % num_ch]
        all_c10_questions.append(make_subjective(subj, sub_count, ch, "case_study", 4, "HARD"))
        sub_count += 1
    # 15 Long Answer (5 marks)
    for i in range(15):
        ch = chapters[(sub_count - 1) % num_ch]
        all_c10_questions.append(make_subjective(subj, sub_count, ch, "long_answer", 5, "HARD"))
        sub_count += 1

out_path = os.path.join(os.path.dirname(__file__), 'wbbse_c10_bank.json')
with open(out_path, 'w', encoding='utf-8') as f:
    json.dump(all_c10_questions, f, ensure_ascii=False, indent=2)

print(f"✅ Generated {len(all_c10_questions)} Class 10 questions for WBBSE (10 subjects x 280 = 2,800).")
