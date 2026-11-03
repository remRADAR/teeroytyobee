export type VerificationStatus = 'verified' | 'platform-specific' | 'partial' | 'unresolved'
export type ReleaseRole = 'solo' | 'collaboration' | 'featured'

export interface ListeningLink {
  label: string
  platform: 'Spotify' | 'Apple Music' | 'Audiomack' | 'YouTube'
  url: string
  isSearchFallback?: boolean
}

export interface ReleaseCredit {
  label: string
  value: string
}

export interface Release {
  slug: string
  title: string
  artistLine: string
  role: ReleaseRole
  releaseType: 'Single' | 'EP' | 'Release'
  date?: string
  dateNote?: string
  status: VerificationStatus
  statusLabel: string
  summary: string
  credits: ReleaseCredit[]
  listeningLinks: ListeningLink[]
  artworkTone: 'gold' | 'rust' | 'blue' | 'violet' | 'green'
}

export interface PressItem {
  outlet: string
  headline: string
  excerpt: string
  citation: string
  url?: string
  status: VerificationStatus
}

export const artist = {
  name: 'Teeroy Tyobee',
  location: 'Nigeria',
  descriptor: 'Artist, songwriter, and creative voice.',
  shortBio:
    'Teeroy Tyobee is a Nigerian artist building a catalogue around lived detail, melodic instinct, and a clear point of view.',
  longBio:
    'This artist profile is intentionally concise while editorial verification continues. The current build foregrounds only the identity, catalogue signals, and source boundaries available in the recovery inventory.',
  bookingEmail: undefined as string | undefined,
  portrait: {
    src: undefined as string | undefined,
    alt: 'Portrait of Teeroy Tyobee',
    rightsNote: 'A public Spotify artist image was referenced in the previous session, but republication rights are not confirmed. Use a management-approved portrait before commercial launch.',
  },
  socialImage: undefined as string | undefined,
}

const searchLink = (platform: ListeningLink['platform'], query: string): ListeningLink => {
  const encoded = encodeURIComponent(query)
  const urls: Record<ListeningLink['platform'], string> = {
    Spotify: `https://open.spotify.com/search/${encoded}`,
    'Apple Music': `https://music.apple.com/us/search?term=${encoded}`,
    Audiomack: `https://audiomack.com/search?q=${encoded}`,
    YouTube: `https://www.youtube.com/results?search_query=${encoded}`,
  }
  return { label: `Search ${platform}`, platform, url: urls[platform], isSearchFallback: true }
}

const defaultLinks = (title: string): ListeningLink[] => [
  searchLink('Spotify', `Teeroy Tyobee ${title}`),
  searchLink('Apple Music', `Teeroy Tyobee ${title}`),
]

