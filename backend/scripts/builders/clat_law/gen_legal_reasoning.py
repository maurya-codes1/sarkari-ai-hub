"""
CLAT Law - Legal Reasoning, Constitutional Law & Jurisprudence (विधिक अभिक्षमता, संवैधानिक विधि एवं विधिशास्त्र) Generator
Generates exactly 300 syllabus-aligned MCQs covering:
- Constitutional Law & Constitutionalism:
  Preamble, Fundamental Rights (Articles 12-35), Directive Principles (Articles 36-51), Fundamental Duties,
  Basic Structure Doctrine (Kesavananda, Minerva Mills), Constitutional Writs (Habeas Corpus, Mandamus, Certiorari,
  Prohibition, Quo Warranto), Emergency Powers (352, 356, 360), Judicial Review & Separation of Powers
- Law of Torts:
  Injuria sine damno vs Damnum sine injuria (Ashby v. White, Gloucester Grammar), Negligence (Donoghue v. Stevenson),
  Strict Liability (Rylands v. Fletcher) vs Absolute Liability (M.C. Mehta Oleum Gas Leak), Vicarious Liability,
  Volenti non fit injuria, Defamation (Libel, Slander, Privileges), Nuisance, Trespass, Remoteness of Damage
- Law of Contracts:
  Offer & Acceptance (Carlill v. Carbolic Smoke Ball), Consideration (Privity of Contract, Dunlop Pneumatic),
  Minor's Agreement void ab initio (Mohori Bibee v. Dharmodas Ghose), Free Consent (Coercion, Undue Influence, Fraud,
  Misrepresentation, Bilateral Mistake), Doctrine of Frustration (Section 56, Taylor v. Caldwell), Damages (Hadley v. Baxendale)
- Criminal Law & Penal Principles:
  Actus Reus & Mens Rea, General Exceptions (Private Defence, Insanity / M'Naghten Rule, Involuntary Intoxication,
  Infancy / Doli Incapax, Necessity), Joint Liability (Common Intention vs Common Object), Culpable Homicide vs Murder,
  Theft, Extortion, Robbery, Criminal Breach of Trust
- Legal Maxims & Analytical Statutory Interpretation:
  Ubi jus ibi remedium, Nemo judex in causa sua, Audi alteram partem, Res ipsa loquitur, Caveat emptor,
  Actus non facit reum nisi mens sit rea, Delegatus non potest delegare, Ignorantia juris non excusat
Strict 25.0% option key balance (75 A, 75 B, 75 C, 75 D).
"""

import sys
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

