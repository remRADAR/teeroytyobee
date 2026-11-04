import { artist, career, openQuestions } from '../content/artist.js';
import { sources } from '../content/sources.js';
import { catalogStats } from '../lib/catalog.js';
import { art } from '../lib/artwork.js';
import { Img, useRevealOnMount } from '../components/Img.jsx';
import { Verified } from '../components/ReleaseRow.jsx';
import { ChevronIcon, DownloadIcon, ExternalIcon } from '../components/Icons.jsx';

const EPK_PATH = '/downloads/teeroy-tyobee-epk.pdf';

export default function Artist() {
  const ref = useRevealOnMount();

  return (
    <main ref={ref} id="main">
      <div className="wrap page-head">
        <p className="eyebrow" data-reveal>Artist profile &amp; press kit</p>
        <div className="page-head__row">
          <h1 className="page-head__title" data-reveal data-reveal-delay="1">
            {artist.displayName}
          </h1>
          <div className="page-head__stats" data-reveal data-reveal-delay="2">
            <div>
              <p className="stat__n">{catalogStats.total}</p>
              <p className="stat__l">Catalogued releases</p>
            </div>
            <div>
              <p className="stat__n">{artist.genres.length}</p>
              <p className="stat__l">Primary genres</p>
            </div>
            <div>
              <p className="stat__n">1</p>
              <p className="stat__l">Project (EP)</p>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------ bio */}
      <section className="section section--flush" aria-labelledby="bio-heading">
        <div className="wrap">
          <div className="epk">
            <div className="epk__portrait" data-reveal>
              <Img {...art.mic} alt="" />
              <div className="epk__plate">
                <strong>{artist.monogram}</strong>
                <span>Artist file · {new Date().getFullYear()}</span>
              </div>
            </div>

            <div data-reveal data-reveal-delay="1">
              <p className="eyebrow" id="bio-heading">Biography</p>
              <div className="bio" style={{ marginTop: '1.1rem' }}>
                {artist.longBio.map((para) => (
                  <p key={para.slice(0, 32)}>{para}</p>
                ))}
              </div>

              <dl className="fact-grid">
                <div>
                  <dt>Name</dt>
                  <dd>{artist.displayName}</dd>
                </div>
                <div>
                  <dt>Based</dt>
                  <dd>Benue State, Nigeria</dd>
                </div>
                <div>
                  <dt>Label</dt>
                  <dd>{artist.label} (independent)</dd>
                </div>
                <div>
                  <dt>Genres</dt>
                  <dd>{artist.genres.join(', ')}</dd>
                </div>
              </dl>

              <div className="tag-row" style={{ marginTop: '1.5rem' }}>
                {artist.themes.map((t) => (
                  <span className="badge" key={t}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- career */}
      <section className="section" aria-labelledby="career-heading">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <div className="section-head__title">
              <p className="eyebrow">Career</p>
              <h2 className="h2" id="career-heading">The record so far</h2>
            </div>
            <p className="micro">Oldest to newest · disputed entries flagged</p>
          </div>

          <div className="timeline" data-reveal data-reveal-delay="1">
            {career.map((item) => (
              <article className="timeline__row" key={item.id}>
                <div className="timeline__when">
                  <span className="timeline__year">{item.year ?? '—'}</span>
                  <span className="timeline__label">{item.label}</span>
                </div>
                <div>
                  <h3 className="timeline__title">
                    {item.title}
                    <Verified verified={item.status === 'confirmed'}>
                      {item.status === 'confirmed' ? 'Confirmed' : 'Needs review'}
                    </Verified>
                  </h3>
                  <p className="timeline__body">{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- EPK ---- */}
      <section className="section" aria-labelledby="epk-heading">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <div className="section-head__title">
              <p className="eyebrow">Press kit</p>
              <h2 className="h2" id="epk-heading">Electronic press kit</h2>
            </div>
          </div>

          <div className="epk-download" data-reveal data-reveal-delay="1">
            <div>
              <h3>{artist.displayName} — Artist Profile &amp; EPK</h3>
              <p>
                Biography, career chronology, catalogue summary, official links and the open items awaiting
                artist confirmation. Generated from the same content files that drive this site, so it can
                never drift from the page.
              </p>
            </div>
            <div className="epk-download__actions">
              <a className="btn" href={EPK_PATH} download>
                Download PDF <DownloadIcon />
              </a>
              <a className="btn btn--ghost" href={EPK_PATH} target="_blank" rel="noopener noreferrer">
                View in browser <ExternalIcon />
              </a>
            </div>
          </div>

          <p className="disclosure" data-reveal>
            <strong>Press kit scope</strong>
            The PDF contains only published, sourced information. Booking contact, approved high-resolution
            photography and confirmed production credits are outstanding and are listed as such inside the
            document rather than filled in.
          </p>
        </div>
      </section>

      {/* --------------------------------------------------- open questions */}
      <section className="section" aria-labelledby="pending-heading">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <div className="section-head__title">
              <p className="eyebrow">Awaiting confirmation</p>
              <h2 className="h2" id="pending-heading">Deliberately not published</h2>
            </div>
          </div>

          <dl className="pending-list" data-reveal data-reveal-delay="1">
            {openQuestions.map((q) => (
              <div className="pending" key={q.id}>
                <dt>{q.question}</dt>
                <dd>{q.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ---------------------------------------------------------- links */}
      <section className="section" aria-labelledby="links-heading">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <div className="section-head__title">
              <p className="eyebrow">Contact &amp; channels</p>
              <h2 className="h2" id="links-heading">Official destinations</h2>
            </div>
          </div>

          <div className="channel-grid" data-reveal data-reveal-delay="1">
            {Object.entries(artist.links)
              .filter(([, url]) => Boolean(url))
              .map(([key, url]) => (
                <a key={key} className="channel" href={url} target="_blank" rel="noopener noreferrer">
                  <span>
                    <b>{key === 'amazonMusic' ? 'Amazon Music' : key === 'appleMusic' ? 'Apple Music' : key.replace(/^\w/, (c) => c.toUpperCase())}</b>
                    <small>{url.replace(/^https?:\/\/(www\.)?/, '').split('?')[0]}</small>
                  </span>
                  <ExternalIcon />
                </a>
              ))}
          </div>

          <p className="disclosure" data-reveal>
            <strong>Booking &amp; press enquiries</strong>
            {artist.contact.note}
          </p>

          <details className="verify" data-reveal style={{ marginTop: '2.5rem' }}>
            <summary>
              Sources &amp; verification notes <ChevronIcon />
            </summary>
            {sources.map((s) => (
              <div className="src-row" key={s.id}>
                <span className={`src-row__status${s.reachable ? '' : ' src-row__status--unchecked'}`}>
                  {s.status}
                </span>
                <div>
                  <strong>{s.title}</strong>
                  <small>
                    {s.publisher} · {s.date}
                    {!s.reachable ? ' · destination not machine-verified' : ''}
                  </small>
                </div>
                {s.url ? (
                  <a href={s.url} target="_blank" rel="noopener noreferrer">Open</a>
                ) : (
                  <span className="micro">No link</span>
                )}
              </div>
            ))}
          </details>
        </div>
      </section>
    </main>
  );
}
