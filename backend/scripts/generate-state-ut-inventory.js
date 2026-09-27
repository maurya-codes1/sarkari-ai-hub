// backend/scripts/generate-state-ut-inventory.js
// Generates state_ut_inventory.csv for all 36 States & Union Territories

const fs = require('fs');
const path = require('path');
const { getDb } = require('../db/database');

function generateStateUtInventory() {
  const db = getDb();
  console.log('🏛️ Generating State & UT Inventory (exact 36 rows)...');

  const states = db.prepare(`
    SELECT 
      s.*,
      b.name as board_name,
      b.short_name as board_short_name,
      b.official_website as board_url
    FROM states s
    LEFT JOIN boards b ON s.main_school_board_id = b.board_id
    ORDER BY s.type ASC, s.name_en ASC
  `).all();

  console.log(`Found ${states.length} States & UTs in database.`);

  const headers = [
    'official_name',
    'canonical_code',
    'state_or_ut_type',
    'capital',
    'primary_language',
    'education_authority',
    'main_school_board',
    'official_board_url',
    'psc_authority',
    'psc_url',
    'police_authority',
    'police_url',
    'teacher_recruitment_authority',
    'teacher_url',
    'major_entrance_authority',
    'entrance_url',
    'major_recruitment_authority',
    'source_status',
    'last_verified_date'
  ];

  const escapeCsv = (val) => {
    const s = String(val === null || val === undefined ? '' : val);
    if (s.includes(',') || s.includes('"') || s.includes('\n')) {
      return `"${s.replace(/"/g, '""')}"`;
    }
    return s;
  };

  const rows = [headers.join(',')];

  for (const s of states) {
    const boardDisplayName = s.board_name ? `${s.board_name} (${s.board_short_name})` : s.main_school_board_id;
    const boardUrl = s.board_url || s.education_authority_url;

    rows.push([
      escapeCsv(s.name_en),
      escapeCsv(s.official_code),
      escapeCsv(s.type),
      escapeCsv(s.capital),
      escapeCsv(s.primary_language_code),
      escapeCsv(s.education_authority_name),
      escapeCsv(boardDisplayName),
      escapeCsv(boardUrl),
      escapeCsv(s.psc_authority_name),
      escapeCsv(s.psc_authority_url),
      escapeCsv(s.police_recruitment_authority_name),
      escapeCsv(s.police_recruitment_authority_url),
      escapeCsv(s.teacher_recruitment_authority_name),
      escapeCsv(s.teacher_recruitment_authority_url),
      escapeCsv(s.entrance_authority_name),
      escapeCsv(s.entrance_authority_url),
      escapeCsv(s.psc_authority_name || s.police_recruitment_authority_name),
      escapeCsv(s.source_verification_status),
      escapeCsv('2026-09-27')
    ].join(','));
  }

  const outPath = path.resolve('state_ut_inventory.csv');
  fs.writeFileSync(outPath, rows.join('\n'));
  console.log(`✅ Generated state_ut_inventory.csv with ${states.length} rows at ${outPath}`);

  return states.length;
}

if (require.main === module) {
  generateStateUtInventory();
}

module.exports = { generateStateUtInventory };
