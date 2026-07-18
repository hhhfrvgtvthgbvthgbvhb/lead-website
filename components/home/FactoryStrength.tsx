import Link from 'next/link'
import Image from 'next/image'
import Reveal from '@/components/motion/Reveal'
import SectionHeading from '@/components/SectionHeading'

const PHOTOS = [
  { src: '/images/factory/workshop-1.webp', caption: 'No. 1 Assembly Workshop', alt: 'LEAD No. 1 assembly workshop with hydraulic presses under assembly' },
  { src: '/images/factory/cnc-machining.webp', caption: 'CNC Machining Center', alt: 'CNC machining center processing press components' },
  { src: '/images/factory/cnc-flame-cutting.webp', caption: 'CNC Flame Cutting', alt: 'CNC flame cutting machine cutting steel plate' },
  { src: '/images/factory/welding-assembly.webp', caption: 'Welding & Assembly Line', alt: 'Welding fixtures and frame assembly area' },
  { src: '/images/factory/warehouse-testing.webp', caption: 'Warehouse & Testing Area', alt: 'Warehouse and final assembly testing area' },
]

export default function FactoryStrength() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Text column */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <SectionHeading
              align="left"
              overline="Manufacturing Strength"
              title="25,000 m² of In-House Production"
              description="Frame welding, CNC machining, assembly and load testing all happen inside our Tengzhou factory — nothing critical is outsourced. That is how we hold tolerances and delivery dates competitors cannot."
            />
            <Reveal>
              <ul className="space-y-4 mb-10">
                {[
                  'Stress-relieved welded frames, machined in-house',
                  'CNC flame cutting & machining centers',
                  'Dedicated welding and assembly lines',
                  'Final inspection & 110% load-test bay',
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3 text-sm text-steel-600">
                    <svg className="w-5 h-5 mt-0.5 shrink-0 text-brand-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {t}
                  </li>
                ))}
              </ul>
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 font-display font-semibold text-steel-900 hover:text-brand-600 transition-colors"
              >
                More about LEAD
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </Reveal>
          </div>

          {/* Photo grid */}
          <div className="lg:col-span-8 grid grid-cols-2 gap-4 lg:gap-6">
            <Reveal className="col-span-2">
              <figure className="relative aspect-[16/8] rounded-lg overflow-hidden group">
                <Image
                  src={PHOTOS[0].src}
                  alt={PHOTOS[0].alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <figcaption className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-steel-950/90 to-transparent px-5 pb-4 pt-12 text-sm font-medium text-white">
                  {PHOTOS[0].caption}
                </figcaption>
              </figure>
            </Reveal>
            {PHOTOS.slice(1).map((p, i) => (
              <Reveal key={p.src} delay={0.08 + i * 0.06}>
                <figure className="relative aspect-[4/3] rounded-lg overflow-hidden group">
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes="(max-width: 1024px) 50vw, 30vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <figcaption className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-steel-950/90 to-transparent px-4 pb-3 pt-10 text-xs font-medium text-white">
                    {p.caption}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
