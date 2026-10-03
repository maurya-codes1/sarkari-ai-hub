const db = require('../db/database').getDb();

const comp = db.prepare(`
  SELECT exam_id, name, category, organization_id
  FROM exams
  WHERE exam_id NOT IN (
    'cbse-board', 'icse-cisce', 'nios-board', 'upmsp-board', 'bseb-bihar', 'rbse-rajasthan',
    'mpbse-board', 'cgbse-chhattisgarh', 'bseh-haryana', 'hpbose-board', 'ubse-uttarakhand',
    'jac-jharkhand', 'maharashtra-board', 'gseb-gujarat', 'wbbse-wb', 'pseb-punjab',
    'chse-bse-odisha', 'seba-ahsec-assam', 'kseab-karnataka', 'tndge-tamilnadu',
    'kerala-board', 'bseap-board', 'bsetg-board', 'tsbie-bieap', 'jkbose-board',
    'gbshse-board', 'bsem-board', 'mbose-board', 'mbse-board', 'nbse-board', 'tbse-board'
  )
  ORDER BY exam_id
`).all();

console.log('Total competitive exams:', comp.length);
comp.forEach((c, i) => console.log(`${(i+1).toString().padStart(2)}. [${c.exam_id}] ${c.name} (${c.category})`));
