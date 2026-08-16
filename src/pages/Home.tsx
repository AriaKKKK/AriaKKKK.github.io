import { LangProvider } from '@/i18n'
import SiteNav from '@/components/SiteNav'
import SiteFooter from '@/components/SiteFooter'
import Hero from '@/sections/Hero'
import About from '@/sections/About'
import Gallery from '@/sections/Gallery'
import Contact from '@/sections/Contact'

export default function Home() {
  return (
    <LangProvider>
      <div className="relative min-h-screen bg-paper text-ink">
        {/* subtle paper grain over the whole page */}
        <div className="paper-grain" aria-hidden="true" />
        <SiteNav />
        <main>
          <Hero />
          <About />
          <Gallery />
          <Contact />
        </main>
        <SiteFooter />
      </div>
    </LangProvider>
  )
}
