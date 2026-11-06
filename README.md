# Teeroy Tyobee — Official Artist Portfolio

A standalone artist portfolio: five sections, structured content, no backend.

Built with Vite + React 18 + React Router. Self-hosted fonts, no runtime dependencies
beyond React, and no third-party analytics or tracking.

---

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
```

Production build and preview:

```bash
npm run build      # → dist/
npm run preview    # http://localhost:4173
```

## Checks

```bash
npm test                 # 18 content-integrity tests (name, ordering, links, flags)
npm run check:responsive # 5 routes × 5 viewports + a prefers-reduced-motion pass
npm run epk              # regenerate the downloadable EPK PDF
```

`check:responsive` needs the preview server running (`npm run preview` in another
shell). It writes screenshots and `report.json` to `docs/responsive/`, and exits
non-zero if any error-level finding is reported.

## Sections

| Route      | Purpose                                                              |
| ---------- | -------------------------------------------------------------------- |
| `/`        | Cinematic introduction, featured release, recent catalogue, media, press, artist feature |
| `/catalog` | Full catalogue — solo and collaborations kept separate, newest first  |
| `/press`   | Coverage archive with explicit verification states                    |
| `/media`   | Click-to-load official video, visual studies, official channels       |
| `/artist`  | Biography, career chronology, EPK download, open items, sources       |

## Content architecture

**All copy and facts live in `src/content/`. Nothing factual is hardcoded in a
component.** Update these files and the site (and the EPK PDF) follow.

```
src/content/
  artist.js      identity, bio, career record, official links, open questions
  releases.js    soloReleases[] and collaborations[] — separate arrays, by design
  press.js       coverage, each item carrying its verification state
  media.js       confirmed videos, official channels, photography placeholders
  sources.js     every source a claim rests on
  site.js        navigation and section copy
```

Derived views live in `src/lib/`:

- `catalog.js` — the single sorter (`byNewest`) and the solo/collaboration composition
- `artwork.js` — every responsive image in one map (srcset widths, aspect, alt)
- `motion.js` — reduced-motion hook, scroll lock

`scripts/build-epk.mjs` renders the PDF from these same modules, so the press kit
cannot drift from the website.

### Adding a release

```js
// src/content/releases.js
{
  id: 'new-single',
  title: 'New Single',
  kind: 'Single',
  year: 2027,
  sortDate: '2027-03-14',      // authoritative ordering key
  summary: '…',
  verified: true,               // false if anything about it is still unconfirmed
  artwork: 'stage',             // a key in src/lib/artwork.js
  links: [
    { platform: 'Apple Music', url: 'https://music.apple.com/…', verified: true },
  ],
  note: null,
}
```

`npm test` will fail if the record breaks an invariant (missing link, duplicate id,
a non-official host, an unverified record without a note explaining why).

## Editorial and verification rules

These are enforced by `tests/content.test.mjs`, not just by convention:

- The artist's name renders from one constant and is always **"Teeroy Tyobee"**.
  The test rejects `TeeRoy`, `Tee Roy`, `TEEROY`, and the smushed `TeeroyTyobee`.
- **Solo releases and collaborations are separate arrays** and can never be merged
  into one list; a release cannot exist in both.
- The catalogue is **newest-first**, derived by one shared comparator.
- Every outbound link must be `https` and must point at an allow-listed official host.
  There is no placeholder or guessed URL anywhere in the content.
- No Spotify destination is published because none has been confirmed.
- Anything unconfirmed is marked, never asserted: a `verified: false` record must
  carry a `note` explaining what is missing.
- The disputed debut chronology (2019 vs 2020) is presented as disputed.
- No award, birth year, booking contact, or personal third-party details are published.

## Music integration

- Outbound links only; no autoplay and no playback on page load.
- The single embedded video is click-to-load, served from
  `youtube-nocookie.com`, and only after a validated 11-character video id.
- No streaming metrics are derived from site traffic; nothing here counts a page
  visit as a stream.

## Accessibility and performance

- Semantic landmarks, one `<h1>` per route, a skip link, and visible focus rings.
- `prefers-reduced-motion` disables every reveal, the glitch animation and smooth
  scrolling — and forces all content visible rather than merely shortening animation.
- Reveal animations use a deterministic geometry check rather than an
  IntersectionObserver, so a fast scroll or a hash jump can never strand content at
  `opacity: 0`.
- Self-hosted `woff2` subsets with `font-display: swap` and preloaded display face.
- Hero image preloaded with a responsive `srcset`; everything below the fold is lazy.
- Explicit intrinsic `width`/`height` on images to prevent layout shift.

## Outstanding content requirements

1. Confirm the catalogue against the distributor account — months, credits and
   completeness.
2. Resolve the 2019 vs 2020 debut chronology with the artist.
3. Approve and supply photography with image credits and usage permissions; replace
   the placeholder studies in `public/media/` and update `src/lib/artwork.js`.
4. Supply a verified booking/press contact to replace the withheld contact block.
5. Confirm award documentation before any award is published.
6. Confirm a Spotify destination if one exists.
7. Re-check the two press links currently marked "awaiting check".

## Security and deployment

No secrets, tokens or credentials are stored in this repository. Deployment, DNS and
hosting configuration are intentionally out of scope and are not performed by this
codebase; there is no deploy script.

## Cloudflare Pages and Workers AI

The feature branch is connected to the Cloudflare Pages project `teeroytyobee`. Pages builds
run `npm run build` and publish `dist/`. The source-controlled `wrangler.jsonc` declares the
Pages output directory and the server-side `AI` Workers AI binding. The guarded `POST /api/ai`
Pages Function is ready for future AI-assisted product features; it does not call a model
during builds or tests and returns a configuration error until the binding is available in the
deployed environment. See `docs/CLOUDFLARE.md` for the integration details.
