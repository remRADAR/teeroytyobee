/**
 * A single shared scroll bus.
 *
 * Every scroll-driven effect on the site (parallax, pinned progress, the
 * scroll-linked marquee, the progress rail) subscribes here instead of adding
 * its own listener. One passive listener + one rAF loop means the cost of the
 * whole motion layer is a single layout read per frame, no matter how many
 * elements are animating — which is what keeps this performant on a phone.
 *
 * Subscribers receive `{ y, vh, velocity, progress }` and are expected to write
 * CSS custom properties or transforms only. Nothing here reads layout on behalf
 * of a subscriber; each one measures its own element inside the same frame.
 */

const subscribers = new Set();

let frame = 0;
let lastY = 0;
let velocity = 0;
let attached = false;

function tick() {
  frame = 0;
  const y = window.scrollY || window.pageYOffset || 0;
  const vh = window.innerHeight || document.documentElement.clientHeight;

  // Smoothed velocity: raw deltas are spiky, and the marquee skew reads better
  // with a little inertia. Decays toward zero when scrolling stops.
  const delta = y - lastY;
  velocity = velocity * 0.82 + delta * 0.18;
  lastY = y;

  const max = Math.max(1, document.documentElement.scrollHeight - vh);
  const state = { y, vh, velocity, progress: Math.min(1, Math.max(0, y / max)) };

  for (const fn of subscribers) {
    try {
      fn(state);
    } catch {
      // A single broken subscriber must never take down the whole frame.
    }
  }
}

function schedule() {
  if (!frame) frame = requestAnimationFrame(tick);
}

function attach() {
  if (attached) return;
  attached = true;
  lastY = window.scrollY || 0;
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
  window.addEventListener('orientationchange', schedule, { passive: true });
  schedule();
}

function detach() {
  if (!attached) return;
  attached = false;
  window.removeEventListener('scroll', schedule);
  window.removeEventListener('resize', schedule);
  window.removeEventListener('orientationchange', schedule);
  if (frame) cancelAnimationFrame(frame);
  frame = 0;
}

/** Subscribe to the shared scroll loop. Returns an unsubscribe function. */
export function onScroll(fn) {
  subscribers.add(fn);
  attach();
  // Give the new subscriber an immediate frame so it paints in its correct
  // position rather than jumping on the first scroll.
  schedule();
  return () => {
    subscribers.delete(fn);
    if (!subscribers.size) detach();
  };
}

/** Force a measurement pass (e.g. after images load or a route changes). */
export function refreshScroll() {
  if (subscribers.size) schedule();
}

/** Current scroll state, for one-off reads. */
export function readScroll() {
  const y = window.scrollY || 0;
  const vh = window.innerHeight || document.documentElement.clientHeight;
  const max = Math.max(1, document.documentElement.scrollHeight - vh);
  return { y, vh, velocity: 0, progress: Math.min(1, Math.max(0, y / max)) };
}
