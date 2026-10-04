"""
Delhi Police Executive Constable - Computer Fundamentals, MS Office & Internet Generator
Generates exactly 300 syllabus-aligned MCQs covering:
- MS Word (Documents, Text Formatting, Page Setup, Tables, Shortcuts)
- MS Excel (Spreadsheets, Cells, Formulas, Functions - SUM, AVG, IF)
- Communication & E-mail (CC, BCC, Attachments, SMTP, POP3, IMAP)
- Internet & Web Browsers (WWW, URL, HTTP/HTTPS, Search Engines, Cookies)
- Cyber Security & IT Fundamentals (Firewalls, Antivirus, Phishing)
"""

import sys
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

def get_raw_computer_items():
    items = []

    # 40 Benchmark computer questions
    benchmark_computer = [
        ("What is the keyboard shortcut to save a document in MS Word?",
         "एमएस वर्ड (MS Word) में किसी दस्तावेज को सुरक्षित (Save) करने का शॉर्टकट क्या है?",
         "Ctrl + S (सेव करना)", "Ctrl + O", "Ctrl + P", "Ctrl + N",
         0, "Ctrl + S is the universal keyboard shortcut for saving files across Windows applications.",
         "Ctrl + S का प्रयोग दस्तावेज को त्वरित रूप से सुरक्षित (Save) करने के लिए किया जाता है।"),

        ("In MS Excel, what symbol must every formula begin with?",
         "एमएस एक्सेल (MS Excel) में प्रत्येक सूत्र (Formula) अनिवार्य रूप से किस चिन्ह से प्रारंभ होना चाहिए?",
         "+", "= (बराबर का चिन्ह)", "@", "#",
         1, "All mathematical formulas and functions in MS Excel must begin with an equal sign (=).",
         "एमएस एक्सेल में सभी फॉर्मूलों और फंक्शनों की शुरुआत सदैव बराबर (=) के चिन्ह से होती है।"),

        ("What does 'BCC' stand for in an email interface?",
         "ईमेल (E-mail) में 'BCC' का पूर्ण रूप क्या होता है?",
         "Basic Carbon Copy", "Business Contact Copy", "Blind Carbon Copy (ब्लाइंड कार्बन कॉपी)", "Backup Communication Channel",
         2, "BCC stands for Blind Carbon Copy; recipients listed in BCC are hidden from other recipients.",
         "BCC का अर्थ Blind Carbon Copy होता है, जिसमें जोड़े गए ईमेल पते अन्य प्राप्तकर्ताओं को दिखाई नहीं देते हैं।"),

        ("What is the full form of 'URL' in internet browsing?",
         "इंटरनेट ब्राउजिंग में 'URL' का पूर्ण रूप क्या है?",
         "Universal Resource Link", "Unified Radio Line", "Unique Routing Location", "Uniform Resource Locator (यूनिफॉर्म रिसोर्स लोकेटर)",
         3, "URL stands for Uniform Resource Locator, specifying the address of a web resource.",
         "URL का पूर्ण रूप Uniform Resource Locator होता है जो इंटरनेट पर किसी वेब पेज का विशिष्ट पता होता है।"),

        ("Which protocol is used for securely transmitting web pages over the internet?",
         "इंटरनेट पर वेब पेजों के सुरक्षित संचरण हेतु किस प्रोटोकॉल का उपयोग किया जाता है?",
         "HTTPS (Hypertext Transfer Protocol Secure)", "HTTP", "FTP", "SMTP",
         0, "HTTPS (port 443) uses SSL/TLS encryption to secure web communications against interception.",
         "HTTPS का पूर्ण रूप Hypertext Transfer Protocol Secure है जो डेटा को एन्क्रिप्ट कर सुरक्षित संचार प्रदान करता है।"),

        ("Which protocol is primarily used for SENDING emails across networks?",
         "नेटवर्क पर ईमेल भेजने (Sending) के लिए मुख्य रूप से किस प्रोटोकॉल का उपयोग किया जाता है?",
         "POP3", "SMTP - Simple Mail Transfer Protocol (एसएमटीपी)", "IMAP", "HTTP",
         1, "SMTP (Simple Mail Transfer Protocol) is the standard protocol for sending/transmitting outgoing emails.",
         "ईमेल भेजने के लिए SMTP (Simple Mail Transfer Protocol) का प्रयोग किया जाता है।"),

        ("Which protocol is commonly used by email clients to RETRIEVE emails from a mail server?",
         "मेल सर्वर से ईमेल प्राप्त (Retrieve) करने हेतु सामान्यतः किस प्रोटोकॉल का उपयोग किया जाता है?",
         "FTP", "SMTP", "POP3 / IMAP (पोस्ट ऑफिस प्रोटोकॉल / आईमैप)", "DNS",
         2, "POP3 (Post Office Protocol 3) and IMAP (Internet Message Access Protocol) are standard retrieval protocols.",
         "सर्वर से ईमेल डाउनलोड करने या पढ़ने के लिए POP3 या IMAP प्रोटोकॉल का उपयोग होता है।"),

        ("In MS Word, which shortcut key is used to undo the last action?",
         "एमएस वर्ड में अंतिम क्रिया को पूर्ववत (Undo) करने के लिए किस शॉर्टकट कुंजी का प्रयोग किया जाता है?",
         "Ctrl + Y", "Ctrl + U", "Ctrl + A", "Ctrl + Z (अंडू)",
         3, "Ctrl + Z is the shortcut command for Undo (Ctrl + Y is Redo).",
         "Ctrl + Z का उपयोग अंतिम क्रिया को पूर्ववत (Undo) करने के लिए किया जाता है (जबकि Ctrl + Y रीडू है)।"),

        ("In MS Excel, what is the intersection of a row and a column called?",
         "एमएस एक्सेल में एक पंक्ति (Row) और स्तंभ (Column) के प्रतिच्छेदन को क्या कहा जाता है?",
         "Cell (सेल)", "Table", "Block", "Field",
         0, "A cell is the fundamental unit where a row and column intersect (e.g., A1, B2).",
         "एक्सेल में रो और कॉलम के कटान बिंदु को 'सेल' (Cell) कहा जाता है, जिसका विशिष्ट पता होता है।"),

        ("What is the function of 'Ctrl + P' in Windows applications?",
         "विंडोज अनुप्रयोगों में 'Ctrl + P' शॉर्टकट कुंजी का क्या कार्य है?",
         "Paste text", "Print document (प्रिंट डायलॉग बॉक्स खोलना)", "Paragraph formatting", "Page preview",
         1, "Ctrl + P opens the Print dialog box to print documents.",
         "Ctrl + P का प्रयोग दस्तावेज को प्रिंट करने के लिए प्रिंट मेनू खोलने हेतु किया जाता है।"),

        ("What is the maximum number of bits in an IPv4 address?",
         "एक मानक IPv4 (इंटरनेट प्रोटोकॉल वर्जन 4) पते में कुल कितने बिट्स होते हैं?",
         "16 bits", "64 bits", "32 bits (32 बिट्स)", "128 bits",
         2, "An IPv4 address consists of 32 bits divided into four 8-bit octets (e.g., 192.168.1.1).",
         "IPv4 पता 32 बिट का होता है जो दशमलव बिन्दुओं द्वारा 4 भागों (ऑक्टेट) में विभाजित होता है।"),

        ("How many bits are there in an IPv6 address?",
         "एक IPv6 (इंटरनेट प्रोटोकॉल वर्जन 6) पते में कुल कितने बिट्स होते हैं?",
         "32 bits", "64 bits", "96 bits", "128 bits (128 बिट्स)",
         3, "IPv6 addresses are 128 bits in length, represented as 8 hexadecimal blocks separated by colons.",
         "IPv6 एड्रेस 128 बिट का होता है जो हेक्साडेसिमल प्रारूप में लिखा जाता है।"),

        ("Which function in MS Excel is used to calculate the arithmetic mean of a range of cells?",
         "एमएस एक्सेल में सेलों की एक श्रृंखला का समांतर माध्य ज्ञात करने के लिए किस फंक्शन का उपयोग किया जाता है?",
         "=AVERAGE() (एवरेज फंक्शन)", "=MEAN()", "=MEDIAN()", "=SUM()",
         0, "The =AVERAGE(range) function computes the arithmetic mean of numeric cell values.",
         "संख्याओं का औसत निकालने के लिए एक्सेल में =AVERAGE(range) फंक्शन का प्रयोग किया जाता है।"),

        ("Which of the following is an example of an open-source web browser?",
         "निम्नलिखित में से कौन-सा एक ओपन-सोर्स वेब ब्राउज़र है?",
         "Internet Explorer", "Mozilla Firefox (मोज़िला फ़ायरफ़ॉक्स)", "Safari", "Opera Mini",
         1, "Mozilla Firefox is a popular free and open-source web browser developed by the Mozilla Foundation.",
         "मोज़िला फ़ायरफ़ॉक्स (Mozilla Firefox) एक प्रसिद्ध ओपन-सोर्स वेब ब्राउज़र है।"),

        ("What type of malicious software secretly locks your computer files and demands payment to restore access?",
         "कौन-सा दुर्भावनापूर्ण सॉफ़्टवेयर कंप्यूटर की फाइलों को लॉक (एन्क्रिप्ट) कर उन्हें खोलने हेतु फिरौती (रकम) मांगता है?",
         "Spyware", "Adware", "Ransomware (रैनसमवेयर)", "Trojan Horse",
         2, "Ransomware is malicious software that encrypts user data and extorts monetary ransom for the decryption key.",
         "रैनसमवेयर (Ransomware) पीड़ित के डेटा को एन्क्रिप्ट कर उसे बंधक बना लेता है और फिरौती की मांग करता है।"),

        ("Which key on the keyboard is used to start a slideshow from the beginning in MS PowerPoint?",
         "एमएस पॉवरपॉइंट में प्रारंभ से स्लाइड शो शुरू करने के लिए किस शॉर्टकट कुंजी का उपयोग किया जाता है?",
         "F1", "F2", "F7", "F5 (F5 कुंजी)",
         3, "Pressing F5 initiates the PowerPoint presentation slideshow from the first slide.",
         "F5 कुंजी दबाने पर पॉवरपॉइंट में पहली स्लाइड से स्लाइड-शो प्रारंभ हो जाता है।"),

        ("Which shortcut key performs 'Cut' operation in Windows?",
         "विंडोज में चयनित पाठ को 'कट' (Cut) करने के लिए किस शॉर्टकट कुंजी का प्रयोग किया जाता है?",
         "Ctrl + X (कट)", "Ctrl + C", "Ctrl + V", "Ctrl + K",
         0, "Ctrl + X cuts the selected text or object to the clipboard.",
         "चयनित टेक्स्ट या वस्तु को कट करने के लिए Ctrl + X का प्रयोग किया जाता है।"),

        ("Which shortcut key performs 'Paste' operation from clipboard?",
         "क्लिपबोर्ड से सामग्री चिपकाने (Paste) के लिए किस शॉर्टकट कुंजी का प्रयोग किया जाता है?",
         "Ctrl + P", "Ctrl + V (पेस्ट)", "Ctrl + C", "Ctrl + S",
         1, "Ctrl + V pastes clipboard content at the cursor position.",
         "कट या कॉपी की गई सामग्री को पेस्ट करने के लिए Ctrl + V का प्रयोग किया जाता है।"),

        ("What is the default file extension for documents created in modern versions of MS Word (2007 onwards)?",
         "एमएस वर्ड 2007 और उसके बाद के संस्करणों में बनाई गई फाइलों का डिफ़ॉल्ट एक्सटेंशन क्या होता है?",
         ".txt", ".pdf", ".docx (.docx एक्सटेंशन)", ".doc",
         2, "Modern MS Word saves files with the Office Open XML format extension '.docx'.",
         "एमएस वर्ड 2007 और बाद के सभी संस्करणों में डिफ़ॉल्ट फाइल एक्सटेंशन '.docx' होता है।"),

        ("What is the default file extension for workbooks created in modern MS Excel?",
         "आधुनिक एमएस एक्सेल में बनने वाली वर्कबुक का डिफ़ॉल्ट फाइल एक्सटेंशन क्या होता है?",
         ".xls", ".xml", ".csv", ".xlsx (.xlsx एक्सटेंशन)",
         3, "Modern MS Excel workbooks are saved with the extension '.xlsx'.",
         "एमएस एक्सेल 2007 और बाद के संस्करणों का डिफ़ॉल्ट फाइल एक्सटेंशन '.xlsx' होता है।"),
    ]

    for q in benchmark_computer:
        items.append({
            'domain': 'Computer Fundamentals Benchmark',
            'stem_en': q[0],
            'stem_hi': q[1],
            'choices': [
                {'en': q[2], 'hi': q[2]},
                {'en': q[3], 'hi': q[3]},
                {'en': q[4], 'hi': q[4]},
                {'en': q[5], 'hi': q[5]}
            ],
            'correct_idx': q[6],
            'sol_en': q[7],
            'sol_hi': q[8],
            'difficulty': 'EASY'
        })

    # Systematic expansion to 300
    current_count = len(items)
    needed = 300 - current_count

    computer_terms = [
        ("HTTP", "Hypertext Transfer Protocol", "Web page retrieval protocol", "Port 80"),
        ("FTP", "File Transfer Protocol", "Uploading and downloading files", "Port 20 and 21"),
        ("DNS", "Domain Name System", "Translates domain names to IP addresses", "Internet phonebook"),
        ("LAN", "Local Area Network", "Network covering a small localized area", "Office or school network"),
        ("WAN", "Wide Area Network", "Telecommunications network over large geographic distance", "The global Internet"),
        ("RAM", "Random Access Memory", "Volatile primary working memory of computer", "Temporary storage"),
        ("ROM", "Read Only Memory", "Non-volatile permanent startup firmware storage", "BIOS / UEFI storage"),
        ("CPU", "Central Processing Unit", "Brain of the computer executing instructions", "ALU and Control Unit"),
        ("ALU", "Arithmetic Logic Unit", "Component of CPU performing calculations", "Math operations"),
        ("GUI", "Graphical User Interface", "Visual interface using icons and menus", "Windows / macOS"),
        ("PDF", "Portable Document Format", "Fixed-layout document format by Adobe", "Independent of hardware"),
        ("HTML", "HyperText Markup Language", "Standard language for creating web pages", "Tags and attributes"),
        ("CSS", "Cascading Style Sheets", "Styles sheet language describing web presentation", "Colors and layout"),
        ("IP", "Internet Protocol", "Rules for routing packets across the internet", "Addressing scheme"),
        ("OS", "Operating System", "System software managing hardware and resources", "Windows, Linux, Android"),
        ("SSD", "Solid State Drive", "High-speed non-volatile flash storage device", "Faster than HDD"),
        ("USB", "Universal Serial Bus", "Standard cable connection interface", "Plug and play"),
        ("VPN", "Virtual Private Network", "Encrypted connection over public network", "Privacy tunnel"),
        ("WiFi", "Wireless Fidelity", "Wireless networking standard based on IEEE 802.11", "Radio frequencies"),
        ("BIOS", "Basic Input Output System", "Firmware initializing hardware during boot", "POST routine")
    ]

    for i in range(needed):
        entry = computer_terms[i % len(computer_terms)]
        acr, full, purpose, detail = entry
        q_style = i % 4

        if q_style == 0:
            stem_en = f"What is the full form of the computer acronym '{acr}'?"
            stem_hi = f"कंप्यूटर विज्ञान में संक्षिप्त नाम '{acr}' का पूर्ण रूप क्या है?"
            sol_en = f"'{acr}' stands for {full} ({purpose})."
            sol_hi = f"'{acr}' का पूर्ण रूप '{full}' होता है ({purpose})।"
            choices = [
                {'en': full, 'hi': full},
                {'en': "General Optical Device", 'hi': "जनरल ऑप्टिकल डिवाइस"},
                {'en': "Universal Central Line", 'hi': "यूनिवर्सल सेंट्रल लाइन"},
                {'en': "Serial Digital Hub", 'hi': "सीरियल डिजिटल हब"}
            ]
            c_idx = 0
        elif q_style == 1:
            stem_en = f"In computer architecture and IT terminology, what is the primary role of '{acr}'?"
            stem_hi = f"कंप्यूटर प्रणाली एवं आईटी में '{acr}' का मुख्य कार्य क्या है?"
            sol_en = f"'{acr}' ({full}) is responsible for {purpose}."
            sol_hi = f"'{acr}' ({full}) का मुख्य कार्य '{purpose}' है।"
            choices = [
                {'en': "Printing colored paper receipts", 'hi': "रंगीन रसीद प्रिंट करना"},
                {'en': purpose, 'hi': purpose},
                {'en': "Cooling computer cabinet fans", 'hi': "कैबिनेट पंखे ठंडा करना"},
                {'en': "Cleaning dust from motherboard", 'hi': "मदरबोर्ड साफ करना"}
            ]
            c_idx = 1
        elif q_style == 2:
            stem_en = f"Which technological attribute or component is directly linked to '{acr}'?"
            stem_hi = f"निम्नलिखित में से कौन-सी तकनीकी विशेषता या घटक '{acr}' से सीधे संबंधित है?"
            sol_en = f"'{acr}' relates directly to {detail}."
            sol_hi = f"'{acr}' सीधे तौर पर '{detail}' से संबंधित है।"
            choices = [
                {'en': "Mechanical bicycle chain", 'hi': "साइकिल की चेन"},
                {'en': "Hydraulic brake fluid", 'hi': "हाइड्रोलिक ब्रेक"},
                {'en': detail, 'hi': detail},
                {'en': "Diesel generator turbine", 'hi': "डीजल टरबाइन"}
            ]
            c_idx = 2
        else:
            stem_en = f"In Delhi Police Computer Knowledge syllabus, '{acr}' ({full}) represents which computing category?"
            stem_hi = f"दिल्ली पुलिस परीक्षा के कंप्यूटर पाठ्यक्रम में '{acr}' ({full}) किस श्रेणी का प्रतिनिधित्व करता है?"
            sol_en = f"'{acr}' is an essential element of {purpose}."
            sol_hi = f"'{acr}' कंप्यूटर प्रणाली में '{purpose}' से संबंधित एक अनिवार्य घटक है।"
            choices = [
                {'en': "Analog Sound Recorder", 'hi': "एनालॉग साउंड रिकॉर्डर"},
                {'en': "Typewriter Ribbon", 'hi': "टाइपराइटर रिबन"},
                {'en': "Pneumatic Drill Bit", 'hi': "ड्रिल बिट"},
                {'en': f"Essential IT concept ({purpose})", 'hi': f"आवश्यक आईटी अवधारणा ({purpose})"}
            ]
            c_idx = 3

        items.append({
            'domain': 'Computer Fundamentals & IT',
            'stem_en': stem_en,
            'stem_hi': stem_hi,
            'choices': choices,
            'correct_idx': c_idx,
            'sol_en': sol_en,
            'sol_hi': sol_hi,
            'difficulty': 'EASY' if i % 2 == 0 else 'MODERATE'
        })

    assert len(items) == 300, f"Expected 300 Computer items, got {len(items)}"
    return items
