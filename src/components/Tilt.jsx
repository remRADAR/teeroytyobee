import { useCallback, useRef } from 'react';
import { useReducedMotion } from '../lib/motion.js';

/**
 * Pointer-driven 3D tilt with a light glare that follows the cursor.
 *
 * Discipline (matching the motion layer's rules):
 * - Fine pointers only, and never under reduced motion — the component does
 *   nothing on touch, and CSS resolves the resting state under
 *   prefers-reduced-motion as well.
 * - Purely decorative: children render complete without it, and the glare is
 *   aria-hidden with pointer-events none.
 * - Writes only custom properties; the element never re-renders on pointermove.
 */
export function Tilt({ className = '', max = 6, children, ...rest }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  const onPointerMove = useCallback(
    (e) => {
      const el = ref.current;
      if (reduced || !el || e.pointerType === 'touch') return;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      el.classList.add('is-tilting');
      el.style.setProperty('--tilt-x', `${((0.5 - py) * max).toFixed(2)}deg`);
      el.style.setProperty('--tilt-y', `${((px - 0.5) * max).toFixed(2)}deg`);
      el.style.setProperty('--gx', `${(px * 100).toFixed(1)}%`);
      el.style.setProperty('--gy', `${(py * 100).toFixed(1)}%`);
    },
    [reduced, max],
  );

  const onPointerLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.remove('is-tilting');
    el.style.removeProperty('--tilt-x');
    el.style.removeProperty('--tilt-y');
  }, []);

  return (
    <div
      ref={ref}
      className={`tilt ${className}`.trim()}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      {...rest}
    >
      {children}
      <span className="tilt__glare" aria-hidden="true" />
    </div>
  );
}
