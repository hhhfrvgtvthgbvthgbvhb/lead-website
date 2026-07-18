import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllNews } from '@/lib/cms'
import Reveal from '@/components/motion/Reveal'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'News & Events',
  description:
    'LEAD company news: product launches, exhibitions, certifications, market expansion and shipment milestones from our hydraulic press factory.',
}

export default async function NewsPage() {
  const news = await getAllNews()
  const [featured, ...rest] = news

  return (
    <div>
      {/* Hero band */}
      <section className="relative bg-steel-950 overflow-hidden">
        <div className="absolute inset-0 bg-grid-dark bg-grid opacity-30" aria-hidden />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 lg:pt-44 pb-14 lg:pb-20">
          <Reveal>
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-12 bg-brand-500" aria-hidden />
              <span className="overline-label">Newsroom</span>
            </div>
            <h1 className="display-lg text-white">News & Events</h1>
            <p className="mt-5 text-lg text-steel-400 max-w-2xl leading-relaxed">
              Product launches, exhibitions and milestones from the LEAD factory floor.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-steel-50 relative">
        <div className="absolute inset-0 bg-grid-light bg-grid opacity-60 pointer-events-none" aria-hidden />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured article */}
          {featured && (
            <Reveal>
              <Link
                href={`/news/${featured.slug}`}
                className="group grid grid-cols-1 lg:grid-cols-2 bg-steel-950 rounded-lg overflow-hidden mb-10 lg:mb-14"
              >
                <div className="p-8 lg:p-14 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-[11px] font-display font-semibold uppercase tracking-[0.18em] bg-brand-600 text-white px-2.5 py-1 rounded-sm">
                      {featured.category}
                    </span>
                    <time className="text-xs text-steel-400">{featured.date}</time>
                  </div>
                  <h2 className="font-display text-2xl lg:text-4xl font-bold text-white leading-tight group-hover:text-brand-400 transition-colors">
                    {featured.title}
                  </h2>
                  <p className="mt-5 text-steel-400 leading-relaxed line-clamp-3">{featured.excerpt}</p>
                  <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-400">
                    Read the story
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
                <div className="hidden lg:block bg-grid-dark bg-grid border-l border-white/10 relative min-h-[320px]">
                  <div className="absolute inset-0 flex items-center justify-center p-14">
                    <div className="text-center">
                      <div className="font-display text-7xl font-bold text-white/10">{featured.date.slice(0, 4)}</div>
                      <div className="mt-2 text-xs font-display uppercase tracking-[0.3em] text-white/30">LEAD Newsroom</div>
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          )}

          {/* Remaining articles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rest.map((item, i) => (
              <Reveal key={item.slug} delay={(i % 2) * 0.08}>
                <Link
                  href={`/news/${item.slug}`}
                  className="group block bg-white rounded-lg border border-steel-200 p-7 lg:p-9 h-full hover:shadow-xl hover:shadow-steel-900/10 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[11px] font-display font-semibold uppercase tracking-[0.18em] text-brand-600 bg-brand-50 px-2.5 py-1 rounded-sm">
                      {item.category}
                    </span>
                    <time className="text-xs text-steel-400">{item.date}</time>
                  </div>
                  <h2 className="font-display text-xl lg:text-2xl font-bold text-steel-900 leading-snug group-hover:text-brand-600 transition-colors">
                    {item.title}
                  </h2>
                  <p className="mt-3 text-sm text-steel-500 leading-relaxed line-clamp-3">{item.excerpt}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
                    Read more
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
