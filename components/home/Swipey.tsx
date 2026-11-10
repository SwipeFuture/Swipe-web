// Swipey, the robot from the Swipe apps — same geometry as the apps' Robot.js (viewBox 200×280),
// drawn flat. `body` is the robot's colour, `accent` the app colour (antenna, chest dot, flame).
type Props = {
  body?: string;
  face?: string;
  accent: string;
  accentLight?: string;
  flame?: boolean;
  className?: string;
  title?: string;
};

export default function Swipey({ body = "#121212", face = "#ffffff", accent, accentLight, flame = true, className, title }: Props) {
  return (
    <svg viewBox="0 0 200 280" className={className} role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
      {flame && (
        <g>
          <path d="M 84 212 Q 100 224 116 212 Q 111 240 100 262 Q 89 240 84 212 Z" fill={accent} />
          <path d="M 92 214 Q 100 221 108 214 Q 105 232 100 246 Q 95 232 92 214 Z" fill={accentLight ?? "#ffffff"} opacity={accentLight ? 1 : 0.55} />
        </g>
      )}
      <line x1="100" y1="40" x2="100" y2="20" stroke={body} strokeWidth="4" strokeLinecap="round" />
      <circle cx="100" cy="16" r="8" fill={accent} />
      <rect x="42" y="148" width="16" height="38" rx="8" fill={body} />
      <rect x="142" y="148" width="16" height="38" rx="8" fill={body} />
      <rect x="68" y="138" width="64" height="72" rx="22" fill={body} />
      <circle cx="100" cy="168" r="9" fill={accent} />
      <rect x="45" y="40" width="110" height="90" rx="32" fill={body} />
      <ellipse cx="80" cy="80" rx="8" ry="8" fill={face} />
      <ellipse cx="120" cy="80" rx="8" ry="8" fill={face} />
      <path d="M 78 100 Q 100 122 122 100" stroke={face} strokeWidth="4" fill="none" strokeLinecap="round" />
    </svg>
  );
}
