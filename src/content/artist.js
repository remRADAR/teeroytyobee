/**
 * Public artist profile. Playback and catalogue links are YouTube-first; the
 * remaining destinations are clearly external social/profile callouts.
 */
export const artist = {
  displayName: 'Teeroy Tyobee',
  legalName: 'Rowland Teeroy Tyobee',
  monogram: 'TT',
  birthDate: '22 May 1991',
  roleLine: 'Singer · Songwriter · Performer',
  originLine: 'Tiv Nation, Benue State, Nigeria',
  baseLine: 'Based in Abuja, Nigeria',
  genreLine: 'Afro-fusion · Afrobeat · Inspirational storytelling',
  label: 'Royz Houz',
  education: 'Sociology · University of Mkar',
  shortBio:
    'Teeroy Tyobee is a Nigerian singer, songwriter and performer from the Tiv Nation of Benue State, based in Abuja and releasing independently through Royz Houz.',
  longBio: [
    'Teeroy Tyobee — Rowland Teeroy Tyobee — is a Nigerian singer, songwriter and performer from the Tiv Nation of Benue State. Born on 22 May 1991, he discovered music in his teens and draws on Afro-fusion, Afrobeat, faith, hope and personal storytelling.',
    'He studied Sociology at the University of Mkar and is based in Abuja. His public interviews describe music as a tool for hope, joy and healing. His catalogue moves from early inspirational work and the international collaboration “Different People” with Allie Gardner to the independent Royz Houz EP IEMBER (JOY), whose title means “joy” in Tiv.',
  ],
  genres: ['Afro-fusion', 'Afrobeat', 'Afropop', 'Inspirational music'],
  themes: ['Hope', 'Joy', 'Identity', 'Love', 'Resilience', 'Tiv heritage'],
  links: {
    youtube: 'https://www.youtube.com/@teeroy_tyobee',
    instagram: 'https://www.instagram.com/teeroy_tyobee',
    threads: 'https://www.threads.com/@teeroy_tyobee',
    facebook: 'https://www.facebook.com/profile.php?id=100037925713239',
    x: 'https://x.com/teeroy_tyobee',
    tiktok: 'https://www.tiktok.com/@teeroy_tyobee',
    linktree: 'https://linktr.ee/teeroy_tyobee',
  },
  profileLinks: [
    { id: 'youtube', label: 'YouTube', handle: '@teeroy_tyobee', role: 'Official music and video' },
    { id: 'instagram', label: 'Instagram', handle: '@teeroy_tyobee', role: 'Visuals and updates' },
    { id: 'threads', label: 'Threads', handle: '@teeroy_tyobee', role: 'Social updates' },
    { id: 'facebook', label: 'Facebook', handle: 'Teeroy Tyobee', role: 'Community and updates' },
    { id: 'x', label: 'X', handle: '@teeroy_tyobee', role: 'Social updates' },
    { id: 'tiktok', label: 'TikTok', handle: '@teeroy_tyobee', role: 'Short-form video' },
    { id: 'linktree', label: 'Linktree', handle: 'teeroy_tyobee', role: 'External profile directory' },
  ],
  contact: {
    booking: null,
    press: null,
    management: null,
    note: 'No booking, press or management address is publicly listed in the sources used for this portfolio.',
  },
};

artist.profileLinks = artist.profileLinks.map((profile) => ({
  ...profile,
  url: artist.links[profile.id],
}));

/** Public chronology assembled from the artist’s interviews and published profiles. */
export const career = [
  {
    id: 'early-writing',
    year: 'Teens–2009',
    label: 'Early work',
    title: 'Music begins with inspirational songwriting',
    body: 'Public profiles place his musical discovery in his teens. An early profile records “Get There” in 2009 and “Valentine Love” in 2010, which received airplay and led to his first radio interview.',
    status: 'confirmed',
    sourceIds: ['lds-profile'],
  },
  {
    id: 'education',
    year: '2013–2015',
    label: 'Education',
    title: 'University of Mkar and Famouz 19 Records',
    body: 'He studied Sociology at the University of Mkar, performed in school programmes and radio, and became a co-owner of Famouz 19 Records in 2013. He completed the degree programme in 2015.',
    status: 'confirmed',
    sourceIds: ['lds-profile', 'nation'],
  },
  {
    id: 'rebrand',
    year: '2016–2017',
    label: 'Rebrand',
    title: 'A return to music built around hope',
    body: 'After the earlier label folded, he returned to Benue, wrote school anthems and promotional songs, and reoriented his work toward inspirational music. The 2020 profile records recognition as an inspirational writer in 2017.',
    status: 'confirmed',
    sourceIds: ['lds-profile'],
  },
  {
    id: 'debut',
    year: '2018–2020',
    label: 'Public debut',
    title: 'Gospel releases and Different People',
    body: 'Public profiles record “The Plan” in 2018, “Are You There” in 2019 and “Different People” featuring Allie Gardner in 2020. The artist has described Different People as his first official international collaboration.',
    status: 'confirmed',
    sourceIds: ['lds-profile', 'voyage', 'youtube'],
  },
  {
    id: 'singles',
    year: '2022–2025',
    label: 'Singles',
    title: 'An independent catalogue takes shape',
    body: 'The catalogue expands through “We Are”, “Heaven”, “Good Old Days”, “One Call”, “Better Man”, “One for the Road” and “Wise Up”. The Nation describes “Wise Up” as a song about mental emancipation and freedom of thought.',
    status: 'confirmed',
    sourceIds: ['nation', 'youtube'],
  },
  {
    id: 'iember',
    year: '2026',
    label: 'Project',
    title: 'IEMBER (JOY) arrives through Royz Houz',
    body: 'The six-track EP IEMBER (JOY) was released through independent label Royz Houz. “Iember” means joy in Tiv; the project places Tiv and Middle Belt culture alongside love, childlike freedom, gratitude and everyday hustle.',
    status: 'confirmed',
    sourceIds: ['guardian', 'youtube'],
  },
];

/** Notes kept for transparency without presenting missing business details as facts. */
export const openQuestions = [
  {
    id: 'contact',
    question: 'Public contact details',
    detail: 'No booking, press or management address is publicly listed in the cited sources.',
  },
  {
    id: 'photography',
    question: 'Portrait permissions',
    detail: 'The portfolio uses the supplied portrait as an artist-file image; separate publicity-rights documentation is not published here.',
  },
];

export default artist;
