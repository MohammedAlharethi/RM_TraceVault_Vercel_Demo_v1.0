(() => {
  "use strict";

  const DATA = window.TV4_DATA;
  const root = document.getElementById("app");
  const modalRoot = document.getElementById("modal-root");
  const toastRoot = document.getElementById("toast-root");

  const state = {
    lang: localStorage.getItem("tv4_lang") || "en",
    dark: localStorage.getItem("tv4_theme") === "dark",
    loggedIn: sessionStorage.getItem("tv4_entered") === "1",
    sidebarOpen: false,
    selectedEvidenceId: DATA.evidence[0].id,
    evidenceTab: "custody",
    attempts: {},
    dynamicAudit: [],
    selectedApi: 0,
    apiResponse: null,
    aiReviews: {},
    legalHoldOverrides: {},
    splashDone: false
  };

  const COPY = {
    en: {
      overview: "Executive Overview", vault: "Evidence Vault", ingestion: "Ingestion & Connectors", cases: "Case Workspace", search: "Search & Review", ai: "AI Analysis — Phase 2", exports: "Exports & Verification", audit: "Audit Center", security: "Security Operations", tenants: "Tenant & Access", api: "API Explorer", maturity: "Capability Maturity", architecture: "Sovereign Architecture", platform: "PLATFORM", governance: "GOVERNANCE", assurance: "ASSURANCE", enter: "Enter Secure Demo", launch: "Launch Enterprise Demo", banner: "This public concept demonstration uses fictional data and simulated controls. It does not process real evidence and does not claim production acceptance, certification, compliance, or court admissibility.", demo: "PUBLIC CONCEPT DEMO", guided: "Guided Tour", verify: "Verify Integrity", certificate: "Download PDF Certificate", package: "Generate Evidence Package", delete: "Attempt Protected Deletion", modify: "Attempt Protected Modification", legalHold: "Legal Hold", applied: "Applied", notApplied: "Not applied"
    },
    ar: {
      overview: "النظرة التنفيذية", vault: "خزنة الأدلة", ingestion: "إدخال الأدلة والموصلات", cases: "مساحة القضايا", search: "البحث والمراجعة", ai: "تحليل الأدلة بالذكاء الاصطناعي — المرحلة الثانية", exports: "التصدير والتحقق", audit: "مركز التدقيق", security: "العمليات الأمنية", tenants: "المؤسسات والصلاحيات", api: "مستكشف الواجهات البرمجية", maturity: "نضج القدرات", architecture: "المعمارية السيادية", platform: "المنصة", governance: "الحوكمة", assurance: "الضمان والقبول", enter: "الدخول إلى الديمو الآمن", launch: "تشغيل الديمو المؤسسي", banner: "هذه بيئة عرض عامة تستخدم بيانات افتراضية وضوابط محاكاة. لا تعالج أدلة حقيقية ولا تدّعي قبولًا إنتاجيًا أو اعتمادًا أو امتثالًا أو قبولًا قضائيًا.", demo: "ديمو مفاهيمي عام", guided: "جولة تعريفية", verify: "التحقق من السلامة", certificate: "استخراج شهادة PDF", package: "إنشاء حزمة الدليل", delete: "محاولة حذف الدليل", modify: "محاولة تعديل الدليل", legalHold: "الحجز القانوني", applied: "مطبق", notApplied: "غير مطبق"
    }
  };

  const ICONS = {
    overview:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
    database:'<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/>',
    upload:'<path d="M12 16V4M7 9l5-5 5 5M4 20h16"/>',
    cases:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2M3 12h18M10 12v2h4v-2"/>',
    search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
    ai:'<path d="M12 2l1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8L12 2z"/><path d="M5 16l.9 2.1L8 19l-2.1.9L5 22l-.9-2.1L2 19l2.1-.9L5 16z"/>',
    package:'<path d="M21 8l-9-5-9 5 9 5 9-5z"/><path d="M3 8v8l9 5 9-5V8M12 13v8"/>',
    audit:'<path d="M4 4h16v16H4z"/><path d="M8 9h8M8 13h8M8 17h5"/>',
    shield:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-5"/>',
    building:'<path d="M4 21V4h11v17M15 9h5v12M8 8h3M8 12h3M8 16h3M18 13h1M18 17h1M2 21h20"/>',
    code:'<path d="M8 9l-3 3 3 3M16 9l3 3-3 3M14 5l-4 14"/>',
    maturity:'<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    layers:'<path d="M12 2l9 5-9 5-9-5 9-5z"/><path d="M3 12l9 5 9-5M3 17l9 5 9-5"/>',
    menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',
    bell:'<path d="M18 8a6 6 0 00-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',
    moon:'<path d="M21 12.8A9 9 0 1111.2 3 7 7 0 0021 12.8z"/>',
    sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
    play:'<circle cx="12" cy="12" r="9"/><path d="M10 8l6 4-6 4V8z"/>',
    close:'<path d="M6 6l12 12M18 6L6 18"/>',
    logout:'<path d="M10 17l5-5-5-5M15 12H3M15 4h5v16h-5"/>',
    file:'<path d="M5 3h9l5 5v13H5V3z"/><path d="M14 3v5h5M8 13h8M8 17h6"/>',
    video:'<rect x="3" y="6" width="14" height="12" rx="2"/><path d="M17 10l4-2v8l-4-2"/>',
    fingerprint:'<path d="M12 11a3 3 0 00-3 3c0 3-1 5-2 6M15 14a6 6 0 01-2 5M6 14a6 6 0 0112 0c0 4-1 6-2 7M8 9a6 6 0 018-1M5 8a9 9 0 0114 1"/>',
    lock:'<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 018 0v3M12 14v3"/>',
    key:'<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M15 8l3 3M17 6l2 2"/>',
    clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    scale:'<path d="M12 3v18M5 7h14M7 7l-4 7h8L7 7zM17 7l-4 7h8l-4-7z"/>',
    users:'<path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>',
    globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 010 18M12 3a15 15 0 000 18"/>',
    harddrive:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 15h.01M11 15h6M7 9h10"/>',
    activity:'<path d="M3 12h4l2-5 4 10 2-5h6"/>',
    filter:'<path d="M4 5h16M7 12h10M10 19h4"/>',
    trash:'<path d="M3 6h18M8 6V4h8v2M6 6l1 15h10l1-15M10 10v7M14 10v7"/>',
    edit:'<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 013 3L8 18l-4 1 1-4L16.5 3.5z"/>',
    warning:'<path d="M10.3 3.5L2.7 17a2 2 0 001.8 3h15a2 2 0 001.8-3L13.7 3.5a2 2 0 00-3.4 0z"/><path d="M12 9v4M12 17h.01"/>',
    check:'<path d="M5 12l4 4L19 6"/>',
    download:'<path d="M12 3v12M7 10l5 5 5-5M4 21h16"/>',
    link:'<path d="M10 13a5 5 0 007.1 0l2-2a5 5 0 00-7.1-7.1l-1.1 1.1"/><path d="M14 11a5 5 0 00-7.1 0l-2 2A5 5 0 0012 20.1l1.1-1.1"/>',
    refresh:'<path d="M20 11a8 8 0 10-2 5.5M20 4v7h-7"/>',
    eye:'<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z"/><circle cx="12" cy="12" r="2.5"/>',
    server:'<rect x="3" y="4" width="18" height="6" rx="2"/><rect x="3" y="14" width="18" height="6" rx="2"/><path d="M7 7h.01M7 17h.01M11 7h6M11 17h6"/>'
  };

  const nav = [
    ["platform", [["overview","overview"],["vault","database"],["ingestion","upload"],["cases","cases"],["search","search"],["ai","ai"],["exports","package"]]],
    ["governance", [["audit","audit"],["security","shield"],["tenants","building"],["api","code"]]],
    ["assurance", [["maturity","maturity"],["architecture","layers"]]]
  ];

  function tr(key){ return (COPY[state.lang] && COPY[state.lang][key]) || COPY.en[key] || key; }
  function esc(value){ return String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }
  function icon(name, cls=""){ return `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true" stroke-linecap="round" stroke-linejoin="round">${ICONS[name] || ICONS.info}</svg>`; }
  function toneForStatus(status){ const s=String(status).toUpperCase(); if(s.includes("VERIFIED")||s.includes("SUCCESS")||s.includes("ACTIVE")||s.includes("CONNECTED")||s.includes("COMPLETE")||s.includes("PROTECTED")||s.includes("VALID")) return "green"; if(s.includes("BLOCK")||s.includes("FAIL")||s.includes("ERROR")||s.includes("CRITICAL")||s.includes("NOT CLAIMED")) return "red"; if(s.includes("PHASE 2")||s.includes("PENDING")||s.includes("HIGH")||s.includes("REVIEW")) return "amber"; if(s.includes("DESIGNED")||s.includes("FUTURE")) return s.includes("DESIGNED")?"purple":"gray"; return "blue"; }
  function badge(text, tone){ return `<span class="badge ${tone || toneForStatus(text)}">${esc(text)}</span>`; }
  function button(text, action, style="", ic="", extra=""){ return `<button class="btn ${style}" data-action="${esc(action)}" ${extra}>${ic?icon(ic):""}<span>${esc(text)}</span></button>`; }
  function nowAst(){ return new Date().toLocaleString("en-GB",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:false})+" AST"; }
  function selectedEvidence(){ return DATA.evidence.find(e=>e.id===state.selectedEvidenceId) || DATA.evidence[0]; }
  function currentRoute(){ const raw=location.hash.replace(/^#\/?/,"") || "overview"; const [page,id] = raw.split("/"); if(page==="evidence" && id) state.selectedEvidenceId=id; return {page,id}; }
  function dynamicCustody(id){ return state.attempts[id] || []; }
  function legalHoldState(e){ return Object.prototype.hasOwnProperty.call(state.legalHoldOverrides,e.id) ? state.legalHoldOverrides[e.id] : e.legalHold; }

  function splash(){ return `<div class="splash ${state.splashDone?"hidden":""}" id="splash"><div class="splash-card"><img class="splash-logo" src="assets/rm-logo-v4.svg" alt="RM"/><h1>RM TraceVault</h1><p>TRACE. SECURE. PRESERVE.</p><div class="loader"></div></div></div>`; }

  function loginPage(){
    return `${splash()}<section class="login"><div class="login-brand"><img class="login-wordmark" src="assets/rm-wordmark-v4.svg" alt="RM TraceVault"/><div class="login-copy"><div class="login-kicker">${esc(DATA.product.descriptor)}</div><h1>${state.lang==="ar"?"ذاكرة قانونية. مختومة إلى الأبد.":"Legal memory. Sealed forever."}</h1><p>${state.lang==="ar"?"تجربة مؤسسية توضح حفظ الأدلة الرقمية، سلامتها، عهدة الحيازة، والعرض القابل للتحقق داخل نموذج سيادي.":"An enterprise product experience for digital evidence preservation, integrity, chain of custody and portable verification within a sovereign target design."}</p><div class="login-trust"><div>IMMUTABLE</div><div>VERIFIABLE</div><div>TRACEABLE</div><div>TENANT-ISOLATED</div></div></div><div class="demo-pill">${tr("demo")} · ${DATA.product.version}</div></div><div class="login-panel-wrap"><div class="login-panel"><h2>${tr("launch")}</h2><p>${state.lang==="ar"?"الدخول مخصص لعرض الفكرة باستخدام بيانات افتراضية فقط.":"This access screen launches a fictional, public-safe product demonstration."}</p><label class="form-label">Organization</label><input class="form-input" value="Demo Organization Alpha" readonly/><label class="form-label">Presentation profile</label><select class="form-input"><option>Enterprise customer & investor walkthrough</option><option>Technical architecture walkthrough</option><option>Evidence lifecycle walkthrough</option></select><div class="login-note">${tr("banner")}</div><div class="login-actions">${button(tr("enter"),"enter-demo","primary","shield")}${button(state.lang==="ar"?"English":"العربية","toggle-lang","","globe")}</div><div class="login-footer">RM TraceVault · ${DATA.product.release} · Public demonstration</div></div></div></section>`;
  }

  function navHtml(active){ return nav.map(([group,items])=>`<div class="nav-group">${tr(group)}</div>${items.map(([id,ic])=>`<button class="nav-btn ${active===id?"active":""}" data-route="${id}">${icon(ic)}<span>${tr(id)}</span>${active===id?'<span class="nav-state">●</span>':""}</button>`).join("")}`).join(""); }

  function shell(content, active){
    const rtl=state.lang==="ar"?"rtl":"";
    return `<div class="shell ${rtl}"><aside class="sidebar ${state.sidebarOpen?"open":""}"><div class="brand"><img src="assets/rm-wordmark-v4.svg" alt="RM TraceVault"/><div class="brand-sub">${state.lang==="ar"?"منصة سعودية سيادية لحيازة الأدلة الرقمية":"Saudi Sovereign Digital Evidence Custody Platform"}</div><div class="demo-pill">${tr("demo")}</div></div><nav class="nav">${navHtml(active)}</nav><div class="sidebar-foot"><div class="region-card"><strong>${state.lang==="ar"?"النطاق المستهدف: المملكة العربية السعودية":"Target boundary: Saudi Arabia"}</strong><small>${state.lang==="ar"?"هوية المستأجر، البيانات، النتائج المشتقة، السجلات والنسخ الاحتياطية ضمن حدود الإنتاج المعتمدة.":"Tenant identity, evidence, derived results, logs and backups remain inside the approved target boundary."}</small></div></div></aside><main class="main"><header class="topbar"><div class="top-left"><button class="icon-btn mobile-menu" data-action="toggle-sidebar">${icon("menu")}</button><div class="tenant-switcher"><div class="tenant-avatar">DA</div><div class="tenant-copy"><strong>${esc(DATA.tenant.name)}</strong><small>${esc(DATA.tenant.plan)} · ${esc(DATA.tenant.region)}</small></div></div></div><div class="top-actions"><button class="icon-btn" data-action="guided-tour" title="Guided tour">${icon("play")}</button><button class="icon-btn" data-action="toggle-theme" title="Theme">${icon(state.dark?"sun":"moon")}</button><button class="icon-btn" title="Notifications">${icon("bell")}</button><button class="lang-btn" data-action="toggle-lang">${state.lang==="ar"?"EN":"عربي"}</button><div class="user"><div class="user-avatar">RM</div><div class="user-copy"><strong>Demo Administrator</strong><small>Public presentation</small></div></div><button class="icon-btn" data-action="logout" title="Exit demo">${icon("logout")}</button></div></header><div class="content"><div class="public-notice">${icon("info")}<span>${tr("banner")}</span></div>${content}</div></main></div>`;
  }

  function pageHead(kicker,title,desc,actions=""){ return `<header class="page-head"><div><div class="kicker">${esc(kicker)}</div><h1>${esc(title)}</h1><p>${esc(desc)}</p></div><div class="page-actions">${actions}</div></header>`; }
  function card(title,subtitle,body,side="",cls=""){ return `<article class="card ${cls}"><header class="card-head"><div><h3>${esc(title)}</h3>${subtitle?`<p>${esc(subtitle)}</p>`:""}</div>${side}</header><div class="card-body">${body}</div></article>`; }
  function control(ic,title,detail,status="ACTIVE"){ return `<div class="control"><div class="control-icon">${icon(ic)}</div><div class="control-copy"><strong>${esc(title)}</strong><small>${esc(detail)}</small></div>${badge(status)}</div>`; }

  function overviewPage(){
    const kpis=[["database",DATA.tenant.evidenceObjects.toLocaleString(),"Evidence objects","100% illustrative"],["cases",DATA.tenant.activeCases,"Active cases","Fictional"],["harddrive",`${DATA.tenant.storageUsedTb} TB`,"Storage used",`${DATA.tenant.storageAllowanceTb} TB allowance`],["fingerprint",`${DATA.tenant.integrityRate}%`,"Integrity verified","Demo records"],["scale",DATA.tenant.legalHolds,"Legal Holds","Policy enforced"],["package",DATA.tenant.pendingExports,"Pending exports","Controlled"]];
    const sourceRows=DATA.connectors.slice(0,5).map(c=>`<tr><td><strong>${esc(c.name)}</strong><div class="mono">${esc(c.id)}</div></td><td>${esc(c.detail)}</td><td>${esc(c.volume)}</td><td>${badge(c.status)}</td><td>${badge(c.capability)}</td></tr>`).join("");
    return shell(`<section class="hero"><div><div class="hero-brand"><img src="assets/rm-logo-v4.svg" alt="RM"/><span>${esc(DATA.product.descriptor)}</span></div><h2>${state.lang==="ar"?"الدليل يبقى أصليًا، محميًا، وقابلًا للتحقق.":"Evidence remains original, protected and independently verifiable."}</h2><p>${state.lang==="ar"?"يعرض هذا الديمو رحلة الدليل من الاستقبال والتحقق والتشفير والحفظ غير القابل للتعديل إلى عهدة الحيازة والتصدير الفني.":"This demo represents the evidence lifecycle from controlled intake, validation and encryption to immutable preservation, chain of custody and technical export."}</p><div class="hero-actions">${button(state.lang==="ar"?"استكشف الدليل المحمي":"Explore Protected Evidence","open-first-evidence","primary","database")}${button(tr("guided"),"guided-tour","","play")}</div></div><aside class="hero-side"><div class="hero-side-head"><div class="hero-side-icon">${icon("shield")}</div><div><strong>${state.lang==="ar"?"نموذج ثقة الأدلة":"Evidence trust model"}</strong><small>WHO · WHEN · WHAT · INTEGRITY · IMMUTABILITY</small></div></div><div class="trust-pills"><div>SHA-512</div><div>COMPLIANCE WORM</div><div>AES-256-GCM</div><div>SIGNED CUSTODY</div><div>TENANT CONTEXT</div><div>SAUDI TARGET</div></div></aside></section><section class="kpi-grid">${kpis.map(k=>`<article class="kpi"><div class="kpi-top"><div class="kpi-icon">${icon(k[0])}</div><span class="kpi-note">${esc(k[3])}</span></div><strong>${esc(k[1])}</strong><span>${esc(k[2])}</span></article>`).join("")}</section><section class="grid two">${card("Trust controls","Illustrative posture for public demonstration",`<div class="controls">${control("lock","Immutable Evidence Vault","Compliance Mode behavior represented","DEMO SIMULATION")}${control("fingerprint","Integrity Verification","Whole-evidence SHA-512 response represented","DEMO SIMULATION")}${control("key","Provider-Separated Key Custody","Target architecture without real cryptographic material","DESIGNED")}${control("users","Tenant-Aware Authorization","Cross-tenant rejection and RBAC represented","DEMO SIMULATION")}${control("link","Signed Chain of Custody","Append-only event sequence represented","DEMO SIMULATION")}${control("clock","Trusted Timestamping","RFC 3161 token state represented","DESIGNED")}</div>`,badge("Claim-controlled","blue"))}${card("Capability status","The public demo distinguishes represented behavior from production acceptance",`<div class="controls">${DATA.capabilityLegend.map(x=>control("info",x.status,x.meaning,x.status)).join("")}</div>`,badge("No certification claim","red"))}</section><section class="grid two"><article class="card"><header class="card-head"><div><h3>Evidence source activity</h3><p>Public-safe fictional connector inventory</p></div>${badge("Tenant filtered")}</header><div class="card-body flush"><div class="table-wrap"><table class="data-table"><thead><tr><th>Source</th><th>Scope</th><th>Volume</th><th>State</th><th>Capability</th></tr></thead><tbody>${sourceRows}</tbody></table></div></div></article><article class="certificate"><img src="assets/rm-wordmark-v4.svg" alt="RM TraceVault"/><h3>Evidence Integrity & Chain-of-Custody Certificate</h3><p>Generate a real PDF from this static demonstration containing evidence metadata, SHA-512 fingerprint, immutable-retention state, encryption profile and custody-event summary.</p><div class="cert-fields"><div class="cert-field"><span>Evidence</span><strong>EV-DEMO-0001</strong></div><div class="cert-field"><span>Integrity</span><strong>VERIFIED</strong></div><div class="cert-field"><span>Custody</span><strong>7 SIGNED EVENTS</strong></div><div class="cert-field"><span>Certificate</span><strong>CERT-EV-DEMO-0001</strong></div></div>${button(tr("certificate"),"download-certificate","primary","download")}</article></section>`,"overview");
  }

  function evidenceTable(records){
    return `<div class="table-wrap"><table class="data-table"><thead><tr><th>Evidence</th><th>Source</th><th>Case</th><th>Size</th><th>Integrity</th><th>Retention</th><th>Legal Hold</th><th>Custody</th></tr></thead><tbody>${records.map(e=>`<tr class="clickable" data-evidence="${esc(e.id)}"><td><div class="file-cell"><div class="file-icon">${icon(e.type==="Video"?"video":"file")}</div><div><strong>${esc(e.title)}</strong><small>${esc(e.id)} · ${esc(e.mime)}</small></div></div></td><td>${esc(e.source)}</td><td><strong>${esc(e.caseId)}</strong><div class="mono">${esc(e.caseName)}</div></td><td>${esc(e.size)}</td><td>${badge(e.integrity)}</td><td>${esc(e.retentionEnd)}</td><td>${badge(legalHoldState(e)?"APPLIED":"NOT APPLIED",legalHoldState(e)?"amber":"gray")}</td><td>${badge(`${e.custody.length+dynamicCustody(e.id).length} EVENTS`,"blue")}</td></tr>`).join("")}</tbody></table></div>`;
  }

  function vaultPage(){
    return shell(`${pageHead("EVIDENCE CUSTODY",tr("vault"),state.lang==="ar"?"سجل مركزي للأدلة المحمية مع حالة السلامة والاحتفاظ والحجز القانوني وعهدة الحيازة.":"A central inventory of protected evidence with integrity, retention, Legal Hold and custody status.",button("Simulate Evidence Intake","simulate-ingestion","primary","upload"))}<div class="tools"><div class="searchbox">${icon("search")}<input id="vault-search" placeholder="Search by evidence ID, filename, source or case"/></div><button class="filter active" data-filter="all">All</button><button class="filter" data-filter="verified">Verified</button><button class="filter" data-filter="hold">Legal Hold</button><button class="filter" data-filter="video">Video</button><button class="filter" data-filter="document">Documents</button></div><article class="card"><header class="card-head"><div><h3>Evidence inventory</h3><p>${DATA.evidence.length} fictional records · authorization-filtered</p></div>${badge("DEMO SIMULATION")}</header><div class="card-body flush" id="vault-table">${evidenceTable(DATA.evidence)}</div></article>`,"vault");
  }

  function evidenceTabs(e){
    const custody=[...e.custody,...dynamicCustody(e.id)];
    if(state.evidenceTab==="custody") return `<div class="timeline">${custody.map(ev=>`<div class="timeline-item"><i class="timeline-dot"></i><strong>${esc(ev.action)}</strong><p>${esc(ev.detail)} · Reason: ${esc(ev.reason||"Recorded control event")}</p><time>${esc(ev.time)} · ${esc(ev.actor)}</time><span class="timeline-status">${badge(ev.signature||ev.status||"LOGGED")}</span></div>`).join("")}</div>`;
    if(state.evidenceTab==="versions") return e.versions.map(v=>`<div class="version-row"><div class="control-icon">${icon("database")}</div><div class="control-copy"><strong>${esc(v.version)} · ${esc(v.objectId)}</strong><small>${esc(v.created)} · ${esc(v.status)}</small></div>${badge("IMMUTABLE")}</div>`).join("");
    if(state.evidenceTab==="crypto") return `<div class="controls">${control("key","Algorithm",e.encryption.algorithm,"DESIGNED")}${control("harddrive","Chunk profile",e.encryption.chunkSize,"DESIGNED")}${control("fingerprint","Integrity digest","SHA-512 over complete original byte stream","DEMO SIMULATION")}${control("link","Authenticated context",e.encryption.aad,"DESIGNED")}${control("shield","Key custody",e.encryption.keyCustody,"DESIGNED")}${control("lock","Plaintext DEK persisted",e.encryption.plaintextDekStored?"Yes":"No — prohibited by target design",e.encryption.plaintextDekStored?"ERROR":"DESIGNED")}</div>`;
    return `<div class="controls">${control("clock","Timestamp profile",e.timestamp.profile,"DESIGNED")}${control("shield","Token state",e.timestamp.status,"DEMO SIMULATION")}${control("database","Object Lock mode",e.immutable.mode,"DEMO SIMULATION")}${control("link","Versioning",e.immutable.versioning?"Enabled":"Disabled","DEMO SIMULATION")}${control("trash","DeleteObject",e.immutable.deleteSupported?"Supported":"Unsupported under WORM","DEMO SIMULATION")}${control("scale","Legal Hold",legalHoldState(e)?"Applied":"Not applied",legalHoldState(e)?"DEMO SIMULATION":"DESIGNED")}</div>`;
  }

  function evidencePage(){
    const e=selectedEvidence();
    const custodyCount=e.custody.length+dynamicCustody(e.id).length;
    const tabs=[["custody","Chain of Custody"],["versions","Version History"],["crypto","Encryption Profile"],["policy","Retention & Timestamp"]];
    return shell(`${pageHead("EVIDENCE RECORD",`${e.id} · ${e.title}`,`${e.caseId} · ${e.caseName}`,`${button(tr("verify"),"verify-evidence","primary","fingerprint")}${button(tr("certificate"),"download-certificate","","download")}${button(tr("package"),"go-exports","dark","package")}`)}<section class="evidence-layout"><article class="card"><header class="card-head"><div><h3>Protected evidence preview</h3><p>${esc(e.source)} · ${esc(e.sourceDetail)}</p></div>${badge(e.status)}</header><div class="card-body"><div class="preview">${e.type==="Video"?`<div class="camera"><div class="preview-watermark">RM TRACEVAULT · DEMO</div><div class="preview-foot"><span>${esc(e.id)}</span><span>${esc(e.collected)}</span></div></div>`:`<div style="position:relative;z-index:1;text-align:center;max-width:70%"><div class="file-icon" style="margin:auto;width:64px;height:64px">${icon("file")}</div><h3>${esc(e.title)}</h3><p style="color:#a8bed8;font-size:11px">Secure ${esc(e.type)} preview placeholder · watermark enforced</p><div class="preview-watermark">RM TRACEVAULT · DEMO</div></div>`}</div><div class="meta-grid">${[["Evidence ID",e.id],["Type",`${e.type} · ${e.mime}`],["File size",e.size],["Collected",e.collected],["Retention end",e.retentionEnd],["Legal Hold",legalHoldState(e)?tr("applied"):tr("notApplied")]].map(([k,v])=>`<div class="meta-item"><span>${esc(k)}</span><strong>${esc(v)}</strong></div>`).join("")}</div></div></article><aside class="grid" style="margin-top:0"><article class="card"><header class="card-head"><div><h3>Evidence trust score</h3><p>Integrity, preservation and custody posture</p></div></header><div class="card-body"><div class="score"><div class="score-ring"><strong>${e.trustScore}</strong></div><div><h3>Evidence verified and protected</h3><p>All represented checks pass; no custody gap is present in the fictional record.</p></div></div><div class="controls" style="grid-template-columns:1fr;margin-top:12px">${control("fingerprint","SHA-512",e.integrity,"DEMO SIMULATION")}${control("lock","Immutable retention",e.immutable.mode,"DEMO SIMULATION")}${control("shield","Custody signatures",`${custodyCount} events represented`,`DEMO SIMULATION`)}${control("key","Encryption",`${e.encryption.algorithm} · ${e.encryption.chunkSize}`,"DESIGNED")}</div></div></article><article class="action-lab"><h3>Tamper-resistance lab</h3><p>Every negative test must fail explicitly while the protected evidence remains unchanged.</p><div class="action-grid">${button(tr("delete"),"attempt-delete","danger","trash")}${button(tr("modify"),"attempt-modify","danger","edit")}${button("Remove encrypted chunk","attempt-missing-chunk","warning","warning")}${button("Reorder encrypted chunks","attempt-reorder","warning","warning")}${button("Cross-evidence substitution","attempt-substitution","warning","warning")}${button("Cross-tenant access","attempt-cross-tenant","danger","users")}</div><div class="lab-note">Blocked attempts are appended to the demo audit trail and custody timeline; they do not mutate the evidence object.</div></article></aside></section><section class="grid two">${card("Whole-evidence integrity fingerprint","SHA-512 over the complete original byte stream",`<div class="hashbox"><header><span>SHA-512</span>${badge("MATCH")}</header><code>${esc(e.hash)}</code></div>`,badge("VERIFIED"))}<article class="certificate"><img src="assets/rm-wordmark-v4.svg" alt="RM TraceVault"/><h3>Integrity & Chain-of-Custody Certificate</h3><p>A downloadable PDF summarizing evidence identity, SHA-512, WORM state, encryption profile, timestamp state and custody history.</p><div class="cert-fields"><div class="cert-field"><span>Certificate ID</span><strong>CERT-${esc(e.id)}</strong></div><div class="cert-field"><span>Custody events</span><strong>${custodyCount}</strong></div><div class="cert-field"><span>Verification</span><strong>${esc(e.verified)}</strong></div><div class="cert-field"><span>Result</span><strong>INTEGRITY VERIFIED</strong></div></div>${button(tr("certificate"),"download-certificate","primary","download")}</article></section><article class="card" style="margin-top:15px"><div class="tabs">${tabs.map(([id,label])=>`<button class="tab ${state.evidenceTab===id?"active":""}" data-tab="${id}">${esc(label)}</button>`).join("")}</div><div class="card-body" id="evidence-tab-body">${evidenceTabs(e)}</div></article><section class="grid two">${card("Legal Hold workflow","Two-person approval is represented for release of a hold",`${control("scale","Current state",legalHoldState(e)?"Legal Hold applied":"No active Legal Hold",legalHoldState(e)?"DEMO SIMULATION":"DESIGNED")}<div style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap">${legalHoldState(e)?button("Request Hold Release","request-hold-release","warning","scale"):button("Apply Legal Hold","apply-hold","primary","scale")}</div>`)}${card("Authorized retrieval","Read-only streaming and short-lived access controls",`${control("eye","Secure preview","Watermarked, audited and authorization-filtered","DEMO SIMULATION")}${control("clock","Presigned URL","TTL-bound and tenant-aware","DEMO SIMULATION")}${control("download","Direct download","Requires explicit permission and creates an audit event","DESIGNED")}<div style="margin-top:12px">${button("Generate 5-minute Demo URL","generate-url","","link")}</div>`)}</section>`,"vault");
  }

  function ingestionPage(){
    return shell(`${pageHead("CONTROLLED ACQUISITION",tr("ingestion"),"Controlled source authorization, multipart upload, metadata capture, encryption, immutable commit and post-commit verification.",button("Run End-to-End Simulation","simulate-ingestion","primary","play"))}<section class="steps">${[["1","Authorize source","Tenant, actor and connector scope"],["2","Capture metadata","Source, case, time and content type"],["3","Encrypt chunks","Authenticated 64 MiB chunks"],["4","Commit immutable","Compliance retention and versioning"],["5","Verify & register","SHA-512, timestamp and custody event"]].map(x=>`<article class="step"><div class="step-num">${x[0]}</div><strong>${x[1]}</strong><small>${x[2]}</small></article>`).join("")}</section><section class="grid two">${card("Evidence source connectors","Public-safe connector catalogue",`<div class="connector-grid">${DATA.connectors.map(c=>`<article class="connector"><div class="connector-top"><div class="connector-logo">${icon(c.name.includes("CCTV")?"video":c.name.includes("API")?"code":c.name.includes("S3")?"database":"upload")}</div><div><strong>${esc(c.name)}</strong><small>${esc(c.detail)}</small></div></div><div class="connector-foot"><span>${esc(c.volume)} · ${esc(c.auth)}</span>${badge(c.capability)}</div></article>`).join("")}</div>`,badge("6 source types"))}${card("Ingestion guardrails","Controls represented before an object becomes authoritative",`<div class="controls" style="grid-template-columns:1fr">${control("users","Tenant authorization","Validated tenant-aware identity context","DEMO SIMULATION")}${control("harddrive","Maximum finalized object","Lower 50,000,000,000-byte interim limit represented","DESIGNED")}${control("upload","Multipart / resumable","Ordered chunks and finalization required","DEMO SIMULATION")}${control("key","Encryption profile","New DEK per evidence generation; no plaintext DEK persistence","DESIGNED")}${control("fingerprint","Whole-evidence digest","SHA-512 captured before/after transport framing removal","DESIGNED")}${control("database","WORM commit","DeleteObject unsupported after protected commit","DEMO SIMULATION")}</div>`)}</section><article class="card"><header class="card-head"><div><h3>Current ingestion queue</h3><p>Illustrative processing states</p></div>${badge("DEMO SIMULATION")}</header><div class="card-body flush"><div class="table-wrap"><table class="data-table"><thead><tr><th>Batch</th><th>Source</th><th>Size</th><th>Authorization</th><th>Encryption</th><th>SHA-512</th><th>WORM</th><th>Custody</th></tr></thead><tbody><tr><td><strong>BATCH-DEMO-0074</strong></td><td>CCTV / VMS</td><td>18.2 GB</td><td>${badge("PASSED")}</td><td>${badge("COMPLETE")}</td><td>${badge("MATCH")}</td><td>${badge("COMMITTED")}</td><td>${badge("SIGNED")}</td></tr><tr><td><strong>BATCH-DEMO-0075</strong></td><td>Microsoft 365</td><td>9.4 GB</td><td>${badge("PASSED")}</td><td>${badge("PROCESSING","blue")}</td><td>${badge("PENDING","gray")}</td><td>${badge("PENDING","gray")}</td><td>${badge("PENDING","gray")}</td></tr><tr><td><strong>BATCH-DEMO-0076</strong></td><td>Manual Upload</td><td>42.8 GB</td><td>${badge("PASSED")}</td><td>${badge("COMPLETE")}</td><td>${badge("MATCH")}</td><td>${badge("COMMITTED")}</td><td>${badge("SIGNED")}</td></tr></tbody></table></div></div></article>`,"ingestion");
  }

  function casesPage(){
    return shell(`${pageHead("INVESTIGATION CONTEXT",tr("cases"),"Evidence, tasks, notes, Legal Holds and exports are organized inside a governed case context.",button("Create Demo Case","new-case","primary","cases"))}<section class="case-grid">${DATA.cases.map(c=>`<article class="case-card"><div class="case-top"><div><div class="case-id">${esc(c.id)}</div><h3>${esc(c.name)}</h3><p>${esc(c.owner)} · ${esc(c.updated)}</p></div>${badge(c.priority)}</div><div class="case-stats"><div><span>Evidence</span><strong>${c.evidence.toLocaleString()}</strong></div><div><span>Alerts</span><strong>${c.alerts}</strong></div><div><span>Exports</span><strong>${c.exports}</strong></div></div></article>`).join("")}</section><section class="grid two"><article class="card"><header class="card-head"><div><h3>Evidence linked to CASE-DEMO-0421</h3><p>Authorization filtered</p></div>${badge("ACTIVE")}</header><div class="card-body flush">${evidenceTable(DATA.evidence.filter(e=>e.caseId==="CASE-DEMO-0421"))}</div></article>${card("Tasks, approvals and controlled notes","Every reviewer action is auditable",`<div class="timeline">${[["Review mailbox export","Demo Investigator B","Open"],["Validate payment-document lineage","Demo Investigator C","Open"],["Legal Hold approval","Demo Legal Reviewer","Complete"],["Prepare verification package","Waiting for second approval","Pending"]].map((x,i)=>`<div class="timeline-item"><i class="timeline-dot"></i><strong>${x[0]}</strong><p>${x[1]}</p><time>${x[2]}</time><span class="timeline-status">${badge(i===2?"COMPLETE":i===3?"PENDING":"OPEN")}</span></div>`).join("")}</div>`)}</section>`,"cases");
  }

  function searchPage(){
    return shell(`${pageHead("AUTHORIZED DISCOVERY",tr("search"),"Search evidence metadata, case context, custody events and derived analysis without bypassing tenant authorization.",button("Advanced Filters","filters","","filter"))}<div class="tools"><div class="searchbox">${icon("search")}<input id="global-search" value="access review" placeholder="Search evidence, cases, actors and custody actions"/></div><button class="filter active">All sources</button><button class="filter">Verified only</button><button class="filter">Legal Hold</button><button class="filter">Last 30 days</button></div><article class="card"><header class="card-head"><div><h3>Search results</h3><p>Illustrative results across fictional tenant data</p></div>${badge("TENANT FILTERED")}</header><div class="card-body flush" id="search-results">${evidenceTable(DATA.evidence)}</div></article><section class="grid two">${card("Saved searches","Personal search definitions are tenant-scoped",`${control("search","Unauthorized access review","Source: CCTV + SIEM · Last 90 days","DEMO SIMULATION")}${control("scale","Evidence under Legal Hold","All sources · Active holds","DEMO SIMULATION")}${control("fingerprint","Verification exceptions","Integrity result != verified","DEMO SIMULATION")}`)}${card("Authorization leakage test","Semantic and metadata search must not reveal cross-tenant records",`${control("users","Cross-tenant query","Zero-result response and denied event","DEMO SIMULATION")}<div style="margin-top:12px">${button("Run Cross-Tenant Search Test","attempt-cross-tenant","danger","users")}</div>`)}</section>`,"search");
  }

  function aiPage(){
    const runs=DATA.aiRuns;
    return shell(`${pageHead("DERIVED ANALYSIS",tr("ai"),"Phase 2 interface concept. AI outputs are derived artifacts and never overwrite original evidence, integrity records, WORM state, custody history or authoritative metadata.",button("Run Fictional Analysis","run-ai","primary","ai"))}<div class="ai-banner"><div><h3>Phase 2 — Designed, separately scoped and acceptance-gated</h3><p>Arabic/English OCR, PII detection, classification and semantic search are represented for workflow demonstration only. Manipulation/deepfake indicators are Future and are not claimed here. Confidence does not equal truth or a legal conclusion.</p></div>${badge("PHASE 2")}</div><section class="grid two">${runs.map(run=>`<article class="card"><header class="card-head"><div><h3>${esc(run.capability)}</h3><p>${esc(run.analysisRunId)}</p></div>${badge(run.resultStatus)}</header><div class="card-body"><div class="derived-box"><strong>Derived analysis — not authoritative evidence</strong><p>${esc(run.output)}</p></div><div class="provenance" style="margin-top:12px">${[["analysis_run_id",run.analysisRunId],["tenant_id",run.tenantId],["evidence_id",run.evidenceId],["capability_id",run.capabilityId],["model/profile",run.modelProfile],["environment",run.environment],["release/build",run.releaseBuild],["start/end",`${run.started} / ${run.ended}`],["reviewer status",state.aiReviews[run.analysisRunId]||run.reviewerStatus]].map(([k,v])=>`<div class="prov"><span>${esc(k)}</span><strong>${esc(v)}</strong></div>`).join("")}</div><div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:13px">${button("Confirm Finding",`ai-confirm:${run.analysisRunId}`,"","check")}${button("Reject Finding",`ai-reject:${run.analysisRunId}`,"danger","close")}${button("Annotate",`ai-annotate:${run.analysisRunId}`,"","edit")}</div></div></article>`).join("")}</section><section class="grid two">${card("Human-review boundary","High-impact outcomes cannot be delegated to a model score",`<div class="controls" style="grid-template-columns:1fr">${control("eye","Reviewer distinction","AI output, reviewer decision and evidence fact are visually separate","PHASE 2")}${control("audit","Reviewer audit","Confirm, reject and annotate actions are recorded","PHASE 2")}${control("scale","No automated legal disposition","A model result cannot determine legal outcome or destructive action","PHASE 2")}${control("refresh","Disable and rollback","Capability profile can be disabled or rolled back under change control","DESIGNED")}</div>`)}${card("Data and residency boundary","Customer evidence is not automatically reusable for model training",`<div class="controls" style="grid-template-columns:1fr">${control("globe","Saudi target boundary","Evidence, OCR text, embeddings and AI logs remain in approved target region","DESIGNED")}${control("users","Tenant isolation","Prompts, extracted text, indexes, caches and result stores are tenant-bound","DESIGNED")}${control("lock","Dataset governance","Rights, purpose, retention and approval owner are required","DESIGNED")}${control("warning","External AI API","Prohibited without approved privacy, security, residency, architecture and contract change","DESIGNED")}</div>`)}</section>`,"ai");
  }

  function exportsPage(){
    const e=selectedEvidence();
    return shell(`${pageHead("PORTABLE VERIFICATION",tr("exports"),"Generate an authorized technical evidence package with manifest, integrity record, timestamp state, custody history and verification guidance.",`${button(tr("certificate"),"download-certificate","primary","download")}${button(tr("package"),"generate-package","dark","package")}`)}<section class="grid two">${card("Evidence package builder",`${e.id} · ${e.title}`,`<div class="controls" style="grid-template-columns:1fr">${control("file","Original evidence reference","Protected object inventory entry","DEMO SIMULATION")}${control("audit","Manifest","Evidence metadata, object inventory and retention state","DEMO SIMULATION")}${control("fingerprint","Integrity report","SHA-512 result and verification timestamp","DEMO SIMULATION")}${control("link","Chain of custody","Actor, action, time, reason and signature state","DEMO SIMULATION")}${control("clock","Timestamp state","RFC 3161 capability token status","DESIGNED")}${control("shield","Offline verification guide","Portable verification procedure","DEMO SIMULATION")}</div>`,badge("READY"))}<article class="certificate"><img src="assets/rm-wordmark-v4.svg" alt="RM TraceVault"/><h3>Portable Independent Verification</h3><p>The package demonstrates how a recipient can inspect the manifest, recompute SHA-512 and review custody history without relying on an active user session.</p><div class="cert-fields"><div class="cert-field"><span>Manifest</span><strong>VERIFIED</strong></div><div class="cert-field"><span>SHA-512</span><strong>MATCH</strong></div><div class="cert-field"><span>Custody signatures</span><strong>VALID</strong></div><div class="cert-field"><span>Package</span><strong>COMPLETE</strong></div></div>${button("Run Offline Verification","offline-verify","primary","shield")}</article></section><article class="card"><header class="card-head"><div><h3>Recent export packages</h3><p>Fictional records</p></div>${badge("AUTHORIZATION FILTERED")}</header><div class="card-body flush"><div class="table-wrap"><table class="data-table"><thead><tr><th>Package</th><th>Case</th><th>Evidence</th><th>Size</th><th>Requested by</th><th>Created</th><th>Status</th></tr></thead><tbody>${DATA.exports.map(x=>`<tr><td><strong>${esc(x.id)}</strong></td><td>${esc(x.caseId)}</td><td>${x.evidenceCount}</td><td>${esc(x.size)}</td><td>${esc(x.requestedBy)}</td><td>${esc(x.created)}</td><td>${badge(x.status)}</td></tr>`).join("")}</tbody></table></div></div></article>`,"exports");
  }

  function auditPage(){
    const records=[...state.dynamicAudit,...DATA.audit];
    return shell(`${pageHead("APPEND-ONLY TRACEABILITY",tr("audit"),"Tenant-aware audit and custody events with actor, action, time provenance, target, result and context.",button("Export Demo Audit CSV","export-audit","","download"))}<div class="tools"><div class="searchbox">${icon("search")}<input id="audit-search" placeholder="Search audit ID, actor, action or target"/></div><button class="filter active">All events</button><button class="filter">Custody</button><button class="filter">Access</button><button class="filter">Security</button><button class="filter">Failed / Blocked</button></div><article class="card"><header class="card-head"><div><h3>Audit event register</h3><p>${records.length} fictional and dynamically generated events</p></div>${badge("APPEND-ONLY MODEL")}</header><div class="card-body flush" id="audit-table">${auditTable(records)}</div></article><section class="grid two">${card("Audit invariants","Control behavior represented in the product",`<div class="controls" style="grid-template-columns:1fr">${control("link","Append-only event model","Events are added; existing events are not edited","DESIGNED")}${control("users","Named actor / service identity","Shared identities are not represented","DEMO SIMULATION")}${control("clock","Time provenance","Action time and service source are shown","DEMO SIMULATION")}${control("shield","Tamper evidence","Edit or reorder would be detectable in the target signed chain","DESIGNED")}</div>`)}${card("Sensitive-data handling","Audit views must not expose plaintext evidence or plaintext keys",`<div class="controls" style="grid-template-columns:1fr">${control("lock","No plaintext evidence in audit","Only identifiers and control metadata are shown","DESIGNED")}${control("key","No plaintext DEKs","Cryptographic material is never displayed","DESIGNED")}${control("filter","Authorized filters","Tenant and role context limits results","DEMO SIMULATION")}${control("download","Controlled export","Audit export itself creates a new event","DEMO SIMULATION")}</div>`)}</section>`,"audit");
  }

  function auditTable(records){ return `<div class="table-wrap"><table class="data-table"><thead><tr><th>Event</th><th>Time</th><th>Category</th><th>Action</th><th>Actor</th><th>Target</th><th>Tenant</th><th>Result</th></tr></thead><tbody>${records.map(a=>`<tr><td><strong>${esc(a.id)}</strong></td><td>${esc(a.time)}</td><td>${esc(a.category)}</td><td><span class="mono">${esc(a.action)}</span></td><td>${esc(a.actor)}</td><td>${esc(a.target)}</td><td>${esc(a.tenant)}</td><td>${badge(a.result)}</td></tr>`).join("")}</tbody></table></div>`; }

  function securityPage(){
    return shell(`${pageHead("RM-LED INCIDENT COMMAND",tr("security"),"A coordinated security-operations concept spanning evidence trust, tenant isolation, key custody, infrastructure, application and recovery boundaries.",button("Open Demo Incident","open-incident","primary","warning"))}<section class="kpi-grid">${[["shield","1","Incident commander","RM-led"],["warning","2","Open demo incidents","Fictional"],["lock","0","Integrity losses","Demo records"],["users","0","Cross-tenant exposures","Zero tolerance"],["key","0","Key-custody breaches","None represented"],["activity","100%","Control telemetry","Illustrative"]].map(k=>`<article class="kpi"><div class="kpi-top"><div class="kpi-icon">${icon(k[0])}</div><span class="kpi-note">${k[3]}</span></div><strong>${k[1]}</strong><span>${k[2]}</span></article>`).join("")}</section><section class="grid two">${card("Incident register","One incident ID, one commander, one timeline and one decision log",`<div class="timeline">${DATA.incidents.map(i=>`<div class="timeline-item"><i class="timeline-dot"></i><strong>${esc(i.id)} · ${esc(i.title)}</strong><p>${esc(i.scope)} · Decision: ${esc(i.decision)}</p><time>${esc(i.opened)} · ${esc(i.commander)}</time><span class="timeline-status">${badge(`${i.severity} · ${i.status}`)}</span></div>`).join("")}</div>`,badge("DEMO SIMULATION"))}${card("Security control domains","Tool-neutral outcomes, not vendor product claims",`<div class="controls" style="grid-template-columns:1fr">${control("users","Identity & privileged access","MFA, least privilege, named identities and break-glass review","DESIGNED")}${control("globe","Edge & API","WAF/API security, TLS, abuse signals and rate limits","DESIGNED")}${control("server","Compute & container platform","Runtime, image provenance and deployment identity","DESIGNED")}${control("database","Evidence storage","Object operations, WORM state and delete/bypass attempts","DEMO SIMULATION")}${control("key","Cryptography & keys","Transit, KMS root-layer events, recovery and destructive action","DESIGNED")}${control("refresh","Backup & recovery","Restore evidence and recovery-credential controls","DESIGNED")}</div>`)}</section><section class="grid two">${card("Operational-claim boundary","A dashboard or tool license is not proof of operational readiness",`<div class="controls" style="grid-template-columns:1fr">${control("info","24×7 SOC coverage","Not claimed unless an executed agreement assigns it","NOT CLAIMED")}${control("clock","Notification deadline","Not represented as a universal fixed promise","NOT CLAIMED")}${control("shield","Independent assessment","Not implied by vendor or demo self-test","NOT CLAIMED")}${control("maturity","G5 readiness","Requires evidence-based operational acceptance outside this public demo","DESIGNED")}</div>`)}${card("Incident response principles","Evidence trust wins over service convenience",`<div class="controls" style="grid-template-columns:1fr">${control("lock","Preserve before destructive remediation","Security evidence is retained where operationally safe","DESIGNED")}${control("warning","Pause unsafe functions","Upload, retrieval or AI can be paused to protect trust","DESIGNED")}${control("key","Protect keys and plaintext","No plaintext evidence or DEKs in tickets or chat","DESIGNED")}${control("audit","Record emergency action","Actor, time, reason and affected scope are retained","DESIGNED")}</div>`)}</section>`,"security");
  }

  function tenantsPage(){
    return shell(`${pageHead("TENANT GOVERNANCE",tr("tenants"),"Users, roles, retention, Legal Hold, quotas and tenant-scoped controls are represented without exposing confidential customer data.",button("Add Demo User","new-user","primary","users"))}<section class="kpi-grid">${[["building",DATA.tenant.name,"Tenant","Sovereign Enterprise"],["users",DATA.tenant.users,"Authorized users","MFA enforced"],["harddrive",`${DATA.tenant.storageUsedTb} TB`,"Storage used",`${DATA.tenant.storageAllowanceTb} TB allowance`],["activity",DATA.connectors.length,"Connectors","Scoped identities"],["scale",DATA.tenant.legalHolds,"Legal Holds","Policy controlled"],["package",DATA.tenant.pendingExports,"Exports","Approval controlled"]].map(k=>`<article class="kpi"><div class="kpi-top"><div class="kpi-icon">${icon(k[0])}</div><span class="kpi-note">${esc(k[3])}</span></div><strong>${esc(k[1])}</strong><span>${esc(k[2])}</span></article>`).join("")}</section><section class="grid two"><article class="card"><header class="card-head"><div><h3>Users and role assignments</h3><p>Fictional public-safe identities</p></div>${badge("MFA ENFORCED")}</header><div class="card-body flush"><div class="table-wrap"><table class="data-table"><thead><tr><th>User</th><th>Role</th><th>MFA</th><th>Access</th><th>Last login</th></tr></thead><tbody>${DATA.users.map(u=>`<tr><td><strong>${esc(u.name)}</strong><div class="mono">${esc(u.id)}</div></td><td>${esc(u.role)}</td><td>${badge(u.mfa)}</td><td>${esc(u.access)}</td><td>${esc(u.lastLogin)}</td></tr>`).join("")}</tbody></table></div></div></article>${card("Layered tenant isolation","Every evidence, custody, audit, export and derived-analysis record carries tenant context",`<div class="controls" style="grid-template-columns:1fr">${control("key","Cryptographic boundary","Tenant-bound custody namespace/key reference","DESIGNED")}${control("database","Data boundary","Schema-per-tenant target and row-level authorization context","DESIGNED")}${control("users","Application boundary","Validated tenant-aware identity and authorization filters","DEMO SIMULATION")}${control("search","Search boundary","Cross-tenant search leakage is rejected","DEMO SIMULATION")}${control("ai","AI boundary","Prompts, text, embeddings, caches and results remain tenant-bound","PHASE 2")}</div><div style="margin-top:12px">${button("Run Cross-Tenant Access Test","attempt-cross-tenant","danger","users")}</div>`)}</section><section class="grid two">${card("Tenant policies","Illustrative settings",`<div class="controls" style="grid-template-columns:1fr">${control("clock","Default retention","Policy driven; demo profile shows seven years","DEMO SIMULATION")}${control("scale","Legal Hold approvals","Dual-control release represented","DEMO SIMULATION")}${control("package","Evidence package approval","Two-person rule represented","DEMO SIMULATION")}${control("users","Support access","Time-bound and approved","DESIGNED")}${control("audit","Audit retention","Policy controlled; no universal duration claim","DESIGNED")}</div>`)}${card("Privacy request routing","Identity, legal basis, retention and Legal Hold must be reviewed",`${control("file","Data-subject request","Workflow routing represented; not automated deletion","DESIGNED")}${control("scale","Legal Hold conflict","Deletion cannot override an active Legal Hold or WORM policy","DESIGNED")}<div style="margin-top:12px">${button("Create Demo Privacy Request","privacy-request","","file")}</div>`)}</section>`,"tenants");
  }

  function apiPage(){
    const endpoint=DATA.apiEndpoints[state.selectedApi] || DATA.apiEndpoints[0];
    const response=state.apiResponse || { status: "READY", message: "Select an endpoint and run the simulation.", endpoint: endpoint.path };
    return shell(`${pageHead("CONTRACT-FIRST INTERFACES",tr("api"),"Interactive endpoint simulation based on the governing application interface catalogue. No network request or real data is used.",button("Reset Console","reset-api","","refresh"))}<section class="api-layout"><article class="card"><header class="card-head"><div><h3>Endpoint catalogue</h3><p>${DATA.apiEndpoints.length} public-safe interface examples</p></div>${badge("DEMO SIMULATION")}</header><div class="card-body"><div class="endpoint-list">${DATA.apiEndpoints.map((ep,i)=>`<div class="endpoint ${state.selectedApi===i?"active":""}" data-api="${i}"><div><span class="method ${ep.method.toLowerCase()}">${esc(ep.method)}</span><code>${esc(ep.path)}</code></div><p>${esc(ep.purpose)}</p><div style="margin-top:7px">${badge(ep.status)}</div></div>`).join("")}</div></div></article><article class="api-console"><div class="api-console-head"><div><span class="method ${endpoint.method.toLowerCase()}">${esc(endpoint.method)}</span><code>${esc(endpoint.path)}</code></div>${button("Run Simulation","run-api","","play")}</div><pre id="api-output">${esc(JSON.stringify(response,null,2))}</pre></article></section><section class="grid two">${card("API security expectations","Control principles represented",`<div class="controls" style="grid-template-columns:1fr">${control("users","Tenant-aware identity","Tenant context is derived from validated identity, not client input alone","DESIGNED")}${control("clock","TTL-bound URL","Short-lived authorized access is auditable","DEMO SIMULATION")}${control("lock","WORM delete behavior","Protected DeleteObject returns an explicit denial","DEMO SIMULATION")}${control("filter","Pagination and filtering","Audit and search interfaces remain authorization-filtered","DEMO SIMULATION")}</div>`)}${card("Machine-to-machine boundary","Connector and service identities are scoped and auditable",`<div class="controls" style="grid-template-columns:1fr">${control("key","M2M authentication","Scoped service identity without human password reuse","DESIGNED")}${control("audit","Request trace","Request ID, actor, tenant and result represented","DEMO SIMULATION")}${control("warning","No secrets in UI","Tokens and credentials are never displayed","DESIGNED")}${control("refresh","Versioned contracts","OpenAPI and schemas are version controlled in the target delivery","DESIGNED")}</div>`)}</section>`,"api");
  }

  function maturityPage(){
    return shell(`${pageHead("CLAIM CONTROL",tr("maturity"),"The public demo uses explicit capability states so a visual workflow is never presented as production implementation, validation, certification or legal conclusion.","")}<section class="grid two">${card("Capability status legend","Governing vocabulary applied to the public demonstration",`<div class="controls" style="grid-template-columns:1fr">${DATA.capabilityLegend.map(x=>control("info",x.status,x.meaning,x.status)).join("")}${control("warning","NOT CLAIMED","Certification, compliance and court admissibility are outside this public demo","NOT CLAIMED")}</div>`)}${card("Acceptance separation","Product acceptance remains layered",`<div class="controls" style="grid-template-columns:1fr">${control("layers","G1 — Foundation PoC","Selected controls only; not production acceptance","DESIGNED")}${control("server","G2 — Infrastructure","Production infrastructure interfaces and evidence","DESIGNED")}${control("code","G3 — Application","Functionality, security, source, performance and documentation","DESIGNED")}${control("link","G4 — Integrated lifecycle","Application and infrastructure tested end to end","DESIGNED")}${control("shield","G5 — Operational readiness","Ownership, incidents, rollback, recovery, runbooks and handover","DESIGNED")}</div>`)}</section><article class="card" style="margin-top:15px"><header class="card-head"><div><h3>Public demo capability register</h3><p>No confidential vendor, commercial or acceptance details are exposed</p></div>${badge("CLAIM CONTROLLED")}</header><div class="card-body"><div class="maturity">${DATA.maturity.map(m=>`<div class="maturity-row"><strong>${esc(m.area)}</strong>${badge(m.status)}<p>${esc(m.note)}</p></div>`).join("")}</div></div></article>`,"maturity");
  }

  function architecturePage(){
    return shell(`${pageHead("SOVEREIGN TARGET DESIGN",tr("architecture"),"Conceptual service and trust boundaries for the target platform. This is an architecture view, not evidence that production infrastructure has been accepted.","")}<section class="arch"><div class="arch-row">${[["Evidence Sources","CCTV · Email · Files · SIEM · API · S3"],["Secure Edge","WAF · API ingress · rate limits · private access"],["Identity & Tenant","OIDC · MFA · RBAC · tenant context"],["Application Services","Tenant · Upload · Evidence · Integrity · Audit · Case · Export"]].map(x=>`<div class="arch-node"><strong>${x[0]}</strong><small>${x[1]}</small></div>`).join("")}</div><div class="arch-arrow">↓</div><div class="arch-row">${[["Cryptographic Services","Per-evidence DEK · Transit custody · KMS root layer"],["Evidence Vault","WORM · versioning · protected object inventory"],["Data & Search","Tenant-scoped metadata · PostgreSQL/RLS target · authorized index"],["Operations & Assurance","Monitoring · incidents · backup/recovery · acceptance evidence"]].map(x=>`<div class="arch-node"><strong>${x[0]}</strong><small>${x[1]}</small></div>`).join("")}</div><div class="arch-arrow">↓</div><div class="arch-row">${[["Phase 2 AI","OCR · PII · classification · semantic search · derived only"],["Portable Verification","Manifest · SHA-512 · custody · timestamp state"],["Saudi Target Boundary","Evidence · logs · derived content · backups"],["RM Acceptance Authority","Architecture · exceptions · claim control · final decision"]].map(x=>`<div class="arch-node"><strong>${x[0]}</strong><small>${x[1]}</small></div>`).join("")}</div></section><section class="grid three">${card("Application delivery boundary","The application layer consumes approved infrastructure interfaces",`${control("code","Application services","Workflows, APIs, UI, custody, export and application security","DESIGNED")}`)}${card("Infrastructure boundary","Cloud foundation, network, storage and platform interfaces",`${control("server","Sovereign foundation","Target infrastructure interfaces and hardening","DESIGNED")}`)}${card("RM authority","Product, architecture, evidence model and final acceptance",`${control("shield","Final decision authority","Exceptions and go-live require RM-controlled acceptance","DESIGNED")}`)}</section>`,"architecture");
  }

  function render(){
    document.body.classList.toggle("dark",state.dark);
    document.documentElement.lang=state.lang;
    document.documentElement.dir=state.lang==="ar"?"rtl":"ltr";
    if(!state.loggedIn){ root.innerHTML=loginPage(); setTimeout(()=>{state.splashDone=true;const s=document.getElementById("splash");if(s)s.classList.add("hidden");setTimeout(()=>{if(s)s.remove();},500);},950); return; }
    const route=currentRoute();
    const pages={overview:overviewPage,vault:vaultPage,evidence:evidencePage,ingestion:ingestionPage,cases:casesPage,search:searchPage,ai:aiPage,exports:exportsPage,audit:auditPage,security:securityPage,tenants:tenantsPage,api:apiPage,maturity:maturityPage,architecture:architecturePage};
    root.innerHTML=(pages[route.page]||overviewPage)();
  }

  function toast(title,message,ic="info"){
    const node=document.createElement("div");
    node.className="toast";
    node.innerHTML=`${icon(ic)}<div><strong>${esc(title)}</strong><small>${esc(message)}</small></div>`;
    toastRoot.appendChild(node);
    setTimeout(()=>node.remove(),4500);
  }

  function modal(title,subtitle,body,footer=button("Close","close-modal")){
    modalRoot.innerHTML=`<div class="modal-backdrop"><section class="modal" role="dialog" aria-modal="true"><header class="modal-head"><div><h3>${esc(title)}</h3><p>${esc(subtitle)}</p></div><button class="modal-close" data-action="close-modal">${icon("close")}</button></header><div class="modal-body">${body}</div><footer class="modal-foot">${footer}</footer></section></div>`;
  }
  function closeModal(){ modalRoot.innerHTML=""; }

  function addAudit(category,action,target,result,actor="Demo Administrator"){
    const record={id:`AUD-DYN-${Date.now().toString().slice(-7)}`,time:nowAst(),category,action,actor,target,result,tenant:DATA.tenant.id,ip:"192.0.2.50"};
    state.dynamicAudit.unshift(record);
    return record;
  }
  function addCustody(evidenceId,action,detail,status="BLOCKED"){
    state.attempts[evidenceId]=state.attempts[evidenceId]||[];
    state.attempts[evidenceId].push({seq:100+state.attempts[evidenceId].length,time:nowAst(),action,actor:"Demo Administrator",reason:"Negative control test",detail,signature:status});
  }

  function showResult(opts){
    const success=opts.success===true;
    modal(opts.title,opts.subtitle||"",`<div class="result-hero ${success?"success":""}"><div class="result-icon">${icon(success?"check":opts.icon||"warning")}</div><div><h4>${esc(opts.headline)}</h4><p>${esc(opts.message)}</p></div></div><div class="result-grid">${opts.fields.map(([k,v])=>`<div class="result-field"><span>${esc(k)}</span><strong>${esc(v)}</strong></div>`).join("")}</div>`,opts.footer||button("Return","close-modal","primary","shield"));
  }

  function negativeTest(type){
    const e=selectedEvidence();
    const map={
      delete:{action:"DELETE_ATTEMPT_BLOCKED",code:"TV-WORM-403",http:"HTTP 403 — Forbidden",headline:"Protected deletion blocked",message:"Compliance Mode retention rejected the request. The authoritative evidence object remains unchanged.",icon:"trash",detail:"DeleteObject was rejected by immutable-retention policy."},
      modify:{action:"MODIFICATION_ATTEMPT_BLOCKED",code:"TV-INTEGRITY-409",http:"HTTP 409 — Conflict",headline:"Protected modification rejected",message:"The immutable object cannot be overwritten. A new authorized derived artifact or versioned workflow is required.",icon:"edit",detail:"Overwrite request was rejected; original protected object remains unchanged."},
      missing:{action:"MISSING_CHUNK_TEST_FAILED",code:"ENC-6A",http:"Verification Failed",headline:"Missing encrypted chunk detected",message:"The expected chunk set was incomplete. Decryption and verification stopped before any result could be accepted.",icon:"warning",detail:"ENC-6A negative test detected a missing authenticated chunk."},
      reorder:{action:"CHUNK_REORDER_TEST_FAILED",code:"ENC-6B",http:"Verification Failed",headline:"Reordered chunks detected",message:"Authenticated sequence context did not match. The reconstructed byte stream was rejected.",icon:"warning",detail:"ENC-6B negative test detected reordered authenticated chunks."},
      substitution:{action:"CROSS_EVIDENCE_SUBSTITUTION_FAILED",code:"ENC-6C",http:"Verification Failed",headline:"Cross-evidence substitution detected",message:"Tenant/evidence-bound authenticated context did not match the target evidence record.",icon:"warning",detail:"ENC-6C negative test detected cross-evidence chunk substitution."},
      crossTenant:{action:"CROSS_TENANT_ACCESS_DENIED",code:"TV-AUTHZ-403",http:"HTTP 403 — Forbidden",headline:"Cross-tenant access denied",message:"The requested evidence belongs to a different tenant context. No metadata or content was returned.",icon:"users",detail:"Tenant-aware authorization rejected the cross-tenant request."}
    };
    const x=map[type];
    addCustody(e.id,x.action,x.detail,"BLOCKED");
    addAudit(type==="crossTenant"?"AUTHORIZATION":"SECURITY",x.action,e.id,"BLOCKED");
    showResult({title:x.headline,subtitle:`${e.id} · ${e.title}`,headline:x.http,message:x.message,icon:x.icon,fields:[["Control code",x.code],["Evidence state","UNCHANGED / PROTECTED"],["Tenant",DATA.tenant.id],["Actor","Demo Administrator"],["Timestamp",nowAst()],["Audit result","ATTEMPT LOGGED"]]});
    toast("Negative test blocked and logged",`${x.code} · Evidence remained unchanged.`,"shield");
  }

  function verifyEvidence(){
    const e=selectedEvidence();
    addAudit("INTEGRITY","VERIFY_COMPLETED",e.id,"SUCCESS","Integrity Service");
    showResult({success:true,title:"Integrity verification passed",subtitle:`${e.id} · ${e.title}`,headline:"SHA-512 fingerprint matched",message:"The complete original evidence byte stream matched the registered integrity record. The represented custody sequence is intact.",fields:[["Integrity","VERIFIED"],["Immutable state","PROTECTED"],["Timestamp state",e.timestamp.status],["Custody events",String(e.custody.length+dynamicCustody(e.id).length)],["Verification time",nowAst()],["Result ID",`VER-DEMO-${Date.now().toString().slice(-6)}`]],footer:`${button(tr("certificate"),"download-certificate","primary","download")}${button("Close","close-modal")}`});
  }

  function simulateIngestion(){
    const steps=[["Source authorization","Tenant, actor and source scope validated."],["Metadata capture","Evidence identity, case, source and time registered."],["Chunk encryption","Authenticated 64 MiB chunks represented."],["Immutable commit","Compliance Mode and versioning represented."],["Integrity verification","SHA-512 and custody event registered."]];
    modal("Secure ingestion simulation","A fictional object proceeds through the target evidence-protection flow.",`<div class="progress-list">${steps.map((s,i)=>`<div class="progress-row" data-progress="${i}"><div class="progress-icon">${icon(["shield","audit","key","lock","fingerprint"][i])}</div><div><strong>${esc(s[0])}</strong><small>${esc(s[1])}</small></div>${badge(i===0?"PROCESSING":"QUEUED",i===0?"blue":"gray")}</div>`).join("")}</div>`,button("Close","close-modal"));
    let i=0;
    const timer=setInterval(()=>{
      const rows=[...modalRoot.querySelectorAll("[data-progress]")];
      if(!rows.length){clearInterval(timer);return;}
      if(i>0)rows[i-1].querySelector(".badge").outerHTML=badge("COMPLETE");
      if(i<rows.length)rows[i].querySelector(".badge").outerHTML=badge("PROCESSING","blue");
      i++;
      if(i>rows.length){clearInterval(timer);rows[rows.length-1].querySelector(".badge").outerHTML=badge("VERIFIED");addAudit("INGESTION","DEMO_INGESTION_COMPLETED","BATCH-DYNAMIC","SUCCESS","Secure Ingestion Service");toast("Ingestion simulation complete","Evidence was represented as committed, verified and registered in custody history.","shield");}
    },650);
  }

  function offlineVerify(){
    const steps=[["Load package","Manifest and package inventory opened."],["Validate package signature","Signature state represented as valid."],["Recompute SHA-512","Evidence fingerprint matched."],["Compare manifest","Object IDs and metadata matched."],["Review custody history","No missing or reordered event detected."]];
    modal("Offline verification simulation","Portable package verification without relying on an active platform session.",`<div class="progress-list">${steps.map((s,i)=>`<div class="progress-row"><div class="progress-icon">${icon(["package","shield","fingerprint","audit","link"][i])}</div><div><strong>${s[0]}</strong><small>${s[1]}</small></div>${badge("PASSED")}</div>`).join("")}</div>`,button("Verification Complete","close-modal","primary","check"));
    addAudit("EXPORT","OFFLINE_VERIFICATION_COMPLETED","EXP-DEMO-0017","SUCCESS","Demo External Reviewer");
  }

  function runApi(){
    const ep=DATA.apiEndpoints[state.selectedApi];
    const e=selectedEvidence();
    const base={request_id:`REQ-DEMO-${Date.now().toString().slice(-8)}`,tenant_id:DATA.tenant.id,timestamp:nowAst(),demo:true};
    let response;
    if(ep.path.includes("upload/init")) response={...base,status:201,upload_session_id:"UPL-DEMO-NEW",chunk_size_bytes:67108864,max_object_bytes:50000000000,required_metadata:["tenant_id","case_id","source","content_type"]};
    else if(ep.path.includes("finalize")) response={...base,status:202,evidence_id:"EV-DEMO-NEW",workflow:["validate chunks","encrypt","immutable commit","verify","register custody"]};
    else if(ep.path.includes("presigned-url")) response={...base,status:201,evidence_id:e.id,url:"https://demo.invalid/evidence/temporary-token",expires_in_seconds:300,permissions:["stream-read"],single_use:true};
    else if(ep.path.includes("evidence-package")) response={...base,status:202,package_id:"EXP-DEMO-NEW",evidence_id:e.id,components:["manifest","integrity_report","custody_history","verification_guide"]};
    else if(ep.path.includes("integrity")&&ep.path.includes("verify")) response={...base,status:200,evidence_id:e.id,sha512_match:true,immutable_state:"PROTECTED",timestamp_state:"SIMULATED_VALID",result:"VERIFIED"};
    else if(ep.path.includes("chain")) response={...base,status:200,evidence_id:e.id,event_count:e.custody.length+dynamicCustody(e.id).length,events:[...e.custody,...dynamicCustody(e.id)].map(x=>({time:x.time,action:x.action,actor:x.actor,signature:x.signature}))};
    else if(ep.path.includes("audit")) response={...base,status:200,page:1,page_size:25,total:DATA.audit.length+state.dynamicAudit.length,authorization_filtered:true};
    else if(ep.path.includes("data-subject")) response={...base,status:202,request_id:"DSR-DEMO-001",workflow:["identity review","legal basis review","retention review","Legal Hold review"],automatic_deletion:false};
    else if(ep.path.includes("download")) response={...base,status:200,evidence_id:e.id,mode:"authorized streaming",watermark:"enabled",audit_event:"created"};
    else response={...base,status:302,location:"https://identity.demo.invalid/oidc/authorize",tenant_context:DATA.tenant.id};
    state.apiResponse=response;
    addAudit("API",`${ep.method}_${ep.path.split("/").filter(Boolean).slice(-2).join("_").toUpperCase()}`,e.id,"SUCCESS","Demo API Client");
    render();
    toast("API simulation completed",`${ep.method} ${ep.path}`,"code");
  }

  function runAi(){
    const run={analysis_run_id:`AIRUN-DEMO-${Date.now()}`,tenant_id:DATA.tenant.id,evidence_id:selectedEvidence().id,capability_id:"F-152",model_profile:"CLASSIFICATION-DEMO-v1.0",result_status:"SIMULATED COMPLETE",reviewer_status:"PENDING HUMAN REVIEW",derived_only:true,original_evidence_modified:false};
    modal("Phase 2 analysis simulation","This derived result does not alter the authoritative evidence object.",`<div class="derived-box"><strong>Derived analysis only</strong><p>Illustrative classification: Access-control footage · reviewer confirmation required.</p></div><div class="result-grid">${Object.entries(run).map(([k,v])=>`<div class="result-field"><span>${esc(k)}</span><strong>${esc(v)}</strong></div>`).join("")}</div>`,button("Acknowledge","close-modal","primary","check"));
    addAudit("AI","DERIVED_ANALYSIS_CREATED",selectedEvidence().id,"SUCCESS","tv-ai-svc demo");
  }

  function reviewAi(action,id){
    const labels={confirm:"CONFIRMED BY HUMAN REVIEWER",reject:"REJECTED BY HUMAN REVIEWER",annotate:"ANNOTATED — REVIEW CONTINUES"};
    state.aiReviews[id]=labels[action];
    addAudit("AI",`AI_RESULT_${action.toUpperCase()}`,id,"SUCCESS","Demo AI Reviewer");
    render();
    toast("Reviewer action recorded",`${id} · ${labels[action]}`,"audit");
  }

  function legalHold(action){
    const e=selectedEvidence();
    if(action==="apply"){
      state.legalHoldOverrides[e.id]=true;
      addCustody(e.id,"LEGAL_HOLD_APPLIED","Legal Hold applied through the public demonstration.","VALID");
      addAudit("CUSTODY","LEGAL_HOLD_APPLIED",e.id,"SUCCESS","Demo Legal Reviewer");
      toast("Legal Hold applied",`${e.id} retention expiry is suspended in the demo state.`,"scale");
      render();
    }else{
      modal("Legal Hold release request","Release requires two-person approval in this public demonstration.",`<div class="controls" style="grid-template-columns:1fr">${control("users","Requester","Demo Legal Reviewer","DEMO SIMULATION")}${control("scale","Second approver","Pending approval","PENDING")}${control("lock","Evidence state","Remains protected while approval is pending","PROTECTED")}</div>`,`${button("Approve as Second Reviewer","approve-hold-release","primary","check")}${button("Cancel","close-modal")}`);
    }
  }
  function approveHoldRelease(){
    const e=selectedEvidence();
    state.legalHoldOverrides[e.id]=false;
    addCustody(e.id,"LEGAL_HOLD_RELEASED","Two-person approval represented; retention policy remains authoritative.","VALID");
    addAudit("CUSTODY","LEGAL_HOLD_RELEASED",e.id,"SUCCESS","Demo Second Approver");
    closeModal();render();toast("Legal Hold released","Dual approval was represented and logged.","scale");
  }

  function generateUrl(){
    const e=selectedEvidence();
    const token=`TV4-${Math.random().toString(36).slice(2,10).toUpperCase()}`;
    addAudit("ACCESS","PRESIGNED_URL_CREATED",e.id,"SUCCESS");
    modal("Temporary authorized URL",`${e.id} · expires in 5 minutes`, `<div class="hashbox"><header><span>TTL-BOUND DEMO URL</span>${badge("SINGLE USE")}</header><code>https://demo.invalid/evidence/${esc(e.id)}?token=${token}</code></div><div class="result-grid"><div class="result-field"><span>Permission</span><strong>stream-read</strong></div><div class="result-field"><span>Tenant</span><strong>${esc(DATA.tenant.id)}</strong></div><div class="result-field"><span>Expiry</span><strong>300 seconds</strong></div><div class="result-field"><span>Audit</span><strong>EVENT CREATED</strong></div></div>`,button("Close","close-modal","primary"));
  }

  function exportAudit(){
    const records=[...state.dynamicAudit,...DATA.audit];
    const headers=["id","time","category","action","actor","target","result","tenant","ip"];
    const csv=[headers.join(","),...records.map(r=>headers.map(h=>`"${String(r[h]??"").replace(/"/g,'""')}"`).join(","))].join("\n");
    const blob=new Blob([csv],{type:"text/csv;charset=utf-8"});
    downloadBlob(blob,"RM_TraceVault_Demo_Audit_Export.csv");
    addAudit("AUDIT","AUDIT_EXPORT_CREATED","AUDIT-REGISTER","SUCCESS");
    toast("Audit CSV generated","The export contains fictional demonstration records only.","download");
  }

  function downloadBlob(blob,name){ const url=URL.createObjectURL(blob); const a=document.createElement("a"); a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1200); }
  function pdfText(value){ return String(value??"").normalize("NFKD").replace(/[^\x20-\x7E]/g," ").replace(/\\/g,"\\\\").replace(/\(/g,"\\(").replace(/\)/g,"\\)"); }
  function buildCertificatePdf(e){
    const events=[...e.custody,...dynamicCustody(e.id)].slice(0,11);
    const lines=[];
    const T=(font,size,x,y,text,color="0.027 0.075 0.153")=>lines.push(`BT /${font} ${size} Tf ${color} rg ${x} ${y} Td (${pdfText(text)}) Tj ET`);
    lines.push("q 0.027 0.075 0.153 rg 0 748 595 94 re f Q");
    lines.push("q 0.09 0.431 0.91 rg 0 735 595 13 re f Q");
    T("F2",28,35,792,"RM","1 1 1"); T("F2",23,91,792,"TRACEVAULT","1 1 1");
    T("F1",9,36,770,"TRACE. SECURE. PRESERVE.","0.38 0.84 1");
    T("F2",18,36,704,"EVIDENCE INTEGRITY & CHAIN-OF-CUSTODY CERTIFICATE");
    T("F1",8.5,36,686,"Public concept demonstration certificate generated from fictional data.");
    lines.push("q 0.93 0.96 1 rg 35 614 525 52 re f Q");
    T("F2",10,47,645,"CERTIFICATE ID");T("F1",10,160,645,`CERT-${e.id}`);T("F2",10,350,645,"RESULT");T("F2",10,420,645,"INTEGRITY VERIFIED","0.05 0.50 0.35");
    const fields=[["Evidence ID",e.id],["Evidence title",e.title],["Case",`${e.caseId} - ${e.caseName}`],["Source",`${e.source} / ${e.sourceDetail}`],["Collected",e.collected],["Verified",e.verified],["File size",e.size],["Encryption",`${e.encryption.algorithm} / ${e.encryption.chunkSize}`],["Immutable status",e.immutable.mode],["Retention end",e.retentionEnd],["Legal Hold",legalHoldState(e)?"Applied":"Not applied"],["Timestamp state",e.timestamp.status]];
    let y=590;fields.forEach(([k,v])=>{T("F2",8.5,38,y,`${k}:`);T("F1",8.5,150,y,String(v).slice(0,85));y-=17;});
    T("F2",9.5,38,y-2,"SHA-512 FINGERPRINT");y-=18;(e.hash.match(/.{1,64}/g)||[e.hash]).forEach(h=>{T("F3",7,38,y,h);y-=11;});
    y-=4;T("F2",9.5,38,y,"CHAIN OF CUSTODY SUMMARY");y-=17;
    events.forEach((ev,i)=>{T("F2",7.2,38,y,`${i+1}. ${ev.time} | ${ev.action} | ${ev.actor}`.slice(0,110),ev.signature==="BLOCKED"?"0.75 0.12 0.09":"0.027 0.075 0.153");y-=10;T("F1",6.8,38,y,`   ${ev.detail}`.slice(0,118),"0.31 0.39 0.49");y-=13;});
    lines.push("q 0.86 0.9 0.95 RG 35 62 525 1 re S Q");T("F2",8,36,43,"RM TRACEVAULT - LEGAL MEMORY. SEALED FOREVER.");T("F1",7,340,43,DATA.product.version);T("F1",6.7,36,28,"Demo only: not a production attestation, certification, compliance statement, legal opinion, or court-admissibility guarantee.");
    const stream=lines.join("\n");
    const objects=["<< /Type /Catalog /Pages 2 0 R >>","<< /Type /Pages /Kids [3 0 R] /Count 1 >>","<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R /F2 5 0 R /F3 6 0 R >> >> /Contents 7 0 R >>","<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>","<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>","<< /Type /Font /Subtype /Type1 /BaseFont /Courier >>",`<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`];
    let pdf="%PDF-1.4\n%RMTraceVault\n";const offsets=[0];objects.forEach((o,i)=>{offsets.push(pdf.length);pdf+=`${i+1} 0 obj\n${o}\nendobj\n`;});const xref=pdf.length;pdf+=`xref\n0 ${objects.length+1}\n0000000000 65535 f \n`;for(let i=1;i<=objects.length;i++)pdf+=`${String(offsets[i]).padStart(10,"0")} 00000 n \n`;pdf+=`trailer\n<< /Size ${objects.length+1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;return pdf;
  }
  function downloadCertificate(){ const e=selectedEvidence();const blob=new Blob([buildCertificatePdf(e)],{type:"application/pdf"});downloadBlob(blob,`RM_TraceVault_Integrity_Certificate_${e.id}.pdf`);addAudit("EXPORT","INTEGRITY_CERTIFICATE_GENERATED",e.id,"SUCCESS");toast("PDF certificate generated",`${e.id} · Integrity and custody summary included.`,"download"); }

  function guidedTour(){
    modal("RM TraceVault Guided Tour","Recommended presentation flow for companies and investors.",`<div class="progress-list">${[["1. Executive overview","Explain the sovereign evidence-custody value proposition."],["2. Protected evidence","Open a record and review integrity, WORM, timestamp and custody."],["3. Tamper lab","Run delete, modify, missing-chunk, reorder, substitution and cross-tenant tests."],["4. PDF certificate","Download the integrity and chain-of-custody certificate."],["5. Phase 2 AI","Show provenance, derived-only boundary and human review."],["6. Audit and acceptance","Show append-only audit and capability status claim control."]].map((x,i)=>`<div class="progress-row"><div class="progress-icon">${icon(i===2?"warning":i===3?"download":"play")}</div><div><strong>${x[0]}</strong><small>${x[1]}</small></div>${badge(i===0?"START":"NEXT","blue")}</div>`).join("")}</div>`,`${button("Open Protected Evidence","open-first-evidence","primary","database")}${button("Close","close-modal")}`);
  }

  function openIncident(){
    modal("Create Demo Security Incident","One RM incident ID, commander, timeline and decision log.",`<label class="form-label">Incident title</label><input class="form-input" value="Protected-object access anomaly"/><label class="form-label">Severity</label><select class="form-input"><option>S1 — Critical trust boundary</option><option>S2 — High operational impact</option><option>S3 — Moderate</option></select><label class="form-label">Initial containment</label><textarea class="form-input" rows="3">Suspend affected demo session, preserve security evidence and verify protected object integrity.</textarea>`,`${button("Create Incident","create-incident","primary","warning")}${button("Cancel","close-modal")}`);
  }
  function createIncident(){ addAudit("SECURITY","INCIDENT_CREATED","INC-DEMO-DYNAMIC","SUCCESS","RM Demo Incident Commander");closeModal();toast("Demo incident created","One incident ID and authoritative timeline were represented.","warning"); }

  function privacyRequest(){
    modal("Demo Privacy / Data-Subject Request","The workflow routes identity, legal-basis, retention and Legal Hold review; it does not automatically delete protected evidence.",`<div class="progress-list">${[["Identity review","Confirm requester and data relationship."],["Legal-basis review","Determine applicable processing basis and restrictions."],["Retention review","Check approved retention policy."],["Legal Hold review","Prevent action that conflicts with an active hold."],["Controlled response","Record decision and authorized response."]].map(x=>`<div class="progress-row"><div class="progress-icon">${icon("file")}</div><div><strong>${x[0]}</strong><small>${x[1]}</small></div>${badge("ROUTED","blue")}</div>`).join("")}</div>`,button("Acknowledge","close-modal","primary"));addAudit("PRIVACY","DATA_SUBJECT_REQUEST_CREATED","DSR-DEMO-001","SUCCESS");
  }

  function actionHandler(action){
    if(action.startsWith("ai-confirm:")){reviewAi("confirm",action.split(":")[1]);return;}
    if(action.startsWith("ai-reject:")){reviewAi("reject",action.split(":")[1]);return;}
    if(action.startsWith("ai-annotate:")){reviewAi("annotate",action.split(":")[1]);return;}
    switch(action){
      case "enter-demo": state.loggedIn=true;sessionStorage.setItem("tv4_entered","1");location.hash="#/overview";render();break;
      case "logout": state.loggedIn=false;sessionStorage.removeItem("tv4_entered");location.hash="";render();break;
      case "toggle-lang": state.lang=state.lang==="ar"?"en":"ar";localStorage.setItem("tv4_lang",state.lang);render();break;
      case "toggle-theme": state.dark=!state.dark;localStorage.setItem("tv4_theme",state.dark?"dark":"light");render();break;
      case "toggle-sidebar": state.sidebarOpen=!state.sidebarOpen;render();break;
      case "guided-tour": guidedTour();break;
      case "open-first-evidence": state.selectedEvidenceId=DATA.evidence[0].id;location.hash=`#/evidence/${state.selectedEvidenceId}`;closeModal();break;
      case "verify-evidence": verifyEvidence();break;
      case "download-certificate": downloadCertificate();break;
      case "attempt-delete": negativeTest("delete");break;
      case "attempt-modify": negativeTest("modify");break;
      case "attempt-missing-chunk": negativeTest("missing");break;
      case "attempt-reorder": negativeTest("reorder");break;
      case "attempt-substitution": negativeTest("substitution");break;
      case "attempt-cross-tenant": negativeTest("crossTenant");break;
      case "simulate-ingestion": simulateIngestion();break;
      case "go-exports": location.hash="#/exports";break;
      case "generate-package": addAudit("EXPORT","PACKAGE_GENERATED",selectedEvidence().id,"SUCCESS");toast("Evidence package prepared","Manifest, integrity report, custody history and verification guide included.","package");break;
      case "offline-verify": offlineVerify();break;
      case "export-audit": exportAudit();break;
      case "run-ai": runAi();break;
      case "run-api": runApi();break;
      case "reset-api": state.apiResponse=null;render();break;
      case "apply-hold": legalHold("apply");break;
      case "request-hold-release": legalHold("release");break;
      case "approve-hold-release": approveHoldRelease();break;
      case "generate-url": generateUrl();break;
      case "filters": toast("Advanced filters","Source, date, Legal Hold, retention, case and verification filters are represented.","filter");break;
      case "new-case": toast("Demo action","Case creation is represented but not persisted in this public static demo.","cases");break;
      case "new-user": toast("Demo action","User creation is represented but not persisted in this public static demo.","users");break;
      case "privacy-request": privacyRequest();break;
      case "open-incident": openIncident();break;
      case "create-incident": createIncident();break;
      case "close-modal": closeModal();if(currentRoute().page==="evidence")render();break;
    }
  }

  document.addEventListener("click",event=>{
    const route=event.target.closest("[data-route]");
    if(route){location.hash=`#/${route.dataset.route}`;state.sidebarOpen=false;return;}
    const evidence=event.target.closest("[data-evidence]");
    if(evidence){state.selectedEvidenceId=evidence.dataset.evidence;state.evidenceTab="custody";location.hash=`#/evidence/${state.selectedEvidenceId}`;return;}
    const tab=event.target.closest("[data-tab]");
    if(tab){state.evidenceTab=tab.dataset.tab;render();return;}
    const api=event.target.closest("[data-api]");
    if(api){state.selectedApi=Number(api.dataset.api);state.apiResponse=null;render();return;}
    const filter=event.target.closest("[data-filter]");
    if(filter){document.querySelectorAll("[data-filter]").forEach(x=>x.classList.remove("active"));filter.classList.add("active");let records=DATA.evidence;const f=filter.dataset.filter;if(f==="verified")records=records.filter(e=>e.integrity==="VERIFIED");if(f==="hold")records=records.filter(e=>legalHoldState(e));if(f==="video")records=records.filter(e=>e.type==="Video");if(f==="document")records=records.filter(e=>["Document","Email"].includes(e.type));const table=document.getElementById("vault-table");if(table)table.innerHTML=evidenceTable(records);return;}
    const action=event.target.closest("[data-action]");
    if(action){actionHandler(action.dataset.action);return;}
    if(event.target.classList.contains("modal-backdrop"))closeModal();
  });

  document.addEventListener("input",event=>{
    if(event.target.id==="vault-search"){
      const q=event.target.value.trim().toLowerCase();
      const records=DATA.evidence.filter(e=>[e.id,e.title,e.source,e.caseId,e.caseName,e.tags.join(" ")].join(" ").toLowerCase().includes(q));
      const table=document.getElementById("vault-table");if(table)table.innerHTML=evidenceTable(records);
    }
    if(event.target.id==="audit-search"){
      const q=event.target.value.trim().toLowerCase();
      const records=[...state.dynamicAudit,...DATA.audit].filter(a=>Object.values(a).join(" ").toLowerCase().includes(q));
      const table=document.getElementById("audit-table");if(table)table.innerHTML=auditTable(records);
    }
    if(event.target.id==="global-search"){
      const q=event.target.value.trim().toLowerCase();
      const records=DATA.evidence.filter(e=>[e.id,e.title,e.source,e.caseId,e.caseName,e.tags.join(" ")].join(" ").toLowerCase().includes(q));
      const target=document.getElementById("search-results");if(target)target.innerHTML=evidenceTable(records);
    }
  });

  window.addEventListener("hashchange",render);
  window.addEventListener("error",event=>{
    console.error("RM TraceVault demo error",event.error||event.message);
    if(!root.innerHTML.trim()) root.innerHTML=`<div class="fatal"><div class="fatal-card"><img src="assets/rm-wordmark-v4.svg" alt="RM TraceVault" style="width:260px;background:#fff;border-radius:12px;padding:10px"/><h1>Demo interface could not be rendered</h1><p>A controlled fallback prevented a blank page. Refresh the browser or return to the overview.</p><code>${esc(event.message||"Unknown error")}</code><div style="margin-top:18px">${button("Return to Overview","recover","primary","refresh")}</div></div></div>`;
  });
  window.addEventListener("unhandledrejection",event=>{console.error("Unhandled demo promise rejection",event.reason);toast("A demo action was stopped safely","No evidence or state was changed.","warning");});
  document.addEventListener("click",event=>{const recover=event.target.closest('[data-action="recover"]');if(recover){location.hash="#/overview";location.reload();}});

  render();
})();