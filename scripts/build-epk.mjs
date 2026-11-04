/**
 * Builds the downloadable EPK PDF from the SAME content modules the site renders.
 *
 *   node scripts/build-epk.mjs
 *
 * Strategy: render a print-styled HTML document, then print it to PDF with the
 * headless Chromium that ships in the sandbox. No extra dependency, and the PDF
 * can never contradict the pages because both read src/content/*.js.
 */
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');

const { artist, career, openQuestions } = await import('../src/content/artist.js');
const { soloReleases, collaborations, catalogDisclosure } = await import('../src/content/releases.js');
const { sources } = await import('../src/content/sources.js');
const { sortedSolo, sortedCollaborations, catalogStats } = await import('../src/lib/catalog.js');

const esc = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;');

const today = new Date().toISOString().slice(0, 10);

const linkRows = Object.entries(artist.links)
  .filter(([, url]) => Boolean(url))
  .map(([k, url]) => `<li><b>${esc(k)}</b><span>${esc(url)}</span></li>`)
  .join('');

const soloRows = sortedSolo
  .map(
    (r) => `<tr>
      <td class=\"mono\">${r.year}</td>
      <td><b>${esc(r.title)}</b><span class=\"kind\">${esc(r.kind)}${r.trackCount ? ` \u00b7 ${r.trackCount} tracks` : ''}</span></td>
      <td class=\"sm\">${esc(r.summary ?? '\u2014')}</td>
    </tr>`,
  )
  .join('');

const collabRows = sortedCollaborations
  .map(
    (r) => `<tr>
      <td class=\"mono\">${r.year}</td>
      <td><b>${esc(r.title)}</b><span class=\"kind\">${esc(r.kind)}</span></td>
      <td class=\"sm\">${esc(r.credit ?? '\u2014')}</td>
    </tr>`,
  )
  .join('');

const careerRows = career
  .map(
    (c) => `<li>
      <span class=\"mono\">${esc(c.year ?? '\u2014')}</span>
      <div>
        <b>${esc(c.title)}</b>${c.status === 'needs-review' ? ' <em class=\"flag\">needs review</em>' : ''}
        <p>${esc(c.body)}</p>
      </div>
    </li>`,
  )
  .join('');

const pendingRows = openQuestions
  .map((q) => `<li><b>${esc(q.question)}</b><span>${esc(q.detail)}</span></li>`)
  .join('');

const sourceRows = sources
  .map(
    (s) => `<li><b>${esc(s.publisher)}</b> \u2014 ${esc(s.title)} <span class=\"sm\">(${esc(s.date)}${s.reachable ? '' : ' \u00b7 not machine-verified'})</span></li>`,
  )
  .join('');

