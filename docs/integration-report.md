# Teeroy reconstruction — integration and verification report

**Repository:** `remRADAR/Teeroytyobee`
**Working branch:** `feat/teeroy-framer-reconstruction`
**Base:** `origin/feat/gojett-theme`
**Scope:** Local development branch only; no production deployment, merge, DNS change, credential change, or database change was made.

## Existing application preserved

The selected implementation is the repository's React 18 and Vite application with React Router. It already had five artist destinations, shared navigation/footer components, motion and reveal helpers, responsive image handling, a source-aware catalogue, press entries, a media gallery, and an Artist/EPK page. The work continues that application rather than replacing it with a new template.

The two application branches provided different useful context. The newest `feat/gojett-theme` branch supplied the reference-aligned architecture. The `feat/artist-portfolio` branch supplied a Teeroy portrait and provenance/clearance notes. The site continues to keep solo releases separate from collaborations, sorts by source dates, labels uncertain records, withholds unknown contact fields, and links only to approved official destinations.

## Integration map

| Reference element | Existing code kept | Reconstruction or adaptation | Result |
| --- | --- | --- | --- |
| Compact global header and latest-work teaser | `Header` in `src/components/Layout.jsx` | Added a featured-release teaser pointing to the real IEMBER detail page; tuned header height and gutters; kept the five Teeroy routes | Condensed Teeroy wordmark, active route, latest release, desktop navigation and mobile `MENU`/`CLOSE` drawer |
| Full-width masthead and photographic hero | `Home.jsx`, responsive `Img.jsx`, motion/reveal helpers | Restored locally bundled Sofia Sans Extra Condensed display type; used the supplied portrait with a dark gradient and responsive crop; added a restrained intermittent image glitch as an explicitly Teeroy-specific treatment | Cinematic home hero with verified artist content; reduced-motion users do not receive the glitch pulse |
| Work index and project story pages | `Catalog.jsx`, `ReleaseRow.jsx`, catalogue data | Translated projects to source-backed releases; added internal detail route `/catalog/:releaseId`, beginning with `iember-joy`; added clearly labeled typographic preview art rather than implying official cover art | Newest-first release catalogue and detail pages with verification labels, track lists, and official destinations |
| Client/credit strip | Existing artist/career data and collaboration list | Kept only documented associations; left unresolved credits qualified | No photographer-client claims or unsupported Teeroy credits are invented |
| Journal and article archive | `Press.jsx`, `src/content/press.js` | Kept verified article links and dates; retained unconfirmed items with explicit notes instead of guessed URLs or images | Editorial press archive; unavailable article imagery is not fabricated |
| Media gallery | `Media.jsx`, `src/content/media.js` | Replaced missing local thumbnails/placeholders with the one documented portrait and a verified video; made playback click-to-load | Media index with official channels and an explicit source/rights state |
| About/EPK and contact experience | `Artist.jsx`, `artist.js`, shared footer | Preserved verified biography and profile content; kept unavailable booking/contact information withheld | Artist Profile/EPK and working verified links without invented achievements or contact details |
| Motion and transitions | `Motion.jsx`, `lib/motion.js`, existing CSS motion | Preserved reveal, curtain, scroll-rail and reduced-motion systems; added the requested user-established background-image glitch, identified as a Teeroy adaptation rather than reference behavior | Motion remains CSS-based and respects reduced-motion settings |
| Radio/listening | Existing video data; no pre-existing radio/player | Added a global click-to-load dock that embeds only the confirmed official YouTube video, uses the platform's real controls, and remains mounted across internal routes | Real single-source playback, track identity, typographic art-direction preview, and stop/close; no fake multi-track controls |

## Main implementation changes

The global header now mirrors the reference's compact wordmark/navigation rhythm. On wide screens it includes a “Latest release” link to IEMBER (JOY). On mobile the drawer opens from a text-only Menu control and uses touch-sized links. Shared margins and header height were reduced to better match the observed narrow editorial gutters.

The home screen retains the existing Teeroy copy and artist identity. The supplied portrait is used as the responsive hero and social preview image with a dark gradient; the reveal treatment is preserved. A brief, low-opacity image glitch runs intermittently as an explicit project direction and is disabled for reduced-motion preferences.

The catalogue now supports a real detail route, text-based preview art clearly marked as not official cover artwork, and release links. The persistent listening dock loads only after an explicit play action. Its iframe uses YouTube's native controls; the site does not claim to control progress or playback outside those controls. It persists while users move between internal pages.

The missing font references and runtime image references were corrected. Sofia Sans Extra Condensed is restored as local Latin upright/italic WOFF2 variable subsets under the SIL Open Font License, with its full notice in `public/fonts/OFL.txt`. No runtime font CDN request is required. See `docs/asset-licenses.md` for provenance.

## Verification

`npm run check` completed successfully: all 18 content-integrity tests passed and the Vite production build completed. The responsive matrix ran all six routes (`/`, `/catalog`, `/catalog/iember-joy`, `/press`, `/media`, `/artist`) at five viewport sizes from 360 to 1600 pixels, plus a reduced-motion pass. It reported **0 errors and 0 warnings**, including no horizontal overflow, missing local requests, multiple/missing page headings, or undersized mobile targets.

A separate browser interaction pass confirmed that the mobile drawer opens and closes on navigation, the IEMBER catalogue row opens the real detail page, the official video iframe loads only after play is selected, and the iframe remains mounted after moving to another internal route. No application page or console errors were observed during that pass.

Screenshots and the machine-readable QA result are in `docs/responsive/`. Reference-only screenshots are kept outside the application assets so the reference photographer's images are not shipped as Teeroy content. At matching desktop dimensions, the reference home is [1280×800](/home/ubuntu/visual-evidence/reference-home-1280.png) and the Teeroy home is [1280×800](/home/ubuntu/Teeroytyobee/docs/responsive/home-laptop-1280.png). At matching mobile dimensions, the reference is [390×844](/home/ubuntu/visual-evidence/reference-mobile-390.png) and Teeroy is [390×844](/home/ubuntu/Teeroytyobee/docs/responsive/home-mobile-390.png). The observed reference mobile menu is [shown here](/home/ubuntu/visual-evidence/reference-mobile-menu-after-click.png); the reference Work index before and after hover is [initial](/home/ubuntu/visual-evidence/reference-work-1280.png) and [hover state](/home/ubuntu/visual-evidence/reference-work-hover-1280.png).

## Known limitations and continuation

Only one playable media source is confirmed in the repository, and it is an official YouTube video. No verified direct audio stream URLs, downloadable audio, playlist, or second playable track were available. Therefore the original multi-track radio requirements cannot be represented truthfully yet. The dock is a functional one-source listening experience, not a full discography radio. Add tracks only after the distributor or official platform provides stable, embeddable audio sources.

No approved release cover artwork, additional cleared photography, or press article images were present. Release visuals are explicitly marked design previews, and the portrait's publication clearance remains to be confirmed. These are content/rights dependencies, not broken rendering paths.

The Framer template duplication link was not activated because it could create a copy in the user's Framer account. The report is based on observable public-page behavior; no claim is made about private Framer source structure. The development branch has not been pushed, merged, or deployed.

The local preview was used for browser QA at `127.0.0.1:4173`. Its temporary HTTP forwarding endpoint returned 403, so a shareable preview URL is not available from this session.

To continue locally, run `npm install`, then `npm run dev`. Before expanding audio, confirm the official streaming URLs and platform embed rules. Before publication, record final portrait clearance and replace typographic previews with approved artwork if available.
