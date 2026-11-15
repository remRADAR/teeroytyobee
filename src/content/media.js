/**
 * Media — official YouTube uploads and the supplied artist portrait.
 * Every playable entry is validated by its YouTube video id and official channel.
 */
import { artist } from './artist.js';

const youtube = (id, title, subtitle, kind, year, extra = {}) => ({
  id,
  title,
  subtitle,
  kind,
  year,
  provider: 'youtube',
  videoId: extra.videoId ?? id,
  url: `https://www.youtube.com/watch?v=${extra.videoId ?? id}`,
  confirmedBy: 'Teeroy Tyobee official YouTube channel',
  ...extra,
});

export const videos = [
  youtube('automatic-visualizer', 'AUTOMATIC', 'Official audio · JOY (IEMBER) · 2026', 'Official audio', 2026, { videoId: '0IWmlPoe_yw', currentProject: true }),
  youtube('grind-video', 'GRIND', 'Official video · JOY (IEMBER) · 2026', 'Official video', 2026, { videoId: 'F1N-enrTH3U', currentProject: true }),
  youtube('wan-tiv-visualizer', 'WAN TIV', 'Official visualiser · JOY (IEMBER) · 2026', 'Official visualiser', 2026, { videoId: '-IANiFDuIzI', currentProject: true }),
  youtube('day-with-teeroy', 'A Day With Teeroy', 'Official artist film · 2026', 'Artist film', 2026, { videoId: 'Ie9mKNmOApw' }),
  youtube('mama-africa-audio', 'Mama Africa', 'Official audio · 2026', 'Official audio', 2026, { videoId: '7keunkAa5TQ', currentProject: true }),
  youtube('iember-joy-release', 'JOY (Iember)', 'Official release · IEMBER (JOY) · 2026', 'Official release', 2026, { videoId: 'ULQeSD2EGj0', currentProject: true }),
  youtube('my-hands-audio', 'My Hands', 'Official audio · 2025', 'Official audio', 2025, { videoId: 'jdDKRwGyQnA' }),
  youtube('wise-up-video', 'Wise Up', 'The Official Music Video · 2025', 'Official video', 2025, { videoId: 'MGyqosp3l7A' }),
  youtube('one-for-the-road-visualizer', 'One for the Road', 'Official visualizer · 2024', 'Official visualizer', 2024, { videoId: '0y-cRCdlUY8' }),
  youtube('one-call-audio', 'One Call', 'Official audio · 2024', 'Official audio', 2024, { videoId: 'l9BmLwfX-Gk' }),
  youtube('better-man-video', 'Better Man', 'Official music video · 2024', 'Official video', 2024, { videoId: 'OJbFuD-nlE8' }),
  youtube('heaven-video', 'Heaven', 'Official lyrics video · 2023', 'Official video', 2023, { videoId: '3mdObwuwk8E' }),
];

export const channels = artist.profileLinks.filter((profile) => profile.id === 'youtube');

export const photography = [
  {
    id: 'artist-portrait',
    title: 'Artist portrait',
    caption: 'Artist file portrait',
    src: 'artistPortrait',
    ratio: '4 / 5',
    isPlaceholder: false,
    rightsNote: 'Portrait supplied for the artist file; no separate publicity-rights statement is published.',
  },
];

export const mediaDisclosure =
  'All playback and media links on this site use the artist’s official YouTube channel. Exact YouTube uploads can be previewed in the site player; social and profile links remain external callouts and open in a new tab.';

export default { videos, channels, photography, mediaDisclosure };
