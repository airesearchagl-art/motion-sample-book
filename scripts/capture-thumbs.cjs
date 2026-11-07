/**
 * PowerPoint の絵コンテ（構成の書き出し）に入れる、見本ごとの画像を撮影する。
 *
 * 使い方：
 *   npm run build && npx vite preview --port 4173 &
 *   node scripts/capture-thumbs.cjs http://localhost:4173/
 *
 * 出力：public/thumbs/<番号>.jpg（見本のプレビューの止まった状態。16:9 前後）
 * 見本を足したり、見た目を変えたりしたら、もう一度実行する。
 * Playwright（npx playwright install chromium）が必要。
 */
const { chromium } = require('playwright')
const fs = require('node:fs')
const path = require('node:path')

const url = process.argv[2] ?? 'http://localhost:4173/'
const out = path.join(__dirname, '..', 'public', 'thumbs')

;(async () => {
  fs.mkdirSync(out, { recursive: true })
  const browser = await chromium.launch()
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1.5, reducedMotion: 'reduce' })
  await page.goto(url)
  // 「HOVER / TAP」などの操作の案内は、絵コンテには要らないので消す
  await page.addStyleTag({ content: '.interaction-label { display: none !important; }' })
  const libraries = await page.$$eval('.library-tab[data-library]', (tabs) => tabs.map((tab) => tab.dataset.library).filter((id) => id !== 'saved'))
  let count = 0
  for (const library of libraries) {
    await page.click(`.library-tab[data-library="${library}"]`)
    await page.waitForTimeout(200)
    const numbers = await page.$$eval(`[data-library-panel="${library}"] .sample-card`, (cards) => cards.map((card) => card.dataset.number))
    for (const number of numbers) {
      const stage = page.locator(`[data-library-panel="${library}"] .sample-card[data-number="${number}"] :is(.motion-stage, .preview-stage)`).first()
      await stage.scrollIntoViewIfNeeded()
      // ホバーで再生が始まらないよう、マウスを外に出してから撮る
      await page.mouse.move(0, 0)
      await page.waitForTimeout(80)
      await stage.screenshot({ path: path.join(out, `${number}.jpg`), type: 'jpeg', quality: 78, animations: 'disabled' })
      count += 1
    }
  }
  await browser.close()
  console.log(`${count}件を ${path.relative(process.cwd(), out)} に保存しました`)
})()
