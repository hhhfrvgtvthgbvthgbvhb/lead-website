import type { ProductView } from '@/lib/cms'

export interface CategoryInfo {
  id: string
  name: string
  shortName: string
  range: string
  blurb: string
  intro: string
  image: string
  match: (p: ProductView) => boolean
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'h-frame',
    name: 'H Frame Hydraulic Press',
    shortName: 'H Frame',
    range: '100T – 1200T',
    blurb: 'Rigid welded frame for high-precision stamping and forming.',
    intro:
      'H frame presses combine a rigid welded gantry structure with outstanding guiding precision — the choice for high-accuracy stamping, deep drawing, SMC molding and eccentric-load work.',
    image: '/images/categories/h-frame.webp',
    match: (p) => p.category_en === 'H Frame Hydraulic Press',
  },
  {
    id: 'four-column',
    name: 'Four Column Hydraulic Press',
    shortName: 'Four Column',
    range: '25T – 2000T',
    blurb: 'The versatile workhorse for deep drawing, molding and assembly.',
    intro:
      'Three-beam four-column presses distribute force evenly across the worktable — the most versatile platform for stamping, deep drawing, composite molding, powder compacting and assembly.',
    image: '/images/categories/four-column.webp',
    match: (p) => p.category_en === 'Four Column Hydraulic Press',
  },
  {
    id: 'single-column',
    name: 'Single Column Hydraulic Press',
    shortName: 'Single Column',
    range: '5T – 500T',
    blurb: 'Open-front C-frame for straightening, press-fitting and punching.',
    intro:
      'Single column (C-frame) presses offer an open three-side working area for fast loading — ideal for straightening shafts and profiles, press-fitting, punching, and light assembly.',
    image: '/images/categories/single-column.webp',
    match: (p) => p.category_en === 'Single Column Hydraulic Press',
  },
  {
    id: 'door-embossing',
    name: 'Door Panel Embossing Machine',
    shortName: 'Door Embossing',
    range: '2000T – 4500T',
    blurb: 'High-tonnage embossing lines for steel security door skins.',
    intro:
      'High-tonnage embossing presses form deep, crisp patterns on steel and steel-wood door skins in a single cycle — multi-cylinder layouts keep pattern depth uniform across the full panel.',
    image: '/images/categories/door-embossing.webp',
    match: (p) => p.category_en.includes('Door'),
  },
]

export function getCategory(slug: string): CategoryInfo | undefined {
  return CATEGORIES.find((c) => c.id === slug)
}
