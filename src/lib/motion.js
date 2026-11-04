import { useEffect, useRef, useState } from 'react';
import { onScroll } from './scrollBus.js';

/** Tracks `prefers-reduced-motion`, with a live listener. */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (event) => setReduced(event.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return reduced;
}

/**
 * Reveals `[data-reveal]` descendants once they enter the viewport.
 *
 * Deliberately geometry-based rather than IntersectionObserver-based. An
 * observer coalesces its callbacks, so during a fast scroll (or a programmatic
 * jump) an element can cross the viewport between two ticks and never be
 * reported as intersecting — leaving it stranded at `opacity: 0` forever. That
 * is an accessibility failure, not a cosmetic one: the content is in the DOM
 * but invisible to the reader.
 *
 * Under `prefers-reduced-motion` everything is revealed immediately and no
 * listener is attached.
 */
export function useReveal({ selector = '[data-reveal]', root = null, threshold = 0.12 } = {}) {
  const reduced = useReducedMotion();

  useEffect(() => {
    const scope = root?.current ?? document;
    const nodes = [...scope.querySelectorAll(selector)];
    if (!nodes.length) return undefined;

    const revealAll = () => nodes.forEach((n) => n.classList.add('is-visible'));

    if (reduced) {
      revealAll();
      return undefined;
    }

    let frame = 0;

    const settle = () => {
      frame = 0;
      const vh = window.innerHeight || document.documentElement.clientHeight;
      for (const node of nodes) {
        if (node.classList.contains('is-visible')) continue;
        const rect = node.getBoundingClientRect();
        const height = rect.height || 1;
        const onScreen = Math.min(rect.bottom, vh) - Math.max(rect.top, 0);
        const ratio = onScreen / height;
        // Reveal when enough of it is on screen, when it has already been
        // scrolled past, or when its top edge is just entering the fold.
        if (ratio >= threshold || rect.bottom <= 0 || rect.top < vh * 0.92) {
          node.classList.add('is-visible');
        }
      }
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(settle);
    };

    settle();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);

    // Safety net: re-measure after layout settles (fonts, images, late data).
    const timers = [window.setTimeout(settle, 400), window.setTimeout(settle, 1500)];

    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      timers.forEach((t) => window.clearTimeout(t));
      if (frame) cancelAnimationFrame(frame);
    };
  }, [selector, root, threshold, reduced]);

  return reduced;
}

/**
 * Parallax. Writes `--p` (a signed -1..1 progress across the element's travel
 * through the viewport) onto the element, plus a ready-made `--parallax-y` in
 * pixels. CSS decides what to do with it, so the same hook drives image drift,
 * caption counter-drift and scrim shifts.
 *
 * `speed` is the fraction of the element's height it travels. 0 disables.
 */
export function useParallax({ speed = 0.12, max = 120 } = {}) {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced || !speed) return undefined;

    return onScroll(({ vh }) => {
      const rect = el.getBoundingClientRect();
      // Skip work for elements far outside the viewport.
      if (rect.bottom < -vh * 0.5 || rect.top > vh * 1.5) return;
      const centre = rect.top + rect.height / 2;
      const p = (centre - vh / 2) / (vh / 2 + rect.height / 2);
      const clamped = Math.max(-1, Math.min(1, p));
      const shift = Math.max(-max, Math.min(max, clamped * rect.height * speed));
      el.style.setProperty('--p', clamped.toFixed(4));
      el.style.setProperty('--parallax-y', `${shift.toFixed(2)}px`);
    });
  }, [speed, max, reduced]);

  return ref;
}

/**
 * Pinned-section progress. For a tall section whose inner panel is
 * `position: sticky`, this reports 0 → 1 as the section scrolls past the pin,
 * which is what drives the "headline stays, image slides under it" effect.
 */
export function usePinProgress() {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    if (reduced) {
      el.style.setProperty('--pin', '1');
      return undefined;
    }

    return onScroll(({ vh }) => {
      const rect = el.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > vh) return;
      const travel = Math.max(1, rect.height - vh);
      const p = Math.min(1, Math.max(0, -rect.top / travel));
      el.style.setProperty('--pin', p.toFixed(4));
    });
  }, [reduced]);

  return ref;
}

/** Locks body scroll while an overlay (menu, lightbox) is open. */
export function useScrollLock(locked) {
  useEffect(() => {
    if (!locked) return undefined;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [locked]);
}

/**
 * Page-transition state. Returns a `phase` that flips `out` → `in` on every
 * route change so CSS can run a curtain wipe. Under reduced motion it stays
 * `in`, so content is never hidden from a reader who has motion off.
 */
export function usePageTransition(pathname) {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState('in');

  useEffect(() => {
    if (reduced) {
      setPhase('in');
      return undefined;
    }
    setPhase('out');
    const t = window.setTimeout(() => setPhase('in'), 30);
    return () => window.clearTimeout(t);
  }, [pathname, reduced]);

  return { phase, reduced };
}
