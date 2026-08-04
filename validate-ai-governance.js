const fs = require("node:fs");

const html = fs.readFileSync("index.html", "utf8");
const css = fs.readFileSync("ai-governance.css", "utf8");
const js = fs.readFileSync("ai-governance.js", "utf8");

const failures = [];
const assert = (condition, message) => { if (!condition) failures.push(message); };

assert(html.includes('href="ai-governance.css"'), "index.html does not load ai-governance.css");
assert(html.includes('src="ai-governance.js"'), "index.html does not load ai-governance.js");
assert(js.includes('const ROUTE = "ai-development-governance"'), "custom route is missing");
assert(js.includes('data-aig-route'), "navigation hook is missing");
assert(js.includes('Concept preview — not an operating monitoring service'), "English claim boundary is missing");
assert(js.includes('عرض تصوري — وليس خدمة مراقبة تشغيلية'), "Arabic claim boundary is missing");
assert(js.includes('production_ready: false'), "downloadable package must deny production readiness");
assert(js.includes('policy_enforcement: false'), "downloadable package must deny live policy enforcement");
assert(js.includes('backend_connected: false'), "downloadable package must deny backend connectivity");
assert(!/VirtusLab|visdom-ai|tracevault\.dev/i.test(`${html}\n${css}\n${js}`), "third-party branding or project names must not appear");
assert(!css.includes("!important"), "ai-governance.css must not use !important");
assert(!/font-weight\s*:\s*(?:8|9)00/.test(css), "font weights above 700 are not allowed");

const fontSizes = [...css.matchAll(/font-size\s*:\s*([0-9.]+)px/g)].map(match => Number(match[1]));
assert(fontSizes.length > 0, "no font-size declarations found");
assert(Math.min(...fontSizes) >= 11, `minimum font size is ${Math.min(...fontSizes)}px; expected at least 11px`);

const hashes = [...js.matchAll(/sha512:\s*"([a-f0-9]+)"/gi)].map(match => match[1]);
assert(hashes.length === 4, `expected 4 session SHA-512 values, found ${hashes.length}`);
hashes.forEach((hash, index) => {
  assert(hash.length === 128, `session hash ${index + 1} length is ${hash.length}; expected 128`);
  assert(/^[a-f0-9]{128}$/i.test(hash), `session hash ${index + 1} is not 128 hexadecimal characters`);
});

const requiredControls = ["models", "paths", "secrets", "tests", "approval", "evidence"];
requiredControls.forEach(control => assert(js.includes(`["${control}"`), `policy control ${control} is missing`));

const requiredStatuses = ["DESIGNED", "PLANNED", "FUTURE", "NOT STARTED"];
requiredStatuses.forEach(status => assert(js.includes(`"${status}"`), `roadmap status ${status} is missing`));

assert(js.includes("downloadPackage()"), "evidence-package generator is missing");
assert(js.includes("data-aig-session"), "interactive session rows are missing");
assert(js.includes("event.key === \"Enter\"") && js.includes("event.key === \" \""), "keyboard session-row activation is missing");
assert(css.includes('[dir="rtl"]'), "RTL rules are missing");
assert(css.includes("@media(max-width:820px)"), "responsive breakpoint is missing");

if (failures.length) {
  console.error("AI governance validation failed:");
  failures.forEach(failure => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("AI governance validation passed");
console.log(JSON.stringify({
  route: "ai-development-governance",
  session_hashes: hashes.map(hash => hash.length),
  minimum_font_size_px: Math.min(...fontSizes),
  important_declarations: 0,
  claim_boundary: "CONCEPT / PLANNED / NOT PRODUCTION",
  policy_controls: requiredControls.length,
  rtl: true,
  keyboard_accessible_rows: true
}, null, 2));
