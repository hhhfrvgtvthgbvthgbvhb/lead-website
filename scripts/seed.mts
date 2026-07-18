/**
 * Idempotent database seed for the LEAD website.
 * Run with: npm run seed
 *
 * Creates:
 *  - admin user (admin@leadhyd.com)
 *  - all products from products.json (with images uploaded to Media)
 *  - news articles from news.json
 */
import fs from 'fs'
import path from 'path'
import { getPayload } from 'payload'
import * as configModule from '../payload.config'

// tsx's CJS pipeline can wrap the config default export in an extra
// namespace object — unwrap both shapes.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const configPromise: any =
  (configModule as any).default?.default ?? (configModule as any).default ?? configModule

// ---- load .env manually (standalone script, no Next.js env loading) ----
const envPath = path.resolve(process.cwd(), '.env')
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf-8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2]
  }
}
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const ADMIN_EMAIL = 'admin@leadhyd.com'
const ADMIN_PASSWORD = 'LeadAdmin2026!'

const CATEGORY_VALUES: Record<string, string> = {
  'H Frame Hydraulic Press': 'h-frame',
  'Four Column Hydraulic Press': 'four-column',
  'Single Column Hydraulic Press': 'single-column',
}

function categoryValue(categoryEn: string): string {
  if (CATEGORY_VALUES[categoryEn]) return CATEGORY_VALUES[categoryEn]
  if (categoryEn.includes('Door')) return 'door-embossing'
  return 'h-frame'
}

function tonnageFromName(nameEn: string): number | undefined {
  const m = nameEn.match(/(\d+)\s*T\b/i)
  return m ? Number(m[1]) : undefined
}

/** Minimal Lexical rich-text document from plain text (one paragraph per line). */
function textToLexical(text: string) {
  const paragraphs = (text || '').split(/\n+/).filter((l) => l.trim().length > 0)
  return {
    root: {
      type: 'root',
      children: (paragraphs.length ? paragraphs : ['']).map((line) => ({
        type: 'paragraph',
        children: [{ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text: line, version: 1 }],
        direction: 'ltr',
        format: '',
        indent: 0,
        textFormat: 0,
        textStyle: '',
        version: 1,
      })),
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }
}

interface JsonProduct {
  id: number
  name_cn: string
  name_en: string
  category_en: string
  description_en: string
  seo_keywords: string
  specs: string
}

async function main() {
  const payload = await getPayload({ config: configPromise })
  payload.logger.info('Seed started')

  // ---- 1. admin user ----
  const existingUsers = await payload.find({
    collection: 'users',
    where: { email: { equals: ADMIN_EMAIL } },
    limit: 1,
  })
  if (existingUsers.docs.length === 0) {
    await payload.create({
      collection: 'users',
      data: { email: ADMIN_EMAIL, password: ADMIN_PASSWORD, name: 'LEAD Admin', role: 'admin' },
    })
    payload.logger.info(`Created admin user ${ADMIN_EMAIL}`)
  } else {
    payload.logger.info(`Admin user ${ADMIN_EMAIL} already exists, skipped`)
  }

  // ---- 2. media upload helper (idempotent by filename) ----
  const mediaIdByFilename = new Map<string, number | string>()
  const uploadImage = async (absPath: string, filename: string, alt: string) => {
    if (mediaIdByFilename.has(filename)) return mediaIdByFilename.get(filename)!
    const found = await payload.find({
      collection: 'media',
      where: { filename: { equals: filename } },
      limit: 1,
    })
    if (found.docs.length > 0) {
      mediaIdByFilename.set(filename, found.docs[0].id)
      return found.docs[0].id
    }
    const buffer = fs.readFileSync(absPath)
    const doc = await payload.create({
      collection: 'media',
      data: { alt },
      file: { data: buffer, mimetype: 'image/webp', name: filename, size: buffer.length },
    })
    mediaIdByFilename.set(filename, doc.id)
    return doc.id
  }

  // ---- 3. products ----
  const products = JSON.parse(
    fs.readFileSync(path.resolve(process.cwd(), 'products.json'), 'utf-8'),
  ) as JsonProduct[]

  let created = 0
  let skipped = 0
  for (const p of products) {
    const slug = String(p.id)
    const nameEn = (p.name_en || '').trim() || p.name_cn || `Product ${p.id}`
    const exists = await payload.find({
      collection: 'products',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    if (exists.docs.length > 0) {
      skipped++
      continue
    }

    const imgDir = path.resolve(process.cwd(), 'public', 'images', 'products', slug)
    const heroPath = path.join(imgDir, 'hero.webp')
    if (!fs.existsSync(heroPath)) {
      payload.logger.warn(`Product ${slug} (${p.name_en}) has no hero.webp, skipped`)
      skipped++
      continue
    }
    const heroId = await uploadImage(heroPath, `product-${slug}-hero.webp`, nameEn)

    const gallery: Array<{ image: number | string; caption: string }> = []
    if (fs.existsSync(imgDir)) {
      const galleryFiles = fs
        .readdirSync(imgDir)
        .filter((f) => /^gallery-\d+\.webp$/.test(f))
        .sort()
      for (const gf of galleryFiles) {
        const gid = await uploadImage(
          path.join(imgDir, gf),
          `product-${slug}-${gf}`,
          `${nameEn} - ${gf.replace('.webp', '')}`,
        )
        gallery.push({ image: gid, caption: nameEn })
      }
    }

    await payload.create({
      collection: 'products',
      data: {
        name_en: nameEn,
        name_cn: p.name_cn,
        slug,
        category: categoryValue(p.category_en) as 'h-frame',
        tonnage: tonnageFromName(p.name_en),
        heroImage: heroId,
        gallery,
        shortDescription: p.description_en || nameEn,
        description: textToLexical(p.specs || p.description_en || ''),
        seoTitle: nameEn,
        seoDescription: (p.description_en || nameEn).slice(0, 160),
        seoKeywords: p.seo_keywords || '',
        status: 'published',
        featured: false,
      },
    })
    created++
    if (created % 10 === 0) payload.logger.info(`...${created} products created`)
  }
  payload.logger.info(`Products: ${created} created, ${skipped} skipped`)

  // ---- 4. news ----
  const newsPath = path.resolve(process.cwd(), 'news.json')
  if (fs.existsSync(newsPath)) {
    const news = JSON.parse(fs.readFileSync(newsPath, 'utf-8')) as Array<Record<string, unknown>>
    let newsCreated = 0
    for (const n of news) {
      const exists = await payload.find({
        collection: 'news',
        where: { slug: { equals: String(n.slug) } },
        limit: 1,
      })
      if (exists.docs.length > 0) continue
      await payload.create({
        collection: 'news',
        data: {
          title: String(n.title),
          slug: String(n.slug),
          category: n.category as 'company-news',
          excerpt: String(n.excerpt ?? ''),
          content: textToLexical(String(n.content ?? '')),
          publishedAt: String(n.publishedAt ?? new Date().toISOString()),
          author: String(n.author ?? 'LEAD'),
          status: 'published',
          featured: Boolean(n.featured),
        },
      })
      newsCreated++
    }
    payload.logger.info(`News: ${newsCreated} created, ${news.length - newsCreated} skipped`)
  }

  const productCount = await payload.count({ collection: 'products' })
  const mediaCount = await payload.count({ collection: 'media' })
  const newsCount = await payload.count({ collection: 'news' })
  payload.logger.info(
    `Seed done. Totals — products: ${productCount.totalDocs}, media: ${mediaCount.totalDocs}, news: ${newsCount.totalDocs}`,
  )
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
