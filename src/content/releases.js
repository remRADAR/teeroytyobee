/**
 * Catalogue — SOLO releases and COLLABORATIONS are kept in separate arrays so a
 * visitor (and the site build) can never blur the two.
 *
 * Ordering rule: newest first. `sortDate` (YYYY-MM-DD) is the authoritative key;
 * it falls back to the year when only a year is documented. Never reorder by hand —
 * `sortReleases()` in src/lib/catalog.js does the sorting.
 *
 * `verified`:
 *   true  → a working official destination was confirmed
 *   false → destination is a platform artist page, or the record still needs
 *           confirmation (e.g. exact split-artist credit). The UI labels these.
 */
export const soloReleases = [
  {
    id: 'iember-joy',
    title: 'IEMBER (JOY)',
    kind: 'EP',
    year: 2026,
    sortDate: '2026-10-02',
    trackCount: 6,
    featured: true,
    summary:
      'A six-track Afro-fusion project about finding happiness after struggle, with Tiv heritage at its centre. The title comes from the Tiv word for joy.',
    tracks: ['JOY (Iember)', 'Mama Africa', 'Wan Tiv', 'Automatic', 'Happy Child', 'Grind'],
    verified: true,
    artwork: 'iember',
    links: [
      { platform: 'Apple Music', url: 'https://music.apple.com/us/artist/teeroy-tyobee/1532919321', verified: true },
      { platform: 'Amazon Music', url: 'https://music.amazon.com/artists/B08JQQ7N2K/teeroy-tyobee', verified: true },
    ],
    note: null,
  },
  {
    id: 'mama-africa',
    title: 'Mama Africa',
    kind: 'Single',
    year: 2026,
    sortDate: '2026-05-08',
    featured: false,
    summary:
      'Lead single from the EP — a celebration of African culture, heritage, strength and resilience.',
    verified: true,
    artwork: 'mama-africa',
    links: [
      { platform: 'Apple Music', url: 'https://music.apple.com/us/album/mama-africa-single/6768908026', verified: true },
      { platform: 'Audiomack', url: 'https://audiomack.com/teeroytyobee/song/mama-africa', verified: true },
    ],
    note: null,
  },
  {
    id: 'wise-up',
    title: 'Wise Up',
    kind: 'Single',
    year: 2025,
    sortDate: '2025-05-23',
    featured: false,
    summary:
      'A socially conscious record addressing mental emancipation and the need to challenge limiting narratives.',
    verified: true,
    artwork: 'wise-up',
    links: [
      { platform: 'Apple Music', url: 'https://music.apple.com/us/artist/teeroy-tyobee/1532919321', verified: true },
      { platform: 'Amazon Music', url: 'https://music.amazon.com/artists/B08JQQ7N2K/teeroy-tyobee', verified: true },
    ],
    note: null,
  },
  {
    id: 'one-for-the-road',
    title: 'One for the Road',
    kind: 'Single',
    year: 2024,
    sortDate: '2024-01-01',
    featured: false,
    summary: null,
    verified: false,
    artwork: 'one-for-the-road',
    links: [
      { platform: 'Apple Music', url: 'https://music.apple.com/us/artist/teeroy-tyobee/1532919321', verified: true },
    ],
    note: 'Release month not documented — sorted by year only.',
  },
  {
    id: 'better-man',
    title: 'Better Man',
    kind: 'Single',
    year: 2024,
    sortDate: '2024-01-01',
    featured: false,
    summary: null,
    verified: false,
    artwork: 'better-man',
    links: [
      { platform: 'Apple Music', url: 'https://music.apple.com/us/artist/teeroy-tyobee/1532919321', verified: true },
    ],
    note: 'Release month not documented — sorted by year only.',
  },
  {
    id: 'one-call',
    title: 'One Call',
    kind: 'Single',
    year: 2024,
    sortDate: '2024-01-01',
    featured: false,
    summary: null,
    verified: false,
    artwork: 'one-call',
    links: [
      { platform: 'Apple Music', url: 'https://music.apple.com/us/artist/teeroy-tyobee/1532919321', verified: true },
    ],
    note: 'Release month not documented — sorted by year only.',
  },
  {
    id: 'good-old-days',
    title: 'Good Old Days',
    kind: 'Single',
    year: 2023,
    sortDate: '2023-07-28',
    featured: false,
    summary: 'Featured by TooXclusive in July 2024; the original release is catalogued as 2023.',
    verified: false,
    artwork: 'good-old-days',
    links: [
      { platform: 'Apple Music', url: 'https://music.apple.com/us/artist/teeroy-tyobee/1532919321', verified: true },
    ],
    note: 'The TooXclusive article URL is unconfirmed and therefore not linked.',
  },
  {
    id: 'heaven',
    title: 'Heaven',
    kind: 'Single',
    year: 2023,
    sortDate: '2023-01-01',
    featured: false,
    summary: null,
    verified: true,
    artwork: 'heaven',
    links: [
      { platform: 'Apple Music', url: 'https://music.apple.com/us/album/heaven-single/1690552034', verified: true },
    ],
    note: 'Release month not documented — sorted by year only.',
  },
  {
    id: 'we-are',
    title: 'We Are',
    kind: 'Single',
    year: 2022,
    sortDate: '2022-01-01',
    featured: false,
    summary: null,
    verified: true,
    artwork: 'we-are',
    links: [
      { platform: 'Apple Music', url: 'https://music.apple.com/us/album/we-are-single/1647880814', verified: true },
    ],
    note: 'Release month not documented — sorted by year only.',
  },
];

