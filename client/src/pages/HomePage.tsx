import { ReleaseArtwork } from '../components/ReleaseCard'
import { SourceNote, StatusPill } from '../components/SiteChrome'
import { artist, releases } from '../data/artist'
import { navigateTo } from '../lib/navigation'

export function HomePage() {
  const featured = releases.slice(0, 3)
  return (
    <>
      <section className="hero wrap">
        <div className="hero-copy">
          <p className="eyebrow">Artist portfolio / {artist.location}</p>
          <h1>Make room<br /><em>for the feeling.</em></h1>
          <p className="hero-lede">{artist.shortBio}</p>
          <div className="hero-actions">
            <button className="button button-primary" onClick={() => navigateTo('/catalog')}>Enter the catalog <span aria-hidden="true">↗</span></button>
            <button className="button button-quiet" onClick={() => navigateTo('/epk')}>Open the EPK</button>
          </div>
        </div>
        <div className="hero-art" aria-label="Abstract gold and black artwork representing the artist portfolio">
          <div className="hero-art-ring" aria-hidden="true" />
          <div className="hero-art-copy"><span>TT</span><strong>Sound<br />in motion</strong></div>
          <div className="hero-art-footer"><span>001 / Portfolio</span><span>2026</span></div>
        </div>
      </section>

      <section className="signal-strip" aria-label="Portfolio status">
        <div className="wrap signal-grid">
          <span><strong>01</strong> Home</span><span><strong>02</strong> Catalog</span><span><strong>03</strong> Press</span><span><strong>04</strong> EPK</span>
        </div>
      </section>

      <section className="section-block wrap">
        <div className="section-heading"><div><p className="eyebrow">Selected work</p><h2>A catalogue in motion.</h2></div><button className="arrow-link" onClick={() => navigateTo('/catalog')}>View all releases <span aria-hidden="true">↗</span></button></div>
        <div className="featured-grid">
          {featured.map((release) => (
            <article className="featured-release" key={release.slug}>
              <button className="featured-art-button" onClick={() => navigateTo(`/catalog/${release.slug}`)} aria-label={`Open ${release.title}`}><ReleaseArtwork release={release} compact /></button>
              <div className="featured-meta"><StatusPill status={release.status}>{release.statusLabel}</StatusPill><span>{release.date ?? 'Date under review'}</span></div>
              <h3><button className="text-button" onClick={() => navigateTo(`/catalog/${release.slug}`)}>{release.title}</button></h3>
              <p className="muted">{release.artistLine}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="manifesto-block">
        <div className="wrap manifesto-grid">
          <p className="eyebrow">The point of view</p>
          <blockquote>“The archive stays honest when the unknowns stay visible.”</blockquote>
          <div><p>{artist.longBio}</p><SourceNote>Editorial status is part of the interface in this recovery build. Verified, platform-specific, partial, and unresolved records are intentionally distinct.</SourceNote></div>
        </div>
      </section>
    </>
  )
}
