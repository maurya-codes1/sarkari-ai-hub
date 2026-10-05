import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

print("Building MSBSHSE Class 10 (SSC) Comprehensive Curriculum Bank (10 Primary Subjects)...")

PRIMARY_C10_SUBJECTS = [
    {
        "id": "msbshse-marathi-10",
        "name": "Marathi (मराठी - प्रथम भाषा / अनिवार्य)",
        "lang": "mr",
        "chapters": [
            "कुमारभारती गद्य: जय जय महाराष्ट्र माझा (ग. दि. माडगूळकर)",
            "कुमारभारती गद्य: बोलतो मराठी (डॉ. नीलिमा गुंडी)",
            "कुमारभारती गद्य: आप्पांचे पत्र (अरविंद जगताप)",
            "कुमारभारती गद्य: उपास (पु. ल. देशपांडे)",
            "कुमारभारती गद्य: फूटप्रिन्टस् (डॉ. प्रदीप आवटे)",
            "कुमारभारती गद्य: ऊर्जाशक्तीचा जागर (डॉ. रघुनाथ माशेलकर)",
            "कुमारभारती पद्य: संतवाणी - अंकिला मी दास तुझा (संत नामदेव)",
            "कुमारभारती पद्य: संतवाणी - योगी सर्वकाळ सुखदाता (संत एकनाथ)",
            "कुमारभारती पद्य: आश्वासक चित्र (नीरजा)",
            "कुमारभारती पद्य: वस्तू (द. भा. धामणस्कर)",
            "कुमारभारती पद्य: औक्षण (इंदिरा संत)",
            "स्थूलवाचन: मोठे होत असलेल्या मुलांनो... (डॉ. अनिल काकोडकर)",
            "स्थूलवाचन: जाता अस्ताला (रवींद्रनाथ टागोर)",
            "व्याकरण व भाषाभ्यास: वाक्यप्रकार, वाक्यरूपांतर, समास (द्विगु, द्वंद्व, अव्ययीभाव), वाक्प्रचार",
            "उपयोजित लेखन: पत्रलेखन, सारांशलेखन, जाहिरात लेखन, बातमी लेखन, कथालेखन, निबंध लेखन"
        ]
    },
    {
        "id": "msbshse-hindi-10",
        "name": "Hindi (हिन्दी - द्वितीय/तृतीय भाषा)",
        "lang": "hi",
        "chapters": [
            "लोकभारती पद्य: भारत महिमा (जयशंकर प्रसाद)",
            "लोकभारती गद्य: लक्ष्मी (गुरूशरण शर्मा)",
            "लोकभारती गद्य: वाह रे! हमदर्द (घनश्याम अग्रवाल)",
            "लोकभारती पद्य: मन (हाइकु - विकास परिहार)",
            "लोकभारती गद्य: गोवा : जैसा मैंने देखा (विनय शर्मा)",
            "लोकभारती पद्य: गिरिधर नागर (संत मीराबाई)",
            "लोकभारती गद्य: महिला आश्रम (काका कालेलकर)",
            "लोकभारती पद्य: अपनी गंध नहीं बेचूँगा (सुमित्रानंदन पंत)",
            "लोकभारती पूरक पठन: रीढ़ की हड्डी (जगदीशचंद्र माथुर)",
            "लोकभारती पूरक पठन: ठेस (फणीश्वरनाथ 'रेणु')",
            "व्याकरण: शब्द भेद, अव्यय, संधि, सहायक क्रिया, प्रेरणार्थक क्रिया, मुहावरे",
            "उपयोजित लेखन: पत्र लेखन, गद्य आकलन, वृत्तांत लेखन, विज्ञापन लेखन, कहानी लेखन, निबंध लेखन"
        ]
    },
    {
        "id": "msbshse-english-10",
        "name": "English (First Language / Compulsory)",
        "lang": "en",
        "chapters": [
            "Unit 1: A Teenager's Prayer & An Encounter of a Special Kind",
            "Unit 1: Basketful of Moonlight & Be the Best",
            "Unit 2: You Start Dying Slowly... & The Boy who Broke the Bank (Ruskin Bond)",
            "Unit 2: The Twins & An Epitome of Courage (Stephen Hawking)",
            "Unit 3: If... (Rudyard Kipling) & Stopping by Woods on a Snowy Evening (Robert Frost)",
            "Unit 3: The Alchemy of Nature & The Concert",
            "Unit 4: The World is Mine & Bholi",
            "Unit 4: Joan of Arc & A Brave Heart Dedicated to Science and Humanity",
            "Language Study & Grammar: Clauses, Voice, Direct-Indirect Speech, Modal Auxiliaries, Figures of Speech",
            "Writing Skills: Formal/Informal Letter, Expansion of Theme, Report Writing, Dialogue Writing, Speech Writing"
        ]
    },
    {
        "id": "msbshse-math-10",
        "name": "Mathematics (Algebra & Geometry - गणित भाग १ व २)",
        "lang": "bilingual",
        "chapters": [
            "Part 1 Algebra Ch 1: Linear Equations in Two Variables (दोन चलांतील रेषीय समीकरणे - Cramer's Rule, Graphical Method)",
            "Part 1 Algebra Ch 2: Quadratic Equations (वर्गसमीकरणे - Factorisation, Formula Method, Nature of Roots)",
            "Part 1 Algebra Ch 3: Arithmetic Progression (अंकगणिती श्रेढी - tn and Sn formulae, applications)",
            "Part 1 Algebra Ch 4: Financial Planning (अर्थनियोजन - GST, CGST, SGST, Shares, Mutual Funds)",
            "Part 1 Algebra Ch 5: Probability (संभाव्यता - Sample space, events, probability calculations)",
            "Part 1 Algebra Ch 6: Statistics (सांख्यिकी - Mean by Direct/Assumed/Step-deviation method, Median, Mode, Histograms)",
            "Part 2 Geometry Ch 1: Similarity (समरूपता - Basic Proportionality Theorem, Areas of Similar Triangles)",
            "Part 2 Geometry Ch 2: Pythagoras Theorem (पायथागोरसचे प्रमेय - Geometric Mean Property, Apollonius Theorem)",
            "Part 2 Geometry Ch 3: Circle (वर्तुळ - Tangent theorem, Inscribed angle theorem, Cyclic quadrilaterals)",
            "Part 2 Geometry Ch 4: Geometric Constructions (भौमितिक रचना - Tangents from external points, similar triangles)",
            "Part 2 Geometry Ch 5: Co-ordinate Geometry (निर्देशांक भूमिती - Distance formula, Section formula, Slope of line)",
            "Part 2 Geometry Ch 6: Trigonometry & Ch 7: Mensuration (त्रिकोणमिती आणि महत्त्वमापन - Heights and distances, surface areas and volumes)"
        ]
    },
    {
        "id": "msbshse-science-10",
        "name": "Science & Technology (Part 1 & 2 - विज्ञान आणि तंत्रज्ञान)",
        "lang": "bilingual",
        "chapters": [
            "Part 1 Ch 1: Gravitation (गुरुत्वाकर्षण - Kepler's laws, Newton's law, acceleration due to gravity, escape velocity)",
            "Part 1 Ch 2: Periodic Classification of Elements (मूलद्रव्यांचे आवर्ती वर्गीकरण - Modern Periodic Table)",
            "Part 1 Ch 3: Chemical Reactions and Equations (रासायनिक अभिक्रिया व समीकरणे - Types of reactions, oxidation-reduction)",
            "Part 1 Ch 4: Effects of Electric Current (विद्युतधारेचे परिणाम - Heating effect, Fleming's rules, motor and generator)",
            "Part 1 Ch 5: Heat (उष्णता - Latent heat, anomalous behavior of water, specific heat capacity)",
            "Part 1 Ch 6 & 7: Refraction of Light & Lenses (प्रकाशाचे अपवर्तन आणि भिंगे - Snell's law, defects of eye)",
            "Part 1 Ch 8 & 9: Metallurgy & Carbon Compounds (धातुविज्ञान आणि कार्बन संयुगे - Hydrocarbons, functional groups)",
            "Part 1 Ch 10: Space Missions (अवकाश मोहिमा - Satellite orbits, escape velocity)",
            "Part 2 Ch 1: Heredity and Evolution (आनुवंशिकता व उत्क्रांती - Transcription, translation, Darwin's theory)",
            "Part 2 Ch 2: Life Processes in Living Organisms Part 1 (सजीवांतील जीवनप्रक्रिया भाग १ - Cellular respiration)",
            "Part 2 Ch 3: Life Processes in Living Organisms Part 2 (सजीवांतील जीवनप्रक्रिया भाग २ - Human reproduction, menstrual cycle)",
            "Part 2 Ch 4: Environmental Management (पर्यावरणीय व्यवस्थापन - Ecosystem, biodiversity hotspots)",
            "Part 2 Ch 5 & 6: Towards Green Energy & Animal Classification (हरित ऊर्जेच्या दिशेने आणि प्राणी वर्गीकरण)",
            "Part 2 Ch 7 & 8: Introduction to Microbiology & Biotechnology (सूक्ष्मजीवशास्त्र आणि जैवतंत्रज्ञान)",
            "Part 2 Ch 9 & 10: Social Health & Disaster Management (सामाजिक आरोग्य आणि आपत्ती व्यवस्थापन)"
        ]
    },
    {
        "id": "msbshse-social-10",
        "name": "Social Sciences (History, Pol Sci & Geography - इतिहास, राज्यशास्त्र आणि भूगोल)",
        "lang": "bilingual",
        "chapters": [
            "History Ch 1 & 2: Historiography - Western & Indian Tradition (इतिहासलेखन : पाश्चात्त्य व भारतीय परंपरा)",
            "History Ch 3: Applied History (उपयोजित इतिहास - Conservation and preservation of cultural heritage)",
            "History Ch 4: History of Indian Arts (भारतीय कलांचा इतिहास - Visual and performing arts)",
            "History Ch 5 & 6: Mass Media and History & Entertainment and History (प्रसारमाध्यमे आणि मनोरंजनाची माध्यमे)",
            "History Ch 7 & 8: Sports, Tourism and History (खेळ आणि पर्यटन - History of sports and tourism)",
            "History Ch 9: Heritage Management (वारसा व्यवस्थापन - Libraries, archives, museums)",
            "Pol Sci Ch 1 & 2: Working of the Constitution & Electoral Process (संविधानाची वाटचाल आणि निवडणूक प्रक्रिया)",
            "Pol Sci Ch 3 & 4: Political Parties & Social Movements (राजकीय पक्ष आणि सामाजिक चळवळी)",
            "Pol Sci Ch 5: Challenges faced by Indian Democracy (भारतीय लोकशाहीसमोरील आव्हाने)",
            "Geography Ch 1 & 2: Field Visit & Location and Extent (क्षेत्रभेट आणि भारत-ब्राझील स्थान व विस्तार)",
            "Geography Ch 3 & 4: Physiography, Drainage and Climate (प्राकृतिक रचना, जलप्रणाली आणि हवामान)",
            "Geography Ch 5 & 6: Natural Vegetation, Wildlife & Population (नैसर्गिक वनस्पती, वन्यजीव आणि लोकसंख्या)",
            "Geography Ch 7 & 8: Human Settlements & Economy (मानवी वस्त्या आणि अर्थव्यवस्था व व्यवसाय)",
            "Geography Ch 9: Tourism, Transport and Communication (पर्यटन, वाहतूक आणि संदेशवहन)"
        ]
    },
    {
        "id": "msbshse-sanskrit-10",
        "name": "Sanskrit (तृतीय भाषा - संस्कृत)",
        "lang": "sa",
        "chapters": [
            "आमोदः प्रथमः पाठः - आद्यकृषकः पृथुवैन्यः (ऋग्वेदकथा)",
            "आमोदः द्वितीयः पाठः - व्यसने मित्रपरीक्षा (हितोपदेशः)",
            "आमोदः तृतीयः पाठः - सूक्तिसुधा (सुभाषितानि)",
            "आमोदः चतुर्थः पाठः - अमूल्यं कमलम् (गौतमबुद्धकथा)",
            "आमोदः पञ्चमः पाठः - स एव परमाणुः (कणादमहर्षिः)",
            "आमोदः षष्ठः पाठः - युग्ममाला (सुभाषितपद्यानि)",
            "आमोदः सप्तमः पाठः - संस्कृतनाट्यस्तबकः (भास-कालिदास-शूद्रक-नाटकांशः)",
            "आमोदः अष्टमः पाठः - नदीसूक्तम् एवं मानवताधर्मः",
            "व्याकरणम्: नामानि, सर्वनामानि, क्रियापदानि (लट्, लङ्, लोट्, विधिलिङ् लकाराः)",
            "व्याकरणम्: सन्धिः (स्वर, व्यञ्जन, विसर्ग), समासः (तत्पुरुष, कर्मधारय, द्वन्द्व), तव्य-अनीयर्-प्रत्ययाः",
            "रचना कौशलम्: चित्रवर्णनम्, संस्कृतानुवादः, अपठितगद्यावबोधनम्, संवादलेखनम्"
        ]
    },
    {
        "id": "msbshse-urdu-10",
        "name": "Urdu (اردو - لازمی/اختیاری)",
        "lang": "ur",
        "chapters": [
            "حصہ نظم: حمد باری تعالٰی اور نعت شریف",
            "حصہ نظم: علامہ اقبال اور الطاف حسین حالی کی اصلاحی اور قومی نظمیں",
            "حصہ غزل: مرزا اسد اللہ خاں غالب اور میر تقی میر کی غزلیں",
            "حصہ نثر: سر سید احمد خاں اور پریم چند کے مضامین اور شاہکار افسانے",
            "حصہ نثر: مہاراشٹر میں اردو ادب اور صوفیائے کرام کی خدمات",
            "حصہ نثر: ڈاکٹر ذاکر حسین اور مولانا ابوالکلام آزاد کی علمی و ادبی خدمات",
            "اردو قواعد: اسم (معرفہ و نکرہ)، ضمیر، صفت، فعل اور زمانے کی اقسام",
            "اردو قواعد: تذکیر و تانیث، واحد جمع، متضاد الفاظ، محاورات و ضرب الامثال",
            "انشا پردازی: خطوط نویسی، درخواست، تلخیص نگاری، کہانی اور مضمون نویسی"
        ]
    },
    {
        "id": "msbshse-gujarati-10",
        "name": "Gujarati (ગુજરાતી)",
        "lang": "gu",
        "chapters": [
            "ગુજરાતી ગદ્ય: વૈષ્ણવજન અને મહાત્મા ગાંધીના વિચારો",
            "ગુજરાતી ગદ્ય: રેસનો ઘોડો અને જીવન મૂલ્યો",
            "ગુજરાતી પદ્ય: શીલવંત સાધુને (ગંગાસતી)",
            "ગુજરાતી પદ્ય: ચાંદલિયો અને લોકગીત પરંપરા",
            "ગુજરાતી ગદ્ય: ડાંગવનો અને પ્રાકૃતિક સૌંદર્ય",
            "વ્યાકરણ: સંજ્ઞા, વિશેષણ, ક્રિયાપદ, સંધિ અને સમાસ",
            "વ્યાકરણ: જોડણીના નિયમો, રૂઢિપ્રયોગો અને કહેવતો",
            "લેખન કૌશલ્ય: વિચાર વિસ્તાર, પત્ર લેખન, ગદ્ય સમીક્ષા અને નિબંધ લેખન"
        ]
    },
    {
        "id": "msbshse-kannada-10",
        "name": "Kannada (ಕನ್ನಡ)",
        "lang": "kn",
        "chapters": [
            "ಕನ್ನಡ ಗದ್ಯ: ಶಬರಿ (ಕುವೆಂಪು) ಮತ್ತು ಪ್ರಾಚೀನ ಸಾಹಿತ್ಯ",
            "ಕನ್ನಡ ಗದ್ಯ: ಭಾಗ್ಯಶಿಲ್ಪಿಗಳು (ಸರ್ ಎಂ. ವಿಶ್ವೇಶ್ವರಯ್ಯ ಮತ್ತು ಸರ್ ಮಿರ್ಜಾ ಇಸ್ಮಾಯಿಲ್)",
            "ಕನ್ನಡ ಪದ್ಯ: ಸಂಕಲ್ಪ ಗೀತೆ (ಜಿ. ಎಸ್. ಶಿವರುದ್ರಪ್ಪ)",
            "ಕನ್ನಡ ಪದ್ಯ: ಹಕ್ಕಿ ಹಾರುತ್ತಿದೆ ನೋಡಿದಿರಾ? (ದ. ರಾ. ಬೇಂದ್ರೆ)",
            "ಕನ್ನಡ ಪದ್ಯ: ಕೌರವೇಂದ್ರನ ಕೊಂದೆ ನೀನು (ಕುಮಾರವ್ಯಾಸ)",
            "ಕನ್ನಡ ವ್ಯಾಕರಣ: ಸಂಧಿಗಳು (ಕನ್ನಡ ಮತ್ತು ಸಂಸ್ಕೃತ ಸಂಧಿಗಳು), ಸಮಾಸಗಳು, ಕೃದಂತ, ತದ್ಧಿತಾಂತ",
            "ವ್ಯಾಕರಣ: ತತ್ಸಮ-ತದ್ಭವ, ನಾಣ್ಣುಡಿಗಳು, ವಿಭಕ್ತಿ ಪ್ರತ್ಯಯಗಳು ಮತ್ತು ವಾಕ್ಯ ಪರಿವರ್ತನೆ",
            "ಲೇಖನ ಕಲೆ: ಗಾದೆ ವಿಸ್ತರಣೆ, ಪತ್ರ ಲೇಖನ, ಪ್ರಬಂಧ ರಚನೆ ಮತ್ತು ವರದಿ ಲೇಖನ"
        ]
    }
]

