const fs = require('fs');
const vm = require('vm');

const read = file => fs.readFileSync(file, 'utf8');
const css = read('styles.css');
const appSource = read('app.js');
const dataSource = read('data.js');
const index = read('index.html');

const fontSizes = [...css.matchAll(/font-size\s*:\s*([0-9.]+)px/g)].map(match => Number(match[1]));
const fontWeights = [...css.matchAll(/font-weight\s*:\s*([0-9]+)/g)].map(match => Number(match[1]));
const radiusValues = [...css.matchAll(/border-radius\s*:\s*([^;\n]+)/g)].map(match => match[1].trim());
const uniqueRadiusValues = [...new Set(radiusValues)].sort();

const elements = new Map();
const makeElement = id => ({
  id,
  innerHTML: '',
  className: '',
  dataset: {},
  style: {},
  appendChild() {},
  remove() {},
  focus() {},
  click() {},
  querySelector() { return null; },
  querySelectorAll() { return []; },
  closest() { return null; },
  setAttribute() {}
});
['app', 'modal-root', 'toast-root'].forEach(id => elements.set(id, makeElement(id)));

const sandbox = {
  console,
  Blob,
  URL,
  navigator: { language: 'en' },
  location: { hash: '#/overview', href: 'https://demo.tracevault.example/' },
  localStorage: { getItem() { return null; }, setItem() {} },
  setTimeout() { return 0; },
  clearTimeout() {},
  setInterval() { return 0; },
  clearInterval() {},
  open() { return null; },
  addEventListener() {},
  document: {
    title: '',
    documentElement: { lang: 'en', dir: 'ltr', dataset: {} },
    getElementById(id) { return elements.get(id) || makeElement(id); },
    addEventListener() {},
    createElement() { return makeElement('generated'); },
    body: { appendChild() {} }
  }
};
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(dataSource, sandbox, { filename: 'data.js' });
vm.runInContext(appSource, sandbox, { filename: 'app.js' });

const hashes = sandbox.TRACEVAULT_DEMO.evidence.map(item => item.hash);
if (hashes.length !== 5) throw new Error(`Expected 5 evidence hashes, found ${hashes.length}`);
for (const [index, hash] of hashes.entries()) {
  if (!/^[a-f0-9]{128}$/i.test(hash)) throw new Error(`Evidence hash ${index + 1} is not a valid 128-character SHA-512 hex value`);
}

if (!sandbox.RM_TRACEVAULT_DEMO) throw new Error('Runtime export missing');
if (sandbox.RM_TRACEVAULT_DEMO.APP_VERSION !== '4.0') throw new Error('APP_VERSION mismatch');
const certificate = sandbox.RM_TRACEVAULT_DEMO.buildCertificateHtml(sandbox.TRACEVAULT_DEMO.evidence[0]);
if (!certificate.includes('v4.0') || !certificate.includes('SHA-512') || !certificate.includes('window.print')) {
  throw new Error('Printable certificate HTML is incomplete');
}

const checks = {
  min_font_size_px: Math.min(...fontSizes),
  max_font_weight: Math.max(...fontWeights),
  weights_below_700: [...new Set(fontWeights.filter(weight => weight < 700))].sort(),
  hash_lengths: hashes.map(hash => hash.length),
  border_radius_value_count: uniqueRadiusValues.length,
  border_radius_values: uniqueRadiusValues,
  focus_visible_count: (css.match(/:focus-visible/g) || []).length,
  rtl_rule_count: (css.match(/\[dir="rtl"\]/g) || []).length,
  important_count: [css, appSource, dataSource, index].reduce((total, value) => total + (value.match(/!important/g) || []).length, 0),
  verify_current_rendered: (appSource.match(/"verify-current"/g) || []).length >= 2,
  html_certificate_present: appSource.includes('buildCertificateHtml'),
  legacy_pdf_generator_absent: !appSource.includes('buildCertificatePdf') && !appSource.includes('pdfSanitize'),
  legacy_css_reference_absent: !index.includes('v4.css'),
  legacy_js_reference_absent: !index.includes('v4-enhancements.js'),
  font_links_present: index.includes('fonts.googleapis.com') && index.includes('IBM+Plex+Sans+Arabic'),
  title_uses_version_constant: sandbox.document.title.endsWith('v4.0'),
  certificate_uses_version_constant: certificate.includes('Enterprise Demo v4.0')
};

if (checks.min_font_size_px < 11) throw new Error(`Minimum font size is ${checks.min_font_size_px}px`);
if (checks.max_font_weight > 700) throw new Error(`Maximum font weight is ${checks.max_font_weight}`);
if (checks.weights_below_700.length === 0) throw new Error('No font weights below 700 are used');
if (checks.border_radius_value_count > 4) throw new Error(`Too many border-radius values: ${checks.border_radius_value_count}`);
if (checks.focus_visible_count === 0) throw new Error('No :focus-visible rule found');
if (checks.rtl_rule_count === 0) throw new Error('No [dir="rtl"] rules found');
if (checks.important_count !== 0) throw new Error('!important remains in active files');
if (!checks.verify_current_rendered) throw new Error('verify-current is not rendered in both required locations');
if (!checks.html_certificate_present || !checks.legacy_pdf_generator_absent) throw new Error('Certificate migration is incomplete');
if (!checks.legacy_css_reference_absent || !checks.legacy_js_reference_absent) throw new Error('Legacy v4 layers are still referenced');
if (!checks.font_links_present) throw new Error('Required web fonts are not loaded');
if (!checks.title_uses_version_constant || !checks.certificate_uses_version_constant) throw new Error('Version is inconsistent');

console.log(JSON.stringify({ status: 'PASS', ...checks }, null, 2));
