import sqlite3
import os

db_path = os.path.join(os.path.dirname(__file__), '../db/sarkari_core.db')
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

# Find which tables have foreign keys pointing to questions
cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
tables = [r[0] for r in cursor.fetchall()]

for t in tables:
    cursor.execute(f"PRAGMA foreign_key_list({t});")
    fks = cursor.fetchall()
    for fk in fks:
        if fk[2] == 'questions':
            print(f"Table '{t}' references 'questions' on column '{fk[3]}' -> '{fk[4]}'")

conn.close()
