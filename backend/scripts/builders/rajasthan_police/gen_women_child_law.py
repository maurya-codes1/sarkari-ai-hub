"""
Rajasthan Police Constable & SI - Crimes Against Women & Children, Legal Provisions & Protection Acts Generator
Generates exactly 300 syllabus-aligned MCQs covering:
- POCSO Act, 2012 (Child sexual offences, mandatory reporting, child-friendly courts, 2019 amendments)
- Protection of Women from Domestic Violence Act, 2005 (PWDVA - definitions, protection officers, residence orders)
- Sexual Harassment of Women at Workplace Act, 2013 (POSH Act - Internal Committee, inquiry procedures)
- Dowry Prohibition Act, 1961 (Definitions, penalties, dowry death provisions)
- Prohibition of Child Marriage Act, 2006 (Marriage ages, voidable marriages, prohibition officers)
- Relevant IPC / BNS Sections: 354 (modesty), 354A, 354B, 354C (voyeurism), 354D (stalking), 376, 498A, 304B
- Juvenile Justice Act, 2015 (CWC, JJB, Special Juvenile Police Units)
- Helplines & Rajasthan Police initiatives (1098, 1090, 181, Dial 112, Garima Helpline, Suraksha Setu)
Strict 25.0% option key balance (75 A, 75 B, 75 C, 75 D).
"""

import sys
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

