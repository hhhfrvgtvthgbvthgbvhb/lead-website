/**
 * Sync English rewrites for legacy products (id <= 74) into the database.
 * Reads products.json and updates shortDescription / description / seo fields.
 * Run: node --env-file=.env --require ./scripts/patch-next-env.cjs --import tsx scripts/rewrite_legacy_en_sync.mts
 */
import fs from 'fs'
import path from 'path'
import { getPayload } from 'payload'
import * as configModule from '../payload.config'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const configPromise: any =
  (configModule as any).default?.default ?? (configModule as any).default ?? configModule

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
  name_en: string
  description_en: string
  specs: string
}

async function main() {
  const payload = await getPayload({ config: configPromise })
  const products = JSON.parse(
    fs.readFileSync(path.resolve(process.cwd(), 'products.json'), 'utf-8'),
  ) as JsonProduct[]

  let updated = 0
  for (const p of products.filter((x) => x.id <= 74)) {
    const slug = String(p.id)
    const found = await payload.find({
      collection: 'products',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    if (found.docs.length === 0) continue
    await payload.update({
      collection: 'products',
      id: found.docs[0].id,
      data: {
        shortDescription: p.description_en,
        description: textToLexical(p.specs || p.description_en),
        seoDescription: (p.description_en || '').slice(0, 160),
      },
    })
    updated++
    if (updated % 20 === 0) payload.logger.info(`...${updated} updated`)
  }
  payload.logger.info(`Legacy English rewrite synced: ${updated} products updated`)
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
