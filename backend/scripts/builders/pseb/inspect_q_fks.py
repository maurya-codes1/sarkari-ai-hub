import sqlite3
import os

db_path = os.path.join(os.path.dirname(__file__), '../../../db/sarkari_core.db')
conn = sqlite3.connect(db_path)
c = conn.cursor()

c.execute("PRAGMA foreign_key_list(questions);")
fks = c.fetchall()
print("Foreign keys on 'questions' table:")
for fk in fks:
    print(f"  Column: {fk[3]} -> Table: {fk[2]} ({fk[4]})")

conn.close()
