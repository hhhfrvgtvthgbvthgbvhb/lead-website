import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { displayDescription, displayName, getAllProducts } from '@/lib/cms'
import { CATEGORIES, getCategory } from '@/lib/categories'
import Reveal from '@/components/motion/Reveal'

export const dynamic = 'force-dynamic'

const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const cat = getCategory(slug)
  if (!cat) return { title: 'Category Not Found' }
  return {
    title: `${cat.name} (${cat.range})`,
    description: `${cat.intro} Browse LEAD ${cat.name} models from ${cat.range}. OEM/ODM available, ISO 9001 certified.`,
    openGraph: {
      title: `${cat.name} | LEAD Hydraulic Press Machinery`,
      description: cat.intro,
      images: [cat.image],
    },
  }
}

function tonnageOf(name: string): number | null {
  const m = name.match(/(\d+)\s*T\b/i)
  return m ? Number(m[1]) : null
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params
  const cat = getCategory(slug)
  if (!cat) return notFound()

  const products = await getAllProducts()
  const filtered = products.filter(cat.match)

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Products', item: `${SITE_URL}/products` },
      { '@type': 'ListItem', position: 3, name: cat.name, item: `${SITE_URL}/products/category/${cat.id}` },
    ],
  }

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* Hero band */}
      <section className="relative bg-steel-950 overflow-hidden">
        <div className="absolute inset-0" aria-hidden>
          <Image src={cat.image} alt="" fill sizes="100vw" className="object-cover opacity-25" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-steel-950 via-steel-950/70 to-steel-950/40" aria-hidden />
        <div className="absolute inset-0 bg-grid-dark bg-grid opacity-20" aria-hidden />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 lg:pt-40 pb-12 lg:pb-16">
          <nav aria-label="Breadcrumb" className="text-sm text-steel-400 mb-5 flex items-center gap-2">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span aria-hidden>/</span>
            <Link href="/products" className="hover:text-white transition-colors">Products</Link>
            <span aria-hidden>/</span>
            <span className="text-steel-300">{cat.shortName}</span>
          </nav>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <h1 className="display-lg text-white">{cat.name}</h1>
          </div>
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="text-[11px] font-display font-semibold uppercase tracking-[0.18em] bg-brand-600 text-white px-2.5 py-1 rounded-sm">
              {cat.range}
            </span>
            <span className="text-[11px] font-display font-semibold uppercase tracking-[0.18em] bg-white/10 text-white px-2.5 py-1 rounded-sm">
              {filtered.length} models
            </span>
          </div>
          <p className="text-lg text-steel-400 max-w-3xl leading-relaxed">{cat.intro}</p>
        </div>
      </section>

      {/* Category switcher */}
      <div className="sticky top-16 lg:top-20 z-40 bg-steel-950/90 backdrop-blur-md border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto py-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {CATEGORIES.map((c) => (
              <Link
                key={c.id}
                href={`/products/category/${c.id}`}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                  c.id === cat.id
                    ? 'bg-brand-600 border-brand-600 text-white'
                    : 'border-white/15 text-steel-300 hover:border-white/40 hover:text-white'
                }`}
              >
                {c.shortName}
                <span className={`ml-2 text-xs ${c.id === cat.id ? 'text-white/80' : 'text-steel-500'}`}>
                  {products.filter(c.match).length}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Product grid */}
      <section className="py-14 lg:py-20 bg-steel-50 relative min-h-[50vh]">
        <div className="absolute inset-0 bg-grid-light bg-grid opacity-60 pointer-events-none" aria-hidden />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product, i) => {
              const tonnage = tonnageOf(product.name_en || '')
              return (
                <Reveal key={product.id} delay={(i % 3) * 0.06}>
                  <Link
                    href={`/products/${product.id}`}
                    className="group block bg-white rounded-lg border border-steel-200 overflow-hidden hover:shadow-xl hover:shadow-steel-900/10 hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="aspect-[4/3] bg-steel-100 relative overflow-hidden">
                      {product.hero_image ? (
                        <Image
                          src={`/images/products/${product.id}/hero.webp`}
                          alt={displayName(product)}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-steel-400 text-sm">
                          [Product Image]
                        </div>
                      )}
                      {tonnage && (
                        <span className="absolute top-4 right-4 text-[11px] font-display font-bold bg-brand-600 text-white px-2.5 py-1 rounded-sm">
                          {tonnage}T
                        </span>
                      )}
                    </div>
                    <div className="p-6">
                      <h2 className="font-display text-lg font-semibold text-steel-900 leading-snug group-hover:text-brand-600 transition-colors line-clamp-2">
                        {displayName(product)}
                      </h2>
                      <p className="mt-2 text-sm text-steel-500 leading-relaxed line-clamp-2">
                        {displayDescription(product)}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
                        View details
                        <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
