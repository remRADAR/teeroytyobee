/**
 * Artist identity — the only place the artist's name is written long-form.
 * Every visible reference must render `displayName` so the spelling cannot drift.
 */
export const artist = {
  displayName: 'Teeroy Tyobee',
  // Monogram used by the wordmark and the dossier stamp.
  monogram: 'TT',
  roleLine: 'Singer · Songwriter · Performer',
  originLine: 'Tiv Nation, Benue State, Nigeria',
  genreLine: 'Afro-fusion · Afrobeat · Storytelling',
  label: 'Royz Houz',
  shortBio:
    'A Nigerian singer, songwriter and performer from the Tiv Nation of Benue State, making Afro-fusion shaped by storytelling, upliftment and cultural identity.',
  longBio: [
    'Teeroy Tyobee is a Nigerian singer, songwriter and performer from the Tiv Nation of Benue State. His music brings together Afrobeat rhythms, soulful melodies and storytelling, with themes that move through hope, identity, love, resilience and everyday Nigerian life.',
    'His work places Tiv and Middle Belt heritage inside a contemporary Afro-fusion sound. Releasing independently through Royz Houz, he has built a catalogue that includes the six-track project IEMBER (JOY), whose title draws on the Tiv word for joy.',
  ],
  genres: ['Afro-fusion', 'Afrobeat', 'Soul', 'Storytelling'],
  themes: ['Hope', 'Identity', 'Love', 'Resilience', 'Heritage'],
  /** Verified official destinations only. `null` means "not yet confirmed" — never substitute a guess. */
  links: {
    appleMusic: 'https://music.apple.com/us/artist/teeroy-tyobee/1532919321',
    audiomack: 'https://audiomack.com/teeroytyobee',
    amazonMusic: 'https://music.amazon.com/artists/B08JQQ7N2K/teeroy-tyobee',
    youtube: 'https://www.youtube.com/@teeroy_tyobee',
    instagram: 'https://www.instagram.com/teeroy_tyobee',
    facebook: 'https://www.facebook.com/share/1E5UTQ6Q1k/',
    spotify: null,
  },
  /** Booking / management is deliberately not published until the artist supplies it. */
  contact: {
    booking: null,
    press: null,
    management: null,
    note: 'Booking, press and management contacts are withheld until the artist or management supplies a verified destination. No third-party contact details are republished here.',
  },
};

/**
 * Career record. `status` drives the badge shown in the UI:
 *  - "confirmed"   : corroborated by a primary source (press, platform catalogue)
 *  - "needs-review": sources disagree or the detail is unconfirmed — shown, never asserted
 */
export const career = [
  {
    id: 'origin',
    year: null,
    label: 'Origin',
    title: 'Tiv Nation, Benue State',
    body: 'Public profiles place his upbringing and cultural grounding in Benue State, in Nigeria’s Middle Belt. The Tiv language and its storytelling traditions recur across the catalogue.',
    status: 'confirmed',
    sourceIds: ['musicinafrica', 'voyage'],
  },
  {
    id: 'first-single',
    year: null,
    label: 'Debut chronology',
    title: 'First official single — date disputed',
    body: 'Two records conflict. A 2026 interview describes "Different People" (2020) as his first official single and first international collaboration, while The Nation reported "Are You There? (Dear Heavenly Father)" as the 2019 debut. Both are presented together rather than resolved.',
    status: 'needs-review',
    sourceIds: ['voyage', 'nation'],
  },
  {
    id: 'catalogue',
    year: '2022 — 2024',
    label: 'Catalogue',
    title: 'Singles build an independent catalogue',
    body: 'A run of singles — including "We Are" (2022), "Good Old Days" and "Heaven" (2023), then "One Call", "Better Man" and "One for the Road" (2024) — established the sound released independently through Royz Houz.',
    status: 'confirmed',
    sourceIds: ['apple'],
  },
  {
    id: 'wise-up',
    year: '2025',
    label: 'Single',
    title: '"Wise Up" and the socially conscious turn',
    body: 'The Nation covered "Wise Up" in May 2025, framing it around mental emancipation and the rejection of limiting narratives.',
    status: 'confirmed',
    sourceIds: ['nation'],
  },
  {
    id: 'mama-africa',
    year: '2026',
    label: 'Single',
    title: '"Mama Africa" leads the EP',
    body: 'Released as the lead single ahead of the debut EP, "Mama Africa" centres African heritage, strength and resilience. NTA announced it as the first taste of the project.',
    status: 'confirmed',
    sourceIds: ['nta', 'apple'],
  },
  {
    id: 'iember',
    year: '2026',
    label: 'Project',
    title: 'IEMBER (JOY) — six tracks',
    body: 'The six-track EP, released through Royz Houz, takes its title from the Tiv word for joy and moves from struggle toward finding happiness. The Guardian Nigeria covered its release in October 2026.',
    status: 'confirmed',
    sourceIds: ['guardian', 'apple'],
  },
];

/** Facts that must stay visibly hedged on the site. */
export const openQuestions = [
  {
    id: 'birth-year',
    question: 'Birth year',
    detail: 'Only the day and month (22 May) are supported by public profiles. No birth year is published.',
  },
  {
    id: 'award',
    question: 'Award claim',
    detail: 'An award referenced in an earlier press kit could not be independently verified and is not published.',
  },
  {
    id: 'catalogue-completeness',
    question: 'Catalogue completeness',
    detail: 'The catalogue below is assembled from indexed platform listings and press coverage; it should be reconciled against the distributor account.',
  },
  {
    id: 'credits',
    question: 'Production credits',
    detail: 'Producer, mixing and mastering credits are not confirmed and are omitted rather than guessed.',
  },
  {
    id: 'contact',
    question: 'Booking contact',
    detail: 'No booking or management email is published until a verified destination is supplied.',
  },
];

export default artist;
