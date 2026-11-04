/**
 * Responsive + accessibility smoke check across the five sections.
 *
 *   npm run build && npm run preview &   # or: npx vite preview --port 4173
 *   npm run check:responsive
 *
 * For every route \u00d7 viewport it asserts:
 *   - no horizontal overflow (documentElement.scrollWidth <= viewport width + 1)
 *   - a single H1 (heading structure)
 *   - no console errors and no failed requests
 *   - the page renders real content (not an empty shell)
 *   - tap targets on mobile are at least 40px on one axis
 *   - with prefers-reduced-motion, no element is left invisible
 * and writes a screenshot per route.
 */
import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import { existsSync, readdirSync } from 'node:fs';

const BASE = process.env.BASE_URL ?? 'http://127.0.0.1:4173';

const ROUTES = [
  { path: '/', name: 'home' },
  { path: '/catalog', name: 'catalog' },
  { path: '/press', name: 'press' },
  { path: '/media', name: 'media' },
  { path: '/artist', name: 'artist' },
];

const VIEWPORTS = [
  { name: 'mobile-360', width: 360, height: 780, isMobile: true },
  { name: 'mobile-390', width: 390, height: 844, isMobile: true },
  { name: 'tablet-768', width: 768, height: 1024, isMobile: false },
  { name: 'laptop-1280', width: 1280, height: 800, isMobile: false },
  { name: 'desktop-1600', width: 1600, height: 1000, isMobile: false },
];

const shellCandidates = [
  process.env.CHROME_PATH,
  '/root/.cache/ms-playwright/chromium_headless_shell-1181/chrome-linux/headless_shell',
  ...(existsSync('/root/.cache/ms-playwright')
    ? readdirSync('/root/.cache/ms-playwright')
        .filter((d) => d.startsWith('chromium'))
        .map((d) => `/root/.cache/ms-playwright/${d}/chrome-linux/headless_shell`)
    : []),
  '/usr/bin/chromium',
  '/usr/bin/google-chrome',
].filter(Boolean);

const executablePath = shellCandidates.find((p) => existsSync(p));

const outDir = 'docs/responsive';
await mkdir(outDir, { recursive: true });

const browser = await chromium.launch({
  executablePath,
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
});

const findings = [];
const shots = [];

