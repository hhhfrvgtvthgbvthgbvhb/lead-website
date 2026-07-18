import Image from 'next/image'
import Reveal from '@/components/motion/Reveal'
import SectionHeading from '@/components/SectionHeading'

const MARKETS = ['South America', 'Russia & CIS', 'Middle East', 'Africa', 'Southeast Asia', 'Belt & Road Countries']

const WALL = [
  { src: '/images/visitors/visitor-1.webp', alt: 'Overseas customers visiting the LEAD factory' },
  { src: '/images/exhibitions/exhibition-1.webp', alt: 'LEAD booth at an international machinery exhibition' },
  { src: '/images/visitors/visitor-3.webp', alt: 'Customer delegation inspecting LEAD presses' },
  { src: '/images/visitors/visitor-4.webp', alt: 'Customers testing a hydraulic press at LEAD' },
  { src: '/images/exhibitions/exhibition-2.webp', alt: 'LEAD team at a trade show' },
  { src: '/images/visitors/visitor-6.webp', alt: 'Group photo with overseas customers' },
  { src: '/images/visitors/visitor-7.webp', alt: 'Customer visit at LEAD workshop' },
  { src: '/images/exhibitions/exhibition-3.webp', alt: 'LEAD exhibition stand with hydraulic press on display' },
]

const MARQUEE = [
  '/images/visitors/visitor-2.webp',
  '/images/visitors/visitor-5.webp',
  '/images/visitors/visitor-8.webp',
  '/images/exhibitions/exhibition-1.webp',
  '/images/visitors/visitor-1.webp',
  '/images/exhibitions/exhibition-3.webp',
]

export default function MarketsVisitors() {
  return (
    <section className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Markets */}
          <div className="lg:col-span-4">
            <SectionHeading
              align="left"
              overline="Global Presence"
              title="Trusted on Five Continents"
              description="Overseas customers visit our factory every month — and leave with machines on the water."
            />
            <Reveal>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                {MARKETS.map((m) => (
                  <li key={m} className="flex items-center gap-3 text-sm font-medium text-steel-700 border border-steel-200 rounded-sm px-4 py-3 hover:border-brand-400 hover:text-steel-900 transition-colors">
                    <span className="w-1.5 h-1.5 bg-brand-600 rounded-full shrink-0" aria-hidden />
                    {m}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Photo wall */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:gap-4">
              {WALL.map((p, i) => (
                <Reveal key={p.src + i} delay={(i % 4) * 0.06} className={i % 4 === 1 || i % 4 === 2 ? 'sm:mt-8' : ''}>
                  <figure className="relative aspect-[3/4] rounded-lg overflow-hidden group">
                    <Image
                      src={p.src}
                      alt={p.alt}
                      fill
                      sizes="(max-width: 640px) 50vw, 20vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Marquee strip */}
      <div className="mt-16 lg:mt-20 relative">
        <div className="flex w-max animate-marquee gap-4 pr-4">
          {[...MARQUEE, ...MARQUEE].map((src, i) => (
            <div key={i} className="relative w-64 lg:w-80 aspect-[16/10] rounded-lg overflow-hidden shrink-0">
              <Image
                src={src}
                alt="LEAD customers and exhibitions"
                fill
                sizes="320px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent pointer-events-none" aria-hidden />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent pointer-events-none" aria-hidden />
      </div>
    </section>
  )
}
