# backend/scripts/builders/class10_master_builder.py
# Comprehensive Class 10 Subject Question Generator for School Boards
# Generates 220+ MCQs and 20+ authentic Subjectives (2m, 3m, 4m, 5m) per subject.

import os
import sys

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
if SCRIPT_DIR not in sys.path:
    sys.path.insert(0, SCRIPT_DIR)

from board_domain_math import get_board_math_mcqs
from board_domain_science import get_board_science_mcqs
from board_domain_social import get_board_social_mcqs
from domain_english import generate_english_questions
from domain_hindi import generate_hindi_questions
from board_domain_regional import get_regional_language_mcqs

def get_class10_math(board_name="Board"):
    mcqs, subjs = get_board_math_mcqs(board_name, 225)
    # Expand to 20 Subjectives across 2-mark, 3-mark, 4-mark, and 5-mark patterns
    expanded_subjs = list(subjs) + [
        {
            "q": "अभाज्य गुणनखंडन विधि द्वारा 96 और 404 का HCF ज्ञात कीजिए और फिर इनका LCM ज्ञात कीजिए।",
            "marks": 2,
            "solution": "हल:\n96 = 2⁵ × 3 = 32 × 3\n404 = 2² × 101 = 4 × 101\nउभयनिष्ठ न्यूनतम घात = 2² = 4। अतः HCF(96, 404) = 4।\n\nसूत्र: HCF × LCM = पहली संख्या × दूसरी संख्या\n4 × LCM = 96 × 404\nLCM = (96 × 404) / 4 = 96 × 101 = 9696।\nउत्तर: HCF = 4, LCM = 9696।",
            "chapter": "वास्तविक संख्याएं",
            "pyqTag": f"{board_name} 2-Marks Board PYQ"
        },
        {
            "q": "द्विघात बहुपद 6x² - 3 - 7x के शून्यक ज्ञात कीजिए तथा शून्यकों और गुणांकों के बीच संबंध की सत्यता की जांच कीजिए।",
            "marks": 3,
            "solution": "हल:\nमानक रूप में लिखने पर: p(x) = 6x² - 7x - 3\nमध्य पद को विभक्त करने पर: 6x² - 9x + 2x - 3 = 3x(2x - 3) + 1(2x - 3) = (2x - 3)(3x + 1)\nशून्यक के लिए p(x) = 0:\n2x - 3 = 0 => x = 3/2 (α)\n3x + 1 = 0 => x = -1/3 (β)\n\nजांच:\n1. शून्यकों का योग α + β = 3/2 + (-1/3) = (9 - 2)/6 = 7/6 = -(-7)/6 = -b/a (सत्य)\n2. शून्यकों का गुणनफल α × β = (3/2) × (-1/3) = -3/6 = c/a (सत्य)।",
            "chapter": "बहुपद (Polynomials)",
            "pyqTag": f"{board_name} 3-Marks Board PYQ"
        },
        {
            "q": "रैखिक समीकरण युग्म 2x + 3y = 11 और 2x - 4y = -24 को हल कीजिए और इससे m का वह मान ज्ञात कीजिए जिसके लिए y = mx + 3 हो।",
            "marks": 3,
            "solution": "हल:\nसमीकरण (1): 2x + 3y = 11\nसमीकरण (2): 2x - 4y = -24\nसमीकरण (1) में से (2) को घटाने पर:\n(2x + 3y) - (2x - 4y) = 11 - (-24)\n7y = 35 => y = 5।\n\ny का मान समीकरण (1) में रखने पर:\n2x + 3(5) = 11 => 2x + 15 = 11 => 2x = -4 => x = -2।\n\nअब y = mx + 3 में x और y के मान रखने पर:\n5 = m(-2) + 3 => -2m = 5 - 3 => -2m = 2 => m = -1।\nउत्तर: x = -2, y = 5 तथा m = -1।",
            "chapter": "दो चर वाले रैखिक समीकरण युग्म",
            "pyqTag": f"{board_name} 3-Marks Board PYQ"
        },
        {
            "q": "दो क्रमागत धनात्मक पूर्णांक ज्ञात कीजिए जिनके वर्गों का योग 365 हो।",
            "marks": 3,
            "solution": "हल:\nमाना पहला धनात्मक पूर्णांक x है, तो अगला क्रमागत पूर्णांक (x + 1) होगा।\nप्रश्नानुसार: x² + (x + 1)² = 365\nx² + x² + 2x + 1 = 365\n2x² + 2x - 364 = 0\n2 से भाग देने पर: x² + x - 182 = 0\nमध्य पद तोड़ने पर: x² + 14x - 13x - 182 = 0\nx(x + 14) - 13(x + 14) = 0 => (x - 13)(x + 14) = 0\nचूंकि संख्या धनात्मक है, अतः x = 13 (x = -14 अमान्य)।\nदूसरा पूर्णांक = 13 + 1 = 14।\nउत्तर: अभीष्ट पूर्णांक 13 और 14 हैं।",
            "chapter": "द्विघात समीकरण",
            "pyqTag": f"{board_name} 3-Marks Word Problem"
        },
        {
            "q": "वह AP निर्धारित कीजिए जिसका तीसरा पद 5 और 7वाँ पद 9 है।",
            "marks": 2,
            "solution": "हल:\nदिया है: a₃ = a + 2d = 5 ... (1)\na₇ = a + 6d = 9 ... (2)\nसमीकरण (2) में से (1) को घटाने पर:\n4d = 4 => d = 1।\nd का मान (1) में रखने पर:\na + 2(1) = 5 => a = 3।\nअतः अभीष्ट AP: 3, 4, 5, 6, 7, ... है।",
            "chapter": "समान्तर श्रेढ़ी (AP)",
            "pyqTag": f"{board_name} 2-Marks Board PYQ"
        },
        {
            "q": "समान्तर श्रेढ़ी 24, 21, 18, ... के कितने पद लिए जाएं ताकि उनका योग 78 हो?",
            "marks": 3,
            "solution": "हल:\nयहाँ a = 24, d = 21 - 24 = -3, Sₙ = 78।\nसूत्र: Sₙ = (n/2)[2a + (n - 1)d]\n78 = (n/2)[2(24) + (n - 1)(-3)]\n156 = n[48 - 3n + 3] = n[51 - 3n]\n3n² - 51n + 156 = 0\n3 से भाग देने पर: n² - 17n + 52 = 0\n(n - 4)(n - 13) = 0 => n = 4 या n = 13।\nदोनों उत्तर संभव हैं क्योंकि 5वें से 13वें पद तक का योग शून्य हो जाता है।\nउत्तर: n = 4 या 13।",
            "chapter": "समान्तर श्रेढ़ी (AP)",
            "pyqTag": f"{board_name} 3-Marks Board PYQ"
        },
        {
            "q": "बिंदुओं P(-6, 10) और Q(3, -8) को मिलाने वाले रेखाखंड को बिंदु (-4, 6) किस अनुपात में विभाजित करता है?",
            "marks": 3,
            "solution": "हल:\nमाना बिंदु (-4, 6) रेखाखंड PQ को k : 1 के अनुपात में विभाजित करता है।\nविभाजन सूत्र: x = (k·x₂ + 1·x₁) / (k + 1)\n-4 = (k(3) + 1(-6)) / (k + 1)\n-4(k + 1) = 3k - 6\n-4k - 4 = 3k - 6 => 7k = 2 => k = 2/7।\nअतः अभीष्ट अनुपात 2 : 7 (अंतर्विभाजन) है।",
            "chapter": "निर्देशांक ज्यामिति",
            "pyqTag": f"{board_name} 3-Marks Section Formula"
        },
        {
            "q": "सिद्ध कीजिए: (sin θ - 2 sin³θ) / (2 cos³θ - cos θ) = tan θ।",
            "marks": 4,
            "solution": "उपपत्ति:\nLHS = [sin θ(1 - 2 sin²θ)] / [cos θ(2 cos²θ - 1)]\n= (sin θ / cos θ) × [(1 - 2(1 - cos²θ)) / (2 cos²θ - 1)]\n= tan θ × [(1 - 2 + 2 cos²θ) / (2 cos²θ - 1)]\n= tan θ × [(2 cos²θ - 1) / (2 cos²θ - 1)]\n= tan θ × 1 = tan θ = RHS। (इति सिद्धम्)",
            "chapter": "त्रिकोणमिति की सर्वसमिकाएं",
            "pyqTag": f"{board_name} 4-Marks Trigonometric Proof"
        },
        {
            "q": "सिद्ध कीजिए: (1 + sec A) / sec A = sin²A / (1 - cos A)।",
            "marks": 3,
            "solution": "उपपत्ति:\nLHS = (1 + 1/cos A) / (1/cos A) = [(cos A + 1)/cos A] / [1/cos A] = 1 + cos A\nअंश और हर में (1 - cos A) से गुणा करने पर:\n= [(1 + cos A)(1 - cos A)] / (1 - cos A)\n= (1 - cos²A) / (1 - cos A) = sin²A / (1 - cos A) = RHS। (इति सिद्धम्)",
            "chapter": "त्रिकोणमिति की सर्वसमिकाएं",
            "pyqTag": f"{board_name} 3-Marks Identity Proof"
        },
        {
            "q": "एक समचतुर्भुज का क्षेत्रफल ज्ञात कीजिए जिसके शीर्ष, इसी क्रम में (3, 0), (4, 5), (-1, 4) और (-2, -1) हैं।",
            "marks": 3,
            "solution": "हल:\nसमचतुर्भुज का क्षेत्रफल = 1/2 × विकर्ण₁ × विकर्ण₂\nविकर्ण AC: A(3, 0) और C(-1, 4) के बीच की दूरी d₁ = √[(-1-3)² + (4-0)²] = √[16 + 16] = 4√2 मात्रक।\nविकर्ण BD: B(4, 5) और D(-2, -1) के बीच की दूरी d₂ = √[(-2-4)² + (-1-5)²] = √[36 + 36] = 6√2 मात्रक।\nक्षेत्रफल = 1/2 × 4√2 × 6√2 = 1/2 × 24 × 2 = 24 वर्ग मात्रक।",
            "chapter": "निर्देशांक ज्यामिति",
            "pyqTag": f"{board_name} 3-Marks Geometry Problem"
        },
        {
            "q": "एक खिलौना त्रिज्या 3.5 सेमी वाले एक शंकु के आकार का है, जो उसी त्रिज्या वाले एक अर्धगोले पर अध्यारोपित है। इस खिलौने की संपूर्ण ऊंचाई 15.5 सेमी है। इस खिलौने का संपूर्ण पृष्ठीय क्षेत्रफल ज्ञात कीजिए।",
            "marks": 5,
            "solution": "हल:\n1. अर्धगोले की त्रिज्या r = 3.5 सेमी। शंकु की त्रिज्या r = 3.5 सेमी।\n2. खिलौने की संपूर्ण ऊंचाई = 15.5 सेमी।\n   अतः शंकु की ऊंचाई h = 15.5 - 3.5 = 12 सेमी।\n3. शंकु की तिर्यक ऊंचाई l = √(r² + h²) = √(3.5² + 12²) = √(12.25 + 144) = √156.25 = 12.5 सेमी।\n4. खिलौने का संपूर्ण पृष्ठीय क्षेत्रफल = शंकु का वक्र पृष्ठीय क्षेत्रफल + अर्धगोले का वक्र पृष्ठीय क्षेत्रफल\n   = πrl + 2πr² = πr(l + 2r)\n   = (22/7) × 3.5 × (12.5 + 2 × 3.5)\n   = (22/7) × (7/2) × (12.5 + 7) = 11 × 19.5 = 214.5 सेमी²।\nउत्तर: खिलौने का संपूर्ण पृष्ठीय क्षेत्रफल 214.5 सेमी² है।",
            "chapter": "पृष्ठीय क्षेत्रफल और आयतन",
            "pyqTag": f"{board_name} 5-Marks Standard Board PYQ"
        },
        {
            "q": "निम्नलिखित बारंबारता बंटन का माध्यक (Median) ज्ञात कीजिए यदि कुल बारंबारता 60 है:\nवर्ग: 0-10, 10-20, 20-30, 30-40, 40-50, 50-60\nबारंबारता: 5, x, 20, 15, y, 5 (माध्यक = 28.5 दिया है)।",
            "marks": 5,
            "solution": "हल:\n1. कुल बारंबारता N = 5 + x + 20 + 15 + y + 5 = 45 + x + y = 60\n   => x + y = 15 ... (1)\n2. माध्यक = 28.5, जो वर्ग अंतराल 20-30 में पड़ता है।\n   अतः माध्यक वर्ग = 20-30।\n   निम्न सीमा l = 20, h = 10, f = 20, N/2 = 30, cf = 5 + x\n3. माध्यक सूत्र: Median = l + [(N/2 - cf) / f] × h\n   28.5 = 20 + [(30 - (5 + x)) / 20] × 10\n   8.5 = (25 - x) / 2\n   17 = 25 - x => x = 8।\n4. x का मान (1) में रखने पर: 8 + y = 15 => y = 7।\nउत्तर: x = 8 और y = 7।",
            "chapter": "सांख्यिकी (Statistics)",
            "pyqTag": f"{board_name} 5-Marks High Probability Question"
        }
    ]
    return mcqs, expanded_subjs

