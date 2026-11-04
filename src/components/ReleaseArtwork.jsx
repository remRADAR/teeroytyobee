export function ReleaseArtwork({ release, compact = false }) {
  const title = release?.title ?? 'Release';
  const kind = release?.kind ?? 'Music';
  const art = release?.artwork ?? 'iember';

  return (
    <div
      className={`release-visual${compact ? ' release-visual--compact' : ''}`}
      data-artwork={art}
      role="img"
      aria-label={`Typographic art-direction preview for ${title}. Official release artwork has not been supplied.`}
    >
      <span className="release-visual__top">Teeroy Tyobee <i>·</i> {kind}</span>
      <span className="release-visual__title">{title}</span>
      <span className="release-visual__bottom">Art direction preview <i>·</i> not official cover art</span>
      <span className="release-visual__orbit" aria-hidden="true" />
      <span className="release-visual__grain" aria-hidden="true" />
    </div>
  );
}
