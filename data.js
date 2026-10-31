// RM TraceVault public concept-demo data. All organizations, people, cases and evidence records are fictional.
window.TRACEVAULT_DEMO = {
  product: {
    name: "RM TraceVault",
    descriptor: "Saudi Sovereign Digital Evidence Custody Platform",
    tagline: "LEGAL MEMORY. SEALED FOREVER.",
    pillars: ["WHO", "WHEN", "WHAT", "INTEGRITY", "IMMUTABILITY"],
    environment: "Public Concept Demonstration",
    region: "Saudi Arabia",
    domain: "tracevault.sa"
  },
  tenant: {
    id: "TEN-DEMO-ALPHA",
    name: "Demo Organization Alpha",
    plan: "Sovereign",
    region: "Saudi Arabia",
    storageUsed: 188.4,
    storageAllowance: 400,
    users: 126,
    activeCases: 97,
    evidenceObjects: 3214872,
    integrityRate: 100,
    legalHolds: 31,
    pendingExports: 4
  },
  // Generated SHA-512 demonstration values. Each value is exactly 128 hexadecimal characters.
  evidence: [
    {
      id: "EV-DEMO-0001",
      title: "CCTV_Entrance_2026-07-30_14-32-11.mp4",
      source: "CCTV / VMS",
      sourceDetail: "Demo Facility · Entrance Camera 04",
      type: "Video",
      mime: "video/mp4",
      size: "2.41 GB",
      caseId: "CASE-DEMO-0192",
      caseName: "Unauthorized Access Review",
      collected: "30 Jul 2026, 14:32 AST",
      ingested: "30 Jul 2026, 14:33 AST",
      verified: "30 Jul 2026, 14:34 AST",
      hash: "e5ae4b21bb644b8df471aed86d04aecb4bad7f180337ac6d1d0c7cb909b06604eec5e7d34fcbb81809045efda8ad2a85945df2dc3dca512595c2cda1b793e557",
      encryption: "AES-256-GCM / 8 MiB chunks",
      worm: "Object Lock · Compliance Mode",
      integrity: "Verified",
      signature: "Ed25519 custody signature valid",
      timestamp: "RFC 3161 token simulated",
      version: "v1 · immutable original",
      legalHold: true,
      retention: "30 Jul 2033",
      actor: "Demo Investigator A",
      trustScore: 100,
      status: "Protected",
      tags: ["CCTV", "Access", "Priority"],
      custody: [
        { seq: 1, time: "30 Jul 2026, 14:32:11 AST", action: "Collected at source", actor: "Connector: CCTV-VMS-04", detail: "Source frame sequence and camera metadata captured.", status: "Signed" },
        { seq: 2, time: "30 Jul 2026, 14:32:18 AST", action: "Ingestion session created", actor: "Secure Ingestion Service", detail: "Evidence ID reserved and tenant authorization validated.", status: "Signed" },
        { seq: 3, time: "30 Jul 2026, 14:32:40 AST", action: "Fingerprint registered", actor: "Integrity Service", detail: "SHA-512 computed over the original bytes before any encryption.", status: "Signed" },
        { seq: 4, time: "30 Jul 2026, 14:33:02 AST", action: "Encrypted", actor: "Encryption Worker", detail: "A new data key for this file (AES-256-GCM, authenticated chunks), wrapped by the tenant key in Vault Transit.", status: "Signed" },
        { seq: 5, time: "30 Jul 2026, 14:33:24 AST", action: "Immutable commit completed", actor: "Evidence Vault Service", detail: "Object committed under Compliance Mode retention.", status: "Signed" },
        { seq: 6, time: "30 Jul 2026, 14:33:31 AST", action: "Timestamp token attached", actor: "Timestamp Service", detail: "RFC 3161 token from an independent timestamp authority over the SHA-512 fingerprint.", status: "Signed" },
        { seq: 7, time: "30 Jul 2026, 14:34:05 AST", action: "Integrity verification passed", actor: "Verification Service", detail: "Whole-evidence SHA-512 matched the registered fingerprint.", status: "Signed" },
        { seq: 8, time: "31 Jul 2026, 09:18:42 AST", action: "Viewed by authorized investigator", actor: "Demo Investigator A", detail: "Read-only access granted under case authorization.", status: "Signed" },
        { seq: 9, time: "31 Jul 2026, 11:04:10 AST", action: "Legal Hold applied", actor: "Demo Legal Reviewer", detail: "Retention expiry suspended for the active case.", status: "Signed" }
      ]
    },
    {
      id: "EV-DEMO-0002",
      title: "Executive_Mailbox_Export.pst",
      source: "Microsoft 365",
      sourceDetail: "Demo Executive Mailbox",
      type: "Email",
      mime: "application/vnd.ms-outlook",
      size: "12.80 GB",
      caseId: "CASE-DEMO-0421",
      caseName: "Financial Activity Review",
      collected: "30 Jul 2026, 11:05 AST",
      ingested: "30 Jul 2026, 11:09 AST",
      verified: "30 Jul 2026, 11:12 AST",
      hash: "ae4f660da3f72be5d9f41e5b2a2d2ad81bee7bba65d69ec60efa694c17dd7c36646741613cd3b1d3b16601c16e709e00f81c79862f78ddf4981aafd4df597f59",
      encryption: "AES-256-GCM / 8 MiB chunks",
      worm: "Object Lock · Compliance Mode",
      integrity: "Verified",
      signature: "Ed25519 custody signature valid",
      timestamp: "RFC 3161 token simulated",
      version: "v1 · immutable original",
      legalHold: true,
      retention: "30 Jul 2033",
      actor: "Demo Investigator B",
      trustScore: 100,
      status: "Protected",
      tags: ["Email", "M365", "Legal Hold"],
      custody: [
        { seq: 1, time: "30 Jul 2026, 11:05:00 AST", action: "Collection job authorized", actor: "Demo Tenant Administrator", detail: "Mailbox export scope approved.", status: "Signed" },
        { seq: 2, time: "30 Jul 2026, 11:09:31 AST", action: "Export received", actor: "M365 Evidence Connector", detail: "Transfer manifest, source metadata and SHA-512 fingerprint captured.", status: "Signed" },
        { seq: 3, time: "30 Jul 2026, 11:10:04 AST", action: "Encrypted", actor: "Encryption Worker", detail: "A new data key for this file, wrapped by the tenant key.", status: "Signed" },
        { seq: 4, time: "30 Jul 2026, 11:11:22 AST", action: "Immutable commit completed", actor: "Evidence Vault Service", detail: "Object Lock retention activated.", status: "Signed" },
        { seq: 5, time: "30 Jul 2026, 11:12:08 AST", action: "Integrity verification passed", actor: "Verification Service", detail: "SHA-512 matched.", status: "Signed" }
      ]
    },
    {
      id: "EV-DEMO-0003",
      title: "Payment_Document_88421.pdf",
      source: "Files & Folders",
      sourceDetail: "Demo Finance Repository",
      type: "Document",
      mime: "application/pdf",
      size: "1.20 MB",
      caseId: "CASE-DEMO-0421",
      caseName: "Financial Activity Review",
      collected: "29 Jul 2026, 09:44 AST",
      ingested: "29 Jul 2026, 09:45 AST",
      verified: "29 Jul 2026, 09:45 AST",
      hash: "b184cf91c80f7a4275cc4f2051e175935ac099f04d553d1cb0b48759ad75adf2e402419f4f2426922e67759d259ab1e8657acc094630c76298302ab1c3c0dac4",
      encryption: "AES-256-GCM / 8 MiB chunks",
      worm: "Object Lock · Compliance Mode",
      integrity: "Verified",
      signature: "Ed25519 custody signature valid",
      timestamp: "RFC 3161 token simulated",
      version: "v1 · immutable original",
      legalHold: false,
      retention: "29 Jul 2031",
      actor: "Demo Investigator C",
      trustScore: 100,
      status: "Protected",
      tags: ["Document", "Finance", "PDF"],
      custody: [
        { seq: 1, time: "29 Jul 2026, 09:44:01 AST", action: "File selected", actor: "Demo Investigator C", detail: "Source path and file metadata captured.", status: "Signed" },
        { seq: 2, time: "29 Jul 2026, 09:45:05 AST", action: "Validation passed", actor: "Secure Ingestion Service", detail: "Format, size and authorization checks passed; SHA-512 fingerprint registered.", status: "Signed" },
        { seq: 3, time: "29 Jul 2026, 09:45:12 AST", action: "Encrypted", actor: "Encryption Worker", detail: "A new data key for this file, wrapped by the tenant key.", status: "Signed" },
        { seq: 4, time: "29 Jul 2026, 09:45:20 AST", action: "Immutable commit completed", actor: "Evidence Vault Service", detail: "Protected object registered.", status: "Signed" },
        { seq: 5, time: "29 Jul 2026, 09:45:32 AST", action: "Integrity verification passed", actor: "Verification Service", detail: "SHA-512 matched.", status: "Signed" }
      ]
    },
    {
      id: "EV-DEMO-0004",
      title: "security-login-events-2026-07-29.log",
      source: "SIEM / Syslog",
      sourceDetail: "Demo Security Analytics",
      type: "Log",
      mime: "text/plain",
      size: "2.40 MB",
      caseId: "CASE-DEMO-0192",
      caseName: "Unauthorized Access Review",
      collected: "29 Jul 2026, 08:15 AST",
      ingested: "29 Jul 2026, 08:15 AST",
      verified: "29 Jul 2026, 08:16 AST",
      hash: "6e5054db1bd72b91f7b6877e697cb975c665c4182a797547aa2999ee605ac45f5f276b6203a3e3aa087173e5edf983d75e722ea5d73233051ebe672204b7b39c",
      encryption: "AES-256-GCM / 8 MiB chunks",
      worm: "Object Lock · Compliance Mode",
      integrity: "Verified",
      signature: "Ed25519 custody signature valid",
      timestamp: "RFC 3161 token simulated",
      version: "v1 · immutable original",
      legalHold: false,
      retention: "29 Jul 2031",
      actor: "Secure Connector Service",
      trustScore: 100,
      status: "Protected",
      tags: ["Security", "Log", "SIEM"],
      custody: [
        { seq: 1, time: "29 Jul 2026, 08:15:00 AST", action: "Stream checkpoint recorded", actor: "SIEM Connector", detail: "Source offset and sequence registered.", status: "Signed" },
        { seq: 2, time: "29 Jul 2026, 08:15:18 AST", action: "Encrypted and committed", actor: "Evidence Vault Service", detail: "SHA-512 registered, new data key applied, protected object committed.", status: "Signed" },
        { seq: 3, time: "29 Jul 2026, 08:16:01 AST", action: "Integrity verification passed", actor: "Verification Service", detail: "SHA-512 matched.", status: "Signed" }
      ]
    },
    {
      id: "EV-DEMO-0005",
      title: "Forensic_Image_Workstation_07.E01",
      source: "Manual Upload",
      sourceDetail: "Demo Forensics Workstation",
      type: "Disk Image",
      mime: "application/octet-stream",
      size: "42.81 GB",
      caseId: "CASE-DEMO-0510",
      caseName: "Internal Device Examination",
      collected: "28 Jul 2026, 16:02 AST",
      ingested: "28 Jul 2026, 16:19 AST",
      verified: "28 Jul 2026, 16:21 AST",
      hash: "884d08338d60554ee106a7d9ee7da26badb2c122fc1475d1638ed2c4dcd3663f939116191e571a7bce24f2fd8ef51d17096cc9195f82634378500380ab89135d",
      encryption: "AES-256-GCM / 8 MiB chunks",
      worm: "Object Lock · Compliance Mode",
      integrity: "Verified",
      signature: "Ed25519 custody signature valid",
      timestamp: "RFC 3161 token simulated",
      version: "v1 · immutable original",
      legalHold: true,
      retention: "28 Jul 2036",
      actor: "Demo Forensic Examiner",
      trustScore: 100,
      status: "Protected",
      tags: ["Forensic", "Disk Image", "Legal Hold"],
      custody: [
        { seq: 1, time: "28 Jul 2026, 16:02:00 AST", action: "Forensic image acquired", actor: "Demo Forensic Examiner", detail: "Acquisition workstation and source media identifiers recorded.", status: "Signed" },
        { seq: 2, time: "28 Jul 2026, 16:19:40 AST", action: "Multipart upload completed", actor: "Secure Ingestion Service", detail: "All parts present and ordered; whole-image SHA-512 registered.", status: "Signed" },
        { seq: 3, time: "28 Jul 2026, 16:20:05 AST", action: "Encrypted", actor: "Encryption Worker", detail: "A new data key for this file, wrapped by the tenant key.", status: "Signed" },
        { seq: 4, time: "28 Jul 2026, 16:20:33 AST", action: "Immutable commit completed", actor: "Evidence Vault Service", detail: "Protected object registered.", status: "Signed" },
        { seq: 5, time: "28 Jul 2026, 16:21:09 AST", action: "Integrity verification passed", actor: "Verification Service", detail: "Whole-image SHA-512 matched.", status: "Signed" },
        { seq: 6, time: "28 Jul 2026, 16:25:00 AST", action: "Legal Hold applied", actor: "Demo Legal Reviewer", detail: "Case preservation hold activated.", status: "Signed" }
      ]
    }
  ],
  connectors: [
    { name: "CCTV / VMS", icon: "camera", scope: "Later", status: "Connected", detail: "3 approved sources", volume: "312.4 GB", health: 100 },
    { name: "Files & Folders", icon: "folder", scope: "Later", status: "Connected", detail: "8 monitored paths", volume: "128.7 GB", health: 100 },
    { name: "Microsoft 365", icon: "mail", scope: "Later", status: "Ready", detail: "Demo connector", volume: "94.2 GB", health: 100 },
    { name: "SIEM / Syslog", icon: "activity", scope: "Later", status: "Connected", detail: "2 endpoints", volume: "51.9 GB", health: 99.9 },
    { name: "Secure API", icon: "code", scope: "Spec", status: "Connected", detail: "5 demo clients", volume: "37.6 GB", health: 100 },
    { name: "Manual Upload", icon: "upload", scope: "R1", status: "Ready", detail: "Resumable upload", volume: "-", health: 100 }
  ],
  cases: [
    { id: "CASE-DEMO-0421", name: "Financial Activity Review", owner: "Demo Investigator B", status: "Active", evidence: 3724, alerts: 2, exports: 1, priority: "High", updated: "2 hours ago" },
    { id: "CASE-DEMO-0192", name: "Unauthorized Access Review", owner: "Demo Investigator A", status: "Active", evidence: 1284, alerts: 1, exports: 0, priority: "Critical", updated: "4 hours ago" },
    { id: "CASE-DEMO-0510", name: "Internal Device Examination", owner: "Demo Forensic Examiner", status: "Under Review", evidence: 428, alerts: 0, exports: 2, priority: "Medium", updated: "Yesterday" }
  ],
  activity: [
    { time: "11:04", action: "Legal Hold applied", subject: "EV-DEMO-0001", actor: "Demo Legal Reviewer", tone: "blue" },
    { time: "10:42", action: "Verification package generated", subject: "EXP-DEMO-0017", actor: "Demo Investigator A", tone: "green" },
    { time: "09:18", action: "Evidence viewed", subject: "EV-DEMO-0001", actor: "Demo Investigator A", tone: "gray" },
    { time: "08:51", action: "Integrity verification passed", subject: "EV-DEMO-0004", actor: "Verification Service", tone: "green" },
    { time: "08:15", action: "SIEM batch committed", subject: "BATCH-DEMO-0072", actor: "Secure Connector Service", tone: "blue" }
  ],
  exports: [
    { id: "EXP-DEMO-0017", caseId: "CASE-DEMO-0421", evidence: 14, size: "22.47 GB", created: "30 Jul 2026, 10:42 AST", requestedBy: "Demo Investigator A", status: "Verification Ready" },
    { id: "EXP-DEMO-0012", caseId: "CASE-DEMO-0192", evidence: 6, size: "4.88 GB", created: "29 Jul 2026, 15:09 AST", requestedBy: "Demo Investigator B", status: "Complete" },
    { id: "EXP-DEMO-0008", caseId: "CASE-DEMO-0510", evidence: 3, size: "42.83 GB", created: "28 Jul 2026, 17:20 AST", requestedBy: "Demo Forensic Examiner", status: "Complete" }
  ],
  users: [
    { name: "Demo Business Administrator", role: "Business Admin", mfa: "Verified", last: "Today, 10:18", access: "Organization settings, users and roles" },
    { name: "Demo Investigator A", role: "Organization user · Investigator", mfa: "Verified", last: "Today, 09:42", access: "Case-scoped" },
    { name: "Demo Legal Reviewer", role: "Organization user · Legal reviewer", mfa: "Verified", last: "Yesterday, 18:31", access: "Legal Hold decisions" },
    { name: "Demo External Reviewer", role: "Guest", mfa: "Verified", last: "29 Jul 2026", access: "Assigned evidence only; view or add" }
  ],
  controls: [
    { name: "Immutable Evidence Vault", status: "Healthy", detail: "Compliance Mode policy active", icon: "lock" },
    { name: "Integrity Verification", status: "Healthy", detail: "SHA-512 verification service", icon: "fingerprint" },
    { name: "Tenant Isolation", status: "Healthy", detail: "Authorization filters enforced", icon: "building" },
    { name: "Key Custody", status: "Healthy", detail: "KMS-rooted custody controls", icon: "key" },
    { name: "MFA & RBAC", status: "Healthy", detail: "Step-up for sensitive actions", icon: "users" },
    { name: "Audit & Custody Signing", status: "Healthy", detail: "Signed custody events", icon: "shield-check" }
  ],
  // Package scope from the approved package table. Prices and service levels are not shown in this demo.
  editions: [
    {
      name: "Basic", nameAr: "الأساسية", label: "10 TB", labelAr: "10 تيرابايت",
      description: "Small and mid-size law firms.", descriptionAr: "مكاتب المحاماة الصغيرة والمتوسطة.",
      features: ["Evidence capacity: 10 TB", "25 users and 10 guests", "No DR copy", "AI: OCR", "No API or SIEM link", "Support on business days"],
      featuresAr: ["سعة الأدلة: 10 تيرابايت", "25 مستخدماً و10 ضيوف", "بلا نسخة تعافٍ", "الذكاء الاصطناعي: قراءة النصوص", "بلا واجهة برمجية أو ربط SIEM", "الدعم في أيام العمل"]
    },
    {
      name: "Standard", nameAr: "المعيارية", label: "100 TB", labelAr: "100 تيرابايت",
      description: "Large law firms and legal departments.", descriptionAr: "مكاتب المحاماة الكبرى والإدارات القانونية.",
      features: ["Evidence capacity: 100 TB", "100 users and 50 guests", "DR copy as an optional add-on", "AI: OCR and classification", "Read-only API and SIEM", "Business-day support and an account manager"],
      featuresAr: ["سعة الأدلة: 100 تيرابايت", "100 مستخدم و50 ضيفاً", "نسخة التعافي إضافة اختيارية", "الذكاء الاصطناعي: قراءة النصوص والتصنيف", "واجهة برمجية وربط SIEM للقراءة فقط", "الدعم في أيام العمل ومدير حساب"]
    },
    {
      name: "Enterprise", nameAr: "المؤسسية", label: "200 TB", labelAr: "200 تيرابايت",
      description: "Banks and financial institutions.", descriptionAr: "البنوك والمؤسسات المالية.",
      features: ["Evidence capacity: 200 TB", "500 users and 250 guests", "Full DR copy", "AI: OCR, classification, personal-data detection and search", "Full API with SIEM", "Incident on-call support"],
      featuresAr: ["سعة الأدلة: 200 تيرابايت", "500 مستخدم و250 ضيفاً", "نسخة تعافٍ كاملة", "الذكاء الاصطناعي: قراءة النصوص والتصنيف وكشف البيانات الشخصية والبحث", "واجهة برمجية كاملة مع ربط SIEM", "مناوبة للحوادث"]
    },
    {
      name: "Sovereign", nameAr: "السيادية", label: "400 TB+", labelAr: "400 تيرابايت فأكثر",
      description: "Government entities and large banks.", descriptionAr: "الجهات الحكومية والبنوك الكبرى.",
      features: ["Evidence capacity: 400 TB or as agreed", "Unlimited users and guests", "Full DR copy", "AI: full, with a higher quota", "Full API with custom integrations", "On-call support and a dedicated manager"],
      featuresAr: ["سعة الأدلة: 400 تيرابايت أو حسب الاتفاق", "مستخدمون وضيوف بلا حد", "نسخة تعافٍ كاملة", "الذكاء الاصطناعي: كامل بحصة أعلى", "واجهة برمجية كاملة مع تكاملات مخصصة", "مناوبة ومدير مخصص"]
    }
  ],
  // Team guide. Build tags: R1 = Release 1, R2 = Release 2, Later = beyond the current build,
  // Spec = in the build with its release set in the requirements specification, Concept = an idea only.
  guide: {
    tags: {
      "R1": ["Release 1", "الإصدار 1"],
      "R2": ["Release 2", "الإصدار 2"],
      "R1·R2": ["Starts in Release 1, completed in Release 2", "يبدأ في الإصدار 1 ويكتمل في الإصدار 2"],
      "R1·Later": ["Core in Release 1, the rest later", "الأساس في الإصدار 1 والباقي لاحقاً"],
      "Spec": ["In the build; its release is set in the requirements specification", "ضمن البناء، ويُحدَّد إصداره في وثيقة المواصفات"],
      "Later": ["Beyond the current build", "خارج البناء الحالي"],
      "Concept": ["An idea, not on the roadmap", "فكرة، وليست ضمن خارطة المنتج"],
      "Demo": ["Demo tooling", "أداة عرض"],
      "Target": ["Target design", "تصميم مستهدف"],
      "Commercial": ["Commercial scope", "نطاق تجاري"]
    },
    facts: [
      { en: ["Fictional data", "Every organization, person, case and file here is invented. Nothing you do is saved, apart from your language and theme in this browser."], ar: ["بيانات افتراضية", "كل الجهات والأشخاص والقضايا والملفات هنا مختلقة، ولا يُحفظ شيء مما تفعله سوى اللغة والمظهر في هذا المتصفح."] },
      { en: ["Simulated controls", "Blocking, signatures, timestamps and AI results are simulated. The fingerprints have the real SHA-512 format but are not computed from files."], ar: ["ضوابط محاكاة", "المنع والتواقيع والأختام الزمنية ونتائج الذكاء الاصطناعي كلها محاكاة، والبصمات بصيغة SHA-512 الحقيقية لكنها غير محسوبة من ملفات."] },
      { en: ["Designed in accordance with, not certified", "We describe the design. We do not claim certificates, approvals or acceptance by any court."], ar: ["مصمَّم وفق، لا معتمد", "نحن نصف التصميم، ولا ندّعي شهادات أو اعتمادات أو قبولاً لدى أي محكمة."] },
      { en: ["Build tags", "The tags in the menu show where each screen sits in the current build plan. Final placement is fixed when the requirements specification is signed."], ar: ["وسوم البناء", "الوسوم في القائمة تبيّن موقع كل شاشة في خطة البناء الحالية، ويُثبَّت الموقع النهائي عند توقيع وثيقة المواصفات."] }
    ],
    screens: [
      { route: "overview", tag: "R1·R2", en: ["Executive overview", "Dashboard, figures and recent custody activity", "The core admin portal comes in Release 1; the organization-admin and guest portals in Release 2. All figures here are fictional."], ar: ["النظرة التنفيذية", "لوحة المؤشرات وآخر أحداث العهدة", "بوابة المشرف الأساسية في الإصدار 1، وبوابتا مشرف الجهة والضيف في الإصدار 2. وكل الأرقام هنا افتراضية."] },
      { route: "vault", tag: "R1", en: ["Evidence vault and evidence record", "Inventory, fingerprint, custody chain and the tamper test", "Encrypted upload to write-once storage, SHA-512 verification and the custody chain are Release 1 acceptance items. The blocking shown here is simulated."], ar: ["خزنة الأدلة وسجل الدليل", "قائمة الأدلة والبصمة وسجل العهدة واختبار العبث", "الرفع المشفّر إلى تخزين غير قابل للتعديل، والتحقق ببصمة SHA-512، وسجل العهدة من معايير قبول الإصدار 1. والمنع المعروض هنا محاكاة."] },
      { route: "ingestion", tag: "R1·Later", en: ["Ingestion and connectors", "The upload journey and source connectors", "Secure upload is in Release 1, and resumable upload for large files is requested in the requirements specification. CCTV, Microsoft 365, SIEM and folder connectors are separate integration work after launch."], ar: ["الإدخال والموصلات", "رحلة رفع الدليل وموصلات المصادر", "الرفع الآمن في الإصدار 1، والرفع القابل للاستئناف للملفات الكبيرة مطلوب في وثيقة المواصفات. أما موصلات الكاميرات وMicrosoft 365 وSIEM والمجلدات فأعمال تكامل مستقلة بعد الإطلاق."] },
      { route: "cases", tag: "Spec", en: ["Case workspace", "Cases, the evidence in each case, tasks and notes", "Case states (active, under review, closed) and retention per case type are in the build; their release is set in the requirements specification. Tasks and notes come later."], ar: ["مساحة القضايا", "القضايا وأدلة كل قضية والمهام والملاحظات", "حالات القضية (نشطة، قيد المراجعة، مغلقة) والاحتفاظ حسب نوع القضية ضمن البناء، ويُحدَّد إصدارها في وثيقة المواصفات. أما المهام والملاحظات فلاحقاً."] },
      { route: "search", tag: "R2", en: ["Search and review", "Search across metadata, content and custody history", "Content search runs on self-hosted models inside the Kingdom and arrives in Release 2. Results respect each organization's permissions."], ar: ["البحث والمراجعة", "البحث في البيانات الوصفية والمحتوى وسجل العهدة", "البحث بالمحتوى يعمل بنماذج مستضافة داخل المملكة ويأتي في الإصدار 2، والنتائج تحترم صلاحيات كل جهة."] },
      { route: "ai", tag: "R1·R2", en: ["AI-derived analysis", "OCR, personal-data detection, classification and search", "Arabic and English OCR baseline in Release 1; classification, personal-data detection and content search in Release 2. Media manipulation indicators come later. Results are derived and need human review."], ar: ["تحليل الذكاء الاصطناعي المشتق", "قراءة النصوص وكشف البيانات الشخصية والتصنيف والبحث", "قراءة النصوص العربية والإنجليزية في الإصدار 1، والتصنيف وكشف البيانات الشخصية والبحث بالمحتوى في الإصدار 2، ومؤشرات التلاعب بالوسائط لاحقاً. والنتائج مشتقة وتحتاج مراجعة بشرية."] },
      { route: "exports", tag: "R1·R2", en: ["Exports and verification", "Evidence package and printable certificate", "Export starts from the core admin portal in Release 1; the full signed, verifiable package with reporting is Release 2. The printable certificate, a public verification page and an offline verifier are still being defined."], ar: ["التصدير والتحقق", "حزمة الدليل والشهادة القابلة للطباعة", "بدء التصدير من بوابة المشرف الأساسية في الإصدار 1، والحزمة الموقّعة القابلة للتحقق مع التقارير في الإصدار 2. أما الشهادة القابلة للطباعة وصفحة التحقق العامة وأداة التحقق دون اتصال فما زالت قيد التعريف."] },
      { route: "audit", tag: "R1", en: ["Audit center", "Tamper-evident audit events", "All application and API operations are recorded in a chained, verifiable trail from Release 1. The CSV button here is a demo convenience."], ar: ["مركز التدقيق", "أحداث التدقيق الكاشفة للعبث", "تُسجَّل كل عمليات التطبيق والواجهات البرمجية في سجل متسلسل قابل للتحقق من الإصدار 1، وزر CSV هنا للعرض فقط."] },
      { route: "operations", tag: "R2", en: ["Security operations", "Monitoring, incidents and recovery", "Backup, monitoring and performance and high-availability readiness come with Release 2. Security monitoring and penetration testing are provided through specialised partners. The incident flow is illustrative."], ar: ["العمليات الأمنية", "المراقبة والحوادث والاستعادة", "النسخ الاحتياطي والمراقبة وجاهزية الأداء والتوفر العالي مع الإصدار 2، ومراقبة الأمن وفحص الاختراق عبر شركاء متخصصين، وتدفق الحادث توضيحي."] },
      { route: "security", tag: "R1·R2", en: ["Security and trust", "Encryption chain, key custody, MFA and roles", "Admin roles with MFA are in Release 1; single sign-on is in Release 2. Key material is never shown in the product."], ar: ["الأمن والثقة", "سلسلة التشفير وحيازة المفاتيح والتحقق متعدد العوامل والأدوار", "أدوار المشرفين مع التحقق متعدد العوامل في الإصدار 1، والدخول الموحّد في الإصدار 2، ولا تُعرض مواد المفاتيح في المنتج أبداً."] },
      { route: "technical", tag: "Demo", en: ["Technical control center", "Control domains and negative tests", "Shows the failures we expect when a control is challenged. It mirrors acceptance testing; it is not a production test report."], ar: ["مركز الضوابط التقنية", "مجالات الضوابط والاختبارات السلبية", "يعرض الفشل المتوقع عند تحدّي أي ضابط، ويحاكي اختبارات القبول، وليس تقرير اختبار إنتاجياً."] },
      { route: "api", tag: "Spec", en: ["API and integrations", "Endpoint contracts and integration patterns", "Platform APIs are documented with the build. S3-compatible intake, signed webhooks, video streaming and SIEM feeds are later integration work."], ar: ["الواجهات البرمجية والتكاملات", "عقود الواجهات وأنماط التكامل", "واجهات المنصة موثّقة ضمن البناء، أما الإدخال المتوافق مع S3 والإشعارات الموقّعة وبث الفيديو وتغذية SIEM فأعمال تكامل لاحقة."] },
      { route: "tenants", tag: "R1·R2", en: ["Tenant administration", "Users, roles and organization policies", "Core roles in Release 1; full multi-tenant operation and the organization-admin portal in Release 2. Retention is set per organization and case type, with legal hold and dual-approval disposal."], ar: ["إدارة الجهات", "المستخدمون والأدوار وسياسات الجهة", "الأدوار الأساسية في الإصدار 1، وتشغيل الجهات المتعددة كاملاً وبوابة مشرف الجهة في الإصدار 2. والاحتفاظ يُضبط لكل جهة ونوع قضية، مع الحجز القانوني والإتلاف بموافقة طرفين."] },
      { route: "architecture", tag: "Target", en: ["Sovereign architecture", "Layers of the target design", "Evidence, logs, backups and AI outputs are designed to stay inside the Kingdom. This is the target design, verified at acceptance."], ar: ["المعمارية السيادية", "طبقات التصميم المستهدف", "الأدلة والسجلات والنسخ الاحتياطية ومخرجات الذكاء الاصطناعي مصمَّمة لتبقى داخل المملكة، وهذا تصميم مستهدف يُتحقق منه عند القبول."] },
      { route: "editions", tag: "Commercial", en: ["Service editions", "Four packages and the expansions under study", "Package scope follows the approved package table. Prices and service levels are never shown in this demo."], ar: ["إصدارات الخدمة", "الباقات الأربع والتوسعات قيد الدراسة", "نطاق الباقات مأخوذ من جدول الباقات المعتمد، ولا تُعرض الأسعار ولا مستويات الخدمة في هذا الديمو."] },
      { route: "ai-development-governance", tag: "Concept", en: ["AI development governance", "A concept module", "An idea we may explore later. It is not on the current product roadmap."], ar: ["حوكمة تطوير البرمجيات بالذكاء الاصطناعي", "وحدة تصورية", "فكرة قد ندرسها لاحقاً، وليست ضمن خارطة المنتج الحالية."] }
    ],
    journey: [
      { icon: "fingerprint", en: ["Fingerprint", "SHA-512 of the original file, before anything else."], ar: ["البصمة", "حساب بصمة SHA-512 للملف الأصلي قبل أي معالجة."] },
      { icon: "key", en: ["File key", "A fresh AES-256-GCM key for this file only."], ar: ["مفتاح الملف", "مفتاح AES-256-GCM جديد لهذا الملف وحده."] },
      { icon: "lock", en: ["Encrypt", "The file is encrypted in authenticated chunks."], ar: ["التشفير", "يُشفَّر الملف على أجزاء موثّقة."] },
      { icon: "shield-check", en: ["Wrap the key", "The organization's key in Vault Transit wraps the file key and never leaves Vault."], ar: ["قفل المفتاح", "مفتاح الجهة في Vault Transit يغلّف مفتاح الملف، ولا يخرج من Vault."] },
      { icon: "layers", en: ["Root of trust", "A KMS key in our own cloud account protects Vault and never touches the evidence."], ar: ["جذر الثقة", "مفتاح KMS في حسابنا السحابي يحمي Vault، ولا يلمس الدليل."] },
      { icon: "clock", en: ["Timestamp", "An independent RFC 3161 authority attests the time of the fingerprint."], ar: ["الختم الزمني", "جهة ختم مستقلة وفق RFC 3161 تشهد على وقت البصمة."] },
      { icon: "database", en: ["Write-once storage", "The ciphertext is committed under Compliance-mode Object Lock inside the Kingdom."], ar: ["التخزين غير القابل للتعديل", "تُحفظ النسخة المشفّرة بقفل وضع الامتثال داخل المملكة."] },
      { icon: "link", en: ["Signed custody", "Each event is signed with an Ed25519 key kept in Vault and chained to the event before it."], ar: ["العهدة الموقّعة", "كل حدث يُوقَّع بمفتاح Ed25519 محفوظ في Vault، ويرتبط بالحدث الذي قبله."] }
    ],
    roles: [
      { icon: "layers", en: ["Super Admin", "RM TraceVault's platform operator: manages organizations, global settings and system health, and can be one of the two approvers for disposal."], ar: ["مشرف المنصة العام", "مشغّل المنصة في RM TraceVault: يدير الجهات والإعدادات العامة وصحة النظام، ويمكن أن يكون أحد طرفي الموافقة على الإتلاف."] },
      { icon: "building", en: ["Business Admin", "The customer's administrator: manages its own users, roles, evidence and organization settings."], ar: ["مشرف الجهة", "مسؤول العميل: يدير مستخدمي جهته وأدوارهم وأدلتها وإعداداتها."] },
      { icon: "users", en: ["Organization users", "Investigators and reviewers inside the organization, limited by role and case."], ar: ["مستخدمو الجهة", "المحققون والمراجعون داخل الجهة، وصلاحياتهم محدودة بالدور والقضية."] },
      { icon: "eye", en: ["Guest", "Access to specifically assigned evidence or cases only: view or add, with no administrative rights."], ar: ["الضيف", "وصول إلى أدلة أو قضايا مخصّصة له فقط: عرض أو إضافة، بلا أي صلاحيات إدارية."] }
    ],
    phases: [
      { en: ["Phase 1", "TraceVault Evidence", "Immutable evidence vault and chain of custody. This is what we are building now.", "Now"], ar: ["المرحلة 1", "TraceVault Evidence", "خزنة أدلة غير قابلة للتعديل وسجل عهدة، وهي ما نبنيه الآن.", "الآن"] },
      { en: ["Phase 2", "TraceVault Shield", "Cyber resilience and immutable backup (Cyber Vault).", "Planned"], ar: ["المرحلة 2", "TraceVault Shield", "المرونة السيبرانية والنسخ الاحتياطي غير القابل للتعديل (Cyber Vault).", "مخطط"] },
      { en: ["Phase 3", "TraceVault Intelligence", "AI forensic analysis and threat detection.", "Planned"], ar: ["المرحلة 3", "TraceVault Intelligence", "التحليل الجنائي والكشف عن التهديدات بالذكاء الاصطناعي.", "مخطط"] }
    ],
    expansions: [
      { icon: "document", en: ["Digital financial audit", "Seal journal entries, e-invoices and bank statements at source, and tie every audit finding to a sealed record."], ar: ["التدقيق المالي الرقمي", "ختم القيود والفواتير الإلكترونية وكشوف الحساب من مصدرها، وربط كل ملاحظة تدقيق بسجل مختوم."] },
      { icon: "fingerprint", en: ["Digital forensics", "Seal disk, phone and log images on receipt, match acquisition hashes, and keep custody through to the report."], ar: ["التحليل الجنائي الرقمي", "ختم نسخ الأقراص والجوالات والسجلات عند الاستلام، ومطابقة بصمة الاستحواذ، وسجل حيازة حتى التقرير."] },
      { icon: "search", en: ["eDiscovery", "Legal hold on the people involved, then collection, search and review, and a numbered, sealed production set."], ar: ["الاكتشاف الإلكتروني", "حجز قانوني للأشخاص المعنيين، ثم جمع وبحث ومراجعة، وتسليم مجموعة إنتاج مرقّمة ومختومة."] }
    ],
    say: {
      en: ["The platform is designed in accordance with the relevant Saudi requirements.", "The fingerprint shows whether a file changed after it was registered.", "Evidence, logs, backups and AI processing are designed to stay inside the Kingdom.", "AI results are derived and reviewed by people; the original never changes.", "Everything on screen is a simulation with fictional data."],
      ar: ["المنصة مصمَّمة وفق المتطلبات السعودية ذات العلاقة.", "البصمة تبيّن هل تغيّر الملف بعد تسجيله.", "الأدلة والسجلات والنسخ الاحتياطية ومعالجة الذكاء الاصطناعي مصمَّمة لتبقى داخل المملكة.", "نتائج الذكاء الاصطناعي مشتقة ويراجعها إنسان، والأصل لا يتغيّر.", "كل ما على الشاشة محاكاة ببيانات افتراضية."]
    },
    avoid: {
      en: ["Court-admissible, court-ready, legally accepted, or anything that promises acceptance by a court.", "Certified, approved or compliant, unless that certificate or approval actually exists.", "Customer names, customer counts or results that did not happen.", "Prices, contracts, partners, dates or funding.", "That this demo is the live product or holds real evidence."],
      ar: ["مقبول أمام المحاكم أو جاهز للمحكمة أو معتمد قانونياً، أو أي عبارة توحي بقبول المحكمة.", "معتمد أو حاصل على موافقة أو متوافق، ما لم تصدر الشهادة أو الموافقة فعلاً.", "أسماء عملاء أو أعدادهم أو نتائج لم تحدث.", "الأسعار والعقود والشركاء والمواعيد والتمويل.", "أن هذا الديمو هو المنتج الفعلي أو أنه يحفظ أدلة حقيقية."]
    },
    caution: {
      en: "A fingerprint helps detect change; it does not prove what the content shows, and preservation alone does not guarantee acceptance by a court.",
      ar: "البصمة تساعد على كشف التغيير، لكنها لا تثبت صحة ما يعرضه المحتوى، والحفظ وحده لا يضمن قبول الدليل أمام المحكمة."
    },
    tour: [
      { route: "overview", en: ["Overview", "Who did what, when, to which evidence, and can we still prove it."], ar: ["النظرة التنفيذية", "من فعل ماذا ومتى وعلى أي دليل، وهل ما زلنا نستطيع إثباته."] },
      { route: "evidence/EV-DEMO-0001", en: ["Evidence vault", "Open EV-DEMO-0001."], ar: ["خزنة الأدلة", "افتح الدليل EV-DEMO-0001."] },
      { route: "evidence/EV-DEMO-0001", en: ["Verify integrity", "Show the SHA-512 match."], ar: ["التحقق من السلامة", "اعرض تطابق بصمة SHA-512."] },
      { route: "evidence/EV-DEMO-0001", en: ["Tamper test", "Try to delete or change it; both are blocked and logged."], ar: ["اختبار العبث", "حاول الحذف أو التعديل، وسيُمنع الاثنان ويُسجَّلان."] },
      { route: "evidence/EV-DEMO-0001", en: ["Custody and certificate", "Walk the custody chain, then print the certificate."], ar: ["العهدة والشهادة", "استعرض سجل العهدة ثم اطبع الشهادة."] },
      { route: "ingestion", en: ["Ingestion", "Show the eight-step evidence journey."], ar: ["الإدخال", "اعرض رحلة الدليل في ثماني خطوات."] },
      { route: "exports", en: ["Export and verification", "Download the evidence package and explain the offline checks."], ar: ["التصدير والتحقق", "نزّل حزمة الدليل واشرح خطوات التحقق دون اتصال."] },
      { route: "editions", en: ["AI and packages", "Derived analysis with human review, then the four packages."], ar: ["الذكاء الاصطناعي والباقات", "تحليل مشتق بمراجعة بشرية، ثم الباقات الأربع."] }
    ],
    glossary: [
      { en: ["WORM / Object Lock", "Write once, read many: storage that refuses deletion or change until the retention period ends."], ar: ["WORM / Object Lock", "تخزين يُكتب مرة ويُقرأ مراراً، ويرفض الحذف أو التغيير حتى تنتهي مدة الاحتفاظ."] },
      { en: ["SHA-512", "A 128-character fingerprint of a file. Any change to the file changes it."], ar: ["SHA-512", "بصمة من 128 خانة للملف، وأي تغيير في الملف يغيّرها."] },
      { en: ["DEK", "Data encryption key: one per file, AES-256-GCM."], ar: ["DEK", "مفتاح تشفير البيانات: مفتاح لكل ملف بخوارزمية AES-256-GCM."] },
      { en: ["Vault Transit", "Holds each organization's key and wraps file keys without exposing it."], ar: ["Vault Transit", "يحفظ مفتاح كل جهة ويغلّف به مفاتيح الملفات دون كشفه."] },
      { en: ["KMS", "The root key service in our cloud account. It never encrypts evidence directly."], ar: ["KMS", "خدمة المفتاح الجذر في حسابنا السحابي، ولا تشفّر الأدلة مباشرة."] },
      { en: ["RFC 3161", "A trusted timestamp from an independent authority."], ar: ["RFC 3161", "ختم زمني موثوق من جهة مستقلة."] },
      { en: ["Ed25519", "The signature scheme for custody events. The key stays in Vault."], ar: ["Ed25519", "خوارزمية توقيع أحداث العهدة، ومفتاحها يبقى داخل Vault."] },
      { en: ["Legal hold", "Suspends disposal for evidence tied to an active matter."], ar: ["الحجز القانوني", "يوقف الإتلاف للأدلة المرتبطة بقضية قائمة."] }
    ]
  },
  technical: {
    endpoints: [
      ["POST", "/api/v1/evidence/upload/init", "Initiate tenant-bound resumable upload", { session_id: "UP-DEMO-8C0F", chunk_size_bytes: 8388608, max_object_bytes: 50000000000, status: "READY" }],
      ["POST", "/api/v1/evidence/upload/{session}/finalize", "Encrypt, commit under WORM, timestamp and verify", { evidence_id: "EV-DEMO-0099", profile: "TV-ENC-001-A-v1.0", worm: "COMPLIANCE", integrity: "SHA-512 VERIFIED" }],
      ["GET", "/api/v1/evidence/{id}/download", "Authorized tenant-bound decrypted stream", { status: "AUTHORIZED_STREAM", audit_event: "AUD-DEMO-8821" }],
      ["POST", "/api/v1/evidence/{id}/presigned-url", "Create TTL-bound read-only access URL", { ttl_seconds: 300, access: "READ_ONLY", audit_event: "AUD-DEMO-8822" }],
      ["POST", "/api/v1/evidence/{id}/evidence-package", "Generate portable technical evidence package", { package_id: "EXP-DEMO-0021", manifest: "INCLUDED", custody_report: "INCLUDED", status: "VERIFICATION_READY" }],
      ["GET", "/api/v1/integrity/{id}/verify", "Verify SHA-512, timestamp and custody signatures", { sha512: "MATCH", timestamp_token: "VALID", custody_signatures: "VALID", result: "VERIFIED" }],
      ["GET", "/api/v1/integrity/{id}/chain", "Return append-only chain of custody", { events: 9, hash_chain: "VALID", signature_profile: "Ed25519" }],
      ["GET", "/api/v1/audit/events", "Query tenant-filtered audit events", { page: 1, page_size: 50, total: 28431, authorization_filter: "ENFORCED" }],
      ["POST", "/api/v1/tenants", "Create tenant through an admin workflow", { tenant_id: "TEN-DEMO-BRAVO", status: "PENDING_POLICY_APPROVAL" }],
      ["POST", "/api/v1/tenants/{id}/data-subject-request", "Route privacy request to legal/retention review", { request_id: "DSR-DEMO-0142", status: "LEGAL_REVIEW_REQUIRED", automatic_deletion: false }],
      ["GET", "/api/v1/auth/oidc/{tenant}/login", "Start tenant-aware OIDC / enterprise SSO", { tenant_context: "BOUND", mfa_policy: "REQUIRED" }]
    ],
    tests: [
      ["tenant", "Cross-tenant evidence access", "Use a valid identity from another tenant", "TV-TENANT-403", "HTTP 403 · Forbidden", "Tenant context, database policy and cryptographic namespace did not match. No evidence metadata was disclosed."],
      ["missing", "Missing encrypted chunk", "Remove one authenticated chunk", "ENC-6A", "VERIFICATION FAILED", "Expected chunk count and whole-evidence SHA-512 did not match. Evidence was not accepted."],
      ["reorder", "Reordered encrypted chunks", "Change the order of two 8 MiB chunks", "ENC-6B", "AUTHENTICATION FAILED", "Chunk index and authenticated sequence validation failed."],
      ["substitute", "Cross-evidence substitution", "Insert a chunk from another evidence ID", "ENC-6C", "AAD CONTEXT MISMATCH", "Tenant ID, evidence ID and chunk context did not match the authenticated envelope."],
      ["unwrap", "Unauthorized Vault Transit unwrap", "Use an unapproved workload identity", "TV-VAULT-403", "POLICY DENIED", "The workload identity had no unwrap authority for the tenant namespace and key version."],
      ["expired", "Expired evidence access URL", "Use a TTL-bound URL after expiry", "TV-ACCESS-401", "HTTP 401 · Expired", "The signed grant expired. A new authorized workflow and audit event are required."]
    ],
    domains: [
      ["lock", "Immutable Evidence Preservation", "Compliance-mode retention, versioning, access logging and explicit delete/modify rejection.", ["WORM / Object Lock", "Version history", "Legal Hold protection", "Blocked bypass attempts"], "Simulated"],
      ["key", "Provider-Separated Encryption", "Per-evidence envelope encryption with tenant-bound Vault Transit protection.", ["AES-256-GCM", "8 MiB authenticated chunks", "Wrapped DEK", "KMS root / Vault separation"], "Detailed"],
      ["fingerprint", "Integrity & Time Provenance", "Deterministic verification of the complete original evidence stream.", ["SHA-512", "RFC 3161 token", "Ed25519 custody signing", "Offline verification"], "Simulated"],
      ["building", "Tenant Isolation", "Tenant context across identity, database policy, cryptographic namespace and exports.", ["Schema-per-tenant", "Row-Level Security", "Authorization filtering", "Negative tests"], "Simulated"],
      ["link", "Chain of Custody", "Append-only actor, action, time, reason and integrity references.", ["Signed events", "Tamper-evident ordering", "Legal Hold actions", "Export lineage"], "Detailed"],
      ["globe", "Saudi Sovereign Boundary", "Target Saudi residency for evidence, data-bearing logs, backups and derived content.", ["Private service paths", "Region controls", "Controlled administration", "Residency evidence"], "Acceptance-gated"],
      ["code", "Application & Integration APIs", "Versioned interfaces for upload, retrieval, verification, custody and privacy.", ["Resumable upload", "S3-compatible intake", "OIDC / M2M", "HLS/DASH retrieval"], "Interactive"],
      ["activity", "Security Operations", "Coordinated incident command, telemetry, evidence preservation and recovery.", ["One incident timeline", "Crypto escalation", "Restore evidence", "Release rollback"], "Interactive"],
      ["sparkles", "AI-Derived Analysis", "OCR first, then classification, personal-data detection and content search. Always derived analysis, never the evidence itself.", ["Run provenance", "Human review", "Tenant-aware indexes", "No authority transfer"], "Staged"]
    ],
    aiRun: {
      analysis_run_id: "AIRUN-DEMO-20260802-0047",
      tenant_id: "TEN-DEMO-ALPHA",
      evidence_id: "EV-DEMO-0003",
      feature_id: "F-150 / F-151 / F-152 / F-153",
      model_profile: "rm-demo-ar-en-doc-v0.4",
      model_version: "2026.08-demo",
      environment: "PUBLIC-CONCEPT-DEMO",
      application_build: "demo-current",
      status: "COMPLETED",
      reviewer_status: "PENDING HUMAN REVIEW"
    },
    securityEvents: [
      ["11:04", "Blocked evidence deletion", "TV-WORM-403"],
      ["10:16", "Cross-tenant request denied", "TV-TENANT-403"],
      ["09:44", "Vault unwrap policy denied", "TV-VAULT-403"],
      ["08:30", "Restore verification passed", "RECOVERY-VERIFIED"]
    ]
  }
};
