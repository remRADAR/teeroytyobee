# Component parity matrix

Status key: **Reconstructed** means implemented in the React feature branch. **Partial** means the meaningful interaction/layout is present but photography or source-specific settings are unavailable. **Pending comparison** means source-level parity cannot be confirmed without the authenticated editor. No component is marked source-verified.

| Reference component or behavior | Teeroy equivalent | Status | Notes |
| --- | --- | --- | --- |
| Compact global header | `Header` in `src/components/Layout.jsx` | Reconstructed; pending exact comparison | Teeroy wordmark, latest verified-release teaser, primary navigation. |
| Desktop section navigation | Five Teeroy destinations | Reconstructed | Home, Catalog, Press, Media and Artist remain available. |
| Mobile MENU/CLOSE drawer | Shared navigation drawer | Reconstructed; interaction tested | Opens/closes; Escape closes; route selection closes the drawer. |
| Oversized condensed masthead | Home `masthead` | Reconstructed | Exact artist name, near-edge scale at desktop/mobile, decorative-only glitch. |
| Full-width photographic stage | Home `masthead__stage` | Placeholder / asset pending | Visible clearance note; no uncleared portrait or reference photo used. |
| Artist introduction | Home `editorial-intro` | Reconstructed | Uses the verified artist short biography. |
| Selected-work index and active panel | Home `editorial-work` | Partial | Split release list/panel; hover and keyboard focus change title/year/type. Panel labels missing official art rather than swapping fake or uncleared photos. |
| Work-index background-image transition | React selected-release placeholder | Partial | Title/metadata state responds; image itself cannot change until approved Teeroy covers are supplied. Exact Framer easing unknown. |
| Catalogue and filters | `/catalog` | Reconstructed; browser tested | Keeps solo and collaboration collections separate and newest-first. |
| Project/release detail | `/catalog/:id` | Reconstructed; browser tested | Data integrity and official link protections remain; art stays marked as non-official/awaiting approval. |
| Client/credit marks strip | Artist career/catalog records | Not implemented as logos | Only documented Teeroy credits retained; reference logos are not reused. |
| Journal teaser/archive | Home press lead + `/press` | Reconstructed; pending comparison | Teeroy press entries preserve verification states; missing links are not fabricated. |
| Press article detail | No dedicated local article detail | Not implemented | Links only to verified external destinations; reference copy/photos are not transferred. |
| Media teaser and player | Home link + `/media` | Reconstructed; browser tested | One confirmed YouTube video; user action required; player persists across SPA navigation. |
| Artist profile/About | `/artist` profile and EPK | Reconstructed; pending comparison | Teeroy biography, career facts and EPK; portrait placeholder until cleared. |
| Contact close | Home closing CTA + artist channels | Reconstructed; pending verified details | Uses only official destinations; no invented booking email and no form. |
| Footer/social links | Shared `Footer` and profile destinations | Reconstructed | Verified channels only. |
| Header latest-work teaser | Latest verified catalogue release | Reconstructed | Links to real release detail. |
| Mobile drawer transition | Shared drawer | Reconstructed; exact timing pending | Reduced-motion behavior still browser checked. |
| Page curtain/custom cursor/parallax | None in app shell | Deliberately omitted | No reliable public evidence in reference study. |
| Multi-track listening/radio | Single-source official-video player | Not a full playlist | Repository contains one validated video ID; no verified multi-track/direct-audio source set. |
