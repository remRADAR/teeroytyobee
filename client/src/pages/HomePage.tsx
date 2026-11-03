import { ReleaseArtwork } from '../components/ReleaseCard'
import { SourceNote, StatusPill } from '../components/SiteChrome'
import { artist, releases, type Release } from '../data/artist'
import { navigateTo } from '../lib/navigation'

const latest = releases[0]
const wiseUp = releases.find((release) => release.slug === 'wise-up')!
const albums = releases.filter((release) => release.releaseType === 'EP').slice(0, 4)
const singles = releases.filter((release) => release.releaseType !== 'EP').slice(0, 6)
const appearsOn = releases.filter((release) => release.role === 'featured' || release.role === 'collaboration').slice(0, 4)

function RailCard({ slug, title, meta, releaseType, tone }: { slug: string; title: string; meta: string; releaseType: string; tone: Release['artworkTone'] }) {
  const release = releases.find((item) => item.slug === slug) ?? { slug, title, artworkTone: tone, releaseType: 'Release' as const, artistLine: meta, role: 'solo' as const, status: 'unresolved' as const, statusLabel: 'Source review pending', summary: '', credits: [], listeningLinks: [] }
  return <article className="apple-rail-card"><button className="apple-art-button" onClick={() => navigateTo(`/catalog/${slug}`)} aria-label={`Open ${title}`}><ReleaseArtwork release={release} compact /></button><h3><button className="text-button" onClick={() => navigateTo(`/catalog/${slug}`)}>{title}</button></h3><p>{meta}</p><span>{releaseType}</span></article>
}

export function HomePage() {
  return (
    <>
      <section className="profile-masthead">
        <div className="profile-masthead-art" aria-label="Abstract artist profile artwork with a rights-safe portrait placeholder">
          <div className="profile-light" aria-hidden="true" />
          <div className="profile-portrait-placeholder"><span>TT</span><small>Approved artist image<br />slot</small></div>
          <div className="profile-masthead-code">TT / 001<br />NIGERIA / 2026</div>
        </div>
        <div className="profile-masthead-content wrap">
          <div className="profile-identity">
            <div className="profile-avatar" aria-hidden="true">TT</div>
            <div><p className="eyebrow">Artist profile / {artist.base}</p><h1>{artist.name}</h1><p className="profile-descriptor">{artist.descriptor}</p></div>
          </div>
          <div className="profile-actions"><a className="button button-primary" href={artist.officialDestinations[0].url} target="_blank" rel="noreferrer">Listen on Apple Music <span aria-hidden="true">↗</span></a><button className="button button-quiet" onClick={() => navigateTo('/epk')}>Open EPK</button></div>
          <div className="profile-facts"><span>{artist.genre}</span><span>{artist.origin}</span><span>{artist.heritage}</span></div>
        </div>
      </section>

      <nav className="profile-tabs" aria-label="Artist profile sections"><div className="wrap"><a href="#music">Music</a><a href="#spotlight">Spotlight</a><a href="#about">About</a><a href="#connect">Connect</a></div></nav>

      <main className="apple-profile-main wrap">
        <section className="profile-spotlight-grid" id="spotlight">
          <article className="spotlight-release"><div className="spotlight-art"><ReleaseArtwork release={latest} /></div><div className="spotlight-copy"><p className="eyebrow">Spotlight</p><StatusPill status={latest.status}>{latest.statusLabel}</StatusPill><h2>{latest.title}</h2><p>{latest.summary}</p><div className="spotlight-meta"><span>{latest.releaseType}</span><span>{latest.date}</span><span>{latest.credits[0]?.value ?? 'RoyzHouz'}</span></div><button className="arrow-link" onClick={() => navigateTo(`/catalog/${latest.slug}`)}>View release <span aria-hidden="true">↗</span></button></div></article>
          <aside className="profile-signal-card"><p className="eyebrow">Artist signal</p><strong>Joy after<br /><em>the struggle.</em></strong><p>{artist.shortBio}</p><div className="signal-card-footer"><span>Afro-fusion</span><span>Abuja / Nigeria</span></div></aside>
        </section>

        <section className="apple-section" id="music"><div className="apple-section-heading"><div><p className="eyebrow">Music</p><h2>Latest releases</h2></div><button className="arrow-link" onClick={() => navigateTo('/catalog')}>See all <span aria-hidden="true">↗</span></button></div><div className="apple-rail">{singles.map((release) => <RailCard key={release.slug} slug={release.slug} title={release.title} meta={release.artistLine} releaseType={release.date ?? release.releaseType} tone={release.artworkTone} />)}</div></section>

        <section className="apple-section"><div className="apple-section-heading"><div><p className="eyebrow">Projects</p><h2>Albums & EPs</h2></div><span className="section-count">{albums.length || 1} project{albums.length === 1 ? '' : 's'}</span></div><div className="apple-rail apple-rail-wide">{albums.length > 0 ? albums.map((release) => <RailCard key={release.slug} slug={release.slug} title={release.title} meta={release.artistLine} releaseType={release.date ?? release.releaseType} tone={release.artworkTone} />) : <RailCard slug={latest.slug} title={latest.title} meta={latest.artistLine} releaseType={latest.releaseType} tone={latest.artworkTone} />}</div>{latest.tracklist && <SourceNote>JOY (IEMBER) tracklist baseline: {latest.tracklist.join(' · ')}. Verify individual track metadata before publication.</SourceNote>}</section>

        <section className="apple-video-section"><div className="video-profile-art"><div className="video-play" aria-hidden="true">▶</div><span>WISE UP<br />OFFICIAL VIDEO</span></div><div className="video-profile-copy"><p className="eyebrow">Top video</p><h2>{wiseUp.title}</h2><p>{wiseUp.dateNote}</p><div className="video-credits">{wiseUp.credits.map((credit) => <div key={credit.label}><span>{credit.label}</span><strong>{credit.value}</strong></div>)}</div><a className="arrow-link" href="https://www.youtube.com/watch?v=MGyqosp3l7A" target="_blank" rel="noreferrer">Watch on YouTube <span aria-hidden="true">↗</span></a></div></section>

        <section className="apple-section"><div className="apple-section-heading"><div><p className="eyebrow">Collaborations</p><h2>Appears on</h2></div><span className="section-count">Features & collaborations</span></div><div className="apple-rail">{appearsOn.map((release) => <RailCard key={release.slug} slug={release.slug} title={release.title} meta={release.artistLine} releaseType={release.releaseType} tone={release.artworkTone} />)}</div></section>

        <section className="artist-about" id="about"><div><p className="eyebrow">About the artist</p><h2>Identity is part of the sound.</h2></div><div><p>{artist.longBio}</p><div className="about-facts"><div><span>From</span><strong>{artist.origin}</strong></div><div><span>Based in</span><strong>{artist.base}</strong></div><div><span>Sound</span><strong>{artist.genre}</strong></div></div><SourceNote>Portrait rights are not confirmed. This profile uses a rights-safe art direction until management supplies an approved image.</SourceNote></div></section>

        <section className="connect-strip" id="connect"><div><p className="eyebrow">Keep listening</p><h2>Find Teeroy Tyobee<br /><em>wherever you listen.</em></h2></div><div className="connect-links">{artist.officialDestinations.map((destination) => <a href={destination.url} target="_blank" rel="noreferrer" key={destination.label}>{destination.label}<span aria-hidden="true">↗</span></a>)}</div></section>
      </main>
    </>
  )
}
