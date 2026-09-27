const fs = require('fs');

const examsDataTxt = fs.readFileSync('public/js/exams-data.js', 'utf8');
const vm = require('vm');
const sb = { window: {}, console: console };
sb.global = sb;
vm.createContext(sb);
vm.runInContext(examsDataTxt + '\n;global.EXAMS = typeof EXAMS_DATABASE !== "undefined" ? EXAMS_DATABASE : [];', sb);

const exams = sb.EXAMS;
console.log('Total in EXAMS_DATABASE:', exams.length);

const inventory = {
  school_boards: [],
  national_boards: [],
  state_boards: [],
  open_boards: [],
  entrance_exams: [],
  govt_exams: [],
  upsc: [],
  ssc: [],
  railway: [],
  banking: [],
  defence: [],
  police: [],
  teaching: [],
  state_govt_recruitment: [],
  university_entrance: [],
  professional_entrance: [],
  other_competitive: []
};

exams.forEach(e => {
  const id = e.id.toLowerCase();
  const name = e.name;
  const cat = e.category;
  
  if (cat === 'boards') {
    if (id.includes('cbse') || id.includes('cisce') || id.includes('icse')) {
      inventory.national_boards.push({ id, name, status: e.status, hasData: true });
    } else if (id.includes('nios')) {
      inventory.open_boards.push({ id, name, status: e.status, hasData: true });
    } else {
      inventory.state_boards.push({ id, name, state: e.state, status: e.status, hasData: true });
    }
  } else if (id.includes('upsc') || id.includes('civil-services') || id.includes('nda') || id.includes('cds')) {
    if (id.includes('nda') || id.includes('cds')) {
      inventory.defence.push({ id, name, status: e.status, hasData: true });
    } else {
      inventory.upsc.push({ id, name, status: e.status, hasData: true });
    }
  } else if (id.includes('ssc')) {
    inventory.ssc.push({ id, name, status: e.status, hasData: true });
  } else if (id.includes('railway') || id.includes('rrb')) {
    inventory.railway.push({ id, name, status: e.status, hasData: true });
  } else if (id.includes('bank') || id.includes('ibps') || id.includes('sbi') || id.includes('rbi')) {
    inventory.banking.push({ id, name, status: e.status, hasData: true });
  } else if (id.includes('agniveer') || id.includes('defence') || id.includes('afcat')) {
    inventory.defence.push({ id, name, status: e.status, hasData: true });
  } else if (id.includes('police') || cat === 'police') {
    inventory.police.push({ id, name, state: e.state, status: e.status, hasData: true });
  } else if (id.includes('tet') || id.includes('teaching') || id.includes('ctet') || id.includes('bpsc-tre') || id.includes('reet') || id.includes('ugc-net') || cat === 'teaching') {
    inventory.teaching.push({ id, name, status: e.status, hasData: true });
  } else if (cat === 'entrance') {
    if (id.includes('cuet')) {
      inventory.university_entrance.push({ id, name, status: e.status, hasData: true });
    } else if (id.includes('neet') || id.includes('jee') || id.includes('clat')) {
      inventory.entrance_exams.push({ id, name, status: e.status, hasData: true });
    } else {
      inventory.entrance_exams.push({ id, name, status: e.status, hasData: true });
    }
  } else {
    inventory.other_competitive.push({ id, name, cat, status: e.status, hasData: true });
  }
});

console.log(JSON.stringify(inventory, null, 2));
