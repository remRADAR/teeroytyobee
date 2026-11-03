import { PageIntro } from '../components/PageIntro'
import { ReleaseArtwork } from '../components/ReleaseCard'
import { SourceNote, StatusPill } from '../components/SiteChrome'
import { getRelease } from '../data/artist'
import { navigateTo } from '../lib/navigation'

export function ReleasePage({ slug }: { slug: string }) {
  const release = getRelease(slug)
  if (!release) return <section className="wrap empty-state"><p className="eyebrow">Catalog / Missing record</p><h1>That release is not in the recovery inventory.</h1><button className="button button-primary" onClick={() => navigateTo('/catalog')}>Return to catalog</button></section>
  return (
    <>
      <PageIntro eyebrow="Catalog / Release detail" title={release.title}>
        <p>{release.artistLine}</p>
      </PageIntro>
      <section className="wrap release-detail-grid">
        <div><ReleaseArtwork release={release} /></div>
        <div className="release-detail-copy">
          <div className="detail-topline"><StatusPill status={release.status}>{release.statusLabel}</StatusPill><span>{release.releaseType}</span></div>
          <p className="detail-summary">{release.summary}</p>
          {release.date && <div className="detail-row"><span>Release date</span><strong>{release.date}</strong></div>}
          {release.dateNote && <SourceNote>{release.dateNote}</SourceNote>}
          {release.credits.length > 0 && <div className="credits"><p className="eyebrow">Credits & notes</p>{release.credits.map((credit) => <div className="detail-row" key={credit.label}><span>{credit.label}</span><strong>{credit.value}</strong></div>)}</div>}
          <div className="listening"><p className="eyebrow">Listen / check source</p>{release.listeningLinks.map((link) => <a href={link.url} target="_blank" rel="noreferrer" key={`${link.platform}-${link.url}`}>{link.label} <span aria-hidden="true">↗</span>{link.isSearchFallback && <small>Search fallback</small>}</a>)}</div>
          <button className="back-link" onClick={() => navigateTo('/catalog')}>← Back to catalog</button>
        </div>
      </section>
    </>
  )
}
