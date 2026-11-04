import { Link, useParams } from 'react-router-dom';
import { artist } from '../content/artist.js';
import { allReleases } from '../lib/catalog.js';
import { PlayableReleaseArtwork } from '../components/PlayableReleaseArtwork.jsx';
import { videos } from '../content/media.js';
import { ExtLink, Verified } from '../components/ReleaseRow.jsx';
import { useRevealOnMount } from '../components/Img.jsx';

export default function ReleaseDetail() {
  const { id } = useParams();
  const ref = useRevealOnMount();
  const release = allReleases.find((item) => item.id === id);
  const video = release?.videoId ? videos.find((item) => item.videoId === release.videoId) : null;

  if (!release) {
    return (
      <main id="main" className="wrap page-head release-missing">
        <p className="eyebrow">Catalogue / Not found</p>
        <h1 className="page-head__title">No release here<span className="serif-italic">.</span></h1>
        <p className="lede" style={{ marginTop: '1.5rem' }}>That entry is not in the current artist catalogue.</p>
        <Link className="btn" to="/catalog" style={{ marginTop: '1.5rem' }}>Return to catalogue</Link>
      </main>
    );
  }

  return (
    <main ref={ref} id="main">
      <div className="wrap page-head">
        <p className="eyebrow" data-reveal>Catalogue / Release detail</p>
        <h1 className="page-head__title" data-reveal data-reveal-delay="1">{release.title}<span className="serif-italic">.</span></h1>
        <p className="lede" style={{ marginTop: '1.2rem' }} data-reveal>
          {artist.displayName} · {release.kind} · {release.year}
        </p>
      </div>

      <section className="section section--flush" aria-label={`${release.title} details`}>
        <div className="wrap release-detail">
          <div className="release-detail__art" data-reveal>
            <PlayableReleaseArtwork release={release} video={video} />
          </div>
          <div className="release-detail__copy" data-reveal data-reveal-delay="1">
            <div className="release-detail__status">
              <Verified verified={release.verified}>{release.verified ? 'Confirmed destination' : 'Needs review'}</Verified>
              <span className="micro">{release.kind} · {release.year}</span>
            </div>
            {release.summary && <p className="release-detail__summary">{release.summary}</p>}
            {release.tracks?.length > 0 && (
              <div className="release-detail__tracks">
                <p className="eyebrow eyebrow--plain">Track listing</p>
                <ol>
                  {release.tracks.map((track, index) => (
                    <li key={track}><span>{String(index + 1).padStart(2, '0')}</span>{track}</li>
                  ))}
                </ol>
              </div>
            )}
            {release.credit && <p className="release-detail__credit">{release.credit}</p>}
            {release.note && <p className="disclosure"><strong>Source note</strong>{release.note}</p>}
            <div className="release-detail__links">
              <p className="eyebrow eyebrow--plain">Official destinations</p>
              {release.links?.length ? release.links.map((link) => (
                <ExtLink key={link.platform} href={link.url} label={`${release.title} on ${link.platform}`} className="btn btn--ghost btn--sm">
                  {link.platform}
                </ExtLink>
              )) : <span className="micro">No verified destination is available.</span>}
            </div>
            <Link className="link-arrow" to="/catalog">Back to catalogue</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
