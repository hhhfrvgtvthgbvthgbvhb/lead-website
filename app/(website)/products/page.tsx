import Link from 'next/link'
import Image from 'next/image'
import productsData from '@/products.json'

export default function ProductsPage({ searchParams }: { searchParams?: { category?: string } }) {
  const category = searchParams?.category

  const filtered = category
    ? productsData.filter(p => {
        if (category === 'h-frame') return p.category_en === 'H Frame Hydraulic Press'
        if (category === 'four-column') return p.category_en === 'Four Column Hydraulic Press'
        if (category === 'door-embossing') return p.category_en.includes('Door')
        return true
      })
    : productsData

  const categories = [
    { id: '', label: 'All Products', count: productsData.length },
    { id: 'h-frame', label: 'H Frame Press', count: productsData.filter(p => p.category_en === 'H Frame Hydraulic Press').length },
    { id: 'four-column', label: 'Four Column Press', count: productsData.filter(p => p.category_en === 'Four Column Hydraulic Press').length },
    { id: 'door-embossing', label: 'Door Embossing', count: productsData.filter(p => p.category_en.includes('Door')).length },
  ]

  return (
    <div>
      <section className="bg-steel-900 text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Products</h1>
          <p className="text-xl text-steel-300 max-w-3xl">
            74+ hydraulic press models from 25T to 4500T. H-frame, four-column, and door embossing machines for metal forming, stamping, and deep drawing.
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={cat.id ? `/products?category=${cat.id}` : '/products'}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  (category || '') === cat.id
                    ? 'bg-brand-600 text-white'
                    : 'bg-steel-100 text-steel-700 hover:bg-steel-200'
                }`}
              >
                {cat.label} ({cat.count})
              </Link>
            ))}
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((product) => (
              <div key={product.id} className="bg-white rounded-xl border border-steel-200 overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="aspect-[4/3] bg-steel-100 relative overflow-hidden">
                  {product.hero_image ? (
                    <Image
                      src={`/images/products/${product.id}/hero.webp`}
                      alt={product.name_en || product.name_cn}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-steel-400 text-sm">
                      [Product Image]
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <span className="text-xs font-medium text-brand-600 bg-brand-50 px-2 py-1 rounded mb-3 inline-block">
                    {product.category_en}
                  </span>
                  <h3 className="text-lg font-semibold text-steel-900 mb-2">
                    {product.name_en || product.name_cn}
                  </h3>
                  <p className="text-sm text-steel-500 line-clamp-2 mb-4">
                    {product.description_en || (product.specs ? product.specs.slice(0, 100) + '...' : '')}
                  </p>
                  <Link
                    href={`/products/${product.id}`}
                    className="text-sm font-medium text-brand-600 hover:text-brand-700"
                  >
                    View details →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-steel-500">No products found in this category.</div>
          )}
        </div>
      </section>
    </div>
  )
}
