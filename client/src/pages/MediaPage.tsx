import { PageIntro } from '../components/PageIntro'
import { ReleaseArtwork } from '../components/ReleaseCard'
import { SourceNote, StatusPill } from '../components/SiteChrome'
import { artist, releases } from '../data/artist'

export function MediaPage() {
  return (
    <>
      <PageIntro eyebrow="04 / Media" title="A frame for the sound.">
        <p>Available media is shown with its provenance and clearance status. This recovery build uses typographic artwork placeholders until approved files are restored.</p>
      </PageIntro>
      <section className="wrap media-grid">
        <article className="media-feature"><div className="media-placeholder portrait-placeholder"><span>PORTRAIT<br />PENDING</span></div><div className="media-caption"><div><p className="eyebrow">Artist portrait</p><h2>Use the approved image.</h2></div><StatusPill status="partial">Rights unconfirmed</StatusPill></div><p>{artist.portrait.rightsNote}</p><SourceNote>Previous session referenced a public Spotify artist profile image. It is not republished here.</SourceNote></article>
        <article className="media-feature"><div className="media-placeholder video-placeholder"><span className="play-mark">▶</span><span>WISE UP<br />OFFICIAL VIDEO</span></div><div className="media-caption"><div><p className="eyebrow">Audiovisual</p><h2>Wise Up</h2></div><StatusPill status="verified">Known official video</StatusPill></div><p>Official video premiered 28 May 2025. The exact source URL should be restored from the previous content model before public launch.</p></article>
      </section>
      <section className="wrap media-release-strip"><p className="eyebrow">Release art direction</p><div className="mini-art-grid">{releases.slice(0, 6).map((release) => <div key={release.slug}><ReleaseArtwork release={release} compact /><span>{release.title}</span></div>)}</div></section>
    </>
  )
}
