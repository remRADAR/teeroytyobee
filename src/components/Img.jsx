import { useEffect, useRef } from 'react';

/**
 * Responsive image. Renders a <picture>-free <img> with srcSet/sizes, explicit
 * intrinsic dimensions (prevents layout shift) and a decoding hint.
 *
 * `priority` → eager + high fetch priority for above-the-fold art only.
 */
export function Img({
  src,
  srcSet,
  sizes = '100vw',
  alt = '',
  width,
  height,
  priority = false,
  className = '',
  style,
}) {
  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : 'auto'}
      className={className}
      style={style}
      draggable="false"
    />
  );
}

/**
 * Reveals [data-reveal] descendants once they enter the viewport.
 *
 * Deliberately a deterministic rAF-throttled geometry check rather than an
 * IntersectionObserver: fast programmatic scrolling and instant `#hash` jumps can
 * beat the observer's async delivery and leave content permanently at opacity 0
 * (which is an accessibility failure, not just a cosmetic one). A geometry check
 * on every frame that follows a scroll is cheap here and cannot miss a node.
 *
 * Under `prefers-reduced-motion` everything is revealed immediately and no
 * listener is attached.
 */
export function useRevealOnMount(deps = []) {
  const ref = useRef(null);

  useEffect(() => {
    const scope = ref.current;
    if (!scope) return undefined;
    const nodes = [...scope.querySelectorAll('[data-reveal]')];
    if (!nodes.length) return undefined;

    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      nodes.forEach((n) => n.classList.add('is-visible'));
      return undefined;
    }

    let frame = 0;

    const check = () => {
      frame = 0;
      const limit = window.innerHeight * 1.05;
      let remaining = false;
      for (const node of nodes) {
        if (node.classList.contains('is-visible')) continue;
        const { top, bottom } = node.getBoundingClientRect();
        if (top < limit && bottom > -40) {
          node.classList.add('is-visible');
        } else {
          remaining = true;
        }
      }
      if (!remaining) detach();
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };

    const detach = () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (frame) cancelAnimationFrame(frame);
    };

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    check();

    return () => detach();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}
