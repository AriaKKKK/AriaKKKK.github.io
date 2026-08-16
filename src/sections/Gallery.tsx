import { useState, useCallback, useEffect } from 'react'
import { useLang } from '@/i18n'
import Reveal from '@/components/Reveal'
import SectionHead from '@/components/SectionHead'
import Wash from '@/components/Wash'

/* ── 2023 ── */
import p23_1 from '@/assets/friends/img_4897.jpg'
import p23_2 from '@/assets/friends/img_8178.jpg'

/* ── 2024 ── */
import p24_1 from '@/assets/friends/fxn-2024-07-18-193248.523.jpg'
import p24_2 from '@/assets/friends/fxn-2024-07-18-203643.762.jpg'
import p24_3 from '@/assets/friends/97843de19a168dd2562e1d09d3b03a04.jpg'
import p24_4 from '@/assets/friends/img_7729.jpg'

/* ── 2025 ── */
import p25_1 from '@/assets/friends/1675cabc6f50590e9508c28a94d81d2f.jpg'
import p25_2 from '@/assets/friends/4b26ad14198114636357d03ad5ce94de.jpg'
import p25_3 from '@/assets/friends/3332.jpg'
import p25_4 from '@/assets/friends/2719.jpg'

/* ── 2026 ── */
import p26_1 from '@/assets/friends/img_0336.jpg'
import p26_2 from '@/assets/friends/img_1790.jpg'
import p26_3 from '@/assets/friends/img_1862.jpg'

const TIMELINE = [
  {
    year: '2023',
    desc: '南京的夏天，校园与咖啡店。',
    photos: [
      { src: p23_1, caption: 'Jul · 校园' },
      { src: p23_2, caption: 'Sep · 紫峰大厦' },
    ],
  },
  {
    year: '2024',
    desc: '跟点点去云南找袜子。',
    photos: [
      { src: p24_1, caption: 'Jul · 云南' },
      { src: p24_2, caption: 'Jul · 云南' },
      { src: p24_3, caption: 'Aug · 花束' },
      { src: p24_4, caption: 'Aug · 风景' },
    ],
  },
  {
    year: '2025',
    desc: '在闽南，海风与朋友。',
    photos: [
      { src: p25_1, caption: 'Jan · 闽南' },
      { src: p25_2, caption: 'Jan · 朋友' },
      { src: p25_3, caption: 'May · 海边' },
      { src: p25_4, caption: 'May · 朋友' },
    ],
  },
  {
    year: '2026',
    desc: '毕业了，告别校园。',
    photos: [
      { src: p26_1, caption: 'Jun · 校园' },
      { src: p26_2, caption: 'Jun · 毕业' },
      { src: p26_3, caption: 'Jun · 日常' },
    ],
  },
]

