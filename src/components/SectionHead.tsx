import Reveal from './Reveal'

/**
 * Editorial section header: issue number, hairline rule,
 * oversized serif title with a decorative English/Chinese cross-label.
 */
export default function SectionHead({
  no,
  title,
  cross,
}: {
  no: string
  title: string
  cross: string
}) {
  return (
    <Reveal>
      <div className="flex items-baseline gap-4">
        <span className="font-display text-sm font-bold tracking-[0.35em] text-vermilion">
          {no}
        </span>
        <span className="h-px flex-1 bg-ink/25" aria-hidden="true" />
        <span className="font-script text-lg text-ink/60">{cross}</span>
      </div>
      <h2 className="mt-5 font-display text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl">
        {title}
      </h2>
      {/* watercolor brush strokes, like paint dashed under the title */}
      <svg viewBox="0 0 220 14" className="mt-4 h-3 w-40 sm:w-48" aria-hidden="true">
        <path
          d="M4 8 C 60 3, 150 12, 216 6"
          fill="none"
          stroke="#cf6a4e"
          strokeWidth="5"
          strokeLinecap="round"
          opacity="0.5"
        />
        <path
          d="M30 12 C 90 8, 160 13, 205 9"
          fill="none"
          stroke="#e8a83c"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.4"
        />
      </svg>
    </Reveal>
  )
}
