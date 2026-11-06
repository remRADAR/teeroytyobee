/**
 * Approved/local image inventory. The portrait is carried forward from the
 * other repo branch; release covers are sourced from the artist’s Apple Music
 * catalog and stored under public/media/covers.
 */
const PORTRAIT = '/media/artist-hero.jpeg';
const PROFILE_PORTRAIT = '/media/artist-profile.jpg';
const IEMBER_PORTRAIT = '/media/iember-portrait.jpg';

export const art = {
  artistPortrait: {
    src: PORTRAIT,
    sizes: '100vw',
    alt: 'Portrait of Teeroy Tyobee; final publication clearance is pending.',
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
};

export function photography(key) {
  if (key === 'artist-portrait') return { ...art.artistPortrait, cell: 'gallery__cell--tall' };
  return { ...art.artistPortrait, cell: 'gallery__cell--tall' };
}
