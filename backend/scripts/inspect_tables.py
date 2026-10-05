import sqlite3
import os

db_path = os.path.join(os.path.dirname(__file__), '../db/sarkari_core.db')
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
tables = cursor.fetchall()
print("Tables in sarkari_core.db:")
for t in tables:
    print(f"  {t[0]}")

conn.close()
