/**
 * Media — official video, channel destinations and photography.
 *
 * `videos[]` may only contain entries confirmed through the platform itself.
 * YouTube entries carry a `videoId` validated via the oEmbed endpoint
 * (title + channel author confirmed), which is what makes an embed legitimate.
 *
 * `photography[]` currently holds ART-DIRECTION PLACEHOLDERS, not artist photography.
 * Each entry is flagged `isPlaceholder: true` and the media page labels them, so the
 * site never implies a stock/visual study is a real photograph of the artist.
 */
export const videos = [
  {
    id: 'wise-up-video',
    title: 'Wise Up',
    subtitle: 'The Official Music Video · 2025',
    kind: 'Official video',
    year: 2025,
    provider: 'youtube',
    videoId: 'MGyqosp3l7A',
    url: 'https://www.youtube.com/watch?v=MGyqosp3l7A',
    confirmedBy: 'YouTube oEmbed — title and channel author verified',
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

/** Visual direction studies — explicitly NOT official artist photography. */
export const photography = [
  {
    id: 'portrait-study',
    title: 'Portrait study',
    caption: 'Silhouette, single source, haze',
    src: 'hero-portrait',
    ratio: '4 / 5',
    isPlaceholder: true,
  },
  {
    id: 'stage-study',
    title: 'Stage study',
    caption: 'Empty stage, one beam',
    src: 'stage',
    ratio: '16 / 9',
    isPlaceholder: true,
  },
  {
    id: 'crowd-study',
    title: 'Crowd study',
    caption: 'Live room, backlit',
    src: 'crowd',
    ratio: '3 / 2',
    isPlaceholder: true,
  },
  {
    id: 'texture-study',
    title: 'Texture study',
    caption: 'Light through smoke',
    src: 'texture',
    ratio: '3 / 2',
    isPlaceholder: true,
  },
  {
    id: 'mic-study',
    title: 'Object study',
    caption: 'Condenser microphone',
    src: 'mic',
    ratio: '4 / 5',
    isPlaceholder: true,
  },
];

export const mediaDisclosure =
  'Only destinations confirmed through the platform itself are published. Videos are embedded on click — nothing autoplays and no streaming metric is derived from this site. The gallery images are art-direction placeholders, not photographs of the artist; they will be replaced with approved, credited photography.';

export default { videos, channels, photography, mediaDisclosure };
