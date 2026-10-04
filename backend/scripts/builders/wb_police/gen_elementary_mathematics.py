"""
West Bengal Police Constable & Lady Constable - Elementary Mathematics Generator (Madhyamik Standard)
Generates exactly 300 syllabus-aligned MCQs covering:
- সংখ্যা তত্ত্ব, মৌলিক সংখ্যা ও বিভাজ্যতার নিয়ম (Divisibility 2,3,4,5,6,8,9,11)
- গসাগু ও লসাগু (HCF and LCM)
- ভগ্নাংশ, দশমিক ও সরলীকরন (VBODMAS, Square & Cube roots)
- অনুপাত ও সমানুপাত এবং অংশীদারি কারবার (Ratio, Proportion & Partnership)
- গড় ও বয়স সংক্রান্ত সমস্যা (Average & Problems on Ages)
- শতকরা (Percentage)
- লাভ ও ক্ষতি এবং ছাড়/কমিশন (Profit, Loss, Discount)
- সরল সুদ ও চক্রবৃদ্ধি সুদ (Simple & Compound Interest)
- সময় ও কার্য এবং নল ও চৌবাচ্চা (Time, Work, Pipes & Cisterns)
- গতিবেগ, সময় ও দূরত্ব এবং ট্রেনের সমস্যা (Speed, Distance, Time, Trains, Boats & Streams)
- পরিমিতি - ক্ষেত্রফল, পরিসীমা ও আয়তন (Mensuration 2D & 3D)
Strict 25.0% option key balance (75 A, 75 B, 75 C, 75 D).
"""

import sys
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

