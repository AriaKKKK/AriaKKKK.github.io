/**
 * Placeholder illustration-style avatar, drawn as inline SVG so it is
 * trivially replaceable later — swap this file (or drop in an <img>).
 * Palette matches the watercolor cover: paper-deep, ink, coral, sunflower.
 */
export default function AvatarPortrait({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 380" className={className} role="img" aria-label="Abstract illustrated portrait of Aria">
      <defs>
        <filter id="av-soft" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
        <filter id="av-haze" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="2.4" />
        </filter>
      </defs>
      <rect width="320" height="380" fill="#e6f0ee" />
      {/* watercolor washes, sea top-left / sand bottom-right */}
      <ellipse cx="52" cy="46" rx="58" ry="42" fill="#a9ccc7" opacity="0.55" filter="url(#av-soft)" />
      <ellipse cx="278" cy="346" rx="70" ry="44" fill="#f1e8a9" opacity="0.7" filter="url(#av-soft)" />
      {/* coral sun with a sunflower-yellow halo */}
      <circle cx="252" cy="66" r="52" fill="#e8a83c" opacity="0.28" filter="url(#av-soft)" />
      <circle cx="252" cy="66" r="42" fill="#cf6a4e" opacity="0.9" filter="url(#av-soft)" />
      {/* shoulders */}
      <path d="M58 380 C58 298 108 260 160 260 C212 260 262 298 262 380 Z" fill="#2f4858" />
      {/* collar */}
      <path d="M133 266 L160 302 L187 266 L160 276 Z" fill="#cf6a4e" />
      {/* neck */}
      <rect x="146" y="228" width="28" height="42" fill="#f2e3c8" stroke="#2f4858" strokeWidth="2" />
      {/* head */}
      <circle cx="160" cy="168" r="72" fill="#f2e3c8" stroke="#2f4858" strokeWidth="2.5" />
      {/* hair */}
      <path
        d="M88 166 C84 94 120 60 160 60 C200 60 236 94 232 166 C226 118 206 94 196 106 C200 86 178 74 168 90 C162 72 132 76 130 98 C112 90 96 120 88 166 Z"
        fill="#2f4858"
      />
      {/* glasses */}
      <circle cx="136" cy="174" r="16" fill="none" stroke="#2f4858" strokeWidth="2.5" />
      <circle cx="184" cy="174" r="16" fill="none" stroke="#2f4858" strokeWidth="2.5" />
      <path d="M152 174 L168 174" stroke="#2f4858" strokeWidth="2.5" />
      {/* eyes */}
      <circle cx="136" cy="175" r="4" fill="#2f4858" />
      <circle cx="184" cy="175" r="4" fill="#2f4858" />
      {/* blush */}
      <circle cx="118" cy="198" r="7" fill="#cf6a4e" opacity="0.35" />
      <circle cx="202" cy="198" r="7" fill="#cf6a4e" opacity="0.35" />
      {/* smile */}
      <path d="M148 205 Q160 213 172 205" fill="none" stroke="#2f4858" strokeWidth="2.5" strokeLinecap="round" />
      {/* tiny sunflower, echoing the cover */}
      <g transform="translate(42 322)" filter="url(#av-haze)" opacity="0.8">
        <line x1="0" y1="10" x2="0" y2="30" stroke="#7d9257" strokeWidth="2.4" strokeLinecap="round" />
        {Array.from({ length: 8 }).map((_, i) => (
          <ellipse
            key={i}
            cx={Math.cos((i * Math.PI) / 4) * 9}
            cy={Math.sin((i * Math.PI) / 4) * 9}
            rx="5.5"
            ry="3"
            fill={i % 2 ? '#f2c14e' : '#e8a83c'}
            opacity="0.9"
            transform={`rotate(${(i * 180) / 8 + 22} ${Math.cos((i * Math.PI) / 4) * 9} ${Math.sin((i * Math.PI) / 4) * 9})`}
          />
        ))}
        <circle r="4.6" fill="#6f4a2e" />
      </g>
    </svg>
  )
}
