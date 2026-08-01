(() => {
  "use strict";

  const D = window.TRACEVAULT_DEMO;
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];

  const state = {
    route: location.hash.replace(/^#\/?/, "") || "overview",
    lang: localStorage.getItem("tv_lang") || (navigator.language?.startsWith("ar") ? "ar" : "en"),
    welcomeSeen: sessionStorage.getItem("tv_welcome") === "1",
    tourStep: 0,
    selectedEvidence: D.evidence[0],
    sidebarOpen: false
  };

  const T = {
    en: {
      navMain: "Platform",
      navGovernance: "Governance",
      overview: "Overview",
      vault: "Evidence Vault",
      ingestion: "Ingestion",
      cases: "Case Workspace",
      search: "Search & Review",
      exports: "Exports & Verification",
      tenants: "Tenant Administration",
      security: "Security & Trust",
      architecture: "Architecture",
      editions: "Service Editions",
      conceptDemo: "Public concept demo",
      simulated: "Simulated data only",
      banner: "This environment demonstrates the target product experience using fictional data. It does not store real evidence or perform production cryptography.",
      startTour: "Guided demo",
      presentation: "Presentation mode",
      tenant: "Demo Organization Alpha",
      targetRegion: "Target region: Saudi Arabia",
      viewEvidence: "View evidence",
      verify: "Verify integrity",
      upload: "Simulate ingestion",
      generateExport: "Generate export",
      contact: "Contact RM TraceVault",
      learnMore: "Explore platform",
      close: "Close",
      next: "Next",
      back: "Back",
      complete: "Complete"
    },
    ar: {
      navMain: "المنصة",
      navGovernance: "الحوكمة",
      overview: "النظرة العامة",
      vault: "خزنة الأدلة",
      ingestion: "إدخال الأدلة",
      cases: "مساحة القضايا",
      search: "البحث والمراجعة",
      exports: "التصدير والتحقق",
      tenants: "إدارة المؤسسات",
      security: "الأمن والثقة",
      architecture: "المعمارية",
      editions: "إصدارات الخدمة",
      conceptDemo: "ديمو مفاهيمي عام",
      simulated: "بيانات محاكاة فقط",
      banner: "تعرض هذه البيئة تجربة المنتج المستهدفة باستخدام بيانات افتراضية، ولا تحفظ أدلة حقيقية ولا تنفذ تشفيرًا إنتاجيًا.",
      startTour: "جولة تعريفية",
      presentation: "وضع العرض",
      tenant: "المنظمة التجريبية ألفا",
      targetRegion: "النطاق المستهدف: المملكة العربية السعودية",
      viewEvidence: "عرض الدليل",
      verify: "التحقق من السلامة",
      upload: "محاكاة الإدخال",
      generateExport: "إنشاء حزمة تصدير",
      contact: "التواصل مع RM TraceVault",
      learnMore: "استكشف المنصة",
      close: "إغلاق",
      next: "التالي",
      back: "السابق",
      complete: "إنهاء"
    }
  };

  const nav = [
    { id: "overview", icon: "layout-dashboard", group: "main" },
    { id: "vault", icon: "database", group: "main" },
    { id: "ingestion", icon: "upload-cloud", group: "main" },
    { id: "cases", icon: "briefcase", group: "main" },
    { id: "search", icon: "search", group: "main" },
    { id: "exports", icon: "package", group: "main" },
    { id: "tenants", icon: "building", group: "gov" },
    { id: "security", icon: "shield-check", group: "gov" },
    { id: "architecture", icon: "layers", group: "gov" },
    { id: "editions", icon: "sparkles", group: "gov" }
  ];

  function tr(key) { return T[state.lang][key] || T.en[key] || key; }
  function esc(value) { return String(value ?? "").replace(/[&<>'"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[c])); }

  function icon(name, cls = "") {
    const paths = {
      "layout-dashboard": '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
      database: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/>',
      "upload-cloud": '<path d="M16 16l-4-4-4 4"/><path d="M12 12v9"/><path d="M20.4 17.5A5 5 0 0018 8.2 7 7 0 005.3 10.6 4.5 4.5 0 006 19h2"/>',
      briefcase: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2M3 12h18M10 12v2h4v-2"/>',
      search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
      package: '<path d="M21 8l-9-5-9 5 9 5 9-5z"/><path d="M3 8v8l9 5 9-5V8M12 13v8"/>',
      building: '<path d="M4 21V4h11v17M15 9h5v12M8 8h3M8 12h3M8 16h3M18 13h1M18 17h1M2 21h20"/>',
      "shield-check": '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-5"/>',
      layers: '<path d="M12 2l9 5-9 5-9-5 9-5z"/><path d="M3 12l9 5 9-5M3 17l9 5 9-5"/>',
      sparkles: '<path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3zM5 16l.9 2.1L8 19l-2.1.9L5 22l-.9-2.1L2 19l2.1-.9L5 16zM19 14l.8 1.7 1.7.8-1.7.8L19 19l-.8-1.7-1.7-.8 1.7-.8L19 14z"/>',
      bell: '<path d="M18 8a6 6 0 00-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',
      globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 010 18M12 3a15 15 0 000 18"/>',
      play: '<circle cx="12" cy="12" r="9"/><path d="M10 8l6 4-6 4V8z"/>',
      menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
      chevron: '<path d="M9 18l6-6-6-6"/>',
      info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
      "hard-drive": '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 15h.01M11 15h6M7 9h10"/>',
      scale: '<path d="M12 3v18M5 7h14M7 7l-4 7h8L7 7zM17 7l-4 7h8l-4-7z"/>',
      activity: '<path d="M3 12h4l2-5 4 10 2-5h6"/>',
      camera: '<rect x="3" y="6" width="15" height="12" rx="2"/><path d="M18 10l4-2v8l-4-2M7 6l1.5-3h4L14 6"/>',
      folder: '<path d="M3 6h6l2 2h10v11H3V6z"/>',
      mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
      code: '<path d="M8 9l-3 3 3 3M16 9l3 3-3 3M14 5l-4 14"/>',
      server: '<rect x="3" y="4" width="18" height="6" rx="2"/><rect x="3" y="14" width="18" height="6" rx="2"/><path d="M7 7h.01M7 17h.01M11 7h6M11 17h6"/>',
      upload: '<path d="M12 16V4M7 9l5-5 5 5M4 20h16"/>',
      lock: '<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 018 0v3M12 14v3"/>',
      fingerprint: '<path d="M12 11a3 3 0 00-3 3c0 3-1 5-2 6M15 14a6 6 0 01-2 5M6 14a6 6 0 0112 0c0 4-1 6-2 7M8 9a6 6 0 018-1M5 8a9 9 0 0114 1"/>',
      key: '<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M15 8l3 3M17 6l2 2"/>',
      clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
      file: '<path d="M5 3h9l5 5v13H5V3z"/><path d="M14 3v5h5M8 13h8M8 17h6"/>',
      video: '<rect x="3" y="6" width="14" height="12" rx="2"/><path d="M17 10l4-2v8l-4-2"/>',
      check: '<path d="M5 12l4 4L19 6"/>',
      x: '<path d="M6 6l12 12M18 6L6 18"/>',
      "arrow-right": '<path d="M5 12h14M13 6l6 6-6 6"/>',
      filter: '<path d="M4 5h16M7 12h10M10 19h4"/>',
      eye: '<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z"/><circle cx="12" cy="12" r="2.5"/>',
      download: '<path d="M12 3v12M7 10l5 5 5-5M4 21h16"/>',
      users: '<path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>',
      settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 00.34 1.88l.06.06-2.83 2.83-.06-.06a1.7 1.7 0 00-1.88-.34 1.7 1.7 0 00-1.03 1.56V21H10v-.09a1.7 1.7 0 00-1.03-1.56 1.7 1.7 0 00-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 004.6 15 1.7 1.7 0 003 14H3v-4h.09A1.7 1.7 0 004.65 9a1.7 1.7 0 00-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 009 4.6 1.7 1.7 0 0010 3h4v.09A1.7 1.7 0 0015 4.65a1.7 1.7 0 001.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0019.4 9 1.7 1.7 0 0021 10v4h-.09A1.7 1.7 0 0019.4 15z"/>',
      refresh: '<path d="M20 11a8 8 0 10-2 5.5M20 4v7h-7"/>',
      shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
      link: '<path d="M10 13a5 5 0 007 0l2-2a5 5 0 00-7-7l-1 1M14 11a5 5 0 00-7 0l-2 2a5 5 0 007 7l1-1"/>',
      alert: '<path d="M12 3l10 18H2L12 3z"/><path d="M12 9v5M12 18h.01"/>',
      document: '<path d="M6 2h9l5 5v15H6V2z"/><path d="M15 2v5h5M9 12h8M9 16h8"/>',
      "external-link": '<path d="M14 3h7v7M10 14L21 3M21 13v7H4V3h7"/>'
    };
    return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.info}</svg>`;
  }

  function badge(label, tone = "gray") { return `<span class="status-chip ${tone}">${esc(label)}</span>`; }

  function shell(content) {
    const mainNav = nav.filter(n => n.group === "main").map(navItem).join("");
    const govNav = nav.filter(n => n.group === "gov").map(navItem).join("");
    return `
      <div class="app-shell">
        <aside class="sidebar ${state.sidebarOpen ? "open" : ""}" id="sidebar">
          <a class="brand-link" href="#/overview" aria-label="RM TraceVault home">
            <img src="assets/logo-wordmark.svg" alt="RM TraceVault — Secure. Trace. Protect." />
          </a>
          <div class="sidebar-label">${tr("navMain")}</div>
          <nav class="nav-list">${mainNav}</nav>
          <div class="sidebar-label">${tr("navGovernance")}</div>
          <nav class="nav-list">${govNav}</nav>
          <div class="sidebar-foot">
            <div class="demo-card"><strong>${tr("conceptDemo")}</strong><p>${tr("simulated")}. ${state.lang === "ar" ? "لا توجد بيانات عملاء أو أدلة حقيقية." : "No customer data or real evidence is present."}</p></div>
            <div class="sidebar-meta">${esc(D.product.version)}<br>${esc(D.product.location)} · ${esc(D.product.website)}</div>
          </div>
        </aside>
        <header class="topbar">
          <button class="icon-btn mobile-menu" data-action="toggle-menu" aria-label="Menu">${icon("menu")}</button>
          <div class="tenant-switch">
            <div class="tenant-mark">DA</div>
            <div class="tenant-copy"><strong>${tr("tenant")}</strong><small>${tr("targetRegion")}</small></div>
            <span class="tenant-chevron">${icon("chevron")}</span>
          </div>
          <div class="top-actions">
            <button class="tour-btn" data-action="tour">${icon("play")}<span>${tr("startTour")}</span></button>
            <button class="lang-btn" data-action="language">${icon("globe")}<span>${state.lang === "ar" ? "English" : "العربية"}</span></button>
            <button class="icon-btn" aria-label="Notifications">${icon("bell")}<i class="notification-dot"></i></button>
            <div class="profile"><div class="avatar">RM</div><div class="profile-copy"><strong>RM TraceVault</strong><small>${state.lang === "ar" ? "بيئة العرض" : "Demo Environment"}</small></div></div>
          </div>
        </header>
        <main class="main">
          <div class="public-banner">${icon("info")}<span><strong>${tr("conceptDemo")}:</strong> ${tr("banner")}</span><span class="spacer"></span>${badge(tr("simulated"), "blue")}</div>
          ${content}
        </main>
      </div>`;
  }

  function navItem(item) {
    return `<a class="nav-link ${state.route === item.id ? "active" : ""}" href="#/${item.id}" data-route="${item.id}">${icon(item.icon)}<span>${tr(item.id)}</span></a>`;
  }

  function pageHead(title, subtitle, actions = "") {
    return `<div class="page-head"><div><h1>${title}</h1><p>${subtitle}</p></div><div class="page-actions">${actions}</div></div>`;
  }

  function btn(label, action, style = "", iconName = null) {
    return `<button class="btn ${style}" data-action="${action}">${iconName ? icon(iconName) : ""}${label}</button>`;
  }

  function kpiCards() {
    return `<section class="kpi-grid">${D.kpis.map(k => `<article class="kpi-card"><div class="kpi-top"><div class="kpi-icon">${icon(k.icon)}</div><span class="kpi-arrow">${k.trend === "up" ? "↗" : "•"}</span></div><div class="kpi-label">${esc(k.label)}</div><div class="kpi-value">${esc(k.value)}</div><div class="kpi-delta">${esc(k.delta)}</div></article>`).join("")}</section>`;
  }

  function lineChart() {
    return `<svg class="line-chart" viewBox="0 0 700 220" preserveAspectRatio="none" role="img" aria-label="Ingestion volume trend">
      <defs><linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a7fff" stop-opacity=".28"/><stop offset="1" stop-color="#2a7fff" stop-opacity="0"/></linearGradient></defs>
      ${[30,70,110,150,190].map(y => `<line class="grid-line" x1="40" y1="${y}" x2="680" y2="${y}"/>`).join("")}
      <path class="area" d="M40 170 C95 148 120 162 170 132 S250 90 300 119 S390 70 440 84 S520 54 570 78 S640 42 680 54 L680 195 L40 195 Z"/>
      <path class="line" d="M40 170 C95 148 120 162 170 132 S250 90 300 119 S390 70 440 84 S520 54 570 78 S640 42 680 54"/>
      ${[[40,170],[170,132],[300,119],[440,84],[570,78],[680,54]].map(([x,y]) => `<circle class="point" cx="${x}" cy="${y}" r="4"/>`).join("")}
      <text x="40" y="213">Mon</text><text x="166" y="213">Tue</text><text x="292" y="213">Wed</text><text x="418" y="213">Thu</text><text x="544" y="213">Fri</text><text x="653" y="213">Sat</text>
    </svg>`;
  }

  function overviewPage() {
    const actions = btn(tr("upload"), "simulate-ingestion", "primary", "upload-cloud") + btn(tr("presentation"), "tour", "", "play");
    const sources = D.connectors.slice(0, 4).map(c => `<article class="source-card"><div class="source-icon ${c.tone}">${icon(c.icon)}</div><strong>${esc(c.name)}</strong><small>${esc(c.count)}</small><footer><span>${esc(c.volume)}</span>${badge(c.status, c.status === "Connected" ? "green" : c.status === "Syncing" ? "blue" : "amber")}</footer></article>`).join("");
    const controls = [
      ["WORM / Object Lock", "Immutable retention control", "lock", "Active"],
      ["AES-256-GCM", "Evidence encryption profile", "key", "Enabled"],
      ["SHA-512", "Whole-evidence integrity digest", "fingerprint", "Verified"],
      ["Chain of Custody", "Signed, auditable event history", "link", "Healthy"],
      ["RBAC + MFA", "Least-privilege access control", "users", "Enforced"],
      ["Saudi Data Boundary", "Target sovereign deployment", "globe", "Designed"]
    ].map(c => `<div class="control-item"><div class="ci-icon">${icon(c[2])}</div><div><strong>${c[0]}</strong><small>${c[1]}</small></div>${badge(c[3], c[3] === "Designed" ? "blue" : "green")}</div>`).join("");
    return shell(`
      ${pageHead(state.lang === "ar" ? "النظرة التنفيذية" : "Executive Overview", state.lang === "ar" ? "عرض موحد لحالة الأدلة، السلامة، الحيازة، التخزين، ومصادر الإدخال." : "A unified view of evidence custody, integrity, storage and source ingestion.", actions)}
      <section class="hero">
        <div><div class="hero-kicker">${state.lang === "ar" ? "منصة الثقة السيادية للأدلة الرقمية" : "Sovereign digital evidence trust platform"}</div><h2>${state.lang === "ar" ? "حفظ الدليل ليس كافيًا. يجب أن يكون قابلًا للإثبات." : "Preserving evidence is not enough. It must remain provable."}</h2><p>${state.lang === "ar" ? "تجمع RM TraceVault الحفظ غير القابل للتلاعب، التشفير، البصمة، سلسلة الحيازة، والتحقق المستقل في تجربة مؤسسية واحدة." : "RM TraceVault unifies immutable preservation, encryption, integrity, chain of custody and independent verification in one enterprise experience."}</p><div class="hero-actions">${btn(tr("learnMore"), "go-vault", "primary", "arrow-right")}${btn(tr("contact"), "contact", "secondary-on-dark", "mail")}</div></div>
        <div class="hero-visual"><div class="trust-orbit"><div class="trust-center"><img src="assets/logo-mark.svg" alt="RM TraceVault"/></div><span class="orbit-node n1">${icon("lock")}</span><span class="orbit-node n2">${icon("fingerprint")}</span><span class="orbit-node n3">${icon("scale")}</span><span class="orbit-node n4">${icon("package")}</span><span class="orbit-node n5">${icon("shield-check")}</span></div></div>
      </section>
      ${kpiCards()}
      <section class="grid three">
        <article class="card span-2"><header class="card-header"><div><h3>${state.lang === "ar" ? "حجم إدخال الأدلة" : "Evidence ingestion volume"}</h3><p>${state.lang === "ar" ? "مؤشر محاكاة لآخر سبعة أيام" : "Simulated seven-day throughput trend"}</p></div>${badge("+18.4%", "green")}</header><div class="card-body"><div class="chart-wrap">${lineChart()}</div></div></article>
        <article class="card"><header class="card-header"><div><h3>${state.lang === "ar" ? "توزيع التخزين" : "Storage distribution"}</h3><p>${state.lang === "ar" ? "حسب مصدر الدليل" : "By evidence source"}</p></div></header><div class="card-body"><div class="donut-layout"><div class="donut"><div class="donut-center"><strong>188.4</strong><small>TB used</small></div></div><div class="legend">${[["CCTV",44,"#1268e8"],["Files",22,"#16b8d4"],["Email",14,"#6f4bd8"],["Logs",11,"#28a774"],["Available",9,"#d5deeb"]].map(x => `<div class="legend-row"><i class="legend-dot" style="background:${x[2]}"></i><span>${x[0]}</span><strong>${x[1]}%</strong></div>`).join("")}</div></div></div></article>
      </section>
      <section class="grid two">
        <article class="card"><header class="card-header"><div><h3>${state.lang === "ar" ? "مصادر الأدلة" : "Evidence sources"}</h3><p>${state.lang === "ar" ? "قنوات إدخال متعددة داخل مسار موحد" : "Multiple acquisition channels in one governed flow"}</p></div><a href="#/ingestion" class="header-action">${state.lang === "ar" ? "عرض الكل" : "View all"}</a></header><div class="card-body"><div class="source-cards">${sources}</div></div></article>
        <article class="card"><header class="card-header"><div><h3>${state.lang === "ar" ? "ضوابط الثقة" : "Trust controls"}</h3><p>${state.lang === "ar" ? "حالة الضوابط الأساسية في بيئة العرض" : "Core controls represented in this concept environment"}</p></div></header><div class="card-body"><div class="control-grid">${controls}</div></div></article>
      </section>
      <section class="grid two">
        <article class="card"><header class="card-header"><div><h3>${state.lang === "ar" ? "أحدث الأدلة" : "Recent evidence"}</h3><p>${state.lang === "ar" ? "آخر العناصر التي دخلت الخزنة" : "Latest objects registered in the vault"}</p></div><a href="#/vault" class="header-action">${state.lang === "ar" ? "فتح الخزنة" : "Open vault"}</a></header><div class="card-body flush">${evidenceTable(D.evidence.slice(0,4), true)}</div></article>
        <article class="card"><header class="card-header"><div><h3>${state.lang === "ar" ? "النشاط الأخير" : "Recent activity"}</h3><p>${state.lang === "ar" ? "سجل الحيازة والأحداث" : "Custody and verification events"}</p></div></header><div class="card-body"><div class="timeline">${D.custody.slice(0,5).map(t => `<div class="timeline-item"><i class="timeline-dot"></i><strong>${esc(t.action)}</strong><p>${esc(t.detail)}</p><time>${esc(t.time)} · ${esc(t.actor)}</time></div>`).join("")}</div></div></article>
      </section>
    `);
  }

  function evidenceTable(rows, compact = false) {
    return `<div class="table-wrap"><table class="data-table"><thead><tr><th>${state.lang === "ar" ? "الدليل" : "Evidence"}</th><th>${state.lang === "ar" ? "المصدر" : "Source"}</th><th>${state.lang === "ar" ? "القضية" : "Case"}</th><th>${state.lang === "ar" ? "الحماية" : "Protection"}</th><th>${state.lang === "ar" ? "السلامة" : "Integrity"}</th><th>${state.lang === "ar" ? "الاحتفاظ" : "Retention"}</th>${compact ? "" : `<th>${state.lang === "ar" ? "الإجراء" : "Action"}</th>`}</tr></thead><tbody>${rows.map(e => `<tr><td><div class="file-cell"><span class="file-type-icon">${icon(e.type === "Video" ? "video" : "file")}</span><div><a class="table-link" href="#/vault" data-evidence="${esc(e.id)}">${esc(e.title)}</a><small>${esc(e.id)} · ${esc(e.size)}</small></div></div></td><td><strong>${esc(e.source)}</strong><small>${esc(e.sourceDetail)}</small></td><td><strong>${esc(e.caseId)}</strong><small>${esc(e.caseName)}</small></td><td>${badge(e.worm, "blue")}${e.legalHold ? `<div style="margin-top:6px">${badge("Legal Hold", "purple")}</div>` : ""}</td><td>${badge(e.integrity, "green")}</td><td><strong>${esc(e.retention)}</strong><small>${esc(e.encryption)}</small></td>${compact ? "" : `<td><button class="btn" data-evidence="${esc(e.id)}">${icon("eye")}${tr("viewEvidence")}</button></td>`}</tr>`).join("")}</tbody></table></div>`;
  }

  function vaultPage() {
    const actions = `<div class="searchbar">${icon("search")}<input id="vault-search" placeholder="${state.lang === "ar" ? "ابحث بالمعرف، الملف، القضية أو المصدر" : "Search by ID, file, case or source"}" /></div>${btn(tr("upload"), "simulate-ingestion", "primary", "upload-cloud")}`;
    return shell(`${pageHead(state.lang === "ar" ? "خزنة الأدلة" : "Evidence Vault", state.lang === "ar" ? "مستودع موحد للأدلة الرقمية مع الحفظ غير القابل للتلاعب وسجل السلامة والحيازة." : "A governed evidence inventory with immutable preservation, integrity and custody context.", actions)}
      <div class="filter-row"><button class="filter-pill active">${state.lang === "ar" ? "كل الأدلة" : "All evidence"}</button><button class="filter-pill">CCTV</button><button class="filter-pill">Email</button><button class="filter-pill">Documents</button><button class="filter-pill">Logs</button><button class="filter-pill">Legal Hold</button><button class="filter-pill">Verified</button></div>
      <article class="card"><header class="card-header"><div><h3>${state.lang === "ar" ? "سجل الأدلة" : "Evidence inventory"}</h3><p>${state.lang === "ar" ? "بيانات افتراضية لأغراض العرض فقط" : "Fictional records for demonstration purposes only"}</p></div>${badge(`${D.evidence.length} demo records`, "blue")}</header><div class="card-body flush" id="vault-table">${evidenceTable(D.evidence)}</div></article>`);
  }

  function evidenceDetail(e) {
    const preview = e.type === "Video" ? `<div class="evidence-preview"><div class="preview-frame"><div class="camera-shape"></div><div class="preview-caption"><span class="live-dot">Recorded evidence preview</span><span>${esc(e.collected)}</span></div></div></div>` : `<div class="evidence-preview"><div style="position:relative;z-index:1;text-align:center"><div style="font-size:70px;margin-bottom:14px">${icon("file")}</div><strong style="font-size:18px">${esc(e.title)}</strong><p style="color:#abc3e3;font-size:12px">Secure preview placeholder · ${esc(e.type)}</p></div></div>`;
    return shell(`${pageHead(state.lang === "ar" ? "سجل الدليل" : "Evidence Record", `${esc(e.id)} · ${esc(e.caseName)}`, `${btn(tr("verify"), "verify-current", "primary", "shield-check")}${btn(state.lang === "ar" ? "إنشاء تصدير" : "Generate export", "go-exports", "", "package")}`)}
      <section class="evidence-layout">
        <article class="card"><header class="card-header"><div><h3>${esc(e.title)}</h3><p>${esc(e.source)} · ${esc(e.sourceDetail)}</p></div><div>${badge(e.status,"green")}</div></header><div class="card-body">${preview}<div class="meta-grid">${[["Evidence ID",e.id],["Case",e.caseId],["File size",e.size],["Collected",e.collected],["Retention end",e.retention],["Legal Hold",e.legalHold?"Applied":"Not applied"]].map(x=>`<div class="meta-item"><span>${esc(x[0])}</span><strong>${esc(x[1])}</strong></div>`).join("")}</div></div></article>
        <aside><article class="card"><header class="card-header"><div><h3>${state.lang === "ar" ? "حالة الثقة" : "Trust status"}</h3><p>${state.lang === "ar" ? "ضوابط الحماية والسلامة" : "Protection and integrity controls"}</p></div></header><div class="card-body"><div class="control-grid" style="grid-template-columns:1fr">${[["Immutable storage",e.worm,"lock","green"],["Encryption",e.encryption,"key","blue"],["Integrity",e.integrity,"fingerprint","green"],["Custody events","6 signed events","link","blue"]].map(c=>`<div class="control-item"><div class="ci-icon">${icon(c[2])}</div><div><strong>${c[0]}</strong><small>${esc(c[1])}</small></div>${badge(c[3]==="green"?"Healthy":"Active",c[3])}</div>`).join("")}</div><div class="evidence-actions">${btn(tr("verify"),"verify-current","primary","shield-check")}${btn(state.lang === "ar" ? "تطبيق حجز قانوني" : "Place Legal Hold","legal-hold","","scale")}${btn(state.lang === "ar" ? "نقل الحيازة" : "Transfer Custody","transfer","","link")}${btn(state.lang === "ar" ? "إضافة إلى قضية" : "Add to Case","add-case","","briefcase")}</div></div></article></aside>
      </section>
      <section class="grid two" style="margin-top:16px"><article class="card"><header class="card-header"><div><h3>${state.lang === "ar" ? "البصمة الرقمية" : "Integrity fingerprint"}</h3><p>SHA-512 · ${state.lang === "ar" ? "بصمة النص الأصلي الكامل" : "Whole original evidence byte stream"}</p></div>${badge("Verified","green")}</header><div class="card-body"><div class="hash-box"><header><span>SHA-512</span>${badge("Match","green")}</header><code>${esc(e.hash)}</code></div></div></article><article class="card"><header class="card-header"><div><h3>${state.lang === "ar" ? "سلسلة الحيازة" : "Chain of Custody"}</h3><p>${state.lang === "ar" ? "أحداث مترابطة وقابلة للتدقيق" : "Linked, auditable custody events"}</p></div></header><div class="card-body"><div class="timeline">${D.custody.map(t=>`<div class="timeline-item"><i class="timeline-dot"></i><strong>${esc(t.action)}</strong><p>${esc(t.detail)}</p><time>${esc(t.time)} · ${esc(t.actor)}</time></div>`).join("")}</div></div></article></section>`);
  }

  function ingestionPage() {
    const actions = btn(tr("upload"), "simulate-ingestion", "primary", "upload-cloud");
    const steps = [["1","Source Selection","Select approved evidence source"],["2","Validation","Validate format, metadata and limits"],["3","Encryption","Apply approved chunk encryption profile"],["4","Immutable Commit","Write to protected evidence vault"],["5","Verification","Confirm integrity and register custody"]];
    return shell(`${pageHead(state.lang === "ar" ? "إدخال الأدلة والموصلات" : "Ingestion & Connectors", state.lang === "ar" ? "استقبال آمن من مصادر متعددة مع التحقق، التشفير، الحفظ غير القابل للتلاعب، وتسجيل الحيازة." : "Secure acquisition from multiple sources with validation, encryption, immutable commit and custody registration.", actions)}
      <section class="steps">${steps.map(s=>`<article class="step-card"><span class="step-number">${s[0]}</span><strong>${s[1]}</strong><small>${s[2]}</small></article>`).join("")}</section>
      <section class="grid two"><article class="card"><header class="card-header"><div><h3>${state.lang === "ar" ? "كتالوج الموصلات" : "Connector catalogue"}</h3><p>${state.lang === "ar" ? "قنوات افتراضية توضح نطاق المنتج" : "Conceptual channels representing target product scope"}</p></div></header><div class="card-body"><div class="source-cards">${D.connectors.map(c=>`<article class="source-card"><div class="source-icon ${c.tone}">${icon(c.icon)}</div><strong>${esc(c.name)}</strong><small>${esc(c.count)}</small><footer><span>${esc(c.volume)}</span>${badge(c.status,c.status==="Connected"?"green":c.status==="Syncing"?"blue":c.status==="Ready"?"gray":"amber")}</footer></article>`).join("")}</div></div></article>
      <article class="card"><header class="card-header"><div><h3>${state.lang === "ar" ? "ملف الإدخال الآمن" : "Secure ingestion profile"}</h3><p>${state.lang === "ar" ? "الضوابط المعروضة في تجربة الإثبات" : "Controls represented in the demonstration flow"}</p></div></header><div class="card-body"><div class="control-grid" style="grid-template-columns:1fr">${[["Resumable upload","Up to 50 GB per file","upload-cloud"],["Chunk encryption","Fixed 64 MiB chunks","key"],["Integrity verification","SHA-512 before immutable commit","fingerprint"],["Metadata capture","Source, actor, time and case context","document"],["Immutable commit","Object Lock Compliance Mode","lock"],["Custody registration","Signed event and verification result","link"]].map(c=>`<div class="control-item"><div class="ci-icon">${icon(c[2])}</div><div><strong>${c[0]}</strong><small>${c[1]}</small></div>${badge("Configured","blue")}</div>`).join("")}</div></div></article></section>
      <article class="card"><header class="card-header"><div><h3>${state.lang === "ar" ? "قائمة الإدخال" : "Ingestion queue"}</h3><p>${state.lang === "ar" ? "محاكاة لحالة الدفعات أثناء المعالجة" : "Simulated batch processing state"}</p></div>${badge("4 batches","blue")}</header><div class="card-body flush"><div class="table-wrap"><table class="data-table"><thead><tr><th>Batch</th><th>Source</th><th>Size</th><th>Validation</th><th>Encryption</th><th>Hash</th><th>WORM</th><th>Owner</th></tr></thead><tbody>${D.ingestionQueue.map(q=>`<tr><td><strong>${esc(q.item)}</strong></td><td>${esc(q.source)}</td><td>${esc(q.size)}</td><td>${badge(q.validation,q.validation==="Passed"?"green":"amber")}</td><td>${badge(q.encryption,q.encryption==="Complete"?"green":q.encryption==="Processing"?"blue":"gray")}</td><td>${badge(q.hash,q.hash==="Verified"?"green":"gray")}</td><td>${badge(q.worm,q.worm==="Committed"?"green":"gray")}</td><td>${esc(q.owner)}</td></tr>`).join("")}</tbody></table></div></div></article>`);
  }

  function casesPage() {
    return shell(`${pageHead(state.lang === "ar" ? "مساحة القضايا" : "Case Workspace", state.lang === "ar" ? "تنظيم الأدلة، المهام، التنبيهات، الملاحظات، وطلبات التصدير ضمن سياق القضية." : "Organize evidence, tasks, alerts, notes and export requests within a governed case context.", `${btn(state.lang === "ar" ? "قضية جديدة" : "New case","new-case","primary","briefcase")}`)}
      <section class="grid two"><div class="case-grid">${D.cases.map(c=>`<article class="case-card"><div class="case-top"><div><div class="case-id">${esc(c.id)}</div><h3>${esc(c.name)}</h3><p>${esc(c.owner)} · ${esc(c.updated)}</p></div>${badge(c.priority,c.priority==="Critical"?"red":c.priority==="High"?"amber":"blue")}</div><div class="case-stats"><div><span>Evidence</span><strong>${c.evidence.toLocaleString()}</strong></div><div><span>Alerts</span><strong>${c.alerts}</strong></div><div><span>Exports</span><strong>${c.exports}</strong></div></div></article>`).join("")}</div>
      <article class="ai-panel"><header><div><h3>${state.lang === "ar" ? "تحليل الأدلة بالذكاء الاصطناعي" : "AI Evidence Analysis"}</h3><p>${state.lang === "ar" ? "قدرة اختيارية محكومة، لا تعدّل الدليل الأصلي وتحتفظ بالمصدر والإصدار والثقة." : "Optional governed capability that never modifies original evidence and retains source, model version and confidence."}</p></div>${badge(state.lang === "ar" ? "إضافة اختيارية" : "Optional add-on","purple")}</header><div class="ai-results">${[["OCR","Arabic / English extraction"],["Classification","Document type suggestion"],["PII Detection","Sensitive-data indicators"],["Semantic Search","Meaning-based discovery"],["Entity Extraction","People, places and references"],["Provenance","Model and result traceability"]].map(x=>`<div class="ai-result"><span>${x[0]}</span><strong>${x[1]}</strong></div>`).join("")}</div></article></section>
      <section class="grid two"><article class="card"><header class="card-header"><div><h3>${state.lang === "ar" ? "أدلة القضية النشطة" : "Active case evidence"}</h3><p>CASE-DEMO-0421 · Financial Activity Review</p></div></header><div class="card-body flush">${evidenceTable(D.evidence.filter(e=>e.caseId==="CASE-DEMO-0421"),true)}</div></article><article class="card"><header class="card-header"><div><h3>${state.lang === "ar" ? "المهام والملاحظات" : "Tasks & notes"}</h3><p>${state.lang === "ar" ? "تعاون محكوم داخل القضية" : "Governed collaboration within the case"}</p></div></header><div class="card-body"><div class="timeline">${[["Review mailbox export","Assigned to Demo Investigator B","Due today"],["Validate payment document lineage","Assigned to Demo Investigator C","Due tomorrow"],["Legal Hold approval recorded","Completed by Demo Legal Reviewer","Completed"],["Prepare reviewer package","Waiting for approval","Pending"]].map(t=>`<div class="timeline-item"><i class="timeline-dot"></i><strong>${t[0]}</strong><p>${t[1]}</p><time>${t[2]}</time></div>`).join("")}</div></div></article></section>`);
  }

  function searchPage() {
    const actions = `<div class="searchbar">${icon("search")}<input id="global-search" value="access review" placeholder="Search evidence, cases, actors and metadata" /></div>${btn(state.lang === "ar" ? "بحث متقدم" : "Advanced filters","filters","","filter")}`;
    return shell(`${pageHead(state.lang === "ar" ? "البحث والمراجعة" : "Search & Review", state.lang === "ar" ? "بحث مصرح به داخل البيانات الوصفية والأدلة والقضايا مع تطبيق صلاحيات المؤسسة." : "Authorized discovery across evidence metadata, custody context and cases with tenant-aware access control.", actions)}
      <div class="filter-row"><button class="filter-pill active">All sources</button><button class="filter-pill">Verified only</button><button class="filter-pill">Legal Hold</button><button class="filter-pill">Last 30 days</button><button class="filter-pill">CCTV</button><button class="filter-pill">Email</button></div>
      <section class="grid three"><article class="card span-2"><header class="card-header"><div><h3>${state.lang === "ar" ? "نتائج البحث" : "Search results"}</h3><p>${state.lang === "ar" ? "تم العثور على 24 نتيجة في بيانات العرض" : "24 matches found across demo records"}</p></div>${badge("Authorization filtered","green")}</header><div class="card-body flush">${evidenceTable(D.evidence.slice(0,5),true)}</div></article><article class="card"><header class="card-header"><div><h3>${state.lang === "ar" ? "عمليات بحث محفوظة" : "Saved searches"}</h3><p>${state.lang === "ar" ? "استعلامات متكررة للفريق" : "Reusable queries for the team"}</p></div></header><div class="card-body"><div class="policy-list">${[["High-priority CCTV","14 new matches"],["Evidence under Legal Hold","31 active objects"],["Failed verification events","0 matches"],["Recent external reviews","8 activities"],["Retention ending in 90 days","12 objects"]].map(x=>`<div class="policy-row"><div class="ci-icon" style="width:42px;height:42px">${icon("search")}</div><div><strong>${x[0]}</strong><small>${x[1]}</small></div>${icon("chevron")}</div>`).join("")}</div></div></article></section>`);
  }

  function exportsPage() {
    return shell(`${pageHead(state.lang === "ar" ? "حزم التصدير والتحقق" : "Export & Verification Packages", state.lang === "ar" ? "إنشاء حزمة تقنية قابلة للمراجعة تضم الدليل والبصمة وسلسلة الحيازة ونتائج التحقق." : "Build a portable technical package containing evidence, integrity records, custody history and verification material.", `${btn(tr("generateExport"),"build-export","primary","package")}`)}
      <section class="export-builder"><article class="card"><header class="card-header"><div><h3>${state.lang === "ar" ? "مكونات الحزمة" : "Package contents"}</h3><p>${state.lang === "ar" ? "اختر المكونات التي سيستلمها المراجع" : "Select the materials delivered to the reviewer"}</p></div></header><div class="card-body"><div class="option-list">${[["Evidence objects","Original selected evidence files",true],["Manifest","Evidence IDs, metadata and file inventory",true],["Integrity report","SHA-512 values and verification results",true],["Chain of Custody","Complete custody event history",true],["Verification toolkit","Portable offline verification workflow",true],["Redacted derivatives","Optional derived copies linked to originals",false]].map(x=>`<label class="option-row"><input type="checkbox" ${x[2]?"checked":""}/><div><strong>${x[0]}</strong><small>${x[1]}</small></div>${x[2]?badge("Included","green"):badge("Optional","gray")}</label>`).join("")}</div></div></article>
      <aside class="package-summary"><h3>${state.lang === "ar" ? "ملخص الحزمة" : "Package summary"}</h3>${[["Export ID","EXP-DEMO-NEW"],["Evidence objects","3"],["Estimated size","24.9 GB"],["Signer","RM Demo Signing Service"],["Signature status","Ready"],["Delivery","Secure Download"]].map(x=>`<div class="summary-row"><span>${x[0]}</span><strong>${x[1]}</strong></div>`).join("")}<div class="verify-steps">${[["Load package","Complete"],["Validate signature","Complete"],["Recompute SHA-512","Complete"],["Compare manifest","Complete"],["Review custody trail","Ready"]].map(x=>`<div class="verify-step"><span class="check">${icon("check")}</span><div><strong>${x[0]}</strong><small>Offline verification workflow</small></div>${badge(x[1],x[1]==="Ready"?"blue":"green")}</div>`).join("")}</div><button class="btn primary" data-action="build-export" style="width:100%;margin-top:15px">${icon("package")}${tr("generateExport")}</button></aside></section>
      <article class="card" style="margin-top:16px"><header class="card-header"><div><h3>${state.lang === "ar" ? "عمليات التصدير الأخيرة" : "Recent export packages"}</h3><p>${state.lang === "ar" ? "حالة الحزم ونتائج التحقق" : "Package delivery and verification status"}</p></div></header><div class="card-body flush"><div class="table-wrap"><table class="data-table"><thead><tr><th>Package</th><th>Requestor</th><th>Created</th><th>Destination</th><th>Size</th><th>Verification</th><th>Status</th></tr></thead><tbody>${D.exports.map(e=>`<tr><td><strong>${esc(e.name)}</strong><small>${esc(e.id)}</small></td><td>${esc(e.requestor)}</td><td>${esc(e.created)}</td><td>${esc(e.destination)}</td><td>${esc(e.size)}</td><td>${badge(e.verification,e.verification==="Verified"||e.verification==="Ready"?"green":"amber")}</td><td>${badge(e.status,e.status==="Complete"?"blue":"amber")}</td></tr>`).join("")}</tbody></table></div></div></article>`);
  }

  function tenantsPage() {
    return shell(`${pageHead(state.lang === "ar" ? "إدارة المؤسسات" : "Tenant Administration", state.lang === "ar" ? "إدارة المؤسسات والمستخدمين والسياسات والاستهلاك ضمن نموذج متعدد المستأجرين." : "Manage organizations, users, policy controls and consumption within a multi-tenant model.", `${btn(state.lang === "ar" ? "إضافة مستخدم" : "Add user","add-user","primary","users")}`)}
      <section class="tenant-cards">${D.tenants.map((t,i)=>`<article class="tenant-card ${i===0?"active":""}"><header><div><h3>${esc(t.name)}</h3><p>${esc(t.plan)} · ${esc(t.region)}</p></div>${badge(t.health,t.health==="Healthy"?"green":"amber")}</header><dl><div><dt>Storage</dt><dd>${esc(t.storage)}</dd></div><div><dt>Users</dt><dd>${t.users}</dd></div></dl><div class="progress"><span style="width:${i===0?63:i===1?43:50}%"></span></div></article>`).join("")}</section>
      <section class="grid two" style="margin-top:16px"><article class="card"><header class="card-header"><div><h3>${state.lang === "ar" ? "المستخدمون والصلاحيات" : "Users & Access"}</h3><p>${state.lang === "ar" ? "أدوار وصلاحيات افتراضية لأغراض العرض" : "Fictional identities and roles for demonstration"}</p></div></header><div class="card-body flush"><div class="table-wrap"><table class="data-table"><thead><tr><th>User</th><th>Role</th><th>MFA</th><th>Access</th><th>Last activity</th></tr></thead><tbody>${D.users.map((u,i)=>`<tr><td><div class="user-cell"><span class="user-avatar">${i+1}</span><div><strong>${esc(u.name)}</strong><small>${esc(u.email)}</small></div></div></td><td>${esc(u.role)}</td><td>${badge(u.mfa,u.mfa==="Verified"?"green":"blue")}</td><td>${esc(u.access)}</td><td>${esc(u.last)}</td></tr>`).join("")}</tbody></table></div></div></article><article class="card"><header class="card-header"><div><h3>${state.lang === "ar" ? "سياسات المؤسسة" : "Tenant policies"}</h3><p>${state.lang === "ar" ? "الإعدادات الافتراضية للمؤسسة المختارة" : "Default controls for the selected organization"}</p></div></header><div class="card-body"><div class="policy-list">${[["Enterprise SSO","Federated identity enabled",true],["MFA","Required for all users",true],["Export approval","Dual approval required",true],["Support access","Time-bound customer approval",true],["Guest review","Step-up authentication",true],["Automatic deletion","Disabled while retention applies",false]].map(x=>`<div class="policy-row"><div class="toggle ${x[2]?"on":""}"></div><div><strong>${x[0]}</strong><small>${x[1]}</small></div>${badge(x[2]?"Enabled":"Protected",x[2]?"green":"blue")}</div>`).join("")}</div></div></article></section>`);
  }

  function securityPage() {
    return shell(`${pageHead(state.lang === "ar" ? "الأمن وضوابط الثقة" : "Security & Trust Controls", state.lang === "ar" ? "عرض ضوابط الوصول والتشفير والمفاتيح والمراقبة والاحتفاظ في تجربة المنتج المستهدفة." : "A consolidated view of access, encryption, key custody, monitoring and retention controls in the target product experience.", `${btn(state.lang === "ar" ? "تشغيل فحص الضوابط" : "Run control review","security-scan","primary","refresh")}`)}
      <section class="security-hero"><div><h2>${state.lang === "ar" ? "الثقة لا تعتمد على صلاحية واحدة أو مورد واحد" : "Trust does not depend on one administrator or one provider"}</h2><p>${state.lang === "ar" ? "يستهدف التصميم فصل صلاحيات الوصول، التشفير، الحفظ، التحقق، والتدقيق بحيث تكون كل عملية قابلة للتفسير والمراجعة." : "The target design separates access, encryption, preservation, verification and audit responsibilities so every operation remains explainable and reviewable."}</p></div><div class="security-score"><strong>94</strong><small>Demo score</small></div></section>
      <section class="grid three"><article class="card"><header class="card-header"><div><h3>${state.lang === "ar" ? "الهوية والوصول" : "Identity & Access"}</h3><p>RBAC · MFA · SSO · Least privilege</p></div></header><div class="card-body"><div class="control-grid" style="grid-template-columns:1fr">${[["Enterprise SSO","Configured","users"],["MFA enforcement","100% enrolled","shield-check"],["Privileged access","Time-bound and approved","key"],["Access reviews","Quarterly review cycle","clock"]].map(c=>`<div class="control-item"><div class="ci-icon">${icon(c[2])}</div><div><strong>${c[0]}</strong><small>${c[1]}</small></div>${badge("Healthy","green")}</div>`).join("")}</div></div></article>
      <article class="card"><header class="card-header"><div><h3>${state.lang === "ar" ? "التشفير والمفاتيح" : "Encryption & Key Custody"}</h3><p>Evidence encryption · root separation · audit</p></div></header><div class="card-body"><div class="control-grid" style="grid-template-columns:1fr">${[["Evidence encryption","AES-256-GCM profile","lock"],["Evidence digest","SHA-512","fingerprint"],["Key custody","Separated trust layers","key"],["Key rotation","Historical verification preserved","refresh"]].map(c=>`<div class="control-item"><div class="ci-icon">${icon(c[2])}</div><div><strong>${c[0]}</strong><small>${c[1]}</small></div>${badge("Active","blue")}</div>`).join("")}</div></div></article>
      <article class="card"><header class="card-header"><div><h3>${state.lang === "ar" ? "الحفظ والمراقبة" : "Preservation & Monitoring"}</h3><p>WORM · audit · alerts · recovery evidence</p></div></header><div class="card-body"><div class="control-grid" style="grid-template-columns:1fr">${[["Immutable vault","Object Lock Compliance Mode","database"],["Audit retention","Tamper-evident event history","link"],["Security monitoring","Platform and application telemetry","activity"],["Recovery readiness","Subject to tested acceptance","refresh"]].map(c=>`<div class="control-item"><div class="ci-icon">${icon(c[2])}</div><div><strong>${c[0]}</strong><small>${c[1]}</small></div>${badge(c[0]==="Recovery readiness"?"Target":"Healthy",c[0]==="Recovery readiness"?"amber":"green")}</div>`).join("")}</div></div></article></section>
      <section class="grid two"><article class="card"><header class="card-header"><div><h3>${state.lang === "ar" ? "مصفوفة السياسات" : "Policy matrix"}</h3><p>${state.lang === "ar" ? "حالة ضوابط بيئة العرض" : "Concept environment control status"}</p></div></header><div class="card-body"><div class="policy-list">${[["Provider cannot open evidence directly","Design control",true],["Plaintext data keys prohibited","Mandatory",true],["Evidence access audited","Mandatory",true],["Retention policy versioning","Enabled",true],["Legal Hold overrides expiry","Enabled",true],["Production acceptance completed","Not represented in demo",false]].map(x=>`<div class="policy-row"><div class="toggle ${x[2]?"on":""}"></div><div><strong>${x[0]}</strong><small>${x[1]}</small></div>${badge(x[2]?"Controlled":"Boundary",x[2]?"green":"amber")}</div>`).join("")}</div></div></article><article class="card"><header class="card-header"><div><h3>${state.lang === "ar" ? "أحداث الأمن الأخيرة" : "Recent security events"}</h3><p>${state.lang === "ar" ? "بيانات محاكاة لإظهار تجربة التشغيل" : "Simulated events illustrating the operating experience"}</p></div></header><div class="card-body"><div class="timeline">${[["Privileged access approved","Time-bound session approved by tenant administrator","Today, 10:22"],["Integrity verification completed","Batch of 1,284 objects verified successfully","Today, 09:58"],["WAF policy review","No critical findings in concept environment","Yesterday, 18:30"],["Key rotation rehearsal","Historical verification path retained","29 Jul 2026"]].map(t=>`<div class="timeline-item"><i class="timeline-dot"></i><strong>${t[0]}</strong><p>${t[1]}</p><time>${t[2]}</time></div>`).join("")}</div></div></article></section>`);
  }

  function architecturePage() {
    return shell(`${pageHead(state.lang === "ar" ? "المعمارية السيادية" : "Sovereign Platform Architecture", state.lang === "ar" ? "طبقات واضحة تفصل تجربة المستخدم وخدمات الأدلة والثقة والتخزين والبنية والحوكمة." : "A layered target architecture separating user experience, evidence control, trust, storage, platform and governance.", `${btn(state.lang === "ar" ? "تنزيل ملخص المعمارية" : "Download architecture brief","download-arch","primary","download")}`)}
      <section class="arch-stack">${D.architecture.map((a,i)=>`<article class="arch-layer"><div class="arch-label">0${i+1} · ${esc(a.layer)}</div><div><h3>${esc(a.title)}</h3><p>${esc(a.detail)}</p></div><div class="component-chips">${a.components.map(c=>`<span class="component-chip">${esc(c)}</span>`).join("")}</div></article>`).join("")}</section>
      <section class="grid three" style="margin-top:16px">${[["RM TraceVault","Product ownership, architecture authority, acceptance and service governance","shield"],["Sovereign Cloud Foundation","Target Saudi-hosted infrastructure, networking, security and storage foundation","globe"],["Application Delivery","Portal, services, integrations, testing and operational handover","code"]].map(x=>`<article class="boundary-card"><header><div class="boundary-icon">${icon(x[2])}</div><div><h3>${x[0]}</h3>${badge("Defined boundary","blue")}</div></header><p>${x[1]}</p></article>`).join("")}</section>
      <div class="public-banner" style="margin-top:16px">${icon("alert")}<span><strong>${state.lang === "ar" ? "حدود العرض:" : "Demo boundary:"}</strong> ${state.lang === "ar" ? "تعرض هذه الصفحة المعمارية المستهدفة ولا تثبت اكتمال التنفيذ أو القبول الإنتاجي." : "This view represents the target architecture and does not claim completed production implementation or acceptance."}</span></div>`);
  }

  function editionsPage() {
    return shell(`${pageHead(state.lang === "ar" ? "إصدارات الخدمة" : "Service Editions", state.lang === "ar" ? "تقسيم مرن للخدمة بحسب مستوى الحفظ والتحقق والعزل والتكاملات والحوكمة." : "A flexible service model differentiated by preservation, verification, isolation, integrations and governance depth.", `${btn(tr("contact"),"contact","primary","mail")}`)}
      <section class="edition-grid">${D.serviceEditions.map(e=>`<article class="edition-card ${e.featured?"featured":""}">${e.featured?`<span class="popular-ribbon">Recommended</span>`:""}<span class="edition-tier">${esc(e.tier)}</span><h3>${esc(e.name)}</h3><p>${esc(e.subtitle)}</p><ul>${e.features.map(f=>`<li>${esc(f)}</li>`).join("")}</ul><button class="btn ${e.featured?"primary":""}" data-action="contact">${icon("mail")}${state.lang === "ar" ? "طلب عرض تعريفي" : "Request a briefing"}</button></article>`).join("")}</section>
      <div class="public-banner" style="margin-top:17px">${icon("info")}<span><strong>${state.lang === "ar" ? "ملاحظة تجارية:" : "Commercial note:"}</strong> ${state.lang === "ar" ? "التسعير والالتزامات النهائية تعتمد على السعة والاحتفاظ والتكاملات والعزل واتفاقية مستوى الخدمة في عقد العميل." : "Final pricing and commitments depend on capacity, retention, integrations, isolation and the executed customer SLA."}</span></div>`);
  }

  function notFoundPage() { return shell(pageHead("Page not found","The requested demo page does not exist.",btn("Return to overview","go-overview","primary","layout-dashboard"))); }

  function render() {
    document.documentElement.lang = state.lang;
    document.documentElement.dir = state.lang === "ar" ? "rtl" : "ltr";
    let content;
    if (state.route.startsWith("evidence/")) {
      const id = state.route.split("/")[1];
      const e = D.evidence.find(x => x.id === id) || state.selectedEvidence;
      state.selectedEvidence = e;
      content = evidenceDetail(e);
    } else {
      const pages = { overview:overviewPage, vault:vaultPage, ingestion:ingestionPage, cases:casesPage, search:searchPage, exports:exportsPage, tenants:tenantsPage, security:securityPage, architecture:architecturePage, editions:editionsPage };
      content = (pages[state.route] || notFoundPage)();
    }
    $("#app").innerHTML = content;
    bindEvents();
    if (!state.welcomeSeen) showWelcome();
  }

  function bindEvents() {
    $$('[data-route]').forEach(a => a.addEventListener("click", () => { state.sidebarOpen = false; }));
    $$('[data-action]').forEach(el => el.addEventListener("click", handleAction));
    $$('[data-evidence]').forEach(el => el.addEventListener("click", ev => { ev.preventDefault(); const id = el.dataset.evidence; state.selectedEvidence = D.evidence.find(x => x.id === id) || D.evidence[0]; location.hash = `#/evidence/${id}`; }));
    const s = $("#vault-search"); if (s) s.addEventListener("input", () => { const q=s.value.toLowerCase(); const filtered=D.evidence.filter(e=>Object.values(e).join(" ").toLowerCase().includes(q)); $("#vault-table").innerHTML=evidenceTable(filtered); bindEvents(); });
  }

  function handleAction(ev) {
    const action = ev.currentTarget.dataset.action;
    if (action === "language") { state.lang = state.lang === "ar" ? "en" : "ar"; localStorage.setItem("tv_lang",state.lang); render(); }
    else if (action === "toggle-menu") { state.sidebarOpen = !state.sidebarOpen; $("#sidebar")?.classList.toggle("open",state.sidebarOpen); }
    else if (action === "tour") showTour();
    else if (action === "go-vault") location.hash="#/vault";
    else if (action === "go-overview") location.hash="#/overview";
    else if (action === "go-exports") location.hash="#/exports";
    else if (action === "simulate-ingestion") showIngestionModal();
    else if (action === "verify-current") simulateVerify();
    else if (action === "build-export") simulateExport();
    else if (action === "contact") showContact();
    else if (["legal-hold","transfer","add-case","new-case","add-user","filters","security-scan","download-arch"].includes(action)) toast(state.lang==="ar"?"تمت محاكاة الإجراء":"Action simulated",state.lang==="ar"?"هذه الوظيفة تفاعلية للعرض فقط.":"This interaction is for demonstration only.");
  }

  function showWelcome() {
    const root=$("#modal-root");
    root.innerHTML=`<div class="welcome"><section class="welcome-panel"><div class="welcome-copy"><img class="welcome-logo" src="assets/logo-wordmark.svg" alt="RM TraceVault"/><span class="welcome-kicker">${state.lang==="ar"?"منصة سعودية سيادية لحفظ الأدلة الرقمية":"Sovereign digital evidence custody platform"}</span><h1>${state.lang==="ar"?"احفظ الدليل. واحفظ الثقة.":D.product.promise}</h1><p>${state.lang==="ar"?"تجربة تفاعلية احترافية توضح كيف يمكن للمنصة استقبال الأدلة، حمايتها، تتبع حيازتها، التحقق منها، وتصديرها ضمن حزمة قابلة للمراجعة.":"An enterprise-grade interactive experience showing how the platform can ingest, protect, trace, verify and export digital evidence within a reviewable technical package."}</p><div class="welcome-points">${[["Immutable Preservation","WORM, retention and versioning"],["Integrity & Verification","SHA-512 and portable verification"],["Chain of Custody","Every action recorded and reviewable"],["Sovereign Architecture","Target Saudi-hosted deployment"]].map(x=>`<div class="welcome-point"><strong>${x[0]}</strong><small>${x[1]}</small></div>`).join("")}</div><div class="welcome-actions"><button class="btn primary" data-welcome="enter">${icon("arrow-right")}${state.lang==="ar"?"دخول الديمو":"Enter the demo"}</button><button class="btn" data-welcome="tour">${icon("play")}${tr("startTour")}</button></div></div><div class="welcome-visual"><div class="mock-window"><div class="mock-top"><i></i><i></i><i></i></div><div class="mock-dashboard"><div class="mock-side"><span class="active"></span><span></span><span></span><span></span><span></span><span></span></div><div class="mock-content"><div class="mock-kpis"><i></i><i></i><i></i></div><div class="mock-panels"><div class="mock-panel"><div class="mock-chart"></div></div><div class="mock-panel mock-list"><span></span><span></span><span></span><span></span></div></div></div></div></div><span class="welcome-note">${tr("simulated")}</span></div></section></div>`;
    $$('[data-welcome]').forEach(b=>b.addEventListener("click",()=>{sessionStorage.setItem("tv_welcome","1");state.welcomeSeen=true;root.innerHTML="";if(b.dataset.welcome==="tour")showTour();}));
  }

  function showTour() {
    const steps = state.lang === "ar" ? [
      ["النظرة التنفيذية","حالة الأدلة والسلامة والتخزين والمصادر."],["إدخال الأدلة","مصادر متعددة ومسار تحقق وتشفير وحفظ."],["سجل الدليل","بصمة وتشفير واحتفاظ وسلسلة حيازة."],["القضايا والبحث","تنظيم المراجعات والوصول المصرح."],["حزمة التحقق","تصدير قابل للمراجعة والتحقق دون اتصال."],["الأمن والمعمارية","ضوابط الثقة والنطاق السيادي المستهدف."]
    ] : [
      ["Executive overview","Evidence, integrity, storage and source health."],["Secure ingestion","Multiple sources through a governed acquisition flow."],["Evidence record","Integrity, encryption, retention and custody history."],["Cases & search","Authorized review and investigation context."],["Verification package","Portable technical export and offline verification."],["Security & architecture","Trust controls and target sovereign deployment."]
    ];
    const root=$("#modal-root"); root.innerHTML=`<div class="modal-backdrop"><div class="modal"><header class="modal-header"><h3>${tr("startTour")}</h3><button class="close-btn" data-modal-close>${icon("x")}</button></header><div class="modal-body"><div class="tour-steps">${steps.map((s,i)=>`<article class="tour-step ${i===state.tourStep?"active":""}"><span>0${i+1}</span><strong>${s[0]}</strong><p>${s[1]}</p></article>`).join("")}</div><div style="margin-top:18px"><div class="progress-bar"><span style="width:${((state.tourStep+1)/steps.length)*100}%"></span></div><div style="display:flex;justify-content:space-between;gap:10px;margin-top:14px"><button class="btn" data-tour-back ${state.tourStep===0?"disabled":""}>${icon("arrow-right")} ${tr("back")}</button><button class="btn primary" data-tour-next>${state.tourStep===steps.length-1?tr("complete"):tr("next")} ${icon("arrow-right")}</button></div></div></div></div></div>`;
    $('[data-modal-close]')?.addEventListener("click",()=>root.innerHTML="");
    $('[data-tour-back]')?.addEventListener("click",()=>{state.tourStep=Math.max(0,state.tourStep-1);showTour();});
    $('[data-tour-next]')?.addEventListener("click",()=>{if(state.tourStep>=steps.length-1){state.tourStep=0;root.innerHTML="";}else{state.tourStep++;showTour();}});
  }

  function showIngestionModal() {
    const root=$("#modal-root"); const stages=["Source validation","Metadata capture","Chunk encryption","SHA-512 verification","Immutable commit"];
    root.innerHTML=`<div class="modal-backdrop"><div class="modal"><header class="modal-header"><h3>${state.lang==="ar"?"محاكاة إدخال دليل":"Evidence ingestion simulation"}</h3><button class="close-btn" data-modal-close>${icon("x")}</button></header><div class="modal-body"><p style="color:var(--ink-600);font-size:13px">${state.lang==="ar"?"لا يتم رفع أي ملف فعلي. توضح هذه المحاكاة مراحل المعالجة المستهدفة فقط.":"No file is uploaded. This simulation illustrates the target processing stages only."}</p><div class="progress-bar" style="margin:17px 0"><span id="ingest-progress" style="width:0%"></span></div><div class="policy-list" id="ingest-stages">${stages.map((s,i)=>`<div class="policy-row" data-stage="${i}"><div class="ci-icon" style="width:42px;height:42px">${icon(i===2?"key":i===3?"fingerprint":i===4?"lock":"document")}</div><div><strong>${s}</strong><small>Waiting</small></div>${badge("Pending","gray")}</div>`).join("")}</div><button class="btn primary" id="start-ingestion" style="width:100%;margin-top:14px">${icon("play")}${state.lang==="ar"?"بدء المحاكاة":"Start simulation"}</button></div></div></div>`;
    $('[data-modal-close]')?.addEventListener("click",()=>root.innerHTML="");
    $('#start-ingestion')?.addEventListener("click",async e=>{e.currentTarget.disabled=true;for(let i=0;i<stages.length;i++){await wait(600);const row=$(`[data-stage="${i}"]`);row.querySelector('small').textContent='Complete';row.querySelector('.status-chip').className='status-chip green';row.querySelector('.status-chip').textContent='Passed';$('#ingest-progress').style.width=`${((i+1)/stages.length)*100}%`; } toast(state.lang==="ar"?"اكتملت المحاكاة":"Simulation complete",state.lang==="ar"?"تم تمثيل مسار الإدخال والحفظ بنجاح.":"The secure ingestion flow completed successfully.");});
  }

  function simulateVerify() {
    const root=$("#modal-root"); root.innerHTML=`<div class="modal-backdrop"><div class="modal"><header class="modal-header"><h3>${state.lang==="ar"?"التحقق من سلامة الدليل":"Evidence integrity verification"}</h3><button class="close-btn" data-modal-close>${icon("x")}</button></header><div class="modal-body"><div class="security-hero" style="margin:0"><div><h2>${state.lang==="ar"?"إعادة حساب البصمة ومقارنتها":"Recomputing and comparing fingerprint"}</h2><p>${state.lang==="ar"?"يتم تمثيل مسار التحقق فقط. لا توجد معالجة تشفيرية حقيقية داخل الديمو.":"This represents the verification workflow only; no real cryptographic operation is performed in the demo."}</p></div><div class="security-score" id="verify-score"><strong>0%</strong><small>Progress</small></div></div><div class="progress-bar" style="margin:18px 0"><span id="verify-progress" style="width:0%"></span></div><div id="verify-result"></div></div></div></div>`;
    $('[data-modal-close]')?.addEventListener("click",()=>root.innerHTML="");
    let p=0;const timer=setInterval(()=>{p+=10;$('#verify-progress').style.width=`${p}%`;$('#verify-score strong').textContent=`${p}%`;if(p>=100){clearInterval(timer);$('#verify-result').innerHTML=`<div class="public-banner" style="margin:0">${icon("shield-check")}<span><strong>${state.lang==="ar"?"تم التحقق بنجاح":"Verification passed"}</strong><br>${state.lang==="ar"?"تطابقت البصمة مع القيمة المسجلة في سجل الدليل.":"The recomputed fingerprint matches the registered evidence digest."}</span><span class="spacer"></span>${badge("MATCH","green")}</div>`;}},180);
  }

  function simulateExport() { toast(state.lang==="ar"?"تم إنشاء حزمة تجريبية":"Demo package generated",state.lang==="ar"?"تمت محاكاة إنشاء الحزمة وسجل التحقق.":"Package creation and verification records were simulated."); }
  function showContact() { const root=$("#modal-root"); root.innerHTML=`<div class="modal-backdrop"><div class="modal" style="max-width:620px"><header class="modal-header"><h3>${tr("contact")}</h3><button class="close-btn" data-modal-close>${icon("x")}</button></header><div class="modal-body"><img src="assets/logo-wordmark.svg" alt="RM TraceVault" style="width:360px;margin-bottom:18px"><p style="color:var(--ink-600);font-size:13px;line-height:1.7">${state.lang==="ar"?"لترتيب جلسة تعريفية أو مناقشة حالة استخدام، تواصل مع فريق RM TraceVault عبر القنوات الرسمية.":"To arrange a product briefing or discuss a use case, contact RM TraceVault through the official channels."}</p><div class="grid two"><div class="meta-item"><span>Email</span><strong>${esc(D.product.email)}</strong></div><div class="meta-item"><span>Website</span><strong>${esc(D.product.website)}</strong></div><div class="meta-item"><span>Location</span><strong>${esc(D.product.location)}</strong></div><div class="meta-item"><span>Environment</span><strong>Concept Demo</strong></div></div></div></div></div>`;$('[data-modal-close]')?.addEventListener("click",()=>root.innerHTML=""); }
  function toast(title,message){const root=$("#toast-root");const el=document.createElement('div');el.className='toast';el.innerHTML=`<strong>${esc(title)}</strong><small>${esc(message)}</small>`;root.appendChild(el);setTimeout(()=>el.remove(),3500);}
  function wait(ms){return new Promise(r=>setTimeout(r,ms));}

  window.addEventListener("hashchange",()=>{state.route=location.hash.replace(/^#\/?/,"")||"overview";state.sidebarOpen=false;render();window.scrollTo({top:0,behavior:"smooth"});});
  window.addEventListener("keydown",e=>{if(e.key==="Escape")$("#modal-root").innerHTML="";});
  render();
})();