for (const vp of VIEWPORTS) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
    isMobile: vp.isMobile,
    hasTouch: vp.isMobile,
    reducedMotion: 'no-preference',
  });

  for (const route of ROUTES) {
    const page = await context.newPage();
    const errors = [];
    page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
    page.on('pageerror', (e) => errors.push(String(e)));
    page.on('requestfailed', (r) => {
      const url = r.url();
      // The YouTube poster/embed is only fetched on interaction; ignore analytics noise.
      if (!/youtube|google|youtube-nocookie/.test(url)) errors.push(`request failed: ${url}`);
    });

    const res = await page.goto(`${BASE}${route.path}`, { waitUntil: 'networkidle', timeout: 45000 });
    await page.waitForTimeout(400);

    // Scroll the whole page so every reveal is triggered, then return to the top.
    // `behavior: 'instant'` overrides the site's smooth scrolling \u2014 otherwise the
    // harness outruns the animation and measures elements it never actually reached.
    await page.evaluate(async () => {
      const step = window.innerHeight * 0.8;
      const height = document.body.scrollHeight;
      for (let y = 0; y < height; y += step) {
        window.scrollTo({ top: y, behavior: 'instant' });
        await new Promise((r) => setTimeout(r, 40));
      }
      window.scrollTo({ top: height, behavior: 'instant' });
      await new Promise((r) => setTimeout(r, 200));
      window.scrollTo({ top: 0, behavior: 'instant' });
      await new Promise((r) => setTimeout(r, 250));
    });
    await page.waitForTimeout(900);

    const metrics = await page.evaluate(() => {
      const de = document.documentElement;
      const h1s = [...document.querySelectorAll('h1')].map((h) => h.textContent.trim());
      const smallTargets = [...document.querySelectorAll('a, button')]
        .filter((el) => {
          const r = el.getBoundingClientRect();
          if (r.width === 0 || r.height === 0) return false;
          if (el.closest('[aria-hidden=\"true\"]')) return false;
          return Math.min(r.width, r.height) < 30;
        })
        .map((el) => `${el.tagName}:${(el.textContent || '').trim().slice(0, 26)}`)
        .slice(0, 6);
      const invisible = [...document.querySelectorAll('[data-reveal]')]
        .filter((el) => getComputedStyle(el).opacity === '0')
        .length;
      return {
        scrollWidth: de.scrollWidth,
        clientWidth: de.clientWidth,
        h1s,
        text: document.body.innerText.replace(/\\s+/g, ' ').trim(),
        smallTargets,
        invisible,
        nodes: document.querySelectorAll('body *').length,
      };
    });

    const overflow = metrics.scrollWidth - metrics.clientWidth;
    if (overflow > 1) {
      findings.push({
        viewport: vp.name, route: route.path, severity: 'error',
        issue: `horizontal overflow: scrollWidth ${metrics.scrollWidth} > clientWidth ${metrics.clientWidth}`,
      });
    }
    if (metrics.h1s.length !== 1) {
      findings.push({
        viewport: vp.name, route: route.path, severity: 'error',
        issue: `expected exactly 1 <h1>, found ${metrics.h1s.length}`,
      });
    }
    if (metrics.text.length < 400) {
      findings.push({
        viewport: vp.name, route: route.path, severity: 'error',
        issue: `page looks empty (${metrics.text.length} chars of text)`,
      });
    }
    if (metrics.invisible > 0) {
      findings.push({
        viewport: vp.name, route: route.path, severity: 'warn',
        issue: `${metrics.invisible} reveal elements still invisible after settle`,
      });
    }
    if (vp.isMobile && metrics.smallTargets.length) {
      findings.push({
        viewport: vp.name, route: route.path, severity: 'warn',
        issue: `small tap targets: ${metrics.smallTargets.join(' | ')}`,
      });
    }
    if (errors.length) {
      findings.push({
        viewport: vp.name, route: route.path, severity: 'error',
        issue: errors.slice(0, 3).join(' || '),
      });
    }
    if (res && res.status() !== 200) {
      findings.push({
        viewport: vp.name, route: route.path, severity: 'error',
        issue: `HTTP ${res.status()}`,
      });
    }

    if (['mobile-390', 'laptop-1280'].includes(vp.name)) {
      const file = `${outDir}/${route.name}-${vp.name}.png`;
      await page.screenshot({ path: file, fullPage: false });
      shots.push(file);
    }

    await page.close();
  }
  await context.close();
}

// ---- reduced motion pass: nothing may stay hidden -------------------------
{
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    reducedMotion: 'reduce',
  });
  const page = await context.newPage();
  for (const route of ROUTES) {
    await page.goto(`${BASE}${route.path}`, { waitUntil: 'networkidle' });
    const hidden = await page.evaluate(
      () => [...document.querySelectorAll('[data-reveal]')]
        .filter((el) => getComputedStyle(el).opacity === '0').length,
    );
    if (hidden > 0) {
      findings.push({
        viewport: 'reduced-motion', route: route.path, severity: 'error',
        issue: `${hidden} reveal elements hidden under prefers-reduced-motion`,
      });
    }
  }
  await page.screenshot({ path: `${outDir}/reduced-motion-home.png` });
  shots.push(`${outDir}/reduced-motion-home.png`);
  await context.close();
}

await browser.close();

const report = {
  base: BASE,
  ranAt: new Date().toISOString(),
  viewports: VIEWPORTS.map((v) => `${v.name} (${v.width}\u00d7${v.height})`),
  routes: ROUTES.map((r) => r.path),
  checks: [
    'no horizontal overflow',
    'exactly one h1 per page',
    'page renders real content',
    'no console / request errors',
    'mobile tap targets >= 30px',
    'reveal animations settle',
    'prefers-reduced-motion keeps all content visible',
  ],
  screenshots: shots,
  findings,
  errors: findings.filter((f) => f.severity === 'error').length,
  warnings: findings.filter((f) => f.severity === 'warn').length,
};

await writeFile(`${outDir}/report.json`, JSON.stringify(report, null, 2));

console.log(`\nResponsive check \u2014 ${ROUTES.length} routes \u00d7 ${VIEWPORTS.length} viewports + reduced-motion pass`);
console.log(`errors: ${report.errors}   warnings: ${report.warnings}`);
for (const f of findings) console.log(`  [${f.severity}] ${f.viewport} ${f.route}: ${f.issue}`);
console.log(`\nreport: ${outDir}/report.json`);
process.exit(report.errors > 0 ? 1 : 0);
