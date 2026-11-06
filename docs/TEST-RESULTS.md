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

## Follow-up: mobile controls and scroll motion — 5 November 2026

- Corrected the compact catalog thumbnail grid so the verified `Wise Up` playback control no longer collapses to a 12 px-wide column. Its measured hit area is 51.2 × 51.2 CSS px at 360 px and 390 px viewport widths; the responsive harness now asserts compact release controls are at least 44 × 44 px.
- Added CSS view-timeline entrances for catalog release rows and selected artist, media and profile cards, plus a subtle scroll-linked artwork-orbit effect. Browser checks confirmed the scroll-timeline rules are supported and active with motion enabled, then resolve to `animation: none` under `prefers-reduced-motion: reduce`.
- `npm run check`: pass, 19/19 tests and production build. `BASE_URL=http://127.0.0.1:5173 npm run check:responsive`: pass across six routes × five viewports plus reduced motion, 0 errors and 0 warnings.
- No commit, push or deployment was made. The Cloudflare Pages production deployment observed before this pass remains on commit `df86efef0c97649ff778ace91724791cd5e8911c` (`7052ae32`); the code changes are local and uncommitted.
- `npm audit --omit=dev` reports two moderate advisories in the existing `react-router` 6.30.6 dependency. The audit's automated fix requires a breaking React Router 7 upgrade; dependencies were not changed as part of this focused styling pass.
