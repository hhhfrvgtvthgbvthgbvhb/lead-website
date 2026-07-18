import Image from 'next/image'
import Reveal from '@/components/motion/Reveal'

export default function CertPartners() {
  return (
    <section className="py-16 lg:py-24 bg-steel-950 border-t border-white/10 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-dark bg-grid opacity-30 pointer-events-none" aria-hidden />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <Reveal className="lg:col-span-5">
            <div className="overline-label mb-4">Certified Quality</div>
            <h2 className="display-md text-white mb-5">Audited. Certified. Every Year.</h2>
            <p className="text-steel-400 leading-relaxed mb-6">
              Our quality management system is certified to ISO 9001 and re-audited
              annually. Every press ships with a factory test report, English manuals,
              and a complete spare-parts list.
            </p>
            <ul className="space-y-3">
              {['ISO 9001 quality management system', 'CE-compliant electrical cabinets', 'Factory load-test report with every machine'].map((t) => (
                <li key={t} className="flex items-center gap-3 text-sm text-steel-300">
                  <svg className="w-4 h-4 shrink-0 text-brand-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-3">
            <figure className="bg-white rounded-lg p-3 rotate-[-1.5deg] shadow-2xl shadow-black/40 hover:rotate-0 transition-transform duration-500">
              <div className="relative aspect-[7/10] overflow-hidden rounded-sm">
                <Image
                  src="/images/certificates/iso-9001.webp"
                  alt="ISO 9001 quality management system certificate of LEAD"
                  fill
                  sizes="(max-width: 1024px) 100vw, 25vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="text-center text-xs text-steel-600 font-medium py-2">
                ISO 9001 Certificate — 2025 Annual Audit
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={0.18} className="lg:col-span-4">
            <div className="bg-white/5 border border-white/10 rounded-lg p-6 lg:p-8">
              <div className="text-xs font-display font-semibold uppercase tracking-[0.22em] text-steel-400 mb-5">
                Trusted by Industry Partners
              </div>
              <div className="relative aspect-[4/3] bg-white rounded-md overflow-hidden">
                <Image
                  src="/images/certificates/partners.webp"
                  alt="Logos of LEAD partner companies"
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-contain p-4"
                />
              </div>
              <p className="mt-5 text-sm text-steel-400 leading-relaxed">
                Components and technology partnerships with world-class suppliers
                keep every LEAD press running for decades.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
