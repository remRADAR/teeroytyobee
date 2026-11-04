import { Link } from 'react-router-dom';
import { ExternalIcon, CheckIcon, AlertIcon } from './Icons.jsx';
import { ReleaseArtwork } from './ReleaseArtwork.jsx';

/** Marks a destination as external, with the target announced to assistive tech. */
export function ExtLink({ href, children, className = '', label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`ext ${className}`.trim()}
      aria-label={label ? `${label} (opens in a new tab)` : undefined}
    >
      {children}
      <ExternalIcon />
    </a>
  );
}

export function Verified({ verified, children }) {
  if (verified) {
    return (
      <span className="badge badge--gold">
        <CheckIcon /> {children ?? 'Verified'}
      </span>
    );
  }
  return (
    <span className="badge badge--warn">
      <AlertIcon /> {children ?? 'Unconfirmed'}
    </span>
  );
}

/**
 * A release row. Links are only rendered when an official destination exists —
 * no button ever points at a guessed URL.
 */
export function ReleaseRow({ release, showTracks = false }) {
  return (
    <li className="rel">
      <span className="rel__year">{release.year ?? '—'}</span>
      <Link className="rel__thumb" to={`/catalog/${release.id}`} aria-label={`View ${release.title} details`}>
        <ReleaseArtwork release={release} compact />
      </Link>

      <div className="rel__main">
        <p className="rel__title">
          <Link className="rel__detail" to={`/catalog/${release.id}`}>{release.title}</Link>
          <span className="badge">{release.kind}</span>
          {release.verified === false && (
            <Verified verified={false}>{release.note ? 'Needs review' : 'Unconfirmed'}</Verified>
          )}
        </p>
        {release.credit && <p className="rel__credit">{release.credit}</p>}
        {release.summary && <p className="rel__sub">{release.summary}</p>}
      </div>

      <div className="rel__links">
        {release.links?.length
          ? release.links.map((link) => (
              <ExtLink key={link.platform} href={link.url} label={`${release.title} on ${link.platform}`}>
                {link.platform}
              </ExtLink>
            ))
          : <span className="micro">No official link yet</span>}
      </div>

      {showTracks && release.tracks?.length > 0 && (
        <div className="rel__tracks" aria-label={`${release.title} track list`}>
          {release.tracks.map((track, i) => (
            <span key={track}>
              {String(i + 1).padStart(2, '0')} {track}
            </span>
          ))}
        </div>
      )}
    </li>
  );
}
