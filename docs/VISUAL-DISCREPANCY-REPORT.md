# Visual discrepancy report

**Target viewports:** 1440×900, 1280×800, 768×1024, 390×844, 360×780.<br>
**Current branch:** `feat/gojett-teeroy-complete-reconstruction`.<br>
**Evidence:** Current Teeroy screenshots at all six app routes and all five widths are in `docs/visual-parity/teeroy/`. The public reference was directly captured at those five widths on its home page and at 1280×800/390×844 on Work, About, Journal, Contact, one project-detail route and one journal-article route. Reference images remain outside the repository so third-party photography is not bundled.

| Area | Public reference | Current Teeroy | Difference / status |
| --- | --- | --- | --- |
| Header | Compact desktop row with wordmark, latest-project image/title and Work/About/Journal/Contact; mobile collapses to logo + MENU/CLOSE. | Teeroy wordmark, latest verified-release teaser and five internal destinations. | Structural adaptation is complete; precise reference dimensions and transition timing remain unverified. |
| Masthead | Heavy, condensed, near-full-width type; reference mobile headline remains a single line at 390 px. | `Teeroy Tyobee` single-line display at mobile and split-near-edge presentation at desktop, with a restrained wordmark glitch. | Composition intentionally adapted to the artist name; public screenshots and current screenshots match structurally, not pixel-for-pixel. |
| Home hero | Large wide photographic stage on desktop; taller image crop at mobile. | Cinematic grey/black clearance placeholder and correct responsive stage ratio. | Largest material difference until cleared Teeroy photography is supplied. Reference imagery is not reused. |
| Artist introduction | Short editorial intro following hero. | Verified Teeroy bio and profile CTA. | Content meaning and hierarchy aligned; text/column details correctly differ by subject. |
| Selected work | Desktop split between large active project image and large project-title list; mobile image-led stacked work cards. Hover changes active image/metadata. | Home split between a labeled artwork-pending preview and release list; hover/focus changes release title/metadata. | Selection interaction is implemented, but no real image swap until approved covers are provided. Release catalogue differs from a photographer's project index. |
| Work/detail | Project details use large full-bleed photography, editorial story and next-project navigation. | Data-driven release detail, verified facts/links and artwork placeholder. | Teeroy content structure and existing route behavior retained; photographic story/parity awaits approved artwork. |
| About/Profile | Public About opens on full-bleed blue-toned portrait/gradient; mobile keeps the image tall. | Teeroy artist profile/EPK with a clearly labelled portrait placeholder. | Deliberate palette/identity adaptation and image-clearance constraint. |
| Journal/Press | Pale Journal lead combines a large date/title/summary with editorial portrait imagery; article detail is photo-led. | Near-black Press archive with verified press metadata, link statuses and no unverified article imagery. | Copy, colors and available sources differ; source photographs/article copy are not copied. |
| Contact | Large email headline and contact copy; desktop supporting columns; mobile stacks location/socials/email. | Large Teeroy closing CTA to verified artist channels. Unknown contact email is withheld. | Exact email/headline and some contact text cannot be adapted without verified Teeroy contact details. No form was observed. |
| Palette | Public route backgrounds vary (dark/red-toned Work, blue image-led About, pale Journal, dark Contact). | Consistent near-black/off-white with subdued neutral placeholders. | Deliberate, user-directed Teeroy visual identity adaptation; not source-token parity. |
| Motion | Project selection and mobile navigation observed; exact settings unknown. | Project-title preview state, drawer, subtle hover and reduced-motion-safe text glitch. | No custom cursor, parallax or unverified page curtain. Source timing/easing parity is not claimed. |

## Validation result and blockers

The current branch was captured at every specified viewport and all six application routes. Responsive checks report no overflow, one main heading per route, substantive content, no console/request errors, mobile tap targets, settled reveals and reduced-motion visibility. See `docs/TEST-RESULTS.md` and `docs/visual-parity/teeroy/report.json`.

The editable Framer remix still redirects to login, so source-level constraints/tokens cannot be verified and a separate native Framer Teeroy copy cannot be produced. Approved artist portrait, release cover art, press photos, and direct booking/contact details are not present. The app uses transparent placeholders for those unknowns and does not claim complete image parity.
