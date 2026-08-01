# RM TraceVault — Interactive Concept Demo v1.0

A static, Vercel-ready interactive proof-of-concept for presenting the RM TraceVault product idea to companies, design partners and investors.

## What is included

- Executive overview dashboard
- Evidence Vault inventory and evidence-detail view
- SHA-512 integrity verification simulation
- WORM / immutable-retention concept status
- Chain-of-custody timeline
- Legal Hold and custody-transfer interactions
- Ingestion workflow and source connector catalogue
- CCTV, files, Microsoft 365, SIEM, API, database and manual upload examples
- Case Workspace, search, notes and governed AI analysis panel
- Technical export package and offline-verification workflow
- Tenant administration, RBAC, MFA, SSO, policies and key-custody concepts
- Package comparison and interactive quote calculator
- Sovereign architecture, PoC controls and delivery-boundary explanation
- Arabic/English toggle, responsive design and investor guided tour

## Important boundary

This is a **front-end concept demo with simulated data only**. It is not a production evidence platform and does not:

- Store or process real evidence
- Connect to SCCC, Alibaba Cloud, Microsoft 365, CCTV or SIEM
- Perform real encryption, hashing, WORM storage or digital signing
- Provide authentication or tenant isolation
- Make a legal-admissibility guarantee

The demo intentionally preserves the distinction between:

- PoC-proven infrastructure controls
- Target product functionality
- Production implementation and independent acceptance

## Local preview

You can open `index.html` directly, or serve the folder:

```bash
python3 -m http.server 3000
```

Then open `http://localhost:3000`.

## Deploy to Vercel

### Option 1 — Vercel dashboard

1. Put this folder in a GitHub repository owned by RM TraceVault.
2. In Vercel, choose **Add New → Project**.
3. Import the repository.
4. Leave Framework Preset as **Other** or allow automatic static detection.
5. Leave Build Command and Output Directory empty.
6. Deploy.

### Option 2 — Vercel CLI

From the project folder:

```bash
vercel
vercel --prod
```

## Main files

- `index.html` — application entry point
- `styles.css` — complete design system and responsive UI
- `data.js` — simulated tenant, evidence, case, connector, package and export data
- `app.js` — routing, rendering and interactive demo workflows
- `vercel.json` — static deployment and security headers
- `assets/` — RM TraceVault logo and simulated CCTV preview

## Suggested repository name

`rm-tracevault-concept-demo`

## Ownership

All product concepts, workflows, branding and business logic are intended to remain owned and controlled by RM TraceVault. The repository should be created under an RM TraceVault-controlled GitHub account or organization.

## Local preview without dependencies

```bash
npm run dev
```

Then open `http://127.0.0.1:3000`.

## Ownership

See `LICENSE_PROPRIETARY.md`. This demo is proprietary to RM TraceVault and must not be used with real evidence or customer data.
