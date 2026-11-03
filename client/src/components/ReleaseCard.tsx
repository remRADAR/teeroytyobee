import type { Release } from '../data/artist'
import { StatusPill } from './SiteChrome'

export function ReleaseArtwork({ release, compact = false }: { release: Release; compact?: boolean }) {
  return (
    <div className={`release-art art-${release.artworkTone}${compact ? ' is-compact' : ''}`} aria-label={`Abstract artwork placeholder for ${release.title}`}>
      <span className="art-index">{String(release.slug.length).padStart(2, '0')}</span>
      <span className="art-title">{release.title}</span>
      <span className="art-stamp">TT / {release.releaseType}</span>
    </div>
  )
}

export function ReleaseCard({ release, onOpen }: { release: Release; onOpen: (slug: string) => void }) {
  return (
    <article className="release-card">
      <button className="card-image-button" onClick={() => onOpen(release.slug)} aria-label={`Open ${release.title} release detail`}>
        <ReleaseArtwork release={release} />
      </button>
      <div className="release-card-body">
        <div className="release-card-topline"><span>{release.releaseType}</span><StatusPill status={release.status}>{release.statusLabel}</StatusPill></div>
        <h3><button className="text-button" onClick={() => onOpen(release.slug)}>{release.title}</button></h3>
        <p className="muted">{release.artistLine}</p>
        {release.date && <p className="release-date">{release.date}</p>}
        <p className="card-summary">{release.summary}</p>
        <button className="arrow-link" onClick={() => onOpen(release.slug)}>View release <span aria-hidden="true">↗</span></button>
      </div>
    </article>
  )
}
