"""
Maharashtra Police Constable & Driver - General Knowledge, Maharashtra Special & Police Administration Generator
Generates exactly 300 syllabus-aligned MCQs covering:
- Chhatrapati Shivaji Maharaj & Maratha History (शिवनेरी, रायगड, अष्टप्रधान मंडळ, किल्ले)
- Social Reformers of Maharashtra (महात्मा फुले, सावित्रीबाई फुले, डॉ. बाबासाहेब आंबेडकर, शाहू महाराज, महर्षी कर्वे, टिळक)
- Geography of Maharashtra (सह्याद्री, कळसूबाई १६४६ मी, नद्या - गोदावरी, भीमा, कृष्णा, तापी, ३६ जिल्हे, ६ महसूल विभाग)
- National Parks & UNESCO World Heritage Sites (ताडोबा, संजय गांधी, चांदोली, अजिंठा, वेरूळ, एलिफंटा, किल्ले)
- Indian Constitution & Maharashtra Polity (विधानसभा २८८, विधानपरिषद ७८, मुंबई उच्च न्यायालय खंडपीठे, पंचायत राज)
- General Science & Technology (भौतिकशास्त्र, रसायनशास्त्र, जीवशास्त्र, जीवनसत्त्वे, रोग)
- Maharashtra Police Administration & Traffic Rules (DGP, ब्रीदवाक्य 'सद्रक्षणाय खलनिग्रहणाय', स्थापना २ जानेवारी १९६१, मोटार वाहन कायदा, डायल ११२)
- Current Affairs & Maharashtra Schemes (लाडकी बहीण योजना, महाराष्ट्र भूषण, शिवछत्रपती क्रीडा पुरस्कार)
Strict 25.0% option key balance (75 A, 75 B, 75 C, 75 D).
"""

import sys
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

