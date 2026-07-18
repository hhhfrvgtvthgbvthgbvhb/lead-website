import Link from 'next/link'
import Image from 'next/image'
import Reveal from '@/components/motion/Reveal'
import SectionHeading from '@/components/SectionHeading'
import { displayDescription, displayName, type ProductView } from '@/lib/cms'

interface FeaturedProductsProps {
  products: ProductView[]
}

/** Pick a category-diverse showcase: top machines from each press family. */
function pickFeatured(products: ProductView[]): ProductView[] {
  const picks: ProductView[] = []
  const want: Array<{ match: (p: ProductView) => boolean; count: number }> = [
    { match: (p) => p.category_en === 'Four Column Hydraulic Press', count: 2 },
    { match: (p) => p.category_en === 'H Frame Hydraulic Press', count: 1 },
    { match: (p) => p.category_en === 'Single Column Hydraulic Press', count: 1 },
    { match: (p) => p.category_en.includes('Door'), count: 1 },
  ]
  for (const w of want) {
    const found = products.filter((p) => w.match(p) && !picks.includes(p)).slice(0, w.count)
    picks.push(...found)
  }
  for (const p of products) {
    if (picks.length >= 6) break
    if (!picks.includes(p)) picks.push(p)
  }
  return picks.slice(0, 6)
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  const featured = pickFeatured(products)

  return (
    <section className="py-20 lg:py-28 bg-steel-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-light bg-grid opacity-60 pointer-events-none" aria-hidden />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 lg:mb-16">
          <SectionHeading
            align="left"
            overline="Featured Equipment"
            title="Proven Machines, Ready for Your Floor"
            description="Best-selling models for global markets — every press is load-tested at 110% rated capacity before shipment."
          />
          <Reveal className="shrink-0 mb-12 lg:mb-16">
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 font-display font-semibold text-steel-900 hover:text-brand-600 transition-colors"
            >
              View all 89+ models
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((product, i) => (
            <Reveal key={product.id} delay={(i % 3) * 0.08}>
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
                  <span className="absolute top-4 left-4 text-[11px] font-display font-semibold uppercase tracking-[0.16em] bg-steel-950/85 text-white backdrop-blur px-2.5 py-1 rounded-sm">
                    {product.category_en.replace(' Hydraulic Press', '').replace(' Machine', '')}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg font-semibold text-steel-900 leading-snug group-hover:text-brand-600 transition-colors line-clamp-2">
                    {displayName(product)}
                  </h3>
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
          ))}
        </div>
      </div>
    </section>
  )
}
