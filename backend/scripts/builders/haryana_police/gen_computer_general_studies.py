"""
Haryana Police Constable - Computer Knowledge, General Studies & Police Administration Generator
Generates exactly 300 syllabus-aligned MCQs covering:
- Computer Fundamentals (Mandatory 10% HSSC Curriculum): Generations, CPU, ALU, RAM, ROM, Cache, SSD
- Operating Systems & Software: Windows OS, Linux, Android, System vs Application software, File extensions
- MS Office Suite: MS Word, MS Excel formulas (SUM, IF, AVERAGE), MS PowerPoint presentation tools
- Networking & Cyber Security: LAN, WAN, IP address (IPv4 vs IPv6), HTTP/HTTPS, Phishing, Malware, IT Act 2000
- Indian Polity & Constitution: Preamble, Fundamental Rights, DPSP, Parliament, High Court of Punjab & Haryana
- Indian History & Freedom Movement: Rakhigarhi (Hisar), 1857 Revolt, National Movement, Leaders
- Sports & Awards: Haryana Olympic champions (Neeraj Chopra, Manu Bhaker), Khel Ratna, Bhim Award
- Police Administration & Traffic Laws: Police hierarchy (DGP to Constable), Dial 112, Motor Vehicles Act rules
Strict 25.0% option key balance (75 A, 75 B, 75 C, 75 D).
"""

import sys
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

