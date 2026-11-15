import { PlayIcon } from './Icons.jsx';
import { ReleaseArtwork } from './ReleaseArtwork.jsx';
import { useRadio } from './RadioPlayer.jsx';

export function PlayableReleaseArtwork({ release, video, compact = false, className = '' }) {
  const { play, active } = useRadio();
  const isActive = active?.id === video?.id;
  const artwork = <ReleaseArtwork release={release} compact={compact} />;

  if (!video?.videoId) {
    return (
      <a
        className={`playable-art playable-art--pending ${className}`.trim()}
        href={release.links?.[0]?.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${release.title} on YouTube in a new tab`}
      >
        {artwork}
        <span className="playable-art__status">Open on YouTube</span>
      </a>
    );
  }

  return (
    <button
      type="button"
      className={`playable-art ${isActive ? 'is-playing' : ''} ${className}`.trim()}
      onClick={() => play(video)}
      aria-label={`${isActive ? 'Now playing' : 'Play'} ${release.title} from the verified YouTube source`}
    >
      {artwork}
      <span className="playable-art__play"><PlayIcon /></span>
      <span className="playable-art__status">{isActive ? 'Playing below' : 'Play official source'}</span>
    </button>
  );
}
