const fs = require('fs');

// Extract MODAL_I18N and helper functions from public/js/app.js
const appJs = fs.readFileSync('public/js/app.js', 'utf8');

// Test each language
const supportedLangs = ['hi', 'en', 'hi-latn', 'bn', 'ta', 'te', 'mr', 'gu', 'kn', 'ml', 'pa', 'ur', 'or', 'sa'];

console.log('=== MULTILINGUAL BILINGUAL MODAL TEST ===\n');

// Mock localStorage and window
let simulatedLang = 'hi';
const localStorage = {
  getItem: (k) => simulatedLang
};
const currentLanguage = simulatedLang;

// Evaluate modal code in isolated context
const vm = require('vm');
const sandbox = {
  localStorage,
  currentLanguage,
  document: {
    getElementById: (id) => ({
      classList: { add: () => {}, remove: () => {} },
      appendChild: () => {}
    }),
    createElement: () => ({ classList: { add: () => {}, remove: () => {} } }),
    body: { appendChild: () => {} }
  },
  setTimeout: (fn) => fn(),
  console
};

const scriptCode = `
${appJs.substring(appJs.indexOf('const MODAL_I18N = {'), appJs.indexOf('function closeAppModal() {'))}

function testModal(lang, type) {
  currentLanguage = lang;
  localStorage.getItem = () => lang;

  const tpl = MODAL_I18N[type];
  const title = formatBilingualModalPair(lang, tpl.title, tpl.icon);
  const mainMsg = formatBilingualModalPair(lang, tpl.message_main);
  const subMsg = tpl.message_sub ? formatBilingualModalPair(lang, tpl.message_sub) : '';
  const cancel = formatBilingualModalPair(lang, tpl.cancelText);
  const confirm = formatBilingualModalPair(lang, tpl.confirmText);
  return { title, mainMsg, subMsg, cancel, confirm };
}
`;

vm.createContext(sandbox);
vm.runInContext(scriptCode, sandbox);

supportedLangs.forEach(lang => {
  const res = sandbox.testModal(lang, 'exit_quiz');
  console.log(`Language: [${lang.toUpperCase()}]`);
  console.log(`  Title:   ${res.title}`);
  console.log(`  Message: ${res.mainMsg}`);
  console.log(`  SubText: ${res.subMsg}`);
  console.log(`  Cancel:  ${res.cancel}`);
  console.log(`  Confirm: ${res.confirm}\n`);
});
