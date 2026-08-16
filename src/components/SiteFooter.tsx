import { ArrowUp } from 'lucide-react'
import { useLang } from '@/i18n'

export default function SiteFooter() {
  const { t } = useLang()
  return (
    <footer className="border-t border-ink/20">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-5 py-12 sm:px-8">
        {/* closing wave, echoing the cover sea */}
        <svg viewBox="0 0 300 12" className="h-3 w-56" aria-hidden="true">
          <path
            d="M0 7 C 40 2, 80 11, 120 6 C 160 2, 200 11, 240 6 C 265 3, 285 6, 300 5"
            fill="none"
            stroke="#8fbcb5"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.7"
          />
        </svg>
        <span className="font-cover text-3xl tracking-tight">
          ARIA<span className="text-vermilion">.</span>
        </span>
        <p className="text-center text-sm text-ink/60">
          © 2026 Aria · Designed like a magazine, built like a website.
        </p>
        <p className="text-center text-xs italic text-ink/45">{t.footer.line}</p>
        <a
          href="#top"
          className="group mt-2 inline-flex items-center gap-2 text-xs tracking-[0.25em] text-ink/60 transition-colors hover:text-vermilion"
        >
          <ArrowUp size={14} className="transition-transform duration-300 group-hover:-translate-y-1" />
          {t.footer.backToTop}
        </a>
      </div>
    </footer>
  )
}