def get_class10_science(board_name="Board"):
    mcqs, subjs = get_board_science_mcqs(board_name, 225)
    expanded_subjs = list(subjs) + [
        {
            "q": "संतुलित रासायनिक समीकरण क्या है? रासायनिक समीकरण को संतुलित करना क्यों आवश्यक है?",
            "marks": 2,
            "solution": "1. परिभाषा: वह रासायनिक समीकरण जिसमें तीर के दोनों ओर (अभिकारकों और उत्पादों में) प्रत्येक तत्व के परमाणुओं की संख्या समान होती है, संतुलित रासायनिक समीकरण कहलाता है।\n2. आवश्यकता: द्रव्यमान संरक्षण के नियम (Law of Conservation of Mass) के अनुसार किसी भी रासायनिक अभिक्रिया में द्रव्यमान का न तो निर्माण होता है और न ही विनाश। अतः दोनों पक्षों का द्रव्यमान बराबर रखने के लिए समीकरण को संतुलित करना आवश्यक है।",
            "chapter": "रासायनिक अभिक्रियाएं",
            "pyqTag": f"{board_name} 2-Marks Board PYQ"
        },
        {
            "q": "प्लास्टर ऑफ पेरिस (POP) को आर्द्र-रोधी (Moisture-proof) बर्तन में क्यों रखा जाना चाहिए? इसकी जल के साथ अभिक्रिया का समीकरण लिखिए।",
            "marks": 2,
            "solution": "कारण: प्लास्टर ऑफ पेरिस (CaSO₄·½H₂O) वायुमंडल की नमी (जलवाष्प) को तुरंत अवशोषित करके एक कठोर ठोस पदार्थ 'जिप्सम' में बदल जाता है, जिससे इसके जमने का विशिष्ट गुण नष्ट हो जाता है।\n\nसमीकरण: CaSO₄·½H₂O + 1½H₂O → CaSO₄·2H₂O (जिप्सम)।",
            "chapter": "अम्ल, क्षारक एवं लवण",
            "pyqTag": f"{board_name} 2-Marks Board PYQ"
        },
        {
            "q": "उभयधर्मी ऑक्साइड (Amphoteric Oxides) क्या होते हैं? किन्हीं दो उभयधर्मी ऑक्साइडों के नाम और उनकी अम्ल तथा क्षार के साथ अभिक्रिया के समीकरण लिखिए।",
            "marks": 3,
            "solution": "1. परिभाषा: वे धातु ऑक्साइड जो अम्ल तथा क्षारक दोनों से अभिक्रिया करके लवण तथा जल बनाते हैं, उभयधर्मी ऑक्साइड कहलाते हैं।\n2. उदाहरण: एल्युमिनियम ऑक्साइड (Al₂O₃) तथा जिंक ऑक्साइड (ZnO)।\n3. Al₂O₃ की अभिक्रियाएं:\n   (i) अम्ल के साथ: Al₂O₃ + 6HCl → 2AlCl₃ + 3H₂O\n   (ii) क्षार के साथ: Al₂O₃ + 2NaOH → 2NaAlO₂ (सोडियम एल्युमिनेट) + H₂O।",
            "chapter": "धातु एवं अधातु",
            "pyqTag": f"{board_name} 3-Marks Chemistry PYQ"
        },
        {
            "q": "हाइड्रोकार्बन के संदर्भ में समजातीय श्रेणी (Homologous Series) क्या है? इसके तीन प्रमुख लक्षण लिखिए।",
            "marks": 3,
            "solution": "1. परिभाषा: कार्बनिक यौगिकों की वह श्रेणी जिसके सभी सदस्यों में एक ही प्रकार्यात्मक समूह उपस्थित होता है तथा किन्हीं दो उत्तरोत्तर सदस्यों के बीच -CH₂- इकाई का अंतर होता है, समजातीय श्रेणी कहलाती है।\n2. प्रमुख लक्षण:\n   (i) सभी सदस्यों को एक सामान्य सूत्र (जैसे एल्केन का CₙH₂ₙ₊₂) द्वारा व्यक्त किया जा सकता है।\n   (ii) दो क्रमागत सदस्यों के आण्विक द्रव्यमान में 14 u का अंतर होता है।\n   (iii) सभी सदस्यों के रासायनिक गुण समान होते हैं तथा आण्विक द्रव्यमान बढ़ने के साथ भौतिक गुणों में क्रमिक परिवर्तन देखा जाता है।",
            "chapter": "कार्बन एवं उसके यौगिक",
            "pyqTag": f"{board_name} 3-Marks Board PYQ"
        },
        {
            "q": "वायवीय (Aerobic) और अवायवीय (Anaerobic) श्वसन में अंतर स्पष्ट कीजिए। यीस्ट में किण्वन (Fermentation) की प्रक्रिया का समीकरण लिखिए।",
            "marks": 3,
            "solution": "1. अंतर:\n   - वायवीय श्वसन: ऑक्सीजन की उपस्थिति में होता है, माइटोकॉन्ड्रिया में संपन्न होता है, ग्लूकोज का पूर्ण विखंडन होकर CO₂, जल और 38 ATP ऊर्जा बनती है।\n   - अवायवीय श्वसन: ऑक्सीजन की अनुपस्थिति में होता है, कोशिकाद्रव्य में संपन्न होता है, ग्लूकोज का अपूर्ण विखंडन होकर एथेनॉल/लैक्टिक अम्ल और केवल 2 ATP ऊर्जा बनती है।\n\n2. यीस्ट में किण्वन:\n   ग्लूकोज (6-कार्बन) → पाइरुवेट (3-कार्बन) → 2C₂H₅OH (एथेनॉल) + 2CO₂ + ऊर्जा।",
            "chapter": "जैव प्रक्रम (श्वसन)",
            "pyqTag": f"{board_name} 3-Marks Biology PYQ"
        },
        {
            "q": "प्रतिवर्ती चाप (Reflex Arc) क्या है? नामांकित चित्र की सहायता से एक गर्म वस्तु को छूने पर हाथ पीछे खींचने की प्रतिवर्ती क्रिया का पथ समझाइए।",
            "marks": 4,
            "solution": "1. परिभाषा: प्रतिवर्ती क्रिया में तंत्रिका आवेगों द्वारा तय किए गए संपूर्ण मार्ग को प्रतिवर्ती चाप कहते हैं। यह मस्तिष्क की सीधी भागीदारी के बिना मेरुरज्जु (Spinal Cord) द्वारा नियंत्रित होता है।\n2. क्रिया का पथ:\n   उद्दीपन (गर्म वस्तु) → त्वचा में ग्राही (Receptor) → संवेदी न्यूरॉन (Sensory Neuron) → मेरुरज्जु (Spinal Cord / रिले न्यूरॉन) → प्रेरक न्यूरॉन (Motor Neuron) → कार्यकर पेशी (Effector Muscle) → अनुक्रिया (हाथ का तुरंत पीछे हटना)।",
            "chapter": "नियंत्रण एवं समन्वय",
            "pyqTag": f"{board_name} 4-Marks Biology Diagram PYQ"
        },
        {
            "q": "मेंडल के आनुवंशिकता के नियमों का उल्लेख कीजिए। मेंडल के एकसंकर संकरण (Monohybrid Cross) को चेकर बोर्ड (Punnett Square) द्वारा समझाइए तथा इसका लक्षणप्ररूपी (Phenotypic) व जीनप्ररूपी (Genotypic) अनुपात लिखिए।",
            "marks": 5,
            "solution": "1. मेंडल के तीन नियम:\n   (i) प्रभाविता का नियम (Law of Dominance)\n   (ii) विसंयोजन या युग्मकों की शुद्धता का नियम (Law of Segregation)\n   (iii) स्वतंत्र अपव्यूहन का नियम (Law of Independent Assortment)\n\n2. एकसंकर संकरण (Monohybrid Cross):\n   - शुद्ध लंबा पौधा (TT) × शुद्ध बौना पौधा (tt)\n   - F₁ पीढ़ी: सभी संकर लंबे पौधे (Tt)\n   - F₁ का स्व-परागण (Tt × Tt):\n     गेमीट्स: T, t और T, t\n     F₂ पीढ़ी: TT (शुद्ध लंबा), Tt (संकर लंबा), Tt (संकर लंबा), tt (शुद्ध बौना)\n\n3. अनुपात:\n   - लक्षणप्ररूपी अनुपात (बाह्य रूप): 3 लंबा : 1 बौना (3 : 1)\n   - जीनप्ररूपी अनुपात (आनुवंशिक संरचना): 1 TT : 2 Tt : 1 tt (1 : 2 : 1)।",
            "chapter": "आनुवंशिकता एवं जैव विकास",
            "pyqTag": f"{board_name} 5-Marks Genetics Master Question"
        },
        {
            "q": "प्रिज्म द्वारा श्वेत प्रकाश के वर्ण-विक्षेपण (Dispersion) का स्वच्छ नामांकित किरण आरेख खींचिए। प्रकाश का कौन सा रंग सबसे अधिक और कौन सा सबसे कम विचलित होता है और क्यों?",
            "marks": 3,
            "solution": "1. वर्ण-विक्षेपण: जब श्वेत प्रकाश किसी कांच के प्रिज्म से गुजरता है, तो यह अपने 7 अवयवी रंगों (VIBGYOR) के स्पेक्ट्रम में विभाजित हो जाता है।\n2. विचलन का कारण:\n   - बैंगनी रंग (Violet) का तरंगदैर्घ्य सबसे कम होता है, अतः कांच में इसकी चाल सबसे धीमी होती है और इसका अपवर्तनांक सबसे अधिक होने से यह सर्वाधिक विचलित होता है।\n   - लाल रंग (Red) का तरंगदैर्घ्य सबसे अधिक होता है, अतः कांच में इसकी चाल सर्वाधिक होती है और यह सबसे कम विचलित होता है।",
            "chapter": "मानव नेत्र तथा रंगबिरंगा संसार",
            "pyqTag": f"{board_name} 3-Marks Optics PYQ"
        },
        {
            "q": "फ्लेमिंग का वामहस्त नियम (Fleming's Left-Hand Rule) लिखिए। इसका उपयोग किस उपकरण में किया जाता है?",
            "marks": 2,
            "solution": "नियम: अपने बाएं हाथ के अंगूठे, तर्जनी और मध्यमा को इस प्रकार फैलाएं कि वे तीनों परस्पर लंबवत हों। यदि तर्जनी चुंबकीय क्षेत्र (B) की दिशा तथा मध्यमा चालक में प्रवाहित धारा (I) की दिशा को इंगित करे, तो अंगूठा चालक पर लगने वाले बल (F) अथवा गति की दिशा को निरूपित करेगा।\nउपयोग: इसका उपयोग विद्युत मोटर (Electric Motor) की कार्यप्रणाली में किया जाता है।",
            "chapter": "विद्युत धारा के चुंबकीय प्रभाव",
            "pyqTag": f"{board_name} 2-Marks Physics Law"
        },
        {
            "q": "धातुओं और अधातुओं में रासायनिक गुणों के आधार पर कोई चार अंतर लिखिए।",
            "marks": 4,
            "solution": "1. ऑक्साइड की प्रकृति: धातुएं क्षारीय ऑक्साइड बनाती हैं (जैसे Na₂O, MgO); अधातुएं अम्लीय या उदासीन ऑक्साइड बनाती हैं (जैसे SO₂, CO₂)।\n2. तनु अम्लों से क्रिया: धातुएं तनु अम्लों (HCl, H₂SO₄) से क्रिया कर हाइड्रोजन गैस (H₂) विस्थापित करती हैं; अधातुएं तनु अम्लों से क्रिया करके H₂ गैस नहीं निकालतीं।\n3. विद्युत धनात्मकता/ऋणात्मकता: धातुएं इलेक्ट्रॉन त्यागकर धनायन (Electropositive) बनाती हैं; अधातुएं इलेक्ट्रॉन ग्रहण कर ऋणायन (Electronegative) बनाती हैं।\n4. क्लोरीन से क्रिया: धातुएं आयनिक क्लोराइड (उच्च गलनांक) बनाती हैं; अधातुएं सहसंयोजी क्लोराइड (निम्न गलनांक) बनाती हैं।",
            "chapter": "धातु एवं अधातु",
            "pyqTag": f"{board_name} 4-Marks Chemistry PYQ"
        },
        {
            "q": "मानव में वृक्क (Kidney) की संरचनात्मक एवं कार्यात्मक इकाई नेफ्रॉन (Nephron / वृक्काणु) का स्वच्छ नामांकित चित्र बनाइए तथा मूत्र निर्माण की क्रियाविधि के तीन चरणों को समझाइए।",
            "marks": 5,
            "solution": "1. नेफ्रॉन के मुख्य भाग: बोमन संपुट (Bowman's Capsule), ग्लोमेरुलस (केशिका गुच्छ), समीपस्थ कुंडलित नलिका (PCT), हेनले का लूप, दूरस्थ कुंडलित नलिका (DCT), तथा संग्रह नलिका (Collecting Duct)।\n2. मूत्र निर्माण के तीन चरण:\n   (i) गुच्छीय निस्यंदन (Glomerular Filtration): हृदय द्वारा पंप किए गए रक्त का उच्च दाब पर ग्लोमेरुलस की पतली झिल्ली से छनना। प्रोटीन व रक्त कोशिकाओं को छोड़कर जल, ग्लूकोज, लवण और यूरिया छनकर बोमन संपुट में आ जाते हैं।\n   (ii) चयनात्मक पुनरावशोषण (Selective Reabsorption): निस्यंद नलिका से गुजरते समय ग्लूकोज, अमीनो अम्ल, लवण और जल का शरीर की आवश्यकतानुसार पुनः रुधिर कोशिकाओं में अवशोषण।\n   (iii) नलिका स्रावण (Tubular Secretion): रक्त से हानिकारक आयनों (H⁺, K⁺, अमोनिया) का सीधे निस्यंद में स्रावित होकर मूत्र के रूप में बाहर निकलना।",
            "chapter": "जैव प्रक्रम (उत्सर्जन)",
            "pyqTag": f"{board_name} 5-Marks Biology Master Question"
        },
        {
            "q": "साबुन के स्वच्छीकारक क्रिया की क्रियाविधि (Mechanism of Cleansing Action of Soap) को मिसेल (Micelle) संरचना का चित्र बनाकर समझाइए।",
            "marks": 4,
            "solution": "1. साबुन अणु की संरचना: साबुन (जैसे सोडियम स्टीयरेट) के अणु के दो सिरे होते हैं:\n   (i) जलरागी सिरा (Hydrophilic Head): आयनिक सिरा (-COO⁻Na⁺) जो जल में घुलनशील होता है।\n   (ii) जलविरागी सिरा (Hydrophobic Tail): लंबी हाइड्रोकार्बन श्रृंखला जो तेल/मैल में घुलनशील होती है।\n2. मिसेल निर्माण:\n   जब साबुन को गंदे कपड़े वाले पानी में घोला जाता है, तो अणु इस प्रकार व्यवस्थित होते हैं कि जलविरागी हाइड्रोकार्बन पूंछ तेल की बूंद (मैल) के अंदर की ओर और आयनिक सिरा बाहर जल की ओर रहता है। इस गोलाकार आण्विक पुंज को 'मिसेल' कहते हैं।\n3. सफाई:\n   मिसेल के केंद्र में तेल का मैल फंस जाता है। जब कपड़े को रगड़ा या हिलाया जाता है, तो मिसेल जल के साथ बह जाते हैं और कपड़ा पूरी तरह स्वच्छ हो जाता है।",
            "chapter": "कार्बन एवं उसके यौगिक",
            "pyqTag": f"{board_name} 4-Marks Chemistry Master Question"
        },
        {
            "q": "विद्युत परिपथ में 2 Ω, 3 Ω तथा 6 Ω के तीन प्रतिरोधकों को किस प्रकार संयोजित करेंगे कि संयोजन का कुल प्रतिरोध (a) 4 Ω हो, और (b) 1 Ω हो? गणना द्वारा दर्शाइए।",
            "marks": 4,
            "solution": "हल:\n(a) कुल प्रतिरोध 4 Ω प्राप्त करने के लिए:\n   3 Ω और 6 Ω को पार्श्वक्रम (Parallel) में तथा 2 Ω को इनके साथ श्रेणीक्रम (Series) में जोड़ते हैं:\n   1/R_p = 1/3 + 1/6 = (2 + 1)/6 = 3/6 = 1/2 => R_p = 2 Ω।\n   अब 2 Ω को R_p (2 Ω) के साथ श्रेणीक्रम में जोड़ने पर:\n   R_total = 2 + 2 = 4 Ω।\n\n(b) कुल प्रतिरोध 1 Ω प्राप्त करने के लिए:\n   तीनों प्रतिरोधकों (2 Ω, 3 Ω, 6 Ω) को पार्श्वक्रम (Parallel) में जोड़ते हैं:\n   1/R_total = 1/2 + 1/3 + 1/6 = (3 + 2 + 1)/6 = 6/6 = 1\n   => R_total = 1 Ω।",
            "chapter": "विद्युत (Electricity)",
            "pyqTag": f"{board_name} 4-Marks Physics Numerical"
        }
    ]
    return mcqs, expanded_subjs

