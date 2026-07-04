import { notFound } from 'next/navigation'
import Link from 'next/link'

const newsItems = [
  {
    id: '1',
    title: 'LEAD Hydraulic Press Expands into South American Market',
    content: 'We are pleased to announce our expanded distribution network across Brazil, Argentina, and Chile, providing local technical support and faster delivery for our four-column and H-frame hydraulic presses. Our local partners in São Paulo and Buenos Aires are now equipped with spare parts inventory and certified service technicians. Customers in South America can now expect delivery times reduced from 45 days to 25 days for standard models.',
    category: 'Company News',
    date: '2026-05-15',
    slug: 'expand-south-america',
  },
  {
    id: '2',
    title: 'New 4500T Door Embossing Machine Launched',
    content: 'Our latest 4500-ton door panel embossing hydraulic press is now available, featuring servo-controlled precision and energy-saving technology for high-volume steel door manufacturers. The machine offers dual-action capability, allowing both deep drawing and precise embossing in a single cycle. Energy consumption is reduced by 30% compared to conventional hydraulic systems.',
    category: 'Product Launch',
    date: '2026-04-20',
    slug: '4500t-door-embossing-launch',
  },
  {
    id: '3',
    title: 'Participating in METALEX Vietnam 2026',
    content: 'LEAD will exhibit our full range of hydraulic presses at METALEX Vietnam, Booth A12-34. We invite all partners and customers to visit us for live machine demonstrations and technical consultations. Our engineering team will be available to discuss custom applications for Southeast Asian manufacturing requirements.',
    category: 'Exhibition',
    date: '2026-03-10',
    slug: 'metalex-vietnam-2026',
  },
  {
    id: '4',
    title: 'ISO 9001:2025 Recertification Completed',
    content: 'We have successfully passed our annual ISO 9001 quality management system audit with zero non-conformities, reaffirming our commitment to manufacturing excellence. The audit covered all aspects of our production process, from material procurement to final testing and shipment.',
    category: 'Company News',
    date: '2026-02-28',
    slug: 'iso-9001-recertification',
  },
  {
    id: '5',
    title: 'Global Shipping & Logistics Update',
    content: 'To better serve our Middle East and African customers, we have partnered with new logistics providers offering competitive sea freight rates and door-to-door delivery options. We now offer CFR and DAP terms to major ports in Dubai, Lagos, Mombasa, and Dar es Salaam.',
    category: 'Company News',
    date: '2026-01-15',
    slug: 'shipping-logistics-update',
  },
]

export async function generateStaticParams() {
  return newsItems.map((n) => ({ slug: n.slug }))
}

export default function NewsDetailPage({ params }: { params: { slug: string } }) {
  const news = newsItems.find((n) => n.slug === params.slug)
  if (!news) return notFound()

  return (
    <div>
      <section className="bg-steel-900 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-sm text-steel-400 mb-2">
            <Link href="/news" className="hover:text-white">News</Link>
            <span className="mx-2">/</span>
            <span>{news.category}</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold">{news.title}</h1>
          <div className="text-steel-400 mt-4 text-sm">{news.date}</div>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="prose prose-lg max-w-none text-steel-700 leading-relaxed">
            <p>{news.content}</p>
          </article>
          <div className="mt-12 pt-8 border-t border-steel-200">
            <Link href="/news" className="text-brand-600 font-medium hover:text-brand-700">
              ← Back to all news
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
