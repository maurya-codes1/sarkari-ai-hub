import json
import os

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

text_counts = {}
for q in all_qs:
    parsed = json.loads(q["language_content"])
    q_hi = parsed.get("hi", {}).get("q", "")
    q_en = parsed.get("en", {}).get("q", "")
    full_text = f"{q_hi} ||| {q_en}"
    text_counts[full_text] = text_counts.get(full_text, 0) + 1

dupes = {t: c for t, c in text_counts.items() if c > 1}
print(f"Duplicates count: {len(dupes)}")
for t, c in dupes.items():
    print(f"Count {c}: {t[:120]}")
