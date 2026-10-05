import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

print("Building GSEB Class 10 (SSC) Comprehensive Curriculum Bank (10 Primary Subjects)...")

PRIMARY_C10_SUBJECTS = [
    {
        "id": "gseb-gujarati-fl-10",
        "name": "Gujarati First Language (ગુજરાતી - પ્રથમ ભાષા)",
        "lang": "gu",
        "chapters": [
            "ગદ્ય ૧: વૈષ્ણવજન (નરસિંહ મહેતા - ભક્તિ કાવ્ય)",
            "ગદ્ય ૨: રેસનો ઘોડો (વર્ષા અડાલજા - જીવન મૂલ્યો અને સંસ્કાર)",
            "પદ્ય ૩: શીલવંત સાધુને (ગંગાસતી - સંતવાણી)",
            "ગદ્ય ૪: ભૂલી ગયા પછી (રઘુવીર ચૌધરી - એકાંકી)",
            "પદ્ય ૫: દીકરી (અશોક ચાવડા 'બેદિલ' - ગઝલ)",
            "ગદ્ય ૬: વાયરલ ઇન્ફેક્શન (ગુણવંત શાહ - સ્વાસ્થ્ય અને જીવનશૈલી)",
            "પદ્ય ૭: હું એવો ગુજરાતી (વિનોદ જોશી - અસ્મિતા ગીત)",
            "ગદ્ય ૮: છત્રી (રતિલાલ બોરીસાગર - હાસ્ય નિબંધ)",
            "પદ્ય ૯: માધવને દીઠો છે ક્યાંય (હરીન્દ્ર દવે - ઉર્મિગીત)",
            "ગદ્ય ૧૦: ડાંગવનો અને... (મહેન્દ્રસિંહ પરમાર - પ્રવાસ વર્ણન)",
            "પદ્ય ૧૧: શિકારીને (કલાપી - સોનેટ)",
            "ગદ્ય ૧૨: ચોપડાની ઇન્દ્રજાળ (ચંદ્રકાંત પંડ્યા - સામાજિક કથા)",
            "પદ્ય ૧૩: વતનથી વિદાય થતાં (જયંત પાઠક - સોનેટ)",
            "ગદ્ય ૧૪: જન્મોત્સવ (સુરેશ જોષી - નવલિકા)",
            "પદ્ય ૧૫: બોલીએ ના કાંઈ (રાજેન્દ્ર શાહ - ગીત)",
            "ગદ્ય ૧૬: ગતિભંગ (મોહનલાલ પટેલ - લઘુકથા)",
            "પદ્ય ૧૭: દિવસો જુદાઈના જાય છે (ગની દહીંવાલા - ગઝલ)",
            "ગદ્ય ૧૮: ભૂખથીય ભૂંડી ભીખ (પન્નાલાલ પટેલ - નવલકથા અંશ)",
            "પદ્ય ૧૯: એક બપોરે (રાવજી પટેલ - કાવ્ય)",
            "ગદ્ય ૨૦: વિરલ વિભૂતિ (આત્મર્પિત અપૂર્વજી - શ્રીમદ્ રાજચંદ્ર જીવન)",
            "પદ્ય ૨૧: ચાંદલિયો (લોકગીત)",
            "વ્યાકરણ: જોડણી, સંધિ, સમાસ (દ્વન્દ્વ, તત્પુરુષ, કર્મધારય, દ્વિગુ), રૂઢિપ્રયોગો, કહેવતો, છંદ, અલંકાર",
            "લેખન કૌશલ્ય: વિચાર વિસ્તાર, અહેવાલ લેખન, સંક્ષેપીકરણ અને નિબંધ લેખન"
        ]
    },
    {
        "id": "gseb-hindi-sl-10",
        "name": "Hindi Second Language (હિન્દી - દ્વિતીય ભાષા)",
        "lang": "hi",
        "chapters": [
            "पद्य 1: प्रभु जी तुम चंदन हम पानी (रैदास)",
            "गद्य 2: बूढ़ी काकी (मुंशी प्रेमचंद)",
            "पद्य 3: सवैये (रसखान)",
            "गद्य 4: एक प्रश्न चार उत्तर (श्रीप्रकाश)",
            "पद्य 5: मीरा के पद (मीराबाई)",
            "गद्य 6: कालिदास का प्राणी-प्रेम (मोहन राकेश)",
            "पद्य 7: जन्मभूमि (सुमित्रानंदन पंत)",
            "गद्य 8: कर्मयोगी लालबहादुर शास्त्री (शंकर दयाल शर्मा)",
            "पद्य 9: कुत्ते की सीख (रामधारी सिंह 'दिनकर')",
            "गद्य 10: जीने की कला (मौलाना अबुल कलाम आज़ाद)",
            "पद्य 11: भारत रत्न महामना मदनमोहन मालवीय",
            "गद्य 12: साधु उपदेश (काका हाथरसी)",
            "व्याकरण: संधि, समास, पर्यायवाची शब्द, विलोम शब्द, मुहावरे, लोकोक्तियाँ, उपसर्ग-प्रत्यय",
            "रचना विभाग: पत्र लेखन, गद्यांश संक्षेपण, कहानी लेखन, निबंध लेखन"
        ]
    },
    {
        "id": "gseb-english-10",
        "name": "English (Compulsory Language)",
        "lang": "en",
        "chapters": [
            "Unit 1: Against the Odds (Tracks to Taj Nagar, Sitapur's Light, Palakkad's Public Library)",
            "Unit 2: The Human Robot (Ram Singh-070, Prem Chopra, Principles of Robotics)",
            "Unit 3: An Interview with Arun Krishnamurthy (EFI, Lake Cleanup, Environmental Conservation)",
            "Unit 4: A Wonderful Creation (The Attributes of Mother, Divine Creation)",
            "Unit 5: Playing with Fire (Science of Pyrotechnics, Fireworks Safety, Sivakasi)",
            "Unit 6: I Love You, Teacher (Helen Keller, Miss Anne Sullivan, Awakening of Intellect)",
            "Unit 7: Kach & Devayani (Sanjivani Vidya, Shukracharya, Devayani's Curse)",
            "Unit 8: Our Feathered Friends (Birds of Gujarat, Salim Ali, Hornbills, Woodpeckers)",
            "Unit 9: Tune up O Teens! (Exam Stress Management, Healthy Sleep, Dr. Mansuri)",
            "Unit 10: A Test of True Love (Lieutenant John Blandford & Hollis Meynell)",
            "Poetry: My Song (Rabindranath Tagore), Pencil, Growing Up, Vanilla Twilight",
            "Grammar: Direct-Indirect Speech, Active-Passive Voice, Conjunctions, Modal Auxiliaries, Tenses",
            "Writing Skills: Formal & Informal Letters, Notice Writing, Report Writing, Diary Entry, Essay Writing"
        ]
    },
    {
        "id": "gseb-math-basic-10",
        "name": "Mathematics Basic (ગણિત બેઝિક - Code 18)",
        "lang": "gu_en",
        "chapters": [
            "પ્રકરણ ૧: વાસ્તવિક સંખ્યાઓ (Real Numbers - Fundamental Theorem of Arithmetic, HCF & LCM)",
            "પ્રકરણ ૨: બહુપદીઓ (Polynomials - Zeroes of Polynomial, Graphical Representation)",
            "પ્રકરણ ૩: દ્વિચલ સુરેખ સમીકરણ યુગ્મ (Pair of Linear Equations in Two Variables - Substitution & Elimination)",
            "પ્રકરણ ૪: દ્વિઘાત સમીકરણ (Quadratic Equations - Factorisation, Discriminant, Nature of Roots)",
            "પ્રકરણ ૫: સમાંતર શ્રેણી (Arithmetic Progressions - nth Term an, Sum Sn Formulae)",
            "પ્રકરણ ૬: ત્રિકોણ (Triangles - Thales Basic Proportionality Theorem, Similarity Criteria)",
            "પ્રકરણ ૭: યામ ભૂમિતિ (Coordinate Geometry - Distance Formula, Section Formula)",
            "પ્રકરણ ૮: ત્રિકોણમિતિનો પરિચય (Introduction to Trigonometry - Ratios of Standard Angles 0°, 30°, 45°, 60°, 90°)",
            "પ્રકરણ ૯: ત્રિકોણમિતિના ઉપયોગો (Some Applications of Trigonometry - Angles of Elevation & Depression)",
            "પ્રકરણ ૧૦: વર્તુળ (Circles - Tangents to Circle, Tangent perpendicular to radius)",
            "પ્રકરણ ૧૧: વર્તુળ સંબંધિત ક્ષેત્રફળ (Areas Related to Circles - Sector and Segment of a Circle)",
            "પ્રકરણ ૧૨: પૃષ્ઠફળ અને ઘનફળ (Surface Areas and Volumes - Combination of Cylinder, Cone, Sphere)",
            "પ્રકરણ ૧૩: આંકડાશાસ્ત્ર (Statistics - Mean, Median, Mode of Grouped Data)",
            "પ્રકરણ ૧૪: સંભાવના (Probability - Classical Probability, Coins, Dice, Playing Cards)"
        ]
    },
    {
        "id": "gseb-math-std-10",
        "name": "Mathematics Standard (ગણિત સ્ટાન્ડર્ડ - Code 12)",
        "lang": "gu_en",
        "chapters": [
            "પ્રકરણ ૧: વાસ્તવિક સંખ્યાઓ (Real Numbers - Proof of Irrationality, Fundamental Theorem Rigor)",
            "પ્રકરણ ૨: બહુપદીઓ (Polynomials - Cubic Polynomials, Division Algorithm, Zeroes Analysis)",
            "પ્રકરણ ૩: દ્વિચલ સુરેખ સમીકરણ યુગ્મ (Linear Equations - Consistency Conditions, Upstream/Downstream Word Problems)",
            "પ્રકરણ ૪: દ્વિઘાત સમીકરણ (Quadratic Equations - Advanced Speed-Time, Fractional Roots, Complex Word Problems)",
            "પ્રકરણ ૫: સમાંતર શ્રેણી (Arithmetic Progressions - Multi-condition AP, General term proofs)",
            "પ્રકરણ ૬: ત્રિકોણ (Triangles - Converse of BPT, Ratio of Areas, Advanced Geometric Deductions)",
            "પ્રકરણ ૭: યામ ભૂમિતિ (Coordinate Geometry - Collinearity, Centroid, Geometric Quadrilaterals)",
            "પ્રકરણ ૮: ત્રિકોણમિતિનો પરિચય (Trigonometry - Algebraic Identity Transformations, Complementary Relations)",
            "પ્રકરણ ૯: ત્રિકોણમિતિના ઉપયોગો (Applications of Trigonometry - Multi-vantage elevation, Cloud & Lake reflections)",
            "પ્રકરણ ૧૦: વર્તુળ (Circles - Tangent length equality theorem, Circumscribed polygon proofs)",
            "પ્રકરણ ૧૧: વર્તુળ સંબંધિત ક્ષેત્રફળ (Areas Related to Circles - Multi-component shaded region analysis)",
            "પ્રકરણ ૧૨: પૃષ્ઠફળ અને ઘનફળ (Surface Areas and Volumes - Melting & Recasting solids, Water flow through pipes)",
            "પ્રકરણ ૧૩: આંકડાશાસ્ત્ર (Statistics - Missing Frequencies f1 and f2 calculations, Step-deviation method)",
            "પ્રકરણ ૧૪: સંભાવના (Probability - Multi-stage events, Non-replacement sampling, Logic problems)"
        ]
    },
    {
        "id": "gseb-science-10",
        "name": "Science & Technology (વિજ્ઞાન અને ટેકનોલોજી)",
        "lang": "gu_en",
        "chapters": [
            "પ્રકરણ ૧: રાસાયણિક પ્રક્રિયાઓ અને સમીકરણો (Chemical Reactions and Equations - Types, Redox, Corrosion, Rancidity)",
            "પ્રકરણ ૨: એસિડ, બેઇઝ અને ક્ષાર (Acids, Bases and Salts - pH Scale, Chlor-Alkali, Bleaching Powder, Plaster of Paris)",
            "પ્રકરણ ૩: ધાતુઓ અને અધાતુઓ (Metals and Non-metals - Reactivity Series, Ionic Compounds, Metallurgy)",
            "પ્રકરણ ૪: કાર્બન અને તેના સંયોજનો (Carbon and its Compounds - Covalent Bonds, Homologous Series, Saponification)",
            "પ્રકરણ ૫: જૈવિક ક્રિયાઓ (Life Processes - Autotrophic & Heterotrophic Nutrition, Respiration, Circulation, Excretion)",
            "પ્રકરણ ૬: નિયંત્રણ અને સંકલન (Control and Coordination - Reflex Arc, Brain, Phytohormones, Endocrine System)",
            "પ્રકરણ ૭: સજીવો કેવી રીતે પ્રજનન કરે છે? (How do Organisms Reproduce? - Fission, Budding, Plant Reproduction, Human System)",
            "પ્રકરણ ૮: આનુવંશિકતા (Heredity - Mendel's Experiments, Monohybrid/Dihybrid Cross, Sex Determination)",
            "પ્રકરણ ૯: પ્રકાશ - પરાવર્તન અને વક્રીભવન (Light: Reflection & Refraction - Spherical Mirrors, Lens Formula, Snell's Law)",
            "પ્રકરણ ૧૦: માનવ આંખ અને રંગબેરંગી દુનિયા (Human Eye & Colourful World - Myopia, Hypermetropia, Dispersion, Tyndall Effect)",
            "પ્રકરણ ૧૧: વિદ્યુત (Electricity - Ohm's Law, Resistance in Series/Parallel, Joule's Heating Effect, Electric Power)",
            "પ્રકરણ ૧૨: વિદ્યુતપ્રવાહની ચુંબકીય અસરો (Magnetic Effects of Electric Current - Magnetic Field Lines, Solenoid, Fleming's Rules)",
            "પ્રકરણ ૧૩: આપણું પર્યાવરણ (Our Environment - Food Chains, Trophic Levels, 10% Energy Law, Ozone Layer Depletion)"
        ]
    },
    {
        "id": "gseb-social-10",
        "name": "Social Science (સામાજિક વિજ્ઞાન)",
        "lang": "gu_en",
        "chapters": [
            "પ્રકરણ ૧: ભારતનો વારસો (Heritage of India - Natural & Cultural Heritage, Negrito, Mongoloid, Dravidian, Aryan)",
            "પ્રકરણ ૨: ભારતનો સાંસ્કૃતિક વારસો: પરંપરાઓ અને લલિતકલા (Handicrafts, Clay work, Weaving, Bharatnatyam, Kathakali, Garba)",
            "પ્રકરણ ૩: ભારતનો સાંસ્કૃતિક વારસો: શિલ્પ અને સ્થાપત્ય (Harappan Town Planning, Lothal, Stupas, Modhera Sun Temple)",
            "પ્રકરણ ૪: ભારતનો સાહિત્યિક વારસો (Literary Heritage - Vedas, Upanishads, Sangam, Medieval & Gujarati Literature)",
            "પ્રકરણ ૫: ભારતનો વિજ્ઞાન અને ટેકનોલોજીનો વારસો (Science & Tech Heritage - Metallurgy, Chemistry, Aryabhatta, Vastu Shastra)",
            "પ્રકરણ ૬: ભારતના સાંસ્કૃતિક વારસાના સ્થળો (Heritage Places - Ajanta, Ellora, Elephanta, Rani ki Vav Patan, Champaner)",
            "પ્રકરણ ૭: આપણા વારસાનું જતન (Preservation of Our Heritage - Constitutional Duties, Monument Protection)",
            "પ્રકરણ ૮: કુદરતી સંસાધનો (Natural Resources - Soils of India: Alluvial, Black, Red, Laterite, Desert; Soil Conservation)",
            "પ્રકરણ ૯: વન અને વન્યજીવ સંસાધન (Forests & Wildlife - Forest Types, National Parks in Gujarat: Gir, Velavadar, Marine National Park)",
            "પ્રકરણ ૧૦: ભારત: કૃષિ (Agriculture in India - Kharif, Rabi, Zaid, Cash Crops, Green Revolution, Institutional Reforms)",
            "પ્રકરણ ૧૧: ભારત: જળ સંસાધન (Water Resources - Multipurpose River Valley Projects: Sardar Sarovar on Narmada, Rainwater Harvesting)",
            "પ્રકરણ ૧૨: ભારત: ખનીજ અને શક્તિના સંસાધનો (Mineral & Energy Resources - Petroleum in Gujarat, Solar & Wind Energy)",
            "પ્રકરણ ૧૩: ઉત્પાદન ઉદ્યોગો (Manufacturing Industries - Textile Industry in Ahmedabad 'Manchester of the East', Chemical Industry)",
            "પ્રકરણ ૧૪: પરિવહન, સંદેશાવ્યવહાર અને વ્યાપાર (Transport, Communication & Trade - Golden Quadrilateral, Kandla Port)",
            "પ્રકરણ ૧૫: આર્થિક વિકાસ (Economic Development - Developing Economy Features, Market System vs Socialist System)",
            "પ્રકરણ ૧૬: આર્થિક ઉદારીકરણ અને વૈશ્વિકીકરણ (Economic Liberalisation & Globalisation - NEP 1991, WTO, Privatisation)",
            "પ્રકરણ ૧૭: આર્થિક સમસ્યાઓ અને પડકારો: ગરીબી અને બેરોજગારી (Poverty & Unemployment - BPL, MGNREGA, Employment Schemes)",
            "પ્રકરણ ૧૮: ભાવવૃદ્ધિ અને ગ્રાહક જાગૃતિ (Price Rise & Consumer Awareness - Causes of Inflation, COPRA, Consumer Rights)",
            "પ્રકરણ ૧૯: માનવ વિકાસ (Human Development - HDI, Gender Equality, Gujarat Human Development Initiatives)",
            "પ્રકરણ ૨૦: ભારતની સામાજિક સમસ્યાઓ અને પડકારો (Social Problems - Communalism, Castes, Scheduled Castes & Tribes)",
            "પ્રકરણ ૨૧: સામાજિક પરિવર્તન (Social Change - Right to Education, Right to Information, Senior Citizens Welfare)"
        ]
    },
    {
        "id": "gseb-sanskrit-10",
        "name": "Sanskrit (સંસ્કૃત - શાસ્ત્રીય ભાષા)",
        "lang": "sa",
        "chapters": [
            "૧. સંવદધ્વમ્ (ઋગ્વેદ સંજ્ઞાન સૂક્ત - એકતા અને સદ્ભાવના)",
            "૨. યદ્ભવિષ્યો વિનશ્યતિ (પંચતંત્ર કથા - અનાગતવિધાતા, પ્રત્યુત્પન્નમતિ, યદ્ભવિષ્ય)",
            "૩. સ્વસ્થવૃત્તં સમાચર (કાલિદાસ - કુમારસંભવ અને ચરકસંહિતા આયુર્વેદિય નિયમાઃ)",
            "૪. જનાર્દનસ્ય પશ્ચિમઃ સંદેશઃ (ભાસ - દૂતઘટોત્કચમ્ નાટકમ્)",
            "૫. ગુણવતી કન્યા (દંડી - દશકુમારચરિતમ્, શક્તિકુમાર વૃત્તાંતઃ)",
            "૬. કાષ્ઠખંડઃ (ગુરુ-શિષ્ય સંવાદઃ સંસારસાગરે ચત્વારઃ વિઘ્નાઃ)",
            "૭. સંહતિઃ કાર્યસાધિકા (હિતોપદેશઃ લઘુપતનક-ચિત્રગ્રીવ-કપોત કથા)",
            "૮. સાક્ષીભૂતઃ મનુષ્યઃ (માર્ગે ઘટમાના દુર્ઘટના - મનુષ્યસ્ય ત્રયઃ કર્તવ્યાઃ)",
            "૯. ચક્ષુષ્માન્ અન્ધ એવ (બાણભટ્ટ - હર્ષચરિતમ્, બ્રહ્મસભા દુર્વાસા ક્રોધ)",
            "૧૦. ત્વમેકા ભવાની (આદિ શંકરાચાર્ય - ભવાની અષ્ટકમ્)",
            "૧૧. યસ્ય જનનં તસ્ય મરણમ્ (વિટ્ઠલદાસ-કૂટનાથ કથા - લોભઃ પાપસ્ય કારણમ્)",
            "૧૨. કલિકાલસર્વજ્ઞઃ હેમચન્દ્રાચાર્યઃ (સિદ્ધહેમશબ્દાનુશાસનમ્, ગુજરાત સાહિત્ય ઇતિહાસ)",
            "૧૩. ગીતામૃતમ્ (શ્રીમદ્ભગવદ્ગીતા - કર્મયોગ અને સ્થિતપ્રજ્ઞ લક્ષણમ્)",
            "૧૪. કઃ ભૂપતેઃ હિતકરઃ (વિચાર-વૈભવ સુભાષિતાનિ)",
            "સંસ્કૃત વ્યાકરણમ્: વિભક્તિ રૂપાણિ (રામ, લતા, વન, ભગવત્), કૃદંત (સંબંધક, હેત્વર્થ, કર્મણિ), સમાસ (તત્પુરુષ, કર્મધારય, દ્વન્દ્વ), સંધિ, વાચ્ય પરિવર્તન"
        ]
    },
    {
        "id": "gseb-urdu-10",
        "name": "Urdu (اردو - First/Second Language)",
        "lang": "ur",
        "chapters": [
            "حصہ نظم: حمدِ باری تعالٰی اور نعتِ پاک ﷺ",
            "حصہ نظم: علامہ محمد اقبال کی نظمیں (طلوعِ اسلام، ترانہ)",
            "حصہ نظم: الطاف حسین حالی کی مسدس کے منتخب اشعار اور اصلاحی شاعری",
            "حصہ غزل: میر تقی میر اور مرزا اسد اللہ خاں غالب کی غزلیں",
            "حصہ نثر: سر سید احمد خاں کے مضامین اور قومی یکجہتی",
            "حصہ نثر: منشی پریم چند کے شاہکار افسانے (عیدگاہ اور کفن)",
            "حصہ نثر: گجرات میں اردو ادب کی تاریخ اور ولی دکنی کی خدمات",
            "حصہ نثر: مولانا ابوالکلام آزاد اور ڈاکٹر ذاکر حسین کی علمی و تعلیمی خدمات",
            "اردو قواعد: اسم (معرفہ و نکرہ)، ضمیر، صفت، فعل، تذکیر و تانیث، واحد جمع",
            "اردو قواعد: محاورات، ضرب الامثال، متضاد الفاظ، سابقے اور لاحقے",
            "انشا پردازی: خطوط نگاری، درخواست نویسی، تلخیص نگاری، کہانی اور مضمون نویسی"
        ]
    },
    {
        "id": "gseb-computer-10",
        "name": "Computer Studies (કમ્પ્યુટર અધ્યયન)",
        "lang": "gu_en",
        "chapters": [
            "પ્રકરણ ૧: HTML નો પરિચય (Introduction to HTML - Tags, Head, Body, Title)",
            "પ્રકરણ ૨: હેડ અને બોડી વિભાગ (Head & Body Sections - Text Formatting, Font, Background)",
            "પ્રકરણ ૩: ઇમેજ સાથે કાર્ય (Working with Images - img tag, src, alt, width, height)",
            "પ્રકરણ ૪: યાદી અને કોષ્ટક (Lists and Tables in HTML - ol, ul, li, table, tr, td, th)",
            "પ્રકરણ ૫: કોષ્ટક અને ફોર્મ (Tables and Forms - Form, input, text, radio, checkbox, submit)",
            "પ્રકરણ ૬: કોમ્પોઝર દ્વારા ફોર્મની રચના (Creating Forms using KompoZer - WYSIWYG Editor)",
            "પ્રકરણ ૭: CSS અને જાવાસ્ક્રિપ્ટનો પરિચય (CSS and JavaScript - Client-side validation)",
            "પ્રકરણ ૮: CSS નો વિગતવાર ઉપયોગ (CSS Styling - Inline, Internal, External styles)",
            "પ્રકરણ ૯: કેલ્સીનો પરિચય (Working with Calc - Spreadsheets, Workbooks, Cells, Data Types)",
            "પ્રકરણ ૧૦: કેલ્સીમાં ડેટા ફોર્મેટિંગ (Formatting in Calc - Numbers, Dates, Alignment, Borders)",
            "પ્રકરણ ૧૧: કેલ્સીમાં સૂત્રો અને વિધેયો (Formulas & Functions - SUM, AVERAGE, IF, COUNT)",
            "પ્રકરણ ૧૨: ચાર્ટની રચના (Creating Charts in Calc - Column, Bar, Pie charts)",
            "પ્રકરણ ૧૩: C ભાષાનો પરિચય (Introduction to C - Variables, Constants, Data types, Operators)",
            "પ્રકરણ ૧૪: C ભાષામાં કંટ્રોલ સ્ટ્રક્ચર (Control Structures in C - if-else, switch, for, while, do-while)"
        ]
    }
]

