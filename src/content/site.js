/** Site-level copy and navigation. Kept out of components so wording is editable in one place. */
export const site = {
  title: 'Teeroy Tyobee',
  tagline: 'Official artist portfolio',
  description:
    'The official portfolio of Teeroy Tyobee — a Nigerian singer and songwriter from the Tiv Nation of Benue State. Catalogue, press, media and press kit.',
  url: 'https://teeroytyobee.com',
  /** Attributed art direction disclosure shown in the footer. */
  artDirectionNote:
    'The supplied artist portraits are used for this preview; final publication clearance remains outstanding.',
};

export const nav = [
  { to: '/', label: 'Home', index: '01' },
  { to: '/catalog', label: 'Catalog', index: '02' },
  { to: '/press', label: 'Press', index: '03' },
  { to: '/media', label: 'Media', index: '04' },
  { to: '/artist', label: 'Artist', index: '05' },
];

export const homeCopy = {
  eyebrow: 'Independent · Benue State, Nigeria',
  catalogLabel: 'Latest release',
  mediaHeading: 'On screen',
  mediaLede: 'Official visuals, released through the artist’s own channel.',
  pressHeading: 'In print',
  pressLede: 'Selected coverage, newest first.',
  /**
   * Drifting band under the hero. Descriptive only — no claims, no numbers,
   * nothing that would need verifying. Kept here so the wording is editable
   * without touching the component.
   */
  marqueeItems: [
    'Teeroy Tyobee',
    'Afro-fusion',
    'Tiv Nation',
    'Benue State',
    'Independent',
    'Royz Houz',
  ],
};

export default { site, nav, homeCopy };
