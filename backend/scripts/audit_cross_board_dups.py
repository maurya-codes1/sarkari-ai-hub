import sqlite3
import json
import re
import hashlib
import sys

sys.stdout.reconfigure(encoding='utf-8')

con = sqlite3.connect('backend/db/sarkari_core.db')
cur = con.cursor()

BOARDS = [
    'cbse-board',
    'pseb-punjab',
    'bseb-bihar',
    'ubse-uttarakhand',
    'upmsp-uttar-pradesh',
    'mpbse-madhya-pradesh',
    'nios-board',
    'rbse-rajasthan',
    'msbshse-maharashtra',
    'gseb-gujarat'
]

rows = cur.execute("""
    SELECT q.question_id, q.board_id, q.subject_id, q.stage, q.question_type_id, qv.language_content
    FROM questions q
    JOIN question_versions qv ON q.question_id = qv.question_id
    WHERE q.board_id IS NOT NULL
""").fetchall()

def normalize_text(text):
    if not text:
        return ""
    text = re.sub(r'<[^>]+>', ' ', text)
    text = re.sub(r'[*_`#\[\]]', ' ', text)
    text = re.sub(r'\s+', ' ', text).strip().lower()
    return text

def compute_fingerprint(lang_content_str, qtype):
    try:
        data = json.loads(lang_content_str)
    except:
        return ""
    
    combined_text = []
    for lang, obj in sorted(data.items()):
        if isinstance(obj, dict):
            q_text = obj.get('question') or obj.get('q') or ''
            opts = obj.get('options') or []
            combined_text.append(normalize_text(q_text))
            for o in opts:
                combined_text.append(normalize_text(str(o)))
    
    full_str = f"{qtype}|{'|'.join(combined_text)}"
    return hashlib.sha256(full_str.encode('utf-8')).hexdigest()

board_fingerprints = {b: set() for b in BOARDS}
board_q_counts = {b: 0 for b in BOARDS}

for qid, bid, sid, stage, qtype, lang_content in rows:
    if bid in BOARDS:
        board_q_counts[bid] += 1
        fp = compute_fingerprint(lang_content, qtype)
        if fp:
            board_fingerprints[bid].add(fp)

print("Board Question Counts & Unique Fingerprints:")
for b in BOARDS:
    print(f"  {b}: {board_q_counts[b]} questions, {len(board_fingerprints[b])} unique fingerprints")

print("\nCross-Board Exact Duplicate Matrix (All 90 directed pairs):")
any_dup = False
for b1 in BOARDS:
    for b2 in BOARDS:
        if b1 == b2:
            continue
        common = board_fingerprints[b1].intersection(board_fingerprints[b2])
        if len(common) > 0:
            print(f"  CRITICAL: {b1} and {b2} share {len(common)} exact duplicates!")
            any_dup = True

if not any_dup:
    print("  ✅ ZERO EXACT DUPLICATES ACROSS ALL 90 DIRECTED BOARD PAIRS (0 / 90)!")

con.close()
