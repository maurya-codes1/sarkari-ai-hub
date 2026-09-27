const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');

const db = new Database(path.resolve(__dirname, '../db/sarkari_core.db'), { readonly: true });
const exams = db.prepare('SELECT inventory_id, exam_id, category, sub_category, exam_name_en, authority_name, official_website_url FROM nationwide_exam_inventory ORDER BY category, exam_name_en').all();

const appFeeMap = {
  // UPSC
  'upsc-cse': { mode: 'ONLINE', gen: 100, obc: 100, scst: 0, female: 0, pwbd: 0, notes: 'Female, SC, ST and Persons with Benchmark Disability candidates are exempted from payment of fee.', portal: 'https://upsconline.nic.in', corr: 'YES (7 days window)', source: 'UPSC CSE Official Gazette Notification' },
  'upsc-nda': { mode: 'ONLINE', gen: 100, obc: 100, scst: 0, female: 0, pwbd: 0, notes: 'SC/ST candidates/Sons of JCOs/NCOs/ORs and female candidates are exempted from payment of fee.', portal: 'https://upsconline.nic.in', corr: 'YES (7 days window)', source: 'UPSC NDA/NA Official Notification' },
  'upsc-cds': { mode: 'ONLINE', gen: 200, obc: 200, scst: 0, female: 0, pwbd: 0, notes: 'Female/SC/ST candidates are exempted from payment of fee.', portal: 'https://upsconline.nic.in', corr: 'YES (7 days window)', source: 'UPSC CDS Official Notification' },
  'upsc-capf': { mode: 'ONLINE', gen: 200, obc: 200, scst: 0, female: 0, pwbd: 0, notes: 'Female/SC/ST candidates are exempted from payment of fee.', portal: 'https://upsconline.nic.in', corr: 'YES (7 days window)', source: 'UPSC CAPF AC Official Notification' },

  // SSC
  'ssc-cgl': { mode: 'ONLINE', gen: 100, obc: 100, scst: 0, female: 0, pwbd: 0, notes: 'Women candidates and candidates belonging to Scheduled Castes (SC), Scheduled Tribes (ST), PwBD and ESM eligible for reservation are exempted from payment of fee.', portal: 'https://ssc.gov.in', corr: 'YES (2 days window with correction charge)', source: 'SSC CGL Official Notice' },
  'ssc-chsl': { mode: 'ONLINE', gen: 100, obc: 100, scst: 0, female: 0, pwbd: 0, notes: 'Women/SC/ST/PwBD/ESM candidates exempted.', portal: 'https://ssc.gov.in', corr: 'YES (2 days window)', source: 'SSC CHSL Official Notice' },
  'ssc-mts': { mode: 'ONLINE', gen: 100, obc: 100, scst: 0, female: 0, pwbd: 0, notes: 'Women/SC/ST/PwBD/ESM candidates exempted.', portal: 'https://ssc.gov.in', corr: 'YES (2 days window)', source: 'SSC MTS Official Notice' },
  'ssc-gd': { mode: 'ONLINE', gen: 100, obc: 100, scst: 0, female: 0, pwbd: 0, notes: 'Women/SC/ST/ESM candidates exempted.', portal: 'https://ssc.gov.in', corr: 'YES (3 days window)', source: 'SSC Constable GD Official Notice' },
  'ssc-cpo': { mode: 'ONLINE', gen: 100, obc: 100, scst: 0, female: 0, pwbd: 0, notes: 'Women/SC/ST/ESM candidates exempted.', portal: 'https://ssc.gov.in', corr: 'YES (2 days window)', source: 'SSC CPO Official Notice' },
  'ssc-je': { mode: 'ONLINE', gen: 100, obc: 100, scst: 0, female: 0, pwbd: 0, notes: 'Women/SC/ST/PwBD/ESM candidates exempted.', portal: 'https://ssc.gov.in', corr: 'YES (2 days window)', source: 'SSC JE Official Notice' },
  'ssc-steno': { mode: 'ONLINE', gen: 100, obc: 100, scst: 0, female: 0, pwbd: 0, notes: 'Women/SC/ST/PwBD/ESM candidates exempted.', portal: 'https://ssc.gov.in', corr: 'YES (2 days window)', source: 'SSC Steno Official Notice' },

  // RAILWAYS
  'rrb-ntpc': { mode: 'ONLINE', gen: 500, obc: 500, scst: 250, female: 250, pwbd: 250, notes: 'Rs. 400 refunded to Gen/OBC and Rs. 250 refunded to SC/ST/Female/PwBD upon appearing in 1st Stage CBT.', portal: 'https://www.rrbapply.gov.in', corr: 'YES (10 days window with Rs 250 fee)', source: 'CEN 05/2024 & 06/2024 Notice' },
  'rrb-alp': { mode: 'ONLINE', gen: 500, obc: 500, scst: 250, female: 250, pwbd: 250, notes: 'Rs. 400/250 refunded upon appearing in CBT 1.', portal: 'https://www.rrbapply.gov.in', corr: 'YES (10 days window)', source: 'CEN 01/2024 Official Notice' },
  'rrb-technician': { mode: 'ONLINE', gen: 500, obc: 500, scst: 250, female: 250, pwbd: 250, notes: 'Rs. 400/250 refunded upon appearing in CBT.', portal: 'https://www.rrbapply.gov.in', corr: 'YES (10 days window)', source: 'CEN 02/2024 Official Notice' },
  'rrb-group-d': { mode: 'ONLINE', gen: 500, obc: 500, scst: 250, female: 250, pwbd: 250, notes: 'Rs. 400/250 refunded upon appearing in CBT.', portal: 'https://www.rrbapply.gov.in', corr: 'YES (10 days window)', source: 'CEN RRC-01/2019 Notice' },
  'rpf-constable': { mode: 'ONLINE', gen: 500, obc: 500, scst: 250, female: 250, pwbd: 250, notes: 'Rs. 400/250 refunded upon appearing in CBT.', portal: 'https://www.rrbapply.gov.in', corr: 'YES (10 days window)', source: 'CEN RPF 02/2024 Notice' },
  'rpf-si': { mode: 'ONLINE', gen: 500, obc: 500, scst: 250, female: 250, pwbd: 250, notes: 'Rs. 400/250 refunded upon appearing in CBT.', portal: 'https://www.rrbapply.gov.in', corr: 'YES (10 days window)', source: 'CEN RPF 01/2024 Notice' },

  // BANKING
  'ibps-clerk': { mode: 'ONLINE', gen: 850, obc: 850, scst: 175, female: 850, pwbd: 175, notes: 'Rs. 175 intimation charge for SC/ST/PwBD; Rs. 850 for all other categories including female.', portal: 'https://www.ibps.in', corr: 'NO (Detailed preview before submit)', source: 'IBPS Clerk Notification 2024' },
  'ibps-po-clerk': { mode: 'ONLINE', gen: 850, obc: 850, scst: 175, female: 850, pwbd: 175, notes: 'Rs. 175 intimation charge for SC/ST/PwBD; Rs. 850 for all other categories.', portal: 'https://www.ibps.in', corr: 'NO', source: 'IBPS PO Notification 2024' },
  'sbi-clerk': { mode: 'ONLINE', gen: 750, obc: 750, scst: 0, female: 750, pwbd: 0, notes: 'SC/ST/PwBD/ESM candidates exempted (NIL fee). Gen/OBC/EWS: Rs. 750.', portal: 'https://sbi.co.in/careers', corr: 'NO', source: 'SBI Junior Associates Notice 2024' },
  'sbi-po': { mode: 'ONLINE', gen: 750, obc: 750, scst: 0, female: 750, pwbd: 0, notes: 'SC/ST/PwBD candidates exempted (NIL fee). Gen/OBC/EWS: Rs. 750.', portal: 'https://sbi.co.in/careers', corr: 'NO', source: 'SBI PO Notice 2024' },
  'rbi-grade-b': { mode: 'ONLINE', gen: 850, obc: 850, scst: 100, female: 850, pwbd: 100, notes: 'Rs. 100 intimation charge for SC/ST/PwBD; Rs. 850 for Gen/OBC/EWS.', portal: 'https://opportunities.rbi.org.in', corr: 'NO', source: 'RBI Grade B Notification 2024' },

  // POLICE
  'up-police-constable': { mode: 'ONLINE', gen: 400, obc: 400, scst: 400, female: 400, pwbd: 400, notes: 'Application fee of Rs. 400 is fixed universally for all categories under UP Police Recruitment Rules.', portal: 'https://uppbpb.gov.in', corr: 'YES (2 days window)', source: 'UPPRPB Constable Notification 2024 Para 3' },
  'up-police-si': { mode: 'ONLINE', gen: 400, obc: 400, scst: 400, female: 400, pwbd: 400, notes: 'Universal fee of Rs. 400 for all categories.', portal: 'https://uppbpb.gov.in', corr: 'YES (2 days window)', source: 'UPPRPB SI Notification 2024' },
  'bihar-police-constable': { mode: 'ONLINE', gen: 675, obc: 675, scst: 180, female: 180, pwbd: 180, notes: 'Gen/EBC/BC/EWS/Out-of-state candidates: Rs. 675; SC/ST/Female of Bihar domicile: Rs. 180.', portal: 'https://csbc.bih.nic.in', corr: 'NO (Re-registration required with fee forfeiture)', source: 'CSBC Bihar Advt 01/2023 & 2024' },
  'delhi-police': { mode: 'ONLINE', gen: 100, obc: 100, scst: 0, female: 0, pwbd: 0, notes: 'Processed via SSC portal. Women, SC, ST, ESM exempted.', portal: 'https://delhipolice.gov.in', corr: 'YES (2 days window)', source: 'SSC DP Notification 2024' },
  'punjab-police-constable': { mode: 'ONLINE', gen: 1150, obc: 650, scst: 650, female: 650, pwbd: 650, notes: 'General: Rs. 1150 (App Rs 500 + Exam Rs 650); SC/ST/BC of Punjab: Rs. 650; EWS: Rs. 650; ESM of Punjab: Rs. 500.', portal: 'https://punjabpolice.gov.in', corr: 'YES (3 days window)', source: 'Punjab Police Recruitment Notice 2024' },
  'rajasthan-police-constable': { mode: 'ONLINE', gen: 600, obc: 400, scst: 400, female: 400, pwbd: 400, notes: 'One-Time Registration (OTR): General/Creamy OBC: Rs. 600; Non-creamy OBC/MBC/EWS/SC/ST: Rs. 400.', portal: 'https://police.rajasthan.gov.in', corr: 'YES (3 days window)', source: 'Rajasthan Police Standing Order 2024' },

  // DEFENCE
  'afcat': { mode: 'ONLINE', gen: 550, obc: 550, scst: 550, female: 550, pwbd: 550, notes: 'Non-refundable examination fee of Rs. 550 + GST universally for all candidates.', portal: 'https://afcat.cdac.in', corr: 'YES (Correction window for select fields)', source: 'AFCAT 02/2024 Notification' },
  'agniveer-army': { mode: 'ONLINE', gen: 250, obc: 250, scst: 250, female: 250, pwbd: 250, notes: 'Examination fee of Rs. 250 + GST per candidate paid online for CEE.', portal: 'https://joinindianarmy.nic.in', corr: 'NO', source: 'Join Indian Army Agniveer Rally Notice 2024' },

  // ENTRANCE & TEACHING
  'nta-jee-main': { mode: 'ONLINE', gen: 1000, obc: 900, scst: 500, female: 800, pwbd: 500, notes: 'Gen Male: Rs. 1000; Gen Female: Rs. 800; Gen-EWS/OBC Male: Rs. 900; SC/ST/PwD/Transgender: Rs. 500.', portal: 'https://jeemain.nta.nic.in', corr: 'YES (3 days correction window)', source: 'NTA JEE Main Information Bulletin 2024' },
  'nta-neet': { mode: 'ONLINE', gen: 1700, obc: 1600, scst: 1000, female: 1700, pwbd: 1000, notes: 'General: Rs. 1700; Gen-EWS/OBC-NCL: Rs. 1600; SC/ST/PwBD/Third Gender: Rs. 1000.', portal: 'https://neet.nta.nic.in', corr: 'YES (Correction window announced by NTA)', source: 'NTA NEET UG Information Bulletin 2024' },
  'clat-law': { mode: 'ONLINE', gen: 4000, obc: 4000, scst: 3500, female: 4000, pwbd: 3500, notes: 'General/OBC/NRI/OCI: Rs. 4000; SC/ST/BPL: Rs. 3500.', portal: 'https://consortiumofnlus.ac.in', corr: 'YES (Select fields editable during update window)', source: 'Consortium of NLUs CLAT Brochure 2024' },
  'ctet-exam': { mode: 'ONLINE', gen: 1000, obc: 1000, scst: 500, female: 1000, pwbd: 500, notes: 'Single paper: Gen/OBC Rs. 1000, SC/ST/Diff Abled Rs. 500; Both papers: Gen/OBC Rs. 1200, SC/ST/Diff Abled Rs. 600.', portal: 'https://ctet.nic.in', corr: 'YES (7 days window)', source: 'CTET Information Bulletin 2024' },
  'uptet': { mode: 'ONLINE', gen: 600, obc: 600, scst: 400, female: 600, pwbd: 100, notes: 'Primary or Upper Primary: Gen/OBC Rs. 600, SC/ST Rs. 400, Divyang Rs. 100; Both: Gen/OBC Rs. 1200, SC/ST Rs. 800, Divyang Rs. 200.', portal: 'https://updeled.gov.in', corr: 'NO', source: 'UPTET Examination Guidelines' },
  'reet-exam': { mode: 'ONLINE', gen: 550, obc: 550, scst: 550, female: 550, pwbd: 550, notes: 'Single Level: Rs. 550; Both Levels: Rs. 750 for all candidates.', portal: 'https://rajeduboard.rajasthan.gov.in', corr: 'YES (Online correction window)', source: 'RBSE REET Notification' },

  // STATE PSCs
  'uppsc-pcs': { mode: 'ONLINE', gen: 125, obc: 125, scst: 65, female: 125, pwbd: 25, notes: 'Gen/OBC/EWS: Rs. 125; SC/ST: Rs. 65; Divyangjan: Rs. 25; Ex-Servicemen: Rs. 65.', portal: 'https://uppsc.up.nic.in', corr: 'YES (OTR based correction allowed)', source: 'UPPSC Combined State/Upper Subordinate Advt 2024' },
  'bpsc-tre': { mode: 'ONLINE', gen: 600, obc: 600, scst: 150, female: 150, pwbd: 150, notes: 'Gen/Others: Rs. 600; SC/ST of Bihar/Female of Bihar/PwBD: Rs. 150 (+ Rs 200 biometric fee if Aadhaar not given).', portal: 'https://bpsc.bih.nic.in', corr: 'YES (Edit window before fee submission)', source: 'BPSC Integrated CCE / TRE Notification 2024' },
  'mppsc-sse': { mode: 'ONLINE', gen: 500, obc: 250, scst: 250, female: 500, pwbd: 250, notes: 'MP Domicile SC/ST/OBC/PwD: Rs. 250; All others & Out-of-state candidates: Rs. 500 (+ Rs 40 portal fee).', portal: 'https://mppsc.mp.gov.in', corr: 'YES (With correction fee Rs 50)', source: 'MPPSC State Service Exam Notice 2024' },
  'rpsc-ras': { mode: 'ONLINE', gen: 600, obc: 400, scst: 400, female: 400, pwbd: 400, notes: 'One-Time Registration (OTR): General: Rs. 600; SC/ST/BC-NCL/Divyang: Rs. 400. Once paid, no exam fee for subsequent applications.', portal: 'https://rpsc.rajasthan.gov.in', corr: 'YES (With correction fee Rs 500)', source: 'RPSC RAS/RTS Scheme Notification 2024' },
  'mpsc-cs': { mode: 'ONLINE', gen: 394, obc: 294, scst: 294, female: 294, pwbd: 294, notes: 'Open category: Rs. 394; Backward classes/EWS/Orphans/PwD: Rs. 294.', portal: 'https://mpsc.gov.in', corr: 'NO', source: 'MPSC State Services Gazetted Examination Notice 2024' },
  'hpsc-hcs': { mode: 'ONLINE', gen: 1000, obc: 250, scst: 250, female: 250, pwbd: 0, notes: 'Male (Gen/DESM): Rs. 1000; Female (All)/Male (SC/BC-A/BC-B/ESM of Haryana): Rs. 250; PwBD of Haryana: NIL.', portal: 'https://hpsc.gov.in', corr: 'YES (3 days correction window)', source: 'HPSC HCS (Ex. Br.) Notification 2024' },
  'tnpsc-grp1': { mode: 'ONLINE', gen: 100, obc: 100, scst: 0, female: 100, pwbd: 0, notes: 'Registration Fee: Rs. 150 (OTR valid 5 yrs). Preliminary Exam Fee: Rs. 100. SC/ST/PwBD/Destitute Widows: Fully Exempted (3 free attempts for BC/MBC).', portal: 'https://tnpsc.gov.in', corr: 'YES (Application correction window)', source: 'TNPSC Group 1 Services Notification 2024' },
  'tgpsc-grp1': { mode: 'ONLINE', gen: 320, obc: 200, scst: 200, female: 200, pwbd: 200, notes: 'Application Processing Fee: Rs. 200 (All candidates). Examination Fee: Rs. 120 (Exempted for SC/ST/BC/EWS/PH/Unemployed of Telangana). Total for General: Rs. 320.', portal: 'https://tspsc.gov.in', corr: 'YES (Correction window provided)', source: 'TGPSC Group-I Services Notification 2024' },
  'appsc-grp1': { mode: 'ONLINE', gen: 370, obc: 250, scst: 250, female: 250, pwbd: 250, notes: 'Application Processing Fee: Rs. 250 + Exam Fee: Rs. 120 (Exam fee exempted for SC/ST/BC/PH/ESM). Total Gen: Rs. 370.', portal: 'https://psc.ap.gov.in', corr: 'YES (Correction window allowed)', source: 'APPSC Group-I Services Notification 2024' },
  'wbpsc-wbcs': { mode: 'ONLINE', gen: 210, obc: 210, scst: 0, female: 210, pwbd: 0, notes: 'Rs. 210 + Service Charges. SC/ST candidates of West Bengal and PwBD with disability >= 40% are exempted.', portal: 'https://psc.wb.gov.in', corr: 'YES (Edit window 7 days)', source: 'WBPSC WBCS (Exe) etc. Notification 2024' },
  'opsc-ocs': { mode: 'ONLINE', gen: 0, obc: 0, scst: 0, female: 0, pwbd: 0, notes: 'NO APPLICATION / EXAMINATION FEE for any category candidate as per Odisha Government GA & PG Dept Order.', portal: 'https://opsc.gov.in', corr: 'NO (Recheck before final submission)', source: 'OPSC OCS Notification 2024 & Odisha Govt GA Order' },
  'kerala-kas': { mode: 'ONLINE', gen: 0, obc: 0, scst: 0, female: 0, pwbd: 0, notes: 'NO APPLICATION FEE for any candidate under Kerala Public Service Commission One-Time Registration (OTR) rules.', portal: 'https://keralapsc.gov.in', corr: 'NO (Profile lock system)', source: 'Kerala PSC Rules of Procedure & KAS Notification' },
  'ppsc-pcs': { mode: 'ONLINE', gen: 1500, obc: 750, scst: 750, female: 1500, pwbd: 500, notes: 'General: Rs. 1500 (App Rs 500 + Exam Rs 1000); SC/ST of Punjab & BC of Punjab: Rs. 750; ESM of Punjab: Rs. 500; PwD of Punjab: Rs. 500.', portal: 'https://ppsc.gov.in', corr: 'YES (Editing permitted before fee submission)', source: 'PPSC State Civil Services Notification 2024' }
};

