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
