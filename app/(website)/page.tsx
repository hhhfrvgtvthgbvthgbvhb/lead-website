import { getAllProducts } from '@/lib/cms'
import faqData from '@/faq.json'
import Hero from '@/components/home/Hero'
import StatsBar from '@/components/home/StatsBar'
import Categories from '@/components/home/Categories'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import WhyLead from '@/components/home/WhyLead'
import FactoryStrength from '@/components/home/FactoryStrength'
import Applications from '@/components/home/Applications'
import MarketsVisitors from '@/components/home/MarketsVisitors'
import CertPartners from '@/components/home/CertPartners'
import FaqCta from '@/components/home/FaqCta'

export const dynamic = 'force-dynamic'

const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Shandong LEAD Industrial Equipment Technology Co., Ltd.',
  alternateName: 'LEAD Hydraulic Press Machinery',
  url: SITE_URL,
  logo: `${SITE_URL}/images/brand/logo-color.webp`,
  foundingDate: '2006',
  description:
    'Professional manufacturer of H-frame, four-column, single column and door embossing hydraulic presses from 5T to 4500T, serving 50+ countries.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'No. 998 Zhenxing North Road',
    addressLocality: 'Tengzhou',
    addressRegion: 'Shandong',
    addressCountry: 'CN',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'zhongjie@lead-group.cn',
    contactType: 'sales',
    availableLanguage: ['English'],
  },
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'LEAD Hydraulic Press Machinery',
  url: SITE_URL,
  publisher: { '@type': 'Organization', name: 'Shandong LEAD Industrial Equipment Technology Co., Ltd.' },
}

export default async function HomePage() {
  const productsData = await getAllProducts()

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <Hero />
      <StatsBar />
      <Categories products={productsData} />
      <FeaturedProducts products={productsData} />
      <WhyLead />
      <FactoryStrength />
      <Applications />
      <MarketsVisitors />
      <CertPartners />
      <FaqCta faqs={faqData} />
    </div>
  )
}
