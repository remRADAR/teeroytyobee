/**
 * Full-bleed drifting type band, adapted from the GoJett theme's marquee.
 *
 * The band is purely decorative, so it is hidden from assistive technology and
 * its content is duplicated once to make the loop seamless. The duplicate is
 * aria-hidden too, so a screen reader never hears the phrase twice.
 *
 * Motion is CSS-driven (see `.marquee` in marquee.css) so the reduced-motion
 * media query can freeze it without any JavaScript involvement.
 */
export function Marquee({ items = [], outline = false }) {
  if (!items.length) return null;

  const group = (key) => (
    <div className="marquee__group" key={key} aria-hidden={key === 'b' ? 'true' : undefined}>
      {items.map((item, i) => (
        <span
          key={`${key}-${i}`}
          className={`marquee__item${outline && i % 2 === 1 ? ' marquee__item--outline' : ''}`}
        >
          {item}
        </span>
      ))}
    </div>
  );

  return (
    <div className="marquee" role="presentation">
      <div className="marquee__track">
        {group('a')}
        {group('b')}
      </div>
    </div>
  );
}

export default Marquee;
