import { describe, expect, it } from 'vitest'
import manifest from '../client/public/manus-routes.json'
import { getRelease, releases, routeEntries } from '../client/src/data/artist'

describe('recovered artist content model', () => {
  it('keeps unresolved candidates visible and labeled', () => {
    expect(getRelease('one-call')?.status).toBe('unresolved')
    expect(releases.filter((release) => release.status === 'unresolved').length).toBeGreaterThan(0)
  })

  it('preserves the feature distinction for 3 Star General', () => {
    expect(getRelease('3-star-general')?.role).toBe('featured')
    expect(getRelease('3-star-general')?.artistLine).toContain('Malex Betaboi')
  })

  it('has route source and manifest parity for declared page patterns', () => {
    expect(manifest.routes).toEqual(routeEntries)
    expect(manifest.routes[0].title).toContain('Teeroy Tyobee')
  })
})
