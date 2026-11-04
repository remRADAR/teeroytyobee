import { videos, channels, photography, mediaDisclosure } from '../content/media.js';
import { useRevealOnMount } from '../components/Img.jsx';
import { ExternalIcon, PlayIcon } from '../components/Icons.jsx';
import { useRadio } from '../components/RadioPlayer.jsx';

/** Click-to-load the shared player; the iframe stays mounted across route changes. */
function VideoPlayer({ video }) {
  const { play, active } = useRadio();
  const isActive = active?.id === video.id;
  return (
    <div className="player">
      <button
        type="button"
        className="player__poster"
        onClick={() => play(video)}
        aria-label={`${isActive ? 'Now playing' : 'Play'} ${video.title} in the persistent official-source player`}
      >
        <span className="media-asset-placeholder" aria-hidden="true">
          <small>Official video artwork pending</small>
        </span>
        <span className="player__play"><PlayIcon /></span>
        <span className="player__label">
          <span>{video.kind} · {video.year}</span>
          <span>{isActive ? 'Now playing below' : 'Press to load'}</span>
        </span>
      </button>
    </div>
  );
}

export default function Media() {
  const ref = useRevealOnMount();
  const [lead] = videos;

  return (
    <main ref={ref} id="main">
      <div className="wrap page-head">
        <p className="eyebrow" data-reveal>Visual world</p>
        <div className="page-head__row">
          <h1 className="page-head__title" data-reveal data-reveal-delay="1">
            Media<span className="serif-italic">.</span>
          </h1>
          <div className="page-head__stats" data-reveal data-reveal-delay="2">
            <div>
              <p className="stat__n">{videos.length}</p>
              <p className="stat__l">Confirmed videos</p>
            </div>
            <div>
              <p className="stat__n">{channels.length}</p>
              <p className="stat__l">Official channels</p>
            </div>
            <div>
              <p className="stat__n">{photography.length}</p>
              <p className="stat__l">Portrait supplied</p>
            </div>
          </div>
        </div>
        <p className="lede" style={{ marginTop: '1.5rem' }} data-reveal>
          Music videos, visuals and photography. Only releases confirmed through the artist’s own channel
          are published, and video loads only when you ask for it.
        </p>
      </div>

      <section className="section section--flush" aria-labelledby="videos-heading">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <div className="section-head__title">
              <p className="eyebrow">Official video</p>
              <h2 className="h2" id="videos-heading">{lead.title}</h2>
            </div>
            <a
              className="link-arrow"
              href={lead.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Watch ${lead.title} on YouTube (opens in a new tab)`}
            >
              Open on YouTube <ExternalIcon />
            </a>
          </div>

          <div className="video-feature" data-reveal data-reveal-delay="1">
            <VideoPlayer video={lead} />
            <div>
              <p className="eyebrow eyebrow--plain">{lead.subtitle}</p>
              <p className="body" style={{ marginTop: '1rem' }}>
                Published on the artist’s official channel. Playback loads only after you press play and
                persists in the site player while you move between portfolio pages.
              </p>
              <p className="micro" style={{ marginTop: '1.25rem' }}>
                Verified via {lead.confirmedBy}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="gallery-heading">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <div className="section-head__title">
              <p className="eyebrow">Photography</p>
              <h2 className="h2" id="gallery-heading">Artist portrait</h2>
            </div>
            <span className="badge badge--warn">Clearance pending</span>
          </div>

          <div className="gallery" data-reveal data-reveal-delay="1">
            {photography.map((shot) => (
              <figure
                className="gallery__cell gallery__cell--tall"
                key={shot.id}
                style={{ margin: 0 }}
              >
                <div className="asset-placeholder" role="img" aria-label="Approved artist portrait pending">
                  <span className="asset-placeholder__label">{shot.title}</span>
                  <span className="asset-placeholder__message">Approved artist photography required</span>
                </div>
                <figcaption className="gallery__cap">
                  <b>{shot.title}</b>
                  <span>{shot.caption}</span>
                </figcaption>
              </figure>
            ))}
          </div>

          <p className="disclosure" data-reveal>
            <strong>Asset status</strong>
            {photography[0]?.rightsNote}
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="channels-heading">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <div className="section-head__title">
              <p className="eyebrow">Follow</p>
              <h2 className="h2" id="channels-heading">Official channels</h2>
            </div>
          </div>

          <div className="channel-grid" data-reveal data-reveal-delay="1">
            {channels.map((c) => (
              <a
                key={c.id}
                className="channel"
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>
                  <b>{c.label}</b>
                  <small>{c.handle} · {c.role}</small>
                </span>
                <ExternalIcon />
              </a>
            ))}
          </div>

          <p className="disclosure" data-reveal>
            <strong>Media policy</strong>
            {mediaDisclosure}
          </p>
        </div>
      </section>
    </main>
  );
}
