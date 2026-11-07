/**
 * v1.0「目的と流れで組む」専門コレクション。
 *
 * 建築映像の組み立ては「周囲 → 建物 → 印象に残すディテール」「近づく → 入口 → 室内」のように、
 * プレゼンの目的と流れでカットを選ぶのが基本。媒体（UI／動画／文字）ではなく目的から見本を探せるようにする。
 *
 * 見本を足したら、当てはまる目的の samples に番号を足す（複数の目的に入れてよい）。
 * カメラ系の見本は shotScale にもカットの大きさを足す。
 */

export type Purpose = {
  id: string
  name: string
  /** 入口に出すひとこと */
  summary: string
  /** 使い方ページなどで出す説明 */
  description: string
  /** 並びは、その目的で使う順のおすすめ */
  samples: string[]
}

export const purposes: Purpose[] = [
  {
    id: 'site',
    name: '敷地と全体像',
    summary: '周囲から建物へ。場所と規模を伝える',
    description: '冒頭で場所・周辺・建物の大きさを伝えるカット。引きの全景や俯瞰から始め、建物へ近づいていく。',
    samples: ['V16', 'V29', 'V20', 'V08', 'V05', 'V06', 'V17', '14', '20', '28', 'T15', 'T08'],
  },
  {
    id: 'experience',
    name: '空間の体験',
    summary: '人の目線で近づき、入口から中へ',
    description: '実際に訪れる順（近づく → 入口 → 室内）をなぞるカット。人の目線の高さで、ゆっくり進む動きが中心。',
    samples: ['V09', 'V28', 'V07', 'V18', 'V30', '13', '23', 'E03', 'E05'],
  },
  {
    id: 'detail',
    name: '素材とディテール',
    summary: '寄りで素材・納まり・寸法を見せる',
    description: '印象に残したい素材や納まりに寄るカット。ピント送りや寸法・注記と組み合わせて、何を見せたいかをはっきりさせる。',
    samples: ['V04', 'V10', 'V32', 'V17', 'T10', 'T13', 'T09', '15'],
  },
  {
    id: 'study',
    name: '検討と比較',
    summary: '構成・断面・案の違いを分かりやすく',
    description: '設計の考え方や案の違いを説明するカット。平面から立体、分解、断面、前後比較など、図面に近い見せ方が中心。',
    samples: ['V14', 'V15', 'V21', 'V33', 'V11', '29', '30', 'V19', '11', 'V26', '16', 'V03', 'V13', 'T16', 'T17'],
  },
  {
    id: 'time',
    name: '時間と光',
    summary: '日影・昼夜・時間の移ろいを見せる',
    description: '日照や照明計画、時間による見え方の変化を伝えるカット。ゆっくりしたつなぎと組み合わせると余韻が出る。',
    samples: ['V13', 'V12', 'V31', 'V02', 'V25', 'E04', 'E10'],
  },
  {
    id: 'atmosphere',
    name: '空気感を足す',
    summary: '1枚のパースに風・水・人・天気を',
    description: '建物とカメラは止めたまま、植栽の揺れや水面、人の往来、雲や雨などの環境だけを動かすカット。CGの静止画や、1枚のパースを生成AIで動画にするときに使う。',
    samples: ['E01', 'E04', 'E02', 'E03', 'E05', 'E09', 'E06', 'E07', 'E08', 'E10'],
  },
]

/** カットの大きさ。建築映像の「引き（全景・空撮）／中（建物全体）／寄り（ディテール）／目線（人の視点）」 */
export type ShotScale = '引き' | '中' | '寄り' | '目線'

export const shotScale: Record<string, ShotScale> = {
  V04: '寄り', V05: '引き', V06: '引き', V07: '目線', V08: '引き', V09: '目線', V10: '寄り',
  V11: '中', V12: '引き', V13: '引き', V14: '中', V15: '中', V16: '引き', V17: '寄り',
  V18: '目線', V20: '引き', V21: '中',
  V27: '中', V28: '中', V29: '引き', V30: '目線', V31: '中', V32: '寄り', V33: '中',
}

export const shotScaleNote: Record<ShotScale, string> = {
  引き: '全景・空撮。場所と規模を伝える',
  中: '建物全体や構成が収まる大きさ',
  寄り: '素材やディテールに寄る',
  目線: '人の目の高さで空間を体験する',
}

export const purposeById = new Map(purposes.map((purpose) => [purpose.id, purpose]))

/** 番号から、その見本が入っている目的の一覧 */
export const purposesOf = (number: string) => purposes.filter((purpose) => purpose.samples.includes(number))
