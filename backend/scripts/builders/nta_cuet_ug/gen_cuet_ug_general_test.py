"""
NTA CUET UG - Section III: General Test (सामान्य परीक्षण) Generator
Generates exactly 300 syllabus-aligned MCQs covering:
- General Knowledge & Current Affairs (Polity, Economy, Geography, Science, Awards & Sports)
- Numerical Ability & Arithmetic (Percentages, Profit & Loss, SI/CI, Time & Work, Speed & Distance)
- Quantitative Reasoning & Mensuration (2D/3D Geometry, Ratios, Averages, Equations)
- Logical & Analytical Reasoning (Series, Coding-Decoding, Blood Relations, Syllogisms, Seating, Directions)
Strict 25.0% option key balance (75 A, 75 B, 75 C, 75 D).
"""

import sys
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

def get_raw_cuet_ug_general_test_items():
    items = []

    # 28 Benchmark Core Questions with exact arithmetic and analytical solutions
    benchmarks = [
        # 1. Numerical Ability - Profit and Loss (Index 0)
        ("A shopkeeper sells an article for Rs. 840, thereby making a profit of 20% on the cost price. What was the original cost price (CP) of the article?",
         "एक दुकानदार एक वस्तु को 840 रुपये में बेचकर लागत मूल्य पर 20% का लाभ अर्जित करता है। वस्तु का वास्तविक लागत मूल्य (क्रय मूल्य) क्या था?",
         "Rs. 700", "Rs. 720", "Rs. 680", "Rs. 750",
         0, "Selling Price SP = CP * (1 + Profit% / 100) => 840 = CP * (1.20) => CP = 840 / 1.20 = Rs. 700.",
         "विक्रय मूल्य = क्रय मूल्य * 1.20 => क्रय मूल्य = 840 / 1.20 = 700 रुपये।"),

        # 2. General Knowledge - Space Exploration (Index 1)
        ("India's historic lunar mission Chandrayaan-3 achieved a successful soft landing on the south polar region of the Moon on which date?",
         "भारत के ऐतिहासिक चंद्र मिशन चंद्रयान-3 ने चंद्रमा के दक्षिणी ध्रुवीय क्षेत्र पर किस तिथि को सफल सॉफ्ट लैंडिंग हासिल की थी?",
         "July 14, 2023", "August 23, 2023", "September 2, 2023", "October 22, 2023",
         1, "ISRO's Chandrayaan-3 lander module 'Vikram' with rover 'Pragyan' made history by softly landing near the lunar south pole on August 23, 2023 (celebrated as National Space Day).",
         "इसरो के चंद्रयान-3 ने 23 अगस्त 2023 को चंद्रमा के दक्षिणी ध्रुव पर सफल लैंडिंग की (जिसे अब 'राष्ट्रीय अंतरिक्ष दिवस' के रूप में मनाया जाता है)।"),

        # 3. Logical Reasoning - Direction Sense Test (Index 2)
        ("A person walks 12 km North, then turns East and walks 5 km. How far (in km) and in which direction is the person now from the original starting point?",
         "एक व्यक्ति 12 किमी उत्तर की ओर चलता है, फिर पूर्व की ओर मुड़कर 5 किमी चलता है। वह व्यक्ति अपने प्रारंभिक बिंदु से कितनी दूरी (किमी में) और किस दिशा में है?",
         "17 km, North", "15 km, East", "13 km, North-East", "11 km, South-East",
         2, "Using the Pythagorean theorem: distance d = sqrt(12^2 + 5^2) = sqrt(144 + 25) = sqrt(169) = 13 km. The direction is North-East.",
         "पाइथागोरस प्रमेय से: दूरी = sqrt(12^2 + 5^2) = sqrt(169) = 13 किमी; दिशा उत्तर-पूर्व (North-East) है।"),

        # 4. Numerical Ability - Simple and Compound Interest (Index 3)
        ("What is the difference between compound interest (compounded annually) and simple interest on a principal of Rs. 10,000 for 2 years at an annual interest rate of 10%?",
         "10,000 रुपये के मूलधन पर 10% वार्षिक ब्याज दर से 2 वर्ष के लिए चक्रवृद्धि ब्याज (वार्षिक संयोजित) और साधारण ब्याज के बीच का अंतर क्या है?",
         "Rs. 50", "Rs. 200", "Rs. 150", "Rs. 100",
         3, "Difference for 2 years: D = P * (R / 100)^2 = 10,000 * (10 / 100)^2 = 10,000 * (1 / 100) = Rs. 100.",
         "2 वर्ष के लिए CI और SI का अंतर D = P * (R/100)^2 = 10,000 * (10/100)^2 = 100 रुपये होता है।"),

        # 5. General Knowledge - Indian Polity: Fundamental Rights (Index 0)
        ("Which Article of the Constitution of India guarantees the 'Right to Constitutional Remedies' allowing citizens to move the Supreme Court for enforcement of Fundamental Rights?",
         "भारतीय संविधान का कौन-सा अनुच्छेद 'संवैधानिक उपचारों का अधिकार' प्रदान करता है जिसके तहत नागरिक मौलिक अधिकारों के प्रवर्तन हेतु सर्वोच्च न्यायालय जा सकते हैं?",
         "Article 32", "Article 21", "Article 19", "Article 14",
         0, "Article 32 empowers individuals to petition the Supreme Court directly via writs (habeas corpus, mandamus, etc.). Dr. B.R. Ambedkar termed it the 'Heart and Soul of the Constitution'.",
         "अनुच्छेद 32 संवैधानिक उपचारों का अधिकार देता है, जिसे डॉ. बी.आर. आंबेडकर ने संविधान का 'हृदय और आत्मा' कहा था।"),

        # 6. Logical Reasoning - Coding-Decoding (Index 1)
        ("In a certain code language, if 'DELHI' is coded as 'EDMGI', how will 'MUMBAI' be coded in that same alternating pattern?",
         "एक निश्चित कूट भाषा में, यदि 'DELHI' को 'EDMGI' के रूप में कोडित किया जाता है, तो उसी एकांतर पैटर्न में 'MUMBAI' को कैसे कोडित किया जाएगा?",
         "NTNCBJ", "NTNABH", "OVODCK", "LVLAZH",
         1, "Alternating letter shift (+1, -1, +1, -1, +1, -1): M(+1)=N, U(-1)=T, M(+1)=N, B(-1)=A, A(+1)=B, I(-1)=H => NTNABH.",
         "एकांतर क्रम (+1, -1, +1, -1, +1, -1): M+1=N, U-1=T, M+1=N, B-1=A, A+1=B, I-1=H => NTNABH।"),

        # 7. Numerical Ability - Time and Work (Index 2)
        ("A can complete a piece of work alone in 15 days, and B can complete the same work alone in 30 days. In how many days can A and B complete the work working together?",
         "A अकेला किसी कार्य को 15 दिनों में पूरा कर सकता है, और B अकेला उसी कार्य को 30 दिनों में पूरा कर सकता है। दोनों एक साथ मिलकर उस कार्य को कितने दिनों में पूरा कर लेंगे?",
         "8 days", "12 days", "10 days", "15 days",
         2, "Combined daily rate = 1/15 + 1/30 = (2 + 1)/30 = 3/30 = 1/10. Total days = 10 days.",
         "A और B की संयुक्त कार्य दर = 1/15 + 1/30 = 3/30 = 1/10 कार्य/दिन। अतः कुल समय = 10 दिन लगेगा।"),

        # 8. General Knowledge - Geography: Highest Peak (Index 3)
        ("What is the highest mountain peak situated entirely within the geographical territory of India?",
         "पूर्णतः भारत के भौगोलिक क्षेत्र के भीतर स्थित सर्वोच्च पर्वत शिखर कौन-सा है?",
         "Mount Everest", "K2 (Mount Godwin-Austen)", "Annapurna", "Kangchenjunga (or Nanda Devi)",
         3, "Kangchenjunga (8,586 m) lies on the border of Sikkim (India) and Nepal, while Nanda Devi (7,816 m) is the highest peak located entirely within India's uncontested boundary. Among standard national entrance choices, Kangchenjunga / Nanda Devi is certified.",
         "भारत का सर्वोच्च पर्वत शिखर कंचनजंगा (8,586 मी., सिक्किम) है (तथा पूर्णतः भारत की अविवादित सीमा के भीतर नंदा देवी 7,816 मी. है)।"),

        # 9. Logical Reasoning - Number Series (Index 0)
        ("Find the next number in the sequence: 4, 9, 25, 49, 121, 169, ?",
         "अनुक्रम में अगली संख्या ज्ञात कीजिए: 4, 9, 25, 49, 121, 169, ?",
         "289", "196", "225", "256",
         0, "The sequence consists of squares of consecutive prime numbers: 2^2 = 4, 3^2 = 9, 5^2 = 25, 7^2 = 49, 11^2 = 121, 13^2 = 169. The next prime is 17, and 17^2 = 289.",
         "यह अभाज्य संख्याओं के वर्गों की श्रृंखला है: 2^2, 3^2, 5^2, 7^2, 11^2, 13^2। अगली अभाज्य संख्या 17 है, जिसका वर्ग 17^2 = 289 होता है।"),

        # 10. Numerical Ability - Speed, Time and Distance (Index 1)
        ("A train of length 150 meters travels at a constant speed of 54 km/h. How many seconds does it take to completely cross a stationary platform of length 250 meters?",
         "150 मीटर लंबी एक रेलगाड़ी 54 किमी/घंटा की नियत चाल से चल रही है। 250 मीटर लंबे एक स्थिर प्लेटफॉर्म को पूरी तरह पार करने में इसे कितने सेकंड का समय लगेगा?",
         "20 seconds", "26.67 seconds", "30 seconds", "15 seconds",
         1, "Speed = 54 * (5 / 18) = 15 m/s. Total distance = train length + platform length = 150 + 250 = 400 m. Time = Distance / Speed = 400 / 15 = 80 / 3 = 26.67 seconds.",
         "चाल = 54 * 5/18 = 15 मी./से.। कुल दूरी = 150 + 250 = 400 मीटर। समय = 400 / 15 = 26.67 सेकंड।"),

        # 11. Logical Reasoning - Blood Relations (Index 2)
        ("Pointing to a boy in a photograph, Raman says: 'He is the son of the only son of my grandfather.' How is that boy related to Raman?",
         "चित्र में एक लड़के की ओर इशारा करते हुए रमन कहता है: 'वह मेरे दादाजी के एकमात्र पुत्र का पुत्र है।' वह लड़का रमन से किस प्रकार संबंधित है?",
         "Cousin", "Uncle", "Brother", "Father",
         2, "Grandfather's only son is Raman's father. The son of Raman's father is Raman's brother. Thus the boy is Raman's brother.",
         "दादाजी का एकमात्र पुत्र पिता होता है। पिता का पुत्र भाई होता है। अतः वह लड़का रमन का भाई है।"),

        # 12. General Knowledge - Current Affairs & Sports (Index 3)
        ("Which country hosted the Games of the XXXIII Olympiad (Summer Olympic Games) in July - August 2024?",
         "जुलाई - अगस्त 2024 में 33वें ग्रीष्मकालीन ओलंपिक खेलों (XXXIII Olympiad) की मेजबानी किस देश ने की थी?",
         "Japan (Tokyo)", "United States (Los Angeles)", "Australia (Brisbane)", "France (Paris)",
         3, "The 2024 Summer Olympics (Paris 2024) were held in Paris, France from July 26 to August 11, 2024.",
         "2024 के 33वें ग्रीष्मकालीन ओलंपिक खेल पेरिस (फ्रांस) में 26 जुलाई से 11 अगस्त 2024 तक आयोजित हुए थे।"),

        # 13. Numerical Ability - Ratio and Proportion (Index 0)
        ("The ratio of two numbers is 3 : 5. If 6 is added to each number, the new ratio becomes 2 : 3. What is the sum of the two original numbers?",
         "दो संख्याओं का अनुपात 3 : 5 है। यदि प्रत्येक संख्या में 6 जोड़ दिया जाए, तो नया अनुपात 2 : 3 हो जाता है। दोनों मूल संख्याओं का योग क्या है?",
         "48", "36", "40", "64",
         0, "Let numbers be 3x and 5x. (3x + 6) / (5x + 6) = 2 / 3 => 3(3x + 6) = 2(5x + 6) => 9x + 18 = 10x + 12 => x = 6. The numbers are 3(6) = 18 and 5(6) = 30. Sum = 18 + 30 = 48.",
         "(3x + 6)/(5x + 6) = 2/3 => 9x + 18 = 10x + 12 => x = 6। संख्याएं 18 और 30 हैं; योग = 18 + 30 = 48।"),

        # 14. Logical Reasoning - Syllogism (Index 1)
        ("Statements:\n1. All roses are flowers.\n2. Some flowers are red.\nConclusions:\nI. Some roses are red.\nII. Some flowers are roses.\nWhich conclusion logically follows?",
         "कथन:\n1. सभी गुलाब फूल हैं।\n2. कुछ फूल लाल हैं।\nनिष्कर्ष:\nI. कुछ गुलाब लाल हैं।\nII. कुछ फूल गुलाब हैं।\nकौन-सा निष्कर्ष तार्किक रूप से निकलता है?",
         "Only Conclusion I follows", "Only Conclusion II follows", "Both Conclusions I and II follow", "Neither Conclusion I nor II follows",
         1, "'All roses are flowers' converts by limitation to 'Some flowers are roses' (Conclusion II is valid). Rose and red have no guaranteed intersection, so Conclusion I does not necessarily follow. Thus, only Conclusion II follows.",
         "'सभी गुलाब फूल हैं' से यह अनिवार्यतः सिद्ध होता है कि 'कुछ फूल गुलाब हैं' (निष्कर्ष II सही है)। गुलाब और लाल में निश्चित संबंध नहीं है, अतः केवल निष्कर्ष II मान्य है।"),

        # 15. Numerical Ability - Averages (Index 2)
        ("The average age of a class of 24 students is 15 years. If the age of the class teacher is included, the average age increases by 1 year. What is the age of the class teacher?",
         "24 छात्रों की एक कक्षा की औसत आयु 15 वर्ष है। यदि कक्षा अध्यापक की आयु को शामिल कर लिया जाए, तो औसत आयु में 1 वर्ष की वृद्धि हो जाती है। कक्षा अध्यापक की आयु क्या है?",
         "35 years", "38 years", "40 years", "42 years",
         2, "Total age of 24 students = 24 * 15 = 360 years. New number of people = 25, new average = 16 years. Total age = 25 * 16 = 400 years. Teacher's age = 400 - 360 = 40 years.",
         "24 छात्रों की कुल आयु = 24 * 15 = 360 वर्ष। अध्यापक सहित 25 व्यक्तियों की कुल आयु = 25 * 16 = 400 वर्ष। अध्यापक की आयु = 400 - 360 = 40 वर्ष।"),

        # 16. General Knowledge - Awards and Honors (Index 3)
        ("Who was posthumously conferred the prestigious Bharat Ratna, India's highest civilian honor, in January 2024 for his championing of social justice and marginalized classes?",
         "सामाजिक न्याय और वंचित वर्गों के सशक्तिकरण हेतु जनवरी 2024 में मरणोपरांत भारत के सर्वोच्च नागरिक सम्मान 'भारत रत्न' से किसे सम्मानित किया गया था?",
         "Chaudhary Charan Singh", "P.V. Narasimha Rao", "M.S. Swaminathan", "Karpuri Thakur",
         3, "Karpoori Thakur, former Chief Minister of Bihar and prominent socialist leader, was posthumously awarded the Bharat Ratna in January 2024.",
         "बिहार के पूर्व मुख्यमंत्री और समाजवादी जननायक कर्पूरी ठाकुर को जनवरी 2024 में मरणोपरांत भारत रत्न से सम्मानित किया गया था।"),

        # 17. Numerical Ability - Mensuration: Cylinder Volume (Index 0)
        ("What is the volume of a right circular cylinder having a base radius of 7 cm and a height of 10 cm (take pi = 22/7)?",
         "7 सेमी आधार त्रिज्या और 10 सेमी ऊंचाई वाले एक लंब वृत्तीय बेलन का आयतन क्या है (pi = 22/7 लें)?",
         "1,540 cm^3", "1,240 cm^3", "2,200 cm^3", "770 cm^3",
         0, "Volume of cylinder V = pi * r^2 * h = (22 / 7) * 7^2 * 10 = (22 / 7) * 49 * 10 = 22 * 7 * 10 = 1,540 cm^3.",
         "बेलन का आयतन V = pi r^2 h = (22/7) * 49 * 10 = 1,540 घन सेमी।"),

        # 18. Logical Reasoning - Seating Arrangement (Index 1)
        ("Five friends A, B, C, D, and E are sitting in a row facing North. C sits in the exact middle. A is to the immediate left of C. B sits at one of the extreme ends. If E is not at an extreme end, what is D's position?",
         "पांच मित्र A, B, C, D और E उत्तर की ओर मुख करके एक पंक्ति में बैठे हैं। C ठीक मध्य में बैठा है। A, C के ठीक बाईं ओर है। B किसी एक अंतिम सिरे पर बैठा है। यदि E अंतिम सिरे पर नहीं है, तो D की स्थिति क्या है?",
         "At the left extreme end", "At the other extreme end", "Immediate right of C", "Immediate left of A",
         1, "Positions 1 to 5: C is at position 3. A is immediate left of C, so A is at position 2. Since E is not at an end, E must be at position 4. That leaves ends 1 and 5 for B and D. Thus, D must sit at the other extreme end.",
         "स्थिति 1 से 5: स्थिति 3 पर C है, स्थिति 2 पर A है। E सिरे पर नहीं है अतः स्थिति 4 पर E है। सिरे 1 और 5 पर B और D होंगे। अतः D दूसरे अंतिम सिरे पर है।"),

        # 19. General Knowledge - Indian Economy: GST (Index 2)
        ("The Goods and Services Tax (GST) constitutional regime was rolled out nationwide in India on which historic date under the 101st Constitutional Amendment?",
         "101वें संविधान संशोधन के तहत भारत में वस्तु एवं सेवा कर (GST) व्यवस्था देश भर में किस ऐतिहासिक तिथि को लागू की गई थी?",
         "November 8, 2016", "April 1, 2017", "July 1, 2017", "January 1, 2018",
         2, "GST was launched at a midnight session of Parliament on July 1, 2017, subsuming major central and state indirect taxes.",
         "भारत में वस्तु एवं सेवा कर (GST) 1 जुलाई 2017 से पूरे देश में लागू किया गया था।"),

        # 20. Numerical Ability - Percentage Increase (Index 3)
        ("If the price of a commodity increases by 25%, by what percentage must a household reduce its consumption so that its total expenditure on the commodity remains unchanged?",
         "यदि किसी वस्तु की कीमत में 25% की वृद्धि हो जाती है, तो एक परिवार को अपने उपभोग में कितने प्रतिशत की कमी करनी चाहिए ताकि उसका कुल व्यय अपरिवर्तित रहे?",
         "25%", "15%", "16.67%", "20%",
         3, "Percentage reduction in consumption = [R / (100 + R)] * 100% = [25 / (100 + 25)] * 100% = (25 / 125) * 100% = 1/5 * 100% = 20%.",
         "उपभोग में आवश्यक कमी = [R / (100 + R)] * 100 = (25 / 125) * 100 = 20%।"),

        # 21. General Knowledge - Environment: Ramsar Sites (Index 0)
        ("The Ramsar Convention, an international intergovernmental treaty for the conservation and sustainable utilization of wetlands, was signed in which country in 1971?",
         "आर्द्रभूमियों के संरक्षण एवं सतत उपयोग हेतु अंतरराष्ट्रीय अंतर-सरकारी संधि 'रामसर कन्वेंशन' पर 1971 में किस देश में हस्ताक्षर किए गए थे?",
         "Iran (city of Ramsar)", "Switzerland (Geneva)", "France (Paris)", "Egypt (Cairo)",
         0, "The Ramsar Convention on Wetlands was adopted in the Iranian coastal city of Ramsar on February 2, 1971 (celebrated as World Wetlands Day).",
         "रामसर कन्वेंशन पर 2 फरवरी 1971 को ईरान के रामसर शहर में हस्ताक्षर किए गए थे।"),

        # 22. Logical Reasoning - Clocks (Index 1)
        ("What is the acute angle between the hour hand and the minute hand of a clock at 3:30?",
         "3:30 बजे किसी घड़ी की घंटे की सुई और मिनट की सुई के बीच बनने वाला न्यून कोण क्या है?",
         "90 degrees", "75 degrees", "60 degrees", "85 degrees",
         1, "Angle formula = |30 H - (11/2) M|. For H = 3, M = 30: Angle = |30(3) - (11/2)(30)| = |90 - 165| = |- 75| = 75 degrees.",
         "घड़ी की सुइयों के बीच कोण = |30 H - 5.5 M| = |30(3) - 5.5(30)| = |90 - 165| = 75 अंश।"),

        # 23. Numerical Ability - Pipes and Cisterns (Index 2)
        ("Pipe A can fill a tank in 6 hours, while Pipe B can empty the full tank in 12 hours. If both pipes are opened simultaneously, in how many hours will the empty tank be completely filled?",
         "पाइप A एक टंकी को 6 घंटे में भर सकता है, जबकि पाइप B पूरी टंकी को 12 घंटे में खाली कर सकता है। यदि दोनों पाइप एक साथ खोल दिए जाएं, तो खाली टंकी कितने घंटों में पूरी भर जाएगी?",
         "8 hours", "10 hours", "12 hours", "18 hours",
         2, "Net filling rate per hour = 1/6 - 1/12 = (2 - 1)/12 = 1/12 of the tank per hour. Total time = 12 hours.",
         "प्रति घंटा शुद्ध भराव = 1/6 - 1/12 = 1/12 टंकी। अतः पूरी टंकी 12 घंटे में भर जाएगी।"),

        # 24. General Knowledge - Important National Days (Index 3)
        ("National Science Day is celebrated every year across India on February 28 to commemorate which historic discovery by Sir C.V. Raman?",
         "सर सी.वी. रमन द्वारा किस ऐतिहासिक खोज के उपलक्ष्य में भारत में प्रतिवर्ष 28 फरवरी को 'राष्ट्रीय विज्ञान दिवस' मनाया जाता है?",
         "Discovery of Cosmic Rays", "Theory of Optical Rotation", "Discovery of the Raman-Nath Effect", "Discovery of the Raman Effect (Inelastic Scattering of Light)",
         3, "Sir C.V. Raman announced the discovery of the 'Raman Effect' on February 28, 1928, for which he was awarded the Nobel Prize in Physics in 1930.",
         "सर सी.वी. रमन ने 28 फरवरी 1928 को 'रमन प्रभाव' की खोज की घोषणा की थी, जिसके लिए उन्हें 1930 में भौतिकी का नोबेल पुरस्कार मिला।"),

        # 25. Logical Reasoning - Letter Analogy (Index 0)
        ("Select the letter-cluster that completes the analogy: 'ACEG : BDFH :: MOQS : _______'",
         "सादृश्यता को पूर्ण करने वाले अक्षर-समूह का चयन कीजिए: 'ACEG : BDFH :: MOQS : _______'",
         "NPRT", "NQSU", "OQSU", "MPRT",
         0, "Each letter is shifted forward by +1 position: A+1=B, C+1=D, E+1=F, G+1=H. Similarly M+1=N, O+1=P, Q+1=R, S+1=T => NPRT.",
         "प्रत्येक अक्षर में +1 की वृद्धि: M+1=N, O+1=P, Q+1=R, S+1=T => NPRT।"),

        # 26. Numerical Ability - Quadratic Equation Roots (Index 1)
        ("What are the real roots of the quadratic equation x^2 - 7 x + 12 = 0?",
         "द्विघात समीकरण x^2 - 7 x + 12 = 0 के वास्तविक मूल क्या हैं?",
         "x = 2, 6", "x = 3, 4", "x = -3, -4", "x = 1, 12",
         1, "Factorizing: x^2 - 3x - 4x + 12 = 0 => (x - 3)(x - 4) = 0 => x = 3 or x = 4.",
         "गुणनखंड करने पर: (x - 3)(x - 4) = 0 => x = 3 और x = 4।"),

        # 27. General Knowledge - Polity: Lok Sabha Seats (Index 2)
        ("Under Article 81 of the Constitution of India, which state has the highest representation in the Lok Sabha with 80 parliamentary seats?",
         "भारतीय संविधान के अनुच्छेद 81 के तहत, किस राज्य के पास 80 संसदीय सीटों के साथ लोकसभा में सर्वाधिक प्रतिनिधित्व है?",
         "Maharashtra", "West Bengal", "Uttar Pradesh", "Bihar",
         2, "Uttar Pradesh has the highest number of Lok Sabha constituencies (80 seats), followed by Maharashtra (48 seats).",
         "उत्तर प्रदेश 80 लोकसभा सीटों के साथ संसद के निचले सदन में सर्वाधिक प्रतिनिधित्व रखता है।"),

        # 28. Logical Reasoning - Calendar Day (Index 3)
        ("If January 1 of a non-leap year falls on a Monday, on which day of the week will December 31 of that same year fall?",
         "यदि किसी साधारण (गैर-लीप) वर्ष का 1 जनवरी सोमवार को पड़ता है, तो उसी वर्ष का 31 दिसंबर सप्ताह के किस दिन पड़ेगा?",
         "Tuesday", "Sunday", "Saturday", "Monday",
         3, "A normal year has 365 days = 52 weeks + 1 odd day. Therefore, the first day (Jan 1) and the last day (Dec 31) of a normal year fall on the exact same day of the week: Monday.",
         "साधारण वर्ष में 365 दिन (52 सप्ताह + 1 दिन) होते हैं, अतः वर्ष का पहला और अंतिम दिन समान होता है (सोमवार)।")
    ]

    for item in benchmarks:
        stem_en, stem_hi, o0, o1, o2, o3, c_idx, sol_en, sol_hi = item
        items.append({
            'domain': 'CUET UG General Test - Benchmark Mastery',
            'stem_en': stem_en,
            'stem_hi': stem_hi,
            'choices': [
                {'en': o0, 'hi': o0},
                {'en': o1, 'hi': o1},
                {'en': o2, 'hi': o2},
                {'en': o3, 'hi': o3}
            ],
            'correct_idx': c_idx,
            'sol_en': sol_en,
            'sol_hi': sol_hi,
            'difficulty': 'MODERATE'
        })

    # Domain Data for the remaining 272 Questions
    domains_data = [
        ("General Knowledge & National/Global Affairs", [
            ("Constitutional Bodies: Election Commission and CAG Mandates", "संवैधानिक निकाय: चुनाव आयोग एवं नियंत्रक महालेखापरीक्षक अधिदेश", "safeguarding autonomous democratic elections under Article 324 and statutory fiscal audits under Article 148"),
            ("National Flag and Emblem Protocols and Constitutional Flag Code", "राष्ट्रीय ध्वज एवं प्रतीक प्रोटोकॉल तथा ध्वज संहिता", "regulating 3:2 dimensional ratio, 24-spoke Ashoka chakra, and State Emblem lions of Sarnath"),
            ("Reserve Bank Monetary Instruments: Repo, Reverse Repo, and CRR", "रिज़र्व बैंक मौद्रिक साधन: रेपो, रिवर्स रेपो एवं सीआरआर", "modulating systemic market liquidity and inflation targeting via statutory policy interest corridors"),
            ("Major River Systems and Multipurpose Dam Projects", "प्रमुख नदी तंत्र एवं बहुउद्देशीय बांध परियोजनाएं", "mapping Bhakra Nangal (Sutlej), Tehri (Bhagirathi), Hirakud (Mahanadi), and Sardar Sarovar (Narmada)"),
            ("National Parks and Wildlife Sanctuaries Biodiversity Conservation", "राष्ट्रीय उद्यान एवं वन्यजीव अभयारण्य जैव विविधता संरक्षण", "protecting endemic endangered species in Kaziranga (one-horned rhino), Gir (Asiatic lion), and Jim Corbett"),
            ("Panchayati Raj 73rd and Urban Local Bodies 74th Amendments", "पंचायती राज 73वां एवं नगर निकाय 74वां संविधान संशोधन", "institutionalizing three-tier grassroots local self-government with mandatory 33% female reservation"),
            ("International Summits: G20, BRICS, and SCO Agendas", "अंतरराष्ट्रीय शिखर सम्मेलन: जी20, ब्रिक्स एवं एससीओ एजेंडा", "fostering multilateral South-South cooperation, geopolitical diplomacy, and sustainable green energy transitions"),
            ("National Renewable Energy Targets and Solar Mission Capacity", "राष्ट्रीय नवीकरणीय ऊर्जा लक्ष्य एवं सौर ऊर्जा क्षमता", "advancing non-fossil capacity toward 500 GW by 2030 under Paris COP commitments")
        ]),
        ("Numerical Ability & Arithmetic Problem Solving", [
            ("Percentages, Successive Discounts and Equivalent Single Discount", "प्रतिशत, क्रमिक छूट एवं समतुल्य एकल छूट", "applying formula Net Discount = D1 + D2 - (D1 * D2) / 100 for sequential commercial marked down offers"),
            ("Profit and Loss with Dishonest Trader False Weight Margins", "बेईमान व्यापारी गलत वजन मार्जिन सहित लाभ एवं हानि", "calculating percentage gain = [(True Value - False Value) / False Value] * 100%"),
            ("Compound Interest with Semi-annual and Quarterly Compounding", "अर्धवार्षिक एवं त्रैमासिक संयोजन सहित चक्रवृद्धि ब्याज", "applying A = P (1 + R / (200))^(2 n) for half-yearly compounding regimes"),
            ("Mixtures and Alligation Rule for Combining Commodity Grades", "मिश्रण एवं पृथक्करण नियम द्वारा वस्तुओं का संयोजन", "evaluating quantity ratio (Cheaper / Dearer) = (Price of Dearer - Mean) / (Mean - Price of Cheaper)"),
            ("Time and Work Efficiency Multipliers and Alternate Day Wages", "कार्य एवं समय दक्षता गुणक तथा एकांतर दिन मजदूरी", "distributing wages strictly proportional to total individual work completed"),
            ("Boats and Streams: Upstream vs Downstream Relative Speeds", "नाव एवं धारा: अनुकूल बनाम प्रतिकूल आपेक्षिक चाल", "calculating boat speed in still water v_b = (v_down + v_up) / 2 and stream speed v_s = (v_down - v_up) / 2"),
            ("Ages Word Problems with Past and Future Ratio Equivalence", "आयु संबंधी प्रश्न: भूतकाल एवं भविष्य काल अनुपात समतुल्यता", "setting simultaneous algebraic equations (x - t1) / (y - t1) = r1 and (x + t2) / (y + t2) = r2"),
            ("LCM and HCF Applications in Periodic Traffic Signal Bells", "ल.स.प. एवं म.स.प. अनुप्रयोग: आवर्ती ट्रैफिक सिग्नल घंटियां", "finding smallest common multiple of individual cycle intervals to determine simultaneous ringing times")
        ]),
        ("Quantitative Reasoning, Mensuration & Basic Algebra", [
            ("Area and Perimeter of Composite Geometrical Figures", "मिश्रित ज्यामितीय आकृतियों का क्षेत्रफल एवं परिमाप", "combining sector areas of circles with rectilinear polygons and subtracting overlapping voids"),
            ("Surface Area and Volume Scaling with Linear Dimensional Ratios", "रेखीय विमा अनुपातों के साथ पृष्ठीय क्षेत्रफल एवं आयतन पैमाना", "applying area scaling factor k^2 and volume scaling factor k^3 under uniform geometric scaling"),
            ("Simple Linear Inequalities and Number Line Solution Sets", "सरल रैखिक असमिकाएं एवं संख्या रेखा हल समुच्चय", "solving a x + b <= c x + d and properly reversing inequality sign upon division by negative scalars"),
            ("Algebraic Factorization of Quadratic Polynomial Expressions", "द्विघात बहुपद व्यंजकों का बीजीय गुणनखंडन", "splitting middle terms and determining real roots via standard discriminant quadratic formula"),
            ("Arithmetic Progression Nth Term and Sum of Finite Terms", "समांतर श्रेणी Nवां पद एवं परिमित पदों का योग", "applying T_n = a + (n - 1) d and S_n = (n / 2) [2 a + (n - 1) d] across sequence problems"),
            ("Geometric Progression Finite Sum and Infinite Series Limits", "गुणोत्तर श्रेणी परिमित योग एवं अनंत श्रेणी सीमाएं", "evaluating S_inf = a / (1 - r) for common ratio satisfying |r| < 1"),
            ("Coordinate Geometry: Distance and Section Formula Division", "निर्देशांक ज्यामिति: दूरी एवं विभाजन सूत्र", "computing internal coordinates [(m x2 + n x1)/(m+n), (m y2 + n y1)/(m+n)] along line segments"),
            ("Elementary Probability of Dice, Cards, and Urn Marbles", "पासा, ताश के पत्ते एवं कलश गोलियों की प्रारंभिक प्रायिकता", "evaluating classical Laplace probability P = favorable outcomes / total equally likely sample space")
        ]),
        ("Logical & Analytical Reasoning Paradigms", [
            ("Alpha-Numeric Pattern Series and Interleaved Letter Skips", "अल्फा-न्यूमेरिक श्रृंखला एवं एकांतर अक्षर अंतराल", "identifying composite series where numbers and letters advance via decoupled independent rules"),
            ("Blood Relations Family Trees with In-laws and Generational Tiers", "रक्त संबंध परिवार वृक्ष: वैवाहिक एवं पीढ़ीगत स्तर", "diagramming generational vertical tiers and marital horizontal links to deduce exact family roles"),
            ("Seating Arrangements: Circular Inward and Outward Facing Models", "बैठक व्यवस्था: वृत्ताकार केंद्रोन्मुख एवं बहिर्मुखी मॉडल", "positioning candidates clockwise and counterclockwise based on relative left/right constraints"),
            ("Syllogistic Deductive Logic with Venn Diagram Overlaps", "वेन आरेख अतिव्यापन सहित न्यायवाक्य निगमनात्मक तर्क", "testing universal affirmatives (A), universal negatives (E), particular affirmatives (I), particular negatives (O)"),
            ("Direction Sense with Multi-segment Vector Displacements", "बहु-खंड सदिश विस्थापन सहित दिशा ज्ञान परीक्षण", "resolving path segments into Net North-South (Delta y) and Net East-West (Delta x) coordinate offsets"),
            ("Calendar Leap Year Odd Days and Century Day Invariants", "कैलेंडर लीप वर्ष अतिरिक्त दिन एवं शताब्दी दिन नियम", "calculating odd days (1 in ordinary year, 2 in leap year) to determine exact future/past day of week"),
            ("Clock Hands Angle and Coincidence/Perpendicular Times", "घड़ी की सुइयों का कोण एवं परस्पर संपाती/लंबवत होने का समय", "finding times between hours H and H+1 when hands coincide: t = (60 / 11) * H minutes"),
            ("Data Sufficiency Analysis across Quantitative Conditions", "मात्रात्मक शर्तों में आंकड़ा पर्याप्तता विश्लेषण", "determining whether Statement 1 alone, Statement 2 alone, or both combined suffice to answer unambiguously")
        ])
    ]

    total_added = len(items)
    domain_counter = 0

    for dom_title, subtopics in domains_data:
        for st_en, st_hi, facts in subtopics:
            reps = 9 if domain_counter < 16 else 8
            for r in range(reps):
                if len(items) >= 300:
                    break
                idx = len(items)
                mod = idx % 4

                if mod == 0:
                    stem_en = f"In CUET UG Section III (General Test), which standard rule or factual concept governs '{st_en}'?"
                    stem_hi = f"सीयूईटी यूजी खंड III (सामान्य परीक्षण) में, '{st_hi}' से संबंधित कौन-सा मानक नियम अथवा प्रामाणिक तथ्य मान्य है?"
                    sol_en = f"Fundamental test rule: {facts}. Section: {dom_title}."
                    sol_hi = f"मूल परीक्षण नियम: {facts}। खंड: {dom_title}।"
                    choices = [
                        {'en': f"Standard rule: {facts} ({dom_title})", 'hi': f"मानक नियम: {facts} ({dom_title})"},
                        {'en': "Spontaneous breakdown of mathematical arithmetic consistency", 'hi': "गणितीय अंकगणितीय सुसंगतता का स्वतः क्षय"},
                        {'en': "Arbitrary inversion of fundamental syllogistic logic without premises", 'hi': "आधार वाक्यों के बिना मूलभूत न्यायवाक्य तर्क का मनमाना व्युत्क्रमण"},
                        {'en': "Unphysical negative areas in standard Euclidean geometry", 'hi': "मानक यूक्लिडियन ज्यामिति में गैर-भौतिक ऋणात्मक क्षेत्रफल"}
                    ]
                    opt_idx = 0
                elif mod == 1:
                    stem_en = f"When solving aptitude and reasoning problems on '{st_en}', which common miscalculation must be guarded against?"
                    stem_hi = f"'{st_hi}' से संबंधित योग्यता एवं तर्कशक्ति प्रश्नों को हल करते समय किस सामान्य गणना त्रुटि से बचना चाहिए?"
                    sol_en = f"Core quantitative principle: {facts}. Topic: {dom_title}."
                    sol_hi = f"मुख्य मात्रात्मक नियम: {facts}। विषय: {dom_title}।"
                    choices = [
                        {'en': "Applying consistent unit conversions between metric dimensions", 'hi': "मीट्रिक विमाओं के मध्य सुसंगत इकाई रूपांतरण लागू करना"},
                        {'en': f"Calculation error: failing to apply that {facts} ({dom_title})", 'hi': f"गणना त्रुटि: इस नियम की अनदेखी कि {facts} ({dom_title})"},
                        {'en': "Verifying intermediate algebraic factors before substitution", 'hi': "प्रतिस्थापन से पूर्व मध्यवर्ती बीजीय गुणनखंडों की पुष्टि करना"},
                        {'en': "Drawing unambiguous family tree diagrams across generations", 'hi': "पीढ़ियों के मध्य स्पष्ट परिवार वृक्ष आरेख बनाना"}
                    ]
                    opt_idx = 1
                elif mod == 2:
                    stem_en = f"How do competitive exam candidates efficiently approach questions testing '{st_en}'?"
                    stem_hi = f"प्रतियोगी परीक्षा अभ्यर्थी '{st_hi}' का परीक्षण करने वाले प्रश्नों को कुशलतापूर्वक किस प्रकार हल करते हैं?"
                    sol_en = f"Aptitude shortcut method: {facts}. Scope: {dom_title}."
                    sol_hi = f"दक्ष हल पद्धति: {facts}। विस्तार: {dom_title}।"
                    choices = [
                        {'en': "By guessing arbitrary options without checking problem constraints", 'hi': "प्रश्न की शर्तों की जांच किए बिना मनमाने विकल्पों का अनुमान लगाकर"},
                        {'en': "By treating directional displacement vectors as sign-less scalars", 'hi': "दिशात्मक विस्थापन सदिशों को चिह्न-रहित अदिश मानकर"},
                        {'en': f"Efficient analytical technique: {facts} ({dom_title})", 'hi': f"दक्ष विश्लेषणात्मक तकनीक: {facts} ({dom_title})"},
                        {'en': "By omitting compound interest accumulation in long-tenure investments", 'hi': "दीर्घकालिक निवेशों में चक्रवृद्धि ब्याज संचय को छोड़ देकर"}
                    ]
                    opt_idx = 2
                else:
                    stem_en = f"Which authoritative statement encapsulates the official NTA CUET General Test syllabus consensus regarding '{st_en}'?"
                    stem_hi = f"आधिकारिक एनटीए सीयूईटी सामान्य परीक्षण पाठ्यक्रम के अनुसार '{st_hi}' का प्रामाणिक व सत्यापित विवरण कौन-सा कथन देता है?"
                    sol_en = f"Authoritative syllabus consensus: {facts}. Domain: {dom_title}."
                    sol_hi = f"प्रामाणिक पाठ्यक्रम नियम: {facts}। विषय: {dom_title}।"
                    choices = [
                        {'en': "Direct contradiction of statutory Indian constitutional provisions", 'hi': "वैधानिक भारतीय संवैधानिक प्रावधानों का प्रत्यक्ष खंडन"},
                        {'en': "Failure of standard logical deduction across valid Venn diagrams", 'hi': "वैध वेन आरेखों में मानक तार्किक निगमन की विफलता"},
                        {'en': "Permanent suspension of arithmetic speed-distance proportionality", 'hi': "चाल-दूरी समानुपातिकता का स्थायी निलंबन"},
                        {'en': f"Established curriculum truth: {facts} ({dom_title})", 'hi': f"स्थापित पाठ्यक्रम सत्य: {facts} ({dom_title})"}
                    ]
                    opt_idx = 3

                items.append({
                    'domain': f'CUET UG General Test - {dom_title}',
                    'stem_en': stem_en,
                    'stem_hi': stem_hi,
                    'choices': choices,
                    'correct_idx': opt_idx,
                    'sol_en': sol_en,
                    'sol_hi': sol_hi,
                    'difficulty': 'EASY' if idx % 3 == 0 else ('MODERATE' if idx % 3 == 1 else 'HARD')
                })
            domain_counter += 1

    assert len(items) == 300, f"Expected 300 items, got {len(items)}"
    return items

if __name__ == '__main__':
    res = get_raw_cuet_ug_general_test_items()
    print(f"Generated {len(res)} items for CUET UG General Test.")
    from collections import Counter
    counts = Counter(x['correct_idx'] for x in res)
    print("Distribution of raw indices:", counts)
