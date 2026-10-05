import sqlite3
import os

db_path = os.path.join(os.path.dirname(__file__), '../db/sarkari_core.db')
conn = sqlite3.connect(db_path)
c = conn.cursor()

c.execute("SELECT board_id, name, state FROM boards WHERE board_id = 'pseb-punjab'")
print("Board:", c.fetchall())

c.execute("SELECT COUNT(*) FROM questions WHERE board_id = 'pseb-punjab'")
print("PSEB questions:", c.fetchone()[0])

c.execute("SELECT COUNT(*) FROM subjects WHERE board_id = 'pseb-punjab'")
print("PSEB subjects count in subjects table:", c.fetchone()[0])

c.execute("SELECT subject_id, name, stage FROM subjects WHERE board_id = 'pseb-punjab'")
subjs = c.fetchall()
print(f"PSEB subjects ({len(subjs)}):")
for s in subjs[:10]:
    print(f"  {s[0]} | {s[1]} | {s[2]}")

c.execute("SELECT COUNT(*) FROM notes WHERE note_id LIKE 'note-pseb-%'")
print("PSEB notes:", c.fetchone()[0])

conn.close()
