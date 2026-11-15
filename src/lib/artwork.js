/**
 * Approved/local image inventory. The portrait is carried forward from the
 * supplied portrait and the locally stored release artwork.
 */
const PORTRAIT = '/media/artist-hero.jpeg';
const PROFILE_PORTRAIT = '/media/artist-profile.jpg';
const IEMBER_PORTRAIT = '/media/iember-portrait.jpg';
const SOCIAL_SHARE = '/media/social/teeroy-tyobee-share.jpg';

export const art = {
  artistPortrait: {
    src: PORTRAIT,
    sizes: '100vw',
    alt: 'Portrait of Teeroy Tyobee.',
    width: 1536,
    height: 1920,
  },
  profilePortrait: {
    src: PROFILE_PORTRAIT,
    sizes: '(min-width: 940px) 38vw, 100vw',
    alt: 'Portrait of Teeroy Tyobee in a white outfit and red patterned head covering.',
    width: 1800,
    height: 2250,
  },
  heroWide: {
    src: PORTRAIT,
    sizes: '100vw',
    alt: '',
    width: 1536,
    height: 1920,
  },
  heroPortrait: {
    src: PORTRAIT,
    sizes: '(min-width: 940px) 34vw, 100vw',
    alt: '',
    width: 1536,
    height: 1920,
  },
  iemberPortrait: {
    src: IEMBER_PORTRAIT,
    sizes: '(min-width: 940px) 42vw, 100vw',
    alt: 'Teeroy Tyobee in a white outfit and red patterned head covering, photographed for the IEMBER project.',
    width: 1800,
    height: 2250,
  },
  mic: {
    src: PORTRAIT,
    sizes: '(min-width: 940px) 30vw, 50vw',
    alt: 'Portrait of Teeroy Tyobee.',
    width: 1536,
    height: 1920,
  },
  socialShare: {
    src: SOCIAL_SHARE,
    alt: 'Portrait of Teeroy Tyobee for social sharing.',
    width: 1600,
    height: 1143,
  },
};

export function photography(key) {
  if (key === 'artist-portrait') return { ...art.artistPortrait, cell: 'gallery__cell--tall' };
  return { ...art.artistPortrait, cell: 'gallery__cell--tall' };
}
