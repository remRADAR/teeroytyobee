# Teeroy editorial reconstruction — implementation plan

## Outcome

Rebuild the Teeroy Tyobee React portfolio around the observable layout language of the public Gojett Framer reference while retaining Teeroy's verified content, five primary destinations, release data, source checks, playback behavior, EPK generation, responsive behavior and reduced-motion support. Keep work on a dedicated feature branch. Do not change production, merge to `main`, change DNS/hosting or deploy publicly.

## Implementation approach

Use the most complete compatible baseline, `feat/teeroy-framer-reconstruction`, which continues `feat/gojett-theme` and contains the React 18/Vite/React Router app, source-aware content model, detail pages, EPK generator, tests, licensed display font and responsive harness. Keep Home, Catalog, Press, Media and Artist/EPK, plus release details.

Reconstruct the visible hierarchy as a compact editorial header, oversized artist masthead, cinematic lead stage, concise profile introduction, selected-work index, press/media feature and direct contact/channel close. Use a near-black/off-white system, condensed display type, fine rules, open image-led proportions and restrained hover/reveal feedback. The selected-work preview changes release title and metadata on pointer hover or keyboard focus. As cleared covers are unavailable, the panel remains a visibly labelled placeholder rather than fabricating a release-image swap. Respect reduced motion and retain the user-requested intermittent, decorative masthead glitch.

The repository records the only artist portrait as having publication clearance pending and contains no approved release covers, press images or other cleared artist photography. Do not render that portrait or use the reference photographer's images. Keep the existing single verified official YouTube source and do not manufacture audio streams or describe it as a multi-track radio.

## Project structure

- `src/App.jsx`: shared app shell and retained route declarations.
- `src/components/Layout.jsx`: header, mobile navigation, latest-release teaser and footer.
- `src/pages/`: home, catalog, release detail, press, media, artist/EPK.
- `src/content/`: artist identity, releases, press, media and verified-source records.
- `src/lib/`: catalog ordering, motion utilities and verified media behavior.
- `src/styles/`: legacy component styles plus `reconstruction.css` for the new visual system.
- `tests/`: existing editorial/content integrity suite.
- `scripts/`: EPK generation and responsive/browser checks.
- `docs/`: public reference analysis, baseline audit, parity matrix, motion report, discrepancy report, test results and current-app screenshots.

## Material constraints

The supplied Framer remix redirects to login in the available browser. No editable project structure, original frame/layer hierarchy, component variants, design tokens or native Teeroy Framer project can be verified or created until authenticated editor access is available. The public reference and Teeroy screenshots are compared by page structure and state, not represented as pixel-perfect source parity. Approved image assets and any direct source audio beyond the single validated video remain necessary dependencies.
