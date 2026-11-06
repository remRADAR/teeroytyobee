import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { artist } from '../content/artist.js';
import { site } from '../content/site.js';

const pageMeta = {
  '/': {
    title: `${artist.displayName} — Official Artist Portfolio`,
    description: 'The official home of Teeroy Tyobee: Afro-fusion music, the IEMBER (JOY) project, official videos, press coverage and artist profiles.',
    type: 'website',
  },
  '/catalog': {
    title: `Music Catalogue — ${artist.displayName}`,
    description: `Explore the official catalogue of ${artist.displayName}, including IEMBER (JOY), singles and collaborations released through Royz Houz.`,
    type: 'website',
  },
  '/press': {
    title: `Press & Features — ${artist.displayName}`,
    description: `Verified interviews, features and public coverage of ${artist.displayName}, including IEMBER (JOY), Mama Africa and Wise Up.`,
    type: 'website',
  },
  '/media': {
    title: `Official Videos & Media — ${artist.displayName}`,
    description: `Watch official Teeroy Tyobee videos, Wan Tiv, GRIND, AUTOMATIC, Wise Up and more from the artist’s verified YouTube channel.`,
    type: 'website',
  },
  '/artist': {
    title: `Artist Profile — ${artist.displayName}`,
    description: `Read the artist profile for ${artist.displayName}, a Nigerian singer, songwriter and performer from the Tiv Nation of Benue State.`,
    type: 'profile',
  },
};

function setMeta(name, content, attribute = 'name') {
  let el = document.head.querySelector(`meta[${attribute}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attribute, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export function SEO() {
  const { pathname } = useLocation();

  useEffect(() => {
    const basePath = pathname.startsWith('/catalog/') ? '/catalog' : pathname;
    const meta = pageMeta[basePath] ?? {
      title: `Page not found — ${artist.displayName}`,
      description: `This page is not part of ${artist.displayName}’s official portfolio.`,
      type: 'website',
    };
    const canonical = `${site.url}${pathname === '/' ? '/' : pathname}`;
    document.title = meta.title;
    setMeta('description', meta.description);
    setMeta('robots', pageMeta[basePath] ? 'index, follow' : 'noindex, follow');
    setMeta('og:type', meta.type, 'property');
    setMeta('og:title', meta.title, 'property');
    setMeta('og:description', meta.description, 'property');
    setMeta('og:url', canonical, 'property');
    setMeta('og:site_name', artist.displayName, 'property');
    setMeta('og:image', `${site.url}/media/artist-hero.jpeg`, 'property');
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', meta.title);
    setMeta('twitter:description', meta.description);
    setMeta('twitter:image', `${site.url}/media/artist-hero.jpeg`);

    let link = document.head.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = canonical;
  }, [pathname]);

  return null;
}
