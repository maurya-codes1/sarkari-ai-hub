"""
West Bengal Police Constable & Lady Constable Bundled Study Notes and Compilers
Generates 5 master bundled notes sampling 50% representative questions (within 40%-60% requirement)
across all subjects for West Bengal Police.
"""

import json
import os
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = os.path.dirname(__file__)
EXAM_VERSION_ID = 'ver-wb-police-2026'

with open(os.path.join(BASE_DIR, 'wb_police_bank.json'), 'r', encoding='utf-8') as f:
    all_qs = json.load(f)

def get_sample_qs(qs, subject_id, ratio=0.5):
    sub_qs = [q for q in qs if q['subject_id'] == subject_id]
    count = int(len(sub_qs) * ratio)
    return sub_qs[:count]

# 50% sampling from each of the 4 subjects (150 Qs each)
ga_sample = get_sample_qs(all_qs, 'wb-police-general-awareness', 0.50)
eng_sample = get_sample_qs(all_qs, 'wb-police-english', 0.50)
mth_sample = get_sample_qs(all_qs, 'wb-police-elementary-mathematics', 0.50)
rs_sample = get_sample_qs(all_qs, 'wb-police-reasoning', 0.50)

grand_bundle = ga_sample + eng_sample + mth_sample + rs_sample

print(f"Sampled Grand West Bengal Police Bundle: {len(grand_bundle)} questions (GA:{len(ga_sample)}, ENG:{len(eng_sample)}, MTH:{len(mth_sample)}, RS:{len(rs_sample)})")

def build_q_summary_markdown(sampled_questions, max_display=12):
    md = ""
    for idx, q in enumerate(sampled_questions[:max_display], 1):
        parsed = json.loads(q['language_content'])
        en_stem = parsed['en']['stem']
        hi_stem = parsed['hi']['stem']
        ans = q['correct_answer']
        md += f"\n**Q{idx} [{q['subject_id']} | ID: {q['question_id']}]**\n- (EN): {en_stem}\n- (HI/BN): {hi_stem}\n- *Correct Answer*: **{ans}** | *Marks*: {q['marks']}\n"
    if len(sampled_questions) > max_display:
        md += f"\n*... [Plus {len(sampled_questions) - max_display} additional verified official questions sampled in this comprehensive repository]*\n"
    return md

