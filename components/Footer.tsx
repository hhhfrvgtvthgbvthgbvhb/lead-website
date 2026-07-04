import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-steel-900 text-steel-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div>
            <h3 className="text-lg font-bold text-white mb-4">LEAD</h3>
            <p className="text-sm text-steel-400 leading-relaxed">
              Professional hydraulic press manufacturer since 2006. Serving global markets with precision engineering and reliable industrial solutions.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Products</h4>
            <ul className="space-y-2">
              <li><Link href="/products?category=h-frame" className="text-sm hover:text-white transition-colors">H Frame Press</Link></li>
              <li><Link href="/products?category=four-column" className="text-sm hover:text-white transition-colors">Four Column Press</Link></li>
              <li><Link href="/products?category=door-embossing" className="text-sm hover:text-white transition-colors">Door Embossing</Link></li>
              <li><Link href="/products" className="text-sm hover:text-white transition-colors">All Products</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/news" className="text-sm hover:text-white transition-colors">News</Link></li>
              <li><Link href="/contact" className="text-sm hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/admin" className="text-sm hover:text-white transition-colors">Admin Login</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="text-sm">sales@leadhyd.com</li>
              <li className="text-sm">+86-XXX-XXXX-XXXX</li>
              <li className="text-sm">Tengzhou, Shandong, China</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-steel-800 mt-12 pt-8 text-center text-sm text-steel-500">
          <p>© {new Date().getFullYear()} LEAD Hydraulic Press Machinery. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
