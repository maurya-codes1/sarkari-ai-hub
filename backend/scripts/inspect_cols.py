import sqlite3
import os

db_path = os.path.join(os.path.dirname(__file__), '../db/sarkari_core.db')
conn = sqlite3.connect(db_path)
c = conn.cursor()

c.execute("PRAGMA table_info(boards);")
print("Boards cols:", [col[1] for col in c.fetchall()])

c.execute("PRAGMA table_info(subjects);")
print("Subjects cols:", [col[1] for col in c.fetchall()])

c.execute("SELECT * FROM boards WHERE board_id = 'pseb-punjab'")
print("Board record:", c.fetchall())

conn.close()
