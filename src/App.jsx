import { useEffect } from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import { Header, Footer } from './components/Layout.jsx';
import { ScrollRail } from './components/Motion.jsx';
import { refreshScroll } from './lib/scrollBus.js';
import Home from './pages/Home.jsx';
import Catalog from './pages/Catalog.jsx';
import ReleaseDetail from './pages/ReleaseDetail.jsx';
import Press from './pages/Press.jsx';
import Media from './pages/Media.jsx';
import Artist from './pages/Artist.jsx';
import { artist } from './content/artist.js';
import { SEO } from './components/SEO.jsx';

/** Scrolls to top on navigation, honouring in-page hash targets. */
function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ block: 'start' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  // A new route changes the document height, so every scroll-driven effect has
  // to re-measure. Without this, parallax layers on the incoming page would sit
  // at the previous page's offsets until the reader scrolled.
  useEffect(() => {
    const t = window.setTimeout(refreshScroll, 60);
    return () => window.clearTimeout(t);
  }, [pathname]);

  return null;
}

function NotFound() {
  return (
    <main id="main" className="wrap page-head" style={{ minHeight: '60vh' }}>
      <p className="eyebrow">Error 404 — Not found</p>
      <h1 className="page-head__title">Nothing here<span className="serif-italic">.</span></h1>
      <p className="lede" style={{ marginTop: '1.25rem' }}>
        That page is not part of {artist.displayName}’s portfolio.
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1.75rem', alignItems: 'center' }}>
        <Link className="btn" to="/">Back to home</Link>
        <Link className="editorial-link" to="/catalog">View the catalogue</Link>
      </div>
    </main>
  );
}

export default function App() {
  const { pathname } = useLocation();

  return (
    <div className="shell">
      <a className="skip-link" href="#main">Skip to content</a>
      <ScrollManager />
      <ScrollRail />
      <SEO />
      <Header />
      <div className="route-view" key={pathname} style={{ flex: '1 0 auto' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/:id" element={<ReleaseDetail />} />
          <Route path="/press" element={<Press />} />
          <Route path="/media" element={<Media />} />
          <Route path="/artist" element={<Artist />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
