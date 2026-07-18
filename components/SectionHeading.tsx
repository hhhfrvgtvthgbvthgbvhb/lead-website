import Reveal from '@/components/motion/Reveal'

interface SectionHeadingProps {
  overline: string
  title: string
  description?: string
  dark?: boolean
  align?: 'left' | 'center'
}

export default function SectionHeading({ overline, title, description, dark = false, align = 'center' }: SectionHeadingProps) {
  const alignCls = align === 'center' ? 'text-center mx-auto' : 'text-left'
  return (
    <Reveal className={`max-w-3xl ${alignCls} mb-12 lg:mb-16`}>
      <div className={`overline-label mb-4 ${align === 'center' ? '' : ''}`}>{overline}</div>
      <h2 className={`display-md ${dark ? 'text-white' : 'text-steel-900'}`}>{title}</h2>
      {description && (
        <p className={`mt-5 text-base lg:text-lg leading-relaxed ${dark ? 'text-steel-400' : 'text-steel-600'}`}>
          {description}
        </p>
      )}
    </Reveal>
  )
}
