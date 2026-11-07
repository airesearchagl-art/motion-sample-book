/**
 * 「構成づくり 詳しい手順」（story-guide.html）の画面写真を撮る。
 * 各手順で押す場所・入力する場所を朱色の枠で囲んで撮影する。
 *
 * 使い方：
 *   npm run build && npx vite preview --port 4173 &
 *   node scripts/capture-story-guide.cjs http://localhost:4173/
 *
 * 出力：public/story-guide/<手順のid>.jpg
 * 手順の文章は src/story-guide.ts にある。画面が変わったら、もう一度実行する。
 * Playwright（npx playwright install chromium）が必要。
 */
const { chromium } = require('playwright')
const fs = require('node:fs')
const path = require('node:path')

const url = process.argv[2] ?? 'http://localhost:4173/'
const out = path.join(__dirname, '..', 'public', 'story-guide')

// 枠で囲む。複数の要素を囲めるように、クラスを付け外しする
const highlightCss = `
  .sg-mark { outline: 3px solid #EA6B4D !important; outline-offset: 4px !important; border-radius: 8px; position: relative; z-index: 5; box-shadow: 0 0 0 9px rgba(234,107,77,.16) !important; }
  .interaction-label { display: none !important; }
  * { scroll-behavior: auto !important; }
`

const mark = async (page, selectors) => {
  await page.evaluate((list) => {
    document.querySelectorAll('.sg-mark').forEach((element) => element.classList.remove('sg-mark'))
    list.forEach((selector) => document.querySelector(selector)?.classList.add('sg-mark'))
    document.querySelector(list[0])?.scrollIntoView({ block: 'center', inline: 'nearest' })
  }, selectors)
  await page.waitForTimeout(150)
}

/**
 * 撮る範囲：枠で囲んだ要素のまわり（周りの様子が分かるよう余白を取り、最小 760×420）を、ダイアログの見えている範囲で切り抜く。
 * full のときはダイアログの見えている部分すべて。around を渡したときは、その要素を撮る。
 */
const shoot = async (page, id, around, full = false) => {
  const file = path.join(out, `${id}.jpg`)
  if (around) {
    await page.locator(around).first().screenshot({ path: file, type: 'jpeg', quality: 76 })
  } else {
    const box = await page.evaluate((whole) => {
      const view = document.querySelector('dialog[open]').getBoundingClientRect()
      const area = { left: Math.max(0, view.left), top: Math.max(0, view.top), right: Math.min(innerWidth, view.right), bottom: Math.min(innerHeight, view.bottom) }
      const marks = [...document.querySelectorAll('.sg-mark')].map((element) => element.getBoundingClientRect())
      if (whole || !marks.length) return { x: area.left, y: area.top, width: area.right - area.left, height: area.bottom - area.top }
      const union = marks.reduce((acc, rect) => ({ left: Math.min(acc.left, rect.left), top: Math.min(acc.top, rect.top), right: Math.max(acc.right, rect.right), bottom: Math.max(acc.bottom, rect.bottom) }), { left: Infinity, top: Infinity, right: -Infinity, bottom: -Infinity })
      const grow = (start, end, min, lo, hi, pad) => {
        let a = start - pad, b = end + pad
        if (b - a < min) { const extra = (min - (b - a)) / 2; a -= extra; b += extra }
        if (a < lo) { b += lo - a; a = lo }
        if (b > hi) { a -= b - hi; b = hi }
        return [Math.max(lo, a), Math.min(hi, b)]
      }
      const [x1, x2] = grow(union.left, union.right, 760, area.left, area.right, 120)
      const [y1, y2] = grow(union.top, union.bottom, 420, area.top, area.bottom, 90)
      return { x: x1, y: y1, width: x2 - x1, height: y2 - y1 }
    }, full)
    await page.screenshot({ path: file, type: 'jpeg', quality: 76, clip: box })
  }
  console.log(`  ${id}.jpg`)
}

/** 前の手順のお知らせ（共有リンクをコピーしました 等）を消して、写真を見やすくする */
const clearNotice = (page) => page.evaluate(() => { document.querySelectorAll('.story-notice, .story-json-status').forEach((element) => { element.textContent = '' }) })

const sampleAnswer = JSON.stringify({
  format: 'motion-sample-book/storyboard',
  version: 1,
  templates: [{
    name: '厚生棟の初回説明',
    description: '敷地の広さから入り、社員が集まる吹抜けの明るさで締める',
    slots: [
      { role: '敷地の広さ', note: '工場の中での位置', sample: 'V16', seconds: 5, candidates: ['V16', 'V20'] },
      { role: '建物の全体', note: '外観と植栽', sample: 'E01', seconds: 4, candidates: ['E01', 'V08'] },
      { role: '吹抜けに入る', note: '人の目線で', sample: 'V18', seconds: 5, candidates: ['V18', 'V07'] },
      { role: '明るさを伝える', note: '木漏れ日の床', sample: 'E05', seconds: 4, candidates: ['E05', 'V13'] },
      { role: '規模', note: '延床面積と階数', sample: 'T08', seconds: 3, candidates: ['T08'] },
    ],
  }],
}, null, 2)

