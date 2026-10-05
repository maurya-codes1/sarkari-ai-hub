import sqlite3

c = sqlite3.connect('backend/db/sarkari_core.db')
cur = c.cursor()
sources = cur.execute("SELECT source_id, document_title, source_url FROM official_sources WHERE source_id LIKE '%upmsp%' OR source_url LIKE '%upmsp%'").fetchall()
print("UPMSP sources in official_sources:", sources)
