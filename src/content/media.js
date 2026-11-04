/**
 * Media — official video, channel destinations and the supplied portrait.
 *
 * `videos[]` may only contain entries confirmed through the platform itself.
 * YouTube entries carry a `videoId` validated via the oEmbed endpoint
 * (title + channel author confirmed), which is what makes an embed legitimate.
 *
 * The only portrait is documented as user-supplied on another repository branch.
 * Final publication clearance remains outstanding, and no release-cover artwork
 * or direct audio streams are present in the selected branch.
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
  'Only one official video has a confirmed playable source in the current repository. The portrait is user-supplied but still needs final publication clearance. Additional release artwork, photography, audio files and verified streaming URLs have not been supplied; no substitute imagery or playback controls are presented as official.';

export default { videos, channels, photography, mediaDisclosure };
