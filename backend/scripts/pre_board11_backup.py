import sqlite3
import shutil
import hashlib
import os

src = 'backend/db/sarkari_core.db'
dst = 'backend/db/sarkari_core_pre_board11_west_bengal.db'
shutil.copyfile(src, dst)

with open(dst, 'rb') as f:
    h = hashlib.sha256(f.read()).hexdigest()
print(f"Backup created: {dst}")
print(f"SHA-256: {h}")

con = sqlite3.connect(dst)
cur = con.cursor()

tot = cur.execute("SELECT COUNT(*) FROM questions").fetchone()[0]
mcq = cur.execute("SELECT COUNT(*) FROM questions WHERE question_type_id = 'single_mcq'").fetchone()[0]
sub = cur.execute("SELECT COUNT(*) FROM questions WHERE question_type_id != 'single_mcq'").fetchone()[0]
c10 = cur.execute("SELECT COUNT(*) FROM questions WHERE stage LIKE 'Class 10%'").fetchone()[0]
c11 = cur.execute("SELECT COUNT(*) FROM questions WHERE stage LIKE 'Class 11%'").fetchone()[0]
c12 = cur.execute("SELECT COUNT(*) FROM questions WHERE stage LIKE 'Class 12%'").fetchone()[0]
pyq = cur.execute("SELECT COUNT(*) FROM questions WHERE provenance = 'OFFICIAL_PYQ' OR source_type = 'OFFICIAL_PYQ'").fetchone()[0]
fe = cur.execute("SELECT COUNT(*) FROM questions WHERE full_exam_eligible = 1").fetchone()[0]
wbbse = cur.execute("SELECT COUNT(*) FROM questions WHERE board_id LIKE '%wbbse%' OR board_id LIKE '%wbchse%'").fetchone()[0]

print(f"Total questions: {tot}")
print(f"WBBSE/WBCHSE count: {wbbse}")
print(f"Objective (MCQ) count: {mcq}")
print(f"Subjective count: {sub}")
print(f"Class 10 count: {c10}")
print(f"Class 11 count: {c11}")
print(f"Class 12 count: {c12}")
print(f"PYQ count: {pyq}")
print(f"Full Exam eligible count: {fe}")
