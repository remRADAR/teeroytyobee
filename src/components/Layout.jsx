import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { nav, site } from '../content/site.js';
import { artist } from '../content/artist.js';
import { featuredRelease } from '../lib/catalog.js';
import { useScrollLock } from '../lib/motion.js';
import { ExternalIcon } from './Icons.jsx';

function Wordmark() {
  const [first, ...rest] = artist.displayName.split(' ');
  return (
    <Link to="/" className="wordmark" aria-label={`${artist.displayName} — home`}>
      <b>{first}</b>
      <b>{rest.join(' ')}</b>
      <span>{site.tagline}</span>
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const location = useLocation();
  const firstRender = useRef(true);
  const latest = featuredRelease();

  useScrollLock(open);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the drawer on route change and after the first paint.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <header className={`hdr${solid || open ? ' hdr--solid' : ''}${open ? ' hdr--open' : ''}`}>
        <div className="wrap hdr__inner">
          <Wordmark />

          <nav className="nav" aria-label="Primary">
            {nav.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.to === '/'} className="nav__link">
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hdr__aside">
            <Link className="hdr__latest" to={`/catalog/${latest.id}`} aria-label={`Latest release: ${latest.title}`}>
              <span className="hdr__latest-mark" aria-hidden="true">TT</span>
              <span className="hdr__latest-copy"><small>Latest release</small><b>{latest.title}</b></span>
            </Link>
            <button
              className="burger"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="burger__label">{open ? 'Close' : 'Menu'}</span>
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="drawer" id="mobile-nav">
          <nav aria-label="Mobile">
            <ul className="drawer__list">
              {nav.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className="drawer__item"
                    onClick={() => setOpen(false)}
                  >
                    <em>{item.index}</em>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="drawer__foot">
            <p className="micro">{artist.originLine}</p>
            <a
              className="btn"
              href={artist.links.appleMusic}
              target="_blank"
              rel="noopener noreferrer"
            >
              Listen on Apple Music <ExternalIcon />
            </a>
          </div>
        </div>
      )}
    </>
  );
}

export function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot__top">
          <div>
            <p className="foot__name">{artist.displayName}</p>
            <p className="eyebrow eyebrow--plain" style={{ marginTop: '0.9rem' }}>
              {artist.genreLine}
            </p>
            <p className="body" style={{ marginTop: '0.9rem', maxWidth: '34ch' }}>
              {artist.originLine}. Releasing independently through {artist.label}.
            </p>
          </div>

          <nav className="foot__nav" aria-label="Sections">
            {nav.map((item) => (
              <Link key={item.to} to={item.to}>{item.label}</Link>
            ))}
          </nav>

          <nav className="foot__nav" aria-label="Official channels">
            <a href={artist.links.appleMusic} target="_blank" rel="noopener noreferrer" className="ext">
              Apple Music <ExternalIcon />
            </a>
            <a href={artist.links.audiomack} target="_blank" rel="noopener noreferrer" className="ext">
              Audiomack <ExternalIcon />
            </a>
            <a href={artist.links.amazonMusic} target="_blank" rel="noopener noreferrer" className="ext">
              Amazon Music <ExternalIcon />
            </a>
            <a href={artist.links.youtube} target="_blank" rel="noopener noreferrer" className="ext">
              YouTube <ExternalIcon />
            </a>
            <a href={artist.links.instagram} target="_blank" rel="noopener noreferrer" className="ext">
              Instagram <ExternalIcon />
            </a>
          </nav>
        </div>

        <div className="foot__bottom">
          <p>
            © {new Date().getFullYear()} {artist.displayName}. All rights reserved. External
            destinations open in a new tab.
          </p>
          <p>{site.artDirectionNote}</p>
        </div>
      </div>
    </footer>
  );
}
