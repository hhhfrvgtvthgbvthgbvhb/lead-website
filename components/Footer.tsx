import Link from 'next/link'
import Image from 'next/image'

const PRODUCT_LINKS = [
  { href: '/products/category/h-frame', label: 'H Frame Hydraulic Press' },
  { href: '/products/category/four-column', label: 'Four Column Hydraulic Press' },
  { href: '/products/category/single-column', label: 'Single Column Hydraulic Press' },
  { href: '/products/category/door-embossing', label: 'Door Panel Embossing Machine' },
  { href: '/products', label: 'All Products' },
]

const COMPANY_LINKS = [
  { href: '/about', label: 'About LEAD' },
  { href: '/news', label: 'News & Events' },
  { href: '/contact', label: 'Contact Us' },
  { href: '/contact', label: 'Request a Quote' },
  { href: '/admin', label: 'Admin Login' },
]

export default function Footer() {
  return (
    <footer className="bg-steel-950 text-steel-300 relative overflow-hidden">
      {/* faint blueprint grid */}
      <div className="absolute inset-0 bg-grid-dark bg-grid opacity-40 pointer-events-none" aria-hidden />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 lg:pt-20 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Image
              src="/images/brand/logo-white.webp"
              alt="LEAD Industrial Equipment"
              width={140}
              height={56}
              className="h-10 w-auto mb-6"
            />
            <p className="text-sm text-steel-400 leading-relaxed max-w-sm">
              Shandong LEAD Industrial Equipment Technology Co., Ltd. — professional
              hydraulic press manufacturer since 2006, delivering precision forming
              equipment to manufacturers in 50+ countries.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-white/80 border border-white/15 rounded-sm px-3 py-1.5">
                <svg className="w-3.5 h-3.5 text-brand-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                ISO 9001 Certified
              </span>
              <span className="inline-flex items-center text-xs font-semibold tracking-wider uppercase text-white/80 border border-white/15 rounded-sm px-3 py-1.5">
                CE Compliant
              </span>
            </div>
          </div>

          {/* Products */}
          <div className="lg:col-span-3">
            <h4 className="font-display text-sm font-semibold text-white uppercase tracking-[0.2em] mb-5">
              Products
            </h4>
            <ul className="space-y-2.5">
              {PRODUCT_LINKS.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-steel-400 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <h4 className="font-display text-sm font-semibold text-white uppercase tracking-[0.2em] mb-5">
              Company
            </h4>
            <ul className="space-y-2.5">
              {COMPANY_LINKS.map((l, i) => (
                <li key={`${l.label}-${i}`}>
                  <Link href={l.href} className="text-sm text-steel-400 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h4 className="font-display text-sm font-semibold text-white uppercase tracking-[0.2em] mb-5">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-steel-400">
              <li className="flex gap-3">
                <svg className="w-4 h-4 mt-0.5 shrink-0 text-brand-500" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:zhongjie@lead-group.cn" className="hover:text-white transition-colors">
                  zhongjie@lead-group.cn
                </a>
              </li>
              <li className="flex gap-3">
                <svg className="w-4 h-4 mt-0.5 shrink-0 text-brand-500" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>
                  No. 998 Zhenxing North Road,
                  <br />
                  Tengzhou, Zaozhuang,
                  <br />
                  Shandong Province, China
                </span>
              </li>
              <li className="flex gap-3">
                <svg className="w-4 h-4 mt-0.5 shrink-0 text-brand-500" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Response within 24 hours</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-14 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-steel-500 text-center md:text-left">
            © {new Date().getFullYear()} Shandong LEAD Industrial Equipment Technology Co., Ltd. All rights reserved.
          </p>
          <p className="text-xs text-steel-500 tracking-wide">
            Precision Forging Pressure — Quality LEADing the Future
          </p>
        </div>
      </div>
    </footer>
  )
}
