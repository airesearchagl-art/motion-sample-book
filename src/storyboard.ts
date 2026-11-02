/**
 * v1.0-2「構成を組む」。目的に合った構成の型を選び、役割（カット）ごとに見本を選んで並べ、
 * カット割り表として再現情報ごとコピーできるようにする。
 *
 * 型は建築映像の基本の流れに合わせる：
 * - 全景から細部へ（周囲 → 建物 → 印象に残すディテール）
 * - 訪問の順（近づく → 入口 → 室内）
 * - 計画の説明（敷地 → 構成 → 断面・比較 → 完成イメージ）
 * 候補は先頭がおすすめ。見本を足したら、合う役割の candidates に番号を足す。
 */

export type StorySlot = {
  /** 役割（カット）の名前 */
  role: string
  /** 役割のねらい */
  note: string
  /** 候補の見本。先頭がおすすめ */
  candidates: string[]
  /** 目安の秒数 */
  seconds: number
}

export type StoryTemplate = {
  id: string
  name: string
  description: string
  /** 合う目的（purposes.ts の id） */
  purpose: string
  slots: StorySlot[]
}

export const storyTemplates: StoryTemplate[] = [
  {
    id: 'site-to-detail',
    name: '全景から細部へ',
    description: '周囲 → 建物 → 空間 → 印象に残すディテールの順。竣工映像やプレゼン冒頭の基本形。',
    purpose: 'site',
    slots: [
      { role: '導入：場所を見せる', note: '引きで、周辺と敷地の位置を伝える', candidates: ['V16', 'V20', 'V08', 'V05'], seconds: 5 },
      { role: '建物の全体', note: '建物の形と大きさが分かるカット', candidates: ['V08', 'V06', 'V05', 'V12'], seconds: 5 },
      { role: '空間に入る', note: '人の目線で中へ', candidates: ['V18', 'V07', 'V09'], seconds: 5 },
      { role: 'ディテール', note: '素材や納まりに寄る', candidates: ['V10', 'V04', 'T10'], seconds: 4 },
      { role: '締め：余韻を残す', note: '時間の移ろいやタイトルで終える', candidates: ['V12', 'V02', 'T06'], seconds: 5 },
    ],
  },
  {
    id: 'visit',
    name: '訪問の順',
    description: '近づく → 入口 → 室内 → 素材 → 夕景。人が実際に歩く順で空間を体験させる。',
    purpose: 'experience',
    slots: [
      { role: '近づく', note: 'アプローチを歩く目線で建物へ', candidates: ['V09', 'V07', 'V16'], seconds: 5 },
      { role: '入口を抜ける', note: '外から内へのつなぎ', candidates: ['V18', 'V07'], seconds: 4 },
      { role: '室内を見渡す', note: '広がりや吹抜けを見せる', candidates: ['V05', 'V06', 'V09'], seconds: 5 },
      { role: '素材に寄る', note: '手に触れる素材を印象づける', candidates: ['V10', 'V04', 'T10'], seconds: 4 },
      { role: '夕景で締める', note: '明かりが灯る外観で終える', candidates: ['V12', 'V02'], seconds: 5 },
    ],
  },
  {
    id: 'design-story',
    name: '計画の説明',
    description: '敷地 → 構成 → 断面 → 比較 → 規模 → 完成イメージ。設計の考え方を順に伝える。',
    purpose: 'study',
    slots: [
      { role: '敷地と条件', note: '敷地の位置や日照の条件', candidates: ['V20', 'V13', '20'], seconds: 4 },
      { role: '構成の考え方', note: '平面から立体、各階の重なり', candidates: ['V14', 'V15'], seconds: 5 },
      { role: '断面で内部', note: '吹抜けや階のつながり', candidates: ['V11'], seconds: 4 },
      { role: '案や前後の比較', note: 'A案B案、改修前後', candidates: ['11', '16', 'V03'], seconds: 4 },
      { role: '規模と数値', note: '面積・階数・寸法', candidates: ['T08', 'T09'], seconds: 3 },
      { role: '完成イメージへ', note: 'スケッチから完成形へ', candidates: ['V19', 'V17'], seconds: 5 },
    ],
  },
]

export const storyTemplateById = new Map(storyTemplates.map((template) => [template.id, template]))

/* ---------- 自分の型と、JSONでの書き出し・読み込み ---------- */

/** 自分の型のカット。見本は50種類すべてから選べる。candidates は複製元の候補（おすすめ順） */
export type CustomSlot = { role: string, note: string, sample: string, seconds: number, candidates: string[] }
export type CustomTemplate = { id: string, name: string, description: string, basedOn?: string, slots: CustomSlot[] }

/** JSONファイルの形。format と version で、この見本帳の構成データだと分かるようにする */
export const storyFormat = 'motion-sample-book/storyboard'
export const storyFormatVersion = 1
export type StoryFileSlot = { role: string, note: string, sample: string, seconds: number, candidates?: string[] }
export type StoryFileTemplate = { name: string, description: string, basedOn?: string, slots: StoryFileSlot[] }
export type StoryFile = { format: string, version: number, exportedAt: string, source: string, templates: StoryFileTemplate[] }

