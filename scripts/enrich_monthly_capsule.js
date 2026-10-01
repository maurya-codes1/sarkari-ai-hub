const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'public', 'js', 'current-affairs.js');
let code = fs.readFileSync(targetPath, 'utf8');

const ENRICHED_CAPSULE_DATA = [
  {
    category: "🚀 Science & Defense (विज्ञान व रक्षा)",
    category_en: "🚀 Science & Defense",
    category_i18n: {
      ta: "🚀 அறிவியல் & பாதுகாப்பு (Science & Defense)",
      te: "🚀 సైన్స్ & డిఫెన్స్ (Science & Defense)",
      mr: "🚀 विज्ञान आणि संरक्षण (Science & Defense)",
      bn: "🚀 বিজ্ঞান ও প্রতিরক্ষা (Science & Defense)",
      gu: "🚀 વિજ્ઞાન અને સંરક્ષણ (Science & Defense)",
      kn: "🚀 ವಿಜ್ಞಾನ ಮತ್ತು ರಕ್ಷಣೆ (Science & Defense)",
      ml: "🚀 ശാസ്ത്രവും പ്രതിരോധവും (Science & Defense)",
      pa: "🚀 ਵਿਗਿਆਨ ਅਤੇ ਰੱਖਿਆ (Science & Defense)",
      ur: "🚀 سائنس اور دفاع (Science & Defense)",
      or: "🚀 ବିଜ୍ଞାନ ଓ ପ୍ରତିରକ୍ଷା (Science & Defense)"
    },
    points: [
      {
        hi: "इसरो ने इनसैट-3डीएस (INSAT-3DS) मौसम उपग्रह को जीएसएलवी-एफ14 (GSLV-F14) रॉकेट से सफलतापूर्वक कक्षा में स्थापित किया।",
        en: "ISRO launched meteorological satellite INSAT-3DS aboard GSLV-F14 from Sriharikota.",
        ta: "இஸ்ரோ தனது ஜிஎஸ்எல்வி-எஃப்14 (GSLV-F14) ராக்கெட் மூலம் இன்சாட்-3டிஎஸ் (INSAT-3DS) வானிலை செயற்கைக்கோளை வெற்றிகரமாக விண்ணில் செலுத்தியது.",
        te: "ఇస్రో జీఎస్ఎల్వీ-ఎఫ్14 (GSLV-F14) రాకెట్ ద్వారా ఇన్సాట్-3డీఎస్ (INSAT-3DS) వాతావరణ ఉపగ్రహాన్ని విజయవంతంగా ప్రయోగించింది.",
        mr: "इस्रोने जीएसएलव्ही-एफ14 (GSLV-F14) रॉकेटच्या साहाय्याने इनसॅट-3डीएस (INSAT-3DS) हवामान उपग्रह यशस्वीरित्या कक्षेत प्रस्थापित केला.",
        bn: "ইসরো জিএসএলভি-এফ১৪ (GSLV-F14) রকেটের মাধ্যমে ইনস্যাট-৩ডিএস (INSAT-3DS) আবহাওয়া উপগ্রহ সফলভাবে কক্ষপথে স্থাপন করেছে।"
      },
      {
        hi: "भारत की पहली स्वदेशी 155mm स्मार्ट गोला बारूद प्रणाली IIT मद्रास और म्यूनिशन्स इंडिया लिमिटेड द्वारा विकसित की गई।",
        en: "India's first indigenous 155mm smart ammunition was co-developed by IIT Madras and Munitions India Ltd.",
        ta: "இந்தியாவின் முதல் உள்நாட்டு 155மிமீ ஸ்மார்ட் வெடிமருந்து அமைப்பு ஐஐடி மெட்ராஸ் மற்றும் மியூனிஷன்ஸ் இந்தியா லிமிடெட் இணைந்து தயாரித்துள்ளன.",
        te: "భారతదేశపు మొట్టమొదటి స్వదేశీ 155మిమీ స్మార్ట్ మందుగుండు సామగ్రిని ఐఐటీ మద్రాస్ మరియు మ్యూనిషన్స్ ఇండియా లిమిటెడ్ అభివృద్ధి చేశాయి.",
        mr: "भारताची पहिली स्वदेशी 155 मिमी स्मार्ट दारूगोळा प्रणाली आयआयटी मद्रास आणि म्युनिशन इंडिया लिमिटेड यांनी संयुक्तपणे विकसित केली.",
        bn: "ভারতের প্রথম দেশীয় ১৫৫ মিমি স্মার্ট গোলাবারুদ ব্যবস্থা আইআইটি মাদ্রাজ ও মিউনিশন্স ইন্ডিয়া লিমিটেড যৌথভাবে তৈরি করেছে।"
      },
      {
        hi: "डीआरडीओ ने ओडिशा तट पर अग्नि-प्राइम (Agni-Prime) नई पीढ़ी की बैलिस्टिक मिसाइल का सफल रात्रि परीक्षण किया।",
        en: "DRDO carried out successful night launch of New Generation Ballistic Missile Agni-Prime off Odisha coast.",
        ta: "டிஆர்டிஓ (DRDO) ஒடிசா கடற்கரையில் அக்னி-பிரைம் (Agni-Prime) புதிய தலைமுறை பாலிஸ்டிக் ஏவுகணையின் வெற்றிகரமான இரவு சோதனையை நடத்தியது.",
        te: "డీఆర్డీవో ఒడిశా తీరంలో అగ్ని-ప్రైమ్ (Agni-Prime) కొత్త తరం బాలిస్టిక్ క్షిపణి రాత్రిపూట ప్రయోగాన్ని విజయవంతంగా నిర్వహించింది.",
        mr: "डीआरडीओने ओडिशा किनारपट्टीवर अग्नि-प्राइम (Agni-Prime) या नवीन पिढीच्या बॅलिस्टिक क्षेपणास्त्राची यशस्वी रात्रीची चाचणी घेतली.",
        bn: "ডিআরডিও ওড়িশা উপকূলে অগ্নি-প্রাইম (Agni-Prime) নতুন প্রজন্মের ব্যালিস্টিক ক্ষেপণাস্ত্রের সফল নৈশ পরীক্ষা চালিয়েছে।"
      },
      {
        hi: "भारतीय नौसेना में पहली बार दो महिला अधिकारियों को युद्धपोत पर तैनात किया गया - सब लेफ्टिनेंट कुमुदिनी त्यागी व रीति सिंह।",
        en: "Indian Navy inducted specialized women combatants aboard frontline destroyers (Sub Lt Kumudini Tyagi & Riti Singh).",
        ta: "இந்திய கடற்படையில் முதல் முறையாக இரண்டு பெண் அதிகாரிகள் போர்க்கப்பலில் பணியமர்த்தப்பட்டனர் - சப் லெப்டினன்ட் குமுதினி தியாகி மற்றும் ரிதி சிங்.",
        te: "భారత నౌకాదళ యుద్ధనౌకల్లో తొలిసారిగా ఇద్దరు మహిళా అధికారులను నియమించారు - సబ్ లెఫ్టినెంట్ కుముదిని త్యాగి మరియు రీతి సింగ్.",
        mr: "भारतीय नौदलात पहिल्यांदाच दोन महिला अधिकाऱ्यांना युद्धनौकेवर तैनात करण्यात आले - सब लेफ्टनंट कुमुदिनी त्यागी आणि रीती सिंग.",
        bn: "ভারতীয় নৌবাহিনীর যুদ্ধজাহাজে প্রথমবার দুই মহিলা অফিসারকে মোতায়েন করা হলো - সাব লেফটেন্যান্ট কুমুদিনী ত্যাগী ও রীতি সিং।"
      }
    ]
  },
  {
    category: "🏆 Awards & Sports (पुरस्कार व खेल)",
    category_en: "🏆 Awards & Sports",
    category_i18n: {
      ta: "🏆 விருதுகள் & விளையாட்டுகள் (Awards & Sports)",
      te: "🏆 అవార్డులు & క్రీడలు (Awards & Sports)",
      mr: "🏆 पुरस्कार आणि क्रीडा (Awards & Sports)",
      bn: "🏆 পুরস্কার ও ক্রীড়া (Awards & Sports)",
      gu: "🏆 એવોર્ડ્સ અને રમતો (Awards & Sports)",
      kn: "🏆 ಪ್ರಶಸ್ತಿಗಳು ಮತ್ತು ಕ್ರೀಡೆಗಳು (Awards & Sports)",
      ml: "🏆 പുരസ്കാരങ്ങളും കായികരംഗവും (Awards & Sports)",
      pa: "🏆 ਇਨਾਮ ਅਤੇ ਖੇਡਾਂ (Awards & Sports)",
      ur: "🏆 اعزازات اور کھیل (Awards & Sports)",
      or: "🏆 ପୁରସ୍କାର ଓ କ୍ରୀଡ଼ା (Awards & Sports)"
    },
    points: [
      {
        hi: "भारत के 49वें और 50वें भारत रत्न सम्मान क्रमशः कर्पूरी ठाकुर, लालकृष्ण आडवाणी, पी.वी. नरसिम्हा राव, चौधरी चरण सिंह और डॉ. एम.एस. स्वामीनाथन को मरणोपरांत/आजीवन सेवा हेतु दिए गए।",
        en: "Bharat Ratna awarded to Karpoori Thakur, L.K. Advani, P.V. Narasimha Rao, Chaudhary Charan Singh, and Dr. M.S. Swaminathan.",
        ta: "இந்தியாவின் மிக உயரிய பாரத ரத்னா விருது கர்பூரி தாக்கூர், எல்.கே. அத்வானி, பி.வி. நரசிம்ம ராவ், சவுத்ரி சரண் சிங் மற்றும் டாக்டர் எம்.எஸ். சுவாமிநாதன் ஆகியோருக்கு அறிவிக்கப்பட்டது.",
        te: "భారత రత్న పురస్కారాలు కర్పూరి ఠాకూర్, ఎల్.కె. అద్వానీ, పి.వి. నరసింహారావు, చౌదరి చరణ్ సింగ్ మరియు డాక్టర్ ఎం.ఎస్. స్వామినాథన్‌లకు ప్రకటించబడ్డాయి.",
        mr: "भारतरत्न पुरस्कार कर्पूरी ठाकूर, लालकृष्ण अडवाणी, पी.व्ही. नरसिंह राव, चौधरी चरण सिंग आणि डॉ. एम.एस. स्वामीनाथन यांना प्रदान करण्यात आले.",
        bn: "ভারতরত্ন সম্মান কর্পূরী ঠাকুর, লালকৃষ্ণ আদবানী, পি.ভি. নরসিমা রাও, চৌধুরী চরণ সিং এবং ডঃ এম.এস. স্বামীনাথনকে প্রদান করা হয়েছে।"
      },
      {
        hi: "रोहन बोपन्ना 43 वर्ष की उम्र में ऑस्ट्रेलियन ओपन पुरुष युगल जीतकर दुनिया के सबसे उम्रदराज नंबर 1 टेनिस खिलाड़ी बने।",
        en: "Rohan Bopanna became the oldest World No. 1 in men's doubles tennis after winning the Australian Open at age 43.",
        ta: "43 வயதில் ஆஸ்திரேலிய ஓபன் ஆடவர் இரட்டையர் பட்டத்தை வென்ற ரோகன் போபண்ணா, உலகின் மிக மூத்த நம்பர் 1 டென்னிஸ் வீரர் என்ற சாதனையைப் படைத்தார்.",
        te: "43 ఏళ్ల వయసులో ఆస్ట్రేలియన్ ఓపెన్ పురుషుల డబుల్స్ గెలిచి రోహన్ బోపన్న ప్రపంచంలోనే అత్యంత పెద్ద వయస్కుడైన నంబర్ 1 టెన్నిస్ ఆటగాడిగా నిలిచాడు.",
        mr: "रोहन बोपण्णाने वयाच्या 43 व्या वर्षी ऑस्ट्रेलियन ओपन पुरुष दुहेरी जिंकून जागतिक क्रमवारीत अग्रस्थान पटकावणारा सर्वात वयस्कर खेळाडू ठरला.",
        bn: "৪৩ বছর বয়সে অস্ট্রেলিয়ান ওপেন পুরুষদের ডাবলস জিতে রোহন বোপান্না বিশ্বের সবচেয়ে বয়স্ক নম্বর ১ টেনিস খেলোয়াড় হলেন।"
      },
      {
        hi: "शतरंज ओलंपियाड 2024 (बुडापेस्ट) में भारतीय पुरुष व महिला दोनों टीमों ने ऐतिहासिक दोहरा स्वर्ण पदक (Double Gold) जीता।",
        en: "Indian Open and Women's teams created history by winning historic double gold at the 45th Chess Olympiad in Budapest.",
        ta: "புடாபெஸ்ட்டில் நடைபெற்ற 45வது சதுரங்க ஒலிம்பியாட் 2024-ல் இந்திய ஆடவர் மற்றும் மகளிர் இரு அணிகளும் வரலாற்றுச் சிறப்புமிக்க இரட்டைத் தங்கப் பதக்கம் (Double Gold) வென்றன.",
        te: "బుడాపెస్ట్‌లో జరిగిన 45వ చెస్ ఒలింపియాడ్ 2024లో భారత పురుషుల మరియు మహిళల జట్లు చారిత్రాత్మక డబుల్ బంగారు పతకాలను గెలుచుకున్నాయి.",
        mr: "बुडापेस्ट येथे झालेल्या 45 व्या बुद्धिबळ ऑलिम्पियाडमध्ये भारतीय पुरुष आणि महिला दोन्ही संघांनी ऐतिहासिक दुहेरी सुवर्णपदक पटकावले.",
        bn: "বুদাপেস্টে অনুষ্ঠিত ৪৫তম দাবা অলিম্পিয়াডে ভারতীয় পুরুষ ও মহিলা উভয় দল ঐতিহাসিক ডাবল সোনা (Double Gold) জয় করেছে।"
      }
    ]
  },
  {
    category: "🏛️ National & Policy (राष्ट्रीय घटनाक्रम व योजनाएं)",
    category_en: "🏛️ National & Policy",
    category_i18n: {
      ta: "🏛️ தேசிய நிகழ்வுகள் & கொள்கைகள் (National & Policy)",
      te: "🏛️ జాతీయ అంశాలు & విధానాలు (National & Policy)",
      mr: "🏛️ राष्ट्रीय घडामोडी आणि धोरणे (National & Policy)",
      bn: "🏛️ জাতীয় ঘটনাবলী ও নীতি (National & Policy)",
      gu: "🏛️ રાષ્ટ્રીય વિકાસ અને નીતિઓ (National & Policy)",
      kn: "🏛️ ರಾಷ್ಟ್ರೀಯ ಬೆಳವಣಿಗೆಗಳು ಮತ್ತು ನೀತಿಗಳು (National & Policy)",
      ml: "🏛️ ദേശീയ സംഭവവികാസങ്ങളും നയങ്ങളും (National & Policy)",
      pa: "🏛️ ਰਾਸ਼ਟਰੀ ਘਟਨਾਵਾਂ ਅਤੇ ਨੀਤੀਆਂ (National & Policy)",
      ur: "🏛️ قومی امور اور پالیسیاں (National & Policy)",
      or: "🏛️ ଜାତୀୟ ଘଟଣାବଳୀ ଓ ନୀତି (National & Policy)"
    },
    points: [
      {
        hi: "संसद के दोनों सदनों द्वारा 106वां संविधान संशोधन अधिनियम (नारी शक्ति वंदन अधिनियम) पारित हुआ, जो लोकसभा व विधानसभाओं में 33% महिला आरक्षण सुनिश्चित करता है।",
        en: "106th Constitutional Amendment Act (Nari Shakti Vandan Adhiniyam) guarantees 33% reservation for women in Lok Sabha and Assemblies.",
        ta: "நாடாளுமன்றத்தில் நிறைவேற்றப்பட்ட 106வது அரசியலமைப்பு திருத்தச் சட்டம் (நாரி சக்தி வந்தன் சட்டம்), மக்களவை மற்றும் மாநில சட்டசபைகளில் பெண்களுக்கு 33% இடஒதுக்கீட்டை உறுதி செய்கிறது.",
        te: "106వ రాజ్యాంగ సవరణ చట్టం (నారీ శక్తి వందన్ చట్టం) లోక్‌సభ మరియు అసెంబ్లీలలో మహిళలకు 33% రిజర్వేషన్‌ను కల్పిస్తుంది.",
        mr: "106 व्या घटनादुरुस्ती कायद्यान्वये (नारी शक्ती वंदन कायदा) लोकसभा आणि विधानसभांमध्ये महिलांसाठी 33% आरक्षण निश्चित करण्यात आले आहे.",
        bn: "১০৬তম সংবিধান সংশোধন আইনের (নারী শক্তি বন্দন অধিনিয়ম) মাধ্যমে লোকসভা ও বিধানসভাগুলিতে মহিলাদের জন্য ৩৩% সংরক্ষণ নিশ্চিত করা হয়েছে।"
      },
      {
        hi: "उत्तराखंड समान नागरिक संहिता (UCC - Uniform Civil Code) लागू करने वाला आजादी के बाद देश का पहला राज्य बना।",
        en: "Uttarakhand became the first state in independent India to pass and notify the Uniform Civil Code (UCC) Bill.",
        ta: "சுதந்திரத்திற்குப் பிறகு பொது சிவில் சட்டத்தை (UCC - Uniform Civil Code) அமல்படுத்திய நாட்டின் முதல் மாநிலமாக உத்தரகாண்ட் உருவெடுத்துள்ளது.",
        te: "స్వాతంత్య్రానంతరం ఉమ్మడి పౌరస్మృతి (UCC) బిల్లును ఆమోదించి అమలు చేసిన తొలి భారతీయ రాష్ట్రంగా ఉత్తరాఖండ్ నిలిచింది.",
        mr: "स्वातंत्र्योत्तर भारतात समान नागरी कायदा (UCC) लागू करणारे उत्तराखंड हे पहिले राज्य ठरले आहे.",
        bn: "স্বাধীনতার পর উত্তরাখণ্ড অভিন্ন দেওয়ানি বিধি (UCC) প্রণয়ন ও কার্যকরকারী দেশের প্রথম রাজ্য হলো।"
      },
      {
        hi: "भारतीय रेलवे ने दुनिया के सबसे ऊंचे रेलवे पुल 'चिनाब ब्रिज' (359 मीटर ऊंचा) पर उधमपुर-श्रीनगर-बारामूला रेल लिंक में ट्रायल रन पूरा किया।",
        en: "Indian Railways successfully conducted trials on the world's highest railway arch bridge over the Chenab River (359m high) in J&K.",
        ta: "ஜம்மு காஷ்மீரில் செனாப் ஆற்றின் மீது உலகின் மிக உயரமான ரயில்வே வளைவுப் பாலத்தில் (359 மீட்டர் உயரம்) இந்திய ரயில்வே வெற்றிகரமாக சோதனை ஓட்டத்தை நிறைவு செய்தது.",
        te: "జమ్మూ కశ్మీర్‌లోని చీనాబ్ నదిపై ప్రపంచంలోనే అత్యంత ఎత్తైన రైల్వే వంతెన (359 మీటర్లు) పై భారత రైల్వే విజయవంతంగా ట్రయల్ రన్ పూర్తి చేసింది.",
        mr: "भारतीय रेल्वेने चिनाब नदीवर जगातील सर्वात उंच रेल्वे पुलावर (359 मीटर उंच) यशस्वी चाचणी पूर्ण केली.",
        bn: "ভারতীয় রেল চেনাব নদীর ওপর বিশ্বের সর্বোচ্চ রেল সেতুর (৩৫৯ মিটার উঁচু) ওপর দিয়ে সফল ট্রায়াল রান সম্পন্ন করেছে।"
      }
    ]
  },
  {
    category: "📚 Static GK High-Yield Matrix (अक्सर पूछे जाने वाले तथ्य)",
    category_en: "📚 Static GK High-Yield Matrix",
    category_i18n: {
      ta: "📚 பொது அறிவு முக்கியக் குறிப்புகள் (Static GK Matrix)",
      te: "📚 స్టాటిక్ జీకే ముఖ్య అంశాలు (Static GK Matrix)",
      mr: "📚 स्टॅटिक सामान्य ज्ञान नोट्स (Static GK Matrix)",
      bn: "📚 স্ট্যাটিক জিকে গুরুত্বপূর্ণ তথ্য (Static GK Matrix)",
      gu: "📚 સ્ટેટિક જનરલ નોલેજ (Static GK Matrix)",
      kn: "📚 ಸ್ಥಿರ ಸಾಮಾನ್ಯ ಜ್ಞಾನ (Static GK Matrix)",
      ml: "📚 സ്റ്റാറ്റിക് പൊതുവിജ്ഞാനം (Static GK Matrix)",
      pa: "📚 ਸਥਿਰ ਜਨਰਲ ਨਾਲੇਜ (Static GK Matrix)",
      ur: "📚 جامد عمومی معلومات (Static GK Matrix)",
      or: "📚 ଷ୍ଟାଟିକ ସାଧାରଣ ଜ୍ଞାନ (Static GK Matrix)"
    },
    points: [
      {
        hi: "संविधान सभा की पहली बैठक: 9 दिसंबर 1946 (अस्थायी अध्यक्ष: डॉ. सच्चिदानंद सिन्हा, स्थायी: डॉ. राजेंद्र प्रसाद)।",
        en: "First meeting of Constituent Assembly: Dec 9, 1946 (Temporary President: Dr. Sachchidananda Sinha, Permanent: Dr. Rajendra Prasad).",
        ta: "அரசியலமைப்பு நிர்ணய சபையின் முதல் கூட்டம்: 9 டிசம்பர் 1946 (தற்காலிக தலைவர்: டாக்டர் சச்சிதானந்த சின்ஹா, நிரந்தர தலைவர்: டாக்டர் ராஜேந்திர பிரசாத்).",
        te: "రాజ్యాంగ పరిషత్ మొదటి సమావేశం: డిసెంబర్ 9, 1946 (తాత్కాలిక అధ్యక్షుడు: డాక్టర్ సచ్చిదానంద సిన్హా, శాశ్వత అధ్యక్షుడు: డాక్టర్ రాజేంద్ర ప్రసాద్).",
        mr: "घटना समितीची पहिली बैठक: 9 डिसेंबर 1946 (तात्पुरते अध्यक्ष: डॉ. सच्चिदानंद सिन्हा, कायमस्वरूपी: डॉ. राजेंद्र प्रसाद).",
        bn: "গণপরিষদের প্রথম অধিবেশন: ৯ ডিসেম্বর ১৯৪৬ (অস্থায়ী সভাপতি: ডঃ সচ্চিদানন্দ সিনহা, স্থায়ী: ডঃ রাজেন্দ্র প্রসাদ)।"
      },
      {
        hi: "नीति आयोग (NITI Aayog): स्थापना 1 जनवरी 2015, पदेन अध्यक्ष भारत के प्रधानमंत्री होते हैं।",
        en: "NITI Aayog established Jan 1, 2015 replacing Planning Commission. Ex-officio Chairman is the Prime Minister of India.",
        ta: "நிதி ஆயோக் (NITI Aayog): ஜனவரி 1, 2015 இல் திட்டக் குழுவிற்குப் பதிலாக அமைக்கப்பட்டது. இதன் பதவிவழித் தலைவர் இந்தியப் பிரதமர் ஆவார்.",
        te: "నీతి ఆయోగ్: జనవరి 1, 2015న ప్రణాళికా సంఘం స్థానంలో ఏర్పాటైంది. దీని పదవీరీత్యా ఛైర్మన్ భారత ప్రధాన మంత్రి.",
        mr: "नीती आयोग: 1 जानेवारी 2015 रोजी नियोजन आयोगाऐवजी स्थापना. पदसिद्ध अध्यक्ष भारताचे पंतप्रधान असतात.",
        bn: "নীতি আয়োগ (NITI Aayog): ১ জানুয়ারি ২০১৫ তারিখে গঠিত হয়। এর পদাধিকারবলে সভাপতি হলেন ভারতের প্রধানমন্ত্রী।"
      },
      {
        hi: "कर्क रेखा भारत के 8 राज्यों से गुजरती है: गुजरात, राजस्थान, मप्र, छत्तीसगढ़, झारखंड, प. बंगाल, त्रिपुरा, मिजोरम।",
        en: "Tropic of Cancer passes through 8 Indian States: Gujarat, Rajasthan, MP, Chhattisgarh, Jharkhand, WB, Tripura, Mizoram.",
        ta: "கடக ரேகை (Tropic of Cancer) இந்தியாவின் 8 மாநிலங்கள் வழியே செல்கிறது: குஜராத், ராஜஸ்தான், ம.பி, சத்தீஸ்கர், ஜார்க்கண்ட், மேற்கு வங்கம், திரிபுரா, மிசோரம்.",
        te: "కర్కట రేఖ భారతదేశంలోని 8 రాష్ట్రాల గుండా వెళుతుంది: గుజరాత్, రాజస్థాన్, మధ్యప్రదేశ్, ఛత్తీస్‌గఢ్, జార్ఖండ్, పశ్చిమ బెంగాల్, త్రిపుర, మిజోరం.",
        mr: "कर्कवृत्त भारतातील 8 राज्यांमधून जाते: गुजरात, राजस्थान, मध्य प्रदेश, छत्तीसगड, झारखंड, पश्चिम बंगाल, त्रिपुरा आणि मिझोराम.",
        bn: "কর্কটক্রান্তি রেখা ভারতের ৮টি রাজ্যের ওপর দিয়ে গেছে: গুজরাট, রাজস্থান, মধ্যপ্রদেশ, ছত্তিশগড়, ঝাড়খণ্ড, পশ্চিমবঙ্গ, ত্রিপুরা ও মিজোরাম।"
      }
    ]
  }
];

