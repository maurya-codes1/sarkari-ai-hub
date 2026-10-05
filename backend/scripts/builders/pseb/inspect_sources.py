import sqlite3
import os

db_path = os.path.join(os.path.dirname(__file__), '../../../db/sarkari_core.db')
conn = sqlite3.connect(db_path)
c = conn.cursor()

c.execute("PRAGMA table_info(official_sources);")
cols = [col[1] for col in c.fetchall()]
print("official_sources columns:", cols)

c.execute("SELECT * FROM official_sources WHERE source_id LIKE '%cbse%'")
print("CBSE source:", c.fetchall())

c.execute("SELECT * FROM official_sources WHERE source_id LIKE '%pseb%'")
print("PSEB source:", c.fetchall())

conn.close()
