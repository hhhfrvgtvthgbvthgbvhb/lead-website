import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { getAllProducts } from '@/lib/cms'
import { CATEGORIES } from '@/lib/categories'
import Reveal from '@/components/motion/Reveal'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Hydraulic Press Products — 4 Press Families, 89+ Models',
  description:
    'Explore LEAD hydraulic press families: H frame (100–1200T), four column (25–2000T), single column C-frame (5–500T) and door panel embossing machines (2000–4500T).',
}

export default async function ProductsPage({ searchParams }: { searchParams?: Promise<{ category?: string }> }) {
  // Legacy links: /products?category=h-frame → /products/category/h-frame
  const params = await searchParams
  if (params?.category) {
    const target = CATEGORIES.find((c) => c.id === params.category)
    redirect(target ? `/products/category/${target.id}` : '/products')
  }

  const products = await getAllProducts()

  return (
    <div>
      {/* Hero band */}
      <section className="relative bg-steel-950 overflow-hidden">
        <div className="absolute inset-0 bg-grid-dark bg-grid opacity-30" aria-hidden />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 lg:pt-44 pb-12 lg:pb-16">
          <Reveal>
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-12 bg-brand-500" aria-hidden />
              <span className="overline-label">Product Catalog</span>
            </div>
            <h1 className="display-lg text-white">Four Press Families</h1>
            <p className="mt-5 text-lg text-steel-400 max-w-3xl leading-relaxed">
              {products.length} models from 5T to 4500T — every machine engineered,
              machined and load-tested in our own factory. Choose a family to browse its models.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Category showcase */}
      <section className="py-14 lg:py-24 bg-steel-50 relative min-h-[60vh]">
        <div className="absolute inset-0 bg-grid-light bg-grid opacity-60 pointer-events-none" aria-hidden />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {CATEGORIES.map((cat, i) => {
              const count = products.filter(cat.match).length
              return (
                <Reveal key={cat.id} delay={i * 0.08}>
                  <Link
                    href={`/products/category/${cat.id}`}
                    className="group block bg-steel-950 rounded-lg overflow-hidden relative aspect-[16/10] lg:aspect-[16/9]"
                  >
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover opacity-75 group-hover:opacity-55 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-steel-950 via-steel-950/35 to-transparent" aria-hidden />
                    <div className="absolute top-5 left-5 flex items-center gap-2">
                      <span className="text-[11px] font-display font-semibold uppercase tracking-[0.18em] bg-brand-600 text-white px-2.5 py-1 rounded-sm">
                        {cat.range}
                      </span>
                      <span className="text-[11px] font-display font-semibold uppercase tracking-[0.18em] bg-steel-950/80 text-white backdrop-blur px-2.5 py-1 rounded-sm">
                        {count} models
                      </span>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
                      <h2 className="font-display text-2xl lg:text-3xl font-bold text-white leading-snug">
                        {cat.name}
                      </h2>
                      <p className="mt-2 text-sm lg:text-base text-steel-400 leading-relaxed max-w-md">
                        {cat.blurb}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white">
                        <span className="border-b-2 border-brand-500 pb-0.5 group-hover:text-brand-400 transition-colors">
                          Browse {count} models
                        </span>
                        <svg className="w-4 h-4 text-brand-500 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                </Reveal>
              )
            })}
          </div>

          {/* Help strip */}
          <Reveal className="mt-10 lg:mt-14">
            <div className="bg-steel-950 rounded-lg p-6 lg:p-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <h2 className="font-display text-xl lg:text-2xl font-bold text-white">
                  Not sure which structure fits your part?
                </h2>
                <p className="mt-2 text-steel-400 leading-relaxed max-w-xl">
                  Send us your drawings — our engineers will recommend the right press
                  family and tonnage within 24 hours.
                </p>
              </div>
              <Link
                href="/contact"
                className="group shrink-0 inline-flex items-center gap-3 bg-brand-600 hover:bg-brand-500 text-white font-semibold px-7 py-3.5 rounded-sm transition-colors"
              >
                Ask an Engineer
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
