import { useState } from 'react';
import { Link } from 'react-router-dom';
import { artist } from '../content/artist.js';
import { homeCopy } from '../content/site.js';
import { featuredRelease, sortedSolo } from '../lib/catalog.js';
import { press } from '../content/press.js';
import { videos } from '../content/media.js';
import { ArrowIcon, ExternalIcon, PlatformIcon, PlayIcon } from '../components/Icons.jsx';
import { Marquee } from '../components/Marquee.jsx';
import { Tilt } from '../components/Tilt.jsx';
import { art } from '../lib/artwork.js';
import { PlayableReleaseArtwork } from '../components/PlayableReleaseArtwork.jsx';

const storeLinks = [
  { key: 'spotify', label: 'Spotify', kind: 'spotify', url: artist.links.spotify },
  { key: 'appleMusic', label: 'Apple Music', kind: 'apple', url: artist.links.appleMusic },
  { key: 'youtube', label: 'YouTube', kind: 'youtube', url: artist.links.youtube },
  { key: 'audiomack', label: 'Audiomack', kind: 'audiomack', url: artist.links.audiomack },
];

export default function Home() {
  const featured = featuredRelease();
  const recent = sortedSolo.filter((release) => release.id !== featured.id).slice(0, 4);
  const [selectedWork, setSelectedWork] = useState(featured);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const currentPress = press.filter((item) => /iember|joy|debut ep/i.test(`${item.title} ${item.summary}`));
  const featuredVideo = videos.find((video) => video.videoId === featured.videoId);
  const leadVideo = videos.find((video) => video.id === 'wan-tiv-visualizer') ?? videos[0];

  return (
    <main id="main" className="editorial-home">
      <section className="masthead" aria-labelledby="hero-title">
        <p className="masthead__kicker">{homeCopy.eyebrow}</p>
        <h1 className="masthead__title" id="hero-title">
          <span>Teeroy</span>{' '}<span data-text="Tyobee">Tyobee</span>
        </h1>
        <div className="masthead__stage" role="group" aria-label={`Latest release: ${featured.title}`}>
          <img className="masthead__stage-image" src={art.heroWide.src} alt="" width={art.heroWide.width} height={art.heroWide.height} />
          <div className="masthead__stage-noise" aria-hidden="true" />
          <div className="masthead__stage-copy">
            <p className="micro">{homeCopy.catalogLabel} · {featured.year}</p>
            <p className="masthead__release">{featured.title}</p>
            <Link className="masthead__cta" to={`/catalog/${featured.id}`}>
              Explore the release <ArrowIcon />
            </Link>
            <div className="masthead__stores" aria-label="Listen to Teeroy Tyobee on official platforms">
              {storeLinks.map((store) => (
                <a className="masthead__store" href={store.url} key={store.key} target="_blank" rel="noopener noreferrer" aria-label={`Open Teeroy Tyobee on ${store.label}`}>
                  <PlatformIcon kind={store.kind} />
                  <span className="masthead__store-label" aria-hidden="true">{store.label}</span>
                </a>
              ))}
            </div>
          </div>
          <Tilt className="masthead__featured-art">
            <PlayableReleaseArtwork release={featured} video={featuredVideo} />
          </Tilt>
          <span className="masthead__asset-note">{artist.displayName} · official artist profile</span>
        </div>
        <div className="masthead__foot">
          <span>{artist.genreLine}</span>
          <a href="#story" aria-label="Scroll to the Story First section">Scroll to explore <span aria-hidden="true">↓</span></a>
        </div>
      </section>

      <section className="editorial-work" aria-labelledby="selected-work-heading">
        <div className="editorial-section-head">
          <p className="micro">{homeCopy.catalogLabel} / 02</p>
          <h2 className="poster poster--section" id="selected-work-heading">Selected work</h2>
          <Link className="editorial-link" to="/catalog">View the catalogue <ArrowIcon /></Link>
        </div>
        <div className="editorial-work__layout">
          <ul className="editorial-work__list">
            {[featured, ...recent].map((release, index) => (
              <li key={release.id}>
                <Link
                  to={`/catalog/${release.id}`}
                  className="editorial-work__item"
                  onMouseEnter={() => setSelectedWork(release)}
                  onFocus={() => setSelectedWork(release)}
                >
                  <span className="editorial-work__index">{String(index + 1).padStart(2, '0')}</span>
                  <span className="editorial-work__name">{release.title}</span>
                  <span className="editorial-work__meta">{release.year} <i>·</i> {release.kind}</span>
                  <span className="editorial-work__arrow" aria-hidden="true"><ArrowIcon /></span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="editorial-work__preview" role="group" aria-label={`${selectedWork.title} preview`}>
            <img
              className="editorial-work__portrait"
              src={art.iemberPortrait.src}
              alt={art.iemberPortrait.alt}
              width={art.iemberPortrait.width}
              height={art.iemberPortrait.height}
              loading="lazy"
            />
            <Tilt className="editorial-work__cover" key={`cover-${selectedWork.id}`}>
              <div className="editorial-work__preview-swap">
                <PlayableReleaseArtwork
                  release={selectedWork}
                  video={videos.find((video) => video.videoId === selectedWork.videoId)}
                />
              </div>
            </Tilt>
            <strong className="editorial-work__preview-swap" key={`title-${selectedWork.id}`}>{selectedWork.title}</strong>
          </div>
        </div>
        <p className="editorial-work__note">Solo releases shown newest first. Collaborations remain separately listed in the catalogue.</p>
      </section>

      <section className="editorial-band" id="story" aria-label="Artist identity">
        <div>
          <p className="micro">{artist.roleLine}</p>
          <h2>Story first.<br /><em>Always.</em></h2>
        </div>
        <div className="editorial-band__copy">
          <p>{artist.longBio[0]}</p>
          <p>{artist.longBio[1]}</p>
        </div>
        <Link className="editorial-link" to="/artist">Read the artist file <ArrowIcon /></Link>
      </section>

      <Marquee items={homeCopy.marqueeItems} outline />

      <section className="editorial-press" aria-labelledby="journal-heading">
        <div className="editorial-section-head">
          <p className="micro">Current project / 03</p>
          <div>
            <h2 className="poster poster--section" id="journal-heading">IEMBER in the press</h2>
            <p className="editorial-press__lede">Current updates and mentions of the highlighted project.</p>
          </div>
          <Link className="editorial-link" to="/press">All coverage <ArrowIcon /></Link>
        </div>
        {currentPress.map((item) => (
          <article className="editorial-press__lead" key={item.id}>
            <span className="micro">{item.outlet} <i>·</i> {item.dateLabel}</span>
            <h3>{item.title}</h3>
            <p>{item.summary}</p>
            {item.url && item.verified ? (
              <a className="editorial-link" href={item.url} target="_blank" rel="noopener noreferrer">Read the verified story <ExternalIcon /></a>
            ) : (
              <span className="editorial-press__pending">Link awaiting verification</span>
            )}
          </article>
        ))}
      </section>

      <section className="editorial-media" aria-labelledby="media-heading">
        <div>
          <p className="micro">[ Media / 04 · {homeCopy.mediaHeading} ]</p>
          <h2 id="media-heading">Sound in <em>motion.</em></h2>
          <p>{homeCopy.mediaLede}</p>
          <p>{leadVideo.title} is embedded from the artist’s verified YouTube channel, so it can be watched without leaving the site.</p>
          <Link className="editorial-link" to="/media">Explore official media <ArrowIcon /></Link>
        </div>
        <div className="editorial-media__tile" aria-label={`${leadVideo.title} embedded YouTube player`}>
          {videoLoaded ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${leadVideo.videoId}?rel=0&modestbranding=1&playsinline=1&autoplay=1`}
              title={`${artist.displayName} — ${leadVideo.title} official video`}
              allow="autoplay; encrypted-media; picture-in-picture; web-share; compute-pressure"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              className="media-facade"
              onClick={() => setVideoLoaded(true)}
              aria-label={`Play ${leadVideo.title} — loads the official YouTube player`}
            >
              <img src={art.heroWide.src} alt="" width={art.heroWide.width} height={art.heroWide.height} loading="lazy" />
              <span className="media-facade__play"><PlayIcon /></span>
              <span className="media-facade__label">Play {leadVideo.title} · official video</span>
            </button>
          )}
        </div>
      </section>

      <section className="editorial-contact" aria-labelledby="contact-heading">
        <p className="micro">[ Connect / 05 ]</p>
        <h2 id="contact-heading">Keep the<br /><em>conversation</em><br />moving.</h2>
        <p>Official artist channels and profile information are listed in the artist file.</p>
        <Link className="editorial-contact__button" to="/artist">Open artist profile <ArrowIcon /></Link>
        <span className="editorial-contact__location">{artist.originLine}</span>
      </section>
    </main>
  );
}