// Replace MONTHLY_CAPSULE_DATA in current-affairs.js
const startMarker = 'const MONTHLY_CAPSULE_DATA = [';
const endMarker = 'let caCurrentQuestionIndex = 0;';

const sIdx = code.indexOf(startMarker);
const eIdx = code.indexOf(endMarker);

if (sIdx !== -1 && eIdx !== -1) {
  const newCapsuleBlock = 'const MONTHLY_CAPSULE_DATA = ' + JSON.stringify(ENRICHED_CAPSULE_DATA, null, 2) + ';\n\n';
  code = code.substring(0, sIdx) + newCapsuleBlock + code.substring(eIdx);
  console.log('Successfully injected multilingual MONTHLY_CAPSULE_DATA into current-affairs.js');
} else {
  console.error('Markers not found for MONTHLY_CAPSULE_DATA');
}

// Now update renderMonthlyCapsule function in current-affairs.js
const renderFunctionStart = 'function renderMonthlyCapsule() {';
const renderFunctionEnd = 'function copyCACapsuleNotes() {';

const rStart = code.indexOf(renderFunctionStart);
const rEnd = code.indexOf(renderFunctionEnd);

if (rStart !== -1 && rEnd !== -1) {
  const newRenderFunction = `function renderMonthlyCapsule() {
  const containers = document.querySelectorAll('.caMonthlyCapsuleContainer, #caMonthlyCapsuleContainer');
  if (!containers || containers.length === 0) return;

  const lang = (typeof getActiveLanguage === 'function') ? getActiveLanguage() : (localStorage.getItem('preferred_language') || 'hi');
  const isEnglish = (lang === 'en');

  let html = '';
  MONTHLY_CAPSULE_DATA.forEach((sec, idx) => {
    let itemsHtml = '';
    const catTitle = (!isEnglish && sec.category_i18n && sec.category_i18n[lang])
      ? sec.category_i18n[lang]
      : (isEnglish ? (sec.category_en || sec.category) : sec.category);

    sec.points.forEach((pt, pIdx) => {
      // If English: pt.en primary, pt.hi secondary
      // If Regional (Tamil, Telugu, Marathi, etc.): pt[lang] primary, pt.en secondary
      let primaryText = '';
      let secondaryText = '';
      let secBadge = '';

      if (isEnglish) {
        primaryText = pt.en || pt.hi;
        secondaryText = pt.hi || pt.en;
        secBadge = 'HINDI';
      } else {
        primaryText = pt[lang] || pt.ta || pt.hi;
        secondaryText = pt.en || pt.hi;
        secBadge = 'ENGLISH';
      }

      itemsHtml += \`
        <li class="p-3 rounded-xl bg-slate-50/70 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700/80 hover:border-indigo-200 dark:hover:border-indigo-500/50 hover:bg-indigo-50/30 dark:hover:bg-indigo-950/20 transition-all text-xs space-y-1">
          <div class="text-slate-900 dark:text-slate-100 font-bold leading-relaxed">
            <span class="text-indigo-600 dark:text-indigo-400 font-black mr-1.5">•</span>\${primaryText}
          </div>
          <div class="text-slate-500 dark:text-slate-400 text-[11px] pl-3.5 italic flex items-center space-x-1.5">
            <span class="text-[9px] font-black uppercase text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-950/80 px-1.5 py-0.5 rounded border border-blue-200 dark:border-blue-800">\${secBadge}</span>
            <span>\${secondaryText}</span>
          </div>
        </li>
      \`;
    });

    html += \`
      <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-3">
        <div class="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
          <h4 class="font-bold text-sm sm:text-base text-slate-800 dark:text-white flex items-center gap-2">
            \${catTitle}
          </h4>
          <span class="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            \${sec.points.length} \${isEnglish ? 'Key Points' : 'முக்கிய குறிப்புகள் / मुख्य बिंदु'}
          </span>
        </div>
        <ul class="space-y-2">
          \${itemsHtml}
        </ul>
      </div>
    \`;
  });

  containers.forEach(container => {
    container.innerHTML = html;
  });
}

`;
  code = code.substring(0, rStart) + newRenderFunction + code.substring(rEnd);
  console.log('Successfully updated renderMonthlyCapsule in current-affairs.js');
}

fs.writeFileSync(targetPath, code, 'utf8');
console.log('Finished writing current-affairs.js');
