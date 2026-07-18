import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import companyInfo from '@/company_info.json'
import faqData from '@/faq.json'
import Reveal from '@/components/motion/Reveal'
import Counter from '@/components/motion/Counter'
import SectionHeading from '@/components/SectionHeading'

export const metadata: Metadata = {
  title: 'About LEAD — Hydraulic Press Manufacturer Since 2006',
  description:
    'Shandong LEAD Industrial Equipment Technology Co., Ltd.: 25,000 m² factory in Tengzhou, 200+ staff, ISO 9001 certified, exporting hydraulic presses to 50+ countries.',
}

const FACTS: Array<{ value: number; suffix?: string; label: string; grouping?: boolean }> = [
  { value: 2006, label: 'Founded', grouping: false },
  { value: 25000, suffix: ' m²', label: 'Factory Area' },
  { value: 200, suffix: '+', label: 'Employees' },
  { value: 50, suffix: '+', label: 'Export Countries' },
]

const EQUIPMENT = [
  { src: '/images/factory/workshop-1.webp', caption: 'No. 1 Assembly Workshop', alt: 'LEAD No. 1 assembly workshop' },
  { src: '/images/factory/workshop-2.webp', caption: 'No. 2 Assembly Workshop', alt: 'LEAD No. 2 assembly workshop' },
  { src: '/images/factory/cnc-machining.webp', caption: 'CNC Machining Center', alt: 'CNC machining center' },
  { src: '/images/factory/cnc-flame-cutting.webp', caption: 'CNC Flame Cutting', alt: 'CNC flame cutting machine' },
  { src: '/images/factory/welding-assembly.webp', caption: 'Welding & Assembly Line', alt: 'Welding fixtures and assembly line' },
  { src: '/images/factory/warehouse-testing.webp', caption: 'Warehouse & Testing Area', alt: 'Warehouse and testing area' },
]

const VISITS = [
  { src: '/images/visitors/visitor-1.webp', alt: 'Overseas customers visiting LEAD' },
  { src: '/images/visitors/visitor-2.webp', alt: 'Customer delegation at the factory' },
  { src: '/images/exhibitions/exhibition-1.webp', alt: 'LEAD at an international exhibition' },
  { src: '/images/visitors/visitor-4.webp', alt: 'Customers inspecting a press' },
  { src: '/images/exhibitions/exhibition-2.webp', alt: 'LEAD exhibition booth' },
  { src: '/images/visitors/visitor-6.webp', alt: 'Group photo with customers' },
  { src: '/images/exhibitions/exhibition-3.webp', alt: 'Trade show presence' },
  { src: '/images/visitors/visitor-8.webp', alt: 'Customer visit to LEAD' },
]

const SHIPPING = [
  { src: '/images/shipping/truck-load.webp', alt: 'LEAD press loaded on truck for delivery' },
  { src: '/images/shipping/container-press-blue.webp', alt: 'Hydraulic press secured inside a shipping container' },
  { src: '/images/shipping/crane-loading.webp', alt: 'Crane loading a press for export shipment' },
  { src: '/images/shipping/container-cylinders.webp', alt: 'Hydraulic cylinders packed in a container' },
  { src: '/images/shipping/flatbed.webp', alt: 'Large press on a flatbed truck inside the factory' },
  { src: '/images/shipping/container-press-yellow.webp', alt: 'Press frame loaded into a container' },
]

