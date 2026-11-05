/**
 * Approved/local image inventory. The portrait is carried forward from the
 * other repo branch; release covers are sourced from the artist’s Apple Music
 * catalog and stored under public/media/covers.
 */
const PORTRAIT = '/media/artist-hero.jpeg';

export const art = {
  artistPortrait: {
    src: PORTRAIT,
    sizes: '100vw',
    alt: 'Portrait of Teeroy Tyobee; final publication clearance is pending.',
    width: 1536,
    height: 1920,
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
