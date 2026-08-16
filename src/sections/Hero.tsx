import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { useLang } from '@/i18n'
import Seascape from '@/components/Seascape'

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1]

/** 轻盈的飘落起点 —— 从左侧不同高度飘来 */
const DRIFT_ORIGINS = [
  { x: -380, y: -50, rotate: -11 },
  { x: -450, y: 30, rotate: 8 },
  { x: -320, y: -70, rotate: -7 },
  { x: -500, y: 40, rotate: 13 },
  { x: -360, y: -30, rotate: -9 },
  { x: -420, y: 55, rotate: 6 },
  { x: -340, y: 10, rotate: -14 },
  { x: -480, y: -45, rotate: 10 },
]

/**
 * 逐字符从左到右轻盈飘落
 */
function DriftText({
  text,
  className,
  startAt = 0,
  duration = 2,
  stagger = 0.08,
}: {
  text: string
  className?: string
  startAt?: number
  duration?: number
  stagger?: number
}) {
  const chars = text.split('')
  return (
    <span className={className}>
      {chars.map((char, i) => {
        const o = DRIFT_ORIGINS[i % DRIFT_ORIGINS.length]
        return (
          <motion.span
            key={i}
            className="inline-block"
            initial={{ opacity: 0, x: o.x, y: o.y, rotate: o.rotate }}
            animate={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
            transition={{
              duration,
              delay: startAt + i * stagger,
              ease: EASE,
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        )
      })}
    </span>
  )
}

/** 整行轻旋飘落 */
function DriftLine({
  children,
  className,
  delay = 0,
  x = -300,
  y = 0,
  rotate = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  x?: number
  y?: number
  rotate?: number
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y, rotate }}
      animate={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
      transition={{ duration: 2, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

export default function Hero() {
  const { t } = useLang()

  return (
    <section id="top" className="relative flex min-h-screen flex-col overflow-hidden">
      {/* masthead */}
      <div className="relative z-20 mx-auto w-full max-w-7xl px-6 pt-24 sm:px-10 sm:pt-28">
        {/* est / vol — 逐字飘落 */}
        <div className="flex items-baseline justify-between text-[10px] tracking-[0.22em] text-ink/70 sm:text-xs">
          <DriftText text={t.hero.est} startAt={0.15} duration={1.4} stagger={0.05} />
          <DriftText text={t.hero.vol} startAt={0.15} duration={1.4} stagger={0.05} />
        </div>

        {/* 大标题 — 逐字飘落，较早结束 */}
        <h1 className="mt-6 text-center font-cover text-[clamp(2.5rem,9vw,7.2rem)] leading-[1.06] tracking-[0.01em] text-ink">
          <DriftText text="A room" startAt={0.35} duration={1.4} stagger={0.07} />
          <br />
          <DriftText text="belongs to me" startAt={0.35} duration={1.4} stagger={0.07} />
        </h1>
      </div>

      {/* watercolor seascape — 背景直接出现，文字在它上面飘落 */}
      <div className="relative z-10 min-h-[380px] flex-1">
        <Seascape />
      </div>

      {/* bottom: quote + signature */}
      <div className="relative z-20 mx-auto -mt-36 w-full max-w-6xl px-7 pb-9 sm:-mt-44 sm:px-12 sm:pb-11">
        <blockquote className="relative mx-auto max-w-xl">
          {/* 德文引用 — 也逐字飘落，比标题稍晚开始、稍晚结束 */}
          <p className="text-center font-script text-[clamp(1.1rem,2.6vw,1.65rem)] leading-relaxed text-ink/85">
            <DriftText
              text={`${t.hero.quoteMarkLeft}${t.hero.quote}${t.hero.quoteMarkRight}`}
              startAt={0.55}
              duration={1.4}
              stagger={0.025}
            />
          </p>

          {/* 引用来源 — 从右侧轻旋飘落 */}
          <DriftLine delay={2.7} x={100} y={15} rotate={3}>
            <footer className="mt-2 text-right">
              <p className="text-[10px] tracking-[0.22em] text-ink/70">{t.hero.quoteBy}</p>
              <p className="mt-0.5 font-display text-[10px] italic text-ink/45">{t.hero.quoteByLatin}</p>
            </footer>
          </DriftLine>
        </blockquote>

        {/* 滚动提示 + 签名 — 在一切落定后轻升 */}
        <motion.div
          className="mt-7 flex items-end justify-between"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, delay: 3.5, ease: EASE }}
        >
          <a
            href="#about"
            className="group flex items-center gap-3 text-[11px] tracking-[0.35em] text-ink/60 transition-colors hover:text-ink"
          >
            <ArrowDown size={15} className="animate-bounce text-vermilion" />
            {t.hero.scroll}
          </a>
          <span className="font-script text-2xl text-ink/70 sm:text-3xl">Aria</span>
        </motion.div>
      </div>
    </section>
  )
}
