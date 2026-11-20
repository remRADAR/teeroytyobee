/** Inline SVG icons — avoids an icon-font dependency and keeps the bundle small. */

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
};

export function ExternalIcon(props) {
  return (
    <svg {...base} width="12" height="12" {...props}>
      <path d="M14 4h6v6" />
      <path d="M20 4 10 14" />
      <path d="M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4" />
    </svg>
  );
}

export function ProfileIcon({ kind, ...props }) {
  const common = { ...base, width: 20, height: 20, ...props };

  if (kind === 'youtube') return <svg {...common}><rect x="3" y="6" width="18" height="12" rx="4" /><path fill="currentColor" stroke="none" d="m10 9 6 3-6 3z" /></svg>;
  if (kind === 'instagram') return <svg {...common}><rect x="4" y="4" width="16" height="16" rx="5" /><circle cx="12" cy="12" r="3.5" /><circle cx="17.2" cy="6.8" r=".8" fill="currentColor" stroke="none" /></svg>;
  if (kind === 'threads') return <svg {...common}><path d="M17.8 10.5c-.3-3-2.3-4.7-5.5-4.7-3.5 0-5.8 2.3-5.8 6.2 0 4.2 2.4 6.2 5.9 6.2 3.3 0 5.3-1.8 5.3-4.4 0-2.1-1.5-3.5-4.2-3.5-2.4 0-3.8 1-3.8 2.5 0 1.2 1 2 2.4 2 2.4 0 4.3-1.6 4.3-4.2 0-3.5-2.1-5.3-5.2-5.3" /></svg>;
  if (kind === 'facebook') return <svg {...common}><path fill="currentColor" stroke="none" d="M13.8 20v-7h2.4l.4-2.7h-2.8V8.6c0-.8.2-1.4 1.4-1.4h1.5V4.8c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v1.8H8.4V13h2.4v7z" /></svg>;
  if (kind === 'x') return <svg {...common}><path d="M5 4h3.8l3.4 4.7L16.3 4H19l-5.5 6.1L19.5 20h-3.8l-3.9-5.4L7.7 20H5l5.7-6.4z" fill="currentColor" stroke="none" /></svg>;
  if (kind === 'tiktok') return <svg {...common}><path d="M14 4v10.2a3.8 3.8 0 1 1-2.8-3.7v3a1.2 1.2 0 1 0 1.3 1.2V4h2.8c.2 1.6 1.1 2.8 2.7 3.3v2.8c-1.6-.2-3-1-4-2.1" /></svg>;
  return <svg {...common}><path d="M6 12a3.5 3.5 0 0 1 5.9-2.5l1.1 1M18 12a3.5 3.5 0 0 1-5.9 2.5l-1.1-1M9 15l6-6" /></svg>;
}

export function ArrowIcon(props) {
  return (
    <svg {...base} width="16" height="16" {...props}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export function ChevronIcon(props) {
  return (
    <svg {...base} width="14" height="14" {...props}>
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

export function PlayIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false" width="18" height="18" {...props}>
      <path d="M8 5.2v13.6L19 12z" />
    </svg>
  );
}

export function DownloadIcon(props) {
  return (
    <svg {...base} width="15" height="15" {...props}>
      <path d="M12 3v12" />
      <path d="m7 11 5 5 5-5" />
      <path d="M4 20h16" />
    </svg>
  );
}

export function CheckIcon(props) {
  return (
    <svg {...base} width="10" height="10" {...props}>
      <path d="m4 12 5 5L20 6" />
    </svg>
  );
}

export function AlertIcon(props) {
  return (
    <svg {...base} width="10" height="10" {...props}>
      <path d="M12 8v5" />
      <path d="M12 16.5v.5" />
      <circle cx="12" cy="12" r="9" />
    </svg>
  );
}

export function DiscIcon(props) {
  return (
    <svg {...base} width="14" height="14" {...props}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  );
}

/** Small platform marks for the homepage listen rail. */
export function PlatformIcon({ kind, ...props }) {
  const common = { viewBox: '0 0 32 32', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true, focusable: false, ...props };

  if (kind === 'spotify') {
    return <svg {...common}><circle cx="16" cy="16" r="12" fill="currentColor" stroke="none" /><path d="M9 12.5c4.9-1.1 9.7-.7 14 1" stroke="var(--ink, #090909)" strokeWidth="2" /><path d="M10 16c4.1-.8 8.2-.4 11.8 1" stroke="var(--ink, #090909)" strokeWidth="2" /><path d="M11.5 19.2c3-.5 6-.1 8.8 1" stroke="var(--ink, #090909)" strokeWidth="2" /></svg>;
  }
  if (kind === 'youtube') {
    return <svg {...common}><rect x="3" y="7" width="26" height="18" rx="6" /><path fill="currentColor" stroke="none" d="m13 11 9 5-9 5z" /></svg>;
  }
  if (kind === 'audiomack') {
    return <svg {...common}><path d="M4 18c3.2 0 3.2-8 6.4-8s3.2 12 6.4 12 3.2-16 6.4-16 3.2 12 4.8 12" /><path d="M4 23h24" opacity=".35" /></svg>;
  }
  if (kind === 'amazon') {
    return <svg {...common}><path d="M9 19.5c2.8 1.6 7.7 2.4 12.5-.2" /><path d="m19 17.2 3.2 2.1-3.5 1" /><path d="M12 10.5c0-2.1 1.4-3.5 3.7-3.5 2.7 0 3.9 1.4 3.9 3.7v5.1" /><path d="M12 11.8c-2.5 0-4.2 1.3-4.2 3.4 0 1.6 1 2.6 2.6 2.6 1.2 0 2.3-.6 3.2-1.5" /></svg>;
  }
  if (kind === 'apple') {
    return <svg {...common}><path fill="currentColor" stroke="none" d="M20.6 16.8c0-2.6 2.1-3.9 2.2-4-1.2-1.8-3.2-2-3.8-2-1.6-.2-3.1 1-3.9 1-.8 0-2-1-3.3-1-1.7 0-3.3 1-4.2 2.5-1.8 3-.5 7.4 1.3 9.8.9 1.2 1.9 2.5 3.3 2.4 1.3-.1 1.8-.8 3.4-.8s2 .8 3.4.8c1.4 0 2.3-1.2 3.2-2.4 1-1.4 1.4-2.8 1.5-2.9-.1 0-3.1-1.2-3.1-4.4Z" /><path fill="currentColor" stroke="none" d="M18 9c.7-.9 1.2-2.1 1.1-3.3-1.1 0-2.4.7-3.1 1.5-.7.8-1.2 2-1.1 3.1 1.2.1 2.4-.5 3.1-1.3Z" /></svg>;
  }
  return <svg {...common}><path d="M18.8 7.2c-1.2-1.2-3.1-1.7-4.8-.8-1.7-.9-3.6-.4-4.8.8-1.4 1.5-1.2 3.9.4 5.1 1.2 1 1.5 2.1 1.5 4.1 0 2.8 1.2 5 2.9 5 1.4 0 1.4-1.1 2.7-1.1s1.3 1.1 2.7 1.1c1.7 0 2.9-2.2 2.9-5 0-2-.3-3.1-1.5-4.1 1.6-1.2 1.8-3.6.4-5.1Z" /><path d="M16 5.5c.2-1.4 1.1-2.4 2.4-3" /></svg>;
}
