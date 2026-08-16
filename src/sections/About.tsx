import { ArrowUpRight } from 'lucide-react'
import { useLang } from '@/i18n'
import Reveal from '@/components/Reveal'
import SectionHead from '@/components/SectionHead'
import Wash from '@/components/Wash'
import portrait from '@/assets/portrait.jpg'

/** small subsection header: tracked label + hairline + script cross-label */
function SubHead({ title, cross }: { title: string; cross: string }) {
  return (
    <Reveal>
      <div className="flex items-baseline gap-4">
        <h3 className="font-display text-sm font-bold tracking-[0.35em] text-ink/55">{title}</h3>
        <span className="h-px flex-1 bg-ink/25" aria-hidden="true" />
        <span className="font-script text-lg text-ink/60">{cross}</span>
      </div>
    </Reveal>
  )
}

export default function About() {
  const { t } = useLang()
  return (
    <section id="about" className="relative scroll-mt-20 overflow-hidden border-t border-ink/15">
      {/* watercolor washes — sea behind the portrait, sand lower down */}
      <Wash className="pointer-events-none absolute -right-24 top-24 h-80 w-[26rem]" color="#a9ccc7" opacity={0.4} />
      <Wash className="pointer-events-none absolute -left-28 bottom-16 h-72 w-96" color="#f1e8a9" opacity={0.55} />
      <div className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="flex items-start gap-7 sm:gap-12">
          {/* small 2–3 寸 portrait pinned to the upper left */}
          <Reveal delay={0.1}>
            <figure className="w-28 shrink-0 sm:w-36">
              <div className="border border-ink/30 bg-paper p-1.5 shadow-[5px_5px_0_0_rgba(47,72,88,0.12)]">
                <img src={portrait} alt={t.about.caption} className="h-auto w-full" />
              </div>
              <figcaption className="mt-3 text-[10px] leading-relaxed text-ink/55">
                {t.about.caption}
              </figcaption>
            </figure>
          </Reveal>
          <div className="min-w-0 flex-1">
            <SectionHead no={t.about.no} title={t.about.title} cross={t.about.enTitle} />

            {/* 自我介绍 —— 杂志风大段文字，首字下沉 */}
            <Reveal delay={0.15}>
              <div className="mt-8 space-y-6">
                <p className="dropcap text-base leading-[1.85] text-ink/80">
                  我叫郑泽仁，大家可以叫我 Aria。在动笔的时候我想起一件事情——妈妈总是会说我小时候的一件事。那个时候我还在上幼儿园，大概只有五六岁。一天，小区的某个水管爆了，我不知道怎么兴起就试着去堵，可怎么堵都堵不上。妈妈每次复述的时候，都会说，旁边还坐着一群老大爷。这群老大爷也没有闲着，而是撺掇我，虽然我对此没有一点印象。这件事情本身没什么，但是却准确地反映出了我的某种性格——充满了执念，对新鲜事物的好奇。
                </p>
                <p className="text-base leading-[1.85] text-ink/80">
                  在升入大学之前，我曾想是学习生物学或是物理学亦或是社会学。生物学是因为我对生物现象的分子机制很感兴趣，物理学则是因为大概小学的时候 CCTV10 曾播出过一个关于爱因斯坦广义相对论的科普片，我到现在仍记得其中一个摩托车疾驰的画面。而至于社会学，则是因为郑也夫老师的启蒙，我对于社会学的研究充满了兴趣。可最后我阴差阳错地进入了数学专业，又阴差阳错的因为 Mochizuki 的影响选择了算术代数几何的方向。
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* education, folded into this page — compact one-line rows */}
        <div className="mt-12 sm:mt-16">
          <SubHead title={t.journey.title} cross={t.journey.enTitle} />
          <div className="mt-3">
            {t.journey.items.map((it, i) => (
              <Reveal key={i} delay={0.08 * i}>
                <div className="group flex flex-wrap items-baseline gap-x-5 gap-y-1 border-t border-ink/15 py-3.5 last:border-b">
                  <span className="w-28 shrink-0 font-display text-sm italic text-vermilion">
                    {it.years}
                  </span>
                  <h4 className="font-display text-base font-bold transition-transform duration-500 group-hover:translate-x-1.5 sm:text-lg">
                    {it.title}
                  </h4>
                  <p className="text-xs leading-relaxed text-ink/55 sm:text-sm">{it.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* academic paper links, filling the freed space */}
        <div className="mt-14 sm:mt-20">
          <SubHead title={t.about.papers.title} cross={t.about.papers.enTitle} />
          <Reveal>
            <p className="mt-4 text-sm text-ink/55">{t.about.papers.lead}</p>
          </Reveal>

          <ol className="mt-8">
            {t.about.papers.items.map((p, i) => (
              <Reveal key={i} delay={0.08 * i}>
                <li>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="group flex gap-5 border-t border-ink/15 py-7 sm:gap-9"
                  >
                    <span className="shrink-0 font-cover text-2xl leading-snug text-vermilion/85 sm:text-3xl">
                      [{p.index}]
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-xl font-bold transition-colors duration-300 group-hover:text-vermilion sm:text-2xl">
                        {p.name}
                      </span>
                      <span className="mt-1 block font-display text-sm italic text-ink/55">
                        {p.nameEn}
                      </span>
                      <span className="mt-3 block max-w-2xl text-sm leading-relaxed text-ink/70">
                        {p.desc}
                      </span>
                      <span className="mt-3 block text-[11px] tracking-[0.25em] text-ink/45">
                        {p.category}
                      </span>
                    </span>
                    <ArrowUpRight
                      size={18}
                      className="mt-1 shrink-0 text-ink/35 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-vermilion"
                    />
                  </a>
                </li>
              </Reveal>
            ))}
            <div className="border-t border-ink/15" aria-hidden="true" />
          </ol>
        </div>
      </div>
    </section>
  )
}
