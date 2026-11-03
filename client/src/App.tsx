import { useEffect, useState } from 'react'
import { SiteChrome } from './components/SiteChrome'
import { getRelease } from './data/artist'
import { CatalogPage } from './pages/CatalogPage'
import { EpkPage } from './pages/EpkPage'
import { HomePage } from './pages/HomePage'
import { MediaPage } from './pages/MediaPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { PressPage } from './pages/PressPage'
import { ReleasePage } from './pages/ReleasePage'

const pageMeta: Record<string, { title: string; description: string }> = {
  '/': { title: 'Teeroy Tyobee — Artist Portfolio', description: 'The artist-owned portfolio for Teeroy Tyobee.' },
  '/catalog': { title: 'Catalog — Teeroy Tyobee', description: 'A source-aware release catalog for Teeroy Tyobee.' },
  '/press': { title: 'Press — Teeroy Tyobee', description: 'Selected press and source notes for Teeroy Tyobee.' },
  '/media': { title: 'Media — Teeroy Tyobee', description: 'Available imagery and audiovisual media notes.' },
  '/epk': { title: 'Artist Profile / EPK — Teeroy Tyobee', description: 'The current electronic press kit for Teeroy Tyobee.' },
}

function setMeta(path: string) {
  const release = path.startsWith('/catalog/') ? getRelease(path.replace('/catalog/', '')) : undefined
  const basePath = path.startsWith('/catalog/') ? '/catalog' : path
  const meta = release
    ? { title: `${release.title} — Teeroy Tyobee`, description: `${release.summary} ${release.statusLabel}.` }
    : pageMeta[basePath] ?? { title: 'Page not found — Teeroy Tyobee', description: 'The requested Teeroy Tyobee page was not found.' }
  document.title = meta.title
  let description = document.querySelector('meta[name="description"]')
  if (!description) {
    description = document.createElement('meta')
    description.setAttribute('name', 'description')
    document.head.appendChild(description)
  }
  description.setAttribute('content', meta.description)
}

export function App() {
  const [path, setPath] = useState(window.location.pathname.replace(/\/$/, '') || '/')

  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname.replace(/\/$/, '') || '/')
    window.addEventListener('popstate', onPopState)
    setMeta(path)
    return () => window.removeEventListener('popstate', onPopState)
  }, [path])

  const page = path === '/' ? <HomePage />
    : path === '/catalog' ? <CatalogPage />
      : path === '/press' ? <PressPage />
        : path === '/media' ? <MediaPage />
          : path === '/epk' ? <EpkPage />
            : path.startsWith('/catalog/') ? <ReleasePage slug={path.replace('/catalog/', '')} />
              : <NotFoundPage />

  return <SiteChrome>{page}</SiteChrome>
}
