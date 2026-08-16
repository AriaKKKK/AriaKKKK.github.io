import { createContext, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

export type Lang = 'zh' | 'en' | 'ja'

const zh = {
  nav: {
    about: '关于我',
    journey: '教育经历',
    friends: '朋友',
    contact: '联系方式',
    openMenu: '打开菜单',
    closeMenu: '关闭菜单',
  },
  hero: {
    vol: '第 壹 期 · 2026',
    est: '创刊于 2026 · 不定期更新',
    quote: 'Nur um der Hoffnungslosen willen ist uns die Hoffnung gegeben.',
    quoteMarkLeft: '„',
    quoteMarkRight: '“',
    quoteBy: '—— 瓦尔特·本雅明',
    quoteByLatin: 'Walter Benjamin, 1892–1940',
    intro: '你好，我是泽仁，一名学生。这里像一本慢慢装订的杂志，收录我的学习、阅读与论文。',
    scroll: '向下滚动',
    sideNote: '白日梦与长期主义',
  },
  about: {
    no: '01',
    enTitle: 'About',
    title: '关于我',
    caption: '图 I · 2026 年夏',
    papers: {
      title: '学术论文',
      enTitle: 'Papers',
      lead: '引用条目正在补充中（占位）。',
      items: [
        {
          index: '1',
          name: '论文标题（待补充）',
          nameEn: 'Paper Title',
          category: '期刊 · 年份',
          desc: '作者. 论文标题. 期刊名, 卷(期): 页码, 年份. —— 占位条目，稍后替换为真实引用。',
        },
      ],
    },
  },
  journey: {
    no: '02',
    enTitle: 'Journey',
    title: '教育经历',
    lead: '一条还在生长的时间线。',
    items: [
      {
        years: '2023 — 2026',
        title: '南京大学 · 数学系',
        desc: '与公理、证明和结构打交道的三年。',
        tag: '教育',
      },
      {
        years: '2017 — 2021',
        title: '东北大学 · 秦皇岛分校',
        desc: '本科四年，在一座有海的城市度过。',
        tag: '教育',
      },
    ],
  },
  contact: {
    no: '03',
    enTitle: 'Contact',
    title: '联系方式',
    colophon: '这封信，随时等你。',
    emailLabel: '写信至',
    email: 'k1169182904@icloud.com',
    coordinates: '32.06°N, 118.78°E',
    location: '通信处 · 南京',
    note: '期待你的来信。',
    socialsTitle: '在别处找到我',
    socials: [{ name: '小红书', handle: '@Aria', href: 'https://www.xiaohongshu.com' }],
    stampLabel: 'ARIA',
    stampSublabel: 'NANJING · 2026',
  },
  gallery: {
    no: '02',
    enTitle: 'Friends',
    title: '一些朋友',
    lead: '照片会褪色，但记忆不会。',
    note: '照片按拍摄时间排列。',
  },
  footer: {
    line: '像杂志一样设计，像网站一样建造。',
    backToTop: '回到顶部',
  },
}

export type Dict = typeof zh

const en: Dict = {
  nav: {
    about: 'About',
    journey: 'Education',
    friends: 'Friends',
    contact: 'Contact',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
  },
  hero: {
    vol: 'Vol. 01 · 2026',
    est: 'Est. 2026 · Published occasionally',
    quote: 'Nur um der Hoffnungslosen willen ist uns die Hoffnung gegeben.',
    quoteMarkLeft: '„',
    quoteMarkRight: '“',
    quoteBy: '— Walter Benjamin',
    quoteByLatin: '瓦尔特·本雅明, 1892–1940',
    intro: "Hi, I'm Zeren — a student. This site is a slowly-bound magazine of my studies, reading, and papers.",
    scroll: 'Scroll down',
    sideNote: 'Daydreams & long-termism',
  },
  about: {
    no: '01',
    enTitle: '关于我',
    title: 'About',
    caption: 'Fig. I · Summer 2026',
    papers: {
      title: 'Papers',
      enTitle: '论文',
      lead: 'Citations being filled in (placeholders).',
      items: [
        {
          index: '1',
          name: 'Paper Title (TBD)',
          nameEn: '论文标题（待补充）',
          category: 'Journal · Year',
          desc: 'Author. Title. Journal, Vol(Issue): pages, Year. — a placeholder entry, to be replaced with a real citation.',
        },
      ],
    },
  },
  journey: {
    no: '02',
    enTitle: 'Journey',
    title: 'Education',
    lead: 'A timeline still growing.',
    items: [
      {
        years: '2023 — 2026',
        title: 'Nanjing University · Department of Mathematics',
        desc: 'Years among axioms, proofs, and structures.',
        tag: 'Education',
      },
      {
        years: '2017 — 2021',
        title: 'Northeastern University · Qinhuangdao',
        desc: 'Four undergraduate years in a city by the sea.',
        tag: 'Education',
      },
    ],
  },
  contact: {
    no: '03',
    enTitle: '联系方式',
    title: 'Contact',
    colophon: 'This letter is always waiting for you.',
    emailLabel: 'Write to',
    email: 'k1169182904@icloud.com',
    coordinates: '32.06°N, 118.78°E',
    location: 'Nanjing, China',
    note: 'I read every letter.',
    socialsTitle: 'Elsewhere',
    socials: [{ name: 'RED (Xiaohongshu)', handle: '@Aria', href: 'https://www.xiaohongshu.com' }],
    stampLabel: 'ARIA',
    stampSublabel: 'NANJING · 2026',
  },
  gallery: {
    no: '02',
    enTitle: '一些朋友',
    title: 'Friends',
    lead: 'Photos fade, but memories do not.',
    note: 'Photos arranged by date taken.',
  },
  footer: {
    line: 'Designed like a magazine, built like a website.',
    backToTop: 'Back to top',
  },
}

const ja: Dict = {
  nav: {
    about: '私について',
    journey: '学歴',
    friends: '友達',
    contact: '連絡先',
    openMenu: 'メニューを開く',
    closeMenu: 'メニューを閉じる',
  },
  hero: {
    vol: '第 壱 号 · 2026',
    est: '2026年創刊 · 不定期刊行',
    quote: 'Nur um der Hoffnungslosen willen ist uns die Hoffnung gegeben.',
    quoteMarkLeft: '„',
    quoteMarkRight: '“',
    quoteBy: '—— ヴァルター・ベンヤミン',
    quoteByLatin: 'Walter Benjamin, 1892–1940',
    intro: 'はじめまして、鄭澤仁です。学生です。ここは学びと読書と論文をゆっくり綴じていく、小さな雑誌のような場所です。',
    scroll: 'スクロール',
    sideNote: '白昼夢と長期主義',
  },
  about: {
    no: '01',
    enTitle: '私について',
    title: '私について',
    caption: '図 I · 2026年夏',
    papers: {
      title: '学術論文',
      enTitle: 'Papers',
      lead: '引用項目は準備中です（プレースホルダー）。',
      items: [
        {
          index: '1',
          name: '論文タイトル（準備中）',
          nameEn: 'Paper Title',
          category: '雑誌 · 年',
          desc: '著者. タイトル. 雑誌名, 巻(号): ページ, 年. —— プレースホルダー項目、後ほど差し替え。',
        },
      ],
    },
  },
  journey: {
    no: '02',
    enTitle: '学歴',
    title: '学歴',
    lead: 'まだ伸びている年表です。',
    items: [
      {
        years: '2023 — 2026',
        title: '南京大学 · 数学系',
        desc: '公理と証明と構造に向き合う日々。',
        tag: '学歴',
      },
      {
        years: '2017 — 2021',
        title: '東北大学 · 秦皇島',
        desc: '海のある街で過ごした四年間。',
        tag: '学歴',
      },
    ],
  },
  contact: {
    no: '03',
    enTitle: '連絡先',
    title: '連絡先',
    colophon: 'この手紙は、いつでもあなたを待っています。',
    emailLabel: '宛先',
    email: 'k1169182904@icloud.com',
    coordinates: '北緯32.06°, 東経118.78°',
    location: '南京',
    note: 'お手紙をお待ちしています。',
    socialsTitle: 'ほかの場所でも',
    socials: [{ name: '小紅書（RED）', handle: '@Aria', href: 'https://www.xiaohongshu.com' }],
    stampLabel: 'ARIA',
    stampSublabel: 'NANJING · 2026',
  },
  gallery: {
    no: '02',
    enTitle: '友達',
    title: '友達',
    lead: '写真は色あせても、思い出は消えない。',
    note: '写真は撮影日時順に並んでいます。',
  },
  footer: {
    line: '雑誌のようにデザインし、ウェブサイトのようにつくる。',
    backToTop: 'トップへ戻る',
  },
}

const dicts: Record<Lang, Dict> = { zh, en, ja }

export const LANG_LABELS: { lang: Lang; label: string }[] = [
  { lang: 'zh', label: '中' },
  { lang: 'en', label: 'EN' },
  { lang: 'ja', label: '日' },
]

type LangContextValue = {
  lang: Lang
  setLang: (lang: Lang) => void
  t: Dict
}

const LangContext = createContext<LangContextValue | null>(null)

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('zh')
  const value = useMemo<LangContextValue>(() => ({ lang, setLang, t: dicts[lang] }), [lang])
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used within LangProvider')
  return ctx
}
