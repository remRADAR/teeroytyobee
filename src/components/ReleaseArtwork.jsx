export function ReleaseArtwork({ release, compact = false }) {
  const title = release?.title ?? 'Release';
  const kind = release?.kind ?? 'Music';
  const art = release?.artwork ?? 'iember';
  const coverSrc = `/media/covers/${art}.jpg`;

  return (
    <div
      className={`release-visual${compact ? ' release-visual--compact' : ''}`}
      data-artwork={art}
      role="img"
      aria-label={`Official cover artwork for ${title}`}
    >
      <img className="release-visual__cover" src={coverSrc} alt="" width="1000" height="1000" loading={compact ? 'lazy' : undefined} />
      <span className="release-visual__meta">{kind} <i>·</i> {title}</span>
    </div>
  );
}
