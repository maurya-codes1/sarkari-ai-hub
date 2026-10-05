import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

base_dir = os.path.dirname(__file__)
files = [
    ("Class 10", os.path.join(base_dir, "builders/cbse/cbse_c10_bank.json")),
    ("Class 12 Science", os.path.join(base_dir, "builders/cbse/cbse_c12_science_bank.json")),
    ("Class 12 Commerce", os.path.join(base_dir, "builders/cbse/cbse_c12_commerce_bank.json")),
    ("Class 12 Humanities", os.path.join(base_dir, "builders/cbse/cbse_c12_humanities_bank.json")),
]

for stage_name, fpath in files:
    print(f"\n=======================================================")
    print(f"STAGE: {stage_name}")
    print(f"=======================================================")
    with open(fpath, "r", encoding="utf-8") as f:
        data = json.load(f)
    print(f"Total questions loaded: {len(data)}")
    
    subjects = {}
    for item in data:
        s_id = item["subject_id"]
        if s_id not in subjects:
            subjects[s_id] = []
        subjects[s_id].append(item)
        
    for s_id, q_list in subjects.items():
        mcqs = [q for q in q_list if q["question_type_id"] == "single_mcq"]
        subs = [q for q in q_list if q["question_type_id"] != "single_mcq"]
        print(f"\nSubject: {s_id} | Total: {len(q_list)} (MCQs: {len(mcqs)}, Subjectives: {len(subs)})")
        
        # Show first MCQ
        sample_mcq = mcqs[0]
        parsed_lang = json.loads(sample_mcq["language_content"])
        sample_q = parsed_lang.get("en", parsed_lang.get("hi", {}))
        print(f"  Sample MCQ 1:")
        print(f"    Q: {sample_q.get('q')}")
        print(f"    Options: {sample_q.get('options')}")
        print(f"    Ans: {sample_q.get('ans')}")
        
        # Show first Subjective
        sample_sub = subs[0]
        parsed_sub_lang = json.loads(sample_sub["language_content"])
        sample_sub_q = parsed_sub_lang.get("en", parsed_sub_lang.get("hi", {}))
        print(f"  Sample Subjective 1:")
        print(f"    Q: {sample_sub_q.get('q')}")
        print(f"    Marks: {sample_sub['marks']} | Type: {sample_sub['question_type_id']}")