export const releases: Release[] = [
  {
    slug: 'iember-joy',
    title: 'JOY (IEMBER)',
    artistLine: 'Teeroy Tyobee / IEMBER',
    role: 'collaboration',
    releaseType: 'EP',
    date: '9 Oct 2026',
    dateNote: 'Apple Music and Audiomack display 9 Oct 2026; the official YouTube Releases listing displays 31 Oct 2026.',
    status: 'platform-specific',
    statusLabel: 'Platform-specific date',
    summary: 'A six-track RoyzHouz EP. Platform metadata is preserved rather than collapsed into one universal date.',
    credits: [
      { label: 'Label', value: 'RoyzHouz' },
      { label: 'Track count', value: '6 tracks' },
      { label: 'Source note', value: 'Guardian feature and platform listings reviewed in the recovery handoff' },
    ],
    listeningLinks: defaultLinks('JOY IEMBER'),
    artworkTone: 'gold',
  },
  {
    slug: 'mama-africa',
    title: 'Mama Africa',
    artistLine: 'Teeroy Tyobee',
    role: 'solo',
    releaseType: 'Single',
    date: '22 May 2026',
    dateNote: 'Apple Music and Spotify show 22 May 2026; Audiomack shows 13 Jun and associates the title with the later JOY (IEMBER) EP.',
    status: 'platform-specific',
    statusLabel: 'Platform-specific metadata',
    summary: 'A solo single whose date and classification vary across platform listings.',
    credits: [],
    listeningLinks: defaultLinks('Mama Africa'),
    artworkTone: 'rust',
  },
  {
    slug: 'tee-totti',
    title: 'Tee Totti',
    artistLine: 'Bono Badja & Teeroy Tyobee',
    role: 'collaboration',
    releaseType: 'Single',
    date: '9 Jan 2026',
    dateNote: 'Apple Music calls it a Single; Spotify labels it an EP.',
    status: 'verified',
    statusLabel: 'Collaboration',
    summary: 'A two-track collaboration jointly billed to Bono Badja and Teeroy Tyobee.',
    credits: [{ label: 'Track count', value: '2 tracks' }],
    listeningLinks: defaultLinks('Tee Totti'),
    artworkTone: 'blue',
  },
  {
    slug: 'wise-up',
    title: 'Wise Up',
    artistLine: 'Teeroy Tyobee',
    role: 'solo',
    releaseType: 'Single',
    date: '15 May 2025',
    dateNote: 'Official video premiered 28 May 2025.',
    status: 'verified',
    statusLabel: 'Verified release',
    summary: 'A verified solo single with an official video and production credits available from the video description.',
    credits: [
      { label: 'Writing', value: 'Teeroy Tyobee' },
      { label: 'Production / mix / master', value: 'Joe Waxy Ejembi' },
      { label: 'Video', value: 'Mauriz' },
    ],
    listeningLinks: [...defaultLinks('Wise Up'), searchLink('YouTube', 'Teeroy Tyobee Wise Up official')],
    artworkTone: 'violet',
  },
  {
    slug: 'my-hands',
    title: 'My Hands (feat. Atela)',
    artistLine: 'Teeroy Tyobee feat. Atela',
    role: 'solo',
    releaseType: 'Single',
    date: '22 Dec 2025',
    status: 'verified',
    statusLabel: 'Verified release',
    summary: 'A Teeroy Tyobee single featuring Atela, released through RoyzHouz.',
    credits: [
      { label: 'Feature', value: 'Atela' },
      { label: '℗', value: '2025 RoyzHouz' },
    ],
    listeningLinks: defaultLinks('My Hands Atela'),
    artworkTone: 'green',
  },
  {
    slug: '3-star-general',
    title: '3 Star General',
    artistLine: 'Malex Betaboi feat. Noobvee & Teeroy Tyobee',
    role: 'featured',
    releaseType: 'Single',
    date: '12 Apr 2025',
    status: 'verified',
    statusLabel: 'Verified feature',
    summary: 'A Malex Betaboi single where Noobvee and Teeroy Tyobee are featured artists; it is not presented as a Teeroy solo release.',
    credits: [{ label: 'Primary artist', value: 'Malex Betaboi' }],
    listeningLinks: defaultLinks('3 Star General Malex Betaboi'),
    artworkTone: 'rust',
  },
  {
    slug: 'udoo',
    title: 'Udoo (feat. Teeroy Tyobee)',
    artistLine: 'Eddy Montana',
    role: 'featured',
    releaseType: 'Single',
    date: '24 Dec 2025',
    dateNote: 'Audiomack shows 25 Dec 2025. Apple displayed artist credits do not list Teeroy as a performing artist.',
    status: 'partial',
    statusLabel: 'Credit requires review',
    summary: 'A partial record retained for research. Teeroy appears in the title, but the performing-artist credit needs confirmation before stronger attribution.',
    credits: [{ label: 'Displayed artist', value: 'Eddy Montana' }],
    listeningLinks: defaultLinks('Udoo Eddy Montana'),
    artworkTone: 'blue',
  },
  ...(['One for the Road', 'Better Man', 'One Call', 'Good Old Days', 'Heaven', 'We Are', 'Different People (feat. Allie Gardner)'] as const).map((title, index): Release => ({
    slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    title,
    artistLine: title.includes('Different People') ? 'Teeroy Tyobee feat. Allie Gardner' : 'Teeroy Tyobee',
    role: title.includes('Different People') ? 'solo' : 'solo',
    releaseType: 'Release',
    status: 'unresolved',
    statusLabel: 'Source review pending',
    summary: 'This candidate appears in the recovery inventory but was not fully verified in the previous session. It remains visible so the catalog does not imply a completed source review.',
    credits: [],
    listeningLinks: defaultLinks(title),
    artworkTone: (['gold', 'rust', 'blue', 'violet', 'green', 'gold', 'blue'] as const)[index],
  })),
]

export const press: PressItem[] = [
  {
    outlet: 'The Guardian',
    headline: 'Feature coverage of JOY (IEMBER)',
    excerpt: 'The recovery notes confirm a six-track EP and collective producer names, but not per-track assignments.',
    citation: 'Source reviewed in the previous session; exact citation URL should be restored before publication.',
    status: 'partial',
  },
  {
    outlet: 'Platform listings',
    headline: 'Release metadata across Apple Music, Spotify, Audiomack, and YouTube',
    excerpt: 'The catalog preserves conflicts between platform dates and classifications instead of creating a false single source of truth.',
    citation: 'See each release record for the current platform-specific note.',
    status: 'verified',
  },
]

export const routeEntries = [
  { path: '/', title: 'Teeroy Tyobee — Artist Portfolio' },
  { path: '/catalog', title: 'Catalog' },
  { path: '/catalog/:slug', title: 'Release detail' },
  { path: '/press', title: 'Press' },
  { path: '/media', title: 'Media' },
  { path: '/epk', title: 'Artist Profile / EPK' },
]

export const getRelease = (slug: string) => releases.find((release) => release.slug === slug)
