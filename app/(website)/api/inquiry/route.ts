import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'

export const dynamic = 'force-dynamic'

interface InquiryBody {
  name?: string
  email?: string
  country?: string
  productInterest?: string
  message?: string
}

export async function POST(request: NextRequest) {
  let body: InquiryBody
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request body' }, { status: 400 })
  }

  const name = (body.name ?? '').trim()
  const email = (body.email ?? '').trim()
  const message = (body.message ?? '').trim()

  if (!name || !email || !message) {
    return NextResponse.json({ ok: false, error: 'Name, email and message are required.' }, { status: 400 })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: 'Please provide a valid email address.' }, { status: 400 })
  }

  try {
    const payload = await getPayload({ config: configPromise })
    await payload.create({
      collection: 'inquiries',
      data: {
        name: name.slice(0, 200),
        email: email.slice(0, 200),
        country: (body.country ?? '').slice(0, 120),
        productInterest: (body.productInterest ?? '').slice(0, 200),
        message: message.slice(0, 5000),
      },
    })
  } catch (err) {
    // Graceful degradation: log and still acknowledge so the visitor is never stuck.
    console.error('[inquiry] failed to store submission:', err)
  }

  return NextResponse.json({
    ok: true,
    message: 'Thank you for your inquiry. Our engineers will reply within 24 hours.',
  })
}
