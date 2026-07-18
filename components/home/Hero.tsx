import Link from 'next/link'
import Image from 'next/image'
import Reveal from '@/components/motion/Reveal'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-steel-950 overflow-hidden">
      {/* Background image with slow ken-burns drift */}
      <div className="absolute inset-0" aria-hidden>
        <Image
          src="/images/hero-bg.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-right animate-ken-burns opacity-90"
        />
      </div>
      {/* Cinematic gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-steel-950 via-steel-950/75 to-steel-950/20" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-t from-steel-950 via-transparent to-steel-950/60" aria-hidden />
      <div className="absolute inset-0 bg-grid-dark bg-grid opacity-30" aria-hidden />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-28 pb-24">
        <div className="max-w-3xl">
          <Reveal>
            <div className="flex items-center gap-3 mb-8">
              <span className="h-px w-12 bg-brand-500" aria-hidden />
              <span className="overline-label">Hydraulic Press Manufacturer Since 2006</span>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <h1 className="display-xl text-white">
              Precision Forging
              <span className="block text-brand-500">Pressure.</span>
              <span className="block mt-2 text-white/90">Quality LEADing</span>
              <span className="block text-white/90">the Future.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.24}>
            <p className="mt-8 text-lg lg:text-xl text-steel-300 leading-relaxed max-w-2xl">
              H-frame, four-column, single column and door embossing hydraulic presses
              from 5T to 4500T — engineered in China&apos;s hydraulic press capital,
              trusted by manufacturers in 50+ countries. ISO 9001 certified.
            </p>
          </Reveal>

          <Reveal delay={0.36}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/products"
                className="group inline-flex items-center gap-3 bg-brand-600 hover:bg-brand-500 text-white font-semibold px-8 py-4 rounded-sm transition-all"
              >
                Explore Products
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 border border-white/30 hover:border-white/70 hover:bg-white/5 text-white font-semibold px-8 py-4 rounded-sm transition-all"
              >
                Request a Quote
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.48}>
            <div className="mt-14 flex flex-wrap gap-x-10 gap-y-4 text-sm text-steel-400">
              {['5T – 4500T Capacity', 'ISO 9001 Certified', '50+ Countries Served', 'OEM / ODM'].map((t) => (
                <span key={t} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-brand-500 rounded-full" aria-hidden />
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50" aria-hidden>
        <span className="text-[10px] font-display uppercase tracking-[0.3em]">Scroll</span>
        <svg className="w-5 h-5 animate-scroll-hint" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}
