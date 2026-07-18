import type { Metadata } from 'next'
import { Suspense } from 'react'
import companyInfo from '@/company_info.json'
import Reveal from '@/components/motion/Reveal'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact Us — Request a Quote',
  description:
    'Contact LEAD for hydraulic press quotations, technical consultation and factory tours. Engineers reply within 24 hours. Factory in Tengzhou, Shandong, China.',
}

const INFO = [
  {
    label: 'Email',
    value: companyInfo.contact.email,
    href: `mailto:${companyInfo.contact.email}`,
    icon: (
      <svg fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: 'Phone / WhatsApp',
    value: companyInfo.contact.phone,
    note: 'Replace with your live number',
    icon: (
      <svg fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
  {
    label: 'Factory Address',
    value: companyInfo.contact.address,
    icon: (
      <svg fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    label: 'Working Hours',
    value: 'Monday – Saturday, 8:00 – 18:00 (GMT+8)',
    icon: (
      <svg fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
]

export default function ContactPage() {
  return (
    <div>
      {/* Hero band */}
      <section className="relative bg-steel-950 overflow-hidden">
        <div className="absolute inset-0 bg-grid-dark bg-grid opacity-30" aria-hidden />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 lg:pt-44 pb-14 lg:pb-20">
          <Reveal>
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-12 bg-brand-500" aria-hidden />
              <span className="overline-label">Contact</span>
            </div>
            <h1 className="display-lg text-white">Let&apos;s Talk About Your Next Press</h1>
            <p className="mt-5 text-lg text-steel-400 max-w-2xl leading-relaxed">
              Send your drawings or production targets — a LEAD engineer replies with a
              machine recommendation and quotation within 24 hours.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-steel-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-light bg-grid opacity-60 pointer-events-none" aria-hidden />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            {/* Info column */}
            <div className="lg:col-span-5 space-y-4">
              {INFO.map((item, i) => (
                <Reveal key={item.label} delay={i * 0.06}>
                  <div className="flex items-start gap-4 bg-white border border-steel-200 rounded-lg p-5 hover:border-brand-300 transition-colors">
                    <span className="w-11 h-11 shrink-0 rounded-sm bg-steel-950 text-brand-500 flex items-center justify-center">
                      {item.icon}
                    </span>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-[0.16em] text-steel-500 mb-1">
                        {item.label}
                      </div>
                      {item.href ? (
                        <a href={item.href} className="font-medium text-steel-900 hover:text-brand-600 transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <div className="font-medium text-steel-900">{item.value}</div>
                      )}
                      {item.note && <div className="text-xs text-steel-400 mt-0.5">({item.note})</div>}
                    </div>
                  </div>
                </Reveal>
              ))}

              <Reveal delay={0.28}>
                <div className="bg-steel-950 rounded-lg p-6 lg:p-8">
                  <h3 className="font-display font-semibold text-white mb-4">Response-Time Promise</h3>
                  <ul className="space-y-3">
                    {[
                      ['Standard inquiry', 'within 24 hours'],
                      ['Technical consultation', 'within 12 hours'],
                      ['Urgent after-sales support', 'within 4 hours'],
                    ].map(([k, v]) => (
                      <li key={k} className="flex items-center justify-between gap-4 text-sm border-b border-white/10 pb-3 last:border-0 last:pb-0">
                        <span className="text-steel-400">{k}</span>
                        <span className="font-display font-semibold text-brand-400 whitespace-nowrap">{v}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {['South America', 'Russia', 'Middle East', 'Africa', 'Southeast Asia'].map((m) => (
                      <span key={m} className="text-[11px] font-medium uppercase tracking-wider text-steel-300 border border-white/15 rounded-sm px-2.5 py-1">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Form column */}
            <Reveal delay={0.1} className="lg:col-span-7">
              <Suspense fallback={<div className="bg-steel-950 rounded-lg min-h-[420px]" />}>
                <ContactForm />
              </Suspense>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  )
}
