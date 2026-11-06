# Framer source analysis — public reference and access limits

**Reference:** [Gojett / Cole Navarro](https://gojett.framer.website/)<br>
**Remix:** [Gojett Framer remix](https://framer.link/c5TzcAy?duplicateType=siteTemplate)<br>
**Inspection date:** 4 November 2026<br>
**Scope:** Publicly delivered website. The remix/editor itself was not accessible in the available browser session.

## Access result and evidence

Opening the supplied remix link redirected to Framer login with a redirect to the remix. After the user reported signing in, retrying through the available session still redirected to login. The signed-in user-browser route did not provide an authenticated editor session. No authentication or protection was bypassed. Accordingly, this report does not claim to have inspected the private Framer layer tree, original components/variants, token panel, or native project configuration.

The public routes below were requested directly and returned HTTP 200. The homepage was captured at all five required sizes (1440×900, 1280×800, 768×1024, 390×844, 360×780). The Work, About, Journal and Contact routes, plus one representative project detail and one representative journal article detail, were captured at 1280×800 and 390×844. Visible text, route titles, screenshots, page structure and interaction states were inspected. The public-reference screenshots were kept outside the repository at `/home/ubuntu/visual-evidence/reference-home/` to avoid bundling reference photography in the Teeroy project. Repository-contained `docs/reverse-engineering-report.md` provides earlier observations used as additional corroboration.

## Public page and route inventory

| Public route | Direct observation | Teeroy mapping |
| --- | --- | --- |
| `/` | Compact wordmark/header, latest-work teaser, Work/About/Journal/Contact labels; oversized condensed masthead; large image stage; brief biography; selected projects; journal teaser; contact close and footer. Captured at all five mission viewports. | Home |
| `/work` | Project index with a small index marker, selected project imagery and oversized project titles/meta; project cards stack vertically on mobile. Project selection/background behavior is documented in the checked-in reference study. | Catalog |
| `/work/red-room` | Representative detail route returned 200; full-bleed cinematic image at top, project category/title/year/client credits, short story, and next project. Captured at desktop and mobile. | Release detail route (`/catalog/:id`) |
| `/about` | Full-bleed image/gradient hero with photographer name, date/location/role over or below the image; following biography content is below the first screen. Captured at desktop and mobile. | Artist profile / EPK |
| `/journal` | Journal lead with date/read metadata, large condensed editorial title and short summary; at desktop, text and portrait image form opposing columns, then article links; mobile stacks the image beneath the lead. | Press archive |
| `/journal/one-colour-one-gesture` | Representative detail route returned 200; wide lead photography followed by date/category/read time, oversized article title and story text. Captured at desktop and mobile. | Press archive/detail behavior; no reference article copy is transferred |
| `/contact` | Oversized email-led typographic headline; work introduction, location, social destinations and direct email instruction. No form observed. Captured at desktop and mobile. | Teeroy contact close / verified channels; unknown booking information remains withheld |

The direct browser capture did not expose a conventional `href` route inventory in its static link scan, so this table reports the observed route paths and rendered pages rather than asserting the original interaction wiring or CMS schema.

## Visible component hierarchy

```text
Site shell
├── Compact global header (wordmark, latest-work tile, four destinations)
├── Home
│   ├── Oversized condensed masthead
│   ├── Full-width image stage
│   ├── Artist introduction
│   ├── Selected-work index / active project image
│   ├── Journal lead and archive teaser
│   ├── Contact close
│   └── Footer/social destinations
├── Work index and project detail pages
├── About
├── Journal index and article detail pages
└── Contact
```

This is a hierarchy of visible public content, not the original Framer layer/component hierarchy.

## Typography, colour and spacing

| Property | Publicly observed specification | Confidence / source limitation |
| --- | --- | --- |
| Display type | Heavy, tightly tracked, condensed uppercase face for the masthead, dates and project/article headlines. | High visual confidence; exact family, weight, file, tracking and responsive interpolation cannot be verified in the editor. |
| Supporting type | Small uppercase, monospaced-looking labels for navigation, index, metadata and dates; readable sans-serif editorial paragraphs. | Medium visual confidence; exact families and sizes unknown. |
| Page palettes | The public site varies by route: a restrained header, cinematic red-toned Work/project imagery, blue-toned About image, pale Journal page, and near-black Contact page. Most color is photographic. | Direct screenshot evidence; exact color tokens and route-specific source settings unavailable. |
| Header | Approximately 62 px tall at desktop in the earlier checked-in measurement; mobile header is a compact wordmark with MENU/CLOSE control. | Visual observation plus prior study estimate; exact source height and breakpoint unknown. |
| Desktop gutter | Approximately 24 px at 1280×800 in the earlier checked-in study and consistent with direct captures. | Estimate, not an editor token. |
| Masthead | Very large condensed uppercase wordmark nearly spanning the desktop viewport; mobile version remains a single line at 390 px. | Visible output; source component constraints unknown. |
| Image stage | Wide desktop project/home image; image-led Work details/About; mobile crops and stacks into taller portrait-like stages. | Visible output; original image identity, fill mode, responsive crop and breakpoint settings unverified. |
| Layout | Spacious, editorial composition; Work uses image plus oversized project list; Journal alternates typography and photography; Contact relies on a large typographic headline and quieter supporting columns. | High-level visual description only; exact gaps/max-widths unverified. |

## Responsive behavior

At 1280×800, the header shows the wordmark, latest-work thumbnail/title and four section labels in a single row. At 390×844, the public routes show a compact logo with MENU/CLOSE, tall project imagery and stacked content; Journal becomes a pale single-column article lead with image below; Contact keeps the large email headline with stacked copy/location/social information. The measured breakpoint value, intermediate tablet behavior and exact menu animation settings remain unknown. The homepage itself was also captured at 768 and 360 to compare the changed masthead and image crop.

## Animation and interaction inventory

- The Work index hover/selection changes the active project treatment and accompanying image/metadata; this behavior is described in the checked-in public study. Exact duration and easing remain unmeasured.
- Mobile MENU/CLOSE controls a full-screen navigation layer. The 390 px Work page rendered its project index as stacked image-led cards.
- Navigation reaches Work, About, Journal and Contact; Work and Journal contain detail routes with next/read links.
- The header shows the latest-work thumbnail/title on desktop and becomes compact on mobile.
- No reliable evidence confirms a custom cursor, parallax, autoplay, elaborate loading sequence or page-curtain choreography. Such effects are not claimed as reference parity.

## Asset inventory and reuse boundary

The public website uses Framer-hosted photography, project images and marks. These assets belong to the photographer/reference and are not included in the Teeroy app. No reference image, logo, client mark, copy or proprietary code was copied into the implementation. Reference screenshots remain outside the repository.

The Teeroy repository contains one supplied artist portrait whose own documentation marks publication clearance as pending. It is not rendered in the new home, profile or media experience. No approved release covers or press photography were supplied. The implementation uses visible, text-based placeholders until cleared Teeroy material is available; it does not fabricate official artwork.

## Unverified properties

Authenticated editor access is still required to inspect Framer pages/CMS collections; layer/frame/stack hierarchy; reusable components and variants; exact typography, color and spacing tokens; responsive breakpoints/constraints; image-fill settings; overflow/clipping; page/scroll effects; transforms; event wiring; animation triggers, delays, durations and easing; component dependencies; and original asset filenames/licensing. The current report observes the published website and does not claim source-level or pixel-exact Framer parity.
