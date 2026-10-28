/**
 * 使い方ページの「画面マップ」用に、見本帳の画面を撮影し、各部分の位置を記録する。
 *
 * 使い方：
 *   npm run build && npx vite preview --port 4173 &
 *   node scripts/capture-guide-map.cjs http://localhost:4173/
 *
 * 出力：
 *   public/guide/map.jpg       … 画面の画像
 *   src/guide-map.json         … 番号ごとの位置（画像に対する割合 %）
 *
 * 画面の構成が変わったら、もう一度実行する。番号の説明文は src/guide.ts の mapItems にある。
 * Playwright（npx playwright install chromium）が必要。
 */
const { chromium } = require('playwright')
const fs = require('node:fs')
const path = require('node:path')

// 番号と、画面の中で指し示す要素
const targets = [
  { n: 1, selector: '.finder-field' },
  { n: 2, selector: '.finder-chips' },
  { n: 3, selector: '.playback-bar .playback-controls' },
  { n: 4, selector: '.library-tabs' },
  { n: 5, selector: '#ui-library .filters' },
  { n: 6, selector: '#motion-grid .sample-card:first-child .motion-stage' },
  { n: 7, selector: '#motion-grid .sample-card:first-child .adjust-badges' },
  { n: 8, selector: '#motion-grid .sample-card:first-child .usage' },
  { n: 9, selector: '#motion-grid .sample-card:first-child .feel-tags' },
  { n: 10, selector: '#motion-grid .sample-card:first-child .save-toggle' },
  { n: 11, selector: '#motion-grid .sample-card:first-child .compare-toggle' },
  { n: 12, selector: '#motion-grid .sample-card:first-child .recipe-open' },
]

;(async () => {
  const url = process.argv[2] ?? 'http://localhost:4173/'
  const root = path.resolve(__dirname, '..')
  const browser = await chromium.launch()
  const width = 1440
  const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 1 })
  await page.goto(url)
  await page.evaluate(() => document.fonts.ready)
  // 撮影用に、冒頭の大きな見出しを隠し、余白を詰めて横長に収める（実際の画面の配置は変えない）
  await page.addStyleTag({ content: `
    .hero { display: none !important; }
    .playback-bar { position: static !important; }
    .finder { padding-top: 24px !important; padding-bottom: 20px !important; row-gap: 12px !important; }
    .finder-status { display: none !important; }
    .playback-bar { padding-top: 8px !important; padding-bottom: 8px !important; }
    .library-tab { min-height: 62px !important; }
    .catalog-head .eyebrow { display: none !important; }
    .catalog { padding-top: 22px !important; }
    .catalog h2 { font-size: 1.7rem !important; margin-top: 0 !important; }
    .result { margin: 12px 0 10px !important; }
    .sample-card { padding: 22px !important; }
    .card-top { margin-bottom: 12px !important; }
    .motion-stage { height: 120px !important; }
    .card-copy { padding-top: 14px !important; }
    .card-copy h3 { margin-bottom: 6px !important; }
    .usage { margin-top: 14px !important; }
  ` })
  await page.waitForTimeout(300)

  const top = await page.$eval('.finder', (el) => el.getBoundingClientRect().top + window.scrollY)
  const firstRow = await page.$eval('#motion-grid .sample-card:first-child', (el) => {
    const r = el.getBoundingClientRect()
    return r.bottom + window.scrollY
  })
  const clip = { x: 0, y: Math.floor(top), width, height: Math.ceil(firstRow - top + 16) }

  const markers = []
  for (const target of targets) {
    const box = await page.$eval(target.selector, (el) => {
      const r = el.getBoundingClientRect()
      return { x: r.left + window.scrollX, y: r.top + window.scrollY, w: r.width, h: r.height }
    })
    const pct = (value, total) => Math.round((value / total) * 10000) / 100
    markers.push({
      n: target.n,
      x: pct(box.x, clip.width),
      y: pct(box.y - clip.y, clip.height),
      w: pct(box.w, clip.width),
      h: pct(box.h, clip.height),
    })
  }

  await page.screenshot({ path: path.join(root, 'public/guide/map.jpg'), clip, type: 'jpeg', quality: 82, fullPage: true })
  fs.writeFileSync(path.join(root, 'src/guide-map.json'), JSON.stringify({ width: clip.width, height: clip.height, markers }, null, 2) + '\n')
  console.log(`captured ${clip.width}x${clip.height}, ${markers.length} markers`)
  await browser.close()
})()
