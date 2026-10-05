import sqlite3

c = sqlite3.connect('backend/db/sarkari_core.db')
cur = c.cursor()
tables = [r[0] for r in cur.execute("SELECT name FROM sqlite_master WHERE type='table'").fetchall()]
print("Checking references to 'mpbse-board' and 'mpbse-madhya-pradesh' across all tables:")
for t in tables:
    cols = [r[1] for r in cur.execute(f"PRAGMA table_info({t})").fetchall()]
    if 'board_id' in cols:
        cnt_old = cur.execute(f"SELECT count(*) FROM {t} WHERE board_id='mpbse-board'").fetchone()[0]
        cnt_new = cur.execute(f"SELECT count(*) FROM {t} WHERE board_id='mpbse-madhya-pradesh'").fetchone()[0]
        if cnt_old > 0 or cnt_new > 0:
            print(f"Table {t}: mpbse-board={cnt_old}, mpbse-madhya-pradesh={cnt_new}")
