import Counter from '@/components/motion/Counter'
import Reveal from '@/components/motion/Reveal'

const STATS: Array<{ value: number; suffix: string; label: string; grouping?: boolean }> = [
  { value: 18, suffix: '+', label: 'Years of Manufacturing' },
  { value: 89, suffix: '+', label: 'Press Models' },
  { value: 50, suffix: '+', label: 'Countries Served' },
  { value: 4500, suffix: 'T', label: 'Max. Capacity', grouping: false },
]

export default function StatsBar() {
  return (
    <section className="relative bg-steel-950 border-y border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 0.08}
              className={`py-10 lg:py-12 text-center ${
                i > 0 ? 'border-l border-white/10' : ''
              } ${i >= 2 ? 'border-t lg:border-t-0 border-white/10' : ''}`}
            >
              <div className="font-display text-4xl lg:text-5xl font-bold text-white tracking-tight">
                <Counter value={s.value} suffix={s.suffix} grouping={s.grouping} />
              </div>
              <div className="mt-2 text-xs lg:text-sm uppercase tracking-[0.18em] text-steel-400">
                {s.label}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