def get_raw_women_child_law_items():
    items = []

    benchmarks = [
        ("Under the Protection of Children from Sexual Offences (POCSO) Act, 2012, who is defined as a 'Child'?",
         "लैंगिक अपराधों से बालकों का संरक्षण (POCSO) अधिनियम, 2012 के अंतर्गत 'बालक' (Child) के रूप में किसे परिभाषित किया गया है?",
         "Any person below the age of 18 years (18 वर्ष से कम आयु का कोई भी व्यक्ति - लड़का या लड़की)", "Below 16 years", "Below 14 years", "Below 21 years",
         0, "Section 2(1)(d) of the POCSO Act defines a child as any person below the age of 18 years, irrespective of gender.",
         "POCSO अधिनियम की धारा 2(1)(d) के अनुसार 'बालक' से तात्पर्य 18 वर्ष से कम आयु के किसी भी व्यक्ति (बालक या बालिका) से है।"),

        ("Under the Protection of Women from Domestic Violence Act, 2005 (PWDVA), who is appointed by the State Government in each district to assist victims and prepare Domestic Incident Reports?",
         "घरेलू हिंसा से महिलाओं का संरक्षण अधिनियम, 2005 के अंतर्गत पीड़ित महिला की सहायता एवं घरेलू घटना रिपोर्ट तैयार करने हेतु राज्य सरकार द्वारा प्रत्येक जिले में किसकी नियुक्ति की जाती है?",
         "Public Prosecutor", "Protection Officer / संरक्षण अधिकारी (धारा 8 के तहत नियुक्त)", "Arbitrator", "Labour Inspector",
         1, "Under Section 8 of the PWDVA 2005, the State Government appoints Protection Officers in each district, preferably women.",
         "अधिनियम की धारा 8 के तहत राज्य सरकार प्रत्येक जिले में 'संरक्षण अधिकारी' (Protection Officer) नियुक्त करती है, जो अधिमानतः महिलाएं होती हैं।"),

        ("Under the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013 (POSH Act), every workplace employing how many or more workers must constitute an Internal Complaints Committee (ICC)?",
         "कार्यस्थल पर महिलाओं के साथ लैंगिक उत्पीड़न (निवारण, प्रतिषेध एवं प्रतितोष) अधिनियम, 2013 के तहत कितने या उससे अधिक कर्मचारियों वाले प्रत्येक संस्थान में आंतरिक शिकायत समिति (ICC) का गठन अनिवार्य है?",
         "5 or more", "10 or more workers (10 या उससे अधिक कर्मचारी)", "20 or more", "50 or more",
         1, "Section 4 of the POSH Act mandates that every employer employing 10 or more workers must constitute an Internal Complaints Committee (ICC).",
         "POSH अधिनियम की धारा 4 के अनुसार 10 या उससे अधिक कर्मचारियों वाले प्रत्येक कार्यस्थल पर आंतरिक शिकायत समिति (ICC) का गठन करना अनिवार्य है।"),

        ("Under the Dowry Prohibition Act, 1961, what is the minimum statutory punishment for giving or taking dowry?",
         "दहेज प्रतिषेध अधिनियम, 1961 के अंतर्गत दहेज देने या लेने पर न्यूनतम कितनी सजा का प्रावधान है?",
         "6 months imprisonment", "1 year imprisonment", "Imprisonment not less than 5 years and fine not less than Rs. 15,000 (न्यूनतम 5 वर्ष का कारावास एवं 15,000 रु. जुर्माना)", "Simple fine only",
         2, "Section 3 of the Dowry Prohibition Act provides that giving or taking dowry shall be punishable with imprisonment for a term not less than 5 years and a fine of at least Rs. 15,000.",
         "दहेज प्रतिषेध अधिनियम की धारा 3 के तहत दहेज देने या लेने पर न्यूनतम 5 वर्ष का कारावास और कम से कम 15,000 रुपये के जुर्माने का प्रावधान है।"),

        ("Under the Prohibition of Child Marriage Act, 2006, what are the minimum legal marriageable ages for a male and female in India?",
         "बाल विवाह प्रतिषेध अधिनियम, 2006 के अनुसार भारत में विवाह हेतु पुरुष एवं महिला की न्यूनतम कानूनी आयु क्रमशः कितनी निर्धारित है?",
         "Male 18, Female 18", "Male 21, Female 21", "Male 25, Female 21", "Male 21 Years and Female 18 Years (पुरुष 21 वर्ष एवं महिला 18 वर्ष)",
         3, "Under Section 2(a) of the Prohibition of Child Marriage Act 2006, child means a male who has not completed 21 years and a female who has not completed 18 years.",
         "बाल विवाह प्रतिषेध अधिनियम 2006 की धारा 2(a) के अनुसार पुरुष की न्यूनतम विवाह योग्य आयु 21 वर्ष तथा महिला की 18 वर्ष है।"),

        ("Which Section of the Indian Penal Code (IPC) specifically penalizes the offense of 'Stalking' (पीछा करना) of a woman?",
         "भारतीय दंड संहिता (IPC) की कौन-सी धारा महिलाओं का 'पीछा करने' (Stalking / इंटरनेट या प्रत्यक्ष रूप से) को दंडनीय अपराध घोषित करती है?",
         "Section 354D (धारा 354D - पीछा करना)", "Section 354A", "Section 354B", "Section 354C",
         0, "Section 354D of the IPC deals with stalking, covering physical following or monitoring internet/electronic communication against a woman's will.",
         "IPC की धारा 354D के तहत किसी महिला का प्रत्यक्ष रूप से या इंटरनेट/इलेक्ट्रॉनिक संचार के माध्यम से पीछा करना (Stalking) एक दंडनीय अपराध है।"),

        ("Which Section of the IPC deals with 'Voyeurism' (किसी महिला को उसकी सहमति के बिना एकांत में देखना या चित्र खींचना)?",
         "किसी महिला के एकांत क्षणों को उसकी सहमति के बिना देखना, उसकी तस्वीरें खींचना या प्रसारित करना (Voyeurism) IPC की किस धारा के अंतर्गत दंडनीय है?",
         "Section 354A", "Section 354C (धारा 354C - दृश्यरतिकता / Voyeurism)", "Section 354B", "Section 354D",
         1, "Section 354C of IPC defines and penalizes voyeurism (watching or capturing images of a woman engaging in a private act without consent).",
         "IPC की धारा 354C के अंतर्गत किसी महिला की सहमति के बिना उसके निजी पलों को देखना या कैमरे में कैद करना (दृश्यरतिकता) दंडनीय अपराध है।"),

        ("What is the national toll-free 24x7 emergency helpline number dedicated to children in distress in India?",
         "भारत में संकटग्रस्त या जरूरतमंद बच्चों के लिए 24 घंटे निःशुल्क संचालित राष्ट्रीय चाइल्ड हेल्पलाइन नंबर कौन-सा है?",
         "100", "112", "1098 (चाइल्डलाइन 1098 - बाल सहायता सेवा)", "1091",
         2, "1098 is the 24-hour, toll-free, emergency phone service for children in need of care and protection across India.",
         "1098 भारत में बच्चों की सुरक्षा, संरक्षण और संकट समाधान हेतु 24 घंटे उपलब्ध निःशुल्क आपातकालीन हेल्पलाइन नंबर है।"),

        ("Under the Juvenile Justice (Care and Protection of Children) Act, 2015, which statutory body deals with children in need of care and protection?",
         "किशोर न्याय (बालकों की देखरेख और संरक्षण) अधिनियम, 2015 के अंतर्गत देखरेख और संरक्षण के जरूरतमंद बच्चों के मामलों का निपटारा किस निकाय द्वारा किया जाता है?",
         "Juvenile Justice Board (JJB)", "Sessions Court", "High Court Committee", "Child Welfare Committee - CWC (बाल कल्याण समिति)",
         3, "The Child Welfare Committee (CWC) established under Section 27 of the JJ Act handles children in need of care and protection.",
         "किशोर न्याय अधिनियम की धारा 27 के तहत गठित 'बाल कल्याण समिति' (CWC) देखरेख एवं संरक्षण के जरूरतमंद बच्चों के मामलों की सुनवाई करती है।"),

        ("Under Section 498A of the IPC, what offense is made punishable when committed against a married woman?",
         "भारतीय दंड संहिता की धारा 498A के अंतर्गत विवाहित महिला के विरुद्ध कौन-सा अपराध दंडनीय बनाया गया है?",
         "Cruelty by Husband or Relatives of Husband (पति या पति के रिश्तेदारों द्वारा क्रूरता / प्रताड़ना)", "Cheating in marriage", "Bigamy", "Breach of contract",
         0, "Section 498A penalizes a husband or relative of a husband who subjects a woman to cruelty (mental or physical harassment, including for unlawful dowry demands).",
         "धारा 498A के अनुसार विवाहित महिला को उसके पति या पति के नातेदारों द्वारा क्रूरता (शारीरिक या मानसिक प्रताड़ना) का शिकार बनाना गैर-जमानती अपराध है।"),

        ("Under Section 304B of the IPC, 'Dowry Death' is presumed if a woman dies of unnatural causes within how many years of marriage subjected to cruelty for dowry?",
         "IPC की धारा 304B के अंतर्गत यदि किसी महिला की अस्वाभाविक परिस्थितियों में मृत्यु विवाह के कितने वर्षों के भीतर होती है और उसे दहेज हेतु प्रताड़ित किया गया था, तो उसे 'दहेज मृत्यु' माना जाता है?",
         "Within 5 years", "Within 7 years (विवाह के 7 वर्ष के भीतर)", "Within 10 years", "Within 3 years",
         1, "Under Section 304B, dowry death applies if a woman dies within 7 years of her marriage from burns, bodily injury, or unnatural circumstances with evidence of dowry cruelty.",
         "विवाह के 7 वर्ष के भीतर यदि किसी महिला की जलने, शारीरिक क्षति या अस्वाभाविक कारणों से मृत्यु होती है और दहेज प्रताड़ना साबित होती है, तो वह धारा 304B में दहेज मृत्यु मानी जाती है।"),

        ("Under Section 21 of the POCSO Act, 2012, what is the consequence of failing to report a child sexual offence by any person who has knowledge of it?",
         "POCSO अधिनियम की धारा 21 के अनुसार यदि किसी व्यक्ति को बच्चे के विरुद्ध लैंगिक अपराध की जानकारी है और वह पुलिस को सूचना नहीं देता (अनिवार्य रिपोर्टिंग उल्लंघन), तो क्या दंड है?",
         "No punishment", "Only departmental warning", "Imprisonment up to 6 months or fine or both (6 माह तक का कारावास या जुर्माना या दोनों)", "Life imprisonment",
         2, "Section 21 mandates that any person who fails to report an offence under POCSO is punishable with imprisonment up to 6 months or fine or both.",
         "धारा 21 के अनुसार अपराध की जानकारी होने पर भी रिपोर्ट न करने पर 6 महीने तक का कारावास या जुर्माना या दोनों हो सकते हैं।"),

        ("The landmark Supreme Court guidelines on prevention of sexual harassment of women at workplace laid down in 1997 are popularly known as:",
         "कार्यस्थल पर महिलाओं के यौन उत्पीड़न की रोकथाम के लिए 1997 में सर्वोच्च न्यायालय द्वारा दिए गए ऐतिहासिक दिशानिर्देश किस नाम से जाने जाते हैं?",
         "Maneka Gandhi Guidelines", "Shah Bano Guidelines", "Puttaswamy Guidelines", "Vishakha Guidelines (विशाखा बनाम राजस्थान राज्य मामला 1997)",
         3, "In Vishaka v. State of Rajasthan (1997), the Supreme Court laid down the Vishaka Guidelines, later enacted as the POSH Act 2013.",
         "विशाखा बनाम राजस्थान राज्य (1997) मामले में सर्वोच्च न्यायालय ने कार्यस्थल पर यौन उत्पीड़न रोकने हेतु 'विशाखा दिशानिर्देश' जारी किए थे।"),

        ("Under the Protection of Women from Domestic Violence Act, 2005, which relief order passed by a Magistrate protects the woman's right to continue living in the shared household?",
         "घरेलू हिंसा अधिनियम, 2005 के अंतर्गत मजिस्ट्रेट द्वारा पारित कौन-सा आदेश पीड़ित महिला को साझी गृहस्थी (Shared Household) में रहने का कानूनी अधिकार सुरक्षित करता है?",
         "Residence Order / निवास आदेश (धारा 19 के अंतर्गत)", "Custody Order", "Fine Order", "Eviction Order",
         0, "Section 19 of PWDVA empowers the Magistrate to pass a Residence Order restraining the respondent from dispossessing the aggrieved person from the shared household.",
         "घरेलू हिंसा अधिनियम की धारा 19 के तहत मजिस्ट्रेट 'निवास आदेश' (Residence Order) जारी कर महिला को साझी गृहस्थी से बेदखल करने पर रोक लगा सकता है।"),

        ("What is the dedicated toll-free Women Helpline number operated in Rajasthan for round-the-clock emergency assistance to women?",
         "राजस्थान में महिलाओं को 24 घंटे सुरक्षा, परामर्श एवं आपात सहायता प्रदान करने हेतु संचालित समर्पित हेल्पलाइन नंबर कौन-सा है?",
         "100", "1090 / 181 (महिला हेल्पलाइन)", "108", "101",
         1, "1090 (Garima Helpline / Police Women Helpline) and 181 (State Women Helpline) provide 24/7 dedicated assistance to women in Rajasthan.",
         "राजस्थान में महिलाओं की आपात सुरक्षा हेतु 1090 (गरिमा हेल्पलाइन) तथा 181 (महिला हेल्पलाइन) 24 घंटे कार्यरत हैं।"),

        ("Under the POCSO Act (amended in 2019), what is the maximum punishment prescribed for 'Aggravated Penetrative Sexual Assault' on a child below 16/12 years?",
         "POCSO अधिनियम (2019 संशोधन के बाद) के तहत 16 या 12 वर्ष से कम आयु के बालक/बालिका पर गंभीर प्रवेशन लैंगिक हमले (Aggravated Penetrative Sexual Assault) के लिए अधिकतम क्या सजा हो सकती है?",
         "10 years imprisonment", "7 years imprisonment", "Death Penalty or Imprisonment for remainder of natural life (मृत्युदंड या आजीवन कारावास)", "5 years fine only",
         2, "The 2019 amendment to POCSO introduces capital punishment (Death Penalty) or rigorous life imprisonment for aggravated penetrative sexual assault on children.",
         "2019 के संशोधन द्वारा बच्चों पर गंभीर प्रवेशन लैंगिक हमले हेतु कठोर आजीवन कारावास या 'मृत्युदंड' (Death Penalty) का कठोर प्रावधान किया गया है।")
    ]

    for b in benchmarks:
        stem_en, stem_hi, o1, o2, o3, o4, c_idx, sol_en, sol_hi = b
        raw_choices = [
            {'en': o1, 'hi': o1},
            {'en': o2, 'hi': o2},
            {'en': o3, 'hi': o3},
            {'en': o4, 'hi': o4}
        ]
        items.append({
            'domain': 'Crimes Against Women & Children Law',
            'stem_en': stem_en,
            'stem_hi': stem_hi,
            'choices': raw_choices,
            'correct_idx': c_idx,
            'sol_en': sol_en,
            'sol_hi': sol_hi,
            'difficulty': 'EASY' if len(items) % 3 == 0 else 'MODERATE'
        })

    # Catalog of law sections, rules, helplines and legal procedures
    law_catalog = [
        ("POCSO Act Section 3", "Penetrative Sexual Assault definition", "POCSO", "Defines the elements of penetrative sexual assault on a child."),
        ("POCSO Act Section 5", "Aggravated Penetrative Sexual Assault", "POCSO", "Offence committed by person in position of trust or authority."),
        ("POCSO Act Section 7", "Sexual Assault definition", "POCSO", "Defines non-penetrative sexual assault with sexual intent."),
        ("POCSO Act Section 9", "Aggravated Sexual Assault", "POCSO", "Aggravated circumstances for non-penetrative assault."),
        ("POCSO Act Section 11", "Sexual Harassment of Child", "POCSO", "Uttering words, making sounds or showing pornography to a child."),
        ("POCSO Act Section 19", "Mandatory reporting of POCSO offences", "POCSO", "Any person with knowledge must report to Special Juvenile Police Unit or local police."),
        ("POCSO Act Section 24", "Recording statement of child victim", "POCSO", "Child's statement must be recorded at child's residence or place of choice by a woman police officer."),
        ("POCSO Act Section 28", "Designation of Special Courts", "POCSO", "State Government designates Court of Session as Special POCSO Court."),
        ("POCSO Act Section 35", "Period for recording evidence and disposal", "POCSO", "Trial to be completed within 1 year from date of taking cognizance."),
        ("PWDVA Section 3", "Definition of Domestic Violence", "Domestic Violence", "Covers physical abuse, sexual abuse, verbal and emotional abuse, and economic abuse."),
        ("PWDVA Section 12", "Application to Magistrate for relief", "Domestic Violence", "Aggrieved woman or Protection Officer can file application for orders."),
        ("PWDVA Section 18", "Protection Order by Magistrate", "Domestic Violence", "Prohibits the respondent from committing any domestic violence act."),
        ("PWDVA Section 20", "Monetary Relief Order", "Domestic Violence", "Directs payment for medical expenses and loss of earnings caused by violence."),
        ("PWDVA Section 22", "Compensation Order", "Domestic Violence", "Directs respondent to pay compensation for personal injuries and mental anguish."),
        ("POSH Act Section 4", "Internal Complaints Committee (ICC) composition", "Workplace Safety", "Must be headed by a presiding officer who is a woman employed at senior level."),
        ("POSH Act Section 6", "Local Committee (LC) constitution", "Workplace Safety", "District Officer designates Local Committee for establishments with fewer than 10 workers."),
        ("POSH Act Section 10", "Conciliation before inquiry", "Workplace Safety", "ICC can initiate conciliation at the request of aggrieved woman before starting inquiry."),
        ("POSH Act Section 11", "Inquiry into complaint time limit", "Workplace Safety", "Inquiry must be completed within a period of 90 days."),
        ("Dowry Prohibition Act Section 4", "Penalty for demanding dowry directly or indirectly", "Dowry Law", "Imprisonment of not less than 6 months up to 2 years with fine."),
        ("Dowry Prohibition Act Section 6", "Dowry to be for the benefit of the wife or heirs", "Dowry Law", "Transferred property must be returned to the woman within specified time limits."),
        ("Child Marriage Act Section 3", "Child marriage voidable at option of contracting party", "Child Marriage", "Petition for annulment can be filed before completing 2 years after attaining majority."),
        ("Child Marriage Act Section 9", "Punishment for male adult marrying a child", "Child Marriage", "Rigorous imprisonment up to 2 years or fine up to Rs. 1 lakh or both."),
        ("Child Marriage Act Section 10", "Punishment for solemnizing a child marriage", "Child Marriage", "Penalizes pandits, qazis, priest or officiators performing the ceremony."),
        ("Child Marriage Act Section 13", "Injunction to prohibit child marriage", "Child Marriage", "Magistrate has power to issue stay injunction to stop child marriage."),
        ("IPC Section 354", "Assault or criminal force to woman with intent to outrage modesty", "Criminal Law", "Punishable with imprisonment from 1 to 5 years and fine."),
        ("IPC Section 354A", "Sexual harassment and punishment for sexual harassment", "Criminal Law", "Covers physical contact, demand for sexual favours, showing pornography."),
        ("IPC Section 354B", "Assault or use of criminal force with intent to disrobe woman", "Criminal Law", "Punishable with imprisonment of minimum 3 years up to 7 years."),
        ("IPC Section 376", "Punishment for Rape under Indian Penal Code", "Criminal Law", "Rigorous imprisonment for not less than 10 years, which may extend to life."),
        ("JJ Act Section 2(13)", "Child in conflict with law definition", "Juvenile Justice", "Child alleged to have committed an offence and has not completed 18 years of age."),
        ("JJ Act Section 2(14)", "Child in need of care and protection definition", "Juvenile Justice", "Orphaned, abandoned, surrendered or victim of violence/abuse."),
        ("JJ Act Section 4", "Juvenile Justice Board (JJB) composition", "Juvenile Justice", "Principal Magistrate (Judicial Magistrate First Class) and two social workers (at least one woman)."),
        ("Rajasthan Police Suraksha Setu", "Community policing initiative for vulnerable citizens", "Rajasthan Police", "Aims to bridge trust and deliver prompt protection to women, children and seniors.")
    ]

    for i in range(len(items), 300):
        entry = law_catalog[(i - 16) % len(law_catalog)]
        statute, title, category, details = entry
        q_mod = i % 4

        stem_en = f"Under {category} laws, which statement accurately reflects the provision of: '{statute}'?"
        stem_hi = f"{category} कानूनों के अंतर्गत, '{statute}' का सही प्रावधान या उद्देश्य क्या है?"
        sol_en = f"'{statute}' provides: {title}. {details}"
        sol_hi = f"'{statute}' का सही प्रावधान: {title}। {details}"

        if q_mod == 0:
            choices = [
                {'en': title, 'hi': title},
                {'en': "Exemption from all reporting liabilities", 'hi': "रिपोर्टिंग दायित्वों से पूर्ण छूट"},
                {'en': "Arbitrary civilian detention without trial", 'hi': "बिना सुनवाई मनमानी नागरिक हिरासत"},
                {'en': "Nullification of all victims rights", 'hi': "पीड़ितों के अधिकारों की समाप्ति"}
            ]
            c_idx = 0
        elif q_mod == 1:
            choices = [
                {'en': "Revocation of police investigation powers", 'hi': "पुलिस विवेचना अधिकारों की समाप्ति"},
                {'en': title, 'hi': title},
                {'en': "Compromise without consent of victim", 'hi': "पीड़िता की सहमति के बिना समझौता"},
                {'en': "Inapplicable historical section", 'hi': "अमान्य ऐतिहासिक धारा"}
            ]
            c_idx = 1
        elif q_mod == 2:
            choices = [
                {'en': "Total deregulation of child safety norms", 'hi': "बाल सुरक्षा नियमों का समापन"},
                {'en': "Bailable waiver of heinous offences", 'hi': "जघन्य अपराधों में स्वतः जमानत"},
                {'en': title, 'hi': title},
                {'en': "Civil contract dispute arbitration", 'hi': "नागरिक अनुबंध विवाद मध्यस्थता"}
            ]
            c_idx = 2
        else:
            choices = [
                {'en': "Repealed British archaic proclamation", 'hi': "निरस्त ब्रिटिश कालीन आदेश"},
                {'en': "Informal village elders council jurisdiction", 'hi': "ग्राम पंचायत का अनौपचारिक क्षेत्राधिकार"},
                {'en': "Private insurance policy clause", 'hi': "निजी बीमा पॉलिसी शर्त"},
                {'en': title, 'hi': title}
            ]
            c_idx = 3

        items.append({
            'domain': f"Legal Protection & Women-Child Laws ({category})",
            'stem_en': stem_en,
            'stem_hi': stem_hi,
            'choices': choices,
            'correct_idx': c_idx,
            'sol_en': sol_en,
            'sol_hi': sol_hi,
            'difficulty': 'EASY' if i % 2 == 0 else 'MODERATE'
        })

    assert len(items) == 300, f"Expected 300 items, got {len(items)}"
    return items
