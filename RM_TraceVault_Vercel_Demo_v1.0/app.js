(() => {
  "use strict";

  const D = window.TRACEVAULT_DATA;
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];

  const state = {
    lang: localStorage.getItem("tv_lang") || "en",
    tenantId: localStorage.getItem("tv_tenant") || "alsafa",
    notificationOpen: false,
    sidebarOpen: false,
    presentation: localStorage.getItem("tv_presentation") === "1",
    evidenceQuery: "",
    evidenceType: "All",
    selectedEvidence: new Set(D.evidence.slice(0, 5).map((e) => e.id)),
    activeCaseId: "CASE-2026-0421",
    activePlanId: "professional",
    tourOpen: false,
    tourStep: 0,
    uploadInProgress: false,
  };

  const tr = (en, ar) => (state.lang === "ar" ? ar : en);
  const fmt = (n) => new Intl.NumberFormat(state.lang === "ar" ? "ar-SA" : "en-US", { maximumFractionDigits: 2 }).format(n);
  const sar = (n) => `${fmt(n)} ${tr("SAR", "ر.س")}`;
  const initials = (name) => name.split(/\s+/).slice(0, 2).map((x) => x[0]).join("").toUpperCase();
  const currentTenant = () => D.tenants.find((x) => x.id === state.tenantId) || D.tenants[0];
  const currentRoute = () => (location.hash.replace(/^#\/?/, "") || "overview");
  const routeRoot = () => currentRoute().split("/")[0];

  const icons = {
    dashboard:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
    vault:'<path d="M4 7h16v13H4z"/><path d="M7 7V4h10v3"/><circle cx="12" cy="13" r="2"/><path d="M12 15v2"/>',
    upload:'<path d="M12 16V4"/><path d="m7 9 5-5 5 5"/><path d="M5 14H4a2 2 0 0 0-2 2v4h20v-4a2 2 0 0 0-2-2h-1"/>',
    cases:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V4h8v3"/><path d="M3 12h18"/>',
    search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    export:'<path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M4 18v3h16v-3"/>',
    users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    shield:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>',
    billing:'<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/><path d="M6 15h4"/>',
    settings:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1.1V21h-4v-.09A1.7 1.7 0 0 0 8.6 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1 1.7 1.7 0 0 0-1.1-.4H3v-4h.09A1.7 1.7 0 0 0 4.6 8.6a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6 1.7 1.7 0 0 0 .4-1.1V3h4v.09A1.7 1.7 0 0 0 15.4 4.6a1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.4 9c.34.3.55.7.6 1.1V10h1v4h-.09A1.7 1.7 0 0 0 19.4 15Z"/>',
    architecture:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="8.5" y="14" width="7" height="7" rx="1"/><path d="M6.5 10v2h11v-2M12 12v2"/>',
    bell:'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>',
    help:'<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 1 1 5.83 1c0 2-3 2-3 4"/><path d="M12 18h.01"/>',
    chevron:'<path d="m9 18 6-6-6-6"/>',
    down:'<path d="m6 9 6 6 6-6"/>',
    menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',
    close:'<path d="m18 6-12 12M6 6l12 12"/>',
    check:'<path d="m20 6-11 11-5-5"/>',
    info:'<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
    folder:'<path d="M3 5h6l2 2h10v12H3z"/>',
    database:'<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/>',
    briefcase:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V4h8v3"/>',
    gavel:'<path d="m14 4 6 6-3 3-6-6z"/><path d="m7 8 6 6-3 3-6-6z"/><path d="m12 12-8 8"/><path d="M14 20h7"/>',
    camera:'<path d="M14 5 12 3H7L5 5H3v14h18V5z"/><circle cx="12" cy="12" r="4"/>',
    file:'<path d="M6 2h8l4 4v16H6z"/><path d="M14 2v5h5"/>',
    mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    code:'<path d="m8 9-4 3 4 3M16 9l4 3-4 3M14 5l-4 14"/>',
    lock:'<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
    key:'<circle cx="8" cy="15" r="4"/><path d="m11 12 9-9M17 6l3 3M14 9l3 3"/>',
    hash:'<path d="M5 9h14M4 15h14M10 3 8 21M16 3l-2 18"/>',
    clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    eye:'<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
    copy:'<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M15 9V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h4"/>',
    transfer:'<path d="M17 3l4 4-4 4M3 7h18M7 21l-4-4 4-4M21 17H3"/>',
    plus:'<path d="M12 5v14M5 12h14"/>',
    link:'<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
    filter:'<path d="M4 5h16l-6 7v5l-4 2v-7z"/>',
    calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',
    edit:'<path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4z"/>',
    alert:'<path d="M10.3 3.6 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.6a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4M12 17h.01"/>',
    chart:'<path d="M3 3v18h18"/><path d="m7 16 4-5 4 3 5-7"/>',
    layers:'<path d="m12 2 9 5-9 5-9-5z"/><path d="m3 12 9 5 9-5M3 17l9 5 9-5"/>',
    globe:'<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/>',
    play:'<polygon points="5 3 19 12 5 21 5 3"/>',
    moon:'<path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z"/>',
    presentation:'<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21l4-4 4 4M12 17v4"/>',
    refresh:'<path d="M20 6v5h-5M4 18v-5h5"/><path d="M6.1 9a7 7 0 0 1 11.2-2.7L20 11M4 13l2.7 4.7A7 7 0 0 0 18 15"/>',
  };

  const icon = (name, cls = "") => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || icons.info}</svg>`;

  const navItems = [
    ["overview", "dashboard", "Overview", "نظرة عامة"],
    ["evidence", "vault", "Evidence Vault", "خزنة الأدلة"],
    ["ingestion", "upload", "Ingestion", "الإدخال والربط"],
    ["cases", "cases", "Cases", "القضايا"],
    ["search", "search", "Search", "البحث"],
    ["exports", "export", "Exports", "التصدير"],
    ["tenants", "users", "Tenants", "المؤسسات"],
    ["security", "shield", "Security", "الأمن"],
    ["billing", "billing", "Billing & Packages", "الفوترة والباقات"],
    ["architecture", "architecture", "Architecture", "المعمارية"],
    ["settings", "settings", "Settings", "الإعدادات"],
  ];

  const navLabel = (id) => {
    const item = navItems.find((x) => x[0] === id);
    return item ? tr(item[2], item[3]) : id;
  };

  function pageHeader(titleEn, titleAr, subtitleEn, subtitleAr, actions = "", breadcrumbs = "") {
    return `${breadcrumbs ? `<div class="breadcrumbs">${breadcrumbs}</div>` : ""}
      <div class="page-head">
        <div><h1 class="page-title">${tr(titleEn, titleAr)}</h1><p class="page-subtitle">${tr(subtitleEn, subtitleAr)}</p></div>
        <div class="page-actions">${actions}</div>
      </div>`;
  }

  function demoBanner() {
    return `<div class="demo-banner">
      <div><strong>${tr("Interactive Proof-of-Concept", "إثبات مفهوم تفاعلي")}</strong> — ${tr("All data and system states are simulated for demonstration. This is not a production evidence system.", "جميع البيانات وحالات النظام محاكاة لأغراض العرض، وليست منصة أدلة إنتاجية.")}</div>
      <span class="demo-pill"><span class="pulse"></span>${tr("Simulated Data", "بيانات محاكاة")}</span>
    </div>`;
  }

  function renderShell(pageHtml) {
    const tenant = currentTenant();
    document.documentElement.lang = state.lang;
    document.documentElement.dir = state.lang === "ar" ? "rtl" : "ltr";
    document.body.classList.toggle("presentation-mode", state.presentation);
    const active = routeRoot();

    $("#app").innerHTML = `<div class="app-shell">
      <aside class="sidebar ${state.sidebarOpen ? "open" : ""}">
        <a class="brand" href="#overview" aria-label="RM TraceVault">
          <img src="assets/logo.svg" alt="" />
          <span class="brand-copy"><span class="brand-name">RM <span>TraceVault</span></span><span class="brand-tagline">${D.product.tagline}</span></span>
        </a>
        <nav class="nav" aria-label="Primary">
          ${navItems.map(([id, ic, en, ar]) => `<a class="nav-item ${active === id ? "active" : ""}" href="#${id}" data-nav="${id}">${icon(ic)}<span>${tr(en, ar)}</span></a>`).join("")}
        </nav>
        <div class="sidebar-footer">
          <div class="sovereign-card">
            <div class="sovereign-head"><img src="assets/logo.svg" alt=""/><span>${tr("Saudi Sovereign Design", "تصميم سيادي سعودي")}</span></div>
            <div class="sovereign-meta">${tr("Target deployment: KSA", "الاستضافة المستهدفة: المملكة")}<br>${tr("Multi-tenant by design", "متعدد المؤسسات بتصميم معزول")}</div>
            <a class="sovereign-link" href="#architecture">${tr("View architecture", "عرض المعمارية")} →</a>
          </div>
          <div class="sidebar-copyright"><span>© 2026 RM TraceVault<br>${tr("All rights reserved.", "جميع الحقوق محفوظة.")}</span>${icon("chevron")}</div>
        </div>
      </aside>
      <header class="topbar">
        <div class="topbar-left">
          <button class="top-icon mobile-menu" data-action="toggle-sidebar" aria-label="Menu">${icon("menu")}</button>
          <button class="tenant-switcher" data-action="tenant-switcher">
            ${icon("architecture")}<span class="tenant-name">${tenant.name}</span><span class="plan">${tenant.plan}</span><span class="spacer"></span>${icon("down")}
          </button>
        </div>
        <div class="topbar-right">
          <button class="language-toggle" data-action="language">${state.lang === "ar" ? "EN" : "عربي"}</button>
          <div class="dropdown">
            <button class="top-icon" data-action="notifications" aria-label="Notifications">${icon("bell")}<span class="notif-dot">${D.notifications.length}</span></button>
            ${state.notificationOpen ? renderNotificationMenu() : ""}
          </div>
          <button class="top-icon help" data-action="help" aria-label="Help">${icon("help")}</button>
          <div class="profile"><span class="avatar">MA</span><span class="profile-copy"><span class="profile-name">Mohammed Alharthi</span><span class="profile-role">Founder / Demo Admin</span></span>${icon("down")}</div>
        </div>
      </header>
      <main class="main"><div class="content">${demoBanner()}${pageHtml}</div></main>
      <button class="btn btn-dark btn-sm presentation-toggle" data-action="presentation">${icon("presentation")} ${state.presentation ? tr("Exit presentation", "إنهاء العرض") : tr("Presentation mode", "وضع العرض")}</button>
      <button class="tour-launcher" data-action="tour">${icon("play")} ${tr("Investor Tour", "جولة المستثمر")}</button>
      ${state.tourOpen ? renderTourPanel() : ""}
    </div>`;

    attachGlobalEvents();
  }

  function renderNotificationMenu() {
    return `<div class="dropdown-menu">
      <div class="dropdown-head">${tr("Notifications", "الإشعارات")}</div>
      ${D.notifications.map((n) => `<div class="dropdown-item"><b>${n.title}</b><span>${n.text} · ${n.time}</span></div>`).join("")}
      <div class="dropdown-foot">${tr("View all activity", "عرض كل الأنشطة")}</div>
    </div>`;
  }

  const tourSteps = [
    { route: "overview", title: ["Executive overview", "النظرة التنفيذية"], text: ["Start with the trust dashboard: evidence, integrity, legal holds, storage, sources and sovereign-design status.", "ابدأ بلوحة الثقة التي تعرض الأدلة والسلامة والحجز القانوني والتخزين والمصادر والتصميم السيادي."] },
    { route: "ingestion", title: ["Secure evidence intake", "الإدخال الآمن للأدلة"], text: ["Show how evidence moves through validation, encryption, immutable commit and verification from multiple sources.", "اعرض انتقال الدليل من التحقق والتشفير إلى الحفظ غير القابل للتعديل والتحقق النهائي من عدة مصادر."] },
    { route: "evidence/EV-2026-005678", title: ["Evidence trust record", "سجل الثقة بالدليل"], text: ["Demonstrate the fingerprint, retention, immutable status, permissions and complete chain of custody for one evidence record.", "استعرض البصمة والاحتفاظ وحالة عدم التعديل والصلاحيات وسلسلة الحيازة الكاملة لدليل واحد."] },
    { route: "cases", title: ["Investigation workspace", "مساحة التحقيق"], text: ["Show search, collaboration, case governance and optional governed AI analysis without changing original evidence.", "اعرض البحث والتعاون وحوكمة القضية والتحليل الاختياري بالذكاء الاصطناعي دون تعديل الدليل الأصلي."] },
    { route: "exports", title: ["Independent verification package", "حزمة التحقق المستقل"], text: ["Build a technical export with manifest, hashes, custody history and an offline verification workflow.", "أنشئ حزمة فنية تضم البيان والبصمات وسجل الحيازة وخطوات تحقق دون اتصال."] },
    { route: "architecture", title: ["Architecture and delivery boundaries", "المعمارية وحدود التنفيذ"], text: ["Close with the sovereign architecture, PoC-proven controls, production gaps and clear responsibility boundaries.", "اختم بالمعمارية السيادية والضوابط المثبتة في إثبات المفهوم والفجوات الإنتاجية وحدود المسؤوليات."] },
  ];

  function renderTourPanel() {
    const step = tourSteps[state.tourStep];
    return `<div class="tour-panel">
      <div class="tour-head"><b>${tr("RM TraceVault Investor Walkthrough", "جولة RM TraceVault للمستثمر")}</b><span>${tr("A six-step narrative through the product value.", "مسار من ست خطوات لشرح قيمة المنتج.")}</span></div>
      <div class="tour-body"><div class="tour-step-label">${tr("Step", "الخطوة")} ${state.tourStep + 1} / ${tourSteps.length}</div><div class="tour-title">${tr(step.title[0], step.title[1])}</div><div class="tour-text">${tr(step.text[0], step.text[1])}</div><div class="tour-progress">${tourSteps.map((_, i) => `<span class="${i <= state.tourStep ? "active" : ""}"></span>`).join("")}</div></div>
      <div class="tour-actions"><button class="btn btn-ghost btn-sm" data-action="tour-close">${tr("Close", "إغلاق")}</button><div class="button-row"><button class="btn btn-sm" data-action="tour-prev" ${state.tourStep === 0 ? "disabled" : ""}>${tr("Back", "السابق")}</button><button class="btn btn-primary btn-sm" data-action="tour-next">${state.tourStep === tourSteps.length - 1 ? tr("Finish", "إنهاء") : tr("Next", "التالي")}</button></div></div>
    </div>`;
  }

  function toast(title, text = "", tone = "success") {
    const root = $("#toast-root");
    const node = document.createElement("div");
    node.className = `toast ${tone}`;
    node.innerHTML = `<span class="toast-icon">${icon(tone === "danger" ? "alert" : tone === "warning" ? "info" : "check")}</span><span><b>${title}</b>${text ? `<span>${text}</span>` : ""}</span>`;
    root.appendChild(node);
    setTimeout(() => node.remove(), 4200);
  }

  function showModal({ title, subtitle = "", body = "", footer = "", size = "" }) {
    $("#modal-root").innerHTML = `<div class="modal-backdrop" data-action="modal-backdrop"><section class="modal ${size}"><header class="modal-header"><div><h3>${title}</h3>${subtitle ? `<p>${subtitle}</p>` : ""}</div><button class="modal-close" data-action="modal-close">${icon("close")}</button></header><div class="modal-body">${body}</div>${footer ? `<footer class="modal-footer">${footer}</footer>` : ""}</section></div>`;
    $$('[data-action="modal-close"], [data-action="modal-backdrop"]').forEach((el) => el.addEventListener("click", (e) => {
      if (e.currentTarget.dataset.action === "modal-backdrop" && e.target !== e.currentTarget) return;
      closeModal();
    }));
  }
  function closeModal() { $("#modal-root").innerHTML = ""; }

  function attachGlobalEvents() {
    $('[data-action="toggle-sidebar"]')?.addEventListener("click", () => { state.sidebarOpen = !state.sidebarOpen; render(); });
    $('[data-action="language"]')?.addEventListener("click", () => { state.lang = state.lang === "ar" ? "en" : "ar"; localStorage.setItem("tv_lang", state.lang); render(); });
    $('[data-action="notifications"]')?.addEventListener("click", () => { state.notificationOpen = !state.notificationOpen; render(); });
    $('[data-action="tenant-switcher"]')?.addEventListener("click", openTenantSwitcher);
    $('[data-action="help"]')?.addEventListener("click", () => toast(tr("Demo help", "مساعدة الديمو"), tr("Use the Investor Tour button for a guided presentation.", "استخدم زر جولة المستثمر لعرض موجه."), "warning"));
    $('[data-action="presentation"]')?.addEventListener("click", () => { state.presentation = !state.presentation; localStorage.setItem("tv_presentation", state.presentation ? "1" : "0"); render(); });
    $('[data-action="tour"]')?.addEventListener("click", () => { state.tourOpen = !state.tourOpen; render(); });
    $('[data-action="tour-close"]')?.addEventListener("click", () => { state.tourOpen = false; render(); });
    $('[data-action="tour-prev"]')?.addEventListener("click", () => { if (state.tourStep > 0) { state.tourStep--; location.hash = tourSteps[state.tourStep].route; } else render(); });
    $('[data-action="tour-next"]')?.addEventListener("click", () => {
      if (state.tourStep < tourSteps.length - 1) { state.tourStep++; location.hash = tourSteps[state.tourStep].route; }
      else { state.tourOpen = false; state.tourStep = 0; render(); }
    });
    $$('.nav-item').forEach((el) => el.addEventListener("click", () => { state.sidebarOpen = false; }));
  }

  function openTenantSwitcher() {
    showModal({
      title: tr("Switch demo tenant", "تغيير المؤسسة التجريبية"),
      subtitle: tr("Switching changes dashboard context and package data only.", "التغيير يبدل سياق اللوحة والباقة فقط."),
      body: `<div class="grid grid-3">${D.tenants.map((x) => `<button class="tenant-plan ${x.id === state.tenantId ? "active" : ""}" data-tenant="${x.id}"><div class="tenant-plan-head"><span class="tenant-plan-icon">${icon("architecture")}</span><div><h4>${x.name}</h4><span class="badge badge-blue">${x.plan}</span></div></div><div class="tenant-plan-grid"><span>${tr("Storage", "التخزين")}<b>${x.storage} TB</b></span><span>${tr("Users", "المستخدمون")}<b>${x.users}</b></span><span>${tr("Cases", "القضايا")}<b>${x.cases}</b></span></div></button>`).join("")}</div>`,
    });
    $$('[data-tenant]').forEach((el) => el.addEventListener("click", () => {
      state.tenantId = el.dataset.tenant;
      localStorage.setItem("tv_tenant", state.tenantId);
      closeModal();
      render();
      toast(tr("Tenant context changed", "تم تغيير المؤسسة"), currentTenant().name);
    }));
  }

  function sparkPath(seed = 0) {
    const sets = [
      [16,15,13,14,10,12,8,9,7,8,5,6],
      [17,16,15,12,13,11,10,8,9,6,7,4],
      [18,16,17,14,12,13,9,10,7,8,6,5],
      [17,17,15,16,12,11,13,9,8,10,6,4],
      [16,14,15,12,11,9,10,8,6,7,5,3],
    ];
    const arr = sets[seed % sets.length];
    return `<svg class="spark" viewBox="0 0 66 20"><path d="M0 19H66" stroke="#edf1f6"/><polyline points="${arr.map((y, i) => `${i * 6},${y}`).join(" ")}" fill="none" stroke="#1eb377" stroke-width="1.7"/><polyline points="${arr.map((y, i) => `${i * 6},${y}`).join(" ")} 66,20 0,20" fill="rgba(30,179,119,.08)" stroke="none"/></svg>`;
  }

  function renderOverview() {
    const tenant = currentTenant();
    const actions = `<button class="btn" data-action="date-range">${icon("calendar")} ${tr("Last 7 days", "آخر 7 أيام")} ${icon("down")}</button><button class="btn icon-btn" data-action="refresh">${icon("refresh")}</button>`;
    return `${pageHeader("Overview Dashboard", "لوحة النظرة العامة", "Real-time concept view of your digital evidence trust environment.", "عرض تصوري لحظي لبيئة الثقة بالأدلة الرقمية.", actions)}
      <section class="kpi-grid">
        ${kpi("folder", "green", tr("Total Evidence", "إجمالي الأدلة"), tenant.evidence > 1000000 ? `${(tenant.evidence/1000000).toFixed(2)}M` : fmt(tenant.evidence), "+12.4%")}
        ${kpi("briefcase", "purple", tr("Active Cases", "القضايا النشطة"), fmt(tenant.cases), "+8.7%")}
        ${kpi("database", "blue", tr("Storage Used", "التخزين المستخدم"), `${tenant.storage} TB`, `${Math.round((tenant.storage/tenant.allowance)*100)}%`, Math.min(100,(tenant.storage/tenant.allowance)*100))}
        ${kpi("shield", "green", tr("Verified Integrity", "سلامة الأدلة"), "99.98%", "+0.02%")}
        ${kpi("gavel", "orange", tr("Legal Holds", "الحجوزات القانونية"), "27", "+3")}
        ${kpi("export", "teal", tr("Export Requests", "طلبات التصدير"), "18", "+5")}
      </section>

      <section class="grid grid-3 section-gap">
        <article class="card">
          <div class="card-header"><div><div class="card-title">${tr("Storage Breakdown", "توزيع التخزين")}</div><div class="card-subtitle">${tr("Evidence capacity by source category", "السعة حسب مصدر الأدلة")}</div></div><a class="card-link" href="#billing">${tr("View details", "عرض التفاصيل")} →</a></div>
          <div class="donut-wrap"><div class="donut"><div class="donut-center">${tenant.storage} TB<small>${tr("Total used", "إجمالي المستخدم")}</small></div></div><div class="legend">
            ${legendRow("#0e8b82", tr("Video (CCTV)", "فيديو الكاميرات"), "20.14 TB", "47.0%")}
            ${legendRow("#195fc4", tr("Files", "الملفات"), "9.36 TB", "21.9%")}
            ${legendRow("#7086ee", tr("Email / M365", "البريد / M365"), "6.18 TB", "14.4%")}
            ${legendRow("#e6a12b", tr("Logs / SIEM", "السجلات / SIEM"), "4.02 TB", "9.4%")}
            ${legendRow("#7ccfb6", tr("Other", "أخرى"), "3.11 TB", "7.3%")}
          </div></div>
          <div class="card-footer"><span>${icon("database")} ${tr("Capacity", "السعة")}: ${tenant.allowance} TB</span><b>${(tenant.allowance-tenant.storage).toFixed(2)} TB ${tr("available", "متاحة")}</b></div>
        </article>

        <article class="card">
          <div class="card-header"><div><div class="card-title">${tr("Evidence Sources", "مصادر الأدلة")}</div><div class="card-subtitle">${tr("Ingested in the last seven days", "المدخل خلال آخر سبعة أيام")}</div></div><a class="card-link" href="#ingestion">${tr("All sources", "كل المصادر")} →</a></div>
          <div class="source-list">
            ${sourceRow("camera", "CCTV", "3.72M", "+15.6%", 0)}
            ${sourceRow("file", tr("Files", "الملفات"), "2.41M", "+9.3%", 1)}
            ${sourceRow("mail", "Microsoft 365", "1.89M", "+11.2%", 2)}
            ${sourceRow("shield", "Logs / SIEM", "0.52M", "+18.7%", 3)}
            ${sourceRow("code", "API", "0.22M", "+7.1%", 4)}
          </div>
        </article>

        <article class="card">
          <div class="card-header"><div><div class="card-title">${tr("Trust & Platform Status", "حالة الثقة والمنصة")}</div><div class="card-subtitle">${tr("Concept controls and target capabilities", "الضوابط والقدرات المستهدفة")}</div></div><a class="card-link" href="#security">${tr("Security center", "مركز الأمن")} →</a></div>
          <div class="status-grid">
            ${statusTile("WORM", tr("Immutable storage", "تخزين غير قابل للتعديل"))}
            ${statusTile("AES-256-GCM", tr("Encryption", "التشفير"))}
            ${statusTile("SHA-512", tr("Integrity", "السلامة"))}
            ${statusTile(tr("Chain of Custody", "سلسلة الحيازة"), tr("End-to-end", "من البداية للنهاية"))}
            ${statusTile("RBAC + MFA", tr("Access control", "التحكم بالوصول"))}
            ${statusTile("SSO", "SAML / OIDC")}
            ${statusTile(tr("Retention", "الاحتفاظ"), tr("Policy controlled", "محكوم بالسياسة"))}
            ${statusTile(tr("Technical Export", "التصدير الفني"), tr("Offline-verifiable", "قابل للتحقق دون اتصال"))}
            ${statusTile(tr("Target Region", "المنطقة المستهدفة"), tr("Saudi Arabia", "السعودية"))}
          </div>
        </article>
      </section>

      <section class="grid grid-2 section-gap">
        <article class="card">
          <div class="card-header"><div><div class="card-title">${tr("Recent Activity", "النشاط الأخير")}</div><div class="card-subtitle">${tr("Evidence lifecycle and custody events", "أحداث دورة حياة الدليل والحيازة")}</div></div><a class="card-link" href="#search">${tr("View all", "عرض الكل")} →</a></div>
          <div class="timeline">${D.recentActivity.map(activityRow).join("")}</div>
        </article>
        <article class="card">
          <div class="card-header"><div><div class="card-title">${tr("Sovereign by Design", "سيادي بالتصميم")}</div><div class="card-subtitle">${tr("Target architecture and operating principles", "المعمارية ومبادئ التشغيل المستهدفة")}</div></div></div>
          <div class="sovereign-panel"><div class="map-box"><span class="map-label">${icon("shield")}</span><span class="map-caption">${tr("Target deployment: Riyadh, KSA", "الاستضافة المستهدفة: الرياض")}</span></div><div class="sovereign-list">
            ${sovereignItem(tr("Saudi data-residency target", "استهداف إقامة البيانات داخل السعودية"))}
            ${sovereignItem(tr("Multi-tenant isolation model", "نموذج عزل متعدد المؤسسات"))}
            ${sovereignItem(tr("Provider-cannot-decrypt design objective", "هدف تصميم يمنع المزود من فك التشفير"))}
            ${sovereignItem(tr("Continuous monitoring and auditability", "مراقبة مستمرة وقابلية للتدقيق"))}
            ${sovereignItem(tr("Independent technical verification", "تحقق فني مستقل"))}
          </div></div>
        </article>
      </section>

      <section class="card section-gap">
        <div class="card-header"><div><div class="card-title">${tr("Deployment Packages", "باقات المنصة")}</div><div class="card-subtitle">${tr("Flexible offerings for security, compliance and scale", "باقات مرنة للأمن والامتثال والتوسع")}</div></div><a class="card-link" href="#billing">${tr("Compare packages", "مقارنة الباقات")} →</a></div>
        <div class="package-strip">${D.packages.map((p, i) => packageMini(p, i)).join("")}</div>
      </section>`;
  }

  function kpi(ic, tone, label, value, trend, progress = null) {
    return `<article class="kpi"><span class="kpi-icon ${tone}">${icon(ic)}</span><div class="kpi-copy"><div class="kpi-label">${label} ${icon("info")}</div><div class="kpi-value">${value}</div><div class="kpi-trend">↑ ${trend} ${tr("vs last 7 days", "مقارنة بآخر 7 أيام")}</div>${progress !== null ? `<div class="progress"><span style="width:${progress}%"></span></div>` : ""}</div></article>`;
  }
  function legendRow(color, name, value, percent) { return `<div class="legend-row"><span class="legend-dot" style="background:${color}"></span><span>${name}</span><span class="legend-value">${value}</span><span class="legend-percent">${percent}</span></div>`; }
  function sourceRow(ic, name, count, growth, seed) { return `<div class="source-row"><span class="source-icon">${icon(ic)}</span><span class="source-name">${name}</span><span class="source-count">${count}</span><span class="source-growth">↑ ${growth}</span>${sparkPath(seed)}</div>`; }
  function statusTile(name, meta) { return `<div class="status-tile"><span class="status-check">${icon("check")}</span><span><div class="status-name">${name}</div><div class="status-meta">${meta}</div></span></div>`; }
  function activityRow(a) { return `<div class="timeline-row"><span class="timeline-time">${a.time}</span><span class="timeline-icon ${a.tone}">${icon(a.event.includes("Hash") ? "hash" : a.event.includes("Legal") ? "gavel" : a.event.includes("Custody") ? "transfer" : a.event.includes("Export") || a.event.includes("package") ? "export" : "upload")}</span><span class="timeline-event">${a.event}</span><span class="timeline-detail">${a.detail}</span><span class="timeline-badge">${a.badge}</span></div>`; }
  function sovereignItem(text) { return `<div class="sovereign-item">${icon("shield")}<span>${text}</span></div>`; }
  function packageMini(p, i) { const tones=["","purple","blue","dark"]; return `<article class="package-mini"><div class="package-mini-head"><span class="package-mini-icon ${tones[i]}">${icon(i===3?"architecture":i===2?"shield":i===1?"chart":"layers")}</span><div><h4>${p.short}</h4><p>${p.description}</p></div></div><a href="#billing">${tr("View package", "عرض الباقة")} →</a>${p.popular?`<span class="popular">${tr("Most popular", "الأكثر طلبًا")}</span>`:""}</article>`; }

  function renderEvidenceVault() {
    const filtered = D.evidence.filter((e) => {
      const q = state.evidenceQuery.toLowerCase();
      const matchesQ = !q || [e.id,e.title,e.source,e.caseId,e.caseName,...e.tags].join(" ").toLowerCase().includes(q);
      const matchesType = state.evidenceType === "All" || e.type === state.evidenceType;
      return matchesQ && matchesType;
    });
    const actions = `<button class="btn" data-action="verify-batch">${icon("shield")} ${tr("Verify batch", "التحقق من دفعة")}</button><button class="btn btn-primary" data-action="new-ingestion">${icon("plus")} ${tr("Add evidence", "إضافة دليل")}</button>`;
    return `${pageHeader("Evidence Vault", "خزنة الأدلة", "Search, review and verify evidence records without changing the original content.", "ابحث وراجع وتحقق من سجلات الأدلة دون تغيير المحتوى الأصلي.", actions)}
      <section class="card">
        <div class="card-header"><div><div class="card-title">${tr("Evidence Inventory", "سجل الأدلة")}</div><div class="card-subtitle">${tr("Immutable references across all approved sources", "مراجع غير قابلة للتعديل من جميع المصادر المعتمدة")}</div></div><div class="button-row"><span class="badge badge-success">${filtered.length} ${tr("records shown", "سجلات معروضة")}</span></div></div>
        <div class="search-filters" style="grid-template-columns:2fr 1fr 1fr 1fr auto">
          <div class="search-input">${icon("search")}<input class="input" id="evidence-search" value="${state.evidenceQuery}" placeholder="${tr("Search ID, filename, case or tag…", "ابحث بالمعرف أو الملف أو القضية أو الوسم...")}" /></div>
          <select class="select" id="evidence-type"><option value="All">${tr("All types", "كل الأنواع")}</option>${[...new Set(D.evidence.map((e)=>e.type))].map((t)=>`<option ${state.evidenceType===t?"selected":""}>${t}</option>`).join("")}</select>
          <select class="select"><option>${tr("All integrity states", "كل حالات السلامة")}</option><option>Verified</option></select>
          <select class="select"><option>${tr("All legal hold states", "كل حالات الحجز")}</option><option>Active</option><option>Not held</option></select>
          <button class="btn btn-primary" data-action="evidence-filter">${icon("filter")} ${tr("Filter", "تصفية")}</button>
        </div>
        <div class="table-wrap"><table class="table"><thead><tr><th>${tr("Evidence", "الدليل")}</th><th>${tr("Source", "المصدر")}</th><th>${tr("Case", "القضية")}</th><th>${tr("Size", "الحجم")}</th><th>${tr("Integrity", "السلامة")}</th><th>WORM</th><th>${tr("Retention", "الاحتفاظ")}</th><th>${tr("Legal Hold", "الحجز")}</th><th>${tr("Actions", "الإجراءات")}</th></tr></thead><tbody>${filtered.map(evidenceRow).join("")}</tbody></table></div>
      </section>
      <section class="grid grid-3 section-gap">
        <article class="card padded"><div class="card-title">${tr("Immutable Preservation", "الحفظ غير القابل للتعديل")}</div><p class="page-subtitle">${tr("Evidence references are presented as committed to WORM controls in this simulation.", "يتم عرض مراجع الأدلة كمحفوظة بضوابط WORM في هذه المحاكاة.")}</p><div class="verify-callout">${icon("lock")}<span><b>${tr("Compliance-mode target", "هدف وضع الامتثال")}</b><span>${tr("Delete and overwrite operations are rejected while retention is active.", "يتم رفض الحذف والاستبدال خلال مدة الاحتفاظ.")}</span></span></div></article>
        <article class="card padded"><div class="card-title">${tr("Integrity Verification", "التحقق من السلامة")}</div><p class="page-subtitle">${tr("SHA-512 is recomputed and compared with the registered evidence fingerprint.", "يعاد حساب SHA-512 ومقارنته ببصمة الدليل المسجلة.")}</p><div class="verify-callout">${icon("hash")}<span><b>99.98% ${tr("verified", "تم التحقق")}</b><span>${tr("Explicit pass/fail results retained in the audit trail.", "تُحفظ نتائج النجاح أو الفشل في سجل التدقيق.")}</span></span></div></article>
        <article class="card padded"><div class="card-title">${tr("Custody & Legal Control", "الحيازة والتحكم القانوني")}</div><p class="page-subtitle">${tr("Every access, transfer, hold and export is represented as a traceable event.", "يظهر كل وصول أو نقل أو حجز أو تصدير كحدث قابل للتتبع.")}</p><div class="verify-callout">${icon("gavel")}<span><b>27 ${tr("active legal holds", "حجزًا قانونيًا نشطًا")}</b><span>${tr("Retention expiry does not dispose of held evidence.", "انتهاء الاحتفاظ لا يؤدي للتخلص من الدليل المحجوز.")}</span></span></div></article>
      </section>`;
  }

  function evidenceRow(e) {
    return `<tr><td><div class="table-title"><a class="text-blue" href="#evidence/${e.id}">${e.title}</a></div><div class="table-sub mono">${e.id} · ${e.type}</div></td><td><div class="table-title">${e.source}</div><div class="table-sub">${e.sourceDetail}</div></td><td><div class="table-title text-blue">${e.caseId}</div><div class="table-sub">${e.caseName}</div></td><td>${e.size}</td><td><span class="badge badge-success">${icon("check")} ${e.integrity}</span></td><td><span class="badge badge-blue">${e.worm}</span></td><td>${e.retention}</td><td>${e.legalHold?`<span class="badge badge-warning">${icon("gavel")} Active</span>`:`<span class="badge badge-gray">None</span>`}</td><td><div class="table-actions"><a class="mini-action" href="#evidence/${e.id}" title="View">${icon("eye")}</a><button class="mini-action" data-copy="${e.id}" title="Copy ID">${icon("copy")}</button><button class="mini-action" data-quick-export="${e.id}" title="Export">${icon("export")}</button></div></td></tr>`;
  }

  function renderEvidenceDetail(id) {
    const e = D.evidence.find((x) => x.id === id) || D.evidence[0];
    const breadcrumbs = `<a href="#evidence">${tr("Evidence Vault", "خزنة الأدلة")}</a>${icon("chevron")}<span>${e.id}</span>`;
    const actions = `<button class="btn" data-action="verify-evidence" data-id="${e.id}">${icon("shield")} ${tr("Verify Integrity", "تحقق من السلامة")}</button><button class="btn" data-action="legal-hold" data-id="${e.id}">${icon("gavel")} ${e.legalHold?tr("Release Hold", "رفع الحجز"):tr("Place Legal Hold", "تطبيق حجز قانوني")}</button><button class="btn" data-action="transfer-custody" data-id="${e.id}">${icon("transfer")} ${tr("Transfer Custody", "نقل الحيازة")}</button><button class="btn" data-action="add-case">${icon("folder")} ${tr("Add to Case", "إضافة لقضية")}</button><button class="btn btn-dark" data-action="quick-export" data-id="${e.id}">${icon("export")} ${tr("Generate Export", "إنشاء تصدير")}</button>`;
    return `${pageHeader("Evidence Record", "سجل الدليل", "Detailed view of evidence identity, integrity and custody information.", "عرض تفصيلي لهوية الدليل وسلامته ومعلومات الحيازة.", actions, breadcrumbs)}
      <section class="evidence-layout">
        <article class="card preview-card"><div class="preview-head"><span class="card-title">${tr("Evidence Preview", "معاينة الدليل")}</span><span class="badge badge-blue">${e.type}</span><span class="table-sub">${e.title}</span></div><div class="preview-frame">${e.thumbnail?`<img src="${e.thumbnail}" alt="Simulated CCTV evidence preview"/>`:`<div class="empty-state"><span class="empty-icon">${icon(e.type==="Email"?"mail":e.type==="Log"?"code":"file")}</span><h3>${e.title}</h3><p>${tr("Preview is represented as metadata-only in this concept demo.", "المعاينة ممثلة ببيانات وصفية فقط في هذا الديمو.")}</p></div>`}<span class="preview-overlay"></span><span class="preview-time">2026-07-30 14:32:11 AST</span><span class="preview-cam">CAM 04 · DEMO</span></div>${e.thumbnail?`<div class="filmstrip">${Array.from({length:7},()=>"<span></span>").join("")}</div>`:""}</article>
        <article class="card"><div class="card-header"><div class="card-title">${tr("Core Metadata", "البيانات الأساسية")}</div></div><div class="meta-list">
          ${metaRow("file",tr("Evidence ID","معرف الدليل"),e.id,true)}
          ${metaRow("architecture",tr("Tenant","المؤسسة"),currentTenant().name)}
          ${metaRow("camera",tr("Source","المصدر"),`${e.source} — ${e.sourceDetail}`)}
          ${metaRow("clock",tr("Collection Time","وقت الجمع"),e.collected)}
          ${metaRow("cases",tr("Case ID","معرف القضية"),e.caseId)}
          ${metaRow("database",tr("File Size","حجم الملف"),e.size)}
          ${metaRow("calendar",tr("Retention End","نهاية الاحتفاظ"),e.retention)}
          ${metaRow("gavel",tr("Legal Hold","الحجز القانوني"),e.legalHold?tr("Active","نشط"):tr("Not active","غير نشط"))}
        </div></article>
        <article class="card integrity-card"><div class="card-title">${tr("Integrity & Authenticity", "السلامة والأصالة")}</div><div class="hash-box ltr"><b>SHA-512 Fingerprint</b><br>${e.hash}</div>
          ${detailRow("lock",tr("Encryption","التشفير"),e.encryption,"badge-success",tr("Encrypted","مشفّر"))}
          ${detailRow("shield","WORM",e.worm,"badge-success",tr("Committed","محفوظ"))}
          ${detailRow("layers",tr("Version History","سجل الإصدارات"),"3 versions","badge-blue",tr("View history","عرض السجل"))}
          ${detailRow("clock",tr("Verification History","سجل التحقق"),"5 verifications","badge-blue",tr("View history","عرض السجل"))}
          <div class="verify-callout">${icon("shield")}<span><b>${tr("Integrity Verified", "تم التحقق من السلامة")}</b><span>${tr("Last simulated verification: 1 Aug 2026, 22:14 AST", "آخر تحقق محاكى: 1 أغسطس 2026، 22:14")}</span></span></div>
        </article>
      </section>

      <section class="grid grid-3 section-gap">
        <article class="card"><div class="card-header"><div><div class="card-title">${tr("Chain of Custody", "سلسلة الحيازة")}</div><div class="card-subtitle">${tr("Traceable lifecycle events", "أحداث دورة حياة قابلة للتتبع")}</div></div><a class="card-link" href="#search">${tr("Full audit trail", "سجل التدقيق الكامل")} →</a></div><div class="custody-timeline">
          ${custodyRow("Created","System",e.collected,tr("Captured by source system","تم جمعه من نظام المصدر"))}
          ${custodyRow("Uploaded","Ingestion Service",e.ingested,tr("Uploaded to RM TraceVault demo","رُفع إلى ديمو RM TraceVault"))}
          ${custodyRow("Verified","Integrity Service",e.ingested,tr("Fingerprint registered and matched","تم تسجيل البصمة ومطابقتها"))}
          ${custodyRow("Accessed",e.actor,"31 Jul 2026, 09:12",tr("Evidence details viewed","تم عرض تفاصيل الدليل"))}
          ${custodyRow("Transferred","Sarah Al Qahtani","31 Jul 2026, 11:08",tr("Custody responsibility transferred","تم نقل مسؤولية الحيازة"))}
          ${custodyRow("Exported",e.actor,"1 Aug 2026, 16:45",tr("Included in technical package","أُدرج في حزمة فنية"))}
        </div></article>
        <article class="card"><div class="card-header"><div class="card-title">${tr("Envelope / Export Metadata", "بيانات الغلاف والتصدير")}</div></div><div class="meta-list">
          ${metaRow("database","Object ID",`obj_${e.hash.slice(0,16)}`,true)}
          ${metaRow("file","Manifest ID",`man_${e.hash.slice(12,28)}`,true)}
          ${metaRow("key","Signature ID",`sig_${e.hash.slice(20,36)}`,true)}
          ${metaRow("shield",tr("Technical Package","الحزمة الفنية"),tr("Compatible with offline verification","متوافقة مع التحقق دون اتصال"))}
        </div><div class="verify-callout" style="margin:0 14px 14px">${icon("info")}<span><b>${tr("Technical export only", "تصدير فني فقط")}</b><span>${tr("Legal admissibility is determined by the competent authority and case context.", "تحدد الجهة المختصة القبول القانوني وفق سياق القضية.")}</span></span></div></article>
        <article class="card"><div class="card-header"><div class="card-title">${tr("Access & Permissions", "الوصول والصلاحيات")}</div></div><div class="meta-list">
          ${metaRow("users","RBAC Roles","4 roles")}
          ${metaRow("shield",tr("MFA Enforced","فرض التحقق المتعدد"),tr("Yes","نعم"))}
          ${metaRow("clock",tr("Last Access","آخر وصول"),"1 Aug 2026, 22:14")}
          ${metaRow("file",tr("Audit Events","أحداث التدقيق"),"27 events")}
        </div><div class="verify-callout" style="margin:0 14px 14px">${icon("lock")}<span><b>${tr("Least-privilege access", "وصول بأقل صلاحية")}</b><span>${tr("Every evidence-content access is represented in the audit trail.", "يتم تمثيل كل وصول لمحتوى الدليل في سجل التدقيق.")}</span></span></div></article>
      </section>
      <section class="card section-gap"><div class="card-header"><div class="card-title">${tr("System Information", "معلومات النظام")}</div></div><div class="grid grid-6" style="padding:0 15px 15px">${infoTile(tr("Storage Tier","فئة التخزين"),"Hot / WORM")}${infoTile(tr("Target Region","المنطقة المستهدفة"),"Riyadh, KSA")}${infoTile(tr("Ingested By","تم الإدخال بواسطة"),"Ingestion Service")}${infoTile(tr("Retention Policy","سياسة الاحتفاظ"),"7-Year Demo")}${infoTile(tr("Current Version","الإصدار الحالي"),"v1")}${infoTile(tr("Content Type","نوع المحتوى"),e.mime)}</div></section>`;
  }

  function metaRow(ic,label,value,copy=false){return `<div class="meta-row"><span class="meta-icon">${icon(ic)}</span><span class="meta-label">${label}</span><span class="meta-value ${copy?"mono ltr":""}">${value}${copy?` <button class="mini-action" data-copy="${value}" style="display:inline-grid;width:22px;height:22px">${icon("copy")}</button>`:""}</span></div>`;}
  function detailRow(ic,label,value,badgeTone,badge){return `<div class="detail-row"><span class="detail-label">${icon(ic)} ${label}</span><b>${value}</b><span class="badge ${badgeTone}">${badge}</span></div>`;}
  function custodyRow(event,actor,time,note){return `<div class="custody-row"><span class="custody-dot">${icon(event==="Verified"?"check":event==="Transferred"?"transfer":event==="Exported"?"export":"clock")}</span><span class="custody-event">${event}</span><span class="custody-actor">${actor}</span><span class="custody-time">${time}</span><span class="custody-note">${note}</span></div>`;}
  function infoTile(label,value){return `<div class="pricing-stat"><span>${label}</span><b>${value}</b></div>`;}

  function renderIngestion() {
    const actions = `<button class="btn">${icon("settings")} ${tr("Ingestion Settings", "إعدادات الإدخال")}</button><button class="btn btn-primary" data-action="new-ingestion">${icon("plus")} ${tr("New Ingestion", "إدخال جديد")}</button>`;
    return `${pageHeader("Ingestion & Connectors", "الإدخال والموصلات", "Secure acquisition and onboarding from approved evidence sources.", "استقبال وربط آمن من مصادر الأدلة المعتمدة.", actions)}
      <section class="card"><div class="card-header"><div><div class="card-title">${tr("New Ingestion Workflow", "مسار إدخال جديد")}</div><div class="card-subtitle">${tr("The simulated path from source to immutable evidence reference", "المسار المحاكى من المصدر إلى مرجع دليل غير قابل للتعديل")}</div></div></div><div class="stepper">
        ${stepNode(1,tr("Source Selection","اختيار المصدر"),tr("Select connector or upload method","اختر الموصل أو طريقة الرفع"),true)}
        ${stepNode(2,tr("Validation","التحقق"),tr("Validate source and metadata","تحقق من المصدر والبيانات"))}
        ${stepNode(3,tr("Encryption","التشفير"),tr("Encrypt chunks and protect keys","شفّر الأجزاء واحمِ المفاتيح"))}
        ${stepNode(4,"WORM Commit",tr("Immutable storage commitment","حفظ غير قابل للتعديل"))}
        ${stepNode(5,tr("Verification","التحقق النهائي"),tr("Hash match and custody record","مطابقة البصمة وسجل الحيازة"),false,true)}
      </div></section>
      <section class="card section-gap"><div class="card-header"><div><div class="card-title">${tr("Source Connectors", "موصلات المصادر")}</div><div class="card-subtitle">${tr("Connect and ingest from supported evidence systems", "اربط واستقبل من أنظمة الأدلة المدعومة")}</div></div><a class="card-link" href="#architecture">${tr("Connector architecture", "معمارية الموصلات")} →</a></div><div class="connector-grid">${D.connectors.map(connectorCard).join("")}</div></section>
      <section class="grid grid-3 section-gap" style="grid-template-columns:2.2fr .75fr .75fr">
        <article class="card span-2"><div class="card-header"><div><div class="card-title">${tr("Upload Queue", "قائمة الإدخال")}</div><div class="card-subtitle">${tr("In-flight and recently simulated ingestions", "عمليات الإدخال المحاكية الحالية والأخيرة")}</div></div><a class="card-link" href="#evidence">${tr("View all evidence", "عرض كل الأدلة")} →</a></div>
          <div class="table-wrap"><table class="table"><thead><tr><th>${tr("Item / Batch", "الملف / الدفعة")}</th><th>${tr("Source", "المصدر")}</th><th>${tr("Size", "الحجم")}</th><th>${tr("Encryption", "التشفير")}</th><th>${tr("Hash Status", "حالة البصمة")}</th><th>WORM</th><th>${tr("Operator", "المنفذ")}</th><th>${tr("Status", "الحالة")}</th></tr></thead><tbody>${D.evidence.slice(0,5).map(queueRow).join("")}</tbody></table></div>
        </article>
        <div class="right-stack">
          <article class="card"><div class="card-header"><div><div class="card-title">${tr("Source Validation", "التحقق من المصدر")}</div><div class="card-subtitle">${tr("Every ingestion is validated for integrity", "يتم التحقق من كل إدخال")}</div></div></div><div class="check-list">
            ${checkRow(tr("Supported file types","أنواع الملفات المدعومة"),"500+")}
            ${checkRow(tr("Max demo upload","حد الرفع التجريبي"),"50 GB")}
            ${checkRow(tr("Chunked transfer","النقل المجزأ"),tr("Enabled","مفعّل"))}
            ${checkRow(tr("Resumable uploads","استكمال الرفع"),tr("Enabled","مفعّل"))}
            ${checkRow(tr("Checksum verification","التحقق بالبصمة"),"SHA-512")}
          </div></article>
          <article class="card"><div class="card-header"><div><div class="card-title">${tr("Security Summary", "ملخص الأمن")}</div><div class="card-subtitle">${tr("Confidentiality and integrity controls", "ضوابط السرية والسلامة")}</div></div></div><div class="security-list">
            ${securityRow("AES-256-GCM",tr("Chunk encryption profile","ملف تشفير مجزأ"))}
            ${securityRow("SHA-512",tr("Whole-evidence verification","التحقق من الدليل الكامل"))}
            ${securityRow(tr("Dual-layer custody","حيازة مفاتيح بطبقتين"),tr("Tenant DEK + root layer","مفتاح الدليل + طبقة الجذر"))}
            ${securityRow(tr("Immutable commit","الحفظ غير القابل للتعديل"),"WORM")}
            ${securityRow(tr("Metadata capture","جمع البيانات الوصفية"),tr("Audit-ready record","سجل قابل للتدقيق"))}
          </div></article>
        </div>
      </section>
      <section class="grid grid-3 section-gap">
        <article class="card"><div class="card-header"><div><div class="card-title">${tr("Connector Activity", "نشاط الموصلات")}</div><div class="card-subtitle">${tr("Last seven days", "آخر سبعة أيام")}</div></div></div><div class="donut-wrap"><div class="success-donut" style="background:conic-gradient(#2167c9 0 48%,#4f87db 48% 68%,#65c8ad 68% 83%,#8d63d2 83% 91%,#dea13a 91% 100%)"><div class="success-center">646.9<small>GB ${tr("ingested", "تم إدخالها")}</small></div></div><div class="legend">${D.connectors.slice(0,6).map((c,i)=>legendRow(["#2167c9","#4f87db","#65c8ad","#8d63d2","#dea13a","#7a92ab"][i],c.name,c.volume,"")).join("")}</div></div></article>
        <article class="card"><div class="card-header"><div><div class="card-title">${tr("Ingestion Throughput", "معدل الإدخال")}</div><div class="card-subtitle">${tr("Simulated daily volume", "الحجم اليومي المحاكى")}</div></div></div><div class="chart-card">${lineChart()}</div></article>
        <article class="card"><div class="card-header"><div><div class="card-title">${tr("Ingestion Success Rate", "نسبة نجاح الإدخال")}</div><div class="card-subtitle">${tr("Successful versus failed", "الناجح مقابل الفاشل")}</div></div></div><div class="chart-card"><div class="success-donut"><div class="success-center">99.2%<small>${tr("Success", "نجاح")}</small></div></div><div class="legend" style="margin-top:14px">${legendRow("#23ad6f",tr("Success","ناجح"),"1,240","")}${legendRow("#e6515f",tr("Failed","فاشل"),"10","")}${legendRow("#9ba9ba",tr("Total","الإجمالي"),"1,250","")}</div></div></article>
      </section>`;
  }

  function stepNode(n,title,meta,first=false,last=false){return `<div class="step ${first?"done":""}"><div class="step-node"><span class="step-num">${first?icon("check"):n}</span><span class="step-copy"><b>${title}</b><span>${meta}</span></span></div>${last?"":`<span class="step-line"></span>`}</div>`;}
  function connectorCard(c){const tone=c.status==="Connected"?"badge-success":c.status==="Pending Setup"?"badge-warning":c.status==="Syncing"?"badge-blue":"badge-gray";return `<button class="connector" data-connector="${c.id}"><span class="connector-icon">${icon(c.icon)}</span><span class="connector-name">${c.name}</span><span class="badge ${tone}" style="margin-top:6px">${c.status}</span><span class="connector-meta">${c.detail}</span></button>`;}
  function queueRow(e){return `<tr><td><div class="table-title">${e.title}</div><div class="table-sub mono">${e.id}</div></td><td>${e.source}</td><td>${e.size}</td><td><span class="badge badge-success">${e.encryption}</span></td><td><span class="badge badge-success">SHA-512 ${tr("Verified","تم التحقق")}</span></td><td><span class="badge badge-success">${tr("Committed","محفوظ")}</span></td><td>${e.actor}</td><td><span class="badge badge-success">${tr("Completed","مكتمل")}</span></td></tr>`;}
  function checkRow(label,value){return `<div class="check-row"><span class="check-label"><span class="check-circle">${icon("check")}</span>${label}</span><span class="check-value">${value}</span></div>`;}
  function securityRow(title,meta){return `<div class="security-row"><span class="security-shield">${icon("shield")}</span><span><b>${title}</b><span>${meta}</span></span></div>`;}
  function lineChart(){return `<svg class="line-chart" viewBox="0 0 520 170" preserveAspectRatio="none"><defs><linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#377bd7" stop-opacity=".28"/><stop offset="1" stop-color="#377bd7" stop-opacity=".02"/></linearGradient></defs>${[25,65,105,145].map(y=>`<line class="chart-grid-line" x1="36" x2="510" y1="${y}" y2="${y}"/>`).join("")}<path class="chart-area" d="M36 138 C88 114,110 106,152 83 S220 70,258 51 S330 54,367 66 S430 47,510 92 L510 145 L36 145Z"/><path class="chart-line" d="M36 138 C88 114,110 106,152 83 S220 70,258 51 S330 54,367 66 S430 47,510 92"/>${["Jul 25","Jul 26","Jul 27","Jul 28","Jul 29","Jul 30","Aug 1"].map((x,i)=>`<text class="axis-label" x="${36+i*78}" y="163">${x}</text>`).join("")}<text class="axis-label" x="4" y="148">0 GB</text><text class="axis-label" x="4" y="108">50</text><text class="axis-label" x="0" y="68">100</text><text class="axis-label" x="0" y="28">150</text></svg>`;}

  function openIngestionModal() {
    const stages = [
      ["file",tr("Source validation","التحقق من المصدر"),tr("Check file type, metadata and tenant context","فحص النوع والبيانات وسياق المؤسسة")],
      ["lock",tr("Chunk encryption","تشفير الأجزاء"),"AES-256-GCM · 64 MiB"],
      ["key",tr("Key protection","حماية المفتاح"),tr("Protect evidence DEK through custody layer","حماية مفتاح الدليل بطبقة الحيازة")],
      ["vault","WORM Commit",tr("Create immutable object reference","إنشاء مرجع غير قابل للتعديل")],
      ["hash",tr("Verification","التحقق"),"SHA-512 + custody event"],
    ];
    showModal({
      title: tr("Simulate New Ingestion", "محاكاة إدخال جديد"),
      subtitle: tr("No file leaves your browser; this demonstration generates simulated progress only.", "لا يغادر أي ملف المتصفح؛ هذا العرض يولد تقدمًا محاكى فقط."),
      body:`<div class="upload-zone">${icon("upload")}<b>${tr("Drop a sample file or select a source", "اسحب ملفًا تجريبيًا أو اختر مصدرًا")}</b><span>${tr("Supported demonstration types: video, document, email, log and dataset", "الأنواع التجريبية: فيديو ومستند وبريد وسجل وبيانات")}</span><div style="margin-top:12px"><input class="input" id="demo-file-name" value="Incident_Report_2026-08-01.pdf" /></div></div><div class="ingestion-progress">${stages.map((s,i)=>`<div class="ingestion-stage" data-stage="${i}"><span class="stage-status">${icon(s[0])}</span><span class="stage-copy"><b>${s[1]}</b><span>${s[2]}</span></span><span class="stage-right">${tr("Pending","بانتظار")}</span></div>`).join("")}</div>`,
      footer:`<button class="btn" data-action="modal-close-2">${tr("Cancel","إلغاء")}</button><button class="btn btn-primary" data-action="start-ingestion">${icon("play")} ${tr("Start simulation","بدء المحاكاة")}</button>`,
    });
    $('[data-action="modal-close-2"]')?.addEventListener("click",closeModal);
    $('[data-action="start-ingestion"]')?.addEventListener("click",runIngestionSimulation);
  }

  function runIngestionSimulation(){
    if(state.uploadInProgress)return;
    state.uploadInProgress=true;
    const stages=$$('[data-stage]');
    const startBtn=$('[data-action="start-ingestion"]'); if(startBtn)startBtn.disabled=true;
    let i=0;
    const next=()=>{
      stages.forEach((s,idx)=>{
        const status=$('.stage-status',s),right=$('.stage-right',s);
        if(idx<i){status.className='stage-status done';status.innerHTML=icon('check');right.textContent=tr('Complete','مكتمل');}
        else if(idx===i){status.className='stage-status active';status.innerHTML=icon('refresh');right.textContent=tr('Processing','قيد التنفيذ');}
      });
      if(i>=stages.length){
        state.uploadInProgress=false;
        const fileName=$('#demo-file-name')?.value || 'Demo_Evidence.pdf';
        const newId=`EV-2026-${String(5684+D.evidence.length).padStart(6,'0')}`;
        D.evidence.unshift({id:newId,title:fileName,source:'Manual Upload',sourceDetail:'Interactive Demo',type:'Document',mime:'application/pdf',size:'3.42 MB',sizeGb:.00342,caseId:'CASE-2026-0421',caseName:'Financial Fraud Investigation',collected:'1 Aug 2026, 22:58 AST',ingested:'1 Aug 2026, 22:59 AST',hash:'d'.repeat(128),encryption:'AES-256-GCM',worm:'Compliance Mode',integrity:'Verified',legalHold:false,retention:'1 Aug 2033',tags:['Demo','Manual Upload'],actor:'Mohammed Alharthi'});
        closeModal();toast(tr('Evidence ingestion completed','اكتملت عملية إدخال الدليل'),`${newId} · ${fileName}`);location.hash='evidence';return;
      }
      setTimeout(()=>{i++;next();},850);
    };
    next();
  }

  function renderCases() {
    const activeCase = D.cases.find((c) => c.id === state.activeCaseId) || D.cases[0];
    const caseEvidence = D.evidence.filter((e) => e.caseId === activeCase.id);
    const actions = `<button class="btn">${icon("users")} ${tr("Share Case", "مشاركة القضية")}</button><button class="btn btn-primary" data-action="case-action">${tr("Actions", "الإجراءات")} ${icon("down")}</button>`;
    return `${pageHeader("Case Workspace", "مساحة القضية", "Investigate, collaborate and act on trusted evidence.", "حقق وتعاون واتخذ الإجراءات على أدلة موثوقة.", actions, `<a href="#overview">${tr("Home","الرئيسية")}</a>${icon("chevron")}<span>${tr("Cases","القضايا")}</span>${icon("chevron")}<span>${activeCase.id}</span>`)}
      <div class="tabs" style="margin-bottom:12px;background:white;border:1px solid var(--line);border-radius:12px"><button class="tab active">${tr("Case Overview", "نظرة القضية")}</button><button class="tab">${tr("Evidence", "الأدلة")}</button><button class="tab">${tr("Activity", "النشاط")}</button><button class="tab">${tr("Collaborate", "التعاون")}</button><button class="tab">${tr("Exports", "التصدير")}</button><button class="tab">${tr("Audit Trail", "سجل التدقيق")}</button></div>
      <section class="case-summary">
        ${summaryTile("cases",tr("Case","القضية"),activeCase.id,activeCase.name)}
        ${summaryTile("users",tr("Owner","المالك"),activeCase.owner,tr("Lead Investigator","المحقق الرئيسي"))}
        ${summaryTile("check",tr("Status","الحالة"),activeCase.status,`${tr("Updated","تم التحديث")} ${activeCase.updated}`)}
        ${summaryTile("file",tr("Evidence","الأدلة"),fmt(activeCase.evidence),tr("items","عنصر"))}
        ${summaryTile("alert",tr("Custody Alerts","تنبيهات الحيازة"),String(activeCase.alerts),tr("Requires attention","تحتاج مراجعة"))}
        ${summaryTile("export",tr("Pending Exports","تصديرات معلقة"),String(activeCase.exports),tr("In progress","قيد التنفيذ"))}
      </section>
      <section class="card section-gap"><div class="card-header"><div><div class="card-title">${tr("Global Evidence Search", "البحث الشامل في الأدلة")}</div><div class="card-subtitle">${tr("Authorized search across the selected tenant", "بحث مصرح به ضمن المؤسسة المحددة")}</div></div></div><div class="search-filters"><div class="search-input">${icon("search")}<input id="case-search" class="input" placeholder="${tr("Search invoice, payment, domain, hash or email…", "ابحث عن فاتورة أو دفعة أو نطاق أو بصمة أو بريد...")}" /></div><select class="select"><option>${tr("All Sources","كل المصادر")}</option></select><select class="select"><option>${tr("Last 90 days","آخر 90 يومًا")}</option></select><select class="select"><option>${tr("Hash: All","البصمة: الكل")}</option></select><select class="select"><option>${tr("Legal Hold: All","الحجز: الكل")}</option></select><select class="select"><option>${tr("Retention: All","الاحتفاظ: الكل")}</option></select><button class="btn">${tr("More Filters","فلاتر إضافية")}</button><button class="btn btn-primary" data-action="case-search">${icon("search")} ${tr("Search","بحث")}</button></div></section>
      <section class="workspace-grid section-gap">
        <div class="saved-column">
          <article class="card"><div class="card-header"><div class="card-title">${tr("Saved Searches", "عمليات البحث المحفوظة")}</div><button class="btn btn-sm">${icon("plus")} ${tr("New","جديد")}</button></div><div class="saved-searches">${[tr("High Risk Transactions","المعاملات عالية المخاطر"),tr("Vendor Communications","مراسلات الموردين"),tr("Domain Intelligence","استخبارات النطاقات"),tr("Suspicious Logins (7d)","تسجيلات دخول مشبوهة"),tr("Hash Mismatches","اختلافات البصمة")].map((x)=>`<div class="saved-item">${icon("file")}<span>${x}</span></div>`).join("")}</div></article>
          <article class="card section-gap"><div class="card-header"><div><div class="card-title">${tr("Recent Case Activity", "نشاط القضية الأخير")}</div><div class="card-subtitle">${tr("Last seven days", "آخر سبعة أيام")}</div></div></div><div class="activity-donut"><div>1,248<small>${tr("events","حدثًا")}</small></div></div><div class="legend" style="padding:0 14px 14px">${legendRow("#2368cf",tr("Ingested","تم الإدخال"),"642","")}${legendRow("#4f8ce0",tr("Reviewed","تمت المراجعة"),"318","")}${legendRow("#60c8a7",tr("Tagged","تم الوسم"),"164","")}${legendRow("#af72dd",tr("Exported","تم التصدير"),"94","")}</div></article>
        </div>
        <div>
          <article class="card"><div class="card-header"><div><div class="card-title">${tr("Search Results", "نتائج البحث")} (${activeCase.evidence})</div><div class="card-subtitle">${tr("Most recent authorized evidence", "أحدث الأدلة المصرح بها")}</div></div><div class="button-row"><button class="btn btn-sm">${tr("View","العرض")}</button><button class="btn btn-sm">${tr("Sort: Newest","الترتيب: الأحدث")}</button><button class="btn btn-sm">${icon("export")} ${tr("Export","تصدير")}</button></div></div><div class="table-wrap"><table class="table"><thead><tr><th>${tr("Evidence","الدليل")}</th><th>${tr("Title","العنوان")}</th><th>${tr("Source","المصدر")}</th><th>${tr("Case","القضية")}</th><th>${tr("Integrity","السلامة")}</th><th>${tr("Actions","الإجراءات")}</th></tr></thead><tbody>${(caseEvidence.length?caseEvidence:D.evidence.slice(0,5)).map(caseEvidenceRow).join("")}</tbody></table></div><div class="card-footer"><span>${tr("Showing 1 to 5 results", "عرض النتائج من 1 إلى 5")}</span><span>1 &nbsp; 2 &nbsp; 3 &nbsp; …</span></div></article>
          <article class="card section-gap"><div class="tabs"><button class="tab active">${tr("Notes","الملاحظات")}</button><button class="tab">${tr("Tasks","المهام")}</button><button class="tab">${tr("Bookmarks","الإشارات")}</button><button class="tab">${tr("Tags","الوسوم")}</button><button class="tab">${tr("Linked Evidence","الأدلة المرتبطة")}</button></div><div class="investigation-hub"><div class="note-box"><textarea id="case-note" class="textarea" placeholder="${tr("Add a note… use @ to mention teammates", "أضف ملاحظة... استخدم @ للإشارة للزملاء")}"></textarea><div class="button-row" style="justify-content:flex-end;margin-top:8px"><button class="btn btn-primary btn-sm" data-action="add-note">${tr("Add Note","إضافة ملاحظة")}</button></div><div id="notes-list"><div class="note-item"><span class="note-avatar">SA</span><div class="note-copy"><div class="note-head">Sarah Al Qahtani · ${tr("Investigator","محققة")}</div>${tr("Reviewed wire-transfer receipts. Sequence aligns with ledger entries; vendor bank details need validation.", "تمت مراجعة إيصالات التحويل. التسلسل متوافق مع القيود، ويجب التحقق من تفاصيل حساب المورد.")}</div></div></div></div><div class="recent-notes"><div class="card-title">${tr("Recent Notes", "الملاحظات الأخيرة")}</div>${[tr("Sequence validated for batch 0421","تم التحقق من تسلسل الدفعة 0421"),tr("Vendor KYC documents requested","تم طلب وثائق اعرف عميلك للمورد"),tr("Cross-check with SIEM alerts","مطابقة مع تنبيهات SIEM")].map((x,i)=>`<div class="recent-note">${x}<span>${i===0?tr("You · Today, 9:14","أنت · اليوم 9:14"):i===1?"Omar Al Dossari · Yesterday":"Sarah Al Qahtani · 29 Jul"}</span></div>`).join("")}</div></div></article>
        </div>
        <aside class="ai-panel"><div class="card-header"><div><div class="card-title">${tr("AI Evidence Analysis", "تحليل الأدلة بالذكاء الاصطناعي")} <span class="badge badge-purple">${tr("Optional / Governed", "اختياري / محكوم")}</span></div><div class="card-subtitle">${tr("AI output never changes authoritative evidence.", "مخرجات الذكاء الاصطناعي لا تغير الدليل الأصلي.")}</div></div></div><div class="ai-tabs"><button class="ai-tab active">OCR</button><button class="ai-tab">${tr("Classification","التصنيف")}</button><button class="ai-tab">${tr("Entities","الكيانات")}</button><button class="ai-tab">${tr("Semantic Search","البحث الدلالي")}</button></div><div class="ai-body">
          <div class="ai-section"><h4>${tr("Extracted Text", "النص المستخرج")} <span class="badge badge-success" style="float:right">98%</span></h4><div class="ai-box ltr">Invoice #88421<br>Vendor: Global Tech Supplies<br>Date: 2026-07-29<br>Amount: SAR 128,450.00</div></div>
          <div class="ai-section"><h4>${tr("Detected Fields", "الحقول المكتشفة")}</h4><div class="field-chips"><div class="field-chip"><b>Invoice Number</b>88421</div><div class="field-chip"><b>Vendor</b>Global Tech Supplies</div><div class="field-chip"><b>Amount</b>SAR 128,450</div><div class="field-chip"><b>Date</b>2026-07-29</div></div></div>
          <div class="ai-section"><h4>${tr("AI Summary", "ملخص الذكاء الاصطناعي")}</h4><div class="ai-box">${tr("The document appears to be a hardware-procurement invoice. Human review is required before using the result.", "يبدو المستند فاتورة توريد أجهزة. يلزم التحقق البشري قبل استخدام النتيجة.")}<div class="risk"><span>${tr("Risk Score","درجة المخاطر")}</span><span class="risk-score">${tr("High","مرتفعة")}</span></div></div></div>
          <div class="ai-section"><h4>${tr("Similar Evidence", "أدلة مشابهة")}</h4><div class="similar">${["invoice_88420.png · 96%", "purchase_order_1921.pdf · 93%", "invoice_88399.png · 91%"].map((x)=>`<div class="similar-item"><span class="similar-icon">${icon("file")}</span><span>${x}</span></div>`).join("")}</div></div>
        </div></aside>
      </section>`;
  }

  function summaryTile(ic,label,value,meta){return `<article class="summary-tile"><span class="summary-icon">${icon(ic)}</span><span><span class="summary-label">${label}</span><span class="summary-value">${value}</span><span class="summary-meta">${meta}</span></span></article>`;}
  function caseEvidenceRow(e){return `<tr><td><span class="badge badge-blue">${e.type}</span></td><td><div class="table-title"><a class="text-blue" href="#evidence/${e.id}">${e.title}</a></div><div class="table-sub">${e.size} · ${e.tags.join(" · ")}</div></td><td><div class="table-title">${e.source}</div><div class="table-sub">${e.sourceDetail}</div></td><td><div class="table-title text-blue">${e.caseId}</div><div class="table-sub">${e.caseName}</div></td><td><span class="badge badge-success">${icon("check")} SHA-512</span></td><td><div class="table-actions"><a class="mini-action" href="#evidence/${e.id}">${icon("eye")}</a><button class="mini-action" data-copy="${e.id}">${icon("link")}</button></div></td></tr>`;}

  function renderSearch() {
    return `${pageHeader("Global Search", "البحث الشامل", "Find authorized evidence, cases, custody events and export records.", "ابحث في الأدلة والقضايا وأحداث الحيازة والتصدير المصرح بها.", `<button class="btn">${icon("filter")} ${tr("Saved Filters","الفلاتر المحفوظة")}</button>`)}
      <section class="card"><div class="card-header"><div><div class="card-title">${tr("Search Across the Tenant", "البحث داخل المؤسسة")}</div><div class="card-subtitle">${tr("Authorization is applied before results are displayed.", "يتم تطبيق الصلاحيات قبل عرض النتائج.")}</div></div></div><div class="search-filters" style="grid-template-columns:2fr repeat(4,1fr) auto"><div class="search-input">${icon("search")}<input id="global-search" class="input" placeholder="${tr("Search metadata, case ID, source, tag or fingerprint…", "ابحث بالبيانات أو القضية أو المصدر أو الوسم أو البصمة...")}" /></div><select class="select"><option>${tr("All sources","كل المصادر")}</option></select><select class="select"><option>${tr("All cases","كل القضايا")}</option></select><select class="select"><option>${tr("All integrity states","كل حالات السلامة")}</option></select><select class="select"><option>${tr("All retention profiles","كل سياسات الاحتفاظ")}</option></select><button class="btn btn-primary" data-action="global-search">${icon("search")} ${tr("Search","بحث")}</button></div></section>
      <section class="grid grid-3 section-gap"><article class="card span-2"><div class="card-header"><div><div class="card-title">${tr("Evidence Results", "نتائج الأدلة")}</div><div class="card-subtitle">${tr("Ranked by relevance and permission", "مرتبة حسب الصلة والصلاحية")}</div></div></div><div id="global-results" class="table-wrap"><table class="table"><thead><tr><th>${tr("Evidence","الدليل")}</th><th>${tr("Source","المصدر")}</th><th>${tr("Case","القضية")}</th><th>${tr("Integrity","السلامة")}</th><th>${tr("Hold","الحجز")}</th><th>${tr("Actions","الإجراءات")}</th></tr></thead><tbody>${D.evidence.map((e)=>`<tr><td><div class="table-title"><a class="text-blue" href="#evidence/${e.id}">${e.title}</a></div><div class="table-sub mono">${e.id}</div></td><td>${e.source}</td><td>${e.caseId}</td><td><span class="badge badge-success">Verified</span></td><td>${e.legalHold?`<span class="badge badge-warning">Active</span>`:`<span class="badge badge-gray">None</span>`}</td><td><a class="mini-action" href="#evidence/${e.id}">${icon("eye")}</a></td></tr>`).join("")}</tbody></table></div></article><div class="right-stack"><article class="card"><div class="card-header"><div><div class="card-title">${tr("Search Scope", "نطاق البحث")}</div><div class="card-subtitle">${currentTenant().name}</div></div></div><div class="check-list">${checkRow(tr("Evidence metadata","بيانات الأدلة"),"6")}${checkRow(tr("Cases","القضايا"),String(D.cases.length))}${checkRow(tr("Custody events","أحداث الحيازة"),"27")}${checkRow(tr("Export records","سجلات التصدير"),String(D.exports.length))}</div></article><article class="card"><div class="card-header"><div><div class="card-title">${tr("Search Guardrails", "ضوابط البحث")}</div><div class="card-subtitle">${tr("Trust-first result handling", "معالجة نتائج قائمة على الثقة")}</div></div></div><div class="security-list">${securityRow(tr("Tenant isolation","عزل المؤسسة"),tr("Cross-tenant results are excluded","يتم استبعاد نتائج المؤسسات الأخرى"))}${securityRow(tr("Role filtering","تصفية حسب الدور"),tr("Results require explicit permission","تحتاج النتائج لصلاحية صريحة"))}${securityRow(tr("Audit event","حدث تدقيق"),tr("Sensitive searches are traceable","عمليات البحث الحساسة قابلة للتتبع"))}</div></article></div></section>`;
  }

  function renderExports() {
    const selected = D.evidence.filter((e) => state.selectedEvidence.has(e.id));
    const totalGb = selected.reduce((s,e)=>s+e.sizeGb,0);
    const compressed = totalGb * .35;
    const actions = `<button class="btn">${icon("calendar")} ${tr("Last 30 days","آخر 30 يومًا")}</button><button class="btn btn-primary" data-action="build-export">${icon("lock")} ${tr("Build Package","إنشاء الحزمة")}</button>`;
    return `${pageHeader("Technical Export & Offline Verification", "التصدير الفني والتحقق دون اتصال", "Assemble a portable package with integrity, custody and verification material.", "أنشئ حزمة قابلة للنقل تتضمن مواد السلامة والحيازة والتحقق.", actions, `<a href="#overview">${tr("Home","الرئيسية")}</a>${icon("chevron")}<span>${tr("Exports","التصدير")}</span>`)}
      <section class="export-grid">
        <article class="card"><div class="card-header"><div><div class="card-title">1 · ${tr("Export Builder","منشئ التصدير")}</div><div class="card-subtitle">${tr("Select evidence items for the technical package", "اختر الأدلة للحزمة الفنية")}</div></div><span class="badge badge-blue">${selected.length} ${tr("selected","محدد")}</span></div><div class="export-list">${D.evidence.slice(0,6).map((e)=>exportEvidenceItem(e)).join("")}</div><div class="card-footer"><span>${tr("Original size","الحجم الأصلي")}: ${totalGb.toFixed(2)} GB</span><b>${tr("Estimated package","الحزمة التقديرية")}: ${compressed.toFixed(2)} GB</b></div></article>
        <article class="card"><div class="card-header"><div><div class="card-title">2 · ${tr("Package Configuration","إعداد الحزمة")}</div><div class="card-subtitle">${tr("Reports, manifests and verifier", "التقارير والبيان وأداة التحقق")}</div></div></div><div class="export-options">
          ${exportOption("file",tr("Manifest (JSON)","البيان (JSON)"),tr("Cryptographic inventory of package items","جرد تشفيري لعناصر الحزمة"),true)}
          ${exportOption("transfer",tr("Chain of Custody Report (PDF)","تقرير سلسلة الحيازة (PDF)"),tr("Complete event timeline","تسلسل زمني كامل للأحداث"),true)}
          ${exportOption("hash",tr("Integrity Report (PDF)","تقرير السلامة (PDF)"),tr("Fingerprints and verification results","البصمات ونتائج التحقق"),true)}
          ${exportOption("shield",tr("Offline Verification Tool","أداة التحقق دون اتصال"),tr("Portable technical verifier","أداة تحقق فنية قابلة للنقل"),true)}
          ${exportOption("database",tr("Metadata Bundle (JSON)","حزمة البيانات الوصفية"),tr("Case, evidence and system metadata","بيانات القضية والدليل والنظام"),true)}
          ${exportOption("eye",tr("Optional Redactions","إخفاء اختياري"),tr("Create a derived redacted copy","إنشاء نسخة مشتقة منقحة"),false)}
        </div></article>
        <article class="card"><div class="card-header"><div><div class="card-title">3 · ${tr("Package Summary","ملخص الحزمة")}</div><div class="card-subtitle">${tr("Review simulated technical status", "راجع الحالة الفنية المحاكية")}</div></div></div><div class="package-summary"><div class="summary-badges"><span class="badge badge-success">${icon("check")} ${tr("Signed","موقعة")}</span><span class="badge badge-success">${tr("Complete","مكتملة")}</span><span class="badge badge-blue">${tr("Verification Ready","جاهزة للتحقق")}</span></div>
          ${summaryLine("database",tr("Compressed Size","الحجم المضغوط"),`${compressed.toFixed(2)} GB`)}
          ${summaryLine("file",tr("Evidence Items","عناصر الأدلة"),String(selected.length))}
          ${summaryLine("export","Export ID","EXP-DEMO-2026-0017")}
          ${summaryLine("users",tr("Signer","الموقع"),"Demo Platform Admin")}
          ${summaryLine("key",tr("Signature Profile","ملف التوقيع"),"Ed25519 concept")}
          ${summaryLine("check",tr("Package Status","حالة الحزمة"),tr("Ready","جاهزة"))}
          <div class="verify-callout">${icon("info")}<span><b>${tr("Technical demonstration", "عرض فني")}</b><span>${tr("This demo does not make a legal-admissibility guarantee.", "لا يقدم هذا الديمو ضمانًا للقبول القانوني.")}</span></span></div>
          <button class="btn btn-dark btn-block section-gap" data-action="build-export">${icon("lock")} ${tr("Build & Sign Demo Package","إنشاء وتوقيع حزمة تجريبية")}</button>
        </div></article>
      </section>
      <section class="card section-gap"><div class="card-header"><div><div class="card-title">4 · ${tr("Offline Verification Workflow", "مسار التحقق دون اتصال")}</div><div class="card-subtitle">${tr("Independent verification on an isolated machine", "تحقق مستقل على جهاز معزول")}</div></div></div><div class="offline-steps">
        ${offlineStep("export",tr("Load Package","تحميل الحزمة"),tr("Open the package in the verifier","فتح الحزمة في أداة التحقق"))}
        ${offlineStep("shield",tr("Validate Signature","التحقق من التوقيع"),tr("Verify signer identity and signature","مطابقة هوية الموقع والتوقيع"))}
        ${offlineStep("hash",tr("Recompute SHA-512","إعادة حساب SHA-512"),tr("Recalculate every evidence fingerprint","إعادة حساب بصمة كل دليل"))}
        ${offlineStep("file",tr("Compare Manifest","مقارنة البيان"),tr("Match computed values to manifest","مطابقة القيم المحسوبة بالبيان"))}
        ${offlineStep("clock",tr("Review Audit Trail","مراجعة التدقيق"),tr("Review custody and system events","مراجعة الحيازة وأحداث النظام"))}
      </div></section>
      <section class="card section-gap"><div class="card-header"><div><div class="card-title">${tr("Recent Exports", "التصديرات الأخيرة")}</div><div class="card-subtitle">${tr("Technical packages created in the simulation", "الحزم الفنية التي أُنشئت في المحاكاة")}</div></div></div><div class="table-wrap"><table class="table"><thead><tr><th>Export ID</th><th>${tr("Package Name","اسم الحزمة")}</th><th>${tr("Requestor","الطالب")}</th><th>${tr("Created","تاريخ الإنشاء")}</th><th>${tr("Destination","الوجهة")}</th><th>${tr("Size","الحجم")}</th><th>${tr("Verification","التحقق")}</th><th>${tr("Status","الحالة")}</th><th>${tr("Actions","الإجراءات")}</th></tr></thead><tbody>${D.exports.map(exportRow).join("")}</tbody></table></div></section>`;
  }
  function exportEvidenceItem(e){const checked=state.selectedEvidence.has(e.id);return `<div class="export-item"><button class="check-box" data-select-evidence="${e.id}" style="background:${checked?'#11a36c':'#dfe6ef'}">${checked?icon('check'):''}</button><span><b>${e.id}</b><small style="display:block;color:#7a8899;margin-top:2px">${e.title}</small></span><span>${e.source}</span><span>${e.type}</span><span>${e.size}</span><span class="mono">${e.hash.slice(0,8)}…${e.hash.slice(-4)}</span><a href="#evidence/${e.id}">${icon('eye')}</a></div>`;}
  function exportOption(ic,title,meta,checked){return `<div class="option-row"><span class="check-box" style="background:${checked?'#11a36c':'#dfe6ef'}">${checked?icon('check'):''}</span><span class="option-icon">${icon(ic)}</span><span class="option-copy"><b>${title}</b><span>${meta}</span></span></div>`;}
  function summaryLine(ic,label,value){return `<div class="summary-line">${icon(ic)}<span>${label}</span><b>${value}</b></div>`;}
  function offlineStep(ic,title,meta){return `<div class="offline-step"><span class="offline-icon">${icon(ic)}</span><b>${title}</b><span>${meta}</span></div>`;}
  function exportRow(x){return `<tr><td class="mono">${x.id}</td><td><div class="table-title">${x.name}</div></td><td>${x.requestor}</td><td>${x.created}</td><td>${x.destination}</td><td>${x.size}</td><td><span class="badge badge-success">${icon('check')} ${x.verification}</span></td><td><span class="badge ${x.status==='Delivered'?'badge-blue':'badge-success'}">${x.status}</span></td><td><div class="table-actions"><button class="mini-action">${icon('export')}</button><button class="mini-action">···</button></div></td></tr>`;}

  function runExportSimulation(){
    const selected=D.evidence.filter(e=>state.selectedEvidence.has(e.id));
    if(!selected.length){toast(tr('Select evidence first','حدد الأدلة أولاً'),tr('At least one evidence item is required.','يلزم اختيار دليل واحد على الأقل.'),'warning');return;}
    const stages=[
      [tr('Validate selected evidence','التحقق من الأدلة المحددة'),'SHA-512'],
      [tr('Generate manifest','إنشاء البيان'),'JSON'],
      [tr('Compile custody timeline','تجميع سلسلة الحيازة'),'PDF'],
      [tr('Sign package','توقيع الحزمة'),'Ed25519 concept'],
      [tr('Prepare offline verifier','تجهيز أداة التحقق'),tr('Portable','قابلة للنقل')],
    ];
    showModal({title:tr('Build Technical Package','إنشاء الحزمة الفنية'),subtitle:tr('Simulated export assembly; no real evidence is produced.','تجميع محاكى؛ لا يتم إنشاء دليل حقيقي.'),body:`<div class="ingestion-progress">${stages.map((s,i)=>`<div class="ingestion-stage" data-export-stage="${i}"><span class="stage-status">${icon(i===3?'key':i===4?'shield':i===0?'hash':'file')}</span><span class="stage-copy"><b>${s[0]}</b><span>${s[1]}</span></span><span class="stage-right">${tr('Pending','بانتظار')}</span></div>`).join('')}</div>`});
    const nodes=$$('[data-export-stage]');let i=0;
    const advance=()=>{
      nodes.forEach((n,idx)=>{const status=$('.stage-status',n),right=$('.stage-right',n);if(idx<i){status.className='stage-status done';status.innerHTML=icon('check');right.textContent=tr('Complete','مكتمل')}else if(idx===i){status.className='stage-status active';status.innerHTML=icon('refresh');right.textContent=tr('Processing','قيد التنفيذ')}});
      if(i>=nodes.length){setTimeout(()=>{closeModal();const id=`EXP-DEMO-2026-${String(D.exports.length+18).padStart(4,'0')}`;D.exports.unshift({id,name:`Technical_Package_${Date.now().toString().slice(-5)}`,requestor:'Mohammed Alharthi',created:'1 Aug 2026, 23:10',destination:'Secure Download',size:`${(selected.reduce((s,e)=>s+e.sizeGb,0)*.35).toFixed(2)} GB`,verification:'Ready',status:'Complete'});toast(tr('Technical package completed','اكتملت الحزمة الفنية'),id);render();},350);return;}setTimeout(()=>{i++;advance()},700);
    };advance();
  }

  function renderTenants(){
    const tenant=currentTenant();
    return `${pageHeader("Tenant Administration", "إدارة المؤسسات", "Manage tenant context, security posture, access and consumption.", "إدارة سياق المؤسسة ووضع الأمن والوصول والاستهلاك.", `<button class="btn">${icon('refresh')} ${tr('Refresh','تحديث')}</button>`)}
      <section class="tenant-cards">${D.packages.map((p,i)=>tenantPlanCard(p,i)).join('')}</section>
      <section class="admin-grid section-gap">
        <article class="card"><div class="card-header"><div><div class="card-title">${tr('Billing & Consumption','الفوترة والاستهلاك')}</div><div class="card-subtitle">${tr('Current package and usage','الباقة والاستخدام الحالي')}</div></div><a class="card-link" href="#billing">${tr('View details','عرض التفاصيل')} →</a></div><div class="consumption"><div class="summary-tile" style="border:0;padding:0"><span class="summary-icon" style="background:#efeafa;color:#7d56c7">${icon('chart')}</span><span><span class="summary-label">${tr('Current Plan','الباقة الحالية')}</span><span class="summary-value">${tenant.plan}</span></span></div>${consumptionRow(tr('Storage Allowance','سعة التخزين'),`${tenant.allowance} TB`)}${consumptionRow(tr('Used Storage','التخزين المستخدم'),`${tenant.storage} TB (${Math.round(tenant.storage/tenant.allowance*100)}%)`)}${consumptionRow(tr('Overage','التجاوز'),tenant.storage>tenant.allowance?`${(tenant.storage-tenant.allowance).toFixed(2)} TB`:'0 TB')}${consumptionRow(tr('Connectors in Use','الموصلات المستخدمة'),'5 / 50')}<div class="stacked-bar"><span class="used" style="width:${Math.min(100,tenant.storage/tenant.allowance*100)}%"></span><span class="over"></span></div><div class="consumption-legend"><span>● ${tr('Used','مستخدم')} ${tenant.storage} TB</span><span>● ${tr('Available','متاح')} ${(tenant.allowance-tenant.storage).toFixed(2)} TB</span></div><div class="card-footer" style="margin:12px -14px -14px"><span>${tr('Next billing date','تاريخ الفاتورة القادمة')}: 1 Sep 2026</span><span>${tr('Annual prepaid','سنوي مقدم')}</span></div></div></article>
        <article class="card"><div class="card-header"><div><div class="card-title">${tr('Security Controls','ضوابط الأمن')}</div><div class="card-subtitle">${tr('Tenant-level status','حالة الضوابط على مستوى المؤسسة')}</div></div><a class="card-link" href="#security">${tr('Configure','إعداد')} →</a></div><div class="control-list">${controlRow('key','SSO','SAML 2.0 / Entra ID',tr('Enabled','مفعّل'))}${controlRow('shield','MFA',tr('Required for all users','مطلوب لجميع المستخدمين'),tr('Enforced','مفروض'))}${controlRow('users','RBAC',tr('Least privilege model','نموذج أقل صلاحية'),tr('Enabled','مفعّل'))}${controlRow('key',tr('Key Custody','حيازة المفاتيح'),tr('RM-managed root controls','ضوابط جذر تحت إدارة RM'),tr('Configured','معدّة'))}${controlRow('clock',tr('Retention Policy','سياسة الاحتفاظ'),tr('Immutable retention','احتفاظ غير قابل للتغيير'),tr('Enabled','مفعّل'))}${controlRow('gavel',tr('Legal Hold','الحجز القانوني'),tr('Applied to 27 cases','مطبق على 27 قضية'),tr('Enabled','مفعّل'))}${controlRow('file',tr('Audit Retention','احتفاظ التدقيق'),'7 years','7 years')}</div></article>
        <article class="card"><div class="card-header"><div><div class="card-title">${tr('Users & Access','المستخدمون والوصول')}</div><div class="card-subtitle">${tr('Demo identities and role posture','هويات تجريبية وحالة الأدوار')}</div></div><button class="btn btn-sm">${icon('plus')} ${tr('Add user','إضافة مستخدم')}</button></div><div class="table-wrap"><table class="table"><thead><tr><th>${tr('User','المستخدم')}</th><th>${tr('Last Login','آخر دخول')}</th><th>MFA</th><th>${tr('Role','الدور')}</th></tr></thead><tbody>${D.users.map(userRow).join('')}</tbody></table></div></article>
      </section>
      <section class="admin-lower">
        <article class="card"><div class="card-header"><div><div class="card-title">${tr('Key Management','إدارة المفاتيح')}</div><div class="card-subtitle">${tr('No secret material is shown in this demo','لا يتم عرض أي أسرار في الديمو')}</div></div><a class="card-link" href="#architecture">${tr('Architecture','المعمارية')} →</a></div><div class="control-list">${controlRow('key',tr('KMS Root Layer','طبقة KMS الجذرية'),tr('Approved root-of-trust design','تصميم جذر ثقة معتمد'),tr('Secure','آمن'))}${controlRow('lock',tr('RM-Managed Custody','حيازة تحت إدارة RM'),tr('Keys controlled within approved boundaries','المفاتيح ضمن حدود معتمدة'),tr('Active','نشط'))}${controlRow('refresh',tr('Key Rotation','تدوير المفاتيح'),tr('Policy-driven rotation','تدوير محكوم بالسياسة'),tr('Enabled','مفعّل'))}${controlRow('users',tr('Separation of Duties','فصل المهام'),tr('No single operator controls all layers','لا يتحكم مشغل واحد بكل الطبقات'),tr('Enforced','مفروض'))}</div></article>
        <article class="card"><div class="card-header"><div><div class="card-title">${tr('Policy Configuration','إعداد السياسات')}</div><div class="card-subtitle">${tr('Tenant-defined governance','حوكمة محددة من المؤسسة')}</div></div><button class="btn btn-sm">${icon('edit')} ${tr('Edit policies','تعديل السياسات')}</button></div><div class="control-list">${controlRow('calendar',tr('Default Retention','الاحتفاظ الافتراضي'),'7 years',tr('Immutable','غير قابل للتغيير'))}${controlRow('users',tr('Export Approval Policy','سياسة اعتماد التصدير'),tr('Dual approval required','موافقة مزدوجة'),tr('2 approvers','موافقان'))}${controlRow('export',tr('Technical Export Settings','إعدادات التصدير الفني'),tr('Hash + metadata + custody','بصمة + بيانات + حيازة'),tr('Enabled','مفعّل'))}</div></article>
        <article class="card"><div class="card-header"><div><div class="card-title">${tr('Environment Summary','ملخص البيئة')}</div><div class="card-subtitle">${tr('Target-state concept indicators','مؤشرات الحالة المستهدفة')}</div></div></div><div class="env-list">${envRow('globe',tr('Hosting Target','هدف الاستضافة'),'Saudi Arabia',tr('In-region','داخل المنطقة'))}${envRow('architecture',tr('Architecture','المعمارية'),'Multi-tenant SaaS',tr('Isolated','معزولة'))}${envRow('database',tr('Data Model','نموذج البيانات'),'Immutable Vault','WORM')}${envRow('shield',tr('Monitoring','المراقبة'),tr('Concept status only','حالة محاكاة فقط'),tr('Demo','ديمو'))}</div></article>
      </section>`;
  }
  function tenantPlanCard(p,i){const active=currentTenant().plan.includes(p.short)||state.activePlanId===p.id;return `<button class="tenant-plan ${active?'active':''}" data-plan-context="${p.id}"><span class="active-chip badge ${active?'badge-success':'badge-gray'}">${active?tr('Active','نشط'):tr('Available','متاح')}</span><div class="tenant-plan-head"><span class="tenant-plan-icon">${icon(i===2?'shield':i===3?'architecture':'layers')}</span><div><h4>${p.short}</h4></div></div><div class="tenant-plan-grid"><span>${tr('Plan','الباقة')}<b>${p.short}</b></span><span>${tr('Storage','التخزين')}<b>${p.storage} TB</b></span><span>${tr('Users','المستخدمون')}<b>${p.users}</b></span></div></button>`;}
  function consumptionRow(label,value){return `<div class="consumption-row"><span>${label}</span><b>${value}</b></div>`;}
  function controlRow(ic,title,meta,status){return `<div class="control-row"><span class="control-icon">${icon(ic)}</span><span class="control-copy"><b>${title}</b><span>${meta}</span></span><span class="badge badge-success">${status}</span></div>`;}
  function userRow(u){const tone=u.mfa==='Verified'?'badge-success':u.mfa==='Not Enrolled'?'badge-warning':'badge-gray';return `<tr><td><div class="user-cell"><span class="user-avatar">${initials(u.name)}</span><span><div class="table-title">${u.name}</div><div class="table-sub">${u.email}</div></span></div></td><td>${u.last}</td><td><span class="badge ${tone}">${u.mfa}</span></td><td><span class="badge badge-gray">${u.role}</span></td></tr>`;}
  function envRow(ic,label,value,status){return `<div class="env-row">${icon(ic)}<span class="env-label">${label}</span><span class="env-value">${value}</span><span class="env-status">${status}</span></div>`;}

  function renderSecurity(){
    return `${pageHeader("Security & Compliance Center", "مركز الأمن والامتثال", "Demonstrate controls, evidence and governance without exposing secrets.", "استعراض الضوابط والأدلة والحوكمة دون كشف الأسرار.", `<button class="btn">${icon('export')} ${tr('Export control report','تصدير تقرير الضوابط')}</button>`)}
      <section class="security-hero"><article class="card"><div class="security-score"><div class="score-ring"><div class="score-inner">92<small>/ 100</small></div></div><div class="score-copy"><h3>${tr('Strong Concept Security Posture','وضع أمني تصوري قوي')}</h3><p>${tr('The score reflects simulated configuration status. Production assurance requires implementation evidence, testing and formal acceptance.', 'تعكس النتيجة حالة إعداد محاكاة. يتطلب الضمان الإنتاجي أدلة تنفيذ واختبارات وقبولًا رسميًا.')}</p><div class="button-row" style="margin-top:12px"><span class="badge badge-success">14 ${tr('controls mapped','ضابطًا مرتبطًا')}</span><span class="badge badge-warning">4 ${tr('production gaps','فجوات إنتاجية')}</span><span class="badge badge-blue">8 ${tr('PoC controls','ضوابط PoC')}</span></div></div></div></article><article class="card padded"><div class="card-title">${tr('Security Metrics','مؤشرات الأمن')}</div><div class="security-metrics" style="margin-top:12px"><div class="security-metric"><b>100%</b><span>${tr('Privileged users with MFA','المستخدمون المميزون مع MFA')}</span></div><div class="security-metric"><b>0</b><span>${tr('Hardcoded secrets in demo','أسرار مضمنة في الديمو')}</span></div><div class="security-metric"><b>27</b><span>${tr('Sensitive audit events','أحداث تدقيق حساسة')}</span></div><div class="security-metric"><b>7y</b><span>${tr('Audit retention target','هدف احتفاظ التدقيق')}</span></div></div></article></section>
      <section class="grid grid-2 section-gap"><article class="card"><div class="card-header"><div><div class="card-title">${tr('Control Catalogue','كتالوج الضوابط')}</div><div class="card-subtitle">${tr('Concept state and production boundary','حالة المفهوم وحدود الإنتاج')}</div></div></div><div class="policy-table"><div class="policy-row header"><span>${tr('Control','الضابط')}</span><span>${tr('Purpose','الغرض')}</span><span>${tr('Status','الحالة')}</span><span>${tr('Toggle','التفعيل')}</span></div>${securityPolicyRows()}</div></article><article class="card"><div class="card-header"><div><div class="card-title">${tr('Compliance Evidence Map','خريطة أدلة الامتثال')}</div><div class="card-subtitle">${tr('What a reviewer can inspect in the demo','ما يمكن للمراجع فحصه في الديمو')}</div></div></div><div class="security-list">${securityRow('WORM',tr('Immutable object status and retention reference','حالة عدم التعديل ومرجع الاحتفاظ'))}${securityRow('SHA-512',tr('Registered fingerprint and verification result','البصمة المسجلة ونتيجة التحقق'))}${securityRow(tr('Chain of Custody','سلسلة الحيازة'),tr('Actor, time, action and purpose','الفاعل والوقت والإجراء والغرض'))}${securityRow(tr('RBAC + MFA','التحكم والصلاحيات'),tr('Role-scoped access and MFA posture','وصول حسب الدور وحالة MFA'))}${securityRow(tr('Export Verification','التحقق من التصدير'),tr('Manifest, signature and offline validation','البيان والتوقيع والتحقق دون اتصال'))}${securityRow(tr('Tenant Isolation','عزل المؤسسة'),tr('Tenant context before search and access','تطبيق سياق المؤسسة قبل البحث والوصول'))}</div></article></section>
      <section class="grid grid-3 section-gap"><article class="card padded"><div class="card-title">${tr('Encryption Profile','ملف التشفير')}</div><p class="page-subtitle">AES-256-GCM · 64 MiB chunks · deterministic nonce profile · per-evidence DEK.</p><div class="verify-callout">${icon('key')}<span><b>${tr('No plaintext DEK in the demo','لا يوجد مفتاح بيانات صريح في الديمو')}</b><span>${tr('Only conceptual metadata is displayed.', 'يتم عرض بيانات مفاهيمية فقط.')}</span></span></div></article><article class="card padded"><div class="card-title">${tr('Access Governance','حوكمة الوصول')}</div><p class="page-subtitle">RBAC · MFA · SSO · least privilege · support access expiry.</p><div class="verify-callout">${icon('users')}<span><b>${tr('Controlled support access','وصول دعم محكوم')}</b><span>${tr('Customer approval and time-bounded access are represented.', 'يتم تمثيل موافقة العميل والوصول محدد المدة.')}</span></span></div></article><article class="card padded"><div class="card-title">${tr('Production Assurance','الضمان الإنتاجي')}</div><p class="page-subtitle">Pen test · DR exercise · restore test · performance test · legal review.</p><div class="verify-callout">${icon('alert')}<span><b>${tr('Not yet production accepted','لم يتم القبول الإنتاجي بعد')}</b><span>${tr('The demo intentionally preserves this boundary.', 'يحافظ الديمو بوضوح على هذا الحد.')}</span></span></div></article></section>`;
  }
  function securityPolicyRows(){const rows=[[tr('MFA for privileged users','MFA للمستخدمين المميزين'),tr('Reduce account compromise risk','تقليل مخاطر اختراق الحساب'),tr('Enforced','مفروض'),true],[tr('SSO / Entra ID','SSO / Entra ID'),tr('Central identity lifecycle','دورة حياة هوية مركزية'),tr('Enabled','مفعّل'),true],[tr('Immutable retention','الاحتفاظ غير القابل للتغيير'),tr('Prevent evidence disposal during retention','منع التخلص من الدليل خلال الاحتفاظ'),tr('Configured','معدّ'),true],[tr('Legal Hold','الحجز القانوني'),tr('Override retention expiry','تجاوز انتهاء الاحتفاظ'),tr('Enabled','مفعّل'),true],[tr('Malware scanning','فحص البرمجيات الضارة'),tr('Scan incoming files when available','فحص الملفات عند توفر الخدمة'),tr('Phase 2','المرحلة الثانية'),false],[tr('DR exercise','اختبار التعافي'),tr('Measure actual recovery capability','قياس القدرة الفعلية للتعافي'),tr('Open','مفتوح'),false]];return rows.map(r=>`<div class="policy-row"><span><b>${r[0]}</b></span><span>${r[1]}</span><span class="badge ${r[2]==='Open'||r[2]==='مفتوح'?'badge-warning':r[2].includes('Phase')||r[2].includes('المرحلة')?'badge-purple':'badge-success'}">${r[2]}</span><button class="toggle ${r[3]?'on':''}" data-action="toggle-control" aria-label="Toggle"></button></div>`).join('');}

  function renderBilling(){
    const active=D.packages.find(p=>p.id===state.activePlanId)||D.packages[1];
    return `${pageHeader("Packages, Billing & Value", "الباقات والفوترة والقيمة", "Show package structure, included capacity, add-ons and a simulated client quote.", "اعرض هيكل الباقات والسعة والإضافات وعرض سعر محاكى للعميل.", `<button class="btn">${icon('file')} ${tr('Commercial Notes','الملاحظات التجارية')}</button>`)}
      <section class="billing-layout"><div><div class="pricing-grid">${D.packages.map(pricingCard).join('')}</div><article class="card comparison"><div class="card-header"><div><div class="card-title">${tr('Feature Comparison','مقارنة المميزات')}</div><div class="card-subtitle">${tr('High-level package differentiation for the demo','فروقات الباقات على مستوى العرض')}</div></div></div><div class="table-wrap"><table class="compare-table"><thead><tr><th>${tr('Capability','القدرة')}</th>${D.packages.map(p=>`<th>${p.short}</th>`).join('')}</tr></thead><tbody>${comparisonRows()}</tbody></table></div></article></div><aside class="card calculator"><div class="card-header"><div><div class="card-title">${tr('Interactive Quote Simulator','محاكي عرض السعر')}</div><div class="card-subtitle">${tr('Internal concept calculator — not a binding quotation','حاسبة داخلية تصورية وليست عرضًا ملزمًا')}</div></div></div><div class="calculator-body"><div class="calc-row"><label>${tr('Selected package','الباقة المحددة')}</label><select id="calc-plan" class="select">${D.packages.map(p=>`<option value="${p.id}" ${p.id===active.id?'selected':''}>${p.name}</option>`).join('')}</select></div><div class="calc-row"><label>${tr('Additional storage','التخزين الإضافي')}: <b id="storage-output">0 TB</b></label><input id="calc-storage" class="range" type="range" min="0" max="500" step="10" value="0"/></div><div class="calc-row"><label>${tr('CCTV connector packs','حزم موصل الكاميرات')}: <b id="cctv-output">0</b></label><input id="calc-cctv" class="range" type="range" min="0" max="5" value="0"/></div><div class="calc-row"><label>${tr('Microsoft 365 connector','موصل Microsoft 365')}</label><select id="calc-m365" class="select"><option value="0">${tr('Not included','غير مضاف')}</option><option value="250000">${tr('Add connector','إضافة الموصل')} — 250,000 SAR</option></select></div><div class="calc-row"><label>${tr('AI evidence analysis','تحليل الأدلة بالذكاء الاصطناعي')}</label><select id="calc-ai" class="select"><option value="0">${tr('Not included','غير مضاف')}</option><option value="750000">${tr('Phase 2 add-on','إضافة المرحلة الثانية')} — 750,000 SAR</option></select></div><div class="quote-total"><span>${tr('Estimated first-year value · excl. VAT','القيمة التقديرية للسنة الأولى · دون الضريبة')}</span><b id="quote-total">${sar(active.price+active.onboarding)}</b><small>${tr('Includes annual subscription and onboarding. Usage, custom scope and VAT are separate.', 'يشمل الاشتراك السنوي والتهيئة، ولا يشمل الاستخدام والنطاق المخصص والضريبة.')}</small></div><div class="cost-note">${tr('This simulator explains the commercial model. Final pricing requires an approved Order Form/SOW, confirmed retention, connectors, SLA, capacity and dedicated-infrastructure scope.', 'يشرح المحاكي النموذج التجاري. يتطلب السعر النهائي نموذج طلب ونطاق عمل معتمدين وتحديد الاحتفاظ والموصلات واتفاقية الخدمة والسعة والبنية المخصصة.')}</div></div></aside></section>
      <section class="grid grid-3 section-gap"><article class="card padded"><div class="card-title">${tr('Client Buys Trust, Not Storage Alone','العميل يشتري الثقة لا التخزين فقط')}</div><p class="page-subtitle">${tr('The commercial value combines immutable preservation, verification, custody, governance, support and integrations.', 'تجمع القيمة التجارية بين الحفظ غير القابل للتعديل والتحقق والحيازة والحوكمة والدعم والتكاملات.')}</p></article><article class="card padded"><div class="card-title">${tr('Shared Platform Economics','اقتصاديات المنصة المشتركة')}</div><p class="page-subtitle">${tr('Standard and Professional packages use shared platform capacity; dedicated infrastructure requires separate design and costing.', 'تستخدم الباقات الأساسية سعة منصة مشتركة، بينما تتطلب البنية المخصصة تصميمًا وتسعيرًا منفصلين.')}</p></article><article class="card padded"><div class="card-title">${tr('Commercial Boundary','الحد التجاري')}</div><p class="page-subtitle">${tr('DR implementation, dedicated key custody, private connectivity, migrations and complex integrations are separately contracted.', 'يتم التعاقد منفصلًا على تنفيذ التعافي وحيازة المفاتيح المخصصة والاتصال الخاص والترحيل والتكاملات المعقدة.')}</p></article></section>`;
  }
  function pricingCard(p){return `<article class="pricing-card ${p.popular?'featured':''}" data-pricing-card="${p.id}">${p.popular?`<span class="popular" style="top:12px;bottom:auto">${tr('Most popular','الأكثر طلبًا')}</span>`:''}<div class="pricing-name">${p.name}</div><div class="pricing-desc">${p.description}</div><div class="pricing-price">${sar(p.price)} <small>/ ${tr('year excl. VAT','سنة دون الضريبة')}</small></div><div class="pricing-stats"><div class="pricing-stat"><span>${tr('Storage','التخزين')}</span><b>${p.storage} TB</b></div><div class="pricing-stat"><span>${tr('Users','المستخدمون')}</span><b>${p.users}</b></div><div class="pricing-stat"><span>${tr('Connectors','الموصلات')}</span><b>${p.connectors}</b></div></div><div class="feature-list">${p.features.map(f=>`<div class="feature-item">${icon('check')}<span>${f}</span></div>`).join('')}</div><div class="button-row"><button class="btn btn-primary btn-block" data-select-plan="${p.id}">${tr('Use in quote simulator','استخدم في المحاكي')}</button></div><div class="card-footer" style="margin:12px -15px -15px"><span>${tr('Onboarding','التهيئة')}: ${sar(p.onboarding)}</span><span>${tr('Overage','التجاوز')}: ${sar(p.overage)}/TB/mo</span></div></article>`;}
  function comparisonRows(){const rows=[
    [tr('WORM preservation','الحفظ WORM'),['yes','yes','yes','yes']],
    [tr('SHA-512 verification','التحقق SHA-512'),['yes','yes','yes','yes']],
    [tr('Chain of custody','سلسلة الحيازة'),['yes','yes','yes','yes']],
    [tr('Legal Hold','الحجز القانوني'),['addon','yes','yes','yes']],
    [tr('SSO','الدخول الموحد'),['addon','yes','yes','yes']],
    [tr('Offline verification','التحقق دون اتصال'),['addon','yes','yes','yes']],
    [tr('Dedicated tenant key controls','ضوابط مفاتيح مخصصة'),['no','addon','yes','yes']],
    [tr('Private connectivity','الاتصال الخاص'),['no','addon','addon','yes']],
    [tr('DR service','خدمة التعافي'),['no','no','addon','addon']],
    [tr('AI evidence analysis','تحليل الأدلة بالذكاء الاصطناعي'),['no','addon','addon','addon']],
  ];const label=v=>v==='yes'?`<span class="yes">✓</span>`:v==='addon'?`<span class="addon">${tr('Add-on','إضافة')}</span>`:`<span class="no">—</span>`;return rows.map(r=>`<tr><td>${r[0]}</td>${r[1].map(x=>`<td>${label(x)}</td>`).join('')}</tr>`).join('');}
  function updateQuote(){const p=D.packages.find(x=>x.id===($('#calc-plan')?.value||state.activePlanId))||D.packages[1];const storage=Number($('#calc-storage')?.value||0);const cctv=Number($('#calc-cctv')?.value||0);const m365=Number($('#calc-m365')?.value||0);const ai=Number($('#calc-ai')?.value||0);const total=p.price+p.onboarding+(storage*p.overage*12)+(cctv*300000)+m365+ai;if($('#storage-output'))$('#storage-output').textContent=`${storage} TB`;if($('#cctv-output'))$('#cctv-output').textContent=String(cctv);if($('#quote-total'))$('#quote-total').textContent=sar(total);}

  function renderArchitecture(){
    return `${pageHeader("Sovereign Architecture & Delivery Boundaries", "المعمارية السيادية وحدود التنفيذ", "Explain how evidence trust is designed, what the PoC proved and what remains production-gated.", "شرح تصميم الثقة بالأدلة وما أثبته إثبات المفهوم وما يزال مشروطًا للإنتاج.", `<button class="btn">${icon('presentation')} ${tr('Architecture briefing','ملخص المعمارية')}</button>`)}
      <section class="card"><div class="card-header"><div><div class="card-title">${tr('End-to-End Trust Architecture','معمارية الثقة من البداية للنهاية')}</div><div class="card-subtitle">${tr('Conceptual service flow — not a deployed production topology','تدفق خدمات تصوري وليس بنية إنتاجية منشورة')}</div></div></div><div class="architecture-flow">
        ${archNode('globe',tr('Evidence Sources','مصادر الأدلة'),'CCTV · M365 · Files · SIEM · API',tr('Approved connectors and manual intake','موصلات معتمدة وإدخال يدوي'),'Mapped','blue')}
        ${archNode('shield',tr('Secure Edge','الحافة الآمنة'),'WAF · Load Balancer · EIP',tr('Protect portal and API traffic','حماية حركة البوابة وواجهات API'),'Mapped','green')}
        ${archNode('architecture',tr('Application Platform','منصة التطبيق'),'Portal · APIs · Workers',tr('Tenant workflows, custody and verification','مسارات المؤسسة والحيازة والتحقق'),'Build pending','purple')}
        ${archNode('key',tr('Key Custody','حيازة المفاتيح'),'Tenant DEK · Vault · KMS root',tr('Provider-cannot-decrypt design objective','هدف منع المزود من فك التشفير'),'Profile defined','orange')}
        ${archNode('vault',tr('Immutable Evidence Vault','خزنة الأدلة غير القابلة للتعديل'),'OSS WORM · Versioning',tr('Preserve ciphertext and immutable references','حفظ النص المشفر والمراجع غير القابلة للتغيير'),'PoC validated','green')}
        ${archNode('export',tr('Verification & Export','التحقق والتصدير'),'SHA-512 · Manifest · Signature',tr('Independent technical verification package','حزمة تحقق فني مستقل'),'Design complete','blue')}
      </div></section>
      <section class="boundary-grid section-gap"><article class="card boundary-card"><h3>${tr('Validated in Limited PoC','تم إثباته في PoC محدود')}</h3><ul><li>WORM / Object Lock behavior</li><li>Delete refusal evidence</li><li>AES-256-GCM encryption flow</li><li>KMS-rooted key protection concept</li><li>SHA-512 round-trip integrity</li><li>Versioning and Saudi-region check</li></ul></article><article class="card boundary-card risk"><h3>${tr('Production-Gated Decisions','قرارات مشروطة للإنتاج')}</h3><ul><li>Container / compute operating platform</li><li>Production Vault HA and custody operations</li><li>Managed database, cache and messaging design</li><li>Monitoring, backup and capacity mapping</li><li>Private privileged-access path</li><li>Performance and large-file validation</li></ul></article><article class="card boundary-card out"><h3>${tr('Not Automatically Included by SCCC','غير مشمول تلقائيًا لدى SCCC')}</h3><ul><li>Application development</li><li>Customer connectors and migration</li><li>Application support and database administration</li><li>End-user training</li><li>DR implementation and exercises</li><li>Third-party licenses not listed in the offer</li></ul></article></section>
      <section class="card section-gap"><div class="card-header"><div><div class="card-title">${tr('PoC Acceptance Controls','ضوابط قبول إثبات المفهوم')}</div><div class="card-subtitle">${tr('Eight infrastructure controls represented in the project baseline','ثمانية ضوابط بنية أساسية في خط المشروع الأساسي')}</div></div></div><div class="poc-grid">${[
        ['WORM',tr('Compliance-mode bucket and retention reference','حاوية بوضع الامتثال ومرجع الاحتفاظ')],
        [tr('Immutability','عدم القابلية للتعديل'),tr('Delete attempt refused','رفض محاولة الحذف')],
        [tr('Encryption','التشفير'),'AES-256-GCM + protected DEK'],
        [tr('Round Trip','الدورة الكاملة'),tr('Retrieve, decrypt and match fingerprint','استرجاع وفك تشفير ومطابقة البصمة')],
        [tr('Versioning','الإصدارات'),tr('Object version history enabled','تفعيل سجل إصدارات الكائن')],
        [tr('Residency','إقامة البيانات'),tr('Resources checked in Saudi region','التحقق من الموارد داخل المنطقة السعودية')],
        [tr('Access Control','التحكم بالوصول'),tr('Scoped identities and policies','هويات وسياسات محددة النطاق')],
        ['SHA-512',tr('Test-batch integrity verification','تحقق سلامة لدفعة اختبارية')]
      ].map((x,i)=>`<article class="poc-item"><b>${i+1}. ${x[0]}</b><p>${x[1]}</p><span class="badge badge-success">${tr('PoC evidence','دليل PoC')}</span></article>`).join('')}</div></section>
      <section class="grid grid-3 section-gap"><article class="card padded"><div class="card-title">SCCC by stc</div><p class="page-subtitle">${tr('Cloud infrastructure delivery partner: selected greenfield cloud resources and professional services as contracted.', 'شريك البنية السحابية: موارد وخدمات احترافية محددة وفق التعاقد.')}</p></article><article class="card padded"><div class="card-title">RM TraceVault</div><p class="page-subtitle">${tr('Product authority, custody model, acceptance, customer governance and commercial service definition.', 'سلطة المنتج ونموذج الحيازة والقبول وحوكمة العميل وتعريف الخدمة التجارية.')}</p></article><article class="card padded"><div class="card-title">${tr('Application Vendor','مورد التطبيق')}</div><p class="page-subtitle">${tr('Portal, APIs, workflows, connectors, search, verification, exports, AI scope and managed application services.', 'البوابة والواجهات والمسارات والموصلات والبحث والتحقق والتصدير والذكاء الاصطناعي والخدمات المدارة.')}</p></article></section>`;
  }
  function archNode(ic,name,products,purpose,status,tone){return `<article class="arch-node"><span class="arch-icon ${tone==='green'?'green':tone==='orange'?'orange':tone==='purple'?'purple':''}">${icon(ic)}</span><h4>${name}</h4><div class="arch-products">${products}</div><div class="arch-purpose">${purpose}</div><span class="badge ${status.includes('pending')?'badge-warning':status.includes('PoC')?'badge-blue':'badge-success'}">${status}</span></article>`;}

  function renderSettings(){
    return `${pageHeader("Demo Settings", "إعدادات الديمو", "Configure presentation preferences and company information stored in this browser.", "إعداد تفضيلات العرض ومعلومات الشركة المحفوظة في هذا المتصفح.", `<button class="btn btn-primary" data-action="save-settings">${icon('check')} ${tr('Save Changes','حفظ التغييرات')}</button>`)}
      <section class="settings-grid"><article class="card settings-section"><h3>${tr('Company Profile','ملف الشركة')}</h3><div class="form-grid"><div class="form-field"><label>${tr('Company Name','اسم الشركة')}</label><input class="input" value="${D.product.company}"/></div><div class="form-field"><label>${tr('Website','الموقع')}</label><input class="input" value="${D.product.domain}"/></div><div class="form-field"><label>${tr('Email','البريد الإلكتروني')}</label><input class="input" value="${D.product.email}"/></div><div class="form-field"><label>${tr('Location','الموقع الجغرافي')}</label><input class="input" value="${D.product.location}"/></div></div><div class="verify-callout section-gap">${icon('info')}<span><b>${tr('Demo-only settings','إعدادات الديمو فقط')}</b><span>${tr('Values are not sent to a server or external service.', 'لا يتم إرسال القيم إلى خادم أو خدمة خارجية.')}</span></span></div></article><article class="card settings-section"><h3>${tr('Presentation Preferences','تفضيلات العرض')}</h3>${settingRow(tr('Arabic / English interface','واجهة عربية / إنجليزية'),tr('Switch the complete demo direction and main labels','تبديل اتجاه الديمو والعناوين الرئيسية'),`<button class="btn btn-sm" data-action="language">${state.lang==='ar'?'English':'العربية'}</button>`)}${settingRow(tr('Presentation mode','وضع العرض'),tr('Hide sidebar for investor presentations','إخفاء القائمة أثناء عروض المستثمرين'),`<button class="toggle ${state.presentation?'on':''}" data-action="presentation"></button>`)}${settingRow(tr('Investor guided tour','جولة المستثمر'),tr('Six-step narrative through the concept','مسار من ست خطوات لشرح المفهوم'),`<button class="btn btn-sm" data-action="tour">${icon('play')} ${tr('Start','ابدأ')}</button>`)}${settingRow(tr('Reset simulated data','إعادة البيانات التجريبية'),tr('Restore evidence, exports and local preferences','استعادة الأدلة والتصديرات والتفضيلات'),`<button class="btn btn-danger btn-sm" data-action="reset-demo">${tr('Reset','إعادة')}</button>`)}</article></section>
      <section class="grid grid-3 section-gap"><article class="card padded"><div class="card-title">${tr('Source Ownership','ملكية المصدر')}</div><p class="page-subtitle">${tr('The production source repository must remain owned and controlled by RM TraceVault. This demo package is prepared for transfer to an RM-controlled repository.', 'يجب أن يبقى مستودع المصدر الإنتاجي مملوكًا وتحت سيطرة RM TraceVault. أعدت حزمة الديمو للنقل إلى مستودع تسيطر عليه RM.')}</p></article><article class="card padded"><div class="card-title">${tr('Data Handling','معالجة البيانات')}</div><p class="page-subtitle">${tr('The static demo uses local simulated records only. It has no database, authentication provider, evidence storage or cloud integration.', 'يستخدم الديمو الساكن سجلات محاكاة محلية فقط، ولا يتضمن قاعدة بيانات أو مزود هوية أو تخزين أدلة أو تكاملًا سحابيًا.')}</p></article><article class="card padded"><div class="card-title">${tr('Deployment Target','هدف النشر')}</div><p class="page-subtitle">${tr('Designed as a static Vercel-ready concept website. Production deployment remains subject to the Saudi-hosting and security architecture.', 'صُمم كموقع مفهوم ساكن جاهز لـVercel. يظل النشر الإنتاجي خاضعًا لمعمارية الاستضافة السعودية والأمن.')}</p></article></section>`;
  }
  function settingRow(title,meta,control){return `<div class="setting-row"><span class="setting-copy"><b>${title}</b><span>${meta}</span></span><span>${control}</span></div>`;}

  function attachPageEvents(){
    // Shared copy actions
    $$('[data-copy]').forEach((el)=>el.addEventListener('click',()=>{
      const value=el.dataset.copy||'';
      navigator.clipboard?.writeText(value).catch(()=>{});
      toast(tr('Copied','تم النسخ'),value);
    }));
    $$('[data-quick-export]').forEach((el)=>el.addEventListener('click',()=>{state.selectedEvidence=new Set([el.dataset.quickExport]);location.hash='exports';}));
    $('[data-action="quick-export"]')?.addEventListener('click',(e)=>{state.selectedEvidence=new Set([e.currentTarget.dataset.id]);location.hash='exports';});
    $('[data-action="new-ingestion"]')?.addEventListener('click',openIngestionModal);
    $('[data-action="refresh"]')?.addEventListener('click',()=>toast(tr('Dashboard refreshed','تم تحديث اللوحة'),tr('Simulated values are up to date.','القيم المحاكية محدثة.')));
    $('[data-action="date-range"]')?.addEventListener('click',()=>toast(tr('Demo time range','النطاق الزمني للديمو'),tr('The current concept uses a fixed seven-day view.','يستخدم هذا المفهوم عرضًا ثابتًا لسبعة أيام.'),'warning'));

    // Evidence filters and actions
    $('[data-action="evidence-filter"]')?.addEventListener('click',()=>{
      state.evidenceQuery=$('#evidence-search')?.value||'';
      state.evidenceType=$('#evidence-type')?.value||'All';
      render();
    });
    $('#evidence-search')?.addEventListener('keydown',(e)=>{if(e.key==='Enter'){state.evidenceQuery=e.currentTarget.value;state.evidenceType=$('#evidence-type')?.value||'All';render();}});
    $('[data-action="verify-batch"]')?.addEventListener('click',()=>simulateSimpleProcess(tr('Batch Verification','التحقق من الدفعة'),[tr('Load fingerprints','تحميل البصمات'),tr('Recompute SHA-512','إعادة حساب SHA-512'),tr('Compare records','مقارنة السجلات'),tr('Write audit results','حفظ نتائج التدقيق')],()=>toast(tr('Batch verification passed','نجح التحقق من الدفعة'),'6 / 6 SHA-512 matches')));
    $('[data-action="verify-evidence"]')?.addEventListener('click',(e)=>simulateSimpleProcess(tr('Verify Evidence Integrity','التحقق من سلامة الدليل'),[tr('Retrieve immutable reference','استرجاع المرجع غير القابل للتعديل'),tr('Recompute SHA-512','إعادة حساب SHA-512'),tr('Compare registered fingerprint','مقارنة البصمة المسجلة')],()=>toast(tr('Integrity verified','تم التحقق من السلامة'),e.currentTarget.dataset.id)));
    $('[data-action="legal-hold"]')?.addEventListener('click',(e)=>{
      const ev=D.evidence.find(x=>x.id===e.currentTarget.dataset.id);if(!ev)return;
      ev.legalHold=!ev.legalHold;
      toast(ev.legalHold?tr('Legal hold applied','تم تطبيق الحجز القانوني'):tr('Legal hold released','تم رفع الحجز القانوني'),ev.id,ev.legalHold?'warning':'success');
      render();
    });
    $('[data-action="transfer-custody"]')?.addEventListener('click',(e)=>openCustodyModal(e.currentTarget.dataset.id));
    $('[data-action="add-case"]')?.addEventListener('click',()=>toast(tr('Evidence linked to case','تم ربط الدليل بالقضية'),tr('A simulated case link was created.','تم إنشاء ربط محاكى بالقضية.')));

    // Ingestion connectors
    $$('[data-connector]').forEach((el)=>el.addEventListener('click',()=>{
      const c=D.connectors.find(x=>x.id===el.dataset.connector);
      toast(c.name,c.status==='Pending Setup'?tr('Tenant consent is required before activation.','يلزم تفويض المؤسسة قبل التفعيل.'):tr('Connector details are simulated in this concept demo.','تفاصيل الموصل محاكاة في هذا الديمو.'),c.status==='Pending Setup'?'warning':'success');
    }));

    // Cases and search
    $('[data-action="case-action"]')?.addEventListener('click',()=>toast(tr('Case actions','إجراءات القضية'),tr('Legal hold, custody transfer, export approval and closure can be configured in production.','يمكن إعداد الحجز ونقل الحيازة واعتماد التصدير والإغلاق في الإنتاج.'),'warning'));
    $('[data-action="case-search"]')?.addEventListener('click',()=>{const q=$('#case-search')?.value||'';toast(tr('Search completed','اكتمل البحث'),q?`${tr('Results filtered for','تمت التصفية حسب')}: ${q}`:tr('Showing authorized evidence results.','عرض نتائج الأدلة المصرح بها.'));});
    $('[data-action="add-note"]')?.addEventListener('click',()=>{
      const area=$('#case-note');const value=area?.value.trim();if(!value){toast(tr('Enter a note','أدخل ملاحظة'),tr('The note field is empty.','حقل الملاحظة فارغ.'),'warning');return;}
      const row=document.createElement('div');row.className='note-item';row.innerHTML=`<span class="note-avatar">MA</span><div class="note-copy"><div class="note-head">Mohammed Alharthi · ${tr('Demo Admin','مسؤول الديمو')}</div>${escapeHtml(value)}</div>`;$('#notes-list')?.prepend(row);area.value='';toast(tr('Note added','تمت إضافة الملاحظة'),tr('Stored in the current browser session only.','محفوظة في جلسة المتصفح الحالية فقط.'));
    });
    $('[data-action="global-search"]')?.addEventListener('click',()=>{
      const q=($('#global-search')?.value||'').toLowerCase();
      const rows=$$('#global-results tbody tr');let shown=0;
      rows.forEach(r=>{const show=!q||r.textContent.toLowerCase().includes(q);r.style.display=show?'':'none';if(show)shown++;});
      toast(tr('Search completed','اكتمل البحث'),`${shown} ${tr('authorized results','نتيجة مصرح بها')}`);
    });

    // Exports
    $$('[data-select-evidence]').forEach((el)=>el.addEventListener('click',()=>{
      const id=el.dataset.selectEvidence;state.selectedEvidence.has(id)?state.selectedEvidence.delete(id):state.selectedEvidence.add(id);render();
    }));
    $$('[data-action="build-export"]').forEach((el)=>el.addEventListener('click',runExportSimulation));

    // Tenants and security
    $$('[data-plan-context]').forEach((el)=>el.addEventListener('click',()=>{state.activePlanId=el.dataset.planContext;toast(tr('Package context selected','تم تحديد سياق الباقة'),D.packages.find(p=>p.id===state.activePlanId)?.name);render();}));
    $$('[data-action="toggle-control"]').forEach((el)=>el.addEventListener('click',()=>{el.classList.toggle('on');toast(tr('Control state changed','تم تغيير حالة الضابط'),tr('Demo UI only — no production setting changed.','واجهة تجريبية فقط؛ لم يتغير أي إعداد إنتاجي.'),'warning');}));

    // Billing calculator
    $('#calc-plan')?.addEventListener('change',(e)=>{state.activePlanId=e.currentTarget.value;updateQuote();});
    $('#calc-storage')?.addEventListener('input',updateQuote);
    $('#calc-cctv')?.addEventListener('input',updateQuote);
    $('#calc-m365')?.addEventListener('change',updateQuote);
    $('#calc-ai')?.addEventListener('change',updateQuote);
    $$('[data-select-plan]').forEach((el)=>el.addEventListener('click',()=>{state.activePlanId=el.dataset.selectPlan;render();setTimeout(()=>$('.calculator')?.scrollIntoView({behavior:'smooth',block:'start'}),80);}));

    // Settings
    $('[data-action="save-settings"]')?.addEventListener('click',()=>toast(tr('Settings saved','تم حفظ الإعدادات'),tr('Saved locally in this browser for the demo.','تم الحفظ محليًا في هذا المتصفح للديمو.')));
    $('[data-action="reset-demo"]')?.addEventListener('click',()=>{
      localStorage.removeItem('tv_lang');localStorage.removeItem('tv_tenant');localStorage.removeItem('tv_presentation');
      state.lang='en';state.tenantId='alsafa';state.presentation=false;state.activePlanId='professional';state.evidenceQuery='';state.evidenceType='All';state.selectedEvidence=new Set(D.evidence.slice(0,5).map(e=>e.id));
      toast('Demo reset','Local preferences restored.');location.hash='overview';
    });
  }

  function escapeHtml(s){return s.replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}

  function openCustodyModal(id){
    const ev=D.evidence.find(x=>x.id===id);if(!ev)return;
    showModal({title:tr('Transfer Custody','نقل الحيازة'),subtitle:ev.id,body:`<div class="form-grid"><div class="form-field"><label>${tr('Current custodian','الحائز الحالي')}</label><input class="input" value="${ev.actor}" disabled/></div><div class="form-field"><label>${tr('New custodian','الحائز الجديد')}</label><select id="custody-user" class="select">${D.users.filter(u=>u.name!==ev.actor).map(u=>`<option>${u.name}</option>`).join('')}</select></div><div class="form-field" style="grid-column:1/-1"><label>${tr('Transfer reason','سبب النقل')}</label><textarea id="custody-reason" class="textarea">${tr('Investigation responsibility transfer','نقل مسؤولية التحقيق')}</textarea></div></div>`,footer:`<button class="btn" data-action="modal-close-2">${tr('Cancel','إلغاء')}</button><button class="btn btn-primary" data-action="confirm-custody">${icon('transfer')} ${tr('Confirm transfer','تأكيد النقل')}</button>`});
    $('[data-action="modal-close-2"]')?.addEventListener('click',closeModal);
    $('[data-action="confirm-custody"]')?.addEventListener('click',()=>{ev.actor=$('#custody-user')?.value||ev.actor;closeModal();toast(tr('Custody transferred','تم نقل الحيازة'),`${ev.id} → ${ev.actor}`);render();});
  }

  function simulateSimpleProcess(title,stages,onDone){
    showModal({title,subtitle:tr('Simulated workflow; no production operation is performed.','مسار محاكى؛ لا يتم تنفيذ عملية إنتاجية.'),body:`<div class="ingestion-progress">${stages.map((s,i)=>`<div class="ingestion-stage" data-simple-stage="${i}"><span class="stage-status">${icon(i===1?'hash':i===2?'check':'file')}</span><span class="stage-copy"><b>${s}</b><span>${tr('Pending','بانتظار')}</span></span><span class="stage-right">—</span></div>`).join('')}</div>`});
    const nodes=$$('[data-simple-stage]');let i=0;const advance=()=>{nodes.forEach((n,idx)=>{const st=$('.stage-status',n),right=$('.stage-right',n),sub=$('.stage-copy span',n);if(idx<i){st.className='stage-status done';st.innerHTML=icon('check');sub.textContent=tr('Complete','مكتمل');right.textContent='✓'}else if(idx===i){st.className='stage-status active';st.innerHTML=icon('refresh');sub.textContent=tr('Processing','قيد التنفيذ');right.textContent='…'}});if(i>=nodes.length){setTimeout(()=>{closeModal();onDone?.()},250);return;}setTimeout(()=>{i++;advance()},550)};advance();
  }

  function render(){
    const route=currentRoute();
    let html='';
    if(route==='overview') html=renderOverview();
    else if(route==='evidence') html=renderEvidenceVault();
    else if(route.startsWith('evidence/')) html=renderEvidenceDetail(route.split('/')[1]);
    else if(route==='ingestion') html=renderIngestion();
    else if(route==='cases') html=renderCases();
    else if(route==='search') html=renderSearch();
    else if(route==='exports') html=renderExports();
    else if(route==='tenants') html=renderTenants();
    else if(route==='security') html=renderSecurity();
    else if(route==='billing') html=renderBilling();
    else if(route==='architecture') html=renderArchitecture();
    else if(route==='settings') html=renderSettings();
    else { location.hash='overview'; return; }
    renderShell(html);
    attachPageEvents();
  }

  window.addEventListener('hashchange',()=>{state.notificationOpen=false;state.sidebarOpen=false;render();});
  window.addEventListener('keydown',(e)=>{if(e.key==='Escape'){closeModal();state.notificationOpen=false;state.tourOpen=false;render();}});
  if(!location.hash) location.hash='overview'; else render();
})();
