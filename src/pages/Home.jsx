import { useState } from 'react';
import { Link } from 'react-router-dom';
import { artist } from '../content/artist.js';
import { homeCopy } from '../content/site.js';
import { featuredRelease, sortedSolo } from '../lib/catalog.js';
import { press } from '../content/press.js';
import { videos } from '../content/media.js';
import { ArrowIcon, ExternalIcon } from '../components/Icons.jsx';
import { Marquee } from '../components/Marquee.jsx';

export default function Home() {
  const featured = featuredRelease();
  const recent = sortedSolo.filter((release) => release.id !== featured.id).slice(0, 4);
  const [selectedWork, setSelectedWork] = useState(featured);
  const [leadPress] = press;
  const [leadVideo] = videos;

  return (
    <main id="main" className="editorial-home">
      <section className="masthead" aria-labelledby="hero-title">
        <p className="masthead__kicker">{homeCopy.eyebrow}</p>
        <h1 className="masthead__title" id="hero-title">
          <span>Teeroy</span>{' '}<span data-text="Tyobee">Tyobee</span>
        </h1>
        <div className="masthead__stage" role="group" aria-label="Latest release information; approved artist photography is required">
          <div className="masthead__stage-noise" aria-hidden="true" />
          <div className="masthead__stage-copy">
            <p className="micro">{homeCopy.catalogLabel} · {featured.year}</p>
            <p className="masthead__release">{featured.title}</p>
            <Link className="masthead__cta" to={`/catalog/${featured.id}`}>
              Explore the release <ArrowIcon />
            </Link>
          </div>
          <span className="masthead__asset-note">Approved artist photography required</span>
        </div>
        <div className="masthead__foot">
          <span>{artist.genreLine}</span>
          <a href="#introduction" aria-label="Scroll to artist introduction">Scroll to explore <span aria-hidden="true">↓</span></a>
        </div>
      </section>

      <section className="editorial-intro" id="introduction" aria-labelledby="intro-heading">
        <p className="micro editorial-intro__label">{homeCopy.artistHeading} / 01</p>
        <div className="editorial-intro__copy">
          <h2 id="intro-heading">{homeCopy.headlineTop} <em>{homeCopy.headlineAccent}</em></h2>
          <p>{homeCopy.lede}</p>
          <p>{artist.shortBio}</p>
          <div className="editorial-intro__actions">
            <Link className="editorial-link" to="/catalog">{homeCopy.primaryCta} <ArrowIcon /></Link>
            <Link className="editorial-link" to="/artist">{homeCopy.secondaryCta} <ArrowIcon /></Link>
          </div>
        </div>
        <div className="editorial-intro__side">
          <span className="micro">{artist.originLine}</span>
          <span className="editorial-intro__mark" aria-hidden="true">TT</span>
        </div>
      </section>

      <Marquee items={homeCopy.marqueeItems} outline />

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
          <div className="editorial-work__preview" role="group" aria-label={`${selectedWork.title} preview; approved release artwork is required`}>
            <span className="micro">{selectedWork.year} <i>·</i> {selectedWork.kind}</span>
            <strong>{selectedWork.title}</strong>
            <span className="editorial-work__asset-note">Approved release artwork required</span>
            <Link to={`/catalog/${selectedWork.id}`} aria-label={`Explore ${selectedWork.title}`}><ArrowIcon /></Link>
          </div>
        </div>
        <p className="editorial-work__note">Solo releases shown newest first. Collaborations remain separately listed in the catalogue.</p>
      </section>

      <section className="editorial-band" aria-label="Artist identity">
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

      <section className="editorial-press" aria-labelledby="journal-heading">
        <div className="editorial-section-head">
          <p className="micro">{homeCopy.pressHeading} / 03</p>
          <div>
            <h2 className="poster poster--section" id="journal-heading">In the press</h2>
            <p className="editorial-press__lede">{homeCopy.pressLede}</p>
          </div>
          <Link className="editorial-link" to="/press">All coverage <ArrowIcon /></Link>
        </div>
        <article className="editorial-press__lead">
          <span className="micro">{leadPress.outlet} <i>·</i> {leadPress.dateLabel}</span>
          <h3>{leadPress.title}</h3>
          <p>{leadPress.summary}</p>
          {leadPress.url && leadPress.verified ? (
            <a className="editorial-link" href={leadPress.url} target="_blank" rel="noopener noreferrer">Read the verified story <ExternalIcon /></a>
          ) : (
            <span className="editorial-press__pending">Link awaiting verification</span>
          )}
        </article>
      </section>

      <section className="editorial-media" aria-labelledby="media-heading">
        <div>
          <p className="micro">[ Media / 04 · {homeCopy.mediaHeading} ]</p>
          <h2 id="media-heading">Sound in <em>motion.</em></h2>
          <p>{homeCopy.mediaLede}</p>
          <p>{leadVideo.title} is available from the artist’s verified YouTube channel. Playback opens only when selected.</p>
          <Link className="editorial-link" to="/media">Explore official media <ArrowIcon /></Link>
        </div>
        <a className="editorial-media__tile" href={leadVideo.url} target="_blank" rel="noopener noreferrer" aria-label={`Open ${leadVideo.title} on YouTube`}>
          <span className="editorial-media__play" aria-hidden="true">↗</span>
          <span className="micro">Verified video · {leadVideo.year}</span>
          <strong>{leadVideo.title}</strong>
        </a>
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
