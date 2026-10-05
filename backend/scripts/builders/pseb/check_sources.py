import sqlite3
import os

db_path = os.path.join(os.path.dirname(__file__), '../../../db/sarkari_core.db')
conn = sqlite3.connect(db_path)
c = conn.cursor()

c.execute("SELECT source_id, name FROM official_sources WHERE source_id LIKE '%pseb%' OR source_id LIKE '%cbse%'")
print("Sources found:", c.fetchall())

c.execute("PRAGMA table_info(official_sources);")
print("official_sources columns:", [col[1] for col in c.fetchall()])

conn.close()
