import { PageIntro } from '../components/PageIntro'
import { SourceNote, StatusPill } from '../components/SiteChrome'
import { press } from '../data/artist'

export function PressPage() {
  return (
    <>
      <PageIntro eyebrow="03 / Press" title="What has been said." aside={<div className="stamp-note">Source-aware<br />by design.</div>}>
        <p>Selected coverage and source notes from the recovery inventory. Citations are separated from claims so the page can be completed without rewriting the visual system.</p>
      </PageIntro>
      <section className="wrap press-list">
        {press.map((item) => <article className="press-card" key={`${item.outlet}-${item.headline}`}><div className="press-card-top"><span className="press-outlet">{item.outlet}</span><StatusPill status={item.status}>{item.status === 'verified' ? 'Source reviewed' : 'Citation incomplete'}</StatusPill></div><h2>{item.headline}</h2><p>{item.excerpt}</p><SourceNote>{item.citation}</SourceNote>{item.url && <a className="arrow-link" href={item.url} target="_blank" rel="noreferrer">Read coverage <span aria-hidden="true">↗</span></a>}</article>)}
      </section>
    </>
  )
}