;(async () => {
  fs.mkdirSync(out, { recursive: true })
  const browser = await browserLaunch()
  const context = await browser.newContext({ viewport: { width: 1280, height: 860 }, deviceScaleFactor: 1.5, permissions: ['clipboard-read', 'clipboard-write'], reducedMotion: 'reduce' })
  const page = await context.newPage()
  await page.goto(url)
  await page.addStyleTag({ content: highlightCss })
  await page.mouse.move(0, 0)

  // 1. 最初の構成を作る
  await mark(page, ['.story-entry'])
  await shoot(page, 'open', '.purpose-bar')
  await page.click('.story-open[data-story="site-to-detail"]')
  await page.waitForTimeout(300)
  await mark(page, ['.story-templates'])
  await shoot(page, 'tabs', undefined, true)
  await mark(page, ['.story-slot:nth-child(2) .story-field:not(.seconds)'])
  await shoot(page, 'sample')
  await mark(page, ['.story-slot:nth-child(2) .story-field.seconds'])
  await shoot(page, 'seconds')
  await mark(page, ['.story-play'])
  await page.click('.story-play')
  await page.waitForTimeout(2900)
  await page.evaluate(() => document.querySelector('.story-play').classList.add('sg-mark'))
  await shoot(page, 'play', undefined, true)

  // 2. 人に渡す
  await mark(page, ['.story-export label'])
  await page.selectOption('.story-tool', 'powerpoint')
  await shoot(page, 'tool')
  await mark(page, ['.story-copy'])
  await shoot(page, 'copy')
  await mark(page, ['.story-pptx'])
  await shoot(page, 'pptx')
  await mark(page, ['.story-share'])
  await shoot(page, 'share')
  await page.click('.story-share')
  await page.waitForTimeout(300)
  const link = await page.evaluate(() => navigator.clipboard.readText())
  await clearNotice(page)

  // 受け取った側（保存のない別のブラウザで開く）
  const other = await browser.newContext({ viewport: { width: 1280, height: 860 }, deviceScaleFactor: 1.5, reducedMotion: 'reduce' })
  const receiver = await other.newPage()
  await receiver.goto(link)
  await receiver.addStyleTag({ content: highlightCss })
  await receiver.waitForTimeout(500)
  await mark(receiver, ['.story-notice', '.story-template.is-active'])
  await shoot(receiver, 'received', undefined, true)
  await other.close()

  // 3. 自分の型を作る
  await mark(page, ['[data-story-action="duplicate"]'])
  await shoot(page, 'duplicate')
  await page.click('[data-story-action="duplicate"]')
  await page.waitForTimeout(300)
  await page.fill('.story-name', '工場見学の導入')
  await clearNotice(page)
  await mark(page, ['.story-meta'])
  await shoot(page, 'edit-name')
  await page.locator('.story-role').first().fill('ゲートから近づく')
  await mark(page, ['.story-slot:nth-child(1) .story-slot-head', '.story-slot:nth-child(1) .story-slot-tools'])
  await shoot(page, 'edit-slot')
  await mark(page, ['.story-add'])
  await shoot(page, 'add')
  await mark(page, ['[data-story-action="edit"]'])
  await shoot(page, 'finish')
  await page.click('[data-story-action="edit"]')
  await page.waitForTimeout(200)

  // 4. AIに構成を頼む
  await page.click('.story-ai summary')
  await page.fill('.story-ai-situation', '工場の新しい厚生棟を、施主の役員に初めて説明する。敷地の広さと、社員が集まる吹抜けの明るさを伝えたい。')
  await page.selectOption('.story-ai-length', '30')
  await mark(page, ['.story-ai-steps > li:first-child .story-field'])
  await shoot(page, 'ai-scene')
  await mark(page, ['.story-ai-options', '.story-ai-copy'])
  await shoot(page, 'ai-copy')
  await page.fill('.story-ai-answer', `5カットの案を作りました。\n\n\`\`\`json\n${sampleAnswer}\n\`\`\`\n`)
  await mark(page, ['.story-ai-steps > li:last-child'])
  await shoot(page, 'ai-paste')
  await page.click('.story-ai-import')
  await page.waitForTimeout(300)
  await page.evaluate(() => document.querySelector('.story-ai').open = true)
  await mark(page, ['.story-ai-status', '.story-template.is-active'])
  await page.evaluate(() => document.querySelector('.story-templates').scrollIntoView({ block: 'start' }))
  await page.waitForTimeout(150)
  await shoot(page, 'ai-result')
  await page.evaluate(() => document.querySelector('.story-ai').open = false)

  // 5. JSONで保存・移す
  await page.click('.story-json summary')
  await mark(page, ['.story-json-body .story-json-actions'])
  await shoot(page, 'json')

  await browser.close()
})()

function browserLaunch() { return chromium.launch() }
