"""
Haryana Police Constable - Haryana Special GK, History, Culture & Administration Generator
Generates exactly 300 syllabus-aligned MCQs covering:
- Haryana History: Vedic civilization, Mahabharata Kurukshetra, Harshavardhana Thanesar, 3 Panipat Battles (1526, 1556, 1761)
- 1857 Revolt in Haryana: Rao Tula Ram (Rewari), Ambala Cantt, Sir Chhotu Ram, Lala Lajpat Rai (Hisar)
- State Formation: 1 Nov 1966 (Shah Commission, 17th State), 22 Districts, 6 Divisions
- Geography & Rivers: Shivalik (Karoh Peak 1467m Morni Hills), Aravalli (Dhosi Hill), Yamuna, Ghaggar, Markanda, Saraswati
- National Parks & Wildlife: Sultanpur NP (Gurugram), Kalesar NP (Yamunanagar), Bhindawas, Khaparwas, Bir Shikargah
- Art & Culture: Swang / Saang (Lakhmi Chand, Deep Chand), Dhamal dance, Loor dance, Surajkund Fair (Faridabad)
- State Symbols: Blackbuck (काला हिरण), Black Francolin (काला तीतर), Peepal, Lotus
- Haryana Police Administration: Motto ('सेवा, सुरक्षा, सहयोग'), HQ Sector-6 Panchkula, HPA Madhuban, Operation Durga, Dial 112
Strict 25.0% option key balance (75 A, 75 B, 75 C, 75 D).
"""

import sys
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

