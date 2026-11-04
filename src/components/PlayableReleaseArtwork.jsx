import { Link } from 'react-router-dom';
import { PlayIcon } from './Icons.jsx';
import { ReleaseArtwork } from './ReleaseArtwork.jsx';
import { useRadio } from './RadioPlayer.jsx';

export function PlayableReleaseArtwork({ release, video, compact = false, className = '' }) {
  const { play, active } = useRadio();
  const isActive = active?.id === video?.id;
  const artwork = <ReleaseArtwork release={release} compact={compact} />;

  if (!video?.videoId) {
    return (
      <Link
        className={`playable-art playable-art--pending ${className}`.trim()}
        to={`/catalog/${release.id}`}
        aria-label={`View ${release.title} release details and official destinations`}
      >
        {artwork}
        <span className="playable-art__status">Official cover / playback pending</span>
      </Link>
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
