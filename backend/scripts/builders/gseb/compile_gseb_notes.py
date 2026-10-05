import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

print("Compiling GSEB All-Subject Notes & Stream-Wise Revision Bundles...")

base_dir = os.path.dirname(__file__)

with open(os.path.join(base_dir, "gseb_c10_bank.json"), "r", encoding="utf-8") as f:
    c10_questions = json.load(f)

with open(os.path.join(base_dir, "gseb_c12_science_bank.json"), "r", encoding="utf-8") as f:
    c12_sci_questions = json.load(f)

with open(os.path.join(base_dir, "gseb_c12_commerce_bank.json"), "r", encoding="utf-8") as f:
    c12_com_questions = json.load(f)

with open(os.path.join(base_dir, "gseb_c12_arts_bank.json"), "r", encoding="utf-8") as f:
    c12_arts_questions = json.load(f)

with open(os.path.join(base_dir, "gseb_c12_vocational_bank.json"), "r", encoding="utf-8") as f:
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
        "note_id": "note-gseb-c10-all-subject",
        "subject_id": "gseb-gujarati-fl-10",
        "title": "GSEB Class 10 SSC All-Subject Master Revision Compendium (2026-27)",
        "summary": "Forensic, syllabus-verified all-subject revision vault covering Gujarati FL, Hindi SL, English, Mathematics Basic & Standard dual track, Science & Technology, Social Science, Sanskrit, Urdu, and Computer Studies with Gujarat State School Textbook Board (GSSTB) blueprints, high-yield MCQs, and structured 3x subjective model solutions.",
        "objectives": c10_obj,
        "subjectives": c10_sub,
        "mcqs_count": len(c10_obj),
        "subs_count": len(c10_sub)
    },
    {
        "note_id": "note-gseb-c12-science-all",
        "subject_id": "gseb-physics-12",
        "title": "GSEB Class 12 HSC Science Stream Master Revision Vault (2026-27)",
        "summary": "Comprehensive Class 12 HSC Science vault covering Physics, Chemistry, Biology, Mathematics, Computer Studies, and Compulsory Languages with formulas, numericals, derivations, and GSEB Prashna Bank model answers.",
        "objectives": sci_obj,
        "subjectives": sci_sub,
        "mcqs_count": len(sci_obj),
        "subs_count": len(sci_sub)
    },
    {
        "note_id": "note-gseb-c12-commerce-all",
        "subject_id": "gseb-elements-accounts-12",
        "title": "GSEB Class 12 HSC Commerce Stream Master Revision Vault (2026-27)",
        "summary": "Class 12 HSC Commerce revision vault encompassing Elements of Accountancy, Statistics, Economics, Business Administration, Secretarial Practice & CC, and Compulsory Languages with balance sheets, journal entries, statistical formulas, and case questions.",
        "objectives": com_obj,
        "subjectives": com_sub,
        "mcqs_count": len(com_obj),
        "subs_count": len(com_sub)
    },
    {
        "note_id": "note-gseb-c12-arts-all",
        "subject_id": "gseb-history-12",
        "title": "GSEB Class 12 HSC Arts / Humanities Stream Master Revision Vault (2026-27)",
        "summary": "Class 12 HSC Arts revision vault containing History, Geography, Political Science, Sociology, Psychology, and Philosophy & Logic with extensive historical timelines, geographical concepts, and philosophical proofs.",
        "objectives": arts_obj,
        "subjectives": arts_sub,
        "mcqs_count": len(arts_obj),
        "subs_count": len(arts_sub)
    },
    {
        "note_id": "note-gseb-c12-vocational-all",
        "subject_id": "gseb-vocational-12",
        "title": "GSEB Class 12 HSC Vocational Stream Master Revision Vault (2026-27)",
        "summary": "Class 12 HSC Vocational revision compendium covering Vocational & Technical Skills Foundation, Entrepreneurship, ICT, Green Skills, and Workplace Safety according to Gujarat Skill Development Mission standards.",
        "objectives": voc_obj,
        "subjectives": voc_sub,
        "mcqs_count": len(voc_obj),
        "subs_count": len(voc_sub)
    }
]

out_notes = os.path.join(base_dir, "gseb_bundled_notes.json")
with open(out_notes, "w", encoding="utf-8") as f:
    json.dump(bundled_notes, f, ensure_ascii=False, indent=2)

print(f"✅ GSEB Bundled Notes written to {out_notes}")
for bn in bundled_notes:
    print(f" - {bn['note_id']}: {bn['mcqs_count']} MCQs, {bn['subs_count']} Subjectives")
