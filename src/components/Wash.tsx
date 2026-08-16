import { useId } from 'react'

/**
 * Soft watercolor wash blob — the same blurred organic edge as the cover
 * seascape. Place absolutely inside a `relative overflow-hidden` section.
 * Colors come from the cover palette: sea #a9ccc7/#8fbcb5, sand #f1e8a9,
 * sunflower #e8a83c, coral #cf6a4e.
 */
export default function Wash({
  className = '',
  color = '#a9ccc7',
  opacity = 0.45,
}: {
  className?: string
  color?: string
  opacity?: number
}) {
  const id = `wash-${useId().replace(/:/g, '')}`
  return (
    <svg viewBox="0 0 200 160" className={className} aria-hidden="true" focusable="false">
      <defs>
        <filter id={id} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>
      <path
        d="M100 14 C 148 4, 186 44, 182 86 C 178 128, 138 152, 94 148 C 50 144, 16 116, 22 74 C 28 34, 56 22, 100 14 Z"
        fill={color}
        opacity={opacity}
        filter={`url(#${id})`}
      />
    </svg>
  )
}
