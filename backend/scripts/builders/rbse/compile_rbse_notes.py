import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

print("Compiling RBSE All-Subject Notes & Stream-Wise Revision Bundles...")

base_dir = os.path.dirname(__file__)

with open(os.path.join(base_dir, "rbse_c10_bank.json"), "r", encoding="utf-8") as f:
    c10_questions = json.load(f)

with open(os.path.join(base_dir, "rbse_c12_science_bank.json"), "r", encoding="utf-8") as f:
    c12_sci_questions = json.load(f)

with open(os.path.join(base_dir, "rbse_c12_commerce_bank.json"), "r", encoding="utf-8") as f:
    c12_com_questions = json.load(f)

with open(os.path.join(base_dir, "rbse_c12_humanities_bank.json"), "r", encoding="utf-8") as f:
    c12_hum_questions = json.load(f)

with open(os.path.join(base_dir, "rbse_c12_agriculture_bank.json"), "r", encoding="utf-8") as f:
    c12_agri_questions = json.load(f)

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
agri_obj, agri_sub = extract_bundle_data(c12_agri_questions, mcqs_per_subj=102, subs_per_subj=37)

bundled_notes = [
    {
        "note_id": "note-rbse-c10-all-subject",
        "subject_id": "rbse-hindi-10",
        "title": "RBSE Class 10 Secondary All-Subject Master Revision Compendium (2026-27)",
        "summary": "Forensic, syllabus-verified all-subject revision vault covering Hindi, English, Science, Social Science, Mathematics, and Third Languages with high-yield MCQs and structured 3x subjective model solutions.",
        "objectives": c10_obj,
        "subjectives": c10_sub,
        "mcqs_count": len(c10_obj),
        "subs_count": len(c10_sub)
    },
    {
        "note_id": "note-rbse-c12-science-all",
        "subject_id": "rbse-physics-12",
        "title": "RBSE Class 12 Science Stream Master Revision Vault (2026-27)",
        "summary": "Comprehensive Class 12 Science vault covering Physics, Chemistry, Biology, Mathematics, CS, and Compulsory Languages with formulas, numericals, derivations, and model answers.",
        "objectives": sci_obj,
        "subjectives": sci_sub,
        "mcqs_count": len(sci_obj),
        "subs_count": len(sci_sub)
    },
    {
        "note_id": "note-rbse-c12-commerce-all",
        "subject_id": "rbse-accountancy-12",
        "title": "RBSE Class 12 Commerce Stream Master Revision Vault (2026-27)",
        "summary": "Class 12 Commerce revision vault encompassing Accountancy, Business Studies, Economics, Informatics Practices, and Compulsory Languages with balance sheets, journal entries, and case questions.",
        "objectives": com_obj,
        "subjectives": com_sub,
        "mcqs_count": len(com_obj),
        "subs_count": len(com_sub)
    },
    {
        "note_id": "note-rbse-c12-humanities-all",
        "subject_id": "rbse-history-12",
        "title": "RBSE Class 12 Humanities / Arts Stream Master Revision Vault (2026-27)",
        "summary": "Class 12 Humanities comprehensive vault covering History, Geography, Political Science, Economics, Sociology, Public Administration, and Home Science.",
        "objectives": hum_obj,
        "subjectives": hum_sub,
        "mcqs_count": len(hum_obj),
        "subs_count": len(hum_sub)
    },
    {
        "note_id": "note-rbse-c12-agriculture-all",
        "subject_id": "rbse-agriculture-12",
        "title": "RBSE Class 12 Agriculture Stream Master Revision Vault (2026-27)",
        "summary": "Class 12 Agriculture revision vault covering Agronomy (सस्य विज्ञान), Horticulture (उद्यान विज्ञान), Animal Husbandry (पशुपालन), and Dairy Science (दुग्ध विज्ञान).",
        "objectives": agri_obj,
        "subjectives": agri_sub,
        "mcqs_count": len(agri_obj),
        "subs_count": len(agri_sub)
    }
]

for n in bundled_notes:
    print(f"{n['title']}: {n['mcqs_count']} MCQs, {n['subs_count']} Subjectives")

out_file = os.path.join(base_dir, "rbse_bundled_notes.json")
with open(out_file, "w", encoding="utf-8") as f:
    json.dump(bundled_notes, f, ensure_ascii=False, indent=2)

print(f"✅ Successfully compiled {len(bundled_notes)} RBSE study notes into {out_file}")
