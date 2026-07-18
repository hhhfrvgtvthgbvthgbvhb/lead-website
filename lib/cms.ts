/**
 * Server-side data layer.
 * Every getter tries the Payload CMS database first and gracefully falls
 * back to the static JSON files at the project root, so the site always
 * renders even when the database is empty or unreachable.
 */
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import productsJson from '@/products.json'
import newsJson from '@/news.json'

export interface ProductView {
  id: number
  name_en: string
  name_cn: string
  category_en: string
  description_en: string
  seo_keywords: string
  hero_image: string
  all_images: string[]
  specs: string
}

export interface NewsView {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  date: string
}

export const CATEGORY_LABELS: Record<string, string> = {
  'h-frame': 'H Frame Hydraulic Press',
  'four-column': 'Four Column Hydraulic Press',
  'door-embossing': 'Door Panel Embossing Machine',
  'single-column': 'Single Column Hydraulic Press',
}

const NEWS_CATEGORY_LABELS: Record<string, string> = {
  'company-news': 'Company News',
  'industry-news': 'Industry News',
  exhibition: 'Exhibition',
  'product-launch': 'Product Launch',
}

/** Extract plain text from a Payload Lexical rich-text value. */
function lexicalToText(richText: unknown): string {
  try {
    const root = (richText as { root?: { children?: unknown[] } })?.root
    if (!root?.children) return ''
    const lines: string[] = []
    const walk = (node: unknown): string => {
      const n = node as { type?: string; text?: string; children?: unknown[] }
      if (n.type === 'text' && typeof n.text === 'string') return n.text
      return (n.children ?? []).map(walk).join('')
    }
    for (const child of root.children) {
      lines.push(walk(child))
    }
    return lines.filter(Boolean).join('\n')
  } catch {
    return ''
  }
}

function jsonProducts(): ProductView[] {
  return (productsJson as unknown as ProductView[]).map((p) => ({ ...p }))
}

function jsonNews(): NewsView[] {
  return (newsJson as unknown as Array<Record<string, string>>).map((n, i) => ({
    id: String(i + 1),
    title: n.title,
    slug: n.slug,
    excerpt: n.excerpt,
    content: n.content,
    category: NEWS_CATEGORY_LABELS[n.category] ?? n.category,
    date: (n.publishedAt ?? '').slice(0, 10),
  }))
}

async function fetchCmsProducts(): Promise<ProductView[]> {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'products',
    where: { status: { equals: 'published' } },
    limit: 500,
    depth: 0,
    sort: '-tonnage',
  })
  return docs.map((doc) => {
    const d = doc as unknown as Record<string, unknown>
    const id = Number(d.slug)
    return {
      id,
      name_en: String(d.name_en ?? ''),
      name_cn: String(d.name_cn ?? ''),
      category_en: CATEGORY_LABELS[String(d.category)] ?? String(d.category ?? ''),
      description_en: String(d.shortDescription ?? ''),
      seo_keywords: String(d.seoKeywords ?? ''),
      hero_image: `/images/products/${id}/hero.webp`,
      all_images: [
        `/images/products/${id}/hero.webp`,
        ...((d.gallery as unknown[]) ?? []).map((_, i) => `/images/products/${id}/gallery-${i}.webp`),
      ],
      specs: lexicalToText(d.description),
    }
  })
}

async function fetchCmsNews(): Promise<NewsView[]> {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'news',
    where: { status: { equals: 'published' } },
    limit: 100,
    depth: 0,
    sort: '-publishedAt',
  })
  return docs.map((doc) => {
    const d = doc as unknown as Record<string, unknown>
    return {
      id: String(d.id),
      title: String(d.title ?? ''),
      slug: String(d.slug ?? ''),
      excerpt: String(d.excerpt ?? ''),
      content: lexicalToText(d.content),
      category: NEWS_CATEGORY_LABELS[String(d.category)] ?? String(d.category ?? ''),
      date: String(d.publishedAt ?? '').slice(0, 10),
    }
  })
}

export async function getAllProducts(): Promise<ProductView[]> {
  try {
    const docs = await fetchCmsProducts()
    if (docs.length > 0) return docs
  } catch {
    // DB not reachable / not seeded yet — static fallback
  }
  return jsonProducts()
}

export async function getProductBySlug(slug: string): Promise<ProductView | null> {
  const all = await getAllProducts()
  return all.find((p) => String(p.id) === slug) ?? null
}

export async function getAllNews(): Promise<NewsView[]> {
  try {
    const docs = await fetchCmsNews()
    if (docs.length > 0) return docs
  } catch {
    // fallback
  }
  return jsonNews()
}

export async function getNewsBySlug(slug: string): Promise<NewsView | null> {
  const all = await getAllNews()
  return all.find((n) => n.slug === slug) ?? null
}

const CJK_RE = /[\u4e00-\u9fff]/

/**
 * English-only card copy. Some legacy records carry Chinese text in their
 * description fields; replace those with a clean English one-liner.
 */
export function displayDescription(p: ProductView): string {
  const d = (p.description_en || '').trim()
  if (d && !CJK_RE.test(d)) return d
  const label = p.category_en.includes('Door')
    ? 'door panel embossing line'
    : p.category_en === 'Single Column Hydraulic Press'
      ? 'single column (C-frame) hydraulic press'
      : p.category_en === 'H Frame Hydraulic Press'
        ? 'H frame hydraulic press'
        : 'four-column hydraulic press'
  return `Heavy-duty ${label} built for continuous industrial production — engineered and load-tested in our own factory.`
}

/** Product title with a guaranteed English fallback. */
export function displayName(p: ProductView): string {
  const n = (p.name_en || '').trim()
  if (n && !CJK_RE.test(n)) return n
  return `${p.category_en} — Model ${p.id}`
}
