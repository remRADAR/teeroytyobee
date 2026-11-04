# Reconstruction delivery checklist

## Public reference and Framer access

- [x] Inspect public Home, Work, About, Journal, Contact, project detail and article detail routes; all directly requested routes returned HTTP 200.
- [x] Capture the public homepage at all five mission sizes and the other core/detail routes at desktop/mobile sizes. Keep reference photography outside the repository.
- [x] Document visible hierarchy, route differences, typography, responsive states, interactions and exact properties still unverified.
- [x] Try the supplied remix through the available browser without bypassing login or access control; document that it still redirects to Framer login.
- [ ] Blocked: inspect the editable duplicate's pages/layers/components/variants/breakpoints/tokens/assets/motion after authenticated editor access works.
- [ ] Blocked: create and provide an editable Framer-native Teeroy project/remix URL. The public reference can be reconstructed in React, but its authenticated Framer editor is unavailable.

## Repository and React reconstruction

- [x] Review candidate Git branches; choose the most complete compatible React/Vite baseline and document the decision.
- [x] Use dedicated feature branch `feat/gojett-teeroy-complete-reconstruction`; do not merge to `main`, deploy, change DNS/hosting, or modify credentials.
- [x] Preserve five primary routes (Home, Catalog, Press, Media, Artist Profile/EPK) and release details.
- [x] Build an editorial, condensed, near-black/off-white Teeroy direction while keeping verified releases, artist facts, press records and official links.
- [x] Keep solo and collaboration sets separate; retain newest-first ordering and factual/source uncertainty safeguards.
- [x] Keep verified single-source video playback behind a user action; do not invent radio tracks or direct streams.
- [x] Keep the artist name exact, avoid unverified booking details, and preserve press link-status disclosure and EPK generation.
- [x] Replace the uncleared portrait and missing cover/press imagery with clearly labelled placeholders.
- [x] Add a large selected-release preview; pointer hover and keyboard focus change release title/metadata; approved cover art remains required.
- [x] Remove unverified cursor, progress rail and page-curtain effects; respect reduced-motion preferences.

## Responsive, visual and functional verification

- [x] Create component parity, animation/interaction and visual discrepancy reports with evidence levels and limitations.
- [x] Capture all six Teeroy app routes at 1440×900, 1280×800, 768×1024, 390×844 and 360×780; capture full Home at the same widths and relevant interaction states.
- [x] Run 18 content-integrity tests and production build successfully.
- [x] Run responsive browser checks over six routes × five viewports plus reduced motion: zero errors and zero warnings.
- [x] Manually verify mobile drawer/Escape/navigation, collaboration filter, release detail, official YouTube click-to-load and persistence, selected-work hover/focus, and EPK PDF delivery.
- [x] Record results in `docs/TEST-RESULTS.md` and screenshots under `docs/visual-parity/teeroy/`.

## Final handoff and remaining dependencies

- [x] Generate EPK PDF from existing verified content; do not fabricate official cover art or image permissions.
- [ ] Obtain cleared Teeroy artist photography, approved release covers, press imagery, and any additional direct audio sources before replacing placeholders or building a multi-track player.
- [ ] Push the committed feature branch and record its commit SHA (only if repository credentials permit).
- [ ] Preview link remains a sandbox session URL; no public deployment was requested/performed.