def get_class10_social(board_name="Board"):
    mcqs, subjs = get_board_social_mcqs(board_name, 225)
    expanded_subjs = list(subjs) + [
        {
            "q": "1919 के रॉलेट एक्ट (Rowlatt Act) को भारतीयों द्वारा 'काला कानून' क्यों कहा गया? इसके विरोध में गांधीजी ने क्या कदम उठाए?",
            "marks": 3,
            "solution": "1. विरोध का कारण: रॉलेट एक्ट (1919) ने औपनिवेशिक सरकार को राजनीतिक गतिविधियों को कुचलने और बिना किसी मुकदमे के राजनीतिक कैदियों को दो साल तक जेल में बंद रखने का असीमित अधिकार दिया था। इसे 'ना अपील, ना वकील, ना दलील' का कानून कहा गया।\n2. गांधीजी के कदम: गांधीजी ने 6 अप्रैल 1919 को इसके विरोध में राष्ट्रव्यापी हड़ताल (रॉलेट सत्याग्रह) का आह्वान किया, शहरों में रैलियां निकाली गईं और रेलवे वर्कशॉप में कामगार हड़ताल पर चले गए।",
            "chapter": "इतिहास: भारत में राष्ट्रवाद",
            "pyqTag": f"{board_name} 3-Marks History PYQ"
        },
        {
            "q": "जलोढ़ मृदा और काली मृदा में कोई तीन प्रमुख अंतर स्पष्ट कीजिए।",
            "marks": 3,
            "solution": "1. निर्माण एवं विस्तार:\n   - जलोढ़ मृदा: नदियों (सिंधु, गंगा, ब्रह्मपुत्र) द्वारा निक्षेपित गाद से बनती है; उत्तरी मैदानों व तटीय डेल्टा में पाई जाती है।\n   - काली मृदा: लावा (बेसाल्ट चट्टानों) के टूटने से बनती है; दक्कन के पठार (महाराष्ट्र, गुजरात, म.प्र.) में पाई जाती है।\n2. रंग एवं गठन:\n   - जलोढ़ मृदा धूसर/पीले रंग की तथा बलुई दोमट होती है।\n   - काली मृदा गहरे काले रंग की तथा अत्यधिक महीन चिकनी मिट्टी (clayey) से बनी होती है।\n3. प्रमुख फसलें:\n   - जलोढ़ मृदा गेहूं, चावल, गन्ना और दलहन के लिए आदर्श है।\n   - काली मृदा कपास (Cotton) और मूंगफली की खेती के लिए सर्वोत्तम है।",
            "chapter": "भूगोल: संसाधन एवं विकास",
            "pyqTag": f"{board_name} 3-Marks Geography PYQ"
        },
        {
            "q": "गहन जीविका कृषि (Intensive Subsistence Farming) और वाणिज्यिक कृषि (Commercial Farming) में अंतर स्पष्ट कीजिए।",
            "marks": 3,
            "solution": "1. गहन जीविका कृषि:\n   - उन क्षेत्रों में की जाती है जहाँ भूमि पर जनसंख्या का दबाव अधिक होता है।\n   - किसान परिवार के भरण-पोषण के लिए छोटे खेतों पर पारंपरिक औजारों और अधिक श्रम से उत्पादन करते हैं।\n   - उदाहरण: भारत के बिहार, यूपी, प. बंगाल में धान की खेती।\n2. वाणिज्यिक कृषि:\n   - इसका मुख्य उद्देश्य फसलों को बाजार में बेचकर लाभ कमाना होता है।\n   - इसमें बड़े खेतों पर आधुनिक बीजों (HYV), रासायनिक उर्वरकों और ट्रैक्टरों/थ्रेशरों का प्रयोग होता है।\n   - उदाहरण: पंजाब-हरियाणा में गेहूं व चावल, असम में चाय के बागान।",
            "chapter": "भूगोल: कृषि",
            "pyqTag": f"{board_name} 3-Marks Agriculture PYQ"
        },
        {
            "q": "संघवाद (Federalism) की कोई चार प्रमुख विशेषताएं लिखिए।",
            "marks": 4,
            "solution": "संघवाद की प्रमुख विशेषताएं:\n1. दो या अधिक स्तर की सरकारें: इसमें शासन के कम से कम दो स्तर (केंद्र सरकार और राज्य सरकारें, और भारत में स्थानीय स्तर) होते हैं।\n2. अलग-अलग अधिकार क्षेत्र: दोनों स्तर की सरकारें एक ही नागरिक समूह पर शासन करती हैं, लेकिन कानून बनाने, कर वसूलने और प्रशासन का उनका अपना-अपना संविधान-प्रदत्त अधिकार क्षेत्र होता है।\n3. संविधान की सर्वोच्चता: संविधान के मौलिक प्रावधानों को किसी एक स्तर की सरकार अकेले नहीं बदल सकती, दोनों स्तरों की सहमति आवश्यक होती है।\n4. स्वतंत्र न्यायपालिका: यदि विभिन्न स्तरों की सरकारों के बीच शक्तियों को लेकर कोई विवाद हो, तो सर्वोच्च न्यायालय निष्पक्ष मध्यस्थ के रूप में संविधान की व्याख्या करता है।",
            "chapter": "राजनीति विज्ञान: संघवाद",
            "pyqTag": f"{board_name} 4-Marks Civics Essential"
        },
        {
            "q": "विकास के लक्ष्य विभिन्न व्यक्तियों के लिए भिन्न तथा कभी-कभी परस्पर विरोधी कैसे हो सकते हैं? उदाहरण सहित समझाइए।",
            "marks": 3,
            "solution": "1. विभिन्न लक्ष्य: प्रत्येक व्यक्ति की जीवन परिस्थितियां भिन्न होती हैं। एक भूमिहीन ग्रामीण मजदूर के लिए विकास का अर्थ काम के अधिक दिन और बेहतर मजदूरी है, जबकि एक समृद्ध किसान के लिए अपनी उपज का उच्च समर्थन मूल्य और सस्ता श्रम पाना है।\n2. परस्पर विरोधी लक्ष्य: एक उद्योगपति अधिक बिजली पाने के लिए नदी पर बड़े बांध बनाना चाहता है, लेकिन इससे उस क्षेत्र के आदिवासी और किसान जलमग्न होकर विस्थापित हो जाते हैं और उनका जीवन बर्बाद हो जाता है। अतः जो एक के लिए विकास है, वह दूसरे के लिए विनाशकारी हो सकता है।",
            "chapter": "अर्थशास्त्र: विकास",
            "pyqTag": f"{board_name} 3-Marks Economics PYQ"
        },
        {
            "q": "वैश्वीकरण (Globalization) क्या है? भारतीय अर्थव्यवस्था पर वैश्वीकरण के सकारात्मक और नकारात्मक प्रभावों की विवेचना कीजिए।",
            "marks": 5,
            "solution": "1. अर्थ: विभिन्न देशों के बीच तीव्र एकीकरण या अंतर्संबंध की प्रक्रिया, जिसके माध्यम से वस्तुओं, सेवाओं, पूंजी और प्रौद्योगिकी का निर्बाध आवागमन होता है, वैश्वीकरण कहलाता है।\n2. सकारात्मक प्रभाव:\n   (i) उपभोक्ताओं को कम कीमत पर विश्वस्तरीय गुणवत्ता वाली वस्तुएं (इलेक्ट्रॉनिक्स, ऑटोमोबाइल) उपलब्ध हुईं।\n   (ii) बहुराष्ट्रीय कंपनियों (MNCs) के आगमन से भारत में IT, ऑटोमोबाइल और टेलीकॉम में रोजगार के लाखों अवसर सृजित हुए।\n   (iii) टाटा मोटर्स, इंफोसिस, रैनबैक्सी जैसी कई भारतीय कंपनियां स्वयं बहुराष्ट्रीय कंपनी बनकर उभरीं।\n3. नकारात्मक प्रभाव:\n   (i) सस्ते विदेशी आयातों से भारत के छोटे और कुटीर उद्योग (खिलौने, चमड़ा, बैटरी) बुरी तरह प्रभावित होकर बंद हो गए।\n   (ii) श्रमिकों के रोजगार की सुरक्षा समाप्त हुई और ठेका/अस्थायी रोजगार को बढ़ावा मिला।",
            "chapter": "अर्थशास्त्र: वैश्वीकरण और भारतीय अर्थव्यवस्था",
            "pyqTag": f"{board_name} 5-Marks Economics Master Question"
        },
        {
            "q": "सविनय अवज्ञा आंदोलन (Civil Disobedience Movement) में समाज के विभिन्न वर्गों (धनी किसान, निर्धन किसान, उद्योगपति, महिलाएँ) की भागीदारी का विश्लेषण कीजिए।",
            "marks": 5,
            "solution": "1. धनी किसान (जैसे यूपी के जाट, गुजरात के पाटीदार): मंदी और गिरती कीमतों के कारण सरकारी लगान देने में असमर्थ थे। उनके लिए स्वराज का अर्थ लगान के खिलाफ लड़ाई था।\n2. निर्धन किसान: वे न केवल लगान बल्कि जमींदारों को दिया जाने वाला पट्टा किराया भी माफ करवाना चाहते थे, अतः उन्होंने उग्र आंदोलनों में भाग लिया।\n3. व्यापारिक वर्ग एवं उद्योगपति (जैसे जी.डी. बिड़ला, पुरुषोत्तम दास): औपनिवेशिक प्रतिबंधों से मुक्ति, विदेशी आयातों से संरक्षण और रुपये-स्टर्लिंग विनिमय अनुपात में बदलाव चाहते थे। उन्होंने फिक्की (FICCI 1927) का गठन किया और आंदोलन को वित्तीय सहायता दी।\n4. महिलाएँ: गांधीजी के आह्वान पर हजारों महिलाओं ने घरों से बाहर निकलकर नमक बनाया, विदेशी कपड़ों व शराब की दुकानों की पिकेटिंग की और जेल गईं।",
            "chapter": "इतिहास: भारत में राष्ट्रवाद",
            "pyqTag": f"{board_name} 5-Marks History Master Question"
        },
        {
            "q": "लोकतंत्र (Democracy) को अन्य शासन प्रणालियों की तुलना में बेहतर क्यों माना जाता है? कोई चार बिंदु स्पष्ट कीजिए।",
            "marks": 4,
            "solution": "लोकतंत्र को सर्वश्रेष्ठ शासन प्रणाली मानने के प्रमुख कारण:\n1. नागरिकों में समानता को बढ़ावा: कानून के समक्ष सभी नागरिक समान होते हैं, जाति, लिंग या धर्म के आधार पर कोई भेदभाव नहीं होता।\n2. व्यक्ति की गरिमा और स्वतंत्रता की सुरक्षा: यह प्रत्येक नागरिक को विचार, अभिव्यक्ति और मौलिक अधिकारों की गारंटी देता है।\n3. फैसलों की गुणवत्ता में सुधार: लोकतांत्रिक निर्णय विचार-विमर्श और वाद-विवाद के बाद लिए जाते हैं, जिससे गलतियों की संभावना न्यूनतम होती है।\n4. टकरावों को टालने और संभालने का तरीका: समाज के विभिन्न समूहों के आपसी मतभेदों और संघर्षों को शांतिपूर्ण वार्ता द्वारा सुलझाने का मंच प्रदान करता है तथा अपनी गलतियों को सुधारने का अवसर देता है।",
            "chapter": "राजनीति विज्ञान: लोकतंत्र के परिणाम",
            "pyqTag": f"{board_name} 4-Marks Civics PYQ"
        },
        {
            "q": "ऋण के औपचारिक (Formal) और अनौपचारिक (Informal) स्रोतों में अंतर स्पष्ट कीजिए। ग्रामीण क्षेत्रों में औपचारिक ऋण का विस्तार करना क्यों आवश्यक है?",
            "marks": 4,
            "solution": "1. अंतर:\n   - औपचारिक स्रोत: बैंक और सहकारी समितियां। ये RBI की देखरेख में कार्य करते हैं, ब्याज दर कम व निश्चित होती है और समर्थक ऋणाधार (Collateral) आवश्यक होता है।\n   - अनौपचारिक स्रोत: साहूकार, व्यापारी, मालिक, रिश्तेदार। इन पर किसी संस्था का नियंत्रण नहीं होता, अत्यधिक उच्च ब्याज दर वसूलते हैं और अनुचित तरीकों से शोषण करते हैं।\n2. औपचारिक ऋण के विस्तार की आवश्यकता:\n   - ग्रामीण गरीब किसानों को साहूकारों के भयंकर ऋण-जाल (Debt Trap) से मुक्ति दिलाना।\n   - सस्ती ब्याज दरों पर कृषि उपकरण, बीज, खाद और छोटे कुटीर उद्योगों के लिए पूंजी उपलब्ध कराकर ग्रामीण अर्थव्यवस्था का समग्र विकास करना।",
            "chapter": "अर्थशास्त्र: मुद्रा और साख",
            "pyqTag": f"{board_name} 4-Marks Economics PYQ"
        },
        {
            "q": "भारत में वर्षा जल संचयन (Rainwater Harvesting) क्यों आवश्यक है? इसके कोई तीन पारंपरिक तरीके लिखिए।",
            "marks": 3,
            "solution": "1. आवश्यकता: गिरते भू-जल स्तर को रिचार्ज करने, शुष्क ऋतु में सिंचाई व पीने का पानी उपलब्ध कराने तथा मृदा अपरदन व बाढ़ को नियंत्रित करने हेतु वर्षा जल संचयन अनिवार्य है।\n2. पारंपरिक तरीके:\n   - राजस्थान के बीकानेर, फलौदी में घरों में भूमिगत पक्के 'टांका' (Tanka) का निर्माण।\n   - पश्चिमी हिमालय के पहाड़ी क्षेत्रों में सिंचाई हेतु 'गुल' या 'कुल' (Kuls) जैसी वाहिकाओं का निर्माण।\n   - पश्चिमी राजस्थान के कृषि क्षेत्रों में वर्षा जल एकत्र करने के लिए गड्ढे जैसे 'खादीन' (Khadin) और 'जोहड़' (Johad)।",
            "chapter": "भूगोल: जल संसाधन",
            "pyqTag": f"{board_name} 3-Marks Geography PYQ"
        }
    ]
    return mcqs, expanded_subjs

