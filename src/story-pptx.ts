/**
 * v1.1-2 カット割り表を PowerPoint（.pptx）で書き出す。
 * 1カット1枚の絵コンテ：見本の画像（public/thumbs/<番号>.jpg）、役割・ねらい、見本の名前、カットの大きさ、秒数、内容、
 * 選んだ道具の再現情報。最初に表紙、最後に一覧表を付ける。
 *
 * pptxgenjs は大きいので、書き出すときだけ読み込む（見本帳を開く速さに影響させない）。
 * 画像は scripts/capture-thumbs.cjs で作る。見本を足したら撮り直す。
 */
import type { Sample } from './data'

export type PptxCut = {
  role: string
  note: string
  sample: Sample
  scale?: string
  seconds: number
  /** 選んだ道具の再現情報（入れないときは undefined） */
  recipe?: string
  /** 発表者ノートに入れる、生成AI向けの指示文 */
  prompt?: string
}

export type PptxStory = {
  name: string
  description: string
  toolName?: string
  cuts: PptxCut[]
}

const font = 'Yu Gothic'
const ink = '25231F'
const muted = '6E695F'
const coral = 'EA6B4D'
const cream = 'F7F2E8'
const line = 'DED6C6'

/** 画像を data URL にする（PowerPoint のファイルに埋め込むため） */
const toDataUrl = async (url: string) => {
  const response = await fetch(url)
  if (!response.ok) return undefined
  const blob = await response.blob()
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(blob)
  })
}

const imageSize = (dataUrl: string) => new Promise<{ width: number, height: number }>((resolve) => {
  const image = new Image()
  image.onload = () => resolve({ width: image.naturalWidth, height: image.naturalHeight })
  image.onerror = () => resolve({ width: 16, height: 9 })
  image.src = dataUrl
})

/** 枠（w×h インチ）に収まる大きさで、中央に置く位置 */
const fit = (box: { x: number, y: number, w: number, h: number }, size: { width: number, height: number }) => {
  const scale = Math.min(box.w / size.width, box.h / size.height)
  const w = size.width * scale
  const h = size.height * scale
  return { x: box.x + (box.w - w) / 2, y: box.y + (box.h - h) / 2, w, h }
}

export const pptxFileName = (name: string) => `構成_${name.replace(/[\\/:*?"<>|\s]+/g, '-').slice(0, 40) || 'storyboard'}.pptx`

