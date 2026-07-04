import Image from 'next/image'
import companyInfo from '@/company_info.json'
import faqData from '@/faq.json'

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-steel-900 text-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">About LEAD</h1>
          <p className="text-xl text-steel-300 max-w-3xl">
            {companyInfo.slogan}
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-steel-900 mb-6">Company Profile</h2>
              <div className="space-y-4 text-steel-600 leading-relaxed">
                <p>
                  LEAD Hydraulic Press Machinery (力得液压机械) is a professional manufacturer of industrial hydraulic presses, headquartered in Tengzhou, Shandong Province — China’s renowned hydraulic press manufacturing base.
                </p>
                <p>
                  Since our establishment in 2006, we have dedicated ourselves to designing, manufacturing, and servicing high-quality hydraulic presses for global markets. Our product range covers H-frame hydraulic presses, four-column hydraulic presses, and specialized door panel embossing machines with capacities from 25 tons to 4,500 tons.
                </p>
                <p>
                  We proudly serve clients across South America, Russia, the Middle East, Africa, and Belt & Road countries. All our machines are manufactured under ISO 9001 quality management systems, ensuring reliability and precision that our customers depend on.
                </p>
              </div>
            </div>
            <div className="bg-steel-100 rounded-2xl aspect-[4/3] relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-steel-400 text-lg font-medium">
                [Factory Photo]
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Facts */}
      <section className="py-16 bg-steel-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: 'Founded', value: companyInfo.established },
              { label: 'Factory Area', value: companyInfo.factory_size },
              { label: 'Employees', value: companyInfo.employees },
              { label: 'Certification', value: 'ISO 9001' },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <div className="text-3xl font-bold text-brand-700 mb-2">{item.value}</div>
                <div className="text-sm text-steel-500">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Markets */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-steel-900 mb-4">Global Markets</h2>
            <p className="text-steel-600 max-w-2xl mx-auto">We export to over 50 countries and regions, with dedicated support for emerging markets.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {companyInfo.markets.map((market) => (
              <div key={market} className="bg-white border border-steel-200 rounded-xl p-6 text-center hover:border-brand-300 transition-colors">
                <div className="text-2xl mb-2">🌐</div>
                <div className="font-medium text-steel-900">{market}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 lg:py-24 bg-steel-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Services</h2>
            <p className="text-steel-400 max-w-2xl mx-auto">Beyond manufacturing, we provide end-to-end support to ensure your success.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {companyInfo.services.map((service, idx) => (
              <div key={idx} className="bg-steel-800/50 rounded-xl p-6 border border-steel-700">
                <div className="w-10 h-10 bg-brand-600 rounded-lg flex items-center justify-center text-lg font-bold mb-4">{idx + 1}</div>
                <h3 className="text-lg font-semibold mb-2">{service}</h3>
                <p className="text-sm text-steel-400">
                  {idx === 0 && 'Tailored machine designs to match your exact production requirements.'}
                  {idx === 1 && 'From concept to production-ready machine in 30-45 days.'}
                  {idx === 2 && 'Remote guidance and on-site technical support worldwide.'}
                  {idx === 3 && 'Quick delivery of seals, valves, and wear parts within 48 hours.'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Full */}
      <section className="py-16 lg:py-24 bg-steel-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-steel-900 mb-4">FAQ</h2>
          </div>
          <div className="space-y-4">
            {faqData.map((faq, idx) => (
              <details key={idx} className="group bg-white rounded-lg border border-steel-200 open:shadow-sm transition-shadow">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <span className="font-medium text-steel-900 pr-4">{faq.q}</span>
                  <span className="text-steel-400 group-open:rotate-180 transition-transform shrink-0">▼</span>
                </summary>
                <div className="px-6 pb-6 text-steel-600 leading-relaxed text-sm">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
