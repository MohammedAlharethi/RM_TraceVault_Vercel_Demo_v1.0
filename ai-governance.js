(() => {
  "use strict";

  const MODULE_VERSION = "1.0";
  const ROUTE = "ai-development-governance";
  const modalRoot = document.getElementById("modal-root");
  const toastRoot = document.getElementById("toast-root");
  const app = document.getElementById("app");

  if (!app || !modalRoot || !toastRoot) return;

  const state = {
    selected: "DEV-AI-2026-00821",
    tool: "all",
    status: "all"
  };

  const I18N = {
    en: {
      nav: "AI Development Governance",
      planned: "PLANNED",
      kicker: "FUTURE PRODUCT · CONCEPT PREVIEW",
      title: "AI Development Evidence & Governance",
      description: "A planned Saudi product module that records AI-assisted software-development activity, applies approval policies, and preserves release evidence inside RM TraceVault.",
      disclaimerTitle: "Concept preview — not an operating monitoring service",
      disclaimer: "This public demo uses fictional sessions and simulates the target experience. No IDE agent, repository hook, policy engine, backend capture, production enforcement or live monitoring is connected.",
      startTour: "Run concept walkthrough",
      generate: "Generate demo evidence package",
      sessions: "Recorded AI development sessions",
      sessionsSub: "Fictional, tenant-bound session records for presentation only.",
      detail: "Session evidence detail",
      policy: "Policy control simulations",
      policySub: "Show how a future policy engine could block unsafe actions before merge or release.",
      provenance: "Code provenance overview",
      architecture: "Target product flow",
      architectureSub: "Conceptual flow from development tools to a protected evidence package.",
      roadmap: "Delivery roadmap",
      roadmapSub: "Truthful status labels separate designed experience from future implementation and acceptance.",
      teaserTitle: "Future product concept: AI Development Governance",
      teaserText: "Extend RM TraceVault from evidence preservation into auditable AI-assisted software delivery, with session lineage, policy gates and release evidence packages.",
      open: "Open concept preview",
      run: "Run simulation",
      close: "Close",
      all: "All",
      verified: "Verified",
      blocked: "Blocked",
      review: "Review",
      recorded: "Recorded",
      fictional: "Fictional data",
      noClaim: "No production claim"
    },
    ar: {
      nav: "حوكمة تطوير البرمجيات بالذكاء الاصطناعي",
      planned: "مخطط",
      kicker: "منتج مستقبلي · عرض تصوري",
      title: "أدلة وحوكمة تطوير البرمجيات بالذكاء الاصطناعي",
      description: "وحدة منتج سعودية مخطط لها لتوثيق أنشطة تطوير البرمجيات المدعومة بالذكاء الاصطناعي، وتطبيق سياسات الاعتماد، وحفظ أدلة الإصدارات داخل RM TraceVault.",
      disclaimerTitle: "عرض تصوري — وليس خدمة مراقبة تشغيلية",
      disclaimer: "يستخدم هذا الديمو جلسات افتراضية ويحاكي التجربة المستهدفة. لا يوجد وكيل IDE أو ربط فعلي بالمستودعات أو محرك سياسات أو خادم التقاط أو منع إنتاجي أو مراقبة مباشرة.",
      startTour: "تشغيل الجولة التصورية",
      generate: "إنشاء حزمة دليل تجريبية",
      sessions: "جلسات تطوير الذكاء الاصطناعي المسجلة",
      sessionsSub: "سجلات جلسات افتراضية مرتبطة بالمؤسسة ومخصصة للعرض فقط.",
      detail: "تفاصيل دليل الجلسة",
      policy: "محاكاة ضوابط السياسات",
      policySub: "توضيح كيف يمكن لمحرك السياسات المستقبلي منع الإجراءات غير الآمنة قبل الدمج أو الإصدار.",
      provenance: "نظرة عامة على مصدر الكود",
      architecture: "تدفق المنتج المستهدف",
      architectureSub: "تدفق تصوري من أدوات التطوير إلى حزمة دليل محمية.",
      roadmap: "خارطة التنفيذ",
      roadmapSub: "حالات صادقة تفصل بين التجربة المصممة والتنفيذ المستقبلي والقبول.",
      teaserTitle: "تصور منتج مستقبلي: حوكمة تطوير البرمجيات بالذكاء الاصطناعي",
      teaserText: "توسيع RM TraceVault من حفظ الأدلة إلى تسليم برمجي قابل للتدقيق، مع نسب الجلسات وبوابات السياسات وحزم أدلة الإصدارات.",
      open: "فتح العرض التصوري",
      run: "تشغيل المحاكاة",
      close: "إغلاق",
      all: "الكل",
      verified: "تم التحقق",
      blocked: "محظور",
      review: "قيد المراجعة",
      recorded: "مسجل",
      fictional: "بيانات افتراضية",
      noClaim: "لا يوجد ادعاء إنتاجي"
    }
  };

  const sessions = [
    {
      id: "DEV-AI-2026-00821",
      project: "Claims Portal API",
      tool: "Codex",
      toolCode: "CX",
      profile: "Approved Coding Profile A",
      engineer: "Demo Engineer A",
      repository: "claims-api",
      branch: "feature/claim-validation",
      commit: "a81f2c7",
      status: "Verified",
      aiShare: 38,
      humanShare: 62,
      policy: "All gates passed",
      cost: "SAR 21.40",
      tokens: "184K",
      files: 12,
      additions: 684,
      deletions: 97,
      started: "04 Aug 2026, 09:14 AST",
      completed: "04 Aug 2026, 10:02 AST",
      sha512: "e5ae4b21bb644b8df471aed86d04aecb4bad7f180337ac6d1d0c7cb909b06604eec5e7d34fcbb81809045efda8ad2a85945df2dc3dca512595c2cda1b793e557",
      events: [
        ["09:14", "Session opened", "Approved developer identity and repository context registered."],
        ["09:18", "Prompt captured", "Validation rules requested under the approved coding profile."],
        ["09:27", "Files changed", "12 files modified; sensitive-path policy returned no violations."],
        ["09:44", "Security tests passed", "Secret scan, dependency scan and unit-test gate completed."],
        ["09:58", "Human approval", "Demo Reviewer A approved the proposed changes."],
        ["10:02", "Release evidence sealed", "Manifest and session lineage prepared for immutable preservation."]
      ]
    },
    {
      id: "DEV-AI-2026-00820",
      project: "Payments Rules Engine",
      tool: "Claude Code",
      toolCode: "CC",
      profile: "Approved Coding Profile B",
      engineer: "Demo Engineer B",
      repository: "payments-rules",
      branch: "feature/routing-policy",
      commit: "d042e11",
      status: "Blocked",
      aiShare: 64,
      humanShare: 36,
      policy: "Sensitive path blocked",
      cost: "SAR 35.70",
      tokens: "296K",
      files: 8,
      additions: 421,
      deletions: 112,
      started: "04 Aug 2026, 08:22 AST",
      completed: "04 Aug 2026, 08:47 AST",
      sha512: "ae4f660da3f72be5d9f41e5b2a2d2ad81bee7bba65d69ec60efa694c17dd7c36646741613cd3b1d3b16601c16e709e00f81c79862f78ddf4981aafd4df597f59",
      events: [
        ["08:22", "Session opened", "Developer and approved model profile registered."],
        ["08:28", "Prompt captured", "Routing policy refactor requested."],
        ["08:39", "Sensitive path detected", "Attempted change touched protected payment-authorization rules."],
        ["08:40", "Policy decision", "Merge and release were blocked pending security-owner approval."],
        ["08:47", "Evidence preserved", "Blocked decision and unchanged protected branch state recorded."]
      ]
    },
    {
      id: "DEV-AI-2026-00819",
      project: "Evidence Intake UI",
      tool: "GitHub Copilot",
      toolCode: "CP",
      profile: "Approved Coding Profile C",
      engineer: "Demo Engineer C",
      repository: "evidence-intake-ui",
      branch: "feature/accessibility",
      commit: "9f33b02",
      status: "Review",
      aiShare: 27,
      humanShare: 73,
      policy: "Human approval pending",
      cost: "SAR 8.90",
      tokens: "76K",
      files: 16,
      additions: 502,
      deletions: 144,
      started: "03 Aug 2026, 15:04 AST",
      completed: "03 Aug 2026, 16:18 AST",
      sha512: "b184cf91c80f7a4275cc4f2051e175935ac099f04d553d1cb0b48759ad75adf2e402419f4f2426922e67759d259ab1e8657acc094630c76298302ab1c3c0dac4",
      events: [
        ["15:04", "Session opened", "Repository, branch and developer identity registered."],
        ["15:11", "Suggestions captured", "Accessibility improvements suggested for upload workflow."],
        ["15:46", "Automated checks passed", "Lint, unit tests and accessibility scan completed."],
        ["16:18", "Human review requested", "Final approval remains pending; no release package issued."]
      ]
    },
    {
      id: "DEV-AI-2026-00818",
      project: "Audit Export Worker",
      tool: "Cursor",
      toolCode: "CR",
      profile: "Approved Coding Profile D",
      engineer: "Demo Engineer D",
      repository: "audit-export-worker",
      branch: "fix/csv-encoding",
      commit: "c718ae4",
      status: "Verified",
      aiShare: 44,
      humanShare: 56,
      policy: "All gates passed",
      cost: "SAR 14.20",
      tokens: "121K",
      files: 6,
      additions: 188,
      deletions: 54,
      started: "03 Aug 2026, 11:33 AST",
      completed: "03 Aug 2026, 12:09 AST",
      sha512: "6e5054db1bd72b91f7b6877e697cb975c665c4182a797547aa2999ee605ac45f5f276b6203a3e3aa087173e5edf983d75e722ea5d73233051ebe672204b7b39c",
      events: [
        ["11:33", "Session opened", "Approved repository and coding profile registered."],
        ["11:41", "Change generated", "CSV encoding fix proposed with Arabic test fixtures."],
        ["11:54", "Tests passed", "Arabic export, regression and secret scans passed."],
        ["12:04", "Human approval", "Demo Reviewer B approved the change."],
        ["12:09", "Release evidence sealed", "Session manifest and release lineage prepared."]
      ]
    }
  ];

  const policies = [
    ["models", "Approved model catalogue", "Allow only organization-approved coding tools and model profiles.", "shield-check", "Unapproved model blocked"],
    ["paths", "Sensitive-path protection", "Require security-owner approval for payment, identity, cryptography and deployment paths.", "lock", "Protected path blocked"],
    ["secrets", "Secrets & data-loss scan", "Stop changes containing credentials, tokens, customer data or prohibited content.", "search", "Secret exposure blocked"],
    ["tests", "Test and security gate", "Require unit, dependency, lint and security checks before merge or release.", "check", "Missing test gate blocked"],
    ["approval", "Human approval", "Keep accountable human review for material AI-generated changes.", "users", "Approval required"],
    ["evidence", "Release evidence preservation", "Package session lineage, commits, approvals, checks and fingerprints for WORM preservation.", "package", "Evidence package prepared"]
  ];

  const icons = {
    sparkles: '<path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3zM5 16l.9 2.1L8 19l-2.1.9L5 22l-.9-2.1L2 19l2.1-.9L5 16z"/>',
    code: '<path d="M8 9l-3 3 3 3M16 9l3 3-3 3M14 5l-4 14"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-5"/>',
    "shield-check": '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-5"/>',
    lock: '<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 018 0v3M12 14v3"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
    check: '<path d="M5 12l4 4L19 6"/>',
    users: '<path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>',
    package: '<path d="M21 8l-9-5-9 5 9 5 9-5z"/><path d="M3 8v8l9 5 9-5V8M12 13v8"/>',
    activity: '<path d="M3 12h4l2-5 4 10 2-5h6"/>',
    document: '<path d="M5 3h9l5 5v13H5V3z"/><path d="M14 3v5h5M8 13h8M8 17h6"/>',
    git: '<circle cx="12" cy="12" r="2"/><circle cx="6" cy="6" r="2"/><circle cx="18" cy="18" r="2"/><path d="M7.5 7.5l3 3M13.5 13.5l3 3M12 10V6"/>',
    warning: '<path d="M10.3 3.5L2.7 17a2 2 0 001.8 3h15a2 2 0 001.8-3L13.7 3.5a2 2 0 00-3.4 0z"/><path d="M12 9v4M12 17h.01"/>',
    download: '<path d="M12 3v12M7 10l5 5 5-5M4 21h16"/>',
    play: '<circle cx="12" cy="12" r="9"/><path d="M10 8l6 4-6 4V8z"/>',
    x: '<path d="M6 6l12 12M18 6L6 18"/>',
    fingerprint: '<path d="M12 11a3 3 0 00-3 3c0 3-1 5-2 6M15 14a6 6 0 01-2 5M6 14a6 6 0 0112 0c0 4-1 6-2 7M8 9a6 6 0 018-1M5 8a9 9 0 0114 1"/>'
  };

  const lang = () => document.documentElement.lang === "ar" || document.documentElement.dir === "rtl" ? "ar" : "en";
  const tr = key => I18N[lang()][key] || I18N.en[key] || key;
  const esc = value => String(value ?? "").replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
  const icon = name => `<svg viewBox="0 0 24 24" aria-hidden="true" stroke-linecap="round" stroke-linejoin="round">${icons[name] || icons.shield}</svg>`;
  const badge = (text, tone = "blue") => `<span class="badge ${tone}">${esc(text)}</span>`;
  const button = (text, action, tone = "", iconName = "play") => `<button type="button" class="btn ${tone}" data-aig-action="${esc(action)}">${icon(iconName)}<span>${esc(text)}</span></button>`;
  const route = () => location.hash.replace(/^#\/?/, "").split("/")[0] || "overview";
  const selected = () => sessions.find(item => item.id === state.selected) || sessions[0];
  const statusTone = status => status === "Verified" ? "green" : status === "Blocked" ? "red" : "amber";
  const localizedStatus = status => status === "Verified" ? tr("verified") : status === "Blocked" ? tr("blocked") : tr("review");

  function installNav() {
    const nav = document.querySelector(".nav-scroll");
    if (!nav || nav.querySelector('[data-aig-route="ai-development-governance"]')) return;
    const coreAi = nav.querySelector('[data-route="ai"]');
    const item = document.createElement("button");
    item.type = "button";
    item.className = "nav-item aig-nav";
    item.dataset.aigRoute = ROUTE;
    item.innerHTML = `${icon("code")}<span>${esc(tr("nav"))}</span><span class="aig-nav-tag">${esc(tr("planned"))}</span>`;
    if (coreAi) coreAi.insertAdjacentElement("afterend", item);
    else nav.appendChild(item);
  }

  function updateActiveNav() {
    const custom = document.querySelector(`[data-aig-route="${ROUTE}"]`);
    if (!custom) return;
    if (route() === ROUTE) {
      document.querySelectorAll(".nav-item.active").forEach(item => item.classList.remove("active"));
      custom.classList.add("active");
    } else {
      custom.classList.remove("active");
    }
  }

  function addTeaser() {
    if (route() !== "ai") return;
    const content = document.querySelector(".content");
    if (!content || content.querySelector(".aig-teaser")) return;
    const teaser = document.createElement("section");
    teaser.className = "aig-teaser";
    teaser.innerHTML = `<div class="aig-teaser-head"><div><h3>${esc(tr("teaserTitle"))}</h3><p>${esc(tr("teaserText"))}</p></div><div class="aig-teaser-actions">${badge(tr("planned"), "purple")}${button(tr("open"), "open-module", "primary", "code")}</div></div>`;
    const boundary = content.querySelector(".ai-boundary");
    if (boundary) boundary.insertAdjacentElement("afterend", teaser);
    else content.appendChild(teaser);
  }

  function sessionRows() {
    const filtered = sessions.filter(item => (state.tool === "all" || item.tool === state.tool) && (state.status === "all" || item.status === state.status));
    return filtered.map(item => `<tr class="${item.id === state.selected ? "selected" : ""}" data-aig-session="${esc(item.id)}" tabindex="0" role="button" aria-label="${esc(`${item.id} ${item.project}`)}"><td><span class="aig-session-id">${esc(item.id)}</span><span class="aig-session-name">${esc(item.project)}</span></td><td><div class="aig-tool"><i>${esc(item.toolCode)}</i><span>${esc(item.tool)}</span></div></td><td>${esc(item.engineer)}</td><td><code>${esc(item.commit)}</code></td><td>${item.aiShare}%</td><td>${badge(localizedStatus(item.status), statusTone(item.status))}</td><td>${esc(item.policy)}</td></tr>`).join("") || `<tr><td colspan="7">${lang() === "ar" ? "لا توجد نتائج مطابقة." : "No matching sessions."}</td></tr>`;
  }

  function detailPanel() {
    const item = selected();
    return `<div class="aig-detail"><div class="aig-detail-summary"><div class="aig-trust-head"><div><span class="aig-session-id">${esc(item.id)}</span><h3>${esc(item.project)}</h3><p>${esc(item.repository)} · ${esc(item.branch)}</p></div>${badge(localizedStatus(item.status), statusTone(item.status))}</div><div class="aig-meta">${[
      [lang() === "ar" ? "المطور" : "Engineer", item.engineer],
      [lang() === "ar" ? "الأداة" : "Tool", item.tool],
      [lang() === "ar" ? "ملف الاعتماد" : "Profile", item.profile],
      [lang() === "ar" ? "الالتزام" : "Commit", item.commit],
      [lang() === "ar" ? "الرموز" : "Tokens", item.tokens],
      [lang() === "ar" ? "التكلفة" : "Cost", item.cost],
      [lang() === "ar" ? "الملفات" : "Files changed", item.files],
      [lang() === "ar" ? "النتيجة" : "Policy result", item.policy]
    ].map(([label, value]) => `<div><span>${esc(label)}</span><strong>${esc(value)}</strong></div>`).join("")}</div></div><div class="aig-timeline">${item.events.map(event => `<div class="aig-event"><i class="aig-event-dot"></i><strong>${esc(event[1])}</strong><p>${esc(event[2])}</p><time>${esc(event[0])} AST</time></div>`).join("")}</div><div class="hash-box"><header><span>SESSION SHA-512 · 128 HEX</span>${badge("MATCH", "green")}</header><code>${esc(item.sha512)}</code></div></div>`;
  }

  function pageHtml() {
    const item = selected();
    const kpis = [
      ["activity", "128", lang() === "ar" ? "جلسة موثقة" : "Recorded sessions", tr("fictional")],
      ["code", "41%", lang() === "ar" ? "متوسط مساهمة AI" : "Average AI contribution", "Attribution estimate"],
      ["shield", "17", lang() === "ar" ? "قرار سياسة" : "Policy decisions", "4 blocked"],
      ["package", "36", lang() === "ar" ? "حزمة إصدار" : "Release packages", tr("noClaim")]
    ];
    const tools = ["all", ...new Set(sessions.map(session => session.tool))];
    const statuses = ["all", "Verified", "Blocked", "Review"];
    const roadmap = [
      ["DESIGNED", lang() === "ar" ? "تجربة المستخدم والمتطلبات" : "UX & requirements", lang() === "ar" ? "رحلات المستخدم والضوابط ونموذج الدليل موضحة في هذا العرض." : "User journeys, controls and evidence model are represented in this concept."],
      ["PLANNED", lang() === "ar" ? "موصلات أدوات التطوير" : "Development-tool adapters", lang() === "ar" ? "وكلاء CLI وIDE وربط المستودعات ضمن خطة التطوير." : "CLI, IDE and repository adapters remain planned implementation."],
      ["PLANNED", lang() === "ar" ? "محرك السياسات" : "Policy engine", lang() === "ar" ? "تطبيق النماذج المعتمدة والمسارات الحساسة وبوابات الاختبار." : "Approved models, sensitive paths and test gates remain planned."],
      ["PLANNED", lang() === "ar" ? "الربط بخزنة WORM" : "WORM vault integration", lang() === "ar" ? "حفظ بيانات الجلسة وحزم الإصدار داخل RM TraceVault." : "Preserve session manifests and release packages inside RM TraceVault."],
      ["FUTURE", lang() === "ar" ? "موصلات المؤسسات" : "Enterprise connectors", lang() === "ar" ? "تكاملات موسعة مع منصات الكود وخطوط CI/CD." : "Broader repository and CI/CD integrations are future scope."],
      ["NOT STARTED", lang() === "ar" ? "الأمن والقبول الإنتاجي" : "Security & production acceptance", lang() === "ar" ? "لا يوجد ادعاء تنفيذ أو اعتماد أو مراقبة فعلية في هذا الديمو." : "No implementation, certification or live-monitoring claim is made by this demo."]
    ];

    return `<div class="aig-page"><div class="aig-disclaimer">${icon("warning")}<div><strong>${esc(tr("disclaimerTitle"))}</strong><p>${esc(tr("disclaimer"))}</p></div>${badge(`${tr("planned")} · ${tr("noClaim")}`, "purple")}</div><section class="aig-hero"><div class="aig-hero-copy"><div class="aig-eyebrow">${icon("sparkles")}<span>${esc(tr("kicker"))}</span></div><h1>${esc(tr("title"))}</h1><p>${esc(tr("description"))}</p><div class="aig-hero-actions">${button(tr("startTour"), "tour", "primary", "play")}${button(tr("generate"), "download-package", "", "download")}</div></div><div class="aig-hero-visual"><div class="aig-trust-card"><div class="aig-trust-head"><strong>${lang() === "ar" ? "نسب جلسة التطوير" : "Development-session lineage"}</strong>${badge("TRACEABLE", "green")}</div><code>${esc(item.id)} → ${esc(item.repository)} → ${esc(item.commit)}</code><div class="aig-trust-flow"><span>WHO</span><span>WHAT</span><span>WHEN</span></div></div><div class="aig-trust-card"><div class="aig-trust-head"><strong>${lang() === "ar" ? "حزمة دليل الإصدار" : "Release evidence package"}</strong>${badge("CONCEPT", "purple")}</div><code>manifest.json · session-events.json · checks.json · sha512.txt</code><div class="aig-trust-flow"><span>POLICY</span><span>APPROVAL</span><span>INTEGRITY</span></div></div></div></section><section class="aig-kpis">${kpis.map(kpi => `<article class="aig-kpi"><div class="aig-kpi-top"><div class="aig-kpi-icon">${icon(kpi[0])}</div><small>${esc(kpi[3])}</small></div><strong>${esc(kpi[1])}</strong><span>${esc(kpi[2])}</span></article>`).join("")}</section><section class="aig-layout"><article class="card"><header class="card-header"><div><h3>${esc(tr("sessions"))}</h3><p>${esc(tr("sessionsSub"))}</p></div>${badge(`${sessions.length} ${tr("recorded")}`, "blue")}</header><div class="aig-toolbar"><span>${lang() === "ar" ? "الأداة:" : "Tool:"}</span>${tools.map(tool => `<button type="button" class="aig-filter ${state.tool === tool ? "active" : ""}" data-aig-tool="${esc(tool)}">${esc(tool === "all" ? tr("all") : tool)}</button>`).join("")}<span>${lang() === "ar" ? "الحالة:" : "Status:"}</span>${statuses.map(status => `<button type="button" class="aig-filter ${state.status === status ? "active" : ""}" data-aig-status="${esc(status)}">${esc(status === "all" ? tr("all") : localizedStatus(status))}</button>`).join("")}</div><div class="table-wrap"><table class="aig-table"><thead><tr><th>${lang() === "ar" ? "الجلسة" : "Session"}</th><th>${lang() === "ar" ? "الأداة" : "Tool"}</th><th>${lang() === "ar" ? "المطور" : "Engineer"}</th><th>Commit</th><th>AI</th><th>${lang() === "ar" ? "الحالة" : "Status"}</th><th>${lang() === "ar" ? "السياسة" : "Policy"}</th></tr></thead><tbody>${sessionRows()}</tbody></table></div></article><aside class="card"><header class="card-header"><div><h3>${esc(tr("detail"))}</h3><p>${lang() === "ar" ? "سلسلة أحداث وبصمة وحالة سياسة." : "Event lineage, fingerprint and policy state."}</p></div></header><div class="card-body" id="aig-detail">${detailPanel()}</div></aside></section><section class="grid two"><article class="card"><header class="card-header"><div><h3>${esc(tr("provenance"))}</h3><p>${lang() === "ar" ? "تقدير توضيحي لمساهمة الإنسان والذكاء الاصطناعي." : "Illustrative human and AI contribution attribution."}</p></div>${badge("DERIVED METRIC", "purple")}</header><div class="card-body"><div class="aig-code-mix"><div class="aig-donut"><div class="aig-donut-copy"><strong>${item.aiShare}%</strong><span>AI assisted</span></div></div><div class="aig-mix-list"><div class="aig-mix-row"><i style="background:var(--blue)"></i><strong>${lang() === "ar" ? "اقتراحات AI المقبولة" : "Accepted AI-assisted changes"}</strong><span>${item.aiShare}%</span></div><div class="aig-mix-row"><i style="background:var(--purple)"></i><strong>${lang() === "ar" ? "تحرير ومراجعة بشرية" : "Human editing and review"}</strong><span>${item.humanShare}%</span></div><div class="aig-mix-row"><i style="background:#dbe5f2"></i><strong>${lang() === "ar" ? "إضافات / حذف" : "Additions / deletions"}</strong><span>+${item.additions} / -${item.deletions}</span></div><div class="aig-mix-row"><i style="background:var(--green)"></i><strong>${lang() === "ar" ? "قرار المراجعة" : "Review decision"}</strong><span>${esc(item.policy)}</span></div></div></div></div></article><article class="aig-package-card"><div class="aig-package-brand"><img src="assets/rm-logo.svg" alt="RM"><div><strong>RM TRACEVAULT</strong><span>AI DEVELOPMENT EVIDENCE</span></div></div><h3>${lang() === "ar" ? "حزمة دليل جلسة التطوير" : "Development Session Evidence Package"}</h3><p>${lang() === "ar" ? "حزمة تجريبية تحتوي على بيان الجلسة والالتزام واختبارات السياسة والموافقات والبصمة." : "A demo package containing session manifest, commit lineage, policy checks, approvals and integrity fingerprint."}</p><div class="aig-package-fields"><div class="aig-package-field"><span>Session</span><strong>${esc(item.id)}</strong></div><div class="aig-package-field"><span>Commit</span><strong>${esc(item.commit)}</strong></div><div class="aig-package-field"><span>Policy</span><strong>${esc(item.policy)}</strong></div><div class="aig-package-field"><span>SHA-512</span><strong>128 HEX · MATCH</strong></div></div>${button(tr("generate"), "download-package", "primary", "download")}</article></section><article class="card"><header class="card-header"><div><h3>${esc(tr("policy"))}</h3><p>${esc(tr("policySub"))}</p></div>${badge(tr("planned"), "purple")}</header><div class="card-body"><div class="aig-policy-grid">${policies.map(policy => `<article class="aig-policy"><div class="aig-policy-head"><div class="aig-policy-icon">${icon(policy[3])}</div>${badge("CONCEPT", "purple")}</div><h4>${esc(policy[1])}</h4><p>${esc(policy[2])}</p>${button(tr("run"), `policy:${policy[0]}`, "", "play")}</article>`).join("")}</div></div></article><article class="card"><header class="card-header"><div><h3>${esc(tr("architecture"))}</h3><p>${esc(tr("architectureSub"))}</p></div>${badge("TARGET DESIGN", "blue")}</header><div class="card-body"><div class="aig-flow">${[
      ["01", "IDE / CLI", "Approved developer session and tool context"],
      ["02", "Capture Adapter", "Prompts, responses, tool calls and file changes"],
      ["03", "Policy Engine", "Models, paths, secrets, tests and approvals"],
      ["04", "Evidence Normalizer", "Session manifest, commit and event lineage"],
      ["05", "RM Evidence Vault", "Integrity fingerprint and immutable preservation"],
      ["06", "Audit / Release Package", "Portable evidence for reviewers and auditors"]
    ].map(step => `<div class="aig-flow-step"><span>${step[0]}</span><strong>${step[1]}</strong><small>${step[2]}</small></div>`).join("")}</div></div></article><article class="card"><header class="card-header"><div><h3>${esc(tr("roadmap"))}</h3><p>${esc(tr("roadmapSub"))}</p></div>${badge(tr("noClaim"), "amber")}</header><div class="card-body"><div class="aig-roadmap">${roadmap.map(item => `<article class="aig-roadmap-item"><span>${esc(item[0])}</span><strong>${esc(item[1])}</strong><p>${esc(item[2])}</p></article>`).join("")}</div></div></article></div>`;
  }

  let rendering = false;
  function renderModule(force = false) {
    if (route() !== ROUTE) return;
    const content = document.querySelector(".content");
    if (!content) return;
    const signature = `${lang()}|${state.selected}|${state.tool}|${state.status}`;
    if (!force && content.dataset.aigSignature === signature) return;
    rendering = true;
    content.dataset.aigSignature = signature;
    content.innerHTML = pageHtml();
    rendering = false;
  }

  function toast(title, message, iconName = "shield") {
    const node = document.createElement("div");
    node.className = "toast";
    node.innerHTML = `${icon(iconName)}<div><strong>${esc(title)}</strong><small>${esc(message)}</small></div>`;
    toastRoot.appendChild(node);
    window.setTimeout(() => node.remove(), 4200);
  }

  function modal(title, subtitle, body, footer = button(tr("close"), "close")) {
    modalRoot.innerHTML = `<div class="modal-backdrop"><section class="modal" role="dialog" aria-modal="true" aria-labelledby="aig-modal-title"><header class="modal-head"><div><h3 id="aig-modal-title">${esc(title)}</h3><p>${esc(subtitle)}</p></div><button type="button" class="modal-close" data-aig-action="close" aria-label="${esc(tr("close"))}">${icon("x")}</button></header><div class="modal-body">${body}</div><footer class="modal-footer">${footer}</footer></section></div>`;
    modalRoot.querySelector("button")?.focus();
  }

  function closeModal() {
    modalRoot.innerHTML = "";
  }

  function policySimulation(id) {
    const policy = policies.find(item => item[0] === id);
    if (!policy) return;
    const blocked = id !== "evidence";
    const title = lang() === "ar" ? (blocked ? "تم منع الإجراء وفق السياسة" : "تم تجهيز حزمة الدليل") : (blocked ? "Action blocked by policy" : "Evidence package prepared");
    const code = {
      models: "AI-MODEL-403",
      paths: "AI-PATH-403",
      secrets: "AI-DLP-403",
      tests: "AI-GATE-409",
      approval: "AI-APPROVAL-409",
      evidence: "AI-EVIDENCE-201"
    }[id];
    const body = `<div class="aig-result"><div class="aig-result-icon">${icon(blocked ? "warning" : "package")}</div><div><h4>${esc(policy[4])}</h4><p>${blocked ? (lang() === "ar" ? "لم يُقبل التغيير ولم يتم الدمج أو الإصدار. سُجل القرار ضمن دليل الجلسة الافتراضي." : "The change was not accepted, merged or released. The decision was recorded in the fictional session evidence.") : (lang() === "ar" ? "تم تجميع البيان والموافقات والاختبارات والبصمة في حزمة تجريبية قابلة للتنزيل." : "The manifest, approvals, checks and fingerprint were assembled into a downloadable demo package.")}</p></div></div><div class="result-grid"><div class="result-field"><span>Control code</span><strong>${code}</strong></div><div class="result-field"><span>Decision</span><strong>${blocked ? "BLOCKED" : "PREPARED"}</strong></div><div class="result-field"><span>Repository state</span><strong>UNCHANGED</strong></div><div class="result-field"><span>Evidence event</span><strong>RECORDED</strong></div></div>`;
    modal(title, policy[1], body, button(tr("close"), "close", "primary"));
    toast(title, `${code} · ${tr("noClaim")}`, blocked ? "warning" : "package");
  }

  function walkthrough() {
    const steps = [
      ["01", lang() === "ar" ? "تسجيل الهوية والأداة" : "Register identity and tool", lang() === "ar" ? "ربط المطور والمستودع والفرع وملف النموذج المعتمد." : "Bind developer, repository, branch and approved model profile."],
      ["02", lang() === "ar" ? "التقاط رحلة العمل" : "Capture the work session", lang() === "ar" ? "تسجيل الأوامر والردود والأدوات والملفات المتغيرة." : "Record prompts, responses, tool calls and file changes."],
      ["03", lang() === "ar" ? "تطبيق السياسات" : "Apply policy gates", lang() === "ar" ? "التحقق من النماذج والمسارات والأسرار والاختبارات." : "Check models, sensitive paths, secrets and test gates."],
      ["04", lang() === "ar" ? "المراجعة البشرية" : "Human accountability", lang() === "ar" ? "توثيق المراجع والقرار والملاحظات." : "Record reviewer identity, decision and notes."],
      ["05", lang() === "ar" ? "حفظ دليل الإصدار" : "Preserve release evidence", lang() === "ar" ? "تجميع البيان والالتزام والاختبارات والبصمة داخل خزنة الأدلة." : "Package manifest, commit, checks and fingerprint for the evidence vault."]
    ];
    modal(tr("startTour"), tr("disclaimerTitle"), `<div class="progress-modal">${steps.map(step => `<div class="progress-row"><div class="progress-icon">${icon("code")}</div><div><strong>${step[0]} · ${esc(step[1])}</strong><small>${esc(step[2])}</small></div>${badge("CONCEPT", "purple")}</div>`).join("")}</div>`, `${button(tr("generate"), "download-package", "primary", "download")}${button(tr("close"), "close")}`);
  }

  function downloadPackage() {
    const item = selected();
    const payload = {
      package_type: "RM_TRACEVAULT_AI_DEVELOPMENT_EVIDENCE_DEMO",
      module_version: MODULE_VERSION,
      generated_at: new Date().toISOString(),
      claim_boundary: {
        environment: "PUBLIC_CONCEPT_DEMO",
        data: "FICTIONAL",
        live_capture: false,
        policy_enforcement: false,
        backend_connected: false,
        production_ready: false
      },
      session: {
        id: item.id,
        project: item.project,
        tool: item.tool,
        profile: item.profile,
        engineer: item.engineer,
        repository: item.repository,
        branch: item.branch,
        commit: item.commit,
        status: item.status,
        policy: item.policy,
        ai_contribution_percent: item.aiShare,
        human_contribution_percent: item.humanShare,
        files_changed: item.files,
        additions: item.additions,
        deletions: item.deletions,
        started: item.started,
        completed: item.completed,
        sha512: item.sha512,
        events: item.events.map(event => ({ time_ast: event[0], action: event[1], detail: event[2] }))
      },
      intended_future_contents: ["session manifest", "prompt and response lineage", "tool calls", "file changes", "commit lineage", "policy decisions", "security checks", "human approvals", "integrity fingerprint", "immutable preservation reference"]
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `RM_TraceVault_AI_Development_Evidence_${item.id}.json`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    toast(lang() === "ar" ? "تم إنشاء حزمة الدليل التجريبية" : "Demo evidence package generated", `${item.id} · JSON · ${tr("fictional")}`, "download");
  }

  function handleAction(action) {
    if (action.startsWith("policy:")) return policySimulation(action.split(":")[1]);
    switch (action) {
      case "open-module": location.hash = `#/${ROUTE}`; break;
      case "tour": walkthrough(); break;
      case "download-package": downloadPackage(); break;
      case "close": closeModal(); break;
      default: break;
    }
  }

  function enhance(force = false) {
    if (rendering) return;
    installNav();
    updateActiveNav();
    if (route() === ROUTE) renderModule(force);
    else addTeaser();
  }

  document.addEventListener("click", event => {
    const routeButton = event.target.closest("[data-aig-route]");
    if (routeButton) {
      event.preventDefault();
      location.hash = `#/${routeButton.dataset.aigRoute}`;
      return;
    }
    const sessionRow = event.target.closest("[data-aig-session]");
    if (sessionRow) {
      state.selected = sessionRow.dataset.aigSession;
      renderModule(true);
      return;
    }
    const toolFilter = event.target.closest("[data-aig-tool]");
    if (toolFilter) {
      state.tool = toolFilter.dataset.aigTool;
      renderModule(true);
      return;
    }
    const statusFilter = event.target.closest("[data-aig-status]");
    if (statusFilter) {
      state.status = statusFilter.dataset.aigStatus;
      renderModule(true);
      return;
    }
    const actionButton = event.target.closest("[data-aig-action]");
    if (actionButton) {
      event.preventDefault();
      event.stopPropagation();
      handleAction(actionButton.dataset.aigAction);
    }
  });

  document.addEventListener("keydown", event => {
    const sessionRow = event.target.closest("[data-aig-session]");
    if (sessionRow && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      state.selected = sessionRow.dataset.aigSession;
      renderModule(true);
    }
    if (event.key === "Escape" && modalRoot.innerHTML) closeModal();
  });

  window.addEventListener("hashchange", () => window.setTimeout(() => enhance(true), 0));
  const observer = new MutationObserver(() => {
    if (rendering) return;
    window.clearTimeout(observer._timer);
    observer._timer = window.setTimeout(() => enhance(false), 20);
  });
  observer.observe(app, { childList: true, subtree: true });

  window.RM_TRACEVAULT_AI_GOVERNANCE = {
    version: MODULE_VERSION,
    route: ROUTE,
    sessionsCount: sessions.length,
    validSha512: sessions.every(item => /^[a-f0-9]{128}$/i.test(item.sha512))
  };

  window.setTimeout(() => enhance(true), 0);
})();
