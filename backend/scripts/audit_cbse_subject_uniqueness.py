import sqlite3
import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

db_path = os.path.join(os.path.dirname(__file__), '../db/sarkari_core.db')
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

print("=== AUDITING CBSE QUESTIONS ACROSS ALL SUBJECTS ===")

cursor.execute("""
    SELECT 
        q.stage,
        q.subject_id,
        q.question_type_id,
        COUNT(*) as total_count,
        COUNT(DISTINCT q.chapter_id) as distinct_chapters
    FROM questions q
    WHERE q.board_id = 'cbse-board'
    GROUP BY q.stage, q.subject_id, q.question_type_id
    ORDER BY q.stage, q.subject_id, q.question_type_id
""")

rows = cursor.fetchall()
print(f"\nFound {len(rows)} subject-stage-type groupings in CBSE:")
for r in rows:
    print(f"Stage: {r[0]:<10} | Subj: {r[1]:<28} | Type: {r[2]:<20} | Count: {r[3]:<4} | Chaps: {r[4]}")

cursor.execute("""
    SELECT 
        q.stage, 
        q.subject_id, 
        q.question_id, 
        q.chapter_id, 
        q.topic_id, 
        qv.language_content, 
        q.question_type_id
    FROM questions q
    JOIN question_versions qv ON q.question_id = qv.question_id
    WHERE q.board_id = 'cbse-board'
    GROUP BY q.stage, q.subject_id, q.question_type_id
""")
samples = cursor.fetchall()
print(f"\nSample Question per subject & type (total {len(samples)}):")
for s in samples:
    try:
        parsed = json.loads(s[5])
    except Exception:
        parsed = {}
    q_hi = parsed.get("hi", {}).get("q", "")
    q_en = parsed.get("en", {}).get("q", "")
    opts_hi = parsed.get("hi", {}).get("options", [])
    opts_en = parsed.get("en", {}).get("options", [])
    text = q_hi if q_hi else q_en
    opts = opts_hi if opts_hi else opts_en
    print(f"\n--- [{s[0]}] [{s[1]}] [{s[6]}] ---")
    print(f"  Chapter ID: {s[3]}")
    print(f"  Topic ID: {s[4]}")
    print(f"  Q: {text[:120]}...")
    if opts:
        print(f"  Sample Options: {opts[:2]}")

# Check cross-subject chapter overlap: Does any chapter appear in more than one subject?
cursor.execute("""
    SELECT chapter_id, COUNT(DISTINCT subject_id) as subj_count, GROUP_CONCAT(DISTINCT subject_id)
    FROM questions
    WHERE board_id = 'cbse-board'
    GROUP BY chapter_id
    HAVING subj_count > 1
""")
overlap_chapters = cursor.fetchall()
print("\n=== CHAPTER OVERLAP CHECK ACROSS SUBJECTS ===")
if overlap_chapters:
    print(f"WARNING: Found {len(overlap_chapters)} chapters appearing in multiple subjects:")
    for ch in overlap_chapters:
        print(f"  Chapter: {ch[0]} in subjects: {ch[2]}")
else:
    print("SUCCESS: 0 Chapter overlap across subjects! Every subject has strictly unique chapters.")

# Check question_id overlap
cursor.execute("""
    SELECT question_id, COUNT(*)
    FROM questions
    WHERE board_id = 'cbse-board'
    GROUP BY question_id
    HAVING COUNT(*) > 1
""")
dupe_ids = cursor.fetchall()
print("\n=== QUESTION ID DUPLICATE CHECK ===")
if dupe_ids:
    print(f"WARNING: Found {len(dupe_ids)} duplicate question IDs!")
else:
    print("SUCCESS: 0 Duplicate question IDs across CBSE!")

conn.close()
