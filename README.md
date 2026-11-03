# Teeroy Tyobee — artist portfolio

A static React/Vite artist portfolio rebuilt from the previous-session recovery inventory. The visual language is dark, cinematic, editorial, and deliberately source-aware: release status, platform conflicts, incomplete citations, and image-rights limitations remain visible in the interface.

## Structure

- `client/src/App.tsx` — route resolution and per-route metadata.
- `client/src/components/` — site chrome, page intro, release cards, artwork placeholders, and provenance labels.
- `client/src/data/artist.ts` — typed editorial content model and recovered release inventory.
- `client/src/pages/` — Home, Catalog, release detail, Press, Media, EPK, and 404 views.
- `client/src/lib/exportEpk.ts` — lazy-loaded `jsPDF` current-content export.
- `client/public/manus-routes.json` — page route declaration.
- `scripts/prerender.ts` — static route HTML and route-specific metadata generation.
- `docs/content-verification.md` — evidence, uncertainty, and image-rights notes.
- `TODO.md` — open editorial and delivery gates.

## Commands

```sh
pnpm install
pnpm check
pnpm test
pnpm build:static
pnpm dev
```

The build is preview-only. It does not configure production hosting, DNS, credentials, or infrastructure. Before a public launch, replace the typographic placeholders with approved artwork, restore exact source URLs, supply cleared press/contact content, configure a real HTTPS origin, and re-run all checks.
