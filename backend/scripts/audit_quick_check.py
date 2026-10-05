import sqlite3
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

con = sqlite3.connect('backend/db/sarkari_core.db')
cur = con.cursor()

print("Board-wise MCQ answer distribution:")
rows = cur.execute("""
    SELECT q.board_id, qv.correct_answer, COUNT(*)
    FROM questions q
    JOIN question_versions qv ON q.question_id = qv.question_id
    WHERE q.question_type_id = 'single_mcq'
    GROUP BY q.board_id, qv.correct_answer
""").fetchall()

board_dist = {}
for b, ans, count in rows:
    b_name = b if b else 'COMPETITIVE_EXAMS'
    if b_name not in board_dist:
        board_dist[b_name] = {}
    board_dist[b_name][ans[:50]] = count

for b, dist in board_dist.items():
    print(f"\nBoard: {b}")
    for k, v in list(dist.items())[:10]:
        print(f"  {k}: {v}")

con.close()
