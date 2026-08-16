import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { LANG_LABELS, useLang } from '@/i18n'
import type { Lang } from '@/i18n'

function LangSwitch({ onPick, large }: { onPick?: () => void; large?: boolean }) {
  const { lang, setLang } = useLang()
  return (
    <div className={`flex items-center ${large ? 'gap-5' : 'gap-2'}`} role="group" aria-label="Language">
      {LANG_LABELS.map(({ lang: l, label }, i) => (
        <span key={l} className="flex items-center gap-2">
          {i > 0 && <span className="text-ink/30 select-none">/</span>}
          <button
            type="button"
            onClick={() => {
              setLang(l as Lang)
              onPick?.()
            }}
            className={`transition-colors duration-300 ${
              large ? 'font-display text-2xl' : 'text-xs tracking-[0.15em]'
            } ${
              lang === l
                ? 'text-vermilion font-bold underline underline-offset-4 decoration-vermilion/60'
                : 'text-ink/60 hover:text-ink'
            }`}
          >
            {label}
          </button>
        </span>
      ))}
    </div>
  )
}

export default function SiteNav() {
  const { t } = useLang()
  const [open, setOpen] = useState(false)

  const links = [
    { id: 'about', no: '01', label: t.nav.about },
    { id: 'friends', no: '02', label: t.nav.friends },
    { id: 'contact', no: '03', label: t.nav.contact },
  ]

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-ink/15 bg-paper/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
          <a href="#top" className="group flex items-baseline gap-1.5">
            <span className="font-display text-xl font-black tracking-tight">ARIA</span>
            <span className="h-1.5 w-1.5 rounded-full bg-vermilion transition-transform duration-300 group-hover:scale-150" />
          </a>

          <nav className="hidden items-center gap-7 md:flex" aria-label="Sections">
            {links.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                className="group flex items-baseline gap-1.5 text-sm text-ink/70 transition-colors hover:text-ink"
              >
                <span className="font-display text-[10px] italic text-vermilion/80">{l.no}</span>
                <span className="relative">
                  {l.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-vermilion transition-all duration-300 group-hover:w-full" />
                </span>
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <LangSwitch />
            <button
              type="button"
              className="text-ink md:hidden"
              aria-label={t.nav.openMenu}
              onClick={() => setOpen(true)}
            >
              <Menu size={22} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      {/* mobile full-screen menu */}
      <div
        className={`fixed inset-0 z-[70] flex flex-col bg-paper transition-all duration-500 md:hidden ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-ink/15 px-5">
          <span className="font-display text-xl font-black tracking-tight">ARIA</span>
          <button type="button" aria-label={t.nav.closeMenu} onClick={() => setOpen(false)}>
            <X size={24} strokeWidth={1.5} />
          </button>
        </div>
        <nav className="flex flex-1 flex-col justify-center gap-2 px-8" aria-label="Sections">
          {links.map((l, i) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={() => setOpen(false)}
              className={`flex items-baseline gap-4 border-b border-ink/10 py-5 transition-all duration-500 ${
                open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
              style={{ transitionDelay: `${100 + i * 70}ms` }}
            >
              <span className="font-display text-sm italic text-vermilion">{l.no}</span>
              <span className="font-display text-4xl font-black tracking-tight">{l.label}</span>
            </a>
          ))}
        </nav>
        <div className="border-t border-ink/15 px-8 py-6">
          <LangSwitch large onPick={() => setOpen(false)} />
        </div>
      </div>
    </>
  )
}