export const storyLimits = { templates: 50, slots: 30, minSeconds: 1, maxSeconds: 30 }

export const newStoryId = () => `custom-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`

export const clampSeconds = (value: unknown, fallback = 5) => {
  const number = Math.round(Number(value))
  if (!Number.isFinite(number)) return fallback
  return Math.min(Math.max(number, storyLimits.minSeconds), storyLimits.maxSeconds)
}

export const toStoryFile = (templates: StoryFileTemplate[]): StoryFile => ({
  format: storyFormat,
  version: storyFormatVersion,
  exportedAt: new Date().toISOString(),
  source: 'https://motion-sample-book.vercel.app/',
  templates,
})

const text = (value: unknown, max: number, fallback = '') => (typeof value === 'string' ? value.trim().slice(0, max) : fallback) || fallback

/** 番号の表記ゆれを直す（v08 → V08、1 → 01） */
export const normalizeNumber = (value: unknown) => {
  if (typeof value !== 'string' && typeof value !== 'number') return ''
  const raw = String(value).trim().toUpperCase()
  const match = raw.match(/^([VT]?)(\d{1,2})$/)
  return match ? `${match[1]}${match[2].padStart(2, '0')}` : raw
}

export type StoryImport = { templates: Omit<CustomTemplate, 'id'>[], warnings: string[] }

/**
 * JSONの文字列を読み、自分の型として取り込める形に直す。
 * 人が書いたものも、生成AIが書いたものも、同じ確認を通す。
 * - 存在しない見本は外す（候補に存在する見本があれば、そちらに置き換える）
 * - 秒数は1〜30秒に直す
 * 読めない場合は、理由を日本語で書いた Error を投げる。
 */
export const parseStoryFile = (source: string, exists: (number: string) => boolean): StoryImport => {
  let data: unknown
  try {
    data = JSON.parse(source)
  } catch {
    throw new Error('JSONとして読めませんでした。括弧やカンマの抜けがないか確認してください。')
  }
  const warnings: string[] = []
  let list: unknown[]
  if (Array.isArray(data)) list = data
  else if (data && typeof data === 'object' && Array.isArray((data as StoryFile).templates)) {
    const file = data as Partial<StoryFile>
    if (file.format !== undefined && file.format !== storyFormat) throw new Error(`この見本帳の構成データではありません（format: ${String(file.format)}）。`)
    if (typeof file.version === 'number' && file.version > storyFormatVersion) warnings.push(`新しい版（version ${file.version}）の形式です。読めた項目だけを取り込みます。`)
    list = file.templates!
  } else if (data && typeof data === 'object' && Array.isArray((data as StoryFileTemplate).slots)) list = [data]
  else throw new Error('templates（型の一覧）が見つかりませんでした。')

  if (list.length > storyLimits.templates) {
    warnings.push(`型が多すぎるため、先頭の${storyLimits.templates}件だけを取り込みます。`)
    list = list.slice(0, storyLimits.templates)
  }

  const templates: Omit<CustomTemplate, 'id'>[] = []
  const removed = new Set<string>()
  list.forEach((item, templateIndex) => {
    if (!item || typeof item !== 'object') return
    const raw = item as Partial<StoryFileTemplate>
    const name = text(raw.name, 40, `読み込んだ型 ${templateIndex + 1}`)
    const rawSlots = Array.isArray(raw.slots) ? raw.slots.slice(0, storyLimits.slots) : []
    if (Array.isArray(raw.slots) && raw.slots.length > storyLimits.slots) warnings.push(`「${name}」はカットが多すぎるため、先頭の${storyLimits.slots}カットだけを取り込みます。`)
    const slots: CustomSlot[] = []
    rawSlots.forEach((slotItem, slotIndex) => {
      if (!slotItem || typeof slotItem !== 'object') return
      const slot = slotItem as Partial<StoryFileSlot> & { number?: string }
      const candidates = (Array.isArray(slot.candidates) ? slot.candidates : []).map(normalizeNumber).filter(exists).slice(0, 10)
      const wanted = normalizeNumber(slot.sample ?? slot.number)
      const sample = exists(wanted) ? wanted : candidates[0]
      if (wanted && !exists(wanted)) removed.add(wanted)
      if (!sample) return
      slots.push({
        role: text(slot.role, 40, `カット${slotIndex + 1}`),
        note: text(slot.note, 120),
        sample,
        seconds: clampSeconds(slot.seconds),
        candidates,
      })
    })
    if (!slots.length) {
      warnings.push(`「${name}」は使える見本がないため、取り込みませんでした。`)
      return
    }
    templates.push({ name, description: text(raw.description, 200), basedOn: text(raw.basedOn, 40) || undefined, slots })
  })
  if (removed.size) warnings.push(`この見本帳にない見本（${[...removed].join('、')}）は、候補の見本に置き換えるか、そのカットを外しました。`)
  if (!templates.length) throw new Error(['取り込める型がありませんでした。', ...warnings].join(''))
  return { templates, warnings }
}
