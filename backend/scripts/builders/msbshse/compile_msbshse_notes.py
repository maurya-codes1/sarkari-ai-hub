import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

print("Compiling MSBSHSE All-Subject Notes & Stream-Wise Revision Bundles...")

base_dir = os.path.dirname(__file__)

with open(os.path.join(base_dir, "msbshse_c10_bank.json"), "r", encoding="utf-8") as f:
    c10_questions = json.load(f)

with open(os.path.join(base_dir, "msbshse_c12_science_bank.json"), "r", encoding="utf-8") as f:
    c12_sci_questions = json.load(f)

with open(os.path.join(base_dir, "msbshse_c12_commerce_bank.json"), "r", encoding="utf-8") as f:
    c12_com_questions = json.load(f)

with open(os.path.join(base_dir, "msbshse_c12_arts_bank.json"), "r", encoding="utf-8") as f:
    c12_arts_questions = json.load(f)

with open(os.path.join(base_dir, "msbshse_c12_vocational_bank.json"), "r", encoding="utf-8") as f:
    c12_voc_questions = json.load(f)

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
arts_obj, arts_sub = extract_bundle_data(c12_arts_questions, mcqs_per_subj=102, subs_per_subj=37)
voc_obj, voc_sub = extract_bundle_data(c12_voc_questions, mcqs_per_subj=102, subs_per_subj=37)

bundled_notes = [
    {
        "note_id": "note-msbshse-c10-all-subject",
        "subject_id": "msbshse-marathi-10",
        "title": "MSBSHSE Class 10 SSC All-Subject Master Revision Compendium (2026-27)",
        "summary": "Forensic, syllabus-verified all-subject revision vault covering Marathi, Hindi, English, Mathematics (Algebra & Geometry), Science & Technology (Parts 1 & 2), Social Sciences, Sanskrit, Urdu, Gujarati, Kannada with Balbharati question patterns, high-yield MCQs, and structured 3x subjective model solutions.",
        "objectives": c10_obj,
        "subjectives": c10_sub,
        "mcqs_count": len(c10_obj),
        "subs_count": len(c10_sub)
    },
    {
        "note_id": "note-msbshse-c12-science-all",
        "subject_id": "msbshse-physics-12",
        "title": "MSBSHSE Class 12 HSC Science Stream Master Revision Vault (2026-27)",
        "summary": "Comprehensive Class 12 HSC Science vault covering Physics, Chemistry, Biology, Mathematics & Statistics, Computer Science/IT, and Compulsory Languages with formulas, numericals, derivations, and Prashnpedhi model answers.",
        "objectives": sci_obj,
        "subjectives": sci_sub,
        "mcqs_count": len(sci_obj),
        "subs_count": len(sci_sub)
    },
    {
        "note_id": "note-msbshse-c12-commerce-all",
        "subject_id": "msbshse-bk-accounts-12",
        "title": "MSBSHSE Class 12 HSC Commerce Stream Master Revision Vault (2026-27)",
        "summary": "Class 12 HSC Commerce revision vault encompassing Book-Keeping & Accountancy, Organisation of Commerce & Management, Economics, Secretarial Practice, Mathematics & Statistics, and Compulsory English with balance sheets, journal entries, and case questions.",
        "objectives": com_obj,
        "subjectives": com_sub,
        "mcqs_count": len(com_obj),
        "subs_count": len(com_sub)
    },
    {
        "note_id": "note-msbshse-c12-humanities-all",
        "subject_id": "msbshse-history-12",
        "title": "MSBSHSE Class 12 HSC Arts / Humanities Stream Master Revision Vault (2026-27)",
        "summary": "Class 12 HSC Humanities comprehensive vault covering History, Geography, Political Science, Sociology, Psychology, Economics, and Philosophy & Logic with analytical frameworks, maps, and model answers.",
        "objectives": arts_obj,
        "subjectives": arts_sub,
        "mcqs_count": len(arts_obj),
        "subs_count": len(arts_sub)
    },
    {
        "note_id": "note-msbshse-c12-vocational-all",
        "subject_id": "msbshse-vocational-12",
        "title": "MSBSHSE Class 12 HSC Bifocal Vocational Stream Master Revision Vault (2026-27)",
        "summary": "Class 12 HSC Bifocal Vocational revision vault covering Electrical & Electronics Maintenance, Mechanical Maintenance, Computer Hardware & Networking, Automobile Technology, Industrial Safety, and Workshop Practice.",
        "objectives": voc_obj,
        "subjectives": voc_sub,
        "mcqs_count": len(voc_obj),
        "subs_count": len(voc_sub)
    }
]

for n in bundled_notes:
    print(f"{n['title']}: {n['mcqs_count']} MCQs, {n['subs_count']} Subjectives")

out_file = os.path.join(base_dir, "msbshse_bundled_notes.json")
with open(out_file, "w", encoding="utf-8") as f:
    json.dump(bundled_notes, f, ensure_ascii=False, indent=2)

print(f"✅ Successfully compiled {len(bundled_notes)} MSBSHSE study notes into {out_file}")
