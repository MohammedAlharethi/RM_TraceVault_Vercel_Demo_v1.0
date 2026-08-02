window.TV4_DATA = {
  product: {
    name: "RM TraceVault",
    version: "Enterprise Concept Demo 4.0",
    tagline: "TRACE. SECURE. PRESERVE.",
    descriptor: "Saudi Sovereign Digital Evidence Custody Platform",
    region: "Saudi Arabia",
    environment: "Public Concept Demonstration",
    release: "DEMO-4.0.0",
    notice: "Fictional records and simulated controls only. No real evidence is processed."
  },
  capabilityLegend: [
    { status: "DEMO SIMULATION", tone: "blue", meaning: "Interactive behavior represented in this public demonstration." },
    { status: "DESIGNED", tone: "purple", meaning: "Documented target capability; production implementation and acceptance are not implied." },
    { status: "PHASE 2", tone: "amber", meaning: "Post-first-go-live capability requiring separate approved scope and acceptance." },
    { status: "FUTURE", tone: "gray", meaning: "Roadmap concept; not a current product capability claim." }
  ],
  tenant: {
    id: "TEN-DEMO-ALPHA",
    name: "Demo Organization Alpha",
    plan: "Sovereign Enterprise",
    region: "Saudi Arabia",
    storageUsedTb: 188.4,
    storageAllowanceTb: 300,
    users: 126,
    activeCases: 97,
    evidenceObjects: 3214872,
    integrityRate: 100,
    legalHolds: 31,
    pendingExports: 4
  },
  evidence: [
    {
      id: "EV-DEMO-0001",
      title: "CCTV_Entrance_2026-07-30_14-32-11.mp4",
      type: "Video",
      mime: "video/mp4",
      source: "CCTV / VMS",
      sourceDetail: "Demo Facility — Entrance Camera 04",
      caseId: "CASE-DEMO-0192",
      caseName: "Unauthorized Access Review",
      size: "2.41 GB",
      collected: "30 Jul 2026, 14:32:11 AST",
      ingested: "30 Jul 2026, 14:33:02 AST",
      verified: "30 Jul 2026, 14:34:05 AST",
      retentionEnd: "30 Jul 2033",
      legalHold: true,
      status: "PROTECTED",
      integrity: "VERIFIED",
      trustScore: 100,
      hash: "9f7b2c6e2e1a8f0b4c6d9e7f3a7c2d6f1b3e9a8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0",
      encryption: {
        algorithm: "AES-256-GCM",
        chunkSize: "64 MiB",
        dekScope: "New 256-bit DEK per evidence generation",
        aad: "tenant_id | evidence_id | chunk_index | total_chunks | profile_version",
        keyCustody: "Tenant-bound Transit custody; cloud KMS root layer",
        plaintextDekStored: false
      },
      timestamp: {
        profile: "RFC 3161 capability",
        tokenId: "TSA-DEMO-6F21A9",
        status: "SIMULATED VALID"
      },
      immutable: {
        mode: "Object Lock — COMPLIANCE",
        versioning: true,
        deleteSupported: false,
        state: "ACTIVE"
      },
      tags: ["CCTV", "Access", "Priority", "Legal Hold"],
      versions: [
        { version: "v1", objectId: "OBJ-DEMO-A1-0001", created: "30 Jul 2026, 14:33:24 AST", status: "Authoritative protected object" }
      ],
      custody: [
        { seq: 1, time: "30 Jul 2026, 14:32:11 AST", action: "COLLECTED", actor: "Connector: CCTV-VMS-04", reason: "Authorized source acquisition", detail: "Source frame sequence, device identity and acquisition metadata captured.", signature: "VALID" },
        { seq: 2, time: "30 Jul 2026, 14:32:18 AST", action: "UPLOAD_SESSION_CREATED", actor: "Secure Ingestion Service", reason: "New evidence intake", detail: "Tenant authorization, case scope and upload policy validated.", signature: "VALID" },
        { seq: 3, time: "30 Jul 2026, 14:33:02 AST", action: "ENCRYPTED", actor: "Encryption Service", reason: "Evidence protection", detail: "Authenticated 64 MiB chunks created under a per-evidence data key.", signature: "VALID" },
        { seq: 4, time: "30 Jul 2026, 14:33:24 AST", action: "IMMUTABLE_COMMIT", actor: "Evidence Vault Service", reason: "Preservation", detail: "Object committed under Compliance Mode retention with versioning enabled.", signature: "VALID" },
        { seq: 5, time: "30 Jul 2026, 14:34:05 AST", action: "INTEGRITY_VERIFIED", actor: "Integrity Service", reason: "Post-commit verification", detail: "Whole-evidence SHA-512 matched the registered integrity record.", signature: "VALID" },
        { seq: 6, time: "31 Jul 2026, 09:18:42 AST", action: "VIEWED", actor: "Demo Investigator A", reason: "Active case review", detail: "Read-only streaming access granted under case authorization.", signature: "VALID" },
        { seq: 7, time: "31 Jul 2026, 11:04:10 AST", action: "LEGAL_HOLD_APPLIED", actor: "Demo Legal Reviewer", reason: "Active legal review", detail: "Retention expiry suspended while the Legal Hold remains active.", signature: "VALID" }
      ]
    },
    {
      id: "EV-DEMO-0002",
      title: "Executive_Mailbox_Export.pst",
      type: "Email",
      mime: "application/vnd.ms-outlook",
      source: "Microsoft 365",
      sourceDetail: "Demo Executive Mailbox",
      caseId: "CASE-DEMO-0421",
      caseName: "Financial Activity Review",
      size: "12.80 GB",
      collected: "30 Jul 2026, 11:05:00 AST",
      ingested: "30 Jul 2026, 11:09:31 AST",
      verified: "30 Jul 2026, 11:12:08 AST",
      retentionEnd: "30 Jul 2033",
      legalHold: true,
      status: "PROTECTED",
      integrity: "VERIFIED",
      trustScore: 100,
      hash: "8d67f7a823c91e6a3f2d1847c0b9e5f6328a4d9f7b3e1c5a0d8f9b2c6a3e7d4f8c1a9b5e3d7f2a4c6e8b0d1f3a5c7e9b2d4f6a8c0e1b3d5f7a9c2e4b6d8",
      encryption: { algorithm: "AES-256-GCM", chunkSize: "64 MiB", dekScope: "New 256-bit DEK per evidence generation", aad: "Tenant and evidence bound", keyCustody: "Tenant-bound Transit custody", plaintextDekStored: false },
      timestamp: { profile: "RFC 3161 capability", tokenId: "TSA-DEMO-2218B0", status: "SIMULATED VALID" },
      immutable: { mode: "Object Lock — COMPLIANCE", versioning: true, deleteSupported: false, state: "ACTIVE" },
      tags: ["Email", "M365", "Legal Hold"],
      versions: [{ version: "v1", objectId: "OBJ-DEMO-A1-0002", created: "30 Jul 2026, 11:11:22 AST", status: "Authoritative protected object" }],
      custody: [
        { seq: 1, time: "30 Jul 2026, 11:05:00 AST", action: "COLLECTION_AUTHORIZED", actor: "Demo Tenant Administrator", reason: "Approved case request", detail: "Mailbox export scope approved.", signature: "VALID" },
        { seq: 2, time: "30 Jul 2026, 11:09:31 AST", action: "RECEIVED", actor: "M365 Evidence Connector", reason: "Connector delivery", detail: "Transfer manifest and source metadata captured.", signature: "VALID" },
        { seq: 3, time: "30 Jul 2026, 11:10:04 AST", action: "ENCRYPTED", actor: "Encryption Service", reason: "Evidence protection", detail: "Authenticated chunks generated.", signature: "VALID" },
        { seq: 4, time: "30 Jul 2026, 11:11:22 AST", action: "IMMUTABLE_COMMIT", actor: "Evidence Vault Service", reason: "Preservation", detail: "Compliance retention activated.", signature: "VALID" },
        { seq: 5, time: "30 Jul 2026, 11:12:08 AST", action: "INTEGRITY_VERIFIED", actor: "Integrity Service", reason: "Post-commit verification", detail: "SHA-512 matched.", signature: "VALID" }
      ]
    },
    {
      id: "EV-DEMO-0003",
      title: "Payment_Document_88421.pdf",
      type: "Document",
      mime: "application/pdf",
      source: "Files & Folders",
      sourceDetail: "Demo Finance Repository",
      caseId: "CASE-DEMO-0421",
      caseName: "Financial Activity Review",
      size: "1.20 MB",
      collected: "29 Jul 2026, 09:44:01 AST",
      ingested: "29 Jul 2026, 09:45:05 AST",
      verified: "29 Jul 2026, 09:45:32 AST",
      retentionEnd: "29 Jul 2031",
      legalHold: false,
      status: "PROTECTED",
      integrity: "VERIFIED",
      trustScore: 100,
      hash: "78fac1e9b3d57a9c2e4b6d8f0a1c3e5b7d9f2a4c6e8b0d1f3a5c7e9b2d4f6a8c0e1b3d5f7a9c2e4b6d8f0a1c3e5b7d9f2a4c6e8b0d1f3a5c7e9b2d4f6a8c",
      encryption: { algorithm: "AES-256-GCM", chunkSize: "64 MiB", dekScope: "New 256-bit DEK per evidence generation", aad: "Tenant and evidence bound", keyCustody: "Tenant-bound Transit custody", plaintextDekStored: false },
      timestamp: { profile: "RFC 3161 capability", tokenId: "TSA-DEMO-D30C15", status: "SIMULATED VALID" },
      immutable: { mode: "Object Lock — COMPLIANCE", versioning: true, deleteSupported: false, state: "ACTIVE" },
      tags: ["Document", "Finance", "PDF"],
      versions: [{ version: "v1", objectId: "OBJ-DEMO-A1-0003", created: "29 Jul 2026, 09:45:20 AST", status: "Authoritative protected object" }],
      custody: [
        { seq: 1, time: "29 Jul 2026, 09:44:01 AST", action: "SELECTED", actor: "Demo Investigator C", reason: "Case collection", detail: "Source path and metadata captured.", signature: "VALID" },
        { seq: 2, time: "29 Jul 2026, 09:45:05 AST", action: "VALIDATION_PASSED", actor: "Secure Ingestion Service", reason: "Intake validation", detail: "Format, size and authorization checks passed.", signature: "VALID" },
        { seq: 3, time: "29 Jul 2026, 09:45:20 AST", action: "IMMUTABLE_COMMIT", actor: "Evidence Vault Service", reason: "Preservation", detail: "Protected object registered.", signature: "VALID" },
        { seq: 4, time: "29 Jul 2026, 09:45:32 AST", action: "INTEGRITY_VERIFIED", actor: "Integrity Service", reason: "Post-commit verification", detail: "SHA-512 matched.", signature: "VALID" }
      ]
    },
    {
      id: "EV-DEMO-0004",
      title: "security-login-events-2026-07-29.log",
      type: "Log",
      mime: "text/plain",
      source: "SIEM / Syslog",
      sourceDetail: "Demo Security Analytics",
      caseId: "CASE-DEMO-0192",
      caseName: "Unauthorized Access Review",
      size: "2.40 MB",
      collected: "29 Jul 2026, 08:15:00 AST",
      ingested: "29 Jul 2026, 08:15:18 AST",
      verified: "29 Jul 2026, 08:16:01 AST",
      retentionEnd: "29 Jul 2031",
      legalHold: false,
      status: "PROTECTED",
      integrity: "VERIFIED",
      trustScore: 100,
      hash: "3a91b7d20f4c6e8a1b3d5f7c9e2a4b6d8f0c1e3a5b7d9f2c4e6a8b0d1f3c5e7a9b2d4f6c8e0a1b3d5f7c9e2a4b6d8f0c1e3a5b7d9f2c4e6a8b0d1f3c5e7a9b",
      encryption: { algorithm: "AES-256-GCM", chunkSize: "64 MiB", dekScope: "New 256-bit DEK per evidence generation", aad: "Tenant and evidence bound", keyCustody: "Tenant-bound Transit custody", plaintextDekStored: false },
      timestamp: { profile: "RFC 3161 capability", tokenId: "TSA-DEMO-F29110", status: "SIMULATED VALID" },
      immutable: { mode: "Object Lock — COMPLIANCE", versioning: true, deleteSupported: false, state: "ACTIVE" },
      tags: ["Security", "Log", "SIEM"],
      versions: [{ version: "v1", objectId: "OBJ-DEMO-A1-0004", created: "29 Jul 2026, 08:15:18 AST", status: "Authoritative protected object" }],
      custody: [
        { seq: 1, time: "29 Jul 2026, 08:15:00 AST", action: "CHECKPOINT_RECORDED", actor: "SIEM Connector", reason: "Scheduled collection", detail: "Source offset and sequence registered.", signature: "VALID" },
        { seq: 2, time: "29 Jul 2026, 08:15:18 AST", action: "ENCRYPTED_AND_COMMITTED", actor: "Evidence Vault Service", reason: "Preservation", detail: "Protected object registered.", signature: "VALID" },
        { seq: 3, time: "29 Jul 2026, 08:16:01 AST", action: "INTEGRITY_VERIFIED", actor: "Integrity Service", reason: "Post-commit verification", detail: "SHA-512 matched.", signature: "VALID" }
      ]
    },
    {
      id: "EV-DEMO-0005",
      title: "Forensic_Image_Workstation_07.E01",
      type: "Disk Image",
      mime: "application/octet-stream",
      source: "Manual Upload",
      sourceDetail: "Demo Forensics Workstation",
      caseId: "CASE-DEMO-0510",
      caseName: "Internal Device Examination",
      size: "42.81 GB",
      collected: "28 Jul 2026, 16:02:00 AST",
      ingested: "28 Jul 2026, 16:19:40 AST",
      verified: "28 Jul 2026, 16:21:09 AST",
      retentionEnd: "28 Jul 2036",
      legalHold: true,
      status: "PROTECTED",
      integrity: "VERIFIED",
      trustScore: 100,
      hash: "9c12aa783e5b7d9f2a4c6e8b0d1f3a5c7e9b2d4f6a8c0e1b3d5f7a9c2e4b6d8f0a1c3e5b7d9f2a4c6e8b0d1f3a5c7e9b2d4f6a8c0e1b3d5f7a9c2e4b6",
      encryption: { algorithm: "AES-256-GCM", chunkSize: "64 MiB", dekScope: "New 256-bit DEK per evidence generation", aad: "Tenant and evidence bound", keyCustody: "Tenant-bound Transit custody", plaintextDekStored: false },
      timestamp: { profile: "RFC 3161 capability", tokenId: "TSA-DEMO-EBEE03", status: "SIMULATED VALID" },
      immutable: { mode: "Object Lock — COMPLIANCE", versioning: true, deleteSupported: false, state: "ACTIVE" },
      tags: ["Forensic", "Disk Image", "Legal Hold"],
      versions: [{ version: "v1", objectId: "OBJ-DEMO-A1-0005", created: "28 Jul 2026, 16:20:33 AST", status: "Authoritative protected object" }],
      custody: [
        { seq: 1, time: "28 Jul 2026, 16:02:00 AST", action: "FORENSIC_IMAGE_ACQUIRED", actor: "Demo Forensic Examiner", reason: "Approved examination", detail: "Acquisition workstation and source-media identifiers recorded.", signature: "VALID" },
        { seq: 2, time: "28 Jul 2026, 16:19:40 AST", action: "MULTIPART_UPLOAD_COMPLETED", actor: "Secure Ingestion Service", reason: "Large evidence intake", detail: "All chunks present and ordered.", signature: "VALID" },
        { seq: 3, time: "28 Jul 2026, 16:20:33 AST", action: "IMMUTABLE_COMMIT", actor: "Evidence Vault Service", reason: "Preservation", detail: "Protected object registered.", signature: "VALID" },
        { seq: 4, time: "28 Jul 2026, 16:21:09 AST", action: "INTEGRITY_VERIFIED", actor: "Integrity Service", reason: "Post-commit verification", detail: "Whole-image SHA-512 matched.", signature: "VALID" },
        { seq: 5, time: "28 Jul 2026, 16:25:00 AST", action: "LEGAL_HOLD_APPLIED", actor: "Demo Legal Reviewer", reason: "Active case preservation", detail: "Legal Hold activated.", signature: "VALID" }
      ]
    }
  ],
  cases: [
    { id: "CASE-DEMO-0192", name: "Unauthorized Access Review", owner: "Demo Investigator A", status: "ACTIVE", priority: "CRITICAL", evidence: 1284, alerts: 1, exports: 0, updated: "4 hours ago" },
    { id: "CASE-DEMO-0421", name: "Financial Activity Review", owner: "Demo Investigator B", status: "ACTIVE", priority: "HIGH", evidence: 3724, alerts: 2, exports: 1, updated: "2 hours ago" },
    { id: "CASE-DEMO-0510", name: "Internal Device Examination", owner: "Demo Forensic Examiner", status: "UNDER REVIEW", priority: "MEDIUM", evidence: 428, alerts: 0, exports: 2, updated: "Yesterday" }
  ],
  connectors: [
    { id: "CON-CCTV-01", name: "CCTV / VMS", status: "CONNECTED", health: 100, detail: "3 approved demo sources", volume: "312.4 GB", auth: "Service identity", capability: "DEMO SIMULATION" },
    { id: "CON-FILE-01", name: "Files & Folders", status: "CONNECTED", health: 100, detail: "8 monitored demo paths", volume: "128.7 GB", auth: "Scoped connector identity", capability: "DEMO SIMULATION" },
    { id: "CON-M365-01", name: "Microsoft 365", status: "READY", health: 100, detail: "Demo mailbox connector", volume: "94.2 GB", auth: "Tenant consent simulation", capability: "DESIGNED" },
    { id: "CON-SIEM-01", name: "SIEM / Syslog", status: "CONNECTED", health: 99.9, detail: "2 fictional endpoints", volume: "51.9 GB", auth: "mTLS simulation", capability: "DEMO SIMULATION" },
    { id: "CON-API-01", name: "Secure API", status: "CONNECTED", health: 100, detail: "5 demo M2M clients", volume: "37.6 GB", auth: "M2M token simulation", capability: "DEMO SIMULATION" },
    { id: "CON-S3-01", name: "S3-Compatible Ingestion", status: "DESIGNED", health: null, detail: "SigV4 intake; DeleteObject unsupported under WORM", volume: "—", auth: "Scoped access key", capability: "DESIGNED" }
  ],
  users: [
    { id: "USR-DEMO-001", name: "Demo Tenant Administrator", role: "Tenant Admin", mfa: "VERIFIED", lastLogin: "Today, 10:18 AST", access: "Privileged / step-up required" },
    { id: "USR-DEMO-002", name: "Demo Investigator A", role: "Investigator", mfa: "VERIFIED", lastLogin: "Today, 09:42 AST", access: "Case-scoped" },
    { id: "USR-DEMO-003", name: "Demo Legal Reviewer", role: "Legal Reviewer", mfa: "VERIFIED", lastLogin: "Yesterday, 18:31 AST", access: "Hold approvals" },
    { id: "USR-DEMO-004", name: "Demo External Reviewer", role: "Guest Reviewer", mfa: "VERIFIED", lastLogin: "29 Jul 2026", access: "Time-limited / read-only" }
  ],
  audit: [
    { id: "AUD-90191", time: "31 Jul 2026, 11:04:10 AST", category: "CUSTODY", action: "LEGAL_HOLD_APPLIED", actor: "Demo Legal Reviewer", target: "EV-DEMO-0001", result: "SUCCESS", tenant: "TEN-DEMO-ALPHA", ip: "192.0.2.44" },
    { id: "AUD-90190", time: "31 Jul 2026, 10:42:08 AST", category: "EXPORT", action: "PACKAGE_GENERATED", actor: "Demo Investigator A", target: "EXP-DEMO-0017", result: "SUCCESS", tenant: "TEN-DEMO-ALPHA", ip: "192.0.2.31" },
    { id: "AUD-90189", time: "31 Jul 2026, 09:18:42 AST", category: "ACCESS", action: "EVIDENCE_VIEWED", actor: "Demo Investigator A", target: "EV-DEMO-0001", result: "SUCCESS", tenant: "TEN-DEMO-ALPHA", ip: "192.0.2.31" },
    { id: "AUD-90188", time: "31 Jul 2026, 08:51:03 AST", category: "INTEGRITY", action: "VERIFY_COMPLETED", actor: "Integrity Service", target: "EV-DEMO-0004", result: "SUCCESS", tenant: "TEN-DEMO-ALPHA", ip: "service" },
    { id: "AUD-90187", time: "31 Jul 2026, 08:15:18 AST", category: "INGESTION", action: "IMMUTABLE_COMMIT", actor: "Secure Connector Service", target: "BATCH-DEMO-0072", result: "SUCCESS", tenant: "TEN-DEMO-ALPHA", ip: "service" }
  ],
  exports: [
    { id: "EXP-DEMO-0017", caseId: "CASE-DEMO-0421", evidenceCount: 14, size: "22.47 GB", created: "30 Jul 2026, 10:42 AST", requestedBy: "Demo Investigator A", status: "VERIFICATION READY" },
    { id: "EXP-DEMO-0012", caseId: "CASE-DEMO-0192", evidenceCount: 6, size: "4.88 GB", created: "29 Jul 2026, 15:09 AST", requestedBy: "Demo Investigator B", status: "COMPLETE" },
    { id: "EXP-DEMO-0008", caseId: "CASE-DEMO-0510", evidenceCount: 3, size: "42.83 GB", created: "28 Jul 2026, 17:20 AST", requestedBy: "Demo Forensic Examiner", status: "COMPLETE" }
  ],
  apiEndpoints: [
    { method: "POST", path: "/api/v1/evidence/upload/init", purpose: "Initiate chunked upload and return a session", status: "DEMO SIMULATION" },
    { method: "POST", path: "/api/v1/evidence/upload/{session}/finalize", purpose: "Finalize upload and trigger protection workflow", status: "DEMO SIMULATION" },
    { method: "GET", path: "/api/v1/evidence/{id}/download", purpose: "Stream authorized decrypted evidence", status: "DESIGNED" },
    { method: "POST", path: "/api/v1/evidence/{id}/presigned-url", purpose: "Generate a TTL-bound authorized URL", status: "DEMO SIMULATION" },
    { method: "POST", path: "/api/v1/evidence/{id}/evidence-package", purpose: "Generate an authorized technical evidence package", status: "DEMO SIMULATION" },
    { method: "GET", path: "/api/v1/integrity/{id}/verify", purpose: "Verify SHA-512 and timestamp token state", status: "DEMO SIMULATION" },
    { method: "GET", path: "/api/v1/integrity/{id}/chain", purpose: "Return complete chain of custody", status: "DEMO SIMULATION" },
    { method: "GET", path: "/api/v1/audit/events", purpose: "Query filtered, paginated audit events", status: "DEMO SIMULATION" },
    { method: "POST", path: "/api/v1/tenants/{id}/data-subject-request", purpose: "Route a privacy/data-subject workflow", status: "DESIGNED" },
    { method: "GET", path: "/api/v1/auth/oidc/{tenant}/login", purpose: "Tenant-aware OIDC login flow", status: "DESIGNED" }
  ],
  aiRuns: [
    {
      analysisRunId: "AIRUN-DEMO-20260730-001",
      tenantId: "TEN-DEMO-ALPHA",
      evidenceId: "EV-DEMO-0003",
      capabilityId: "F-150",
      capability: "Arabic / English OCR",
      modelProfile: "OCR-PROFILE-DEMO-v1.2",
      environment: "PUBLIC DEMO",
      releaseBuild: "DEMO-4.0.0",
      started: "30 Jul 2026, 15:10:02 AST",
      ended: "30 Jul 2026, 15:10:11 AST",
      resultStatus: "SIMULATED COMPLETE",
      reviewerStatus: "PENDING HUMAN REVIEW",
      confidence: "92% illustrative",
      derivedOnly: true,
      output: "Illustrative extracted text from a fictional payment document. This result is derived analysis and does not alter the authoritative evidence object."
    },
    {
      analysisRunId: "AIRUN-DEMO-20260730-002",
      tenantId: "TEN-DEMO-ALPHA",
      evidenceId: "EV-DEMO-0002",
      capabilityId: "F-151",
      capability: "PII Detection",
      modelProfile: "PII-PROFILE-DEMO-v0.9",
      environment: "PUBLIC DEMO",
      releaseBuild: "DEMO-4.0.0",
      started: "30 Jul 2026, 15:14:22 AST",
      ended: "30 Jul 2026, 15:15:03 AST",
      resultStatus: "SIMULATED COMPLETE",
      reviewerStatus: "REVIEWED — ANNOTATED",
      confidence: "Illustrative class scores",
      derivedOnly: true,
      output: "Fictional PII findings represented for workflow demonstration. No production data or model is used."
    }
  ],
  incidents: [
    { id: "INC-DEMO-0042", severity: "S1", title: "Repeated protected-object deletion attempts", commander: "RM Demo Incident Commander", status: "CONTAINED", opened: "31 Jul 2026, 12:05 AST", scope: "Evidence storage interface", decision: "Preserve evidence and block actor session" },
    { id: "INC-DEMO-0038", severity: "S2", title: "Connector authentication failures", commander: "RM Demo Incident Commander", status: "MONITORING", opened: "30 Jul 2026, 17:20 AST", scope: "Demo connector", decision: "Rotate fictional connector credential" }
  ],
  maturity: [
    { area: "Evidence upload and metadata", status: "DEMO SIMULATION", note: "Interactive flow represented with fictional records." },
    { area: "WORM delete prevention", status: "DEMO SIMULATION", note: "Explicit blocked delete behavior and audit event are simulated." },
    { area: "SHA-512 integrity verification", status: "DEMO SIMULATION", note: "Verification response and certificate are generated in-browser." },
    { area: "Tenant-aware authorization", status: "DEMO SIMULATION", note: "Cross-tenant access is explicitly rejected in the demo." },
    { area: "Envelope encryption and key custody", status: "DESIGNED", note: "Architecture is shown; no production cryptography runs in this static site." },
    { area: "RFC 3161 timestamping", status: "DESIGNED", note: "A simulated token state is displayed; no live TSA is called." },
    { area: "AI OCR / PII / classification / semantic search", status: "PHASE 2", note: "Derived-analysis UI is represented with provenance and human-review controls." },
    { area: "Manipulation / deepfake indicators", status: "FUTURE", note: "Not represented as a current capability." },
    { area: "Independent certification / legal admissibility", status: "NOT CLAIMED", note: "The public demo does not claim certification, court admissibility or regulatory compliance." }
  ]
};