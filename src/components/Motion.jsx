import { useEffect, useRef, useState } from 'react';
import { onScroll } from '../lib/scrollBus.js';
import { useParallax, useReducedMotion } from '../lib/motion.js';

/**
 * Scroll-linked marquee.
 *
 * The reference theme drives its marquee directly from scroll position rather
 * than from a CSS animation, which is why it feels physically attached to the
 * page. We keep that behaviour and add a slow autonomous drift on top, so the
 * band is still alive when the reader pauses. The track is repeated so the wrap
 * is seamless, and the offset is taken modulo one repeat width.
 *
 * Accessibility: the first copy carries the real text; every duplicate is
 * `aria-hidden`, so a screen reader hears the phrase once. Under reduced motion
 * the drift stops and the offset is pinned to zero.
 */
export function Marquee({
  items,
  speed = 0.55,
  drift = 46,
  repeats = 4,
  className = '',
  separator = '·',
  reverse = false,
}) {
  const trackRef = useRef(null);
  const reduced = useReducedMotion();
  const [unit, setUnit] = useState(0);

  // Measure one repeat so the wrap point is exact at any viewport width.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;
    const measure = () => {
      const first = track.firstElementChild;
      if (first) setUnit(first.getBoundingClientRect().width);
    };
    measure();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    ro?.observe(track);
    window.addEventListener('resize', measure);
    return () => {
      ro?.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [items, repeats]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || reduced || !unit) return undefined;
    return onScroll(({ y }) => {
      const raw = (y * speed) % unit;
      // Keep the offset inside (-unit, 0] so the repeated track always covers.
      const x = raw <= 0 ? raw : raw - unit;
      track.style.setProperty('--marquee-x', `${(reverse ? -x : x).toFixed(2)}px`);
    });
  }, [speed, unit, reduced, reverse]);

  const copies = Array.from({ length: repeats });

  return (
    <div className={`marquee ${className}`.trim()} data-reduced={reduced ? 'true' : 'false'}>
      <div className="marquee__track" ref={trackRef} style={{ '--marquee-drift': `${drift}s` }}>
        {copies.map((_, i) => (
          <span className="marquee__unit" key={i} aria-hidden={i > 0 ? 'true' : undefined}>
            {items.map((item, j) => (
              <span className="marquee__item" key={`${item}-${j}`}>
                {item}
                <i className="marquee__sep" aria-hidden="true">{separator}</i>
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}

/**
 * Pointer follower. Fine pointers only, and disabled entirely under reduced
 * motion — a lerped dot chasing the cursor is exactly the kind of continuous
 * movement that setting exists to suppress. The native cursor stays visible, so
 * the affordance is never lost; this is additive.
 */
export function Cursor() {
  const dotRef = useRef(null);
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const sync = () => setEnabled(fine.matches && !reduced);
    sync();
    fine.addEventListener('change', sync);
    return () => fine.removeEventListener('change', sync);
  }, [reduced]);

  useEffect(() => {
    if (!enabled) return undefined;
    const dot = dotRef.current;
    if (!dot) return undefined;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let x = targetX;
    let y = targetY;
    let raf = 0;

    const onMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      dot.classList.add('is-on');
      const hot = e.target instanceof Element && e.target.closest('a, button, [data-cursor]');
      dot.classList.toggle('is-hot', Boolean(hot));
    };
    const onLeave = () => dot.classList.remove('is-on');

    const loop = () => {
      x += (targetX - x) * 0.2;
      y += (targetY - y) * 0.2;
      dot.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;
  return <div ref={dotRef} className="cursor" aria-hidden="true" />;
}

/** Thin scroll-progress rail. A progress indicator, so it runs under reduced motion too. */
export function ScrollRail() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    return onScroll(({ progress }) => {
      el.style.setProperty('--rail', progress.toFixed(4));
    });
  }, []);

  return <div ref={ref} className="rail" aria-hidden="true" />;
}

/** Route-change curtain. Never rendered as `out` under reduced motion. */
export function PageCurtain({ phase }) {
  return <div className={`curtain${phase === 'out' ? ' is-out' : ''}`} aria-hidden="true" />;
}

/** Wraps children in a parallax-driven element. CSS reads `--parallax-y`. */
export function Parallax({ speed = 0.12, max = 120, className = '', children, as: Tag = 'div' }) {
  const ref = useParallax({ speed, max });
  return (
    <Tag ref={ref} className={`parallax ${className}`.trim()}>
      {children}
    </Tag>
  );
}

/**
 * Line-by-line masked reveal for display type. Each line sits in an
 * overflow-hidden mask and rises into place, staggered by index — the same
 * "type rises into position" move the reference theme uses on its headline.
 * The text is always in the DOM, so it is readable before the animation runs.
 */
export function RevealLines({ lines, className = '', as: Tag = 'span', stagger = 90 }) {
  return (
    <Tag className={`reveal-lines ${className}`.trim()}>
      {lines.map((line, i) => (
        <span className="reveal-lines__mask" key={i}>
          <span className="reveal-lines__line" style={{ '--line-delay': `${i * stagger}ms` }}>
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}
