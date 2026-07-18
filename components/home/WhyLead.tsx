import Reveal from '@/components/motion/Reveal'
import SectionHeading from '@/components/SectionHeading'

const ADVANTAGES = [
  {
    title: 'OEM / ODM Engineering',
    desc: 'Full customization of tonnage, stroke, table size, and control systems. Engineering drawings within 24 hours of your inquiry.',
    icon: (
      <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085" />
      </svg>
    ),
  },
  {
    title: 'Premium Components',
    desc: 'Rexroth and Yuken hydraulics, Siemens and Schneider electrics, NOK and Merkel seals — components your maintenance team already trusts.',
    icon: (
      <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    ),
  },
  {
    title: '110% Load Testing',
    desc: 'Every machine runs 30 minutes at 110% rated tonnage before crating. ISO 9001 quality system audited annually with zero non-conformities.',
    icon: (
      <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: 'Global Service Network',
    desc: 'Online video guidance, on-site installation and commissioning, and authorized technicians across South America, Russia, Middle East and Africa.',
    icon: (
      <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
]

export default function WhyLead() {
  return (
    <section className="py-20 lg:py-28 bg-steel-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-dark bg-grid opacity-40 pointer-events-none" aria-hidden />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          dark
          overline="Why LEAD"
          title="Engineered Like a Multinational. Priced Like a Partner."
          description="Manufacturers across South America, Russia, the Middle East, Africa and Belt & Road countries run LEAD presses on their production floors."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-lg overflow-hidden">
          {ADVANTAGES.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08} className="bg-steel-950">
              <div className="h-full p-8 hover:bg-steel-900 transition-colors duration-300 group">
                <div className="text-brand-500 mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-0.5">
                  {item.icon}
                </div>
                <h3 className="font-display text-lg font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-sm text-steel-400 leading-relaxed">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
