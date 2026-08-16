import { useEffect, useMemo, useState } from 'react'

type Phase = 'entering' | 'showing' | 'scattering' | 'exiting' | 'done'

interface CharData {
  char: string
  dx: number
  dy: number
  delay: number
  scale: number
  opacity: number
  rotate: number
  color: string
}

function generateScatterData(text: string): CharData[] {
  const chars = text.split('')
  return chars.map((char) => ({
    char: char === '\n' ? '\n' : char,
    dx: (Math.random() - 0.25) * 320 + 30, // 主要向右偏
    dy: -(Math.random() * 380 + 100),      // 向上飞
    delay: Math.random() * 0.8,
    scale: 0.1 + Math.random() * 0.4,
    opacity: 0,
    rotate: (Math.random() - 0.5) * 55,
    color: Math.random() > 0.78 ? '#cf6a4e' : '#2f4858',
  }))
}

/**
 * 文字飞散进入动画
 *
 * 页面加载后先完整显示文字，短暂停留后每个字符独立飞散
 * （向上、向右上，同时缩小、旋转、变淡），最后覆盖层淡出。
 * 灵感来自小红书「梵高的月亮」文字解体效果。
 */
export default function TextScatterIntro({
  text,
  onDone,
}: {
  text: string
  onDone?: () => void
}) {
  const [phase, setPhase] = useState<Phase>('entering')
  const chars = useMemo(() => generateScatterData(text), [text])

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('showing'), 60)
    const t2 = setTimeout(() => setPhase('scattering'), 1600)
    const t3 = setTimeout(() => setPhase('exiting'), 3000)
    const t4 = setTimeout(() => {
      setPhase('done')
      onDone?.()
    }, 3700)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
    }
  }, [onDone])

  if (phase === 'done') return null

  // 按换行符分组
  const lines: CharData[][] = []
  let currentLine: CharData[] = []
  for (const c of chars) {
    if (c.char === '\n') {
      lines.push(currentLine)
      currentLine = []
    } else {
      currentLine.push(c)
    }
  }
  if (currentLine.length > 0) lines.push(currentLine)

  const isScatter = phase === 'scattering' || phase === 'exiting'

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-paper transition-opacity duration-[700ms] ease-out ${
        phase === 'exiting' ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center gap-1 sm:gap-2">
        {lines.map((line, lineIdx) => (
          <div key={lineIdx} className="flex flex-wrap justify-center">
            {line.map((c, i) => (
              <span
                key={i}
                className="inline-block font-display text-[clamp(2rem,7vw,4.5rem)] font-black will-change-transform"
                style={{
                  transitionDuration: isScatter ? '1500ms' : '500ms',
                  transitionTimingFunction: isScatter
                    ? 'cubic-bezier(0.22, 1, 0.36, 1)'
                    : 'ease-out',
                  transform: isScatter
                    ? `translate3d(${c.dx}px, ${c.dy}px, 0) scale(${c.scale}) rotate(${c.rotate}deg)`
                    : 'translate3d(0, 0, 0) scale(1) rotate(0deg)',
                  opacity:
                    phase === 'entering' ? 0 : phase === 'showing' ? 1 : c.opacity,
                  color: isScatter ? c.color : '#2f4858',
                  transitionDelay: isScatter ? `${c.delay}s` : '0s',
                }}
              >
                {c.char === ' ' ? '\u00A0' : c.char}
              </span>
            ))}
          </div>
        ))}
      </div>

      {/* 底部小字提示 */}
      <div
        className="absolute bottom-12 text-center transition-opacity duration-500"
        style={{ opacity: phase === 'showing' ? 0.35 : 0 }}
      >
        <p className="text-[10px] tracking-[0.3em] text-ink/50">ENTER</p>
      </div>
    </div>
  )
}
