/** sunflower spots on the sand: x, y (ground), scale, lean(deg) */
const SUNFLOWERS = [
  { x: 832, y: 700, s: 1.0, lean: -4 },
  { x: 545, y: 735, s: 0.78, lean: 5 },
  { x: 985, y: 765, s: 0.9, lean: -7 },
  { x: 340, y: 780, s: 0.68, lean: 8 },
  { x: 165, y: 725, s: 0.85, lean: 3 },
]

/* ---- Monet-style impressionist sunflower generator (deterministic) ---- */

const PETAL_COLORS = ['#e8a83c', '#f2c14e', '#d98f35', '#f5d36b', '#e0962f', '#f7dc7a']
const CENTER_COLORS = ['#6f4a2e', '#8a5a35', '#5d3d28', '#a06a3a', '#7c5230']
const GREEN_COLORS = ['#7d9257', '#93a86a', '#6a8148', '#a3b478']

const mulberry32 = (seed: number) => () => {
  seed |= 0
  seed = (seed + 0x6d2b79f5) | 0
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}

type Dab = { x: number; y: number; w: number; h: number; angle: number; color: string; opacity: number }
type Stroke = { x1: number; y1: number; x2: number; y2: number; color: string }

/** one sunflower = loose stem strokes + a cloud of short oil-paint dabs */
function sunflowerDabs(seed: number, lean: number): { dabs: Dab[]; strokes: Stroke[] } {
  const rnd = mulberry32(seed)
  const pick = <T,>(arr: T[]): T => arr[Math.floor(rnd() * arr.length)]
  const dabs: Dab[] = []
  const strokes: Stroke[] = []

  // stem — a few broken strokes
  let px = 0
  let py = 0
  for (let k = 0; k < 6; k++) {
    const nx = Math.sin((lean * Math.PI) / 180) * (k + 1) * 11 + (rnd() * 3 - 1.5)
    const ny = -(k + 1) * 11
    strokes.push({ x1: px, y1: py, x2: nx, y2: ny, color: pick(GREEN_COLORS) })
    px = nx
    py = ny
  }
  const hx = px
  const hy = py

  // leaves — flat dabs
  for (let k = 0; k < 4; k++) {
    dabs.push({
      x: rnd() * 30 - 16,
      y: -(18 + rnd() * 22),
      w: 10 + rnd() * 8,
      h: 4 + rnd() * 3,
      angle: rnd() * 80 - 40,
      color: pick(GREEN_COLORS),
      opacity: 0.75,
    })
  }

  // petals — two loose rings of dab clusters
  const ring = (count: number, length: number, offset: number) => {
    for (let i = 0; i < count; i++) {
      const ang = (i * 360) / count + offset
      const a = (ang * Math.PI) / 180
      const dx = Math.sin(a)
      const dy = -Math.cos(a)
      const pX = Math.cos(a)
      const pY = Math.sin(a)
      const n = 5 + Math.floor(rnd() * 3)
      for (let k = 0; k < n; k++) {
        const t = 0.25 + (0.75 * (k + rnd() * 0.7)) / n
        dabs.push({
          x: hx + dx * length * t + pX * (rnd() * 6.4 - 3.2),
          y: hy + dy * length * t + pY * (rnd() * 6.4 - 3.2),
          w: 4.5 + rnd() * 3.5,
          h: 2.2 + rnd() * 1.4,
          angle: ang + (rnd() * 36 - 18),
          color: pick(PETAL_COLORS),
          opacity: 0.7 + rnd() * 0.25,
        })
      }
    }
  }
  ring(11, 30, 0)
  ring(9, 20, 20)

  // mottled brown center
  for (let k = 0; k < 42; k++) {
    const a = rnd() * 2 * Math.PI
    const r = 12 * Math.sqrt(rnd())
    dabs.push({
      x: hx + r * Math.cos(a),
      y: hy + r * Math.sin(a),
      w: 3.5 + rnd() * 3,
      h: 2.5 + rnd() * 2,
      angle: rnd() * 180,
      color: pick(CENTER_COLORS),
      opacity: 0.65 + rnd() * 0.3,
    })
  }

  // sunlight flecks
  for (let k = 0; k < 9; k++) {
    const a = rnd() * 2 * Math.PI
    const r = 14 + rnd() * 12
    dabs.push({
      x: hx + r * Math.cos(a),
      y: hy + r * Math.sin(a),
      w: 4,
      h: 2.4,
      angle: rnd() * 180,
      color: '#f9e79a',
      opacity: 0.5 + rnd() * 0.3,
    })
  }

  return { dabs, strokes }
}

const SUNFLOWER_RENDER = SUNFLOWERS.map((f, i) => ({ ...f, ...sunflowerDabs(1000 + i * 77, f.lean) }))

/**
 * Watercolor seascape in the spirit of Sempé's 1981 New Yorker cover:
 * soft aqua wave washes, pale buttery sand, a few tan rocks — and the
 * Little Prince standing on a rock, gazing at the sea.
 * Pure SVG with heavy blurs = watercolor feel; waves drift very slowly.
 */