/* ── Lightbox ── */
function Lightbox({
  photos,
  startIndex,
  onClose,
}: {
  photos: { src: string; caption: string }[]
  startIndex: number
  onClose: () => void
}) {
  const [index, setIndex] = useState(startIndex)

  const goPrev = useCallback(() => {
    setIndex(i => (i === 0 ? photos.length - 1 : i - 1))
  }, [photos.length])

  const goNext = useCallback(() => {
    setIndex(i => (i === photos.length - 1 ? 0 : i + 1))
  }, [photos.length])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose, goPrev, goNext])

  const current = photos[index]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      <div className="relative z-10 mx-4 max-h-[85vh] w-full max-w-xl" onClick={e => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/70 transition-colors hover:bg-white/20 hover:text-white"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>

        <div className="overflow-hidden rounded-2xl bg-black shadow-2xl">
          <img src={current.src} alt={current.caption} className="max-h-[75vh] w-full object-contain" />
        </div>

        <div className="mt-3 flex items-center justify-between text-white/70">
          <span className="text-sm">{current.caption}</span>
          <span className="text-xs tabular-nums">{index + 1} / {photos.length}</span>
        </div>

        {photos.length > 1 && (
          <>
            <button onClick={goPrev} className="absolute left-[-3rem] top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white/70 transition-colors hover:bg-white/20 hover:text-white sm:left-[-4rem]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <button onClick={goNext} className="absolute right-[-3rem] top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white/70 transition-colors hover:bg-white/20 hover:text-white sm:right-[-4rem]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </>
        )}

        {photos.length > 1 && (
          <div className="mt-4 flex justify-center gap-2 overflow-x-auto pb-2">
            {photos.map((p, i) => (
              <button key={i} onClick={() => setIndex(i)} className={`h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${i === index ? 'border-vermilion' : 'border-transparent opacity-60 hover:opacity-100'}`}>
                <img src={p.src} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

/* ── PhotoCard ── */
function PhotoCard({
  photo,
  rotation,
  offset,
  onClick,
}: {
  photo: { src: string; caption: string }
  rotation: number
  offset: { x: number; y: number }
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="group relative cursor-pointer rounded-xl bg-white p-1.5 shadow-md transition-all duration-300 ease-out hover:z-10 hover:scale-110 hover:shadow-xl"
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px) rotate(${rotation}deg)`,
        width: '120px',
      }}
    >
      <div className="aspect-[3/4] w-full overflow-hidden rounded-lg">
        <img src={photo.src} alt={photo.caption} className="h-full w-full object-cover" loading="lazy" />
      </div>
      <span className="mt-1 block text-center text-[9px] tracking-wide text-ink/40">
        {photo.caption}
      </span>
    </button>
  )
}

/* ── PhotoScatter ── 照片散落 */
function PhotoScatter({
  photos,
  onOpen,
  align,
}: {
  photos: { src: string; caption: string }[]
  onOpen: (index: number) => void
  align: 'left' | 'right'
}) {
  const scatterData = [
    { rotation: -6, offset: { x: -4, y: 2 } },
    { rotation: 5, offset: { x: 6, y: -3 } },
    { rotation: -3, offset: { x: -2, y: 5 } },
    { rotation: 8, offset: { x: 4, y: 1 } },
  ]

  return (
    <div className={`mt-4 flex flex-wrap gap-3 ${align === 'right' ? 'sm:justify-end' : ''}`} style={{ maxWidth: '320px' }}>
      {photos.map((p, i) => (
        <PhotoCard
          key={i}
          photo={p}
          rotation={scatterData[i % scatterData.length].rotation}
          offset={scatterData[i % scatterData.length].offset}
          onClick={() => onOpen(i)}
        />
      ))}
    </div>
  )
}

/* ── TimelineNode ── */
function TimelineNode({
  node,
  index,
  onOpen,
}: {
  node: (typeof TIMELINE)[0]
  index: number
  onOpen: (photos: { src: string; caption: string }[], i: number) => void
}) {
  const isLeft = index % 2 === 0

  return (
    <Reveal delay={0.12 * index}>
      <div className={`relative sm:grid sm:grid-cols-2 sm:gap-x-12 ${index > 0 ? 'sm:mt-[-1rem]' : ''}`}>
        <div className={`${isLeft ? '' : 'hidden sm:block'}`}>
          {isLeft && <NodeContent node={node} onOpen={onOpen} align="right" />}
        </div>

        <div className={`${!isLeft ? '' : 'hidden sm:block'}`}>
          {!isLeft && <NodeContent node={node} onOpen={onOpen} align="left" />}
        </div>

        <div className="sm:hidden">
          <NodeContent node={node} onOpen={onOpen} align="left" />
        </div>

        <div className="absolute top-5 hidden h-3 w-3 rounded-full border-2 border-vermilion bg-paper sm:left-1/2 sm:block sm:-translate-x-1/2" />
      </div>
    </Reveal>
  )
}

/* ── NodeContent ── */
function NodeContent({
  node,
  onOpen,
  align,
}: {
  node: (typeof TIMELINE)[0]
  onOpen: (photos: { src: string; caption: string }[], i: number) => void
  align: 'left' | 'right'
}) {
  return (
    <div className={`${align === 'right' ? 'sm:text-right' : ''}`}>
      <span className="font-cover text-[clamp(1.6rem,3.5vw,2.4rem)] text-vermilion">{node.year}</span>
      <p className="mt-1 text-sm leading-relaxed text-ink/55">{node.desc}</p>

      <div className={`mt-4 inline-block ${align === 'right' ? 'sm:ml-auto' : ''}`}>
        <PhotoScatter
          photos={node.photos}
          onOpen={(i) => onOpen(node.photos, i)}
          align={align}
        />
      </div>
    </div>
  )
}

/* ── Gallery ── */
export default function Gallery() {
  const { t } = useLang()
  const [lightbox, setLightbox] = useState<{
    photos: { src: string; caption: string }[]
    index: number
  } | null>(null)

  const openLightbox = useCallback(
    (photos: { src: string; caption: string }[], index = 0) => {
      setLightbox({ photos, index })
    },
    []
  )

  const closeLightbox = useCallback(() => setLightbox(null), [])

  return (
    <section id="friends" className="relative scroll-mt-20 overflow-hidden border-t border-ink/15">
      <Wash className="pointer-events-none absolute -left-20 top-24 h-60 w-72" color="#a9ccc7" opacity={0.3} />
      <Wash className="pointer-events-none absolute -right-16 bottom-20 h-56 w-64" color="#f1e8a9" opacity={0.45} />

      <div className="relative mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionHead no={t.gallery.no} title={t.gallery.title} cross={t.gallery.enTitle} />

        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-lg text-center font-display text-base italic leading-relaxed text-ink/50 sm:text-lg">
            {t.gallery.lead}
          </p>
        </Reveal>

        <div className="relative mt-12 sm:mt-16">
          <div className="absolute left-1/2 top-4 bottom-4 hidden w-px -translate-x-1/2 bg-ink/15 sm:block" />

          <div className="space-y-10 sm:space-y-0">
            {TIMELINE.map((node, i) => (
              <TimelineNode
                key={node.year}
                node={node}
                index={i}
                onOpen={openLightbox}
              />
            ))}
          </div>
        </div>

        <Reveal delay={0.4}>
          <p className="mt-12 text-center text-xs tracking-wide text-ink/30">{t.gallery.note}</p>
        </Reveal>
      </div>

      {lightbox && (
        <Lightbox
          photos={lightbox.photos}
          startIndex={lightbox.index}
          onClose={closeLightbox}
        />
      )}
    </section>
  )
}
