import type { Metadata } from 'next'
import Link from 'next/link'
import qaData from '@/qa.json'
import Reveal from '@/components/motion/Reveal'
import SectionHeading from '@/components/SectionHeading'

export const metadata: Metadata = {
  title: 'Q&A — Hydraulic Press Buying Guide & Help Center',
  description:
    'Answers international buyers ask LEAD: warranty, payment terms (T/T), shipping terms (FOB/CIF), lead time, installation, voltage customization, spare parts, HS code and factory visits.',
}

const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: qaData.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
}

export default function QaPage() {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Hero band */}
      <section className="relative bg-steel-950 overflow-hidden">
        <div className="absolute inset-0 bg-grid-dark bg-grid opacity-30" aria-hidden />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 lg:pt-44 pb-14 lg:pb-20">
          <Reveal>
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-12 bg-brand-500" aria-hidden />
              <span className="overline-label">Help Center</span>
            </div>
            <h1 className="display-lg text-white">Questions & Answers</h1>
            <p className="mt-5 text-lg text-steel-400 max-w-2xl leading-relaxed">
              Everything international buyers ask before ordering a LEAD hydraulic
              press — warranty, payment, shipping, installation, and after-sales support.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-steel-50 relative">
        <div className="absolute inset-0 bg-grid-light bg-grid opacity-60 pointer-events-none" aria-hidden />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-3">
            {qaData.map((item, idx) => (
              <Reveal key={idx} delay={Math.min(idx, 5) * 0.04}>
                <details className="group bg-white rounded-lg border border-steel-200 open:shadow-lg open:shadow-steel-900/5 transition-all">
                  <summary className="flex items-center justify-between gap-4 p-5 lg:p-6 cursor-pointer list-none">
                    <span className="flex items-start gap-4">
                      <span className="hidden sm:inline-flex shrink-0 font-display text-sm font-bold text-brand-600 bg-brand-50 rounded-sm px-2 py-0.5 mt-0.5">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className="font-display font-semibold text-steel-900 text-sm lg:text-base">
                        {item.q}
                      </span>
                    </span>
                    <span className="shrink-0 w-8 h-8 inline-flex items-center justify-center rounded-full border border-steel-300 text-steel-500 group-open:bg-brand-600 group-open:border-brand-600 group-open:text-white transition-colors">
                      <svg className="w-4 h-4 transition-transform group-open:rotate-45" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-5 lg:px-6 pb-6 text-sm text-steel-600 leading-relaxed sm:pl-[4.25rem]">
                    {item.a}
                  </div>
                </details>
              </Reveal>
            ))}
          </div>

          {/* CTA */}
          <Reveal className="mt-12">
            <div className="bg-steel-950 rounded-lg p-8 lg:p-10 text-center">
              <h2 className="font-display text-2xl font-bold text-white mb-3">
                Didn&apos;t find your answer?
              </h2>
              <p className="text-steel-400 mb-8 max-w-lg mx-auto">
                Send us your question — a LEAD engineer replies within 24 hours.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-brand-600 hover:bg-brand-500 text-white font-semibold px-8 py-4 rounded-sm transition-colors"
              >
                Ask a Question
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
