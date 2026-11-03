import { type ReactNode, useEffect, useState } from 'react'
import { artist } from '../data/artist'

export const statusClass = (status: string) => `status status-${status}`

export function StatusPill({ status, children }: { status: string; children: ReactNode }) {
  return <span className={statusClass(status)}>{children}</span>
}

export function SourceNote({ children }: { children: ReactNode }) {
  return <p className="source-note"><span aria-hidden="true">↳</span> {children}</p>
}

export function SiteChrome({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const close = () => setMenuOpen(false)
    window.addEventListener('popstate', close)
    return () => window.removeEventListener('popstate', close)
  }, [])

  const navigate = (path: string) => {
    window.history.pushState({}, '', path)
    window.dispatchEvent(new PopStateEvent('popstate'))
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <button className="wordmark" onClick={() => navigate('/')} aria-label="Go to Teeroy Tyobee home">
          <span>{artist.name}</span>
        </button>
        <button className="menu-toggle" aria-expanded={menuOpen} aria-controls="site-nav" onClick={() => setMenuOpen((open) => !open)}>
          <span>{menuOpen ? 'Close' : 'Menu'}</span><span aria-hidden="true">{menuOpen ? '×' : '＋'}</span>
        </button>
        <nav id="site-nav" className={menuOpen ? 'site-nav is-open' : 'site-nav'} aria-label="Main navigation">
          {[
            ['/', 'Home'],
            ['/catalog', 'Catalog'],
            ['/press', 'Press'],
            ['/media', 'Media'],
          ].map(([path, label]) => (
            <button key={path} onClick={() => navigate(path)}>{label}</button>
          ))}
        </nav>
      </header>
      <main>{children}</main>
      <footer className="site-footer">
        <div>
          <p className="eyebrow">Artist-owned archive</p>
          <p className="footer-name">{artist.name}</p>
        </div>
        <div className="footer-meta">
          <span>{artist.location}</span>
          <span>Content status: recovery build</span>
        </div>
      </footer>
    </div>
  )
}
