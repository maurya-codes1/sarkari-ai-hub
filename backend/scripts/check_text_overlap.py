import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

base_dir = os.path.dirname(__file__)
files = [
    os.path.join(base_dir, "builders/cbse/cbse_c10_bank.json"),
    os.path.join(base_dir, "builders/cbse/cbse_c12_science_bank.json"),
    os.path.join(base_dir, "builders/cbse/cbse_c12_commerce_bank.json"),
    os.path.join(base_dir, "builders/cbse/cbse_c12_humanities_bank.json"),
]

all_qs = []
for fpath in files:
    with open(fpath, "r", encoding="utf-8") as f:
        all_qs.extend(json.load(f))

print(f"Total CBSE questions: {len(all_qs)}")

# Check 1: Does any question text in subject A appear in subject B?
text_to_subjects = {}
for q in all_qs:
    s_id = q["subject_id"]
    parsed = json.loads(q["language_content"])
    q_hi = parsed.get("hi", {}).get("q", "")
    q_en = parsed.get("en", {}).get("q", "")
    full_text = f"{q_hi} ||| {q_en}"
    
    if full_text not in text_to_subjects:
        text_to_subjects[full_text] = set()
    text_to_subjects[full_text].add(s_id)

cross_subject_overlap = {text: subjs for text, subjs in text_to_subjects.items() if len(subjs) > 1}

print(f"\nTotal distinct question texts: {len(text_to_subjects)}")
print(f"Number of question texts appearing in multiple subjects: {len(cross_subject_overlap)}")

if len(cross_subject_overlap) > 0:
    print("\nSample overlapping texts across subjects:")
    for i, (text, subjs) in enumerate(list(cross_subject_overlap.items())[:5]):
        print(f"  {i+1}. Subjects: {subjs}")
        print(f"     Text: {text[:150]}...")
else:
    print("SUCCESS: Exactly 0 question texts overlap across subjects! Every subject has 100% unique question texts.")
