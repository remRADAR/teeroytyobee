import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { releases, routeEntries } from '../client/src/data/artist'

const root = process.cwd()
const dist = join(root, 'dist')
const template = await readFile(join(dist, 'index.html'), 'utf8')

const routes = [
  ...routeEntries.filter((entry) => entry.path !== '/catalog/:slug'),
  ...releases.map((release) => ({ path: `/catalog/${release.slug}`, title: `${release.title} — Teeroy Tyobee` })),
  { path: '/404', title: 'Page not found — Teeroy Tyobee' },
]

const plain = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const bodyText = (path: string) => {
  if (path.startsWith('/catalog/')) {
    const release = releases.find((item) => `/catalog/${item.slug}` === path)
    return release ? `${release.title}. ${release.artistLine}. ${release.summary} Status: ${release.statusLabel}.` : 'Release not found.'
  }
  const labels: Record<string, string> = {
    '/': 'Teeroy Tyobee artist portfolio. Artist-owned archive, catalogue, press, media, and electronic press kit.',
    '/catalog': 'The Teeroy Tyobee release catalogue, with source-aware verification labels.',
    '/press': 'Selected press coverage and source notes for Teeroy Tyobee.',
    '/media': 'Available artist media and image-rights notes for Teeroy Tyobee.',
    '/epk': 'Teeroy Tyobee artist profile and current electronic press kit.',
    '/404': 'The requested Teeroy Tyobee page was not found.',
  }
  return labels[path] ?? labels['/404']
}

await rm(join(dist, '404'), { recursive: true, force: true })
for (const route of routes) {
  const clean = route.path === '/' ? '' : route.path.replace(/^\//, '')
  const dir = join(dist, clean)
  await mkdir(dir, { recursive: true })
  const description = bodyText(route.path)
  const html = template
    .replace(/<title>.*?<\/title>/, `<title>${plain(route.title)}</title>`)
    .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${plain(description)}" />`)
    .replace('<div id="root"></div>', `<div id="root"><main><h1>${plain(route.title)}</h1><p>${plain(description)}</p></main></div>`)
  await writeFile(join(dir, 'index.html'), html)
}
await cp(join(root, 'client/public/manus-routes.json'), join(dist, 'manus-routes.json'))
await cp(join(dist, '404/index.html'), join(dist, '404.html'))
console.log(`Prerendered ${routes.length} routes.`)
