const fs = require('fs');
const vm = require('vm');

const sandbox = {
  console,
  Blob,
  URL: { createObjectURL(){ return 'blob:demo'; }, revokeObjectURL(){} },
  navigator: { language: 'en' },
  location: { hash: '#/overview' },
  localStorage: { getItem(){ return null; }, setItem(){} },
  CSS: { escape: value => String(value) },
  setTimeout(){ return 0; },
  clearTimeout(){},
  MutationObserver: class { observe(){} },
  document: {
    documentElement: { lang: 'en', dir: 'ltr' },
    getElementById(){ return { innerHTML:'', appendChild(){}, querySelector(){ return null; } }; },
    querySelector(){ return null; },
    querySelectorAll(){ return []; },
    addEventListener(){},
    createElement(){ return { className:'', innerHTML:'', style:{}, click(){}, remove(){}, set href(v){}, set download(v){} }; },
    body: { appendChild(){} }
  }
};
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync('data.js','utf8'), sandbox, { filename:'data.js' });
vm.runInContext(fs.readFileSync('v4-enhancements.js','utf8'), sandbox, { filename:'v4-enhancements.js' });

if (!sandbox.TRACEVAULT_V4) throw new Error('TRACEVAULT_V4 export missing');
if (sandbox.TRACEVAULT_V4.version !== '4.0') throw new Error('Unexpected v4 version');
if (sandbox.TRACEVAULT_V4.endpoints.length < 10) throw new Error('API endpoint coverage is incomplete');
if (sandbox.TRACEVAULT_V4.tests.length !== 6) throw new Error('Negative-test coverage mismatch');
if (sandbox.TRACEVAULT_V4.domains.length < 9) throw new Error('Technical-domain coverage mismatch');
const evidence = sandbox.TRACEVAULT_DEMO.evidence[0];
const pdf = sandbox.TRACEVAULT_V4.buildPdf(evidence);
if (!(pdf instanceof Blob) || pdf.size < 5000 || pdf.type !== 'application/pdf') throw new Error('PDF certificate generation failed');
for (const file of ['index.html','styles.css','v4.css','data.js','app.js','v4-enhancements.js','assets/rm-logo.svg']) {
  if (!fs.existsSync(file)) throw new Error(`Missing required file: ${file}`);
}
const index = fs.readFileSync('index.html','utf8');
for (const asset of ['styles.css','v4.css','data.js','app.js','v4-enhancements.js','assets/rm-logo.svg']) {
  if (!index.includes(asset)) throw new Error(`index.html does not reference ${asset}`);
}
console.log(JSON.stringify({
  status:'PASS',
  version:sandbox.TRACEVAULT_V4.version,
  endpoints:sandbox.TRACEVAULT_V4.endpoints.length,
  negative_tests:sandbox.TRACEVAULT_V4.tests.length,
  technical_domains:sandbox.TRACEVAULT_V4.domains.length,
  pdf_bytes:pdf.size
}));
