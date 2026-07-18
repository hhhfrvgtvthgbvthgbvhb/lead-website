import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { displayDescription, displayName, getAllProducts, getProductBySlug } from '@/lib/cms'
import Reveal from '@/components/motion/Reveal'
import ProductGallery from '@/components/ProductGallery'

export const dynamic = 'force-dynamic'

const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return { title: 'Product Not Found' }
  const name = displayName(product)
  return {
    title: name,
    description: displayDescription(product).slice(0, 160),
    openGraph: {
      title: name,
      description: displayDescription(product).slice(0, 160),
      images: [`/images/products/${product.id}/hero.webp`],
    },
  }
}

/** Parse "Key: value" lines from the specs text into datasheet rows (ASCII keys only). */
function parseSpecRows(specs: string): Array<{ label: string; value: string }> {
  const rows: Array<{ label: string; value: string }> = []
  for (const line of specs.split('\n')) {
    const m = line.trim().match(/^([A-Za-z][A-Za-z0-9 .()/+-]{1,42}):\s*(.+)$/)
    if (m && !/[\u4e00-\u9fff]/.test(m[1] + m[2])) {
      rows.push({ label: m[1].trim(), value: m[2].trim() })
    }
  }
  return rows
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return notFound()

  const all = await getAllProducts()
  const related = all
    .filter((p) => p.category_en === product.category_en && p.id !== product.id)
    .slice(0, 4)

  const name = displayName(product)
  const description = displayDescription(product)
  const images = product.all_images?.length ? product.all_images : [product.hero_image]
  const specRows = parseSpecRows(product.specs || '')
  const tonnage = (product.name_en || '').match(/(\d+)\s*T\b/i)?.[1]

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image: `${SITE_URL}/images/products/${product.id}/hero.webp`,
    category: product.category_en,
    brand: { '@type': 'Brand', name: 'LEAD' },
    manufacturer: {
      '@type': 'Organization',
      name: 'Shandong LEAD Industrial Equipment Technology Co., Ltd.',
      address: 'No. 998 Zhenxing North Road, Tengzhou, Zaozhuang, Shandong, China',
    },
  }
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Products', item: `${SITE_URL}/products` },
      { '@type': 'ListItem', position: 3, name, item: `${SITE_URL}/products/${product.id}` },
    ],
  }

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* Header band */}
      <section className="relative bg-steel-950 overflow-hidden">
        <div className="absolute inset-0 bg-grid-dark bg-grid opacity-30" aria-hidden />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 lg:pt-40 pb-10 lg:pb-14">
          <nav aria-label="Breadcrumb" className="text-sm text-steel-400 mb-5 flex items-center gap-2 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span aria-hidden>/</span>
            <Link href="/products" className="hover:text-white transition-colors">Products</Link>
            <span aria-hidden>/</span>
            <span className="text-steel-300">{product.category_en}</span>
          </nav>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="text-[11px] font-display font-semibold uppercase tracking-[0.18em] bg-white/10 text-white px-2.5 py-1 rounded-sm">
              {product.category_en}
            </span>
            {tonnage && (
              <span className="text-[11px] font-display font-bold bg-brand-600 text-white px-2.5 py-1 rounded-sm">
                {tonnage}T Nominal Force
              </span>
            )}
          </div>
          <h1 className="display-md text-white max-w-4xl">{name}</h1>
        </div>
      </section>

      {/* Main */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            <Reveal>
              <ProductGallery images={images} alt={name} />
            </Reveal>

            <div>
              <Reveal>
                <h2 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-brand-600 mb-4">
                  Overview
                </h2>
                <p className="text-steel-600 leading-relaxed mb-8">{description}</p>
              </Reveal>

              {specRows.length > 0 && (
                <Reveal delay={0.08}>
                  <div className="rounded-lg border border-steel-200 overflow-hidden mb-8">
                    <div className="bg-steel-950 px-5 py-3">
                      <h3 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-white">
                        Technical Specifications
                      </h3>
                    </div>
                    <dl>
                      {specRows.map((row, i) => (
                        <div
                          key={row.label}
                          className={`grid grid-cols-2 gap-4 px-5 py-3 text-sm ${i % 2 === 0 ? 'bg-steel-50' : 'bg-white'}`}
                        >
                          <dt className="text-steel-500">{row.label}</dt>
                          <dd className="font-display font-semibold text-steel-900 text-right">{row.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </Reveal>
              )}

              <Reveal delay={0.12}>
                <div className="flex flex-wrap gap-3 mb-8">
                  <Link
                    href={`/contact?product=${encodeURIComponent(name)}`}
                    className="group inline-flex items-center gap-3 bg-brand-600 hover:bg-brand-500 text-white font-semibold px-7 py-3.5 rounded-sm transition-colors"
                  >
                    Request a Quote
                    <svg className="w-5 h-5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                  <a
                    href={`mailto:zhongjie@lead-group.cn?subject=${encodeURIComponent(`Quote Request: ${name}`)}`}
                    className="inline-flex items-center gap-3 border border-steel-300 hover:border-steel-500 text-steel-800 font-semibold px-7 py-3.5 rounded-sm transition-colors"
                  >
                    Email Inquiry
                  </a>
                </div>
              </Reveal>

              <Reveal delay={0.16}>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm text-steel-600">
                  {['110% load test before shipment', 'OEM/ODM customization available', 'English manuals & test report', 'Global installation support'].map((t) => (
                    <li key={t} className="flex items-start gap-2.5">
                      <svg className="w-5 h-5 shrink-0 text-brand-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {t}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>

          {/* Full technical description */}
          {product.specs && (
            <Reveal className="mt-16">
              <div className="bg-steel-50 rounded-lg border border-steel-200 p-6 lg:p-10">
                <h2 className="font-display text-xl font-bold text-steel-900 mb-6">Technical Description</h2>
                <div className="text-sm text-steel-600 leading-relaxed whitespace-pre-line max-w-4xl">
                  {product.specs}
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* Related products */}
      {related.length > 0 && (
        <section className="py-16 lg:py-20 bg-steel-950 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-dark bg-grid opacity-30 pointer-events-none" aria-hidden />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-10">
              <h2 className="display-md text-white">Related {product.category_en} Models</h2>
              <Link href="/products" className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-steel-300 hover:text-white transition-colors">
                All products
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map((p, i) => (
                <Reveal key={p.id} delay={i * 0.06}>
                  <Link
                    href={`/products/${p.id}`}
                    className="group block bg-steel-900/60 border border-white/10 rounded-lg overflow-hidden hover:border-brand-600 transition-colors"
                  >
                    <div className="aspect-[4/3] bg-steel-800 relative overflow-hidden">
                      <Image
                        src={`/images/products/${p.id}/hero.webp`}
                        alt={displayName(p)}
                        fill
                        sizes="(max-width: 640px) 100vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-display text-sm font-semibold text-white leading-snug line-clamp-2 group-hover:text-brand-400 transition-colors">
                        {displayName(p)}
                      </h3>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
