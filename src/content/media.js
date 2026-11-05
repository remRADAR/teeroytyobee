/**
 * Media — official video, channel destinations and the supplied portrait.
 *
 * `videos[]` may only contain entries confirmed through the platform itself.
 * YouTube entries carry a `videoId` validated via the oEmbed endpoint
 * (title + channel author confirmed), which is what makes an embed legitimate.
 *
 * The only portrait is documented as user-supplied on another repository branch.
 * Final publication clearance remains outstanding, and release-cover artwork is
 * kept separate until the supplied official files are added.
 */
export const videos = [
  {
    id: 'automatic-visualizer',
    title: 'AUTOMATIC',
    subtitle: 'Official visualizer · JOY (IEMBER) · 2026',
    kind: 'Official visualizer',
    year: 2026,
    currentProject: true,
    provider: 'youtube',
    videoId: '0IWmlPoe_yw',
    url: 'https://www.youtube.com/watch?v=0IWmlPoe_yw',
    confirmedBy: 'Teeroy Tyobee official YouTube channel',
  },
  {
    id: 'grind-video',
    title: 'GRIND',
    subtitle: 'Official video · JOY (IEMBER) · 2026',
    kind: 'Official video',
    year: 2026,
    currentProject: true,
    provider: 'youtube',
    videoId: 'F1N-enrTH3U',
    url: 'https://www.youtube.com/watch?v=F1N-enrTH3U',
    confirmedBy: 'Teeroy Tyobee official YouTube channel',
  },
  {
    id: 'wan-tiv-visualizer',
    title: 'WAN TIV',
    subtitle: 'Official visualiser · JOY (IEMBER) · 2026',
    kind: 'Official visualiser',
    year: 2026,
    currentProject: true,
    provider: 'youtube',
    videoId: '-IANiFDuIzI',
    url: 'https://www.youtube.com/watch?v=-IANiFDuIzI',
    confirmedBy: 'Teeroy Tyobee official YouTube channel',
  },
  {
    id: 'day-with-teeroy',
    title: 'A Day With Teeroy',
    subtitle: 'Official artist film · 2026',
    kind: 'Artist film',
    year: 2026,
    provider: 'youtube',
    videoId: 'Ie9mKNmOApw',
    url: 'https://www.youtube.com/watch?v=Ie9mKNmOApw',
    confirmedBy: 'Teeroy Tyobee official YouTube channel',
  },
  {
    id: 'wise-up-video',
    title: 'Wise Up',
    subtitle: 'The Official Music Video · 2025',
    kind: 'Official video',
    year: 2025,
    provider: 'youtube',
    videoId: 'MGyqosp3l7A',
    url: 'https://www.youtube.com/watch?v=MGyqosp3l7A',
    confirmedBy: 'Teeroy Tyobee official YouTube channel',
  },
  {
    id: 'one-for-the-road-visualizer',
    title: 'One for the Road',
    subtitle: 'Official visualizer · 2024',
    kind: 'Official visualizer',
    year: 2024,
    provider: 'youtube',
    videoId: '0y-cRCdlUY8',
    url: 'https://www.youtube.com/watch?v=0y-cRCdlUY8',
    confirmedBy: 'Teeroy Tyobee official YouTube channel',
  },
];

export const channels = [
  {
    id: 'youtube',
    label: 'YouTube',
    handle: '@teeroy_tyobee',
    url: 'https://www.youtube.com/@teeroy_tyobee',
    role: 'Official videos and visualisers',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    handle: '@teeroy_tyobee',
    url: 'https://www.instagram.com/teeroy_tyobee',
    role: 'Day-to-day visuals',
  },
  {
    id: 'audiomack',
    label: 'Audiomack',
    handle: 'teeroytyobee',
    url: 'https://audiomack.com/teeroytyobee',
    role: 'Streaming',
  },
  {
    id: 'appleMusic',
    label: 'Apple Music',
    handle: 'Teeroy Tyobee',
    url: 'https://music.apple.com/us/artist/teeroy-tyobee/1532919321',
    role: 'Streaming',
  },
];

export const photography = [
  {
    id: 'artist-portrait',
    title: 'Artist portrait',
    caption: 'User-supplied image · final publication clearance pending',
    src: 'artistPortrait',
    ratio: '4 / 5',
    isPlaceholder: false,
    rightsNote: 'The portrait is documented as user-supplied; final management approval and publication clearance remain outstanding.',
  },
];

export const mediaDisclosure =
  'Videos are listed from the artist’s official YouTube channel, with the current JOY (IEMBER) project shown first. Release covers are sourced from the artist’s Apple Music catalog and stored locally; the portrait remains user-supplied and still needs final publication clearance.';

export default { videos, channels, photography, mediaDisclosure };
