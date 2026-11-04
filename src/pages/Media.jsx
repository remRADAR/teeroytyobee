import { useState } from 'react';
import { videos, channels, photography, mediaDisclosure } from '../content/media.js';
import { photography as photoArt } from '../lib/artwork.js';
import { artist } from '../content/artist.js';
import { Img, useRevealOnMount } from '../components/Img.jsx';
import { ExternalIcon, PlayIcon } from '../components/Icons.jsx';

/** Click-to-load YouTube embed. Consumes no network beyond the poster until pressed. */
function VideoPlayer({ video }) {
  const [playing, setPlaying] = useState(false);
  const poster = `/media/crowd-960.webp`;

  if (playing) {
    return (
      <div className="player">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${video.videoId}?autoplay=1&rel=0&modestbranding=1`}
          title={`${artist.displayName} — ${video.title} (official video)`}
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className="player">
      <button
        type="button"
        className="player__poster"
        onClick={() => setPlaying(true)}
        aria-label={`Play ${artist.displayName} — ${video.title}`}
      >
        <img src={poster} alt="" width="960" height="644" loading="lazy" decoding="async" />
        <span className="player__play"><PlayIcon /></span>
        <span className="player__label">
          <span>{video.kind} · {video.year}</span>
          <span>Press to load</span>
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
              <p className="stat__l">Visual studies</p>
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
                Published on the artist’s official channel. Playback happens on YouTube; this site never
                autoplays or counts a visit as a stream.
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
              <h2 className="h2" id="gallery-heading">Visual studies</h2>
            </div>
            <span className="badge badge--warn">Placeholder art direction</span>
          </div>

          <div className="gallery" data-reveal data-reveal-delay="1">
            {photography.map((shot) => (
              <figure
                className={`gallery__cell ${photoArt(shot.id).cell}`}
                key={shot.id}
                style={{ margin: 0 }}
              >
                <Img {...photoArt(shot.id)} alt="" />
                <figcaption className="gallery__cap">
                  <b>{shot.title}</b>
                  <span>{shot.caption}</span>
                </figcaption>
              </figure>
            ))}
          </div>

          <p className="disclosure" data-reveal>
            <strong>Asset status</strong>
            These images are art-direction studies generated for layout — they are not photographs of the
            artist and make no claim to be. Approved portraits, live photography and image credits are
            outstanding.
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