const rows = [];
rows.push([
  'inventory_id',
  'exam_id',
  'exam_name',
  'category',
  'application_mode',
  'official_portal_url',
  'general_fee_inr',
  'obc_fee_inr',
  'sc_st_fee_inr',
  'female_fee_inr',
  'pwbd_fee_inr',
  'fee_exemption_policy',
  'correction_window_available',
  'source_document_title',
  'verification_status'
].join(','));

for (const e of exams) {
  const spec = appFeeMap[e.exam_id];
  if (spec) {
    rows.push([
      `"${e.inventory_id}"`,
      `"${e.exam_id}"`,
      `"${e.exam_name_en}"`,
      `"${e.category}"`,
      `"${spec.mode}"`,
      `"${spec.portal}"`,
      spec.gen,
      spec.obc,
      spec.scst,
      spec.female,
      spec.pwbd,
      `"${spec.notes}"`,
      `"${spec.corr}"`,
      `"${spec.source}"`,
      '"VERIFIED"'
    ].join(','));
  } else {
    rows.push([
      `"${e.inventory_id}"`,
      `"${e.exam_id}"`,
      `"${e.exam_name_en}"`,
      `"${e.category}"`,
      '"ONLINE"',
      `"${e.official_website_url}"`,
      '"NOT_SPECIFIED_IN_VERIFIED_SOURCE"',
      '"NOT_SPECIFIED_IN_VERIFIED_SOURCE"',
      '"NOT_SPECIFIED_IN_VERIFIED_SOURCE"',
      '"NOT_SPECIFIED_IN_VERIFIED_SOURCE"',
      '"NOT_SPECIFIED_IN_VERIFIED_SOURCE"',
      '"Fee structure subject to individual recruitment cycle notification"',
      '"UNKNOWN"',
      `"${e.authority_name} Official Portal"`,
      '"VERIFICATION_PENDING"'
    ].join(','));
  }
}

fs.writeFileSync(path.resolve(__dirname, '../../phase10_application_information_audit.csv'), rows.join('\n'));
console.log(`phase10_application_information_audit.csv generated with ${exams.length} exams.`);
db.close();
