import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import productsData from '@/products.json'

export async function generateStaticParams() {
  return productsData.map((p) => ({ slug: String(p.id) }))
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = productsData.find((p) => String(p.id) === params.slug)
  if (!product) return notFound()

  const related = productsData
    .filter((p) => p.category_en === product.category_en && p.id !== product.id)
    .slice(0, 4)

  return (
    <div>
      <section className="bg-steel-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-sm text-steel-400 mb-2">
            <Link href="/products" className="hover:text-white">Products</Link>
            <span className="mx-2">/</span>
            <span>{product.category_en}</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold">{product.name_en || product.name_cn}</h1>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Images */}
            <div>
              <div className="aspect-[4/3] bg-steel-100 rounded-xl overflow-hidden relative mb-4">
                {product.hero_image ? (
                  <Image
                    src={`/images/products/${product.id}/hero.webp`}
                    alt={product.name_en || product.name_cn}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-steel-400">[Product Image]</div>
                )}
              </div>
              {product.all_images && product.all_images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.all_images.slice(1, 5).map((img, idx) => (
                    <div key={idx} className="aspect-square bg-steel-100 rounded-lg relative overflow-hidden">
                      <Image src={`/images/products/${product.id}/gallery-${idx}.webp`} alt="" fill className="object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div>
              <span className="text-sm font-medium text-brand-600 bg-brand-50 px-3 py-1 rounded-full">{product.category_en}</span>
              <h2 className="text-2xl font-bold text-steel-900 mt-4 mb-4">{product.name_en || product.name_cn}</h2>
              <p className="text-steel-600 leading-relaxed mb-6">{product.description_en}</p>

              {product.specs && (
                <div className="bg-steel-50 rounded-xl p-6 mb-6">
                  <h3 className="font-semibold text-steel-900 mb-4">Technical Description</h3>
                  <div className="text-sm text-steel-600 whitespace-pre-line">{product.specs.slice(0, 600)}...</div>
                </div>
              )}

              <div className="flex flex-wrap gap-3">
                <Link href="/contact" className="inline-flex items-center px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-lg transition-colors">
                  Request Quote
                </Link>
                <a href="mailto:sales@leadhyd.com?subject=Quote Request: ${product.name_en}" className="inline-flex items-center px-6 py-3 bg-steel-100 hover:bg-steel-200 text-steel-700 font-medium rounded-lg transition-colors">
                  Email Inquiry
                </a>
              </div>

              {product.seo_keywords && (
                <div className="mt-6">
                  <span className="text-xs text-steel-400">Tags: {product.seo_keywords}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-12 bg-steel-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-steel-900 mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p) => (
                <Link key={p.id} href={`/products/${p.id}`} className="bg-white rounded-lg border border-steel-200 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-[4/3] bg-steel-100 relative">
                    {p.hero_image && <Image src={`/images/products/${p.id}/hero.webp`} alt={p.name_en || p.name_cn} fill className="object-cover" />}
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-steel-900 text-sm">{p.name_en || p.name_cn}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
