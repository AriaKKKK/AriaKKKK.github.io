import { useId } from 'react'

/**
 * Slowly rotating circular text ring — decorative, mixed-language.
 * The text is baked into the design (not affected by the language switcher).
 */
export default function CircularText({ className }: { className?: string }) {
  const id = useId()
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <defs>
        <path
          id={id}
          d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0"
          fill="none"
        />
      </defs>
      <circle cx="100" cy="100" r="52" fill="none" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1" />
      <text fill="currentColor" fontSize="13" letterSpacing="4" fontFamily='"Playfair Display","Noto Serif SC","Noto Serif JP",serif'>
        <textPath href={`#${id}`}>
          ARIA · HOPE · 希望 · きぼう · EST. 2026 ·&#160;
        </textPath>
      </text>
    </svg>
  )
}
