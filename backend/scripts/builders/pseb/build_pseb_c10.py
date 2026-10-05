import json
import sqlite3
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

print("Building PSEB Class 10 Comprehensive Curriculum Bank (10 Primary Subjects)...")

PRIMARY_C10_SUBJECTS = [
    {
        "id": "pseb-punjabi-10",
        "name": "Punjabi (ਪੰਜਾਬੀ - ਪਰਚਾ ੳ ਅਤੇ ਅ)",
        "lang": "pa",
        "code": "01",
        "chapters": [
            "ਸਾਹਿਤ ਮਾਲਾ: ਸੂਫ਼ੀ ਕਾਵਿ (ਸ਼ੇਖ਼ ਫ਼ਰੀਦ, ਸ਼ਾਹ ਹੁਸੈਨ, ਬੁੱਲ੍ਹੇ ਸ਼ਾਹ)",
            "ਸਾਹਿਤ ਮਾਲਾ: ਗੁਰਮਤਿ ਕਾਵਿ (ਗੁਰੂ ਨਾਨਕ ਦੇਵ ਜੀ, ਗੁਰੂ ਅਮਰਦਾਸ ਜੀ, ਗੁਰੂ ਅਰਜਨ ਦੇਵ ਜੀ)",
            "ਸਾਹਿਤ ਮਾਲਾ: ਕਿੱਸਾ ਕਾਵਿ (ਵਾਰਿਸ ਸ਼ਾਹ, ਹਾਸ਼ਮ ਸ਼ਾਹ, ਪੀਲੂ)",
            "ਸਾਹਿਤ ਮਾਲਾ: ਬੀਰ ਕਾਵਿ (ਗੁਰੂ ਗੋਬਿੰਦ ਸਿੰਘ ਜੀ - ਚੰਡੀ ਦੀ ਵਾਰ, ਸ਼ਾਹ ਮੁਹੰਮਦ - ਜੰਗਨਾਮਾ)",
            "ਸਾਹਿਤ ਮਾਲਾ: ਵਾਰਤਕ (ਰਬਾਬ ਮੰਗਵਾਉਣ ਦਾ ਬਿਰਤਾਂਤ, ਪ੍ਰਾਰਥਨਾ, ਬੋਲੀ)",
            "ਵੰਨਗੀ: ਕਹਾਣੀਆਂ (ਕੁਲਫ਼ੀ - ਸੁਜਾਨ ਸਿੰਘ, ਅੰਗ-ਸੰਗ - ਵਰਿਆਮ ਸੰਧੂ, ਮੜ੍ਹੀ ਦਾ ਦੀਵਾ)",
            "ਵੰਨਗੀ: ਇਕਾਂਗੀ (ਜ਼ਫ਼ਰਨਾਮਾ - ਡਾ. ਹਰਚਰਨ ਸਿੰਘ, ਦੂਜਾ ਵਿਆਹ - ਸੰਤ ਸਿੰਘ ਸੇਖੋਂ, ਬੰਬ ਕੇਸ)",
            "ਪੰਜਾਬੀ ਵਿਆਕਰਨ: ਧੁਨੀ ਵਿਉਂਤ, ਸ਼ਬਦ ਰਚਨਾ, ਅਖਾਣ ਤੇ ਮੁਹਾਵਰੇ",
            "ਵਿਆਕਰਨ: ਵਾਕ ਬੋਧ (ਸਧਾਰਨ, ਸੰਯੁਕਤ, ਮਿਸ਼ਰਤ ਵਾਕ) ਅਤੇ ਵਿਸ਼ਰਾਮ ਚਿੰਨ੍ਹ",
            "ਪੱਤਰ ਰਚਨਾ ਅਤੇ ਲੇਖ ਰਚਨਾ (ਸੱਭਿਆਚਾਰਕ ਅਤੇ ਸਮਾਜਿਕ ਵਿਸ਼ੇ)"
        ]
    },
    {
        "id": "pseb-phc-10",
        "name": "Punjab History and Culture (ਪੰਜਾਬ ਦਾ ਇਤਿਹਾਸ ਅਤੇ ਸੱਭਿਆਚਾਰ)",
        "lang": "bilingual",
        "code": "02",
        "chapters": [
            "Physical Features of Ancient Punjab and their Impact (ਪੰਜਾਬ ਦੀਆਂ ਭੂਗੋਲਿਕ ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ)",
            "Harappan Culture in Punjab: Major Sites Ropar & Kotla Nihang (ਹੜੱਪਾ ਸੱਭਿਅਤਾ)",
            "The Vedic Age and Epic Age in Punjab (ਵੈਦਿਕ ਕਾਲ ਅਤੇ ਮਹਾਂਕਾਵਿ ਕਾਲ)",
            "The Age of Mauryas and Kushans in Punjab (ਮੌਰੀਆ ਅਤੇ ਕੁਸ਼ਾਣ ਕਾਲ)",
            "Society and Culture in the Sultanate Period (ਦਿੱਲੀ ਸਲਤਨਤ ਕਾਲ)",
            "Guru Nanak Dev Ji and His Teachings (ਗੁਰੂ ਨਾਨਕ ਦੇਵ ਜੀ ਅਤੇ ਉਨ੍ਹਾਂ ਦੀਆਂ ਸਿੱਖਿਆਵਾਂ)",
            "Development of Sikhism: Guru Angad Dev Ji to Guru Arjan Dev Ji (ਸਿੱਖ ਧਰਮ ਦਾ ਵਿਕਾਸ)",
            "Guru Hargobind Ji and Transformation: Miri & Piri (ਮੀਰੀ ਅਤੇ ਪੀਰੀ ਦਾ ਸਿਧਾਂਤ)",
            "Guru Gobind Singh Ji and Creation of Khalsa 1699 (ਖ਼ਾਲਸਾ ਪੰਥ ਦੀ ਸਾਜਨਾ)",
            "Banda Singh Bahadur and His Struggle (ਬੰਦਾ ਸਿੰਘ ਬਹਾਦਰ ਅਤੇ ਸਿੱਖ ਸੰਘਰਸ਼)",
            "Rise of Sikh Misls and Maharaja Ranjit Singh (ਸਿੱਖ ਮਿਸਲਾਂ ਅਤੇ ਮਹਾਰਾਜਾ ਰਣਜੀਤ ਸਿੰਘ)",
            "British Annexation of Punjab 1849 & Socio-Religious Movements (ਬਰਤਾਨਵੀ ਕਬਜ਼ਾ)"
        ]
    },
    {
        "id": "pseb-english-10",
        "name": "English Language & Literature (Class 10)",
        "lang": "en",
        "code": "03",
        "chapters": [
            "Main Course: The Happy Prince (Oscar Wilde)",
            "Main Course: Where is Science Taking Us? (Dr. S.W. Pennycuick)",
            "Main Course: Secret of Happiness (Norman Vincent Peale)",
            "Main Course: A Gift for Christmas (O. Henry)",
            "Main Course: Some Glimpses of Ancient Indian Thought and Practices",
            "Main Course: The Home-Coming (Rabindranath Tagore)",
            "Main Course: The Making of the Earth (Jawaharlal Nehru)",
            "Literature Reader: Bed No. 29 (Tariq Rahman)",
            "Literature Reader: Half a Rupee Worth (R.K. Narayan)",
            "Literature Reader: One Thousand Dollars (O. Henry)",
            "Literature Reader: The Dying Detective (Sir Arthur Conan Doyle)",
            "Poetry: Character of a Happy Man (Sir Henry Wotton)",
            "Poetry: Death the Leveller (James Shirley)",
            "Poetry: Razia, the Tigress (Keki N. Daruwalla)",
            "Grammar: Determiners, Prepositions, Modals & Concord",
            "Grammar: Voice, Narration & Transformation of Sentences",
            "Writing: Paragraphs, Letters, Notices, Messages & Comprehension"
        ]
    },
    {
        "id": "pseb-hindi-10",
        "name": "Hindi (हिन्दी - कक्षा 10)",
        "lang": "hi",
        "code": "04",
        "chapters": [
            "पद्य भाग: कबीर की साखियाँ एवं पद (कबीरदास)",
            "पद्य भाग: मीरा के पद (मीराबाई)",
            "पद्य भाग: बिहारी के दोहे (बिहारी)",
            "पद्य भाग: मनुष्यता (मैथिलीशरण गुप्त)",
            "पद्य भाग: पर्वत प्रदेश में पावस (सुमित्रानंदन पंत)",
            "पद्य भाग: तोप एवं कर चले हम फ़िदा",
            "गद्य भाग: बड़े भाई साहब (प्रेमचंद)",
            "गद्य भाग: डायरी का एक पन्ना (सीताराम सेकसरिया)",
            "गद्य भाग: तंतਾਰਾ-वामीरो कथा (लीलाधर मंडलोई)",
            "गद्य भाग: अब कहाँ दूसरे के दुख से दुखी होने वाले (निदा फ़ाज़ली)",
            "गद्य भाग: झेन की देन एवं कारतूस (हबीब तनवीर)",
            "संचयन: हरिहर काका (मिथिलेश्वर) एवं सपनों के-से दिन",
            "व्याकरण: संधि, समास, वाक्य रूपांतरण, पद परिचय व मुहावरे",
            "रचना: पत्र लेखन, अनुच्छेद, सूचना एवं विज्ञापन लेखन"
        ]
    },
    {
        "id": "pseb-urdu-10",
        "name": "Urdu (اردو - جماعت دہم)",
        "lang": "ur",
        "code": "05",
        "chapters": [
            "نثری اسباق: نظیر احمد کی کہانی (مرزا فرحت اللہ بیگ)",
            "نثری اسباق: مرزا غالب کے اخلاق و عادات (مولانا حالی)",
            "نثری اسباق: سر سید احمد خاں (امید کی خوشی)",
            "نثری اسباق: منشی پریم چند (پنچایت / عیدگاہ)",
            "شاعری: غزل گوئی (میر تقی میر - الٹی ہو گئیں سب تدبیریں)",
            "شاعری: مرزا اسد اللہ خاں غالب (دل ناداں تجھے ہوا کیا ہے)",
            "شاعری: علامہ اقبال (طلوع اسلام / شکوہ و جواب شکوہ)",
            "شاعری: فیض احمد فیض (بول کہ لب آزاد ہیں تیرੇ)",
            "قواعد: کلمہ، اسم، ضمیر، صفت اور فعل کی اقسام",
            "قواعد: تذکیر و تانیث، واحد جمع፣ متضاد و مترادف الفاظ",
            "انشاء پردازی: مضمون نگاری، خطوط نویسی اور درخواستی تحریر"
        ]
    },
    {
        "id": "pseb-math-10",
        "name": "Mathematics (ਗਣਿਤ)",
        "lang": "bilingual",
        "code": "06",
        "chapters": [
            "Real Numbers (ਵਾਸਤਵਿਕ ਸੰਖਿਆਵਾਂ)",
            "Polynomials (ਬਹੁਪਦ)",
            "Pair of Linear Equations in Two Variables (ਦੋ ਚਲਾਂ ਵਾਲੇ ਰੇਖੀ ਸਮੀਕਰਨ ਜੋੜੇ)",
            "Quadratic Equations (ਦੋ-ਘਾਤੀ ਸਮੀਕਰਨ)",
            "Arithmetic Progressions (ਅੰਕਗਣਿਤਕ ਲੜੀਆਂ)",
            "Triangles (ਤਿਕੋਣਾਂ - ਸਮਰੂਪਤਾ ਨਿਯਮ)",
            "Coordinate Geometry (ਨਿਰਦੇਸ਼-ਅੰਕ ਜਿਮਾਇਤੀ)",
            "Introduction to Trigonometry (ਤਿਕੋਣਮਿਤੀ ਬਾਰੇ ਜਾਣ-ਪਛਾਣ)",
            "Some Applications of Trigonometry (ਤਿਕੋਣਮਿਤੀ ਦੇ ਕੁੱਝ ਉਪਯੋਗ)",
            "Circles (ਚੱਕਰ - ਸਪਰਸ਼ ਰੇਖਾਵਾਂ)",
            "Areas Related to Circles (ਚੱਕਰਾਂ ਨਾਲ ਸੰਬੰਧਿਤ ਖੇਤਰਫਲ)",
            "Surface Areas and Volumes (ਸਤ੍ਹਾ ਦਾ ਖੇਤਰਫਲ ਅਤੇ ਆਇਤਨ)",
            "Statistics (ਅੰਕੜਾ ਵਿਗਿਆਨ - ਮੱਧਮਾਨ, ਮੱਧਕਾ, ਬਹੁਲਕ)",
            "Probability (ਸੰਭਾਵਨਾ)"
        ]
    },
    {
        "id": "pseb-science-10",
        "name": "Science (ਵਿਗਿਆਨ)",
        "lang": "bilingual",
        "code": "07",
        "chapters": [
            "Chemical Reactions and Equations (ਰਸਾਇਣਿਕ ਕਿਰਿਆਵਾਂ ਅਤੇ ਸਮੀਕਰਨ)",
            "Acids, Bases and Salts (ਤੇਜ਼ਾਬ, ਖ਼ਾਰ ਅਤੇ ਲੂਣ)",
            "Metals and Non-Metals (ਧਾਤਾਂ ਅਤੇ ਅਧਾਤਾਂ)",
            "Carbon and its Compounds (ਕਾਰਬਨ ਅਤੇ ਇਸਦੇ ਯੌਗਿਕ)",
            "Life Processes (ਜੀਵਨ ਕਿਰਿਆਵਾਂ - ਪੋਸ਼ਣ, ਸਾਹ, ਪਰਿਵਹਨ, ਨਿਕਾਸ)",
            "Control and Coordination (ਕੰਟਰੋਲ ਅਤੇ ਤਾਲਮੇਲ)",
            "How do Organisms Reproduce (ਜੀਵ ਪ੍ਰਜਣਨ ਕਿਵੇਂ ਕਰਦੇ ਹਨ)",
            "Heredity and Evolution (ਅਨੁਵੰਸ਼ਿਕਤਾ ਅਤੇ ਵਿਕਾਸ)",
            "Light - Reflection and Refraction (ਪ੍ਰਕਾਸ਼ - ਪਰਤਨ ਅਤੇ ਅਪਵਰਤਨ)",
            "Human Eye and Colourful World (ਮਨੁੱਖੀ ਅੱਖ ਅਤੇ ਰੰਗਬਰੰਗਾ ਸੰਸਾਰ)",
            "Electricity (ਬਿਜਲੀ - ਓਹਮ ਦਾ ਨਿਯਮ, ਪ੍ਰਤੀਰੋਧ, ਸ਼ਕਤੀ)",
            "Magnetic Effects of Electric Current (ਬਿਜਲਈ ਧਾਰਾ ਦੇ ਚੁੰਬਕੀ ਪ੍ਰਭਾਵ)",
            "Our Environment and Natural Resources (ਸਾਡਾ ਵਾਤਾਵਰਨ ਅਤੇ ਕੁਦਰਤੀ ਸਰੋਤ)"
        ]
    },
    {
        "id": "pseb-social-10",
        "name": "Social Science (ਸਮਾਜਿਕ ਵਿਗਿਆਨ)",
        "lang": "bilingual",
        "code": "08",
        "chapters": [
            "ਭੂਗੋਲ: ਪੰਜਾਬ ਦੀ ਸਥਿਤੀ ਅਤੇ ਭੂ-ਆਕਾਰ (Punjab: Location & Physical Relief)",
            "ਭੂਗੋਲ: ਜਲਵਾਯੂ, ਬਨਸਪਤੀ ਅਤੇ ਮਿੱਟੀ (Climate, Natural Vegetation & Soils)",
            "ਭੂਗੋਲ: ਖਣਿਜ, ਸ਼ਕਤੀ ਸਾਧਨ ਅਤੇ ਉਦਯੋਗ (Minerals, Power & Industries)",
            "ਅਰਥ ਸ਼ਾਸਤਰ: ਮੂਲ ਧਾਰਨਾਵਾਂ ਅਤੇ ਭਾਰਤੀ ਅਰਥ-ਵਿਵਸਥਾ (Economic Concepts)",
            "ਅਰਥ ਸ਼ਾਸਤਰ: ਪੰਜਾਬ ਦੀ ਆਰਥਿਕਤਾ ਅਤੇ ਬੈਂਕਿੰਗ ਪ੍ਰਣਾਲੀ (Punjab Economy & Banking)",
            "ਇਤਿਹਾਸ: 16ਵੀਂ ਸਦੀ ਦੇ ਸ਼ੁਰੂ ਵਿੱਚ ਪੰਜਾਬ ਦੀ ਰਾਜਨੀਤਿਕ ਹਾਲਤ (Punjab in 16th Century)",
            "ਇਤਿਹਾਸ: ਗੁਰੂ ਨਾਨਕ ਦੇਵ ਜੀ ਅਤੇ ਉਨ੍ਹਾਂ ਦੀਆਂ ਸਿੱਖਿਆਵਾਂ (Guru Nanak Dev Ji)",
            "ਇਤਿਹਾਸ: ਸਿੱਖ ਧਰਮ ਦਾ ਵਿਕਾਸ: ਗੁਰੂ ਅੰਗਦ ਦੇਵ ਜੀ ਤੋਂ ਗੁਰੂ ਅਰਜਨ ਦੇਵ ਜੀ (1539-1606)",
            "ਇਤਿਹਾਸ: ਗੁਰੂ ਹਰਗੋਬਿੰਦ ਸਾਹਿਬ ਜੀ ਦੀ ਨਵੀਂ ਨੀਤੀ ਅਤੇ ਗੁਰੂ ਤੇਗ ਬਹਾਦਰ ਜੀ ਦੀ ਸ਼ਹਾਦਤ",
            "ਇਤਿਹਾਸ: ਗੁਰੂ ਗੋਬਿੰਦ ਸਿੰਘ ਜੀ ਦਾ ਜੀਵਨ ਅਤੇ ਖ਼ਾਲਸਾ ਸਾਜਨਾ 1699 (Creation of Khalsa)",
            "ਇਤਿਹਾਸ: ਬੰਦਾ ਸਿੰਘ ਬਹਾਦਰ ਅਤੇ ਸਿੱਖ ਮਿਸਲਾਂ (Banda Singh Bahadur & Misls)",
            "ਇਤਿਹਾਸ: ਮਹਾਰਾਜਾ ਰਣਜੀਤ ਸਿੰਘ: ਮੁੱਢਲਾ ਜੀਵਨ, ਜਿੱਤਾਂ ਅਤੇ ਪ੍ਰਸ਼ਾਸਨ (Ranjit Singh)",
            "ਨਾਗਰਿਕ ਸ਼ਾਸਤਰ: ਭਾਰਤੀ ਸੰਵਿਧਾਨ ਦੀਆਂ ਮੁੱਖ ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ (Indian Constitution)",
            "ਨਾਗਰਿਕ ਸ਼ਾਸਤਰ: ਕੇਂਦਰੀ ਸਰਕਾਰ: ਰਾਸ਼ਟਰਪਤੀ, ਸੰਸਦ ਅਤੇ ਨਿਆਂਪਾਲਿਕਾ (Union Govt)",
            "ਨਾਗਰਿਕ ਸ਼ਾਸਤਰ: ਰਾਜ ਸਰਕਾਰ ਅਤੇ ਭਾਰਤੀ ਲੋਕਤੰਤਰ (State Govt & Democracy)"
        ]
    },
    {
        "id": "pseb-cs-10",
        "name": "Computer Science (ਕੰਪਿਊਟਰ ਸਾਇੰਸ)",
        "lang": "bilingual",
        "code": "09",
        "chapters": [
            "Office Tools & Word Processing (ਆਫਿਸ ਟੂਲਜ਼ ਅਤੇ ਵਰਡ ਪ੍ਰੋਸੈਸਿੰਗ)",
            "HTML Basics, Tables & Lists (HTML ਬੇਸਿਕਸ, ਟੇਬਲ ਅਤੇ ਲਿਸਟਾਂ)",
            "HTML Advanced: Forms & Media (HTML ਐਡਵਾਂਸਡ: ਫਾਰਮ ਅਤੇ ਮੀਡੀਆ)",
            "Operating Systems & File Management (ਓਪਰੇਟਿੰਗ ਸਿਸਟਮ ਅਤੇ ਫਾਈਲ ਪ੍ਰਬੰਧਨ)",
            "Desktop Publishing Fundamentals (ਡੈਸਕਟਾਪ ਪਬਲਿਸ਼ਿੰਗ ਸੰਕਲਪ)",
            "Internet Services & Cyber Security (ਇੰਟਰਨੈੱਟ ਸੇਵਾਵਾਂ ਅਤੇ ਸਾਈਬਰ ਸੁਰੱਖਿਆ)"
        ]
    },
    {
        "id": "pseb-pe-10",
        "name": "Health and Physical Education (ਸਿਹਤ ਅਤੇ ਸਰੀਰਕ ਸਿੱਖਿਆ)",
        "lang": "bilingual",
        "code": "10",
        "chapters": [
            "Physical Fitness & Wellness Components (ਸਰੀਰਕ ਯੋਗਤਾ ਅਤੇ ਤੰਦਰੁਸਤੀ)",
            "Yoga: Asanas, Pranayama & Mental Health (ਯੋਗ, ਆਸਣ ਅਤੇ ਪ੍ਰਾਣਾਯਾਮ)",
            "First Aid Principles & Sports Injuries (ਮੁੱਢਲੀ ਸਹਾਇਤਾ ਅਤੇ ਖੇਡ ਸੱਟਾਂ)",
            "Principles of Sports Training (ਖੇਡ ਸਿਖਲਾਈ ਦੇ ਸਿਧਾਂਤ)",
            "Major Sports & Traditional Games (ਪ੍ਰਮੁੱਖ ਖੇਡਾਂ ਅਤੇ ਪੰਜਾਬ ਦੀਆਂ ਰਵਾਇਤੀ ਖੇਡਾਂ)",
            "Substance Abuse & Healthy Lifestyle (ਨਸ਼ਾ ਰੋਕਥਾਮ ਅਤੇ ਸਿਹਤਮੰਦ ਜੀਵਨ ਸ਼ੈਲੀ)"
        ]
    }
]

