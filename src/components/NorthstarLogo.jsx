const STAR =
  "M 32 2 Q 34.5 30 56 32 Q 34.5 34 32 55 Q 29.5 34 8 32 Q 29.5 30 32 2 Z";

export default function NorthstarLogo({ title = "Northstar" }) {
  return (
    <span className="northstar-logo">
      <svg
        className="northstar-svg"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label={title}
      >
        <defs>
          <linearGradient id="nsGold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFEB8A" />
            <stop offset="50%" stopColor="#FFD700" />
            <stop offset="100%" stopColor="#E5A93B" />
          </linearGradient>
          <radialGradient id="nsGlowGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255, 215, 0, 0.4)" />
            <stop offset="100%" stopColor="rgba(255, 215, 0, 0)" />
          </radialGradient>
        </defs>

        {/* Pulsing ambient glow */}
        <circle
          className="ns-glow"
          cx="32"
          cy="32"
          r="27"
          fill="url(#nsGlowGrad)"
        />

        {/* Rotating compass rose + star */}
        <g className="ns-spin">
          <path d={STAR} fill="url(#nsGold)" />
          <g transform="rotate(45 32 32)">
            <g transform="translate(32 32) scale(0.6) translate(-32 -32)">
              <path d={STAR} fill="url(#nsGold)" opacity="0.85" />
            </g>
          </g>
          <circle cx="32" cy="32" r="2.4" fill="#FFF6D0" />
        </g>
      </svg>
    </span>
  );
}
