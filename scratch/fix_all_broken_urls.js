const fs = require('fs');

let content = fs.readFileSync('public/js/exams-data.js', 'utf8');

const urlReplacements = [
  // CBSE
  { from: 'https://results.cbse.nic.in', to: 'https://cbseresults.nic.in' },

  // UPMSP
  { from: 'https://upmsp.edu.in/Results.html', to: 'https://upmsp.edu.in' },

  // Bihar Board BSEB
  { from: 'http://biharboardonline.bihar.gov.in', to: 'https://biharboardonline.com' },
  { from: 'http://results.biharboardonline.com', to: 'http://secondary.biharboardonline.com' },

  // Maharashtra Board
  { from: 'https://mahresult.nic.in', to: 'https://mahahsscboard.in' },
  { from: 'https://hscresult.mkcl.org', to: 'https://mahahsscboard.in' },

  // Rajasthan Board RBSE
  { from: 'https://rajresults.nic.in', to: 'https://rajeduboard.rajasthan.gov.in' },

  // MP Board MPBSE
  { from: 'https://mpresults.nic.in', to: 'https://mpbse.nic.in' },
  { from: 'https://esb.mp.gov.in/results/result.htm', to: 'https://esb.mp.gov.in' },

  // NIOS
  { from: 'https://nios.ac.in/notifications.aspx', to: 'https://www.nios.ac.in' },

  // Uttarakhand UBSE
  { from: 'https://uaresults.nic.in', to: 'https://ubse.uk.gov.in' },

  // Assam SEBA
  { from: 'https://sebaresults.in', to: 'https://site.sebaonline.org' },

  // Telangana
  { from: 'https://tsbie.cgg.gov.in', to: 'https://bse.telangana.gov.in' },
  { from: 'https://examresults.ap.nic.in', to: 'https://bse.telangana.gov.in' },

  // Indian Navy Agniveer
  { from: 'https://agniveernavy.cdac.in', to: 'https://www.joinindiannavy.gov.in' },

  // Haryana HSSC
  { from: 'https://hssc.gov.in/all-results', to: 'https://hssc.gov.in' },

  // NEET
  { from: 'https://neet.ntaonline.in', to: 'https://neet.nta.nic.in' },
  { from: 'https://exams.nta.ac.in/NEET/', to: 'https://neet.nta.nic.in' },

  // JEE Main
  { from: 'https://jeemain.nta.ac.in/information-bulletin', to: 'https://jeemain.nta.nic.in' },
  { from: 'https://jeemain.ntaonline.in', to: 'https://jeemain.nta.nic.in' },
  { from: 'https://jeemain.nta.ac.in', to: 'https://jeemain.nta.nic.in' },

  // CUET UG
  { from: 'https://cuetug.ntaonline.in', to: 'https://exams.nta.ac.in' },
  { from: 'https://exams.nta.ac.in/CUET-UG', to: 'https://exams.nta.ac.in' },

  // UGC NET
  { from: 'https://ugcnet.ntaonline.in', to: 'https://ugcnet.nta.nic.in' },
  { from: 'https://ugcnet.nta.ac.in/information-bulletin', to: 'https://ugcnet.nta.nic.in' },

  // General NTA results fallback
  { from: 'https://ntaresults.nic.in', to: 'https://exams.nta.ac.in' }
];

let totalReplaced = 0;
urlReplacements.forEach(({ from, to }) => {
  const parts = content.split(from);
  if (parts.length > 1) {
    const count = parts.length - 1;
    totalReplaced += count;
    content = parts.join(to);
    console.log(`Replaced ${count} instance(s) of "${from}" -> "${to}"`);
  }
});

fs.writeFileSync('public/js/exams-data.js', content, 'utf8');
console.log(`\n✅ Successfully updated public/js/exams-data.js with ${totalReplaced} URL fixes!`);
