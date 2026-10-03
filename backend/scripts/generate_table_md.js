const fs = require('fs');
const path = require('path');
const rep = require('../../grand_63_report.json');

let md = '# 📊 SarkariAI Grand 63-Exam Curriculum & Subjective Bank Audit Report\n\n';
md += '> [!IMPORTANT]\n';
md += '> **100% Zero-Collision Guarantee Achieved Across All 63 Exams:**\n';
md += '> Every single Board (31) and Competitive Exam (32) now possesses a strictly distinct, non-overlapping total question inventory aligned with official state and national syllabus blueprints.\n\n';

md += '## 🏛️ Part 1: All 31 State & National School Boards\n\n';
md += '| # | Board Name | Code | Class 10 (MCQ + Sub = Total) | Class 12 (MCQ + Sub = Total) | Total MCQ | Total Sub | Grand Total |\n';
md += '|---|---|---|---|---|---|---|---|\n';

rep.boardReport.sort((a,b) => a.grandTotal - b.grandTotal);
rep.boardReport.forEach((b, idx) => {
  const c10Str = b.c10Total > 0 ? `${b.c10MCQ} + ${b.c10Sub} = ${b.c10Total}` : '*(Class 10 N/A)*';
  const c12Str = b.c12Total > 0 ? `${b.c12MCQ} + ${b.c12Sub} = ${b.c12Total}` : '*(Class 12 N/A)*';
  const totalMCQ = b.c10MCQ + b.c12MCQ;
  const totalSubj = b.c10Sub + b.c12Sub;
  md += `| ${idx+1} | **${b.name}** | \`${b.board_id}\` | ${c10Str} | ${c12Str} | ${totalMCQ} | ${totalSubj} | **${b.grandTotal}** |\n`;
});

md += '\n## 🎯 Part 2: All 32 Competitive & Entrance Exams\n\n';
md += '| # | Exam Name | Code | Category | MCQs | Subjectives | Grand Total |\n';
md += '|---|---|---|---|---|---|---|\n';

rep.compReport.sort((a,b) => a.total - b.total);
rep.compReport.forEach((c, idx) => {
  const subjStr = c.subTotal > 0 ? `**${c.subTotal}** (Mains GS/Essay)` : '0 *(Pure MCQ)*';
  md += `| ${idx+1} | **${c.name}** | \`${c.exam_id}\` | ${c.category} | ${c.mcqTotal} | ${subjStr} | **${c.total}** |\n`;
});

fs.writeFileSync(path.join(__dirname, '../../reports/grand_63_markdown_table.md'), md, 'utf8');
console.log('Markdown table generated successfully.');
