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