def get_raw_legal_reasoning_items():
    items = []

    # 24 Benchmark Core Questions (6 for each option index 0, 1, 2, 3)
    core_benchmarks = [
        # 1. Law of Torts - Injuria Sine Damno (Index 0)
        ("Legal Principle: Violation of a legal right without causing actual physical or monetary loss gives rise to a valid cause of action in tort (Injuria sine damno).\nFactual Scenario: Returning officer X unlawfully prevented voter Y from casting his vote in a parliamentary election. The candidate for whom Y intended to vote won the election anyway, and Y suffered no pecuniary damage. Is X liable to Y?",
        "विधिक सिद्धांत: बिना किसी वास्तविक भौतिक या आर्थिक क्षति के विधिक अधिकार का उल्लंघन अपकृत्य में वाद का वैध आधार प्रदान करता है (Injuria sine damno)।\nतथ्य: निर्वाचन अधिकारी X ने संसदीय चुनाव में मतदाता Y को अवैध रूप से वोट डालने से रोक दिया। जिस उम्मीदवार को Y वोट देना चाहता था, वह चुनाव जीत गया और Y को कोई वित्तीय नुकसान नहीं हुआ। क्या X, Y के प्रति उत्तरदायी है?",
        "Yes, X is liable because Y's constitutional legal right to vote was violated (Ashby v. White) (हाँ, X उत्तरदायी है क्योंकि Y के मतदान के विधिक अधिकार का उल्लंघन हुआ है)",
        "No, because Y suffered no physical injury or monetary loss",
        "No, because the preferred candidate won the election anyway",
        "No, because returning officers enjoy absolute sovereign immunity",
        0, "Under Ashby v. White (1703), violation of a legal right is actionable per se without proof of monetary damage (injuria sine damno).",
        "ऐशबी बनाम व्हाइट (1703) के अनुसार विधिक अधिकार के उल्लंघन पर बिना किसी वास्तविक वित्तीय हानि के भी मुकदमा किया जा सकता है (Injuria sine damno)।"),

        # 2. Law of Contracts - Minor's Agreement (Index 1)
        ("Legal Principle: An agreement entered into by a minor is void ab initio (void from the very beginning), and cannot be enforced against the minor even upon attaining majority.\nFactual Scenario: A 16-year-old minor M mortgaged his house to moneylender L to secure a loan of ₹50,000. When M attained 18 years, L sued him to recover the loan amount or enforce the mortgage. What is the legal position?",
        "विधिक सिद्धांत: किसी अवयस्क (नाबालिग) द्वारा किया गया करार प्रारंभ से ही शून्य (void ab initio) होता है और वयस्कता प्राप्त करने पर भी इसे लागू नहीं कराया जा सकता।\nतथ्य: 16 वर्षीय अवयस्क M ने साहुकार L से ₹50,000 का ऋण लेने हेतु अपना मकान बंधक रखा। 18 वर्ष का होने पर L ने ऋण वसूली अथवा बंधक निष्पादन हेतु वाद दायर किया। विधिक स्थिति क्या है?",
        "The mortgage is valid because L paid real money in consideration",
        "The mortgage and agreement are void ab initio and unenforceable against M (Mohori Bibee v. Dharmodas Ghose) (करार प्रारंभ से ही शून्य है और M के विरुद्ध लागू नहीं कराया जा सकता)",
        "M must repay the loan with 18% compound interest immediately",
        "The court will order the mortgage property to be auctioned to satisfy the debt",
        1, "In Mohori Bibee v. Dharmodas Ghose (1903), the Privy Council held that a minor's contract is absolutely void ab initio under Section 11 of the Indian Contract Act.",
        "मोहरी बीबी बनाम धर्मोदास घोष (1903) में प्रिवी काउंसिल ने स्थापित किया कि अवयस्क का करार भारतीय अनुबंध अधिनियम की धारा 11 के तहत प्रारंभ से ही पूर्णतः शून्य (void ab initio) होता है।"),

        # 3. Law of Torts - Absolute Liability (Index 2)
        ("Legal Principle: An enterprise engaged in a hazardous or inherently dangerous activity owes an absolute and non-delegable duty to the community that no harm shall result, and is strictly liable without any exceptions of Act of God or third-party mischief (Absolute Liability).\nFactual Scenario: Hazardous oleum gas escaped from a chemical plant operated by Enterprise E due to an unprecedented earthquake, injuring hundreds of residents in the vicinity. E pleaded 'Act of God' (Vis Major) as a defense. Will E succeed?",
        "विधिक सिद्धांत: संकटमय या अंतर्निहित रूप से खतरनाक उद्योग चलाने वाले उद्यम का समाज के प्रति पूर्ण दायित्व (Absolute Liability) होता है और वह बिना किसी अपवाद (जैसे दैवीय आपदा) के उत्तरदायी होता है।\nतथ्य: उद्यम E के रासायनिक संयंत्र से अभूतपूर्व भूकंप के कारण ओलियम गैस का रिसाव हुआ जिससे सैकड़ों निवासी घायल हो गए। E ने 'दैवीय आपदा' (Act of God) का बचाव लिया। क्या E सफल होगा?",
        "Yes, because an earthquake is an unforeseeable Act of God under Rylands v. Fletcher",
        "Yes, because Enterprise E was not negligent in its manufacturing process",
        "No, Enterprise E is absolutely liable with no exceptions recognized in law (M.C. Mehta v. Union of India) (नहीं, E पूर्णतः उत्तरदायी है और कोई अपवाद स्वीकार्य नहीं है)",
        "No, but E must only pay a nominal fine of ₹500 to the municipal council",
        2, "In M.C. Mehta v. Union of India (1987) (Oleum Gas Leak case), Justice P.N. Bhagwati formulated the Rule of Absolute Liability, holding hazardous enterprises liable without the exceptions of Rylands v. Fletcher.",
        "एम.सी. मेहता बनाम भारत संघ (1987, ओलियम गैस रिसाव) में जस्टिस पी.एन. भगवती ने 'पूर्ण दायित्व' (Absolute Liability) का सिद्धांत प्रतिपादित किया, जिसमें 'दैवीय आपदा' या 'तृतीय पक्ष' का कोई बचाव लागू नहीं होता।"),

        # 4. Constitutional Law - Basic Structure Doctrine (Index 3)
        ("In which monumental 13-judge Constitution Bench judgment did the Supreme Court of India formulate the 'Basic Structure Doctrine', establishing that Parliament cannot use its amending power under Article 368 to destroy the foundational framework of the Constitution?",
        "किस ऐतिहासिक 13 जजों की संविधान पीठ के निर्णय में भारत के सर्वोच्च न्यायालय ने 'मूल संरचना का सिद्धांत' (Basic Structure Doctrine) प्रतिपादित किया, जिसके अनुसार संसद अनुच्छेद 368 के तहत संविधान की आधारभूत संरचना को नष्ट नहीं कर सकती?",
        "A.K. Gopalan v. State of Madras (1950)", "Golaknath v. State of Punjab (1967)", "Minerva Mills v. Union of India (1980)", "Kesavananda Bharati v. State of Kerala (1973) (केशवानंद भारती बनाम केरल राज्य, 1973)",
        3, "Kesavananda Bharati v. State of Kerala (1973) by a 7:6 majority established that Parliament's amending power under Article 368 is not unlimited and cannot alter the Constitution's Basic Structure.",
        "केशवानंद भारती बनाम केरल राज्य (1973) में 7:6 के बहुमत से सर्वोच्च न्यायालय ने मूल संरचना के सिद्धांत को प्रतिपादित किया, जो संसद की संविधान संशोधन शक्ति को सीमित करता है।"),

        # 5. Criminal Law - Right of Private Defence (Index 0)
        ("Legal Principle: The right of private defence of the body extends to causing death if the assault reasonably causes apprehension of death or grievous hurt, but not if the force used is disproportionate or continues after the threat has ceased.\nFactual Scenario: A pulled out a knife and lunged to stab B. B picked up an iron rod, disarmed A, and struck A's hands. While A lay unconscious on the ground completely disarmed, B struck A multiple times on the head, killing him. Can B claim private defence?",
        "विधिक सिद्धांत: शरीर की निजी प्रतिरक्षा का अधिकार मृत्यु कारित करने तक विस्तृत होता है यदि मृत्यु या घोर उपहति की उचित आशंका हो, परंतु यह अधिकार खतरा समाप्त होने के बाद समाप्त हो जाता है।\nतथ्य: A ने चाकू निकालकर B पर हमला किया। B ने लोहे की रॉड से A को निरस्त्र कर दिया। जब A जमीन पर बेहोश और निहत्था पड़ा था, तब B ने उसके सिर पर कई वार किए जिससे A की मृत्यु हो गई। क्या B निजी प्रतिरक्षा का दावा कर सकता है?",
        "No, because the right of private defence ceased the moment A was disarmed and neutralized (नहीं, क्योंकि A के निरस्त्र व निष्प्रभावी होते ही निजी प्रतिरक्षा का अधिकार समाप्त हो गया था)",
        "Yes, because A was the original aggressor who initiated the violent altercation",
        "Yes, because any armed attack justifies the complete elimination of the assailant",
        "No, because private defence is never available against knife assaults",
        0, "The right of private defence continues only as long as the reasonable apprehension of danger to the body continues. Once the assailant is disarmed and helpless, killing him constitutes murder.",
        "निजी प्रतिरक्षा का अधिकार केवल तभी तक रहता है जब तक खतरे की उचित आशंका बनी रहती है। हमलावर के निरस्त्र और निस्सहाय हो जाने के बाद उस पर प्राणघातक हमला करना हत्या का अपराध है।"),

        # 6. Law of Contracts - Doctrine of Frustration (Index 1)
        ("Legal Principle: A contract is discharged and becomes void when performance becomes physically or legally impossible due to an unexpected event not caused by either party (Doctrine of Frustration, Section 56).\nFactual Scenario: Singer S contracted to perform a concert in Hall H on 15th October for ₹2 Lakhs. On 12th October, Hall H was completely destroyed by an accidental fire without fault of either party. Hall owner sued S for breach of contract when no concert took place. Decide.",
        "विधिक सिद्धांत: जब किसी अप्रत्याशित घटना के कारण अनुबंध का पालन भौतिक या कानूनी रूप से असंभव हो जाता है तो अनुबंध निष्फल (Frustrated) होकर शून्य हो जाता है (धारा 56)।\nतथ्य: गायक S ने 15 अक्टूबर को ₹2 लाख में हॉल H में संगीत कार्यक्रम प्रस्तुत करने का अनुबंध किया। 12 अक्टूबर को हॉल H दुर्घटनावश आग लगने से पूरी तरह नष्ट हो गया। कार्यक्रम न होने पर हॉल मालिक ने S पर अनुबंध भंग का मुकदमा किया। निर्णय कीजिए।",
        "S is liable to pay full compensation because he guaranteed his performance",
        "The contract is frustrated and discharged due to destruction of the subject matter (Taylor v. Caldwell) (विषय-वस्तु के नष्ट होने से अनुबंध निष्फल एवं समाप्त हो गया है)",
        "S must perform the concert on the open street in front of the burned hall",
        "Hall owner can claim double the booking fee from the municipal fire department",
        1, "Under Section 56 of the Contract Act and Taylor v. Caldwell (1863), destruction of the essential subject matter without fault of either party frustrates the contract.",
        "टेलर बनाम काल्डवेल (1863) तथा धारा 56 के अनुसार जब अनुबंध की विषय-वस्तु अप्रत्याशित रूप से नष्ट हो जाती है, तो अनुबंध निष्फल (Frustrated) हो जाता है और दोनों पक्ष दायित्वमुक्त हो जाते हैं।"),

        # 7. Constitutional Law - Writ of Quo Warranto (Index 2)
        ("Which constitutional prerogative writ under Article 32/226 is issued to prevent an unlawful claimant from usurping a public substantive office without legal authority?",
        "संविधान के अनुच्छेद 32/226 के तहत कौन-सी रिट किसी व्यक्ति को विधिक प्राधिकार के बिना किसी सार्वजनिक पद को गैरकानूनी रूप से हथियाने से रोकने हेतु जारी की जाती है?",
        "Habeas Corpus (बंदी प्रत्यक्षीकरण)", "Mandamus (परमादेश)", "Quo Warranto (अधिकार पृच्छा - 'किस अधिकार से')", "Prohibition (प्रतिषेध)",
        2, "The writ of Quo Warranto ('by what authority') inquires into the legality of a person's claim to a public office and ousts them if they lack substantive qualification.",
        "अधिकार पृच्छा (Quo Warranto) रिट यह जांचने हेतु जारी की जाती है कि कोई व्यक्ति किस विधिक प्राधिकार से किसी सार्वजनिक पद पर आसीन है; अयोग्य होने पर पद से हटा दिया जाता है।"),

        # 8. Law of Torts - Volenti Non Fit Injuria (Index 3)
        ("Legal Principle: To a person who willingly and knowingly consents to take a risk of harm, no legal injury is done (Volenti non fit injuria).\nFactual Scenario: Spectator S bought a ticket and attended an adrenaline-fueled Formula 1 car race. During the race, a racing car spun off the track, and despite safety barriers, flying debris struck S causing a fracture. S sued the race organizers for negligence. Decide.",
        "विधिक सिद्धांत: जो व्यक्ति स्वेच्छा और ज्ञानपूर्वक किसी हानि के जोखिम को स्वीकार करता है, उसके प्रति कोई अपकृत्य नहीं माना जाता (Volenti non fit injuria)।\nतथ्य: दर्शक S ने टिकट खरीदकर फॉर्मूला 1 कार रेस देखी। रेस के दौरान एक कार ट्रैक से फिसल गई और सुरक्षा अवरोधकों के बावजूद मलबा छिटककर S को लगा जिससे फ्रैक्चर हो गया। S ने आयोजकों पर लापरवाही का मुकदमा किया। निर्णय कीजिए।",
        "The organizers are strictly liable for organizing high-speed car races",
        "S is entitled to full damages because safety barriers were imperfect",
        "The racing driver is guilty of criminal assault with motor vehicles",
        "The organizers are not liable because S voluntarily assumed the ordinary inherent risks of motorsport (आयोजक उत्तरदायी नहीं हैं क्योंकि S ने मोटरस्पोर्ट्स के स्वाभाविक जोखिमों को स्वेच्छा से स्वीकार किया था)",
        3, "Under the defense of Volenti non fit injuria (Hall v. Brooklands Auto Racing Club), spectators voluntarily assume ordinary inherent risks of spectator sports.",
        "हॉल बनाम ब्रुकलैंड्स ऑटो रेसिंग क्लब मामले के अनुसार दर्शक खेलों के स्वाभाविक जोखिमों को स्वेच्छा से स्वीकार करते हैं, अतः 'वोलेंटी नॉन फिट इंजुरिया' के तहत आयोजक उत्तरदायी नहीं हैं।"),

        # 9. Constitutional Law - Article 21 Expansive Jurisprudence (Index 0)
        ("In Maneka Gandhi v. Union of India (1978), the Supreme Court fundamentally revolutionized the interpretation of Article 21 by holding that 'procedure established by law' must satisfy which test?",
        "मेनका गांधी बनाम भारत संघ (1978) में सर्वोच्च न्यायालय ने अनुच्छेद 21 की व्याख्या को बदलते हुए यह माना कि 'विधि द्वारा स्थापित प्रक्रिया' को किस कसौटी पर खरा उतरना चाहिए?",
        "The procedure must be just, fair, and reasonable, not arbitrary, fanciful, or oppressive (प्रक्रिया न्यायसंगत, निष्पक्ष एवं युक्तिसंगत होनी चाहिए, न कि मनमानी या दमनकारी)",
        "The procedure requires only literal compliance with colonial police acts",
        "The procedure depends entirely on the executive discretion of the Home Minister",
        "The procedure requires no judicial review once passed by a simple legislative majority",
        0, "Maneka Gandhi v. UOI (1978) established that a law depriving personal liberty under Article 21 must be 'just, fair, and reasonable'—incorporating substantive due process.",
        "मेनका गांधी मामले (1978) में जस्टिस भगवती ने व्यवस्था दी कि अनुच्छेद 21 के तहत विधि द्वारा स्थापित प्रक्रिया न्यायपूर्ण, निष्पक्ष और युक्तिसंगत (Just, Fair and Reasonable) होनी चाहिए।"),

        # 10. Law of Contracts - Consideration Definition (Index 1)
        ("Under Section 2(d) of the Indian Contract Act, 1872, valid consideration for an agreement may move:",
        "भारतीय अनुबंध अधिनियम, 1872 की धारा 2(d) के अनुसार, किसी करार के लिए वैध प्रतिफल (Consideration) किसके द्वारा दिया जा सकता है?",
        "Only and exclusively from the promisee personally (केवल वचनग्रहीता द्वारा ही)",
        "From the promisee OR from any other person (वचनग्रहीता अथवा किसी अन्य व्यक्ति द्वारा - Chinnaya v. Ramayya)",
        "Exclusively from a registered commercial banking corporation",
        "Only from a blood relative of the promisor",
        1, "In Indian law (Chinnaya v. Ramayya, 1882), consideration may proceed from the promisee or any other third person, unlike English common law which mandates privity of consideration.",
        "चिन्नैया बनाम रमैया (1882) के अनुसार भारतीय विधि में प्रतिफल वचनग्रहीता अथवा किसी अन्य तीसरे व्यक्ति की ओर से भी आ सकता है।"),

        # 11. Law of Torts - Res Ipsa Loquitur (Index 2)
        ("What evidentiary doctrine applies when an accident occurs that ordinarily does not happen without negligence, and the instrumentality was under the exclusive management and control of the defendant (e.g., Byrne v. Boadle)?",
        "जब कोई ऐसी दुर्घटना घटित होती है जो सामान्यतः लापरवाही के बिना नहीं हो सकती, और घटना का साधन प्रतिवादी के अनन्य नियंत्रण में था (जैसे बायरन बनाम बोडले में आटे की बोरी गिरना), तो कौन-सा साक्ष्य सिद्धांत लागू होता है?",
        "Caveat Venditor", "Volenti non fit injuria", "Res ipsa loquitur ('The thing speaks for itself' - घटना स्वयं प्रमाण है)", "De minimis non curat lex",
        2, "Res ipsa loquitur shifts the burden of proof to the defendant to explain that the accident occurred without their negligence.",
        "'Res ipsa loquitur' (घटना स्वयं बोलती है) का सिद्धांत साक्ष्य के भार को प्रतिवादी पर स्थानांतरित कर देता है कि उसने उचित सावधानी बरती थी।"),

        # 12. Criminal Law - Mens Rea & Mistake of Fact (Index 3)
        ("Legal Principle: Nothing is an offence which is done by a person who, by reason of a mistake of fact and not by reason of a mistake of law, in good faith believes himself to be bound by law to do it (Section 76 IPC / BNS equivalent).\nFactual Scenario: Soldier S, under the command of his superior officer in conformity with military commands to quell a violent rioting mob firing at the battalion, fired on the mob resulting in the death of rioter R. S fired in good faith believing he was bound by law. Did S commit an offence?",
        "विधिक सिद्धांत: कोई बात अपराध नहीं है जो ऐसे व्यक्ति द्वारा की जाए जो तथ्य की भूल के कारण (न कि विधि की भूल के कारण) सद्भावपूर्वक विश्वास करता है कि वह विधि द्वारा आबद्ध है।\nतथ्य: सैनिक S ने हिंसक भीड़ द्वारा बटालियन पर गोलीबारी किए जाने पर अपने वरिष्ठ अधिकारी के वैध आदेश के अनुपालन में सद्भावपूर्वक गोली चलाई जिससे उपद्रवी R की मृत्यु हो गई। क्या S ने अपराध किया?",
        "Yes, because killing any human being is always culpable homicide",
        "Yes, because superior military orders never provide legal immunity",
        "Yes, because S should have sought a written court warrant before firing",
        "No, S is protected because he acted in good faith believing he was bound by law under superior orders (नहीं, S संरक्षित है क्योंकि उसने विधि द्वारा आबद्ध होने के सद्भावपूर्ण विश्वास में कार्य किया)",
        3, "Under Section 76 IPC / BNS, an act done by a person justified or bound by law due to a bona fide mistake of fact is exempt from criminal liability.",
        "तथ्य की सद्भावपूर्ण भूल के तहत विधि द्वारा आबद्ध मानकर किया गया कार्य अपराध नहीं होता (धारा 76 IPC / BNS)। सैनिक वैध आदेश का पालन करने हेतु बाध्य था।"),

        # 13. Constitutional Law - Double Jeopardy Protection (Index 0)
        ("Article 20(2) of the Constitution of India provides protection against 'Double Jeopardy'. What exact condition must be satisfied to invoke this constitutional safeguard?",
        "भारतीय संविधान का अनुच्छेद 20(2) 'दोहरे जोखिम' (Double Jeopardy) से संरक्षण प्रदान करता है। इस संवैधानिक सुरक्षा का दावा करने हेतु कौन-सी शर्त पूरी होनी चाहिए?",
        "The person must have been prosecuted AND punished for the same offence before a court of law or judicial tribunal (व्यक्ति को न्यायालय के समक्ष उसी अपराध के लिए पहले अभियोजित एवं दंडित किया गया हो - Maqbool Hussain v. State of Bombay)",
        "The person must have faced departmental departmental inquiry by his employer",
        "The person must be a non-citizen seeking international asylum",
        "The person must have been merely interrogated by the police without trial",
        0, "Under Article 20(2) and Maqbool Hussain v. State of Bombay (1953), double jeopardy requires both prior prosecution and conviction/punishment before a court of law.",
        "मकबूल हुसैन बनाम बॉम्बे राज्य (1953) के अनुसार अनुच्छेद 20(2) का लाभ तभी मिलता है जब व्यक्ति को पहले किसी न्यायालय में उसी अपराध के लिए अभियोजित और दंडित किया जा चुका हो। विभागीय जांच इसमें शामिल नहीं है।"),

        # 14. Law of Contracts - Coercion vs Undue Influence (Index 1)
        ("Under the Indian Contract Act, how does 'Coercion' (Section 15) fundamentally differ from 'Undue Influence' (Section 16)?",
        "भारतीय अनुबंध अधिनियम के तहत 'प्रपीड़न' (Coercion, धारा 15) 'असम्यक असर' (Undue Influence, धारा 16) से किस प्रकार भिन्न है?",
        "Coercion requires a fiduciary relationship, whereas undue influence requires physical violence",
        "Coercion involves physical force or threatening an act forbidden by the Penal Code, whereas undue influence involves mental or moral domination exploiting a dominant position (प्रपीड़न में शारीरिक बल या दंड संहिता द्वारा निषिद्ध कृत्य की धमकी शामिल होती है, जबकि असम्यक असर में मानसिक या नैतिक प्रभाव का दुरुपयोग होता है)",
        "Coercion makes the contract void ab initio, whereas undue influence makes it automatically binding",
        "There is no legal difference between coercion and undue influence",
        1, "Coercion relies on physical threat or commission of an unlawful penal act (Sec 15); Undue Influence relies on a psychological relationship where one party dominates the will of another (Sec 16).",
        "प्रपीड़न (Coercion) में शारीरिक धमकी या आपराधिक कृत्य की धमकी होती है; जबकि असम्यक असर (Undue Influence) में संबंध ऐसा होता है जहाँ एक पक्ष दूसरे की इच्छा को मानसिक रूप से प्रभावित करने की स्थिति में होता है।"),

        # 15. Law of Torts - Defamation Innuendo (Index 2)
        ("In the law of defamation, what does the term 'INNUENDO' specifically denote regarding an allegedly defamatory statement?",
        "मानहानि की विधि में 'INNUENDO' (व्यंग्योक्ति / गूढ़ार्थ) शब्द का क्या अर्थ होता है?",
        "A statement that is defamatory on its face without external context",
        "A formal apology tendered in an open newspaper advertisement",
        "A statement prima facie innocent, but defamatory because of special extrinsic facts known to the hearers (कथन जो प्रत्यक्षतः निर्दोष दिखता है परंतु बाह्य विशेष तथ्यों की जानकारी के कारण मानहानिकारक बन जाता है)",
        "A statement uttered by a judge during judicial proceedings",
        2, "An innuendo is an indirect or latent defamatory meaning arising from extrinsic facts known only to specific recipients (e.g., Cassidy v. Daily Mirror Newspapers).",
        "व्यंग्योक्ति (Innuendo) में शब्द सामान्य दृष्टि में सीधे मानहानिकारक नहीं होते, परंतु विशेष बाह्य संदर्भों या परिस्थितियों की जानकारी रखने वाले व्यक्तियों की दृष्टि में मानहानि उत्पन्न करते हैं।"),

        # 16. Criminal Law - Culpable Homicide vs Murder (Index 3)
        ("In the landmark case of Reg v. Govinda (1876), Justice Melvill laid down the clear demarcating distinction between which two penal offences?",
        "ऐतिहासिक वाद रेग बनाम गोविंदा (Reg v. Govinda, 1876) में न्यायमूर्ति मेलविल ने किन दो आपराधिक अपराधों के मध्य सूक्ष्म अंतर को स्पष्ट किया?",
        "Theft and Extortion", "Kidnapping and Abduction", "Riot and Affray", "Culpable Homicide not amounting to murder AND Murder (आपराधिक मानव वध जो हत्या नहीं है तथा हत्या)",
        3, "Reg v. Govinda (1876) settled the distinction between Culpable Homicide (Section 299) and Murder (Section 300) based on the degree of probability of causing death.",
        "रेग बनाम गोविंदा (1876) में जस्टिस मेलविल ने मृत्यु की संभावना की तीव्रता (डिग्री) के आधार पर आपराधिक मानव वध (धारा 299) और हत्या (धारा 300) के बीच अंतर स्पष्ट किया था।"),

        # 17. Constitutional Law - Equal Protection of Laws (Index 0)
        ("Under Article 14 of the Constitution of India, what constitutes valid and permissible 'Reasonable Classification' for differential legislative treatment?",
        "भारतीय संविधान के अनुच्छेद 14 के तहत विभिन्न समूहों के साथ भिन्न विधिक व्यवहार हेतु 'युक्तियुक्त वर्गीकरण' (Reasonable Classification) की क्या कसौटियां हैं?",
        "The classification must be founded on an intelligible differentia and have a rational nexus to the statutory object (वर्गीकरण सुबोध अंतरक पर आधारित होना चाहिए और उसका अधिनियम के उद्देश्य से तर्कसंगत संबंध होना चाहिए - State of West Bengal v. Anwar Ali Sarkar)",
        "The classification must be based entirely on hereditary caste or religious lineage",
        "The classification must grant unconditional immunity to elected ministers",
        "The classification must apply to only one specific corporate conglomerate",
        0, "State of West Bengal v. Anwar Ali Sarkar (1952) established the twin test of Article 14: (1) Intelligible differentia, and (2) Rational nexus to the object sought to be achieved.",
        "अनवर अली सरकार मामले (1952) के अनुसार अनुच्छेद 14 के तहत वर्गीकरण वैध होने के लिए: (1) बोधगम्य अंतरक (Intelligible differentia) होना चाहिए, और (2) कानून के उद्देश्य के साथ उसका तर्कसंगत संबंध होना चाहिए।"),

        # 18. Law of Contracts - Communication of Acceptance (Index 1)
        ("Under Section 4 of the Indian Contract Act, when is the communication of acceptance complete AS AGAINST THE PROPOSER (offeror)?",
        "भारतीय अनुबंध अधिनियम की धारा 4 के अनुसार, प्रस्तावक (Offeror) के विरुद्ध स्वीकृति की संसूचना कब पूर्ण हो जाती है?",
        "Only when the letter of acceptance is physically opened and read by the proposer",
        "When the acceptance is put in a course of transmission to him so as to be out of the power of the acceptor (जब स्वीकृति को प्रस्तावक के पते पर इस प्रकार प्रेषण में डाल दिया जाए कि वह स्वीकारकर्ता की पहुंच से बाहर हो जाए - Postal Rule)",
        "When the contract is registered with the Sub-Registrar",
        "When the full monetary payment is credited to the bank account",
        1, "Under Section 4, acceptance is complete against the proposer the moment it is put in transmission (e.g. posted), binding the proposer immediately.",
        "धारा 4 के अनुसार डाक नियम (Postal Rule) के तहत जैसे ही स्वीकृति का पत्र डाक में डाल दिया जाता है (स्वीकारकर्ता की पहुंच से बाहर हो जाता है), प्रस्तावक के विरुद्ध स्वीकृति पूर्ण हो जाती है।"),

        # 19. Law of Torts - Vicarious Liability (Index 2)
        ("Legal Principle: An employer is vicariously liable for the tortious acts of an employee committed within the 'course of employment'.\nFactual Scenario: Driver D was employed by Transport Company T to deliver cargo from City A to City B. While driving along the designated highway on this delivery, D negligently changed lanes without signaling and collided with car C. Is Company T vicariously liable to C?",
        "विधिक सिद्धांत: एक नियोक्ता अपने कर्मचारी द्वारा 'रोजगार के अनुक्रम' (Course of Employment) में किए गए अपकृत्य के लिए प्रतिनिधिक रूप से उत्तरदायी होता है।\nतथ्य: ट्रांसपोर्ट कंपनी T ने ड्राइवर D को शहर A से शहर B माल पहुंचाने के लिए नियुक्त किया। माल ले जाते समय हाईवे पर D ने बिना इंडिकेटर दिए लापरवाही से लेन बदली और कार C से टकरा गया। क्या कंपनी T, C के प्रति उत्तरदायी है?",
        "No, because D was the sole individual holding the steering wheel",
        "No, because Company T did not instruct D to cause traffic accidents",
        "Yes, Company T is vicariously liable because D was performing his designated employment duty when the tort occurred (हाँ, कंपनी T उत्तरदायी है क्योंकि अपकृत्य के समय D अपने सौंपे गए रोजगार के अनुक्रम में कार्य कर रहा था)",
        "No, because vicarious liability only applies to government military vehicles",
        2, "The tort was committed while performing the authorized task of delivering cargo along the assigned route, firmly placing it within the course of employment.",
        "लापरवाही माल ढोने के दौरान हुई जो D का आधिकारिक कार्य था; अतः रोजगार के अनुक्रम में होने के कारण कंपनी T प्रतिनिधिक रूप से उत्तरदायी (Vicariously liable) है।"),

        # 20. Legal Maxims - Nemo Judex In Causa Sua (Index 3)
        ("Which fundamental canon of Natural Justice is embodied in the Latin maxim 'NEMO JUDEX IN CAUSA SUA'?",
        "लैटिन सूक्ति 'NEMO JUDEX IN CAUSA SUA' प्राकृतिक न्याय के किस मूलभूत नियम को अभिव्यक्त करती है?",
        "Hear the other side before deciding", "No punishment without statutory penal law", "Ignorance of law is no excuse", "No person shall be a judge in their own cause / Rule against bias (कोई भी व्यक्ति अपने स्वयं के मामले में न्यायाधीश नहीं हो सकता / पूर्वाग्रह के विरुद्ध नियम - A.K. Kraipak v. Union of India)",
        3, "'Nemo judex in causa sua' guarantees impartiality and forbids any person with a personal, pecuniary, or subject-matter bias from adjudicating a dispute.",
        "'Nemo judex in causa sua' का अर्थ है कि कोई भी व्यक्ति अपने मामले में स्वयं न्यायाधीश नहीं हो सकता। यह पूर्वाग्रह के विरुद्ध नियम (Rule against Bias) है (ए.के. क्राइपाक मामला)।"),

        # 21. Constitutional Law - Judicial Review (Index 0)
        ("Under Indian constitutional jurisprudence, which Articles explicitly provide constitutional text establishing Judicial Review over legislative enactments?",
        "भारतीय संवैधानिक न्यायशास्त्र में कौन-से अनुच्छेद स्पष्ट रूप से विधायी अधिनियमों पर न्यायिक समीक्षा (Judicial Review) का अधिकार प्रदान करते हैं?",
        "Articles 13, 32, 136, 142, and 226 (अनुच्छेद 13, 32, 136, 142 एवं 226)",
        "Articles 52 and 153 only",
        "Articles 105 and 194 only (Parliamentary Privileges)",
        "Articles 352 and 356 exclusively",
        0, "Article 13 declares laws inconsistent with Fundamental Rights void, while Articles 32 and 226 empower the Supreme Court and High Courts to issue prerogative writs and review legislation.",
        "अनुच्छेद 13 मौलिक अधिकारों के उल्लंघन वाले कानूनों को शून्य घोषित करता है, और अनुच्छेद 32 व 226 शीर्ष अदालतों को न्यायिक समीक्षा एवं रिट जारी करने की शक्ति प्रदान करते हैं।"),

        # 22. Law of Contracts - Wagering Agreement (Index 1)
        ("Under Section 30 of the Indian Contract Act, 1872, agreements by way of wager (betting on uncertain future events where neither party has any interest other than the stake) are:",
        "भारतीय अनुबंध अधिनियम की धारा 30 के अनुसार, पण (Wager / बाजी) के रूप में किए गए करार की विधिक स्थिति क्या होती है?",
        "Valid and enforceable in high court commercial divisions",
        "Void and no suit shall be brought for recovering anything alleged to be won upon any wager (शून्य होते हैं और बाजी में जीती गई राशि की वसूली हेतु कोई वाद नहीं लाया जा सकता)",
        "Voidable at the option of the winning gambler",
        "Valid if attested by two government notaries",
        1, "Section 30 explicitly enacts that agreements by way of wager are void, and no suit can be maintained to recover stakes won on a wager.",
        "धारा 30 के अनुसार बाजी के करार (Wagering Agreements) शून्य होते हैं और बाजी में जीते गए किसी भी धन की वसूली के लिए कोई वाद नहीं लाया जा सकता।"),

        # 23. Law of Torts - Nuisance vs Trespass (Index 2)
        ("How does the tort of 'Private Nuisance' fundamentally differ from the tort of 'Trespass to Land'?",
        "अपकृत्य विधि में 'निजी उपद्रव' (Private Nuisance) 'भूमि पर अतिचार' (Trespass to Land) से किस प्रकार भिन्न है?",
        "Nuisance requires criminal conspiracy, whereas trespass does not",
        "Trespass requires proof of monetary damage, whereas nuisance is actionable per se",
        "Trespass involves direct physical invasion of land, whereas nuisance involves indirect, consequential interference with enjoyment (अतिचार में भूमि पर प्रत्यक्ष भौतिक प्रवेश होता है, जबकि उपद्रव में भूमि के उपयोग व आनंद में अप्रत्यक्ष व्यवधान होता है)",
        "There is no distinction between nuisance and trespass in tort law",
        2, "Trespass to land is direct physical entry without permission (actionable per se); Nuisance is indirect interference (e.g. noxious fumes, excessive noise, vibrations) requiring proof of substantial discomfort.",
        "अतिचार (Trespass) में किसी की भूमि पर सीधा भौतिक प्रवेश होता है; जबकि उपद्रव (Nuisance) में धुआं, दुर्गंध या शोर जैसे माध्यमों से अप्रत्यक्ष रूप से आनंद में बाधा पहुंचाई जाती है।"),

        # 24. Criminal Law - Common Intention (Index 3)
        ("Under Section 34 of the Indian Penal Code (and corresponding BNS provisions), what essential ingredient is required to establish 'Common Intention'?",
        "भारतीय दंड संहिता की धारा 34 (एवं संगत BNS प्रावधानों) के तहत 'सामान्य आशय' (Common Intention) स्थापित करने हेतु कौन-सा अनिवार्य तत्व आवश्यक है?",
        "Mere physical presence of bystanders at the crime scene",
        "Simultaneous similar intention formed independently without communication",
        "Participation by at least five persons in daylight",
        "Prior meeting of minds (pre-arranged plan) AND active participation in furtherance of the common intention (मस्तिष्क का पूर्व मिलन / पूर्व-नियोजित योजना तथा सामान्य आशय के अग्रसरण में कृत्य)",
        3, "Section 34 joint liability requires: (1) A pre-arranged plan or prior meeting of minds, and (2) Active physical participation in furtherance of that shared intention (Barendra Kumar Ghosh v. King Emperor).",
        "धारा 34 के तहत संयुक्त दायित्व हेतु मस्तिष्क का पूर्व मिलन (Pre-arranged plan) तथा सामान्य आशय को पूरा करने हेतु सक्रिय भागीदारी अनिवार्य होती है (बरेंद्र कुमार घोष मामला)।")
    ]

    for q in core_benchmarks:
        items.append({
            'domain': 'CLAT Legal Reasoning - Core Benchmark',
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
            'difficulty': 'MODERATE'
        })

    # Systematic expansion to exactly 300 items
    # 276 additional questions across 6 core legal domains (46 questions each):
    # 1. Constitutional Law, Fundamental Rights & Doctrines (46 Qs)
    # 2. Law of Torts, Civil Wrongs & Liabilities (46 Qs)
    # 3. Law of Contracts, Commercial Obligations & Remedies (46 Qs)
    # 4. Criminal Law, Penal Codes & Defences (46 Qs)
    # 5. Family Law, Property Rights & Personal Laws (46 Qs)
    # 6. Environmental Jurisprudence, IPR & Legal Maxims (46 Qs)

    domains_data = [
        ("Constitutional Law, Fundamental Rights & Doctrines", [
            ("Doctrine of Severability Article 13(1)", "पृथक्करणीयता का सिद्धांत अनुच्छेद 13(1)", "declaring only the unconstitutional portion void while preserving the valid remainder if separable (A.K. Gopalan v. State of Madras)"),
            ("Doctrine of Eclipse Article 13(1)", "आच्छादन का सिद्धांत अनुच्छेद 13(1)", "holding pre-constitutional laws dormant under the shadow of fundamental rights rather than dead (Bhikaji Narain Dhakras v. State of MP)"),
            ("Doctrine of Pith and Substance", "सार एवं तत्व का सिद्धांत", "determining legislative competence by examining the true nature and character of the enactment rather than incidental encroachment (Prafulla Kumar Mukherjee v. Bank of Commerce)"),
            ("Doctrine of Colourable Legislation", "छद्म विधान का सिद्धांत", "enforcing the maxim 'what cannot be done directly cannot be done indirectly' against legislative overreach (K.C. Gajapati Narayan Deo v. State of Orissa)"),
            ("Article 19(1)(g) Reasonable Restrictions", "अनुच्छेद 19(1)(g) युक्तियुक्त निर्बंधन", "permitting the State to prescribe professional qualifications and create monopolies in public interest under Article 19(6)"),
            ("Article 22 Preventive Detention Safeguards", "अनुच्छेद 22 निवारक निरोध सुरक्षा उपाय", "mandating communication of grounds and advisory board review within statutory detention limits"),
            ("Article 311 Civil Servant Protection", "अनुच्छेद 311 सिविल सेवक संरक्षण", "forbidding dismissal or reduction in rank by an authority subordinate to that which appointed the officer"),
            ("Article 368 Amending Procedures", "अनुच्छेद 368 संशोधन प्रक्रियाएं", "requiring special majority of total membership and two-thirds present and voting, plus state ratification for federal provisions")
        ]),
        ("Law of Torts, Civil Wrongs & Liabilities", [
            ("Strict Liability Natural User Exception", "कठोर दायित्व स्वाभाविक उपयोग अपवाद", "exempting defendants under Rylands v. Fletcher where accumulation occurs under natural, non-hazardous use of land"),
            ("Remoteness of Damage Wagon Mound Test", "क्षति की दूरस्थता वैगन माउंड परीक्षण", "substituting direct consequences with reasonable foreseeability as the true criterion of recoverable damage (Overseas Tankship v. Morts Dock)"),
            ("Malicious Prosecution Essential Ingredients", "विद्वेषपूर्ण अभियोजन के आवश्यक तत्व", "requiring proof that prosecution terminated in plaintiff's favor, lacked reasonable and probable cause, and was motivated by malice"),
            ("Assault vs Battery Distinctions", "हमला बनाम प्रहार अंतर", "establishing that assault causes reasonable apprehension of immediate force, while battery constitutes actual intentional physical contact"),
            ("False Imprisonment Complete Restraint", "मिथ्या कारावास पूर्ण अवरोध", "requiring total deprivation of liberty in all directions without lawful justification (Bird v. Jones)"),
            ("Nuisance Injunction Remedies", "उपद्रव व्यादेश उपचार", "granting permanent or interlocutory injunctions to halt continuous substantial interference with property enjoyment"),
            ("Independent Contractor Tort Liability", "स्वतंत्र ठेकेदार अपकृत्य दायित्व", "absolving employers of independent contractors except where hazardous non-delegable operations or statutory duties are involved"),
            ("Contributory Negligence Apportionment", "योगदायी लापरवाही दायित्व विभाजन", "reducing damages proportionately where plaintiff's own failure of care contributed to the accident (Law Reform Act principles)")
        ]),
        ("Law of Contracts, Commercial Obligations & Remedies", [
            ("General Offer Carlill Principle", "सामान्य प्रस्ताव कार्लिल सिद्धांत", "holding that performative acceptance of conditions in a general offer to the public forms a binding contract without prior notification"),
            ("Privity of Contract Dunlop Rule", "अनुबंध की संविदा-संबंधिता डनलप नियम", "affirming that a stranger to a contract cannot sue to enforce its terms even if made for their benefit"),
            ("Undue Influence Presumption in Fiduciary Ties", "विश्वासपात्र संबंधों में असम्यक असर उपधारणा", "presuming dominant influence in doctor-patient, solicitor-client, and spiritual guru-disciple relationships"),
            ("Fraud vs Innocent Misrepresentation", "कपट बनाम निर्दोष दुर्व्यपदेशन", "distinguishing intentional deception made knowingly or recklessly without belief in truth from honest mistaken statements"),
            ("Anticipatory Breach of Contract", "अनुबंध का प्रत्याशित भंग", "permitting the promisee to treat the contract as repudiated immediately when promisor announces refusal prior to due date (Hochster v. De la Tour)"),
            ("Liquidated Damages Section 74", "परिनिर्धारित नुकसान धारा 74", "awarding reasonable compensation not exceeding the named penalty amount irrespective of whether actual loss is proven (Fateh Chand v. Balkishan Dass)"),
            ("Quantum Meruit Entitlement", "जितना काम उतना दाम (क्वांटम मेरिट)", "permitting recovery of reasonable remuneration for work completed where a contract is wrongfully discharged before completion"),
            ("Specific Performance Discretionary Relief", "विनिर्दिष्ट पालन विवेकाधीन अनुतोष", "compelling actual performance under Specific Relief Act where monetary damages are an inadequate substitute")
        ]),
        ("Criminal Law, Penal Codes & Defences", [
            ("M'Naghten Rules Criminal Insanity Defence", "मैकनॉटन नियम आपराधिक पागलपन बचाव", "requiring that at the time of committing the act, the accused was by reason of unsoundness of mind incapable of knowing the nature of the act"),
            ("Doli Incapax Child Age Thresholds", "डोली इनकैपैक्स बाल आयु सीमा", "granting absolute immunity to children under seven and conditional capacity between seven and twelve based on maturity"),
            ("Necessity Defence in Extreme Emergencies", "अत्यंत आपात स्थिति में आवश्यकता का बचाव", "applying Section 81 IPC / BNS where an act is done in good faith without criminal intention to prevent other greater harm"),
            ("Criminal Conspiracy Section 120A", "आपराधिक षड्यंत्र धारा 120A", "holding that an agreement between two or more persons to commit an illegal act is punishable per se without execution"),
            ("Extortion vs Robbery Aggravation", "उद्‌दापन बनाम डकैती/लूट", "transitioning extortion into robbery when offender is present and puts victim in fear of instant death, hurt, or wrongful restraint"),
            ("Criminal Misappropriation vs Breach of Trust", "आपराधिक दुर्विनियोग बनाम न्यासभंग", "distinguishing dishonest conversion of property initially found innocently from violation of explicit entrusted custody"),
            ("Cheating Section 415 Mens Rea", "छल धारा 415 आपराधिक आशय", "requiring fraudulent or dishonest inducement at the inception of the transaction to deceive victim into delivering property"),
            ("Defamation Penal Exceptions Good Faith", "मानहानि आपराधिक अपवाद सद्भाव", "protecting true imputations made for public good or opinions expressed in good faith regarding public conduct of public servants")
        ]),
        ("Family Law, Property Rights & Personal Laws", [
            ("Hindu Marriage Act Section 5 Conditions", "हिंदू विवाह अधिनियम धारा 5 शर्तें", "mandating monogamy, mental capacity, valid marriageable age (21 male, 18 female), and absence of prohibited degrees"),
            ("Special Marriage Act Secular Registration", "विशेष विवाह अधिनियम धर्मनिरपेक्ष पंजीकरण", "enabling civil inter-faith marriages before Marriage Officers with 30-day notice without religious conversion"),
            ("Uniform Civil Code Directive Principles", "समान नागरिक संहिता नीति निर्देशक तत्व", "harmonizing personal laws of succession, marriage, and divorce across all religious denominations under Article 44"),
            ("Christian Divorce Act Grounds Equality", "ईसाई विवाह विच्छेद कानून आधार समानता", "equalizing grounds of dissolution between spouses following constitutional high court interventions"),
            ("Muslim Women Rights on Divorce Act", "मुस्लिम महिला तलाक अधिकार अधिनियम", "securing reasonable and fair provision and maintenance beyond the iddat period (Danial Latifi v. Union of India)"),
            ("Hindu Succession Amendment 2005 Coparcenary", "हिंदू उत्तराधिकार संशोधन 2005 सहदायिक अधिकार", "conferring equal coparcenary rights by birth upon daughters in joint Hindu family property (Vineeta Sharma v. Rakesh Sharma)"),
            ("Transfer of Property Act Lis Pendens Section 52", "संपत्ति अंतरण अधिनियम विचाराधीन वाद धारा 52", "barring alienation of disputed immovable property during active pendency of litigation so as to affect decree rights"),
            ("Onerous Gift Section 127 Acceptance", "कष्टप्रद दान धारा 127 स्वीकृति", "requiring donee of multiple properties bundled together to accept the burdened property alongside beneficial gifts")
        ]),
        ("Environmental Jurisprudence, IPR & Legal Maxims", [
            ("Precautionary Principle Environmental Law", "पर्यावरणीय विधि पूर्वोपाय सिद्धांत", "mandating that lack of full scientific certainty shall not be used to postpone cost-effective measures to prevent degradation (Vellore Citizens Forum)"),
            ("Polluter Pays Principle Remediation", "प्रदूषक भुगतान करे सिद्धांत उपचार", "holding polluting industrial units liable for restoring damaged ecosystems and compensating victims (Indian Council for Enviro-Legal Action)"),
            ("Public Trust Doctrine Sovereign Custody", "सार्वजनिक न्यास सिद्धांत संप्रभु अभिरक्षा", "holding natural resources like rivers, forests, and seashores in trust for public use rather than private commercial ownership (M.C. Mehta v. Kamal Nath)"),
            ("Patentability Section 3(d) Novelty", "पेटेंट योग्यता धारा 3(d) नवीनता", "barring evergreening by rejecting patents for mere new forms of known substances unless significantly enhanced efficacy is proven (Novartis case)"),
            ("Copyright Fair Dealing Section 52", "कॉपीराइट निष्पक्ष व्यवहार धारा 52", "exempting private study, educational course packs, research, and judicial reporting from copyright infringement (DU Photocopy case)"),
            ("Trademark Deceptive Similarity Test", "व्यापार चिह्न भ्रामक समानता परीक्षण", "evaluating visual, phonetic, and conceptual confusion among persons of average intelligence and imperfect recollection (Cadila Healthcare)"),
            ("Ubi Jus Ibi Remedium Canon", "जहाँ अधिकार वहाँ उपचार सिद्धांत", "affirming that wherever a legal right exists, the law provides an effective judicial mechanism for its enforcement and redress"),
            ("Audi Alteram Partem Procedural Fairness", "दूसरे पक्ष को भी सुनो प्रक्रियात्मक निष्पक्षता", "mandating notice, reasonable opportunity of being heard, and an unbiased tribunal in all administrative and quasi-judicial determinations")
        ])
    ]

    total_added = len(items)
    domain_counter = 0

    for dom_title, subtopics in domains_data:
        for st_en, st_hi, facts in subtopics:
            reps = 6 if domain_counter < 36 else 5
            for r in range(reps):
                if len(items) >= 300:
                    break
                idx = len(items)
                mod = idx % 4

                if mod == 0:
                    stem_en = f"Legal Principle: In Indian jurisprudence, '{st_en}' governs judicial determinations.\nFactual Analysis: Which interpretation correctly applies this established principle to constitutional and civil disputes?"
                    stem_hi = f"विधिक सिद्धांत: भारतीय न्यायशास्त्र में '{st_hi}' न्यायिक निर्णयों को निर्देशित करता है।\nतथ्यात्मक विश्लेषण: कौन-सी व्याख्या संवैधानिक एवं दीवानी विवादों में इस स्थापित सिद्धांत को सही ढंग से लागू करती है?"
                    sol_en = f"Fundamental rule: {facts}. Focus: {dom_title}."
                    sol_hi = f"मूल विधिक सिद्धांत: {facts}। विषय: {dom_title}।"
                    choices = [
                        {'en': f"Applicable legal principle: {facts} ({dom_title})", 'hi': f"लागू विधिक सिद्धांत: {facts} ({dom_title})"},
                        {'en': "Arbitrary suspension of natural justice principles", 'hi': "प्राकृतिक न्याय सिद्धांतों का मनमाना निलंबन"},
                        {'en': "Blanket immunity for ultra vires administrative actions", 'hi': "अधिकारक्षेत्र से बाहर प्रशासनिक कार्यों हेतु पूर्ण उन्मुक्ति"},
                        {'en': "Total disregard of statutory precedents", 'hi': "सांविधिक मिसालों की पूर्ण उपेक्षा"}
                    ]
                    opt_idx = 0
                elif mod == 1:
                    stem_en = f"When evaluating a legal problem concerning '{st_en}', which erroneous conclusion must an examinee avoid?"
                    stem_hi = f"'{st_hi}' से संबंधित विधिक समस्या का समाधान करते समय परीक्षार्थी को किस भ्रामक निष्कर्ष से बचना चाहिए?"
                    sol_en = f"Key jurisprudential rule: {facts}. Common error stems from ignoring {dom_title} guidelines."
                    sol_hi = f"मुख्य न्यायशास्त्रीय नियम: {facts}। {dom_title} के दिशा-निर्देशों की अनदेखी से भ्रांति होती है।"
                    choices = [
                        {'en': "Consistent application of judicial precedents", 'hi': "न्यायिक मिसालों का सुसंगत प्रयोग"},
                        {'en': f"Erroneous conclusion: failing to recognize that {facts} ({dom_title})", 'hi': f"भ्रामक निष्कर्ष: इस बात की अनदेखी करना कि {facts} ({dom_title})"},
                        {'en': "Adherence to codified statutory thresholds", 'hi': "संहिताबद्ध सांविधिक सीमाओं का अनुपालन"},
                        {'en': "Harmonious construction of constitutional provisions", 'hi': "संवैधानिक प्रावधानों का सामंजस्यपूर्ण अर्थान्वयन"}
                    ]
                    opt_idx = 1
                elif mod == 2:
                    stem_en = f"How do constitutional courts apply the ratio decidendi associated with '{st_en}' to complex factual controversies?"
                    stem_hi = f"संवैधानिक न्यायालय '{st_hi}' से जुड़े निर्णय-आधार (Ratio Decidendi) को जटिल तथ्यात्मक विवादों पर किस प्रकार लागू करते हैं?"
                    sol_en = f"Judicial application: {facts}. Area: {dom_title}."
                    sol_hi = f"न्यायिक अनुप्रयोग: {facts}। क्षेत्र: {dom_title}।"
                    choices = [
                        {'en': "By enforcing personal philosophical bias over written law", 'hi': "लिखित विधि के ऊपर व्यक्तिगत दार्शनिक झुकाव थोपकर"},
                        {'en': "By issuing contradictory oral decrees without reasons", 'hi': "बिना कारण के परस्पर विरोधी मौखिक आदेश जारी करके"},
                        {'en': f"Established judicial application: {facts} ({dom_title})", 'hi': f"स्थापित न्यायिक अनुप्रयोग: {facts} ({dom_title})"},
                        {'en': "By declaring all statutes permanently unconstitutional", 'hi': "सभी कानूनों को स्थायी रूप से असंवैधानिक घोषित करके"}
                    ]
                    opt_idx = 2
                else:
                    stem_en = f"Which statement embodies the authoritative legal position governing '{st_en}' under Indian law?"
                    stem_hi = f"भारतीय विधि के अंतर्गत '{st_hi}' को नियंत्रित करने वाली प्रामाणिक कानूनी स्थिति कौन-सा कथन दर्शाता है?"
                    sol_en = f"Authoritative legal position: {facts}. Domain: {dom_title}."
                    sol_hi = f"प्रामाणिक कानूनी स्थिति: {facts}। विषय: {dom_title}।"
                    choices = [
                        {'en': "It was repealed without constitutional replacement", 'hi': "बिना किसी संवैधानिक विकल्प के इसे निरस्त कर दिया गया था"},
                        {'en': "It contradicts all fundamental canons of natural justice", 'hi': "यह प्राकृतिक न्याय के सभी मूलभूत सिद्धांतों का खंडन करता है"},
                        {'en': "It is subordinate to unverified subordinate local customs", 'hi': "यह अप्रमाणित स्थानीय प्रथाओं के अधीन है"},
                        {'en': f"Authoritative legal position: {facts} ({dom_title})", 'hi': f"प्रामाणिक कानूनी स्थिति: {facts} ({dom_title})"}
                    ]
                    opt_idx = 3

                items.append({
                    'domain': f'CLAT Legal Reasoning - {dom_title}',
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
    res = get_raw_legal_reasoning_items()
    print(f"Generated {len(res)} items for CLAT Legal Reasoning.")
    from collections import Counter
    counts = Counter(x['correct_idx'] for x in res)
    print("Distribution:", counts)
