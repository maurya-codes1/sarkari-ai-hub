# backend/scripts/builders/class12_languages_builder.py
# High-Yield Class 12 Core Languages Generator: English & Hindi
# Generates 220+ MCQs and 12+ authentic Subjectives with step-by-step marking rubrics.

import os
import sys

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
if SCRIPT_DIR not in sys.path:
    sys.path.insert(0, SCRIPT_DIR)

from domain_english import generate_english_questions
from domain_hindi import generate_hindi_questions

def get_class12_english(board_name="Board"):
    mcqs_raw = generate_english_questions(220, board_name)
    mcqs = [
        {
            "q": q["q"], "options": q["options"], "ans": q["ans"],
            "exp": q["exp"], "chapter": q.get("chapter", "Class 12 Advanced English Grammar & Usage"),
            "pyqTag": f"{board_name} Class 12 English Board PYQ"
        } for q in mcqs_raw
    ]
    subjs = [
        {
            "q": "You are Anand/Anandi of 15, Mall Road, Shimla. You saw an advertisement in 'The Tribune' for the post of Senior Computer Science Teacher in Modern Public School, Chandigarh. Write a formal Job Application along with a detailed Bio-data in 120-150 words.",
            "marks": 5,
            "solution": "15, Mall Road, Shimla\nDate: 20th October 2026\n\nTo,\nThe Principal / Manager,\nModern Public School, Sector 21,\nChandigarh\n\nSubject: Application for the post of Senior Computer Science Teacher.\n\nRespected Sir/Madam,\nIn response to your esteemed advertisement published in 'The Tribune' dated 18th October 2026 for the post of Senior Computer Science Teacher (PGT), I wish to offer my candidature for the same.\n\nI possess a Master's degree in Computer Applications (MCA) with First Division, followed by a B.Ed. degree. I have over four years of successful teaching experience preparing senior secondary students for Board examinations and competitive coding olympiads. My teaching philosophy focuses on experiential project-based coding and nurturing analytical thinking.\n\nI possess excellent interpersonal communication skills and am proficient in Python, SQL, and Web Technologies. If given an opportunity, I assure you of dedicated service and relentless commitment towards academic excellence. My detailed Bio-data is enclosed herewith for your kind consideration.\n\nYours faithfully,\n[Candidate Signature]\nANAND / ANANDI\n\nENCLOSURE: BIO-DATA\n1. Name: Anand Kumar / Anandi Sharma\n2. Father's Name: Sh. R.K. Sharma\n3. Date of Birth: 14th August 1996\n4. Educational Qualifications:\n   - MCA (Panjab University, 2019) - 82%\n   - B.Sc. Computer Science (HPU, 2017) - 85%\n   - B.Ed. (Panjab University, 2021) - 80%\n5. Work Experience: PGT Computer Science at DAV Senior Secondary School, Shimla (2022-Present).\n6. References:\n   (i) Dr. S.K. Verma, Professor, Dept. of Computer Science, Panjab University.\n   (ii) Mrs. Meenakshi Joshi, Principal, DAV Senior Secondary School, Shimla.",
            "chapter": "Job Application Writing with Bio-data",
            "pyqTag": f"{board_name} 5-Marks Advanced Writing"
        },
        {
            "q": "You are Secretary of the Cultural Club of your school. Draft a formal Invitation Card to invite parents and guests to the Annual Cultural Evening 'Umang 2026'.",
            "marks": 4,
            "solution": "THE PRINCIPAL, STAFF AND STUDENTS OF\nDELHI PUBLIC SCHOOL, R.K. PURAM\n\ncordially invite you to the auspicious occasion of the\nANNUAL CULTURAL EVENING 'UMANG 2026'\n\non Saturday, 14th November 2026\nat 5:30 PM in the School Auditorium.\n\nHon'ble Minister of Education, Government of India\nhas kindly consented to grace the occasion as the CHIEF GUEST.\n\nProgramme Highlights:\n- Inaugural Classical Orchestral Symphony\n- Musical Drama: 'Pride of Freedom'\n- Annual Academic & Sports Felicitation\n\nRSVP: Cultural Club Secretary | Phone: 011-26123456\n(Please be seated by 5:15 PM. Entry strictly by invitation card).",
            "chapter": "Formal Invitation Writing",
            "pyqTag": f"{board_name} 4-Marks Invitation Writing"
        },
        {
            "q": "Draft a formal reply expressing your inability to accept an invitation to attend an alumni reunion dinner due to a prior official engagement.",
            "marks": 4,
            "solution": "FORMAL REPLY (LETTER FORMAT - REGRET)\n\n24, Civil Lines, Jaipur\nDate: 12th October 2026\n\nDear Mr. Kapoor / Organizing Committee,\nI express my profound gratitude to the Alumni Association of St. Xavier's College for the cordial invitation to attend the 25th Silver Jubilee Alumni Reunion Dinner scheduled for 25th October 2026 at Hotel Grand Palace.\n\nHowever, I deeply regret my inability to attend the gala evening due to a prior, unavoidable international business delegation meeting in Mumbai on the same dates.\n\nI convey my heartiest congratulations to all batchmates and best wishes for the grand success of the reunion.\n\nWith warm regards,\nYours sincerely,\n[Candidate Name]\nBatch of 2001",
            "chapter": "Formal Reply (Acceptance/Regret)",
            "pyqTag": f"{board_name} 4-Marks Invitation Reply"
        },
        {
            "q": "Write a formal Report in 120-150 words on a massive fire outbreak in a commercial complex in your city for publication in a national daily.",
            "marks": 5,
            "solution": "DEVASTATING FIRE ENGULFS COMMERCIAL COMPLEX IN NEHRU PLACE\n- By Staff Reporter, The Indian Express\n\nNew Delhi, 5th October: A major blaze ripped through a four-storey commercial complex, Surya Tower, in the bustling Nehru Place electronic market early this morning, destroying electronic merchandise worth several crores.\n\nThe fire reportedly erupted around 6:30 AM on the second floor, suspected to have originated from a severe electrical short-circuit in an air-conditioning unit. Fed by combustible packaging materials, synthetic cables, and cardboard boxes, thick black plumes of smoke quickly billowed across the skyline.\n\nTen fire tenders rushed to the spot within fifteen minutes of the emergency distress call. Over fifty firefighters battled blazing infernos and suffocating fumes for over three hours before bringing the fire under control. Fortunately, because the market had not yet opened for business, no casualties were reported. Two security guards were rescued safely using hydraulic snorkel cranes.\n\nThe Delhi Fire Service has initiated a probe to ascertain whether the mandatory fire extinguishing equipment and automatic sprinklers inside the premises were operational.",
            "chapter": "Report Writing (Newspaper Format)",
            "pyqTag": f"{board_name} 5-Marks Newspaper Report"
        },
        {
            "q": "Write an Article in 120-150 words on 'Mental Health & Stress Management Among Teenagers in the Digital Age'.",
            "marks": 5,
            "solution": "Mental Health & Stress Management Among Teenagers in the Digital Age\n- By [Candidate Name]\n\nAdolescence has always been a period of profound physical, cognitive, and psychological transformation. However, in today's hyper-connected digital era, teenagers grapple with unprecedented mental stress, anxiety, and performance burnout.\n\nThe constant pressure of academic competition, entrance exam cut-offs, and career anxieties are magnified tenfold by social media algorithms. Platforms that promote idealized lifestyles foster crippling 'Fear of Missing Out' (FOMO), negative body image perceptions, and toxic peer comparisons. Furthermore, chronic sleep deprivation caused by late-night screen scrolling severely damages emotional resilience.\n\nCombating this teenage mental health crisis demands institutional empathy. Schools must integrate dedicated counseling cells, mindfulness meditation, and mental health literacy into daily timetables without societal stigma. Parents must replace transactional grade expectations with open, non-judgmental communication. Encouraging regular outdoor physical exercise, creative hobbies, and structured digital detox routines can restore emotional balance in young lives.",
            "chapter": "Article Writing",
            "pyqTag": f"{board_name} 5-Marks Article Writing"
        },
        {
            "q": "How does the story 'The Last Lesson' by Alphonse Daudet highlight the psychological pain of losing one's native language under foreign subjugation?",
            "marks": 5,
            "solution": "1. Emotional Turning Point:\nIn 'The Last Lesson', the Prussian invasion of Alsace and Lorraine leads to an authoritarian decree from Berlin enforcing German in schools, abolishing the teaching of French. The protagonist, young Franz, who previously considered French grammar rules tedious and M. Hamel's ruler terrifying, experiences an overwhelming awakening of linguistic pride and remorse.\n\n2. The Dignity of the Mother Tongue:\nM. Hamel, dressed in his finest ceremonial attire, delivers his final lecture with extraordinary pathos. He reminds the village elders sitting quietly on the back benches that French is the most beautiful, clearest, and most logical language in the world. He passionately proclaims: 'When a people are enslaved, as long as they hold fast to their language it is as if they had the key to their prison'.\n\n3. The Symbolism:\nThe final moments where M. Hamel, choking with emotion, turns to the blackboard and writes in giant letters 'VIVE LA FRANCE!' (Long Live France!) immortalizes the truth that an invader can conquer territory, but the soul and cultural identity of a people reside perpetually in their mother tongue.",
            "chapter": "Flamingo Prose: The Last Lesson (Alphonse Daudet)",
            "pyqTag": f"{board_name} 5-Marks Literature Question"
        },
        {
            "q": "In 'The Rattrap' by Selma Lagerlöf, how does Edla Willmansson's unconditional compassion and empathy reform the hardened vagabond?",
            "marks": 5,
            "solution": "1. The Vagabond's Cynical Worldview:\nThe peddler lived an impoverished, solitary existence selling small wire rattraps. He viewed the entire world as a gigantic rattrap whose baits of riches, food, and shelter existed solely to entrap and ruin vulnerable men. Even when given shelter by an old crofter, he betrayed his trust and stole 30 kronor.\n\n2. The Contrast in Treatment:\nWhen mistaken for an old captain by the Ironmaster, the peddler was invited home; but once his identity was discovered in broad daylight, the Ironmaster threatened to call the sheriff. In contrast, his compassionate daughter, Edla Willmansson, intervened. She understood his wretched, hunted existence—walking the whole year round without a single welcoming home.\n\n3. The Power of Radical Empathy:\nEdla treated him with royal dignity, calling him 'Captain', serving him Christmas food, and assuring him that he was safe from any betrayal. This genuine, unconditional human love struck at the peddler's hardened conscience. Before departing, he left the stolen 30 kronor with a note requesting it be returned to the crofter, accompanied by a small rattrap as a Christmas gift. Edla's profound trust elevated him to act like a true captain.",
            "chapter": "Flamingo Prose: The Rattrap (Selma Lagerlöf)",
            "pyqTag": f"{board_name} 5-Marks Character & Thematic Study"
        },
        {
            "q": "Analyze the themes of human aging, fear of mortality, and filial helplessness in Kamala Das's poem 'My Mother at Sixty-Six'.",
            "marks": 4,
            "solution": "1. Confronting Mortality:\nWhile driving to the Cochin airport, the poet glances at her elderly mother sleeping beside her with an open mouth. Her face appeared pale, ashen, and lifeless like a corpse. This visual jolts the poet into a sharp realization of her mother's advancing age and approaching mortality.\n\n2. Juxtaposition of Life and Death:\nTo distract her aching mind from this grim truth, she looks outside the car window at 'young trees sprinting' and 'merry children spilling out of their homes'. This vivid imagery symbolizes exuberance, vitality, energy, and relentless youth, creating a poignant contrast with the decaying physical state of her mother.\n\n3. Concealing Pain:\nAt the airport security check, seeing her mother again looking wan and pale like a 'late winter's moon', the poet feels the familiar childhood ache of losing her mother. Yet, unable to alter the inevitable cycle of life, she hides her agonizing sorrow behind a parting smile: 'All I said was, see you soon, Amma, all I did was smile and smile and smile...'",
            "chapter": "Flamingo Poetry: My Mother at Sixty-Six (Kamala Das)",
            "pyqTag": f"{board_name} 4-Marks Poetry Analysis"
        },
        {
            "q": "How did Mahatma Gandhi transform the Champaran peasant struggle (1917) into a historic turning point for Indian independence in Louis Fischer's 'Indigo'?",
            "marks": 4,
            "solution": "1. The Injustice of the Tinkathia System:\nEuropean British planters compelled Indian sharecroppers in Champaran, Bihar, to cultivate indigo on 3/20th (15%) of their total landholdings and surrender the entire harvest as rent. When German synthetic indigo rendered natural indigo unprofitable, planters extracted extortionate compensations to release peasants from agreements.\n\n2. Gandhi's Satyagraha Methodology:\n- Disobedience of unjust orders: When ordered by the British Commissioner to leave Champaran, Gandhi refused, submitting to trial without fear.\n- Mobilization of legal power: He motivated prominent lawyers (like Dr. Rajendra Prasad) to stop taking high fees and dedicate themselves to the peasant cause.\n- Empirical evidence collection: Thousands of written depositions and proof of landlord extortion were compiled.\n\n3. The Outcome and Significance:\nThe British inquiry commission agreed that landlords must refund money; Gandhi accepted a 25% refund, establishing that British prestige and authority were broken. Most importantly, it liberated Indian peasants from fear of British landlords, becoming the laboratory where civil disobedience triumphed for the first time in India.",
            "chapter": "Flamingo Prose: Indigo (Louis Fischer)",
            "pyqTag": f"{board_name} 4-Marks History & Literature"
        },
        {
            "q": "In 'The Enemy' by Pearl S. Buck, explain how Dr. Sadao Hoki resolved the conflict between his duty as a patriotic citizen of wartime Japan and his humanitarian ethics as a physician.",
            "marks": 5,
            "solution": "1. The Moral Dilemma:\nDuring World War II, Dr. Sadao and his wife Hana discovered an unconscious, critically wounded American prisoner of war (POW), Tom, washed ashore outside their house. Harbouring an American enemy was an act of high treason punishable by death, but abandoning him meant certain death for the wounded soldier.\n\n2. The Triumph of Professional Oath:\nDr. Sadao was trained at a top American medical school where his professor drilled that allowing a patient to die when one could save him was a physician's cardinal sin. Overcoming internal racial prejudices and open hostility from household servants who deserted the house, Dr. Sadao performed a complicated surgery to extract the bullet from near the soldier's kidney and nursed him back to health.\n\n3. Reconciliation with State Duty:\nTo remain loyal to Japan, Dr. Sadao reported the presence of the POW to the Japanese General, who promised to send private assassins. However, when the General forgot his promise, Dr. Sadao did not murder the soldier; instead, he secretly arranged a boat with food, bottled water, and a flashlight, assisting Tom to escape safely to an uninhabited island. Dr. Sadao proved that the universal duty to preserve human life transcends wartime geopolitical hatred.",
            "chapter": "Vistas: The Enemy (Pearl S. Buck)",
            "pyqTag": f"{board_name} 5-Marks Moral Conflict Study"
        }
    ]
    return mcqs, subjs

