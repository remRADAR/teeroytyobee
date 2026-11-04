import { onScroll } from './scrollBus.js';

/**
 * Every scroll-driven effect on the site subscribes to this one bus.
 *
 * Re-exported from one place so the navigation chrome and the reveal helpers
 * share the same frame as the parallax layers. Keeping the import surface in a
 * single module is what stops a second `scroll` listener from creeping in each
 * time a new effect is added.
 */
export { onScroll, refreshScroll, readScroll } from './scrollBus.js';

export const SCROLL_DEFAULTS = Object.freeze({
  /** Fraction of an element's height travelled as parallax offset. */
  parallaxSpeed: 0.12,
  /** Hard clamp, in px, so a tall element can never drift past its frame. */
  parallaxMax: 120,
});

/** Returns true when the reader has asked for reduced motion. */
export function prefersReducedMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
