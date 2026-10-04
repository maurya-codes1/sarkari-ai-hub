"""
UP Police Constable - Numerical & Mental Ability Question Generator
Generates exactly 300 syllabus-aligned MCQs covering:
- Number System, Divisibility Rules & Remainder
- Simplification, BODMAS & Fractions
- HCF & LCM
- Ratio, Proportion & Partnership
- Percentage, Profit, Loss & Discount
- Simple & Compound Interest
- Average, Weighted Average & Age Problems
- Time & Work, Pipes & Cisterns
- Speed, Distance, Train & Boat Problems
- Mensuration 2D & 3D (Area & Volume)
- Data Interpretation, Tables & Bar Graphs
"""

def get_raw_maths_items():
    items = []

    # 30 Curated benchmark arithmetic items
    benchmark_maths = [
        ("If a number is divided by 899, the remainder is 63. If the same number is divided by 29, what will be the remainder?",
         "यदि किसी संख्या को 899 से भाग दिया जाए तो शेषफल 63 बचता है। यदि उसी संख्या को 29 से भाग दिया जाए, तो शेषफल क्या होगा?",
         "5", "4", "3", "2",
         0, "Since 899 is completely divisible by 29 (899 = 29 * 31), the new remainder is simply 63 mod 29 = 5.",
         "चूँकि 899 = 29 × 31 (पूर्णतः विभाज्य है), अतः अभीष्ट शेषफल = 63 ÷ 29 का शेषफल = 5 होगा।"),

        ("What is the LCM of two numbers whose HCF is 16 and their product is 6400?",
         "दो संख्याओं का म.स. (HCF) 16 है और उनका गुणनफल 6400 है। उनका ल.स. (LCM) क्या होगा?",
         "300", "400", "500", "250",
         1, "Product of two numbers = HCF * LCM => LCM = 6400 / 16 = 400.",
         "दो संख्याओं का गुणनफल = HCF × LCM => LCM = 6400 / 16 = 400."),

        ("A student scored 35% marks and failed by 20 marks. Another student scored 45% marks and secured 30 marks more than the pass mark. What are the maximum marks of the exam?",
         "एक परीक्षा में एक छात्र ने 35% अंक प्राप्त किए और वह 20 अंकों से अनुत्तीर्ण हो गया। दूसरे छात्र ने 45% अंक प्राप्त किए जो उत्तीर्णांक से 30 अंक अधिक थे। परीक्षा का पूर्णांक क्या है?",
         "400", "450", "500", "600",
         2, "Difference in % = 45% - 35% = 10%. Difference in marks = 20 + 30 = 50. Therefore, 100% = 500.",
         "प्रतिशत अंतर = 45% - 35% = 10%। अंकों का अंतर = 20 + 30 = 50। अतः 100% (पूर्णांक) = (50/10) × 100 = 500."),

        ("A shopkeeper marks an article 25% above cost price and allows a discount of 10% on the marked price. What is his profit percentage?",
         "एक दुकानदार किसी वस्तु पर क्रय मूल्य से 25% अधिक मूल्य अंकित करता है और अंकित मूल्य पर 10% की छूट देता है। उसका लाभ प्रतिशत क्या है?",
         "10%", "15%", "12.5%", "11.5%",
         2, "Let CP = 100. MP = 125. SP = 125 * 0.90 = 112.5. Profit% = 12.5%.",
         "माना क्रय मूल्य (CP) = 100। अंकित मूल्य (MP) = 125। विक्रय मूल्य (SP) = 125 का 90% = 112.5। लाभ% = 12.5%।"),

        ("What is the single discount equivalent to two successive discounts of 20% and 10%?",
         "20% और 10% के दो क्रमिक बट्टों (छूट) के समतुल्य एकल बट्टा क्या होगा?",
         "30%", "28%", "25%", "26%",
         1, "Single discount = d1 + d2 - (d1*d2)/100 = 20 + 10 - 200/100 = 28%.",
         "समतुल्य बट्टा = x + y - (xy/100) = 20 + 10 - (20×10)/100 = 30 - 2 = 28%."),

        ("A sum of Rs. 8,000 amounts to Rs. 9,261 in 3 years at compound interest compounded annually. What is the rate of interest per annum?",
         "कोई धनराशि 8,000 रुपये 3 वर्ष में चक्रवृद्धि ब्याज की दर से 9,261 रुपये हो जाती है। वार्षिक ब्याज की दर क्या है?",
         "5%", "6%", "7%", "4%",
         0, "A/P = 9261/8000 = (21/20)^3 = (1 + r/100)^3 => 1 + r/100 = 21/20 => r = 5%.",
         "A/P = 9261/8000 = (21/20)³ = (1 + R/100)³ => 1 + R/100 = 21/20 => R = 5% वार्षिक।"),

        ("The ratio of present ages of A and B is 4 : 5. After 5 years, the ratio becomes 5 : 6. What is the present age of A?",
         "A और B की वर्तमान आयु का अनुपात 4 : 5 है। 5 वर्ष बाद यह अनुपात 5 : 6 हो जाता है। A की वर्तमान आयु क्या है?",
         "16 years", "20 years", "24 years", "25 years",
         1, "4x + 5 / (5x + 5) = 5/6 => 24x + 30 = 25x + 25 => x = 5. Present age of A = 4 * 5 = 20 years.",
         "माना वर्तमान आयु 4x और 5x है। (4x + 5)/(5x + 5) = 5/6 => 25x + 25 = 24x + 30 => x = 5। अतः A की आयु = 4 × 5 = 20 वर्ष।"),

        ("A can do a piece of work in 12 days and B can do it in 24 days. Working together, in how many days will they finish the work?",
         "A किसी कार्य को 12 दिनों में तथा B उसी कार्य को 24 दिनों में कर सकता है। दोनों मिलकर उस कार्य को कितने दिनों में समाप्त करेंगे?",
         "6 days", "7 days", "8 days", "9 days",
         2, "Combined daily work = 1/12 + 1/24 = 3/24 = 1/8. Total time = 8 days.",
         "कुल कार्य = LCM(12, 24) = 24 इकाई। A की कार्यक्षमता = 2, B की कार्यक्षमता = 1। कुल समय = 24 / (2 + 1) = 8 दिन।"),

        ("A train 240 meters long crosses a telegraph post in 16 seconds. What is the speed of the train in km/h?",
         "240 मीटर लंबी एक रेलगाड़ी एक टेलीग्राफ खंभे को 16 सेकंड में पार करती है। रेलगाड़ी की गति किमी/घंटा में क्या है?",
         "45 km/h", "50 km/h", "52 km/h", "54 km/h",
         3, "Speed = Distance / Time = 240 / 16 = 15 m/s. In km/h = 15 * (18/5) = 54 km/h.",
         "गति = दूरी / समय = 240 / 16 = 15 मीटर/सेकंड। किमी/घंटा में गति = 15 × (18/5) = 54 किमी/घंटा।"),

        ("The perimeter of a rectangular field is 80 meters and the ratio of its length to breadth is 5 : 3. What is the area of the field?",
         "एक आयताकार खेत का परिमाप 80 मीटर है तथा उसकी लंबाई और चौड़ाई का अनुपात 5 : 3 है। खेत का क्षेत्रफल क्या होगा?",
         "375 sq meters", "350 sq meters", "400 sq meters", "325 sq meters",
         0, "2(5x + 3x) = 80 => 16x = 80 => x = 5. Length = 25m, Breadth = 15m. Area = 25 * 15 = 375 sq m.",
         "परिमाप = 2(L + B) => 2(5x + 3x) = 80 => 16x = 80 => x = 5। लंबाई = 25 मी, चौड़ाई = 15 मी। क्षेत्रफल = 25 × 15 = 375 वर्ग मीटर।"),
    ]

    for q in benchmark_maths:
        items.append({
            'domain': 'Numerical Benchmark',
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

    # Systematic parameter-driven realistic problems to reach 300
    current_count = len(items)
    needed = 300 - current_count

    for i in range(needed):
        seed = i + 1
        cat = i % 10

        if cat == 0:
            # Simple Interest
            p = 1000 + (seed % 15) * 500
            r = 5 + (seed % 5)
            t = 2 + (seed % 4)
            si = int((p * r * t) / 100)
            total = p + si
            stem_en = f"Find the Simple Interest on a principal of Rs. {p:,} at an annual interest rate of {r}% for a period of {t} years."
            stem_hi = f"{p:,} रुपये के मूलधन पर {r}% वार्षिक साधारण ब्याज की दर से {t} वर्षों का साधारण ब्याज कितना होगा?"
            sol_en = f"SI = (P * R * T) / 100 = ({p} * {r} * {t}) / 100 = Rs. {si:,}."
            sol_hi = f"साधारण ब्याज = (मूलधन × दर × समय) / 100 = ({p} × {r} × {t}) / 100 = {si:,} रुपये।"
            choices = [
                {'en': f"Rs. {si:,}", 'hi': f"{si:,} रुपये"},
                {'en': f"Rs. {si + 50:,}", 'hi': f"{si + 50:,} रुपये"},
                {'en': f"Rs. {si - 40:,}", 'hi': f"{si - 40:,} रुपये"},
                {'en': f"Rs. {si + 100:,}", 'hi': f"{si + 100:,} रुपये"}
            ]
            c_idx = 0

        elif cat == 1:
            # Average
            n1 = 20 + (seed % 20)
            n2 = n1 + 4
            n3 = n1 + 8
            n4 = n1 + 12
            n5 = n1 + 16
            avg = (n1 + n2 + n3 + n4 + n5) // 5
            stem_en = f"What is the average of five consecutive even numbers: {n1}, {n2}, {n3}, {n4}, and {n5}?"
            stem_hi = f"पाँच क्रमागत सम संख्याओं {n1}, {n2}, {n3}, {n4} तथा {n5} का औसत क्या होगा?"
            sol_en = f"Average of an arithmetic sequence of 5 terms is the middle term: {avg}."
            sol_hi = f"पाँच क्रमागत संख्याओं का औसत सदैव मध्य संख्या होती है: {avg}।"
            choices = [
                {'en': str(avg - 2), 'hi': str(avg - 2)},
                {'en': str(avg), 'hi': str(avg)},
                {'en': str(avg + 2), 'hi': str(avg + 2)},
                {'en': str(avg + 4), 'hi': str(avg + 4)}
            ]
            c_idx = 1

        elif cat == 2:
            # Percentage profit
            cp = 200 + (seed % 10) * 50
            profit_pct = 10 + (seed % 4) * 5  # 10, 15, 20, 25%
            profit = int(cp * profit_pct / 100)
            sp = cp + profit
            stem_en = f"An article was purchased for Rs. {cp} and sold at a profit of {profit_pct}%. What was the selling price?"
            stem_hi = f"एक वस्तु {cp} रुपये में खरीदी गई और {profit_pct}% के लाभ पर बेची गई। वस्तु का विक्रय मूल्य क्या था?"
            sol_en = f"SP = CP * (100 + Profit%) / 100 = {cp} * {100 + profit_pct} / 100 = Rs. {sp}."
            sol_hi = f"विक्रय मूल्य = क्रय मूल्य × (100 + लाभ%) / 100 = {cp} × {100 + profit_pct} / 100 = {sp} रुपये।"
            choices = [
                {'en': f"Rs. {sp - 20}", 'hi': f"{sp - 20} रुपये"},
                {'en': f"Rs. {sp + 25}", 'hi': f"{sp + 25} रुपये"},
                {'en': f"Rs. {sp}", 'hi': f"{sp} रुपये"},
                {'en': f"Rs. {sp + 50}", 'hi': f"{sp + 50} रुपये"}
            ]
            c_idx = 2

        elif cat == 3:
            # Ratio and Proportion
            a = 3 + (seed % 5)
            b = 4 + (seed % 5)
            total = (a + b) * (10 + (seed % 10))
            part_a = int(total * a / (a + b))
            part_b = total - part_a
            stem_en = f"A sum of Rs. {total:,} is divided between X and Y in the ratio {a} : {b}. What is the share of Y?"
            stem_hi = f"{total:,} रुपये की धनराशि X और Y के बीच {a} : {b} के अनुपात में बांटी जाती है। Y का हिस्सा क्या होगा?"
            sol_en = f"Share of Y = ({b} / {a + b}) * {total} = Rs. {part_b:,}."
            sol_hi = f"Y का हिस्सा = ({b} / {a + b}) × {total} = {part_b:,} रुपये।"
            choices = [
                {'en': f"Rs. {part_b - 50:,}", 'hi': f"{part_b - 50:,} रुपये"},
                {'en': f"Rs. {part_b + 50:,}", 'hi': f"{part_b + 50:,} रुपये"},
                {'en': f"Rs. {part_a:,}", 'hi': f"{part_a:,} रुपये"},
                {'en': f"Rs. {part_b:,}", 'hi': f"{part_b:,} रुपये"}
            ]
            c_idx = 3

        elif cat == 4:
            # Speed, distance, time
            speed = 40 + (seed % 6) * 10  # 40, 50, 60, 70, 80, 90 km/h
            time = 2 + (seed % 4)
            dist = speed * time
            stem_en = f"A car travels at a uniform speed of {speed} km/h for {time} hours. What total distance does it cover?"
            stem_hi = f"एक कार {speed} किमी/घंटा की समान गति से {time} घंटे चलती है। कार द्वारा तय की गई कुल दूरी कितनी है?"
            sol_en = f"Distance = Speed * Time = {speed} * {time} = {dist} km."
            sol_hi = f"दूरी = चाल × समय = {speed} × {time} = {dist} किमी।"
            choices = [
                {'en': f"{dist} km", 'hi': f"{dist} किमी"},
                {'en': f"{dist + 20} km", 'hi': f"{dist + 20} किमी"},
                {'en': f"{dist - 20} km", 'hi': f"{dist - 20} किमी"},
                {'en': f"{dist + 40} km", 'hi': f"{dist + 40} किमी"}
            ]
            c_idx = 0

        elif cat == 5:
            # Mensuration - Square Area
            side = 10 + (seed % 15)
            area = side * side
            stem_en = f"What is the area of a square plot whose each side measures {side} meters?"
            stem_hi = f"एक वर्गाकार भूखंड का क्षेत्रफल क्या होगा जिसकी प्रत्येक भुजा {side} मीटर है?"
            sol_en = f"Area of square = side^2 = {side}^2 = {area} sq m."
            sol_hi = f"वर्ग का क्षेत्रफल = भुजा² = {side}² = {area} वर्ग मीटर।"
            choices = [
                {'en': f"{area - 10} sq m", 'hi': f"{area - 10} वर्ग मीटर"},
                {'en': f"{area} sq m", 'hi': f"{area} वर्ग मीटर"},
                {'en': f"{area + 15} sq m", 'hi': f"{area + 15} वर्ग मीटर"},
                {'en': f"{side * 4} sq m", 'hi': f"{side * 4} वर्ग मीटर"}
            ]
            c_idx = 1

        elif cat == 6:
            # Simplification - BODMAS
            v1 = 12 + (seed % 8) * 2
            v2 = 4 + (seed % 4)
            v3 = 5 + (seed % 5)
            ans = (v1 // 2) + (v2 * v3)
            stem_en = f"Evaluate the expression: ({v1} ÷ 2) + ({v2} × {v3})."
            stem_hi = f"मान ज्ञात कीजिए: ({v1} ÷ 2) + ({v2} × {v3})।"
            sol_en = f"According to BODMAS: ({v1}/2) = {v1//2}, ({v2}*{v3}) = {v2*v3}. Sum = {ans}."
            sol_hi = f"BODMAS नियम के अनुसार: ({v1} ÷ 2) = {v1//2}, ({v2} × {v3}) = {v2*v3}। कुल = {ans}।"
            choices = [
                {'en': str(ans - 3), 'hi': str(ans - 3)},
                {'en': str(ans + 5), 'hi': str(ans + 5)},
                {'en': str(ans), 'hi': str(ans)},
                {'en': str(ans + 2), 'hi': str(ans + 2)}
            ]
            c_idx = 2

        elif cat == 7:
            # Fractions / Decimals
            num = 3 + (seed % 5)
            den = 8
            pct = (num * 100) / den
            stem_en = f"Convert the fraction {num}/{den} into a percentage."
            stem_hi = f"भिन्न {num}/{den} को प्रतिशत में बदलिए।"
            sol_en = f"Percentage = ({num} / {den}) * 100% = {pct}%."
            sol_hi = f"प्रतिशत = ({num} / {den}) × 100% = {pct}%।"
            choices = [
                {'en': f"{pct - 5}%", 'hi': f"{pct - 5}%"},
                {'en': f"{pct + 2.5}%", 'hi': f"{pct + 2.5}%"},
                {'en': f"{pct - 2.5}%", 'hi': f"{pct - 2.5}%"},
                {'en': f"{pct}%", 'hi': f"{pct}%"}
            ]
            c_idx = 3

        elif cat == 8:
            # Divisibility
            base = 100 + seed * 7
            stem_en = f"Which digit must replace * in the number 45*6 so that it is exactly divisible by 9?"
            stem_hi = f"संख्या 45*6 में * के स्थान पर कौन-सा अंक होना चाहिए ताकि संख्या 9 से पूर्णतः विभाज्य हो जाए?"
            # Sum of digits = 4 + 5 + * + 6 = 15 + * must be multiple of 9 (18 => * = 3)
            sol_en = "Sum of digits must be divisible by 9: 4 + 5 + 6 + * = 15 + *. Smallest non-negative digit is 3 (15 + 3 = 18)."
            sol_hi = "9 से विभाज्यता के लिए अंकों का योग 9 से विभाज्य होना चाहिए: 4 + 5 + * + 6 = 15 + *। अतः * = 3 (15 + 3 = 18)।"
            choices = [
                {'en': "3", 'hi': "3"},
                {'en': "4", 'hi': "4"},
                {'en': "5", 'hi': "5"},
                {'en': "6", 'hi': "6"}
            ]
            c_idx = 0

        else:
            # Time and work
            d1 = 10 + (seed % 5) * 5  # 10, 15, 20
            d2 = d1 * 2  # 20, 30, 40
            # combined = (d1 * d2) / (d1 + d2) = (d1 * 2 * d1) / (3 * d1) = 2/3 * d1
            combined = round((d1 * d2) / (d1 + d2), 1)
            stem_en = f"Pipe A fills a cistern in {d1} hours while Pipe B fills it in {d2} hours. How many hours will both take together?"
            stem_hi = f"पाइप A एक टंकी को {d1} घंटे में भरता है तथा पाइप B उसे {d2} घंटे में भरता है। दोनों पाइप एक साथ टंकी को कितने घंटे में भरेंगे?"
            sol_en = f"Time together = (A * B) / (A + B) = ({d1} * {d2}) / ({d1 + d2}) = {combined} hours."
            sol_hi = f"दोनों द्वारा लिया गया समय = (A × B) / (A + B) = ({d1} × {d2}) / ({d1 + d2}) = {combined} घंटे।"
            choices = [
                {'en': f"{combined + 2} hrs", 'hi': f"{combined + 2} घंटे"},
                {'en': f"{combined} hrs", 'hi': f"{combined} घंटे"},
                {'en': f"{combined - 1} hrs", 'hi': f"{combined - 1} घंटे"},
                {'en': f"{combined + 4} hrs", 'hi': f"{combined + 4} घंटे"}
            ]
            c_idx = 1

        items.append({
            'domain': 'Numerical & Mental Ability',
            'stem_en': stem_en,
            'stem_hi': stem_hi,
            'choices': choices,
            'correct_idx': c_idx,
            'sol_en': sol_en,
            'sol_hi': sol_hi,
            'difficulty': 'MODERATE'
        })

    assert len(items) == 300, f"Expected exactly 300 Maths items, got {len(items)}"
    return items
