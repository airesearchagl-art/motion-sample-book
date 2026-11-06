/**
 * v1.0-2b「AIに構成を頼む」。場面を書くと、生成AI（Claude、ChatGPTなど）へ渡す依頼文を作る。
 * 依頼文には、見本の一覧（番号・名前・説明・向いている場面・カットの大きさ・目的）と、
 * 構成のJSONの形（docs/STORYBOARD_JSON.md）を入れる。AIが返したJSONは、自分の型と同じ読み込み口から取り込む。
 *
 * API・サーバーは使わない。見本の一覧は data.ts などから毎回作るので、見本を足しても依頼文は古くならない。
 */
import type { Sample } from './data'
import { purposesOf, shotScale } from './purposes'
import { storyFormat, storyFormatVersion, storyLimits, storyTemplates } from './storyboard'

export type StoryRequest = {
  /** 場面（どんな相手に、何を伝えたいか） */
  situation: string
  /** 全体の長さ（秒）。0はおまかせ */
  totalSeconds: number
  /** 提案の数（1〜3） */
  count: number
  /** 主に使う道具。空はおまかせ */
  tool: string
}

export const storyRequestTools: Record<string, string> = {
  '': 'おまかせ',
  powerpoint: 'PowerPoint（スライドのアニメーション・画面切り替え）',
  edit: '動画編集（Premiere Pro／After Effects）',
  cg: '建築CG（SketchUp／D5 Renderなど）のカメラワーク',
  prompt: '生成AIでの動画づくり（1枚のパースや画像から）',
}

export const storyRequestLengths = [0, 15, 30, 60, 90, 180]
export const lengthLabel = (seconds: number) => {
  if (seconds === 0) return 'おまかせ'
  const minutes = Math.floor(seconds / 60)
  const rest = seconds % 60
  return `約${minutes ? `${minutes}分` : ''}${rest ? `${rest}秒` : ''}`
}

const line = (text: string) => text.replace(/\s+/g, ' ').trim()

/** 見本の一覧（1行1件）。AIが番号を取り違えないよう、番号を行頭に置く */
export const sampleCatalog = (groups: [string, Sample[]][]) => groups.map(([label, list]) => [
  `### ${label}`,
  ...list.map((sample) => {
    const extras = [
      shotScale[sample.number] ? `カット:${shotScale[sample.number]}` : '',
      purposesOf(sample.number).length ? `目的:${purposesOf(sample.number).map((purpose) => purpose.name).join('・')}` : '',
    ].filter(Boolean).join('／')
    return `- ${sample.number} ${sample.name}（${sample.english}）：${line(sample.description)} 向く：${line(sample.hint)} 避ける：${line(sample.avoid)}${extras ? `【${extras}】` : ''}`
  }),
].join('\n')).join('\n\n')

/** 最初からある型を、構成の例として短く示す */
const templateExamples = () => storyTemplates.map((template) => `- ${template.name}：${template.slots.map((slot) => `${slot.role}（${slot.candidates[0]}）`).join(' → ')}`).join('\n')

export const buildStoryPrompt = (request: StoryRequest, groups: [string, Sample[]][]) => {
  const count = Math.min(Math.max(Math.round(request.count) || 1, 1), 3)
  const situation = request.situation.trim()
  const conditions = [
    `- 場面：${situation || '（未記入。建築プレゼンの一般的な場面として考えてください）'}`,
    `- 全体の長さ：${lengthLabel(request.totalSeconds)}`,
    `- 主に使う道具：${storyRequestTools[request.tool] ?? storyRequestTools['']}`,
    `- 提案の数：${count}案${count > 1 ? '（流れの考え方が違う案にしてください）' : ''}`,
  ]
  const example = {
    format: storyFormat,
    version: storyFormatVersion,
    templates: [{
      name: '案の名前（20文字程度）',
      description: 'この構成のねらいと流れ（1〜2文）',
      slots: [
        { role: 'カットの役割', note: 'このカットで伝えること', sample: 'V16', seconds: 5, candidates: ['V16', 'V20', 'V08'] },
      ],
    }],
  }
  return `あなたは建築プレゼンテーションの映像・スライド構成を考えるディレクターです。
下の「場面」に合う構成（カット割り）を、「モーション見本帳」の見本から選んで提案してください。

## 場面と条件
${conditions.join('\n')}

## 構成の考え方
- 建築の映像やプレゼンは、目的と流れでカットを選びます（例：周囲 → 建物 → 空間 → ディテール、近づく → 入口 → 室内）。
- 引き（場所・全体）→ 中 → 寄り（素材・納まり）のように、カットの大きさに変化をつけてください。
- 文字の見本（T）は、タイトル・数値・注記など、伝える情報があるカットに使ってください。
- 環境の見本（E）は、建物とカメラを止めたまま風・水・人・天気・光だけを動かすカットです。1枚のパースや静止画に空気感を足すときに使ってください。
- 1カットは${storyLimits.minSeconds}〜${storyLimits.maxSeconds}秒、1案は${storyLimits.slots}カットまで。全体の長さの指定があれば、秒数の合計をそれに近づけてください。
- 見本帳にある構成の例：
${templateExamples()}

## 使える見本（この番号だけを使う）
${sampleCatalog(groups)}

## 答え方
- 次の形のJSONだけを、1つのコードブロックで返してください。説明の文章はJSONの外に書かないでください。
- sample には上の一覧にある番号だけを使ってください（例：V08、T03、E01、12）。
- candidates には、そのカットの代わりになる見本を、おすすめ順に2〜3個入れてください（sample を先頭に）。
- role・note・name・description は日本語で書いてください。

\`\`\`json
${JSON.stringify(example, null, 2)}
\`\`\`
`
}
