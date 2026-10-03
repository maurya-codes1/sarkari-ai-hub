import json
import os

print("Compiling CBSE All-Subject Notes & Stream-Wise Bundles...")

# Load generated question banks
base_dir = os.path.dirname(__file__)
with open(os.path.join(base_dir, 'cbse_c10_bank.json'), 'r', encoding='utf-8') as f:
    c10_q = json.load(f)
with open(os.path.join(base_dir, 'cbse_c12_science_bank.json'), 'r', encoding='utf-8') as f:
    c12_sci_q = json.load(f)
with open(os.path.join(base_dir, 'cbse_c12_commerce_bank.json'), 'r', encoding='utf-8') as f:
    c12_com_q = json.load(f)
with open(os.path.join(base_dir, 'cbse_c12_humanities_bank.json'), 'r', encoding='utf-8') as f:
    c12_hum_q = json.load(f)

def extract_bundle(questions, mcq_percent=0.5, sub_percent=0.5):
    # Group by subject
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
            lang_key = "hi" if "hi" in parsed and "en" not in parsed else "en"
            content = parsed.get("en") or parsed.get("hi")
            bundled_mcqs.append({
                "id": item["question_id"],
                "q": content.get("q"),
                "options": content.get("options", []),
                "ans": content.get("ans"),
                "subjectName": sid.replace("subj-", "").title(),
                "explanation": content.get("exp", "")
            })
            
        for item in data["subs"][:take_sub]:
            parsed = json.loads(item["language_content"])
            content = parsed.get("en") or parsed.get("hi")
            bundled_subs.append({
                "id": item["question_id"],
                "q": content.get("q"),
                "ans": content.get("modelAnswer"),
                "marks": item["marks"],
                "subjectName": sid.replace("subj-", "").title()
            })
            
    return bundled_mcqs, bundled_subs

# 1. Class 10 All-Subject Notes (50% sample from all 9 subjects)
c10_mcqs, c10_subs = extract_bundle(c10_q, mcq_percent=0.5, sub_percent=0.5)
print(f"Class 10 All-Subject Bundle: {len(c10_mcqs)} MCQs, {len(c10_subs)} Subjectives")

# 2. Class 12 Science Stream All-Subject Notes (50% sample from 6 subjects)
sci_mcqs, sci_subs = extract_bundle(c12_sci_q, mcq_percent=0.5, sub_percent=0.5)
print(f"Class 12 Science Stream Bundle: {len(sci_mcqs)} MCQs (Target: 600+), {len(sci_subs)} Subjectives")

# 3. Class 12 Commerce Stream All-Subject Notes (50% sample from 5 subjects)
com_mcqs, com_subs = extract_bundle(c12_com_q, mcq_percent=0.55, sub_percent=0.5)
print(f"Class 12 Commerce Stream Bundle: {len(com_mcqs)} MCQs, {len(com_subs)} Subjectives")

# 4. Class 12 Humanities Stream All-Subject Notes (50% sample from 5 subjects)
hum_mcqs, hum_subs = extract_bundle(c12_hum_q, mcq_percent=0.55, sub_percent=0.5)
print(f"Class 12 Humanities Stream Bundle: {len(hum_mcqs)} MCQs, {len(hum_subs)} Subjectives")

notes_catalog_records = [
    {
        "note_id": "note-cbse-c10-all-subject",
        "title": "CBSE Class 10 All-Subject High-Yield Master Compendium (2026-27)",
        "summary": "Unified board examination revision compendium with 40-60% high-yield questions across all 9 primary Class 10 subjects.",
        "class_id": "Class 10",
        "stream_id": "general",
        "mcqs_count": len(c10_mcqs),
        "subs_count": len(c10_subs),
        "objectives": c10_mcqs,
        "subjectives": c10_subs
    },
    {
        "note_id": "note-cbse-c12-science-all",
        "title": "CBSE Class 12 Science Stream All-Subject Derivation & MCQ Vault (2026-27)",
        "summary": "Full 600+ MCQ & core derivation compendium covering Physics, Chemistry, Math, Biology, CS & Physical Education.",
        "class_id": "Class 12",
        "stream_id": "science-pcmb",
        "mcqs_count": len(sci_mcqs),
        "subs_count": len(sci_subs),
        "objectives": sci_mcqs,
        "subjectives": sci_subs
    },
    {
        "note_id": "note-cbse-c12-commerce-all",
        "title": "CBSE Class 12 Commerce Stream All-Subject Working Notes & MCQs (2026-27)",
        "summary": "Comprehensive 550+ MCQ and practical working notes compendium for Accountancy, Business Studies, Economics, Applied Math & Entrepreneurship.",
        "class_id": "Class 12",
        "stream_id": "commerce",
        "mcqs_count": len(com_mcqs),
        "subs_count": len(com_subs),
        "objectives": com_mcqs,
        "subjectives": com_subs
    },
    {
        "note_id": "note-cbse-c12-humanities-all",
        "title": "CBSE Class 12 Humanities / Arts Stream All-Subject Source & Theory Vault (2026-27)",
        "summary": "Comprehensive source analysis, historiography, and 550+ MCQs covering History, Political Science, Geography, Sociology & Psychology.",
        "class_id": "Class 12",
        "stream_id": "humanities",
        "mcqs_count": len(hum_mcqs),
        "subs_count": len(hum_subs),
        "objectives": hum_mcqs,
        "subjectives": hum_subs
    }
]

out_notes_path = os.path.join(base_dir, 'cbse_bundled_notes.json')
with open(out_notes_path, 'w', encoding='utf-8') as f:
    json.dump(notes_catalog_records, f, ensure_ascii=False, indent=2)

print(f"[SUCCESS] Successfully compiled All-Subject & Stream bundles to {out_notes_path}!")