def get_class12_hindi(board_name="Board"):
    mcqs_raw = generate_hindi_questions(220, board_name)
    mcqs = [
        {
            "q": q["q"], "options": q["options"], "ans": q["ans"],
            "exp": q["exp"], "chapter": q.get("chapter", "कक्षा 12 सामान्य व साहित्यिक हिन्दी व्याकरण"),
            "pyqTag": f"{board_name} Class 12 Hindi Board PYQ"
        } for q in mcqs_raw
    ]
    subjs = [
        {
            "q": "'आधुनिक समाज में नैतिक मूल्यों का क्षरण और उसका समाधान' विषय पर 300 शब्दों में एक उत्कृष्ट निबंध लिखिए।",
            "marks": 6,
            "solution": "आधुनिक समाज में नैतिक मूल्यों का क्षरण: कारण एवं समाधान\n\n1. प्रस्तावना:\nनैतिक मूल्य किसी भी सभ्य समाज की वह अंतर्निहित शक्ति हैं जो मानव को पशुता से ऊपर उठाकर मानवता की ओर ले जाती हैं। सत्य, अहिंसा, करुणा, कर्तव्यनिष्ठा, बड़ों का सम्मान और परोपकार भारतीय संस्कृति के प्राणतत्व रहे हैं। परंतु आज 21वीं सदी के अंधाधुंध उपभोक्तावाद, भौतिकवादी प्रतिस्पर्धा और अनियंत्रित तकनीकी विस्तार के कारण समाज में नैतिक मूल्यों का गंभीर अवमूल्यन हो रहा है।\n\n2. नैतिक क्षरण के मुख्य कारण:\n(क) अंध उपभोक्तावाद एवं धनलोलुपता: आज मनुष्य का मूल्यांकन उसके गुणों व चरित्र से नहीं, बल्कि उसकी भौतिक संपत्ति, पद और वैभव से किया जाने लगा है। 'सादा जीवन, उच्च विचार' का स्थान 'स्वार्थ और विलासिता' ने ले लिया है।\n(ख) संयुक्त परिवारों का विघटन: एकल परिवारों और व्यस्त दिनचर्या के चलते बच्चों को दादा-दादी के संस्कार और नैतिक मार्गदर्शन नहीं मिल पा रहा है।\n(ग) डिजिटल मीडिया का विकृत प्रभाव: सोशल मीडिया और इंटरनेट पर अनियंत्रित अश्लीलता, हिंसा और त्वरित प्रसिद्धि की लालसा युवाओं को मानसिक रूप से भटका रही है।\n(घ) शिक्षा का व्यावसायीकरण: वर्तमान शिक्षा प्रणाली केवल डिग्री बांटने और धन कमाने का माध्यम बन गई है, जिसमें चरित्र निर्माण और मानवीय संवेदनाओं की शिक्षा का अभाव है।\n\n3. समाधान के उपाय:\n- प्राथमिक स्तर से ही पाठ्यक्रम में नैतिक शिक्षा, ध्यान और जीवन मूल्यों को अनिवार्य रूप से समाविष्ट किया जाए।\n- माता-पिता को केवल अंकों की होड़ में बच्चों को झोंकने के बजाय उनके साथ समय बिताना चाहिए और अपने आचरण से आदर्श प्रस्तुत करना चाहिए।\n- समाज में सच्चरित्रता, त्याग और ईमानदारी का सम्मान करने की संस्कृति को पुनर्स्थापित किया जाए।\n\n4. उपसंहार:\nभौतिक समृद्धि आवश्यक है, परंतु चरित्र की कीमत पर प्राप्त समृद्धि समाज को विनाश की ओर ले जाती है। स्वामी विवेकानंद के शब्दों में - 'हमें ऐसी शिक्षा और ऐसे समाज की आवश्यकता है जिससे मनुष्य का निर्माण हो सके।'",
            "chapter": "निबंध लेखन (Class 12 Advanced Essay)",
            "pyqTag": f"{board_name} 6-Marks Hindi Essay"
        },
        {
            "q": "किसी दैनिक समाचार पत्र के मुख्य संपादक को पत्र लिखकर अपने राज्य में नशाखोरी और युवाओं में मादक पदार्थों के बढ़ते अवैध कारोबार पर गहरी चिंता व्यक्त करते हुए प्रभावी कार्रवाई का आह्वान कीजिए।",
            "marks": 5,
            "solution": "सेवा में,\nमुख्य संपादक महोदय,\nदैनिक जागरण / अमर उजाला,\n[शहर का नाम]\n\nदिनांक: [दिनांक]\n\nविषय: युवाओं में बढ़ते मादक द्रव्यों के सेवन तथा अवैध नशा तस्करी पर रोक लगाने हेतु।\n\nमहोदय,\nमैं आपके प्रतिष्ठित और जनप्रिय समाचार पत्र के माध्यम से राज्य सरकार, पुलिस प्रशासन और प्रबुद्ध समाज का ध्यान युवाओं में तेजी से पैर पसार रहे नशाखोरी के भयानक अभिशाप की ओर आकर्षित करना चाहता हूँ।\n\nआज हमारे राज्य के नगरों और ग्रामीण अंचलों में स्कूल-कॉलेजों के समीप सिंथेटिक ड्रग्स, स्मैक, नशीली गोलियों और हुक्का बारों का अवैध संजाल धड़ल्ले से फल-फूल रहा है। अंतरराष्ट्रीय ड्रग सिंडिकेट हमारे किशोरों और नवयुवकों को अपना आसान शिकार बना रहे हैं। इसके परिणामस्वरूप हजारों होनहार युवाओं का शारीरिक, मानसिक और शैक्षणिक भविष्य पूरी तरह बर्बाद हो रहा है तथा समाज में चोरी, लूटपाट और संगीन अपराधों में भयावह वृद्धि हो रही है।\n\nप्रशासन द्वारा की जाने वाली दिखावटी गिरफ्तारियां इस बहुस्तरीय आपराधिक तंत्र को तोड़ने में नाकाम रही हैं। आवश्यकता इस बात की है कि:\n1. शिक्षण संस्थानों के 200 मीटर के दायरे में कड़ा एंटी-ड्रग टास्क फोर्स सर्विलांस स्थापित किया जाए।\n2. ड्रग माफिया के मुख्य सरगनाओं पर गैंगस्टर एक्ट और संपत्ति जब्ती जैसी कठोरतम कार्रवाई हो।\n3. प्रत्येक जिले में आधुनिक निःशुल्क नशामुक्ति एवं पुनर्वास केंद्र खोले जाएं।\n\nआशा है कि आप इस जनहितकारी विषय को अपने समाचार पत्र में प्रमुखता से प्रकाशित करेंगे।\n\nसधन्यवाद,\nभवदीय,\n[परीक्षार्थी का नाम]\nनागरिक चेतना मंच, [शहर]",
            "chapter": "संपादकीय पत्र लेखन (Official Letter)",
            "pyqTag": f"{board_name} 5-Marks Hindi Editorial Letter"
        },
        {
            "q": "समाचार लेखन की 'उल्टा पिरामिड शैली' (Inverted Pyramid Style) क्या है? समाचार के छह ककारों (Six W's) का सविस्तार वर्णन कीजिए।",
            "marks": 5,
            "solution": "1. उल्टा पिरामिड शैली (Inverted Pyramid Style):\n- समाचार लेखन की यह सर्वाधिक लोकप्रिय, मानक और बुनियादी शैली है।\n- इस शैली में किसी घटना का सबसे महत्वपूर्ण तथ्य सबसे पहले (शीर्ष पर) लिखा जाता है, उसके बाद घटते हुए महत्व क्रम में अन्य विवरण दिए जाते हैं। कहानी या उपन्यास की भांति इसमें क्लाइमेक्स अंत में नहीं, बल्कि आरंभ में होता है।\n- इसके तीन मुख्य भाग होते हैं: (i) मुखड़ा/लीड/इंट्रो (Intro), (ii) बॉडी (Body), (iii) समापन (Conclusion)।\n\n2. समाचार के छह ककार (Six W's):\nकिसी भी समाचार को पूर्णता प्रदान करने के लिए 6 बुनियादी प्रश्नों के उत्तर दिए जाते हैं जिन्हें 'छह ककार' कहा जाता है:\n(क) क्या (What): घटना क्या है? (लीड में)\n(ख) कौन (Who): घटना में कौन-कौन लोग शामिल हैं या प्रभावित हैं? (लीड में)\n(ग) कहाँ (Where): घटना किस स्थान पर घटित हुई? (लीड में)\n(घ) कब (When): घटना किस समय व दिन घटित हुई? (लीड में)\n(ङ) क्यों (Why): घटना के पीछे क्या कारण या पृष्ठभूमि थी? (बॉडी में)\n(च) कैसे (How): घटना किस प्रकार घटित हुई और इसके क्या प्रत्यक्ष प्रभाव पड़े? (बॉडी व समापन में)।\nप्रथम चार ककार सूचनात्मक होते हैं जबकि अंतिम दो ककार विवरणात्मक व विश्लेषणात्मक होते हैं।",
            "chapter": "अभिव्यक्ति और माध्यम: समाचार लेखन",
            "pyqTag": f"{board_name} 5-Marks Media Writing"
        },
        {
            "q": "हरिवंश राय बच्चन की कविता 'आत्मपरिचय' के आधार पर कवि के संसार से अंतर्विरोध और 'दीवानों की मस्ती' के दर्शन को स्पष्ट कीजिए।",
            "marks": 4,
            "solution": "1. संसार से अंतर्विरोध:\nकवि संसार के भौतिकतावादी नियमों और अपनी भावुक आध्यात्मिक दुनिया के बीच एक शाश्वत द्वंद्व को व्यक्त करता है। वह कहता है: 'जग पूछ रहा उनको, जो जग की गाते, मैं अपने मन का गान किया करता हूँ।' संसार धन, वैभव और सांसारिक लाभ-हानि का हिसाब रखता है, जबकि कवि प्रेम और करुणा के अमर रस (स्नेह-सुरा) का पान करता है।\n\n2. विरोधों का सामंजस्य:\nकवि 'रोदन में राग' और 'शीतल वाणी में आग' लिए फिरता है। वह संसार द्वारा निर्मित महलों को ठुकराकर प्रेम के खंडहर पर राजाओं के वैभव को न्योछावर करने को तत्पर है।\n\n3. जीवन दर्शन:\nकवि अपने जीवन को सुख-दुख, आशा-निराशा दोनों परिस्थितियों में समान भाव से जीने का संदेश देता है। वह सुख में अति-उत्साहित नहीं होता और दुख में विचलित नहीं होता। संसार के समस्त बंधनों को तोड़कर प्रेम की मस्ती में झूमना ही उसका जीवन दर्शन है।",
            "chapter": "आरोह काव्य: आत्मपरिचय (हरिवंश राय बच्चन)",
            "pyqTag": f"{board_name} 4-Marks Hindi Poetry Analysis"
        },
        {
            "q": "महादेवी वर्मा द्वारा रचित संस्मरण रेखाचित्र 'भक्तिन' के आधार पर भक्तिन के व्यक्तित्व, स्वाभिमान और उसके संघर्षमय जीवन का विश्लेषण कीजिए।",
            "marks": 5,
            "solution": "1. भक्तिन का संक्षिप्त परिचय:\nभक्तिन का वास्तविक नाम 'लक्ष्मी' था, परंतु उसके गले में कंठी माला और संन्यासिन जैसे रूप को देखकर लेखिका ने उसे 'भक्तिन' नाम दिया। वह छोटे कद, दुबले शरीर और दृढ़ इच्छाशक्ति वाली एक कर्मठ ग्रामीण महिला थी।\n\n2. जीवन का संघर्ष और स्वाभिमान:\n- विमाता (सौतेली माँ) के ईर्ष्यापूर्ण व्यवहार और पिता की मृत्यु के बाद भक्तिन का जीवन कष्टमय हो गया।\n- ससुराल में केवल बेटियां (तीन पुत्रियां) पैदा करने के कारण सास और जेठानियों ने उस पर अमानवीय अत्याचार किए। जेठानियों के बेटे मलाई खाते थे और भक्तिन की बेटियां चने-गुड़ की चबैना।\n- पति की असामयिक मृत्यु के बाद उसने अदम्य साहस का परिचय देते हुए अपनी संपत्ति की रक्षा की और जेठों के षड्यंत्रों को विफल कर दिया।\n\n3. महादेवी जी के प्रति अनन्य समर्पण:\n- लेखिका के घर सेविका बनकर आने के बाद उसने लेखिका की जीवनचर्या को पूरी तरह अपना लिया। वह लेखिका के अध्ययन, लेखन और भोजन की परछाई की तरह देखरेख करती थी।\n- जब जेल जाने की बात आई, तो उसने लेखिका के साथ जेल जाने के लिए लाट साहब तक से लड़ने की जिद की। भक्तिन सेवा धर्म में हनुमान जी से स्पर्धा करने वाली, स्वाभिमानी और निष्ठावान भारतीय नारी का अप्रतिम प्रतीक है।",
            "chapter": "आरोह गद्य: भक्तिन (महादेवी वर्मा)",
            "pyqTag": f"{board_name} 5-Marks Character Study"
        },
        {
            "q": "फणीश्वरनाथ रेणु की कालजयी कहानी 'पहलवान की ढोलक' में महामारी के अंधकार में ढोलक की आवाज किस प्रकार संजीवनी शक्ति का कार्य करती है? कहानी के मार्मिक संदेश को स्पष्ट कीजिए।",
            "marks": 4,
            "solution": "1. ढोलक की संजीवनी शक्ति:\nगांव में जब हैजा और मलेरिया का भीषण प्रकोप फैला और प्रतिदिन दर्जनों लोग मर रहे थे, तब चारों ओर घोर अंधकार, सन्नाटा और क्रंदन व्याप्त था। ऐसी विषम परिस्थिति में भी लुट्टन पहलवान रात भर ढोलक बजाता रहता था - 'धाक-धिना, तिरकट-तिना' और 'चटाक-चट-धा'। यह ढोलक बीमारी का इलाज नहीं कर सकती थी, लेकिन वह मरणासन्न और भयभीत ग्रामीणों की नसों में बिजली की तरह चेतना और मृत्यु से लड़ने का असीम हौसला भर देती थी।\n\n2. मार्मिक संदेश:\n- लेखक ने पारंपरिक लोक कलाओं और सत्ता परिवर्तन के त्रासद प्रभाव को उकेरा है। पुराने राजा साहब के निधन के बाद विलायत से आए नए राजकुमार ने कुश्ती को फिजूल मानकर पहलवान को राजदरबार से बाहर निकाल दिया।\n- व्यवस्था द्वारा उपेक्षित होने और अपने दोनों बेटों की महामारी में अकाल मृत्यु के बावजूद लुट्टन ने अपनी कला और मानवीय संवेदना का साथ नहीं छोड़ा। यह कहानी कला के प्रति समर्पण और विपरीत परिस्थितियों में मनुष्य की अदम्य जिजीविषा (जीने की इच्छा) का अमर आख्यान है।",
            "chapter": "आरोह गद्य: पहलवान की ढोलक (फणीश्वरनाथ रेणु)",
            "pyqTag": f"{board_name} 4-Marks Literature Question"
        }
    ]
    return mcqs, subjs

if __name__ == "__main__":
    e_mcqs, e_subjs = get_class12_english("CBSE")
    h_mcqs, h_subjs = get_class12_hindi("CBSE")
    print(f"Class 12 English: {len(e_mcqs)} MCQs, {len(e_subjs)} Subjs")
    print(f"Class 12 Hindi: {len(h_mcqs)} MCQs, {len(h_subjs)} Subjs")
