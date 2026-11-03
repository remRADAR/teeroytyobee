import { PageIntro } from '../components/PageIntro'
import { SourceNote, StatusPill } from '../components/SiteChrome'
import { artist, releases } from '../data/artist'
import { downloadEpk } from '../lib/exportEpk'

export function EpkPage() {
  return (
    <>
      <PageIntro eyebrow="05 / Artist profile" title="The EPK, kept current." aside={<button className="button button-primary" onClick={() => downloadEpk()}>Download PDF <span aria-hidden="true">↓</span></button>}>
        <p>A compact profile for programming, press, and collaboration. This document deliberately includes the current verification boundary.</p>
      </PageIntro>
      <section className="wrap epk-layout">
        <article className="epk-main"><div className="epk-kicker"><span>TEEROY TYOBEE</span><span>EPK / 2026</span></div><h2>{artist.descriptor}</h2><p className="epk-lead">{artist.longBio}</p><div className="epk-rule" /><div className="epk-columns"><div><p className="eyebrow">Profile</p><p>{artist.shortBio}</p></div><div><p className="eyebrow">Based in</p><p>{artist.location}</p></div></div><div className="epk-rule" /><div><p className="eyebrow">Selected catalogue</p><div className="epk-release-list">{releases.slice(0, 6).map((release) => <div key={release.slug}><span>{release.title}</span><StatusPill status={release.status}>{release.statusLabel}</StatusPill></div>)}</div></div></article>
        <aside className="epk-aside"><div className="aside-card"><p className="eyebrow">Press contact</p><p className="muted">Contact details are not present in the recovered inventory.</p><span className="status status-unresolved">To be supplied</span></div><div className="aside-card"><p className="eyebrow">Content integrity</p><p className="muted">The PDF export is generated from the same data model as this page, so status labels and source notes remain visible.</p></div><SourceNote>Download is a current-content export, not a final press-cleared dossier.</SourceNote></aside>
      </section>
    </>
  )
}
