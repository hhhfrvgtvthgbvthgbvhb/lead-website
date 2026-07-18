'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'

interface ProductGalleryProps {
  images: string[]
  alt: string
}

export default function ProductGallery({ images, alt }: ProductGalleryProps) {
  const [active, setActive] = useState(0)
  const [lightbox, setLightbox] = useState(false)

  const next = useCallback(() => setActive((a) => (a + 1) % images.length), [images.length])
  const prev = useCallback(() => setActive((a) => (a - 1 + images.length) % images.length), [images.length])

  useEffect(() => {
    if (!lightbox) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(false)
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [lightbox, next, prev])

  if (images.length === 0) {
    return (
      <div className="aspect-[4/3] bg-steel-100 rounded-lg flex items-center justify-center text-steel-400">
        [Product Image]
      </div>
    )
  }

  return (
    <div>
      {/* Main image */}
      <button
        type="button"
        onClick={() => setLightbox(true)}
        className="block w-full aspect-[4/3] bg-steel-100 rounded-lg overflow-hidden relative group cursor-zoom-in"
        aria-label="Open image viewer"
      >
        <Image
          src={images[active]}
          alt={alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute bottom-4 right-4 inline-flex items-center gap-2 bg-steel-950/80 text-white text-xs font-medium px-3 py-1.5 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
          </svg>
          Click to enlarge
        </span>
      </button>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-5 gap-2">
          {images.slice(0, 5).map((src, idx) => (
            <button
              key={src + idx}
              type="button"
              onClick={() => setActive(idx)}
              aria-label={`View image ${idx + 1}`}
              className={`aspect-square bg-steel-100 rounded-md relative overflow-hidden border-2 transition-colors ${
                idx === active ? 'border-brand-600' : 'border-transparent hover:border-steel-300'
              }`}
            >
              <Image src={src} alt="" fill sizes="120px" className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-steel-950/95 backdrop-blur flex items-center justify-center p-4"
          onClick={() => setLightbox(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Product image viewer"
        >
          <button
            type="button"
            onClick={() => setLightbox(false)}
            aria-label="Close viewer"
            className="absolute top-5 right-5 w-11 h-11 rounded-full border border-white/25 text-white flex items-center justify-center hover:bg-white/10"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); prev() }}
                aria-label="Previous image"
                className="absolute left-4 lg:left-8 w-11 h-11 rounded-full border border-white/25 text-white flex items-center justify-center hover:bg-white/10 z-10"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); next() }}
                aria-label="Next image"
                className="absolute right-4 lg:right-8 w-11 h-11 rounded-full border border-white/25 text-white flex items-center justify-center hover:bg-white/10 z-10"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
          <div className="relative w-full max-w-5xl aspect-[4/3]" onClick={(e) => e.stopPropagation()}>
            <Image src={images[active]} alt={alt} fill sizes="90vw" className="object-contain" />
          </div>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm font-display">
            {active + 1} / {images.length}
          </div>
        </div>
      )}
    </div>
  )
}
