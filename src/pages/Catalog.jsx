import { useMemo, useState } from 'react';
import { catalogDisclosure } from '../content/releases.js';
import { catalogStats, sortedSolo, sortedCollaborations } from '../lib/catalog.js';
import { useRevealOnMount } from '../components/Img.jsx';
import { ReleaseRow, Verified } from '../components/ReleaseRow.jsx';

const FILTERS = [
  { id: 'all', label: 'Everything' },
  { id: 'solo', label: 'Solo' },
  { id: 'collaboration', label: 'Collaborations' },
  { id: 'ep', label: 'Projects' },
];

export default function Catalog() {
  const ref = useRevealOnMount();
  const [filter, setFilter] = useState('all');

  // Each filter maps to an explicitly built list — collaborations can never leak
  // into the solo view, and ordering is applied by the shared sorter.
  const view = useMemo(() => {
    if (filter === 'solo') return { solo: sortedSolo, collab: [] };
    if (filter === 'collaboration') return { solo: [], collab: sortedCollaborations };
    if (filter === 'ep') return { solo: sortedSolo.filter((r) => r.kind === 'EP'), collab: [] };
    return { solo: sortedSolo, collab: sortedCollaborations };
  }, [filter]);

  const count = view.solo.length + view.collab.length;

  return (
    <main ref={ref} id="main">
      <div className="wrap page-head">
        <p className="eyebrow" data-reveal>Body of work</p>
        <div className="page-head__row">
          <h1 className="page-head__title" data-reveal data-reveal-delay="1">
            Catalogue<span className="serif-italic">.</span>
          </h1>
          <div className="page-head__stats" data-reveal data-reveal-delay="2">
            <div>
              <p className="stat__n">{catalogStats.solo}</p>
              <p className="stat__l">Solo releases</p>
            </div>
            <div>
              <p className="stat__n">{catalogStats.collaborations}</p>
              <p className="stat__l">Collaborations</p>
            </div>
            <div>
              <p className="stat__n">
                {catalogStats.years.min}–{String(catalogStats.years.max).slice(2)}
              </p>
              <p className="stat__l">Documented span</p>
            </div>
          </div>
        </div>
        <p className="lede" style={{ marginTop: '1.5rem' }} data-reveal>
          Music releases, projects and collaborations — newest first. Covers with a verified official
          YouTube source can load in the site player; every other link opens the official destination.
        </p>
      </div>

      <section className="section section--flush" aria-labelledby="catalog-body">
        <div className="wrap">
          <div className="filters" role="group" aria-label="Filter the catalogue">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                className="filters__btn"
                aria-pressed={filter === f.id}
                onClick={() => setFilter(f.id)}
              >
                {f.label}
              </button>
            ))}
            <span className="filters__count">
              {count} {count === 1 ? 'release' : 'releases'}
            </span>
          </div>

          <h2 className="visually-hidden" id="catalog-body">Releases</h2>

          {view.solo.length > 0 && (
            <section aria-labelledby="solo-heading" data-reveal>
              <div className="group-head">
                <h2 id="solo-heading">Solo releases</h2>
                <p>{view.solo.length} entries · newest first</p>
              </div>
              <ul className="rel-list">
                {view.solo.map((r) => (
                  <ReleaseRow key={r.id} release={r} showTracks={r.kind === 'EP'} />
                ))}
              </ul>
            </section>
          )}

          {view.collab.length > 0 && (
            <section aria-labelledby="collab-heading" id="collaborations" data-reveal>
              <div className="group-head">
                <h2 id="collab-heading">Collaborations &amp; features</h2>
                <p>{view.collab.length} entries · newest first</p>
              </div>
              <ul className="rel-list">
                {view.collab.map((r) => (
                  <ReleaseRow key={r.id} release={r} />
                ))}
              </ul>
            </section>
          )}

          {count === 0 && (
            <p className="empty-note">No releases match this filter.</p>
          )}

          <div className="disclosure" data-reveal>
            <strong>Catalog status</strong>
            {catalogDisclosure}
          </div>

          <div className="disclosure" data-reveal>
            <strong>How to read the badges</strong>
            <span style={{ display: 'inline-flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <Verified verified>Confirmed</Verified>
              <span>Official destination reachable and matched to the record.</span>
            </span>
            <br />
            <span style={{ display: 'inline-flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <Verified verified={false}>Needs review</Verified>
              <span>Credits, month or exact split-artist listing still to be confirmed with the distributor.</span>
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