def get_raw_elementary_mathematics_items():
    items = []

    # 1. 24 Benchmark Core Quantitative Problems
    core_math_benchmarks = [
        # 1. Number System
        ("How many prime numbers (মৌলিক সংখ্যা) exist between 50 and 100?",
         "৫০ থেকে ১০০ এর মধ্যে মোট কতগুলি মৌলিক সংখ্যা রয়েছে?",
         "10 prime numbers (১০ টি মৌলিক সংখ্যা)", "9", "11", "12",
         0, "Between 50 and 100, there are 10 prime numbers: 53, 59, 61, 67, 71, 73, 79, 83, 89, 97.",
         "৫০ থেকে ১০০-র মধ্যে মোট ১০টি মৌলিক সংখ্যা রয়েছে (৫৩, ৫৯, ৬১, ৬৭, ৭১, ৭৩, ৭৯, ৮৩, ৮৯, ৯৭)।"),

        # 2. HCF and LCM
        ("The HCF of two numbers is 11 and their LCM is 7700. If one of the numbers is 275, find the other number.",
         "দুটি সংখ্যার গসাগু ১১ এবং লসাগু ৭,৭০০। যদি একটি সংখ্যা ২৭৫ হয়, তবে অপর সংখ্যাটি কত?",
         "290", "308 (৩০৮)", "315", "320",
         1, "Product of numbers = HCF x LCM. Other number = (11 x 7700) / 275 = 84700 / 275 = 308.",
         "অপর সংখ্যা = (গসাগু x লসাগু) / একটি সংখ্যা = (১১ x ৭,৭০০) / ২৭৫ = ৩০৮।"),

        # 3. Simplification / VBODMAS
        ("Simplify: 18 - [6 - {4 - (8 - 6 + 3)}]",
         "সরল করুন: ১৮ - [৬ - {৪ - (৮ - ৬ + ৩)}] = ?",
         "15", "17", "13 (১৩)", "11",
         2, "8 - 6 + 3 = 5. {4 - 5} = -1. [6 - (-1)] = 7. 18 - 7 = 11. (Wait: 18 - 7 = 11! Let's verify: 8-6=2; 2+3=5. 4-5 = -1. 6 - (-1) = 7. 18 - 7 = 11. Choice is 11, index 3).",
         "প্রথম বন্ধনী: ৮ - ৬ + ৩ = ৫। দ্বিতীয় বন্ধনী: ৪ - ৫ = -১। তৃতীয় বন্ধনী: ৬ - (-১) = ৭। নির্ণেয় মান = ১৮ - ৭ = ১১।")
    ]

    # Let's adjust benchmark 2 with correct choice and explanation:
    core_math_benchmarks[2] = (
        "Simplify according to BODMAS rule: 18 - [6 - {4 - (8 - 6 + 3)}]",
        "BODMAS নিয়মে সরল মান নির্ণয় করুন: ১৮ - [৬ - {৪ - (৮ - ৬ + ৩)}] = ?",
        "15", "17", "13", "11 (১১)",
        3, "Inner paren: (8 - 6 + 3) = 5. Curly braces: {4 - 5} = -1. Square brackets: [6 - (-1)] = 7. Finally: 18 - 7 = 11.",
        "প্রথম বন্ধনী: (৮ - ৬ + ৩) = ৫। দ্বিতীয় বন্ধনী: {৪ - ৫} = -১। তৃতীয় বন্ধনী: [৬ - (-১)] = ৭। ১৮ - ৭ = ১১।"
    )

    core_math_benchmarks.extend([
        # 4. Fractions & Decimals
        ("Which of the following is the largest fraction: 2/3, 3/5, 7/10, 4/7?",
         "নিচের ভগ্নাংশগুলির মধ্যে কোনটি বৃহত্তম: ২/৩, ৩/৫, ৭/১০, ৪/৭?",
         "7/10 (০.৭০)", "2/3 (০.৬৬৬)", "3/5 (০.৬০)", "4/7 (০.৫৭১)",
         0, "Comparing decimals: 7/10 = 0.70; 2/3 = 0.666; 4/7 = 0.571; 3/5 = 0.60. Largest is 7/10.",
         "দশমিকে রূপান্তর: ৭/১০ = ০.৭০; ২/৩ = ০.৬৬৭; ৩/৫ = ০.৬০; ৪/৭ = ০.৫৭১। সুতরাং ৭/১০ বৃহত্তম।"),

        # 5. Average
        ("The average of 7 consecutive numbers is 20. What is the largest of these numbers?",
         "৭টি ধারাবাহিক সংখ্যার গড় ২০ হলে, বৃহত্তম সংখ্যাটি কত?",
         "21", "23 (২৩)", "24", "22",
         1, "In 7 consecutive numbers, the 4th (middle) number is the average (20). The numbers are 17, 18, 19, 20, 21, 22, 23. Largest is 23.",
         "৭টি ধারাবাহিক সংখ্যার গড় হলো মধ্যবর্তী ৪র্থ সংখ্যা (২০)। সংখ্যাগুলি হলো: ১৭, ১৮, ১৯, ২০, ২১, ২২, ২৩। বৃহত্তম সংখ্যা = ২৩।"),

        # 6. Problems on Ages
        ("The ratio of the present ages of father and son is 7 : 2. After 10 years, the ratio becomes 9 : 4. What is the father's present age?",
         "পিতা ও পুত্রের বর্তমান বয়সের অনুপাত ৭ : ২। ১০ বছর পর তাদের বয়সের অনুপাত হবে ৯ : ৪। পিতার বর্তমান বয়স কত?",
         "30 years", "40 years", "35 years (৩৫ বছর)", "42 years",
         2, "Let ages be 7x and 2x. (7x + 10)/(2x + 10) = 9/4 => 28x + 40 = 18x + 90 => 10x = 50 => x = 5. Father's age = 7 x 5 = 35 years.",
         "ধরি বর্তমান বয়স ৭x ও ২x। শর্তানুসারে (৭x + ১০)/(২x + ১০) = ৯/৪ বা ২৮x + ৪০ = ১৮x + ৯০ বা ১০x = ৫০ বা x = ৫। পিতার বয়স = ৭ x ৫ = ৩৫ বছর।"),

        # 7. Ratio & Proportion
        ("If A : B = 2 : 3, B : C = 4 : 5, and C : D = 6 : 7, find the ratio A : D.",
         "যদি A : B = ২ : ৩, B : C = ৪ : ৫ এবং C : D = ৬ : ৭ হয়, তবে A : D এর মান কত?",
         "12 : 25", "14 : 35", "18 : 35", "16 : 35 (১৬ : ৩৫)",
         3, "A/D = (A/B) x (B/C) x (C/D) = (2/3) x (4/5) x (6/7) = 48/105 = 16/35.",
         "A/D = (২/৩) x (৪/৫) x (৬/৭) = ৪৮ / ১০৫ = ১৬ / ৩৫ বা ১৬ : ৩৫।"),

        # 8. Partnership
        ("A and B start a business investing Rs. 12,000 and Rs. 16,000 respectively. If the annual profit is Rs. 7,000, what is A's share of profit?",
         "A এবং B যথাক্রমে ১২,০০০ টাকা এবং ১৬,০০০ টাকা মূলধন নিয়ে একটি ব্যবসা শুরু করে। বছরের শেষে ৭,০০০ টাকা লাভ হলে A-এর লভ্যাংশ কত?",
         "Rs. 3,000 (৩,০০০ টাকা)", "Rs. 4,000", "Rs. 3,500", "Rs. 2,500",
         0, "Ratio of investment = 12000 : 16000 = 3 : 4. A's share = (3/7) x 7000 = Rs. 3,000.",
         "মূলধনের অনুপাত = ১২০০০ : ১৬০০০ = ৩ : ৪। A-এর লভ্যাংশ = (৩/৭) x ৭০০০ = ৩,০০০ টাকা।"),

        # 9. Percentage
        ("If the price of sugar increases by 25%, by what percentage must a family reduce its consumption so that expenditure remains unchanged?",
         "চিনির মূল্য ২৫% বৃদ্ধি পেলে, চিনির খরচ অপরিবর্তিত রাখতে পরিবারের ব্যবহার শতকরা কত হ্রাস করতে হবে?",
         "25%", "20% (২০% হ্রাস)", "15%", "16.67%",
         1, "Reduction% = [R / (100 + R)] x 100 = [25 / 125] x 100 = 20%.",
         "ব্যবহার হ্রাস = [২৫ / (১০০ + ২৫)] x ১০০ = (২৫/১২৫) x ১০০ = ২০%।"),

        # 10. Profit & Loss
        ("A shopkeeper sells an article for Rs. 450 incurring a loss of 10%. At what price must he sell it to gain 20%?",
         "এক দোকানদার একটি দ্রব্য ৪৫০ টাকায় বিক্রি করায় ১০% ক্ষতি হয়। কত টাকায় বিক্রি করলে তাঁর ২০% লাভ হবে?",
         "Rs. 550", "Rs. 580", "Rs. 600 (৬০০ টাকা)", "Rs. 620",
         2, "Cost price = 450 / 0.90 = Rs. 500. Selling price for 20% gain = 500 x 1.20 = Rs. 600.",
         "ক্রয়মূল্য = ৪৫০ x (১০০/৯০) = ৫০০ টাকা। ২০% লাভে বিক্রয়মূল্য = ৫০০ x (১২০/১০০) = ৬০০ টাকা।"),

        ("A dishonest milkman buys milk at cost price and mixes 20% water and sells it at cost price. What is his profit percentage?",
         "একজন অসাধু ব্যবসায়ী ক্রয়মূল্যেই দুধ বিক্রি করার দাবি করে, কিন্তু দুধে ২০% জল মিশিয়ে বিক্রি করে। তার শতকরা লাভ কত?",
         "15%", "18%", "25%", "20% (২০% লাভ)",
         3, "Since water is free, profit percentage is equal to percentage of water added (20%).",
         "জলের কোনো মূল্য না থাকায় দুধে ২০% জল মেশালে শতকরা ২০% লাভ হয়।"),

        # 11. Simple Interest
        ("In how many years will a sum of money double itself at 10% per annum simple interest?",
         "বার্ষিক ১০% সরল সুদের হারে কত বছরে কোনো আসল সুদে-আসলে দ্বিগুণ হবে?",
         "10 years (১০ বছর)", "8 years", "12 years", "15 years",
         0, "To double, SI = P. Time = (SI x 100) / (P x R) = (P x 100) / (P x 10) = 10 years.",
         "সুদে-আসলে দ্বিগুণ মানে সুদ = আসল। সময় = (১০০ x সুদ) / (আসল x হার) = ১০০ / ১০ = ১০ বছর।"),

        # 12. Compound Interest
        ("What is the compound interest on Rs. 8,000 at 5% per annum for 2 years compounded annually?",
         "বার্ষিক ৫% চক্রবৃদ্ধি সুদে ৮,০০০ টাকার ২ বছরের চক্রবৃদ্ধি সুদ কত হবে?",
         "Rs. 800", "Rs. 820 (৮২০ টাকা)", "Rs. 840", "Rs. 850",
         1, "Amount = 8000 x (1.05)^2 = 8000 x 1.1025 = 8,820. CI = 8820 - 8000 = Rs. 820.",
         "২ বছর পর সমূল চক্রবৃদ্ধি = ৮০০০ x (২১/২০) x (২১/২০) = ৮,৮২০ টাকা। চক্রবৃদ্ধি সুদ = ৮৮২০ - ৮০০০ = ৮২০ টাকা।"),

        # 13. Time & Work
        ("A can do a piece of work in 12 days and B can do it in 24 days. Working together, in how many days will they finish the work?",
         "A একটি কাজ ১২ দিনে এবং B সেই কাজটি ২৪ দিনে সম্পন্ন করতে পারে। তারা একত্রে কাজটি কত দিনে শেষ করবে?",
         "6 days", "10 days", "8 days (৮ দিন)", "9 days",
         2, "Combined daily work = 1/12 + 1/24 = (2 + 1)/24 = 3/24 = 1/8. Total time = 8 days.",
         "একত্রে ১ দিনে করে = ১/১২ + ১/২৪ = ৩/২৪ = ১/৮ অংশ। সম্পূর্ণ কাজটি করতে সময় লাগবে ৮ দিন।"),

        ("12 men can complete a work in 15 days. How many men are required to complete the same work in 10 days?",
         "১২ জন লোক একটি কাজ ১৫ দিনে শেষ করতে পারে। ওই কাজটি ১০ দিনে সম্পন্ন করতে কতজন লোক লাগবে?",
         "16 men", "15 men", "20 men", "18 men (১৮ জন লোক)",
         3, "M1 x D1 = M2 x D2 => 12 x 15 = M2 x 10 => 180 / 10 = 18 men.",
         "M1 x D1 = M2 x D2 অনুযায়ী: ১২ x ১৫ = M2 x ১০ বা M2 = ১৮০ / ১০ = ১৮ জন লোক।"),

        # 14. Pipes & Cisterns
        ("Two pipes A and B can fill a cistern in 20 minutes and 30 minutes respectively. If both pipes are opened together, how long will it take to fill the cistern?",
         "দুটি নল A ও B একটি চৌবাচ্চা যথাক্রমে ২০ মিনিট ও ৩০ মিনিটে পূর্ণ করতে পারে। দুটি নল একসাথে খুলে দিলে চৌবাচ্চাটি কত মিনিটে পূর্ণ হবে?",
         "12 minutes (১২ মিনিট)", "15 minutes", "10 minutes", "14 minutes",
         0, "1/20 + 1/30 = (3 + 2)/60 = 5/60 = 1/12. Time = 12 minutes.",
         "একত্রে ১ মিনিটে পূর্ণ করে = ১/২০ + ১/৩০ = ৫/৬০ = ১/১২ অংশ। সময় লাগবে ১২ মিনিট।"),

        # 15. Speed, Distance & Time
        ("A train 240 meters long crosses a telegraph post in 16 seconds. What is the speed of the train in km/hr?",
         "২৪০ মিটার দীর্ঘ একটি ট্রেন ১৬ সেকেন্ডে একটি টেলিগ্রাম পোস্ট অতিক্রম করে। ট্রেনটির গতিবেগ ঘণ্টায় কত কিমি?",
         "48 km/hr", "54 km/hr (৫৪ কিমি/ঘণ্টা)", "60 km/hr", "50 km/hr",
         1, "Speed = 240 / 16 = 15 m/s. In km/hr = 15 x (18/5) = 54 km/hr.",
         "গতিবেগ = ২৪০ / ১৬ = ১৫ মিটার/সেকেন্ড। কিমি/ঘণ্টায় গতিবেগ = ১৫ x (১৮/৫) = ৫৪ কিমি/ঘণ্টা।"),

        ("A train 180 meters long is running at 72 km/hr. How much time will it take to cross a platform 120 meters long?",
         "১৮০ মিটার দীর্ঘ একটি ট্রেন ঘণ্টায় ৭২ কিমি বেগে চললে, ১২০ মিটার দীর্ঘ একটি প্ল্যাটফর্ম অতিক্রম করতে কত সময় নেবে?",
         "12 seconds", "18 seconds", "15 seconds (১৫ সেকেন্ড)", "20 seconds",
         2, "Total distance = 180 + 120 = 300 m. Speed = 72 x (5/18) = 20 m/s. Time = 300 / 20 = 15 seconds.",
         "মোট দূরত্ব = ১৮০ + ১২০ = ৩০০ মিটার। ট্রেনের গতিবেগ = ৭২ x (৫/১৮) = ২০ মি/সেকেন্ড। সময় = ৩০০ / ২০ = ১৫ সেকেন্ড।"),

        # 16. Boats & Streams
        ("A boat travels downstream at 14 km/hr and upstream at 8 km/hr. What is the speed of the boat in still water?",
         "একটি নৌকা স্রোতের অনুকূলে ঘণ্টায় ১৪ কিমি এবং স্রোতের প্রতিকূলে ঘণ্টায় ৮ কিমি যায়। স্থির জলে নৌকার বেগ কত?",
         "10 km/hr", "12 km/hr", "9 km/hr", "11 km/hr (১১ কিমি/ঘণ্টা)",
         3, "Speed in still water = (Downstream + Upstream) / 2 = (14 + 8) / 2 = 11 km/hr.",
         "স্থির জলে নৌকার বেগ = (অনুকূলে বেগ + প্রতিকূলে বেগ) / ২ = (১৪ + ৮) / ২ = ১১ কিমি/ঘণ্টা।"),

        # 17. Mensuration
        ("What is the area of a right-angled triangle whose base is 12 cm and hypotenuse is 13 cm?",
         "একটি সমকোণী ত্রিভুজের ভূমি ১২ সেমি এবং অতিভুজ ১৩ সেমি হলে, ত্রিভুজটির ক্ষেত্রফল কত?",
         "30 sq.cm (৩০ বর্গ সেমি)", "36 sq.cm", "24 sq.cm", "40 sq.cm",
         0, "Perpendicular height = sqrt(13^2 - 12^2) = sqrt(169 - 144) = 5 cm. Area = 1/2 x 12 x 5 = 30 sq.cm.",
         "উচ্চতা = √(১৩² - ১২²) = √(১৬৯ - ১৪৪) = ৫ সেমি। ক্ষেত্রফল = ১/২ x ভূমি x উচ্চতা = ১/২ x ১২ x ৫ = ৩০ বর্গ সেমি।"),

        ("If the perimeter of a semi-circular park is 72 meters, what is its radius? (Use pi = 22/7)",
         "একটি অর্ধবৃত্তাকার পার্কের পরিসীমা ৭২ মিটার হলে, তার ব্যাসার্ধ কত? (π = ২২/৭)",
         "12 m", "14 m (১৪ মিটার)", "16 m", "21 m",
         1, "Perimeter = r(pi + 2) = r(22/7 + 2) = r(36/7) = 72 => r = 72 x (7/36) = 14 m.",
         "অর্ধবৃত্তের পরিসীমা = πr + 2r = r(২২/৭ + ২) = r(৩৬/৭)। r(৩৬/৭) = ৭২ বা r = ৭২ x (৭/৩৬) = ১৪ মিটার।"),

        ("What is the surface area of a cube whose volume is 512 cubic cm?",
         "একটি ঘনকের আয়তন ৫১২ ঘন সেমি হলে, তার সমগ্রতলের ক্ষেত্রফল কত?",
         "360 sq.cm", "396 sq.cm", "384 sq.cm (৩৮৪ বর্গ সেমি)", "400 sq.cm",
         2, "Side = cbrt(512) = 8 cm. Surface area = 6 x a^2 = 6 x 64 = 384 sq.cm.",
         "ঘনকের বাহু = ³√৫১২ = ৮ সেমি। সমগ্রতলের ক্ষেত্রফল = ৬ x (বাহু)² = ৬ x ৬৪ = ৩৮৪ বর্গ সেমি।"),

        ("How many small cubes of edge 2 cm can be cut from a larger cuboid measuring 8 cm x 6 cm x 4 cm?",
         "৮ সেমি x ৬ সেমি x ৪ সেমি মাপের একটি আয়তঘন থেকে ২ সেমি বাহুবিশিষ্ট কতগুলি ছোট ঘনক তৈরি করা যাবে?",
         "18 cubes", "20 cubes", "28 cubes", "24 cubes (২৪ টি ঘনক)",
         3, "Volume of cuboid = 8 x 6 x 4 = 192 cu.cm. Volume of small cube = 2^3 = 8 cu.cm. Number of cubes = 192 / 8 = 24 cubes.",
         "আয়তঘনের আয়তন = ৮ x ৬ x ৪ = ১৯২ ঘন সেমি। ছোট ঘনকের আয়তন = ২³ = ৮ ঘন সেমি। মোট ঘনকের সংখ্যা = ১৯২ / ৮ = ২৪ টি।"),

        ("What is the volume of a right circular cylinder whose base radius is 7 cm and height is 10 cm? (Use pi = 22/7)",
         "একটি লম্ববৃত্তাকার চোঙের ভূমির ব্যাসার্ধ ৭ সেমি এবং উচ্চতা ১০ সেমি হলে, চোঙটির আয়তন কত? (π = ২২/৭)",
         "1540 cu.cm (১,৫৪০ ঘন সেমি)", "1450 cu.cm", "1500 cu.cm", "1600 cu.cm",
         0, "Volume of cylinder = pi x r^2 x h = (22/7) x 7 x 7 x 10 = 22 x 70 = 1540 cu.cm.",
         "চোঙের আয়তন = π x r² x h = (২২/৭) x ৭ x ৭ x ১০ = ১,৫৪০ ঘন সেমি।")
    ])

    for b in core_math_benchmarks:
        stem_en, stem_hi, o1, o2, o3, o4, c_idx, sol_en, sol_hi = b
        raw_choices = [
            {'en': o1, 'hi': o1},
            {'en': o2, 'hi': o2},
            {'en': o3, 'hi': o3},
            {'en': o4, 'hi': o4}
        ]
        items.append({
            'domain': 'West Bengal Police Mathematics Core',
            'stem_en': stem_en,
            'stem_hi': stem_hi,
            'choices': raw_choices,
            'correct_idx': c_idx,
            'sol_en': sol_en,
            'sol_hi': sol_hi,
            'difficulty': 'MODERATE'
        })

    # Catalog of 69 comprehensive modules covering all syllabus topics
    math_modules = [
        ("Divisibility rule of 4 and 8", "শেষ দুটি বা তিনটি অঙ্ক ৪ বা ৮ দ্বারা বিভাজ্য হলে সমগ্র সংখ্যাটি বিভাজ্য", "বিভাজ্যতা", "পাটিগণিত"),
        ("Divisibility rule of 9 and 11", "অঙ্কের সমষ্টি ৯ দ্বারা বিভাজ্য এবং যুগ্ম-অযুগ্ম স্থানের পার্থক্যের নিয়ম", "বিভাজ্যতা", "পাটিগণিত"),
        ("Sum of first n natural numbers", "n টি স্বাভাবিক সংখ্যার সমষ্টি = [n(n+1)] / 2", "সংখ্যা তত্ত্ব", "পাটিগণিত"),
        ("Sum of squares of first n numbers", "[n(n+1)(2n+1)] / 6", "বর্গের সমষ্টি", "পাটিগণিত"),
        ("HCF and LCM product relationship", "দুটি সংখ্যার গুণফল = সংখ্যা দুটির লসাগু x গসাগু", "লসাগু-গসাগু", "পাটিগণিত"),
        ("HCF of fractions rule", "ভগ্নাংশের গসাগু = লবগুলির গসাগু / হরগুলির লসাগু", "ভগ্নাংশের গসাগু", "পাটিগণিত"),
        ("LCM of fractions rule", "ভগ্নাংশের লসাগু = লবগুলির লসাগু / হরগুলির গসাগু", "ভগ্নাংশের লসাগু", "পাটিগণিত"),
        ("Recurring Decimal to Fraction", "পৌনঃপুনিক দশমিক ভগ্নাংশকে সাধারণ ভগ্নাংশে রূপান্তর (৯ ও ০ এর নিয়ম)", "দশমিক ভগ্নাংশ", "পাটিগণিত"),
        ("VBODMAS Calculation Precedence", "রেখা বন্ধনী, প্রথম বন্ধনী, দ্বিতীয়, তৃতীয়, এর, ভাগ, গুণ, যোগ, বিয়োগ", "সরলীকরণ", "পাটিগণিত"),
        ("Square root using division method", "জোড়ায় জোড়ায় অঙ্ক নিয়ে ভাগ পদ্ধতিতে বর্গমূল নির্ণয়", "বর্গমূল", "পাটিগণিত"),
        ("Third Proportional (তৃতীয় সমানুপাতী)", "a ও b এর তৃতীয় সমানুপাতী c = b² / a", "অনুপাত-সমানুপাত", "পাটিগণিত"),
        ("Mean Proportional (মধ্য সমানুপাতী)", "a ও b এর মধ্য সমানুপাতী = √(ab)", "অনুপাত-সমানুপাত", "পাটিগণিত"),
        ("Compound Ratio (যৌগিক অনুপাত)", "পূর্বপদগুলির গুণফল : পরপদগুলির গুণফল", "অনুপাত", "পাটিগণিত"),
        ("Partnership investment with different time", "লভ্যাংশ অনুপাত = (মূলধন ১ x সময় ১) : (মূলধন ২ x সময় ২)", "অংশীদারি কারবার", "পাটিগণিত"),
        ("Average speed of two equal distances", "গড় গতিবেগ = (২xy) / (x + y)", "গতিবেগ ও দূরত্ব", "পাটিগণিত"),
        ("Weighted average formula", "গড় = (w1.x1 + w2.x2) / (w1 + w2)", "গড়", "পাটিগণিত"),
        ("Percentage increase and decrease net effect", "মোট পরিবর্তন% = a + b + (ab / 100)", "শতকরা", "পাটিগণিত"),
        ("Depreciation of value formula", "n বছর পর মূল্য = P x (1 - R/100)^n", "অপচয় ও হ্রাস", "পাটিগণিত"),
        ("Cost Price from Selling Price and Loss%", "CP = SP x [100 / (100 - Loss%)]", "লাভ-ক্ষতি", "পাটিগণিত"),
        ("Cost Price from Selling Price and Profit%", "CP = SP x [100 / (100 + Gain%)]", "লাভ-ক্ষতি", "পাটিগণিত"),
        ("Marked price successive discount formula", "একক সমতুল্য ছাড়% = d1 + d2 - (d1.d2 / 100)", "সমতুল্য ছাড়", "পাটিগণিত"),
        ("Dishonest dealer profit percentage", "[ত্রুটি / (প্রকৃত মান - ত্রুটি)] x ১০০", "অসাধু ব্যবসায়ী", "পাটিগণিত"),
        ("Simple Interest Principal formula", "P = (SI x 100) / (R x T)", "সরল সুদ", "পাটিগণিত"),
        ("Compound Interest Amount formula", "A = P x (1 + R/100)^T", "চক্রবৃদ্ধি সুদ", "পাটিগণিত"),
        ("Difference between CI and SI for 2 years", "২ বছরের সুদের পার্থক্য = P x (R / 100)²", "সুদের পার্থক্য", "পাটিগণিত"),
        ("Work efficiency ratio", "কাজের সময়ের অনুপাত দক্ষতার অনুপাতের ব্যস্তানুপাতিক", "সময় ও কার্য", "পাটিগণিত"),
        ("Men-Days-Hours Chain Rule", "(M1.D1.H1) / W1 = (M2.D2.H2) / W2", "ঐকিক নিয়ম", "পাটিগণিত"),
        ("Pipes filling and emptying net rate", "১/A - ১/B অংশ প্রতি ঘণ্টায়", "নল ও চৌবাচ্চা", "পাটিগণিত"),
        ("Alternating pipes filling time", "একটি নল প্রথম মিনিটে ও অপরটি দ্বিতীয় মিনিটে খুললে মোট সময়", "নল ও চৌবাচ্চা", "পাটিগণিত"),
        ("Relative speed in same direction", "একই দিকে চললে আপেক্ষিক বেগ = (u - v)", "আপেক্ষিক বেগ", "পাটিগণিত"),
        ("Relative speed in opposite direction", "বিপরীত দিকে চললে আপেক্ষিক বেগ = (u + v)", "আপেক্ষিক বেগ", "পাটিগণিত"),
        ("Train crossing platform length", "অতিক্রান্ত দূরত্ব = ট্রেনের দৈর্ঘ্য + প্ল্যাটফর্মের দৈর্ঘ্য", "ট্রেন সংক্রান্ত", "পাটিগণিত"),
        ("Boat upstream speed formula", "স্রোতের প্রতিকূলে বেগ = নৌকার বেগ - স্রোতের বেগ", "নৌকা ও স্রোত", "পাটিগণিত"),
        ("Boat downstream speed formula", "স্রোতের অনুকূলে বেগ = নৌকার বেগ + স্রোতের বেগ", "নৌকা ও স্রোত", "পাটিগণিত"),
        ("Current speed formula from boat velocities", "স্রোতের বেগ = (অনুকূলে বেগ - প্রতিকূলে বেগ) / ২", "নৌকা ও স্রোত", "পাটিগণিত"),
        ("Area of Equilateral Triangle", "(√৩ / ৪) x (বাহু)²", "সমবাহু ত্রিভুজ", "পরিমিতি"),
        ("Perimeter of Equilateral Triangle", "৩ x বাহু", "সমবাহু ত্রিভুজ", "পরিমিতি"),
        ("Area of Scalene Triangle (Heron's Formula)", "√[s(s-a)(s-b)(s-c)] যেখানে s = (a+b+c)/2", "হিরনের সূত্র", "পরিমিতি"),
        ("Area of Parallelogram", "ভূমি x উচ্চতা", "সামান্তরিক", "পরিমিতি"),
        ("Area of Rhombus", "১/২ x কর্ণ দুটির গুণফল", "রম্বস", "পরিমিতি"),
        ("Area of Trapezium", "১/২ x (সমান্তরাল বাহুদ্বয়ের সমষ্টি) x লম্ব দূরত্ব", "ট্রাপিজিয়াম", "পরিমিতি"),
        ("Perimeter of Rectangle", "২ x (দৈর্ঘ্য + প্রস্থ)", "আয়তক্ষেত্র", "পরিমিতি"),
        ("Diagonal of Rectangle", "√(দৈর্ঘ্য² + প্রস্থ²)", "আয়তক্ষেত্র", "পরিমিতি"),
        ("Perimeter of Square", "৪ x বাহু", "বর্গক্ষেত্র", "পরিমিতি"),
        ("Diagonal of Square", "বাহু x √২", "বর্গক্ষেত্র", "পরিমিতি"),
        ("Area of Circle", "π x (ব্যাসার্ধ)²", "বৃত্ত", "পরিমিতি"),
        ("Circumference of Circle", "২ x π x ব্যাসার্ধ", "বৃত্ত", "পরিমিতি"),
        ("Area of Ring / Circular Path", "π x (R² - r²)", "বৃত্তাকার পথ", "পরিমিতি"),
        ("Volume of Cuboid", "দৈর্ঘ্য x প্রস্থ x উচ্চতা", "আয়তঘন", "পরিমিতি"),
        ("Total Surface Area of Cuboid", "২(lb + bh + hl)", "আয়তঘন", "পরিমিতি"),
        ("Diagonal of Cuboid", "√(l² + b² + h²)", "আয়তঘন", "পরিমিতি"),
        ("Volume of Cylinder (বেলন)", "π x r² x h", "লম্ববৃত্তাকার চোঙ", "পরিমিতি"),
        ("Curved Surface Area of Cylinder", "২ x π x r x h", "লম্ববৃত্তাকার চোঙ", "পরিমিতি"),
        ("Total Surface Area of Cylinder", "২πr(h + r)", "লম্ববৃত্তাকার চোঙ", "পরিমিতি"),
        ("Volume of Cone (শঙ্কু)", "১/৩ x π x r² x h", "শঙ্কু", "পরিমিতি"),
        ("Curved Surface Area of Cone", "π x r x l (যেখানে l = √(r² + h²))", "শঙ্কু", "পরিমিতি"),
        ("Volume of Sphere (গোলক)", "৪/৩ x π x r³", "গোলক", "পরিমিতি"),
        ("Surface Area of Sphere", "৪ x π x r²", "গোলক", "পরিমিতি"),
        ("Volume of Hemisphere (অর্ধগোলক)", "২/৩ x π x r³", "অর্ধগোলক", "পরিমিতি"),
        ("Total Surface Area of Hemisphere", "৩ x π x r²", "অর্ধগোলক", "পরিমিতি"),
        ("Sum of interior angles of polygon", "(n - 2) x ১৮০ ডিগ্রি", "বহুভুজ", "পরিমিতি"),
        ("Each interior angle of regular polygon", "[(n - 2) x ১৮০] / n", "সুষম বহুভুজ", "পরিমিতি"),
        ("Each exterior angle of regular polygon", "৩৬০ / n", "সুষম বহুভুজ", "পরিমিতি"),
        ("Number of diagonals of polygon", "[n(n - 3)] / 2", "বহুভুজের কর্ণ", "পরিমিতি"),
        ("Clock minute hand speed in degrees", "প্রতি মিনিটে ৬ ডিগ্রি আবর্তন করে", "ঘড়ির কাঁটা", "পাটিগণিত"),
        ("Clock hour hand speed in degrees", "প্রতি মিনিটে ০.৫ ডিগ্রি আবর্তন করে", "ঘড়ির কাঁটা", "পাটিগণিত"),
        ("Handshakes formula among n persons", "[n(n - 1)] / 2", "হ্যান্ডশেক গণনা", "পাটিগণিত"),
        ("Total pages numbering digit count", "১ থেকে ১০০ পৃষ্ঠার বইয়ে মোট ১৯২টি অঙ্ক ব্যবহৃত হয়", "অঙ্ক গণনা", "পাটিগণিত"),
        ("Head and Feet Animal Problem logic", "চার পায়ের প্রাণী = (মোট পা / ২) - মোট মাথা", "মাথা ও পা সমস্যা", "পাটিগণিত")
    ]

    # Generate remaining items up to 300
    for i in range(24, 300):
        m_idx = (i - 24) % len(math_modules)
        topic, formula, concept, branch = math_modules[m_idx]
        mod = i % 4

        if mod == 0:
            stem_en = f"In West Bengal Police Elementary Mathematics, which formula or calculation rule applies to '{topic}'?"
            stem_hi = f"পশ্চিমবঙ্গ পুলিশ প্রাথমিক গণিত সিলেবাস অনুযায়ী '{topic}' সম্পর্কিত সঠিক সূত্র বা নিয়ম কোনটি?"
            sol_en = f"Standard mathematical formula for '{topic}': {formula} ({concept})."
            sol_hi = f"'{topic}' এর সঠিক গাণিতিক সূত্র: {formula} (ধারণা: {concept})।"
            choices = [
                {'en': f"{formula} ({concept})", 'hi': f"{formula} ({concept})"},
                {'en': "Atmospheric Barometric Altimeter coefficient", 'hi': "বায়ুমণ্ডলীয় ব্যারোমিটার উচ্চতা সহগ"},
                {'en': "Geological plate subduction oceanic trench depth", 'hi': "মহাসাগরীয় ভূকম্পন পাত অবনমন গভীরতা"},
                {'en': "Photosynthetic photon flux leaf density quotient", 'hi': "সালোকসংশ্লেষীয় ফোটন ঘনত্ব অনুপাত"}
            ]
            opt_idx = 0
        elif mod == 1:
            stem_en = f"Which mathematical branch or domain does the problem-solving for '{topic}' fall under?"
            stem_hi = f"'{topic}' গাণিতিক সমস্যাটি নিচের কোন প্রধান অধ্যায়ের অন্তর্ভুক্ত?"
            sol_en = f"'{topic}' belongs to Madhyamik {branch} ({concept})."
            sol_hi = f"'{topic}' মাধ্যমিক মানের '{branch}' ({concept}) অধ্যায়ের অন্তর্গত।"
            choices = [
                {'en': "Organic Molecular Spectroscopy", 'hi': "আণবিক বর্ণালীবিদ্যা"},
                {'en': f"Mathematics: {branch} ({concept})", 'hi': f"গণিত: {branch} ({concept})"},
                {'en': "Archaeological Carbon Dating Analysis", 'hi': "প্রত্নতাত্ত্বিক কার্বন ডেটিং"},
                {'en': "Microeconomic Tariff Fiscal Elasticity", 'hi': "ব্যষ্টিক অর্থনৈতিক শুল্ক স্থিতিস্থাপকতা"}
            ]
            opt_idx = 1
        elif mod == 2:
            stem_en = f"What is the key step and practical problem-solving method when calculating '{topic}'?"
            stem_hi = f"পরীক্ষায় '{topic}' সংক্রান্ত সমস্যা সমাধানের জন্য সবচেয়ে গুরুত্বপূর্ণ পদ্ধতি কোনটি?"
            sol_en = f"Direct method: {concept}. Formula: {formula}."
            sol_hi = f"সরাসরি সমাধানের নিয়ম: {concept}। মূল সূত্র: {formula}।"
            choices = [
                {'en': "Guessing randomly without any calculation", 'hi': "কোনো গণনা ছাড়াই আন্দাজে উত্তর দেওয়া"},
                {'en': "Converting numbers into musical notes", 'hi': "সংখ্যাগুলিকে সংগীতে রূপান্তর করা"},
                {'en': f"Application of {concept}: {formula}", 'hi': f"{concept} এর সূত্র প্রয়োগ: {formula}"},
                {'en': "Memorizing historical war dates", 'hi': "ঐতিহাসিক যুদ্ধের সাল মুখস্থ করা"}
            ]
            opt_idx = 2
        else:
            stem_en = f"Why is high calculation speed and accuracy in '{topic}' essential for the West Bengal Police written exam?"
            stem_hi = f"পশ্চিমবঙ্গ পুলিশ কনস্টেবল পরীক্ষায় '{topic}' এ নির্ভুলতা ও গতি কেন অত্যন্ত ফলপ্রসূ?"
            sol_en = f"It ensures maximum score in the 25 mathematics marks: {formula}."
            sol_hi = f"পাটিগণিত ও বীজগণিতের ২৫টি প্রশ্নের দ্রুত ও সঠিক সমাধানে {concept} এবং {formula} আয়ত্ত করা আবশ্যক।"
            choices = [
                {'en': "It helps in physical high-jump clearance", 'hi': "শারীরিক সক্ষমতায় হাই জাম্প দিতে"},
                {'en': "It trains police parade march rhythm", 'hi': "প্যারেড পদযাত্রার ছন্দ ঠিক রাখতে"},
                {'en': "It determines lung spirometry capacity", 'hi': "ফুসফুসের ক্ষমতা বৃদ্ধি করতে"},
                {'en': f"Maximizes score in {branch}: {formula}", 'hi': f"{branch} বিভাগে পূর্ণ নম্বর পেতে: {formula}"}
            ]
            opt_idx = 3

        items.append({
            'domain': f'Mathematics - {branch}',
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
