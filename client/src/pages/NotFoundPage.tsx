import { navigateTo } from '../lib/navigation'

export function NotFoundPage() {
  return <section className="wrap empty-state"><p className="eyebrow">404 / Not found</p><h1>There is no page here yet.</h1><p>Try returning to the artist-owned archive.</p><button className="button button-primary" onClick={() => navigateTo('/')}>Back home</button></section>
}
