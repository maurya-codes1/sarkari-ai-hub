import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

print("Compiling West Bengal All-Subject Notes & Stream-Wise Revision Bundles...")

base_dir = os.path.dirname(__file__)

with open(os.path.join(base_dir, "wbbse_c10_bank.json"), "r", encoding="utf-8") as f:
    c10_questions = json.load(f)

with open(os.path.join(base_dir, "wbchse_c12_science_bank.json"), "r", encoding="utf-8") as f:
    c12_sci_questions = json.load(f)

with open(os.path.join(base_dir, "wbchse_c12_commerce_bank.json"), "r", encoding="utf-8") as f:
    c12_com_questions = json.load(f)

with open(os.path.join(base_dir, "wbchse_c12_humanities_bank.json"), "r", encoding="utf-8") as f:
    c12_hum_questions = json.load(f)

with open(os.path.join(base_dir, "wbchse_c12_languages_bank.json"), "r", encoding="utf-8") as f:
    c12_lang_questions = json.load(f)

def extract_bundle_data(q_list, mcqs_per_subj=102, subs_per_subj=37):
    by_subj = {}
    for q in q_list:
        sid = q["subject_id"]
        if sid not in by_subj:
            by_subj[sid] = {"mcqs": [], "subs": []}
        if q["question_type_id"] == "single_mcq":
            by_subj[sid]["mcqs"].append(q)
        else:
            by_subj[sid]["subs"].append(q)
            
    curated_mcqs = []
    curated_subs = []
    
    for sid, items in by_subj.items():
        curated_mcqs.extend(items["mcqs"][:mcqs_per_subj])
        curated_subs.extend(items["subs"][:subs_per_subj])
        
    obj_clean = [
        {
            "id": q["question_id"],
            "subject": q["subject_id"],
            "content": json.loads(q["language_content"]),
            "ans": q["correct_answer"],
            "marks": q["marks"]
        }
        for q in curated_mcqs
    ]
    
    sub_clean = [
        {
            "id": q["question_id"],
            "subject": q["subject_id"],
            "type": q["question_type_id"],
            "content": json.loads(q["language_content"]),
            "model_answer": q["correct_answer"],
            "marks": q["marks"]
        }
        for q in curated_subs
    ]
    
    return obj_clean, sub_clean

c10_obj, c10_sub = extract_bundle_data(c10_questions, mcqs_per_subj=102, subs_per_subj=37)
sci_obj, sci_sub = extract_bundle_data(c12_sci_questions, mcqs_per_subj=102, subs_per_subj=37)
com_obj, com_sub = extract_bundle_data(c12_com_questions, mcqs_per_subj=102, subs_per_subj=37)
hum_obj, hum_sub = extract_bundle_data(c12_hum_questions, mcqs_per_subj=102, subs_per_subj=37)
lang_obj, lang_sub = extract_bundle_data(c12_lang_questions, mcqs_per_subj=102, subs_per_subj=37)

bundled_notes = [
    {
        "note_id": "note-wbbse-c10-all-subject",
        "subject_id": "wbbse-bengali-fl-10",
        "title": "WBBSE Class 10 Madhyamik All-Subject High-Yield Master Revision Compendium (2026-27)",
        "summary": "Forensic, syllabus-verified all-subject revision vault covering Bengali FL, English SL, Hindi FL, Urdu FL, Mathematics, Physical Science, Life Science, History, Geography, and Computer Application aligned with WBBSE Madhyamik blueprints, high-yield MCQs, and structured 3x subjective model solutions.",
        "objectives": c10_obj,
        "subjectives": c10_sub,
        "mcqs_count": len(c10_obj),
        "subs_count": len(c10_sub)
    },
    {
        "note_id": "note-wbchse-c12-science-all",
        "subject_id": "wbchse-physics-12",
        "title": "WBCHSE Class 12 Higher Secondary Science Stream Master Revision Vault (2026-27)",
        "summary": "Comprehensive Class 12 Higher Secondary Science vault covering Physics, Chemistry, Mathematics, Biological Science, Computer Science, and Statistics with formulas, derivations, numerical methods, and Council marking rubrics.",
        "objectives": sci_obj,
        "subjectives": sci_sub,
        "mcqs_count": len(sci_obj),
        "subs_count": len(sci_sub)
    },
    {
        "note_id": "note-wbchse-c12-commerce-all",
        "subject_id": "wbchse-accountancy-12",
        "title": "WBCHSE Class 12 Higher Secondary Commerce Stream Master Revision Vault (2026-27)",
        "summary": "Class 12 Higher Secondary Commerce revision vault encompassing Accountancy, Business Studies, Commercial Law & Auditing (CLPA), Costing & Taxation, and Economics with balance sheets, company accounting, statutory provisions, and cost sheets.",
        "objectives": com_obj,
        "subjectives": com_sub,
        "mcqs_count": len(com_obj),
        "subs_count": len(com_sub)
    },
    {
        "note_id": "note-wbchse-c12-humanities-all",
        "subject_id": "wbchse-history-12",
        "title": "WBCHSE Class 12 Higher Secondary Humanities Stream Master Revision Vault (2026-27)",
        "summary": "Class 12 Higher Secondary Humanities revision vault containing History, Geography, Political Science, Philosophy, and Sociology with comprehensive historical chronologies, geographical processes, philosophical proofs, and sociological paradigms.",
        "objectives": hum_obj,
        "subjectives": hum_sub,
        "mcqs_count": len(hum_obj),
        "subs_count": len(hum_sub)
    },
    {
        "note_id": "note-wbchse-c12-languages-all",
        "subject_id": "wbchse-bengali-fl-12",
        "title": "WBCHSE Class 12 Higher Secondary Languages & Classical Literature Master Vault (2026-27)",
        "summary": "Class 12 Higher Secondary Languages revision compendium covering Bengali First Language, English Second Language, Hindi First Language, Urdu First Language, and Sanskrit Classical with detailed literary criticisms, textual extracts, and grammatical analyses.",
        "objectives": lang_obj,
        "subjectives": lang_sub,
        "mcqs_count": len(lang_obj),
        "subs_count": len(lang_sub)
    }
]

out_notes = os.path.join(base_dir, "wb_bundled_notes.json")
with open(out_notes, "w", encoding="utf-8") as f:
    json.dump(bundled_notes, f, ensure_ascii=False, indent=2)

print(f"✅ West Bengal Bundled Notes written to {out_notes}")
for bn in bundled_notes:
    print(f" - {bn['note_id']}: {bn['mcqs_count']} MCQs, {bn['subs_count']} Subjectives")
