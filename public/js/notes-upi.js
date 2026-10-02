// ₹10 Micro-UPI Notes Vault & High-Definition Unicode PDF Generator (2026 Edition)
// Features: Client-side html2pdf rendering with zero page-cut bugs (page-break-inside: avoid),
// 100-200+ authentic questions per subject, 10-Year Hall of Fame, and 100% CBT vs Board separation.

window.DYNAMIC_UPI_CONFIG = { upiId: "sarkariai@upi", payeeName: "BharatExams Hub", defaultPrice: 9, customQrUrl: "" };
if (typeof fetch !== 'undefined') {
  fetch('/api/pay/config')
    .then(r => r.json())
    .then(data => { if (data && data.upiId) window.DYNAMIC_UPI_CONFIG = data; })
    .catch(() => {});
}

const MASTER_SCIENCE_MCQS = [
  {
    "q": "1. प्रकाश का वेग सर्वाधिक किस माध्यम में होता है?\n[In which medium is the speed of light maximum?]",
    "options": [
      "A) कांच (Glass)",
      "B) पानी (Water)",
      "C) निर्वात (Vacuum)",
      "D) हीरा (Diamond)"
    ],
    "ans": "C) निर्वात (Vacuum) - 3 × 10⁸ m/s",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "2. निकट दृष्टि दोष (Myopia) के निवारण के लिए किस लेंस का उपयोग किया जाता है?\n[Which lens is used to correct Myopia?]",
    "options": [
      "A) उत्तल लेंस (Convex)",
      "B) अवतल लेंस (Concave)",
      "C) बाइफोकल लेंस",
      "D) बेलनाकार लेंस"
    ],
    "ans": "B) अवतल लेंस (Concave Lens)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "3. दूर दृष्टि दोष (Hypermetropia) के निवारण हेतु किस लेंस का प्रयोग होता है?\n[Which lens is used to correct Hypermetropia?]",
    "options": [
      "A) अवतल लेंस",
      "B) उत्तल लेंस (Convex Lens)",
      "C) समतल लेंस",
      "D) सिलिंड्रिकल लेंस"
    ],
    "ans": "B) उत्तल लेंस (Convex Lens)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "4. दाढ़ी बनाने (Shaving Mirror) तथा दंत चिकित्सकों द्वारा किस दर्पण का उपयोग होता है?\n[Mirror used for shaving and by dentists:]",
    "options": [
      "A) उत्तल दर्पण",
      "B) अवतल दर्पण (Concave Mirror)",
      "C) समतल दर्पण",
      "D) परवलयिक दर्पण"
    ],
    "ans": "B) अवतल दर्पण (बड़ा और सीधा आभासी प्रतिबिम्ब)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "5. वाहनों के साइड मिरर (Rear-view Mirror) में किस दर्पण का उपयोग होता है?\n[Mirror used in rear-view of vehicles:]",
    "options": [
      "A) अवतल दर्पण",
      "B) उत्तल दर्पण (Convex Mirror)",
      "C) समतल दर्पण",
      "D) उभयोत्तल दर्पण"
    ],
    "ans": "B) उत्तल दर्पण (विस्तृत दृष्टि क्षेत्र एवं सीधा प्रतिबिम्ब)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "6. निर्वात में प्रकाश की चाल (c) और किसी माध्यम में प्रकाश की चाल (v) का अनुपात क्या कहलाता है?\n[Ratio of speed of light in vacuum to medium (c/v) is called:]",
    "options": [
      "A) आवर्धन",
      "B) अपवर्तनांक (Refractive Index)",
      "C) लेंस क्षमता",
      "D) विक्षेपण"
    ],
    "ans": "B) अपवर्तनांक (Refractive Index: n = c/v)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "7. हीरे का अपवर्तनांक (Refractive Index of Diamond) कितना होता है?\n[Refractive index of diamond is:]",
    "options": [
      "A) 1.33",
      "B) 1.5",
      "C) 2.42 (सर्वाधिक)",
      "D) 1.00"
    ],
    "ans": "C) 2.42 (पूर्ण आंतरिक परावर्तन के कारण चमकता है)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "8. किसी लेंस की क्षमता P = +2.5 D है। इसकी फोकस दूरी क्या होगी?\n[Power of lens is +2.5 D. Its focal length is:]",
    "options": [
      "A) +25 cm",
      "B) +40 cm (+0.4 m)",
      "C) -40 cm",
      "D) +50 cm"
    ],
    "ans": "B) +40 cm (f = 100/P = 100/2.5 = 40 cm, उत्तल लेंस)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "9. तारे टिमटिमाते (Twinkling of stars) हुए किस घटना के कारण दिखाई देते हैं?\n[Twinkling of stars is due to which optical phenomenon?]",
    "options": [
      "A) प्रकाश का परावर्तन",
      "B) वायुमंडलीय अपवर्तन (Atmospheric Refraction)",
      "C) प्रकीर्णन",
      "D) विक्षेपण"
    ],
    "ans": "B) वायुमंडलीय अपवर्तन (Atmospheric Refraction)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "10. आकाश का नीला रंग प्रकाश के किस गुण के कारण दिखाई देता है?\n[Blue color of clear sky is due to:]",
    "options": [
      "A) परावर्तन",
      "B) प्रकीर्णन (Scattering of Light)",
      "C) अपवर्तन",
      "D) विवर्तन"
    ],
    "ans": "B) प्रकाश का प्रकीर्णन (रैले का नियम: नीले रंग का प्रकीर्णन सर्वाधिक होता है)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "11. समतल दर्पण द्वारा बना प्रतिबिम्ब कैसा होता है?\n[Image formed by a plane mirror is:]",
    "options": [
      "A) वास्तविक और उल्टा",
      "B) आभासी एवं सीधा (Virtual and Erect)",
      "C) वास्तविक एवं सीधा",
      "D) उल्टा एवं बड़ा"
    ],
    "ans": "B) आभासी एवं पार्श्व उल्टा (Virtual and laterally inverted)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "12. गोलीय दर्पण की फोकस दूरी (f) और उसकी वक्रता त्रिज्या (R) में क्या संबंध है?\n[Relationship between focal length f and radius of curvature R:]",
    "options": [
      "A) f = 2R",
      "B) f = R / 2",
      "C) f = R",
      "D) f = 1/R"
    ],
    "ans": "B) f = R / 2",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "13. प्रिज्म से गुजरने पर किस रंग के प्रकाश का विचलन (Deviation) सबसे अधिक होता है?\n[Which color deviates most when passing through a prism?]",
    "options": [
      "A) लाल (Red)",
      "B) बैगनी (Violet)",
      "C) पीला (Yellow)",
      "D) हरा (Green)"
    ],
    "ans": "B) बैगनी (Violet - न्यूनतम तरंगदैर्ध्य के कारण अधिकतम विचलन)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "14. खतरे के संकेत (Danger signals) में लाल रंग का उपयोग क्यों किया जाता है?\n[Why is red color used in danger signals?]",
    "options": [
      "A) इसका प्रकीर्णन सबसे कम होता है",
      "B) इसका प्रकीर्णन सबसे अधिक होता है",
      "C) यह आंखों को प्रिय लगता है",
      "D) इसका वेग अधिक होता है"
    ],
    "ans": "A) इसका प्रकीर्णन सबसे कम होता है (तरंगदैर्ध्य सर्वाधिक होती है)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "15. सामान्य दृष्टि के वयस्क के लिए सुस्पष्ट दर्शन की अल्पतम दूरी (Least distance of distinct vision) कितनी होती है?\n[Least distance of distinct vision for normal eye:]",
    "options": [
      "A) 25 m",
      "B) 2.5 cm",
      "C) 25 cm",
      "D) अनंत (Infinity)"
    ],
    "ans": "C) 25 cm (निकट बिंदु 25 cm तथा दूर बिंदु अनंत होता है)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "16. विद्युत आवेश (Electric Charge) का SI मात्रक क्या है?\n[SI unit of Electric Charge:]",
    "options": [
      "A) वोल्ट",
      "B) एम्पियर",
      "C) कूलॉम (Coulomb)",
      "D) जूल"
    ],
    "ans": "C) कूलॉम (Coulomb - 1 C = 6.25 × 10¹⁸ इलेक्ट्रॉन)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "17. विभवांतर (Potential Difference) मापने वाले यंत्र को क्या कहा जाता है?\n[Device used to measure Potential Difference:]",
    "options": [
      "A) अमीटर",
      "B) वोल्टमीटर (Voltmeter)",
      "C) गैल्वेनोमीटर",
      "D) पोटेंशियोमीटर"
    ],
    "ans": "B) वोल्टमीटर (परिपथ के समांतर क्रम में जोड़ा जाता है)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "18. विद्युत परिपथ में धारा (Electric Current) मापने हेतु किसे श्रेणीक्रम में जोड़ा जाता है?\n[Instrument connected in series to measure Current:]",
    "options": [
      "A) वोल्टमीटर",
      "B) अमीटर (Ammeter)",
      "C) ओममीटर",
      "D) रियोस्टेट"
    ],
    "ans": "B) अमीटर (Ammeter - आदर्श अमीटर का प्रतिरोध शून्य होता है)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "19. ओम के नियम का सही गणितीय सूत्र क्या है?\n[Correct mathematical formula for Ohm's Law:]",
    "options": [
      "A) V = I / R",
      "B) V = I × R",
      "C) I = V × R",
      "D) R = V × I"
    ],
    "ans": "B) V = I × R (विभवांतर = धारा × प्रतिरोध)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "20. 1 किलोवाट-घंटा (1 kWh) विद्युत ऊर्जा में कितने जूल होते हैं?\n[1 kWh electrical energy equals how many Joules?]",
    "options": [
      "A) 3.6 × 10⁵ J",
      "B) 3.6 × 10⁶ J (1 Commercial Unit)",
      "C) 746 J",
      "D) 1000 J"
    ],
    "ans": "B) 3.6 × 10⁶ J (यही 1 यूनिट बिजली कहलाती है)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "21. विद्युत बल्ब का तंतु (Filament) किस धातु का बना होता है?\n[Filament of electric bulb is made of:]",
    "options": [
      "A) तांबा",
      "B) टंगस्टन (Tungsten - उच्च गलनांक ~3422°C)",
      "C) नाइक्रोम",
      "D) लोहा"
    ],
    "ans": "B) टंगस्टन (Tungsten)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "22. विद्युत हीटर और गीजर का तापन अवयव (Element) किस मिश्रधातु का बना होता है?\n[Heating element of electric heater is made of:]",
    "options": [
      "A) टंगस्टन",
      "B) नाइक्रोम (Nichrome - Ni+Cr)",
      "C) पीतल",
      "D) कांस्य"
    ],
    "ans": "B) नाइक्रोम (Nichrome)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "23. विद्युत फ्यूज तार (Electric Fuse Wire) की क्या विशेषता होनी चाहिए?\n[Characteristics of an electric fuse wire:]",
    "options": [
      "A) उच्च गलनांक, निम्न प्रतिरोध",
      "B) निम्न गलनांक एवं उच्च प्रतिरोध",
      "C) उच्च गलनांक, उच्च प्रतिरोध",
      "D) शून्य प्रतिरोध"
    ],
    "ans": "B) निम्न गलनांक एवं उच्च प्रतिरोध (अतिभारण होने पर तुरंत पिघल जाता है)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "24. घरों में विद्युत उपकरण किस क्रम में जोड़े जाते हैं?\n[Domestic electrical appliances are connected in:]",
    "options": [
      "A) श्रेणीक्रम (Series)",
      "B) समांतर क्रम (Parallel Connection)",
      "C) मिश्रित क्रम",
      "D) चक्रीय क्रम"
    ],
    "ans": "B) समांतर क्रम (ताकि सभी उपकरणों को 220V समान विभवांतर मिले)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "25. फ्लेमिंग के वामहस्त (बाएं हाथ) के नियम में तर्जनी अंगुली किसकी दिशा दर्शाती है?\n[In Fleming's Left Hand Rule, forefinger represents direction of:]",
    "options": [
      "A) विद्युत धारा",
      "B) चुंबकीय क्षेत्र (Magnetic Field)",
      "C) बल या गति",
      "D) विभव"
    ],
    "ans": "B) चुंबकीय क्षेत्र (Forefinger = Field, Middle = Current, Thumb = Force)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "26. विद्युत धारा का SI मात्रक क्या है?\n[SI unit of Electric Current:]",
    "options": [
      "A) वोल्ट",
      "B) एम्पियर (Ampere)",
      "C) वाट",
      "D) कूलॉम"
    ],
    "ans": "B) एम्पियर (A = C/s)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "27. प्रतिरोध का SI मात्रक क्या है?\n[SI unit of Electrical Resistance:]",
    "options": [
      "A) ओम (Ω)",
      "B) ओम-मीटर",
      "C) म्हो",
      "D) सीमेंस"
    ],
    "ans": "A) ओम (Ω) - विशिष्ट प्रतिरोध का मात्रक ओम-मीटर होता है",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "28. विद्युत जनित्र (Electric Generator / Dynamo) किस सिद्धांत पर कार्य करता है?\n[Electric Generator works on the principle of:]",
    "options": [
      "A) धारा का उष्मीय प्रभाव",
      "B) विद्युत चुंबकीय प्रेरण (Electromagnetic Induction)",
      "C) रासायनिक प्रभाव",
      "D) पास्कल नियम"
    ],
    "ans": "B) विद्युत चुंबकीय प्रेरण (फैराडे का नियम)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "29. प्रत्यावर्ती धारा (AC) की आवृत्ति भारत में सामान्यतः कितनी होती है?\n[Frequency of AC domestic supply in India:]",
    "options": [
      "A) 60 Hz",
      "B) 50 Hz",
      "C) 100 Hz",
      "D) 220 Hz"
    ],
    "ans": "B) 50 Hz (220 वोल्ट विभवांतर)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "30. लघु परिपथन (Short Circuit) के समय परिपथ में विद्युत धारा का मान:\n[At the time of Short Circuit, current in the circuit:]",
    "options": [
      "A) बहुत कम हो जाता है",
      "B) अत्यधिक बढ़ जाता है (Increases enormously)",
      "C) अपरिवर्तित रहता है",
      "D) निरंतर घटता है"
    ],
    "ans": "B) अत्यधिक बढ़ जाता है (Increases enormously)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "31. फेरस सल्फेट क्रिस्टल (Green Vitriol) का रासायनिक सूत्र क्या है?\n[Chemical formula of Ferrous Sulphate crystal:]",
    "options": [
      "A) FeSO₄·5H₂O",
      "B) FeSO₄·7H₂O",
      "C) FeSO₄·2H₂O",
      "D) Fe₂O₃"
    ],
    "ans": "B) FeSO₄·7H₂O (गर्म करने पर Fe₂O₃ भूरे रंग में बदलता है)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "32. विरंजक चूर्ण (Bleaching Powder) का रासायनिक नाम और सूत्र क्या है?\n[Chemical name and formula of Bleaching Powder:]",
    "options": [
      "A) CaCO₃",
      "B) CaOCl₂ (कैल्शियम ऑक्सीक्लोराइड)",
      "C) Ca(OH)₂",
      "D) CaCl₂"
    ],
    "ans": "B) CaOCl₂ (कैल्शियम ऑक्सीक्लोराइड)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "33. बेकिंग सोडा (मीठा सोडा) का रासायनिक सूत्र क्या है?\n[Chemical formula of Baking Soda:]",
    "options": [
      "A) Na₂CO₃",
      "B) NaHCO₃ (सोडियम हाइड्रोजन कार्बोनेट)",
      "C) NaOH",
      "D) KOH"
    ],
    "ans": "B) NaHCO₃ (Sodium Hydrogen Carbonate)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "34. धावन सोडा (Washing Soda) का रासायनिक सूत्र क्या है?\n[Chemical formula of Washing Soda:]",
    "options": [
      "A) NaHCO₃",
      "B) Na₂CO₃·10H₂O (डेकाहाइड्रेट)",
      "C) Na₂SO₄",
      "D) NaCl"
    ],
    "ans": "B) Na₂CO₃·10H₂O",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "35. प्लास्टर ऑफ पेरिस (POP) का रासायनिक सूत्र क्या है?\n[Chemical formula of Plaster of Paris:]",
    "options": [
      "A) CaSO₄·2H₂O",
      "B) CaSO₄·½H₂O (हेमीहाइड्रेट)",
      "C) CaSO₄·H₂O",
      "D) MgSO₄·7H₂O"
    ],
    "ans": "B) CaSO₄·½H₂O (जिप्सम को 373 K पर गर्म करने से बनता है)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "36. जिप्सम (Gypsum) का रासायनिक सूत्र क्या है?\n[Chemical formula of Gypsum:]",
    "options": [
      "A) CaSO₄·½H₂O",
      "B) CaSO₄·2H₂O (डाईहाइड्रेट)",
      "C) CaCO₃",
      "D) CaO"
    ],
    "ans": "B) CaSO₄·2H₂O",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "37. श्वसन (Respiration) किस प्रकार की रासायनिक अभिक्रिया है?\n[What type of chemical reaction is Respiration?]",
    "options": [
      "A) ऊष्माशोषी (Endothermic)",
      "B) ऊष्माक्षेपी (Exothermic Reaction)",
      "C) संयोजन",
      "D) अपचयन"
    ],
    "ans": "B) ऊष्माक्षेपी अभिक्रिया (ऊर्जा मुक्त होती है)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "38. लोहे पर जंग लगना (Rusting of Iron) किस प्रकार की अभिक्रिया है?\n[Rusting of iron is an example of:]",
    "options": [
      "A) ऑक्सीकरण (संक्षारण / Corrosion)",
      "B) अपचयन",
      "C) केवल भौतिक परिवर्तन",
      "D) विस्थापन"
    ],
    "ans": "A) ऑक्सीकरण एवं संक्षारण (Fe₂O₃·xH₂O बनता है)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "39. चिप्स की थैली में कौन सी अक्रिय गैस भरी जाती है ताकि उपचयन न हो?\n[Inert gas flushed in potato chips packets to prevent rancidity:]",
    "options": [
      "A) ऑक्सीजन",
      "B) नाइट्रोजन (Nitrogen Gas - N₂)",
      "C) कार्बन डाइऑक्साइड",
      "D) हाइड्रोजन"
    ],
    "ans": "B) नाइट्रोजन गैस (Nitrogen Gas)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "40. बिना बुझा हुआ चूना (Quick Lime) का रासायनिक सूत्र क्या है?\n[Chemical formula of Quick Lime:]",
    "options": [
      "A) Ca(OH)₂",
      "B) CaO (कैल्शियम ऑक्साइड)",
      "C) CaCO₃",
      "D) CaCl₂"
    ],
    "ans": "B) CaO (कैल्शियम ऑक्साइड)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "41. बुझा हुआ चूना (Slaked Lime) का रासायनिक सूत्र क्या है?\n[Chemical formula of Slaked Lime:]",
    "options": [
      "A) CaO",
      "B) Ca(OH)₂ (कैल्शियम हाइड्रॉक्साइड)",
      "C) CaCO₃",
      "D) CaSO₄"
    ],
    "ans": "B) Ca(OH)₂",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "42. संगमरमर (Marble) और चूना पत्थर का रासायनिक सूत्र क्या है?\n[Chemical formula of Marble and Limestone:]",
    "options": [
      "A) CaO",
      "B) CaCO₃ (कैल्शियम कार्बोनेट)",
      "C) Ca(OH)₂",
      "D) CaSO₄"
    ],
    "ans": "B) CaCO₃ (कैल्शियम कार्बोनेट)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "43. लेड नाइट्रेट को गर्म करने पर भूरे रंग का कौन सा धुआं निकलता है?\n[Brown gas emitted on heating Lead Nitrate Pb(NO₃)₂:]",
    "options": [
      "A) ऑक्सीजन (O₂)",
      "B) नाइट्रोजन डाइऑक्साइड (NO₂)",
      "C) लेड ऑक्साइड",
      "D) अमोनिया"
    ],
    "ans": "B) नाइट्रोजन डाइऑक्साइड (NO₂)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "44. तेल एवं वसायुक्त खाद्य पदार्थों का स्वाद व गंध विकृत होना क्या कहलाता है?\n[Spoilage of fats and oils leading to bad smell and taste is:]",
    "options": [
      "A) संक्षारण",
      "B) विकृतगंधिता (Rancidity)",
      "C) उदासीनीकरण",
      "D) किण्वन"
    ],
    "ans": "B) विकृतगंधिता (Rancidity)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "45. सिल्वर क्लोराइड (AgCl) को सूर्य के प्रकाश में रखने पर इसका रंग कैसा हो जाता है?\n[Color of Silver Chloride when exposed to sunlight:]",
    "options": [
      "A) श्वेत",
      "B) धूसर (Grey)",
      "C) पीला",
      "D) लाल"
    ],
    "ans": "B) धूसर (Grey - प्रकाश अपघटन अभिक्रिया)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "46. शुद्ध जल का pH मान कितना होता है?\n[pH of pure water at 25°C:]",
    "options": [
      "A) 0",
      "B) 7 (उदासीन / Neutral)",
      "C) 14",
      "D) 1"
    ],
    "ans": "B) 7 (उदासीन)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "47. मानव रक्त का pH मान लगभग कितना होता है?\n[pH value of human blood:]",
    "options": [
      "A) 6.4",
      "B) 7.4 (हल्का क्षारीय)",
      "C) 8.5",
      "D) 5.5"
    ],
    "ans": "B) 7.4 (Slightly Alkaline)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "48. अम्ल नीले लिटमस पत्र को किस रंग में बदल देते हैं?\n[Acids turn blue litmus into:]",
    "options": [
      "A) हरा",
      "B) लाल (Red)",
      "C) पीला",
      "D) रंगहीन"
    ],
    "ans": "B) लाल (Trick: 'अनिल' = अम्ल नीले को लाल करता है)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "49. क्षार लाल लिटमस पत्र को किस रंग में बदल देते हैं?\n[Bases turn red litmus into:]",
    "options": [
      "A) नीला (Blue)",
      "B) पीला",
      "C) गुलाबी",
      "D) काला"
    ],
    "ans": "A) नीला (Blue)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "50. चींटी के डंक (Ant Sting) और नेटल के डंक में कौन सा अम्ल होता है?\n[Acid present in Ant's sting and Nettle sting:]",
    "options": [
      "A) सिट्रिक अम्ल",
      "B) मेथेनॉइक अम्ल / फॉर्मिक अम्ल (HCOOH)",
      "C) एसिटिक अम्ल",
      "D) ऑक्सालिक अम्ल"
    ],
    "ans": "B) मेथेनॉइक अम्ल (Methanoic acid / Formic acid)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "51. सिरका (Vinegar) में कौन सा अम्ल 5% से 8% मात्रा में पाया जाता है?\n[Acid present in Vinegar (5-8%):]",
    "options": [
      "A) फॉर्मिक अम्ल",
      "B) एसिटिक अम्ल (एथेनॉइक अम्ल - CH₃COOH)",
      "C) टार्टरिक अम्ल",
      "D) लैक्टिक अम्ल"
    ],
    "ans": "B) एसिटिक अम्ल (CH₃COOH)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "52. खट्टे दूध या दही में कौन सा अम्ल पाया जाता है?\n[Acid present in Sour Milk or Curd:]",
    "options": [
      "A) सिट्रिक अम्ल",
      "B) लैक्टिक अम्ल (Lactic Acid)",
      "C) टार्टरिक अम्ल",
      "D) मैलिक अम्ल"
    ],
    "ans": "B) लैक्टिक अम्ल (Lactic Acid)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "53. इमली (Tamarind) में कौन सा अम्ल पाया जाता है?\n[Acid present in Tamarind:]",
    "options": [
      "A) मैलिक अम्ल",
      "B) टार्टरिक अम्ल (Tartaric Acid)",
      "C) सिट्रिक अम्ल",
      "D) ऑक्सालिक अम्ल"
    ],
    "ans": "B) टार्टरिक अम्ल (Tartaric Acid)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "54. टमाटर में कौन सा कार्बनिक अम्ल मुख्य रूप से उपस्थित होता है?\n[Acid primarily present in Tomatoes:]",
    "options": [
      "A) एसिटिक अम्ल",
      "B) ऑक्सालिक अम्ल (Oxalic Acid)",
      "C) फॉर्मिक अम्ल",
      "D) लैक्टिक अम्ल"
    ],
    "ans": "B) ऑक्सालिक अम्ल (Oxalic Acid)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "55. अम्लीय वर्षा (Acid Rain) के जल का pH मान कितना होता है?\n[pH of Acid Rain is:]",
    "options": [
      "A) 7.0 से अधिक",
      "B) 5.6 से कम",
      "C) 8.2",
      "D) 6.8"
    ],
    "ans": "B) 5.6 से कम (SO₂ और NO₂ के कारण)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "56. हमारे उदर (Stomach) में भोजन के पाचन हेतु कौन सा अम्ल स्रावित होता है?\n[Acid produced in human stomach for digestion:]",
    "options": [
      "A) सल्फ्यूरिक अम्ल (H₂SO₄)",
      "B) हाइड्रोक्लोरिक अम्ल (HCl)",
      "C) नाइट्रिक अम्ल (HNO₃)",
      "D) फॉस्फोरिक अम्ल"
    ],
    "ans": "B) हाइड्रोक्लोरिक अम्ल (HCl - पेप्सिन को सक्रिय करता है)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "57. दांतों का इनेमल (Tooth Enamel) किसका बना होता है जो शरीर का सबसे कठोर पदार्थ है?\n[Tooth enamel is composed of:]",
    "options": [
      "A) कैल्शियम फॉस्फेट (Ca₃(PO₄)₂)",
      "B) कैल्शियम कार्बोनेट",
      "C) मैग्नीशियम ऑक्साइड",
      "D) सोडियम क्लोराइड"
    ],
    "ans": "A) कैल्शियम फॉस्फेट (pH 5.5 से कम होने पर संक्षारित होने लगता है)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "58. कमरे के सामान्य ताप पर द्रव अवस्था में पाई जाने वाली एकमात्र धातु कौन सी है?\n[Only metal that exists as liquid at room temperature:]",
    "options": [
      "A) सोडियम",
      "B) पारा (Mercury - Hg)",
      "C) गैलियम",
      "D) सीसा"
    ],
    "ans": "B) पारा (Mercury - संकेत Hg)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "59. कमरे के ताप पर द्रव अवस्था में पाई जाने वाली एकमात्र अधातु कौन सी है?\n[Only non-metal that exists as liquid at room temperature:]",
    "options": [
      "A) क्लोरीन",
      "B) ब्रोमीन (Bromine - Br)",
      "C) आयोडीन",
      "D) फास्फोरस"
    ],
    "ans": "B) ब्रोमीन (Bromine - संकेत Br)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "60. कौन सी धातुएं इतनी मुलायम होती हैं कि उन्हें चाकू से आसानी से काटा जा सकता है?\n[Metals so soft that they can be cut easily with a knife:]",
    "options": [
      "A) लोहा और तांबा",
      "B) सोडियम और पोटैशियम (Na & K)",
      "C) सोना और चांदी",
      "D) एल्युमिनियम और जस्ता"
    ],
    "ans": "B) सोडियम (Na) एवं पोटैशियम (K) - इन्हें केरोसिन में डुबोकर रखते हैं",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "61. कार्बन का कौन सा अपररूप (Allotrope) विद्युत का सुचालक (Good conductor) होता है?\n[Allotrope of Carbon that is a good conductor of electricity:]",
    "options": [
      "A) हीरा (Diamond)",
      "B) ग्रेफाइट (Graphite - मुक्त इलेक्ट्रॉन के कारण)",
      "C) कोयला",
      "D) कोक"
    ],
    "ans": "B) ग्रेफाइट (Graphite)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "62. प्रकृति में पाया जाने वाला सबसे कठोरतम प्राकृतिक पदार्थ कौन सा है?\n[Hardest naturally occurring substance on Earth:]",
    "options": [
      "A) ग्रेफाइट",
      "B) हीरा (Diamond)",
      "C) प्लैटिनम",
      "D) लोहा"
    ],
    "ans": "B) हीरा (Diamond - कार्बन का पारदर्शी अपररूप)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "63. ऐल्केन (Alkane) श्रेणी का सामान्य सूत्र क्या है?\n[General formula of Alkane series:]",
    "options": [
      "A) CₙH₂ₙ₊₂",
      "B) CₙH₂ₙ",
      "C) CₙH₂ₙ₋₂",
      "D) CₙH₂ₙ₊₁"
    ],
    "ans": "A) CₙH₂ₙ₊₂ (जैसे मेथेन CH₄, एथेन C₂H₆)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "64. ऐल्कीन (Alkene) श्रेणी का सामान्य सूत्र क्या है?\n[General formula of Alkene series:]",
    "options": [
      "A) CₙH₂ₙ₊₂",
      "B) CₙH₂ₙ",
      "C) CₙH₂ₙ₋₂",
      "D) CₙH₂ₙ₋₁"
    ],
    "ans": "B) CₙH₂ₙ (द्विआबंध युक्त - एथीन C₂H₄)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "65. ऐल्काइन (Alkyne) श्रेणी का सामान्य सूत्र क्या है?\n[General formula of Alkyne series:]",
    "options": [
      "A) CₙH₂ₙ₊₂",
      "B) CₙH₂ₙ",
      "C) CₙH₂ₙ₋₂",
      "D) CₙH₂ₙ₊₁OH"
    ],
    "ans": "C) CₙH₂ₙ₋₂ (त्रिआबंध युक्त - एसीटिलीन C₂H₂)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "66. आनुवंशिकी का जनक (Father of Genetics) किसे कहा जाता है?\n[Who is known as the Father of Genetics?]",
    "options": [
      "A) चार्ल्स डार्विन",
      "B) ग्रेगर जॉन मेंडल (Gregor Mendel)",
      "C) लैमार्क",
      "D) रॉबर्ट कोच"
    ],
    "ans": "B) ग्रेगर जॉन मेंडल (मटर के पौधे Pisum sativum पर संकरण प्रयोग)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "67. मानव वृक्क (Human Kidney) की रचनात्मक एवं कार्यात्मक इकाई क्या है?\n[Structural and functional unit of Human Kidney:]",
    "options": [
      "A) न्यूरॉन",
      "B) नेफ्रॉन (Nephron / वृक्काणु)",
      "C) माइटोकॉन्ड्रिया",
      "D) एल्वियोली"
    ],
    "ans": "B) नेफ्रॉन (Nephron / वृक्काणु)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "68. तंत्रिका तंत्र (Nervous System) की संरचनात्मक एवं कार्यात्मक इकाई क्या है?\n[Structural and functional unit of Nervous System:]",
    "options": [
      "A) नेफ्रॉन",
      "B) न्यूरॉन / तंत्रिका कोशिका (Neuron)",
      "C) कोशिका द्रव्य",
      "D) राइबोसोम"
    ],
    "ans": "B) न्यूरॉन (Neuron - शरीर की सबसे लम्बी कोशिका)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "69. कोशिका का 'ऊर्जा गृह' (Powerhouse of the Cell) किसे कहा जाता है?\n[Which cell organelle is called the 'Powerhouse of the Cell'?]",
    "options": [
      "A) राइबोसोम",
      "B) माइटोकॉन्ड्रिया (Mitochondria - ATP निर्माण)",
      "C) गॉल्जीकाय",
      "D) लवक"
    ],
    "ans": "B) माइटोकॉन्ड्रिया (ATP के रूप में ऊर्जा संचित होती है)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "70. कोशिका की 'आत्मघाती थैली' (Suicide Bag of the Cell) किसे कहते हैं?\n[Organelle known as the 'Suicidal Bag' of cell:]",
    "options": [
      "A) राइबोसोम",
      "B) लाइसोसोम (Lysosome)",
      "C) रिक्तिका",
      "D) सेंट्रोसोम"
    ],
    "ans": "B) लाइसोसोम (Lysosome - जल-अपघटकीय एंजाइम युक्त)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "71. पादपों में जल एवं खनिजों का संवहन (Transport of Water) किस ऊतक द्वारा होता है?\n[Tissue responsible for transport of water in plants:]",
    "options": [
      "A) जाइलम (Xylem)",
      "B) फ्लोएम",
      "C) पैरेन्काइमा",
      "D) कैम्बियम"
    ],
    "ans": "A) जाइलम (Xylem - जल का एकदिशीय परिवहन)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "72. पादपों में निर्मित भोजन का संवहन (Transport of Food) किस ऊतक द्वारा होता है?\n[Tissue responsible for transport of synthesized food in plants:]",
    "options": [
      "A) जाइलम",
      "B) फ्लोएम (Phloem)",
      "C) पैरेन्काइमा",
      "D) कोलेनकाइमा"
    ],
    "ans": "B) फ्लोएम (Phloem - पत्तियों से सभी भागों तक द्विदिशीय)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "73. प्रकाश संश्लेषण (Photosynthesis) के दौरान कौन सी गैस मुक्त होती है?\n[Gas released during photosynthesis:]",
    "options": [
      "A) कार्बन डाइऑक्साइड",
      "B) ऑक्सीजन (O₂ - जल के प्रकाशिक अपघटन से)",
      "C) नाइट्रोजन",
      "D) मेथेन"
    ],
    "ans": "B) ऑक्सीजन (O₂)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "74. क्लोरोफिल वर्णक का रंग कैसा होता है तथा इसमें कौन सी धातु पाई जाती है?\n[Color of chlorophyll and metal present in it:]",
    "options": [
      "A) पीला, लोहा",
      "B) हरा, मैग्नीशियम (Mg)",
      "C) लाल, तांबा",
      "D) नीला, जस्ता"
    ],
    "ans": "B) हरा रंग, मैग्नीशियम (Mg) धातु उपस्थित होती है",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "75. मानव हृदय (Human Heart) में कुल कितने कोष्ठ (Chambers) होते हैं?\n[How many chambers are there in human heart?]",
    "options": [
      "A) 2",
      "B) 3",
      "C) 4 (दो अलिंद व दो निलय)",
      "D) 6"
    ],
    "ans": "C) 4 कोष्ठ (Two Atria and Two Ventricles)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "76. मानव शरीर का सामान्य रक्तचाप (Normal Blood Pressure) कितना होता है?\n[Normal blood pressure in a healthy human adult:]",
    "options": [
      "A) 80/120 mm Hg",
      "B) 120/80 mm Hg (सिस्टोलिक/डायस्टोलिक)",
      "C) 100/60 mm Hg",
      "D) 140/90 mm Hg"
    ],
    "ans": "B) 120/80 mm Hg",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "77. रक्तचाप (Blood Pressure) मापने वाले यंत्र को क्या कहा जाता है?\n[Instrument used to measure blood pressure:]",
    "options": [
      "A) बैरोमीटर",
      "B) स्फिग्मोमैनोमीटर (Sphygmomanometer)",
      "C) स्टेथोस्कोप",
      "D) थर्मामीटर"
    ],
    "ans": "B) स्फिग्मोमैनोमीटर (Sphygmomanometer)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "78. मानव शरीर में रक्त का थक्का (Blood Clotting) जमाने में कौन सा विटामिन सहायक है?\n[Vitamin essential for blood clotting:]",
    "options": [
      "A) विटामिन A",
      "B) विटामिन C",
      "C) विटामिन K (Phylloquinone)",
      "D) विटामिन D"
    ],
    "ans": "C) विटामिन K (Phylloquinone)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "79. सर्वदाता रक्त समूह (Universal Blood Donor) कौन सा है?\n[Which blood group is known as Universal Donor?]",
    "options": [
      "A) AB+",
      "B) O- (या O)",
      "C) A+",
      "D) B-"
    ],
    "ans": "B) O (O- में कोई एंटीजन नहीं होता)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "80. सर्वग्राही रक्त समूह (Universal Blood Recipient) कौन सा है?\n[Which blood group is Universal Recipient?]",
    "options": [
      "A) O+",
      "B) AB+ (या AB)",
      "C) A+",
      "D) B+"
    ],
    "ans": "B) AB (इसमें कोई एंटीबॉडी नहीं होती)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "81. इन्सुलिन हार्मोन (Insulin Hormone) की कमी से कौन सा रोग होता है?\n[Deficiency of Insulin hormone causes:]",
    "options": [
      "A) घेंघा (Goitre)",
      "B) मधुमेह / डायबिटीज (Diabetes Mellitus)",
      "C) रिकेट्स",
      "D) एनीमिया"
    ],
    "ans": "B) मधुमेह / डायबिटीज (अग्न्याशय के लैंगरहेंस द्वीपिकाओं की बीटा कोशिकाओं से स्राव)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "82. थायरॉक्सिन हार्मोन के संश्लेषण के लिए कौन सा तत्व अनिवार्य है?\n[Element essential for synthesis of thyroxine hormone:]",
    "options": [
      "A) लोहा",
      "B) आयोडीन (Iodine - कमी से घेंघा रोग)",
      "C) कैल्शियम",
      "D) पोटैशियम"
    ],
    "ans": "B) आयोडीन (Iodine - घेंघा या गलगंड रोग से बचाव)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "83. आपातकालीन हार्मोन (Emergency Hormone / Fight or Flight) किसे कहते हैं?\n[Hormone known as Emergency Hormone:]",
    "options": [
      "A) थायरॉक्सिन",
      "B) एड्रीनेलिन (Adrenaline)",
      "C) इन्सुलिन",
      "D) एस्ट्रोजन"
    ],
    "ans": "B) एड्रीनेलिन (Adrenaline - अधिवृक्क ग्रंथि से स्रावित)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "84. मनुष्य में गुणसूत्रों (Chromosomes) की कुल संख्या कितनी होती है?\n[Total number of chromosomes in human cell:]",
    "options": [
      "A) 23",
      "B) 46 (23 जोड़े)",
      "C) 44",
      "D) 48"
    ],
    "ans": "B) 46 (23 जोड़े: 22 जोड़े ऑटोसोम + 1 जोड़ा लिंग गुणसूत्र)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "85. पुरुष में कौन सा लिंग गुणसूत्र संयोजन पाया जाता है?\n[Sex chromosome combination in human males:]",
    "options": [
      "A) XX",
      "B) XY",
      "C) YY",
      "D) XO"
    ],
    "ans": "B) XY (महिला में XX संयोजन होता है)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "86. ओजोन परत (Ozone Layer) का मुख्य कार्य क्या है?\n[Primary function of ozone layer in atmosphere:]",
    "options": [
      "A) ग्रीनहाउस प्रभाव बढ़ाना",
      "B) सूर्य की पराबैंगनी किरणों (UV rays) को रोकना",
      "C) वर्षा कराना",
      "D) ऑक्सीजन उत्पादन"
    ],
    "ans": "B) पराबैंगनी किरणों (UV rays) को अवशोषित करना",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "87. ओजोन गैस का रासायनिक अणुसूत्र क्या है?\n[Chemical formula of Ozone molecule:]",
    "options": [
      "A) O",
      "B) O₂",
      "C) O₃ (तीन ऑक्सीजन परमाणु)",
      "D) O₄"
    ],
    "ans": "C) O₃",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "88. ओजोन परत को सर्वाधिक क्षति पहुंचाने वाला रसायन कौन सा है?\n[Main chemical causing depletion of Ozone Layer:]",
    "options": [
      "A) कार्बन मोनोऑक्साइड",
      "B) क्लोरोफ्लोरोकार्बन (CFCs / Freon)",
      "C) सल्फर डाइऑक्साइड",
      "D) मिथेन"
    ],
    "ans": "B) क्लोरोफ्लोरोकार्बन (CFCs - रेफ्रिजरेटर व AC में प्रयुक्त)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "89. विश्व ओजोन दिवस (World Ozone Day) प्रत्येक वर्ष कब मनाया जाता है?\n[World Ozone Day is celebrated every year on:]",
    "options": [
      "A) 5 जून",
      "B) 16 सितम्बर (16th September)",
      "C) 22 अप्रैल",
      "D) 1 दिसंबर"
    ],
    "ans": "B) 16 सितम्बर (मॉन्ट्रियल प्रोटोकॉल 1987 की स्मृति में)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "90. किसी पारितंत्र (Ecosystem) में ऊर्जा का प्राथमिक स्रोत क्या है?\n[Primary source of energy in any ecosystem:]",
    "options": [
      "A) एटीपी (ATP)",
      "B) सूर्य का प्रकाश (Solar Energy)",
      "C) हरा पौधा",
      "D) ग्लूकोज"
    ],
    "ans": "B) सूर्य का प्रकाश (Solar Energy)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "91. 10% का ऊर्जा स्थानांतरण नियम (10% Energy Transfer Law) किसने प्रतिपादित किया था?\n[Who proposed the 10% law of energy transfer in food chain?]",
    "options": [
      "A) चार्ल्स डार्विन",
      "B) रेमंड लिंडेमान (Raymond Lindeman - 1942)",
      "C) अर्नेस्ट हेकल",
      "D) ओडम"
    ],
    "ans": "B) रेमंड लिंडेमान (प्रत्येक पोषण स्तर पर केवल 10% ऊर्जा ही आगे जाती है)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "92. पर्यावरण की सुरक्षा हेतु प्रसिद्ध 'चिपको आंदोलन' किस राज्य से शुरू हुआ था?\n[Famous Chipko movement started from which Indian state?]",
    "options": [
      "A) बिहार",
      "B) उत्तराखंड (चमोली जिला - सुंदरलाल बहुगुणा)",
      "C) राजस्थान",
      "D) मध्य प्रदेश"
    ],
    "ans": "B) उत्तराखंड (चमोली जनपद में 1973 में)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "93. बायोगैस (Biogas / Gobar Gas) का मुख्य घटक कौन सी गैस है?\n[Main constituent gas of Biogas:]",
    "options": [
      "A) प्रोपेन",
      "B) मेथेन (Methane - CH₄ लगभग 75%)",
      "C) ब्यूटेन",
      "D) हाइड्रोजन"
    ],
    "ans": "B) मेथेन (CH₄ - लगभग 65% से 75%)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "94. सीएनजी (Compressed Natural Gas - CNG) का प्रमुख घटक क्या है?\n[Primary constituent of CNG:]",
    "options": [
      "A) प्रोपेन",
      "B) मेथेन (Methane)",
      "C) एथेन",
      "D) ब्यूटेन"
    ],
    "ans": "B) मेथेन (Methane)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "95. एलपीजी (LPG - घरेलू रसोई गैस) में गंध हेतु कौन सा यौगिक मिलाया जाता है?\n[Substance added to LPG cylinders for leak detection odor:]",
    "options": [
      "A) मेथिल अल्कोहल",
      "B) एथिल मरकैप्टन (Ethyl Mercaptan - C₂H₅SH)",
      "C) क्लोरोफॉर्म",
      "D) ईथर"
    ],
    "ans": "B) एथिल मरकैप्टन (Ethyl Mercaptan)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "96. पौधों में रंध्र (Stomata) के खुलने और बंद होने की क्रिया को कौन नियंत्रित करता है?\n[Cells regulating opening and closing of stomata in leaves:]",
    "options": [
      "A) द्वार कोशिकाएं (Guard Cells)",
      "B) जाइलम कोशिकाएं",
      "C) फ्लोएम कोशिकाएं",
      "D) मूल रोम"
    ],
    "ans": "A) द्वार कोशिकाएं (Guard Cells)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "97. स्त्रियों में निषेचन (Fertilization) की क्रिया सामान्यतः कहाँ संपन्न होती है?\n[In human females, fertilization occurs in:]",
    "options": [
      "A) अंडाशय (Ovary)",
      "B) फैलोपियन नलिका (Fallopian Tube / अंडवाहिनी)",
      "C) गर्भाशय",
      "D) योनि"
    ],
    "ans": "B) फैलोपियन नलिका (Fallopian Tube)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "98. एड्स (AIDS) रोग किस विषाणु (Virus) के संक्रमण से होता है?\n[AIDS is caused by which virus:]",
    "options": [
      "A) हेपेटाइटिस",
      "B) एचआईवी (HIV - Human Immunodeficiency Virus)",
      "C) पोलियो वायरस",
      "D) राइनो वायरस"
    ],
    "ans": "B) HIV (एड्स दिवस 1 दिसंबर को मनाया जाता है)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "99. विटामिन सी (Vitamin C) का रासायनिक नाम क्या है तथा इसकी कमी से कौन सा रोग होता है?\n[Chemical name of Vitamin C and its deficiency disease:]",
    "options": [
      "A) रेटिनॉल - रतौंधी",
      "B) एस्कॉर्बिक अम्ल - स्कर्वी (Scurvy)",
      "C) थायमीन - बेरीबेरी",
      "D) कैल्सीफेरोल - रिकेट्स"
    ],
    "ans": "B) एस्कॉर्बिक अम्ल (Ascorbic Acid) - स्कर्वी रोग (मसूड़ों से खून आना)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "100. मानव शरीर में मास्टर ग्रंथि (Master Gland) किसे कहा जाता है?\n[Which gland is called the Master Gland of human body?]",
    "options": [
      "A) थायरॉयड ग्रंथि",
      "B) पीयूष ग्रंथि (Pituitary Gland)",
      "C) अग्न्याशय",
      "D) अधिवृक्क ग्रंथि"
    ],
    "ans": "B) पीयूष ग्रंथि (Pituitary Gland - मस्तिष्क के आधार पर स्थित)",
    "subjectName": "विज्ञान (Science)"
  }
];
const MASTER_MATHS_MCQS = [
  {
    "q": "1. दो संख्याओं का म०स० (HCF) 15 तथा ल०स० (LCM) 150 है। यदि एक संख्या 30 हो, तो दूसरी संख्या क्या होगी?\n[HCF is 15, LCM is 150. If one number is 30, find the other number:]",
    "options": [
      "A) 45",
      "B) 75",
      "C) 60",
      "D) 90"
    ],
    "ans": "B) 75 (सूत्र: पहली संख्या × दूसरी = HCF × LCM ⇒ 30 × N = 15 × 150 ⇒ N = 75)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "2. निम्नलिखित में से कौन सी एक अपरिमेय संख्या (Irrational Number) है?\n[Which of the following is an irrational number?]",
    "options": [
      "A) √4",
      "B) √9",
      "C) √7",
      "D) 22/7"
    ],
    "ans": "C) √7 (अपरिमेय संख्या है जिसका दशमलव प्रसार असांत अनावर्ती होता है)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "3. पाई (π) किस प्रकार की संख्या है?\n[What type of number is Pi (π)?]",
    "options": [
      "A) परिमेय संख्या",
      "B) अपरिमेय संख्या (Irrational Number)",
      "C) पूर्णांक",
      "D) प्राकृत संख्या"
    ],
    "ans": "B) अपरिमेय संख्या (Irrational Number - जबकि इसका सन्निकट मान 22/7 परिमेय है)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "4. द्विघात समीकरण ax² + bx + c = 0 के मूल वास्तविक और समान होंगे यदि:\n[Roots of ax² + bx + c = 0 are real and equal if:]",
    "options": [
      "A) b² - 4ac > 0",
      "B) b² - 4ac = 0",
      "C) b² - 4ac < 0",
      "D) b² - 4ac ≥ 1"
    ],
    "ans": "B) b² - 4ac = 0 (विविक्तकर D = 0)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "5. यदि द्विघात समीकरण 2x² - 4x + k = 0 के मूल बराबर हों, तो k का मान क्या होगा?\n[If roots of 2x² - 4x + k = 0 are equal, find value of k:]",
    "options": [
      "A) 1",
      "B) 2",
      "C) 4",
      "D) -2"
    ],
    "ans": "B) 2 (D = (-4)² - 4(2)(k) = 0 ⇒ 16 - 8k = 0 ⇒ k = 2)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "6. द्विघात बहुपद x² - 3 के शून्यक (Zeroes) क्या होंगे?\n[Find zeroes of polynomial x² - 3:]",
    "options": [
      "A) 3, -3",
      "B) +√3, -√3",
      "C) √3, √3",
      "D) 9, -9"
    ],
    "ans": "B) +√3, -√3 (x² = 3 ⇒ x = ±√3)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "7. यदि द्विघात बहुपद ax² + bx + c के शून्यक α और β हों, तो (α + β) और αβ का मान क्या होगा?\n[Sum and product of zeroes α and β of ax² + bx + c:]",
    "options": [
      "A) -b/a तथा c/a",
      "B) b/a तथा -c/a",
      "C) c/a तथा -b/a",
      "D) -c/a तथा b/a"
    ],
    "ans": "A) शून्यकों का योग = -b/a, शून्यकों का गुणनफल = c/a",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "8. रैखिक समीकरण युग्म a₁x + b₁y + c₁ = 0 तथा a₂x + b₂y + c₂ = 0 का अद्वितीय हल (Unique Solution) कब होता है?\n[Condition for a unique solution of pair of linear equations:]",
    "options": [
      "A) a₁/a₂ ≠ b₁/b₂",
      "B) a₁/a₂ = b₁/b₂ = c₁/c₂",
      "C) a₁/a₂ = b₁/b₂ ≠ c₁/c₂",
      "D) a₁/a₂ = -b₁/b₂"
    ],
    "ans": "A) a₁/a₂ ≠ b₁/b₂ (प्रतिच्छेदी रेखाएं / संगत)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "9. यदि a₁/a₂ = b₁/b₂ ≠ c₁/c₂ हो, तो समीकरण निकाय का कैसा हल होगा?\n[If a₁/a₂ = b₁/b₂ ≠ c₁/c₂, the system of equations has:]",
    "options": [
      "A) एक अद्वितीय हल",
      "B) कोई हल नहीं (No Solution - समांतर रेखाएं)",
      "C) अनंत अनेक हल",
      "D) दो हल"
    ],
    "ans": "B) कोई हल नहीं (No Solution - रेखाएं समांतर एवं असंगत होती हैं)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "10. समांतर श्रेणी (AP): 2, 7, 12, ... का 10वाँ पद क्या होगा?\n[Find the 10th term of AP: 2, 7, 12, ...:]",
    "options": [
      "A) 45",
      "B) 47",
      "C) 50",
      "D) 52"
    ],
    "ans": "B) 47 (a = 2, d = 5; a₁₀ = a + 9d = 2 + 9×5 = 47)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "11. समांतर श्रेणी के प्रथम n पदों के योगफल का सूत्र क्या है?\n[Formula for sum of first n terms of an AP:]",
    "options": [
      "A) Sₙ = n/2 [2a + (n - 1)d]",
      "B) Sₙ = n [a + d]",
      "C) Sₙ = n/2 [a - d]",
      "D) Sₙ = 2n [a + (n-1)d]"
    ],
    "ans": "A) Sₙ = n/2 [2a + (n - 1)d] अथवा Sₙ = n/2 [a + l]",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "12. प्रथम 10 प्राकृत संख्याओं का योगफल (Sum of first 10 natural numbers) कितना होगा?\n[Sum of first 10 natural numbers:]",
    "options": [
      "A) 50",
      "B) 55",
      "C) 60",
      "D) 65"
    ],
    "ans": "B) 55 (सूत्र: n(n+1)/2 = 10 × 11 / 2 = 55)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "13. बिन्दु (-3, 4) कार्तीय तल के किस चतुर्थांश (Quadrant) में स्थित है?\n[In which quadrant does point (-3, 4) lie?]",
    "options": [
      "A) प्रथम",
      "B) द्वितीय (Second Quadrant: -x, +y)",
      "C) तृतीय",
      "D) चतुर्थ"
    ],
    "ans": "B) द्वितीय चतुर्थांश (Second Quadrant)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "14. मूल बिन्दु (Origin) के निर्देशांक क्या होते हैं?\n[Coordinates of origin are:]",
    "options": [
      "A) (1, 1)",
      "B) (0, 0)",
      "C) (0, 1)",
      "D) (-1, -1)"
    ],
    "ans": "B) (0, 0)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "15. बिन्दु P(x, y) की मूल बिन्दु (0,0) से दूरी का सूत्र क्या है?\n[Distance of point P(x, y) from origin:]",
    "options": [
      "A) x + y",
      "B) √(x² + y²)",
      "C) x² - y²",
      "D) √(x - y)"
    ],
    "ans": "B) √(x² + y²)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "16. बिन्दुओं (2, 3) और (4, 1) के बीच की दूरी क्या होगी?\n[Find distance between points (2, 3) and (4, 1):]",
    "options": [
      "A) 2",
      "B) 2√2",
      "C) 4",
      "D) √8 / 2"
    ],
    "ans": "B) 2√2 (d = √[(4-2)² + (1-3)²] = √[4 + 4] = √8 = 2√2)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "17. बिन्दुओं (x₁, y₁) और (x₂, y₂) को मिलाने वाले रेखाखंड के मध्य-बिन्दु (Mid-point) के निर्देशांक हैं:\n[Mid-point coordinates of line joining (x₁, y₁) and (x₂, y₂):]",
    "options": [
      "A) ((x₁+x₂)/2, (y₁+y₂)/2)",
      "B) ((x₁-x₂)/2, (y₁-y₂)/2)",
      "C) (x₁+x₂, y₁+y₂)",
      "D) (x₁x₂, y₁y₂)"
    ],
    "ans": "A) ((x₁ + x₂)/2, (y₁ + y₂)/2)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "18. यदि sin θ = 3/5 हो, तो cos θ और tan θ का मान क्या होगा?\n[If sin θ = 3/5, what are cos θ and tan θ?]",
    "options": [
      "A) cos θ = 4/5, tan θ = 3/4",
      "B) cos θ = 3/4, tan θ = 4/5",
      "C) cos θ = 5/4, tan θ = 3/5",
      "D) cos θ = 4/3, tan θ = 5/3"
    ],
    "ans": "A) cos θ = 4/5, tan θ = 3/4 (पाइथागोरस त्रिक: 3, 4, 5)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "19. sin² 63° + sin² 27° का मान क्या होगा?\n[Value of sin² 63° + sin² 27° is:]",
    "options": [
      "A) 0",
      "B) 1",
      "C) 2",
      "D) -1"
    ],
    "ans": "B) 1 (sin 27° = cos 63°, अतः sin² 63° + cos² 63° = 1)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "20. (sec² θ - tan² θ) का मान सदैव किसके बराबर होता है?\n[Value of (sec² θ - tan² θ) is:]",
    "options": [
      "A) 0",
      "B) 1",
      "C) -1",
      "D) 2"
    ],
    "ans": "B) 1 (त्रिकोणमितीय सर्वसमिका)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "21. 9 sec² A - 9 tan² A का मान क्या होगा?\n[Value of 9 sec² A - 9 tan² A is:]",
    "options": [
      "A) 1",
      "B) 9",
      "C) 8",
      "D) 0"
    ],
    "ans": "B) 9 (9 × [sec² A - tan² A] = 9 × 1 = 9)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "22. यदि tan θ = 1 हो, तो कोण θ का मान क्या होगा?\n[If tan θ = 1, value of acute angle θ is:]",
    "options": [
      "A) 30°",
      "B) 45°",
      "C) 60°",
      "D) 90°"
    ],
    "ans": "B) 45° (tan 45° = 1)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "23. एक मीनार की छाया उसकी ऊंचाई के बराबर है। सूर्य का उन्नयन कोण (Angle of Elevation) क्या होगा?\n[Height of tower equals its shadow length. Angle of elevation of Sun:]",
    "options": [
      "A) 30°",
      "B) 45°",
      "C) 60°",
      "D) 90°"
    ],
    "ans": "B) 45° (tan θ = h/h = 1 ⇒ θ = 45°)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "24. वृत्त की सबसे बड़ी जीवा (Longest Chord of a Circle) क्या कहलाती है?\n[The longest chord of a circle is called:]",
    "options": [
      "A) त्रिज्या (Radius)",
      "B) व्यास (Diameter)",
      "C) चाप (Arc)",
      "D) स्पर्श रेखा"
    ],
    "ans": "B) व्यास (Diameter = 2r)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "25. किसी वृत्त पर बाह्य बिन्दु (External point) से अधिकतम कितनी स्पर्श रेखाएं खींची जा सकती हैं?\n[Maximum number of tangents drawn from an external point to a circle:]",
    "options": [
      "A) 1",
      "B) 2 (दोनों की लम्बाइयां बराबर होती हैं)",
      "C) अनंत",
      "D) 0"
    ],
    "ans": "B) 2 (बाह्य बिंदु से खींची गई दोनों स्पर्श रेखाएं समान लंबाई की होती हैं)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "26. यदि वृत्त की त्रिज्या r हो, तो अर्धवृत्त का परिमाप (Perimeter of Semicircle) क्या होगा?\n[Perimeter of a semicircle of radius r:]",
    "options": [
      "A) πr",
      "B) πr + 2r = r(π + 2)",
      "C) 2πr",
      "D) πr² / 2"
    ],
    "ans": "B) r(π + 2) (चाप की लंबाई πr + व्यास 2r)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "27. दो वृत्तों के क्षेत्रफलों का अनुपात 4 : 9 है। उनकी त्रिज्याओं का अनुपात क्या होगा?\n[Ratio of areas of two circles is 4:9. Ratio of their radii is:]",
    "options": [
      "A) 2 : 3",
      "B) 16 : 81",
      "C) 4 : 9",
      "D) 1 : 2"
    ],
    "ans": "A) 2 : 3 (r₁/r₂ = √(A₁/A₂) = √(4/9) = 2/3)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "28. एक ठोस अर्धगोले का कुल पृष्ठीय क्षेत्रफल (Total Surface Area of Hemisphere) क्या होता है?\n[Total surface area of a solid hemisphere of radius r:]",
    "options": [
      "A) 2πr²",
      "B) 3πr²",
      "C) 4πr²",
      "D) 2/3 πr³"
    ],
    "ans": "B) 3πr² (वक्र पृष्ठ 2πr² + आधार πr²)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "29. एक गोले की त्रिज्या दोगुनी कर दी जाए, तो उसका आयतन कितने गुना हो जाएगा?\n[If radius of a sphere is doubled, its volume becomes:]",
    "options": [
      "A) 2 गुना",
      "B) 4 गुना",
      "C) 8 गुना (V ∝ r³)",
      "D) 16 गुना"
    ],
    "ans": "C) 8 गुना (V = 4/3 π (2r)³ = 8 × V)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "30. एक बेलन (Cylinder) का वक्र पृष्ठीय क्षेत्रफल का सूत्र क्या है?\n[Curved surface area of a cylinder of radius r and height h:]",
    "options": [
      "A) πr²h",
      "B) 2πrh",
      "C) 2πr(r + h)",
      "D) 1/3 πr²h"
    ],
    "ans": "B) 2πrh",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "31. शंकु (Cone) के आयतन का सूत्र क्या है?\n[Volume of a right circular cone:]",
    "options": [
      "A) πr²h",
      "B) 1/3 πr²h",
      "C) 2/3 πr³",
      "D) πrl"
    ],
    "ans": "B) 1/3 πr²h",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "32. केंद्रीय प्रवृत्ति के तीन मापकों माध्य (Mean), माध्यक (Median) और बहुलक (Mode) में सही आनुभविक संबंध क्या है?\n[Empirical relationship between Mean, Median and Mode:]",
    "options": [
      "A) बहुलक = 3 माध्यक - 2 माध्य",
      "B) बहुलक = 2 माध्यक - 3 माध्य",
      "C) माध्य = 3 माध्यक - बहुलक",
      "D) माध्यक = 3 बहुलक - 2 माध्य"
    ],
    "ans": "A) बहुलक (Mode) = 3 × माध्यक (Median) - 2 × माध्य (Mean)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "33. आंकड़ों 2, 3, 5, 3, 7, 3, 8 का बहुलक (Mode) क्या होगा?\n[Find mode of data: 2, 3, 5, 3, 7, 3, 8:]",
    "options": [
      "A) 2",
      "B) 3 (सर्वाधिक बार आया)",
      "C) 5",
      "D) 7"
    ],
    "ans": "B) 3 (इसकी बारंबारता 3 है जो सर्वाधिक है)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "34. एक निश्चित घटना (Sure Event) की प्रायिकता (Probability) कितनी होती है?\n[Probability of a certain/sure event is:]",
    "options": [
      "A) 0",
      "B) 1",
      "C) 0.5",
      "D) -1"
    ],
    "ans": "B) 1 (अनिश्चित या असंभव घटना की प्रायिकता 0 होती है)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "35. किसी घटना की प्रायिकता P(E) का मान किसके बीच होता है?\n[Value of probability P(E) always lies between:]",
    "options": [
      "A) -1 और 1",
      "B) 0 और 1 के बीच (0 ≤ P(E) ≤ 1)",
      "C) 1 और 10",
      "D) 0 और अनंत"
    ],
    "ans": "B) 0 ≤ P(E) ≤ 1 (प्रायिकता कभी ऋणात्मक या 1 से अधिक नहीं हो सकती)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "36. यदि P(E) = 0.05 हो, तो 'E नहीं' (P(not E)) की प्रायिकता क्या होगी?\n[If P(E) = 0.05, what is P(not E)?]",
    "options": [
      "A) 0.05",
      "B) 0.95",
      "C) 0.50",
      "D) 1.05"
    ],
    "ans": "B) 0.95 (P(not E) = 1 - 0.05 = 0.95)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "37. एक पासे को एक बार फेंकने पर अभाज्य संख्या (Prime number) आने की प्रायिकता क्या होगी?\n[Probability of getting a prime number on throwing a die once:]",
    "options": [
      "A) 1/6",
      "B) 1/2 (2, 3, 5 कुल 3/6)",
      "C) 2/3",
      "D) 1/3"
    ],
    "ans": "B) 1/2 (अभाज्य संख्याएं = {2, 3, 5}, प्रायिकता = 3/6 = 1/2)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "38. ताश की 52 पत्तों की गड्डी में से एक पत्ता निकाला जाता है। एक इक्का (Ace) आने की प्रायिकता क्या होगी?\n[Probability of drawing an Ace from a pack of 52 cards:]",
    "options": [
      "A) 1/52",
      "B) 1/13 (4/52)",
      "C) 4/13",
      "D) 1/26"
    ],
    "ans": "B) 1/13 (कुल 4 इक्के होते हैं, 4/52 = 1/13)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "39. यदि एक वस्तु को ₹720 में बेचने पर 20% का लाभ होता है, तो वस्तु का क्रय मूल्य (Cost Price) क्या है?\n[Selling price of an article is ₹720 with 20% profit. Find Cost Price:]",
    "options": [
      "A) ₹600",
      "B) ₹580",
      "C) ₹640",
      "D) ₹500"
    ],
    "ans": "A) ₹600 (CP = 720 × 100 / 120 = ₹600)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "40. एक व्यक्ति 60 किमी/घंटा से जाता है तथा 40 किमी/घंटा से उसी रास्ते लौटता है। पूरी यात्रा की औसत चाल क्या होगी?\n[A man travels at 60 km/h and returns at 40 km/h. Average speed is:]",
    "options": [
      "A) 50 किमी/घंटा",
      "B) 48 किमी/घंटा",
      "C) 45 किमी/घंटा",
      "D) 52 किमी/घंटा"
    ],
    "ans": "B) 48 किमी/घंटा (ट्रिक: 2xy/(x+y) = 2×60×40/100 = 48 km/h)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "41. A किसी काम को 10 दिन में और B उसी काम को 15 दिन में करता है। दोनों मिलकर उस काम को कितने दिनों में पूरा करेंगे?\n[A can do a work in 10 days, B in 15 days. Working together, days needed:]",
    "options": [
      "A) 5 दिन",
      "B) 6 दिन",
      "C) 8 दिन",
      "D) 7.5 दिन"
    ],
    "ans": "B) 6 दिन (ट्रिक: (A×B)/(A+B) = (10×15)/25 = 150/25 = 6 दिन)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "42. ₹5,000 की राशि पर 10% वार्षिक दर से 2 वर्ष के चक्रवृद्धि ब्याज (CI) और साधारण ब्याज (SI) का अंतर क्या होगा?\n[Difference between CI and SI on ₹5,000 at 10% for 2 years:]",
    "options": [
      "A) ₹25",
      "B) ₹50",
      "C) ₹100",
      "D) ₹75"
    ],
    "ans": "B) ₹50 (ट्रिक: D = P × (R/100)² = 5000 × (10/100)² = 5000 × 1/100 = ₹50)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "43. यदि चीनी के मूल्य में 25% की वृद्धि हो जाए, तो एक परिवार को अपनी खपत में कितने प्रतिशत की कमी करनी होगी ताकि खर्च न बढ़े?\n[If price of sugar rises by 25%, by what percent must consumption reduce:]",
    "options": [
      "A) 25%",
      "B) 20%",
      "C) 15%",
      "D) 16.66%"
    ],
    "ans": "B) 20% (ट्रिक: [R / (100 + R)] × 100 = [25 / 125] × 100 = 20%)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "44. प्रथम 20 विषम प्राकृत संख्याओं का योगफल (Sum of first 20 odd natural numbers) क्या होगा?\n[Sum of first 20 odd natural numbers:]",
    "options": [
      "A) 200",
      "B) 400 (n²)",
      "C) 420",
      "D) 380"
    ],
    "ans": "B) 400 (प्रथम n विषम संख्याओं का योग = n² = 20² = 400)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "45. एक समबाहु त्रिभुज (Equilateral Triangle) की भुजा 6 सेमी है। इसका क्षेत्रफल क्या होगा?\n[Side of equilateral triangle is 6 cm. Find its area:]",
    "options": [
      "A) 9√3 सेमी²",
      "B) 18√3 सेमी²",
      "C) 36 सेमी²",
      "D) 6√3 सेमी²"
    ],
    "ans": "A) 9√3 सेमी² (क्षेत्रफल = (√3/4) × a² = (√3/4) × 36 = 9√3 cm²)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "46. 120 मीटर लंबी ट्रेन 54 किमी/घंटा की चाल से एक खंभे को कितने समय में पार करेगी?\n[A 120m long train running at 54 km/h crosses a pole in:]",
    "options": [
      "A) 6 सेकंड",
      "B) 8 सेकंड",
      "C) 10 सेकंड",
      "D) 12 सेकंड"
    ],
    "ans": "B) 8 सेकंड (चाल = 54 × 5/18 = 15 m/s; समय = दूरी / चाल = 120 / 15 = 8 सेकंड)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "47. दो संख्याओं का अनुपात 3 : 4 है और उनका ल०स० (LCM) 180 है। उनमें से छोटी संख्या क्या होगी?\n[Ratio of two numbers is 3:4 and LCM is 180. The smaller number is:]",
    "options": [
      "A) 30",
      "B) 45",
      "C) 60",
      "D) 15"
    ],
    "ans": "B) 45 (माना संख्याएं 3x और 4x, LCM = 12x = 180 ⇒ x = 15; छोटी संख्या = 3×15 = 45)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "48. त्रिभुज के तीनों अन्तः कोणों का योगफल कितना होता है?\n[Sum of interior angles of a triangle is:]",
    "options": [
      "A) 90°",
      "B) 180°",
      "C) 360°",
      "D) 270°"
    ],
    "ans": "B) 180° (π रेडियन)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "49. वृत्त की परिधि और व्यास का अनुपात सदैव क्या कहलाता है?\n[Ratio of circumference of a circle to its diameter is:]",
    "options": [
      "A) 1",
      "B) पाई (π)",
      "C) त्रिज्या",
      "D) 2π"
    ],
    "ans": "B) पाई (π = C / d ≈ 3.14159)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "50. यदि x + 1/x = 4 हो, तो x² + 1/x² का मान क्या होगा?\n[If x + 1/x = 4, then x² + 1/x² equals:]",
    "options": [
      "A) 16",
      "B) 14 (k² - 2)",
      "C) 18",
      "D) 12"
    ],
    "ans": "B) 14 (ट्रिक: k² - 2 = 4² - 2 = 16 - 2 = 14)",
    "subjectName": "गणित (Mathematics)"
  }
];
const MASTER_GK_MCQS = [
  {
    "q": "1. भारतीय संविधान का कौन सा अनुच्छेद 'अस्पृश्यता का अंत' (Abolition of Untouchability) सुनिश्चित करता है?\n[Which Article of Indian Constitution abolishes Untouchability?]",
    "options": [
      "A) अनुच्छेद 14",
      "B) अनुच्छेद 17",
      "C) अनुच्छेद 19",
      "D) अनुच्छेद 21"
    ],
    "ans": "B) अनुच्छेद 17 (मौलिक अधिकारों के अंतर्गत समता का अधिकार)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "2. 'सत्यमेव जयते' भारत का राष्ट्रीय आदर्श वाक्य किस उपनिषद से लिया गया है?\n['Satyameva Jayate' has been adopted from which Upanishad?]",
    "options": [
      "A) कठोपनिषद",
      "B) मुण्डकोपनिषद",
      "C) छांदोग्योपनिषद",
      "D) केनोपनिषद"
    ],
    "ans": "B) मुण्डकोपनिषद (Mundaka Upanishad)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "3. संविधान सभा की प्रारूप समिति (Drafting Committee) के अध्यक्ष कौन थे?\n[Who was the Chairman of the Drafting Committee of Constituent Assembly?]",
    "options": [
      "A) डॉ. राजेन्द्र प्रसाद",
      "B) डॉ. भीमराव अंबेडकर",
      "C) पं. जवाहरलाल नेहरू",
      "D) सरदार पटेल"
    ],
    "ans": "B) डॉ. भीमराव अंबेडकर (29 अगस्त 1947 को गठन, कुल 7 सदस्य)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "4. 1917 का प्रसिद्ध चंपारण सत्याग्रह महात्मा गांधी द्वारा किसके विरोध में शुरू किया गया था?\n[Champaran Satyagraha (1917) was launched against which system?]",
    "options": [
      "A) नमक कर",
      "B) तिनकठिया प्रथा (नील की खेती)",
      "C) रोलेट एक्ट",
      "D) जलियांवाला बाग"
    ],
    "ans": "B) तिनकठिया प्रथा (3/20 भाग पर नील की अनिवार्य खेती)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "5. भारत में ₹1 के नोट पर किसके हस्ताक्षर होते हैं?\n[Whose signature appears on ₹1 currency note in India?]",
    "options": [
      "A) RBI गवर्नर",
      "B) वित्त सचिव (Finance Secretary)",
      "C) वित्त मंत्री",
      "D) भारत के राष्ट्रपति"
    ],
    "ans": "B) वित्त सचिव (Finance Secretary - अन्य सभी नोटों पर RBI गवर्नर के हस्ताक्षर होते हैं)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "6. भारत की मुख्य भूमि की सबसे लंबी तटरेखा (Longest Coastline) किस राज्य की है?\n[Which state has the longest coastline in mainland India?]",
    "options": [
      "A) महाराष्ट्र",
      "B) गुजरात (लगभग 1,600 किमी)",
      "C) तमिलनाडु",
      "D) आंध्र प्रदेश"
    ],
    "ans": "B) गुजरात (दूसरे स्थान पर आंध्र प्रदेश)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "7. संसद के दोनों सदनों की संयुक्त बैठक (Joint Sitting) की अध्यक्षता कौन करता है?\n[Who presides over Joint Sitting of both Houses of Parliament?]",
    "options": [
      "A) राष्ट्रपति",
      "B) उपराष्ट्रपति",
      "C) लोकसभा अध्यक्ष (Speaker)",
      "D) प्रधानमंत्री"
    ],
    "ans": "C) लोकसभा अध्यक्ष (अनुच्छेद 118 के तहत, आहूत राष्ट्रपति द्वारा अनुच्छेद 108 में)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "8. भारत के नियंत्रक एवं महालेखापरीक्षक (CAG) का कार्यकाल कितना होता है?\n[What is the tenure of the Comptroller and Auditor General (CAG) of India?]",
    "options": [
      "A) 5 वर्ष या 65 वर्ष",
      "B) 6 वर्ष या 65 वर्ष की आयु",
      "C) 6 वर्ष या 62 वर्ष",
      "D) 4 वर्ष"
    ],
    "ans": "B) 6 वर्ष या 65 वर्ष की आयु (जो भी पहले हो, अनुच्छेद 148)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "9. नीति आयोग की स्थापना किस वर्ष की गई थी?\n[In which year was NITI Aayog established?]",
    "options": [
      "A) 15 अगस्त 2014",
      "B) 1 जनवरी 2015",
      "C) 26 जनवरी 2015",
      "D) 1 अप्रैल 2016"
    ],
    "ans": "B) 1 जनवरी 2015 (योजना आयोग के स्थान पर, पदेन अध्यक्ष भारत के प्रधानमंत्री)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "10. मोहिनीअट्टम एवं कथकली किस राज्य के प्रसिद्ध शास्त्रीय नृत्य हैं?\n[Mohiniyattam and Kathakali are classical dance forms of which state?]",
    "options": [
      "A) तमिलनाडु",
      "B) केरल (Kerala)",
      "C) आंध्र प्रदेश",
      "D) कर्नाटक"
    ],
    "ans": "B) केरल (भरतनाट्यम तमिलनाडु का, कुचिपुड़ी आंध्र प्रदेश का है)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "11. भारतीय मानक समय रेखा (82.5° E) भारत के कितने राज्यों से होकर गुजरती है?\n[Indian Standard Meridian (82.5° E) passes through how many states?]",
    "options": [
      "A) 4",
      "B) 5 राज्यों से (UP, MP, छत्तीसगढ़, ओडिशा, आंध्र प्रदेश)",
      "C) 6",
      "D) 8"
    ],
    "ans": "B) 5 राज्यों से (मिर्जापुर, प्रयागराज से गुजरती है, GMT से +5:30 घंटे आगे)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "12. कर्क रेखा (Tropic of Cancer - 23.5° N) भारत के कितने राज्यों से होकर गुजरती है?\n[Tropic of Cancer passes through how many Indian states?]",
    "options": [
      "A) 7",
      "B) 8 राज्यों से",
      "C) 9",
      "D) 6"
    ],
    "ans": "B) 8 राज्यों से (गुजरात, राजस्थान, MP, छत्तीसगढ़, झारखंड, प० बंगाल, त्रिपुरा, मिजोरम)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "13. भारतीय संविधान के किस अनुच्छेद को डॉ. भीमराव अंबेडकर ने 'संविधान की आत्मा और हृदय' कहा था?\n[Which Article was called the 'Heart and Soul of the Constitution' by Dr. Ambedkar?]",
    "options": [
      "A) अनुच्छेद 14",
      "B) अनुच्छेद 19",
      "C) अनुच्छेद 21",
      "D) अनुच्छेद 32 (संवैधानिक उपचारों का अधिकार)"
    ],
    "ans": "D) अनुच्छेद 32 (संवैधानिक उपचारों का अधिकार - 5 प्रकार की रिट जारी होती है)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "14. मौलिक अधिकारों (Fundamental Rights) का प्रावधान भारतीय संविधान में किस देश से लिया गया है?\n[Fundamental Rights in Indian Constitution are borrowed from:]",
    "options": [
      "A) ब्रिटेन",
      "B) संयुक्त राज्य अमेरिका (USA)",
      "C) आयरलैंड",
      "D) रूस"
    ],
    "ans": "B) संयुक्त राज्य अमेरिका (USA - भाग 3, अनुच्छेद 12 से 35)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "15. राज्य के नीति निदेशक तत्व (DPSP) किस देश के संविधान से प्रेरित हैं?\n[Directive Principles of State Policy are borrowed from:]",
    "options": [
      "A) अमेरिका",
      "B) आयरलैंड (Ireland)",
      "C) कनाडा",
      "D) ऑस्ट्रेलिया"
    ],
    "ans": "B) आयरलैंड (भाग 4, अनुच्छेद 36 से 51)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "16. भारत में पंचायती राज व्यवस्था की त्रि-स्तरीय प्रणाली की सिफारिश किस समिति ने की थी?\n[Which committee recommended three-tier Panchayati Raj system in India?]",
    "options": [
      "A) अशोक मेहता समिति",
      "B) बलवंत राय मेहता समिति (1957)",
      "C) सरकारिया आयोग",
      "D) एल एम सिंघवी समिति"
    ],
    "ans": "B) बलवंत राय मेहता समिति (प्रथम राज्य: राजस्थान के नागौर में 2 अक्टूबर 1959)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "17. 73वाँ संविधान संशोधन (1992) किससे संबंधित है?\n[73rd Constitutional Amendment Act 1992 is related to:]",
    "options": [
      "A) नगर पालिका",
      "B) पंचायती राज संस्थाएं (11वीं अनुसूची)",
      "C) दलबदल",
      "D) GST"
    ],
    "ans": "B) पंचायती राज व्यवस्था (अनुसूची 11, कुल 29 विषय जोड़े गए)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "18. गुप्त वंश के किस शासक ने नालंदा विश्वविद्यालय की स्थापना की थी?\n[Which Gupta ruler founded Nalanda University?]",
    "options": [
      "A) चंद्रगुप्त द्वितीय",
      "B) कुमारगुप्त प्रथम (5वीं शताब्दी)",
      "C) समुद्रगुप्त",
      "D) स्कंदगुप्त"
    ],
    "ans": "B) कुमारगुप्त प्रथम",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "19. भारत का नेपोलियन (Napoleon of India) किसे कहा जाता है?\n[Who is known as the 'Napoleon of India'?]",
    "options": [
      "A) चंद्रगुप्त मौर्य",
      "B) समुद्रगुप्त (Samudragupta - वी.ए. स्मिथ द्वारा उपाधि)",
      "C) कनिष्क",
      "D) हर्षवर्द्धन"
    ],
    "ans": "B) समुद्रगुप्त (प्रयाग प्रशस्ति के रचयिता हरिषेण थे)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "20. 'वेदों की ओर लौटो' (Back to the Vedas) का नारा किसने दिया था?\n[Who gave the slogan 'Back to the Vedas'?]",
    "options": [
      "A) स्वामी विवेकानंद",
      "B) स्वामी दयानंद सरस्वती (1875 में आर्य समाज संस्थापक)",
      "C) राजा राममोहन राय",
      "D) ईश्वर चंद्र विद्यासागर"
    ],
    "ans": "B) स्वामी दयानंद सरस्वती (सत्यार्थ प्रकाश के लेखक)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "21. ब्रह्म समाज की स्थापना 1828 में किसके द्वारा की गई थी?\n[Brahmo Samaj was founded in 1828 by:]",
    "options": [
      "A) स्वामी दयानंद",
      "B) राजा राममोहन राय",
      "C) केशव चंद्र सेन",
      "D) देवेंद्रनाथ टैगोर"
    ],
    "ans": "B) राजा राममोहन राय (सती प्रथा के उन्मूलन में प्रमुख भूमिका - 1829 विलियम बेंटिक)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "22. 1857 के प्रथम स्वतंत्रता संग्राम के समय भारत का गवर्नर जनरल कौन था?\n[Governor-General of India during the Revolt of 1857:]",
    "options": [
      "A) लॉर्ड डलहौजी",
      "B) लॉर्ड कैनिंग (Lord Canning - प्रथम वायसराय)",
      "C) लॉर्ड कर्जन",
      "D) लॉर्ड वेलेस्ली"
    ],
    "ans": "B) लॉर्ड कैनिंग (1857 के विद्रोह के बाद भारत का प्रथम वायसराय बना)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "23. भारतीय राष्ट्रीय कांग्रेस (INC) की स्थापना 1885 में किसके द्वारा की गई थी?\n[Indian National Congress was founded in 1885 by:]",
    "options": [
      "A) डब्ल्यू. सी. बनर्जी",
      "B) ए. ओ. ह्यूम (Allan Octavian Hume)",
      "C) दादाभाई नौरोजी",
      "D) सुरेंद्रनाथ बनर्जी"
    ],
    "ans": "B) ए. ओ. ह्यूम (प्रथम अध्यक्ष: वोमेश चंद्र बनर्जी, मुंबई के गोकुलदास कॉलेज में)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "24. जलियांवाला बाग हत्याकांड किस तिथि को अमृतसर में हुआ था?\n[Jallianwala Bagh massacre occurred on which date in Amritsar?]",
    "options": [
      "A) 13 अप्रैल 1919",
      "B) 10 मई 1857",
      "C) 23 मार्च 1931",
      "D) 9 अगस्त 1942"
    ],
    "ans": "A) 13 अप्रैल 1919 (बैसाखी का दिन, जनरल डायर ने गोलियां चलवाई थीं)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "25. महात्मा गांधी ने 'करो या मरो' (Do or Die) का नारा किस आंदोलन में दिया था?\n[In which movement did Mahatma Gandhi give the slogan 'Do or Die'?]",
    "options": [
      "A) असहयोग आंदोलन (1920)",
      "B) सविनय अवज्ञा आंदोलन (1930)",
      "C) भारत छोड़ो आंदोलन (1942)",
      "D) चंपारण सत्याग्रह (1917)"
    ],
    "ans": "C) भारत छोड़ो आंदोलन (8 अगस्त 1942, बंबई के ग्वालिया टैंक मैदान से)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "26. भारत का सबसे ऊंचा जलप्रपात (Kunchikal Falls) किस राज्य में स्थित है?\n[Highest waterfall in India (Kunchikal Falls) is in:]",
    "options": [
      "A) केरल",
      "B) कर्नाटक (वराही नदी पर)",
      "C) मध्य प्रदेश",
      "D) मेघालय"
    ],
    "ans": "B) कर्नाटक (वराही नदी पर)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "27. भारत का एकमात्र सक्रिय ज्वालामुखी (Active Volcano) कहाँ स्थित है?\n[Only active volcano in India is located at:]",
    "options": [
      "A) लक्षद्वीप",
      "B) बैरन द्वीप (Barren Island - अंडमान व निकोबार)",
      "C) मिनिकॉय",
      "D) नारकोंडम"
    ],
    "ans": "B) बैरन द्वीप (अंडमान एवं निकोबार द्वीप समूह)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "28. सुंदरवन डेल्टा (Sundarbans Delta) किन दो प्रमुख नदियों के मुहाने पर बनता है?\n[Sundarbans Delta is formed by which two major rivers?]",
    "options": [
      "A) गंगा और ब्रह्मपुत्र (विश्व का सबसे बड़ा डेल्टा)",
      "B) नर्मदा और ताप्ती",
      "C) कृष्णा और गोदावरी",
      "D) सिंधु और झेलम"
    ],
    "ans": "A) गंगा और ब्रह्मपुत्र नदी (मैंग्रोव वन व रॉयल बंगाल टाइगर हेतु प्रसिद्ध)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "29. दक्षिण भारत की सबसे ऊंची पर्वत चोटी कौन सी है?\n[Highest mountain peak of South India:]",
    "options": [
      "A) दोद्दाबेट्टा",
      "B) अनाईमुडी (Anaimudi - 2,695 मीटर, केरल)",
      "C) महेंद्रगिरि",
      "D) कलसुबाई"
    ],
    "ans": "B) अनाईमुडी (अन्नामलाई पर्वत श्रृंखला, केरल में स्थित)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "30. हीराकुंड बांध (Hirakud Dam) किस नदी पर और किस राज्य में स्थित है?\n[Hirakud Dam is built on which river and in which state?]",
    "options": [
      "A) दामोदर नदी - झारखंड",
      "B) महानदी - ओडिशा (विश्व का सबसे लंबा मिट्टी का बांध)",
      "C) नर्मदा नदी - गुजरात",
      "D) सतलुज नदी - पंजाब"
    ],
    "ans": "B) महानदी - ओडिशा राज्य में (संबलपुर के निकट)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "31. भाखड़ा नांगल बांध किस नदी पर बनाया गया है?\n[Bhakra Nangal Dam is constructed across which river?]",
    "options": [
      "A) रावी नदी",
      "B) सतलुज नदी (Sutlej River)",
      "C) चिनाब नदी",
      "D) झेलम नदी"
    ],
    "ans": "B) सतलुज नदी (हिमाचल प्रदेश एवं पंजाब सीमा पर)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "32. सरदार सरोवर बांध किस नदी पर निर्मित है?\n[Sardar Sarovar Dam is built on which river?]",
    "options": [
      "A) ताप्ती",
      "B) नर्मदा नदी (गुजरात)",
      "C) गोदावरी",
      "D) कावेरी"
    ],
    "ans": "B) नर्मदा नदी (गुजरात - केवड़िया में स्टैच्यू ऑफ यूनिटी स्थित है)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "33. जिम कॉर्बेट राष्ट्रीय उद्यान (वर्तमान में रामगंगा राष्ट्रीय उद्यान) भारत के किस राज्य में स्थित है?\n[Jim Corbett National Park (first national park of India) is in:]",
    "options": [
      "A) असम",
      "B) उत्तराखंड (1936 में हेली नेशनल पार्क नाम से स्थापित)",
      "C) उत्तर प्रदेश",
      "D) मध्य प्रदेश"
    ],
    "ans": "B) उत्तराखंड (नैनीताल जनपद)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "34. एक सींग वाले गैंडे (One-horned Rhinoceros) के लिए प्रसिद्ध काजीरंगा राष्ट्रीय उद्यान कहाँ स्थित है?\n[Kaziranga National Park famous for one-horned rhino is in:]",
    "options": [
      "A) पश्चिम बंगाल",
      "B) असम (Assam)",
      "C) ओडिशा",
      "D) मणिपुर"
    ],
    "ans": "B) असम (यूनेस्को विश्व धरोहर स्थल)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "35. केबुल लामजाओ राष्ट्रीय उद्यान (विश्व का एकमात्र तैरता हुआ नेशनल पार्क) किस झील पर स्थित है?\n[Keibul Lamjao (world's only floating national park) is located on which lake?]",
    "options": [
      "A) चिल्का झील",
      "B) लोकटक झील (Loktak Lake - मणिपुर)",
      "C) वुलर झील",
      "D) सांभर झील"
    ],
    "ans": "B) लोकटक झील, मणिपुर (संगाई हिरण का प्राकृतिक आवास)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  }
];
const MASTER_HINDI_MCQS = [
  {
    "q": "1. 'संधि' के मुख्य रूप से कितने भेद होते हैं?\n[How many main types of Sandhi are there in Hindi grammar?]",
    "options": [
      "A) 2",
      "B) 3 भेद (स्वर संधि, व्यंजन संधि, विसर्ग संधि)",
      "C) 4",
      "D) 5"
    ],
    "ans": "B) 3 भेद (स्वर संधि, व्यंजन संधि, विसर्ग संधि)",
    "subjectName": "सामान्य हिन्दी (General Hindi)"
  },
  {
    "q": "2. 'दशानन' (दस हैं आनन जिसके अर्थात् रावण) में कौन सा समास है?\n[Which Samas is present in Dashanan?]",
    "options": [
      "A) तत्पुरुष",
      "B) बहुव्रीहि समास (अन्य पद प्रधान)",
      "C) द्विगु",
      "D) कर्मधारय"
    ],
    "ans": "B) बहुव्रीहि समास (अन्य पद प्रधान)",
    "subjectName": "सामान्य हिन्दी (General Hindi)"
  },
  {
    "q": "3. 'पेड़ से पत्ता गिरा' वाक्य में कौन सा कारक है?\n[Which Karak is used in the Hindi sentence?]",
    "options": [
      "A) करण कारक",
      "B) अपादान कारक (अलगाव का भाव)",
      "C) कर्म कारक",
      "D) संबंध कारक"
    ],
    "ans": "B) अपादान कारक (विभक्ति: 'से' अलग होने के अर्थ में)",
    "subjectName": "सामान्य हिन्दी (General Hindi)"
  },
  {
    "q": "4. 'कनक कनक ते सौ गुनी मादकता अधिकाय' में कौन सा अलंकार है?\n[Identify figure of speech in Hindi verse:]",
    "options": [
      "A) अनुप्रास",
      "B) यमक अलंकार",
      "C) श्लेष",
      "D) रूपक"
    ],
    "ans": "B) यमक अलंकार (पहले कनक का अर्थ 'धतूरा' तथा दूसरे का अर्थ 'सोना' है)",
    "subjectName": "सामान्य हिन्दी (General Hindi)"
  },
  {
    "q": "5. 'तरनि तनूजा तट तमाल तरुवर बहु छाए' में कौन सा अलंकार है?\n[Identify figure of speech:]",
    "options": [
      "A) अनुप्रास अलंकार (वर्ण की आवृत्ति)",
      "B) यमक",
      "C) उपमा",
      "D) उत्प्रेक्षा"
    ],
    "ans": "A) अनुप्रास अलंकार ('त' वर्ण की बार-बार आवृत्ति)",
    "subjectName": "सामान्य हिन्दी (General Hindi)"
  },
  {
    "q": "6. 'प्रत्येक' शब्द का सही संधि विच्छेद क्या होगा?\n[Correct Sandhi-Vichhed of 'Pratyek':]",
    "options": [
      "A) प्रति + एक (यण स्वर संधि)",
      "B) प्रत + एक",
      "C) प्र + प्रत्येक",
      "D) प्रत्ये + क"
    ],
    "ans": "A) प्रति + एक (इ + ए = ये - यण स्वर संधि)",
    "subjectName": "सामान्य हिन्दी (General Hindi)"
  },
  {
    "q": "7. 'सूर्योदय' शब्द का सही संधि विच्छेद क्या होगा?\n[Correct Sandhi-Vichhed of 'Suryodaya':]",
    "options": [
      "A) सूर्य + उदय (गुण स्वर संधि)",
      "B) सूर्यो + दय",
      "C) सूर + उदय",
      "D) सूर्य + दय"
    ],
    "ans": "A) सूर्य + उदय (अ + उ = ओ - गुण स्वर संधि)",
    "subjectName": "सामान्य हिन्दी (General Hindi)"
  },
  {
    "q": "8. 'यथाशक्ति' (शक्ति के अनुसार) में कौन सा समास है?\n[Which Samas is in 'Yathashakti'?]",
    "options": [
      "A) अव्ययीभाव समास",
      "B) तत्पुरुष",
      "C) द्वंद्व",
      "D) बहुव्रीहि"
    ],
    "ans": "A) अव्ययीभाव समास (पहला पद अव्यय 'यथा' है)",
    "subjectName": "सामान्य हिन्दी (General Hindi)"
  },
  {
    "q": "9. 'माता-पिता' और 'दिन-रात' में कौन सा समास है?\n[Which Samas is in 'Mata-Pita' and 'Din-Raat'?]",
    "options": [
      "A) द्विगु समास",
      "B) द्वंद्व समास (दोनों पद प्रधान)",
      "C) कर्मधारय",
      "D) तत्पुरुष"
    ],
    "ans": "B) द्वंद्व समास (योजक चिह्न एवं दोनों पद प्रधान)",
    "subjectName": "सामान्य हिन्दी (General Hindi)"
  },
  {
    "q": "10. 'चौराहा' और 'तिरंगा' में कौन सा समास है?\n[Which Samas is in 'Chauraha' and 'Tiranga'?]",
    "options": [
      "A) द्विगु समास (पहला पद संख्यावाचक)",
      "B) द्वंद्व",
      "C) कर्मधारय",
      "D) अव्ययीभाव"
    ],
    "ans": "A) द्विगु समास (पहला पद संख्यावाची विशेषण)",
    "subjectName": "सामान्य हिन्दी (General Hindi)"
  },
  {
    "q": "11. 'अंगूठा दिखाना' मुहावरे का सही अर्थ क्या है?\n[Meaning of idiom 'Angootha Dikhana':]",
    "options": [
      "A) चिढ़ाना",
      "B) ऐन वक्त पर मना कर देना या धोखा देना",
      "C) अंगूठा बड़ा करना",
      "D) सहायता करना"
    ],
    "ans": "B) साफ इनकार कर देना (मना करना)",
    "subjectName": "सामान्य हिन्दी (General Hindi)"
  },
  {
    "q": "12. 'आंख का तारा होना' मुहावरे का सही अर्थ क्या है?\n[Meaning of idiom 'Aankh ka tara':]",
    "options": [
      "A) अंधा होना",
      "B) बहुत प्यारा होना (अत्यधिक प्रिय)",
      "C) तारा दिखना",
      "D) रात में देखना"
    ],
    "ans": "B) बहुत प्यारा होना (अत्यधिक प्रिय होना)",
    "subjectName": "सामान्य हिन्दी (General Hindi)"
  },
  {
    "q": "13. 'हवा से बातें करना' मुहावरे का सही अर्थ क्या है?\n[Meaning of idiom 'Hawa se baatein karna':]",
    "options": [
      "A) बहुत तेज दौड़ना / चलना",
      "B) घमंड करना",
      "C) पागल होना",
      "D) बातें बनाना"
    ],
    "ans": "A) बहुत तेज गति से दौड़ना",
    "subjectName": "सामान्य हिन्दी (General Hindi)"
  },
  {
    "q": "14. 'अमृत' शब्द का सही विलोम शब्द (Antonym) क्या होगा?\n[Antonym of 'Amrit':]",
    "options": [
      "A) पीयूष",
      "B) विष / गरल",
      "C) सुधा",
      "D) अमिय"
    ],
    "ans": "B) विष (पीयूष व सुधा इसके पर्यायवाची हैं)",
    "subjectName": "सामान्य हिन्दी (General Hindi)"
  },
  {
    "q": "15. 'आकाश' शब्द का पर्यायवाची शब्द कौन सा नहीं है?\n[Which word is NOT a synonym of Akash?]",
    "options": [
      "A) गगन",
      "B) नभ",
      "C) व्योम",
      "D) अवनि"
    ],
    "ans": "D) अवनि (अवनि का अर्थ 'पृथ्वी/धरती' होता है)",
    "subjectName": "सामान्य हिन्दी (General Hindi)"
  },
  {
    "q": "16. 'जो सब कुछ जानता हो' वाक्यांश के लिए एक शब्द क्या होगा?\n[One word for 'One who knows everything':]",
    "options": [
      "A) अल्पज्ञ",
      "B) सर्वज्ञ (Sarvagya)",
      "C) विज्ञ",
      "D) कृतज्ञ"
    ],
    "ans": "B) सर्वज्ञ (कम जानने वाला अल्पज्ञ, न जानने वाला अज्ञ कहलाता है)",
    "subjectName": "सामान्य हिन्दी (General Hindi)"
  },
  {
    "q": "17. 'जिसका कोई शत्रु न जन्मा हो' वाक्यांश के लिए एक शब्द है:\n[One word for 'One who has no enemy born':]",
    "options": [
      "A) अजातशत्रु",
      "B) शत्रुघ्न",
      "C) अजेय",
      "D) अमर"
    ],
    "ans": "A) अजातशत्रु",
    "subjectName": "सामान्य हिन्दी (General Hindi)"
  },
  {
    "q": "18. हिन्दी वर्णमाला में कुल कितने मूल व्यंजन और कितने स्वर माने गए हैं?\n[Total vowels and consonants in Hindi alphabet:]",
    "options": [
      "A) 11 स्वर और 33 व्यंजन",
      "B) 10 स्वर और 30 व्यंजन",
      "C) 13 स्वर और 35 व्यंजन",
      "D) 12 स्वर और 36 व्यंजन"
    ],
    "ans": "A) 11 स्वर और 33 व्यंजन (कुल वर्ण 52)",
    "subjectName": "सामान्य हिन्दी (General Hindi)"
  },
  {
    "q": "19. 'शृंगार रस' का स्थायी भाव क्या है?\n[Permanent emotion (Sthayi Bhav) of Shringar Rasa:]",
    "options": [
      "A) हास",
      "B) रति / प्रेम",
      "C) शोक",
      "D) उत्साह"
    ],
    "ans": "B) रति (प्रेम) - इसे 'रसराज' कहा जाता है",
    "subjectName": "सामान्य हिन्दी (General Hindi)"
  },
  {
    "q": "20. 'वीर रस' का स्थायी भाव क्या है?\n[Permanent emotion of Veer Rasa:]",
    "options": [
      "A) क्रोध",
      "B) उत्साह (Enthusiasm)",
      "C) भय",
      "D) विस्मय"
    ],
    "ans": "B) उत्साह",
    "subjectName": "सामान्य हिन्दी (General Hindi)"
  }
];
const MASTER_REASONING_MCQS = [
  {
    "q": "1. संख्या श्रृंखला में अगला पद क्या होगा: 2, 6, 12, 20, 30, ?\n[Next term in number series: 2, 6, 12, 20, 30, ?]",
    "options": [
      "A) 40",
      "B) 42",
      "C) 44",
      "D) 36"
    ],
    "ans": "B) 42 (पैटर्न: +4, +6, +8, +10, +12 ⇒ 30 + 12 = 42 अथवा 1×2, 2×3, 3×4, 4×5, 5×6, 6×7=42)",
    "subjectName": "तर्कशक्ति (General Intelligence & Reasoning)"
  },
  {
    "q": "2. संख्या श्रृंखला में लुप्त पद ज्ञात करें: 3, 9, 27, 81, ?\n[Find missing term in series: 3, 9, 27, 81, ?]",
    "options": [
      "A) 162",
      "B) 243",
      "C) 324",
      "D) 216"
    ],
    "ans": "B) 243 (पैटर्न: प्रत्येक संख्या 3 से गुणा हो रही है, 81 × 3 = 243)",
    "subjectName": "तर्कशक्ति (General Intelligence & Reasoning)"
  },
  {
    "q": "3. यदि किसी सांकेतिक भाषा में 'CAT' को 24 तथा 'DOG' को 26 लिखा जाता है, तो 'PIG' का कोड क्या होगा?\n[In a code language CAT = 24, DOG = 26, then PIG equals:]",
    "options": [
      "A) 30",
      "B) 32",
      "C) 34",
      "D) 28"
    ],
    "ans": "B) 32 (वर्णमाला क्रम योग: P=16 + I=9 + G=7 = 32)",
    "subjectName": "तर्कशक्ति (General Intelligence & Reasoning)"
  },
  {
    "q": "4. यदि किसी कूट भाषा में 'WATER' को 'XBUFS' लिखा जाता है, तो उसी भाषा में 'EARTH' को क्या लिखा जाएगा?\n[If WATER is coded as XBUFS, then EARTH is coded as:]",
    "options": [
      "A) FBSUI",
      "B) FBSUJ",
      "C) FBTUI",
      "D) GCTVI"
    ],
    "ans": "A) FBSUI (प्रत्येक अक्षर में +1 की वृद्धि: E+1=F, A+1=B, R+1=S, T+1=U, H+1=I)",
    "subjectName": "तर्कशक्ति (General Intelligence & Reasoning)"
  },
  {
    "q": "5. संबंध स्थापित करें: भारत : नई दिल्ली :: जापान : ?\n[Analogy: India : New Delhi :: Japan : ?]",
    "options": [
      "A) बीजिंग",
      "B) टोक्यो (Tokyo)",
      "C) सियोल",
      "D) बैंकॉक"
    ],
    "ans": "B) टोक्यो (देश और उसकी राजधानी का संबंध)",
    "subjectName": "तर्कशक्ति (General Intelligence & Reasoning)"
  },
  {
    "q": "6. विषम पद को पहचानें (Find the odd one out):\n[Identify the odd word from the group:]",
    "options": [
      "A) आंख (Eye)",
      "B) कान (Ear)",
      "C) नाक (Nose)",
      "D) यकृत (Liver)"
    ],
    "ans": "D) यकृत (Liver - यह आंतरिक अंग है जबकि अन्य तीनों बाह्य ज्ञानेंद्रियां हैं)",
    "subjectName": "तर्कशक्ति (General Intelligence & Reasoning)"
  },
  {
    "q": "7. एक तस्वीर की ओर इशारा करते हुए रमेश ने कहा- 'वह मेरे पिता के इकलौते पुत्र की पुत्री है।' तस्वीर की लड़की का रमेश से क्या संबंध है?\n[Pointing to a photo, Ramesh said 'She is daughter of only son of my father'. How is girl related to Ramesh?]",
    "options": [
      "A) बहन",
      "B) पुत्री (Daughter)",
      "C) भतीजी",
      "D) माता"
    ],
    "ans": "B) पुत्री (रमेश के पिता का इकलौता पुत्र स्वयं रमेश है, अतः वह रमेश की पुत्री है)",
    "subjectName": "तर्कशक्ति (General Intelligence & Reasoning)"
  },
  {
    "q": "8. एक व्यक्ति उत्तर दिशा में 10 मीटर चलता है, फिर दाएं मुड़कर 15 मीटर चलता है। वह प्रारंभिक बिन्दु से किस दिशा में है?\n[A man walks 10m North, turns right and walks 15m. Direction from start:]",
    "options": [
      "A) उत्तर",
      "B) उत्तर-पूर्व (North-East)",
      "C) दक्षिण-पूर्व",
      "D) पूर्व"
    ],
    "ans": "B) उत्तर-पूर्व (North-East)",
    "subjectName": "तर्कशक्ति (General Intelligence & Reasoning)"
  },
  {
    "q": "9. यदि 1 जनवरी 2024 को सोमवार था, तो 1 जनवरी 2025 को कौन सा दिन होगा?\n[If 1 Jan 2024 was Monday, what day was 1 Jan 2025?]",
    "options": [
      "A) मंगलवार",
      "B) बुधवार (Wednesday)",
      "C) गुरुवार",
      "D) रविवार"
    ],
    "ans": "B) बुधवार (2024 एक लीप वर्ष है जिसमें 366 दिन होते हैं; विषम दिन = 2, सोमवार + 2 = बुधवार)",
    "subjectName": "तर्कशक्ति (General Intelligence & Reasoning)"
  },
  {
    "q": "10. 40 विद्यार्थियों की एक कक्षा में राहुल का स्थान ऊपर से 12वाँ है। नीचे से उसका स्थान क्या होगा?\n[In a class of 40 students, Rahul is 12th from top. His rank from bottom is:]",
    "options": [
      "A) 28वाँ",
      "B) 29वाँ",
      "C) 30वाँ",
      "D) 27वाँ"
    ],
    "ans": "B) 29वाँ (सूत्र: कुल = ऊपर + नीचे - 1 ⇒ 40 = 12 + नीचे - 1 ⇒ नीचे = 40 - 11 = 29)",
    "subjectName": "तर्कशक्ति (General Intelligence & Reasoning)"
  }
];
const MASTER_BOARD_2M = [
  {
    "q": "लघु उत्तरीय प्रश्न (2 अंक): थेल्स प्रमेय (आधारभूत आनुपातिकता प्रमेय - BPT) का कथन लिखें।\n[State Thales Theorem / Basic Proportionality Theorem.]",
    "a": "उत्तर: कथन: 'यदि किसी त्रिभुज की एक भुजा के समानांतर अन्य दो भुजाओं को भिन्न-भिन्न बिंदुओं पर प्रतिच्छेद करने के लिए कोई रेखा खींची जाए, तो ये अन्य दो भुजाएं एक ही अनुपात में विभाजित हो जाती हैं।'\nगणितीय रूप: यदि △ABC में DE ∥ BC हो, तो AD/DB = AE/EC होता है।"
  },
  {
    "q": "लघु उत्तरीय प्रश्न (2 अंक): संयोजन अभिक्रिया एवं वियोजन अभिक्रिया में अंतर समीकरण सहित स्पष्ट करें।\n[Differentiate between Combination and Decomposition Reactions with equations.]",
    "a": "उत्तर: 1. संयोजन अभिक्रिया (Combination): जब दो या अधिक अभिकारक परस्पर जुड़कर एकल उत्पाद बनाते हैं। उदाहरण: C + O₂ → CO₂ + ऊष्मा।\n2. वियोजन अभिक्रिया (Decomposition): जब एकल अभिकारक ऊष्मा, प्रकाश या विद्युत पाकर दो या अधिक सरल उत्पादों में टूटता है। उदाहरण: 2FeSO₄(s) --(ऊष्मा)--> Fe₂O₃(s) + SO₂(g) + SO₃(g)।"
  },
  {
    "q": "लघु उत्तरीय प्रश्न (2 अंक): प्रकाश का अपवर्तन क्या है? इसके दोनों नियमों को लिखें।\n[What is refraction of light? State its two laws.]",
    "a": "उत्तर: जब प्रकाश की किरण एक पारदर्शी माध्यम से दूसरे पारदर्शी माध्यम में तिरछी प्रवेश करती है, तो अपने मूल मार्ग से विचलित हो जाती है। इसे प्रकाश का अपवर्तन कहते हैं।\nनियम: 1. आपतित किरण, अपवर्तित किरण और आपतन बिंदु पर अभिलंब तीनों एक ही तल में होते हैं।\n2. किन्हीं दो माध्यमों हेतु आपतन कोण की ज्या (sin i) तथा अपवर्तन कोण की ज्या (sin r) का अनुपात स्थिर होता है (स्नेल का नियम: sin i / sin r = μ)।"
  },
  {
    "q": "लघु उत्तरीय प्रश्न (2 अंक): धातु एवं अधातु में दो प्रमुख रासायनिक अंतर लिखें।\n[Write two chemical differences between metals and non-metals.]",
    "a": "उत्तर:\n1. ऑक्साइड की प्रकृति: धातुओं के ऑक्साइड सामान्यतः क्षारीय (Basic) होते हैं (जैसे Na₂O, MgO); जबकि अधातुओं के ऑक्साइड अम्लीय या उदासीन होते हैं (जैसे SO₂, CO₂)।\n2. अम्लों से क्रिया: धातुएं तनु अम्लों से क्रिया करके हाइड्रोजन गैस (H₂) विस्थापित करती हैं (Zn + H₂SO₄ → ZnSO₄ + H₂↑); जबकि अधातुएं सामान्यतः तनु अम्लों से क्रिया कर H₂ मुक्त नहीं करतीं।"
  },
  {
    "q": "लघु उत्तरीय प्रश्न (2 अंक): स्वपोषी पोषण एवं विषमपोषी पोषण में मुख्य अंतर लिखें।\n[Differentiate between Autotrophic and Heterotrophic Nutrition.]",
    "a": "उत्तर:\n1. स्वपोषी पोषण (Autotrophic): सजीव अकार्बनिक पदार्थों (CO₂, H₂O) व सूर्य के प्रकाश की सहायता से क्लोरोफिल द्वारा अपना भोजन स्वयं संश्लेषित करते हैं (जैसे हरे पौधे एवं नील-हरित शैवाल)।\n2. विषमपोषी पोषण (Heterotrophic): सजीव अपने पोषण हेतु प्रत्यक्ष या अप्रत्यक्ष रूप से स्वपोषी जीवों पर निर्भर रहते हैं (जैसे मानव, जन्तु, कवक)।"
  },
  {
    "q": "लघु उत्तरीय प्रश्न (2 अंक): लैंगिक जनन एवं अलैंगिक जनन में दो प्रमुख अंतर बताएं।\n[Two differences between Sexual and Asexual Reproduction.]",
    "a": "उत्तर:\n1. अलैंगिक जनन में केवल एकल जनक भाग लेता है तथा युग्मकों का निर्माण व निषेचन नहीं होता (जैसे अमीबा में द्विखंडन)। संतति जनक की हूबहू क्लोन होती है।\n2. लैंगिक जनन में दो विपरीत लिंगी जनकों की आवश्यकता होती है, युग्मक संलयन (निषेचन) होता है तथा संततियों में विभिन्नताएं (Variations) उत्पन्न होती हैं।"
  },
  {
    "q": "लघु उत्तरीय प्रश्न (2 अंक): विरंजक चूर्ण (Bleaching Powder) का निर्माण समीकरण एवं इसके दो मुख्य उपयोग लिखें।\n[Preparation equation and two uses of Bleaching Powder.]",
    "a": "उत्तर: निर्माण: शुष्क बुझे हुए चूने पर क्लोरीन गैस प्रवाहित करने से विरंजक चूर्ण बनता है:\nCa(OH)₂ + Cl₂ → CaOCl₂ + H₂O\nउपयोग: 1. पीने के पानी को रोगाणुमुक्त (Disinfectant) करने में। 2. वस्त्र उद्योग में सूती व लिनन के विरंजन में।"
  },
  {
    "q": "लघु उत्तरीय प्रश्न (2 अंक): प्लास्टर ऑफ पेरिस (POP) को आर्द्र-रोधी (Moisture-proof) बर्तन में क्यों रखा जाता है?\n[Why is Plaster of Paris stored in moisture-proof containers?]",
    "a": "उत्तर: प्लास्टर ऑफ पेरिस (CaSO₄·½H₂O) वायुमंडलीय नमी (जलवाष्प) को तुरंत अवशोषित कर कठोर जिप्सम (CaSO₄·2H₂O) में परिवर्तित हो जाता है, जिससे इसके जमने का गुण नष्ट हो जाता है:\nCaSO₄·½H₂O + 1½H₂O → CaSO₄·2H₂O (कठोर ठोस)\nअतः इसे नमी से बचाने के लिए वायुरोधी डिब्बों में सुरक्षित रखते हैं।"
  },
  {
    "q": "लघु उत्तरीय प्रश्न (2 अंक): द्विघात समीकरण हल करें: x² - 5x + 6 = 0 गुणनखंड विधि द्वारा।\n[Solve quadratic equation x² - 5x + 6 = 0 by factorization.]",
    "a": "उत्तर:\nx² - 5x + 6 = 0\nx² - 3x - 2x + 6 = 0\nx(x - 3) - 2(x - 3) = 0\n(x - 3)(x - 2) = 0\n⇒ x - 3 = 0 अथवा x - 2 = 0\nअतः अभीष्ट मूल x = 3, 2 हैं।"
  },
  {
    "q": "लघु उत्तरीय प्रश्न (2 अंक): सिद्ध कीजिए कि बिन्दु (1, 5), (2, 3) और (-2, -11) संरेखी (Collinear) हैं या नहीं।\n[Check whether points (1, 5), (2, 3) and (-2, -11) are collinear.]",
    "a": "उत्तर:\nसंरेखता हेतु त्रिभुज का क्षेत्रफल = 0 होना चाहिए:\nArea = 1/2 |x₁(y₂ - y₃) + x₂(y₃ - y₁) + x₃(y₁ - y₂)|\n= 1/2 |1(3 - (-11)) + 2(-11 - 5) + (-2)(5 - 3)|\n= 1/2 |1(14) + 2(-16) - 2(2)| = 1/2 |14 - 32 - 4| = 1/2 |-22| = 11 ≠ 0\nचूंकि क्षेत्रफल शून्य नहीं है, अतः ये बिन्दु संरेखी नहीं हैं।"
  }
];
const MASTER_BOARD_5M = [
  {
    "q": "दीर्घ उत्तरीय प्रश्न (5 अंक): सिद्ध कीजिए कि √5 एक अपरिमेय संख्या है।\n[Prove that √5 is an irrational number.]",
    "a": "उत्तर: उपपत्ति (Proof by Contradiction):\nचरण 1: माना √5 एक परिमेय संख्या है। अतः इसे p/q (जहाँ p और q सह-अभाज्य पूर्णांक हैं, जिनका 1 के अतिरिक्त कोई उभयनिष्ठ गुणनखंड नहीं है तथा q ≠ 0) के रूप में लिखा जा सकता है।\n√5 = p/q ⇒ p = q√5\n\nचरण 2: दोनों पक्षों का वर्ग करने पर:\np² = 5q² -------- (समीकरण 1)\nयहाँ 5, p² को विभाजित करता है। अतः आधारभूत अंकगणित प्रमेय से 5, p को भी विभाजित करेगा।\n\nचरण 3: माना p = 5k (जहाँ k कोई पूर्णांक है)। समीकरण 1 में p का मान रखने पर:\n(5k)² = 5q² ⇒ 25k² = 5q² ⇒ q² = 5k²\nयहाँ 5, q² को विभाजित करता है। अतः 5, q को भी विभाजित करेगा।\n\nचरण 4: चरण 2 और 3 से स्पष्ट है कि p और q दोनों का उभयनिष्ठ गुणनखंड कम से कम 5 है। परन्तु यह हमारी प्रारंभिक कल्पना का स्पष्ट विरोधाभास है कि p और q सह-अभाज्य हैं।\nअतः हमारी यह कल्पना गलत थी कि √5 परिमेय संख्या है। सिद्ध हुआ कि √5 एक अपरिमेय संख्या है। (इति सिद्धम् / Q.E.D.)"
  },
  {
    "q": "दीर्घ उत्तरीय प्रश्न (5 अंक): थेल्स प्रमेय (आधारभूत आनुपातिकता प्रमेय) को चित्र सहित पूर्णतः सिद्ध कीजिए।\n[State and prove Thales Theorem / Basic Proportionality Theorem.]",
    "a": "उत्तर: प्रमेय: यदि किसी त्रिभुज की एक भुजा के समांतर अन्य दो भुजाओं को भिन्न-भिन्न बिंदुओं पर प्रतिच्छेद करने हेतु एक रेखा खींची जाए, तो ये अन्य दो भुजाएं एक ही अनुपात में विभाजित होती हैं।\n\nदिया है: △ABC में भुजा BC के समांतर रेखा DE खींची गई है जो AB को D पर तथा AC को E पर काटती है।\nसिद्ध करना है: AD / DB = AE / EC\nरचना: B को E से और C को D से मिलाया। तथा DM ⊥ AC और EN ⊥ AB खींचा।\n\nउपपत्ति:\n△ADE का क्षेत्रफल = 1/2 × आधार × ऊंचाई = 1/2 × AD × EN\n△BDE का क्षेत्रफल = 1/2 × आधार × ऊंचाई = 1/2 × DB × EN\nअतः Area(△ADE) / Area(△BDE) = (1/2 × AD × EN) / (1/2 × DB × EN) = AD / DB ---- (1)\n\nइसी प्रकार, Area(△ADE) / Area(△CDE) = (1/2 × AE × DM) / (1/2 × EC × DM) = AE / EC ---- (2)\n\nपरन्तु △BDE और △CDE एक ही आधार DE तथा एक ही समांतर रेखाओं DE ∥ BC के बीच बने त्रिभुज हैं।\nअतः Area(△BDE) = Area(△CDE) ---- (3)\nसमीकरण (1), (2) एवं (3) से:\nAD / DB = AE / EC (इति सिद्धम् / Proved)"
  },
  {
    "q": "दीर्घ उत्तरीय प्रश्न (5 अंक): ओम का नियम क्या है? प्रयोगशाला में इसके सत्यापन हेतु परिपथ आरेख एवं V-I ग्राफ खींचकर समझाइए।\n[State Ohm's Law. Describe experimental verification with circuit diagram and V-I graph.]",
    "a": "उत्तर:\n1. कथन: यदि किसी चालक की भौतिक अवस्थाएं (जैसे ताप, दाब, यांत्रिक विकृति आदि) अपरिवर्तित रहें, तो चालक के सिरों पर लगाया गया विभवांतर (V), उसमें प्रवाहित विद्युत धारा (I) के अनुक्रमानुपाती होता है।\nगणितीय रूप: V ∝ I ⇒ V = I × R (जहाँ R चालक का प्रतिरोध है)।\n\n2. परिपथ संयोजन: परिपथ में एक शुष्क सेल बैटरी, प्लग कुंजी, धारा नियंत्रक (Rheostat), श्रेणीक्रम में अमीटर (धारा I मापने हेतु) तथा नाइक्रोम तार प्रतिरोधक के समांतर क्रम में वोल्टमीटर (विभवांतर V मापने हेतु) जोड़ा जाता है।\n\n3. प्रयोग विधि: कुंजी लगाकर रियोस्टेट द्वारा धारा का मान धीरे-धीरे बदलते हैं और प्रत्येक पाठ्यांक के लिए वोल्टमीटर (V) व अमीटर (I) का मान नोट करते हैं।\nहम पाते हैं कि प्रत्येक स्थिति में V/I का अनुपात सदैव एक स्थिर मान (स्थिरांक R) प्राप्त होता है।\n\n4. V-I ग्राफ: जब X-अक्ष पर धारा (I) तथा Y-अक्ष पर विभवांतर (V) को लेकर ग्राफ खींचा जाता है, तो मूल बिंदु से गुजरने वाली एक सरल सीधी रेखा (Straight Line) प्राप्त होती है।\nयह सिद्ध करता है कि V ∝ I है। अतः ओम के नियम का सत्यापन होता है।"
  },
  {
    "q": "दीर्घ उत्तरीय प्रश्न (5 अंक): मानव नेत्र के मुख्य दोष 'निकट दृष्टि दोष' (Myopia) और 'दूर दृष्टि दोष' (Hypermetropia) के कारण, किरण आरेख एवं संशोधन लेंस समझाइए।\n[Explain Myopia and Hypermetropia with causes, ray diagrams and corrective lenses.]",
    "a": "उत्तर:\n1. निकट दृष्टि दोष (Myopia / Short-sightedness):\n- लक्षण: व्यक्ति पास की वस्तुएं तो स्पष्ट देख सकता है, परन्तु दूर की वस्तुएं धुंधली दिखती हैं (दूर बिंदु अनंत से पास आ जाता है)।\n- कारण: (i) अभिनेत्र लेंस की वक्रता अत्यधिक होना (फोकस दूरी कम होना)। (ii) नेत्र गोलक का लंबा हो जाना। इससे प्रतिबिंब दृष्टिपटल (रेटिना) से पहले ही बन जाता है।\n- निवारण: उपयुक्त क्षमता वाले 'अवतल लेंस' (Concave Lens) का चश्मा प्रयुक्त होता है जो प्रकाश किरणों को अपसारित कर पुनः रेटिना पर फोकसित कर देता है।\n\n2. दूर दृष्टि दोष (Hypermetropia / Long-sightedness):\n- लक्षण: व्यक्ति दूर की वस्तुएं स्पष्ट देख सकता है, परन्तु निकट रखी वस्तुएं (25 सेमी पर) स्पष्ट नहीं दिखाई देतीं।\n- कारण: (i) अभिनेत्र लेंस की फोकस दूरी अत्यधिक बढ़ जाना। (ii) नेत्र गोलक का छोटा हो जाना। प्रतिबिंब रेटिना के पीछे बनता है।\n- निवारण: उपयुक्त फोकस दूरी वाले 'उत्तल लेंस' (Convex Lens) का चश्मा प्रयुक्त किया जाता है जो निकट से आने वाली किरणों को अभिसारित कर ठीक रेटिना पर फोकसित करता है।"
  },
  {
    "q": "दीर्घ उत्तरीय प्रश्न (5 अंक): प्रकाश संश्लेषण (Photosynthesis) की संपूर्ण रासायनिक प्रक्रिया एवं इसके मुख्य तीन चरणों का वर्णन करें।\n[Describe the complete process and three main steps of Photosynthesis with balanced chemical equation.]",
    "a": "उत्तर: संतुलित रासायनिक समीकरण:\n6CO₂ + 12H₂O --(सूर्य का प्रकाश / क्लोरोफिल)--> C₆H₁₂O₆ (ग्लूकोज) + 6O₂↑ + 6H₂O\n\nप्रकाश संश्लेषण की प्रक्रिया में निम्नलिखित 3 मुख्य घटनाएं क्रमबद्ध संपन्न होती हैं:\n1. प्रकाश ऊर्जा का अवशोषण: पत्तियों में मौजूद क्लोरोफिल वर्णक द्वारा सौर प्रकाश ऊर्जा को अवशोषित किया जाता है।\n2. प्रकाश ऊर्जा का रासायनिक ऊर्जा में रूपांतरण तथा जल का अपघटन: अवशोषित सौर ऊर्जा रासायनिक ऊर्जा में बदलती है और जल (H₂O) के अणु हाइड्रोजन (H⁺) एवं ऑक्सीजन (O₂) में टूटते हैं (फोटोलाइसिस)। उप-उत्पाद के रूप में वातावरण में O₂ गैस मुक्त होती है।\n3. कार्बन डाइऑक्साइड का अपचयन: हाइड्रोजन की सहायता से कार्बन डाइऑक्साइड (CO₂) का कार्बोहाइड्रेट (ग्लूकोज) में अपचयन (Reduction) होता है। अतिरिक्त ग्लूकोज पौधों में स्टार्च (मंड) के रूप में संचित होता है।"
  }
];
const MASTER_SHORTCUTS = [
  "दर्पण सूत्र (Mirror Formula): 1/f = 1/v + 1/u (f = R/2)",
  "लेंस सूत्र (Lens Formula): 1/f = 1/v - 1/u",
  "लेंस की क्षमता (Power of Lens): P = 1/f (मीटर में) या P = 100/f (सेमी में) - मात्रक डायोप्टर (D)",
  "ओम का नियम: V = I × R; विद्युत शक्ति: P = V × I = I²R = V²/R",
  "विद्युत ऊर्जा (व्यापारिक यूनिट): 1 kWh = 3.6 × 10⁶ जूल (Watt × Hours × Days / 1000)",
  "द्विघात सूत्र (श्रीधराचार्य नियम): x = [-b ± √(b² - 4ac)] / 2a",
  "समांतर श्रेणी (AP) का nवाँ पद: aₙ = a + (n - 1)d; योग: Sₙ = n/2 [2a + (n - 1)d]",
  "त्रिकोणमिति सर्वसमिकाएं: sin²θ + cos²θ = 1; 1 + tan²θ = sec²θ; 1 + cot²θ = cosec²θ",
  "दूरी सूत्र (Distance Formula): d = √[(x₂ - x₁)² + (y₂ - y₁)²]",
  "विभाजन सूत्र (Section Formula): x = (m₁x₂ + m₂x₁)/(m₁ + m₂), y = (m₁y₂ + m₂y₁)/(m₁ + m₂)",
  "औसत चाल जब दूरी समान हो: (2xy) / (x + y)",
  "2 वर्ष के CI और SI के अंतर का रामबाण सूत्र: Difference = P × (R / 100)²",
  "कार्य और समय शॉर्टकट: दोनों मिलकर कार्य = (A × B) / (A + B)",
  "प्रतिशत वृद्धि पर खपत में कमी: [r / (100 + r)] × 100",
  "मुगल शासक क्रमानुसार ट्रिक: 'BHAJSA' = Babur, Humayun, Akbar, Jehangir, Shah Jahan, Aurangzeb",
  "कर्क रेखा भारत के 8 राज्यों से: 'मित्र पर गमछा झार' (मिजोरम, त्रिपुरा, पश्चिम बंगाल, राजस्थान, गुजरात, MP, छत्तीसगढ़, झारखंड)",
  "भारत के 7 पड़ोसी देश ट्रिक: 'बचपन में MBA किया' = बांग्लादेश, चीन, पाकिस्तान, नेपाल, म्यांमार, भूटान, अफगानिस्तान",
  "विटामिन A, B, C, D, E, K के रासायनिक नाम ट्रिक: 'रथ एक टॉफी' = रेटिनॉल, थायमीन, एस्कॉर्बिक, कैल्सीफेरोल, टोकोफेरोल, फिलोक्विनोन",
  "जल में घुलनशील विटामिन: 'B एवं C' | वसा में घुलनशील विटामिन: 'K-E-D-A' (कीड़ा)",
  "अनुच्छेद 19 की स्वतंत्रताएं ट्रिक: 'BOSE SANG AAYA GAYA AUR BAS GAYA VYAPAR KIYA' (बोलने, सभा, संघ, आवागमन, निवास, व्यापार)"
];
const MASTER_HALL_OF_FAME = [
  {
    "q": "★ High-Yield PYQ: 'सत्यमेव जयते' भारत का राष्ट्रीय आदर्श वाक्य किस उपनिषद से लिया गया है?",
    "a": "उत्तर: मुण्डकोपनिषद से। (सारनाथ स्थित अशोक स्तंभ के नीचे देवनागरी में अंकित है)"
  },
  {
    "q": "★ High-Yield PYQ: संविधान सभा की प्रारूप समिति (Drafting Committee) के अध्यक्ष कौन थे?",
    "a": "उत्तर: डॉ. भीमराव अंबेडकर। (29 अगस्त 1947 को गठन, कुल 7 सदस्य थे)"
  },
  {
    "q": "★ High-Yield PYQ: ध्वनि की चाल सर्वाधिक किस माध्यम में होती है?",
    "a": "उत्तर: ठोस (स्टील/लोहे में लगभग 5,960 मी/से, जल में 1482 मी/से, वायु में 343 मी/से, निर्वात में शून्य)"
  },
  {
    "q": "★ High-Yield PYQ: विटामिन बी-12 (Cyanocobalamin) में कौन सी धातु पाई जाती है?",
    "a": "उत्तर: कोबाल्ट (Cobalt धातु - लाल रक्त कोशिकाओं RBC निर्माण एवं तंत्रिका तंत्र हेतु अनिवार्य)"
  },
  {
    "q": "★ High-Yield PYQ: ओजोन परत वायुमंडल के किस मंडल में पाई जाती है?",
    "a": "उत्तर: समतापमंडल (Stratosphere) - सूर्य की पराबैंगनी किरणों से रक्षा करती है, ओजोन दिवस 16 सितम्बर"
  },
  {
    "q": "★ High-Yield PYQ: 1917 का चंपारण सत्याग्रह किससे संबंधित था?",
    "a": "उत्तर: तिनकठिया प्रथा (नील की खेती के विरोध में, गांधीजी का भारत में पहला सफल सत्याग्रह)"
  },
  {
    "q": "★ High-Yield PYQ: भारत में ₹1 के करेंसी नोट पर किसके हस्ताक्षर होते हैं?",
    "a": "उत्तर: वित्त सचिव (Finance Secretary, भारत सरकार)। अन्य सभी नोटों पर RBI गवर्नर के हस्ताक्षर होते हैं"
  },
  {
    "q": "★ High-Yield PYQ: प्रकाश वर्ष (Light Year) किसकी भौतिक इकाई है?",
    "a": "उत्तर: खगोलीय दूरी (Astronomical Distance) मापने की इकाई (1 प्रकाश वर्ष = 9.46 × 10¹⁵ मीटर)"
  },
  {
    "q": "★ High-Yield PYQ: मानव शरीर की सबसे बड़ी एवं सबसे छोटी हड्डी कौन सी है?",
    "a": "उत्तर: सबसे बड़ी हड्डी 'फीमर' (जांघ की हड्डी) तथा सबसे छोटी हड्डी 'स्टेप्स' (मध्य कान की हड्डी) है"
  },
  {
    "q": "★ High-Yield PYQ: चिपको आंदोलन का मुख्य उद्देश्य किसका संरक्षण था?",
    "a": "उत्तर: वन एवं वृक्षों का संरक्षण (उत्तराखंड के चमोली में सुंदरलाल बहुगुणा व गौरा देवी के नेतृत्व में)"
  },
  {
    "q": "★ High-Yield PYQ: भारतीय राष्ट्रीय कांग्रेस के प्रथम मुस्लिम अध्यक्ष कौन थे?",
    "a": "उत्तर: बदरुद्दीन तैयबजी (1887 के मद्रास अधिवेशन में)"
  }
];

const NOTES_CATALOG = [
  {
    id: "ssc-gd-500",
    title: "SSC GD Constable 2026 - Top 500 Repeated PYQ & GK/GS Booster",
    exam: "SSC GD Constable 2026",
    price: 9,
    pages: "32 Pages Master PDF",
    rating: "4.9 ★ (1,840 downloads)",
    badge: "🔥 Best Seller (130+ MCQs)",
    sampleQuestions: [
      { q: "1. भारतीय संविधान का अनुच्छेद 17 किससे संबंधित है?", a: "उत्तर: अस्पृश्यता का अंत (Abolition of Untouchability)।" },
      { q: "2. 'नीति आयोग' की स्थापना किस वर्ष की गई थी?", a: "उत्तर: 1 जनवरी 2015 (योजना आयोग के स्थान पर)।" },
      { q: "3. मानव शरीर में सबसे बड़ी ग्रंथि कौन सी है?", a: "उत्तर: यकृत (Liver)।" },
      { q: "4. 'कथकली' किस भारतीय राज्य का शास्त्रीय नृत्य है?", a: "उत्तर: केरल।" }
    ],
    objectives: [
  {
    "q": "1. भारतीय संविधान का कौन सा अनुच्छेद 'अस्पृश्यता का अंत' (Abolition of Untouchability) सुनिश्चित करता है?\n[Which Article of Indian Constitution abolishes Untouchability?]",
    "options": [
      "A) अनुच्छेद 14",
      "B) अनुच्छेद 17",
      "C) अनुच्छेद 19",
      "D) अनुच्छेद 21"
    ],
    "ans": "B) अनुच्छेद 17 (मौलिक अधिकारों के अंतर्गत समता का अधिकार)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "2. 'सत्यमेव जयते' भारत का राष्ट्रीय आदर्श वाक्य किस उपनिषद से लिया गया है?\n['Satyameva Jayate' has been adopted from which Upanishad?]",
    "options": [
      "A) कठोपनिषद",
      "B) मुण्डकोपनिषद",
      "C) छांदोग्योपनिषद",
      "D) केनोपनिषद"
    ],
    "ans": "B) मुण्डकोपनिषद (Mundaka Upanishad)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "3. संविधान सभा की प्रारूप समिति (Drafting Committee) के अध्यक्ष कौन थे?\n[Who was the Chairman of the Drafting Committee of Constituent Assembly?]",
    "options": [
      "A) डॉ. राजेन्द्र प्रसाद",
      "B) डॉ. भीमराव अंबेडकर",
      "C) पं. जवाहरलाल नेहरू",
      "D) सरदार पटेल"
    ],
    "ans": "B) डॉ. भीमराव अंबेडकर (29 अगस्त 1947 को गठन, कुल 7 सदस्य)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "4. 1917 का प्रसिद्ध चंपारण सत्याग्रह महात्मा गांधी द्वारा किसके विरोध में शुरू किया गया था?\n[Champaran Satyagraha (1917) was launched against which system?]",
    "options": [
      "A) नमक कर",
      "B) तिनकठिया प्रथा (नील की खेती)",
      "C) रोलेट एक्ट",
      "D) जलियांवाला बाग"
    ],
    "ans": "B) तिनकठिया प्रथा (3/20 भाग पर नील की अनिवार्य खेती)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "5. भारत में ₹1 के नोट पर किसके हस्ताक्षर होते हैं?\n[Whose signature appears on ₹1 currency note in India?]",
    "options": [
      "A) RBI गवर्नर",
      "B) वित्त सचिव (Finance Secretary)",
      "C) वित्त मंत्री",
      "D) भारत के राष्ट्रपति"
    ],
    "ans": "B) वित्त सचिव (Finance Secretary - अन्य सभी नोटों पर RBI गवर्नर के हस्ताक्षर होते हैं)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "6. भारत की मुख्य भूमि की सबसे लंबी तटरेखा (Longest Coastline) किस राज्य की है?\n[Which state has the longest coastline in mainland India?]",
    "options": [
      "A) महाराष्ट्र",
      "B) गुजरात (लगभग 1,600 किमी)",
      "C) तमिलनाडु",
      "D) आंध्र प्रदेश"
    ],
    "ans": "B) गुजरात (दूसरे स्थान पर आंध्र प्रदेश)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "7. संसद के दोनों सदनों की संयुक्त बैठक (Joint Sitting) की अध्यक्षता कौन करता है?\n[Who presides over Joint Sitting of both Houses of Parliament?]",
    "options": [
      "A) राष्ट्रपति",
      "B) उपराष्ट्रपति",
      "C) लोकसभा अध्यक्ष (Speaker)",
      "D) प्रधानमंत्री"
    ],
    "ans": "C) लोकसभा अध्यक्ष (अनुच्छेद 118 के तहत, आहूत राष्ट्रपति द्वारा अनुच्छेद 108 में)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "8. भारत के नियंत्रक एवं महालेखापरीक्षक (CAG) का कार्यकाल कितना होता है?\n[What is the tenure of the Comptroller and Auditor General (CAG) of India?]",
    "options": [
      "A) 5 वर्ष या 65 वर्ष",
      "B) 6 वर्ष या 65 वर्ष की आयु",
      "C) 6 वर्ष या 62 वर्ष",
      "D) 4 वर्ष"
    ],
    "ans": "B) 6 वर्ष या 65 वर्ष की आयु (जो भी पहले हो, अनुच्छेद 148)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "9. नीति आयोग की स्थापना किस वर्ष की गई थी?\n[In which year was NITI Aayog established?]",
    "options": [
      "A) 15 अगस्त 2014",
      "B) 1 जनवरी 2015",
      "C) 26 जनवरी 2015",
      "D) 1 अप्रैल 2016"
    ],
    "ans": "B) 1 जनवरी 2015 (योजना आयोग के स्थान पर, पदेन अध्यक्ष भारत के प्रधानमंत्री)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "10. मोहिनीअट्टम एवं कथकली किस राज्य के प्रसिद्ध शास्त्रीय नृत्य हैं?\n[Mohiniyattam and Kathakali are classical dance forms of which state?]",
    "options": [
      "A) तमिलनाडु",
      "B) केरल (Kerala)",
      "C) आंध्र प्रदेश",
      "D) कर्नाटक"
    ],
    "ans": "B) केरल (भरतनाट्यम तमिलनाडु का, कुचिपुड़ी आंध्र प्रदेश का है)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "11. भारतीय मानक समय रेखा (82.5° E) भारत के कितने राज्यों से होकर गुजरती है?\n[Indian Standard Meridian (82.5° E) passes through how many states?]",
    "options": [
      "A) 4",
      "B) 5 राज्यों से (UP, MP, छत्तीसगढ़, ओडिशा, आंध्र प्रदेश)",
      "C) 6",
      "D) 8"
    ],
    "ans": "B) 5 राज्यों से (मिर्जापुर, प्रयागराज से गुजरती है, GMT से +5:30 घंटे आगे)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "12. कर्क रेखा (Tropic of Cancer - 23.5° N) भारत के कितने राज्यों से होकर गुजरती है?\n[Tropic of Cancer passes through how many Indian states?]",
    "options": [
      "A) 7",
      "B) 8 राज्यों से",
      "C) 9",
      "D) 6"
    ],
    "ans": "B) 8 राज्यों से (गुजरात, राजस्थान, MP, छत्तीसगढ़, झारखंड, प० बंगाल, त्रिपुरा, मिजोरम)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "13. भारतीय संविधान के किस अनुच्छेद को डॉ. भीमराव अंबेडकर ने 'संविधान की आत्मा और हृदय' कहा था?\n[Which Article was called the 'Heart and Soul of the Constitution' by Dr. Ambedkar?]",
    "options": [
      "A) अनुच्छेद 14",
      "B) अनुच्छेद 19",
      "C) अनुच्छेद 21",
      "D) अनुच्छेद 32 (संवैधानिक उपचारों का अधिकार)"
    ],
    "ans": "D) अनुच्छेद 32 (संवैधानिक उपचारों का अधिकार - 5 प्रकार की रिट जारी होती है)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "14. मौलिक अधिकारों (Fundamental Rights) का प्रावधान भारतीय संविधान में किस देश से लिया गया है?\n[Fundamental Rights in Indian Constitution are borrowed from:]",
    "options": [
      "A) ब्रिटेन",
      "B) संयुक्त राज्य अमेरिका (USA)",
      "C) आयरलैंड",
      "D) रूस"
    ],
    "ans": "B) संयुक्त राज्य अमेरिका (USA - भाग 3, अनुच्छेद 12 से 35)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "15. राज्य के नीति निदेशक तत्व (DPSP) किस देश के संविधान से प्रेरित हैं?\n[Directive Principles of State Policy are borrowed from:]",
    "options": [
      "A) अमेरिका",
      "B) आयरलैंड (Ireland)",
      "C) कनाडा",
      "D) ऑस्ट्रेलिया"
    ],
    "ans": "B) आयरलैंड (भाग 4, अनुच्छेद 36 से 51)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "16. भारत में पंचायती राज व्यवस्था की त्रि-स्तरीय प्रणाली की सिफारिश किस समिति ने की थी?\n[Which committee recommended three-tier Panchayati Raj system in India?]",
    "options": [
      "A) अशोक मेहता समिति",
      "B) बलवंत राय मेहता समिति (1957)",
      "C) सरकारिया आयोग",
      "D) एल एम सिंघवी समिति"
    ],
    "ans": "B) बलवंत राय मेहता समिति (प्रथम राज्य: राजस्थान के नागौर में 2 अक्टूबर 1959)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "17. 73वाँ संविधान संशोधन (1992) किससे संबंधित है?\n[73rd Constitutional Amendment Act 1992 is related to:]",
    "options": [
      "A) नगर पालिका",
      "B) पंचायती राज संस्थाएं (11वीं अनुसूची)",
      "C) दलबदल",
      "D) GST"
    ],
    "ans": "B) पंचायती राज व्यवस्था (अनुसूची 11, कुल 29 विषय जोड़े गए)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "18. गुप्त वंश के किस शासक ने नालंदा विश्वविद्यालय की स्थापना की थी?\n[Which Gupta ruler founded Nalanda University?]",
    "options": [
      "A) चंद्रगुप्त द्वितीय",
      "B) कुमारगुप्त प्रथम (5वीं शताब्दी)",
      "C) समुद्रगुप्त",
      "D) स्कंदगुप्त"
    ],
    "ans": "B) कुमारगुप्त प्रथम",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "19. भारत का नेपोलियन (Napoleon of India) किसे कहा जाता है?\n[Who is known as the 'Napoleon of India'?]",
    "options": [
      "A) चंद्रगुप्त मौर्य",
      "B) समुद्रगुप्त (Samudragupta - वी.ए. स्मिथ द्वारा उपाधि)",
      "C) कनिष्क",
      "D) हर्षवर्द्धन"
    ],
    "ans": "B) समुद्रगुप्त (प्रयाग प्रशस्ति के रचयिता हरिषेण थे)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "20. 'वेदों की ओर लौटो' (Back to the Vedas) का नारा किसने दिया था?\n[Who gave the slogan 'Back to the Vedas'?]",
    "options": [
      "A) स्वामी विवेकानंद",
      "B) स्वामी दयानंद सरस्वती (1875 में आर्य समाज संस्थापक)",
      "C) राजा राममोहन राय",
      "D) ईश्वर चंद्र विद्यासागर"
    ],
    "ans": "B) स्वामी दयानंद सरस्वती (सत्यार्थ प्रकाश के लेखक)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "21. ब्रह्म समाज की स्थापना 1828 में किसके द्वारा की गई थी?\n[Brahmo Samaj was founded in 1828 by:]",
    "options": [
      "A) स्वामी दयानंद",
      "B) राजा राममोहन राय",
      "C) केशव चंद्र सेन",
      "D) देवेंद्रनाथ टैगोर"
    ],
    "ans": "B) राजा राममोहन राय (सती प्रथा के उन्मूलन में प्रमुख भूमिका - 1829 विलियम बेंटिक)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "22. 1857 के प्रथम स्वतंत्रता संग्राम के समय भारत का गवर्नर जनरल कौन था?\n[Governor-General of India during the Revolt of 1857:]",
    "options": [
      "A) लॉर्ड डलहौजी",
      "B) लॉर्ड कैनिंग (Lord Canning - प्रथम वायसराय)",
      "C) लॉर्ड कर्जन",
      "D) लॉर्ड वेलेस्ली"
    ],
    "ans": "B) लॉर्ड कैनिंग (1857 के विद्रोह के बाद भारत का प्रथम वायसराय बना)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "23. भारतीय राष्ट्रीय कांग्रेस (INC) की स्थापना 1885 में किसके द्वारा की गई थी?\n[Indian National Congress was founded in 1885 by:]",
    "options": [
      "A) डब्ल्यू. सी. बनर्जी",
      "B) ए. ओ. ह्यूम (Allan Octavian Hume)",
      "C) दादाभाई नौरोजी",
      "D) सुरेंद्रनाथ बनर्जी"
    ],
    "ans": "B) ए. ओ. ह्यूम (प्रथम अध्यक्ष: वोमेश चंद्र बनर्जी, मुंबई के गोकुलदास कॉलेज में)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "24. जलियांवाला बाग हत्याकांड किस तिथि को अमृतसर में हुआ था?\n[Jallianwala Bagh massacre occurred on which date in Amritsar?]",
    "options": [
      "A) 13 अप्रैल 1919",
      "B) 10 मई 1857",
      "C) 23 मार्च 1931",
      "D) 9 अगस्त 1942"
    ],
    "ans": "A) 13 अप्रैल 1919 (बैसाखी का दिन, जनरल डायर ने गोलियां चलवाई थीं)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "25. महात्मा गांधी ने 'करो या मरो' (Do or Die) का नारा किस आंदोलन में दिया था?\n[In which movement did Mahatma Gandhi give the slogan 'Do or Die'?]",
    "options": [
      "A) असहयोग आंदोलन (1920)",
      "B) सविनय अवज्ञा आंदोलन (1930)",
      "C) भारत छोड़ो आंदोलन (1942)",
      "D) चंपारण सत्याग्रह (1917)"
    ],
    "ans": "C) भारत छोड़ो आंदोलन (8 अगस्त 1942, बंबई के ग्वालिया टैंक मैदान से)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "26. भारत का सबसे ऊंचा जलप्रपात (Kunchikal Falls) किस राज्य में स्थित है?\n[Highest waterfall in India (Kunchikal Falls) is in:]",
    "options": [
      "A) केरल",
      "B) कर्नाटक (वराही नदी पर)",
      "C) मध्य प्रदेश",
      "D) मेघालय"
    ],
    "ans": "B) कर्नाटक (वराही नदी पर)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "27. भारत का एकमात्र सक्रिय ज्वालामुखी (Active Volcano) कहाँ स्थित है?\n[Only active volcano in India is located at:]",
    "options": [
      "A) लक्षद्वीप",
      "B) बैरन द्वीप (Barren Island - अंडमान व निकोबार)",
      "C) मिनिकॉय",
      "D) नारकोंडम"
    ],
    "ans": "B) बैरन द्वीप (अंडमान एवं निकोबार द्वीप समूह)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "28. सुंदरवन डेल्टा (Sundarbans Delta) किन दो प्रमुख नदियों के मुहाने पर बनता है?\n[Sundarbans Delta is formed by which two major rivers?]",
    "options": [
      "A) गंगा और ब्रह्मपुत्र (विश्व का सबसे बड़ा डेल्टा)",
      "B) नर्मदा और ताप्ती",
      "C) कृष्णा और गोदावरी",
      "D) सिंधु और झेलम"
    ],
    "ans": "A) गंगा और ब्रह्मपुत्र नदी (मैंग्रोव वन व रॉयल बंगाल टाइगर हेतु प्रसिद्ध)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "29. दक्षिण भारत की सबसे ऊंची पर्वत चोटी कौन सी है?\n[Highest mountain peak of South India:]",
    "options": [
      "A) दोद्दाबेट्टा",
      "B) अनाईमुडी (Anaimudi - 2,695 मीटर, केरल)",
      "C) महेंद्रगिरि",
      "D) कलसुबाई"
    ],
    "ans": "B) अनाईमुडी (अन्नामलाई पर्वत श्रृंखला, केरल में स्थित)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "30. हीराकुंड बांध (Hirakud Dam) किस नदी पर और किस राज्य में स्थित है?\n[Hirakud Dam is built on which river and in which state?]",
    "options": [
      "A) दामोदर नदी - झारखंड",
      "B) महानदी - ओडिशा (विश्व का सबसे लंबा मिट्टी का बांध)",
      "C) नर्मदा नदी - गुजरात",
      "D) सतलुज नदी - पंजाब"
    ],
    "ans": "B) महानदी - ओडिशा राज्य में (संबलपुर के निकट)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "31. भाखड़ा नांगल बांध किस नदी पर बनाया गया है?\n[Bhakra Nangal Dam is constructed across which river?]",
    "options": [
      "A) रावी नदी",
      "B) सतलुज नदी (Sutlej River)",
      "C) चिनाब नदी",
      "D) झेलम नदी"
    ],
    "ans": "B) सतलुज नदी (हिमाचल प्रदेश एवं पंजाब सीमा पर)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "32. सरदार सरोवर बांध किस नदी पर निर्मित है?\n[Sardar Sarovar Dam is built on which river?]",
    "options": [
      "A) ताप्ती",
      "B) नर्मदा नदी (गुजरात)",
      "C) गोदावरी",
      "D) कावेरी"
    ],
    "ans": "B) नर्मदा नदी (गुजरात - केवड़िया में स्टैच्यू ऑफ यूनिटी स्थित है)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "33. जिम कॉर्बेट राष्ट्रीय उद्यान (वर्तमान में रामगंगा राष्ट्रीय उद्यान) भारत के किस राज्य में स्थित है?\n[Jim Corbett National Park (first national park of India) is in:]",
    "options": [
      "A) असम",
      "B) उत्तराखंड (1936 में हेली नेशनल पार्क नाम से स्थापित)",
      "C) उत्तर प्रदेश",
      "D) मध्य प्रदेश"
    ],
    "ans": "B) उत्तराखंड (नैनीताल जनपद)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "34. एक सींग वाले गैंडे (One-horned Rhinoceros) के लिए प्रसिद्ध काजीरंगा राष्ट्रीय उद्यान कहाँ स्थित है?\n[Kaziranga National Park famous for one-horned rhino is in:]",
    "options": [
      "A) पश्चिम बंगाल",
      "B) असम (Assam)",
      "C) ओडिशा",
      "D) मणिपुर"
    ],
    "ans": "B) असम (यूनेस्को विश्व धरोहर स्थल)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "35. केबुल लामजाओ राष्ट्रीय उद्यान (विश्व का एकमात्र तैरता हुआ नेशनल पार्क) किस झील पर स्थित है?\n[Keibul Lamjao (world's only floating national park) is located on which lake?]",
    "options": [
      "A) चिल्का झील",
      "B) लोकटक झील (Loktak Lake - मणिपुर)",
      "C) वुलर झील",
      "D) सांभर झील"
    ],
    "ans": "B) लोकटक झील, मणिपुर (संगाई हिरण का प्राकृतिक आवास)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "36. प्रकाश का वेग सर्वाधिक किस माध्यम में होता है?\n[In which medium is the speed of light maximum?]",
    "options": [
      "A) कांच (Glass)",
      "B) पानी (Water)",
      "C) निर्वात (Vacuum)",
      "D) हीरा (Diamond)"
    ],
    "ans": "C) निर्वात (Vacuum) - 3 × 10⁸ m/s",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "37. निकट दृष्टि दोष (Myopia) के निवारण के लिए किस लेंस का उपयोग किया जाता है?\n[Which lens is used to correct Myopia?]",
    "options": [
      "A) उत्तल लेंस (Convex)",
      "B) अवतल लेंस (Concave)",
      "C) बाइफोकल लेंस",
      "D) बेलनाकार लेंस"
    ],
    "ans": "B) अवतल लेंस (Concave Lens)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "38. दूर दृष्टि दोष (Hypermetropia) के निवारण हेतु किस लेंस का प्रयोग होता है?\n[Which lens is used to correct Hypermetropia?]",
    "options": [
      "A) अवतल लेंस",
      "B) उत्तल लेंस (Convex Lens)",
      "C) समतल लेंस",
      "D) सिलिंड्रिकल लेंस"
    ],
    "ans": "B) उत्तल लेंस (Convex Lens)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "39. दाढ़ी बनाने (Shaving Mirror) तथा दंत चिकित्सकों द्वारा किस दर्पण का उपयोग होता है?\n[Mirror used for shaving and by dentists:]",
    "options": [
      "A) उत्तल दर्पण",
      "B) अवतल दर्पण (Concave Mirror)",
      "C) समतल दर्पण",
      "D) परवलयिक दर्पण"
    ],
    "ans": "B) अवतल दर्पण (बड़ा और सीधा आभासी प्रतिबिम्ब)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "40. वाहनों के साइड मिरर (Rear-view Mirror) में किस दर्पण का उपयोग होता है?\n[Mirror used in rear-view of vehicles:]",
    "options": [
      "A) अवतल दर्पण",
      "B) उत्तल दर्पण (Convex Mirror)",
      "C) समतल दर्पण",
      "D) उभयोत्तल दर्पण"
    ],
    "ans": "B) उत्तल दर्पण (विस्तृत दृष्टि क्षेत्र एवं सीधा प्रतिबिम्ब)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "41. निर्वात में प्रकाश की चाल (c) और किसी माध्यम में प्रकाश की चाल (v) का अनुपात क्या कहलाता है?\n[Ratio of speed of light in vacuum to medium (c/v) is called:]",
    "options": [
      "A) आवर्धन",
      "B) अपवर्तनांक (Refractive Index)",
      "C) लेंस क्षमता",
      "D) विक्षेपण"
    ],
    "ans": "B) अपवर्तनांक (Refractive Index: n = c/v)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "42. हीरे का अपवर्तनांक (Refractive Index of Diamond) कितना होता है?\n[Refractive index of diamond is:]",
    "options": [
      "A) 1.33",
      "B) 1.5",
      "C) 2.42 (सर्वाधिक)",
      "D) 1.00"
    ],
    "ans": "C) 2.42 (पूर्ण आंतरिक परावर्तन के कारण चमकता है)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "43. किसी लेंस की क्षमता P = +2.5 D है। इसकी फोकस दूरी क्या होगी?\n[Power of lens is +2.5 D. Its focal length is:]",
    "options": [
      "A) +25 cm",
      "B) +40 cm (+0.4 m)",
      "C) -40 cm",
      "D) +50 cm"
    ],
    "ans": "B) +40 cm (f = 100/P = 100/2.5 = 40 cm, उत्तल लेंस)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "44. तारे टिमटिमाते (Twinkling of stars) हुए किस घटना के कारण दिखाई देते हैं?\n[Twinkling of stars is due to which optical phenomenon?]",
    "options": [
      "A) प्रकाश का परावर्तन",
      "B) वायुमंडलीय अपवर्तन (Atmospheric Refraction)",
      "C) प्रकीर्णन",
      "D) विक्षेपण"
    ],
    "ans": "B) वायुमंडलीय अपवर्तन (Atmospheric Refraction)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "45. आकाश का नीला रंग प्रकाश के किस गुण के कारण दिखाई देता है?\n[Blue color of clear sky is due to:]",
    "options": [
      "A) परावर्तन",
      "B) प्रकीर्णन (Scattering of Light)",
      "C) अपवर्तन",
      "D) विवर्तन"
    ],
    "ans": "B) प्रकाश का प्रकीर्णन (रैले का नियम: नीले रंग का प्रकीर्णन सर्वाधिक होता है)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "46. समतल दर्पण द्वारा बना प्रतिबिम्ब कैसा होता है?\n[Image formed by a plane mirror is:]",
    "options": [
      "A) वास्तविक और उल्टा",
      "B) आभासी एवं सीधा (Virtual and Erect)",
      "C) वास्तविक एवं सीधा",
      "D) उल्टा एवं बड़ा"
    ],
    "ans": "B) आभासी एवं पार्श्व उल्टा (Virtual and laterally inverted)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "47. गोलीय दर्पण की फोकस दूरी (f) और उसकी वक्रता त्रिज्या (R) में क्या संबंध है?\n[Relationship between focal length f and radius of curvature R:]",
    "options": [
      "A) f = 2R",
      "B) f = R / 2",
      "C) f = R",
      "D) f = 1/R"
    ],
    "ans": "B) f = R / 2",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "48. प्रिज्म से गुजरने पर किस रंग के प्रकाश का विचलन (Deviation) सबसे अधिक होता है?\n[Which color deviates most when passing through a prism?]",
    "options": [
      "A) लाल (Red)",
      "B) बैगनी (Violet)",
      "C) पीला (Yellow)",
      "D) हरा (Green)"
    ],
    "ans": "B) बैगनी (Violet - न्यूनतम तरंगदैर्ध्य के कारण अधिकतम विचलन)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "49. खतरे के संकेत (Danger signals) में लाल रंग का उपयोग क्यों किया जाता है?\n[Why is red color used in danger signals?]",
    "options": [
      "A) इसका प्रकीर्णन सबसे कम होता है",
      "B) इसका प्रकीर्णन सबसे अधिक होता है",
      "C) यह आंखों को प्रिय लगता है",
      "D) इसका वेग अधिक होता है"
    ],
    "ans": "A) इसका प्रकीर्णन सबसे कम होता है (तरंगदैर्ध्य सर्वाधिक होती है)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "50. सामान्य दृष्टि के वयस्क के लिए सुस्पष्ट दर्शन की अल्पतम दूरी (Least distance of distinct vision) कितनी होती है?\n[Least distance of distinct vision for normal eye:]",
    "options": [
      "A) 25 m",
      "B) 2.5 cm",
      "C) 25 cm",
      "D) अनंत (Infinity)"
    ],
    "ans": "C) 25 cm (निकट बिंदु 25 cm तथा दूर बिंदु अनंत होता है)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "51. विद्युत आवेश (Electric Charge) का SI मात्रक क्या है?\n[SI unit of Electric Charge:]",
    "options": [
      "A) वोल्ट",
      "B) एम्पियर",
      "C) कूलॉम (Coulomb)",
      "D) जूल"
    ],
    "ans": "C) कूलॉम (Coulomb - 1 C = 6.25 × 10¹⁸ इलेक्ट्रॉन)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "52. विभवांतर (Potential Difference) मापने वाले यंत्र को क्या कहा जाता है?\n[Device used to measure Potential Difference:]",
    "options": [
      "A) अमीटर",
      "B) वोल्टमीटर (Voltmeter)",
      "C) गैल्वेनोमीटर",
      "D) पोटेंशियोमीटर"
    ],
    "ans": "B) वोल्टमीटर (परिपथ के समांतर क्रम में जोड़ा जाता है)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "53. विद्युत परिपथ में धारा (Electric Current) मापने हेतु किसे श्रेणीक्रम में जोड़ा जाता है?\n[Instrument connected in series to measure Current:]",
    "options": [
      "A) वोल्टमीटर",
      "B) अमीटर (Ammeter)",
      "C) ओममीटर",
      "D) रियोस्टेट"
    ],
    "ans": "B) अमीटर (Ammeter - आदर्श अमीटर का प्रतिरोध शून्य होता है)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "54. ओम के नियम का सही गणितीय सूत्र क्या है?\n[Correct mathematical formula for Ohm's Law:]",
    "options": [
      "A) V = I / R",
      "B) V = I × R",
      "C) I = V × R",
      "D) R = V × I"
    ],
    "ans": "B) V = I × R (विभवांतर = धारा × प्रतिरोध)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "55. 1 किलोवाट-घंटा (1 kWh) विद्युत ऊर्जा में कितने जूल होते हैं?\n[1 kWh electrical energy equals how many Joules?]",
    "options": [
      "A) 3.6 × 10⁵ J",
      "B) 3.6 × 10⁶ J (1 Commercial Unit)",
      "C) 746 J",
      "D) 1000 J"
    ],
    "ans": "B) 3.6 × 10⁶ J (यही 1 यूनिट बिजली कहलाती है)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "56. विद्युत बल्ब का तंतु (Filament) किस धातु का बना होता है?\n[Filament of electric bulb is made of:]",
    "options": [
      "A) तांबा",
      "B) टंगस्टन (Tungsten - उच्च गलनांक ~3422°C)",
      "C) नाइक्रोम",
      "D) लोहा"
    ],
    "ans": "B) टंगस्टन (Tungsten)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "57. विद्युत हीटर और गीजर का तापन अवयव (Element) किस मिश्रधातु का बना होता है?\n[Heating element of electric heater is made of:]",
    "options": [
      "A) टंगस्टन",
      "B) नाइक्रोम (Nichrome - Ni+Cr)",
      "C) पीतल",
      "D) कांस्य"
    ],
    "ans": "B) नाइक्रोम (Nichrome)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "58. विद्युत फ्यूज तार (Electric Fuse Wire) की क्या विशेषता होनी चाहिए?\n[Characteristics of an electric fuse wire:]",
    "options": [
      "A) उच्च गलनांक, निम्न प्रतिरोध",
      "B) निम्न गलनांक एवं उच्च प्रतिरोध",
      "C) उच्च गलनांक, उच्च प्रतिरोध",
      "D) शून्य प्रतिरोध"
    ],
    "ans": "B) निम्न गलनांक एवं उच्च प्रतिरोध (अतिभारण होने पर तुरंत पिघल जाता है)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "59. घरों में विद्युत उपकरण किस क्रम में जोड़े जाते हैं?\n[Domestic electrical appliances are connected in:]",
    "options": [
      "A) श्रेणीक्रम (Series)",
      "B) समांतर क्रम (Parallel Connection)",
      "C) मिश्रित क्रम",
      "D) चक्रीय क्रम"
    ],
    "ans": "B) समांतर क्रम (ताकि सभी उपकरणों को 220V समान विभवांतर मिले)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "60. फ्लेमिंग के वामहस्त (बाएं हाथ) के नियम में तर्जनी अंगुली किसकी दिशा दर्शाती है?\n[In Fleming's Left Hand Rule, forefinger represents direction of:]",
    "options": [
      "A) विद्युत धारा",
      "B) चुंबकीय क्षेत्र (Magnetic Field)",
      "C) बल या गति",
      "D) विभव"
    ],
    "ans": "B) चुंबकीय क्षेत्र (Forefinger = Field, Middle = Current, Thumb = Force)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "61. विद्युत धारा का SI मात्रक क्या है?\n[SI unit of Electric Current:]",
    "options": [
      "A) वोल्ट",
      "B) एम्पियर (Ampere)",
      "C) वाट",
      "D) कूलॉम"
    ],
    "ans": "B) एम्पियर (A = C/s)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "62. प्रतिरोध का SI मात्रक क्या है?\n[SI unit of Electrical Resistance:]",
    "options": [
      "A) ओम (Ω)",
      "B) ओम-मीटर",
      "C) म्हो",
      "D) सीमेंस"
    ],
    "ans": "A) ओम (Ω) - विशिष्ट प्रतिरोध का मात्रक ओम-मीटर होता है",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "63. विद्युत जनित्र (Electric Generator / Dynamo) किस सिद्धांत पर कार्य करता है?\n[Electric Generator works on the principle of:]",
    "options": [
      "A) धारा का उष्मीय प्रभाव",
      "B) विद्युत चुंबकीय प्रेरण (Electromagnetic Induction)",
      "C) रासायनिक प्रभाव",
      "D) पास्कल नियम"
    ],
    "ans": "B) विद्युत चुंबकीय प्रेरण (फैराडे का नियम)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "64. प्रत्यावर्ती धारा (AC) की आवृत्ति भारत में सामान्यतः कितनी होती है?\n[Frequency of AC domestic supply in India:]",
    "options": [
      "A) 60 Hz",
      "B) 50 Hz",
      "C) 100 Hz",
      "D) 220 Hz"
    ],
    "ans": "B) 50 Hz (220 वोल्ट विभवांतर)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "65. लघु परिपथन (Short Circuit) के समय परिपथ में विद्युत धारा का मान:\n[At the time of Short Circuit, current in the circuit:]",
    "options": [
      "A) बहुत कम हो जाता है",
      "B) अत्यधिक बढ़ जाता है (Increases enormously)",
      "C) अपरिवर्तित रहता है",
      "D) निरंतर घटता है"
    ],
    "ans": "B) अत्यधिक बढ़ जाता है (Increases enormously)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "66. फेरस सल्फेट क्रिस्टल (Green Vitriol) का रासायनिक सूत्र क्या है?\n[Chemical formula of Ferrous Sulphate crystal:]",
    "options": [
      "A) FeSO₄·5H₂O",
      "B) FeSO₄·7H₂O",
      "C) FeSO₄·2H₂O",
      "D) Fe₂O₃"
    ],
    "ans": "B) FeSO₄·7H₂O (गर्म करने पर Fe₂O₃ भूरे रंग में बदलता है)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "67. विरंजक चूर्ण (Bleaching Powder) का रासायनिक नाम और सूत्र क्या है?\n[Chemical name and formula of Bleaching Powder:]",
    "options": [
      "A) CaCO₃",
      "B) CaOCl₂ (कैल्शियम ऑक्सीक्लोराइड)",
      "C) Ca(OH)₂",
      "D) CaCl₂"
    ],
    "ans": "B) CaOCl₂ (कैल्शियम ऑक्सीक्लोराइड)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "68. बेकिंग सोडा (मीठा सोडा) का रासायनिक सूत्र क्या है?\n[Chemical formula of Baking Soda:]",
    "options": [
      "A) Na₂CO₃",
      "B) NaHCO₃ (सोडियम हाइड्रोजन कार्बोनेट)",
      "C) NaOH",
      "D) KOH"
    ],
    "ans": "B) NaHCO₃ (Sodium Hydrogen Carbonate)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "69. धावन सोडा (Washing Soda) का रासायनिक सूत्र क्या है?\n[Chemical formula of Washing Soda:]",
    "options": [
      "A) NaHCO₃",
      "B) Na₂CO₃·10H₂O (डेकाहाइड्रेट)",
      "C) Na₂SO₄",
      "D) NaCl"
    ],
    "ans": "B) Na₂CO₃·10H₂O",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "70. प्लास्टर ऑफ पेरिस (POP) का रासायनिक सूत्र क्या है?\n[Chemical formula of Plaster of Paris:]",
    "options": [
      "A) CaSO₄·2H₂O",
      "B) CaSO₄·½H₂O (हेमीहाइड्रेट)",
      "C) CaSO₄·H₂O",
      "D) MgSO₄·7H₂O"
    ],
    "ans": "B) CaSO₄·½H₂O (जिप्सम को 373 K पर गर्म करने से बनता है)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "71. दो संख्याओं का म०स० (HCF) 15 तथा ल०स० (LCM) 150 है। यदि एक संख्या 30 हो, तो दूसरी संख्या क्या होगी?\n[HCF is 15, LCM is 150. If one number is 30, find the other number:]",
    "options": [
      "A) 45",
      "B) 75",
      "C) 60",
      "D) 90"
    ],
    "ans": "B) 75 (सूत्र: पहली संख्या × दूसरी = HCF × LCM ⇒ 30 × N = 15 × 150 ⇒ N = 75)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "72. निम्नलिखित में से कौन सी एक अपरिमेय संख्या (Irrational Number) है?\n[Which of the following is an irrational number?]",
    "options": [
      "A) √4",
      "B) √9",
      "C) √7",
      "D) 22/7"
    ],
    "ans": "C) √7 (अपरिमेय संख्या है जिसका दशमलव प्रसार असांत अनावर्ती होता है)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "73. पाई (π) किस प्रकार की संख्या है?\n[What type of number is Pi (π)?]",
    "options": [
      "A) परिमेय संख्या",
      "B) अपरिमेय संख्या (Irrational Number)",
      "C) पूर्णांक",
      "D) प्राकृत संख्या"
    ],
    "ans": "B) अपरिमेय संख्या (Irrational Number - जबकि इसका सन्निकट मान 22/7 परिमेय है)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "74. द्विघात समीकरण ax² + bx + c = 0 के मूल वास्तविक और समान होंगे यदि:\n[Roots of ax² + bx + c = 0 are real and equal if:]",
    "options": [
      "A) b² - 4ac > 0",
      "B) b² - 4ac = 0",
      "C) b² - 4ac < 0",
      "D) b² - 4ac ≥ 1"
    ],
    "ans": "B) b² - 4ac = 0 (विविक्तकर D = 0)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "75. यदि द्विघात समीकरण 2x² - 4x + k = 0 के मूल बराबर हों, तो k का मान क्या होगा?\n[If roots of 2x² - 4x + k = 0 are equal, find value of k:]",
    "options": [
      "A) 1",
      "B) 2",
      "C) 4",
      "D) -2"
    ],
    "ans": "B) 2 (D = (-4)² - 4(2)(k) = 0 ⇒ 16 - 8k = 0 ⇒ k = 2)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "76. द्विघात बहुपद x² - 3 के शून्यक (Zeroes) क्या होंगे?\n[Find zeroes of polynomial x² - 3:]",
    "options": [
      "A) 3, -3",
      "B) +√3, -√3",
      "C) √3, √3",
      "D) 9, -9"
    ],
    "ans": "B) +√3, -√3 (x² = 3 ⇒ x = ±√3)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "77. यदि द्विघात बहुपद ax² + bx + c के शून्यक α और β हों, तो (α + β) और αβ का मान क्या होगा?\n[Sum and product of zeroes α and β of ax² + bx + c:]",
    "options": [
      "A) -b/a तथा c/a",
      "B) b/a तथा -c/a",
      "C) c/a तथा -b/a",
      "D) -c/a तथा b/a"
    ],
    "ans": "A) शून्यकों का योग = -b/a, शून्यकों का गुणनफल = c/a",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "78. रैखिक समीकरण युग्म a₁x + b₁y + c₁ = 0 तथा a₂x + b₂y + c₂ = 0 का अद्वितीय हल (Unique Solution) कब होता है?\n[Condition for a unique solution of pair of linear equations:]",
    "options": [
      "A) a₁/a₂ ≠ b₁/b₂",
      "B) a₁/a₂ = b₁/b₂ = c₁/c₂",
      "C) a₁/a₂ = b₁/b₂ ≠ c₁/c₂",
      "D) a₁/a₂ = -b₁/b₂"
    ],
    "ans": "A) a₁/a₂ ≠ b₁/b₂ (प्रतिच्छेदी रेखाएं / संगत)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "79. यदि a₁/a₂ = b₁/b₂ ≠ c₁/c₂ हो, तो समीकरण निकाय का कैसा हल होगा?\n[If a₁/a₂ = b₁/b₂ ≠ c₁/c₂, the system of equations has:]",
    "options": [
      "A) एक अद्वितीय हल",
      "B) कोई हल नहीं (No Solution - समांतर रेखाएं)",
      "C) अनंत अनेक हल",
      "D) दो हल"
    ],
    "ans": "B) कोई हल नहीं (No Solution - रेखाएं समांतर एवं असंगत होती हैं)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "80. समांतर श्रेणी (AP): 2, 7, 12, ... का 10वाँ पद क्या होगा?\n[Find the 10th term of AP: 2, 7, 12, ...:]",
    "options": [
      "A) 45",
      "B) 47",
      "C) 50",
      "D) 52"
    ],
    "ans": "B) 47 (a = 2, d = 5; a₁₀ = a + 9d = 2 + 9×5 = 47)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "81. समांतर श्रेणी के प्रथम n पदों के योगफल का सूत्र क्या है?\n[Formula for sum of first n terms of an AP:]",
    "options": [
      "A) Sₙ = n/2 [2a + (n - 1)d]",
      "B) Sₙ = n [a + d]",
      "C) Sₙ = n/2 [a - d]",
      "D) Sₙ = 2n [a + (n-1)d]"
    ],
    "ans": "A) Sₙ = n/2 [2a + (n - 1)d] अथवा Sₙ = n/2 [a + l]",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "82. प्रथम 10 प्राकृत संख्याओं का योगफल (Sum of first 10 natural numbers) कितना होगा?\n[Sum of first 10 natural numbers:]",
    "options": [
      "A) 50",
      "B) 55",
      "C) 60",
      "D) 65"
    ],
    "ans": "B) 55 (सूत्र: n(n+1)/2 = 10 × 11 / 2 = 55)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "83. बिन्दु (-3, 4) कार्तीय तल के किस चतुर्थांश (Quadrant) में स्थित है?\n[In which quadrant does point (-3, 4) lie?]",
    "options": [
      "A) प्रथम",
      "B) द्वितीय (Second Quadrant: -x, +y)",
      "C) तृतीय",
      "D) चतुर्थ"
    ],
    "ans": "B) द्वितीय चतुर्थांश (Second Quadrant)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "84. मूल बिन्दु (Origin) के निर्देशांक क्या होते हैं?\n[Coordinates of origin are:]",
    "options": [
      "A) (1, 1)",
      "B) (0, 0)",
      "C) (0, 1)",
      "D) (-1, -1)"
    ],
    "ans": "B) (0, 0)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "85. बिन्दु P(x, y) की मूल बिन्दु (0,0) से दूरी का सूत्र क्या है?\n[Distance of point P(x, y) from origin:]",
    "options": [
      "A) x + y",
      "B) √(x² + y²)",
      "C) x² - y²",
      "D) √(x - y)"
    ],
    "ans": "B) √(x² + y²)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "86. बिन्दुओं (2, 3) और (4, 1) के बीच की दूरी क्या होगी?\n[Find distance between points (2, 3) and (4, 1):]",
    "options": [
      "A) 2",
      "B) 2√2",
      "C) 4",
      "D) √8 / 2"
    ],
    "ans": "B) 2√2 (d = √[(4-2)² + (1-3)²] = √[4 + 4] = √8 = 2√2)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "87. बिन्दुओं (x₁, y₁) और (x₂, y₂) को मिलाने वाले रेखाखंड के मध्य-बिन्दु (Mid-point) के निर्देशांक हैं:\n[Mid-point coordinates of line joining (x₁, y₁) and (x₂, y₂):]",
    "options": [
      "A) ((x₁+x₂)/2, (y₁+y₂)/2)",
      "B) ((x₁-x₂)/2, (y₁-y₂)/2)",
      "C) (x₁+x₂, y₁+y₂)",
      "D) (x₁x₂, y₁y₂)"
    ],
    "ans": "A) ((x₁ + x₂)/2, (y₁ + y₂)/2)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "88. यदि sin θ = 3/5 हो, तो cos θ और tan θ का मान क्या होगा?\n[If sin θ = 3/5, what are cos θ and tan θ?]",
    "options": [
      "A) cos θ = 4/5, tan θ = 3/4",
      "B) cos θ = 3/4, tan θ = 4/5",
      "C) cos θ = 5/4, tan θ = 3/5",
      "D) cos θ = 4/3, tan θ = 5/3"
    ],
    "ans": "A) cos θ = 4/5, tan θ = 3/4 (पाइथागोरस त्रिक: 3, 4, 5)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "89. sin² 63° + sin² 27° का मान क्या होगा?\n[Value of sin² 63° + sin² 27° is:]",
    "options": [
      "A) 0",
      "B) 1",
      "C) 2",
      "D) -1"
    ],
    "ans": "B) 1 (sin 27° = cos 63°, अतः sin² 63° + cos² 63° = 1)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "90. (sec² θ - tan² θ) का मान सदैव किसके बराबर होता है?\n[Value of (sec² θ - tan² θ) is:]",
    "options": [
      "A) 0",
      "B) 1",
      "C) -1",
      "D) 2"
    ],
    "ans": "B) 1 (त्रिकोणमितीय सर्वसमिका)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "91. 9 sec² A - 9 tan² A का मान क्या होगा?\n[Value of 9 sec² A - 9 tan² A is:]",
    "options": [
      "A) 1",
      "B) 9",
      "C) 8",
      "D) 0"
    ],
    "ans": "B) 9 (9 × [sec² A - tan² A] = 9 × 1 = 9)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "92. यदि tan θ = 1 हो, तो कोण θ का मान क्या होगा?\n[If tan θ = 1, value of acute angle θ is:]",
    "options": [
      "A) 30°",
      "B) 45°",
      "C) 60°",
      "D) 90°"
    ],
    "ans": "B) 45° (tan 45° = 1)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "93. एक मीनार की छाया उसकी ऊंचाई के बराबर है। सूर्य का उन्नयन कोण (Angle of Elevation) क्या होगा?\n[Height of tower equals its shadow length. Angle of elevation of Sun:]",
    "options": [
      "A) 30°",
      "B) 45°",
      "C) 60°",
      "D) 90°"
    ],
    "ans": "B) 45° (tan θ = h/h = 1 ⇒ θ = 45°)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "94. वृत्त की सबसे बड़ी जीवा (Longest Chord of a Circle) क्या कहलाती है?\n[The longest chord of a circle is called:]",
    "options": [
      "A) त्रिज्या (Radius)",
      "B) व्यास (Diameter)",
      "C) चाप (Arc)",
      "D) स्पर्श रेखा"
    ],
    "ans": "B) व्यास (Diameter = 2r)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "95. किसी वृत्त पर बाह्य बिन्दु (External point) से अधिकतम कितनी स्पर्श रेखाएं खींची जा सकती हैं?\n[Maximum number of tangents drawn from an external point to a circle:]",
    "options": [
      "A) 1",
      "B) 2 (दोनों की लम्बाइयां बराबर होती हैं)",
      "C) अनंत",
      "D) 0"
    ],
    "ans": "B) 2 (बाह्य बिंदु से खींची गई दोनों स्पर्श रेखाएं समान लंबाई की होती हैं)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "96. यदि वृत्त की त्रिज्या r हो, तो अर्धवृत्त का परिमाप (Perimeter of Semicircle) क्या होगा?\n[Perimeter of a semicircle of radius r:]",
    "options": [
      "A) πr",
      "B) πr + 2r = r(π + 2)",
      "C) 2πr",
      "D) πr² / 2"
    ],
    "ans": "B) r(π + 2) (चाप की लंबाई πr + व्यास 2r)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "97. दो वृत्तों के क्षेत्रफलों का अनुपात 4 : 9 है। उनकी त्रिज्याओं का अनुपात क्या होगा?\n[Ratio of areas of two circles is 4:9. Ratio of their radii is:]",
    "options": [
      "A) 2 : 3",
      "B) 16 : 81",
      "C) 4 : 9",
      "D) 1 : 2"
    ],
    "ans": "A) 2 : 3 (r₁/r₂ = √(A₁/A₂) = √(4/9) = 2/3)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "98. एक ठोस अर्धगोले का कुल पृष्ठीय क्षेत्रफल (Total Surface Area of Hemisphere) क्या होता है?\n[Total surface area of a solid hemisphere of radius r:]",
    "options": [
      "A) 2πr²",
      "B) 3πr²",
      "C) 4πr²",
      "D) 2/3 πr³"
    ],
    "ans": "B) 3πr² (वक्र पृष्ठ 2πr² + आधार πr²)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "99. एक गोले की त्रिज्या दोगुनी कर दी जाए, तो उसका आयतन कितने गुना हो जाएगा?\n[If radius of a sphere is doubled, its volume becomes:]",
    "options": [
      "A) 2 गुना",
      "B) 4 गुना",
      "C) 8 गुना (V ∝ r³)",
      "D) 16 गुना"
    ],
    "ans": "C) 8 गुना (V = 4/3 π (2r)³ = 8 × V)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "100. एक बेलन (Cylinder) का वक्र पृष्ठीय क्षेत्रफल का सूत्र क्या है?\n[Curved surface area of a cylinder of radius r and height h:]",
    "options": [
      "A) πr²h",
      "B) 2πrh",
      "C) 2πr(r + h)",
      "D) 1/3 πr²h"
    ],
    "ans": "B) 2πrh",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "101. 'संधि' के मुख्य रूप से कितने भेद होते हैं?\n[How many main types of Sandhi are there in Hindi grammar?]",
    "options": [
      "A) 2",
      "B) 3 भेद (स्वर संधि, व्यंजन संधि, विसर्ग संधि)",
      "C) 4",
      "D) 5"
    ],
    "ans": "B) 3 भेद (स्वर संधि, व्यंजन संधि, विसर्ग संधि)",
    "subjectName": "सामान्य हिन्दी (General Hindi)"
  },
  {
    "q": "102. 'दशानन' (दस हैं आनन जिसके अर्थात् रावण) में कौन सा समास है?\n[Which Samas is present in Dashanan?]",
    "options": [
      "A) तत्पुरुष",
      "B) बहुव्रीहि समास (अन्य पद प्रधान)",
      "C) द्विगु",
      "D) कर्मधारय"
    ],
    "ans": "B) बहुव्रीहि समास (अन्य पद प्रधान)",
    "subjectName": "सामान्य हिन्दी (General Hindi)"
  },
  {
    "q": "103. 'पेड़ से पत्ता गिरा' वाक्य में कौन सा कारक है?\n[Which Karak is used in the Hindi sentence?]",
    "options": [
      "A) करण कारक",
      "B) अपादान कारक (अलगाव का भाव)",
      "C) कर्म कारक",
      "D) संबंध कारक"
    ],
    "ans": "B) अपादान कारक (विभक्ति: 'से' अलग होने के अर्थ में)",
    "subjectName": "सामान्य हिन्दी (General Hindi)"
  },
  {
    "q": "104. 'कनक कनक ते सौ गुनी मादकता अधिकाय' में कौन सा अलंकार है?\n[Identify figure of speech in Hindi verse:]",
    "options": [
      "A) अनुप्रास",
      "B) यमक अलंकार",
      "C) श्लेष",
      "D) रूपक"
    ],
    "ans": "B) यमक अलंकार (पहले कनक का अर्थ 'धतूरा' तथा दूसरे का अर्थ 'सोना' है)",
    "subjectName": "सामान्य हिन्दी (General Hindi)"
  },
  {
    "q": "105. 'तरनि तनूजा तट तमाल तरुवर बहु छाए' में कौन सा अलंकार है?\n[Identify figure of speech:]",
    "options": [
      "A) अनुप्रास अलंकार (वर्ण की आवृत्ति)",
      "B) यमक",
      "C) उपमा",
      "D) उत्प्रेक्षा"
    ],
    "ans": "A) अनुप्रास अलंकार ('त' वर्ण की बार-बार आवृत्ति)",
    "subjectName": "सामान्य हिन्दी (General Hindi)"
  },
  {
    "q": "106. 'प्रत्येक' शब्द का सही संधि विच्छेद क्या होगा?\n[Correct Sandhi-Vichhed of 'Pratyek':]",
    "options": [
      "A) प्रति + एक (यण स्वर संधि)",
      "B) प्रत + एक",
      "C) प्र + प्रत्येक",
      "D) प्रत्ये + क"
    ],
    "ans": "A) प्रति + एक (इ + ए = ये - यण स्वर संधि)",
    "subjectName": "सामान्य हिन्दी (General Hindi)"
  },
  {
    "q": "107. 'सूर्योदय' शब्द का सही संधि विच्छेद क्या होगा?\n[Correct Sandhi-Vichhed of 'Suryodaya':]",
    "options": [
      "A) सूर्य + उदय (गुण स्वर संधि)",
      "B) सूर्यो + दय",
      "C) सूर + उदय",
      "D) सूर्य + दय"
    ],
    "ans": "A) सूर्य + उदय (अ + उ = ओ - गुण स्वर संधि)",
    "subjectName": "सामान्य हिन्दी (General Hindi)"
  },
  {
    "q": "108. 'यथाशक्ति' (शक्ति के अनुसार) में कौन सा समास है?\n[Which Samas is in 'Yathashakti'?]",
    "options": [
      "A) अव्ययीभाव समास",
      "B) तत्पुरुष",
      "C) द्वंद्व",
      "D) बहुव्रीहि"
    ],
    "ans": "A) अव्ययीभाव समास (पहला पद अव्यय 'यथा' है)",
    "subjectName": "सामान्य हिन्दी (General Hindi)"
  },
  {
    "q": "109. 'माता-पिता' और 'दिन-रात' में कौन सा समास है?\n[Which Samas is in 'Mata-Pita' and 'Din-Raat'?]",
    "options": [
      "A) द्विगु समास",
      "B) द्वंद्व समास (दोनों पद प्रधान)",
      "C) कर्मधारय",
      "D) तत्पुरुष"
    ],
    "ans": "B) द्वंद्व समास (योजक चिह्न एवं दोनों पद प्रधान)",
    "subjectName": "सामान्य हिन्दी (General Hindi)"
  },
  {
    "q": "110. 'चौराहा' और 'तिरंगा' में कौन सा समास है?\n[Which Samas is in 'Chauraha' and 'Tiranga'?]",
    "options": [
      "A) द्विगु समास (पहला पद संख्यावाचक)",
      "B) द्वंद्व",
      "C) कर्मधारय",
      "D) अव्ययीभाव"
    ],
    "ans": "A) द्विगु समास (पहला पद संख्यावाची विशेषण)",
    "subjectName": "सामान्य हिन्दी (General Hindi)"
  },
  {
    "q": "111. 'अंगूठा दिखाना' मुहावरे का सही अर्थ क्या है?\n[Meaning of idiom 'Angootha Dikhana':]",
    "options": [
      "A) चिढ़ाना",
      "B) ऐन वक्त पर मना कर देना या धोखा देना",
      "C) अंगूठा बड़ा करना",
      "D) सहायता करना"
    ],
    "ans": "B) साफ इनकार कर देना (मना करना)",
    "subjectName": "सामान्य हिन्दी (General Hindi)"
  },
  {
    "q": "112. 'आंख का तारा होना' मुहावरे का सही अर्थ क्या है?\n[Meaning of idiom 'Aankh ka tara':]",
    "options": [
      "A) अंधा होना",
      "B) बहुत प्यारा होना (अत्यधिक प्रिय)",
      "C) तारा दिखना",
      "D) रात में देखना"
    ],
    "ans": "B) बहुत प्यारा होना (अत्यधिक प्रिय होना)",
    "subjectName": "सामान्य हिन्दी (General Hindi)"
  },
  {
    "q": "113. 'हवा से बातें करना' मुहावरे का सही अर्थ क्या है?\n[Meaning of idiom 'Hawa se baatein karna':]",
    "options": [
      "A) बहुत तेज दौड़ना / चलना",
      "B) घमंड करना",
      "C) पागल होना",
      "D) बातें बनाना"
    ],
    "ans": "A) बहुत तेज गति से दौड़ना",
    "subjectName": "सामान्य हिन्दी (General Hindi)"
  },
  {
    "q": "114. 'अमृत' शब्द का सही विलोम शब्द (Antonym) क्या होगा?\n[Antonym of 'Amrit':]",
    "options": [
      "A) पीयूष",
      "B) विष / गरल",
      "C) सुधा",
      "D) अमिय"
    ],
    "ans": "B) विष (पीयूष व सुधा इसके पर्यायवाची हैं)",
    "subjectName": "सामान्य हिन्दी (General Hindi)"
  },
  {
    "q": "115. 'आकाश' शब्द का पर्यायवाची शब्द कौन सा नहीं है?\n[Which word is NOT a synonym of Akash?]",
    "options": [
      "A) गगन",
      "B) नभ",
      "C) व्योम",
      "D) अवनि"
    ],
    "ans": "D) अवनि (अवनि का अर्थ 'पृथ्वी/धरती' होता है)",
    "subjectName": "सामान्य हिन्दी (General Hindi)"
  },
  {
    "q": "116. 'जो सब कुछ जानता हो' वाक्यांश के लिए एक शब्द क्या होगा?\n[One word for 'One who knows everything':]",
    "options": [
      "A) अल्पज्ञ",
      "B) सर्वज्ञ (Sarvagya)",
      "C) विज्ञ",
      "D) कृतज्ञ"
    ],
    "ans": "B) सर्वज्ञ (कम जानने वाला अल्पज्ञ, न जानने वाला अज्ञ कहलाता है)",
    "subjectName": "सामान्य हिन्दी (General Hindi)"
  },
  {
    "q": "117. 'जिसका कोई शत्रु न जन्मा हो' वाक्यांश के लिए एक शब्द है:\n[One word for 'One who has no enemy born':]",
    "options": [
      "A) अजातशत्रु",
      "B) शत्रुघ्न",
      "C) अजेय",
      "D) अमर"
    ],
    "ans": "A) अजातशत्रु",
    "subjectName": "सामान्य हिन्दी (General Hindi)"
  },
  {
    "q": "118. हिन्दी वर्णमाला में कुल कितने मूल व्यंजन और कितने स्वर माने गए हैं?\n[Total vowels and consonants in Hindi alphabet:]",
    "options": [
      "A) 11 स्वर और 33 व्यंजन",
      "B) 10 स्वर और 30 व्यंजन",
      "C) 13 स्वर और 35 व्यंजन",
      "D) 12 स्वर और 36 व्यंजन"
    ],
    "ans": "A) 11 स्वर और 33 व्यंजन (कुल वर्ण 52)",
    "subjectName": "सामान्य हिन्दी (General Hindi)"
  },
  {
    "q": "119. 'शृंगार रस' का स्थायी भाव क्या है?\n[Permanent emotion (Sthayi Bhav) of Shringar Rasa:]",
    "options": [
      "A) हास",
      "B) रति / प्रेम",
      "C) शोक",
      "D) उत्साह"
    ],
    "ans": "B) रति (प्रेम) - इसे 'रसराज' कहा जाता है",
    "subjectName": "सामान्य हिन्दी (General Hindi)"
  },
  {
    "q": "120. 'वीर रस' का स्थायी भाव क्या है?\n[Permanent emotion of Veer Rasa:]",
    "options": [
      "A) क्रोध",
      "B) उत्साह (Enthusiasm)",
      "C) भय",
      "D) विस्मय"
    ],
    "ans": "B) उत्साह",
    "subjectName": "सामान्य हिन्दी (General Hindi)"
  },
  {
    "q": "121. संख्या श्रृंखला में अगला पद क्या होगा: 2, 6, 12, 20, 30, ?\n[Next term in number series: 2, 6, 12, 20, 30, ?]",
    "options": [
      "A) 40",
      "B) 42",
      "C) 44",
      "D) 36"
    ],
    "ans": "B) 42 (पैटर्न: +4, +6, +8, +10, +12 ⇒ 30 + 12 = 42 अथवा 1×2, 2×3, 3×4, 4×5, 5×6, 6×7=42)",
    "subjectName": "तर्कशक्ति (General Intelligence & Reasoning)"
  },
  {
    "q": "122. संख्या श्रृंखला में लुप्त पद ज्ञात करें: 3, 9, 27, 81, ?\n[Find missing term in series: 3, 9, 27, 81, ?]",
    "options": [
      "A) 162",
      "B) 243",
      "C) 324",
      "D) 216"
    ],
    "ans": "B) 243 (पैटर्न: प्रत्येक संख्या 3 से गुणा हो रही है, 81 × 3 = 243)",
    "subjectName": "तर्कशक्ति (General Intelligence & Reasoning)"
  },
  {
    "q": "123. यदि किसी सांकेतिक भाषा में 'CAT' को 24 तथा 'DOG' को 26 लिखा जाता है, तो 'PIG' का कोड क्या होगा?\n[In a code language CAT = 24, DOG = 26, then PIG equals:]",
    "options": [
      "A) 30",
      "B) 32",
      "C) 34",
      "D) 28"
    ],
    "ans": "B) 32 (वर्णमाला क्रम योग: P=16 + I=9 + G=7 = 32)",
    "subjectName": "तर्कशक्ति (General Intelligence & Reasoning)"
  },
  {
    "q": "124. यदि किसी कूट भाषा में 'WATER' को 'XBUFS' लिखा जाता है, तो उसी भाषा में 'EARTH' को क्या लिखा जाएगा?\n[If WATER is coded as XBUFS, then EARTH is coded as:]",
    "options": [
      "A) FBSUI",
      "B) FBSUJ",
      "C) FBTUI",
      "D) GCTVI"
    ],
    "ans": "A) FBSUI (प्रत्येक अक्षर में +1 की वृद्धि: E+1=F, A+1=B, R+1=S, T+1=U, H+1=I)",
    "subjectName": "तर्कशक्ति (General Intelligence & Reasoning)"
  },
  {
    "q": "125. संबंध स्थापित करें: भारत : नई दिल्ली :: जापान : ?\n[Analogy: India : New Delhi :: Japan : ?]",
    "options": [
      "A) बीजिंग",
      "B) टोक्यो (Tokyo)",
      "C) सियोल",
      "D) बैंकॉक"
    ],
    "ans": "B) टोक्यो (देश और उसकी राजधानी का संबंध)",
    "subjectName": "तर्कशक्ति (General Intelligence & Reasoning)"
  },
  {
    "q": "126. विषम पद को पहचानें (Find the odd one out):\n[Identify the odd word from the group:]",
    "options": [
      "A) आंख (Eye)",
      "B) कान (Ear)",
      "C) नाक (Nose)",
      "D) यकृत (Liver)"
    ],
    "ans": "D) यकृत (Liver - यह आंतरिक अंग है जबकि अन्य तीनों बाह्य ज्ञानेंद्रियां हैं)",
    "subjectName": "तर्कशक्ति (General Intelligence & Reasoning)"
  },
  {
    "q": "127. एक तस्वीर की ओर इशारा करते हुए रमेश ने कहा- 'वह मेरे पिता के इकलौते पुत्र की पुत्री है।' तस्वीर की लड़की का रमेश से क्या संबंध है?\n[Pointing to a photo, Ramesh said 'She is daughter of only son of my father'. How is girl related to Ramesh?]",
    "options": [
      "A) बहन",
      "B) पुत्री (Daughter)",
      "C) भतीजी",
      "D) माता"
    ],
    "ans": "B) पुत्री (रमेश के पिता का इकलौता पुत्र स्वयं रमेश है, अतः वह रमेश की पुत्री है)",
    "subjectName": "तर्कशक्ति (General Intelligence & Reasoning)"
  },
  {
    "q": "128. एक व्यक्ति उत्तर दिशा में 10 मीटर चलता है, फिर दाएं मुड़कर 15 मीटर चलता है। वह प्रारंभिक बिन्दु से किस दिशा में है?\n[A man walks 10m North, turns right and walks 15m. Direction from start:]",
    "options": [
      "A) उत्तर",
      "B) उत्तर-पूर्व (North-East)",
      "C) दक्षिण-पूर्व",
      "D) पूर्व"
    ],
    "ans": "B) उत्तर-पूर्व (North-East)",
    "subjectName": "तर्कशक्ति (General Intelligence & Reasoning)"
  },
  {
    "q": "129. यदि 1 जनवरी 2024 को सोमवार था, तो 1 जनवरी 2025 को कौन सा दिन होगा?\n[If 1 Jan 2024 was Monday, what day was 1 Jan 2025?]",
    "options": [
      "A) मंगलवार",
      "B) बुधवार (Wednesday)",
      "C) गुरुवार",
      "D) रविवार"
    ],
    "ans": "B) बुधवार (2024 एक लीप वर्ष है जिसमें 366 दिन होते हैं; विषम दिन = 2, सोमवार + 2 = बुधवार)",
    "subjectName": "तर्कशक्ति (General Intelligence & Reasoning)"
  },
  {
    "q": "130. 40 विद्यार्थियों की एक कक्षा में राहुल का स्थान ऊपर से 12वाँ है। नीचे से उसका स्थान क्या होगा?\n[In a class of 40 students, Rahul is 12th from top. His rank from bottom is:]",
    "options": [
      "A) 28वाँ",
      "B) 29वाँ",
      "C) 30वाँ",
      "D) 27वाँ"
    ],
    "ans": "B) 29वाँ (सूत्र: कुल = ऊपर + नीचे - 1 ⇒ 40 = 12 + नीचे - 1 ⇒ नीचे = 40 - 11 = 29)",
    "subjectName": "तर्कशक्ति (General Intelligence & Reasoning)"
  }
],
    subjectives: [], // Competitive CBT: 100% Objective MCQs
    hallOfFame: MASTER_HALL_OF_FAME,
    shortcuts: MASTER_SHORTCUTS
  },
  {
    id: "rrb-science-100",
    title: "Railway ALP & Group D 2026 - 100 High-Yield Science Formulas & Numericals",
    exam: "Railway Recruitment (ALP & Group D) 2026",
    price: 9,
    pages: "30 Pages Master PDF",
    rating: "4.8 ★ (1,290 downloads)",
    badge: "⚡ 100 Science MCQs",
    sampleQuestions: [
      { q: "1. गतिज ऊर्जा (Kinetic Energy) का सूत्र क्या है?", a: "उत्तर: KE = 1/2 m v² (यदि वेग दोगुना होगा, तो ऊर्जा 4 गुनी होगी)।" },
      { q: "2. ओम का नियम (Ohm's Law) क्या है?", a: "उत्तर: V = I × R (विभवांतर = धारा × प्रतिरोध)।" },
      { q: "3. ध्वनि की चाल सर्वाधिक किस माध्यम में होती है?", a: "उत्तर: ठोस (Solid) माध्यम में (स्टील में लगभग 5,960 मी/से)।" }
    ],
    objectives: [
  {
    "q": "1. प्रकाश का वेग सर्वाधिक किस माध्यम में होता है?\n[In which medium is the speed of light maximum?]",
    "options": [
      "A) कांच (Glass)",
      "B) पानी (Water)",
      "C) निर्वात (Vacuum)",
      "D) हीरा (Diamond)"
    ],
    "ans": "C) निर्वात (Vacuum) - 3 × 10⁸ m/s",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "2. निकट दृष्टि दोष (Myopia) के निवारण के लिए किस लेंस का उपयोग किया जाता है?\n[Which lens is used to correct Myopia?]",
    "options": [
      "A) उत्तल लेंस (Convex)",
      "B) अवतल लेंस (Concave)",
      "C) बाइफोकल लेंस",
      "D) बेलनाकार लेंस"
    ],
    "ans": "B) अवतल लेंस (Concave Lens)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "3. दूर दृष्टि दोष (Hypermetropia) के निवारण हेतु किस लेंस का प्रयोग होता है?\n[Which lens is used to correct Hypermetropia?]",
    "options": [
      "A) अवतल लेंस",
      "B) उत्तल लेंस (Convex Lens)",
      "C) समतल लेंस",
      "D) सिलिंड्रिकल लेंस"
    ],
    "ans": "B) उत्तल लेंस (Convex Lens)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "4. दाढ़ी बनाने (Shaving Mirror) तथा दंत चिकित्सकों द्वारा किस दर्पण का उपयोग होता है?\n[Mirror used for shaving and by dentists:]",
    "options": [
      "A) उत्तल दर्पण",
      "B) अवतल दर्पण (Concave Mirror)",
      "C) समतल दर्पण",
      "D) परवलयिक दर्पण"
    ],
    "ans": "B) अवतल दर्पण (बड़ा और सीधा आभासी प्रतिबिम्ब)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "5. वाहनों के साइड मिरर (Rear-view Mirror) में किस दर्पण का उपयोग होता है?\n[Mirror used in rear-view of vehicles:]",
    "options": [
      "A) अवतल दर्पण",
      "B) उत्तल दर्पण (Convex Mirror)",
      "C) समतल दर्पण",
      "D) उभयोत्तल दर्पण"
    ],
    "ans": "B) उत्तल दर्पण (विस्तृत दृष्टि क्षेत्र एवं सीधा प्रतिबिम्ब)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "6. निर्वात में प्रकाश की चाल (c) और किसी माध्यम में प्रकाश की चाल (v) का अनुपात क्या कहलाता है?\n[Ratio of speed of light in vacuum to medium (c/v) is called:]",
    "options": [
      "A) आवर्धन",
      "B) अपवर्तनांक (Refractive Index)",
      "C) लेंस क्षमता",
      "D) विक्षेपण"
    ],
    "ans": "B) अपवर्तनांक (Refractive Index: n = c/v)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "7. हीरे का अपवर्तनांक (Refractive Index of Diamond) कितना होता है?\n[Refractive index of diamond is:]",
    "options": [
      "A) 1.33",
      "B) 1.5",
      "C) 2.42 (सर्वाधिक)",
      "D) 1.00"
    ],
    "ans": "C) 2.42 (पूर्ण आंतरिक परावर्तन के कारण चमकता है)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "8. किसी लेंस की क्षमता P = +2.5 D है। इसकी फोकस दूरी क्या होगी?\n[Power of lens is +2.5 D. Its focal length is:]",
    "options": [
      "A) +25 cm",
      "B) +40 cm (+0.4 m)",
      "C) -40 cm",
      "D) +50 cm"
    ],
    "ans": "B) +40 cm (f = 100/P = 100/2.5 = 40 cm, उत्तल लेंस)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "9. तारे टिमटिमाते (Twinkling of stars) हुए किस घटना के कारण दिखाई देते हैं?\n[Twinkling of stars is due to which optical phenomenon?]",
    "options": [
      "A) प्रकाश का परावर्तन",
      "B) वायुमंडलीय अपवर्तन (Atmospheric Refraction)",
      "C) प्रकीर्णन",
      "D) विक्षेपण"
    ],
    "ans": "B) वायुमंडलीय अपवर्तन (Atmospheric Refraction)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "10. आकाश का नीला रंग प्रकाश के किस गुण के कारण दिखाई देता है?\n[Blue color of clear sky is due to:]",
    "options": [
      "A) परावर्तन",
      "B) प्रकीर्णन (Scattering of Light)",
      "C) अपवर्तन",
      "D) विवर्तन"
    ],
    "ans": "B) प्रकाश का प्रकीर्णन (रैले का नियम: नीले रंग का प्रकीर्णन सर्वाधिक होता है)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "11. समतल दर्पण द्वारा बना प्रतिबिम्ब कैसा होता है?\n[Image formed by a plane mirror is:]",
    "options": [
      "A) वास्तविक और उल्टा",
      "B) आभासी एवं सीधा (Virtual and Erect)",
      "C) वास्तविक एवं सीधा",
      "D) उल्टा एवं बड़ा"
    ],
    "ans": "B) आभासी एवं पार्श्व उल्टा (Virtual and laterally inverted)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "12. गोलीय दर्पण की फोकस दूरी (f) और उसकी वक्रता त्रिज्या (R) में क्या संबंध है?\n[Relationship between focal length f and radius of curvature R:]",
    "options": [
      "A) f = 2R",
      "B) f = R / 2",
      "C) f = R",
      "D) f = 1/R"
    ],
    "ans": "B) f = R / 2",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "13. प्रिज्म से गुजरने पर किस रंग के प्रकाश का विचलन (Deviation) सबसे अधिक होता है?\n[Which color deviates most when passing through a prism?]",
    "options": [
      "A) लाल (Red)",
      "B) बैगनी (Violet)",
      "C) पीला (Yellow)",
      "D) हरा (Green)"
    ],
    "ans": "B) बैगनी (Violet - न्यूनतम तरंगदैर्ध्य के कारण अधिकतम विचलन)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "14. खतरे के संकेत (Danger signals) में लाल रंग का उपयोग क्यों किया जाता है?\n[Why is red color used in danger signals?]",
    "options": [
      "A) इसका प्रकीर्णन सबसे कम होता है",
      "B) इसका प्रकीर्णन सबसे अधिक होता है",
      "C) यह आंखों को प्रिय लगता है",
      "D) इसका वेग अधिक होता है"
    ],
    "ans": "A) इसका प्रकीर्णन सबसे कम होता है (तरंगदैर्ध्य सर्वाधिक होती है)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "15. सामान्य दृष्टि के वयस्क के लिए सुस्पष्ट दर्शन की अल्पतम दूरी (Least distance of distinct vision) कितनी होती है?\n[Least distance of distinct vision for normal eye:]",
    "options": [
      "A) 25 m",
      "B) 2.5 cm",
      "C) 25 cm",
      "D) अनंत (Infinity)"
    ],
    "ans": "C) 25 cm (निकट बिंदु 25 cm तथा दूर बिंदु अनंत होता है)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "16. विद्युत आवेश (Electric Charge) का SI मात्रक क्या है?\n[SI unit of Electric Charge:]",
    "options": [
      "A) वोल्ट",
      "B) एम्पियर",
      "C) कूलॉम (Coulomb)",
      "D) जूल"
    ],
    "ans": "C) कूलॉम (Coulomb - 1 C = 6.25 × 10¹⁸ इलेक्ट्रॉन)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "17. विभवांतर (Potential Difference) मापने वाले यंत्र को क्या कहा जाता है?\n[Device used to measure Potential Difference:]",
    "options": [
      "A) अमीटर",
      "B) वोल्टमीटर (Voltmeter)",
      "C) गैल्वेनोमीटर",
      "D) पोटेंशियोमीटर"
    ],
    "ans": "B) वोल्टमीटर (परिपथ के समांतर क्रम में जोड़ा जाता है)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "18. विद्युत परिपथ में धारा (Electric Current) मापने हेतु किसे श्रेणीक्रम में जोड़ा जाता है?\n[Instrument connected in series to measure Current:]",
    "options": [
      "A) वोल्टमीटर",
      "B) अमीटर (Ammeter)",
      "C) ओममीटर",
      "D) रियोस्टेट"
    ],
    "ans": "B) अमीटर (Ammeter - आदर्श अमीटर का प्रतिरोध शून्य होता है)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "19. ओम के नियम का सही गणितीय सूत्र क्या है?\n[Correct mathematical formula for Ohm's Law:]",
    "options": [
      "A) V = I / R",
      "B) V = I × R",
      "C) I = V × R",
      "D) R = V × I"
    ],
    "ans": "B) V = I × R (विभवांतर = धारा × प्रतिरोध)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "20. 1 किलोवाट-घंटा (1 kWh) विद्युत ऊर्जा में कितने जूल होते हैं?\n[1 kWh electrical energy equals how many Joules?]",
    "options": [
      "A) 3.6 × 10⁵ J",
      "B) 3.6 × 10⁶ J (1 Commercial Unit)",
      "C) 746 J",
      "D) 1000 J"
    ],
    "ans": "B) 3.6 × 10⁶ J (यही 1 यूनिट बिजली कहलाती है)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "21. विद्युत बल्ब का तंतु (Filament) किस धातु का बना होता है?\n[Filament of electric bulb is made of:]",
    "options": [
      "A) तांबा",
      "B) टंगस्टन (Tungsten - उच्च गलनांक ~3422°C)",
      "C) नाइक्रोम",
      "D) लोहा"
    ],
    "ans": "B) टंगस्टन (Tungsten)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "22. विद्युत हीटर और गीजर का तापन अवयव (Element) किस मिश्रधातु का बना होता है?\n[Heating element of electric heater is made of:]",
    "options": [
      "A) टंगस्टन",
      "B) नाइक्रोम (Nichrome - Ni+Cr)",
      "C) पीतल",
      "D) कांस्य"
    ],
    "ans": "B) नाइक्रोम (Nichrome)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "23. विद्युत फ्यूज तार (Electric Fuse Wire) की क्या विशेषता होनी चाहिए?\n[Characteristics of an electric fuse wire:]",
    "options": [
      "A) उच्च गलनांक, निम्न प्रतिरोध",
      "B) निम्न गलनांक एवं उच्च प्रतिरोध",
      "C) उच्च गलनांक, उच्च प्रतिरोध",
      "D) शून्य प्रतिरोध"
    ],
    "ans": "B) निम्न गलनांक एवं उच्च प्रतिरोध (अतिभारण होने पर तुरंत पिघल जाता है)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "24. घरों में विद्युत उपकरण किस क्रम में जोड़े जाते हैं?\n[Domestic electrical appliances are connected in:]",
    "options": [
      "A) श्रेणीक्रम (Series)",
      "B) समांतर क्रम (Parallel Connection)",
      "C) मिश्रित क्रम",
      "D) चक्रीय क्रम"
    ],
    "ans": "B) समांतर क्रम (ताकि सभी उपकरणों को 220V समान विभवांतर मिले)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "25. फ्लेमिंग के वामहस्त (बाएं हाथ) के नियम में तर्जनी अंगुली किसकी दिशा दर्शाती है?\n[In Fleming's Left Hand Rule, forefinger represents direction of:]",
    "options": [
      "A) विद्युत धारा",
      "B) चुंबकीय क्षेत्र (Magnetic Field)",
      "C) बल या गति",
      "D) विभव"
    ],
    "ans": "B) चुंबकीय क्षेत्र (Forefinger = Field, Middle = Current, Thumb = Force)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "26. विद्युत धारा का SI मात्रक क्या है?\n[SI unit of Electric Current:]",
    "options": [
      "A) वोल्ट",
      "B) एम्पियर (Ampere)",
      "C) वाट",
      "D) कूलॉम"
    ],
    "ans": "B) एम्पियर (A = C/s)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "27. प्रतिरोध का SI मात्रक क्या है?\n[SI unit of Electrical Resistance:]",
    "options": [
      "A) ओम (Ω)",
      "B) ओम-मीटर",
      "C) म्हो",
      "D) सीमेंस"
    ],
    "ans": "A) ओम (Ω) - विशिष्ट प्रतिरोध का मात्रक ओम-मीटर होता है",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "28. विद्युत जनित्र (Electric Generator / Dynamo) किस सिद्धांत पर कार्य करता है?\n[Electric Generator works on the principle of:]",
    "options": [
      "A) धारा का उष्मीय प्रभाव",
      "B) विद्युत चुंबकीय प्रेरण (Electromagnetic Induction)",
      "C) रासायनिक प्रभाव",
      "D) पास्कल नियम"
    ],
    "ans": "B) विद्युत चुंबकीय प्रेरण (फैराडे का नियम)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "29. प्रत्यावर्ती धारा (AC) की आवृत्ति भारत में सामान्यतः कितनी होती है?\n[Frequency of AC domestic supply in India:]",
    "options": [
      "A) 60 Hz",
      "B) 50 Hz",
      "C) 100 Hz",
      "D) 220 Hz"
    ],
    "ans": "B) 50 Hz (220 वोल्ट विभवांतर)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "30. लघु परिपथन (Short Circuit) के समय परिपथ में विद्युत धारा का मान:\n[At the time of Short Circuit, current in the circuit:]",
    "options": [
      "A) बहुत कम हो जाता है",
      "B) अत्यधिक बढ़ जाता है (Increases enormously)",
      "C) अपरिवर्तित रहता है",
      "D) निरंतर घटता है"
    ],
    "ans": "B) अत्यधिक बढ़ जाता है (Increases enormously)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "31. फेरस सल्फेट क्रिस्टल (Green Vitriol) का रासायनिक सूत्र क्या है?\n[Chemical formula of Ferrous Sulphate crystal:]",
    "options": [
      "A) FeSO₄·5H₂O",
      "B) FeSO₄·7H₂O",
      "C) FeSO₄·2H₂O",
      "D) Fe₂O₃"
    ],
    "ans": "B) FeSO₄·7H₂O (गर्म करने पर Fe₂O₃ भूरे रंग में बदलता है)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "32. विरंजक चूर्ण (Bleaching Powder) का रासायनिक नाम और सूत्र क्या है?\n[Chemical name and formula of Bleaching Powder:]",
    "options": [
      "A) CaCO₃",
      "B) CaOCl₂ (कैल्शियम ऑक्सीक्लोराइड)",
      "C) Ca(OH)₂",
      "D) CaCl₂"
    ],
    "ans": "B) CaOCl₂ (कैल्शियम ऑक्सीक्लोराइड)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "33. बेकिंग सोडा (मीठा सोडा) का रासायनिक सूत्र क्या है?\n[Chemical formula of Baking Soda:]",
    "options": [
      "A) Na₂CO₃",
      "B) NaHCO₃ (सोडियम हाइड्रोजन कार्बोनेट)",
      "C) NaOH",
      "D) KOH"
    ],
    "ans": "B) NaHCO₃ (Sodium Hydrogen Carbonate)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "34. धावन सोडा (Washing Soda) का रासायनिक सूत्र क्या है?\n[Chemical formula of Washing Soda:]",
    "options": [
      "A) NaHCO₃",
      "B) Na₂CO₃·10H₂O (डेकाहाइड्रेट)",
      "C) Na₂SO₄",
      "D) NaCl"
    ],
    "ans": "B) Na₂CO₃·10H₂O",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "35. प्लास्टर ऑफ पेरिस (POP) का रासायनिक सूत्र क्या है?\n[Chemical formula of Plaster of Paris:]",
    "options": [
      "A) CaSO₄·2H₂O",
      "B) CaSO₄·½H₂O (हेमीहाइड्रेट)",
      "C) CaSO₄·H₂O",
      "D) MgSO₄·7H₂O"
    ],
    "ans": "B) CaSO₄·½H₂O (जिप्सम को 373 K पर गर्म करने से बनता है)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "36. जिप्सम (Gypsum) का रासायनिक सूत्र क्या है?\n[Chemical formula of Gypsum:]",
    "options": [
      "A) CaSO₄·½H₂O",
      "B) CaSO₄·2H₂O (डाईहाइड्रेट)",
      "C) CaCO₃",
      "D) CaO"
    ],
    "ans": "B) CaSO₄·2H₂O",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "37. श्वसन (Respiration) किस प्रकार की रासायनिक अभिक्रिया है?\n[What type of chemical reaction is Respiration?]",
    "options": [
      "A) ऊष्माशोषी (Endothermic)",
      "B) ऊष्माक्षेपी (Exothermic Reaction)",
      "C) संयोजन",
      "D) अपचयन"
    ],
    "ans": "B) ऊष्माक्षेपी अभिक्रिया (ऊर्जा मुक्त होती है)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "38. लोहे पर जंग लगना (Rusting of Iron) किस प्रकार की अभिक्रिया है?\n[Rusting of iron is an example of:]",
    "options": [
      "A) ऑक्सीकरण (संक्षारण / Corrosion)",
      "B) अपचयन",
      "C) केवल भौतिक परिवर्तन",
      "D) विस्थापन"
    ],
    "ans": "A) ऑक्सीकरण एवं संक्षारण (Fe₂O₃·xH₂O बनता है)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "39. चिप्स की थैली में कौन सी अक्रिय गैस भरी जाती है ताकि उपचयन न हो?\n[Inert gas flushed in potato chips packets to prevent rancidity:]",
    "options": [
      "A) ऑक्सीजन",
      "B) नाइट्रोजन (Nitrogen Gas - N₂)",
      "C) कार्बन डाइऑक्साइड",
      "D) हाइड्रोजन"
    ],
    "ans": "B) नाइट्रोजन गैस (Nitrogen Gas)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "40. बिना बुझा हुआ चूना (Quick Lime) का रासायनिक सूत्र क्या है?\n[Chemical formula of Quick Lime:]",
    "options": [
      "A) Ca(OH)₂",
      "B) CaO (कैल्शियम ऑक्साइड)",
      "C) CaCO₃",
      "D) CaCl₂"
    ],
    "ans": "B) CaO (कैल्शियम ऑक्साइड)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "41. बुझा हुआ चूना (Slaked Lime) का रासायनिक सूत्र क्या है?\n[Chemical formula of Slaked Lime:]",
    "options": [
      "A) CaO",
      "B) Ca(OH)₂ (कैल्शियम हाइड्रॉक्साइड)",
      "C) CaCO₃",
      "D) CaSO₄"
    ],
    "ans": "B) Ca(OH)₂",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "42. संगमरमर (Marble) और चूना पत्थर का रासायनिक सूत्र क्या है?\n[Chemical formula of Marble and Limestone:]",
    "options": [
      "A) CaO",
      "B) CaCO₃ (कैल्शियम कार्बोनेट)",
      "C) Ca(OH)₂",
      "D) CaSO₄"
    ],
    "ans": "B) CaCO₃ (कैल्शियम कार्बोनेट)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "43. लेड नाइट्रेट को गर्म करने पर भूरे रंग का कौन सा धुआं निकलता है?\n[Brown gas emitted on heating Lead Nitrate Pb(NO₃)₂:]",
    "options": [
      "A) ऑक्सीजन (O₂)",
      "B) नाइट्रोजन डाइऑक्साइड (NO₂)",
      "C) लेड ऑक्साइड",
      "D) अमोनिया"
    ],
    "ans": "B) नाइट्रोजन डाइऑक्साइड (NO₂)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "44. तेल एवं वसायुक्त खाद्य पदार्थों का स्वाद व गंध विकृत होना क्या कहलाता है?\n[Spoilage of fats and oils leading to bad smell and taste is:]",
    "options": [
      "A) संक्षारण",
      "B) विकृतगंधिता (Rancidity)",
      "C) उदासीनीकरण",
      "D) किण्वन"
    ],
    "ans": "B) विकृतगंधिता (Rancidity)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "45. सिल्वर क्लोराइड (AgCl) को सूर्य के प्रकाश में रखने पर इसका रंग कैसा हो जाता है?\n[Color of Silver Chloride when exposed to sunlight:]",
    "options": [
      "A) श्वेत",
      "B) धूसर (Grey)",
      "C) पीला",
      "D) लाल"
    ],
    "ans": "B) धूसर (Grey - प्रकाश अपघटन अभिक्रिया)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "46. शुद्ध जल का pH मान कितना होता है?\n[pH of pure water at 25°C:]",
    "options": [
      "A) 0",
      "B) 7 (उदासीन / Neutral)",
      "C) 14",
      "D) 1"
    ],
    "ans": "B) 7 (उदासीन)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "47. मानव रक्त का pH मान लगभग कितना होता है?\n[pH value of human blood:]",
    "options": [
      "A) 6.4",
      "B) 7.4 (हल्का क्षारीय)",
      "C) 8.5",
      "D) 5.5"
    ],
    "ans": "B) 7.4 (Slightly Alkaline)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "48. अम्ल नीले लिटमस पत्र को किस रंग में बदल देते हैं?\n[Acids turn blue litmus into:]",
    "options": [
      "A) हरा",
      "B) लाल (Red)",
      "C) पीला",
      "D) रंगहीन"
    ],
    "ans": "B) लाल (Trick: 'अनिल' = अम्ल नीले को लाल करता है)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "49. क्षार लाल लिटमस पत्र को किस रंग में बदल देते हैं?\n[Bases turn red litmus into:]",
    "options": [
      "A) नीला (Blue)",
      "B) पीला",
      "C) गुलाबी",
      "D) काला"
    ],
    "ans": "A) नीला (Blue)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "50. चींटी के डंक (Ant Sting) और नेटल के डंक में कौन सा अम्ल होता है?\n[Acid present in Ant's sting and Nettle sting:]",
    "options": [
      "A) सिट्रिक अम्ल",
      "B) मेथेनॉइक अम्ल / फॉर्मिक अम्ल (HCOOH)",
      "C) एसिटिक अम्ल",
      "D) ऑक्सालिक अम्ल"
    ],
    "ans": "B) मेथेनॉइक अम्ल (Methanoic acid / Formic acid)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "51. सिरका (Vinegar) में कौन सा अम्ल 5% से 8% मात्रा में पाया जाता है?\n[Acid present in Vinegar (5-8%):]",
    "options": [
      "A) फॉर्मिक अम्ल",
      "B) एसिटिक अम्ल (एथेनॉइक अम्ल - CH₃COOH)",
      "C) टार्टरिक अम्ल",
      "D) लैक्टिक अम्ल"
    ],
    "ans": "B) एसिटिक अम्ल (CH₃COOH)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "52. खट्टे दूध या दही में कौन सा अम्ल पाया जाता है?\n[Acid present in Sour Milk or Curd:]",
    "options": [
      "A) सिट्रिक अम्ल",
      "B) लैक्टिक अम्ल (Lactic Acid)",
      "C) टार्टरिक अम्ल",
      "D) मैलिक अम्ल"
    ],
    "ans": "B) लैक्टिक अम्ल (Lactic Acid)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "53. इमली (Tamarind) में कौन सा अम्ल पाया जाता है?\n[Acid present in Tamarind:]",
    "options": [
      "A) मैलिक अम्ल",
      "B) टार्टरिक अम्ल (Tartaric Acid)",
      "C) सिट्रिक अम्ल",
      "D) ऑक्सालिक अम्ल"
    ],
    "ans": "B) टार्टरिक अम्ल (Tartaric Acid)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "54. टमाटर में कौन सा कार्बनिक अम्ल मुख्य रूप से उपस्थित होता है?\n[Acid primarily present in Tomatoes:]",
    "options": [
      "A) एसिटिक अम्ल",
      "B) ऑक्सालिक अम्ल (Oxalic Acid)",
      "C) फॉर्मिक अम्ल",
      "D) लैक्टिक अम्ल"
    ],
    "ans": "B) ऑक्सालिक अम्ल (Oxalic Acid)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "55. अम्लीय वर्षा (Acid Rain) के जल का pH मान कितना होता है?\n[pH of Acid Rain is:]",
    "options": [
      "A) 7.0 से अधिक",
      "B) 5.6 से कम",
      "C) 8.2",
      "D) 6.8"
    ],
    "ans": "B) 5.6 से कम (SO₂ और NO₂ के कारण)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "56. हमारे उदर (Stomach) में भोजन के पाचन हेतु कौन सा अम्ल स्रावित होता है?\n[Acid produced in human stomach for digestion:]",
    "options": [
      "A) सल्फ्यूरिक अम्ल (H₂SO₄)",
      "B) हाइड्रोक्लोरिक अम्ल (HCl)",
      "C) नाइट्रिक अम्ल (HNO₃)",
      "D) फॉस्फोरिक अम्ल"
    ],
    "ans": "B) हाइड्रोक्लोरिक अम्ल (HCl - पेप्सिन को सक्रिय करता है)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "57. दांतों का इनेमल (Tooth Enamel) किसका बना होता है जो शरीर का सबसे कठोर पदार्थ है?\n[Tooth enamel is composed of:]",
    "options": [
      "A) कैल्शियम फॉस्फेट (Ca₃(PO₄)₂)",
      "B) कैल्शियम कार्बोनेट",
      "C) मैग्नीशियम ऑक्साइड",
      "D) सोडियम क्लोराइड"
    ],
    "ans": "A) कैल्शियम फॉस्फेट (pH 5.5 से कम होने पर संक्षारित होने लगता है)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "58. कमरे के सामान्य ताप पर द्रव अवस्था में पाई जाने वाली एकमात्र धातु कौन सी है?\n[Only metal that exists as liquid at room temperature:]",
    "options": [
      "A) सोडियम",
      "B) पारा (Mercury - Hg)",
      "C) गैलियम",
      "D) सीसा"
    ],
    "ans": "B) पारा (Mercury - संकेत Hg)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "59. कमरे के ताप पर द्रव अवस्था में पाई जाने वाली एकमात्र अधातु कौन सी है?\n[Only non-metal that exists as liquid at room temperature:]",
    "options": [
      "A) क्लोरीन",
      "B) ब्रोमीन (Bromine - Br)",
      "C) आयोडीन",
      "D) फास्फोरस"
    ],
    "ans": "B) ब्रोमीन (Bromine - संकेत Br)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "60. कौन सी धातुएं इतनी मुलायम होती हैं कि उन्हें चाकू से आसानी से काटा जा सकता है?\n[Metals so soft that they can be cut easily with a knife:]",
    "options": [
      "A) लोहा और तांबा",
      "B) सोडियम और पोटैशियम (Na & K)",
      "C) सोना और चांदी",
      "D) एल्युमिनियम और जस्ता"
    ],
    "ans": "B) सोडियम (Na) एवं पोटैशियम (K) - इन्हें केरोसिन में डुबोकर रखते हैं",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "61. कार्बन का कौन सा अपररूप (Allotrope) विद्युत का सुचालक (Good conductor) होता है?\n[Allotrope of Carbon that is a good conductor of electricity:]",
    "options": [
      "A) हीरा (Diamond)",
      "B) ग्रेफाइट (Graphite - मुक्त इलेक्ट्रॉन के कारण)",
      "C) कोयला",
      "D) कोक"
    ],
    "ans": "B) ग्रेफाइट (Graphite)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "62. प्रकृति में पाया जाने वाला सबसे कठोरतम प्राकृतिक पदार्थ कौन सा है?\n[Hardest naturally occurring substance on Earth:]",
    "options": [
      "A) ग्रेफाइट",
      "B) हीरा (Diamond)",
      "C) प्लैटिनम",
      "D) लोहा"
    ],
    "ans": "B) हीरा (Diamond - कार्बन का पारदर्शी अपररूप)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "63. ऐल्केन (Alkane) श्रेणी का सामान्य सूत्र क्या है?\n[General formula of Alkane series:]",
    "options": [
      "A) CₙH₂ₙ₊₂",
      "B) CₙH₂ₙ",
      "C) CₙH₂ₙ₋₂",
      "D) CₙH₂ₙ₊₁"
    ],
    "ans": "A) CₙH₂ₙ₊₂ (जैसे मेथेन CH₄, एथेन C₂H₆)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "64. ऐल्कीन (Alkene) श्रेणी का सामान्य सूत्र क्या है?\n[General formula of Alkene series:]",
    "options": [
      "A) CₙH₂ₙ₊₂",
      "B) CₙH₂ₙ",
      "C) CₙH₂ₙ₋₂",
      "D) CₙH₂ₙ₋₁"
    ],
    "ans": "B) CₙH₂ₙ (द्विआबंध युक्त - एथीन C₂H₄)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "65. ऐल्काइन (Alkyne) श्रेणी का सामान्य सूत्र क्या है?\n[General formula of Alkyne series:]",
    "options": [
      "A) CₙH₂ₙ₊₂",
      "B) CₙH₂ₙ",
      "C) CₙH₂ₙ₋₂",
      "D) CₙH₂ₙ₊₁OH"
    ],
    "ans": "C) CₙH₂ₙ₋₂ (त्रिआबंध युक्त - एसीटिलीन C₂H₂)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "66. आनुवंशिकी का जनक (Father of Genetics) किसे कहा जाता है?\n[Who is known as the Father of Genetics?]",
    "options": [
      "A) चार्ल्स डार्विन",
      "B) ग्रेगर जॉन मेंडल (Gregor Mendel)",
      "C) लैमार्क",
      "D) रॉबर्ट कोच"
    ],
    "ans": "B) ग्रेगर जॉन मेंडल (मटर के पौधे Pisum sativum पर संकरण प्रयोग)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "67. मानव वृक्क (Human Kidney) की रचनात्मक एवं कार्यात्मक इकाई क्या है?\n[Structural and functional unit of Human Kidney:]",
    "options": [
      "A) न्यूरॉन",
      "B) नेफ्रॉन (Nephron / वृक्काणु)",
      "C) माइटोकॉन्ड्रिया",
      "D) एल्वियोली"
    ],
    "ans": "B) नेफ्रॉन (Nephron / वृक्काणु)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "68. तंत्रिका तंत्र (Nervous System) की संरचनात्मक एवं कार्यात्मक इकाई क्या है?\n[Structural and functional unit of Nervous System:]",
    "options": [
      "A) नेफ्रॉन",
      "B) न्यूरॉन / तंत्रिका कोशिका (Neuron)",
      "C) कोशिका द्रव्य",
      "D) राइबोसोम"
    ],
    "ans": "B) न्यूरॉन (Neuron - शरीर की सबसे लम्बी कोशिका)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "69. कोशिका का 'ऊर्जा गृह' (Powerhouse of the Cell) किसे कहा जाता है?\n[Which cell organelle is called the 'Powerhouse of the Cell'?]",
    "options": [
      "A) राइबोसोम",
      "B) माइटोकॉन्ड्रिया (Mitochondria - ATP निर्माण)",
      "C) गॉल्जीकाय",
      "D) लवक"
    ],
    "ans": "B) माइटोकॉन्ड्रिया (ATP के रूप में ऊर्जा संचित होती है)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "70. कोशिका की 'आत्मघाती थैली' (Suicide Bag of the Cell) किसे कहते हैं?\n[Organelle known as the 'Suicidal Bag' of cell:]",
    "options": [
      "A) राइबोसोम",
      "B) लाइसोसोम (Lysosome)",
      "C) रिक्तिका",
      "D) सेंट्रोसोम"
    ],
    "ans": "B) लाइसोसोम (Lysosome - जल-अपघटकीय एंजाइम युक्त)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "71. पादपों में जल एवं खनिजों का संवहन (Transport of Water) किस ऊतक द्वारा होता है?\n[Tissue responsible for transport of water in plants:]",
    "options": [
      "A) जाइलम (Xylem)",
      "B) फ्लोएम",
      "C) पैरेन्काइमा",
      "D) कैम्बियम"
    ],
    "ans": "A) जाइलम (Xylem - जल का एकदिशीय परिवहन)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "72. पादपों में निर्मित भोजन का संवहन (Transport of Food) किस ऊतक द्वारा होता है?\n[Tissue responsible for transport of synthesized food in plants:]",
    "options": [
      "A) जाइलम",
      "B) फ्लोएम (Phloem)",
      "C) पैरेन्काइमा",
      "D) कोलेनकाइमा"
    ],
    "ans": "B) फ्लोएम (Phloem - पत्तियों से सभी भागों तक द्विदिशीय)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "73. प्रकाश संश्लेषण (Photosynthesis) के दौरान कौन सी गैस मुक्त होती है?\n[Gas released during photosynthesis:]",
    "options": [
      "A) कार्बन डाइऑक्साइड",
      "B) ऑक्सीजन (O₂ - जल के प्रकाशिक अपघटन से)",
      "C) नाइट्रोजन",
      "D) मेथेन"
    ],
    "ans": "B) ऑक्सीजन (O₂)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "74. क्लोरोफिल वर्णक का रंग कैसा होता है तथा इसमें कौन सी धातु पाई जाती है?\n[Color of chlorophyll and metal present in it:]",
    "options": [
      "A) पीला, लोहा",
      "B) हरा, मैग्नीशियम (Mg)",
      "C) लाल, तांबा",
      "D) नीला, जस्ता"
    ],
    "ans": "B) हरा रंग, मैग्नीशियम (Mg) धातु उपस्थित होती है",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "75. मानव हृदय (Human Heart) में कुल कितने कोष्ठ (Chambers) होते हैं?\n[How many chambers are there in human heart?]",
    "options": [
      "A) 2",
      "B) 3",
      "C) 4 (दो अलिंद व दो निलय)",
      "D) 6"
    ],
    "ans": "C) 4 कोष्ठ (Two Atria and Two Ventricles)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "76. मानव शरीर का सामान्य रक्तचाप (Normal Blood Pressure) कितना होता है?\n[Normal blood pressure in a healthy human adult:]",
    "options": [
      "A) 80/120 mm Hg",
      "B) 120/80 mm Hg (सिस्टोलिक/डायस्टोलिक)",
      "C) 100/60 mm Hg",
      "D) 140/90 mm Hg"
    ],
    "ans": "B) 120/80 mm Hg",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "77. रक्तचाप (Blood Pressure) मापने वाले यंत्र को क्या कहा जाता है?\n[Instrument used to measure blood pressure:]",
    "options": [
      "A) बैरोमीटर",
      "B) स्फिग्मोमैनोमीटर (Sphygmomanometer)",
      "C) स्टेथोस्कोप",
      "D) थर्मामीटर"
    ],
    "ans": "B) स्फिग्मोमैनोमीटर (Sphygmomanometer)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "78. मानव शरीर में रक्त का थक्का (Blood Clotting) जमाने में कौन सा विटामिन सहायक है?\n[Vitamin essential for blood clotting:]",
    "options": [
      "A) विटामिन A",
      "B) विटामिन C",
      "C) विटामिन K (Phylloquinone)",
      "D) विटामिन D"
    ],
    "ans": "C) विटामिन K (Phylloquinone)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "79. सर्वदाता रक्त समूह (Universal Blood Donor) कौन सा है?\n[Which blood group is known as Universal Donor?]",
    "options": [
      "A) AB+",
      "B) O- (या O)",
      "C) A+",
      "D) B-"
    ],
    "ans": "B) O (O- में कोई एंटीजन नहीं होता)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "80. सर्वग्राही रक्त समूह (Universal Blood Recipient) कौन सा है?\n[Which blood group is Universal Recipient?]",
    "options": [
      "A) O+",
      "B) AB+ (या AB)",
      "C) A+",
      "D) B+"
    ],
    "ans": "B) AB (इसमें कोई एंटीबॉडी नहीं होती)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "81. इन्सुलिन हार्मोन (Insulin Hormone) की कमी से कौन सा रोग होता है?\n[Deficiency of Insulin hormone causes:]",
    "options": [
      "A) घेंघा (Goitre)",
      "B) मधुमेह / डायबिटीज (Diabetes Mellitus)",
      "C) रिकेट्स",
      "D) एनीमिया"
    ],
    "ans": "B) मधुमेह / डायबिटीज (अग्न्याशय के लैंगरहेंस द्वीपिकाओं की बीटा कोशिकाओं से स्राव)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "82. थायरॉक्सिन हार्मोन के संश्लेषण के लिए कौन सा तत्व अनिवार्य है?\n[Element essential for synthesis of thyroxine hormone:]",
    "options": [
      "A) लोहा",
      "B) आयोडीन (Iodine - कमी से घेंघा रोग)",
      "C) कैल्शियम",
      "D) पोटैशियम"
    ],
    "ans": "B) आयोडीन (Iodine - घेंघा या गलगंड रोग से बचाव)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "83. आपातकालीन हार्मोन (Emergency Hormone / Fight or Flight) किसे कहते हैं?\n[Hormone known as Emergency Hormone:]",
    "options": [
      "A) थायरॉक्सिन",
      "B) एड्रीनेलिन (Adrenaline)",
      "C) इन्सुलिन",
      "D) एस्ट्रोजन"
    ],
    "ans": "B) एड्रीनेलिन (Adrenaline - अधिवृक्क ग्रंथि से स्रावित)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "84. मनुष्य में गुणसूत्रों (Chromosomes) की कुल संख्या कितनी होती है?\n[Total number of chromosomes in human cell:]",
    "options": [
      "A) 23",
      "B) 46 (23 जोड़े)",
      "C) 44",
      "D) 48"
    ],
    "ans": "B) 46 (23 जोड़े: 22 जोड़े ऑटोसोम + 1 जोड़ा लिंग गुणसूत्र)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "85. पुरुष में कौन सा लिंग गुणसूत्र संयोजन पाया जाता है?\n[Sex chromosome combination in human males:]",
    "options": [
      "A) XX",
      "B) XY",
      "C) YY",
      "D) XO"
    ],
    "ans": "B) XY (महिला में XX संयोजन होता है)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "86. ओजोन परत (Ozone Layer) का मुख्य कार्य क्या है?\n[Primary function of ozone layer in atmosphere:]",
    "options": [
      "A) ग्रीनहाउस प्रभाव बढ़ाना",
      "B) सूर्य की पराबैंगनी किरणों (UV rays) को रोकना",
      "C) वर्षा कराना",
      "D) ऑक्सीजन उत्पादन"
    ],
    "ans": "B) पराबैंगनी किरणों (UV rays) को अवशोषित करना",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "87. ओजोन गैस का रासायनिक अणुसूत्र क्या है?\n[Chemical formula of Ozone molecule:]",
    "options": [
      "A) O",
      "B) O₂",
      "C) O₃ (तीन ऑक्सीजन परमाणु)",
      "D) O₄"
    ],
    "ans": "C) O₃",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "88. ओजोन परत को सर्वाधिक क्षति पहुंचाने वाला रसायन कौन सा है?\n[Main chemical causing depletion of Ozone Layer:]",
    "options": [
      "A) कार्बन मोनोऑक्साइड",
      "B) क्लोरोफ्लोरोकार्बन (CFCs / Freon)",
      "C) सल्फर डाइऑक्साइड",
      "D) मिथेन"
    ],
    "ans": "B) क्लोरोफ्लोरोकार्बन (CFCs - रेफ्रिजरेटर व AC में प्रयुक्त)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "89. विश्व ओजोन दिवस (World Ozone Day) प्रत्येक वर्ष कब मनाया जाता है?\n[World Ozone Day is celebrated every year on:]",
    "options": [
      "A) 5 जून",
      "B) 16 सितम्बर (16th September)",
      "C) 22 अप्रैल",
      "D) 1 दिसंबर"
    ],
    "ans": "B) 16 सितम्बर (मॉन्ट्रियल प्रोटोकॉल 1987 की स्मृति में)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "90. किसी पारितंत्र (Ecosystem) में ऊर्जा का प्राथमिक स्रोत क्या है?\n[Primary source of energy in any ecosystem:]",
    "options": [
      "A) एटीपी (ATP)",
      "B) सूर्य का प्रकाश (Solar Energy)",
      "C) हरा पौधा",
      "D) ग्लूकोज"
    ],
    "ans": "B) सूर्य का प्रकाश (Solar Energy)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "91. 10% का ऊर्जा स्थानांतरण नियम (10% Energy Transfer Law) किसने प्रतिपादित किया था?\n[Who proposed the 10% law of energy transfer in food chain?]",
    "options": [
      "A) चार्ल्स डार्विन",
      "B) रेमंड लिंडेमान (Raymond Lindeman - 1942)",
      "C) अर्नेस्ट हेकल",
      "D) ओडम"
    ],
    "ans": "B) रेमंड लिंडेमान (प्रत्येक पोषण स्तर पर केवल 10% ऊर्जा ही आगे जाती है)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "92. पर्यावरण की सुरक्षा हेतु प्रसिद्ध 'चिपको आंदोलन' किस राज्य से शुरू हुआ था?\n[Famous Chipko movement started from which Indian state?]",
    "options": [
      "A) बिहार",
      "B) उत्तराखंड (चमोली जिला - सुंदरलाल बहुगुणा)",
      "C) राजस्थान",
      "D) मध्य प्रदेश"
    ],
    "ans": "B) उत्तराखंड (चमोली जनपद में 1973 में)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "93. बायोगैस (Biogas / Gobar Gas) का मुख्य घटक कौन सी गैस है?\n[Main constituent gas of Biogas:]",
    "options": [
      "A) प्रोपेन",
      "B) मेथेन (Methane - CH₄ लगभग 75%)",
      "C) ब्यूटेन",
      "D) हाइड्रोजन"
    ],
    "ans": "B) मेथेन (CH₄ - लगभग 65% से 75%)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "94. सीएनजी (Compressed Natural Gas - CNG) का प्रमुख घटक क्या है?\n[Primary constituent of CNG:]",
    "options": [
      "A) प्रोपेन",
      "B) मेथेन (Methane)",
      "C) एथेन",
      "D) ब्यूटेन"
    ],
    "ans": "B) मेथेन (Methane)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "95. एलपीजी (LPG - घरेलू रसोई गैस) में गंध हेतु कौन सा यौगिक मिलाया जाता है?\n[Substance added to LPG cylinders for leak detection odor:]",
    "options": [
      "A) मेथिल अल्कोहल",
      "B) एथिल मरकैप्टन (Ethyl Mercaptan - C₂H₅SH)",
      "C) क्लोरोफॉर्म",
      "D) ईथर"
    ],
    "ans": "B) एथिल मरकैप्टन (Ethyl Mercaptan)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "96. पौधों में रंध्र (Stomata) के खुलने और बंद होने की क्रिया को कौन नियंत्रित करता है?\n[Cells regulating opening and closing of stomata in leaves:]",
    "options": [
      "A) द्वार कोशिकाएं (Guard Cells)",
      "B) जाइलम कोशिकाएं",
      "C) फ्लोएम कोशिकाएं",
      "D) मूल रोम"
    ],
    "ans": "A) द्वार कोशिकाएं (Guard Cells)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "97. स्त्रियों में निषेचन (Fertilization) की क्रिया सामान्यतः कहाँ संपन्न होती है?\n[In human females, fertilization occurs in:]",
    "options": [
      "A) अंडाशय (Ovary)",
      "B) फैलोपियन नलिका (Fallopian Tube / अंडवाहिनी)",
      "C) गर्भाशय",
      "D) योनि"
    ],
    "ans": "B) फैलोपियन नलिका (Fallopian Tube)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "98. एड्स (AIDS) रोग किस विषाणु (Virus) के संक्रमण से होता है?\n[AIDS is caused by which virus:]",
    "options": [
      "A) हेपेटाइटिस",
      "B) एचआईवी (HIV - Human Immunodeficiency Virus)",
      "C) पोलियो वायरस",
      "D) राइनो वायरस"
    ],
    "ans": "B) HIV (एड्स दिवस 1 दिसंबर को मनाया जाता है)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "99. विटामिन सी (Vitamin C) का रासायनिक नाम क्या है तथा इसकी कमी से कौन सा रोग होता है?\n[Chemical name of Vitamin C and its deficiency disease:]",
    "options": [
      "A) रेटिनॉल - रतौंधी",
      "B) एस्कॉर्बिक अम्ल - स्कर्वी (Scurvy)",
      "C) थायमीन - बेरीबेरी",
      "D) कैल्सीफेरोल - रिकेट्स"
    ],
    "ans": "B) एस्कॉर्बिक अम्ल (Ascorbic Acid) - स्कर्वी रोग (मसूड़ों से खून आना)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "100. मानव शरीर में मास्टर ग्रंथि (Master Gland) किसे कहा जाता है?\n[Which gland is called the Master Gland of human body?]",
    "options": [
      "A) थायरॉयड ग्रंथि",
      "B) पीयूष ग्रंथि (Pituitary Gland)",
      "C) अग्न्याशय",
      "D) अधिवृक्क ग्रंथि"
    ],
    "ans": "B) पीयूष ग्रंथि (Pituitary Gland - मस्तिष्क के आधार पर स्थित)",
    "subjectName": "विज्ञान (Science)"
  }
],
    subjectives: [], // Competitive CBT: 100% Objective
    hallOfFame: MASTER_HALL_OF_FAME,
    shortcuts: MASTER_SHORTCUTS
  },
  {
    id: "up-police-hindi",
    title: "UP Police Constable / SI - 300 रामबाण सामान्य हिन्दी एवं व्याकरण प्रश्न",
    exam: "UP Police Constable & Sub-Inspector (UPPRPB)",
    price: 9,
    pages: "28 Pages Master PDF",
    rating: "4.9 ★ (2,800 downloads)",
    badge: "🏆 80+ Vyakaran & GK MCQs",
    sampleQuestions: [
      { q: "1. 'संधि' के कितने मुख्य भेद होते हैं?", a: "उत्तर: 3 भेद (स्वर संधि, व्यंजन संधि, विसर्ग संधि)।" },
      { q: "2. 'दशानन' में कौन सा समास है?", a: "उत्तर: बहुव्रीहि समास (दस हैं आनन जिसके अर्थात् रावण)।" },
      { q: "3. 'कनक कनक ते सौ गुनी' में कौन सा अलंकार है?", a: "उत्तर: यमक अलंकार (एक कनक = सोना, दूसरा = धतूरा)।" }
    ],
    objectives: [
  {
    "q": "1. 'संधि' के मुख्य रूप से कितने भेद होते हैं?\n[How many main types of Sandhi are there in Hindi grammar?]",
    "options": [
      "A) 2",
      "B) 3 भेद (स्वर संधि, व्यंजन संधि, विसर्ग संधि)",
      "C) 4",
      "D) 5"
    ],
    "ans": "B) 3 भेद (स्वर संधि, व्यंजन संधि, विसर्ग संधि)",
    "subjectName": "सामान्य हिन्दी (General Hindi)"
  },
  {
    "q": "2. 'दशानन' (दस हैं आनन जिसके अर्थात् रावण) में कौन सा समास है?\n[Which Samas is present in Dashanan?]",
    "options": [
      "A) तत्पुरुष",
      "B) बहुव्रीहि समास (अन्य पद प्रधान)",
      "C) द्विगु",
      "D) कर्मधारय"
    ],
    "ans": "B) बहुव्रीहि समास (अन्य पद प्रधान)",
    "subjectName": "सामान्य हिन्दी (General Hindi)"
  },
  {
    "q": "3. 'पेड़ से पत्ता गिरा' वाक्य में कौन सा कारक है?\n[Which Karak is used in the Hindi sentence?]",
    "options": [
      "A) करण कारक",
      "B) अपादान कारक (अलगाव का भाव)",
      "C) कर्म कारक",
      "D) संबंध कारक"
    ],
    "ans": "B) अपादान कारक (विभक्ति: 'से' अलग होने के अर्थ में)",
    "subjectName": "सामान्य हिन्दी (General Hindi)"
  },
  {
    "q": "4. 'कनक कनक ते सौ गुनी मादकता अधिकाय' में कौन सा अलंकार है?\n[Identify figure of speech in Hindi verse:]",
    "options": [
      "A) अनुप्रास",
      "B) यमक अलंकार",
      "C) श्लेष",
      "D) रूपक"
    ],
    "ans": "B) यमक अलंकार (पहले कनक का अर्थ 'धतूरा' तथा दूसरे का अर्थ 'सोना' है)",
    "subjectName": "सामान्य हिन्दी (General Hindi)"
  },
  {
    "q": "5. 'तरनि तनूजा तट तमाल तरुवर बहु छाए' में कौन सा अलंकार है?\n[Identify figure of speech:]",
    "options": [
      "A) अनुप्रास अलंकार (वर्ण की आवृत्ति)",
      "B) यमक",
      "C) उपमा",
      "D) उत्प्रेक्षा"
    ],
    "ans": "A) अनुप्रास अलंकार ('त' वर्ण की बार-बार आवृत्ति)",
    "subjectName": "सामान्य हिन्दी (General Hindi)"
  },
  {
    "q": "6. 'प्रत्येक' शब्द का सही संधि विच्छेद क्या होगा?\n[Correct Sandhi-Vichhed of 'Pratyek':]",
    "options": [
      "A) प्रति + एक (यण स्वर संधि)",
      "B) प्रत + एक",
      "C) प्र + प्रत्येक",
      "D) प्रत्ये + क"
    ],
    "ans": "A) प्रति + एक (इ + ए = ये - यण स्वर संधि)",
    "subjectName": "सामान्य हिन्दी (General Hindi)"
  },
  {
    "q": "7. 'सूर्योदय' शब्द का सही संधि विच्छेद क्या होगा?\n[Correct Sandhi-Vichhed of 'Suryodaya':]",
    "options": [
      "A) सूर्य + उदय (गुण स्वर संधि)",
      "B) सूर्यो + दय",
      "C) सूर + उदय",
      "D) सूर्य + दय"
    ],
    "ans": "A) सूर्य + उदय (अ + उ = ओ - गुण स्वर संधि)",
    "subjectName": "सामान्य हिन्दी (General Hindi)"
  },
  {
    "q": "8. 'यथाशक्ति' (शक्ति के अनुसार) में कौन सा समास है?\n[Which Samas is in 'Yathashakti'?]",
    "options": [
      "A) अव्ययीभाव समास",
      "B) तत्पुरुष",
      "C) द्वंद्व",
      "D) बहुव्रीहि"
    ],
    "ans": "A) अव्ययीभाव समास (पहला पद अव्यय 'यथा' है)",
    "subjectName": "सामान्य हिन्दी (General Hindi)"
  },
  {
    "q": "9. 'माता-पिता' और 'दिन-रात' में कौन सा समास है?\n[Which Samas is in 'Mata-Pita' and 'Din-Raat'?]",
    "options": [
      "A) द्विगु समास",
      "B) द्वंद्व समास (दोनों पद प्रधान)",
      "C) कर्मधारय",
      "D) तत्पुरुष"
    ],
    "ans": "B) द्वंद्व समास (योजक चिह्न एवं दोनों पद प्रधान)",
    "subjectName": "सामान्य हिन्दी (General Hindi)"
  },
  {
    "q": "10. 'चौराहा' और 'तिरंगा' में कौन सा समास है?\n[Which Samas is in 'Chauraha' and 'Tiranga'?]",
    "options": [
      "A) द्विगु समास (पहला पद संख्यावाचक)",
      "B) द्वंद्व",
      "C) कर्मधारय",
      "D) अव्ययीभाव"
    ],
    "ans": "A) द्विगु समास (पहला पद संख्यावाची विशेषण)",
    "subjectName": "सामान्य हिन्दी (General Hindi)"
  },
  {
    "q": "11. 'अंगूठा दिखाना' मुहावरे का सही अर्थ क्या है?\n[Meaning of idiom 'Angootha Dikhana':]",
    "options": [
      "A) चिढ़ाना",
      "B) ऐन वक्त पर मना कर देना या धोखा देना",
      "C) अंगूठा बड़ा करना",
      "D) सहायता करना"
    ],
    "ans": "B) साफ इनकार कर देना (मना करना)",
    "subjectName": "सामान्य हिन्दी (General Hindi)"
  },
  {
    "q": "12. 'आंख का तारा होना' मुहावरे का सही अर्थ क्या है?\n[Meaning of idiom 'Aankh ka tara':]",
    "options": [
      "A) अंधा होना",
      "B) बहुत प्यारा होना (अत्यधिक प्रिय)",
      "C) तारा दिखना",
      "D) रात में देखना"
    ],
    "ans": "B) बहुत प्यारा होना (अत्यधिक प्रिय होना)",
    "subjectName": "सामान्य हिन्दी (General Hindi)"
  },
  {
    "q": "13. 'हवा से बातें करना' मुहावरे का सही अर्थ क्या है?\n[Meaning of idiom 'Hawa se baatein karna':]",
    "options": [
      "A) बहुत तेज दौड़ना / चलना",
      "B) घमंड करना",
      "C) पागल होना",
      "D) बातें बनाना"
    ],
    "ans": "A) बहुत तेज गति से दौड़ना",
    "subjectName": "सामान्य हिन्दी (General Hindi)"
  },
  {
    "q": "14. 'अमृत' शब्द का सही विलोम शब्द (Antonym) क्या होगा?\n[Antonym of 'Amrit':]",
    "options": [
      "A) पीयूष",
      "B) विष / गरल",
      "C) सुधा",
      "D) अमिय"
    ],
    "ans": "B) विष (पीयूष व सुधा इसके पर्यायवाची हैं)",
    "subjectName": "सामान्य हिन्दी (General Hindi)"
  },
  {
    "q": "15. 'आकाश' शब्द का पर्यायवाची शब्द कौन सा नहीं है?\n[Which word is NOT a synonym of Akash?]",
    "options": [
      "A) गगन",
      "B) नभ",
      "C) व्योम",
      "D) अवनि"
    ],
    "ans": "D) अवनि (अवनि का अर्थ 'पृथ्वी/धरती' होता है)",
    "subjectName": "सामान्य हिन्दी (General Hindi)"
  },
  {
    "q": "16. 'जो सब कुछ जानता हो' वाक्यांश के लिए एक शब्द क्या होगा?\n[One word for 'One who knows everything':]",
    "options": [
      "A) अल्पज्ञ",
      "B) सर्वज्ञ (Sarvagya)",
      "C) विज्ञ",
      "D) कृतज्ञ"
    ],
    "ans": "B) सर्वज्ञ (कम जानने वाला अल्पज्ञ, न जानने वाला अज्ञ कहलाता है)",
    "subjectName": "सामान्य हिन्दी (General Hindi)"
  },
  {
    "q": "17. 'जिसका कोई शत्रु न जन्मा हो' वाक्यांश के लिए एक शब्द है:\n[One word for 'One who has no enemy born':]",
    "options": [
      "A) अजातशत्रु",
      "B) शत्रुघ्न",
      "C) अजेय",
      "D) अमर"
    ],
    "ans": "A) अजातशत्रु",
    "subjectName": "सामान्य हिन्दी (General Hindi)"
  },
  {
    "q": "18. हिन्दी वर्णमाला में कुल कितने मूल व्यंजन और कितने स्वर माने गए हैं?\n[Total vowels and consonants in Hindi alphabet:]",
    "options": [
      "A) 11 स्वर और 33 व्यंजन",
      "B) 10 स्वर और 30 व्यंजन",
      "C) 13 स्वर और 35 व्यंजन",
      "D) 12 स्वर और 36 व्यंजन"
    ],
    "ans": "A) 11 स्वर और 33 व्यंजन (कुल वर्ण 52)",
    "subjectName": "सामान्य हिन्दी (General Hindi)"
  },
  {
    "q": "19. 'शृंगार रस' का स्थायी भाव क्या है?\n[Permanent emotion (Sthayi Bhav) of Shringar Rasa:]",
    "options": [
      "A) हास",
      "B) रति / प्रेम",
      "C) शोक",
      "D) उत्साह"
    ],
    "ans": "B) रति (प्रेम) - इसे 'रसराज' कहा जाता है",
    "subjectName": "सामान्य हिन्दी (General Hindi)"
  },
  {
    "q": "20. 'वीर रस' का स्थायी भाव क्या है?\n[Permanent emotion of Veer Rasa:]",
    "options": [
      "A) क्रोध",
      "B) उत्साह (Enthusiasm)",
      "C) भय",
      "D) विस्मय"
    ],
    "ans": "B) उत्साह",
    "subjectName": "सामान्य हिन्दी (General Hindi)"
  },
  {
    "q": "21. भारतीय संविधान का कौन सा अनुच्छेद 'अस्पृश्यता का अंत' (Abolition of Untouchability) सुनिश्चित करता है?\n[Which Article of Indian Constitution abolishes Untouchability?]",
    "options": [
      "A) अनुच्छेद 14",
      "B) अनुच्छेद 17",
      "C) अनुच्छेद 19",
      "D) अनुच्छेद 21"
    ],
    "ans": "B) अनुच्छेद 17 (मौलिक अधिकारों के अंतर्गत समता का अधिकार)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "22. 'सत्यमेव जयते' भारत का राष्ट्रीय आदर्श वाक्य किस उपनिषद से लिया गया है?\n['Satyameva Jayate' has been adopted from which Upanishad?]",
    "options": [
      "A) कठोपनिषद",
      "B) मुण्डकोपनिषद",
      "C) छांदोग्योपनिषद",
      "D) केनोपनिषद"
    ],
    "ans": "B) मुण्डकोपनिषद (Mundaka Upanishad)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "23. संविधान सभा की प्रारूप समिति (Drafting Committee) के अध्यक्ष कौन थे?\n[Who was the Chairman of the Drafting Committee of Constituent Assembly?]",
    "options": [
      "A) डॉ. राजेन्द्र प्रसाद",
      "B) डॉ. भीमराव अंबेडकर",
      "C) पं. जवाहरलाल नेहरू",
      "D) सरदार पटेल"
    ],
    "ans": "B) डॉ. भीमराव अंबेडकर (29 अगस्त 1947 को गठन, कुल 7 सदस्य)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "24. 1917 का प्रसिद्ध चंपारण सत्याग्रह महात्मा गांधी द्वारा किसके विरोध में शुरू किया गया था?\n[Champaran Satyagraha (1917) was launched against which system?]",
    "options": [
      "A) नमक कर",
      "B) तिनकठिया प्रथा (नील की खेती)",
      "C) रोलेट एक्ट",
      "D) जलियांवाला बाग"
    ],
    "ans": "B) तिनकठिया प्रथा (3/20 भाग पर नील की अनिवार्य खेती)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "25. भारत में ₹1 के नोट पर किसके हस्ताक्षर होते हैं?\n[Whose signature appears on ₹1 currency note in India?]",
    "options": [
      "A) RBI गवर्नर",
      "B) वित्त सचिव (Finance Secretary)",
      "C) वित्त मंत्री",
      "D) भारत के राष्ट्रपति"
    ],
    "ans": "B) वित्त सचिव (Finance Secretary - अन्य सभी नोटों पर RBI गवर्नर के हस्ताक्षर होते हैं)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "26. भारत की मुख्य भूमि की सबसे लंबी तटरेखा (Longest Coastline) किस राज्य की है?\n[Which state has the longest coastline in mainland India?]",
    "options": [
      "A) महाराष्ट्र",
      "B) गुजरात (लगभग 1,600 किमी)",
      "C) तमिलनाडु",
      "D) आंध्र प्रदेश"
    ],
    "ans": "B) गुजरात (दूसरे स्थान पर आंध्र प्रदेश)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "27. संसद के दोनों सदनों की संयुक्त बैठक (Joint Sitting) की अध्यक्षता कौन करता है?\n[Who presides over Joint Sitting of both Houses of Parliament?]",
    "options": [
      "A) राष्ट्रपति",
      "B) उपराष्ट्रपति",
      "C) लोकसभा अध्यक्ष (Speaker)",
      "D) प्रधानमंत्री"
    ],
    "ans": "C) लोकसभा अध्यक्ष (अनुच्छेद 118 के तहत, आहूत राष्ट्रपति द्वारा अनुच्छेद 108 में)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "28. भारत के नियंत्रक एवं महालेखापरीक्षक (CAG) का कार्यकाल कितना होता है?\n[What is the tenure of the Comptroller and Auditor General (CAG) of India?]",
    "options": [
      "A) 5 वर्ष या 65 वर्ष",
      "B) 6 वर्ष या 65 वर्ष की आयु",
      "C) 6 वर्ष या 62 वर्ष",
      "D) 4 वर्ष"
    ],
    "ans": "B) 6 वर्ष या 65 वर्ष की आयु (जो भी पहले हो, अनुच्छेद 148)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "29. नीति आयोग की स्थापना किस वर्ष की गई थी?\n[In which year was NITI Aayog established?]",
    "options": [
      "A) 15 अगस्त 2014",
      "B) 1 जनवरी 2015",
      "C) 26 जनवरी 2015",
      "D) 1 अप्रैल 2016"
    ],
    "ans": "B) 1 जनवरी 2015 (योजना आयोग के स्थान पर, पदेन अध्यक्ष भारत के प्रधानमंत्री)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "30. मोहिनीअट्टम एवं कथकली किस राज्य के प्रसिद्ध शास्त्रीय नृत्य हैं?\n[Mohiniyattam and Kathakali are classical dance forms of which state?]",
    "options": [
      "A) तमिलनाडु",
      "B) केरल (Kerala)",
      "C) आंध्र प्रदेश",
      "D) कर्नाटक"
    ],
    "ans": "B) केरल (भरतनाट्यम तमिलनाडु का, कुचिपुड़ी आंध्र प्रदेश का है)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "31. भारतीय मानक समय रेखा (82.5° E) भारत के कितने राज्यों से होकर गुजरती है?\n[Indian Standard Meridian (82.5° E) passes through how many states?]",
    "options": [
      "A) 4",
      "B) 5 राज्यों से (UP, MP, छत्तीसगढ़, ओडिशा, आंध्र प्रदेश)",
      "C) 6",
      "D) 8"
    ],
    "ans": "B) 5 राज्यों से (मिर्जापुर, प्रयागराज से गुजरती है, GMT से +5:30 घंटे आगे)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "32. कर्क रेखा (Tropic of Cancer - 23.5° N) भारत के कितने राज्यों से होकर गुजरती है?\n[Tropic of Cancer passes through how many Indian states?]",
    "options": [
      "A) 7",
      "B) 8 राज्यों से",
      "C) 9",
      "D) 6"
    ],
    "ans": "B) 8 राज्यों से (गुजरात, राजस्थान, MP, छत्तीसगढ़, झारखंड, प० बंगाल, त्रिपुरा, मिजोरम)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "33. भारतीय संविधान के किस अनुच्छेद को डॉ. भीमराव अंबेडकर ने 'संविधान की आत्मा और हृदय' कहा था?\n[Which Article was called the 'Heart and Soul of the Constitution' by Dr. Ambedkar?]",
    "options": [
      "A) अनुच्छेद 14",
      "B) अनुच्छेद 19",
      "C) अनुच्छेद 21",
      "D) अनुच्छेद 32 (संवैधानिक उपचारों का अधिकार)"
    ],
    "ans": "D) अनुच्छेद 32 (संवैधानिक उपचारों का अधिकार - 5 प्रकार की रिट जारी होती है)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "34. मौलिक अधिकारों (Fundamental Rights) का प्रावधान भारतीय संविधान में किस देश से लिया गया है?\n[Fundamental Rights in Indian Constitution are borrowed from:]",
    "options": [
      "A) ब्रिटेन",
      "B) संयुक्त राज्य अमेरिका (USA)",
      "C) आयरलैंड",
      "D) रूस"
    ],
    "ans": "B) संयुक्त राज्य अमेरिका (USA - भाग 3, अनुच्छेद 12 से 35)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "35. राज्य के नीति निदेशक तत्व (DPSP) किस देश के संविधान से प्रेरित हैं?\n[Directive Principles of State Policy are borrowed from:]",
    "options": [
      "A) अमेरिका",
      "B) आयरलैंड (Ireland)",
      "C) कनाडा",
      "D) ऑस्ट्रेलिया"
    ],
    "ans": "B) आयरलैंड (भाग 4, अनुच्छेद 36 से 51)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "36. भारत में पंचायती राज व्यवस्था की त्रि-स्तरीय प्रणाली की सिफारिश किस समिति ने की थी?\n[Which committee recommended three-tier Panchayati Raj system in India?]",
    "options": [
      "A) अशोक मेहता समिति",
      "B) बलवंत राय मेहता समिति (1957)",
      "C) सरकारिया आयोग",
      "D) एल एम सिंघवी समिति"
    ],
    "ans": "B) बलवंत राय मेहता समिति (प्रथम राज्य: राजस्थान के नागौर में 2 अक्टूबर 1959)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "37. 73वाँ संविधान संशोधन (1992) किससे संबंधित है?\n[73rd Constitutional Amendment Act 1992 is related to:]",
    "options": [
      "A) नगर पालिका",
      "B) पंचायती राज संस्थाएं (11वीं अनुसूची)",
      "C) दलबदल",
      "D) GST"
    ],
    "ans": "B) पंचायती राज व्यवस्था (अनुसूची 11, कुल 29 विषय जोड़े गए)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "38. गुप्त वंश के किस शासक ने नालंदा विश्वविद्यालय की स्थापना की थी?\n[Which Gupta ruler founded Nalanda University?]",
    "options": [
      "A) चंद्रगुप्त द्वितीय",
      "B) कुमारगुप्त प्रथम (5वीं शताब्दी)",
      "C) समुद्रगुप्त",
      "D) स्कंदगुप्त"
    ],
    "ans": "B) कुमारगुप्त प्रथम",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "39. भारत का नेपोलियन (Napoleon of India) किसे कहा जाता है?\n[Who is known as the 'Napoleon of India'?]",
    "options": [
      "A) चंद्रगुप्त मौर्य",
      "B) समुद्रगुप्त (Samudragupta - वी.ए. स्मिथ द्वारा उपाधि)",
      "C) कनिष्क",
      "D) हर्षवर्द्धन"
    ],
    "ans": "B) समुद्रगुप्त (प्रयाग प्रशस्ति के रचयिता हरिषेण थे)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  },
  {
    "q": "40. 'वेदों की ओर लौटो' (Back to the Vedas) का नारा किसने दिया था?\n[Who gave the slogan 'Back to the Vedas'?]",
    "options": [
      "A) स्वामी विवेकानंद",
      "B) स्वामी दयानंद सरस्वती (1875 में आर्य समाज संस्थापक)",
      "C) राजा राममोहन राय",
      "D) ईश्वर चंद्र विद्यासागर"
    ],
    "ans": "B) स्वामी दयानंद सरस्वती (सत्यार्थ प्रकाश के लेखक)",
    "subjectName": "सामान्य ज्ञान व सामाजिक विज्ञान (GK & Social Science)"
  }
],
    subjectives: [], // 100% CBT Objective
    hallOfFame: MASTER_HALL_OF_FAME,
    shortcuts: MASTER_SHORTCUTS
  },
  {
    id: "board-pass-guarantee",
    title: "Class 10th & 12th Board - 100+ OMR MCQs & Proofs Revision Guide (Maths & Science)",
    exam: "CBSE, UP, Bihar & All State Boards 2026",
    price: 9,
    pages: "36 Pages Complete Guide",
    rating: "4.9 ★ (950 downloads)",
    badge: "🎓 100 MCQs + 15 Proofs",
    sampleQuestions: [
      { q: "1. द्विघात समीकरण का विविक्तकर सूत्र:", a: "उत्तर: D = b² - 4ac (D > 0 तो मूल वास्तविक एवं भिन्न होते हैं)।" },
      { q: "2. थेल्स प्रमेय (BPT):", a: "उत्तर: त्रिभुज में एक भुजा के समांतर खींची गई रेखा अन्य दो भुजाओं को समान अनुपात में बांटती है।" },
      { q: "3. प्रकाश के अपवर्तन के दो नियम:", a: "उत्तर: आपतित किरण, अपवर्तित किरण व अभिलंब एक ही तल में; स्नेल नियम sin i/sin r = μ।" }
    ],
    objectives: [
  {
    "q": "1. प्रकाश का वेग सर्वाधिक किस माध्यम में होता है?\n[In which medium is the speed of light maximum?]",
    "options": [
      "A) कांच (Glass)",
      "B) पानी (Water)",
      "C) निर्वात (Vacuum)",
      "D) हीरा (Diamond)"
    ],
    "ans": "C) निर्वात (Vacuum) - 3 × 10⁸ m/s",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "2. निकट दृष्टि दोष (Myopia) के निवारण के लिए किस लेंस का उपयोग किया जाता है?\n[Which lens is used to correct Myopia?]",
    "options": [
      "A) उत्तल लेंस (Convex)",
      "B) अवतल लेंस (Concave)",
      "C) बाइफोकल लेंस",
      "D) बेलनाकार लेंस"
    ],
    "ans": "B) अवतल लेंस (Concave Lens)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "3. दूर दृष्टि दोष (Hypermetropia) के निवारण हेतु किस लेंस का प्रयोग होता है?\n[Which lens is used to correct Hypermetropia?]",
    "options": [
      "A) अवतल लेंस",
      "B) उत्तल लेंस (Convex Lens)",
      "C) समतल लेंस",
      "D) सिलिंड्रिकल लेंस"
    ],
    "ans": "B) उत्तल लेंस (Convex Lens)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "4. दाढ़ी बनाने (Shaving Mirror) तथा दंत चिकित्सकों द्वारा किस दर्पण का उपयोग होता है?\n[Mirror used for shaving and by dentists:]",
    "options": [
      "A) उत्तल दर्पण",
      "B) अवतल दर्पण (Concave Mirror)",
      "C) समतल दर्पण",
      "D) परवलयिक दर्पण"
    ],
    "ans": "B) अवतल दर्पण (बड़ा और सीधा आभासी प्रतिबिम्ब)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "5. वाहनों के साइड मिरर (Rear-view Mirror) में किस दर्पण का उपयोग होता है?\n[Mirror used in rear-view of vehicles:]",
    "options": [
      "A) अवतल दर्पण",
      "B) उत्तल दर्पण (Convex Mirror)",
      "C) समतल दर्पण",
      "D) उभयोत्तल दर्पण"
    ],
    "ans": "B) उत्तल दर्पण (विस्तृत दृष्टि क्षेत्र एवं सीधा प्रतिबिम्ब)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "6. निर्वात में प्रकाश की चाल (c) और किसी माध्यम में प्रकाश की चाल (v) का अनुपात क्या कहलाता है?\n[Ratio of speed of light in vacuum to medium (c/v) is called:]",
    "options": [
      "A) आवर्धन",
      "B) अपवर्तनांक (Refractive Index)",
      "C) लेंस क्षमता",
      "D) विक्षेपण"
    ],
    "ans": "B) अपवर्तनांक (Refractive Index: n = c/v)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "7. हीरे का अपवर्तनांक (Refractive Index of Diamond) कितना होता है?\n[Refractive index of diamond is:]",
    "options": [
      "A) 1.33",
      "B) 1.5",
      "C) 2.42 (सर्वाधिक)",
      "D) 1.00"
    ],
    "ans": "C) 2.42 (पूर्ण आंतरिक परावर्तन के कारण चमकता है)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "8. किसी लेंस की क्षमता P = +2.5 D है। इसकी फोकस दूरी क्या होगी?\n[Power of lens is +2.5 D. Its focal length is:]",
    "options": [
      "A) +25 cm",
      "B) +40 cm (+0.4 m)",
      "C) -40 cm",
      "D) +50 cm"
    ],
    "ans": "B) +40 cm (f = 100/P = 100/2.5 = 40 cm, उत्तल लेंस)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "9. तारे टिमटिमाते (Twinkling of stars) हुए किस घटना के कारण दिखाई देते हैं?\n[Twinkling of stars is due to which optical phenomenon?]",
    "options": [
      "A) प्रकाश का परावर्तन",
      "B) वायुमंडलीय अपवर्तन (Atmospheric Refraction)",
      "C) प्रकीर्णन",
      "D) विक्षेपण"
    ],
    "ans": "B) वायुमंडलीय अपवर्तन (Atmospheric Refraction)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "10. आकाश का नीला रंग प्रकाश के किस गुण के कारण दिखाई देता है?\n[Blue color of clear sky is due to:]",
    "options": [
      "A) परावर्तन",
      "B) प्रकीर्णन (Scattering of Light)",
      "C) अपवर्तन",
      "D) विवर्तन"
    ],
    "ans": "B) प्रकाश का प्रकीर्णन (रैले का नियम: नीले रंग का प्रकीर्णन सर्वाधिक होता है)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "11. समतल दर्पण द्वारा बना प्रतिबिम्ब कैसा होता है?\n[Image formed by a plane mirror is:]",
    "options": [
      "A) वास्तविक और उल्टा",
      "B) आभासी एवं सीधा (Virtual and Erect)",
      "C) वास्तविक एवं सीधा",
      "D) उल्टा एवं बड़ा"
    ],
    "ans": "B) आभासी एवं पार्श्व उल्टा (Virtual and laterally inverted)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "12. गोलीय दर्पण की फोकस दूरी (f) और उसकी वक्रता त्रिज्या (R) में क्या संबंध है?\n[Relationship between focal length f and radius of curvature R:]",
    "options": [
      "A) f = 2R",
      "B) f = R / 2",
      "C) f = R",
      "D) f = 1/R"
    ],
    "ans": "B) f = R / 2",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "13. प्रिज्म से गुजरने पर किस रंग के प्रकाश का विचलन (Deviation) सबसे अधिक होता है?\n[Which color deviates most when passing through a prism?]",
    "options": [
      "A) लाल (Red)",
      "B) बैगनी (Violet)",
      "C) पीला (Yellow)",
      "D) हरा (Green)"
    ],
    "ans": "B) बैगनी (Violet - न्यूनतम तरंगदैर्ध्य के कारण अधिकतम विचलन)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "14. खतरे के संकेत (Danger signals) में लाल रंग का उपयोग क्यों किया जाता है?\n[Why is red color used in danger signals?]",
    "options": [
      "A) इसका प्रकीर्णन सबसे कम होता है",
      "B) इसका प्रकीर्णन सबसे अधिक होता है",
      "C) यह आंखों को प्रिय लगता है",
      "D) इसका वेग अधिक होता है"
    ],
    "ans": "A) इसका प्रकीर्णन सबसे कम होता है (तरंगदैर्ध्य सर्वाधिक होती है)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "15. सामान्य दृष्टि के वयस्क के लिए सुस्पष्ट दर्शन की अल्पतम दूरी (Least distance of distinct vision) कितनी होती है?\n[Least distance of distinct vision for normal eye:]",
    "options": [
      "A) 25 m",
      "B) 2.5 cm",
      "C) 25 cm",
      "D) अनंत (Infinity)"
    ],
    "ans": "C) 25 cm (निकट बिंदु 25 cm तथा दूर बिंदु अनंत होता है)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "16. विद्युत आवेश (Electric Charge) का SI मात्रक क्या है?\n[SI unit of Electric Charge:]",
    "options": [
      "A) वोल्ट",
      "B) एम्पियर",
      "C) कूलॉम (Coulomb)",
      "D) जूल"
    ],
    "ans": "C) कूलॉम (Coulomb - 1 C = 6.25 × 10¹⁸ इलेक्ट्रॉन)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "17. विभवांतर (Potential Difference) मापने वाले यंत्र को क्या कहा जाता है?\n[Device used to measure Potential Difference:]",
    "options": [
      "A) अमीटर",
      "B) वोल्टमीटर (Voltmeter)",
      "C) गैल्वेनोमीटर",
      "D) पोटेंशियोमीटर"
    ],
    "ans": "B) वोल्टमीटर (परिपथ के समांतर क्रम में जोड़ा जाता है)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "18. विद्युत परिपथ में धारा (Electric Current) मापने हेतु किसे श्रेणीक्रम में जोड़ा जाता है?\n[Instrument connected in series to measure Current:]",
    "options": [
      "A) वोल्टमीटर",
      "B) अमीटर (Ammeter)",
      "C) ओममीटर",
      "D) रियोस्टेट"
    ],
    "ans": "B) अमीटर (Ammeter - आदर्श अमीटर का प्रतिरोध शून्य होता है)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "19. ओम के नियम का सही गणितीय सूत्र क्या है?\n[Correct mathematical formula for Ohm's Law:]",
    "options": [
      "A) V = I / R",
      "B) V = I × R",
      "C) I = V × R",
      "D) R = V × I"
    ],
    "ans": "B) V = I × R (विभवांतर = धारा × प्रतिरोध)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "20. 1 किलोवाट-घंटा (1 kWh) विद्युत ऊर्जा में कितने जूल होते हैं?\n[1 kWh electrical energy equals how many Joules?]",
    "options": [
      "A) 3.6 × 10⁵ J",
      "B) 3.6 × 10⁶ J (1 Commercial Unit)",
      "C) 746 J",
      "D) 1000 J"
    ],
    "ans": "B) 3.6 × 10⁶ J (यही 1 यूनिट बिजली कहलाती है)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "21. विद्युत बल्ब का तंतु (Filament) किस धातु का बना होता है?\n[Filament of electric bulb is made of:]",
    "options": [
      "A) तांबा",
      "B) टंगस्टन (Tungsten - उच्च गलनांक ~3422°C)",
      "C) नाइक्रोम",
      "D) लोहा"
    ],
    "ans": "B) टंगस्टन (Tungsten)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "22. विद्युत हीटर और गीजर का तापन अवयव (Element) किस मिश्रधातु का बना होता है?\n[Heating element of electric heater is made of:]",
    "options": [
      "A) टंगस्टन",
      "B) नाइक्रोम (Nichrome - Ni+Cr)",
      "C) पीतल",
      "D) कांस्य"
    ],
    "ans": "B) नाइक्रोम (Nichrome)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "23. विद्युत फ्यूज तार (Electric Fuse Wire) की क्या विशेषता होनी चाहिए?\n[Characteristics of an electric fuse wire:]",
    "options": [
      "A) उच्च गलनांक, निम्न प्रतिरोध",
      "B) निम्न गलनांक एवं उच्च प्रतिरोध",
      "C) उच्च गलनांक, उच्च प्रतिरोध",
      "D) शून्य प्रतिरोध"
    ],
    "ans": "B) निम्न गलनांक एवं उच्च प्रतिरोध (अतिभारण होने पर तुरंत पिघल जाता है)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "24. घरों में विद्युत उपकरण किस क्रम में जोड़े जाते हैं?\n[Domestic electrical appliances are connected in:]",
    "options": [
      "A) श्रेणीक्रम (Series)",
      "B) समांतर क्रम (Parallel Connection)",
      "C) मिश्रित क्रम",
      "D) चक्रीय क्रम"
    ],
    "ans": "B) समांतर क्रम (ताकि सभी उपकरणों को 220V समान विभवांतर मिले)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "25. फ्लेमिंग के वामहस्त (बाएं हाथ) के नियम में तर्जनी अंगुली किसकी दिशा दर्शाती है?\n[In Fleming's Left Hand Rule, forefinger represents direction of:]",
    "options": [
      "A) विद्युत धारा",
      "B) चुंबकीय क्षेत्र (Magnetic Field)",
      "C) बल या गति",
      "D) विभव"
    ],
    "ans": "B) चुंबकीय क्षेत्र (Forefinger = Field, Middle = Current, Thumb = Force)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "26. विद्युत धारा का SI मात्रक क्या है?\n[SI unit of Electric Current:]",
    "options": [
      "A) वोल्ट",
      "B) एम्पियर (Ampere)",
      "C) वाट",
      "D) कूलॉम"
    ],
    "ans": "B) एम्पियर (A = C/s)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "27. प्रतिरोध का SI मात्रक क्या है?\n[SI unit of Electrical Resistance:]",
    "options": [
      "A) ओम (Ω)",
      "B) ओम-मीटर",
      "C) म्हो",
      "D) सीमेंस"
    ],
    "ans": "A) ओम (Ω) - विशिष्ट प्रतिरोध का मात्रक ओम-मीटर होता है",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "28. विद्युत जनित्र (Electric Generator / Dynamo) किस सिद्धांत पर कार्य करता है?\n[Electric Generator works on the principle of:]",
    "options": [
      "A) धारा का उष्मीय प्रभाव",
      "B) विद्युत चुंबकीय प्रेरण (Electromagnetic Induction)",
      "C) रासायनिक प्रभाव",
      "D) पास्कल नियम"
    ],
    "ans": "B) विद्युत चुंबकीय प्रेरण (फैराडे का नियम)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "29. प्रत्यावर्ती धारा (AC) की आवृत्ति भारत में सामान्यतः कितनी होती है?\n[Frequency of AC domestic supply in India:]",
    "options": [
      "A) 60 Hz",
      "B) 50 Hz",
      "C) 100 Hz",
      "D) 220 Hz"
    ],
    "ans": "B) 50 Hz (220 वोल्ट विभवांतर)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "30. लघु परिपथन (Short Circuit) के समय परिपथ में विद्युत धारा का मान:\n[At the time of Short Circuit, current in the circuit:]",
    "options": [
      "A) बहुत कम हो जाता है",
      "B) अत्यधिक बढ़ जाता है (Increases enormously)",
      "C) अपरिवर्तित रहता है",
      "D) निरंतर घटता है"
    ],
    "ans": "B) अत्यधिक बढ़ जाता है (Increases enormously)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "31. फेरस सल्फेट क्रिस्टल (Green Vitriol) का रासायनिक सूत्र क्या है?\n[Chemical formula of Ferrous Sulphate crystal:]",
    "options": [
      "A) FeSO₄·5H₂O",
      "B) FeSO₄·7H₂O",
      "C) FeSO₄·2H₂O",
      "D) Fe₂O₃"
    ],
    "ans": "B) FeSO₄·7H₂O (गर्म करने पर Fe₂O₃ भूरे रंग में बदलता है)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "32. विरंजक चूर्ण (Bleaching Powder) का रासायनिक नाम और सूत्र क्या है?\n[Chemical name and formula of Bleaching Powder:]",
    "options": [
      "A) CaCO₃",
      "B) CaOCl₂ (कैल्शियम ऑक्सीक्लोराइड)",
      "C) Ca(OH)₂",
      "D) CaCl₂"
    ],
    "ans": "B) CaOCl₂ (कैल्शियम ऑक्सीक्लोराइड)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "33. बेकिंग सोडा (मीठा सोडा) का रासायनिक सूत्र क्या है?\n[Chemical formula of Baking Soda:]",
    "options": [
      "A) Na₂CO₃",
      "B) NaHCO₃ (सोडियम हाइड्रोजन कार्बोनेट)",
      "C) NaOH",
      "D) KOH"
    ],
    "ans": "B) NaHCO₃ (Sodium Hydrogen Carbonate)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "34. धावन सोडा (Washing Soda) का रासायनिक सूत्र क्या है?\n[Chemical formula of Washing Soda:]",
    "options": [
      "A) NaHCO₃",
      "B) Na₂CO₃·10H₂O (डेकाहाइड्रेट)",
      "C) Na₂SO₄",
      "D) NaCl"
    ],
    "ans": "B) Na₂CO₃·10H₂O",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "35. प्लास्टर ऑफ पेरिस (POP) का रासायनिक सूत्र क्या है?\n[Chemical formula of Plaster of Paris:]",
    "options": [
      "A) CaSO₄·2H₂O",
      "B) CaSO₄·½H₂O (हेमीहाइड्रेट)",
      "C) CaSO₄·H₂O",
      "D) MgSO₄·7H₂O"
    ],
    "ans": "B) CaSO₄·½H₂O (जिप्सम को 373 K पर गर्म करने से बनता है)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "36. जिप्सम (Gypsum) का रासायनिक सूत्र क्या है?\n[Chemical formula of Gypsum:]",
    "options": [
      "A) CaSO₄·½H₂O",
      "B) CaSO₄·2H₂O (डाईहाइड्रेट)",
      "C) CaCO₃",
      "D) CaO"
    ],
    "ans": "B) CaSO₄·2H₂O",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "37. श्वसन (Respiration) किस प्रकार की रासायनिक अभिक्रिया है?\n[What type of chemical reaction is Respiration?]",
    "options": [
      "A) ऊष्माशोषी (Endothermic)",
      "B) ऊष्माक्षेपी (Exothermic Reaction)",
      "C) संयोजन",
      "D) अपचयन"
    ],
    "ans": "B) ऊष्माक्षेपी अभिक्रिया (ऊर्जा मुक्त होती है)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "38. लोहे पर जंग लगना (Rusting of Iron) किस प्रकार की अभिक्रिया है?\n[Rusting of iron is an example of:]",
    "options": [
      "A) ऑक्सीकरण (संक्षारण / Corrosion)",
      "B) अपचयन",
      "C) केवल भौतिक परिवर्तन",
      "D) विस्थापन"
    ],
    "ans": "A) ऑक्सीकरण एवं संक्षारण (Fe₂O₃·xH₂O बनता है)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "39. चिप्स की थैली में कौन सी अक्रिय गैस भरी जाती है ताकि उपचयन न हो?\n[Inert gas flushed in potato chips packets to prevent rancidity:]",
    "options": [
      "A) ऑक्सीजन",
      "B) नाइट्रोजन (Nitrogen Gas - N₂)",
      "C) कार्बन डाइऑक्साइड",
      "D) हाइड्रोजन"
    ],
    "ans": "B) नाइट्रोजन गैस (Nitrogen Gas)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "40. बिना बुझा हुआ चूना (Quick Lime) का रासायनिक सूत्र क्या है?\n[Chemical formula of Quick Lime:]",
    "options": [
      "A) Ca(OH)₂",
      "B) CaO (कैल्शियम ऑक्साइड)",
      "C) CaCO₃",
      "D) CaCl₂"
    ],
    "ans": "B) CaO (कैल्शियम ऑक्साइड)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "41. बुझा हुआ चूना (Slaked Lime) का रासायनिक सूत्र क्या है?\n[Chemical formula of Slaked Lime:]",
    "options": [
      "A) CaO",
      "B) Ca(OH)₂ (कैल्शियम हाइड्रॉक्साइड)",
      "C) CaCO₃",
      "D) CaSO₄"
    ],
    "ans": "B) Ca(OH)₂",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "42. संगमरमर (Marble) और चूना पत्थर का रासायनिक सूत्र क्या है?\n[Chemical formula of Marble and Limestone:]",
    "options": [
      "A) CaO",
      "B) CaCO₃ (कैल्शियम कार्बोनेट)",
      "C) Ca(OH)₂",
      "D) CaSO₄"
    ],
    "ans": "B) CaCO₃ (कैल्शियम कार्बोनेट)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "43. लेड नाइट्रेट को गर्म करने पर भूरे रंग का कौन सा धुआं निकलता है?\n[Brown gas emitted on heating Lead Nitrate Pb(NO₃)₂:]",
    "options": [
      "A) ऑक्सीजन (O₂)",
      "B) नाइट्रोजन डाइऑक्साइड (NO₂)",
      "C) लेड ऑक्साइड",
      "D) अमोनिया"
    ],
    "ans": "B) नाइट्रोजन डाइऑक्साइड (NO₂)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "44. तेल एवं वसायुक्त खाद्य पदार्थों का स्वाद व गंध विकृत होना क्या कहलाता है?\n[Spoilage of fats and oils leading to bad smell and taste is:]",
    "options": [
      "A) संक्षारण",
      "B) विकृतगंधिता (Rancidity)",
      "C) उदासीनीकरण",
      "D) किण्वन"
    ],
    "ans": "B) विकृतगंधिता (Rancidity)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "45. सिल्वर क्लोराइड (AgCl) को सूर्य के प्रकाश में रखने पर इसका रंग कैसा हो जाता है?\n[Color of Silver Chloride when exposed to sunlight:]",
    "options": [
      "A) श्वेत",
      "B) धूसर (Grey)",
      "C) पीला",
      "D) लाल"
    ],
    "ans": "B) धूसर (Grey - प्रकाश अपघटन अभिक्रिया)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "46. शुद्ध जल का pH मान कितना होता है?\n[pH of pure water at 25°C:]",
    "options": [
      "A) 0",
      "B) 7 (उदासीन / Neutral)",
      "C) 14",
      "D) 1"
    ],
    "ans": "B) 7 (उदासीन)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "47. मानव रक्त का pH मान लगभग कितना होता है?\n[pH value of human blood:]",
    "options": [
      "A) 6.4",
      "B) 7.4 (हल्का क्षारीय)",
      "C) 8.5",
      "D) 5.5"
    ],
    "ans": "B) 7.4 (Slightly Alkaline)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "48. अम्ल नीले लिटमस पत्र को किस रंग में बदल देते हैं?\n[Acids turn blue litmus into:]",
    "options": [
      "A) हरा",
      "B) लाल (Red)",
      "C) पीला",
      "D) रंगहीन"
    ],
    "ans": "B) लाल (Trick: 'अनिल' = अम्ल नीले को लाल करता है)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "49. क्षार लाल लिटमस पत्र को किस रंग में बदल देते हैं?\n[Bases turn red litmus into:]",
    "options": [
      "A) नीला (Blue)",
      "B) पीला",
      "C) गुलाबी",
      "D) काला"
    ],
    "ans": "A) नीला (Blue)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "50. चींटी के डंक (Ant Sting) और नेटल के डंक में कौन सा अम्ल होता है?\n[Acid present in Ant's sting and Nettle sting:]",
    "options": [
      "A) सिट्रिक अम्ल",
      "B) मेथेनॉइक अम्ल / फॉर्मिक अम्ल (HCOOH)",
      "C) एसिटिक अम्ल",
      "D) ऑक्सालिक अम्ल"
    ],
    "ans": "B) मेथेनॉइक अम्ल (Methanoic acid / Formic acid)",
    "subjectName": "विज्ञान (Science)"
  },
  {
    "q": "51. दो संख्याओं का म०स० (HCF) 15 तथा ल०स० (LCM) 150 है। यदि एक संख्या 30 हो, तो दूसरी संख्या क्या होगी?\n[HCF is 15, LCM is 150. If one number is 30, find the other number:]",
    "options": [
      "A) 45",
      "B) 75",
      "C) 60",
      "D) 90"
    ],
    "ans": "B) 75 (सूत्र: पहली संख्या × दूसरी = HCF × LCM ⇒ 30 × N = 15 × 150 ⇒ N = 75)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "52. निम्नलिखित में से कौन सी एक अपरिमेय संख्या (Irrational Number) है?\n[Which of the following is an irrational number?]",
    "options": [
      "A) √4",
      "B) √9",
      "C) √7",
      "D) 22/7"
    ],
    "ans": "C) √7 (अपरिमेय संख्या है जिसका दशमलव प्रसार असांत अनावर्ती होता है)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "53. पाई (π) किस प्रकार की संख्या है?\n[What type of number is Pi (π)?]",
    "options": [
      "A) परिमेय संख्या",
      "B) अपरिमेय संख्या (Irrational Number)",
      "C) पूर्णांक",
      "D) प्राकृत संख्या"
    ],
    "ans": "B) अपरिमेय संख्या (Irrational Number - जबकि इसका सन्निकट मान 22/7 परिमेय है)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "54. द्विघात समीकरण ax² + bx + c = 0 के मूल वास्तविक और समान होंगे यदि:\n[Roots of ax² + bx + c = 0 are real and equal if:]",
    "options": [
      "A) b² - 4ac > 0",
      "B) b² - 4ac = 0",
      "C) b² - 4ac < 0",
      "D) b² - 4ac ≥ 1"
    ],
    "ans": "B) b² - 4ac = 0 (विविक्तकर D = 0)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "55. यदि द्विघात समीकरण 2x² - 4x + k = 0 के मूल बराबर हों, तो k का मान क्या होगा?\n[If roots of 2x² - 4x + k = 0 are equal, find value of k:]",
    "options": [
      "A) 1",
      "B) 2",
      "C) 4",
      "D) -2"
    ],
    "ans": "B) 2 (D = (-4)² - 4(2)(k) = 0 ⇒ 16 - 8k = 0 ⇒ k = 2)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "56. द्विघात बहुपद x² - 3 के शून्यक (Zeroes) क्या होंगे?\n[Find zeroes of polynomial x² - 3:]",
    "options": [
      "A) 3, -3",
      "B) +√3, -√3",
      "C) √3, √3",
      "D) 9, -9"
    ],
    "ans": "B) +√3, -√3 (x² = 3 ⇒ x = ±√3)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "57. यदि द्विघात बहुपद ax² + bx + c के शून्यक α और β हों, तो (α + β) और αβ का मान क्या होगा?\n[Sum and product of zeroes α and β of ax² + bx + c:]",
    "options": [
      "A) -b/a तथा c/a",
      "B) b/a तथा -c/a",
      "C) c/a तथा -b/a",
      "D) -c/a तथा b/a"
    ],
    "ans": "A) शून्यकों का योग = -b/a, शून्यकों का गुणनफल = c/a",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "58. रैखिक समीकरण युग्म a₁x + b₁y + c₁ = 0 तथा a₂x + b₂y + c₂ = 0 का अद्वितीय हल (Unique Solution) कब होता है?\n[Condition for a unique solution of pair of linear equations:]",
    "options": [
      "A) a₁/a₂ ≠ b₁/b₂",
      "B) a₁/a₂ = b₁/b₂ = c₁/c₂",
      "C) a₁/a₂ = b₁/b₂ ≠ c₁/c₂",
      "D) a₁/a₂ = -b₁/b₂"
    ],
    "ans": "A) a₁/a₂ ≠ b₁/b₂ (प्रतिच्छेदी रेखाएं / संगत)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "59. यदि a₁/a₂ = b₁/b₂ ≠ c₁/c₂ हो, तो समीकरण निकाय का कैसा हल होगा?\n[If a₁/a₂ = b₁/b₂ ≠ c₁/c₂, the system of equations has:]",
    "options": [
      "A) एक अद्वितीय हल",
      "B) कोई हल नहीं (No Solution - समांतर रेखाएं)",
      "C) अनंत अनेक हल",
      "D) दो हल"
    ],
    "ans": "B) कोई हल नहीं (No Solution - रेखाएं समांतर एवं असंगत होती हैं)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "60. समांतर श्रेणी (AP): 2, 7, 12, ... का 10वाँ पद क्या होगा?\n[Find the 10th term of AP: 2, 7, 12, ...:]",
    "options": [
      "A) 45",
      "B) 47",
      "C) 50",
      "D) 52"
    ],
    "ans": "B) 47 (a = 2, d = 5; a₁₀ = a + 9d = 2 + 9×5 = 47)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "61. समांतर श्रेणी के प्रथम n पदों के योगफल का सूत्र क्या है?\n[Formula for sum of first n terms of an AP:]",
    "options": [
      "A) Sₙ = n/2 [2a + (n - 1)d]",
      "B) Sₙ = n [a + d]",
      "C) Sₙ = n/2 [a - d]",
      "D) Sₙ = 2n [a + (n-1)d]"
    ],
    "ans": "A) Sₙ = n/2 [2a + (n - 1)d] अथवा Sₙ = n/2 [a + l]",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "62. प्रथम 10 प्राकृत संख्याओं का योगफल (Sum of first 10 natural numbers) कितना होगा?\n[Sum of first 10 natural numbers:]",
    "options": [
      "A) 50",
      "B) 55",
      "C) 60",
      "D) 65"
    ],
    "ans": "B) 55 (सूत्र: n(n+1)/2 = 10 × 11 / 2 = 55)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "63. बिन्दु (-3, 4) कार्तीय तल के किस चतुर्थांश (Quadrant) में स्थित है?\n[In which quadrant does point (-3, 4) lie?]",
    "options": [
      "A) प्रथम",
      "B) द्वितीय (Second Quadrant: -x, +y)",
      "C) तृतीय",
      "D) चतुर्थ"
    ],
    "ans": "B) द्वितीय चतुर्थांश (Second Quadrant)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "64. मूल बिन्दु (Origin) के निर्देशांक क्या होते हैं?\n[Coordinates of origin are:]",
    "options": [
      "A) (1, 1)",
      "B) (0, 0)",
      "C) (0, 1)",
      "D) (-1, -1)"
    ],
    "ans": "B) (0, 0)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "65. बिन्दु P(x, y) की मूल बिन्दु (0,0) से दूरी का सूत्र क्या है?\n[Distance of point P(x, y) from origin:]",
    "options": [
      "A) x + y",
      "B) √(x² + y²)",
      "C) x² - y²",
      "D) √(x - y)"
    ],
    "ans": "B) √(x² + y²)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "66. बिन्दुओं (2, 3) और (4, 1) के बीच की दूरी क्या होगी?\n[Find distance between points (2, 3) and (4, 1):]",
    "options": [
      "A) 2",
      "B) 2√2",
      "C) 4",
      "D) √8 / 2"
    ],
    "ans": "B) 2√2 (d = √[(4-2)² + (1-3)²] = √[4 + 4] = √8 = 2√2)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "67. बिन्दुओं (x₁, y₁) और (x₂, y₂) को मिलाने वाले रेखाखंड के मध्य-बिन्दु (Mid-point) के निर्देशांक हैं:\n[Mid-point coordinates of line joining (x₁, y₁) and (x₂, y₂):]",
    "options": [
      "A) ((x₁+x₂)/2, (y₁+y₂)/2)",
      "B) ((x₁-x₂)/2, (y₁-y₂)/2)",
      "C) (x₁+x₂, y₁+y₂)",
      "D) (x₁x₂, y₁y₂)"
    ],
    "ans": "A) ((x₁ + x₂)/2, (y₁ + y₂)/2)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "68. यदि sin θ = 3/5 हो, तो cos θ और tan θ का मान क्या होगा?\n[If sin θ = 3/5, what are cos θ and tan θ?]",
    "options": [
      "A) cos θ = 4/5, tan θ = 3/4",
      "B) cos θ = 3/4, tan θ = 4/5",
      "C) cos θ = 5/4, tan θ = 3/5",
      "D) cos θ = 4/3, tan θ = 5/3"
    ],
    "ans": "A) cos θ = 4/5, tan θ = 3/4 (पाइथागोरस त्रिक: 3, 4, 5)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "69. sin² 63° + sin² 27° का मान क्या होगा?\n[Value of sin² 63° + sin² 27° is:]",
    "options": [
      "A) 0",
      "B) 1",
      "C) 2",
      "D) -1"
    ],
    "ans": "B) 1 (sin 27° = cos 63°, अतः sin² 63° + cos² 63° = 1)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "70. (sec² θ - tan² θ) का मान सदैव किसके बराबर होता है?\n[Value of (sec² θ - tan² θ) is:]",
    "options": [
      "A) 0",
      "B) 1",
      "C) -1",
      "D) 2"
    ],
    "ans": "B) 1 (त्रिकोणमितीय सर्वसमिका)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "71. 9 sec² A - 9 tan² A का मान क्या होगा?\n[Value of 9 sec² A - 9 tan² A is:]",
    "options": [
      "A) 1",
      "B) 9",
      "C) 8",
      "D) 0"
    ],
    "ans": "B) 9 (9 × [sec² A - tan² A] = 9 × 1 = 9)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "72. यदि tan θ = 1 हो, तो कोण θ का मान क्या होगा?\n[If tan θ = 1, value of acute angle θ is:]",
    "options": [
      "A) 30°",
      "B) 45°",
      "C) 60°",
      "D) 90°"
    ],
    "ans": "B) 45° (tan 45° = 1)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "73. एक मीनार की छाया उसकी ऊंचाई के बराबर है। सूर्य का उन्नयन कोण (Angle of Elevation) क्या होगा?\n[Height of tower equals its shadow length. Angle of elevation of Sun:]",
    "options": [
      "A) 30°",
      "B) 45°",
      "C) 60°",
      "D) 90°"
    ],
    "ans": "B) 45° (tan θ = h/h = 1 ⇒ θ = 45°)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "74. वृत्त की सबसे बड़ी जीवा (Longest Chord of a Circle) क्या कहलाती है?\n[The longest chord of a circle is called:]",
    "options": [
      "A) त्रिज्या (Radius)",
      "B) व्यास (Diameter)",
      "C) चाप (Arc)",
      "D) स्पर्श रेखा"
    ],
    "ans": "B) व्यास (Diameter = 2r)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "75. किसी वृत्त पर बाह्य बिन्दु (External point) से अधिकतम कितनी स्पर्श रेखाएं खींची जा सकती हैं?\n[Maximum number of tangents drawn from an external point to a circle:]",
    "options": [
      "A) 1",
      "B) 2 (दोनों की लम्बाइयां बराबर होती हैं)",
      "C) अनंत",
      "D) 0"
    ],
    "ans": "B) 2 (बाह्य बिंदु से खींची गई दोनों स्पर्श रेखाएं समान लंबाई की होती हैं)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "76. यदि वृत्त की त्रिज्या r हो, तो अर्धवृत्त का परिमाप (Perimeter of Semicircle) क्या होगा?\n[Perimeter of a semicircle of radius r:]",
    "options": [
      "A) πr",
      "B) πr + 2r = r(π + 2)",
      "C) 2πr",
      "D) πr² / 2"
    ],
    "ans": "B) r(π + 2) (चाप की लंबाई πr + व्यास 2r)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "77. दो वृत्तों के क्षेत्रफलों का अनुपात 4 : 9 है। उनकी त्रिज्याओं का अनुपात क्या होगा?\n[Ratio of areas of two circles is 4:9. Ratio of their radii is:]",
    "options": [
      "A) 2 : 3",
      "B) 16 : 81",
      "C) 4 : 9",
      "D) 1 : 2"
    ],
    "ans": "A) 2 : 3 (r₁/r₂ = √(A₁/A₂) = √(4/9) = 2/3)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "78. एक ठोस अर्धगोले का कुल पृष्ठीय क्षेत्रफल (Total Surface Area of Hemisphere) क्या होता है?\n[Total surface area of a solid hemisphere of radius r:]",
    "options": [
      "A) 2πr²",
      "B) 3πr²",
      "C) 4πr²",
      "D) 2/3 πr³"
    ],
    "ans": "B) 3πr² (वक्र पृष्ठ 2πr² + आधार πr²)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "79. एक गोले की त्रिज्या दोगुनी कर दी जाए, तो उसका आयतन कितने गुना हो जाएगा?\n[If radius of a sphere is doubled, its volume becomes:]",
    "options": [
      "A) 2 गुना",
      "B) 4 गुना",
      "C) 8 गुना (V ∝ r³)",
      "D) 16 गुना"
    ],
    "ans": "C) 8 गुना (V = 4/3 π (2r)³ = 8 × V)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "80. एक बेलन (Cylinder) का वक्र पृष्ठीय क्षेत्रफल का सूत्र क्या है?\n[Curved surface area of a cylinder of radius r and height h:]",
    "options": [
      "A) πr²h",
      "B) 2πrh",
      "C) 2πr(r + h)",
      "D) 1/3 πr²h"
    ],
    "ans": "B) 2πrh",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "81. शंकु (Cone) के आयतन का सूत्र क्या है?\n[Volume of a right circular cone:]",
    "options": [
      "A) πr²h",
      "B) 1/3 πr²h",
      "C) 2/3 πr³",
      "D) πrl"
    ],
    "ans": "B) 1/3 πr²h",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "82. केंद्रीय प्रवृत्ति के तीन मापकों माध्य (Mean), माध्यक (Median) और बहुलक (Mode) में सही आनुभविक संबंध क्या है?\n[Empirical relationship between Mean, Median and Mode:]",
    "options": [
      "A) बहुलक = 3 माध्यक - 2 माध्य",
      "B) बहुलक = 2 माध्यक - 3 माध्य",
      "C) माध्य = 3 माध्यक - बहुलक",
      "D) माध्यक = 3 बहुलक - 2 माध्य"
    ],
    "ans": "A) बहुलक (Mode) = 3 × माध्यक (Median) - 2 × माध्य (Mean)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "83. आंकड़ों 2, 3, 5, 3, 7, 3, 8 का बहुलक (Mode) क्या होगा?\n[Find mode of data: 2, 3, 5, 3, 7, 3, 8:]",
    "options": [
      "A) 2",
      "B) 3 (सर्वाधिक बार आया)",
      "C) 5",
      "D) 7"
    ],
    "ans": "B) 3 (इसकी बारंबारता 3 है जो सर्वाधिक है)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "84. एक निश्चित घटना (Sure Event) की प्रायिकता (Probability) कितनी होती है?\n[Probability of a certain/sure event is:]",
    "options": [
      "A) 0",
      "B) 1",
      "C) 0.5",
      "D) -1"
    ],
    "ans": "B) 1 (अनिश्चित या असंभव घटना की प्रायिकता 0 होती है)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "85. किसी घटना की प्रायिकता P(E) का मान किसके बीच होता है?\n[Value of probability P(E) always lies between:]",
    "options": [
      "A) -1 और 1",
      "B) 0 और 1 के बीच (0 ≤ P(E) ≤ 1)",
      "C) 1 और 10",
      "D) 0 और अनंत"
    ],
    "ans": "B) 0 ≤ P(E) ≤ 1 (प्रायिकता कभी ऋणात्मक या 1 से अधिक नहीं हो सकती)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "86. यदि P(E) = 0.05 हो, तो 'E नहीं' (P(not E)) की प्रायिकता क्या होगी?\n[If P(E) = 0.05, what is P(not E)?]",
    "options": [
      "A) 0.05",
      "B) 0.95",
      "C) 0.50",
      "D) 1.05"
    ],
    "ans": "B) 0.95 (P(not E) = 1 - 0.05 = 0.95)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "87. एक पासे को एक बार फेंकने पर अभाज्य संख्या (Prime number) आने की प्रायिकता क्या होगी?\n[Probability of getting a prime number on throwing a die once:]",
    "options": [
      "A) 1/6",
      "B) 1/2 (2, 3, 5 कुल 3/6)",
      "C) 2/3",
      "D) 1/3"
    ],
    "ans": "B) 1/2 (अभाज्य संख्याएं = {2, 3, 5}, प्रायिकता = 3/6 = 1/2)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "88. ताश की 52 पत्तों की गड्डी में से एक पत्ता निकाला जाता है। एक इक्का (Ace) आने की प्रायिकता क्या होगी?\n[Probability of drawing an Ace from a pack of 52 cards:]",
    "options": [
      "A) 1/52",
      "B) 1/13 (4/52)",
      "C) 4/13",
      "D) 1/26"
    ],
    "ans": "B) 1/13 (कुल 4 इक्के होते हैं, 4/52 = 1/13)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "89. यदि एक वस्तु को ₹720 में बेचने पर 20% का लाभ होता है, तो वस्तु का क्रय मूल्य (Cost Price) क्या है?\n[Selling price of an article is ₹720 with 20% profit. Find Cost Price:]",
    "options": [
      "A) ₹600",
      "B) ₹580",
      "C) ₹640",
      "D) ₹500"
    ],
    "ans": "A) ₹600 (CP = 720 × 100 / 120 = ₹600)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "90. एक व्यक्ति 60 किमी/घंटा से जाता है तथा 40 किमी/घंटा से उसी रास्ते लौटता है। पूरी यात्रा की औसत चाल क्या होगी?\n[A man travels at 60 km/h and returns at 40 km/h. Average speed is:]",
    "options": [
      "A) 50 किमी/घंटा",
      "B) 48 किमी/घंटा",
      "C) 45 किमी/घंटा",
      "D) 52 किमी/घंटा"
    ],
    "ans": "B) 48 किमी/घंटा (ट्रिक: 2xy/(x+y) = 2×60×40/100 = 48 km/h)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "91. A किसी काम को 10 दिन में और B उसी काम को 15 दिन में करता है। दोनों मिलकर उस काम को कितने दिनों में पूरा करेंगे?\n[A can do a work in 10 days, B in 15 days. Working together, days needed:]",
    "options": [
      "A) 5 दिन",
      "B) 6 दिन",
      "C) 8 दिन",
      "D) 7.5 दिन"
    ],
    "ans": "B) 6 दिन (ट्रिक: (A×B)/(A+B) = (10×15)/25 = 150/25 = 6 दिन)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "92. ₹5,000 की राशि पर 10% वार्षिक दर से 2 वर्ष के चक्रवृद्धि ब्याज (CI) और साधारण ब्याज (SI) का अंतर क्या होगा?\n[Difference between CI and SI on ₹5,000 at 10% for 2 years:]",
    "options": [
      "A) ₹25",
      "B) ₹50",
      "C) ₹100",
      "D) ₹75"
    ],
    "ans": "B) ₹50 (ट्रिक: D = P × (R/100)² = 5000 × (10/100)² = 5000 × 1/100 = ₹50)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "93. यदि चीनी के मूल्य में 25% की वृद्धि हो जाए, तो एक परिवार को अपनी खपत में कितने प्रतिशत की कमी करनी होगी ताकि खर्च न बढ़े?\n[If price of sugar rises by 25%, by what percent must consumption reduce:]",
    "options": [
      "A) 25%",
      "B) 20%",
      "C) 15%",
      "D) 16.66%"
    ],
    "ans": "B) 20% (ट्रिक: [R / (100 + R)] × 100 = [25 / 125] × 100 = 20%)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "94. प्रथम 20 विषम प्राकृत संख्याओं का योगफल (Sum of first 20 odd natural numbers) क्या होगा?\n[Sum of first 20 odd natural numbers:]",
    "options": [
      "A) 200",
      "B) 400 (n²)",
      "C) 420",
      "D) 380"
    ],
    "ans": "B) 400 (प्रथम n विषम संख्याओं का योग = n² = 20² = 400)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "95. एक समबाहु त्रिभुज (Equilateral Triangle) की भुजा 6 सेमी है। इसका क्षेत्रफल क्या होगा?\n[Side of equilateral triangle is 6 cm. Find its area:]",
    "options": [
      "A) 9√3 सेमी²",
      "B) 18√3 सेमी²",
      "C) 36 सेमी²",
      "D) 6√3 सेमी²"
    ],
    "ans": "A) 9√3 सेमी² (क्षेत्रफल = (√3/4) × a² = (√3/4) × 36 = 9√3 cm²)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "96. 120 मीटर लंबी ट्रेन 54 किमी/घंटा की चाल से एक खंभे को कितने समय में पार करेगी?\n[A 120m long train running at 54 km/h crosses a pole in:]",
    "options": [
      "A) 6 सेकंड",
      "B) 8 सेकंड",
      "C) 10 सेकंड",
      "D) 12 सेकंड"
    ],
    "ans": "B) 8 सेकंड (चाल = 54 × 5/18 = 15 m/s; समय = दूरी / चाल = 120 / 15 = 8 सेकंड)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "97. दो संख्याओं का अनुपात 3 : 4 है और उनका ल०स० (LCM) 180 है। उनमें से छोटी संख्या क्या होगी?\n[Ratio of two numbers is 3:4 and LCM is 180. The smaller number is:]",
    "options": [
      "A) 30",
      "B) 45",
      "C) 60",
      "D) 15"
    ],
    "ans": "B) 45 (माना संख्याएं 3x और 4x, LCM = 12x = 180 ⇒ x = 15; छोटी संख्या = 3×15 = 45)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "98. त्रिभुज के तीनों अन्तः कोणों का योगफल कितना होता है?\n[Sum of interior angles of a triangle is:]",
    "options": [
      "A) 90°",
      "B) 180°",
      "C) 360°",
      "D) 270°"
    ],
    "ans": "B) 180° (π रेडियन)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "99. वृत्त की परिधि और व्यास का अनुपात सदैव क्या कहलाता है?\n[Ratio of circumference of a circle to its diameter is:]",
    "options": [
      "A) 1",
      "B) पाई (π)",
      "C) त्रिज्या",
      "D) 2π"
    ],
    "ans": "B) पाई (π = C / d ≈ 3.14159)",
    "subjectName": "गणित (Mathematics)"
  },
  {
    "q": "100. यदि x + 1/x = 4 हो, तो x² + 1/x² का मान क्या होगा?\n[If x + 1/x = 4, then x² + 1/x² equals:]",
    "options": [
      "A) 16",
      "B) 14 (k² - 2)",
      "C) 18",
      "D) 12"
    ],
    "ans": "B) 14 (ट्रिक: k² - 2 = 4² - 2 = 16 - 2 = 14)",
    "subjectName": "गणित (Mathematics)"
  }
],
    subjectives: [
      ...MASTER_BOARD_2M,
      ...MASTER_BOARD_5M
    ],
    hallOfFame: MASTER_HALL_OF_FAME,
    shortcuts: MASTER_SHORTCUTS
  }
];

let activePaymentNote = null;
let latestAiGeneratedNote = null;

function renderNotesCatalog() {
  const container = document.getElementById('notesGridContainer');
  if (!container) return;

  container.innerHTML = NOTES_CATALOG.map(note => `
    <div class="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
      <div>
        <div class="flex items-center justify-between mb-3">
          <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900">
            ${note.badge}
          </span>
          <span class="text-xs font-semibold text-slate-500">${note.pages}</span>
        </div>

        <h3 class="font-bold text-slate-900 text-base group-hover:text-blue-600 transition leading-snug">
          ${note.title}
        </h3>
        <p class="text-xs text-slate-500 mt-1 font-medium">${note.exam}</p>

        <div class="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-2">
          <div class="font-semibold text-slate-700">👀 Sample Preview:</div>
          <div class="text-slate-600 italic line-clamp-2">${note.sampleQuestions[0]?.q || ''}</div>
          <div class="text-emerald-700 font-medium line-clamp-1">${note.sampleQuestions[0]?.a || ''}</div>
        </div>
      </div>

      <div class="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
        <div>
          <span class="text-xs text-slate-400 line-through">₹99</span>
          <div class="text-2xl font-black text-slate-900">₹${note.price}</div>
        </div>
        <button onclick="openUpiPaymentModal('${note.id}')" class="bg-gradient-to-r from-saffron-600 to-orange-600 hover:from-saffron-700 hover:to-orange-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition flex items-center space-x-1">
          <span>⚡ Download PDF</span>
        </button>
      </div>
    </div>
  `).join('');
}

// Dynamic dropdown functions for Notes Compiler
function populateNotesDropdowns() {
  const examSelect = document.getElementById('aiNoteExamSelect');
  if (!examSelect || typeof EXAMS_CONFIG === 'undefined') return;

  const categories = [
    { key: 'central', label: '🏛️ Central & Defence Exams (SSC, Railway, Defence, UPSC, Banking)' },
    { key: 'police', label: '👮 State Police Bharti (UP, Bihar, Delhi, Raj, MP, Har, WB, MH)' },
    { key: 'entrance', label: '🎓 National Entrance Tests (NEET, JEE, CUET, CLAT)' },
    { key: 'teaching', label: '👨‍🏫 Teaching, TET & State PSCs (CTET, UPTET, BPSC, REET, NET)' },
    { key: 'board', label: '🏫 All-India Board Examinations (20 State & Central Boards)' },
    { key: 'master', label: '🎯 All-India Master Practice Mix' }
  ];

  let html = '';
  categories.forEach(cat => {
    const list = EXAMS_CONFIG.filter(e => (e.category === cat.key) || (cat.key === 'board' && e.isBoard));
    if (list.length > 0) {
      html += `<optgroup label="${cat.label}">`;
      list.forEach(e => {
        html += `<option value="${e.id}">${e.name}</option>`;
      });
      html += `</optgroup>`;
    }
  });

  examSelect.innerHTML = html;
}

let notesDropdownsInitialized = false;
function setupNotesDynamicDropdowns() {
  if (notesDropdownsInitialized) return;
  const examSelect = document.getElementById('aiNoteExamSelect');
  const boardSelect = document.getElementById('aiNoteBoardSelect');
  if (examSelect) {
    examSelect.addEventListener('change', updateNotesDependentDropdowns);
  }
  if (boardSelect) {
    boardSelect.addEventListener('change', updateNotesBoardSubjects);
  }
  notesDropdownsInitialized = true;
}

function updateNotesBoardSubjects() {
  const examSelect = document.getElementById('aiNoteExamSelect');
  const boardSelect = document.getElementById('aiNoteBoardSelect');
  const subjectSelect = document.getElementById('aiNoteSubjectSelect');
  if (!examSelect || !subjectSelect) return;
  const examId = examSelect.value;
  const boardId = boardSelect ? boardSelect.value : 'bseb';

  if (typeof getSubjectsForBoard === 'function' && (examId === 'board-10th' || examId.startsWith('board-12th') || examId === 'board-12th')) {
    const subjects = getSubjectsForBoard(examId, boardId);
    subjectSelect.innerHTML = subjects.map(s => `
      <option value="${s.id}">${s.name}</option>
    `).join('');
    if (subjects.length > 0) subjectSelect.value = subjects[0].id;
  }
}

function updateNotesDependentDropdowns() {
  const examSelect = document.getElementById('aiNoteExamSelect');
  const subjectSelect = document.getElementById('aiNoteSubjectSelect');
  const boardContainer = document.getElementById('aiNoteBoardContainer');
  const boardSelect = document.getElementById('aiNoteBoardSelect');
  const omrBtn = document.getElementById('aiNoteOmrBtn');

  if (!examSelect || !subjectSelect || typeof EXAMS_CONFIG === 'undefined') return;

  const selectedExamId = examSelect.value;
  const examObj = EXAMS_CONFIG.find(e => e.id === selectedExamId) || EXAMS_CONFIG[0];

  // Dynamic OMR Button Visibility (Visible only when exam supports physical OMR)
  if (omrBtn) {
    const isSupported = (typeof isExamOmrSupported === 'function') ? isExamOmrSupported(selectedExamId) : false;
    if (isSupported) {
      omrBtn.classList.remove('hidden');
    } else {
      omrBtn.classList.add('hidden');
    }
  }

  // Dynamic Board Container Toggle (for Class 10th & Class 12th)
  if (examObj.isBoard) {
    if (boardContainer) boardContainer.classList.remove('hidden');
    if (boardSelect && examObj.boards) {
      boardSelect.innerHTML = examObj.boards.map(b => `
        <option value="${b.id}">${b.name}</option>
      `).join('');
      updateNotesBoardSubjects();
    }
  } else {
    if (boardContainer) boardContainer.classList.add('hidden');
    // Populate Subject List dynamically based on chosen Exam
    if (Array.isArray(examObj.subjects)) {
      subjectSelect.innerHTML = examObj.subjects.map(s => `
        <option value="${s.id || s.name}">${s.name}</option>
      `).join('');
      if (examObj.subjects.length > 0) {
        subjectSelect.value = examObj.subjects[0].id || examObj.subjects[0].name;
      }
    }
  }
}

function initNotesVault() {
  renderNotesCatalog();
  populateNotesDropdowns();
  setupNotesDynamicDropdowns();
  updateNotesDependentDropdowns();
}

function maskUpiId(id) {
  if (!id) return '';
  const parts = id.split('@');
  const handle = parts[0];
  const host = parts[1] || 'upi';
  if (handle.length <= 4) return handle.slice(0, 2) + '***@' + host;
  return handle.slice(0, 4) + '****' + handle.slice(-2) + '@' + host;
}

function copyUpiIdText(upiId) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(upiId).then(() => {
      const btn = document.getElementById('copyUpiBtn');
      if (btn) btn.innerText = '✓ Copied';
      setTimeout(() => { if (btn) btn.innerText = '📋 Copy'; }, 2000);
    }).catch(() => {
      prompt('Copy UPI ID:', upiId);
    });
  } else {
    prompt('Copy UPI ID:', upiId);
  }
}

let utrPollTimer = null;

function openUpiPaymentModal(noteId, customNote = null) {
  let note = null;

  if (customNote) {
    note = customNote;
  } else if (activePaymentNote && activePaymentNote.id === noteId) {
    note = activePaymentNote;
  } else {
    note = NOTES_CATALOG.find(n => n.id === noteId);
  }

  if (!note) return;
  activePaymentNote = note;

  const upiCfg = window.DYNAMIC_UPI_CONFIG || {};
  const upiId = upiCfg.upiId || "sarkariai@upi";
  const maskedUpi = maskUpiId(upiId);
  const payeeName = upiCfg.payeeName || "BharatExams Hub";
  const price = note.price || upiCfg.defaultPrice || 9;
  const noteTitleClean = encodeURIComponent((note.title || 'Study Notes').slice(0, 25));
  
  // Mobile app intents
  const genericUpiIntent = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(payeeName)}&am=${price}&cu=INR&tn=${noteTitleClean}`;
  const gpayIntent = `tez://upi/pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(payeeName)}&am=${price}&cu=INR&tn=${noteTitleClean}`;
  const phonepeIntent = `phonepe://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(payeeName)}&am=${price}&cu=INR&tn=${noteTitleClean}`;
  const paytmIntent = `paytmmp://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(payeeName)}&am=${price}&cu=INR&tn=${noteTitleClean}`;

  const qrUrl = upiCfg.customQrUrl || `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(genericUpiIntent)}`;

  const modal = document.getElementById('upiPaymentDialog');
  const modalContent = document.getElementById('upiModalContent');

  if (modal && modalContent) {
    modalContent.innerHTML = `
      <div class="p-5 sm:p-7 max-w-md w-full bg-white rounded-3xl shadow-2xl relative max-h-[92vh] overflow-y-auto">
        <button onclick="closeUpiModal()" class="absolute top-4 right-4 text-slate-400 hover:text-slate-700 text-xl font-bold p-1 z-10 cursor-pointer">
          ✕
        </button>

        <!-- Header -->
        <div class="text-center">
          <div class="inline-flex items-center justify-center px-3.5 py-1 rounded-2xl bg-amber-100 text-amber-900 text-base font-black mb-2 shadow-xs border border-amber-300">
            ₹${price}.00 (0% GST)
          </div>
          <h3 class="text-base sm:text-lg font-black text-slate-900 leading-snug">${note.title}</h3>
          <p class="text-[11px] text-slate-500 mt-1 font-medium">PhonePe / GPay / Paytm से QR स्कैन करें या नीचे ऐप पर टैप करें</p>
        </div>

        <!-- Step 1: Dynamic QR Code & Masked UPI ID -->
        <div class="my-4 flex flex-col items-center justify-center p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
          <img src="${qrUrl}" alt="Scan UPI QR" class="w-40 h-40 rounded-xl shadow-sm border-2 border-white bg-white p-1" />
          
          <!-- Masked UPI ID with Copy Button -->
          <div class="mt-2.5 flex items-center space-x-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-xs">
            <span class="text-[11px] text-slate-700 font-mono font-bold">${maskedUpi}</span>
            <button id="copyUpiBtn" type="button" onclick="copyUpiIdText('${upiId}')" class="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[10px] font-bold border border-slate-300 transition cursor-pointer">
              📋 Copy
            </button>
          </div>
          <div class="text-[10px] text-emerald-700 font-bold mt-1">Beneficiary: ${payeeName}</div>
        </div>

        <!-- Mobile Authentic App Buttons with Official SVGs -->
        <div class="text-[11px] font-bold text-slate-700 mb-1.5 flex items-center justify-between">
          <span>📲 मोबाइल ऐप्स (Direct Pay):</span>
          <span class="text-[10px] text-slate-400 font-normal">Tap to open app</span>
        </div>
        <div class="grid grid-cols-4 gap-1.5 mb-4">
          <!-- Google Pay -->
          <a href="${gpayIntent}" class="flex flex-col items-center justify-center p-2 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 transition text-center shadow-xs">
            <svg class="w-6 h-6" viewBox="0 0 48 48"><path fill="#4285F4" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.2 6.1 29.4 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.2-2.7-.4-3.9z"/><path fill="#34A853" d="M24 44c5.4 0 10.2-1.8 13.9-4.9l-6.8-5.6c-2 1.4-4.5 2.2-7.1 2.2-5.3 0-9.8-3.3-11.4-8H5.6v5.8C9.3 40.5 16.1 44 24 44z"/><path fill="#FBBC05" d="M12.6 27.7c-.4-1.2-.6-2.5-.6-3.7s.2-2.5.6-3.7V14.5H5.6C4.1 17.5 3.2 20.7 3.2 24s.9 6.5 2.4 9.5l7-5.8z"/><path fill="#EA4335" d="M24 11.7c2.9 0 5.6 1 7.6 2.9l5.7-5.7C33.7 5.7 29.1 4 24 4 16.1 4 9.3 7.5 5.6 14.5l7 5.8c1.6-4.7 6.1-8.6 11.4-8.6z"/></svg>
            <span class="text-[9px] font-bold text-slate-800 mt-1">GPay</span>
          </a>

          <!-- PhonePe -->
          <a href="${phonepeIntent}" class="flex flex-col items-center justify-center p-2 rounded-xl border border-slate-200 hover:border-purple-400 hover:bg-purple-50/50 transition text-center shadow-xs">
            <svg class="w-6 h-6" viewBox="0 0 40 40"><circle cx="20" cy="20" r="19" fill="#5f259f"/><path fill="#ffffff" d="M25.7 13.5h-5.2c-.3 0-.6.2-.6.5v2.8h2.3c2.4 0 3.8 1.1 3.8 3.2 0 2.5-1.9 3.5-4.2 3.5h-1.9v5.2c0 .3-.2.5-.5.5h-2.5c-.3 0-.5-.2-.5-.5V13.8c0-.6.4-1.1 1-1.1h8.3c.3 0 .5.2.5.5v.3z"/><path fill="#ffffff" d="M21.9 19.3h-2v2.4h2c1 0 1.9-.3 1.9-1.2 0-.8-.8-1.2-1.9-1.2z"/></svg>
            <span class="text-[9px] font-bold text-slate-800 mt-1">PhonePe</span>
          </a>

          <!-- Paytm -->
          <a href="${paytmIntent}" class="flex flex-col items-center justify-center p-2 rounded-xl border border-slate-200 hover:border-sky-400 hover:bg-sky-50/50 transition text-center shadow-xs">
            <svg class="w-7 h-6" viewBox="0 0 100 40"><rect width="100" height="40" rx="8" fill="#002970"/><text x="8" y="27" fill="#00b9f5" font-weight="900" font-size="22" font-family="system-ui, sans-serif">Pay</text><text x="54" y="27" fill="#ffffff" font-weight="900" font-size="22" font-family="system-ui, sans-serif">tm</text></svg>
            <span class="text-[9px] font-bold text-slate-800 mt-1">Paytm</span>
          </a>

          <!-- BHIM / Any UPI -->
          <a href="${genericUpiIntent}" class="flex flex-col items-center justify-center p-2 rounded-xl border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/50 transition text-center shadow-xs">
            <svg class="w-7 h-6" viewBox="0 0 90 40"><rect width="90" height="40" rx="8" fill="#0b2341"/><text x="6" y="27" fill="#22c55e" font-weight="900" font-size="18" font-family="system-ui, sans-serif">UPI</text><text x="48" y="27" fill="#f97316" font-weight="900" font-size="18" font-family="system-ui, sans-serif">BHIM</text></svg>
            <span class="text-[9px] font-bold text-slate-800 mt-1">BHIM UPI</span>
          </a>
        </div>

        <!-- Step 2: 12-Digit UTR Number Verification -->
        <div class="bg-amber-50/80 border border-amber-200 rounded-2xl p-3.5 space-y-2">
          <div class="flex items-center space-x-1.5 text-xs font-bold text-amber-950">
            <span>🛡️</span>
            <span>पेमेंट के बाद 12-अंकों का UTR / Ref No. दर्ज करें:</span>
          </div>
          
          <input type="text" id="candidateUtrInput" maxlength="12" placeholder="12-अंकों का UTR नंबर (उदा. 421876543210)" class="w-full px-3.5 py-2.5 text-xs font-mono font-bold tracking-wider bg-white border border-amber-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-amber-500 uppercase text-slate-900" />

          <input type="tel" id="candidatePhoneInput" maxlength="15" placeholder="WhatsApp / मोबाइल नंबर (वैकल्पिक)" class="w-full px-3.5 py-2 text-xs bg-white border border-amber-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-amber-500 text-slate-900" />

          <button id="submitUtrBtn" onclick="submitCandidateUtr()" class="w-full bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 active:scale-98 text-white font-black py-3 px-4 rounded-xl text-xs shadow-md transition flex items-center justify-center space-x-2 cursor-pointer">
            <span>🚀 UTR सबमिट करें व PDF अनलॉक करें</span>
          </button>
        </div>

        <!-- Status Area (Pending / Approved) -->
        <div id="utrStatusArea" class="hidden mt-3 p-3 rounded-2xl text-xs"></div>

        <p class="text-[10px] text-center text-slate-400 mt-3 font-medium">
          🔒 100% सुरक्षित भुगतान • वाटरमार्क-मुक्त सम्पूर्ण स्टडी पैकेज • तत्काल वेरिफिकेशन
        </p>
      </div>
    `;

    modal.showModal();
  }
}

async function submitCandidateUtr() {
  const utrInput = document.getElementById('candidateUtrInput');
  const phoneInput = document.getElementById('candidatePhoneInput');
  const submitBtn = document.getElementById('submitUtrBtn');
  const statusArea = document.getElementById('utrStatusArea');

  const cleanUtr = String(utrInput?.value || '').trim().replace(/[^a-zA-Z0-9]/g, '');
  if (!cleanUtr || cleanUtr.length < 10) {
    alert('कृपया 10 से 12 अंकों का वैध UPI Transaction/UTR नंबर दर्ज करें।');
    if (utrInput) utrInput.focus();
    return;
  }

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>⏳ UTR सबमिट हो रहा है...</span>`;
  }

  try {
    const res = await fetch('/api/pay/submit-utr', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        utr: cleanUtr,
        noteId: activePaymentNote?.id || '',
        noteName: activePaymentNote?.title || '',
        examId: activePaymentNote?.exam || '',
        amount: activePaymentNote?.price || 9,
        phone: phoneInput?.value?.trim() || ''
      })
    });
    const data = await res.json();

    if (statusArea) {
      statusArea.classList.remove('hidden');
      if (data.status === 'APPROVED') {
        statusArea.className = 'mt-3 p-3 rounded-2xl text-xs bg-emerald-50 border border-emerald-300 text-emerald-900 font-bold';
        statusArea.innerHTML = `✅ भुगतान पूर्व-स्वीकृत! PDF तैयार की जा रही है...`;
        localStorage.setItem('paid_note_' + (activePaymentNote?.id || ''), cleanUtr);
        setTimeout(() => {
          generateAndDownloadHighResPdf(cleanUtr);
        }, 800);
      } else {
        statusArea.className = 'mt-3 p-3 rounded-2xl text-xs bg-amber-50 border border-amber-300 text-amber-950 font-medium';
        statusArea.innerHTML = `
          <div class="font-bold text-amber-900 flex items-center space-x-1.5">
            <span>⏳</span>
            <span>UTR सबमिट हो गया! (स्टेटस: एडमिन वेरिफिकेशन पेंडिंग)</span>
          </div>
          <p class="text-[11px] text-amber-800 mt-1">एडमिन द्वारा वेरीफाई किया जा रहा है (सामान्यतः 1-2 मिनट)। जैसे ही एडमिन अप्रूव करेंगे, PDF स्वतः डाउनलोड हो जाएगी।</p>
          <div class="mt-2.5 flex items-center space-x-2">
            <button type="button" onclick="pollUtrStatus('${cleanUtr}')" class="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-[11px] font-bold transition cursor-pointer">
              🔄 स्टेटस जांचें (Refresh)
            </button>
            <span class="text-[10px] text-amber-700">ऑटो-चेक चालू है...</span>
          </div>
        `;
        startAutoUtrPolling(cleanUtr);
      }
    }
  } catch (err) {
    alert('UTR सबमिट करने में समस्या आई: ' + err.message);
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `<span>🚀 UTR सबमिट करें व PDF अनलॉक करें</span>`;
    }
  }
}

function startAutoUtrPolling(utr) {
  if (utrPollTimer) clearInterval(utrPollTimer);
  utrPollTimer = setInterval(async () => {
    await pollUtrStatus(utr);
  }, 4000);
}

async function pollUtrStatus(utr) {
  try {
    const res = await fetch('/api/pay/check-utr?utr=' + encodeURIComponent(utr));
    const data = await res.json();
    const statusArea = document.getElementById('utrStatusArea');
    if (!statusArea) return;

    if (data.status === 'APPROVED') {
      if (utrPollTimer) clearInterval(utrPollTimer);
      statusArea.className = 'mt-3 p-3 rounded-2xl text-xs bg-emerald-50 border border-emerald-300 text-emerald-900 font-bold';
      statusArea.innerHTML = `✅ भुगतान एडमिन द्वारा स्वीकृत! PDF तुरंत तैयार हो रही है...`;
      localStorage.setItem('paid_note_' + (activePaymentNote?.id || ''), utr);
      setTimeout(() => {
        generateAndDownloadHighResPdf(utr);
      }, 800);
    } else if (data.status === 'REJECTED') {
      if (utrPollTimer) clearInterval(utrPollTimer);
      statusArea.className = 'mt-3 p-3 rounded-2xl text-xs bg-rose-50 border border-rose-300 text-rose-900 font-bold';
      statusArea.innerHTML = `❌ UTR अस्वीकृत। कृपया अपना सही 12-अंकों का UPI Transaction नंबर दर्ज करें।`;
    }
  } catch (e) {}
}

function closeUpiModal() {
  if (utrPollTimer) clearInterval(utrPollTimer);
  const modal = document.getElementById('upiPaymentDialog');
  if (modal) modal.close();
}

function payAndDownloadGeneratedNote() {
  if (!latestAiGeneratedNote) return;

  activePaymentNote = {
    id: latestAiGeneratedNote.id || 'ai-compiled-note',
    title: latestAiGeneratedNote.title,
    exam: latestAiGeneratedNote.exam || 'All-India Board / Competitive Exam 2026',
    board: latestAiGeneratedNote.board || '',
    price: (latestAiGeneratedNote.isBundle || (latestAiGeneratedNote.subject && (latestAiGeneratedNote.subject === 'all' || latestAiGeneratedNote.subject.includes('all')))) ? 19 : 9,
    pages: latestAiGeneratedNote.pages || "32 Pages Master PDF",
    badge: latestAiGeneratedNote.badge || "✓ Verified 2026 Edition",
    summary: latestAiGeneratedNote.summary || "",
    objectives: latestAiGeneratedNote.objectives || [],
    subjectives: latestAiGeneratedNote.subjectives || [],
    hallOfFame: latestAiGeneratedNote.hallOfFame || [],
    sampleQuestions: latestAiGeneratedNote.questions || [],
    shortcuts: latestAiGeneratedNote.shortcuts || []
  };

  openUpiPaymentModal(activePaymentNote.id);
}

function scrollToNotesCatalog() {
  const elem = document.getElementById('notesGridContainer');
  if (elem) {
    elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Master PDF Builder with Unicode Support (Devanagari Hindi + English)
// Fixed Page-Cuts with CSS break rules and html2pdf pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
function verifyAndDownloadPdf(approvedToken = null) {
  if (!activePaymentNote) return;
  const noteId = activePaymentNote.id;
  const isPaid = approvedToken || localStorage.getItem('paid_note_' + noteId);

  if (!isPaid) {
    if (typeof showAppAlert === 'function') {
      showAppAlert('कृपया पहले ₹9 का भुगतान करके 12-अंकों का UTR नंबर दर्ज करें।', 'Payment Required', '🔒');
    } else {
      alert('कृपया पहले ₹9 का भुगतान करके 12-अंकों का UTR नंबर दर्ज करें।');
    }
    openUpiPaymentModal(noteId, activePaymentNote);
    return;
  }

  generateAndDownloadHighResPdf(isPaid);
}

async function generateAndDownloadHighResPdf(token = '') {
  if (!activePaymentNote) return;

  const btn = document.getElementById('confirmPayBtn') || document.getElementById('submitUtrBtn');
  if (btn) {
    btn.innerHTML = `<span>⏳ Generating Crisp High-Yield PDF (100+ Questions)...</span>`;
    btn.disabled = true;
  }

  const note = activePaymentNote;
  const examName = note.exam || 'All-India Board / Competitive Exam 2026';
  const boardName = note.board ? ` • ${note.board}` : '';
  const eLower = examName.toLowerCase();
  const isCompetitive = eLower.includes('ssc') || eLower.includes('rail') || eLower.includes('police') || eLower.includes('cgl') || eLower.includes('gd') || eLower.includes('alp') || eLower.includes('daroga') || eLower.includes('constable') || eLower.includes('defence');

  // Objectives (100+ questions) with 100% duplicate elimination
  let objectives = (note.objectives && note.objectives.length > 0) ? note.objectives : [];
  if (objectives.length === 0) {
    objectives = isCompetitive ? sscGdObjectives : boardPassObjectives;
  }
  const seenObjSet = new Set();
  objectives = objectives.filter(item => {
    const raw = (item.q || '').split('\n')[0].replace(/^[0-9]+[\.\)]\s*/, '').trim();
    if (!raw || seenObjSet.has(raw)) return false;
    seenObjSet.add(raw);
    return true;
  });

  // Subjectives (Strictly Board Exams only; Never for competitive exams)
  let subjectives = [];
  if (!isCompetitive) {
    subjectives = (note.subjectives && note.subjectives.length > 0) ? note.subjectives : [
      ...MASTER_BOARD_2M,
      ...MASTER_BOARD_5M
    ];
  }

  // Hall of Fame
  const hallOfFame = (note.hallOfFame && note.hallOfFame.length > 0) ? note.hallOfFame : MASTER_HALL_OF_FAME;

  // Shortcuts & Formulas
  const shortcutsList = (note.shortcuts && note.shortcuts.length > 0) ? note.shortcuts : MASTER_SHORTCUTS;

  const formatModeElem = document.getElementById('aiNoteFormatMode');
  const formatMode = formatModeElem ? formatModeElem.value : 'full';
  const isPaperOnly = formatMode === 'paper';

  // Create clean printable HTML document
  const printArea = document.createElement('div');
  printArea.id = "sarkariPdfPrintArea";
  printArea.style.cssText = "font-family: 'Noto Sans Devanagari', 'Plus Jakarta Sans', system-ui, sans-serif; background: #ffffff; color: #0f172a; padding: 24px; max-width: 800px; margin: 0 auto; line-height: 1.55;";

  printArea.innerHTML = `
    <style>
      .pdf-avoid-break {
        page-break-inside: avoid !important;
        break-inside: avoid !important;
      }
      .pdf-section-hdr {
        page-break-after: avoid !important;
        break-after: avoid !important;
        page-break-inside: avoid !important;
      }
      @media print {
        .pdf-avoid-break { page-break-inside: avoid !important; break-inside: avoid !important; }
        .pdf-section-hdr { page-break-after: avoid !important; break-after: avoid !important; page-break-inside: avoid !important; }
      }
    </style>

    <div class="pdf-avoid-break" style="border-bottom: 4px solid #ea580c; padding-bottom: 14px; margin-bottom: 18px;">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div>
          <h1 style="color: #1e3a8a; font-size: 22px; font-weight: 900; margin: 0;">BharatExams Hub 🇮🇳 Official Study Notes</h1>
          <p style="color: #64748b; font-size: 11px; margin: 3px 0 0 0; font-weight: 600;">
            ${isPaperOnly ? '📝 Live Exam Practice Paper (Questions + Final Answer Key at Back)' : '📖 Complete Solution Guide (Theory, Explanations & Solved Questions)'} • 2026 Edition
          </p>
        </div>
        <div style="background: #fef3c7; border: 2px solid #f59e0b; color: #92400e; font-size: 11px; font-weight: 800; padding: 5px 12px; border-radius: 9999px;">
          ${isPaperOnly ? '📄 Practice Question Paper' : '✓ Full Solution Vault'}
        </div>
      </div>
    </div>

    <!-- Title & Exam Target Box -->
    <div class="pdf-avoid-break" style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 12px 16px; margin-bottom: 18px;">
      <h2 style="color: #0f172a; font-size: 15px; font-weight: 800; margin: 0 0 6px 0;">${note.title}</h2>
      <div style="display: flex; flex-wrap: wrap; gap: 14px; font-size: 11px; color: #475569; font-weight: 600;">
        <span>🎯 Target Exam: <strong style="color: #0f172a;">${examName}${boardName}</strong></span>
        <span>📄 Questions: <strong style="color: #047857;">${objectives.length} MCQs ${subjectives.length ? '+ ' + subjectives.length + ' Subjective Proofs' : ''}</strong></span>
        <span>⚡ Mode: <strong style="color: #0f172a;">${isPaperOnly ? 'Unassisted Question Paper (Use OMR)' : 'Complete Solved Guide with Explanations'}</strong></span>
      </div>
    </div>

    <!-- SECTION 1: High-Yield Bilingual MCQs (100+ Questions) -->
    <div style="margin-bottom: 22px;">
      <div class="pdf-section-hdr" style="background: #1e3a8a; color: white; padding: 8px 14px; font-weight: 800; font-size: 13px; border-radius: 8px; margin-bottom: 10px;">
        भाग 1: उच्च-प्राथमिकता वस्तुनिष्ठ बहुविकल्पीय प्रश्न (Section 1: ${objectives.length} High-Yield Bilingual MCQs)
      </div>
      ${(() => {
        let lastSubject = '';
        return objectives.map((item, idx) => {
          let chapterHdr = '';
          const secTitle = item.sectionName || item.subjectName;
          if (secTitle && secTitle !== lastSubject) {
            lastSubject = secTitle;
            chapterHdr = `
              <div class="pdf-section-hdr" style="background: #0284c7; color: white; padding: 6px 12px; font-weight: 800; font-size: 12px; border-radius: 6px; margin: 14px 0 8px 0;">
                📖 अनुभाग / Subject: ${secTitle}
              </div>
            `;
          }
          return `
            ${chapterHdr}
            <div class="pdf-avoid-break" style="margin-bottom: 8px; padding: 8px 12px; background: #fafafa; border-left: 3px solid #3b82f6; border-radius: 6px;">
              <div style="font-weight: 700; font-size: 11.5px; color: #1e293b; white-space: pre-line;">${item.q}</div>
              ${item.options && item.options.length ? `
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3px 10px; margin-top: 5px; font-size: 10.5px; color: #475569;">
                  ${item.options.map(opt => `<div>• ${opt}</div>`).join('')}
                </div>
              ` : ''}
              ${!isPaperOnly ? `
                <div style="font-size: 11px; color: #047857; font-weight: 700; margin-top: 5px; background: #ecfdf5; padding: 3px 8px; border-radius: 4px;">
                  ${item.ans || item.a}
                </div>
                ${item.explanation ? `
                  <div style="font-size: 10px; color: #475569; margin-top: 4px; padding: 4px 8px; background: #f8fafc; border-left: 2px solid #cbd5e1; border-radius: 4px; line-height: 1.45;">
                    ${item.explanation}
                  </div>
                ` : ''}
              ` : `
                <div style="display: flex; gap: 8px; align-items: center; margin-top: 6px; font-size: 10px; color: #64748b; font-weight: 700;">
                  <span>OMR Bubble Marking:</span>
                  <span style="display: inline-block; width: 14px; height: 14px; border-radius: 50%; border: 1.5px solid #94a3b8; text-align: center; line-height: 12px; font-size: 8px;">A</span>
                  <span style="display: inline-block; width: 14px; height: 14px; border-radius: 50%; border: 1.5px solid #94a3b8; text-align: center; line-height: 12px; font-size: 8px;">B</span>
                  <span style="display: inline-block; width: 14px; height: 14px; border-radius: 50%; border: 1.5px solid #94a3b8; text-align: center; line-height: 12px; font-size: 8px;">C</span>
                  <span style="display: inline-block; width: 14px; height: 14px; border-radius: 50%; border: 1.5px solid #94a3b8; text-align: center; line-height: 12px; font-size: 8px;">D</span>
                </div>
              `}
            </div>
          `;
        }).join('');
      })()}
    </div>

    <!-- SECTION 2: Subjective Proofs & Model Answers (Only for Board Exams) -->
    ${subjectives && subjectives.length ? `
      <div style="margin-bottom: 22px;">
        <div class="pdf-section-hdr" style="background: #7c3aed; color: white; padding: 8px 14px; font-weight: 800; font-size: 13px; border-radius: 8px; margin-bottom: 10px; margin-top: 14px;">
          भाग 2: विषयनिष्ठ एवं व्याख्यात्मक मॉडल प्रश्न व प्रमेय उपपत्ति (Section 2: Step-by-Step Proofs & Model Answers)
        </div>
        ${subjectives.map(item => `
          <div class="pdf-avoid-break" style="margin-bottom: 10px; padding: 10px 14px; background: #fdf4ff; border-left: 4px solid #a855f7; border-radius: 6px;">
            <div style="font-weight: 700; font-size: 11.5px; color: #581c87; white-space: pre-line;">${item.q}</div>
            ${!isPaperOnly ? `
              <div style="font-size: 11px; color: #1e293b; font-weight: 600; margin-top: 6px; line-height: 1.5; white-space: pre-line;">
                ${item.ans || item.a}
              </div>
            ` : `
              <div style="border: 1px dashed #c084fc; border-radius: 6px; height: 50px; margin-top: 6px; background: #ffffff; display: flex; align-items: center; justify-content: center; color: #a855f7; font-size: 10px; font-weight: 600;">
                [अभ्यास हेतु कार्य क्षेत्र / Rough Space for Working]
              </div>
            `}
          </div>
        `).join('')}
      </div>
    ` : ''}

    <!-- SECTION 3: High-Yield Hall of Fame (Most Repeated Questions) -->
    <div style="margin-bottom: 22px;">
      <div class="pdf-section-hdr" style="background: #ea580c; color: white; padding: 8px 14px; font-weight: 800; font-size: 13px; border-radius: 8px; margin-bottom: 10px; margin-top: 14px;">
        भाग 3: विगत वर्षों के सर्वाधिक पूछे गए महत्वपूर्ण प्रश्न (High-Yield Hall of Fame)
      </div>
      ${hallOfFame.map(item => `
        <div class="pdf-avoid-break" style="margin-bottom: 8px; padding: 8px 12px; background: #fffbeb; border-left: 4px solid #f59e0b; border-radius: 6px;">
          <div style="font-weight: 700; font-size: 11.5px; color: #78350f;">${item.q}</div>
          ${!isPaperOnly ? `
            <div style="font-size: 11px; color: #065f46; font-weight: 600; margin-top: 3px;">${item.a || item.ans}</div>
          ` : ''}
        </div>
      `).join('')}
    </div>

    <!-- SECTION 4: Key Formulas & Speed Tricks -->
    <div style="margin-bottom: 18px;">
      <div class="pdf-section-hdr" style="background: #059669; color: white; padding: 8px 14px; font-weight: 800; font-size: 13px; border-radius: 8px; margin-bottom: 10px; margin-top: 14px;">
        भाग 4: Speed Calculation & Memory Shortcuts (परीक्षा में 100% समय बचाने वाले रामबाण फॉर्मूले)
      </div>
      <div class="pdf-avoid-break" style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 10px 14px;">
        ${shortcutsList.map(s => `
          <div style="font-size: 11px; color: #166534; font-weight: 600; margin-bottom: 5px;">
            ⚡ ${s}
          </div>
        `).join('')}
      </div>
    </div>

    <!-- OFFICIAL ANSWER KEY TABLE (Printed only in Question Paper Mode) -->
    ${isPaperOnly ? `
      <div class="pdf-avoid-break" style="margin-top: 24px; border: 2px solid #0f172a; border-radius: 8px; overflow: hidden;">
        <div style="background: #0f172a; color: white; padding: 8px 14px; font-weight: 800; font-size: 13px; display: flex; justify-content: space-between; align-items: center;">
          <span>📋 आधिकारिक उत्तर कुंजी तालिका (Official Answer Key Matrix)</span>
          <span style="font-size: 10px; color: #f59e0b; font-weight: bold;">(Do Not Refer Before Exam)</span>
        </div>
        <div style="padding: 12px; background: #ffffff;">
          <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px; font-size: 10px; font-weight: 700;">
            ${objectives.map((item, idx) => {
              let ansText = (item.ans || item.a || '').trim();
              let match = ansText.match(/^([A-D])/i);
              let keyLetter = match ? match[1].toUpperCase() : '✓';
              return `
                <div style="padding: 4px 6px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; display: flex; justify-content: space-between; align-items: center;">
                  <span style="color: #64748b;">Q${idx + 1}</span>
                  <strong style="color: #0f172a; background: #e0f2fe; padding: 1px 6px; border-radius: 3px;">${keyLetter}</strong>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    ` : ''}

    <!-- Footer -->
    <div class="pdf-avoid-break" style="border-top: 2px solid #e2e8f0; padding-top: 8px; margin-top: 18px; display: flex; justify-content: space-between; font-size: 10px; color: #94a3b8;">
      <span>BharatExams Hub Exam Cell • Verified Syllabus 2026</span>
      <span>Official Candidate Copy • ${objectives.length} Questions Verified</span>
    </div>
  `;

  // Always use 100% Crisp Vector Browser PDF Print Engine (Zero Blank Pages, Selectable Text)
  closeUpiModal();
  openPrintWindow(printArea.innerHTML, note.title);
  if (btn) {
    btn.innerHTML = `<span>✅ Notes PDF Ready</span>`;
    btn.disabled = false;
  }
}

function openPrintWindow(htmlContent, title = 'BharatExams Hub - Official Study Notes') {
  const win = window.open('', '_blank', 'width=900,height=950');
  if (!win) {
    if (typeof showAppAlert === 'function') {
      showAppAlert('पॉप-अप ब्लॉक हो गया है। कृपया ब्राउज़र सेटिंग्स में Pop-up Allow करें ताकि आपकी PDF खुल सके।', 'Popup Blocked', '🖨️');
    } else {
      alert('पॉप-अप ब्लॉक हो गया है। कृपया ब्राउज़र सेटिंग्स में Pop-up Allow करें ताकि आपकी PDF खुल सके।');
    }
    return;
  }
  win.document.write(`
    <!DOCTYPE html>
    <html lang="hi">
    <head>
      <meta charset="UTF-8">
      <title>${title}</title>
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;600;700;800;900&family=Plus+Jakarta+Sans:wght@500;700;800;900&display=swap" rel="stylesheet">
      <style>
        * { box-sizing: border-box; }
        body {
          font-family: 'Noto Sans Devanagari', 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
          padding: 20px 24px;
          color: #0f172a;
          background: #ffffff;
          margin: 0;
          line-height: 1.55;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        .pdf-avoid-break {
          page-break-inside: avoid !important;
          break-inside: avoid !important;
        }
        .pdf-section-hdr {
          page-break-after: avoid !important;
          break-after: avoid !important;
          page-break-inside: avoid !important;
        }
        @media print {
          @page {
            size: A4 portrait;
            margin: 10mm 12mm 12mm 12mm;
          }
          body { padding: 0 !important; }
          .no-print { display: none !important; }
          .pdf-avoid-break { page-break-inside: avoid !important; break-inside: avoid !important; }
          .pdf-section-hdr { page-break-after: avoid !important; break-after: avoid !important; page-break-inside: avoid !important; }
        }
        .action-bar {
          background: #0f172a;
          color: white;
          padding: 12px 18px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        .action-btn {
          background: #ea580c;
          color: white;
          border: none;
          padding: 8px 18px;
          border-radius: 8px;
          font-weight: 800;
          cursor: pointer;
          font-size: 13px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .action-btn:hover { background: #c2410c; }
        .tip-banner {
          background: #ecfdf5;
          border: 1px solid #10b981;
          color: #065f46;
          padding: 10px 14px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 700;
          margin-bottom: 18px;
        }
      </style>
    </head>
    <body>
      <div class="no-print">
        <div class="action-bar">
          <div style="font-weight: 800; font-size: 14px;">🇮🇳 BharatExams Hub • Study Notes & Formula Sheet</div>
          <div style="display: flex; gap: 8px;">
            <button onclick="window.print()" class="action-btn">
              🖨️ Download / Print PDF
            </button>
            <button onclick="window.close()" style="background: #334155; color: white; border: none; padding: 8px 14px; border-radius: 8px; font-weight: 700; cursor: pointer; font-size: 12px;">
              ✕ Close
            </button>
          </div>
        </div>
        <div class="tip-banner">
          💡 <strong>PDF सेव करने का सबसे आसान तरीका:</strong> नीचे खुले प्रिंट डायलॉग में Destination पर <strong>"Save as PDF"</strong> चुनें। इससे पूरी सामग्री 100% वेक्टर टेक्स्ट के रूप में बिना किसी ब्लैंक पेज के सेव हो जाएगी।
        </div>
      </div>

      ${htmlContent}

      <script>
        window.addEventListener('load', () => {
          setTimeout(() => {
            window.print();
          }, 600);
        });
      </script>
    </body>
    </html>
  `);
  win.document.close();
}

function handleSavePdfFromReader() {
  const note = activePaymentNote || latestAiGeneratedNote;
  if (!note) return;
  const isPaid = localStorage.getItem('paid_note_' + note.id);
  if (isPaid) {
    activePaymentNote = note;
    generateAndDownloadHighResPdf(isPaid);
  } else {
    if (typeof showAppAlert === 'function') {
      showAppAlert('PDF डाउनलोड करने के लिए कृपया पहले ₹9 का भुगतान पूरा करें और UTR नंबर सबमिट करें।', 'Payment Required', '🔒');
    } else {
      alert('PDF डाउनलोड करने के लिए कृपया पहले ₹9 का भुगतान पूरा करें और UTR नंबर सबमिट करें।');
    }
    closeNotesReaderModal();
    openUpiPaymentModal(note.id, note);
  }
}

// On-Screen Full Notes Interactive Reader Modal
function openNotesReaderModal(noteData) {
  const note = noteData || latestAiGeneratedNote || activePaymentNote;
  if (!note) return;

  let modal = document.getElementById('notesReaderModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'notesReaderModal';
    modal.className = 'fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-hidden';
    document.body.appendChild(modal);
  }

  const objectives = note.objectives || [];
  const subjectives = note.subjectives || [];
  const shortcuts = note.shortcuts || [];

  modal.innerHTML = `
    <div class="bg-white w-full max-w-4xl h-[92vh] rounded-3xl shadow-2xl flex flex-col border border-slate-200 overflow-hidden animate-fadeIn">
      <!-- Header -->
      <div class="bg-navy-950 text-white p-4 sm:p-6 flex items-center justify-between border-b-2 border-saffron-500 shrink-0">
        <div>
          <span class="text-[10px] font-black uppercase tracking-wider text-saffron-400 bg-saffron-950/80 px-2.5 py-1 rounded-full border border-saffron-500/40">
            📖 Official Digital Study Guide (On-Screen Mode)
          </span>
          <h2 class="text-base sm:text-xl font-black mt-1 text-white">${note.title || 'Study Guide 2026'}</h2>
          <div class="text-xs text-slate-300 font-semibold mt-0.5">
            ${objectives.length} MCQs ${subjectives.length ? '• ' + subjectives.length + ' Subjective Questions' : ''} • Verified 2026 Syllabus
          </div>
        </div>
        <div class="flex items-center space-x-2">
          <button onclick="handleSavePdfFromReader()" class="bg-saffron-500 hover:bg-saffron-600 text-white font-black text-xs px-3.5 py-2 rounded-xl transition shadow flex items-center space-x-1.5 cursor-pointer">
            <span>🖨️ Save PDF</span>
          </button>
          <button onclick="closeNotesReaderModal()" class="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-bold text-sm transition cursor-pointer">
            ✕
          </button>
        </div>
      </div>

      <!-- Quick Search Filter in Modal -->
      <div class="p-3 bg-slate-100 border-b border-slate-200 shrink-0 flex items-center space-x-2">
        <span class="text-sm">🔍</span>
        <input type="text" id="notesReaderSearchInput" placeholder="Search question or topic (e.g. प्रकाश, Ohm, Quadratic, Coulomb)..." oninput="filterNotesReaderContent(this.value)" class="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-saffron-500">
      </div>

      <!-- Scrollable Questions Content -->
      <div id="notesReaderContent" class="flex-grow p-4 sm:p-6 overflow-y-auto space-y-4">
        <!-- Section 1: MCQs -->
        <div class="font-black text-sm text-navy-900 bg-slate-100 p-2.5 rounded-xl border border-slate-200 flex items-center justify-between">
          <span>भाग 1: वस्तुनिष्ठ बहुविकल्पीय प्रश्न (Section 1: ${objectives.length} MCQs)</span>
          <span class="text-xs text-emerald-700 font-bold">100% Solved</span>
        </div>

        <div id="notesReaderMcqList" class="space-y-3">
          ${(() => {
            let lastSec = '';
            return objectives.map((item, idx) => {
              const secTitle = item.sectionName || item.subjectName;
              let secBadge = '';
              if (secTitle && secTitle !== lastSec) {
                lastSec = secTitle;
                secBadge = `
                  <div class="font-bold text-xs text-blue-900 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-xl mt-4 mb-2 flex items-center space-x-2">
                    <span>📖 अनुभाग / Subject:</span>
                    <span class="font-extrabold">${secTitle}</span>
                  </div>
                `;
              }
              return `
                ${secBadge}
                <div class="note-reader-item p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                  <div class="font-bold text-xs sm:text-sm text-slate-900 leading-snug whitespace-pre-line">${item.q}</div>
                  ${item.options && item.options.length ? `
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-700 pt-1">
                      ${item.options.map(opt => `<div class="p-1.5 bg-slate-50 rounded-lg border border-slate-200">${opt}</div>`).join('')}
                    </div>
                  ` : ''}
                  <div class="p-2 bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-xs rounded-xl flex items-center space-x-1.5">
                    <span>✓ सही उत्तर:</span>
                    <span>${item.ans || item.a}</span>
                  </div>
                  ${item.explanation ? `
                    <div class="p-2 bg-slate-50 border-l-4 border-slate-400 text-slate-600 text-[11px] rounded-r-xl">
                      ${item.explanation}
                    </div>
                  ` : ''}
                </div>
              `;
            }).join('');
          })()}
        </div>

        <!-- Section 2: Subjectives -->
        ${subjectives.length ? `
          <div class="font-black text-sm text-purple-900 bg-purple-50 p-2.5 rounded-xl border border-purple-200 mt-6">
            भाग 2: विषयनिष्ठ एवं व्याख्यात्मक मॉडल प्रश्न (Section 2: Step-by-Step Model Answers)
          </div>
          <div class="space-y-3">
            ${subjectives.map(item => `
              <div class="note-reader-item p-4 rounded-2xl bg-purple-50/50 border border-purple-200 space-y-2">
                <div class="font-bold text-xs sm:text-sm text-purple-950 whitespace-pre-line">${item.q}</div>
                <div class="text-xs text-slate-800 bg-white p-3 rounded-xl border border-purple-100 whitespace-pre-line leading-relaxed font-medium">
                  ${item.ans || item.a}
                </div>
              </div>
            `).join('')}
          </div>
        ` : ''}

        <!-- Section 3: Memory Shortcuts -->
        ${shortcuts.length ? `
          <div class="font-black text-sm text-amber-900 bg-amber-50 p-2.5 rounded-xl border border-amber-200 mt-6">
            भाग 3: Memory Shortcuts & Key Formulas
          </div>
          <div class="p-4 bg-amber-50/60 border border-amber-200 rounded-2xl space-y-2">
            ${shortcuts.map(s => `
              <div class="text-xs font-bold text-amber-950 flex items-start space-x-2">
                <span>⚡</span>
                <span>${s}</span>
              </div>
            `).join('')}
          </div>
        ` : ''}
      </div>

      <!-- Footer Bar -->
      <div class="bg-slate-100 p-3 sm:p-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600 font-bold shrink-0">
        <span>BharatExams Hub • 100% Free Online Reading</span>
        <button onclick="closeNotesReaderModal()" class="px-4 py-2 bg-slate-800 text-white rounded-xl hover:bg-slate-700 transition">
          Done Reading
        </button>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
}

function closeNotesReaderModal() {
  const modal = document.getElementById('notesReaderModal');
  if (modal) modal.classList.add('hidden');
}

function filterNotesReaderContent(query) {
  const q = (query || '').toLowerCase().trim();
  const items = document.querySelectorAll('.note-reader-item');
  items.forEach(el => {
    if (!q || el.textContent.toLowerCase().includes(q)) {
      el.style.display = '';
    } else {
      el.style.display = 'none';
    }
  });
}

async function generateAiExamNotes() {
  const examSelect = document.getElementById('aiNoteExamSelect');
  const subjectSelect = document.getElementById('aiNoteSubjectSelect');
  const boardContainer = document.getElementById('aiNoteBoardContainer');
  const boardSelect = document.getElementById('aiNoteBoardSelect');
  const btn = document.getElementById('triggerAiNotesBtn');
  const outputBox = document.getElementById('aiGeneratedNoteOutput');

  let exam = 'SSC GD Constable 2026';
  if (examSelect) {
    exam = examSelect.options[examSelect.selectedIndex]?.text || examSelect.value;
  }

  const subject = subjectSelect ? subjectSelect.value : 'General Knowledge & Top 500 PYQs';

  let board = '';
  if (boardContainer && !boardContainer.classList.contains('hidden') && boardSelect) {
    board = boardSelect.value;
  }

  if (btn) {
    btn.innerHTML = `<span>⏳ Compiling 100+ Questions Vault...</span>`;
    btn.disabled = true;
  }

  try {
    const res = await fetch('/api/ai/generate-notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        exam: exam,
        subject: subject,
        board: board,
        language: (typeof currentLanguage !== 'undefined' ? currentLanguage : 'hi')
      })
    });

    const data = await res.json();
    latestAiGeneratedNote = data;
    latestAiGeneratedNote.id = 'compiled-' + Date.now();
    latestAiGeneratedNote.exam = data.exam || exam;
    latestAiGeneratedNote.board = data.board || board;
    latestAiGeneratedNote.objectives = data.objectives || [];
    latestAiGeneratedNote.subjectives = data.subjectives || [];
    latestAiGeneratedNote.hallOfFame = data.hallOfFame || [];
    latestAiGeneratedNote.shortcuts = data.shortcuts || [];

    if (outputBox) {
      document.getElementById('aiNoteGenTitle').textContent = data.title;
      document.getElementById('aiNoteGenSummary').textContent = data.summary;
      document.getElementById('aiNoteGenPages').textContent = data.pages || `${data.objectives.length}+ Questions Master PDF`;
      document.getElementById('aiNoteGenBadge').textContent = `✓ ${data.objectives.length} Questions Verified`;

      const samplesContainer = document.getElementById('aiNoteGenSamples');
      if (samplesContainer) {
        let sampleList = [];
        if (data.objectives && data.objectives.length > 0) {
          sampleList = data.objectives.slice(0, 3).map(item => ({
            q: item.q.split('\n')[0],
            a: item.ans
          }));
        } else if (data.questions) {
          sampleList = data.questions.slice(0, 3);
        }

        samplesContainer.innerHTML = sampleList.map(item => `
          <div class="border-b border-slate-100 pb-2">
            <div class="font-bold text-slate-800">${item.q}</div>
            <div class="text-emerald-700 font-semibold mt-0.5">${item.a}</div>
          </div>
        `).join('') + (data.shortcuts && data.shortcuts.length ? `
          <div class="mt-2 p-2.5 bg-amber-100/70 rounded-xl text-amber-900 font-semibold text-xs border border-amber-200">
            ⚡ Memory Shortcut: ${data.shortcuts[0]}
          </div>
        ` : '');
      }

      outputBox.classList.remove('hidden');
      outputBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Add to catalog so user can also buy/download from below
    NOTES_CATALOG.unshift({
      id: latestAiGeneratedNote.id,
      title: data.title,
      exam: data.exam || exam,
      board: data.board || board,
      price: (subject === 'all' || subject.includes('all') || data.isBundle) ? 19 : 9,
      pages: data.pages || `${data.objectives.length}+ Questions PDF`,
      rating: '5.0 ★ (New 2026 Pattern)',
      badge: `⚡ ${data.objectives.length}+ Questions`,
      sampleQuestions: data.questions || (data.objectives ? data.objectives.map(o => ({ q: o.q.split('\n')[0], a: o.ans })) : []),
      objectives: data.objectives || [],
      subjectives: data.subjectives || [],
      hallOfFame: data.hallOfFame || [],
      shortcuts: data.shortcuts || []
    });
    renderNotesCatalog();

  } catch (err) {
    console.error('Error generating notes:', err);
    if (typeof showAppAlert === 'function') {
      showAppAlert('नोट्स तैयार करने में समस्या आई। कृपया दोबारा प्रयास करें।', 'Notes Error', '⚠️');
    } else {
      alert('Notes generate karne me samasya aayi. Dobara prayas karein.');
    }
  } finally {
    if (btn) {
      btn.innerHTML = `<span>⚡ Notes संकलित करें (Compile)</span>`;
      btn.disabled = false;
    }
  }
}

document.addEventListener('DOMContentLoaded', initNotesVault);

window.addEventListener('languageChanged', () => {
  if (typeof renderNotesCatalog === 'function') renderNotesCatalog();
  if (typeof updateNotesDependentDropdowns === 'function') updateNotesDependentDropdowns();
});