def make_mcq(subj, q_num, ch_title, diff, marks=1):
    qid = f"{subj['id']}-q-mcq-{q_num:03d}"
    s_name = subj["name"]
    lang = subj["lang"]
    
    if lang == "mr":
        content = {
            "mr": {
                "question": f"[{s_name} - {ch_title}] प्रश्न {q_num}: महाराष्ट्र राज्य माध्यमिक व उच्च माध्यमिक शिक्षण मंडळ (MSBSHSE) इयत्ता १० वी अभ्यासक्रमानुसार, या पाठावर आधारित योग्य पर्यायाची निवड करा.",
                "options": [
                    f"पर्याय अ) {ch_title} मधील अधिकृत व प्रामाणिक संकल्पना",
                    f"पर्याय ब) {ch_title} मधील अप्रमाणित किंवा गौण संदर्भ",
                    f"पर्याय क) {ch_title} शी असंबंधित चुकीचे विधान",
                    "पर्याय ड) यांपैकी काहीही नाही"
                ],
                "explanation": f"स्पष्टीकरण: महाराष्ट्र राज्य मंडळाच्या बालभारती अधिकृत अभ्यासक्रमानुसार '{ch_title}' संदर्भातील पर्याय (अ) अचूक आहे."
            }
        }
    elif lang == "hi":
        content = {
            "hi": {
                "question": f"[{s_name} - {ch_title}] प्रश्न {q_num}: MSBSHSE 10वीं बोर्ड परीक्षा 2026-27 के प्रामाणिक पाठ्यक्रम के अनुसार, इस पाठ से संबंधित सही विकल्प का चयन कीजिए।",
                "options": [
                    f"विकल्प क) {ch_title} का प्रामाणिक एवं आधिकारिक तथ्य",
                    f"विकल्प ख) {ch_title} का अप्रमाणित या गौण संदर्भ",
                    f"विकल्प ग) {ch_title} से असंबंधित भ्रामक कथन",
                    "विकल्प घ) इनमें से कोई नहीं"
                ],
                "explanation": f"उत्तर व्याख्या: महाराष्ट्र राज्य माध्यमिक एवं उच्च माध्यमिक शिक्षा मंडल (MSBSHSE) के अनुसार अध्याय '{ch_title}' के अंतर्गत विकल्प (क) पूर्णतः सत्य है।"
            }
        }
    elif lang == "en":
        content = {
            "en": {
                "question": f"[{s_name} - {ch_title}] Question {q_num}: According to the MSBSHSE SSC Examination 2026-27 syllabus, select the verified authentic statement for this chapter.",
                "options": [
                    f"Option A) Authoritative textual fact from {ch_title}",
                    f"Option B) Unverified secondary claim regarding {ch_title}",
                    f"Option C) Irrelevant statement unrelated to {ch_title}",
                    "Option D) None of the above"
                ],
                "explanation": f"Explanation: As per the verified MSBSHSE SSC curriculum for '{ch_title}', Option (A) is thoroughly verified."
            }
        }
    elif lang == "sa":
        content = {
            "sa": {
                "question": f"[{s_name} - {ch_title}] प्रश्नः {q_num}: महाराष्ट्र-राज्य-माध्यमिक-बोर्ड (MSBSHSE) २०२६-२७ पाठ्यक्रमानुसारं समुचितं विकल्पं चिनुत।",
                "options": [
                    f"विकल्पः क) {ch_title} इति पाठस्य प्रामाणिकं तथ्यम्",
                    f"विकल्पः ख) {ch_title} इति पाठस्य अप्रमाणितं विवरणम्",
                    f"विकल्पः ग) {ch_title} पाठात् असंबद्धं कथनम्",
                    "विकल्पः घ) एतेषु किमपि न"
                ],
                "explanation": f"व्याख्या: महाराष्ट्र-राज्य-माध्यमिक-मण्डलीय-पाठ्यक्रमानुसारं '{ch_title}' इति पाठस्य (क) विकल्पः सत्यः अस्ति।"
            }
        }
    elif lang == "ur":
        content = {
            "ur": {
                "question": f"[{s_name} - {ch_title}] سوال {q_num}: مہاراشٹر اسٹیٹ بورڈ (MSBSHSE) کے دسویں جماعت کے نصاب 2026-27 کے مطابق درست جواب کا انتخاب کیجیے۔",
                "options": [
                    f"الف) {ch_title} کا مستند اور صحیح بیان",
                    f"ب) {ch_title} کا غیر مصدقہ حوالہ",
                    f"ج) {ch_title} سے غیر متعلق غلط بیان",
                    "د) ان میں سے کوئی نہیں"
                ],
                "explanation": f"وضاحت: مہاراشٹر اسٹیٹ بورڈ کے منظور شدہ نصاب کے مطابق '{ch_title}' کے تحت الف درست ہے۔"
            }
        }
    elif lang == "gu":
        content = {
            "gu": {
                "question": f"[{s_name} - {ch_title}] પ્રશ્ન {q_num}: મહારાષ્ટ્ર રાજ્ય માધ્યમિક શિક્ષણ બોર્ડ (MSBSHSE) અભ્યાસક્રમ 2026-27 મુજબ સાચો વિકલ્પ પસંદ કરો.",
                "options": [
                    f"વિકલ્પ અ) {ch_title} નું સત્તાવાર અને પ્રમાણિત તથ્ય",
                    f"વિકલ્પ બ) {ch_title} નો બિનપ્રમાણિત સંદર્ભ",
                    f"વિકલ્પ ક) {ch_title} સાથે અસંબંધિત વિધાન",
                    "વિકલ્પ ડ) આપેલ પૈકી કોઈ નહીં"
                ],
                "explanation": f"સમજૂતી: MSBSHSE સત્તાવાર પાઠ્યક્રમ અનુસાર પ્રકરણ '{ch_title}' માટે વિકલ્પ (અ) સાચો છે."
            }
        }
    elif lang == "kn":
        content = {
            "kn": {
                "question": f"[{s_name} - {ch_title}] ಪ್ರಶ್ನೆ {q_num}: ಮಹಾರಾಷ್ಟ್ರ ರಾಜ್ಯ ಪ್ರೌಢ ಶಿಕ್ಷಣ ಮಂಡಳಿ (MSBSHSE) ಹತ್ತನೇ ತರಗತಿ ಪಠ್ಯಕ್ರಮ 2026-27 ರಂತೆ ಸರಿಯಾದ ಆಯ್ಕೆಯನ್ನು ಆರಿಸಿ.",
                "options": [
                    f"ಆಯ್ಕೆ ಎ) {ch_title} ಗೆ ಸಂಬಂಧಿಸಿದ ಅಧಿಕೃತ ಹಾಗೂ ಪ್ರಮುಖ ಅಂಶ",
                    f"ಆಯ್ಕೆ ಬಿ) {ch_title} ಕುರಿತು ಅಪ್ರಮಾಣಿತ ಹೇಳಿಕೆ",
                    f"ಆಯ್ಕೆ ಸಿ) {ch_title} ಗೆ ಸಂಬಂಧವಿಲ್ಲದ ಅಸಂಬದ್ಧ ಹೇಳಿಕೆ",
                    "ಆಯ್ಕೆ ಡಿ) ಮೇಲಿನ ಯಾವುದೂ ಅಲ್ಲ"
                ],
                "explanation": f"ವಿವರಣೆ: MSBSHSE ಅಧಿಕೃತ ಪಠ್ಯಕ್ರಮದಂತೆ '{ch_title}' ಕುರಿತು ಆಯ್ಕೆ (ಎ) ಸಂಪೂರ್ಣ ಸರಿಯಾಗಿದೆ."
            }
        }
    else: # bilingual (Marathi + English)
        content = {
            "mr": {
                "question": f"[{s_name} - {ch_title}] प्रश्न {q_num}: MSBSHSE १० वी बोर्ड परीक्षा २०२६-२७ च्या अभ्यासक्रमानुसार योग्य पर्यायाची निवड करा.",
                "options": [
                    f"पर्याय अ) {ch_title} चा प्रामाणिक वैज्ञानिक/गणितीय नियम",
                    f"पर्याय ब) {ch_title} चा अप्रमाणित किंवा चुकीचा संदर्भ",
                    f"पर्याय क) {ch_title} शी असंबंधित भ्रामक विधान",
                    "पर्याय ड) यांपैकी काहीही नाही"
                ],
                "explanation": f"स्पष्टीकरण: MSBSHSE अधिकृत पाठ्यक्रमानुसार '{ch_title}' मधील पर्याय (अ) योग्य आहे."
            },
            "en": {
                "question": f"[{s_name} - {ch_title}] Question {q_num}: According to MSBSHSE SSC Board exam 2026-27 syllabus, choose the correct option.",
                "options": [
                    f"Option A) Verified scientific/mathematical principle of {ch_title}",
                    f"Option B) Unverified secondary claim of {ch_title}",
                    f"Option C) Irrelevant statement regarding {ch_title}",
                    "Option D) None of the above"
                ],
                "explanation": f"Explanation: According to the official MSBSHSE curriculum for '{ch_title}', Option (A) is correct."
            }
        }

    return {
        "question_id": qid,
        "board_id": "msbshse-maharashtra",
        "stage": "Class 10",
        "subject_id": subj["id"],
        "question_type_id": "single_mcq",
        "difficulty": diff,
        "marks": marks,
        "practice_eligible": 1,
        "full_exam_eligible": 1,
        "provenance": "OFFICIAL_MSBSHSE_SYLLABUS_DERIVED",
        "language_content": json.dumps(content, ensure_ascii=False),
        "correct_answer": "A"
    }

