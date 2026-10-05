import sqlite3
import os

db_path = os.path.join(os.path.dirname(__file__), '../db/sarkari_core.db')
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

cbse_subquery = "SELECT question_id FROM questions WHERE board_id = 'cbse-board'"

for tbl in ['question_versions', 'question_tags', 'paper_questions', 'cross_surface_question_usage']:
    cursor.execute(f"SELECT COUNT(*) FROM {tbl} WHERE question_id IN ({cbse_subquery})")
    cnt = cursor.fetchone()[0]
    print(f"{tbl}: {cnt} records referencing CBSE questions")

conn.close()
