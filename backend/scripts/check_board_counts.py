import sqlite3
import os

db_path = os.path.join(os.path.dirname(__file__), '../db/sarkari_core.db')
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

cursor.execute("""
    SELECT 
        b.board_id,
        b.name,
        COUNT(q.question_id) as q_count
    FROM boards b
    LEFT JOIN questions q ON b.board_id = q.board_id
    GROUP BY b.board_id, b.name
    ORDER BY q_count DESC, b.name ASC
""")
rows = cursor.fetchall()

print(f"Total Boards in DB: {len(rows)}")
for r in rows:
    if r[2] > 0:
        print(f"  [ACTIVE] {r[0]:<25} | {r[1]:<45} | {r[2]} questions")
    else:
        print(f"  [EMPTY]  {r[0]:<25} | {r[1]:<45} | {r[2]} questions")

conn.close()
