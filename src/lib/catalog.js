import { soloReleases, collaborations } from '../content/releases.js';

/**
 * Newest-first ordering. `sortDate` is authoritative; ties fall back to year,
 * then to the documented order. Exported so tests can assert the invariant.
 */
export function byNewest(a, b) {
  const aKey = a.sortDate ?? `${a.year}-01-01`;
  const bKey = b.sortDate ?? `${b.year}-01-01`;
  if (aKey === bKey) return (b.year ?? 0) - (a.year ?? 0);
  return aKey < bKey ? 1 : -1;
}

export const sortedSolo = [...soloReleases].sort(byNewest);
export const sortedCollaborations = [...collaborations].sort(byNewest);

export const allReleases = [...sortedSolo, ...sortedCollaborations].sort(byNewest);

export function featuredRelease() {
  return sortedSolo.find((r) => r.featured) ?? sortedSolo[0];
}

export function releasesByYear() {
  const groups = new Map();
  for (const release of allReleases) {
    const year = release.year ?? 'Undated';
    if (!groups.has(year)) groups.set(year, []);
    groups.get(year).push(release);
  }
  return [...groups.entries()];
}

export const catalogStats = {
  solo: sortedSolo.length,
  collaborations: sortedCollaborations.length,
  total: allReleases.length,
  years: allReleases.reduce(
    (acc, r) => (r.year ? { min: Math.min(acc.min, r.year), max: Math.max(acc.max, r.year) } : acc),
    { min: Infinity, max: -Infinity },
  ),
};

export function platformLabel(platform) {
  return platform;
}
