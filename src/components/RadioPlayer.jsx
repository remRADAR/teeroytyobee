import { createContext, useContext, useMemo, useState } from 'react';
import { videos } from '../content/media.js';
import { artist } from '../content/artist.js';
import { ReleaseArtwork } from './ReleaseArtwork.jsx';

const RadioContext = createContext(null);

export function RadioProvider({ children }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const queue = useMemo(() => videos.filter((video) => video.videoId && video.confirmedBy), []);
  const active = activeIndex === null ? null : queue[activeIndex] ?? null;

  const play = (video = queue[0]) => {
    const index = queue.findIndex((item) => item.id === video?.id);
    if (index >= 0) setActiveIndex(index);
  };
  const stop = () => setActiveIndex(null);
  const step = (direction) => {
    if (queue.length < 2 || activeIndex === null) return;
    setActiveIndex((activeIndex + direction + queue.length) % queue.length);
  };

  const value = { queue, active, activeIndex, play, stop, step };
  return (
    <RadioContext.Provider value={value}>
      {children}
      <RadioDock {...value} />
    </RadioContext.Provider>
  );
}

export function useRadio() {
  const value = useContext(RadioContext);
  if (!value) throw new Error('useRadio must be used inside RadioProvider');
  return value;
}

function RadioDock({ queue, active, activeIndex, stop, step }) {
  if (!active) return null;
  const position = activeIndex + 1;
  const frameUrl = `https://www.youtube-nocookie.com/embed/${active.videoId}?autoplay=1&controls=1&rel=0&modestbranding=1`;

  return (
    <aside className="radio-dock" aria-label="Teeroy Tyobee listening player">
      <div className="radio-dock__info">
        <div className="radio-dock__heading">
          <div className="radio-dock__cover">
            <ReleaseArtwork release={{ title: active.title, kind: 'Official video', artwork: 'wise-up' }} compact />
          </div>
          <div>
            <p className="eyebrow eyebrow--plain">Verified listening · {String(position).padStart(2, '0')} / {String(queue.length).padStart(2, '0')}</p>
            <h2>{active.title}</h2>
            <p>{active.subtitle} · Official YouTube source</p>
          </div>
        </div>
        {queue.length < 2 && <small>Only one confirmed playable source is available. More catalogue audio awaits verified stream URLs.</small>}
        <div className="radio-dock__actions" aria-label="Playlist controls">
          <button type="button" onClick={() => step(-1)} disabled={queue.length < 2} aria-label="Previous track">Previous</button>
          <button type="button" onClick={() => step(1)} disabled={queue.length < 2} aria-label="Next track">Next</button>
          <a href={active.url} target="_blank" rel="noopener noreferrer">Open source</a>
          <button type="button" onClick={stop} aria-label="Stop and close player">Close</button>
        </div>
      </div>
      <div className="radio-dock__frame">
        <iframe
          key={active.id}
          src={frameUrl}
          title={`${artist.displayName} — ${active.title} official video player`}
          allow="autoplay; encrypted-media; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </aside>
  );
}