const html = `<!doctype html>
<html lang=\"en\">
<head>
<meta charset=\"utf-8\" />
<title>${esc(artist.displayName)} \u2014 Artist Profile &amp; EPK</title>
<style>
  @page { size: A4; margin: 18mm 16mm 20mm; }
  * { box-sizing: border-box; }
  body {
    font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;
    color: #14140f; font-size: 9.4pt; line-height: 1.55; margin: 0;
  }
  h1, h2, h3 { font-family: Georgia, \"Times New Roman\", serif; font-weight: 400; margin: 0; }
  .cover { border-bottom: 2px solid #14140f; padding-bottom: 12mm; margin-bottom: 10mm; }
  .kicker { font-size: 7.2pt; letter-spacing: .26em; text-transform: uppercase; color: #8a6f3d; }
  h1 { font-size: 30pt; line-height: 1; margin: 5mm 0 3mm; letter-spacing: -.01em; }
  .sub { font-size: 10pt; color: #4a4a44; }
  .meta { display: flex; gap: 10mm; margin-top: 7mm; font-size: 8pt; }
  .meta div { flex: 1; }
  .meta span { display: block; font-size: 6.8pt; letter-spacing: .18em; text-transform: uppercase; color: #8a6f3d; margin-bottom: 1.5mm; }
  h2 { font-size: 15pt; margin: 9mm 0 4mm; padding-bottom: 2mm; border-bottom: 1px solid #d8d3c8; }
  h3 { font-size: 11pt; margin: 5mm 0 2mm; }
  p { margin: 0 0 3mm; }
  ul { margin: 0; padding: 0; list-style: none; }
  .lead p:first-child { font-size: 10.6pt; color: #14140f; }
  table { width: 100%; border-collapse: collapse; margin-bottom: 4mm; }
  th { text-align: left; font-size: 6.8pt; letter-spacing: .16em; text-transform: uppercase; color: #8a6f3d; padding: 0 0 2mm; border-bottom: 1px solid #d8d3c8; }
  td { padding: 2.4mm 3mm 2.4mm 0; border-bottom: 1px solid #eeeae2; vertical-align: top; }
  td b { display: block; font-weight: 600; font-size: 9.6pt; }
  .kind { display: block; font-size: 7.4pt; color: #6a6a62; margin-top: .6mm; }
  .mono { font-variant-numeric: tabular-nums; font-size: 8.4pt; color: #6a6a62; width: 16mm; }
  .sm { font-size: 8pt; color: #4a4a44; }
  .links li, .pending li, .sources li { padding: 2mm 0; border-bottom: 1px solid #eeeae2; }
  .links li b { display: inline-block; min-width: 30mm; font-size: 8.2pt; }
  .links li span { font-size: 7.6pt; color: #4a4a44; word-break: break-all; }
  .pending li b { display: block; font-size: 8.6pt; }
  .pending li span { font-size: 8pt; color: #4a4a44; }
  .career li { display: flex; gap: 5mm; padding: 2.6mm 0; border-bottom: 1px solid #eeeae2; }
  .career li .mono { width: 22mm; flex: none; }
  .career li p { margin: 1mm 0 0; font-size: 8.2pt; color: #3a3a34; }
  .flag { font-style: normal; font-size: 6.6pt; letter-spacing: .14em; text-transform: uppercase; color: #8a6f3d; border: 1px solid #c9a96a; padding: .3mm 1.2mm; }
  .note { font-size: 7.6pt; color: #6a6a62; border-left: 2px solid #c9a96a; padding-left: 3mm; margin-top: 3mm; }
  .foot { margin-top: 10mm; padding-top: 4mm; border-top: 1px solid #d8d3c8; font-size: 7pt; color: #6a6a62; display: flex; justify-content: space-between; }
  .break { break-before: page; }
</style>
</head>
<body>

<section class=\"cover\">
  <p class=\"kicker\">Artist Profile &amp; Electronic Press Kit</p>
  <h1>${esc(artist.displayName)}</h1>
  <p class=\"sub\">${esc(artist.roleLine)} \u2014 ${esc(artist.originLine)}</p>
  <div class=\"meta\">
    <div><span>Sound</span>${esc(artist.genreLine)}</div>
    <div><span>Label</span>${esc(artist.label)} (independent)</div>
    <div><span>Catalogue</span>${catalogStats.total} releases</div>
    <div><span>Issued</span>${esc(today)}</div>
  </div>
</section>

<h2>Biography</h2>
<div class=\"lead\">
  ${artist.longBio.map((p) => `<p>${esc(p)}</p>`).join('')}
</div>

<h2>Career</h2>
<ul class=\"career\">${careerRows}</ul>

<h2 class=\"break\">Discography \u2014 solo releases</h2>
<table>
  <thead><tr><th>Year</th><th>Release</th><th>Notes</th></tr></thead>
  <tbody>${soloRows}</tbody>
</table>

<h3>Collaborations &amp; featured appearances</h3>
<table>
  <thead><tr><th>Year</th><th>Release</th><th>Credit</th></tr></thead>
  <tbody>${collabRows}</tbody>
</table>
<p class=\"note\">${esc(catalogDisclosure)}</p>

<h2>Official destinations</h2>
<ul class=\"links\">${linkRows}</ul>
<p class=\"note\">${esc(artist.contact.note)}</p>

<h2 class=\"break\">Open items \u2014 awaiting artist confirmation</h2>
<p>The following are deliberately withheld rather than presented as fact. They are listed here so a
journalist or promoter can see exactly what is not yet published.</p>
<ul class=\"pending\">${pendingRows}</ul>

<h2>Sources</h2>
<ul class=\"sources\">${sourceRows}</ul>

<div class=\"foot\">
  <span>${esc(artist.displayName)} \u2014 Artist Profile &amp; EPK</span>
  <span>Generated ${esc(today)} from the portfolio content files</span>
</div>

</body>
</html>`;

await mkdir(resolve(root, 'public/downloads'), { recursive: true });
await writeFile(resolve(root, 'public/downloads/epk-source.html'), html, 'utf8');

// ---- print to PDF -------------------------------------------------------

const shellCandidates = [
  process.env.CHROME_PATH,
  '/root/.cache/ms-playwright/chromium_headless_shell-1181/chrome-linux/headless_shell',
  ...(existsSync('/root/.cache/ms-playwright')
    ? (await import('node:fs')).readdirSync('/root/.cache/ms-playwright')
        .filter((d) => d.startsWith('chromium'))
        .map((d) => `/root/.cache/ms-playwright/${d}/chrome-linux/headless_shell`)
    : []),
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
  '/usr/bin/google-chrome',
].filter(Boolean);

let chromium;
let executablePath;
try {
  ({ chromium } = await import('playwright'));
  executablePath = shellCandidates.find((p) => existsSync(p));
  if (!executablePath) executablePath = chromium.executablePath();
} catch {
  // playwright not installed \u2014 fall through to the manual error below.
}

if (!chromium) {
  console.error('[epk] playwright is required to render the PDF. Run: npm i -D playwright');
  process.exit(1);
}

const browser = await chromium.launch({
  executablePath,
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
});
const page = await browser.newPage();
await page.setContent(html, { waitUntil: 'load' });

const out = resolve(root, 'public/downloads/teeroy-tyobee-epk.pdf');
await page.pdf({
  path: out,
  format: 'A4',
  printBackground: true,
  displayHeaderFooter: true,
  headerTemplate: '<span></span>',
  footerTemplate:
    '<div style=\"width:100%;font-family:Helvetica,Arial,sans-serif;font-size:7pt;color:#8a857d;padding:0 16mm;display:flex;justify-content:space-between;\"><span>Teeroy Tyobee \u2014 Artist Profile &amp; EPK</span><span class=\"pageNumber\"></span></div>',
  margin: { top: '16mm', bottom: '18mm', left: '16mm', right: '16mm' },
});

await browser.close();
const { size } = await (await import('node:fs/promises')).stat(out);
console.log(`[epk] wrote ${out} (${Math.round(size / 1024)} KB)`);
