/* Screenshot pages with system Chrome via playwright (no browser download). */
/* eslint-disable @typescript-eslint/no-var-requires */
const { chromium } = require('playwright')

const BASE = process.env.BASE_URL || 'http://localhost:3111'
const OUT = process.env.SHOT_DIR || 'scripts/shots'

const PAGES = [
  { path: '/', name: 'home' },
  { path: '/products', name: 'products' },
  { path: '/products/category/single-column', name: 'category' },
  { path: '/products/category/door-embossing', name: 'category-door' },
  { path: '/products/52', name: 'product-52' },
  { path: '/qa', name: 'qa' },
]

async function main() {
  const only = process.argv[2] // optional page filter
  const browser = await chromium.launch({
    channel: 'chrome',
    headless: true,
  })
  const errors = []
  for (const width of [1440, 390]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } })
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(`[${width}px] console: ${msg.text().slice(0, 200)}`)
    })
    page.on('pageerror', (err) => errors.push(`[${width}px] pageerror: ${String(err).slice(0, 200)}`))
    for (const p of PAGES) {
      if (only && p.name !== only) continue
      await page.goto(BASE + p.path, { waitUntil: 'networkidle', timeout: 60000 })
      // scroll through the page to trigger whileInView animations & lazy images
      await page.evaluate(async () => {
        await new Promise((resolve) => {
          let y = 0
          const step = () => {
            y += window.innerHeight * 0.8
            window.scrollTo(0, y)
            if (y < document.body.scrollHeight) setTimeout(step, 120)
            else resolve(true)
          }
          step()
        })
      })
      await page.waitForTimeout(1200)
      await page.evaluate(() => window.scrollTo(0, 0))
      await page.waitForTimeout(400)
      // full page screenshot
      await page.screenshot({ path: `${OUT}/${p.name}-${width}-full.png`, fullPage: true })
      // viewport screenshot (above the fold)
      await page.screenshot({ path: `${OUT}/${p.name}-${width}-top.png`, fullPage: false })
      console.log(`shot ${p.name} ${width}px`)
    }
    await page.close()
  }
  await browser.close()
  if (errors.length) {
    console.log('CONSOLE ERRORS:')
    errors.slice(0, 20).forEach((e) => console.log(' -', e))
  } else {
    console.log('NO CONSOLE ERRORS')
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
