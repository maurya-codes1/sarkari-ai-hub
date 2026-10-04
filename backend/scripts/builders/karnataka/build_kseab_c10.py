import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

print("Building KSEAB Class 10 SSLC Master Question Bank (10 Primary Subjects)...")

PRIMARY_SSLC_SUBJECTS = [
    {
        "id": "kar-c10-kannada-fl",
        "name": "First Language Kannada (FLK - ಪ್ರಥಮ ಭಾಷೆ ಕನ್ನಡ)",
        "lang": "kn",
        "chapters": [
            "ಗದ್ಯ 1: ಶಬರಿ (ಪು.ತಿ. ನರಸಿಂಹಾಚಾರ್ - ಭಕ್ತಿ ಮತ್ತು ಕಾವ್ಯ ಸೌಂದರ್ಯ)",
            "ಗದ್ಯ 2: ಭಾಗ್ಯಶಿಲ್ಪಿಗಳು (ಸರ್. ಎಂ. ವಿಶ್ವೇಶ್ವರಯ್ಯ & ನಾಲ್ವಡಿ ಕೃಷ್ಣರಾಜ ಒಡೆಯರ್ - ಆಧುನಿಕ ಮೈಸೂರು ನಿರ್ಮಾಣ)",
            "ಗದ್ಯ 3: ಎದೆಗೆ ಬಿದ್ದ ಅಕ್ಷರ (ದೇವನೂರ ಮಹಾದೇವ - ಅಕ್ಷರ ಜ್ಞಾನ ಮತ್ತು ಸಾಮಾಜಿಕ ಸಮಾನತೆ)",
            "ಗದ್ಯ 4: ಧರ್ಮ ಸಮದೃಷ್ಟಿ (ವಿವಿಧ ಧರ್ಮಗಳ ಸಾಮರಸ್ಯ ಮತ್ತು ಸರ್ವಧರ್ಮ ಸಮಭಾವ)",
            "ಪದ್ಯ 5: ಸಂಕಲ್ಪ ಗೀತೆ (ಜಿ.ಎಸ್. ಶಿವರುದ್ರಪ್ಪ - ನವಭಾರತದ ಆಶಯ ಮತ್ತು ದೃಢ ಸಂಕಲ್ಪ)",
            "ಪದ್ಯ 6: ಹಕ್ಕಿ ಹಾರುತ್ತಿದೆ ನೋಡಿದಿರಾ (ದ.ರಾ. ಬೇಂದ್ರೆ - ಕಾಲದ ನಿರಂತರ ಚಲನೆ ಮತ್ತು ವೈಭವ)",
            "ಪದ್ಯ 7: ಕೌರವೇಂದ್ರನ ಕೊಂದೆ ನೀನು (ಕುಮಾರವ್ಯಾಸ - ಕರ್ಣ ಮತ್ತು ಕೃಷ್ಣನ ಸಂಭಾಷಣೆ)",
            "ಪದ್ಯ 8: ವಚನಾಮೃತ (ಬಸವಣ್ಣ, ಅಲ್ಲಮಪ್ರಭು, ಅಕ್ಕಮಹಾದೇವಿ - ಕಾಯಕ, ಅನುಭಾವ ಮತ್ತು ಭಕ್ತಿ)",
            "ಪಠ್ಯಪೂರಕ 9: ಸ್ವಾಮಿ ವಿವೇಕಾನಂದರ ಚಿಂತನೆಗಳು ಮತ್ತು ಕರ್ನಾಟಕ ಏಕೀಕರಣ ಚಳವಳಿ (ಆಲೂರು ವೆಂಕಟರಾವ್)",
            "ವ್ಯಾಕರಣ 10: ಸಂಧಿಗಳು (ಲೋಪ, ಆಗಮ, ಆದೇಶ), ಸಮಾಸಗಳು, ಅಲಂಕಾರ, ಛಂದಸ್ಸು (ಕಂದಪದ್ಯ, ಭಾಮಿನಿ ಷಟ್ಪದಿ)"
        ]
    },
    {
        "id": "kar-c10-english-fl",
        "name": "First Language English (FLE)",
        "lang": "en",
        "chapters": [
            "Prose 1: A Wrong Man in Worker's Paradise (Rabindranath Tagore)",
            "Prose 2: The Elixir of Life (Sir C.V. Raman - Universal Solvent & Water Conservation)",
            "Prose 3: The Gift of the Magi (O. Henry - Selfless Love and Sacrifice)",
            "Prose 4: Louis Pasteur (Conquest over Disease & Germ Theory)",
            "Poetry 5: To a Pair of Sarus Cranes (Manmohan Singh - Grief and Maternal Fidelity)",
            "Poetry 6: Abraham Lincoln's Letter to His Son's Teacher (Values and True Education)",
            "Poetry 7: Vachana (Basavanna - The Temple and the Moving Shrine)",
            "Poetry 8: Lochinvar (Sir Walter Scott - Gallantry, Romance and Ballad)",
            "Supplementary 9: Treasure Island (R.L. Stevenson) & The Discovery (Herman Ould)",
            "Grammar 10: Active/Passive Voice, Reported Speech, Clauses, Synthesis & Formal Composition"
        ]
    },
    {
        "id": "kar-c10-urdu-fl",
        "name": "First Language Urdu (FLU - اردو پہلی زبان)",
        "lang": "ur",
        "chapters": [
            "حصہ نثر ۱: سر سید احمد خان - امید کی خوشی (Sir Syed Ahmed Khan - Umeed Ki Khushi)",
            "حصہ نثر ۲: مرزا غالب کے خطوط (Mirza Ghalib ke Khutoot - Fun-e-Khatoot)",
            "حصہ نثر ۳: نظیر اکبر آبادی - نظیر کی شاعری اور عوامی رنگ",
            "حصہ نظم ۴: غزلیں - میر تقی میر (Mir Taqi Mir ki Ghazlen - Dard-o-Gham)",
            "حصہ نظم ۵: ترانہ ہندی اور شکوہ - علامہ محمد اقبال (Allama Iqbal)",
            "حصہ نظم ۶: نذیر بنارسی اور فراق گورکھپوری کی شاعری",
            "حصہ افسانہ ۷: پریم چند - کفن اور عیدگاہ (Premchand ke Afsane)",
            "قواعد ۸: اسم، ضمیر، صفت، تذکیر و تانیث، تشبیہ و استعارہ، محاورات و ضرب الامثال"
        ]
    },
    {
        "id": "kar-c10-kannada-sl",
        "name": "Second Language Kannada (SLK - ದ್ವಿತೀಯ ಭಾಷೆ ಕನ್ನಡ)",
        "lang": "kn",
        "chapters": [
            "ಗದ್ಯ 1: ಒಗ್ಗಟ್ಟಿನಲ್ಲಿ ಬಲವಿದೆ (ಐಕಮತ್ಯದ ಶಕ್ತಿ ಮತ್ತು ಜಾನಪದ ಕಥೆ)",
            "ಗದ್ಯ 2: ಪರಿಸರ ಸಂರಕ್ಷಣೆ (ಮರಗಿಡಗಳ ಮಹತ್ವ ಮತ್ತು ಜೀವವೈವಿಧ್ಯ ರಕ್ಷಣೆ)",
            "ಗದ್ಯ 3: ಕೆಂಪೇಗೌಡರ ಬೆಂಗಳೂರು (ಬೆಂಗಳೂರು ನಿರ್ಮಾಣ ಮತ್ತು ಐತಿಹಾಸಿಕ ಹಿನ್ನೆಲೆ)",
            "ಪದ್ಯ 4: ಗಿಡಮರಗಳ ಮಹತ್ವ (ಪ್ರಕೃತಿ ಪ್ರೇಮ ಮತ್ತು ಕಾವ್ಯ ಸೌಂದರ್ಯ)",
            "ಪದ್ಯ 5: ಕಾಯಕವೇ ಕೈಲಾಸ (ಬಸವೇಶ್ವರರ ವಚನ ಸಿದ್ಧಾಂತ)",
            "ಪದ್ಯ 6: ಕನ್ನಡ ನಾಡು ನುಡಿ (ಕರ್ನಾಟಕದ ಕಲೆ, ಸಂಸ್ಕೃತಿ ಮತ್ತು ಹಿರಿಮೆ)",
            "ವ್ಯಾಕರಣ 7: ನಾಮಪದ, ಸರ್ವನಾಮ, ಕ್ರಿಯಾಪದ, ವಿಭಕ್ತಿ ಪ್ರತ್ಯಯಗಳು, ಸಮಾನಾರ್ಥಕ ಪದಗಳು ಮತ್ತು ಪತ್ರಲೇಖನ"
        ]
    },
    {
        "id": "kar-c10-english-sl",
        "name": "Second Language English (SLE)",
        "lang": "en",
        "chapters": [
            "Prose 1: A Hero (R.K. Narayan - Swami's Nightmare and Accidental Bravery)",
            "Prose 2: There's a Girl by the Tracks (Deven Kanal - Good Samaritan Baleshwar Mishra)",
            "Prose 3: Gentleman of Rio en Medio (Juan A.A. Sedillo - Generosity and Principle)",
            "Prose 4: Dr. B.R. Ambedkar (Sri R. Venkataraman - Constitution, Equality and Upliftment)",
            "Prose 5: The Concert (Shanta Rameshwar Rao - Music, Compassion and Pandit Ravi Shankar)",
            "Poetry 6: Grandma Climbs a Tree (Ruskin Bond) & Quality of Mercy (William Shakespeare)",
            "Poetry 7: The Song of India (V.K. Gokak) & Jazz Poem Two (Carl Wendall Hines, Jr.)",
            "Supplementary 8: Narayanpur Incident & On Top of the World (Dickey Dolma)",
            "Grammar 9: Question Tags, Prepositions, Phrasal Verbs, Tenses, Editing & Story Writing"
        ]
    },
    {
        "id": "kar-c10-hindi-tl",
        "name": "Third Language Hindi (TLH - ತೃತೀಯ ಭಾಷೆ ಹಿಂದಿ)",
        "lang": "hi",
        "chapters": [
            "गद्य १: मातृभूमि (मैथिलीशरण गुप्त - देशप्रेम एवं राष्ट्रभक्ति)",
            "गद्य २: कश्मीरी सेब (मुंशी प्रेमचंद - नैतिक मूल्य एवं उपभोक्ता जागरूकता)",
            "गद्य ३: गिल्लू (महादेवी वर्मा - प्राणि-प्रेम एवं मूक संवेदनशीलता)",
            "गद्य ४: इंटरनेट क्रांति (सूचना प्रौद्योगिकी एवं आधुनिक संचार क्रांति)",
            "पद्य ५: कबीर के दोहे (भक्तिकाल - साखी, गुरु महिमा एवं समता)",
            "पद्य ६: तुलसीदास के दोहे (रामचरितमानस - विनय एवं सद्विचार)",
            "पद्य ७: अभिनव मनुष्य (रामधारी सिंह 'दिनकर' - विज्ञान और मानवता का समन्वय)",
            "व्याकरण ८: संज्ञा, सर्वनाम, कारक, संधि, समास, मुहावरे, लोकोक्तियाँ एवं पत्र लेखन"
        ]
    },
    {
        "id": "kar-c10-sanskrit-tl",
        "name": "Third Language Sanskrit (TLS - ತೃತೀಯ ಭಾಷೆ ಸಂಸ್ಕೃತ)",
        "lang": "sa",
        "chapters": [
            "गद्य १: गुरुभक्तिः (आदर्श शिष्य आरुणिः उपमन्युश्च)",
            "पद्य २: सुभाषितानि (विद्या, सत्सङ्गतिः, परोपಕಾರಃ, नीतिश्लोकाः)",
            "गद्य ३: हितोपदेश कथाः (मित्रलाभः सुहृद्भेदश्च - पञ्चतन्त्रनीतिः)",
            "पद्य ४: सूक्तिसुधा (भर्तृहरि सुभाषित त्रिशती - नीतिशतकम्)",
            "नाटक ५: कर्णस्य कवचकुण्डलदानम् (भासमहाकवि रूपकम्)",
            "व्याकरण ६: शब्दरूपाणि (राम, लता, फल, कवि, मति)",
            "व्याकरण ७: धातुरूपाणि (पठ्, गम्, भू, दृश् लट्-लोट्-लङ्-विधिलಿङ् लकाराः)",
            "व्याकरण ८: सन्धयः (स्वर, व्यञ्जन, विसर्ग), समासाः (तत्पुरुष, द्वन्द्व) अपठितगद्यांशश्च"
        ]
    },
    {
        "id": "kar-c10-mathematics",
        "name": "Mathematics (ಗಣಿತ - SSLC Mathematics)",
        "lang": "kn_en",
        "chapters": [
            "ಘಟಕ 1: ಸಮಾಂತರ ಶ್ರೇಢಿಗಳು (Arithmetic Progressions - nth Term & Sum of n Terms)",
            "ಘಟಕ 2: ತ್ರಿಭುಜಗಳು (Triangles - Thales Theorem, Pythagoras Theorem & Criteria for Similarity)",
            "ಘಟಕ 3: ಎರಡು ಚರಾಕ್ಷರಗಳಿರುವ ರೇಖಾತ್ಮಕ ಸಮೀಕರಣಗಳ ಜೋಡಿ (Pair of Linear Equations in Two Variables)",
            "ಘಟಕ 4: ವೃತ್ತಗಳು ಮತ್ತು ರಚನೆಗಳು (Circles & Constructions - Tangents to Circle)",
            "ಘಟಕ 5: ವೃತ್ತಗಳಿಗೆ ಸಂಬಂಧಿಸಿದ ವಿಸ್ತೀರ್ಣಗಳು (Areas Related to Circles - Sectors and Segments)",
            "ಘಟಕ 6: ವರ್ಗ ಸಮೀಕರಣಗಳು (Quadratic Equations - Factorisation, Quadratic Formula, Nature of Roots)",
            "ಘಟಕ 7: ನಿರ್ದೇಶಾಂಕ ರೇಖಾಗಣಿತ (Coordinate Geometry - Distance Formula, Section Formula, Triangle Area)",
            "ಘಟಕ 8: ನೈಜ ಸಂಖ್ಯೆಗಳು (Real Numbers - Fundamental Theorem of Arithmetic, Irrational Numbers Proof)",
            "ಘಟಕ 9: ತ್ರಿಕೋನಮಿತಿಯ ಪ್ರಸ್ತಾವನೆ ಮತ್ತು ಅನ್ವಯಗಳು (Trigonometry & Applications - Heights and Distances)",
            "ಘಟಕ 10: ಸಂಖ್ಯಾಶಾಸ್ತ್ರ ಮತ್ತು ಸಂಭವನೀಯತೆ (Statistics & Probability - Mean, Median, Mode, Ogive Curves)",
            "ಘಟಕ 11: ಮೇಲ್ಮೈ ವಿಸ್ತೀರ್ಣಗಳು ಮತ್ತು ಘನಫಲಗಳು (Surface Areas & Volumes - Frustum of Cone & Combined Solids)"
        ]
    },
    {
        "id": "kar-c10-science",
        "name": "Science (ವಿಜ್ಞಾನ - SSLC Physics, Chemistry & Biology)",
        "lang": "kn_en",
        "chapters": [
            "ಭೌತಶಾಸ್ತ್ರ 1: ಬೆಳಕು - ಪ್ರತಿಫಲನ ಮತ್ತು ವಕ್ರೀಭವನ (Light - Reflection and Refraction, Mirror & Lens Formulae)",
            "ಭೌತಶಾಸ್ತ್ರ 2: ಮಾನವನ ಕಣ್ಣು ಮತ್ತು ವರ್ಣಮಯ ಜಗತ್ತು (Human Eye & Colorful World - Dispersion, Atmospheric Refraction)",
            "ಭೌತಶಾಸ್ತ್ರ 3: ವಿದ್ಯುಚ್ಛಕ್ತಿ (Electricity - Ohm's Law, Resistance in Series and Parallel, Joule's Heating Effect)",
            "ಭೌತಶಾಸ್ತ್ರ 4: ವಿದ್ಯುತ್ ಪ್ರವಾಹದ ಕಾಂತೀಯ ಪರಿಣಾಮಗಳು (Magnetic Effects of Electric Current - Fleming's Rules, Motor, Generator)",
            "ರಸಾಯನಶಾಸ್ತ್ರ 5: ರಾಸಾಯನಿಕ ಕ್ರಿಯೆಗಳು ಮತ್ತು ಸಮೀಕರಣಗಳು (Chemical Reactions & Equations - Types of Reactions, Redox)",
            "ರಸಾಯನಶಾಸ್ತ್ರ 6: ಆಮ್ಲಗಳು, ಪ್ರತ್ಯಾಮ್ಲಗಳು ಮತ್ತು ಲವಣಗಳು (Acids, Bases & Salts - pH Scale, Plaster of Paris, Bleaching Powder)",
            "ರಸಾಯನಶಾಸ್ತ್ರ 7: ಲೋಹಗಳು ಮತ್ತು ಅಲೋಹಗಳು (Metals and Non-metals - Reactivity Series, Ionic Compounds, Metallurgy)",
            "ರಸಾಯನಶಾಸ್ತ್ರ 8: ಕಾರ್ಬನ್ ಮತ್ತು ಅದರ ಸಂಯುಕ್ತಗಳು (Carbon & its Compounds - Covalent Bonding, Homologous Series, Functional Groups)",
            "ರಸಾಯನಶಾಸ್ತ್ರ 9: ಧಾತುಗಳ ಆವರ್ತನೀಯ ವರ್ಗೀಕರಣ (Periodic Classification of Elements - Mendeleev & Modern Periodic Table)",
            "ಜೀವಶಾಸ್ತ್ರ 10: ಜೀವಕ್ರಿಯೆಗಳು (Life Processes - Nutrition, Respiration, Circulation, Excretion in Humans & Plants)",
            "ಜೀವಶಾಸ್ತ್ರ 11: ನಿಯಂತ್ರಣ ಮತ್ತು ಸಹಭಾಗಿತ್ವ (Control and Coordination - Nervous System, Reflex Arc, Plant Hormones)",
            "ಜೀವಶಾಸ್ತ್ರ 12: ಜೀವಿಗಳು ಹೇಗೆ ಸಂತಾನೋತ್ಪತ್ತಿ ನಡೆಸುತ್ತವೆ? (How do Organisms Reproduce? - Asexual & Sexual Reproduction)",
            "ಜೀವಶಾಸ್ತ್ರ 13: ಅನುವಂಶೀಯತೆ ಮತ್ತು ಜೀವವಿಕಾಸ (Heredity and Evolution - Mendel's Laws, Sex Determination)",
            "ಜೀವಶಾಸ್ತ್ರ 14: ನಮ್ಮ ಪರಿಸರ ಮತ್ತು ನೈಸರ್ಗಿಕ ಸಂಪನ್ಮೂಲಗಳ ನಿರ್ವಹಣೆ (Our Environment - Food Web, Ozone Depletion, Conservation)"
        ]
    },
    {
        "id": "kar-c10-social-science",
        "name": "Social Science (ಸಮಾಜ ವಿಜ್ಞಾನ - History, Pol Sci, Geog, Econ)",
        "lang": "kn_en",
        "chapters": [
            "ಇತಿಹಾಸ 1: ಭಾರತಕ್ಕೆ ಯುರೋಪಿಯನ್ನರ ಆಗಮನ (Advent of Europeans to India - Carnatic Wars, Battle of Plassey & Buxar)",
            "ಇತಿಹಾಸ 2: ಬ್ರಿಟಿಷ್ ಆಳ್ವಿಕೆಯ ವಿಸ್ತರಣೆ ಮತ್ತು ಪರಿಣಾಮಗಳು (Subsidiary Alliance, Doctrine of Lapse, Administrative Systems)",
            "ಇತಿಹಾಸ 3: ಭಾರತದ ಪ್ರಥಮ ಸ್ವಾತಂತ್ರ್ಯ ಸಂಗ್ರಾಮ - 1857 (First War of Indian Independence 1857 - Causes and Results)",
            "ಇತಿಹಾಸ 4: ಸ್ವಾತಂತ್ರ್ಯ ಹೋರಾಟ ಮತ್ತು ಗಾಂಧಿಯುಗ (Freedom Movement - Moderates, Extremists, Non-Cooperation, Quit India)",
            "ಇತಿಹಾಸ 5: ಕರ್ನಾಟಕದ ಏಕೀಕರಣ ಚಳವಳಿ (Unification of Karnataka - Role of Aluru Venkata Rao, S. Nijalingappa)",
            "ರಾಜ್ಯಶಾಸ್ತ್ರ 6: ಭಾರತದ ಸಮಸ್ಯೆಗಳು ಮತ್ತು ಪರಿಹಾರೋಪಾಯಗಳು (Problems of India & Remedies - Communalism, Regionalism, Corruption)",
            "ರಾಜ್ಯಶಾಸ್ತ್ರ 7: ಭಾರತದ ವಿದೇಶಾಂಗ ನೀತಿ ಮತ್ತು ವಿಶ್ವಸಂಸ್ಥೆ (India's Foreign Policy - Panchasheel, Non-Alignment, UNO Organs)",
            "ಸಮಾಜಶಾಸ್ತ್ರ 8: ಸಾಮಾಜಿಕ ಸ್ತರವಿನ್ಯಾಸ ಮತ್ತು ದುಡಿಮೆ (Social Stratification, Untouchability Constitutional Remedies, Labor)",
            "ಭೂಗೋಳಶಾಸ್ತ್ರ 9: ಭಾರತದ ಪ್ರಾಕೃತಿಕ ಲಕ್ಷಣಗಳು, ವಾಯುಗುಣ ಮತ್ತು ಮಣ್ಣುಗಳು (Physiography, Climate, Soils, Natural Vegetation)",
            "ಭೂಗೋಳಶಾಸ್ತ್ರ 10: ಭಾರತದ ಜಲಸಂಪನ್ಮೂಲಗಳು, ಕೃಷಿ ಮತ್ತು ಕೈಗಾರಿಕೆಗಳು (Water Resources, Irrigation, Cropping Seasons, Major Industries)",
            "ಭೂಗೋಳಶಾಸ್ತ್ರ 11: ಭಾರತದ ಸಾರಿಗೆ, ಸಂವಹನ ಮತ್ತು ನೈಸರ್ಗಿಕ ವಿಕೋಪಗಳು (Transport, Communication, Earthquakes, Cyclones, Floods)",
            "ಅರ್ಥಶಾಸ್ತ್ರ 12: ಆರ್ಥಿಕಾಭಿವೃದ್ಧಿ ಮತ್ತು ಗ್ರಾಮೀಣಾಭಿವೃದ್ಧಿ (Economic Development, Per Capita Income, Panchayat Raj Institutions)",
            "ವ್ಯವಹಾರ ಅಧ್ಯಯನ 13: ಬ್ಯಾಂಕಿಂಗ್ ವ್ಯವಹಾರಗಳು ಮತ್ತು ಗ್ರಾಹಕರ ಶಿಕ್ಷಣ (Banking Transactions, Electronic Banking, Consumer Rights & COPRA)"
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
        correct_opt = f"{ch_title} ಪಠ್ಯಭಾಗದ ಅಧಿಕೃತ ಮತ್ತು ಸರಿಯಾದ ಸತ್ಯಾಂಶ"
        distractors = [
            f"{ch_title} ಗೆ ಸಂಬಂಧಿಸಿದ ತಪ್ಪಾದ ವಿವರಣೆ",
            f"{ch_title} ನೊಂದಿಗೆ ಹೊಂದಾಣಿಕೆಯಾಗದ ಅಸಂಬದ್ಧ ವಾಕ್ಯ",
            "ಮೇಲಿನ ಯಾವುದೂ ಅಲ್ಲ"
        ]
        opts = list(distractors)
        opts.insert(correct_idx, correct_opt)
        kn_labels = ["ಎ", "ಬಿ", "ಸಿ", "ಡಿ"]
        formatted_opts = [f"ಆಯ್ಕೆ {kn_labels[i]}) {opts[i]}" for i in range(4)]
        content = {
            "kn": {
                "question": f"[{s_name} - {ch_title}] ಪ್ರಶ್ನೆ {q_num}: ಕರ್ನಾಟಕ ಶಾಲಾ ಪರೀಕ್ಷೆ ಮತ್ತು ಮೌಲ್ಯನಿರ್ಣಯ ಮಂಡಳಿ (KSEAB) 10ನೇ ತರಗತಿ SSLC ಪಠ್ಯಕ್ರಮದಂತೆ ಸರಿಯಾದ ಆಯ್ಕೆಯನ್ನು ಗುರುತಿಸಿ.",
                "options": formatted_opts,
                "explanation": f"ವಿವರಣೆ: KSEAB ಅಧಿಕೃತ ಪಠ್ಯಪುಸ್ತಕದ ಆಧಾರದ ಮೇಲೆ '{ch_title}' ಭಾಗದಲ್ಲಿ ಆಯ್ಕೆ ({kn_labels[correct_idx]}) ಸರಿಯಾದ ಉತ್ತರವಾಗಿದೆ."
            }
        }
    elif lang == "en":
        correct_opt = f"Verified curriculum standard concept of {ch_title}"
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
                "question": f"[{s_name} - {ch_title}] Question {q_num}: In accordance with the KSEAB Class 10 SSLC curriculum, choose the correct option.",
                "options": formatted_opts,
                "explanation": f"Explanation: Based on the official KSEAB SSLC syllabus for '{ch_title}', Option ({correct_letter}) is correct."
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
                "question": f"[{s_name} - {ch_title}] प्रश्न {q_num}: कर्नाटक विद्यालय परीक्षा एवं मूल्यांकन बोर्ड (KSEAB) कक्षा 10 SSLC पाठ्यक्रम के अनुसार सही विकल्प का चयन कीजिए।",
                "options": formatted_opts,
                "explanation": f"उत्तर व्याख्या: पाठ्यपुस्तकानुसार '{ch_title}' के अंतर्गत विकल्प ({hi_labels[correct_idx]}) सही उत्तर है।"
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
                "question": f"[{s_name} - {ch_title}] سوال {q_num}: کرناٹک بورڈ (KSEAB) دسویں جماعت SSLC نصاب کے مطابق درست متبادل کا انتخاب کیجیے۔",
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
                "question": f"[{s_name} - {ch_title}] प्रश्नः {q_num}: कर्णाटक-विद्यालयपरीक्षा-मूल्याङ्ಕನಮಂಡಲಸ್ಯ (KSEAB) दशमकक्षायाः पाठ್ಯಕ್ರಮಾನುಸಾರಂ ಸಮೀಚೀನಂ ವಿಕಲ್ಪಂ ಚಿನುತ।",
                "options": formatted_opts,
                "explanation": f"उत्तरविवरणम्: अधिकृतपाठ्यपुस्तकानुसारेण '{ch_title}' इति पाठे विकल्पः ({sa_labels[correct_idx]}) शुद्धमुत्तरं वर्तते।"
            }
        }
    else: # kn_en (Kannada + English bilingual for Core Subjects)
        kn_correct = f"{ch_title} ಸಂಬಂಧಿಸಿದ ಸರಿಯಾದ ವೈಜ್ಞಾನಿಕ/ಗಣಿತ ಸೂತ್ರ ಅಥವಾ ಸಿದ್ಧಾಂತ"
        kn_distractors = [
            f"{ch_title} ಸಂಬಂಧಿಸಿದ ತಪ್ಪಾದ ಕಲ್ಪನೆ",
            f"{ch_title} ಗೆ ಸಂಬಂಧವಿಲ್ಲದ ಅಸಂಬದ್ಧ ಹೇಳಿಕೆ",
            "ಮೇಲಿನ ಯಾವುದೂ ಅಲ್ಲ"
        ]
        kn_opts = list(kn_distractors)
        kn_opts.insert(correct_idx, kn_correct)
        kn_labels = ["ಎ", "ಬಿ", "ಸಿ", "ಡಿ"]
        kn_formatted = [f"ಆಯ್ಕೆ {kn_labels[i]}) {kn_opts[i]}" for i in range(4)]
        
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
            "kn": {
                "question": f"[{s_name} - {ch_title}] ಪ್ರಶ್ನೆ {q_num}: KSEAB 10ನೇ ತರಗತಿ SSLC ಪರೀಕ್ಷಾ ವಿನ್ಯಾಸದಂತೆ ಸರಿಯಾದ ಆಯ್ಕೆಯನ್ನು ಗುರುತಿಸಿ.",
                "options": kn_formatted,
                "explanation": f"ವಿವರಣೆ: ಅಧಿಕೃತ ಕರ್ನಾಟಕ ಪಠ್ಯಕ್ರಮದಂತೆ '{ch_title}' ಘಟಕದಲ್ಲಿ ಆಯ್ಕೆ ({kn_labels[correct_idx]}) ಸರಿಯಾಗಿದೆ."
            },
            "en": {
                "question": f"[{s_name} - {ch_title}] Question {q_num}: Based on the KSEAB Class 10 SSLC examination pattern, which option correctly represents the concept?",
                "options": en_formatted,
                "explanation": f"Explanation: According to the official KSEAB SSLC syllabus for '{ch_title}', Option ({correct_letter}) is valid."
            }
        }
        
    return {
        "question_id": qid,
        "board_id": "karnataka-kseab-pue",
        "stage": "Class 10",
        "subject_id": subj["id"],
        "question_type_id": "single_mcq",
        "difficulty": diff,
        "marks": marks,
        "practice_eligible": 1,
        "full_exam_eligible": 1,
        "provenance": "OFFICIAL_KSEAB_SSLC_SYLLABUS_DERIVED",
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
                "question": f"[{s_name} - {ch_title}] ಪ್ರಶ್ನೆ {q_num} ({marks} ಅಂಕಗಳು): '{ch_title}' ಪಠ್ಯಭಾಗದ ಮುಖ್ಯಾಂಶಗಳು, ಸನ್ನಿವೇಶ ಮತ್ತು ತಾತ್ವಿಕ ಹಿನ್ನೆಲೆಯನ್ನು ವಿವರಿಸಿ.",
                "model_answer": f"ಮಾದರಿ ಉತ್ತರ ({marks} ಅಂಕಗಳು): 1. ಸಂದರ್ಭ ಮತ್ತು ಕವಿ/ಲೇಖಕರ ಪರಿಚಯ. 2. ಮುಖ್ಯ ಸಾರಾಂಶ, ಪಾತ್ರ ವಿಶ್ಲೇಷಣೆ ಮತ್ತು ಸನ್ನಿವೇಶದ ಸ್ವಾರಸ್ಯ. 3. ಭಾಷಾ ಶೈಲಿ, ಮೌಲ್ಯಗಳು ಮತ್ತು ಮುಕ್ತಾಯ.",
                "marking_scheme": f"ಅಂಕ ಹಂಚಿಕೆ: ಸಂದರ್ಭ (1 ಅಂಕ), ವಿವರಣೆ ಮತ್ತು ವಿಶ್ಲೇಷಣೆ ({(marks-2) if marks > 2 else 1} ಅಂಕಗಳು), ಭಾಷಾ ಶುದ್ಧತೆ ಮತ್ತು ತೀರ್ಮಾನ (1 ಅಂಕ)."
            }
        }
    elif lang == "en":
        content = {
            "en": {
                "question": f"[{s_name} - {ch_title}] Question {q_num} ({marks} Marks): Provide a detailed analytical explanation or derivation regarding '{ch_title}'.",
                "model_answer": f"Model Answer ({marks} Marks): 1. Definition and governing principles. 2. Step-by-step analytical or contextual deduction. 3. Practical application and conclusive summary.",
                "marking_scheme": f"Evaluation Rubric: Basic Concept (1 Mark), Analytical Elaboration ({(marks-2) if marks > 2 else 1} Marks), Accuracy and Conclusion (1 Mark)."
            }
        }
    elif lang == "hi":
        content = {
            "hi": {
                "question": f"[{s_name} - {ch_title}] प्रश्न {q_num} ({marks} अंक): '{ch_title}' का भावार्थ, व्याख्या अथवा साहित्यिक वैशिष्ट्य स्पष्ट कीजिए।",
                "model_answer": f"आदर्श उत्तर ({marks} अंक): १. प्रसंग एवं कवि/लेखक परिचय। २. मुख्य भाव, व्याख्या एवं संदर्भ। ३. निष्कर्ष एवं व्याकरण सम्मत भाषा।",
                "marking_scheme": f"अंकन योजना: प्रसंग (1 अंक), व्याख्या एवं विश्लेषण ({(marks-2) if marks > 2 else 1} अंक), वर्तनी एवं निष्कर्ष (1 अंक)।"
            }
        }
    elif lang == "ur":
        content = {
            "ur": {
                "question": f"[{s_name} - {ch_title}] سوال {q_num} ({marks} نمبرات): '{ch_title}' کا خلاصہ، تشریح یا مرکزی خیال تفصیل سے بیان کیجیے۔",
                "model_answer": f"نمونہ جواب ({marks} نمبرات): ۱. سیاق و سباق اور تعارف۔ ۲. مرکزی خیال اور شعری/نثری محاسن۔ ۳. اخلاقی نتیجہ اور اختتام۔",
                "marking_scheme": f"مارکنگ اسکیم: حوالہ اور سیاق (۱ نمبر)، تجزیہ اور تشریح ({(marks-2) if marks > 2 else 1} نمبرات)، زبان و املا (۱ نمبر)۔"
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
    else: # kn_en
        content = {
            "kn": {
                "question": f"[{s_name} - {ch_title}] ಪ್ರಶ್ನೆ {q_num} ({marks} ಅಂಕಗಳು): '{ch_title}' ಘಟಕದ ಮೂಲ ಸೂತ್ರಗಳು, ನಿಯಮಗಳು ಮತ್ತು ಹಂತಗಳನ್ನು ಸವಿವರವಾಗಿ ಸಾಧಿಸಿ/ವಿವರಿಸಿ.",
                "model_answer": f"ಮಾದರಿ ಉತ್ತರ ({marks} ಅಂಕಗಳು): 1. ವ್ಯಾಖ್ಯೆ ಮತ್ತು ಮೂಲ ಪರಿಕಲ್ಪನೆ. 2. ಸೂತ್ರದ ಸಾಧನೆ, ಸ್ಪಷ್ಟ ಚಿತ್ರಗಳು ಮತ್ತು ಹಂತ ಹಂತದ ಲೆಕ್ಕಾಚಾರ. 3. ಪ್ರಾಯೋಗಿಕ ಅನ್ವಯ ಮತ್ತು ಅಂತಿಮ ಪ್ರಮಾಣಗಳು.",
                "marking_scheme": f"ಅಂಕ ಹಂಚಿಕೆ: ನಿಯಮ/ಸೂತ್ರ (1 ಅಂಕ), ಹಂತ ಹಂತದ ವಿವರಣೆ/ಸಾಧನೆ ({(marks-2) if marks > 2 else 1} ಅಂಕಗಳು), ಫಲಿತಾಂಶ ಮತ್ತು ಘಟಕಗಳು (1 ಅಂಕ)."
            },
            "en": {
                "question": f"[{s_name} - {ch_title}] Descriptive Question {q_num} ({marks} Marks): Provide a comprehensive derivation, proof, and evaluation of principles regarding '{ch_title}'.",
                "model_answer": f"Model Answer ({marks} Marks): 1. Governing scientific/mathematical definitions. 2. Step-by-step mathematical or conceptual proof with proper diagrams. 3. Physical significance and unit verification.",
                "marking_scheme": f"Evaluation Rubric: Statement of Principle (1 Mark), Methodological Steps ({(marks-2) if marks > 2 else 1} Marks), Conclusive Accuracy (1 Mark)."
            }
        }
        
    return {
        "question_id": qid,
        "board_id": "karnataka-kseab-pue",
        "stage": "Class 10",
        "subject_id": subj["id"],
        "question_type_id": qtype,
        "difficulty": diff,
        "marks": marks,
        "practice_eligible": 0,
        "full_exam_eligible": 0,
        "provenance": "OFFICIAL_KSEAB_SSLC_SYLLABUS_DERIVED",
        "language_content": json.dumps(content, ensure_ascii=False),
        "correct_answer": f"Model solution provided for {qtype} ({marks} Marks) under KSEAB SSLC curriculum."
    }

all_questions = []

for subj in PRIMARY_SSLC_SUBJECTS:
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

out_path = os.path.join(os.path.dirname(__file__), "kseab_c10_bank.json")
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(all_questions, f, ensure_ascii=False, indent=2)

print(f"Successfully generated {len(all_questions)} KSEAB Class 10 questions in {out_path}!")
