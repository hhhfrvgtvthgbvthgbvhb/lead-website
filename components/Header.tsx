import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-steel-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl lg:text-2xl font-bold text-brand-700 tracking-tight">LEAD</span>
            <span className="hidden sm:inline text-sm text-steel-500 font-medium">Hydraulic Press</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-steel-700 hover:text-brand-600 transition-colors">Home</Link>
            <Link href="/about" className="text-sm font-medium text-steel-700 hover:text-brand-600 transition-colors">About</Link>
            <Link href="/products" className="text-sm font-medium text-steel-700 hover:text-brand-600 transition-colors">Products</Link>
            <Link href="/news" className="text-sm font-medium text-steel-700 hover:text-brand-600 transition-colors">News</Link>
            <Link href="/contact" className="text-sm font-medium text-steel-700 hover:text-brand-600 transition-colors">Contact</Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a href="mailto:sales@leadhyd.com" className="text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors">
              Get Quote
            </a>
          </div>

          <MobileMenu />
        </div>
      </div>
    </header>
  )
}

function MobileMenu() {
  return (
    <div className="md:hidden">
      <details className="group">
        <summary className="list-none cursor-pointer p-2 text-steel-700 hover:text-brand-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </summary>
        <div className="absolute right-0 top-16 w-56 bg-white border border-steel-200 rounded-lg shadow-lg p-4 mt-2 mr-4">
          <nav className="flex flex-col gap-3">
            <Link href="/" className="text-sm font-medium text-steel-700 hover:text-brand-600">Home</Link>
            <Link href="/about" className="text-sm font-medium text-steel-700 hover:text-brand-600">About</Link>
            <Link href="/products" className="text-sm font-medium text-steel-700 hover:text-brand-600">Products</Link>
            <Link href="/news" className="text-sm font-medium text-steel-700 hover:text-brand-600">News</Link>
            <Link href="/contact" className="text-sm font-medium text-steel-700 hover:text-brand-600">Contact</Link>
          </nav>
        </div>
      </details>
    </div>
  )
}