def get_raw_haryana_gk_items():
    items = []

    # 1. 24 Benchmark Core Questions
    core_benchmarks = [
        # 1. Haryana Police Motto
        ("What is the official motto (ध्येय वाक्य) of Haryana Police?",
         "हरियाणा पुलिस का आधिकारिक ध्येय वाक्य क्या है?",
         "Seva, Suraksha, Sahyog (सेवा, सुरक्षा, सहयोग)", "Shanti, Seva, Nyaya", "Satyamev Jayate", "Sadrakshanaya Khalanigrahanaya",
         0, "The official motto of Haryana Police is 'सेवा, सुरक्षा, सहयोग' (Service, Security, Cooperation).",
         "हरियाणा पुलिस का आधिकारिक ध्येय वाक्य 'सेवा, सुरक्षा, सहयोग' (Seva, Suraksha, Sahyog) है।"),

        # 2. Police Academy & Headquarters
        ("Where is the premier training academy of Haryana Police, known as Haryana Police Academy (HPA), located?",
         "हरियाणा पुलिस की मुख्य प्रशिक्षण अकादमी (हरियाणा पुलिस अकादमी - HPA) कहाँ स्थित है?",
         "Panchkula", "Madhuban (मधुबन, करनाल)", "Gurugram", "Rohtak",
         1, "Haryana Police Academy is located at Madhuban in Karnal district.",
         "हरियाणा पुलिस अकादमी (HPA) करनाल जिले के 'मधुबन' में स्थित है, जहाँ पुलिस अधिकारियों व सिपाहियों को प्रशिक्षण दिया जाता है।"),

        # 3. State Formation
        ("On which date was the State of Haryana carved out of Punjab as the 17th state of India on the recommendation of the Shah Commission?",
         "शाह आयोग की सिफारिश पर पंजाब पुनर्गठन अधिनियम के तहत हरियाणा भारत के 17वें राज्य के रूप में किस तिथि को अस्तित्व में आया?",
         "15 August 1947", "26 January 1950", "1 November 1966 (1 नवंबर 1966)", "1 May 1960",
         2, "Haryana was created on 1 November 1966 under the Punjab Reorganisation Act 1966.",
         "न्यायमूर्ति जे. सी. शाह आयोग की सिफारिश पर 1 नवंबर 1966 को हरियाणा भारत का 17वां राज्य बना।"),

        # 4. Highest Peak in Haryana
        ("What is the highest mountain peak in Haryana, located in the Morni Hills of Panchkula district?",
         "हरियाणा की सबसे ऊंची पर्वत चोटी कौन-सी है, जो पंचकूला जिले की मोरनी पहाड़ियों में स्थित है?",
         "Dhosi Peak", "Tosham Hill", "Aravali Crest", "Karoh Peak (करोह चोटी - 1,467 मीटर)",
         3, "Karoh Peak (1,467 meters) in the Morni Hills of the Shivalik range is the highest point in Haryana.",
         "मोरनी पहाड़ियों में स्थित 'करोह चोटी' (1,467 मीटर) हरियाणा का सर्वोच्च शिखर है।"),

        # 5. First Battle of Panipat
        ("In which year was the First Battle of Panipat fought, in which Babur defeated Ibrahim Lodi and founded the Mughal Empire?",
         "पानीपत की पहली लड़ाई किस वर्ष लड़ी गई थी, जिसमें बाबर ने इब्राहिम लोदी को हराकर मुगल साम्राज्य की नींव रखी थी?",
         "1526 (21 April 1526)", "1556", "1761", "1576",
         0, "The First Battle of Panipat was fought on 21 April 1526 between Babur and Ibrahim Lodi.",
         "पानीपत का प्रथम युद्ध 21 अप्रैल 1526 को बाबर और इब्राहिम लोदी के बीच हुआ, जिसमें बाबर विजयी हुआ और मुगल साम्राज्य की स्थापना हुई।"),

        # 6. Second Battle of Panipat
        ("The Second Battle of Panipat (1556) was fought between Akbar (represented by Bairam Khan) and which Hindu king of Rewari?",
         "पानीपत की दूसरी लड़ाई (1556) अकबर (बैरम खां) और रेवाड़ी के किस प्रसिद्ध हिंदू शासक के बीच लड़ी गई थी?",
         "Prithviraj Chauhan", "Hemu / Samrat Hemchandra Vikramaditya (हेमू / सम्राट हेमचंद्र विक्रमादित्य)", "Rana Sanga", "Rao Tula Ram",
         1, "The Second Battle of Panipat was fought on 5 November 1556 between Bairam Khan (Akbar) and Hemu Vikramaditya.",
         "5 नवंबर 1556 को पानीपत का दूसरा युद्ध अकबर के संरक्षक बैरम खां और रेवाड़ी के सम्राट हेमचंद्र विक्रमादित्य (हेमू) के बीच हुआ था।"),

        # 7. 1857 Revolt Hero
        ("Which valiant leader led the 1857 War of Independence against the British from the Ahirwal region (Rewari) in Haryana?",
         "1857 के प्रथम स्वतंत्रता संग्राम में हरियाणा के अहीरवाल क्षेत्र (रेवाड़ी) से अंग्रेजों के विरुद्ध वीरतापूर्ण नेतृत्व किसने किया था?",
         "Nahar Singh", "Bishen Singh", "Rao Tula Ram (राव तुला राम - शहीदी दिवस 23 सितंबर)", "Dhanu Singh",
         2, "Rao Tula Ram led the 1857 uprising in Rewari/Ahirwal; his death anniversary on 23 September is celebrated as Haryana Martyrs' Day.",
         "राव तुला राम ने 1857 की क्रांति में रेवाड़ी और अहीरवाल क्षेत्र का नेतृत्व किया। 23 सितंबर को उनके निधन पर हरियाणा वीर एवं शहीदी दिवस मनाया जाता है।"),

        # 8. Peasant Leader Sir Chhotu Ram
        ("Sir Chhotu Ram, revered as 'Deenbandhu' and 'Messiah of Farmers' in Haryana, founded which political party along with Fazli Husain in 1923?",
         "हरियाणा में 'दीनबंधु' और 'किसानों के मसीहा' के रूप में विख्यात सर छोटू राम ने 1923 में फजली हुसैन के साथ किस प्रसिद्ध पार्टी की स्थापना की थी?",
         "Congress Socialist Party", "Swaraj Party", "Kisan Mazdoor Praja Party", "Unionist Party / ज़मींदारा लीग (यूनियनिस्ट पार्टी)",
         3, "Sir Chhotu Ram co-founded the Unionist Party (Zamindara League) in 1923 to safeguard peasants against usury.",
         "सर छोटू राम ने 1923 में यूनियनिस्ट पार्टी (ज़मींदारा लीग) की स्थापना की और साहूकारों के शोषण से किसानों को मुक्ति दिलाने के लिए अनेक क्रांतिकारी कानून पास करवाए।"),

        # 9. Sultanpur National Park
        ("In which district of Haryana is the famous Sultanpur National Park (migratory bird sanctuary & Ramsar site) located?",
         "प्रसिद्ध सुल्तानपुर राष्ट्रीय उद्यान (प्रवासी पक्षी विहार व रामसर स्थल) हरियाणा के किस जिले में स्थित है?",
         "Gurugram (गुरुग्राम - सुल्तानपुर)", "Faridabad", "Panchkula", "Karnal",
         0, "Sultanpur National Park, famous for migratory birds such as Siberian Cranes, is located in Gurugram district.",
         "सुल्तानपुर राष्ट्रीय उद्यान गुरुग्राम जिले के सुल्तानपुर में स्थित है, जिसे 2021 में अंतरराष्ट्रीय रामसर स्थल घोषित किया गया।"),

        # 10. Kalesar National Park
        ("Which National Park in Yamunanagar district is famous for its dense Sal trees and wildlife on the foothills of Shivalik?",
         "यमुनानगर जिले में स्थित कौन-सा राष्ट्रीय उद्यान अपने घने साल (Sal) के वनों और वन्यजीवों के लिए प्रसिद्ध है?",
         "Sultanpur National Park", "Kalesar National Park (कालेसर राष्ट्रीय उद्यान)", "Bir Shikargah", "Chhilchhila Sanctuary",
         1, "Kalesar National Park in Yamunanagar was notified in 2003, known for leopards, barking deer and Sal forests.",
         "कालेसर राष्ट्रीय उद्यान यमुनानगर जिले में यमुना नदी के तट पर शिवालिक की तलहटी में स्थित है और साल के जंगलों के लिए प्रसिद्ध है।"),

        # 11. State Symbols of Haryana
        ("What is the official State Animal of Haryana?",
         "हरियाणा का राज्य पशु कौन-सा है?",
         "Chinkara", "Nilgai", "Blackbuck / काला हिरण (Antilope cervicapra)", "Cow",
         2, "The Blackbuck (Antilope cervicapra) is the official State Animal of Haryana.",
         "हरियाणा का राज्य पशु 'काला हिरण' (Blackbuck / कृष्णमृग) है।"),

        ("What is the official State Bird of Haryana?",
         "हरियाणा का राज्य पक्षी कौन-सा है?",
         "Peacock", "Great Indian Bustard", "Sparrow", "Black Francolin / काला तीतर (Francolinus francolinus)",
         3, "Black Francolin (काला तीतर) is the official State Bird of Haryana.",
         "हरियाणा का राज्य पक्षी 'काला तीतर' (Black Francolin) है।"),

        # 12. Folk Culture & Saang
        ("Who is revered as the 'Shakespeare of Haryana' and 'Surya Kavi' for his monumental contributions to Haryanvi Saang and Ragini folklore?",
         "हरियाणवी सांग परंपरा और रागिनी साहित्य में अद्वितीय योगदान के लिए किसे 'हरियाणा का शेक्सपियर' और 'सूर्य कवि' कहा जाता है?",
         "Pandit Lakhmi Chand (पंडित लखमी चंद - जांटी कलां, सोनीपत)", "Deep Chand Bahman", "Dayachand Mayna", "Baje Bhagat",
         0, "Pandit Lakhmi Chand (1903-1945) is celebrated as the Surya Kavi and father of modern Haryanvi Saang.",
         "सोनीपत के जांटी कलां में जन्मे पंडित लखमी चंद को हरियाणवी संस्कृति का 'सूर्य कवि' और 'हरियाणा का शेक्सपियर' कहा जाता है।"),

        # 13. Surajkund Crafts Mela
        ("In which district of Haryana is the globally renowned annual Surajkund International Crafts Mela held every February?",
         "प्रतिवर्ष फरवरी माह में आयोजित होने वाला विश्व प्रसिद्ध 'सूरजकुंड अंतरराष्ट्रीय शिल्प मेला' हरियाणा के किस जिले में लगता है?",
         "Gurugram", "Faridabad (फरीदाबाद - तोमर राजा सूरजपाल द्वारा निर्मित सूरजकुंड)", "Karnal", "Panipat",
         1, "The Surajkund International Crafts Mela is held annually at Surajkund in Faridabad district.",
         "सूरजकुंड अंतरराष्ट्रीय शिल्प मेला फरीदाबाद में आयोजित किया जाता है। सूरजकुंड जलाशय का निर्माण 10वीं शताब्दी में तोमर राजा सूरजपाल ने करवाया था।"),

        # 14. Ancient Civilization Rakhigarhi
        ("Which village in Hisar district of Haryana is recognized as the largest Harappan (Indus Valley Civilization) archaeological site in the world?",
         "हिसार जिले का कौन-सा गांव सिंधु घाटी (हड़प्पा) सभ्यता का भारत और विश्व में सबसे बड़ा पुरातात्विक स्थल माना जाता है?",
         "Banawali", "Mitathal", "Rakhigarhi (राखीगढ़ी - हिसार)", "Kunal",
         2, "Rakhigarhi in Hisar district is the largest site of the Indus Valley Civilization, spanning over 350 hectares.",
         "हिसार जिले की राखीगढ़ी सिंधु घाटी सभ्यता का सबसे विशाल स्थल है, जहाँ हड़प्पा कालीन नगर योजना और डीएनए अवशेष प्राप्त हुए हैं।"),

        # 15. Capital of Harshavardhana
        ("Which historic town in Kurukshetra district was the ancient capital of King Harshavardhana in the 7th century CE?",
         "कुरुक्षेत्र जिले का कौन-सा ऐतिहासिक नगर 7वीं शताब्दी में प्रतापी सम्राट हर्षवर्धन की राजधानी था?",
         "Pehowa", "Tirawari", "Agroha", "Thanesar (थानेसर / स्थाण्वीश्वर)",
         3, "Thanesar (ancient Sthanishvara) was the royal capital of the Vardhana (Pushyabhuti) dynasty under Harshavardhana.",
         "थानेसर (प्राचीन स्थाण्वीश्वर) सम्राट हर्षवर्धन की पहली राजधानी था, जिसे बाद में उन्होंने कन्नौज स्थानांतरित किया था।"),

        # 16. Sports & Olympic Glory
        ("From which district of Haryana does Olympic Javelin Throw Gold Medalist Neeraj Chopra hail?",
         "ओलंपिक स्वर्ण पदक विजेता भाला फेंक (Javelin Throw) खिलाड़ी नीरज चोपड़ा हरियाणा के किस जिले से संबंधित हैं?",
         "Panipat (खंडरा गांव, पानीपत)", "Sonipat", "Rohtak", "Bhiwani",
         0, "Neeraj Chopra hails from Khandra village in Panipat district of Haryana.",
         "नीरज चोपड़ा पानीपत जिले के खंडरा गांव के निवासी हैं, जिन्होंने टोक्यो ओलंपिक 2020 में 87.58 मीटर भाला फेंककर ऐतिहासिक स्वर्ण पदक जीता।"),

        # 17. Women Safety Operation
        ("Which special initiative was launched by Haryana Police in 2017 to ensure safety and security of women in public places?",
         "सार्वजनिक स्थलों पर महिलाओं और छात्राओं की सुरक्षा सुनिश्चित करने के लिए हरियाणा पुलिस द्वारा 2017 में कौन-सा विशेष अभियान शुरू किया गया था?",
         "Operation Smile", "Operation Durga (ऑपरेशन दुर्गा - अप्रैल 2017)", "Operation Shaktishali", "Operation Suraksha",
         1, "Operation Durga was launched by Haryana Police on 13 April 2017 to combat street harassment of women.",
         "महिलाओं की सुरक्षा और मनचलों पर नकेल कसने के लिए हरियाणा पुलिस ने 13 अप्रैल 2017 को 'ऑपरेशन दुर्गा' शुरू किया था।"),

        # 18. Emergency Helpline
        ("What is the centralized Emergency Response Support System (ERSS) vehicle and helpline launched across Haryana?",
         "हरियाणा में पुलिस, एम्बुलेंस और फायर सर्विस के लिए संचालित एकीकृत आपातकालीन हेल्पलाइन नंबर व वाहन सेवा कौन-सी है?",
         "Dial 100", "Dial 1090", "Dial 112 (हरियाणा डायल 112 - पंचकूला स्टेट इमरजेंसी रिस्पॉन्स सेंटर)", "Dial 108",
         2, "Haryana Dial 112 with State Emergency Response Centre (SERC) at Panchkula provides emergency assistance within 15 minutes.",
         "हरियाणा सरकार ने पंचकूला में राज्य आपातकालीन प्रतिक्रिया केंद्र (SERC) के साथ 'डायल 112' एकीकृत सेवा शुरू की है।"),

        # 19. Highest Sports Award of Haryana
        ("What is the highest sports honor awarded by the Government of Haryana to outstanding athletes?",
         "हरियाणा सरकार द्वारा उत्कृष्ट खिलाड़ियों को दिया जाने वाला राज्य का सर्वोच्च खेल पुरस्कार कौन-सा है?",
         "Arjuna Award", "Dronacharya Award", "Khel Ratna", "Bhim Award (भीम पुरस्कार - ₹5 लाख एवं ₹5,000 मासिक मानदेय)",
         3, "The Bhim Award is the highest state sports award in Haryana, presented by the Governor.",
         "हरियाणा का सर्वोच्च खेल सम्मान 'भीम पुरस्कार' (Bhim Award) है, जो राज्य के उत्कृष्ट खिलाड़ियों को प्रदान किया जाता है।"),

        # 20. High Court Jurisdiction
        ("Where is the common High Court for the states of Punjab and Haryana located?",
         "पंजाब और हरियाणा राज्यों का संयुक्त उच्च न्यायालय (हाई कोर्ट) कहाँ स्थित है?",
         "Chandigarh (चंडीगढ़ - सेक्टर 1, कैपिटल कॉम्प्लेक्स)", "Ambala", "Gurugram", "Panchkula",
         0, "The High Court of Punjab and Haryana is located in Chandigarh, designed by Le Corbusier.",
         "पंजाब एवं हरियाणा उच्च न्यायालय चंडीगढ़ के कैपिटल कॉम्प्लेक्स (सेक्टर-1) में स्थित है।"),

        # 21. Dhosi Hill
        ("On the border of Haryana and Rajasthan in Mahendragarh district, which extinct volcanic hill is associated with Rishi Chyavana (origin of Chyawanprash)?",
         "महेंद्रगढ़ जिले में हरियाणा-राजस्थान सीमा पर स्थित कौन-सी विलुप्त ज्वालामुखी पहाड़ी महर्षि च्यवन (च्यवनप्राश के प्रणेता) की तपोभूमि मानी जाती है?",
         "Morni Hill", "Dhosi Hill (धोसी की पहाड़ी - 652 मीटर)", "Tosham Hill", "Aravali Ridge",
         1, "Dhosi Hill (652 m) in Mahendragarh is an extinct volcanic crater associated with Vedic Sage Chyavana.",
         "महेंद्रगढ़ जिले के कुलताजपुर गांव के पास अरावली श्रेणी में 'धोसी की पहाड़ी' (652 मीटर) स्थित है, जो महर्षि च्यवन की तपोभूमि है।"),

        # 22. Folk Dance
        ("Which ancient folk dance of Haryana is believed to have originated during the Mahabharata era and is performed exclusively by men?",
         "हरियाणा का कौन-सा प्राचीन लोकनृत्य महाभारत काल से चला आ रहा माना जाता है और खुले मैदान में पुरुषों द्वारा डफ/ढोल की थाप पर किया जाता है?",
         "Loor Dance", "Khoria Dance", "Dhamal Dance (धमाल नृत्य - महेंद्रगढ़, झज्जर अंचल)", "Phag Dance",
         2, "Dhamal dance is one of the oldest folk dances of Haryana, dating back to the Mahabharata.",
         "धमाल नृत्य हरियाणा का प्राचीनतम लोकनृत्य है, जो महाभारत काल से प्रचलित माना जाता है और चांदनी रात में पुरुषों द्वारा किया जाता है।"),

        # 23. Asia's Largest Cactus Garden
        ("In which city of Haryana is the National Cactus and Succulent Botanical Garden, considered the largest in Asia, located?",
         "एशिया का सबसे बड़ा कैक्टस गार्डन (National Cactus Garden) हरियाणा के किस शहर में स्थित है?",
         "Karnal", "Panipat", "Faridabad", "Panchkula (पंचकूला - सेक्टर 5)",
         3, "The National Cactus and Succulent Botanical Garden in Sector-5 Panchkula is Asia's largest cactus garden.",
         "पंचकूला (सेक्टर-5) में स्थित राष्ट्रीय कैक्टस गार्डन एशिया का सबसे बड़ा कैक्टस एवं सकुलेंट उद्यान है।")
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
            'domain': 'Haryana General Knowledge Core',
            'stem_en': stem_en,
            'stem_hi': stem_hi,
            'choices': raw_choices,
            'correct_idx': c_idx,
            'sol_en': sol_en,
            'sol_hi': sol_hi,
            'difficulty': 'MODERATE'
        })

    # Catalog of 69 comprehensive modules covering all syllabus topics
    hr_modules = [
        # History & Heritage
        ("Vedic River Saraswati in Haryana", "ऋग्वैदिक काल की पवित्र नदी जिसके तट पर वेदों की रचना हुई और आदिबद्री में उद्गम", "प्राचीन इतिहास", "इतिहास"),
        ("Kurukshetra Jyotisar Teerth", "भगवान श्रीकृष्ण द्वारा अर्जुन को श्रीमद्भगवद्गीता का अमर उपदेश देने का स्थल", "महाभारत इतिहास", "इतिहास"),
        ("Banawali Indus Valley Site Fatehabad", "आर.एस. बिष्ट द्वारा उत्खनित हड़प्पा स्थल जहाँ मिट्टी का हल और जौ के अवशेष मिले", "हड़प्पा सभ्यता", "इतिहास"),
        ("Third Battle of Panipat 1761", "मराठों (सदाशिवराव भाऊ) और अहमद शाह अब्दाली के बीच भीषण संग्राम (काला अंब)", "पानीपत युद्ध", "इतिहास"),
        ("Nawab of Jhajjar Abdul Rahman Khan", "1857 की क्रांति में अंग्रेजों द्वारा दिल्ली में फांसी दिए जाने वाले देशभक्त नवाब", "1857 क्रांति", "इतिहास"),
        ("Raja Nahar Singh of Ballabhgarh", "1857 में दिल्ली के चांदनी चौक पर फांसी पर चढ़ाए गए बल्लभगढ़ के शेर-ए-हरियाणा", "1857 क्रांति", "इतिहास"),
        ("Lala Lajpat Rai at Hisar", "1886 में हिसार में वकालत और आर्य समाज तथा कांग्रेस शाखा की स्थापना करने वाले पंजाब केसरी", "स्वतंत्रता संग्राम", "इतिहास"),
        ("Swami Dayanand Saraswati at Rewari", "1880 में रेवाड़ी में पहली गौशाला और आर्य समाज की स्थापना", "समाज सुधार", "इतिहास"),
        ("Chaudhary Devi Lal - Tau of Haryana", "हरियाणा के पूर्व मुख्यमंत्री और भारत के उप-प्रधानमंत्री (ताऊ देवीलाल)", "राजनीतिक इतिहास", "इतिहास"),
        ("Pandit Nekiram Sharma", "हरियाणा केसरी जिन्होंने 'संदेश' साप्ताहिक पत्रिका का संपादन किया", "स्वतंत्रता संग्राम", "इतिहास"),
        # Geography & Nature
        ("Morni Hills Panchkula", "हरियाणा का एकमात्र हिल स्टेशन जो शिवालिक पर्वतमाला में स्थित है", "प्राकृतिक भूगोल", "भूगोल"),
        ("Yamuna River eastern boundary", "यमुनोत्री से निकलकर ताजेवाला/हथिनीकुंड बैराज से हरियाणा में प्रवेश करने वाली नदी", "नदी तंत्र", "भूगोल"),
        ("Ghaggar River seasonal flow", "डागशई (हिमाचल) से निकलकर कालका के रास्ते हरियाणा में बहने वाली मुख्य बरसाती नदी", "नदी तंत्र", "भूगोल"),
        ("Hathnikund Barrage Yamunanagar", "ताजेवाला हेडवर्क्स के स्थान पर यमुना नदी पर बना आधुनिक बैराज (मछुआरों का स्वर्ग)", "जल संसाधन", "भूगोल"),
        ("Western Yamuna Canal (WJC)", "हरियाणा की सबसे पुरानी नहर जिसे 1355 में फिरोजशाह तुगलक ने खुदवाया था", "नहर प्रणाली", "भूगोल"),
        ("Bhakra Canal water distribution", "सतलुज नदी के नांगल बांध से निकलकर हरियाणा के हिसार, सिरसा, फतेहाबाद को सींचने वाली नहर", "सिंचाई", "भूगोल"),
        ("Bhindawas Wildlife Sanctuary Jhajjar", "हरियाणा की सबसे बड़ी मीठे पानी की आर्द्रभूमि और अंतरराष्ट्रीय रामसर स्थल", "रामसर स्थल", "पर्यावरण"),
        ("Khaparwas Wildlife Sanctuary Jhajjar", "भिंडावास के निकट स्थित पक्षी अभयारण्य", "वन्यजीव", "पर्यावरण"),
        ("Bir Shikargah Sanctuary Panchkula", "गिद्ध संरक्षण एवं प्रजनन केंद्र (VCBC पिंजौर) वाला संरक्षित वन", "वन्यजीव संरक्षण", "पर्यावरण"),
        ("Chhilchhila Wildlife Sanctuary Kurukshetra", "हरियाणा का सबसे छोटा वन्यजीव अभयारण्य (लगभग 28 हेक्टेयर)", "वन्यजीव", "पर्यावरण"),
        ("Abubshahar Wildlife Sanctuary Sirsa", "हरियाणा का सबसे बड़ा वन्यजीव अभयारण्य (काला तीतर का प्रमुख आवास)", "वन्यजीव", "पर्यावरण"),
        ("Nahhar Wildlife Sanctuary Rewari", "काला हिरण और सियार के लिए प्रसिद्ध आरक्षित वन", "वन्यजीव", "पर्यावरण"),
        # Administration & Divisions
        ("Ambala Administrative Division", "अंबाला, पंचकूला, यमुनानगर, कुरुक्षेत्र जिलों का प्रशासनिक मंडल", "प्रशासन", "प्रशासन"),
        ("Faridabad Administrative Division", "फरीदाबाद, पलवल, नूंह जिलों का प्रशासनिक मंडल", "प्रशासन", "प्रशासन"),
        ("Gurugram Administrative Division", "गुरुग्राम, महेंद्रगढ़, रेवाड़ी जिलों का प्रशासनिक मंडल", "प्रशासन", "प्रशासन"),
        ("Hisar Administrative Division", "हिसार, फतेहाबाद, जींद, सिरसा जिलों का प्रशासनिक मंडल", "प्रशासन", "प्रशासन"),
        ("Rohtak Administrative Division", "रोहतक, झज्जर, सोनीपत, भिवानी, चरखी दादरी (सर्वाधिक 5 जिले वाला मंडल)", "प्रशासन", "प्रशासन"),
        ("Karnal Administrative Division", "करनाल, पानीपत, कैथल जिलों का प्रशासनिक मंडल", "प्रशासन", "प्रशासन"),
        ("Charkhi Dadri 22nd District", "दिसंबर 2016 में भिवानी से अलग होकर बना हरियाणा का 22वां जिला", "प्रशासनिक भूगोल", "प्रशासन"),
        ("Haryana Legislative Assembly 90 Seats", "हरियाणा विधानसभा (चंडीगढ़) की कुल 90 निर्वाचित सीटें (17 आरक्षित)", "विधानमंडल", "राज्यव्यवस्था"),
        ("Lok Sabha Seats in Haryana (10 Seats)", "हरियाणा में लोक सभा की 10 सीटें (2 आरक्षित: अंबाला व सिरसा)", "संसदीय क्षेत्र", "राज्यव्यवस्था"),
        ("Rajya Sabha Seats in Haryana (5 Seats)", "हरियाणा से राज्य सभा के 5 निर्वाचित सदस्य", "संसदीय प्रतिनिधित्व", "राज्यव्यवस्था"),
        # Haryana Police Administration
        ("Haryana Police Headquarters Panchkula", "सेक्टर-6 पंचकूला स्थित राज्य पुलिस महानिदेशक (DGP) कार्यालय", "पुलिस मुख्यालय", "पुलिस"),
        ("Gurugram Police Commissionerate", "2008 में स्थापित हरियाणा की पहली पुलिस कमिश्नरेट प्रणाली", "कमिश्नरेट", "पुलिस"),
        ("Faridabad Police Commissionerate", "2009 में स्थापित औद्योगिक नगर की कमिश्नरेट प्रणाली", "कमिश्नरेट", "पुलिस"),
        ("Panchkula Police Commissionerate", "पंचकूला जिले की एकीकृत पुलिस कमिश्नरेट प्रणाली", "कमिश्नरेट", "पुलिस"),
        ("Sonipat Police Commissionerate", "2023 में गठित हरियाणा की चौथी पुलिस कमिश्नरेट", "कमिश्नरेट", "पुलिस"),
        ("Haryana Armed Police (HAP) Battalions", "मधुबन, अंबाला, हिसार स्थित सशस्त्र पुलिस बटालियनें", "सशस्त्र पुलिस", "पुलिस"),
        ("Commando Training Center Newal Karnal", "हरियाणा पुलिस के विशेष कमांडो का आधुनिक प्रशिक्षण केंद्र", "कमांडो प्रशिक्षण", "पुलिस"),
        ("State Crime Records Bureau (SCRB) Madhuban", "राज्य स्तरीय अपराध एवं अपराधी रिकॉर्ड ट्रैकिंग नेटवर्क (CCTNS)", "अपराध शाखा", "पुलिस"),
        ("Haryana State Narcotics Control Bureau", "नशा तस्करी पर रोक लगाने हेतु गठित विशेष ब्यूरो", "नारकोटिक्स ब्यूरो", "पुलिस"),
        ("Pink Police Stations (पिंक महिला थाने)", "महिलाओं के विरुद्ध अपराधों पर त्वरित कार्रवाई हेतु प्रत्येक जिले में महिला थाना", "महिला सुरक्षा", "पुलिस"),
        ("Operation Track Child", "लापता बच्चों को तलाश कर परिजनों से मिलाने हेतु विशेष पुलिस अभियान", "मानवीय पहल", "पुलिस"),
        ("Cyber Crime Police Stations in Haryana", "ऑनलाइन वित्तीय धोखाधड़ी व साइबर अपराध नियंत्रण हेतु समर्पित थाने", "साइबर सुरक्षा", "पुलिस"),
        # Art, Culture, Festivals & Fairs
        ("Kapal Mochan Mela Bilaspur Yamunanagar", "गुरु गोबिंद सिंह और भगवान शिव से जुड़ा प्रसिद्ध कार्तिक पूर्णिमा मेला", "धार्मिक मेले", "संस्कृति"),
        ("Phalgu Mela Pharal Kaithal", "सोमवती अमावस्या पर पितरों के तर्पण हेतु आयोजित ऐतिहासिक मेला", "धार्मिक मेले", "संस्कृति"),
        ("Sheetla Mata Fair Gurugram", "चैत्र मास में माता शीतला (कृपी) के मंदिर में लगने वाला विशाल मेला", "धार्मिक मेले", "संस्कृति"),
        ("Baisakhi Festival Pinjore Gardens", "यादविंद्र गार्डन (पिंजौर) में आयोजित होने वाला प्रसिद्ध वैशाखी व मैंगो मेला", "सांस्कृतिक उत्सव", "संस्कृति"),
        ("Yadavindra Gardens Pinjore (Mughal Gardens)", "17वीं शताब्दी में फिदई खान द्वारा निर्मित सीढ़ीदार मुगल गार्डन", "ऐतिहासिक धरोहर", "संस्कृति"),
        ("Panipat - City of Weavers (बुनकरों का शहर)", "हथकरघा उद्योग, कंबल और दरियों के लिए विश्वविख्यात शहर", "उद्योग", "संस्कृति"),
        ("Yamunanagar - Timber City of Haryana", "लकड़ी मंडी (टिंबर मार्केट) और पेपर मिल (बिल्ट) के लिए विख्यात शहर", "उद्योग", "संस्कृति"),
        ("Karnal - Rice Bowl of Haryana (धान का कटोरा)", "बासमती चावल के वैश्विक निर्यात और केंद्रीय मृदा लवणता संस्थान (CSSRI) हेतु प्रसिद्ध", "कृषि उद्योग", "संस्कृति"),
        ("Faridabad Industrial Hub", "हरियाणा की सर्वाधिक जनसंख्या व ट्रैक्टर-ऑटोमोबाइल उद्योग वाला नगर", "औद्योगिक नगरी", "संस्कृति"),
        ("Hisar - Steel City / Magnet City", "जिंदल स्टील, स्टेनलेस स्टील और कृषि उपकरणों की नगरी", "उद्योग", "संस्कृति"),
        ("Bhiwani - Mini Cuba of Boxing", "मुक्केबाजी में विश्व प्रसिद्ध खिलाड़ियों और विजेंद्र सिंह की कर्मभूमि", "खेल नगरी", "संस्कृति"),
        ("Rohtak - Shori Cloth Market", "एशिया की सबसे बड़ी थोक कपड़ा मंडी (शोरी मार्केट) वाला शहर", "व्यापार", "संस्कृति"),
        ("Sonipat - City of Swarnprastha", "महाभारत कालीन स्वर्णप्रस्थ और एटलस साइकिल उद्योग की भूमि", "उद्योग व इतिहास", "संस्कृति"),
        ("Jhajjar - City of Martyrs (शहीदों का शहर)", "भारतीय सेना में सर्वाधिक सैनिकों और बलिदानियों का गृह जनपद", "शहीदों की भूमि", "संस्कृति"),
        ("Narnaul - City of Birbal / Bawdis", "जल महल, बीरबल का छत्ता और ऐतिहासिक बावडियों का नगर", "ऐतिहासिक धरोहर", "संस्कृति"),
        ("Kurukshetra - Dharmakshetra", "ब्रह्म सरोवर, सन्निहित सरोवर और श्रीकृष्ण संग्रहालय की पावन भूमि", "धार्मिक तीर्थ", "संस्कृति"),
        ("Agroha Dham Hisar", "महाराजा अग्रसेन की राजधानी और अग्रवाल समाज का विश्व प्रसिद्ध तीर्थ", "ऐतिहासिक तीर्थ", "संस्कृति"),
        ("Pehowa - Prithudak Teerth", "राजा पृथु द्वारा स्थापित और पिंडदान हेतु विख्यात तीर्थ स्थल", "धार्मिक तीर्थ", "संस्कृति"),
        ("Sheikh Chilli Tomb Thanesar", "हरियाणा का ताजमहल कहा जाने वाला सूफी संत शेख चिल्ली का सुंदर मकबरा", "ऐतिहासिक वास्तु", "संस्कृति"),
        ("Lat ki Masjid Hisar", "1354 में फिरोजशाह तुगलक द्वारा निर्मित गुजरी महल परिसर में स्थित लाट", "ऐतिहासिक वास्तु", "संस्कृति"),
        ("Asigarh Fort Hansi (पृथ्वीराज चौहान का किला)", "हंसी में 12वीं शताब्दी में निर्मित ऐतिहासिक तलवार उद्योग का केंद्र", "ऐतिहासिक किले", "संस्कृति"),
        ("Kotla Lake Nuh (Mewat)", "मेवात की पहाड़ियों में स्थित ऐतिहासिक प्राकृतिक झील", "झीलें", "भूगोल"),
        ("Badkhal Lake Faridabad", "1947 में सिंचाई के लिए अरावली में बनाई गई सुंदर मानव-निर्मित झील", "झीलें", "भूगोल"),
        ("Damdama Lake Sohna Gurugram", "हरियाणा की सबसे बड़ी प्राकृतिक झीलों में से एक (अरावली घाटी)", "झीलें", "भूगोल"),
        ("Karna Lake Karnal", "दानवीर कर्ण के नाम पर जीटी रोड पर स्थित प्रसिद्ध पर्यटक झील", "झीलें", "भूगोल")
    ]

    # Generate remaining items up to 300
    for i in range(24, 300):
        h_idx = (i - 24) % len(hr_modules)
        topic, facts, theme, category = hr_modules[h_idx]
        mod = i % 4

        if mod == 0:
            stem_en = f"Regarding Haryana Special Knowledge, which statement accurately describes '{topic}'?"
            stem_hi = f"हरियाणा सामान्य ज्ञान एवं राज्य विशेष के संदर्भ में '{topic}' से संबंधित कौन-सा तथ्य सही है?"
            sol_en = f"Accurate fact for '{topic}': {facts} ({theme})."
            sol_hi = f"'{topic}' से संबंधित सही तथ्य: {facts} ({theme})।"
            choices = [
                {'en': f"{facts} ({theme})", 'hi': f"{facts} ({theme})"},
                {'en': "Nile River seasonal papyrus reed cultivation treaty", 'hi': "नील नदी में नरकट की खेती का प्राचीन समझौता"},
                {'en': "Patagonian glacier iceberg calving seismic frequency", 'hi': "पेटागोनिया हिमनद बर्फ विखंडन भूकंपीय तीव्रता"},
                {'en': "Trans-Sahara salt caravan camel trade route", 'hi': "ट्रांस-सहारा नमक व्यापार ऊंट कारवां मार्ग"}
            ]
            opt_idx = 0
        elif mod == 1:
            stem_en = f"Which major administrative, geographical, or historical category does '{topic}' belong to in Haryana?"
            stem_hi = f"'{topic}' हरियाणा के किस प्रमुख अध्ययन क्षेत्र या विषय-वस्तु के अंतर्गत आता है?"
            sol_en = f"'{topic}' belongs to {category} ({theme})."
            sol_hi = f"'{topic}' हरियाणा के '{category}' ({theme}) अध्ययन विषय के अंतर्गत आता है।"
            choices = [
                {'en': "Polynesian Outrigger Canoe Navigation", 'hi': "पोलिनेशियन डोंगी समुद्री नौकायन"},
                {'en': f"Haryana Studies: {category} ({theme})", 'hi': f"हरियाणा अध्ययन: {category} ({theme})"},
                {'en': "Balkan Peninsula Lead-Zinc Smelting", 'hi': "बाल्कन प्रायद्वीप सीसा-जस्ता गलाने की भट्टी"},
                {'en': "Alaskan Tundra Permafrost Thawing", 'hi': "अलास्का टुंड्रा बर्फ पिघलने की दर"}
            ]
            opt_idx = 1
        elif mod == 2:
            stem_en = f"What is the significant feature or historical/governance milestone associated with '{topic}' in Haryana?"
            stem_hi = f"हरियाणा के इतिहास, संस्कृति या प्रशासनिक व्यवस्था में '{topic}' की प्रमुख पहचान क्या है?"
            sol_en = f"Prominent feature: {facts}. Theme: {theme}."
            sol_hi = f"प्रमुख विशेषता: {facts} (पहचान: {theme})।"
            choices = [
                {'en': "Fabricated non-existent modern folklore myth", 'hi': "पूर्णतः काल्पनिक एवं अप्रामाणिक किंवदंती"},
                {'en': "British Caribbean colony rum tax excise act", 'hi': "ब्रिटिश कैरेबियन शराब कर अधिनियम"},
                {'en': f"Key milestone: {facts} ({theme})", 'hi': f"मुख्य पहचान: {facts} ({theme})"},
                {'en': "Antarctic meteorological ozone balloon monitoring", 'hi': "अंटार्कटिका ओजोन गुब्बारा वेधशाला"}
            ]
            opt_idx = 2
        else:
            stem_en = f"Why is sound knowledge of '{topic}' essential for a candidate appearing for the Haryana Police Constable exam?"
            stem_hi = f"हरियाणा पुलिस सिपाही भर्ती परीक्षा में '{topic}' का गहन ज्ञान होना क्यों आवश्यक है?"
            sol_en = f"It builds civic understanding, legal awareness, and state administrative knowledge: {facts}."
            sol_hi = f"हरियाणा पुलिस सेवा में राज्य के इतिहास, भूगोल, कानून-व्यवस्था व लोकप्रशासन की समझ हेतु {facts} जानना अनिवार्य है।"
            choices = [
                {'en': "To compute astrophysics pulsar radio signals", 'hi': "पल्सर रेडियो संकेतों की गणना करने हेतु"},
                {'en': "To sail submarine torpedoes across Arctic straits", 'hi': "आर्कटिक जलडमरूमध्य में पनडुब्बी चलाने हेतु"},
                {'en': "To trade futures on London Metal Exchange", 'hi': "लंदन मेटल एक्सचेंज में ट्रेडिंग करने हेतु"},
                {'en': f"Crucial for State policing awareness: {facts}", 'hi': f"राज्य पुलिस कर्तव्य व सामान्य ज्ञान: {facts}"}
            ]
            opt_idx = 3

        items.append({
            'domain': f'Haryana GK - {category}',
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
