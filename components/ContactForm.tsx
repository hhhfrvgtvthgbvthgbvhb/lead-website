'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'

const PRODUCT_OPTIONS = [
  'H Frame Hydraulic Press',
  'Four Column Hydraulic Press',
  'Single Column Hydraulic Press',
  'Door Panel Embossing Machine',
  'Custom / Other Solution',
]

type Status = 'idle' | 'submitting' | 'success' | 'error'

export default function ContactForm() {
  const searchParams = useSearchParams()
  const prefill = searchParams.get('product') ?? ''

  const [form, setForm] = useState({
    name: '',
    email: '',
    country: '',
    productInterest: prefill,
    message: prefill ? `I would like a quotation for: ${prefill}\n\n` : '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<Status>('idle')

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [key]: e.target.value }))
    setErrors((err) => ({ ...err, [key]: '' }))
  }

  const validate = () => {
    const err: Record<string, string> = {}
    if (!form.name.trim()) err.name = 'Please enter your name'
    if (!form.email.trim()) err.email = 'Please enter your email'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) err.email = 'Please enter a valid email address'
    if (!form.message.trim()) err.message = 'Please tell us about your requirements'
    setErrors(err)
    return Object.keys(err).length === 0
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setStatus('submitting')
    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Request failed')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-steel-950 rounded-lg p-8 lg:p-12 text-center h-full flex flex-col items-center justify-center min-h-[420px]">
        <span className="w-16 h-16 rounded-full bg-brand-600 flex items-center justify-center mb-6">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </span>
        <h3 className="font-display text-2xl font-bold text-white mb-3">Inquiry Received</h3>
        <p className="text-steel-400 leading-relaxed max-w-sm">
          Thank you, {form.name.split(' ')[0]}. Our engineers will review your
          requirements and reply to <span className="text-white">{form.email}</span> within 24 hours.
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus('idle')
            setForm({ name: '', email: '', country: '', productInterest: '', message: '' })
          }}
          className="mt-8 text-sm font-semibold text-brand-400 hover:text-brand-300"
        >
          Send another inquiry →
        </button>
      </div>
    )
  }

  const inputCls = (hasError: boolean) =>
    `w-full px-4 py-3 rounded-sm bg-white/5 border text-white placeholder:text-steel-500 outline-none transition-colors focus:border-brand-500 focus:bg-white/10 ${
      hasError ? 'border-brand-500' : 'border-white/15'
    }`

  return (
    <form onSubmit={onSubmit} noValidate className="bg-steel-950 rounded-lg p-6 lg:p-10">
      <h2 className="font-display text-2xl font-bold text-white mb-2">Request a Quote</h2>
      <p className="text-sm text-steel-400 mb-8">
        Tell us about your application — we reply within 24 hours with a machine
        recommendation and pricing.
      </p>

      <div className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="cf-name" className="block text-xs font-semibold uppercase tracking-[0.14em] text-steel-400 mb-2">
              Name *
            </label>
            <input id="cf-name" type="text" value={form.name} onChange={set('name')} className={inputCls(!!errors.name)} placeholder="Your full name" />
            {errors.name && <p className="mt-1.5 text-xs text-brand-400">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="cf-email" className="block text-xs font-semibold uppercase tracking-[0.14em] text-steel-400 mb-2">
              Email *
            </label>
            <input id="cf-email" type="email" value={form.email} onChange={set('email')} className={inputCls(!!errors.email)} placeholder="you@company.com" />
            {errors.email && <p className="mt-1.5 text-xs text-brand-400">{errors.email}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="cf-country" className="block text-xs font-semibold uppercase tracking-[0.14em] text-steel-400 mb-2">
              Country
            </label>
            <input id="cf-country" type="text" value={form.country} onChange={set('country')} className={inputCls(false)} placeholder="e.g. Brazil" />
          </div>
          <div>
            <label htmlFor="cf-product" className="block text-xs font-semibold uppercase tracking-[0.14em] text-steel-400 mb-2">
              Product Interest
            </label>
            <select id="cf-product" value={form.productInterest} onChange={set('productInterest')} className={`${inputCls(false)} appearance-none`}>
              <option value="" className="bg-steel-900">Select a product type</option>
              {PRODUCT_OPTIONS.map((o) => (
                <option key={o} value={o} className="bg-steel-900">
                  {o}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="cf-message" className="block text-xs font-semibold uppercase tracking-[0.14em] text-steel-400 mb-2">
            Your Requirements *
          </label>
          <textarea
            id="cf-message"
            rows={5}
            value={form.message}
            onChange={set('message')}
            className={`${inputCls(!!errors.message)} resize-none`}
            placeholder="Material, part size, required tonnage, production volume, delivery port…"
          />
          {errors.message && <p className="mt-1.5 text-xs text-brand-400">{errors.message}</p>}
        </div>

        {status === 'error' && (
          <p className="text-sm text-brand-400 bg-brand-950/60 border border-brand-800 rounded-sm px-4 py-3">
            Something went wrong sending your inquiry. Please email us directly at{' '}
            <a href="mailto:zhongjie@lead-group.cn" className="underline">zhongjie@lead-group.cn</a>.
          </p>
        )}

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full inline-flex items-center justify-center gap-3 bg-brand-600 hover:bg-brand-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold px-8 py-4 rounded-sm transition-colors"
        >
          {status === 'submitting' ? 'Sending…' : 'Send Inquiry'}
          {status !== 'submitting' && (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          )}
        </button>
        <p className="text-xs text-steel-500 text-center">
          By submitting, you agree to receive follow-up communications from LEAD.
        </p>
      </div>
    </form>
  )
}
