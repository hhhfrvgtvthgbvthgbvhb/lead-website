import Link from 'next/link'
import Image from 'next/image'
import Reveal from '@/components/motion/Reveal'
import SectionHeading from '@/components/SectionHeading'
import { CATEGORIES } from '@/lib/categories'
import type { ProductView } from '@/lib/cms'

interface CategoriesProps {
  products: ProductView[]
}

export default function Categories({ products }: CategoriesProps) {
  return (
    <section className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          overline="Product Range"
          title="Four Press Families. One Standard of Precision."
          description="From compact 5-ton C-frame presses to 4500-ton door embossing lines, every LEAD machine is engineered, machined and load-tested in our own factory."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat, i) => {
            const count = products.filter(cat.match).length
            return (
              <Reveal key={cat.id} delay={i * 0.08}>
                <Link
                  href={`/products/category/${cat.id}`}
                  className="group block bg-steel-950 rounded-lg overflow-hidden relative aspect-[3/4]"
                >
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover opacity-80 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-steel-950 via-steel-950/30 to-transparent" aria-hidden />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <div className="text-[11px] font-display font-semibold uppercase tracking-[0.22em] text-brand-400 mb-2">
                      {cat.range}
                    </div>
                    <h3 className="font-display text-xl font-bold text-white leading-snug">
                      {cat.name}
                    </h3>
                    <p className="mt-2 text-sm text-steel-400 leading-relaxed line-clamp-2">
                      {cat.blurb}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs text-steel-500">{count} models</span>
                      <span className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/25 text-white transition-all duration-300 group-hover:bg-brand-600 group-hover:border-brand-600">
                        <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