export default function AboutPage() {
  return (
    <div>
      {/* Hero band */}
      <section className="relative min-h-[70vh] flex items-end bg-steel-950 overflow-hidden">
        <div className="absolute inset-0" aria-hidden>
          <Image
            src="/images/factory/office.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-45 animate-ken-burns"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-steel-950 via-steel-950/60 to-steel-950/30" aria-hidden />
        <div className="absolute inset-0 bg-grid-dark bg-grid opacity-30" aria-hidden />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-16 lg:pb-24 pt-40">
          <Reveal>
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-12 bg-brand-500" aria-hidden />
              <span className="overline-label">About LEAD</span>
            </div>
            <h1 className="display-lg text-white max-w-4xl">
              Engineering Strength.
              <span className="text-brand-500"> Global Reach.</span>
              <br />
              Lasting Partnership.
            </h1>
            <p className="mt-6 text-lg text-steel-300 max-w-2xl leading-relaxed">
              {companyInfo.legal_name_en} — hydraulic press manufacturer in Tengzhou,
              Shandong, China&apos;s hydraulic press manufacturing base.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Company profile */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <Reveal>
              <div className="overline-label mb-4">Company Profile</div>
              <h2 className="display-md text-steel-900 mb-8">
                Your Trusted Partner for Precision Hydraulic Press Solutions
              </h2>
              <div className="space-y-5 text-steel-600 leading-relaxed">
                {companyInfo.intro_en.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <figure className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-2xl shadow-steel-900/20">
                <Image
                  src="/images/factory/office.webp"
                  alt="LEAD company office building in Tengzhou, Shandong"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <figcaption className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-steel-950/90 to-transparent px-6 pb-5 pt-16">
                  <div className="text-white font-display font-semibold">LEAD Headquarters</div>
                  <div className="text-steel-300 text-sm mt-1">{companyInfo.contact.address}</div>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Key facts */}
      <section className="bg-steel-950 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {FACTS.map((f, i) => (
              <Reveal
                key={f.label}
                delay={i * 0.08}
                className={`py-10 lg:py-14 text-center ${i > 0 ? 'border-l border-white/10' : ''} ${i >= 2 ? 'border-t lg:border-t-0 border-white/10' : ''}`}
              >
                <div className="font-display text-3xl lg:text-5xl font-bold text-white tracking-tight">
                  <Counter value={f.value} suffix={f.suffix ?? ''} grouping={f.grouping} />
                </div>
                <div className="mt-2 text-xs lg:text-sm uppercase tracking-[0.18em] text-steel-400">{f.label}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Factory & equipment gallery */}
      <section className="py-20 lg:py-28 bg-steel-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-light bg-grid opacity-60 pointer-events-none" aria-hidden />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            overline="Factory & Equipment"
            title="Where Every LEAD Press Is Born"
            description="25,000+ m² of workshops equipped with CNC machining centers, flame cutting lines and dedicated welding and assembly areas."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {EQUIPMENT.map((p, i) => (
              <Reveal key={p.src} delay={(i % 3) * 0.08}>
                <figure className="relative aspect-[4/3] rounded-lg overflow-hidden group bg-steel-200">
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <figcaption className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-steel-950/90 to-transparent px-5 pb-4 pt-12 text-sm font-medium text-white">
                    {p.caption}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <Reveal className="lg:col-span-4">
              <div className="overline-label mb-4">Certifications</div>
              <h2 className="display-md text-steel-900 mb-6">Quality You Can Audit</h2>
              <p className="text-steel-600 leading-relaxed mb-6">
                LEAD operates under an ISO 9001 certified quality management system,
                re-audited every year. Each machine leaves the factory only after a
                documented 110% load test.
              </p>
              <ul className="space-y-3">
                {['ISO 9001 quality management system', 'Annual third-party audits', '110% load test before shipment', 'English documentation & test reports'].map((t) => (
                  <li key={t} className="flex items-center gap-3 text-sm text-steel-700">
                    <svg className="w-4 h-4 shrink-0 text-brand-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-4">
              <figure className="bg-steel-50 border border-steel-200 rounded-lg p-4 rotate-[-1deg] hover:rotate-0 transition-transform duration-500 shadow-xl shadow-steel-900/10">
                <div className="relative aspect-[7/10] bg-white rounded-sm overflow-hidden">
                  <Image
                    src="/images/certificates/iso-9001.webp"
                    alt="ISO 9001 quality management system certificate"
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="text-center text-xs text-steel-500 font-medium py-3">
                  ISO 9001 Certificate — 2025 Annual Audit
                </figcaption>
              </figure>
            </Reveal>
            <Reveal delay={0.18} className="lg:col-span-4">
              <div className="bg-steel-50 border border-steel-200 rounded-lg p-6">
                <div className="text-xs font-display font-semibold uppercase tracking-[0.22em] text-steel-500 mb-5">
                  Partner Network
                </div>
                <div className="relative aspect-[4/3] bg-white rounded-md border border-steel-200 overflow-hidden">
                  <Image
                    src="/images/certificates/partners.webp"
                    alt="Logos of LEAD partner companies"
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-contain p-4"
                  />
                </div>
                <p className="mt-5 text-sm text-steel-600 leading-relaxed">
                  Hydraulic, electrical and sealing components from globally trusted
                  suppliers — Rexroth, Yuken, Siemens, Schneider, NOK.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Exhibitions & customer visits */}
      <section className="py-20 lg:py-28 bg-steel-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-dark bg-grid opacity-30 pointer-events-none" aria-hidden />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            dark
            overline="Customers & Exhibitions"
            title="Meet Us in Tengzhou — or at Your Local Trade Show"
            description="Every year, buyers from 50+ countries visit our factory for machine inspection, training and partnership talks."
          />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
            {VISITS.map((p, i) => (
              <Reveal key={p.src + i} delay={(i % 4) * 0.06} className={i % 4 === 1 || i % 4 === 3 ? 'lg:mt-8' : ''}>
                <figure className="relative aspect-[4/5] rounded-lg overflow-hidden group">
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Markets */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            overline="Global Markets"
            title="Exporting to 50+ Countries and Regions"
            description="Dedicated export documentation, fumigation-free packing and door-to-door logistics support for every overseas order."
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {['South America', 'Russia & CIS', 'Middle East', 'Africa', 'Southeast Asia', 'Belt & Road'].map((market, i) => (
              <Reveal key={market} delay={i * 0.05}>
                <div className="h-full bg-steel-50 border border-steel-200 rounded-lg p-5 text-center hover:border-brand-400 hover:bg-white hover:shadow-lg hover:shadow-steel-900/5 transition-all">
                  <svg className="w-6 h-6 mx-auto mb-3 text-brand-600" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="font-display font-semibold text-sm text-steel-900">{market}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Packaging & shipment */}
      <section className="py-20 lg:py-28 bg-steel-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-light bg-grid opacity-60 pointer-events-none" aria-hidden />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            overline="Packaging & Shipment"
            title="From Our Floor to Your Port, Fully Protected"
            description="Anti-rust coating, steel-wire anchoring, and export-grade packing for every machine — documented with loading photos before departure."
          />
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {SHIPPING.map((p, i) => (
              <Reveal key={p.src} delay={(i % 3) * 0.08}>
                <figure className="relative aspect-[4/3] rounded-lg overflow-hidden group">
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes="(max-width: 640px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ full */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading overline="FAQ" title="Frequently Asked Questions" />
          <div className="space-y-3">
            {faqData.map((faq, idx) => (
              <Reveal key={idx} delay={Math.min(idx, 4) * 0.04}>
                <details className="group bg-steel-50 rounded-lg border border-steel-200 open:bg-white open:shadow-lg open:shadow-steel-900/5 transition-all">
                  <summary className="flex items-center justify-between gap-4 p-5 lg:p-6 cursor-pointer list-none">
                    <span className="font-display font-semibold text-steel-900 text-sm lg:text-base">{faq.q}</span>
                    <span className="shrink-0 w-8 h-8 inline-flex items-center justify-center rounded-full border border-steel-300 text-steel-500 group-open:bg-brand-600 group-open:border-brand-600 group-open:text-white transition-colors">
                      <svg className="w-4 h-4 transition-transform group-open:rotate-45" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-5 lg:px-6 pb-6 text-sm text-steel-600 leading-relaxed">{faq.a}</div>
                </details>
              </Reveal>
            ))}
          </div>
          <Reveal className="text-center mt-8">
            <Link href="/qa" className="text-sm font-semibold text-brand-600 hover:text-brand-700">
              More buyer questions in the Q&A center →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 lg:py-24 bg-brand-700 overflow-hidden">
        <div className="absolute inset-0 bg-grid-dark bg-grid opacity-20 pointer-events-none" aria-hidden />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="display-lg text-white">Let&apos;s Build Your Next Solution Together</h2>
            <p className="mt-6 text-lg text-white/80 max-w-2xl mx-auto">
              Contact us to discuss your press requirements, request a detailed
              quotation, or schedule a factory tour — virtual or in person.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="inline-flex items-center gap-3 bg-white text-brand-700 font-semibold px-8 py-4 rounded-sm hover:bg-steel-100 transition-colors">
                Contact Us
              </Link>
              <Link href="/products" className="inline-flex items-center gap-3 border border-white/40 text-white font-semibold px-8 py-4 rounded-sm hover:bg-white/10 transition-colors">
                Browse Products
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
