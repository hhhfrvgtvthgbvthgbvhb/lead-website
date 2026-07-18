import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // LEAD logo red, refined to a deeper industrial red (#C62828)
        brand: {
          50: '#fbf3f3',
          100: '#f5e3e3',
          200: '#e9c7c7',
          300: '#d89e9e',
          400: '#d64545',
          500: '#c62828',
          600: '#ad1f1f',
          700: '#8f1a1a',
          800: '#701515',
          900: '#511010',
          950: '#370909',
        },
        // Deep blue-charcoal industrial neutrals
        steel: {
          50: '#f5f7fa',
          100: '#eaeef4',
          200: '#d9e0ea',
          300: '#bfcad9',
          400: '#93a3ba',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1c2637',
          900: '#111a29',
          950: '#080f1a',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.045em',
      },
      maxWidth: {
        '8xl': '88rem',
      },
      animation: {
        'ken-burns': 'ken-burns 24s ease-in-out infinite alternate',
        marquee: 'marquee 46s linear infinite',
        'marquee-reverse': 'marquee-reverse 52s linear infinite',
        'fade-in': 'fade-in 1.2s ease-out both',
        'scroll-hint': 'scroll-hint 2.2s ease-in-out infinite',
      },
      keyframes: {
        'ken-burns': {
          '0%': { transform: 'scale(1) translateX(0)' },
          '100%': { transform: 'scale(1.08) translateX(-1.5%)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scroll-hint': {
          '0%, 100%': { transform: 'translateY(0)', opacity: '0.9' },
          '50%': { transform: 'translateY(10px)', opacity: '0.4' },
        },
      },
      backgroundImage: {
        'grid-dark':
          'linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)',
        'grid-light':
          'linear-gradient(to right, rgba(8,15,26,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(8,15,26,0.05) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '56px 56px',
      },
    },
  },
  plugins: [],
}
export default config
