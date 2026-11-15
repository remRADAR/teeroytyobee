/**
 * Catalogue — solo releases and collaborations remain separate.
 * Every playback destination in this catalogue is YouTube. A release with an
 * exact videoId can load in the in-site player; the channel link is retained
 * for records whose individual YouTube upload is not identified.
 */
const youtubeChannel = 'https://www.youtube.com/@teeroy_tyobee';
const youtubeLink = (url = youtubeChannel) => ({ platform: 'YouTube', url, verified: true });

export const soloReleases = [
  {
    id: 'iember-joy', title: 'IEMBER (JOY)', kind: 'EP', year: 2026, sortDate: '2026-10-31',
    trackCount: 6, featured: true,
    summary: 'A six-track Afro-fusion project about choosing joy after struggle, with Tiv heritage, love, gratitude and everyday Nigerian life at its centre.',
    tracks: ['JOY (Iember)', 'Mama Africa', 'Wan Tiv', 'Automatic', 'Happy Child', 'Grind'],
    verified: true, artwork: 'iember', videoId: 'ULQeSD2EGj0',
    videoUrl: 'https://www.youtube.com/watch?v=ULQeSD2EGj0',
    links: [youtubeLink('https://www.youtube.com/watch?v=ULQeSD2EGj0')], note: null,
  },
  {
    id: 'mama-africa', title: 'Mama Africa', kind: 'Single', year: 2026, sortDate: '2026-05-22',
    featured: false,
    summary: 'A celebration of African culture, heritage, strength and resilience, released as the lead single ahead of the debut EP.',
    artwork: 'mama-africa', videoId: '7keunkAa5TQ',
    videoUrl: 'https://www.youtube.com/watch?v=7keunkAa5TQ',
    verified: true, links: [youtubeLink('https://www.youtube.com/watch?v=7keunkAa5TQ')], note: null,
  },
  {
    id: 'wise-up', title: 'Wise Up', kind: 'Single', year: 2025, sortDate: '2025-09-23',
    featured: false,
    summary: 'A socially conscious record about mental emancipation, social injustice and challenging limiting narratives.',
    artwork: 'wise-up', videoId: 'MGyqosp3l7A',
    videoUrl: 'https://www.youtube.com/watch?v=MGyqosp3l7A',
    verified: true, links: [youtubeLink('https://www.youtube.com/watch?v=MGyqosp3l7A')], note: null,
  },
  {
    id: 'one-for-the-road', title: 'One for the Road', kind: 'Single', year: 2024, sortDate: '2024-09-26',
    featured: false, summary: 'A catalogue single with an official visualizer on the artist’s YouTube channel.',
    artwork: 'one-for-the-road', videoId: '0y-cRCdlUY8',
    videoUrl: 'https://www.youtube.com/watch?v=0y-cRCdlUY8',
    verified: true, links: [youtubeLink('https://www.youtube.com/watch?v=0y-cRCdlUY8')], note: null,
  },
  {
    id: 'better-man', title: 'Better Man', kind: 'Single', year: 2024, sortDate: '2024-09-24',
    featured: false, summary: 'A reflective song about learning from mistakes and moving forward.',
    artwork: 'better-man', videoId: 'OJbFuD-nlE8',
    videoUrl: 'https://www.youtube.com/watch?v=OJbFuD-nlE8',
    verified: true, links: [youtubeLink('https://www.youtube.com/watch?v=OJbFuD-nlE8')], note: null,
  },
  {
    id: 'one-call', title: 'One Call', kind: 'Single', year: 2024, sortDate: '2024-05-17',
    featured: false, summary: 'An official YouTube release credited to Teeroy Tyobee and released in 2024.',
    artwork: 'one-call', videoId: 'l9BmLwfX-Gk',
    videoUrl: 'https://www.youtube.com/watch?v=l9BmLwfX-Gk',
    verified: true, links: [youtubeLink('https://www.youtube.com/watch?v=l9BmLwfX-Gk')], note: null,
  },
  {
    id: 'good-old-days', title: 'Good Old Days', kind: 'Single', year: 2023, sortDate: '2023-12-01',
    featured: false,
    summary: 'A nostalgic song about childhood, family, friendship and memories that continue to shape the present.',
    artwork: 'good-old-days', verified: true, links: [youtubeLink()], note: null,
  },
  {
    id: 'heaven', title: 'Heaven', kind: 'Single', year: 2023, sortDate: '2023-01-01',
    featured: false, summary: 'An inspirational release with an official lyrics video on YouTube.',
    artwork: 'heaven', videoId: '3mdObwuwk8E',
    videoUrl: 'https://www.youtube.com/watch?v=3mdObwuwk8E',
    verified: true, links: [youtubeLink('https://www.youtube.com/watch?v=3mdObwuwk8E')], note: null,
  },
  {
    id: 'we-are', title: 'We Are', kind: 'Single', year: 2022, sortDate: '2022-01-01',
    featured: false, summary: 'An early independent single in the public catalogue.',
    artwork: 'we-are', verified: true, links: [youtubeLink()], note: null,
  },
];

export const collaborations = [
  {
    id: 'tee-totti', title: 'Tee Totti', kind: 'Collaboration', year: 2026, sortDate: '2026-01-01',
    featured: false, credit: 'with Bono Badja',
    summary: 'A collaboration listed in the public catalogue.',
    verified: true, artwork: 'tee-totti', links: [youtubeLink()], note: null,
  },
  {
    id: 'my-hands', title: 'My Hands', kind: 'Collaboration', year: 2025, sortDate: '2025-12-22',
    featured: false, credit: 'with Atela', summary: 'A collaborative single with Atela.',
    artwork: 'my-hands', videoId: 'jdDKRwGyQnA',
    videoUrl: 'https://www.youtube.com/watch?v=jdDKRwGyQnA',
    verified: true, links: [youtubeLink('https://www.youtube.com/watch?v=jdDKRwGyQnA')], note: null,
  },
  {
    id: 'udoo', title: 'Udoo', kind: 'Featured appearance', year: 2025, sortDate: '2025-01-01',
    featured: false, credit: 'Eddy Montana featuring Teeroy Tyobee',
    summary: 'A featured appearance listed in the public catalogue.',
    artwork: 'udoo', verified: true, links: [youtubeLink()], note: null,
  },
  {
    id: 'three-star-general', title: '3 Star General', kind: 'Featured appearance', year: 2025, sortDate: '2025-01-01',
    featured: false, credit: 'featuring Noobvee & Teeroy Tyobee',
    summary: 'A featured appearance listed in the public catalogue.',
    artwork: 'three-star-general', verified: true, links: [youtubeLink()], note: null,
  },
  {
    id: 'different-people', title: 'Different People', kind: 'Collaboration', year: 2020, sortDate: '2020-01-01',
    featured: false, credit: 'featuring Allie Gardner',
    summary: 'The artist’s international collaboration with Allie Gardner, described in a 2020 public profile and later interview as a key early release.',
    artwork: 'different-people', verified: true, links: [youtubeLink()], note: null,
  },
];

export const catalogDisclosure =
  'Catalogue assembled from the artist’s public YouTube channel, published interviews and press coverage. Every catalogue destination on this site points to YouTube; exact uploads open in the in-site player, while the remaining records open the official channel. Collaborations remain separate from solo releases.';

export default { soloReleases, collaborations, catalogDisclosure };
