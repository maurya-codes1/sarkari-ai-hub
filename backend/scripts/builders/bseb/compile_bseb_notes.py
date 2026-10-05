import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

print("Compiling BSEB All-Subject Notes & Stream-Wise Revision Bundles...")

base_dir = os.path.dirname(__file__)

with open(os.path.join(base_dir, 'bseb_c10_bank.json'), 'r', encoding='utf-8') as f:
    c10_q = json.load(f)
with open(os.path.join(base_dir, 'bseb_c12_science_bank.json'), 'r', encoding='utf-8') as f:
    c12_sci_q = json.load(f)
with open(os.path.join(base_dir, 'bseb_c12_commerce_bank.json'), 'r', encoding='utf-8') as f:
    c12_com_q = json.load(f)
with open(os.path.join(base_dir, 'bseb_c12_humanities_bank.json'), 'r', encoding='utf-8') as f:
    c12_hum_q = json.load(f)
with open(os.path.join(base_dir, 'bseb_c12_agriculture_bank.json'), 'r', encoding='utf-8') as f:
    c12_agri_q = json.load(f)

def extract_bundle(questions, mcq_percent=0.5, sub_percent=0.5):
    by_subj = {}
    for q in questions:
        sid = q["subject_id"]
        if sid not in by_subj:
            by_subj[sid] = {"mcqs": [], "subs": []}
        if q["question_type_id"] == "single_mcq":
            by_subj[sid]["mcqs"].append(q)
        else:
            by_subj[sid]["subs"].append(q)

    bundled_mcqs = []
    bundled_subs = []

    for sid, data in by_subj.items():
        take_mcq = int(len(data["mcqs"]) * mcq_percent)
        take_sub = int(len(data["subs"]) * sub_percent)

        for item in data["mcqs"][:take_mcq]:
            parsed = json.loads(item["language_content"])
            content = parsed.get("hi") or parsed.get("en") or parsed.get("ur") or parsed.get("sa") or parsed.get("mai")
            bundled_mcqs.append({
                "id": item["question_id"],
                "q": content.get("question"),
                "options": content.get("options", []),
                "ans": item.get("correct_answer", "A"),
                "subjectName": sid.replace("bseb-", "").title(),
                "explanation": content.get("explanation", "")
            })

        for item in data["subs"][:take_sub]:
            parsed = json.loads(item["language_content"])
            content = parsed.get("hi") or parsed.get("en") or parsed.get("ur") or parsed.get("sa") or parsed.get("mai")
            bundled_subs.append({
                "id": item["question_id"],
                "q": content.get("question"),
                "ans": content.get("model_answer"),
                "marks": item["marks"],
                "subjectName": sid.replace("bseb-", "").title()
            })

    return bundled_mcqs, bundled_subs

# 1. Class 10 Bundle
c10_mcqs, c10_subs = extract_bundle(c10_q, mcq_percent=0.5, sub_percent=0.5)
print(f"Class 10 All-Subject Bundle: {len(c10_mcqs)} MCQs, {len(c10_subs)} Subjectives")

# 2. Class 12 Science Bundle
sci_mcqs, sci_subs = extract_bundle(c12_sci_q, mcq_percent=0.5, sub_percent=0.5)
print(f"Class 12 Science Stream Bundle: {len(sci_mcqs)} MCQs, {len(sci_subs)} Subjectives")

# 3. Class 12 Commerce Bundle
com_mcqs, com_subs = extract_bundle(c12_com_q, mcq_percent=0.5, sub_percent=0.5)
print(f"Class 12 Commerce Stream Bundle: {len(com_mcqs)} MCQs, {len(com_subs)} Subjectives")

# 4. Class 12 Humanities Bundle
hum_mcqs, hum_subs = extract_bundle(c12_hum_q, mcq_percent=0.5, sub_percent=0.5)
print(f"Class 12 Humanities Stream Bundle: {len(hum_mcqs)} MCQs, {len(hum_subs)} Subjectives")

# 5. Class 12 Agriculture Bundle
agri_mcqs, agri_subs = extract_bundle(c12_agri_q, mcq_percent=1.0, sub_percent=1.0)
print(f"Class 12 Agriculture Stream Bundle: {len(agri_mcqs)} MCQs, {len(agri_subs)} Subjectives")

notes_catalog_records = [
    {
        "note_id": "note-bseb-c10-all-subject",
        "title": "BSEB Class 10 All-Subject High-Yield Master Revision Compendium (2026-27)",
        "summary": "Unified Bihar Board matriculation compendium covering Hindi, English, Math, Science, Social Science, Sanskrit, Urdu, Maithili & Advanced Math.",
        "class_id": "Class 10",
        "stream_id": "general",
        "subject_id": "bseb-hindi-10",
        "mcqs_count": len(c10_mcqs),
        "subs_count": len(c10_subs),
        "objectives": c10_mcqs,
        "subjectives": c10_subs
    },
    {
        "note_id": "note-bseb-c12-science-all",
        "title": "BSEB Class 12 Science Stream All-Subject Derivation & MCQ Vault (2026-27)",
        "summary": "Comprehensive 700+ MCQ and core derivation vault covering Physics, Chemistry, Biology, Math, English, Hindi & Computer Science.",
        "class_id": "Class 12",
        "stream_id": "science",
        "subject_id": "bseb-physics-12",
        "mcqs_count": len(sci_mcqs),
        "subs_count": len(sci_subs),
        "objectives": sci_mcqs,
        "subjectives": sci_subs
    },
    {
        "note_id": "note-bseb-c12-commerce-all",
        "title": "BSEB Class 12 Commerce Stream All-Subject Revision & Practice Vault (2026-27)",
        "summary": "Comprehensive practice vault covering Accountancy, Business Studies, Economics, Entrepreneurship, English & Hindi.",
        "class_id": "Class 12",
        "stream_id": "commerce",
        "subject_id": "bseb-accountancy-12",
        "mcqs_count": len(com_mcqs),
        "subs_count": len(com_subs),
        "objectives": com_mcqs,
        "subjectives": com_subs
    },
    {
        "note_id": "note-bseb-c12-humanities-all",
        "title": "BSEB Class 12 Humanities / Arts Stream All-Subject Revision Compendium (2026-27)",
        "summary": "Comprehensive 700+ MCQ and analytical answer vault covering History, Political Science, Geography, Economics, Sociology, Psychology & Philosophy.",
        "class_id": "Class 12",
        "stream_id": "humanities",
        "subject_id": "bseb-history-12",
        "mcqs_count": len(hum_mcqs),
        "subs_count": len(hum_subs),
        "objectives": hum_mcqs,
        "subjectives": hum_subs
    },
    {
        "note_id": "note-bseb-c12-agriculture-all",
        "title": "BSEB Class 12 Agriculture Stream Master Compendium (2026-27)",
        "summary": "Complete specialized revision vault covering Agro-meteorology, Soil Fertility, Crop Production, Plant Protection & Animal Husbandry.",
        "class_id": "Class 12",
        "stream_id": "agriculture",
        "subject_id": "bseb-agri-12",
        "mcqs_count": len(agri_mcqs),
        "subs_count": len(agri_subs),
        "objectives": agri_mcqs,
        "subjectives": agri_subs
    }
]

out_notes = os.path.join(base_dir, 'bseb_bundled_notes.json')
with open(out_notes, 'w', encoding='utf-8') as f:
    json.dump(notes_catalog_records, f, ensure_ascii=False, indent=2)

print(f"✅ Successfully compiled {len(notes_catalog_records)} BSEB study notes into {out_notes}")