export const collaborations = [
  {
    id: 'tee-totti',
    title: 'Tee Totti',
    kind: 'Collaboration',
    year: 2026,
    sortDate: '2026-01-01',
    featured: false,
    credit: 'with Bono Badja',
    summary:
      'Listed on Apple Music as a collaboration with Bono Badja. The exact split-artist credit and any alternate versions still need distributor confirmation.',
    verified: false,
    artwork: 'tee-totti',
    links: [
      { platform: 'Apple Music', url: 'https://music.apple.com/us/artist/teeroy-tyobee/1532919321', verified: true },
    ],
    note: 'Credit to be confirmed.',
  },
  {
    id: 'my-hands',
    title: 'My Hands',
    kind: 'Collaboration',
    year: 2025,
    sortDate: '2025-01-01',
    featured: false,
    credit: 'with Atela',
    summary: 'A collaborative single listed in the current platform catalogue.',
    verified: false,
    artwork: 'my-hands',
    links: [
      { platform: 'Apple Music', url: 'https://music.apple.com/us/artist/teeroy-tyobee/1532919321', verified: true },
    ],
    note: 'Release month not documented.',
  },
  {
    id: 'udoo',
    title: 'Udoo',
    kind: 'Featured appearance',
    year: 2025,
    sortDate: '2025-01-01',
    featured: false,
    credit: 'Eddy Montana featuring Teeroy Tyobee',
    summary: 'Appears on Eddy Montana’s catalogue as a featured artist.',
    verified: false,
    artwork: 'udoo',
    links: [
      { platform: 'Apple Music', url: 'https://music.apple.com/us/artist/teeroy-tyobee/1532919321', verified: true },
    ],
    note: 'Release month not documented.',
  },
  {
    id: 'three-star-general',
    title: '3 Star General',
    kind: 'Featured appearance',
    year: 2025,
    sortDate: '2025-01-01',
    featured: false,
    credit: 'featuring Noobvee & Teeroy Tyobee',
    summary: 'A featured appearance listed in the artist’s platform catalogue.',
    verified: false,
    artwork: 'three-star-general',
    links: [
      { platform: 'Apple Music', url: 'https://music.apple.com/us/artist/teeroy-tyobee/1532919321', verified: true },
    ],
    note: 'Release month not documented.',
  },
  {
    id: 'different-people',
    title: 'Different People',
    kind: 'Collaboration',
    year: 2020,
    sortDate: '2020-01-01',
    featured: false,
    credit: 'featuring Allie Gardner',
    summary:
      'Described by the artist in a 2026 interview as his first official single and first international collaboration.',
    verified: false,
    artwork: 'different-people',
    links: [
      { platform: 'Apple Music', url: 'https://music.apple.com/us/artist/teeroy-tyobee/1532919321', verified: true },
    ],
    note: 'Debut chronology is disputed — see the Artist page.',
  },
];

/** Catalog-wide disclosure, rendered under every catalogue view. */
export const catalogDisclosure =
  'Catalogue assembled from indexed platform listings and published press coverage. Collaborations are listed separately from solo releases. Release months marked "year only" are undocumented. Final completeness and credits must be reconciled with the distributor account.';

export default { soloReleases, collaborations, catalogDisclosure };