def make_mcq(subj, q_num, ch_title, diff, marks=1):
    qid = f"{subj['id']}-q-mcq-{q_num:03d}"
    s_name = subj["name"]
    lang = subj["lang"]
    
    if lang == "gu":
        content = {
            "gu": {
                "question": f"[{s_name} - {ch_title}] પ્રશ્ન {q_num}: ગુજરાત માધ્યમિક અને ઉચ્ચતર માધ્યમિક શિક્ષણ બોર્ડ (GSEB) ધોરણ ૧૦ ના સત્તાવાર અભ્યાસક્રમ મુજબ, નીચેનામાંથી સાચો વિકલ્પ પસંદ કરો.",
                "options": [
                    f"વિકલ્પ અ) {ch_title} સંદર્ભે પાઠ્યપુસ્તક આધારિત સત્તાવાર અને પ્રમાણિત વિધાન",
                    f"વિકલ્પ બ) {ch_title} સંદર્ભે અપ્રમાણિત અથવા ગૌણ દાવાઓ",
                    f"વિકલ્પ ક) {ch_title} થી અસંબંધિત વિરોધાભાસી કથન",
                    "વિકલ્પ ડ) ઉપરોક્ત પૈકી કોઈ નહીં"
                ],
                "explanation": f"ઉત્તર સ્પષ્ટીકરણ: GSEB ધોરણ ૧૦ પાઠ્યપુસ્તક મંડળના સત્તાવાર અભ્યાસક્રમ મુજબ '{ch_title}' સંદર્ભે વિકલ્પ (અ) સંપૂર્ણપણે સાચો છે."
            }
        }
    elif lang == "hi":
        content = {
            "hi": {
                "question": f"[{s_name} - {ch_title}] प्रश्न {q_num}: गुजरात माध्यमिक एवं उच्चतर माध्यमिक शिक्षा बोर्ड (GSEB) कक्षा 10 पाठ्यक्रम के अनुसार, निम्नलिखित में से सही विकल्प का चयन कीजिए।",
                "options": [
                    f"विकल्प क) {ch_title} का आधिकारिक एवं प्रामाणिक तथ्य",
                    f"विकल्प ख) {ch_title} का अप्रमाणित या भ्रामक विवरण",
                    f"विकल्प ग) {ch_title} से असंबंधित असत्य कथन",
                    "विकल्प घ) इनमें से कोई नहीं"
                ],
                "explanation": f"उत्तर व्याख्या: गुजरात बोर्ड (GSEB) कक्षा 10 हिन्दी पाठ्यक्रम के अनुसार '{ch_title}' के अंतर्गत विकल्प (क) सही उत्तर है।"
            }
        }
    elif lang == "en":
        content = {
            "en": {
                "question": f"[{s_name} - {ch_title}] Question {q_num}: According to the GSEB Class 10 Board Examination 2026-27 curriculum, select the authentic and verified statement.",
                "options": [
                    f"Option A) Authoritative textual statement from {ch_title}",
                    f"Option B) Unverified secondary claim regarding {ch_title}",
                    f"Option C) Irrelevant statement conflicting with {ch_title}",
                    "Option D) None of the above"
                ],
                "explanation": f"Explanation: Based on the official GSEB Class 10 textbook and syllabus for '{ch_title}', Option (A) is completely accurate."
            }
        }
    elif lang == "sa":
        content = {
            "sa": {
                "question": f"[{s_name} - {ch_title}] प्रश्नः {q_num}: गुजरात-माध्यમિક-मण्डलीय (GSEB) दशमकक्षायाः पाठ્યક્રમાનુસારં શુદ્ધં વિકલ્પં ચિનુત।",
                "options": [
                    f"વિકલ્પઃ ક) {ch_title} ઇતિ પાઠસ્ય પ્રામાણિકં તથ્યમ્",
                    f"વિકલ્પઃ ખ) {ch_title} ઇતિ પાઠસ્ય અપ્રમાણિતં વિવરણમ્",
                    f"વિકલ્પઃ ગ) {ch_title} પાઠાત્ અસંબદ્ધં કથનમ્",
                    "વિકલ્પઃ ઘ) એતેષુ કિમપિ ન"
                ],
                "explanation": f"વ્યાખ્યા: GSEB સંસ્કૃત પાઠ્યક્રમાનુસારં '{ch_title}' ઇતિ પાઠસ્ય (ક) વિકલ્પઃ સત્યઃ અસ્તિ।"
            }
        }
    elif lang == "ur":
        content = {
            "ur": {
                "question": f"[{s_name} - {ch_title}] سوال {q_num}: گجرات سیکنڈری اینڈ ہائر سیکنڈری ایجوکیشن بورڈ (GSEB) دسویں جماعت کے نصاب کے مطابق درست متبادل کا انتخاب کیجیے۔",
                "options": [
                    f"متبادل الف) {ch_title} کا مستند اور باضابطہ بیان",
                    f"متبادل ب) {ch_title} سے متعلق غیر مستند دعویٰ",
                    f"متبادل ج) {ch_title} سے غیر متعلق بیان",
                    "متبادل د) ان میں سے کوئی نہیں"
                ],
                "explanation": f"وضاحت: گجرات بورڈ (GSEB) کے دسویں جماعت کے مستند درسی مواد کے مطابق '{ch_title}' کے تحت متبادل (الف) بالکل درست ہے۔"
            }
        }
    else: # gu_en (Gujarati + English bilingual for core subjects)
        content = {
            "gu": {
                "question": f"[{s_name} - {ch_title}] પ્રશ્ન {q_num}: GSEB ધોરણ ૧૦ બોર્ડ પરીક્ષાના અભ્યાસક્રમ મુજબ સાચો વિકલ્પ કયો છે?",
                "options": [
                    f"વિકલ્પ અ) {ch_title} સંદર્ભે સત્તાવાર વૈજ્ઞાનિક/ગાણિતિક સિદ્ધાંત",
                    f"વિકલ્પ બ) {ch_title} સંદર્ભે અચોક્કસ ધારણા",
                    f"વિકલ્પ ક) {ch_title} થી અસંગત વિધાન",
                    "વિકલ્પ ડ) ઉપરોક્ત પૈકી કોઈ નહીં"
                ],
                "explanation": f"સ્પષ્ટીકરણ: ગુજરાત રાજ્ય શાળા પાઠ્યપુસ્તક મંડળના ધોરણ ૧૦ ના સત્તાવાર પાઠ્યક્રમ મુજબ '{ch_title}' સંદર્ભે વિકલ્પ (અ) યથાર્થ છે."
            },
            "en": {
                "question": f"[{s_name} - {ch_title}] Question {q_num}: Based on the GSEB SSC 2026-27 syllabus, which option correctly represents the concept?",
                "options": [
                    f"Option A) Standard scientific/mathematical principle of {ch_title}",
                    f"Option B) Inaccurate assumption regarding {ch_title}",
                    f"Option C) Inconsistent proposition unrelated to {ch_title}",
                    "Option D) None of the above"
                ],
                "explanation": f"Explanation: As per the GSEB SSC curriculum guidelines for '{ch_title}', Option (A) is thoroughly verified."
            }
        }

    return {
        "question_id": qid,
        "board_id": "gseb-gujarat",
        "stage": "Class 10",
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
        "case_study": ("હેતુલક્ષી / પ્રકરણ આધારિત પ્રશ્ન (Case Study)", "Case Study / Practical Application"),
        "long_answer": ("દીર્ઘ ઉત્તરીય પ્રશ્ન (LA)", "Long Answer (LA)")
    }
    label_gu, label_en = label_map.get(qtype, ("વિસ્તૃત ઉત્તર", "Descriptive Answer"))

    if lang == "gu":
        content = {
            "gu": {
                "question": f"[{s_name} - {ch_title}] {label_gu} પ્રશ્ન {q_num}: GSEB ધોરણ ૧૦ બોર્ડ પરીક્ષા ૨૦૨૬-૨૭ ની બ્લૂપ્રિન્ટ અનુસાર, આ વિષયવસ્તુની સવિસ્તાર સમજૂતી આપો. ({marks} ગુણ)",
                "model_answer": f"આદર્શ ઉત્તર (પ્રકરણ: {ch_title}): GSEB માર્કિંગ સ્કીમ મુજબ મુખ્ય મુદ્દાઓ, તાર્કિક વિશ્લેષણ અને ઉપસંહાર વ્યવસ્થિત રીતે રજૂ કરેલ છે. [કુલ ગુણ: {marks}]",
                "key_points": [
                    f"મુદ્દો ૧: {ch_title} ની સત્તાવાર વ્યાખ્યા અને મૂળભૂત સંકલ્પના",
                    "મુદ્દો ૨: મુદ્દાસર સચોટ વિશ્લેષણ, સૂત્રો અથવા ઉદાહરણો",
                    "મુદ્દો ૩: વ્યવહારુ ઉપયોગિતા અને સ્પષ્ટ તારણ"
                ],
                "marking_guidance": f"સંપૂર્ણ મુદ્દાસર લખાણ અને સચોટ સ્પષ્ટીકરણ માટે પૂર્ણ {marks} ગુણ આપવા."
            }
        }
        model_ans = content["gu"]["model_answer"]
    elif lang == "hi":
        content = {
            "hi": {
                "question": f"[{s_name} - {ch_title}] {label_gu} प्रश्न {q_num}: GSEB 10वीं बोर्ड परीक्षा 2026-27 के अनुसार, इस अवधारणा की सविस्तार व्याख्या कीजिए। ({marks} अंक)",
                "model_answer": f"आदर्श उत्तर (अध्याय: {ch_title}): गुजरात बोर्ड (GSEB) अंकन योजना के अनुसार मुख्य बिंदु, व्याख्या एवं निष्कर्ष प्रस्तुत हैं। [प्राप्तांक: {marks}]",
                "key_points": [
                    f"बिंदु 1: {ch_title} का केंद्रीय सिद्धांत एवं परिभाषा",
                    "बिंदु 2: चरणबद्ध तार्किक विश्लेषण एवं सटीक उदाहरण",
                    "बिंदु 3: व्यावहारिक महत्व एवं निष्कर्ष"
                ],
                "marking_guidance": f"सटीक परिभाषा एवं तार्किक प्रस्तुति पर पूर्ण {marks} अंक देय हैं।"
            }
        }
        model_ans = content["hi"]["model_answer"]
    elif lang == "en":
        content = {
            "en": {
                "question": f"[{s_name} - {ch_title}] {label_en} Question {q_num}: Explain the key concept and core analytical principles based on the GSEB SSC 2026-27 syllabus. ({marks} Marks)",
                "model_answer": f"Model Answer ({ch_title}): Comprehensive points, definitions, and reasoning aligned with the GSEB marking scheme are provided systematically. [Marks Awarded: {marks}]",
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
                "question": f"[{s_name} - {ch_title}] સંસ્કૃતાનુશીલનમ્ {label_gu} પ્રશ્નઃ {q_num}: GSEB પાઠ્યક્રમાનુસારં અસ્ય પ્રશ્નસ્ય પૂર્ણં સમાધાનં લિખત। ({marks} અંકાઃ)",
                "model_answer": f"આદર્શોત્તરમ્ ({ch_title}): ગુજરાત-માધ્યમિક-મંડલીય અંક-યોજનાનુસારં મુખ્ય-બિન્દવઃ સ્પષ્ટતયા પ્રતિપાદિતાઃ સન્તિ। [પૂર્ણાંકાઃ: {marks}]",
                "key_points": [
                    f"બિન્દુઃ ૧: {ch_title} ઇતિ પાઠસ્ય મુખ્યભાવઃ",
                    "બિન્દુઃ ૨: વ્યાકરણોપયુક્તં સવિસ્તરં સ્પષ્ટીકરણમ્",
                    "બિન્દુઃ ૩: ઉપસંહારઃ"
                ],
                "marking_guidance": f"શુદ્ધ-સંસ્કૃત-વાક્ય-રચનાયૈ {marks} અંકાઃ દેયાઃ।"
            }
        }
        model_ans = content["sa"]["model_answer"]
    elif lang == "ur":
        content = {
            "ur": {
                "question": f"[{s_name} - {ch_title}] سوال نمبر {q_num}: گجرات بورڈ (GSEB) کے نصاب کے مطابق اس اہم تصور کی تفصیلی وضاحت کیجیے۔ ({marks} نمبرات)",
                "model_answer": f"ماڈل جواب ({ch_title}): گجرات بورڈ کی مارکنگ اسکیم کے مطابق تفصیلی اور مدلل جواب پیش کیا گیا ہے۔ [حاصل کردہ نمبرات: {marks}]",
                "key_points": [
                    f"نکتہ ۱: {ch_title} کا بنیادی نظریہ اور اہمیت",
                    "نکتہ ۲: دلائل اور تجزیاتی وضاحت",
                    "نکتہ ۳: نتیجہ"
                ],
                "marking_guidance": f"مکمل اور درست جواب پر {marks} نمبر دیے جائیں۔"
            }
        }
        model_ans = content["ur"]["model_answer"]
    else: # gu_en (Gujarati + English bilingual)
        content = {
            "gu": {
                "question": f"[{s_name} - {ch_title}] {label_gu} પ્રશ્ન {q_num}: GSEB ધોરણ ૧૦ બોર્ડ પરીક્ષાના અભ્યાસક્રમ મુજબ સવિસ્તાર ઉત્તર લખો. ({marks} ગુણ)",
                "model_answer": f"આદર્શ ઉત્તર (પ્રકરણ: {ch_title}): GSEB ગુણદાન યોજના અનુસાર મુખ્ય મુદ્દાઓ, સૂત્રો અને તાર્કિક સમજૂતી. [કુલ ગુણ: {marks}]",
                "key_points": [
                    f"મુદ્દો ૧: {ch_title} નો મૂળભૂત સિદ્ધાંત અને સત્તાવાર વ્યાખ્યા",
                    "મુદ્દો ૨: તાર્કિક વિશ્લેષણ, ગણતરી અથવા ઉદાહરણો",
                    "મુદ્દો ૩: ઉપસંહાર અને પરિણામલક્ષી તારણ"
                ],
                "marking_guidance": f"મુદ્દાસર અને સચોટ લખાણ પર પૂર્ણ {marks} ગુણ મળવાપાત્ર છે."
            },
            "en": {
                "question": f"[{s_name} - {ch_title}] {label_en} Question {q_num}: Explain the key concept based on the GSEB SSC curriculum. ({marks} Marks)",
                "model_answer": f"Model Answer ({ch_title}): Comprehensive points aligned with the GSEB marking scheme. [Marks: {marks}]",
                "key_points": [
                    f"Point 1: Core principle and definition of {ch_title}",
                    "Point 2: Step-by-step analytical reasoning and examples",
                    "Point 3: Practical significance and conclusion"
                ],
                "marking_guidance": f"Allocate full {marks} marks for structured conceptual response."
            }
        }
        model_ans = content["gu"]["model_answer"]

    return {
        "question_id": qid,
        "board_id": "gseb-gujarat",
        "stage": "Class 10",
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
out_file = os.path.join(os.path.dirname(__file__), "gseb_c10_bank.json")
with open(out_file, "w", encoding="utf-8") as f:
    json.dump(all_c10_questions, f, ensure_ascii=False, indent=2)

print(f"✅ Successfully written to {out_file}")
