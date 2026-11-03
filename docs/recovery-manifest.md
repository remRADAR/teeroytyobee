# Recreated project manifest

This source tree was recreated from the previous-session recovery inventory on 3 Nov 2026. It is a static React/Vite implementation and does not include production deployment, DNS, credentials, or infrastructure changes.

## Application source

- `client/src/main.tsx` — React entrypoint.
- `client/src/App.tsx` — route resolution and route metadata.
- `client/src/components/SiteChrome.tsx` — navigation, footer, status pills, source notes.
- `client/src/components/PageIntro.tsx` — editorial page heading.
- `client/src/components/ReleaseCard.tsx` — release artwork placeholder and catalog card.
- `client/src/data/artist.ts` — typed artist, release, press, and route content.
- `client/src/pages/HomePage.tsx` — Home.
- `client/src/pages/CatalogPage.tsx` — filterable Catalog.
- `client/src/pages/ReleasePage.tsx` — dynamic release detail.
- `client/src/pages/PressPage.tsx` — Press.
- `client/src/pages/MediaPage.tsx` — Media and rights notes.
- `client/src/pages/EpkPage.tsx` — Artist Profile / EPK.
- `client/src/pages/NotFoundPage.tsx` — 404 UI.
- `client/src/lib/exportEpk.ts` — lazy-loaded PDF generation.
- `client/src/lib/navigation.ts` — client-side navigation helper.
- `client/src/index.css` and `client/src/brand-motion.css` — responsive visual system and reduced-motion behavior.

## Build and project files

- `index.html`, `vite.config.ts`, `vitest.config.ts`, `tsconfig.json` — toolchain configuration.
- `package.json`, `pnpm-lock.yaml`, `pnpm-workspace.yaml` — pinned dependencies and build-script policy.
- `scripts/prerender.ts` — static route HTML generation.
- `client/public/manus-routes.json` — required route declaration.
- `tests/artist.test.ts` — content-model and route-manifest regression checks.
- `app.config.ts` — project metadata placeholder pending a management-approved logo asset.
- `README.md`, `TODO.md`, `docs/content-verification.md` — operating notes and editorial gates.

## Generated output

`pnpm build:static` emits `dist/` with the five section pages, 14 release detail pages, `/404/index.html`, root `404.html`, asset bundles, and `manus-routes.json`. Generated output and dependencies are excluded from the recovery source archive.