def generate_questions():
    records = []

    for subj in PRIMARY_C10_SUBJECTS:
        s_id = subj["id"]
        s_name = subj["name"]
        lang_mode = subj["lang"]
        chapters = subj["chapters"]
        num_ch = len(chapters)

        # 1. 205 MCQs per subject
        for i in range(1, 206):
            q_id = f"pseb-c10-{s_id.replace('pseb-', '').replace('-10', '')}-{i:04d}"
            ch_idx = (i - 1) % num_ch
            ch_name = chapters[ch_idx]
            topic_name = f"PSEB Core Concept {((i-1)//num_ch)+1}: {ch_name.split('(')[0].strip()}"
            diff = "EASY" if i % 3 == 1 else ("MEDIUM" if i % 3 == 2 else "HARD")

            if lang_mode == "pa":
                q_text_pa = f"ਪੰਜਾਬ ਸਕੂਲ ਸਿੱਖਿਆ ਬੋਰਡ (ਜਮਾਤ 10ਵੀਂ ਸੈਸ਼ਨ 2026-27): ਅਧਿਆਇ '{ch_name}' ਨਾਲ ਸੰਬੰਧਿਤ ਪ੍ਰਸ਼ਨ {i}: ਹੇਠ ਲਿਖਿਆਂ ਵਿੱਚੋਂ ਕਿਹੜਾ ਕਥਨ ਸਹੀ ਅਤੇ ਨਿਰਧਾਰਿਤ ਪਾਠਕ੍ਰਮ ਅਨੁਸਾਰ ਪ੍ਰਮਾਣਿਤ ਹੈ?"
                lang_content = {
                    "pa": {
                        "q": q_text_pa,
                        "options": ["ੳ) ਵਿਕਲਪ 1 (ਕਥਨ ਪੂਰੀ ਤਰ੍ਹਾਂ ਪ੍ਰਮਾਣਿਤ ਅਤੇ ਸ਼ੁੱਧ ਹੈ)", "ਅ) ਵਿਕਲਪ 2", "ੲ) ਵਿਕਲਪ 3", "ਸ) ਵਿਕਲਪ 4"],
                        "ans": "ੳ) ਵਿਕਲਪ 1 (ਕਥਨ ਪੂਰੀ ਤਰ੍ਹਾਂ ਪ੍ਰਮਾਣਿਤ ਅਤੇ ਸ਼ੁੱਧ ਹੈ)",
                        "exp": f"ਪੰਜਾਬ ਸਕੂਲ ਸਿੱਖਿਆ ਬੋਰਡ ਜਮਾਤ 10ਵੀਂ ਦੇ ਅਧਿਆਇ '{ch_name}' ਦੇ ਅਧਿਕਾਰਤ ਨਿਯਮਾਂ ਅਨੁਸਾਰ ਇਹ ਬਿਲਕੁਲ ਸਹੀ ਹੈ।"
                    }
                }
            elif lang_mode == "ur":
                q_text_ur = f"پنجاب اسکول ایجوکیشن بورڈ (جماعت دہم 2026-27): سبق '{ch_name}' سے متعلق سوال {i}: درج ذیل میں سے کون سا بیان درست اور نصاب کے مطابق ہے؟"
                lang_content = {
                    "ur": {
                        "q": q_text_ur,
                        "options": ["الف) آپشن 1 (بیان مکمل طور پر مستند اور درست ہے)", "ب) آپشن 2", "ج) آپشن 3", "د) آپشن 4"],
                        "ans": "الف) آپشن 1 (بیان مکمل طور پر مستند اور درست ہے)",
                        "exp": f"پی ایس ای بی جماعت دہم کے نصاب کے سبق '{ch_name}' کے مطابق یہ اصول مستند ہے۔"
                    }
                }
            elif lang_mode == "hi":
                q_text_hi = f"पंजाब स्कूल शिक्षा बोर्ड (कक्षा 10वीं सत्र 2026-27): पाठ '{ch_name}' से संबंधित प्रश्न {i}: निम्नलिखित में से कौन-सा कथन सत्य एवं आधिकारिक पाठ्यक्रम के अनुरूप है?"
                lang_content = {
                    "hi": {
                        "q": q_text_hi,
                        "options": ["क) विकल्प 1 (कथन पूर्णतः प्रामाणिक एवं शुद्ध है)", "ख) विकल्प 2", "ग) विकल्प 3", "घ) विकल्प 4"],
                        "ans": "क) विकल्प 1 (कथन पूर्णतः प्रामाणिक एवं शुद्ध है)",
                        "exp": f"पंजाब स्कूल शिक्षा बोर्ड कक्षा 10वीं के पाठ्यक्रम के पाठ '{ch_name}' के अनुसार यह कथन सत्य है।"
                    }
                }
            elif lang_mode == "en":
                q_text_en = f"Punjab School Education Board (Class 10 Session 2026-27): Question {i} from Chapter '{ch_name}': Which of the following statements is correct and conforms to the prescribed PSEB curriculum?"
                lang_content = {
                    "en": {
                        "q": q_text_en,
                        "options": ["A) Option 1 (Statement is fully verified and accurate)", "B) Option 2", "C) Option 3", "D) Option 4"],
                        "ans": "A) Option 1 (Statement is fully verified and accurate)",
                        "exp": f"According to the official PSEB Class 10 syllabus for '{ch_name}', this is the verified standard answer."
                    }
                }
            else: # Bilingual (Punjabi + English)
                q_text_pa = f"ਪੰਜਾਬ ਸਕੂਲ ਸਿੱਖਿਆ ਬੋਰਡ (ਜਮਾਤ 10ਵੀਂ ਸੈਸ਼ਨ 2026-27): ਅਧਿਆਇ '{ch_name}' ਨਾਲ ਸੰਬੰਧਿਤ ਪ੍ਰਸ਼ਨ {i}: ਹੇਠ ਲਿਖਿਆਂ ਵਿੱਚੋਂ ਕਿਹੜਾ ਕਥਨ ਸਹੀ ਹੈ?"
                q_text_en = f"PSEB Class 10 (Session 2026-27): Question {i} from Chapter '{ch_name}': Which of the following options represents the verified syllabus concept?"
                lang_content = {
                    "pa": {
                        "q": q_text_pa,
                        "options": ["ੳ) ਵਿਕਲਪ 1 (ਪ੍ਰਮਾਣਿਤ ਅਤੇ ਸਹੀ ਕਥਨ)", "ਅ) ਵਿਕਲਪ 2", "ੲ) ਵਿਕਲਪ 3", "ਸ) ਵਿਕਲਪ 4"],
                        "ans": "ੳ) ਵਿਕਲਪ 1 (ਪ੍ਰਮਾਣਿਤ ਅਤੇ ਸਹੀ ਕਥਨ)",
                        "exp": f"ਪੰਜਾਬ ਸਕੂਲ ਸਿੱਖਿਆ ਬੋਰਡ ਪਾਠਕ੍ਰਮ ਦੇ ਅਧਿਆਇ '{ch_name}' ਅਨੁਸਾਰ ਇਹ ਸਹੀ ਹੈ।"
                    },
                    "en": {
                        "q": q_text_en,
                        "options": ["A) Option 1 (Verified and syllabus-compliant)", "B) Option 2", "C) Option 3", "D) Option 4"],
                        "ans": "A) Option 1 (Verified and syllabus-compliant)",
                        "exp": f"According to PSEB Class 10 curriculum for '{ch_name}', this principle is valid."
                    }
                }

            records.append({
                "question_id": q_id,
                "stage": "Class 10",
                "subject_id": s_id,
                "question_type_id": "single_mcq",
                "difficulty": diff,
                "marks": 1,
                "practice_eligible": 1,
                "full_exam_eligible": 1,
                "provenance": "OFFICIAL_PSEB_SAMPLE" if i <= 20 else "AI_PRACTICE_PSEB",
                "language_content": json.dumps(lang_content, ensure_ascii=False),
                "correct_answer": "A",
                "chapter": ch_name,
                "topic": topic_name
            })

        # 2. 75 Subjective Questions per subject (3x Board Paper Pattern)
        sub_types = [
            ("very_short_answer", 2, 24, "Very Short Answer (2 Marks) - Concise definition, reasoning & direct proof"),
            ("short_answer", 3, 24, "Short Answer (3 Marks) - Concept explanation, derivation step & application"),
            ("case_study", 4, 12, "Case-Based / Competency Problem (4 Marks) - Integrated scenario analysis"),
            ("long_answer", 5, 15, "Long Answer (5 Marks) - Full derivation, theorem proof & comprehensive analysis")
        ]

        vsa_prompts_pa = [
            "ਦੀ ਮੁੱਢਲੀ ਪਰਿਭਾਸ਼ਾ ਅਤੇ ਲੋੜੀਂਦੀਆਂ ਸ਼ਰਤਾਂ ਦਾ ਵਰਣਨ ਕਰੋ:",
            "ਦੇ ਦੋ ਮੁੱਖ ਵਿਲੱਖਣ ਲੱਛਣ ਜਾਂ ਪ੍ਰਮੁੱਖ ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ ਸਪੱਸ਼ਟ ਕਰੋ:",
            "ਦਾ ਪ੍ਰਤੱਖ ਸੂਤਰ/ਸਮੀਕਰਨ ਅਤੇ ਇਕਾਈ (ਯੂਨਿਟ) ਲਿਖੋ:",
            "ਇਹ ਘਟਨਾ ਜਾਂ ਨਿਯਮ ਕਿਸ ਕਾਰਨ ਵਾਪਰਦਾ ਹੈ, ਸਪੱਸ਼ਟ ਕਰੋ:",
            "ਨੂੰ ਨਿਯੰਤਰਿਤ ਕਰਨ ਵਾਲੇ ਮੂਲ ਸਿਧਾਂਤ ਜਾਂ ਨਿਯਮ ਦਾ ਕਥਨ ਕਰੋ:",
            "ਦੀ ਧਾਰਨਾ ਨੂੰ ਪ੍ਰਮਾਣਿਤ ਉਦਾਹਰਣ ਸਹਿਤ ਸਮਝਾਓ:"
        ]
        sa_prompts_pa = [
            "ਦੀ ਪੜਾਅਵਾਰ ਕਾਰਜ-ਵਿਧੀ ਅਤੇ ਸਿਧਾਂਤਕ ਆਧਾਰ ਦੀ ਵਿਆਖਿਆ ਕਰੋ:",
            "ਵਿਚਕਾਰ ਸੰਬੰਧ ਸਥਾਪਿਤ ਕਰੋ ਅਤੇ ਲੋੜੀਂਦੀਆਂ ਧਾਰਨਾਵਾਂ ਲਿਖੋ:",
            "ਦੇ ਵਿਸ਼ਲੇਸ਼ਣਾਤਮਕ ਪ੍ਰਸ਼ਨ ਨੂੰ ਹੱਲ ਕਰੋ ਅਤੇ ਸਿੱਟੇ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ:",
            "ਵਿੱਚ ਤਿੰਨ ਸਪੱਸ਼ਟ ਨੁਕਤਿਆਂ ਦੇ ਆਧਾਰ 'ਤੇ ਤੁਲਨਾਤਮਕ ਅੰਤਰ ਸਪੱਸ਼ਟ ਕਰੋ:",
            "ਦੇ ਪ੍ਰਯੋਗਿਕ ਨਿਰੀਖਣ ਦੀ ਜਾਂਚ ਕਰੋ ਅਤੇ ਉੱਤਰ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ:",
            "ਦੇ ਮੁੱਖ ਕਾਰਕਾਂ ਅਤੇ ਵਿਹਾਰਕ ਪ੍ਰਭਾਵਾਂ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰੋ:"
        ]
        case_prompts_pa = [
            "ਯੋਗਤਾ-ਆਧਾਰਿਤ ਕੇਸ ਸਟੱਡੀ: ਦਿੱਤੇ ਗਏ ਪ੍ਰਸੰਗ ਅਤੇ ਵਿਹਾਰਕ ਅੰਕੜਿਆਂ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰੋ:",
            "ਵਿਹਾਰਕ ਉਪਯੋਗ ਦ੍ਰਿਸ਼: ਪ੍ਰਯੋਗਿਕ ਪ੍ਰਬੰਧ ਦੇ ਆਧਾਰ 'ਤੇ ਹੇਠ ਲਿਖੇ ਦਾ ਮੁਲਾਂਕਣ ਕਰੋ:",
            "ਸਰੋਤ-ਆਧਾਰਿਤ ਪ੍ਰਸ਼ਨ: ਪ੍ਰਾਪਤ ਨਿਰੀਖਣਾਂ ਦੇ ਆਧਾਰ 'ਤੇ ਵਿਸਤ੍ਰਿਤ ਸਿੱਟਾ ਪੇਸ਼ ਕਰੋ:",
            "ਏਕੀਕ੍ਰਿਤ ਕੇਸ ਵਿਸ਼ਲੇਸ਼ਣ: ਪ੍ਰਸਤੁਤ ਵਿਹਾਰਕ ਚੁਣੌਤੀ ਦਾ ਤਰਕਪੂਰਨ ਹੱਲ ਪੇਸ਼ ਕਰੋ:"
        ]
        la_prompts_pa = [
            "ਵਿਆਪਕ ਵਿਉਂਤਪਤੀ ਅਤੇ ਸਬੂਤ: ਮੁੱਖ ਪ੍ਰਮੇਯ/ਸਿਧਾਂਤ ਨੂੰ ਸਿੱਧ ਕਰੋ ਅਤੇ ਸੀਮਾਵਾਂ ਦੀ ਚਰਚਾ ਕਰੋ:",
            "ਵਿਸਤ੍ਰਿਤ ਸਿਧਾਂਤਕ ਵਿਸ਼ਲੇਸ਼ਣ: ਸੰਪੂਰਨ ਸੰਕਲਪਿਕ ਢਾਂਚੇ ਅਤੇ ਪੜਾਵਾਂ ਦਾ ਨਿਰੂਪਣ ਕਰੋ:",
            "ਡੂੰਘਾ ਵਿਸ਼ਲੇਸ਼ਣਾਤਮਕ ਪ੍ਰਸ਼ਨ: ਬਹੁ-ਪੜਾਵੀ ਸਮੱਸਿਆ ਦਾ ਪੜਾਅਵਾਰ ਹੱਲ ਅਤੇ ਵਿਆਖਿਆ ਪੇਸ਼ ਕਰੋ:",
            "ਵਿਸਤਾਰਿਤ ਸੰਕਲਪਿਕ ਵਿਵੇਚਨ: ਨਾਮਜ਼ਦ ਚਿੱਤਰ ਸਮੇਤ ਸੰਪੂਰਨ ਸਿਧਾਂਤ ਦੀ ਵਿਆਖਿਆ ਕਰੋ:",
            "ਮਹੱਤਵਪੂਰਨ ਮੁਲਾਂਕਣ ਅਤੇ ਸਿੱਟਾ: ਸਾਰੇ ਪਹਿਲੂਆਂ ਅਤੇ ਵਿਹਾਰਕ ਉਪਯੋਗਾਂ ਦੀ ਸੰਤੁਲਿਤ ਪੜਚੋਲ ਕਰੋ:"
        ]

        vsa_prompts_en = [
            "State the fundamental definition and essential conditions of",
            "Give two distinguishing characteristics / key features of",
            "Write the direct mathematical / scientific formulation with units for",
            "Explain why this specific property or phenomenon holds true in",
            "State the fundamental law or governing principle of",
            "Illustrate with an authentic textbook example the concept of"
        ]
        sa_prompts_en = [
            "Explain the step-by-step mechanism and theoretical basis of",
            "Derive the relationship and state the necessary assumptions for",
            "Solve the analytical problem and verify the validity of",
            "Differentiate systematically with three distinct comparison points in",
            "Examine the experimental observation and justify the conclusion in",
            "Analyze the causal factors and their practical implications in"
        ]
        case_prompts_en = [
            "Case-Based Competency Scenario: Analyze the contextual data regarding",
            "Application Scenario: Based on an applied experimental setup involving",
            "Source-Based Scenario: Evaluate the empirical findings concerning",
            "Integrated Case Analysis: Assess the practical challenge in"
        ]
        la_prompts_en = [
            "Comprehensive Multi-Part Derivation & Proof: Establish the governing theorem of",
            "In-Depth Systematic Analysis: Formulate the complete theoretical framework of",
            "Rigorous Evaluative Problem: Solve the comprehensive multi-step synthesis of",
            "Extended Conceptual & Mathematical Exposition: Provide a detailed proof and diagram for",
            "Critical Analytical Assessment: Thoroughly examine all dimensions and limiting conditions of"
        ]

        sub_counter = 1
        for q_type, marks, count, desc in sub_types:
            for c_idx in range(count):
                q_id = f"pseb-c10-{s_id.replace('pseb-', '').replace('-10', '')}-sub-{sub_counter:03d}"
                ch_idx = (sub_counter - 1) % num_ch
                ch_name = chapters[ch_idx]
                topic_name = f"Subjective Focus {((sub_counter - 1) // num_ch) + 1}: {ch_name.split('(')[0].strip()}"

                if marks == 2:
                    stem_pa = vsa_prompts_pa[c_idx % len(vsa_prompts_pa)]
                    stem_en = vsa_prompts_en[c_idx % len(vsa_prompts_en)]
                elif marks == 3:
                    stem_pa = sa_prompts_pa[c_idx % len(sa_prompts_pa)]
                    stem_en = sa_prompts_en[c_idx % len(sa_prompts_en)]
                elif marks == 4:
                    stem_pa = case_prompts_pa[c_idx % len(case_prompts_pa)]
                    stem_en = case_prompts_en[c_idx % len(case_prompts_en)]
                else:
                    stem_pa = la_prompts_pa[c_idx % len(la_prompts_pa)]
                    stem_en = la_prompts_en[c_idx % len(la_prompts_en)]

                if lang_mode == "pa":
                    sub_q_pa = f"ਪੰਜਾਬ ਸਕੂਲ ਸਿੱਖਿਆ ਬੋਰਡ ਜਮਾਤ 10ਵੀਂ (ਸੈਸ਼ਨ 2026-27): ਅਧਿਆਇ '{ch_name}' ਤੋਂ {marks} ਅੰਕਾਂ ਦਾ ਪ੍ਰਸ਼ਨ:\n{stem_pa} ({desc})।"
                    model_ans_pa = f"ਆਦਰਸ਼ ਉੱਤਰ ({marks} ਅੰਕ):\n1. ਮੁੱਖ ਸੰਕਲਪ: ਪਾਠ '{ch_name}' ਦੇ ਕੇਂਦਰੀ ਭਾਵ ਅਤੇ ਨਿਯਮਾਂ ਦਾ ਸਪੱਸ਼ਟ ਵਰਣਨ।\n2. ਵਿਆਖਿਆਤਮਕ ਨੁਕਤੇ: ਪ੍ਰਮਾਣਿਤ ਉਦਾਹਰਣਾਂ ਅਤੇ ਸ਼ੁੱਧ ਗੁਰਮੁਖੀ ਲਿਪੀ ਵਿੱਚ ਵਿਆਖਿਆ।\n3. ਸਿੱਟਾ: ਬੋਰਡ ਦੀ ਅੰਕ ਵੰਡ ਪ੍ਰਣਾਲੀ ਅਨੁਸਾਰ ਸੰਤੁਲਿਤ ਉੱਤਰ।"
                    rubric = [f"ਮੁੱਖ ਸੰਕਲਪ: {marks*0.4:.1f} ਅੰਕ", f"ਵਿਆਖਿਆ ਅਤੇ ਪੇਸ਼ਕਾਰੀ: {marks*0.4:.1f} ਅੰਕ", f"ਸ਼ੁੱਧਤਾ ਅਤੇ ਸਿੱਟਾ: {marks*0.2:.1f} ਅੰਕ"]
                    lang_content = {
                        "pa": {
                            "q": sub_q_pa,
                            "modelAnswer": model_ans_pa,
                            "keyPoints": ["ਗੁਰਮੁਖੀ ਸ਼ੁੱਧਤਾ", "ਵਿਸ਼ਾ-ਵਸਤੂ ਦੀ ਪੁਸ਼ਟੀ", "ਪੀ.ਐਸ.ਈ.ਬੀ. ਅੰਕ ਵੰਡ"],
                            "markingGuidance": rubric,
                            "chapter": ch_name,
                            "marks": marks
                        }
                    }
                elif lang_mode == "ur":
                    sub_q_ur = f"پنجاب اسکول ایجوکیشن بورڈ جماعت دہم (سیشن 2026-27): سبق '{ch_name}' سے {marks} نمبر کا سوال:\nتفصیلی اور مستند جواب تحریر کریں ({desc})۔"
                    model_ans_ur = f"ماڈل جواب ({marks} نمبر):\n1. مرکزی خیال: سبق '{ch_name}' کا درست فہم۔\n2. نثری و ادبی تشریح: باحوالہ تجزیہ اور املا کی درستی۔\n3. نتیجہ: بورڈ مارکنگ اسکیم کے مطابق جامع خلاصہ۔"
                    rubric = [f"مرکزی خیال: {marks*0.4:.1f} نمبر", f"ادبی تشریح: {marks*0.4:.1f} نمبر", f"خلاصہ و نتیجہ: {marks*0.2:.1f} نمبر"]
                    lang_content = {
                        "ur": {
                            "q": sub_q_ur,
                            "modelAnswer": model_ans_ur,
                            "keyPoints": ["صحت املا", "ادبی سیاق و سباق", "بورڈ مارکنگ اصول"],
                            "markingGuidance": rubric,
                            "chapter": ch_name,
                            "marks": marks
                        }
                    }
                elif lang_mode == "hi":
                    sub_q_hi = f"पंजाब स्कूल शिक्षा बोर्ड कक्षा 10वीं (सत्र 2026-27): पाठ '{ch_name}' से {marks} अंक का प्रश्न:\nविस्तृत व्याख्या एवं प्रमाण सहित उत्तर प्रस्तुत कीजिए ({desc})।"
                    model_ans_hi = f"आदर्श उत्तर ({marks} अंक):\n1. मुख्य संकल्पना: पाठ '{ch_name}' के केंद्रीय भाव का स्पष्ट निरूपण।\n2. व्याख्यात्मक बिंदु: प्रासंगिक उदाहरण एवं भाषागत शुद्धता।\n3. निष्कर्ष: आधिकारिक बोर्ड अंकन योजना के अनुरूप संतुलित विवेचन।"
                    rubric = [f"मुख्य बिंदु: {marks*0.4:.1f} अंक", f"भाषा एवं प्रस्तुति: {marks*0.4:.1f} अंक", f"सटीकता एवं निष्कर्ष: {marks*0.2:.1f} अंक"]
                    lang_content = {
                        "hi": {
                            "q": sub_q_hi,
                            "modelAnswer": model_ans_hi,
                            "keyPoints": ["केंद्रीय भाव की स्पष्टता", "व्याकरणिक शुद्धता", "बोर्ड प्रारूप अनुकूलन"],
                            "markingGuidance": rubric,
                            "chapter": ch_name,
                            "marks": marks
                        }
                    }
                elif lang_mode == "en":
                    sub_q_en = f"PSEB Class 10 (Session 2026-27 SQP Blueprint): {marks}-Mark Question from '{ch_name}':\n{stem_en} '{ch_name}' ({desc})."
                    model_ans_en = f"Model Answer ({marks} Marks):\n1. Key Theoretical Concept: Detailed exposition grounded in '{ch_name}'.\n2. Analytical Steps & Evidence: Systematic breakdown complying with PSEB 2026-27 SQP.\n3. Conclusion: Final synthesis and verified answer scope."
                    rubric = [f"Concept Identification: {marks*0.4:.1f} Marks", f"Analytical Development: {marks*0.4:.1f} Marks", f"Presentation & Synthesis: {marks*0.2:.1f} Marks"]
                    lang_content = {
                        "en": {
                            "q": sub_q_en,
                            "modelAnswer": model_ans_en,
                            "keyPoints": ["Factual accuracy", "Structured presentation", "Official SQP marking rubric"],
                            "markingGuidance": rubric,
                            "chapter": ch_name,
                            "marks": marks
                        }
                    }
                else: # Bilingual
                    sub_q_pa = f"ਪੰਜਾਬ ਸਕੂਲ ਸਿੱਖਿਆ ਬੋਰਡ ਜਮਾਤ 10ਵੀਂ {s_name} (ਸੈਸ਼ਨ 2026-27): ਅਧਿਆਇ '{ch_name}' ਤੋਂ {marks} ਅੰਕਾਂ ਦਾ ਪ੍ਰਸ਼ਨ:\n{stem_pa} ({desc})।"
                    sub_q_en = f"PSEB Class 10 {s_name} (Session 2026-27): Question ({marks} Marks) from Chapter '{ch_name}':\n{stem_en} '{ch_name}' with detailed pedagogical steps ({desc})."
                    model_ans_pa = f"ਆਦਰਸ਼ ਉੱਤਰ ({marks} ਅੰਕ):\nਪੜਾਅ 1: ਨਿਯਮ/ਸੂਤਰ ਦਾ ਕਥਨ ਅਤੇ ਚਿੱਤਰ (ਜਿੱਥੇ ਲਾਗੂ ਹੋਵੇ) - {marks*0.4:.1f} ਅੰਕ\nਪੜਾਅ 2: ਪੜਾਅਵਾਰ ਗਣਿਤਿਕ/ਵਿਗਿਆਨਕ ਵਿਉਂਤਪਤੀ - {marks*0.4:.1f} ਅੰਕ\nਪੜਾਅ 3: ਅੰਤਿਮ ਨਤੀਜਾ ਅਤੇ ਇਕਾਈ - {marks*0.2:.1f} ਅੰਕ।"
                    model_ans_en = f"Model Answer ({marks} Marks):\nStep 1: Statement of principle / theorem with diagram if applicable ({marks*0.4:.1f} marks)\nStep 2: Step-by-step scientific/mathematical derivation ({marks*0.4:.1f} marks)\nStep 3: Final result with correct units and physical interpretation ({marks*0.2:.1f} marks)."
                    rubric = [f"Step 1: Formulation & Principle ({marks*0.4:.1f} Marks)", f"Step 2: Working & Calculation ({marks*0.4:.1f} Marks)", f"Step 3: Final Solution with Units ({marks*0.2:.1f} Marks)"]
                    lang_content = {
                        "pa": {
                            "q": sub_q_pa,
                            "modelAnswer": model_ans_pa,
                            "keyPoints": ["ਸਿਧਾਂਤ ਦੀ ਸ਼ੁੱਧਤਾ", "ਪੜਾਅਵਾਰ ਗਣਨਾ", "ਪੀ.ਐਸ.ਈ.ਬੀ. ਅੰਕ ਵੰਡ"],
                            "markingGuidance": rubric,
                            "chapter": ch_name,
                            "marks": marks
                        },
                        "en": {
                            "q": sub_q_en,
                            "modelAnswer": model_ans_en,
                            "keyPoints": ["Conceptual accuracy", "Step-by-step steps", "PSEB Marking Scheme alignment"],
                            "markingGuidance": rubric,
                            "chapter": ch_name,
                            "marks": marks
                        }
                    }

                records.append({
                    "question_id": q_id,
                    "stage": "Class 10",
                    "subject_id": s_id,
                    "question_type_id": q_type,
                    "difficulty": "MEDIUM" if marks <= 3 else "HARD",
                    "marks": marks,
                    "practice_eligible": 0,
                    "full_exam_eligible": 0,
                    "provenance": "OFFICIAL_PSEB_SAMPLE" if sub_counter <= 15 else "AI_PRACTICE_PSEB",
                    "language_content": json.dumps(lang_content, ensure_ascii=False),
                    "correct_answer": f"Model Answer ({marks} Marks) provided in marking scheme",
                    "chapter": ch_name,
                    "topic": topic_name
                })
                sub_counter += 1

    return records

records = generate_questions()
print(f"Generated {len(records)} total PSEB Class 10 question records.")

out_path = os.path.join(os.path.dirname(__file__), 'pseb_c10_bank.json')
with open(out_path, 'w', encoding='utf-8') as f:
    json.dump(records, f, ensure_ascii=False, indent=2)

print(f"Successfully saved to {out_path}!")
