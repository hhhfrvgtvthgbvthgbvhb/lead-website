import Link from 'next/link'
import Reveal from '@/components/motion/Reveal'
import SectionHeading from '@/components/SectionHeading'

interface FaqCtaProps {
  faqs: Array<{ q: string; a: string }>
}

export default function FaqCta({ faqs }: FaqCtaProps) {
  return (
    <>
      {/* FAQ preview */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            overline="FAQ"
            title="Questions Buyers Ask Us"
            description="Straight answers before you send an inquiry."
          />
          <div className="space-y-3">
            {faqs.slice(0, 4).map((faq, idx) => (
              <Reveal key={idx} delay={idx * 0.05}>
                <details className="group bg-steel-50 rounded-lg border border-steel-200 open:bg-white open:shadow-lg open:shadow-steel-900/5 transition-all">
                  <summary className="flex items-center justify-between gap-4 p-5 lg:p-6 cursor-pointer list-none">
                    <span className="font-display font-semibold text-steel-900 text-sm lg:text-base">{faq.q}</span>
                    <span className="shrink-0 w-8 h-8 inline-flex items-center justify-center rounded-full border border-steel-300 text-steel-500 group-open:bg-brand-600 group-open:border-brand-600 group-open:text-white transition-colors">
                      <svg className="w-4 h-4 transition-transform group-open:rotate-45" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-5 lg:px-6 pb-6 text-sm text-steel-600 leading-relaxed">
                    {faq.a}
                  </div>
                </details>
              </Reveal>
            ))}
          </div>
          <Reveal className="text-center mt-8">
            <Link href="/qa" className="text-sm font-semibold text-brand-600 hover:text-brand-700">
              Browse all answers in the Q&A center →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* CTA band */}
      <section className="relative py-20 lg:py-28 bg-brand-700 overflow-hidden">
        <div className="absolute inset-0 bg-grid-dark bg-grid opacity-20 pointer-events-none" aria-hidden />
        <div className="absolute -right-32 -top-32 w-96 h-96 rounded-full bg-brand-600/50 blur-3xl pointer-events-none" aria-hidden />
        <div className="absolute -left-32 -bottom-32 w-96 h-96 rounded-full bg-brand-800/60 blur-3xl pointer-events-none" aria-hidden />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="display-lg text-white max-w-3xl mx-auto">
              Ready to Put LEAD Pressure on Your Production Line?
            </h2>
            <p className="mt-6 text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
              Send us your part drawings or production targets — our engineers reply
              with a machine recommendation and quotation within 24 hours.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-white text-brand-700 font-semibold px-8 py-4 rounded-sm hover:bg-steel-100 transition-colors"
              >
                Request a Quote
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center gap-3 border border-white/40 text-white font-semibold px-8 py-4 rounded-sm hover:bg-white/10 transition-colors"
              >
                Browse Products
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
