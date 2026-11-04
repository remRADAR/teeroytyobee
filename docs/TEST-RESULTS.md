# Test results

**Branch:** `feat/gojett-teeroy-complete-reconstruction`<br>
**Test date:** 4 November 2026<br>
**Preview used:** local Vite on port 5173; no public deployment.

## Automated checks

| Check | Result |
| --- | --- |
| `npm run test` | Pass: 18/18 editorial, release, link/source, press, video and statistics integrity tests. |
| `npm run build` (via `npm run check`) | Pass: Vite 6.4.5 production build, 59 modules transformed. |
| `BASE_URL=http://127.0.0.1:5173 npm run check:responsive` | Pass: six routes × five target viewports plus reduced-motion pass; 0 errors, 0 warnings. |
| Layout and content assertions | Pass: no horizontal overflow; exactly one H1 per route; substantive content; no browser console/request errors; minimum mobile tap targets; reveals settle; reduced-motion leaves content visible. |
| Selected-work screenshot state | Pass: pointer-hovered release updates title; keyboard focus selects a release; note still states that approved release artwork is required. |
| Mobile navigation screenshot state | Pass: drawer opens at 390 px; navigation and Escape close behavior manually verified. |

The automated screenshot set is enumerated in `docs/visual-parity/teeroy/report.json`: first-fold screenshots for six routes × five sizes, full-page home screenshots at all five sizes, a reduced-motion home screenshot, a selected-work-hover desktop screenshot, and a mobile-menu-open screenshot.

## Additional browser interaction checks

A Playwright interaction sweep passed: exact artist name text; mobile menu open/Escape close/route selection; Catalog navigation; separate collaboration filter count; IEMBER release detail route; official YouTube iframe only after user action; player persistence after in-app navigation; and generated EPK PDF response (`200 application/pdf`). Separate checks confirmed hover and keyboard focus update the selected-work preview while no official artwork is fabricated.

## EPK artifact

`npm run epk` generated `public/downloads/teeroy-tyobee-epk.pdf` (65 KB). The local preview served it successfully with HTTP 200 and `application/pdf` content type.

## Limits

These results apply to the current React feature branch. They do not certify the Framer remix/editor, original Framer source components, pixel-perfect image matching, publication rights for pending assets, or a production deployment. The user-supplied remix remains behind Framer login in the available browser.
