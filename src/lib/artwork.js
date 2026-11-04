/**
 * Artwork and photography resolution.
 *
 * Every responsive image is described here in ONE place so `srcset` widths and
 * aspect framing stay consistent, and so placeholder artwork can be swapped for
 * approved files without touching components.
 */

const MEDIA = '/media';

/** Widths generated for each source (see scripts/build-media.mjs). */
const srcset = (name, widths) =>
  widths.map((w) => `${MEDIA}/${name}-${w}.webp ${w}w`).join(', ');

export const art = {
  heroWide: {
    src: `${MEDIA}/hero-wide-1280.webp`,
    srcSet: srcset('hero-wide', [860, 1280, 1920]),
    sizes: '100vw',
    alt: '',
    width: 1920,
    height: 1072,
  },
  heroPortrait: {
    src: `${MEDIA}/hero-portrait-720.webp`,
    srcSet: srcset('hero-portrait', [460, 720, 1100]),
    sizes: '(min-width: 940px) 34vw, 100vw',
    alt: '',
    width: 1100,
    height: 1473,
  },
  stage: {
    src: `${MEDIA}/stage-960.webp`,
    srcSet: srcset('stage', [560, 960, 1600]),
    sizes: '(min-width: 900px) 56vw, 100vw',
    alt: '',
    width: 1600,
    height: 893,
  },
  crowd: {
    src: `${MEDIA}/crowd-960.webp`,
    srcSet: srcset('crowd', [560, 960, 1600]),
    sizes: '(min-width: 760px) 33vw, 50vw',
    alt: '',
    width: 1600,
    height: 1073,
  },
  texture: {
    src: `${MEDIA}/texture-960.webp`,
    srcSet: srcset('texture', [560, 960, 1600]),
    sizes: '(min-width: 760px) 33vw, 50vw',
    alt: '',
    width: 1600,
    height: 1073,
  },
  mic: {
    src: `${MEDIA}/mic-700.webp`,
    srcSet: srcset('mic', [420, 700, 1100]),
    sizes: '(min-width: 940px) 30vw, 50vw',
    alt: '',
    width: 1100,
    height: 1366,
  },
};

/** Release artwork uses the same visual family; each release maps to a study. */
const artworkMap = {
  iember: 'heroPortrait',
  'mama-africa': 'stage',
  'wise-up': 'crowd',
  'one-for-the-road': 'texture',
  'better-man': 'mic',
  'one-call': 'stage',
  'good-old-days': 'crowd',
  heaven: 'texture',
  'we-are': 'mic',
  'tee-totti': 'stage',
  'my-hands': 'mic',
  udoo: 'crowd',
  'three-star-general': 'texture',
  'different-people': 'heroPortrait',
};

export function releaseArtwork(key) {
  return art[artworkMap[key]] ?? art.stage;
}

export const photographyArt = {
  'portrait-study': { ...art.heroPortrait, cell: 'gallery__cell--tall' },
  'stage-study': { ...art.stage, cell: 'gallery__cell--wide' },
  'crowd-study': { ...art.crowd, cell: 'gallery__cell--half' },
  'texture-study': { ...art.texture, cell: 'gallery__cell--half' },
  'mic-study': { ...art.mic, cell: 'gallery__cell--tall' },
};

export function photography(key) {
  return photographyArt[key] ?? { ...art.stage, cell: 'gallery__cell--wide' };
}
