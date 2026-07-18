import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllNews, getNewsBySlug } from '@/lib/cms'
import Reveal from '@/components/motion/Reveal'

export const dynamic = 'force-dynamic'

const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const news = await getNewsBySlug(slug)
  if (!news) return { title: 'Article Not Found' }
  return {
    title: news.title,
    description: news.excerpt.slice(0, 160),
  }
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params
  const news = await getNewsBySlug(slug)
  if (!news) return notFound()

  const all = await getAllNews()
  const idx = all.findIndex((n) => n.slug === slug)
  const prev = idx > 0 ? all[idx - 1] : null
  const next = idx >= 0 && idx < all.length - 1 ? all[idx + 1] : null

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'News', item: `${SITE_URL}/news` },
      { '@type': 'ListItem', position: 3, name: news.title, item: `${SITE_URL}/news/${news.slug}` },
    ],
  }

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* Header band */}
      <section className="relative bg-steel-950 overflow-hidden">
        <div className="absolute inset-0 bg-grid-dark bg-grid opacity-30" aria-hidden />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 lg:pt-40 pb-12 lg:pb-16">
          <nav aria-label="Breadcrumb" className="text-sm text-steel-400 mb-6 flex items-center gap-2">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span aria-hidden>/</span>
            <Link href="/news" className="hover:text-white transition-colors">News</Link>
            <span aria-hidden>/</span>
            <span className="text-steel-300 truncate max-w-[40vw]">{news.title}</span>
          </nav>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[11px] font-display font-semibold uppercase tracking-[0.18em] bg-brand-600 text-white px-2.5 py-1 rounded-sm">
              {news.category}
            </span>
            <time className="text-sm text-steel-400">{news.date}</time>
          </div>
          <h1 className="display-md text-white">{news.title}</h1>
        </div>
      </section>

      {/* Article body */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xl text-steel-700 leading-relaxed font-medium border-l-4 border-brand-600 pl-6 mb-10">
              {news.excerpt}
            </p>
            <article className="text-steel-600 leading-loose text-base lg:text-lg whitespace-pre-line">
              {news.content}
            </article>
          </Reveal>

          {/* Prev / Next */}
          <div className="mt-16 pt-10 border-t border-steel-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prev ? (
              <Link href={`/news/${prev.slug}`} className="group bg-steel-50 hover:bg-steel-100 rounded-lg p-5 transition-colors">
                <div className="text-xs font-semibold uppercase tracking-[0.16em] text-steel-400 mb-2">← Newer</div>
                <div className="font-display font-semibold text-steel-900 text-sm leading-snug group-hover:text-brand-600 transition-colors line-clamp-2">
                  {prev.title}
                </div>
              </Link>
            ) : <span />}
            {next ? (
              <Link href={`/news/${next.slug}`} className="group bg-steel-50 hover:bg-steel-100 rounded-lg p-5 transition-colors sm:text-right">
                <div className="text-xs font-semibold uppercase tracking-[0.16em] text-steel-400 mb-2">Older →</div>
                <div className="font-display font-semibold text-steel-900 text-sm leading-snug group-hover:text-brand-600 transition-colors line-clamp-2">
                  {next.title}
                </div>
              </Link>
            ) : <span />}
          </div>

          <div className="mt-10 text-center">
            <Link href="/news" className="text-sm font-semibold text-brand-600 hover:text-brand-700">
              ← Back to all news
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