notes = [
    {
        'note_id': 'note-wb-police-grand-blueprint',
        'exam_version_id': EXAM_VERSION_ID,
        'subject_id': 'wb-police-general-awareness',
        'language_id': 'hi',
        'note_type': 'ALL_SUBJECTS_SUPER_BUNDLE',
        'title': 'West Bengal Police Constable & Lady Constable Comprehensive Examination Blueprint & All-Subject Master Guide (পশ্চিমবঙ্গ পুলিশ কনস্টেবল সর্বাত্মক নির্দেশিকা)',
        'summary': f'Comprehensive examination master repository containing {len(grand_bundle)} sampled questions across all 4 subjects (General Awareness & WB Special, English, Elementary Mathematics, Reasoning) representing official WBPRB Single Written Exam standards.',
        'content': f"""# West Bengal Police Constable & Lady Constable Comprehensive Examination Blueprint & All-Subject Master Guide

## 1. Conducting Authority & Examination Scheme
- **Conducting Agency**: West Bengal Police Recruitment Board (WBPRB), Araksha Bhawan, Salt Lake, Kolkata.
- **Official Portals**: prb.wb.gov.in & wbpolice.gov.in
- **Test Format**: Single Written Examination (85 Objective MCQs / 85 Marks) + 15 Marks Interview = 100 Marks.
- **Duration**: 60 Minutes (1.0 Hour).
- **Marking Scheme**: **1.0 Mark** per correct answer, **-0.25 Mark** deduction (1/4th negative marking) per incorrect answer.
- **Physical Standards (PMT/PET)**:
  - Male: Height 167 cm, Chest 78-83 cm | 1,600m Run in 6 minutes 30 seconds.
  - Female: Height 160 cm | 800m Run in 4 minutes.
  - Third Gender / Transgender: 800m Run in 3 minutes 30 seconds.

## 2. Official Subject Sections & Marks Distribution
1. **General Awareness & General Knowledge**: 25 Questions = 25 Marks
2. **English Language & Grammar**: 10 Questions = 10 Marks
3. **Elementary Mathematics (Madhyamik Standard)**: 25 Questions = 25 Marks
4. **Reasoning and Logical Analysis**: 25 Questions = 25 Marks

## 3. All-Subject Master Bundle Sampling (50% Uniform Representation)
This bundled revision dossier contains exactly **{len(grand_bundle)} representative questions** sampled directly from the official WB Police question bank across all 4 subjects:
- **General Awareness, GK & West Bengal Special**: {len(ga_sample)} Questions
- **English Language & Grammar**: {len(eng_sample)} Questions
- **Elementary Mathematics (Madhyamik Standard)**: {len(mth_sample)} Questions
- **Reasoning and Logical Analysis**: {len(rs_sample)} Questions

## 4. Key Representative Questions Excerpt
{build_q_summary_markdown(grand_bundle, 16)}

## 5. Strategic Preparation Advice for WBP Constable Aspirants
- Time management is critical: 85 questions in 60 minutes allows approx 42 seconds per question.
- Avoid blind guessing due to negative marking (-0.25 penalty).
- General Awareness and English questions can be solved rapidly in 15-20 seconds each, reserving time for calculations.
- Regular practice on West Bengal geography (Sandakphu, Sundarbans, Rivers, Districts) and state welfare schemes (Kanyashree, Lakshmir Bhandar, Sabooj Sathi).
"""
    },
    {
        'note_id': 'note-wb-police-general-awareness',
        'exam_version_id': EXAM_VERSION_ID,
        'subject_id': 'wb-police-general-awareness',
        'language_id': 'hi',
        'note_type': 'SUBJECT_MASTER_BUNDLE',
        'title': 'West Bengal Police General Awareness, State GK, Freedom Struggle & Administration Compendium (সাধারণ জ্ঞান ও পশ্চিমবঙ্গ বিশেষ সংকলন)',
        'summary': f'In-depth study notes covering Bengal Renaissance, revolutionary freedom fighters (Khudiram, Masterda Surya Sen, Matangini Hazra), West Bengal geography, national parks, Calcutta High Court, police hierarchy and welfare schemes with {len(ga_sample)} sampled practice questions.',
        'content': f"""# General Awareness, General Knowledge & West Bengal Special - Comprehensive Study Compendium

## 1. Key Landmarks in Bengal History & Geography
- **বাংলার নবজাগরণ ও সমাজসংস্কার**:
  - রাজা রামমোহন রায়: ১৮২৮ সালে ব্রাহ্মসমাজ প্রতিষ্ঠা, ১৮২৯ সালে সতীদাহ প্রথা বিলোপ।
  - ঈশ্বরচন্দ্র বিদ্যাসাগর: ১৮৫৬ সালে বিধবা পুনর্বিবাহ আইন প্রণয়ন, বর্ণপরিচয় রচনা।
  - স্বামী বিবেকানন্দ: ১৮৯৩ সালে শিকাগো বিশ্ব ধর্মসম্মেলন, রামকৃষ্ণ মিশন ও বেলুর মঠ প্রতিষ্ঠা।
  - রবীন্দ্রনাথ ঠাকুর: ১৯১৩ সালে 'গীতাঞ্জলি' অনুবাদের জন্য প্রথম এশীয় হিসেবে সাহিত্যে নোবেল পুরস্কার।
- **স্বাধীনতা সংগ্রামে বাংলার বিপ্লবীরা**:
  - ক্ষুদিরাম বসু: মুজাফফরপুর মামলায় ১৯০৮ সালের ১১ আগস্ট মাত্র ১৮ বছর বয়সে ফাঁসির মঞ্চে শহীদ।
  - মাস্টারদা সূর্য সেন: ১৯৩০ সালের ১৮ এপ্রিল ঐতিহাসিক চট্টগ্রাম অস্ত্রাগার লুণ্ঠন পরিচালনা করেন।
  - মাতঙ্গিনী হাজরা: ১৯৪২ সালের ভারত ছাড়ো আন্দোলনে তমলুকে পুলিশের গুলিতে শহীদ (গান্ধীবুড়ি)।
  - নেতাজী সুভাষচন্দ্র বসু: ১৯৩৯ সালে ফরওয়ার্ড ব্লক ও আজাদ হিন্দ ফৌজ (INA) গঠন।
- **পশ্চিমবঙ্গের ভূগোল ও প্রাকৃতিক বৈশিষ্ট্য**:
  - সর্বোচ্চ পর্বতশৃঙ্গ: সান্দাকফু (৩,৬৩৬ মিটার, দার্জিলিং জেলা, সিঙ্গালীলা শৈলশিরা)।
  - সুন্দরবন জাতীয় উদ্যান: ১৯৮৭ সালে ইউনেস্কো বিশ্ব ঐতিহ্যবাহী ম্যানগ্রোভ ও রয়্যাল বেঙ্গল টাইগার সংরক্ষণাগার।
  - জলদাপাড়া জাতীয় উদ্যান: তোর্ষা নদীর তীরে দ্বিতীয় বৃহত্তম একশৃঙ্গ গণ্ডার সংরক্ষণাগার।
  - প্রধান নদী: গঙ্গা / ভাগীরথী-হুগলী, দামোদর (পূর্বে 'বাংলার দুঃখ'), তিস্তা (উত্তরবঙ্গের জীবনরেখা)।
  - ২৩টি জেলা ও ৫টি প্রশাসনিক বিভাগ (জলপাইগুড়ি, মালদা, বর্ধমান, প্রেসিডেন্সি, মেদিনীপুর)।
- **পশ্চিমবঙ্গ পুলিশ প্রশাসন ও আইন**:
  - নিয়োগ বোর্ড: WBPRB, আরক্ষা ভবন, সল্টলেক, সেক্টর-২, কলকাতা।
  - কলকাতা পুলিশ সদর দফতর: লালবাজার।
  - মোটর ভেহিকলস আইন ১৯৮৮: ধারা ১২৯ (হেলমেট সक्ती), ধারা ১৮৫ (মদ্যপান করে গাড়ি চালানো দণ্ডনীয়)।
  - জরুরি হেল্পলাইন: ডায়াল ১১২ (একক পুলিশ-দমকল-অ্যাম্বুলেন্স পরিষেবা)।

## 2. Sampled Practice Question Bank ({len(ga_sample)} Questions - 50% Sampling)
{build_q_summary_markdown(ga_sample, 14)}
"""
    },
    {
        'note_id': 'note-wb-police-english',
        'exam_version_id': EXAM_VERSION_ID,
        'subject_id': 'wb-police-english',
        'language_id': 'hi',
        'note_type': 'SUBJECT_MASTER_BUNDLE',
        'title': 'West Bengal Police English Language, Grammar & Vocabulary Master Guide (ইংরেজি ব্যাকরণ ও শব্দভাণ্ডার)',
        'summary': f'Comprehensive study guide covering parts of speech, subject-verb agreement, tenses, prepositions, phrasal verbs, voice change, narration, error spotting, synonyms, antonyms and idioms with {len(eng_sample)} practice questions.',
        'content': f"""# English Language, Grammar & Vocabulary - Master Revision Guide

## 1. Core Grammar Rules & Vocabulary Formulas
- **Subject-Verb Agreement**:
  - 'Neither... nor...' and 'Either... or...': verb agrees with the nearer subject ('Neither the teacher nor the students were present').
  - 'As well as / together with': verb agrees with the first subject ('The captain as well as players was present').
- **Prepositions & Phrasal Verbs**:
  - Suffer from, Prevent from + gerund, Congratulate on, Abstain from, Senior to (not than).
  - Phrasal verbs: Call off (cancel), Look after (care for), Put up with (tolerate), Break out (erupt suddenly).
- **Voice Change**:
  - Active: Subject + V2 + Object -> Passive: Object + was/were + V3 + by + Subject.
  - Imperative: 'Do the work' -> 'Let the work be done'.
- **Direct & Indirect Speech**:
  - Wh-questions: 'Where do you live?' -> asked where he lived.
  - Universal truths: Tense remains unchanged in reported clause.
- **Idioms & Phrases**:
  - 'Once in a blue moon': very rarely.
  - 'Bite the bullet': face inevitable hardship bravely.
  - 'Burn the midnight oil': study or work late into the night.
- **Spelling Accuracy**:
  - Accommodate (double c, double m), Maintenance (m-a-i-n-t-e-n-a-n-c-e), Privilege (no d), Separate (a in middle), Queue.

## 2. Sampled Practice Question Bank ({len(eng_sample)} Questions - 50% Sampling)
{build_q_summary_markdown(eng_sample, 14)}
"""
    },
    {
        'note_id': 'note-wb-police-elementary-mathematics',
        'exam_version_id': EXAM_VERSION_ID,
        'subject_id': 'wb-police-elementary-mathematics',
        'language_id': 'hi',
        'note_type': 'SUBJECT_MASTER_BUNDLE',
        'title': 'West Bengal Police Elementary Mathematics Complete Formula Sheet & Practice Guide (প্রাথমিক গণিত সূত্রসংগ্রহ ও সমাধান)',
        'summary': f'Complete quantitative aptitude compendium covering number system, divisibility, HCF-LCM, average, ratio, percentage, profit-loss, interest, time-work, speed-distance, trains and mensuration with {len(mth_sample)} practice questions.',
        'content': f"""# Elementary Mathematics (Madhyamik Standard) - Complete Formula Compendium

## 1. Essential Formulas & Shortcut Techniques
- **সংখ্যা ও বিভাজ্যতা**: ৫০ থেকে ১০০ এর মধ্যে ১০টি মৌলিক সংখ্যা। n টি স্বাভাবিক সংখ্যার সমষ্টি = [n(n+1)]/2.
- **গসাগু ও লসাগু**: দুটি সংখ্যার গুণফল = গসাগু x লসাগু। ভগ্নাংশের গসাগু = লবগুলির গসাগু / হরগুলির লসাগু।
- **অনুপাত ও অংশীদারি**: মধ্য সমানুপাতী = √(ab)। মূলধন অনুপাত = (মূলধন ১ x সময় ১) : (মূলধন ২ x সময় ২)।
- **শতকরা ও লাভ-ক্ষতি**:
  - চিনির মূল্য বৃদ্ধি r% হলে ব্যবহার হ্রাস = [r / (100 + r)] x ১০০%.
  - ক্রয়মূল্য = বিক্রয়মূল্য x [100 / (100 + লাভ%)]। সমতুল্য ছাড় = d1 + d2 - (d1.d2 / 100)।
- **সরল সুদ ও চক্রবৃদ্ধি সুদ**:
  - সরল সুদ SI = (P x R x T) / 100.
  - ২ বছরের চক্রবৃদ্ধি ও সরল সুদের পার্থক্য = P x (R / 100)².
- **সময়, কার্য ও নল**: A x দিনে, B y দিনে => একত্রে = (xy) / (x + y) দিনে। ঐকিক নিয়ম: M1.D1.H1/W1 = M2.D2.H2/W2.
- **গতিবেগ ও ট্রেনের সমস্যা**: কিমি/ঘণ্টা থেকে মি/সেকেন্ডে রূপান্তর = ৫/১৮ দিয়ে গুণ। স্থির জলে নৌকার বেগ = (অনুকূলে বেগ + প্রতিকূলে বেগ) / ২।
- **পরিমিতি**:
  - আয়তক্ষেত্রের ক্ষেত্রফল = দৈর্ঘ্য x প্রস্থ; সমবাহু ত্রিভুজ = (√৩ / ৪) x বাহু²।
  - বৃত্তের পরিধি = ২πr; বৃত্তের ক্ষেত্রফল = πr²। চোঙের আয়তন = πr²h।

## 2. Sampled Practice Question Bank ({len(mth_sample)} Questions - 50% Sampling)
{build_q_summary_markdown(mth_sample, 14)}
"""
    },
    {
        'note_id': 'note-wb-police-reasoning',
        'exam_version_id': EXAM_VERSION_ID,
        'subject_id': 'wb-police-reasoning',
        'language_id': 'hi',
        'note_type': 'SUBJECT_MASTER_BUNDLE',
        'title': 'West Bengal Police Reasoning & Logical Analysis Strategic Master Guide (যুক্তি ও বিশ্লেষণমূলক ক্ষমতা নির্দেশিকা)',
        'summary': f'Strategic intellectual reasoning guide covering series, analogies, classification, coding-decoding, direction test, blood relations, clock-calendar, ranking, seating, syllogism and non-verbal reasoning with {len(rs_sample)} practice questions.',
        'content': f"""# Reasoning and Logical Analysis - Strategic Master Guide

## 1. Key Reasoning Concepts & Deduction Shortcuts
- **সংখ্যা ও বর্ণ শ্রেণী**: পার্থক্যের নিয়ম, বর্গ-ঘন প্যাটার্ন (n³ + 1), বিপরীত বর্ণ জোড়া (A-Z, B-Y, সমষ্টি ২৭)।
- **সাংকেতিক ভাষা (Coding)**: অক্ষরের মান (+1, +2, +3), বিপরীত বর্ণ কোড, বার্তা ডিকোডিং।
- **দিকনির্ণয় ও দূরত্ব পরীক্ষা**:
  - পিথাগোরাসের উপপাদ্য: অতিভুজ² = ভূমি² + লম্ব²।
  - সকালের ছায়া পশ্চিমে এবং বিকালের ছায়া পূর্বে পতিত হয়।
- **রক্তের সম্পর্ক**: পারিবারিক সম্পর্কের চিত্রণ (Family Tree); নির্দেশমূলক বাক্যে নিজেকে স্থাপন করে সমাধান।
- **ঘড়ি ও ক্যালেন্ডার**:
  - ঘড়ির কাঁটা দুটির কোণ = |৩০ x ঘণ্টা - ৫.৫ x মিনিট|।
  - ২৪ ঘণ্টায় ঘড়ির কাঁটা দুটি ২২ বার মিলিত হয় এবং ৪৪ বার সমকোণে থাকে।
  - লিপ ইয়ার বছরে বছরের শেষ দিনটি প্রথম দিনের থেকে ১ দিন এগিয়ে যায়।
- **ক্রমবিন্যাস ও আসন ব্যবস্থা**: মোট ব্যক্তি = বামদিকের স্থান + ডানদিকের স্থান - ১। কেন্দ্রের দিকে মুখ করলে ঘড়ির কাঁটার দিকে বামদিক।
- **অ-মৌখিক যুক্তি (Non-Verbal)**:
  - উল্লম্ব আরশিতে বাম ও ডান অংশের অদলবদল (Lateral Inversion); M, A, H, T এর আরশি প্রতিবিম্ব অপরিবর্তিত থাকে।
  - জলের প্রতিবিম্বে উপর ও নিচ অংশের পরিবর্তন হয়; C, D, E অপরিবর্তিত থাকে।
  - ছক্কার বিপরীত তল: আদর্শ ছক্কায় বিপরীত তলের সমষ্টি সর্বদা ৭।

## 2. Sampled Practice Question Bank ({len(rs_sample)} Questions - 50% Sampling)
{build_q_summary_markdown(rs_sample, 14)}
"""
    }
]

out_notes_file = os.path.join(BASE_DIR, 'wb_police_bundled_notes.json')
with open(out_notes_file, 'w', encoding='utf-8') as f:
    json.dump(notes, f, ensure_ascii=False, indent=2)

print(f"✅ Generated {len(notes)} master bundled study notes for West Bengal Police at {out_notes_file}")
