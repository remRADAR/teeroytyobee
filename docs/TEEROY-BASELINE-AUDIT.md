# Teeroy repository baseline audit

**Repository:** `remRADAR/teeroytyobee`<br>
**Audit date:** 4 November 2026<br>
**Selected baseline:** `origin/feat/teeroy-framer-reconstruction` (`dfd6de5`)<br>
**Working branch:** `feat/gojett-teeroy-complete-reconstruction`

## Branch review

| Branch | Observed state | Decision |
| --- | --- | --- |
| `main` | README-only starting point; not the implementation baseline. | Do not build from it; do not merge to it. |
| `feat/gojett-theme` (`a5bad3e`) | React/Vite reference-aligned shell, page styling and shared chrome. Earlier snapshot, with incomplete route parity and fewer safeguards. | Keep as ancestry, not checkout baseline. |
| `feat/portfolio-foundation` (`1a867dc`) | Compatible React/Vite foundation with data-driven pages, content tests, EPK generator and responsive harness. | Carry forward relevant foundations already inherited in the selected branch. |
| `feat/artist-portfolio` (`cc7109b`) | Separate TypeScript/React implementation with its own content, routing and asset notes. | Preserve useful provenance notes; do not graft its incompatible app tree. |
| `feat/teeroy-framer-reconstruction` (`dfd6de5`) | Most complete compatible React 18/Vite app: five routes plus release detail, data/content safeguards, local licensed font, EPK generator, responsive browser script, screenshots and prior public-reference study. | Selected baseline for the feature branch. |

The branch history and file trees were inspected. Before changes, the selected branch passed 18 integrity tests and a production build. Its prior `docs/responsive` artifacts belong to the old UI and are not evidence for this feature branch.

## Preserved foundation

The React 18/Vite and React Router app keeps five primary destinations—Home, Catalog, Press, Media and Artist/EPK—plus release details. Catalog and biography content remain data-driven. Solo releases and collaborations stay separate; solo releases are newest-first; unsupported records carry uncertainty; unknown booking/contact fields are withheld; and outbound channels remain restricted to known artist/platform URLs. The media player keeps the single validated YouTube source and loads it only after user action. EPK generation and reduced-motion support remain part of the app.

## Baseline shortcomings identified

The baseline opened as a conventional darkened-portrait music hero, not an editorial sequence of condensed masthead, cinematic stage, short introduction, selected work, press/media and closing contact. The previous component styling used bronze/gold accents and custom motion widgets not verified in the public reference. Release and press information was intact but presented mainly as lists/cards rather than an image-led project index. The repository labels its only supplied portrait as awaiting publication clearance and lacked cleared release or press imagery, yet the previous app rendered the portrait.

## Corrective branch work

The feature branch introduces a consistent near-black/off-white editorial system and condensed, oversized Teeroy mastheads while retaining the five routes and verified content. The home page is ordered as masthead/stage, artist introduction, selected work, press, media and closing contact. The selected-work module now has a large panel and project list; hovering or keyboard-focusing a release changes the panel’s release title and metadata. Since official cover assets are unavailable, the panel remains a clearly labelled artwork-pending placeholder instead of pretending to swap official photos.

The uncleared portrait is no longer rendered on Home, Media or Artist. Missing photos/artwork are labelled for clearance. The user-requested intermittent glitch is a decorative, reduced-motion-safe text layer. Unverified cursor, progress rail and page curtain effects were removed. Mobile navigation, catalogue filters, release details, single-source video playback, EPK generation and reduced-motion support remain functional.

## Verification and outstanding dependencies

Current-branch test/build/browser results are summarized in `docs/TEST-RESULTS.md`; screenshots for all six app routes at five exact sizes are in `docs/visual-parity/teeroy/`. The public reference’s core routes and representative detail routes returned 200 and were captured outside the repository to avoid shipping third-party photography.

The supplied Framer remix still redirects to login, so the actual editable project tree and a separate Framer-native Teeroy site cannot be completed in this session. Approved Teeroy artist photography, release covers and press images remain required for true photo-led parity. No deploy, DNS/hosting change or merge to `main` has been performed.
