import sqlite3
import os

db_path = os.path.join(os.path.dirname(__file__), '../db/sarkari_core.db')
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

cursor.execute("PRAGMA table_info(question_versions);")
cols = cursor.fetchall()
print("question_versions table columns:")
for c in cols:
    print(f"  {c[1]} ({c[2]})")

conn.close()
