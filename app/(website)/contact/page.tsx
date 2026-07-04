import Link from 'next/link'
import companyInfo from '@/company_info.json'

export default function ContactPage() {
  return (
    <div>
      <section className="bg-steel-900 text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-steel-300 max-w-3xl">
            Ready to discuss your hydraulic press requirements? Our engineers are standing by to provide tailored solutions.
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-steel-900 mb-8">Get in Touch</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-brand-100 text-brand-600 rounded-lg flex items-center justify-center shrink-0">📧</div>
                  <div>
                    <div className="font-medium text-steel-900">Email</div>
                    <a href="mailto:sales@leadhyd.com" className="text-steel-600 hover:text-brand-600 transition-colors">sales@leadhyd.com</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-brand-100 text-brand-600 rounded-lg flex items-center justify-center shrink-0">📞</div>
                  <div>
                    <div className="font-medium text-steel-900">Phone / WhatsApp</div>
                    <div className="text-steel-600">+86-XXX-XXXX-XXXX</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-brand-100 text-brand-600 rounded-lg flex items-center justify-center shrink-0">📍</div>
                  <div>
                    <div className="font-medium text-steel-900">Address</div>
                    <div className="text-steel-600">{companyInfo.contact.address}</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-brand-100 text-brand-600 rounded-lg flex items-center justify-center shrink-0">🕐</div>
                  <div>
                    <div className="font-medium text-steel-900">Working Hours</div>
                    <div className="text-steel-600">Monday – Saturday: 8:00 AM – 6:00 PM (GMT+8)</div>
                  </div>
                </div>
              </div>

              <div className="mt-10 p-6 bg-steel-50 rounded-xl border border-steel-200">
                <h3 className="font-semibold text-steel-900 mb-3">Quick Response Promise</h3>
                <ul className="space-y-2 text-sm text-steel-600">
                  <li>• Standard inquiry: within 24 hours</li>
                  <li>• Technical consultation: within 12 hours</li>
                  <li>• Urgent support: within 4 hours</li>
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-xl border border-steel-200 p-6 lg:p-8">
              <h2 className="text-2xl font-bold text-steel-900 mb-2">Request a Quote</h2>
              <p className="text-steel-500 text-sm mb-6">Fill out the form below and we will get back to you shortly.</p>

              <form className="space-y-4" action="mailto:sales@leadhyd.com" method="post" encType="text/plain">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-steel-700 mb-1">Name</label>
                    <input type="text" name="name" className="w-full px-4 py-2.5 rounded-lg border border-steel-300 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-colors" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-steel-700 mb-1">Company</label>
                    <input type="text" name="company" className="w-full px-4 py-2.5 rounded-lg border border-steel-300 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-colors" placeholder="Your company" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-steel-700 mb-1">Email</label>
                  <input type="email" name="email" className="w-full px-4 py-2.5 rounded-lg border border-steel-300 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-colors" placeholder="you@company.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-steel-700 mb-1">Phone / WhatsApp</label>
                  <input type="tel" name="phone" className="w-full px-4 py-2.5 rounded-lg border border-steel-300 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-colors" placeholder="+1 234 567 8900" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-steel-700 mb-1">Product Interest</label>
                  <select name="product" className="w-full px-4 py-2.5 rounded-lg border border-steel-300 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-colors bg-white">
                    <option value="">Select a product type</option>
                    <option value="h-frame">H Frame Hydraulic Press</option>
                    <option value="four-column">Four Column Hydraulic Press</option>
                    <option value="door-embossing">Door Embossing Machine</option>
                    <option value="custom">Custom Solution</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-steel-700 mb-1">Requirements</label>
                  <textarea name="requirements" rows={4} className="w-full px-4 py-2.5 rounded-lg border border-steel-300 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-colors resize-none" placeholder="Please describe your application, required tonnage, and any special requirements..."></textarea>
                </div>
                <button type="submit" className="w-full px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-lg transition-colors">
                  Send Inquiry
                </button>
                <p className="text-xs text-steel-400 text-center">
                  By submitting, you agree to receive follow-up communications from LEAD.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
