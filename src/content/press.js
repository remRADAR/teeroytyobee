/**
 * Press coverage. `verified` marks whether the destination was confirmed reachable
 * AND the article matches the artist. Unverified items render without a link so the
 * site never sends a visitor to a dead or unrelated page.
 */
export const press = [
  {
    id: 'radarcharts-iember',
    outlet: 'RADARCharts · On the Radar',
    published: '2026-10-10',
    dateLabel: '10 Oct 2026',
    title: 'Teeroy Tyobee explores joy on IEMBER (JOY)',
    kind: 'Feature',
    summary:
      'A project feature on IEMBER (JOY), its Tiv heritage, and the record’s movement through happiness, love, resilience and identity.',
    url: 'https://radarcharts.net/ontheradar/articles/teeroy-tyobee-channels-tiv-heritage-and-resilience-on-iember-joy',
    image: '/media/covers/iember.jpg',
    verified: true,
    verificationNote: null,
  },
  {
    id: 'guardian-iember',
    outlet: 'The Guardian Nigeria',
    published: '2026-10-07',
    dateLabel: '07 Oct 2026',
    title: 'Teeroy Tyobee steps out with IEMBER',
    kind: 'Feature',
    summary:
      'Coverage of the six-track IEMBER (JOY) EP — its Tiv cultural grounding, the themes behind the record and the production credits.',
    url: 'https://guardian.ng/art/teeroy-tyobee-steps-out-with-iember/',
    image: '/media/covers/iember.jpg',
    verified: true,
    verificationNote: null,
  },
  {
    id: 'voyage-interview',
    outlet: 'VoyageDenver',
    published: '2026-07-08',
    dateLabel: '08 Jul 2026',
    title: 'Rising Stars: Meet Teeroy Tyobee',
    kind: 'Interview',
    summary:
      'An interview on the independent journey, creative purpose, "Different People" and the forthcoming JOY project.',
    url: 'https://voyagedenver.com/interview/rising-stars-meet-teeroy-tyobee-of-national/',
    image: '/media/artist-hero.jpeg',
    verified: true,
    verificationNote: null,
  },
  {
    id: 'nta-mama-africa',
    outlet: 'NTA',
    published: '2026-05-12',
    dateLabel: '12 May 2026',
    title: 'Teeroy Tyobee unveils "Mama Africa" ahead of debut EP',
    kind: 'News',
    summary:
      'Announcement of "Mama Africa" as the lead single from the forthcoming debut EP, framed around African heritage and resilience.',
    url: 'https://www.nta.ng/news/entertainment/teeroy-tyobee-unveils-powerful-new-anthem-mama-africa-ahead-of-debut-ep',
    image: '/media/covers/mama-africa.jpg',
    verified: true,
    verificationNote: null,
  },
  {
    id: 'nation-wise-up',
    outlet: 'The Nation',
    published: '2025-05-26',
    dateLabel: '26 May 2025',
    title: 'Tyobee releases new single "Wise Up"',
    kind: 'News',
    summary:
      'Coverage of "Wise Up", including the artist’s comments on mental emancipation and reported career background.',
    url: 'https://thenationonlineng.net/tyobee-releases-new-single-wise-up/',
    image: '/media/covers/wise-up.jpg',
    verified: true,
    verificationNote: null,
  },
  {
    id: 'tooxclusive-good-old-days',
    outlet: 'TooXclusive',
    published: '2024-07-28',
    dateLabel: '28 Jul 2024',
    title: 'Teeroy Tyobee — "Good Old Days"',
    kind: 'Music feature',
    summary: 'A release feature for "Good Old Days".',
    url: null,
    verified: false,
    verificationNote: 'Recorded for the archive; no stable destination to link yet.'
  },
  {
    id: 'lds-profile',
    outlet: 'Latter-day Saint Musicians',
    published: '2020-02-03',
    dateLabel: '03 Feb 2020',
    title: 'Upcoming artist Teeroy is on a mission to share his music with the world',
    kind: 'Profile',
    summary:
      'An early profile documenting the artist’s international ambitions at the start of his career. Historical context only.',
    url: null,
    verified: false,
    verificationNote: 'Early profile retained for chronology; personal details are not reproduced.'
  },
];

export const pressNote =
  'Coverage is listed newest first. Items without a link are recorded in the archive but were not published with a stable, verifiable destination.';

export default { press, pressNote };
