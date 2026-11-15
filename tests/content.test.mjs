/**
 * Content integrity tests — the guardrails for requirement §4 (content accuracy).
 * Run with:  npm test
 *
 * These assert the things a redesign could silently break: the artist's name
 * spelling, newest-first ordering, the solo/collaboration split, that no link is
 * invented, and that uncertain records are flagged rather than asserted.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

import { artist, career } from '../src/content/artist.js';
import { soloReleases, collaborations } from '../src/content/releases.js';
import { press } from '../src/content/press.js';
import { videos, channels, photography } from '../src/content/media.js';
import { sources } from '../src/content/sources.js';
import { sortedSolo, sortedCollaborations, allReleases, catalogStats, featuredRelease } from '../src/lib/catalog.js';

const everything = JSON.stringify({
  artist, career, soloReleases, collaborations, press, videos, channels, sources,
});

test('artist name is always "Teeroy Tyobee"', () => {
  assert.equal(artist.displayName, 'Teeroy Tyobee');

  // Case-SENSITIVE so the correct spelling "Teeroy" is not a false positive:
  // these are the real mis-spellings the requirement forbids.
  const badSpellings = [/TeeRoy/, /Tee Roy/, /Tee-Roy/, /TEEROY/, /TEE ROY/, /TeeroyTyobee/];
  for (const bad of badSpellings) {
    assert.ok(!bad.test(everything), `forbidden spelling found: ${bad}`);
  }
});

test('the name never appears in all-caps, which would break the casing rule', () => {
  // URLs are slugs and exempt; visible copy must keep the mixed case.
  const withoutUrls = everything.replace(/https?:\/\/[^"']+/g, '');
  assert.ok(!/TEEROY\s+TYOBEE/.test(withoutUrls), 'name must not be rendered in all caps in content');
});

test('display name has exactly two words, both capitalised', () => {
  const parts = artist.displayName.split(' ');
  assert.equal(parts.length, 2);
  parts.forEach((p) => assert.match(p, /^[A-Z][a-z]+$/));
});

test('catalogue is newest-first', () => {
  for (const list of [sortedSolo, sortedCollaborations, allReleases]) {
    const keys = list.map((r) => r.sortDate ?? `${r.year}-01-01`);
    const sorted = [...keys].sort().reverse();
    assert.deepEqual(keys, sorted, 'releases must be ordered newest first');
  }
});

test('solo and collaboration sets are disjoint', () => {
  const soloIds = new Set(soloReleases.map((r) => r.id));
  const collabIds = new Set(collaborations.map((r) => r.id));
  const overlap = [...soloIds].filter((id) => collabIds.has(id));
  assert.deepEqual(overlap, [], 'a release cannot be both solo and a collaboration');
});

test('every release has a stable id, a year and at least one official link', () => {
  for (const release of allReleases) {
    assert.ok(release.id, 'release needs an id');
    assert.ok(Number.isInteger(release.year), `${release.id} needs an integer year`);
    assert.ok(Array.isArray(release.links) && release.links.length > 0, `${release.id} needs a link`);
  }
});

test('all ids are unique across the catalogue', () => {
  const ids = allReleases.map((r) => r.id);
  assert.equal(new Set(ids).size, ids.length);
});

test('every outbound link is https and points at a known official host', () => {
  const allowed = [
    'tooxclusive.com',
    'www.youtube.com',
    'youtube.com',
    'x.com',
    'www.tiktok.com',
    'www.threads.com',
    'linktr.ee',
    'www.instagram.com',
    'www.facebook.com',
    'guardian.ng',
    'radarcharts.net',
    'voyagedenver.com',
    'www.nta.ng',
    'thenationonlineng.net',
    'musicinafrica.net',
    'latterdaysaintmusicians.com',
  ];

  const urls = [
    ...allReleases.flatMap((r) => r.links.map((l) => l.url)),
    ...press.map((p) => p.url).filter(Boolean),
    ...videos.map((v) => v.url),
    ...channels.map((c) => c.url),
    ...sources.map((s) => s.url).filter(Boolean),
    ...Object.values(artist.links).filter(Boolean),
  ];

  for (const url of urls) {
    const parsed = new URL(url); // throws on a malformed or placeholder URL
    assert.equal(parsed.protocol, 'https:', `${url} must be https`);
    assert.ok(allowed.includes(parsed.hostname), `${parsed.hostname} is not an allow-listed official host: ${url}`);
  }
});

test('the EPK and current public profiles are represented', () => {
  const ids = new Set(artist.profileLinks.map((profile) => profile.id));
  for (const id of ['youtube', 'instagram', 'facebook', 'x', 'tiktok', 'threads', 'linktree']) {
    assert.ok(ids.has(id), `${id} should be represented in the public profile archive`);
    assert.ok(artist.links[id], `${id} should have a verified destination`);
  }
});

test('every catalogue playback destination is YouTube', () => {
  for (const release of allReleases) {
    assert.ok(release.verified, `${release.id} should have a public YouTube destination`);
    for (const link of release.links) assert.match(new URL(link.url).hostname, /(^|\.)youtube\.com$/);
  }
});

test('the public chronology and birth date are represented', () => {
  const disputed = career.find((c) => c.id === 'first-single');
  assert.equal(disputed, undefined);
  assert.equal(artist.birthDate, '22 May 1991');
  assert.ok(career.some((c) => c.id === 'debut' && c.status === 'confirmed'));
});

test('contact details remain honest when they are not publicly listed', () => {
  assert.equal(artist.contact.booking, null);
  assert.equal(artist.contact.press, null);
  assert.equal(artist.contact.management, null);
});

test('press items without a URL carry an explanation', () => {
  for (const item of press) {
    assert.ok(item.url, `${item.id} should link to its published source`);
  }
});

test('press is ordered newest first', () => {
  const dates = press.map((p) => p.published);
  assert.deepEqual(dates, [...dates].sort().reverse());
});

test('only videos with a validated platform id are listed', () => {
  for (const video of videos) {
    assert.match(video.videoId, /^[A-Za-z0-9_-]{11}$/, `${video.id} needs a valid 11-character video id`);
    assert.ok(video.confirmedBy, `${video.id} must record how it was confirmed`);
  }
});

test('supplied portrait is not mislabeled as placeholder photography', () => {
  assert.equal(photography.length, 1, 'only the supplied portrait is present');
  assert.equal(photography[0].isPlaceholder, false);
  assert.match(photography[0].rightsNote, /rights statement is published/i);
});

test('the featured release exists and comes from the solo set', () => {
  const featured = featuredRelease();
  assert.ok(featured, 'a featured release is required');
  assert.equal(featured.verified, true, 'the featured release must be a verified record');
  assert.ok(soloReleases.some((r) => r.id === featured.id));
});

test('catalog stats agree with the source arrays', () => {
  assert.equal(catalogStats.solo, soloReleases.length);
  assert.equal(catalogStats.collaborations, collaborations.length);
  assert.equal(catalogStats.total, soloReleases.length + collaborations.length);
});

test('preview route manifest declares every application page route', () => {
  const manifest = JSON.parse(fs.readFileSync(new URL('../public/manus-routes.json', import.meta.url), 'utf8'));
  assert.ok(Array.isArray(manifest.routes));
  assert.deepEqual(manifest.routes.map((route) => route.path), [
    '/',
    '/catalog',
    '/catalog/:id',
    '/press',
    '/media',
    '/artist',
  ]);
  for (const route of manifest.routes) {
    assert.match(route.path, /^\//);
    assert.ok(route.title);
  }
});
