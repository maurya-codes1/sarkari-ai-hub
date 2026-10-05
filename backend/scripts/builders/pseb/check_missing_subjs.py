import sqlite3
import json
import os

db_path = os.path.join(os.path.dirname(__file__), '../../../db/sarkari_core.db')
conn = sqlite3.connect(db_path)
c = conn.cursor()

c.execute("SELECT subject_id FROM subjects")
existing_subjs = set(r[0] for r in c.fetchall())

base_dir = os.path.dirname(__file__)
files = [
    'pseb_c10_bank.json',
    'pseb_c12_science_bank.json',
    'pseb_c12_commerce_bank.json',
    'pseb_c12_humanities_bank.json',
    'pseb_c12_agriculture_bank.json'
]

missing_subjs = set()
for fname in files:
    with open(os.path.join(base_dir, fname), 'r', encoding='utf-8') as f:
        data = json.load(f)
    for q in data:
        sid = q['subject_id']
        if sid not in existing_subjs:
            missing_subjs.add(sid)

print("Missing subjects in DB:", missing_subjs)
conn.close()
