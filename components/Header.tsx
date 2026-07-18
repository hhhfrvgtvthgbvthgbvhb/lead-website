'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/products', label: 'Products' },
  { href: '/news', label: 'News' },
  { href: '/qa', label: 'Q&A' },
  { href: '/contact', label: 'Contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-steel-950/95 backdrop-blur-md shadow-lg shadow-black/20 border-b border-white/10'
          : 'bg-gradient-to-b from-black/50 to-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0" aria-label="LEAD home">
            <Image
              src="/images/brand/logo-white.webp"
              alt="LEAD Industrial Equipment"
              width={120}
              height={48}
              priority
              className="h-8 lg:h-10 w-auto"
            />
            <span className="hidden xl:block h-6 w-px bg-white/25" aria-hidden />
            <span className="hidden xl:block text-[11px] leading-tight font-medium tracking-[0.18em] uppercase text-white/70">
              Hydraulic Press
              <br />
              Machinery
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Main navigation">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-3 lg:px-4 py-2 text-sm font-medium tracking-wide transition-colors ${
                  isActive(item.href) ? 'text-white' : 'text-white/65 hover:text-white'
                }`}
              >
                {item.label}
                <span
                  className={`absolute inset-x-3 lg:inset-x-4 -bottom-0.5 h-0.5 bg-brand-500 transition-transform duration-300 origin-left ${
                    isActive(item.href) ? 'scale-x-100' : 'scale-x-0'
                  }`}
                  aria-hidden
                />
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold px-5 py-2.5 rounded-sm transition-colors"
            >
              Get a Quote
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="md:hidden p-2 text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height] duration-500 ease-in-out ${
          open ? 'max-h-[420px]' : 'max-h-0'
        } bg-steel-950/98 backdrop-blur-md border-t border-white/10`}
      >
        <nav className="px-6 py-6 flex flex-col gap-1" aria-label="Mobile navigation">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`py-3 text-base font-medium border-b border-white/5 transition-colors ${
                isActive(item.href) ? 'text-brand-400' : 'text-white/80 hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="mt-4 inline-flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold px-5 py-3 rounded-sm transition-colors"
          >
            Get a Quote
          </Link>
        </nav>
      </div>
    </header>
  )
}