export default function Seascape() {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 1200 820"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
    >
      <defs>
        <filter id="wc-b6" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
        <filter id="wc-b14" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
        <filter id="wc-b24" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="24" />
        </filter>
      </defs>

      {/* distant sea haze */}
      <path
        d="M0 60 C 300 40, 700 80, 1200 55 L1200 170 C 800 195, 400 150, 0 175 Z"
        fill="#c3deda"
        opacity="0.65"
        filter="url(#wc-b24)"
      />

      {/* wave layer 1 — drifting */}
      <g className="wave-drift-slow">
        <path
          d="M-40 130 C 200 95, 380 145, 600 118 C 820 92, 1020 95, 1240 125 L1240 270 C 950 300, 700 250, 450 280 C 250 302, 100 305, -40 280 Z"
          fill="#a9ccc7"
          opacity="0.55"
          filter="url(#wc-b14)"
        />
      </g>

      {/* wave layer 2 — drifting the other way */}
      <g className="wave-drift">
        <path
          d="M-40 265 C 250 232, 500 288, 760 258 C 960 236, 1100 240, 1240 268 L1240 410 C 900 440, 650 392, 400 418 C 220 438, 80 440, -40 415 Z"
          fill="#8fbcb5"
          opacity="0.5"
          filter="url(#wc-b14)"
        />
      </g>

      {/* low swell */}
      <path
        d="M0 390 C 260 358, 520 400, 780 375 C 980 356, 1100 360, 1200 385 L1200 510 C 850 540, 500 490, 0 528 Z"
        fill="#7fb3ad"
        opacity="0.38"
        filter="url(#wc-b24)"
      />

      {/* flowing current lines along the contours */}
      <g fill="none" strokeLinecap="round" filter="url(#wc-b6)">
        <path
          className="wave-flow-slow"
          d="M-20 150 C 220 118, 420 160, 640 138 C 860 116, 1060 120, 1220 148"
          stroke="#ffffff"
          strokeWidth="3"
          strokeDasharray="30 42"
          opacity="0.5"
        />
        <path
          className="wave-flow-mid"
          d="M-20 235 C 240 208, 480 252, 720 230 C 940 210, 1100 214, 1220 240"
          stroke="#6ba49e"
          strokeWidth="2.6"
          strokeDasharray="22 38"
          opacity="0.45"
        />
        <path
          className="wave-flow"
          d="M-20 320 C 260 292, 520 332, 760 310 C 960 292, 1100 296, 1220 322"
          stroke="#ffffff"
          strokeWidth="2.8"
          strokeDasharray="26 34"
          opacity="0.42"
        />
        <path
          className="wave-flow-mid"
          d="M-20 415 C 280 388, 540 424, 800 402 C 1000 386, 1120 392, 1220 414"
          stroke="#5f9a94"
          strokeWidth="2.4"
          strokeDasharray="20 36"
          opacity="0.4"
        />
      </g>

      {/* foam streaks — also drifting slowly */}
      <g className="wave-drift" stroke="#ffffff" strokeLinecap="round" fill="none" filter="url(#wc-b6)">
        <path d="M180 218 C 320 205, 480 226, 640 212" strokeWidth="7" opacity="0.5" />
        <path d="M620 330 C 780 316, 920 336, 1080 322" strokeWidth="8" opacity="0.45" />
        <path d="M120 452 C 260 440, 420 458, 560 446" strokeWidth="8" opacity="0.4" />
      </g>

      {/* pale buttery sand wash */}
      <path
        d="M0 528 C 300 488, 650 566, 1200 506 L1200 820 L0 820 Z"
        fill="#f1e8a9"
        opacity="0.85"
        filter="url(#wc-b24)"
      />
      <path
        d="M0 640 C 350 610, 750 670, 1200 620 L1200 820 L0 820 Z"
        fill="#e9dc9c"
        opacity="0.5"
        filter="url(#wc-b24)"
      />

      {/* Monet-style sunflowers scattered on the sand, swaying gently */}
      {SUNFLOWER_RENDER.map((f, i) => (
        <g key={`${f.x}-${f.y}`} transform={`translate(${f.x} ${f.y}) scale(${f.s}) rotate(${f.lean})`}>
          <g
            className="sunflower-sway"
            style={{ animationDuration: `${5.4 + (i % 3) * 0.9}s`, animationDelay: `${i * -1.35}s` }}
            filter="url(#wc-b6)"
            opacity="0.9"
          >
            {f.strokes.map((p, k) => (
              <line
                key={`s${k}`}
                x1={p.x1}
                y1={p.y1}
                x2={p.x2}
                y2={p.y2}
                stroke={p.color}
                strokeWidth={2.4}
                strokeLinecap="round"
                opacity={0.85}
              />
            ))}
            {f.dabs.map((d, k) => (
              <ellipse
                key={k}
                cx={d.x}
                cy={d.y}
                rx={d.w / 2}
                ry={d.h / 2}
                fill={d.color}
                opacity={d.opacity}
                transform={`rotate(${d.angle} ${d.x} ${d.y})`}
              />
            ))}
          </g>
        </g>
      ))}

      {/* dune grass, lower right */}
      <g stroke="#b7c99b" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.6" filter="url(#wc-b6)">
        <path d="M1050 800 C 1055 750, 1070 715, 1092 690" />
        <path d="M1080 805 C 1088 760, 1108 728, 1132 706" />
        <path d="M1112 808 C 1122 770, 1142 742, 1166 726" />
      </g>
    </svg>
  )
}
