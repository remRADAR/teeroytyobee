import { Link } from 'react-router-dom';
import { artist } from '../content/artist.js';
import { homeCopy } from '../content/site.js';
import { featuredRelease, sortedSolo, catalogStats } from '../lib/catalog.js';
import { press } from '../content/press.js';
import { videos } from '../content/media.js';
import { art } from '../lib/artwork.js';
import { Img, useRevealOnMount } from '../components/Img.jsx';
import { ReleaseArtwork } from '../components/ReleaseArtwork.jsx';
import { ReleaseRow } from '../components/ReleaseRow.jsx';
import { ExtLink } from '../components/ReleaseRow.jsx';
import { ArrowIcon, PlayIcon } from '../components/Icons.jsx';
import { Marquee } from '../components/Marquee.jsx';
import { useRadio } from '../components/RadioPlayer.jsx';

export default function Home() {
  const ref = useRevealOnMount();
  const { play } = useRadio();
  const featured = featuredRelease();
  const recent = sortedSolo.filter((r) => r.id !== featured.id).slice(0, 4);
  const [leadPress] = press;
  const [leadVideo] = videos;

  return (
    <div ref={ref}>
      {/* ------------------------------------------------------------ hero */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__media">
          <picture>
            <source media="(max-width: 720px)" srcSet={art.heroPortrait.srcSet} sizes="100vw" />
            <Img {...art.heroWide} priority alt="" />
          </picture>
          <div className="hero__glitch" aria-hidden="true" />
        </div>
        <div className="hero__scrim" aria-hidden="true" />
        <div className="hero__grain" aria-hidden="true" />

        <div className="wrap hero__inner">
          <div>
            <p className="eyebrow">{homeCopy.eyebrow}</p>
            <h1 className="poster poster--hero hero__title" id="hero-title">
              <span className="line">{homeCopy.headlineTop}</span>
              <span className="line">
                <span className="accent glitch" data-text={homeCopy.headlineAccent}>
                  {homeCopy.headlineAccent}
                </span>
              </span>
            </h1>
            <p className="lede" style={{ marginTop: '1.5rem' }}>{homeCopy.lede}</p>

            <div className="hero__actions" style={{ marginTop: '1.9rem' }}>
              <Link className="btn" to="/catalog">
                {homeCopy.primaryCta} <ArrowIcon />
              </Link>
              <Link className="btn btn--ghost" to="/artist">
                {homeCopy.secondaryCta}
              </Link>
              <button className="btn btn--ghost" type="button" onClick={() => play(leadVideo)}>
                Play verified source
              </button>
            </div>
          </div>

          <dl className="hero__meta">
            <div>
              <dt>Artist</dt>
              <dd>{artist.displayName}</dd>
            </div>
            <div>
              <dt>Sound</dt>
              <dd>{artist.genreLine}</dd>
            </div>
            <div>
              <dt>Releases catalogued</dt>
              <dd>
                {catalogStats.total} · {catalogStats.solo} solo / {catalogStats.collaborations} collaborations
              </dd>
            </div>
          </dl>
        </div>

        <span className="hero__scroll" aria-hidden="true">Scroll</span>
      </section>

      {/* --------------------------------------------------------- marquee */}
      <Marquee items={homeCopy.marqueeItems} outline />

      {/* -------------------------------------------------------- featured */}
      <section className="section" aria-labelledby="featured-title">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <div className="section-head__title">
              <p className="eyebrow">{homeCopy.catalogLabel}</p>
              <h2 className="h2" id="featured-title">
                {featured.title} <span className="serif-italic">— out now</span>
              </h2>
            </div>
            <Link className="link-arrow" to="/catalog">
              Full catalogue <ArrowIcon />
            </Link>
          </div>

          <div className="featured" data-reveal data-reveal-delay="1">
            <figure className="artwork">
              <ReleaseArtwork release={featured} />
            </figure>

            <div>
              <p className="eyebrow eyebrow--plain">
                {featured.kind} · {featured.trackCount} tracks · {featured.year}
              </p>
              <h3 className="h2" style={{ marginTop: '0.85rem' }}>{featured.title}</h3>
              <p className="body" style={{ marginTop: '1rem' }}>{featured.summary}</p>

              {featured.tracks?.length > 0 && (
                <ol className="rel__tracks" style={{ marginTop: '1.25rem' }}>
                  {featured.tracks.map((t, i) => (
                    <li key={t} style={{ fontSize: '0.72rem', color: 'var(--bone-faint)' }}>
                      {String(i + 1).padStart(2, '0')} {t}
                    </li>
                  ))}
                </ol>
              )}

              <div className="hero__actions" style={{ marginTop: '1.75rem' }}>
                {featured.links.map((link) => (
                  <ExtLink key={link.platform} href={link.url} className="btn btn--sm" label={`${featured.title} on ${link.platform}`}>
                    {link.platform}
                  </ExtLink>
                ))}
                <Link className="btn btn--quiet btn--sm" to="/catalog#collaborations">
                  Collaborations <ArrowIcon />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ recent list */}
      <section className="section" aria-labelledby="recent-title">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <div className="section-head__title">
              <p className="eyebrow">The catalogue</p>
              <h2 className="h2" id="recent-title">Recent releases</h2>
            </div>
            <p className="micro">Newest first</p>
          </div>

          <ul className="rel-list" data-reveal>
            {recent.map((r) => (
              <ReleaseRow key={r.id} release={r} />
            ))}
          </ul>

          <p className="disclosure">
            <strong>Note</strong>
            Solo releases only. Collaborations and featured appearances are listed separately in the
            catalogue.
          </p>
        </div>
      </section>

      {/* ----------------------------------------------------------- media */}
      <section className="section" aria-labelledby="media-teaser-title">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <div className="section-head__title">
              <p className="eyebrow">{homeCopy.mediaHeading}</p>
              <h2 className="h2" id="media-teaser-title">{homeCopy.mediaLede}</h2>
            </div>
            <Link className="link-arrow" to="/media">
              All media <ArrowIcon />
            </Link>
          </div>

          <div className="video-feature" data-reveal data-reveal-delay="1">
            <Link to="/media" className="player" aria-label={`Watch ${leadVideo.title}`}>
              <div className="player__poster">
                <Img {...art.heroPortrait} alt="" />
                <span className="player__play"><PlayIcon /></span>
                <span className="player__label">
                  <span>{leadVideo.kind} · {leadVideo.year}</span>
                  <span>Plays on click</span>
                </span>
              </div>
            </Link>

            <div>
              <p className="eyebrow eyebrow--plain">Official video</p>
              <h3 className="h2" style={{ marginTop: '0.8rem' }}>{leadVideo.title}</h3>
              <p className="body" style={{ marginTop: '0.9rem' }}>
                {leadVideo.subtitle}. Embedded from the artist’s official channel — nothing loads until you
                press play.
              </p>
              <Link className="link-arrow" to="/media" style={{ marginTop: '1.25rem' }}>
                Watch the visuals <ArrowIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- press */}
      <section className="section" aria-labelledby="press-teaser-title">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <div className="section-head__title">
              <p className="eyebrow">{homeCopy.pressHeading}</p>
              <h2 className="h2" id="press-teaser-title">{press[0].title}</h2>
            </div>
            <Link className="link-arrow" to="/press">
              Press archive <ArrowIcon />
            </Link>
          </div>

          <article className="grid-2" data-reveal data-reveal-delay="1">
            <div>
              <p className="press-item__outlet">
                {leadPress.outlet} · {leadPress.dateLabel}
              </p>
              <p className="body" style={{ marginTop: '1rem' }}>{leadPress.summary}</p>
            </div>
            <div>
              <p className="micro">Also in the archive</p>
              <ul className="rel-list" style={{ marginTop: '0.9rem' }}>
                {press.slice(1, 4).map((p) => (
                  <li key={p.id} className="rel" style={{ gridTemplateColumns: '1fr auto' }}>
                    <span className="rel__title" style={{ fontSize: '0.9rem' }}>
                      {p.title}
                      <span className="micro">{p.outlet}</span>
                    </span>
                    <span className="rel__year">{p.dateLabel}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </div>
      </section>

      {/* ---------------------------------------------------------- artist */}
      <section className="section" aria-labelledby="artist-teaser-title">
        <div className="wrap">
          <div className="epk" data-reveal>
            <div className="epk__portrait">
              <Img {...art.heroPortrait} alt="" />
              <div className="epk__plate">
                <strong>{artist.displayName}</strong>
                <span>Artist file</span>
              </div>
            </div>

            <div>
              <p className="eyebrow">{homeCopy.artistHeading}</p>
              <h2 className="h2" id="artist-teaser-title" style={{ marginTop: '0.9rem' }}>
                <span className="serif-italic">Tiv</span> heritage, contemporary sound.
              </h2>
              <div className="bio" style={{ marginTop: '1.35rem' }}>
                <p>{artist.shortBio}</p>
                <p>{artist.longBio[1]}</p>
              </div>
              <div className="tag-row" style={{ marginTop: '1.5rem' }}>
                {artist.genres.map((g) => (
                  <span className="badge" key={g}>{g}</span>
                ))}
              </div>
              <Link className="link-arrow" to="/artist" style={{ marginTop: '1.75rem' }}>
                Read the artist file &amp; press kit <ArrowIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
