import type { MetadataRoute } from 'next'
import { getAllNews, getAllProducts } from '@/lib/cms'

const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/about`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/products`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/products/category/h-frame`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/products/category/four-column`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/products/category/single-column`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/products/category/door-embossing`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/qa`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/news`, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${SITE_URL}/contact`, changeFrequency: 'monthly', priority: 0.7 },
  ]

  let products: Awaited<ReturnType<typeof getAllProducts>> = []
  let news: Awaited<ReturnType<typeof getAllNews>> = []
  try {
    ;[products, news] = await Promise.all([getAllProducts(), getAllNews()])
  } catch {
    // fall back to static-only sitemap
  }

  const productPages: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${SITE_URL}/products/${p.id}`,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))
  const newsPages: MetadataRoute.Sitemap = news.map((n) => ({
    url: `${SITE_URL}/news/${n.slug}`,
    changeFrequency: 'monthly',
    priority: 0.5,
    lastModified: n.date || undefined,
  }))

  return [...staticPages, ...productPages, ...newsPages]
}
