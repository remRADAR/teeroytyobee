import { useMemo, useState } from 'react'
import { PageIntro } from '../components/PageIntro'
import { ReleaseCard } from '../components/ReleaseCard'
import { SourceNote } from '../components/SiteChrome'
import { releases, type ReleaseRole, type VerificationStatus } from '../data/artist'
import { navigateTo } from '../lib/navigation'

type Filter = 'all' | VerificationStatus | ReleaseRole

export function CatalogPage() {
  const [filter, setFilter] = useState<Filter>('all')
  const filtered = useMemo(() => filter === 'all' ? releases : releases.filter((release) => release.status === filter || release.role === filter), [filter])
  const filters: [Filter, string][] = [['all', 'All records'], ['verified', 'Verified'], ['platform-specific', 'Platform-specific'], ['partial', 'Partial'], ['unresolved', 'Unresolved'], ['featured', 'Features']]
  return (
    <>
      <PageIntro eyebrow="02 / Catalog" title="The work, with the receipts." aside={<div className="metric"><strong>{releases.length}</strong><span>records in recovery inventory</span></div>}>
        <p>A living catalogue of singles, collaborations, and features. The status pill on every card tells you how much of each record is currently verified.</p>
      </PageIntro>
      <section className="wrap catalog-section">
        <div className="filter-bar" role="group" aria-label="Filter releases">
          {filters.map(([value, label]) => <button className={filter === value ? 'filter-button is-active' : 'filter-button'} key={value} onClick={() => setFilter(value)}>{label}</button>)}
        </div>
        <div className="catalog-grid">{filtered.map((release) => <ReleaseCard key={release.slug} release={release} onOpen={(slug) => navigateTo(`/catalog/${slug}`)} />)}</div>
        <SourceNote>Candidate records that were not resolved in the previous session remain visible as unresolved instead of being silently removed.</SourceNote>
      </section>
    </>
  )
}
