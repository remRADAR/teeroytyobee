# Teeroy reference study and existing-project audit

**Date:** 4 November 2026
**Reference:** [Cole Navarro — public Framer site](https://gojett.framer.website/) [1]
**Destination:** `remRADAR/Teeroytyobee`

The public Framer experience is the design and interaction benchmark. Its photography, identity, copy, logos, and portfolio content are not Teeroy assets and are not reused. This report separates browser-observed behavior from implementation decisions and source-data limitations.

## Reference experience

### Page and component inventory

The home route combines a compact global header, a one-line oversized “NAVARRO STUDIO” masthead, a full-width photographic hero, a brief introduction/About link, selected work, an eight-mark client/credit strip, journal teasers, a contact call-to-action, and a global footer. The global header contains a wordmark, a “Latest work: Red Room” thumbnail/title teaser, and Work, About, Journal, and Contact destinations. The header remains visible in the scroll states inspected.

The accessible route inventory includes `/work` and project details such as `/work/red-room`; `/about`; `/journal` and article details such as `/journal/one-colour-one-gesture`; and `/contact`. The Work index presents a large project list with year labels, active project metadata, and a photographic background. Project detail pages pair a cover and metadata with a short story, image sequence, and next-project link. Journal uses an editorial lead story and article cards; an article detail has a large title/lead image, copy, further images, a quote, and related posts. Contact exposes email and social destinations; no contact form was observed. [1] [2] [3] [4] [5]

### Visual and typographic specification

The desktop palette is near-black charcoal with warm off-white display type; color mostly comes from photography. The compact header is approximately 62 pixels tall at the inspected desktop width and uses fine vertical separators. At 1280 × 800, page gutters are about 24 pixels. The oversized masthead is heavy, tightly set condensed uppercase type and spans almost the entire available width. Navigation, dates, and metadata are much smaller, widely letter-spaced, and often monospaced.

The home image begins beneath the masthead with narrow side gutters and uses a wide, cinematic crop. The Work index balances small project metadata on the left with large stacked project names and years on the right; the active image sits behind the list. Sections favor full-bleed imagery, uneven editorial grids, open space, and fine rules rather than card-heavy framing.

At 390 × 844, the header collapses to the wordmark and a “MENU” control. The masthead and image crop adapt to the narrow view. Opening MENU reveals a full-screen pale panel with large condensed Work, About, Journal, and Contact links, secondary labels, a Close control, email/social destinations, and location. This is an observed mobile state; the precise breakpoint was not established.

### Animation and interaction inventory

The reference Work index was tested with pointer hover. Selecting another title changes the active project styling and swaps the background image and year/metadata. The visible effect is an image/title state change; its easing and duration were not measured. The mobile MENU control opens the navigation panel and its Close control returns to the page.

The header remained visible while scrolling in the captures tested. The inspected header element itself computed as `position: relative`, so the exact sticky/fixed implementation was not inferred. A scrolled home capture showed the large title and hero image visually overlapping, but the trigger and intended sequence were not established. Links were followed across the observed site routes, work, journal, contact, email, and social destinations.

No reliable evidence was gathered for a custom cursor, horizontal drag, autoplay, elaborate loading sequence, precise scroll-trigger timing, or page-transition choreography. Those effects are not claimed as reference behavior. The public page is the source of evidence; the private Framer implementation was not inspected.

### Responsive behavior and assets

At 1280 × 800, the navigation remains horizontal and the masthead occupies most of the width. At 390 × 844, it becomes a compact wordmark/Menu header, the navigation becomes a full-screen overlay, and the hero image remains prominent with a mobile crop. These are observed viewport states, not a complete breakpoint map. Tablet widths and intermediate breakpoints were not available as source-level evidence.

The reference images and marks are served from Framer-hosted URLs. They are reference-only and must not be copied into the Teeroy site. The selected Teeroy project has one portrait documented as user-supplied on another feature branch, subject to final publication clearance. It has no approved release covers, additional cleared artist photography, or press article imagery. The existing project referenced Sofia Sans Extra Condensed but did not include its font files; the development branch now bundles the Latin upright and italic variable WOFF2 subsets locally under the SIL Open Font License. The license and provenance are documented in `docs/asset-licenses.md` and `public/fonts/OFL.txt`. [6] [7]

## Existing project audit

The repository's `main` branch contains only a README. The repository also contains two distinct implementation branches. `feat/gojett-theme` is the newest, reference-aligned React/Vite application. `feat/artist-portfolio` is a separate React/Vite implementation with an EPK and release-detail pattern, recovery/content notes, and the portrait `client/public/artist-hero.jpeg`. The branches diverge after the initial commit. Development therefore continues from the newer `feat/gojett-theme` implementation and carries forward only the documented portrait and useful source context.

The selected application is React 18 with Vite and React Router. Its five primary destinations are `/`, `/catalog`, `/press`, `/media`, and `/artist`. Shared code includes `Layout.jsx` for header/footer, `Motion.jsx` for cursor, scroll rail, and page curtain, `Img.jsx` for responsive images/reveals, `ReleaseRow.jsx` for catalogue links and verification badges, and page components for the five destinations. Content is data-driven under `src/content/`; catalogue sorting and featured-release selection are in `src/lib/catalog.js`.

Existing useful behavior includes responsive navigation, source/verification notes, reduced-motion handling, a click-to-load official YouTube video, and an EPK/PDF generator script. Editorial safeguards keep solo releases separate from collaborations, sort entries from source dates, flag uncertain records, withhold unknown contact fields, and restrict outbound links to known official hosts. These safeguards remain in force.

The selected branch initially had no built-in audio player and only one confirmed video ID (`Wise Up`) as a playable media source. It has no audio files or verified direct track-stream URLs. A truthful multi-track radio queue cannot be populated from the current repository evidence.

### Baseline defects and constraints

The original selected branch referenced `/media/*.webp` images and `/fonts/*.woff2` files that were absent from `public/`, so those requests failed at runtime even though the production build completed. The original `npm test` script invoked `node --test tests/` and failed under Node 22. On the development branch, missing image references were removed or replaced with the documented portrait, the missing poster font was restored as a local licensed asset, and the test script was corrected to discover the actual test files.

The existing press archive did not have verified local images for every article. The media gallery used missing placeholder image paths. Release cover art was not available. The resulting implementation does not invent press photos or official release covers: it uses the documented portrait where appropriate, a verified video source, and explicitly labeled typographic design previews.

## Integration map

| Reference component | Existing Teeroy component | Required adaptation | Final implementation |
| --- | --- | --- | --- |
| Global header and mobile menu | `Header` in `src/components/Layout.jsx` | Keep five Teeroy destinations; align the desktop header rhythm and text-only mobile Menu control with observed behavior | Condensed wordmark, active route, “Latest release” IEMBER teaser, desktop nav, touch-sized mobile drawer |
| Oversized masthead and image hero | `Home.jsx`, `Img.jsx`, `sections.css` | Use Teeroy identity and user-supplied portrait; retain dark gradient; identify requested glitch as a Teeroy treatment | Responsive cinematic hero with retained project copy, portrait crop, and reduced-motion-safe intermittent image glitch |
| Work/project index | `Catalog.jsx`, `ReleaseRow.jsx`, `releases.js` | Translate projects to releases, keep newest-first ordering and separate collaborations | Interactive release links, verified destinations and status notes; dedicated detail path |
| Project detail/story | No selected-branch detail route; alternative branch has a release-detail pattern | Use release data only; avoid photographer case-study copy or unsupported music claims | `/catalog/:releaseId` pages with source-backed metadata, track list, verified links, and non-official-art labels |
| Client/credit strip | Collaboration and artist-career data | Include only documented associations | Unresolved credits remain qualified; no invented client or award claims |
| Journal and article archive | `Press.jsx`, `src/content/press.js` | Translate journal to press/interviews; avoid guessed URLs and imagery | Editorial press archive with dates, links, and verification disclosures |
| Media gallery | `Media.jsx`, `src/content/media.js` | Use verified video and supplied portrait; replace missing placeholders without claiming missing rights | Rights-aware media index and click-to-load official video |
| About and contact | `Artist.jsx`, `artist.js`, shared footer | Preserve verified biography and channels; withhold absent contact fields | Artist Profile/EPK with source-aware profile and official destinations |
| Footer and contact CTA | `Footer` in `Layout.jsx` | Retain working internal and official links; do not fabricate booking details | Editorial footer with verified links and accurate contact availability |
| Reveal and motion | `Motion.jsx`, `lib/motion.js`, CSS | Preserve existing reveal behavior and reduced-motion support; distinguish reference observations from project direction | Existing reveal system retained; image glitch added as a Teeroy-specific treatment |
| Radio/playback | No original radio; one verified video source in media data | Avoid fake play/pause/progress or unsupported track queue | Persistent single-source dock using native YouTube controls; multi-track playback awaits verified audio URLs |

## Component parity checklist

- [x] All five core destinations remain in the existing application.
- [x] Header, footer, desktop navigation, mobile Menu drawer, and working internal destinations are implemented.
- [x] Mobile drawer open/close behavior is tested; the reference mobile menu was inspected.
- [x] Hero, artist introduction, featured release access, and contact/footer equivalents are present.
- [x] Catalogue is newest-first, collaborations remain distinct, and the featured IEMBER (JOY) release has a working detail route.
- [x] Press and EPK pages preserve their existing source and verification safeguards.
- [x] Media includes a validated video source and a clearance-aware artist portrait; no missing image references remain.
- [x] Display fonts are locally available and licensed; the production build has no missing-font references.
- [x] Reduced-motion behavior and responsive layouts are checked at mobile, tablet, laptop, and desktop widths.
- [x] The global listening dock performs real playback from the one confirmed source and persists across internal navigation.
- [x] The single-track limit, absent official covers, absent article photography, and portrait-clearance dependency are documented rather than concealed.
- [x] Reference Work-index hover changes were observed. No unsupported claim is made that every reference motion pattern was replicated.

## Verification and remaining gaps

`npm run check` passed all 18 content-integrity tests and completed a production build. `npm run check:responsive` tested six routes (`/`, `/catalog`, `/catalog/iember-joy`, `/press`, `/media`, `/artist`) at five viewport sizes from 360 to 1600 pixels, plus reduced motion. It reported **0 errors and 0 warnings**. Checks included horizontal overflow, one page heading, meaningful content, local request/console failures, mobile target size, reveal settling, and reduced-motion visibility.

A separate browser interaction pass confirmed mobile menu open/close and route navigation, a working IEMBER detail link, click-to-load of the official YouTube iframe, persistence across internal route changes, and no application runtime errors. The local responsive screenshot set and machine-readable result are in `docs/responsive/`.

At matching desktop dimensions, the reference home is [1280 × 800](/home/ubuntu/visual-evidence/reference-home-1280.png) and the implementation is [1280 × 800](/home/ubuntu/Teeroytyobee/docs/responsive/home-laptop-1280.png). At matching mobile dimensions, compare the reference [390 × 844](/home/ubuntu/visual-evidence/reference-mobile-390.png) with the implementation [390 × 844](/home/ubuntu/Teeroytyobee/docs/responsive/home-mobile-390.png). Additional observed reference states: [mobile navigation open](/home/ubuntu/visual-evidence/reference-mobile-menu-after-click.png), [Work index initial](/home/ubuntu/visual-evidence/reference-work-1280.png), and [Work index after hovering another project](/home/ubuntu/visual-evidence/reference-work-hover-1280.png).

The most material remaining differences are deliberate or source-limited. The reference is a photographer's editorial portfolio and uses project photography on hover; the Teeroy catalogue uses releases and collaboration data and has no approved cover art to show. The Teeroy menu remains in the established dark visual identity rather than copying the reference's pale menu panel. The requested full-discography audio radio is not achievable until verified audio streams are supplied; the present persistent player truthfully exposes only one official video. No production deployment, merge, DNS change, or Framer template duplication was performed.

## References

[1]: https://gojett.framer.website/ "Cole Navarro reference homepage"
[2]: https://gojett.framer.website/work "Cole Navarro Work index"
[3]: https://gojett.framer.website/about "Cole Navarro About route"
[4]: https://gojett.framer.website/journal "Cole Navarro Journal route"
[5]: https://gojett.framer.website/contact "Cole Navarro Contact route"
[6]: https://fonts.google.com/specimen/Sofia+Sans+Extra+Condensed "Sofia Sans Extra Condensed at Google Fonts"
[7]: https://github.com/lettersoup/Sofia-Sans "Sofia Sans upstream project and license"
