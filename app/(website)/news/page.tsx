import Link from 'next/link'

const newsItems = [
  {
    id: '1',
    title: 'LEAD Hydraulic Press Expands into South American Market',
    excerpt: 'We are pleased to announce our expanded distribution network across Brazil, Argentina, and Chile, providing local technical support and faster delivery for our four-column and H-frame hydraulic presses.',
    category: 'Company News',
    date: '2026-05-15',
    slug: 'expand-south-america',
  },
  {
    id: '2',
    title: 'New 4500T Door Embossing Machine Launched',
    excerpt: 'Our latest 4500-ton door panel embossing hydraulic press is now available, featuring servo-controlled precision and energy-saving technology for high-volume steel door manufacturers.',
    category: 'Product Launch',
    date: '2026-04-20',
    slug: '4500t-door-embossing-launch',
  },
  {
    id: '3',
    title: 'Participating in METALEX Vietnam 2026',
    excerpt: 'LEAD will exhibit our full range of hydraulic presses at METALEX Vietnam, Booth A12-34. We invite all partners and customers to visit us for live machine demonstrations and technical consultations.',
    category: 'Exhibition',
    date: '2026-03-10',
    slug: 'metalex-vietnam-2026',
  },
  {
    id: '4',
    title: 'ISO 9001:2025 Recertification Completed',
    excerpt: 'We have successfully passed our annual ISO 9001 quality management system audit with zero non-conformities, reaffirming our commitment to manufacturing excellence.',
    category: 'Company News',
    date: '2026-02-28',
    slug: 'iso-9001-recertification',
  },
  {
    id: '5',
    title: 'Global Shipping & Logistics Update',
    excerpt: 'To better serve our Middle East and African customers, we have partnered with new logistics providers offering competitive sea freight rates and door-to-door delivery options.',
    category: 'Company News',
    date: '2026-01-15',
    slug: 'shipping-logistics-update',
  },
]

export default function NewsPage() {
  return (
    <div>
      <section className="bg-steel-900 text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">News & Updates</h1>
          <p className="text-xl text-steel-300 max-w-3xl">Latest company announcements, product launches, and industry insights.</p>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {newsItems.map((news) => (
              <article key={news.id} className="bg-white rounded-xl border border-steel-200 p-6 lg:p-8 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-medium text-brand-600 bg-brand-50 px-2 py-1 rounded">{news.category}</span>
                  <span className="text-xs text-steel-400">{news.date}</span>
                </div>
                <h2 className="text-xl lg:text-2xl font-bold text-steel-900 mb-3">
                  <Link href={`/news/${news.slug}`} className="hover:text-brand-600 transition-colors">
                    {news.title}
                  </Link>
                </h2>
                <p className="text-steel-600 leading-relaxed mb-4">{news.excerpt}</p>
                <Link href={`/news/${news.slug}`} className="text-sm font-medium text-brand-600 hover:text-brand-700">
                  Read more →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
