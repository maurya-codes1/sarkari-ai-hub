const fs = require('fs');
const content = fs.readFileSync('./public/js/i18n.js', 'utf8');
const vm = require('vm');
const sandbox = {
  window: {},
  localStorage: { getItem: () => 'hi', setItem: () => {} },
  document: { addEventListener: () => {}, querySelectorAll: () => [], getElementById: () => null }
};
vm.runInNewContext(content + '; this.I18N_DATA = I18N_DATA;', sandbox);
console.log('I18N_DATA languages (' + Object.keys(sandbox.I18N_DATA).length + '):', Object.keys(sandbox.I18N_DATA));
