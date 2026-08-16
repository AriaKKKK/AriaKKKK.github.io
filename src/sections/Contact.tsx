import { ArrowUpRight, Mail } from 'lucide-react'
import { useLang } from '@/i18n'
import Reveal from '@/components/Reveal'
import SectionHead from '@/components/SectionHead'
import Wash from '@/components/Wash'

/** 圆形邮戳 —— 像杂志编辑部寄出的信上盖的邮戳 */
function Postmark({ label, sublabel }: { label: string; sublabel: string }) {
  return (
    <div className="relative flex h-24 w-24 items-center justify-center rotate-[-14deg] text-vermilion sm:h-28 sm:w-28">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100">
        {/* 外圈波浪 */}
        <circle
          cx="50"
          cy="50"
          r="47"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="5 3"
          opacity="0.65"
        />
        {/* 内圈实线 */}
        <circle
          cx="50"
          cy="50"
          r="41"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.45"
        />
        {/* 中间横线 */}
        <line x1="14" y1="50" x2="86" y2="50" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      </svg>
      <div className="relative text-center">
        <p className="font-display text-[9px] font-bold tracking-[0.3em] sm:text-[10px]">{label}</p>
        <p className="mt-0.5 text-[6.5px] tracking-[0.15em] opacity-60 sm:text-[7.5px]">
          {sublabel}
        </p>
      </div>
    </div>
  )
}

export default function Contact() {
  const { t } = useLang()
  return (
    <section
      id="contact"
      className="relative scroll-mt-20 overflow-hidden border-t border-ink/15 bg-paper-deep/55"
    >
      {/* watercolor washes framing the letter */}
      <Wash
        className="pointer-events-none absolute -left-24 bottom-16 h-72 w-96"
        color="#8fbcb5"
        opacity={0.35}
      />
      <Wash
        className="pointer-events-none absolute -right-24 top-16 h-72 w-96"
        color="#f1e8a9"
        opacity={0.6}
      />

      <div className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionHead no={t.contact.no} title={t.contact.title} cross={t.contact.enTitle} />

        {/* colophon — magazine closing line */}
        <Reveal delay={0.1}>
          <p className="mx-auto mt-12 max-w-lg text-center font-display text-lg italic leading-relaxed text-ink/50 sm:mt-16 sm:text-xl">
            {t.contact.colophon}
          </p>
        </Reveal>

        {/* letter / envelope area */}
        <Reveal delay={0.2}>
          <div className="mx-auto mt-14 max-w-xl sm:mt-20">
            <div className="relative border border-ink/15 bg-white/50 p-8 shadow-[6px_6px_0_0_rgba(47,72,88,0.06)] backdrop-blur-sm sm:p-12">
              {/* 信纸网格背景 */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.035]"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, #2f4858 1px, transparent 1px), linear-gradient(to bottom, #2f4858 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                }}
              />

              {/* 顶部封口线 */}
              <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-ink/20 to-transparent" />

              {/* 竖排装饰：通信处 */}
              <div className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 sm:block">
                <span className="vertical-rl text-upright font-display text-[10px] tracking-[0.45em] text-ink/15">
                  {t.contact.location}
                </span>
              </div>

              <div className="relative">
                {/* 写信至标签 */}
                <div className="flex items-center gap-2">
                  <Mail size={14} className="text-vermilion/60" />
                  <span className="text-[10px] tracking-[0.35em] text-ink/40 uppercase">
                    {t.contact.emailLabel}
                  </span>
                </div>

                {/* 邮箱地址 */}
                <a
                  href={`mailto:${t.contact.email}`}
                  className="mt-5 block break-all font-display text-[clamp(1.35rem,4.2vw,2.4rem)] font-black tracking-tight text-ink underline decoration-vermilion/40 decoration-[2px] underline-offset-[8px] transition-colors duration-300 hover:text-vermilion"
                >
                  {t.contact.email}
                </a>

                {/* 地点 + 坐标 */}
                <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink/45">
                  <span>{t.contact.location}</span>
                  <span className="hidden text-ink/15 sm:inline">|</span>
                  <span className="font-mono text-xs tracking-wider">{t.contact.coordinates}</span>
                </div>

                {/* 备注 */}
                <p className="mt-6 text-xs italic text-ink/35">{t.contact.note}</p>

                {/* 邮戳 */}
                <div className="mt-8 flex justify-end sm:absolute sm:right-0 sm:bottom-0 sm:mt-0">
                  <Postmark label={t.contact.stampLabel} sublabel={t.contact.stampSublabel} />
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* 社交链接 — 名片式 */}
        <Reveal delay={0.3}>
          <div className="mx-auto mt-16 max-w-xl sm:mt-20">
            <div className="flex items-baseline gap-4">
              <h3 className="font-display text-sm font-bold tracking-[0.35em] text-ink/55">
                {t.contact.socialsTitle}
              </h3>
              <span className="h-px flex-1 bg-ink/15" aria-hidden="true" />
            </div>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {t.contact.socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between border border-ink/15 bg-white/40 p-5 transition-all duration-300 hover:border-vermilion/30 hover:bg-white/70 hover:shadow-[3px_3px_0_0_rgba(207,106,78,0.08)]"
                >
                  <div>
                    <span className="font-display text-base font-bold text-ink transition-colors duration-300 group-hover:text-vermilion sm:text-lg">
                      {s.name}
                    </span>
                    <span className="mt-1 block text-xs text-ink/45 sm:text-sm">{s.handle}</span>
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="shrink-0 text-ink/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-vermilion"
                  />
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
