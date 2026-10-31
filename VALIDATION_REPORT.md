# RM TraceVault Enterprise Demo v4.1 · Validation

| Check | Result | Requirement |
|---|---:|---:|
| Minimum `font-size` in `styles.css` | 11px | ≥ 11px |
| Maximum `font-weight` | 700 | ≤ 700 |
| Weights below 700 used | 400, 500, 600 | > 0 |
| EV-DEMO-0001 to EV-DEMO-0005 SHA-512 length | 128 each | 128 |
| Unique `border-radius` values | 4 | ≤ 4 |
| `:focus-visible` declarations | 2 | > 0 |
| `[dir="rtl"]` rules | 29 | > 0 |
| Remaining `!important` | 0 | 0 |
| `verify-current` rendered | Yes, header and fingerprint card | Yes |
| Version consistency | `APP_VERSION = "4.1"` drives page title and certificate | Match |
| Team Guide route | `#/guide`, 16 screens mapped | ≥ 16 |
| Evidence journey | 8 steps, fingerprint first | 8 |
| Navigation build tags | Every tag has a legend entry | Yes |
| Packages | Basic, Standard, Enterprise, Sovereign | Approved package table |
| Em dashes in public files | 0 | 0 |
| Public-safe content scan | No vendor, contract or funding terms | Clean |

Automated validation commands: `node validate-v4.js` and `node validate-ai-governance.js`
