import { press, pressNote } from '../content/press.js';
import { useRevealOnMount } from '../components/Img.jsx';
import { ExtLink, Verified } from '../components/ReleaseRow.jsx';

export default function Press() {
  const ref = useRevealOnMount();
  const linked = press.filter((p) => p.url);
  const archived = press.length - linked.length;

  return (
    <main ref={ref} id="main">
      <div className="wrap page-head">
        <p className="eyebrow" data-reveal>Editorial</p>
        <div className="page-head__row">
          <h1 className="page-head__title" data-reveal data-reveal-delay="1">
            Press<span className="serif-italic">.</span>
          </h1>
          <div className="page-head__stats" data-reveal data-reveal-delay="2">
            <div>
              <p className="stat__n">{press.length}</p>
              <p className="stat__l">Featured items</p>
            </div>
            <div>
              <p className="stat__n">{linked.length}</p>
              <p className="stat__l">With verified link</p>
            </div>
            <div>
              <p className="stat__n">{archived}</p>
              <p className="stat__l">Archive only</p>
            </div>
          </div>
        </div>
        <p className="lede" style={{ marginTop: '1.5rem' }} data-reveal>
          Media coverage and editorial features, newest first. Items that could not be verified are kept
          in the record but are not linked.
        </p>
      </div>

      <section className="section section--flush" aria-labelledby="press-list-heading">
        <div className="wrap">
          <h2 className="visually-hidden" id="press-list-heading">Coverage</h2>

          <div className="press-list">
            {press.map((item, i) => (
              <article className="press-item" key={item.id} data-reveal data-reveal-delay={String(i % 3)}>
                <div className="press-item__meta">
                  <p className="press-item__outlet">{item.outlet}</p>
                  <p className="press-item__date">{item.dateLabel}</p>
                  <p className="micro">{item.kind}</p>
                </div>

                <div className="press-item__image" aria-hidden="true">
                  <img src={item.image ?? '/media/covers/iember.jpg'} alt="" loading="lazy" width="640" height="640" />
                </div>

                <div>
                  <h3 className="press-item__title">{item.title}</h3>
                  <p className="press-item__summary">{item.summary}</p>
                  {item.verificationNote && (
                    <p className="press-item__note">{item.verificationNote}</p>
                  )}
                </div>

                <div className="press-item__tail">
                  {item.url ? (
                    <>
                      <ExtLink
                        href={item.url}
                        label={`${item.title} — ${item.outlet}`}
                        className="btn btn--ghost btn--sm"
                      >
                        Read
                      </ExtLink>
                      <Verified verified={item.verified}>
                        {item.verified ? 'Verified' : 'Awaiting check'}
                      </Verified>
                    </>
                  ) : (
                    <span className="badge">Archive only</span>
                  )}
                </div>
              </article>
            ))}
          </div>

          <p className="disclosure" data-reveal>
            <strong>Archive policy</strong>
            {pressNote} Coverage is recorded with its original headline; headlines are not rewritten.
          </p>
        </div>
      </section>
    </main>
  );
}
