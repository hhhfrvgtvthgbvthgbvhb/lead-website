import Link from 'next/link'
import Image from 'next/image'
import Reveal from '@/components/motion/Reveal'
import SectionHeading from '@/components/SectionHeading'

const SCENARIOS = [
  { name: 'Metal Forming & Stamping', image: '/images/applications/press-line.webp', alt: 'Large LEAD hydraulic press forming metal panels at a customer plant' },
  { name: 'Deep Drawing', image: '/images/applications/blue-press-install.webp', alt: 'Blue LEAD deep drawing press installed at customer site' },
  { name: 'Door Panel Embossing', image: '/images/categories/door-embossing.webp', alt: 'Door panel embossing hydraulic press' },
  { name: 'Straightening & Assembly', image: '/images/categories/single-column.webp', alt: 'Single column press for straightening and press-fitting' },
  { name: 'SMC & Composites Molding', image: '/images/categories/h-frame.webp', alt: 'H frame press for SMC composite molding' },
  { name: 'Baling & Recycling', image: '/images/applications/baling-press.webp', alt: 'LEAD baling press compacting textiles at a recycling facility' },
]

export default function Applications() {
  return (
    <section className="py-20 lg:py-28 bg-steel-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-light bg-grid opacity-60 pointer-events-none" aria-hidden />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          overline="Applications"
          title="One Press Partner for Every Forming Task"
          description="LEAD machines are at work in automotive, appliance, door, recycling and composite manufacturing plants worldwide."
        />
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {SCENARIOS.map((s, i) => (
            <Reveal key={s.name} delay={(i % 3) * 0.08}>
              <Link href="/products" className="group block relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src={s.image}
                  alt={s.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-steel-950/85 via-steel-950/10 to-transparent" aria-hidden />
                <div className="absolute bottom-0 inset-x-0 p-4 lg:p-5 flex items-center justify-between gap-2">
                  <h3 className="font-display text-sm lg:text-base font-semibold text-white leading-snug">
                    {s.name}
                  </h3>
                  <svg className="w-4 h-4 shrink-0 text-white/70 group-hover:text-brand-400 transition-colors" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