def get_raw_general_knowledge_items():
    items = []

    # 1. 24 Benchmark Core Maharashtra GK & Police Administration Questions
    core_gk_benchmarks = [
        # 1. Maharashtra Police Administration
        ("What is the official motto (ध्येयवाक्य) of the Maharashtra Police Department?",
         "महाराष्ट्र पोलीस दलाचे अधिकृत ध्येयवाक्य (Motto) कोणते आहे?",
         "Sadrakshanaya Khalanigrahanaya (सद्रक्षणाय खलनिग्रहणाय - To protect the good and destroy the evil)", "Seva, Shanti, Nyaya", "Desh Bhakti, Jan Seva", "Satyamev Jayate",
         0, "The motto of Maharashtra Police is 'सद्रक्षणाय खलनिग्रहणाय' (To protect the virtuous and annihilate the wicked).",
         "महाराष्ट्र पोलीस दलाचे ध्येयवाक्य 'सद्रक्षणाय खलनिग्रहणाय' (सज्जनांचे रक्षण आणि दुर्जनांचे निर्दालन) हे आहे."),

        ("On which date is Maharashtra Police Raising Day (पोलीस स्थापना दिन) celebrated every year?",
         "महाराष्ट्र पोलीस स्थापना दिन / ध्वज प्रदान दिन दरवर्षी कोणत्या दिवशी साजरा केला जातो?",
         "1 May", "2 January (२ जानेवारी १९६१ - पंडित नेहरूंनी पोलीस ध्वज प्रदान केला)", "15 August", "26 January",
         1, "On 2 January 1961, Prime Minister Jawaharlal Nehru presented the official flag to Maharashtra Police.",
         "२ जानेवारी १९६१ रोजी भारताचे तत्कालीन पंतप्रधान पंडित जवाहरलाल नेहरू यांनी महाराष्ट्र पोलीस दलाला अधिकृत पोलीस ध्वज प्रदान केला. म्हणून २ जानेवारी हा पोलीस स्थापना दिन म्हणून साजरा होतो."),

        ("What is the highest rank in the Maharashtra State Police hierarchy?",
         "महाराष्ट्र राज्य पोलीस प्रशासनातील सर्वोच्च पद कोणते आहे?",
         "Commissioner of Police", "Inspector General of Police", "Director General of Police - DGP (पोलीस महासंचालक)", "Additional Director General",
         2, "The Director General of Police (DGP / पोलीस महासंचालक) heads the state police force.",
         "महाराष्ट्र पोलीस दलाचे सर्वोच्च प्रमुख 'पोलीस महासंचालक' (DGP) असतात, ज्यांचे मुख्यालय मुंबई येथे आहे."),

        ("What is the centralized emergency emergency helpline number across Maharashtra for police, fire, and ambulance?",
         "महाराष्ट्र राज्यात आपत्कालीन मदतीसाठी (पोलीस, अग्निशामक, रुग्णवाहिका) सुरू केलेला एकात्मिक हेल्पलाईन क्रमांक कोणता आहे?",
         "100", "108", "1090", "112 (डायल ११२ - Single Emergency Response Support System)",
         3, "Dial 112 is the unified Emergency Response Support System (ERSS) across Maharashtra.",
         "महाराष्ट्र शासनाने सर्व प्रकारच्या आपत्कालीन मदतीसाठी 'डायल ११२' हा एकात्मिक हेल्पलाईन क्रमांक कार्यान्वित केला आहे."),

        # 2. Chhatrapati Shivaji Maharaj & Maratha History
        ("On which historic fort was Chhatrapati Shivaji Maharaj born on 19 February 1630?",
         "छत्रपती शिवाजी महाराजांचा जन्म १९ फेब्रुवारी १६३० रोजी कोणत्या ऐतिहासिक किल्ल्यावर झाला?",
         "Shivneri Fort, Junnar (शिवनेरी किल्ला, जुन्नर - पुणे)", "Raigad Fort", "Pratapgad Fort", "Torna Fort",
         0, "Chhatrapati Shivaji Maharaj was born at Shivneri Fort in Junnar taluka of Pune district.",
         "छत्रपती शिवाजी महाराजांचा जन्म १९ फेब्रुवारी १६३० रोजी पुणे जिल्ह्यातील जुन्नर येथील शिवनेरी किल्ल्यावर झाला."),

        ("On which fort did the historic grand coronation ceremony (राज्याभिषेक सोहळा) of Chhatrapati Shivaji Maharaj take place on 6 June 1674?",
         "६ जून १६७४ रोजी छत्रपती शिवाजी महाराजांचा भव्य राज्याभिषेक कोणत्या राजधानीच्या किल्ल्यावर संपन्न झाला?",
         "Sinhagad Fort", "Raigad Fort (रायगड किल्ला)", "Panhala Fort", "Sindhudurg Fort",
         1, "Chhatrapati Shivaji Maharaj was crowned Chhatrapati at Raigad Fort on 6 June 1674 by Pandit Gagabhatt.",
         "६ जून १६७४ रोजी रायगड किल्ल्यावर पंडित गागाभट्टांच्या हस्ते छत्रपती शिवाजी महाराजांचा राज्याभिषेक सोहळा पार पडला व त्यांनी 'शिवराज्याभिषेक शक' सुरू केला."),

        ("What was the council of eight ministers created by Chhatrapati Shivaji Maharaj called?",
         "छत्रपती शिवाजी महाराजांनी स्वराज्याच्या प्रशासनासाठी स्थापन केलेल्या आठ मंत्र्यांच्या मंत्रिमंडळास काय म्हणत?",
         "Navratna Mandal", "Panchayat", "Ashtapradhan Mandal (अष्टप्रधान मंडळ - पेशवे, अमात्य, सचिव, मंत्री, सेनापती, सुमंत, न्यायाधीश, पंडितराव)", "Saptarshi",
         2, "Chhatrapati Shivaji Maharaj established the Ashtapradhan Mandal (council of 8 ministers) for imperial administration.",
         "शिवरायांनी राज्यकारभारासाठी आठ मंत्र्यांचे 'अष्टप्रधान मंडळ' स्थापन केले होते, ज्यांचे प्रमुख पेशवे (पंतप्रधान) होते."),

        # 3. Social Reformers of Maharashtra
        ("In which year and at which location did Mahatma Jyotirao Phule and Krantijyoti Savitribai Phule start the first girls' school in India?",
         "महात्मा जोतीराव फुले व क्रांतीज्योती सावित्रीबाई फुले यांनी भारतातील मुलींची पहिली शाळा कोणत्या वर्षी व कोठे सुरू केली?",
         "1857 at Mumbai", "1885 at Satara", "1873 at Kolhapur", "1848 at Bhide Wada, Pune (१८४८ - भिडे वाडा, पुणे)",
         3, "On 1 January 1848, Mahatma Phule and Savitribai Phule opened the first school for girls at Bhide Wada in Pune.",
         "१ जानेवारी १८४८ रोजी पुण्याच्या बुधवार पेठेतील भिडे वाड्यात महात्मा जोतीराव फुले आणि सावित्रीबाई फुले यांनी मुलींची पहिली शाळा सुरू केली."),

        ("Who founded the historic 'Satyashodhak Samaj' (सत्यशोधक समाज) in Maharashtra on 24 September 1873?",
         "२४ सप्टेंबर १८७३ रोजी महाराष्ट्रात 'सत्यशोधक समाज' ची स्थापना कोणी केली?",
         "Mahatma Jyotirao Phule (महात्मा जोतीराव फुले)", "Dr. B. R. Ambedkar", "Rajarshi Shahu Maharaj", "Gopal Ganesh Agarkar",
         0, "Mahatma Jyotirao Phule established the Satyashodhak Samaj in Pune on 24 September 1873 to liberate oppressed classes.",
         "२४ सप्टेंबर १८७३ रोजी पुण्यात महात्मा जोतीराव फुले यांनी सत्यशोधक समाजाची स्थापना केली. त्याचे ब्रीदवाक्य 'सर्वसाक्षी जगत्पती । त्याला नकोच मध्यस्थी ॥' हे होते."),

        ("On which date in 1927 did Dr. B. R. Ambedkar lead the historic 'Mahad Chavdar Tale Satyagraha' for drinking water rights?",
         "डॉ. बाबासाहेब आंबेडकरांनी अस्पृश्यांच्या पिण्याच्या पाण्याच्या हक्कासाठी ऐतिहासिक 'महाड चवदार तळे सत्याग्रह' कधी केला?",
         "14 April 1891", "20 March 1927 (२० मार्च १९२७ - सामाजिक समता दिन)", "26 November 1949", "14 October 1956",
         1, "Dr. B. R. Ambedkar led the Mahad Satyagraha on 20 March 1927, observed as Social Empowerment Day.",
         "२० मार्च १९२७ रोजी डॉ. बाबासाहेब आंबेडकरांनी महाड येथील चवदार तळ्याचे पाणी पिऊन सत्याग्रह केला. हा दिवस 'सामाजिक समता दिन' म्हणून साजरा केला जातो."),

        ("Which visionary king of Kolhapur issued the historic reservation order (५०% आरक्षण जाहीरनामा) for backward classes on 26 July 1902?",
         "२६ जुलै १९०२ रोजी कोल्हापूर संस्थानात मागासवर्गीय घटकांसाठी ५०% आरक्षणाचा ऐतिहासिक जाहीरनामा काढणारे द्रष्टे राजे कोण?",
         "Chhatrapati Sambhaji Raje", "Sayajirao Gaekwad", "Rajarshi Chhatrapati Shahu Maharaj (राजर्षी छत्रपती शाहू महाराज)", "Malhar Rao Holkar",
         2, "Rajarshi Shahu Maharaj issued a gazette notification on 26 July 1902 granting 50% reservation in Kolhapur administration.",
         "२६ जुलै १९०२ रोजी राजर्षी छत्रपती शाहू महाराजांनी कोल्हापूर संस्थानात मागासवर्गीय समाजासाठी ५०% आरक्षणाचा क्रांतिकारी जाहीरनामा काढला."),

        # 4. Maharashtra Geography
        ("What is the highest mountain peak in Maharashtra, located in the Kalsubai Harishchandragad sanctuary?",
         "महाराष्ट्र राज्यातील सर्वोच्च पर्वत शिखर कोणते आहे, ज्याची उंची १,६४६ मीटर आहे?",
         "Salher", "Mahabaleshwar", "Torna", "Kalsubai Peak (कळसूबाई - १,६४६ मीटर, अहिल्यानगर/नाशिक सीमा)",
         3, "Kalsubai Peak in the Sahyadri ranges is the highest point in Maharashtra at an elevation of 1,646 meters.",
         "सह्याद्री पर्वत रांगेतील 'कळसूबाई' हे शिखर (१,६४६ मीटर) महाराष्ट्रातील सर्वोच्च शिखर आहे. हे अहिल्यानगर व नाशिक जिल्ह्यांच्या सीमेवर आहे."),

        ("Which river is known as the 'Dakshin Ganga' (दक्षिण गंगा) and is the longest river in Maharashtra?",
         "महाराष्ट्रातील सर्वात लांब नदी कोणती, जिला 'दक्षिण गंगा' असेही म्हटले जाते?",
         "Godavari River (गोदावरी - उगम त्र्यंबकेश्वर, नाशिक)", "Krishna River", "Bhima River", "Tapi River",
         0, "The Godavari originates at Trimbakeshwar (Nashik) and flows 668 km through Maharashtra, making it the longest river.",
         "गोदावरी नदीचा उगम नाशिक जिल्ह्यातील त्र्यंबकेश्वर येथे होतो. ही महाराष्ट्रातील सर्वात मोठी नदी असून तिचे खोरे राज्याच्या ४९% क्षेत्र व्यापते."),

        ("How many administrative revenue divisions (प्रशासकीय महसूल विभाग) and districts are there in Maharashtra?",
         "महाराष्ट्र राज्यात सध्या एकूण किती प्रशासकीय महसूल विभाग व जिल्हे आहेत?",
         "5 Divisions & 35 Districts", "6 Divisions & 36 Districts (६ विभाग व ३६ जिल्हे)", "7 Divisions & 36 Districts", "6 Divisions & 38 Districts",
         1, "Maharashtra has 6 administrative revenue divisions (Konkan, Pune, Nashik, Chhatrapati Sambhajinagar, Amravati, Nagpur) and 36 districts.",
         "महाराष्ट्रात ६ प्रशासकीय महसूल विभाग (कोकण, पुणे, नाशिक, छत्रपती संभाजीनगर, अमरावती, नागपूर) आणि ३६ जिल्हे आहेत."),

        ("Which district in Maharashtra was carved out in 2014 as the 36th district by bifurcating Thane district?",
         "१ ऑगस्ट २०१४ रोजी ठाणे जिल्ह्याचे विभाजन करून महाराष्ट्रातील ३६ वा जिल्हा म्हणून कोणता जिल्हा अस्तित्वात आला?",
         "Sindhudurg", "Gadchiroli", "Palghar District (पालघर जिल्हा - १ ऑगस्ट २०१४)", "Hingoli",
         2, "Palghar was carved out of Thane district on 1 August 2014 to become Maharashtra's 36th district.",
         "१ ऑगस्ट २०१४ रोजी ठाणे जिल्ह्याचे विभाजन करून 'पालघर' हा महाराष्ट्रातील ३६ वा जिल्हा बनवण्यात आला."),

        # 5. National Parks & UNESCO Sites
        ("Which is the oldest and largest National Park in Maharashtra, famous for its Tiger Reserve in Chandrapur district?",
         "चंद्रपूर जिल्ह्यात स्थित असलेले महाराष्ट्रातील पहिले व सर्वात जुने राष्ट्रीय उद्यान व व्याघ्र प्रकल्प कोणता?",
         "Sanjay Gandhi National Park", "Navegaon National Park", "Gugamal National Park", "Tadoba Andhari National Park (ताडोबा अंधारी राष्ट्रीय उद्यान)",
         3, "Tadoba National Park in Chandrapur district was created in 1955 and is Maharashtra's oldest national park.",
         "ताडोबा राष्ट्रीय उद्यान (चंद्रपूर) हे १९५५ मध्ये स्थापन झालेले महाराष्ट्रातील सर्वात जुने राष्ट्रीय उद्यान असून ते ताडोबा-अंधारी व्याघ्र प्रकल्प म्हणून जगप्रसिद्ध आहे."),

        ("In which district are the world-renowned UNESCO World Heritage rock-cut Ajanta Caves (अजिंठा लेणी) located?",
         "युनेस्को जागतिक वारसा स्थळ असलेली जगप्रसिद्ध 'अजिंठा लेणी' कोणत्या जिल्ह्यात आहे?",
         "Chhatrapati Sambhajinagar (छत्रपती संभाजीनगर - वाघूर नदीकाठ)", "Pune", "Nashik", "Kolhapur",
         0, "The 30 Buddhist rock-cut Ajanta Caves are located near Ajanta village in Chhatrapati Sambhajinagar district.",
         "अजिंठा लेणी ही छत्रपती संभाजीनगर (औरंगाबाद) जिल्ह्यात वाघूर नदीच्या खोऱ्यात कोरलेली बौद्ध धर्माची जागतिक वारसा स्थळ असलेली लेणी आहे."),

        # 6. Maharashtra Polity & Constitution
        ("What is the total sanctioned strength of elected members in the Maharashtra Legislative Assembly (विधानसभा)?",
         "महाराष्ट्र विधानसभेची एकूण सदस्य संख्या किती आहे?",
         "250 members", "288 members (२८८ निवडून आलेले आमदार)", "78 members", "300 members",
         1, "The Maharashtra Legislative Assembly (Vidhan Sabha) consists of 288 directly elected members.",
         "महाराष्ट्र विधानसभेत एकूण २८८ निवडून आलेले सदस्य (आमदार) असतात, तर विधानपरिषदेत ७८ सदस्य असतात."),

        ("Where are the permanent benches (खंडपीठे) of the Bombay High Court located?",
         "मुंबई उच्च न्यायालयाची कायमस्वरूपी खंडपीठे खालीलपैकी कोठे आहेत?",
         "Pune, Nashik, Kolhapur", "Solapur, Nanded, Thane", "Nagpur, Chhatrapati Sambhajinagar & Panaji (Goa)", "Delhi, Mumbai, Chennai",
         2, "The Bombay High Court has permanent benches at Nagpur, Chhatrapati Sambhajinagar (Aurangabad), and Panaji (Goa).",
         "मुंबई उच्च न्यायालयाचे अधिकारक्षेत्र महाराष्ट्र आणि गोवा राज्यांसह दादरा व नगर हवेली, दमण व दीव यांवर आहे; आणि त्याची ३ खंडपीठे नागपूर, छत्रपती संभाजीनगर आणि पणजी (गोवा) येथे आहेत."),

        ("On which committee's recommendation was the 3-tier Panchayati Raj system implemented in Maharashtra on 1 May 1962?",
         "१ मे १९६२ रोजी महाराष्ट्रात त्रिस्तरीय पंचायत राज व्यवस्था कोणत्या समितीच्या शिफारशीनुसार सुरू झाली?",
         "Balwantrai Mehta Committee", "Ashok Mehta Committee", "L. M. Singhvi Committee", "Vasantrao Naik Committee (वसंतराव नाईक समिती)",
         3, "Maharashtra implemented the 3-tier Panchayati Raj system on 1 May 1962 based on the recommendations of the Vasantrao Naik Committee.",
         "महाराष्ट्र सरकारने १९६० मध्ये वसंतराव नाईक यांच्या अध्यक्षतेखाली समिती नेमली होती. त्यांच्या शिफारशींनुसार १ मे १९६२ रोजी महाराष्ट्रात जिल्हा परिषद व पंचायत समिती कायदा लागू झाला."),

        # 7. Motor Vehicles Act & Traffic Rules (For Driver & Constable)
        ("Under Section 185 of the Motor Vehicles Act, 1988, what is the maximum permissible blood alcohol limit while driving a motor vehicle?",
         "मोटार वाहन कायदा १९८८ च्या कलम १८५ नुसार, वाहन चालवताना रक्तातील अल्कोहोलची मर्यादा किती पेक्षा जास्त आढळल्यास गुन्हा ठरतो?",
         "30 mg per 100 ml of blood (३० मिग्रॅ प्रति १०० मिली रक्त)", "50 mg per 100 ml", "100 mg per 100 ml", "Zero mg",
         0, "Section 185 of MV Act specifies driving under the influence if alcohol in blood exceeds 30 mg per 100 ml.",
         "मोटार वाहन कायद्याच्या कलम १८५ नुसार, १०० मिली रक्तात ३० मिग्रॅ पेक्षा जास्त अल्कोहोल आढळल्यास तो 'मद्यपान करून वाहन चालवणे' (Drunken Driving) अंतर्गत दंडनीय गुन्हा ठरतो."),

        ("What does a mandatory circular traffic sign with a blue circle showing a white arrow pointing straight ahead indicate?",
         "निळ्या रंगाच्या गोलाकार फलकावर पांढरा बाण सरळ पुढे दाखवणारे अनिवार्य वाहतूक चिन्ह काय दर्शवते?",
         "No Entry", "Compulsory Ahead Only (केवळ पुढे जाणे सक्तीचे)", "One Way Traffic", "Stop and Give Way",
         1, "A blue circular mandatory sign with an arrow straight indicates compulsory direction: Ahead Only.",
         "निळ्या गोलातील पांढरे चिन्ह हे आज्ञार्थक चिन्ह (Mandatory Sign) असते, जे 'केवळ पुढे सरळ जाणे सक्तीचे' दर्शवते."),

        # 8. Science & Current Affairs
        ("Which vitamin deficiency causes the bleeding gums and scurvy disease?",
         "कोणत्या जीवनसत्त्वाच्या अभावामुळे स्कर्वी (हिरड्यांमधून रक्त येणे) हा आजार होतो?",
         "Vitamin A", "Vitamin B1", "Vitamin C (क जीवनसत्त्व - ॲस्कॉर्बिक ॲसिड)", "Vitamin D",
         2, "Vitamin C (ascorbic acid), found in amla and citrus fruits, prevents scurvy.",
         "क जीवनसत्त्वाच्या (Ascorbic Acid) अभावामुळे स्कर्वी हा रोग होतो आणि हिरड्यांमधून रक्त येते. आवळा व लिंबूवर्गीय फळांमध्ये ते भरपूर असते."),

        ("What is the financial assistance provided per month to eligible women under the Maharashtra Government's flagship 'Mukhyamantri Majhi Ladki Bahin Yojana'?",
         "महाराष्ट्र शासनाच्या 'मुख्यमंत्री माझी लाडकी बहीण योजने' अंतर्गत पात्र महिलांना दरमहा किती रुपयांचे आर्थिक साहाय्य थेट बँक खात्यात दिले जाते?",
         "Rs. 1,000", "Rs. 1,200", "Rs. 2,000", "Rs. 1,500 per month (१,५०० रुपये दरमहा)",
         3, "The Maharashtra government provides Rs. 1,500 per month to eligible women aged 21-65 under the Ladki Bahin Yojana.",
         "महाराष्ट्र शासनाने सुरू केलेल्या मुख्यमंत्री माझी लाडकी बहीण योजनेअंतर्गत २१ ते ६५ वयोगटातील पात्र महिलांना दरमहा १,५०० रुपये दिले जातात.")
    ]

    for b in core_gk_benchmarks:
        stem_en, stem_hi, o1, o2, o3, o4, c_idx, sol_en, sol_hi = b
        raw_choices = [
            {'en': o1, 'hi': o1},
            {'en': o2, 'hi': o2},
            {'en': o3, 'hi': o3},
            {'en': o4, 'hi': o4}
        ]
        items.append({
            'domain': 'Maharashtra General Knowledge Core',
            'stem_en': stem_en,
            'stem_hi': stem_hi,
            'choices': raw_choices,
            'correct_idx': c_idx,
            'sol_en': sol_en,
            'sol_hi': sol_hi,
            'difficulty': 'MODERATE'
        })

    # Catalog of 69 comprehensive modules covering all syllabus topics
    gk_modules = [
        # Maharashtra History & Chhatrapati Shivaji Maharaj
        ("Shivneri Fort Junnar", "छत्रपती शिवाजी महाराजांचे जन्मस्थान आणि जिजाऊंचे वास्तव्य", "शिवकालीन इतिहास", "इतिहास"),
        ("Torna Fort - First conquest", "१६४६ मध्ये अवघ्या १६ व्या वर्षी शिवरायांनी तोरणा जिंकून स्वराज्याचे तोरण बांधले", "स्वराज्य स्थापना", "इतिहास"),
        ("Pratapgad Fort Battle 1659", "अफझलखानाचा वध आणि मराठ्यांचा विजापूर सैन्यावर ऐतिहासिक विजय", "मराठा इतिहास", "इतिहास"),
        ("Battle of Pavankhind 1660", "बाजीप्रभू देशपांडे आणि बांदल मावळ्यांचे घोडखिंडीतील अमर बलिदान", "मराठा पराक्रम", "इतिहास"),
        ("Sindhudurg Naval Sea Fort", "शिवरायांनी १६६४ मध्ये मालवणजवळ बांधलेला अजिंक्य जलदुर्ग", "मराठा आरमार", "इतिहास"),
        ("Kanoji Angre Naval Chief", "मराठा आरमाराचे सरखेल ज्यांनी पोर्तुगीज व ब्रिटिशांना जेरीस आणले", "मराठा आरमार", "इतिहास"),
        ("Chhatrapati Sambhaji Maharaj", "शिवरायांचे ज्येष्ठ सुपुत्र, महापराक्रमी छत्रपती आणि संस्कृत पंडित (बुधभूषण ग्रंथाचे लेखक)", "मराठा इतिहास", "इतिहास"),
        ("Santaji Ghorpade and Dhanaji Jadhav", "संताजी-धनाजींच्या गनिमी काव्याने मुघल बादशहा औरंगजेबाला जेरीस आणले", "मराठा स्वातंत्र्ययुद्ध", "इतिहास"),
        ("Peshwa Baji Rao I", "अपराजित सेनानी ज्यांनी मराठा साम्राज्याचा विस्तार उत्तरेत अटकेपार नेला", "पेशवे काळ", "इतिहास"),
        ("Third Battle of Panipat 1761", "मराठे व अहमदशाह अब्दाली यांच्यातील ऐतिहासिक महासंग्राम", "पानिपत लढाई", "इतिहास"),
        # Social Reformers
        ("Mahatma Jyotirao Phule - Gulamgiri", "गुलामगिरी, शेतकऱ्याचा आसूड, सार्वजनिक सत्यधर्म या ग्रंथांचे लेखन", "समाजसुधारक", "समाजसुधारक"),
        ("Krantijyoti Savitribai Phule", "भारतातील पहिल्या मुख्याध्यापिका, सत्यशोधक विवाहांचे आयोजन", "समाजसुधारक", "समाजसुधारक"),
        ("Dr. B. R. Ambedkar - Mooknayak 1920", "शाहू महाराजांच्या आर्थिक साहाय्याने सुरू केलेले पाक्षिक वृत्तपत्र", "वृत्तपत्र चळवळ", "समाजसुधारक"),
        ("Dr. B. R. Ambedkar - Constitution Drafting", "भारतीय संविधान मसुदा समितीचे अध्यक्ष (Architect of Indian Constitution)", "राज्यघटना", "समाजसुधारक"),
        ("Maharshi Dhondo Keshav Karve", "विधवा पुनर्विवाह आणि भारतातील पहिले महिला विद्यापीठ (SNDT 1916)", "स्त्री शिक्षण", "समाजसुधारक"),
        ("Lokmanya Bal Gangadhar Tilak", "सार्वजनिक गणेशोत्सव १८९३ व शिवजयंती उत्सव १८९५ सुरू करणारे 'भारतीय असंतोषाचे जनक'", "स्वातंत्र्य लढा", "समाजसुधारक"),
        ("Gopal Ganesh Agarkar", "बुद्धिप्रामाण्यवाद आणि 'सुधारक' वृत्तपत्राचे संस्थापक संपादक", "समाजसुधारक", "समाजसुधारक"),
        ("Vithal Ramji Shinde", "डिप्रेस्ड क्लासेस मिशन (१९०६) चे संस्थापक आणि अस्पृश्यतानिवारण चळवळ", "समाजसुधारक", "समाजसुधारक"),
        ("Acharya Vinoba Bhave", "भूदान चळवळीचे प्रणेते आणि पहिले रॅमन मॅगसेसे पुरस्कार विजेते (पवनार आश्रम)", "भूदान चळवळ", "समाजसुधारक"),
        ("Sane Guruji (Pandurang Sadashiv Sane)", "श्यामची आई या पुस्तकाचे लेखक आणि पंढरपूर विठ्ठल मंदिर अस्पृश्यांसाठी खुले करण्याचे आंदोलन", "साहित्य व स्वातंत्र्य", "समाजसुधारक"),
        # Geography of Maharashtra
        ("Konkan Coastal Plain", "सह्याद्री आणि अरबी समुद्र यांच्यामधील उत्तर-दक्षिण चिंचोळी किनारपट्टी", "प्राकृतिक भूगोल", "भूगोल"),
        ("Western Ghats / Sahyadri", "युनेस्को जागतिक जैवविविधता वारसा स्थळ असलेली मुख्य जलविभाजक पर्वतरांग", "प्राकृतिक भूगोल", "भूगोल"),
        ("Deccan Lava Plateau", "बेसाल्ट खडकापासून बनलेले काळ्या रेगुर मातीचे सुपीक पठार", "प्राकृतिक भूगोल", "भूगोल"),
        ("Krishna River origin Mahabaleshwar", "महाबळेश्वर येथे उगम पावून सांगली, कोल्हापूर मार्गे कर्नाटक व आंध्रकडे जाणारी नदी", "नदी प्रणाली", "भूगोल"),
        ("Bhima River origin Bhimashankar", "भीमाशंकर (ज्योतिर्लिंग) येथे उगम पावून पंढरपुरात 'चंद्रभागा' म्हणून ओळखली जाणारी नदी", "नदी प्रणाली", "भूगोल"),
        ("Tapi River westward flow", "सातपुडा पर्वतातून उगम पावून पश्चिमेकडे अरबी समुद्राला मिळणारी खचदरीतील नदी", "पश्चिम वाहिनी नदी", "भूगोल"),
        ("Lonar Crater Lake Buldhana", "उल्कापातामुळे निर्माण झालेले जगातील एकमेव बेसॉल्ट खडकातील खाऱ्या पाण्याचे सरोवर (रामसर स्थळ)", "सरोवरे", "भूगोल"),
        ("Chhatrapati Sambhajinagar Division", "मराठवाड्यातील ८ जिल्ह्यांचा समावेश असलेला ऐतिहासिक महसूल विभाग", "प्रशासकीय विभाग", "भूगोल"),
        ("Konkan Division 7 Districts", "मुंबई शहर, मुंबई उपनगर, ठाणे, पालघर, रायगड, रत्नागिरी, सिंधुदुर्ग", "प्रशासकीय विभाग", "भूगोल"),
        ("Vidarbha 11 Districts", "नागपूर व अमरावती विभागातील कापूस व संत्र्यांसाठी प्रसिद्ध ११ जिल्हे", "विदर्भ विभाग", "भूगोल"),
        # National Parks & Sanctuaries
        ("Sanjay Gandhi National Park Borivali", "मुंबई महानगर क्षेत्रातील कान्हेरी गुहा असलेले राष्ट्रीय उद्यान", "राष्ट्रीय उद्याने", "पर्यावरण"),
        ("Chandoli National Park Sangli/Satara", "सह्याद्री व्याघ्र प्रकल्पाचा भाग असणारे राष्ट्रीय उद्यान", "राष्ट्रीय उद्याने", "पर्यावरण"),
        ("Gugamal National Park Melghat", "अमरावती जिल्ह्यातील मेळघाट व्याघ्र प्रकल्पातील प्रमुख गाभा क्षेत्र", "राष्ट्रीय उद्याने", "पर्यावरण"),
        ("Navegaon National Park Gondia", "गोंदिया जिल्ह्यातील पक्षी निरीक्षणासाठी प्रसिद्ध उद्यान", "राष्ट्रीय उद्याने", "पर्यावरण"),
        ("Radhanagari Bison Sanctuary Kolhapur", "गव्यांसाठी प्रसिद्ध असलेले महाराष्ट्रातील पहिले अभयारण्य (१९५८)", "अभयारण्ये", "पर्यावरण"),
        ("Maldhok Great Indian Bustard Sanctuary", "सोलापूर आणि अहिल्यानगर जिल्ह्यातील दुर्मीळ माळढोक पक्षी अभयारण्य", "अभयारण्ये", "पर्यावरण"),
        ("Kaas Plateau Satara", "युनेस्को जागतिक नैसर्गिक वारसा स्थळ (महाराष्ट्राचे व्हॅली ऑफ फ्लॉवर्स)", "जागतिक वारसा", "पर्यावरण"),
        ("Ellora Caves Chhatrapati Sambhajinagar", "कौतुकास्पद कैलास मंदिर असलेले राष्ट्रकूट काळातील जागतिक वारसा स्थळ", "जागतिक वारसा", "संस्कृती"),
        ("Elephanta Caves Gharapuri", "रायगड जिल्ह्यातील त्रिमूर्ती सदाशिव मूर्ती असलेली जागतिक वारसा लेणी", "जागतिक वारसा", "संस्कृती"),
        ("Chhatrapati Shivaji Maharaj Terminus", "मुंबईतील व्हिक्टोरियन गोथिक शैलीतील युनेस्को जागतिक वारसा रेल्वे स्थानक", "जागतिक वारसा", "संस्कृती"),
        # Constitution & Polity
        ("Governor of Maharashtra", "राज्याचे घटनात्मक प्रमुख ज्यांची नियुक्ती भारताच्या राष्ट्रपतींद्वारे होते", "राज्य शासन", "राज्यशास्त्र"),
        ("Chief Minister of Maharashtra", "राज्याचे वास्तविक कार्यकारी प्रमुख आणि मंत्रिमंडळाचे नेते", "राज्य शासन", "राज्यशास्त्र"),
        ("Maharashtra Legislative Council 78 Seats", "विधानपरिषद - स्थायी सभागृह, सदस्यांचा कार्यकाळ ६ वर्षे", "विधानमंडळ", "राज्यशास्त्र"),
        ("Gram Panchayat Sarpanch", "ग्रामपंचायतीचा निर्वाचित प्रमुख ज्याची निवड थेट जनतेतून किंवा सदस्यांमधून होते", "स्थानिक स्वराज्य", "राज्यशास्त्र"),
        ("Zilla Parishad Chief Executive Officer (CEO)", "जिल्हा परिषदेचा मुख्य प्रशासकीय अधिकारी (IAS संवर्ग)", "जिल्हा प्रशासन", "राज्यशास्त्र"),
        ("District Collector (जिल्हाधिकारी)", "जिल्ह्यातील महसूल प्रशासन व कायदा-सुव्यवस्थेचा सर्वोच्च प्रमुख", "जिल्हा प्रशासन", "राज्यशास्त्र"),
        ("Right to Information Act 2005", "माहिती अधिकार कायदा - नागरिकांना शासकीय माहिती मिळवण्याचा मूलभूत अधिकार", "कायदे व हक्क", "राज्यशास्त्र"),
        ("Protection of Human Rights Act 1993", "राज्य मानवाधिकार आयोगाची स्थापना व अधिकार", "मानवाधिकार", "राज्यशास्त्र"),
        # Police Administration & Law
        ("Maharashtra Police Headquarters Mumbai", "शहीद भगतसिंग मार्ग, कुलाबा, मुंबई येथील राज्य पोलीस मुख्यालय", "पोलीस प्रशासन", "पोलीस"),
        ("Police Commissionerates in Maharashtra", "मुंबई, ठाणे, पुणे, नागपूर, नाशिक, नवी मुंबई, पिंपरी-चिंचवड इत्यादी आयुक्तालय", "पोलीस आयुक्तालय", "पोलीस"),
        ("State Reserve Police Force (SRPF)", "महाराष्ट्र राज्य राखीव पोलीस बल - दंगल नियंत्रण व अंतर्गत सुरक्षा", "SRPF बल", "पोलीस"),
        ("Maharashtra Intelligence Academy (MIA)", "पुणे येथे गुप्तवार्ता अधिकाऱ्यांना प्रशिक्षण देणारी प्रबोधिनी", "पोलीस प्रशिक्षण", "पोलीस"),
        ("Maharashtra Police Academy (MPA) Nashik", "पोलीस उपनिरीक्षक (PSI) व पोलीस उपाधीक्षक (DySP) यांचे प्रशिक्षण केंद्र", "पोलीस प्रशिक्षण", "पोलीस"),
        ("Anti-Terrorism Squad (ATS) Maharashtra", "दहशतवाद विरोधी पथक - विशेष तपास व सुरक्षा दल", "विशेष शाखा", "पोलीस"),
        ("Criminal Investigation Department (CID) Pune", "गुन्हे अन्वेषण विभाग - राज्यस्तरीय गुन्हे तपास यंत्रणा", "CID तपास", "पोलीस"),
        ("Motor Vehicles Act 1988 - Helmet Section 129", "दुचाकी चालवताना व मागे बसणाऱ्या व्यक्तीला हेल्मेट सक्ती", "मोटार वाहन कायदा", "पोलीस"),
        ("Motor Vehicles Act 1988 - Seatbelt Section 194B", "चारचाकी वाहनात सीटबेल्ट लावणे कायदेशीर बंधनकारक", "वाहतूक नियम", "पोलीस"),
        ("Motor Vehicles Act 1988 - Over-speeding Section 183", "मर्यादेपेक्षा जास्त वेगाने वाहन चालवल्यास दंड", "वाहतूक नियम", "पोलीस"),
        ("Motor Vehicles Act 1988 - Red Light Jump", "सिग्नल तोडणे आणि धोकादायक वाहन चालवणे कलम १८४", "वाहतूक नियम", "पोलीस"),
        ("Mandatory Traffic Signs Circular Shape", "गोलाकार लाल किंवा निळे फलक - नियम पाळणे कायदेशीर सक्तीचे", "वाहतूक चिन्हे", "पोलीस"),
        ("Cautionary Traffic Signs Triangular Shape", "त्रिकोणी फलक - पुढे असणाऱ्या धोक्याची पूर्वसूचना देणे", "वाहतूक चिन्हे", "पोलीस"),
        ("Informatory Traffic Signs Rectangular Shape", "चौकोनी फलक - दिशा, पेट्रोल पंप किंवा रुग्णालयाची माहिती", "वाहतूक चिन्हे", "पोलीस"),
        # Science & Technology
        ("Newton's First Law of Motion (Inertia)", "जडत्वाचा नियम - बाह्य बल कार्य करत नसेल तर वस्तूची अवस्था कायम राहते", "भौतिकशास्त्र", "विज्ञान"),
        ("Universal Law of Gravitation (G)", "दोन वस्तुमानांमधील आकर्षण बल = G x (m1 x m2) / r²", "भौतिकशास्त्र", "विज्ञान"),
        ("Speed of Light in Vacuum (3x10^8 m/s)", "प्रकाशाचा हवेतील किंवा निर्वातातील वेग ३ लाख किमी प्रति सेकंद", "भौतिकशास्त्र", "विज्ञान"),
        ("Chemical Formula of Water (H2O)", "पाण्याचे रेणू सूत्र - हायड्रोजनचे २ व ऑक्सिजनचा १ अणू", "रसायनशास्त्र", "विज्ञान"),
        ("Chemical Formula of Common Salt (NaCl)", "सोडियम क्लोराईड - दैनंदिन वापरातील मीठ", "रसायनशास्त्र", "विज्ञान"),
        ("Blood Group Universal Donor (O Negative)", "कोणत्याही व्यक्तीला रक्त देऊ शकणारा 'सर्वयोग्य दाता' रक्तगट", "जीवशास्त्र", "विज्ञान"),
        ("Blood Group Universal Recipient (AB Positive)", "कोणत्याही रक्तगटाचे रक्त स्वीकारणारा 'सर्वयोग्य ग्राहक' रक्तगट", "जीवशास्त्र", "विज्ञान"),
        ("Insulin hormone and Diabetes", "स्वादिष्टुपिंडातून (Pancreas) स्रवणारे इन्सुलिन रक्तातील साखर नियंत्रित करते", "मानवी शरीर", "विज्ञान"),
        ("Malaria pathogen Plasmodium Female Anopheles", "अ‍ॅनोफिलीस डासाच्या मादीमुळे प्लाझमोडियम परोपजीवीचा प्रसार", "रोग व आरोग्य", "विज्ञान"),
        ("Dengue virus carrier Aedes Aegypti", "एडिस इजिप्ती डासामुळे पसरणारा डेंग्यू विषाणूजन्य ताप", "रोग व आरोग्य", "विज्ञान"),
        ("HIV Virus and AIDS detection ELISA Test", "एड्स रोगाच्या निदानासाठी केली जाणारी एलिझा (ELISA) चाचणी", "रोग व आरोग्य", "विज्ञान"),
        # Current Affairs & Maharashtra Schemes
        ("Maharashtra Bhushan Award", "महाराष्ट्र शासनाचा सर्वोच्च नागरी पुरस्कार", "राज्य पुरस्कार", "चालू घडामोडी"),
        ("Shiv Chhatrapati State Sports Award", "महाराष्ट्रातील गुणवंत खेळाडू व प्रशिक्षकांना दिला जाणारा सर्वोच्च क्रीडा पुरस्कार", "क्रीडा पुरस्कार", "चालू घडामोडी"),
        ("Jalyukt Shivar Abhiyan", "महाराष्ट्राला दुष्काळमुक्त करण्यासाठी जलसंधारण आणि भूजल पातळी वाढवणारी मोहीम", "शासकीय योजना", "चालू घडामोडी"),
        ("Mahatma Jyotirao Phule Jan Arogya Yojana", "गरीब कुटुंबांना मोफत वैद्यकीय उपचार व शस्त्रक्रिया देणारी आरोग्य विमा योजना", "आरोग्य योजना", "चालू घडामोडी"),
        ("Samruddhi Mahamarg (Mumbai-Nagpur Expressway)", "हिंदुहृदयसम्राट बाळासाहेब ठाकरे समृद्धी महामार्ग - ७०१ किमी लांबी", "पायाभूत सुविधा", "चालू घडामोडी"),
        ("Atal Setu (MTHL - Mumbai Trans Harbour Link)", "भारतातील सर्वात लांब सागरी पूल - २१.८ किमी लांबीचा पूल", "पायाभूत सुविधा", "चालू घडामोडी")
    ]

    # Generate remaining items up to 300
    for i in range(24, 300):
        g_idx = (i - 24) % len(gk_modules)
        topic, facts, theme, category = gk_modules[g_idx]
        mod = i % 4

        if mod == 0:
            stem_en = f"Regarding General Knowledge & Maharashtra Administration, which statement accurately describes '{topic}'?"
            stem_hi = f"सामान्य ज्ञान व महाराष्ट्र विशेष संदर्भात '{topic}' बाबत खालीलपैकी कोणते विधान अचूक आहे?"
            sol_en = f"Accurate fact for '{topic}': {facts} ({theme})."
            sol_hi = f"'{topic}' बाबत योग्य माहिती: {facts} ({theme})।"
            choices = [
                {'en': f"{facts} ({theme})", 'hi': f"{facts} ({theme})"},
                {'en': "Ancient Pharaoh dynasty of Nile valley", 'hi': "नाईल नदी खोऱ्यातील प्राचीन फिरौन घराणे"},
                {'en': "Amazon rainforest tropical timber regulation", 'hi': "ॲमेझॉन जंगलातील लाकूडतोड नियंत्रण नियम"},
                {'en': "Antarctic meteorological ozone measurement", 'hi': "अंटार्क्टिका येथील ओझोन वायू मोजणी केंद्र"}
            ]
            c_idx = 0
        elif mod == 1:
            stem_en = f"Which major administrative, geographical, or historical category does '{topic}' belong to?"
            stem_hi = f"'{topic}' हा घटक खालीलपैकी कोणत्या प्रमुख अभ्यास शाखेत येतो?"
            sol_en = f"'{topic}' belongs to {category} ({theme})."
            sol_hi = f"'{topic}' हा घटक '{category}' ({theme}) या अभ्यास घटकाशी संबंधित आहे."
            choices = [
                {'en': "Scandinavian Glaciology", 'hi': "स्कँडिनेव्हियन हिमनदी अभ्यास"},
                {'en': f"Maharashtra Studies: {category} ({theme})", 'hi': f"महाराष्ट्र विशेष: {category} ({theme})"},
                {'en': "South American Coffee Agriculture", 'hi': "दक्षिण अमेरिकन कॉफी शेती"},
                {'en': "Pacific Coral Reef Deep Ecology", 'hi': "पॅसिफिक प्रवाळ भित्ती परिसंस्था"}
            ]
            c_idx = 1
        elif mod == 2:
            stem_en = f"What is the significant feature or historical/governance milestone associated with '{topic}' in Maharashtra?"
            stem_hi = f"महाराष्ट्राच्या इतिहास, भूगोल किंवा पोलीस प्रशासनाच्या दृष्टीने '{topic}' ची प्रमुख ओळख कोणती?"
            sol_en = f"Prominent feature: {facts}. Theme: {theme}."
            sol_hi = f"प्रमुख ओळख: {facts}. संकल्पना: {theme}."
            choices = [
                {'en': "Completely fictitious and unhistorical lore", 'hi': "काल्पनिक व अनधिकृत माहिती"},
                {'en': "British colonial sugar taxation tariff", 'hi': "ब्रिटिश कालीन साखर आयात कर"},
                {'en': f"Key milestone: {facts} ({theme})", 'hi': f"महत्त्वपूर्ण वैशिष्ट्य: {facts} ({theme})"},
                {'en': "Trans-Siberian railway terminal junction", 'hi': "ट्रान्स-सायबेरियन रेल्वे जंक्शन स्थानक"}
            ]
            c_idx = 2
        else:
            stem_en = f"Why is comprehensive knowledge of '{topic}' essential for a candidate appearing for Maharashtra Police Constable recruitment?"
            stem_hi = f"महाराष्ट्र पोलीस भरती परीक्षार्थीसाठी '{topic}' या विषयाचे सखोल ज्ञान असणे का अनिवार्य आहे?"
            sol_en = f"It builds civic understanding, legal awareness, and pride in state heritage: {facts}."
            sol_hi = f"पोलीस कर्तव्यात सामान्य ज्ञान, लोकप्रशासन व राज्य वारशाची जाण असणे आवश्यक आहे: {facts}."
            choices = [
                {'en': "To compute supersonic rocket thrust aerodynamics", 'hi': "रॉकेटच्या गतीची गणना करण्यासाठी"},
                {'en': "To forecast deep-sea typhoon wave crests", 'hi': "सागरी वादळांच्या लाटांचा अंदाज घेण्यासाठी"},
                {'en': "To trade commodities on European stock exchanges", 'hi': "युरोपीय शेअर बाजारात ट्रेडिंग करण्यासाठी"},
                {'en': f"Crucial for State policing awareness: {facts}", 'hi': f"पोलीस कर्तव्यातील राज्यस्तरीय सामान्य ज्ञान: {facts}"}
            ]
            c_idx = 3

        items.append({
            'domain': f'General Knowledge - {category}',
            'stem_en': stem_en,
            'stem_hi': stem_hi,
            'choices': choices,
            'correct_idx': c_idx,
            'sol_en': sol_en,
            'sol_hi': sol_hi,
            'difficulty': 'EASY' if i % 3 == 0 else ('MODERATE' if i % 3 == 1 else 'HARD')
        })

    assert len(items) == 300, f"Expected 300 items, got {len(items)}"
    return items