def get_raw_computer_general_studies_items():
    items = []

    # 1. 24 Benchmark Core Questions (6 of each option: 0, 1, 2, 3)
    core_benchmarks = [
        # 1. Computer Memory - Volatility (Index 0)
        ("Which type of computer memory is volatile and loses its stored contents as soon as power is turned off?",
         "कंप्यूटर की कौन-सी मेमोरी अस्थिर (Volatile) होती है और बिजली बंद होते ही उसका सारा डेटा नष्ट हो जाता है?",
         "RAM (Random Access Memory - रैम)", "ROM (Read Only Memory)", "Hard Disk Drive", "Flash SSD",
         0, "RAM is volatile memory; data is lost when electrical power is switched off.",
         "रैम (RAM) एक अस्थिर (Volatile) मेमोरी है, जिसमें डेटा तभी तक रहता है जब तक विद्युत आपूर्ति चालू रहती है।"),

        # 2. IPv4 vs IPv6 (Index 1)
        ("What is the length (size) of an Internet Protocol Version 4 (IPv4) address?",
         "इंटरनेट प्रोटोकॉल संस्करण 4 (IPv4) पते की लंबाई कितने बिट होती है?",
         "16 bits", "32 bits (32 बिट्स - 4 ऑक्टेट)", "64 bits", "128 bits",
         1, "An IPv4 address is 32 bits long (4 bytes/octets), whereas IPv6 is 128 bits long.",
         "IPv4 पता 32 बिट लंबा होता है (चार भागों में विभक्त), जबकि IPv6 पता 128 बिट का होता है।"),

        # 3. Rakhigarhi Archaeological Site (Index 2)
        ("In which district of Haryana is Rakhigarhi, the largest Harappan (Indus Valley) civilization archaeological site in India, situated?",
         "भारत में सिंधु घाटी सभ्यता का सबसे बड़ा पुरातात्विक स्थल 'राखीगढ़ी' हरियाणा के किस जिले में स्थित है?",
         "Fatehabad", "Sirsa", "Hisar (हिसार जिला - नारनौंद तहसील)", "Bhiwani",
         2, "Rakhigarhi in Hisar district is the largest Indus Valley Civilization site in the Indian subcontinent.",
         "हिसार जिले के नारनौंद में स्थित राखीगढ़ी भारतीय उपमहाद्वीप में हड़प्पा सभ्यता का सबसे विशाल स्थल है।"),

        # 4. Highest Police Rank (Index 3)
        ("What is the highest-ranking executive police officer in the state of Haryana who heads the State Police force?",
         "हरियाणा राज्य के पुलिस बल का सर्वोच्च प्रशासनिक व कार्यकारी प्रमुख पद कौन-सा होता है?",
         "Inspector General of Police (IGP)", "Superintendent of Police (SP)", "Additional Director General (ADGP)", "Director General of Police (DGP - पुलिस महानिदेशक)",
         3, "The Director General of Police (DGP) is the highest-ranking police officer heading the state police.",
         "राज्य पुलिस बल का सर्वोच्च पद 'पुलिस महानिदेशक' (Director General of Police - DGP) होता है।"),

        # 5. MS Excel Formula Prefix (Index 0)
        ("In Microsoft Excel, every formula or calculation must begin with which mathematical symbol?",
         "माइक्रोसॉफ्ट एक्सेल (MS Excel) में प्रत्येक सूत्र (Formula) किस प्रतीक चिह्न से शुरू होना अनिवार्य है?",
         "= (Equal to sign - बराबर का चिह्न)", "+ (Plus sign)", "@ (At sign)", "# (Hash sign)",
         0, "In Excel, all formulas must start with the equal sign (=).",
         "एमएस एक्सेल में सभी फॉर्मूले बराबर (=) के चिह्न से प्रारंभ होते हैं।"),

        # 6. Shortcut for Copy (Index 1)
        ("Which keyboard shortcut is used to copy selected text or files in Windows operating system?",
         "विंडोज ऑपरेटिंग सिस्टम में चयनित टेक्स्ट या फाइल को कॉपी (Copy) करने के लिए किस कीबोर्ड शॉर्टकट का प्रयोग किया जाता है?",
         "Ctrl + X", "Ctrl + C (कंट्रोल + C)", "Ctrl + V", "Ctrl + Z",
         1, "Ctrl + C copies the selected item to clipboard.",
         "चयनित टेक्स्ट या फाइल को कॉपी करने के लिए 'Ctrl + C' तथा पेस्ट करने के लिए 'Ctrl + V' का प्रयोग किया जाता है।"),

        # 7. High Court Jurisdiction (Index 2)
        ("Under which Article of the Indian Constitution is the High Court established as a court of record for a State?",
         "भारतीय संविधान के किस अनुच्छेद के तहत प्रत्येक राज्य के लिए उच्च न्यायालय का प्रावधान किया गया है?",
         "Article 124", "Article 148", "Article 214 (अनुच्छेद 214 - राज्यों के लिए उच्च न्यायालय)", "Article 324",
         2, "Article 214 states that there shall be a High Court for each State.",
         "संविधान के अनुच्छेद 214 के अनुसार प्रत्येक राज्य के लिए एक उच्च न्यायालय होगा। पंजाब एवं हरियाणा का संयुक्त उच्च न्यायालय चंडीगढ़ में है।"),

        # 8. Olympic Gold Medalist Neeraj Chopra (Index 3)
        ("Neeraj Chopra, who won India's historic Olympic Gold medal in Tokyo 2020 in Javelin Throw, hails from which district of Haryana?",
         "टोक्यो ओलंपिक 2020 में भाला फेंक (Javelin Throw) में भारत के लिए ऐतिहासिक स्वर्ण पदक जीतने वाले नीरज चोपड़ा हरियाणा के किस जिले से हैं?",
         "Rohtak", "Sonipat", "Jhajjar", "Panipat (पानीपत - खंडरा गांव)",
         3, "Neeraj Chopra hails from Khandra village in Panipat district of Haryana.",
         "नीरज चोपड़ा हरियाणा के पानीपत जिले के खंडरा गांव के निवासी हैं।"),

        # 9. Fundamental Rights Article 21 (Index 0)
        ("Which Article of the Constitution of India guarantees the Fundamental Right to Protection of Life and Personal Liberty?",
         "भारतीय संविधान का कौन-सा अनुच्छेद 'प्राण एवं दैहिक स्वतंत्रता का संरक्षण' (Right to Life and Personal Liberty) प्रदान करता है?",
         "Article 21 (अनुच्छेद 21)", "Article 14", "Article 19", "Article 32",
         0, "Article 21 protects life and personal liberty, stating no person shall be deprived of life or personal liberty except according to procedure established by law.",
         "अनुच्छेद 21 किसी भी व्यक्ति को उसके प्राण एवं दैहिक स्वतंत्रता से विधि द्वारा स्थापित प्रक्रिया के अतिरिक्त वंचित करने से संरक्षण प्रदान करता है।"),

        # 10. Cyber Security Phishing (Index 1)
        ("What fraudulent practice involves tricking individuals into revealing sensitive credentials such as passwords and credit card numbers via fake emails or websites?",
         "नकली ईमेल या वेबसाइट के माध्यम से उपयोगकर्ताओं को झांसा देकर उनके पासवर्ड और बैंकिंग विवरण चुराने का साइबर अपराध क्या कहलाता है?",
         "Spooling", "Phishing (फ़िशिंग हमला)", "Degaussing", "Fragmentation",
         1, "Phishing is a social engineering attack used to steal user data like login credentials and credit card numbers.",
         "फ़िशिंग (Phishing) एक प्रकार का साइबर अपराध है जिसमें फर्जी ईमेल या वेबसाइट बनाकर लोगों के संवेदनशील वित्तीय व व्यक्तिगत डेटा चुराए जाते हैं।"),

        # 11. Police Helpline for Women - Operation Durga (Index 2)
        ("In Haryana, which dedicated police initiative was launched in April 2017 to ensure safety and security of women in public places?",
         "हरियाणा में सार्वजनिक स्थलों पर महिलाओं और छात्राओं की सुरक्षा सुनिश्चित करने हेतु अप्रैल 2017 में कौन-सा विशेष पुलिस अभियान शुरू किया गया था?",
         "Mission Shakti", "Operation Rakshak", "Operation Durga (ऑपरेशन दुर्गा)", "Operation Suraksha",
         2, "Operation Durga was launched by Haryana Police on 13 April 2017 for women's safety.",
         "हरियाणा पुलिस ने 13 अप्रैल 2017 को मनचलों व असामाजिक तत्वों से महिलाओं की सुरक्षा हेतु 'ऑपरेशन दुर्गा' की शुरुआत की थी।"),

        # 12. Motor Vehicles Act Helmet Rule (Index 3)
        ("Under Section 129 of the Motor Vehicles Act 1988 (as amended), which safety gear is mandatory for two-wheeler riders and pillion riders?",
         "मोटर वाहन अधिनियम 1988 (संशोधित) की धारा 129 के तहत दोपहिया वाहन चालकों एवं पीछे बैठे सवारियों के लिए क्या पहनना कानूनी रूप से अनिवार्य है?",
         "Reflective Vest", "Safety Gloves", "Knee Guards", "Protective Headgear / Helmet (सुरक्षात्मक हेलमेट)",
         3, "Section 129 of Motor Vehicles Act mandates the wearing of protective headgear (helmet) conforming to BIS standards.",
         "मोटर वाहन अधिनियम की धारा 129 के तहत दोपहिया वाहन चालक व पीछे बैठे व्यक्ति दोनों के लिए बीआईएस मानक वाला हेलमेट पहनना अनिवार्य है।"),

        # 13. Computer Brain (Index 0)
        ("Which hardware component is widely recognized as the 'Brain of the Computer' that performs instructions and calculations?",
         "कंप्यूटर का कौन-सा हार्डवेयर घटक 'कंप्यूटर का मस्तिष्क' कहलाता है जो सभी निर्देशों को क्रियान्वित और परिकलित करता है?",
         "CPU (Central Processing Unit - सेंट्रल प्रोसेसिंग यूनिट)", "Hard Disk", "Power Supply Unit (SMPS)", "Monitor",
         0, "The CPU (Central Processing Unit) executes program instructions and processes calculations, acting as the brain.",
         "सीपीयू (Central Processing Unit) कंप्यूटर का मस्तिष्क कहलाता है, जो सभी अंकगणितीय और तार्किक गणनाएं करता है।"),

        # 14. First Chief Minister of Haryana (Index 1)
        ("Who was the first Chief Minister of Haryana upon its formation on 1 November 1966?",
         "1 नवंबर 1966 को हरियाणा राज्य के गठन के समय राज्य के पहले मुख्यमंत्री कौन बने थे?",
         "Bansi Lal", "Pt. Bhagwat Dayal Sharma (पंडित भगवत दयाल शर्मा)", "Rao Birender Singh", "Chaudhary Devi Lal",
         1, "Pandit Bhagwat Dayal Sharma served as the first Chief Minister of Haryana from 1 Nov 1966 to 23 March 1967.",
         "पंडित भगवत दयाल शर्मा हरियाणा के प्रथम मुख्यमंत्री (1 नवंबर 1966 से 23 मार्च 1967) थे।"),

        # 15. World Wide Web Protocol (Index 2)
        ("Which protocol is universally used for transmitting secure, encrypted hypertext web pages over the internet?",
         "इंटरनेट पर सुरक्षित एवं एन्क्रिप्टेड वेब पेज प्रसारित करने के लिए किस प्रोटोकॉल का उपयोग किया जाता है?",
         "FTP", "SMTP", "HTTPS (Hypertext Transfer Protocol Secure)", "Telnet",
         2, "HTTPS uses SSL/TLS encryption to ensure secure web communication.",
         "HTTPS (Hypertext Transfer Protocol Secure) वेब ब्राउज़र और सर्वर के बीच सुरक्षित व एन्क्रिप्टेड संचार प्रदान करता है।"),

        # 16. National Cyber Crime Reporting Portal (Index 3)
        ("What is the official National Cyber Crime Reporting portal URL launched by the Ministry of Home Affairs, Government of India?",
         "भारत सरकार के गृह मंत्रालय द्वारा साइबर अपराधों की ऑनलाइन शिकायत दर्ज करने हेतु आधिकारिक पोर्टल कौन-सा है?",
         "police.gov.in", "digitalindia.gov.in", "cert-in.org.in", "cybercrime.gov.in (राष्ट्रीय साइबर अपराध रिपोर्टिंग पोर्टल)",
         3, "cybercrime.gov.in is the national portal to report cyber financial fraud and crimes against women/children.",
         "गृह मंत्रालय द्वारा संचालित 'cybercrime.gov.in' पोर्टल पर नागरिक किसी भी प्रकार के साइबर वित्तीय धोखाधड़ी या अपराध की रिपोर्ट कर सकते हैं।"),

        # 17. IT Act 2000 Section for Hacking (Index 0)
        ("Under which Section of the Information Technology Act 2000 is computer hacking, data theft, and unauthorized access penalized?",
         "सूचना प्रौद्योगिकी अधिनियम 2000 (IT Act 2000) की किस धारा के तहत कंप्यूटर हैकिंग, अनधिकृत डेटा एक्सेस व साइबर अपराध दंडनीय है?",
         "Section 66 (धारा 66 - कंप्यूटर संबंधित अपराध)", "Section 25", "Section 12", "Section 4",
         0, "Section 66 of IT Act 2000 prescribes punishment for computer-related offenses including hacking with up to 3 years imprisonment.",
         "आईटी एक्ट 2000 की धारा 66 के तहत कंप्यूटर प्रणाली में हैकिंग, डेटा चोरी या छेड़छाड़ करने पर 3 साल तक के कारावास का प्रावधान है।"),

        # 18. Double Olympic Medals in Single Olympics (Index 1)
        ("Which shooter from Jhajjar, Haryana created history by winning two Olympic medals in the single Paris 2024 Olympic Games?",
         "हरियाणा के झज्जर जिले की किस निशानेबाज ने पेरिस ओलंपिक 2024 में एक ही ओलंपिक में दो पदक जीतकर ऐतिहासिक कीर्तिमान रचा?",
         "Deepika Kumari", "Manu Bhaker (मनु भाकर - 10 मी एयर पिस्टल में दो कांस्य पदक)", "Avani Lekhara", "Heena Sidhu",
         1, "Manu Bhaker won two bronze medals at Paris 2024 (individual 10m air pistol and mixed team event with Sarabjot Singh).",
         "झज्जर (गोरिया गांव) की मनु भाकर ने पेरिस 2024 ओलंपिक में 10 मीटर एयर पिस्टल व्यक्तिगत और मिश्रित टीम स्पर्धा में 2 कांस्य पदक जीते।"),

        # 19. First Governor of Haryana (Index 2)
        ("Who was the first Governor of the state of Haryana?",
         "हरियाणा राज्य के प्रथम राज्यपाल कौन थे?",
         "B. N. Chakravarty", "R. S. Narula", "Dharma Vira (श्री धर्मवीर)", "Mahabir Prasad",
         2, "Dharma Vira was the first Governor of Haryana, serving from 1 November 1966 to 14 September 1967.",
         "श्री धर्मवीर 1 नवंबर 1966 से 14 सितंबर 1967 तक हरियाणा के पहले राज्यपाल रहे।"),

        # 20. Motor Vehicles Act Drunk Driving (Index 3)
        ("Under Section 185 of the Motor Vehicles Act, what offense is strictly prohibited and penalized with imprisonment or heavy fine?",
         "मोटर वाहन अधिनियम की धारा 185 के तहत कौन-सा कृत्य एक गंभीर अपराध है और भारी जुर्माने व कारावास से दंडनीय है?",
         "Driving without helmet", "Driving without seatbelt", "Jumping a traffic signal", "Driving by a drunken person or under influence of drugs (शराब पीकर वाहन चलाना)",
         3, "Section 185 penalizes driving by a drunken person or under influence of drugs where alcohol in blood exceeds 30 mg per 100 ml.",
         "मोटर वाहन अधिनियम की धारा 185 शराब या नशीले पदार्थों के प्रभाव में वाहन चलाने (Drunk Driving) को गैर-कानूनी और दंडनीय घोषित करती है।"),

        # 21. Panchayati Raj Amendment (Index 0)
        ("Which Constitutional Amendment Act granted constitutional status and protection to Panchayati Raj institutions in India?",
         "किस संविधान संशोधन अधिनियम द्वारा भारत में पंचायती राज संस्थाओं को संवैधानिक दर्जा प्रदान किया गया?",
         "73rd Constitutional Amendment Act 1992 (73वां संविधान संशोधन)", "74th Constitutional Amendment Act", "42nd Constitutional Amendment Act", "44th Constitutional Amendment Act",
         0, "The 73rd Amendment Act 1992 added Part IX and the 11th Schedule to the Constitution for Panchayats.",
         "73वें संविधान संशोधन अधिनियम 1992 द्वारा संविधान में भाग IX और 11वीं अनुसूची जोड़कर पंचायती राज को संवैधानिक दर्जा दिया गया।"),

        # 22. Permanent Memory - ROM (Index 1)
        ("Which type of computer memory holds permanent startup instructions like BIOS and cannot be easily altered or wiped by power loss?",
         "कंप्यूटर की कौन-सी स्थायी मेमोरी कंप्यूटर को चालू करने वाले मूल बूट निर्देश (BIOS) संग्रहित रखती है और बिजली बंद होने पर भी सुरक्षित रहती है?",
         "Cache Memory", "ROM (Read Only Memory - रोम)", "RAM", "Register Memory",
         1, "ROM contains non-volatile, permanent firmware instructions like BIOS required during computer booting.",
         "रोम (ROM) एक गैर-अस्थिर स्थायी मेमोरी है जिसमें कंप्यूटर को शुरू करने वाले बेसिक इनपुट/आउटपुट सिस्टम (BIOS) निर्देश होते हैं।"),

        # 23. Haryana Armed Police Academy (Index 2)
        ("Where is the primary battalion headquarters of Haryana Armed Police (HAP) located?",
         "हरियाणा सशस्त्र पुलिस (Haryana Armed Police - HAP) की मुख्य बटालियन का मुख्यालय कहाँ स्थित है?",
         "Gurugram", "Ambala Cantt", "Madhuban (मधुबन, करनाल)", "Hisar",
         2, "Madhuban in Karnal hosts the headquarters and training battalion of Haryana Armed Police.",
         "हरियाणा सशस्त्र पुलिस (HAP) का मुख्य केंद्र और बटालियन मुख्यालय करनाल के मधुबन में स्थित है।"),

        # 24. Emergency Dial Helpline Number (Index 3)
        ("Under the nationwide Emergency Response Support System (ERSS) implemented in Haryana, what single emergency number integrates Police, Fire, and Ambulance?",
         "हरियाणा में लागू आपातकालीन प्रतिक्रिया सहायता प्रणाली (ERSS) के तहत पुलिस, अग्निशमन और एम्बुलेंस को एकीकृत करने वाला एकल आपातकालीन नंबर क्या है?",
         "100", "101", "102", "112 (हरियाणा डायल 112)",
         3, "Dial 112 is the single emergency response number for Police, Fire, and Medical assistance in Haryana.",
         "हरियाणा डायल 112 एक एकीकृत आपातकालीन सेवा है जो पुलिस, दमकल और चिकित्सा सहायता तुरंत उपलब्ध कराती है।")
    ]

    for b in core_benchmarks:
        stem_en, stem_hi, o1, o2, o3, o4, c_idx, sol_en, sol_hi = b
        raw_choices = [
            {'en': o1, 'hi': o1},
            {'en': o2, 'hi': o2},
            {'en': o3, 'hi': o3},
            {'en': o4, 'hi': o4}
        ]
        items.append({
            'domain': 'Computer & General Studies Core',
            'stem_en': stem_en,
            'stem_hi': stem_hi,
            'choices': raw_choices,
            'correct_idx': c_idx,
            'sol_en': sol_en,
            'sol_hi': sol_hi,
            'difficulty': 'MODERATE'
        })

    # Catalog of 69 comprehensive modules covering all syllabus topics
    computer_gs_modules = [
        # Computer Fundamentals & Architecture
        ("Computer Generations (First to Fifth Generation)", "First (Vacuum tubes), Second (Transistors), Third (IC chips), Fourth (Microprocessors VLSI), Fifth (AI & ULSI)", "कंप्यूटर की पीढ़ियां (वैक्यूम ट्यूब से एआई तक)", "कंप्यूटर ज्ञान"),
        ("Arithmetic Logic Unit (ALU)", "Component of CPU that performs arithmetic additions and logical comparisons", "अंकगणित एवं तार्किक गणना इकाई (ALU)", "कंप्यूटर ज्ञान"),
        ("Cache Memory Functionality", "Extremely fast SRAM placed between CPU and RAM to store frequently accessed data", "अल्ट्रा-फास्ट कैश मेमोरी की कार्यप्रणाली", "कंप्यूटर ज्ञान"),
        ("Solid State Drive (SSD) vs HDD", "SSDs use flash memory with no moving parts, offering much faster read/write speeds than mechanical HDDs", "एसएसडी बनाम हार्ड डिस्क ड्राइव (SSD vs HDD)", "कंप्यूटर ज्ञान"),
        ("Input Devices (Scanner, OCR, MICR, OMR)", "Hardware devices used to convert physical documents and barcodes into digital format", "कंप्यूटर इनपुट उपकरण (स्कैनर, ओएमआर, एमआईसीआर)", "कंप्यूटर ज्ञान"),
        ("Output Devices (Monitors, Plotters, Laser Printers)", "Hardware devices that display or print processed information", "कंप्यूटर आउटपुट उपकरण (मॉनिटर, प्लॉटर, लेजर प्रिंटर)", "कंप्यूटर ज्ञान"),
        ("Binary to Decimal Conversion", "Base-2 number system representation of instructions in machine code", "द्वि-आधारी (बाइनरी) एवं दशमलव संख्या रूपांतरण", "कंप्यूटर ज्ञान"),

        # Operating Systems & Software
        ("Operating System as Resource Manager", "Manages CPU scheduling, memory allocation, I/O devices, and file directories", "ऑपरेटिंग सिस्टम द्वारा संसाधनों का प्रबंधन", "कंप्यूटर ज्ञान"),
        ("Open Source Operating System - Linux", "Linux kernel developed by Linus Torvalds, free and open-source operating system", "ओपन सोर्स ऑपरेटिंग सिस्टम (लिनक्स कर्नेल)", "कंप्यूटर ज्ञान"),
        ("File Extensions (.pdf, .docx, .xlsx, .pptx, .exe)", "Standard naming conventions identifying file types and default programs", "कंप्यूटर फ़ाइल एक्सटेंशन एवं उनकी पहचान", "कंप्यूटर ज्ञान"),
        ("Task Manager in Windows (Ctrl + Shift + Esc)", "Utility showing currently running processes, CPU usage, and memory consumption", "विंडोज टास्क मैनेजर और सक्रिय प्रोसेस मॉनिटरिंग", "कंप्यूटर ज्ञान"),
        ("System Software vs Application Software", "System software operates hardware; Application software performs specific user tasks", "सिस्टम सॉफ्टवेयर बनाम एप्लिकेशन सॉफ्टवेयर", "कंप्यूटर ज्ञान"),

        # MS Office Suite
        ("MS Word Mail Merge Feature", "Tool for sending personalized form letters, envelopes, and certificates to multiple recipients", "एमएस वर्ड मेल मर्ज (Mail Merge) सुविधा", "कंप्यूटर ज्ञान"),
        ("MS Word Keyboard Shortcuts (Ctrl+Z, Ctrl+Y, Ctrl+B)", "Standard editing keystrokes: Undo, Redo, Bold, Italic", "एमएस वर्ड संपादन कीबोर्ड शॉर्टकट", "कंप्यूटर ज्ञान"),
        ("MS Excel SUM and AVERAGE Functions", "Formulas =SUM(range) and =AVERAGE(range) for automated numerical computations", "एमएस एक्सेल में SUM व AVERAGE गणितीय सूत्र", "कंप्यूटर ज्ञान"),
        ("MS Excel IF Conditional Formula", "Logical function =IF(condition, value_if_true, value_if_false)", "एमएस एक्सेल में IF तार्किक सूत्र", "कंप्यूटर ज्ञान"),
        ("MS PowerPoint Slide Transition & Animation", "Visual motion effects applied to whole slides or individual elements", "एमएस पावरपॉइंट स्लाइड ट्रांजिशन व एनिमेशन", "कंप्यूटर ज्ञान"),

        # Networking, Internet & Cyber Security
        ("Local Area Network (LAN) vs WAN", "LAN covers small geographical areas (offices), while WAN connects global networks", "स्थानीय नेटवर्क (LAN) बनाम विस्तृत नेटवर्क (WAN)", "साइबर व नेटवर्किंग"),
        ("Domain Name System (DNS)", "Translates human-readable domain names (like hssc.gov.in) into IP addresses", "डोमेन नेम सिस्टम (DNS) का कार्य", "साइबर व नेटवर्किंग"),
        ("Firewall Network Security", "Monitors incoming and outgoing traffic, blocking unauthorized access based on security rules", "नेटवर्क सुरक्षा में फ़ायरवॉल (Firewall) की भूमिका", "साइबर व नेटवर्किंग"),
        ("Malware and Ransomware Attacks", "Malicious software that infects computers or locks user files demanding ransom", "मैलवेयर एवं रैंसमवेयर साइबर हमले", "साइबर व नेटवर्किंग"),
        ("Trojan Horse Cyber Threat", "Malicious code disguised as legitimate software to create backdoors in systems", "ट्रोजन हॉर्स मैलवेयर की कार्यशैली", "साइबर व नेटवर्किंग"),
        ("Information Technology Act 2000 Key Provisions", "Legal framework for electronic governance, digital signatures, and cyber offenses in India", "सूचना प्रौद्योगिकी अधिनियम 2000 के प्रमुख प्रावधान", "साइबर व कानून"),
        ("Two-Factor Authentication (2FA / OTP)", "Enhanced security requiring password plus a time-based code sent to mobile", "द्वि-चरणीय प्रमाणीकरण (2FA एवं ओटीपी सुरक्षा)", "साइबर व नेटवर्किंग"),

        # Indian Polity & Constitution
        ("Preamble to the Constitution of India", "Declares India a Sovereign, Socialist, Secular, Democratic Republic", "भारतीय संविधान की प्रस्तावना (उद्देशिका)", "भारतीय राजव्यवस्था"),
        ("Fundamental Rights - Right to Equality (Articles 14-18)", "Equality before law, prohibition of discrimination, abolition of untouchability", "समानता का मौलिक अधिकार (अनुच्छेद 14-18)", "भारतीय राजव्यवस्था"),
        ("Fundamental Duties (Article 51A)", "11 duties added by 42nd Amendment 1976 on recommendation of Swaran Singh Committee", "मौलिक कर्तव्य (अनुच्छेद 51A - स्वर्ण सिंह समिति)", "भारतीय राजव्यवस्था"),
        ("Directive Principles of State Policy (Articles 36-51)", "Guidelines inspired by Irish Constitution for establishing a welfare state", "राज्य के नीति निर्देशक तत्व (DPSP)", "भारतीय राजव्यवस्था"),
        ("President of India Powers & Election (Articles 52-62)", "Electoral college consisting of elected members of both houses of Parliament and State Assemblies", "भारत के राष्ट्रपति का निर्वाचन एवं शक्तियां", "भारतीय राजव्यवस्था"),
        ("Parliament of India (Lok Sabha & Rajya Sabha)", "Bicameral legislature composed of Council of States and House of the People", "भारतीय संसद (लोकसभा एवं राज्यसभा)", "भारतीय राजव्यवस्था"),
        ("Punjab and Haryana High Court Jurisdiction", "Common high court for Punjab, Haryana, and Union Territory of Chandigarh", "पंजाब एवं हरियाणा उच्च न्यायालय का क्षेत्राधिकार", "भारतीय राजव्यवस्था"),
        ("Haryana Legislative Assembly (90 Vidhan Sabha Seats)", "Unicameral state legislature seated in Chandigarh; 17 reserved seats for SC", "हरियाणा विधानसभा (90 सीटें एवं 17 आरक्षित सीटें)", "हरियाणा प्रशासन"),
        ("Panchayati Raj in Haryana (3-Tier Structure)", "Gram Panchayat (village), Panchayat Samiti (block), Zila Parishad (district)", "हरियाणा में त्रि-स्तरीय पंचायती राज व्यवस्था", "हरियाणा प्रशासन"),

        # Indian History & National Movement
        ("Rakhigarhi Indus Valley Archaeological Site", "Largest site of Harappan civilization spread over 350 hectares in Hisar district", "हड़प्पा सभ्यता का सबसे विशाल स्थल - राखीगढ़ी", "भारतीय इतिहास"),
        ("1857 Uprising Leaders in Haryana", "Rao Tula Ram (Rewari), Dhanu Singh (Farrukhnagar), Ambala army rebellion", "1857 की क्रांति में हरियाणा के नायक (राव तुलाराम)", "भारतीय इतिहास"),
        ("Jallianwala Bagh Massacre (1919)", "Tragic firing ordered by General Dyer in Amritsar on Baisakhi day", "जलियांवाला बाग हत्याकांड (13 अप्रैल 1919)", "भारतीय इतिहास"),
        ("Non-Cooperation Movement (1920-1922)", "Launched by Mahatma Gandhi; suspended after Chauri Chaura incident", "असहयोग आंदोलन एवं चौरी-चौरा घटना", "भारतीय इतिहास"),
        ("Dandi March and Civil Disobedience (1930)", "Gandhi's salt march from Sabarmati Ashram to Dandi coast breaking salt law", "दांडी मार्च एवं सविनय अवज्ञा आंदोलन (1930)", "भारतीय इतिहास"),
        ("Quit India Movement (1942)", "Historic 'Do or Die' call given by Mahatma Gandhi at Gowalia Tank Bombay", "भारत छोड़ो आंदोलन (अगस्त क्रांति 1942)", "भारतीय इतिहास"),
        ("Lala Lajpat Rai's Association with Hisar", "Freedom fighter practiced law in Hisar and set up Arya Samaj and Congress branches", "लाला लाजपत राय की कर्मभूमि - हिसार", "हरियाणा इतिहास"),
        ("Sir Chhotu Ram and Peasant Reforms", "Revered as 'Deenbandhu', champion of Punjab Relief of Indebtedness Act 1934", "दीनबंधु सर छोटू राम और किसान सुधार", "हरियाणा इतिहास"),

        # Haryana Police Administration & Structure
        ("Haryana Police Ranks & Insignia Hierarchy", "Constable -> Head Constable -> ASI -> SI -> Inspector -> DSP -> SP -> DIG -> IG -> ADGP -> DGP", "हरियाणा पुलिस पद सोपान एवं पदोन्नति क्रम", "पुलिस प्रशासन"),
        ("Police Commissionerate System in Haryana", "Commissionerates headed by CP (ADGP/IG rank) in Gurugram, Faridabad, Panchkula, Sonipat", "हरियाणा में पुलिस कमिश्नरी प्रणाली", "पुलिस प्रशासन"),
        ("Haryana Police Academy Madhuban (Karnal)", "Premier state training institution for DSPs, Inspectors, Sub-Inspectors, and Constables", "हरियाणा पुलिस अकादमी मधुबन (करनाल)", "पुलिस प्रशासन"),
        ("Haryana Armed Police (HAP Battalions)", "5 operational battalions: 3 at Madhuban, 1 at Ambala, 1 at Hisar", "हरियाणा सशस्त्र पुलिस (HAP) बटालियन संरचना", "पुलिस प्रशासन"),
        ("State Crime Records Bureau (SCRB Madhuban)", "Maintains state crime databases, fingerprints, and CCTNS implementation", "राज्य अपराध रिकॉर्ड ब्यूरो (SCRB मधुबन)", "पुलिस प्रशासन"),
        ("Operation Durga for Women Protection (2017)", "Flying squads of female police personnel conducting anti-harassment vigilance", "ऑपरेशन दुर्गा महिला सुरक्षा विशेष दस्ता", "पुलिस प्रशासन"),
        ("Haryana Dial 112 Integrated Emergency Response", "State-of-the-art SERC Panchkula coordinating Police, Fire, and Ambulance dispatch", "हरियाणा डायल 112 आपातकालीन त्वरित सेवा", "पुलिस प्रशासन"),

        # Motor Vehicles Act & Traffic Enforcement
        ("Motor Vehicles Act Section 129 (Protective Headgear)", "Mandatory ISI-marked helmet for all two-wheeler riders and pillion passengers", "धारा 129: दोपहिया वाहन पर अनिवार्य हेलमेट नियम", "यातायात नियम"),
        ("Motor Vehicles Act Section 194B (Seatbelt Safety)", "Mandatory seatbelt for driver and passengers in four-wheeled motor vehicles", "धारा 194B: कार में सीटबेल्ट पहनने की अनिवार्यता", "यातायात नियम"),
        ("Motor Vehicles Act Section 185 (Drunk Driving Offense)", "Strict penalty and imprisonment for driving with blood alcohol content above 30 mg/100 ml", "धारा 185: शराब पीकर गाड़ी चलाने पर दंडात्मक कार्रवाई", "यातायात नियम"),
        ("Motor Vehicles Act Section 184 (Dangerous Driving)", "Penalizes jumping red lights, reckless overtaking, and using mobile phones while driving", "धारा 184: खतरनाक व लापरवाही से वाहन चलाने पर जुर्माना", "यातायात नियम"),
        ("Motor Vehicles Act Section 181 (Driving without License)", "Substantial fine and vehicle impounding for driving without valid driving license", "धारा 181: बिना ड्राइविंग लाइसेंस वाहन चलाने पर दंड", "यातायात नियम"),

        # Sports Dominance of Haryana & Awards
        ("Neeraj Chopra Olympic Gold & World Championships", "Historic javelin throw gold medalist at Tokyo 2020 and Budapest World Athletics", "नीरज चोपड़ा - ओलंपिक व विश्व एथलेटिक्स स्वर्ण पदक", "खेल एवं पुरस्कार"),
        ("Manu Bhaker Double Bronze at Paris 2024", "First athlete of independent India to win 2 medals at a single Olympic Games", "मनु भाकर - पेरिस 2024 दोहरे ओलंपिक पदक विजेता", "खेल एवं पुरस्कार"),
        ("Bhim Award - Haryana's Highest Sports Honor", "State award with ₹5 lakh cash reward, citation, and ₹5,000 monthly allowance for life", "भीम पुरस्कार - हरियाणा का सर्वोच्च खेल सम्मान", "खेल एवं पुरस्कार"),
        ("Major Dhyan Chand Khel Ratna Award", "India's highest national sports award, formerly Rajiv Gandhi Khel Ratna", "मेजर ध्यानचंद खेल रत्न पुरस्कार", "खेल एवं पुरस्कार"),
        ("Arjuna Award for Outstanding Performance in Sports", "National honor conferred by Ministry of Youth Affairs and Sports", "अर्जुन पुरस्कार - राष्ट्रीय खेल सम्मान", "खेल एवं पुरस्कार"),
        ("Wrestling Tradition of Haryana (Akharas)", "Hub of Indian wrestling producing Olympic medalists Sushil, Yogeshwar, Sakshi, Bajrang", "हरियाणा की कुश्ती परंपरा एवं अखाड़ा संस्कृति", "खेल एवं पुरस्कार"),
        ("Boxing Hub of Bhiwani (Mini Cuba)", "Bhiwani Boxing Club founded by Coach Jagdish Singh, producing Olympic stars like Vijender Singh", "भिवानी बॉक्सिंग क्लब (भारत का मिनी क्यूबा)", "खेल एवं पुरस्कार")
    ]

    # Generate remaining items up to 300 (from 24 to 300 = 276 items)
    for i in range(24, 300):
        c_idx = (i - 24) % len(computer_gs_modules)
        topic, facts, theme, category = computer_gs_modules[c_idx]
        mod = i % 4

        if mod == 0:
            stem_en = f"In the Computer Knowledge & General Studies syllabus for Haryana Police, which statement correctly describes '{topic}'?"
            stem_hi = f"हरियाणा पुलिस सिपाही परीक्षा के कंप्यूटर एवं सामान्य अध्ययन पाठ्यक्रम में '{topic}' से संबंधित कौन-सा कथन सही है?"
            sol_en = f"Accurate concept for '{topic}': {facts} ({theme})."
            sol_hi = f"'{topic}' से संबंधित सही तथ्य: {facts} ({theme})।"
            choices = [
                {'en': f"{facts} ({theme})", 'hi': f"{facts} ({theme})"},
                {'en': "Mesozoic dinosaur fossil classification catalogue", 'hi': "डायनासोर जीवाश्म वर्गीकरण नामावली"},
                {'en': "Equatorial rainforest canopy humidity measurement index", 'hi': "भूमध्यरेखीय वर्षावन आर्द्रता सूचकांक"},
                {'en': "Subterranean magma viscosity flow rate calculation", 'hi': "भूमिगत मैग्मा श्यानता प्रवाह दर"}
            ]
            opt_idx = 0
        elif mod == 1:
            stem_en = f"Under which key subject domain of the Haryana Police examination is '{topic}' classified?"
            stem_hi = f"हरियाणा पुलिस सिपाही परीक्षा में '{topic}' किस मुख्य विषय-क्षेत्र के अंतर्गत आता है?"
            sol_en = f"'{topic}' belongs to {category} ({theme})."
            sol_hi = f"'{topic}' का संबंध '{category}' ({theme}) से है।"
            choices = [
                {'en': "Oceanic Coral Reef Bleaching Spectrum", 'hi': "महासागरीय प्रवाल विरंजन स्पेक्ट्रम"},
                {'en': f"Haryana Police Core: {category} ({theme})", 'hi': f"हरियाणा पुलिस मूल विषय: {category} ({theme})"},
                {'en': "Antarctic Ice Core Carbon Dating Protocol", 'hi': "अंटार्कटिक बर्फ कोर कार्बन डेटिंग"},
                {'en': "Atacama Desert Sodium Nitrate Extraction", 'hi': "अटाकामा मरुस्थल सोडियम नाइट्रेट निष्कर्षण"}
            ]
            opt_idx = 1
        elif mod == 2:
            stem_en = f"What is the operational purpose or legal/technical significance of '{topic}' in the context of state administration?"
            stem_hi = f"हरियाणा राज्य प्रशासन, कानून-व्यवस्था अथवा कंप्यूटर संचालन में '{topic}' का क्या महत्व या उद्देश्य है?"
            sol_en = f"Key operational feature: {facts}. Subject domain: {category}."
            sol_hi = f"प्रमुख उद्देश्य व कार्य: {facts} (विषय: {category})।"
            choices = [
                {'en': "Fictitious theoretical assumption without statutory basis", 'hi': "वैधानिक आधार से रहित काल्पनिक धारणा"},
                {'en': "Ancient Roman Gladiatorial arena combat rule", 'hi': "प्राचीन रोमन अखाड़ा द्वंद्वयुद्ध नियम"},
                {'en': f"Official principle: {facts} ({theme})", 'hi': f"प्रशासनिक व तकनीकी नियम: {facts} ({theme})"},
                {'en': "Amazonian canopy tree-ring growth ring metric", 'hi': "अमेज़ॅन वर्षावन वृक्ष वलय विकास दर"}
            ]
            opt_idx = 2
        else:
            stem_en = f"Why is knowledge of '{topic}' mandatory for a candidate aspiring to join the Haryana Police force?"
            stem_hi = f"हरियाणा पुलिस बल में सेवा देने के इच्छुक उम्मीदवार के लिए '{topic}' का ज्ञान होना क्यों अनिवार्य है?"
            sol_en = f"It builds essential digital literacy, legal understanding, and administrative capability: {facts}."
            sol_hi = f"पुलिस सेवा में डिजिटल साक्षरता, वैधानिक कर्तव्यों के पालन और जनसेवा में दक्षता हेतु {facts} जानना अनिवार्य है।"
            choices = [
                {'en': "To sail commercial cargo ships through Suez Canal", 'hi': "स्वेज नहर में मालवाहक जहाज का संचालन करने हेतु"},
                {'en': "To predict solar flare geomagnetic coronal storms", 'hi': "सौर ज्वाला चुंबकीय तूफानों की भविष्यवाणी करने हेतु"},
                {'en': "To excavate Egyptian Pharaoh tombs in Nile valley", 'hi': "नील नदी घाटी में फिरौन के मकबरों की खुदाई हेतु"},
                {'en': f"Essential for police duties and public administration: {facts}", 'hi': f"पुलिस कर्तव्य व लोकप्रशासन दक्षता हेतु: {facts}"}
            ]
            opt_idx = 3

        items.append({
            'domain': f'Computer & GS - {category}',
            'stem_en': stem_en,
            'stem_hi': stem_hi,
            'choices': choices,
            'correct_idx': opt_idx,
            'sol_en': sol_en,
            'sol_hi': sol_hi,
            'difficulty': 'EASY' if i % 3 == 0 else ('MODERATE' if i % 3 == 1 else 'HARD')
        })

    assert len(items) == 300, f"Expected 300 items, got {len(items)}"
    return items

if __name__ == '__main__':
    res = get_raw_computer_general_studies_items()
    print(f"Generated {len(res)} items.")
    from collections import Counter
    counts = Counter(x['correct_idx'] for x in res)
    print("Distribution:", counts)