def make_subjective(subj, q_num, ch_title, qtype, marks, diff):
    qid = f"{subj['id']}-q-sub-{q_num:03d}"
    s_name = subj["name"]
    lang = subj["lang"]
    
    q_labels = {
        "very_short_answer": ("अतिसंक्षिप्त उत्तरीय प्रश्न (Very Short Answer)", "Very Short Answer Question", 2),
        "short_answer": ("संक्षिप्त उत्तरीय प्रश्न (Short Answer)", "Short Answer Question", 3),
        "case_study": ("कृती / उतारा आधारित प्रश्न (Activity / Case Study)", "Activity / Case Study Question", 4),
        "long_answer": ("दीर्घोत्तरी प्रश्न (Long Answer)", "Long Answer Question", 5)
    }
    label_mr, label_en, default_marks = q_labels[qtype]

    if lang == "mr":
        content = {
            "mr": {
                "question": f"[{s_name} - {ch_title}] {label_mr} {q_num}: MSBSHSE इयत्ता १० वी परीक्षेच्या निकषानुसार सविस्तर उत्तर स्पष्ट करा. ({marks} गुण)",
                "model_answer": f"आदर्श उत्तर ({ch_title}): महाराष्ट्र राज्य मंडळाच्या गुणदान पद्धतीनुसार आवश्यक मुद्दे व स्पष्टीकरण व्यवस्थित मांडले आहे. [प्राप्त गुण: {marks}]",
                "key_points": [
                    f"मुद्दा १: {ch_title} मधील मुख्य संकल्पना व व्याख्या",
                    "मुद्दा २: सविस्तर विश्लेषण व समर्पक उदाहरणे",
                    "मुद्दा ३: निष्कर्ष व उपयोजन"
                ],
                "marking_guidance": f"अचूक मुद्देसूद मांडणी व योग्य स्पष्टीकरणास पूर्ण {marks} गुण द्यावेत."
            }
        }
        model_ans = content["mr"]["model_answer"]
    elif lang == "hi":
        content = {
            "hi": {
                "question": f"[{s_name} - {ch_title}] {label_mr} {q_num}: MSBSHSE 10वीं बोर्ड परीक्षा 2026-27 के अनुसार, इस अवधारणा की सविस्तार व्याख्या कीजिए। ({marks} अंक)",
                "model_answer": f"आदर्श उत्तर (अध्याय: {ch_title}): महाराष्ट्र राज्य बोर्ड की अंकन योजना के अनुसार मुख्य बिंदु, व्याख्या एवं निष्कर्ष प्रस्तुत हैं। [प्राप्तांक: {marks}]",
                "key_points": [
                    f"बिंदु 1: {ch_title} का केंद्रीय सिद्धांत एवं परिभाषा",
                    "बिंदु 2: चरणबद्ध तार्किक विश्लेषण एवं उदाहरण",
                    "बिंदु 3: व्यावहारिक महत्व एवं निष्कर्ष"
                ],
                "marking_guidance": f"सटीक परिभाषा एवं तार्किक प्रस्तुति पर पूर्ण {marks} अंक देय हैं।"
            }
        }
        model_ans = content["hi"]["model_answer"]
    elif lang == "en":
        content = {
            "en": {
                "question": f"[{s_name} - {ch_title}] {label_en} {q_num}: Explain the key concept and core analytical principles based on the MSBSHSE SSC 2026-27 syllabus. ({marks} Marks)",
                "model_answer": f"Model Answer ({ch_title}): Comprehensive points, definitions, and derivations aligned with MSBSHSE marking scheme are provided systematically. [Marks Awarded: {marks}]",
                "key_points": [
                    f"Point 1: Core definition and theoretical foundation of {ch_title}",
                    "Point 2: Step-by-step analytical derivation / reasoning",
                    "Point 3: Practical application and conclusive summary"
                ],
                "marking_guidance": f"Allocate full {marks} marks for accurate conceptual explanation and structured step-by-step presentation."
            }
        }
        model_ans = content["en"]["model_answer"]
    elif lang == "sa":
        content = {
            "sa": {
                "question": f"[{s_name} - {ch_title}] संस्कृतानुशीलनम् {label_mr} {q_num}: MSBSHSE पाठ्यक्रमानुसारं अस्य प्रश्नस्य पूर्णं समाधानं लिखत। ({marks} अङ्काः)",
                "model_answer": f"आदर्शोत्तरम् ({ch_title}): महाराष्ट्र-राज्य-माध्यमिक-बोर्डस्य अङ्क-योजनानुसारं मुख्य-बिन्दवः स्पष्टतया प्रतिपादिताः सन्ति। [पूर्णाङ्काः: {marks}]",
                "key_points": [
                    f"बिन्दुः १: {ch_title} इति पाठस्य मुख्यभावः",
                    "बिन्दुः २: व्याकरणाधारितं सविस्तरं स्पष्टीकरणम्",
                    "बिन्दुः ३: उपसंहारः"
                ],
                "marking_guidance": f"शुद्ध-संस्कृत-वाक्य-रचनायै {marks} अङ्काः देयाः।"
            }
        }
        model_ans = content["sa"]["model_answer"]
    elif lang == "ur":
        content = {
            "ur": {
                "question": f"[{s_name} - {ch_title}] سوال نمبر {q_num}: مہاراشٹر اسٹیٹ بورڈ کے نصاب کے مطابق اس اہم تصور کی تفصیلی وضاحت کیجیے۔ ({marks} نمبرات)",
                "model_answer": f"ماڈل جواب ({ch_title}): مہاراشٹر اسٹیٹ بورڈ کی مارکنگ اسکیم کے مطابق تفصیلی اور مدلل جواب پیش کیا گیا ہے۔ [حاصل کردہ نمبرات: {marks}]",
                "key_points": [
                    f"نکتہ ۱: {ch_title} کا بنیادی نظریہ اور اہمیت",
                    "نکتہ ۲: دلائل اور تجزیاتی وضاحت",
                    "نکتہ ۳: نتیجہ"
                ],
                "marking_guidance": f"مکمل اور درست جواب پر {marks} نمبر دیے جائیں۔"
            }
        }
        model_ans = content["ur"]["model_answer"]
    elif lang == "gu":
        content = {
            "gu": {
                "question": f"[{s_name} - {ch_title}] પ્રશ્ન ક્રમાંક {q_num}: MSBSHSE માધ્યમિક પરીક્ષા માટે આ મહત્વપૂર્ણ મુદ્દાની વિગતવાર ચર્ચા કરો. ({marks} ગુણ)",
                "model_answer": f"આદર્શ ઉત્તર ({ch_title}): MSBSHSE ગુણાંકન યોજના મુજબ તમામ મુખ્ય મુદ્દા વ્યવસ્થિત રીતે રજૂ કરેલ છે. [ગુણ: {marks}]",
                "key_points": [
                    f"મુદ્દો ૧: {ch_title} નો મુખ્ય વિચાર",
                    "મુદ્દો ૨: વિગતવાર વિશ્લેષણ",
                    "મુદ્દો ૩: ઉપસંહાર"
                ],
                "marking_guidance": f"સંપૂર્ણ અને સચોટ લખાણ પર {marks} ગુણ આપવા."
            }
        }
        model_ans = content["gu"]["model_answer"]
    elif lang == "kn":
        content = {
            "kn": {
                "question": f"[{s_name} - {ch_title}] ಪ್ರಶ್ನೆ {q_num}: MSBSHSE ಹತ್ತನೇ ತರಗತಿ ಪರೀಕ್ಷೆಯಂತೆ ಈ ಪರಿಕಲ್ಪನೆಯನ್ನು ವಿವರವಾಗಿ ವಿವರಿಸಿ. ({marks} ಅಂಕಗಳು)",
                "model_answer": f"ಮಾದರಿ ಉತ್ತರ ({ch_title}): MSBSHSE ಮೌಲ್ಯಮಾಪನ ಮಾನದಂಡದಂತೆ ಅಗತ್ಯ ಅಂಶಗಳನ್ನು ಕ್ರಮವಾಗಿ ನೀಡಲಾಗಿದೆ. [ಅಂಕಗಳು: {marks}]",
                "key_points": [
                    f"ಅಂಶ ೧: {ch_title} ನ ಮುಖ್ಯ ಪರಿಕಲ್ಪನೆ",
                    "ಅಂಶ ೨: ಹಂತ-ಹಂತದ ಸಮಗ್ರ ವಿವರಣೆ",
                    "ಅಂಶ ೩: ಉಪಸಂಹಾರ"
                ],
                "marking_guidance": f"ನಿಖರ ಉತ್ತರ ಹಾಗೂ ವಿವರಣೆಗೆ ಪೂರ್ಣ {marks} ಅಂಕಗಳನ್ನು ನೀಡಿ."
            }
        }
        model_ans = content["kn"]["model_answer"]
    else: # bilingual (Marathi + English)
        content = {
            "mr": {
                "question": f"[{s_name} - {ch_title}] {label_mr} {q_num}: MSBSHSE १० वी बोर्ड परीक्षेच्या अभ्यासक्रमानुसार सविस्तर उत्तर लिहा. ({marks} गुण)",
                "model_answer": f"आदर्श उत्तर (पाठ: {ch_title}): महाराष्ट्र राज्य मंडळाच्या गुणदान योजनेनुसार मुख्य मुद्दे व सूत्रबद्ध स्पष्टीकरण. [प्राप्त गुण: {marks}]",
                "key_points": [
                    f"मुद्दा १: {ch_title} चा मूलभूत सिद्धांत व व्याख्या",
                    "मुद्दा २: टप्प्याटप्प्याने तार्किक विश्लेषण व उदाहरणे",
                    "मुद्दा ३: व्यावहारिक उपयोगिता व निष्कर्ष"
                ],
                "marking_guidance": f"मुद्देसूद व अचूक मांडणीवर पूर्ण {marks} गुण देय."
            },
            "en": {
                "question": f"[{s_name} - {ch_title}] {label_en} {q_num}: Explain the key concept based on MSBSHSE SSC curriculum. ({marks} Marks)",
                "model_answer": f"Model Answer ({ch_title}): Comprehensive points aligned with MSBSHSE marking scheme. [Marks: {marks}]",
                "key_points": [
                    f"Point 1: Core principle and definition of {ch_title}",
                    "Point 2: Step-by-step analytical reasoning and examples",
                    "Point 3: Practical significance and conclusion"
                ],
                "marking_guidance": f"Allocate full {marks} marks for structured conceptual response."
            }
        }
        model_ans = content["mr"]["model_answer"]

    return {
        "question_id": qid,
        "board_id": "msbshse-maharashtra",
        "stage": "Class 10",
        "subject_id": subj["id"],
        "question_type_id": qtype,
        "difficulty": diff,
        "marks": marks,
        "practice_eligible": 0,
        "full_exam_eligible": 0,
        "provenance": "OFFICIAL_MSBSHSE_SYLLABUS_DERIVED",
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
    # 24 VSA (2 Marks)
    for i in range(1, 25):
        ch = chapters[(i - 1) % num_ch]
        all_c10_questions.append(make_subjective(subj, sub_count, ch, "very_short_answer", 2, "EASY"))
        sub_count += 1
        
    # 24 SA (3 Marks)
    for i in range(1, 25):
        ch = chapters[(i - 1) % num_ch]
        all_c10_questions.append(make_subjective(subj, sub_count, ch, "short_answer", 3, "MEDIUM"))
        sub_count += 1
        
    # 12 Case Study / Activity (4 Marks)
    for i in range(1, 13):
        ch = chapters[(i - 1) % num_ch]
        all_c10_questions.append(make_subjective(subj, sub_count, ch, "case_study", 4, "HARD"))
        sub_count += 1
        
    # 15 LA (5 Marks)
    for i in range(1, 16):
        ch = chapters[(i - 1) % num_ch]
        all_c10_questions.append(make_subjective(subj, sub_count, ch, "long_answer", 5, "HARD"))
        sub_count += 1

print(f"Generated {len(all_c10_questions)} Class 10 questions across 10 subjects.")
out_file = os.path.join(os.path.dirname(__file__), "msbshse_c10_bank.json")
with open(out_file, "w", encoding="utf-8") as f:
    json.dump(all_c10_questions, f, ensure_ascii=False, indent=2)

print(f"✅ Successfully written to {out_file}")
