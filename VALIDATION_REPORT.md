# RM TraceVault Enterprise Demo v4.0 — Final Validation

| Check | Result | Requirement |
|---|---:|---:|
| Minimum `font-size` in `styles.css` | 11px | ≥ 11px |
| Maximum `font-weight` | 700 | ≤ 700 |
| Weights below 700 used | 400, 500, 600 | > 0 |
| EV-DEMO-0001 SHA-512 length | 128 | 128 |
| EV-DEMO-0002 SHA-512 length | 128 | 128 |
| EV-DEMO-0003 SHA-512 length | 128 | 128 |
| EV-DEMO-0004 SHA-512 length | 128 | 128 |
| EV-DEMO-0005 SHA-512 length | 128 | 128 |
| Unique `border-radius` values | 4 | ≤ 4 |
| `:focus-visible` declarations | 2 | > 0 |
| `[dir="rtl"]` rules | 14 | > 0 |
| Remaining `!important` | 0 | 0 |
| `verify-current` rendered | Yes, header and fingerprint card | Yes |
| Version consistency | `APP_VERSION = "4.0"` drives page title and certificate | Match |
| Manual ASCII PDF generator | Removed | Removed |
| Printable bilingual HTML certificate | Present | Present |
| `v4.css` / `v4-enhancements.js` references | Removed | Removed |

Automated validation command: `node validate-v4.js`