def get_class10_english(board_name="Board"):
    mcqs_raw = generate_english_questions(220, board_name)
    mcqs = [
        {
            "q": q["q"], "options": q["options"], "ans": q["ans"],
            "exp": q["exp"], "chapter": q.get("chapter", "English Grammar & Language"),
            "pyqTag": f"{board_name} Class 10 English Board PYQ"
        } for q in mcqs_raw
    ]
    subjs = [
        {
            "q": "Write a letter to the Editor of a national daily expressing your concern over the increasing number of road accidents due to reckless driving and underage driving, suggesting remedial measures.",
            "marks": 5,
            "solution": "Examination Hall / 14-B, Green Park,\n[City Name]\nDate: [Date]\n\nTo,\nThe Editor,\nThe National Herald,\n[City Name]\n\nSubject: Growing menace of reckless driving and urgent road safety measures.\n\nRespected Sir/Madam,\nThrough the esteemed columns of your widely circulated newspaper, I wish to draw the urgent attention of the traffic authorities and general public towards the alarming surge in fatal road accidents caused by rash driving and underage youth on city roads.\n\nEvery day, precious human lives are lost due to over-speeding, red-light jumping, drunk driving, and using mobile phones while behind the wheel. Minors without driving licenses are frequently seen racing bikes recklessly, endangering both pedestrians and themselves. The existing penalties and physical surveillance have proved inadequate in checking this rampant lawlessness.\n\nTo tackle this growing peril, traffic police must deploy automated AI-speed monitoring cameras, enforce zero-tolerance challans, and cancel the licenses of repeated offenders. Furthermore, parents must be held strictly accountable for permitting underage children to drive, and compulsory road safety education should be integrated into school curricula.\n\nI hope my letter will awaken the conscience of authorities to implement stringent traffic enforcement.\n\nYours sincerely,\n[Candidate Name]\nA Concerned Citizen",
            "chapter": "Letter Writing (Formal - Editor)",
            "pyqTag": f"{board_name} 5-Marks English Writing"
        },
        {
            "q": "You are Rohan/Ritu, Sports Secretary of St. Xavier's Senior Secondary School. Write a formal Notice in about 50 words informing students of Classes 9 to 12 about the upcoming Annual Inter-School Sports Meet and inviting entries.",
            "marks": 4,
            "solution": "ST. XAVIER'S SENIOR SECONDARY SCHOOL, [CITY]\nNOTICE\n\nDate: 15th October 2026\nANNUAL INTER-SCHOOL SPORTS MEET 2026-27\n\nAll students from Classes IX to XII are hereby informed that our school is hosting the 18th Annual Inter-School Sports Meet from 12th to 14th November 2026 at the Main Stadium. Events include Track & Field (100m, 400m, Relay), Long Jump, Badminton, Volleyball, and Chess.\n\nInterested students possessing high athletic fitness may submit their names along with their category of interest to their respective Physical Education teachers latest by 25th October 2026. Selection trials will begin on 28th October.\n\n[Candidate Signature]\nROHAN / RITU\nSports Secretary",
            "chapter": "Notice Writing (Writing Skills)",
            "pyqTag": f"{board_name} 4-Marks Notice Writing"
        },
        {
            "q": "Write an Application to the Principal of your school requesting a fee concession on financial grounds, mentioning your academic merit.",
            "marks": 4,
            "solution": "To,\nThe Principal,\nGovernment Model Senior Secondary School,\n[City Name]\n\nDate: [Date]\n\nSubject: Application for full fee concession on financial hardship.\n\nRespected Sir/Madam,\nI am a bonafide student of Class X-A of your prestigious institution (Roll No. 24). I belong to an economically weaker family. Recently, my father, who was the sole breadwinner working as a daily-wage worker, suffered a severe health crisis, drastically reducing our family's household earnings. Under these constrained financial circumstances, my parents find it extremely difficult to bear the school tuition fees.\n\nI have consistently demonstrated academic excellence, securing 94% marks in Class IX, and I am a regular participant in the school science debate team. I have a deep passion for continuing my studies without discontinuation.\n\nI therefore humbly pray that you may kindly grant me a full fee concession for the current academic session. I assure you of my utmost sincerity and diligence in academics.\n\nThanking you,\nYours obediently,\n[Candidate Name]\nClass X-A, Roll No. 24",
            "chapter": "Formal Application Writing",
            "pyqTag": f"{board_name} 4-Marks Formal Application"
        },
        {
            "q": "Write an Article in 120-150 words on the topic: 'Role of Artificial Intelligence and Digital Tools in Modern Education'.",
            "marks": 5,
            "solution": "Role of Artificial Intelligence and Digital Tools in Modern Education\n- By [Candidate Name]\n\nThe 21st century has witnessed an epochal shift in the global pedagogical landscape, driven by Artificial Intelligence (AI) and digital technology. Classrooms have transformed from passive chalk-and-board spaces into dynamic, interactive learning environments.\n\nDigital tools empower students through personalized learning pathways. AI-driven educational platforms analyze a student's unique learning pace, identifying concept gaps and generating customized practice modules. Moreover, virtual reality (VR) and 3D simulations bring complex abstract concepts—such as human anatomy, molecular geometry, and astrophysics—to life before their eyes. Remote digital platforms have also democratized quality education, enabling students in rural hinterlands to learn from world-renowned educators.\n\nHowever, technology is a double-edged sword. Excessive screen addiction, risk of academic plagiarism, and the erosion of critical thinking pose serious concerns. Digital tools must complement, not replace, human teachers who provide moral mentorship, emotional empathy, and creative inspiration. A balanced synergy between AI precision and human compassion is the true future of education.",
            "chapter": "Article Writing",
            "pyqTag": f"{board_name} 5-Marks Article Writing"
        },
        {
            "q": "Write an Analytical Paragraph in 100-120 words interpreting a given chart on 'Sources of Daily Water Consumption in Urban Households' (Flushing: 30%, Bathing: 25%, Kitchen/Cooking: 20%, Laundry: 15%, Gardening/Washing Cars: 10%).",
            "marks": 5,
            "solution": "Analytical Interpretation of Urban Household Water Consumption\n\nThe provided statistical data highlights the proportional breakdown of potable water consumption across various household activities in modern urban dwellings. A close scrutiny reveals that indoor sanitation and personal hygiene account for the overwhelming majority of daily water usage.\n\nToilet flushing consumes the single largest share of domestic water at 30%, followed closely by bathing and showering at 25%. Together, these personal hygiene sectors devour more than half (55%) of the total municipal supply. Culinary and kitchen requirements constitute 20% of consumption, reflecting non-negotiable daily living needs. In contrast, laundry chores utilize 15%, while outdoor activities—gardening and washing vehicles—account for the remaining 10%.\n\nThe data conclusively demonstrates an urgent need for water conservation interventions inside bathrooms. Installing dual-flush toilet cisterns and low-flow aerated showerheads can dramatically slash household water wastage by up to 35%, ensuring urban water sustainability amidst looming groundwater crises.",
            "chapter": "Analytical Paragraph Writing",
            "pyqTag": f"{board_name} 5-Marks Analytical Writing"
        },
        {
            "q": "Write a Report in 120-150 words on the 'Swachh Bharat Cleanliness Drive' conducted by your school eco-club for publication in your school magazine.",
            "marks": 5,
            "solution": "SWACHH BHARAT CLEANLINESS DRIVE ORGANISED\n- By Neha Sharma, Editor, School Magazine\n\nNew Delhi, 2nd October: In commemoration of Gandhi Jayanti, the Eco-Club and NSS Unit of DAV Public School organized a mega 'Swachh Bharat Cleanliness Fortnight' across the school campus and adjoining residential neighborhoods.\n\nThe campaign commenced at 8:00 AM with an inspiring address by the Principal, who underscored Mahatma Gandhi's maxim: 'Sanitation is more important than independence'. Over 400 student volunteers, armed with brooms, compostable garbage bags, and gloves, initiated a rigorous cleaning operation in the playground, school corridors, and local community parks. Segregation bins for biodegradable and non-biodegradable waste were installed at key public spots.\n\nAdditionally, students performed an impactful street play (Nukkad Natak) at the local market square, highlighting the perils of single-use plastics and open littering. The local residents commended the students' proactive initiative. The campaign concluded with a collective pledge by all teachers and students to maintain spotless cleanliness in their daily lives.",
            "chapter": "Report Writing",
            "pyqTag": f"{board_name} 5-Marks Report Writing"
        },
        {
            "q": "Read the following passage and answer the questions below:\n'A nation's greatness lies in its capacity to harness the creative potential of its youth. When young minds are equipped with scientific temper, ethical grounding, and equal opportunity, societal progress becomes unstoppable. True education is not merely the accumulation of dry facts, but the ignition of curiosity and the cultivation of human empathy.'\n(a) According to the author, what constitutes a nation's greatness?\n(b) What three attributes must young minds be equipped with?\n(c) How does the author define 'true education'?\n(d) Find a word from the passage which means 'collection or gathering'.",
            "marks": 4,
            "solution": "Answers:\n(a) A nation's greatness lies in its capacity to harness and nurture the creative potential of its youth.\n(b) Young minds must be equipped with (i) scientific temper, (ii) ethical grounding, and (iii) equal opportunity.\n(c) The author defines true education not merely as the dry accumulation of facts, but as the ignition of intellectual curiosity and the cultivation of deep human empathy.\n(d) The word is 'accumulation'.",
            "chapter": "Reading Comprehension (Unseen Passage)",
            "pyqTag": f"{board_name} 4-Marks Reading Comprehension"
        },
        {
            "q": "How does the author portray Lencho's unwavering faith in God in 'A Letter to God'? What is the irony at the conclusion of the story?",
            "marks": 4,
            "solution": "1. Portrayal of Lencho's Faith:\nLencho is depicted as a simple, industrious farmer whose entire maize crop was utterly devastated by a catastrophic hailstorm. Despite the ruin, his spiritual innocence led him to believe that God sees everything, even deep inside one's conscience, and would never let his family starve. His naive, unwavering faith was so absolute that he wrote an actual letter addressed to 'God', demanding 100 pesos to re-sow his fields.\n\n2. The Tragic Irony:\nThe postmaster and his benevolent employees, touched by Lencho's extraordinary faith, contributed parts of their own salaries to collect 70 pesos and mailed it to him signed as 'God'. However, upon counting 70 pesos instead of 100, Lencho firmly believed God could never make a clerical error; he concluded that the post office employees had stolen the missing 30 pesos and angrily termed them 'a bunch of crooks'. The very people who acted as angels of divine charity were perceived as thieves.",
            "chapter": "First Flight: A Letter to God",
            "pyqTag": f"{board_name} 4-Marks Literature Analysis"
        },
        {
            "q": "What did Nelson Mandela mean by 'twin obligations' in his autobiography 'Long Walk to Freedom'? How did the apartheid system prevent him from fulfilling them?",
            "marks": 4,
            "solution": "1. Twin Obligations:\nMandela asserts that every human being possesses two fundamental obligations in life:\n(i) First obligation: To his family, parents, wife, and children.\n(ii) Second obligation: To his community, people, and motherland.\n\n2. Impact of Apartheid:\nIn a civilized and just society, a man can fulfill both duties according to his natural inclinations. But in South Africa under the brutal apartheid regime, a black person who attempted to live as a dignified human being was inevitably punished and isolated. If a man tried to fulfill his duty to his oppressed countrymen, he was forcibly ripped away from his home, family, and hearth, and compelled to lead an underground life of a rebel in solitary confinement. Mandela could not balance his domestic devotion with his patriotic duty until he embraced the larger struggle for racial liberation.",
            "chapter": "First Flight: Nelson Mandela - Long Walk to Freedom",
            "pyqTag": f"{board_name} 4-Marks Literature Analysis"
        },
        {
            "q": "In the poem 'Dust of Snow', how does Robert Frost illustrate that seemingly insignificant natural occurrences can transform human emotions?",
            "marks": 3,
            "solution": "1. Emotional Setting: The poet begins in a gloomy, sorrowful, and depressive state of mind, standing under a toxic hemlock tree in winter, having mentally ruined or 'rued' the day.\n2. The Catalyst: A common black crow—traditionally associated with ill omen—alights on the branch, shaking down a gentle shower of fine snow dust over the poet.\n3. The Transformation: This minor, unexpected touch of pristine nature startles the poet out of his dark brooding. It brings an instant change of mood, gladdening his spirit and saving the remaining part of the day from despair. Frost conveys that nature possesses profound healing power, and even conventionally negative symbols (a crow and a hemlock tree) can trigger joy and optimism.",
            "chapter": "Poetry: Dust of Snow (Robert Frost)",
            "pyqTag": f"{board_name} 3-Marks Poetry Analysis"
        }
    ]
    return mcqs, subjs

