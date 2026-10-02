import json
import os
import hashlib
import re

def clean_for_fp(text):
    if not text:
        return ""
    text = re.sub(r"^\[[^\]]+\]\s*", "", text)
    text = re.sub(r"^(?:प्रश्न|question|q\.|q)\s*#?\d+\s*[:.-]\s*", "", text, flags=re.I)
    text = re.sub(r"\s+", " ", text)
    return text.lower().strip()

def get_fp(q):
    return hashlib.sha256(clean_for_fp(q).encode('utf-8')).hexdigest()

def make_mcq(q, options, ans_idx, exp, pyq_tag, en_q=None, en_options=None, en_ans_idx=None, en_exp=None, chapter=None):
    correct_val = options[ans_idx]
    res = {
        "q": q,
        "options": options,
        "ans": correct_val,
        "exp": exp,
        "pyqTag": pyq_tag,
        "chapter": chapter
    }
    if en_q and en_options:
        res["enQ"] = en_q
        res["enOptions"] = en_options
        res["enAns"] = en_options[en_ans_idx if en_ans_idx is not None else ans_idx]
        res["enExp"] = en_exp or exp
    return res

def save_master_guide(filename, exam_version_id, subject_id, subject_name, objectives, subjectives=None, language="hi"):
    # Deduplicate strictly
    unique_objs = []
    seen_fps = set()
    for obj in objectives:
        fp = get_fp(obj["q"])
        if fp not in seen_fps:
            seen_fps.add(fp)
            unique_objs.append(obj)
            
    payload = {
        "examVersionId": exam_version_id,
        "stage": "Tier-1",
        "subjectId": subject_id,
        "subjectName": subject_name,
        "language": language,
        "objectives": unique_objs,
        "subjectives": subjectives or []
    }
    os.makedirs(os.path.dirname(filename), exist_ok=True)
    with open(filename, "w", encoding="utf-8") as f:
        json.dump(payload, f, ensure_ascii=False, indent=2)
    print(f"Saved {filename}: {len(unique_objs)} unique MCQs, {len(subjectives or [])} Subjectives.")
    return len(unique_objs)

print("SSC Builder Module ready.")
