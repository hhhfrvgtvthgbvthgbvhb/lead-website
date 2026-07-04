import Link from 'next/link'
import Image from 'next/image'
import productsData from '@/products.json'
import faqData from '@/faq.json'
import companyInfo from '@/company_info.json'

export default function HomePage() {
  const featuredProducts = productsData.slice(0, 6)
  const categories = [
    { id: 'h-frame', name: 'H Frame Hydraulic Press', count: productsData.filter(p => p.category_en === 'H Frame Hydraulic Press').length, icon: 'M' },
    { id: 'four-column', name: 'Four Column Hydraulic Press', count: productsData.filter(p => p.category_en === 'Four Column Hydraulic Press').length, icon: '4' },
    { id: 'door-embossing', name: 'Door Panel Embossing', count: productsData.filter(p => p.category_en.includes('Door')).length, icon: 'D' },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-steel-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-900/40 to-steel-900/90" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 relative">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6">
              Precision Forging Pressure
              <span className="block text-brand-400 mt-2">Quality LEADing the Future</span>
            </h1>
            <p className="text-lg text-steel-300 mb-8 leading-relaxed max-w-2xl">
              Professional hydraulic press manufacturer since 2006. H-frame, four-column, and door embossing machines from 25T to 4500T. ISO 9001 certified, serving 50+ countries.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/products" className="inline-flex items-center px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-lg transition-colors">
                Explore Products
              </Link>
              <Link href="/contact" className="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg transition-colors backdrop-blur-sm">
                Request Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-brand-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: '18+', label: 'Years Experience' },
              { value: '74+', label: 'Product Models' },
              { value: '50+', label: 'Countries Served' },
              { value: '2000T', label: 'Max Capacity' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl lg:text-3xl font-bold">{stat.value}</div>
                <div className="text-sm text-brand-200 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-16 lg:py-24 bg-steel-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-steel-900 mb-4">Product Categories</h2>
            <p className="text-steel-600 max-w-2xl mx-auto">Comprehensive range of hydraulic presses for metal forming, stamping, deep drawing, and door embossing applications.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((cat) => (
              <Link key={cat.id} href={`/products?category=${cat.id}`} className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-8 border border-steel-200">
                <div className="w-14 h-14 bg-brand-100 text-brand-700 rounded-lg flex items-center justify-center text-2xl font-bold mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                  {cat.icon}
                </div>
                <h3 className="text-xl font-semibold text-steel-900 mb-2">{cat.name}</h3>
                <p className="text-steel-500 text-sm mb-4">{cat.count} models available</p>
                <span className="text-brand-600 text-sm font-medium group-hover:text-brand-700">View all →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-steel-900 mb-4">Featured Products</h2>
              <p className="text-steel-600">Most popular hydraulic press models for global markets</p>
            </div>
            <Link href="/products" className="hidden md:inline-flex items-center text-brand-600 font-medium hover:text-brand-700">
              View all products →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-xl border border-steel-200 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-[4/3] bg-steel-100 relative">
                  {product.hero_image && (
                    <Image src={`/images/products/${product.id}/hero.webp`} alt={product.name_en} fill className="object-cover" />
                  )}
                </div>
                <div className="p-6">
                  <span className="text-xs font-medium text-brand-600 bg-brand-50 px-2 py-1 rounded mb-3 inline-block">{product.category_en}</span>
                  <h3 className="text-lg font-semibold text-steel-900 mb-2">{product.name_en || product.name_cn}</h3>
                  <p className="text-sm text-steel-500 line-clamp-2 mb-4">{product.description_en || product.specs?.slice(0, 120)}...</p>
                  <Link href={`/products/${product.id}`} className="text-sm font-medium text-brand-600 hover:text-brand-700">
                    View details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link href="/products" className="inline-flex items-center text-brand-600 font-medium hover:text-brand-700">
              View all products →
            </Link>
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-16 lg:py-24 bg-steel-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose LEAD</h2>
            <p className="text-steel-400 max-w-2xl mx-auto">Trusted by manufacturers across South America, Russia, Middle East, Africa, and Belt & Road countries.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'OEM/ODM Service', desc: 'Full customization of tonnage, stroke, table size, and control systems within 24h response.' },
              { title: 'Premium Components', desc: 'Rexroth/Yuken pumps, Siemens/Schneider electrical, NOK/Merkel seals for reliability.' },
              { title: 'Global Support', desc: 'Online video guidance, on-site installation, and local authorized technicians.' },
              { title: 'Quality Assurance', desc: 'ISO 9001 certified. 110% load testing for 30 minutes before every shipment.' },
            ].map((item) => (
              <div key={item.title} className="bg-steel-800/50 rounded-xl p-6 border border-steel-700">
                <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
                <p className="text-sm text-steel-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-16 lg:py-24 bg-steel-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-steel-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-steel-600">Common questions from our international clients</p>
          </div>
          <div className="space-y-4">
            {faqData.slice(0, 4).map((faq, idx) => (
              <details key={idx} className="group bg-white rounded-lg border border-steel-200 open:shadow-sm transition-shadow">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <span className="font-medium text-steel-900 pr-4">{faq.q}</span>
                  <span className="text-steel-400 group-open:rotate-180 transition-transform shrink-0">▼</span>
                </summary>
                <div className="px-6 pb-6 text-steel-600 leading-relaxed text-sm">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/contact" className="inline-flex items-center text-brand-600 font-medium hover:text-brand-700">
              Have more questions? Contact us →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-brand-600 rounded-2xl p-8 lg:p-16 text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Ready to Upgrade Your Production?</h2>
            <p className="text-brand-100 max-w-2xl mx-auto mb-8 text-lg">
              Send us your product requirements and our engineers will recommend the optimal hydraulic press solution within 24 hours.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="inline-flex items-center px-8 py-4 bg-white text-brand-700 font-semibold rounded-lg hover:bg-brand-50 transition-colors">
                Request a Quote
              </Link>
              <Link href="/products" className="inline-flex items-center px-8 py-4 bg-brand-700 text-white font-semibold rounded-lg hover:bg-brand-800 transition-colors border border-brand-500">
                Browse Products
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