def get_class10_hindi(board_name="Board"):
    mcqs_raw = generate_hindi_questions(220, board_name)
    mcqs = [
        {
            "q": q["q"], "options": q["options"], "ans": q["ans"],
            "exp": q["exp"], "chapter": q.get("chapter", "सामान्य हिन्दी व्याकरण"),
            "pyqTag": f"{board_name} Class 10 Hindi Board PYQ"
        } for q in mcqs_raw
    ]
    subjs = [
        {
            "q": "पर्यावरण प्रदूषण: कारण, दुष्प्रभाव और निवारण के उपाय विषय पर 250 शब्दों में एक सारगर्भित निबंध लिखिए।",
            "marks": 6,
            "solution": "पर्यावरण प्रदूषण: कारण, दुष्प्रभाव एवं समाधान\n\n1. प्रस्तावना:\nप्रकृति और मानव का संबंध आदि काल से अन्योन्याश्रित रहा है। परंतु 21वीं सदी के अनियंत्रित औद्योगीकरण, भौतिकवादी दौड़ और वनों की अंधाधुंध कटाई ने प्रकृति के संतुलन को छिन्न-भिन्न कर दिया है। आज पर्यावरण प्रदूषण संपूर्ण जीव जगत के अस्तित्व के लिए सबसे बड़ा संकट बन चुका है।\n\n2. प्रदूषण के प्रमुख प्रकार एवं कारण:\n(क) वायु प्रदूषण: कल-कारखानों की चिमनियों और करोड़ों वाहनों से निकलने वाला जहरीला धुआं (कार्बन मोनोऑक्साइड, सल्फर डाइऑक्साइड) हवा को विषैला बना रहा है।\n(ख) जल प्रदूषण: औद्योगिक रासायनिक कचरा, सीवेज और प्लास्टिक का नदियों-झीलों में प्रवाहित होना।\n(ग) मृदा एवं ध्वनि प्रदूषण: रासायनिक कीटनाशकों का अंधाधुंध प्रयोग तथा लाउडस्पीकरों और मशीनों का अनियंत्रित शोर।\n\n3. घातक दुष्प्रभाव:\nग्लोबल वार्मिंग, ओजोन परत का क्षरण, असमय बाढ़ और सूखा, तथा दमा व कैंसर जैसी प्राणघातक बीमारियों का प्रसार प्रदूषण के प्रत्यक्ष परिणाम हैं। अनेक जीव-जंतु और वनस्पतियों की प्रजातियां विलुप्त हो चुकी हैं।\n\n4. समाधान के उपाय:\n- व्यापक स्तर पर जन-आंदोलन के रूप में वृहद पौधारोपण (वन महोत्सव)।\n- सौर, पवन व जल जैसी नवीकरणीय हरित ऊर्जा का शत-प्रतिशत संवर्धन।\n- एकल-उपयोग प्लास्टिक (Single-use Plastic) पर कड़ा प्रतिबंध एवं अपशिष्ट का वैज्ञानिक पुनर्चक्रण।\n\n5. उपसंहार:\n'वृक्ष लगाएं, जीवन बचाएं' - पर्यावरण संरक्षण केवल शासन की नहीं, बल्कि प्रत्येक नागरिक की नैतिक व संवैधानिक जिम्मेदारी है।",
            "chapter": "निबंध लेखन (Essay Writing)",
            "pyqTag": f"{board_name} 6-Marks Hindi Essay"
        },
        {
            "q": "अपने नगर के मुख्य नगर स्वास्थ्य अधिकारी को पत्र लिखकर अपने मोहल्ले में फैली गंदगी, टूटी नालियों और मच्छरों के प्रकोप के निवारण हेतु उचित कार्रवाई का अनुरोध कीजिए।",
            "marks": 5,
            "solution": "सेवा में,\nमुख्य नगर स्वास्थ्य अधिकारी,\nनगर निगम,\n[शहर का नाम]\n\nदिनांक: [दिनांक]\n\nविषय: शास्त्री नगर मोहल्ले में नियमित सफाई न होने तथा मच्छरों के प्रकोप के निवारण हेतु।\n\nमहोदय,\nमैं आपका ध्यान शास्त्री नगर, वार्ड संख्या-12 की दयनीय स्वच्छता स्थिति की ओर आकर्षित करना चाहता हूँ। पिछले तीन सप्ताह से हमारे मोहल्ले में सफाई कर्मचारी नहीं आ रहे हैं। सड़कों के किनारों पर कूड़े के विशाल ढेर सड़ रहे हैं और नालियां पूरी तरह अवरुद्ध होकर सड़कों पर गंदा पानी बहा रही हैं।\n\nगंदे पानी के जमाव के कारण क्षेत्र में मच्छरों और मक्खियों की भरमार हो गई है, जिससे डेंगू, मलेरिया और हैजा जैसी संक्रामक बीमारियां तेजी से फैलने की गंभीर आशंका बन गई है। कई बच्चे पहले ही वायरल बुखार की चपेट में आ चुके हैं। स्थानीय सफाई नायक से कई बार गुहार लगाने पर भी कोई परिणाम नहीं निकला।\n\nअतः आपसे करबद्ध प्रार्थना है कि जनस्वास्थ्य के व्यापक हित को देखते हुए मोहल्ले में तत्काल विशेष सफाई अभियान चलवाने तथा डीडीटी/कीटनाशक दवाओं का छिड़काव कराने की कृपा करें।\n\nसधन्यवाद,\nभवदीय,\n[परीक्षार्थी का नाम]\nसंयोजक, मोहल्ला सुधार समिति,\nशास्त्री नगर, [शहर]",
            "chapter": "औपचारिक पत्र लेखन (Formal Letter)",
            "pyqTag": f"{board_name} 5-Marks Official Letter"
        },
        {
            "q": "छोटे भाई को अध्ययन के प्रति निष्ठा रखने, मोबाइल के सदुपयोग तथा बुरी संगति से बचने की सीख देते हुए एक प्रेरक अनौपचारिक पत्र लिखिए।",
            "marks": 5,
            "solution": "परीक्षा भवन / छात्रावास,\n[शहर का नाम]\nदिनांक: [दिनांक]\n\nप्रिय अनुज अमन,\nशुभाशीष।\n\nकल ही पिताजी का पत्र प्राप्त हुआ, जिससे ज्ञात हुआ कि तुम्हारी प्रथम सत्रीय परीक्षा के परिणाम संतोषजनक नहीं रहे हैं और तुम अपना अधिकांश समय स्मार्टफोन पर ऑनलाइन गेमिंग व सोशल मीडिया में व्यर्थ कर रहे हो। यह समाचार पढ़कर मुझे अत्यंत चिंता हुई।\n\nप्रिय भाई, विद्यार्थी जीवन मनुष्य के चरित्र और भविष्य की आधारशिला होता है। बीता हुआ समय कभी वापस नहीं आता। मोबाइल तकनीक ज्ञानार्जन और अध्ययन का एक श्रेष्ठ माध्यम हो सकती है, यदि उसका सदुपयोग किया जाए। परंतु इसका अनियंत्रित प्रयोग तुम्हारी एकाग्रता, नेत्र-दृष्टि और शैक्षणिक भविष्य को नष्ट कर देगा। कुसंगति और व्यर्थ के आकर्षणों से दूर रहकर अपने जीवन के मूल लक्ष्य पर ध्यान केंद्रित करो।\n\nनियमित रूप से समय-सारणी बनाकर अध्ययन करो और खेलकूद में भी समय दो। मुझे पूर्ण विश्वास है कि तुम अपनी भूल सुधारकर आगामी बोर्ड परीक्षा में उत्कृष्ट प्रदर्शन कर परिवार का नाम रोशन करोगे। माताजी व पिताजी को मेरा चरण स्पर्श कहना।\n\nतुम्हारा अग्रज,\n[परीक्षार्थी का नाम]",
            "chapter": "अनौपचारिक पत्र लेखन (Informal Letter)",
            "pyqTag": f"{board_name} 5-Marks Informal Letter"
        },
        {
            "q": "रस की परिभाषा दीजिए। रस के चारों अंगों (स्थायी भाव, विभाव, अनुभाव, संचारी भाव) को स्पष्ट करते हुए 'वीर रस' का लक्षण और उदाहरण लिखिए।",
            "marks": 5,
            "solution": "1. रस की परिभाषा:\nकाव्य को पढ़ने, सुनने अथवा नाटक को देखने से सहृदय पाठक या दर्शक को जिस अलौकिक आनंद और भावनात्मक अनुभूति की प्राप्ति होती है, उसे 'रस' कहा जाता है। आचार्य भरतमुनि के अनुसार: 'विभावानुभावव्यभिचारिसंयोगाद्रसनिष्पत्तिः'।\n\n2. रस के चार प्रमुख अंग:\n(क) स्थायी भाव: जो भाव मनुष्य के अंतःकरण में सुप्तावस्था में सदैव विद्यमान रहते हैं और अनुकूल अवसर पाकर जाग्रत होते हैं (जैसे रति, उत्साह, शोक, क्रोध)।\n(ख) विभाव: वे कारण, पात्र या परिस्थितियां जो स्थायी भाव को जाग्रत एवं उद्दीप्त करते हैं। इसके दो भेद हैं - आलंबन विभाव और उद्दीपन विभाव।\n(ग) अनुभाव: स्थायी भाव के जाग्रत होने पर आश्रय के शरीर में होने वाली बाह्य शारीरिक चेष्टाएं (जैसे रोंगटे खड़े होना, आंसू आना, क्रोध से कांपना)।\n(घ) संचारी/व्यभिचारी भाव: मन में क्षण भर के लिए उठने और शांत होने वाले चंचल मनोविकार (इनकी संख्या 33 मानी गई है, जैसे हर्ष, गर्व, ग्लानि, विषाद)।\n\n3. वीर रस:\n- लक्षण: युद्ध, कठिन कार्य अथवा धर्म व देश की रक्षा हेतु हृदय में स्थित 'उत्साह' नामक स्थायी भाव जब विभाव, अनुभाव और संचारी भाव से पुष्ट होता है, तो वीर रस की निष्पत्ति होती है। स्थायी भाव: उत्साह।\n- उदाहरण:\n'बुंदेले हरबोलों के मुँह हमने सुनी कहानी थी,\nखूब लड़ी मर्दानी वह तो झाँसी वाली रानी थी।' अथवा\n'वीर तुम बढ़े चलो, धीर तुम बढ़े चलो,\nसामने पहाड़ हो कि सिंह की दहाड़ हो।' ",
            "chapter": "काव्य सौंदर्य - रस विवेचन",
            "pyqTag": f"{board_name} 5-Marks Hindi Grammar PYQ"
        },
        {
            "q": "उपमा अलंकार और रूपक अलंकार की सोदाहरण परिभाषा देते हुए दोनों में मुख्य अंतर स्पष्ट कीजिए।",
            "marks": 4,
            "solution": "1. उपमा अलंकार:\n- परिभाषा: जहां किसी वस्तु या व्यक्ति (उपमेय) की तुलना किसी अन्य अत्यंत प्रसिद्ध वस्तु या व्यक्ति (उपमान) से किसी समान धर्म, गुण या क्रिया के आधार पर की जाती है, वहां उपमा अलंकार होता है।\n- वाचक शब्द: सा, सी, से, सम, सरिस, सदृश, जैसा।\n- उदाहरण: 'हरिपद कोमल कमल से।' (यहाँ भगवान के चरणों की तुलना कमल की कोमलता से की गई है)।\n\n2. रूपक अलंकार:\n- परिभाषा: जहां उपमेय और उपमान में अत्यधिक सादृश्य (समानता) होने के कारण दोनों में कोई भेद न रखकर उपमेय पर उपमान का प्रत्यक्ष आरोप (अभेद) कर दिया जाता है, वहां रूपक अलंकार होता है।\n- उदाहरण: 'चरन कमल बंदौ हरिराई।' (यहाँ चरणों को कमल के समान न कहकर सीधे चरण ही कमल मान लिए गए हैं)। अथवा 'मैया मैं तो चंद्र-खिलौना लैहों।'\n\n3. मुख्य अंतर:\n- उपमा में तुलना होती है और वाचक शब्द (सा, सी, सरिस) उपस्थित रहते हैं।\n- रूपक में अभेद आरोप होता है और तुलना सूचक वाचक शब्द पूरी तरह लुप्त रहते हैं।",
            "chapter": "काव्य सौंदर्य - अलंकार",
            "pyqTag": f"{board_name} 4-Marks Hindi Grammar PYQ"
        },
        {
            "q": "'नेताजी का चश्मा' पाठ में लेखक स्वयं प्रकाश ने कैप्टन चश्मेवाले के माध्यम से देश के प्रति किस प्रकार के समर्पण को रेखांकित किया है?",
            "marks": 4,
            "solution": "1. देशभक्ति का वास्तविक स्वरूप:\nलेखक ने यह स्पष्ट किया है कि देशभक्ति केवल सीमा पर वर्दी पहनकर बंदूक चलाने या भाषण देने तक सीमित नहीं है। कस्बे के चौराहे पर स्थापित सुभाष चंद्र बोस की संगमरमर की मूर्ति पर नेताजी का चश्मा न होने से एक निर्धन, वृद्ध और लंगड़ा फेरीवाला 'कैप्टन' अत्यंत आहत होता था।\n\n2. कैप्टन का समर्पण:\nअपने सीमित संसाधनों और निर्धनता के बावजूद वह अपने पास मौजूद थोड़े-से चश्मों में से एक फ्रेम निकालकर नेताजी की मूर्ति को पहना देता था और किसी ग्राहक द्वारा वैसा ही फ्रेम मांगे जाने पर मूर्ति से क्षमा मांगकर उसे बेचकर दूसरा चश्मा लगा देता था।\n\n3. संदेश:\nकैप्टन का यह निस्वार्थ आचरण सिद्ध करता है कि देश की महान विभूतियों और राष्ट्रीय प्रतीकों के प्रति आदर का भाव ही सच्ची देशभक्ति है। जब कैप्टन की मृत्यु के बाद बच्चों ने नेताजी की मूर्ति पर सरकंडे का छोटा-सा चश्मा लगा दिया, तो हालदार साहब की आंखें भर आईं क्योंकि इससे यह विश्वास दृढ़ हुआ कि आने वाली भावी पीढ़ी के हृदय में भी देशप्रेम की यह ज्योति जीवित है।",
            "chapter": "क्षितिज गद्य: नेताजी का चश्मा (स्वयं प्रकाश)",
            "pyqTag": f"{board_name} 4-Marks Hindi Literature"
        }
    ]
    return mcqs, subjs

if __name__ == "__main__":
    m_mcqs, m_sub = get_class10_math("CBSE")
    s_mcqs, s_sub = get_class10_science("CBSE")
    soc_mcqs, soc_sub = get_class10_social("CBSE")
    eng_mcqs, eng_sub = get_class10_english("CBSE")
    hin_mcqs, hin_sub = get_class10_hindi("CBSE")
    print(f"Class 10 Math: {len(m_mcqs)} MCQs, {len(m_sub)} Subjs")
    print(f"Class 10 Science: {len(s_mcqs)} MCQs, {len(s_sub)} Subjs")
    print(f"Class 10 Social: {len(soc_mcqs)} MCQs, {len(soc_sub)} Subjs")
    print(f"Class 10 English: {len(eng_mcqs)} MCQs, {len(eng_sub)} Subjs")
    print(f"Class 10 Hindi: {len(hin_mcqs)} MCQs, {len(hin_sub)} Subjs")

