import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

print("Compiling NIOS All-Subject Notes & Stream-Wise Revision Bundles...")

base_dir = os.path.dirname(__file__)

with open(os.path.join(base_dir, 'nios_secondary_bank.json'), 'r', encoding='utf-8') as f:
    sec_q = json.load(f)
with open(os.path.join(base_dir, 'nios_srsec_science_bank.json'), 'r', encoding='utf-8') as f:
    sci_q = json.load(f)
with open(os.path.join(base_dir, 'nios_srsec_commerce_bank.json'), 'r', encoding='utf-8') as f:
    com_q = json.load(f)
with open(os.path.join(base_dir, 'nios_srsec_humanities_bank.json'), 'r', encoding='utf-8') as f:
    hum_q = json.load(f)

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
            content = parsed.get("hi") or parsed.get("en") or next(iter(parsed.values()))
            bundled_mcqs.append({
                "id": item["question_id"],
                "q": content.get("question"),
                "options": content.get("options", []),
                "ans": item.get("correct_answer", "A"),
                "subjectName": sid.replace("nios-", "").title(),
                "explanation": content.get("explanation", "")
            })

        for item in data["subs"][:take_sub]:
            parsed = json.loads(item["language_content"])
            content = parsed.get("hi") or parsed.get("en") or next(iter(parsed.values()))
            bundled_subs.append({
                "id": item["question_id"],
                "q": content.get("question"),
                "ans": content.get("model_answer"),
                "marks": item["marks"],
                "subjectName": sid.replace("nios-", "").title()
            })

    return bundled_mcqs, bundled_subs

# 1. Secondary Bundle
sec_mcqs, sec_subs = extract_bundle(sec_q, mcq_percent=0.5, sub_percent=0.5)
print(f"Secondary All-Subject Bundle: {len(sec_mcqs)} MCQs, {len(sec_subs)} Subjectives")

# 2. Senior Secondary Science Bundle
sci_mcqs, sci_subs = extract_bundle(sci_q, mcq_percent=0.5, sub_percent=0.5)
print(f"Senior Secondary Science Track Bundle: {len(sci_mcqs)} MCQs, {len(sci_subs)} Subjectives")

# 3. Senior Secondary Commerce Bundle
com_mcqs, com_subs = extract_bundle(com_q, mcq_percent=0.5, sub_percent=0.5)
print(f"Senior Secondary Commerce Track Bundle: {len(com_mcqs)} MCQs, {len(com_subs)} Subjectives")

# 4. Senior Secondary Humanities Bundle
hum_mcqs, hum_subs = extract_bundle(hum_q, mcq_percent=0.5, sub_percent=0.5)
print(f"Senior Secondary Humanities Track Bundle: {len(hum_mcqs)} MCQs, {len(hum_subs)} Subjectives")

notes_catalog_records = [
    {
        "note_id": "note-nios-secondary-all",
        "title": "NIOS Secondary Course (Class 10) All-Subject Master Revision Compendium (2026-27)",
        "summary": "Unified NIOS Secondary compendium covering Hindi, English, Mathematics, Science and Technology, Social Science, Economics, Business Studies, Home Science, Psychology, and Indian Culture & Heritage.",
        "class_id": "Class 10",
        "stream_id": "general",
        "subject_id": "nios-hindi-201",
        "mcqs_count": len(sec_mcqs),
        "subs_count": len(sec_subs),
        "objectives": sec_mcqs,
        "subjectives": sec_subs
    },
    {
        "note_id": "note-nios-srsec-science-all",
        "title": "NIOS Senior Secondary (Class 12) Science Track All-Subject Revision Vault (2026-27)",
        "summary": "Comprehensive 700+ MCQ and core derivation vault covering Physics, Chemistry, Biology, Mathematics, Computer Science, English, and Environmental Science.",
        "class_id": "Class 12",
        "stream_id": "science",
        "subject_id": "nios-physics-312",
        "mcqs_count": len(sci_mcqs),
        "subs_count": len(sci_subs),
        "objectives": sci_mcqs,
        "subjectives": sci_subs
    },
    {
        "note_id": "note-nios-srsec-commerce-all",
        "title": "NIOS Senior Secondary (Class 12) Commerce Track All-Subject Practice Vault (2026-27)",
        "summary": "Comprehensive practice vault covering Accountancy, Business Studies, Economics, Data Entry Operations, Hindi, Mass Communication, and Tourism.",
        "class_id": "Class 12",
        "stream_id": "commerce",
        "subject_id": "nios-accountancy-320",
        "mcqs_count": len(com_mcqs),
        "subs_count": len(com_subs),
        "objectives": com_mcqs,
        "subjectives": com_subs
    },
    {
        "note_id": "note-nios-srsec-humanities-all",
        "title": "NIOS Senior Secondary (Class 12) Humanities Track Master Compendium (2026-27)",
        "summary": "Comprehensive 700+ MCQ and analytical answer vault covering History, Geography, Political Science, Sociology, Psychology, Home Science, and Introduction to Law.",
        "class_id": "Class 12",
        "stream_id": "humanities",
        "subject_id": "nios-history-315",
        "mcqs_count": len(hum_mcqs),
        "subs_count": len(hum_subs),
        "objectives": hum_mcqs,
        "subjectives": hum_subs
    }
]

out_notes = os.path.join(base_dir, 'nios_bundled_notes.json')
with open(out_notes, 'w', encoding='utf-8') as f:
    json.dump(notes_catalog_records, f, ensure_ascii=False, indent=2)

print(f"✅ Successfully compiled {len(notes_catalog_records)} NIOS study notes into {out_notes}")