export const exportStoryPptx = async (story: PptxStory, thumbBase: string) => {
  const { default: PptxGenJS } = await import('pptxgenjs')
  const pptx = new PptxGenJS()
  pptx.layout = 'LAYOUT_WIDE' // 16:9（13.33 × 7.5 インチ）
  pptx.title = story.name
  pptx.company = 'モーション見本帳'
  const total = story.cuts.reduce((sum, cut) => sum + cut.seconds, 0)
  const today = new Date().toLocaleDateString('ja-JP')
  const footer = (slide: ReturnType<typeof pptx.addSlide>, page: string) => {
    slide.addText(`${story.name}　｜　モーション見本帳 https://motion-sample-book.vercel.app/`, { x: 0.5, y: 7.05, w: 10, h: 0.3, fontFace: font, fontSize: 9, color: muted })
    slide.addText(page, { x: 11.3, y: 7.05, w: 1.5, h: 0.3, fontFace: font, fontSize: 9, color: muted, align: 'right' })
  }

  // 表紙
  const cover = pptx.addSlide()
  cover.background = { color: cream }
  cover.addText('STORYBOARD', { x: 0.8, y: 1.6, w: 11, h: 0.4, fontFace: font, fontSize: 14, bold: true, color: coral, charSpacing: 4 })
  cover.addText(story.name, { x: 0.8, y: 2.1, w: 11.7, h: 1.2, fontFace: font, fontSize: 40, bold: true, color: ink })
  if (story.description) cover.addText(story.description, { x: 0.8, y: 3.4, w: 11.2, h: 1, fontFace: font, fontSize: 16, color: muted, valign: 'top' })
  cover.addText(`${story.cuts.length}カット・約${total}秒${story.toolName ? `　｜　再現情報：${story.toolName}` : ''}`, { x: 0.8, y: 4.6, w: 11, h: 0.4, fontFace: font, fontSize: 14, color: ink })
  cover.addText(`${today}　モーション見本帳で作成`, { x: 0.8, y: 6.4, w: 11, h: 0.3, fontFace: font, fontSize: 11, color: muted })

  // 1カット1枚
  for (const [index, cut] of story.cuts.entries()) {
    const slide = pptx.addSlide()
    slide.background = { color: 'FFFFFF' }
    const num = String(index + 1).padStart(2, '0')
    slide.addShape(pptx.ShapeType.roundRect, { x: 0.5, y: 0.45, w: 0.7, h: 0.5, fill: { color: coral }, line: { color: coral }, rectRadius: 0.08 })
    slide.addText(num, { x: 0.5, y: 0.45, w: 0.7, h: 0.5, fontFace: font, fontSize: 16, bold: true, color: 'FFFFFF', align: 'center', valign: 'middle' })
    slide.addText(cut.role, { x: 1.35, y: 0.38, w: 9.5, h: 0.6, fontFace: font, fontSize: 24, bold: true, color: ink, valign: 'middle' })
    slide.addText(`${cut.seconds}秒`, { x: 10.9, y: 0.38, w: 1.9, h: 0.6, fontFace: font, fontSize: 22, bold: true, color: coral, align: 'right', valign: 'middle' })
    if (cut.note) slide.addText(cut.note, { x: 1.35, y: 0.95, w: 11.4, h: 0.4, fontFace: font, fontSize: 13, color: muted })

    // 左：見本の画像
    const box = { x: 0.5, y: 1.55, w: 7.4, h: 4.3 }
    slide.addShape(pptx.ShapeType.rect, { ...box, fill: { color: cream }, line: { color: line, width: 0.75 } })
    const image = await toDataUrl(`${thumbBase}${cut.sample.number}.jpg`).catch(() => undefined)
    if (image) slide.addImage({ data: image, ...fit({ x: box.x + 0.1, y: box.y + 0.1, w: box.w - 0.2, h: box.h - 0.2 }, await imageSize(image)) })
    else slide.addText('（画像なし）', { ...box, fontFace: font, fontSize: 12, color: muted, align: 'center', valign: 'middle' })

    // 右：見本の情報
    const right = { x: 8.2, w: 4.6 }
    slide.addText([
      { text: `${cut.sample.number}　${cut.sample.name}`, options: { fontSize: 18, bold: true, color: ink, breakLine: true } },
      { text: cut.sample.english, options: { fontSize: 11, color: muted, breakLine: true } },
    ], { ...right, y: 1.55, h: 0.9, fontFace: font, valign: 'top' })
    slide.addText([
      { text: 'カット　', options: { color: muted } }, { text: cut.scale ?? '—', options: { color: ink, breakLine: true } },
      { text: '種類　　', options: { color: muted } }, { text: cut.sample.categoryLabel, options: { color: ink, breakLine: true } },
    ], { ...right, y: 2.5, h: 0.7, fontFace: font, fontSize: 12, valign: 'top' })
    slide.addText(cut.sample.description, { ...right, y: 3.25, h: 1.3, fontFace: font, fontSize: 13, color: ink, valign: 'top' })
    slide.addText(`向いている場面：${cut.sample.hint}`, { ...right, y: 4.6, h: 1.2, fontFace: font, fontSize: 11, color: muted, valign: 'top' })

    // 下：選んだ道具の再現情報
    if (story.toolName) {
      slide.addShape(pptx.ShapeType.rect, { x: 0.5, y: 6.05, w: 12.3, h: 0.9, fill: { color: cream }, line: { color: line, width: 0.75 } })
      slide.addText([
        { text: `${story.toolName}：`, options: { bold: true, color: coral } },
        { text: cut.recipe ?? '（この見本には記載なし）', options: { color: ink } },
      ], { x: 0.65, y: 6.08, w: 12, h: 0.84, fontFace: font, fontSize: 11, valign: 'middle', fit: 'shrink' })
    }
    slide.addNotes([
      `${num} ${cut.role}（${cut.seconds}秒）`,
      cut.note ? `ねらい：${cut.note}` : '',
      `見本：${cut.sample.number} ${cut.sample.name}（${cut.sample.english}）`,
      story.toolName && cut.recipe ? `${story.toolName}：${cut.recipe}` : '',
      cut.prompt ? `生成AI向けの指示文：${cut.prompt}` : '',
    ].filter(Boolean).join('\n'))
    footer(slide, `${index + 1} / ${story.cuts.length}`)
  }

  // 一覧表
  const table = pptx.addSlide()
  table.addText('カット割り表', { x: 0.5, y: 0.4, w: 9, h: 0.6, fontFace: font, fontSize: 24, bold: true, color: ink })
  table.addText(`${story.cuts.length}カット・約${total}秒`, { x: 9.5, y: 0.4, w: 3.3, h: 0.6, fontFace: font, fontSize: 14, color: coral, align: 'right' })
  const head = ['No.', '役割', '見本', 'カット', '秒数'].map((text) => ({ text, options: { bold: true, color: 'FFFFFF', fill: { color: ink } } }))
  const rows = story.cuts.map((cut, index) => [String(index + 1), cut.role, `${cut.sample.number} ${cut.sample.name}`, cut.scale ?? '—', `${cut.seconds}秒`].map((text) => ({ text })))
  table.addTable([head, ...rows], {
    x: 0.5, y: 1.2, w: 12.3, colW: [0.8, 4.2, 5, 1.2, 1.1], fontFace: font, fontSize: 12, color: ink,
    border: { type: 'solid', pt: 0.75, color: line }, autoPage: true, autoPageRepeatHeader: true, newSlideStartY: 0.6,
  })
  footer(table, '一覧')

  // pptxgenjs の writeFile はブラウザによってファイル名が付かないことがあるので、自分でダウンロードさせる
  const blob = await pptx.write({ outputType: 'blob' }) as Blob
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = pptxFileName(story.name)
  document.body.append(link)
  link.click()
  link.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 2000)
}
