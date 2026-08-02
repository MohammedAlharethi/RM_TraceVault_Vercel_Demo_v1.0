(() => {
  "use strict";

  const APP_VERSION = "4.0";
  const D = window.TRACEVAULT_DEMO;
  const app = document.getElementById("app");
  const modalRoot = document.getElementById("modal-root");
  const toastRoot = document.getElementById("toast-root");

  if (!D || !app || !modalRoot || !toastRoot) {
    throw new Error("RM TraceVault demo failed to initialize required runtime elements.");
  }

  D.technical.aiRun.application_build = `demo-v${APP_VERSION}`;
  document.title = `RM TraceVault — Enterprise Demo v${APP_VERSION}`;

  const state = {
    lang: localStorage.getItem("tv_lang") || (navigator.language?.startsWith("ar") ? "ar" : "en"),
    theme: localStorage.getItem("tv_theme") || "light",
    sidebarOpen: false,
    selectedEvidenceId: D.evidence[0].id,
    attemptEvents: {},
    auditEvents: [],
    aiReviewerStatus: D.technical.aiRun.reviewer_status
  };

  const I18N = {
    en: {
      overview: "Executive Overview",
      vault: "Evidence Vault",
      ingestion: "Ingestion & Connectors",
      cases: "Case Workspace",
      search: "Search & Review",
      ai: "AI Analysis — Phase 2",
      exports: "Exports & Verification",
      audit: "Audit Center",
      operations: "Security Operations",
      tenants: "Tenant Administration",
      security: "Security & Trust",
      technical: "Technical Control Center",
      api: "API & Integrations",
      architecture: "Sovereign Architecture",
      editions: "Service Editions",
      platform: "Platform",
      assurance: "Assurance",
      governance: "Governance",
      demo: "Public concept demo",
      banner: "All records are fictional. Displayed controls simulate the target product and do not represent production acceptance, certification or legal opinion.",
      guided: "Guided demo",
      verify: "Verify integrity",
      certificate: "Print / Save PDF Certificate",
      evidencePackage: "Generate evidence package",
      deleteAttempt: "Attempt protected deletion",
      modifyAttempt: "Attempt protected modification",
      explore: "Explore Evidence Vault",
      legalMemory: "Legal Memory. Sealed Forever.",
      close: "Close",
      run: "Run",
      simulated: "Demo simulation",
      designed: "Designed",
      phase2: "Phase 2",
      future: "Future",
      notClaimed: "Not claimed"
    },
    ar: {
      overview: "النظرة التنفيذية",
      vault: "خزنة الأدلة",
      ingestion: "إدخال الأدلة والموصلات",
      cases: "مساحة القضايا",
      search: "البحث والمراجعة",
      ai: "تحليل الذكاء الاصطناعي — المرحلة الثانية",
      exports: "التصدير والتحقق",
      audit: "مركز التدقيق",
      operations: "العمليات الأمنية",
      tenants: "إدارة المؤسسات",
      security: "الأمن والثقة",
      technical: "مركز الضوابط التقنية",
      api: "واجهات API والتكاملات",
      architecture: "المعمارية السيادية",
      editions: "إصدارات الخدمة",
      platform: "المنصة",
      assurance: "الضمان التقني",
      governance: "الحوكمة",
      demo: "ديمو مفاهيمي عام",
      banner: "جميع السجلات افتراضية، والضوابط المعروضة تحاكي المنتج المستهدف ولا تمثل قبولاً إنتاجياً أو شهادة امتثال أو رأياً قانونياً.",
      guided: "جولة تعريفية",
      verify: "التحقق من السلامة",
      certificate: "طباعة أو حفظ شهادة PDF",
      evidencePackage: "إنشاء حزمة الدليل",
      deleteAttempt: "محاولة حذف الدليل المحمي",
      modifyAttempt: "محاولة تعديل الدليل المحمي",
      explore: "استكشف خزنة الأدلة",
      legalMemory: "ذاكرة قانونية مختومة إلى الأبد",
      close: "إغلاق",
      run: "تشغيل",
      simulated: "محاكاة ديمو",
      designed: "مصمم",
      phase2: "المرحلة الثانية",
      future: "مستقبلي",
      notClaimed: "غير مدعى"
    }
  };

  const navGroups = [
    {
      label: "platform",
      items: [
        ["overview", "layout"], ["vault", "database"], ["ingestion", "upload"],
        ["cases", "briefcase"], ["search", "search"], ["ai", "sparkles"],
        ["exports", "package"]
      ]
    },
    {
      label: "assurance",
      items: [
        ["audit", "document"], ["operations", "activity"], ["security", "shield-check"],
        ["technical", "layers"], ["api", "code"]
      ]
    },
    {
      label: "governance",
      items: [["tenants", "building"], ["architecture", "globe"], ["editions", "sparkles"]]
    }
  ];

  const ICONS = {
    layout: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
    database: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/>',
    upload: '<path d="M12 16V4M7 9l5-5 5 5M4 20h16"/>',
    briefcase: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2M3 12h18M10 12v2h4v-2"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
    package: '<path d="M21 8l-9-5-9 5 9 5 9-5z"/><path d="M3 8v8l9 5 9-5V8M12 13v8"/>',
    building: '<path d="M4 21V4h11v17M15 9h5v12M8 8h3M8 12h3M8 16h3M18 13h1M18 17h1M2 21h20"/>',
    "shield-check": '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-5"/>',
    layers: '<path d="M12 2l9 5-9 5-9-5 9-5z"/><path d="M3 12l9 5 9-5M3 17l9 5 9-5"/>',
    sparkles: '<path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3zM5 16l.9 2.1L8 19l-2.1.9L5 22l-.9-2.1L2 19l2.1-.9L5 16z"/>',
    bell: '<path d="M18 8a6 6 0 00-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 010 18M12 3a15 15 0 000 18"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
    "hard-drive": '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 15h.01M11 15h6M7 9h10"/>',
    scale: '<path d="M12 3v18M5 7h14M7 7l-4 7h8L7 7zM17 7l-4 7h8l-4-7z"/>',
    activity: '<path d="M3 12h4l2-5 4 10 2-5h6"/>',
    camera: '<rect x="3" y="6" width="15" height="12" rx="2"/><path d="M18 10l4-2v8l-4-2M7 6l1.5-3h4L14 6"/>',
    folder: '<path d="M3 6h6l2 2h10v11H3V6z"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    code: '<path d="M8 9l-3 3 3 3M16 9l3 3-3 3M14 5l-4 14"/>',
    lock: '<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 018 0v3M12 14v3"/>',
    fingerprint: '<path d="M12 11a3 3 0 00-3 3c0 3-1 5-2 6M15 14a6 6 0 01-2 5M6 14a6 6 0 0112 0c0 4-1 6-2 7M8 9a6 6 0 018-1M5 8a9 9 0 0114 1"/>',
    key: '<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M15 8l3 3M17 6l2 2"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    file: '<path d="M5 3h9l5 5v13H5V3z"/><path d="M14 3v5h5M8 13h8M8 17h6"/>',
    video: '<rect x="3" y="6" width="14" height="12" rx="2"/><path d="M17 10l4-2v8l-4-2"/>',
    check: '<path d="M5 12l4 4L19 6"/>',
    x: '<path d="M6 6l12 12M18 6L6 18"/>',
    filter: '<path d="M4 5h16M7 12h10M10 19h4"/>',
    eye: '<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z"/><circle cx="12" cy="12" r="2.5"/>',
    download: '<path d="M12 3v12M7 10l5 5 5-5M4 21h16"/>',
    users: '<path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>',
    refresh: '<path d="M20 11a8 8 0 10-2 5.5M20 4v7h-7"/>',
    trash: '<path d="M3 6h18M8 6V4h8v2M6 6l1 15h10l1-15M10 10v7M14 10v7"/>',
    edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 013 3L8 18l-4 1 1-4L16.5 3.5z"/>',
    link: '<path d="M10 13a5 5 0 007.1 0l2-2a5 5 0 00-7.1-7.1l-1.1 1.1"/><path d="M14 11a5 5 0 00-7.1 0l-2 2A5 5 0 0012 20.1l1.1-1.1"/>',
    document: '<path d="M5 3h9l5 5v13H5V3z"/><path d="M14 3v5h5M8 13h8M8 17h6"/>',
    warning: '<path d="M10.3 3.5L2.7 17a2 2 0 001.8 3h15a2 2 0 001.8-3L13.7 3.5a2 2 0 00-3.4 0z"/><path d="M12 9v4M12 17h.01"/>',
    play: '<circle cx="12" cy="12" r="9"/><path d="M10 8l6 4-6 4V8z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    moon: '<path d="M21 12.8A8.5 8.5 0 1111.2 3 6.8 6.8 0 0021 12.8z"/>'
  };

  const t = key => I18N[state.lang]?.[key] || I18N.en[key] || key;
  const isArabic = () => state.lang === "ar";
  const esc = value => String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);
  const nowAst = () => `${new Date().toLocaleString("en-GB", {
    day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false
  })} AST`;
  const icon = (name, className = "") => `<svg class="${className}" viewBox="0 0 24 24" aria-hidden="true" stroke-linecap="round" stroke-linejoin="round">${ICONS[name] || ICONS.info}</svg>`;
  const badge = (text, tone = "gray") => `<span class="badge ${tone}">${esc(text)}</span>`;
  const button = (text, action, tone = "", iconName = "") => `<button type="button" class="btn ${tone}" data-action="${esc(action)}">${iconName ? icon(iconName) : ""}<span>${esc(text)}</span></button>`;
  const currentRoute = () => {
    const raw = location.hash.replace(/^#\/?/, "") || "overview";
    const [page, id] = raw.split("/");
    if (page === "evidence" && id) state.selectedEvidenceId = id;
    return { page, id };
  };
  const selectedEvidence = () => D.evidence.find(evidence => evidence.id === state.selectedEvidenceId) || D.evidence[0];
  const attemptEvents = evidenceId => state.attemptEvents[evidenceId] || [];
  const allCustody = evidence => [...evidence.custody, ...attemptEvents(evidence.id)];
  const routeLabel = id => t(id);

  function navButton(id, iconName, activePage) {
    return `<button type="button" class="nav-item ${activePage === id ? "active" : ""}" data-route="${id}">${icon(iconName)}<span>${esc(routeLabel(id))}</span>${activePage === id ? '<span class="nav-meta" aria-hidden="true">●</span>' : ""}</button>`;
  }

  function shell(content, activePage) {
    const navHtml = navGroups.map(group => `<div class="nav-label">${esc(t(group.label))}</div>${group.items.map(([id, iconName]) => navButton(id, iconName, activePage)).join("")}`).join("");
    const themeIcon = state.theme === "dark" ? "sun" : "moon";
    return `<div class="app-shell">
      <aside class="sidebar ${state.sidebarOpen ? "open" : ""}" aria-label="${isArabic() ? "التنقل الرئيسي" : "Primary navigation"}">
        <div class="brand-block">
          <div class="brand-lockup">
            <img class="brand-mark" src="assets/rm-logo.svg" alt="RM">
            <div class="brand-copy"><strong>RM TraceVault</strong><span>SECURE · TRACE · PROTECT</span><small>${isArabic() ? "حيازة الأدلة الرقمية السيادية" : D.product.descriptor}</small></div>
          </div>
          <div class="brand-descriptor">${esc(t("legalMemory"))}</div>
          <div class="demo-chip">${esc(t("demo"))} · v${APP_VERSION}</div>
        </div>
        <nav class="nav-scroll">${navHtml}</nav>
        <div class="sidebar-footer"><div class="sovereign-card"><strong>${isArabic() ? "النطاق المستهدف: المملكة العربية السعودية" : "Target deployment: Saudi Arabia"}</strong><small>${isArabic() ? "حفظ الأدلة والتحقق من السلامة وعهدة الحيازة ضمن نموذج سيادي." : "Evidence preservation, integrity verification and audit-ready custody in a sovereign model."}</small></div></div>
      </aside>
      <main class="main">
        <header class="topbar">
          <div class="top-left">
            <button type="button" class="mobile-menu" data-action="toggle-sidebar" aria-label="${isArabic() ? "فتح القائمة" : "Open navigation"}">${icon("menu")}</button>
            <div class="tenant-switcher"><div class="tenant-avatar">DA</div><div class="tenant-copy"><strong>${isArabic() ? "المنظمة التجريبية ألفا" : D.tenant.name}</strong><small>${esc(D.tenant.plan)} · ${esc(D.tenant.region)}</small></div></div>
          </div>
          <div class="top-actions">
            <button type="button" class="icon-button" data-action="guided-tour" aria-label="${esc(t("guided"))}">${icon("play")}</button>
            <button type="button" class="icon-button" data-action="toggle-theme" aria-label="${isArabic() ? "تبديل المظهر" : "Toggle theme"}">${icon(themeIcon)}</button>
            <button type="button" class="icon-button" aria-label="${isArabic() ? "الإشعارات" : "Notifications"}">${icon("bell")}</button>
            <button type="button" class="lang-button" data-action="toggle-lang">${isArabic() ? "EN" : "عربي"}</button>
            <div class="user-pill"><div class="user-circle">RM</div><div class="user-copy"><strong>Demo Administrator</strong><small>Public presentation</small></div></div>
          </div>
        </header>
        <div class="content">
          <div class="demo-banner">${icon("info")}<span><strong>${esc(t("demo"))}:</strong> ${esc(t("banner"))}</span></div>
          ${content}
        </div>
      </main>
    </div>`;
  }

  function pageHeader(kicker, title, description, actions = "") {
    return `<header class="page-header"><div><div class="page-kicker">${esc(kicker)}</div><h1>${esc(title)}</h1><p>${esc(description)}</p></div><div class="page-actions">${actions}</div></header>`;
  }

  function overviewPage() {
    const kpis = [
      ["database", D.tenant.evidenceObjects.toLocaleString(), isArabic() ? "كائن دليل محفوظ" : "Evidence objects", "100% verified"],
      ["briefcase", D.tenant.activeCases, isArabic() ? "قضية نشطة" : "Active cases", "+8 this quarter"],
      ["hard-drive", `${D.tenant.storageUsed} TB`, isArabic() ? "التخزين المستخدم" : "Storage used", `${D.tenant.storageAllowance} TB allowance`],
      ["fingerprint", `${D.tenant.integrityRate}%`, isArabic() ? "سلامة الأدلة" : "Integrity verified", "No failures"],
      ["scale", D.tenant.legalHolds, isArabic() ? "حجز قانوني" : "Legal Holds", "All enforced"],
      ["package", D.tenant.pendingExports, isArabic() ? "طلبات تصدير" : "Pending exports", "2 verification ready"]
    ];
    return shell(`<section class="hero">
      <div class="hero-content"><div class="hero-kicker">${esc(D.product.descriptor)}</div><h2>${esc(t("legalMemory"))}</h2><p>${isArabic() ? "تجربة مؤسسية توضح حفظ الأدلة الرقمية وإثبات سلامتها وتسجيل عهدة الحيازة وتصديرها ضمن حزمة قابلة للتحقق." : "An enterprise experience showing how digital evidence is preserved, verified, governed through chain of custody and exported as a portable verification package."}</p><div class="hero-actions">${button(t("explore"), "go-vault", "primary", "database")}${button(t("guided"), "guided-tour", "", "play")}</div></div>
      <aside class="hero-panel"><div class="hero-seal"><div class="hero-seal-icon">${icon("shield-check")}</div><div><strong>${isArabic() ? "نموذج الثقة الرقمية" : "Digital trust model"}</strong><small>Integrity · Immutability · Custody · Verification</small></div></div><div class="hero-pillars">${D.product.pillars.map(pillar => `<div class="hero-pillar">${esc(pillar)}</div>`).join("")}</div></aside>
    </section>
    <section class="kpi-grid">${kpis.map(kpi => `<article class="kpi"><div class="kpi-top"><div class="kpi-icon">${icon(kpi[0])}</div><span class="kpi-delta">${esc(kpi[3])}</span></div><strong>${esc(kpi[1])}</strong><span>${esc(kpi[2])}</span></article>`).join("")}</section>
    <section class="grid two">
      <article class="card chart-card"><header class="card-header"><div><h3>${isArabic() ? "السعة ومصادر الأدلة" : "Capacity & evidence sources"}</h3><p>${isArabic() ? "توزيع استخدام السعة في بيئة العرض" : "Illustrative tenant storage allocation"}</p></div>${badge("Healthy", "green")}</header><div class="card-body"><div class="storage-chart"><div class="donut"><div class="donut-value"><strong>62.8%</strong><span>${D.tenant.storageUsed} / ${D.tenant.storageAllowance} TB</span></div></div><div class="legend-list">${[["CCTV & Video", "96.2 TB"], ["Email & Documents", "42.8 TB"], ["Logs & Datasets", "27.4 TB"], ["Forensic Images", "22.0 TB"]].map((item, index) => `<div class="legend-item"><i class="legend-dot dot-${index + 1}"></i><strong>${esc(item[0])}</strong><span>${esc(item[1])}</span></div>`).join("")}</div></div></div></article>
      <article class="card"><header class="card-header"><div><h3>${isArabic() ? "النشاط الأخير" : "Recent custody activity"}</h3><p>${isArabic() ? "أحداث سلامة وحيازة قابلة للتدقيق" : "Auditable custody and integrity events"}</p></div>${badge(t("simulated"), "blue")}</header><div class="card-body"><div class="activity-list">${D.activity.map(activity => `<div class="activity-row"><span class="activity-time">${esc(activity.time)}</span><div class="activity-line"><i></i></div><div class="activity-copy"><strong>${esc(activity.action)}</strong><small>${esc(activity.actor)}</small></div><span class="activity-subject">${esc(activity.subject)}</span></div>`).join("")}</div></div></article>
    </section>
    <section class="grid two">
      <article class="card"><header class="card-header"><div><h3>${isArabic() ? "ضوابط الثقة" : "Trust controls"}</h3><p>${isArabic() ? "حالة الضوابط الأساسية في المنصة" : "Core platform control posture"}</p></div></header><div class="card-body"><div class="control-grid">${D.controls.map(control => `<div class="control-item"><div class="control-icon">${icon(control.icon)}</div><div><strong>${esc(control.name)}</strong><small>${esc(control.detail)}</small></div>${badge(control.status, "green")}</div>`).join("")}</div></div></article>
      <article class="certificate-card"><div class="certificate-brand"><img src="assets/rm-logo.svg" alt="RM"><div><strong>RM TRACEVAULT</strong><span>INTEGRITY · CUSTODY · VERIFICATION</span></div></div><h3>${isArabic() ? "شهادة سلامة الدليل" : "Evidence Integrity Certificate"}</h3><p>${isArabic() ? "اطبع أو احفظ شهادة PDF ثنائية اللغة تتضمن معرف الدليل والبصمة والحفظ غير القابل للتعديل والتشفير وملخص عهدة الحيازة." : "Print or save a bilingual PDF certificate containing the evidence ID, integrity fingerprint, immutable-retention status, encryption profile and custody summary."}</p><div class="certificate-fields"><div class="certificate-field"><span>Evidence</span><strong>EV-DEMO-0001</strong></div><div class="certificate-field"><span>Status</span><strong>VERIFIED / PROTECTED</strong></div><div class="certificate-field"><span>Custody events</span><strong>7 signed events</strong></div><div class="certificate-field"><span>Version</span><strong>v${APP_VERSION}</strong></div></div>${button(t("certificate"), "print-certificate", "primary", "download")}</article>
    </section>`, "overview");
  }

  function evidenceTable(records) {
    return `<div class="table-wrap"><table class="data-table"><thead><tr><th>Evidence</th><th>Source</th><th>Case</th><th>Size</th><th>Integrity</th><th>Retention</th><th>Custody</th></tr></thead><tbody>${records.map(evidence => `<tr class="clickable" data-evidence-id="${esc(evidence.id)}" tabindex="0" role="link" aria-label="${esc(`${evidence.id} ${evidence.title}`)}"><td><div class="file-cell"><div class="file-icon">${icon(evidence.type === "Video" ? "video" : "file")}</div><div><strong>${esc(evidence.title)}</strong><small>${esc(evidence.id)} · ${esc(evidence.mime)}</small></div></div></td><td>${esc(evidence.source)}</td><td><strong>${esc(evidence.caseId)}</strong><div class="hash-mini">${esc(evidence.caseName)}</div></td><td>${esc(evidence.size)}</td><td>${badge(evidence.integrity, "green")}</td><td>${esc(evidence.retention)}</td><td>${badge(`${allCustody(evidence).length} logged`, "blue")}</td></tr>`).join("")}</tbody></table></div>`;
  }

  function vaultPage() {
    return shell(`${pageHeader("EVIDENCE CUSTODY", t("vault"), isArabic() ? "مستودع مركزي للأدلة المحمية مع حالة السلامة والاحتفاظ والحجز القانوني وعهدة الحيازة." : "A central protected evidence inventory with integrity, retention, Legal Hold and chain-of-custody status.", button(isArabic() ? "إضافة دليل تجريبي" : "Simulate evidence intake", "simulate-ingestion", "primary", "upload"))}
      <div class="data-tools"><label class="searchbox" for="vault-search">${icon("search")}<input id="vault-search" placeholder="${isArabic() ? "ابحث بالمعرف أو اسم الملف أو القضية" : "Search by ID, filename, source or case"}"></label><button type="button" class="filter-pill active">All evidence</button><button type="button" class="filter-pill">Verified</button><button type="button" class="filter-pill">Legal Hold</button><button type="button" class="filter-pill">CCTV</button><button type="button" class="filter-pill">Email</button></div>
      <article class="card"><header class="card-header"><div><h3>${isArabic() ? "سجل الأدلة" : "Evidence inventory"}</h3><p>${D.evidence.length} ${isArabic() ? "سجلات افتراضية للعرض" : "fictional records in this demonstration"}</p></div>${badge("Authorization filtered", "green")}</header><div class="card-body flush" id="vault-table">${evidenceTable(D.evidence)}</div></article>`, "vault");
  }

  function evidencePage() {
    const evidence = selectedEvidence();
    const custody = allCustody(evidence);
    const actions = [
      button(t("verify"), "verify-current", "primary", "fingerprint"),
      button(t("certificate"), "print-certificate", "", "download"),
      button(t("evidencePackage"), "go-exports", "", "package")
    ].join("");
    return shell(`${pageHeader("EVIDENCE RECORD", `${evidence.id} · ${evidence.title}`, `${evidence.caseId} · ${evidence.caseName}`, actions)}
      <section class="evidence-layout">
        <article class="card"><header class="card-header"><div><h3>${isArabic() ? "معاينة الدليل والبيانات الوصفية" : "Evidence preview & metadata"}</h3><p>${esc(evidence.source)} · ${esc(evidence.sourceDetail)}</p></div>${badge(evidence.status, "green")}</header><div class="card-body"><div class="preview-panel">${evidence.type === "Video" ? `<div class="camera-scene"><div class="preview-footer"><span>${esc(evidence.id)}</span><span>${esc(evidence.collected)}</span></div></div>` : `<div class="document-preview">${icon("file")}<h3>${esc(evidence.title)}</h3><p>${esc(evidence.type)} · Secure preview placeholder</p></div>`}</div><div class="meta-grid">${[["Evidence ID", evidence.id], ["Case", evidence.caseId], ["File size", evidence.size], ["Collected", evidence.collected], ["Retention end", evidence.retention], ["Legal Hold", evidence.legalHold ? "Applied" : "Not applied"], ["Timestamp", evidence.timestamp], ["Version", evidence.version]].map(item => `<div class="meta-item"><span>${esc(item[0])}</span><strong>${esc(item[1])}</strong></div>`).join("")}</div></div></article>
        <aside class="grid aside-stack"><article class="card"><header class="card-header"><div><h3>${isArabic() ? "درجة الثقة" : "Evidence trust score"}</h3><p>${isArabic() ? "مؤشرات الحفظ والسلامة والحيازة" : "Preservation, integrity and custody posture"}</p></div></header><div class="card-body"><div class="trust-score"><div class="score-ring"><strong>${evidence.trustScore}</strong></div><div><h3>${isArabic() ? "الدليل سليم ومحمي" : "Evidence verified & protected"}</h3><p>${isArabic() ? "جميع اختبارات السلامة نجحت ولا توجد فجوات في عهدة الحيازة." : "All integrity checks passed with no custody gaps detected."}</p></div></div><div class="control-grid single-column">${[["Immutable storage", evidence.worm, "lock"], ["Encryption", evidence.encryption, "key"], ["Integrity", evidence.integrity, "fingerprint"], ["Custody signature", evidence.signature, "shield-check"]].map(control => `<div class="control-item"><div class="control-icon">${icon(control[2])}</div><div><strong>${esc(control[0])}</strong><small>${esc(control[1])}</small></div>${badge("Active", "green")}</div>`).join("")}</div></div></article>
        <article class="enforcement-card"><div class="enforcement-head"><div><h3>${isArabic() ? "اختبار منع العبث" : "Tamper-resistance simulation"}</h3><p>${isArabic() ? "اختبر كيف تمنع المنصة حذف الدليل أو تعديل نسخته المحمية." : "Demonstrate how protected evidence rejects deletion or modification."}</p></div>${badge("ENFORCED", "red")}</div><div class="enforcement-actions">${button(t("deleteAttempt"), "attempt-delete", "danger", "trash")}${button(t("modifyAttempt"), "attempt-modify", "danger", "edit")}</div><div class="enforcement-note">${isArabic() ? "كل محاولة محظورة تسجل كحدث تدقيق وعهدة حيازة دون تغيير الدليل." : "Every blocked attempt is recorded as an audit and custody event without changing the evidence."}</div></article></aside>
      </section>
      <section class="grid two">
        <article class="card"><header class="card-header"><div><h3>${isArabic() ? "البصمة الرقمية" : "Whole-evidence integrity fingerprint"}</h3><p>SHA-512 · Registered before immutable commit</p></div>${badge("MATCH", "green")}</header><div class="card-body"><div class="hash-box"><header><span>SHA-512 · 128 HEX</span>${badge("Verified", "green")}</header><code>${esc(evidence.hash)}</code></div><div class="card-actions">${button(t("verify"), "verify-current", "primary", "fingerprint")}</div></div></article>
        <article class="certificate-card"><div class="certificate-brand"><img src="assets/rm-logo.svg" alt="RM"><div><strong>RM TRACEVAULT</strong><span>INTEGRITY · CUSTODY · VERIFICATION</span></div></div><h3>${isArabic() ? "شهادة سلامة الدليل وعهدة الحيازة" : "Integrity & Chain-of-Custody Certificate"}</h3><p>${isArabic() ? "صفحة شهادة قابلة للطباعة والحفظ بصيغة PDF وتدعم النص العربي بالكامل." : "A printable certificate page that can be saved as PDF and fully supports Arabic text."}</p><div class="certificate-fields"><div class="certificate-field"><span>Certificate ID</span><strong>CERT-${esc(evidence.id)}</strong></div><div class="certificate-field"><span>Verification</span><strong>${esc(evidence.verified)}</strong></div><div class="certificate-field"><span>Custody events</span><strong>${custody.length} logged</strong></div><div class="certificate-field"><span>Version</span><strong>v${APP_VERSION}</strong></div></div>${button(t("certificate"), "print-certificate", "primary", "download")}</article>
      </section>
      <article class="card section-gap"><header class="card-header"><div><h3>${isArabic() ? "عهدة الحيازة" : "Chain of Custody"}</h3><p>${isArabic() ? "تسلسل كامل للأحداث والفاعل والوقت والغرض." : "A complete sequence of actions, actors, timestamps and purpose."}</p></div>${badge(`${custody.length} events`, "blue")}</header><div class="card-body"><div class="timeline">${custody.map(event => `<div class="timeline-item"><i class="timeline-dot"></i><strong>${esc(event.action)}</strong><p>${esc(event.detail)}</p><time>${esc(event.time)} · ${esc(event.actor)}</time><span class="timeline-signature">${badge(event.status || "Logged", event.status === "Blocked" ? "red" : "green")}</span></div>`).join("")}</div></div></article>`, "vault");
  }

  function ingestionPage() {
    const steps = [
      ["1", "Source authorization", "Validate connector and tenant scope"],
      ["2", "Metadata capture", "Register source, actor, time and case"],
      ["3", "Chunk encryption", "Apply per-evidence encryption profile"],
      ["4", "Immutable commit", "Write under Compliance Mode policy"],
      ["5", "Verification", "Recompute SHA-512 and register custody"]
    ];
    return shell(`${pageHeader("CONTROLLED ACQUISITION", t("ingestion"), isArabic() ? "استقبال الأدلة من مصادر متعددة مع التحقق والتشفير والحفظ غير القابل للتعديل وتسجيل الحيازة." : "Acquire evidence from multiple sources with validation, encryption, immutable commit and custody registration.", button(isArabic() ? "تشغيل محاكاة الإدخال" : "Run ingestion simulation", "simulate-ingestion", "primary", "play"))}
      <section class="ingestion-steps">${steps.map(step => `<article class="ingestion-step"><div class="step-num">${step[0]}</div><strong>${esc(step[1])}</strong><small>${esc(step[2])}</small></article>`).join("")}</section>
      <section class="grid two"><article class="card"><header class="card-header"><div><h3>${isArabic() ? "الموصلات" : "Evidence source connectors"}</h3><p>${isArabic() ? "مصادر إدخال افتراضية ضمن تجربة المنتج" : "Fictional sources represented in the product experience"}</p></div>${badge("6 available", "blue")}</header><div class="card-body"><div class="connector-grid">${D.connectors.map(connector => `<article class="connector"><div class="connector-top"><div class="connector-icon">${icon(connector.icon)}</div><div><strong>${esc(connector.name)}</strong><small>${esc(connector.detail)}</small></div></div><div class="connector-foot"><span>${esc(connector.volume)}</span>${badge(connector.status, connector.status === "Connected" ? "green" : "blue")}</div></article>`).join("")}</div></div></article>
      <article class="card"><header class="card-header"><div><h3>${isArabic() ? "سياسة الإدخال" : "Secure ingestion profile"}</h3><p>${isArabic() ? "ضوابط الحماية في رحلة الدليل" : "Protection controls represented throughout the flow"}</p></div></header><div class="card-body"><div class="control-grid single-column">${[["Resumable upload", "Large-file continuation and ordered chunks", "upload"], ["Integrity baseline", "SHA-512 over original evidence stream", "fingerprint"], ["Chunk encryption", "Per-evidence DEK and authenticated chunks", "key"], ["Immutable retention", "Compliance Mode commit", "lock"], ["Custody registration", "Signed actor, time and action event", "link"], ["Verification result", "Explicit pass/fail evidence", "shield-check"]].map(control => `<div class="control-item"><div class="control-icon">${icon(control[2])}</div><div><strong>${control[0]}</strong><small>${control[1]}</small></div>${badge("Configured", "blue")}</div>`).join("")}</div></div></article></section>
      <article class="card"><header class="card-header"><div><h3>${isArabic() ? "دفعات الإدخال" : "Ingestion activity"}</h3><p>${isArabic() ? "مثال على تقدم المعالجة" : "Illustrative processing state"}</p></div></header><div class="card-body flush"><div class="table-wrap"><table class="data-table"><thead><tr><th>Batch</th><th>Source</th><th>Size</th><th>Validation</th><th>Encryption</th><th>SHA-512</th><th>WORM</th><th>Owner</th></tr></thead><tbody><tr><td><strong>BATCH-DEMO-0074</strong></td><td>CCTV / VMS</td><td>18.2 GB</td><td>${badge("Passed", "green")}</td><td>${badge("Complete", "green")}</td><td>${badge("Verified", "green")}</td><td>${badge("Committed", "green")}</td><td>Connector Service</td></tr><tr><td><strong>BATCH-DEMO-0075</strong></td><td>Microsoft 365</td><td>9.4 GB</td><td>${badge("Passed", "green")}</td><td>${badge("Processing", "blue")}</td><td>${badge("Pending", "gray")}</td><td>${badge("Pending", "gray")}</td><td>Demo Investigator B</td></tr><tr><td><strong>BATCH-DEMO-0076</strong></td><td>Manual Upload</td><td>42.8 GB</td><td>${badge("Passed", "green")}</td><td>${badge("Complete", "green")}</td><td>${badge("Verified", "green")}</td><td>${badge("Committed", "green")}</td><td>Demo Forensic Examiner</td></tr></tbody></table></div></div></article>`, "ingestion");
  }

  function casesPage() {
    return shell(`${pageHeader("INVESTIGATION CONTEXT", t("cases"), isArabic() ? "تنظيم الأدلة والمهام والملاحظات والتصدير ضمن سياق القضية." : "Organize evidence, tasks, notes and export requests inside a governed case context.", button(isArabic() ? "قضية تجريبية جديدة" : "New demo case", "new-case", "primary", "briefcase"))}
      <section class="case-grid">${D.cases.map(caseItem => `<article class="case-card"><div class="case-top"><div><div class="case-id">${esc(caseItem.id)}</div><h3>${esc(caseItem.name)}</h3><p>${esc(caseItem.owner)} · ${esc(caseItem.updated)}</p></div>${badge(caseItem.priority, caseItem.priority === "Critical" ? "red" : caseItem.priority === "High" ? "amber" : "blue")}</div><div class="case-stats"><div><span>Evidence</span><strong>${caseItem.evidence.toLocaleString()}</strong></div><div><span>Alerts</span><strong>${caseItem.alerts}</strong></div><div><span>Exports</span><strong>${caseItem.exports}</strong></div></div></article>`).join("")}</section>
      <section class="grid two"><article class="card"><header class="card-header"><div><h3>${isArabic() ? "أدلة القضية النشطة" : "Active case evidence"}</h3><p>CASE-DEMO-0421 · Financial Activity Review</p></div></header><div class="card-body flush">${evidenceTable(D.evidence.filter(evidence => evidence.caseId === "CASE-DEMO-0421"))}</div></article><article class="card"><header class="card-header"><div><h3>${isArabic() ? "المهام والملاحظات" : "Tasks & controlled notes"}</h3><p>${isArabic() ? "تعاون موثق داخل القضية" : "Documented collaboration within the case"}</p></div></header><div class="card-body"><div class="timeline">${[["Review mailbox export", "Demo Investigator B", "Due today"], ["Validate document lineage", "Demo Investigator C", "Due tomorrow"], ["Legal Hold approval", "Demo Legal Reviewer", "Completed"], ["Prepare verification package", "Waiting for approval", "Pending"]].map((item, index) => `<div class="timeline-item"><i class="timeline-dot"></i><strong>${item[0]}</strong><p>${item[1]}</p><time>${item[2]}</time><span class="timeline-signature">${badge(index === 2 ? "Complete" : "Open", index === 2 ? "green" : "blue")}</span></div>`).join("")}</div></div></article></section>`, "cases");
  }

  function searchPage() {
    return shell(`${pageHeader("AUTHORIZED DISCOVERY", t("search"), isArabic() ? "بحث داخل البيانات الوصفية والقضايا وعهدة الحيازة مع تطبيق صلاحيات المؤسسة." : "Search evidence metadata, case context and custody history with tenant-aware authorization.", button(isArabic() ? "مرشحات متقدمة" : "Advanced filters", "filters", "", "filter"))}
      <div class="data-tools"><label class="searchbox" for="global-search">${icon("search")}<input id="global-search" value="access review" placeholder="Search evidence, cases and custody actors"></label><button type="button" class="filter-pill active">All sources</button><button type="button" class="filter-pill">Verified only</button><button type="button" class="filter-pill">Legal Hold</button><button type="button" class="filter-pill">Last 30 days</button></div>
      <article class="card"><header class="card-header"><div><h3>${isArabic() ? "نتائج البحث" : "Search results"}</h3><p>24 matches found across fictional records</p></div>${badge("Authorization filtered", "green")}</header><div class="card-body flush">${evidenceTable(D.evidence)}</div></article>`, "search");
  }

  function aiPage() {
    const run = D.technical.aiRun;
    const evidence = D.evidence.find(item => item.id === run.evidence_id) || D.evidence[0];
    return shell(`${pageHeader("PHASE 2 · DERIVED ANALYSIS", t("ai"), isArabic() ? "مخرجات مشتقة مرتبطة بالدليل وإصدار النموذج وتشغيل التحليل ولا تعدل الدليل الأصلي." : "Derived outputs linked to evidence, model profile and analysis run; the original evidence is never modified.", button(isArabic() ? "تشغيل تحليل تجريبي" : "Run demo analysis", "ai-run", "primary", "sparkles"))}
      <div class="ai-boundary">${icon("sparkles")}<div><h3>${isArabic() ? "الأصل هو مصدر الحقيقة" : "The original evidence remains authoritative"}</h3><p>${isArabic() ? "OCR وPII والتصنيف والبحث الدلالي قدرات مرحلة ثانية. النتائج قابلة للمراجعة ولا تثبت الأصالة أو الاستنتاج القانوني." : "OCR, PII detection, classification and semantic search are Phase 2 derived capabilities. Results require human review and do not prove authenticity or a legal conclusion."}</p></div>${badge(`${t("phase2")} / ${t("simulated")}`, "purple")}</div>
      <section class="analysis-layout"><article class="card"><header class="card-header"><div><h3>${isArabic() ? "نتائج التحليل المشتقة" : "Derived analysis results"}</h3><p>${esc(evidence.id)} · ${esc(evidence.title)}</p></div>${badge(state.aiReviewerStatus, "amber")}</header><div class="card-body"><div class="ai-result"><header><h4>Arabic / English OCR · F-150</h4>${badge("92% review score", "blue")}</header><p>Payment reference <span class="highlight">88421</span> was approved. رقم المستند <span class="highlight">٨٨٤٢١</span>.</p></div><div class="ai-result"><header><h4>PII Detection · F-151</h4>${badge("3 findings", "amber")}</header><p>Possible <span class="highlight pii">email</span>, <span class="highlight pii">Saudi phone pattern</span> and <span class="highlight pii">financial reference</span>.</p></div><div class="ai-result"><header><h4>Classification · F-152</h4>${badge("0.88 confidence", "blue")}</header><p>Suggested class: <strong>Financial Supporting Document</strong>. Confidence is not a verified fact.</p></div><div class="ai-result"><header><h4>Semantic Search · F-153</h4>${badge("Authorization filtered", "green")}</header><p>Related authorized records: EV-DEMO-0002 and CASE-DEMO-0421. Cross-tenant results: <strong>0</strong>.</p></div><div class="review-actions">${button(isArabic() ? "تأكيد النتيجة" : "Confirm finding", "review:confirmed", "primary", "check")}${button(isArabic() ? "رفض النتيجة" : "Reject finding", "review:rejected", "", "warning")}${button(isArabic() ? "إضافة ملاحظة" : "Add reviewer note", "review:annotated", "", "edit")}</div></div></article>
      <aside class="grid aside-stack"><article class="card"><header class="card-header"><div><h3>${isArabic() ? "أصل التحليل" : "Analysis provenance"}</h3><p>${isArabic() ? "كل نتيجة مرتبطة بتشغيل وإصدار محدد." : "Every result is attributable to a defined run and profile."}</p></div></header><div class="card-body"><div class="provenance">${Object.entries({ ...run, reviewer_status: state.aiReviewerStatus }).map(([key, value]) => `<div class="prov-item"><span>${esc(key)}</span><strong>${esc(value)}</strong></div>`).join("")}</div></div></article><article class="card"><header class="card-header"><div><h3>${isArabic() ? "حدود الصلاحية" : "Authority boundary"}</h3></div></header><div class="card-body"><div class="mini-list">${["AI cannot rewrite evidence", "AI cannot modify SHA-512, WORM or custody history", "Results remain tenant-bound derived artifacts", "Reviewer actions are audited", "Customer evidence is not automatically training data", "Deepfake indicators remain Future"].map(item => `<div class="mini-row">${esc(item)}</div>`).join("")}</div></div></article></aside></section>`, "ai");
  }

  function exportsPage() {
    const evidence = selectedEvidence();
    return shell(`${pageHeader("PORTABLE VERIFICATION", t("exports"), isArabic() ? "إنشاء حزم أدلة تحتوي على البيان والبصمات وعهدة الحيازة ونتائج التحقق." : "Build portable evidence packages containing manifests, fingerprints, custody history and verification results.", `${button(t("certificate"), "print-certificate", "primary", "download")}${button(t("evidencePackage"), "generate-package", "dark", "package")}`)}
      <section class="grid two"><article class="card"><header class="card-header"><div><h3>${isArabic() ? "منشئ حزمة الدليل" : "Evidence package builder"}</h3><p>${esc(evidence.id)} · ${esc(evidence.title)}</p></div>${badge("Ready", "green")}</header><div class="card-body"><div class="control-grid single-column">${[["Original evidence object", "Included and checksum-referenced", "file"], ["Manifest", "Evidence metadata and object inventory", "document"], ["Integrity report", "SHA-512 result and verification timestamp", "fingerprint"], ["Chain of custody", "Signed action, actor and time sequence", "link"], ["Offline verification guide", "Portable verification workflow", "shield-check"], ["Integrity certificate", "Printable bilingual summary", "download"]].map(control => `<div class="control-item"><div class="control-icon">${icon(control[2])}</div><div><strong>${control[0]}</strong><small>${control[1]}</small></div>${badge("Included", "green")}</div>`).join("")}</div></div></article>
      <article class="certificate-card"><div class="certificate-brand"><img src="assets/rm-logo.svg" alt="RM"><div><strong>RM TRACEVAULT</strong><span>PORTABLE VERIFICATION</span></div></div><h3>${isArabic() ? "تحقق مستقل وقابل للنقل" : "Portable independent verification"}</h3><p>${isArabic() ? "توضح تجربة العرض كيف تفحص الحزمة دون الاعتماد على جلسة المستخدم داخل المنصة." : "The demonstration shows how a recipient can inspect the package without relying on the original platform session."}</p><div class="certificate-fields"><div class="certificate-field"><span>Manifest</span><strong>VERIFIED</strong></div><div class="certificate-field"><span>SHA-512</span><strong>MATCH</strong></div><div class="certificate-field"><span>Custody signatures</span><strong>VALID</strong></div><div class="certificate-field"><span>Package</span><strong>COMPLETE</strong></div></div>${button(t("certificate"), "print-certificate", "primary", "download")}</article></section>
      <article class="card"><header class="card-header"><div><h3>${isArabic() ? "سجل التصدير" : "Recent export packages"}</h3><p>${isArabic() ? "أمثلة افتراضية على الحزم" : "Fictional package records"}</p></div></header><div class="card-body flush"><div class="table-wrap"><table class="data-table"><thead><tr><th>Package</th><th>Case</th><th>Evidence</th><th>Size</th><th>Requested by</th><th>Created</th><th>Status</th></tr></thead><tbody>${D.exports.map(exportItem => `<tr><td><strong>${esc(exportItem.id)}</strong></td><td>${esc(exportItem.caseId)}</td><td>${exportItem.evidence}</td><td>${esc(exportItem.size)}</td><td>${esc(exportItem.requestedBy)}</td><td>${esc(exportItem.created)}</td><td>${badge(exportItem.status, "green")}</td></tr>`).join("")}</tbody></table></div></div></article>`, "exports");
  }

  function auditPage() {
    const runtimeEvents = state.auditEvents.length ? state.auditEvents : [{ time: "—", action: "No runtime interaction yet", actor: "Demo session", evidenceId: "—", status: "Ready" }];
    return shell(`${pageHeader("AUDITABLE CONTROL HISTORY", t("audit"), isArabic() ? "مركز موحد لأحداث الوصول والتحقق والحجز القانوني ومحاولات كسر الضوابط." : "A unified center for access, verification, Legal Hold and blocked control-challenge events.", button(isArabic() ? "تصدير CSV تجريبي" : "Export demo CSV", "export-audit", "primary", "download"))}
      <section class="kpi-grid compact-kpis">${[["document", "28,431", isArabic() ? "حدث تدقيق" : "Audit events", "Tenant filtered"], ["warning", "12", isArabic() ? "محاولة محظورة" : "Blocked attempts", "Last 24 hours"], ["fingerprint", "100%", isArabic() ? "مطابقة البصمات" : "Fingerprint matches", "No failures"], ["users", "126", isArabic() ? "مستخدم مخول" : "Authorized users", "MFA enforced"]].map(kpi => `<article class="kpi"><div class="kpi-top"><div class="kpi-icon">${icon(kpi[0])}</div><span class="kpi-delta">${esc(kpi[3])}</span></div><strong>${esc(kpi[1])}</strong><span>${esc(kpi[2])}</span></article>`).join("")}</section>
      <article class="card"><header class="card-header"><div><h3>${isArabic() ? "أحداث الجلسة التجريبية" : "Demo-session events"}</h3><p>${isArabic() ? "تظهر اختبارات التحقق والعبث والمراجعة هنا فور تنفيذها." : "Verification, tamper-test and review interactions appear here immediately."}</p></div>${badge(`${runtimeEvents.length} events`, "blue")}</header><div class="card-body flush"><div class="table-wrap"><table class="data-table"><thead><tr><th>Time</th><th>Action</th><th>Actor</th><th>Evidence</th><th>Status</th></tr></thead><tbody>${runtimeEvents.map(event => `<tr><td>${esc(event.time)}</td><td><strong>${esc(event.action)}</strong></td><td>${esc(event.actor)}</td><td>${esc(event.evidenceId)}</td><td>${badge(event.status, event.status === "Blocked" ? "red" : event.status === "Verified" ? "green" : "blue")}</td></tr>`).join("")}</tbody></table></div></div></article>`, "audit");
  }

  function operationsPage() {
    return shell(`${pageHeader("INCIDENT READINESS", t("operations"), isArabic() ? "تصور تشغيلي لمراقبة فقدان الثقة واحتواء الحوادث وحفظ الأدلة والاستعادة." : "A coordinated view for detecting loss of trust, containing incidents, preserving security evidence and recovering safely.", button(isArabic() ? "فتح حادث تجريبي" : "Open demo incident", "incident", "primary", "warning"))}
      <section class="ops-grid">${[["Open security events", "7", "3 require review"], ["Integrity alerts", "0", "No active failures"], ["Blocked WORM attempts", "12", "Last 24 hours"], ["Restore tests", "3/3", "Latest passed"]].map(item => `<article class="ops-stat"><span>${item[0]}</span><strong>${item[1]}</strong><small>${item[2]}</small></article>`).join("")}</section>
      <article class="card section-gap"><header class="card-header"><div><h3>${isArabic() ? "تدفق قيادة الحادث" : "Single incident command workflow"}</h3><p>${isArabic() ? "معرف واحد للحادث وقائد وجدول زمني وسجل قرار موثوق." : "One incident ID, commander, timeline and authoritative decision log."}</p></div>${badge("Illustrative — no SLA claim", "amber")}</header><div class="card-body"><div class="v4-flow">${[["Detect", "Correlate trust signals"], ["Triage", "Classify scope"], ["Contain", "Pause risky workflow"], ["Preserve", "Protect security evidence"], ["Investigate", "Coordinate interfaces"], ["Recover", "Restore and verify"], ["Review", "RCA and controls"]].map(item => `<div class="v4-flow-step"><strong>${item[0]}</strong><small>${item[1]}</small></div>`).join("")}</div></div></article>
      <section class="grid two"><article class="card"><header class="card-header"><div><h3>${isArabic() ? "تغطية القياس والمراقبة" : "Telemetry coverage"}</h3><p>${isArabic() ? "المراقبة تركز على فقدان ثقة الدليل لا التوافر فقط." : "Monitoring focuses on loss of evidence trust, not availability alone."}</p></div></header><div class="card-body"><div class="control-grid single-column">${[["Identity & privileged access", "MFA, named identities and break-glass traceability"], ["Cloud control plane", "Activity, drift and residency-change signals"], ["Edge & API", "WAF, rate limits, TLS and anomalies"], ["Evidence storage", "Retention changes and bypass attempts"], ["Cryptography & keys", "Vault/KMS events and recovery actions"], ["Application & tenancy", "Authorization, RLS and integrity failures"], ["Supply chain & release", "SBOM, secrets and artifact provenance"], ["Backup & recovery", "Job integrity and restore evidence"]].map(item => `<div class="control-item"><div class="control-icon">${icon("activity")}</div><div><strong>${item[0]}</strong><small>${item[1]}</small></div>${badge("Monitored", "green")}</div>`).join("")}</div></div></article><article class="card"><header class="card-header"><div><h3>${isArabic() ? "أحداث أمنية توضيحية" : "Illustrative security events"}</h3></div></header><div class="card-body"><div class="activity-list">${D.technical.securityEvents.map(item => `<div class="activity-row"><span class="activity-time">${item[0]}</span><div class="activity-line"><i></i></div><div class="activity-copy"><strong>${item[1]}</strong><small>Security operations</small></div><span class="activity-subject">${item[2]}</span></div>`).join("")}</div></div></article></section>`, "operations");
  }

  function tenantsPage() {
    return shell(`${pageHeader("TENANT GOVERNANCE", t("tenants"), isArabic() ? "إدارة المستخدمين والصلاحيات والسياسات والسعة والموصلات ضمن مؤسسة معزولة." : "Manage users, roles, policies, capacity and connectors within an isolated organization.", button(isArabic() ? "إضافة مستخدم تجريبي" : "Add demo user", "new-user", "primary", "users"))}
      <section class="kpi-grid">${[["building", D.tenant.name, "Tenant", "Sovereign Enterprise"], ["users", D.tenant.users, "Authorized users", "MFA enforced"], ["hard-drive", `${D.tenant.storageUsed} TB`, "Storage used", `${D.tenant.storageAllowance} TB allowance`], ["activity", "6", "Active connectors", "All healthy"], ["scale", D.tenant.legalHolds, "Legal Holds", "Enforced"], ["package", D.tenant.pendingExports, "Export requests", "Controlled"]].map(kpi => `<article class="kpi"><div class="kpi-top"><div class="kpi-icon">${icon(kpi[0])}</div><span class="kpi-delta">${kpi[3]}</span></div><strong>${esc(kpi[1])}</strong><span>${esc(kpi[2])}</span></article>`).join("")}</section>
      <section class="grid two"><article class="card"><header class="card-header"><div><h3>${isArabic() ? "المستخدمون والصلاحيات" : "Users & access"}</h3><p>${isArabic() ? "أدوار افتراضية لعرض التحكم في الوصول" : "Fictional roles demonstrating governed access"}</p></div></header><div class="card-body flush"><div class="table-wrap"><table class="data-table"><thead><tr><th>User</th><th>Role</th><th>MFA</th><th>Access</th><th>Last login</th></tr></thead><tbody>${D.users.map(user => `<tr><td><strong>${esc(user.name)}</strong></td><td>${esc(user.role)}</td><td>${badge(user.mfa, "green")}</td><td>${esc(user.access)}</td><td>${esc(user.last)}</td></tr>`).join("")}</tbody></table></div></div></article><article class="card"><header class="card-header"><div><h3>${isArabic() ? "سياسات المؤسسة" : "Tenant policies"}</h3><p>${isArabic() ? "إعدادات افتراضية للعرض" : "Illustrative policy settings"}</p></div></header><div class="card-body"><div class="control-grid single-column">${[["Default retention", "7 years", "clock"], ["Legal Hold approvals", "Dual control", "scale"], ["Export approval", "Two-person rule", "shield-check"], ["MFA policy", "Required for all users", "users"], ["Support access", "Time-bound and approved", "lock"], ["Audit retention", "10 years", "document"]].map(control => `<div class="control-item"><div class="control-icon">${icon(control[2])}</div><div><strong>${control[0]}</strong><small>${control[1]}</small></div>${badge("Enforced", "green")}</div>`).join("")}</div></div></article></section>`, "tenants");
  }

  function securityPage() {
    return shell(`${pageHeader("ZERO-TRUST CONTROL PLANE", t("security"), isArabic() ? "ضوابط سلامة الأدلة وإدارة المفاتيح والوصول والتدقيق." : "Integrity, key custody, access-control and audit safeguards represented in the product experience.", button(isArabic() ? "تشغيل فحص تجريبي" : "Run demo control test", "security-test", "primary", "shield-check"))}
      <section class="grid three">${D.controls.map(control => `<article class="card"><div class="card-body"><div class="control-item borderless"><div class="control-icon">${icon(control.icon)}</div><div><strong>${esc(control.name)}</strong><small>${esc(control.detail)}</small></div>${badge(control.status, "green")}</div></div></article>`).join("")}</section>
      <section class="grid two"><article class="card"><header class="card-header"><div><h3>${isArabic() ? "نموذج التشفير وحيازة المفاتيح" : "Encryption & key-custody model"}</h3><p>${isArabic() ? "تمثيل مفاهيمي دون كشف أسرار أو مفاتيح" : "Conceptual representation without exposing secret material"}</p></div></header><div class="card-body"><div class="timeline">${[["Per-evidence DEK", "A new data-encryption key is associated with each evidence object."], ["Authenticated chunks", "Evidence is represented as independently authenticated ordered chunks."], ["Key wrapping", "Data keys are protected under tenant-scoped custody controls."], ["Root layer", "Cloud KMS represents the approved root protection layer."], ["Access boundary", "Applications receive only scoped cryptographic operations."], ["Auditability", "Key and verification operations create retained audit events."]].map((item, index) => `<div class="timeline-item"><i class="timeline-dot"></i><strong>${item[0]}</strong><p>${item[1]}</p><time>Control ${index + 1}</time><span class="timeline-signature">${badge("Configured", "blue")}</span></div>`).join("")}</div></div></article>
      <article class="card"><header class="card-header"><div><h3>${isArabic() ? "اختبارات منع العبث" : "Tamper-resistance scenarios"}</h3><p>${isArabic() ? "اختبارات سلبية يجب أن تؤدي إلى فشل واضح" : "Negative scenarios expected to fail explicitly"}</p></div></header><div class="card-body"><div class="control-grid single-column">${[["Delete protected object", "Blocked by immutable-retention policy", "trash"], ["Modify protected object", "Rejected; original protected object remains unchanged", "edit"], ["Remove encrypted chunk", "Verification fails explicitly", "warning"], ["Reorder chunks", "Authenticated sequence validation fails", "warning"], ["Cross-evidence substitution", "Tenant/evidence AAD validation fails", "shield-check"]].map(control => `<div class="control-item"><div class="control-icon">${icon(control[2])}</div><div><strong>${control[0]}</strong><small>${control[1]}</small></div>${badge("Blocked", "red")}</div>`).join("")}</div></div></article></section>`, "security");
  }

  function technicalPage() {
    return shell(`${pageHeader("TECHNICAL ASSURANCE", t("technical"), isArabic() ? "عرض موحد لأهم الضوابط التقنية مع فصل واضح بين المحاكاة والقدرات المستقبلية والقبول الإنتاجي." : "A unified view of the core technical controls represented in this demo, separated from future capability and production acceptance.", button(isArabic() ? "تشغيل الاختبارات السلبية" : "Run negative tests", "all-tests", "primary", "play"))}
      <section class="tech-hero"><div><div class="page-kicker light-kicker">RM TRACEVAULT · ENTERPRISE DEMO v${APP_VERSION}</div><h2>${isArabic() ? "منصة حيازة أدلة وليست بوابة تخزين ملفات" : "An evidence-custody platform, not a file-storage portal"}</h2><p>${isArabic() ? "توضح المنصة من قام بالفعل ومتى وعلى أي دليل وهل بقيت السلامة وعدم القابلية للتعديل وعهدة الحيازة قابلة للتحقق." : "The platform shows who acted, when, on which evidence, and whether integrity, immutability and custody remain verifiable."}</p><div class="status-strip"><div class="status-cell"><span>Evidence profile</span><strong>SHA-512 · AES-256-GCM</strong></div><div class="status-cell"><span>Immutable control</span><strong>Compliance Mode</strong></div><div class="status-cell"><span>Tenant model</span><strong>Crypto + DB + authorization</strong></div><div class="status-cell"><span>AI boundary</span><strong>Derived analysis only</strong></div></div></div><div class="logo-panel"><img src="assets/rm-logo.svg" alt="RM"></div></section>
      <section class="domain-grid">${D.technical.domains.map(domain => `<article class="domain-card"><div class="domain-head"><div class="domain-icon">${icon(domain[0])}</div>${badge(domain[4], domain[4] === "Phase 2" ? "purple" : domain[4] === "Acceptance-gated" ? "amber" : "green")}</div><h3>${esc(domain[1])}</h3><p>${esc(domain[2])}</p><div class="mini-list">${domain[3].map(item => `<div class="mini-row">${esc(item)}</div>`).join("")}</div></article>`).join("")}</section>
      <article class="card section-gap"><header class="card-header"><div><h3>${isArabic() ? "اختبارات سلبية تفاعلية" : "Interactive negative tests"}</h3><p>${isArabic() ? "الفشل الصريح هو السلوك الصحيح عند محاولة كسر الثقة." : "Explicit failure is the correct behavior when trust controls are challenged."}</p></div></header><div class="card-body"><div class="test-grid">${D.technical.tests.map(test => `<article class="test-card"><h4>${esc(test[1])}</h4><p>${esc(test[2])}</p>${button(t("run"), `test:${test[0]}`, "", "warning")}</article>`).join("")}</div></div></article>`, "technical");
  }

  function apiPage() {
    return shell(`${pageHeader("APPLICATION INTERFACES", t("api"), isArabic() ? "تجربة تفاعلية لعقود الرفع والاسترجاع والتحقق والحيازة والمؤسسات والخصوصية." : "Interactive upload, retrieval, verification, custody, tenant and privacy contracts.", button(isArabic() ? "تشغيل تدفق كامل" : "Run end-to-end flow", "api-flow", "primary", "play"))}
      <section class="grid two"><article class="card"><header class="card-header"><div><h3>Core product endpoints</h3><p>Tenant-bound · versioned · audited</p></div>${badge("OpenAPI 3.1 target", "blue")}</header><div class="card-body"><div class="endpoint-list">${D.technical.endpoints.map((endpoint, index) => `<div class="endpoint"><span class="method ${endpoint[0].toLowerCase()}">${endpoint[0]}</span><div><code>${esc(endpoint[1])}</code><small>${esc(endpoint[2])}</small></div>${button(t("run"), `api:${index}`, "", "play")}</div>`).join("")}</div></div></article>
      <aside class="grid aside-stack"><article class="card"><header class="card-header"><div><h3>Integration patterns</h3><p>Governed acquisition and retrieval channels</p></div></header><div class="card-body"><div class="control-grid single-column">${[["Bulk / Manifest Upload", "Reconciliation and duplicate prevention"], ["S3-Compatible Ingestion", "Automatic encryption, hash and timestamp on accepted PUT"], ["Machine-to-Machine Auth", "Scoped service identity and tenant context"], ["Enterprise OIDC / SSO", "Tenant-aware login and MFA policy"], ["Encrypted Video Streaming", "Authorized HLS/DASH-style retrieval"], ["Signed Webhooks", "Auditable event delivery"]].map(item => `<div class="control-item"><div class="control-icon">${icon("code")}</div><div><strong>${item[0]}</strong><small>${item[1]}</small></div>${badge("Represented", "green")}</div>`).join("")}</div></div></article><article class="card"><header class="card-header"><div><h3>API trust controls</h3></div></header><div class="card-body"><div class="mini-list">${["Tenant context required on every request", "Evidence IDs never authorize access by themselves", "TTL URLs are read-only and audited", "DeleteObject unsupported for protected WORM objects", "Errors do not leak cross-tenant evidence existence"].map(item => `<div class="mini-row">${item}</div>`).join("")}</div></div></article></aside></section>`, "api");
  }

  function architecturePage() {
    return shell(`${pageHeader("SOVEREIGN TARGET DESIGN", t("architecture"), isArabic() ? "طبقات مفاهيمية للهوية والإدخال والتطبيق والتشفير والتخزين والبحث والتشغيل." : "Conceptual layers for identity, ingestion, application, cryptography, storage, search and operations.")}
      <section class="arch-diagram"><div class="arch-row">${[["Evidence Sources", "CCTV · Email · Files · Logs"], ["Secure Edge", "WAF · API gateway · private access"], ["Identity & Tenant", "SSO · MFA · RBAC · tenant context"], ["Application Services", "Cases · custody · retention · export"]].map(item => `<div class="arch-node"><strong>${item[0]}</strong><small>${item[1]}</small></div>`).join("")}</div><div class="arch-arrow">↓</div><div class="arch-row">${[["Cryptographic Services", "Encryption profile · KMS root · custody controls"], ["Evidence Vault", "Immutable WORM objects · versioning"], ["Metadata & Search", "Authorized index · metadata · case links"], ["Operations & Assurance", "Monitoring · backup · recovery · security"]].map(item => `<div class="arch-node"><strong>${item[0]}</strong><small>${item[1]}</small></div>`).join("")}</div></section>
      <section class="grid three"><article class="card"><div class="card-body"><div class="control-item borderless"><div class="control-icon">${icon("globe")}</div><div><strong>Saudi data-residency target</strong><small>Target sovereign deployment within Saudi Arabia.</small></div></div></div></article><article class="card"><div class="card-body"><div class="control-item borderless"><div class="control-icon">${icon("building")}</div><div><strong>Multi-tenant control model</strong><small>Tenant context applied across authorization, metadata and custody.</small></div></div></div></article><article class="card"><div class="card-body"><div class="control-item borderless"><div class="control-icon">${icon("shield-check")}</div><div><strong>Acceptance-gated controls</strong><small>Production claims remain subject to implementation and independent acceptance.</small></div></div></div></article></section>`, "architecture");
  }

  function editionsPage() {
    return shell(`${pageHeader("SERVICE CATALOGUE", t("editions"), isArabic() ? "إصدارات خدمة توضح نطاق المزايا دون عرض أسعار أو شروط تجارية حساسة." : "Service editions illustrating capability scope without exposing confidential pricing or commercial terms.", button(isArabic() ? "طلب عرض تجريبي" : "Request a private demonstration", "contact", "primary", "play"))}
      <section class="edition-grid">${D.editions.map(edition => `<article class="edition"><span class="edition-label">${esc(edition.label)}</span><h3>${esc(edition.name)}</h3><p>${esc(edition.description)}</p><div class="feature-list">${edition.features.map(feature => `<div class="feature">${icon("check")}<span>${esc(feature)}</span></div>`).join("")}</div></article>`).join("")}</section>`, "editions");
  }

  const renderers = {
    overview: overviewPage,
    vault: vaultPage,
    evidence: evidencePage,
    ingestion: ingestionPage,
    cases: casesPage,
    search: searchPage,
    ai: aiPage,
    exports: exportsPage,
    audit: auditPage,
    operations: operationsPage,
    tenants: tenantsPage,
    security: securityPage,
    technical: technicalPage,
    api: apiPage,
    architecture: architecturePage,
    editions: editionsPage
  };

  function render() {
    const { page } = currentRoute();
    document.documentElement.lang = state.lang;
    document.documentElement.dir = isArabic() ? "rtl" : "ltr";
    document.documentElement.dataset.theme = state.theme;
    app.innerHTML = (renderers[page] || overviewPage)();
  }

  function showToast(title, message, iconName = "info") {
    const node = document.createElement("div");
    node.className = "toast";
    node.innerHTML = `${icon(iconName)}<div><strong>${esc(title)}</strong><small>${esc(message)}</small></div>`;
    toastRoot.appendChild(node);
    window.setTimeout(() => node.remove(), 4200);
  }

  function showModal(title, subtitle, body, footer = button(t("close"), "close-modal")) {
    modalRoot.innerHTML = `<div class="modal-backdrop"><section class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><header class="modal-head"><div><h3 id="modal-title">${esc(title)}</h3><p>${esc(subtitle)}</p></div><button type="button" class="modal-close" data-action="close-modal" aria-label="${esc(t("close"))}">${icon("x")}</button></header><div class="modal-body">${body}</div><footer class="modal-footer">${footer}</footer></section></div>`;
    modalRoot.querySelector("button")?.focus();
  }

  function closeModal() {
    modalRoot.innerHTML = "";
  }

  function logAudit(action, evidenceId, status, actor = "Demo Administrator") {
    state.auditEvents.unshift({ time: nowAst(), action, actor, evidenceId, status });
  }

  function blockedAttempt(type) {
    const evidence = selectedEvidence();
    const isDelete = type === "delete";
    const timestamp = nowAst();
    const code = isDelete ? "TV-WORM-403" : "TV-INTEGRITY-409";
    const http = isDelete ? "HTTP 403 — Forbidden" : "HTTP 409 — Conflict";
    const title = isDelete ? (isArabic() ? "تم منع حذف الدليل" : "Protected deletion blocked") : (isArabic() ? "تم رفض تعديل الدليل" : "Protected modification rejected");
    const action = isDelete ? "Blocked deletion attempt" : "Blocked modification attempt";
    const detail = isDelete ? "The object is protected by Compliance Mode retention. It cannot be deleted before the retention boundary." : "The protected evidence object is immutable. The requested change was rejected and the original object remains unchanged.";
    state.attemptEvents[evidence.id] ||= [];
    state.attemptEvents[evidence.id].push({ seq: 100 + state.attemptEvents[evidence.id].length, time: timestamp, action, actor: "Demo Administrator", detail, status: "Blocked" });
    logAudit(action, evidence.id, "Blocked");
    showModal(title, `${evidence.id} · ${evidence.title}`, `<div class="result-hero error-result"><div class="result-icon">${icon(isDelete ? "trash" : "edit")}</div><div><h4>${http}</h4><p>${esc(detail)}</p></div></div><div class="result-grid"><div class="result-field"><span>Control code</span><strong>${code}</strong></div><div class="result-field"><span>Policy</span><strong>${esc(evidence.worm)}</strong></div><div class="result-field"><span>Evidence state</span><strong>UNCHANGED / PROTECTED</strong></div><div class="result-field"><span>Audit result</span><strong>ATTEMPT LOGGED</strong></div><div class="result-field"><span>Actor</span><strong>Demo Administrator</strong></div><div class="result-field"><span>Timestamp</span><strong>${esc(timestamp)}</strong></div></div>`, button(isArabic() ? "العودة إلى الدليل" : "Return to evidence", "close-modal", "primary", "shield-check"));
    showToast(isArabic() ? "تم منع المحاولة وتسجيلها" : "Attempt blocked and logged", `${code} · Evidence remained unchanged.`, "shield-check");
  }

  function verifyEvidence() {
    const evidence = selectedEvidence();
    const validHash = /^[a-f0-9]{128}$/i.test(evidence.hash);
    const result = validHash ? "VERIFIED" : "FAILED";
    logAudit("Integrity verification executed", evidence.id, validHash ? "Verified" : "Failed", "Verification Service");
    showModal(isArabic() ? "نجح التحقق من السلامة" : "Integrity verification passed", `${evidence.id} · ${evidence.title}`, `<div class="result-hero success-result"><div class="result-icon">${icon("shield-check")}</div><div><h4>SHA-512 ${validHash ? "MATCHED" : "INVALID"}</h4><p>${isArabic() ? "تمت مطابقة تدفق البايتات الكامل للدليل مع البصمة المسجلة، وتحققت المنصة من طول البصمة وصيغتها." : "The complete evidence byte stream matched the registered fingerprint, and the platform validated the fingerprint length and hexadecimal format."}</p></div></div><div class="result-grid"><div class="result-field"><span>Integrity</span><strong>${result}</strong></div><div class="result-field"><span>SHA-512 length</span><strong>${evidence.hash.length} characters</strong></div><div class="result-field"><span>Immutable status</span><strong>PROTECTED</strong></div><div class="result-field"><span>Custody signatures</span><strong>VALID</strong></div><div class="result-field"><span>Timestamp</span><strong>${esc(evidence.timestamp)}</strong></div><div class="result-field"><span>Verification time</span><strong>${esc(nowAst())}</strong></div></div>`, `${button(t("certificate"), "print-certificate", "primary", "download")}${button(t("close"), "close-modal")}`);
  }

  function runNegativeTest(testId) {
    const test = D.technical.tests.find(item => item[0] === testId);
    if (!test) return;
    logAudit(test[1], selectedEvidence().id, "Blocked", "Technical Test Runner");
    showModal(test[1], test[2], `<div class="result-hero error-result"><div class="result-icon">${icon("warning")}</div><div><h4>${esc(test[4])}</h4><p>${esc(test[5])}</p></div></div><div class="result-grid"><div class="result-field"><span>Control code</span><strong>${esc(test[3])}</strong></div><div class="result-field"><span>Evidence state</span><strong>UNCHANGED</strong></div><div class="result-field"><span>Expected result</span><strong>EXPLICIT FAILURE</strong></div><div class="result-field"><span>Audit</span><strong>EVENT RECORDED</strong></div></div>`, button(t("close"), "close-modal", "primary"));
  }

  function runAllTests() {
    showModal(isArabic() ? "تشغيل الاختبارات السلبية" : "Negative control tests", isArabic() ? "كل اختبار يجب أن يفشل بشكل صريح دون تغيير الدليل." : "Each test must fail explicitly without changing evidence.", `<div class="progress-modal">${D.technical.tests.map((test, index) => `<div class="progress-row" data-progress="${index}"><div class="progress-icon">${icon("warning")}</div><div><strong>${esc(test[1])}</strong><small>${esc(test[3])}</small></div>${badge(index === 0 ? "Running" : "Queued", index === 0 ? "blue" : "gray")}</div>`).join("")}</div>`, button(t("close"), "close-modal"));
    let index = 0;
    const timer = window.setInterval(() => {
      const rows = [...modalRoot.querySelectorAll("[data-progress]")];
      if (!rows.length) return window.clearInterval(timer);
      if (index > 0) rows[index - 1].querySelector(".badge").outerHTML = badge("Blocked as expected", "green");
      if (index < rows.length) rows[index].querySelector(".badge").outerHTML = badge("Running", "blue");
      index += 1;
      if (index > rows.length) {
        window.clearInterval(timer);
        rows.at(-1).querySelector(".badge").outerHTML = badge("Blocked as expected", "green");
        D.technical.tests.forEach(test => logAudit(test[1], selectedEvidence().id, "Blocked", "Technical Test Runner"));
        showToast(isArabic() ? "اكتملت الاختبارات" : "Negative tests completed", "6/6 explicit failures; evidence unchanged.", "shield-check");
      }
    }, 500);
  }

  function simulateIngestion() {
    const steps = [
      ["Source authorization", "Tenant, actor and source scope validated."],
      ["Metadata capture", "Source, case, timestamps and content type registered."],
      ["Chunk encryption", "Authenticated chunks created under a per-evidence data key."],
      ["Immutable commit", "Evidence object committed under Compliance Mode policy."],
      ["Integrity verification", "SHA-512 recomputed and custody event registered."]
    ];
    showModal(isArabic() ? "محاكاة إدخال آمن" : "Secure ingestion simulation", isArabic() ? "تتم معالجة دليل افتراضي عبر تدفق الضوابط المستهدف." : "A fictional evidence object is processed through the target control flow.", `<div class="progress-modal">${steps.map((step, index) => `<div class="progress-row" data-progress="${index}"><div class="progress-icon">${icon(index === 0 ? "shield-check" : index === 1 ? "document" : index === 2 ? "key" : index === 3 ? "lock" : "fingerprint")}</div><div><strong>${step[0]}</strong><small>${step[1]}</small></div>${badge(index === 0 ? "Processing" : "Queued", index === 0 ? "blue" : "gray")}</div>`).join("")}</div>`, button(t("close"), "close-modal"));
    let index = 0;
    const timer = window.setInterval(() => {
      const rows = [...modalRoot.querySelectorAll("[data-progress]")];
      if (!rows.length) return window.clearInterval(timer);
      if (index > 0) rows[index - 1].querySelector(".badge").outerHTML = badge("Complete", "green");
      if (index < rows.length) rows[index].querySelector(".badge").outerHTML = badge("Processing", "blue");
      index += 1;
      if (index > rows.length) {
        window.clearInterval(timer);
        rows.at(-1).querySelector(".badge").outerHTML = badge("Verified", "green");
        logAudit("Secure ingestion simulation completed", "EV-DEMO-NEW", "Verified", "Secure Ingestion Service");
        showToast(isArabic() ? "اكتملت محاكاة الإدخال" : "Ingestion simulation complete", "Evidence committed, verified and registered in custody history.", "shield-check");
      }
    }, 650);
  }

  function runApi(index) {
    const endpoint = D.technical.endpoints[index];
    if (!endpoint) return;
    showModal(`${endpoint[0]} ${endpoint[1]}`, endpoint[2], `<div class="api-response"><span>DEMO RESPONSE</span><pre>${esc(JSON.stringify(endpoint[3], null, 2))}</pre></div>`, button(t("close"), "close-modal", "primary"));
    logAudit(`API simulation: ${endpoint[0]} ${endpoint[1]}`, selectedEvidence().id, "Verified", "API Demo Client");
  }

  function runApiFlow() {
    const flow = [0, 1, 5, 6, 4];
    showModal(isArabic() ? "تدفق API متكامل" : "End-to-end API flow", isArabic() ? "بدء رفع ثم إنهاء وتحقق وعهدة حيازة وحزمة دليل." : "Upload initiation, finalize, verification, custody and evidence package.", `<div class="progress-modal">${flow.map((endpointIndex, index) => { const endpoint = D.technical.endpoints[endpointIndex]; return `<div class="progress-row" data-progress="${index}"><div class="progress-icon">${icon("code")}</div><div><strong>${endpoint[0]} ${endpoint[1]}</strong><small>${endpoint[2]}</small></div>${badge(index === 0 ? "Running" : "Queued", index === 0 ? "blue" : "gray")}</div>`; }).join("")}</div>`, button(t("close"), "close-modal"));
    let index = 0;
    const timer = window.setInterval(() => {
      const rows = [...modalRoot.querySelectorAll("[data-progress]")];
      if (!rows.length) return window.clearInterval(timer);
      if (index > 0) rows[index - 1].querySelector(".badge").outerHTML = badge("200 OK", "green");
      if (index < rows.length) rows[index].querySelector(".badge").outerHTML = badge("Running", "blue");
      index += 1;
      if (index > rows.length) {
        window.clearInterval(timer);
        rows.at(-1).querySelector(".badge").outerHTML = badge("201 Created", "green");
        showToast(isArabic() ? "اكتمل التدفق" : "API flow completed", "Tenant-bound evidence package is verification ready.", "code");
      }
    }, 600);
  }

  function buildCertificateHtml(evidence) {
    const lang = state.lang;
    const rtl = lang === "ar";
    const custody = allCustody(evidence);
    const logoUrl = new URL("assets/rm-logo.svg", window.location.href).href;
    const labels = rtl ? {
      title: "شهادة سلامة الدليل وعهدة الحيازة",
      subtitle: "شهادة صادرة من بيئة ديمو عامة ببيانات افتراضية",
      certificate: "رقم الشهادة",
      result: "النتيجة",
      verified: "تم التحقق من السلامة",
      evidenceId: "معرف الدليل",
      evidenceTitle: "اسم الدليل",
      caseName: "القضية",
      source: "المصدر",
      collected: "وقت الجمع",
      verifiedAt: "وقت التحقق",
      size: "الحجم",
      encryption: "التشفير",
      worm: "حالة WORM",
      retention: "نهاية الاحتفاظ",
      hold: "الحجز القانوني",
      timestamp: "الختم الزمني",
      fingerprint: "بصمة SHA-512",
      custody: "ملخص عهدة الحيازة",
      applied: "مطبق",
      notApplied: "غير مطبق",
      footer: "ذاكرة قانونية مختومة إلى الأبد",
      disclaimer: "هذه الشهادة ناتجة من ديمو مفاهيمي عام ولا تمثل إفادة إنتاجية أو شهادة امتثال أو رأياً قانونياً."
    } : {
      title: "Evidence Integrity & Chain-of-Custody Certificate",
      subtitle: "Certificate generated by a public concept demo using fictional records",
      certificate: "Certificate ID",
      result: "Result",
      verified: "Integrity Verified",
      evidenceId: "Evidence ID",
      evidenceTitle: "Evidence title",
      caseName: "Case",
      source: "Source",
      collected: "Collected",
      verifiedAt: "Verified",
      size: "File size",
      encryption: "Encryption",
      worm: "WORM status",
      retention: "Retention end",
      hold: "Legal Hold",
      timestamp: "Timestamp",
      fingerprint: "SHA-512 Fingerprint",
      custody: "Chain-of-Custody Summary",
      applied: "Applied",
      notApplied: "Not applied",
      footer: "Legal Memory. Sealed Forever.",
      disclaimer: "This certificate is generated by a public concept demo and is not a production attestation, compliance certification or legal opinion."
    };
    const rows = [
      [labels.evidenceId, evidence.id],
      [labels.evidenceTitle, evidence.title],
      [labels.caseName, `${evidence.caseId} — ${evidence.caseName}`],
      [labels.source, `${evidence.source} / ${evidence.sourceDetail}`],
      [labels.collected, evidence.collected],
      [labels.verifiedAt, evidence.verified],
      [labels.size, evidence.size],
      [labels.encryption, evidence.encryption],
      [labels.worm, evidence.worm],
      [labels.retention, evidence.retention],
      [labels.hold, evidence.legalHold ? labels.applied : labels.notApplied],
      [labels.timestamp, evidence.timestamp]
    ];
    return `<!doctype html><html lang="${lang}" dir="${rtl ? "rtl" : "ltr"}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(labels.title)} · v${APP_VERSION}</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&display=swap"><style>
      :root{--ink:#07152d;--blue:#1e78ff;--line:#d9e4f0;--muted:#617086;--green:#087a55;--r-sm:10px;--r-md:14px;--r-lg:20px;--font:Inter,"IBM Plex Sans Arabic",system-ui,sans-serif;--font-ar:"IBM Plex Sans Arabic",system-ui,sans-serif}
      *{box-sizing:border-box}body{margin:0;background:#eef3f8;color:var(--ink);font-family:var(--font);font-size:14px;line-height:1.55;font-weight:400}html[dir="rtl"] body{font-family:var(--font-ar);font-size:14.5px}.sheet{width:210mm;min-height:297mm;margin:18px auto;background:#fff;padding:16mm;box-shadow:0 16px 50px rgba(7,21,45,.16)}.header{display:flex;align-items:center;justify-content:space-between;gap:18px;border-bottom:4px solid var(--blue);padding-bottom:14px}.brand{display:flex;align-items:center;gap:12px}.brand img{width:62px;height:62px;background:var(--ink);border-radius:var(--r-md);padding:8px}.brand strong{display:block;font-size:19px;font-weight:700}.brand span{display:block;color:var(--blue);font-size:11px;font-weight:600;letter-spacing:.08em}.version{border:1px solid var(--line);border-radius:var(--r-sm);padding:8px 11px;font-size:12px;font-weight:600}.title{margin:28px 0 18px}.title h1{font-size:25px;line-height:1.25;margin:0;font-weight:700}.title p{margin:7px 0 0;color:var(--muted);font-weight:400}.result{display:grid;grid-template-columns:1fr 1fr;gap:12px;background:#eef8f4;border:1px solid #bce4d5;border-radius:var(--r-md);padding:15px;margin-bottom:18px}.result span,.field span{display:block;color:var(--muted);font-size:11px;font-weight:500;text-transform:uppercase;letter-spacing:.05em}.result strong{display:block;margin-top:4px;font-size:15px;font-weight:700;color:var(--green)}.fields{display:grid;grid-template-columns:1fr 1fr;gap:10px}.field{border:1px solid var(--line);border-radius:var(--r-sm);padding:10px;break-inside:avoid}.field strong{display:block;margin-top:4px;font-weight:500;overflow-wrap:anywhere}.section{margin-top:22px;break-inside:avoid}.section h2{font-size:16px;font-weight:600;margin:0 0 9px}.hash{border-radius:var(--r-sm);background:var(--ink);color:#e6f3ff;padding:13px;font-family:ui-monospace,SFMono-Regular,Consolas,monospace;font-size:11px;line-height:1.7;overflow-wrap:anywhere}.custody{width:100%;border-collapse:collapse}.custody th,.custody td{border:1px solid var(--line);padding:8px;text-align:start;vertical-align:top;font-size:11px;font-weight:400}.custody th{background:#f3f6fa;font-weight:600}.custody tr{break-inside:avoid}.footer{margin-top:24px;padding-top:12px;border-top:1px solid var(--line);display:flex;justify-content:space-between;gap:20px;color:var(--muted);font-size:11px}.footer strong{color:var(--ink);font-weight:600}
      @page{size:A4;margin:10mm}@media print{*{-webkit-print-color-adjust:exact;print-color-adjust:exact}body{background:#fff}.sheet{width:auto;min-height:auto;margin:0;padding:8mm;box-shadow:none}.fields,.result,.section,.custody tr,.field{break-inside:avoid}.no-print{display:none}}
      </style></head><body><main class="sheet"><header class="header"><div class="brand"><img src="${esc(logoUrl)}" alt="RM"><div><strong>RM TRACEVAULT</strong><span>SECURE · TRACE · PROTECT</span></div></div><div class="version">Enterprise Demo v${APP_VERSION}</div></header><section class="title"><h1>${esc(labels.title)}</h1><p>${esc(labels.subtitle)}</p></section><section class="result"><div><span>${esc(labels.certificate)}</span><strong>CERT-${esc(evidence.id)}</strong></div><div><span>${esc(labels.result)}</span><strong>${esc(labels.verified)}</strong></div></section><section class="fields">${rows.map(([label, value]) => `<div class="field"><span>${esc(label)}</span><strong>${esc(value)}</strong></div>`).join("")}</section><section class="section"><h2>${esc(labels.fingerprint)}</h2><div class="hash">${esc(evidence.hash)}</div></section><section class="section"><h2>${esc(labels.custody)}</h2><table class="custody"><thead><tr><th>#</th><th>${rtl ? "الوقت" : "Time"}</th><th>${rtl ? "الإجراء" : "Action"}</th><th>${rtl ? "الفاعل" : "Actor"}</th><th>${rtl ? "التفاصيل" : "Detail"}</th></tr></thead><tbody>${custody.map((event, index) => `<tr><td>${index + 1}</td><td>${esc(event.time)}</td><td>${esc(event.action)}</td><td>${esc(event.actor)}</td><td>${esc(event.detail)}</td></tr>`).join("")}</tbody></table></section><footer class="footer"><div><strong>${esc(labels.footer)}</strong><br>${esc(labels.disclaimer)}</div><div>RM TraceVault · v${APP_VERSION}</div></footer></main><script>window.addEventListener("load",()=>window.setTimeout(()=>window.print(),350));<\/script></body></html>`;
  }

  function printCertificate() {
    const evidence = selectedEvidence();
    const printWindow = window.open("", "_blank", "noopener,noreferrer");
    if (!printWindow) {
      showToast(isArabic() ? "تعذر فتح نافذة الطباعة" : "Print window blocked", isArabic() ? "اسمح بالنوافذ المنبثقة لهذا الموقع ثم أعد المحاولة." : "Allow pop-ups for this site and try again.", "warning");
      return;
    }
    printWindow.document.open();
    printWindow.document.write(buildCertificateHtml(evidence));
    printWindow.document.close();
    logAudit("Integrity certificate opened for print", evidence.id, "Verified", "Demo Administrator");
    showToast(isArabic() ? "تم تجهيز الشهادة" : "Certificate prepared", `${evidence.id} · v${APP_VERSION}`, "download");
  }

  function guidedTour() {
    const steps = [
      ["1. Executive Overview", "Explain the sovereign evidence-custody value proposition."],
      ["2. Evidence Vault", "Open a protected evidence record."],
      ["3. Integrity Verification", "Run SHA-512, immutable-state and custody verification."],
      ["4. Tamper Test", "Attempt deletion and modification to show explicit blocking."],
      ["5. Integrity Certificate", "Print or save the bilingual certificate containing custody history."],
      ["6. Ingestion", "Show validation, encryption, immutable commit and verification."],
      ["7. Export & Verification", "Show the portable evidence package."]
    ];
    showModal(isArabic() ? "جولة RM TraceVault" : "RM TraceVault guided demonstration", isArabic() ? "تسلسل مقترح للعرض أمام الشركات والمستثمرين." : "Recommended presentation flow for companies and investors.", `<div class="progress-modal">${steps.map((step, index) => `<div class="progress-row"><div class="progress-icon">${icon(index === 2 ? "fingerprint" : index === 3 ? "warning" : index === 4 ? "download" : "play")}</div><div><strong>${step[0]}</strong><small>${step[1]}</small></div>${badge(index === 0 ? "Start" : "Next", "blue")}</div>`).join("")}</div>`, `${button(t("explore"), "go-vault", "primary", "database")}${button(t("close"), "close-modal")}`);
  }

  function exportAuditCsv() {
    const rows = [["time", "action", "actor", "evidence_id", "status"], ...state.auditEvents.map(event => [event.time, event.action, event.actor, event.evidenceId, event.status])];
    const csv = rows.map(row => row.map(value => `"${String(value).replaceAll('"', '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `RM_TraceVault_Demo_Audit_v${APP_VERSION}.csv`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    showToast(isArabic() ? "تم تصدير سجل التدقيق" : "Audit CSV exported", `${state.auditEvents.length} runtime events.`, "download");
  }

  function handleAction(action) {
    if (action.startsWith("test:")) return runNegativeTest(action.split(":")[1]);
    if (action.startsWith("api:")) return runApi(Number(action.split(":")[1]));
    if (action.startsWith("review:")) {
      state.aiReviewerStatus = action.split(":")[1].toUpperCase();
      logAudit("AI review decision recorded", D.technical.aiRun.evidence_id, "Verified", "Demo Human Reviewer");
      showToast(isArabic() ? "تم تسجيل مراجعة الذكاء الاصطناعي" : "AI review recorded", `Reviewer status: ${state.aiReviewerStatus}. Original evidence unchanged.`, "sparkles");
      return render();
    }
    switch (action) {
      case "toggle-sidebar": state.sidebarOpen = !state.sidebarOpen; render(); break;
      case "toggle-lang": state.lang = isArabic() ? "en" : "ar"; localStorage.setItem("tv_lang", state.lang); render(); break;
      case "toggle-theme": state.theme = state.theme === "dark" ? "light" : "dark"; localStorage.setItem("tv_theme", state.theme); render(); break;
      case "guided-tour": guidedTour(); break;
      case "go-vault": location.hash = "#/vault"; closeModal(); break;
      case "go-exports": location.hash = "#/exports"; break;
      case "attempt-delete": blockedAttempt("delete"); break;
      case "attempt-modify": blockedAttempt("modify"); break;
      case "verify-current": verifyEvidence(); break;
      case "print-certificate": printCertificate(); break;
      case "simulate-ingestion": simulateIngestion(); break;
      case "generate-package": logAudit("Evidence package generated", selectedEvidence().id, "Verified"); showToast(isArabic() ? "تم تجهيز حزمة الدليل" : "Evidence package prepared", "Manifest, integrity report, custody history and verification guide included.", "package"); break;
      case "security-test": showToast(isArabic() ? "اكتمل فحص الضوابط" : "Control test completed", "All represented controls returned healthy status.", "shield-check"); break;
      case "all-tests": runAllTests(); break;
      case "api-flow": runApiFlow(); break;
      case "ai-run": logAudit("AI derived analysis completed", D.technical.aiRun.evidence_id, "Verified", "Derived Analysis Service"); showToast(isArabic() ? "اكتمل التحليل التجريبي" : "AI analysis completed", `Derived results linked to ${D.technical.aiRun.analysis_run_id}; original evidence unchanged.`, "sparkles"); break;
      case "incident": showModal(isArabic() ? "حادث أمني تجريبي" : "Demo security incident", "INC-DEMO-2026-0042", `<div class="result-grid"><div class="result-field"><span>Severity</span><strong>SEV-2</strong></div><div class="result-field"><span>Incident Commander</span><strong>RM Security Lead</strong></div><div class="result-field"><span>Containment</span><strong>Risky workflow paused</strong></div><div class="result-field"><span>Evidence</span><strong>Security artifacts preserved</strong></div><div class="result-field"><span>Recovery</span><strong>Verification required</strong></div><div class="result-field"><span>SLA</span><strong>NOT CLAIMED IN DEMO</strong></div></div>`, button(t("close"), "close-modal", "primary")); break;
      case "new-case": showToast(isArabic() ? "إجراء تجريبي" : "Demo action", isArabic() ? "إنشاء القضايا ممثل في الديمو ولا يتم حفظه." : "Case creation is represented but not persisted in this public demo.", "briefcase"); break;
      case "new-user": showToast(isArabic() ? "إجراء تجريبي" : "Demo action", isArabic() ? "إنشاء المستخدمين ممثل في الديمو ولا يتم حفظه." : "User creation is represented but not persisted in this public demo.", "users"); break;
      case "filters": showToast(isArabic() ? "مرشحات متقدمة" : "Advanced filters", "Source, date, Legal Hold, retention, case and verification filters are represented.", "filter"); break;
      case "contact": showToast(isArabic() ? "عرض خاص" : "Private demonstration", isArabic() ? "استخدم قناة RM TraceVault المعتمدة لطلب عرض منضبط." : "Use the approved RM TraceVault contact channel for a controlled presentation.", "play"); break;
      case "export-audit": exportAuditCsv(); break;
      case "close-modal": closeModal(); if (currentRoute().page === "evidence") render(); break;
      default: break;
    }
  }

  document.addEventListener("click", event => {
    const routeButton = event.target.closest("[data-route]");
    if (routeButton) {
      location.hash = `#/${routeButton.dataset.route}`;
      state.sidebarOpen = false;
      return;
    }
    const evidenceRow = event.target.closest("[data-evidence-id]");
    if (evidenceRow) {
      state.selectedEvidenceId = evidenceRow.dataset.evidenceId;
      location.hash = `#/evidence/${evidenceRow.dataset.evidenceId}`;
      return;
    }
    const actionButton = event.target.closest("[data-action]");
    if (actionButton) handleAction(actionButton.dataset.action);
    if (event.target.classList.contains("modal-backdrop")) closeModal();
  });

  document.addEventListener("keydown", event => {
    const evidenceRow = event.target.closest("[data-evidence-id]");
    if (evidenceRow && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      state.selectedEvidenceId = evidenceRow.dataset.evidenceId;
      location.hash = `#/evidence/${evidenceRow.dataset.evidenceId}`;
    }
    if (event.key === "Escape" && modalRoot.innerHTML) closeModal();
  });

  document.addEventListener("input", event => {
    if (event.target.id === "vault-search") {
      const query = event.target.value.trim().toLowerCase();
      const records = D.evidence.filter(evidence => [evidence.id, evidence.title, evidence.source, evidence.caseId, evidence.caseName].join(" ").toLowerCase().includes(query));
      const target = document.getElementById("vault-table");
      if (target) target.innerHTML = evidenceTable(records);
    }
  });

  window.addEventListener("hashchange", render);
  window.RM_TRACEVAULT_DEMO = { APP_VERSION, buildCertificateHtml, verifyEvidence };
  render();
})();
